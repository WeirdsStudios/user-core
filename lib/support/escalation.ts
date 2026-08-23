import { siteConfig } from "@/lib/site-config"
import { getAvailability } from "./schedule"
import { redact } from "./redact"
import type { ConversationState } from "./types"

/**
 * Capa de escalamiento.
 *
 * Construye un resumen legible para WhatsApp: lo suficiente para que un
 * especialista retome sin volver a preguntar todo, y lo bastante corto para
 * que quepa en una URL sin romperse.
 *
 * Todo lo que sale pasa por `redact`: si alguien escribió una contraseña por
 * descuido, no se reenvía.
 */

/** WhatsApp trunca URLs muy largas; este margen es conservador. */
const MAX_SUMMARY_CHARS = 900

const INTENT_LABEL: Record<string, string> = {
  incidente: "Incidente",
  ajuste: "Ajuste de contenido",
  funcionalidad: "Funcionalidad nueva",
  comercial: "Consulta comercial",
  informacion: "Consulta",
  producto: "Producto USERS",
  "hablar-humano": "Solicitud de contacto",
  desconocido: "Consulta",
}

export function buildSummary(state: ConversationState): string {
  const lines: string[] = [
    "Solicitud desde el Centro de Atención USERS",
    "",
    `Referencia: ${state.ref}`,
    `Tipo: ${INTENT_LABEL[state.intent] ?? "Consulta"}`,
  ]

  const { proyecto, problema, url, desdeCuando, dispositivo } = state.collected
  if (proyecto) lines.push(`Proyecto: ${redact(proyecto)}`)
  if (problema) lines.push(`Problema: ${redact(problema)}`)
  if (url) lines.push(`Dónde: ${redact(url)}`)
  if (desdeCuando) lines.push(`Desde: ${redact(desdeCuando)}`)
  if (dispositivo) lines.push(`Dispositivo: ${redact(dispositivo)}`)

  // Últimos turnos, no la conversación completa.
  const recent = state.messages.filter((m) => m.role === "user").slice(-3)
  if (recent.length > 0) {
    lines.push("", "Lo que comentó:")
    recent.forEach((m) => lines.push(`· ${redact(m.text)}`))
  }

  const { specialistAvailable, label } = getAvailability()
  if (!specialistAvailable) {
    lines.push("", `(Enviado fuera del horario de atención: ${label})`)
  }

  let summary = lines.join("\n")
  if (summary.length > MAX_SUMMARY_CHARS) {
    summary = `${summary.slice(0, MAX_SUMMARY_CHARS - 20)}\n…(resumen recortado)`
  }
  return summary
}

/** Enlace de WhatsApp al número centralizado, con el resumen codificado. */
export function buildWhatsAppUrl(state: ConversationState): string {
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(buildSummary(state))}`
}
