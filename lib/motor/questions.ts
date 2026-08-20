import type { DimensionId } from "./types"

/**
 * El cuestionario, como datos.
 *
 * Cada pregunta declara `feeds`: a qué dimensiones alimenta. El tipo lo exige,
 * así que no se puede añadir una pregunta decorativa sin que el compilador
 * pregunte para qué sirve. En la versión anterior diez preguntas se guardaban
 * y no tocaban ninguna conclusión; esta restricción existe para que no vuelva
 * a pasar sin que alguien lo note.
 *
 * `why` se muestra a la persona cuando la pregunta puede sentirse invasiva.
 */

export type FieldKind = "single" | "multi" | "text" | "email" | "tel"

export interface Option {
  value: string
  label: string
  /** Pista corta bajo la opción. Solo cuando la etiqueta no basta. */
  hint?: string
}

export interface Question {
  id: string
  step: number
  kind: FieldKind
  label: string
  /** Por qué lo preguntamos. Se muestra tal cual. */
  why?: string
  placeholder?: string
  required?: boolean
  options?: Option[]
  /** Dimensiones que esta respuesta alimenta. Vacío no es válido. */
  feeds: readonly DimensionId[]
}

export const STEPS = [
  { n: 1, title: "Tu negocio", subtitle: "Para entender de qué estamos hablando" },
  { n: 2, title: "Cómo vendes", subtitle: "De dónde llegan tus clientes hoy" },
  { n: 3, title: "Cómo operas", subtitle: "Qué haces a mano todos los días" },
  { n: 4, title: "Tus clientes", subtitle: "Qué te preguntan una y otra vez" },
  { n: 5, title: "Prioridad", subtitle: "Qué quieres resolver primero" },
  // No hay paso de contacto: el diagnóstico se entrega completo y los datos se
  // piden después, cuando la persona ya sabe si le sirve. Dejarlo aquí creaba
  // un sexto paso vacío.
] as const

export const QUESTIONS: Question[] = [
  // ── 1. Tu negocio ────────────────────────────────────────────────────────
  {
    id: "businessName",
    step: 1,
    kind: "text",
    label: "¿Cómo se llama tu negocio?",
    placeholder: "Ej. Taquería El Güero",
    required: true,
    feeds: ["presencia"],
  },
  {
    id: "industry",
    step: 1,
    kind: "single",
    label: "¿A qué se dedica?",
    required: true,
    feeds: ["presencia", "operacion", "clientes"],
    options: [
      { value: "restaurante", label: "Restaurante o alimentos" },
      { value: "retail", label: "Tienda o comercio" },
      { value: "servicios", label: "Servicios profesionales" },
      { value: "fitness", label: "Gimnasio o estudio fitness" },
      { value: "salud", label: "Consultorio o clínica" },
      { value: "eventos", label: "Eventos o banquetes" },
      { value: "b2b", label: "Venta a otras empresas" },
      { value: "otro", label: "Otro" },
    ],
  },
  {
    id: "size",
    step: 1,
    kind: "single",
    label: "¿De qué tamaño es el equipo?",
    why: "El tamaño cambia qué tanto sentido tiene automatizar y con qué orden.",
    required: true,
    feeds: ["operacion", "escalabilidad"],
    options: [
      { value: "solo", label: "Solo yo" },
      { value: "2-5", label: "2 a 5 personas" },
      { value: "6-20", label: "6 a 20 personas" },
      { value: "20+", label: "Más de 20" },
    ],
  },
  {
    id: "revenue",
    step: 1,
    kind: "single",
    label: "¿En qué rango están tus ingresos mensuales?",
    why: "Nos ayuda a dimensionar qué inversión y qué alcance tienen sentido para el tamaño actual del negocio. No cambia el diagnóstico, sí el orden de lo que conviene construir primero.",
    required: false,
    feeds: ["escalabilidad"],
    options: [
      { value: "menos-50k", label: "Menos de $50,000" },
      { value: "50k-150k", label: "$50,000 a $150,000" },
      { value: "150k-500k", label: "$150,000 a $500,000" },
      { value: "500k+", label: "Más de $500,000" },
      { value: "prefiero-no", label: "Prefiero no decirlo" },
    ],
  },

  // ── 2. Cómo vendes ───────────────────────────────────────────────────────
  {
    id: "hasWebsite",
    step: 2,
    kind: "single",
    label: "¿Tienes sitio web hoy?",
    required: true,
    feeds: ["presencia"],
    options: [
      { value: "no", label: "No tengo" },
      { value: "redes", label: "Solo redes sociales" },
      { value: "viejo", label: "Tengo uno, pero está desactualizado" },
      { value: "si", label: "Sí, y funciona bien" },
    ],
  },
  {
    id: "acquisition",
    step: 2,
    kind: "multi",
    label: "¿Por dónde te llegan los clientes?",
    required: true,
    feeds: ["adquisicion", "presencia"],
    options: [
      { value: "recomendacion", label: "Recomendación de boca en boca" },
      { value: "redes", label: "Redes sociales" },
      { value: "whatsapp", label: "WhatsApp directo" },
      { value: "google", label: "Búsquedas en Google" },
      { value: "local", label: "Pasan por el local" },
      { value: "publicidad", label: "Publicidad pagada" },
    ],
  },
  {
    id: "closeProcess",
    step: 2,
    kind: "single",
    label: "Cuando alguien se interesa, ¿cómo sigue el proceso?",
    required: true,
    feeds: ["adquisicion", "clientes"],
    options: [
      { value: "manual-todo", label: "Le contesto yo cada mensaje, desde cero" },
      { value: "manual-cotiza", label: "Contesto y armo la cotización a mano" },
      { value: "parcial", label: "Algo está automatizado, el resto no" },
      { value: "automatizado", label: "El cliente puede avanzar solo" },
    ],
  },

  // ── 3. Cómo operas ───────────────────────────────────────────────────────
  {
    id: "manualWork",
    step: 3,
    kind: "multi",
    label: "¿Qué haces a mano hoy?",
    why: "Aquí es donde suele estar el tiempo que se recupera.",
    required: true,
    feeds: ["operacion", "escalabilidad"],
    options: [
      { value: "agenda", label: "Agendar citas o reservas" },
      { value: "cobros", label: "Registrar cobros y ventas" },
      { value: "inventario", label: "Llevar inventario" },
      { value: "clientes", label: "Anotar datos de clientes" },
      { value: "recordatorios", label: "Recordar vencimientos o seguimientos" },
      { value: "reportes", label: "Armar reportes o cortes" },
      { value: "ninguno", label: "Casi todo ya está sistematizado" },
    ],
  },
  {
    id: "tools",
    step: 3,
    kind: "single",
    label: "¿Con qué llevas la información del negocio?",
    required: true,
    feeds: ["tecnologia", "operacion"],
    options: [
      { value: "papel", label: "Papel, libreta o memoria" },
      { value: "excel", label: "Excel o Google Sheets" },
      { value: "apps", label: "Varias apps que no se hablan entre sí" },
      { value: "sistema", label: "Un sistema que ya integra casi todo" },
    ],
  },

  // ── 4. Tus clientes ──────────────────────────────────────────────────────
  {
    id: "customerAsks",
    step: 4,
    kind: "multi",
    label: "¿Qué te preguntan tus clientes una y otra vez?",
    required: true,
    feeds: ["clientes", "presencia"],
    options: [
      { value: "precios", label: "Precios o cotizaciones" },
      { value: "disponibilidad", label: "Si hay lugar o cupo" },
      { value: "estado", label: "Cómo va su pedido o su cuenta" },
      { value: "catalogo", label: "Qué tienen o qué servicios dan" },
      { value: "horarios", label: "Horarios y ubicación" },
      { value: "pocas", label: "Casi no preguntan, ya está claro" },
    ],
  },

  // ── 5. Prioridad ─────────────────────────────────────────────────────────
  {
    id: "priority",
    step: 5,
    kind: "single",
    label: "Si pudieras resolver una sola cosa este año, ¿cuál sería?",
    required: true,
    feeds: ["presencia", "adquisicion", "operacion", "clientes"],
    options: [
      { value: "vender-mas", label: "Que me encuentren y me compren más" },
      { value: "menos-manual", label: "Dejar de hacer tanto a mano" },
      { value: "atender-mejor", label: "Que mis clientes resuelvan solos" },
      { value: "ordenar", label: "Tener el negocio ordenado y medido" },
      { value: "crecer", label: "Poder crecer sin que se caiga todo" },
    ],
  },
  {
    id: "timeline",
    step: 5,
    kind: "single",
    label: "¿Para cuándo te gustaría tenerlo funcionando?",
    required: true,
    feeds: ["escalabilidad"],
    options: [
      { value: "urgente", label: "Lo antes posible" },
      { value: "normal", label: "En los próximos meses" },
      { value: "explorando", label: "Estoy explorando, sin prisa" },
    ],
  },
]

export const questionsForStep = (step: number) => QUESTIONS.filter((q) => q.step === step)

/** Preguntas obligatorias de un paso. Sirve para validar antes de avanzar. */
export const requiredForStep = (step: number) =>
  questionsForStep(step).filter((q) => q.required)

export type Answers = Record<string, string | string[] | undefined>

export function isStepComplete(step: number, answers: Answers): boolean {
  return requiredForStep(step).every((q) => {
    const v = answers[q.id]
    if (Array.isArray(v)) return v.length > 0
    return typeof v === "string" && v.trim().length > 0
  })
}
