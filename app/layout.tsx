import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"
import WhatsAppButton from "@/components/site/WhatsAppButton"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "users.mx — Desarrollo Web & Consultoría de Negocio",
  description:
    "Construimos productos digitales que generan resultados reales. Desarrollo web, diseño de producto y consultoría de negocio en México. Proyectos desde $15,000 MXN.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "users.mx — Desarrollo Web & Consultoría de Negocio",
    description: "Construimos productos digitales que generan resultados reales.",
    url: "https://users.mx",
    siteName: "users.mx",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "users.mx — Desarrollo Web & Consultoría de Negocio",
    description: "Construimos productos digitales que generan resultados reales. Proyectos desde $15,000 MXN.",
  },
  alternates: { canonical: "https://users.mx" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        name: "users.mx",
        description: "Empresa de desarrollo web y consultoría de negocio para PyMEs en México",
        url: "https://users.mx",
        email: "hola@users.mx",
        telephone: "+525612934010",
        logo: "https://users.mx/logos/imagotipo_user.svg",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ciudad de México",
          addressRegion: "Ciudad de México",
          addressCountry: "MX",
        },
        areaServed: ["Ciudad de México", "Estado de México", "México"],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "¿Cuánto pago al inicio y cuánto al final?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Trabajamos con 60/40 — 60% al iniciar el proyecto, 40% al entregarlo. El pago final solo se libera cuando el sitio está 100% aprobado por ti.",
            },
          },
          {
            "@type": "Question",
            name: "¿Qué pasa si el resultado no me convence?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Garantía de Aprobación: no se libera el pago final hasta que apruebes el proyecto. Si algo no cumple lo acordado en el brief inicial, seguimos ajustando dentro del alcance original sin costo adicional, retomando siempre desde tu último feedback aprobado, sin límite de rondas.",
            },
          },
          {
            "@type": "Question",
            name: "¿Qué incluye el proyecto y qué no?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Incluye dominio, hosting, hasta 3 rondas de revisión, soporte gratuito el primer mes después del lanzamiento (o 2 meses de descuento si contratas el plan de soporte anual), manual de uso de tu plataforma, y acceso a nuestra Central de Ayuda disponible 24/7.",
            },
          },
          {
            "@type": "Question",
            name: "¿Por qué es más caro que Wix o que alguien conocido me lo haga más barato?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No solo entregamos un sitio — cada funcionalidad se personaliza a tu negocio basándonos en estudio de mercado, análisis de negocio y proyección de retorno de inversión. Hacemos estrategia de negocio digital completa que respalda y le da forma al sitio, no solo una plantilla con tu logo encima.",
            },
          },
          {
            "@type": "Question",
            name: "¿Quién me da soporte después de lanzar?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Tienes soporte gratuito el primer mes. Después puedes contratar uno de nuestros planes de mantenimiento (desde $399 MXN/mes) que incluyen hosting, respaldos, cambios de contenido y soporte por WhatsApp.",
            },
          },
        ],
      },
    ],
  }

  return (
    <html lang="es" className={dmSans.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased bg-white text-[#0A0A0A]">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}
