"use client"

import { useState } from "react"
import { getWhatsAppLink } from "@/lib/whatsapp"

interface FAQItem {
  question: string
  answer: string
  link?: { href: string; label: string }
}

const faqs: FAQItem[] = [
  {
    question: "¿Cuánto pago al inicio y cuánto al final?",
    answer:
      "Trabajamos con 60/40 — 60% al iniciar el proyecto, 40% al entregarlo. El pago final solo se libera cuando el sitio está 100% aprobado por ti.",
  },
  {
    question: "¿Qué pasa si el resultado no me convence?",
    answer:
      "Garantía de Aprobación: no se libera el pago final hasta que apruebes el proyecto. Si algo no cumple lo acordado en el brief inicial, seguimos ajustando dentro del alcance original sin costo adicional, retomando siempre desde tu último feedback aprobado, sin límite de rondas.",
  },
  {
    question: "¿Qué incluye el proyecto y qué no?",
    answer:
      "Incluye dominio, hosting, hasta 3 rondas de revisión, soporte gratuito el primer mes después del lanzamiento (o 2 meses de descuento si contratas el plan de soporte anual), manual de uso de tu plataforma, y acceso a nuestra Central de Ayuda disponible 24/7.",
  },
  {
    question: "¿Por qué es más caro que Wix o que alguien conocido me lo haga más barato?",
    answer:
      "No solo entregamos un sitio — cada funcionalidad se personaliza a tu negocio basándonos en estudio de mercado, análisis de negocio y proyección de retorno de inversión. Hacemos estrategia de negocio digital completa que respalda y le da forma al sitio, no solo una plantilla con tu logo encima.",
  },
  {
    question: "¿Quién me da soporte después de lanzar?",
    answer:
      "Tienes soporte gratuito el primer mes. Después puedes contratar uno de nuestros planes de mantenimiento (desde $399 MXN/mes) que incluyen hosting, respaldos, cambios de contenido y soporte por WhatsApp.",
    link: { href: "#mantenimiento", label: "Ver planes de mantenimiento" },
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
              href={getWhatsAppLink("faq")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold underline mt-2 inline-block text-[#0A0A0A] hover:text-[#888] transition-colors"
            >
              Escríbenos por WhatsApp →
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
                  <div className="pb-5">
                    <p className="text-[#888] text-sm leading-relaxed">{faq.answer}</p>
                    {faq.link && (
                      <a
                        href={faq.link.href}
                        className="inline-block mt-3 text-xs font-semibold text-[#0A0A0A] hover:text-[#888] transition-colors underline"
                      >
                        {faq.link.label} ↓
                      </a>
                    )}
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
