import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  HERO_OVERLAY_PRESET,
  HERO_POSTER,
  HERO_VIDEO_MOBILE_MP4,
  HERO_VIDEO_MP4,
  HERO_VIDEO_OBJECT_POSITION,
  HERO_VIDEO_WEBM,
  heroOverlayPresets,
} from "../data/hero";
import { horariosReunionGeneral } from "../data/horariosWeb";
import { usePrefersSaveData } from "../hooks/usePrefersSaveData";

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
  const reduceMotion = useReducedMotion() ?? false;
  const [finePointer, setFinePointer] = useState(false);
  const saveData = usePrefersSaveData();
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlay = heroOverlayPresets[HERO_OVERLAY_PRESET];
  const playVideo = !reduceMotion && !saveData;

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!playVideo) {
      video.pause();
      return;
    }
    void video.play().catch(() => {});
  }, [playVideo]);

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
      className="relative flex min-h-[100svh] min-h-screen flex-col overflow-hidden bg-[#030508] bg-cover bg-center"
      style={saveData ? { backgroundImage: `url(${HERO_POSTER})` } : undefined}
      onMouseMove={onHeroMove}
      onMouseLeave={onHeroLeave}
      aria-label="Inicio"
    >
      <video
        ref={videoRef}
        autoPlay={playVideo}
        muted
        loop
        playsInline
        preload={playVideo ? "metadata" : "none"}
        poster={HERO_POSTER}
        aria-hidden
        className={`absolute inset-0 z-0 block h-full min-h-full w-full scale-[1.02] object-cover ${
          saveData ? "hidden" : ""
        }`}
        style={{ objectPosition: HERO_VIDEO_OBJECT_POSITION }}
      >
        <source src={HERO_VIDEO_MOBILE_MP4} type="video/mp4" media="(max-width: 768px)" />
        <source src={HERO_VIDEO_WEBM} type="video/webm" />
        <source src={HERO_VIDEO_MP4} type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
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

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-start px-4 pb-14 pt-[calc(4.75rem+env(safe-area-inset-top,0px))] sm:px-6 sm:pb-16 sm:pt-[calc(5rem+env(safe-area-inset-top,0px))] md:max-w-3xl md:justify-center md:pb-20 md:pt-[calc(5.25rem+env(safe-area-inset-top,0px))]">
        {overlay.contentBackdrop ? (
          <div
            className="pointer-events-none absolute inset-x-4 top-[calc(3.5rem+env(safe-area-inset-top,0px))] bottom-24 max-w-2xl rounded-[2rem] bg-[#030508]/25 blur-md md:inset-x-auto md:left-1/2 md:w-[min(100%,42rem)] md:-translate-x-1/2"
            aria-hidden
          />
        ) : null}
        <motion.div
          className="relative w-full max-w-lg px-2 py-4 sm:max-w-xl sm:px-4 sm:py-5 md:max-w-2xl"
          initial={reduceMotion ? false : "hidden"}
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
          </div>
        </motion.div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-[10050] flex animate-fade items-center justify-center bg-slate-950/72 p-4 backdrop-blur-md"
          onClick={handleOverlayClick}
          role="presentation"
        >
          <div
            className="animate-scale relative w-full max-w-md overflow-hidden rounded-3xl border border-primary/22 bg-gradient-to-b from-[#0a1524]/96 to-[#030508]/95 p-7 shadow-[0_28px_72px_rgba(37,99,173,0.28)] backdrop-blur-xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="hero-horarios-title"
          >
            <div
              className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-secondary/12 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-12 h-40 w-40 rounded-full bg-primary/12 blur-3xl"
              aria-hidden
            />

            <button
              type="button"
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.07] text-lg leading-none text-white/75 transition hover:border-white/22 hover:bg-white/12 hover:text-white"
              onClick={() => setShowModal(false)}
              aria-label="Cerrar"
            >
              &times;
            </button>

            <div className="relative mb-6 flex flex-col items-center gap-3 pt-1 text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-secondary/28 bg-secondary/12 text-secondary">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" d="M12 7v5l3 2" />
                </svg>
              </div>
              <h2
                id="hero-horarios-title"
                className="font-serif text-xl font-medium tracking-[0.04em] text-[#faf8f4] md:text-2xl"
              >
                Horarios de reuniones
              </h2>
              <p className="max-w-xs font-sans text-[0.8125rem] leading-snug text-white/55">
                Reunión general — mismo horario que en el pie de página. Consultá por WhatsApp si necesitás más detalle.
              </p>
            </div>

            <ul className="relative space-y-2.5 font-sans">
              {horariosReunionGeneral.map((h) => (
                <li
                  key={`${h.dia}-${h.hora}`}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.05] px-4 py-3.5 text-center transition hover:border-secondary/28 hover:bg-white/[0.08]"
                >
                  <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-secondary/95">
                    {h.dia}
                  </span>
                  <span className="mt-1 block text-base font-medium tabular-nums text-[#f2ede6]">{h.hora}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade {
          animation: fade 0.22s ease-out both;
        }
        @keyframes scale {
          from { transform: scale(0.97) translateY(8px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-scale {
          animation: scale 0.32s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade, .animate-scale { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
};
