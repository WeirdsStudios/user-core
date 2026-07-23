"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

const navLinks = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Nuestro Trabajo", href: "#trabajo" },
  { label: "Proceso", href: "#proceso" },
  { label: "Blog", href: "#blog" },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-sm text-[#0A0A0A]"
          : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={scrolled ? "/logos/imagotipo_user_black.svg" : "/logos/imagotipo_user.svg"}
              alt="users.mx"
              width={120}
              height={32}
              className="h-8 w-auto transition-all duration-300"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 hover:opacity-70 ${
                  scrolled ? "text-[#0A0A0A]" : "text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/analisis"
              className="bg-[#4cfc0f] text-black px-5 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
            >
              Analiza tu negocio
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden flex flex-col gap-1.5 p-2 transition-colors duration-300 ${
              scrolled ? "text-[#0A0A0A]" : "text-white"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2 bg-current" : "bg-current"
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2 bg-current" : "bg-current"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white text-[#0A0A0A] border-t border-[#E5E5E5] shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-base font-medium py-2 border-b border-[#F5F5F5] hover:text-[#888] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/analisis"
              className="bg-[#4cfc0f] text-black text-center font-semibold px-5 py-3 mt-2 text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Analiza tu negocio
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
