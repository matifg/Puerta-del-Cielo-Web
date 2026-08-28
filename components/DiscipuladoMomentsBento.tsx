import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronUp, Images, Maximize2, X } from "lucide-react";
import {
  DISCIPULADO_FOTOS_INICIALES,
  DISCIPULADO_GALLERY_FOLDER,
  DISCIPULADO_MOMENTS,
  discipuladoMomentGridClass,
  type DiscipuladoMoment,
} from "../data/discipuladoPhotos";
import { galleryGridSizes } from "../data/galleryWebp";
import {
  pdcBentoGalleryGridClass,
  pdcNotebookGalleryCaptionClass,
  pdcNotebookGalleryTileClass,
} from "./PdcSectionHeader";
import { PdcGalleryLightboxPicture, PdcGalleryPicture } from "./PdcGalleryPicture";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

type MomentCellProps = {
  photo: DiscipuladoMoment;
  index: number;
  gridClass: string;
  onOpen: () => void;
  reduceMotion: boolean;
};

const MomentCell: React.FC<MomentCellProps> = ({
  photo,
  index,
  gridClass,
  onOpen,
  reduceMotion,
}) => {
  const featured = photo.bento === "featured";
  const aspectClass = featured
    ? "relative block w-full min-h-0 overflow-hidden aspect-[3/4] sm:aspect-[5/6] md:aspect-[4/5] md:h-full"
    : "relative block w-full min-h-0 overflow-hidden aspect-[4/3]";

  return (
    <motion.button
      type="button"
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: easeOut, delay: Math.min(index, 8) * 0.03 }}
      onClick={onOpen}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      className={`group flex h-full w-full min-h-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#17130e]/80 text-left shadow-[0_20px_50px_-24px_rgba(0,0,0,0.75)] transition-colors hover:border-secondary/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${pdcNotebookGalleryTileClass} ${gridClass}`}
      aria-label={`${photo.caption}: ver foto ampliada. ${photo.alt}`}
    >
      <span className={aspectClass}>
        <PdcGalleryPicture
          folder={DISCIPULADO_GALLERY_FOLDER}
          slug={photo.slug}
          fallbackSrc={photo.src}
          ariaHidden
          loading={featured || index < 4 ? "eager" : "lazy"}
          sizes={galleryGridSizes()}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
          style={photo.objectPosition ? { objectPosition: photo.objectPosition } : undefined}
        />
        <span
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0e0b08]/50 via-transparent to-[#0e0b08]/15"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-[#0e0b08]/75 text-secondary opacity-90 shadow-md backdrop-blur-sm transition group-hover:border-secondary/40 group-hover:bg-[#1d1711]/90 group-focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100"
          aria-hidden
        >
          <Maximize2 className="h-4 w-4" strokeWidth={2.25} />
        </span>
      </span>
      <span
        className={`shrink-0 border-t border-white/[0.08] bg-[#17130e]/95 px-3 py-2.5 font-sans text-sm font-medium text-white/85 transition group-hover:text-white md:px-4 md:py-3 ${pdcNotebookGalleryCaptionClass}`}
      >
        {photo.caption}
      </span>
    </motion.button>
  );
};

type DiscipuladoMomentsBentoProps = {
  className?: string;
  id?: string;
};

export const DiscipuladoMomentsBento: React.FC<DiscipuladoMomentsBentoProps> = ({
  className = "",
  id,
}) => {
  const reduceMotion = useReducedMotion() ?? false;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  const iniciales = DISCIPULADO_MOMENTS.slice(0, DISCIPULADO_FOTOS_INICIALES);
  const extras = DISCIPULADO_MOMENTS.slice(DISCIPULADO_FOTOS_INICIALES);
  const hayMas = extras.length > 0;

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, closeLightbox]);

  const active = lightboxIndex !== null ? DISCIPULADO_MOMENTS[lightboxIndex] : null;

  return (
    <div id={id} className={className}>
      <p className="mb-2 text-center font-sans text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-secondary/80 notebook:mb-1">
        En el salón
      </p>
      <h3
        data-pdc-scroll-focus
        className="mb-2 text-center font-serif text-xl text-white notebook:mb-1 md:text-2xl"
      >
        Así se vive el programa
      </h3>
      <p className="mx-auto mb-4 max-w-lg text-center font-sans text-sm text-white/65 md:mb-5">
        Encuentros quincenales, comunidad y formación en un mismo espacio.
      </p>

      <div className={pdcBentoGalleryGridClass}>
        {iniciales.map((photo) => {
          const globalIndex = DISCIPULADO_MOMENTS.findIndex((p) => p.id === photo.id);
          return (
            <MomentCell
              key={photo.id}
              photo={photo}
              index={globalIndex}
              gridClass={discipuladoMomentGridClass(photo.id)}
              reduceMotion={reduceMotion}
              onOpen={() => setLightboxIndex(globalIndex)}
            />
          );
        })}
      </div>

      {expanded && extras.length > 0 ? (
        <div
          className="mx-auto mt-2.5 grid w-full max-w-5xl grid-cols-2 gap-2.5 sm:mt-3 sm:grid-cols-3 sm:gap-3 md:gap-4 desktop:max-w-[min(98vw,76rem)]"
          role="list"
          aria-label="Más momentos de discipulado"
        >
          {extras.map((photo, i) => {
            const globalIndex = DISCIPULADO_MOMENTS.findIndex((p) => p.id === photo.id);
            return (
              <MomentCell
                key={photo.id}
                photo={photo}
                index={DISCIPULADO_FOTOS_INICIALES + i}
                gridClass={photo.id === "disc-moment-9" || photo.id === "disc-moment-10" ? "col-span-2 sm:col-span-1" : ""}
                reduceMotion={reduceMotion}
                onOpen={() => setLightboxIndex(globalIndex)}
              />
            );
          })}
        </div>
      ) : null}

      {hayMas ? (
        <div className="mt-5 flex justify-center md:mt-6">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="pdc-btn-on-dark-ghost inline-flex items-center gap-2"
            aria-expanded={expanded}
          >
            {expanded ? (
              <>
                <ChevronUp className="relative z-[1] h-4 w-4 shrink-0 text-secondary" aria-hidden />
                <span className="relative z-[1]">Ver menos</span>
              </>
            ) : (
              <>
                <Images className="relative z-[1] h-4 w-4 shrink-0 text-secondary" aria-hidden />
                <span className="relative z-[1]">Ver más fotos</span>
              </>
            )}
          </button>
        </div>
      ) : null}

      <AnimatePresence>
        {active && lightboxIndex !== null ? (
          <motion.div
            key="disc-lightbox"
            className="fixed inset-0 z-[10025] flex items-center justify-center bg-[#0e0b08]/88 p-4 backdrop-blur-md sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={`${active.caption}. ${active.alt}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.25 }}
            onClick={closeLightbox}
          >
            <motion.button
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-[1] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#1d1711]/90 text-white/85 transition hover:border-secondary/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary sm:right-6 sm:top-6"
              aria-label="Cerrar foto"
            >
              <X className="h-5 w-5" aria-hidden />
            </motion.button>
            <motion.figure
              className="relative max-h-[min(85vh,720px)] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/12 shadow-[0_32px_90px_-24px_rgba(0,0,0,0.65)]"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.3, ease: easeOut }}
              onClick={(e) => e.stopPropagation()}
            >
              <PdcGalleryLightboxPicture
                folder={DISCIPULADO_GALLERY_FOLDER}
                slug={active.slug}
                fallbackSrc={active.src}
                alt={active.alt}
                className="max-h-[min(78vh,680px)] w-full object-contain bg-[#17130e]"
                style={active.objectPosition ? { objectPosition: active.objectPosition } : undefined}
              />
              <figcaption className="border-t border-white/[0.08] bg-[#17130e]/95 px-4 py-3 text-center">
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
