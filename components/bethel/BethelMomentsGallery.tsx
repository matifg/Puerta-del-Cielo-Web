import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, Play, X } from "lucide-react";
import {
  BETHEL_GALLERY_DEFAULT_OBJECT_POSITION,
  BETHEL_GALLERY_ITEMS,
  bethelImageSrcSet,
  bethelImageSizes,
  bethelLightboxSizes,
  type BethelGalleryItem,
} from "../../data/bethelPhotos";

const BETHEL_LIGHTBOX_Z = "z-[10050]";
const mediaClass = "absolute inset-0 h-full w-full object-cover";

/* ─── Strip tile ─────────────────────────────────────────────── */
type StripTileProps = {
  item: BethelGalleryItem;
  eager?: boolean;
  onOpen: (idx: number) => void;
  idx: number;
  reduceMotion: boolean;
};

const StripTile: React.FC<StripTileProps> = ({ item, eager, onOpen, idx, reduceMotion }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = item.kind === "video";
  const mediaPosition = item.objectPosition ?? BETHEL_GALLERY_DEFAULT_OBJECT_POSITION;

  useEffect(() => {
    if (!isVideo) return;
    const v = videoRef.current;
    if (!v) return;
    v.loop = true;
    v.currentTime = 0;
    void v.play().catch(() => {});
    return () => { v.pause(); };
  }, [isVideo, item.id]);

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(idx)}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      className="group relative block h-full w-full shrink-0 overflow-hidden rounded-2xl border-0 bg-[#0a1018] text-left ring-1 ring-inset ring-white/10 transition-[box-shadow,ring-color] hover:ring-secondary/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
      aria-label={`${isVideo ? "Ver video" : "Ver foto"}: ${item.alt}`}
    >
      {isVideo ? (
        <video
          ref={videoRef}
          src={item.src}
          poster={item.poster}
          muted
          loop
          playsInline
          preload={eager ? "auto" : "metadata"}
          className={`${mediaClass} bg-[#0a1018]`}
          style={{ objectPosition: mediaPosition }}
        />
      ) : (
        <picture className="absolute inset-0 block">
          <source type="image/webp" srcSet={bethelImageSrcSet(item.id)} sizes={bethelImageSizes()} />
          <img
            src={item.src}
            alt=""
            aria-hidden
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className={`${mediaClass} transition duration-700 group-hover:scale-[1.03] motion-reduce:transition-none`}
            style={{ objectPosition: mediaPosition }}
          />
        </picture>
      )}

      {/* Gradiente inferior */}
      <span
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030508]/80 via-[#030508]/10 to-transparent"
        aria-hidden
      />

      {/* Ícono play */}
      {isVideo && (
        <span
          className="pointer-events-none absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-[#030508]/75 text-secondary backdrop-blur-sm"
          aria-hidden
        >
          <Play className="h-3.5 w-3.5 fill-current" />
        </span>
      )}

      {/* Caption inferior */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 px-3 pb-3 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        {item.eyebrow && (
          <span className="block font-sans text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-secondary/90">
            {item.eyebrow}
          </span>
        )}
        {item.title && (
          <span className="block font-serif text-sm leading-snug text-white/95">{item.title}</span>
        )}
      </span>

      {/* Ampliar */}
      <span
        className="pointer-events-none absolute right-2.5 bottom-2.5 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-[#030508]/80 text-secondary opacity-0 backdrop-blur-sm transition duration-300 group-hover:opacity-100"
        aria-hidden
      >
        <Maximize2 className="h-3 w-3" strokeWidth={2.25} />
      </span>
    </motion.button>
  );
};

/* ─── Lightbox ────────────────────────────────────────────────── */
type LightboxProps = {
  index: number;
  items: BethelGalleryItem[];
  onClose: () => void;
  onNav: (delta: number) => void;
  reduceMotion: boolean;
};

const Lightbox: React.FC<LightboxProps> = ({ index, items, onClose, onNav, reduceMotion }) => {
  const active = items[index];
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (active?.kind !== "video") return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    void v.play().catch(() => {});
  }, [index, active?.kind]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNav(-1);
      if (e.key === "ArrowRight") onNav(1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onNav]);

  if (!active) return null;

  return (
    <div
      className={`fixed inset-0 ${BETHEL_LIGHTBOX_Z} flex items-center justify-center bg-[#030508]/92 p-4 backdrop-blur-md sm:p-6`}
      role="dialog"
      aria-modal="true"
      aria-label={active.alt}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-[2] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#0a1524]/90 text-white/85 transition hover:border-secondary/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary sm:right-6 sm:top-6"
        aria-label="Cerrar"
      >
        <X className="h-5 w-5" aria-hidden />
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNav(-1); }}
        className="absolute left-2 top-1/2 z-[2] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0a1524]/90 text-white/85 transition hover:border-secondary/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary sm:left-4 md:left-6"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-6 w-6" aria-hidden />
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNav(1); }}
        className="absolute right-2 top-1/2 z-[2] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0a1524]/90 text-white/85 transition hover:border-secondary/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary sm:right-4 md:right-6"
        aria-label="Siguiente"
      >
        <ChevronRight className="h-6 w-6" aria-hidden />
      </button>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="flex max-h-[90dvh] max-w-[min(96vw,1200px)] flex-col items-center gap-3"
        >
          {active.kind === "video" ? (
            <video
              ref={videoRef}
              key={active.id}
              src={active.src}
              controls
              playsInline
              autoPlay
              muted={false}
              className="max-h-[80dvh] w-auto max-w-full rounded-xl bg-black shadow-[0_24px_80px_-20px_rgba(0,0,0,0.85)]"
            />
          ) : (
            <picture className="block">
              <source type="image/webp" srcSet={bethelImageSrcSet(active.id)} sizes={bethelLightboxSizes()} />
              <img
                key={active.id}
                src={active.src}
                alt={active.alt}
                className="max-h-[80dvh] w-auto max-w-full rounded-xl object-contain shadow-[0_24px_80px_-20px_rgba(0,0,0,0.85)]"
                draggable={false}
              />
            </picture>
          )}
          {/* Caption */}
          {(active.eyebrow || active.title) && (
            <div className="text-center">
              {active.eyebrow && (
                <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-secondary/80">
                  {active.eyebrow}
                </p>
              )}
              {active.title && (
                <p className="mt-0.5 font-serif text-base text-white/90">{active.title}</p>
              )}
            </div>
          )}
          {/* Contador */}
          <p className="font-sans text-xs text-white/35">
            {index + 1} / {items.length}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* Video siempre primero — constante estática, fuera del componente */
const orderedItems: BethelGalleryItem[] = [
  ...BETHEL_GALLERY_ITEMS.filter((i) => i.kind === "video"),
  ...BETHEL_GALLERY_ITEMS.filter((i) => i.kind === "image"),
];

/* ─── Strip principal ─────────────────────────────────────────── */
export function BethelMomentsGallery() {
  const reduceMotion = useReducedMotion() ?? false;
  const [portalMounted, setPortalMounted] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setPortalMounted(true); }, []);

  const openLightbox = useCallback((idx: number) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goLightbox = useCallback((delta: number) => {
    setLightboxIndex((i) =>
      i === null ? null : (i + delta + orderedItems.length) % orderedItems.length
    );
  }, []);

  /* Scroll del strip con botones */
  const scrollStrip = useCallback((dir: -1 | 1) => {
    const el = stripRef.current;
    if (!el) return;
    const tileW = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth + 12 : 280;
    el.scrollBy({ left: dir * tileW * 2, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="relative">
        {/* Flechas laterales — solo visibles en md+ */}
        <button
          type="button"
          onClick={() => scrollStrip(-1)}
          className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center h-10 w-10 rounded-full border border-white/15 bg-[#0a1524]/90 text-white/80 transition hover:border-secondary/35 hover:text-white md:flex"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => scrollStrip(1)}
          className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center h-10 w-10 rounded-full border border-white/15 bg-[#0a1524]/90 text-white/80 transition hover:border-secondary/35 hover:text-white md:flex"
          aria-label="Siguiente"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>

        {/* Strip */}
        <div
          ref={stripRef}
          className="flex gap-3 overflow-x-auto scroll-smooth pb-2 md:gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory" }}
          role="list"
          aria-label="Galería del encuentro Bethel"
        >
          {orderedItems.map((item, i) => (
            <div
              key={item.id}
              role="listitem"
              className="shrink-0"
              style={{
                scrollSnapAlign: "start",
                /* mobile: ~80vw, sm: ~45vw, md: ~32vw */
                width: "clamp(240px, 78vw, 360px)",
              }}
            >
              {/* Altura fija para consistencia visual */}
              <div className="h-[220px] sm:h-[260px] md:h-[300px] lg:h-[340px]">
                <StripTile
                  item={item}
                  eager={i < 4}
                  onOpen={openLightbox}
                  idx={i}
                  reduceMotion={reduceMotion}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Fade lateral derecho — indica que hay más */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#030508] to-transparent md:w-24"
          aria-hidden
        />
      </div>

      {/* Hint de swipe — mobile */}
      <p className="mt-3 text-center font-sans text-[0.7rem] text-white/30 md:hidden">
        Deslizá para ver más
      </p>

      {/* Lightbox */}
      {portalMounted && lightboxIndex !== null
        ? createPortal(
            <Lightbox
              index={lightboxIndex}
              items={orderedItems}
              onClose={closeLightbox}
              onNav={goLightbox}
              reduceMotion={reduceMotion}
            />,
            document.body
          )
        : null}
    </>
  );
}
