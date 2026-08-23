import Link from "next/link"
import { siteConfig } from "@/lib/site-config"
import { getWhatsAppLink } from "@/lib/whatsapp"
import StackVisual from "@/components/sections/StackVisual"

/**
 * Mobile first: la columna de copy se diseña para 390px y se expande a dos
 * columnas hasta lg.
 *
 * El visual es propio de USERS (ver StackVisual). Antes eran capturas de Greek
 * Gym, lo que hacía que la marca del cliente dominara el primer viewport y que
 * USERS pareciera una agencia especializada en gimnasios. Greek Gym sigue
 * siendo protagonista, pero donde corresponde: en Casos y en su caso completo.
 */
export default function Hero() {
  return (
    <section className="relative bg-[#0A0A0A] overflow-hidden pt-24 pb-12 sm:pt-28 lg:pt-36 lg:pb-24">
      {/* Rejilla técnica, difuminada hacia abajo */}
      <div
        aria-hidden="true"
        className="grid-tech absolute inset-0 pointer-events-none"
        style={{
          maskImage: "radial-gradient(ellipse 90% 55% at 50% 0%, #000 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 55% at 50% 0%, #000 30%, transparent 100%)",
        }}
      />
      {/* Resplandor de acento */}
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[560px] lg:w-[720px] h-[300px] pointer-events-none opacity-[0.06]"
        style={{ background: "radial-gradient(ellipse at center, #4cfc0f 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-10 xl:gap-14 lg:items-center">
          {/* ── Copy ── */}
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#8A8A8A] border border-[#252525] px-2.5 py-1.5">
              <span className="w-1.5 h-1.5 bg-[#4cfc0f]" aria-hidden="true" />
              Software y web · PyMEs mexicanas
            </span>

            <h1 className="text-[1.85rem] leading-[1.12] sm:text-[2.6rem] lg:text-[3rem] xl:text-[3.4rem] font-bold text-white mt-5 lg:mt-6 text-balance tracking-tight">
              Desarrollo web y software para negocios que quieren{" "}
              <span className="text-[#4cfc0f]">vender y operar mejor</span>.
            </h1>

            <p className="text-[#9E9E9E] text-[15px] sm:text-base lg:text-lg mt-4 lg:mt-6 max-w-xl leading-relaxed">
              Creamos tu presencia digital, construimos los sistemas con los que
              operas por dentro y conectamos a tus clientes con tu negocio.
            </p>

            {/* CTAs — a ancho completo en móvil */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6 lg:mt-8">
              <Link
                href="/analisis"
                className="group bg-[#4cfc0f] text-black font-bold px-6 py-4 text-[15px] inline-flex items-center justify-center gap-2.5 transition-all hover:shadow-[0_0_32px_rgba(76,252,15,0.4)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Analizar mi negocio
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
              </Link>
              <a
                href={getWhatsAppLink("hero")}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#2E2E2E] text-white font-semibold px-6 py-4 text-[15px] inline-flex items-center justify-center gap-2.5 transition-colors hover:border-[#4cfc0f] hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cfc0f]"
              >
                Hablar con nosotros
              </a>
            </div>

            <p className="text-[13px] sm:text-sm text-[#8A8A8A] mt-5 lg:mt-6 max-w-md leading-relaxed flex flex-wrap items-baseline gap-x-2">
              <span className="font-mono text-white text-[13px] sm:text-sm">
                Desde {siteConfig.pricing.startingPriceLabel}
              </span>
              <span className="text-[#8A8A8A]" aria-hidden="true">|</span>
              <span>los sistemas a medida se cotizan por alcance</span>
            </p>
          </div>

          {/* ── Stack digital ── */}
          <div className="lg:col-span-7 mt-8 lg:mt-0">
            <StackVisual />
          </div>
        </div>
      </div>
    </section>
  )
}
