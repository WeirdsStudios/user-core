import { NextRequest, NextResponse } from "next/server"

/**
 * Protecciones mínimas para los endpoints públicos.
 *
 * Los dos endpoints del Motor de Análisis escriben en la base con la llave de
 * servicio y no piden autenticación —tienen que ser públicos para que un
 * visitante pueda cotizar—. Sin límite de frecuencia ni de tamaño, cualquiera
 * puede llenar la tabla de leads con un `curl` en bucle.
 *
 * LÍMITE EN MEMORIA: el contador vive en el proceso. En Vercel cada instancia
 * tiene el suyo, así que esto frena el abuso casual y los scripts simples, no
 * un ataque distribuido. Para eso haría falta un contador compartido (Redis o
 * el rate limiting de la plataforma); queda anotado como pendiente y no se
 * finge que esto lo cubre.
 */

const WINDOW_MS = 60_000
const MAX_REQUESTS = 8
const MAX_BODY_BYTES = 32 * 1024

const hits = new Map<string, { count: number; resetAt: number }>()

/** Limpieza perezosa: sin esto el mapa crece sin límite. */
function sweep(now: number) {
  if (hits.size < 500) return
  for (const [key, value] of hits) {
    if (value.resetAt < now) hits.delete(key)
  }
}

function clientKey(req: NextRequest): string {
  // Vercel siempre pone x-forwarded-for; el primero es el cliente real.
  const forwarded = req.headers.get("x-forwarded-for")
  return forwarded?.split(",")[0]?.trim() || "desconocido"
}

export function rateLimited(req: NextRequest): boolean {
  const now = Date.now()
  sweep(now)

  const key = clientKey(req)
  const entry = hits.get(key)

  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  entry.count++
  return entry.count > MAX_REQUESTS
}

export function tooManyRequests(): NextResponse {
  return NextResponse.json(
    { error: "Demasiadas solicitudes. Espera un momento e intenta de nuevo." },
    { status: 429, headers: { "Retry-After": "60" } }
  )
}

/**
 * Lee el cuerpo con tope de tamaño. Devuelve `null` si viene vacío, si no es
 * JSON válido o si excede el límite — el llamador responde 400 sin distinguir
 * cuál fue, para no darle información útil a quien esté probando.
 */
export async function readJsonBody<T = unknown>(req: NextRequest): Promise<T | null> {
  const declared = Number(req.headers.get("content-length") ?? 0)
  if (declared > MAX_BODY_BYTES) return null

  try {
    const text = await req.text()
    if (text.length > MAX_BODY_BYTES) return null
    return JSON.parse(text) as T
  } catch {
    return null
  }
}

/** Texto de formulario: recortado y acotado. Nunca se confía en el cliente. */
export function sanitizeText(value: unknown, maxLength = 120): string | null {
  if (typeof value !== "string") return null
  const clean = value.trim().slice(0, maxLength)
  return clean.length > 0 ? clean : null
}
