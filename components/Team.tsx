import React, { useRef, useEffect, useState } from 'react';

const team = [
  { name: 'Nombre 1', role: 'Pastor Principal', img: 'https://i.pravatar.cc/300?img=1' },
  { name: 'Nombre 2', role: 'Pastora', img: 'https://i.pravatar.cc/300?img=2' },
  { name: 'Nombre 3', role: 'Líder de Jóvenes', img: 'https://i.pravatar.cc/300?img=3' },
  { name: 'Nombre 4', role: 'Líder de Alabanza', img: 'https://i.pravatar.cc/300?img=4' },
  { name: 'Nombre 5', role: 'Líder de Niños', img: 'https://i.pravatar.cc/300?img=5' },
  { name: 'Nombre 6', role: 'Líder de Oración', img: 'https://i.pravatar.cc/300?img=6' },
  { name: 'Nombre 7', role: 'Consejería', img: 'https://i.pravatar.cc/300?img=7' },
  { name: 'Nombre 8', role: 'Discipulado', img: 'https://i.pravatar.cc/300?img=8' },
  { name: 'Nombre 9', role: 'Música', img: 'https://i.pravatar.cc/300?img=9' },
  { name: 'Nombre 10', role: 'Comunicación', img: 'https://i.pravatar.cc/300?img=10' },
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

    {/* Dirección General */}
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
          <h3 className="text-3xl font-bold text-slate-800 mb-2">Jorge y Gabriela Bugueño</h3>
          <div className="text-amber-600 font-semibold mb-4 text-lg">Dirección General</div>
          <p className="text-slate-700 mb-2">
            Jorge y Gabriela Bugueño son los pastores y directores de la iglesia Puerta del Cielo en la ciudad de
            Baradero. Su ministerio está enfocado en acompañar a las personas en su crecimiento espiritual,
            fortaleciendo la fe, la familia y la vida en comunidad.
          </p>
          <p className="text-slate-700 mb-2">
            A lo largo de los años han dedicado su vida a servir a Dios y a la iglesia, guiando a la congregación con
            una visión centrada en el amor de Cristo, la enseñanza de la Palabra y el desarrollo de nuevos líderes.
          </p>
          <p className="text-slate-700">
            Su deseo es ver a cada persona descubrir su propósito en Dios y vivir una vida transformada por Su
            presencia.
          </p>
        </div>
      </div>
    </div>

    {/* Staff Pastoral */}
    <div className="max-w-5xl mx-auto px-4">
      <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">Staff Pastoral</h3>
      <p className="text-center text-slate-600 max-w-2xl mx-auto mb-10">
        Nuestro equipo pastoral está comprometido con servir a Dios y acompañar a cada persona en su crecimiento espiritual.
        Creemos en una iglesia cercana, donde cada persona pueda encontrar fe, comunidad y propósito. Nuestro deseo es caminar juntos, aprender de la Palabra y ver vidas transformadas por el amor de Jesús.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-x-10 gap-y-12">
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