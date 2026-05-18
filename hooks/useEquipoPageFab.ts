import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getPdcNavHeight, scrollToPdcSectionId } from "../lib/pdcScrollNav";
import { PDC_FAB_INSET, PDC_FAB_INSET_NEAR_FOOTER } from "./usePdcSectionFab";

const EQUIPO_FAB_TARGETS = ["equipo-pastores", "equipo-grid"] as const;
const EQUIPO_FAB_START_ID = "equipo-heading";

const EQUIPO_FAB_LABELS: Record<(typeof EQUIPO_FAB_TARGETS)[number], string> = {
  "equipo-pastores": "Pastores",
  "equipo-grid": "El equipo",
};

/**
 * -1 = intro (título visible): CTA «Pastores»
 *  0 = bloque pastores: CTA «El equipo»
 *  1 = grilla o footer: CTA «Subir»
 */
export function readEquipoFabStepIndex(footerRootId: string): number {
  const vh = window.innerHeight;

  if (footerRootId) {
    const footerEl = document.getElementById(footerRootId);
    if (footerEl) {
      const fr = footerEl.getBoundingClientRect();
      const footerVisible = Math.max(0, Math.min(fr.bottom, vh) - Math.max(fr.top, 0));
      if (footerVisible > vh * 0.12) return 1;
    }
  }

  const anchor = getPdcNavHeight() + 24;
  const grid = document.getElementById("equipo-grid");
  if (grid && grid.getBoundingClientRect().top <= anchor) return 1;

  const heading = document.getElementById("equipo-heading");
  const introPassed = !heading || heading.getBoundingClientRect().bottom < anchor + 8;
  if (introPassed) return 0;

  return -1;
}

const FAB_SCROLL_REMEASURE_MS = 750;

export function useEquipoPageFab(footerRootId: string) {
  const reduceMotion = useReducedMotion() ?? false;
  const [stepIdx, setStepIdx] = useState(-1);

  const measure = useCallback(
    () => setStepIdx(readEquipoFabStepIndex(footerRootId)),
    [footerRootId]
  );

  useEffect(() => {
    measure();
    const t = window.setTimeout(measure, 320);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const scrollToId = useCallback(
    (id: string) => {
      scrollToPdcSectionId(id, { behavior: reduceMotion ? "auto" : "smooth" });
      measure();
      if (reduceMotion) {
        requestAnimationFrame(() => requestAnimationFrame(measure));
      } else {
        window.setTimeout(measure, FAB_SCROLL_REMEASURE_MS);
      }
    },
    [reduceMotion, measure]
  );

  const fabIsLast = stepIdx >= 1;
  const nextTargetId =
    stepIdx < 0
      ? EQUIPO_FAB_TARGETS[0]
      : stepIdx < EQUIPO_FAB_TARGETS.length - 1
        ? EQUIPO_FAB_TARGETS[stepIdx + 1]
        : undefined;

  const fabPrimaryLine = fabIsLast
    ? "Subir"
    : nextTargetId
      ? EQUIPO_FAB_LABELS[nextTargetId]
      : "Siguiente";

  const onFabClick = useCallback(() => {
    if (fabIsLast) {
      scrollToId(EQUIPO_FAB_START_ID);
      return;
    }
    if (stepIdx < 0) {
      scrollToId(EQUIPO_FAB_TARGETS[0]);
      return;
    }
    const next = EQUIPO_FAB_TARGETS[stepIdx + 1];
    if (next) scrollToId(next);
  }, [fabIsLast, scrollToId, stepIdx]);

  return {
    stepIdx,
    fabIsLast,
    fabEyebrow: fabIsLast ? "Inicio" : "Explorar",
    fabPrimaryLine,
    fabSrLabel: fabIsLast ? "Subir al inicio de la página" : `Ir a ${fabPrimaryLine}`,
    onFabClick,
    fabInsetClass: fabIsLast ? PDC_FAB_INSET_NEAR_FOOTER : PDC_FAB_INSET,
    titleKey: `${stepIdx}-${fabPrimaryLine}`,
  };
}
