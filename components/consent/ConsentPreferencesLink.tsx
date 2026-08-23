"use client"

import { openConsentPreferences } from "./ConsentBanner"

/**
 * Reabre el panel de preferencias.
 *
 * Poder cambiar de opinión tiene que ser tan accesible como haberla dado: si
 * la única forma de revocar el consentimiento fuera borrar el almacenamiento
 * del navegador, no sería revocable de verdad.
 */
export default function ConsentPreferencesLink({
  className = "text-white underline underline-offset-4 hover:text-[#4cfc0f]",
  children = "Cambiar preferencias de cookies",
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <button type="button" onClick={openConsentPreferences} className={className}>
      {children}
    </button>
  )
}
