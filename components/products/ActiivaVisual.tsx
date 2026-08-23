import Image from "next/image"

/**
 * Composición de producto de ACTIIVA.
 *
 * POR QUÉ NO ES UNA CAPTURA
 * ACTIIVA está en construcción: no hay pantalla que enseñar. Dibujar una
 * simulada sería inventar evidencia —quien la vea creerá que el producto
 * existe y funciona así— y además nos obligaría a rehacerla en cuanto el
 * producto real se parezca a otra cosa.
 *
 * QUÉ SÍ COMUNICA
 * La arquitectura del producto, que sí está definida: tres capas conectadas
 * —quién entra, qué pasa por dentro, qué ve el socio— con las funciones ya
 * documentadas en `siteConfig.products`. Es el mismo lenguaje del hero de
 * USERS aplicado a la identidad de ACTIIVA, así que se lee como producto y no
 * como ilustración de relleno.
 *
 * SIN DATOS INVENTADOS: ningún número, ningún nombre, ninguna métrica. Solo
 * los nombres de las capas y de las funciones.
 *
 * Cuando exista material real, `lib/products-media.ts` lo sirve y esta
 * composición deja de usarse sin tocar el layout.
 */

const CAPAS = [
  {
    n: "01",
    nombre: "Miembros",
    detalle: "Quién entra y con qué plan",
    piezas: ["Membresías", "Vencimientos", "Accesos"],
  },
  {
    n: "02",
    nombre: "Operación",
    detalle: "Lo que pasa por dentro",
    piezas: ["Clases", "Cobros", "Perfiles"],
  },
  {
    n: "03",
    nombre: "Experiencia",
    detalle: "Lo que ve el socio",
    piezas: ["Reservas", "Su cuenta", "Recordatorios"],
  },
] as const

function Conector() {
  return (
    <div className="flex items-center justify-center h-4" aria-hidden="true">
      <span className="w-px h-full bg-gradient-to-b from-[#4cfc0f]/50 to-[#4cfc0f]/10" />
    </div>
  )
}

export default function ActiivaVisual({
  logo,
  className = "",
}: {
  logo?: string
  className?: string
}) {
  return (
    <div
      className={`relative overflow-hidden bg-[#0B0B0B] border border-[#242424] ${className}`}
      role="img"
      aria-label="Arquitectura de ACTIIVA: miembros, operación y experiencia del socio, conectadas en un solo sistema"
    >
      <span className="grid-tech absolute inset-0 opacity-50" aria-hidden="true" />
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.09]"
        style={{
          background: "radial-gradient(ellipse 60% 80% at 50% 0%, #4cfc0f 0%, transparent 70%)",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#4cfc0f]/50"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#4cfc0f]/50"
      />

      <div className="relative p-5 sm:p-6 lg:p-7">
        <div className="flex items-center justify-between gap-4">
          {logo ? (
            <Image
              src={logo}
              alt="ACTIIVA"
              width={180}
              height={32}
              className="h-5 sm:h-6 w-auto brightness-0 invert"
            />
          ) : (
            <span className="font-bold text-lg tracking-[0.2em] text-white">ACTIIVA</span>
          )}
          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-[#4cfc0f]">
            Negocio fitness
          </span>
        </div>

        <ul className="mt-5 sm:mt-6" aria-hidden="true">
          {CAPAS.map((capa, i) => (
            <li key={capa.n}>
              {i > 0 && <Conector />}
              <div className="border border-[#242424] bg-[#0E0E0E]/80 px-3.5 py-3">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-[10px] text-[#4cfc0f] tnum">{capa.n}</span>
                  <span className="text-sm font-semibold text-white">{capa.nombre}</span>
                  <span className="font-mono text-[9px] text-[#9A9A9A] truncate hidden sm:inline">
                    {capa.detalle}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {capa.piezas.map((pieza, j) => (
                    <span
                      key={pieza}
                      className="flex items-center gap-1.5 border border-[#242424] px-2 py-1"
                    >
                      <span
                        className={`w-1 h-1 rounded-full ${
                          i === 0 && j === 0 ? "bg-[#4cfc0f]" : "bg-[#3A3A3A]"
                        }`}
                      />
                      <span className="font-mono text-[9px] sm:text-[10px] text-[#B0B0B0] whitespace-nowrap">
                        {pieza}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="font-mono text-[9px] sm:text-[10px] text-[#9A9A9A] mt-4 text-right">
          Un sistema · tres capas conectadas
        </p>
      </div>
    </div>
  )
}
