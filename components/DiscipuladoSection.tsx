import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Calendar,
  ChevronDown,
  Clock,
  FileText,
  Gift,
  Heart,
  Images,
  MessageCircle,
  Mic2,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { whatsappUrl } from "../data/contacto";
import { usePdcSectionFab } from "../hooks/usePdcSectionFab";
import { scrollToPdcSectionId } from "../lib/pdcScrollNav";
import { DiscipuladoMomentsBento } from "./DiscipuladoMomentsBento";
import { PdcEducativaDockHint } from "./PdcEducativaDockHint";
import { PdcPlanDock } from "./PdcPlanDock";
import { PdcScrollFabButton } from "./PdcScrollFabButton";
import {
  PdcSectionEyebrow,
  pdcHeaderScrollMargin,
  pdcPageHeroTopComfort,
  pdcPageTitleAccentClass,
  pdcPageTitleClass,
  pdcPageTitleLineClass,
} from "./PdcSectionHeader";

const PDF_HREF = "/docs/escuela-discipulado.pdf";
const WA_HREF = whatsappUrl("Hola! Quiero info sobre Discipulado");
const sectionIds = [
  "disc-hero",
  "disc-resumen",
  "disc-galeria",
  "disc-pilares",
  "disc-programa",
  "disc-cta",
] as const;

const DISC_FAB_LABELS: Record<string, string> = {
  "disc-resumen": "Resumen",
  "disc-galeria": "Galería",
  "disc-pilares": "Pilares",
  "disc-programa": "Programa",
  "disc-cta": "Inscribite",
};

export const DISC_FOOTER_ROOT_ID = "disc-footer-root";

const FEATURES: readonly { label: string; icon: LucideIcon }[] = [
  { label: "Enseñanza bíblica", icon: BookOpen },
  { label: "Formación espiritual", icon: Heart },
  { label: "Material actualizado", icon: Sparkles },
  { label: "Desarrollo de dones", icon: Gift },
  { label: "Comunidad real", icon: Users },
  { label: "Espacios de consulta", icon: MessageCircle },
  { label: "Hábitos saludables", icon: Clock },
  { label: "Ministración", icon: Mic2 },
];

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
    body: "Ritmo sostenible que respeta tu vida, familia y servicio.",
    icon: Clock,
  },
  {
    eyebrow: "Modalidad",
    title: "Quincenal",
    body: "Encuentros espaciados para integrar lo aprendido en la semana.",
    icon: Calendar,
    accent: true,
  },
  {
    eyebrow: "Para quién es",
    title: "Todos los caminos",
    body: "Nuevos en la fe, crecimiento personal y líderes en formación.",
    icon: Target,
  },
  {
    eyebrow: "Material",
    title: "Programa PDF",
    body: "Contenido ordenado por etapas. Disponible en PDF desde los accesos fijos de la página.",
    icon: FileText,
  },
];

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const staggerChildren: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.48, ease: easeOut } },
};

const DISC_CHROME_Z = "z-[10030]";

type DiscipuladoChromePortalsProps = {
  hideFab: boolean;
  fabInsetClass: string;
  onFabClick: () => void;
  fabEyebrow: string;
  fabPrimaryLine: string;
  fabIsLast: boolean;
  fabSrLabel: string;
  fabTitleKey: string;
};

/** Dock y FAB en `body` para quedar por encima del footer (hermano posterior en el DOM). */
function DiscipuladoChromePortals({
  hideFab,
  fabInsetClass,
  onFabClick,
  fabEyebrow,
  fabPrimaryLine,
  fabIsLast,
  fabSrLabel,
  fabTitleKey,
}: DiscipuladoChromePortalsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <>
      <PdcPlanDock
        pdfHref={PDF_HREF}
        waHref={WA_HREF}
        ariaLabel="Acciones: programa y consulta"
        pdfOpenLabel="Abrir programa en PDF"
        pdfDownloadLabel="Descargar programa PDF"
        waLabel="Consultar por WhatsApp sobre Discipulado"
        className={DISC_CHROME_Z}
      />

      {!hideFab ? (
        <div
          className={`pointer-events-none fixed flex flex-col items-end max-lg:pb-[max(0.35rem,env(safe-area-inset-bottom,0px))] ${DISC_CHROME_Z} ${fabInsetClass}`}
        >
          <PdcScrollFabButton
            onClick={onFabClick}
            eyebrow={fabEyebrow}
            primaryLine={fabPrimaryLine}
            pinToTop={fabIsLast}
            ariaLabel={fabSrLabel}
            titleKey={fabTitleKey}
            className="pointer-events-auto"
          />
        </div>
      ) : null}
    </>,
    document.body
  );
}

const DiscipuladoSection = () => {
  const reduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLDivElement>(null);
  const {
    activeIdx,
    nearFooter,
    fabIsLast,
    fabEyebrow,
    fabPrimaryLine,
    onFabClick,
    hideAtStart,
    fabInsetClass,
  } = usePdcSectionFab(sectionIds, DISC_FOOTER_ROOT_ID, DISC_FAB_LABELS);

  const fabSrLabel = fabIsLast
    ? "Subir al inicio del programa de Discipulado"
    : `Ir a ${fabPrimaryLine}`;

  const scrollToSection = useCallback(
    (id: string) => {
      scrollToPdcSectionId(id, {
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [reduceMotion]
  );

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 32, damping: 24, mass: 0.55 });
  const sy = useSpring(my, { stiffness: 32, damping: 24, mass: 0.55 });
  const orb1x = useTransform(sx, (v) => v * 10);
  const orb1y = useTransform(sy, (v) => v * 8);
  const orb2x = useTransform(sx, (v) => -v * 7);
  const orb2y = useTransform(sy, (v) => -v * 6);

  const progress = useMemo(
    () => (nearFooter ? 100 : ((activeIdx + 1) / sectionIds.length) * 100),
    [activeIdx, nearFooter]
  );

  const variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
      show: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0.12 : 0.52, ease: easeOut } },
    }),
    [reduceMotion]
  );

  const onSectionMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion || !sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) / 48);
    my.set((e.clientY - (r.top + r.height / 2)) / 48);
  };

  const resetParallax = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div ref={sectionRef as React.RefObject<HTMLDivElement>} className="relative isolate bg-[#030508]">
      {/* Progreso */}
      <div className="pointer-events-none fixed left-0 top-0 z-[9970] h-0.5 w-full bg-white/[0.06]" aria-hidden>
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Hero */}
      <header
        id="disc-hero"
        className={`relative flex min-h-0 flex-col items-center justify-start overflow-hidden px-4 pb-14 ${pdcPageHeroTopComfort} text-center sm:px-6 sm:pb-16 ${pdcHeaderScrollMargin}`}
        onMouseMove={onSectionMove}
        onMouseLeave={resetParallax}
        aria-labelledby="discipulado-heading"
      >
        <motion.div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.32] saturate-[1.05]"
          style={{ backgroundImage: "url('/images/discipulado.jpeg')" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_95%_75%_at_50%_38%,rgba(37,99,173,0.08)_0%,rgba(3,5,8,0.92)_100%)]"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-[#030508]/90 via-slate-950/55 to-[#030508]" aria-hidden />

        {!reduceMotion ? (
          <>
            <motion.div
              style={{ x: orb1x, y: orb1y }}
              className="pointer-events-none absolute -left-28 top-1/4 z-[3] h-72 w-72 rounded-full bg-secondary/12 blur-[100px]"
              aria-hidden
            />
            <motion.div
              style={{ x: orb2x, y: orb2y }}
              className="pointer-events-none absolute -right-24 bottom-1/3 z-[3] h-64 w-64 rounded-full bg-primary/14 blur-[90px]"
              aria-hidden
            />
          </>
        ) : null}

        <div className="relative z-10 mx-auto w-full max-w-3xl">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: easeOut }}
          >
            <PdcSectionEyebrow label="Área educativa" icon={BookOpen} />
            <h1 id="discipulado-heading" className={pdcPageTitleClass}>
              <span className={pdcPageTitleLineClass}>Discipulado</span>
              <span className={pdcPageTitleAccentClass}>formación con propósito</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl font-serif text-lg leading-relaxed text-white/85 md:text-xl">
              Crecimiento real: formación, acompañamiento y activación en el llamado.
            </p>
            <p className="mx-auto mt-3 max-w-lg font-sans text-sm font-medium leading-relaxed text-white/75 md:text-[0.95rem]">
              Palabra, oración y comunidad — claridad en cada etapa del camino.
            </p>

            <div className="mx-auto mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <motion.button
                type="button"
                onClick={() => scrollToSection("disc-resumen")}
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
                onClick={() => scrollToSection("disc-galeria")}
                className="pdc-btn-on-dark-ghost"
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                <Images className="relative z-[1] h-5 w-5 shrink-0 text-secondary" aria-hidden />
                <span className="relative z-[1]">Galería</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Resumen — cards */}
      <motion.section
        id="disc-resumen"
        className={`relative px-4 py-14 sm:px-6 md:py-16 lg:px-10 ${pdcHeaderScrollMargin}`}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-8% 0px" }}
        variants={variants}
      >
        <motion.div className="mx-auto max-w-6xl" variants={staggerChildren} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.h2 variants={staggerItem} className="mb-3 text-center font-serif text-2xl text-white md:text-3xl">
            Lo esencial del programa
          </motion.h2>
          <motion.p variants={staggerItem} className="mx-auto mb-10 max-w-xl text-center font-sans text-sm text-white/65 md:text-base">
            Dos años de formación con ritmo quincenal, pensado para integrar fe y vida cotidiana.
          </motion.p>
          <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
            {INFO_CARDS.map(({ eyebrow, title, body, icon: Icon, accent }) => (
              <motion.article
                key={eyebrow}
                variants={staggerItem}
                whileHover={reduceMotion ? undefined : { y: -4, transition: { duration: 0.22 } }}
                className={`group relative overflow-hidden rounded-2xl border p-6 backdrop-blur-md transition-colors md:p-7 ${
                  accent
                    ? "border-secondary/30 bg-secondary/[0.08] shadow-[0_20px_60px_-28px_rgba(64,194,222,0.25)]"
                    : "border-white/10 bg-white/[0.04] shadow-[0_20px_60px_-26px_rgba(0,0,0,0.45)] hover:border-secondary/25"
                }`}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06]">
                  <Icon className="h-6 w-6 text-secondary" aria-hidden />
                </div>
                <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-secondary/80">{eyebrow}</p>
                <p className="mt-1.5 font-serif text-2xl font-semibold text-white md:text-3xl">{title}</p>
                <p className="mt-2 font-sans text-sm leading-relaxed text-white/65">{body}</p>
              </motion.article>
            ))}
          </div>

          <DiscipuladoMomentsBento id="disc-galeria" className={`mt-14 md:mt-16 ${pdcHeaderScrollMargin}`} />
        </motion.div>
      </motion.section>

      {/* Pilares */}
      <motion.section
        id="disc-pilares"
        className={`relative border-t border-white/[0.06] px-4 py-14 sm:px-6 md:py-16 lg:px-10 ${pdcHeaderScrollMargin}`}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-8% 0px" }}
        variants={variants}
      >
        <motion.div className="mx-auto max-w-6xl" variants={staggerChildren} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.h2 variants={staggerItem} className="mb-2 text-center font-serif text-2xl text-white md:text-3xl">
            ¿Qué vas a <span className="text-secondary">vivir</span>?
          </motion.h2>
          <motion.p variants={staggerItem} className="mx-auto mb-10 max-w-lg text-center font-sans text-sm text-white/65">
            Ocho pilares que marcan el camino — lo esencial, con el mismo cuidado que en casa.
          </motion.p>
          <motion.ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4" variants={staggerChildren}>
            {FEATURES.map(({ label, icon: Icon }) => (
              <motion.li
                key={label}
                variants={staggerItem}
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                className="group flex gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 backdrop-blur-sm transition hover:border-secondary/30 hover:bg-white/[0.07]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-[#0a1524]/80 text-secondary transition group-hover:border-secondary/40 group-hover:bg-secondary/10">
                  <Icon className="h-[1.1rem] w-[1.1rem]" aria-hidden />
                </div>
                <span className="pt-1.5 font-sans text-sm font-medium leading-snug text-white/85 group-hover:text-white">
                  {label}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.section>

      {/* Programa PDF */}
      <motion.section
        id="disc-programa"
        className={`relative scroll-mt-28 px-4 py-14 sm:px-6 md:min-h-[min(42vh,360px)] md:py-16 lg:px-10 ${pdcHeaderScrollMargin}`}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-8% 0px" }}
        variants={variants}
      >
        <motion.div
          className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-br from-white/[0.08] to-[#0a1524]/80 p-8 shadow-[0_32px_90px_-24px_rgba(37,99,173,0.35)] backdrop-blur-md md:p-10"
          variants={staggerItem}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center text-center md:flex-row md:items-start md:gap-8 md:text-left">
            <div className="mb-6 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-secondary/30 bg-secondary/10 md:mb-0">
              <BookOpen className="h-8 w-8 text-secondary" aria-hidden />
            </div>
            <motion.div className="flex-1">
              <h2 data-pdc-scroll-focus className="font-serif text-2xl text-white md:text-3xl">
                Programa completo en PDF
              </h2>
              <p className="mt-3 font-sans text-sm leading-relaxed text-white/70 md:text-base">
                Etapas, temas y orientación para cada encuentro. Abrí o descargá el PDF con los accesos fijos{" "}
                <span className="text-white/85">abajo a la izquierda</span>, o consultanos por WhatsApp desde el mismo
                menú.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* CTA final */}
      <motion.section
        id="disc-cta"
        className={`relative border-t border-white/[0.06] px-4 pb-24 pt-14 sm:px-6 md:pb-28 lg:px-10 ${pdcHeaderScrollMargin}`}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={variants}
      >
        <motion.div variants={staggerItem} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <PdcEducativaDockHint />
        </motion.div>
      </motion.section>

      <DiscipuladoChromePortals
        hideFab={hideAtStart}
        fabInsetClass={fabInsetClass}
        onFabClick={onFabClick}
        fabEyebrow={fabEyebrow}
        fabPrimaryLine={fabPrimaryLine}
        fabIsLast={fabIsLast}
        fabSrLabel={fabSrLabel}
        fabTitleKey={`${activeIdx}-${fabPrimaryLine}`}
      />
    </div>
  );
};

export default DiscipuladoSection;
