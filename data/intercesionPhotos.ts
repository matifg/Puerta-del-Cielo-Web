export type IntercesionMoment = {
  id: string;
  /** Nombre base del archivo en public/images/intercesion/ */
  slug: string;
  src: string;
  alt: string;
  caption: string;
  objectPosition?: string;
};

const intercesionFile = (name: string) => `/images/intercesion/${name}`;

/** Galería EIGE — public/images/intercesion/ (WebP: npm run optimize:galleries) */
export const INTERCESION_MOMENTS: IntercesionMoment[] = [
  {
    id: "eige-1",
    slug: "intersecion",
    src: intercesionFile("intersecion.jpeg"),
    alt: "Encuentro de la escuela EIGE de intercesión en Puerta del Cielo",
    caption: "Encuentro",
    objectPosition: "center 30%",
  },
  {
    id: "eige-2",
    slug: "intersecion2",
    src: intercesionFile("intersecion2.jpeg"),
    alt: "Momento de oración e intercesión en el salón",
    caption: "Oración",
    objectPosition: "center 28%",
  },
  {
    id: "eige-3",
    slug: "intersecion3",
    src: intercesionFile("intersecion3.jpeg"),
    alt: "Comunidad de intercesores durante la formación EIGE",
    caption: "Comunidad",
    objectPosition: "center 30%",
  },
  {
    id: "eige-4",
    slug: "intercesion-04",
    src: intercesionFile("intercesion-04.jpeg"),
    alt: "Tiempo de adoración y vigilancia en el programa de intercesión",
    caption: "Adoración",
    objectPosition: "center 28%",
  },
  {
    id: "eige-5",
    slug: "intersecion5",
    src: intercesionFile("intersecion5.jpeg"),
    alt: "Grupo en círculo orando de la mano durante un encuentro de intercesión",
    caption: "Comunidad",
    objectPosition: "center 35%",
  },
  {
    id: "eige-6",
    slug: "intersecion6",
    src: intercesionFile("intersecion6.png"),
    alt: "Intercesores en oración con la cabeza inclinada en el salón",
    caption: "Oración",
    objectPosition: "center 28%",
  },
];

export const INTERCESION_GALLERY_FOLDER = "intercesion";
