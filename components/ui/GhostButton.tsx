import type { AnchorHTMLAttributes } from "react"

interface GhostButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  line1: string
  line2: string
  tone?: "dark" | "light"
  size?: "default" | "compact"
}

const TONE_STYLES: Record<"dark" | "light", { line1: string; line2: string; bg: string; glow: string }> = {
  dark: {
    line1: "text-white",
    line2: "text-[#888]",
    bg: "bg-black/25 hover:bg-transparent focus-visible:bg-transparent",
    glow:
      "hover:shadow-[0_10px_24px_-6px_rgba(160,160,160,0.4)] focus-visible:shadow-[0_10px_24px_-6px_rgba(160,160,160,0.4)]",
  },
  light: {
    line1: "text-[#0A0A0A]",
    line2: "text-[#888]",
    bg: "bg-black/5 hover:bg-transparent focus-visible:bg-transparent",
    glow:
      "hover:shadow-[0_8px_20px_-6px_rgba(120,120,120,0.35)] focus-visible:shadow-[0_8px_20px_-6px_rgba(120,120,120,0.35)]",
  },
}

const SIZE_STYLES: Record<
  "default" | "compact",
  { wrap: string; gap: string; line1: string; line2: string; arrow: string }
> = {
  default: {
    wrap: "px-8 py-4",
    gap: "gap-4",
    line1: "text-lg font-bold leading-tight",
    line2: "text-xs uppercase underline tracking-wide leading-tight mt-1",
    arrow: "text-lg",
  },
  compact: {
    wrap: "px-3 py-2",
    gap: "gap-2",
    line1: "text-sm font-semibold leading-tight",
    line2: "text-[10px] uppercase underline tracking-wide leading-tight mt-1",
    arrow: "text-sm",
  },
}

export default function GhostButton({
  line1,
  line2,
  tone = "dark",
  size = "default",
  className = "",
  ...anchorProps
}: GhostButtonProps) {
  const t = TONE_STYLES[tone]
  const s = SIZE_STYLES[size]

  return (
    <a
      {...anchorProps}
      className={`group inline-flex items-center outline-none transition-all duration-300 ease-out hover:-translate-y-1 focus-visible:-translate-y-1 ${s.wrap} ${s.gap} ${t.bg} ${t.glow} ${className}`}
    >
      <span className="flex flex-col">
        <span className={`${s.line1} ${t.line1}`}>{line1}</span>
        <span className={`${s.line2} ${t.line2}`}>{line2}</span>
      </span>
      <span
        aria-hidden="true"
        className={`${s.arrow} ${t.line1} shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1`}
      >
        →
      </span>
    </a>
  )
}
