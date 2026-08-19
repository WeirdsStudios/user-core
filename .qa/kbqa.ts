import { searchEntries, KB_ENTRIES } from "../lib/knowledge-base"

const preguntas = [
  "¿Cuánto cuesta una página?",
  "¿Pueden hacer un sistema para mi empresa?",
  "Necesito cambiar una foto",
  "Mi página dejó de funcionar",
  "Quiero agregar reservaciones",
  "¿Qué es ACTIIVA?",
  "¿Qué es MEDIICA?",
  "¿Cuánto cuesta mantener un sistema?",
  "Quiero cambiar el dominio",
  "Quiero hablar con una persona",
]

console.log(`Entradas totales: ${KB_ENTRIES.length}\n`)
let fallos = 0
for (const q of preguntas) {
  const r = searchEntries(q)
  const top = r[0]
  const ok = Boolean(top)
  if (!ok) fallos++
  console.log(`${ok ? "OK " : "✗  "} "${q}"`)
  console.log(`     → ${top ? `${top.id} [${top.mode}]` : "SIN RESULTADO"}${r.length ? `  (${r.length} resultados)` : ""}`)
}
console.log(`\nSin respuesta: ${fallos}/${preguntas.length}`)

const porModo = KB_ENTRIES.reduce<Record<string, number>>((a, e) => {
  a[e.mode] = (a[e.mode] ?? 0) + 1; return a
}, {})
console.log("Por modo:", JSON.stringify(porModo))
console.log("Pendientes de política:", KB_ENTRIES.filter(e => e.needsPolicy).map(e => e.id).join(", "))
