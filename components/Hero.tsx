import React, { useCallback, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";
import {
  HERO_OVERLAY_PRESET,
  heroOverlayPresets,
} from "../data/hero";
import { direccion } from "../data/contacto";
import { reunionGeneralResumenCorto } from "../data/horariosWeb";
import { HeroBackgroundVideo } from "./HeroBackgroundVideo";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HERO_EXPLORE_LINKS = [
  { to: "/quienes-somos/vision", label: "Visión", isHash: false },
  { to: "#home-section-servicios", label: "Nuestros servicios", isHash: true },
] as const;

const mapsHref = `https://www.google.com/maps?q=${direccion.mapsQuery}`;

const heroExploreLinkClass =
  "group inline-flex items-center gap-2 font-sans text-sm font-medium tracking-wide text-white/80 transition hover:text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary";

const contentStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.12 },
  },
};

const contentItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease },
  },
};

export const Hero: React.FC = () => {
  const reduceMotion = useReducedMotion() ?? false;
  const [finePointer, setFinePointer] = useState(false);
  const overlay = heroOverlayPresets[HERO_OVERLAY_PRESET];

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 28, damping: 30, mass: 0.55 });
  const sy = useSpring(my, { stiffness: 28, damping: 30, mass: 0.55 });
  const g1x = useTransform(sx, (v) => v * 12);
  const g1y = useTransform(sy, (v) => v * 9);
  const g2x = useTransform(sx, (v) => -v * 8);
  const g2y = useTransform(sy, (v) => -v * 7);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setFinePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const parallaxOn = !reduceMotion && finePointer;

  const onHeroMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!parallaxOn) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set((e.clientX - w / 2) / (w * 0.5));
      my.set((e.clientY - h / 2) / (h * 0.5));
    },
    [parallaxOn, mx, my]
  );

  const onHeroLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <section
      id="home-hero"
      className="relative flex min-h-[100svh] min-h-screen flex-col overflow-x-hidden bg-[#030508]"
      onMouseMove={onHeroMove}
      onMouseLeave={onHeroLeave}
      aria-label="Inicio"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <HeroBackgroundVideo />

        <div className="absolute inset-0 z-[1]">
          <div className={`absolute inset-0 ${overlay.edgeClass}`} />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 75% 55% at 50% 42%, rgba(3,5,8,${overlay.scrimOpacity}) 0%, transparent 72%)`,
            }}
          />

          {!reduceMotion ? (
            <>
              <motion.div
                style={{ x: g1x, y: g1y }}
                className={`absolute -left-[18%] top-[14%] h-[min(48vw,22rem)] w-[min(48vw,22rem)] rounded-full blur-[88px] ${overlay.blobPrimaryClass}`}
              />
              <motion.div
                style={{ x: g2x, y: g2y }}
                className={`absolute -right-[16%] bottom-[10%] h-[min(44vw,20rem)] w-[min(44vw,20rem)] rounded-full blur-[80px] ${overlay.blobSecondaryClass}`}
              />
            </>
          ) : (
            <>
              <div
                className={`absolute -left-[18%] top-[14%] h-[min(48vw,22rem)] w-[min(48vw,22rem)] rounded-full blur-[88px] ${overlay.blobPrimaryClass}`}
              />
              <div
                className={`absolute -right-[16%] bottom-[10%] h-[min(44vw,20rem)] w-[min(44vw,20rem)] rounded-full blur-[80px] ${overlay.blobSecondaryClass}`}
              />
            </>
          )}
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-4 pb-[max(3.5rem,env(safe-area-inset-bottom,0px))] pt-[calc(4.5rem+env(safe-area-inset-top,0px))] sm:px-6 sm:pb-16 sm:pt-[calc(4.75rem+env(safe-area-inset-top,0px))] md:max-w-3xl md:pb-20 md:pt-[calc(5rem+env(safe-area-inset-top,0px))]">
        {overlay.contentBackdrop ? (
          <div
            className="pointer-events-none absolute inset-x-4 top-[calc(3.5rem+env(safe-area-inset-top,0px))] bottom-24 max-w-2xl rounded-[2rem] bg-[#030508]/25 blur-md md:inset-x-auto md:left-1/2 md:w-[min(100%,42rem)] md:-translate-x-1/2"
            aria-hidden
          />
        ) : null}
        <motion.div
          className="relative w-full max-w-lg px-2 py-4 sm:max-w-xl sm:px-4 sm:py-5 md:max-w-2xl"
          initial={reduceMotion ? "show" : "hidden"}
          animate="show"
          variants={contentStagger}
        >
          <div className="flex flex-col items-center space-y-6 text-center sm:space-y-7">
            <motion.p
              variants={contentItem}
              className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-secondary [text-shadow:0_0_28px_rgba(3,5,8,0.9),0_2px_14px_rgba(0,0,0,0.55)]"
            >
              Iglesia cristiana
            </motion.p>

            <motion.h1
              variants={contentItem}
              className="max-w-[16ch] text-balance font-serif text-[clamp(2.25rem,5.5vw,3.65rem)] font-semibold leading-[1.04] tracking-[0.015em] sm:max-w-none"
            >
              <span className="relative block">
                <span
                  className="bg-gradient-to-br from-[#fafaf8] via-[#f0f4f8] to-[#c8dce8] bg-clip-text text-transparent [text-shadow:0_1px_0_rgba(255,255,255,0.12)]"
                  style={{
                    filter:
                      "drop-shadow(0 2px 24px rgba(0,0,0,0.55)) drop-shadow(0 0 40px rgba(37,99,173,0.12))",
                  }}
                >
                  Puerta del
                </span>
              </span>
              <span className="relative mt-2 block sm:mt-2.5">
                <span className="bg-gradient-to-r from-white via-[#f2f6fa] to-[#7dd3ea] bg-clip-text text-transparent [text-shadow:0_0_1px_rgba(255,255,255,0.15)]">
                  Cielo
                </span>
                <span
                  className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl opacity-28 blur-3xl"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 50%, rgba(64,194,222,0.2), transparent 70%)",
                  }}
                  aria-hidden
                />
              </span>
            </motion.h1>

            <motion.p
              variants={contentItem}
              className="mx-auto max-w-[20ch] font-sans text-[clamp(1.05rem,2.4vw,1.22rem)] font-medium leading-relaxed tracking-[0.07em] text-[#f4f1ec]/95 sm:max-w-md sm:tracking-[0.1em] [text-shadow:0_1px_3px_rgba(0,0,0,0.55),0_6px_32px_rgba(0,0,0,0.45)]"
            >
              Iglesia en Baradero
            </motion.p>

            <motion.p
              variants={contentItem}
              className="mx-auto max-w-md px-1 font-sans text-sm leading-snug text-white/80 [text-shadow:0_1px_3px_rgba(0,0,0,0.55)] sm:text-[0.9375rem]"
            >
              <span className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                <Clock className="h-4 w-4 shrink-0 text-secondary/90" aria-hidden />
                <span>{reunionGeneralResumenCorto()}</span>
              </span>
            </motion.p>

            <motion.div
              variants={contentItem}
              className="h-px w-24 bg-gradient-to-r from-transparent via-secondary/55 to-transparent sm:w-28"
              aria-hidden
            />

            <motion.div
              variants={contentItem}
              className="flex w-full max-w-md flex-col gap-3.5 pt-1 sm:flex-row sm:justify-center sm:gap-4"
            >
              <motion.a
                href="#home-planifica-visita"
                className="pdc-btn-accent"
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                <span className="relative z-[1]">Planificá tu visita</span>
              </motion.a>

              <motion.a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="pdc-btn-glass"
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                <svg
                  className="relative z-[1] h-[1.2rem] w-[1.2rem] shrink-0 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21s-6-5.686-6-10a6 6 0 1112 0c0 4.314-6 10-6 10z"
                  />
                  <circle cx="12" cy="11" r="2.25" fill="currentColor" className="text-secondary/90" />
                </svg>
                <span className="relative z-[1]">Cómo llegar</span>
              </motion.a>
            </motion.div>

            <motion.nav
              variants={contentItem}
              className="flex flex-col items-center gap-2.5 pt-3"
              aria-label="Conocé más"
            >
              {HERO_EXPLORE_LINKS.map(({ to, label, isHash }) =>
                isHash ? (
                  <a key={to} href={to} className={heroExploreLinkClass}>
                    <span
                      className="h-px w-6 bg-gradient-to-r from-transparent to-secondary/60 transition group-hover:w-8 group-hover:to-secondary"
                      aria-hidden
                    />
                    <span>{label}</span>
                    <span
                      className="text-secondary transition group-hover:translate-x-0.5 motion-reduce:transition-none"
                      aria-hidden
                    >
                      →
                    </span>
                  </a>
                ) : (
                  <Link key={to} to={to} className={heroExploreLinkClass}>
                    <span
                      className="h-px w-6 bg-gradient-to-r from-transparent to-secondary/60 transition group-hover:w-8 group-hover:to-secondary"
                      aria-hidden
                    />
                    <span>{label}</span>
                    <span
                      className="text-secondary transition group-hover:translate-x-0.5 motion-reduce:transition-none"
                      aria-hidden
                    >
                      →
                    </span>
                  </Link>
                )
              )}
            </motion.nav>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
