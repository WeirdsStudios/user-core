import Link from "next/link"
import Image from "next/image"

export default function FinalCTA() {
  return (
    <section className="bg-[#0A0A0A] py-32 lg:py-48 text-center text-white relative overflow-hidden snap-start">
      {/* Background texture */}
      <Image
        src="/imgs/bg/bg-img.webp"
        alt=""
        aria-hidden="true"
        fill
        className="object-cover opacity-10 pointer-events-none select-none"
        sizes="100vw"
      />

      {/* Decorative circles */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#4cfc0f]/10 pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#4cfc0f]/10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <span className="text-xs tracking-widest uppercase text-[#888] border border-[#333] px-3 py-1 inline-block mb-8">
          Siguiente paso
        </span>

        <h2 className="text-4xl lg:text-6xl font-bold text-white max-w-3xl mx-auto leading-tight">
          Hablemos de tu próximo proyecto
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link
            href="/analisis"
            className="bg-[#4cfc0f] text-black font-bold px-10 py-4 inline-flex items-center justify-center transition-opacity hover:opacity-90"
          >
            Analiza tu negocio gratis
          </Link>
          <a
            href="mailto:hola@users.mx"
            className="border border-white text-white px-10 py-4 inline-flex items-center justify-center transition-colors hover:bg-white hover:text-[#0A0A0A]"
          >
            o escríbenos directo
          </a>
        </div>

        <p className="text-[#888] text-sm mt-8">
          Lunes a Viernes, 9:00 a 18:00 hrs · Ciudad de México
        </p>
      </div>
    </section>
  )
}
