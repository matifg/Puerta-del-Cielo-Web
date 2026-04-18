import React from "react";

const IglesiaEnCasaSection: React.FC = () => (
  <section
    className="relative w-full py-20 md:py-28 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "url('/images/iglesia-en-casa.webp')",
    }}
  >
    {/* Overlay más liviano */}
    <div className="absolute inset-0 bg-black/50" />

    <div className="relative z-10 w-full max-w-5xl mx-auto px-6">

      {/* HERO */}
      <div className="text-center space-y-4 mb-10">
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
          className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-full px-6 py-2.5 transition hover:scale-105"
        >
          Quiero ser parte
        </a>
      </div>

      {/* CARD */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl">

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
          <h3 className="text-amber-300 text-center mb-4">
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
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* 👇 CIERRE VISUAL */}
      <div className="h-16 md:h-24" />
    </div>
  </section>
);

export default IglesiaEnCasaSection;