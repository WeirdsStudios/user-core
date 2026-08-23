import Link from "next/link"
import type { Metadata } from "next"
import Header from "@/components/site/Header"
import Footer from "@/components/site/Footer"
import { siteConfig, defaultOgImage } from "@/lib/site-config"
import { getWhatsAppLink } from "@/lib/whatsapp"
import { PRODUCT_PRESENTATION, productCta } from "@/lib/products-media"
import ActiivaVisual from "@/components/products/ActiivaVisual"
import MediaFrame from "@/components/ui/MediaFrame"
import ViewTracker from "@/components/analytics/ViewTracker"

export const metadata: Metadata = {
  title: "Productos USERS — software especializado por industria | USERS",
  description:
    "ACTIIVA: la plataforma propia de USERS para negocios fitness, construida a partir del trabajo hecho con clientes reales.",
  alternates: { canonical: "/productos" },
  openGraph: {
      images: [defaultOgImage],
    title: "Productos USERS — software especializado por industria",
    description:
      "ACTIIVA, el producto propio de USERS para negocios fitness.",
    url: "/productos",
  },
}



export default function ProductosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Productos", item: `${siteConfig.url}/productos` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <ViewTracker event="product_viewed" slug={"productos"} />
      <main className="bg-[#0A0A0A] text-white">
        <section className="relative pt-28 pb-10 lg:pt-36 lg:pb-16 overflow-hidden">
          <div
            aria-hidden="true"
            className="grid-tech absolute inset-0 pointer-events-none"
            style={{
              maskImage: "radial-gradient(ellipse 90% 60% at 50% 0%, #000 30%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 90% 60% at 50% 0%, #000 30%, transparent 100%)",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <nav aria-label="Ruta de navegación" className="font-mono text-[11px] text-[#8A8A8A]">
              <Link href="/" className="hover:text-white transition-colors py-1.5 inline-block">
                Inicio
              </Link>
              <span className="mx-2 text-[#8A8A8A]" aria-hidden="true">/</span>
              <span className="text-[#9A9A9A]">Productos</span>
            </nav>

            <h1 className="text-[1.85rem] sm:text-4xl lg:text-[3rem] font-bold leading-[1.12] mt-5 max-w-3xl text-balance tracking-tight">
              Software propio, nacido de proyectos reales
            </h1>
            <p className="text-[#9E9E9E] text-[15px] lg:text-lg mt-4 lg:mt-5 max-w-2xl leading-relaxed">
              USERS convierte la experiencia de trabajar con varios negocios del
              mismo giro en software especializado. ACTIIVA es donde esa
              estrategia se ve completa: si tu negocio encaja, quizá no
              necesites empezar desde cero.
            </p>
          </div>
        </section>

        {/* Producto vigente */}
        <section aria-label="Productos de USERS" className="pb-14 lg:pb-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            {/*
              Un solo producto. No se enumera "1 de 2" ni se anuncia lo que no
              está: un catálogo enseña la oferta vigente. La composición 60/40
              le da a ACTIIVA el peso que tendría cualquier producto propio.
            */}
            {siteConfig.products.map((product) => {
              const presentation = PRODUCT_PRESENTATION[product.name]
              const cta = productCta(product.name, product.status)
              const href = cta.isExternal
                ? product.url
                : getWhatsAppLink(presentation.whatsappOrigin)

              return (
                <article
                  key={product.name}
                  className="lg:grid lg:grid-cols-12 lg:gap-10 lg:items-center"
                >
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
                    <h2 className="text-2xl lg:text-[2.25rem] font-bold tracking-tight mt-3">
                      {product.name}
                    </h2>
                    <p className="text-[#9E9E9E] text-[15px] lg:text-base mt-3.5 leading-relaxed">
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

                    <ul className="flex flex-wrap gap-1.5 mt-6 pt-6 border-t border-[#1F1F1F]">
                      {product.tags.map((tag) => (
                        <li
                          key={tag}
                          className="font-mono text-[10px] text-[#8A8A8A] border border-[#2A2A2A] px-2 py-1"
                        >
                          {tag}
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
              )
            })}

            {/* Puente al trabajo a medida */}
            <div className="mt-10 lg:mt-14 border border-[#222] bg-[#0E0E0E] p-6 lg:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#4cfc0f]">
                ¿Tu negocio no encaja en ninguno?
              </p>
              <p className="text-[#9E9E9E] text-sm lg:text-base mt-3 leading-relaxed max-w-2xl">
                Es lo más común. La mayor parte de nuestro trabajo son
                soluciones construidas alrededor de un negocio específico.
              </p>
              <Link
                href="/proyectos"
                className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-white border-b-2 border-[#4cfc0f] pb-2 pt-2 transition-colors hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
              >
                Ver proyectos a la medida
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
