import Image from "next/image"
import GhostButton from "@/components/ui/GhostButton"

const members = [
  {
    role: "Desarrollo",
    label: "Equipo users.mx",
    image: "/imgs/team/sec-6-member-1.webp",
    description: "Código que se mantiene simple, para que crecer contigo no signifique reconstruir todo.",
  },
  {
    role: "Diseño",
    label: "Equipo users.mx",
    image: "/imgs/team/sec-6-member-2.webp",
    description: "Cada interfaz que diseñamos empieza por entender a quien la va a usar, no por elegir colores.",
  },
  {
    role: "Estrategia",
    label: "Equipo users.mx",
    image: "/imgs/team/sec-6-member-3.webp",
    description: "Analizamos tu negocio antes de escribir una sola línea de código.",
  },
  {
    role: "Marketing",
    label: "Equipo users.mx",
    image: "/imgs/team/sec-6-member-4.webp",
    description: "Tu presencia digital no termina en el lanzamiento — la hacemos crecer con datos reales.",
  },
]

// Actualiza con las certificaciones reales del equipo o elimina si no aplica
const badges = ["Google UX Design", "Microsoft AI"]

export default function Team() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left */}
          <div>
            <span className="text-xs tracking-widest uppercase text-[#888] border border-[#E5E5E5] px-3 py-1 inline-block mb-6">
              Por qué elegirnos
            </span>

            {/* Stat de experiencia */}
            <div className="mb-6">
              <p className="text-5xl font-bold text-[#0A0A0A] leading-none">10+</p>
              <p className="text-sm text-[#888] mt-1">años de experiencia combinada</p>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0A] leading-tight">
              El equipo detrás de users.mx
            </h2>
            <p className="text-[#888] mt-4 text-base leading-relaxed">
              Desarrolladores y consultores con experiencia real construyendo
              productos digitales que funcionan.
            </p>
            <GhostButton
              href="mailto:hola@users.mx"
              tone="light"
              className="mt-6"
              line1="Trabaja con nosotros"
              line2="hola@users.mx"
            />

            {/* Badges de certificación */}
            <div className="flex flex-wrap gap-2 mt-6">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="text-xs border border-[#E5E5E5] px-3 py-1.5 text-[#555] rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-8 border-t border-[#E5E5E5] pt-8 text-sm text-[#888]">
              Ciudad de México, México · hola@users.mx
            </div>
          </div>

          {/* Right: 2×2 grid con fotos y descripción por rol */}
          <div className="grid grid-cols-2 gap-4 mt-12 lg:mt-0">
            {members.map((item) => (
              <div key={item.role}>
                {/* Photo card */}
                <div className="group rounded-2xl overflow-hidden relative">
                  <div className="aspect-square overflow-hidden relative">
                    <Image
                      src={item.image}
                      alt={`${item.role} — ${item.label}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width:1024px) 50vw, 300px"
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
                {/* Descripción del rol */}
                <p className="text-[#888] text-xs mt-3 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
