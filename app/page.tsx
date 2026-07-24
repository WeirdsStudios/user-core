import Header from "@/components/site/Header"
import Footer from "@/components/site/Footer"
import Hero from "@/components/sections/Hero"
import Manifesto from "@/components/sections/Manifesto"
import ClientLogos from "@/components/sections/ClientLogos"
import Services from "@/components/sections/Services"
import Portfolio from "@/components/sections/Portfolio"
import Process from "@/components/sections/Process"
import Differentiators from "@/components/sections/Differentiators"
import Testimonials from "@/components/sections/Testimonials"
import MotorCTA from "@/components/sections/MotorCTA"
import FAQ from "@/components/sections/FAQ"
import Mantenimiento from "@/components/sections/Mantenimiento"
import Team from "@/components/sections/Team"
import FinalCTA from "@/components/sections/FinalCTA"
import Blog from "@/components/sections/Blog"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <ClientLogos />
        <Services />
        <Mantenimiento />
        <Portfolio />
        <Team />
        <Differentiators />
        <Process />
        <MotorCTA />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Blog />
      </main>
      <Footer />
    </>
  )
}
