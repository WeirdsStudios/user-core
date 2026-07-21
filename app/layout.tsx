import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"

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
    ],
  },
  openGraph: {
    title: "users.mx — Desarrollo Web & Consultoría de Negocio",
    description: "Construimos productos digitales que generan resultados reales.",
    url: "https://users.mx",
    siteName: "users.mx",
    locale: "es_MX",
    type: "website",
  },
  alternates: { canonical: "https://users.mx" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={dmSans.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "users.mx",
              description: "Empresa de desarrollo web y consultoría de negocio en México",
              url: "https://users.mx",
              email: "hola@users.mx",
              addressLocality: "Ciudad de México",
              addressCountry: "MX",
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased bg-white text-[#0A0A0A]">
        {children}
      </body>
    </html>
  )
}
