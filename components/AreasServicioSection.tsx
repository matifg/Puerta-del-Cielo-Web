import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import {
  Baby,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Flame,
  HandHeart,
  Headphones,
  Heart,
  Layers,
  Link2,
  Music,
  Palette,
  User,
  Users,
  Video,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PdcPageShell } from "./PdcPageShell";
import {
  PdcSectionHeader,
  pdcHeaderScrollMarginTop,
  pdcPageInnerWithHeroComfort,
  pdcPageIntroHeaderClass,
} from "./PdcSectionHeader";
type Area = {
  title: string;
  description: string;
  full: string;
  icon: LucideIcon;
  image?: {
    src: string;
    alt: string;
    objectPosition?: string;
  };
};

const areas: Area[] = [
  {
    title: "Alabanza y Adoración",
    description: "Guían a otros en adoración.",
    full: `Ministros y músicos apasionados que
con habilidad musical y sensibilidad espiritual, guían a otros en adoración
y construyen ambientes para que la gloria de Dios se manifieste.`,
    icon: Music,
    image: {
      src: "/images/areasServicio/areaservicio2.jpeg",
      alt: "Alabanza y adoración: músicos y equipo ministrando en la reunión",
      objectPosition: "center 38%",
    },
  },
  {
    title: "Intercesión",
    description: "Se colocan en la brecha por otros.",
    full: `Hombres y mujeres que mediante la intercesión y la guerra espiritual,
aceptan el llamado de colocarse en la brecha delante de Dios,
a favor de las familias, la iglesia, la ciudad y la nación.`,
    icon: HandHeart,
  },
  {
    title: "Artes Dinámicas",
    description: "Expresión artística espiritual.",
    full: `Este ministerio utiliza la expresión artística como un medio para honrar a Dios
y comunicar verdades espirituales. Corazones son impactados a través de la danza,
el movimiento y distintas manifestaciones creativas.`,
    icon: Palette,
  },
  {
    title: "Medios Audiovisuales",
    description: "Comunicación visual del mensaje.",
    full: `Mediante la tecnología y la comunicación visual, esparcimos el mensaje del evangelio.
Este ministerio integra redes sociales, producción audiovisual,
proyección de letras y monitoreo de las pantallas interactivas.`,
    icon: Video,
  },
  {
    title: "Audio y Sonido",
    description: "Calidad sonora en cada servicio.",
    full: `Manejo de sonido, mezcla y cuidado técnico de los equipos,
son elementos necesarios para garantizar que el mensaje del evangelio
llegue a cada persona de forma clara. Esta área trabaja con dedicación
para crear un ambiente sonoro adecuado en cada servicio.`,
    icon: Headphones,
  },
  {
    title: "Anfitriones",
    description: "Reciben y acompañan.",
    full: `Este equipo de servidores trabaja con entusiasmo para que cada persona
que asiste a los servicios tenga una experiencia agradable desde el ingreso.
Brinda asistencia durante toda la reunión y al momento de regresar a casa.`,
    icon: Users,
  },
  {
    title: "Mantenimiento Integral",
    description: "Cuidado de la casa.",
    full: `Hombres y mujeres llenos de amor por la Casa se dedican a tareas de aseo,
mantenimiento y refacciones. Cuidan las instalaciones y aseguran que todo esté
en óptimas condiciones para cada servicio.`,
    icon: Wrench,
  },
  {
    title: "Área Social",
    description: "Ayuda a la comunidad.",
    full: `Esta área es un brazo extendido a la comunidad,
con el propósito de atender necesidades, brindar asistencia
y compartir el mensaje de esperanza con los sectores más vulnerables.`,
    icon: Heart,
  },
  {
    title: "Área Educativa",
    description: "Formación y discipulado.",
    full: `El crecimiento y madurez integral mediante la enseñanza bíblica
es una de nuestras prioridades. Se brindan espacios de formación,
entrenamiento y discipulado durante todo el año.`,
    icon: BookOpen,
  },
  {
    title: "Juventud Inquebrantable",
    description: "Fe con propósito.",
    full: `Un grupo de jóvenes enfocado en vivir una fe activa y con propósito.
Buscan la presencia de Dios y crecen en identidad, comunidad y dones.`,
    icon: Flame,
  },
  {
    title: "Teens",
    description: "Adolescentes en crecimiento.",
    full: `Espacio para adolescentes entre 12 y 15 años.
A través de enseñanza bíblica y valores, se los guía en su identidad en Dios
y en el desarrollo de una fe firme.`,
    icon: User,
  },
  {
    title: "Kids",
    description: "Niños con propósito.",
    full: `El ministerio Kids enseña principios bíblicos mediante juegos y dinámicas.
Cada encuentro es una experiencia llena de alegría, creatividad y presencia de Dios.`,
    icon: Baby,
  },
  {
    title: "Conexión",
    description: "Comunidad y vínculos.",
    full: `Espacios semanales para crecer en la fe, compartir la vida y caminar juntos.
Se fortalecen vínculos, se edifican familias y cada persona es acompañada
en su relación con Dios.`,
    icon: Link2,
  },
];

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

function areaSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const AreasServicioSection: React.FC = () => {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const reduceMotion = useReducedMotion() ?? false;

  const scrollToLista = useCallback(() => {
    document.getElementById("areas-servicio-lista")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [reduceMotion]);

  const toggle = useCallback((idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  }, []);

  const goPrev = useCallback(() => {
    setOpenIndex((i) => {
      if (i === null) return null;
      return (i + areas.length - 1) % areas.length;
    });
  }, []);

  const goNext = useCallback(() => {
    setOpenIndex((i) => {
      if (i === null) return null;
      return (i + 1) % areas.length;
    });
  }, []);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpenIndex(null);
        return;
      }
      const tgt = e.target as HTMLElement | null;
      if (tgt?.closest?.("input, textarea, select, [contenteditable=true]")) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, goNext, goPrev]);

  useEffect(() => {
    if (openIndex === null) return;
    const el = itemRefs.current[openIndex];
    if (!el) return;
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
  }, [openIndex, reduceMotion]);

  const headerVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.12 : 0.45, ease: easeOut },
    },
  };

  const listContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.04,
        delayChildren: reduceMotion ? 0 : 0.06,
      },
    },
  };

  const listItem = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.12 : 0.42, ease: easeOut },
    },
  };

  const layoutSpring = reduceMotion
    ? { duration: 0.18, ease: easeOut }
    : { type: "spring" as const, stiffness: 380, damping: 34, mass: 0.78 };

  return (
    <PdcPageShell aria-labelledby="areas-servicio-heading">
      <div className={pdcPageInnerWithHeroComfort}>
        <div className="mx-auto max-w-3xl">
        <motion.header
          className={`${pdcPageIntroHeaderClass} text-center`}
          initial="hidden"
          animate="show"
          variants={headerVariants}
        >
          <PdcSectionHeader
            headingId="areas-servicio-heading"
            eyebrow="Quiénes somos"
            eyebrowIcon={Layers}
            title="Áreas de servicio"
            subtitle="Expandí cada área. Dentro del panel usá anterior y siguiente — o las flechas arriba / abajo. Esc cierra."
            showSegmentBar
          />
          <button
            type="button"
            onClick={scrollToLista}
            className="pdc-btn-on-dark mx-auto mt-6 gap-2 px-6 py-3 text-xs uppercase tracking-[0.18em]"
          >
            <span className="relative z-[1]">Ver áreas</span>
            <ChevronDown className="relative z-[1] h-4 w-4 shrink-0 text-secondary" aria-hidden />
          </button>
        </motion.header>

        <LayoutGroup id={`${baseId}-areas-accordion`}>
          <motion.ul
            id="areas-servicio-lista"
            className={`${pdcHeaderScrollMarginTop} space-y-3 md:space-y-3.5`}
            role="list"
            initial="hidden"
            animate="show"
            variants={listContainer}
          >
            {areas.map((area, idx) => {
              const Icon = area.icon;
              const isOpen = openIndex === idx;
              const panelId = `${baseId}-panel-${areaSlug(area.title)}`;
              const headerId = `${baseId}-header-${areaSlug(area.title)}`;

              return (
                <motion.li
                  key={area.title}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  layout
                  transition={layoutSpring}
                  variants={listItem}
                  className={`relative overflow-hidden rounded-2xl border transition-[border-color,box-shadow] duration-500 ease-out ${
                    isOpen
                      ? "border-secondary/45 bg-gradient-to-br from-white/[0.07] via-[#0c1424]/90 to-[#080c16] shadow-[0_0_0_1px_rgba(64,194,222,0.12),0_24px_80px_-32px_rgba(37,99,173,0.45),inset_0_1px_0_rgba(255,255,255,0.06)]"
                      : "border-white/[0.09] bg-white/[0.02] shadow-none hover:border-white/15 hover:bg-white/[0.04]"
                  }`}
                >
                  {isOpen ? (
                    <motion.div
                      layout
                      className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-secondary/25 blur-3xl"
                      aria-hidden
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={reduceMotion ? { duration: 0.15 } : { duration: 0.55, ease: easeOut }}
                    />
                  ) : null}
                  {isOpen ? (
                    <motion.div
                      layout
                      className="pointer-events-none absolute -bottom-28 -left-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl"
                      aria-hidden
                      initial={{ opacity: 0, scale: 0.65 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={reduceMotion ? { duration: 0.15 } : { duration: 0.6, ease: easeOut, delay: 0.06 }}
                    />
                  ) : null}

                  <div className="relative z-[1]">
                    <motion.button
                      type="button"
                      id={headerId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      layout="position"
                      transition={layoutSpring}
                      onClick={() => toggle(idx)}
                      className="flex w-full items-start gap-4 px-4 py-5 text-left md:gap-5 md:px-5 md:py-6"
                    >
                      <motion.span
                        layout
                        transition={layoutSpring}
                        animate={
                          reduceMotion
                            ? {}
                            : { scale: isOpen ? 1.08 : 1, rotate: isOpen ? [4, 0] : 0 }
                        }
                        className={`mt-0.5 inline-flex shrink-0 rounded-xl border p-2 shadow-inner ${
                          isOpen ? "border-secondary/35 bg-secondary/10 text-secondary" : "border-white/10 bg-black/25 text-secondary/85"
                        }`}
                        aria-hidden
                      >
                        <Icon className="h-5 w-5 md:h-[1.15rem] md:w-[1.15rem]" />
                      </motion.span>

                      <span className="min-w-0 flex-1 pt-0.5">
                        <span className={`block font-serif text-lg md:text-xl ${isOpen ? "text-[#faf8f4]" : "text-white/95"}`}>
                          {area.title}
                        </span>
                        <span className="mt-1 block font-sans text-sm font-medium leading-snug text-white/85">
                          {area.description}
                        </span>
                      </span>

                      <motion.span
                        layout
                        transition={layoutSpring}
                        className="mt-1 flex shrink-0 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-secondary/90"
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        aria-hidden
                      >
                        {!isOpen ? (
                          <span className="hidden font-sans text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-zinc-300/80 sm:inline">
                            Ver más
                          </span>
                        ) : null}
                        <ChevronDown className="h-5 w-5" />
                      </motion.span>
                    </motion.button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <AnimatePresence initial={false} mode="popLayout">
                          {isOpen ? (
                            <motion.div
                              key={area.title}
                              id={panelId}
                              role="region"
                              aria-labelledby={headerId}
                              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12, filter: "blur(6px)" }}
                              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, filter: "blur(4px)" }}
                              transition={reduceMotion ? { duration: 0.12 } : { duration: 0.38, ease: easeOut }}
                              className="border-t border-white/[0.08] px-4 pb-5 pt-1 md:px-5 md:pb-6"
                            >
                              {area.image ? (
                                <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_20px_60px_-28px_rgba(0,0,0,0.75)]">
                                  <div className="relative aspect-[16/9] w-full">
                                    <img
                                      src={area.image.src}
                                      alt={area.image.alt}
                                      loading="lazy"
                                      decoding="async"
                                      className="absolute inset-0 h-full w-full object-cover"
                                      style={area.image.objectPosition ? { objectPosition: area.image.objectPosition } : undefined}
                                    />
                                    <div
                                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030508]/55 via-transparent to-[#030508]/10"
                                      aria-hidden
                                    />
                                  </div>
                                </div>
                              ) : null}

                              <p className="whitespace-pre-line font-sans text-[0.95rem] leading-relaxed text-[#e4e0d8]/92 md:text-base">
                                {area.full}
                              </p>

                              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-5">
                                <span className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                                  {idx + 1} / {areas.length}
                                </span>
                                <div className="flex flex-wrap gap-2">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setOpenIndex(null);
                                    }}
                                    className="inline-flex items-center rounded-full border border-white/12 bg-transparent px-4 py-2.5 font-sans text-xs font-medium text-zinc-400 transition hover:border-white/22 hover:text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                                  >
                                    Cerrar
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </LayoutGroup>
        </div>
      </div>
    </PdcPageShell>
  );
};

export default AreasServicioSection;
