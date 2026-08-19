import Link from "next/link"
import Image from "next/image"
import { siteConfig } from "@/lib/site-config"
import { PROJECTS } from "@/lib/projects"

/**
 * Separa las dos formas de comprar: trabajo a la medida y producto propio.
 *
 * Sin este bloque, ACTIIVA y MEDIICA se leían como "proyectos que hacemos
 * cuando no tenemos clientes". Puestos como una segunda vía de la oferta,
 * pasan a ser propiedad intelectual de USERS — y le dan al visitante de un
 * giro específico una entrada más rápida que empezar de cero.
 */
const productLogos: Record<string, string> = {
  ACTIIVA: "/logos/products/actiiva.svg",
}

const statusLabel: Record<string, string> = {
  "in-development": "En desarrollo",
  live: "Disponible",
}

export default function Oferta() {
  return (
    <section
      aria-labelledby="oferta-titulo"
      className="bg-[#F7F7F5] py-14 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#0A0A0A]/50">
            Cómo trabajar con nosotros
          </span>
          <h2
            id="oferta-titulo"
            className="text-[1.6rem] sm:text-3xl lg:text-[2.5rem] font-bold text-[#0A0A0A] leading-[1.15] mt-3 text-balance tracking-tight"
          >
            Dos caminos, según qué tan específico sea tu negocio
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8 mt-8 lg:mt-12">
          {/* ── A medida ── */}
          <article className="bg-white border border-[#E3E3DF] p-6 lg:p-8 flex flex-col">
            <span className="font-mono text-[11px] tnum text-[#4cfc0f] font-bold bg-[#0A0A0A] px-1.5 py-0.5 self-start">
              01
            </span>
            <h3 className="text-xl lg:text-2xl font-bold text-[#0A0A0A] mt-4 tracking-tight">
              A la medida
            </h3>
            <p className="text-[#0A0A0A] text-sm font-semibold mt-2 leading-snug">
              Diseñamos y construimos alrededor de cómo funciona tu negocio.
            </p>
            <p className="text-[#666] text-sm mt-3 leading-relaxed">
              Es la mayor parte de lo que hacemos. Empieza por donde más duele
              —un sitio, un cotizador, un sistema— y puede crecer después sin
              tirar lo anterior ni cambiar de proveedor.
            </p>

            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] mt-6 mb-2">
              Casos
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {PROJECTS.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/proyectos/${project.slug}`}
                    className="inline-block font-mono text-[10px] text-[#333] border border-[#DDD] px-2 py-1.5 transition-colors hover:border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
                  >
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/proyectos"
              className="inline-flex items-center gap-2 mt-auto text-sm font-semibold text-[#0A0A0A] border-b-2 border-[#4cfc0f] pb-2 pt-2 self-start transition-colors hover:text-[#4a4a4a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0A0A0A]"
            >
              Ver proyectos
              <span aria-hidden="true">→</span>
            </Link>
          </article>

          {/* ── Productos propios ── */}
          <article className="bg-[#0A0A0A] text-white border border-[#0A0A0A] p-6 lg:p-8 flex flex-col relative overflow-hidden">
            <span className="grid-tech absolute inset-0 opacity-70" aria-hidden="true" />
            <div className="relative flex flex-col flex-1">
              <span className="font-mono text-[11px] tnum text-black font-bold bg-[#4cfc0f] px-1.5 py-0.5 self-start">
                02
              </span>
              <h3 className="text-xl lg:text-2xl font-bold mt-4 tracking-tight">
                Productos USERS
              </h3>
              <p className="text-white text-sm font-semibold mt-2 leading-snug">
                Software especializado para una industria concreta.
              </p>
              <p className="text-[#9E9E9E] text-sm mt-3 leading-relaxed">
                Lo que aprendimos construyendo a la medida, empaquetado. Si tu
                negocio encaja, no necesitas empezar desde cero.
              </p>

              <ul className="mt-6 space-y-3 flex-1">
                {siteConfig.products.map((product) => (
                  <li
                    key={product.name}
                    className="border border-[#252525] bg-[#0E0E0E] p-4 flex items-center gap-4"
                  >
                    <span className="w-16 shrink-0 flex items-center justify-center">
                      {productLogos[product.name] ? (
                        <Image
                          src={productLogos[product.name]}
                          alt=""
                          width={64}
                          height={12}
                          className="w-full h-auto brightness-0 invert opacity-80"
                        />
                      ) : (
                        <span className="font-bold text-[11px] tracking-[0.14em] text-white/80">
                          {product.name}
                        </span>
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold">{product.name}</span>
                        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#4cfc0f] border border-[#4cfc0f]/30 px-1.5 py-0.5">
                          {statusLabel[product.status]}
                        </span>
                      </span>
                      <span className="block text-[#8A8A8A] text-xs mt-1.5 leading-relaxed">
                        {product.name === "ACTIIVA"
                          ? "Para negocios fitness"
                          : "Para servicios de salud"}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/productos"
                className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-white border-b-2 border-[#4cfc0f] pb-2 pt-2 self-start transition-colors hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
              >
                Ver productos
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
