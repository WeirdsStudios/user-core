"use client"

import { useEffect, useState, Suspense } from "react"
import Script from "next/script"
import { usePathname, useSearchParams } from "next/navigation"
import { Analytics as VercelAnalytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { captureAttribution } from "@/lib/analytics/attribution"
import { trackPageView } from "@/lib/analytics/track"
import { readConsent, onConsentChange, type ConsentValue } from "@/lib/analytics/consent"
import { GA_ID, META_PIXEL_ID, GOOGLE_ADS_ID, metaPageView } from "@/lib/analytics/providers"
import ClickTracker from "./ClickTracker"

/**
 * Carga de proveedores y disparo de `page_view`.
 *
 * NADA SE CARGA SIN PERMISO. Los scripts de GA4 y Meta ni siquiera se
 * inyectan hasta que la persona acepta la categoría correspondiente. No es
 * "cargar y no disparar": es no cargar. Rechazar significa que el script no
 * existe en la página.
 *
 * Vercel Analytics y Speed Insights son la excepción justificada: no usan
 * cookies ni identificadores publicitarios, no siguen a nadie entre sitios y
 * son los que miden si el sitio funciona. Aun así solo miden con permiso de
 * medición — se montan condicionados igual que el resto.
 *
 * COOKIES: GA4 y Meta sí las usan. Sin sus variables de entorno no se pone
 * ninguna cookie de terceros, con o sin consentimiento.
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
    // formulario, y la campaña ya viaja por separado como atribución.
    trackPageView(pathname)
    // Meta cuenta su propio PageView al inicializarse; este es para las
    // navegaciones posteriores, que el SDK no ve en el App Router.
    metaPageView()
  }, [pathname])

  return null
}

export default function Analytics() {
  const [consent, setConsent] = useState<ConsentValue>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage no existe en el render del servidor
    setConsent(readConsent())
    return onConsentChange(setConsent)
  }, [])

  const analytics = consent?.analytics === true
  const advertising = consent?.advertising === true

  return (
    <>
      {/* El seguimiento de clics no envía nada por su cuenta: llama a
          trackEvent, que vuelve a comprobar el consentimiento. */}
      <ClickTracker />

      <Suspense fallback={null}>
        <PageViews />
      </Suspense>

      {analytics && (
        <>
          <VercelAnalytics />
          <SpeedInsights />
        </>
      )}

      {analytics && GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { send_page_view: false });
${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ""}
gtag('consent', 'update', {
  ad_storage: '${advertising ? "granted" : "denied"}',
  ad_user_data: '${advertising ? "granted" : "denied"}',
  ad_personalization: '${advertising ? "granted" : "denied"}',
  analytics_storage: 'granted'
});`}
          </Script>
        </>
      )}

      {advertising && META_PIXEL_ID && (
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
