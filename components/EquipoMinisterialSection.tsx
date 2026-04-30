import React, { useEffect, useRef, useState } from "react";
  import SectionWrapper from "./SectionWrapper";

  type Member = {
    name: string;
    role: string;
    img: string;
  };

  const pastors: Member = {
    name: "JORGE Y GABRIELA BUGUEÑO",
    role: "PASTORES GENERALES",
    img: "/images/ministros/jorge-gabriela.jpg",
  };

  const team: Member[] = [
    { name: "OSCAR TERMINI", role: "PASTOR ASISTENTE", img: "https://i.pravatar.cc/300?img=21" },
    { name: "GUSTAVO BECERRO", role: "MINISTRO GENERAL", img: "/images/ministros/gustavo-becerro.jpg" },
    { name: "SILVIA TAIETI", role: "MINISTRO GENERAL", img: "/images/ministros/silvia-taieti.jpg" },
    { name: "DAMIAN MARCORA", role: "MINISTRO GENERAL", img: "/images/ministros/damian-marcora.jpg" },
    { name: "PAOLA VIRRZI", role: "MINISTRO GENERAL", img: "/images/ministros/paola-virrzi.jpg" },
    { name: "VERONICA MARTINEZ", role: "MINISTRO GENERAL", img: "/images/ministros/veronica-martinez.jpg" },
    { name: "DEBORA BUGUEÑO", role: "MINISTRO GENERAL", img: "/images/ministros/debora-bugueño.jpg" },
  ];

  const useInView = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => setVisible(entry.isIntersecting),
        { threshold: 0.3 }
      );

      if (ref.current) observer.observe(ref.current);
      return () => ref.current && observer.unobserve(ref.current);
    }, []);

    return { ref, visible };
  };

  const EquipoMinisterialSection: React.FC = () => {
    const firstRow = team.slice(0, 4);
    const secondRow = team.slice(4);

    const { ref, visible } = useInView();
    const [hovered, setHovered] = useState<string | null>(null);

    return (
      <SectionWrapper>

        {/* 🔥 SUBIMOS TODO (FIX ESPACIO) */}
        <div className="-mt-20 md:-mt-24">

          {/* TITULO */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif text-white">
              Pastores Generales
            </h2>
          </div>

          {/* HERO PASTORES */}
          <div className="max-w-6xl mx-auto mb-24 px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* TEXTO */}
              <div className="space-y-6 text-center md:text-left">
                <h3 className="text-4xl md:text-5xl font-serif text-white leading-tight">
                  {pastors.name}
                </h3>

                {/* LÍNEAS DECORATIVAS MEJORADAS */}
                <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start mt-2">
                  <div className="h-[2px] w-16 bg-primary rounded-full"></div>
                  <div className="h-[2px] w-10 bg-primary/70 rounded-full"></div>
                  <div className="h-[2px] w-6 bg-secondary/60 rounded-full"></div>
                </div>
                <div className="w-32 md:w-40 h-[2px] bg-gradient-to-r from-primary via-secondary to-transparent rounded-full mt-2 mx-auto md:mx-0"></div>

                <p className="text-secondary uppercase tracking-widest text-sm">
                  {pastors.role}
                </p>

                <p className="text-gray-300 leading-relaxed max-w-md">
                  Son un matrimonio profundamente apasionado por la expansión del Reino
                  de Dios. Más de 30 años formando personas y levantando líderes.
                </p>
              </div>

              {/* 🔥 IMAGEN PRO (NUEVO DISEÑO) */}
              <div className="flex justify-center md:justify-start">
                <div className="relative group flex flex-col items-center">
                  {/* Glow */}
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    <div className="w-96 h-96 rounded-full bg-secondary/30 blur-2xl opacity-70 group-hover:opacity-100 transition duration-700"></div>
                  </div>
                  <img
                    src={pastors.img}
                    alt={pastors.name}
                    className="
        relative
        w-80 h-80
        md:w-96 md:h-96
        rounded-full
        object-cover
        border-4 border-white/20
        shadow-2xl
        bg-black/10
        transition-all duration-700
        group-hover:scale-105
      "
                    style={{
                      objectPosition: "center 30%",
                    }}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* TITULO EQUIPO */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-white">
              Equipo Ministerial
            </h2>
            {/* LÍNEAS DECORATIVAS AJUSTADAS */}
            <div className="flex justify-center items-center gap-3 mt-4">
              <div className="h-[2px] w-20 bg-white/60 rounded-full"></div>
              <div className="h-[2px] w-12 bg-primary/80 rounded-full"></div>
              <div className="h-[2px] w-8 bg-secondary/80 rounded-full"></div>
            </div>
            <p className="text-primary/80 mt-4">
              Personas comprometidas con servir, acompañar y transformar vidas.
            </p>
          </div>

          {/* GRID */}
          <div ref={ref} className="flex flex-col gap-24">

            {/* FILA 1 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-20 justify-items-center">
              {firstRow.map((person, i) => (
                <div
                  key={person.name}
                  onMouseEnter={() => setHovered(person.name)}
                  onMouseLeave={() => setHovered(null)}
                  className={`group flex flex-col items-center text-center
                  transition-all duration-[2000ms]
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
                  ${hovered && hovered !== person.name ? "opacity-40 scale-95" : "opacity-100"}
                  `}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >

                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-secondary/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition duration-700"></div>

                    <img
                      src={person.img}
                      alt={person.name}
                      className="
                      w-32 h-32
                      rounded-full
                      object-cover
                      border-2 border-secondary
                      transition-all duration-500
                      grayscale
                      group-hover:grayscale-0
                      group-hover:scale-110
                      "
                    />
                  </div>

                  <div className="text-white font-semibold text-sm">
                    {person.name}
                  </div>

                  <div className="text-gray-400 text-xs mt-2">
                    {person.role}
                  </div>
                </div>
              ))}
            </div>

            {/* FILA 2 */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-20 justify-items-center max-w-5xl mx-auto">
              {secondRow.map((person, i) => (
                <div
                  key={person.name}
                  onMouseEnter={() => setHovered(person.name)}
                  onMouseLeave={() => setHovered(null)}
                  className={`group flex flex-col items-center text-center
                  transition-all duration-[2000ms]
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
                  ${hovered && hovered !== person.name ? "opacity-40 scale-95" : "opacity-100"}
                  `}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >

                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition duration-700"></div>

                    <img
                      src={person.img}
                      alt={person.name}
                      className="
                      w-32 h-32
                      rounded-full
                      object-cover
                      border-2 border-secondary
                      transition-all duration-500
                      grayscale
                      group-hover:grayscale-0
                      group-hover:scale-110
                      "
                    />
                  </div>

                  <div className="text-white font-semibold text-sm">
                    {person.name}
                  </div>

                  <div className="text-gray-400 text-xs mt-2">
                    {person.role}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </SectionWrapper>
    );
  };

  export default EquipoMinisterialSection;