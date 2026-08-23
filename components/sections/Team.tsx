import { siteConfig } from "@/lib/site-config"

/**
 * Equipo real. El avatar es gráfico (iniciales sobre rejilla técnica) y no una
 * fotografía: las imágenes que había antes eran de stock y no correspondían a
 * estas personas.
 *
 * Las especialidades son deliberadamente concretas —electrónica, redes,
 * pedagogía— porque son justo lo que no tiene una agencia de páginas web.
 */
const team = [
  { name: "Haza Munguía", area: "Estrategia y desarrollo" },
  { name: "Nahum Munguía", area: "Microcómputo y electrónica" },
  { name: "Jonathan Ayala", area: "Cloud y redes" },
  { name: "Alejandra Zebadúa", area: "Diseño" },
  { name: "Karina Romero", area: "Pedagogía y comportamiento del usuario" },
]

function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

export default function Team() {
  return (
    <section id="equipo" className="bg-[#0A0A0A] text-white py-14 lg:py-24 border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
          <div className="lg:col-span-4">
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#4cfc0f]">
              Quiénes somos
            </span>
            <h2 className="text-[1.6rem] sm:text-2xl lg:text-3xl font-bold leading-tight mt-3">
              Ingeniería, diseño y negocio en el mismo equipo
            </h2>
            <p className="text-[#8E8E8E] text-sm lg:text-base mt-4 leading-relaxed">
              No somos una agencia que subcontrata. Las decisiones técnicas, de
              diseño y de negocio se toman en la misma mesa.
            </p>
          </div>

          <ul className="lg:col-span-8 mt-8 lg:mt-0 grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#1F1F1F] border border-[#1F1F1F]">
            {team.map((person) => (
              <li key={person.name} className="bg-[#0A0A0A] p-5 flex items-center gap-4">
                <span
                  className="relative w-11 h-11 shrink-0 border border-[#2E2E2E] bg-[#111] flex items-center justify-center overflow-hidden"
                  aria-hidden="true"
                >
                  <span className="grid-tech absolute inset-0 opacity-70" />
                  <span className="relative font-mono text-[13px] font-bold text-[#4cfc0f] tracking-wide">
                    {initials(person.name)}
                  </span>
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-semibold leading-tight">{person.name}</span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-[#8A8A8A] mt-1.5 leading-relaxed">
                    {person.area}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="font-mono text-[11px] text-[#8A8A8A] mt-8 pt-6 border-t border-[#1A1A1A]">
          {siteConfig.contact.city}, México ·{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="text-[#8A8A8A] hover:text-white transition-colors underline underline-offset-4 inline-block py-1.5"
          >
            {siteConfig.contact.email}
          </a>
        </p>
      </div>
    </section>
  )
}
