import { Calendar, Clock, HandHeart, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { whatsappUrl } from "../data/contacto";
import { INTERCESION_GALLERY } from "../data/sitePhotos";
import { Reveal } from "./bethel/Reveal";
import { PdcPhotoCarousel } from "./PdcPhotoCarousel";
import { PdcPageShell } from "./PdcPageShell";
import { PdcSectionHeader, pdcPageInnerWithHeroComfort, pdcPageIntroHeaderClass } from "./PdcSectionHeader";

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

const LIST_ITEMS = [
  "Fundamentos bíblicos en intercesión",
  "Material de estudio actualizado",
  "Formación espiritual del intercesor",
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

const btnPrimary =
  "pdc-btn-on-dark-accent !min-h-[3.5rem] !max-w-none !px-8 !text-base !shadow-[0_0_32px_rgba(64,194,222,0.4)] ring-2 ring-secondary/30";
const btnSecondary =
  "pdc-btn-on-dark !min-h-[3.5rem] !max-w-none !px-8 !text-base !border-white/50 !bg-white/20";
const btnGhost =
  "pdc-btn-on-dark-ghost !min-h-[3.5rem] !max-w-none !px-8 !text-base !border-white/40 !text-white";

const IntercesionSection = () => (
  <PdcPageShell id="intercesion-inicio" aria-labelledby="intercesion-heading">
    <div className={pdcPageInnerWithHeroComfort}>
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
          />
        </header>
      </Reveal>

      <Reveal delayMs={60}>
        <div id="intercesion-galeria" className="scroll-mt-28">
          <PdcPhotoCarousel
            photos={INTERCESION_GALLERY}
            className="mb-8 md:mb-10"
            ariaLabel="Galería EIGE Intercesión"
            autoPlayMs={5500}
          />
        </div>
      </Reveal>

      <Reveal delayMs={80}>
        <div id="intercesion-contenido" className={`${glassCard} scroll-mt-28 p-6 md:p-10`}>
          <p className="mx-auto mb-10 max-w-2xl text-center font-sans text-sm font-medium leading-relaxed text-white/92 md:text-base">
            La EIGE forma intercesores para orar con discernimiento, desatar la voluntad de Dios y avanzar con autoridad
            espiritual.
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
            <h3 className="mb-6 flex items-center justify-center gap-2 font-serif text-xl font-medium text-[#faf8f4] md:text-2xl">
              <Sparkles className="h-5 w-5 text-secondary" aria-hidden />
              ¿Qué vas a recibir?
            </h3>
            <ul className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
              {LIST_ITEMS.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 font-sans text-sm text-white/90 transition hover:border-secondary/20 hover:bg-white/[0.06]"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4, ease }}
                >
                  <span className="mt-0.5 text-secondary" aria-hidden>
                    •
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div
            id="intercesion-cta"
            className="flex scroll-mt-28 flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4"
          >
            <a
              href={whatsappUrl("Hola! Quiero info sobre Intercesión / EIGE")}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnPrimary} text-center`}
            >
              <span className="relative z-[1]">Info por WhatsApp</span>
            </a>
            <a
              href="/docs/escuela-eige.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnSecondary} text-center`}
            >
              <span className="relative z-[1]">Ver plan</span>
            </a>
            <a href="/docs/escuela-eige.pdf" download className={`${btnGhost} text-center`}>
              <span className="relative z-[1]">Descargar plan</span>
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  </PdcPageShell>
);

export default IntercesionSection;
