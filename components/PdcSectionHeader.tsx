import React from "react";
import type { LucideIcon } from "lucide-react";
import PdcSegmentBar from "./PdcSegmentBar";

/** Clases compartidas para títulos de página (referencia Bethel) */
export const pdcPageTitleClass =
  "font-serif text-[clamp(2.75rem,7vw,4.25rem)] font-medium leading-[1.05] tracking-tight text-[#faf8f4]";
export const pdcPageTitleLineClass = "block text-[#e8e4dc]";
export const pdcPageTitleAccentClass =
  "mt-2 block bg-gradient-to-r from-white via-[#eef6ff] to-secondary/90 bg-clip-text text-transparent";
export const pdcBlockTitleClass =
  "font-serif text-[clamp(1.65rem,3.5vw,2.5rem)] font-medium leading-[1.1] tracking-tight text-[#faf8f4]";

/** Solo offset superior (navbar): útil cuando el margen inferior es distinto al resto del sitio. */
export const pdcHeaderScrollMarginTop = "scroll-mt-28 sm:scroll-mt-32";
export const pdcHeaderScrollMargin = `${pdcHeaderScrollMarginTop} scroll-mb-20`;
/** Shell de página: sin padding superior (`App` compensa el navbar fijo). */
export const pdcPageSectionClass =
  "relative isolate w-full overflow-hidden bg-[#030508] pb-20 md:pb-28";

/** Bloque inicial de título (patrón Equipo ministerial). */
export const pdcPageIntroHeaderClass = "mb-8 scroll-mt-28 md:mb-10";

/** Contenedor de contenido alineado (escuelas, Bethel, hub área educativa) */
export const pdcPageInnerClass =
  "relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";

/**
 * Aire bajo navbar + eyebrow/título (páginas con shell y hero estilo marca).
 * Iglesia/Servicio usan también este valor sobre el `<header>` hero para unificar ritmo visual.
 */
export const pdcPageHeroTopComfort = "pt-10 md:pt-14 lg:pt-[3.75rem]";

/** `pdcPageInnerClass` + aire tipo hero Servicio/Iglesia bajo navbar. */
export const pdcPageInnerWithHeroComfort = `${pdcPageInnerClass} ${pdcPageHeroTopComfort}`;

const badgeBase =
  "inline-flex items-center gap-2 rounded-full border border-secondary/25 bg-secondary/10 font-sans font-semibold uppercase text-secondary/95";

type EyebrowProps = {
  label: string;
  icon: LucideIcon;
  compact?: boolean;
  className?: string;
};

export function PdcSectionEyebrow({ label, icon: Icon, compact = false, className = "" }: EyebrowProps) {
  return (
    <div
      className={`${badgeBase} ${
        compact
          ? "mb-3 px-3 py-1 text-[0.6rem] tracking-[0.2em]"
          : "mb-5 px-4 py-1.5 text-[0.65rem] tracking-[0.22em]"
      } ${className}`}
    >
      <Icon className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} aria-hidden />
      {label}
    </div>
  );
}

type PdcSectionHeaderProps = {
  eyebrow: string;
  eyebrowIcon: LucideIcon;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  subtitleSecondary?: string;
  headingId?: string;
  as?: "h1" | "h2";
  variant?: "page" | "block";
  align?: "center" | "left";
  className?: string;
  quote?: React.ReactNode;
  showSegmentBar?: boolean;
  segmentBarSize?: "sm" | "md" | "lg";
  /** Ancla para scroll FAB centrado en viewport */
  scrollFocus?: boolean;
  children?: React.ReactNode;
};

export function PdcSectionHeader({
  eyebrow,
  eyebrowIcon,
  title,
  titleAccent,
  subtitle,
  subtitleSecondary,
  headingId,
  as: HeadingTag = "h1",
  variant = "page",
  align = "center",
  className = "",
  quote,
  showSegmentBar = false,
  segmentBarSize = "md",
  scrollFocus = false,
  children,
}: PdcSectionHeaderProps) {
  const alignWrap = align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-left";
  const isBlock = variant === "block";
  const actionsMt = quote ? "mt-8" : subtitle || subtitleSecondary ? "mt-6" : "mt-8";

  return (
    <header className={`${alignWrap} ${className}`}>
      <PdcSectionEyebrow label={eyebrow} icon={eyebrowIcon} compact={isBlock} />
      <HeadingTag
        id={headingId}
        className={isBlock ? pdcBlockTitleClass : pdcPageTitleClass}
        {...(scrollFocus ? { "data-pdc-scroll-focus": true } : {})}
      >
        {isBlock ? (
          <>
            {title}
            {titleAccent ? (
              <span className="mt-1 block bg-gradient-to-r from-white via-[#f5f1ea] to-secondary/90 bg-clip-text text-transparent">
                {titleAccent}
              </span>
            ) : null}
          </>
        ) : titleAccent ? (
          <>
            <span className={pdcPageTitleLineClass}>{title}</span>
            <span className={pdcPageTitleAccentClass}>{titleAccent}</span>
          </>
        ) : (
          <span className={pdcPageTitleLineClass}>{title}</span>
        )}
      </HeadingTag>
      {subtitle ? (
        <p
          className={`mt-5 font-serif text-lg leading-relaxed text-white/88 md:text-xl ${
            align === "center" ? "mx-auto max-w-xl" : "max-w-xl"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
      {subtitleSecondary ? (
        <p
          className={`mt-3 font-sans text-sm font-medium leading-relaxed text-white/75 md:text-[0.95rem] ${
            align === "center" ? "mx-auto max-w-lg" : "max-w-lg"
          }`}
        >
          {subtitleSecondary}
        </p>
      ) : null}
      {quote ? <div className="mt-8">{quote}</div> : null}
      {showSegmentBar ? (
        <PdcSegmentBar size={segmentBarSize} className={align === "center" ? "mx-auto mt-5" : "mt-5"} />
      ) : null}
      {children ? (
        <div
          className={`${actionsMt} flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 ${
            align === "left" ? "sm:justify-start" : ""
          }`}
        >
          {children}
        </div>
      ) : null}
    </header>
  );
}

/** Cita destacada estilo Bethel */
export function PdcSectionQuote({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-white/[0.08] bg-black/35 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md sm:p-8">
      <p className="font-serif text-lg font-normal leading-snug text-[#d4cfc6] sm:text-xl sm:leading-relaxed">
        {children}
      </p>
    </div>
  );
}
