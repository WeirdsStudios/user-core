import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Header from "@/components/site/Header"
import Footer from "@/components/site/Footer"
import MediaFrame from "@/components/ui/MediaFrame"
import { PROJECTS, getProject } from "@/lib/projects"
import { getSolution } from "@/lib/solutions"
import { siteConfig, defaultOgImage } from "@/lib/site-config"
import { getWhatsAppLink } from "@/lib/whatsapp"
import ViewTracker from "@/components/analytics/ViewTracker"

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: project.metaTitle,
    description: project.metaDescription,
    alternates: { canonical: `/proyectos/${project.slug}` },
    openGraph: {
      images: [defaultOgImage],
      title: project.metaTitle,
      description: project.metaDescription,
      url: `/proyectos/${project.slug}`,
      type: "article",
    },
  }
}

export default async function ProyectoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const others = PROJECTS.filter((p) => p.slug !== project.slug)
  const relatedSolutions = project.solutions
    .map((slug) => getSolution(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Proyectos", item: `${siteConfig.url}/proyectos` },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: `${siteConfig.url}/proyectos/${project.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <ViewTracker event="project_viewed" slug={project.slug} />
      <main className="bg-[#0A0A0A] text-white">
        {/* ── Encabezado ── */}
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
              <Link href="/proyectos" className="hover:text-white transition-colors py-1.5 inline-block">
                Proyectos
              </Link>
              <span className="mx-2 text-[#8A8A8A]" aria-hidden="true">/</span>
              <span className="text-[#9A9A9A]">{project.name}</span>
            </nav>

            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#4cfc0f] mt-6">
              {project.industry}
              {project.location ? ` · ${project.location}` : ""}
            </p>
            <h1 className="text-[1.85rem] sm:text-4xl lg:text-[3rem] font-bold leading-[1.12] mt-3 max-w-3xl text-balance tracking-tight">
              {project.name}
            </h1>
            <p className="text-white text-base lg:text-xl font-semibold mt-4 max-w-2xl leading-snug">
              {project.built}
            </p>
            <p className="text-[#9E9E9E] text-[15px] lg:text-lg mt-3 max-w-2xl leading-relaxed">
              {project.summary}
            </p>

            <ul className="flex flex-wrap gap-2 mt-6">
              {project.scope.map((tag) => (
                <li
                  key={tag}
                  className="font-mono text-[10px] text-[#8A8A8A] border border-[#2A2A2A] px-2 py-1"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </header>

        {/* ── Material del proyecto ── */}
        <section aria-label="Material del proyecto" className="pb-12 lg:pb-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div
              className={
                project.assets.length > 2
                  ? "grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6"
                  : project.assets.length > 1
                    ? "grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
                    : "max-w-4xl"
              }
            >
              {project.assets.map((asset) => (
                <MediaFrame
                  key={asset.caption}
                  slot={asset}
                  urlLabel={project.externalLabel ?? project.industry}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Contexto y reto ── */}
        <section aria-labelledby="contexto" className="py-12 lg:py-20 border-t border-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <h2 id="contexto" className="text-xl lg:text-2xl font-bold tracking-tight">
                El negocio y el reto
              </h2>
            </div>
            <div className="lg:col-span-8 mt-5 lg:mt-0 space-y-5">
              <p className="text-[#B0B0B0] text-[15px] lg:text-base leading-relaxed max-w-prose">
                {project.context}
              </p>
              <p className="text-[#B0B0B0] text-[15px] lg:text-base leading-relaxed max-w-prose">
                {project.challenge}
              </p>
            </div>
          </div>
        </section>

        {/* ── Qué construimos ── */}
        <section aria-labelledby="solucion" className="py-12 lg:py-20 border-t border-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <h2 id="solucion" className="text-xl lg:text-2xl font-bold tracking-tight">
                Qué construimos
              </h2>
            </div>
            <dl className="lg:col-span-8 mt-5 lg:mt-0 border-t border-[#1F1F1F]">
              {project.solution.map((item) => (
                <div key={item.label} className="border-b border-[#1F1F1F] py-5 lg:py-6">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#4cfc0f]">
                    {item.label}
                  </dt>
                  <dd className="text-[#B0B0B0] text-[15px] lg:text-base mt-2 leading-relaxed max-w-prose">
                    {item.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Qué demuestra ── */}
        <section aria-labelledby="demuestra" className="py-12 lg:py-20 border-t border-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <h2 id="demuestra" className="text-xl lg:text-2xl font-bold tracking-tight">
                Qué demuestra este caso
              </h2>
            </div>
            <div className="lg:col-span-8 mt-5 lg:mt-0">
              <ul className="space-y-4">
                {project.demonstrates.map((item) => (
                  <li key={item} className="flex gap-3 text-[#B0B0B0] text-[15px] lg:text-base leading-relaxed">
                    <span className="text-[#4cfc0f] font-mono shrink-0 mt-0.5" aria-hidden="true">—</span>
                    <span className="max-w-prose">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Cierra el circuito: del caso de vuelta a la solución que vende */}
              {relatedSolutions.length > 0 && (
                <div className="mt-8 pt-6 border-t border-[#1F1F1F]">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A8A8A]">
                    Soluciones que respalda este caso
                  </p>
                  <ul className="flex flex-wrap gap-2 mt-3">
                    {relatedSolutions.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/soluciones/${s.slug}`}
                          className="inline-flex items-center gap-2 font-mono text-[11px] text-white border border-[#2A2A2A] px-3 py-2 transition-colors hover:border-[#4cfc0f] hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cfc0f]"
                        >
                          {s.name}
                          <span aria-hidden="true">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section aria-labelledby="cta-proyecto" className="py-12 lg:py-20 border-t border-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <h2 id="cta-proyecto" className="text-[1.5rem] sm:text-2xl lg:text-3xl font-bold tracking-tight max-w-xl text-balance">
              ¿Tu negocio tiene un problema parecido?
            </h2>
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
                Hablar con nosotros
              </a>
              {project.externalUrl && (
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9A9A9A] font-semibold px-2 py-4 text-[15px] inline-flex items-center justify-center gap-2 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cfc0f]"
                >
                  Ver {project.externalLabel}
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* ── Otros casos ── */}
        <nav aria-label="Otros proyectos" className="py-12 lg:py-16 border-t border-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8A8A8A]">
              Otros proyectos
            </p>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/proyectos/${other.slug}`}
                    className="group flex items-baseline justify-between gap-4 border border-[#222] bg-[#0E0E0E] p-5 transition-colors hover:border-[#4cfc0f]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
                  >
                    <span>
                      <span className="block font-bold group-hover:text-[#4cfc0f] transition-colors">
                        {other.name}
                      </span>
                      <span className="block text-[#8A8A8A] text-xs mt-1">{other.built}</span>
                    </span>
                    <span className="text-[#4cfc0f] shrink-0" aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </main>
      <Footer />
    </>
  )
}
