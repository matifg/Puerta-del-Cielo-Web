/** Rutas del hero — archivos en public/assets/ (ver public/assets/README.md). */
export const HERO_VIDEO_MP4 = "/assets/hero.mp4";
/** Segunda source para Chrome; solo si existe public/assets/hero.webm */
export const HERO_VIDEO_WEBM = "/assets/hero.webm";
export const HERO_HAS_WEBM = false;

/** Solo Open Graph / redes — el hero en pantalla usa solo el MP4. */
export const HERO_POSTER = "/assets/hero-poster.jpg";

/** @deprecated Usar HERO_POSTER — compat OG / enlaces viejos */
export const HERO_POSTER_LEGACY = "/images/hero-mobile.jpg";

/** Encuadre del clip (ajustar si el plano queda alto/bajo). */
export const HERO_VIDEO_OBJECT_POSITION = "center 42%";

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
