import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import {
  CELULA_GALLERY_ROTATE_MS,
  CELULA_GALLERY_VISIBLE_COUNT,
  CELULA_PHOTOS,
  type CelulaPhoto,
} from "../data/celulaPhotos";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];
const easeReveal: [number, number, number, number] = [0.33, 1, 0.45, 1];

const mediaClass = "absolute inset-0 h-full w-full object-cover";

const tileMotion = {
  initial: { opacity: 0, scale: 1.04 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.97 },
  transition: { duration: 0.95, ease: easeReveal },
} as const;

const tileMotionReduced = {
  initial: false as const,
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 1, scale: 1 },
  transition: { duration: 0 },
};

function shuffle<T>(items: readonly T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildInitialVisible(): CelulaPhoto[] {
  const count = Math.min(CELULA_GALLERY_VISIBLE_COUNT, CELULA_PHOTOS.length);
  return shuffle(CELULA_PHOTOS).slice(0, count);
}

function pickReplacement(
  pool: readonly CelulaPhoto[],
  visible: readonly CelulaPhoto[],
  slotItemId: string
): CelulaPhoto | null {
  const visibleIds = new Set(visible.map((p) => p.id));
  const candidates = pool.filter((p) => p.id !== slotItemId && !visibleIds.has(p.id));
  if (candidates.length === 0) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function photoPoolIndex(photo: CelulaPhoto) {
  return CELULA_PHOTOS.findIndex((p) => p.id === photo.id);
}

type PhotoTileProps = {
  photo: CelulaPhoto;
  eager?: boolean;
  onOpen: (poolIndex: number) => void;
  reduceMotion: boolean;
};

const PhotoTile: React.FC<PhotoTileProps> = ({ photo, eager = false, onOpen, reduceMotion }) => (
  <motion.button
    type="button"
    onClick={() => onOpen(photoPoolIndex(photo))}
    whileHover={reduceMotion ? undefined : { y: -2 }}
    whileTap={reduceMotion ? undefined : { scale: 0.99 }}
    className="group relative block h-full w-full overflow-hidden border-0 bg-[#0a1018]/80 text-left shadow-[0_16px_40px_-20px_rgba(0,0,0,0.75)] ring-1 ring-inset ring-white/10 transition-[box-shadow,ring-color] hover:ring-secondary/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
    aria-label={`Ver foto ampliada: ${photo.alt}`}
  >
    <span className="relative block h-full w-full overflow-hidden">
      <img
        src={photo.src}
        alt=""
        aria-hidden
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={`${mediaClass} transition duration-700 group-hover:scale-[1.02] motion-reduce:transition-none`}
        style={photo.objectPosition ? { objectPosition: photo.objectPosition } : undefined}
      />
      <span
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030508]/75 via-[#030508]/15 to-[#030508]/25"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 px-2.5 py-2 opacity-100 transition duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100"
        aria-hidden
      >
        <span className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-white/90">
          {photo.caption}
        </span>
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 bg-[#030508]/80 text-secondary backdrop-blur-sm">
          <Maximize2 className="h-2.5 w-2.5" strokeWidth={2.25} />
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
  const [visible, setVisible] = useState<CelulaPhoto[]>(buildInitialVisible);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const rotationPaused = lightboxIndex !== null;
  const slotMotion = reduceMotion ? tileMotionReduced : tileMotion;

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goLightbox = useCallback((delta: number) => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      return (i + delta + CELULA_PHOTOS.length) % CELULA_PHOTOS.length;
    });
  }, []);

  useEffect(() => {
    if (rotationPaused || reduceMotion) return;

    const tick = () => {
      setVisible((prev) => {
        if (prev.length === 0) return prev;
        const targetSlot = Math.floor(Math.random() * prev.length);
        const current = prev[targetSlot];
        const replacement = pickReplacement(CELULA_PHOTOS, prev, current.id);
        if (!replacement) return prev;
        const next = [...prev];
        next[targetSlot] = replacement;
        return next;
      });
    };

    const id = window.setInterval(tick, CELULA_GALLERY_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [rotationPaused, reduceMotion]);

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

  return (
    <>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.5, ease: easeOut }}
        className="mb-5 md:mb-6"
      >
        <PdcSectionHeaderBlock />
      </motion.div>

      <motion.p
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto mb-4 max-w-md text-center font-sans text-xs text-white/45"
      >
        Fotos distintas en cada hueco; rotan solas. Tocá una para ampliar.
      </motion.p>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-6% 0px" }}
        transition={{ duration: 0.5, ease: easeOut }}
        className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3"
        role="list"
        aria-label="Momentos de Iglesia en casa"
        aria-live="polite"
      >
        {visible.map((photo, i) => (
          <div key={`iec-slot-${i}`} className="relative min-h-0" role="listitem">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#0a1018]/80">
              <AnimatePresence initial={false}>
                <motion.div
                  key={photo.id}
                  className="absolute inset-0"
                  initial={slotMotion.initial}
                  animate={slotMotion.animate}
                  exit={slotMotion.exit}
                  transition={slotMotion.transition}
                >
                  <PhotoTile
                    photo={photo}
                    eager={i < 3}
                    onOpen={setLightboxIndex}
                    reduceMotion={reduceMotion}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
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
              className="relative max-h-[min(85vh,720px)] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/12 shadow-[0_32px_90px_-24px_rgba(0,0,0,0.65)]"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.3, ease: easeOut }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                key={active.id}
                src={active.src}
                alt={active.alt}
                className="max-h-[min(78vh,680px)] w-full object-contain bg-[#0a1018]"
                style={active.objectPosition ? { objectPosition: active.objectPosition } : undefined}
              />
              <figcaption className="border-t border-white/[0.08] bg-[#0a1018]/95 px-4 py-3 text-center">
                <span className="block font-sans text-sm font-semibold text-secondary">{active.caption}</span>
                <span className="mt-1 block font-sans text-sm leading-relaxed text-white/70">{active.alt}</span>
              </figcaption>
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
