import React, { useCallback } from "react";
import { Calendar, ChevronDown, Clock, HandHeart, Images, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { whatsappUrl } from "../data/contacto";
import { scrollToPdcSectionId } from "../lib/pdcScrollNav";
import { Reveal } from "./bethel/Reveal";
import { IntercesionMomentsGallery } from "./IntercesionMomentsGallery";
import { PdcEducativaDockHint } from "./PdcEducativaDockHint";
import { PdcPlanDock } from "./PdcPlanDock";
import { PdcPageShell } from "./PdcPageShell";
import {
  PdcSectionHeader,
  pdcHeaderScrollMargin,
  pdcPageInnerWithHeroComfort,
  pdcPageIntroHeaderClass,
} from "./PdcSectionHeader";

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
    title: "2 años",
    body: "Formación profunda con práctica ministerial y salidas a terreno.",
    icon: Clock,
  },
  {
    eyebrow: "Modalidad",
    title: "Presencial quincenal",
    body: "Encuentros quincenales para crecer en oración e impartición.",
    icon: Calendar,
    accent: true,
  },
];

const LIVE_CHIPS = [
  "Fundamentos bíblicos",
  "Material actualizado",
  "Formación del intercesor",
  "Comunidad y acompañamiento",
  "Espacios de consulta",
  "Ministración e impartición",
  "Práctica ministerial",
  "Salidas a terreno",
] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease, delay: i * 0.08 },
  }),
};

const EIGE_PDF_HREF = "/docs/escuela-eige.pdf";
const EIGE_WA_HREF = whatsappUrl("Hola! Quiero info sobre Intercesión / EIGE");

const IntercesionSection = () => {
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
    <PdcPageShell id="intercesion-inicio" aria-labelledby="intercesion-heading">
      <div className={`${pdcPageInnerWithHeroComfort} pb-20 sm:pb-24`}>
        <Reveal>
          <header className={pdcPageIntroHeaderClass}>
            <PdcSectionHeader
              headingId="intercesion-heading"
              eyebrow="Área educativa"
              eyebrowIcon={HandHeart}
              title="EIGE"
              titleAccent="intercesión con autoridad"
              subtitle="Formación en intercesión y guerra espiritual para levantar intercesores con discernimiento y autoridad."
              showSegmentBar
            >
              <div className="mx-auto mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
                <motion.button
                  type="button"
                  onClick={() => scrollToSection("intercesion-contenido")}
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
                  onClick={() => scrollToSection("intercesion-galeria")}
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
          <div id="intercesion-contenido" className={`${glassCard} scroll-mt-28 p-6 md:p-10`}>
            <p
              data-pdc-scroll-focus
              className="mx-auto mb-10 max-w-2xl text-center font-sans text-sm font-medium leading-relaxed text-white/92 md:text-base"
            >
              La EIGE no es solo teoría: formás el carácter del intercesor, practicás en comunidad y salís a ministrar
              con seguridad.
            </p>

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
                Fundamentos, impartición y salidas a terreno
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

            <PdcEducativaDockHint id="intercesion-cta" />
          </div>
        </Reveal>

        <Reveal delayMs={80}>
          <div id="intercesion-galeria" className={`mx-auto max-w-5xl ${pdcHeaderScrollMargin}`}>
            <h2
              data-pdc-scroll-focus
              className="mb-2 text-center font-serif text-xl text-white md:text-2xl"
            >
              Galería
            </h2>
            <p className="mx-auto mb-6 max-w-lg text-center font-serif text-sm italic leading-relaxed text-white/70 md:text-base">
              Vigilias, altar y comunidad de intercesores en acción.
            </p>
            <IntercesionMomentsGallery />
          </div>
        </Reveal>
      </div>

      <PdcPlanDock
        pdfHref={EIGE_PDF_HREF}
        waHref={EIGE_WA_HREF}
        waLabel="Consultar por WhatsApp sobre EIGE Intercesión"
      />
    </PdcPageShell>
  );
};

export default IntercesionSection;
