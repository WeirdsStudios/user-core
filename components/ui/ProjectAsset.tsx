import Image from "next/image"
import BrowserFrame from "@/components/ui/BrowserFrame"
import type { ProjectAsset as Asset } from "@/lib/projects"

/**
 * Renderiza un asset de caso: grabación, imagen o panel neutro cuando el
 * material real todavía no existe.
 *
 * El placeholder reserva exactamente la misma proporción 16:9 que tendrá la
 * captura final, así que sustituir el archivo no obliga a reacomodar la
 * página: basta con quitar `placeholder` y poner `image` en lib/projects.ts.
 *
 * Deliberadamente NO dibuja una interfaz ficticia: un panel que simule un
 * punto de venta se leería como si fuera el producto real del cliente.
 */
export default function ProjectAssetView({
  asset,
  urlLabel,
}: {
  asset: Asset
  urlLabel?: string
}) {
  return (
    <figure>
      {asset.video ? (
        <BrowserFrame
          video={{ name: asset.video }}
          screenshotAlt={asset.alt}
          urlLabel={urlLabel}
          className="border-[#282828]"
        />
      ) : asset.image ? (
        <div className="overflow-hidden border border-[#282828] bg-[#0D0D0D]">
          <Image
            src={asset.image}
            alt={asset.alt}
            width={1280}
            height={720}
            className="w-full block"
            sizes="(max-width: 1024px) 100vw, 800px"
            loading="lazy"
          />
        </div>
      ) : (
        <div
          className="relative aspect-[16/9] border border-dashed border-[#2E2E2E] bg-[#0D0D0D] flex flex-col items-center justify-center gap-2 px-4 text-center"
          role="img"
          aria-label={`${asset.caption} — captura pendiente de publicación`}
        >
          <span className="grid-tech absolute inset-0 opacity-50" aria-hidden="true" />
          {/* El caption va solo en el figcaption; repetirlo aquí lo duplicaba. */}
          <span
            aria-hidden="true"
            className="relative font-mono text-[10px] uppercase tracking-[0.16em] text-[#4cfc0f] border border-[#4cfc0f]/40 px-2.5 py-1"
          >
            Captura pendiente
          </span>
        </div>
      )}

      <figcaption className="font-mono text-[10px] sm:text-[11px] text-[#8A8A8A] mt-3 leading-relaxed">
        {asset.caption}
      </figcaption>
    </figure>
  )
}
