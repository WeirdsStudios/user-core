const clients = ["Greek Gym", "Las Frescas", "SoFit", "Consulto", "users.mx"]

export default function ClientLogos() {
  // Triple the array so the animation loop is seamless
  const repeated = [...clients, ...clients, ...clients]

  return (
    <section className="py-8 border-y border-[#E5E5E5] overflow-hidden">
      <div className="flex w-max animate-marquee gap-16 items-center">
        {repeated.map((name, index) => (
          <span key={index} className="flex items-center gap-16 shrink-0">
            <span className="text-sm font-semibold tracking-widest uppercase text-[#888]">
              {name}
            </span>
            <span className="text-[#C5F82A] font-bold text-lg leading-none">·</span>
          </span>
        ))}
      </div>
    </section>
  )
}
