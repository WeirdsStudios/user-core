"use client"

import { useState, useRef, useEffect, useId, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { initialState, respond } from "@/lib/support/engine"
import { buildWhatsAppUrl } from "@/lib/support/escalation"
import { getAvailability } from "@/lib/support/schedule"
import { looksSensitive } from "@/lib/support/redact"
import { siteConfig } from "@/lib/site-config"
import { track } from "@/lib/support/analytics"
import type { ConversationState, Message, QuickAction } from "@/lib/support/types"

/**
 * Interfaz de conversación del Centro de Atención USERS.
 *
 * PERSISTENCIA: sessionStorage, no localStorage ni servidor. Una conversación
 * de soporte puede contener detalles del negocio de alguien; sobrevive al
 * refresh y a la navegación de la sesión, y desaparece al cerrar la pestaña.
 * No hay razón para conservarla más tiempo en una V1.
 *
 * ACCESIBILIDAD: la lista de mensajes es `aria-live="polite"` para que un
 * lector anuncie las respuestas nuevas sin interrumpir la escritura. El foco
 * vuelve al input después de cada envío.
 */

const STORAGE_KEY = "users-centro-v1"

/**
 * Accesos rápidos.
 *
 * El texto que se envía es la pregunta literal de una entrada de la base de
 * conocimiento, no una paráfrasis: así el botón siempre cae en la respuesta
 * que promete. La etiqueta visible sí se acorta para que la rejilla respire.
 */
const QUICK_START: { id: string; label: string; send: string }[] = [
  {
    id: "incidente",
    label: "Algo dejó de funcionar",
    send: "Algo dejó de funcionar en mi sitio o sistema",
  },
  {
    id: "ajuste",
    label: "Necesito cambiar un texto",
    send: "Necesito cambiar un texto de mi sitio",
  },
  {
    id: "funcionalidad",
    label: "Quiero agregar una función",
    send: "Quiero agregar una funcionalidad nueva (reservas, pagos, portal)",
  },
  { id: "acceso", label: "Perdí un acceso", send: "Perdí un acceso o una contraseña" },
  { id: "avances", label: "Cómo van mis avances", send: "¿Cómo reviso los avances del proyecto?" },
  {
    id: "humano",
    label: "Quiero hablar con alguien",
    send: "Quiero hablar con una persona del equipo",
  },
]

function loadState(): ConversationState | null {
  if (typeof window === "undefined") return null
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ConversationState) : null
  } catch {
    return null
  }
}

export default function SupportChat({
  surface = "page",
  onRequestFullCenter,
}: {
  surface?: "widget" | "page"
  onRequestFullCenter?: () => void
}) {
  const [state, setState] = useState<ConversationState>(() => initialState())
  const [input, setInput] = useState("")
  const [hydrated, setHydrated] = useState(false)
  const [warnSensitive, setWarnSensitive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const inputId = useId()
  const availability = getAvailability()

  /**
   * Recuperar la conversación de la sesión.
   *
   * Tiene que ser un efecto: sessionStorage no existe durante el render del
   * servidor, y leerlo en el inicializador del estado provocaría un desajuste
   * de hidratación. Corre una sola vez al montar, no en cada render.
   */
  useEffect(() => {
    const saved = loadState()
    // eslint-disable-next-line react-hooks/set-state-in-effect -- ver arriba
    if (saved?.messages?.length) setState(saved)
    setHydrated(true)
    track("support_opened", { surface, page_path: window.location.pathname })
  }, [surface])

  useEffect(() => {
    if (!hydrated) return
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Cuota llena o modo privado: la conversación sigue en memoria.
    }
  }, [state, hydrated])

  useEffect(() => {
    if (state.messages.length > 0) {
      endRef.current?.scrollIntoView({ block: "end", behavior: "smooth" })
    }
  }, [state.messages.length])

  const send = useCallback(
    (text: string) => {
      const clean = text.trim()
      if (!clean) return

      setWarnSensitive(looksSensitive(clean))
      setError(null)

      const userMsg: Message = {
        id: Math.random().toString(36).slice(2),
        role: "user",
        text: clean,
        at: Date.now(),
      }

      try {
        const withUser: ConversationState = {
          ...state,
          messages: [...state.messages, userMsg],
        }
        const { reply, state: nextState } = respond(withUser, clean)

        setState({ ...nextState, messages: [...withUser.messages, reply] })
        setInput("")

        track("support_message_sent", {
          surface,
          turn: withUser.messages.length,
          category: nextState.intent,
        })
        track(reply.decision === "UNKNOWN" ? "support_unknown" : "support_answered", {
          surface,
          mode: reply.decision,
          category: nextState.intent,
        })
      } catch {
        setError(
          "No pude procesar esta consulta en este momento. Puedes reintentar, revisar la Central de Ayuda o escribirnos por WhatsApp."
        )
      } finally {
        inputRef.current?.focus()
      }
    },
    [state, surface]
  )

  const escalate = useCallback(() => {
    const url = buildWhatsAppUrl(state)
    track("support_escalated", { surface, category: state.intent })
    track("support_whatsapp_clicked", { surface, category: state.intent })

    // Si el navegador bloquea la ventana emergente, la persona se queda sin
    // saber qué pasó. Mejor decirlo y darle el enlace directo.
    const opened = window.open(url, "_blank", "noopener,noreferrer")
    if (!opened) {
      setError(
        "Tu navegador bloqueó la ventana de WhatsApp. Puedes escribirnos directamente al " +
          `${siteConfig.contact.whatsappDisplay} o por correo a ${siteConfig.contact.email}.`
      )
    }
  }, [state, surface])

  const runAction = (action: QuickAction) => {
    if (action.kind === "send" && action.value) return send(action.value)
    if (action.kind === "escalate") return escalate()
    if (action.kind === "link" && action.value) {
      track("support_article_clicked", { surface, category: state.intent })
      router.push(action.value)
    }
  }

  const reset = () => {
    const fresh = initialState()
    setState(fresh)
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      /* sin persistencia disponible */
    }
    inputRef.current?.focus()
  }

  const empty = state.messages.length === 0

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Estado del especialista */}
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-[#1F1F1F] shrink-0">
        <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#8A8A8A]">
          <span
            className={`w-1.5 h-1.5 rounded-full ${availability.specialistAvailable ? "bg-[#4cfc0f]" : "bg-[#6A6A6A]"}`}
            aria-hidden="true"
          />
          {availability.specialistAvailable
            ? "Especialista disponible"
            : "Centro disponible · especialista fuera de horario"}
        </p>
        {!empty && (
          <button
            type="button"
            onClick={reset}
            className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#8A8A8A] hover:text-white transition-colors px-2 py-2"
          >
            Reiniciar
          </button>
        )}
      </div>

      {/* Conversación */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-5">
        {empty ? (
          <div>
            {/* En la página completa el H1 ya hace esta pregunta; repetirla
                aquí solo duplicaría el encabezado. */}
            {surface === "widget" && (
              <h2 className="text-lg font-bold text-white">
                ¿En qué podemos ayudarte?
              </h2>
            )}
            <p className="text-[#B0B0B0] text-sm mt-2 leading-relaxed max-w-md">
              Empieza por lo más común o escribe tu consulta. El Centro te
              orienta de inmediato y, cuando haga falta, te conecta con nuestro
              equipo.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-5">
              {QUICK_START.map((q) => (
                <li key={q.label}>
                  <button
                    type="button"
                    onClick={() => {
                      track("support_quick_action", { surface, cta: q.id })
                      send(q.send)
                    }}
                    className="w-full h-full text-left border border-[#252525] bg-[#0E0E0E] px-3.5 py-3 text-sm text-[#B0B0B0] transition-colors hover:border-[#4cfc0f] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cfc0f]"
                  >
                    {q.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <ol className="space-y-3" aria-live="polite" aria-relevant="additions">
            {state.messages.map((m) => (
              <li
                key={m.id}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div className={m.role === "user" ? "max-w-[85%]" : "max-w-[92%]"}>
                  <p className="sr-only">{m.role === "user" ? "Tú:" : "Centro USERS:"}</p>
                  <div
                    className={
                      m.role === "user"
                        ? "bg-[#1A1A1A] text-white text-sm px-4 py-2.5 whitespace-pre-line leading-relaxed"
                        : "border border-[#4cfc0f]/30 bg-[#0E0E0E] text-[#C4C4C4] text-sm px-4 py-3 whitespace-pre-line leading-relaxed"
                    }
                  >
                    {m.text}
                  </div>

                  {m.links && m.links.length > 0 && (
                    <ul className="flex flex-wrap gap-1.5 mt-2">
                      {m.links.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            onClick={() => track("support_article_clicked", { surface })}
                            className="inline-flex items-center gap-1.5 font-mono text-[10px] text-white border border-[#2A2A2A] px-2.5 py-1.5 transition-colors hover:border-[#4cfc0f] hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cfc0f]"
                          >
                            {l.label}
                            <span aria-hidden="true">→</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  {m.actions && m.actions.length > 0 && (
                    <ul className="flex flex-wrap gap-1.5 mt-2">
                      {m.actions.slice(0, 3).map((a) => (
                        <li key={a.id}>
                          <button
                            type="button"
                            onClick={() => runAction(a)}
                            className="font-mono text-[10px] border border-[#4cfc0f]/40 text-[#4cfc0f] px-2.5 py-1.5 transition-colors hover:bg-[#4cfc0f] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cfc0f]"
                          >
                            {a.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}

        {error && (
          <div role="alert" className="mt-4 border border-[#C7452F] bg-[#1A0E0C] p-4">
            <p className="text-[#F0B4AA] text-sm leading-relaxed">{error}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <button
                type="button"
                onClick={() => setError(null)}
                className="font-mono text-[10px] border border-[#4cfc0f]/40 text-[#4cfc0f] px-2.5 py-2"
              >
                Reintentar
              </button>
              <Link
                href="/ayuda"
                className="font-mono text-[10px] border border-[#2A2A2A] text-white px-2.5 py-2"
              >
                Central de Ayuda
              </Link>
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Escalamiento y avisos */}
      <div className="shrink-0 border-t border-[#1F1F1F] px-4 py-3 space-y-2.5">
        {warnSensitive && (
          <p role="status" className="font-mono text-[10px] text-[#F0B4AA] leading-relaxed">
            Parece que escribiste datos sensibles. No los necesitamos y no se
            incluirán si pasamos tu solicitud al equipo.
          </p>
        )}

        {state.escalationOffered && (
          <p className="font-mono text-[10px] text-[#8A8A8A] leading-relaxed">
            Referencia de tu solicitud: <span className="text-[#4cfc0f]">{state.ref}</span>
          </p>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
          }}
          className="flex gap-2"
        >
          <label htmlFor={inputId} className="sr-only">
            Escribe tu consulta
          </label>
          <input
            id={inputId}
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu consulta…"
            autoComplete="off"
            className="flex-1 min-w-0 bg-[#0E0E0E] border border-[#2A2A2A] px-3.5 py-3 text-sm text-white placeholder:text-[#6E6E6E] focus:outline-none focus:border-[#4cfc0f]"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            /* Deshabilitado se dibuja como un botón apagado, no como el verde
               a media opacidad: sobre fondo negro eso quedaba ilegible. */
            className="font-bold px-4 py-3 text-sm shrink-0 transition-colors bg-[#4cfc0f] text-black hover:opacity-90 disabled:bg-transparent disabled:text-[#8A8A8A] disabled:border disabled:border-[#2A2A2A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Enviar
          </button>
        </form>

        <p className="font-mono text-[10px] text-[#8A8A8A] leading-relaxed">
          No compartas contraseñas ni información sensible.
        </p>

        {surface === "widget" && onRequestFullCenter && (
          <button
            type="button"
            onClick={onRequestFullCenter}
            className="w-full border border-[#2A2A2A] text-white font-semibold px-4 py-2.5 text-xs transition-colors hover:border-[#4cfc0f] hover:text-[#4cfc0f]"
          >
            Abrir Centro de Atención
          </button>
        )}
      </div>
    </div>
  )
}
