import Header from "@/components/site/Header"
import Footer from "@/components/site/Footer"
import Hero from "@/components/sections/Hero"
import Soluciones from "@/components/sections/Soluciones"
import CasosHome from "@/components/sections/CasosHome"
import ProductosUsers from "@/components/sections/ProductosUsers"
import Equipo from "@/components/sections/Equipo"
import ComoTrabajamos from "@/components/sections/ComoTrabajamos"
import CentroAtencion from "@/components/sections/CentroAtencion"
import MotorCTA from "@/components/sections/MotorCTA"
import Testimonials from "@/components/sections/Testimonials"
import FinalCTA from "@/components/sections/FinalCTA"

/**
 * Recorrido:
 *   qué hacemos → por qué creernos → qué compras → evidencia →
 *   productos propios → quién lo construye → cómo trabajamos →
 *   qué pasa después → cómo empezar → cierre
 *
 * Casos y productos van antes que Equipo: primero la prueba de que el trabajo
 * existe, después quién lo hizo.
 *
 * Cambios de esta fase:
 *   · Oferta (las "dos formas de trabajar") → sustituida por ProductosUsers,
 *     que ya distingue producto propio de trabajo a medida con más peso visual.
 *   · Mantenimiento → absorbido por CentroAtencion, que cuenta seguimiento y
 *     atención como una sola promesa en vez de repetirla dos veces.
 *   · TrustStrip → retirado: sus cuatro afirmaciones ("mismo equipo",
 *     "producto propio", "acompañamiento posterior") quedaron cubiertas —y
 *     mejor demostradas— por Equipo, Productos y Centro de Atención.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Soluciones />
        <CasosHome />
        <ProductosUsers />
        <Equipo />
        <ComoTrabajamos />
        <CentroAtencion />
        <MotorCTA />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
