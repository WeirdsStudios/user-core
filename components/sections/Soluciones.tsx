import Link from "next/link"
import { solutionsByArea, type SolutionArea } from "@/lib/solutions"

/**
 * Las tres familias de solución, escritas desde el problema del cliente y no
 * desde nuestras disciplinas internas. Un dueño de negocio no busca "UX":
 * busca vender, dejar de operar en Excel, o que sus clientes puedan reservar.
 *
 * Se mantiene como resumen: el detalle de cada solución vive en
 * /soluciones/[slug]. Aquí solo se abre la puerta.
 */
const areas = [
  {
    id: "presencia",
    number: "01",
    name: "Presencia digital",
    promise: "Para que te encuentren, te entiendan y te compren.",
    body:
      "El lugar al que llega quien te buscó en Google o recibió tu tarjeta. Construido para explicar el negocio y generar contacto, no solo para verse bien.",
    items: ["Tiendas en línea", "Landing pages", "Catálogos", "SEO"],
  },
  {
    id: "operacion",
    number: "02",
    name: "Operación",
    promise: "Para dejar de administrar el negocio en Excel y WhatsApp.",
    body:
      "El sistema que usas por dentro: clientes, cobros, inventario y sucursales, con permisos distintos según el puesto.",
    items: ["Dashboards", "CRM", "Roles y permisos", "Multisucursal"],
  },
  {
    id: "clientes",
    number: "03",
    name: "Clientes",
    promise: "Para que tus clientes resuelvan solos lo que hoy te preguntan.",
    body:
      "Reservar, cotizar, pagar o consultar su cuenta sin que alguien conteste un mensaje.",
    items: ["Reservas y citas", "Reservas por WhatsApp", "Pagos en línea"],
  },
]

export default function Soluciones() {
  return (
    <section id="soluciones" className="bg-[#F7F7F5] py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#0A0A0A]/50">
            Qué construimos
          </span>
          <h2 className="text-[1.6rem] sm:text-3xl lg:text-[2.75rem] font-bold text-[#0A0A0A] leading-[1.15] mt-3 lg:mt-4 text-balance tracking-tight">
            Tres frentes del mismo negocio digital
          </h2>
          {/* Absorbe la idea de la antigua sección "Progresión": no hay que
              construirlo todo de una vez. */}
          <p className="text-[#555] text-[15px] lg:text-lg mt-4 lg:mt-5 leading-relaxed">
            Puedes empezar por uno solo y sumar los otros cuando el negocio lo
            pida, sin tirar lo anterior. Greek Gym recorrió los tres.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mt-6 lg:mt-10">
          {areas.map((area) => (
            <article
              key={area.id}
              className="group relative bg-white border border-[#E3E3DF] p-5 lg:p-6 flex flex-col transition-colors hover:border-[#0A0A0A]"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] tnum text-[#4cfc0f] font-bold bg-[#0A0A0A] px-1.5 py-0.5">
                  {area.number}
                </span>
                <span
                  className="h-px flex-1 bg-[#E3E3DF] group-hover:bg-[#0A0A0A] transition-colors"
                  aria-hidden="true"
                />
              </div>

              <h3 className="text-xl lg:text-2xl font-bold text-[#0A0A0A] mt-4 tracking-tight">
                {area.name}
              </h3>
              <p className="text-[#0A0A0A] text-sm font-semibold mt-2 leading-snug">
                {area.promise}
              </p>
              <p className="text-[#666] text-sm mt-3 leading-relaxed flex-1">{area.body}</p>

              {/* Las soluciones con página propia se enlazan; el resto queda
                  como descriptor de alcance. */}
              <ul className="flex flex-wrap gap-1.5 mt-5 pt-5 border-t border-[#EFEFEB]">
                {solutionsByArea(area.id as SolutionArea).map((solution) => (
                  <li key={solution.slug}>
                    <Link
                      href={`/soluciones/${solution.slug}`}
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#0A0A0A] border border-[#0A0A0A] px-2 py-1.5 transition-colors hover:bg-[#0A0A0A] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
                    >
                      {solution.name}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
                {area.items.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-[10px] text-[#555] border border-[#E3E3DF] px-2 py-1.5"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <Link
          href="/soluciones"
          className="inline-flex items-center gap-2 mt-8 lg:mt-10 text-sm font-semibold text-[#0A0A0A] border-b-2 border-[#4cfc0f] pb-2 pt-2 transition-colors hover:text-[#4a4a4a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0A0A0A]"
        >
          Ver todas las soluciones
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}
