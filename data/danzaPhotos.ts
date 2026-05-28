import type { PdcCarouselSlide } from "../components/PdcPhotoCarousel";

const danzaFile = (name: string) => `/images/danzas/${name}`;

/** Encuadre alto: prioriza caras y parte superior (object-cover). */
const focusTop = "center 28%";

/** Carrusel Danza y Artes — public/images/danzas/ */
export const DANZA_CAROUSEL_SLIDES: PdcCarouselSlide[] = [
  {
    id: "danza-ministerio",
    alt: "Ministerio de danza en movimiento durante el culto",
    video: {
      mp4: danzaFile("danza-ministerio.mp4"),
      poster: danzaFile("danza-ministerio-poster.jpg"),
      objectPosition: "center 30%",
    },
  },
  {
    id: "danza-reunion",
    src: danzaFile("danza-reunion.png"),
    alt: "Ministerio de danza y reunión en el culto",
    objectPosition: "center 26%",
  },
  {
    id: "danza-00",
    src: danzaFile("danza-00.jpg"),
    alt: "Ministración de danza con velos de seda y banda de alabanza en el escenario",
    objectPosition: "center 26%",
  },
  {
    id: "danza-01",
    src: danzaFile("danza-01.png"),
    alt: "Ministerio de danza en el escenario durante la reunión",
    objectPosition: focusTop,
  },
  {
    id: "danza-02",
    src: danzaFile("danza-02.png"),
    alt: "Grupo de danza adorando en el culto",
    objectPosition: "center 30%",
  },
];
