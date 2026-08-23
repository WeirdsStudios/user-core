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
import { getSolution } from "@/lib/solutions"

const solution = getSolution("portales-para-clientes")!

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
 * Estructura propia: el costo de la interrupción → qué se lleva el portal →
 * qué cambia en la operación.
 *
 * Todo lo que se afirma aquí es cierto: describimos lo que un portal puede
 * hacer (capacidad) y lo que ya construimos en Greek Gym (evidencia), sin
 * decir que existe un portal de cliente entregado. Lo que no hacemos es
 * dedicarle un bloque a enumerar lo que aún no tenemos.
 */
const preguntas = [
  "¿Cuándo vence mi plan?",
  "¿Me reenvías mi comprobante?",
  "¿A qué hora quedó mi cita?",
  "¿Cuánto llevo pagado?",
  "¿Todavía tengo sesiones disponibles?",
]

const capacidades = [
  {
    n: "01",
    t: "Consultar",
    d: "Su historial, su estado de cuenta, lo que contrató y cuándo vence. Deja de ser una pregunta y pasa a ser una pantalla.",
  },
  {
    n: "02",
    t: "Solicitar",
    d: "Agendar, pedir algo, reportar una incidencia. Entra ordenado y con los datos completos desde el principio.",
  },
  {
    n: "03",
    t: "Gestionar",
    d: "Actualizar sus datos, sus preferencias, quién más tiene acceso a su cuenta.",
  },
  {
    n: "04",
    t: "Pagar y renovar",
    d: "Cuando el modelo lo requiere, con una pasarela de pago detrás. La renovación deja de depender de que alguien la recuerde.",
  },
  {
    n: "05",
    t: "Descargar",
    d: "Comprobantes, reportes o cualquier documento que el negocio deba entregarle.",
  },
]

const cambios = [
  {
    t: "Tu equipo deja de ser el buscador",
    d: "Las consultas repetitivas dejan de interrumpir a quien está trabajando en algo que sí requiere criterio.",
  },
  {
    t: "El cliente resuelve a la hora que quiere",
    d: "No depende de tu horario ni de que alguien vea el mensaje.",
  },
  {
    t: "La información deja de contradecirse",
    d: "Un solo lugar con el dato correcto, en vez de tres conversaciones con tres versiones.",
  },
  {
    t: "Crecer deja de significar contratar",
    d: "El número de clientes puede subir sin que suba en la misma proporción el trabajo de atenderlos.",
  },
]

export default function PortalesPage() {
  return (
    <>
      <SolutionBreadcrumbJsonLd solution={solution} />
      <Header />
      <main className="bg-[#0A0A0A] text-white">
        <SolutionHeader
          solution={solution}
          eyebrow="Clientes"
          h1="Portales para que tus clientes resuelvan sin escribirte"
          lede="Cuando toda la relación con el cliente pasa por WhatsApp, tu equipo se convierte en el buscador de su propia información. Un portal mueve esas consultas a un lugar donde el cliente se atiende solo, a la hora que quiera."
          proof={
            <p className="font-mono text-[11px] text-[#8A8A8A] leading-relaxed">
              Interacción cliente–negocio en operación ·{" "}
              <Link
                href="/proyectos/greek-gym"
                className="text-[#4cfc0f] hover:underline underline-offset-4 py-1.5 inline-block"
              >
                caso Greek Gym
              </Link>
            </p>
          }
        />

        {/* El problema, con las preguntas literales */}
        <section aria-labelledby="problema" className="py-12 lg:py-20 border-t border-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 id="problema" className="text-xl lg:text-2xl font-bold tracking-tight">
                El costo no es el mensaje: es la interrupción
              </h2>
              <p className="text-[#B0B0B0] text-[15px] lg:text-base mt-4 leading-relaxed">
                Cada una toma dos minutos. Pero llegan sin orden, en horario de
                trabajo, y alguien tiene que dejar lo que está haciendo para
                buscar el dato. Multiplicado por tus clientes activos, eso es un
                puesto de trabajo.
              </p>
            </div>
            <ul className="lg:col-span-7 mt-6 lg:mt-0 space-y-2.5">
              {preguntas.map((q) => (
                <li
                  key={q}
                  className="border border-[#222] bg-[#0E0E0E] px-4 py-3 text-[#B0B0B0] text-sm"
                >
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Qué se lleva el portal */}
        <section aria-labelledby="capacidades" className="py-12 lg:py-20 border-t border-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 id="capacidades" className="text-xl lg:text-2xl font-bold tracking-tight">
                Qué se lleva el portal
              </h2>
              <p className="text-[#B0B0B0] text-[15px] lg:text-base mt-4 leading-relaxed">
                Ninguno los lleva todos de entrada. Empezamos por lo que más te
                están preguntando hoy y crece desde ahí.
              </p>
            </div>

            <ul className="mt-6 lg:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1F1F1F] border border-[#1F1F1F]">
              {capacidades.map((c) => (
                <li key={c.n} className="bg-[#0A0A0A] p-5 lg:p-6">
                  <span className="font-mono text-[11px] tnum text-[#4cfc0f]">{c.n}</span>
                  <h3 className="text-lg font-bold mt-2">{c.t}</h3>
                  <p className="text-[#B0B0B0] text-sm mt-2 leading-relaxed">{c.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Qué cambia */}
        <section aria-labelledby="cambios" className="py-12 lg:py-20 border-t border-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <h2 id="cambios" className="text-xl lg:text-2xl font-bold tracking-tight">
                Qué cambia en tu operación
              </h2>
            </div>
            <dl className="lg:col-span-8 mt-5 lg:mt-0 border-t border-[#1F1F1F]">
              {cambios.map((c) => (
                <div key={c.t} className="border-b border-[#1F1F1F] py-5">
                  <dt className="text-[15px] font-bold text-white">{c.t}</dt>
                  <dd className="text-[#B0B0B0] text-sm mt-1.5 leading-relaxed max-w-prose">{c.d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Evidencia */}
        <section aria-labelledby="evidencia-portal" className="py-12 lg:py-20 border-t border-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <h2 id="evidencia-portal" className="text-xl lg:text-2xl font-bold tracking-tight">
              Cliente y negocio, conectados
            </h2>
            <div className="mt-6 border border-[#4cfc0f]/40 bg-[#0E0E0E] p-6 lg:p-8 relative corner-marks max-w-3xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#4cfc0f]">
                Greek Gym · gimnasio y fitness
              </p>
              <p className="text-[#B0B0B0] text-[15px] lg:text-base mt-4 leading-relaxed">
                Los socios consultan planes y horarios desde el sitio y reservan
                su clase por WhatsApp, y esa reserva entra directo al sistema del
                gimnasio. Del otro lado, el equipo trabaja sobre la misma
                información con accesos distintos según su puesto.
              </p>
              <p className="text-[#B0B0B0] text-[15px] lg:text-base mt-3 leading-relaxed">
                Es la base sobre la que se construye un portal: usuarios,
                permisos y un sistema que ya distingue quién puede ver qué.
              </p>
              <Link
                href="/proyectos/greek-gym"
                className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-white border-b-2 border-[#4cfc0f] pb-2 pt-2 transition-colors hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
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
              q: "¿Mis clientes van a querer usarlo?",
              a: "Solo si les ahorra tiempo a ellos, no a ti. Si el portal es más lento que mandarte un mensaje, van a seguir mandándote el mensaje. Por eso empezamos por identificar qué te preguntan más y resolvemos eso primero, en vez de construir un portal completo de entrada.",
            },
            {
              q: "¿Puede convivir con WhatsApp?",
              a: "Sí, y normalmente conviene. El portal se lleva las consultas repetitivas —fechas, estados, comprobantes— y WhatsApp queda para lo que sí necesita una persona. No se trata de cerrar el canal, sino de dejar de usarlo como archivero.",
            },
            {
              q: "¿Qué pasa con los datos de mis clientes?",
              a: "Viven en la base de datos del sistema, que es tuya. Definimos desde el inicio quién puede ver qué, y el acceso de cada cliente queda limitado a su propia información.",
            },
            {
              q: "¿Es lo mismo que un sistema administrativo?",
              a: (
                <>
                  Son las dos caras del mismo dato. El portal es lo que ve tu
                  cliente; el{" "}
                  <Link
                    href="/soluciones/software-a-medida"
                    className="text-[#4cfc0f] hover:underline underline-offset-4"
                  >
                    sistema administrativo
                  </Link>{" "}
                  es lo que ve tu equipo. Casi siempre se construyen juntos,
                  porque uno sin el otro obliga a capturar la información dos
                  veces.
                </>
              ),
            },
            {
              q: "¿Puedo empezar con algo pequeño?",
              a: "Es lo recomendable. Un portal que resuelve bien las dos consultas más frecuentes se usa; uno que intenta cubrir todo desde el día uno suele quedarse a medias y no lo adopta nadie.",
            },
          ]}
        />

        <SolutionFooterNav current={solution.slug} />
      </main>
      <Footer />
    </>
  )
}
