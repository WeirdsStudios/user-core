/**
 * Antes eran 4 tarjetas con íconos y lenguaje de agencia ("desarrollo ágil",
 * "iterar en diseño es 10x más barato"). Ahora son 5 pasos en lenguaje que un
 * dueño de negocio entiende, y cada uno dice qué pasa de su lado — que es la
 * duda real: "¿qué me van a pedir y cuándo voy a ver algo?".
 */
const steps = [
  {
    n: "1",
    title: "Entendemos",
    body: "Hablamos de tu negocio, tu operación y qué esperas del proyecto.",
    you: "Nos cuentas cómo trabajas hoy.",
  },
  {
    n: "2",
    title: "Diseñamos",
    body: "Definimos estructura, contenido y flujo, y te lo mostramos antes de programar.",
    you: "Revisas y ajustamos.",
  },
  {
    n: "3",
    title: "Construimos",
    body: "Desarrollamos por partes, con avances visibles para que no pierdas el hilo.",
    you: "Ves el proyecto tomando forma.",
  },
  {
    n: "4",
    title: "Lanzamos",
    body: "Publicamos, configuramos dominio y hosting, y te enseñamos a usarlo.",
    you: "Apruebas antes del pago final.",
  },
  {
    n: "5",
    title: "Mejoramos",
    body: "Medimos qué funciona y ajustamos. Aquí entra el soporte y el mantenimiento.",
    you: "Decides si quieres continuidad.",
  },
]

export default function Process() {
  return (
    <section id="proceso" className="bg-white py-14 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#0A0A0A]/50">
            Cómo trabajamos
          </span>
          <h2 className="text-[1.6rem] sm:text-3xl lg:text-[2.75rem] font-bold text-[#0A0A0A] leading-[1.15] mt-3 lg:mt-4 text-balance tracking-tight">
            Qué pasa si trabajas con nosotros
          </h2>
        </div>

        <ol className="mt-10 lg:mt-14 border-t border-[#E5E5E5] max-w-4xl">
          {steps.map((step) => (
            <li
              key={step.n}
              className="border-b border-[#E5E5E5] py-5 lg:py-6 grid grid-cols-[1.5rem_1fr] lg:grid-cols-[1.5rem_10rem_1fr] gap-x-4 lg:gap-x-6 gap-y-1.5 items-baseline"
            >
              <span className="text-sm font-mono tnum text-[#4cfc0f] font-bold">{step.n}</span>
              <h3 className="text-lg font-bold text-[#0A0A0A]">{step.title}</h3>
              <div className="col-start-2 lg:col-start-3">
                <p className="text-[#555] text-sm leading-relaxed">{step.body}</p>
                <p className="text-[#999] text-xs leading-relaxed mt-1">
                  <span className="text-[#4cfc0f]" aria-hidden="true">·</span> {step.you}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
