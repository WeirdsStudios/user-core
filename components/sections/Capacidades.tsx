/**
 * Antes esto era la sección "Servicios" y era la explicación principal de la
 * oferta — pero estrategia, UX o desarrollo son cómo trabajamos, no lo que el
 * cliente compra. Ahora vive después de las soluciones y de la evidencia, con
 * peso visual deliberadamente secundario.
 */
const capabilities = [
  {
    name: "Estrategia de negocio",
    body: "Definimos qué debe resolver el proyecto antes de decidir qué construir.",
  },
  {
    name: "Diseño de producto y UX",
    body: "Estructura y flujo primero; la interfaz refuerza esa decisión, no la sustituye.",
  },
  {
    name: "Desarrollo web y de software",
    body: "Sitios, sistemas e integraciones construidos a la medida del negocio.",
  },
  {
    name: "Identidad visual",
    body: "La marca aplicada de forma consistente en todo lo digital.",
  },
  {
    name: "Crecimiento",
    body: "SEO y medición para que el proyecto siga generando después de lanzar.",
  },
]

export default function Capacidades() {
  return (
    <section id="capacidades" className="bg-white py-12 lg:py-20 border-b border-[#EEE]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#0A0A0A]/50">
              Cómo lo construimos
            </span>
            <h2 className="text-[1.5rem] sm:text-2xl lg:text-3xl font-bold text-[#0A0A0A] leading-tight mt-3 tracking-tight">
              Las piezas que entran en cada proyecto
            </h2>
            <p className="text-[#666] text-sm mt-4 leading-relaxed">
              No se contratan por separado: se combinan según lo que el proyecto
              necesite.
            </p>
          </div>

          <ul className="lg:col-span-8 mt-8 lg:mt-0 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            {capabilities.map((cap) => (
              <li key={cap.name}>
                <h3 className="text-sm font-bold text-[#0A0A0A]">{cap.name}</h3>
                <p className="text-[#777] text-sm mt-1 leading-relaxed">{cap.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
