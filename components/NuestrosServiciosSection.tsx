import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  CalendarDays,
  HandHeart,
  Flame,
  UsersRound,
  Smile,
  Link as LinkIcon,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { horariosServicios, type ServicioHorarioKey } from "../data/horariosWeb";
import { PdcPageShell } from "./PdcPageShell";
import { PdcSectionHeader, pdcPageInnerWithHeroComfort } from "./PdcSectionHeader";

type ServicioItem = {
  nombre: string;
  icon: typeof CalendarDays;
  descripcion: string[];
  horarioKey: ServicioHorarioKey;
  edad?: string;
  conexion?: boolean;
};

const servicios: ServicioItem[] = [
  {
    nombre: "Reunión General",
    icon: CalendarDays,
    descripcion: [
      "Adoración profunda, palabra fresca y comunión en familia.",
      "Cada domingo es una invitación a experimentar la gloria de Dios.",
    ],
    horarioKey: "reunionGeneral",
  },
  {
    nombre: "Intercesión",
    icon: HandHeart,
    descripcion: [
      "Tiempos especiales de búsqueda profunda.",
      "Milagros, liberaciones y manifestaciones sobrenaturales.",
    ],
    horarioKey: "intercesion",
  },
  {
    nombre: "Jóvenes",
    icon: Flame,
    descripcion: ["Transformación real y conexión genuina con Dios."],
    edad: "+15 años",
    horarioKey: "jovenes",
  },
  {
    nombre: "Teens",
    icon: UsersRound,
    descripcion: ["Espacios de amistad, juegos y enseñanza bíblica."],
    edad: "12 a 15 años",
    horarioKey: "teens",
  },
  {
    nombre: "Kids",
    icon: Smile,
    descripcion: ["Clases llenas de alegría y aprendizaje."],
    edad: "3 a 11 años",
    horarioKey: "kids",
  },
  {
    nombre: "Conexión",
    icon: LinkIcon,
    descripcion: ["Grupos en casas para crecer en fe y comunidad."],
    horarioKey: "conexion",
    conexion: true,
  },
];

const OVERLAY_Z = 10060;

function HorariosList({ items }: { items: string[] }) {
  const [first, ...rest] = items;
  const dayOnly = rest.length > 0 && !/\d/.test(first);

  if (dayOnly) {
    return (
      <div className="space-y-3">
        <p className="text-center font-serif text-lg text-[#f5f2ec]">{first}</p>
        <ul className={`grid gap-2 ${rest.length === 2 ? "sm:grid-cols-2" : ""}`}>
          {rest.map((item) => {
            const sep = item.indexOf(":");
            const label = sep >= 0 ? item.slice(0, sep).trim() : item;
            const hora = sep >= 0 ? item.slice(sep + 1).trim() : "";
            return (
              <li
                key={item}
                className="rounded-xl border border-white/[0.08] bg-[#0a1018]/70 px-3 py-3 text-center"
              >
                {hora ? (
                  <>
                    <span className="block font-sans text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                      {label}
                    </span>
                    <span className="mt-1 block font-sans text-sm font-medium tabular-nums text-white/90">
                      {hora}
                    </span>
                  </>
                ) : (
                  <span className="font-sans text-sm text-white/90">{item}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-xl border border-white/[0.08] bg-[#0a1018]/70 px-4 py-2.5 text-center font-sans text-sm text-white/90"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

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

                <p className="text-sm leading-snug text-zinc-400">
                  {horariosServicios[servicio.horarioKey].resumenCard}
                </p>

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
              className="animate-modal-card relative z-10 mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-b from-[#121a2c] via-[#0c1220] to-[#080c14] px-6 py-8 shadow-[0_28px_80px_rgba(0,0,0,0.85)] sm:px-8 sm:py-10"
              role="dialog"
              aria-modal="true"
              aria-labelledby="servicio-modal-title"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="pointer-events-none absolute -left-16 -top-20 h-44 w-44 rounded-full bg-secondary/10 blur-3xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-24 -right-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
                aria-hidden
              />

              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute right-3 top-3 z-[1] flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/80 transition hover:border-secondary/35 hover:text-white"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>

              <div className="relative flex flex-col items-center text-center">
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-secondary/30 bg-secondary/10">
                  <modalServicio.icon className="h-6 w-6 text-secondary" />
                </span>
                <h3
                  id="servicio-modal-title"
                  className="font-serif text-[1.65rem] font-medium leading-tight tracking-tight text-[#f5f2ec] md:text-3xl"
                >
                  {modalServicio.nombre}
                </h3>
                {modalServicio.edad ? (
                  <p className="mt-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/70">
                    {modalServicio.edad}
                  </p>
                ) : null}
              </div>

              <div className="relative mt-6 space-y-3">
                {modalServicio.descripcion.map((p: string, idx: number) => (
                  <p
                    key={idx}
                    className={
                      idx === 0
                        ? "text-center font-serif text-base leading-relaxed text-[#ebe7df] md:text-lg"
                        : "text-center font-sans text-sm leading-relaxed text-zinc-400 md:text-[0.95rem]"
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>

              <div className="relative mt-8 w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 sm:px-5">
                <p className="mb-3 text-center font-sans text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-secondary/90">
                  Horarios
                </p>
                <HorariosList items={[...horariosServicios[modalServicio.horarioKey].modalItems]} />
              </div>

              {modalServicio.conexion ? (
                <Link to="/conexion" className="pdc-btn-on-dark-accent relative mt-6 max-w-none">
                  <span className="relative z-[1]">Ir a Conexión</span>
                </Link>
              ) : null}
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
