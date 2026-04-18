import React from 'react';

const NuestraEsenciaSection: React.FC = () => (
  <section className="max-w-4xl mx-auto py-16 px-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center text-center">
        <h3 className="text-2xl font-bold text-amber-700 mb-3 font-serif">Visión</h3>
        <p className="text-lg text-slate-700">
          Ser una iglesia que impacte vidas a través del amor de Dios, formando una comunidad sólida de fe, esperanza y propósito.
        </p>
      </div>
      <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center text-center">
        <h3 className="text-2xl font-bold text-amber-700 mb-3 font-serif">Misión</h3>
        <p className="text-lg text-slate-700">
          Guiar a las personas a conocer a Dios, crecer espiritualmente y vivir una vida con propósito, sirviendo a otros y extendiendo el Reino de Dios.
        </p>
      </div>
    </div>
  </section>
);

export default NuestraEsenciaSection;