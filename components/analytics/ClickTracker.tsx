"use client"

import { useEffect } from "react"
import { trackEvent } from "@/lib/analytics/track"
import type { AnalyticsEvent, EventMeta } from "@/lib/analytics/events"

/**
 * Un solo escucha de clics para todo el sitio.
 *
 * La alternativa era poner `onClick={() => trackEvent(...)}` en los 16 enlaces
 * al Motor de Análisis, los 14 de WhatsApp y cada CTA nuevo que se agregue.
 * Eso se rompe el día que alguien añade un botón y olvida el handler, y no hay
 * forma de darse cuenta. Aquí el evento se deduce del destino del enlace, así
 * que un CTA nuevo queda medido por existir.
 *
 * Lo que no se puede deducir del href se marca con `data-cta` en el elemento.
 */

/** Destinos conocidos → evento. El orden importa: gana la primera coincidencia. */
function eventFor(href: string, pathname: string): { event: AnalyticsEvent; meta: EventMeta } | null {
  if (href.includes("wa.me") || href.includes("api.whatsapp.com")) {
    return { event: "whatsapp_clicked", meta: {} }
  }
  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    return { event: "cta_contact_clicked", meta: { cta: href.split(":")[0] } }
  }
  if (href === "/analisis" || href.startsWith("/analisis?")) {
    // Desde el propio Motor no es una entrada nueva, es navegación interna.
    if (pathname.startsWith("/analisis")) return null
    return { event: "cta_analysis_clicked", meta: {} }
  }
  if (href.startsWith("/soluciones/")) {
    return { event: "solution_cta_clicked", meta: { solution: href.split("/")[2] } }
  }
  if (href.startsWith("/proyectos/")) {
    return { event: "project_cta_clicked", meta: { project: href.split("/")[2] } }
  }
  return null
}

/** De qué zona de la página salió el clic. Ayuda a comparar CTAs iguales. */
function surfaceOf(el: Element): EventMeta["surface"] {
  if (el.closest("header")) return "header"
  if (el.closest("footer")) return "footer"
  if (el.closest("[data-support-panel]")) return "widget"
  if (el.closest(".fixed")) return "float"
  return "page"
}

export default function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null
      const link = target?.closest?.("a[href], button[data-cta]")
      if (!link) return

      const pathname = window.location.pathname
      const explicit = link.getAttribute("data-cta")
      const href = link.getAttribute("href") ?? ""

      // Un `data-cta` explícito manda sobre la deducción por href.
      if (explicit === "product_trial") {
        trackEvent("product_trial_clicked", {
          product: link.getAttribute("data-slug") ?? undefined,
          page_path: pathname,
        })
        return
      }

      const match = eventFor(href, pathname)
      if (!match) return

      trackEvent(match.event, {
        ...match.meta,
        page_path: pathname,
        surface: surfaceOf(link),
      })
    }

    // En captura: si algo detiene la propagación, el evento igual se registra.
    document.addEventListener("click", onClick, { capture: true })
    return () => document.removeEventListener("click", onClick, { capture: true })
  }, [])

  return null
}
