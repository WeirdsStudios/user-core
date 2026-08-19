"use client"

import type { AnalyticsEvent, EventMeta } from "./events"
import { getAttribution } from "./attribution"

/**
 * Punto único de emisión de eventos.
 *
 * Ningún componente habla con GA, Meta o Vercel directamente: llaman a
 * `trackEvent` y esta capa decide a dónde va. Cambiar de proveedor —o no
 * tener ninguno— no obliga a tocar un solo componente.
 *
 * Funciona sin proveedor configurado: si no hay nada, no envía nada y no
 * rompe. En desarrollo escribe en consola para poder verificar la
 * instrumentación sin depender de un dashboard externo.
 */

/** Claves que el resto de la aplicación puede mandar. Todo lo demás se cae. */
const ALLOWED_KEYS = new Set<keyof EventMeta>([
  "page",
  "category",
  "slug",
  "mode",
  "surface",
  "step",
  "turn",
  "cta",
])

/** Parece un dato personal aunque venga en una clave permitida. */
const LOOKS_PERSONAL =
  /@|\+?\d{7,}|https?:\/\/|contrasen|password|token|clabe|tarjeta/i

/**
 * Última barrera antes de salir del navegador.
 *
 * El tipo `EventMeta` ya restringe qué se puede mandar, pero un tipo no
 * existe en ejecución: si alguien arma metadata dinámicamente, esto es lo
 * único que impide que un correo o un mensaje completo termine en analytics.
 */
function sanitizeMeta(meta: EventMeta): Record<string, string | number> {
  const clean: Record<string, string | number> = {}

  for (const [key, value] of Object.entries(meta)) {
    if (!ALLOWED_KEYS.has(key as keyof EventMeta)) continue
    if (value === undefined || value === null) continue

    if (typeof value === "number") {
      clean[key] = value
      continue
    }
    const text = String(value)
    // Valores cortos y sin pinta de dato personal. Un texto largo casi
    // siempre significa que alguien pasó contenido del usuario por error.
    if (text.length > 64 || LOOKS_PERSONAL.test(text)) continue
    clean[key] = text
  }

  return clean
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    va?: (event: string, name: string, data?: Record<string, unknown>) => void
  }
}

export function trackEvent(name: AnalyticsEvent, meta: EventMeta = {}) {
  if (typeof window === "undefined") return

  const payload = {
    ...sanitizeMeta(meta),
    // La atribución viaja con cada evento para poder separar por origen sin
    // depender de que el proveedor conserve la sesión.
    ...getAttribution(),
  }

  try {
    // Vercel Analytics — sin cookies, no necesita ID.
    window.va?.("event", name, payload)

    // GA4 — solo si hay Measurement ID configurado y el script cargó.
    window.gtag?.("event", name, payload)

    // Meta Pixel — eventos personalizados.
    window.fbq?.("trackCustom", name, payload)

    if (process.env.NODE_ENV === "development") {
      console.debug("[analytics]", name, payload)
    }
  } catch {
    // La medición nunca puede romper el sitio.
  }
}

/**
 * Página vista. Se llama desde un solo lugar (`AnalyticsProvider`), no desde
 * cada página: en el App Router la navegación es cliente y hacerlo por página
 * se duplica en cuanto alguien añade un layout.
 */
export function trackPageView(path: string) {
  trackEvent("page_view", { page: path })
}
