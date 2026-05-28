export type DiscipuladoMoment = {
  id: string;
  src: string;
  alt: string;
  /** Pie corto visible bajo la miniatura */
  caption: string;
  objectPosition?: string;
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
];
