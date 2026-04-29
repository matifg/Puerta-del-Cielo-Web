import React from 'react';

const NuestraEsenciaSection: React.FC = () => (
  <section className="relative py-24 px-6 overflow-hidden">

    {/* BACKGROUND PRO */}
    <div className="absolute inset-0 bg-gradient-to-br from-black via-[#020617] to-black opacity-90" />

    <div className="relative z-10 max-w-5xl mx-auto">

      {/* TITLE */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-serif text-white">
          Nuestra Esencia
        </h2>
        <div className="w-20 h-[3px] bg-secondary mx-auto mt-4 rounded-full" />
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* VISIÓN */}
        <div className="
          group
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-2xl p-10
          text-center

          transition-all duration-500
          hover:-translate-y-2
          hover:shadow-[0_10px_40px_rgba(64,194,222,0.25)]
        ">
          <h3 className="text-2xl font-serif text-secondary mb-4 group-hover:scale-105 transition">
            Visión
          </h3>

          <p className="text-gray-300 leading-relaxed">
            Ser una iglesia que impacte vidas a través del amor de Dios,
            formando una comunidad sólida de fe, esperanza y propósito.
          </p>
        </div>

        {/* MISIÓN */}
        <div className="
          group
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-2xl p-10
          text-center

          transition-all duration-500
          hover:-translate-y-2
          hover:shadow-[0_10px_40px_rgba(64,194,222,0.25)]
        ">
          <h3 className="text-2xl font-serif text-secondary mb-4 group-hover:scale-105 transition">
            Misión
          </h3>

          <p className="text-gray-300 leading-relaxed">
            Guiar a las personas a conocer a Dios, crecer espiritualmente y vivir
            una vida con propósito, sirviendo a otros y extendiendo el Reino de Dios.
          </p>
        </div>

      </div>

    </div>
  </section>
);

export default NuestraEsenciaSection;