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

/** 4 fotos para las historias (marcos landscape 16:10). */
export const SERVICIO_COMUNIDAD_SCENES: ServicioPhoto[] = [
  photo(
    "svc-p1",
    "areaservicio6",
    "Voluntarios sirviendo en la comunidad al aire libre, acompañando familias."
  ),
  photo(
    "svc-p2",
    "areaservicio10",
    "Equipo de la iglesia preparando ropa y abrigo para entregar a quienes lo necesitan."
  ),
  photo(
    "svc-p3",
    "areaservicio11",
    "Familias eligiendo ropa con cariño durante una jornada de servicio social."
  ),
  photo(
    "svc-p4",
    "areaservicio12",
    "Equipo de Puerta del Cielo sirviendo con dedicación en la comunidad."
  ),
];

/** Galería quieta — landscape, centro natural. */
export const SERVICIO_COMUNIDAD_GALLERY: ServicioPhoto[] = [
  photo("svc-g1", "areaservicio3", "Actividad solidaria con familias de la comunidad."),
  photo(
    "svc-g2",
    "areaservicio14",
    "Voluntarios organizando donaciones para familias de la comunidad."
  ),
  photo(
    "svc-g3",
    "areaservicio9",
    "Momento de oración y acompañamiento entre voluntarios y familias."
  ),
  photo(
    "svc-g4",
    "areaservicio7",
    "Voluntarios preparando pan y alimentos para compartir con la comunidad."
  ),
  photo(
    "svc-g5",
    "areaservicio15",
    "Equipo sirviendo con dedicación en una jornada de ayuda social."
  ),
  photo(
    "svc-g6",
    "areaservicio16",
    "Juguetes y regalos preparados para niños y familias de la comunidad."
  ),
  photo(
    "svc-g7",
    "areaservicio17",
    "Regalos envueltos con amor para compartir esperanza en fechas especiales."
  ),
];
