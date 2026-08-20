import { getEntry, type KbEntry } from "@/lib/knowledge-base"
import { siteConfig } from "@/lib/site-config"
import { retrieve, CONFIDENCE_THRESHOLD, normalize, tokenize } from "./retrieval"
import { classifyIntent, isOtherProductSupport, isInScope } from "./classify"
import { getAvailability } from "./schedule"
import type {
  ConversationState,
  Decision,
  EngineResult,
  Intent,
  Message,
  QuickAction,
  SlotName,
} from "./types"

/**
 * Capa de decisión y respuesta del Centro de Atención USERS.
 *
 * GROUNDING: toda afirmación factual sale de la base de conocimiento o de
 * siteConfig. Las plantillas de este archivo solo aportan conectores
 * conversacionales — nunca políticas, precios ni compromisos. Si el retrieval
 * no alcanza confianza, se responde UNKNOWN en lugar de improvisar.
 *
 * La capa generativa es opcional y vive detrás de `ai-provider`: si no hay
 * proveedor configurado, este motor responde igual, solo con menos naturalidad
 * en la redacción.
 */

let refCounter = 0

export function newRef(): string {
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  refCounter = (refCounter + 1) % 100
  return `USR-${rand}${String(refCounter).padStart(2, "0")}`
}

export function initialState(): ConversationState {
  return {
    messages: [],
    intent: "desconocido",
    collected: {},
    asked: [],
    ref: newRef(),
    escalationOffered: false,
  }
}

const msg = (
  text: string,
  extra: Partial<Omit<Message, "id" | "role" | "text" | "at">> = {}
): Message => ({
  id: Math.random().toString(36).slice(2),
  role: "center",
  text,
  at: Date.now(),
  ...extra,
})

/** Qué datos conviene tener antes de escalar, por tipo de solicitud. */
const SLOTS_BY_INTENT: Partial<Record<Intent, SlotName[]>> = {
  incidente: ["problema", "url", "desdeCuando", "dispositivo"],
  ajuste: ["problema", "url"],
  funcionalidad: ["problema"],
}

const SLOT_QUESTIONS: Record<SlotName, string> = {
  problema: "¿Qué está pasando exactamente y qué esperabas que pasara?",
  url: "¿En qué página o sección lo ves? Si tienes la dirección, mándamela.",
  desdeCuando: "¿Desde cuándo lo notas? ¿Pasó algo justo antes —una actualización, un cambio?",
  dispositivo: "¿Desde qué dispositivo y navegador lo estás viendo?",
  proyecto: "¿De qué proyecto se trata?",
}

/** Detecta si el mensaje trae valor para un slot pendiente. */
function fillSlots(state: ConversationState, text: string): SlotName[] {
  const t = normalize(text)
  const filled: SlotName[] = []
  const set = (slot: SlotName, value: string) => {
    if (!state.collected[slot]) {
      state.collected[slot] = value
      filled.push(slot)
    }
  }

  if (/https?:\/\/|www\.|\.(mx|com|app|net)\b/.test(t) || /\b(catalogo|carrito|checkout|inicio|contacto|blog|tienda|pago)\b/.test(t)) {
    set("url", text.trim())
  }
  if (/\b(iphone|android|ipad|safari|chrome|firefox|edge|celular|movil|computadora|laptop|tablet)\b/.test(t)) {
    set("dispositivo", text.trim())
  }
  if (/\b(ayer|hoy|desde|hace|semana|mes|dias|siempre|actualiz)\w*/.test(t)) {
    set("desdeCuando", text.trim())
  }
  return filled
}

/** Siguiente dato que falta para poder escalar con contexto útil. */
function nextSlot(state: ConversationState): SlotName | null {
  const wanted = SLOTS_BY_INTENT[state.intent]
  if (!wanted) return null
  return wanted.find((s) => !state.collected[s] && !state.asked.includes(s)) ?? null
}

const ESCALATE_ACTION: QuickAction = {
  id: "escalar",
  label: "Hablar con un especialista",
  kind: "escalate",
}

const HELP_ACTION: QuickAction = {
  id: "ayuda",
  label: "Ver Central de Ayuda",
  kind: "link",
  value: "/ayuda",
}

/** Respuesta cuando no hay confianza suficiente. Es una función, no un fallo. */
function unknownReply(): Message {
  return msg(
    "No tengo suficiente información para responderte eso con seguridad, y prefiero no darte una respuesta incorrecta. ¿Puedes contármelo con otras palabras? Si prefieres, puedo pasarlo con un especialista.",
    {
      decision: "UNKNOWN",
      actions: [ESCALATE_ACTION, HELP_ACTION],
      links: [{ label: "Central de Ayuda", href: "/ayuda" }],
    }
  )
}

/**
 * Pide contexto en vez de adivinar.
 *
 * Para un mensaje corto o ambiguo —"ayuda", "sí", "vengo de Instagram"— el
 * retrieval siempre devuelve algo, y ese algo suele ser una entrada sin
 * relación. En la revisión manual, "ayuda" contestaba sobre configuración de
 * correo. Preguntar cuesta un turno; contestar cualquier cosa cuesta la
 * conversación.
 */
function clarifyReply(): Message {
  return msg(
    "Cuéntame un poco más para ayudarte bien. ¿Es sobre un proyecto que quieres cotizar, o sobre algo que ya tienes con nosotros?",
    {
      // Es un UNKNOWN honesto —no sabemos qué necesita— pero con una salida
      // en vez de un muro. La métrica sigue contándolo como no resuelto.
      decision: "UNKNOWN",
      actions: [
        { id: "cotizar", label: "Quiero cotizar un proyecto", kind: "send", value: "quiero cotizar un proyecto para mi negocio" },
        { id: "soporte", label: "Ya soy cliente", kind: "send", value: "necesito soporte de mi proyecto" },
        ESCALATE_ACTION,
      ],
    }
  )
}

/**
 * Fuera de tema. Es distinto de UNKNOWN: aquí no es que falte información,
 * es que la pregunta no es de nuestra competencia. Decirlo así evita que el
 * Centro responda con seriedad a algo que no le toca.
 *
 * SOLO EN EL PRIMER TURNO. Una vez que hay conversación, quien escribe está
 * hablando con nosotros de nosotros: decirle "eso se sale de lo que puedo
 * atender" porque mencionó su ferretería es la peor respuesta posible.
 */
function outOfScopeReply(): Message {
  return msg(
    "Ese tema se sale de lo que puedo atender: aquí solo veo proyectos y servicios de USERS —sitios, sistemas, seguimiento y dudas comerciales—. Si tu pregunta tiene que ver con alguno de esos, cuéntamela y con gusto te ayudo.",
    { decision: "UNKNOWN", links: [{ label: "Central de Ayuda", href: "/ayuda" }] }
  )
}

/**
 * Cuando la intención es clara pero el retrieval no encuentra nada por encima
 * del umbral, no hace falta responder UNKNOWN: ya sabemos qué tipo de
 * solicitud es y la base de conocimiento tiene una entrada que la cubre.
 * "Quiero agregar un carrito" es una funcionalidad nueva aunque la KB no
 * hable de carritos.
 */
const FALLBACK_ENTRY_BY_INTENT: Partial<Record<Intent, string>> = {
  funcionalidad: "nueva-funcionalidad",
  incidente: "algo-dejo-de-funcionar",
  ajuste: "puedo-pedir-cambios",
  comercial: "como-empiezo",
  "hablar-humano": "hablar-con-persona",
}

function anchorFor(intent: Intent): KbEntry | undefined {
  const id = FALLBACK_ENTRY_BY_INTENT[intent]
  return id ? getEntry(id) : undefined
}

/**
 * Coincidencia mínima para creerle a una consulta sin señal de intención ni
 * vocabulario del dominio. Es deliberadamente alta: por debajo de esto la
 * coincidencia suele ser una palabra suelta compartida por casualidad.
 */
const BLIND_QUERY_THRESHOLD = 0.5

/**
 * Señales de que la persona está molesta o siente que no la atienden.
 * Se evalúan antes que nada: la respuesta correcta es una persona, no una
 * respuesta más.
 */
const FRUSTRATION =
  /\b(no sirve|no funciona nada|es un desastre|pesimo|pésimo|malisimo|nadie (me )?(contesta|responde|atiende)|llevo (dias|semanas|meses)|ya les? (escribi|habia escrito|mande)|otra vez|harto|molest|queja|reclamo|urge que alguien)\w*/

/**
 * Por debajo de esto, una intención clara pesa más que la entrada recuperada.
 */
const INTENT_OVERRIDE_CONFIDENCE = 0.35

/** El Centro de USERS no da soporte de producto: orienta y lo dice. */
function otherProductReply(product: "ACTIIVA" | "MEDIICA"): Message {
  const entry = getEntry(product === "ACTIIVA" ? "que-es-actiiva" : "que-es-mediica")
  return msg(
    `Este Centro atiende proyectos y servicios de USERS, no el soporte de ${product} — cuando esté disponible tendrá su propio canal de atención.\n\nLo que sí te puedo decir: ${entry?.answer ?? ""}`,
    {
      decision: "INFO",
      links: [{ label: `Ver ${product}`, href: "/productos" }],
      actions: [
        { id: "probar", label: `Quiero probar ${product}`, kind: "escalate" },
        HELP_ACTION,
      ],
    }
  )
}

function greetingReply(): Message {
  return msg(
    "Hola. Soy el Centro de Atención de USERS: puedo ayudarte con dudas sobre tu proyecto, ajustes de contenido, problemas técnicos o información comercial. ¿Qué necesitas?",
    { decision: "INFO" }
  )
}

/** Compone la respuesta a partir de una entrada real de la KB. */
function fromEntry(entry: KbEntry, state: ConversationState): Message {
  const links = entry.related?.map((r) => ({ label: r.label, href: r.href })) ?? []
  const actions: QuickAction[] = []

  const slot = nextSlot(state)

  if (entry.mode === "SPECIALIST") {
    if (slot) {
      state.asked.push(slot)
      return msg(`${entry.answer}\n\n${SLOT_QUESTIONS[slot]}`, {
        decision: "SPECIALIST",
        links,
      })
    }
    actions.push(ESCALATE_ACTION)
    return msg(
      `${entry.answer}\n\nCon lo que me contaste ya puedo pasarlo con el equipo.`,
      { decision: "SPECIALIST", links, actions }
    )
  }

  if (entry.mode === "GUIDED" && slot) {
    state.asked.push(slot)
    return msg(`${entry.answer}\n\n${SLOT_QUESTIONS[slot]}`, {
      decision: "GUIDED",
      links,
    })
  }

  actions.push(ESCALATE_ACTION)
  return msg(entry.answer, { decision: entry.mode, links, actions: actions.slice(0, 2) })
}

/**
 * Turno del motor. Recibe el estado y el mensaje de la persona; devuelve la
 * respuesta y el estado actualizado.
 */
export function respond(state: ConversationState, userText: string): EngineResult {
  const next: ConversationState = {
    ...state,
    collected: { ...state.collected },
    asked: [...state.asked],
    messages: [...state.messages],
  }

  const text = userText.trim()
  if (!text) return { reply: unknownReply(), state: next }

  // 1. ¿Es soporte de otro producto? Se atiende antes que nada.
  const otherProduct = isOtherProductSupport(text)
  if (otherProduct) {
    next.intent = "producto"
    return { reply: otherProductReply(otherProduct), state: next }
  }

  const { intent, strength } = classifyIntent(text)

  // Un saludo suelto no trae nada que responder, llegue en el turno que
  // llegue. (No basta con mirar si la conversación está vacía: cuando el
  // motor recibe el estado, el mensaje de la persona ya está dentro.)
  if (intent === "saludo") {
    if (next.intent === "desconocido") next.intent = "informacion"
    return { reply: greetingReply(), state: next }
  }

  /**
   * 1b. Frustración.
   *
   * Quien escribe "ya les escribí tres veces" o "esto no sirve" no quiere una
   * entrada de la base de conocimiento: quiere que alguien lo atienda. Buscar
   * y contestar con lo más parecido —en la prueba manual salió el plan de
   * mantenimiento— confirma exactamente lo que esa persona está diciendo.
   */
  if (FRUSTRATION.test(normalize(text))) {
    next.intent = "hablar-humano"
    if (!next.collected.problema) next.collected.problema = text.trim()
    const { specialistAvailable, label } = getAvailability()
    return {
      reply: msg(
        specialistAvailable
          ? "Entiendo. Esto lo ve una persona del equipo, no yo. Te paso con alguien ahora mismo."
          : `Entiendo. Esto lo tiene que ver una persona del equipo. Atienden ${label.toLowerCase()} (hora del centro de México); puedo dejar tu solicitud lista para que la retomen en cuanto abran.`,
        { decision: "SPECIALIST", actions: [ESCALATE_ACTION] }
      ),
      state: next,
    }
  }

  // 2. Petición explícita de humano: no hace falta buscar nada.
  if (intent === "hablar-humano") {
    next.intent = "hablar-humano"
    const { specialistAvailable, label } = getAvailability()
    return {
      reply: msg(
        specialistAvailable
          ? "Claro. Ahora mismo estamos dentro del horario de atención especializada, así que te paso con el equipo."
          : `Claro. Nuestro equipo atiende ${label.toLowerCase()} (hora del centro de México), así que la respuesta llegará dentro de ese horario. Puedo dejar tu solicitud lista para enviarla.`,
        { decision: "SPECIALIST", actions: [ESCALATE_ACTION] }
      ),
      state: next,
    }
  }

  // 3. Continuidad: si es una respuesta corta a algo que preguntamos, se
  //    interpreta dentro de la intención vigente en vez de reiniciar.
  const isFollowUp =
    next.asked.length > 0 && strength < 3 && next.intent !== "desconocido"

  if (isFollowUp) {
    fillSlots(next, text)
    // Si el mensaje no encajó en ningún slot, se guarda como descripción.
    if (!next.collected.problema) next.collected.problema = text.trim()

    const slot = nextSlot(next)
    if (slot) {
      next.asked.push(slot)
      return { reply: msg(SLOT_QUESTIONS[slot], { decision: "GUIDED" }), state: next }
    }
    next.escalationOffered = true
    return {
      reply: msg(
        "Gracias, con eso ya tengo el contexto necesario. Este caso lo tiene que revisar una persona del equipo: puedo prepararlo con todo lo que me contaste.",
        { decision: "SPECIALIST", actions: [ESCALATE_ACTION] }
      ),
      state: next,
    }
  }

  /**
   * 4. Mensaje demasiado corto para buscar nada.
   *
   * "ayuda", "sí", "info": una o dos palabras sin señal de intención. El
   * retrieval devolvería la entrada que comparta una palabra suelta.
   */
  const palabrasUtiles = tokenize(text).length
  if (palabrasUtiles <= 1 && intent === "desconocido") {
    return { reply: clarifyReply(), state: next }
  }

  // 5. Nueva consulta: recuperar conocimiento.
  const hits = retrieve(text)
  const top = hits[0]

  /**
   * Qué tan buena tiene que ser la coincidencia para confiar en ella.
   *
   * Una consulta sin ninguna señal de intención y sin vocabulario del dominio
   * podría ser de otro tema por completo. El retrieval siempre devuelve algo
   * —basta que coincida una palabra— así que ahí se exige una coincidencia
   * claramente fuerte. Con señal de intención, el umbral normal basta.
   *
   * Este umbral doble sustituye a la reja que aplicaba antes: aquella
   * descartaba la respuesta *aunque* la coincidencia fuera perfecta, y tiraba
   * respuestas correctas a preguntas como "¿cuánto se tardan en entregar?"
   * solo porque la frase no contenía ninguna palabra de la lista.
   */
  const primerTurno = next.messages.filter((m) => m.role === "center").length === 0
  const blind = intent === "desconocido" && !isInScope(text)
  const required = blind ? BLIND_QUERY_THRESHOLD : CONFIDENCE_THRESHOLD

  /**
   * Un resultado que domina al resto merece confianza aunque su valor
   * absoluto sea bajo.
   *
   * "¿Por qué no mejor uso Wix?" recuperaba la entrada correcta en primer
   * lugar con el doble de puntaje que la siguiente, pero con confianza 0.12
   * porque "mejor" y "uso" son palabras corrientes que diluyen el promedio.
   * Quedarse callado ante la objeción comercial más frecuente por un umbral
   * es peor que responderla.
   */
  const segundo = hits[1]?.confidence ?? 0
  const domina =
    !blind && top !== undefined && top.confidence >= 0.1 && top.confidence >= segundo * 2

  if (!top || (top.confidence < required && !domina)) {
    /**
     * Fuera de tema solo ante una pregunta ajena y sustancial.
     *
     * Con pocas palabras no se puede distinguir "vengo de Instagram" de
     * "capital de Mongolia": ninguna deja términos que la base reconozca. Y
     * los dos errores no cuestan igual — decirle a un prospecto real que su
     * tema no nos compete pierde la venta; pedirle contexto a quien pregunta
     * por otra cosa solo la deja sin responder. Ante la duda, se pregunta.
     */
    const preguntaAjenaSustancial = primerTurno && palabrasUtiles >= 3
    if (blind) {
      return { reply: preguntaAjenaSustancial ? outOfScopeReply() : clarifyReply(), state: next }
    }

    const anchor = anchorFor(intent)
    if (anchor) {
      next.intent = intent
      if (!next.collected.problema) next.collected.problema = text.trim()
      return { reply: fromEntry({ ...anchor, mode: "SPECIALIST" }, next), state: next }
    }

    next.intent = intent === "desconocido" ? next.intent : intent
    return { reply: unknownReply(), state: next }
  }

  /**
   * Quien reporta algo roto nunca debe recibir una respuesta comercial.
   *
   * "Mi sitio se cayó" comparte la palabra "sitio" con la entrada de precios,
   * y con suficiente confianza léxica el motor contestaba con la tarifa de
   * los proyectos. Para alguien cuyo negocio está fuera de línea, eso no es
   * una respuesta imprecisa: es una falta de respeto y la señal de que nadie
   * lo va a ayudar.
   *
   * El coste de los dos errores no es simétrico. Contestar de más con soporte
   * a una consulta comercial es recuperable; lo contrario, no. Así que ante
   * una intención de incidente clara, solo valen entradas de soporte.
   */
  const SUPPORT_CATEGORIES = new Set(["ajustes", "despues"])
  if (intent === "incidente" && !SUPPORT_CATEGORIES.has(top.entry.category)) {
    const anchor = anchorFor("incidente")
    if (anchor) {
      next.intent = "incidente"
      if (!next.collected.problema) next.collected.problema = text.trim()
      return { reply: fromEntry({ ...anchor, mode: "SPECIALIST" }, next), state: next }
    }
  }

  /**
   * Una intención clara vale más que una coincidencia léxica apenas por
   * encima del umbral. Sin esto, "olvidé mi contraseña del administrador"
   * —incidente evidente— se respondía con la entrada de qué desarrollamos,
   * porque compartía dos palabras comunes.
   */
  if (strength >= 3 && top.confidence < INTENT_OVERRIDE_CONFIDENCE) {
    const anchor = anchorFor(intent)
    if (anchor) {
      next.intent = intent
      if (!next.collected.problema) next.collected.problema = text.trim()
      return { reply: fromEntry({ ...anchor, mode: "SPECIALIST" }, next), state: next }
    }
  }

  // La intención detectada manda sobre el modo de la entrada cuando es más
  // restrictiva: pedir una funcionalidad nueva siempre requiere especialista,
  // aunque la entrada recuperada sea informativa.
  next.intent = intent === "desconocido" ? "informacion" : intent
  next.focusEntryId = top.entry.id
  if (!next.collected.problema && (intent === "incidente" || intent === "ajuste")) {
    next.collected.problema = text.trim()
  }

  const entry: KbEntry =
    intent === "funcionalidad" && top.entry.mode !== "SPECIALIST"
      ? { ...top.entry, mode: "SPECIALIST" }
      : top.entry

  const reply = fromEntry(entry, next)

  // Sugerir entradas cercanas como acción, sin llenar de botones.
  const alt = hits[1]
  if (alt && alt.confidence > CONFIDENCE_THRESHOLD && (reply.actions?.length ?? 0) < 2) {
    reply.actions = [
      ...(reply.actions ?? []),
      { id: alt.entry.id, label: alt.entry.question, kind: "send", value: alt.entry.question },
    ]
  }

  return { reply, state: next }
}

/** Precios: siempre desde configuración, nunca escritos a mano. */
export const PRICING_FACTS = {
  project: siteConfig.pricing.startingPriceLabel,
  site: `$${siteConfig.maintenancePlans[0].price.toLocaleString("en-US")} ${siteConfig.maintenancePlans[0].priceNote}`,
  systems: `desde $${siteConfig.maintenancePlans[1].price.toLocaleString("en-US")} ${siteConfig.maintenancePlans[1].priceNote}`,
} as const

export type { Decision }
