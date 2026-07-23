import Image from "next/image"

const steps = [
  {
    number: "01",
    title: "Descubrimiento & Estrategia",
    description:
      "Entendemos tu negocio, tu mercado y tus objetivos antes de escribir una sola línea de código.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Prototipo & Diseño",
    description:
      "Validamos la solución visualmente antes de construirla — iterar en diseño es 10x más barato que en código.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Desarrollo Ágil",
    description:
      "Construimos en ciclos cortos con entregas parciales visibles, para que nunca pierdas el hilo del proyecto.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Lanzamiento & Escala",
    description:
      "Lanzamos, medimos y optimizamos — el proyecto no termina en el deploy, termina cuando los resultados llegan.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
]

export default function Process() {
  return (
    <section id="proceso" className="py-24 lg:py-32 bg-white snap-start">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-16">
          <div>
            <span className="text-xs tracking-widest uppercase text-[#888] border border-[#E5E5E5] px-3 py-1 inline-block mb-4">
              Cómo trabajamos
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0A0A0A]">
              El Proceso
            </h2>
          </div>
          <p className="text-[#888] text-base leading-relaxed max-w-md lg:text-right">
            Estrategias honestas para negocios con ambición. Así llevamos tu
            idea de concepto a producto real funcionando.
          </p>
        </div>

        {/* Process image strip */}
        <div className="w-full aspect-[21/6] rounded-2xl overflow-hidden mb-12 relative">
          <Image
            src="/imgs/bg/scene.webp"
            alt="Sesión de trabajo del equipo users.mx"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 1280px"
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="bg-[#F5F5F5] rounded-2xl p-8 group hover:bg-[#0A0A0A] transition-colors duration-300">
              {/* Step number + icon row */}
              <div className="flex items-start justify-between mb-6">
                <span className="text-xs font-mono text-[#888] group-hover:text-[#555]">[{step.number}]</span>
                <span className="text-[#0A0A0A] group-hover:text-[#4cfc0f] transition-colors duration-300">
                  {step.icon}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#0A0A0A] group-hover:text-white transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-[#888] mt-3 text-sm leading-relaxed group-hover:text-[#666] transition-colors duration-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
