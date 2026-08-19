// SIN USO — reemplazado por components/sections/Portfolio.tsx en la Fase 3.
// Se conserva porque no está versionado en git. Puede eliminarse.
import BrowserFrame, { type FrameVideo } from "@/components/ui/BrowserFrame"
import GhostButton from "@/components/ui/GhostButton"
import { siteConfig } from "@/lib/site-config"

/** Grabación y etiqueta de estado por producto, indexadas por nombre. */
const PRODUCT_MEDIA: Record<string, { video: FrameVideo }> = {
  ACTIIVA: { video: { name: "greekgym-admin" } },
}

export default function Productos() {
  const products = siteConfig.products

  return (
    <section id="productos" className="py-14 lg:py-28 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <span className="text-xs tracking-widest uppercase text-[#888] border border-[#CCC] px-3 py-1 inline-block mb-6">
            Nuestros productos
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0A] leading-tight">
            Plataformas propias, construidas con el mismo estándar que usamos para nuestros clientes.
          </h2>
        </div>

        <div className={products.length > 1 ? "grid grid-cols-1 md:grid-cols-2 gap-8" : "max-w-xl"}>
          {products.map((product) => {
            const media = PRODUCT_MEDIA[product.name]
            const isLive = product.status === "live"

            return (
              <article
                key={product.name}
                className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden hover:shadow-lg transition-shadow ring-1 ring-[#4cfc0f]/40"
              >
                <div className="p-4 bg-[#F9F9F9] border-b border-[#E5E5E5]">
                  <BrowserFrame
                    video={media?.video}
                    screenshotAlt={`Vista previa de ${product.name}`}
                    urlLabel={product.urlLabel}
                    className="shadow-none border-[#E0E0E0]"
                  />
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-xl font-bold text-[#0A0A0A]">{product.name}</h3>
                    {!isLive && (
                      <span className="text-[10px] font-semibold uppercase tracking-widest bg-[#0A0A0A] text-[#4cfc0f] px-2.5 py-1">
                        Próximamente
                      </span>
                    )}
                  </div>
                  <p className="text-[#888] mt-2 text-base leading-relaxed">{product.description}</p>

                  <div className="flex items-center justify-between mt-4 gap-4 flex-wrap">
                    <div className="flex gap-2 flex-wrap">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-[#F5F5F5] border border-[#E5E5E5] px-3 py-1 rounded-full text-[#555]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* El CTA externo solo aparece cuando el destino es una
                        experiencia terminada. Para activarlo basta cambiar
                        `status` a "live" en lib/site-config.ts. */}
                    {isLive && (
                      <GhostButton
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        tone="light"
                        size="compact"
                        className="shrink-0"
                        line1="Ver producto"
                        line2={product.urlLabel}
                      />
                    )}
                  </div>

                  {!isLive && (
                    <p className="text-xs text-[#888] mt-4 pt-4 border-t border-[#F0F0F0]">
                      En fase final de construcción. Escríbenos si quieres una demo
                      antes del lanzamiento.
                    </p>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
