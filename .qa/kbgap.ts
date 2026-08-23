import { KB_ENTRIES, searchEntries } from "../lib/knowledge-base"

// Ciclo de vida completo de un cliente USERS
const CICLO: Record<string, string[]> = {
  DESCUBRIMIENTO: ["qué hacen", "trabajan con mi giro", "portafolio", "referencias"],
  COTIZACION: ["cuánto cuesta", "cotizar sistema", "presupuesto", "qué incluye el precio"],
  CONTRATACION: ["cómo se paga", "anticipo", "contrato", "factura", "cancelar antes"],
  DISENO: ["aprobar diseño", "cuántas revisiones", "no me gusta el diseño"],
  DESARROLLO: ["ver avances", "cambios", "cambio de alcance"],
  REVISION: ["cómo apruebo", "pruebas", "qué reviso"],
  LANZAMIENTO: ["publicar", "capacitación", "manual", "entrega"],
  DOMINIO: ["dominio", "hosting", "correo", "quién paga"],
  OPERACION: ["quién administra", "puedo editar yo", "capacitar equipo"],
  MANTENIMIENTO: ["plan sitio", "plan sistemas", "sin plan"],
  AJUSTES: ["cambiar texto", "cambiar imagen", "nueva sección", "nueva función"],
  INCIDENTES: ["dejó de funcionar", "no puedo entrar", "hackeado", "lento"],
  CRECIMIENTO: ["agregar módulo", "escalar", "más usuarios"],
  RENOVACION: ["cancelar plan", "renovar", "me llevo el proyecto", "propiedad del código"],
}

console.log(`Entradas actuales: ${KB_ENTRIES.length}\n`)
const huecos: string[] = []
for (const [etapa, consultas] of Object.entries(CICLO)) {
  const sin = consultas.filter((q) => searchEntries(q).length === 0)
  const marca = sin.length === 0 ? "OK " : "!! "
  console.log(`${marca}${etapa.padEnd(16)} ${consultas.length - sin.length}/${consultas.length}`)
  if (sin.length) { console.log(`     falta: ${sin.join(" · ")}`); huecos.push(...sin) }
}
console.log(`\nConsultas sin respuesta: ${huecos.length}`)
