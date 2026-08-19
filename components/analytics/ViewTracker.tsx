"use client"

import { useEffect } from "react"
import { trackEvent } from "@/lib/analytics/track"
import type { AnalyticsEvent } from "@/lib/analytics/events"

/**
 * Marca que se vio una pieza de contenido concreta.
 *
 * `page_view` ya dice qué ruta se abrió; esto añade *qué* se vio en términos
 * de negocio —qué solución, qué caso, qué producto— para poder comparar
 * interés entre ellos sin tener que parsear rutas en el dashboard.
 *
 * Se monta en páginas de servidor sin volverlas cliente: solo este componente
 * lo es.
 */
export default function ViewTracker({
  event,
  slug,
}: {
  event: Extract<AnalyticsEvent, "solution_viewed" | "project_viewed" | "product_viewed">
  slug: string
}) {
  useEffect(() => {
    trackEvent(event, { slug, page: window.location.pathname })
  }, [event, slug])

  return null
}
