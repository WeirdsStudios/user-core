import { NextRequest, NextResponse } from "next/server"
import { rateLimited, tooManyRequests, readJsonBody } from "@/lib/api-guard"
import { createAdminClient } from "@/lib/supabase-admin"
import { siteConfig } from "@/lib/site-config"

// ─── Tabulador privado (nunca sale al navegador) ──────────────────────────────

const SITE_BASE = { hoursMin: 15, hoursMax: 20, rate: 500 }

const FEATURES_DATA: Record<string, { label: string; hoursMin: number; hoursMax: number; rate: number }> = {
  catalogo:      { label: "Catálogo o menú digital",          hoursMin: 8,  hoursMax: 12, rate: 500 },
  cotizador:     { label: "Cotizador con reglas",             hoursMin: 15, hoursMax: 20, rate: 500 },
  notificaciones:{ label: "Notificaciones automáticas",       hoursMin: 5,  hoursMax: 8,  rate: 500 },
  redes:         { label: "Integración con redes sociales",   hoursMin: 3,  hoursMax: 5,  rate: 500 },
  reservas:      { label: "Sistema de reservas/citas",        hoursMin: 20, hoursMax: 30, rate: 600 },
  carrito:       { label: "Carrito de compra + pagos en línea",hoursMin: 15, hoursMax: 25, rate: 600 },
  admin:         { label: "Panel de administración",          hoursMin: 15, hoursMax: 25, rate: 600 },
  portal:        { label: "Portal de cliente con login",      hoursMin: 25, hoursMax: 35, rate: 600 },
}

const URGENCY_MULT: Record<string, { min: number; max: number }> = {
  urgente:  { min: 1.2, max: 1.3 },
  normal:   { min: 1.0, max: 1.0 },
  flexible: { min: 0.9, max: 0.95 },
}

const IDENTITY_MULT: Record<string, { min: number; max: number }> = {
  "yes-full": { min: 0.85, max: 0.90 },
  basic:      { min: 1.0,  max: 1.0  },
  none:       { min: 1.15, max: 1.20 },
}

const DELIVERY_BASE: Record<string, number> = {
  urgente:  3,
  normal:   6,
  flexible: 10,
}

const FEATURE_LABELS: Record<string, string> = Object.fromEntries(
  Object.entries(FEATURES_DATA).map(([k, v]) => [k, v.label])
)

const RECOMMENDATION_LABELS: Record<string, string> = {
  actiiva:          "ACTIIVA — Plataforma para negocios fitness",
  mediica:          "MEDIICA — Plataforma para consultorios y clínicas",
  "custom-advanced":"Desarrollo a la medida (proyecto avanzado)",
  "custom-standard":"Desarrollo a la medida",
}

function getRecommendation(industry: string, features: string[]): string {
  if (industry === "gimnasio-fitness") return "actiiva"
  if (industry === "salud-belleza") return "mediica"
  const complex = features.filter((f) => ["reservas", "carrito", "admin", "portal"].includes(f))
  return complex.length >= 2 ? "custom-advanced" : "custom-standard"
}

// ─── Email via Resend ─────────────────────────────────────────────────────────

async function sendNotificationEmail(payload: {
  nombreNegocio: string
  giro: string
  nombreContacto: string
  email: string
  whatsapp: string
  recomendacion: string
  presupuestoMin: number
  presupuestoMax: number
  funcionalidades: string[]
  fechaSesion: string | null
}) {
  const featureList = payload.funcionalidades
    .map((f) => `<li>${FEATURE_LABELS[f] ?? f}</li>`)
    .join("")

  const presupuesto = `$${payload.presupuestoMin.toLocaleString("es-MX")} – $${payload.presupuestoMax.toLocaleString("es-MX")} MXN`

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0A0A0A">
      <div style="background:#0A0A0A;padding:24px 32px;margin-bottom:32px">
        <p style="color:#4cfc0f;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0">
          users.mx — Motor de Análisis
        </p>
        <h1 style="color:white;font-size:22px;margin:8px 0 0">
          Nuevo análisis completado
        </h1>
      </div>

      <div style="padding:0 32px 32px">
        <h2 style="font-size:18px;border-bottom:1px solid #E5E5E5;padding-bottom:12px">
          ${payload.nombreNegocio}
        </h2>

        <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px">
          <tr><td style="color:#888;padding:6px 0;width:180px">Giro</td><td><strong>${payload.giro}</strong></td></tr>
          <tr><td style="color:#888;padding:6px 0">Contacto</td><td><strong>${payload.nombreContacto}</strong></td></tr>
          <tr><td style="color:#888;padding:6px 0">Email</td><td>${payload.email}</td></tr>
          <tr><td style="color:#888;padding:6px 0">WhatsApp</td><td>${payload.whatsapp}</td></tr>
          <tr><td style="color:#888;padding:6px 0">Sesión agendada</td><td><strong>${payload.fechaSesion ?? "Pendiente"}</strong></td></tr>
        </table>

        <div style="background:#F9F9F9;border:1px solid #E5E5E5;padding:20px;margin-bottom:24px">
          <p style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#888;margin:0 0 8px">
            Recomendación
          </p>
          <p style="font-size:16px;font-weight:700;margin:0 0 8px">
            ${RECOMMENDATION_LABELS[payload.recomendacion] ?? payload.recomendacion}
          </p>
          <p style="font-size:20px;font-weight:700;color:#0A0A0A;margin:0">
            ${presupuesto}
          </p>
          <p style="font-size:12px;color:#888;margin:4px 0 0">Inversión estimada · rango ±15%</p>
        </div>

        <div style="margin-bottom:24px">
          <p style="font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#888;margin:0 0 8px">
            Funcionalidades seleccionadas
          </p>
          <ul style="margin:0;padding-left:20px;font-size:14px;color:#444">
            <li>Sitio base (estructura + hasta 5 secciones)</li>
            ${featureList}
          </ul>
        </div>

        <a href="${process.env.SUPABASE_URL ?? "#"}" style="background:#4cfc0f;color:#0A0A0A;font-weight:700;padding:12px 24px;text-decoration:none;display:inline-block;font-size:14px">
          Ver en Supabase →
        </a>
      </div>
    </div>
  `

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM ?? "Motor de Análisis <noreply@users.mx>",
      to: [process.env.NOTIFICATION_EMAIL ?? siteConfig.contact.email],
      subject: `Nuevo análisis: ${payload.nombreNegocio} — ${presupuesto}`,
      html,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Resend error ${res.status}: ${body}`)
  }
  return res.json()
}

// ─── Handler principal ────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Endpoint público que escribe en la base y dispara un correo: sin freno,
  // un bucle simple llena la tabla de leads y agota la cuota de Resend.
  if (rateLimited(req)) return tooManyRequests()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- el cuerpo se desestructura abajo campo por campo
  const body = await readJsonBody<Record<string, any>>(req)
  if (!body) {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 })
  }

  try {
    const {
      // Campos del formulario
      businessName, industry, yearsOperating, employees, locations,
      revenueRange, clientsPerMonth, avgTicket, serviceArea,
      hasWebsite, clientAcquisition, visualIdentity,
      urgentProblem, features = [],
      timeline = "normal", budgetRange,
      contactName, email, whatsapp,
      // Metadatos
      analisisId,
      calBooking,
    } = body

    // ── Cálculo del presupuesto ──────────────────────────────────────────────
    const urgency  = URGENCY_MULT[timeline]  ?? URGENCY_MULT.normal
    const identity = IDENTITY_MULT[visualIdentity] ?? IDENTITY_MULT.basic

    const breakdown: Array<{ name: string; costMin: number; costMax: number }> = []
    breakdown.push({
      name: "Sitio base (estructura + hasta 5 secciones)",
      costMin: SITE_BASE.hoursMin * SITE_BASE.rate,
      costMax: SITE_BASE.hoursMax * SITE_BASE.rate,
    })
    for (const featureId of features) {
      const f = FEATURES_DATA[featureId]
      if (!f) continue
      breakdown.push({ name: f.label, costMin: f.hoursMin * f.rate, costMax: f.hoursMax * f.rate })
    }

    const rawMin = breakdown.reduce((s, b) => s + b.costMin, 0)
    const rawMax = breakdown.reduce((s, b) => s + b.costMax, 0)
    const adjMin = Math.round((rawMin * urgency.min * identity.min) / 100) * 100
    const adjMax = Math.round((rawMax * urgency.max * identity.max) / 100) * 100
    const displayMin = Math.round((adjMin * 0.85) / 100) * 100
    const displayMax = Math.round((adjMax * 1.15) / 100) * 100
    const deliveryWeeks = (DELIVERY_BASE[timeline] ?? 6) + Math.floor(features.length / 2)
    const recommendation = getRecommendation(industry, features)

    const calculationResult = { budgetMin: displayMin, budgetMax: displayMax, breakdown, recommendation, deliveryWeeks }

    // ── Guardado en Supabase (no bloquea el resultado si falla) ─────────────
    let dbError: string | null = null
    let savedAnalisisId: string | null = analisisId ?? null

    try {
      const supabase = createAdminClient()

      const dbFields = {
        status: "completado",
        nombre_negocio: businessName,
        giro: industry,
        anos_operando: yearsOperating,
        empleados: employees,
        ubicaciones: locations || null,
        rango_ingresos: revenueRange,
        clientes_mes: clientsPerMonth,
        ticket_promedio: avgTicket,
        area_servicio: serviceArea,
        tiene_sitio_web: hasWebsite,
        adquisicion_clientes: clientAcquisition,
        identidad_visual: visualIdentity,
        problema_urgente: urgentProblem,
        funcionalidades: features,
        urgencia: timeline,
        rango_presupuesto: budgetRange || null,
        nombre_contacto: contactName,
        email,
        whatsapp,
        presupuesto_min: displayMin,
        presupuesto_max: displayMax,
        breakdown,
        recomendacion: recommendation,
        semanas_entrega: deliveryWeeks,
      }

      if (savedAnalisisId) {
        // Actualizar registro creado en el Paso 1
        const { error } = await supabase
          .from("analisis_negocio")
          .update(dbFields)
          .eq("id", savedAnalisisId)
        if (error) throw error
      } else {
        // Fallback: insertar completo si el guardado progresivo falló
        const { data, error } = await supabase
          .from("analisis_negocio")
          .insert(dbFields)
          .select("id")
          .single()
        if (error) throw error
        savedAnalisisId = data.id
      }

      // Guardar sesión agendada si viene de Cal.com
      if (calBooking && savedAnalisisId) {
        const { error: sessionError } = await supabase
          .from("sesiones_agendadas")
          .insert({
            analisis_id: savedAnalisisId,
            cal_uid: calBooking.uid ?? null,
            fecha_inicio: calBooking.startTime ?? null,
            fecha_fin: calBooking.endTime ?? null,
            nombre: contactName,
            email,
            whatsapp,
          })
        if (sessionError) {
          console.error("[calcular] Error guardando sesion:", sessionError)
        }
      }
    } catch (err) {
      console.error("[calcular] Supabase error (no bloquea resultado):", err)
      dbError = err instanceof Error ? err.message : "Error de base de datos"
    }

    // ── Notificación por correo (no bloquea el resultado si falla) ──────────
    let emailError: string | null = null
    try {
      const fechaSesion = calBooking?.startTime
        ? new Date(calBooking.startTime).toLocaleString("es-MX", {
            timeZone: "America/Mexico_City",
            weekday: "long", day: "numeric", month: "long",
            hour: "2-digit", minute: "2-digit",
          })
        : null

      await sendNotificationEmail({
        nombreNegocio: businessName ?? "Sin nombre",
        giro: industry ?? "",
        nombreContacto: contactName ?? "",
        email: email ?? "",
        whatsapp: whatsapp ?? "",
        recomendacion: recommendation,
        presupuestoMin: displayMin,
        presupuestoMax: displayMax,
        funcionalidades: features,
        fechaSesion,
      })
    } catch (err) {
      console.error("[calcular] Resend error (no bloquea resultado):", err)
      emailError = err instanceof Error ? err.message : "Error de correo"
    }

    return NextResponse.json({
      ...calculationResult,
      analisisId: savedAnalisisId,
      _meta: { dbError, emailError },
    })
  } catch (err) {
    console.error("[calcular] Fatal error:", err)
    return NextResponse.json({ error: "Error en el cálculo" }, { status: 400 })
  }
}
