"use client"

import { useState, useEffect, useMemo, useRef, useId } from "react"
import Link from "next/link"
import { diagnose } from "@/lib/motor/diagnose"
import {
  QUESTIONS,
  STEPS,
  isStepComplete,
  questionsForStep,
  type Answers,
  type Question,
} from "@/lib/motor/questions"
import DiagnosisView from "@/components/motor/DiagnosisView"
import { trackEvent } from "@/lib/analytics/track"
import { siteConfig } from "@/lib/site-config"
import type { Diagnosis } from "@/lib/motor/types"

/**
 * Motor de Análisis.
 *
 * ORDEN DELIBERADO: cinco pasos de preguntas → **diagnóstico completo, gratis
 * y sin pedir nada** → contacto. La versión anterior exigía nombre, correo y
 * WhatsApp en el paso 6 para poder ver el resultado. Cobrar los datos antes de
 * demostrar utilidad es la razón más común por la que alguien abandona a dos
 * pantallas del final; aquí el diagnóstico es la demostración, y el contacto
 * se pide cuando la persona ya sabe si le sirve.
 *
 * El diagnóstico se calcula en el navegador: no depende de la red y no manda
 * nada a ningún lado hasta que la persona decide contactarnos.
 */

const DRAFT_KEY = "users-motor-v2"

function Progress({ step }: { step: number }) {
  const pct = (step / STEPS.length) * 100
  return (
    <div className="sticky top-0 z-20 bg-[#0A0A0A]/95 backdrop-blur border-b border-[#1A1A1A]">
      <div className="max-w-2xl mx-auto px-5 sm:px-6 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="font-mono text-[11px] text-[#8A8A8A] hover:text-white transition-colors py-1.5">
          ← {siteConfig.wordmark}
        </Link>
        <p className="font-mono text-[11px] text-[#8A8A8A]">
          Paso {step} de {STEPS.length}
        </p>
      </div>
      <div
        className="h-0.5 bg-[#1A1A1A]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={STEPS.length}
        aria-valuenow={step}
        aria-label={`Paso ${step} de ${STEPS.length}`}
      >
        <div className="h-0.5 bg-[#4cfc0f] transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

function Field({
  q,
  value,
  onChange,
}: {
  q: Question
  value: string | string[] | undefined
  onChange: (v: string | string[]) => void
}) {
  const groupId = useId()
  const selected = Array.isArray(value) ? value : value ? [value] : []

  const toggle = (v: string) => {
    if (q.kind === "multi") {
      const next = selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v]
      onChange(next)
    } else {
      onChange(v)
    }
  }

  return (
    <fieldset className="mb-9 border-0 p-0">
      <legend className="text-base font-semibold text-white mb-1">
        {q.label}
        {!q.required && <span className="text-[#8A8A8A] font-normal text-sm"> (opcional)</span>}
      </legend>
      {q.why && (
        <p className="text-[#8A8A8A] text-[13px] leading-relaxed mb-3.5 max-w-prose">{q.why}</p>
      )}
      {!q.why && <div className="mb-3.5" />}

      {q.kind === "text" ? (
        <input
          type="text"
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={q.placeholder}
          aria-required={q.required}
          className="w-full bg-[#0E0E0E] border border-[#2A2A2A] px-4 py-3.5 text-[15px] text-white placeholder:text-[#6E6E6E] focus:outline-none focus:border-[#4cfc0f]"
        />
      ) : (
        <div
          role={q.kind === "multi" ? "group" : "radiogroup"}
          aria-labelledby={groupId}
          className="grid grid-cols-1 sm:grid-cols-2 gap-2"
        >
          <span id={groupId} className="sr-only">
            {q.label}
          </span>
          {q.options?.map((o) => {
            const on = selected.includes(o.value)
            return (
              <button
                key={o.value}
                type="button"
                role={q.kind === "multi" ? "checkbox" : "radio"}
                aria-checked={on}
                onClick={() => toggle(o.value)}
                className={`text-left px-4 py-3.5 text-sm border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cfc0f] ${
                  on
                    ? "bg-[#4cfc0f] border-[#4cfc0f] text-black font-semibold"
                    : "bg-[#0E0E0E] border-[#2A2A2A] text-[#B0B0B0] hover:border-[#4A4A4A] hover:text-white"
                }`}
              >
                {/* El estado seleccionado no depende solo del color de fondo */}
                <span className="flex items-start gap-2.5">
                  <span aria-hidden="true" className="font-mono text-xs shrink-0 mt-0.5">
                    {on ? "✓" : q.kind === "multi" ? "+" : "·"}
                  </span>
                  <span>
                    {o.label}
                    {o.hint && (
                      <span className={`block text-xs mt-0.5 ${on ? "text-black/70" : "text-[#6E6E6E]"}`}>
                        {o.hint}
                      </span>
                    )}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      )}
    </fieldset>
  )
}

export default function MotorClient() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Answers>({})
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null)
  const [showContact, setShowContact] = useState(false)
  const [contact, setContact] = useState({ name: "", email: "", whatsapp: "" })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const topRef = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  // Borrador: solo las respuestas del negocio, nunca los datos de contacto.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY)
      if (!raw) return
      const saved = JSON.parse(raw) as { step: number; answers: Answers }
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage no existe en el render del servidor
      if (saved.answers) setAnswers(saved.answers)
      if (saved.step && saved.step <= STEPS.length) setStep(saved.step)
    } catch {
      /* borrador corrupto o sin almacenamiento */
    }
  }, [])

  useEffect(() => {
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ step, answers }))
    } catch {
      /* sin almacenamiento: el borrador solo vive en memoria */
    }
  }, [step, answers])

  const complete = useMemo(() => isStepComplete(step, answers), [step, answers])

  const update = (id: string, v: string | string[]) => {
    if (!started.current) {
      started.current = true
      trackEvent("analysis_started", { step: 1 })
    }
    setAnswers((prev) => ({ ...prev, [id]: v }))
  }

  const goTo = (n: number) => {
    setStep(n)
    topRef.current?.scrollIntoView({ block: "start" })
  }

  const next = () => {
    trackEvent("analysis_progressed", { step })
    if (step < STEPS.length) return goTo(step + 1)

    const d = diagnose(answers)
    setDiagnosis(d)
    trackEvent("analysis_completed", { step: STEPS.length, category: d.recomendacion.category })
    topRef.current?.scrollIntoView({ block: "start" })
  }

  /** Resumen para WhatsApp. Sin ingresos ni datos personales. */
  const whatsappUrl = () => {
    if (!diagnosis) return "#"
    const giro = QUESTIONS.find((q) => q.id === "industry")
      ?.options?.find((o) => o.value === answers.industry)?.label
    const texto = [
      "Diagnóstico USERS",
      giro ? `Negocio: ${giro}` : "",
      `Prioridad: ${diagnosis.prioridad.label}`,
      `Recomendación inicial: ${diagnosis.recomendacion.title}`,
      `Referencia: ${diagnosis.ref}`,
      "",
      "Quiero revisar este diagnóstico con ustedes.",
    ]
      .filter(Boolean)
      .join("\n")
    return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(texto)}`
  }

  const submitContact = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError("")
    try {
      const res = await fetch("/api/analisis/calcular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          diagnosis: diagnosis
            ? {
                ref: diagnosis.ref,
                prioridad: diagnosis.prioridad.id,
                categoria: diagnosis.recomendacion.category,
                producto: diagnosis.recomendacion.product ?? null,
                titular: diagnosis.headline,
              }
            : null,
          contact,
        }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
      trackEvent("analysis_contact_clicked", { category: diagnosis?.recomendacion.category })
      try {
        sessionStorage.removeItem(DRAFT_KEY)
      } catch {
        /* nada que limpiar */
      }
    } catch {
      setError(
        "No pudimos enviar tus datos. Puedes intentar de nuevo o escribirnos por WhatsApp con tu referencia."
      )
    } finally {
      setSending(false)
    }
  }

  // ── Resultado ──────────────────────────────────────────────────────────────
  if (diagnosis) {
    return (
      <div ref={topRef} className="max-w-2xl mx-auto px-5 sm:px-6 py-10 lg:py-16">
        <DiagnosisView
          diagnosis={diagnosis}
          businessName={typeof answers.businessName === "string" ? answers.businessName : undefined}
          onContact={() => {
            setShowContact(true)
            requestAnimationFrame(() =>
              document.getElementById("contacto-motor")?.scrollIntoView({ behavior: "smooth" })
            )
          }}
        />

        {showContact && !sent && (
          <div id="contacto-motor" className="border border-[#242424] bg-[#0E0E0E] p-5 lg:p-6 mt-6">
            <h3 className="text-lg font-bold text-white">¿A dónde te escribimos?</h3>
            <p className="text-[#8A8A8A] text-[13px] mt-2 leading-relaxed">
              Te contactamos para revisar el diagnóstico. Nada más — no te vamos
              a suscribir a nada.
            </p>
            <form onSubmit={submitContact} className="mt-4 space-y-3">
              <label className="block">
                <span className="text-sm text-white">Nombre</span>
                <input
                  required
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] px-4 py-3 text-[15px] text-white mt-1.5 focus:outline-none focus:border-[#4cfc0f]"
                />
              </label>
              <label className="block">
                <span className="text-sm text-white">Correo</span>
                <input
                  required
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] px-4 py-3 text-[15px] text-white mt-1.5 focus:outline-none focus:border-[#4cfc0f]"
                />
              </label>
              <label className="block">
                <span className="text-sm text-white">WhatsApp</span>
                <input
                  required
                  type="tel"
                  value={contact.whatsapp}
                  onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] px-4 py-3 text-[15px] text-white mt-1.5 focus:outline-none focus:border-[#4cfc0f]"
                />
              </label>

              {error && (
                <p role="alert" className="text-[#F0B4AA] text-sm leading-relaxed">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-[#4cfc0f] text-black font-bold px-6 py-3.5 text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {sending ? "Enviando…" : "Enviar y agendar revisión"}
              </button>
              <p className="font-mono text-[10px] text-[#8A8A8A] leading-relaxed">
                Tratamos tus datos según nuestro{" "}
                <Link href="/aviso-de-privacidad" className="text-white underline underline-offset-4">
                  aviso de privacidad
                </Link>
                .
              </p>
            </form>
          </div>
        )}

        {sent && (
          <div className="border border-[#4cfc0f]/40 bg-[#0E0E0E] p-5 lg:p-6 mt-6" role="status">
            <p className="text-white font-semibold">Listo. Te escribimos pronto.</p>
            <p className="text-[#8A8A8A] text-sm mt-2 leading-relaxed">
              Guarda tu referencia <span className="text-[#4cfc0f]">{diagnosis.ref}</span> por si
              quieres adelantarte.
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#2E2E2E] text-white font-semibold px-5 py-3 text-sm text-center transition-colors hover:border-[#4cfc0f] hover:text-[#4cfc0f]"
          >
            Mandarlo por WhatsApp
          </a>
          <button
            type="button"
            onClick={() => {
              setDiagnosis(null)
              setShowContact(false)
              goTo(1)
            }}
            className="border border-[#2E2E2E] text-[#8A8A8A] px-5 py-3 text-sm transition-colors hover:text-white"
          >
            Volver a empezar
          </button>
        </div>
      </div>
    )
  }

  // ── Cuestionario ───────────────────────────────────────────────────────────
  const info = STEPS[step - 1]
  return (
    <>
      <Progress step={step} />
      <div ref={topRef} className="max-w-2xl mx-auto px-5 sm:px-6 py-8 lg:py-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#4cfc0f]">
          {info.subtitle}
        </p>
        <h1 className="text-[1.6rem] lg:text-3xl font-bold text-white mt-2 tracking-tight">
          {info.title}
        </h1>

        <div className="mt-8">
          {questionsForStep(step).map((q) => (
            <Field key={q.id} q={q} value={answers[q.id]} onChange={(v) => update(q.id, v)} />
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#1A1A1A]">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              className="text-sm font-semibold text-[#8A8A8A] hover:text-white transition-colors py-3 px-2"
            >
              ← Atrás
            </button>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={next}
            disabled={!complete}
            className="bg-[#4cfc0f] text-black font-bold px-7 py-3.5 text-sm transition-opacity hover:opacity-90 disabled:bg-transparent disabled:text-[#9A9A9A] disabled:border disabled:border-[#2A2A2A]"
          >
            {step === STEPS.length ? "Ver mi diagnóstico" : "Continuar →"}
          </button>
        </div>

        <p className="font-mono text-[10px] text-[#8A8A8A] mt-6 leading-relaxed">
          El diagnóstico es gratis y no pedimos tus datos para verlo.
        </p>
      </div>
    </>
  )
}
