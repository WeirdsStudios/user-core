import Image from "next/image"

const clients = [
  { name: "Greek Gym",   logo: "/imgs/clients/greekgym.webp" },
  { name: "Las Frescas", logo: "/imgs/clients/lasfrescas.webp" },
  { name: "Llevelín",       logo: "/imgs/clients/llevelin.webp" },
  { name: "Sigma Alimentos",    logo: "/imgs/clients/sigma.webp" },
  { name: "users.mx",    logo: "/imgs/clients/usersmx.svg" },
]

export default function ClientLogos() {
  const repeated = [...clients, ...clients, ...clients]

  return (
    <section className="py-10 border-y border-[#E5E5E5] overflow-hidden">
      <div className="flex w-max animate-marquee gap-16 items-center">
        {repeated.map((client, index) => (
          <span key={index} className="flex items-center gap-16 shrink-0">
            <span className="flex items-center gap-3">
              <Image
                src={client.logo}
                alt={client.name}
                width={120}
                height={28}
                className="h-7 w-auto object-contain opacity-50 grayscale hover:opacity-80 hover:grayscale-0 transition-all duration-300"
              />
              <span className="text-xs font-semibold tracking-widest uppercase text-[#AAA]">
                {client.name}
              </span>
            </span>
            <span className="text-[#CCC] font-light text-xl leading-none">·</span>
          </span>
        ))}
      </div>
    </section>
  )
}
