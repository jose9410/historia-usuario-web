// ─── Catálogo de la API ───

export interface SubProceso {
  nombre: string;
  processId: string;
}

export interface AplicacionCatalog {
  nombre: string;
  subProcesos: SubProceso[];
}

// ─── Request al POST /api/process/start ───

export interface ProcessStartRequest {
  nombreAplicacion: string;
}

// ─── Respuesta inmediata del start ───

export interface StartResponse {
  jobId: string;
  message: string;
  status: string;
}

// ─── Estado del Job (polling) ───

export interface JobState {
  jobId: string;
  nombreProceso: string;
  status: JobStatus;
  mensaje: string;
  iniciadoEn: string;
  finalizadoEn?: string;
  totalRegistros: number;
  registrosOk: number;
  registrosError: number;
  porcentajeExito: number;
  detalle: string[];
  errorDetalle?: string;
}

export type JobStatus =
  | 'Pendiente'
  | 'Iniciando'
  | 'LanzandoReproceso'
  | 'MonitoreandoTablero'
  | 'DescargandoExcel'
  | 'ProcesandoExcel'
  | 'Completado'
  | 'Error';

/** Mapeo de estados a información visual */
export const STATUS_INFO: Record<JobStatus, { label: string; icon: string; color: string }> = {
  Pendiente:            { label: 'Pending',              icon: '⏳', color: 'var(--text-muted)' },
  Iniciando:            { label: 'Navigating...',        icon: '🌐', color: 'var(--color-accent-light)' },
  LanzandoReproceso:    { label: 'Configuring Date',     icon: '📅', color: 'var(--color-accent-light)' },
  MonitoreandoTablero:  { label: 'Starting Process',     icon: '🚀', color: 'var(--color-warning)' },
  DescargandoExcel:     { label: 'Downloading Excel',    icon: '📥', color: 'var(--color-accent-light)' },
  ProcesandoExcel:      { label: 'Processing Excel',     icon: '📋', color: 'var(--color-accent-light)' },
  Completado:           { label: 'Completed',            icon: '✅', color: 'var(--color-success)' },
  Error:                { label: 'Error',                icon: '❌', color: 'var(--color-error)' }
};
