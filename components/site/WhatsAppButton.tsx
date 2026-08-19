"use client"

import { useEffect, useState } from "react"
import { getWhatsAppLink } from "@/lib/whatsapp"

const SESSION_KEY = "wa-entered"

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    /**
     * En navegación privada o con cookies de terceros bloqueadas, tocar
     * sessionStorage lanza una excepción. Sin este resguardo el error subía
     * y se llevaba por delante la hidratación del resto de la página —el
     * Centro de Atención dejaba de responder por culpa de este botón.
     */
    let alreadyShown: string | null = null
    try {
      alreadyShown = sessionStorage.getItem(SESSION_KEY)
      if (!alreadyShown) sessionStorage.setItem(SESSION_KEY, "1")
    } catch {
      // Sin memoria de sesión: se muestra con la animación completa siempre.
    }
    const t = setTimeout(() => setVisible(true), alreadyShown ? 0 : 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <a
      href={getWhatsAppLink("default")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      /* Circular y compacto en móvil: un cuadro grande fijo tapaba texto de las
         secciones. El área táctil sigue por encima de 44px. */
      /* El verde de marca de WhatsApp deja el texto blanco en 2.1:1. Al
         desplegar la etiqueta el fondo pasa al verde oscuro oficial, donde el
         mismo blanco llega a 7.7:1. */
      className={`group fixed bottom-5 right-4 lg:bottom-6 lg:right-6 z-50 flex items-center rounded-full lg:rounded-none bg-[#25D366] hover:bg-[#075E54] focus-visible:bg-[#075E54] text-white shadow-[0_4px_20px_rgba(0,0,0,0.35)] transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      {/* Icon */}
      <div className="p-3 lg:p-4 shrink-0 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </div>

      {/* Label — se despliega al hover, solo desktop */}
      <span className="hidden lg:block max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[200px] pr-0 group-hover:pr-5">
        Escríbenos por WhatsApp
      </span>
    </a>
  )
}
