import type { Metadata } from "next"
import { defaultOgImage } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Central de Ayuda — users.mx",
  description:
    "Respuestas a las preguntas más frecuentes sobre nuestros servicios, procesos y productos. Soporte disponible también por WhatsApp y correo.",
  alternates: { canonical: "/ayuda" },
  openGraph: {
      images: [defaultOgImage],
    title: "Central de Ayuda — users.mx",
    description:
      "Respuestas a las preguntas más frecuentes sobre nuestros servicios, procesos y productos.",
    url: "/ayuda",
  },
}

export default function AyudaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
