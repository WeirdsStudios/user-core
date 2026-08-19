"use client"

import { useState, useMemo, useId } from "react"
import Link from "next/link"
import {
  KB_CATEGORIES,
  entriesByCategory,
  searchEntries,
  type KbEntry,
} from "@/lib/knowledge-base"

/**
 * Buscador + listado de la base de conocimiento.
 *
 * Client component solo por el filtro de búsqueda: el contenido completo se
 * renderiza en el servidor y queda en el HTML, así que es indexable y funciona
 * sin JavaScript. Buscar solo lo filtra.
 *
 * Sin acordeones: las respuestas son cortas y esconderlas detrás de un clic
 * añadiría fricción justo donde alguien llega con una duda concreta.
 */
function EntryCard({ entry }: { entry: KbEntry }) {
  return (
    <article id={entry.id} className="border-b border-[#1F1F1F] py-6 scroll-mt-24">
      <h3 className="text-[15px] lg:text-base font-bold text-white">{entry.question}</h3>
      <p className="text-[#B0B0B0] text-[15px] mt-2 leading-relaxed max-w-prose">
        {entry.answer}
      </p>
      {entry.related && entry.related.length > 0 && (
        <ul className="flex flex-wrap gap-2 mt-4">
          {entry.related.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex items-center gap-1.5 font-mono text-[10px] text-white border border-[#2A2A2A] px-2.5 py-1.5 transition-colors hover:border-[#4cfc0f] hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cfc0f]"
              >
                {link.label}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default function AyudaClient() {
  const [query, setQuery] = useState("")
  const searchId = useId()
  const results = useMemo(() => (query.trim() ? searchEntries(query) : null), [query])

  return (
    <>
      {/* Buscador */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-10 lg:pb-14">
        <div className="max-w-xl">
          <label htmlFor={searchId} className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#8A8A8A]">
            Buscar en la ayuda
          </label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ej. cambiar una foto, cuánto cuesta, dominio…"
            className="w-full mt-2 bg-[#0E0E0E] border border-[#2A2A2A] px-4 py-3.5 text-[15px] text-white placeholder:text-[#6E6E6E] focus:outline-none focus:border-[#4cfc0f]"
          />
        </div>

        {results && (
          <div className="mt-8" role="region" aria-live="polite" aria-label="Resultados de búsqueda">
            <p className="font-mono text-[11px] text-[#8A8A8A]">
              {results.length === 0
                ? "Sin resultados. Prueba con otras palabras o escríbenos por WhatsApp."
                : `${results.length} ${results.length === 1 ? "resultado" : "resultados"}`}
            </p>
            {results.length > 0 && (
              <div className="mt-2 border-t border-[#1F1F1F] max-w-3xl">
                {results.map((entry) => (
                  <EntryCard key={entry.id} entry={entry} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Listado completo, oculto visualmente mientras hay búsqueda activa
          pero siempre presente en el HTML para que sea indexable. */}
      <div className={results ? "hidden" : undefined}>
        {KB_CATEGORIES.map((category) => {
          const entries = entriesByCategory(category.id)
          return (
            <section
              key={category.id}
              id={category.id}
              aria-labelledby={`cat-${category.id}`}
              className="py-10 lg:py-14 border-t border-[#1A1A1A] scroll-mt-20"
            >
              <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-4">
                  <h2
                    id={`cat-${category.id}`}
                    className="text-xl lg:text-2xl font-bold tracking-tight"
                  >
                    {category.label}
                  </h2>
                  <p className="text-[#8A8A8A] text-sm mt-2 leading-relaxed max-w-xs">
                    {category.description}
                  </p>
                  <p className="font-mono text-[11px] text-[#8A8A8A] mt-3">
                    {entries.length} {entries.length === 1 ? "respuesta" : "respuestas"}
                  </p>
                </div>
                <div className="lg:col-span-8 mt-4 lg:mt-0 border-t border-[#1F1F1F]">
                  {entries.map((entry) => (
                    <EntryCard key={entry.id} entry={entry} />
                  ))}
                </div>
              </div>
            </section>
          )
        })}
      </div>
    </>
  )
}
