import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronUp, Images, Maximize2, X } from "lucide-react";
import {
  CELULA_GALLERY_FOLDER,
  CELULA_PHOTOS,
  type CelulaPhoto,
} from "../data/celulaPhotos";
import { PdcGalleryLightboxPicture, PdcGalleryPicture } from "./PdcGalleryPicture";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];
const IEC_LIGHTBOX_Z = "z-[10050]";
const FOTOS_INICIALES = 4;
const mediaClass = "absolute inset-0 h-full w-full object-cover";

type PhotoTileProps = {
  photo: CelulaPhoto;
  eager?: boolean;
  onOpen: (poolIndex: number) => void;
  reduceMotion: boolean;
};

const PhotoTile: React.FC<PhotoTileProps> = ({ photo, eager = false, onOpen, reduceMotion }) => {
  const poolIndex = CELULA_PHOTOS.findIndex((p) => p.id === photo.id);

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(poolIndex)}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      className="group relative block h-full w-full overflow-hidden rounded-2xl border-0 bg-[#0a1018]/80 text-left ring-1 ring-inset ring-white/10 transition-[box-shadow,ring-color] hover:ring-secondary/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
      aria-label={`Ver foto ampliada: ${photo.alt}`}
    >
      <span className="relative block aspect-[4/3] w-full overflow-hidden">
        <PdcGalleryPicture
          folder={CELULA_GALLERY_FOLDER}
          slug={photo.slug}
          fallbackSrc={photo.src}
          ariaHidden
          loading={eager ? "eager" : "lazy"}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
          className={`${mediaClass} transition duration-700 group-hover:scale-[1.03] motion-reduce:transition-none`}
          style={photo.objectPosition ? { objectPosition: photo.objectPosition } : undefined}
        />
        <span
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030508]/55 via-transparent to-[#030508]/10"
          aria-hidden
        />
        {photo.caption ? (
          <span className="pointer-events-none absolute inset-x-0 bottom-0 px-3 pb-3 opacity-0 transition duration-300 group-hover:opacity-100 md:px-4 md:pb-4">
            <span className="block font-sans text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-secondary/90">
              {photo.caption}
            </span>
          </span>
        ) : null}
        <span
          className="pointer-events-none absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-[#030508]/75 text-secondary opacity-95 backdrop-blur-sm"
          aria-hidden
        >
          <Maximize2 className="h-3 w-3" strokeWidth={2.25} />
        </span>
      </span>
    </motion.button>
  );
};

type IecComunidadGalleryProps = {
  formHref: string;
  className?: string;
};

export const IecComunidadGallery: React.FC<IecComunidadGalleryProps> = ({
  formHref,
  className = "",
}) => {
  const reduceMotion = useReducedMotion() ?? false;
  const [portalMounted, setPortalMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibles = expanded ? CELULA_PHOTOS : CELULA_PHOTOS.slice(0, FOTOS_INICIALES);
  const hayMas = CELULA_PHOTOS.length > FOTOS_INICIALES;

  useEffect(() => {
    setPortalMounted(true);
  }, []);

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
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-[2] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#0a1524]/90 text-white/85 transition hover:border-secondary/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary sm:right-6 sm:top-6"
            aria-label="Cerrar foto"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>

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

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.3, ease: easeOut }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[90dvh] max-w-[min(96vw,1200px)] flex-col items-center gap-3"
          >
            <PdcGalleryLightboxPicture
              folder={CELULA_GALLERY_FOLDER}
              slug={active.slug}
              fallbackSrc={active.src}
              alt={active.alt}
              className="max-h-[min(80vh,100dvh-6rem)] max-w-[min(96vw,100dvw-2rem)] w-auto select-none rounded-xl object-contain shadow-[0_24px_80px_-20px_rgba(0,0,0,0.75)]"
              style={active.objectPosition ? { objectPosition: active.objectPosition } : undefined}
            />
            {active.caption ? (
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-secondary/80">
                {active.caption}
              </p>
            ) : null}
            <p className="font-sans text-xs text-white/35">
              {lightboxIndex + 1} / {CELULA_PHOTOS.length}
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    ) : null;

  return (
    <>
      <div id="iec-comunidad" className={`scroll-mt-28 sm:scroll-mt-32 ${className}`.trim()}>
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.45, ease: easeOut }}
          className="mb-6 text-center md:mb-8"
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
          <p className="mx-auto mt-2 max-w-sm font-sans text-xs text-white/45 md:text-sm">
            Tocá una foto para ampliar.
          </p>
        </motion.header>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-6% 0px" }}
          transition={{ duration: 0.45, ease: easeOut }}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:gap-5"
          role="list"
          aria-label="Fotos de Iglesia en casa"
        >
          {visibles.map((photo, i) => (
            <div key={photo.id} role="listitem">
              <PhotoTile
                photo={photo}
                eager={i < 2}
                onOpen={setLightboxIndex}
                reduceMotion={reduceMotion}
              />
            </div>
          ))}
        </motion.div>

        {hayMas ? (
          <div className="mt-5 flex justify-center md:mt-6">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="pdc-btn-on-dark-ghost inline-flex items-center gap-2"
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

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-[1] mt-8 flex justify-center md:mt-10"
        >
          <a
            href={formHref}
            target="_blank"
            rel="noopener noreferrer"
            className="pdc-btn-on-dark-accent max-w-none"
          >
            <span className="relative z-[1]">Quiero conocer un grupo cerca mío</span>
          </a>
        </motion.div>
      </div>

      {portalMounted ? createPortal(lightbox, document.body) : null}
    </>
  );
};
