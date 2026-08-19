import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/site/Header"
import Footer from "@/components/site/Footer"
import { siteConfig, defaultOgImage } from "@/lib/site-config"
import ConsentPreferencesLink from "@/components/consent/ConsentPreferencesLink"

/**
 * Aviso de privacidad.
 *
 * ESTADO: BORRADOR TÉCNICO. Describe con exactitud lo que el sitio hace hoy
 * —qué datos se recogen, dónde se guardan y con quién se comparten— porque eso
 * sí se puede verificar leyendo el código.
 *
 * Lo que NO contiene son los datos que la LFPDPPP exige y que no se pueden
 * deducir del repositorio: razón social, RFC, domicilio fiscal y responsable
 * de datos personales. Inventarlos sería peor que no tenerlos.
 *
 * ANTES DE ACTIVAR LOS PIXELS DE META O GOOGLE este documento tiene que pasar
 * por revisión legal y completarse. Está enlazado desde el aviso de cookies,
 * así que una versión incompleta es visible para cualquiera.
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

          {/* Este bloque es visible a propósito: mientras el documento esté
              incompleto, quien lo lea debe saberlo. */}
          <div
            role="note"
            className="mt-6 border border-[#C7452F] bg-[#1A0E0C] p-4 lg:p-5"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#F0B4AA]">
              Documento en preparación
            </p>
            <p className="text-[#F0B4AA] text-sm mt-2.5 leading-relaxed">
              Este aviso describe con exactitud los tratamientos de datos que
              hace el sitio hoy, pero todavía le faltan los datos de
              identificación fiscal del responsable. Está pendiente de revisión
              legal antes de activar herramientas de publicidad.
            </p>
          </div>

          <div className="mt-10">
            <Section title="Quién es responsable de tus datos">
              <p>
                USERS, con domicilio en {siteConfig.contact.city}, México. Puedes
                contactarnos en{" "}
                <a
                  href={`mailto:${email}`}
                  className="text-white underline underline-offset-4 hover:text-[#4cfc0f]"
                >
                  {email}
                </a>{" "}
                o al {whatsappDisplay}.
              </p>
              <p className="text-[#8A8A8A] text-sm">
                <strong className="text-[#B0B0B0]">Pendiente:</strong> razón
                social, RFC, domicilio fiscal completo y persona designada como
                responsable de datos personales. La Ley Federal de Protección de
                Datos Personales en Posesión de los Particulares los exige.
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
                <li>Prepararte un diagnóstico y una estimación de tu proyecto.</li>
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
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-white">Supabase</strong> — donde se
                  almacenan los diagnósticos del Motor de Análisis.
                </li>
                <li>
                  <strong className="text-white">Resend</strong> — el servicio
                  con el que nos llega la notificación de tu solicitud.
                </li>
                <li>
                  <strong className="text-white">Vercel</strong> — donde está
                  alojado el sitio.
                </li>
                <li>
                  <strong className="text-white">Google y Meta</strong> — solo si
                  aceptaste la categoría de publicidad o medición.
                </li>
              </ul>
              <p className="text-[#8A8A8A] text-sm">
                Algunos de estos proveedores procesan datos fuera de México. La
                revisión legal debe confirmar cómo enunciar esa transferencia.
              </p>
            </Section>

            <Section title="Cuánto tiempo los conservamos">
              <p className="text-[#8A8A8A] text-sm">
                <strong className="text-[#B0B0B0]">Pendiente de definir.</strong>{" "}
                Hoy no existe una política de retención documentada. Es una
                decisión comercial y legal, no técnica, y este aviso no debe
                afirmar un plazo que no se cumple.
              </p>
            </Section>

            <Section title="Tus derechos">
              <p>
                Puedes pedirnos acceder a tus datos, corregirlos, cancelarlos u
                oponerte a su uso — son los derechos ARCO. Escríbenos a{" "}
                <a
                  href={`mailto:${email}`}
                  className="text-white underline underline-offset-4 hover:text-[#4cfc0f]"
                >
                  {email}
                </a>{" "}
                y te respondemos por la misma vía.
              </p>
              <p className="text-[#8A8A8A] text-sm">
                <strong className="text-[#B0B0B0]">Pendiente:</strong> el
                procedimiento formal y el plazo de respuesta que exige la ley.
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
