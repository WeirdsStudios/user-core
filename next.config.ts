import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },

  /**
   * Redirecciones permanentes de URLs que cambiaron de slug.
   *
   * El artículo de ACTIIVA se renombró en la Fase 6: el título anterior
   * afirmaba que el producto ya había resuelto algo, cuando sigue en
   * desarrollo. La URL vieja puede estar indexada o compartida.
   */
  async redirects() {
    return [
      {
        source: "/blog/como-actiiva-resolvio-el-problema-de-administracion-de-un-gimnasio-real",
        destination: "/blog/de-un-gimnasio-en-ecatepec-al-desarrollo-de-actiiva",
        // 301 explícito. `permanent: true` emitiría 308, que los buscadores
        // tratan igual, pero 301 es la señal universalmente reconocida para un
        // cambio de URL de contenido.
        statusCode: 301,
      },
    ];
  },

  /**
   * Cabeceras de seguridad.
   *
   * Se incluyen las que no dependen de conocer todo lo que la página carga:
   * son seguras hoy y lo seguirán siendo al agregar campañas o herramientas.
   *
   * NO SE INCLUYE Content-Security-Policy a propósito. Una CSP útil para una
   * app de Next necesita nonce por petición, y eso obliga a render dinámico en
   * todas las rutas: hoy 29 de ellas son estáticas. La alternativa —permitir
   * 'unsafe-inline'— daría la apariencia de protección sin la protección. Se
   * documenta como pendiente con su plan, en vez de fingir que está resuelto.
   *
   * Strict-Transport-Security ya la emite Vercel en el dominio (verificado en
   * producción: max-age=63072000), así que no se duplica aquí.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Impide que el navegador adivine el tipo de un archivo y lo
          // ejecute como algo que no es.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Nadie debería poder incrustar el sitio en un iframe: es la
          // defensa contra clickjacking sobre los CTA.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Al salir hacia otro dominio solo viaja el origen, nunca la ruta
          // completa —que puede llevar parámetros de campaña.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // El sitio no usa ninguna de estas capacidades. Negarlas evita que
          // un script incrustado las pida en nuestro nombre.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
