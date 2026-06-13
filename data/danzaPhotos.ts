import type { PdcCarouselSlide } from "../components/PdcPhotoCarousel";

const danzaFile = (name: string) => `/images/danzas/${name}`;

/** Encuadre bajo: prioriza bailarines y escenario (recorta techo/pantalla antes que personas). */
const focusStage = "center 62%";

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
  {
    id: "danza-reunion",
    src: danzaFile("danza-reunion.png"),
    alt: "Ministerio de danza y reunión en el culto",
    objectPosition: focusStage,
  },
  {
    id: "danza-00",
    src: danzaFile("danza-00.jpg"),
    alt: "Ministración de danza con velos de seda y banda de alabanza en el escenario",
    objectPosition: focusStage,
  },
  {
    id: "danza-01",
    src: danzaFile("danza-01.png"),
    alt: "Ministerio de danza en el escenario durante la reunión",
    objectPosition: focusStage,
  },
  {
    id: "danza-02",
    src: danzaFile("danza-02.png"),
    alt: "Grupo de danza adorando en el culto",
    objectPosition: focusStage,
  },
];
