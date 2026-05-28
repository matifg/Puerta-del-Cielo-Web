/** Sección galería «Así se vive» — ancla FAB */
export const BETHEL_ENCOUNTER_SCROLL_ID = "bethel-encuentro-intro";

export type BethelTabId = "corazon" | "palabra" | "respuesta";

export const BETHEL_TAB_IMAGES: Record<
  BethelTabId,
  { alt: string; src: string; objectPosition?: string } | null
> = {
  corazon: null,
  palabra: null,
  respuesta: null,
};

export const BETHEL_SCENE_SCROLL_IDS = [BETHEL_ENCOUNTER_SCROLL_ID] as const;

export function isBethelSceneScrollId(id: string): boolean {
  return (BETHEL_SCENE_SCROLL_IDS as readonly string[]).includes(id);
}

/** Todas las anclas del FAB en /bethel — scroll centrado en viewport */
export function isBethelFabSectionId(id: string): boolean {
  return id.startsWith("bethel-");
}
