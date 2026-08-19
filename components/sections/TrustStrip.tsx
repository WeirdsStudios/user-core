/**
 * Franja de confianza inmediata después del hero.
 *
 * Solo afirmaciones verificables contra lo que el propio sitio muestra: no hay
 * porcentajes de satisfacción ni cifras que no podamos sostener. La pregunta
 * que responde es "¿estos sí saben hacer esto?", no "¿son los mejores?".
 */
const facts = [
  {
    title: "Proyectos en producción",
    body: "Sitios y sistemas funcionando hoy con clientes reales, no prototipos.",
  },
  {
    title: "Web y software, mismo equipo",
    body: "La presencia digital y el sistema que opera por detrás los construye la misma gente.",
  },
  {
    title: "Producto propio",
    body: "Desarrollamos ACTIIVA, nuestra plataforma para negocios fitness.",
  },
  {
    title: "Acompañamiento posterior",
    body: "El proyecto no termina en el lanzamiento: hay soporte y mantenimiento después.",
  },
]

export default function TrustStrip() {
  return (
    <section className="bg-[#0A0A0A] border-t border-[#1A1A1A] py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-7">
          {facts.map((fact) => (
            <li key={fact.title}>
              <p className="text-white text-sm font-semibold flex items-start gap-2.5">
                <span className="text-[#4cfc0f] leading-none mt-0.5" aria-hidden="true">—</span>
                {fact.title}
              </p>
              <p className="text-[#8A8A8A] text-xs leading-relaxed mt-1.5 pl-6">
                {fact.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
