import Link from "next/link"
import MediaFrame from "@/components/ui/MediaFrame"
import { PROJECTS } from "@/lib/projects"

/**
 * Bloque de evidencia de la home.
 *
 * Los tres casos reciben el mismo tratamiento: media, giro, qué se construyó,
 * qué problema resolvía y enlace al caso. Antes solo Greek Gym llevaba
 * grabación y los otros dos eran una lista de texto, lo que hacía parecer que
 * los otros proyectos existían menos.
 *
 * La narrativa completa vive en /proyectos/[slug], no aquí.
 */
export default function CasosHome() {
  return (
    <section
      id="proyectos"
      aria-labelledby="casos-titulo"
      className="bg-[#0A0A0A] text-white py-12 lg:py-20 border-t border-[#1A1A1A]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#4cfc0f]">
              Trabajo real
            </span>
            <h2
              id="casos-titulo"
              className="text-[1.6rem] sm:text-3xl lg:text-[2.5rem] font-bold leading-[1.15] mt-3 text-balance tracking-tight"
            >
              Tres negocios, tres problemas distintos
            </h2>
          </div>
          <Link
            href="/proyectos"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#9A9A9A] border-b border-[#333] pb-1.5 pt-1.5 transition-colors hover:text-white hover:border-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
          >
            Ver todos →
          </Link>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mt-6 lg:mt-10">
          {PROJECTS.map((project) => (
            <li key={project.slug}>
              <article className="h-full flex flex-col">
                <MediaFrame
                  slot={project.preview ?? project.assets[0]}
                  urlLabel={project.externalLabel ?? project.industry}
                  uniform
                />

                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#8A8A8A] mt-4">
                  {project.industry}
                  {project.location ? ` · ${project.location}` : ""}
                </p>
                <h3 className="text-lg lg:text-xl font-bold mt-1.5">{project.name}</h3>
                <p className="text-sm font-semibold text-[#4cfc0f] mt-1.5">{project.built}</p>
                <p className="text-[#B0B0B0] text-sm mt-2.5 leading-relaxed flex-1">
                  {project.summary}
                </p>

                <Link
                  href={`/proyectos/${project.slug}`}
                  className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-white border-b-2 border-[#4cfc0f] pb-2 pt-2 self-start transition-colors hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
                >
                  Ver caso
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
