import Link from "next/link"

const features = [
  "Análisis gratuito de tu situación digital actual",
  "Reporte visual con métricas y proyección de impacto",
  "Estimado de inversión sin compromiso ni presión",
  "Sesión de estrategia agendada dentro del mismo flujo",
]

export default function MotorCTA() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left: dark visual placeholder */}
          <div className="bg-[#0A0A0A] rounded-2xl min-h-[480px] flex flex-col items-center justify-center mb-12 lg:mb-0 p-12">
            <p className="text-[#C5F82A] text-2xl font-bold tracking-wide text-center leading-tight">
              Motor de
              <br />
              Análisis
            </p>
            <p className="text-[#888] text-sm mt-2 text-center">
              Reporte personalizado de tu negocio
            </p>
          </div>

          {/* Right: content */}
          <div>
            <p className="text-xs tracking-widest uppercase text-[#888] mb-4">
              Motor de Análisis de Negocio →
            </p>

            <h2 className="text-2xl lg:text-3xl font-bold leading-snug text-[#0A0A0A]">
              ¿Qué tan lejos está tu negocio de tener una presencia digital real
              que genere clientes?
            </h2>

            <ul className="mt-8 space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="text-[#C5F82A] font-bold text-lg leading-tight shrink-0">
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

            <Link
              href="/analisis"
              className="bg-[#C5F82A] text-black font-bold px-8 py-4 text-base mt-8 inline-block transition-opacity hover:opacity-90"
            >
              Analiza tu negocio gratis
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
