"use client"

import { useEffect, Suspense } from "react"
import Script from "next/script"
import { usePathname, useSearchParams } from "next/navigation"
import { Analytics as VercelAnalytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { captureAttribution } from "@/lib/analytics/attribution"
import { trackPageView } from "@/lib/analytics/track"
import ClickTracker from "./ClickTracker"

/**
 * Carga de proveedores y disparo de `page_view`.
 *
 * QUÉ ESTÁ ACTIVO
 *   · Vercel Analytics y Speed Insights: sin cookies, sin ID, sin banner de
 *     consentimiento. Se activan desde el panel del proyecto.
 *   · GA4 y Meta Pixel: solo si existe su variable de entorno. Sin ID no se
 *     carga el script, no se ponen cookies y `trackEvent` simplemente no
 *     encuentra a dónde enviar. El sitio compila y funciona igual.
 *
 * COOKIES: GA4 y Meta sí las usan. Mientras no estén configurados el sitio
 * no pone ninguna cookie de terceros — por eso hoy no hay banner de consen-
 * timiento. El día que se agreguen esos IDs hay que añadir el aviso.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

/**
 * `useSearchParams` obliga a suspender el árbol; aislarlo aquí evita que toda
 * la página caiga a render dinámico solo por medir.
 */
function PageViews() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    captureAttribution()
  }, [searchParams])

  useEffect(() => {
    if (!pathname) return
    // Solo la ruta: los parámetros pueden traer datos de campaña o de
    // formulario, y ya viajan por separado como atribución.
    trackPageView(pathname)
  }, [pathname])

  return null
}

export default function Analytics() {
  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />
      <ClickTracker />

      <Suspense fallback={null}>
        <PageViews />
      </Suspense>

      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { send_page_view: false });`}
          </Script>
        </>
      )}

      {META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
        </Script>
      )}
    </>
  )
}
