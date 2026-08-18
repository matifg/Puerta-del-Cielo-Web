/**
 * Horarios públicos en la web — única fuente para Hero, Footer, Contacto,
 * Planificá tu visita, modales de servicios y SEO.
 * Editá solo acá para mantener todo sincronizado.
 */
export type HorarioWeb = {
  dia: string;
  hora: string;
  /** Etiqueta opcional (ej. tipo de reunión) */
  detalle?: string;
};

/** Reunión general dominical — horario estacional (dato del modal de servicios). */
export const reunionGeneralEstacional = {
  dia: "Domingos",
  verano: "20:00 hs",
  invierno: "19:00 hs",
} as const;

/** Reunión general e intercesión (footer, contacto, modal hero si aplica). */
export const horariosReunionGeneral: readonly HorarioWeb[] = [
  {
    dia: reunionGeneralEstacional.dia,
    hora: `Invierno ${reunionGeneralEstacional.invierno} · Verano ${reunionGeneralEstacional.verano}`,
  },
  { dia: "Miércoles", hora: "20:00 hs", detalle: "Intercesión" },
];

/** Líneas para el modal de Reunión General en Nuestros servicios. */
export function horariosModalReunionGeneral(): readonly string[] {
  return [
    reunionGeneralEstacional.dia,
    `Verano: ${reunionGeneralEstacional.verano}`,
    `Invierno: ${reunionGeneralEstacional.invierno}`,
  ];
}

/** Resumen corto para hero y bloque Planificá tu visita. */
export function reunionGeneralResumenCorto(): string {
  return `${reunionGeneralEstacional.dia} · Invierno ${reunionGeneralEstacional.invierno} · Verano ${reunionGeneralEstacional.verano}`;
}

export type ServicioHorarioKey =
  | "reunionGeneral"
  | "intercesion"
  | "jovenes"
  | "teens"
  | "kids"
  | "conexion";

type ServicioHorarioConfig = {
  resumenCard: string;
  modalItems: readonly string[];
};

/** Horarios por servicio — cards y modales de Nuestros servicios. */
export const horariosServicios: Record<ServicioHorarioKey, ServicioHorarioConfig> = {
  reunionGeneral: {
    resumenCard: reunionGeneralEstacional.dia,
    modalItems: horariosModalReunionGeneral(),
  },
  intercesion: {
    resumenCard: "Miércoles 20:00 hs",
    modalItems: ["Miércoles 20:00 hs"],
  },
  jovenes: {
    resumenCard: "Sábados 20:00 hs",
    modalItems: ["Sábados 20:00 hs"],
  },
  teens: {
    resumenCard: "Sábados 18:00 hs",
    modalItems: ["Sábados 18:00 hs"],
  },
  kids: {
    resumenCard: "Domingos 20:00 hs",
    modalItems: ["Domingos 20:00 hs"],
  },
  conexion: {
    resumenCard: "Durante la semana",
    modalItems: ["Durante la semana"],
  },
};
