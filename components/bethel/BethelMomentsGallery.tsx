import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, Play, X } from "lucide-react";
import {
  BETHEL_GALLERY_ITEMS,
  BETHEL_GALLERY_ROTATE_MS,
  BETHEL_GALLERY_VIDEO_PREVIEW_MS,
  BETHEL_GALLERY_VISIBLE_COUNT,
  type BethelGalleryItem,
} from "../../data/bethelPhotos";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];
const easeReveal: [number, number, number, number] = [0.33, 1, 0.45, 1];
const BETHEL_LIGHTBOX_Z = "z-[10050]";

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

/** Seis ítems distintos; al menos un video en posición aleatoria si hay clips */
function buildInitialVisible(): BethelGalleryItem[] {
  const count = Math.min(BETHEL_GALLERY_VISIBLE_COUNT, BETHEL_GALLERY_ITEMS.length);
  const videos = BETHEL_GALLERY_ITEMS.filter((i) => i.kind === "video");
  const images = BETHEL_GALLERY_ITEMS.filter((i) => i.kind === "image");
  const picked: BethelGalleryItem[] = [];

  if (videos.length > 0) {
    picked.push(videos[Math.floor(Math.random() * videos.length)]);
  }

  for (const img of shuffle(images)) {
    if (picked.length >= count) break;
    if (!picked.some((p) => p.id === img.id)) picked.push(img);
  }

  for (const vid of shuffle(videos)) {
    if (picked.length >= count) break;
    if (!picked.some((p) => p.id === vid.id)) picked.push(vid);
  }

  return shuffle(picked).slice(0, count);
}

/** Nunca repite un ítem que ya esté en otro hueco */
function pickReplacement(
  pool: readonly BethelGalleryItem[],
  visible: readonly BethelGalleryItem[],
  slotItemId: string
): BethelGalleryItem | null {
  const visibleIds = new Set(visible.map((p) => p.id));
  const candidates = pool.filter((p) => p.id !== slotItemId && !visibleIds.has(p.id));
  if (candidates.length === 0) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

/** Tras un video: otro clip si hay; si no, foto */
function pickReplacementAfterVideo(
  pool: readonly BethelGalleryItem[],
  visible: readonly BethelGalleryItem[],
  slotItemId: string
): BethelGalleryItem | null {
  const visibleIds = new Set(visible.map((p) => p.id));
  const otherVideos = pool.filter(
    (p) => p.kind === "video" && p.id !== slotItemId && !visibleIds.has(p.id)
  );
  if (otherVideos.length > 0) {
    return otherVideos[Math.floor(Math.random() * otherVideos.length)];
  }
  const images = pool.filter(
    (p) => p.kind === "image" && p.id !== slotItemId && !visibleIds.has(p.id)
  );
  if (images.length > 0) return images[Math.floor(Math.random() * images.length)];
  return pickReplacement(pool, visible, slotItemId);
}

function pickVideoForSlot(
  pool: readonly BethelGalleryItem[],
  visible: readonly BethelGalleryItem[],
  slotItemId: string
): BethelGalleryItem | null {
  const visibleIds = new Set(visible.map((p) => p.id));
  const videos = pool.filter((p) => p.kind === "video" && p.id !== slotItemId && !visibleIds.has(p.id));
  if (videos.length > 0) return videos[Math.floor(Math.random() * videos.length)];
  return null;
}

function itemPoolIndex(item: BethelGalleryItem) {
  return BETHEL_GALLERY_ITEMS.findIndex((p) => p.id === item.id);
}

type MediaTileProps = {
  item: BethelGalleryItem;
  eager?: boolean;
  playVideo: boolean;
  onOpen: (poolIndex: number) => void;
  reduceMotion: boolean;
};

const MediaTile: React.FC<MediaTileProps> = ({
  item,
  eager = false,
  playVideo,
  onOpen,
  reduceMotion,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = item.kind === "video";

  useEffect(() => {
    if (!isVideo || !playVideo) return;
    const video = videoRef.current;
    if (!video) return;

    video.loop = true;
    video.currentTime = 0;
    void video.play().catch(() => {});

    return () => {
      video.pause();
    };
  }, [isVideo, playVideo, item.id]);

  const expandLabel = isVideo ? "Ver video ampliado" : "Ver foto ampliada";

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(itemPoolIndex(item))}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      className="group relative block h-full w-full overflow-hidden border-0 bg-[#0a1018]/80 text-left shadow-[0_16px_40px_-20px_rgba(0,0,0,0.75)] ring-1 ring-inset ring-white/10 transition-[box-shadow,ring-color] hover:ring-secondary/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
      aria-label={`${expandLabel}: ${item.alt}`}
    >
      <span className="relative block h-full w-full overflow-hidden">
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
          />
        ) : (
          <img
            src={item.src}
            alt=""
            aria-hidden
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className={`${mediaClass} transition duration-700 group-hover:scale-[1.02] motion-reduce:transition-none`}
          />
        )}
        <span
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030508]/75 via-[#030508]/15 to-[#030508]/25"
          aria-hidden
        />
        {isVideo ? (
          <span
            className="pointer-events-none absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-[#030508]/75 text-secondary backdrop-blur-sm"
            aria-hidden
          >
            <Play className="h-3 w-3 fill-current" />
          </span>
        ) : null}
        <span
          className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 px-2.5 py-2 opacity-100 transition duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100"
          aria-hidden
        >
          <span className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-white/90">
            {isVideo ? "Video" : "Ampliar"}
          </span>
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 bg-[#030508]/80 text-secondary backdrop-blur-sm">
            <Maximize2 className="h-2.5 w-2.5" strokeWidth={2.25} />
          </span>
        </span>
      </span>
    </motion.button>
  );
};

export function BethelMomentsGallery() {
  const reduceMotion = useReducedMotion() ?? false;
  const [portalMounted, setPortalMounted] = useState(false);
  const [visible, setVisible] = useState<BethelGalleryItem[]>(buildInitialVisible);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const videoTimerRef = useRef<Map<number, ReturnType<typeof window.setTimeout>>>(new Map());
  const lightboxOpenRef = useRef(false);
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);
  const replaceSlotRef = useRef<(slot: number, afterVideo?: boolean) => void>(() => {});

  useEffect(() => {
    setPortalMounted(true);
  }, []);

  const rotationPaused = lightboxIndex !== null;

  useEffect(() => {
    lightboxOpenRef.current = lightboxIndex !== null;
  }, [lightboxIndex]);
  const slotMotion = reduceMotion ? tileMotionReduced : tileMotion;
  const playGridVideo = !reduceMotion;

  /** Solo cambia cuando entra/sale un video o cambia el clip; las fotos no reinician el timer */
  const videoSlotsKey = useMemo(
    () =>
      visible
        .map((item, i) => (item.kind === "video" ? `${i}:${item.id}` : null))
        .filter((s): s is string => s !== null)
        .join("|"),
    [visible]
  );

  const replaceSlot = useCallback((slotIndex: number, afterVideo = false) => {
    setVisible((prev) => {
      const current = prev[slotIndex];
      if (!current) return prev;
      const replacement = afterVideo
        ? pickReplacementAfterVideo(BETHEL_GALLERY_ITEMS, prev, current.id)
        : pickReplacement(BETHEL_GALLERY_ITEMS, prev, current.id);
      if (!replacement) return prev;
      const next = [...prev];
      next[slotIndex] = replacement;
      return next;
    });
  }, []);

  useEffect(() => {
    replaceSlotRef.current = replaceSlot;
  }, [replaceSlot]);

  const clearVideoTimers = useCallback(() => {
    videoTimerRef.current.forEach((id) => window.clearTimeout(id));
    videoTimerRef.current.clear();
  }, []);

  const scheduleVideoRotation = useCallback((slotIndex: number) => {
    const prev = videoTimerRef.current.get(slotIndex);
    if (prev) window.clearTimeout(prev);

    const id = window.setTimeout(() => {
      if (lightboxOpenRef.current) return;
      replaceSlotRef.current(slotIndex, true);
    }, BETHEL_GALLERY_VIDEO_PREVIEW_MS);

    videoTimerRef.current.set(slotIndex, id);
  }, []);

  useEffect(() => {
    if (rotationPaused) {
      clearVideoTimers();
      return;
    }

    const videoSlotIndices: number[] = [];
    visible.forEach((item, i) => {
      if (item.kind === "video") videoSlotIndices.push(i);
    });

    videoTimerRef.current.forEach((tid, slot) => {
      if (!videoSlotIndices.includes(slot)) {
        window.clearTimeout(tid);
        videoTimerRef.current.delete(slot);
      }
    });

    videoSlotIndices.forEach((i) => scheduleVideoRotation(i));
  }, [videoSlotsKey, rotationPaused, scheduleVideoRotation, clearVideoTimers]);

  useEffect(() => () => clearVideoTimers(), [clearVideoTimers]);

  useEffect(() => {
    if (rotationPaused) return;

    const tick = () => {
      setVisible((prev) => {
        const imageSlots = prev.map((_, i) => i).filter((i) => prev[i]?.kind === "image");
        if (imageSlots.length === 0) return prev;

        const hasVideo = prev.some((p) => p.kind === "video");
        const targetSlot = imageSlots[Math.floor(Math.random() * imageSlots.length)];
        const current = prev[targetSlot];
        let replacement: BethelGalleryItem | null = null;

        if (!hasVideo) {
          replacement = pickVideoForSlot(BETHEL_GALLERY_ITEMS, prev, current.id);
        }
        if (!replacement) {
          replacement = pickReplacement(BETHEL_GALLERY_ITEMS, prev, current.id);
        }
        if (!replacement || replacement.kind === "video") return prev;

        const next = [...prev];
        next[targetSlot] = replacement;
        return next;
      });
    };

    const id = window.setInterval(tick, BETHEL_GALLERY_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [rotationPaused]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goLightbox = useCallback((delta: number) => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      return (i + delta + BETHEL_GALLERY_ITEMS.length) % BETHEL_GALLERY_ITEMS.length;
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

  const active = lightboxIndex !== null ? BETHEL_GALLERY_ITEMS[lightboxIndex] : null;

  useEffect(() => {
    if (lightboxIndex === null || active?.kind !== "video") return;
    const video = lightboxVideoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1;
    void video.play().catch(() => {});
  }, [lightboxIndex, active?.id, active?.kind]);

  const lightbox =
    portalMounted && active && lightboxIndex !== null ? (
      <div
        className={`fixed inset-0 ${BETHEL_LIGHTBOX_Z} flex items-center justify-center bg-[#030508]/92 p-4 backdrop-blur-md sm:p-6`}
        role="dialog"
        aria-modal="true"
        aria-label={active.alt}
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
          className="absolute left-2 top-1/2 z-[2] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0a1524]/90 text-white/85 transition hover:border-secondary/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary sm:left-4 md:left-6"
          aria-label="Anterior"
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
          aria-label="Siguiente"
        >
          <ChevronRight className="h-6 w-6" aria-hidden />
        </button>

        {active.kind === "video" ? (
          <video
            ref={lightboxVideoRef}
            key={active.id}
            src={active.src}
            controls
            playsInline
            autoPlay
            muted={false}
            className="max-h-[min(92vh,100dvh-2rem)] max-w-[min(96vw,100dvw-2rem)] w-auto select-none rounded-lg bg-black shadow-[0_24px_80px_-20px_rgba(0,0,0,0.75)]"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <img
            key={active.id}
            src={active.src}
            alt={active.alt}
            className="max-h-[min(92vh,100dvh-2rem)] max-w-[min(96vw,100dvw-2rem)] w-auto select-none rounded-lg object-contain shadow-[0_24px_80px_-20px_rgba(0,0,0,0.75)]"
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />
        )}
      </div>
    ) : null;

  return (
    <>
      <div className="lg:max-2xl:flex lg:max-2xl:min-h-0 lg:max-2xl:flex-1 lg:max-2xl:flex-col 2xl:block 2xl:flex-none">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mb-4 max-w-md shrink-0 text-center font-sans text-xs text-white/45 lg:max-2xl:sr-only 2xl:mb-5"
        >
          Tocá una foto o video para ampliar.
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-6% 0px" }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="mx-auto grid w-full max-w-4xl grid-cols-3 gap-1.5 sm:gap-2 md:gap-2.5 lg:max-2xl:min-h-0 lg:max-2xl:max-w-none lg:max-2xl:flex-1 lg:max-2xl:grid-rows-2 lg:max-2xl:gap-3.5 lg:max-2xl:px-1 2xl:max-w-[min(88vw,84rem)] 2xl:flex-none 2xl:grid-rows-none 2xl:gap-6"
          role="list"
          aria-label="Fotos y videos del encuentro Bethel. Tocá una foto o video para ampliar."
          aria-live="polite"
        >
        {visible.map((item, i) => (
          <div key={`bethel-slot-${i}`} className="relative min-h-0 lg:max-2xl:h-full" role="listitem">
            <div className="relative w-full overflow-hidden rounded-lg bg-[#0a1018]/80 max-lg:h-[4.5rem] max-lg:sm:h-[5.25rem] max-lg:md:h-[6rem] lg:max-2xl:h-full lg:max-2xl:rounded-xl 2xl:aspect-[4/3] 2xl:rounded-2xl">
              <AnimatePresence initial={false}>
                <motion.div
                  key={item.id}
                  className="absolute inset-0"
                  initial={slotMotion.initial}
                  animate={slotMotion.animate}
                  exit={slotMotion.exit}
                  transition={slotMotion.transition}
                >
                  <MediaTile
                    item={item}
                    eager={i < 3}
                    playVideo={playGridVideo && item.kind === "video"}
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

      {portalMounted ? createPortal(lightbox, document.body) : null}
    </>
  );
}
