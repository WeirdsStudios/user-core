import Link from "next/link"

const services = [
  { number: "01", name: "Estrategia de Negocio" },
  { number: "02", name: "Diseño de Producto & UX" },
  { number: "03", name: "Desarrollo Web & Aplicaciones" },
  { number: "04", name: "Sistemas de Administración" },
  { number: "05", name: "Identidad Visual & Marca" },
  { number: "06", name: "Crecimiento & Marketing Digital" },
]

export default function Services() {
  return (
    <section id="servicios" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top row */}
        <div className="flex items-center justify-between mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#888]">
            Nuestros Servicios
          </p>
          <span className="text-sm text-[#888] underline">Desde 2020</span>
        </div>

        {/* 2-col layout */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          {/* Left sticky */}
          <div className="lg:col-span-4 mb-12 lg:mb-0">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <p className="text-8xl font-bold text-[#0A0A0A] leading-none">6+</p>
              <p className="text-sm text-[#888] mt-2">Servicios especializados</p>
            </div>
          </div>

          {/* Right: service list */}
          <div className="lg:col-span-8">
            {services.map((service) => (
              <div
                key={service.number}
                className="flex justify-between items-center py-6 border-b border-[#E5E5E5] group cursor-default"
              >
                <span className="text-xs font-mono text-[#888] w-8 shrink-0">
                  {service.number}
                </span>
                <span className="text-xl lg:text-2xl font-semibold flex-1 ml-6 transition-transform duration-200 group-hover:translate-x-2">
                  {service.name}
                </span>
                <span className="text-[#4cfc0f] opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-lg">
                  →
                </span>
              </div>
            ))}

            {/* CTA below list */}
            <div className="mt-8">
              <Link
                href="/analisis"
                className="text-sm font-semibold underline text-[#0A0A0A] hover:text-[#888] transition-colors"
              >
                Solicitar cotización →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
