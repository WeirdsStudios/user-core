import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase-admin"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nombre_negocio, giro, anos_operando, empleados, ubicaciones } = body

    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("analisis_negocio")
      .insert({
        status: "en_progreso",
        nombre_negocio,
        giro,
        anos_operando,
        empleados,
        ubicaciones: ubicaciones || null,
      })
      .select("id")
      .single()

    if (error) {
      console.error("[guardar-progreso] Supabase error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ id: data.id })
  } catch (err) {
    console.error("[guardar-progreso] Unexpected error:", err)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
