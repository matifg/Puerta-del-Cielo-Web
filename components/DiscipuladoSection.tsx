import { Clock, Calendar } from "lucide-react";

const DiscipuladoSection = () => {
  return (
    <section
      className="relative w-full pt-10 pb-16 md:pt-16 md:pb-24 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/discipulado.webp')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        
        {/* HERO */}
        <div className="text-center space-y-4 mb-6 animate-fade-in-left">
          <h2 className="text-4xl md:text-5xl font-bold text-white font-serif">
            Discipulado
          </h2>

          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Un proceso real de crecimiento espiritual donde cada persona es formada, acompañada y activada en su propósito.
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl animate-fade-in-up">
          
          <p className="text-gray-100 text-center max-w-2xl mx-auto mb-6">
            A través de la Palabra, la oración y la comunidad, cada discípulo es equipado para vivir su llamado con claridad y propósito.
          </p>

          {/* INFO */}
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-6">
            
            <div className="bg-white/10 rounded-xl p-5 text-center">
              <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-xs text-gray-300 uppercase">Duración</p>
              <p className="text-white font-semibold">2 años</p>
            </div>

            <div className="bg-white/10 rounded-xl p-5 text-center">
              <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-xs text-gray-300 uppercase">Modalidad</p>
              <p className="text-white font-semibold">Quincenal</p>
            </div>

          </div>

          {/* LISTA */}
          <div className="mb-6">
            <h3 className="text-secondary text-center mb-4 font-semibold">
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
                <li
                  key={i}
                  className="flex items-start gap-2 animate-fade-in-list"
                  style={{ animationDelay: `${i * 80 + 300}ms` }}
                >
                  <span className="text-secondary">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "900ms" }}>
            
            {/* Ver programa */}
            <a
              href="/docs/escuela-discipulado.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-6 py-2.5 rounded-full hover:bg-secondary transition text-center"
            >
              Ver programa
            </a>

            {/* Descargar */}
            <a
              href="/docs/escuela-discipulado.pdf"
              download
              className="border border-white text-white px-6 py-2.5 rounded-full hover:bg-white/10 transition text-center"
            >
              Descargar
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/549123456789?text=Hola!%20Quiero%20info%20sobre%20Discipulado"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-secondary text-secondary px-6 py-2.5 rounded-full hover:bg-secondary/10 transition text-center"
            >
              Info por WhatsApp
            </a>

          </div>
        </div>

        {/* ESPACIO FINAL */}
        <div className="h-16 md:h-24" />
      </div>

      {/* Animaciones */}
      <style>{`
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-40px);}
          to { opacity: 1; transform: translateX(0);}
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @keyframes fadeInList {
          from { opacity: 0; transform: translateX(24px);}
          to { opacity: 1; transform: translateX(0);}
        }
        .animate-fade-in-left {
          animation: fadeInLeft 0.8s cubic-bezier(.4,0,.2,1) both;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.9s cubic-bezier(.4,0,.2,1) both;
        }
        .animate-fade-in-list {
          animation: fadeInList 0.7s cubic-bezier(.4,0,.2,1) both;
        }
      `}</style>
    </section>
  );
};

export default DiscipuladoSection;