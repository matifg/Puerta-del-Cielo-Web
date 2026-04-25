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
      "Adoración profunda, palabra fresca y comunión en familia son los componentes esenciales de nuestros servicios centrales.",
      "Cada domingo es una invitación a experimentar la gloria de Dios en comunidad y comenzar la semana en victoria."
    ],
    horarios: [
      "Domingos",
      "Verano: 20:00 hs",
      "Invierno (a partir de marzo): 19:00 hs"
    ]
  },
  {
    nombre: "Intercesión",
    icon: HandHeart,
    descripcion: [
      "Tiempos especiales de búsqueda profunda, con énfasis en la intercesión y diferentes dinámicas espirituales como ministración, rondas de oración, caminatas o presbiterios.",
      "Lo sobrenatural se manifiesta mediante milagros, liberaciones, señales y prodigios."
    ],
    horarios: [
      "Miércoles 20:00 hs"
    ]
  },
  {
    nombre: "Jóvenes",
    icon: Flame,
    descripcion: [
      "Servicios especiales para jóvenes enfocados en una transformación real y una conexión genuina con Dios.",
      "Buscamos levantar una generación que no retrocede."
    ],
    edad: "+15 años",
    horarios: [
      "Sábados 20:00 hs"
    ]
  },
  {
    nombre: "Teens",
    icon: UsersRound,
    descripcion: [
      "Espacios de amistad, juegos, enseñanza bíblica y tiempos de comunión con Dios."
    ],
    edad: "12 a 15 años",
    horarios: [
      "Sábados 18:00 hs"
    ]
  },
  {
    nombre: "Kids",
    icon: Smile,
    descripcion: [
      "Clases llenas de alegría, juegos, canciones y enseñanzas. Cada encuentro es una fiesta."
    ],
    edad: "3 a 11 años",
    horarios: [
      "Domingos 20:00 hs (en simultáneo con el servicio general)"
    ]
  },
  {
    nombre: "Conexión",
    icon: LinkIcon,
    descripcion: [
      "Encuentros semanales en grupos pequeños en hogares, diseñados para crecer en fe y comunidad."
    ],
    horarios: [
      "Disponibles durante toda la semana"
    ],
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
    <section id="servicios" className="max-w-4xl mx-auto py-16 px-6">
      <h2 className="text-3xl font-bold text-primary mb-10 font-serif text-center">
        Nuestros Servicios
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {servicios.map((servicio) => {
          const Icon = servicio.icon;
          return (
            <div
              key={servicio.nombre}
              className="bg-white rounded-xl shadow p-7 flex flex-col items-center text-center transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:bg-secondary/10 border hover:border-secondary cursor-pointer"
              onClick={() => handleOpenModal(servicio)}
              tabIndex={0}
              role="button"
              aria-label={`Ver detalles de ${servicio.nombre}`}
            >
              <Icon className="w-10 h-10 text-primary mb-4" />
              <div className="text-xl font-semibold text-slate-800 mb-1">{servicio.nombre}</div>
              {servicio.horarios && (
                <div className="text-base text-secondary">{servicio.horarios[0]}</div>
              )}
            </div>
          );
        })}
      </div>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        {modalServicio && (
          <div className="text-center px-1">
            <h3 className="text-3xl font-bold text-primary mb-6 font-serif">{modalServicio.nombre}</h3>
            <div className="flex flex-col gap-4 mb-6">
              {modalServicio.descripcion.map((p: string, idx: number) => (
                <p key={idx} className="text-base md:text-lg text-slate-700">{p}</p>
              ))}
              {modalServicio.edad && (
                <div className="text-base font-semibold text-secondary bg-secondary/10 rounded-lg py-2 px-4 inline-block mx-auto">
                  Edad: {modalServicio.edad}
                </div>
              )}
            </div>
            <div className="mb-6">
              <div className="font-bold text-lg text-primary mb-2">Horarios</div>
              <ul className="flex flex-col gap-1 items-center">
                {modalServicio.horarios.map((h: string, idx: number) => (
                  <li key={idx} className="text-base text-slate-800">{h}</li>
                ))}
              </ul>
            </div>
            {modalServicio.conexion && (
              <Link
                to="/conexion"
                className="inline-block mt-2 bg-primary hover:bg-secondary text-white font-semibold py-2 px-6 rounded-full shadow transition"
              >
                Ir a Conexión
              </Link>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
};

export default NuestrosServiciosSection;