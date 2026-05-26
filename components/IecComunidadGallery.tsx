import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { CELULA_PHOTOS, type CelulaPhoto } from "../data/celulaPhotos";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

type PhotoTileProps = {
  photo: CelulaPhoto;
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
    className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a1018]/80 text-left shadow-[0_20px_50px_-24px_rgba(0,0,0,0.75)] transition-colors hover:border-secondary/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
    aria-label={`Ver foto ampliada: ${photo.alt}`}
  >
    <span className="relative block w-full">
      <img
        src={photo.src}
        alt=""
        aria-hidden
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="block h-auto w-full transition duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
      />

      <span
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030508]/70 via-[#030508]/10 to-transparent"
        aria-hidden
      />

      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 px-3 py-2.5 opacity-100 transition duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100"
        aria-hidden
      >
        <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/90">
          Ampliar
        </span>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/20 bg-[#030508]/80 text-secondary backdrop-blur-sm">
          <Maximize2 className="h-3 w-3" strokeWidth={2.25} />
        </span>
      </span>
    </span>
  </motion.button>
);

type IecComunidadGalleryProps = {
  formHref: string;
};

export const IecComunidadGallery: React.FC<IecComunidadGalleryProps> = ({ formHref }) => {
  const reduceMotion = useReducedMotion() ?? false;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goLightbox = useCallback((delta: number) => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      return (i + delta + CELULA_PHOTOS.length) % CELULA_PHOTOS.length;
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

  const active = lightboxIndex !== null ? CELULA_PHOTOS[lightboxIndex] : null;
  const count = CELULA_PHOTOS.length;

  return (
    <>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.5, ease: easeOut }}
        className="mb-10 md:mb-12"
      >
        <PdcSectionHeaderBlock />
      </motion.div>

      <motion.p
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto mb-8 max-w-md text-center font-sans text-sm text-white/50"
      >
        Clic en una imagen para ampliar.
      </motion.p>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-6% 0px" }}
        transition={{ duration: 0.5, ease: easeOut }}
        className="mx-auto max-w-5xl columns-2 gap-4 sm:gap-5 sm:columns-3 lg:columns-3"
        role="list"
        aria-label="Momentos de Iglesia en casa"
      >
        {CELULA_PHOTOS.map((photo, i) => (
          <div key={photo.id} className="mb-4 break-inside-avoid" role="listitem">
            <PhotoTile
              photo={photo}
              globalIndex={i}
              eager={i < 4}
              onOpen={setLightboxIndex}
              reduceMotion={reduceMotion}
            />
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-10 flex justify-center md:mt-12"
      >
        <a href={formHref} target="_blank" rel="noopener noreferrer" className="pdc-btn-on-dark-accent max-w-none">
          <span className="relative z-[1]">Quiero conocer un grupo cerca mío</span>
        </a>
      </motion.div>

      <AnimatePresence>
        {active && lightboxIndex !== null ? (
          <motion.div
            key="iec-lightbox"
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
              className="absolute left-2 top-1/2 z-[2] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0a1524]/90 text-white/85 transition hover:border-secondary/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary sm:left-4 md:left-6"
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
              className="absolute right-2 top-1/2 z-[2] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0a1524]/90 text-white/85 transition hover:border-secondary/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary sm:right-4 md:right-6"
              aria-label="Foto siguiente"
            >
              <ChevronRight className="h-6 w-6" aria-hidden />
            </button>

            <motion.figure
              key={active.id}
              className="relative max-h-[min(85vh,720px)] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/12 shadow-[0_32px_90px_-24px_rgba(0,0,0,0.65)]"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.3, ease: easeOut }}
              onClick={(e) => e.stopPropagation()}
            >
              <p
                className="absolute left-4 top-4 z-[1] rounded-full border border-white/15 bg-[#030508]/80 px-3 py-1 font-sans text-xs font-semibold tabular-nums text-white/70 backdrop-blur-sm"
                aria-live="polite"
              >
                {lightboxIndex + 1} / {count}
              </p>
              <img
                src={active.src}
                alt={active.alt}
                className="max-h-[min(85vh,720px)] w-full object-contain bg-[#0a1018]"
              />
              <figcaption className="sr-only">{active.caption}</figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

function PdcSectionHeaderBlock() {
  return (
    <div className="text-center">
      <p className="mb-2 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-secondary/80">
        En un hogar
      </p>
      <h2 className="font-serif text-2xl text-white md:text-3xl">Así nos reunimos</h2>
      <p className="mx-auto mt-3 max-w-xl font-sans text-sm leading-relaxed text-white/65 md:text-base">
        Personas reales, encuentros cercanos. Te invitamos a ser parte de un grupo en tu barrio.
      </p>
    </div>
  );
}
