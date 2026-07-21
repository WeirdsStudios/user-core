import Link from "next/link"
import BrowserFrame from "@/components/ui/BrowserFrame"

const features = [
  "Análisis gratuito de tu situación digital actual",
  "Reporte visual con métricas y proyección de impacto",
  "Estimado de inversión sin compromiso ni presión",
  "Sesión de estrategia agendada dentro del mismo flujo",
]

export default function MotorCTA() {
  return (
    <section className="py-24 lg:py-32 bg-white snap-start">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
          {/* Left: browser mockup showing the analysis tool */}
          <div className="mb-12 lg:mb-0">
            <BrowserFrame
              screenshotSrc="/imgs/portfolio/sec-3-project-3.webp"
              screenshotAlt="Motor de Análisis — reporte visual de tu negocio"
              urlLabel="users.mx/analisis"
            />

            {/* Mini stats below the mockup */}
            <div className="flex gap-6 mt-6 px-1">
              <div>
                <p className="text-2xl font-bold text-[#0A0A0A]">6</p>
                <p className="text-xs text-[#888] mt-0.5">pasos de análisis</p>
              </div>
              <div className="w-px bg-[#E5E5E5]" />
              <div>
                <p className="text-2xl font-bold text-[#0A0A0A]">~8 min</p>
                <p className="text-xs text-[#888] mt-0.5">para completarlo</p>
              </div>
              <div className="w-px bg-[#E5E5E5]" />
              <div>
                <p className="text-2xl font-bold text-[#4cfc0f]">gratis</p>
                <p className="text-xs text-[#888] mt-0.5">sin compromiso</p>
              </div>
            </div>
          </div>

          {/* Right: content */}
          <div className="pt-0 lg:pt-2">
            <span className="text-xs tracking-widest uppercase text-[#888] border border-[#E5E5E5] px-3 py-1 inline-block mb-6">
              Motor de Análisis de Negocio
            </span>

            <h2 className="text-2xl lg:text-3xl font-bold leading-snug text-[#0A0A0A]">
              ¿Qué tan lejos está tu negocio de tener una presencia digital real
              que genere clientes?
            </h2>

            <ul className="mt-8 space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="text-[#4cfc0f] font-bold text-lg leading-tight shrink-0">
                    +
                  </span>
                  <span className="text-sm text-[#444] leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-xs text-[#888] mt-4">
              Proyectos desde{" "}
              <strong className="text-[#0A0A0A]">$15,000 MXN</strong>
            </p>

            {/* Primary CTA — distintivo, más grande que un botón común */}
            <div className="mt-8">
              <Link
                href="/analisis"
                className="group bg-[#4cfc0f] text-black font-bold px-8 py-5 text-base inline-flex items-center gap-3 transition-all hover:gap-4 hover:shadow-[0_0_24px_rgba(76,252,15,0.35)] active:scale-[0.98]"
              >
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-40" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black" />
                </span>
                Analiza tu negocio gratis
                <span className="text-lg transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
              </Link>
              <p className="text-xs text-[#888] mt-3">Sin registro · Sin tarjeta de crédito</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
