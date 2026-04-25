import React from "react";

const BethelSection = () => (
  <section
    className="relative w-full pt-16 pb-20 md:pt-24 md:pb-28 bg-cover bg-center bg-no-repeat overflow-hidden"
    style={{
      backgroundImage: "url('/images/bethel.webp')",
    }}
  >
    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

    <div className="relative z-10 w-full max-w-4xl mx-auto px-6">

      {/* HERO */}
      <div className="text-center space-y-6 mb-14 animate-fade-blur">
        <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
          Bethel
        </h2>

        <p className="text-lg text-gray-200 font-light leading-relaxed">
          “Construyendo como comunidad una morada donde Dios pueda reposar,
          de manera que la manifestación tangible de su gloria transforme
          ambientes, lugares y personas”
        </p>
      </div>

      {/* CARD PRINCIPAL */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-10 shadow-2xl space-y-8 animate-fade-scale">

        {/* TEXTO */}
        <div className="space-y-6 text-gray-200 text-base md:text-lg leading-relaxed font-light">

          <p>
            Iniciado en Enero del 2025, Bethel es el fruto de un recorrido ministerial de más de 10 años.
            Luego de distintos entrenamientos en adoración y la formación de escuelas ministeriales,
            Dios nos desafió a levantar altares de adoración continua.
          </p>

          <p>
            Este llamado comenzó a arder en nuestro corazón y fue confirmado mediante una profecía:
          </p>

        </div>

        {/* CITA DESTACADA */}
        <div className="bg-gradient-to-r from-secondary/20 via-white/10 to-primary/10 border-l-4 border-secondary rounded-xl px-6 py-6 text-center animate-fade-quote">
          <p className="italic text-xl text-secondary font-serif leading-relaxed">
            “En aquel día yo levantaré el tabernáculo caído de David…”
          </p>
          <span className="block text-gray-300 mt-3 text-sm">Amós 9:11</span>
        </div>

        {/* TEXTO CONTINUACIÓN */}
        <div className="space-y-6 text-gray-200 text-base md:text-lg leading-relaxed font-light">

          <p>
            Hace miles de años Dios reveló a David la atmósfera donde Él habita.
            Siglos después, esta misma visión fue mostrada nuevamente: un trono,
            seres vivientes, adoración constante.
          </p>

          <p>
            Hoy estamos viendo el cumplimiento de esa palabra. En toda la tierra
            se levantan casas de oración, jornadas de búsqueda y corazones que no descansan
            hasta construir una morada para Dios.
          </p>

          <p>
            Aunque Dios no habita en templos hechos por manos humanas, Él decide reposar
            donde es honrado y adorado.
          </p>

          <p>
            Como iglesia, respondemos a este llamado levantando altares de 12 horas consecutivas,
            donde grandes y pequeños se unen con un solo propósito:
          </p>

        </div>

        {/* BLOQUE FINAL DESTACADO */}
        <div className="text-center space-y-4 animate-fade-up">
          <p className="text-lg md:text-xl text-white font-medium">
            Adoración, intercesión e intimidad profunda
          </p>

          <p className="text-gray-300 font-light">
            son la atmósfera del cielo, el lugar donde Dios habita.
          </p>

          <p className="text-secondary font-semibold text-lg mt-4">
            ¡Que sea en la tierra, como es en el cielo!
          </p>
        </div>

      </div>

      {/* ESPACIO FINAL */}
      <div className="h-16 md:h-24" />

    </div>

    {/* ANIMACIONES SUAVES */}
    <style>{`
      @keyframes fadeBlur {
        from { opacity: 0; filter: blur(12px);}
        to { opacity: 1; filter: blur(0);}
      }

      @keyframes fadeScale {
        from { opacity: 0; transform: scale(0.97);}
        to { opacity: 1; transform: scale(1);}
      }

      @keyframes fadeQuote {
        from { opacity: 0; transform: translateY(20px); filter: blur(6px);}
        to { opacity: 1; transform: translateY(0); filter: blur(0);}
      }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(30px);}
        to { opacity: 1; transform: translateY(0);}
      }

      .animate-fade-blur {
        animation: fadeBlur 1.2s ease both;
      }

      .animate-fade-scale {
        animation: fadeScale 1s 0.2s ease both;
      }

      .animate-fade-quote {
        animation: fadeQuote 1s 0.5s ease both;
      }

      .animate-fade-up {
        animation: fadeUp 1s 0.8s ease both;
      }
    `}</style>
  </section>
);

export default BethelSection;