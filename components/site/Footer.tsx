import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white mt-0">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-12 border-b border-[#1F1F1F]">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div>
            <Image
              src="/logos/imagotipo_user.svg"
              alt="users.mx"
              width={120}
              height={36}
              className="h-9 w-auto"
            />
            <p className="text-[#888] text-sm mt-3">Ciudad de México, México</p>
            <a
              href="mailto:hola@users.mx"
              className="text-[#888] text-sm hover:text-white transition-colors"
            >
              hola@users.mx
            </a>
          </div>
        </div>
      </div>

      {/* Middle section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 border-b border-[#1F1F1F]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Nav columns */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-10">
            {/* Empresa */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-4">
                Empresa
              </p>
              <ul className="space-y-3">
                <li>
                  <a href="/#servicios" className="text-sm text-[#888] hover:text-white transition-colors">
                    Servicios
                  </a>
                </li>
                <li>
                  <a href="/#proceso" className="text-sm text-[#888] hover:text-white transition-colors">
                    Proceso
                  </a>
                </li>
                <li>
                  <a href="/#blog" className="text-sm text-[#888] hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Proyectos */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-4">
                Proyectos
              </p>
              <ul className="space-y-3">
                <li>
                  <a href="https://greek-gym.com.mx" target="_blank" rel="noopener noreferrer"
                    className="text-sm text-[#888] hover:text-white transition-colors">
                    Greek Gym
                  </a>
                </li>
                <li>
                  <a href="https://lasfrescas.mx" target="_blank" rel="noopener noreferrer"
                    className="text-sm text-[#888] hover:text-white transition-colors">
                    Las Frescas
                  </a>
                </li>
                <li>
                  <a href="https://sofit.com.mx" target="_blank" rel="noopener noreferrer"
                    className="text-sm text-[#888] hover:text-white transition-colors">
                    SoFit
                  </a>
                </li>
                <li>
                  <a href="https://consulto.com.mx" target="_blank" rel="noopener noreferrer"
                    className="text-sm text-[#888] hover:text-white transition-colors">
                    Consulto
                  </a>
                </li>
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-4">
                Contacto
              </p>
              <ul className="space-y-3">
                <li>
                  <Link href="/analisis" className="text-sm text-[#888] hover:text-white transition-colors">
                    Analizar mi negocio
                  </Link>
                </li>
                <li>
                  <a href="mailto:hola@users.mx" className="text-sm text-[#888] hover:text-white transition-colors">
                    hola@users.mx
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Large wordmark */}
          <div className="lg:col-span-4 flex items-end justify-start lg:justify-end">
            <span className="text-6xl lg:text-8xl font-bold opacity-10 leading-none select-none">
              users.mx
            </span>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <p className="text-[#888] text-sm">users.mx © 2026</p>
          <div className="flex flex-wrap gap-2">
            {["Desarrollo Web", "Diseño", "Consultoría", "SaaS"].map((chip) => (
              <span key={chip} className="text-xs text-[#888] border border-[#333] px-3 py-1">
                {chip}
              </span>
            ))}
          </div>
          <p className="text-[#888] text-sm">Proyectos desde $15,000 MXN</p>
        </div>
      </div>
    </footer>
  )
}
