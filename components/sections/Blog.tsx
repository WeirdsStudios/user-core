interface BlogPost {
  date: string
  title: string
  author: string
}

const posts: BlogPost[] = [
  {
    date: "Julio 2026",
    title: "Por qué tu negocio necesita más que un sitio web bonito",
    author: "Equipo users.mx",
  },
  {
    date: "Julio 2026",
    title: "Cómo SoFit resolvió el problema de administración de un gimnasio real",
    author: "Equipo users.mx",
  },
  {
    date: "Junio 2026",
    title: "El costo real de no tener un sistema de gestión para tu negocio",
    author: "Equipo users.mx",
  },
  {
    date: "Junio 2026",
    title: "Diseño vs. desarrollo: por qué separarlos es el error más caro",
    author: "Equipo users.mx",
  },
]

export default function Blog() {
  return (
    <section id="blog" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top row */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#888]">
            Blog & Recursos
          </p>
          <a
            href="#blog"
            className="text-sm font-semibold underline text-[#0A0A0A] hover:text-[#888] transition-colors"
          >
            Ver todos →
          </a>
        </div>

        <h2 className="text-3xl font-bold text-[#0A0A0A] mt-2">
          Lo que estamos aprendiendo y compartiendo
        </h2>

        {/* 4-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {posts.map((post, index) => (
            <article
              key={index}
              className="border border-[#E5E5E5] rounded-2xl p-6 hover:shadow-sm transition-shadow flex flex-col"
            >
              <p className="text-xs text-[#888]">{post.date}</p>
              <h3 className="text-base font-semibold mt-2 leading-snug text-[#0A0A0A] flex-1">
                {post.title}
              </h3>
              <p className="text-xs text-[#888] mt-4">{post.author}</p>
              <a
                href="#blog"
                className="text-xs text-[#C5F82A] font-semibold mt-3 inline-block hover:underline"
              >
                Leer más →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
