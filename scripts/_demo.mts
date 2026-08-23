import { diagnose } from "@/lib/motor/diagnose"
import type { Answers } from "@/lib/motor/questions"
const perfiles: [string, Answers][] = [
  ["A · PyME sin sitio", { businessName:"Taquería", industry:"restaurante", size:"2-5", revenue:"50k-150k",
    hasWebsite:"no", acquisition:["recomendacion","local"], closeProcess:"manual-todo",
    manualWork:["agenda"], tools:"excel", customerAsks:["horarios","catalogo"], priority:"vender-mas", timeline:"normal" }],
  ["B · Con sitio, operación manual", { businessName:"Ferretería", industry:"retail", size:"6-20", revenue:"150k-500k",
    hasWebsite:"si", acquisition:["google","local"], closeProcess:"parcial",
    manualWork:["inventario","cobros","reportes","clientes"], tools:"excel", customerAsks:["precios"], priority:"menos-manual", timeline:"urgente" }],
  ["C · Fitness compatible con ACTIIVA", { businessName:"Estudio", industry:"fitness", size:"2-5", revenue:"50k-150k",
    hasWebsite:"redes", acquisition:["redes"], closeProcess:"manual-todo",
    manualWork:["agenda","cobros","recordatorios"], tools:"papel", customerAsks:["disponibilidad","precios"], priority:"menos-manual", timeline:"urgente" }],
  ["D · Salud (sin producto propio)", { businessName:"Consultorio", industry:"salud", size:"solo", revenue:"50k-150k",
    hasWebsite:"no", acquisition:["recomendacion"], closeProcess:"manual-todo",
    manualWork:["agenda","clientes","recordatorios"], tools:"papel", customerAsks:["disponibilidad"], priority:"menos-manual", timeline:"normal" }],
  ["E · NO necesita software a medida", { businessName:"Despacho", industry:"servicios", size:"solo", revenue:"50k-150k",
    hasWebsite:"si", acquisition:["google","recomendacion","redes"], closeProcess:"automatizado",
    manualWork:["ninguno"], tools:"sistema", customerAsks:["pocas"], priority:"crecer", timeline:"explorando" }],
]
for (const [n,a] of perfiles) {
  const d = diagnose(a,"DEMO")
  console.log(`\n${"═".repeat(72)}\n${n}`)
  console.log(`TITULAR: ${d.headline}`)
  console.log(`PRIORIDAD: ${d.prioridad.label} · CATEGORÍA: ${d.recomendacion.category}${d.recomendacion.product?` (${d.recomendacion.product})`:""}`)
  console.log(`MAPA: ${d.dimensions.map(x=>`${x.label}=${x.state}`).join(" · ")}`)
  console.log(`RECOMENDACIÓN: ${d.recomendacion.title}`)
  console.log(`FASE INICIAL: ${d.recomendacion.fase_inicial.join(" | ")}`)
  console.log(`INVERSIÓN: ${d.inversion.entrada}`)
}
