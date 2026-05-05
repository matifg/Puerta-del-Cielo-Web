import React, { useState, useEffect, useRef } from "react";

const images = [
  { src: "/images/servicios/areaservicio1.jpeg" },
  { src: "/images/servicios/areaservicio2.jpeg" },
  { src: "/images/servicios/areaservicio3.jpeg" },
  { src: "/images/servicios/areaservicio4.jpeg" },
  { src: "/images/servicios/areaservicio5.jpeg" },
  { src: "/images/servicios/areaservicio6.jpeg" },
  { src: "/images/servicios/areaservicio7.jpeg" }
];

const AUTOPLAY_MS = 5000;

const ServicioComunidadSection: React.FC = () => {
  const [current, setCurrent] = useState(images.length);
  const [transition, setTransition] = useState(true);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = images.length;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, AUTOPLAY_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (current >= total * 2) {
      setTimeout(() => {
        setTransition(false);
        setCurrent(total);
      }, 900);

      setTimeout(() => {
        setTransition(true);
      }, 950);
    }
  }, [current, total]);

  const getTransform = () =>
    `translateX(calc(-${current * (100 / 3)}% + 33.333%))`;

  const transitionClass =
    transition
      ? "transition-transform duration-[1200ms] ease-[cubic-bezier(.77,0,.18,1)]"
      : "";

  return (
    <section className="bg-black py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-serif text-white text-center mb-2">
          Servicio a la Comunidad
        </h2>
        {/* Versículo bíblico */}
        <div className="text-center mt-2 mb-6">
          <div className="text-base font-serif text-white/70">
            “Hay más dicha en dar que en recibir.”
          </div>
          <div className="text-sm font-serif text-white/60 mt-1">
            — Hechos 20:35
          </div>
        </div>

        <div className="relative overflow-hidden bg-black">

          {/* fades */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black to-transparent z-10" />

          <div
            className={`flex ${transitionClass}`}
            style={{
              transform: getTransform(),
              willChange: "transform",
            }}
          >
            {[...images, ...images, ...images].map((img, i) => {
              const index = i % total;
              const centerIdx = current % total;

              const isCenter = index === centerIdx;
              const isLeft = index === (centerIdx - 1 + total) % total;
              const isRight = index === (centerIdx + 1) % total;

              // Overlay y filtros según posición
              const overlayGradient = isCenter
                ? "bg-gradient-to-t from-black/70 via-black/40 to-transparent"
                : "bg-gradient-to-t from-black/40 via-black/20 to-transparent";
              const filterStyle = isCenter
                ? "brightness(1.05) contrast(1.05) saturate(1.05)"
                : "brightness(0.95) contrast(1.02) saturate(0.95)";
              const boxShadow = isCenter
                ? "0 20px 50px rgba(0,0,0,0.35)"
                : "0 8px 20px rgba(0,0,0,0.2)";
              const scale = isCenter
                ? "scale-[1.05]"
                : isLeft || isRight
                ? "scale-[0.94]"
                : "scale-[0.88]";
              const opacity = isCenter
                ? "opacity-100"
                : isLeft || isRight
                ? "opacity-85"
                : "opacity-60";
              const zIndex = isCenter ? "z-10" : "z-0";

              return (
                <div
                  key={i}
                  className="w-1/3 px-1 flex-shrink-0 flex items-center justify-center"
                >
                  <div
                    className={`
                      relative overflow-hidden
                      transition-all duration-[1200ms] ease-[cubic-bezier(.77,0,.18,1)]
                      ${scale} ${opacity} ${zIndex}
                    `}
                    style={{
                      width: isCenter ? "100%" : "85%",
                      height: isCenter ? "52vh" : "38vh",
                      maxHeight: isCenter ? "500px" : "340px",
                      marginTop: isCenter ? "0" : "2rem",
                      marginBottom: isCenter ? "0" : "2rem",
                      borderRadius: isCenter ? "3rem" : "1.8rem",
                      transform: "none",
                    }}
                  >
                    <img
                      src={img.src}
                      className={`
                        w-full h-full object-cover
                        transition-all duration-[1200ms]
                        ${isCenter
                          ? "rounded-[3rem]"
                          : "rounded-[1.8rem]"}
                      `}
                      draggable={false}
                      alt=""
                      style={{
                        aspectRatio: "16/9",
                        display: "block",
                        filter: filterStyle,
                        boxShadow: boxShadow,
                        transform: isCenter ? "scale(1.05)" : "scale(1)",
                        transition:
                          "filter 1.2s cubic-bezier(.77,0,.18,1), box-shadow 1.2s cubic-bezier(.77,0,.18,1), transform 1.2s cubic-bezier(.77,0,.18,1)",
                      }}
                    />

                    {/* Overlay gradiente en todas las imágenes */}
                    <div
                      className={`absolute inset-0 pointer-events-none rounded-[${isCenter ? "3rem" : "1.8rem"}] ${overlayGradient}`}
                    />
                    {/* Eliminar texto sutil en la imagen central */}
                    {/* {isCenter && (
                      <div className="absolute left-6 bottom-5 text-white text-base md:text-lg font-normal opacity-90 drop-shadow-sm select-none pointer-events-none">
                        Ayudando a la comunidad
                      </div>
                    )} */}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setCurrent((prev) => prev - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 backdrop-blur-md text-white rounded-full hover:scale-110 transition z-20"
          >
            ‹
          </button>

          <button
            onClick={() => setCurrent((prev) => prev + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 backdrop-blur-md text-white rounded-full hover:scale-110 transition z-20"
          >
            ›
          </button>
        </div>

        {/* Animación personalizada */}
        <style>{`
          .animate-bounce-slow {
            animation: bounceDown 1.8s cubic-bezier(.4,0,.2,1) infinite;
          }
          @keyframes bounceDown {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(8px); }
          }
        `}</style>
      </div>
    </section>
  );
};

export default ServicioComunidadSection;  