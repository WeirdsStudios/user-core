import Link from "next/link"

export default function Hero() {
  return (
    <section className="bg-[#0A0A0A] min-h-screen flex flex-col justify-between pt-20 lg:pt-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col flex-1 justify-center py-16 lg:py-24">
        {/* Eyebrow */}
        <div className="mb-10">
          <span className="text-xs tracking-widest uppercase text-[#888] border border-[#333] px-3 py-1 inline-block">
            Desarrollo Web &amp; Consultoría de Negocio
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-4xl">
          Construimos productos digitales que generan resultados reales para tu
          negocio
        </h1>

        {/* Subheadline */}
        <p className="text-[#888] text-lg mt-6 max-w-xl leading-relaxed">
          Estrategia de negocio, diseño de producto y desarrollo técnico — en un
          solo equipo.
        </p>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <Link
            href="/analisis"
            className="bg-[#C5F82A] text-black font-semibold px-8 py-4 text-base inline-flex items-center justify-center transition-opacity hover:opacity-90"
          >
            Analiza tu negocio gratis
          </Link>
          <a
            href="#trabajo"
            className="border border-white text-white px-8 py-4 text-base inline-flex items-center justify-center transition-colors hover:bg-white hover:text-[#0A0A0A]"
          >
            Ver nuestro trabajo
          </a>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="border-t border-[#1F1F1F] pt-8 pb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {["Estrategia", "Diseño", "Desarrollo", "Crecimiento"].map(
              (tag, index, arr) => (
                <span key={tag} className="text-[#888] text-sm flex items-center gap-4">
                  {tag}
                  {index < arr.length - 1 && (
                    <span className="text-[#333] ml-0">·</span>
                  )}
                </span>
              )
            )}
          </div>
          <span className="text-[#888] text-sm whitespace-nowrap">
            Proyectos desde $15,000 MXN
          </span>
        </div>
      </div>
    </section>
  )
}
