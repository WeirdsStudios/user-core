/**
 * Modelo de funnel de USERS.
 *
 * No es una etiqueta decorativa sobre los eventos: es lo que después permite
 * construir audiencias sin tener que reinterpretar rutas en el panel de cada
 * plataforma. Una audiencia se define por etapa, no por una lista de URLs que
 * hay que actualizar cada vez que se publica una página.
 *
 * La etapa se deriva de dos cosas: dónde está la persona y qué acaba de hacer.
 * La acción manda sobre la página — quien inicia el Motor está en intención
 * aunque haya llegado desde el blog.
 */

export type FunnelStage =
  /** Vio USERS, todavía no evalúa comprar. */
  | "awareness"
  /** Interactuó lo suficiente para saber que le interesa el tema. */
  | "engaged"
  /** Está comparando de forma activa. */
  | "consideration"
  /** Señales claras de querer avanzar. */
  | "high_intent"
  /** Dejó datos como lead comercial real. */
  | "converted"

/**
 * Tipo de página. Sirve para segmentar sin depender de rutas literales: una
 * solución nueva entra en las audiencias existentes sin tocar nada.
 */
export type PageType =
  | "home"
  | "solution_hub"
  | "solution"
  | "projects_index"
  | "project"
  | "products"
  | "blog_index"
  | "article"
  | "help"
  | "support_center"
  | "analysis"
  | "legal"
  | "landing"
  | "error"
  | "other"

export function pageTypeOf(path: string): PageType {
  if (path === "/") return "home"
  if (path === "/soluciones") return "solution_hub"
  if (path.startsWith("/soluciones/")) return "solution"
  if (path === "/proyectos") return "projects_index"
  if (path.startsWith("/proyectos/")) return "project"
  if (path.startsWith("/productos")) return "products"
  if (path === "/blog") return "blog_index"
  if (path.startsWith("/blog/")) return "article"
  if (path.startsWith("/ayuda")) return "help"
  if (path.startsWith("/centro-de-atencion")) return "support_center"
  if (path.startsWith("/analisis")) return "analysis"
  if (path.startsWith("/aviso-de-privacidad") || path.startsWith("/cookies")) return "legal"
  if (path.startsWith("/lp/")) return "landing"
  return "other"
}

/**
 * Etapa mínima que implica estar en cierta página.
 *
 * Es un piso, no un techo: quien ya mostró alta intención no retrocede a
 * "awareness" por volver a la home.
 */
const STAGE_BY_PAGE: Record<PageType, FunnelStage> = {
  home: "awareness",
  blog_index: "awareness",
  article: "engaged",
  landing: "awareness",
  error: "awareness",
  other: "awareness",
  legal: "awareness",

  solution_hub: "engaged",
  projects_index: "engaged",
  help: "engaged",
  support_center: "engaged",

  solution: "consideration",
  project: "consideration",
  products: "consideration",

  analysis: "high_intent",
}

/** Acciones que suben de etapa por sí solas, sin importar la página. */
const STAGE_BY_EVENT: Record<string, FunnelStage> = {
  project_media_started: "engaged",
  support_opened: "engaged",
  support_article_clicked: "engaged",

  solution_viewed: "consideration",
  project_viewed: "consideration",
  product_viewed: "consideration",

  analysis_started: "high_intent",
  analysis_progressed: "high_intent",
  cta_contact_clicked: "high_intent",
  whatsapp_clicked: "high_intent",
  support_whatsapp_clicked: "high_intent",
  support_escalated: "high_intent",
  product_trial_clicked: "high_intent",

  analysis_completed: "converted",
}

const ORDER: FunnelStage[] = [
  "awareness",
  "engaged",
  "consideration",
  "high_intent",
  "converted",
]

export const stageRank = (s: FunnelStage) => ORDER.indexOf(s)

/** La más alta de las dos. El funnel avanza; no retrocede dentro de la sesión. */
export function highestStage(a: FunnelStage, b: FunnelStage): FunnelStage {
  return stageRank(a) >= stageRank(b) ? a : b
}

export function stageForPage(path: string): FunnelStage {
  return STAGE_BY_PAGE[pageTypeOf(path)] ?? "awareness"
}

export function stageForEvent(event: string): FunnelStage | null {
  return STAGE_BY_EVENT[event] ?? null
}

const STAGE_KEY = "users-funnel-stage"

/**
 * Etapa alcanzada, guardada entre páginas.
 *
 * `localStorage` y no `sessionStorage`: una decisión de compra de software no
 * ocurre en una sola visita. Es un valor de cinco opciones, sin nada que
 * identifique a nadie.
 */
export function readStage(): FunnelStage {
  if (typeof window === "undefined") return "awareness"
  try {
    const raw = localStorage.getItem(STAGE_KEY)
    return raw && ORDER.includes(raw as FunnelStage) ? (raw as FunnelStage) : "awareness"
  } catch {
    return "awareness"
  }
}

/** Registra la etapa si es superior a la que ya había. Devuelve la vigente. */
export function advanceStage(candidate: FunnelStage): FunnelStage {
  const next = highestStage(readStage(), candidate)
  try {
    localStorage.setItem(STAGE_KEY, next)
  } catch {
    // Sin almacenamiento: la etapa se calcula por evento y no persiste.
  }
  return next
}
