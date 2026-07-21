interface Testimonial {
  quote: string
  name: string
  company: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      "users.mx transformó la forma en que administramos nuestro gimnasio. Ahora todo está en un solo lugar.",
    name: "Carlos M.",
    company: "Greek Gym, Monterrey",
  },
  {
    quote:
      "El sitio que construyeron para Las Frescas nos ayudó a recibir pedidos en línea desde el primer mes.",
    name: "Daniela R.",
    company: "Las Frescas, CDMX",
  },
  {
    quote:
      "Profesionales, puntuales y con visión de negocio real. No solo desarrollan — entienden lo que necesitas.",
    name: "Alejandro V.",
    company: "Cliente de Consultoría",
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Inner dark panel */}
        <div className="bg-[#0A0A0A] rounded-3xl px-8 lg:px-16 py-20 text-white">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-[#888] mt-4 text-base leading-relaxed max-w-xl">
            Experiencias reales de negocios que ya tienen su presencia digital
            funcionando.
          </p>

          {/* 3-col grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-[#141414] rounded-2xl p-8">
                <p className="text-[#FAFAFA] text-base leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="text-[#888] text-sm font-semibold">
                  — {testimonial.name},{" "}
                  <span className="font-normal">{testimonial.company}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
