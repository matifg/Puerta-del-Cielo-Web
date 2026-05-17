const bethelFile = (name: string) => `/images/bethel/${encodeURIComponent(name)}`;

/** Primera escena «Así se vive» — ancla FAB */
export const BETHEL_ENCOUNTER_SCROLL_ID = "bethel-e-intimidad";

export type BethelEncounterScene = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  alt: string;
  src: string;
  objectPosition?: string;
  /** Recorte distinto al 4:3 por defecto (p. ej. foto vertical) */
  imageAspectClass?: string;
  imageRight: boolean;
  scrollAnchor?: boolean;
  fabTitle: string;
};

export const BETHEL_ENCOUNTER_SCENES: BethelEncounterScene[] = [
  {
    id: "bethel-e-intimidad",
    eyebrow: "Intimidad",
    title: "Donde el encuentro empieza en el corazón",
    body:
      "En el sofá, en oración personal, se prepara la atmósfera: un corazón que busca a Dios antes de que el salón entero se una en un solo clamor.",
    alt: "Hermana en oración en el sofá durante el encuentro de Bethel",
    src: bethelFile("IMG_9568.jpg"),
    objectPosition: "center 38%",
    imageRight: false,
    scrollAnchor: true,
    fabTitle: "Así se vive",
  },
  {
    id: "bethel-e-ministerio",
    eyebrow: "Adoración",
    title: "Un corazón que canta",
    body:
      "Jóvenes y adultos alzan su voz: la adoración que sostiene el encuentro y abre camino para que todos entren en la presencia de Dios.",
    alt: "Joven ministrando con cántico durante el encuentro de Bethel",
    src: bethelFile("IMG_9589.jpg"),
    objectPosition: "center 35%",
    imageRight: true,
    fabTitle: "Adoración",
  },
  {
    id: "bethel-e-leon",
    eyebrow: "El León de Judá",
    title: "Símbolos de la morada",
    body:
      "Cuadros del león y el cordero, banderas de las naciones y aceite de unción: lo que levantamos como altar visible en la tierra.",
    alt: "Cuadros del león, la cruz y banderas de las naciones en el altar de Bethel",
    src: bethelFile("IMG_9492.JPG"),
    objectPosition: "center 50%",
    imageRight: false,
    fabTitle: "El León",
  },
  {
    id: "bethel-e-palabra",
    eyebrow: "La Palabra",
    title: "Un fuego que adora",
    body:
      "Con teclados y voz, el ministerio de música acompaña el encuentro: melodías y cánticos que encienden fe, purifican el corazón y abren espacio para que Dios hable en medio de su pueblo.",
    alt: "Músico adorando al teclado durante el encuentro de Bethel, con micrófono y partituras en pantalla",
    src: bethelFile("IMG_9733.jpg"),
    objectPosition: "center 42%",
    imageRight: true,
    fabTitle: "La Palabra",
  },
  {
    id: "bethel-e-generaciones",
    eyebrow: "Todas las generaciones",
    title: "Una casa para todas las edades",
    body:
      "Cada generación participa con lo que tiene: canto, instrumentos, servicio o ministerio. Nadie queda afuera del mismo fuego de adoración.",
    alt: "Familia adorando durante el encuentro de Bethel",
    src: bethelFile("IMG_9789.JPG"),
    objectPosition: "center 42%",
    imageRight: false,
    fabTitle: "Generaciones",
  },
];

export type BethelTabId = "corazon" | "palabra" | "respuesta";

export const BETHEL_TAB_IMAGES: Record<
  BethelTabId,
  { alt: string; src: string; objectPosition?: string } | null
> = {
  corazon: null,
  palabra: null,
  respuesta: null,
};

export const BETHEL_SCENE_SCROLL_IDS = [
  BETHEL_ENCOUNTER_SCROLL_ID,
  ...BETHEL_ENCOUNTER_SCENES.map((s) => s.id),
] as const;

export function isBethelSceneScrollId(id: string): boolean {
  return (BETHEL_SCENE_SCROLL_IDS as readonly string[]).includes(id);
}

/** Todas las anclas del FAB en /bethel — scroll centrado en viewport */
export function isBethelFabSectionId(id: string): boolean {
  return id.startsWith("bethel-");
}
