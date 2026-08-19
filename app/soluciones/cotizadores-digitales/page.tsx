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
import BrowserFrame from "@/components/ui/BrowserFrame"
import { getSolution } from "@/lib/solutions"

const solution = getSolution("cotizadores-digitales")!

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
 * Estructura propia: antes/después + dos tipos de cotizador.
 *
 * La distinción entre cotizador orientativo y solicitud estructurada es el
 * aporte real de esta página: evita prometer motores automáticos de precio
 * en negocios donde el precio depende de variables que no se pueden cerrar
 * sin hablar.
 */
const tipos = [
  {
    n: "01",
    name: "Cotizador orientativo",
    body: "El cliente configura lo que quiere y ve una estimación en pantalla. Funciona cuando el precio se puede calcular con reglas claras: cantidad, tipo de producto, fecha.",
    ok: "Sirve si tus precios siguen una lógica que puedes escribir.",
  },
  {
    n: "02",
    name: "Solicitud estructurada",
    body: "El cliente arma lo que necesita, pero en vez de un precio recibe una confirmación, y tú recibes toda la información ya ordenada para cotizar.",
    ok: "Sirve si tu precio depende de variables que no se pueden cerrar sin hablar.",
  },
]

export default function CotizadoresPage() {
  return (
    <>
      <SolutionBreadcrumbJsonLd solution={solution} />
      <Header />
      <main className="bg-[#0A0A0A] text-white">
        <SolutionHeader
          solution={solution}
          eyebrow="Clientes"
          h1="Cotizadores digitales para convertir una conversación en un proceso"
          lede="Si cada cotización empieza desde cero por WhatsApp, tu capacidad de vender está limitada por cuántos mensajes alcances a responder. Un cotizador cambia dónde empieza esa conversación."
          proof={
            <p className="font-mono text-[11px] text-[#8A8A8A] leading-relaxed">
              En operación ·{" "}
              <Link
                href="/proyectos/las-frescas"
                className="text-[#4cfc0f] hover:underline underline-offset-4 py-1.5 inline-block"
              >
                cotizador de Las Frescas
              </Link>
            </p>
          }
        />

        {/* El problema, en dos columnas de contraste */}
        <section aria-labelledby="antes-despues" className="py-12 lg:py-20 border-t border-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <h2 id="antes-despues" className="text-xl lg:text-2xl font-bold tracking-tight max-w-xl">
              Dónde empieza la conversación
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-6 lg:mt-10">
              <div className="border border-[#222] bg-[#0E0E0E] p-6 lg:p-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A8A8A]">
                  Sin cotizador
                </p>
                <ol className="mt-5 space-y-2.5">
                  {[
                    "«Hola, ¿cuánto cuesta?»",
                    "«Depende, ¿para cuántas personas?»",
                    "«¿Qué fecha sería?»",
                    "«¿Qué productos quieres incluir?»",
                    "…y hasta aquí todavía no hay una cotización.",
                  ].map((line, i) => (
                    <li key={line} className="flex gap-3 text-[#B0B0B0] text-sm leading-relaxed">
                      <span className="font-mono text-[11px] tnum text-[#8A8A8A] shrink-0 mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {line}
                    </li>
                  ))}
                </ol>
                <p className="text-[#8A8A8A] text-xs mt-6 pt-4 border-t border-[#1F1F1F] leading-relaxed">
                  Se repite completa con cada persona que pregunta, incluidas las
                  que no van a comprar.
                </p>
              </div>

              <div className="border border-[#4cfc0f]/40 bg-[#0E0E0E] p-6 lg:p-7 relative corner-marks">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#4cfc0f]">
                  Con cotizador
                </p>
                <ol className="mt-5 space-y-2.5">
                  {[
                    "El cliente elige lo que necesita en el sitio.",
                    "Configura cantidad, fecha y opciones.",
                    "Ve una estimación o envía su solicitud.",
                    "Te escribe con la decisión ya tomada.",
                  ].map((line, i) => (
                    <li key={line} className="flex gap-3 text-[#B0B0B0] text-sm leading-relaxed">
                      <span className="font-mono text-[11px] tnum text-[#4cfc0f] shrink-0 mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {line}
                    </li>
                  ))}
                </ol>
                <p className="text-[#8A8A8A] text-xs mt-6 pt-4 border-t border-[#1F1F1F] leading-relaxed">
                  La conversación empieza donde antes terminaba.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Los dos tipos */}
        <section aria-labelledby="tipos-cot" className="py-12 lg:py-20 border-t border-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 id="tipos-cot" className="text-xl lg:text-2xl font-bold tracking-tight">
                No todos los negocios pueden dar un precio en pantalla
              </h2>
              <p className="text-[#B0B0B0] text-[15px] lg:text-base mt-4 leading-relaxed">
                Y forzarlo es peor que no tenerlo: un precio automático mal
                calculado genera expectativas que luego hay que desmentir. Por
                eso construimos dos cosas distintas según el caso.
              </p>
            </div>

            <ul className="mt-6 lg:mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {tipos.map((tipo) => (
                <li key={tipo.n} className="border border-[#222] bg-[#0E0E0E] p-6">
                  <span className="font-mono text-[11px] tnum text-[#4cfc0f]">{tipo.n}</span>
                  <h3 className="text-lg font-bold mt-2">{tipo.name}</h3>
                  <p className="text-[#B0B0B0] text-sm mt-3 leading-relaxed">{tipo.body}</p>
                  <p className="text-[#8A8A8A] text-xs mt-4 pt-4 border-t border-[#1F1F1F] leading-relaxed">
                    {tipo.ok}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Caso */}
        <section aria-labelledby="caso-frescas" className="py-12 lg:py-20 border-t border-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
            <div className="lg:col-span-7">
              <BrowserFrame
                video={{ name: "lasfrescas" }}
                screenshotAlt="Recorrido por el sitio de Las Frescas y su cotizador de barras para eventos"
                urlLabel="lasfrescas.vercel.app"
                className="border-[#282828]"
              />
            </div>
            <div className="lg:col-span-5 mt-6 lg:mt-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#4cfc0f]">
                Caso · Servicios para eventos
              </p>
              <h2 id="caso-frescas" className="text-xl lg:text-2xl font-bold tracking-tight mt-3">
                Las Frescas
              </h2>
              <p className="text-[#B0B0B0] text-[15px] mt-4 leading-relaxed">
                Montan barras de paletas y snacks para eventos. Cada evento
                cambia: invitados, productos, tipo de barra. Eso convertía cada
                cotización en una conversación larga, repetida decenas de veces
                al mes.
              </p>
              <p className="text-[#B0B0B0] text-[15px] mt-3 leading-relaxed">
                Ahora el cliente arma su barra en el sitio y llega a la
                conversación con la decisión avanzada.
              </p>
              <Link
                href="/proyectos/las-frescas"
                className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-white border-b-2 border-[#4cfc0f] pb-2 pt-2 transition-colors hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
              >
                Ver el caso completo
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <SolutionFaq
          items={[
            {
              q: "¿Tengo que publicar mis precios?",
              a: "No necesariamente. En la solicitud estructurada el cliente configura lo que necesita sin ver montos, y tú recibes todo ordenado para cotizar. Es la opción de la mayoría de los negocios que no quieren mostrar tarifas abiertas.",
            },
            {
              q: "¿Dónde llegan las solicitudes?",
              a: "A donde ya trabajas: correo, WhatsApp o un panel dentro del sitio. Lo definimos según cómo le des seguimiento hoy, no al revés.",
            },
            {
              q: "¿Se puede cambiar la lógica de precios después?",
              a: "Sí. Los precios y las reglas se dejan editables desde un panel para que no dependas de nosotros cada vez que ajustes una tarifa.",
            },
            {
              q: "¿Necesito una web nueva para tener un cotizador?",
              a: (
                <>
                  No siempre: se puede integrar a un sitio existente si está
                  construido de forma que lo permita. Si no lo está, o si el
                  sitio actual ya no funciona, conviene revisarlo junto con el{" "}
                  <Link
                    href="/soluciones/desarrollo-web"
                    className="text-[#4cfc0f] hover:underline underline-offset-4"
                  >
                    desarrollo web
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
