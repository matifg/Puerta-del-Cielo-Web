import type { PdcCarouselSlide } from "../components/PdcPhotoCarousel";

export const danzaFile = (name: string) => `/images/danzas/${name}`;

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

export type DanzaMomentoPhoto = {
  id: string;
  slug: string;
  alt: string;
  objectPosition?: string;
};

/** Galería de momentos (fotos verticales 3:4) — public/images/danzas/
 *  Primeras 4 visibles por defecto; el resto se muestra al expandir "Ver más fotos".
 *  Orden: fila-1 = danza-09 + danza-10 | fila-2 = danza-11 + danza-13 | ocultas = resto
 */
export const DANZA_MOMENTOS: readonly DanzaMomentoPhoto[] = [
  /* ── fila 1 (siempre visible) ── */
  {
    id: "danza-09",
    slug: "danza-09",
    alt: "Bailarina con velos violeta y rojo en movimiento",
    objectPosition: "center 35%",
  },
  {
    id: "danza-10",
    slug: "danza-10",
    alt: "Bailarina con velo celeste en pose elegante",
    objectPosition: "center 30%",
  },
  /* ── fila 2 (siempre visible) ── */
  {
    id: "danza-11",
    slug: "danza-11",
    alt: "Bailarina con velo verde en pose elegante durante la adoración",
    objectPosition: "center 35%",
  },
  {
    id: "danza-13",
    slug: "danza-13",
    alt: "Grupo de bailarinas en escena durante la ministración",
    objectPosition: "center 40%",
  },
  /* ── ocultas en "Ver más fotos" ── */
  {
    id: "danza-05",
    slug: "danza-05",
    alt: "Bailarina con velo verde borroso en movimiento",
    objectPosition: "center 40%",
  },
  {
    id: "danza-06",
    slug: "danza-06",
    alt: "Bailarina con pandero iluminado en el escenario",
    objectPosition: "center 25%",
  },
  {
    id: "danza-08",
    slug: "danza-08",
    alt: "Grupo de bailarinas en el escenario de Puerta del Cielo",
    objectPosition: "center 30%",
  },
];

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
