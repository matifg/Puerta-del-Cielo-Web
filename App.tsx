import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Hero } from './components/Hero.tsx';
import { Rema } from './components/Rema.tsx';
import { Anuncios } from './components/Anuncios.tsx';
import { Eventos } from './components/Eventos.tsx';
import { Devocional } from './components/Devocional.tsx';
import { Multimedia } from './components/Multimedia.tsx';
import { Footer } from './components/Footer.tsx';
import { Team } from './components/Team.tsx';
import { Navbar } from "./components/Navbar";

import Home from "./pages/Home";
import QuienesSomos from "./pages/QuienesSomos";
import AreaEducativa from "./pages/AreaEducativa.tsx";
import Conexion from "./pages/Conexion.tsx";
import Bethel from "./pages/Bethel.tsx";
import ContactoPage from "./pages/ContactoPage";
import VisionSection from "./sections/VisionSection";
import EquipoMinisterialSection from "./components/EquipoMinisterialSection";
import AreasServicioSection from "./components/AreasServicioSection";
import SePartePage from "./pages/SePartePage";
import ConexionPage from "./pages/ConexionPage";
import DiscipuladoSection from "./components/DiscipuladoSection";
import DanzaArtesSection from "./components/DanzaArtesSection";
import IntercesionSection from "./components/IntercesionSection";
import LiderazgoSection from "./components/LiderazgoSection";

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
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#0a1837] via-[#1e335c] to-[#0a1837]">
        <div className="relative flex-1 flex items-center justify-center w-full">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Glow animado detrás del logo */}
            <div className="w-64 h-64 rounded-full bg-secondary/30 blur-3xl animate-pulse-glow" />
          </div>
          <div className="relative z-10 bg-white/10 backdrop-blur-xl p-12 md:p-16 rounded-2xl shadow-2xl text-center max-w-2xl mx-auto border border-secondary/30 animate-fade-blur">
            <img
              src="/images/puerta.logo.png"
              alt="Logo Puerta del Cielo"
              className="mx-auto mb-8 w-24 h-24 object-contain grayscale drop-shadow-xl animate-logo-pop"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white font-serif drop-shadow">
              Estamos renovando nuestra casa digital
            </h1>
            <p className="text-white mb-4 text-lg font-sans">
              Pronto volveremos a estar conectados.<br />
              Mientras tanto, seguinos en nuestras redes:
            </p>
            <div className="flex justify-center gap-6 mb-6">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/puertadelcielo.ba/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 border border-secondary/25 shadow transition-all duration-200 hover:bg-secondary hover:text-white hover:scale-110"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.235-1.3a1.107 1.107 0 100 2.214 1.107 1.107 0 000-2.214z" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="https://www.youtube.com/@puertadelcielo1112"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 border border-secondary/25 shadow transition-all duration-200 hover:bg-secondary hover:text-white hover:scale-110"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.185 3.5 12 3.5 12 3.5s-7.185 0-9.391.569A2.994 2.994 0 0 0 .502 6.186C0 8.4 0 12 0 12s0 3.6.502 5.814a2.994 2.994 0 0 0 2.107 2.117C4.815 20.5 12 20.5 12 20.5s7.185 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117C24 15.6 24 12 24 12s0-3.6-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/puertadelcielobaradero"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 border border-secondary/25 shadow transition-all duration-200 hover:bg-secondary hover:text-white hover:scale-110"
              >
                <svg className="w-7 h-7 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.525 2.001H6.475A4.474 4.474 0 002 6.475v11.05A4.474 4.474 0 006.475 22h11.05A4.474 4.474 0 0022 17.525V6.475A4.474 4.474 0 0017.525 2.001zm-2.03 7.5h-1.07c-.84 0-.98.4-.98.96v1.14h2.05l-.27 2.09h-1.78v5.36h-2.13v-5.36h-1.78v-2.09h1.78v-1.54c0-1.76 1.07-2.72 2.63-2.72.75 0 1.39.06 1.58.09v1.8z" />
                </svg>
              </a>
            </div>
            <span className="text-white text-lg font-sans block mb-4">
              ¡Te esperamos con alegría y bendiciones!
            </span>
            <span className="block text-secondary font-serif text-base mt-2">
              “Yo iré delante de ti.”<br />
              <span className="text-white font-sans">Isaías 45:2</span>
            </span>
          </div>
        </div>
        <footer className="w-full py-6 bg-white/10 border-t border-secondary/30 mt-8">
          <div className="max-w-md mx-auto flex flex-col items-center gap-2">
            <div className="text-xs text-white font-sans">
              Powered by{' '}
              <a
                href="https://www.baraderodevlabs.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:underline"
              >
                BaraderoDevsLabs
              </a>
            </div>
          </div>
        </footer>
        {/* Animaciones */}
        <style>{`
          @keyframes fadeBlur {
            from { opacity: 0; filter: blur(12px);}
            to { opacity: 1; filter: blur(0);}
          }
          .animate-fade-blur {
            animation: fadeBlur 1.2s cubic-bezier(.4,0,.2,1) both;
          }
          @keyframes logoPop {
            0% { opacity: 0; transform: scale(0.8);}
            70% { opacity: 1; transform: scale(1.08);}
            100% { opacity: 1; transform: scale(1);}
          }
          .animate-logo-pop {
            animation: logoPop 1s cubic-bezier(.4,0,.2,1) both;
          }
          @keyframes pulseGlow {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
          .animate-pulse-glow {
            animation: pulseGlow 2.5s infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar />
      <div className="pt-24 bg-black min-h-screen">        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quienes-somos" element={<QuienesSomos />}>
          <Route index element={<VisionSection />} />
          <Route path="vision" element={<VisionSection />} />
          <Route path="equipo-ministerial" element={<EquipoMinisterialSection />} />
          <Route path="areas-servicio" element={<AreasServicioSection />} />
        </Route>
        <Route path="/area-educativa" element={<AreaEducativa />} />
        <Route path="/conexion" element={<Conexion />} />
        <Route path="/bethel" element={<Bethel />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/conexion/se-parte" element={<SePartePage />} />
        <Route path="/conexion/iglesia-en-casa" element={<ConexionPage />} />
        <Route path="/area-educativa/discipulado" element={<DiscipuladoSection />} />
        <Route path="/area-educativa/danza-artes" element={<DanzaArtesSection />} />
        <Route path="/area-educativa/intercesion" element={<IntercesionSection />} />
        <Route path="/liderazgo" element={<LiderazgoSection />} />
        <Route path="/area-educativa/liderazgo" element={<LiderazgoSection />} />
      </Routes>
      </div>

      {/* BOTÓN WHATSAPP PRO */}
      <a
        href="https://wa.me/549123456789"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-[9999] w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl"
        aria-label="Escribinos por WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-7 h-7"
          fill="currentColor"
        >
          <path d="M16 .4C7.2.4 0 7.6 0 16c0 2.8.7 5.5 2.1 7.9L0 32l8.3-2.1C10.6 31.3 13.3 32 16 32c8.8 0 16-7.2 16-16S24.8.4 16 .4zm0 29.2c-2.4 0-4.8-.6-6.9-1.8l-.5-.3-4.9 1.3 1.3-4.7-.3-.5C3.5 20.8 3 18.5 3 16 3 9.4 9.4 3 16 3s13 6.4 13 13-6.4 13-13 13zm7.2-9.6c-.4-.2-2.2-1.1-2.5-1.2-.3-.1-.6-.2-.9.2-.3.4-1 1.2-1.2 1.4-.2.2-.4.3-.8.1-.4-.2-1.7-.6-3.3-2.1-1.2-1-2.1-2.3-2.4-2.7-.2-.4 0-.6.2-.8.2-.2.4-.4.6-.6.2-.2.3-.4.4-.6.1-.2 0-.5 0-.7 0-.2-.9-2.1-1.2-2.9-.3-.7-.6-.6-.9-.6h-.7c-.2 0-.6.1-.9.5-.3.4-1.2 1.2-1.2 3s1.3 3.5 1.5 3.7c.2.2 2.6 4 6.3 5.6.9.4 1.6.6 2.2.8.9.3 1.7.3 2.3.2.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.7.2-1.8-.1-.1-.4-.2-.8-.4z" />
        </svg>
      </a>
    </BrowserRouter>
  );
};

export default App;
