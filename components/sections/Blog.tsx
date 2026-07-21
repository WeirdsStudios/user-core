const posts = [
  {
    date: "Julio 2026",
    title: "Por qué tu negocio necesita más que un sitio web bonito",
    author: "Equipo users.mx",
    thumbnail: "/imgs/blog/thumb-1.webp",
  },
  {
    date: "Julio 2026",
    title: "Cómo SoFit resolvió el problema de administración de un gimnasio real",
    author: "Equipo users.mx",
    thumbnail: "/imgs/blog/thumb-2.webp",
  },
  {
    date: "Junio 2026",
    title: "El costo real de no tener un sistema de gestión para tu negocio",
    author: "Equipo users.mx",
    thumbnail: "/imgs/blog/thumb-3.webp",
  },
  {
    date: "Junio 2026",
    title: "Diseño vs. desarrollo: por qué separarlos es el error más caro",
    author: "Equipo users.mx",
    thumbnail: "/imgs/blog/thumb-4.webp",
  },
]

export default function Blog() {
  return (
    <section id="blog" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top row */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#888] border border-[#E5E5E5] px-3 py-1 inline-block">
            Blog & Recursos
          </span>
          <a
            href="#blog"
            className="text-sm font-semibold underline text-[#0A0A0A] hover:text-[#888] transition-colors"
          >
            Ver todos →
          </a>
        </div>

        <h2 className="text-3xl font-bold text-[#0A0A0A] mt-4">
          Lo que estamos aprendiendo y compartiendo
        </h2>

        {/* 4-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {posts.map((post, index) => (
            <article
              key={index}
              className="border border-[#E5E5E5] rounded-2xl overflow-hidden hover:shadow-md transition-shadow flex flex-col group"
            >
              {/* Thumbnail */}
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                  <a
                    href="#blog"
                    className="text-xs text-[#4cfc0f] font-semibold hover:underline"
                  >
                    Leer →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
