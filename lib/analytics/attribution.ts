"use client"

/**
 * Origen del tráfico.
 *
 * Los parámetros UTM solo existen en la primera URL que abre la persona. Si
 * navega a otra página, se pierden — y con ellos la respuesta a "¿de dónde
 * llegó quien nos contactó?". Aquí se guardan al llegar y viajan con cada
 * evento durante la sesión.
 *
 * SESIÓN, NO PERMANENTE: `sessionStorage`. Si alguien vuelve mañana por
 * Google, ese origen es el nuevo, no el de la campaña de hace una semana.
 *
 * NO SE MODIFICA LA URL. Los parámetros se leen; nunca se escriben, se
 * reescribe la barra de direcciones ni se agregan a los enlaces internos.
 */

const KEY = "users-attribution"

const UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const

export interface Attribution {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  /** Dominio del referrer, sin ruta: "instagram.com", no la URL completa. */
  referrer_host?: string
}

/** Un UTM legítimo es corto y sin datos personales. */
function clean(value: string | null): string | undefined {
  if (!value) return undefined
  const v = value.trim().slice(0, 48)
  if (!v || /@|https?:\/\//i.test(v)) return undefined
  return v
}

/**
 * Se llama una vez al cargar. Si la URL trae UTM, se guardan; si no, se
 * conserva lo que ya había en la sesión.
 */
export function captureAttribution() {
  if (typeof window === "undefined") return

  try {
    const params = new URLSearchParams(window.location.search)
    const found: Attribution = {}

    for (const key of UTM_PARAMS) {
      const value = clean(params.get(key))
      if (value) found[key] = value
    }

    // Referrer externo, solo el host. La ruta puede contener información
    // privada del sitio de origen y no aporta nada aquí.
    if (document.referrer) {
      try {
        const host = new URL(document.referrer).hostname
        if (host && host !== window.location.hostname) {
          found.referrer_host = host.replace(/^www\./, "")
        }
      } catch {
        /* referrer malformado */
      }
    }

    if (Object.keys(found).length === 0) return

    const existing = getAttribution()
    // El primer origen de la sesión manda: si alguien llegó por la tarjeta y
    // luego navega, sigue siendo una visita de la tarjeta.
    if (Object.keys(existing).length > 0 && !found.utm_source) return

    sessionStorage.setItem(KEY, JSON.stringify(found))
  } catch {
    // Modo privado o almacenamiento lleno: se mide sin atribución.
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {}
  try {
    const raw = sessionStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Attribution) : {}
  } catch {
    return {}
  }
}
