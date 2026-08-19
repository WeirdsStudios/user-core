import Image from "next/image"
import BrowserFrame, { type FrameVideo } from "@/components/ui/BrowserFrame"
import { siteConfig } from "@/lib/site-config"
import { getWhatsAppLink } from "@/lib/whatsapp"

/**
 * Proyectos de cliente. Greek Gym vive aparte, en CasoDestacado.
 * Fase 4 los convertirá en /proyectos/[slug]; el dato ya está estructurado.
 */
interface Work {
  name: string
  built: string
  problem: string
  tags: string[]
  video: FrameVideo
  urlLabel: string
  externalUrl: string
}

const works: Work[] = [
  {
    name: "Las Frescas",
    built: "Sitio web + cotizador",
    problem:
      "Cotizaban barras para eventos una por una por WhatsApp. Ahora el cliente arma su cotización en el sitio y llega con la decisión tomada.",
    tags: ["Sitio web", "Cotizador", "Catálogo"],
    video: { name: "lasfrescas" },
    urlLabel: "lasfrescas.vercel.app",
    externalUrl: "https://lasfrescas.vercel.app",
  },
]

/**
 * Productos propios. Todavía no hay capturas de ACTIIVA ni de MEDIICA, así que
 * la card usa un tratamiento gráfico propio en lugar de una captura falsa.
 *
 * PARA SUSTITUIR CUANDO HAYA CAPTURAS:
 *   1. Coloca la grabación en public/imgs/video/{actiiva|mediica}.webm + .mp4
 *      y el póster en {actiiva|mediica}-poster.webp
 *   2. Añade `video: { name: "actiiva" }` al objeto correspondiente de abajo.
 *   3. El componente detecta el video y reemplaza el placeholder solo.
 */
const productMedia: Record<string, { video?: FrameVideo; logo?: string }> = {
  ACTIIVA: { logo: "/logos/products/actiiva.svg" },
  MEDIICA: {},
}

function ProductPlaceholder({ name, logo }: { name: string; logo?: string }) {
  return (
    <div className="relative aspect-[16/9] bg-[#0D0D0D] border border-[#282828] overflow-hidden flex items-center justify-center">
      <div className="grid-tech absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20"
        style={{ background: "radial-gradient(ellipse at center, #4cfc0f 0%, transparent 65%)" }}
      />
      {logo ? (
        <Image
          src={logo}
          alt={`Logotipo de ${name}`}
          width={200}
          height={36}
          className="relative w-[45%] max-w-[200px] h-auto brightness-0 invert opacity-90"
        />
      ) : (
        <span className="relative font-bold text-2xl sm:text-3xl tracking-[0.2em] text-white/90">
          {name}
        </span>
      )}
      <span className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-[0.14em] text-[#8A8A8A]">
        Vista previa pendiente
      </span>
    </div>
  )
}

export default function Portfolio() {
  return (
    <section id="trabajo" className="bg-[#0A0A0A] text-white pb-14 lg:pb-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* ── Otros proyectos de cliente ── */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold border-t border-[#1F1F1F] pt-10 lg:pt-14">
          Otros proyectos
        </h2>

        {/* Con un solo proyecto, la card va a lo ancho en dos columnas: un grid
            de dos con una sola card deja media fila vacía. */}
        <div className={works.length > 1 ? "grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8 mt-6 lg:mt-10" : "mt-6 lg:mt-10"}>
          {works.map((work) => (
            <article
              key={work.name}
              className={`border border-[#222] bg-[#0E0E0E] ${
                works.length > 1 ? "flex flex-col" : "lg:grid lg:grid-cols-12 lg:items-center"
              }`}
            >
              <div
                className={`p-3 sm:p-4 border-b border-[#1F1F1F] ${
                  works.length > 1 ? "" : "lg:col-span-7 lg:border-b-0 lg:border-r"
                }`}
              >
                <BrowserFrame
                  video={work.video}
                  screenshotAlt={`Vista de ${work.name}`}
                  urlLabel={work.urlLabel}
                  className="border-[#282828]"
                />
              </div>
              <div
                className={`p-5 sm:p-7 flex flex-col ${
                  works.length > 1 ? "flex-1" : "lg:col-span-5 lg:p-8"
                }`}
              >
                <h3 className="text-lg lg:text-xl font-bold">{work.name}</h3>
                <p className="text-sm font-semibold text-[#4cfc0f] mt-2">{work.built}</p>
                <p className="text-[#8E8E8E] text-sm mt-3 leading-relaxed flex-1">{work.problem}</p>
                <div className="flex flex-wrap gap-1.5 mt-5 pt-5 border-t border-[#1F1F1F]">
                  {work.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[10px] text-[#8A8A8A] border border-[#2A2A2A] px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={work.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-white border-b-2 border-[#4cfc0f] pb-2 pt-2 self-start transition-colors hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
                >
                  Ver {work.urlLabel}
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* ── Productos propios ── */}
        <div className="mt-14 lg:mt-24">
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#4cfc0f]">
              Productos propios
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-3">
              Lo que aprendimos con clientes, convertido en producto
            </h2>
            <p className="text-[#8E8E8E] text-sm lg:text-base mt-3 leading-relaxed">
              Construimos a la medida, detectamos el patrón y lo empaquetamos
              para negocios con la misma necesidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8 mt-6 lg:mt-10">
            {siteConfig.products.map((product) => {
              const media = productMedia[product.name] ?? {}
              const isLive = product.status === "live"

              return (
                <article key={product.name} className="border border-[#222] bg-[#0E0E0E] flex flex-col">
                  <div className="p-3 sm:p-4 border-b border-[#1F1F1F]">
                    {media.video ? (
                      <BrowserFrame
                        video={media.video}
                        screenshotAlt={`Vista de ${product.name}`}
                        urlLabel={product.urlLabel}
                        className="border-[#282828]"
                      />
                    ) : (
                      <ProductPlaceholder name={product.name} logo={media.logo} />
                    )}
                  </div>

                  <div className="p-5 sm:p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-lg font-bold">{product.name}</h3>
                      {!isLive && (
                        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] bg-[#4cfc0f] text-black px-2 py-1">
                          En desarrollo
                        </span>
                      )}
                    </div>
                    <p className="text-[#8E8E8E] text-sm mt-3 leading-relaxed flex-1">
                      {product.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-5 pt-5 border-t border-[#1F1F1F]">
                      {product.tags.map((tag) => (
                        <span key={tag} className="font-mono text-[10px] text-[#8A8A8A] border border-[#2A2A2A] px-2 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {isLive ? (
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-white border-b-2 border-[#4cfc0f] pb-2 pt-2 self-start transition-colors hover:text-[#4cfc0f]"
                      >
                        Ver {product.urlLabel}
                        <span aria-hidden="true">→</span>
                      </a>
                    ) : (
                      <a
                        href={getWhatsAppLink(product.name === "ACTIIVA" ? "actiiva" : "mediica")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-[#9A9A9A] border-b border-[#333] pb-2 pt-2 self-start transition-colors hover:text-white hover:border-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
                      >
                        Avísame cuando esté lista
                        <span aria-hidden="true">→</span>
                      </a>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
