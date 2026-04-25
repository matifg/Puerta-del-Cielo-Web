import { Clock, Calendar } from "lucide-react";

const DanzaArtesSection = () => (
  <section
    className="relative w-full pt-12 pb-20 md:pt-20 md:pb-28 bg-cover bg-center bg-no-repeat overflow-hidden"
    style={{
      backgroundImage: "url('/images/danzas.jpg')",
    }}
  >
    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

    <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
      {/* HERO */}
      <div className="text-center space-y-5 mb-10 animate-fade-in-hero">
        <h2 className="font-serif text-4xl md:text-5xl text-white tracking-[0.04em] font-semibold leading-tight drop-shadow-[0_3px_12px_rgba(0,0,0,0.8)]">
          Danza y Artes
        </h2>
        <p className="font-sans text-lg text-gray-100 max-w-2xl mx-auto leading-relaxed font-light tracking-[0.01em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          Un espacio donde la creatividad, el movimiento y la adoración se convierten
          en instrumentos para transformar vidas.
        </p>
      </div>

      {/* CARD */}
      <div className="bg-black/60 border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl shadow-black/40 backdrop-blur-sm animate-fade-in-card">
        {/* DESCRIPCIÓN */}
        <p className="font-sans text-gray-100 text-center max-w-2xl mx-auto mb-8 leading-relaxed font-light animate-fade-in-desc">
          La Escuela de Danza y Artes Dinámicas forma personas con identidad,
          sensibilidad espiritual y excelencia, entendiendo el arte como un medio
          para manifestar la presencia de Dios.
        </p>

        {/* INFO */}
        <div className="grid md:grid-cols-2 gap-5 max-w-2xl mx-auto mb-8">
          <div className="group bg-white/10 rounded-xl p-5 text-center border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] animate-fade-in-info" style={{ animationDelay: "300ms" }}>
            <Clock className="w-6 h-6 text-primary mx-auto mb-2 transition-transform duration-300 group-hover:scale-110" />
            <p className="font-sans text-xs text-gray-300 uppercase tracking-[0.15em]">
              Duración
            </p>
            <p className="font-sans text-white font-medium text-lg tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
              1 año
            </p>
          </div>
          <div className="group bg-white/10 rounded-xl p-5 text-center border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] animate-fade-in-info" style={{ animationDelay: "500ms" }}>
            <Calendar className="w-6 h-6 text-primary mx-auto mb-2 transition-transform duration-300 group-hover:scale-110" />
            <p className="font-sans text-xs text-gray-300 uppercase tracking-[0.15em]">
              Modalidad
            </p>
            <p className="font-sans text-white font-medium text-lg tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
              Últimos dos sábados del mes
            </p>
          </div>
        </div>

        {/* LISTA */}
        <div className="mb-8">
          <h3 className="text-secondary text-center mb-5 font-medium tracking-[0.08em] uppercase animate-fade-in-list-title">
            ¿Qué vas a vivir?
          </h3>
          <ul className="grid md:grid-cols-2 gap-3 text-gray-200 max-w-2xl mx-auto">
            {[
              "Fundamentos bíblicos sólidos",
              "Formación espiritual",
              "Entrenamiento en danza",
              "Desarrollo de creatividad",
              "Comunidad real",
              "Espacios de práctica",
              "Acompañamiento cercano",
              "Tiempos de ministración",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 animate-fade-in-list"
                style={{ animationDelay: `${i * 80 + 700}ms` }}
              >
                <span className="text-secondary mt-1">•</span>
                <span className="font-sans font-light">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-cta" style={{ animationDelay: "1400ms" }}>
          <a
            href="/docs/escuela-dya.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white px-6 py-3 rounded-full transition-all duration-300 text-center shadow-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(37,99,235,0.6)] font-sans tracking-wide"
          >
            Ver plan
          </a>
          <a
            href="/docs/escuela-dya.pdf"
            download
            className="border border-white/40 text-white/90 px-6 py-3 rounded-full transition-all duration-300 text-center hover:bg-white/10 hover:scale-105 font-sans tracking-wide"
          >
            Descargar
          </a>
          <a
            href="https://wa.me/549123456789?text=Hola!%20Quiero%20info%20sobre%20Danza%20y%20Artes"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-secondary text-secondary px-6 py-3 rounded-full transition-all duration-300 text-center hover:bg-secondary/10 hover:scale-105 hover:shadow-[0_0_20px_rgba(64,194,222,0.5)] font-sans tracking-wide"
          >
            Info por WhatsApp
          </a>
        </div>
      </div>

      <div className="h-20 md:h-28" />
    </div>

    {/* Animaciones */}
    <style>{`
      @keyframes fadeInHero {
        from { opacity: 0; transform: translateY(-40px);}
        to { opacity: 1; transform: translateY(0);}
      }
      @keyframes fadeInCard {
        from { opacity: 0; transform: scale(0.97);}
        to { opacity: 1; transform: scale(1);}
      }
      @keyframes fadeInDesc {
        from { opacity: 0; transform: translateY(24px);}
        to { opacity: 1; transform: translateY(0);}
      }
      @keyframes fadeInInfo {
        from { opacity: 0; transform: translateY(32px);}
        to { opacity: 1; transform: translateY(0);}
      }
      @keyframes fadeInListTitle {
        from { opacity: 0; transform: translateX(-24px);}
        to { opacity: 1; transform: translateX(0);}
      }
      @keyframes fadeInList {
        from { opacity: 0; transform: translateX(32px);}
        to { opacity: 1; transform: translateX(0);}
      }
      @keyframes fadeInCTA {
        from { opacity: 0; transform: scale(0.95);}
        to { opacity: 1; transform: scale(1);}
      }
      .animate-fade-in-hero {
        animation: fadeInHero 0.7s cubic-bezier(.4,0,.2,1) both;
      }
      .animate-fade-in-card {
        animation: fadeInCard 0.7s 0.2s cubic-bezier(.4,0,.2,1) both;
      }
      .animate-fade-in-desc {
        animation: fadeInDesc 0.7s 0.35s cubic-bezier(.4,0,.2,1) both;
      }
      .animate-fade-in-info {
        animation: fadeInInfo 0.7s cubic-bezier(.4,0,.2,1) both;
      }
      .animate-fade-in-list-title {
        animation: fadeInListTitle 0.7s 0.6s cubic-bezier(.4,0,.2,1) both;
      }
      .animate-fade-in-list {
        animation: fadeInList 0.7s cubic-bezier(.4,0,.2,1) both;
      }
      .animate-fade-in-cta {
        animation: fadeInCTA 0.7s 1.2s cubic-bezier(.4,0,.2,1) both;
      }
    `}</style>
  </section>
);

export default DanzaArtesSection;