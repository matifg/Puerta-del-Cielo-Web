import React, { useState } from "react";
import {
  Music,
  HandHeart,
  Palette,
  Video,
  Headphones,
  Users,
  Wrench,
  Heart,
  BookOpen,
  Flame,
  User,
  Baby,
  Link2
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

type Area = {
  title: string;
  description: string;
  full: string;
  icon: LucideIcon;
};

const areas: Area[] = [
  {
    title: "Alabanza y Adoración",
    description: "Guían a otros en adoración.",
    full: `Ministros y músicos apasionados que
con habilidad musical y sensibilidad espiritual, guían a otros en adoración
y construyen ambientes para que la gloria de Dios se manifieste.`,
    icon: Music
  },
  {
    title: "Intercesión",
    description: "Se colocan en la brecha por otros.",
    full: `Hombres y mujeres que mediante la intercesión y la guerra espiritual,
aceptan el llamado de colocarse en la brecha delante de Dios,
a favor de las familias, la iglesia, la ciudad y la nación.`,
    icon: HandHeart
  },
  {
    title: "Artes Dinámicas",
    description: "Expresión artística espiritual.",
    full: `Este ministerio utiliza la expresión artística como un medio para honrar a Dios
y comunicar verdades espirituales. Corazones son impactados a través de la danza,
el movimiento y distintas manifestaciones creativas.`,
    icon: Palette
  },
  {
    title: "Medios Audiovisuales",
    description: "Comunicación visual del mensaje.",
    full: `Mediante la tecnología y la comunicación visual, esparcimos el mensaje del evangelio.
Este ministerio integra redes sociales, producción audiovisual,
proyección de letras y monitoreo de las pantallas interactivas.`,
    icon: Video
  },
  {
    title: "Audio y Sonido",
    description: "Calidad sonora en cada servicio.",
    full: `Manejo de sonido, mezcla y cuidado técnico de los equipos,
son elementos necesarios para garantizar que el mensaje del evangelio
llegue a cada persona de forma clara. Esta área trabaja con dedicación
para crear un ambiente sonoro adecuado en cada servicio.`,
    icon: Headphones
  },
  {
    title: "Anfitriones",
    description: "Reciben y acompañan.",
    full: `Este equipo de servidores trabaja con entusiasmo para que cada persona
que asiste a los servicios tenga una experiencia agradable desde el ingreso.
Brinda asistencia durante toda la reunión y al momento de regresar a casa.`,
    icon: Users
  },
  {
    title: "Mantenimiento Integral",
    description: "Cuidado de la casa.",
    full: `Hombres y mujeres llenos de amor por la Casa se dedican a tareas de aseo,
mantenimiento y refacciones. Cuidan las instalaciones y aseguran que todo esté
en óptimas condiciones para cada servicio.`,
    icon: Wrench
  },
  {
    title: "Área Social",
    description: "Ayuda a la comunidad.",
    full: `Esta área es un brazo extendido a la comunidad,
con el propósito de atender necesidades, brindar asistencia
y compartir el mensaje de esperanza con los sectores más vulnerables.`,
    icon: Heart
  },
  {
    title: "Área Educativa",
    description: "Formación y discipulado.",
    full: `El crecimiento y madurez integral mediante la enseñanza bíblica
es una de nuestras prioridades. Se brindan espacios de formación,
entrenamiento y discipulado durante todo el año.`,
    icon: BookOpen
  },
  {
    title: "Juventud Inquebrantable",
    description: "Fe con propósito.",
    full: `Un grupo de jóvenes enfocado en vivir una fe activa y con propósito.
Buscan la presencia de Dios y crecen en identidad, comunidad y dones.`,
    icon: Flame
  },
  {
    title: "Teens",
    description: "Adolescentes en crecimiento.",
    full: `Espacio para adolescentes entre 12 y 15 años.
A través de enseñanza bíblica y valores, se los guía en su identidad en Dios
y en el desarrollo de una fe firme.`,
    icon: User
  },
  {
    title: "Kids",
    description: "Niños con propósito.",
    full: `El ministerio Kids enseña principios bíblicos mediante juegos y dinámicas.
Cada encuentro es una experiencia llena de alegría, creatividad y presencia de Dios.`,
    icon: Baby
  },
  {
    title: "Conexión",
    description: "Comunidad y vínculos.",
    full: `Espacios semanales para crecer en la fe, compartir la vida y caminar juntos.
Se fortalecen vínculos, se edifican familias y cada persona es acompañada
en su relación con Dios.`,
    icon: Link2
  }
];

const AreasServicioSection: React.FC = () => {
  const [selected, setSelected] = useState<Area | null>(null);

  return (
    <SectionWrapper>

      <div className="-mt-12 md:-mt-16">

        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#020617] to-black opacity-80" />

        <div className="relative z-10">

          <h2 className="text-3xl md:text-5xl font-serif text-center text-white mb-12">
            Áreas de Servicio
            <div className="w-20 h-[3px] bg-secondary mx-auto mt-4 rounded-full"></div>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

            {areas.map((area) => {
              const Icon = area.icon;

              return (
                <div
                  key={area.title}
                  onClick={() => setSelected(area)}
                  className="
                  group cursor-pointer
                  relative rounded-2xl p-7
                  bg-white/5 backdrop-blur-xl
                  border border-white/10 overflow-hidden

                  transition-all duration-700
                  hover:scale-[1.03]
                  hover:-translate-y-2
                  hover:shadow-[0_10px_40px_rgba(64,194,222,0.25)]
                  "
                >

                  <div className="
                    absolute inset-0
                    bg-gradient-to-br from-primary/10 to-secondary/10
                    opacity-0 group-hover:opacity-100
                    transition duration-700
                  " />

                  <div className="
                    relative z-10 flex items-center justify-center
                    w-14 h-14 rounded-full bg-white/10 mb-5
                    group-hover:scale-110 transition
                  ">
                    <Icon className="w-7 h-7 text-white group-hover:text-secondary transition" />
                  </div>

                  <h3 className="text-xl font-serif text-white mb-2 group-hover:text-secondary transition">
                    {area.title}
                  </h3>

                  <p className="text-gray-300 text-sm">
                    {area.description}
                  </p>

                  {/* UX MEJORADA */}
                  <div className="mt-4 text-xs text-gray-500 group-hover:text-secondary transition">
                    Click para saber mas...
                  </div>

                  <div className="
                    absolute bottom-0 left-0
                    h-[2px] w-0
                    bg-gradient-to-r from-primary to-secondary
                    group-hover:w-full
                    transition-all duration-700
                  " />

                </div>
              );
            })}

          </div>

        </div>

      </div>

      {selected && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          {/* Overlay animado */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-modal-overlay"
            onClick={() => setSelected(null)}
          />

          {/* Card principal */}
          <div className="
            relative z-10
            bg-gradient-to-br from-[#1a223a] via-[#22345a] to-[#1a223a]
            bg-opacity-95
            border border-white/20
            rounded-3xl p-8 md:p-14 shadow-2xl max-w-xl w-full mx-auto
            animate-modal-card
            flex flex-col items-center
            overflow-hidden
            backdrop-blur-xl
          "
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-serif text-white mb-4">
              {selected.title}
            </h3>

            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {selected.full}
            </p>

            <button
              onClick={() => setSelected(null)}
              className="mt-6 px-6 py-2 rounded-full bg-primary hover:bg-secondary transition text-white"
            >
              Cerrar
            </button>
          </div>

          {/* Animaciones PRO */}
          <style>{`
            @keyframes modalOverlay {
              0% { opacity: 0; }
              100% { opacity: 1; }
            }
            .animate-modal-overlay {
              animation: modalOverlay 0.5s cubic-bezier(.4,0,.2,1) both;
            }
            @keyframes modalCard {
              0% {
                opacity: 0.92;
                filter: blur(6px);
                transform: scale(0.98) translateY(24px);
              }
              100% {
                opacity: 1;
                filter: blur(0);
                transform: scale(1) translateY(0);
              }
            }
            .animate-modal-card {
              animation: modalCard 0.7s cubic-bezier(.4,0,.2,1) both;
            }
          `}</style>
        </div>
      )}

    </SectionWrapper>
  );
};

export default AreasServicioSection;