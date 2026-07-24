"use client"

import { useEffect, useRef } from "react"

const SPEED_FACTOR = 0.55
const EASE = 0.09

export default function SmoothScroll() {
  const targetY = useRef(0)
  const currentY = useRef(0)
  const rafId = useRef<number | null>(null)
  const animating = useRef(false)

  useEffect(() => {
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!isFinePointer || prefersReducedMotion) return

    const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight

    targetY.current = window.scrollY
    currentY.current = window.scrollY

    const animate = () => {
      currentY.current += (targetY.current - currentY.current) * EASE
      if (Math.abs(targetY.current - currentY.current) < 0.5) {
        currentY.current = targetY.current
        window.scrollTo(0, currentY.current)
        animating.current = false
        return
      }
      window.scrollTo(0, currentY.current)
      rafId.current = requestAnimationFrame(animate)
    }

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return
      e.preventDefault()
      targetY.current = Math.min(Math.max(targetY.current + e.deltaY * SPEED_FACTOR, 0), maxScroll())
      if (!animating.current) {
        animating.current = true
        rafId.current = requestAnimationFrame(animate)
      }
    }

    const syncFromNativeScroll = () => {
      if (!animating.current) {
        targetY.current = window.scrollY
        currentY.current = window.scrollY
      }
    }

    const onResize = () => {
      targetY.current = Math.min(targetY.current, maxScroll())
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("scroll", syncFromNativeScroll, { passive: true })
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("scroll", syncFromNativeScroll)
      window.removeEventListener("resize", onResize)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return null
}
