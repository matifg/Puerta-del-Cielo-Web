import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { isPdcFabCenteredSectionId } from "../lib/pdcScrollNav";
import { readPdcSectionIndex, scrollToPdcSectionId } from "../lib/pdcScrollNav";
import { PdcScrollFabButton } from "./PdcScrollFabButton";

export type FloatingScrollNavSection = {
  id: string;
  /** Texto principal del CTA al ir hacia esta sección */
  title: string;
  /** Línea secundaria (opcional, solo para aria / futuro) */
  subtitle?: string;
};

export type FloatingScrollButtonProps = {
  /** Secciones en orden de scroll (de arriba hacia abajo) */
  sections: FloatingScrollNavSection[];
  /** Id del marcador colocado justo antes del footer */
  endMarkerId: string;
  /**
   * Id del elemento que envuelve el footer (solo contenedor en la página).
   * Se usa para detectar proximidad y ocultar el FAB antes de que el footer ocupe la vista.
   */
  footerProximityRootId?: string;
  /** Offset visual respecto al borde (p. ej. para no tapar WhatsApp) */
  offsetClassName?: string;
};

const IO_THRESHOLDS = [0, 0.05, 0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.65, 0.8, 1];
const FOOTER_PROXIMITY_ROOT_MARGIN = "0px 0px 36% 0px";

/** Eyebrow fijo en UI: solo estos dos textos (nunca el título de sección). */
const EYEBROW_SCROLL_DOWN = "Explorar";
const EYEBROW_SCROLL_UP = "Inicio";

function ratioToHideBlend(ratio: number, isIntersecting: boolean): number {
  if (!isIntersecting || ratio <= 0.001) return 0;
  return Math.min(1, Math.max(0, (ratio - 0.04) / 0.42));
}

function useActiveSectionIndex(
  sectionIds: readonly string[],
  footerProximityRootId: string | undefined,
  endMarkerId: string
): number {
  const [activeIdx, setActiveIdx] = useState(0);

  const measure = useCallback(() => {
    const footerNear = footerProximityRootId
      ? (() => {
          const footerEl = document.getElementById(footerProximityRootId);
          if (!footerEl) return false;
          const vh = window.innerHeight;
          const fr = footerEl.getBoundingClientRect();
          const footerVisible = Math.max(0, Math.min(fr.bottom, vh) - Math.max(fr.top, 0));
          return footerVisible > vh * 0.12;
        })()
      : false;

    if (footerNear) {
      setActiveIdx((prev) => (prev === sectionIds.length ? prev : sectionIds.length));
      return;
    }

    const endEl = document.getElementById(endMarkerId);
    if (endEl) {
      const vh = window.innerHeight;
      const er = endEl.getBoundingClientRect();
      if (er.top < vh * 0.55) {
        setActiveIdx((prev) => (prev === sectionIds.length ? prev : sectionIds.length));
        return;
      }
    }

    const idx = readPdcSectionIndex(sectionIds, footerProximityRootId);
    setActiveIdx((prev) => (prev === idx ? prev : idx));
  }, [sectionIds, footerProximityRootId, endMarkerId]);

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

/**
 * FAB de navegación por secciones (Home) y “Subir” al inicio.
 */
export const FloatingScrollButton: React.FC<FloatingScrollButtonProps> = ({
  sections,
  endMarkerId,
  footerProximityRootId,
  offsetClassName = "bottom-24 right-4 sm:bottom-28 sm:right-6 lg:right-[max(1.5rem,env(safe-area-inset-right,0px))]",
}) => {
  const [footerHideBlend, setFooterHideBlend] = useState(0);
  const reduceMotion = useReducedMotion() ?? false;
  const pendingIdxRef = useRef<number | null>(null);

  const sectionIds = useMemo(() => sections.map((s) => s.id), [sections]);
  const activeIdx = useActiveSectionIndex(sectionIds, footerProximityRootId, endMarkerId);

  const currentIdx = pendingIdxRef.current ?? activeIdx;
  const lastSectionIdx = sections.length - 1;
  const atEndMarker = currentIdx >= sections.length;
  const fabPinToTop = atEndMarker;

  const navTargetIndex =
    currentIdx < lastSectionIdx ? currentIdx + 1 : lastSectionIdx;

  useEffect(() => {
    if (pendingIdxRef.current === null) return;
    if (pendingIdxRef.current === activeIdx) {
      pendingIdxRef.current = null;
      return;
    }
    if (pendingIdxRef.current === sections.length && activeIdx >= lastSectionIdx) {
      pendingIdxRef.current = null;
    }
    const t = window.setTimeout(() => {
      pendingIdxRef.current = null;
    }, 1400);
    return () => window.clearTimeout(t);
  }, [activeIdx, lastSectionIdx, sections.length]);

  useEffect(() => {
    if (!footerProximityRootId) {
      setFooterHideBlend(0);
      return;
    }

    const footerRoot = document.getElementById(footerProximityRootId);
    if (!footerRoot) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const blend = ratioToHideBlend(entry.intersectionRatio, entry.isIntersecting);
        setFooterHideBlend((prev) => (Math.abs(prev - blend) < 0.004 ? prev : blend));
      },
      {
        threshold: IO_THRESHOLDS,
        root: null,
        rootMargin: FOOTER_PROXIMITY_ROOT_MARGIN,
      }
    );

    io.observe(footerRoot);
    return () => io.disconnect();
  }, [footerProximityRootId]);

  const scrollBehavior = reduceMotion ? "auto" : "smooth";

  const handleClick = () => {
    if (footerHideBlend > 0.85 && !fabPinToTop) return;

    if (fabPinToTop) {
      pendingIdxRef.current = 0;
      window.scrollTo({ top: 0, behavior: scrollBehavior });
      return;
    }

    if (currentIdx >= lastSectionIdx) {
      pendingIdxRef.current = sections.length;
      scrollToPdcSectionId(endMarkerId, { behavior: scrollBehavior });
      return;
    }

    const nextIdx = currentIdx + 1;
    const target = sections[nextIdx];
    if (!target) return;
    pendingIdxRef.current = nextIdx;
    scrollToPdcSectionId(target.id, {
      behavior: scrollBehavior,
      align: isPdcFabCenteredSectionId(target.id) ? "center" : "start",
    });
  };

  const eyebrow = fabPinToTop ? EYEBROW_SCROLL_UP : EYEBROW_SCROLL_DOWN;

  const primaryLine = fabPinToTop
    ? "Subir"
    : currentIdx >= lastSectionIdx
      ? "Contacto y horarios"
      : (sections[navTargetIndex]?.title ?? "Seguir");

  const aria = fabPinToTop
    ? "Subir al inicio de la página"
    : currentIdx >= lastSectionIdx
      ? "Ir a contacto y horarios en el pie de página"
      : (() => {
          const t = sections[navTargetIndex];
          const hint = t?.subtitle ? ` — ${t.subtitle}` : "";
          return `Ir a ${t?.title ?? "la siguiente sección"}${hint}`;
        })();

  const fabHidden = fabPinToTop ? false : footerHideBlend >= 0.995;
  const fabOpacity = fabPinToTop ? 1 : 1 - footerHideBlend * 0.98;
  const fabTranslateY = fabPinToTop ? 0 : footerHideBlend * 14;
  const blockPointer = fabPinToTop ? false : footerHideBlend > 0.42;

  const titleKey = `${fabPinToTop ? "top" : "down"}-${navTargetIndex}-${currentIdx}`;

  return (
    <motion.div
      className={`pointer-events-none fixed z-[9980] flex flex-col items-end transition-[opacity,transform,visibility] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${offsetClassName}`}
      style={{
        opacity: fabOpacity,
        transform: `translateY(${fabTranslateY}px)`,
        visibility: fabHidden ? "hidden" : "visible",
      }}
      aria-live="polite"
      aria-hidden={fabHidden}
    >
      <PdcScrollFabButton
        onClick={handleClick}
        eyebrow={eyebrow}
        primaryLine={primaryLine}
        pinToTop={fabPinToTop}
        ariaLabel={aria}
        titleKey={titleKey}
        className={blockPointer ? "pointer-events-none" : "pointer-events-auto"}
      />
    </motion.div>
  );
};
