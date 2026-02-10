
import React from 'react';
import { devocionalHoy } from '../data/devocional';

export const Devocional: React.FC = () => {
  return (
    <section id="devocional" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-500/5 -skew-x-12 transform translate-x-1/2"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-amber-500 font-bold tracking-widest text-xs uppercase mb-2 block">Creciendo en la fe</span>
          <h2 className="text-4xl font-bold serif">Devocional Diario</h2>
          <p className="text-slate-400 mt-2">{devocionalHoy.date}</p>
        </div>

        <div className="bg-white/5 backdrop-blur-md p-10 md:p-16 rounded-3xl border border-white/10 shadow-2xl">
          <h3 className="text-3xl font-bold mb-6 text-amber-400">{devocionalHoy.title}</h3>
          
          <blockquote className="border-l-4 border-amber-500 pl-6 mb-10 py-2">
            <p className="text-xl md:text-2xl font-light italic leading-relaxed text-slate-200 serif">
              "{devocionalHoy.verse}"
            </p>
            <cite className="block mt-4 text-amber-500 font-bold not-italic">
              — {devocionalHoy.reference}
            </cite>
          </blockquote>

          <div className="text-slate-300 leading-loose mb-10 text-lg">
            {devocionalHoy.content}
          </div>

          <div className="flex items-center gap-4 pt-8 border-t border-white/10">
            <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center font-bold text-slate-900">
              {devocionalHoy.author.split(' ')[1][0]}
            </div>
            <div>
              <p className="text-sm font-bold text-white">{devocionalHoy.author}</p>
              <p className="text-xs text-slate-500">Publicado hoy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
