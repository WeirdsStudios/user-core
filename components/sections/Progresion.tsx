/**
 * La ventaja que USERS no estaba explotando: no hay que decidirlo todo al
 * inicio. Un cliente puede contratar una web y crecer desde ahí sin cambiar
 * de proveedor ni reconstruir lo que ya pagó.
 *
 * Los cuatro pasos son una secuencia real (cada uno se apoya en el anterior),
 * así que la numeración sí codifica información y no es decoración.
 */
const stages = [
  {
    step: "01",
    name: "Presencia",
    body: "Un sitio que explica tu negocio y genera contacto.",
  },
  {
    step: "02",
    name: "Interacción",
    body: "Tus clientes reservan, cotizan o compran sin escribirte.",
  },
  {
    step: "03",
    name: "Operación",
    body: "Administras clientes, cobros e inventario desde un sistema.",
  },
  {
    step: "04",
    name: "Plataforma",
    body: "Todo conectado: lo que pasa afuera actualiza lo de adentro.",
  },
]

export default function Progresion() {
  return (
    <section className="bg-[#0A0A0A] text-white py-14 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#4cfc0f]">
            Cómo crece un proyecto
          </span>
          <h2 className="text-[1.6rem] sm:text-3xl lg:text-[2.75rem] font-bold leading-[1.15] mt-3 lg:mt-4 text-balance tracking-tight">
            No tienes que construirlo todo de una vez
          </h2>
          <p className="text-[#999] text-base lg:text-lg mt-5 leading-relaxed">
            Casi nadie empieza con una plataforma completa. Se empieza por donde
            duele y se avanza cuando el negocio lo pide — sin tirar lo anterior
            ni cambiar de proveedor.
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 mt-10 lg:mt-12">
          {stages.map((stage) => (
            <li key={stage.step} className="border-t-2 border-[#2A2A2A] pt-5 relative">
              {/* La barra verde crece con el paso: la progresión se lee sin texto */}
              <span
                aria-hidden="true"
                className="absolute -top-0.5 left-0 h-0.5 bg-[#4cfc0f]"
                style={{ width: `${Number(stage.step) * 25}%` }}
              />
              <span className="text-[11px] font-mono tnum text-[#4cfc0f]">{stage.step}</span>
              <h3 className="text-lg font-bold mt-2">{stage.name}</h3>
              <p className="text-[#888] text-sm mt-2 leading-relaxed">{stage.body}</p>
            </li>
          ))}
        </ol>

        <p className="text-[#666] text-sm mt-10 pt-6 border-t border-[#1F1F1F]">
          Greek Gym recorrió estos cuatro pasos con nosotros.
        </p>
      </div>
    </section>
  )
}
