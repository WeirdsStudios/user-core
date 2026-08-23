/**
 * Banco de pruebas del funnel publicitario.
 *
 *   node scripts/funnel-qa.mjs        (con `npx next start` corriendo en :3000)
 *
 * Comprueba lo que no se ve mirando la página: que nada se cargue antes del
 * consentimiento, que un clic produzca exactamente un evento, que la
 * atribución sobreviva a la navegación y que ningún dato personal salga del
 * navegador.
 */
import { chromium } from "playwright"

const BASE = process.env.QA_BASE ?? "http://localhost:3000"
let problems = 0
const note = (ok, msg, extra = "") => {
  if (!ok) problems++
  console.log(`  ${ok ? "ok  " : "!!  "} ${msg}${extra ? `\n         ${extra}` : ""}`)
}

const browser = await chromium.launch()

/**
 * Página instrumentada: captura los eventos que la capa emitiría y registra
 * las peticiones a dominios de terceros.
 */
async function newPage(consent) {
  const ctx = await browser.newContext()
  await ctx.addInitScript((c) => {
    // Los eventos se acumulan en sessionStorage y no en una variable: cada
    // carga completa crea un contexto de JS nuevo, y un recorrido de campaña
    // atraviesa varias páginas.
    const KEY = "__qa_events"
    window.__thirdParty = []
    window.va = (kind, name, data) => {
      const prev = JSON.parse(sessionStorage.getItem(KEY) ?? "[]")
      prev.push({ name, data, via: "vercel" })
      sessionStorage.setItem(KEY, JSON.stringify(prev))
    }
    if (c) {
      localStorage.setItem(
        "users-consent",
        JSON.stringify({ ...c, decidedAt: new Date().toISOString(), version: 1 })
      )
    }
  }, consent ?? null)

  const page = await ctx.newPage()
  page.on("request", (r) => {
    const host = new URL(r.url()).hostname
    if (!host.includes("localhost") && !host.includes("127.0.0.1")) {
      page.evaluate((h) => window.__thirdParty.push(h), host).catch(() => {})
    }
  })
  return { ctx, page }
}

const events = (page) =>
  page.evaluate(() => JSON.parse(sessionStorage.getItem("__qa_events") ?? "[]"))
const thirdParty = (page) => page.evaluate(() => [...new Set(window.__thirdParty ?? [])])

// ─────────────────────────────────────────────── 1. Consentimiento
console.log("\n── CONSENTIMIENTO ──")

{
  const { ctx, page } = await newPage(null)
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" })
  await page.waitForTimeout(900)
  const banner = await page.getByRole("region", { name: /cookies/i }).isVisible()
  note(banner, "visitante nuevo: se le pregunta antes de medir")

  const e = await events(page)
  note(e.length === 0, `sin decisión no se emite ningún evento (${e.length})`, JSON.stringify(e.map((x) => x.name)))

  const hosts = await thirdParty(page)
  const ads = hosts.filter((h) => /facebook|googletagmanager|google-analytics|doubleclick/.test(h))
  note(ads.length === 0, `sin decisión no carga ningún script publicitario`, ads.join(", "))

  // Rechazar debe costar un solo clic desde el aviso
  const rejectBtn = page.getByRole("button", { name: "Rechazar", exact: true })
  note(await rejectBtn.isVisible(), "rechazar está a un clic, igual que aceptar")
  await ctx.close()
}

{
  const { ctx, page } = await newPage({ analytics: true, advertising: false })
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" })
  await page.waitForTimeout(800)
  const e = await events(page)
  note(e.some((x) => x.name === "page_view"), "acepta medición: sí se mide")
  const hosts = await thirdParty(page)
  const ads = hosts.filter((h) => /facebook|doubleclick/.test(h))
  note(ads.length === 0, "acepta medición pero no publicidad: no carga Meta", ads.join(", "))
  await ctx.close()
}

{
  const { ctx, page } = await newPage({ analytics: false, advertising: false })
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" })
  await page.waitForTimeout(800)
  const e = await events(page)
  note(e.length === 0, `rechaza todo: no se emite nada (${e.length})`)
  const banner = await page.getByRole("region", { name: /cookies/i }).count()
  note(banner === 0, "rechaza todo: no se vuelve a preguntar")
  await ctx.close()
}

{
  const { ctx, page } = await newPage({ analytics: true, advertising: true })
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" })
  await page.waitForTimeout(500)
  // Cambiar de opinión desde el pie
  await page.getByRole("button", { name: /Preferencias de cookies/i }).click()
  await page.waitForTimeout(400)
  const dialog = await page.getByRole("dialog", { name: /Preferencias/i }).isVisible()
  note(dialog, "se pueden cambiar las preferencias desde el pie de página")
  await page.getByRole("button", { name: /Rechazar opcionales/i }).click()
  await page.waitForTimeout(400)
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("users-consent") ?? "{}"))
  note(stored.analytics === false && stored.advertising === false, "el cambio se guarda", JSON.stringify(stored))
  await ctx.close()
}

{
  // Navegación privada: localStorage inaccesible
  const ctx = await browser.newContext()
  await ctx.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() { throw new DOMException("bloqueado") },
    })
  })
  const page = await ctx.newPage()
  const errors = []
  page.on("pageerror", (e) => errors.push(e.message))
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" })
  await page.waitForTimeout(700)
  const usable = await page.getByRole("link", { name: /Analizar mi negocio/i }).first().isVisible()
  note(errors.length === 0 && usable, `sin almacenamiento el sitio sigue usable (${errors.length} errores)`, errors.join(" | "))
  await ctx.close()
}

// ─────────────────────────────────────────────── 2. Eventos
console.log("\n── EVENTOS ──")
const CONSENT = { analytics: true, advertising: true }

{
  const { ctx, page } = await newPage(CONSENT)
  await page.goto(BASE + "/proyectos", { waitUntil: "domcontentloaded" })
  await page.waitForTimeout(700)
  await page.evaluate(() => sessionStorage.setItem("__qa_events", "[]"))
  await page.evaluate(() => document.querySelector('a[href="/proyectos/greek-gym"]')?.click())
  await page.waitForTimeout(500)
  const clicks = (await events(page)).filter((x) => x.name === "project_cta_clicked")
  note(clicks.length === 1, `un clic produce exactamente un evento (${clicks.length})`)
  await ctx.close()
}

{
  const { ctx, page } = await newPage(CONSENT)
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" })
  await page.waitForTimeout(600)
  await page.evaluate(() => document.querySelector('a[href="/proyectos"]')?.click())
  await page.waitForTimeout(900)
  const views = (await events(page)).filter((x) => x.name === "page_view")
  note(views.length === 2, `navegar produce un page_view por página (${views.length})`,
    views.map((v) => v.data?.page_path).join(" → "))
  note(
    views.every((v) => !String(v.data?.page_path).includes("?")),
    "page_path nunca lleva parámetros"
  )
  await ctx.close()
}

{
  const { ctx, page } = await newPage(CONSENT)
  await page.goto(BASE + "/soluciones/desarrollo-web", { waitUntil: "domcontentloaded" })
  await page.waitForTimeout(700)
  const e = await events(page)
  const view = e.find((x) => x.name === "solution_viewed")
  note(view?.data?.solution === "desarrollo-web", "solution_viewed identifica la solución", JSON.stringify(view?.data))
  note(view?.data?.page_type === "solution", "page_type se deriva de la ruta")
  note(view?.data?.funnel_stage === "consideration", `funnel_stage correcto (${view?.data?.funnel_stage})`)
  await ctx.close()
}

// ─────────────────────────────────────────────── 3. Atribución
console.log("\n── ATRIBUCIÓN ──")
{
  const { ctx, page } = await newPage(CONSENT)
  await page.goto(
    BASE + "/?utm_source=meta&utm_medium=paid_social&utm_campaign=web_pymes&utm_content=video_a&fbclid=ABC123",
    { waitUntil: "domcontentloaded" }
  )
  await page.waitForTimeout(700)
  let e = await events(page)
  const first = e.find((x) => x.name === "page_view")
  note(first?.data?.source === "meta" && first?.data?.medium === "paid_social", "los UTM viajan con el evento", JSON.stringify(first?.data))
  note(!JSON.stringify(first?.data ?? {}).includes("ABC123"), "el identificador de clic no se mete en los metadatos del evento")

  const stored = await page.evaluate(() => JSON.parse(sessionStorage.getItem("users-touch-current") ?? "{}"))
  note(stored.click_ids?.fbclid === "ABC123", "el identificador de clic sí se conserva para la plataforma", JSON.stringify(stored.click_ids))

  await page.evaluate(() => document.querySelector('a[href="/proyectos"]')?.click())
  await page.waitForTimeout(800)
  e = await events(page)
  const last = e[e.length - 1]
  note(last?.data?.source === "meta", "la atribución sobrevive a la navegación", JSON.stringify(last?.data))
  note(!page.url().includes("utm_"), `la URL interna no se ensucia (${page.url()})`)
  await ctx.close()
}

{
  // Primer toque vs toque actual
  const ctx = await browser.newContext()
  await ctx.addInitScript((c) => {
    window.va = (k, n, d) => {
      const prev = JSON.parse(sessionStorage.getItem("__qa_events") ?? "[]")
      prev.push({ name: n, data: d })
      sessionStorage.setItem("__qa_events", JSON.stringify(prev))
    }
    localStorage.setItem("users-consent", JSON.stringify({ ...c, decidedAt: new Date().toISOString(), version: 1 }))
    localStorage.setItem(
      "users-touch-first",
      JSON.stringify({ source: "business_card", medium: "offline", campaign: "networking", at: Date.now() })
    )
  }, CONSENT)
  const page = await ctx.newPage()
  await page.goto(BASE + "/?utm_source=google&utm_medium=cpc&utm_campaign=marca", { waitUntil: "domcontentloaded" })
  await page.waitForTimeout(700)
  const pv = (await events(page)).find((x) => x.name === "page_view")
  note(pv?.data?.source === "google", "toque actual = la visita de ahora")
  note(pv?.data?.first_source === "business_card", "primer toque se conserva y no se sobrescribe", JSON.stringify(pv?.data))
  await ctx.close()
}

// ─────────────────────────────────────────────── 4. Privacidad
console.log("\n── PRIVACIDAD ──")
{
  const { ctx, page } = await newPage(CONSENT)
  await page.goto(BASE + "/centro-de-atencion", { waitUntil: "domcontentloaded" })
  await page.getByPlaceholder("Escribe tu consulta…").fill(
    "soy Juan Pérez, mi correo juan@negocio.com, tel 5512345678, mi sitio no carga"
  )
  await page.getByRole("button", { name: "Enviar" }).click()
  await page.waitForTimeout(800)
  const blob = JSON.stringify(await events(page))
  const leaks = /Juan|juan@|negocio\.com|5512345678|no carga/i.test(blob)
  note(!leaks, "el texto de la conversación nunca sale en los eventos", blob.slice(0, 180))
  await ctx.close()
}

{
  const { ctx, page } = await newPage(CONSENT)
  await page.goto(BASE + "/analisis", { waitUntil: "domcontentloaded" })
  await page.waitForTimeout(600)
  // El Motor V2 usa controles con rol radio/checkbox, no botones sueltos, y
  // el contacto ya no es un paso: va después del diagnóstico.
  await page.getByPlaceholder("Ej. Taquería El Güero").fill("Mi Negocio Confidencial SA")
  for (const grupo of await page.locator("[role=radiogroup]").all()) {
    const ops = await grupo.locator("[role=radio]").all()
    if (ops.length) await ops[0].click()
  }
  await page.route("**/api/analisis/**", (r) =>
    r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) })
  )
  await page.getByRole("button", { name: /Continuar/ }).click()
  await page.waitForTimeout(700)
  const blob = JSON.stringify(await events(page))
  note(!/Confidencial|Restaurante/i.test(blob), "los datos del Motor no salen en los eventos", blob.slice(0, 180))
  note(/analysis_progressed/.test(blob), "sí se mide el avance, solo con el número de paso")
  await ctx.close()
}

// ─────────────────────────────────────────────── 5. Bloqueadores y fallos
console.log("\n── RESISTENCIA ──")
{
  const ctx = await browser.newContext()
  const page = await ctx.newPage()
  // Simula un bloqueador: todo dominio de terceros falla
  await page.route(/facebook|googletagmanager|google-analytics|doubleclick|vercel-scripts|vercel-insights/, (r) => r.abort())
  const errors = []
  page.on("pageerror", (e) => errors.push(e.message))
  await page.addInitScript((c) => {
    localStorage.setItem("users-consent", JSON.stringify({ ...c, decidedAt: new Date().toISOString(), version: 1 }))
  }, CONSENT)
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" })
  await page.evaluate(() => document.querySelector('a[href="/analisis"]')?.click())
  await page.waitForTimeout(900)
  note(errors.length === 0, `con bloqueador activo no hay errores JS (${errors.length})`, errors.join(" | "))
  note(page.url().includes("/analisis"), "los CTA siguen navegando con el tracking bloqueado")
  await ctx.close()
}

{
  // Proveedor que revienta al ser llamado
  const ctx = await browser.newContext()
  await ctx.addInitScript((c) => {
    localStorage.setItem("users-consent", JSON.stringify({ ...c, decidedAt: new Date().toISOString(), version: 1 }))
    window.va = () => { throw new Error("proveedor caído") }
    window.gtag = () => { throw new Error("proveedor caído") }
    window.fbq = () => { throw new Error("proveedor caído") }
  }, CONSENT)
  const page = await ctx.newPage()
  const errors = []
  page.on("pageerror", (e) => errors.push(e.message))
  await page.goto(BASE + "/centro-de-atencion", { waitUntil: "domcontentloaded" })
  await page.getByRole("button", { name: "Algo dejó de funcionar" }).click()
  await page.waitForTimeout(700)
  const answered = await page.locator("ol li").count()
  note(errors.length === 0 && answered >= 2, `un proveedor que falla no rompe el Centro (${errors.length} errores, ${answered} mensajes)`)
  await ctx.close()
}

// ─────────────────────────────────────────────── 6. Recorridos de campaña
console.log("\n── RECORRIDOS ──")

const journeys = [
  {
    name: "Meta frío → web → caso → análisis",
    entry: "/?utm_source=meta&utm_medium=paid_social&utm_campaign=web_pymes",
    steps: ["/soluciones/desarrollo-web", "/proyectos/greek-gym", "/analisis"],
    expect: ["page_view", "solution_viewed", "project_viewed"],
    stage: "high_intent",
  },
  {
    name: "Tarjeta QR → home → proyectos",
    entry: "/hola",
    steps: ["/proyectos", "/proyectos/las-frescas"],
    expect: ["page_view", "project_viewed"],
    stage: "consideration",
  },
  {
    name: "Google → solución → caso",
    entry: "/?utm_source=google&utm_medium=cpc&utm_campaign=marca",
    steps: ["/soluciones/punto-de-venta-a-medida", "/proyectos/llevelin"],
    expect: ["solution_viewed", "project_viewed"],
    stage: "consideration",
  },
  {
    name: "Retargeting → caso → home → análisis",
    entry: "/proyectos/greek-gym?utm_source=meta&utm_medium=paid_social&utm_campaign=retarget",
    steps: ["/", "/analisis"],
    expect: ["project_viewed", "page_view"],
    stage: "high_intent",
  },
]

for (const j of journeys) {
  const { ctx, page } = await newPage(CONSENT)
  await page.goto(BASE + j.entry, { waitUntil: "domcontentloaded" })
  await page.waitForTimeout(500)
  for (const step of j.steps) {
    await page.goto(BASE + step, { waitUntil: "domcontentloaded" })
    await page.waitForTimeout(500)
  }
  const e = await events(page)
  const names = new Set(e.map((x) => x.name))
  const missing = j.expect.filter((n) => !names.has(n))
  const stage = e[e.length - 1]?.data?.funnel_stage
  note(missing.length === 0, `${j.name}: eventos esperados`, missing.length ? `faltan ${missing.join(", ")}` : "")
  note(stage === j.stage, `${j.name}: termina en ${stage} (esperado ${j.stage})`)
  await ctx.close()
}

await browser.close()
console.log(`\n═══ ${problems === 0 ? "SIN HALLAZGOS" : problems + " hallazgos"} ═══`)
process.exit(problems > 0 ? 1 : 0)
