import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { readPdcSectionIndex, scrollToPdcSectionId } from "../lib/pdcScrollNav";

function useSectionIndex(sectionIds: readonly string[], footerRootId: string): number {
  const [activeIdx, setActiveIdx] = useState(0);
  const measure = useCallback(
    () => setActiveIdx(readPdcSectionIndex(sectionIds, footerRootId)),
    [sectionIds, footerRootId]
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

  return activeIdx;
}

function useNearFooter(footerRootId: string): boolean {
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const observe = () => {
      const el = document.getElementById(footerRootId);
      if (!el) {
        setNearFooter(false);
        return;
      }
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
      setNearFooter(visible > vh * 0.12);
    };
    observe();
    const t = window.setTimeout(observe, 400);
    window.addEventListener("scroll", observe, { passive: true });
    window.addEventListener("resize", observe);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", observe);
      window.removeEventListener("resize", observe);
    };
  }, [footerRootId]);

  return nearFooter;
}

export const PDC_FAB_INSET =
  "bottom-24 right-4 sm:bottom-28 sm:right-6 lg:right-[max(1.5rem,env(safe-area-inset-right,0px))]";

export const PDC_FAB_INSET_NEAR_FOOTER =
  "bottom-[7.25rem] right-4 sm:bottom-[7.5rem] sm:right-5 lg:bottom-[7.75rem] lg:right-[max(1.5rem,env(safe-area-inset-right,0px))]";

export function usePdcSectionFab(
  sectionIds: readonly string[],
  footerRootId: string,
  nextLabels: Record<string, string>
) {
  const reduceMotion = useReducedMotion() ?? false;
  const activeIdx = useSectionIndex(sectionIds, footerRootId);
  const nearFooter = useNearFooter(footerRootId);

  const scrollToId = useCallback(
    (id: string) => {
      scrollToPdcSectionId(id, {
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [reduceMotion]
  );

  const scrollToStart = useCallback(() => {
    scrollToId(sectionIds[0]);
  }, [scrollToId, sectionIds]);

  const onFabClick = useCallback(() => {
    const current = readPdcSectionIndex(sectionIds, footerRootId);
    const atEnd = current >= sectionIds.length - 1 || nearFooter;
    if (atEnd) {
      scrollToStart();
      return;
    }
    const nextId = sectionIds[current + 1];
    if (nextId) scrollToId(nextId);
  }, [sectionIds, footerRootId, nearFooter, scrollToStart, scrollToId]);

  const fabIsLast = activeIdx >= sectionIds.length - 1 || nearFooter;
  const nextId = sectionIds[activeIdx + 1];
  const fabEyebrow = fabIsLast ? "Inicio" : "Explorar";
  const fabPrimaryLine = fabIsLast ? "Subir" : nextId ? (nextLabels[nextId] ?? "Siguiente") : "Siguiente";
  const fabSrLabel = fabIsLast
    ? "Subir al inicio de la página"
    : `Ir a ${fabPrimaryLine}`;

  return {
    activeIdx,
    nearFooter,
    fabIsLast,
    fabEyebrow,
    fabPrimaryLine,
    fabSrLabel,
    onFabClick,
    hideAtStart: activeIdx === 0,
  };
}
