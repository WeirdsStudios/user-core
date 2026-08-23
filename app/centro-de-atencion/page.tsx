import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/site/Header"
import Footer from "@/components/site/Footer"
import SupportChat from "@/components/support/SupportChat"
import { siteConfig, defaultOgImage } from "@/lib/site-config"
import { KB_CATEGORIES, KB_ENTRIES } from "@/lib/knowledge-base"
import { getWhatsAppLink } from "@/lib/whatsapp"

/**
 * Centro de Atención — experiencia principal de soporte.
 *
 * INDEXABILIDAD: sí se indexa. Es una página con valor propio ("cómo atiende
 * USERS después de publicar") y refuerza la promesa de seguimiento que el
 * resto del sitio hace. Lo que NO se indexa es ninguna conversación: viven
 * solo en la sesión del navegador, nunca en el servidor ni en el HTML.
 */
export const metadata: Metadata = {
  title: "Centro de Atención — USERS",
  description:
    "Resuelve dudas sobre tu sitio, sistema o proyecto con USERS. Atención automatizada disponible siempre y escalamiento a un especialista dentro del horario de atención.",
  alternates: { canonical: "/centro-de-atencion" },
  openGraph: {
      images: [defaultOgImage],
    title: "Centro de Atención — USERS",
    description:
      "Atención para tu sitio y tus proyectos: dudas, ajustes, incidentes y escalamiento a un especialista.",
    url: `${siteConfig.url}/centro-de-atencion`,
    type: "website",
  },
}

export default function CentroDeAtencionPage() {
  const { supportHours, supportDaysLabel, email } = siteConfig.contact

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Centro de Atención",
        item: `${siteConfig.url}/centro-de-atencion`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Header />
      <main className="bg-[#0A0A0A] text-white">
        <header className="relative pt-28 pb-8 lg:pt-36 lg:pb-10 overflow-hidden">
          <div
            aria-hidden="true"
            className="grid-tech absolute inset-0 pointer-events-none"
            style={{
              maskImage:
                "radial-gradient(ellipse 90% 60% at 50% 0%, #000 30%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 90% 60% at 50% 0%, #000 30%, transparent 100%)",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <nav
              aria-label="Ruta de navegación"
              className="font-mono text-[11px] text-[#8A8A8A]"
            >
              <Link
                href="/"
                className="hover:text-white transition-colors py-1.5 inline-block"
              >
                Inicio
              </Link>
              <span className="mx-2 text-[#8A8A8A]" aria-hidden="true">
                /
              </span>
              <span className="text-[#9E9E9E]">Centro de Atención</span>
            </nav>

            <h1 className="text-[1.85rem] sm:text-4xl lg:text-[3rem] font-bold leading-[1.12] mt-5 max-w-3xl text-balance tracking-tight">
              ¿En qué podemos ayudarte?
            </h1>
            <p className="text-[#B0B0B0] text-[15px] lg:text-lg mt-4 max-w-2xl leading-relaxed">
              Escribe lo que necesitas y el Centro te orienta con la información
              de nuestra Central de Ayuda. Cuando la solicitud requiere criterio,
              acceso o cotización, la pasamos a una persona del equipo.
            </p>
          </div>
        </header>

        <section
          aria-label="Conversación con el Centro de Atención"
          className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-14 lg:pb-24"
        >
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">
            {/* ── Conversación ── */}
            <div className="lg:col-span-8">
              <div className="border border-[#222] bg-[#0E0E0E] h-[min(38rem,calc(100dvh-12rem))] flex flex-col">
                <SupportChat surface="page" />
              </div>

              <p className="font-mono text-[10px] text-[#8A8A8A] mt-3 leading-relaxed">
                La conversación se guarda solo en este navegador y se borra al
                cerrar la pestaña. No la almacenamos en ningún servidor.
              </p>
            </div>

            {/* ── Contexto de apoyo ── */}
            <aside className="lg:col-span-4 mt-8 lg:mt-0 space-y-4">
              <div className="border border-[#222] bg-[#0E0E0E] p-4 lg:p-5">
                <h2 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#4cfc0f]">
                  Cómo funciona la atención
                </h2>
                <dl className="mt-4 space-y-4">
                  <div>
                    <dt className="text-sm font-semibold text-white">
                      Centro automatizado
                    </dt>
                    <dd className="text-[#B0B0B0] text-[13px] mt-1.5 leading-relaxed">
                      Disponible a cualquier hora. Responde con la información
                      publicada en nuestra Central de Ayuda. Si no tiene una
                      respuesta confiable, lo dice y escala.
                    </dd>
                  </div>
                  <div className="pt-4 border-t border-[#1F1F1F]">
                    <dt className="text-sm font-semibold text-white">
                      Especialista USERS
                    </dt>
                    <dd className="text-[#B0B0B0] text-[13px] mt-1.5 leading-relaxed">
                      Atiende {supportDaysLabel.toLowerCase()} de {supportHours.from} a{" "}
                      {supportHours.to} h, hora del centro de México. Fuera de ese
                      horario tu solicitud queda registrada y se responde al
                      siguiente día hábil.
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="border border-[#222] bg-[#0E0E0E] p-4 lg:p-5">
                <h2 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A8A8A]">
                  Otros canales
                </h2>
                <ul className="mt-3.5 space-y-2">
                  <li>
                    <a
                      href={getWhatsAppLink("soporte")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 text-sm text-white border border-[#2A2A2A] px-3.5 py-3 transition-colors hover:border-[#4cfc0f] hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cfc0f]"
                    >
                      WhatsApp
                      <span aria-hidden="true">→</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${email}`}
                      className="flex items-center justify-between gap-3 text-sm text-white border border-[#2A2A2A] px-3.5 py-3 transition-colors hover:border-[#4cfc0f] hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cfc0f]"
                    >
                      {email}
                      <span aria-hidden="true">→</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="border border-[#222] bg-[#0E0E0E] p-4 lg:p-5">
                <h2 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A8A8A]">
                  Central de Ayuda
                </h2>
                <p className="text-[#B0B0B0] text-[13px] mt-3 leading-relaxed">
                  {KB_ENTRIES.length} respuestas documentadas. Es la misma fuente
                  que usa el Centro.
                </p>
                <ul className="flex flex-wrap gap-1.5 mt-3.5">
                  {KB_CATEGORIES.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={`/ayuda#${c.id}`}
                        className="inline-block font-mono text-[10px] text-white border border-[#2A2A2A] px-2.5 py-2 transition-colors hover:border-[#4cfc0f] hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cfc0f]"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-[#222] bg-[#0E0E0E] p-4 lg:p-5">
                <h2 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A8A8A]">
                  ¿Todavía no eres cliente?
                </h2>
                <p className="text-[#B0B0B0] text-[13px] mt-3 leading-relaxed">
                  Si lo que buscas es cotizar un proyecto, el Motor de Análisis
                  te da un diagnóstico antes de hablar con nosotros.
                </p>
                <Link
                  href="/analisis"
                  className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-white border-b-2 border-[#4cfc0f] pb-2 pt-2 transition-colors hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
                >
                  Analizar mi proyecto
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
