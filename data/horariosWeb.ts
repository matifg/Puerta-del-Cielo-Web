/**
 * Horarios públicos en la web — única fuente para Hero (modal) y Footer.
 * Editá solo acá para mantener todo sincronizado.
 */
export type HorarioWeb = {
  dia: string;
  hora: string;
  /** Etiqueta opcional (ej. tipo de reunión) */
  detalle?: string;
};

/** Reunión general principal (modal del hero, footer y contacto) */
export const horariosReunionGeneral: readonly HorarioWeb[] = [
  { dia: "Domingos", hora: "19:00 hs" },
  { dia: "Miércoles", hora: "20:00 hs" },
];
