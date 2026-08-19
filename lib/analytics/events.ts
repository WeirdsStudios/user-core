/**
 * Catálogo de eventos de USERS.
 *
 * Un tipo cerrado, no `string`. Si un evento no está aquí, no se puede
 * enviar: es lo que evita que dentro de seis meses convivan
 * `whatsapp_clicked`, `whatsapp_click` y `click_whatsapp` midiendo lo mismo.
 *
 * Regla de granularidad: se instrumenta lo que cambia una decisión comercial,
 * no cada micro-interacción. Un hover, un scroll o un foco no son eventos.
 */

export type AnalyticsEvent =
  // ── Sitio ──
  | "page_view"
  | "cta_analysis_clicked"
  | "cta_contact_clicked"
  | "whatsapp_clicked"
  // ── Motor de Análisis ──
  | "analysis_started"
  | "analysis_step_completed"
  | "analysis_completed"
  | "analysis_contact_clicked"
  // ── Soluciones ──
  | "solution_viewed"
  | "solution_cta_clicked"
  // ── Proyectos ──
  | "project_viewed"
  | "project_media_started"
  | "project_cta_clicked"
  // ── Productos ──
  | "product_viewed"
  | "product_trial_clicked"
  // ── Centro de Atención ──
  | "support_opened"
  | "support_quick_action"
  | "support_message_sent"
  | "support_answered"
  | "support_unknown"
  | "support_escalated"
  | "support_whatsapp_clicked"
  | "support_article_clicked"

/**
 * Metadatos permitidos. La lista es cerrada a propósito.
 *
 * NUNCA se envía: texto de conversaciones, nombres, correos, teléfonos,
 * contenido de formularios, contraseñas ni URLs privadas. Todo lo que entra
 * aquí describe *qué tipo* de cosa pasó, no *qué dijo* la persona.
 *
 * `sanitizeMeta` en `track.ts` recorta lo que no encaje: el tipo ayuda en
 * desarrollo, pero la garantía tiene que existir también en ejecución.
 */
export interface EventMeta {
  /** Ruta donde ocurrió. Solo rutas públicas del sitio, sin query. */
  page?: string
  /** Familia de la consulta o del contenido. Nunca texto libre del usuario. */
  category?: string
  /** Slug de proyecto, solución o producto. */
  slug?: string
  /** Decisión del Centro: INFO | GUIDED | SPECIALIST | UNKNOWN. */
  mode?: string
  /** Superficie desde la que se disparó. */
  surface?: "widget" | "page" | "home" | "header" | "footer" | "float"
  /** Paso del Motor de Análisis (1–6). Nunca las respuestas. */
  step?: number
  /** Turno de conversación. Un número, no el mensaje. */
  turn?: number
  /** Identificador estable del CTA, definido por nosotros. */
  cta?: string
}

/**
 * Eventos que recomendamos marcar como conversión en la plataforma.
 * Se exporta para documentarlo en un solo lugar y que la configuración de
 * GA4 / Meta no dependa de la memoria de nadie.
 */
export const CONVERSION_EVENTS = {
  primary: [
    "analysis_completed",
    "cta_contact_clicked",
    "support_whatsapp_clicked",
  ] satisfies AnalyticsEvent[],
  product: ["product_trial_clicked"] satisfies AnalyticsEvent[],
} as const
