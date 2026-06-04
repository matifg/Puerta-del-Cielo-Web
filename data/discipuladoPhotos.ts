export type DiscipuladoMoment = {
  id: string;
  src: string;
  alt: string;
  /** Pie corto visible bajo la miniatura */
  caption: string;
  objectPosition?: string;
  /** Celda alta en el bento de galería */
  bento?: "featured";
};

const discFile = (name: string) => `/images/discipulado/${name}`;

/** Galería «Así se vive el programa» — public/images/discipulado/ */
export const DISCIPULADO_MOMENTS: DiscipuladoMoment[] = [
  {
    id: "disc-moment-1",
    src: discFile("discipulado1.jpeg"),
    alt: "Encuentro del programa de discipulado en el salón de Puerta del Cielo",
    caption: "Encuentro",
    objectPosition: "center 32%",
  },
  {
    id: "disc-moment-2",
    src: discFile("discipulado2.jpeg"),
    alt: "Grupo durante una clase de formación bíblica en discipulado",
    caption: "Clase",
    objectPosition: "center 28%",
  },
  {
    id: "disc-moment-3",
    src: discFile("discipulado3.jpeg"),
    alt: "Momento de oración y comunión en un encuentro de discipulado",
    caption: "Oración",
    objectPosition: "center 30%",
  },
  {
    id: "disc-moment-4",
    src: discFile("discipulado4.jpeg"),
    alt: "Participantes compartiendo en el espacio de la escuela de discipulado",
    caption: "Comunidad",
    objectPosition: "center 28%",
  },
  {
    id: "disc-moment-5",
    src: discFile("discipulado5.png"),
    alt: "Grupo con Biblias y apuntes durante un encuentro quincenal de discipulado en el salón",
    caption: "En clase",
    objectPosition: "center 42%",
    bento: "featured",
  },
];

const BENTO_GRID_CLASS: Record<string, string> = {
  "disc-moment-5":
    "order-first col-span-2 md:col-span-1 md:col-start-1 md:row-start-1 md:row-span-2",
  "disc-moment-1": "md:col-start-2 md:row-start-1",
  "disc-moment-2": "md:col-start-2 md:row-start-2",
  "disc-moment-3": "md:col-start-3 md:row-start-1",
  "disc-moment-4": "md:col-start-3 md:row-start-2",
};

export function discipuladoMomentGridClass(id: string): string {
  return BENTO_GRID_CLASS[id] ?? "";
}
