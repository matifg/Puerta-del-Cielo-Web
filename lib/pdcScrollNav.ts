/** Offset bajo navbar fijo (~scroll-mt-28) al anclar secciones con el FAB */
export const PDC_SCROLL_NAV_OFFSET = 112;

/** Ancla del scroll spy alineada con `scrollToPdcSectionId` (mismo offset por defecto). */
export function getPdcScrollSectionAnchor(): number {
  return PDC_SCROLL_NAV_OFFSET;
}

/**
 * Índice de la sección activa según ancla bajo el navbar (scroll spy).
 * Evita saltar “Galería” en páginas con carrusel alto justo debajo del título.
 */
export function readPdcSectionIndex(
  sectionIds: readonly string[],
  footerRootId?: string
): number {
  const vh = window.innerHeight;

  if (footerRootId) {
    const footerEl = document.getElementById(footerRootId);
    if (footerEl) {
      const fr = footerEl.getBoundingClientRect();
      const footerVisible = Math.max(0, Math.min(fr.bottom, vh) - Math.max(fr.top, 0));
      if (footerVisible > vh * 0.12) return Math.max(0, sectionIds.length - 1);
    }
  }

  const anchor = getPdcNavHeight() + 24;
  let active = 0;
  for (let i = 0; i < sectionIds.length; i++) {
    const el = document.getElementById(sectionIds[i]);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= anchor) active = i;
  }
  return active;
}

export type PdcScrollAlign = "start" | "center" | "focus-start";

/** FAB con scroll centrado en viewport (inicio, Bethel, etc.) */
export function isPdcFabCenteredSectionId(id: string): boolean {
  if (id === "home-hero") return false;
  if (id === "bethel-encuentro-intro") return false;
  return id.startsWith("home-") || id.startsWith("bethel-");
}

const PDC_SCROLL_FOCUS_START_IDS = new Set([
  "disc-galeria",
  "danza-galeria",
  "iec-comunidad",
]);

export function getPdcFabScrollAlign(id: string): PdcScrollAlign {
  if (isPdcFabCenteredSectionId(id)) return "center";
  if (PDC_SCROLL_FOCUS_START_IDS.has(id)) return "focus-start";
  return "start";
}

export function getPdcNavHeight(): number {
  const nav = document.querySelector('nav[aria-label="Principal"]');
  if (nav) return Math.ceil(nav.getBoundingClientRect().height);
  return PDC_SCROLL_NAV_OFFSET;
}

/** true si el bloque aún no llegó al ancla bajo el navbar (zona superior de la página). */
export function isSectionBelowScrollAnchor(elementId: string, extraPx = 32): boolean {
  const el = document.getElementById(elementId);
  if (!el) return true;
  return el.getBoundingClientRect().top > getPdcNavHeight() + extraPx;
}

function getPdcScrollFocusEl(sectionEl: HTMLElement): HTMLElement {
  return sectionEl.querySelector<HTMLElement>("[data-pdc-scroll-focus]") ?? sectionEl;
}

function clampScrollTop(top: number): number {
  const maxTop = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  return Math.min(Math.max(0, top), maxTop);
}

export function scrollToPdcSectionId(
  id: string,
  options?: { behavior?: ScrollBehavior; offset?: number; align?: PdcScrollAlign }
): void {
  const el = document.getElementById(id);
  if (!el) return;
  const behavior = options?.behavior ?? "smooth";
  const offset = options?.offset ?? PDC_SCROLL_NAV_OFFSET;
  const align =
    options?.align ?? (PDC_SCROLL_FOCUS_START_IDS.has(id) ? "focus-start" : undefined);

  if (align === "focus-start") {
    const focus = getPdcScrollFocusEl(el);
    const navOffset = getPdcNavHeight() + 20;
    const rect = focus.getBoundingClientRect();
    const top = clampScrollTop(rect.top + window.scrollY - navOffset);
    window.scrollTo({ top, behavior });
    return;
  }

  if (align === "center") {
    const focus = getPdcScrollFocusEl(el);
    const navH = getPdcNavHeight();
    const pad = 20;
    const prevTop = focus.style.scrollMarginTop;
    const prevBottom = focus.style.scrollMarginBottom;

    focus.style.scrollMarginTop = `${navH + pad}px`;
    focus.style.scrollMarginBottom = `${pad}px`;
    focus.scrollIntoView({ behavior, block: "center", inline: "nearest" });

    window.setTimeout(() => {
      focus.style.scrollMarginTop = prevTop;
      focus.style.scrollMarginBottom = prevBottom;
    }, behavior === "smooth" ? 700 : 0);
    return;
  }

  const rect = el.getBoundingClientRect();
  const top = clampScrollTop(rect.top + window.scrollY - offset);
  window.scrollTo({ top, behavior });
}
