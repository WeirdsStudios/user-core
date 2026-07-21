import { Box } from "lucide-react"

interface Project {
  name: string
  description: string
  tags: string[]
  featured?: boolean
  externalUrl?: string
  externalLabel?: string
}

const projects: Project[] = [
  {
    name: "Greek Gym",
    description:
      "Plataforma web y sistema de reservas para gimnasio boutique en Monterrey",
    tags: ["Desarrollo", "Diseño", "Sistema de reservas"],
  },
  {
    name: "Las Frescas",
    description:
      "Sitio web y menú digital para restaurante con pedidos en línea",
    tags: ["Desarrollo", "Diseño", "E-commerce"],
  },
  {
    name: "SoFit ★",
    description:
      "Plataforma administrativa para gimnasios — solución propia",
    tags: ["Producto Propio", "SaaS", "Fitness"],
    featured: true,
    externalUrl: "https://sofit.com.mx",
    externalLabel: "ver sofit.com.mx →",
  },
  {
    name: "Consulto ★",
    description:
      "Sistema de gestión para consultorios y clínicas — solución propia",
    tags: ["Producto Propio", "SaaS", "Salud"],
    featured: true,
    externalUrl: "https://consulto.com.mx",
    externalLabel: "ver consulto.com.mx →",
  },
]

export default function Portfolio() {
  return (
    <section id="trabajo" className="py-24 lg:py-32 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          {/* Left sticky */}
          <div className="lg:col-span-4 mb-12 lg:mb-0">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Box size={24} className="text-[#0A0A0A]" strokeWidth={1.5} />
              <h2 className="text-3xl lg:text-4xl font-bold mt-4 text-[#0A0A0A]">
                Trabajo que nos enorgullece
              </h2>
              <p className="text-[#888] mt-4 text-base leading-relaxed">
                Proyectos donde estrategia, diseño y desarrollo se integran para
                resolver problemas reales.
              </p>
              <a
                href="#trabajo"
                className="text-sm font-semibold underline mt-6 inline-block text-[#0A0A0A] hover:text-[#888] transition-colors"
              >
                Ver todos los proyectos →
              </a>
            </div>
          </div>

          {/* Right: cards */}
          <div className="lg:col-span-8 mt-8 space-y-6">
            {projects.map((project) => (
              <article
                key={project.name}
                className={`bg-white rounded-2xl border border-[#E5E5E5] p-8 hover:shadow-md transition-shadow ${
                  project.featured ? "ring-1 ring-[#C5F82A]/50" : ""
                }`}
              >
                <h3 className="text-xl font-bold text-[#0A0A0A]">
                  {project.name}
                </h3>
                <p className="text-[#888] mt-2 text-base leading-relaxed">
                  {project.description}
                </p>

                <div className="flex gap-2 mt-4 flex-wrap">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-[#F5F5F5] border border-[#E5E5E5] px-3 py-1 rounded-full text-[#555]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.externalUrl && (
                  <div className="mt-4">
                    <a
                      href={project.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#C5F82A] font-semibold hover:underline"
                    >
                      {project.externalLabel}
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
