const bethelFile = (name: string) => `/images/bethel/${encodeURIComponent(name)}`;

export type BethelMediaKind = "image" | "video";

export type BethelGalleryItem = {
  id: string;
  src: string;
  kind: BethelMediaKind;
  alt: string;
  eyebrow: string;
  title: string;
  body: string;
  /** Miniatura mientras carga o si el clip no reproduce (.mov) */
  poster?: string;
};

/** Huecos visibles en el muro; el resto del pool rota de a uno cada intervalo */
export const BETHEL_GALLERY_VISIBLE_COUNT = 6;
export const BETHEL_GALLERY_ROTATE_MS = 3000;
/** Duración de cada clip en la grilla antes de rotar (sin clic) */
export const BETHEL_GALLERY_VIDEO_PREVIEW_MS = 28_000;
/** Tope de seguridad si `ended` no dispara (p. ej. .MOV en Chrome) */
export const BETHEL_GALLERY_VIDEO_MAX_MS = 60_000;

export const BETHEL_DEFAULT_VIDEO_ID = "bethel-video-1";

const BETHEL_IMAGES: readonly Omit<BethelGalleryItem, "kind" | "src">[] = [
  {
    id: "bethel-1",
    alt: "Hermana en oración en el sofá durante el encuentro de Bethel",
    eyebrow: "Intimidad",
    title: "Donde el encuentro empieza en el corazón",
    body:
      "En el sofá, en oración personal, se prepara la atmósfera: un corazón que busca a Dios antes de que el salón entero se una en un solo clamor.",
  },
  {
    id: "bethel-2",
    alt: "Joven ministrando con cántico durante el encuentro de Bethel",
    eyebrow: "Adoración",
    title: "Un corazón que canta",
    body:
      "Jóvenes y adultos alzan su voz: la adoración que sostiene el encuentro y abre camino para que todos entren en la presencia de Dios.",
  },
  {
    id: "bethel-3",
    alt: "Cuadros del león, la cruz y banderas de las naciones en el altar de Bethel",
    eyebrow: "El León de Judá",
    title: "Símbolos de la morada",
    body:
      "Cuadros del león y el cordero, banderas de las naciones y aceite de unción: lo que levantamos como altar visible en la tierra.",
  },
  {
    id: "bethel-4",
    alt: "Músico adorando al teclado durante el encuentro de Bethel",
    eyebrow: "La Palabra",
    title: "Un fuego que adora",
    body:
      "Con teclados y voz, el ministerio de música acompaña el encuentro: melodías y cánticos que encienden fe y abren espacio para que Dios hable.",
  },
  {
    id: "bethel-5",
    alt: "Familia adorando durante el encuentro de Bethel",
    eyebrow: "Todas las generaciones",
    title: "Una casa para todas las edades",
    body:
      "Cada generación participa con lo que tiene: canto, instrumentos, servicio o ministerio. Nadie queda afuera del mismo fuego de adoración.",
  },
  {
    id: "bethel-6",
    alt: "Participantes en adoración durante el encuentro de Bethel",
    eyebrow: "En el salón",
    title: "Un pueblo en un solo clamor",
    body: "Doce horas de encuentro: corazones unidos en adoración, intercesión e intimidad profunda.",
  },
  {
    id: "bethel-7",
    alt: "Momento de adoración y encuentro en el salón de Bethel",
    eyebrow: "En el encuentro",
    title: "Presencia en el salón",
    body: "Otro instante del mismo fuego: un pueblo que busca a Dios en doce horas de adoración continua.",
  },
  {
    id: "bethel-8",
    alt: "Comunidad en adoración durante el encuentro de Bethel",
    eyebrow: "Comunidad",
    title: "Un mismo clamor",
    body: "Rostros y manos levantadas: la comunidad viviendo el encuentro en el salón.",
  },
  {
    id: "bethel-9",
    alt: "Adoración y ministerio durante el encuentro de Bethel",
    eyebrow: "Adoración",
    title: "Unidos en el salón",
    body: "Otro momento del encuentro: voces, instrumentos y corazones puestos en la misma dirección.",
  },
  {
    id: "bethel-10",
    alt: "Participantes sirviendo y adorando en Bethel",
    eyebrow: "Servicio",
    title: "Manos que sirven",
    body: "Detrás del fuego visible hay manos que preparan, acompañan y sostienen el encuentro.",
  },
  {
    id: "bethel-11",
    alt: "Pueblo adorando en el encuentro de Bethel",
    eyebrow: "Comunidad",
    title: "La casa reunida",
    body: "Una foto más del mismo clamor: generaciones juntas buscando la presencia de Dios.",
  },
  {
    id: "bethel-12",
    alt: "Material y cronograma del encuentro de Bethel",
    eyebrow: "Vigilia",
    title: "Doce horas con propósito",
    body: "Cada encuentro tiene su ritmo: adoración, palabra, descanso y vuelta al altar.",
  },
  {
    id: "bethel-13",
    alt: "Gráfica del encuentro de Bethel",
    eyebrow: "Bethel",
    title: "Morada de su presencia",
    body: "Lo que anunciamos y vivimos: un espacio donde Dios es honrado y la comunidad se encuentra.",
  },
];

const BETHEL_VIDEOS: readonly Omit<BethelGalleryItem, "kind" | "src">[] = [
  {
    id: "bethel-video-1",
    alt: "Video del encuentro de Bethel: adoración en el salón",
    eyebrow: "En vivo",
    title: "El encuentro en movimiento",
    body: "Un instante grabado del salón: adoración y presencia tal como se vivió en el encuentro.",
  },
  {
    id: "bethel-video-2",
    alt: "Video del encuentro de Bethel: momento de adoración",
    eyebrow: "En vivo",
    title: "Fuego en el salón",
    body: "Otro fragmento del mismo encuentro: doce horas donde el pueblo no deja de buscar a Dios.",
  },
];

const imageExtensions = [
  "jpg",
  "jpg",
  "jpg",
  "jpg",
  "jpg",
  "jpg",
  "jpg",
  "jpg",
  "jpg",
  "jpg",
  "jpg",
  "png",
  "png",
] as const;

/** Pool «Así se vive Bethel» — archivos en /public/images/bethel/bethel-{n}.* */
export const BETHEL_GALLERY_ITEMS: BethelGalleryItem[] = [
  ...BETHEL_IMAGES.map((meta, i) => ({
    ...meta,
    kind: "image" as const,
    src: bethelFile(`bethel-${i + 1}.${imageExtensions[i]}`),
  })),
  ...BETHEL_VIDEOS.map((meta, i) => ({
    ...meta,
    kind: "video" as const,
    src: bethelFile(`bethel-${i + 14}.mp4`),
    poster: bethelFile(i === 0 ? "bethel-6.jpg" : "bethel-7.jpg"),
  })),
];

/** @deprecated Usar BETHEL_GALLERY_ITEMS */
export const BETHEL_GALLERY_PHOTOS = BETHEL_GALLERY_ITEMS;

export type BethelPhoto = BethelGalleryItem;
