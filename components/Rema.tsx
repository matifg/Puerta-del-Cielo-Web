
import React from 'react';
import { remaActual } from '../data/rema';

export const Rema: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl text-slate-800 mb-2">Palabra Rema {remaActual.year}</h2>
        <div className="w-20 h-1 bg-amber-500 mx-auto mb-10"></div>
        <div className="bg-slate-50 p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-2xl md:text-4xl font-bold text-amber-600 mb-6 italic serif underline decoration-amber-200 decoration-4 underline-offset-8">
            "{remaActual.word}"
          </h3>
          <p className="text-lg text-slate-700 italic mb-8 font-medium">
            {remaActual.verse}
          </p>
          <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {remaActual.explanation}
          </p>
        </div>
      </div>
    </section>
  );
};
