import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, HandHeart, X } from "lucide-react";
import {
  SERVICIO_COMUNIDAD_GALLERY,
  SERVICIO_COMUNIDAD_SCENES,
  type ServicioPhoto,
} from "../data/servicioComunidadPhotos";
import { PdcGalleryPicture } from "./PdcGalleryPicture";
import {
  PdcSectionEyebrow,
  pdcHeaderScrollMarginTop,
  pdcPageHeroTopComfort,
  pdcPageInnerClass,
  pdcPageTitleClass,
  pdcPageTitleLineClass,
} from "./PdcSectionHeader";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const SVC_FOOTER_ROOT_ID = "svc-footer-root";
const GALLERY_ID = "svc-galeria";
const STORIES_ID = "svc-historias";

const FEED_PHOTOS = SERVICIO_COMUNIDAD_GALLERY.slice(0, 6);
const FEED_AUTO_MS = 5000;
/** Visor fullscreen: avance lento tipo historia IG */
const STORY_AUTO_MS = 8200;
/** Anillo de la fila: “carga” lenta al entrar en vista */
const STORY_RING_LOAD_S = 3.4;

type Story = {
  id: string;
  photo: ServicioPhoto;
  eyebrow: string;
  title: string;
  verse: string;
  verseRef: string;
};

const stories: Story[] = [
  {
    id: "svc-p1",
    photo: SERVICIO_COMUNIDAD_SCENES[0],
    eyebrow: "En la calle",
    title: "Dar no es un discurso",
    verse:
      "Les digo la verdad, cuando hicieron alguna de estas cosas al más insignificante de estos, mis hermanos, ¡me lo hicieron a mí!",
    verseRef: "Mateo 25:40 (NTV)",
  },
  {
    id: "svc-p2",
    photo: SERVICIO_COMUNIDAD_SCENES[1],
    eyebrow: "Juntos",
    title: "La iglesia que camina",
    verse: "Todos ustedes en conjunto son el cuerpo de Cristo, y cada uno de ustedes es parte de ese cuerpo.",
    verseRef: "1 Corintios 12:27 (NTV)",
  },
  {
    id: "svc-p3",
    photo: SERVICIO_COMUNIDAD_SCENES[2],
    eyebrow: "Cercanía",
    title: "Historias que importan",
    verse:
      "Ayúdense a llevar los unos las cargas de los otros, y obedezcan de esa manera la ley de Cristo.",
    verseRef: "Gálatas 6:2 (NTV)",
  },
  {
    id: "svc-p4",
    photo: SERVICIO_COMUNIDAD_SCENES[3],
    eyebrow: "Impacto",
    title: "Sembrar esperanza",
    verse:
      "Así que no nos cansemos de hacer el bien. A su debido tiempo, cosecharemos numerosas bendiciones si no nos damos por vencidos.",
    verseRef: "Gálatas 6:9 (NTV)",
  },
];

function scrollToId(id: string, reduceMotion: boolean) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 112;
  window.scrollTo({
    top: Math.max(0, top),
    behavior: reduceMotion ? "auto" : "smooth",
  });
}

/** Anillo SVG: carga lenta → listo; visto = gris. */
const StoryAvatarRing: React.FC<{
  story: Story;
  index: number;
  seen: boolean;
  reduceMotion: boolean;
  onOpen: () => void;
}> = ({ story, index, seen, reduceMotion, onOpen }) => {
  const size = 72;
  const stroke = 2.5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const gradId = `svc-story-ring-grad-${story.id}`;

  return (
    <li className="flex w-[4.5rem] flex-col items-center gap-2 sm:w-[4.75rem]">
      <button
        type="button"
        onClick={onOpen}
        className="group flex w-full flex-col items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        aria-label={`Abrir historia: ${story.title}`}
      >
        <span className="relative block h-[4.5rem] w-[4.5rem] transition-transform duration-300 group-hover:scale-[1.04] sm:h-[4.75rem] sm:w-[4.75rem]">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
            viewBox={`0 0 ${size} ${size}`}
            aria-hidden
          >
            <defs>
              <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#40c2de" />
                <stop offset="45%" stopColor="#9ae4f2" />
                <stop offset="100%" stopColor="#40c2de" stopOpacity="0.55" />
              </linearGradient>
            </defs>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={stroke}
            />
            {seen ? (
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke="rgba(255,255,255,0.28)"
                strokeWidth={stroke}
              />
            ) : (
              <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={`url(#${gradId})`}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={c}
                initial={{ strokeDashoffset: reduceMotion ? 0 : c }}
                whileInView={{ strokeDashoffset: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: reduceMotion ? 0.01 : STORY_RING_LOAD_S,
                  delay: reduceMotion ? 0 : index * 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            )}
          </svg>

          {/* Halo suave que “respira” mientras / después de cargar */}
          {!seen && !reduceMotion ? (
            <span
              className="svc-story-halo pointer-events-none absolute inset-[-2px] rounded-full"
              style={{ animationDelay: `${index * 0.45 + STORY_RING_LOAD_S * 0.35}s` }}
              aria-hidden
            />
          ) : null}

          <span className="absolute inset-[5px] overflow-hidden rounded-full bg-[#17130e] ring-1 ring-white/10 sm:inset-[6px]">
            <PdcGalleryPicture
              folder={story.photo.folder}
              slug={story.photo.slug}
              fallbackSrc={story.photo.src}
              ariaHidden
              loading="lazy"
              sizes="72px"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </span>
        </span>
        <span className="w-full truncate text-center font-sans text-[0.68rem] font-medium leading-tight text-white/75">
          {story.eyebrow}
        </span>
      </button>
    </li>
  );
};

const ServicioComunidadSection: React.FC = () => {
  const reduceMotion = useReducedMotion() ?? false;

  const [feedIndex, setFeedIndex] = useState(0);
  const [feedPaused, setFeedPaused] = useState(false);
  const [feedKey, setFeedKey] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const [storyIndex, setStoryIndex] = useState<number | null>(null);
  const [storyKey, setStoryKey] = useState(0);
  const [seenStories, setSeenStories] = useState<Record<string, boolean>>({});

  const feedCount = FEED_PHOTOS.length;
  const storyCount = stories.length;

  const goFeed = useCallback(
    (delta: number) => {
      setFeedIndex((i) => (i + delta + feedCount) % feedCount);
      setFeedKey((k) => k + 1);
    },
    [feedCount]
  );

  useEffect(() => {
    if (feedCount <= 1 || reduceMotion || feedPaused || storyIndex !== null) return;
    const id = window.setInterval(() => {
      setFeedIndex((i) => (i + 1) % feedCount);
      setFeedKey((k) => k + 1);
    }, FEED_AUTO_MS);
    return () => window.clearInterval(id);
  }, [feedCount, reduceMotion, feedPaused, storyIndex]);

  const openStory = useCallback((i: number) => {
    const s = stories[i];
    if (s) setSeenStories((prev) => ({ ...prev, [s.id]: true }));
    setStoryIndex(i);
    setStoryKey((k) => k + 1);
  }, []);

  const closeStory = useCallback(() => setStoryIndex(null), []);

  const goStory = useCallback(
    (delta: number) => {
      setStoryIndex((i) => {
        if (i === null) return null;
        const next = i + delta;
        if (next < 0 || next >= storyCount) return null;
        const s = stories[next];
        if (s) setSeenStories((prev) => ({ ...prev, [s.id]: true }));
        return next;
      });
      setStoryKey((k) => k + 1);
    },
    [storyCount]
  );

  useEffect(() => {
    if (storyIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeStory();
      if (e.key === "ArrowLeft") goStory(-1);
      if (e.key === "ArrowRight") goStory(1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [storyIndex, closeStory, goStory]);

  useEffect(() => {
    if (storyIndex === null || reduceMotion) return;
    const id = window.setTimeout(() => {
      if (storyIndex >= storyCount - 1) closeStory();
      else goStory(1);
    }, STORY_AUTO_MS);
    return () => window.clearTimeout(id);
  }, [storyIndex, storyKey, reduceMotion, storyCount, closeStory, goStory]);

  const fadeUp: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: reduceMotion ? 0.1 : 0.45, ease: easeOut },
      },
    }),
    [reduceMotion]
  );

  const heroStagger: Variants = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.07,
          delayChildren: reduceMotion ? 0 : 0.04,
        },
      },
    }),
    [reduceMotion]
  );

  const feedPhoto = FEED_PHOTOS[feedIndex];
  const activeStory = storyIndex !== null ? stories[storyIndex] : null;

  return (
    <div className="relative bg-[#0e0b08]">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .svc-story-halo {
            opacity: 0;
            background: radial-gradient(circle, rgba(64,194,222,0.35) 0%, transparent 68%);
            animation: svc-story-halo-in 0.9s ease-out forwards, svc-story-halo-breathe 3.8s ease-in-out infinite;
          }
          @keyframes svc-story-halo-in {
            from { opacity: 0; transform: scale(0.92); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes svc-story-halo-breathe {
            0%, 100% { opacity: 0.35; }
            50% { opacity: 0.7; }
          }
        }
      `}</style>

      <header
        id="svc-hero"
        className={`relative px-4 pb-10 text-center sm:px-6 sm:pb-12 ${pdcPageHeroTopComfort} ${pdcHeaderScrollMarginTop}`}
      >
        <motion.div
          className="mx-auto flex w-full max-w-2xl flex-col items-center"
          variants={heroStagger}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp}>
            <PdcSectionEyebrow label="Área de servicio" icon={HandHeart} className="mb-3" />
          </motion.div>
          <motion.h1 variants={fadeUp} className={pdcPageTitleClass}>
            <span className={pdcPageTitleLineClass}>Servicio a la Comunidad</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-lg font-serif text-lg leading-relaxed text-white/85 md:text-xl"
          >
            “Hay más dicha en dar que en recibir.”
          </motion.p>
          <motion.p variants={fadeUp} className="mt-2 font-serif text-sm text-white/50">
            — Hechos 20:35 (NTV)
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8">
            <button
              type="button"
              onClick={() => scrollToId(GALLERY_ID, reduceMotion)}
              className="pdc-btn-on-dark-accent max-w-none"
            >
              <ChevronDown className="relative z-[1] h-5 w-5 shrink-0" strokeWidth={2.5} aria-hidden />
              <span className="relative z-[1]">Ver el trabajo</span>
            </button>
          </motion.div>
        </motion.div>
      </header>

      {/* Carrusel feed — un poco más grande, borde más limpio */}
      <section
        id={GALLERY_ID}
        className={`border-t border-white/[0.06] py-12 md:py-16 ${pdcHeaderScrollMarginTop}`}
        aria-labelledby="svc-galeria-heading"
      >
        <div className={pdcPageInnerClass}>
          <motion.div
            className="mx-auto mb-9 max-w-xl text-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={fadeUp}
          >
            <h2 id="svc-galeria-heading" className="font-serif text-2xl text-white md:text-[1.75rem]">
              En la comunidad
            </h2>
            <p className="mt-2 font-sans text-sm text-white/55">Deslizá para ver más momentos.</p>
          </motion.div>

          <motion.div
            className="mx-auto w-full max-w-[22rem] sm:max-w-[24rem]"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            onMouseEnter={() => setFeedPaused(true)}
            onMouseLeave={() => setFeedPaused(false)}
          >
            <div
              className="relative overflow-hidden rounded-2xl bg-[#14110d] shadow-[0_20px_48px_-28px_rgba(0,0,0,0.8)] ring-1 ring-white/[0.12]"
              role="region"
              aria-roledescription="carousel"
              aria-label="Fotos de servicio"
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0]?.clientX ?? null;
              }}
              onTouchEnd={(e) => {
                const start = touchStartX.current;
                touchStartX.current = null;
                if (start == null) return;
                const dx = (e.changedTouches[0]?.clientX ?? start) - start;
                if (Math.abs(dx) < 40) return;
                goFeed(dx < 0 ? 1 : -1);
              }}
            >
              {/* Progreso arriba, estilo IG */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] flex gap-[3px] px-2.5 pt-2.5" aria-hidden>
                {FEED_PHOTOS.map((p, i) => (
                  <div key={p.id} className="h-[2.5px] flex-1 overflow-hidden rounded-full bg-white/25">
                    {!reduceMotion && i === feedIndex ? (
                      <motion.div
                        key={feedKey}
                        className="h-full rounded-full bg-white"
                        initial={{ width: "0%" }}
                        animate={{ width: feedPaused ? undefined : "100%" }}
                        transition={{
                          duration: feedPaused ? 0 : FEED_AUTO_MS / 1000,
                          ease: "linear",
                        }}
                        style={feedPaused ? { width: "40%" } : undefined}
                      />
                    ) : (
                      <div
                        className={`h-full rounded-full ${
                          i < feedIndex || (reduceMotion && i === feedIndex) ? "bg-white/90" : "bg-transparent"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="relative aspect-square w-full">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={feedPhoto.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0.08 : 0.28 }}
                  >
                    <PdcGalleryPicture
                      folder={feedPhoto.folder}
                      slug={feedPhoto.slug}
                      fallbackSrc={feedPhoto.src}
                      alt={feedPhoto.alt}
                      loading={feedIndex === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 640px) 88vw, 24rem"
                      className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                  </motion.div>
                </AnimatePresence>

                <button
                  type="button"
                  className="absolute inset-y-0 left-0 z-[1] w-1/3 bg-transparent"
                  aria-label="Foto anterior"
                  onClick={() => goFeed(-1)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 z-[1] w-1/3 bg-transparent"
                  aria-label="Foto siguiente"
                  onClick={() => goFeed(1)}
                />

                <button
                  type="button"
                  onClick={() => goFeed(-1)}
                  className="absolute left-2 top-1/2 z-[2] hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#0e0b08]/45 text-white/95 backdrop-blur-md ring-1 ring-white/18 sm:flex"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => goFeed(1)}
                  className="absolute right-2 top-1/2 z-[2] hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#0e0b08]/45 text-white/95 backdrop-blur-md ring-1 ring-white/18 sm:flex"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Historias: más grandes + anillo de carga lento */}
      <section
        id={STORIES_ID}
        className={`border-t border-white/[0.06] py-12 md:py-16 ${pdcHeaderScrollMarginTop}`}
        aria-labelledby="svc-historias-heading"
      >
        <div className={pdcPageInnerClass}>
          <motion.div
            className="mx-auto mb-9 max-w-xl text-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={fadeUp}
          >
            <h2 id="svc-historias-heading" className="font-serif text-2xl text-white md:text-[1.75rem]">
              Historias
            </h2>
            <p className="mt-2 font-sans text-sm text-white/55">Tocá una para leer la palabra que acompaña.</p>
          </motion.div>

          <ul
            className="mx-auto flex max-w-lg flex-wrap justify-center gap-x-5 gap-y-4 sm:gap-x-6"
            role="list"
            aria-label="Historias de servicio"
          >
            {stories.map((story, i) => (
              <StoryAvatarRing
                key={story.id}
                story={story}
                index={i}
                seen={Boolean(seenStories[story.id])}
                reduceMotion={reduceMotion}
                onOpen={() => openStory(i)}
              />
            ))}
          </ul>
        </div>
      </section>

      <AnimatePresence>
        {activeStory && storyIndex !== null ? (
          <motion.div
            key="svc-story-viewer"
            className="fixed inset-0 z-[10025] flex items-end justify-center bg-[#0e0b08]/95 sm:items-center sm:p-5"
            role="dialog"
            aria-modal="true"
            aria-label={activeStory.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.22 }}
          >
            <div className="relative flex h-[100dvh] w-full max-w-[26rem] flex-col overflow-hidden bg-[#14110d] sm:h-[min(90dvh,52rem)] sm:rounded-[1.35rem] sm:shadow-[0_28px_64px_-24px_rgba(0,0,0,0.9)] sm:ring-1 sm:ring-white/[0.14]">
              <div className="absolute inset-0">
                <PdcGalleryPicture
                  folder={activeStory.photo.folder}
                  slug={activeStory.photo.slug}
                  fallbackSrc={activeStory.photo.src}
                  ariaHidden
                  loading="eager"
                  sizes="(max-width: 480px) 100vw, 26rem"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0e0b08]/60 via-[#0e0b08]/20 to-[#0e0b08]/94" />
              </div>

              <div className="relative z-[2] flex gap-[3px] px-3.5 pt-[max(0.85rem,env(safe-area-inset-top))]">
                {stories.map((s, i) => (
                  <div key={s.id} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/25">
                    {i < storyIndex ? <div className="h-full w-full bg-white" /> : null}
                    {i === storyIndex && !reduceMotion ? (
                      <motion.div
                        key={storyKey}
                        className="h-full bg-white"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: STORY_AUTO_MS / 1000, ease: "linear" }}
                      />
                    ) : null}
                    {i === storyIndex && reduceMotion ? <div className="h-full w-full bg-white" /> : null}
                  </div>
                ))}
              </div>

              <div className="relative z-[2] flex items-center justify-between px-4 pt-3.5">
                <div>
                  <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-secondary">
                    {activeStory.eyebrow}
                  </p>
                  <p className="mt-0.5 font-serif text-lg text-white sm:text-xl">{activeStory.title}</p>
                </div>
                <button
                  type="button"
                  onClick={closeStory}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0e0b08]/45 text-white/90 backdrop-blur-md ring-1 ring-white/20"
                  aria-label="Cerrar"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>

              <button
                type="button"
                className="absolute inset-y-0 left-0 z-[1] w-1/3"
                aria-label="Historia anterior"
                onClick={() => goStory(-1)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 z-[1] w-1/3"
                aria-label="Historia siguiente"
                onClick={() => goStory(1)}
              />

              <div className="relative z-[2] mt-auto space-y-3 px-5 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-16">
                <blockquote className="font-serif text-base italic leading-relaxed text-white/95 sm:text-lg">
                  “{activeStory.verse}”
                </blockquote>
                <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/55">
                  {activeStory.verseRef}
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default ServicioComunidadSection;
