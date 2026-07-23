import Image from "next/image"

interface BrowserFrameProps {
  screenshotSrc: string
  screenshotAlt?: string
  urlLabel?: string
  className?: string
}

export default function BrowserFrame({
  screenshotSrc,
  screenshotAlt = "",
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
            <span className="text-[#555] text-[11px] truncate">{urlLabel}</span>
          </div>
        </div>
        <div className="w-[54px] shrink-0" />
      </div>

      {/* Screenshot */}
      <div className="relative">
        <Image
          src={screenshotSrc}
          alt={screenshotAlt}
          width={1280}
          height={720}
          className="w-full block"
        />
      </div>
    </div>
  )
}
