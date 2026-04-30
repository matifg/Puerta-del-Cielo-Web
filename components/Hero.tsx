import React, { useState } from 'react';

export const Hero: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">

      {/* 🎬 VIDEO SOLO DESKTOP */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="hidden md:block absolute inset-0 w-full h-full object-cover brightness-110 contrast-110"
      >
        <source src="/video/PuertaDelCieloHero.mp4" type="video/mp4" />
      </video>

      {/* 🖼️ IMAGEN SOLO MOBILE */}
      <div
        className="absolute inset-0 md:hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-mobile.jpg')" }}
      />

      {/* 🔥 OVERLAY PRO */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>

      {/* CONTENIDO */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-6 px-4 max-w-2xl text-center">

        <h1 className="font-serif text-primary text-5xl md:text-7xl font-bold tracking-tight">
  Puerta del Cielo
</h1>

<h2 className="font-sans text-xl md:text-2xl text-white/90 font-light tracking-wide">
  Tu Lugar, Tu Casa
</h2>

        <div className="w-16 h-[2px] bg-secondary/80 rounded-full"></div>

        {/* BOTONES */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">

          <a
            href="https://www.google.com/maps?q=Manuel+Belgrano+2053+Baradero"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white font-semibold shadow-lg hover:bg-secondary hover:-translate-y-1 transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.24 7.76a3.5 3.5 0 00-4.97 0l-.07.08a3.5 3.5 0 000 4.97l4.24 4.24a3.5 3.5 0 004.95-4.95l-.07-.08-4.24-4.24zM12 2a10 10 0 00-10 10c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18a8 8 0 01-8-8 8 8 0 0116 0 8 8 0 01-8 8z" />
            </svg>
            Cómo llegar
          </a>

          <button
            className="flex items-center justify-center px-6 py-3 rounded-full border border-primary text-primary font-semibold bg-white shadow-lg hover:bg-secondary/10 hover:-translate-y-1 transition-all duration-200"
            onClick={() => {
              const section = document.getElementById("servicios");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 2M12 2a10 10 0 100 20 10 10 0 000-20z" />
            </svg>
            Ver horarios
          </button>

        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-50 animate-fade"
          onClick={handleOverlayClick}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 min-w-[320px] max-w-[90vw] relative animate-scale">
            <button
              className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-primary transition"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>

            <h2 className="text-2xl font-serif font-bold mb-4 text-primary text-center">
              Horarios de reuniones
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