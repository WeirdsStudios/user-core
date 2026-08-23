"use client"

import type { AnalyticsEvent, EventMeta } from "./events"
import { attributionMeta } from "./attribution"
import { hasConsent } from "./consent"
import {
  advanceStage,
  pageTypeOf,
  readStage,
  stageForEvent,
  stageForPage,
} from "./funnel"
import { ga4, meta, vercel } from "./providers"

/**
 * Punto único de emisión de eventos.
 *
 * Ningún componente habla con Google, Meta o Vercel directamente: llaman a
 * `trackEvent` y esta capa decide si puede enviarse y a dónde. Cambiar de
 * proveedor —o no tener ninguno— no obliga a tocar un solo componente.
 *
 * ORDEN DE DECISIONES
 *   1. ¿Hay consentimiento para esta categoría? Si no, no sale nada.
 *   2. Limpiar los metadatos. Última barrera antes de salir del navegador.
 *   3. Enriquecer con etapa de funnel y atribución.
 *   4. Repartir a cada adapter, cada uno con su criterio.
 *
 * Todo va envuelto: un fallo de medición nunca puede romper el sitio.
 */

/** Claves que el resto de la aplicación puede mandar. Todo lo demás se cae. */
const ALLOWED_KEYS = new Set<keyof EventMeta>([
  "page_path",
  "page_type",
  "funnel_stage",
  "solution",
  "project",
  "product",
  "article",
  "source",
  "medium",
  "campaign",
  "content",
  "term",
  "first_source",
  "first_medium",
  "first_campaign",
  "referrer_host",
  "step",
  "turn",
  "category",
  "mode",
  "surface",
  "cta",
  "consent_analytics",
  "consent_advertising",
])

/** Parece un dato personal aunque venga en una clave permitida. */
const LOOKS_PERSONAL =
  /@|\+?\d{7,}|https?:\/\/|contrasen|password|token|clabe|tarjeta/i

/**
 * Última barrera antes de salir del navegador.
 *
 * `EventMeta` ya restringe qué se puede mandar, pero un tipo no existe en
 * ejecución: si alguien arma metadata dinámicamente, esto es lo único que
 * impide que un correo o un mensaje completo termine en analytics.
 */
function sanitizeMeta(meta: EventMeta): Record<string, string | number | boolean> {
  const clean: Record<string, string | number | boolean> = {}

  for (const [key, value] of Object.entries(meta)) {
    if (!ALLOWED_KEYS.has(key as keyof EventMeta)) continue
    if (value === undefined || value === null) continue

    if (typeof value === "number" || typeof value === "boolean") {
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

/**
 * Modo de depuración.
 *
 * Se activa con `?debug_analytics=1` o en desarrollo. Imprime lo que se
 * enviaría —ya saneado, así que nunca muestra datos personales— y marca los
 * eventos para poder filtrarlos si el proveedor lo permite.
 */
function debugEnabled(): boolean {
  if (process.env.NODE_ENV === "development") return true
  try {
    if (new URLSearchParams(window.location.search).has("debug_analytics")) {
      sessionStorage.setItem("users-debug-analytics", "1")
    }
    return sessionStorage.getItem("users-debug-analytics") === "1"
  } catch {
    return false
  }
}

export function trackEvent(name: AnalyticsEvent, extra: EventMeta = {}) {
  if (typeof window === "undefined") return

  try {
    const path = extra.page_path ?? window.location.pathname

    // La etapa avanza con lo que la persona hace, no con dónde está.
    const candidate = stageForEvent(name) ?? stageForPage(path)
    const funnel_stage = advanceStage(candidate)

    const payload = sanitizeMeta({
      page_path: path,
      page_type: pageTypeOf(path),
      funnel_stage,
      ...extra,
      ...attributionMeta(),
    })

    const analytics = hasConsent("analytics")
    const advertising = hasConsent("advertising")

    if (debugEnabled()) {
      console.debug(
        `[analytics] ${name}`,
        payload,
        `consent: analytics=${analytics} ads=${advertising}`
      )
    }

    // El consentimiento de medición decide, no la disponibilidad del script.
    if (analytics) {
      vercel.send(name, payload)
      ga4.send(name, payload)
    }
    if (advertising) {
      meta.send(name, payload)
    }
  } catch {
    // La medición nunca puede romper el sitio.
  }
}

/**
 * Página vista. Se llama desde un solo lugar (`Analytics`), no desde cada
 * página: en el App Router la navegación es de cliente y hacerlo por página
 * se duplica en cuanto alguien añade un layout.
 */
export function trackPageView(path: string) {
  if (typeof window === "undefined") return
  try {
    const funnel_stage = advanceStage(stageForPage(path))
    const payload = sanitizeMeta({
      page_path: path,
      page_type: pageTypeOf(path),
      funnel_stage,
      ...attributionMeta(),
    })

    if (debugEnabled()) {
      console.debug("[analytics] page_view", payload)
    }

    if (hasConsent("analytics")) {
      vercel.send("page_view", payload)
      ga4.pageView(path, payload)
    }
  } catch {
    /* la medición nunca rompe la navegación */
  }
}

export { readStage as currentFunnelStage }
