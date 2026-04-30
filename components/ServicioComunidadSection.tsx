import React, { useRef } from "react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80",
    text: "Entrega de alimentos",
  },
  {
    src: "https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&w=1200&q=80",
    text: "Voluntarios en acción",
  },
  {
    src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
    text: "Ayuda a familias",
  },
  {
    src: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=80",
    text: "Jornadas solidarias",
  },
];

const ServicioComunidadSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-black py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-3">
            Servicio a la Comunidad
          </h2>

          {/* líneas */}
          <div className="flex justify-center gap-2 mb-3">
            <div className="w-10 h-[2px] bg-primary rounded-full"></div>
            <div className="w-6 h-[2px] bg-secondary/70 rounded-full"></div>
          </div>

          <p className="text-gray-300 text-sm md:text-base max-w-md mx-auto">
            Acompañando y ayudando a quienes más lo necesitan.
          </p>
        </div>

        {/* CONTROLES */}
        <div className="flex justify-end gap-2 mb-3">
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 rounded-full border border-white/20 text-white text-sm hover:bg-white/10 transition"
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 rounded-full border border-white/20 text-white text-sm hover:bg-white/10 transition"
          >
            →
          </button>
        </div>

        {/* CARRUSEL WRAPPER CON FADE */}
        <div className="relative">

          {/* fade izquierda */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-black to-transparent z-10" />

          {/* fade derecha */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-black to-transparent z-10" />

          {/* CARRUSEL */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-2 no-scrollbar"
          >
            {images.map((img, i) => (
              <div
                key={i}
                className="min-w-[260px] md:min-w-[320px] h-[320px] rounded-xl overflow-hidden relative group flex-shrink-0"
              >
                <img
                  src={img.src}
                  alt=""
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 text-white text-xs md:text-sm">
                  {img.text}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ServicioComunidadSection;