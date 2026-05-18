import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  CalendarDays,
  HandHeart,
  Flame,
  UsersRound,
  Smile,
  Link as LinkIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SITE_PHOTOS } from "../data/sitePhotos";
import { PdcEditorialPhoto } from "./PdcEditorialPhoto";
import { PdcPageShell } from "./PdcPageShell";
import { PdcSectionHeader, pdcPageInnerWithHeroComfort } from "./PdcSectionHeader";

type ServicioItem = {
  nombre: string;
  icon: typeof CalendarDays;
  descripcion: string[];
  horarios: string[];
  edad?: string;
  conexion?: boolean;
  modalPhoto?: (typeof SITE_PHOTOS)[keyof typeof SITE_PHOTOS];
};

const servicios: ServicioItem[] = [
  {
    nombre: "Reunión General",
    icon: CalendarDays,
    descripcion: [
      "Adoración profunda, palabra fresca y comunión en familia.",
      "Cada domingo es una invitación a experimentar la gloria de Dios.",
    ],
    horarios: ["Domingos", "Verano: 20:00 hs", "Invierno: 19:00 hs"],
    modalPhoto: SITE_PHOTOS.santaCena,
  },
  {
    nombre: "Intercesión",
    icon: HandHeart,
    descripcion: [
      "Tiempos especiales de búsqueda profunda.",
      "Milagros, liberaciones y manifestaciones sobrenaturales.",
    ],
    horarios: ["Miércoles 20:00 hs"],
  },
  {
    nombre: "Jóvenes",
    icon: Flame,
    descripcion: ["Transformación real y conexión genuina con Dios."],
    edad: "+15 años",
    horarios: ["Sábados 20:00 hs"],
  },
  {
    nombre: "Teens",
    icon: UsersRound,
    descripcion: ["Espacios de amistad, juegos y enseñanza bíblica."],
    edad: "12 a 15 años",
    horarios: ["Sábados 18:00 hs"],
  },
  {
    nombre: "Kids",
    icon: Smile,
    descripcion: ["Clases llenas de alegría y aprendizaje."],
    edad: "3 a 11 años",
    horarios: ["Domingos 20:00 hs"],
  },
  {
    nombre: "Conexión",
    icon: LinkIcon,
    descripcion: ["Grupos en casas para crecer en fe y comunidad."],
    horarios: ["Durante la semana"],
    conexion: true,
  },
];

const OVERLAY_Z = 10060;

const NuestrosServiciosSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalServicio, setModalServicio] = useState<ServicioItem | null>(null);

  const handleOpenModal = (servicio: ServicioItem) => {
    setModalServicio(servicio);
    setModalOpen(true);
  };

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setModalServicio(null);
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseModal();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [modalOpen, handleCloseModal]);

  return (
    <PdcPageShell id="servicios" gradients={false}>
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#020617] to-black opacity-90" />

      <div className={`${pdcPageInnerWithHeroComfort} relative z-10`}>
        <PdcSectionHeader
          as="h2"
          scrollFocus
          eyebrow="Comunidad"
          eyebrowIcon={CalendarDays}
          title="Nuestros Servicios"
          subtitle="Encuentros semanales para adorar, crecer y conectar en familia."
          className="mb-14 md:mb-16"
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-9 md:grid-cols-3 md:gap-10">
          {servicios.map((servicio) => {
            const Icon = servicio.icon;

            return (
              <div
                key={servicio.nombre}
                role="button"
                tabIndex={0}
                onClick={() => handleOpenModal(servicio)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpenModal(servicio);
                  }
                }}
                className="group cursor-pointer rounded-2xl border border-white/12 bg-[#0a1018]/95 p-7 text-center shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-1.5 hover:border-white/22 hover:bg-[#0f1622] hover:shadow-[0_12px_40px_rgba(64,194,222,0.14)] md:bg-[#090e14]"
              >
                <Icon className="mx-auto mb-4 h-10 w-10 text-secondary transition duration-500 group-hover:scale-105" />

                <h3 className="mb-1.5 font-serif text-lg font-medium tracking-tight text-white md:text-xl">
                  {servicio.nombre}
                </h3>

                {servicio.horarios && (
                  <p className="text-sm leading-snug text-zinc-400">{servicio.horarios[0]}</p>
                )}

                <p className="mt-3 font-sans text-[0.65rem] uppercase tracking-[0.18em] text-zinc-500 transition group-hover:text-zinc-400">
                  Ver detalles
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {typeof document !== "undefined" &&
        modalOpen &&
        modalServicio &&
        createPortal(
          <div
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: OVERLAY_Z }}
            role="presentation"
          >
            <button
              type="button"
              className="absolute inset-0 cursor-default bg-[#030508]/95"
              onClick={handleCloseModal}
              aria-label="Cerrar"
            />

            <div
              className="animate-modal-card relative z-10 mx-auto flex w-full max-w-xl flex-col items-center overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#121a2c] via-[#0c1220] to-[#080c14] p-8 shadow-[0_28px_80px_rgba(0,0,0,0.85)] ring-1 ring-black/50 md:p-12"
              role="dialog"
              aria-modal="true"
              aria-labelledby="servicio-modal-title"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-secondary/12 blur-3xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-28 -right-16 h-52 w-52 rounded-full bg-primary/12 blur-3xl"
                aria-hidden
              />

              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute right-4 top-4 z-[1] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#161f33] text-xl leading-none text-white/85 transition hover:border-secondary/35 hover:bg-[#1c2740] hover:text-white"
                aria-label="Cerrar"
              >
                &times;
              </button>

              <div className="mb-6 mt-2 flex flex-col items-center text-center">
                <span className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-secondary/30 bg-[#162032] shadow-inner">
                  <modalServicio.icon className="h-7 w-7 text-secondary" />
                </span>
                <h3
                  id="servicio-modal-title"
                  className="font-serif text-2xl font-medium tracking-tight text-[#f5f2ec] md:text-3xl"
                >
                  {modalServicio.nombre}
                </h3>
              </div>

              {modalServicio.modalPhoto ? (
                <PdcEditorialPhoto
                  photo={modalServicio.modalPhoto}
                  className="mb-6 w-full border-white/12"
                />
              ) : null}

              <div className="mb-8 flex w-full flex-col gap-3.5">
                {modalServicio.descripcion.map((p: string, idx: number) => (
                  <p
                    key={idx}
                    className="text-center text-[0.9375rem] leading-relaxed text-zinc-300 md:text-base"
                  >
                    {p}
                  </p>
                ))}
              </div>

              <div className="mb-2 w-full">
                <p className="mb-3 text-center font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-secondary/90">
                  Horarios
                </p>
                <ul className="flex flex-col gap-2">
                  {modalServicio.horarios.map((h: string, idx: number) => (
                    <li
                      key={idx}
                      className="rounded-xl border border-white/12 bg-[#141c2e] px-4 py-2.5 text-center text-sm text-zinc-200 transition hover:border-secondary/25 hover:bg-[#182236]"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
                {modalServicio.edad && (
                  <p className="mt-4 text-center font-sans text-sm font-medium tracking-wide text-white/80">
                    {modalServicio.edad}
                  </p>
                )}
              </div>

              {modalServicio.conexion && (
                <Link to="/conexion" className="pdc-btn-on-dark-accent mt-2 max-w-none">
                  <span className="relative z-[1]">Ir a Conexión</span>
                </Link>
              )}
            </div>
            <style>{`
              @keyframes modalCard {
                0% {
                  opacity: 0;
                  filter: blur(8px);
                  transform: scale(0.97) translateY(12px);
                }
                100% {
                  opacity: 1;
                  filter: blur(0);
                  transform: scale(1) translateY(0);
                }
              }
              .animate-modal-card {
                animation: modalCard 0.42s cubic-bezier(0.22, 1, 0.36, 1) both;
              }
              @media (prefers-reduced-motion: reduce) {
                .animate-modal-card {
                  animation: none;
                }
              }
            `}</style>
          </div>,
          document.body
        )}
    </PdcPageShell>
  );
};

export default NuestrosServiciosSection;
