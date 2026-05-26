import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import { DISCIPULADO_MOMENTS, type DiscipuladoMoment } from "../data/discipuladoPhotos";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.48, ease: easeOut } },
};

type MomentCellProps = {
  photo: DiscipuladoMoment;
  index: number;
  onOpen: () => void;
  reduceMotion: boolean;
};

const MomentCell: React.FC<MomentCellProps> = ({ photo, index, onOpen, reduceMotion }) => (
  <motion.button
    type="button"
    variants={staggerItem}
    onClick={onOpen}
    whileHover={reduceMotion ? undefined : { y: -3 }}
    whileTap={reduceMotion ? undefined : { scale: 0.99 }}
    className="group flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a1018]/80 text-left shadow-[0_20px_50px_-24px_rgba(0,0,0,0.75)] transition-colors hover:border-secondary/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
    aria-label={`${photo.caption}: ver foto ampliada. ${photo.alt}`}
  >
    <span className="relative block aspect-[4/3] w-full overflow-hidden">
      <img
        src={photo.src}
        alt=""
        aria-hidden
        loading={index < 2 ? "eager" : "lazy"}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
        style={photo.objectPosition ? { objectPosition: photo.objectPosition } : undefined}
      />
      <span
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030508]/50 via-transparent to-[#030508]/15"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-[#030508]/75 text-secondary opacity-90 shadow-md backdrop-blur-sm transition group-hover:border-secondary/40 group-hover:bg-[#0a1524]/90 group-focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100"
        aria-hidden
      >
        <Maximize2 className="h-4 w-4" strokeWidth={2.25} />
      </span>
    </span>
    <span className="border-t border-white/[0.08] bg-[#0a1018]/95 px-3 py-2.5 font-sans text-sm font-medium text-white/85 transition group-hover:text-white md:px-4 md:py-3">
      {photo.caption}
    </span>
  </motion.button>
);

type DiscipuladoMomentsBentoProps = {
  className?: string;
};

export const DiscipuladoMomentsBento: React.FC<DiscipuladoMomentsBentoProps> = ({ className = "" }) => {
  const reduceMotion = useReducedMotion() ?? false;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
    <div className={className}>
      <motion.p
        variants={staggerItem}
        className="mb-2 text-center font-sans text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-secondary/80"
      >
        En el salón
      </motion.p>
      <motion.h3 variants={staggerItem} className="mb-2 text-center font-serif text-xl text-white md:text-2xl">
        Así se vive el programa
      </motion.h3>
      <motion.p variants={staggerItem} className="mx-auto max-w-lg text-center font-sans text-sm text-white/65">
        Encuentros quincenales, comunidad y formación en un mismo espacio.
      </motion.p>
      <motion.p
        variants={staggerItem}
        className="mx-auto mb-8 mt-3 max-w-md text-center font-sans text-sm text-white/50"
      >
        Tocá una foto para verla en grande.
      </motion.p>

      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:gap-4">
        {DISCIPULADO_MOMENTS.map((photo, i) => (
          <MomentCell
            key={photo.id}
            photo={photo}
            index={i}
            reduceMotion={reduceMotion}
            onOpen={() => setLightboxIndex(i)}
          />
        ))}
      </div>

      <AnimatePresence>
        {active && lightboxIndex !== null ? (
          <motion.div
            key="disc-lightbox"
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
              className="absolute right-4 top-4 z-[1] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#0a1524]/90 text-white/85 transition hover:border-secondary/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary sm:right-6 sm:top-6"
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
              <img
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
    </div>
  );
};
