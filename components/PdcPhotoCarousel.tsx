import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { EditorialPhoto } from "../data/sitePhotos";
import { editorialSizes, editorialSrc, editorialSrcSet } from "../data/sitePhotos";
import { usePrefersSaveData } from "../hooks/usePrefersSaveData";

/** Imagen por URL o clip en bucle (p. ej. galería Danza y Artes). */
export type PdcCarouselSlide = {
  id: string;
  alt: string;
  /** Imagen estática */
  src?: string;
  objectPosition?: string;
  caption?: string;
  /** Logos o gráficos: encuadre completo */
  objectFit?: "cover" | "contain";
  /** Clip tipo GIF: sin avance automático del carrusel en esta diapositiva */
  video?: {
    mp4: string;
    poster: string;
    objectPosition?: string;
  };
};

type PdcPhotoCarouselProps = {
  photos?: EditorialPhoto[];
  slides?: PdcCarouselSlide[];
  className?: string;
  ariaLabel?: string;
  autoPlayMs?: number;
  /** Menor altura (páginas escuela con FAB entre galería y programa) */
  compact?: boolean;
  /** Más alto (inicio — Nuestra Esencia) */
  large?: boolean;
  /** Pie de diapositiva bajo la imagen */
  showSlideCaption?: boolean;
  /** Texto «Cambia cada N s» / «Pausado» bajo los puntos */
  showPlaybackHint?: boolean;
  /** Notebook/monitor: padding lateral y altura contenida para que el carrusel respire */
  airy?: boolean;
};

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const DEFAULT_AUTO_PLAY_MS = 5500;

export const PdcPhotoCarousel: React.FC<PdcPhotoCarouselProps> = ({
  photos = [],
  slides,
  className = "",
  ariaLabel = "Galería de fotos",
  autoPlayMs = DEFAULT_AUTO_PLAY_MS,
  compact = false,
  large = false,
  showSlideCaption = true,
  showPlaybackHint = true,
  airy = false,
}) => {
  const reduceMotion = useReducedMotion() ?? false;
  const saveData = usePrefersSaveData();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const useDirect = Boolean(slides?.length);
  const count = useDirect ? slides!.length : photos.length;

  const bump = useCallback(() => setProgressKey((k) => k + 1), []);

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + count) % count);
      bump();
    },
    [count, bump]
  );

  const goTo = useCallback(
    (i: number) => {
      setIndex(i);
      bump();
    },
    [bump]
  );

  const currentDirect = useDirect ? slides![index] : null;
  const isVideoSlide = Boolean(currentDirect?.video);
  const playClip = !reduceMotion && !saveData;

  useEffect(() => {
    if (count <= 1 || reduceMotion || paused || isVideoSlide) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
      bump();
    }, autoPlayMs);
    return () => window.clearInterval(id);
  }, [count, reduceMotion, paused, autoPlayMs, bump, isVideoSlide]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideoSlide) return;
    if (!playClip) {
      video.pause();
      return;
    }
    void video.play().catch(() => {});
  }, [isVideoSlide, playClip, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (count === 0) return null;

  const direct = currentDirect;
  const photo = useDirect ? null : photos[index];
  const slideKey = direct ? direct.id : photo!.slug;
  const slideAlt = direct ? direct.alt : photo!.alt;
  const slideSrc = direct?.src
    ? direct.src
    : photo
      ? editorialSrc(photo.slug, photo.layout === "portrait" ? 960 : 1440)
      : "";
  const slideSrcSet = direct?.src ? undefined : photo ? editorialSrcSet(photo.slug, photo.layout) : undefined;
  const slideSizes = direct?.src ? undefined : photo ? editorialSizes(photo.layout) : undefined;
  const slideObjectPosition = direct
    ? direct.video?.objectPosition ?? direct.objectPosition
    : photo!.objectPosition;
  const slideCaption = direct ? direct.caption : photo!.caption;
  const slideObjectFit = direct?.objectFit ?? "cover";
  const seconds = Math.round(autoPlayMs / 1000);
  const showProgress = count > 1 && !reduceMotion && !isVideoSlide;

  const aspectClass = compact
    ? "relative aspect-[3/2] w-full sm:aspect-[16/10] md:aspect-[2/1]"
    : large
      ? "relative aspect-[4/3] w-full sm:aspect-[16/9] md:aspect-[2.25/1] md:min-h-[min(48vh,440px)]"
      : airy
        ? "relative aspect-[4/3] w-full sm:aspect-[16/10] md:aspect-[2.1/1] lg:max-2xl:aspect-[18/10] lg:max-2xl:max-h-[min(54vh,540px)] 2xl:aspect-[16/10] 2xl:max-h-[min(58vh,620px)]"
        : "relative aspect-[4/3] w-full sm:aspect-[16/10] md:aspect-[2.1/1]";

  const mediaMotion = {
    initial: reduceMotion ? false : { opacity: 0, scale: 1.03 },
    animate: { opacity: 1, scale: 1 },
    exit: reduceMotion ? undefined : { opacity: 0 },
    transition: { duration: reduceMotion ? 0 : 0.5, ease },
  };

  const mediaClass = `absolute inset-0 h-full w-full ${
    slideObjectFit === "contain" ? "object-contain p-6 sm:p-8" : "object-cover"
  }`;
  const mediaStyle = slideObjectPosition ? { objectPosition: slideObjectPosition } : undefined;

  return (
    <section
      className={`relative ${airy ? "lg:max-2xl:px-3 2xl:px-8" : ""} ${className}`.trim()}
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        layout
        transition={{ layout: { duration: 0.35, ease } }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a1018]/80 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.75)]"
      >
        <motion.div layout className={aspectClass}>
          <AnimatePresence mode="wait" initial={false}>
            {isVideoSlide && direct?.video ? (
              playClip ? (
                <motion.video
                  key={slideKey}
                  ref={videoRef}
                  src={direct.video.mp4}
                  poster={direct.video.poster}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                  aria-label={slideAlt}
                  className={mediaClass}
                  style={mediaStyle}
                  {...mediaMotion}
                />
              ) : (
                <motion.img
                  key={`${slideKey}-poster`}
                  src={direct.video.poster}
                  alt={slideAlt}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className={mediaClass}
                  style={mediaStyle}
                  {...mediaMotion}
                />
              )
            ) : (
              <motion.img
                key={slideKey}
                src={slideSrc}
                srcSet={slideSrcSet}
                sizes={slideSizes}
                alt={slideAlt}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className={mediaClass}
                style={mediaStyle}
                {...mediaMotion}
              />
            )}
          </AnimatePresence>
          <motion.div
            layout
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030508]/55 via-transparent to-[#030508]/10"
            aria-hidden
          />

          {showProgress ? (
            <motion.div className="absolute bottom-0 left-0 right-0 z-10 h-1 overflow-hidden bg-white/10" aria-hidden>
              <motion.div
                key={progressKey}
                className="h-full origin-left bg-secondary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: paused ? 0 : 1 }}
                transition={{ duration: paused ? 0.15 : autoPlayMs / 1000, ease: "linear" }}
              />
            </motion.div>
          ) : null}

          {count > 1 ? (
            <div className="absolute right-3 top-3 z-10 flex items-center gap-2">
              <span className="rounded-full border border-white/15 bg-[#030508]/80 px-2.5 py-1 font-sans text-[0.65rem] font-semibold tabular-nums text-zinc-300 backdrop-blur-sm">
                {index + 1}/{count}
              </span>
              {!isVideoSlide ? (
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-[#030508]/80 text-white/85 backdrop-blur-sm transition hover:border-secondary/40 hover:text-secondary"
                  aria-label={paused ? "Reanudar carrusel" : "Pausar carrusel"}
                >
                  {paused ? (
                    <Play className="h-3.5 w-3.5" aria-hidden />
                  ) : (
                    <Pause className="h-3.5 w-3.5" aria-hidden />
                  )}
                </button>
              ) : null}
            </div>
          ) : null}

          {count > 1 ? (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#030508]/85 text-white shadow-lg backdrop-blur-sm transition hover:border-secondary/50 hover:text-secondary sm:left-4"
                aria-label="Diapositiva anterior"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#030508]/85 text-white shadow-lg backdrop-blur-sm transition hover:border-secondary/50 hover:text-secondary sm:right-4"
                aria-label="Diapositiva siguiente"
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            </>
          ) : null}
        </motion.div>

        {showSlideCaption && slideCaption ? (
          <p className="border-t border-white/[0.08] px-4 py-3 text-center font-sans text-sm font-medium leading-relaxed text-zinc-300 md:px-6 md:py-4">
            {slideCaption}
          </p>
        ) : null}
      </motion.div>

      {count > 1 ? (
        <motion.div
          layout
          className="mt-4 flex flex-wrap items-center justify-center gap-2"
          role="tablist"
          aria-label="Elegir diapositiva"
        >
          {(useDirect ? slides! : photos).map((p, i) => {
            const tabKey = useDirect ? (p as PdcCarouselSlide).id : (p as EditorialPhoto).slug;
            const tabAlt = p.alt;
            return (
              <button
                key={tabKey}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`${tabAlt}${i === index ? " (actual)" : ""}`}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-secondary" : "w-2 bg-white/25 hover:bg-white/45"
                }`}
              />
            );
          })}
          {showPlaybackHint && !isVideoSlide ? (
            <span className="w-full text-center font-sans text-[0.65rem] text-zinc-500 sm:w-auto sm:pl-2">
              {paused ? "Pausado" : `Cambia cada ${seconds} s`}
            </span>
          ) : null}
        </motion.div>
      ) : null}
    </section>
  );
};
