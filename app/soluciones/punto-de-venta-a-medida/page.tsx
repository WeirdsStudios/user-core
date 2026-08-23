import Link from "next/link"
import { defaultOgImage } from "@/lib/site-config"
import type { Metadata } from "next"
import {
  Header,
  Footer,
  SolutionBreadcrumbJsonLd,
  SolutionHeader,
  SolutionFaq,
  SolutionFooterNav,
} from "@/components/solutions/SolutionShell"
import MediaFrame from "@/components/ui/MediaFrame"
import { getSolution } from "@/lib/solutions"
import { getProject } from "@/lib/projects"

const solution = getSolution("punto-de-venta-a-medida")!
const llevelin = getProject("llevelin")!

export const metadata: Metadata = {
  title: solution.metaTitle,
  description: solution.metaDescription,
  alternates: { canonical: `/soluciones/${solution.slug}` },
  openGraph: {
      images: [defaultOgImage],
    title: solution.metaTitle,
    description: solution.metaDescription,
    url: `/soluciones/${solution.slug}`,
  },
}

/**
 * Estructura propia: un caso lleva la página.
 *
 * Es la única landing con un solo caso tan directamente ligado, así que
 * Llevelín es el cuerpo y no un anexo al final. La sección "cuándo NO"
 * evita que se lea como venta de un producto POS genérico, que es
 * explícitamente lo que esta página no hace.
 */
const cuandoNo = [
  "Vendes desde un solo mostrador con un flujo de cobro común.",
  "Un punto de venta comercial cubre lo que necesitas sin adaptaciones raras.",
  "Todavía estás validando el modelo de negocio y puede cambiar el mes que viene.",
]

const cuandoSi = [
  "Cobras en varios lugares y de varias formas: cajas, autoservicio, mostradores de atención.",
  "Vendes a granel o por peso, no solo productos con código de barras fijo.",
  "Distintas personas usan el sistema —cajero, cliente, personal de piso— y no deberían ver lo mismo.",
  "Tu forma de cobrar tiene reglas que ninguna solución del mercado contempla.",
  "El punto de venta tiene que conectarse con otros procesos internos tuyos.",
]

export default function PuntoDeVentaPage() {
  return (
    <>
      <SolutionBreadcrumbJsonLd solution={solution} />
      <Header />
      <main className="bg-[#0A0A0A] text-white">
        <SolutionHeader
          solution={solution}
          eyebrow="Operación · especialidad"
          h1="Desarrollo de puntos de venta a medida"
          lede="No vendemos un punto de venta. Desarrollamos el que tu operación necesita cuando cobras en varios lugares, de varias formas, y las soluciones del mercado no contemplan cómo trabajas."
          proof={
            <p className="font-mono text-[11px] text-[#8A8A8A] leading-relaxed">
              Caso en operación ·{" "}
              <Link
                href="/proyectos/llevelin"
                className="text-[#4cfc0f] hover:underline underline-offset-4 py-1.5 inline-block"
              >
                PDV de cajas, autocobro e islas para el supermercado Llevelín
              </Link>
            </p>
          }
        />

        {/* Aclaración de posicionamiento, arriba porque define qué es esto */}
        <section aria-labelledby="que-es" className="py-12 lg:py-16 border-t border-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="border-l-2 border-[#4cfc0f] pl-5 lg:pl-7 max-w-3xl">
              <h2 id="que-es" className="text-xl lg:text-2xl font-bold tracking-tight">
                Esto no es un producto que se compra
              </h2>
              <p className="text-[#B0B0B0] text-[15px] lg:text-base mt-4 leading-relaxed">
                Hay muchos puntos de venta comerciales, y para la mayoría de los
                negocios son la opción correcta: cuestan menos, se instalan hoy y
                están probados. Lo que hacemos es distinto y más caro — se
                justifica solo cuando la operación tiene algo que esos productos
                no contemplan.
              </p>
            </div>
          </div>
        </section>

        {/* Cuándo sí / cuándo no */}
        <section aria-labelledby="cuando" className="py-12 lg:py-20 border-t border-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <h2 id="cuando" className="text-xl lg:text-2xl font-bold tracking-tight max-w-xl">
              Cuándo tiene sentido desarrollarlo
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-6 lg:mt-10">
              <div className="border border-[#222] bg-[#0E0E0E] p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A8A8A]">
                  Mejor compra uno existente
                </p>
                <ul className="mt-4 space-y-3">
                  {cuandoNo.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-[#8A8A8A] font-mono text-xs shrink-0 mt-1" aria-hidden="true">—</span>
                      <span className="text-[#B0B0B0] text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-[#4cfc0f]/40 bg-[#0E0E0E] p-6 relative corner-marks">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#4cfc0f]">
                  Puede convenir desarrollarlo
                </p>
                <ul className="mt-4 space-y-3">
                  {cuandoSi.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-[#4cfc0f] font-mono text-xs shrink-0 mt-1" aria-hidden="true">+</span>
                      <span className="text-[#B0B0B0] text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* El caso como cuerpo de la página */}
        <section aria-labelledby="caso-llevelin" className="py-12 lg:py-20 border-t border-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#4cfc0f]">
              Caso · {llevelin.industry}
            </p>
            <h2 id="caso-llevelin" className="text-xl lg:text-2xl font-bold tracking-tight mt-3 max-w-2xl">
              Llevelín: un mismo sistema cobrando de tres formas distintas
            </h2>

            <div className="lg:grid lg:grid-cols-12 lg:gap-12 mt-6 lg:mt-10">
              <dl className="lg:col-span-7 border-t border-[#1F1F1F]">
                {[
                  { t: "Contexto", d: llevelin.context },
                  { t: "Necesidad", d: llevelin.challenge },
                  ...llevelin.solution.map((s) => ({ t: s.label, d: s.body })),
                ].map((item) => (
                  <div key={item.t} className="border-b border-[#1F1F1F] py-5">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#4cfc0f]">
                      {item.t}
                    </dt>
                    <dd className="text-[#B0B0B0] text-[15px] mt-2 leading-relaxed max-w-prose">
                      {item.d}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="lg:col-span-5 mt-6 lg:mt-0">
                <MediaFrame slot={llevelin.assets[0]} chrome={false} />
                <Link
                  href="/proyectos/llevelin"
                  className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-white border-b-2 border-[#4cfc0f] pb-2 pt-2 transition-colors hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
                >
                  Ver el caso completo
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <SolutionFaq
          items={[
            {
              q: "¿Funciona con la caja, la impresora o el lector que ya tengo?",
              a: "Depende del equipo. Es de las primeras cosas que revisamos, porque el hardware condiciona el desarrollo: no queremos prometerte compatibilidad antes de ver qué tienes instalado.",
            },
            {
              q: "¿Qué pasa si se cae el internet en el punto de venta?",
              a: "Es una decisión de diseño que se toma al inicio y tiene costo: operar sin conexión y sincronizar después es más complejo que depender de la red. Lo definimos según qué tan crítico sea para tu operación.",
            },
            {
              q: "¿Puede funcionar en autocobro y en caja al mismo tiempo?",
              a: (
                <>
                  Sí, y es justamente el escenario para el que este tipo de
                  desarrollo tiene más sentido: el mismo sistema cambia lo que
                  muestra y lo que permite según quién lo esté operando. En{" "}
                  <Link href="/proyectos/llevelin" className="text-[#4cfc0f] hover:underline underline-offset-4">
                    Llevelín
                  </Link>{" "}
                  convive en cajas, en autocobro y en las islas de atención.
                </>
              ),
            },
            {
              q: "¿Maneja venta por peso o a granel?",
              a: "Sí. Es una de las razones más comunes para desarrollar a medida: los productos que se pesan y se etiquetan en el mostrador siguen una lógica distinta a los que solo se escanean, y no todas las soluciones del mercado lo resuelven bien.",
            },
            {
              q: "¿Esto es lo mismo que un sistema administrativo?",
              a: (
                <>
                  El punto de venta es la parte que se usa en el mostrador,
                  durante la venta. Suele ser una pieza de algo más grande — si
                  lo que buscas es el panel completo de gestión, eso es{" "}
                  <Link
                    href="/soluciones/software-a-medida"
                    className="text-[#4cfc0f] hover:underline underline-offset-4"
                  >
                    software a medida
                  </Link>
                  .
                </>
              ),
            },
          ]}
        />

        <SolutionFooterNav current={solution.slug} />
      </main>
      <Footer />
    </>
  )
}
