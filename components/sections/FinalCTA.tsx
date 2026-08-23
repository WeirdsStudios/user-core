import Link from "next/link"
import { siteConfig } from "@/lib/site-config"
import { getWhatsAppLink } from "@/lib/whatsapp"

/**
 * Cierre. Responde "ya entendí qué hacen, ¿qué hago ahora?" con dos rutas
 * según qué tan definido tenga el visitante lo que necesita — sin copy
 * genérico de transformación digital.
 */
export default function FinalCTA() {
  return (
    <section id="contacto" className="bg-[#0A0A0A] text-white py-14 lg:py-28 border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <h2 className="text-[1.75rem] sm:text-3xl lg:text-5xl font-bold leading-[1.1] max-w-2xl text-balance tracking-tight">
          ¿Empezamos?
        </h2>
        <p className="text-[#9E9E9E] text-base lg:text-lg mt-5 max-w-xl leading-relaxed">
          Si ya sabes qué necesitas, escríbenos y lo platicamos. Si todavía no
          lo tienes claro, el análisis te da un punto de partida en unos minutos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12 max-w-3xl">
          {/* Ruta 1 — no sabe qué necesita */}
          <div className="border border-[#4cfc0f]/40 bg-[#111] p-7 flex flex-col">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#4cfc0f]">
              No sé por dónde empezar
            </p>
            <p className="text-[#9E9E9E] text-sm mt-3 leading-relaxed flex-1">
              Contesta 6 pasos sobre tu negocio y recibe un diagnóstico con
              estimado de inversión.
            </p>
            <Link
              href="/analisis"
              className="group bg-[#4cfc0f] text-black font-bold px-6 py-3.5 text-sm inline-flex items-center justify-center gap-2.5 mt-6 transition-all hover:shadow-[0_0_24px_rgba(76,252,15,0.35)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Analizar mi negocio
              <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Ruta 2 — ya sabe qué necesita */}
          <div className="border border-[#2A2A2A] p-7 flex flex-col">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#888]">
              Ya sé qué necesito
            </p>
            <p className="text-[#9E9E9E] text-sm mt-3 leading-relaxed flex-1">
              Cuéntanos qué tienes en mente y te decimos si podemos ayudarte y
              cómo.
            </p>
            <a
              href={getWhatsAppLink("hero")}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#444] text-white font-semibold px-6 py-3.5 text-sm inline-flex items-center justify-center gap-2.5 mt-6 transition-colors hover:border-[#4cfc0f] hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cfc0f]"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>

        <p className="text-[#8A8A8A] text-sm mt-10">
          {siteConfig.contact.hours} · {siteConfig.contact.city} ·{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="hover:text-white transition-colors underline underline-offset-4 inline-block py-1.5"
          >
            {siteConfig.contact.email}
          </a>
        </p>
      </div>
    </section>
  )
}
