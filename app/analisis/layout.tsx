import type { Metadata } from "next"
import { siteConfig, defaultOgImage } from "@/lib/site-config"

const PRICE = siteConfig.pricing.startingPriceLabel

export const metadata: Metadata = {
  title: "Análisis de Negocio Digital Gratis — users.mx",
  description: `Cotizador gratuito en 6 pasos para tu negocio. Recibe un reporte visual con diagnóstico, estimado de inversión y agenda una sesión estratégica sin compromiso. Proyectos desde ${PRICE}.`,
  alternates: { canonical: "/analisis" },
  openGraph: {
      images: [defaultOgImage],
    title: "Analiza tu negocio digital gratis — users.mx",
    description: `6 preguntas, un reporte visual personalizado y estimado de inversión sin compromiso. Proyectos desde ${PRICE}.`,
    url: "/analisis",
  },
}

export default function AnalisisLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
