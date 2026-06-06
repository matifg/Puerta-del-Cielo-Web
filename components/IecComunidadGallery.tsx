import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
const IEC_LIGHTBOX_Z = "z-[10050]";

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
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030508]/50 via-transparent to-[#030508]/10"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-[#030508]/75 text-secondary opacity-95 shadow-md backdrop-blur-sm"
        aria-hidden
      >
        <Maximize2 className="h-3 w-3" strokeWidth={2.25} />
      </span>
    </span>
  </motion.button>
);

type IecComunidadGalleryProps = {
  formHref: string;
};

export const IecComunidadGallery: React.FC<IecComunidadGalleryProps> = ({ formHref }) => {
  const reduceMotion = useReducedMotion() ?? false;
  const [portalMounted, setPortalMounted] = useState(false);
  const [visible, setVisible] = useState<CelulaPhoto[]>(buildInitialVisible);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    setPortalMounted(true);
  }, []);

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

  const lightbox =
    portalMounted && active && lightboxIndex !== null ? (
      <AnimatePresence>
        <motion.div
          key="iec-lightbox"
          className={`fixed inset-0 ${IEC_LIGHTBOX_Z} flex items-center justify-center bg-[#030508]/92 p-4 backdrop-blur-md sm:p-6`}
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

          <motion.img
            key={active.id}
            src={active.src}
            alt={active.alt}
            className="max-h-[min(92vh,100dvh-2rem)] max-w-[min(96vw,100dvw-2rem)] w-auto select-none rounded-lg object-contain shadow-[0_24px_80px_-20px_rgba(0,0,0,0.75)]"
            style={active.objectPosition ? { objectPosition: active.objectPosition } : undefined}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.3, ease: easeOut }}
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>
    ) : null;

  return (
    <>
      <div id="iec-comunidad" className="scroll-mt-28 sm:scroll-mt-32">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.45, ease: easeOut }}
          className="mb-3 text-center md:mb-4"
        >
          <h2
            id="iec-comunidad-heading"
            data-pdc-scroll-focus
            className="font-serif text-xl font-medium text-[#f4f1ec] md:text-2xl"
          >
            <span className="mb-1.5 block font-sans text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-secondary/80">
              En un hogar
            </span>
            Así nos reunimos
          </h2>
          <p className="mx-auto mt-2 max-w-sm font-sans text-xs text-white/45">
            Tocá una foto para ampliar.
          </p>
        </motion.header>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-6% 0px" }}
          transition={{ duration: 0.45, ease: easeOut }}
          className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5"
          role="list"
          aria-label="Fotos de Iglesia en casa"
          aria-live="polite"
        >
          {visible.map((photo, i) => (
            <div key={`iec-slot-${i}`} className="relative min-h-0" role="listitem">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#0a1018]/80 sm:rounded-xl">
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
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-6 flex justify-center md:mt-8"
      >
        <a href={formHref} target="_blank" rel="noopener noreferrer" className="pdc-btn-on-dark-accent max-w-none">
          <span className="relative z-[1]">Quiero conocer un grupo cerca mío</span>
        </a>
      </motion.div>

      {portalMounted ? createPortal(lightbox, document.body) : null}
    </>
  );
};
