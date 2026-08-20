import type { Metadata } from "next"
import { DM_Sans, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import WhatsAppButton from "@/components/site/WhatsAppButton"
import SmoothScroll from "@/components/site/SmoothScroll"
import SupportWidget from "@/components/support/SupportWidget"
import Analytics from "@/components/analytics/Analytics"
import ConsentBanner from "@/components/consent/ConsentBanner"
import { siteConfig } from "@/lib/site-config"

/**
 * `optional` y no `swap`.
 *
 * Con `swap`, en una conexión lenta el H1 se pinta con la fuente de sistema y
 * al llegar DM Sans cambia el número de líneas del titular: medido en Slow 4G
 * daba CLS 0.170, muy por encima del umbral de 0.1. El ajuste automático de
 * métricas no lo evita, porque una vez que cambia el conteo de líneas ninguna
 * corrección de tamaño lo compensa.
 *
 * `optional` le da al navegador una ventana breve: si la fuente llega a
 * tiempo se usa, y si no, esa carga se queda con la de sistema y NO reflowa.
 * A partir de la segunda página ya está en caché. Se prefiere una primera
 * visita lenta con tipografía de sistema a que el titular salte bajo el dedo
 * de alguien que acaba de llegar desde un anuncio.
 */
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "optional",
})

/**
 * La variable --font-mono existía en globals.css pero apuntaba a una fuente
 * que nunca se cargó, así que todo lo "técnico" caía al monoespaciado del
 * sistema. JetBrains Mono da el carácter de ingeniería a índices, etiquetas
 * y datos, que es donde vive la personalidad de la marca.
 */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "optional",
  weight: ["400", "500", "700"],
})

const TITLE = "users.mx — Desarrollo web y software para PyMEs en México"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: TITLE,
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: TITLE,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.wordmark,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: siteConfig.description,
  },
  alternates: { canonical: "/" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        name: siteConfig.wordmark,
        legalName: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.telephone,
        logo: `${siteConfig.url}/logos/imagotipo_user.svg`,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.contact.city,
          addressRegion: siteConfig.contact.city,
          addressCountry: siteConfig.contact.country,
        },
        areaServed: ["Ciudad de México", "Estado de México", "México"],
      }
    ],
  }

  return (
    <html lang="es" className={`${dmSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased bg-white text-[#0A0A0A]">
        <SmoothScroll />
        {children}
        <SupportWidget />
        <WhatsAppButton />
        <Analytics />
        <ConsentBanner />
      </body>
    </html>
  )
}
