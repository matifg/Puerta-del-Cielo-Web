import type { PdcCarouselSlide } from "../components/PdcPhotoCarousel";

const danzaFile = (name: string) => `/images/danzas/${name}`;

const DANZA_WIDTHS = [480, 720, 1080] as const;

/** WebP responsivo (generar con npm run optimize:danza) */
export function danzaWebpSrc(slug: string, width: number): string {
  return `/images/danzas/${slug}-${width}.webp`;
}

export function danzaSrcSet(slug: string): string {
  return DANZA_WIDTHS.map((w) => `${danzaWebpSrc(slug, w)} ${w}w`).join(", ");
}

export function danzaCarouselSizes(): string {
  return "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 960px";
}

/** Encuadre bajo: prioriza bailarines y escenario (recorta techo/pantalla antes que personas). */
const focusStage = "center 62%";

function danzaSlide(
  id: string,
  slug: string,
  fallbackFile: string,
  alt: string
): PdcCarouselSlide {
  return {
    id,
    src: danzaFile(fallbackFile),
    srcSet: danzaSrcSet(slug),
    sizes: danzaCarouselSizes(),
    alt,
    objectPosition: focusStage,
  };
}

/** Carrusel Danza y Artes — public/images/danzas/ */
export const DANZA_CAROUSEL_SLIDES: PdcCarouselSlide[] = [
  {
    id: "danza-ministerio",
    alt: "Ministerio de danza en movimiento durante el culto",
    video: {
      mp4: danzaFile("danza-ministerio.mp4"),
      poster: danzaFile("danza-ministerio-poster.jpg"),
      objectPosition: focusStage,
    },
  },
  danzaSlide(
    "danza-reunion",
    "danza-reunion",
    "danza-reunion.png",
    "Ministerio de danza y reunión en el culto"
  ),
  danzaSlide(
    "danza-00",
    "danza-00",
    "danza-00.jpg",
    "Ministración de danza con velos de seda y banda de alabanza en el escenario"
  ),
  danzaSlide(
    "danza-01",
    "danza-01",
    "danza-01.png",
    "Ministerio de danza en el escenario durante la reunión"
  ),
  danzaSlide(
    "danza-02",
    "danza-02",
    "danza-02.png",
    "Grupo de danza adorando en el culto"
  ),
];
