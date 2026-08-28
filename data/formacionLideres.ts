import type { PdcCarouselSlide } from "../components/PdcPhotoCarousel";
import { galleryCarouselSizes, galleryWebpSrc, galleryWebpSrcSet } from "./galleryWebp";

export type FormacionLideresAccordionItem = {
  id: string;
  title: string;
  /** Párrafos separados por doble salto de línea */
  summary: string;
  bullets?: readonly string[];
};

export type FormacionMoment = {
  id: string;
  kind: "image" | "video";
  slug: string;
  src: string;
  alt: string;
  caption: string;
  objectPosition?: string;
  bento?: "featured";
  /** Oculto en la grilla notebook (2 filas); accesible en la tira inferior */
  hideOnNotebook?: boolean;
  video?: {
    mp4: string;
    poster: string;
    objectPosition?: string;
  };
};

const formationFile = (name: string) => `/images/formacionLideres/${name}`;

export const FORMATION_GALLERY_FOLDER = "formacionLideres";

const focusFace = "center 28%";
const focusStage = "center 14%";

/** Galería bento — public/images/formacionLideres/ */
export const FORMATION_MOMENTS: FormacionMoment[] = [
  {
    id: "formacion-moment-01",
    kind: "image",
    slug: "formacion-01",
    src: formationFile("formacion-01.jpg"),
    alt: "Pastor ministrando en el escenario durante la formación de líderes",
    caption: "Ministración",
    objectPosition: "center 22%",
    bento: "featured",
  },
  {
    id: "formacion-moment-02",
    kind: "image",
    slug: "formacion-02",
    src: formationFile("formacion-02.jpg"),
    alt: "Enseñanza sobre la unción del Espíritu Santo en el encuentro de formación",
    caption: "Enseñanza",
    objectPosition: focusStage,
  },
  {
    id: "formacion-moment-05",
    kind: "image",
    slug: "formacion-05",
    src: formationFile("formacion-05.jpg"),
    alt: "Grupo de la Escuela de Formación de Líderes reunido en el salón",
    caption: "Comunidad",
    objectPosition: focusFace,
  },
  {
    id: "formacion-moment-06",
    kind: "image",
    slug: "formacion-06",
    src: formationFile("formacion-06.jpg"),
    alt: "Participantes tomando notas durante la clase de formación ministerial",
    caption: "En clase",
    objectPosition: focusFace,
  },
  {
    id: "formacion-moment-04",
    kind: "image",
    slug: "formacion-04",
    src: formationFile("formacion-04.jpg"),
    alt: "Líderes en formación estudiando y compartiendo en las mesas",
    caption: "Estudio",
    objectPosition: "center 22%",
  },
  {
    id: "formacion-moment-03",
    kind: "image",
    slug: "formacion-03",
    src: formationFile("formacion-03.jpg"),
    alt: "Salón de formación con participantes atentos a la palabra",
    caption: "Encuentro",
    objectPosition: focusStage,
    hideOnNotebook: true,
  },
  {
    id: "formacion-moment-video",
    kind: "video",
    slug: "formacion-video",
    src: formationFile("formacion-02.jpg"),
    alt: "Video del encuentro de Formación de Líderes",
    caption: "Video",
    hideOnNotebook: true,
    video: {
      mp4: formationFile("formacion-video.mp4"),
      poster: formationFile("formacion-02.jpg"),
      objectPosition: focusStage,
    },
  },
  {
    id: "formacion-moment-video-2",
    kind: "video",
    slug: "formacion-video-2",
    src: formationFile("formacion-05.jpg"),
    alt: "Momento del encuentro de Formación de Líderes",
    caption: "En el salón",
    hideOnNotebook: true,
    video: {
      mp4: formationFile("formacion-video-2.mp4"),
      poster: formationFile("formacion-05.jpg"),
      objectPosition: focusFace,
    },
  },
];

/** Carrusel — solo landscape + videos (el portrait va aparte) */
export const FORMATION_CAROUSEL_SLIDES: PdcCarouselSlide[] = FORMATION_MOMENTS.filter(
  (m) => m.bento !== "featured"
).map((moment) => {
  if (moment.kind === "video" && moment.video) {
    return {
      id: moment.id,
      alt: moment.alt,
      caption: moment.caption,
      video: moment.video,
    };
  }
  return {
    id: moment.id,
    alt: moment.alt,
    src: galleryWebpSrc(FORMATION_GALLERY_FOLDER, moment.slug, 1080),
    srcSet: galleryWebpSrcSet(FORMATION_GALLERY_FOLDER, moment.slug),
    sizes: galleryCarouselSizes(),
    objectPosition: moment.objectPosition,
    caption: moment.caption,
  };
});

/** Verticales aparte del carrusel */
export const FORMATION_PORTRAIT_MOMENTS = FORMATION_MOMENTS.filter(
  (m) => m.bento === "featured" && m.kind === "image"
);

/** Landscapes estáticas (sin video) — grilla editorial Liderazgo */
export const FORMATION_LANDSCAPE_MOMENTS = FORMATION_MOMENTS.filter(
  (m) => m.kind === "image" && m.bento !== "featured"
);

const BENTO_GRID_CLASS: Record<string, string> = {
  "formacion-moment-01":
    "order-first col-span-2 md:col-span-1 md:col-start-1 md:row-start-1 md:row-span-2",
  "formacion-moment-02": "md:col-start-2 md:row-start-1",
  "formacion-moment-05": "md:col-start-3 md:row-start-1",
  "formacion-moment-06": "md:col-start-2 md:row-start-2",
  "formacion-moment-04": "md:col-start-3 md:row-start-2",
  "formacion-moment-video": "md:col-start-1 md:row-start-3",
  "formacion-moment-03": "md:col-start-2 md:row-start-3",
  "formacion-moment-video-2": "md:col-start-3 md:row-start-3",
};

export function formationMomentGridClass(id: string): string {
  return BENTO_GRID_CLASS[id] ?? "";
}

export const FORMATION_NOTEBOOK_EXTRAS = FORMATION_MOMENTS.filter((m) => m.hideOnNotebook);

export const FORMATION_EFESIOS_VERSE =
  "A fin de perfeccionar a los santos para la obra del ministerio, para la edificación del cuerpo de Cristo.";

export const FORMATION_VISION_INTRO =
  "Equipamos líderes conforme al corazón de Dios para servir en la obra del ministerio.";

export const FORMATION_LEADER_TRAITS: readonly string[] = [
  "Apasionados por la presencia de Dios",
  "Firmes en las Escrituras",
  "Siervos con el ejemplo de Cristo",
  "Que forman y acompañan a otros",
];

export const FORMATION_ACCORDION: readonly FormacionLideresAccordionItem[] = [
  {
    id: "vision",
    title: "Nuestra visión",
    summary:
      "Levantamos hombres y mujeres maduros en la fe, sensibles al Espíritu y dispuestos a servir con humildad. Equipamos y enviamos líderes que fortalezcan la Iglesia y extiendan el Reino de Cristo.",
  },
  {
    id: "generacion",
    title: "La generación que levantamos",
    summary: "Aspiramos a líderes que:",
    bullets: FORMATION_LEADER_TRAITS,
  },
] as const;
