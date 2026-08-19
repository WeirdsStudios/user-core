// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE SIN USO — puede eliminarse.
//
// El blog salió de la home en la Fase 4 y en la Fase 6 pasó a tener hub propio
// en app/blog/page.tsx. Este componente ya no se importa desde ninguna página.
//
// Se conserva vacío únicamente porque el borrado de archivos está bloqueado en
// este entorno; mantenerlo con su código anterior rompía el typecheck, porque
// leía campos de BlogPost que ya no existen.
// ─────────────────────────────────────────────────────────────────────────────

export default function Blog() {
  return null
}
