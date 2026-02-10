
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-1000 hover:scale-105"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80')` }}
      >
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 px-4 max-w-4xl animate-fade-in-up">
        <span className="text-amber-200 uppercase tracking-[0.3em] text-sm mb-4 block font-semibold">Bienvenidos a</span>
        <h1 className="text-5xl md:text-8xl text-white font-bold mb-6 drop-shadow-lg">
          Puerta del Cielo
        </h1>
        <p className="text-xl md:text-2xl text-slate-100 font-light italic mb-8 serif">
          "Un lugar de encuentro con Su presencia en el corazón de Baradero"
        </p>
        <a 
          href="#anuncios" 
          className="inline-block px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-full transition-all transform hover:-translate-y-1 shadow-xl"
        >
          Conocé Más
        </a>
      </div>
    </section>
  );
};
