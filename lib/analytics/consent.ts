"use client"

/**
 * Consentimiento.
 *
 * Nada de publicidad ni medición de terceros se carga antes de que la persona
 * decida. No es una formalidad: los scripts ni siquiera se inyectan hasta que
 * hay permiso, así que rechazar significa que no existen, no que existen pero
 * se portan bien.
 *
 * TRES CATEGORÍAS
 *   necesario    — el sitio funcionando. No se puede desactivar y no usa
 *                  cookies de terceros ni identificadores publicitarios.
 *   analytics    — medir qué páginas se ven y qué CTAs funcionan.
 *   advertising  — audiencias y medición de campañas en Meta y Google.
 *
 * SIN DECISIÓN = SIN CARGA. El estado inicial no es "aceptado por defecto".
 */

export interface ConsentState {
  analytics: boolean
  advertising: boolean
  /** ISO de cuándo se decidió. Permite volver a preguntar si cambia la política. */
  decidedAt: string
  /** Versión de las categorías ofrecidas. Si cambian, se vuelve a preguntar. */
  version: number
}

/** Subir esto invalida las decisiones anteriores y vuelve a mostrar el aviso. */
export const CONSENT_VERSION = 1

const KEY = "users-consent"

/** Nadie ha decidido todavía. */
export const UNDECIDED = null

export type ConsentValue = ConsentState | typeof UNDECIDED

export function readConsent(): ConsentValue {
  if (typeof window === "undefined") return UNDECIDED
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return UNDECIDED
    const parsed = JSON.parse(raw) as ConsentState
    if (parsed.version !== CONSENT_VERSION) return UNDECIDED
    return parsed
  } catch {
    // En navegación privada no se puede recordar la decisión. Se pregunta
    // otra vez, que es lo conservador: nunca asumir un sí que no consta.
    return UNDECIDED
  }
}

type Listener = (value: ConsentValue) => void
const listeners = new Set<Listener>()

export function onConsentChange(fn: Listener): () => void {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function writeConsent(next: { analytics: boolean; advertising: boolean }) {
  const value: ConsentState = {
    ...next,
    decidedAt: new Date().toISOString(),
    version: CONSENT_VERSION,
  }
  try {
    localStorage.setItem(KEY, JSON.stringify(value))
  } catch {
    // Sin almacenamiento la decisión vale solo para esta carga. Se respeta
    // igual: los oyentes reciben el cambio.
  }
  listeners.forEach((fn) => fn(value))
  return value
}

/** Aceptar todo. Es un atajo, no el valor por defecto. */
export const acceptAll = () => writeConsent({ analytics: true, advertising: true })

/**
 * Rechazar lo opcional.
 *
 * Tiene que costar exactamente lo mismo que aceptar: un clic, en un botón
 * igual de visible. Un "rechazar" escondido detrás de dos pantallas no es un
 * rechazo, es un embudo.
 */
export const rejectAll = () => writeConsent({ analytics: false, advertising: false })

export function hasConsent(category: "analytics" | "advertising"): boolean {
  const c = readConsent()
  return c ? c[category] : false
}
