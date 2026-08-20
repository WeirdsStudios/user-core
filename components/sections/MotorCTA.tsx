import Link from "next/link"
import Image from "next/image"

/**
 * El Motor de Análisis es la puerta de entrada gratuita a trabajar con USERS,
 * así que esta sección tiene peso de bloque principal (fondo oscuro, ancho
 * completo) en vez de ser una card más.
 *
 * Cada punto describe algo que el flujo de /analisis realmente entrega —
 * diagnóstico, estimado por módulo y agenda — sin prometer de más.
 */
const steps = [
  {
    n: "01",
    title: "Cuéntanos de tu negocio",
    body: "Giro, tamaño, cómo consigues clientes y qué te está costando trabajo hoy.",
  },
  {
    n: "02",
    title: "Recibes un diagnóstico",
    body: "Qué te falta, qué conviene resolver primero y qué puede esperar.",
  },
  {
    n: "03",
    title: "Y un estimado real",
    body: "Rango de inversión desglosado por módulo y tiempo aproximado de entrega.",
  },
]

export default function MotorCTA() {
  return (
    <section id="analisis" className="bg-[#0A0A0A] text-white py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 lg:items-center">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-[#4cfc0f] border border-[#4cfc0f]/30 px-3 py-1.5">
              Gratis · sin compromiso
            </span>

            <h2 className="text-[1.6rem] sm:text-3xl lg:text-[2.75rem] font-bold leading-[1.15] mt-4 lg:mt-6 text-balance tracking-tight">
              La forma más fácil de empezar con USERS
            </h2>

            <p className="text-[#A0A0A0] text-base lg:text-lg mt-5 leading-relaxed max-w-xl">
              Nuestro Motor de Análisis hace las preguntas que haríamos en una
              primera reunión y te devuelve un punto de partida concreto. Sin
              hablar con nadie hasta que tú quieras.
            </p>

            <ol className="mt-9 space-y-5">
              {steps.map((step) => (
                <li key={step.n} className="flex gap-4">
                  <span className="text-[11px] font-mono tnum text-[#4cfc0f] pt-1 shrink-0">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="text-white text-sm font-bold">{step.title}</h3>
                    <p className="text-[#888] text-sm mt-1 leading-relaxed">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10">
              <Link
                href="/analisis"
                className="group bg-[#4cfc0f] text-black font-bold px-8 py-4 text-base inline-flex items-center gap-3 transition-all hover:shadow-[0_0_28px_rgba(76,252,15,0.35)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Analizar mi negocio gratis
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
              </Link>
              {/* "Unos 8 minutos" no está medido con nadie: era una
                  estimación escrita a mano. Lo que sí es verificable es la
                  estructura —6 pasos, 20 preguntas, casi todas de opción— y
                  eso es lo que se promete. Cuando haya datos reales de
                  finalización se puede volver a poner un número. */}
              <p className="text-xs text-[#8A8A8A] mt-4">
                6 pasos · 20 preguntas, casi todas de opción múltiple · sin
                registro ni tarjeta
              </p>
            </div>
          </div>

          {/* Vista del reporte que entrega el motor */}
          <div className="lg:col-span-6 mt-12 lg:mt-0">
            <div className="rounded-lg overflow-hidden border border-[#2A2A2A] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)]">
              <div className="bg-[#1A1A1A] px-3 py-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                <span className="w-2 h-2 rounded-full bg-[#28C840]" />
                <span className="text-[#8A8A8A] text-[10px] ml-2 truncate">users.mx/analisis</span>
              </div>
              <Image
                src="/imgs/portfolio/motor-analisis.webp"
                alt="Reporte del Motor de Análisis con diagnóstico y estimado de inversión"
                width={1280}
                height={720}
                className="w-full block"
                sizes="(max-width: 1024px) 100vw, 620px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
