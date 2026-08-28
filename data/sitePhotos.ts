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
    alt: "Mesa preparada para la Cena del Señor con pan y copas",
    /** Fuente casi cuadrada; WebP generados con anchos landscape (720/1080/1440). */
    layout: "landscape",
    objectPosition: "center 45%",
    caption: "Recordamos su sacrificio, proclamamos su victoria y esperamos su venida.",
  },
  santaCenaSimbolo: {
    slug: "santa-cena-simbolo",
    alt: "Copas de comunión frente a la cruz con paño rojo en el altar",
    /** Fuente vertical; WebP con anchos landscape — mostrar en marco 3:4, no en carrusel 2:1. */
    layout: "landscape",
    objectPosition: "center 42%",
    caption: "Hasta que Él venga, lo anunciamos y lo recordamos.",
  },
  santaCenaMesa: {
    slug: "santa-cena-mesa",
    alt: "Mesa de la Cena del Señor con pan, uvas y copas frente al altar del templo",
    layout: "portrait",
    objectPosition: "center 38%",
    caption: "La Cena del Señor nos recuerda el sacrificio de Cristo y la esperanza de su regreso.",
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

/** Visión — par visual Cena del Señor / Cruz (sin carrusel panorámico). */
export const VISION_CENA_PHOTOS = {
  mesa: SITE_PHOTOS.santaCenaMesa,
  cruz: SITE_PHOTOS.cruzFe,
} as const;

