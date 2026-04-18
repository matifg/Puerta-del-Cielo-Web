import React, { useRef, useEffect, useState } from 'react';

const team = [
  {
    name: 'OSCAR TERMINI',
    role: 'PASTOR ASISTENTE',
    img: 'https://i.pravatar.cc/300?img=21',
  },
  {
    name: 'GUSTAVO BECERRO',
    role: 'MINISTRO GENERAL',
    img: 'https://i.pravatar.cc/300?img=22',
  },
  {
    name: 'SILVIA TAIETI',
    role: 'MINISTRO GENERAL',
    img: 'https://i.pravatar.cc/300?img=23',
  },
  {
    name: 'DAMIAN MARCORA',
    role: 'MINISTRO GENERAL',
    img: 'https://i.pravatar.cc/300?img=24',
  },
  {
    name: 'PAOLA VIRRZI',
    role: 'MINISTRO GENERAL',
    img: 'https://i.pravatar.cc/300?img=25',
  },
  {
    name: 'VERONICA MARTINEZ',
    role: 'MINISTRO GENERAL',
    img: 'https://i.pravatar.cc/300?img=26',
  },
  {
    name: 'DEBORA BUGUEÑO',
    role: 'MINISTRO GENERAL',
    img: 'https://i.pravatar.cc/300?img=27',
  },
];

const useInView = (options = {}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      options
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return [ref, inView] as const;
};

export const Team: React.FC = () => (
  <section id="equipo" className="bg-white pt-0 pb-20">
    {/* Imagen de portada */}
    <div className="relative w-full h-[400px] mb-12">
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
        alt="Nuestro Equipo"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Nuestro Equipo</h2>
      </div>
    </div>

    {/* Pastores Generales */}
    <div className="max-w-5xl mx-auto px-4 mb-16">
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Foto grande de los pastores */}
        <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
          <img
            src="https://i.pravatar.cc/500?img=12"
            alt="Jorge y Gabriela Bugueño"
            className="rounded-2xl shadow-lg w-full max-w-md object-cover"
          />
        </div>
        {/* Texto */}
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl font-bold text-slate-800 mb-2 text-center md:text-left tracking-wide uppercase">PASTORES GENERALES</h3>
          <div className="text-3xl font-bold text-amber-700 mb-2 text-center md:text-left">JORGE Y GABRIELA<br />BUGUEÑO</div>
          <p className="text-slate-700 mb-2">
            Son un matrimonio profundamente apasionado por la expansión del Reino de Dios en la tierra. Juntos, llevan más de treinta años sirviendo con entrega y dedicación en la iglesia local y las naciones. Han dedicado gran parte de su vida a la formación de ministros y el pastoreo de personas.
          </p>
          <p className="text-slate-700">
            Actualmente viven en Baradero, Buenos Aires. Son padres de tres hijos y también abuelos.
          </p>
        </div>
      </div>
    </div>

    {/* Equipo Ministerial */}
    <div className="max-w-5xl mx-auto px-4">
      <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center tracking-wide uppercase">EQUIPO MINISTERIAL</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-12">
        {team.map((person, idx) => {
          const [ref, inView] = useInView({ threshold: 0.2 });
          return (
            <div
              key={person.name}
              ref={ref}
              className={`
                flex flex-col items-center text-center transition-all duration-700
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}
            >
              <img
                src={person.img}
                alt={person.name}
                className="w-28 h-28 rounded-full mb-4 grayscale hover:grayscale-0 object-cover transition duration-500"
              />
              <div className="font-semibold text-slate-800">{person.name}</div>
              <div className="text-amber-600 text-sm">{person.role}</div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);