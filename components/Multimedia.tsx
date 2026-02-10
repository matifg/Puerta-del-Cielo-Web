
import React from 'react';
import { youtubeData } from '../data/youtube';

export const Multimedia: React.FC = () => {
  return (
    <section id="multimedia" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-slate-800 mb-6">{youtubeData.title}</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Si no podés acompañarnos de manera presencial, conectate a nuestras transmisiones en vivo. Reviví todos los mensajes y tiempos de alabanza en nuestro canal oficial.
            </p>
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-4 text-slate-700">
                <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                </div>
                <div>
                  <p className="font-bold">Cultos en Vivo</p>
                  <p className="text-sm text-slate-500">Transmitimos todos los domingos 10:00 hs</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-700">
                <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                </div>
                <div>
                  <p className="font-bold">Archivo de Mensajes</p>
                  <p className="text-sm text-slate-500">Más de 200 mensajes disponibles para vos</p>
                </div>
              </div>
            </div>
            <a 
              href={youtubeData.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-red-200"
            >
              Ir al Canal de YouTube
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-amber-500 rounded-3xl rotate-3 scale-105 z-0 opacity-20"></div>
            <div className="relative z-10 aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <iframe 
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeData.latestVideoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
