import React from "react";
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
  icon: LucideIcon;
};

const areas: Area[] = [
  {
    title: "Alabanza y Adoración",
    description: "Ministros y músicos apasionados que con habilidad musical y sensibilidad espiritual, guían a otros en adoración y construyen ambientes para que la gloria de Dios se manifieste.",
    icon: Music,
  },
  {
    title: "Intercesión",
    description: "Hombres y mujeres que mediante la intercesión y la guerra espiritual, aceptan el llamado de colocarse en la brecha delante de Dios, a favor de las familias, la iglesia, la ciudad y la nación.",
    icon: HandHeart,
  },
  {
    title: "Artes Dinámicas",
    description: "Este ministerio utiliza la expresión artística como un medio para honrar a Dios y comunicar verdades espirituales. Corazones son impactados a través de la danza, el movimiento y distintas manifestaciones creativas.",
    icon: Palette,
  },
  {
    title: "Medios Audiovisuales",
    description: "Mediante la tecnología y la comunicación visual, esparcimos el mensaje del evangelio. Este ministerio integra redes sociales, producción audiovisual, proyección de letras y monitoreo de las pantallas interactivas.",
    icon: Video,
  },
  {
    title: "Audio y Sonido",
    description: "Manejo de sonido, mezcla y cuidado técnico de los equipos, son elementos necesarios para garantizar que el mensaje del evangelio llegue a cada persona de forma clara. Esta área trabaja con dedicación para crear un ambiente sonoro adecuado en cada servicio.",
    icon: Headphones,
  },
  {
    title: "Anfitriones",
    description: "Este equipo de servidores trabaja con entusiasmo para que cada persona que asiste a los servicios, tenga una experiencia agradable desde el momento que atraviesa la entrada. Brinda asistencia en el parqueo, durante el tiempo de reunión, y al momento de regresar a casa.",
    icon: Users,
  },
  {
    title: "Mantenimiento Integral",
    description: "Hombres y mujeres llenos de amor por la Casa, se dedican a realizar tareas de aseo, mantenimiento y refacciones edilicias semanalmente. Cuidan las instalaciones y se aseguran de que todo se encuentre en óptimas condiciones para que disfrutemos cada servicio.",
    icon: Wrench,
  },
  {
    title: "Área Social",
    description: "Esta área es un brazo extendido a la comunidad, que tiene el propósito de atender necesidades, brindar asistencia y compartir el mensaje de esperanza con los sectores más vulnerados de la sociedad.",
    icon: Heart,
  },
  {
    title: "Área Educativa",
    description: "El crecimiento y madurez integral de las personas mediante la enseñanza bíblica, es una de nuestras prioridades. El área educativa trabaja arduamente para brindar espacios de formación, entrenamiento y discipulado durante todo el año.",
    icon: BookOpen,
  },
  {
    title: "Juventud Inquebrantable",
    description: "Un grupo de jóvenes enfocado en vivir una fe activa y con propósito. Se caracteriza por buscar la presencia de Dios y aprender a reconocer Su voz en lo cotidiano. Es un espacio donde se fomenta el crecimiento en identidad, comunidad y dones.",
    icon: Flame,
  },
  {
    title: "Teens",
    description: "Un espacio dedicado a acompañar y fortalecer la vida espiritual de adolescentes entre 12 y 15 años. A través de la enseñanza bíblica, la formación en valores y la construcción de amistades sanas, buscamos guiarlos en el descubrimiento de su identidad en Dios y en el desarrollo de una fe firme que los acompañe en cada etapa de sus vidas.",
    icon: User,
  },
  {
    title: "Kids",
    description: "Abrazamos el compromiso de dejar un legado en las próximas generaciones. El ministerio Kids trabaja con pasión y dedicación todo el año, enseñando principios bíblicos mediante juegos y estrategias didácticas adaptadas a cada edad. Cada encuentro es una fiesta llena de alegría, colores y presencia de Dios.",
    icon: Baby,
  },
  {
    title: "Conexión",
    description: "Espacios de encuentro semanal para crecer en la fe, compartir la vida y caminar juntos. A través de la comunión, la enseñanza bíblica y la oración, se fortalecen los vínculos, se edifican las familias y se genera un ambiente cercano donde cada persona puede ser acompañada, escuchada y animada en su relación con Dios.",
    icon: Link2,
  },
];

const AreasServicioSection: React.FC = () => (
  <SectionWrapper>
    <h2 className="text-3xl font-bold text-amber-700 mb-10 font-serif text-center">
      Áreas de Servicio
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {areas.map((area, idx) => {
        const Icon = area.icon;
        return (
          <div
            key={area.title}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start hover:shadow-lg transition-all duration-200 animate-fade-in"
            style={{ animationDelay: `${idx * 60}ms` }}
          >
            <Icon className="w-8 h-8 text-amber-600 mb-2" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">{area.title}</h3>
            <p className="text-gray-600">{area.description}</p>
          </div>
        );
      })}
    </div>
    <style>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(24px);}
        to { opacity: 1; transform: translateY(0);}
      }
      .animate-fade-in {
        animation: fadeIn 0.7s both;
      }
    `}</style>
  </SectionWrapper>
);

export default AreasServicioSection;