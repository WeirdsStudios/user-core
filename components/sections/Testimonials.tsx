import Image from "next/image"

interface Testimonial {
  quote: string
  name: string
  company: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      "users.mx transformó la forma en que administramos nuestro gimnasio. Ahora todo está en un solo lugar.",
    name: "Alexis N.",
    company: "Greek Gym, Puebla",
    avatar: "/imgs/team/img-17.webp",
  },
  {
    quote:
      "El sitio que construyeron para Las Frescas nos ayudó a recibir pedidos en línea desde el primer mes.",
    name: "Karina R.",
    company: "Las Frescas, CDMX",
    avatar: "/imgs/team/img-82.webp",
  },
  {
    quote:
      "Profesionales, puntuales y con visión de negocio real. No solo desarrollan — entienden lo que necesitas.",
    name: "Alejandra V.",
    company: "Cliente de Consultoría",
    avatar: "/imgs/team/img-124.webp",
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Inner dark panel */}
        <div className="bg-[#0A0A0A] rounded-3xl px-8 lg:px-16 py-20 text-white relative overflow-hidden">
          {/* Subtle bg texture */}
          <Image
            src="/imgs/bg/bg-img.webp"
            alt=""
            aria-hidden="true"
            fill
            className="object-cover opacity-5 pointer-events-none select-none"
            sizes="100vw"
          />

          <div className="relative">
            <span className="text-xs tracking-widest uppercase text-[#888] border border-[#333] px-3 py-1 inline-block mb-6">
              Testimonios
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-[#888] mt-4 text-base leading-relaxed max-w-xl">
              Experiencias reales de negocios que ya tienen su presencia digital
              funcionando.
            </p>

            {/* 3-col grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-[#141414] rounded-2xl p-8 flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-[#4cfc0f] text-sm">★</span>
                    ))}
                  </div>

                  <p className="text-[#FAFAFA] text-base leading-relaxed mb-6 flex-1 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-[#1F1F1F]">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-white text-sm font-semibold">
                        {testimonial.name}
                      </p>
                      <p className="text-[#888] text-xs">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
