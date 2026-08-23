import { siteConfig } from "@/lib/site-config"

/**
 * Disponibilidad del especialista.
 *
 * El Centro automatizado funciona 24/7; esto solo determina si además hay
 * alguien del equipo para retomar. Se calcula siempre en la zona horaria
 * configurada (America/Mexico_City), nunca en la del dispositivo: un cliente
 * en otro huso vería un horario equivocado.
 */
const { supportHours, supportDays } = siteConfig.contact

export interface Availability {
  specialistAvailable: boolean
  /** Texto para mostrar, siempre desde configuración. */
  label: string
  timezone: string
}

/**
 * `now` es inyectable para poder probar horarios sin depender del reloj real.
 */
export function getAvailability(now: Date = new Date()): Availability {
  const tz = supportHours.timezone

  // Hora y día EN la zona configurada, no en la del navegador.
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hour12: false,
  }).formatToParts(now)

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ""
  const hour = parseInt(get("hour"), 10)
  const minute = parseInt(get("minute"), 10)
  const weekdayShort = get("weekday")

  const dayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(weekdayShort)
  const isWorkday = supportDays.includes(dayIndex)

  const [fromH, fromM] = supportHours.from.split(":").map(Number)
  const [toH, toM] = supportHours.to.split(":").map(Number)
  const minutes = hour * 60 + minute
  const inWindow = minutes >= fromH * 60 + fromM && minutes < toH * 60 + toM

  return {
    specialistAvailable: isWorkday && inWindow,
    label: `${siteConfig.contact.supportDaysLabel}, ${supportHours.from} a ${supportHours.to} h`,
    timezone: tz,
  }
}
