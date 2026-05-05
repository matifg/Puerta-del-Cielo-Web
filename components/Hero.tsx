import React, { useState } from 'react';

export const Hero: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setShowModal(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">

      {/* VIDEO DESKTOP */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="hidden md:block absolute inset-0 w-full h-full object-cover brightness-110 contrast-110"
      >
        <source src="/video/PuertaDelCieloHero.mp4" type="video/mp4" />
      </video>

      {/* IMAGEN MOBILE */}
      <div
        className="absolute inset-0 md:hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-mobile.jpg')" }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>

      {/* CONTENIDO */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-6 px-4 max-w-2xl text-center animate-fadein">
        <h1 className="font-serif text-primary text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg uppercase">
          PUERTA DEL CIELO
        </h1>
        <h2 className="font-sans text-xl md:text-2xl text-white font-light tracking-wide drop-shadow uppercase">
          Tu Lugar, Tu casa
        </h2>

        {/* Línea decorativa */}
        <div className="w-20 h-[3px] bg-gradient-to-r from-secondary via-primary to-white rounded-full mx-auto mb-2"></div>

        {/* BOTONES */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center">
          <a
            href="https://www.google.com/maps?q=Manuel+Belgrano+2053+Baradero"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-7 py-3 rounded-full bg-primary text-white font-semibold shadow-xl hover:bg-secondary hover:scale-105 transition-all duration-200 text-base gap-2 uppercase"
          >
            {/* Icono Lucide: MapPin */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6-5.686-6-10a6 6 0 1112 0c0 4.314-6 10-6 10z" />
              <circle cx="12" cy="11" r="2.5" fill="currentColor" className="text-white" />
            </svg>
            CÓMO LLEGAR
          </a>
          <button
            className="flex items-center justify-center px-7 py-3 rounded-full border-2 border-primary text-primary font-semibold bg-white shadow-xl hover:bg-secondary/10 hover:scale-105 transition-all duration-200 text-base gap-2 uppercase"
            onClick={() => setShowModal(true)}
          >
            {/* Icono Lucide: Clock */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
            </svg>
            VER HORARIOS
          </button>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 animate-fade"
          onClick={handleOverlayClick}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 min-w-[320px] max-w-[90vw] relative animate-scale">
            <button
              className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-primary transition"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-serif font-bold mb-4 text-primary text-center uppercase">
              HORARIOS DE REUNIONES
            </h2>
            <ul className="text-lg text-gray-700 text-center">
              <li>Domingos 19:00 hs</li>
              <li>Miércoles 20:00 hs</li>
            </ul>
          </div>
        </div>
      )}

      {/* ANIMACIONES */}
      <style>{`
        @keyframes fadein {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fadein {
          animation: fadein 0.8s cubic-bezier(.4,0,.2,1) both;
        }
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