import { Clock, Calendar } from "lucide-react";

const DiscipuladoSection = () => (
  <section
    className="relative w-full py-20 md:py-28 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "url('/images/discipulado.webp')",
    }}
  >
    {/* Overlay más liviano */}
    <div className="absolute inset-0 bg-black/50" />

    <div className="relative z-10 w-full max-w-5xl mx-auto px-6">

      {/* HERO */}
      <div className="text-center space-y-4 mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white font-serif">
          Discipulado
        </h2>

        <p className="text-lg text-gray-200 max-w-2xl mx-auto">
          Un proceso real de crecimiento espiritual donde cada persona es formada, acompañada y activada en su propósito.
        </p>
      </div>

      {/* CARD */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl">

        <p className="text-gray-100 text-center max-w-2xl mx-auto mb-6">
          A través de la Palabra, la oración y la comunidad, cada discípulo es equipado para vivir su llamado con claridad y propósito.
        </p>

        {/* INFO */}
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-6">
          
          <div className="bg-white/10 rounded-xl p-5 text-center">
            <Clock className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <p className="text-xs text-gray-300 uppercase">Duración</p>
            <p className="text-white font-semibold">2 años</p>
          </div>

          <div className="bg-white/10 rounded-xl p-5 text-center">
            <Calendar className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <p className="text-xs text-gray-300 uppercase">Modalidad</p>
            <p className="text-white font-semibold">Quincenal</p>
          </div>

        </div>

        {/* LISTA */}
        <div className="mb-6">
          <h3 className="text-amber-300 text-center mb-4">
            ¿Qué vas a vivir?
          </h3>

          <ul className="grid md:grid-cols-2 gap-3 text-gray-200 max-w-2xl mx-auto">
            {[
              "Enseñanza bíblica",
              "Formación espiritual",
              "Material actualizado",
              "Desarrollo de dones",
              "Comunidad real",
              "Espacios de consulta",
              "Hábitos saludables",
              "Ministración",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/docs/plan-academico.pdf"
            target="_blank"
            className="bg-amber-600 text-white px-6 py-2.5 rounded-full hover:bg-amber-700 transition"
          >
            Ver plan
          </a>

          <a
            href="https://wa.me/549123456789"
            target="_blank"
            className="border border-amber-400 text-amber-300 px-6 py-2.5 rounded-full hover:bg-white/10 transition"
          >
            + Info
          </a>
        </div>
      </div>

      {/* 👇 ESPACIO FINAL IMPORTANTE */}
      <div className="h-16 md:h-24" />
    </div>
  </section>
);

export default DiscipuladoSection;