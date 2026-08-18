import { useCallback, useState } from "react";
import { BookOpen, ChevronDown, GraduationCap, Images } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { whatsappUrl } from "../data/contacto";
import {
  FORMATION_ACCORDION,
  FORMATION_EFESIOS_VERSE,
  FORMATION_VISION_INTRO,
} from "../data/formacionLideres";
import { scrollToPdcSectionId } from "../lib/pdcScrollNav";
import { Reveal } from "./bethel/Reveal";
import { PdcEducativaDockHint } from "./PdcEducativaDockHint";
import { FormacionMomentsBento } from "./FormacionMomentsBento";
import { PdcPageShell } from "./PdcPageShell";
import {
  PdcSectionHeader,
  pdcAccordionTitleClass,
  pdcBodyLeadClass,
  pdcGlassCardPadding,
  pdcHeaderScrollMargin,
  pdcPageInnerWithHeroComfort,
  pdcPageIntroHeaderClass,
  pdcQuoteClass,
  pdcSectionH3Class,
} from "./PdcSectionHeader";

const glassCard =
  "rounded-2xl border border-white/[0.1] bg-white/[0.04] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.65)] backdrop-blur-xl";

const FormacionLideresSection = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const reduceMotion = useReducedMotion() ?? false;

  const scrollToSection = useCallback(
    (id: string) => {
      scrollToPdcSectionId(id, { behavior: reduceMotion ? "auto" : "smooth" });
    },
    [reduceMotion]
  );

  return (
    <PdcPageShell id="formacion-lideres-inicio" aria-labelledby="formacion-lideres-heading">
      <div className={`${pdcPageInnerWithHeroComfort} pb-16 sm:pb-20`}>
        <Reveal>
          <header className={pdcPageIntroHeaderClass}>
            <PdcSectionHeader
              headingId="formacion-lideres-heading"
              eyebrow="Área educativa"
              eyebrowIcon={GraduationCap}
              title="Escuela de"
              titleAccent="formación de líderes"
              subtitle="Perfeccionar a los santos para la obra del ministerio y la edificación del Cuerpo de Cristo."
              showSegmentBar
            >
              <div className="mx-auto flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
                <motion.button
                  type="button"
                  onClick={() => scrollToSection("formacion-lideres-contenido")}
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
                  onClick={() => scrollToSection("formacion-lideres-galeria")}
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
          <div id="formacion-lideres-contenido" className={`${glassCard} ${pdcGlassCardPadding} scroll-mt-28`}>
            <div className="mx-auto mb-6 max-w-2xl text-center">
              <p className="mb-2 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-secondary/85">
                Efesios 4:12
              </p>
              <blockquote className={pdcQuoteClass}>
                <span className="text-secondary/80">«</span>
                {FORMATION_EFESIOS_VERSE}
                <span className="text-secondary/80">»</span>
              </blockquote>
              <p className={`mt-4 ${pdcBodyLeadClass}`}>{FORMATION_VISION_INTRO}</p>
            </div>

            <div className="mx-auto mb-6 max-w-2xl space-y-2.5">
              {FORMATION_ACCORDION.map((item) => {
                const open = openAccordion === item.id;
                return (
                  <div
                    key={item.id}
                    className={`overflow-hidden rounded-2xl border transition duration-300 ${
                      open
                        ? "border-secondary/35 bg-white/[0.06] shadow-[0_0_48px_-12px_rgba(64,194,222,0.2)]"
                        : "border-white/[0.08] bg-white/[0.03] hover:border-white/15"
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`formacion-acc-${item.id}`}
                      id={`formacion-acc-btn-${item.id}`}
                      className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left sm:px-5 sm:py-4"
                      onClick={() => setOpenAccordion(open ? null : item.id)}
                    >
                      <span className={pdcAccordionTitleClass}>{item.title}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-secondary transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                        aria-hidden
                      />
                    </button>
                    <div
                      id={`formacion-acc-${item.id}`}
                      role="region"
                      aria-labelledby={`formacion-acc-btn-${item.id}`}
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="space-y-2.5 px-4 pb-4 sm:px-5 sm:pb-5">
                          {item.summary.split("\n\n").map((paragraph, pIdx) => (
                            <p
                              key={`${item.id}-p-${pIdx}`}
                              className={`text-sm leading-relaxed ${
                                pIdx === 0 ? "text-white/88" : "text-zinc-400"
                              }`}
                            >
                              {paragraph}
                            </p>
                          ))}
                          {item.bullets ? (
                            <ul className="space-y-1.5 pt-1">
                              {item.bullets.map((bullet) => (
                                <li key={bullet} className="flex items-start gap-2 text-sm text-zinc-400">
                                  <span className="mt-1 text-secondary" aria-hidden>
                                    •
                                  </span>
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mx-auto mb-6 max-w-2xl rounded-xl border border-white/10 bg-white/[0.04] p-4 text-center md:p-5">
              <BookOpen className="mx-auto mb-2 h-5 w-5 text-secondary" aria-hidden />
              <p className="font-serif text-sm italic leading-relaxed text-[#ebe7df] md:text-base">
                «{FORMATION_EFESIOS_VERSE}» (Efesios 4:12).
              </p>
            </div>

            <div id="formacion-lideres-cta" className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href={whatsappUrl("Hola! Quiero info sobre la Escuela de Formación de Líderes")}
                target="_blank"
                rel="noopener noreferrer"
                className="pdc-btn-on-dark-accent max-w-none text-center"
              >
                <span className="relative z-[1]">Info por WhatsApp</span>
              </a>
              <a href="/area-educativa/liderazgo" className="pdc-btn-on-dark max-w-none text-center">
                <span className="relative z-[1]">Escuela de liderazgo</span>
              </a>
            </div>

            <PdcEducativaDockHint id="formacion-lideres-cta" />
          </div>
        </Reveal>

        <Reveal delayMs={100}>
          <div
            id="formacion-lideres-galeria"
            className={`mx-auto w-full scroll-mt-28 py-4 notebook:-mx-2.5 notebook:mt-4 notebook:max-w-[min(99vw,76rem)] notebook:px-0 md:py-5 lg:notebook:-mx-4 desktop:mt-8 ${pdcHeaderScrollMargin}`}
          >
            <h2
              data-pdc-scroll-focus
              className={`mb-2 shrink-0 text-center notebook:mb-1.5 ${pdcSectionH3Class}`}
            >
              Momentos de formación
            </h2>
            <FormacionMomentsBento />
          </div>
        </Reveal>
      </div>
    </PdcPageShell>
  );
};

export default FormacionLideresSection;
