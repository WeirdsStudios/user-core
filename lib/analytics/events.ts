import type { FunnelStage, PageType } from "./funnel"

/**
 * Catálogo de eventos de USERS.
 *
 * Un tipo cerrado, no `string`. Si un evento no está aquí, no se puede
 * enviar: es lo que evita que dentro de seis meses convivan
 * `whatsapp_clicked`, `whatsapp_click` y `click_whatsapp` midiendo lo mismo.
 *
 * Regla de granularidad: se instrumenta lo que cambia una decisión comercial
 * o define una audiencia. Un hover, un scroll o un foco no son eventos.
 */

export type AnalyticsEvent =
  // ── Descubrimiento: qué contenido se está viendo ──
  | "page_view"
  | "solution_viewed"
  | "project_viewed"
  | "product_viewed"
  | "article_viewed"
  // ── Interacción: señales de interés real, no de tráfico ──
  | "project_media_started"
  | "support_opened"
  | "support_article_clicked"
  | "analysis_started"
  // ── Intención: la persona quiere avanzar ──
  | "analysis_progressed"
  | "analysis_completed"
  | "analysis_contact_clicked"
  | "cta_analysis_clicked"
  | "cta_contact_clicked"
  | "whatsapp_clicked"
  | "product_trial_clicked"
  | "solution_cta_clicked"
  | "project_cta_clicked"
  // ── Centro de Atención ──
  | "support_quick_action"
  | "support_message_sent"
  | "support_answered"
  | "support_unknown"
  | "support_escalated"
  | "support_whatsapp_clicked"
  // ── Consentimiento: para saber sobre qué base se mide ──
  | "consent_updated"

/**
 * Metadatos permitidos. La lista es cerrada a propósito.
 *
 * NUNCA se envía: texto de conversaciones, nombres, correos, teléfonos,
 * contenido del Motor de Análisis, contraseñas ni URLs privadas. Todo lo que
 * entra aquí describe *qué tipo* de cosa pasó, no *qué dijo* la persona.
 *
 * `sanitizeMeta` en `track.ts` recorta lo que no encaje: el tipo ayuda
 * mientras se programa, pero la garantía tiene que existir en ejecución.
 */
export interface EventMeta {
  /** Ruta, sin parámetros. */
  page_path?: string
  /** Familia de página: solution, project, article… Permite segmentar sin listar URLs. */
  page_type?: PageType
  /** Etapa alcanzada del funnel. */
  funnel_stage?: FunnelStage
  /** Slug de la solución vista. */
  solution?: string
  /** Slug del proyecto visto. */
  project?: string
  /** Nombre del producto (actiiva | mediica). */
  product?: string
  /** Slug del artículo. */
  article?: string
  /** Origen de la campaña. */
  source?: string
  medium?: string
  campaign?: string
  content?: string
  term?: string
  /** Cómo conoció USERS la primera vez, cuando difiere del origen actual. */
  first_source?: string
  first_medium?: string
  first_campaign?: string
  /** Dominio de procedencia, sin ruta. */
  referrer_host?: string
  /** Paso del Motor (1–6). Nunca las respuestas. */
  step?: number
  /** Turno de conversación. Un número, no el mensaje. */
  turn?: number
  /** Familia de la consulta del Centro. Nunca texto libre. */
  category?: string
  /** Decisión del Centro: INFO | GUIDED | SPECIALIST | UNKNOWN. */
  mode?: string
  /** Superficie desde la que se disparó. */
  surface?: "widget" | "page" | "home" | "header" | "footer" | "float"
  /** Identificador estable del CTA, definido por nosotros. */
  cta?: string
  /** Estado de consentimiento, solo en `consent_updated`. */
  consent_analytics?: boolean
  consent_advertising?: boolean
}

/**
 * Conversiones.
 *
 * PRIMARIAS son resultados comerciales: alguien dejó datos o pidió hablar.
 * SECUNDARIAS son señales para construir audiencias — útiles para
 * retargeting, inútiles como medida de éxito. Confundirlas hace que una
 * campaña parezca rentable porque generó visitas a `/proyectos`.
 */
export const CONVERSION_EVENTS = {
  primary: [
    "analysis_completed",
    "cta_contact_clicked",
    "support_whatsapp_clicked",
    "product_trial_clicked",
  ] satisfies AnalyticsEvent[],
  secondary: [
    "analysis_started",
    "analysis_progressed",
    "project_viewed",
    "solution_viewed",
    "support_opened",
    "whatsapp_clicked",
  ] satisfies AnalyticsEvent[],
} as const
