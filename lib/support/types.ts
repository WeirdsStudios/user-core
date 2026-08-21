import type { KbEntry, ResolutionMode } from "@/lib/knowledge-base"

/**
 * Centro de Atención USERS — tipos compartidos.
 *
 * ALCANCE: solo USERS (proyectos a medida, desarrollo, seguimiento, soporte y
 * dudas comerciales de USERS). ACTIIVA tendrá su propio Centro y su
 * propia base de conocimiento; este Centro los reconoce para redirigir, no
 * para dar soporte de producto.
 */

/** Decisión del motor sobre qué puede hacer con la consulta. */
export type Decision = ResolutionMode | "UNKNOWN"

/** Familia de intención. Determina qué datos conviene recabar. */
export type Intent =
  | "saludo"
  | "informacion"
  | "ajuste"
  | "incidente"
  | "funcionalidad"
  | "comercial"
  | "producto"
  | "hablar-humano"
  | "desconocido"

export type Role = "user" | "center"

export interface Message {
  id: string
  role: Role
  text: string
  /** Enlaces sugeridos con la respuesta. */
  links?: { label: string; href: string }[]
  /** Acciones contextuales. Máximo 3. */
  actions?: QuickAction[]
  /** Decisión que produjo esta respuesta. Alimenta la barra de contexto. */
  decision?: Decision
  at: number
}

export interface QuickAction {
  id: string
  label: string
  /** `send` reenvía el texto como si lo hubiera escrito la persona. */
  kind: "send" | "link" | "escalate"
  value?: string
}

/**
 * Datos que el Centro puede recabar. Solo los necesarios para que un
 * especialista pueda retomar sin volver a preguntar todo.
 *
 * NUNCA se pide contraseña, token, clave ni dato bancario.
 */
export interface CollectedContext {
  proyecto?: string
  url?: string
  problema?: string
  desdeCuando?: string
  dispositivo?: string
}

/** Qué falta por preguntar antes de poder escalar con contexto útil. */
export type SlotName = keyof CollectedContext

export interface ConversationState {
  messages: Message[]
  /** Intención vigente. Permite entender respuestas cortas de seguimiento. */
  intent: Intent
  /** Entrada de la KB sobre la que se está conversando. */
  focusEntryId?: string
  collected: CollectedContext
  /** Slots ya preguntados, para no repetir. */
  asked: SlotName[]
  /** Referencia de la solicitud. Se crea al primer mensaje. */
  ref: string
  /** true cuando ya se ofreció escalar. */
  escalationOffered: boolean
}

export interface EngineResult {
  reply: Message
  state: ConversationState
}

/** Resultado del retrieval, antes de decidir. */
export interface RetrievalHit {
  entry: KbEntry
  score: number
  /** 0–1. Confianza normalizada; por debajo del umbral se responde UNKNOWN. */
  confidence: number
}
