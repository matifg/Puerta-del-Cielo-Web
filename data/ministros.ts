/** Slug del archivo en public/images/ministros/{slug}.jpg */
export type MinisterSlug =
  | "jorge-gabriela"
  | "oscar-termini"
  | "gustavo-becerro"
  | "silvia-taieti"
  | "damian-marcora"
  | "paola-virrzi"
  | "veronica-martinez"
  | "debora-bugueno";

const OPT = "/images/ministros/optimized";
const RAW = "/images/ministros";

export type PortraitVariant = "lead" | "team";

const TEAM_WIDTHS = [320, 640] as const;
const LEAD_WIDTHS = [384, 768] as const;

export function ministerRawSrc(slug: MinisterSlug): string {
  return `${RAW}/${slug}.jpg`;
}

export function ministerOptimizedSrc(slug: MinisterSlug, variant: PortraitVariant): string {
  const widths = variant === "lead" ? LEAD_WIDTHS : TEAM_WIDTHS;
  const max = widths[widths.length - 1];
  return `${OPT}/${slug}-${max}.webp`;
}

export function ministerSrcSet(slug: MinisterSlug, variant: PortraitVariant): string {
  const widths = variant === "lead" ? LEAD_WIDTHS : TEAM_WIDTHS;
  return widths.map((w) => `${OPT}/${slug}-${w}.webp ${w}w`).join(", ");
}

export function ministerSizes(variant: PortraitVariant): string {
  return variant === "lead"
    ? "(max-width: 768px) min(73vw, 14.5rem), 16.5rem"
    : "(max-width: 768px) 112px, 128px";
}

/**
 * Miniatura 28×28 inline (LQIP) del retrato de pastores: se muestra borrosa
 * y cruza a la foto real al decodificar. La imprime
 * `scripts/optimize-ministros-images.mjs` al regenerar.
 */
export const MINISTER_LEAD_LQIP =
  "data:image/webp;base64,UklGRnIBAABXRUJQVlA4IGYBAADQBwCdASocACoAPu1srFEppaQipWzJMB2JZgC7AzCmAFUi3sGStsCR13Rw5RLq6CvGQV7HXJGYi9AsKkWXHdAJ8QgNkPPcAAD+9gmL1dlUWfv3QRjCaWwXz3CPlRXsVgMNId/JE1ylQm/UdNJmSZryY4X0dtBeTgaDeFbmfmPiLJkXD8alTwo3xuvVZsAuqmA+xu73BQIu5pZgdoMa/CsXYC2fxKgBFxAIW8yB3V0ZAku43f1IDptcfAdwXsek+iqvpyuXCKUDogyN56L1gtvfdfNwrT9ov/uRHsCv1QPKHoN4r3MrZqdQqrRUVAjPqgjgkSjs4DV0neUV/CNTt6VquTd1Dhz6dTjhAGfC51nDkJGhyS49RcWEaiuO95Eto9oJAL/gJc/9k/T9sGhjCMSuFMpS/Lh5itUd4oiPTy6psdMG6HU8i8J8n0nDo2IXDejz666AOv31pV5kFo1cqqrMbCkE6cAA";
