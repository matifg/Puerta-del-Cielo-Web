import React, { useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  CalendarHeart,
  ChevronDown,
  Heart,
  Home,
  Lightbulb,
  MessageCircle,
  Sparkles,
  UserPlus,
  Users,
} from "lucide-react";
import { scrollToPdcSectionId } from "../lib/pdcScrollNav";
import { IecComunidadGallery } from "./IecComunidadGallery";
import PdcSegmentBar from "./PdcSegmentBar";
import { PdcSectionEyebrow, PdcSectionHeader, pdcHeaderScrollMargin, pdcPageHeroTopComfort, pdcPageInnerClass, pdcPageTitleAccentClass, pdcPageTitleClass, pdcPageTitleLineClass } from "./PdcSectionHeader";
import { whatsappUrl } from "../data/contacto";

const FORM_HREF = "https://forms.gle/2JVBZFS5Nw5BUXHGA";
const WA_HREF = whatsappUrl("Hola! Quiero info sobre Iglesia en casa");

const bodyText = "text-white/90 font-sans font-medium leading-relaxed";
const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ENCUENTRO_ITEMS: readonly { label: string; icon: LucideIcon }[] = [
  { label: "Predicar la palabra de Dios de manera sencilla", icon: BookOpen },
  { label: "Encuentros fuera del templo", icon: Home },
  { label: "Compartir historias y experiencias", icon: MessageCircle },
  { label: "Escuchar necesidades", icon: Heart },
  { label: "Acompañamiento cercano", icon: UserPlus },
  { label: "Fortalecer el compañerismo", icon: Users },
  { label: "Disfrutar actividades juntos", icon: Sparkles },
];

const IglesiaEnCasaSection: React.FC = () => {
  const reduceMotion = useReducedMotion() ?? false;

  const scrollToSection = useCallback(
    (id: string) => {
      scrollToPdcSectionId(id, { behavior: reduceMotion ? "auto" : "smooth" });
    },
    [reduceMotion]
  );

  const fadeUp = useCallback(
    (delay = 0) =>
      reduceMotion
        ? {}
        : {
            initial: { opacity: 0, y: 18 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-8% 0px" },
            transition: { duration: 0.5, ease: easeOut, delay },
          },
    [reduceMotion]
  );

  return (
    <div className="relative isolate bg-[#030508]">
      {/* Hero */}
      <header
        id="iec-hero"
        className={`relative flex min-h-0 flex-col items-center justify-start overflow-hidden px-4 pb-14 ${pdcPageHeroTopComfort} text-center sm:px-6 sm:pb-16 ${pdcHeaderScrollMargin}`}
        aria-labelledby="iec-heading"
      >
        <motion.div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.34] saturate-[1.05]"
          style={{ backgroundImage: "url('/images/celula/celula1.jpeg')" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_95%_70%_at_50%_40%,rgba(37,99,173,0.1)_0%,rgba(3,5,8,0.94)_100%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-[#030508]/95 via-slate-950/60 to-[#030508]"
          aria-hidden
        />

        <motion.div
          className="relative z-10 mx-auto w-full max-w-3xl"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: easeOut }}
        >
          <PdcSectionEyebrow label="Conexión" icon={Home} className="mb-2.5" />
          <h1 id="iec-heading" className={pdcPageTitleClass}>
            <span className={pdcPageTitleLineClass}>Iglesia en casa</span>
            <span className={pdcPageTitleAccentClass}>fe vivida en comunidad</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-serif text-lg leading-relaxed text-white/88 md:text-xl">
            Espacios de encuentro semanal para crecer, compartir la vida y caminar juntos.
          </p>
          <p className={`${bodyText} mx-auto mt-3 max-w-lg text-sm md:text-[0.95rem]`}>
            Grupos pequeños en hogares: más cerca, más real, más familia.
          </p>
          <PdcSegmentBar size="lg" className="mx-auto mt-6" />

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href={FORM_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="pdc-btn-on-dark-accent max-w-none"
            >
              <span className="relative z-[1]">Quiero ser parte</span>
            </a>
            <button
              type="button"
              onClick={() => scrollToSection("iec-comunidad")}
              className="pdc-btn-on-dark max-w-none"
            >
              <span className="relative z-[1] flex items-center gap-2">
                Conocer más
                <ChevronDown className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
              </span>
            </button>
          </div>
        </motion.div>
      </header>

      {/* Comunidad — invitación visual */}
      <section
        id="iec-comunidad"
        className={`border-t border-white/[0.06] py-14 md:py-20 ${pdcHeaderScrollMargin}`}
        aria-labelledby="iec-comunidad-heading"
      >
        <div className={pdcPageInnerClass}>
          <h2 id="iec-comunidad-heading" className="sr-only">
            Así nos reunimos en Iglesia en casa
          </h2>
          <IecComunidadGallery formHref={FORM_HREF} />
        </div>
      </section>

      {/* Propuesta */}
      <section id="iec-propuesta" className={`py-14 md:py-20 ${pdcHeaderScrollMargin}`}>
        <div className={pdcPageInnerClass}>
        <motion.div {...fadeUp()} className="mb-10 md:mb-14">
          <PdcSectionHeader
            as="h2"
            variant="block"
            eyebrow="La propuesta"
            eyebrowIcon={Lightbulb}
            title="Un puente más cercano"
            showSegmentBar
          />
        </motion.div>

        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <motion.div {...fadeUp(0.05)} className="space-y-5">
            <p className={`${bodyText} text-sm md:text-base`}>
              <span className="font-semibold text-[#faf8f4]">Grupos pequeños en casa</span> son la
              estrategia para crear puentes de conexión más estrechos y cercanos que un solo encuentro
              dominical.
            </p>
            <p className={`${bodyText} text-sm md:text-base`}>
              Creemos que el Reino de Dios se construye en comunidad: vínculos sanos, relaciones que
              sostienen y una{" "}
              <span className="font-semibold text-[#faf8f4]">familia de fe</span> que camina unida en lo
              cotidiano.
            </p>
            <p className={`${bodyText} text-sm md:text-[0.95rem]`}>
              No reemplaza la iglesia local: la complementa con presencia, cuidado y discipulado en el
              barrio.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp(0.1)}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-8 md:p-10"
          >
            <motion.div
              className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-secondary/15 blur-3xl"
              aria-hidden
            />
            <p className="relative font-serif text-xl leading-snug text-white md:text-2xl">
              “Donde dos o tres se reúnen en mi nombre, allí estoy yo en medio de ellos.”
            </p>
            <p className="relative mt-4 font-sans text-sm font-medium uppercase tracking-[0.14em] text-secondary/90">
              Mateo 18:20
            </p>
          </motion.div>
        </div>
        </div>
      </section>

      {/* Encuentros */}
      <section
        id="iec-encuentros"
        className={`border-t border-white/10 bg-white/[0.02] ${pdcHeaderScrollMargin}`}
      >
        <div className={`${pdcPageInnerClass} py-14 md:py-20`}>
          <motion.div {...fadeUp()} className="mb-10 md:mb-12">
            <PdcSectionHeader
              as="h2"
              variant="block"
              eyebrow="Cada encuentro"
              eyebrowIcon={CalendarHeart}
              title="¿Qué buscamos juntos?"
              subtitle="Un ritmo simple y humano: palabra, comunión y cuidado mutuo."
              showSegmentBar
            />
          </motion.div>

          <ul
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4"
            role="list"
          >
            {ENCUENTRO_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.li
                  key={item.label}
                  {...fadeUp(i * 0.04)}
                  className="group flex gap-4 rounded-xl border border-white/[0.08] bg-white/[0.04] p-4 transition-colors duration-300 hover:border-secondary/25 hover:bg-white/[0.06] md:p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-secondary/30 bg-secondary/10 text-secondary transition group-hover:border-secondary/50">
                    <Icon className="h-[1.15rem] w-[1.15rem]" aria-hidden />
                  </span>
                  <span className={`${bodyText} text-left text-sm leading-snug`}>{item.label}</span>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Sumate */}
      <section id="iec-sumate" className={`py-16 md:py-24 text-center ${pdcHeaderScrollMargin}`}>
        <div className="relative z-10 mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp()}>
          <PdcSectionHeader
            as="h2"
            variant="block"
            eyebrow="Próximo paso"
            eyebrowIcon={UserPlus}
            title="Sumate a un grupo"
            showSegmentBar
          />
          <p className={`${bodyText} mx-auto mt-5 max-w-lg text-sm md:text-base`}>
            Completá el formulario y te contactamos para ubicarte en un encuentro cerca tuyo. Si preferís,
            escribinos por WhatsApp.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href={FORM_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="pdc-btn-on-dark-accent max-w-none"
            >
              <span className="relative z-[1]">Completar formulario</span>
            </a>
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="pdc-btn-on-dark-ghost max-w-none"
            >
              <span className="relative z-[1]">Consultar por WhatsApp</span>
            </a>
          </div>
        </motion.div>
        </div>
      </section>
    </div>
  );
};

export default IglesiaEnCasaSection;
