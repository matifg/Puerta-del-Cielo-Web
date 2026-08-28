import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Calendar, ChevronLeft, ChevronRight, Clock, Crown, Maximize2, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { whatsappUrl } from "../data/contacto";
import {
  FORMATION_GALLERY_FOLDER,
  FORMATION_LANDSCAPE_MOMENTS,
  FORMATION_PORTRAIT_MOMENTS,
  type FormacionMoment,
} from "../data/formacionLideres";
import { galleryCarouselSizes, galleryMasonrySizes, galleryWebpSrcSet } from "../data/galleryWebp";
import { Reveal } from "./bethel/Reveal";
import { PdcGalleryLightboxPicture, PdcGalleryPicture } from "./PdcGalleryPicture";
import { PdcPageShell } from "./PdcPageShell";
import {
  PdcSectionHeader,
  pdcGlassCardPadding,
  pdcHeaderScrollMargin,
  pdcPageInnerClass,
  pdcPageIntroHeaderClass,
  pdcSectionH3Class,
} from "./PdcSectionHeader";

const glassCard =
  "rounded-2xl border border-white/[0.1] bg-white/[0.04] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.65)] backdrop-blur-xl";

const frame =
  "overflow-hidden rounded-2xl border border-white/10 bg-[#17130e]/80 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.75)]";

const LIST_ITEMS = [
  "Carácter y vida espiritual",
  "Visión pastoral y servicio",
  "Principios bíblicos de liderazgo",
  "Práctica ministerial en comunidad",
] as const;

/** Hasta 4 landscapes en la columna derecha / grilla inferior */
const LIDERAZGO_LANDSCAPES = FORMATION_LANDSCAPE_MOMENTS.slice(0, 4);
const LIDERAZGO_PORTRAIT = FORMATION_PORTRAIT_MOMENTS[0];
/** Franja fotográfica de apertura (full-bleed corta) */
const LIDERAZGO_BAND = LIDERAZGO_LANDSCAPES[0] ?? LIDERAZGO_PORTRAIT;

const LIDERAZGO_GALLERY: FormacionMoment[] = [
  ...(LIDERAZGO_PORTRAIT ? [LIDERAZGO_PORTRAIT] : []),
  ...LIDERAZGO_LANDSCAPES,
];

const LiderazgoSection = () => {
  const reduceMotion = useReducedMotion() ?? false;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goLightbox = useCallback((delta: number) => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      return (i + delta + LIDERAZGO_GALLERY.length) % LIDERAZGO_GALLERY.length;
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

  const active = lightboxIndex !== null ? LIDERAZGO_GALLERY[lightboxIndex] : null;

  const openById = (id: string) => {
    const idx = LIDERAZGO_GALLERY.findIndex((p) => p.id === id);
    if (idx >= 0) setLightboxIndex(idx);
  };

  return (
    <PdcPageShell id="liderazgo-inicio" aria-labelledby="liderazgo-heading" gradients={false}>
      {/* Foto full-bleed corta — ancla visual distinta al shell de texto */}
      {LIDERAZGO_BAND ? (
        <div
          className="relative h-[min(38vh,17.5rem)] w-full overflow-hidden sm:h-[min(42vh,22rem)] md:h-[min(44vh,24rem)]"
          aria-hidden
        >
          <picture className="absolute inset-0 block h-full w-full">
            <source
              type="image/webp"
              srcSet={galleryWebpSrcSet(FORMATION_GALLERY_FOLDER, LIDERAZGO_BAND.slug)}
              sizes={galleryCarouselSizes()}
            />
            <img
              src={LIDERAZGO_BAND.src}
              alt=""
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover"
              style={
                LIDERAZGO_BAND.objectPosition
                  ? { objectPosition: LIDERAZGO_BAND.objectPosition }
                  : undefined
              }
            />
          </picture>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0e0b08]/55 via-[#0e0b08]/15 to-[#0e0b08]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_30%,rgba(3,5,8,0.55)_100%)]"
            aria-hidden
          />
        </div>
      ) : null}

      <div className={`${pdcPageInnerClass} pb-6 pt-6 sm:pb-8 sm:pt-8`}>
        <Reveal>
          <header className={pdcPageIntroHeaderClass}>
            <PdcSectionHeader
              headingId="liderazgo-heading"
              eyebrow="Área educativa"
              eyebrowIcon={Crown}
              title="Escuela de"
              titleAccent="liderazgo con propósito"
              subtitle="Un espacio de formación para desarrollar líderes con carácter, visión y espíritu de servicio."
              showSegmentBar
            />
          </header>
        </Reveal>

        <Reveal delayMs={80}>
          <div id="liderazgo-contenido" className={`${glassCard} ${pdcGlassCardPadding} scroll-mt-28`}>
            <p className="mx-auto mb-6 max-w-xl text-center font-sans text-sm font-medium leading-relaxed text-white/90 md:text-[0.95rem]">
              Formamos líderes con carácter, visión y corazón de servicio — desde la Escritura hacia la práctica.
            </p>

            <div className="mx-auto mb-8 grid max-w-2xl gap-5 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/[0.06] p-5 text-center transition hover:border-secondary/25">
                <Clock className="mx-auto mb-2 h-6 w-6 text-secondary" aria-hidden />
                <p className="font-sans text-xs uppercase tracking-[0.15em] text-stone-400">Duración</p>
                <p className="mt-1 font-sans text-lg font-medium text-[#faf8f4]">1 año</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.06] p-5 text-center transition hover:border-secondary/25">
                <Calendar className="mx-auto mb-2 h-6 w-6 text-secondary" aria-hidden />
                <p className="font-sans text-xs uppercase tracking-[0.15em] text-stone-400">Modalidad</p>
                <p className="mt-1 font-sans text-lg font-medium text-[#faf8f4]">Presencial quincenal</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className={`mb-4 text-center ${pdcSectionH3Class}`}>¿Qué vas a recibir?</h3>
              <ul className="mx-auto grid max-w-2xl gap-3 text-white/90 md:grid-cols-2">
                {LIST_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-2 font-sans text-sm">
                    <span className="mt-1 text-secondary" aria-hidden>
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href={whatsappUrl("Hola! Quiero info sobre la Escuela de Liderazgo")}
                target="_blank"
                rel="noopener noreferrer"
                className="pdc-btn-on-dark-accent max-w-none text-center"
              >
                <span className="relative z-[1]">Info por WhatsApp</span>
              </a>
              <a
                href="/docs/escuela-liderazgo.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="pdc-btn-on-dark max-w-none text-center"
              >
                <span className="relative z-[1]">Ver plan académico</span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Editorial: portrait ancla + landscapes — con lightbox */}
        <Reveal delayMs={100}>
          <section
            id="liderazgo-galeria"
            className={`mx-auto w-full max-w-5xl ${pdcHeaderScrollMargin}`}
            aria-labelledby="liderazgo-galeria-titulo"
          >
            <h2
              id="liderazgo-galeria-titulo"
              data-pdc-scroll-focus
              className={`mb-6 text-center ${pdcSectionH3Class} md:mb-8`}
            >
              Galería
            </h2>

            <div className="grid gap-3 sm:gap-4 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-stretch md:gap-5">
              {LIDERAZGO_PORTRAIT ? (
                <button
                  type="button"
                  onClick={() => openById(LIDERAZGO_PORTRAIT.id)}
                  className={`group relative ${frame} text-left transition-colors hover:border-secondary/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary md:h-full`}
                  aria-label={`Ampliar: ${LIDERAZGO_PORTRAIT.alt}`}
                >
                  <div className="relative aspect-[3/4] w-full md:aspect-auto md:h-full md:min-h-[28rem]">
                    <PdcGalleryPicture
                      folder={FORMATION_GALLERY_FOLDER}
                      slug={LIDERAZGO_PORTRAIT.slug}
                      fallbackSrc={LIDERAZGO_PORTRAIT.src}
                      alt={LIDERAZGO_PORTRAIT.alt}
                      ariaHidden
                      loading="eager"
                      sizes="(max-width: 768px) 92vw, 420px"
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                      style={
                        LIDERAZGO_PORTRAIT.objectPosition
                          ? { objectPosition: LIDERAZGO_PORTRAIT.objectPosition }
                          : undefined
                      }
                    />
                    <span
                      className="pointer-events-none absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-[#0e0b08]/75 text-secondary opacity-0 shadow-md backdrop-blur-sm transition group-hover:opacity-100 group-focus-visible:opacity-100"
                      aria-hidden
                    >
                      <Maximize2 className="h-3.5 w-3.5" strokeWidth={2.25} />
                    </span>
                  </div>
                </button>
              ) : null}

              <div className="grid grid-cols-2 gap-3 sm:gap-3.5 md:gap-4">
                {LIDERAZGO_LANDSCAPES.map((photo, i) => (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => openById(photo.id)}
                    className={`group relative ${frame} text-left transition-colors hover:border-secondary/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary`}
                    aria-label={`Ampliar: ${photo.alt}`}
                  >
                    <div className="relative aspect-[4/3] w-full">
                      <PdcGalleryPicture
                        folder={FORMATION_GALLERY_FOLDER}
                        slug={photo.slug}
                        fallbackSrc={photo.src}
                        alt={photo.alt}
                        ariaHidden
                        loading={i < 2 ? "eager" : "lazy"}
                        sizes={galleryMasonrySizes()}
                        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                        style={photo.objectPosition ? { objectPosition: photo.objectPosition } : undefined}
                      />
                      <span
                        className="pointer-events-none absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-[#0e0b08]/75 text-secondary opacity-0 shadow-md backdrop-blur-sm transition group-hover:opacity-100 group-focus-visible:opacity-100"
                        aria-hidden
                      >
                        <Maximize2 className="h-3.5 w-3.5" strokeWidth={2.25} />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      </div>

      {portalReady
        ? createPortal(
            <AnimatePresence>
              {active && lightboxIndex !== null ? (
                <motion.div
                  key="liderazgo-lightbox"
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

                  <PdcGalleryLightboxPicture
                    folder={FORMATION_GALLERY_FOLDER}
                    slug={active.slug}
                    fallbackSrc={active.src}
                    alt={active.alt}
                    className="max-h-[min(92vh,100dvh-2rem)] max-w-[min(96vw,100dvw-2rem)] w-auto select-none rounded-lg object-contain shadow-[0_24px_80px_-20px_rgba(0,0,0,0.75)]"
                    style={active.objectPosition ? { objectPosition: active.objectPosition } : undefined}
                    onClick={(e) => e.stopPropagation()}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </PdcPageShell>
  );
};

export default LiderazgoSection;
