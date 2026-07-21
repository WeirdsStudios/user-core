import BrowserFrame from "@/components/ui/BrowserFrame"

interface Project {
  name: string
  description: string
  tags: string[]
  featured?: boolean
  externalUrl?: string
  externalLabel?: string
  /** Screenshot shown inside the BrowserFrame.
   *  Replace with an actual project screenshot when available. */
  screenshotSrc: string
  urlLabel?: string
}

const projects: Project[] = [
  {
    name: "Greek Gym",
    description:
      "Plataforma web y sistema de reservas para gimnasio boutique en Monterrey",
    tags: ["Desarrollo", "Diseño", "Sistema de reservas"],
    screenshotSrc: "/imgs/portfolio/sec-3-project-1.webp",
    urlLabel: "greek-gym.com.mx",
  },
  {
    name: "Las Frescas",
    description:
      "Sitio web y menú digital para restaurante con pedidos en línea",
    tags: ["Desarrollo", "Diseño", "E-commerce"],
    screenshotSrc: "/imgs/portfolio/sec-3-project-2.webp",
    urlLabel: "lasfrescas.mx",
  },
  {
    name: "SoFit ★",
    description:
      "Plataforma administrativa para gimnasios — solución propia",
    tags: ["Producto Propio", "SaaS", "Fitness"],
    featured: true,
    externalUrl: "https://sofit.com.mx",
    externalLabel: "ver sofit.com.mx →",
    screenshotSrc: "/imgs/portfolio/sec-3-project-3.webp",
    urlLabel: "sofit.com.mx",
  },
  {
    name: "Consulto ★",
    description:
      "Sistema de gestión para consultorios y clínicas — solución propia",
    tags: ["Producto Propio", "SaaS", "Salud"],
    featured: true,
    externalUrl: "https://consulto.com.mx",
    externalLabel: "ver consulto.com.mx →",
    screenshotSrc: "/imgs/portfolio/sec-3-project-4.webp",
    urlLabel: "consulto.com.mx",
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
              <span className="text-xs tracking-widest uppercase text-[#888] border border-[#CCC] px-3 py-1 inline-block mb-6">
                Portafolio
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0A] leading-tight">
                Trabajo que nos enorgullece
              </h2>
              <p className="text-[#888] mt-4 text-base leading-relaxed">
                Proyectos donde estrategia, diseño y desarrollo se integran para
                resolver problemas reales.
              </p>
              <a
                href="#trabajo"
                className="inline-flex items-center gap-2 text-sm font-semibold mt-6 text-[#0A0A0A] hover:text-[#888] transition-colors"
              >
                Ver todos los proyectos
                <span aria-hidden="true">→</span>
              </a>

              {/* Decorative preview image */}
              <div className="mt-10 hidden lg:block">
                <img
                  src="/imgs/portfolio/sec-3-project-5.webp"
                  alt=""
                  aria-hidden="true"
                  className="w-full aspect-[4/3] object-cover rounded-xl opacity-80"
                />
              </div>
            </div>
          </div>

          {/* Right: project cards with BrowserFrame */}
          <div className="lg:col-span-8 space-y-8">
            {projects.map((project) => (
              <article
                key={project.name}
                className={`bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden hover:shadow-lg transition-shadow ${
                  project.featured ? "ring-1 ring-[#4cfc0f]/40" : ""
                }`}
              >
                {/* Browser mockup as project screenshot */}
                <div className="p-4 bg-[#F9F9F9] border-b border-[#E5E5E5]">
                  <BrowserFrame
                    screenshotSrc={project.screenshotSrc}
                    screenshotAlt={project.name}
                    urlLabel={project.urlLabel}
                    className="shadow-none border-[#E0E0E0]"
                  />
                </div>

                {/* Card body */}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-[#0A0A0A]">
                    {project.name}
                  </h3>
                  <p className="text-[#888] mt-2 text-base leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between mt-4 gap-4 flex-wrap">
                    <div className="flex gap-2 flex-wrap">
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
                      <a
                        href={project.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#4cfc0f] font-semibold hover:underline shrink-0"
                      >
                        {project.externalLabel}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
