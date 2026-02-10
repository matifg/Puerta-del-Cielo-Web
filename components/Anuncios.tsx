
import React from 'react';
import { anuncios } from '../data/anuncios';

export const Anuncios: React.FC = () => {
  return (
    <section id="anuncios" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Anuncios de la Semana</h2>
            <p className="text-slate-500 mt-2">Mantenete al tanto de todo lo que sucede en nuestra casa.</p>
          </div>
          <button className="text-amber-600 font-semibold hover:text-amber-700 transition-colors flex items-center gap-1 group">
            Ver cartelera completa
            <span className="transform transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {anuncios.map((anuncio) => (
            <div key={anuncio.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full mb-4">
                {anuncio.category}
              </span>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{anuncio.title}</h3>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                {anuncio.description}
              </p>
              <div className="pt-4 border-t border-slate-50 flex items-center gap-2 text-slate-400 text-xs font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {anuncio.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
