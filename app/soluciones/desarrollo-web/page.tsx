import Link from "next/link"
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
import { siteConfig, defaultOgImage } from "@/lib/site-config"

const solution = getSolution("desarrollo-web")!

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
 * Estructura propia: tipos de sitio → la web como primera capa → evidencia.
 *
 * El eje de esta página es que un sitio puede ser el inicio de algo mayor —
 * que es justo lo que la separa de software-a-medida, donde el visitante ya
 * sabe que necesita un sistema.
 */
const tipos = [
  {
    n: "01",
    name: "Sitio corporativo",
    body: "Explica el negocio, muestra servicios y genera contacto. Es el punto de llegada de quien te buscó en Google o recibió tu tarjeta.",
  },
  {
    n: "02",
    name: "Landing page",
    body: "Una sola página enfocada en una campaña o un servicio. Útil cuando envías tráfico de anuncios y necesitas medir qué convierte.",
  },
  {
    n: "03",
    name: "Catálogo digital",
    body: "Tu inventario o tus servicios navegables, sin necesidad de vender en línea. Muchos negocios necesitan mostrar, no cobrar.",
  },
  {
    n: "04",
    name: "Tienda en línea",
    body: "Cuando el negocio sí vende directo y necesita carrito, pagos y control de pedidos.",
  },
]

export default function DesarrolloWebPage() {
  return (
    <>
      <SolutionBreadcrumbJsonLd solution={solution} />
      <Header />
      <main className="bg-[#0A0A0A] text-white">
        <SolutionHeader
          solution={solution}
          eyebrow="Presencia digital"
          h1="Desarrollo web para negocios que necesitan algo más que una página bonita"
          lede="Un sitio que se ve bien pero no explica el negocio ni genera contacto es una tarjeta de presentación cara. Construimos webs con un trabajo asignado, y que puedan conectarse después con tus sistemas."
          proof={
            <p className="font-mono text-[11px] text-[#8A8A8A] leading-relaxed">
              Greek Gym y Las Frescas empezaron aquí ·{" "}
              <Link
                href="/proyectos"
                className="text-[#4cfc0f] hover:underline underline-offset-4 py-1.5 inline-block"
              >
                ver los casos
              </Link>
            </p>
          }
        />

        {/* Qué construimos */}
        <section aria-labelledby="tipos" className="py-12 lg:py-20 border-t border-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <h2 id="tipos" className="text-xl lg:text-2xl font-bold tracking-tight max-w-xl">
              Qué construimos, según lo que el negocio necesite mostrar
            </h2>
            <ul className="mt-6 lg:mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1F1F1F] border border-[#1F1F1F]">
              {tipos.map((tipo) => (
                <li key={tipo.n} className="bg-[#0A0A0A] p-5 lg:p-6">
                  <span className="font-mono text-[11px] tnum text-[#4cfc0f]">{tipo.n}</span>
                  <h3 className="text-lg font-bold mt-2">{tipo.name}</h3>
                  <p className="text-[#B0B0B0] text-sm mt-2 leading-relaxed">{tipo.body}</p>
                </li>
              ))}
            </ul>
            <p className="text-[#8A8A8A] text-sm mt-6 max-w-2xl leading-relaxed">
              En todos los casos incluimos la estructura de contenido, el diseño,
              el desarrollo, el dominio y el hosting. Las integraciones —pagos,
              reservas, correo, herramientas que ya uses— se definen según el
              proyecto.
            </p>
          </div>
        </section>

        {/* La web como primera capa: el argumento que diferencia esta página */}
        <section aria-labelledby="primera-capa" className="py-12 lg:py-20 border-t border-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 id="primera-capa" className="text-xl lg:text-2xl font-bold tracking-tight">
                Una web puede ser la primera capa, no el proyecto completo
              </h2>
              <p className="text-[#B0B0B0] text-[15px] lg:text-base mt-4 leading-relaxed">
                La mayoría de nuestros clientes llega pidiendo una página. Al
                cabo de un tiempo, lo que necesitan es que esa página haga algo:
                que el cliente reserve, que cotice solo, que el equipo vea lo que
                entró sin revisar mensajes.
              </p>
              <p className="text-[#B0B0B0] text-[15px] lg:text-base mt-3 leading-relaxed">
                Construimos pensando en eso desde el inicio. No obliga a
                contratar más, pero evita tener que empezar de cero cuando llegue
                el momento.
              </p>
            </div>

            <div className="lg:col-span-7 mt-6 lg:mt-0">
              <ol className="border-t border-[#1F1F1F]">
                {[
                  { s: "Hoy", t: "Un sitio que explica y genera contacto." },
                  { s: "Después", t: "Reservas, cotizador o pagos dentro del mismo sitio." },
                  { s: "Más adelante", t: "Un sistema que tu equipo usa por dentro." },
                ].map((step, i) => (
                  <li
                    key={step.s}
                    className="border-b border-[#1F1F1F] py-4 flex items-baseline gap-4"
                  >
                    <span className="font-mono text-[11px] tnum text-[#4cfc0f] w-6 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A8A8A] w-24 shrink-0">
                      {step.s}
                    </span>
                    <span className="text-[#B0B0B0] text-sm leading-relaxed">{step.t}</span>
                  </li>
                ))}
              </ol>
              <p className="text-[#8A8A8A] text-sm mt-4 leading-relaxed">
                Greek Gym recorrió exactamente ese camino:{" "}
                <Link
                  href="/proyectos/greek-gym"
                  className="text-[#4cfc0f] hover:underline underline-offset-4"
                >
                  del sitio público al sistema administrativo
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Evidencia */}
        <section aria-labelledby="evidencia-web" className="py-12 lg:py-20 border-t border-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <h2 id="evidencia-web" className="text-xl lg:text-2xl font-bold tracking-tight">
              Webs que ya están funcionando
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mt-6">
              <EvidenceCard
                slug="greek-gym"
                name="Greek Gym"
                claim="Sitio público con dos sucursales"
                detail="Disciplinas, coaches y planes de membresía de dos ubicaciones distintas, en un sitio que después se conectó con su sistema interno."
              />
              <EvidenceCard
                slug="las-frescas"
                name="Las Frescas"
                claim="Sitio + herramienta comercial"
                detail="Además de explicar el servicio, el sitio incorpora un cotizador que estructura la solicitud antes de que empiece la conversación."
              />
            </div>
          </div>
        </section>

        {/* Precio */}
        <section aria-labelledby="precio-web" className="py-12 lg:py-20 border-t border-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <h2 id="precio-web" className="text-xl lg:text-2xl font-bold tracking-tight">
                Cuánto cuesta
              </h2>
            </div>
            <div className="lg:col-span-8 mt-4 lg:mt-0">
              <p className="text-2xl lg:text-3xl font-bold">
                Proyectos desde{" "}
                <span className="text-[#4cfc0f]">{siteConfig.pricing.startingPriceLabel}</span>
              </p>
              <p className="text-[#B0B0B0] text-[15px] mt-3 leading-relaxed max-w-prose">
                Ese es el punto de entrada, no el precio de cualquier sitio. El
                costo final depende del contenido, del número de secciones, de
                las funcionalidades y de las integraciones que necesite. Una
                landing y una tienda en línea no cuestan lo mismo.
              </p>
              <p className="text-[#8A8A8A] text-sm mt-4 leading-relaxed max-w-prose">
                El{" "}
                <Link href="/analisis" className="text-[#4cfc0f] hover:underline underline-offset-4">
                  Motor de Análisis
                </Link>{" "}
                te da un rango con tus datos en unos minutos, sin hablar con
                nadie.
              </p>
            </div>
          </div>
        </section>

        <SolutionFaq
          items={[
            {
              q: "¿Cuánto tarda un sitio web?",
              a: "Un sitio informativo suele tomar entre 3 y 5 semanas. Si lleva cotizador, reservas o alguna integración, entre 6 y 14 semanas. Lo definimos con precisión en la propuesta, después del análisis.",
            },
            {
              q: "¿Puedo empezar con una web y agregar un sistema después?",
              a: (
                <>
                  Sí, y es el camino más común. Construimos la web de forma que
                  pueda conectarse después con reservas, cotizadores o un sistema
                  interno sin rehacerla.{" "}
                  <Link
                    href="/soluciones/software-a-medida"
                    className="text-[#4cfc0f] hover:underline underline-offset-4"
                  >
                    Así funciona el software a medida
                  </Link>
                  .
                </>
              ),
            },
            {
              q: "¿Quién escribe los textos y consigue las fotos?",
              a: "Nosotros definimos la estructura y qué debe decir cada sección; tú aportas la información del negocio. Si no tienes textos ni fotos listas, lo resolvemos juntos durante el proceso — no necesitas tenerlo todo desde el día uno.",
            },
            {
              q: "¿El sitio va a aparecer en Google?",
              a: "Entregamos la base técnica que Google necesita: estructura, metadatos, velocidad, versión móvil y sitemap. Aparecer en los primeros lugares depende además de la competencia de tu sector y del trabajo de contenido posterior, que es un esfuerzo continuo y no una casilla que se marca al lanzar.",
            },
          ]}
        />

        <SolutionFooterNav current={solution.slug} />
      </main>
      <Footer />
    </>
  )
}
