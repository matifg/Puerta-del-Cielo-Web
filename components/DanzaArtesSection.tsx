import React, { useCallback, useState } from "react";
import { Calendar, ChevronDown, Clock, Images, Palette, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { whatsappUrl } from "../data/contacto";
import { DANZA_CAROUSEL_SLIDES } from "../data/danzaPhotos";
import { scrollToPdcSectionId } from "../lib/pdcScrollNav";
import { Reveal } from "./bethel/Reveal";
import { PdcPhotoCarousel } from "./PdcPhotoCarousel";
import { PdcEducativaDockHint } from "./PdcEducativaDockHint";
import { PdcPlanDock } from "./PdcPlanDock";
import { PdcPageShell } from "./PdcPageShell";
import { PdcSectionHeader, pdcHeaderScrollMargin, pdcPageInnerWithHeroComfort, pdcPageIntroHeaderClass } from "./PdcSectionHeader";

const glassCard =
  "rounded-2xl border border-white/[0.1] bg-white/[0.04] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.65)] backdrop-blur-xl";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const INFO_CARDS: readonly {
  eyebrow: string;
  title: string;
  body: string;
  icon: LucideIcon;
  accent?: boolean;
}[] = [
  {
    eyebrow: "Duración",
    title: "1 año",
    body: "Formación completa e integradora: movimiento que se vuelve vida.",
    icon: Clock,
  },
  {
    eyebrow: "Modalidad",
    title: "2 sábados / mes",
    body: "Presencial, 2 sábados al mes: palabra, práctica y comunidad.",
    icon: Calendar,
    accent: true,
  },
];

const LIVE_CHIPS = [
  "Palabra y fundamentos",
  "Formación espiritual",
  "Técnica y entrenamiento",
  "Creatividad con propósito",
  "Comunidad real",
  "Espacios de práctica",
  "Acompañamiento",
  "Ministración",
] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease, delay: i * 0.08 },
  }),
};

const DANZA_INTRO_TEASER =
  "La Escuela de Danza y Artes Dinámicas es un espacio de formación donde el movimiento y la expresión creativa se convierten en instrumentos de Dios para traer sanidad, libertad y restauración.";

const DANZA_INTRO_REST =
  "A través de un proceso integral, los alumnos desarrollan identidad, sensibilidad espiritual y excelencia en la ministración, entendiendo la danza como una herramienta para manifestar la presencia de Dios y edificar a otros.";

const DANZA_PDF_HREF = "/docs/escuela-dya.pdf";
const DANZA_WA_HREF = whatsappUrl("Hola! Quiero info sobre Danza y Artes Dinámicas");

const DanzaArtesSection = () => {
  const [introExpanded, setIntroExpanded] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;

  const scrollToSection = useCallback(
    (id: string) => {
      scrollToPdcSectionId(id, {
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [reduceMotion]
  );

  return (
    <PdcPageShell id="danza-inicio" aria-labelledby="danza-artes-heading">
      <div className={`${pdcPageInnerWithHeroComfort} pb-20 sm:pb-24`}>
        <Reveal>
          <header className={pdcPageIntroHeaderClass}>
            <PdcSectionHeader
              headingId="danza-artes-heading"
              eyebrow="Área educativa"
              eyebrowIcon={Palette}
              title="Danza y Artes Dinámicas"
              titleAccent="creatividad que adora"
              subtitle="Un espacio de formación donde el movimiento y la expresión creativa se convierten en instrumentos de Dios para traer sanidad, libertad y restauración."
              showSegmentBar
            >
              <div className="mx-auto mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
                <motion.button
                  type="button"
                  onClick={() => scrollToSection("danza-contenido")}
                  className="pdc-btn-on-dark"
                  whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                >
                  <motion.span
                    className="relative z-[1] flex shrink-0 text-secondary"
                    animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
                    transition={{ duration: 1.65, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ChevronDown className="h-5 w-5" strokeWidth={2.25} aria-hidden />
                  </motion.span>
                  <span className="relative z-[1]">Ver programa</span>
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => scrollToSection("danza-galeria")}
                  className="pdc-btn-on-dark-ghost"
                  whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                >
                  <Images className="relative z-[1] h-5 w-5 shrink-0 text-secondary" aria-hidden />
                  <span className="relative z-[1]">Galería</span>
                </motion.button>
              </div>
            </PdcSectionHeader>
          </header>
        </Reveal>

        <Reveal delayMs={60}>
          <div id="danza-contenido" className={`${glassCard} scroll-mt-28 p-6 md:p-10`}>
            <div data-pdc-scroll-focus className="mx-auto mb-10 max-w-2xl text-center">
              <p className="font-sans text-sm font-medium leading-relaxed text-white/92 md:text-base">
                {DANZA_INTRO_TEASER}
                {introExpanded ? (
                  <>
                    {" "}
                    <span className="text-zinc-400">{DANZA_INTRO_REST}</span>
                  </>
                ) : null}
              </p>
              <button
                type="button"
                aria-expanded={introExpanded}
                onClick={() => setIntroExpanded((v) => !v)}
                className="mt-3 font-sans text-sm font-medium text-secondary transition hover:text-secondary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
              >
                {introExpanded ? "Ver menos" : "Ver más"}
              </button>
            </div>

            <div className="mx-auto mb-10 grid max-w-3xl gap-4 sm:grid-cols-2">
              {INFO_CARDS.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.eyebrow}
                    className={`relative overflow-hidden rounded-2xl border p-6 transition duration-500 md:p-7 ${
                      card.accent
                        ? "border-secondary/35 bg-gradient-to-br from-secondary/15 via-[#0c1424]/80 to-[#080c16] shadow-[0_16px_48px_-24px_rgba(64,194,222,0.35)]"
                        : "border-white/12 bg-white/[0.05] hover:border-white/22 hover:bg-white/[0.08]"
                    }`}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-6%" }}
                    variants={cardVariants}
                    custom={i}
                  >
                    <span
                      className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border ${
                        card.accent
                          ? "border-secondary/40 bg-secondary/15 text-secondary"
                          : "border-white/15 bg-white/[0.06] text-secondary"
                      }`}
                    >
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      {card.eyebrow}
                    </p>
                    <p className="mt-1 font-serif text-2xl text-[#faf8f4]">{card.title}</p>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-zinc-400">{card.body}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="mb-10">
              <h3 className="mb-3 flex items-center justify-center gap-2 font-serif text-xl font-medium text-[#faf8f4] md:text-2xl">
                <Sparkles className="h-5 w-5 text-secondary" aria-hidden />
                Lo que vas a vivir
              </h3>
              <p className="mb-6 text-center font-sans text-sm text-zinc-400 md:text-base">
                Palabra + práctica + momentos de ministración
              </p>
              <ul className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2.5 sm:gap-3" role="list">
                {LIVE_CHIPS.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.035, duration: 0.35, ease }}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-sans text-sm font-medium text-white/85 backdrop-blur-sm transition hover:border-secondary/25 hover:bg-white/[0.06]"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            <PdcEducativaDockHint />
          </div>
        </Reveal>

        <Reveal delayMs={80}>
          <div
            id="danza-galeria"
            className={`mx-auto max-w-5xl notebook:max-w-[min(94vw,60rem)] notebook:px-1 desktop:max-w-[min(88vw,80rem)] desktop:px-2 ${pdcHeaderScrollMargin}`}
          >
            <h2
              data-pdc-scroll-focus
              className="mb-2 text-center font-serif text-xl text-white md:text-2xl desktop:mb-3"
            >
              Galería
            </h2>
            <p className="mx-auto mb-6 max-w-lg text-center font-serif text-sm italic leading-relaxed text-white/70 md:text-base notebook:mb-7 desktop:mb-10">
              Formación, ensayo y ministración — la creatividad al servicio de la adoración.
            </p>
            <PdcPhotoCarousel
              slides={DANZA_CAROUSEL_SLIDES}
              airy
              className="mb-6 md:mb-8"
              ariaLabel="Galería Danza y Artes Dinámicas"
              autoPlayMs={5500}
              showSlideCaption={false}
              showPlaybackHint={false}
            />
          </div>
        </Reveal>
      </div>

      <PdcPlanDock
        pdfHref={DANZA_PDF_HREF}
        waHref={DANZA_WA_HREF}
        waLabel="Consultar por WhatsApp sobre Danza y Artes Dinámicas"
      />
    </PdcPageShell>
  );
};

export default DanzaArtesSection;
