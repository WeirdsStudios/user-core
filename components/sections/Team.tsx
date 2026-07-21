const roles = [
  { role: "Desarrollo", label: "Equipo users.mx" },
  { role: "Diseño", label: "Equipo users.mx" },
  { role: "Estrategia", label: "Equipo users.mx" },
  { role: "Marketing", label: "Equipo users.mx" },
]

export default function Team() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left */}
          <div>
            <p className="text-xs tracking-widest uppercase text-[#888] mb-4">
              Por qué elegirnos
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0A]">
              El equipo detrás de users.mx
            </h2>
            <p className="text-[#888] mt-4 text-base leading-relaxed">
              Desarrolladores y consultores con experiencia real construyendo
              productos digitales que funcionan.
            </p>
            <a
              href="mailto:hola@users.mx"
              className="text-sm font-semibold underline mt-6 inline-block text-[#0A0A0A] hover:text-[#888] transition-colors"
            >
              Trabaja con nosotros →
            </a>

            <div className="mt-8 border-t border-[#E5E5E5] pt-8 text-sm text-[#888]">
              Ciudad de México, México · hola@users.mx
            </div>
          </div>

          {/* Right: 2×2 grid */}
          <div className="grid grid-cols-2 gap-4 mt-12 lg:mt-0">
            {roles.map((item) => (
              <div key={item.role} className="bg-[#F5F5F5] rounded-2xl p-6">
                <p className="text-xs text-[#888] uppercase tracking-wider">
                  {item.role}
                </p>
                <p className="text-base font-semibold mt-1 text-[#0A0A0A]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
