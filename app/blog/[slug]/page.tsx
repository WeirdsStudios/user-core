import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import Header from "@/components/site/Header"
import Footer from "@/components/site/Footer"
import {
  BLOG_POSTS,
  getPostBySlug,
  postsByDate,
  readingTime,
  formatDate,
} from "@/lib/blog"
import { getSolution } from "@/lib/solutions"
import { getProject } from "@/lib/projects"
import { siteConfig } from "@/lib/site-config"

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | USERS`,
    description: post.intro,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.intro,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      images: [post.thumbnail],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const solution = post.relatedSolution ? getSolution(post.relatedSolution) : undefined
  const projects = (post.relatedProjects ?? [])
    .map((s) => getProject(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
  const others = postsByDate().filter((p) => p.slug !== post.slug).slice(0, 2)

  /** BlogPosting + BreadcrumbList. Todo lo declarado es visible en la página. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.intro,
        image: `${siteConfig.url}${post.thumbnail}`,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        author: { "@type": "Organization", name: post.author, url: siteConfig.url },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
          logo: `${siteConfig.url}/logos/imagotipo_user.svg`,
        },
        mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
        articleSection: post.category,
        inLanguage: "es-MX",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: `${siteConfig.url}/blog/${post.slug}`,
          },
        ],
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
      <main className="bg-[#0A0A0A] text-white">
        <article>
          {/* Encabezado */}
          <header className="relative pt-28 pb-8 lg:pt-36 lg:pb-10 overflow-hidden">
            <div
              aria-hidden="true"
              className="grid-tech absolute inset-0 pointer-events-none"
              style={{
                maskImage: "radial-gradient(ellipse 90% 60% at 50% 0%, #000 30%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 90% 60% at 50% 0%, #000 30%, transparent 100%)",
              }}
            />
            <div className="relative max-w-3xl mx-auto px-5 sm:px-6">
              <nav aria-label="Ruta de navegación" className="font-mono text-[11px] text-[#8A8A8A]">
                <Link href="/" className="hover:text-white transition-colors py-1.5 inline-block">
                  Inicio
                </Link>
                <span className="mx-2 text-[#8A8A8A]" aria-hidden="true">/</span>
                <Link href="/blog" className="hover:text-white transition-colors py-1.5 inline-block">
                  Blog
                </Link>
              </nav>

              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#8A8A8A] mt-6">
                <span className="text-[#4cfc0f]">{post.category}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                <span aria-hidden="true">·</span>
                <span>{readingTime(post)} de lectura</span>
                <span aria-hidden="true">·</span>
                <span>{post.author}</span>
              </p>

              <h1 className="text-[1.85rem] sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.14] mt-4 text-balance tracking-tight">
                {post.title}
              </h1>
              <p className="text-[#B0B0B0] text-base lg:text-lg mt-5 leading-relaxed border-l-2 border-[#4cfc0f] pl-5">
                {post.intro}
              </p>
            </div>
          </header>

          {/* Cuerpo — medida de línea contenida para lectura cómoda */}
          <div className="max-w-3xl mx-auto px-5 sm:px-6 pb-12 lg:pb-16">
            <div className="relative aspect-[16/9] overflow-hidden border border-[#222] mb-10">
              <Image
                src={post.thumbnail}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>

            <div className="space-y-9">
              {post.sections.map((section, i) => (
                <section key={i}>
                  {section.heading && (
                    <h2 className="text-xl lg:text-2xl font-bold tracking-tight mb-3 text-balance">
                      {section.heading}
                    </h2>
                  )}
                  <div className="space-y-4">
                    {section.body.split("\n\n").map((paragraph, j) => (
                      <p
                        key={j}
                        className="text-[#B8B8B8] leading-[1.75] text-[16px] lg:text-[17px] max-w-[68ch]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Enlaces relacionados */}
            {(solution || projects.length > 0) && (
              <aside
                aria-labelledby="relacionado"
                className="mt-12 pt-8 border-t border-[#1F1F1F]"
              >
                <h2
                  id="relacionado"
                  className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A8A8A]"
                >
                  Relacionado
                </h2>
                <ul className="mt-4 space-y-3">
                  {solution && (
                    <li>
                      <Link
                        href={`/soluciones/${solution.slug}`}
                        className="group flex items-baseline justify-between gap-4 border border-[#222] bg-[#0E0E0E] p-4 transition-colors hover:border-[#4cfc0f]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
                      >
                        <span>
                          <span className="block font-bold text-sm group-hover:text-[#4cfc0f] transition-colors">
                            {solution.name}
                          </span>
                          <span className="block text-[#8A8A8A] text-xs mt-1 leading-relaxed">
                            {solution.teaser}
                          </span>
                        </span>
                        <span className="text-[#4cfc0f] shrink-0" aria-hidden="true">→</span>
                      </Link>
                    </li>
                  )}
                  {projects.map((project) => (
                    <li key={project.slug}>
                      <Link
                        href={`/proyectos/${project.slug}`}
                        className="group flex items-baseline justify-between gap-4 border border-[#222] bg-[#0E0E0E] p-4 transition-colors hover:border-[#4cfc0f]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
                      >
                        <span>
                          <span className="block font-bold text-sm group-hover:text-[#4cfc0f] transition-colors">
                            Caso {project.name}
                          </span>
                          <span className="block text-[#8A8A8A] text-xs mt-1 leading-relaxed">
                            {project.built}
                          </span>
                        </span>
                        <span className="text-[#4cfc0f] shrink-0" aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            {/* CTA — depende del artículo */}
            <div className="mt-10 border border-[#4cfc0f]/40 bg-[#0E0E0E] p-6 lg:p-7 relative corner-marks">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#4cfc0f]">
                Siguiente paso
              </p>
              <p className="text-[#B0B0B0] text-[15px] mt-3 leading-relaxed max-w-prose">
                {solution
                  ? `Si lo que leíste se parece a tu situación, el análisis te dice qué necesitas y cuánto costaría — o puedes ir directo a ${solution.name.toLowerCase()}.`
                  : "Si quieres saber qué necesita tu negocio y cuánto costaría, el análisis te lo dice en unos minutos."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-5">
                <Link
                  href="/analisis"
                  className="bg-[#4cfc0f] text-black font-bold px-6 py-3.5 text-sm inline-flex items-center justify-center gap-2.5 transition-all hover:shadow-[0_0_28px_rgba(76,252,15,0.35)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Analizar mi negocio
                  <span aria-hidden="true">→</span>
                </Link>
                {solution && (
                  <Link
                    href={`/soluciones/${solution.slug}`}
                    className="border border-[#2E2E2E] text-white font-semibold px-6 py-3.5 text-sm inline-flex items-center justify-center gap-2.5 transition-colors hover:border-[#4cfc0f] hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cfc0f]"
                  >
                    Ver {solution.name.toLowerCase()}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </article>

        {/* Otros artículos */}
        <nav aria-label="Otros artículos" className="py-12 lg:py-16 border-t border-[#1A1A1A]">
          <div className="max-w-3xl mx-auto px-5 sm:px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A8A8A]">
              Seguir leyendo
            </p>
            <ul className="mt-4 space-y-3">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/blog/${other.slug}`}
                    className="group flex items-baseline justify-between gap-4 border border-[#222] bg-[#0E0E0E] p-4 transition-colors hover:border-[#4cfc0f]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
                  >
                    <span>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-[#4cfc0f]">
                        {other.category}
                      </span>
                      <span className="block font-bold text-sm mt-1 group-hover:text-[#4cfc0f] transition-colors">
                        {other.title}
                      </span>
                    </span>
                    <span className="text-[#4cfc0f] shrink-0" aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-white border-b-2 border-[#4cfc0f] pb-2 pt-2 transition-colors hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
            >
              Ver todos los artículos
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </nav>
      </main>
      <Footer />
    </>
  )
}
