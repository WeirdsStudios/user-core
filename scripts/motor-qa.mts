/**
 * Banco del Motor de Análisis.
 *
 *   npx tsx scripts/motor-qa.mts
 *
 * Comprueba lo que un formulario no enseña a simple vista: que dos negocios
 * distintos reciban diagnósticos distintos, que nada se invente, y que los
 * ingresos ajusten el alcance sin decidir el diagnóstico.
 */
import { diagnose } from "@/lib/motor/diagnose"
import type { Answers } from "@/lib/motor/questions"
import { QUESTIONS } from "@/lib/motor/questions"
import { STATE_LABEL } from "@/lib/motor/types"

let pass = 0
let fail = 0
const check = (name: string, ok: boolean, detail = "") => {
  if (ok) {
    pass++
    console.log(`  ok    ${name}`)
  } else {
    fail++
    console.log(`  FAIL  ${name}${detail ? `\n        ${detail}` : ""}`)
  }
}

// ── 20 perfiles sintéticos ───────────────────────────────────────────────────
const perfiles: { nombre: string; a: Answers }[] = [
  {
    nombre: "1. Restaurante sin web",
    a: { businessName: "N", industry: "restaurante", size: "2-5", revenue: "50k-150k",
      hasWebsite: "no", acquisition: ["recomendacion", "local"], closeProcess: "manual-todo",
      manualWork: ["agenda", "cobros"], tools: "papel", customerAsks: ["horarios", "catalogo"],
      priority: "vender-mas", timeline: "normal" },
  },
  {
    nombre: "2. Restaurante con web, reservas a mano",
    a: { businessName: "N", industry: "restaurante", size: "6-20", revenue: "150k-500k",
      hasWebsite: "si", acquisition: ["google", "redes"], closeProcess: "manual-cotiza",
      manualWork: ["agenda", "clientes"], tools: "excel", customerAsks: ["disponibilidad"],
      priority: "atender-mejor", timeline: "normal" },
  },
  {
    nombre: "3. Gimnasio pequeño",
    a: { businessName: "N", industry: "fitness", size: "2-5", revenue: "50k-150k",
      hasWebsite: "redes", acquisition: ["redes", "recomendacion"], closeProcess: "manual-todo",
      manualWork: ["agenda", "cobros", "recordatorios"], tools: "excel",
      customerAsks: ["precios", "disponibilidad"], priority: "menos-manual", timeline: "urgente" },
  },
  {
    nombre: "4. Gimnasio con sucursales",
    a: { businessName: "N", industry: "fitness", size: "20+", revenue: "500k+",
      hasWebsite: "viejo", acquisition: ["redes", "google", "recomendacion"], closeProcess: "parcial",
      manualWork: ["cobros", "reportes", "clientes", "recordatorios"], tools: "apps",
      customerAsks: ["disponibilidad", "estado"], priority: "crecer", timeline: "normal" },
  },
  {
    nombre: "5. Consultorio",
    a: { businessName: "N", industry: "salud", size: "solo", revenue: "50k-150k",
      hasWebsite: "no", acquisition: ["recomendacion"], closeProcess: "manual-todo",
      manualWork: ["agenda", "clientes", "recordatorios"], tools: "papel",
      customerAsks: ["disponibilidad", "horarios"], priority: "menos-manual", timeline: "normal" },
  },
  {
    nombre: "6. Clínica mediana",
    a: { businessName: "N", industry: "salud", size: "6-20", revenue: "500k+",
      hasWebsite: "si", acquisition: ["google", "recomendacion"], closeProcess: "parcial",
      manualWork: ["agenda", "reportes"], tools: "apps", customerAsks: ["estado"],
      priority: "ordenar", timeline: "normal" },
  },
  {
    nombre: "7. Supermercado",
    a: { businessName: "N", industry: "retail", size: "20+", revenue: "500k+",
      hasWebsite: "redes", acquisition: ["local"], closeProcess: "manual-todo",
      manualWork: ["cobros", "inventario", "reportes"], tools: "apps",
      customerAsks: ["catalogo"], priority: "crecer", timeline: "urgente" },
  },
  {
    nombre: "8. Tienda retail chica",
    a: { businessName: "N", industry: "retail", size: "2-5", revenue: "menos-50k",
      hasWebsite: "no", acquisition: ["redes", "local"], closeProcess: "manual-todo",
      manualWork: ["inventario", "cobros"], tools: "papel", customerAsks: ["precios", "catalogo"],
      priority: "vender-mas", timeline: "normal" },
  },
  {
    nombre: "9. Eventos",
    a: { businessName: "N", industry: "eventos", size: "2-5", revenue: "150k-500k",
      hasWebsite: "viejo", acquisition: ["redes", "recomendacion"], closeProcess: "manual-cotiza",
      manualWork: ["clientes"], tools: "excel", customerAsks: ["precios"],
      priority: "vender-mas", timeline: "normal" },
  },
  {
    nombre: "10. Servicios profesionales",
    a: { businessName: "N", industry: "servicios", size: "solo", revenue: "50k-150k",
      hasWebsite: "redes", acquisition: ["recomendacion"], closeProcess: "manual-cotiza",
      manualWork: ["clientes"], tools: "excel", customerAsks: ["precios"],
      priority: "vender-mas", timeline: "normal" },
  },
  {
    nombre: "11. B2B con Excel",
    a: { businessName: "N", industry: "b2b", size: "6-20", revenue: "500k+",
      hasWebsite: "viejo", acquisition: ["recomendacion"], closeProcess: "manual-cotiza",
      manualWork: ["cobros", "clientes", "reportes", "inventario"], tools: "excel",
      customerAsks: ["precios", "estado"], priority: "ordenar", timeline: "normal" },
  },
  {
    nombre: "12. Solo necesita landing",
    a: { businessName: "N", industry: "servicios", size: "solo", revenue: "menos-50k",
      hasWebsite: "no", acquisition: ["recomendacion", "redes"], closeProcess: "automatizado",
      manualWork: ["ninguno"], tools: "sistema", customerAsks: ["horarios"],
      priority: "vender-mas", timeline: "normal" },
  },
  {
    nombre: "13. Ya digitalizado",
    a: { businessName: "N", industry: "retail", size: "6-20", revenue: "500k+",
      hasWebsite: "si", acquisition: ["google", "redes", "publicidad"], closeProcess: "automatizado",
      manualWork: ["ninguno"], tools: "sistema", customerAsks: ["pocas"],
      priority: "crecer", timeline: "explorando" },
  },
  {
    nombre: "14. Poco ingreso, necesidades enormes",
    a: { businessName: "N", industry: "restaurante", size: "solo", revenue: "menos-50k",
      hasWebsite: "no", acquisition: ["whatsapp"], closeProcess: "manual-todo",
      manualWork: ["agenda", "cobros", "inventario", "clientes", "reportes"], tools: "papel",
      customerAsks: ["precios", "disponibilidad", "catalogo"], priority: "menos-manual",
      timeline: "urgente" },
  },
  {
    nombre: "15. Grande con necesidad simple",
    a: { businessName: "N", industry: "b2b", size: "20+", revenue: "500k+",
      hasWebsite: "viejo", acquisition: ["recomendacion", "google", "publicidad"],
      closeProcess: "automatizado", manualWork: ["ninguno"], tools: "sistema",
      customerAsks: ["catalogo"], priority: "vender-mas", timeline: "normal" },
  },
  {
    nombre: "16. Ecommerce",
    a: { businessName: "N", industry: "retail", size: "2-5", revenue: "150k-500k",
      hasWebsite: "si", acquisition: ["redes", "publicidad", "google"], closeProcess: "parcial",
      manualWork: ["inventario", "cobros"], tools: "apps", customerAsks: ["estado"],
      priority: "atender-mejor", timeline: "normal" },
  },
  {
    nombre: "17. Vive de WhatsApp",
    a: { businessName: "N", industry: "servicios", size: "2-5", revenue: "50k-150k",
      hasWebsite: "no", acquisition: ["whatsapp"], closeProcess: "manual-todo",
      manualWork: ["agenda", "clientes"], tools: "papel", customerAsks: ["precios", "disponibilidad"],
      priority: "vender-mas", timeline: "urgente" },
  },
  {
    nombre: "18. Necesita cotizador",
    a: { businessName: "N", industry: "eventos", size: "2-5", revenue: "150k-500k",
      hasWebsite: "si", acquisition: ["google", "redes"], closeProcess: "manual-cotiza",
      manualWork: ["clientes"], tools: "excel", customerAsks: ["precios"],
      priority: "atender-mejor", timeline: "normal" },
  },
  {
    nombre: "19. Necesita portal",
    a: { businessName: "N", industry: "b2b", size: "6-20", revenue: "500k+",
      hasWebsite: "si", acquisition: ["recomendacion", "google"], closeProcess: "parcial",
      manualWork: ["reportes"], tools: "apps", customerAsks: ["estado"],
      priority: "atender-mejor", timeline: "normal" },
  },
  {
    nombre: "20. No necesita software a medida",
    a: { businessName: "N", industry: "servicios", size: "solo", revenue: "50k-150k",
      hasWebsite: "si", acquisition: ["google", "recomendacion", "redes"],
      closeProcess: "automatizado", manualWork: ["ninguno"], tools: "sistema",
      customerAsks: ["pocas"], priority: "crecer", timeline: "explorando" },
  },
]

console.log("\n── DIAGNÓSTICOS ──")
const resultados = perfiles.map((p) => ({ ...p, d: diagnose(p.a, "TEST") }))
for (const { nombre, d } of resultados) {
  console.log(`\n${nombre}`)
  console.log(`  prioridad: ${d.prioridad.label} (${STATE_LABEL[d.prioridad.state]})`)
  console.log(`  categoría: ${d.recomendacion.category}${d.recomendacion.product ? ` · ${d.recomendacion.product}` : ""}`)
  console.log(`  titular:   ${d.headline.slice(0, 110)}`)
}

// ── Aserciones ───────────────────────────────────────────────────────────────
console.log("\n── NADA INVENTADO ──")
const PROHIBIDO: [string, RegExp][] = [
  ["precio cerrado de proyecto", /\$\s?\d{2},\d{3}(?!\s*MXN\b)|costará|tu proyecto cuesta/i],
  ["precio de producto propio", /ACTIIVA.{0,40}\$|MEDIICA.{0,40}\$|\$\d+\s*(mxn)?\/mes/i],
  ["producto anunciado como listo", /(ACTIIVA|MEDIICA)[^.]{0,30}(lista|listo|disponible ya|ya está)/i],
  ["ROI o retorno inventado", /ROI|retorno de inversión|recuperas?\s+\$|payback|% de crecimiento/i],
  ["pérdidas estimadas", /pierdes\s+\$|estás perdiendo|dejas de ganar/i],
  ["certeza absoluta", /necesitas obligatoriamente|tu negocio requiere sin duda|garantizamos/i],
]
for (const [nombre, re] of PROHIBIDO) {
  const culpables = resultados.filter(({ d }) => re.test(JSON.stringify(d)))
  check(
    `ningún diagnóstico contiene ${nombre}`,
    culpables.length === 0,
    culpables.map((c) => c.nombre).join(", ")
  )
}

console.log("\n── LOS DIAGNÓSTICOS SON DISTINTOS ──")
{
  const titulares = new Set(resultados.map((r) => r.d.headline))
  check(`titulares distintos: ${titulares.size} de ${resultados.length}`, titulares.size >= 5)
  const categorias = new Set(resultados.map((r) => r.d.recomendacion.category))
  check(`categorías usadas: ${[...categorias].join(", ")}`, categorias.size >= 4)
  const prioridades = new Set(resultados.map((r) => r.d.prioridad.id))
  check(`prioridades distintas: ${[...prioridades].join(", ")}`, prioridades.size >= 3)
}

console.log("\n── TODO OUTPUT TIENE EVIDENCIA ──")
for (const { nombre, d } of resultados) {
  const conProblema = d.dimensions.filter((x) => x.state === "prioridad" || x.state === "oportunidad")
  const sinEvidencia = conProblema.filter((x) => x.evidence.length === 0)
  check(`${nombre}: ninguna dimensión marcada sin evidencia`, sinEvidencia.length === 0,
    sinEvidencia.map((x) => x.label).join(", "))
}

console.log("\n── PUEDE DECIR QUE NO ──")
{
  const noCustom = resultados.filter((r) => r.d.recomendacion.category === "no_custom")
  check(`al menos un perfil recibe "no necesitas construir nada" (${noCustom.length})`, noCustom.length >= 1,
    noCustom.map((r) => r.nombre).join(", "))
  const web = resultados.filter((r) => r.d.recomendacion.category === "web")
  check(`al menos un perfil recibe solo web (${web.length})`, web.length >= 1)
}

console.log("\n── PRODUCTOS PROPIOS ──")
{
  const actiiva = resultados.filter((r) => r.d.recomendacion.product === "ACTIIVA")
  const mediica = resultados.filter((r) => r.d.recomendacion.product === "MEDIICA")
  check(`ACTIIVA solo aparece en fitness (${actiiva.length})`,
    actiiva.every((r) => r.a.industry === "fitness"))
  check(`MEDIICA solo aparece en salud (${mediica.length})`,
    mediica.every((r) => r.a.industry === "salud"))
  const todos = [...actiiva, ...mediica]
  check("los productos se presentan como en desarrollo",
    todos.every((r) => /desarrollo|todavía|no podemos prometer|etapa temprana/i.test(r.d.recomendacion.body)))
}

console.log("\n── INGRESOS: AJUSTAN ALCANCE, NO DIAGNÓSTICO ──")
{
  const base: Answers = {
    businessName: "N", industry: "retail", size: "2-5",
    hasWebsite: "no", acquisition: ["redes"], closeProcess: "manual-todo",
    manualWork: ["agenda", "cobros", "inventario", "clientes"], tools: "papel",
    customerAsks: ["precios", "disponibilidad"], priority: "menos-manual", timeline: "normal",
  }
  const bajo = diagnose({ ...base, revenue: "menos-50k" }, "T")
  const alto = diagnose({ ...base, revenue: "500k+" }, "T")
  const sinDato = diagnose({ ...base, revenue: "prefiero-no" }, "T")

  check("misma prioridad con ingresos distintos",
    bajo.prioridad.id === alto.prioridad.id,
    `${bajo.prioridad.id} vs ${alto.prioridad.id}`)
  check("misma categoría de recomendación",
    bajo.recomendacion.category === alto.recomendacion.category,
    `${bajo.recomendacion.category} vs ${alto.recomendacion.category}`)
  check("el alcance inicial sí cambia",
    JSON.stringify(bajo.recomendacion.fase_inicial) !== JSON.stringify(alto.recomendacion.fase_inicial),
    `${bajo.recomendacion.fase_inicial.join("|")} vs ${alto.recomendacion.fase_inicial.join("|")}`)
  check("no responder ingresos no rompe ni penaliza",
    sinDato.prioridad.id === bajo.prioridad.id && sinDato.observaciones.length > 0)
  check("los ingresos nunca aparecen en el texto del diagnóstico",
    !/50,000|500,000|ingresos de|ganas/i.test(JSON.stringify(alto)))
}

console.log("\n── CADA PREGUNTA ALIMENTA ALGO ──")
{
  const sinDimension = QUESTIONS.filter((q) => q.feeds.length === 0)
  check(`las ${QUESTIONS.length} preguntas declaran dimensión`, sinDimension.length === 0,
    sinDimension.map((q) => q.id).join(", "))

  // Cambiar cada respuesta debe poder cambiar algo del diagnóstico.
  const base = perfiles[0].a
  const inertes: string[] = []
  for (const q of QUESTIONS) {
    if (!q.options || q.options.length < 2) continue
    const variantes = q.options.map((o) =>
      JSON.stringify(diagnose({ ...base, [q.id]: q.kind === "multi" ? [o.value] : o.value }, "T"))
    )
    if (new Set(variantes).size === 1) inertes.push(q.id)
  }
  check(`ninguna pregunta es inerte`, inertes.length === 0, `inertes: ${inertes.join(", ")}`)
}

console.log(`\n═══ ${pass} ok · ${fail} fail ═══\n`)
process.exit(fail > 0 ? 1 : 0)
