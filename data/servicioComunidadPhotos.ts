/** Fotos servicio a la comunidad — public/images/servicios/ (WebP: npm run optimize:galleries) */

export type ServicioPhoto = {
  id: string;
  folder: string;
  slug: string;
  src: string;
  alt: string;
  objectPosition?: string;
};

const svc = (file: string) => `/images/servicios/${file}`;

function photo(
  id: string,
  slug: string,
  alt: string,
  objectPosition?: string
): ServicioPhoto {
  return {
    id,
    folder: "servicios",
    slug,
    src: svc(`${slug}.jpeg`),
    alt,
    objectPosition,
  };
}

/** Escenas al scrollear — 4 fotos destacadas, sin repetir en el carrusel. */
export const SERVICIO_COMUNIDAD_SCENES: ServicioPhoto[] = [
  photo(
    "svc-p1",
    "areaservicio6",
    "Voluntarios sirviendo en la comunidad al aire libre, acompañando familias.",
    "center 42%"
  ),
  photo(
    "svc-p2",
    "areaservicio10",
    "Equipo de la iglesia preparando ropa y abrigo para entregar a quienes lo necesitan.",
    "center 40%"
  ),
  photo(
    "svc-p3",
    "areaservicio11",
    "Familias eligiendo ropa con cariño durante una jornada de servicio social.",
    "center 45%"
  ),
  photo(
    "svc-p4",
    "areaservicio12",
    "Equipo de Puerta del Cielo sirviendo con dedicación en la comunidad.",
    "center 40%"
  ),
];

/** Carrusel final — orden fijo; sin repetir escenas de arriba (6, 10, 11, 12). */
export const SERVICIO_COMUNIDAD_GALLERY: ServicioPhoto[] = [
  photo(
    "svc-g1",
    "areaservicio3",
    "Actividad solidaria con familias de la comunidad.",
    "center 40%"
  ),
  photo(
    "svc-g2",
    "areaservicio14",
    "Voluntarios organizando donaciones para familias de la comunidad.",
    "center 42%"
  ),
  photo(
    "svc-g3",
    "areaservicio9",
    "Momento de oración y acompañamiento entre voluntarios y familias.",
    "center 48%"
  ),
  photo(
    "svc-g4",
    "areaservicio7",
    "Voluntarios preparando pan y alimentos para compartir con la comunidad.",
    "center 42%"
  ),
  photo(
    "svc-g5",
    "areaservicio13",
    "Jóvenes sirviendo bebidas y alimento con alegría en la comunidad.",
    "center 50%"
  ),
  photo(
    "svc-g6",
    "areaservicio15",
    "Equipo sirviendo con dedicación en una jornada de ayuda social.",
    "center 40%"
  ),
  photo(
    "svc-g7",
    "areaservicio16",
    "Juguetes y regalos preparados para niños y familias de la comunidad.",
    "center 45%"
  ),
  photo(
    "svc-g8",
    "areaservicio17",
    "Regalos envueltos con amor para compartir esperanza en fechas especiales.",
    "center 48%"
  ),
];
