import Link from "next/link"
import { siteConfig } from "@/lib/site-config"

/**
 * Continuidad después del proyecto, no el producto principal: va al final y
 * con peso visual contenido.
 *
 * El plan de Sistemas se enuncia como "desde" y las condiciones como lo que
 * *puede incluir* según alcance. No se prometen tiempos de respuesta, horas
 * incluidas ni frecuencia de respaldo porque esas condiciones todavía no están
 * definidas comercialmente — anunciarlas sería vender algo que no podemos
 * sostener por escrito.
 */
export default function Mantenimiento() {
  return (
    <section
      id="seguimiento"
      aria-labelledby="seguimiento-titulo"
      className="bg-[#0A0A0A] text-white py-14 lg:py-20 border-t border-[#1A1A1A]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
          <div className="lg:col-span-4">
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#4cfc0f]">
              Después del lanzamiento
            </span>
            <h2
              id="seguimiento-titulo"
              className="text-[1.5rem] sm:text-2xl lg:text-3xl font-bold leading-tight mt-3 tracking-tight"
            >
              Si quieres que sigamos al pendiente
            </h2>
            <p className="text-[#8E8E8E] text-sm mt-4 leading-relaxed">
              Todos los proyectos incluyen soporte el primer mes. Después es
              opcional y sin contrato forzoso.
            </p>
            <Link
              href="/analisis"
              className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-white border-b-2 border-[#4cfc0f] pb-2 pt-2 transition-colors hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
            >
              Cotizar seguimiento
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <ul className="lg:col-span-8 mt-8 lg:mt-0 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
            {siteConfig.maintenancePlans.map((plan) => (
              <li
                key={plan.id}
                className={`p-5 lg:p-6 flex flex-col border ${
                  plan.highlight ? "border-[#4cfc0f]/40 bg-[#0E0E0E]" : "border-[#222] bg-[#0E0E0E]"
                }`}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A8A8A]">
                  {plan.name}
                </p>
                <p className="text-[#8E8E8E] text-[13px] mt-1.5 leading-relaxed">{plan.forWhat}</p>

                <p className="flex items-baseline gap-1.5 mt-4 mb-4 flex-wrap">
                  {plan.isFrom && (
                    <span className="font-mono text-[11px] text-[#8A8A8A]">Desde</span>
                  )}
                  <span className="text-2xl lg:text-3xl font-bold tnum">
                    ${plan.price.toLocaleString("en-US")}
                  </span>
                  <span className="font-mono text-[11px] text-[#8A8A8A]">{plan.priceNote}</span>
                </p>
                {plan.isFrom && (
                  <p className="text-[#8A8A8A] text-xs -mt-2 mb-4 leading-relaxed">
                    Dependiendo de las necesidades del proyecto.
                  </p>
                )}

                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#8A8A8A] mb-2.5">
                  {plan.isFrom ? "Según alcance puede incluir" : "Incluye"}
                </p>
                <ul className="space-y-2 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <span
                        className="text-[#4cfc0f] font-mono text-xs leading-tight shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        +
                      </span>
                      <span className="text-[13px] leading-relaxed text-[#A8A8A8]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <p className="font-mono text-[11px] text-[#8A8A8A] mt-8 pt-6 border-t border-[#1A1A1A]">
          El costo final depende de la infraestructura, el alcance y el nivel de
          soporte que necesite cada proyecto.
        </p>
      </div>
    </section>
  )
}
