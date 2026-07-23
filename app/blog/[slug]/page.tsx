import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog"

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} — users.mx`,
    description: post.intro,
    alternates: { canonical: `https://users.mx/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.intro,
      url: `https://users.mx/blog/${post.slug}`,
      type: "article",
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen bg-white">
      {/* Top nav */}
      <nav className="sticky top-0 z-10 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold tracking-wide text-[#0A0A0A]">
            ← users.mx
          </Link>
          <Link href="/#blog" className="text-xs text-[#888] hover:text-[#0A0A0A] transition-colors">
            Blog
          </Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#888] border border-[#E5E5E5] px-3 py-1 inline-block mb-6">
            Blog & Recursos
          </span>
          <h1 className="text-3xl lg:text-4xl font-bold text-[#0A0A0A] leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-[#888] mb-8">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readingTime} de lectura</span>
            <span>·</span>
            <span>{post.author}</span>
          </div>
          {/* Thumbnail */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 768px"
              priority
            />
          </div>
          {/* Intro */}
          <p className="text-lg text-[#444] leading-relaxed border-l-2 border-[#4cfc0f] pl-6">
            {post.intro}
          </p>
        </header>

        {/* Body */}
        <div className="space-y-10">
          {post.sections.map((section, i) => (
            <section key={i}>
              {section.heading && (
                <h2 className="text-xl font-bold text-[#0A0A0A] mb-4">
                  {section.heading}
                </h2>
              )}
              <div className="space-y-4">
                {section.body.split("\n\n").map((paragraph, j) => (
                  <p key={j} className="text-[#444] leading-relaxed text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-[#0A0A0A] p-8 text-white">
          <p className="text-[#4cfc0f] text-xs font-semibold uppercase tracking-widest mb-2">
            Siguiente paso
          </p>
          <h3 className="text-xl font-bold mb-3">
            Analiza tu negocio digital gratis
          </h3>
          <p className="text-[#888] text-sm mb-6 leading-relaxed">
            En 6 pasos te decimos qué necesitas, cuánto costaría y cuánto tiempo tomaría.
            Sin compromiso, sin ventas agresivas.
          </p>
          <Link
            href="/analisis"
            className="inline-flex items-center gap-2 bg-[#4cfc0f] text-black font-bold px-6 py-3 text-sm hover:opacity-90 transition-opacity"
          >
            Analiza tu negocio gratis →
          </Link>
        </div>

        {/* Bottom nav */}
        <div className="mt-10 pt-10 border-t border-[#E5E5E5] flex items-center justify-between">
          <Link
            href="/#blog"
            className="text-sm font-semibold text-[#888] hover:text-[#0A0A0A] transition-colors"
          >
            ← Todos los artículos
          </Link>
          <Link
            href="/"
            className="text-sm font-semibold text-[#888] hover:text-[#0A0A0A] transition-colors"
          >
            Ir a users.mx →
          </Link>
        </div>
      </article>
    </div>
  )
}
