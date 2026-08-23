import Link from "next/link"
import { siteConfig } from "@/lib/site-config"
import { PRODUCT_PRESENTATION, productCta } from "@/lib/products-media"
import { getWhatsAppLink } from "@/lib/whatsapp"
import ActiivaVisual from "@/components/products/ActiivaVisual"
import MediaFrame from "@/components/ui/MediaFrame"

/**
 * Producto propio de USERS.
 *
 * Antes eran dos tarjetas al 50%. Con un solo producto vigente, esa rejilla
 * dejaría una card solitaria con un hueco al lado y se leería como si faltara
 * algo. Aquí ACTIIVA ocupa una composición 60/40 y gana peso: el producto se
 * ve más importante que cuando compartía la fila.
 *
 * La sección no anuncia productos ausentes. Un catálogo enseña lo que hay.
 */
export default function ProductosUsers() {
  const product = siteConfig.products[0]
  if (!product) return null

  const presentation = PRODUCT_PRESENTATION[product.name]
  const cta = productCta(product.name, product.status)
  const href = cta.isExternal ? product.url : getWhatsAppLink(presentation.whatsappOrigin)

  return (
    <section
      id="productos"
      aria-labelledby="productos-titulo"
      className="bg-[#0E0E0E] text-white py-12 lg:py-20 border-t border-[#1A1A1A]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#4cfc0f]">
              Software propio de USERS
            </span>
            <h2
              id="productos-titulo"
              className="text-[1.6rem] sm:text-3xl lg:text-[2.5rem] font-bold leading-[1.15] mt-3 text-balance tracking-tight"
            >
              Cuando un giro se repite, lo convertimos en producto
            </h2>
            <p className="text-[#B0B0B0] text-[15px] lg:text-lg mt-4 leading-relaxed">
              Trabajar con varios negocios del mismo sector deja ver los mismos
              problemas una y otra vez. Ahí deja de tener sentido construir
              desde cero cada vez.
            </p>
          </div>
          <Link
            href="/productos"
            className="font-mono text-[11px] text-white border-b border-[#4cfc0f] pb-1.5 pt-2 hover:text-[#4cfc0f] transition-colors shrink-0"
          >
            Ver productos →
          </Link>
        </div>

        <article className="mt-8 lg:mt-12 lg:grid lg:grid-cols-12 lg:gap-10 lg:items-center">
          {/* Media real si existe; si no, la composición propia de ACTIIVA */}
          <div className="lg:col-span-7">
            {presentation.media.placeholder ? (
              <ActiivaVisual logo={presentation.logo} />
            ) : (
              <MediaFrame slot={presentation.media} chrome={false} />
            )}
          </div>

          <div className="lg:col-span-5 mt-6 lg:mt-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#4cfc0f]">
              Producto USERS · {product.vertical}
            </p>
            <h3 className="text-2xl lg:text-[2rem] font-bold tracking-tight mt-3">
              {product.name}
            </h3>
            <p className="text-[#B0B0B0] text-[15px] lg:text-base mt-3.5 leading-relaxed">
              {product.description}
            </p>

            <ul className="mt-6 space-y-2.5">
              {presentation.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5">
                  <span
                    className="text-[#4cfc0f] font-mono text-xs shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    +
                  </span>
                  <span className="text-[#B0B0B0] text-sm leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>

            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="product_trial"
              data-slug={product.name.toLowerCase()}
              className="bg-[#4cfc0f] text-black font-bold px-6 py-3.5 text-sm inline-flex items-center justify-center gap-2.5 mt-7 transition-all hover:shadow-[0_0_28px_rgba(76,252,15,0.35)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {cta.label}
              <span aria-hidden="true">→</span>
            </a>
            {!cta.isExternal && (
              <p className="text-[#8A8A8A] text-[13px] mt-3 leading-relaxed">
                Solicita acceso y te contactamos para conocer tu negocio.
              </p>
            )}
          </div>
        </article>
      </div>
    </section>
  )
}
