import type { PdcCarouselSlide } from "../components/PdcPhotoCarousel";
import { galleryCarouselSizes, galleryWebpSrc, galleryWebpSrcSet } from "./galleryWebp";

export type DiscipuladoMoment = {
  id: string;
  slug: string;
  src: string;
  alt: string;
  caption: string;
  objectPosition?: string;
  bento?: "featured";
};

const discFile = (name: string) => `/images/discipulado/${name}`;

export const DISCIPULADO_GALLERY_FOLDER = "discipulado";

/** Cuántas fotos muestra el bento antes de «Ver más» */
export const DISCIPULADO_FOTOS_INICIALES = 5;

/** Galería bento — public/images/discipulado/ */
export const DISCIPULADO_MOMENTS: DiscipuladoMoment[] = [
  {
    id: "disc-moment-1",
    slug: "discipulado1",
    src: discFile("discipulado1.jpeg"),
    alt: "Encuentro del programa de discipulado en el salón de Puerta del Cielo",
    caption: "Encuentro",
    objectPosition: "center 32%",
  },
  {
    id: "disc-moment-2",
    slug: "discipulado2",
    src: discFile("discipulado2.jpeg"),
    alt: "Grupo durante una clase de formación bíblica en discipulado",
    caption: "Clase",
    objectPosition: "center 28%",
  },
  {
    id: "disc-moment-3",
    slug: "discipulado3",
    src: discFile("discipulado3.jpeg"),
    alt: "Momento de oración y comunión en un encuentro de discipulado",
    caption: "Oración",
    objectPosition: "center 30%",
  },
  {
    id: "disc-moment-4",
    slug: "discipulado4",
    src: discFile("discipulado4.jpeg"),
    alt: "Participantes compartiendo en el espacio de la escuela de discipulado",
    caption: "Comunidad",
    objectPosition: "center 28%",
  },
  {
    id: "disc-moment-5",
    slug: "discipulado5",
    src: discFile("discipulado5.png"),
    alt: "Grupo con Biblias y apuntes durante un encuentro quincenal de discipulado en el salón",
    caption: "En clase",
    objectPosition: "center 42%",
    bento: "featured",
  },
  {
    id: "disc-moment-6",
    slug: "discipulado6",
    src: discFile("discipulado6.jpg"),
    alt: "Cuatro mujeres sonriendo en un encuentro de discipulado en el salón",
    caption: "Hermanas",
    objectPosition: "center 35%",
  },
  {
    id: "disc-moment-7",
    slug: "discipulado7",
    src: discFile("discipulado7.jpg"),
    alt: "Grupo de hombres con cuadernos frente al versículo de Génesis 28:17 en el salón",
    caption: "Casa de Dios",
    objectPosition: "center 28%",
  },
  {
    id: "disc-moment-8",
    slug: "discipulado8",
    src: discFile("discipulado8.jpg"),
    alt: "Seis mujeres reunidas alrededor de la mesa en un encuentro de discipulado",
    caption: "Mesa",
    objectPosition: "center 32%",
  },
  {
    id: "disc-moment-9",
    slug: "discipulado9",
    src: discFile("discipulado9.jpg"),
    alt: "Dos mujeres sonriendo juntas en un encuentro de discipulado",
    caption: "Compañeras",
    objectPosition: "center 30%",
  },
  {
    id: "disc-moment-10",
    slug: "discipulado10",
    src: discFile("discipulado10.jpg"),
    alt: "Grupo reunido alrededor de la mesa en un encuentro de discipulado en casa, con laptops y material de estudio",
    caption: "En casa",
    objectPosition: "center 35%",
  },
];

export const DISCIPULADO_HERO_WEBP = "/images/discipulado/discipulado1-1080.webp";
export const DISCIPULADO_HERO_FALLBACK = "/images/discipulado/discipulado1.jpeg";

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

/** @deprecated — preferir bento; se mantiene por compat */
export const DISCIPULADO_CAROUSEL_SLIDES: PdcCarouselSlide[] = DISCIPULADO_MOMENTS.map((photo) => ({
  id: photo.id,
  alt: photo.alt,
  src: galleryWebpSrc(DISCIPULADO_GALLERY_FOLDER, photo.slug, 1080),
  srcSet: galleryWebpSrcSet(DISCIPULADO_GALLERY_FOLDER, photo.slug),
  sizes: galleryCarouselSizes(),
  objectPosition: photo.objectPosition,
  caption: photo.caption,
}));
