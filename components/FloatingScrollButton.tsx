import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type FloatingScrollNavSection = {
  id: string;
  /** Texto principal del CTA al ir hacia esta sección */
  title: string;
  /** Línea secundaria (opcional) */
  subtitle?: string;
};

export type FloatingScrollButtonProps = {
  /** Secciones en orden de scroll (de arriba hacia abajo) */
  sections: FloatingScrollNavSection[];
  /** Id del marcador colocado justo antes del footer */
  endMarkerId: string;
  /**
   * Id del elemento que envuelve el footer (solo contenedor en la página).
   * Se usa con IntersectionObserver + rootMargin para detectar proximidad y ocultar el FAB antes de que el footer ocupe la vista.
   */
  footerProximityRootId?: string;
  /** Offset visual respecto al borde (p. ej. para no tapar WhatsApp) */
  offsetClassName?: string;
};

type NavMode = "toSection" | "top";

type InternalState = {
  mode: NavMode;
  /** Índice en `sections` del próximo destino si mode === "toSection" */
  targetIndex: number;
};

const IO_THRESHOLDS = [0, 0.05, 0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.65, 0.8, 1];
/** Banda central del viewport: qué bloque “manda” la intención de navegación */
const CENTER_ROOT_MARGIN = "-42% 0px -42% 0px";
/**
 * Amplía el root hacia abajo: el footer “entra” en intersección antes de verse en pantalla,
 * así el FAB puede hacer fade out sin superponerse al footer.
 */
const FOOTER_PROXIMITY_ROOT_MARGIN = "0px 0px 36% 0px";

function pickCenterId(
  ratios: Record<string, number>,
  ids: string[]
): string | null {
  let best: string | null = null;
  let bestR = 0;
  for (const id of ids) {
    const r = ratios[id] ?? 0;
    if (r > bestR) {
      bestR = r;
      best = id;
    }
  }
  return bestR > 0.02 ? best : null;
}

function resolveNavState(
  centerId: string | null,
  sections: FloatingScrollNavSection[],
  endMarkerId: string
): InternalState {
  if (centerId === endMarkerId) {
    return { mode: "top", targetIndex: 0 };
  }

  const lastIdx = sections.length - 1;
  const idx = centerId ? sections.findIndex((s) => s.id === centerId) : -1;

  if (idx === -1) {
    return { mode: "toSection", targetIndex: 0 };
  }

  if (idx < lastIdx) {
    return { mode: "toSection", targetIndex: idx + 1 };
  }

  return { mode: "top", targetIndex: 0 };
}

/** Convierte intersectionRatio (con root expandido) en 0 = visible, 1 = totalmente oculto */
function ratioToHideBlend(ratio: number, isIntersecting: boolean): number {
  if (!isIntersecting || ratio <= 0.001) return 0;
  return Math.min(1, Math.max(0, (ratio - 0.04) / 0.42));
}

/**
 * FAB de navegación por secciones (ids + IntersectionObserver) y “Volver arriba”.
 * Opcionalmente se desvanece antes del footer observando `footerProximityRootId`.
 */
export const FloatingScrollButton: React.FC<FloatingScrollButtonProps> = ({
  sections,
  endMarkerId,
  footerProximityRootId,
  offsetClassName = "bottom-24 right-4 sm:bottom-28 sm:right-6",
}) => {
  const ratiosRef = useRef<Record<string, number>>({});
  const [centerId, setCenterId] = useState<string | null>(null);
  /** 0 = FAB totalmente visible; 1 = totalmente oculto (fade + leve bajada) */
  const [footerHideBlend, setFooterHideBlend] = useState(0);

  const observedIds = useMemo(
    () => [...sections.map((s) => s.id), endMarkerId],
    [sections, endMarkerId]
  );

  const flushRatios = useCallback(() => {
    const next = pickCenterId(ratiosRef.current, observedIds);
    setCenterId((prev) => (prev === next ? prev : next));
  }, [observedIds]);

  useEffect(() => {
    const elements = observedIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    elements.forEach((el) => {
      ratiosRef.current[el.id] = ratiosRef.current[el.id] ?? 0;
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          ratiosRef.current[id] = entry.intersectionRatio;
        }
        flushRatios();
      },
      {
        threshold: IO_THRESHOLDS,
        root: null,
        rootMargin: CENTER_ROOT_MARGIN,
      }
    );

    elements.forEach((el) => io.observe(el));

    requestAnimationFrame(() => flushRatios());

    const onResize = () => flushRatios();
    window.addEventListener("resize", onResize);

    return () => {
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [observedIds, flushRatios]);

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
        const blend = ratioToHideBlend(
          entry.intersectionRatio,
          entry.isIntersecting
        );
        setFooterHideBlend((prev) =>
          Math.abs(prev - blend) < 0.004 ? prev : blend
        );
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

  const nav = useMemo(
    () => resolveNavState(centerId, sections, endMarkerId),
    [centerId, sections, endMarkerId]
  );

  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleClick = () => {
    if (footerHideBlend > 0.85) return;
    if (nav.mode === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = sections[nav.targetIndex];
    if (target) scrollToId(target.id);
  };

  const primaryLine =
    nav.mode === "top"
      ? "Volver arriba"
      : sections[nav.targetIndex]?.title ?? "Seguir";

  const secondaryLine =
    nav.mode === "top"
      ? "Inicio"
      : sections[nav.targetIndex]?.subtitle ?? "Continuar";

  const aria =
    nav.mode === "top"
      ? "Volver arriba al inicio de la página"
      : `Ir a ${primaryLine}`;

  const fabHidden = footerHideBlend >= 0.995;
  const fabOpacity = 1 - footerHideBlend * 0.98;
  const fabTranslateY = footerHideBlend * 14;
  const floatOn = footerHideBlend < 0.12;
  const strongSurface = nav.mode === "top" && footerHideBlend < 0.25;
  const blockPointer = footerHideBlend > 0.42;

  const navKey = `${nav.mode}-${nav.targetIndex}`;

  return (
    <>
      <style>{`
        @keyframes pdc-fab-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .pdc-fab-float {
          animation: pdc-fab-float 3.2s ease-in-out infinite;
        }
        @keyframes pdc-fab-label-in {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .pdc-fab-label-in {
          animation: pdc-fab-label-in 0.38s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .pdc-fab-float { animation: none; }
          .pdc-fab-label-in { animation: none; }
        }
      `}</style>

      <div
        className={`pointer-events-none fixed z-[9980] flex max-w-[min(13.75rem,calc(100vw-5.25rem))] flex-col items-end transition-[opacity,transform,visibility] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${offsetClassName}`}
        style={{
          opacity: fabOpacity,
          transform: `translateY(${fabTranslateY}px)`,
          visibility: fabHidden ? "hidden" : "visible",
        }}
        aria-live="polite"
        aria-hidden={fabHidden}
      >
        <button
          type="button"
          onClick={handleClick}
          tabIndex={fabHidden || blockPointer ? -1 : 0}
          className={`group relative flex w-full flex-col items-stretch gap-1.5 overflow-hidden rounded-[1.35rem] border px-3 py-2.5 text-left shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-[box-shadow,border-color,background-color] duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary sm:rounded-[1.5rem] sm:px-3.5 sm:py-3 ${
            floatOn ? "pdc-fab-float" : ""
          } ${blockPointer ? "pointer-events-none" : "pointer-events-auto"} ${
            strongSurface
              ? "border-white/22 bg-gradient-to-br from-zinc-900/90 to-zinc-950/92 hover:border-secondary/35 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
              : "border-white/14 bg-gradient-to-br from-white/[0.14] to-white/[0.05] hover:border-secondary/40 hover:from-white/[0.18] hover:to-white/[0.08] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
          }`}
          aria-label={aria}
        >
          <span
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-secondary/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
            aria-hidden
          />

          <div key={navKey} className="pdc-fab-label-in relative flex flex-col gap-1">
            <span className="flex items-center justify-between gap-2">
              <span className="font-sans text-[0.5625rem] font-semibold uppercase tracking-[0.18em] text-secondary/95">
                {nav.mode === "top" ? "Navegación" : "Siguiente"}
              </span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[0.65rem] bg-white/[0.08] ring-1 ring-white/10 transition duration-300 group-hover:bg-white/[0.12]">
                {nav.mode === "top" ? (
                  <svg
                    className="h-4 w-4 shrink-0 text-secondary transition-transform duration-300 group-hover:-translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4 shrink-0 text-secondary transition-transform duration-300 group-hover:translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </span>
            </span>
            <span className="font-serif text-[0.8125rem] font-medium leading-snug tracking-wide text-[#f7f4ee] sm:text-[0.875rem]">
              {primaryLine}
            </span>
            <span className="font-sans text-[0.625rem] font-normal leading-snug text-white/55 sm:text-[0.6875rem]">
              {secondaryLine}
            </span>
          </div>
        </button>
      </div>
    </>
  );
};
