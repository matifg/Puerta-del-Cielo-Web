const bethelFile = (name: string) => `/images/bethel/${encodeURIComponent(name)}`;

export type BethelPhoto = {
  id: string;
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  body: string;
};

/** Galería «Así se vive Bethel» — proporción natural, sin recorte en miniaturas */
export const BETHEL_GALLERY_PHOTOS: BethelPhoto[] = [
  {
    id: "bethel-photo-intimidad",
    src: bethelFile("IMG_9568.jpg"),
    alt: "Hermana en oración en el sofá durante el encuentro de Bethel",
    eyebrow: "Intimidad",
    title: "Donde el encuentro empieza en el corazón",
    body:
      "En el sofá, en oración personal, se prepara la atmósfera: un corazón que busca a Dios antes de que el salón entero se una en un solo clamor.",
  },
  {
    id: "bethel-photo-ministerio",
    src: bethelFile("IMG_9589.jpg"),
    alt: "Joven ministrando con cántico durante el encuentro de Bethel",
    eyebrow: "Adoración",
    title: "Un corazón que canta",
    body:
      "Jóvenes y adultos alzan su voz: la adoración que sostiene el encuentro y abre camino para que todos entren en la presencia de Dios.",
  },
  {
    id: "bethel-photo-leon",
    src: bethelFile("IMG_9492.JPG"),
    alt: "Cuadros del león, la cruz y banderas de las naciones en el altar de Bethel",
    eyebrow: "El León de Judá",
    title: "Símbolos de la morada",
    body:
      "Cuadros del león y el cordero, banderas de las naciones y aceite de unción: lo que levantamos como altar visible en la tierra.",
  },
  {
    id: "bethel-photo-palabra",
    src: bethelFile("IMG_9733.jpg"),
    alt: "Músico adorando al teclado durante el encuentro de Bethel, con micrófono y partituras en pantalla",
    eyebrow: "La Palabra",
    title: "Un fuego que adora",
    body:
      "Con teclados y voz, el ministerio de música acompaña el encuentro: melodías y cánticos que encienden fe y abren espacio para que Dios hable.",
  },
  {
    id: "bethel-photo-generaciones",
    src: bethelFile("IMG_9789.JPG"),
    alt: "Familia adorando durante el encuentro de Bethel",
    eyebrow: "Todas las generaciones",
    title: "Una casa para todas las edades",
    body:
      "Cada generación participa con lo que tiene: canto, instrumentos, servicio o ministerio. Nadie queda afuera del mismo fuego de adoración.",
  },
  {
    id: "bethel-photo-9545",
    src: bethelFile("IMG_9545.JPG"),
    alt: "Participantes en adoración durante el encuentro de Bethel",
    eyebrow: "En el salón",
    title: "Un pueblo en un solo clamor",
    body: "Doce horas de encuentro: corazones unidos en adoración, intercesión e intimidad profunda.",
  },
];
