import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, Play, X } from "lucide-react";
import {
  FORMATION_GALLERY_FOLDER,
  FORMATION_MOMENTS,
  FORMATION_NOTEBOOK_EXTRAS,
  formationMomentGridClass,
  type FormacionMoment,
} from "../data/formacionLideres";
import { galleryGridSizes } from "../data/galleryWebp";
import {
  pdcNotebookGalleryCaptionClass,
  pdcNotebookGalleryHintClass,
  pdcNotebookGalleryMediaClass,
  pdcNotebookGalleryTileClass,
} from "./PdcSectionHeader";
import { PdcGalleryLightboxPicture, PdcGalleryPicture } from "./PdcGalleryPicture";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

type MomentCellProps = {
  moment: FormacionMoment;
  index: number;
  gridClass: string;
  onOpen: () => void;
  reduceMotion: boolean;
};

const MomentCell: React.FC<MomentCellProps> = ({
  moment,
  index,
  gridClass,
  onOpen,
  reduceMotion,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const featured = moment.bento === "featured";
  const isVideo = moment.kind === "video" && moment.video;
  const mediaPosition = moment.video?.objectPosition ?? moment.objectPosition;
  const mediaStyle = mediaPosition ? { objectPosition: mediaPosition } : undefined;

  useEffect(() => {
    if (!isVideo || !videoRef.current) return;
    const video = videoRef.current;
    video.muted = true;
    video.loop = true;
    void video.play().catch(() => {});
    return () => {
      video.pause();
    };
  }, [isVideo, moment.id]);

  const aspectClass = featured
    ? `relative block w-full min-h-0 overflow-hidden aspect-[3/4] sm:aspect-[5/6] md:aspect-[4/5] notebook:flex-1 ${pdcNotebookGalleryMediaClass}`
    : `relative block w-full min-h-0 overflow-hidden aspect-[4/3] notebook:flex-1 ${pdcNotebookGalleryMediaClass}`;

  const hideOnNotebook = moment.hideOnNotebook;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 1, y: 0 }}
      onClick={onOpen}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      className={`group flex h-full w-full min-h-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a1018]/80 text-left shadow-[0_20px_50px_-24px_rgba(0,0,0,0.75)] transition-colors hover:border-secondary/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary notebook:rounded-xl ${pdcNotebookGalleryTileClass} notebook:!col-span-1 notebook:!row-span-1 notebook:!col-start-auto notebook:!row-start-auto ${hideOnNotebook ? "notebook:hidden" : ""} ${gridClass}`}
      aria-label={
        isVideo
          ? `${moment.caption}: ver video ampliado. ${moment.alt}`
          : `${moment.caption}: ver foto ampliada. ${moment.alt}`
      }
    >
      <span className={aspectClass}>
        {isVideo ? (
          <video
            ref={videoRef}
            src={moment.video!.mp4}
            poster={moment.video!.poster}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
            style={mediaStyle}
          />
        ) : (
          <PdcGalleryPicture
            folder={FORMATION_GALLERY_FOLDER}
            slug={moment.slug}
            fallbackSrc={moment.src}
            ariaHidden
            loading={featured || index < 2 ? "eager" : "lazy"}
            sizes={galleryGridSizes()}
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
            style={mediaStyle}
          />
        )}
        <span
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030508]/50 via-transparent to-[#030508]/15"
          aria-hidden
        />
        {isVideo ? (
          <span
            className="pointer-events-none absolute left-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-[#030508]/75 text-secondary backdrop-blur-sm"
            aria-hidden
          >
            <Play className="h-3.5 w-3.5 fill-current" />
          </span>
        ) : null}
        <span
          className="pointer-events-none absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-[#030508]/75 text-secondary opacity-90 shadow-md backdrop-blur-sm transition group-hover:border-secondary/40 group-hover:bg-[#0a1524]/90 group-focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100"
          aria-hidden
        >
          <Maximize2 className="h-4 w-4" strokeWidth={2.25} />
        </span>
      </span>
      <span className={`shrink-0 border-t border-white/[0.08] bg-[#0a1018]/95 px-3 py-2.5 font-sans text-sm font-medium text-white/85 transition group-hover:text-white md:px-4 md:py-3 ${pdcNotebookGalleryCaptionClass}`}>
        {moment.caption}
      </span>
    </motion.button>
  );
};

type FormacionMomentsBentoProps = {
  className?: string;
  id?: string;
};

export const FormacionMomentsBento: React.FC<FormacionMomentsBentoProps> = ({ className = "", id }) => {
  const reduceMotion = useReducedMotion() ?? false;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goLightbox = useCallback((delta: number) => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      return (i + delta + FORMATION_MOMENTS.length) % FORMATION_MOMENTS.length;
    });
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goLightbox(-1);
      if (e.key === "ArrowRight") goLightbox(1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, closeLightbox, goLightbox]);

  const active = lightboxIndex !== null ? FORMATION_MOMENTS[lightboxIndex] : null;

  useEffect(() => {
    if (lightboxIndex === null || active?.kind !== "video") return;
    const video = lightboxVideoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    void video.play().catch(() => {});
  }, [lightboxIndex, active?.id, active?.kind]);

  return (
    <div id={id} className={className}>
      <p className={`mx-auto mb-4 max-w-md text-center font-sans text-sm text-white/50 notebook:mb-3 md:mb-5 ${pdcNotebookGalleryHintClass}`}>
        Tocá una foto o video para verlo en grande.
      </p>

      <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-2 sm:gap-2.5 md:grid-cols-3 md:gap-4 notebook:mx-auto notebook:grid-cols-3 notebook:grid-rows-2 notebook:items-stretch notebook:gap-3 notebook:max-w-[min(99vw,70rem)] notebook:h-[min(50vh,440px)] desktop:max-w-[min(98vw,76rem)] desktop:gap-3.5">
        {FORMATION_MOMENTS.map((moment, i) => (
          <MomentCell
            key={moment.id}
            moment={moment}
            index={i}
            gridClass={formationMomentGridClass(moment.id)}
            reduceMotion={reduceMotion}
            onOpen={() => setLightboxIndex(i)}
          />
        ))}
      </div>

      {FORMATION_NOTEBOOK_EXTRAS.length > 0 ? (
        <div className="mx-auto mt-4 hidden max-w-[min(99vw,70rem)] flex-wrap items-center justify-center gap-2 notebook:flex desktop:hidden">
          {FORMATION_NOTEBOOK_EXTRAS.map((extra) => {
            const extraIndex = FORMATION_MOMENTS.findIndex((m) => m.id === extra.id);
            const isVideo = extra.kind === "video";
            return (
              <button
                key={extra.id}
                type="button"
                onClick={() => setLightboxIndex(extraIndex)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 font-sans text-xs font-medium text-white/85 transition hover:border-secondary/30 hover:bg-white/[0.07] hover:text-white"
              >
                {isVideo ? (
                  <Play className="h-3 w-3 shrink-0 text-secondary" aria-hidden />
                ) : (
                  <Maximize2 className="h-3 w-3 shrink-0 text-secondary" aria-hidden />
                )}
                {extra.caption}
              </button>
            );
          })}
        </div>
      ) : null}

      <AnimatePresence>
        {active && lightboxIndex !== null ? (
          <motion.div
            key="formacion-lightbox"
            className="fixed inset-0 z-[10025] flex items-center justify-center bg-[#030508]/88 p-4 backdrop-blur-md sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={`${active.caption}. ${active.alt}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.25 }}
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-[2] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#0a1524]/90 text-white/85 transition hover:border-secondary/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary sm:right-6 sm:top-6"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goLightbox(-1);
              }}
              className="absolute left-2 top-1/2 z-[2] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0a1524]/90 text-white/85 transition hover:border-secondary/35 hover:text-white sm:left-4"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goLightbox(1);
              }}
              className="absolute right-2 top-1/2 z-[2] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0a1524]/90 text-white/85 transition hover:border-secondary/35 hover:text-white sm:right-4"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>

            <motion.figure
              className="relative max-h-[min(85vh,720px)] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/12 shadow-[0_32px_90px_-24px_rgba(0,0,0,0.65)]"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.3, ease: easeOut }}
              onClick={(e) => e.stopPropagation()}
            >
              {active.kind === "video" && active.video ? (
                <video
                  ref={lightboxVideoRef}
                  key={active.id}
                  src={active.video.mp4}
                  controls
                  playsInline
                  autoPlay
                  className="max-h-[min(78vh,680px)] w-full bg-black object-contain"
                />
              ) : (
                <PdcGalleryLightboxPicture
                  folder={FORMATION_GALLERY_FOLDER}
                  slug={active.slug}
                  fallbackSrc={active.src}
                  alt={active.alt}
                  className="max-h-[min(78vh,680px)] w-full object-contain bg-[#0a1018]"
                  style={active.objectPosition ? { objectPosition: active.objectPosition } : undefined}
                />
              )}
              <figcaption className="border-t border-white/[0.08] bg-[#0a1018]/95 px-4 py-3 text-center">
                <span className="block font-sans text-sm font-semibold text-secondary">{active.caption}</span>
                <span className="mt-1 block font-sans text-sm leading-relaxed text-white/70">{active.alt}</span>
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
