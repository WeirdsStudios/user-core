/**
 * El equipo recupera sección propia en la home.
 *
 * En la Fase 4 se comprimió al footer, y eso costaba credibilidad: los
 * proyectos que hacemos requieren disciplinas que no suele tener una agencia de
 * páginas web —electrónica, redes, pedagogía— y eso solo se comunica poniendo
 * a las personas delante.
 *
 * Avatar gráfico con iniciales sobre rejilla técnica, no fotografía: las
 * imágenes que había antes eran de stock y no correspondían a estas personas.
 */
const TEAM = [
  {
    name: "Haza Munguía",
    role: "Estrategia y desarrollo",
    focus: "Traduce el problema del negocio en qué se construye y en qué orden.",
  },
  {
    name: "Nahum Munguía",
    role: "Microcómputo y electrónica",
    focus: "Lo que ocurre donde el software toca el mundo físico.",
  },
  {
    name: "Jonathan Ayala",
    role: "Cloud y redes",
    focus: "Que el sistema esté disponible, seguro y aguante la operación diaria.",
  },
  {
    name: "Alejandra Zebadúa",
    role: "Diseño",
    focus: "Estructura y experiencia antes que estética.",
  },
  {
    name: "Karina Romero",
    role: "Pedagogía y comportamiento del usuario",
    focus: "Que la herramienta se entienda sin capacitación de por medio.",
  },
]

function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

export default function Equipo() {
  return (
    <section
      id="equipo"
      aria-labelledby="equipo-titulo"
      className="bg-[#0A0A0A] text-white py-12 lg:py-20 border-t border-[#1A1A1A]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#4cfc0f]">
            Quiénes lo construyen
          </span>
          <h2
            id="equipo-titulo"
            className="text-[1.6rem] sm:text-3xl lg:text-[2.5rem] font-bold leading-[1.15] mt-3 text-balance tracking-tight"
          >
            Un equipo. Varias disciplinas. Una sola entrega.
          </h2>
          <p className="text-[#B0B0B0] text-[15px] lg:text-lg mt-4 leading-relaxed">
            Un sistema que cobra en una caja, corre en la nube y lo usa alguien
            sin capacitación no lo resuelve un solo perfil. Estas son las
            disciplinas que se sientan en la misma mesa.
          </p>
        </div>

        <ul className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-[#1F1F1F] border border-[#1F1F1F] mt-8 lg:mt-12">
          {TEAM.map((person) => (
            <li key={person.name} className="bg-[#0A0A0A] p-4 sm:p-5 lg:p-6">
              <span
                className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-[#2E2E2E] bg-[#111] overflow-hidden"
                aria-hidden="true"
              >
                <span className="grid-tech absolute inset-0 opacity-70" />
                <span className="relative font-mono text-sm font-bold text-[#4cfc0f] tracking-wide">
                  {initials(person.name)}
                </span>
              </span>
              <h3 className="text-[15px] sm:text-base font-bold mt-3 sm:mt-4 leading-tight">{person.name}</h3>
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#4cfc0f] mt-1.5 leading-relaxed">
                {person.role}
              </p>
              <p className="text-[#B0B0B0] text-sm mt-2.5 leading-relaxed">{person.focus}</p>
            </li>
          ))}

          {/* Cierre de la retícula: convierte el hueco de la sexta celda en mensaje */}
          <li className="bg-[#0E0E0E] p-4 sm:p-5 lg:p-6 flex items-center">
            <p className="text-[#8A8A8A] text-sm leading-relaxed">
              Estas disciplinas trabajan juntas dentro del equipo que construye
              tu proyecto. Las decisiones técnicas, de diseño y de negocio se
              toman en la misma mesa, no entre proveedores que no se hablan.
            </p>
          </li>
        </ul>
      </div>
    </section>
  )
}
