import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/site/Header"
import Footer from "@/components/site/Footer"
import { siteConfig, defaultOgImage } from "@/lib/site-config"
import ConsentPreferencesLink from "@/components/consent/ConsentPreferencesLink"

/**
 * Aviso de privacidad.
 *
 * ESTADO: describe con exactitud lo que el sitio hace hoy —qué datos se
 * recogen, dónde se guardan y con quién se comparten— y ya identifica al
 * responsable real.
 *
 * USERS opera como persona física. NO se menciona ninguna sociedad porque no
 * existe todavía, y el RFC no se publica: no hay obligación confirmada de
 * exhibirlo aquí y publicarlo sin necesidad es exponer un dato de más.
 *
 * PENDIENTE DE REVISIÓN LEGAL antes de activar los pixels de Meta o Google.
 * La clasificación contractual de cada proveedor —encargado, responsable
 * independiente, transferencia— no está verificada, así que el texto se
 * mantiene descriptivo y conservador en vez de afirmar una figura jurídica.
 */
export const metadata: Metadata = {
  title: "Aviso de privacidad — USERS",
  description:
    "Qué datos recopila users.mx, para qué se usan, con quién se comparten y cómo ejercer tus derechos.",
  alternates: { canonical: "/aviso-de-privacidad" },
  robots: { index: true, follow: true },
  openGraph: {
    images: [defaultOgImage],
    title: "Aviso de privacidad — USERS",
    description: "Qué datos recopila users.mx y para qué se usan.",
    url: `${siteConfig.url}/aviso-de-privacidad`,
    type: "website",
  },
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="text-xl lg:text-2xl font-bold tracking-tight">{title}</h2>
      <div className="mt-4 space-y-4 text-[#B0B0B0] text-[15px] leading-relaxed">{children}</div>
    </section>
  )
}

export default function AvisoDePrivacidadPage() {
  const { email, whatsappDisplay } = siteConfig.contact
  const legal = siteConfig.legal

  return (
    <>
      <Header />
      <main className="bg-[#0A0A0A] text-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-36 lg:pb-24">
          <nav aria-label="Ruta de navegación" className="font-mono text-[11px] text-[#8A8A8A]">
            <Link href="/" className="hover:text-white transition-colors py-1.5 inline-block">
              Inicio
            </Link>
            <span className="mx-2 text-[#8A8A8A]" aria-hidden="true">/</span>
            <span className="text-[#9E9E9E]">Aviso de privacidad</span>
          </nav>

          <h1 className="text-[1.85rem] sm:text-4xl font-bold leading-[1.12] mt-5 text-balance tracking-tight">
            Aviso de privacidad
          </h1>

          <p className="font-mono text-[11px] text-[#8A8A8A] mt-5">
            Última actualización: agosto de 2026
          </p>

          <div className="mt-10">
            <Section title="Quién es responsable de tus datos">
              <p>
                <strong className="text-white">{legal.responsable}</strong>, quien
                opera comercialmente bajo la marca USERS ({siteConfig.wordmark}).
                {" "}{legal.figura}, {legal.regimen}.
              </p>
              <p>
                <strong className="text-white">Domicilio:</strong> {legal.domicilio}
              </p>
              <p>
                Para cualquier asunto sobre tus datos personales escribe a{" "}
                <a
                  href={`mailto:${legal.correoPrivacidad}`}
                  className="text-white underline underline-offset-4 hover:text-[#4cfc0f]"
                >
                  {legal.correoPrivacidad}
                </a>
                . Para temas comerciales, {email} o el {whatsappDisplay}.
              </p>
            </Section>

            <Section title="Qué datos recopilamos">
              <p>
                <strong className="text-white">Motor de Análisis.</strong> Si
                completas el diagnóstico, guardamos lo que escribes sobre tu
                negocio —nombre, giro, tamaño, necesidades— junto con tu nombre
                de contacto, correo y WhatsApp. Es la única parte del sitio donde
                pedimos datos personales, y siempre los das tú.
              </p>
              <p>
                <strong className="text-white">Centro de Atención.</strong> La
                conversación se guarda únicamente en tu navegador y se borra al
                cerrar la pestaña. No llega a ningún servidor nuestro. Solo
                cuando decides pasar la consulta al equipo se envía un resumen
                por WhatsApp, y en ese resumen se eliminan automáticamente
                contraseñas, tarjetas y claves si las hubieras escrito.
              </p>
              <p>
                <strong className="text-white">Medición.</strong> Si lo aceptas,
                registramos qué páginas se ven y qué botones se usan. Nunca el
                texto que escribes.
              </p>
              <p>
                <strong className="text-white">Publicidad.</strong> Si lo
                aceptas, Meta y Google pueden saber que visitaste el sitio para
                mostrarte nuestros anuncios y medir si funcionan.
              </p>
            </Section>

            <Section title="Para qué los usamos">
              <ul className="list-disc pl-5 space-y-2">
                <li>Prepararte un diagnóstico de tu negocio y darle seguimiento.</li>
                <li>Contactarte para dar seguimiento a lo que solicitaste.</li>
                <li>Atender dudas y soporte de proyectos que ya publicamos.</li>
                <li>Entender qué partes del sitio son útiles y cuáles no.</li>
                <li>Mostrar anuncios de USERS a quien ya mostró interés.</li>
              </ul>
              <p>
                No vendemos tus datos ni los usamos para nada distinto de lo
                anterior.
              </p>
            </Section>

            <Section title="Con quién se comparten">
              <p>
                <strong className="text-white">Servicios que usamos para operar.</strong>{" "}
                Tratan datos por instrucción nuestra y para prestarnos su
                servicio, no para fines propios:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-white">Vercel</strong> — alojamiento e
                  infraestructura del sitio, y medición de rendimiento cuando
                  está activada.
                </li>
                <li>
                  <strong className="text-white">Supabase</strong> — base de
                  datos donde se guardan los diagnósticos del Motor.
                </li>
                <li>
                  <strong className="text-white">Resend</strong> — envío del
                  correo con el que nos llega tu solicitud.
                </li>
              </ul>

              <p>
                <strong className="text-white">Plataformas con reglas propias.</strong>{" "}
                Estas deciden por su cuenta cómo usan la información, así que no
                se cargan si no lo autorizas:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-white">Google</strong> (Analytics y
                  Google Ads) — solo con tu consentimiento de medición o
                  publicidad. Hoy no están activados.
                </li>
                <li>
                  <strong className="text-white">Meta</strong> (Pixel y
                  publicidad) — solo con tu consentimiento de publicidad. Hoy no
                  está activado.
                </li>
                <li>
                  <strong className="text-white">WhatsApp</strong> — cuando tú
                  decides continuar la conversación por ahí. Esa conversación se
                  rige por las condiciones de WhatsApp.
                </li>
              </ul>

              <p className="text-[#8A8A8A] text-sm">
                Varios de estos servicios procesan información fuera de México.
                La figura jurídica exacta de cada relación —encargado,
                responsable independiente o transferencia— está pendiente de
                confirmarse en revisión legal, y este aviso se actualizará
                cuando así sea.
              </p>
            </Section>

            <Section title="Cuánto tiempo los conservamos">
              <p>
                <strong className="text-white">Si no llegamos a trabajar juntos:</strong>{" "}
                conservamos tus datos {legal.retencionProspectosMeses} meses desde
                la última vez que hubo contacto. Pasado ese plazo se eliminan o se
                anonimizan, salvo que vuelvas a escribirnos, que iniciemos un
                proyecto o que exista una obligación legal que nos obligue a
                conservarlos.
              </p>
              <p>
                <strong className="text-white">Si eres cliente:</strong> los datos
                ligados al proyecto, la facturación y las obligaciones fiscales se
                conservan durante el tiempo que marque la obligación legal o
                contractual que aplique a cada caso.
              </p>
            </Section>

            <Section title="Tus derechos">
              <p>
                Puedes pedirnos acceder a tus datos, corregirlos, cancelarlos u
                oponerte a su uso — son los derechos ARCO. Escríbenos a{" "}
                <a
                  href={`mailto:${legal.correoPrivacidad}`}
                  className="text-white underline underline-offset-4 hover:text-[#4cfc0f]"
                >
                  {legal.correoPrivacidad}
                </a>{" "}
                indicándonos qué necesitas y cómo contactarte. Te respondemos por
                la misma vía.
              </p>
              <p className="text-[#8A8A8A] text-sm">
                El procedimiento formal y los plazos de respuesta que marca la
                ley están pendientes de definirse en revisión legal.
              </p>
            </Section>

            <Section title="Cookies">
              <p>
                Puedes cambiar en cualquier momento qué permites.{" "}
                <ConsentPreferencesLink />
              </p>
              <p>
                Si rechazas medición y publicidad, esos scripts no se cargan: no
                es que se carguen y no registren nada, es que no llegan a la
                página.
              </p>
            </Section>

            <Section title="Cambios a este aviso">
              <p>
                Si cambiamos cómo tratamos los datos, actualizaremos esta página
                y volveremos a pedirte tus preferencias de cookies.
              </p>
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
