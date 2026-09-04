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
    ? "(max-width: 768px) min(68vw, 13.5rem), 15.5rem"
    : "(max-width: 768px) 112px, 128px";
}

/**
 * Miniatura 28×28 inline (LQIP) del retrato de pastores: se muestra borrosa
 * y cruza a la foto real al decodificar. La imprime
 * `scripts/optimize-ministros-images.mjs` al regenerar.
 */
export const MINISTER_LEAD_LQIP =
  "data:image/webp;base64,UklGRjgBAABXRUJQVlA4ICwBAABQCACdASocACoAPu1kq1CppSOiqrgMATAdiWYAx1Fk9QDTSNEGK5Gwp6jDJrT4H+Ir3NN+nx3FVduPdaKYJjahuYhRQwG6gQP5ZQAA/vpfriK8z8lpoIE5szYOa4yQ1KCmozSpMCL1O1oJMZfa4o8xvfAL2L8f24TxrFxexFionlsusLuTpaX+4ABLIruZ45FRhdAljBCY+C6gsqjlEWVNMrb5754ChZ9Zds4Hj5LCtVilwhyKVvFaaUPdapj+m/X/V9NGk0LQkVoWMmZ4RIy3XgIymJdP5a5mQdQDO5GpBlTc0u/z+TdBER+koAGtoSEjH/T/b3ycli/pMvynVJxp08dK2unIuixQvGIUrcdIN1swBqIJ4BT2l4oMKjiuyi+/9fVBqz8q2v4AAAA=";
