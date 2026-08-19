import Link from "next/link"
import { siteConfig } from "@/lib/site-config"
import { getEntry } from "@/lib/knowledge-base"
import { getWhatsAppLink } from "@/lib/whatsapp"

/**
 * Fusiona lo que antes eran dos secciones —Seguimiento y Centro de Atención—
 * en una sola narrativa: "después de publicar, seguimos ahí". Separadas
 * ocupaban el doble y contaban dos veces la misma promesa.
 *
 * Lo que se vende no es "tenemos un chatbot": es que el proyecto no queda solo
 * cuando termina. El Centro automatizado responde siempre; la persona atiende
 * dentro de un horario declarado. No prometemos atención humana 24/7.
 *
 * La demo usa respuestas reales de la base de conocimiento (lib/knowledge-base)
 * — es una transcripción de ejemplo, no un chat. El Centro funcional vive en
 * /centro-de-atencion y en el widget global.
 */
/** Demo: pregunta real de la KB + su respuesta real, sin inventar políticas. */
const DEMO_SELF = getEntry("cambiar-imagen")
const DEMO_ESCALATE = getEntry("algo-dejo-de-funcionar")

export default function CentroAtencion() {
  const { supportHours, supportDaysLabel } = siteConfig.contact

  return (
    <section
      id="soporte"
      aria-labelledby="soporte-titulo"
      className="bg-[#0A0A0A] text-white py-12 lg:py-20 border-t border-[#1A1A1A]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#4cfc0f]">
            Centro de Atención USERS
          </span>
          <h2
            id="soporte-titulo"
            className="text-[1.6rem] sm:text-3xl lg:text-[2.5rem] font-bold leading-[1.15] mt-3 text-balance tracking-tight"
          >
            Después de publicar, seguimos ahí
          </h2>
          <p className="text-[#B0B0B0] text-[15px] lg:text-lg mt-4 leading-relaxed">
            Atención para tu sitio y tus proyectos cuando la necesites — no solo
            durante el desarrollo.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-10 mt-8 lg:mt-12">
          {/* ── Cómo funciona la atención ── */}
          <div className="lg:col-span-5">
            <ul className="space-y-4">
              <li className="border border-[#4cfc0f]/40 bg-[#0E0E0E] p-4 lg:p-5 relative corner-marks">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#4cfc0f]">
                  Centro automatizado · 24/7
                </p>
                <p className="text-[#B0B0B0] text-sm mt-3 leading-relaxed">
                  Resuelve dudas, orienta ajustes de contenido y ayuda a
                  diagnosticar un problema a cualquier hora, con la información
                  de nuestra Central de Ayuda.
                </p>
              </li>
              <li className="border border-[#222] bg-[#0E0E0E] p-4 lg:p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A8A8A]">
                  Especialista USERS
                </p>
                <p className="text-[#B0B0B0] text-sm mt-3 leading-relaxed">
                  Cuando la solicitud necesita criterio, acceso o cotización, se
                  escala a una persona del equipo.
                </p>
                <p className="font-mono text-[11px] text-[#8A8A8A] mt-4 pt-4 border-t border-[#1F1F1F] leading-relaxed">
                  {supportDaysLabel} · {supportHours.from}–{supportHours.to} h
                  <br />
                  <span className="text-[#8A8A8A]">Hora del centro de México</span>
                </p>
              </li>
            </ul>

          </div>

          {/* ── Demo de conversación ── */}
          <div className="lg:col-span-7 mt-8 lg:mt-0">
            <div className="border border-[#222] bg-[#0E0E0E]">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1F1F1F]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4cfc0f]" aria-hidden="true" />
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A8A8A]">
                  Centro de Atención · ejemplo
                </span>
              </div>

              {/* No es un chat funcional: es una transcripción de ejemplo.
                  Sin controles falsos ni roles ARIA que sugieran interacción. */}
              <ol className="p-4 space-y-2.5">
                <li className="flex justify-end">
                  <p className="bg-[#1A1A1A] text-white text-sm px-4 py-2.5 max-w-[80%] leading-relaxed">
                    {DEMO_SELF?.question ?? "Quiero cambiar una imagen de mi sitio"}
                  </p>
                </li>
                <li className="flex justify-start">
                  <p className="border border-[#4cfc0f]/30 bg-[#0A0A0A] text-[#B0B0B0] text-sm px-4 py-2.5 max-w-[85%] leading-relaxed">
                    {DEMO_SELF?.answer}
                  </p>
                </li>

                <li className="flex justify-end pt-2">
                  <p className="bg-[#1A1A1A] text-white text-sm px-4 py-2.5 max-w-[80%] leading-relaxed">
                    {DEMO_ESCALATE?.question ?? "Algo dejó de funcionar"}
                  </p>
                </li>

                {/* El escalamiento, explícito */}
                <li className="flex items-center gap-3 pt-3 mt-1 border-t border-[#1F1F1F]">
                  <span
                    className="font-mono text-[9px] uppercase tracking-[0.14em] bg-[#4cfc0f] text-black px-2 py-1 shrink-0"
                    aria-hidden="true"
                  >
                    Escala
                  </span>
                  <p className="font-mono text-[11px] text-[#8A8A8A] leading-relaxed">
                    Solicitud especializada → especialista USERS
                  </p>
                </li>
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4">
              <Link
                href="/centro-de-atencion"
                className="bg-[#4cfc0f] text-black font-bold px-6 py-3.5 text-sm inline-flex items-center justify-center gap-2.5 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Abrir el Centro de Atención
                <span aria-hidden="true">→</span>
              </Link>
              <p className="font-mono text-[10px] text-[#8A8A8A] leading-relaxed">
                Ejemplo con respuestas reales de la Central de Ayuda.
              </p>
            </div>
          </div>
        </div>

        {/* ── Planes de seguimiento, compactos ── */}
        <div className="mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-[#1A1A1A]">
          <div className="lg:grid lg:grid-cols-12 lg:gap-10 lg:items-start">
            <div className="lg:col-span-4">
              <h3 className="text-lg lg:text-xl font-bold tracking-tight">
                Planes de seguimiento
              </h3>
              <p className="text-[#8A8A8A] text-sm mt-2.5 leading-relaxed">
                Todos los proyectos incluyen soporte el primer mes. Después es
                opcional y sin contrato forzoso.
              </p>
              <Link
                href="/analisis"
                className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-white border-b-2 border-[#4cfc0f] pb-2 pt-2 transition-colors hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
              >
                Cotizar seguimiento
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <ul className="lg:col-span-8 mt-6 lg:mt-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {siteConfig.maintenancePlans.map((plan) => (
                <li key={plan.id} className="border border-[#222] bg-[#0E0E0E] p-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A8A8A]">
                      {plan.name}
                    </p>
                    <p className="flex items-baseline gap-1">
                      {plan.isFrom && (
                        <span className="font-mono text-[10px] text-[#8A8A8A]">Desde</span>
                      )}
                      <span className="text-xl font-bold tnum">
                        ${plan.price.toLocaleString("en-US")}
                      </span>
                      <span className="font-mono text-[10px] text-[#8A8A8A]">
                        {plan.priceNote}
                      </span>
                    </p>
                  </div>
                  <p className="text-[#B0B0B0] text-[13px] mt-2 leading-relaxed">
                    {plan.forWhat}
                  </p>
                  <p className="text-[#8A8A8A] text-xs mt-3 pt-3 border-t border-[#1F1F1F] leading-relaxed">
                    {plan.isFrom
                      ? "Según las necesidades del proyecto"
                      : `${plan.features.length} servicios incluidos`}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Link
              href="/ayuda"
              className="border border-[#2E2E2E] text-white font-semibold px-6 py-3.5 text-sm inline-flex items-center justify-center gap-2.5 transition-colors hover:border-[#4cfc0f] hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cfc0f]"
            >
              Ver la Central de Ayuda
            </Link>
            <a
              href={getWhatsAppLink("soporte")}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#2E2E2E] text-white font-semibold px-6 py-3.5 text-sm inline-flex items-center justify-center gap-2.5 transition-colors hover:border-[#4cfc0f] hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cfc0f]"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
