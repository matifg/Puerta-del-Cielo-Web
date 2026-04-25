import React from "react";

const IglesiaEnCasaSection: React.FC = () => (
  <section
    className="relative w-full py-20 md:py-28 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "url('/images/iglesia-en-casa.webp')",
    }}
  >
    {/* Overlay */}
    <div className="absolute inset-0 bg-black/50" />

    <div className="relative z-10 w-full max-w-5xl mx-auto px-6">

      {/* HERO */}
      <div className="text-center space-y-5 mb-10 animate-fade-down">
        <h2 className="text-4xl md:text-5xl font-bold text-white font-serif">
          Iglesia en casa
        </h2>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto">
          Espacios de encuentro semanal para crecer en la fe, compartir la vida y caminar juntos.
        </p>
        <a
          href="https://forms.gle/2JVBZFS5Nw5BUXHGA"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary hover:bg-secondary text-white font-semibold rounded-full px-6 py-2.5 transition-all duration-300 hover:scale-105 shadow-lg"
        >
          Quiero ser parte
        </a>
      </div>

      {/* CARD */}
      <div className="bg-black/60 border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl shadow-black/40 backdrop-blur-sm animate-slide-in-up">

        {/* TEXTO */}
        <div className="space-y-4 text-gray-100 text-center max-w-2xl mx-auto mb-6">
          <p>
            <span className="font-semibold text-white">Grupos pequeños en casa</span> son la estrategia para crear puentes de conexión más estrechos y cercanos.
          </p>
          <p>
            Creemos que el Reino de Dios se construye en comunidad, fortaleciendo vínculos y relaciones saludables para caminar como una{" "}
            <span className="font-semibold text-white">familia de fe</span>.
          </p>
        </div>

        {/* LISTA */}
        <div>
          <h3 className="text-secondary text-center mb-5 font-medium tracking-[0.08em] uppercase">
            ¿Qué buscamos en cada encuentro?
          </h3>
          <ul className="grid md:grid-cols-2 gap-3 text-gray-200 max-w-2xl mx-auto">
            {[
              "Predicar la palabra de Dios de manera sencilla",
              "Encuentros fuera del templo",
              "Compartir historias y experiencias",
              "Escuchar necesidades",
              "Acompañamiento cercano",
              "Fortalecer el compañerismo",
              "Disfrutar actividades juntos",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 transition-all duration-300 hover:translate-x-1"
              >
                <span className="text-secondary mt-1">•</span>
                <span className="font-sans font-light">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="h-20 md:h-28" />
    </div>

    {/* Animaciones */}
    <style>{`
      @keyframes fadeDown {
        from {
          opacity: 0;
          transform: translateY(-30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(60px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fade-down {
        animation: fadeDown 0.8s ease-out;
      }
      .animate-slide-in-up {
        animation: slideInUp 0.9s ease-out;
      }
    `}</style>
  </section>
);

export default IglesiaEnCasaSection;