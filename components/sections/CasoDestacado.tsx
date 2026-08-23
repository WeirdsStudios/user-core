import BrowserFrame from "@/components/ui/BrowserFrame"

/**
 * Greek Gym es el caso protagonista porque es el único cliente donde se ven
 * los tres frentes a la vez: sitio público, reservas por WhatsApp y sistema
 * de operación con roles. Es la prueba de que "web + software" ya está
 * entregado, no prometido.
 *
 * Sin métricas de negocio: no tenemos datos verificables del cliente. Lo que
 * se describe es alcance funcional, comprobable en las dos grabaciones.
 */
const piezas = [
  {
    n: "01",
    label: "Sitio público",
    detail:
      "Dos sucursales, disciplinas, coaches y membresías. La cara que ve quien busca un gimnasio en Puebla.",
    video: { name: "greekgym" },
    urlLabel: "greekgym.mx",
  },
  {
    n: "02",
    label: "Sistema administrativo",
    detail:
      "Tres roles con permisos distintos —Super Administrador, Administrador y Cajero—, punto de venta, inventario y corte de caja.",
    video: { name: "greekgym-admin" },
    urlLabel: "Sistema interno",
  },
]

export default function CasoDestacado() {
  return (
    <section id="proyectos" className="bg-[#0A0A0A] text-white py-14 lg:py-28 border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#4cfc0f]">
            Caso destacado
          </span>
          <h2 className="text-[1.6rem] sm:text-3xl lg:text-[2.75rem] font-bold leading-[1.15] mt-3 lg:mt-4 text-balance tracking-tight">
            De un sitio web a la operación completa de un gimnasio
          </h2>
          <p className="text-[#9A9A9A] text-[15px] lg:text-lg mt-4 lg:mt-5 leading-relaxed">
            Un gimnasio con dos sucursales no necesitaba solo una página:
            necesitaba que el sitio, los socios y la caja hablaran entre sí.
          </p>
          <p className="font-mono text-[11px] text-[#8A8A8A] mt-4">
            Greek Gym · Puebla · 2 sucursales
          </p>
        </div>

        {/* Las dos piezas, una debajo de otra en móvil */}
        <div className="mt-10 lg:mt-14 space-y-10 lg:space-y-14">
          {piezas.map((pieza) => (
            <div key={pieza.n} className="lg:grid lg:grid-cols-12 lg:gap-10 xl:gap-14 lg:items-center">
              <div className={pieza.n === "02" ? "lg:col-span-7 lg:order-2" : "lg:col-span-7"}>
                <BrowserFrame
                  video={pieza.video}
                  screenshotAlt={`${pieza.label} de Greek Gym`}
                  urlLabel={pieza.urlLabel}
                  className="border-[#282828]"
                />
              </div>

              <div className={`mt-6 lg:mt-0 ${pieza.n === "02" ? "lg:col-span-5 lg:order-1" : "lg:col-span-5"}`}>
                <span className="font-mono text-[11px] tnum text-[#4cfc0f]">{pieza.n}</span>
                <h3 className="text-xl lg:text-2xl font-bold mt-1.5">{pieza.label}</h3>
                <p className="text-[#8E8E8E] text-sm lg:text-base mt-3 leading-relaxed max-w-md">
                  {pieza.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Reservas por WhatsApp — la pieza que conecta las dos anteriores */}
        <div className="mt-10 lg:mt-14 border border-[#222] bg-[#0E0E0E] p-6 lg:p-8 relative corner-marks">
          <div className="lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div>
              <span className="font-mono text-[11px] tnum text-[#4cfc0f]">03</span>
              <h3 className="text-xl lg:text-2xl font-bold mt-1.5">Reservas por WhatsApp</h3>
              <p className="text-[#8E8E8E] text-sm lg:text-base mt-3 leading-relaxed max-w-2xl">
                Los socios reservan su clase por el mismo WhatsApp que ya usaban,
                sin instalar nada ni aprender otra app. La reserva entra directo
                al sistema del gimnasio.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-5 lg:mt-0 shrink-0">
              {["Sitio web", "Reservas", "Punto de venta", "3 roles", "Multisucursal"].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] text-[#8A8A8A] border border-[#2A2A2A] px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <a
            href="https://greekgym.mx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-white border-b-2 border-[#4cfc0f] pb-2 pt-2 transition-colors hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
          >
            Ver greekgym.mx
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
