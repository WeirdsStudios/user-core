import Link from "next/link"
import Image from "next/image"
import MediaFrame from "@/components/ui/MediaFrame"
import { siteConfig } from "@/lib/site-config"
import { PRODUCT_PRESENTATION, productCta } from "@/lib/products-media"
import { getWhatsAppLink } from "@/lib/whatsapp"

/**
 * Productos propios con peso de producto, no de experimento.
 *
 * El mensaje principal es la vertical que atienden —"Producto USERS · Fitness"—
 * y no su estado técnico. El estado sigue existiendo en siteConfig para
 * controlar a dónde apunta el CTA, pero dejó de ser el titular: "En desarrollo"
 * como etiqueta dominante los hacía parecer promesas y no oferta.
 */
export default function ProductosUsers() {
  return (
    <section
      id="productos"
      aria-labelledby="productos-titulo"
      className="bg-[#F7F7F5] py-12 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#0A0A0A]/50">
              Productos USERS
            </span>
            <h2
              id="productos-titulo"
              className="text-[1.6rem] sm:text-3xl lg:text-[2.5rem] font-bold text-[#0A0A0A] leading-[1.15] mt-3 text-balance tracking-tight"
            >
              Software propio para industrias que conocemos
            </h2>
            <p className="text-[#555] text-[15px] lg:text-lg mt-4 leading-relaxed">
              Además del trabajo a la medida, desarrollamos plataformas para
              sectores concretos. Si tu negocio encaja en uno, es el camino más
              corto.
            </p>
          </div>
          <Link
            href="/productos"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#0A0A0A] border-b border-[#CCC] pb-1.5 pt-1.5 transition-colors hover:border-[#0A0A0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0A0A0A]"
          >
            Ver productos →
          </Link>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mt-6 lg:mt-10">
          {siteConfig.products.map((product) => {
            const presentation = PRODUCT_PRESENTATION[product.name]
            const cta = productCta(product.name, product.status)

            return (
              <li key={product.name}>
                <article className="bg-[#0A0A0A] text-white h-full flex flex-col">
                  {/* Portada del producto. Mientras no exista captura real,
                      MediaFrame pinta la identidad y lo que resuelve — nunca
                      un aviso de material pendiente. */}
                  <div className="p-3 sm:p-4 border-b border-[#1A1A1A]">
                    <MediaFrame slot={presentation.media} chrome={false} />
                  </div>

                  <div className="p-5 lg:p-7 flex flex-col flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#4cfc0f]">
                      Producto USERS · {product.vertical}
                    </p>

                    <div className="flex items-center gap-3 mt-3">
                      {presentation.logo ? (
                        <Image
                          src={presentation.logo}
                          alt={`Logotipo de ${product.name}`}
                          width={128}
                          height={24}
                          className="h-5 w-auto brightness-0 invert"
                        />
                      ) : (
                        <h3 className="text-xl font-bold tracking-[0.12em]">{product.name}</h3>
                      )}
                      {presentation.logo && <span className="sr-only">{product.name}</span>}
                    </div>

                    <p className="text-[#B0B0B0] text-sm lg:text-base mt-3 leading-relaxed">
                      {product.description}
                    </p>

                    <ul className="mt-5 space-y-2 flex-1">
                      {presentation.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2.5">
                          <span
                            className="text-[#4cfc0f] font-mono text-xs shrink-0 mt-0.5"
                            aria-hidden="true"
                          >
                            +
                          </span>
                          <span className="text-[#B0B0B0] text-[13px] leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA: mientras no esté live, pide acceso anticipado */}
                    <a
                      href={
                        cta.isExternal
                          ? product.url
                          : getWhatsAppLink(presentation.whatsappOrigin)
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cta="product_trial"
                      data-slug={product.name.toLowerCase()}
                      className="bg-[#4cfc0f] text-black font-bold px-6 py-3.5 text-sm inline-flex items-center justify-center gap-2.5 mt-6 transition-all hover:shadow-[0_0_28px_rgba(76,252,15,0.35)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {cta.label}
                      <span aria-hidden="true">→</span>
                    </a>
                    {!cta.isExternal && (
                      <p className="font-mono text-[10px] text-[#8A8A8A] mt-2.5 leading-relaxed">
                        Te contactamos para darte acceso anticipado
                      </p>
                    )}
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
