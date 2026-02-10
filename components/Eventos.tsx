
import React from 'react';
import { eventos } from '../data/eventos';

export const Eventos: React.FC = () => {
  return (
    <section id="eventos" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Próximos Eventos</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Agendá estas fechas especiales para que podamos compartir juntos momentos inolvidables.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {eventos.map((evento) => (
            <div key={evento.id} className="group relative bg-white overflow-hidden rounded-2xl border border-slate-100 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl">
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={evento.image} 
                  alt={evento.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-2 rounded-lg text-center min-w-[60px] shadow-lg">
                  <span className="block text-xl font-bold text-amber-600 leading-none">
                    {evento.date.split(' ')[0]}
                  </span>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">
                    {evento.date.split(' ')[2]}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-amber-600 transition-colors">
                  {evento.title}
                </h3>
                <p className="text-slate-500 text-sm mb-6 line-clamp-2">
                  {evento.description}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-400 text-sm font-medium">
                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {evento.time}
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 text-sm font-medium">
                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {evento.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
