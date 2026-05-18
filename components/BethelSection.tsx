import React, { useState } from "react";
import {
  BookOpen,
  CalendarDays,
  ChevronDown,
  Flame,
  Heart,
  Sparkles,
  Users,
} from "lucide-react";
import { BethelEncounterScenes } from "./bethel/BethelEncounterScenes";
import { BethelTabImage } from "./bethel/BethelTabImage";
import { Reveal } from "./bethel/Reveal";
import type { BethelTabId } from "../data/bethelScenes";
import { scrollToPdcSectionId } from "../lib/pdcScrollNav";
import { PdcPageShell } from "./PdcPageShell";
import {
  PdcSectionHeader,
  PdcSectionQuote,
  pdcPageInnerWithHeroComfort,
  pdcPageIntroHeaderClass,
} from "./PdcSectionHeader";

const TIMELINE = [
  {
    title: "Origen",
    year: "2025",
    body:
      "Iniciado en enero de 2025: fruto de un camino ministerial de más de diez años, entrenamientos en adoración y escuelas que nos formaron para este momento.",
    icon: CalendarDays,
  },
  {
    title: "Llamado",
    year: "Altares",
    body:
      "Dios nos desafió a levantar altares de adoración continua. Un fuego que creció en el corazón y fue confirmado por la profecía.",
    icon: Flame,
  },
  {
    title: "Hoy",
    year: "Tierra",
    body:
      "Encuentros de doce horas de adoración continua: corazones que no descansan hasta construir una morada donde Dios sea honrado.",
    icon: Users,
  },
] as const;

const TABS = [
  {
    id: "corazon",
    label: "El corazón",
    headline: "Morada donde Dios reposa",
    lines: [
      "Construimos en comunidad un espacio donde su gloria transforme ambientes, lugares y personas.",
      "Aunque no habita en templos hechos por manos humanas, decide reposar donde es honrado y adorado.",
    ],
  },
  {
    id: "palabra",
    label: "La Palabra",
    headline: "La atmósfera del cielo",
    lines: [
      "Hace miles de años Dios reveló a David dónde habita. Siglos después, la visión se repite: trono, adoración, intimidad.",
      "Hoy vemos el cumplimiento: en la tierra se levantan expresiones de búsqueda y entrega.",
    ],
  },
  {
    id: "respuesta",
    label: "Nuestra respuesta",
    headline: "Doce horas, un solo propósito",
    lines: [
      "Levantamos altares de doce horas consecutivas: grandes y chicos unidos en adoración, intercesión e intimidad profunda.",
      "Esa es la atmósfera del cielo: el lugar donde Dios habita.",
    ],
  },
] as const;

const ACCORDION = [
  {
    id: "que-es",
    title: "¿Qué es Bethel?",
    summary:
      "Es el nombre que elegimos para este espacio de adoración prolongada y búsqueda de la presencia de Dios, en continuidad con todo lo que ya venimos viviendo como iglesia.",
  },
  {
    id: "profecia",
    title: "Profecía y confirmación",
    summary:
      "El llamado ardió en nuestro interior y fue afirmado mediante una profecía, alineada con la restauración del «tabernáculo de David» en Amós 9:11.",
  },
  {
    id: "vivencia",
    title: "¿Qué vivimos allí?",
    summary:
      "Adoración, intercesión e intimidad profunda: la atmósfera del cielo en la tierra. Un solo anhelo — que sea aquí como es allá.",
  },
] as const;

const glassCard =
  "rounded-2xl border border-white/[0.1] bg-white/[0.04] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.65)] backdrop-blur-xl transition duration-500 hover:border-secondary/25 hover:bg-white/[0.07] hover:shadow-[0_28px_70px_-18px_rgba(37,99,173,0.22)]";

function scrollToBethelContent() {
  scrollToPdcSectionId("bethel-historia", { behavior: "smooth", align: "center" });
}

const BethelSection = () => {
  const [tab, setTab] = useState<BethelTabId>(TABS[0].id);
  const [openAccordion, setOpenAccordion] = useState<string | null>(ACCORDION[0].id);

  const activeTab = TABS.find((t) => t.id === tab) ?? TABS[0];

  return (
    <PdcPageShell id="bethel" aria-labelledby="bethel-heading-title" gradients={false}>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-5%,rgba(64,194,222,0.12),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_100%,rgba(37,99,173,0.14),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#030508] via-[#030508]/97 to-[#050810]"
        aria-hidden
      />

      <div className={pdcPageInnerWithHeroComfort}>
        {/* Encabezado */}
        <Reveal id="bethel-heading" className={`${pdcPageIntroHeaderClass} scroll-mt-28`}>
          <PdcSectionHeader
            as="h2"
            headingId="bethel-heading-title"
            scrollFocus
            eyebrow="Adoración continua"
            eyebrowIcon={Sparkles}
            title="Bethel"
            titleAccent="morada de su presencia"
            quote={
              <PdcSectionQuote>
                <span className="text-secondary/90">“</span>
                Construyendo como comunidad una morada donde Dios pueda reposar, de manera que la manifestación tangible
                de su gloria transforme ambientes, lugares y personas
                <span className="text-secondary/90">”</span>
              </PdcSectionQuote>
            }
          >
            <button type="button" onClick={scrollToBethelContent} className="pdc-btn-on-dark-accent max-w-none">
              <span className="relative z-[1] flex items-center gap-2">
                Conocer más
                <ChevronDown className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
              </span>
            </button>
          </PdcSectionHeader>
        </Reveal>

        {/* Historia + Amós */}
        <div id="bethel-historia" className="relative mb-12 grid scroll-mt-28 gap-8 lg:mb-16 lg:grid-cols-12 lg:items-center lg:gap-8">
          <span
            data-pdc-scroll-focus
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-px w-px -translate-x-1/2 -translate-y-1/2"
            aria-hidden
          />
          <Reveal className="lg:col-span-7">
            <div className="relative pl-8 sm:pl-9">
              <div
                className="absolute left-[0.65rem] top-2 bottom-2 w-px bg-gradient-to-b from-secondary/50 via-white/15 to-primary/30 sm:left-[0.85rem]"
                aria-hidden
              />
              <h3 className="mb-6 font-serif text-xl font-medium text-[#f4f1ec] md:text-2xl">
                Una historia en movimiento
              </h3>
              <ul className="space-y-5 md:space-y-6">
                {TIMELINE.map((step) => {
                  const Icon = step.icon;
                  return (
                    <li key={step.title} className="relative">
                      <div className="absolute -left-8 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-[#0a0f18] shadow-[0_0_24px_rgba(64,194,222,0.15)] sm:-left-10 sm:h-9 sm:w-9">
                        <Icon className="h-4 w-4 text-secondary sm:h-[1.05rem] sm:w-[1.05rem]" aria-hidden />
                      </div>
                      <div className={`${glassCard} p-4 sm:p-5`}>
                        <div className="mb-1.5 flex flex-wrap items-baseline gap-2">
                          <span className="font-serif text-base text-white md:text-lg">{step.title}</span>
                          <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 font-sans text-[0.7rem] font-medium uppercase tracking-wider text-secondary/90">
                            {step.year}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-zinc-400 md:text-[0.95rem] md:leading-relaxed">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          <Reveal delayMs={120} className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/80 to-black/90 p-5 shadow-[0_24px_70px_-24px_rgba(0,0,0,0.75)] sm:p-6 lg:p-7">
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-secondary/20 blur-3xl"
                aria-hidden
              />
              <div className="relative flex gap-4">
                <BookOpen className="mt-0.5 h-8 w-8 shrink-0 text-secondary/90" aria-hidden />
                <div className="min-w-0">
                  <blockquote className="font-serif text-lg font-normal leading-snug text-[#ebe7df] md:text-xl md:leading-snug">
                    <p>
                      <span className="text-secondary/80">«</span>
                      En aquel día yo levantaré el tabernáculo caído de David…
                      <span className="text-secondary/80">»</span>
                    </p>
                  </blockquote>
                  <cite className="mt-4 block font-sans text-sm font-medium not-italic tracking-wide text-zinc-500">
                    Amós 9:11
                  </cite>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Pilares + adoración */}
        <div id="bethel-pilares" className="relative mb-16 grid scroll-mt-28 items-center gap-10 lg:mb-24 lg:grid-cols-2 lg:gap-14">
          <span
            data-pdc-scroll-focus
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-px w-px -translate-x-1/2 -translate-y-1/2"
            aria-hidden
          />
          <Reveal>
            <h3 className="mb-4 font-serif text-2xl font-medium text-[#f4f1ec] md:text-3xl">
              Donde el cielo toca la tierra
            </h3>
            <p className="mb-6 text-sm text-zinc-500 md:text-base">Tres pilares que marcan cada encuentro.</p>
            <ul className="space-y-4">
              {["Adoración que sostiene la atmósfera", "Intercesión que alinea corazones", "Intimidad profunda con Él"].map(
                (line) => (
                  <li
                    key={line}
                    className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-3.5 text-[0.95rem] text-zinc-300 transition hover:border-secondary/20 hover:bg-white/[0.05]"
                  >
                    <Heart className="mt-0.5 h-5 w-5 shrink-0 text-secondary/80" aria-hidden />
                    <span>{line}</span>
                  </li>
                )
              )}
            </ul>
          </Reveal>
          <Reveal delayMs={100}>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a1018]/80 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.75)]">
              <img
                src="/images/bethel/IMG_9495.jpg"
                alt="Detalle del cuadro del León de Judá en el altar de Bethel"
                className="aspect-[4/3] w-full object-cover md:aspect-[5/4]"
                style={{ objectPosition: "center 45%" }}
                loading="lazy"
                decoding="async"
              />
            </div>
          </Reveal>
        </div>

        <BethelEncounterScenes />

        {/* Tabs */}
        <div id="bethel-tabs" className="relative scroll-mt-28">
          <span
            data-pdc-scroll-focus
            className="pointer-events-none absolute left-1/2 top-32 z-0 h-px w-px -translate-x-1/2 md:top-36"
            aria-hidden
          />
          <Reveal className="mb-16 lg:mb-24">
            <div className="mx-auto max-w-4xl">
              <h3 className="mb-8 text-center font-serif text-2xl font-medium text-[#f4f1ec] md:text-3xl">
                Mirá la historia desde tres ángulos
              </h3>
              <div role="tablist" className="mb-8 flex flex-col gap-2 sm:flex-row sm:justify-center sm:gap-3">
                {TABS.map((t) => {
                  const selected = tab === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls={`bethel-panel-${t.id}`}
                      id={`bethel-tab-${t.id}`}
                      className={`relative min-h-[3rem] overflow-hidden rounded-2xl border px-5 py-3 font-sans text-sm font-medium tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${
                        selected
                          ? "border-secondary/40 bg-secondary/15 text-[#f0fbfd] shadow-[0_0_40px_-8px_rgba(64,194,222,0.35)]"
                          : "border-white/10 bg-white/[0.04] text-zinc-400 hover:border-white/18 hover:bg-white/[0.07] hover:text-zinc-200"
                      }`}
                      onClick={() => setTab(t.id)}
                    >
                      <span className="relative">{t.label}</span>
                    </button>
                  );
                })}
              </div>
              <div
                role="tabpanel"
                id={`bethel-panel-${activeTab.id}`}
                aria-labelledby={`bethel-tab-${activeTab.id}`}
                className={`${glassCard} p-6 sm:p-8 md:p-10`}
              >
                <BethelTabImage tabId={activeTab.id} />
                <p className="mb-5 font-serif text-xl text-[#f0ebe3] md:text-2xl">{activeTab.headline}</p>
                <div className="space-y-4">
                  {activeTab.lines.map((line, lineIdx) => (
                    <p
                      key={`${activeTab.id}-${lineIdx}`}
                      className="text-sm leading-relaxed text-zinc-400 md:text-[0.95rem] md:leading-relaxed"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* FAQ */}
        <Reveal className="mb-16 lg:mb-24">
          <h3 className="mb-8 text-center font-serif text-2xl font-medium text-[#f4f1ec] md:text-3xl">Preguntas frecuentes</h3>
          <div className="mx-auto max-w-3xl space-y-3">
            {ACCORDION.map((item) => {
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
                    aria-controls={`bethel-acc-${item.id}`}
                    id={`bethel-acc-btn-${item.id}`}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                    onClick={() => setOpenAccordion(open ? null : item.id)}
                  >
                    <span className="font-serif text-lg text-[#ebe8e2] md:text-xl">{item.title}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-secondary transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                  <div
                    id={`bethel-acc-${item.id}`}
                    role="region"
                    aria-labelledby={`bethel-acc-btn-${item.id}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-zinc-400 sm:px-6 sm:pb-6 sm:text-[0.95rem]">
                        {item.summary}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

      </div>
    </PdcPageShell>
  );
};

export default BethelSection;
