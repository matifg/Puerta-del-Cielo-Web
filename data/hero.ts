/** Rutas del hero (archivos en public/; no se generan desde el repo). */
export const HERO_VIDEO_MP4 = "/video/PuertaDelCieloHero.mp4";
export const HERO_VIDEO_WEBM = "/video/PuertaDelCieloHero.webm";
export const HERO_VIDEO_MOBILE_MP4 = "/video/PuertaDelCieloHero-mobile.mp4";
export const HERO_POSTER = "/images/hero-mobile.jpg";

/** Encuadre del clip (ajustar si el plano queda alto/bajo). */
export const HERO_VIDEO_OBJECT_POSITION = "center 42%";

/**
 * Velo sobre el video:
 * - `vivid`: más video visible (actual por defecto).
 * - `readable`: más contraste para el título en clips muy claros.
 */
export type HeroOverlayPreset = "vivid" | "readable";

export const HERO_OVERLAY_PRESET: HeroOverlayPreset = "vivid";

export type HeroOverlayTokens = {
  edgeClass: string;
  scrimOpacity: number;
  contentBackdrop: boolean;
  blobPrimaryClass: string;
  blobSecondaryClass: string;
};

export const heroOverlayPresets: Record<HeroOverlayPreset, HeroOverlayTokens> = {
  vivid: {
    edgeClass: "bg-gradient-to-b from-[#030508]/20 via-transparent to-[#030508]/28",
    scrimOpacity: 0.18,
    contentBackdrop: false,
    blobPrimaryClass: "bg-primary/8",
    blobSecondaryClass: "bg-secondary/6",
  },
  readable: {
    edgeClass: "bg-gradient-to-b from-[#030508]/32 via-transparent to-[#030508]/42",
    scrimOpacity: 0.26,
    contentBackdrop: true,
    blobPrimaryClass: "bg-primary/10",
    blobSecondaryClass: "bg-secondary/8",
  },
};
