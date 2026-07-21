export default function Manifesto() {
  return (
    <section className="bg-[#F5F5F5] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Eyebrow */}
        <p className="text-xs tracking-widest uppercase text-[#888] mb-8">
          Quiénes somos
        </p>

        {/* Large quote */}
        <blockquote className="text-3xl lg:text-5xl font-bold leading-tight max-w-5xl text-[#0A0A0A]">
          Construimos con estrategia, diseñamos con propósito y desarrollamos con
          precisión — para que tu negocio crezca de forma sostenida.
        </blockquote>

        {/* Divider */}
        <hr className="border-t border-[#E5E5E5] my-12" />

        {/* 2-col grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <p className="text-[#555] text-base leading-relaxed">
            Somos un equipo de desarrolladores y consultores de negocio con
            experiencia construyendo desde cero.
          </p>
          <div>
            <p className="text-[#555] text-base leading-relaxed">
              Creamos SoFit y Consulto a partir de necesidades reales que vimos en
              nuestros clientes — ese mismo proceso aplicamos en cada proyecto
              nuevo.
            </p>
            <a
              href="#trabajo"
              className="text-sm font-semibold underline mt-6 inline-block text-[#0A0A0A] hover:text-[#888] transition-colors"
            >
              Conocer nuestro trabajo →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
