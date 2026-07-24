import Image from "next/image"
import { BLOG_POSTS } from "@/lib/blog"
import GhostButton from "@/components/ui/GhostButton"

export default function Blog() {
  return (
    <section id="blog" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top row */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#888] border border-[#E5E5E5] px-3 py-1 inline-block">
            Blog & Recursos
          </span>
          <GhostButton
            href={`/blog/${BLOG_POSTS[0].slug}`}
            tone="light"
            size="compact"
            line1="Ver todos"
            line2="los artículos"
          />
        </div>

        <h2 className="text-3xl font-bold text-[#0A0A0A] mt-4">
          Lo que estamos aprendiendo y compartiendo
        </h2>

        {/* 4-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="border border-[#E5E5E5] rounded-2xl overflow-hidden hover:shadow-md transition-shadow flex flex-col group"
            >
              {/* Thumbnail */}
              <div className="aspect-[16/9] overflow-hidden relative">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <p className="text-xs text-[#888]">{post.date}</p>
                <h3 className="text-base font-semibold mt-2 leading-snug text-[#0A0A0A] flex-1">
                  {post.title}
                </h3>
                <div className="mt-4 pt-4 border-t border-[#F0F0F0] flex items-center justify-between">
                  <p className="text-xs text-[#888]">{post.author}</p>
                  <GhostButton
                    href={`/blog/${post.slug}`}
                    tone="light"
                    size="compact"
                    line1="Leer"
                    line2="artículo completo"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
