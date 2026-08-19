import Link from "next/link"
import type { Metadata } from "next"
import Header from "@/components/site/Header"
import Footer from "@/components/site/Footer"
import { postsByDate, readingTime, formatDate } from "@/lib/blog"
import { siteConfig, defaultOgImage } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Blog — notas sobre negocio digital y software | USERS",
  description:
    "Cómo evaluar si necesitas un sitio, un sistema o ninguno de los dos. Notas del equipo de USERS sobre desarrollo web, software a medida y operación de PyMEs.",
  alternates: { canonical: "/blog" },
  openGraph: {
      images: [defaultOgImage],
    title: "Blog — notas sobre negocio digital y software | USERS",
    description:
      "Notas del equipo de USERS sobre desarrollo web, software a medida y operación de negocios.",
    url: "/blog",
  },
}

export default function BlogIndexPage() {
  const posts = postsByDate()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
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
        <header className="relative pt-28 pb-8 lg:pt-36 lg:pb-12 overflow-hidden">
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
              <span className="text-[#9E9E9E]">Blog</span>
            </nav>

            <h1 className="text-[1.85rem] sm:text-4xl lg:text-[3rem] font-bold leading-[1.12] mt-5 max-w-3xl text-balance tracking-tight">
              Notas sobre negocio digital
            </h1>
            <p className="text-[#B0B0B0] text-[15px] lg:text-lg mt-4 max-w-2xl leading-relaxed">
              Cómo decidir qué construir, cuándo conviene y cuándo no. Escrito
              desde lo que vemos trabajando con negocios reales.
            </p>
          </div>
        </header>

        {/* Listado — sin miniaturas: el título y la categoría bastan para elegir */}
        <section aria-label="Artículos" className="pb-14 lg:pb-24">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <ul className="border-t border-[#1F1F1F] max-w-4xl">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block border-b border-[#1F1F1F] py-6 lg:py-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
                  >
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#8A8A8A]">
                      <span className="text-[#4cfc0f]">{post.category}</span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                      <span aria-hidden="true">·</span>
                      <span>{readingTime(post)} de lectura</span>
                    </p>
                    <h2 className="text-lg lg:text-xl font-bold mt-2 group-hover:text-[#4cfc0f] transition-colors text-balance">
                      {post.title}
                    </h2>
                    <p className="text-[#B0B0B0] text-sm mt-2 leading-relaxed max-w-2xl">
                      {post.intro}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-white mt-4">
                      Leer
                      <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
