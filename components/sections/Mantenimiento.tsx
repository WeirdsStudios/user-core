import GhostButton from "@/components/ui/GhostButton"

const planes = [
  {
    name: "Esencial",
    price: "$399",
    period: "MXN/mes",
    highlight: false,
    features: [
      "Hosting y dominio incluidos",
      "Cambios menores de contenido (hasta 2/mes)",
      "Respaldo mensual del sitio",
      "Soporte por WhatsApp en horario hábil",
    ],
  },
  {
    name: "Prioritario",
    price: "$799",
    period: "MXN/mes",
    highlight: true,
    features: [
      "Todo lo del plan Esencial",
      "Cambios de contenido sin límite razonable",
      "Respaldos más frecuentes",
      "Soporte prioritario (respuesta más rápida)",
      "Acceso prioritario a la Central de Ayuda",
    ],
  },
]

export default function Mantenimiento() {
  return (
    <section id="mantenimiento" className="py-24 lg:py-32 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-end">
          <div>
            <span className="text-xs tracking-widest uppercase text-[#888] border border-[#CCC] px-3 py-1 inline-block mb-4">
              Planes de mantenimiento
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0A] leading-tight">
              Tu sitio, siempre actualizado y respaldado
            </h2>
          </div>
          <p className="text-[#555] text-base leading-relaxed mt-4 lg:mt-0">
            Lanzar es el inicio, no el final. Estos planes incluyen todo lo que
            necesitas para que tu inversión siga generando resultados.
          </p>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          {planes.map((plan) => (
            <div
              key={plan.name}
              className={`border p-8 flex flex-col ${
                plan.highlight
                  ? "border-[#4cfc0f] bg-[#0A0A0A] text-white"
                  : "border-[#E5E5E5] bg-white"
              }`}
            >
              {plan.highlight && (
                <span className="text-[#4cfc0f] text-xs font-semibold uppercase tracking-widest mb-4 block">
                  Más popular
                </span>
              )}
              <p className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-2">
                {plan.name}
              </p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className={`text-4xl font-bold ${plan.highlight ? "text-white" : "text-[#0A0A0A]"}`}>
                  {plan.price}
                </span>
                <span className="text-sm text-[#888]">{plan.period}</span>
              </div>
              <ul className="space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="text-[#4cfc0f] font-bold text-base leading-tight shrink-0 mt-0.5">
                      +
                    </span>
                    <span className={`text-sm leading-relaxed ${plan.highlight ? "text-[#CCCCCC]" : "text-[#444]"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-xs text-[#888] mt-6">
          Los planes de mantenimiento aplican para proyectos entregados por users.mx.
        </p>
        <GhostButton
          href="/analisis"
          tone="light"
          className="mt-3"
          line1="Cotiza tu proyecto"
          line2="para tu negocio"
        />
      </div>
    </section>
  )
}
