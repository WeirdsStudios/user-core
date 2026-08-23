/**
 * Portada editorial.
 *
 * Sustituye a la caja que decía "Material pendiente". Ese mensaje era honesto
 * hacia dentro y pésimo hacia fuera: a un prospecto le dice que el sitio está
 * a medias, y en el caso de los productos decía algo directamente equivocado
 * —que la captura existe y no la subimos— cuando lo que pasa es que el
 * producto todavía se está construyendo.
 *
 * Aquí no se inventa nada: solo se compone con información real —nombre,
 * categoría y las funciones que sí existen— sobre la retícula técnica de la
 * marca. No dibuja una interfaz falsa, porque una captura simulada de un
 * punto de venta se leería como el producto del cliente.
 *
 * Cuando lleguen las capturas, basta quitar `placeholder` del slot en
 * `lib/projects.ts` o `lib/products-media.ts`. El layout no cambia: la
 * proporción y el marco son los mismos.
 */
export interface EditorialCoverProps {
  /** Nombre grande. Marca del cliente o del producto. */
  title: string
  /** Contexto corto sobre el título: giro, vertical. */
  eyebrow?: string
  /** Qué es. Una línea, en lenguaje de negocio. */
  subtitle?: string
  /** Piezas reales que componen el trabajo. Máximo cuatro. */
  parts?: readonly string[]
  /** Recorta a la misma caja que el resto de la rejilla. */
  uniform?: boolean
}

export default function EditorialCover({
  title,
  eyebrow,
  subtitle,
  parts,
  uniform = false,
}: EditorialCoverProps) {
  return (
    <div
      className={`relative overflow-hidden bg-[#0B0B0B] flex flex-col justify-between ${
        uniform ? "aspect-[16/10]" : "aspect-[16/9]"
      }`}
    >
      {/* Retícula técnica: el mismo lenguaje del hero, no un relleno */}
      <span className="grid-tech absolute inset-0 opacity-60" aria-hidden="true" />
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          background:
            "radial-gradient(ellipse 70% 90% at 15% 110%, #4cfc0f 0%, transparent 70%)",
        }}
      />

      {/* Marca de esquina, como en el resto de marcos técnicos del sitio */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 w-5 h-5 border-t border-l border-[#4cfc0f]/50"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-[#4cfc0f]/50"
      />

      <div className="relative p-4 sm:p-5 lg:p-6">
        {eyebrow && (
          <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-[#4cfc0f]">
            {eyebrow}
          </p>
        )}
        <p className="text-white font-bold tracking-tight leading-[1.05] mt-2 text-[1.35rem] sm:text-2xl lg:text-[2rem]">
          {title}
        </p>
        {subtitle && (
          <p className="text-[#9E9E9E] text-[11px] sm:text-xs lg:text-sm mt-1.5 leading-snug max-w-[26ch]">
            {subtitle}
          </p>
        )}
      </div>

      {parts && parts.length > 0 && (
        <div className="relative p-4 sm:p-5 lg:p-6 pt-0">
          {/* Diagrama funcional abstracto: cada pieza real, una barra. No
              simula una pantalla; enumera lo que el trabajo incluye. */}
          {/* Una sola fila: al envolver, el cuarto chip se cortaba contra el
              borde inferior de la caja de proporción fija. Con `uniform` la
              altura no da para dos filas, así que se muestran menos piezas
              antes que mostrarlas partidas. */}
          <ul className="flex flex-wrap gap-1.5 overflow-hidden">
            {parts.slice(0, uniform ? 3 : 4).map((part, i) => (
              <li
                key={part}
                className="flex items-center gap-1.5 border border-[#242424] bg-[#0E0E0E]/80 px-2 py-1"
              >
                <span
                  aria-hidden="true"
                  className={`w-1 h-1 rounded-full ${i === 0 ? "bg-[#4cfc0f]" : "bg-[#3A3A3A]"}`}
                />
                <span className="font-mono text-[9px] sm:text-[10px] text-[#B0B0B0] whitespace-nowrap">
                  {part}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
