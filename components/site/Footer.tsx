import Link from "next/link"
import Image from "next/image"
import ConsentPreferencesLink from "@/components/consent/ConsentPreferencesLink"
import { siteConfig } from "@/lib/site-config"
import { PROJECTS } from "@/lib/projects"
import { SOLUTIONS } from "@/lib/solutions"
import { BLOG_POSTS } from "@/lib/blog"

/**
 * El footer absorbe lo que salió de la home en la Fase 4: equipo, blog y la
 * central de ayuda. Nada desapareció del sitio, solo dejó de competir con la
 * narrativa comercial.
 */
export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Marca y contacto */}
          <div className="lg:col-span-4">
            <Image
              src="/logos/imagotipo_user.svg"
              alt="USERS"
              width={120}
              height={36}
              className="h-8 w-auto"
            />
            <p className="text-[#8A8A8A] text-sm mt-4 leading-relaxed max-w-xs">
              {siteConfig.shortDescription}.
            </p>
            <p className="font-mono text-[11px] text-[#8A8A8A] mt-4 leading-relaxed">
              {siteConfig.contact.city}, México
              <br />
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-[#8A8A8A] hover:text-white transition-colors inline-block py-1.5 underline underline-offset-4"
              >
                {siteConfig.contact.email}
              </a>
            </p>
          </div>

          {/* Navegación */}
          <nav aria-label="Pie de página" className="lg:col-span-8 mt-10 lg:mt-0 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            <div>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A8A8A]">
                Soluciones
              </h2>
              <ul className="mt-3 space-y-1">
                {SOLUTIONS.map((solution) => (
                  <li key={solution.slug}>
                    <Link
                      href={`/soluciones/${solution.slug}`}
                      className="text-sm text-[#8A8A8A] hover:text-white transition-colors inline-block py-1.5 leading-snug"
                    >
                      {solution.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A8A8A]">
                Proyectos
              </h2>
              <ul className="mt-3 space-y-1">
                {PROJECTS.map((project) => (
                  <li key={project.slug}>
                    <Link
                      href={`/proyectos/${project.slug}`}
                      className="text-sm text-[#8A8A8A] hover:text-white transition-colors inline-block py-1.5"
                    >
                      {project.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/proyectos"
                    className="text-sm text-[#8A8A8A] hover:text-white transition-colors inline-block py-1.5"
                  >
                    Ver todos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A8A8A]">
                Productos
              </h2>
              <ul className="mt-3 space-y-1">
                {siteConfig.products.map((product) => (
                  <li key={product.name}>
                    <Link
                      href="/productos"
                      className="text-sm text-[#8A8A8A] hover:text-white transition-colors inline-block py-1.5"
                    >
                      {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A8A8A]">
                Empresa
              </h2>
              <ul className="mt-3 space-y-1">
                <li>
                  <Link
                    href="/#proceso"
                    className="text-sm text-[#8A8A8A] hover:text-white transition-colors inline-block py-1.5"
                  >
                    Cómo trabajamos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/analisis"
                    className="text-sm text-[#8A8A8A] hover:text-white transition-colors inline-block py-1.5"
                  >
                    Analizar mi negocio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ayuda"
                    className="text-sm text-[#8A8A8A] hover:text-white transition-colors inline-block py-1.5"
                  >
                    Central de Ayuda
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A8A8A]">
                Escribimos
              </h2>
              <ul className="mt-3 space-y-1">
                {BLOG_POSTS.slice(0, 3).map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm text-[#8A8A8A] hover:text-white transition-colors inline-block py-1.5 leading-snug"
                    >
                      {post.title.length > 34 ? `${post.title.slice(0, 34)}…` : post.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-[#8A8A8A] hover:text-white transition-colors inline-block py-1.5"
                  >
                    Ver el blog
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-[#1A1A1A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-[#8A8A8A]">
            {siteConfig.wordmark} © 2026
          </p>

          {/* Poder revocar el consentimiento tiene que estar siempre a la
              vista, no solo la primera vez que se pregunta. */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link
              href="/aviso-de-privacidad"
              className="font-mono text-[11px] text-[#8A8A8A] hover:text-white transition-colors py-1.5"
            >
              Aviso de privacidad
            </Link>
            <ConsentPreferencesLink className="font-mono text-[11px] text-[#8A8A8A] hover:text-white transition-colors py-1.5">
              Preferencias de cookies
            </ConsentPreferencesLink>
            <p className="font-mono text-[11px] text-[#8A8A8A]">
              Proyectos desde {siteConfig.pricing.startingPriceLabel}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
