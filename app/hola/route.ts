import { NextRequest, NextResponse } from "next/server"
import { siteConfig } from "@/lib/site-config"

/**
 * Punto de entrada corto para material impreso.
 *
 * `users.mx/hola` es lo que se dicta por teléfono, se imprime en una tarjeta y
 * cabe en un QR pequeño. La URL completa con parámetros funciona igual, pero
 * es larga, ilegible y genera un código denso que falla al escanear impreso en
 * chico.
 *
 * Redirige a la home añadiendo la atribución. No es una landing aparte: quien
 * llega desde una tarjeta debe ver el sitio, no una página rara.
 *
 * 307 y no 301: el destino puede cambiar de campaña, y un permanente se queda
 * cacheado en el navegador de quien ya lo escaneó una vez.
 *
 * Se pueden pasar parámetros para distinguir lotes sin tocar el código:
 *   /hola                        → utm_campaign=networking
 *   /hola?c=expo_pyme            → utm_campaign=expo_pyme
 *   /hola?c=lote_q3&v=reverso    → añade utm_content=reverso
 */
export function GET(request: NextRequest) {
  const incoming = request.nextUrl.searchParams

  /** Valor corto, sin datos personales ni caracteres raros. */
  const safe = (value: string | null, fallback: string) => {
    if (!value) return fallback
    const clean = value.trim().toLowerCase().slice(0, 40)
    return /^[a-z0-9_-]+$/.test(clean) ? clean : fallback
  }

  const target = new URL("/", siteConfig.url)
  target.searchParams.set("utm_source", "business_card")
  target.searchParams.set("utm_medium", "offline")
  target.searchParams.set("utm_campaign", safe(incoming.get("c"), "networking"))

  const variant = safe(incoming.get("v"), "")
  if (variant) target.searchParams.set("utm_content", variant)

  return NextResponse.redirect(target, {
    status: 307,
    // No cachear: el destino puede cambiar entre campañas y este endpoint
    // existe justamente para poder redirigirlo sin reimprimir tarjetas.
    headers: { "Cache-Control": "no-store" },
  })
}
