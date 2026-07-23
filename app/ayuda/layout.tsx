import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Central de Ayuda — users.mx",
  description:
    "Respuestas a las preguntas más frecuentes sobre nuestros servicios, procesos y productos. Soporte disponible también por WhatsApp y correo.",
  alternates: { canonical: "https://users.mx/ayuda" },
}

export default function AyudaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
