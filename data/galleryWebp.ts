/** Helpers WebP compartidos para galerías en public/images/<folder>/ */

export const GALLERY_WIDTHS = [480, 720, 1080] as const;

export function galleryWebpSrc(folder: string, slug: string, width: number): string {
  return `/images/${folder}/${slug}-${width}.webp`;
}

export function galleryWebpSrcSet(folder: string, slug: string): string {
  return GALLERY_WIDTHS.map((w) => `${galleryWebpSrc(folder, slug, w)} ${w}w`).join(", ");
}

export function galleryGridSizes(): string {
  return "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 320px";
}

export function galleryMasonrySizes(): string {
  return "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 360px";
}

export function galleryLightboxSizes(): string {
  return "(max-width: 768px) 96vw, 1080px";
}

/** Carrusel ancho (Servicio comunidad, Danza, etc.) — prioriza WebP 720–1080 */
export function galleryCarouselSizes(): string {
  return "(max-width: 640px) 100vw, (max-width: 1024px) 92vw, (max-width: 1536px) 88vw, 1080px";
}
