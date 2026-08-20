import Link from "next/link"
import { siteConfig } from "@/lib/site-config"
import { getWhatsAppLink } from "@/lib/whatsapp"

/**
 * Postventa: una narrativa, tres caminos.
 *
 * PROBLEMA QUE RESUELVE ESTA VERSIÓN
 * Antes todo esto vivía mezclado: el Centro de Atención, los planes de
 * seguimiento y los cambios fuera de plan se leían como una sola cosa difusa,
 * y había que leer el cuerpo de cada tarjeta para entender en qué se
 * diferenciaban. Tres tarjetas iguales no comunican tres servicios distintos.
 *
 * CÓMO SE DISTINGUEN AHORA
 *   1. El Centro va primero y con más peso: borde verde, marcas de esquina,
 *      un indicador de disponibilidad. Es el servicio inmediato.
 *   2. Seguimiento lleva precio visible. El precio es lo que lo identifica.
 *   3. Cambios y evolución es la salida cuando algo se sale de lo anterior.
 *      Sin precio, porque depende del alcance.
 * Cada uno lleva su índice, su etiqueta de tipo y un CTA distinto. En móvil
 * se apilan y se siguen distinguiendo por peso visual, no por leerlos.
 *
 * NO SE LLAMA "COTIZADOR" al tercero a propósito: USERS vende cotizadores
 * digitales como producto, y usar la misma palabra para dos cosas distintas
 * dentro de la misma página confunde.
 */
export default function CentroAtencion() {
  const { supportHours, supportDaysLabel } = siteConfig.contact
  const [planSitio, planSistemas] = siteConfig.maintenancePlans

  return (
    <section
      id="soporte"
      aria-labelledby="soporte-titulo"
      className="bg-[#0A0A0A] text-white py-12 lg:py-20 border-t border-[#1A1A1A]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#4cfc0f]">
            Después del lanzamiento
          </span>
          <h2
            id="soporte-titulo"
            className="text-[1.6rem] sm:text-3xl lg:text-[2.5rem] font-bold leading-[1.15] mt-3 text-balance tracking-tight"
          >
            Después de publicar, seguimos ahí
          </h2>
          <p className="text-[#B0B0B0] text-[15px] lg:text-lg mt-4 leading-relaxed">
            Tres caminos distintos, según lo que necesites: atención,
            acompañamiento o un cambio nuevo.
          </p>
        </div>

        <div className="mt-8 lg:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* ── 1. Centro de Atención — el servicio inmediato ── */}
          <article className="lg:col-span-5 relative corner-marks border border-[#4cfc0f]/40 bg-[#0E0E0E] p-5 lg:p-6 flex flex-col">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#4cfc0f]">
                01 · Centro de Atención USERS
              </p>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] bg-[#4cfc0f] text-black px-2 py-1 shrink-0">
                24/7
              </span>
            </div>

            <h3 className="text-lg lg:text-xl font-bold mt-3 tracking-tight">
              Atención a cualquier hora
            </h3>
            <p className="text-[#B0B0B0] text-sm mt-2.5 leading-relaxed">
              Para dudas, orientación, ajustes y problemas de tus proyectos
              USERS.
            </p>

            <dl className="mt-5 space-y-4 flex-1">
              <div>
                <dt className="flex items-center gap-2 text-sm font-semibold text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4cfc0f]" aria-hidden="true" />
                  Centro automatizado · siempre
                </dt>
                <dd className="text-[#8A8A8A] text-[13px] mt-1.5 leading-relaxed pl-3.5">
                  Responde preguntas, orienta, ayuda a diagnosticar, recoge el
                  contexto y deja preparada tu solicitud.
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-sm font-semibold text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6A6A6A]" aria-hidden="true" />
                  Especialista USERS · con horario
                </dt>
                <dd className="text-[#8A8A8A] text-[13px] mt-1.5 leading-relaxed pl-3.5">
                  {supportDaysLabel}, {supportHours.from}–{supportHours.to} h,
                  hora del centro de México. Fuera de ese horario tu solicitud
                  queda registrada.
                </dd>
              </div>
            </dl>

            <Link
              href="/centro-de-atencion"
              className="bg-[#4cfc0f] text-black font-bold px-5 py-3.5 text-sm inline-flex items-center justify-center gap-2.5 mt-6 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Abrir Centro de Atención
              <span aria-hidden="true">→</span>
            </Link>
          </article>

          {/* ── 2. Planes de seguimiento — se identifica por el precio ── */}
          <article className="lg:col-span-4 border border-[#242424] bg-[#0E0E0E] p-5 lg:p-6 flex flex-col">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8A8A8A]">
              02 · Planes de seguimiento
            </p>
            <h3 className="text-lg lg:text-xl font-bold mt-3 tracking-tight">
              Mantén tu proyecto acompañado
            </h3>
            <p className="text-[#B0B0B0] text-sm mt-2.5 leading-relaxed">
              Mensual, opcional y sin contrato forzoso.
            </p>

            <ul className="mt-5 space-y-2.5 flex-1">
              {[planSitio, planSistemas].map((plan) => (
                <li
                  key={plan.id}
                  className="flex items-baseline justify-between gap-3 border-b border-[#1F1F1F] pb-2.5"
                >
                  <span className="text-sm text-white">{plan.name}</span>
                  <span className="flex items-baseline gap-1 shrink-0">
                    {plan.isFrom && (
                      <span className="font-mono text-[10px] text-[#8A8A8A]">Desde</span>
                    )}
                    <span className="text-base font-bold tnum">
                      ${plan.price.toLocaleString("en-US")}
                    </span>
                    <span className="font-mono text-[10px] text-[#8A8A8A]">
                      {plan.priceNote}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-[#8A8A8A] text-xs mt-3 leading-relaxed">
              Dependiendo de las necesidades del proyecto. Según alcance puede
              incluir infraestructura, monitoreo, respaldos, actualizaciones,
              soporte y ajustes evolutivos.
            </p>

            <Link
              href="/ayuda#despues"
              className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-white border-b-2 border-[#4cfc0f] pb-2 pt-2 self-start transition-colors hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
            >
              Conocer el seguimiento
              <span aria-hidden="true">→</span>
            </Link>
          </article>

          {/* ── 3. Cambios y evolución — la salida para lo que no entra ── */}
          <article className="lg:col-span-3 border border-[#242424] bg-[#0A0A0A] p-5 lg:p-6 flex flex-col">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8A8A8A]">
              03 · Cambios y evolución
            </p>
            <h3 className="text-lg lg:text-xl font-bold mt-3 tracking-tight">
              ¿Algo nuevo?
            </h3>
            <p className="text-[#B0B0B0] text-sm mt-2.5 leading-relaxed flex-1">
              Una sección, una integración o una funcionalidad que se sale del
              seguimiento habitual. Se cotiza aparte, según alcance.
            </p>

            {/* Va a WhatsApp y no al Motor: quien ya es cliente sabe lo que
                necesita y hacerle responder un diagnóstico de negocio otra vez
                sería fricción sin propósito. */}
            <a
              href={getWhatsAppLink("soporte")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-white border-b-2 border-[#4cfc0f] pb-2 pt-2 self-start transition-colors hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
            >
              Cotizar un ajuste
              <span aria-hidden="true">→</span>
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}
