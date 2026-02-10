
import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Rema } from './components/Rema';
import { Anuncios } from './components/Anuncios';
import { Eventos } from './components/Eventos';
import { Devocional } from './components/Devocional';
import { Multimedia } from './components/Multimedia';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        <Multimedia />
      </main>

      <Footer />
    </div>
  );
};

export default App;
