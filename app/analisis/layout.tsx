import type { Metadata } from "next"
import { siteConfig, defaultOgImage } from "@/lib/site-config"

/**
 * El metadata anterior prometía un "cotizador" con "estimado de inversión" en
 * 6 pasos. El Motor ya no cotiza —no hay tabulador real detrás— ni tiene 6
 * pasos de preguntas: son 5, y el sexto era la captura de datos que ahora va
 * después del resultado.
 */
export const metadata: Metadata = {
  title: "Diagnóstico digital gratis para tu negocio — users.mx",
  description:
    "Responde 12 preguntas sobre tu negocio y recibe un diagnóstico con las prioridades reales, por dónde conviene empezar y qué puede esperar. Sin registro y sin costo.",
  alternates: { canonical: "/analisis" },
  openGraph: {
    images: [defaultOgImage],
    title: "Diagnóstico digital gratis para tu negocio — users.mx",
    description:
      "12 preguntas y un diagnóstico con prioridades y siguiente paso. Sin registro para verlo.",
    url: `${siteConfig.url}/analisis`,
  },
}

export default function AnalisisLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
