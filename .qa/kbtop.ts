import { searchEntries } from "../lib/knowledge-base"
const qs = ["propiedad del código","cancelar plan","contrato","cómo se paga","anticipo",
            "me llevo el proyecto","renovar","más usuarios","agregar módulo","pruebas","referencias"]
for (const q of qs) {
  const r = searchEntries(q)
  console.log(`"${q}" → ${r[0]?.id ?? "SIN RESULTADO"}`)
}
