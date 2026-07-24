"use client"

import { useState } from "react"
import Link from "next/link"
import { getWhatsAppLink } from "@/lib/whatsapp"

type FAQItem = {
  q: string
  a: string
}

type Category = {
  id: string
  label: string
  icon: string
  items: FAQItem[]
}

const CATEGORIES: Category[] = [
  {
    id: "proyectos",
    label: "Proyectos y proceso",
    icon: "→",
    items: [
      {
        q: "¿Cuánto tiempo tarda un proyecto?",
        a: "Depende del alcance. Un sitio web informativo tarda entre 3 y 5 semanas. Un proyecto con funcionalidades como reservas, portal de cliente o panel administrativo puede tomar entre 6 y 14 semanas. Lo definimos con precisión en la propuesta, después de tu sesión de análisis.",
      },
      {
        q: "¿Cómo es el proceso de trabajo?",
        a: "Trabajamos en 4 fases: Descubrimiento (entendemos tu negocio y objetivos), Prototipo (validamos visualmente antes de construir), Desarrollo ágil (ciclos cortos con entregas visibles) y Lanzamiento (entregamos, medimos y optimizamos). En cada fase tienes visibilidad total del avance.",
      },
      {
        q: "¿Qué información necesito tener lista para empezar?",
        a: "Para arrancar solo necesitamos tu brief de negocio: qué haces, a quién le vendes y qué resultados esperas del proyecto. El resto — textos, fotos, paleta de colores — lo definimos juntos durante el proceso. No necesitas tenerlo todo desde el día uno.",
      },
      {
        q: "¿Hacen proyectos fuera de Ciudad de México?",
        a: "Sí. Trabajamos con clientes en toda la República Mexicana de forma 100% remota. Las sesiones de trabajo se hacen por videollamada, y el acceso al proyecto está disponible en línea en todo momento.",
      },
    ],
  },
  {
    id: "presupuesto",
    label: "Precios y pagos",
    icon: "$",
    items: [
      {
        q: "¿Cuánto cuesta un proyecto?",
        a: "Los proyectos de desarrollo web comienzan desde $11,900 MXN. El precio final depende del alcance: funcionalidades requeridas, número de páginas e integraciones. Usamos nuestro Motor de Análisis para darte un estimado real con tus datos específicos, de forma gratuita.",
      },
      {
        q: "¿Cómo son los pagos?",
        a: "Trabajamos con esquema 60/40. El 60% al iniciar el proyecto y el 40% al entregarlo. El pago final se libera únicamente cuando apruebes el resultado — nunca antes.",
      },
      {
        q: "¿Qué incluye el precio?",
        a: "Dominio, hosting el primer año, hasta 3 rondas de revisión, soporte gratuito el primer mes después del lanzamiento, manual de uso de tu plataforma y acceso a nuestra Central de Ayuda. Lo que no está incluido se especifica en la propuesta antes de arrancar.",
      },
      {
        q: "¿Hay costos adicionales después de la entrega?",
        a: "El hosting y dominio tienen renovación anual (costo variable según proveedor, generalmente $1,500–$3,000 MXN/año). Si quieres soporte continuo, mantenimiento de contenido o cambios frecuentes, tenemos planes de mantenimiento desde $399 MXN/mes.",
      },
    ],
  },
  {
    id: "garantias",
    label: "Garantías y revisiones",
    icon: "✓",
    items: [
      {
        q: "¿Qué pasa si el resultado no me convence?",
        a: "Aplicamos la Garantía de Aprobación: no se libera el pago final hasta que apruebes el proyecto. Si algo no cumple lo acordado en el brief inicial, seguimos ajustando dentro del alcance original sin costo adicional, retomando siempre desde tu último feedback aprobado.",
      },
      {
        q: "¿Cuántas rondas de revisión incluye el proyecto?",
        a: "Incluimos hasta 3 rondas de revisión por fase del proyecto. Una ronda es un ciclo completo de feedback: tú revisas, nos compartes tus comentarios y nosotros aplicamos los cambios. Cambios fuera del alcance original se cotizan aparte.",
      },
      {
        q: "¿Qué cubre el soporte gratuito del primer mes?",
        a: "Correcciones de contenido, ajustes visuales menores, resolución de errores y dudas de uso de la plataforma. No incluye nuevas funcionalidades ni cambios de alcance. Para necesidades continuas, recomendamos un plan de mantenimiento.",
      },
    ],
  },
  {
    id: "mantenimiento",
    label: "Mantenimiento y soporte",
    icon: "⚙",
    items: [
      {
        q: "¿Qué planes de mantenimiento tienen?",
        a: "Plan Esencial ($399 MXN/mes): hosting, 2 cambios de contenido al mes, respaldo mensual y soporte por WhatsApp. Plan Prioritario ($799 MXN/mes): todo lo anterior más cambios ilimitados, soporte prioritario y acceso completo a la Central de Ayuda.",
      },
      {
        q: "¿Puedo contratar el plan de mantenimiento después de la entrega?",
        a: "Sí. Puedes contratar cualquier plan de mantenimiento en cualquier momento, incluso meses después del lanzamiento. Si lo contratas en la entrega, el primer mes tiene un descuento del 30%.",
      },
      {
        q: "¿Qué pasa si tengo una emergencia en mi sitio?",
        a: "Los clientes con plan Prioritario tienen tiempo de respuesta garantizado de 4 horas en días hábiles. Para clientes sin plan activo, atendemos emergencias críticas con tarifa por hora. Contáctanos por WhatsApp para cualquier urgencia.",
      },
    ],
  },
  {
    id: "sofit-consulto",
    label: "SoFit y Consulto",
    icon: "◉",
    items: [
      {
        q: "¿Qué es SoFit?",
        a: "SoFit es una plataforma administrativa para gimnasios boutique, estudios fitness y entrenadores personales. Incluye agenda de clases, control de membresías, cobro automático, portal de socios y notificaciones. Desde $599 MXN/mes, sin contratos anuales.",
      },
      {
        q: "¿Qué es Consulto?",
        a: "Consulto es un sistema de gestión para consultorios, clínicas y profesionales de la salud. Incluye agenda de citas, historial de pacientes, recordatorios automáticos y cobros. Desde $999 MXN/mes.",
      },
      {
        q: "¿Puedo ver una demo antes de contratar?",
        a: "Sí. Agenda una sesión de demostración gratuita de 30 minutos donde te mostramos el producto en vivo y respondemos tus preguntas. Escríbenos por WhatsApp o usa el Motor de Análisis para agendar.",
      },
      {
        q: "¿SoFit o Consulto reemplazan un desarrollo a la medida?",
        a: "Para negocios dentro del giro de fitness o salud, son la solución más eficiente: están construidos exactamente para esos casos de uso y listan en días, no en meses. Si tienes necesidades muy específicas que no cubren, podemos hablar de un módulo personalizado.",
      },
    ],
  },
]

function AccordionItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#F0F0F0]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-[#0A0A0A] leading-snug">{item.q}</span>
        <span
          className={`text-[#888] text-lg leading-none shrink-0 transition-transform duration-200 ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      {open && (
        <p className="text-sm text-[#555] leading-relaxed pb-5 pr-8">
          {item.a}
        </p>
      )}
    </div>
  )
}

export default function AyudaPage() {
  const [activeId, setActiveId] = useState(CATEGORIES[0].id)
  const active = CATEGORIES.find((c) => c.id === activeId) ?? CATEGORIES[0]

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-10 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold tracking-wide text-[#0A0A0A]">
            ← users.mx
          </Link>
          <span className="text-xs text-[#888]">Central de Ayuda</span>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-[#0A0A0A] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs tracking-widest uppercase text-[#888] border border-[#333] px-3 py-1 inline-block mb-6">
            Soporte
          </span>
          <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">
            Central de Ayuda
          </h1>
          <p className="text-[#888] text-base max-w-xl leading-relaxed">
            Encuentra respuestas a las preguntas más frecuentes. Si no encuentras lo que buscas, escríbenos directamente.
          </p>
          <a
            href={getWhatsAppLink("default")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white text-sm font-bold px-5 py-2.5 mt-6 hover:opacity-90 transition-opacity"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Hablar con soporte →
          </a>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          {/* Sidebar: categorías */}
          <aside className="lg:col-span-3 mb-10 lg:mb-0">
            <div className="lg:sticky lg:top-24 space-y-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveId(cat.id)}
                  className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors flex items-center gap-3 ${
                    activeId === cat.id
                      ? "bg-[#0A0A0A] text-white"
                      : "text-[#555] hover:bg-[#F5F5F5]"
                  }`}
                >
                  <span className={`text-base leading-none w-5 text-center shrink-0 ${
                    activeId === cat.id ? "text-[#4cfc0f]" : "text-[#888]"
                  }`}>
                    {cat.icon}
                  </span>
                  {cat.label}
                </button>
              ))}
            </div>
          </aside>

          {/* FAQ list */}
          <div className="lg:col-span-9">
            <h2 className="text-xl font-bold text-[#0A0A0A] mb-8">
              {active.label}
            </h2>
            <div>
              {active.items.map((item, i) => (
                <AccordionItem key={i} item={item} />
              ))}
            </div>

            {/* Contact fallback */}
            <div className="mt-12 bg-[#F5F5F5] p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-sm font-semibold text-[#0A0A0A] mb-1">
                  ¿No encontraste lo que buscabas?
                </p>
                <p className="text-sm text-[#888]">
                  Escríbenos y te respondemos en menos de 24 horas en días hábiles.
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <a
                  href="mailto:hola@users.mx"
                  className="text-sm font-semibold border border-[#0A0A0A] px-5 py-2.5 hover:bg-[#0A0A0A] hover:text-white transition-colors"
                >
                  Correo
                </a>
                <a
                  href={getWhatsAppLink("default")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold bg-[#0A0A0A] text-white px-5 py-2.5 hover:bg-[#222] transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
