/**
 * Los testimonios y los nombres son reales; las fotografías que había antes no
 * lo eran (imágenes de stock), así que el avatar se construye con iniciales.
 * Sin carrusel: son tres, caben en grid y en móvil se apilan — un carrusel
 * escondería dos tercios de la prueba social detrás de un gesto.
 */
interface Testimonial {
  quote: string
  name: string
  company: string
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

const testimonials: Testimonial[] = [
  {
    quote:
      "users.mx transformó la forma en que administramos nuestro gimnasio. Ahora todo está en un solo lugar.",
    name: "Alexis N.",
    company: "Greek Gym, Puebla",
  },
  {
    quote:
      "El sitio que construyeron para Las Frescas nos ayudó a recibir pedidos en línea desde el primer mes.",
    name: "Karina R.",
    company: "Las Frescas, CDMX",
  },
  {
    quote:
      "Profesionales, puntuales y con visión de negocio real. No solo desarrollan — entienden lo que necesitas.",
    name: "Alejandra V.",
    company: "Cliente de consultoría",
  },
]

export default function Testimonials() {
  return (
    <section className="bg-white py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-[#0A0A0A]">
          Lo que dicen nuestros clientes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mt-6 lg:mt-8">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="border-t-2 border-[#0A0A0A] pt-6 flex flex-col"
            >
              <blockquote className="text-[#333] text-sm lg:text-[15px] leading-relaxed flex-1">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3 mt-4">
                <span
                  className="w-9 h-9 rounded-full bg-[#0A0A0A] text-[#4cfc0f] flex items-center justify-center text-[11px] font-bold shrink-0"
                  aria-hidden="true"
                >
                  {initials(testimonial.name)}
                </span>
                <span className="text-sm">
                  <span className="block text-[#0A0A0A] font-semibold">{testimonial.name}</span>
                  <span className="block text-[#6B6B6B] text-xs">{testimonial.company}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
