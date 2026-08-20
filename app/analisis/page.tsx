import MotorClient from "./MotorClient"

/**
 * Motor de Análisis.
 *
 * La lógica de diagnóstico vive en `lib/motor/` y se ejecuta en el navegador:
 * la persona ve su resultado sin que salga nada a la red. Solo al pedir la
 * revisión con USERS se envía el lead al servidor.
 */
export default function AnalisisPage() {
  return (
    <main className="bg-[#0A0A0A] min-h-dvh">
      <MotorClient />
    </main>
  )
}
