import Link from "next/link"
import type { Metadata } from "next"
import Header from "@/components/site/Header"
import Footer from "@/components/site/Footer"
import MediaFrame from "@/components/ui/MediaFrame"
import { PROJECTS } from "@/lib/projects"
import { siteConfig, defaultOgImage } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Proyectos — sistemas y experiencias que ya construimos | USERS",
  description:
    "Casos reales de USERS: sitio web y sistema administrativo para Greek Gym, punto de venta para el supermercado Llevelín y cotizador digital para Las Frescas.",
  alternates: { canonical: "/proyectos" },
  openGraph: {
      images: [defaultOgImage],
    title: "Proyectos — sistemas y experiencias que ya construimos | USERS",
    description:
      "Casos reales de desarrollo web y software para PyMEs mexicanas: Greek Gym, Llevelín y Las Frescas.",
    url: "/proyectos",
  },
}

export default function ProyectosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Proyectos", item: `${siteConfig.url}/proyectos` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="bg-[#0A0A0A] text-white">
        {/* Encabezado */}
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
              <span className="text-[#9A9A9A]">Proyectos</span>
            </nav>

            <h1 className="text-[1.85rem] sm:text-4xl lg:text-[3rem] font-bold leading-[1.12] mt-5 max-w-3xl text-balance tracking-tight">
              Sistemas y experiencias que ya construimos
            </h1>
            <p className="text-[#9E9E9E] text-[15px] lg:text-lg mt-4 lg:mt-5 max-w-2xl leading-relaxed">
              Tres negocios distintos, tres problemas distintos. Ninguno
              necesitaba lo mismo.
            </p>
          </div>
        </section>

        {/* Listado */}
        <section aria-label="Casos de cliente" className="pb-14 lg:pb-24">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {PROJECTS.map((project, i) => (
                <li key={project.slug}>
                  <article className="h-full flex flex-col">
                    {/* Mismo marco, misma barra y misma caja para los tres:
                        lo que debe distinguirlos es el trabajo, no el formato
                        del material disponible. */}
                    <MediaFrame
                      slot={project.assets[0]}
                      urlLabel={project.externalLabel ?? project.industry}
                      uniform
                    />

                    <div className="flex items-baseline gap-3 mt-4">
                      <span className="font-mono text-[11px] tnum text-[#4cfc0f]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h2 className="text-xl font-bold">{project.name}</h2>
                        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#8A8A8A] mt-1.5">
                          {project.industry}
                          {project.location ? ` · ${project.location}` : ""}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-[#4cfc0f] mt-3">{project.built}</p>
                    <p className="text-[#B0B0B0] text-sm mt-2 leading-relaxed flex-1">
                      {project.summary}
                    </p>

                    <Link
                      href={`/proyectos/${project.slug}`}
                      className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-white border-b-2 border-[#4cfc0f] pb-2 pt-2 self-start transition-colors hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
                    >
                      Ver caso
                      <span aria-hidden="true">→</span>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>

            {/* Puente a productos propios: evita que se confundan con clientes */}
            <div className="mt-10 lg:mt-14 border border-[#222] bg-[#0E0E0E] p-6 lg:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#4cfc0f]">
                También construimos producto propio
              </p>
              <p className="text-[#9E9E9E] text-sm lg:text-base mt-3 leading-relaxed max-w-2xl">
                Además del trabajo a la medida, desarrollamos plataformas
                especializadas para industrias concretas. Si tu negocio encaja
                en una de ellas, quizá no necesites empezar desde cero.
              </p>
              <Link
                href="/productos"
                className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-white border-b-2 border-[#4cfc0f] pb-2 pt-2 transition-colors hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
              >
                Ver productos USERS
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
