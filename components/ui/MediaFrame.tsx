import Image from "next/image"
import LazyVideo from "@/components/ui/LazyVideo"
import { mediaSources, type MediaSlot } from "@/lib/media"

/**
 * Marco único para todo el material de casos y productos.
 *
 * Unifica lo que antes estaban duplicado entre BrowserFrame y ProjectAsset, y
 * garantiza el mismo tratamiento en los tres proyectos: video con póster y
 * carga diferida, imagen estática, o panel neutro cuando aún no hay material.
 *
 * El placeholder NO dibuja una interfaz ficticia: un panel que simule un punto
 * de venta se leería como el producto real del cliente.
 */
export default function MediaFrame({
  slot,
  urlLabel,
  chrome = true,
  priority = false,
  uniform = false,
  className = "",
}: {
  slot: MediaSlot
  /** Texto de la barra superior. Sirve para una URL o para el contexto del material. */
  urlLabel?: string
  /** false = sin barra superior, para capturas de app o producto. */
  chrome?: boolean
  priority?: boolean
  /**
   * Recorta el material a 16/10.
   *
   * En una rejilla de casos, cada video y cada captura trae su propia
   * proporción, y eso desalinea los títulos de una tarjeta a otra: los casos
   * se leen como si unos estuvieran más terminados que otros. Con la misma
   * caja para los tres, la diferencia vuelve a ser el contenido.
   *
   * En la página de detalle no se usa: ahí el material se ve completo.
   */
  uniform?: boolean
  className?: string
}) {
  const src = slot.video ? mediaSources(slot) : null
  const box = uniform
    ? "relative aspect-[16/10] overflow-hidden [&_img]:absolute [&_img]:inset-0 [&_img]:h-full [&_img]:object-cover [&_video]:absolute [&_video]:inset-0 [&_video]:h-full [&_video]:object-cover"
    : ""

  return (
    <figure className={className}>
      <div className="relative corner-marks border border-[#282828] bg-[#0D0D0D] overflow-hidden">
        {chrome && (
          <div className="bg-[#141414] px-3 py-2 flex items-center gap-2 border-b border-[#222]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3A3A3A]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#3A3A3A]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#3A3A3A]" />
            {urlLabel && (
              <span className="font-mono text-[#8A8A8A] text-[10px] ml-2 truncate">
                {urlLabel}
              </span>
            )}
          </div>
        )}

        {src ? (
          <div className={box}>
            <LazyVideo
              name={slot.video!}
              dir={slot.dir}
              label={slot.alt}
              className="w-full block"
            />
          </div>
        ) : slot.image ? (
          <div className={box}>
            <Image
              src={slot.image}
              alt={slot.alt}
              width={1280}
              height={720}
              className="w-full block"
              sizes="(max-width: 1024px) 100vw, 800px"
              priority={priority}
              loading={priority ? undefined : "lazy"}
            />
          </div>
        ) : (
          <div
            className={`relative flex items-center justify-center ${uniform ? "aspect-[16/10]" : "aspect-[16/9]"}`}
            role="img"
            aria-label={`${slot.caption} — material pendiente de publicación`}
          >
            <span className="grid-tech absolute inset-0 opacity-50" aria-hidden="true" />
            <span
              aria-hidden="true"
              className="absolute inset-0 opacity-15"
              style={{ background: "radial-gradient(ellipse at center, #4cfc0f 0%, transparent 65%)" }}
            />
            <span
              aria-hidden="true"
              className="relative font-mono text-[10px] uppercase tracking-[0.16em] text-[#4cfc0f] border border-[#4cfc0f]/40 px-2.5 py-1"
            >
              Material pendiente
            </span>
          </div>
        )}

        {slot.badge && (
          <span className="absolute top-0 right-0 font-mono text-[9px] uppercase tracking-[0.14em] bg-[#4cfc0f] text-black px-2 py-1">
            {slot.badge}
          </span>
        )}
      </div>

      <figcaption className="font-mono text-[10px] sm:text-[11px] text-[#8A8A8A] mt-2.5 leading-relaxed">
        {slot.caption}
      </figcaption>
    </figure>
  )
}
