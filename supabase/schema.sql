-- Motor de Análisis de Negocio — users.mx
-- Correr este script en Supabase Dashboard → SQL Editor

-- ─── Tabla principal de análisis ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS analisis_negocio (
  id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  status          TEXT        DEFAULT 'en_progreso'
                  CHECK (status IN ('en_progreso', 'completado', 'abandonado')),

  -- Paso 1
  nombre_negocio  TEXT,
  giro            TEXT,
  anos_operando   TEXT,
  empleados       TEXT,
  ubicaciones     TEXT,

  -- Paso 2
  rango_ingresos  TEXT,
  clientes_mes    TEXT,
  ticket_promedio TEXT,
  area_servicio   TEXT,

  -- Paso 3
  tiene_sitio_web      TEXT,
  adquisicion_clientes TEXT,
  identidad_visual     TEXT,

  -- Paso 4
  problema_urgente TEXT,
  funcionalidades  TEXT[],

  -- Paso 5
  urgencia         TEXT,
  rango_presupuesto TEXT,

  -- Paso 6 — datos de contacto
  nombre_contacto  TEXT,
  email            TEXT,
  whatsapp         TEXT,

  -- Resultado del tabulador (solo en status=completado)
  presupuesto_min  INTEGER,
  presupuesto_max  INTEGER,
  breakdown        JSONB,
  recomendacion    TEXT,
  semanas_entrega  INTEGER
);

-- Auto-actualizar updated_at en cada UPDATE
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER analisis_updated_at
BEFORE UPDATE ON analisis_negocio
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── Tabla de sesiones agendadas ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sesiones_agendadas (
  id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  analisis_id     UUID        REFERENCES analisis_negocio(id) ON DELETE CASCADE,

  -- Datos de Cal.com
  cal_uid         TEXT,
  fecha_inicio    TIMESTAMPTZ,
  fecha_fin       TIMESTAMPTZ,

  -- Datos de contacto (duplicados para query rápida)
  nombre          TEXT,
  email           TEXT,
  whatsapp        TEXT
);

-- ─── RLS desactivado: todas las operaciones van desde server-side con service_role ──
ALTER TABLE analisis_negocio  DISABLE ROW LEVEL SECURITY;
ALTER TABLE sesiones_agendadas DISABLE ROW LEVEL SECURITY;

-- ─── Motor de Análisis V2 ────────────────────────────────────────────────────
-- El Motor dejó de calcular presupuestos y ahora produce un diagnóstico
-- explicable. Las columnas por pregunta de la V1 se quedan cortas: el
-- cuestionario cambia y no queremos una migración por cada pregunta nueva.
--
-- `respuestas` guarda el cuestionario tal cual se respondió (solo campos de
-- negocio: nunca datos de contacto, que tienen sus propias columnas).
-- `diagnostico` guarda el resumen que vio la persona, para poder retomar la
-- conversación sabiendo exactamente qué se le mostró.
--
-- Las columnas viejas se conservan: hay leads históricos guardados en ellas.
ALTER TABLE analisis_negocio
  ADD COLUMN IF NOT EXISTS respuestas  JSONB,
  ADD COLUMN IF NOT EXISTS diagnostico JSONB,
  ADD COLUMN IF NOT EXISTS referencia  TEXT;

CREATE INDEX IF NOT EXISTS analisis_negocio_referencia_idx
  ON analisis_negocio (referencia);

-- Conservación de prospectos: 12 meses desde la última interacción.
-- La ejecución es manual o por tarea programada; queda documentada aquí para
-- que la política viva junto al esquema y no solo en el aviso de privacidad.
-- Los registros con status 'completado' que se convirtieron en cliente deben
-- excluirse antes de aplicar esto.
COMMENT ON TABLE analisis_negocio IS
  'Leads del Motor de Análisis. Prospectos no convertidos: conservar 12 meses desde la última interacción significativa, después eliminar o anonimizar. Clientes: conservar según obligación contractual o fiscal aplicable.';
