import Image from "next/image"
import LazyVideo from "@/components/ui/LazyVideo"

/** Grabación en loop de un proyecto. Los archivos viven en /imgs/video/. */
export interface FrameVideo {
  /** Nombre base sin extensión, ej. "greekgym" → greekgym.webm + .mp4 + -poster.webp */
  name: string
}

interface BrowserFrameProps {
  /** Captura estática. Ignorado si se pasa `video`. */
  screenshotSrc?: string
  screenshotAlt?: string
  /** Grabación en loop. Reemplaza a la captura estática cuando está presente. */
  video?: FrameVideo
  urlLabel?: string
  className?: string
}

export default function BrowserFrame({
  screenshotSrc,
  screenshotAlt = "",
  video,
  urlLabel = "users.mx",
  className = "",
}: BrowserFrameProps) {
  return (
    <div className={`rounded-xl overflow-hidden shadow-2xl border border-[#2A2A2A] ${className}`}>
      {/* Browser chrome bar */}
      <div className="bg-[#1A1A1A] px-4 py-3 flex items-center gap-3">
        <div className="flex gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-[#0D0D0D] rounded-md h-6 w-full max-w-xs flex items-center gap-2 px-3">
            <svg className="w-3 h-3 text-[#555] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2c-2.5 3-4 6.5-4 10s1.5 7 4 10M12 2c2.5 3 4 6.5 4 10s-1.5 7-4 10" />
            </svg>
            <span className="text-[#8A8A8A] text-[11px] truncate">{urlLabel}</span>
          </div>
        </div>
        <div className="w-[54px] shrink-0" />
      </div>

      {/* Contenido: grabación en loop o captura estática */}
      <div className="relative">
        {video ? (
          <LazyVideo
            name={video.name}
            label={screenshotAlt || undefined}
            className="w-full block"
          />
        ) : screenshotSrc ? (
          <Image
            src={screenshotSrc}
            alt={screenshotAlt}
            width={1280}
            height={720}
            className="w-full block"
            sizes="(max-width: 1024px) 100vw, 800px"
          />
        ) : null}
      </div>
    </div>
  )
}
