"use client"

import { useState, useEffect, useRef, lazy, Suspense } from "react"
import { usePathname, useRouter } from "next/navigation"

/**
 * Acceso discreto al Centro de Atención desde el resto del sitio.
 *
 * POSICIÓN: abajo a la izquierda. El botón de WhatsApp ya ocupa la esquina
 * derecha; apilarlos ahí dejaba dos círculos flotantes compitiendo por el
 * mismo pulgar. Separados, ninguno tapa al otro ni a los CTA del contenido.
 *
 * CARGA: el motor y la interfaz solo se descargan cuando alguien abre el
 * panel. Mientras tanto el sitio paga un botón, no un chat.
 *
 * DÓNDE NO APARECE: en el Centro completo (sería redundante) y en el Motor de
 * Análisis (es un formulario; un panel flotante estorbaría el flujo).
 */

const SupportChat = lazy(() => import("./SupportChat"))

const HIDDEN_ON = ["/centro-de-atencion", "/analisis"]

export default function SupportWidget() {
  const panelId = "centro-de-atencion-widget"
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Esc cierra y devuelve el foco al disparador.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  useEffect(() => {
    if (open) panelRef.current?.focus()
  }, [open])

  if (HIDDEN_ON.some((p) => pathname?.startsWith(p))) return null

  return (
    <>
      {open && (
        <div
          id={panelId}
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="false"
          aria-label="Centro de Atención USERS"
          className="fixed z-50 bg-[#0A0A0A] border border-[#2A2A2A] shadow-[0_8px_40px_rgba(0,0,0,0.6)] flex flex-col
                     inset-x-3 bottom-[5.25rem] top-16
                     sm:inset-x-auto sm:top-auto sm:left-4 lg:sm:left-6 sm:bottom-[5.25rem] sm:w-[26rem] sm:h-[min(34rem,calc(100dvh-9rem))]"
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[#1F1F1F] shrink-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#4cfc0f]">
              Centro de Atención
            </p>
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                triggerRef.current?.focus()
              }}
              aria-label="Cerrar el Centro de Atención"
              className="text-[#8A8A8A] hover:text-white transition-colors px-2 py-2 text-sm leading-none"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>

          <div className="flex-1 min-h-0">
            <Suspense
              fallback={
                <p className="p-4 font-mono text-[11px] text-[#8A8A8A]">
                  Abriendo el Centro…
                </p>
              }
            >
              <SupportChat
                surface="widget"
                onRequestFullCenter={() => router.push("/centro-de-atencion")}
              />
            </Suspense>
          </div>
        </div>
      )}

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Cerrar el Centro de Atención" : "Abrir el Centro de Atención"}
        /*
          Una sola superficie, no una burbuja pegada a un rectángulo. Altura
          fija de 48px —por encima del mínimo táctil de 44— con el icono
          ópticamente centrado y el mismo radio en todo el pill.
          `pb-[env(safe-area-inset-bottom)]` a través del contenedor evita que
          en iPhone quede debajo de la barra de gestos.
        */
        className={`group fixed left-4 lg:left-6 z-50 inline-flex h-12 items-center gap-2.5 rounded-full border pl-3.5 pr-4 text-[13px] font-semibold shadow-[0_6px_24px_rgba(0,0,0,0.45)] transition-[colors,transform] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cfc0f] ${
          open
            ? "border-[#4cfc0f]/60 bg-[#0E0E0E] text-[#4cfc0f]"
            : "border-[#2E2E2E] bg-[#0E0E0E]/95 text-white backdrop-blur hover:border-[#4cfc0f]/60 hover:text-[#4cfc0f] active:scale-[0.97]"
        }`}
        style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))" }}
      >
        {/*
          Icono propio: dos líneas de conversación sobre la retícula técnica de
          USERS. Deliberadamente distinto del verde sólido de WhatsApp —uno es
          soporte, el otro es contacto directo, y dos círculos verdes iguales
          en la misma pantalla no comunican dos cosas distintas.
        */}
        <span
          aria-hidden="true"
          className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#141414] transition-colors group-hover:border-[#4cfc0f]/40"
        >
          {open ? (
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" />
            </svg>
          ) : (
            <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
              <path d="M2 3.4h10M2 6.4h7" />
              <path d="M2 9.4h4" className="text-[#4cfc0f]" stroke="#4cfc0f" />
            </svg>
          )}
        </span>
        <span className="whitespace-nowrap">{open ? "Cerrar" : "¿Necesitas ayuda?"}</span>
      </button>
    </>
  )
}
