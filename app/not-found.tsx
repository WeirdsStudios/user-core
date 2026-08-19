import Link from "next/link"
import Header from "@/components/site/Header"
import Footer from "@/components/site/Footer"
import { siteConfig } from "@/lib/site-config"

/**
 * 404 propia.
 *
 * La de Next dice "This page could not be found" en inglés y sin marca. Quien
 * llega aquí suele venir de un enlace viejo o de un resultado de búsqueda
 * desactualizado, así que lo importante no es disculparse: es ofrecerle los
 * cuatro caminos por los que probablemente venía.
 */
export const metadata = {
  title: "Página no encontrada — USERS",
  // No tiene sentido indexar una página de error.
  robots: { index: false, follow: true },
}

const DESTINOS = [
  { href: "/soluciones", label: "Soluciones", hint: "Qué construimos y para qué sirve" },
  { href: "/proyectos", label: "Proyectos", hint: "Casos reales que ya publicamos" },
  { href: "/productos", label: "Productos USERS", hint: "ACTIIVA y MEDIICA" },
  { href: "/ayuda", label: "Central de Ayuda", hint: "Respuestas sobre cómo trabajamos" },
]

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-[#0A0A0A] text-white min-h-[70vh]">
        <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
          <div
            aria-hidden="true"
            className="grid-tech absolute inset-0 pointer-events-none"
            style={{
              maskImage:
                "radial-gradient(ellipse 90% 60% at 50% 0%, #000 30%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 90% 60% at 50% 0%, #000 30%, transparent 100%)",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#4cfc0f]">
              Error 404
            </p>
            <h1 className="text-[1.85rem] sm:text-4xl lg:text-[3rem] font-bold leading-[1.12] mt-4 max-w-3xl text-balance tracking-tight">
              Esta página ya no existe
            </h1>
            <p className="text-[#B0B0B0] text-[15px] lg:text-lg mt-4 max-w-2xl leading-relaxed">
              Puede que el enlace haya cambiado o que la dirección tenga un
              error. Estos son los lugares a los que probablemente ibas.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 max-w-3xl">
              {DESTINOS.map((d) => (
                <li key={d.href}>
                  <Link
                    href={d.href}
                    className="block h-full border border-[#252525] bg-[#0E0E0E] p-4 transition-colors hover:border-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cfc0f]"
                  >
                    <span className="text-sm font-semibold text-white">{d.label}</span>
                    <span className="block text-[#8A8A8A] text-[13px] mt-1.5 leading-relaxed">
                      {d.hint}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                href="/"
                className="bg-[#4cfc0f] text-black font-bold px-6 py-3.5 text-sm inline-flex items-center justify-center gap-2.5 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Ir al inicio
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/centro-de-atencion"
                className="border border-[#2E2E2E] text-white font-semibold px-6 py-3.5 text-sm inline-flex items-center justify-center gap-2.5 transition-colors hover:border-[#4cfc0f] hover:text-[#4cfc0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cfc0f]"
              >
                Buscar en el Centro de Atención
              </Link>
            </div>

            <p className="font-mono text-[11px] text-[#8A8A8A] mt-8 leading-relaxed">
              ¿Llegaste desde un enlace nuestro que ya no funciona? Avísanos a{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-white underline underline-offset-4 hover:text-[#4cfc0f]"
              >
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
