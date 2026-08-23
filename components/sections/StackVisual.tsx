/**
 * "El stack digital del negocio" — visual propietaria del hero.
 *
 * Sustituye a las capturas de Greek Gym, que hacían que la marca del cliente
 * dominara el primer viewport y que USERS pareciera especializada en gimnasios.
 *
 * Son paneles abstractos, no interfaces reales: comunican *tipo* de software
 * (cara pública / herramienta interna / herramienta del cliente) sin fingir un
 * producto, sin nombres de cliente y sin métricas inventadas.
 *
 * Todo es HTML + CSS: cero imágenes, cero video, cero librerías. Los adornos
 * van con aria-hidden; las etiquetas de capa y sus elementos sí son texto real
 * porque comunican la oferta.
 */

const LAYERS = [
  {
    n: "01",
    name: "Presencia",
    items: ["Sitio web", "Ecommerce", "Catálogo"],
    hint: "Lo que ve tu cliente",
  },
  {
    n: "02",
    name: "Operación",
    items: ["Administración", "PDV", "CRM", "Automatización"],
    hint: "Lo que usa tu equipo",
  },
  {
    n: "03",
    name: "Clientes",
    items: ["Portal", "Reservas", "Cotizador", "Pagos"],
    hint: "Lo que resuelven solos",
  },
]

/** Barra superior común a los paneles: da lectura de "esto es software". */
function PanelChrome({ trailing }: { trailing?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#222]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#333]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#333]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#333]" />
      {trailing}
    </div>
  )
}

/** Capa 01 — la cara pública: encabezado, bloque principal, CTA y cards. */
function PresenciaPanel() {
  return (
    <div aria-hidden="true" className="bg-[#0D0D0D]">
      <PanelChrome
        trailing={<span className="ml-2 h-1.5 flex-1 max-w-[90px] bg-[#1E1E1E] rounded-sm" />}
      />
      <div className="p-2.5 sm:p-3 space-y-1.5 sm:space-y-2">
        <div className="flex gap-2">
          <div className="flex-1 space-y-1.5">
            <span className="block h-2 w-3/4 bg-[#242424] rounded-sm" />
            <span className="block h-1.5 w-full bg-[#1A1A1A] rounded-sm" />
            <span className="block h-1.5 w-5/6 bg-[#1A1A1A] rounded-sm" />
            <span className="block h-3.5 w-16 bg-[#4cfc0f] rounded-sm mt-2" />
          </div>
          <div className="w-[38%] bg-[#161616] rounded-sm border border-[#202020]" />
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-5 sm:h-6 bg-[#151515] border border-[#1F1F1F] rounded-sm" />
          ))}
        </div>
      </div>
    </div>
  )
}

/** Capa 02 — la herramienta interna: navegación lateral, filas y acciones. */
function OperacionPanel() {
  return (
    <div aria-hidden="true" className="bg-[#0D0D0D]">
      <PanelChrome
        trailing={
          <span className="ml-auto flex gap-1">
            <span className="h-2.5 w-8 bg-[#1E1E1E] rounded-sm" />
            <span className="h-2.5 w-5 bg-[#4cfc0f]/25 rounded-sm" />
          </span>
        }
      />
      <div className="flex">
        <div className="w-[22%] border-r border-[#1C1C1C] p-2 sm:p-2.5 space-y-1.5">
          <span className="block h-1.5 w-full bg-[#4cfc0f]/40 rounded-sm" />
          {[0, 1, 2].map((i) => (
            <span key={i} className="block h-1.5 w-4/5 bg-[#1E1E1E] rounded-sm" />
          ))}
        </div>
        <div className="flex-1 p-2 sm:p-2.5 space-y-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className={`w-1.5 h-1.5 rounded-full ${i === 1 ? "bg-[#4cfc0f]" : "bg-[#2A2A2A]"}`}
              />
              <span className="h-1.5 flex-1 bg-[#1C1C1C] rounded-sm" />
              <span className="h-1.5 w-6 bg-[#242424] rounded-sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Capa 03 — lo que usa el cliente: cuenta, estado y una acción. */
function ClientesPanel() {
  return (
    <div aria-hidden="true" className="bg-[#0D0D0D]">
      <PanelChrome />
      <div className="p-2.5 sm:p-3 space-y-1.5 sm:space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#1C1C1C] border border-[#262626]" />
          <span className="space-y-1">
            <span className="block h-1.5 w-16 bg-[#242424] rounded-sm" />
            <span className="block h-1.5 w-10 bg-[#1A1A1A] rounded-sm" />
          </span>
          <span className="ml-auto h-2.5 w-10 border border-[#4cfc0f]/35 rounded-sm" />
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4cfc0f]" />
          <span className="h-1.5 flex-1 bg-[#1C1C1C] rounded-sm" />
        </div>
        <span className="block h-4 w-full bg-[#4cfc0f]/15 border border-[#4cfc0f]/25 rounded-sm" />
      </div>
    </div>
  )
}

const PANELS = [PresenciaPanel, OperacionPanel, ClientesPanel]

/** Conector entre capas: la idea de que son un mismo sistema, no tres piezas. */
function Connector() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center h-5 lg:h-7">
      <span className="relative flex flex-col items-center">
        <span className="w-px h-2.5 lg:h-3 bg-gradient-to-b from-transparent to-[#4cfc0f]/45" />
        <span className="w-1.5 h-1.5 rotate-45 border border-[#4cfc0f]/60 bg-[#0A0A0A] node-pulse" />
        <span className="w-px h-2.5 lg:h-3 bg-gradient-to-t from-transparent to-[#4cfc0f]/45" />
      </span>
    </div>
  )
}

export default function StackVisual() {
  return (
    <figure className="relative">
      {/* Marco técnico que agrupa las tres capas como un solo sistema */}
      <div className="relative corner-marks border border-[#1E1E1E] p-2.5 sm:p-4 lg:p-5">
        <ul className="space-y-0">
          {LAYERS.map((layer, i) => {
            const Panel = PANELS[i]
            return (
              <li key={layer.n}>
                {i > 0 && <Connector />}

                <div className="flex items-stretch gap-3 lg:gap-4">
                  {/* Etiqueta de capa — texto real, no adorno */}
                  <div className="w-[86px] sm:w-[104px] shrink-0 flex flex-col justify-center">
                    <p className="font-mono text-[10px] tnum text-[#4cfc0f] leading-none">
                      {layer.n}
                    </p>
                    <p className="text-[13px] sm:text-sm font-bold text-white mt-1 leading-tight">
                      {layer.name}
                    </p>
                    <p className="hidden sm:block font-mono text-[9px] uppercase tracking-[0.1em] text-[#8A8A8A] mt-1.5 leading-relaxed">
                      {layer.hint}
                    </p>
                  </div>

                  {/* Panel abstracto */}
                  <div className="flex-1 min-w-0 border border-[#202020] overflow-hidden">
                    <Panel />
                  </div>
                </div>

                {/* Elementos de la capa */}
                <ul className="flex flex-wrap gap-1 mt-1.5 sm:mt-2 ml-[98px] sm:ml-[120px]">
                  {layer.items.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-[9px] sm:text-[10px] text-[#9A9A9A] border border-[#242424] px-1.5 py-0.5"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>
      </div>

      <figcaption className="font-mono text-[10px] sm:text-[11px] text-[#8A8A8A] mt-3 sm:mt-4 text-center lg:text-right tracking-wide">
        Una estrategia · tres capas conectadas
      </figcaption>
    </figure>
  )
}
