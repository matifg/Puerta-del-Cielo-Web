/** Imágenes del acordeón Áreas de servicio — WebP vía PdcGalleryPicture */

export type AreaServicioImage = {
  folder: string;
  slug: string;
  src: string;
  alt: string;
  objectPosition?: string;
  aspectClass?: string;
};

const areas = (file: string) => `/images/areasServicio/${file}`;
const inter = (file: string) => `/images/intercesion/${file}`;

export const AREA_SERVICIO_IMAGES = {
  alabanza: {
    folder: "areasServicio",
    slug: "areaservicio2",
    src: areas("areaservicio2.jpeg"),
    alt: "Alabanza y adoración: músicos y equipo ministrando en la reunión",
    objectPosition: "50% 88%",
  },
  intercesion: {
    folder: "intercesion",
    slug: "intersecion",
    src: inter("intersecion.jpeg"),
    alt: "Intercesión: grupos orando en círculos durante el servicio",
    objectPosition: "50% 78%",
  },
  artes: {
    folder: "areasServicio",
    slug: "artesDinamicas",
    src: areas("artesDinamicas.jpeg"),
    alt: "Artes dinámicas: ministerio expresando adoración en movimiento",
    objectPosition: "50% 55%",
  },
  medios: {
    folder: "areasServicio",
    slug: "areaservicio3",
    src: areas("areaservicio3.png"),
    alt: "Medios y sonido: equipo técnico sirviendo en la reunión",
    objectPosition: "50% 50%",
  },
  anfitriones: {
    folder: "areasServicio",
    slug: "anfitriones",
    src: areas("anfitriones.jpg"),
    alt: "Anfitriones recibiendo y acompañando a quienes llegan al templo",
    objectPosition: "50% 45%",
  },
  social: {
    folder: "areasServicio",
    slug: "areaSocial",
    src: areas("areaSocial.jpeg"),
    alt: "Área social: voluntarios sirviendo a la comunidad",
    objectPosition: "50% 40%",
  },
  educativa: {
    folder: "areasServicio",
    slug: "areaEducativa",
    src: areas("areaEducativa.jpeg"),
    alt: "Área educativa: formación y discipulado en el salón",
    objectPosition: "50% 42%",
  },
} as const satisfies Record<string, AreaServicioImage>;
