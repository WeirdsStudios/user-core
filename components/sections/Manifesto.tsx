import Image from "next/image"
import GhostButton from "@/components/ui/GhostButton"

export default function Manifesto() {
  return (
    <section className="bg-[#F5F5F5] py-14 lg:py-28 relative overflow-hidden">
      {/* Decorative image right edge */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block pointer-events-none select-none">
        <Image
          src="/imgs/bg/bg-img2.webp"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover opacity-15"
          sizes="33vw"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Eyebrow */}
        <span className="text-xs tracking-widest uppercase text-[#888] border border-[#CCC] px-3 py-1 inline-block mb-8">
          Quiénes somos
        </span>

        {/* Large quote */}
        <blockquote className="text-3xl lg:text-5xl font-bold leading-tight max-w-4xl text-[#0A0A0A]">
          Construimos con estrategia, diseñamos con propósito y desarrollamos con
          precisión — para que tu negocio crezca de forma sostenida.
        </blockquote>

        {/* Divider */}
        <hr className="border-t border-[#E5E5E5] my-12" />

        {/* 2-col grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-end">
          <p className="text-[#555] text-base leading-relaxed lg:max-w-md">
            Somos un equipo de diseñadores, desarrolladores y consultores de negocio con
            experiencia en empresas trasnacionales, construyendo proyectos innovadores End2End.
          </p>
          <div>
            <p className="text-[#555] text-base leading-relaxed">
              Creamos herramientas para PyMEs Mexicanas a partir de necesidades reales que vemos en
              nuestros clientes — ese mismo proceso de innovación y aprendizaje lo aplicamos en cada proyecto nuevo.
              
            </p>
            <GhostButton
              href="#trabajo"
              tone="light"
              className="mt-6"
              line1="Conoce nuestro trabajo"
              line2="casos de éxito reales"
            />
          </div>
        </div>

        {/* Bottom image strip */}
        <div className="mt-16 grid grid-cols-3 gap-3">
          <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
            <Image
              src="/imgs/hero/img-97.webp"
              alt=""
              aria-hidden="true"
              fill
              className="object-cover opacity-70"
              sizes="(max-width:1024px) 33vw, 400px"
            />
          </div>
          <div className="aspect-[4/3] rounded-xl overflow-hidden col-span-2 relative">
            <Image
              src="/imgs/hero/bg-img-3.webp"
              alt="Equipo users.mx trabajando"
              fill
              className="object-cover object-top"
              sizes="(max-width:1024px) 67vw, 800px"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
