import Link from "next/link"
import { defaultOgImage } from "@/lib/site-config"
import type { Metadata } from "next"
import {
  Header,
  Footer,
  SolutionBreadcrumbJsonLd,
  SolutionHeader,
  EvidenceCard,
  SolutionFaq,
  SolutionFooterNav,
} from "@/components/solutions/SolutionShell"
import { getSolution } from "@/lib/solutions"

const solution = getSolution("software-a-medida")!

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
 * Estructura propia: una decisión, no un catálogo.
 *
 * El eje es la comparación honesta entre comprar una herramienta existente y
 * desarrollar. Decir cuándo NO conviene desarrollar es lo que hace creíble
 * decir cuándo sí — y ninguna otra landing plantea esa decisión.
 */
const cuandoExistente = [
  "Tu proceso es estándar y una herramienta del mercado ya lo cubre bien.",
  "Necesitas empezar esta semana y puedes adaptarte a cómo funciona la herramienta.",
  "El volumen todavía es bajo y el costo mensual de una suscripción es menor que el de desarrollar.",
  "Nadie en el equipo está perdiendo horas por culpa de la herramienta.",
]

const cuandoAMedida = [
  "Tu operación tiene reglas propias que ninguna herramienta respeta sin adaptaciones incómodas.",
  "Distintos puestos necesitan ver y hacer cosas distintas.",
  "Tienes información viviendo en sistemas que no se hablan entre sí.",
  "Alguien captura los mismos datos dos veces, en dos lugares.",
  "Estás pagando varias suscripciones para tapar huecos de un mismo proceso.",
  "La herramienta te obliga a cambiar cómo trabajas en algo que es parte de tu ventaja.",
]

export default function SoftwareAMedidaPage() {
  return (
    <>
      <SolutionBreadcrumbJsonLd solution={solution} />
      <Header />
      <main className="bg-[#0A0A0A] text-white">
        <SolutionHeader
          solution={solution}
          eyebrow="Operación"
          h1="Software a medida para la forma real en que opera tu negocio"
          lede="Sistemas administrativos, herramientas internas y automatizaciones construidas alrededor de tu proceso — no un producto genérico al que tengas que adaptar la operación."
          proof={
            <p className="font-mono text-[11px] text-[#8A8A8A] leading-relaxed">
              Construido y entregado ·{" "}
              <Link
                href="/proyectos/greek-gym"
                className="text-[#4cfc0f] hover:underline underline-offset-4 py-1.5 inline-block"
              >
                sistema con 3 roles para Greek Gym
              </Link>
            </p>
          }
        />

        {/* La decisión honesta — el bloque que define esta página */}
        <section aria-labelledby="decision" className="py-12 lg:py-20 border-t border-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 id="decision" className="text-xl lg:text-2xl font-bold tracking-tight">
                Antes de desarrollar: ¿de verdad lo necesitas?
              </h2>
              <p className="text-[#B0B0B0] text-[15px] lg:text-base mt-4 leading-relaxed">
                Desarrollar software cuesta más y tarda más que contratar una
                herramienta existente. Muchas veces la herramienta existente es
                la respuesta correcta, y decirlo nos ahorra tiempo a los dos.
                Esta es la forma en que lo evaluamos.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-8 lg:mt-12">
              <div className="border border-[#222] bg-[#0E0E0E] p-6 lg:p-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A8A8A]">
                  Conviene una herramienta existente
                </p>
                <ul className="mt-5 space-y-3">
                  {cuandoExistente.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-[#8A8A8A] font-mono text-xs shrink-0 mt-1" aria-hidden="true">
                        —
                      </span>
                      <span className="text-[#B0B0B0] text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[#8A8A8A] text-xs mt-6 pt-4 border-t border-[#1F1F1F] leading-relaxed">
                  Si tu caso está de este lado, te lo vamos a decir.
                </p>
              </div>

              <div className="border border-[#4cfc0f]/40 bg-[#0E0E0E] p-6 lg:p-7 relative corner-marks">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#4cfc0f]">
                  Puede tener sentido desarrollar
                </p>
                <ul className="mt-5 space-y-3">
                  {cuandoAMedida.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-[#4cfc0f] font-mono text-xs shrink-0 mt-1" aria-hidden="true">
                        +
                      </span>
                      <span className="text-[#B0B0B0] text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[#8A8A8A] text-xs mt-6 pt-4 border-t border-[#1F1F1F] leading-relaxed">
                  Entre más señales reconozcas, más probable es que el desarrollo
                  se pague solo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Qué construimos */}
        <section aria-labelledby="que-software" className="py-12 lg:py-20 border-t border-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <h2 id="que-software" className="text-xl lg:text-2xl font-bold tracking-tight">
                Qué tipo de sistemas construimos
              </h2>
              <p className="text-[#8A8A8A] text-sm mt-3 leading-relaxed">
                Casi nunca es una sola cosa: suele ser una combinación según
                cómo trabaja el negocio.
              </p>
            </div>
            <dl className="lg:col-span-8 mt-5 lg:mt-0 border-t border-[#1F1F1F]">
              {[
                {
                  t: "Sistemas administrativos",
                  d: "El panel donde el equipo gestiona clientes, cobros, inventario o servicios. Software empresarial construido para un negocio concreto, no para todos.",
                },
                {
                  t: "Herramientas internas",
                  d: "Aplicaciones pequeñas que resuelven un proceso puntual que hoy vive en una hoja de cálculo compartida.",
                },
                {
                  t: "Roles y permisos",
                  d: "Que cada puesto vea y pueda hacer exactamente lo que le corresponde, ni más ni menos.",
                },
                {
                  t: "Automatizaciones",
                  d: "Tareas repetitivas que hoy alguien hace a mano: avisos, recordatorios, reportes, sincronizaciones.",
                },
                {
                  t: "Integraciones",
                  d: "Conectar el sistema nuevo con lo que ya usas, para no acabar con dos fuentes de verdad.",
                },
              ].map((item) => (
                <div key={item.t} className="border-b border-[#1F1F1F] py-5">
                  <dt className="text-[15px] font-bold text-white">{item.t}</dt>
                  <dd className="text-[#B0B0B0] text-sm mt-1.5 leading-relaxed max-w-prose">
                    {item.d}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Evidencia */}
        <section aria-labelledby="evidencia-sw" className="py-12 lg:py-20 border-t border-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <h2 id="evidencia-sw" className="text-xl lg:text-2xl font-bold tracking-tight">
              Sistemas que ya están en uso
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mt-6">
              <EvidenceCard
                slug="greek-gym"
                name="Greek Gym"
                claim="Tres interfaces, un solo negocio"
                detail="Construimos accesos distintos para Super Administrador, Administrador y Cajero, con punto de venta, inventario y corte de caja para dos sucursales."
              />
              <EvidenceCard
                slug="llevelin"
                name="Llevelín"
                claim="Software transaccional en operación física"
                detail="El punto de venta de un supermercado, operando en cajas, en autocobro y en los mostradores donde se vende por peso — con reglas distintas en cada uno."
              />
            </div>
          </div>
        </section>

        {/* Puente a productos propios — pertinente porque el visitante de este
            página podría estar en un giro que ya tenemos cubierto */}
        <section aria-labelledby="productos-sw" className="py-12 lg:py-16 border-t border-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="border border-[#222] bg-[#0E0E0E] p-6 lg:p-8">
              <h2 id="productos-sw" className="text-lg lg:text-xl font-bold tracking-tight">
                Si tu negocio es de fitness o de salud
              </h2>
              <p className="text-[#B0B0B0] text-sm lg:text-base mt-3 leading-relaxed max-w-2xl">
                Estamos desarrollando dos plataformas propias para esos sectores.
                Si tu operación encaja, puede salir más rápido y más barato que
                un desarrollo desde cero.
              </p>
              <Link
                href="/productos"
                className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-white border-b-2 border-[#4cfc0f] pb-2 pt-2 transition-colors hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
              >
                Ver ACTIIVA y MEDIICA
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <SolutionFaq
          items={[
            {
              q: "¿Cómo sé si necesito software a medida?",
              a: "La señal más clara es que alguien de tu equipo esté haciendo trabajo manual repetido porque la herramienta actual no hace algo, o que tengas información importante en dos lugares que no coinciden. Si nada de eso te pasa, probablemente todavía no lo necesitas.",
            },
            {
              q: "¿Cuánto cuesta desarrollar un sistema?",
              a: (
                <>
                  Depende del alcance y no tenemos un precio de lista honesto que
                  darte: un panel sencillo y un sistema con roles, cobros e
                  inventario no se parecen. El{" "}
                  <Link href="/analisis" className="text-[#4cfc0f] hover:underline underline-offset-4">
                    Motor de Análisis
                  </Link>{" "}
                  te da un rango desglosado por módulo con tus datos, gratis.
                </>
              ),
            },
            {
              q: "¿Puede conectarse con las herramientas que ya uso?",
              a: "En general sí, siempre que la herramienta ofrezca una forma de conectarse. Lo revisamos en el descubrimiento, antes de comprometer nada: es más honesto decirte de entrada que algo no se puede que descubrirlo a medio proyecto.",
            },
            {
              q: "¿Qué pasa después del lanzamiento?",
              a: (
                <>
                  Un sistema en uso necesita mantenimiento: infraestructura,
                  respaldos, actualizaciones y ajustes conforme el negocio
                  cambia. Incluimos soporte el primer mes y después es opcional
                  —{" "}
                  <Link href="/#seguimiento" className="text-[#4cfc0f] hover:underline underline-offset-4">
                    puedes ver los planes de seguimiento
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
