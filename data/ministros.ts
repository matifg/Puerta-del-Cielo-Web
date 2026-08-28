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
    ? "(max-width: 768px) min(78vw, 19rem), 22rem"
    : "(max-width: 768px) 144px, 160px";
}

/**
 * Miniatura 28×28 inline (LQIP) del retrato de pastores: se muestra borrosa
 * y cruza a la foto real al decodificar. La imprime
 * `scripts/optimize-ministros-images.mjs` al regenerar.
 */
export const MINISTER_LEAD_LQIP =
  "data:image/webp;base64,UklGRvoAAABXRUJQVlA4IO4AAADQBQCdASocABwAPuFgqU2opiQiMAwBEBwJZgC7M2QzHccsbr31zrNkr0fTd6zlTxFKTLPv+7TAAP7TF+xMzA8thMZRoYR9UGOqAVVl5pCUNHEfTcbFOb/KhbkOnqfIxo/GQ33mIb3PPR5uvKrIfdaFzYnWMB0XpFQS7rHI5ZMElaT/2EQyNl1UXq/10L+8BgCTV7csZYBUbzBoPctFT1C9eerWYRUmUjhoQ9w15IM3661B8aHqTvILWcaqNKpe3q0u0Yw+IqzKSUATYArT4BffZGbSFa/ycGfLFszJR28gAe2TmYHc+IYOzvzBAAAA";
