import Image from "next/image"

const stats = [
  { value: "26 proyectos entregados", label: "100% de clientes satisfechos" },
  { value: "3 proyectos activos", label: "actualmente en desarrollo" },
]

// Ilustración de barras — decorativa, no son datos reales
const bars = [
  { h: "40%", label: "Mes 1" },
  { h: "55%", label: "Mes 2" },
  { h: "65%", label: "Mes 3" },
  { h: "80%", label: "Mes 4" },
  { h: "100%", label: "Mes 5" },
]

export default function Differentiators() {
  return (
    <section className="py-24 lg:py-32 bg-[#F5F5F5] snap-start">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Inner dark panel */}
        <div className="bg-[#0A0A0A] rounded-3xl p-12 lg:p-20 text-white relative overflow-hidden">
          {/* Subtle bg texture */}
          <Image
            src="/imgs/bg/bg-img.webp"
            alt=""
            aria-hidden="true"
            fill
            className="object-cover opacity-5 pointer-events-none select-none"
            sizes="100vw"
          />

          <div className="relative">
            {/* Eyebrow */}
            <span className="text-xs tracking-widest uppercase text-[#888] border border-[#333] px-3 py-1 inline-block">
              Por qué elegirnos
            </span>

            {/* Heading */}
            <h2 className="text-3xl lg:text-4xl font-bold mt-4 max-w-2xl leading-snug">
              Resultados medibles a través de un balance sólido entre estrategia y
              ejecución técnica.
            </h2>

            {/* 2-col grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-12">
              {/* Left: visual cards */}
              <div className="lg:col-span-5 space-y-4">
                {/* Card 1: mini bar chart ilustrativo */}
                <div className="bg-[#141414] rounded-2xl p-8 h-48 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm font-semibold">Estrategia</span>
                    <span className="w-2 h-2 rounded-full bg-[#4cfc0f]" />
                  </div>
                  {/* Bar chart ilustrativo */}
                  <div className="flex items-end gap-2 h-20" aria-label="Ilustración de crecimiento conceptual">
                    {bars.map((bar) => (
                      <div key={bar.label} className="flex flex-col items-center gap-1 flex-1">
                        <div
                          className="w-full bg-[#4cfc0f]/20 rounded-t relative"
                          style={{ height: bar.h }}
                        >
                          <div
                            className="absolute bottom-0 left-0 right-0 bg-[#4cfc0f] rounded-t"
                            style={{ height: "60%" }}
                          />
                        </div>
                        <span className="text-[8px] text-[#555]">{bar.label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[#555] text-[10px] mt-1 italic">Ilustración conceptual · no son datos reales</p>
                </div>

                {/* Card 2: quote con elemento decorativo */}
                <div className="bg-[#141414] rounded-2xl p-8 h-48 flex flex-col justify-between relative overflow-hidden">
                  {/* Large decorative quote mark */}
                  <span className="absolute -top-2 -left-1 text-[120px] font-bold text-[#4cfc0f]/10 leading-none select-none pointer-events-none" aria-hidden="true">
                    "
                  </span>
                  <div className="relative flex flex-col justify-between h-full">
                    <p className="italic text-[#888] text-sm leading-relaxed">
                      Las mejores experiencias digitales comienzan con una
                      conversación. Hablemos.
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                      <div className="h-px flex-1 bg-[#4cfc0f]/30" />
                      <span className="text-[#4cfc0f] text-xs font-semibold tracking-widest uppercase">users.mx</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: text + stats */}
              <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                <p className="text-[#888] text-sm leading-relaxed">
                  Combinamos visión de negocio con ejecución técnica de alto nivel
                  para entregar productos que funcionan — no solo se ven bien.
                </p>

                {/* Stat cards */}
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat) => (
                    <div key={stat.value} className="bg-[#141414] rounded-2xl p-8">
                      <p className="text-xl font-bold text-white leading-snug">{stat.value}</p>
                      <p className="text-[#888] text-xs mt-2">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Scene image */}
                <div className="rounded-xl overflow-hidden relative aspect-[16/7]">
                  <Image
                    src="/imgs/bg/img-100.webp"
                    alt="Equipo users.mx en sesión de trabajo"
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 700px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
