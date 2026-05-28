import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { BETHEL_GALLERY_PHOTOS, type BethelPhoto } from "../../data/bethelPhotos";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

type PhotoTileProps = {
  photo: BethelPhoto;
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

export function BethelMomentsGallery() {
  const reduceMotion = useReducedMotion() ?? false;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goLightbox = useCallback((delta: number) => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      return (i + delta + BETHEL_GALLERY_PHOTOS.length) % BETHEL_GALLERY_PHOTOS.length;
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

  const active = lightboxIndex !== null ? BETHEL_GALLERY_PHOTOS[lightboxIndex] : null;

  return (
    <>
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
        aria-label="Fotos del encuentro Bethel"
      >
        {BETHEL_GALLERY_PHOTOS.map((photo, i) => (
          <div key={photo.id} className="mb-4 break-inside-avoid" role="listitem">
            <PhotoTile
              photo={photo}
              globalIndex={i}
              eager={i < 3}
              onOpen={setLightboxIndex}
              reduceMotion={reduceMotion}
            />
          </div>
        ))}
      </motion.div>

      <AnimatePresence>
        {active && lightboxIndex !== null ? (
          <motion.div
            key="bethel-lightbox"
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
              className="absolute left-2 top-1/2 z-[2] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0a1524]/90 text-white/85 transition hover:border-secondary/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary sm:left-4 md:left-6"
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

            <motion.img
              key={active.id}
              src={active.src}
              alt={active.alt}
              className="max-h-[min(92vh,100dvh-2rem)] max-w-[min(96vw,100dvw-2rem)] w-auto select-none rounded-lg object-contain shadow-[0_24px_80px_-20px_rgba(0,0,0,0.75)]"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.28, ease: easeOut }}
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
