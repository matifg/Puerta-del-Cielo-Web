import React from 'react';

export const Hero: React.FC = () => (
  <section
    className="relative min-h-screen flex flex-col justify-center items-center text-center bg-cover bg-center overflow-hidden"
  >
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
    <div className="relative z-10 flex flex-col items-center">
      <h1 className="text-5xl md:text-6xl font-bold text-[#d97706] mb-4 serif drop-shadow-lg">
        Puerta del Cielo
      </h1>
      <h2 className="text-2xl md:text-3xl text-white mb-6 font-medium drop-shadow">
        Un lugar donde encontrar fe, comunidad y esperanza.
      </h2>
      <div className="text-lg text-[#f5f5f5] mb-8 drop-shadow">
        Domingos 19hs — Baradero
      </div>
      <a
        href="#eventos"
        className="px-8 py-3 bg-amber-600 text-white rounded-full text-lg font-bold shadow hover:bg-amber-700 transition"
      >
        Quiero visitar
      </a>
    </div>
  </section>
);
