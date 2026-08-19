import Link from "next/link"
import type { Metadata } from "next"
import Header from "@/components/site/Header"
import Footer from "@/components/site/Footer"
import { AREAS, SOLUTIONS, solutionsByArea, type SolutionArea } from "@/lib/solutions"
import { siteConfig, defaultOgImage } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Soluciones — qué podemos construir para tu negocio | USERS",
  description:
    "Desarrollo web, software a medida, puntos de venta, cotizadores y portales para clientes. Cinco formas de resolver un problema concreto de tu negocio.",
  alternates: { canonical: "/soluciones" },
  openGraph: {
      images: [defaultOgImage],
    title: "Soluciones — qué podemos construir para tu negocio | USERS",
    description:
      "Desarrollo web, software a medida, puntos de venta, cotizadores y portales para clientes.",
    url: "/soluciones",
  },
}

const ORDER: SolutionArea[] = ["presencia", "operacion", "clientes"]

export default function SolucionesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Soluciones", item: `${siteConfig.url}/soluciones` },
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
        <header className="relative pt-28 pb-10 lg:pt-36 lg:pb-14 overflow-hidden">
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
              <span className="text-[#9E9E9E]">Soluciones</span>
            </nav>

            <h1 className="text-[1.85rem] sm:text-4xl lg:text-[3rem] font-bold leading-[1.12] mt-5 max-w-3xl text-balance tracking-tight">
              ¿Qué podemos construir para tu negocio?
            </h1>
            <p className="text-[#B0B0B0] text-[15px] lg:text-lg mt-4 lg:mt-5 max-w-2xl leading-relaxed">
              Cinco formas de resolver un problema concreto. Empieza por la que
              se parezca más a lo que te está costando trabajo hoy.
            </p>
          </div>
        </header>

        {/* Soluciones por área */}
        {ORDER.map((area) => {
          const list = solutionsByArea(area)
          return (
            <section
              key={area}
              aria-labelledby={`area-${area}`}
              className="py-10 lg:py-14 border-t border-[#1A1A1A]"
            >
              <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-4">
                  <h2 id={`area-${area}`} className="text-xl lg:text-2xl font-bold tracking-tight">
                    {AREAS[area].label}
                  </h2>
                  <p className="text-[#8A8A8A] text-sm mt-2 leading-relaxed max-w-xs">
                    {AREAS[area].body}
                  </p>
                </div>

                <ul className="lg:col-span-8 mt-5 lg:mt-0 space-y-3">
                  {list.map((solution) => (
                    <li key={solution.slug}>
                      <Link
                        href={`/soluciones/${solution.slug}`}
                        className="group block border border-[#222] bg-[#0E0E0E] p-5 lg:p-6 transition-colors hover:border-[#4cfc0f]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-bold group-hover:text-[#4cfc0f] transition-colors">
                              {solution.name}
                            </h3>
                            {/* La intención en primera persona: el visitante se
                                reconoce en la frase antes de leer la oferta. */}
                            <p className="text-[#4cfc0f] text-sm mt-1.5 italic">
                              «{solution.intent}»
                            </p>
                            <p className="text-[#B0B0B0] text-sm mt-2.5 leading-relaxed max-w-xl">
                              {solution.teaser}
                            </p>
                          </div>
                          <span className="text-[#4cfc0f] shrink-0 mt-1" aria-hidden="true">→</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )
        })}

        {/* Diferencia con los productos propios */}
        <section aria-labelledby="vs-productos" className="py-12 lg:py-20 border-t border-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="border border-[#222] bg-[#0E0E0E] p-6 lg:p-8 lg:grid lg:grid-cols-12 lg:gap-10 lg:items-center">
              <div className="lg:col-span-8">
                <h2 id="vs-productos" className="text-xl lg:text-2xl font-bold tracking-tight">
                  ¿Tu negocio es de fitness o de salud?
                </h2>
                <p className="text-[#B0B0B0] text-sm lg:text-base mt-3 leading-relaxed max-w-2xl">
                  Todo lo de arriba se construye alrededor de las necesidades
                  específicas de un cliente. Aparte de eso desarrollamos
                  productos propios para sectores concretos: si tu negocio encaja
                  en uno, quizá no necesites empezar desde cero.
                </p>
              </div>
              <div className="lg:col-span-4 mt-5 lg:mt-0 lg:text-right">
                <Link
                  href="/productos"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white border-b-2 border-[#4cfc0f] pb-2 pt-2 transition-colors hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
                >
                  Ver ACTIIVA y MEDIICA
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Evidencia */}
        <section aria-labelledby="evidencia" className="py-12 lg:py-16 border-t border-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <h2 id="evidencia" className="text-xl lg:text-2xl font-bold tracking-tight">
              Cada solución está respaldada por trabajo entregado
            </h2>
            <p className="text-[#8A8A8A] text-sm mt-2">
              {SOLUTIONS.length} soluciones · 3 casos de cliente
            </p>
            <Link
              href="/proyectos"
              className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-white border-b-2 border-[#4cfc0f] pb-2 pt-2 transition-colors hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
            >
              Ver los proyectos
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
