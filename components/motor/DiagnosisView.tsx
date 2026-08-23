"use client"

import Link from "next/link"
import { STATE_LABEL, HORIZON_LABEL, type Diagnosis, type DimensionState } from "@/lib/motor/types"

/**
 * El diagnóstico, como lo ve la persona.
 *
 * NUEVE BLOQUES, no un muro: resumen, qué vemos, mapa, oportunidades,
 * recomendación, alcance, inversión, por qué, siguiente paso. Cada uno cabe
 * en una pantalla de móvil.
 *
 * SIN LIBRERÍA DE GRÁFICAS. El mapa son cuatro estados con etiqueta de texto
 * y un indicador de posición: añadir una dependencia de charting para pintar
 * seis filas sería pagar 40 KB por algo que hace el CSS.
 *
 * SIN COLOR COMO ÚNICO CANAL. Cada estado se nombra con palabras además de
 * pintarse: quien no distingue el verde del ámbar lee exactamente lo mismo.
 */

const STATE_STYLE: Record<DimensionState, { dot: string; text: string; fill: number }> = {
  prioridad: { dot: "bg-[#FF6B4A]", text: "text-[#FF9E86]", fill: 1 },
  oportunidad: { dot: "bg-[#FFC83D]", text: "text-[#FFD874]", fill: 2 },
  funcional: { dot: "bg-[#8A8A8A]", text: "text-[#B0B0B0]", fill: 3 },
  solido: { dot: "bg-[#4cfc0f]", text: "text-[#4cfc0f]", fill: 4 },
}

function Block({
  n,
  title,
  children,
}: {
  n: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="border-t border-[#1F1F1F] pt-6 mt-6 first:border-0 first:pt-0 first:mt-0">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8A8A8A]">
        {n} — {title}
      </p>
      <div className="mt-3.5">{children}</div>
    </section>
  )
}

export default function DiagnosisView({
  diagnosis,
  businessName,
  onContact,
}: {
  diagnosis: Diagnosis
  businessName?: string
  onContact: () => void
}) {
  const d = diagnosis

  return (
    <div className="text-white">
      {/* ── 1. Resumen ── */}
      <header>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#4cfc0f]">
          Diagnóstico digital USERS
          {businessName ? ` · ${businessName}` : ""}
        </p>
        <h2 className="text-[1.5rem] sm:text-2xl lg:text-[2rem] font-bold leading-[1.15] mt-3 text-balance tracking-tight">
          {d.headline}
        </h2>
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-4 text-sm">
          <span className="text-[#8A8A8A]">Prioridad principal:</span>
          <span className="font-semibold text-white">{d.prioridad.label}</span>
          <span className={`font-mono text-[11px] ${STATE_STYLE[d.prioridad.state].text}`}>
            ({STATE_LABEL[d.prioridad.state]})
          </span>
        </p>
      </header>

      <div className="mt-8">
        {/* ── 2. Qué vemos ── */}
        {d.observaciones.length > 0 && (
          <Block n="01" title="Qué vemos">
            <ul className="space-y-2.5">
              {d.observaciones.map((o) => (
                <li key={o} className="flex items-start gap-2.5">
                  <span className="text-[#4cfc0f] font-mono text-xs shrink-0 mt-1" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-[#B0B0B0] text-sm leading-relaxed">{o}</span>
                </li>
              ))}
            </ul>
          </Block>
        )}

        {/* ── 3. Mapa del negocio ── */}
        <Block n="02" title="Mapa de tu negocio">
          <ul className="space-y-2.5">
            {d.dimensions.map((dim) => {
              const st = STATE_STYLE[dim.state]
              return (
                <li key={dim.id} className="flex items-center gap-3">
                  <span className="w-28 sm:w-36 shrink-0 text-[13px] text-white">{dim.label}</span>
                  <span
                    className="flex gap-0.5 shrink-0"
                    role="img"
                    aria-label={`${dim.label}: ${STATE_LABEL[dim.state]}`}
                  >
                    {[1, 2, 3, 4].map((i) => (
                      <span
                        key={i}
                        aria-hidden="true"
                        className={`w-4 sm:w-6 h-1.5 ${i <= st.fill ? st.dot : "bg-[#242424]"}`}
                      />
                    ))}
                  </span>
                  {/* El estado también en palabras: el color no es el único canal */}
                  <span className={`font-mono text-[10px] ${st.text} truncate`} aria-hidden="true">
                    {STATE_LABEL[dim.state]}
                  </span>
                </li>
              )
            })}
          </ul>
        </Block>

        {/* ── 4. Oportunidades ── */}
        {d.oportunidades.length > 0 && (
          <Block n="03" title="Por dónde empezar">
            <ol className="space-y-3">
              {d.oportunidades.map((o) => (
                <li key={o.title} className="border border-[#242424] bg-[#0E0E0E] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#4cfc0f]">
                    {HORIZON_LABEL[o.horizon]}
                  </p>
                  <p className="text-sm font-semibold text-white mt-2">{o.title}</p>
                  <p className="text-[#8A8A8A] text-[13px] mt-1.5 leading-relaxed">{o.body}</p>
                  {o.solution && (
                    <Link
                      href={o.solution}
                      className="inline-block font-mono text-[10px] text-white border-b border-[#4cfc0f] mt-3 pb-0.5 hover:text-[#4cfc0f] transition-colors"
                    >
                      Ver cómo lo resolvemos →
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </Block>
        )}

        {/* ── 5 + 6. Recomendación y alcance ── */}
        <Block n="04" title="Nuestra recomendación inicial">
          <div className="border border-[#4cfc0f]/30 bg-[#0E0E0E] p-4 lg:p-5">
            <h3 className="text-base lg:text-lg font-bold text-white">{d.recomendacion.title}</h3>
            <p className="text-[#B0B0B0] text-sm mt-2.5 leading-relaxed">{d.recomendacion.body}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 pt-5 border-t border-[#1F1F1F]">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#4cfc0f]">
                  Fase inicial
                </p>
                <ul className="mt-2 space-y-1.5">
                  {d.recomendacion.fase_inicial.map((f) => (
                    <li key={f} className="text-[#B0B0B0] text-[13px] leading-relaxed">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A8A8A]">
                  Puede venir después
                </p>
                <ul className="mt-2 space-y-1.5">
                  {d.recomendacion.evolucion.map((f) => (
                    <li key={f} className="text-[#8A8A8A] text-[13px] leading-relaxed">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {d.recomendacion.product && (
              <p className="font-mono text-[11px] text-[#8A8A8A] mt-4 pt-4 border-t border-[#1F1F1F] leading-relaxed">
                {d.recomendacion.product} está en desarrollo: todavía no tiene fecha ni precio
                publicado.
              </p>
            )}
          </div>
        </Block>

        {/* ── 7. Inversión ── */}
        <Block n="05" title="Inversión">
          <p className="text-lg font-bold text-white">{d.inversion.entrada}</p>
          <p className="text-[#8A8A8A] text-[13px] mt-2 leading-relaxed">{d.inversion.nota}</p>
        </Block>

        {/* ── 8. Por qué ── */}
        {d.razones.length > 0 && (
          <Block n="06" title="Por qué esta recomendación">
            <ul className="space-y-2">
              {d.razones.map((r) => (
                <li key={r} className="text-[#B0B0B0] text-sm leading-relaxed">
                  {r}
                </li>
              ))}
            </ul>
          </Block>
        )}
      </div>

      {/* ── 9. Siguiente paso ── */}
      <div className="border border-[#4cfc0f]/40 bg-[#0E0E0E] p-5 lg:p-6 mt-8 relative corner-marks">
        <h3 className="text-lg font-bold text-white">¿Lo revisamos juntos?</h3>
        <p className="text-[#B0B0B0] text-sm mt-2 leading-relaxed">
          Este diagnóstico sale de tus respuestas. La conversación es donde se
          aterriza: qué se construye primero, con qué alcance y en cuánto tiempo.
        </p>
        <button
          type="button"
          onClick={onContact}
          className="w-full sm:w-auto bg-[#4cfc0f] text-black font-bold px-6 py-3.5 text-sm inline-flex items-center justify-center gap-2.5 mt-5 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Revisar mi diagnóstico con USERS
          <span aria-hidden="true">→</span>
        </button>
        <p className="font-mono text-[10px] text-[#8A8A8A] mt-3">
          Referencia {d.ref} · sin compromiso
        </p>
      </div>
    </div>
  )
}
