import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
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
import { horariosReunionGeneral } from "../data/horariosWeb";
import { HeroBackgroundVideo } from "./HeroBackgroundVideo";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
  const [showModal, setShowModal] = useState(false);
  const [modalMounted, setModalMounted] = useState(false);
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
    setModalMounted(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setFinePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!showModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [showModal]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setShowModal(false);
  };

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

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-4 pb-[max(3.5rem,env(safe-area-inset-bottom,0px))] pt-[calc(4.75rem+env(safe-area-inset-top,0px))] sm:px-6 sm:pb-16 sm:pt-[calc(5rem+env(safe-area-inset-top,0px))] md:max-w-3xl md:pb-20 md:pt-[calc(5.25rem+env(safe-area-inset-top,0px))]">
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
              Tu lugar, tu casa
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
                href="https://www.google.com/maps?q=Manuel+Belgrano+2053+Baradero"
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

              <motion.button
                type="button"
                className="pdc-btn-accent"
                onClick={() => setShowModal(true)}
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                <svg
                  className="relative z-[1] h-[1.2rem] w-[1.2rem] shrink-0 opacity-95"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <circle cx="12" cy="12" r="9.5" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5.25L15 15" />
                </svg>
                <span className="relative z-[1]">Ver horarios</span>
              </motion.button>
            </motion.div>

            <motion.div variants={contentItem} className="pt-3">
              <Link
                to="/quienes-somos/vision"
                className="group inline-flex items-center gap-2 font-sans text-sm font-medium tracking-wide text-white/80 transition hover:text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
              >
                <span className="h-px w-6 bg-gradient-to-r from-transparent to-secondary/60 transition group-hover:w-8 group-hover:to-secondary" aria-hidden />
                <span>Visión y propósito</span>
                <span
                  className="text-secondary transition group-hover:translate-x-0.5 motion-reduce:transition-none"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {modalMounted
        ? createPortal(
            <AnimatePresence>
              {showModal ? (
                <motion.div
                  className="fixed inset-0 z-[10050] flex items-center justify-center bg-[#030508]/80 p-4 backdrop-blur-md"
                  role="presentation"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0.1 : 0.22 }}
                  onClick={handleOverlayClick}
                >
                  <motion.div
                    className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/[0.12] bg-gradient-to-b from-[#0c1829] via-[#0a1524] to-[#030508] p-7 shadow-[0_32px_90px_-20px_rgba(37,99,173,0.45)] ring-1 ring-secondary/20 sm:p-8"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="hero-horarios-title"
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 14 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 8 }}
                    transition={{ duration: 0.32, ease }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-secondary/18 blur-3xl"
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute -bottom-24 -left-12 h-40 w-40 rounded-full bg-primary/16 blur-3xl"
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent"
                      aria-hidden
                    />

                    <button
                      type="button"
                      className="absolute right-3 top-3 z-[1] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#0a1524]/90 text-lg leading-none text-white/80 transition hover:border-secondary/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                      onClick={() => setShowModal(false)}
                      aria-label="Cerrar"
                    >
                      &times;
                    </button>

                    <div className="relative mb-7 flex flex-col items-center gap-3 pt-1 text-center">
                      <motion.div
                        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-secondary/35 bg-secondary/15 text-secondary shadow-[0_0_28px_-6px_rgba(64,194,222,0.45)]"
                        animate={reduceMotion ? undefined : { scale: [1, 1.05, 1] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Clock className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                      </motion.div>
                      <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-secondary">
                        Reunión general
                      </p>
                      <h2
                        id="hero-horarios-title"
                        className="font-serif text-2xl font-medium tracking-[0.03em] text-[#faf8f4] md:text-[1.65rem]"
                      >
                        Horarios de reuniones
                      </h2>
                      <div
                        className="h-px w-16 bg-gradient-to-r from-transparent via-secondary/50 to-transparent"
                        aria-hidden
                      />
                      <p className="max-w-xs font-sans text-[0.8125rem] leading-relaxed text-white/75 md:text-sm">
                        Mismo horario que en el pie de página. Consultá por WhatsApp si necesitás más detalle.
                      </p>
                    </div>

                    <ul className="relative space-y-2.5 font-sans">
                      {horariosReunionGeneral.map((h, i) => (
                        <motion.li
                          key={`${h.dia}-${h.hora}`}
                          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.06 + i * 0.05, duration: 0.35, ease }}
                          className="rounded-2xl border border-white/[0.1] bg-white/[0.06] px-4 py-3.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:border-secondary/30 hover:bg-white/[0.09]"
                        >
                          <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-secondary">
                            {h.dia}
                          </span>
                          <span className="mt-1 block text-lg font-medium tabular-nums tracking-wide text-[#f5f2ec]">
                            {h.hora}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </section>
  );
};
