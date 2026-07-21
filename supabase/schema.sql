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
