import React, { useState } from 'react';

export const Hero: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  // Cerrar modal al hacer click fuera de la caja
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center bg-cover bg-center overflow-hidden">
      {/* Video de fondo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/50"></div>
      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-5xl md:text-6xl font-bold text-[#d97706] mb-4 font-serif drop-shadow-lg">
          Puerta del Cielo
        </h1>
        <h2 className="text-2xl md:text-3xl text-white mb-6 font-medium drop-shadow">
          Un lugar donde encontrar fe, comunidad y esperanza.
        </h2>
        <div className="text-lg text-[#f5f5f5] mb-8 drop-shadow">
          Domingos 19hs — Baradero
        </div>
        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2 justify-center">
          {/* Botón principal: Cómo llegar */}
          <a
            href="https://www.google.com/maps?q=Manuel+Belgrano+2053+Baradero"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-6 py-3 rounded-full bg-amber-600 text-white font-semibold shadow-lg hover:bg-amber-700 hover:-translate-y-1 transition-all duration-200 text-lg"
          >
            {/* Icono ubicación */}
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.24 7.76a3.5 3.5 0 00-4.97 0l-.07.08a3.5 3.5 0 000 4.97l4.24 4.24a3.5 3.5 0 004.95-4.95l-.07-.08-4.24-4.24zM12 2a10 10 0 00-10 10c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18a8 8 0 01-8-8 8 8 0 0116 0 8 8 0 01-8 8z" />
            </svg>
            Cómo llegar
          </a>
          {/* Botón secundario: Ver horarios */}
          <button
            className="flex items-center justify-center px-6 py-3 rounded-full border border-amber-600 text-amber-600 font-semibold bg-white shadow-lg hover:bg-amber-50 hover:-translate-y-1 transition-all duration-200 text-lg"
            onClick={() => setShowModal(true)}
            type="button"
          >
            {/* Icono reloj */}
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 2M12 2a10 10 0 100 20 10 10 0 000-20z" />
            </svg>
            Ver horarios
          </button>
        </div>
      </div>
      {/* Modal Overlay y Caja */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade"
          onClick={handleOverlayClick}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 min-w-[320px] max-w-[90vw] relative animate-scale">
            <button
              className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-amber-600 transition"
              onClick={() => setShowModal(false)}
              aria-label="Cerrar"
              type="button"
            >
              &times;
            </button>
            <h2 className="text-2xl font-serif font-bold mb-4 text-amber-700 text-center">
              Horarios de reuniones
            </h2>
            <ul className="font-sans text-lg text-gray-700 text-center">
              <li>Domingos 19:00 hs</li>
              <li>Miércoles 20:00 hs</li>
            </ul>
          </div>
        </div>
      )}
      {/* Animaciones Tailwind (puedes agregar en tu CSS global si no tienes) */}
      <style>{`
        @keyframes fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade {
          animation: fade 0.2s;
        }
        @keyframes scale {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale {
          animation: scale 0.2s;
        }
      `}</style>
    </section>
  );
};
