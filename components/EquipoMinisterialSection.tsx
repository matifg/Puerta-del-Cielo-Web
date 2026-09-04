import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Users } from "lucide-react";
import { MINISTER_LEAD_LQIP, type MinisterSlug } from "../data/ministros";
import { PdcMinisterPortrait } from "./PdcMinisterPortrait";
import { Reveal } from "./bethel/Reveal";
import { PdcPageShell } from "./PdcPageShell";
import { PdcSectionHeader, pdcPageInnerClass } from "./PdcSectionHeader";

/** Aire bajo navbar fijo (+ safe-area en móvil) sin modificar el header global. */
const equipoPageTopClass = `${pdcPageInnerClass} pt-[calc(2rem+env(safe-area-inset-top,0px))] md:pt-[calc(2.5rem+env(safe-area-inset-top,0px))] lg:pt-[calc(3rem+env(safe-area-inset-top,0px))]`;

export const EQUIPO_FOOTER_ROOT_ID = "equipo-footer-root";

type Member = {
  name: string;
  slug: MinisterSlug;
  displayName: string;
  role: string;
  objectPosition?: string;
};

const bodyText = "text-white/90 font-sans font-medium leading-relaxed";
const mutedRole =
  "text-secondary/90 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.18em]";

/** Grid 8 cols en md: fila 1 en 1/3/5/7, fila 2 en 2/4/6 (pirámide centrada). */
const FIRST_ROW_MD_COL = ["md:col-span-2 md:col-start-1", "md:col-span-2 md:col-start-3", "md:col-span-2 md:col-start-5", "md:col-span-2 md:col-start-7"] as const;
const SECOND_ROW_MD_COL = ["md:col-span-2 md:col-start-2", "md:col-span-2 md:col-start-4", "md:col-span-2 md:col-start-6"] as const;

const pastors: Member = {
  name: "JORGE Y GABRIELA BUGUEÑO",
  slug: "jorge-gabriela",
  displayName: "Jorge y Gabriela Bugueño",
  role: "Pastores generales",
};

const PASTORS_EASE = [0.22, 1, 0.36, 1] as const;

const PASTORS_NAME_WORDS = pastors.displayName.split(" ");
/** Un párrafo por idea: cada uno sube con su propia máscara al revelarse. */
const PASTORS_BIO_LINES = [
  "Son un matrimonio profundamente apasionado por la expansión del Reino de Dios.",
  "Más de 30 años formando personas y levantando líderes.",
];

/**
 * Coreografía del bloque de pastores. Los delays son absolutos (no stagger)
 * para que foto y texto entren entrelazados según un guion fijo.
 */
const T = {
  glow: 0,
  photo: 0.2,
  sheen: 0.95,
  role: 0.3,
  nameWord: 0.6,
  rule: 1.1,
  bioLine: 1.35,
} as const;

/** Con `reduced motion` solo cruzamos opacidad: sin desplazamientos ni blur. */
function fadeOnly(delay: number) {
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.35, delay, ease: "linear" as const } },
  };
}

function maskRise(delay: number, distance = "100%") {
  return {
    hidden: { y: distance, opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: 1.25, delay, ease: PASTORS_EASE },
    },
  };
}

const pastorsRoleReveal = {
  hidden: { opacity: 0, letterSpacing: "0.6em", filter: "blur(4px)" },
  visible: {
    opacity: 1,
    letterSpacing: "0.22em",
    filter: "blur(0px)",
    transition: { duration: 1.6, delay: T.role, ease: PASTORS_EASE },
  },
};

const pastorsRule = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.4, delay: T.rule, ease: PASTORS_EASE },
  },
};

/** Cortina de abajo hacia arriba + desenfoque que se resuelve. */
const pastorsPhotoFrame = {
  hidden: {
    clipPath: "inset(100% 0% 0% 0% round 1.75rem)",
    scale: 1.06,
    filter: "blur(16px)",
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0% round 1.75rem)",
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 2.3, delay: T.photo, ease: PASTORS_EASE },
  },
};

const pastorsPhotoGlow = {
  hidden: { opacity: 0, scale: 0.86 },
  visible: {
    opacity: 0.85,
    scale: 1,
    transition: { duration: 2.2, delay: T.glow, ease: PASTORS_EASE },
  },
};

const pastorsSheen = {
  hidden: { x: "-150%", opacity: 0 },
  visible: {
    x: "150%",
    opacity: [0, 0.8, 0],
    transition: { duration: 1.8, delay: T.sheen, ease: PASTORS_EASE },
  },
};

const team: Member[] = [
  {
    name: "OSCAR TERMINI",
    slug: "oscar-termini",
    displayName: "Oscar Termini",
    role: "Pastor Ordenado",
  },
  {
    name: "DEBORA BUGUEÑO",
    slug: "debora-bugueno",
    displayName: "Débora Bugueño",
    role: "Ministro Ordenado",
  },
  {
    name: "GUSTAVO BECERRO",
    slug: "gustavo-becerro",
    displayName: "Gustavo Becerro",
    role: "Ministro Ordenado",
  },
  {
    name: "SILVIA TAIETI",
    slug: "silvia-taieti",
    displayName: "Silvia Taieti",
    role: "Ministro Ordenado",
  },
  {
    name: "PAOLA VIRRZI",
    slug: "paola-virrzi",
    displayName: "Paola Virrzi",
    role: "Ministro Ordenado",
  },
  {
    name: "DAMIAN MARCORA",
    slug: "damian-marcora",
    displayName: "Damián Marcora",
    role: "Ministro Ordenado",
  },
  {
    name: "VERONICA MARTINEZ",
    slug: "veronica-martinez",
    displayName: "Verónica Martínez",
    role: "Ministro Ordenado",
  },
];

function useRevealOnScroll(threshold = 0.15) {
  const [root, setRoot] = useState<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!root || revealed) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRevealed(true);
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [root, revealed, threshold]);

  return { setRevealRef: setRoot, revealed };
}

type TeamMemberCardProps = {
  person: Member;
  index: number;
  revealed: boolean;
  hovered: string | null;
  onHover: (name: string | null) => void;
  glow: "primary" | "secondary";
  translateEnter: "translate-y-8" | "translate-y-10";
  className?: string;
};

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  person,
  index,
  revealed,
  hovered,
  onHover,
  glow,
  translateEnter,
  className = "",
}) => {
  const dimOthers = Boolean(hovered && hovered !== person.name);
  const glowClass = glow === "secondary" ? "bg-secondary/25" : "bg-primary/25";
  const [firstName, ...rest] = person.displayName.split(" ");
  const lastName = rest.join(" ");

  return (
    <div
      role="listitem"
      onMouseEnter={() => onHover(person.name)}
      onMouseLeave={() => onHover(null)}
      className={`group flex flex-col items-center text-center transition-[opacity,transform] duration-500 ease-out motion-reduce:duration-150
        ${revealed ? "opacity-100 translate-y-0" : `opacity-0 ${translateEnter}`}
        motion-reduce:opacity-100 motion-reduce:translate-y-0
        ${dimOthers ? "max-md:opacity-100 md:opacity-40 motion-reduce:md:opacity-100" : "opacity-100"}
        ${hovered === person.name ? "relative z-10" : ""}
        ${className}`.trim()}
      style={{ transitionDelay: revealed ? `${index * 60}ms` : "0ms" }}
    >
      <div className="relative mb-1.5 lg:mb-2">
        <div
          className={`pointer-events-none absolute inset-0 rounded-full ${glowClass} blur-2xl opacity-0 transition duration-500 group-hover:opacity-100 motion-reduce:opacity-0`}
          aria-hidden
        />
        <PdcMinisterPortrait
          slug={person.slug}
          displayName={person.displayName}
          variant="team"
          objectPosition={person.objectPosition}
        />
      </div>
      {/* Nombre en dos líneas (nombre / apellido): lectura más ordenada en la grilla. */}
      <div className="max-w-[11rem] font-serif text-[0.95rem] leading-[1.2] text-[#faf8f4] lg:max-w-[12rem] lg:text-[1.05rem]">
        <span className="block">{firstName}</span>
        {lastName ? <span className="block">{lastName}</span> : null}
      </div>
      <div className={`${mutedRole} mt-1.5 max-w-[11rem] lg:max-w-[12rem]`}>{person.role}</div>
    </div>
  );
};

/**
 * Arranca la coreografía cuando el bloque está a la vista Y la foto ya decodificó,
 * así la secuencia no se consume durante el primer pintado de la página.
 */
function usePastorsPlayback(inView: boolean) {
  const [portraitReady, setPortraitReady] = useState(false);
  const handlePortraitReady = useCallback(() => setPortraitReady(true), []);

  // Si la foto tarda o falla, la secuencia arranca igual.
  useEffect(() => {
    if (portraitReady) return;
    const t = window.setTimeout(() => setPortraitReady(true), 1400);
    return () => window.clearTimeout(t);
  }, [portraitReady]);

  return { play: inView && portraitReady, handlePortraitReady };
}

const EquipoMinisterialSection: React.FC = () => {
  const firstRow = team.slice(0, 4);
  const secondRow = team.slice(4);
  const { setRevealRef, revealed } = useRevealOnScroll(0.15);
  const [hovered, setHovered] = useState<string | null>(null);
  const reduceMotion = useReducedMotion() ?? false;

  const pastorsBlockRef = useRef<HTMLDivElement | null>(null);
  const pastorsInView = useInView(pastorsBlockRef, { once: true, amount: 0.2 });
  const { play: pastorsPlay, handlePortraitReady } = usePastorsPlayback(pastorsInView);

  const { scrollYProgress } = useScroll({
    target: pastorsBlockRef,
    offset: ["start end", "end start"],
  });
  const photoParallax = useTransform(scrollYProgress, [0, 1], [12, -12]);

  return (
    <PdcPageShell aria-labelledby="equipo-heading" className="pb-6 md:pb-8">
      <div className={equipoPageTopClass}>
      <Reveal priority>
      <header id="equipo-intro" className="mb-4 scroll-mt-28 md:mb-5">
        <PdcSectionHeader
          headingId="equipo-heading"
          eyebrow="Quiénes somos"
          eyebrowIcon={Users}
          title="Equipo ministerial"
          subtitle="Una mirada a quienes pastorean y al equipo que acompaña el día a día en nuestra casa."
          showSegmentBar
        />
      </header>
      </Reveal>

      <div id="equipo-pastores" className="mb-7 scroll-mt-28 md:mb-9">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 md:flex-row md:items-center md:justify-center md:gap-8">
          <motion.div
            className="order-2 max-w-md space-y-3 text-center md:order-1 md:space-y-3.5 md:text-left"
            initial={pastorsPlay ? "visible" : "hidden"}
            animate={pastorsPlay ? "visible" : "hidden"}
          >
            <motion.p
              variants={reduceMotion ? fadeOnly(T.role) : pastorsRoleReveal}
              className={`${mutedRole} tracking-[0.22em]`}
            >
              {pastors.role}
            </motion.p>

            <h2 className="font-serif text-[1.85rem] leading-[1.1] text-white sm:text-[2.15rem] md:text-[2.3rem] lg:text-[2.6rem]">
              <span className="sr-only">{pastors.displayName}</span>
              <span className="flex flex-wrap justify-center gap-x-[0.28em] md:justify-start" aria-hidden>
                {PASTORS_NAME_WORDS.map((word, i) => (
                  <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em]">
                    <motion.span
                      className="inline-block"
                      variants={
                        reduceMotion
                          ? fadeOnly(T.nameWord + i * 0.05)
                          : maskRise(T.nameWord + i * 0.11)
                      }
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </span>
            </h2>

            <motion.div
              variants={reduceMotion ? fadeOnly(T.rule) : pastorsRule}
              className="mx-auto h-px w-24 origin-center bg-gradient-to-r from-transparent via-secondary/70 to-transparent md:mx-0 md:w-32 md:origin-left"
              aria-hidden
            />

            <div
              className={`${bodyText} mx-auto max-w-md space-y-2.5 text-[0.9rem] md:mx-0 md:text-[0.95rem] md:leading-[1.7]`}
            >
              {PASTORS_BIO_LINES.map((line, i) => (
                <p key={i} className="overflow-hidden">
                  <motion.span
                    className="block"
                    variants={
                      reduceMotion
                        ? fadeOnly(T.bioLine + i * 0.08)
                        : maskRise(T.bioLine + i * 0.18, "115%")
                    }
                  >
                    {line}
                  </motion.span>
                </p>
              ))}
            </div>
          </motion.div>

          <motion.div
            ref={pastorsBlockRef}
            className="group relative order-1 w-[min(68vw,12.5rem)] shrink-0 sm:w-[13.5rem] md:order-2 md:w-[14.5rem] lg:w-[15.5rem]"
            initial={pastorsPlay ? "visible" : "hidden"}
            animate={pastorsPlay ? "visible" : "hidden"}
            style={reduceMotion ? undefined : { y: photoParallax }}
          >
            <motion.div
              variants={reduceMotion ? fadeOnly(T.glow) : pastorsPhotoGlow}
              className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-secondary/15 blur-[2.5rem] sm:-inset-5"
              aria-hidden
            />

            <motion.div
              variants={reduceMotion ? fadeOnly(T.photo) : pastorsPhotoFrame}
              className="relative will-change-transform"
            >
              <PdcMinisterPortrait
                slug={pastors.slug}
                displayName={pastors.displayName}
                variant="lead"
                loading="eager"
                fetchPriority="high"
                lqip={MINISTER_LEAD_LQIP}
                onReady={handlePortraitReady}
              />

              {!reduceMotion ? (
                <motion.div
                  variants={pastorsSheen}
                  className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  aria-hidden
                />
              ) : null}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div
        id="equipo-ministros"
        className="mb-5 scroll-mt-28 border-t border-white/10 pt-6 text-center md:mb-6 md:pt-7"
      >
        <h2 className="font-serif text-2xl text-white md:text-[1.65rem] lg:text-[1.85rem]">Ministros y liderazgo</h2>
        <p className={`${bodyText} mx-auto mt-2.5 max-w-xl text-sm md:text-[0.8125rem] lg:mt-3 lg:text-[0.9rem]`}>
          Personas comprometidas con servir, acompañar y transformar vidas.
        </p>
      </div>

      <div
        id="equipo-grid"
        ref={setRevealRef}
        className="scroll-mt-28 grid grid-cols-2 justify-items-center gap-x-5 gap-y-5 pb-1 md:grid-cols-8 md:gap-x-6 md:gap-y-5 lg:gap-x-7 lg:gap-y-6"
        role="list"
      >
        {firstRow.map((person, i) => (
          <TeamMemberCard
            key={person.name}
            person={person}
            index={i}
            revealed={revealed}
            hovered={hovered}
            onHover={setHovered}
            glow="secondary"
            translateEnter="translate-y-8"
            className={FIRST_ROW_MD_COL[i]}
          />
        ))}
        {secondRow.map((person, i) => (
          <TeamMemberCard
            key={person.name}
            person={person}
            index={i + firstRow.length}
            revealed={revealed}
            hovered={hovered}
            onHover={setHovered}
            glow="primary"
            translateEnter="translate-y-10"
            className={`${SECOND_ROW_MD_COL[i]}${i === secondRow.length - 1 ? " max-md:col-span-2" : ""}`}
          />
        ))}
      </div>

      </div>
    </PdcPageShell>
  );
};

export default EquipoMinisterialSection;

