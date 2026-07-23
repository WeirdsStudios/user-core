const WA_NUMBER = "5215612934010"

const WA_MESSAGES = {
  default:  "Hola, vengo de users.mx y quiero saber más de sus servicios.",
  hero:     "Hola, vi users.mx y me interesa cotizar un proyecto para mi negocio.",
  analisis: "Hola, acabo de terminar el Análisis de Negocio en users.mx y quiero platicar los resultados.",
  sofit:    "Hola, me interesa SoFit para mi gimnasio.",
  consulto: "Hola, me interesa Consulto para mi consultorio.",
  faq:      "Hola, tengo dudas sobre precios y planes de users.mx.",
  footer:   "Hola, quiero contactar a users.mx.",
} as const

export type WhatsAppOrigin = keyof typeof WA_MESSAGES

export function getWhatsAppLink(origin: WhatsAppOrigin = "default"): string {
  const msg = WA_MESSAGES[origin]
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}
