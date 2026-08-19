import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import Header from "@/components/site/Header"
import Footer from "@/components/site/Footer"
import { siteConfig, defaultOgImage } from "@/lib/site-config"
import { getWhatsAppLink } from "@/lib/whatsapp"
import ViewTracker from "@/components/analytics/ViewTracker"

export const metadata: Metadata = {
  title: "Productos USERS — software especializado por industria | USERS",
  description:
    "ACTIIVA para negocios fitness y MEDIICA para servicios de salud: plataformas propias de USERS construidas a partir del trabajo hecho con clientes reales.",
  alternates: { canonical: "/productos" },
  openGraph: {
      images: [defaultOgImage],
    title: "Productos USERS — software especializado por industria",
    description:
      "ACTIIVA para negocios fitness y MEDIICA para servicios de salud. Productos propios de USERS.",
    url: "/productos",
  },
}

/** Logotipo propio cuando existe; si no, tratamiento tipográfico. */
const productLogos: Record<string, string> = {
  ACTIIVA: "/logos/products/actiiva.svg",
}

const statusLabel: Record<string, string> = {
  "in-development": "En desarrollo",
  live: "Disponible",
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
              Software especializado por industria
            </h1>
            <p className="text-[#9E9E9E] text-[15px] lg:text-lg mt-4 lg:mt-5 max-w-2xl leading-relaxed">
              Construimos a la medida, detectamos qué se repite entre negocios
              del mismo giro y lo convertimos en producto. Si tu negocio encaja
              en uno de ellos, quizá no necesites empezar desde cero.
            </p>
          </div>
        </section>

        {/* Productos */}
        <section aria-label="Productos de USERS" className="pb-14 lg:pb-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8">
              {siteConfig.products.map((product) => {
                const logo = productLogos[product.name]
                const isLive = product.status === "live"

                return (
                  <li key={product.name}>
                    <article className="border border-[#222] bg-[#0E0E0E] h-full flex flex-col">
                      {/* Marca */}
                      <div className="relative aspect-[16/9] flex items-center justify-center overflow-hidden border-b border-[#1F1F1F]">
                        <span className="grid-tech absolute inset-0 opacity-60" aria-hidden="true" />
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 opacity-20"
                          style={{
                            background: "radial-gradient(ellipse at center, #4cfc0f 0%, transparent 65%)",
                          }}
                        />
                        {logo ? (
                          <Image
                            src={logo}
                            alt={`Logotipo de ${product.name}`}
                            width={220}
                            height={40}
                            className="relative w-[45%] max-w-[220px] h-auto brightness-0 invert opacity-90"
                          />
                        ) : (
                          <span className="relative font-bold text-2xl sm:text-3xl tracking-[0.2em] text-white/90">
                            {product.name}
                          </span>
                        )}
                      </div>

                      <div className="p-6 lg:p-8 flex flex-col flex-1">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h2 className="text-xl font-bold">{product.name}</h2>
                          <span
                            className={`font-mono text-[9px] font-bold uppercase tracking-[0.14em] px-2 py-1 ${
                              isLive
                                ? "bg-[#4cfc0f] text-black"
                                : "border border-[#4cfc0f]/40 text-[#4cfc0f]"
                            }`}
                          >
                            {statusLabel[product.status]}
                          </span>
                        </div>

                        <p className="text-[#9E9E9E] text-sm lg:text-base mt-3 leading-relaxed flex-1">
                          {product.description}
                        </p>

                        <ul className="flex flex-wrap gap-1.5 mt-5 pt-5 border-t border-[#1F1F1F]">
                          {product.tags.map((tag) => (
                            <li
                              key={tag}
                              className="font-mono text-[10px] text-[#8A8A8A] border border-[#2A2A2A] px-2 py-1"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>

                        {isLive ? (
                          <a
                            href={product.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cta="product_trial"
                            data-slug={product.name.toLowerCase()}
                            className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-white border-b-2 border-[#4cfc0f] pb-2 pt-2 self-start transition-colors hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
                          >
                            Ver {product.urlLabel}
                            <span aria-hidden="true">→</span>
                          </a>
                        ) : (
                          <a
                            href={getWhatsAppLink(
                              product.name === "ACTIIVA" ? "actiiva" : "mediica"
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cta="product_trial"
                            data-slug={product.name.toLowerCase()}
                            className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-white border-b-2 border-[#4cfc0f] pb-2 pt-2 self-start transition-colors hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
                          >
                            Avísame cuando esté lista
                            <span aria-hidden="true">→</span>
                          </a>
                        )}
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>

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
