"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { getWhatsAppLink } from "@/lib/whatsapp"

// ─── Cal.com ──────────────────────────────────────────────────────────────────
const CAL_LINK      = "usersmx/sesion-de-analisis-de-negocio"
const CAL_NAMESPACE = "usersmx-analisis"

// ─── Feature catalog ─────────────────────────────────────────────────────────
const FEATURES = [
  { id: "catalogo",      label: "Catálogo o menú digital" },
  { id: "reservas",      label: "Sistema de reservas/citas" },
  { id: "cotizador",     label: "Cotizador con reglas" },
  { id: "carrito",       label: "Carrito de compra + pagos en línea" },
  { id: "admin",         label: "Panel de administración" },
  { id: "portal",        label: "Portal de cliente con login" },
  { id: "notificaciones",label: "Notificaciones automáticas" },
  { id: "redes",         label: "Integración con redes sociales" },
]

const DEFAULT_FEATURES: Record<string, string[]> = {
  "restaurante":           ["catalogo", "reservas", "notificaciones", "redes"],
  "retail":                ["catalogo", "carrito", "portal"],
  "servicios-profesionales":["cotizador", "reservas", "notificaciones"],
  "gimnasio-fitness":      ["reservas", "portal", "admin", "notificaciones"],
  "salud-belleza":         ["reservas", "portal", "notificaciones"],
  "otro":                  ["catalogo", "cotizador"],
}

// ─── Types ────────────────────────────────────────────────────────────────────
type FormData = {
  businessName: string; industry: string; yearsOperating: string
  employees: string;    locations: string; revenueRange: string
  clientsPerMonth: string; avgTicket: string; serviceArea: string
  hasWebsite: string;  clientAcquisition: string; visualIdentity: string
  urgentProblem: string; features: string[]; timeline: string
  budgetRange: string; contactName: string; email: string; whatsapp: string
}

type CalBooking = {
  uid?: string
  startTime?: string
  endTime?: string
}

type CalcResult = {
  budgetMin: number; budgetMax: number
  breakdown: Array<{ name: string; costMin: number; costMax: number }>
  recommendation: string; deliveryWeeks: number
}

const INITIAL_DATA: FormData = {
  businessName: "", industry: "", yearsOperating: "", employees: "",
  locations: "", revenueRange: "", clientsPerMonth: "", avgTicket: "",
  serviceArea: "", hasWebsite: "", clientAcquisition: "", visualIdentity: "",
  urgentProblem: "", features: [], timeline: "", budgetRange: "",
  contactName: "", email: "", whatsapp: "",
}

// ─── Shared UI helpers ────────────────────────────────────────────────────────
function RadioGroup({ options, value, onChange, cols = "auto" }: {
  options: { value: string; label: string }[]
  value: string; onChange: (v: string) => void; cols?: "auto" | 2 | 3
}) {
  const gridClass = cols === 2 ? "grid grid-cols-2 gap-2"
    : cols === 3 ? "grid grid-cols-3 gap-2" : "flex flex-wrap gap-2"
  return (
    <div className={gridClass}>
      {options.map((o) => (
        <button key={o.value} type="button" onClick={() => onChange(o.value)}
          className={`px-4 py-3 text-sm font-medium border transition-all text-left ${
            value === o.value
              ? "bg-[#4cfc0f] border-[#4cfc0f] text-black"
              : "border-[#E5E5E5] text-[#444] hover:border-[#0A0A0A]"
          }`}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

function CheckGroup({ options, values, onChange }: {
  options: { id: string; label: string }[]
  values: string[]; onChange: (v: string[]) => void
}) {
  const toggle = (id: string) =>
    onChange(values.includes(id) ? values.filter((v) => v !== id) : [...values, id])
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {options.map((o) => {
        const checked = values.includes(o.id)
        return (
          <button key={o.id} type="button" onClick={() => toggle(o.id)}
            className={`px-4 py-3 text-sm font-medium border transition-all text-left flex items-center gap-3 ${
              checked ? "bg-[#0A0A0A] border-[#0A0A0A] text-white"
                      : "border-[#E5E5E5] text-[#444] hover:border-[#0A0A0A]"
            }`}>
            <span className={`w-4 h-4 border shrink-0 flex items-center justify-center ${
              checked ? "border-[#4cfc0f] bg-[#4cfc0f]" : "border-[#888]"
            }`}>
              {checked && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="black" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-semibold text-[#0A0A0A] mb-3">{children}</p>
}
function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div className="mb-8">{children}</div>
}
function TextInput({ value, onChange, placeholder, type = "text" }: {
  value: string; onChange: (v: string) => void; placeholder: string; type?: string
}) {
  return (
    <input type={type} value={value} placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-[#E5E5E5] px-4 py-3 text-sm focus:outline-none
                 focus:border-[#0A0A0A] text-[#0A0A0A] placeholder:text-[#aaa]"
    />
  )
}

// ─── Steps ────────────────────────────────────────────────────────────────────
function Step1({ data, update }: { data: FormData; update: (k: keyof FormData, v: string | string[]) => void }) {
  return (
    <div>
      <FieldGroup>
        <FieldLabel>Nombre del negocio *</FieldLabel>
        <TextInput value={data.businessName} onChange={(v) => update("businessName", v)}
          placeholder="Ej. Taquería El Güero" />
      </FieldGroup>
      <FieldGroup>
        <FieldLabel>Giro o industria *</FieldLabel>
        <RadioGroup cols={2} value={data.industry}
          onChange={(v) => { update("industry", v); update("features", DEFAULT_FEATURES[v] ?? []) }}
          options={[
            { value: "restaurante",            label: "Restaurante / Alimentos" },
            { value: "retail",                 label: "Retail / Comercio" },
            { value: "servicios-profesionales",label: "Servicios profesionales" },
            { value: "gimnasio-fitness",        label: "Gimnasio / Fitness" },
            { value: "salud-belleza",           label: "Salud y Belleza" },
            { value: "otro",                   label: "Otro" },
          ]} />
      </FieldGroup>
      <FieldGroup>
        <FieldLabel>Años operando *</FieldLabel>
        <RadioGroup value={data.yearsOperating} onChange={(v) => update("yearsOperating", v)}
          options={[
            { value: "menos-1", label: "Menos de 1 año" },
            { value: "1-3",     label: "1–3 años" },
            { value: "4-10",    label: "4–10 años" },
            { value: "mas-10",  label: "Más de 10 años" },
          ]} />
      </FieldGroup>
      <FieldGroup>
        <FieldLabel>Número de empleados *</FieldLabel>
        <RadioGroup value={data.employees} onChange={(v) => update("employees", v)}
          options={[
            { value: "1-5",   label: "1–5" },
            { value: "6-15",  label: "6–15" },
            { value: "16-50", label: "16–50" },
            { value: "50+",   label: "50+" },
          ]} />
      </FieldGroup>
      <FieldGroup>
        <FieldLabel>Sucursales o ubicaciones</FieldLabel>
        <RadioGroup value={data.locations} onChange={(v) => update("locations", v)}
          options={[
            { value: "1",    label: "Solo una" },
            { value: "2-3",  label: "2–3" },
            { value: "4-10", label: "4–10" },
            { value: "10+",  label: "Más de 10" },
          ]} />
      </FieldGroup>
    </div>
  )
}

function Step2({ data, update }: { data: FormData; update: (k: keyof FormData, v: string | string[]) => void }) {
  return (
    <div>
      <FieldGroup>
        <FieldLabel>Ingresos mensuales aproximados *</FieldLabel>
        <RadioGroup cols={2} value={data.revenueRange} onChange={(v) => update("revenueRange", v)}
          options={[
            { value: "menos-20k",  label: "Menos de $20,000 MXN" },
            { value: "20k-50k",    label: "$20,000–$50,000" },
            { value: "50k-150k",   label: "$50,000–$150,000" },
            { value: "150k-500k",  label: "$150,000–$500,000" },
            { value: "mas-500k",   label: "Más de $500,000" },
          ]} />
      </FieldGroup>
      <FieldGroup>
        <FieldLabel>Clientes atendidos al mes (aproximado) *</FieldLabel>
        <RadioGroup value={data.clientsPerMonth} onChange={(v) => update("clientsPerMonth", v)}
          options={[
            { value: "menos-20", label: "Menos de 20" },
            { value: "20-80",    label: "20–80" },
            { value: "80-300",   label: "80–300" },
            { value: "300+",     label: "Más de 300" },
          ]} />
      </FieldGroup>
      <FieldGroup>
        <FieldLabel>Ticket promedio por cliente/venta *</FieldLabel>
        <RadioGroup cols={2} value={data.avgTicket} onChange={(v) => update("avgTicket", v)}
          options={[
            { value: "menos-100", label: "Menos de $100 MXN" },
            { value: "100-500",   label: "$100–$500" },
            { value: "500-2000",  label: "$500–$2,000" },
            { value: "2000-10k",  label: "$2,000–$10,000" },
            { value: "mas-10k",   label: "Más de $10,000" },
          ]} />
      </FieldGroup>
      <FieldGroup>
        <FieldLabel>Área que atiende *</FieldLabel>
        <RadioGroup value={data.serviceArea} onChange={(v) => update("serviceArea", v)}
          options={[
            { value: "local",    label: "Local / colonia" },
            { value: "ciudad",   label: "Ciudad" },
            { value: "regional", label: "Regional" },
            { value: "nacional", label: "Nacional" },
          ]} />
      </FieldGroup>
    </div>
  )
}

function Step3({ data, update }: { data: FormData; update: (k: keyof FormData, v: string | string[]) => void }) {
  return (
    <div>
      <FieldGroup>
        <FieldLabel>¿Tienes sitio web hoy? *</FieldLabel>
        <RadioGroup cols={2} value={data.hasWebsite} onChange={(v) => update("hasWebsite", v)}
          options={[
            { value: "yes-good", label: "Sí, funciona bien" },
            { value: "yes-bad",  label: "Sí, pero no me gusta / no funciona" },
            { value: "no",       label: "No tengo" },
          ]} />
      </FieldGroup>
      <FieldGroup>
        <FieldLabel>¿Cómo consigues clientes principalmente? *</FieldLabel>
        <RadioGroup cols={2} value={data.clientAcquisition}
          onChange={(v) => update("clientAcquisition", v)}
          options={[
            { value: "redes",       label: "Redes sociales" },
            { value: "boca-a-boca", label: "Boca a boca / recomendación" },
            { value: "publicidad",  label: "Publicidad pagada" },
            { value: "ninguno",     label: "Sin estrategia definida" },
          ]} />
      </FieldGroup>
      <FieldGroup>
        <FieldLabel>¿Qué tan desarrollada está tu identidad visual? *</FieldLabel>
        <RadioGroup cols={2} value={data.visualIdentity}
          onChange={(v) => update("visualIdentity", v)}
          options={[
            { value: "yes-full", label: "Ya tengo logo y colores definidos" },
            { value: "basic",    label: "Tengo algo básico" },
            { value: "none",     label: "No tengo nada" },
          ]} />
      </FieldGroup>
    </div>
  )
}

function Step4({ data, update }: { data: FormData; update: (k: keyof FormData, v: string | string[]) => void }) {
  const showNote = data.industry === "gimnasio-fitness" || data.industry === "salud-belleza"
  const productName = data.industry === "gimnasio-fitness" ? "SoFit" : "Consulto"
  const productUrl  = data.industry === "gimnasio-fitness" ? "https://sofit.com.mx" : "https://consulto.com.mx"
  return (
    <div>
      <FieldGroup>
        <FieldLabel>¿Qué te urge resolver más? *</FieldLabel>
        <RadioGroup cols={2} value={data.urgentProblem}
          onChange={(v) => update("urgentProblem", v)}
          options={[
            { value: "google",           label: "No aparezco en Google" },
            { value: "same-questions",   label: "Contesto las mismas preguntas todo el día" },
            { value: "old-site",         label: "Mi sitio se ve viejo o no tengo" },
            { value: "sell-online",      label: "Quiero vender en línea" },
            { value: "look-professional",label: "Quiero verme más profesional" },
          ]} />
      </FieldGroup>
      <FieldGroup>
        <FieldLabel>Funcionalidades que te interesan</FieldLabel>
        <p className="text-xs text-[#888] mb-3">
          Selecciona todas las que apliquen. Marcamos las más comunes para tu giro.
        </p>
        <CheckGroup options={FEATURES} values={data.features}
          onChange={(v) => update("features", v)} />
      </FieldGroup>
      {showNote && (
        <div className="border border-[#4cfc0f] bg-[#f0ffe8] p-4 mt-2">
          <p className="text-sm text-[#0A0A0A]">
            <strong>Dato útil:</strong> Para negocios como el tuyo ya existe una solución lista:{" "}
            <a href={productUrl} target="_blank" rel="noopener noreferrer"
              className="font-bold underline">{productName}</a>
            {" "}— incluye agenda, cobros, portal de cliente y más desde $599 MXN/mes.
            Puedes seguir aquí para ver tu análisis completo de todas formas.
          </p>
        </div>
      )}
    </div>
  )
}

function Step5({ data, update }: { data: FormData; update: (k: keyof FormData, v: string | string[]) => void }) {
  return (
    <div>
      <FieldGroup>
        <FieldLabel>¿Cuándo te gustaría tenerlo funcionando? *</FieldLabel>
        <RadioGroup cols={2} value={data.timeline} onChange={(v) => update("timeline", v)}
          options={[
            { value: "urgente",  label: "Urgente — menos de 1 mes" },
            { value: "normal",   label: "Tiempo normal — 1 a 3 meses" },
            { value: "flexible", label: "Flexible — sin prisa" },
          ]} />
      </FieldGroup>
      <FieldGroup>
        <FieldLabel>¿Tienes un rango de presupuesto en mente? (opcional)</FieldLabel>
        <p className="text-xs text-[#888] mb-3">
          No es obligatorio. Ayuda a calibrar la propuesta.
        </p>
        <RadioGroup cols={2} value={data.budgetRange} onChange={(v) => update("budgetRange", v)}
          options={[
            { value: "menos-15k", label: "Menos de $15,000 MXN" },
            { value: "15k-30k",   label: "$15,000–$30,000" },
            { value: "30k-60k",   label: "$30,000–$60,000" },
            { value: "mas-60k",   label: "Más de $60,000" },
            { value: "no-se",     label: "Aún no sé" },
          ]} />
      </FieldGroup>
    </div>
  )
}

// ─── Step 6 — Cal.com embed + datos de contacto ───────────────────────────────
function Step6({
  data, update, calBooking,
}: {
  data: FormData
  update: (k: keyof FormData, v: string | string[]) => void
  calBooking: CalBooking | null
}) {
  const formattedDate = calBooking?.startTime
    ? new Date(calBooking.startTime).toLocaleString("es-MX", {
        timeZone: "America/Mexico_City",
        weekday: "long", day: "numeric", month: "long",
        hour: "2-digit", minute: "2-digit",
      })
    : null

  return (
    <div>
      {/* Cal.com calendar embed */}
      <FieldGroup>
        <FieldLabel>
          {calBooking ? "✓ Fecha seleccionada" : "Elige la fecha y hora de tu sesión *"}
        </FieldLabel>

        {calBooking ? (
          <div className="border border-[#4cfc0f] bg-[#f0ffe8] p-5">
            <p className="text-sm font-semibold text-[#0A0A0A] mb-1">Sesión agendada</p>
            <p className="text-base font-bold text-[#0A0A0A]">{formattedDate}</p>
            <p className="text-xs text-[#888] mt-2">
              Recibirás la confirmación en el correo que registraste en Cal.com.
            </p>
          </div>
        ) : (
          <div id="cal-booking-slot"
            className="border border-[#E5E5E5] overflow-hidden"
            style={{ minHeight: 600 }}
          />
        )}
      </FieldGroup>

      {/* Datos de contacto */}
      <FieldGroup>
        <FieldLabel>Nombre completo *</FieldLabel>
        <TextInput value={data.contactName} onChange={(v) => update("contactName", v)}
          placeholder="Tu nombre" />
      </FieldGroup>
      <FieldGroup>
        <FieldLabel>Correo electrónico *</FieldLabel>
        <TextInput type="email" value={data.email} onChange={(v) => update("email", v)}
          placeholder="correo@tuempresa.com" />
      </FieldGroup>
      <FieldGroup>
        <FieldLabel>WhatsApp *</FieldLabel>
        <TextInput type="tel" value={data.whatsapp} onChange={(v) => update("whatsapp", v)}
          placeholder="+52 55 1234 5678" />
      </FieldGroup>
      <p className="text-xs text-[#888] mt-2">
        Al confirmar se generará tu reporte y se vinculará a la sesión que agendaste.
        Solo te contactaremos por los medios que indicaste.
      </p>
    </div>
  )
}

// ─── Report ───────────────────────────────────────────────────────────────────
const RECOMMENDATION_COPY: Record<string, { title: string; description: string }> = {
  sofit: {
    title: "SoFit — Plataforma lista para tu gimnasio",
    description: "Para negocios de fitness, SoFit es la solución más eficiente: agenda de clases, cobros, portal de socios y notificaciones automáticas — listo en días, no en meses. Desde $599 MXN/mes.",
  },
  consulto: {
    title: "Consulto — Plataforma lista para tu consultorio",
    description: "Para consultorios y clínicas, Consulto es la solución más eficiente: agenda de citas, historial de seguimiento de pacientes, cobros y recordatorios. Desde $999 MXN/mes.",
  },
  "custom-advanced": {
    title: "Desarrollo a la medida — Proyecto avanzado",
    description: "Por la combinación de funcionalidades que necesitas (reservas, pagos, portal de cliente), tu caso requiere desarrollo personalizado. Construimos exactamente lo que tu negocio necesita.",
  },
  "custom-standard": {
    title: "Desarrollo a la medida",
    description: "Tu proyecto se puede construir eficientemente con un desarrollo a la medida. Diseñamos y construimos cada parte según las prioridades reales de tu negocio.",
  },
}

const INDUSTRY_LABELS: Record<string, string> = {
  restaurante: "Restaurante / Alimentos", retail: "Retail / Comercio",
  "servicios-profesionales": "Servicios profesionales", "gimnasio-fitness": "Gimnasio / Fitness",
  "salud-belleza": "Salud y Belleza", otro: "Negocio",
}
const URGENCY_LABELS: Record<string, string> = {
  urgente: "urgente (menos de 1 mes)", normal: "en tiempo normal (1–3 meses)",
  flexible: "flexible, sin prisa",
}
const ACQUISITION_LABELS: Record<string, string> = {
  redes: "redes sociales", "boca-a-boca": "boca a boca / recomendación",
  publicidad: "publicidad pagada", ninguno: "sin estrategia definida",
}

function formatMXN(n: number) { return `$${n.toLocaleString("es-MX")} MXN` }

function SimpleBarChart({ items }: { items: Array<{ name: string; costMin: number; costMax: number }> }) {
  const maxCost = Math.max(...items.map((i) => i.costMax))
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.name}>
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-xs text-[#444] truncate pr-4 max-w-[60%]">{item.name}</span>
            <span className="text-xs font-mono text-[#888] shrink-0">
              {formatMXN(item.costMin)}–{formatMXN(item.costMax)}
            </span>
          </div>
          <div className="h-2 bg-[#F0F0F0]">
            <div className="h-2 bg-[#4cfc0f] transition-all"
              style={{ width: `${(item.costMax / maxCost) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function DeliveryTimeline({ weeks }: { weeks: number }) {
  const phases = [
    { label: "Diseño & estructura", portion: 0.25 },
    { label: "Desarrollo",          portion: 0.55 },
    { label: "Pruebas & lanzamiento",portion: 0.20 },
  ]
  const phaseWeeks = phases.map((p) => Math.max(1, Math.round(weeks * p.portion)))
  const totalWeeks = phaseWeeks.reduce((a, b) => a + b, 0)
  return (
    <div className="space-y-2">
      {phases.map((phase, i) => (
        <div key={phase.label} className="flex items-center gap-3">
          <div className="w-36 text-xs text-[#888] shrink-0">{phase.label}</div>
          <div className="flex-1 h-2 bg-[#F0F0F0]">
            <div className="h-2 bg-[#0A0A0A]" style={{ width: `${phase.portion * 100}%` }} />
          </div>
          <div className="w-14 text-xs text-[#888] text-right shrink-0">~{phaseWeeks[i]} sem.</div>
        </div>
      ))}
      <div className="flex items-center gap-3 pt-2 border-t border-[#E5E5E5]">
        <div className="w-36 text-xs font-semibold">Total estimado</div>
        <div className="flex-1" />
        <div className="w-14 text-xs font-semibold text-right">{totalWeeks} semanas</div>
      </div>
    </div>
  )
}

function Report({ data, result, calBooking }: { data: FormData; result: CalcResult; calBooking: CalBooking | null }) {
  const rec = RECOMMENDATION_COPY[result.recommendation] ?? RECOMMENDATION_COPY["custom-standard"]
  const clientsNum = ({ "menos-20": 10, "20-80": 50, "80-300": 180, "300+": 400 })[data.clientsPerMonth] ?? 50
  const ticketNum  = ({ "menos-100": 80, "100-500": 300, "500-2000": 1200, "2000-10k": 5000, "mas-10k": 12000 })[data.avgTicket] ?? 300
  const conversionGain = Math.round(clientsNum * 0.10 * ticketNum)
  const sessionDate = calBooking?.startTime
    ? new Date(calBooking.startTime).toLocaleString("es-MX", {
        timeZone: "America/Mexico_City", weekday: "long",
        day: "numeric", month: "long", hour: "2-digit", minute: "2-digit",
      })
    : null

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="text-xs tracking-widest uppercase text-[#888] mb-2">Reporte de análisis</p>
        <h1 className="text-3xl font-bold text-[#0A0A0A]">{data.businessName}</h1>
        <p className="text-sm text-[#888] mt-1">
          Generado el {new Date().toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      <section className="mb-10 pb-10 border-b border-[#E5E5E5]">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#888] mb-4">01 — Resumen ejecutivo</p>
        <p className="text-[#444] leading-relaxed">
          <strong className="text-[#0A0A0A]">{data.businessName}</strong> es un negocio del giro{" "}
          <strong className="text-[#0A0A0A]">{INDUSTRY_LABELS[data.industry] ?? data.industry}</strong> con{" "}
          {data.yearsOperating === "menos-1" ? "menos de un año" : `${data.yearsOperating} años`} de
          operación y {data.employees} empleados. Consigue la mayoría de sus clientes a través de{" "}
          <strong className="text-[#0A0A0A]">{ACQUISITION_LABELS[data.clientAcquisition] ?? data.clientAcquisition}</strong>.
          Atiende aproximadamente{" "}
          <strong className="text-[#0A0A0A]">{data.clientsPerMonth.replace("-", " a ")} clientes al mes</strong>{" "}
          con un ticket promedio de{" "}
          <strong className="text-[#0A0A0A]">{data.avgTicket.replace("-", "–")} MXN</strong>.
        </p>
      </section>

      <section className="mb-10 pb-10 border-b border-[#E5E5E5]">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#888] mb-4">02 — Diagnóstico</p>
        <div className="space-y-4">
          {[
            {
              label: "Presencia digital actual",
              text: data.hasWebsite === "yes-good" ? "Tu sitio web funciona — podemos construir sobre lo que ya tienes."
                : data.hasWebsite === "yes-bad" ? "Tu sitio existe pero no está trabajando para ti. Oportunidad directa."
                : "No tienes presencia digital — cada día es un cliente potencial que no puede encontrarte.",
            },
            {
              label: "Identidad visual",
              text: data.visualIdentity === "yes-full" ? "Tienes logo y colores definidos — acelera el proceso y reduce costos."
                : data.visualIdentity === "basic" ? "Tienes algo básico que puliremos durante el proyecto."
                : "Sin identidad visual — incluiremos diseño de marca desde cero en la propuesta.",
            },
          ].map((item) => (
            <div key={item.label} className="flex gap-4">
              <span className="text-[#4cfc0f] font-bold text-lg leading-none pt-0.5 shrink-0">+</span>
              <div>
                <p className="text-sm font-semibold text-[#0A0A0A] mb-1">{item.label}</p>
                <p className="text-sm text-[#444] leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10 pb-10 border-b border-[#E5E5E5]">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#888] mb-4">03 — Recomendación</p>
        <div className="bg-[#0A0A0A] p-6">
          <p className="text-[#4cfc0f] text-xs font-semibold tracking-widest uppercase mb-2">Solución recomendada</p>
          <p className="text-white text-lg font-bold mb-3">{rec.title}</p>
          <p className="text-[#888] text-sm leading-relaxed">{rec.description}</p>
        </div>
      </section>

      <section className="mb-10 pb-10 border-b border-[#E5E5E5]">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#888] mb-4">04 — Inversión estimada</p>
        <div className="mb-6">
          <p className="text-4xl font-bold text-[#0A0A0A]">
            {formatMXN(result.budgetMin)} – {formatMXN(result.budgetMax)}
          </p>
          <p className="text-xs text-[#888] mt-2">
            Rango estimado · El alcance exacto se confirma en tu sesión · No es precio cerrado
          </p>
        </div>
        <SimpleBarChart items={result.breakdown} />
        <p className="text-xs text-[#888] mt-4">
          <strong className="text-[#0A0A0A]">Cálculo real con tus datos:</strong>{" "}
          basado en las funcionalidades que seleccionaste y tus ajustes de urgencia e identidad visual.
        </p>
      </section>

      <section className="mb-10 pb-10 border-b border-[#E5E5E5]">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#888] mb-4">05 — Tiempo estimado de entrega</p>
        <p className="text-sm text-[#888] mb-6">
          Timeline{" "}
          <span className="text-[#0A0A0A] font-semibold">{URGENCY_LABELS[data.timeline] ?? data.timeline}</span>
          {" "}— estimado total:{" "}
          <span className="text-[#0A0A0A] font-semibold">{result.deliveryWeeks} semanas</span>
        </p>
        <DeliveryTimeline weeks={result.deliveryWeeks} />
      </section>

      <section className="mb-10 pb-10 border-b border-[#E5E5E5]">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#888] mb-4">06 — Proyección de impacto</p>
        <div className="space-y-4">
          <div className="border border-[#E5E5E5] p-5">
            <span className="text-[#4cfc0f] text-xs font-bold px-2 py-0.5 bg-[#0A0A0A] inline-block mb-3">
              CÁLCULO CON TUS DATOS
            </span>
            <p className="text-sm text-[#0A0A0A] leading-relaxed">
              Con {data.clientsPerMonth.replace("-", " a ")} clientes al mes y ticket promedio de{" "}
              {data.avgTicket.replace("-", "–")} MXN, un aumento de conversión del 10% representa
              aproximadamente{" "}
              <strong>{formatMXN(conversionGain)} MXN adicionales al mes</strong> —
              aritmética simple sobre tus propios números.
            </p>
          </div>
          <div className="border border-[#E5E5E5] p-5">
            <span className="text-xs font-bold px-2 py-0.5 bg-[#F0F0F0] text-[#444] inline-block mb-3">
              ESTIMADO DE PROYECTOS SIMILARES
            </span>
            <p className="text-sm text-[#444] leading-relaxed">
              Negocios del giro {INDUSTRY_LABELS[data.industry] ?? data.industry} que digitalizaron
              su operación reportan reducir entre 30% y 50% el tiempo en respuestas repetitivas a
              clientes.{" "}
              <em className="text-[#888]">
                Estimado basado en casos comparables, no garantizado para tu negocio específico.
              </em>
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#888] mb-4">07 — Tu sesión de estrategia</p>
        <div className="bg-[#F9F9F9] border border-[#E5E5E5] p-6">
          <p className="text-sm font-semibold text-[#0A0A0A] mb-1">
            Sesión agendada para {data.contactName}
          </p>
          {sessionDate && (
            <p className="text-base font-bold text-[#0A0A0A] mb-2">{sessionDate}</p>
          )}
          <p className="text-xs text-[#888]">
            Recibirás confirmación en <strong>{data.email}</strong>
            {data.whatsapp && <> y WhatsApp al <strong>{data.whatsapp}</strong></>}.
            En la sesión revisaremos este análisis, afinaremos el alcance y te compartiremos
            la propuesta formal.
          </p>
        </div>
      </section>

      {/* CTA principal tras completar el análisis */}
      <div className="mb-8 bg-[#0A0A0A] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-[#4cfc0f] text-xs font-semibold uppercase tracking-widest mb-1">Siguiente paso</p>
          <p className="text-white text-sm font-semibold">¿Listo para platicar los resultados?</p>
        </div>
        <a
          href={getWhatsAppLink("analisis")}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 bg-[#25D366] text-white text-sm font-bold px-6 py-3 flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Platicar por WhatsApp →
        </a>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/"
          className="border border-[#E5E5E5] text-sm font-semibold px-6 py-3 text-center hover:border-[#0A0A0A] transition-colors">
          ← Volver a users.mx
        </Link>
        <button onClick={() => window.print()}
          className="border border-[#0A0A0A] text-sm font-semibold px-6 py-3 text-center hover:bg-[#0A0A0A] hover:text-white transition-colors">
          Imprimir reporte
        </button>
      </div>
    </div>
  )
}

// ─── Validación por paso ──────────────────────────────────────────────────────
function isStepValid(step: number, data: FormData, calBooking: CalBooking | null): boolean {
  switch (step) {
    case 1: return !!(data.businessName && data.industry && data.yearsOperating && data.employees)
    case 2: return !!(data.revenueRange && data.clientsPerMonth && data.avgTicket && data.serviceArea)
    case 3: return !!(data.hasWebsite && data.clientAcquisition && data.visualIdentity)
    case 4: return !!(data.urgentProblem && data.features.length > 0)
    case 5: return !!data.timeline
    case 6: return !!(data.contactName && data.email && data.whatsapp && calBooking !== null)
    default: return false
  }
}

const STEP_TITLES = [
  "Tu negocio", "Tamaño y alcance", "Situación digital",
  "Necesidades", "Urgencia y presupuesto", "Agenda tu sesión",
]
const STEP_HEADINGS = [
  "Cuéntanos sobre tu negocio",
  "Tamaño y alcance del negocio",
  "¿Cómo está tu negocio en digital hoy?",
  "¿Qué necesitas resolver?",
  "Tiempos y presupuesto",
  "Agenda tu sesión de estrategia",
]

const STORAGE_KEY = "users-analisis-draft"

// ─── Main page ────────────────────────────────────────────────────────────────
export default function AnalisisPage() {
  const [step, setStep]           = useState(1)
  const [data, setData]           = useState<FormData>(INITIAL_DATA)
  const [result, setResult]       = useState<CalcResult | null>(null)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState("")
  const [analisisId, setAnalisisId] = useState<string | null>(null)
  const [calBooking, setCalBooking] = useState<CalBooking | null>(null)
  const calInitialized              = useRef(false)

  // Cargar borrador guardado al montar
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) return
      const { step: savedStep, data: savedData } = JSON.parse(saved)
      if (savedData) setData((prev) => ({ ...prev, ...savedData }))
      if (savedStep && savedStep <= 5) setStep(savedStep)
    } catch {
      // borrador corrupto — ignorar
    }
  }, [])

  // Persistir mientras el usuario avanza (solo pasos 1–5, sin datos de contacto)
  useEffect(() => {
    if (step >= 6) return
    try {
      const { contactName, email, whatsapp, ...safeData } = data
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, data: safeData }))
    } catch {
      // storage lleno o no disponible — ignorar
    }
  }, [step, data])

  function update(key: keyof FormData, value: string | string[]) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  // ── Cal.com embed: se inicializa cuando el usuario llega al Paso 6 ──────────
  const handleBookingSuccess = useCallback((booking: CalBooking) => {
    setCalBooking(booking)
  }, [])

  useEffect(() => {
    if (step !== 6 || calInitialized.current) return
    calInitialized.current = true

    // Exponer callback antes de inyectar el script
    ;(window as any).__onCalBookingSuccess = handleBookingSuccess

    const script = document.createElement("script")
    script.id = "cal-embed-init"
    script.textContent = `
      (function (C, A, L) {
        let p = function (a, ar) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal; let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {}; cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
            const namespace = ar[1]; api.q = [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = api;
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");

      Cal("init", "${CAL_NAMESPACE}", { origin: "https://app.cal.com" });

      Cal.ns["${CAL_NAMESPACE}"]("inline", {
        elementOrSelector: "#cal-booking-slot",
        calLink: "${CAL_LINK}",
        layout: "month_view"
      });

      Cal.ns["${CAL_NAMESPACE}"]("ui", {
        styles: { branding: { brandColor: "#4cfc0f" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });

      Cal.ns["${CAL_NAMESPACE}"]("on", {
        action: "bookingSuccessful",
        callback: function(e) {
          if (typeof window.__onCalBookingSuccess === "function") {
            window.__onCalBookingSuccess(e.detail.data);
          }
        }
      });
    `
    document.head.appendChild(script)

    return () => {
      delete (window as any).__onCalBookingSuccess
    }
  }, [step, handleBookingSuccess])

  // ── Avanzar paso (con guardado progresivo en Paso 1) ─────────────────────────
  async function handleNext() {
    if (step === 1 && !analisisId) {
      try {
        const res = await fetch("/api/analisis/guardar-progreso", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre_negocio: data.businessName,
            giro: data.industry,
            anos_operando: data.yearsOperating,
            empleados: data.employees,
            ubicaciones: data.locations || null,
          }),
        })
        if (res.ok) {
          const json = await res.json()
          setAnalisisId(json.id)
        } else {
          console.error("[guardar-progreso] HTTP", res.status)
        }
      } catch (err) {
        // No bloquea la navegación — solo se pierde el tracking del abandono
        console.error("[guardar-progreso] fetch error:", err)
      }
    }
    setStep((s) => s + 1)
  }

  // ── Envío final ───────────────────────────────────────────────────────────────
  async function submit() {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/analisis/calcular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, analisisId, calBooking }),
      })
      if (!res.ok) throw new Error("Error en el servidor")
      const json = await res.json()

      // Log de errores no bloqueantes (DB o email)
      if (json._meta?.dbError)    console.error("[submit] DB error:", json._meta.dbError)
      if (json._meta?.emailError) console.error("[submit] Email error:", json._meta.emailError)

      setResult(json)
      setStep(7)
      try { localStorage.removeItem(STORAGE_KEY) } catch { /* ignore */ }
    } catch {
      setError("Ocurrió un error. Por favor intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  // ── Reporte ───────────────────────────────────────────────────────────────────
  if (step === 7 && result) {
    return (
      <div className="min-h-screen bg-white">
        <nav className="sticky top-0 z-10 bg-white border-b border-[#E5E5E5] px-6 py-4">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <Link href="/" className="text-sm font-bold tracking-wide">users.mx</Link>
            <span className="text-xs text-[#888]">Reporte listo</span>
          </div>
        </nav>
        <Report data={data} result={result} calBooking={calBooking} />
      </div>
    )
  }

  const valid = isStepValid(step, data, calBooking)

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top nav */}
      <nav className="sticky top-0 z-10 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold tracking-wide text-[#0A0A0A]">
            ← users.mx
          </Link>
          <span className="text-xs text-[#888]">Paso {step} de 6</span>
        </div>
        <div className="h-0.5 bg-[#F0F0F0]">
          <div className="h-0.5 bg-[#4cfc0f] transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }} />
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-10 lg:py-16">
        <div className="mb-10">
          <p className="text-xs tracking-widest uppercase text-[#888] mb-2">
            Paso {step} de 6 — {STEP_TITLES[step - 1]}
          </p>
          <h1 className="text-2xl lg:text-3xl font-bold text-[#0A0A0A]">
            {STEP_HEADINGS[step - 1]}
          </h1>
          {step === 6 && !calBooking && (
            <p className="text-sm text-[#888] mt-3">
              Selecciona un horario en el calendario. La confirmación llegará a tu correo de inmediato.
            </p>
          )}
        </div>

        {step === 1 && <Step1 data={data} update={update} />}
        {step === 2 && <Step2 data={data} update={update} />}
        {step === 3 && <Step3 data={data} update={update} />}
        {step === 4 && <Step4 data={data} update={update} />}
        {step === 5 && <Step5 data={data} update={update} />}
        {step === 6 && <Step6 data={data} update={update} calBooking={calBooking} />}

        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

        {/* Mensaje de ayuda cuando falta la cita en Paso 6 */}
        {step === 6 && !calBooking && (
          <p className="text-xs text-[#4cfc0f] font-semibold mb-4 bg-[#0A0A0A] px-3 py-2 inline-block">
            Primero agenda tu sesión en el calendario de arriba
          </p>
        )}

        {/* Navegación */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E5E5E5]">
          {step > 1 ? (
            <button onClick={() => setStep((s) => s - 1)}
              className="text-sm font-semibold text-[#888] hover:text-[#0A0A0A] transition-colors">
              ← Atrás
            </button>
          ) : <span />}

          {step < 6 ? (
            <button onClick={handleNext} disabled={!valid}
              className={`px-8 py-3 text-sm font-bold transition-all ${
                valid ? "bg-[#4cfc0f] text-black hover:opacity-90"
                      : "bg-[#F0F0F0] text-[#aaa] cursor-not-allowed"
              }`}>
              Continuar →
            </button>
          ) : (
            <button onClick={submit} disabled={!valid || loading}
              className={`px-8 py-3 text-sm font-bold transition-all ${
                valid && !loading ? "bg-[#0A0A0A] text-white hover:bg-[#222]"
                                  : "bg-[#F0F0F0] text-[#aaa] cursor-not-allowed"
              }`}>
              {loading ? "Generando reporte..." : "Ver mi análisis →"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
