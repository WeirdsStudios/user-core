import { retrieve } from "@/lib/support/retrieval"
import { classifyIntent, isInScope } from "@/lib/support/classify"
import { tokenize } from "@/lib/support/retrieval"
for (const q of ["por que no mejor uso wix","por que no uso wix","wix","me conviene mas wix","se me borro todo el contenido de mi pagina","que me cubre lo que pago cada mes"]) {
  const h=retrieve(q); const c=classifyIntent(q)
  console.log(`\n"${q}"\n  tok=${JSON.stringify(tokenize(q))} intent=${c.intent}(${c.strength}) scope=${isInScope(q)}`)
  console.log("  "+h.slice(0,3).map(x=>x.confidence.toFixed(3)+":"+x.entry.id).join("  "))
}
