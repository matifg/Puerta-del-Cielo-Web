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
  "En Iglesia Puerta del Cielo formamos y equipamos líderes conforme al corazón de Dios, capacitando a cada creyente para desarrollar plenamente su llamado en Cristo y servir eficazmente en la obra del ministerio.";

export const FORMATION_LEADER_TRAITS: readonly string[] = [
  "Sean apasionados por la presencia de Dios.",
  "Estén firmemente fundamentados en las Escrituras.",
  "Sirvan con un corazón de siervos siguiendo el ejemplo de Cristo.",
  "Operen en los dones y capacidades que Dios les ha otorgado.",
  "Formen y acompañen a otros en su crecimiento espiritual.",
  "Trabajen por la unidad y la edificación de la Iglesia.",
];

export const FORMATION_ACCORDION: readonly FormacionLideresAccordionItem[] = [
  {
    id: "vision",
    title: "Nuestra visión",
    summary:
      "Creemos que el liderazgo nace del discipulado y la transformación espiritual. Trabajamos para levantar hombres y mujeres maduros en la fe, comprometidos con la Palabra de Dios, sensibles a la guía del Espíritu Santo y dispuestos a servir con humildad, excelencia y amor.\n\nComo Iglesia Puerta del Cielo, creemos que cada creyente ha sido llamado a participar activamente en la misión de Dios. Nuestra visión es equipar, desarrollar y enviar líderes que extiendan el Reino de Cristo, fortaleciendo la Iglesia y llevando esperanza, restauración y salvación a las naciones.",
  },
  {
    id: "fundamento",
    title: "Fundamento bíblico · Efesios 4:12",
    summary:
      "Basados en Efesios 4:12, entendemos que el propósito de la formación ministerial no es simplemente transmitir conocimientos, sino perfeccionar a los santos, preparándolos para cumplir su función dentro del Reino de Dios y contribuir a la edificación del Cuerpo de Cristo.\n\nNuestro anhelo es desarrollar líderes que no solo ejerzan influencia, sino que también formen discípulos y multipliquen la obra de Dios en cada esfera de la sociedad.",
  },
  {
    id: "generacion",
    title: "La generación que levantamos",
    summary: "Aspiramos a levantar una generación de líderes que:",
    bullets: FORMATION_LEADER_TRAITS,
  },
] as const;
