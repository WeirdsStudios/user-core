/**
 * Puente del Centro de Atención hacia la capa de analytics de USERS.
 *
 * Antes esto era una abstracción propia con su propio destino. Tener dos
 * sistemas de eventos en el mismo sitio garantiza que tarde o temprano midan
 * cosas distintas, así que ahora solo reexporta la capa única.
 *
 * PRIVACIDAD: sigue sin registrarse el texto de ninguna conversación. Solo
 * categoría, decisión, superficie y turno.
 */
export { trackEvent as track } from "@/lib/analytics/track"
export type { AnalyticsEvent as SupportEvent, EventMeta as SupportEventPayload } from "@/lib/analytics/events"
