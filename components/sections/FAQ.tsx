"use client"

import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "¿Cómo funciona el proceso de trabajo?",
    answer:
      "Empezamos con una sesión de descubrimiento para entender tu negocio y objetivos. A partir de ahí, diseñamos una propuesta técnica y visual, validamos contigo y comenzamos el desarrollo en ciclos cortos con entregas parciales visibles.",
  },
  {
    question: "¿Cuánto tarda un proyecto típico?",
    answer:
      "Depende del alcance. Un sitio con funcionalidades básicas puede estar listo en 3-4 semanas. Proyectos más complejos con sistemas de administración o integraciones pueden tomar de 6 a 12 semanas.",
  },
  {
    question: "¿Trabajan con negocios pequeños?",
    answer:
      "Sí. La mayoría de nuestros proyectos son para negocios medianos y pequeños con ambición de crecer. No necesitas ser una empresa grande para tener una presencia digital profesional que funcione.",
  },
  {
    question: "¿Pueden desarrollar funcionalidades a medida?",
    answer:
      "Absolutamente. Además de proyectos estándar, construimos sistemas, cotizadores, portales de cliente y flujos personalizados. Si tienes una necesidad específica, la analizamos y proponemos la mejor solución técnica.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-24 lg:py-32 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          {/* Left */}
          <div className="lg:col-span-4 mb-12 lg:mb-0">
            <h2 className="text-3xl font-bold italic text-[#0A0A0A]">
              Preguntas frecuentes
            </h2>
            <p className="text-[#888] text-sm mt-4">
              ¿No encuentras lo que buscas?
            </p>
            <a
              href="mailto:hola@users.mx"
              className="text-sm font-semibold underline mt-2 inline-block text-[#0A0A0A] hover:text-[#888] transition-colors"
            >
              Escríbenos →
            </a>
          </div>

          {/* Right: accordion */}
          <div className="lg:col-span-8">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-[#E5E5E5]">
                <button
                  className="flex justify-between w-full py-5 text-left font-semibold text-[#0A0A0A] hover:text-[#888] transition-colors"
                  onClick={() => toggle(index)}
                  aria-expanded={openIndex === index}
                >
                  <span>{faq.question}</span>
                  <span className="ml-4 shrink-0 text-lg leading-none">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="text-[#888] text-sm pb-5 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
