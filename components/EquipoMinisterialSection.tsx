import React from "react";
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
  {
    name: "OSCAR TERMINI",
    role: "PASTOR ASISTENTE",
    img: "https://i.pravatar.cc/300?img=21",
  },
  {
    name: "GUSTAVO BECERRO",
    role: "MINISTRO GENERAL",
    img: "https://i.pravatar.cc/300?img=22",
  },
  {
    name: "SILVIA TAIETI",
    role: "MINISTRO GENERAL",
    img: "https://i.pravatar.cc/300?img=23",
  },
  {
    name: "DAMIAN MARCORA",
    role: "MINISTRO GENERAL",
    img: "https://i.pravatar.cc/300?img=24",
  },
  {
    name: "PAOLA VIRRZI",
    role: "MINISTRO GENERAL",
    img: "https://i.pravatar.cc/300?img=25",
  },
  {
    name: "VERONICA MARTINEZ",
    role: "MINISTRO GENERAL",
    img: "https://i.pravatar.cc/300?img=26",
  },
  {
    name: "DEBORA BUGUEÑO",
    role: "MINISTRO GENERAL",
    img: "https://i.pravatar.cc/300?img=27",
  },
];

const EquipoMinisterialSection: React.FC = () => (
  <SectionWrapper>
    {/* Pastores principales */}
    <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-16">
      <img
        src={pastors.img}
        alt={pastors.name}
        className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-amber-100"
      />
      <div className="text-center md:text-left max-w-xl">
        <h3 className="text-2xl font-bold text-amber-700 mb-1">{pastors.name}</h3>
        <div className="text-base font-semibold text-gray-500 mb-3">{pastors.role}</div>
        <p className="text-gray-700">
          Son un matrimonio profundamente apasionado por la expansión del Reino de Dios en la tierra. Juntos, llevan más de treinta años sirviendo con entrega y dedicación en la iglesia local y las naciones. Han dedicado gran parte de su vida a la formación de ministros y el pastoreo de personas. Actualmente viven en Baradero, Buenos Aires. Son padres de tres hijos y también abuelos.
        </p>
      </div>
    </div>

    {/* Equipo ministerial */}
    <h4 className="text-xl font-bold text-slate-800 mb-8 text-center tracking-wide uppercase">
      Equipo Ministerial
    </h4>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {team.map((person) => (
        <div
          key={person.name}
          className="bg-white rounded-xl flex flex-col items-center p-6 shadow-sm hover:shadow-lg transition-all duration-200 hover:scale-[1.03] animate-fade-in"
        >
          <img
            src={person.img}
            alt={person.name}
            className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-amber-100"
          />
          <div className="font-semibold text-slate-800 text-center">{person.name}</div>
          <div className="text-sm text-gray-500 text-center">{person.role}</div>
        </div>
      ))}
    </div>
    <style>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(24px);}
        to { opacity: 1; transform: translateY(0);}
      }
      .animate-fade-in {
        animation: fadeIn 0.7s;
      }
    `}</style>
  </SectionWrapper>
);

export default EquipoMinisterialSection;