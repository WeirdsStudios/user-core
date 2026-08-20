import { NextRequest, NextResponse } from "next/server"
import { rateLimited, tooManyRequests, readJsonBody, sanitizeText } from "@/lib/api-guard"
import { createAdminClient } from "@/lib/supabase-admin"

/**
 * Registro del lead del Motor de Análisis.
 *
 * QUÉ CAMBIÓ
 * Este endpoint calculaba un presupuesto —horas × tarifa, con multiplicadores
 * por urgencia e identidad visual y ±15% de ruido— y lo devolvía como si
 * fuera una cotización. Ninguno de esos números salía de un tabulador real.
 * El diagnóstico ahora se calcula en el navegador y es explicable; aquí solo
 * se guarda el lead y se avisa al equipo.
 *
 * QUÉ SE GUARDA: las respuestas del negocio y el resumen del diagnóstico,
 * porque sirven para retomar la conversación. Nada más.
 */

/** Campos de negocio que aceptamos. Cualquier otra clave se descarta. */
const CAMPOS_NEGOCIO = [
  "businessName", "industry", "size", "revenue", "hasWebsite", "acquisition",
  "closeProcess", "manualWork", "tools", "customerAsks", "priority", "timeline",
] as const

/** Recorta y acota. Nunca se confía en lo que llega del cliente. */
function limpiarRespuestas(raw: unknown): Record<string, string | string[]> {
  if (!raw || typeof raw !== "object") return {}
  const entrada = raw as Record<string, unknown>
  const salida: Record<string, string | string[]> = {}

  for (const campo of CAMPOS_NEGOCIO) {
    const v = entrada[campo]
    if (Array.isArray(v)) {
      const lista = v.filter((x): x is string => typeof x === "string")
        .slice(0, 10).map((x) => x.slice(0, 40))
      if (lista.length) salida[campo] = lista
    } else if (typeof v === "string") {
      const t = v.trim().slice(0, 120)
      if (t) salida[campo] = t
    }
  }
  return salida
}

async function notificar(d: {
  negocio: string; giro: string; prioridad: string; categoria: string
  titular: string; ref: string; nombre: string; email: string; whatsapp: string
}): Promise<string | null> {
  const key = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM
  const to = process.env.NOTIFICATION_EMAIL
  if (!key || !from || !to) return "Resend no configurado"

  const html = `
    <h2>Diagnóstico completado — ${d.ref}</h2>
    <p><strong>${d.negocio}</strong> · ${d.giro}</p>
    <p>${d.titular}</p>
    <ul>
      <li>Prioridad: ${d.prioridad}</li>
      <li>Recomendación: ${d.categoria}</li>
    </ul>
    <h3>Contacto</h3>
    <ul><li>${d.nombre}</li><li>${d.email}</li><li>${d.whatsapp}</li></ul>
  `
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from, to, subject: `Diagnóstico ${d.ref} — ${d.negocio}`, html, reply_to: d.email,
      }),
    })
    return res.ok ? null : `HTTP ${res.status}`
  } catch (err) {
    return String(err)
  }
}

export async function POST(req: NextRequest) {
  if (rateLimited(req)) return tooManyRequests()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- se valida campo por campo abajo
  const body = await readJsonBody<Record<string, any>>(req)
  if (!body) return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 })

  const respuestas = limpiarRespuestas(body.answers)
  const contacto = body.contact ?? {}
  const nombre = sanitizeText(contacto.name, 80)
  const email = sanitizeText(contacto.email, 120)
  const whatsapp = sanitizeText(contacto.whatsapp, 30)

  if (!nombre || !email || !whatsapp) {
    return NextResponse.json({ error: "Faltan datos de contacto" }, { status: 400 })
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Correo inválido" }, { status: 400 })
  }

  const dx = body.diagnosis ?? {}
  const ref = sanitizeText(dx.ref, 20) ?? "SIN-REF"
  const prioridad = sanitizeText(dx.prioridad, 40) ?? "—"
  const categoria = sanitizeText(dx.categoria, 40) ?? "—"
  const producto = sanitizeText(dx.producto, 20)
  const titular = sanitizeText(dx.titular, 300) ?? ""

  let dbError = false
  try {
    const supabase = createAdminClient()
    const { error } = await supabase.from("analisis_negocio").insert({
      status: "completado",
      nombre_negocio: respuestas.businessName ?? null,
      giro: respuestas.industry ?? null,
      respuestas,
      diagnostico: { ref, prioridad, categoria, producto, titular },
      referencia: ref,
      nombre_contacto: nombre,
      email,
      whatsapp,
    })
    if (error) {
      // El detalle se queda en el log: los mensajes de Supabase describen
      // columnas y restricciones de la base.
      console.error("[calcular] Supabase:", error)
      dbError = true
    }
  } catch (err) {
    console.error("[calcular] Supabase excepción:", err)
    dbError = true
  }

  const emailError = await notificar({
    negocio: String(respuestas.businessName ?? "—"),
    giro: String(respuestas.industry ?? "—"),
    prioridad,
    categoria: producto ? `${categoria} (${producto})` : categoria,
    titular, ref, nombre, email, whatsapp,
  })
  if (emailError) console.error("[calcular] Email:", emailError)

  // Solo se reporta fallo si se perdieron los dos caminos: si la base falló
  // pero el correo llegó, el lead existe y la persona no debe ver un error.
  if (dbError && emailError) {
    return NextResponse.json({ error: "No se pudo registrar" }, { status: 500 })
  }
  return NextResponse.json({ ok: true, ref })
}
