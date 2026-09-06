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
  "data:image/webp;base64,UklGRnABAABXRUJQVlA4IGQBAADQBwCdASocACoAPu1srVEppaQipWzJMB2JZgDA4PeP4EsN7t3BXxvCnsXe3X9LYOR3SqlKmJqDAfaksYR7IPWjJZO+xedlAAD+9gnCKGaAe782hpaqc2fzpaMl9D3AjDWgxdQ4bql9ysKv2ZZvYOizOrNs3T1/8gfxgWWtbS1nL+qcRjCdq/VEkizYD0uJms2+/9MLEL+MssI/eh4grTIFkcVWgHQT1lc+QOxZqorMh7DvLnty37AFaDojDP4h/bmS57C5kE/xiAxiaIYT6vk4Gh+3QFdnlXFBzYMgIWmXvjPlltzbHwsvZWKJvMi5GnZF6RTTKcwGlbqlykBmsVYUmbkNBOZa13im2CjUgur8jW8M5YKz9I43b8UhGYzRervMfodocRBu3PsGjT/7wH0hB8wiS1OZmaL7YBt/bg3aL9Hmrw9YzMLyYL+9HeZKiHheAdJ4n+m+qlyQEEnC1gUoXegAAA==";
