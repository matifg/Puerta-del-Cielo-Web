import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero.tsx';
import { Rema } from './components/Rema.tsx';
import { Anuncios } from './components/Anuncios.tsx';
import { Eventos } from './components/Eventos.tsx';
import { Devocional } from './components/Devocional.tsx';
import { Multimedia } from './components/Multimedia.tsx';
import { Footer } from './components/Footer.tsx';
import { Team } from './components/Team.tsx';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [maintenanceMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (maintenanceMode) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-amber-100 via-white to-amber-200">
        <div className="relative flex-1 flex items-center justify-center w-full">
          {/* Glow cálido detrás del card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-amber-200 blur-3xl opacity-30 z-0"></div>
          <div className="relative z-10 bg-white p-16 rounded-2xl shadow-lg text-center max-w-2xl mx-auto border border-amber-200">
            {/* Logo de la iglesia */}
            <img
              src="/images/puerta.logo.png"
              alt="Logo Puerta del Cielo"
              className="mx-auto mb-8 w-36 h-36 object-contain grayscale"
            />
            <h1 className="text-4xl font-bold mb-4 text-amber-700 font-serif">
              Estamos renovando nuestra casa digital
            </h1>
            <p className="text-amber-700 mb-4 text-lg font-sans">
              Pronto volveremos a estar conectados.<br />
              Mientras tanto, seguinos en nuestras redes:
            </p>
            {/* Botones de redes sociales */}
            <div className="flex justify-center gap-6 mb-6">
              <a
                href="https://www.instagram.com/puertadelcielo.ba/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-14 h-14 flex items-center justify-center rounded-full bg-white border border-amber-200 shadow transition-colors duration-200 hover:bg-amber-100"
              >
                <svg className="w-7 h-7 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.235-1.3a1.107 1.107 0 100 2.214 1.107 1.107 0 000-2.214z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@puertadelcielo1112"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-14 h-14 flex items-center justify-center rounded-full bg-white border border-amber-200 shadow transition-colors duration-200 hover:bg-amber-100"
              >
                <svg className="w-7 h-7 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.185 3.5 12 3.5 12 3.5s-7.185 0-9.391.569A2.994 2.994 0 0 0 .502 6.186C0 8.4 0 12 0 12s0 3.6.502 5.814a2.994 2.994 0 0 0 2.107 2.117C4.815 20.5 12 20.5 12 20.5s7.185 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117C24 15.6 24 12 24 12s0-3.6-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
            <span className="text-amber-600 text-lg font-sans block mb-4">
              ¡Te esperamos con alegría y bendiciones!
            </span>
            <span className="block text-amber-700 font-serif text-base mt-2">
              “Yo iré delante de ti.”<br />
              <span className="text-amber-600 font-sans">Isaías 45:2</span>
            </span>
          </div>
        </div>
        <footer className="w-full py-6 bg-white border-t border-amber-200 mt-8">
          <div className="max-w-md mx-auto flex flex-col items-center gap-2">
            <div className="text-xs text-amber-700 font-sans">
              Powered by{' '}
              <a
                href="https://www.baraderodevlabs.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 hover:underline"
              >
                BaraderoDevsLabs
              </a>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dynamic Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className={`text-2xl font-bold serif transition-colors ${scrolled ? 'text-slate-800' : 'text-white'}`}>
            Puerta del Cielo
          </div>
          <div className={`hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest transition-colors ${scrolled ? 'text-slate-600' : 'text-slate-200'}`}>
            <a href="#anuncios" className="hover:text-amber-500 transition-colors">Anuncios</a>
            <a href="#eventos" className="hover:text-amber-500 transition-colors">Eventos</a>
            <a href="#devocional" className="hover:text-amber-500 transition-colors">Devocional</a>
            <a href="#multimedia" className="hover:text-amber-500 transition-colors">Multimedia</a>
            <a href="#equipo" className="hover:text-amber-500 transition-colors">Nosotros</a>
          </div>
          <button className="md:hidden">
            <svg className={`w-8 h-8 ${scrolled ? 'text-slate-800' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
        </div>
      </nav>

      <main>
        <Hero />
        <Rema />
        <Anuncios />
        <Eventos />
        <Devocional />
        <Team />
        <Multimedia />
      </main>

      <Footer />
    </div>
  );
};

export default App;
