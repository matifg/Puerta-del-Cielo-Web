import { useState } from "react";
import { Church, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  PROPOSITO_CIERRE,
  PROPOSITO_PARAGRAPHS,
  VISION_LEMA,
  VISION_STATEMENT,
} from "../data/vision";
import { VISION_GALLERY } from "../data/sitePhotos";
import { Reveal } from "../components/bethel/Reveal";
import { PdcPhotoCarousel } from "../components/PdcPhotoCarousel";
import { PdcPageShell } from "../components/PdcPageShell";
import {
  PdcSectionHeader,
  pdcPageInnerWithHeroComfort,
  pdcPageIntroHeaderClass,
} from "../components/PdcSectionHeader";
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease, delay: i * 0.08 },
  }),
};

const PROPOSITO_ACCORDION = [
  { id: "comunidad", title: "Comunidad en Cristo", body: PROPOSITO_PARAGRAPHS[0] },
  { id: "mision", title: "Nuestra misión", body: PROPOSITO_PARAGRAPHS[1] },
  { id: "vida", title: "Cómo lo vivimos", body: PROPOSITO_PARAGRAPHS[2] },
] as const;

const VisionSection = () => {
  const [openProposito, setOpenProposito] = useState<string | null>(PROPOSITO_ACCORDION[0].id);

  return (
    <PdcPageShell id="vision-inicio" aria-labelledby="vision-heading">
      <div className={pdcPageInnerWithHeroComfort}>
        <Reveal priority>
          <header className={pdcPageIntroHeaderClass}>
            <PdcSectionHeader
              headingId="vision-heading"
              eyebrow="Quiénes somos"
              eyebrowIcon={Church}
              title="Visión y"
              titleAccent="propósito"
              subtitle="Lo que soñamos como iglesia y cómo lo vivimos día a día."
              showSegmentBar
            />
          </header>
        </Reveal>

        <Reveal delayMs={40}>
          <motion.section
            id="vision-vision"
            className="mx-auto mb-10 max-w-4xl scroll-mt-28 md:mb-14"
            aria-labelledby="vision-bloque-titulo"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
          >
            <motion.p
              id="vision-bloque-titulo"
              className="mb-6 text-center font-sans text-[0.7rem] font-bold uppercase tracking-[0.35em] text-secondary md:text-xs"
              variants={fadeUp}
              custom={0}
            >
              Visión
            </motion.p>
            <motion.p
              className="text-center font-serif text-2xl font-medium leading-snug text-[#f5f2ec] md:text-4xl md:leading-tight"
              variants={fadeUp}
              custom={1}
            >
              {VISION_STATEMENT}
            </motion.p>
          </motion.section>
        </Reveal>

        <Reveal delayMs={60}>
          <div
            id="vision-galeria"
            className="mx-auto mb-14 max-w-5xl scroll-mt-28 md:mb-20"
          >
            <p className="mb-5 text-center font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Revelación de la Cruz · Santa Cena
            </p>
            <PdcPhotoCarousel
              photos={VISION_GALLERY}
              ariaLabel="Galería Visión y propósito"
              autoPlayMs={6000}
            />
          </div>
        </Reveal>

        <Reveal delayMs={90}>
          <motion.section
            id="vision-proposito"
            className="mx-auto max-w-3xl scroll-mt-28"
            aria-labelledby="proposito-titulo"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-8%" }}
          >
            <motion.h2
              id="proposito-titulo"
              className="mb-6 text-center font-serif text-3xl font-medium text-[#faf8f4] md:text-4xl"
              variants={fadeUp}
              custom={0}
            >
              Propósito
            </motion.h2>

            <motion.blockquote
              className="mb-8 border-l-2 border-secondary/60 pl-5 font-serif text-lg italic leading-relaxed text-secondary/95 md:pl-6 md:text-xl"
              variants={fadeUp}
              custom={1}
            >
              {VISION_LEMA}
            </motion.blockquote>

            <div className="space-y-3">
              {PROPOSITO_ACCORDION.map((item, i) => {
                const open = openProposito === item.id;
                return (
                  <motion.div
                    key={item.id}
                    className={`overflow-hidden rounded-2xl border transition duration-300 ${
                      open
                        ? "border-secondary/35 bg-white/[0.06] shadow-[0_0_48px_-12px_rgba(64,194,222,0.18)]"
                        : "border-white/[0.08] bg-white/[0.03] hover:border-white/15"
                    }`}
                    variants={fadeUp}
                    custom={i + 2}
                  >
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`vision-prop-${item.id}`}
                      id={`vision-prop-btn-${item.id}`}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                      onClick={() => setOpenProposito(open ? null : item.id)}
                    >
                      <span className="font-serif text-lg text-[#ebe8e2] md:text-xl">{item.title}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-secondary transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                        aria-hidden
                      />
                    </button>
                    <div
                      id={`vision-prop-${item.id}`}
                      role="region"
                      aria-labelledby={`vision-prop-btn-${item.id}`}
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <p className="px-5 pb-5 font-sans text-sm leading-relaxed text-zinc-400 sm:px-6 sm:pb-6 md:text-[0.95rem] md:leading-relaxed">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.p
              className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 text-center font-sans text-sm font-medium leading-relaxed text-zinc-200 md:text-base"
              variants={fadeUp}
              custom={PROPOSITO_ACCORDION.length + 2}
            >
              {PROPOSITO_CIERRE}
            </motion.p>
          </motion.section>
        </Reveal>

        <Reveal delayMs={110}>
          <motion.div
            id="vision-cta"
            className="mt-12 flex scroll-mt-28 flex-col items-center justify-center gap-3 sm:mt-14 sm:flex-row sm:gap-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
          >
            <Link to="/#servicios" className="pdc-btn-on-dark-accent max-w-none px-8">
              <span className="relative z-[1]">Ver nuestros servicios</span>
            </Link>
            <Link to="/conexion" className="pdc-btn-on-dark-ghost max-w-none px-8">
              <span className="relative z-[1]">Grupos de conexión</span>
            </Link>
          </motion.div>
        </Reveal>
      </div>
    </PdcPageShell>
  );
};

export default VisionSection;