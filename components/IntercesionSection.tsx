import { Clock, Calendar } from "lucide-react";

const IntercesionSection = () => {
  return (
    <section
      className="relative w-full pt-12 pb-20 md:pt-20 md:pb-28 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: "url('/images/eige.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        {/* HERO */}
        <div className="text-center space-y-5 mb-10 animate-fade-in-hero-x">
          <h2 className="font-serif text-4xl md:text-5xl text-white tracking-[0.04em] font-semibold leading-tight drop-shadow-[0_3px_12px_rgba(0,0,0,0.8)]">
            EIGE
          </h2>
          <p className="font-sans text-lg text-gray-100 max-w-2xl mx-auto leading-relaxed font-light tracking-[0.01em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Entrenamiento en intercesión y guerra espiritual, donde se levantan
            intercesores con autoridad para transformar realidades a través de la
            oración.
          </p>
        </div>

        {/* CARD */}
        <div className="bg-black/60 border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl shadow-black/40 backdrop-blur-sm animate-fade-in-card-y">
          {/* DESCRIPCIÓN */}
          <p className="font-sans text-gray-100 text-center max-w-2xl mx-auto mb-8 leading-relaxed font-light animate-fade-in-desc-x">
            La EIGE es un espacio de formación donde se desarrollan intercesores
            capacitados para orar con discernimiento, desatar la voluntad de Dios y
            avanzar espiritualmente con autoridad.
          </p>
          {/* PROPÓSITO */}
          <p
            className="font-sans text-gray-100 text-center max-w-2xl mx-auto mb-8 leading-relaxed font-light animate-fade-in-desc-x"
            style={{ animationDelay: "200ms" }}
          >
            A través de la enseñanza bíblica, la impartición espiritual y la
            práctica de la oración estratégica, buscamos formar creyentes con
            carácter, fe y autoridad espiritual para impactar su entorno.
          </p>

          {/* INFO */}
          <div className="grid md:grid-cols-2 gap-5 max-w-2xl mx-auto mb-8">
            <div className="group bg-white/10 rounded-xl p-5 text-center border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] animate-fade-in-info-x">
              <Clock className="w-6 h-6 text-primary mx-auto mb-2 transition-transform duration-300 group-hover:scale-110" />
              <p className="font-sans text-xs text-gray-300 uppercase tracking-[0.15em]">
                Duración
              </p>
              <p className="font-sans text-white font-medium text-lg tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                2 años
              </p>
            </div>
            <div className="group bg-white/10 rounded-xl p-5 text-center border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] animate-fade-in-info-x">
              <Calendar className="w-6 h-6 text-primary mx-auto mb-2 transition-transform duration-300 group-hover:scale-110" />
              <p className="font-sans text-xs text-gray-300 uppercase tracking-[0.15em]">
                Modalidad
              </p>
              <p className="font-sans text-white font-medium text-lg tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                Presencial quincenal
              </p>
            </div>
          </div>

          {/* LISTA */}
          <div className="mb-8">
            <h3 className="text-secondary text-center mb-5 font-medium tracking-[0.08em] uppercase animate-fade-in-list-title-x">
              ¿Qué vas a recibir?
            </h3>
            <ul className="grid md:grid-cols-2 gap-3 text-gray-200 max-w-2xl mx-auto">
              {[
                "Fundamentos bíblicos en intercesión",
                "Material de estudio actualizado",
                "Formación espiritual del intercesor",
                "Comunidad y acompañamiento",
                "Espacios de consulta",
                "Ministración e impartición",
                "Práctica ministerial",
                "Salidas a terreno",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 animate-fade-in-list-x"
                  style={{ animationDelay: `${i * 80 + 700}ms` }}
                >
                  <span className="text-secondary mt-1">•</span>
                  <span className="font-sans font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-cta-x">
            <a
              href="/docs/escuela-eige.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-6 py-3 rounded-full transition-all duration-300 text-center shadow-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(37,99,235,0.6)] font-sans tracking-wide"
            >
              Ver plan académico
            </a>
            <a
              href="/docs/escuela-eige.pdf"
              download
              className="border border-white/40 text-white/90 px-6 py-3 rounded-full transition-all duration-300 text-center hover:bg-white/10 hover:scale-105 font-sans tracking-wide"
            >
              Descargar
            </a>
            <a
              href="https://wa.me/549123456789?text=Hola!%20Quiero%20info%20sobre%20Intercesión"
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
        @keyframes fadeInHeroX {
          from { opacity: 0; transform: translateX(-60px);}
          to { opacity: 1; transform: translateX(0);}
        }
        @keyframes fadeInCardY {
          from { opacity: 0; transform: translateY(60px) scale(0.97);}
          to { opacity: 1; transform: translateY(0) scale(1);}
        }
        @keyframes fadeInDescX {
          from { opacity: 0; transform: translateX(32px);}
          to { opacity: 1; transform: translateX(0);}
        }
        @keyframes fadeInInfoX {
          from { opacity: 0; transform: translateX(40px);}
          to { opacity: 1; transform: translateX(0);}
        }
        @keyframes fadeInListTitleX {
          from { opacity: 0; transform: translateY(24px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @keyframes fadeInListX {
          from { opacity: 0; transform: translateY(32px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @keyframes fadeInCTAX {
          from { opacity: 0; transform: scale(0.95);}
          to { opacity: 1; transform: scale(1);}
        }
        .animate-fade-in-hero-x {
          animation: fadeInHeroX 0.7s cubic-bezier(.4,0,.2,1) both;
        }
        .animate-fade-in-card-y {
          animation: fadeInCardY 0.7s 0.2s cubic-bezier(.4,0,.2,1) both;
        }
        .animate-fade-in-desc-x {
          animation: fadeInDescX 0.7s 0.35s cubic-bezier(.4,0,.2,1) both;
        }
        .animate-fade-in-info-x {
          animation: fadeInInfoX 0.7s cubic-bezier(.4,0,.2,1) both;
        }
        .animate-fade-in-list-title-x {
          animation: fadeInListTitleX 0.7s 0.6s cubic-bezier(.4,0,.2,1) both;
        }
        .animate-fade-in-list-x {
          animation: fadeInListX 0.7s cubic-bezier(.4,0,.2,1) both;
        }
        .animate-fade-in-cta-x {
          animation: fadeInCTAX 0.7s 1.2s cubic-bezier(.4,0,.2,1) both;
        }
      `}</style>
    </section>
  );
};

export default IntercesionSection;