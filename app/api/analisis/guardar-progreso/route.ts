import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase-admin"
import { rateLimited, tooManyRequests, readJsonBody, sanitizeText } from "@/lib/api-guard"

/**
 * Guarda el primer paso del Motor de Análisis para no perder el contacto si
 * la persona abandona a mitad.
 *
 * Es público por necesidad —quien cotiza todavía no tiene cuenta— así que
 * lleva límite de frecuencia, tope de tamaño y validación en el servidor. Lo
 * que llegue del cliente se recorta y se acota antes de tocar la base.
 */
export async function POST(req: NextRequest) {
  if (rateLimited(req)) return tooManyRequests()

  const body = await readJsonBody<Record<string, unknown>>(req)
  if (!body) {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 })
  }

  const nombre_negocio = sanitizeText(body.nombre_negocio, 120)
  const giro = sanitizeText(body.giro, 60)

  // Sin estos dos el registro no sirve para nada: es un lead vacío.
  if (!nombre_negocio || !giro) {
    return NextResponse.json({ error: "Faltan datos del negocio" }, { status: 400 })
  }

  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("analisis_negocio")
      .insert({
        status: "en_progreso",
        nombre_negocio,
        giro,
        anos_operando: sanitizeText(body.anos_operando, 30),
        empleados: sanitizeText(body.empleados, 30),
        ubicaciones: sanitizeText(body.ubicaciones, 60),
      })
      .select("id")
      .single()

    if (error) {
      // El detalle se queda en el log del servidor: el mensaje de Supabase
      // puede describir columnas y restricciones de la base.
      console.error("[guardar-progreso] Supabase error:", error)
      return NextResponse.json({ error: "No se pudo guardar" }, { status: 500 })
    }

    return NextResponse.json({ id: data.id })
  } catch (err) {
    console.error("[guardar-progreso] Unexpected error:", err)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
