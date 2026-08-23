"use client"

/**
 * Origen del tráfico.
 *
 * Los parámetros de campaña solo existen en la primera URL que abre la
 * persona. Si navega a otra página se pierden, y con ellos la respuesta a
 * "¿de dónde llegó quien nos contactó?". Aquí se capturan al llegar y viajan
 * con cada evento.
 *
 * DOS HORIZONTES
 *   Primer toque  — cómo conoció USERS. Persiste 90 días. Una decisión de
 *                   compra de software no ocurre en una visita, y perder el
 *                   origen inicial hace que todo el crédito se lo lleve la
 *                   última visita directa.
 *   Toque actual  — cómo llegó esta vez. Vive en la sesión.
 *
 * NO SE REESCRIBE LA URL. Los parámetros se leen; nunca se escriben, no se
 * modifica la barra de direcciones ni se agregan a los enlaces internos.
 */

const CURRENT_KEY = "users-touch-current"
const FIRST_KEY = "users-touch-first"

/** 90 días: horizonte razonable para un ciclo de venta B2B pequeño. */
const FIRST_TOUCH_TTL_MS = 90 * 24 * 60 * 60 * 1000

const UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const

/**
 * Identificadores de plataforma.
 *
 * Google Ads (`gclid`), Meta (`fbclid`) y Microsoft (`msclkid`) los añaden
 * ellos a la URL de destino. Se conservan tal cual porque son la única forma
 * de que la plataforma reconcilie un clic con una conversión. No se
 * interpretan, no se modifican y no se envían a ningún otro proveedor.
 */
const CLICK_IDS = ["gclid", "gbraid", "wbraid", "fbclid", "msclkid", "ttclid"] as const

export interface Touch {
  source?: string
  medium?: string
  campaign?: string
  content?: string
  term?: string
  referrer_host?: string
  /** Identificadores de clic, tal como los entregó la plataforma. */
  click_ids?: Record<string, string>
  at: number
}

/** Un valor legítimo de campaña es corto y no lleva datos personales. */
function clean(value: string | null, max = 64): string | undefined {
  if (!value) return undefined
  const v = value.trim().slice(0, max)
  if (!v || /@|https?:\/\//i.test(v)) return undefined
  return v
}

function read(key: string, storage: Storage | undefined): Touch | null {
  if (!storage) return null
  try {
    const raw = storage.getItem(key)
    return raw ? (JSON.parse(raw) as Touch) : null
  } catch {
    return null
  }
}

function write(key: string, storage: Storage | undefined, value: Touch) {
  try {
    storage?.setItem(key, JSON.stringify(value))
  } catch {
    // Modo privado o cuota llena: se mide sin atribución persistida.
  }
}

/** Lee la URL actual y arma el toque, si trae algo que valga la pena. */
function currentFromUrl(): Touch | null {
  const params = new URLSearchParams(window.location.search)
  const touch: Touch = { at: Date.now() }
  let meaningful = false

  const map: Record<string, keyof Touch> = {
    utm_source: "source",
    utm_medium: "medium",
    utm_campaign: "campaign",
    utm_content: "content",
    utm_term: "term",
  }
  for (const p of UTM_PARAMS) {
    const v = clean(params.get(p))
    if (v) {
      ;(touch[map[p]] as string) = v
      meaningful = true
    }
  }

  const ids: Record<string, string> = {}
  for (const id of CLICK_IDS) {
    const v = clean(params.get(id), 128)
    if (v) {
      ids[id] = v
      meaningful = true
    }
  }
  if (Object.keys(ids).length) touch.click_ids = ids

  // Referrer externo: solo el host. La ruta puede llevar información privada
  // del sitio de origen y no aporta nada aquí.
  if (document.referrer) {
    try {
      const host = new URL(document.referrer).hostname
      if (host && host !== window.location.hostname) {
        touch.referrer_host = host.replace(/^www\./, "")
        meaningful = true
      }
    } catch {
      /* referrer malformado */
    }
  }

  return meaningful ? touch : null
}

/**
 * Se llama al cargar y en cada navegación. Si la URL trae campaña, actualiza
 * el toque actual; si no, conserva el que ya había.
 */
export function captureAttribution() {
  if (typeof window === "undefined") return

  const found = currentFromUrl()
  if (!found) return

  const session = typeof sessionStorage !== "undefined" ? sessionStorage : undefined
  const local = typeof localStorage !== "undefined" ? localStorage : undefined

  // Toque actual: solo se reemplaza si la URL trae una campaña de verdad.
  // Un referrer suelto no debe pisar la campaña con la que entró la persona.
  const existing = read(CURRENT_KEY, session)
  if (!existing || found.source) {
    write(CURRENT_KEY, session, found)
  }

  // Primer toque: se escribe una sola vez, y solo caduca por antigüedad.
  const first = read(FIRST_KEY, local)
  if (!first || Date.now() - first.at > FIRST_TOUCH_TTL_MS) {
    write(FIRST_KEY, local, found)
  }
}

export function getCurrentTouch(): Touch | null {
  if (typeof window === "undefined") return null
  return read(CURRENT_KEY, typeof sessionStorage !== "undefined" ? sessionStorage : undefined)
}

export function getFirstTouch(): Touch | null {
  if (typeof window === "undefined") return null
  const first = read(FIRST_KEY, typeof localStorage !== "undefined" ? localStorage : undefined)
  if (!first) return null
  return Date.now() - first.at > FIRST_TOUCH_TTL_MS ? null : first
}

/**
 * Los campos de atribución que acompañan a cada evento.
 *
 * El primer toque solo se incluye cuando difiere del actual: si son el mismo
 * origen, repetirlo duplica el peso de cada evento sin aportar nada.
 */
export function attributionMeta(): Record<string, string> {
  const current = getCurrentTouch()
  const first = getFirstTouch()
  const meta: Record<string, string> = {}

  if (current?.source) meta.source = current.source
  if (current?.medium) meta.medium = current.medium
  if (current?.campaign) meta.campaign = current.campaign
  if (current?.content) meta.content = current.content
  if (current?.term) meta.term = current.term
  if (current?.referrer_host) meta.referrer_host = current.referrer_host

  if (first && first.source && first.source !== current?.source) {
    meta.first_source = first.source
    if (first.medium) meta.first_medium = first.medium
    if (first.campaign) meta.first_campaign = first.campaign
  }

  return meta
}

/**
 * Identificadores de clic para el proveedor que corresponda.
 *
 * No van dentro de los metadatos generales: son de una plataforma concreta y
 * mandarlos a otra no tiene sentido ni sería correcto.
 */
export function getClickIds(): Record<string, string> {
  return { ...(getCurrentTouch()?.click_ids ?? {}) }
}
