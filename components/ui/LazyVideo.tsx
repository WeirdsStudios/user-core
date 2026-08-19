"use client"

import { useEffect, useRef, useState } from "react"
import { trackEvent } from "@/lib/analytics/track"

interface LazyVideoProps {
  /** Nombre base: "greekgym" → .webm + .mp4 + -poster.webp */
  name: string
  /** Carpeta bajo /imgs. Por defecto "video". */
  dir?: string
  label?: string
  className?: string
}

/**
 * Carga la grabación solo cuando la card está por entrar en pantalla y la
 * pausa al salir. Sin esto, las tres grabaciones de la home se descargaban
 * al abrir la página (~3.3 MB) aunque el visitante nunca bajara hasta ellas.
 *
 * Hasta ese momento se muestra el póster, que además es lo que ve quien tiene
 * el autoplay bloqueado (iOS en modo de bajo consumo) o pidió menos animación.
 */
export default function LazyVideo({ name, dir = "video", label, className = "" }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respetar la preferencia del sistema: si pide menos movimiento, se queda el póster.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Una sola vez por montaje: al hacer scroll de ida y vuelta el observador
    // dispara varias veces, y eso no son varias visualizaciones.
    let reported = false

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true)
          if (!reported) {
            reported = true
            trackEvent("project_media_started", { slug: name, page: window.location.pathname })
          }
          el.play().catch(() => {
            /* autoplay bloqueado: se queda el póster, no es un error */
          })
        } else {
          el.pause()
        }
      },
      { rootMargin: "200px" }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [name])

  return (
    <video
      ref={ref}
      className={className}
      poster={`/imgs/${dir}/${name}-poster.webp`}
      width={960}
      height={540}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    >
      {load && (
        <>
          <source src={`/imgs/${dir}/${name}.webm`} type="video/webm" />
          <source src={`/imgs/${dir}/${name}.mp4`} type="video/mp4" />
        </>
      )}
    </video>
  )
}
