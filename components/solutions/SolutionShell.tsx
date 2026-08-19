import Link from "next/link"
import Header from "@/components/site/Header"
import Footer from "@/components/site/Footer"
import { siteConfig } from "@/lib/site-config"
import { getWhatsAppLink } from "@/lib/whatsapp"
import { SOLUTIONS, type Solution } from "@/lib/solutions"
import ViewTracker from "@/components/analytics/ViewTracker"

/**
 * Carcasa común de las landing de solución: breadcrumb, encabezado, cierre y
 * navegación cruzada.
 *
 * Deliberadamente NO impone la estructura del cuerpo. Cada landing responde
 * una intención distinta y su desarrollo central es propio — compartir la
 * carcasa mantiene la coherencia visual sin volverlas cinco clones.
 */
export function SolutionBreadcrumbJsonLd({ solution }: { solution: Solution }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Soluciones", item: `${siteConfig.url}/soluciones` },
      {
        "@type": "ListItem",
        position: 3,
        name: solution.name,
        item: `${siteConfig.url}/soluciones/${solution.slug}`,
      },
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function SolutionHeader({
  solution,
  eyebrow,
  h1,
  lede,
  proof,
}: {
  solution: Solution
  eyebrow: string
  h1: string
  lede: string
  /** Señal de evidencia en el primer viewport. */
  proof?: React.ReactNode
}) {
  return (
    <header className="relative pt-28 pb-10 lg:pt-36 lg:pb-14 overflow-hidden">
      <ViewTracker event="solution_viewed" slug={solution.slug} />
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
          <Link href="/soluciones" className="hover:text-white transition-colors py-1.5 inline-block">
            Soluciones
          </Link>
          <span className="mx-2 text-[#8A8A8A]" aria-hidden="true">/</span>
          <span className="text-[#9E9E9E]">{solution.name}</span>
        </nav>

        <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#4cfc0f] mt-6">
          {eyebrow}
        </p>
        <h1 className="text-[1.85rem] sm:text-4xl lg:text-[3rem] font-bold leading-[1.12] mt-3 max-w-3xl text-balance tracking-tight">
          {h1}
        </h1>
        <p className="text-[#B0B0B0] text-[15px] lg:text-lg mt-4 lg:mt-5 max-w-2xl leading-relaxed">
          {lede}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-7">
          <Link
            href="/analisis"
            className="group bg-[#4cfc0f] text-black font-bold px-6 py-4 text-[15px] inline-flex items-center justify-center gap-2.5 transition-all hover:shadow-[0_0_32px_rgba(76,252,15,0.4)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Analizar mi negocio
            <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
          </Link>
          <a
            href={getWhatsAppLink("hero")}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#2E2E2E] text-white font-semibold px-6 py-4 text-[15px] inline-flex items-center justify-center gap-2.5 transition-colors hover:border-[#4cfc0f] hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cfc0f]"
          >
            Hablar con USERS
          </a>
        </div>

        {proof && <div className="mt-8">{proof}</div>}
      </div>
    </header>
  )
}

/** Enlace a un caso, con el dato concreto que respalda la afirmación. */
export function EvidenceCard({
  slug,
  name,
  claim,
  detail,
}: {
  slug: string
  name: string
  claim: string
  detail: string
}) {
  return (
    <Link
      href={`/proyectos/${slug}`}
      className="group block border border-[#222] bg-[#0E0E0E] p-5 lg:p-6 transition-colors hover:border-[#4cfc0f]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#4cfc0f]">{claim}</p>
      <p className="text-[#B0B0B0] text-sm mt-2.5 leading-relaxed">{detail}</p>
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-white mt-4 group-hover:text-[#4cfc0f] transition-colors">
        Caso {name}
        <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
      </span>
    </Link>
  )
}

export function SolutionFaq({
  items,
}: {
  items: { q: string; a: React.ReactNode }[]
}) {
  return (
    <section aria-labelledby="faq-titulo" className="py-12 lg:py-20 border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <h2 id="faq-titulo" className="text-xl lg:text-2xl font-bold tracking-tight">
            Preguntas frecuentes
          </h2>
        </div>
        {/* Sin acordeón: son pocas y el contenido responde objeciones de compra
            — esconderlas detrás de un clic solo añade fricción. */}
        <dl className="lg:col-span-8 mt-5 lg:mt-0 border-t border-[#1F1F1F]">
          {items.map((item) => (
            <div key={item.q} className="border-b border-[#1F1F1F] py-5 lg:py-6">
              <dt className="text-[15px] lg:text-base font-bold text-white">{item.q}</dt>
              <dd className="text-[#B0B0B0] text-[15px] mt-2 leading-relaxed max-w-prose">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/** Cierre común: otras soluciones + CTA. */
export function SolutionFooterNav({ current }: { current: string }) {
  const others = SOLUTIONS.filter((s) => s.slug !== current)
  return (
    <>
      <section aria-labelledby="cta-solucion" className="py-12 lg:py-20 border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2
            id="cta-solucion"
            className="text-[1.5rem] sm:text-2xl lg:text-3xl font-bold tracking-tight max-w-xl text-balance"
          >
            ¿Lo platicamos?
          </h2>
          <p className="text-[#B0B0B0] text-[15px] lg:text-base mt-3 max-w-xl leading-relaxed">
            Si ya sabes qué necesitas, escríbenos. Si no, el análisis te da un
            punto de partida con un estimado en unos minutos.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Link
              href="/analisis"
              className="group bg-[#4cfc0f] text-black font-bold px-6 py-4 text-[15px] inline-flex items-center justify-center gap-2.5 transition-all hover:shadow-[0_0_32px_rgba(76,252,15,0.4)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Analizar mi negocio
              <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
            </Link>
            <a
              href={getWhatsAppLink("hero")}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#2E2E2E] text-white font-semibold px-6 py-4 text-[15px] inline-flex items-center justify-center gap-2.5 transition-colors hover:border-[#4cfc0f] hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cfc0f]"
            >
              Hablar con USERS
            </a>
          </div>
        </div>
      </section>

      <nav aria-label="Otras soluciones" className="py-12 lg:py-16 border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8A8A8A]">
            Otras soluciones
          </p>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/soluciones/${other.slug}`}
                  className="group flex items-baseline justify-between gap-4 border border-[#222] bg-[#0E0E0E] p-4 transition-colors hover:border-[#4cfc0f]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
                >
                  <span>
                    <span className="block font-bold text-sm group-hover:text-[#4cfc0f] transition-colors">
                      {other.name}
                    </span>
                    <span className="block text-[#8A8A8A] text-xs mt-1 leading-relaxed">
                      {other.intent}
                    </span>
                  </span>
                  <span className="text-[#4cfc0f] shrink-0" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}

export { Header, Footer }
