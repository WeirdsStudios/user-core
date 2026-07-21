const members = [
  {
    role: "Desarrollo",
    label: "Equipo users.mx",
    image: "/imgs/team/sec-6-member-1.webp",
  },
  {
    role: "Diseño",
    label: "Equipo users.mx",
    image: "/imgs/team/sec-6-member-2.webp",
  },
  {
    role: "Estrategia",
    label: "Equipo users.mx",
    image: "/imgs/team/sec-6-member-3.webp",
  },
  {
    role: "Marketing",
    label: "Equipo users.mx",
    image: "/imgs/team/sec-6-member-4.webp",
  },
]

export default function Team() {
  return (
    <section className="py-24 lg:py-32 bg-white snap-start">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left */}
          <div>
            <span className="text-xs tracking-widest uppercase text-[#888] border border-[#E5E5E5] px-3 py-1 inline-block mb-6">
              Por qué elegirnos
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0A] leading-tight">
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

          {/* Right: 2×2 grid with photos */}
          <div className="grid grid-cols-2 gap-4 mt-12 lg:mt-0">
            {members.map((item) => (
              <div key={item.role} className="group rounded-2xl overflow-hidden relative">
                {/* Photo */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={`${item.role} — ${item.label}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Label overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                  <p className="text-[#4cfc0f] text-xs uppercase tracking-wider font-semibold">
                    {item.role}
                  </p>
                  <p className="text-white text-sm font-medium mt-0.5">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
