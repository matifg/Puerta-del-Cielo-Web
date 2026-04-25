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
  img: "https://i.pravatar.cc/300?img=12",
};

const team: Member[] = [
  { name: "OSCAR TERMINI", role: "PASTOR ASISTENTE", img: "https://i.pravatar.cc/300?img=21" },
  { name: "GUSTAVO BECERRO", role: "MINISTRO GENERAL", img: "https://i.pravatar.cc/300?img=22" },
  { name: "SILVIA TAIETI", role: "MINISTRO GENERAL", img: "https://i.pravatar.cc/300?img=23" },
  { name: "DAMIAN MARCORA", role: "MINISTRO GENERAL", img: "https://i.pravatar.cc/300?img=24" },
  { name: "PAOLA VIRRZI", role: "MINISTRO GENERAL", img: "https://i.pravatar.cc/300?img=25" },
  { name: "VERONICA MARTINEZ", role: "MINISTRO GENERAL", img: "https://i.pravatar.cc/300?img=26" },
  { name: "DEBORA BUGUEÑO", role: "MINISTRO GENERAL", img: "https://i.pravatar.cc/300?img=27" },
];

// HOOK
const useInView = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);

  return { ref, visible };
};

const EquipoMinisterialSection: React.FC = () => {
  const firstRow = team.slice(0, 4);
  const secondRow = team.slice(4);

  return (
    <SectionWrapper>

      {/* TITULO PASTORES */}
      <div className="text-center mb-12 mt-10">
        <h2 className="text-3xl md:text-4xl font-serif text-white">
          Pastores Generales
        </h2>
      </div>

      {/* HERO */}
      <div className="max-w-6xl mx-auto mb-32 px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div className="space-y-6 text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-serif text-white">
              {pastors.name}
            </h3>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="h-[3px] w-20 bg-primary rounded-full"></div>
              <div className="h-[2px] w-10 bg-secondary rounded-full"></div>
            </div>

            <p className="text-secondary uppercase tracking-widest text-sm font-medium">
              {pastors.role}
            </p>

            <p className="text-gray-300 leading-relaxed max-w-md">
              Son un matrimonio profundamente apasionado por la expansión del Reino
              de Dios. Más de 30 años formando personas y levantando líderes.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-secondary/20 blur-3xl rounded-full scale-110"></div>

              <img
                src={pastors.img}
                alt={pastors.name}
                className="relative w-64 h-64 md:w-72 md:h-72 object-cover rounded-full border-4 border-secondary shadow-2xl"
              />
            </div>
          </div>

        </div>
      </div>

      {/* SEPARADOR */}
      <div className="h-24 md:h-32"></div>

      {/* TITULO EQUIPO */}
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-serif text-white">
          Equipo Ministerial
        </h2>
        <p className="text-gray-400 mt-4">
          Personas comprometidas con servir, acompañar y transformar vidas.
        </p>
      </div>

      {/* GRID */}
      <div className="flex flex-col gap-24">

        {/* FILA 1 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-20 justify-items-center">
          {firstRow.map((person, i) => {
            const { ref, visible } = useInView();
            const direction = i < 2 ? "-translate-x-6" : "translate-x-6";

            return (
              <div
                key={person.name}
                ref={ref}
                className={`group flex flex-col items-center text-center
                transition-all duration-[3000ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                ${visible
                  ? "opacity-100 translate-x-0 translate-y-0 scale-100"
                  : `opacity-0 ${direction} translate-y-2 scale-95`
                }`}
                style={{ transitionDelay: `${i * 260}ms` }}
              >
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-secondary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition duration-500"></div>

                  <img
                    src={person.img}
                    alt={person.name}
                    className="w-36 h-36 rounded-full object-cover border-2 border-secondary
                    transition-all duration-500 ease-out
                    group-hover:scale-105 group-hover:shadow-2xl"
                  />
                </div>

                <div className="text-white font-semibold text-sm">
                  {person.name}
                </div>

                <div className="text-gray-400 text-xs mt-2">
                  {person.role}
                </div>
              </div>
            );
          })}
        </div>

        {/* FILA 2 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-20 justify-items-center max-w-5xl mx-auto">
          {secondRow.map((person, i) => {
            const { ref, visible } = useInView();

            return (
              <div
                key={person.name}
                ref={ref}
                className={`group flex flex-col items-center text-center
                transition-all duration-[3000ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                ${visible
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 scale-95"
                }`}
                style={{ transitionDelay: `${i * 300}ms` }}
              >
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition duration-500"></div>

                  <img
                    src={person.img}
                    alt={person.name}
                    className="w-36 h-36 rounded-full object-cover border-2 border-secondary
                    transition-all duration-500 ease-out
                    group-hover:scale-105 group-hover:shadow-2xl"
                  />
                </div>

                <div className="text-white font-semibold text-sm">
                  {person.name}
                </div>

                <div className="text-gray-400 text-xs mt-2">
                  {person.role}
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </SectionWrapper>
  );
};

export default EquipoMinisterialSection;