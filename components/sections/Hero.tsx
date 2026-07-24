import Link from "next/link"
import Image from "next/image"
import GhostButton from "@/components/ui/GhostButton"

export default function Hero() {
  return (
    <section className="bg-[#0A0A0A] min-h-screen flex flex-col justify-between pt-16 lg:pt-20 relative overflow-hidden snap-start">
      {/* Background texture */}
      <Image
        src="/imgs/hero/img-84.webp"
        alt=""
        aria-hidden="true"
        fill
        className="object-cover opacity-20 pointer-events-none select-none"
        sizes="100vw"
        priority
      />

      {/* Decorative shape top-right */}
      <Image
        src="/imgs/hero/sec-1-shape-25.webp"
        alt=""
        aria-hidden="true"
        width={420}
        height={420}
        className="absolute top-0 right-0 w-72 lg:w-[420px] h-auto opacity-60 pointer-events-none select-none"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 flex flex-col flex-1 justify-center py-6 lg:py-10 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
        {/* Left: copy */}
        <div>
          {/* Eyebrow */}
          <div className="mb-10">
            <span className="text-xs tracking-widest uppercase text-[#888] border border-[#333] px-3 py-1 inline-block">
              Desarrollo Web &amp; Consultoría de Negocio
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Sistemas que optimizan tus ventas
          </h1>

          {/* Subheadline */}
          <p className="text-[#888] text-lg mt-6 max-w-xl leading-relaxed">
            Desarrollo web y consultoría de negocio para PyMEs mexicanas.
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link
              href="/analisis"
              className="group bg-[#4cfc0f] text-black font-bold px-8 py-4 text-base inline-flex items-center gap-3 transition-all hover:shadow-[0_0_28px_rgba(76,252,15,0.4)] active:scale-[0.98]"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-40" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black" />
              </span>
              Analiza tu negocio
              <span className="text-lg transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
            </Link>
            <GhostButton
              href="#trabajo"
              tone="dark"
              line1="Ver nuestro trabajo"
              line2="proyectos ya entregados"
            />
          </div>

          {/* Precio ancla — mobile only (en desktop aparece como card flotante en la columna derecha) */}
          <div className="flex items-center mt-8 lg:hidden">
            <div className="border border-[#4cfc0f]/40 px-5 py-3">
              <p className="text-[#4cfc0f] text-[10px] font-semibold uppercase tracking-widest leading-none mb-1">
                Proyectos desde
              </p>
              <p className="text-white font-bold text-xl leading-none">$15,000 MXN</p>
            </div>
          </div>

          {/* Social proof */}
          <div className="flex flex-col gap-3 mt-10 pt-8 border-t border-[#1F1F1F] lg:flex-row lg:gap-10">
            <div className="lg:max-w-[150px]">
              <p className="text-sm lg:text-lg font-bold text-white leading-snug">Impacto real</p>
              <p className="text-[#888] text-xs mt-1">Proyectos entregados de inicio a fin</p>
            </div>
            <div className="lg:max-w-[150px]">
              <p className="text-sm lg:text-lg font-bold text-white leading-snug">Construimos lo que vendemos</p>
              <p className="text-[#888] text-xs mt-1">Productos propios en producción</p>
            </div>
            <div className="lg:max-w-[150px]">
              <p className="text-sm lg:text-lg font-bold text-white leading-snug">Confianza ganada</p>
              <p className="text-[#888] text-xs mt-1">Clientes que regresan y recomiendan</p>
            </div>
          </div>
        </div>

        {/* Right: portrait image */}
        <div className="hidden lg:flex items-center justify-center relative mt-12 lg:mt-0">
          {/* Decorative circle rings */}
          <div className="absolute w-[560px] h-[560px] rounded-full border border-[#4cfc0f]/20" />
          <div className="absolute w-[480px] h-[480px] rounded-full border border-[#4cfc0f]/10" />

          {/* Portrait in circle */}
          <div className="relative w-[520px] h-[520px] rounded-full overflow-hidden border-2 border-[#4cfc0f]/30">
            <Image
              src="/imgs/hero/img-84.webp"
              alt="Equipo users.mx"
              fill
              className="object-cover"
              sizes="520px"
              priority
            />
          </div>

          {/* Floating accent card */}
          <div className="absolute bottom-8 -left-4 bg-[#0A0A0A] border border-[#1F1F1F] p-4">
            <p className="text-[#4cfc0f] text-xs font-semibold uppercase tracking-widest">Proyectos desde</p>
            <p className="text-white font-bold text-xl">$11,900 MXN</p>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="border-t border-[#1F1F1F] pt-8 pb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {["Estrategia", "Diseño", "Desarrollo", "Crecimiento"].map(
              (tag, index, arr) => (
                <span key={tag} className="text-[#888] text-sm flex items-center gap-4">
                  {tag}
                  {index < arr.length - 1 && (
                    <span className="text-[#333] ml-0">·</span>
                  )}
                </span>
              )
            )}
          </div>
          <span className="text-[#888] text-sm whitespace-nowrap">
            Ciudad de México · hola@users.mx
          </span>
        </div>
      </div>
    </section>
  )
}
