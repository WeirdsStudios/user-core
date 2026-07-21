interface Stat {
  value: string
  label: string
}

const stats: Stat[] = [
  { value: "12+", label: "Proyectos entregados" },
  { value: "98%", label: "Clientes satisfechos" },
]

export default function Differentiators() {
  return (
    <section className="py-24 lg:py-32 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Inner dark panel */}
        <div className="bg-[#0A0A0A] rounded-3xl p-12 lg:p-20 text-white">
          {/* Eyebrow */}
          <p className="text-xs tracking-widest uppercase text-[#888]">
            Por qué elegirnos
          </p>

          {/* Heading */}
          <h2 className="text-3xl lg:text-4xl font-bold mt-4 max-w-2xl leading-snug">
            Resultados medibles a través de un balance sólido entre estrategia y
            ejecución técnica.
          </h2>

          {/* 2-col grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
            {/* Left: placeholder cards */}
            <div className="lg:col-span-5">
              <div className="bg-[#141414] rounded-2xl p-8 h-48 flex items-end">
                <div className="flex items-center gap-3">
                  <span className="text-white font-semibold text-lg">
                    Estrategia
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C5F82A] shrink-0" />
                </div>
              </div>
              <div className="bg-[#141414] rounded-2xl p-8 h-48 flex items-end mt-4">
                <p className="italic text-[#888] text-sm leading-relaxed">
                  Las mejores experiencias digitales comienzan con una
                  conversación. Hablemos.
                </p>
              </div>
            </div>

            {/* Right: text + stats */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <p className="text-[#888] text-sm leading-relaxed mb-8">
                Combinamos visión de negocio con ejecución técnica de alto nivel
                para entregar productos que funcionan — no solo se ven bien.
              </p>

              {/* Stat cards */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.value}
                    className="bg-[#141414] rounded-2xl p-8"
                  >
                    <p className="text-5xl font-bold text-white leading-none">
                      {stat.value}
                    </p>
                    <p className="text-[#888] text-sm mt-2">{stat.label}</p>
                  </div>
                ))}
              </div>

              <p className="text-[#888] text-sm leading-relaxed mt-8">
                Combinamos visión de negocio con ejecución técnica de alto nivel
                para entregar productos que funcionan — no solo se ven bien.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
