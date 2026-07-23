import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Análisis de Negocio Digital Gratis — users.mx",
  description:
    "Cotizador gratuito en 6 pasos para tu negocio. Recibe un reporte visual con diagnóstico, estimado de inversión y agenda una sesión estratégica sin compromiso. Proyectos desde $15,000 MXN.",
  alternates: { canonical: "https://users.mx/analisis" },
  openGraph: {
    title: "Analiza tu negocio digital gratis — users.mx",
    description:
      "6 preguntas, un reporte visual personalizado y estimado de inversión sin compromiso. Proyectos desde $15,000 MXN.",
    url: "https://users.mx/analisis",
  },
}

export default function AnalisisLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
