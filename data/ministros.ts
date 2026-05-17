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
const LEAD_WIDTHS = [384, 768, 1200] as const;

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
    ? "(max-width: 768px) 320px, 384px"
    : "(max-width: 768px) 144px, 160px";
}
