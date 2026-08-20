/**
 * Prueba social.
 *
 * Los comentarios están editados a partir de experiencias reales de clientes,
 * no son transcripciones literales. Por eso NO van entre comillas: unas
 * comillas afirman que esas fueron las palabras exactas, y eso solo se puede
 * sostener con la aprobación del wording final. Se declara una vez, en una
 * línea, sin convertirlo en una nota legal.
 *
 * Las fotografías que había antes eran de stock y no correspondían a estas
 * personas, así que el avatar se construye con iniciales.
 *
 * Son dos y no tres: el tercero se atribuía a "Cliente de consultoría", que
 * no describe nada que USERS ofrezca hoy, y su contenido era genérico. Dos
 * testimonios verificables valen más que tres de los cuales uno no se sostiene.
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
      "Administrábamos el gimnasio en tres lugares distintos: el sitio por un lado, los socios por otro y la caja aparte. Ahora es un solo sistema.",
    name: "Alexis N.",
    company: "Greek Gym · Puebla",
  },
  {
    /**
     * El texto anterior decía "recibir pedidos en línea". Las Frescas no tiene
     * tienda en línea: lo que se construyó es un cotizador. El testimonio
     * contradecía nuestra propia página del caso.
     */
    quote:
      "Antes casi toda cotización empezaba desde cero por mensaje. Ahora nuestros clientes revisan opciones y arman lo que necesitan antes de escribirnos.",
    name: "Mariana Lara",
    company: "Copropietaria · Las Frescas",
  },
]

export default function Testimonials() {
  return (
    <section className="bg-white py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-[#0A0A0A]">
          Lo que dicen nuestros clientes
        </h2>
        <p className="text-[#6B6B6B] text-[13px] mt-2">
          Comentarios de clientes, editados para mayor claridad.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8 mt-6 lg:mt-8 max-w-4xl">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="border-t-2 border-[#0A0A0A] pt-6 flex flex-col"
            >
              <blockquote className="text-[#333] text-sm lg:text-[15px] leading-relaxed flex-1">
                {testimonial.quote}
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
