import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Users } from "lucide-react";
import type { MinisterSlug } from "../data/ministros";
import PdcSegmentBar from "./PdcSegmentBar";
import { PdcMinisterPortrait } from "./PdcMinisterPortrait";
import { Reveal } from "./bethel/Reveal";
import { PdcPageShell } from "./PdcPageShell";
import { PdcSectionHeader, pdcPageInnerWithHeroComfort, pdcPageIntroHeaderClass } from "./PdcSectionHeader";

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

const zoomEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

function formatDisplayName(upperName: string): string {
  return upperName
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const pastors: Member = {
  name: "JORGE Y GABRIELA BUGUEÑO",
  slug: "jorge-gabriela",
  displayName: "Jorge y Gabriela Bugueño",
  role: "Pastores generales",
  objectPosition: "center 30%",
};

const team: Member[] = [
  {
    name: "OSCAR TERMINI",
    slug: "oscar-termini",
    displayName: formatDisplayName("OSCAR TERMINI"),
    role: "Pastor asistente",
    objectPosition: "center 20%",
  },
  {
    name: "GUSTAVO BECERRO",
    slug: "gustavo-becerro",
    displayName: formatDisplayName("GUSTAVO BECERRO"),
    role: "Ministerio general",
  },
  {
    name: "SILVIA TAIETI",
    slug: "silvia-taieti",
    displayName: formatDisplayName("SILVIA TAIETI"),
    role: "Ministerio general",
    objectPosition: "center 18%",
  },
  {
    name: "DAMIAN MARCORA",
    slug: "damian-marcora",
    displayName: formatDisplayName("DAMIAN MARCORA"),
    role: "Ministerio general",
  },
  {
    name: "PAOLA VIRRZI",
    slug: "paola-virrzi",
    displayName: formatDisplayName("PAOLA VIRRZI"),
    role: "Ministerio general",
    objectPosition: "center 16%",
  },
  {
    name: "VERONICA MARTINEZ",
    slug: "veronica-martinez",
    displayName: formatDisplayName("VERONICA MARTINEZ"),
    role: "Ministerio general",
    objectPosition: "center 20%",
  },
  {
    name: "DEBORA BUGUEÑO",
    slug: "debora-bugueno",
    displayName: formatDisplayName("DEBORA BUGUEÑO"),
    role: "Ministerio general",
    objectPosition: "center 22%",
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
};

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  person,
  index,
  revealed,
  hovered,
  onHover,
  glow,
  translateEnter,
}) => {
  const dimOthers = Boolean(hovered && hovered !== person.name);
  const glowClass = glow === "secondary" ? "bg-secondary/25" : "bg-primary/25";

  return (
    <div
      role="listitem"
      onMouseEnter={() => onHover(person.name)}
      onMouseLeave={() => onHover(null)}
      className={`group flex flex-col items-center text-center transition-all duration-500 ease-out motion-reduce:duration-150 max-md:pointer-events-auto md:pointer-events-auto
        ${revealed ? "opacity-100 translate-y-0" : `opacity-0 ${translateEnter}`}
        motion-reduce:opacity-100 motion-reduce:translate-y-0
        ${dimOthers ? "max-md:opacity-100 max-md:scale-100 md:opacity-40 md:scale-[0.98] motion-reduce:md:opacity-100 motion-reduce:md:scale-100" : "opacity-100 scale-100"}
      `}
      style={{ transitionDelay: revealed ? `${index * 60}ms` : "0ms" }}
    >
      <div className="relative mb-4">
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
      <div className="max-w-[12rem] font-sans text-sm font-semibold leading-snug tracking-wide text-[#faf8f4]">
        {person.displayName}
      </div>
      <PdcSegmentBar size="sm" className="mx-auto my-2" />
      <div className={`${mutedRole} max-w-[12rem]`}>{person.role}</div>
    </div>
  );
};

const EquipoMinisterialSection: React.FC = () => {
  const firstRow = team.slice(0, 4);
  const secondRow = team.slice(4);
  const { setRevealRef, revealed } = useRevealOnScroll(0.15);
  const [hovered, setHovered] = useState<string | null>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const pastorsPortraitRef = useRef<HTMLDivElement | null>(null);
  // Mantener useInView por consistencia con el resto del componente;
  // si el elemento ya está visible al montar, la animación igual debe notarse.
  const pastorsPortraitInView = useInView(pastorsPortraitRef, { once: true });

  return (
    <PdcPageShell aria-labelledby="equipo-heading">
      <div className={pdcPageInnerWithHeroComfort}>
      <Reveal priority>
      <header id="equipo-intro" className={pdcPageIntroHeaderClass}>
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

      <Reveal delayMs={80}>
      <div id="equipo-pastores" className="mb-12 scroll-mt-28 md:mb-16">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div className="space-y-5 text-center md:space-y-6">
            <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
              {pastors.displayName}
            </h2>
            <div
              className="mx-auto h-px w-20 bg-gradient-to-r from-transparent via-secondary/65 to-transparent md:w-28"
              aria-hidden
            />
            <p className={`${mutedRole} tracking-[0.22em]`}>{pastors.role}</p>
            <p className={`${bodyText} mx-auto max-w-md text-[0.95rem] md:text-base`}>
              Son un matrimonio profundamente apasionado por la expansión del Reino de Dios. Más de 30 años
              formando personas y levantando líderes.
            </p>
          </div>

          <div className="flex justify-center">
            <motion.div
              ref={pastorsPortraitRef}
              className="group relative flex flex-col items-center"
              style={{ transformOrigin: "center", willChange: "transform" }}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      scale: 1.045,
                      y: -6,
                    }
              }
              whileTap={reduceMotion ? undefined : { scale: 1.0 }}
              initial={reduceMotion ? false : { scale: 0.86, y: 10, opacity: 0.96 }}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      scale: pastorsPortraitInView ? 1 : 0.86,
                      y: pastorsPortraitInView ? 0 : 10,
                      opacity: pastorsPortraitInView ? 1 : 0.96,
                    }
              }
              transition={{ duration: 0.85, ease: zoomEase }}
            >
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
                <div className="h-[min(24rem,calc(100vw-2rem))] w-[min(24rem,calc(100vw-2rem))] rounded-full bg-secondary/25 blur-2xl opacity-70 transition duration-500 group-hover:opacity-100 motion-reduce:opacity-80" />
              </div>
              <PdcMinisterPortrait
                slug={pastors.slug}
                displayName={pastors.displayName}
                variant="lead"
                objectPosition={pastors.objectPosition}
                loading="eager"
                fetchPriority="high"
              />
            </motion.div>
          </div>
        </div>
      </div>
      </Reveal>

      <div
        id="equipo-ministros"
        className="mb-10 scroll-mt-28 border-t border-white/10 pt-10 text-center md:mb-12 md:pt-12"
      >
        <h2 className="font-serif text-2xl text-white md:text-3xl">Ministros y liderazgo</h2>
        <p className={`${bodyText} mx-auto mt-4 max-w-xl text-sm md:text-base`}>
          Personas comprometidas con servir, acompañar y transformar vidas.
        </p>
      </div>

      <div id="equipo-grid" ref={setRevealRef} className="scroll-mt-28 flex flex-col gap-14 md:gap-20" role="list">
        <div className="grid grid-cols-2 justify-items-center gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-8 md:gap-y-14">
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
            />
          ))}
        </div>

        <div className="mx-auto grid max-w-3xl grid-cols-2 justify-items-center gap-x-6 gap-y-12 md:grid-cols-3 md:gap-x-10 md:gap-y-14">
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
            />
          ))}
        </div>
      </div>

      </div>
    </PdcPageShell>
  );
};

export default EquipoMinisterialSection;

