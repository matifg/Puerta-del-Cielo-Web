import React, { useState } from 'react';
import {
  CalendarDays,
  HandHeart,
  Flame,
  UsersRound,
  Smile,
  Link as LinkIcon
} from "lucide-react";
import Modal from "./Modal";
import { Link } from "react-router-dom";

const servicios = [
  {
    nombre: "Reunión General",
    icon: CalendarDays,
    descripcion: [
      "Adoración profunda, palabra fresca y comunión en familia.",
      "Cada domingo es una invitación a experimentar la gloria de Dios."
    ],
    horarios: ["Domingos", "Verano: 20:00 hs", "Invierno: 19:00 hs"]
  },
  {
    nombre: "Intercesión",
    icon: HandHeart,
    descripcion: [
      "Tiempos especiales de búsqueda profunda.",
      "Milagros, liberaciones y manifestaciones sobrenaturales."
    ],
    horarios: ["Miércoles 20:00 hs"]
  },
  {
    nombre: "Jóvenes",
    icon: Flame,
    descripcion: [
      "Transformación real y conexión genuina con Dios."
    ],
    edad: "+15 años",
    horarios: ["Sábados 20:00 hs"]
  },
  {
    nombre: "Teens",
    icon: UsersRound,
    descripcion: [
      "Espacios de amistad, juegos y enseñanza bíblica."
    ],
    edad: "12 a 15 años",
    horarios: ["Sábados 18:00 hs"]
  },
  {
    nombre: "Kids",
    icon: Smile,
    descripcion: [
      "Clases llenas de alegría y aprendizaje."
    ],
    edad: "3 a 11 años",
    horarios: ["Domingos 20:00 hs"]
  },
  {
    nombre: "Conexión",
    icon: LinkIcon,
    descripcion: [
      "Grupos en casas para crecer en fe y comunidad."
    ],
    horarios: ["Durante la semana"],
    conexion: true
  }
];

const NuestrosServiciosSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalServicio, setModalServicio] = useState<any>(null);

  const handleOpenModal = (servicio) => {
    setModalServicio(servicio);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalServicio(null);
  };

  return (
    <section id="servicios" className="relative py-24 px-6 overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#020617] to-black opacity-90" />

      <div className="relative z-10 max-w-6xl mx-auto">

        <h2 className="text-3xl md:text-5xl font-serif text-white text-center mb-16">
          Nuestros Servicios
          <div className="w-20 h-[3px] bg-secondary mx-auto mt-4 rounded-full" />
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

          {servicios.map((servicio) => {
            const Icon = servicio.icon;

            return (
              <div
                key={servicio.nombre}
                onClick={() => handleOpenModal(servicio)}
                className="
                group cursor-pointer
                bg-white/5 backdrop-blur-xl
                border border-white/10
                rounded-2xl p-8 text-center

                transition-all duration-500
                hover:-translate-y-2
                hover:shadow-[0_10px_40px_rgba(64,194,222,0.25)]
                hover:scale-[1.03]
                "
              >
                <Icon className="w-10 h-10 text-secondary mx-auto mb-4 group-hover:scale-110 transition" />

                <div className="text-lg font-semibold text-white mb-1">
                  {servicio.nombre}
                </div>

                {servicio.horarios && (
                  <div className="text-sm text-gray-400">
                    {servicio.horarios[0]}
                  </div>
                )}

                <div className="mt-3 text-xs text-gray-500 group-hover:text-secondary transition">
                  Click para ver detalles
                </div>
              </div>
            );
          })}

        </div>
      </div>

      {/* MODAL (igual pero mejor estilo) */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        {modalServicio && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Overlay oscuro con blur */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
              onClick={handleCloseModal}
            />

            {/* CARD PRO */}
            <div className="
              relative z-10
              bg-gradient-to-br from-[#1a223a] via-[#22345a] to-[#1a223a]
              bg-opacity-95
              border border-white/20
              rounded-3xl p-8 md:p-14 shadow-2xl max-w-xl w-full mx-auto
              animate-modal-card
              flex flex-col items-center
              overflow-hidden
              backdrop-blur-xl
            ">
              {/* Glow decorativo */}
              <div className="pointer-events-none absolute -top-16 -left-16 w-72 h-72 bg-primary/30 rounded-full blur-3xl opacity-40 animate-modal-glow" />
              <div className="pointer-events-none absolute -bottom-20 -right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl opacity-20 animate-modal-glow2" />

              {/* Botón de cerrar */}
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 w-11 h-11 rounded-full bg-black/60 hover:bg-secondary/80 text-white flex items-center justify-center text-2xl shadow-lg transition"
                aria-label="Cerrar"
              >
                &times;
              </button>

              <div className="mb-6 mt-2 flex flex-col items-center">
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-2 shadow-lg">
                  <modalServicio.icon className="w-9 h-9 text-secondary" />
                </span>
                <h3 className="text-3xl md:text-4xl font-serif text-white mb-2 drop-shadow font-bold">
                  {modalServicio.nombre}
                </h3>
              </div>

              <div className="flex flex-col gap-4 mb-6 w-full">
                {modalServicio.descripcion.map((p: string, idx: number) => (
                  <p key={idx} className="text-gray-200 text-base md:text-lg leading-relaxed text-center">{p}</p>
                ))}
              </div>

              <div className="mb-6 w-full">
                <div className="font-bold text-secondary mb-2 text-lg tracking-wide text-center">Horarios</div>
                {modalServicio.horarios.map((h: string, idx: number) => (
                  <div key={idx} className="text-gray-300 text-base text-center">{h}</div>
                ))}
                {modalServicio.edad && (
                  <div className="mt-2 text-primary text-sm font-semibold text-center">{modalServicio.edad}</div>
                )}
              </div>

              {modalServicio.conexion && (
                <Link
                  to="/conexion"
                  className="inline-block mt-2 bg-primary hover:bg-secondary text-white px-7 py-2.5 rounded-full transition-all shadow-md font-semibold tracking-wide"
                >
                  Ir a Conexión
                </Link>
              )}
            </div>
            <style>{`
              @keyframes modalCard {
                0% {
                  opacity: 0.7;
                  filter: blur(16px);
                  transform: scale(0.97) translateY(40px);
                  box-shadow: 0 0 0 rgba(0,0,0,0);
                }
                60% {
                  opacity: 0.95;
                  filter: blur(2px);
                  transform: scale(1.03) translateY(-6px);
                  box-shadow: 0 8px 40px 0 rgba(64,194,222,0.18);
                }
                100% {
                  opacity: 1;
                  filter: blur(0);
                  transform: scale(1) translateY(0);
                  box-shadow: 0 12px 48px 0 rgba(64,194,222,0.22);
                }
              }
              .animate-modal-card {
                animation: modalCard 1.2s cubic-bezier(.4,0,.2,1) both;
              }
              @keyframes modalGlow {
                0%,100% { opacity: 0.6; }
                50% { opacity: 1; }
              }
              @keyframes modalGlow2 {
                0%,100% { opacity: 0.4; }
                50% { opacity: 0.7; }
              }
              .animate-modal-glow {
                animation: modalGlow 3.5s infinite;
              }
              .animate-modal-glow2 {
                animation: modalGlow2 4.2s infinite;
              }
            `}</style>
          </div>
        )}
      </Modal>

    </section>
  );
};

export default NuestrosServiciosSection;