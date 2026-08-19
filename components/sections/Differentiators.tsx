/**
 * Reescrito por completo. La versión anterior afirmaba "26 proyectos
 * entregados", "100% de clientes satisfechos" y "6 proyectos activos", además
 * de una gráfica de crecimiento decorativa que parecía un dato. Nada de eso
 * era verificable ni tenía metodología detrás, así que se eliminó.
 *
 * Lo que queda son diferencias de método — comprobables contra cómo trabajamos
 * y contra lo que el resto de la home ya muestra.
 */
const differences = [
  {
    title: "Primero el negocio, luego el software",
    body: "No construimos una funcionalidad hasta entender qué problema resuelve y qué pasa si no existe. Por eso el proyecto empieza con preguntas sobre tu operación, no sobre colores.",
  },
  {
    title: "Diseñamos antes de construir",
    body: "Validamos estructura y flujo cuando cambiarlos todavía es barato. Corregir un diseño toma horas; corregir un sistema ya construido toma semanas.",
  },
  {
    title: "Crecemos contigo",
    body: "Lo que hoy es un sitio puede convertirse después en reservas, administración o una plataforma completa. No tienes que cambiar de proveedor ni empezar de cero.",
  },
  {
    title: "Seguimos ahí después de entregar",
    body: "Hay soporte incluido el primer mes y planes de mantenimiento si quieres continuidad. El lanzamiento es el inicio de la relación, no el final.",
  },
]

export default function Differentiators() {
  return (
    <section className="bg-[#F5F5F5] py-14 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#0A0A0A]/50">
            Por qué USERS
          </span>
          <h2 className="text-[1.6rem] sm:text-3xl lg:text-[2.75rem] font-bold text-[#0A0A0A] leading-[1.15] mt-3 lg:mt-4 text-balance tracking-tight">
            Cuatro decisiones que cambian el resultado
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 lg:gap-y-14 mt-12 lg:mt-16">
          {differences.map((item) => (
            <div key={item.title} className="border-t border-[#DADADA] pt-6">
              <h3 className="text-lg lg:text-xl font-bold text-[#0A0A0A] leading-snug text-balance">
                {item.title}
              </h3>
              <p className="text-[#666] text-sm lg:text-base mt-3 leading-relaxed max-w-prose">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
