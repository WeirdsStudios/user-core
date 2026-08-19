"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { getWhatsAppLink } from "@/lib/whatsapp"

/**
 * Navegación mínima: cuatro destinos que corresponden al recorrido real de la
 * home. Ayuda y Blog viven en el footer — no compiten aquí.
 */
const navLinks = [
  { label: "Soluciones", href: "/soluciones" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Productos", href: "/productos" },
  { label: "Contacto", href: "/#contacto" },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Bloquea el scroll del fondo mientras el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  // Cerrar con Escape
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menuOpen])

  const solid = scrolled || menuOpen

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        solid ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link
            href="/"
            className="flex items-center shrink-0 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4cfc0f]"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src={solid ? "/logos/imagotipo_user_black.svg" : "/logos/imagotipo_user.svg"}
              alt="USERS — inicio"
              width={120}
              height={32}
              className="h-7 lg:h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Principal">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
                  solid
                    ? "text-[#0A0A0A] focus-visible:outline-[#0A0A0A]"
                    : "text-white focus-visible:outline-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/analisis"
              className="bg-[#4cfc0f] text-black px-5 py-2.5 text-sm font-bold transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
            >
              Analizar mi negocio
            </Link>
          </div>

          {/* Botón menú móvil — 44px de área táctil */}
          <button
            className={`lg:hidden flex flex-col justify-center gap-1.5 w-11 h-11 -mr-2 items-center transition-colors ${
              solid ? "text-[#0A0A0A]" : "text-white"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
          >
            <span
              className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Menú móvil a pantalla completa */}
      {menuOpen && (
        <div
          id="menu-movil"
          className="lg:hidden bg-white border-t border-[#E5E5E5] h-[calc(100dvh-4rem)] overflow-y-auto"
        >
          <nav className="px-6 py-4 flex flex-col" aria-label="Principal móvil">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-lg font-semibold text-[#0A0A0A] py-4 border-b border-[#F0F0F0]"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/analisis"
              className="bg-[#4cfc0f] text-black text-center font-bold px-5 py-4 mt-6 text-base"
              onClick={() => setMenuOpen(false)}
            >
              Analizar mi negocio
            </Link>
            <a
              href={getWhatsAppLink("hero")}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#0A0A0A] text-[#0A0A0A] text-center font-semibold px-5 py-4 mt-3 text-base"
              onClick={() => setMenuOpen(false)}
            >
              Hablar por WhatsApp
            </a>

            {/* Secundario: lo que no está en la navegación principal */}
            <div className="flex gap-6 mt-8 pt-6 border-t border-[#F0F0F0] text-sm text-[#6B6B6B]">
              <Link href="/ayuda" className="py-1.5" onClick={() => setMenuOpen(false)}>
                Central de Ayuda
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
