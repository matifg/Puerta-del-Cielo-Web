import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, GraduationCap, Images, Maximize2, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { whatsappUrl } from "../data/contacto";
import {
  FORMATION_ACCORDION,
  FORMATION_EFESIOS_VERSE,
  FORMATION_GALLERY_FOLDER,
  FORMATION_MOMENTS,
  FORMATION_VISION_INTRO,
} from "../data/formacionLideres";
import { galleryMasonrySizes, galleryWebpSrcSet } from "../data/galleryWebp";
import { scrollToPdcSectionId } from "../lib/pdcScrollNav";
import { Reveal } from "./bethel/Reveal";
import { PdcEducativaDockHint } from "./PdcEducativaDockHint";
import { PdcGalleryLightboxPicture } from "./PdcGalleryPicture";
import { PdcPageShell } from "./PdcPageShell";
import PdcSegmentBar from "./PdcSegmentBar";
import {
  PdcSectionEyebrow,
  pdcAccordionTitleClass,
  pdcBodyLeadClass,
  pdcGlassCardPadding,
  pdcHeaderScrollMargin,
  pdcPageInnerWithHeroComfort,
  pdcPageIntroHeaderClass,
  pdcPageTitleAccentClass,
  pdcPageTitleClass,
  pdcPageTitleLineClass,
  pdcSectionH3Class,
} from "./PdcSectionHeader";

const glassCard =
  "rounded-2xl border border-white/[0.1] bg-white/[0.04] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.65)] backdrop-blur-xl";

/** Masonry: landscapes primero (evita columna altísima / hueco negro); máx. 6 */
const FORMACION_IMAGES = FORMATION_MOMENTS.filter((m) => m.kind === "image");
const FORMACION_GALLERY_ITEMS = [
  ...FORMACION_IMAGES.filter((m) => m.bento !== "featured"),
  ...FORMACION_IMAGES.filter((m) => m.bento === "featured"),
].slice(0, 6);
const FOTOS_INICIALES = 4;

const FormacionLideresSection = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [galleryExpanded, setGalleryExpanded] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;

  const galleryVisibles = galleryExpanded
    ? FORMACION_GALLERY_ITEMS
    : FORMACION_GALLERY_ITEMS.slice(0, FOTOS_INICIALES);
  const hayMasFotos = FORMACION_GALLERY_ITEMS.length > FOTOS_INICIALES;

  useEffect(() => {
    setPortalReady(true);
  }, []);

  const scrollToSection = useCallback(
    (id: string) => {
      scrollToPdcSectionId(id, { behavior: reduceMotion ? "auto" : "smooth" });
    },
    [reduceMotion]
  );

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goLightbox = useCallback((delta: number) => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      return (i + delta + FORMACION_GALLERY_ITEMS.length) % FORMACION_GALLERY_ITEMS.length;
    });
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goLightbox(-1);
      if (e.key === "ArrowRight") goLightbox(1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, closeLightbox, goLightbox]);

  const active = lightboxIndex !== null ? FORMACION_GALLERY_ITEMS[lightboxIndex] : null;

  return (
    <PdcPageShell id="formacion-lideres-inicio" aria-labelledby="formacion-lideres-heading">
      <div className={`${pdcPageInnerWithHeroComfort} pb-6 sm:pb-8`}>
        {/* Intro quote-first: el verso abre la página, no el patrón CTA+glass */}
        <Reveal>
          <header className={`${pdcPageIntroHeaderClass} mx-auto max-w-3xl text-center`}>
            <PdcSectionEyebrow label="Área educativa" icon={GraduationCap} />
            <p className="mb-3 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-secondary/90">
              Efesios 4:12
            </p>
            <blockquote className="mx-auto max-w-2xl font-serif text-[clamp(1.25rem,3.2vw,1.85rem)] font-normal leading-snug text-[#f5f1ea]">
              <span className="text-secondary/75">«</span>
              {FORMATION_EFESIOS_VERSE}
              <span className="text-secondary/75">»</span>
            </blockquote>
            <h1 id="formacion-lideres-heading" className={`${pdcPageTitleClass} mt-8`}>
              <span className={pdcPageTitleLineClass}>Escuela de</span>
              <span className={pdcPageTitleAccentClass}>formación de líderes</span>
            </h1>
            <PdcSegmentBar size="md" className="mx-auto mt-5" />
            <button
              type="button"
              onClick={() => scrollToSection("formacion-lideres-contenido")}
              className="mt-6 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-white/55 transition hover:text-secondary"
            >
              Ver el programa
              <ChevronDown className="h-4 w-4 text-secondary/80" aria-hidden />
            </button>
          </header>
        </Reveal>

        <Reveal delayMs={60}>
          <div id="formacion-lideres-contenido" className={`${glassCard} ${pdcGlassCardPadding} scroll-mt-28`}>
            <p className={`mx-auto mb-6 max-w-2xl text-center ${pdcBodyLeadClass}`}>{FORMATION_VISION_INTRO}</p>

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
                                pIdx === 0 ? "text-white/88" : "text-stone-400"
                              }`}
                            >
                              {paragraph}
                            </p>
                          ))}
                          {item.bullets ? (
                            <ul className="space-y-1.5 pt-1">
                              {item.bullets.map((bullet) => (
                                <li key={bullet} className="flex items-start gap-2 text-sm text-stone-400">
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
          <section
            id="formacion-lideres-galeria"
            className={`mx-auto w-full max-w-5xl desktop:max-w-[min(98vw,76rem)] ${pdcHeaderScrollMargin}`}
            aria-labelledby="formacion-galeria-titulo"
          >
            <h2
              id="formacion-galeria-titulo"
              data-pdc-scroll-focus
              className={`mb-2 text-center ${pdcSectionH3Class}`}
            >
              Momentos de formación
            </h2>
            <p className="mx-auto mb-5 max-w-lg text-center font-serif text-sm italic leading-relaxed text-white/70 md:mb-6 md:text-base">
              Enseñanza, comunidad y ministración.
            </p>

            {/* Masonry CSS columns — landscapes primero, 2 cols (menos hueco negro) */}
            <div
              className="mx-auto columns-2 gap-3 sm:gap-4"
              role="list"
              aria-label="Galería Formación de Líderes"
            >
              {galleryVisibles.map((photo, i) => (
                <button
                  key={photo.id}
                  type="button"
                  role="listitem"
                  onClick={() =>
                    setLightboxIndex(FORMACION_GALLERY_ITEMS.findIndex((p) => p.id === photo.id))
                  }
                  className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-[#17130e] text-left shadow-[0_20px_50px_-24px_rgba(0,0,0,0.75)] transition-colors hover:border-secondary/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary sm:mb-4"
                  aria-label={`Ampliar: ${photo.alt}`}
                >
                  <picture className="block w-full">
                    <source
                      type="image/webp"
                      srcSet={galleryWebpSrcSet(FORMATION_GALLERY_FOLDER, photo.slug)}
                      sizes={galleryMasonrySizes()}
                    />
                    <img
                      src={photo.src}
                      alt=""
                      aria-hidden
                      loading={i < 3 ? "eager" : "lazy"}
                      decoding="async"
                      className="block h-auto w-full transition duration-500 group-hover:scale-[1.02]"
                    />
                  </picture>
                  <span
                    className="pointer-events-none absolute right-2 top-2 z-[1] flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-[#0e0b08]/75 text-secondary opacity-0 shadow-md backdrop-blur-sm transition group-hover:opacity-100 group-focus-visible:opacity-100"
                    aria-hidden
                  >
                    <Maximize2 className="h-3.5 w-3.5" strokeWidth={2.25} />
                  </span>
                </button>
              ))}
            </div>

            {hayMasFotos ? (
              <div className="mt-5 flex justify-center md:mt-6">
                <button
                  type="button"
                  onClick={() => setGalleryExpanded((v) => !v)}
                  className="pdc-btn-on-dark-ghost inline-flex items-center gap-2"
                >
                  {galleryExpanded ? (
                    <>
                      <ChevronUp className="relative z-[1] h-4 w-4 shrink-0 text-secondary" aria-hidden />
                      <span className="relative z-[1]">Ver menos</span>
                    </>
                  ) : (
                    <>
                      <Images className="relative z-[1] h-4 w-4 shrink-0 text-secondary" aria-hidden />
                      <span className="relative z-[1]">Ver más fotos</span>
                    </>
                  )}
                </button>
              </div>
            ) : null}

            {portalReady
              ? createPortal(
                  <AnimatePresence>
                    {active && lightboxIndex !== null ? (
                      <motion.div
                        key="formacion-lightbox"
                        className="fixed inset-0 z-[10050] flex items-center justify-center bg-[#0e0b08]/88 p-4 backdrop-blur-md sm:p-6"
                        role="dialog"
                        aria-modal="true"
                        aria-label={active.alt}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0.1 : 0.25 }}
                        onClick={closeLightbox}
                      >
                        <button
                          type="button"
                          onClick={closeLightbox}
                          className="absolute right-4 top-4 z-[2] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#1d1711]/90 text-white/85 transition hover:border-secondary/35 hover:text-white sm:right-6 sm:top-6"
                          aria-label="Cerrar"
                        >
                          <X className="h-5 w-5" aria-hidden />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            goLightbox(-1);
                          }}
                          className="absolute left-2 top-1/2 z-[2] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#1d1711]/90 text-white/85 transition hover:border-secondary/35 hover:text-white sm:left-4 md:left-6"
                          aria-label="Anterior"
                        >
                          <ChevronLeft className="h-6 w-6" aria-hidden />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            goLightbox(1);
                          }}
                          className="absolute right-2 top-1/2 z-[2] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#1d1711]/90 text-white/85 transition hover:border-secondary/35 hover:text-white sm:right-4 md:right-6"
                          aria-label="Siguiente"
                        >
                          <ChevronRight className="h-6 w-6" aria-hidden />
                        </button>

                        <div
                          className="relative z-[1] flex max-h-[min(92vh,100dvh-2rem)] max-w-[min(96vw,100dvw-2rem)] items-center justify-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <PdcGalleryLightboxPicture
                            folder={FORMATION_GALLERY_FOLDER}
                            slug={active.slug}
                            fallbackSrc={active.src}
                            alt={active.alt}
                            className="max-h-[min(92vh,100dvh-2rem)] max-w-[min(96vw,100dvw-2rem)] h-auto w-auto select-none rounded-lg object-contain shadow-[0_24px_80px_-20px_rgba(0,0,0,0.75)]"
                          />
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>,
                  document.body
                )
              : null}
          </section>
        </Reveal>
      </div>
    </PdcPageShell>
  );
};

export default FormacionLideresSection;
