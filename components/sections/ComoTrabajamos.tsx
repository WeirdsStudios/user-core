/**
 * Fusiona tres secciones que en la Fase 3 vivían separadas y repetían ideas:
 * Proceso (5 pasos), Diferenciadores (4 decisiones) y Capacidades (5
 * disciplinas). Juntas ocupaban ~2.640 px en móvil para decir tres veces
 * "entendemos el negocio antes de construir".
 *
 * Ahora el proceso lleva el peso —es lo que el cliente realmente quiere saber:
 * qué va a pasar— y las disciplinas quedan como una tira de apoyo al final.
 */
const pasos = [
  {
    n: "1",
    title: "Entendemos",
    body: "Hablamos de tu negocio y tu operación antes de proponer nada. Si una funcionalidad no resuelve un problema concreto, no entra.",
    you: "Nos cuentas cómo trabajas hoy",
  },
  {
    n: "2",
    title: "Diseñamos",
    body: "Definimos estructura y flujo, y te lo mostramos antes de programar. Cambiar un diseño toma horas; cambiar un sistema construido toma semanas.",
    you: "Revisas y ajustamos",
  },
  {
    n: "3",
    title: "Construimos",
    body: "Desarrollamos por partes, con avances visibles, para que no pierdas el hilo del proyecto.",
    you: "Ves el proyecto tomando forma",
  },
  {
    n: "4",
    title: "Lanzamos",
    body: "Publicamos, configuramos dominio y hosting, y te enseñamos a usarlo.",
    you: "Apruebas antes del pago final",
  },
  {
    n: "5",
    title: "Seguimos",
    body: "Medimos qué funciona y ajustamos. Puede crecer después: lo que hoy es un sitio puede sumar reservas, administración o convertirse en plataforma.",
    you: "Decides si quieres continuidad",
  },
]

const disciplinas = [
  "Estrategia de negocio",
  "Diseño de producto y UX",
  "Desarrollo web y de software",
  "Cloud y redes",
  "Identidad visual",
  "SEO y medición",
]

export default function ComoTrabajamos() {
  return (
    <section
      id="proceso"
      aria-labelledby="proceso-titulo"
      className="bg-white py-12 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#0A0A0A]/50">
            Cómo trabajamos
          </span>
          <h2
            id="proceso-titulo"
            className="text-[1.6rem] sm:text-3xl lg:text-[2.5rem] font-bold text-[#0A0A0A] leading-[1.15] mt-3 text-balance tracking-tight"
          >
            Qué pasa si trabajas con nosotros
          </h2>
        </div>

        <ol className="mt-6 lg:mt-10 border-t border-[#E5E5E5] max-w-4xl">
          {pasos.map((paso) => (
            <li
              key={paso.n}
              className="border-b border-[#E5E5E5] py-4 lg:py-5 grid grid-cols-[1.5rem_1fr] lg:grid-cols-[1.5rem_9rem_1fr] gap-x-4 lg:gap-x-6 gap-y-1.5 items-baseline"
            >
              <span className="font-mono text-[11px] tnum text-[#4cfc0f] font-bold bg-[#0A0A0A] w-6 h-6 flex items-center justify-center shrink-0">{paso.n}</span>
              <h3 className="text-base lg:text-lg font-bold text-[#0A0A0A]">{paso.title}</h3>
              <div className="col-start-2 lg:col-start-3">
                <p className="text-[#555] text-sm leading-relaxed max-w-prose">{paso.body}</p>
                <p className="text-[#6B6B6B] text-xs leading-relaxed mt-1.5">
                  <span className="text-[#1F7A00]" aria-hidden="true">·</span> {paso.you}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* Disciplinas: apoyo, no protagonista */}
        <div className="mt-8 lg:mt-12 max-w-4xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6B6B6B]">
            Lo que entra en cada proyecto, según lo que necesite
          </p>
          <ul className="flex flex-wrap gap-1.5 mt-3">
            {disciplinas.map((d) => (
              <li
                key={d}
                className="font-mono text-[10px] text-[#555] border border-[#E3E3DF] px-2 py-1.5"
              >
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
