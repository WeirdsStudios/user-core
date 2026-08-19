import { siteConfig } from "@/lib/site-config"

const WA_NUMBER = siteConfig.contact.whatsapp

const WA_MESSAGES = {
  default:  "Hola, vengo de users.mx y quiero saber más de sus servicios.",
  hero:     "Hola, vi users.mx y me interesa cotizar un proyecto para mi negocio.",
  analisis: "Hola, acabo de terminar el Análisis de Negocio en users.mx y quiero platicar los resultados.",
  actiiva:  "Hola, me interesa probar ACTIIVA y conocer cómo podría funcionar para mi negocio.",
  mediica:  "Hola, me interesa probar MEDIICA y conocer cómo podría funcionar para mi negocio.",
  soporte:  "Hola, necesito ayuda con un proyecto que USERS desarrolló.",
  faq:      "Hola, tengo dudas sobre precios y planes de users.mx.",
  footer:   "Hola, quiero contactar a users.mx.",
} as const

export type WhatsAppOrigin = keyof typeof WA_MESSAGES

export function getWhatsAppLink(origin: WhatsAppOrigin = "default"): string {
  const msg = WA_MESSAGES[origin]
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}
