"use client"

import type { AnalyticsEvent } from "./events"

/**
 * Adapters de proveedor.
 *
 * Cada plataforma tiene su propio vocabulario. En vez de contaminar el
 * catálogo interno con nombres de Meta o de Google, cada adapter traduce.
 * Así podemos renombrar un evento nuestro sin romper una conversión
 * configurada en un panel externo, y añadir un proveedor sin tocar nada más.
 *
 * INERTES POR DEFECTO. Cada uno comprueba dos cosas antes de hacer nada:
 * que exista su identificador y que el script haya cargado. Sin ID no hay
 * script; sin script no hay envío. La aplicación compila y funciona igual.
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
/** Google Ads (AW-XXXXXXXXX). Solo hace falta para conversiones importadas. */
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    va?: (event: string, name: string, data?: Record<string, unknown>) => void
    dataLayer?: unknown[]
  }
}

/**
 * Meta: eventos estándar del Pixel.
 *
 * Los estándar sirven para optimización automática de campañas; los
 * personalizados solo para audiencias. Se mapea a estándar lo que de verdad
 * corresponde y se deja el resto como `trackCustom` — forzar un `Purchase`
 * donde no hubo compra ensucia el modelo de la plataforma y termina
 * empeorando la entrega de los anuncios.
 */
const META_STANDARD: Partial<Record<AnalyticsEvent, string>> = {
  page_view: "PageView",
  analysis_started: "InitiateCheckout",
  analysis_completed: "Lead",
  cta_contact_clicked: "Contact",
  support_whatsapp_clicked: "Contact",
  whatsapp_clicked: "Contact",
  product_trial_clicked: "SubmitApplication",
  solution_viewed: "ViewContent",
  project_viewed: "ViewContent",
  product_viewed: "ViewContent",
  article_viewed: "ViewContent",
}

/**
 * Eventos que NO se mandan a las plataformas publicitarias.
 *
 * El contenido del Centro de Atención describe el problema de un negocio
 * concreto. Aunque solo viaje la categoría, construir audiencias con "quien
 * reportó una falla" es perfilar a clientes por sus problemas. Se mide
 * internamente y ahí se queda.
 */
const NOT_FOR_ADS = new Set<AnalyticsEvent>([
  "support_message_sent",
  "support_answered",
  "support_unknown",
  "support_quick_action",
  "support_article_clicked",
  "consent_updated",
])

/** Vercel Analytics: sin cookies, sin identificadores, no necesita permiso publicitario. */
export const vercel = {
  send(name: AnalyticsEvent, meta: Record<string, unknown>) {
    window.va?.("event", name, meta)
  },
}

export const ga4 = {
  get ready() {
    return Boolean(GA_ID && typeof window.gtag === "function")
  },
  pageView(path: string, meta: Record<string, unknown>) {
    if (!this.ready) return
    // `send_page_view: false` en la configuración inicial: el SDK no ve las
    // navegaciones del App Router, así que las mandamos nosotros. Si se
    // dejara activo, la primera carga contaría dos veces.
    window.gtag?.("event", "page_view", { page_path: path, ...meta })
  },
  send(name: AnalyticsEvent, meta: Record<string, unknown>) {
    if (!this.ready || name === "page_view") return
    window.gtag?.("event", name, meta)
  },
}

export const meta = {
  get ready() {
    return Boolean(META_PIXEL_ID && typeof window.fbq === "function")
  },
  send(name: AnalyticsEvent, payload: Record<string, unknown>) {
    if (!this.ready || NOT_FOR_ADS.has(name)) return

    // El Pixel ya emite su propio PageView al inicializarse; volver a
    // mandarlo desde aquí duplicaría cada visita.
    if (name === "page_view") return

    const standard = META_STANDARD[name]
    if (standard) window.fbq?.("track", standard, payload)
    else window.fbq?.("trackCustom", name, payload)
  },
}

/**
 * Meta necesita saber cuándo empieza una vista de página nueva en una
 * aplicación que no recarga. Se llama solo en navegación, no en la carga
 * inicial —esa ya la cuenta el script al inicializarse.
 */
export function metaPageView() {
  if (!meta.ready) return
  window.fbq?.("track", "PageView")
}
