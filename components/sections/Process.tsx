interface ProcessStep {
  number: string
  title: string
  description: string
}

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Descubrimiento & Estrategia",
    description:
      "Entendemos tu negocio, tu mercado y tus objetivos antes de escribir una sola línea de código.",
  },
  {
    number: "02",
    title: "Prototipo & Diseño",
    description:
      "Validamos la solución visualmente antes de construirla — iterar en diseño es 10x más barato que en código.",
  },
  {
    number: "03",
    title: "Desarrollo Ágil",
    description:
      "Construimos en ciclos cortos con entregas parciales visibles, para que nunca pierdas el hilo del proyecto.",
  },
  {
    number: "04",
    title: "Lanzamiento & Escala",
    description:
      "Lanzamos, medimos y optimizamos — el proyecto no termina en el deploy, termina cuando los resultados llegan.",
  },
]

export default function Process() {
  return (
    <section id="proceso" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-16">
          <div>
            <p className="text-xs tracking-widest uppercase text-[#888] mb-4">
              Cómo trabajamos
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0A0A0A]">
              El Proceso
            </h2>
          </div>
          <p className="text-[#888] text-base leading-relaxed max-w-md lg:text-right">
            Estrategias honestas para negocios con ambición. Así llevamos tu
            idea de concepto a producto real funcionando.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-[#F5F5F5] rounded-2xl p-8"
            >
              <p className="text-xs font-mono text-[#888] mb-4">[{step.number}]</p>
              <h3 className="text-xl font-bold text-[#0A0A0A]">{step.title}</h3>
              <p className="text-[#888] mt-3 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
