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
type ViewEvent = Extract<
  AnalyticsEvent,
  "solution_viewed" | "project_viewed" | "product_viewed" | "article_viewed"
>

/** Cada tipo de contenido viaja en su propia clave, no en un "slug" genérico:
 *  así una audiencia se define por "vio esta solución" sin ambigüedad. */
const KEY_BY_EVENT: Record<ViewEvent, "solution" | "project" | "product" | "article"> = {
  solution_viewed: "solution",
  project_viewed: "project",
  product_viewed: "product",
  article_viewed: "article",
}

export default function ViewTracker({ event, slug }: { event: ViewEvent; slug: string }) {
  useEffect(() => {
    trackEvent(event, { [KEY_BY_EVENT[event]]: slug, page_path: window.location.pathname })
  }, [event, slug])

  return null
}
