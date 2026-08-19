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
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="false"
          aria-label="Centro de Atención USERS"
          className="fixed z-50 bg-[#0A0A0A] border border-[#2A2A2A] shadow-[0_8px_40px_rgba(0,0,0,0.6)] flex flex-col
                     inset-x-3 bottom-20 top-16
                     sm:inset-x-auto sm:top-auto sm:left-5 sm:bottom-20 sm:w-[26rem] sm:h-[min(34rem,calc(100dvh-8rem))]"
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
        /* El panel se detiene en bottom-20, así que el disparador y el botón
           de WhatsApp siguen visibles y separados mientras está abierto. */
        className="fixed bottom-5 left-4 lg:bottom-6 lg:left-6 z-50 inline-flex items-center gap-2 border border-[#2E2E2E] bg-[#0E0E0E] text-white px-3.5 py-3 text-xs font-semibold shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-colors hover:border-[#4cfc0f] hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cfc0f]"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#4cfc0f] shrink-0" aria-hidden="true" />
        {open ? "Cerrar" : "¿Necesitas ayuda?"}
      </button>
    </>
  )
}
