"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  acceptAll,
  onConsentChange,
  readConsent,
  rejectAll,
  writeConsent,
  type ConsentValue,
} from "@/lib/analytics/consent"
import { trackEvent } from "@/lib/analytics/track"

/**
 * Aviso de cookies y panel de preferencias.
 *
 * "Aceptar" y "Rechazar" son dos botones del mismo tamaño, en la misma fila y
 * a un clic de distancia. Rechazar no está escondido detrás de "más opciones"
 * ni pintado como enlace secundario: si cuesta más rechazar que aceptar, el
 * consentimiento no es libre y no vale.
 *
 * Mientras no haya decisión no se carga ningún script de terceros. El estado
 * inicial es "sin decidir", no "aceptado".
 *
 * Se puede reabrir desde el pie de página en cualquier momento.
 */

/** Evento global para reabrir el panel desde el footer. */
export const OPEN_PREFERENCES_EVENT = "users:open-consent"

export default function ConsentBanner() {
  const [consent, setConsent] = useState<ConsentValue>(null)
  const [ready, setReady] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [analytics, setAnalytics] = useState(true)
  const [advertising, setAdvertising] = useState(false)

  const panelRef = useRef<HTMLDivElement>(null)
  const firstButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const saved = readConsent()
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage no existe en el render del servidor; leerlo en el inicializador rompería la hidratación
      setConsent(saved)
      setAnalytics(saved.analytics)
      setAdvertising(saved.advertising)
    }
    setReady(true)

    const openPanel = () => setPanelOpen(true)
    window.addEventListener(OPEN_PREFERENCES_EVENT, openPanel)
    const unsubscribe = onConsentChange(setConsent)
    return () => {
      window.removeEventListener(OPEN_PREFERENCES_EVENT, openPanel)
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (panelOpen) firstButtonRef.current?.focus()
  }, [panelOpen])

  useEffect(() => {
    if (!panelOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanelOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [panelOpen])

  const record = (value: { analytics: boolean; advertising: boolean }) => {
    writeConsent(value)
    setPanelOpen(false)
    // Se registra la decisión, no quién la tomó. Sirve para saber sobre qué
    // proporción del tráfico estamos midiendo.
    trackEvent("consent_updated", {
      consent_analytics: value.analytics,
      consent_advertising: value.advertising,
    })
  }

  if (!ready) return null

  const needsDecision = consent === null
  if (!needsDecision && !panelOpen) return null

  // ── Panel de preferencias ──
  if (panelOpen) {
    return (
      <div
        className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/70 p-3 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-panel-title"
      >
        <div
          ref={panelRef}
          className="w-full max-w-lg bg-[#0A0A0A] border border-[#2A2A2A] max-h-[90dvh] overflow-y-auto"
        >
          <div className="p-5 lg:p-6">
            <h2 id="consent-panel-title" className="text-lg font-bold text-white">
              Preferencias de cookies
            </h2>
            <p className="text-[#B0B0B0] text-sm mt-2 leading-relaxed">
              Elige qué quieres permitir. Puedes cambiarlo cuando quieras desde
              el pie de página.
            </p>

            <ul className="mt-5 space-y-3">
              <li className="border border-[#252525] bg-[#0E0E0E] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">Necesarias</p>
                    <p className="text-[#8A8A8A] text-[13px] mt-1.5 leading-relaxed">
                      Hacen que el sitio funcione: recordar tu conversación con
                      el Centro de Atención y el borrador del Motor de Análisis.
                      No se comparten con nadie.
                    </p>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#4cfc0f] shrink-0 pt-0.5">
                    Siempre
                  </span>
                </div>
              </li>

              <li className="border border-[#252525] bg-[#0E0E0E] p-4">
                <label className="flex items-start justify-between gap-4 cursor-pointer">
                  <span>
                    <span className="block text-sm font-semibold text-white">Medición</span>
                    <span className="block text-[#8A8A8A] text-[13px] mt-1.5 leading-relaxed">
                      Nos dice qué páginas se ven y qué botones se usan, para
                      mejorar el sitio. Nunca guardamos lo que escribes.
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="mt-1 w-5 h-5 shrink-0 accent-[#4cfc0f]"
                  />
                </label>
              </li>

              <li className="border border-[#252525] bg-[#0E0E0E] p-4">
                <label className="flex items-start justify-between gap-4 cursor-pointer">
                  <span>
                    <span className="block text-sm font-semibold text-white">Publicidad</span>
                    <span className="block text-[#8A8A8A] text-[13px] mt-1.5 leading-relaxed">
                      Permite a Meta y Google saber que visitaste el sitio, para
                      mostrarte nuestros anuncios y medir si funcionan.
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={advertising}
                    onChange={(e) => setAdvertising(e.target.checked)}
                    className="mt-1 w-5 h-5 shrink-0 accent-[#4cfc0f]"
                  />
                </label>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-2.5 mt-5">
              <button
                ref={firstButtonRef}
                type="button"
                onClick={() => record({ analytics, advertising })}
                className="flex-1 bg-[#4cfc0f] text-black font-bold px-5 py-3 text-sm transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Guardar preferencias
              </button>
              <button
                type="button"
                onClick={() => record({ analytics: false, advertising: false })}
                className="flex-1 border border-[#2E2E2E] text-white font-semibold px-5 py-3 text-sm transition-colors hover:border-[#4cfc0f] hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cfc0f]"
              >
                Rechazar opcionales
              </button>
            </div>

            <p className="font-mono text-[10px] text-[#8A8A8A] mt-4 leading-relaxed">
              Más detalle en el{" "}
              <Link href="/aviso-de-privacidad" className="text-white underline underline-offset-4">
                aviso de privacidad
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ── Aviso inicial ──
  return (
    <div
      role="region"
      aria-label="Preferencias de cookies"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-[#2A2A2A] bg-[#0A0A0A]/98 backdrop-blur"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-4 lg:py-5 flex flex-col lg:flex-row lg:items-center gap-4">
        <p className="text-[#B0B0B0] text-[13px] lg:text-sm leading-relaxed flex-1">
          Usamos cookies para que el sitio funcione y, si nos lo permites, para
          medir cómo se usa y mostrarte nuestros anuncios.{" "}
          <Link
            href="/aviso-de-privacidad"
            className="text-white underline underline-offset-4 hover:text-[#4cfc0f]"
          >
            Aviso de privacidad
          </Link>
        </p>

        <div className="flex flex-wrap gap-2 shrink-0">
          <button
            type="button"
            onClick={() => record({ analytics: true, advertising: true })}
            className="bg-[#4cfc0f] text-black font-bold px-5 py-3 text-sm transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Aceptar
          </button>
          <button
            type="button"
            onClick={() => record({ analytics: false, advertising: false })}
            className="border border-[#2E2E2E] text-white font-semibold px-5 py-3 text-sm transition-colors hover:border-[#4cfc0f] hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cfc0f]"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={() => setPanelOpen(true)}
            className="border border-[#2E2E2E] text-white font-semibold px-5 py-3 text-sm transition-colors hover:border-[#4cfc0f] hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cfc0f]"
          >
            Preferencias
          </button>
        </div>
      </div>
    </div>
  )
}

/** Usado por el pie de página para reabrir el panel. */
export function openConsentPreferences() {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))
}

/** Referencias no usadas aquí, pero exportadas para pruebas del banco. */
export { acceptAll, rejectAll }
