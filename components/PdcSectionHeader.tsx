import React from "react";
import type { LucideIcon } from "lucide-react";
import PdcSegmentBar from "./PdcSegmentBar";

/** Clases compartidas para títulos de página (referencia Bethel) */
export const pdcPageTitleClass =
  "font-serif text-[clamp(2rem,5.5vw,3.25rem)] font-medium leading-[1.08] tracking-tight text-[#faf8f4]";
export const pdcPageTitleLineClass = "block text-[#e8e4dc]";
export const pdcPageTitleAccentClass =
  "mt-1.5 block bg-gradient-to-r from-white via-[#eef6ff] to-secondary/90 bg-clip-text text-transparent";
export const pdcBlockTitleClass =
  "font-serif text-[clamp(1.35rem,3vw,2rem)] font-medium leading-[1.12] tracking-tight text-[#faf8f4]";

/** Tipografía compacta para secciones educativas y cards */
export const pdcSectionH2Class = "font-serif text-xl font-medium text-[#faf8f4] md:text-2xl";
export const pdcSectionH3Class = "font-serif text-lg font-medium text-[#faf8f4] md:text-xl";
export const pdcCardTitleClass = "font-serif text-xl text-[#faf8f4]";
export const pdcCardStatClass = "font-serif text-xl text-[#faf8f4] md:text-2xl";
export const pdcBodyLeadClass = "font-sans text-sm font-medium leading-relaxed text-white/90 md:text-[0.95rem]";
export const pdcQuoteClass =
  "font-serif text-base font-normal leading-snug text-[#ebe7df] md:text-lg md:leading-snug";
export const pdcAccordionTitleClass = "font-serif text-base text-[#ebe8e2] md:text-lg";
export const pdcGlassCardPadding = "p-5 md:p-8";

/** Galerías — notebook (1024–1535px): grilla 3×2 compacta que cabe en viewport */
export const pdcNotebookGallerySectionClass =
  "notebook:mx-auto notebook:mt-4 notebook:max-w-4xl desktop:mt-8";
export const pdcNotebookGalleryInnerClass = "";
export const pdcNotebookGalleryPageInnerClass = "";
export const pdcNotebookGalleryGridClass =
  "notebook:mx-auto notebook:max-w-3xl notebook:grid-cols-3 notebook:grid-rows-2 notebook:h-[min(34vh,260px)] notebook:items-stretch notebook:gap-2";
export const pdcNotebookGalleryTileClass = "notebook:h-full notebook:min-h-0";
export const pdcNotebookGalleryMediaClass =
  "aspect-[4/3] notebook:aspect-[unset] notebook:h-full notebook:min-h-0";
export const pdcNotebookGalleryHintClass = "notebook:mb-2 notebook:text-xs";
export const pdcNotebookGalleryCaptionClass = "notebook:hidden desktop:block";

/** Solo offset superior (navbar): útil cuando el margen inferior es distinto al resto del sitio. */
export const pdcHeaderScrollMarginTop = "scroll-mt-28 sm:scroll-mt-32";
export const pdcHeaderScrollMargin = `${pdcHeaderScrollMarginTop} scroll-mb-20`;
/** Shell de página: sin padding superior (`App` compensa el navbar fijo). */
export const pdcPageSectionClass =
  "relative isolate w-full overflow-hidden bg-[#030508] pb-20 md:pb-28";

/** Bloque inicial de título (patrón Equipo ministerial). */
export const pdcPageIntroHeaderClass = "mb-6 scroll-mt-28 md:mb-8";

/** Contenedor de contenido alineado (escuelas, Bethel, hub área educativa) */
export const pdcPageInnerClass =
  "relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";

/**
 * Aire bajo navbar + eyebrow/título (páginas con shell y hero estilo marca).
 * Iglesia/Servicio usan también este valor sobre el `<header>` hero para unificar ritmo visual.
 */
export const pdcPageHeroTopComfort = "pt-8 md:pt-10 lg:pt-12";

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
          ? "mb-2.5 px-3 py-1 text-[0.6rem] tracking-[0.2em]"
          : "mb-4 px-4 py-1.5 text-[0.65rem] tracking-[0.22em]"
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
  const actionsMt = quote ? "mt-6" : subtitle || subtitleSecondary ? "mt-5" : "mt-6";

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
          className={`mt-4 font-serif text-base leading-relaxed text-white/88 md:text-lg ${
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
        <PdcSegmentBar size={segmentBarSize} className={align === "center" ? "mx-auto mt-4" : "mt-4"} />
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
    <div className="mx-auto max-w-2xl rounded-3xl border border-white/[0.08] bg-black/35 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md sm:p-6">
      <p className="font-serif text-base font-normal leading-snug text-[#d4cfc6] sm:text-lg sm:leading-relaxed">
        {children}
      </p>
    </div>
  );
}
