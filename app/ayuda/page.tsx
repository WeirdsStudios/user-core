import Link from "next/link"
import Header from "@/components/site/Header"
import Footer from "@/components/site/Footer"
import AyudaClient from "./AyudaClient"
import { KB_CATEGORIES, KB_ENTRIES } from "@/lib/knowledge-base"
import { siteConfig } from "@/lib/site-config"
import { getWhatsAppLink } from "@/lib/whatsapp"

/**
 * Central de Ayuda. El contenido vive en lib/knowledge-base.ts para que la
 * Fase 7 pueda alimentar con él el Centro de Atención sin duplicar nada.
 */
export default function AyudaPage() {
  return (
    <>
      <Header />
      <main className="bg-[#0A0A0A] text-white">
        <header className="relative pt-28 pb-8 lg:pt-36 lg:pb-12 overflow-hidden">
          <div
            aria-hidden="true"
            className="grid-tech absolute inset-0 pointer-events-none"
            style={{
              maskImage: "radial-gradient(ellipse 90% 60% at 50% 0%, #000 30%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 90% 60% at 50% 0%, #000 30%, transparent 100%)",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <nav aria-label="Ruta de navegación" className="font-mono text-[11px] text-[#8A8A8A]">
              <Link href="/" className="hover:text-white transition-colors py-1.5 inline-block">
                Inicio
              </Link>
              <span className="mx-2 text-[#8A8A8A]" aria-hidden="true">/</span>
              <span className="text-[#9E9E9E]">Central de Ayuda</span>
            </nav>

            <h1 className="text-[1.85rem] sm:text-4xl lg:text-[3rem] font-bold leading-[1.12] mt-5 max-w-3xl text-balance tracking-tight">
              Central de Ayuda
            </h1>
            <p className="text-[#B0B0B0] text-[15px] lg:text-lg mt-4 max-w-2xl leading-relaxed">
              {KB_ENTRIES.length} respuestas sobre cómo trabajamos, qué incluye
              cada plan y cómo resolver lo más común después de publicar.
            </p>

            {/* Índice de categorías */}
            <nav aria-label="Categorías de ayuda" className="mt-7">
              <ul className="flex flex-wrap gap-2">
                {KB_CATEGORIES.map((category) => (
                  <li key={category.id}>
                    <a
                      href={`#${category.id}`}
                      className="inline-block font-mono text-[11px] text-white border border-[#2A2A2A] px-3 py-2 transition-colors hover:border-[#4cfc0f] hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cfc0f]"
                    >
                      {category.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        <AyudaClient />

        {/* Contacto */}
        <section aria-labelledby="contacto-ayuda" className="py-12 lg:py-20 border-t border-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="border border-[#222] bg-[#0E0E0E] p-6 lg:p-8">
              <h2 id="contacto-ayuda" className="text-xl lg:text-2xl font-bold tracking-tight">
                ¿No encontraste lo que buscabas?
              </h2>
              <p className="text-[#B0B0B0] text-sm lg:text-base mt-3 max-w-2xl leading-relaxed">
                Escríbenos y te respondemos. Atendemos{" "}
                {siteConfig.contact.hours.toLowerCase()}.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <a
                  href={getWhatsAppLink("faq")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#4cfc0f] text-black font-bold px-6 py-4 text-[15px] inline-flex items-center justify-center gap-2.5 transition-all hover:shadow-[0_0_32px_rgba(76,252,15,0.4)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Escribir por WhatsApp
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="border border-[#2E2E2E] text-white font-semibold px-6 py-4 text-[15px] inline-flex items-center justify-center gap-2.5 transition-colors hover:border-[#4cfc0f] hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cfc0f]"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
