/** Fotos editoriales en public/images/editorial/ (generar con npm run optimize:editorial). */

export type EditorialPhoto = {
  slug: string;
  alt: string;
  layout: "landscape" | "portrait";
  objectPosition?: string;
  caption?: string;
};

const editorialBase = "/images/editorial";

const LANDSCAPE_WIDTHS = [720, 1080, 1440] as const;
const PORTRAIT_WIDTHS = [480, 720, 960] as const;

export function editorialSrc(slug: string, width: number): string {
  return `${editorialBase}/${slug}-${width}.webp`;
}

export function editorialSrcSet(slug: string, layout: EditorialPhoto["layout"]): string {
  const widths = layout === "portrait" ? PORTRAIT_WIDTHS : LANDSCAPE_WIDTHS;
  return widths.map((w) => `${editorialSrc(slug, w)} ${w}w`).join(", ");
}

export function editorialSizes(layout: EditorialPhoto["layout"]): string {
  return layout === "portrait"
    ? "(max-width: 768px) 90vw, 360px"
    : "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 960px";
}

export const SITE_PHOTOS = {
  cruzFe: {
    slug: "cruz-fe",
    alt: "Cruz de madera con paño rojo en el altar",
    layout: "landscape",
    objectPosition: "center 42%",
    caption: "La cruz al centro de nuestra adoración y de nuestra fe.",
  },
  santaCena: {
    slug: "santa-cena",
    alt: "Mesa preparada para la Santa Cena con pan y copas",
    layout: "landscape",
    objectPosition: "center 45%",
    caption:
      "En la mesa del Señor recordamos su sacrificio, renovamos nuestra fe y compartimos como familia el pan y el cáliz.",
  },
  santaCenaSimbolo: {
    slug: "santa-cena-simbolo",
    alt: "Copas de comunión frente a la cruz con paño rojo en el altar",
    layout: "landscape",
    objectPosition: "center 48%",
    caption:
      "En la mesa del Señor recordamos su sacrificio, renovamos nuestra fe y compartimos como familia el pan y el cáliz.",
  },
  santaCenaMesa: {
    slug: "santa-cena-mesa",
    alt: "Mesa de Santa Cena con pan, uvas y copas frente al altar del templo",
    layout: "portrait",
    objectPosition: "center 40%",
    caption:
      "En la mesa del Señor recordamos su sacrificio, renovamos nuestra fe y compartimos como familia el pan y el cáliz.",
  },
  contactoEquipo: {
    slug: "contacto-equipo",
    alt: "Equipo de ungieres y bienvenida de Puerta del Cielo en el ingreso del templo",
    layout: "landscape",
    objectPosition: "center 42%",
    caption: "Nuestro equipo de ungieres te recibe con alegría — estamos para servirte.",
  },
  bethelEncuentro: {
    slug: "bethel-encuentro",
    alt: "Congregación reunida en el templo durante un encuentro de adoración y Santa Cena",
    layout: "landscape",
    objectPosition: "center 42%",
  },
  bethelAdoracion: {
    slug: "bethel-adoracion",
    alt: "Adoración con los brazos en alto durante el encuentro",
    layout: "landscape",
    objectPosition: "center 35%",
  },
  contactoLugares: {
    slug: "contacto-lugares",
    alt: "Congregación adorando en el templo con la cruz iluminada al frente",
    layout: "landscape",
    objectPosition: "center 40%",
    caption: "Así vivimos la adoración cuando nos reunimos — te esperamos.",
  },
} as const satisfies Record<string, EditorialPhoto>;

/** Galería Visión y propósito (Revelación de la Cruz / Santa Cena) */
export const VISION_GALLERY: EditorialPhoto[] = [
  SITE_PHOTOS.santaCenaMesa,
  SITE_PHOTOS.cruzFe,
  SITE_PHOTOS.santaCenaSimbolo,
  SITE_PHOTOS.contactoLugares,
];

/** Carrusel EIGE Intercesión (adoración y altar) */
export const INTERCESION_GALLERY: EditorialPhoto[] = [
  SITE_PHOTOS.cruzFe,
  SITE_PHOTOS.contactoLugares,
  SITE_PHOTOS.santaCenaSimbolo,
];

