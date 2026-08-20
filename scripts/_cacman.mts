/**
 * Revisión manual del Centro de Atención.
 *
 * No es el banco de regresión (`support-qa.mts`): estas conversaciones no
 * están para pasar o fallar, sino para leerlas y juzgar si la experiencia se
 * siente natural. Ninguna frase está tomada del banco.
 *
 *   npx tsx scripts/_cacman.mts
 */
import { initialState, respond } from "@/lib/support/engine"
import type { ConversationState } from "@/lib/support/types"

function turn(s: ConversationState, t: string) {
  const w = {
    ...s,
    messages: [...s.messages, { id: "u", role: "user" as const, text: t, at: Date.now() }],
  }
  const r = respond(w, t)
  return { reply: r.reply, state: { ...r.state, messages: [...w.messages, r.reply] } }
}

const conversaciones: [string, string[]][] = [
  ["Prospecto coloquial", ["q onda, hacen paginas?"]],
  ["Prospecto con faltas", ["ola kiero saber si asen tiendas en linea"]],
  ["Prospecto indeciso", ["no se si necesito pagina o sistema", "tengo una ferreteria chica"]],
  ["Prospecto directo", ["cuanto me cobran por una landing"]],
  ["Prospecto que compara", ["por que no mejor uso wix"]],
  ["Prospecto de anuncio", ["vengo de instagram", "quiero cotizar algo para mi negocio"]],
  ["Mensaje ultracorto", ["hola"]],
  ["Mensaje ultracorto", ["si"]],
  ["Cambio de tema", ["cuanto cuesta un sitio", "oye y ustedes dan factura?"]],
  ["Usuario frustrado", ["ya les escribi 3 veces y nadie contesta"]],
  ["Usuario frustrado", ["esto no sirve para nada"]],
  ["Cliente con incidente", ["se me borro todo el contenido de mi pagina"]],
  ["Cliente con ajuste", ["porfa cambien el numero de telefono del footer"]],
  ["Cliente con duda de plan", ["que me cubre lo que pago cada mes"]],
  ["Consulta ambigua", ["ayuda"]],
  ["Fuera de tema", ["me puedes cotizar una app de citas medicas para vender yo"]],
  ["Multi-turno comercial", ["quiero un sistema para mi taller", "para llevar ordenes de servicio", "somos 4 personas"]],
]

for (const [etiqueta, script] of conversaciones) {
  let s = initialState()
  console.log(`\n${"─".repeat(72)}\n${etiqueta}`)
  for (const t of script) {
    const r = turn(s, t)
    s = r.state
    console.log(`\n  › ${t}`)
    console.log(`  ‹ [${r.reply.decision}] ${r.reply.text.replace(/\n+/g, " ").slice(0, 230)}`)
    if (r.reply.actions?.length) {
      console.log(`    acciones: ${r.reply.actions.map((a) => a.label).join(" · ")}`)
    }
  }
}
