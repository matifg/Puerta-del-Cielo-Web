import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { INTERCESION_MOMENTS, INTERCESION_GALLERY_FOLDER, type IntercesionMoment } from "../data/intercesionPhotos";
import { galleryMasonrySizes } from "../data/galleryWebp";
import {
  pdcNotebookGalleryHintClass,
  pdcNotebookGalleryMediaClass,
  pdcNotebookGalleryTileClass,
} from "./PdcSectionHeader";
import { PdcGalleryLightboxPicture, PdcGalleryPicture } from "./PdcGalleryPicture";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

type PhotoTileProps = {
  photo: IntercesionMoment;
  globalIndex: number;
  eager?: boolean;
  onOpen: (index: number) => void;
  reduceMotion: boolean;
};

const PhotoTile: React.FC<PhotoTileProps> = ({
  photo,
  globalIndex,
  eager = false,
  onOpen,
  reduceMotion,
}) => (
  <motion.button
    type="button"
    onClick={() => onOpen(globalIndex)}
    whileHover={reduceMotion ? undefined : { y: -3 }}
    whileTap={reduceMotion ? undefined : { scale: 0.99 }}
    className={`group relative block h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a1018]/80 text-left shadow-[0_20px_50px_-24px_rgba(0,0,0,0.75)] transition-colors hover:border-secondary/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary notebook:rounded-xl ${pdcNotebookGalleryTileClass}`}
    aria-label={`Ver foto ampliada: ${photo.alt}`}
  >
    <span className={`relative block w-full overflow-hidden ${pdcNotebookGalleryMediaClass}`}>
      <PdcGalleryPicture
        folder={INTERCESION_GALLERY_FOLDER}
        slug={photo.slug}
        fallbackSrc={photo.src}
        ariaHidden
        loading={eager ? "eager" : "lazy"}
        sizes={galleryMasonrySizes()}
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
        style={photo.objectPosition ? { objectPosition: photo.objectPosition } : undefined}
      />

      <span
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030508]/40 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        aria-hidden
      />

      <span
        className="pointer-events-none absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-[#030508]/75 text-secondary opacity-0 shadow-md backdrop-blur-sm transition group-hover:opacity-100 group-focus-visible:opacity-100 md:right-2.5 md:top-2.5"
        aria-hidden
      >
        <Maximize2 className="h-3.5 w-3.5" strokeWidth={2.25} />
      </span>
    </span>
  </motion.button>
);

type IntercesionMomentsGalleryProps = {
  className?: string;
};

export const IntercesionMomentsGallery: React.FC<IntercesionMomentsGalleryProps> = ({ className = "" }) => {
  const reduceMotion = useReducedMotion() ?? false;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goLightbox = useCallback((delta: number) => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      return (i + delta + INTERCESION_MOMENTS.length) % INTERCESION_MOMENTS.length;
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

  const active = lightboxIndex !== null ? INTERCESION_MOMENTS[lightboxIndex] : null;

  return (
    <div className={className}>
      <p className={`mx-auto mb-4 max-w-md text-center font-sans text-sm text-white/50 notebook:mb-3 md:mb-5 ${pdcNotebookGalleryHintClass}`}>
        Tocá una foto para verla en grande.
      </p>

      <div
        className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 notebook:mx-auto notebook:grid-cols-3 notebook:grid-rows-2 notebook:items-stretch notebook:gap-3 notebook:max-w-[min(99vw,70rem)] notebook:h-[min(50vh,440px)] desktop:max-w-[min(98vw,76rem)] desktop:gap-3.5"
        role="list"
        aria-label="Galería EIGE Intercesión"
      >
        {INTERCESION_MOMENTS.map((photo, i) => (
          <div key={photo.id} className={`relative min-h-0 ${pdcNotebookGalleryTileClass}`} role="listitem">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl notebook:aspect-[unset] notebook:h-full notebook:min-h-0 notebook:rounded-xl desktop:rounded-2xl">
              <PhotoTile
                photo={photo}
                globalIndex={i}
                eager={i < 3}
                onOpen={setLightboxIndex}
                reduceMotion={reduceMotion}
              />
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {active && lightboxIndex !== null ? (
          <motion.div
            key="eige-lightbox"
            className="fixed inset-0 z-[10025] flex items-center justify-center bg-[#030508]/88 p-4 backdrop-blur-md sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={active.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.25 }}
            onClick={closeLightbox}
          >
            <motion.button
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-[2] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#0a1524]/90 text-white/85 transition hover:border-secondary/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary sm:right-6 sm:top-6"
              aria-label="Cerrar foto"
            >
              <X className="h-5 w-5" aria-hidden />
            </motion.button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goLightbox(-1);
              }}
              className="absolute left-2 top-1/2 z-[2] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0a1524]/90 text-white/85 transition hover:border-secondary/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary sm:left-4"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goLightbox(1);
              }}
              className="absolute right-2 top-1/2 z-[2] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0a1524]/90 text-white/85 transition hover:border-secondary/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary sm:right-4"
              aria-label="Foto siguiente"
            >
              <ChevronRight className="h-6 w-6" aria-hidden />
            </button>

            <PdcGalleryLightboxPicture
              folder={INTERCESION_GALLERY_FOLDER}
              slug={active.slug}
              fallbackSrc={active.src}
              alt={active.alt}
              className="max-h-[min(92vh,100dvh-2rem)] max-w-[min(96vw,100dvw-2rem)] w-auto select-none rounded-lg object-contain shadow-[0_24px_80px_-20px_rgba(0,0,0,0.75)]"
              style={active.objectPosition ? { objectPosition: active.objectPosition } : undefined}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
