import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronDown, HandHeart } from "lucide-react";
import { PdcPhotoCarousel, type PdcCarouselSlide } from "./PdcPhotoCarousel";
import { PdcScrollFabButton } from "./PdcScrollFabButton";
import {
  PdcSectionEyebrow,
  pdcHeaderScrollMarginTop,
  pdcPageHeroTopComfort,
  pdcPageInnerClass,
  pdcPageTitleClass,
  pdcPageTitleLineClass,
} from "./PdcSectionHeader";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SCROLL_NAV_OFFSET = 112;

const sectionIds = ["svc-hero", "svc-p1", "svc-p2", "svc-p3", "svc-p4", "svc-fin"] as const;

type SceneId = Exclude<(typeof sectionIds)[number], "svc-hero" | "svc-fin">;

type Scene = {
  id: SceneId;
  image: { src: string; alt: string };
  eyebrow: string;
  title: string;
  /** Versículo NTV (texto completo del versículo o frase clave) */
  verse: string;
  verseRef: string;
  /** Imagen a la derecha en md+ */
  imageRight: boolean;
};

const svc = (file: string) => `/images/servicios/${encodeURIComponent(file)}`;

const scenes: Scene[] = [
  {
    id: "svc-p1",
    image: {
      src: "/images/servicios/areaservicio1.jpeg",
      alt: "Voluntarios entregando alimentos y acompañando familias en la comunidad.",
    },
    eyebrow: "En la calle",
    title: "Dar no es un discurso",
    verse:
      "Les digo la verdad, cuando hicieron alguna de estas cosas al más insignificante de estos, mis hermanos, ¡me lo hicieron a mí!",
    verseRef: "Mateo 25:40 (NTV)",
    imageRight: false,
  },
  {
    id: "svc-p2",
    image: {
      src: "/images/servicios/areaservicio2.jpeg",
      alt: "Equipo de la iglesia sirviendo junto en la ciudad.",
    },
    eyebrow: "Juntos",
    title: "La iglesia que camina",
    verse: "Todos ustedes en conjunto son el cuerpo de Cristo, y cada uno de ustedes es parte de ese cuerpo.",
    verseRef: "1 Corintios 12:27 (NTV)",
    imageRight: true,
  },
  {
    id: "svc-p3",
    image: {
      src: "/images/servicios/areaservicio3.jpeg",
      alt: "Actividad solidaria al aire libre con familias.",
    },
    eyebrow: "Cercanía",
    title: "Historias que importan",
    verse:
      "Ayúdense a llevar los unos las cargas de los otros, y obedezcan de esa manera la ley de Cristo.",
    verseRef: "Gálatas 6:2 (NTV)",
    imageRight: false,
  },
  {
    id: "svc-p4",
    image: {
      src: "/images/servicios/areaservicio7.jpeg",
      alt: "Voluntarios con donaciones de alimentos y ropa, sirviendo con alegría en la comunidad.",
    },
    eyebrow: "Impacto",
    title: "Sembrar esperanza",
    verse:
      "Así que no nos cansemos de hacer el bien. A su debido tiempo, cosecharemos numerosas bendiciones si no nos damos por vencidos.",
    verseRef: "Gálatas 6:9 (NTV)",
    imageRight: true,
  },
];

const stripImages: { src: string; alt: string }[] = [
  {
    src: "/images/servicios/areaservicio8.jpeg",
    alt: "Equipo con donaciones de alimentos y ropa en el salón de la iglesia.",
  },
  {
    src: "/images/servicios/areaservicio5.jpeg",
    alt: "Voluntarios organizando donaciones.",
  },
  {
    src: "/images/servicios/areaservicio6.jpeg",
    alt: "Momento de oración durante el servicio comunitario.",
  },
  {
    src: svc("WhatsApp Image 2026-05-04 at 2.48.07 PM.jpeg"),
    alt: "Equipo sirviendo en la comunidad.",
  },
  {
    src: svc("WhatsApp Image 2026-05-04 at 2.48.08 PM.jpeg"),
    alt: "Voluntarios en actividad solidaria.",
  },
  {
    src: svc("WhatsApp Image 2026-05-04 at 2.48.08 3PM.jpeg"),
    alt: "Encuentro de servicio comunitario.",
  },
  {
    src: svc("WhatsApp Image 2026-05-04 at 2.52.28 PM.jpeg"),
    alt: "Momento de compañerismo en el servicio.",
  },
  {
    src: svc("WhatsApp Image 2026-05-04 at 2.52.29 PM.jpeg"),
    alt: "Jornada de ayuda en la ciudad.",
  },
  {
    src: svc("WhatsApp Image 2026-05-04 at 2.52.29 2PM.jpeg"),
    alt: "Servicio a familias en la comunidad.",
  },
];

const servicioGallerySlides: PdcCarouselSlide[] = stripImages.map((img, i) => ({
  id: `svc-gallery-${i}`,
  src: img.src,
  alt: img.alt,
}));

const imgZoomClass =
  "origin-center transition-[transform,filter] duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:scale-[1.3] group-hover:brightness-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-hover:brightness-100";

/** Mismo margen superior que `pdcHeaderScrollMargin`; margen inferior extra por FAB/anclas. */
const SECTION_SCROLL_MARGIN = `${pdcHeaderScrollMarginTop} scroll-mb-28 sm:scroll-mb-32 md:scroll-mb-36`;

/** Escenas: más `scroll-mt` que el hero para anclas/hash; mismo aire inferior por el FAB. */
const SCENE_SECTION_SCROLL_MARGIN =
  "scroll-mt-32 scroll-mb-28 sm:scroll-mt-36 sm:scroll-mb-32 md:scroll-mt-40 md:scroll-mb-36";

const STORY_SCENE_IDS = new Set<string>(["svc-p1", "svc-p2", "svc-p3", "svc-p4"]);

/** Coherente con `SCENE_SECTION_SCROLL_MARGIN` (scroll-mt-32 / 36 / 40). */
function scrollServicioStoryTopInsetPx(): number {
  const w = window.innerWidth;
  if (w >= 768) return 160;
  if (w >= 640) return 144;
  return 128;
}

/** Profundidad sutil: sombra + bisel interior; sin borde blanco pesado ni ring decorativo. */
const photoFrameOuter =
  "rounded-2xl bg-[#05070a] shadow-[0_40px_100px_-28px_rgba(0,0,0,0.82),0_18px_40px_-16px_rgba(0,0,0,0.55),inset_0_0_0_1px_rgba(255,255,255,0.045)] md:rounded-3xl";
const photoFrameInner =
  "overflow-hidden rounded-[0.9rem] md:rounded-[1.35rem]";

const FAB_INSET =
  "bottom-24 right-4 sm:bottom-28 sm:right-6 lg:right-[max(1.5rem,env(safe-area-inset-right,0px))]";

const FAB_INSET_NEAR_FOOTER =
  "bottom-[7.25rem] right-4 sm:bottom-[7.5rem] sm:right-5 lg:bottom-[7.75rem] lg:right-[max(1.5rem,env(safe-area-inset-right,0px))]";

function nextServicioFabTitle(activeIdx: number): string {
  if (activeIdx >= sectionIds.length - 2) return "Más momentos";
  const nextId = sectionIds[activeIdx + 1];
  const scene = scenes.find((s) => s.id === nextId);
  return scene?.title ?? "Siguiente";
}

export const SVC_FOOTER_ROOT_ID = "svc-footer-root";

/** Índice de la sección con más altura visible en el viewport (barra de progreso y FAB). */
function readGuideSectionIndex(): number {
  const vh = window.innerHeight;
  const doc = document.documentElement;
  const atDocumentEnd = window.scrollY + vh >= doc.scrollHeight - 32;

  const footerEl = document.getElementById(SVC_FOOTER_ROOT_ID);
  if (footerEl) {
    const fr = footerEl.getBoundingClientRect();
    const footerVisible = Math.max(0, Math.min(fr.bottom, vh) - Math.max(fr.top, 0));
    if (footerVisible > vh * 0.12) return sectionIds.length - 1;
  }

  let best = 0;
  let bestVisible = -1;
  for (let i = 0; i < sectionIds.length; i++) {
    const el = document.getElementById(sectionIds[i]);
    if (!el) continue;
    const r = el.getBoundingClientRect();
    const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
    if (visible > bestVisible) {
      bestVisible = visible;
      best = i;
    }
  }

  if (atDocumentEnd) return sectionIds.length - 1;
  return best;
}

function useNearFooter(): boolean {
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const observe = () => {
      const el = document.getElementById(SVC_FOOTER_ROOT_ID);
      if (!el) {
        setNearFooter(false);
        return;
      }
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
      setNearFooter(visible > vh * 0.12);
    };

    observe();
    const t = window.setTimeout(observe, 400);
    window.addEventListener("scroll", observe, { passive: true });
    window.addEventListener("resize", observe);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", observe);
      window.removeEventListener("resize", observe);
    };
  }, []);

  return nearFooter;
}

function useScrolledPast(threshold = 420): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return past;
}

function useGuideSectionIndex(): number {
  const [activeIdx, setActiveIdx] = useState(0);

  const measure = useCallback(() => {
    setActiveIdx(readGuideSectionIndex());
  }, []);

  useEffect(() => {
    measure();
    const t = window.setTimeout(measure, 320);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return activeIdx;
}

const ServicioComunidadSection: React.FC = () => {
  const reduceMotion = useReducedMotion() ?? false;
  const activeIdx = useGuideSectionIndex();
  const nearFooter = useNearFooter();

  const progress = useMemo(
    () => (nearFooter ? 100 : ((activeIdx + 1) / sectionIds.length) * 100),
    [activeIdx, nearFooter]
  );

  const scrollToId = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const behavior = reduceMotion ? ("auto" as ScrollBehavior) : ("smooth" as ScrollBehavior);

      if (STORY_SCENE_IDS.has(id)) {
        const vh = window.innerHeight;
        const topInset = scrollServicioStoryTopInsetPx();
        /** Un poco menos de alto “útil” por el FAB fijo / área táctil inferior. */
        const bottomComfort = 52;
        const usableH = Math.max(vh - topInset - bottomComfort, vh * 0.55);
        const contentMidY = topInset + usableH / 2;
        const docTop = el.getBoundingClientRect().top + window.scrollY;
        const centerY = docTop + el.offsetHeight / 2;
        const maxScroll = Math.max(0, document.documentElement.scrollHeight - vh);
        const top = Math.max(0, Math.min(maxScroll, centerY - contentMidY));
        window.scrollTo({ top, behavior });
        return;
      }

      const docTop = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, docTop - SCROLL_NAV_OFFSET),
        behavior,
      });
    },
    [reduceMotion]
  );

  const scrollToHero = useCallback(() => {
    scrollToId(sectionIds[0]);
  }, [scrollToId]);

  const onFabClick = useCallback(() => {
    const current = readGuideSectionIndex();
    const atEnd = current >= sectionIds.length - 1 || nearFooter;
    if (atEnd) {
      scrollToHero();
      return;
    }
    scrollToId(sectionIds[current + 1]);
  }, [scrollToId, nearFooter, scrollToHero]);

  const goFirstStoryScene = useCallback(() => {
    scrollToId(sectionIds[1]);
  }, [scrollToId]);

  const fabIsLast = activeIdx >= sectionIds.length - 1 || nearFooter;
  const fabEyebrow = fabIsLast ? "Inicio" : "Explorar";
  const fabPrimaryLine = fabIsLast ? "Subir" : nextServicioFabTitle(activeIdx);
  const fabSrLabel = fabIsLast
    ? "Subir al inicio de Servicio a la Comunidad"
    : `Ir a ${fabPrimaryLine}`;

  const blockVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: reduceMotion ? 0.12 : 0.52, ease: easeOut },
      },
    }),
    [reduceMotion]
  );

  const heroChevronMotion = useMemo(
    () =>
      reduceMotion
        ? {}
        : {
            animate: { y: [0, 7, 0] } as const,
            transition: { duration: 1.35, repeat: Infinity, ease: "easeInOut" as const },
          },
    [reduceMotion]
  );

  const heroCtaGlowMotion = useMemo(
    () =>
      reduceMotion
        ? {}
        : {
            animate: {
              boxShadow: [
                "0 0 0 0 rgba(64, 194, 222, 0)",
                "0 0 28px 4px rgba(64, 194, 222, 0.22)",
                "0 0 0 0 rgba(64, 194, 222, 0)",
              ],
            } as const,
            transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" as const },
          },
    [reduceMotion]
  );

  const heroStagger: Variants = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.09,
          delayChildren: reduceMotion ? 0 : 0.06,
        },
      },
    }),
    [reduceMotion]
  );

  const heroItem: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: reduceMotion ? 0.12 : 0.55, ease: easeOut },
      },
    }),
    [reduceMotion]
  );

  const sceneViewport = useMemo(
    () => ({
      once: true as const,
      amount: 0.38,
      margin: "0px 0px 12% 0px" as const,
    }),
    []
  );

  const fabChevronMotion = useMemo(
    () =>
      reduceMotion
        ? {}
        : fabIsLast
          ? {
              animate: { y: [0, -6, 0] } as const,
              transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const },
            }
          : {
              animate: { y: [0, 6, 0] } as const,
              transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const },
            },
    [reduceMotion, fabIsLast]
  );

  return (
    <div className="relative bg-black">
      {/* Progreso sutil */}
      <motion.div
        className={`pointer-events-none fixed left-0 top-0 z-[9970] h-0.5 w-full transition-opacity duration-500 ${
          activeIdx > 0 ? "bg-white/[0.08] opacity-100" : "bg-white/[0.04] opacity-70"
        }`}
        aria-hidden
      >
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary transition-[width] duration-300 ease-out motion-reduce:transition-none"
          style={{ width: `${progress}%` }}
        />
      </motion.div>

      {/* Hero */}
      <header
        id="svc-hero"
        className={`relative isolate flex min-h-0 flex-col items-center justify-start overflow-hidden px-4 pb-14 ${pdcPageHeroTopComfort} text-center sm:px-6 sm:pb-16 ${SECTION_SCROLL_MARGIN}`}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050a12] via-black to-black [mask-image:radial-gradient(85%_65%_at_50%_38%,#000_55%,transparent_100%)] [-webkit-mask-image:radial-gradient(85%_65%_at_50%_38%,#000_55%,transparent_100%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-32 bg-gradient-to-t from-black via-black/95 to-transparent md:h-40"
          aria-hidden
        />

        <motion.div
          className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center"
          variants={heroStagger}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={heroItem} className="mb-2.5 md:mb-3">
            <PdcSectionEyebrow label="Área de servicio" icon={HandHeart} className="mb-0" />
          </motion.div>
          <motion.h1 variants={heroItem} className={pdcPageTitleClass}>
            <span className={pdcPageTitleLineClass}>Servicio a la Comunidad</span>
          </motion.h1>
          <motion.p
            variants={heroItem}
            className="mx-auto mt-5 max-w-xl font-serif text-lg leading-relaxed text-white/85 md:mt-6 md:text-xl"
          >
            “Hay más dicha en dar que en recibir.”
          </motion.p>
          <motion.p variants={heroItem} className="mt-2 font-serif text-sm text-white/50 md:text-base">
            — Hechos 20:35 (NTV)
          </motion.p>
          <motion.p
            variants={heroItem}
            className="mx-auto mt-3 max-w-lg font-sans text-sm font-medium leading-relaxed text-white/75 md:mt-4 md:text-[0.95rem]"
          >
            Cuatro historias reales. Empezá acá y seguí con la flecha fija escena a escena.
          </motion.p>

          <motion.div variants={heroItem} className="mx-auto mt-8 flex w-full max-w-lg flex-col items-center md:mt-9">
            <motion.div className="rounded-full" {...heroCtaGlowMotion}>
              <motion.button
                type="button"
                onClick={goFirstStoryScene}
                aria-label="Ver historias de servicio a la comunidad"
                className="pdc-btn-on-dark-accent max-w-none"
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              >
                <motion.span className="relative z-[1] flex shrink-0 text-white" {...heroChevronMotion}>
                  <ChevronDown className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.5} aria-hidden />
                </motion.span>
                <span className="relative z-[1]">Mirá qué hacemos</span>
              </motion.button>
            </motion.div>
            <p className="mt-3 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/45">
              4 historias · deslizá hacia abajo
            </p>
          </motion.div>

          <motion.p
            variants={heroItem}
            className="mt-10 font-sans text-[0.62rem] font-medium tabular-nums tracking-[0.28em] text-white/35"
            aria-hidden
          >
            01 / 04
          </motion.p>
        </motion.div>
      </header>

      {/* Escenas */}
      {scenes.map((scene, i) => (
        <motion.section
          key={scene.id}
          id={scene.id}
          aria-labelledby={`${scene.id}-title`}
          className={`relative flex min-h-[calc(100svh-6rem)] flex-col justify-center gap-8 px-5 py-12 md:min-h-[calc(100svh-6.25rem)] md:gap-10 md:px-8 md:py-14 lg:mx-auto lg:max-w-7xl lg:flex-row lg:items-center lg:gap-14 lg:px-10 lg:py-16 ${SCENE_SECTION_SCROLL_MARGIN} ${
            scene.imageRight ? "lg:flex-row-reverse" : ""
          }`}
          initial="hidden"
          whileInView="show"
          viewport={sceneViewport}
          variants={blockVariants}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-[#030508] to-black opacity-90" aria-hidden />
          <div className="relative z-10 w-full shrink-0 lg:flex-1 lg:w-[58%]">
            <div className={`group ${photoFrameOuter}`}>
              <div className={photoFrameInner}>
                <img
                  src={scene.image.src}
                  alt={scene.image.alt}
                  className={`aspect-[4/3] w-full object-cover md:aspect-[5/4] md:min-h-[320px] lg:min-h-[420px] xl:min-h-[460px] ${imgZoomClass}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
          <div className="relative z-10 flex w-full shrink-0 flex-col justify-center text-[#f5f2ec] lg:flex-1 lg:w-[42%]">
            <PdcSectionEyebrow label={scene.eyebrow} icon={HandHeart} compact className="mb-0" />
            <h2 id={`${scene.id}-title`} className="mt-3 font-serif text-2xl leading-tight text-white md:text-4xl lg:text-[2.65rem] lg:leading-[1.12] xl:text-5xl">
              {scene.title}
            </h2>
            <figure className="mt-5 border-l-2 border-[#40c2de] pl-4 text-[#f7f4ef] lg:mt-6 lg:pl-5">
              <blockquote className="m-0 font-serif text-[0.9rem] italic leading-relaxed text-[#f5f2ec] md:text-[1.05rem] lg:text-[1.12rem] [&::before]:content-none [&::after]:content-none">
                “{scene.verse}”
              </blockquote>
              <figcaption className="mt-2 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#7dd3ea]">
                {scene.verseRef}
              </figcaption>
            </figure>
            <div className="mt-8 hidden h-px w-24 bg-gradient-to-r from-secondary/80 to-transparent lg:block" aria-hidden />
          </div>
        </motion.section>
      ))}

      {/* Cierre: franja horizontal */}
      <motion.section
        id="svc-fin"
        className={`relative border-t border-white/[0.07] pb-40 pt-12 md:pb-44 md:pt-16 ${SECTION_SCROLL_MARGIN}`}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={blockVariants}
      >
        <div className="pointer-events-none absolute inset-0 bg-black" aria-hidden />
        <div className={pdcPageInnerClass}>
          <h2 className="text-center font-serif text-2xl text-white md:text-3xl">Más momentos</h2>
          <p className="mx-auto mt-3 max-w-xl text-center font-sans text-sm font-medium text-white/82 md:text-base">
            Más fotos del servicio en la comunidad — deslizá o dejá que avance solo.
          </p>

          <div className="mx-auto mt-8 max-w-4xl md:mt-10">
            <PdcPhotoCarousel
              slides={servicioGallerySlides}
              compact
              ariaLabel="Galería de servicio a la comunidad"
              autoPlayMs={5500}
            />
          </div>
        </div>
      </motion.section>

      {/* FAB unificado: siempre a la derecha; oculto en hero */}
      <div
        className={`pointer-events-none fixed z-[10020] flex flex-col items-end max-lg:pb-[max(0.35rem,env(safe-area-inset-bottom,0px))] ${
          fabIsLast ? FAB_INSET_NEAR_FOOTER : FAB_INSET
        } ${activeIdx === 0 ? "hidden" : ""}`}
      >
        <PdcScrollFabButton
          onClick={onFabClick}
          eyebrow={fabEyebrow}
          primaryLine={fabPrimaryLine}
          pinToTop={fabIsLast}
          ariaLabel={fabSrLabel}
          titleKey={`${activeIdx}-${fabPrimaryLine}`}
          className="pointer-events-auto"
        />
      </div>
    </div>
  );
};

export default ServicioComunidadSection;
