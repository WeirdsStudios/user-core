import type { Answers } from "./questions"
import {
  DIMENSIONS,
  STATE_RANK,
  type Diagnosis,
  type DimensionId,
  type DimensionResult,
  type DimensionState,
  type Horizon,
  type Opportunity,
  type Recommendation,
} from "./types"

/**
 * El diagnóstico.
 *
 * CÓMO FUNCIONA
 * Cada dimensión acumula señales a partir de respuestas concretas. Una señal
 * siempre trae consigo la frase que la justifica, así que el resultado se
 * puede explicar sin abrir el código: "salió prioridad en Operación porque
 * agendas, cobras y llevas inventario a mano".
 *
 * LO QUE NO HACE
 * No calcula precios. No estima ROI, ni ventas futuras, ni cuánto dinero se
 * está perdiendo. La versión anterior devolvía un rango de pesos calculado
 * con horas inventadas y lo presentaba con dos decimales de confianza; eso no
 * es un diagnóstico, es una cotización falsa.
 *
 * INGRESOS
 * Influyen en el *alcance* de la fase inicial y en el orden de las
 * oportunidades, nunca en qué se diagnostica. Dos negocios con el mismo
 * problema reciben el mismo problema; lo que cambia es por dónde se propone
 * empezar. Y "prefiero no decirlo" no penaliza nada.
 */

type Signal = { dim: DimensionId; weight: number; evidence: string }

const asArray = (v: string | string[] | undefined): string[] =>
  Array.isArray(v) ? v : v ? [v] : []

const has = (v: string | string[] | undefined, value: string) => asArray(v).includes(value)

function collectSignals(a: Answers): Signal[] {
  const s: Signal[] = []
  const push = (dim: DimensionId, weight: number, evidence: string) =>
    s.push({ dim, weight, evidence })

  // ── Presencia ──
  const web = a.hasWebsite as string
  if (web === "no") push("presencia", 3, "No tienes sitio web todavía.")
  if (web === "redes") push("presencia", 3, "Tu presencia vive solo en redes sociales, que no controlas tú.")
  if (web === "viejo") push("presencia", 2, "Tienes un sitio, pero está desactualizado.")
  if (web === "si") push("presencia", -2, "Ya tienes un sitio que funciona.")

  if (has(a.acquisition, "google")) push("presencia", -1, "Ya te encuentran por búsquedas en Google.")
  if (has(a.customerAsks, "horarios"))
    push("presencia", 1, "Te siguen preguntando horarios y ubicación, que es información que un sitio resuelve solo.")
  if (has(a.customerAsks, "catalogo"))
    push("presencia", 1, "Te preguntan seguido qué vendes o qué servicios ofreces.")

  // ── Adquisición ──
  const canales = asArray(a.acquisition)
  if (canales.length === 1 && canales[0] === "recomendacion")
    push("adquisicion", 3, "Todo depende de la recomendación de boca en boca: funciona, pero no lo controlas.")
  if (canales.length === 1 && (canales[0] === "redes" || canales[0] === "whatsapp"))
    push("adquisicion", 3, "Dependes de un solo canal que no es tuyo.")
  if (canales.length >= 3) push("adquisicion", -1, "Tienes varios canales de entrada, no dependes de uno solo.")
  if (has(a.acquisition, "publicidad"))
    push("adquisicion", 1, "Ya inviertes en publicidad, así que cada visita que no convierte cuesta dinero.")

  const cierre = a.closeProcess as string
  if (cierre === "manual-todo")
    push("adquisicion", 3, "Cada persona interesada te obliga a empezar la conversación desde cero.")
  if (cierre === "manual-cotiza")
    push("adquisicion", 2, "Armas cada cotización a mano.")
  if (cierre === "automatizado")
    push("adquisicion", -2, "Tus clientes ya pueden avanzar sin que intervengas.")

  // ── Operación ──
  const manual = asArray(a.manualWork).filter((x) => x !== "ninguno")
  if (has(a.manualWork, "ninguno"))
    push("operacion", -3, "Tu operación ya está sistematizada en su mayor parte.")
  if (manual.length >= 4)
    push("operacion", 4, `Llevas a mano ${manual.length} procesos distintos del día a día.`)
  else if (manual.length >= 2)
    push("operacion", 2, `Hay ${manual.length} procesos que todavía haces a mano.`)
  else if (manual.length === 1) push("operacion", 1, "Queda un proceso importante sin sistematizar.")

  const tools = a.tools as string
  if (tools === "papel") push("operacion", 3, "La información del negocio vive en papel o en la memoria.")
  if (tools === "excel") push("operacion", 2, "Llevas el negocio en hojas de cálculo.")
  if (tools === "sistema") push("operacion", -2, "Ya tienes un sistema que integra buena parte de la operación.")

  // ── Experiencia del cliente ──
  const asks = asArray(a.customerAsks).filter((x) => x !== "pocas")
  if (has(a.customerAsks, "pocas"))
    push("clientes", -3, "Tus clientes tienen claro qué ofreces y cómo comprarte.")
  if (asks.length >= 3)
    push("clientes", 3, "Tus clientes te preguntan varias cosas que podrían resolver solos.")
  else if (asks.length >= 1) push("clientes", 1, "Hay preguntas que se repiten y consumen tiempo.")

  if (has(a.customerAsks, "precios"))
    push("clientes", 1, "El precio se pregunta una y otra vez por mensaje.")
  if (has(a.customerAsks, "disponibilidad"))
    push("clientes", 1, "La disponibilidad se consulta contigo en vez de verse sola.")
  if (has(a.customerAsks, "estado"))
    push("clientes", 2, "Tus clientes dependen de ti para saber cómo va lo suyo.")

  // ── Tecnología ──
  if (tools === "papel") push("tecnologia", 3, "No hay herramientas digitales que sostengan la operación.")
  if (tools === "excel") push("tecnologia", 2, "Las hojas de cálculo no se conectan con nada más.")
  if (tools === "apps") push("tecnologia", 2, "Usas varias herramientas que no se hablan entre sí.")
  if (tools === "sistema") push("tecnologia", -3, "Tus herramientas ya están integradas.")

  // ── Escalabilidad ──
  const size = a.size as string
  if ((size === "6-20" || size === "20+") && manual.length >= 2)
    push("escalabilidad", 3, "Con un equipo de ese tamaño, los procesos manuales se multiplican por persona.")
  if (size === "solo" && manual.length >= 3)
    push("escalabilidad", 3, "Todo el trabajo manual pasa por ti: eres el cuello de botella.")
  if (a.priority === "crecer")
    push("escalabilidad", 2, "Quieres crecer, y hoy el crecimiento se traduce en más trabajo manual.")
  if (a.timeline === "urgente") push("escalabilidad", 1, "El tiempo apremia.")
  if (tools === "sistema" && manual.length === 0)
    push("escalabilidad", -2, "La base para crecer ya está puesta.")

  // La prioridad declarada pesa sobre su dimensión: es lo que la persona dijo
  // que le duele, y ninguna inferencia nuestra debería ganarle.
  const prio = a.priority as string
  if (prio === "vender-mas") {
    push("presencia", 2, "Dijiste que lo que más te importa es que te encuentren y te compren.")
    push("adquisicion", 2, "Tu prioridad declarada es vender más.")
  }
  if (prio === "menos-manual")
    push("operacion", 3, "Dijiste que tu prioridad es dejar de hacer tanto a mano.")
  if (prio === "atender-mejor")
    push("clientes", 3, "Dijiste que quieres que tus clientes resuelvan solos.")
  if (prio === "ordenar") {
    push("operacion", 2, "Dijiste que quieres el negocio ordenado y medido.")
    push("tecnologia", 2, "Ordenar el negocio pasa por tener dónde registrar lo que ocurre.")
  }

  return s
}

function scoreToState(score: number): DimensionState {
  if (score >= 4) return "prioridad"
  if (score >= 2) return "oportunidad"
  if (score >= 0) return "funcional"
  return "solido"
}

function evaluateDimensions(signals: Signal[]): DimensionResult[] {
  return DIMENSIONS.map(({ id, label }) => {
    const own = signals.filter((s) => s.dim === id)
    const score = own.reduce((sum, s) => sum + s.weight, 0)
    return {
      id,
      label,
      state: scoreToState(score),
      // Solo las señales que empujaron hacia arriba explican un problema.
      evidence: own.filter((s) => s.weight > 0).map((s) => s.evidence),
    }
  })
}

/** ¿Qué tan grande puede ser la primera etapa? Aquí —y solo aquí— entran los ingresos. */
type Capacidad = "acotada" | "media" | "amplia"

function capacidad(a: Answers): Capacidad {
  const r = a.revenue as string
  const size = a.size as string
  // Sin dato de ingresos se usa el tamaño del equipo, que es un proxy honesto
  // y que la persona sí quiso responder.
  if (!r || r === "prefiero-no") {
    if (size === "solo") return "acotada"
    if (size === "20+") return "amplia"
    return "media"
  }
  if (r === "menos-50k") return "acotada"
  if (r === "50k-150k") return "media"
  return "amplia"
}

const GIRO_LABEL: Record<string, string> = {
  restaurante: "restaurante",
  retail: "comercio",
  servicios: "negocio de servicios",
  fitness: "negocio fitness",
  salud: "consultorio",
  eventos: "negocio de eventos",
  b2b: "negocio B2B",
  otro: "negocio",
}

function buildRecommendation(
  a: Answers,
  dims: DimensionResult[],
  cap: Capacidad
): Recommendation {
  const byId = Object.fromEntries(dims.map((d) => [d.id, d])) as Record<DimensionId, DimensionResult>
  const grave = (id: DimensionId) => byId[id].state === "prioridad"
  const notable = (id: DimensionId) => grave(id) || byId[id].state === "oportunidad"

  const industry = a.industry as string
  const manual = asArray(a.manualWork).filter((x) => x !== "ninguno")

  // ── Producto propio: solo cuando el giro Y la necesidad encajan ──
  if (industry === "fitness" && (notable("operacion") || notable("clientes"))) {
    return {
      category: "product",
      product: "ACTIIVA",
      title: "Un producto pensado para tu giro, y una web que lo sostenga",
      body: "Por lo que nos cuentas, tu operación se parece mucho a la de los negocios para los que estamos construyendo ACTIIVA: membresías, reservas y cobros en un mismo lugar. Todavía está en desarrollo, así que no podemos prometerte fecha ni precio, pero sí avisarte en cuanto puedas probarla. Mientras tanto, la presencia pública sí se puede resolver ya.",
      fase_inicial: ["Sitio público que explique el negocio y capte contacto"],
      evolucion: ["Acceso anticipado a ACTIIVA cuando esté disponible", "O un desarrollo a la medida si prefieres no esperar"],
    }
  }
  /**
   * Salud ya no tiene producto propio.
   *
   * El diagnóstico de un consultorio sale de sus necesidades, como el de
   * cualquier otro giro. Tampoco se presenta a USERS como especialista en
   * regulación sanitaria: haber explorado el sector no nos vuelve expertos
   * en sus permisos, y afirmarlo sería vender algo que no podemos sostener.
   */

  // ── No necesita software a medida ──
  const todoOrdenado =
    !notable("operacion") && !notable("tecnologia") && manual.length <= 1
  if (todoOrdenado && notable("presencia")) {
    return {
      category: "web",
      title: "Por ahora, no parece que necesites un sistema a medida",
      body: "Tu operación ya está razonablemente ordenada: lo que falta no es software, es que tu presencia digital trabaje. Construir un sistema hoy sería resolver un problema que todavía no tienes.",
      fase_inicial: ["Sitio web que explique el negocio y genere contacto"],
      evolucion: ["Revisar de nuevo cuando el volumen o el equipo crezcan"],
    }
  }
  if (todoOrdenado && !notable("presencia") && !notable("clientes")) {
    return {
      category: "no_custom",
      title: "No vemos un problema que justifique construir algo ahora",
      body: "Por tus respuestas, ni tu presencia ni tu operación están frenando al negocio. Preferimos decírtelo a venderte un proyecto que no vas a aprovechar. Si más adelante crece el volumen o aparece un cuello de botella, ahí sí conviene revisarlo.",
      fase_inicial: ["Nada urgente"],
      evolucion: ["Volver a revisarlo cuando cambie el volumen, el equipo o los canales de venta"],
    }
  }

  /**
   * ── Operación pesada: software ──
   *
   * La operación tiene que ser al menos tan grave como la presencia para
   * recomendar un sistema. Sin esta condición, un negocio sin sitio web y con
   * un solo proceso manual recibía "construyamos un sistema administrativo":
   * es venderle lo grande cuando su problema es lo básico, justo lo que un
   * diagnóstico honesto debe evitar.
   */
  const operacionPesada =
    (grave("operacion") || (notable("operacion") && notable("tecnologia"))) &&
    STATE_RANK[byId.operacion.state] <= STATE_RANK[byId.presencia.state]
  if (operacionPesada) {
    const acotado = cap === "acotada"
    return {
      category: "software",
      title: acotado
        ? "Empezar por la parte de la operación que más te cuesta"
        : "Un sistema que sostenga la operación, por etapas",
      body: acotado
        ? "Lo que más te está costando es la operación diaria. Con el tamaño actual del negocio, construir todo de una vez sería sobredimensionado: conviene empezar por el proceso que más tiempo te quita y crecer desde ahí."
        : "La operación es hoy el cuello de botella. Tiene sentido construir un sistema propio, pero por etapas: primero lo que más duele, después el resto.",
      fase_inicial: acotado
        ? ["El proceso manual que más tiempo consume", "Presencia pública si todavía no existe"]
        : ["Sistema administrativo del proceso principal", "Presencia pública conectada"],
      evolucion: acotado
        ? ["Sumar los demás procesos conforme se justifiquen", "Portal o automatizaciones para clientes"]
        : ["Roles y permisos por puesto", "Portal de clientes", "Reportes y control"],
    }
  }

  // ── Clientes preguntando de más: web + herramienta ──
  if (notable("clientes") || notable("adquisicion")) {
    const asks = asArray(a.customerAsks)
    const herramienta = asks.includes("precios")
      ? "un cotizador que arme la propuesta antes de que te escriban"
      : asks.includes("disponibilidad")
        ? "reservas o agenda que se consulten sin preguntarte"
        : asks.includes("estado")
          ? "un portal donde tu cliente vea cómo va lo suyo"
          : "una herramienta que resuelva lo que hoy se pregunta por mensaje"
    return {
      category: "web_plus",
      title: "Una web que además haga trabajo, no solo que se vea bien",
      body: `Tu presencia no solo tiene que explicar el negocio: por lo que nos cuentas, conviene que incluya ${herramienta}. Ahí es donde se recupera el tiempo que hoy se va en responder lo mismo.`,
      fase_inicial: ["Sitio web con la información que hoy se pregunta", "La herramienta que resuelva la consulta más repetida"],
      evolucion: ["Conectar con tu operación interna", "Automatizar seguimientos"],
    }
  }

  // ── Por defecto: presencia ──
  return {
    category: "web",
    title: "Empezar por una presencia que trabaje",
    body: "Por tus respuestas, el punto de mayor retorno hoy está en la presencia: que te encuentren, que entiendan qué haces y que puedan contactarte sin fricción.",
    fase_inicial: ["Sitio web que explique el negocio y capte contacto"],
    evolucion: ["Sumar herramientas cuando la operación lo pida"],
  }
}

function buildOpportunities(dims: DimensionResult[], rec: Recommendation): Opportunity[] {
  const ordered = [...dims].sort((a, b) => STATE_RANK[a.state] - STATE_RANK[b.state])
  const relevantes = ordered.filter((d) => d.state === "prioridad" || d.state === "oportunidad")

  const COPY: Record<DimensionId, { title: string; body: string; solution?: string }> = {
    presencia: {
      title: "Que tu presencia explique y capte",
      body: "Un lugar propio donde se entienda qué haces, para quién y cómo contratarte.",
      solution: "/soluciones/desarrollo-web",
    },
    adquisicion: {
      title: "Acortar el camino entre interés y conversación",
      body: "Que quien se interesa pueda avanzar sin esperar a que contestes.",
      solution: "/soluciones/cotizadores-digitales",
    },
    operacion: {
      title: "Quitar de encima el trabajo repetido",
      body: "Registrar una vez lo que hoy se anota en varios lados.",
      solution: "/soluciones/software-a-medida",
    },
    clientes: {
      title: "Que el cliente resuelva solo lo que hoy pregunta",
      body: "Consultar, reservar o cotizar sin que alguien tenga que contestar.",
      solution: "/soluciones/portales-para-clientes",
    },
    tecnologia: {
      title: "Conectar lo que hoy vive separado",
      body: "Que la información deje de copiarse de una herramienta a otra.",
      solution: "/soluciones/software-a-medida",
    },
    escalabilidad: {
      title: "Preparar el negocio para el siguiente escalón",
      body: "Que crecer no signifique contratar a alguien para hacer lo mismo a mano.",
    },
  }

  const horizontes: Horizon[] = ["ahora", "despues", "mas_adelante"]
  // Cuando no hay nada urgente, no se inventan oportunidades para llenar.
  if (relevantes.length === 0) return []

  return relevantes.slice(0, 3).map((d, i) => ({
    horizon: horizontes[i] ?? "mas_adelante",
    title: COPY[d.id].title,
    body: COPY[d.id].body,
    solution: rec.category === "no_custom" ? undefined : COPY[d.id].solution,
  }))
}

function buildHeadline(a: Answers, prioridad: DimensionResult, rec: Recommendation): string {
  const giro = GIRO_LABEL[a.industry as string] ?? "negocio"
  if (rec.category === "no_custom")
    return `Por ahora tu ${giro} no necesita que construyamos nada: lo que tienes está funcionando.`
  if (rec.category === "product")
    return `Tu ${giro} encaja con un producto que ya estamos construyendo, y con una presencia que puede resolverse desde ahora.`

  switch (prioridad.id) {
    case "operacion":
      return `Antes de vender más, conviene que tu ${giro} deje de sostenerse en trabajo manual.`
    case "clientes":
      return `Tu siguiente paso no parece ser más publicidad: es que tus clientes puedan resolver solos lo que hoy te preguntan.`
    case "adquisicion":
      return `El interés existe; lo que falta es que el camino de interesado a cliente no dependa de que tú contestes.`
    case "tecnologia":
      return `El problema no es falta de esfuerzo: es que la información de tu ${giro} vive en lugares que no se hablan.`
    case "escalabilidad":
      return `Tu ${giro} funciona hoy, pero lo que lo sostiene no aguantaría el doble de volumen.`
    default:
      return `El punto de mayor retorno para tu ${giro} está en convertir tu presencia en una herramienta comercial.`
  }
}

function buildReasons(a: Answers, dims: DimensionResult[], rec: Recommendation): string[] {
  const razones: string[] = []
  const conEvidencia = dims
    .filter((d) => d.evidence.length > 0)
    .sort((x, y) => STATE_RANK[x.state] - STATE_RANK[y.state])

  for (const d of conEvidencia.slice(0, 3)) {
    razones.push(d.evidence[0])
  }
  if (rec.category === "no_custom" && razones.length === 0) {
    razones.push("Tus respuestas no muestran procesos manuales ni preguntas repetidas que justifiquen construir un sistema.")
  }
  return razones.slice(0, 4)
}

function newRef(): string {
  return `DX-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
}

export function diagnose(a: Answers, ref = newRef()): Diagnosis {
  const signals = collectSignals(a)
  const dimensions = evaluateDimensions(signals)
  const cap = capacidad(a)

  const ordered = [...dimensions].sort((x, y) => STATE_RANK[x.state] - STATE_RANK[y.state])
  const prioridad = ordered[0]

  const recomendacion = buildRecommendation(a, dimensions, cap)
  const oportunidades = buildOpportunities(dimensions, recomendacion)

  const observaciones = dimensions
    .filter((d) => d.state === "prioridad" || d.state === "oportunidad")
    .flatMap((d) => d.evidence)
    .slice(0, 5)

  const requiereCotizacion =
    recomendacion.category === "software" || recomendacion.category === "web_plus"

  return {
    headline: buildHeadline(a, prioridad, recomendacion),
    prioridad,
    dimensions,
    observaciones,
    oportunidades,
    recomendacion,
    razones: buildReasons(a, dimensions, recomendacion),
    inversion: {
      entrada:
        recomendacion.category === "no_custom"
          ? "Sin inversión recomendada por ahora"
          : "Proyectos desde $11,900 MXN",
      nota: requiereCotizacion
        ? "El alcance exacto depende de las funciones, integraciones y complejidad. Lo cotizamos después de revisarlo contigo."
        : "El precio final depende del contenido y de las funciones que se incluyan.",
      requiereCotizacion,
    },
    ref,
  }
}
