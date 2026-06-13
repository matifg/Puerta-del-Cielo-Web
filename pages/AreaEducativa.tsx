import { Link } from "react-router-dom";
import { BookOpen, ChevronRight, Crown, HandHeart, Palette } from "lucide-react";
import { Reveal } from "../components/bethel/Reveal";
import { PdcPageShell } from "../components/PdcPageShell";
import {
  PdcSectionHeader,
  pdcPageInnerWithHeroComfort,
  pdcPageIntroHeaderClass,
} from "../components/PdcSectionHeader";

const ESCUELAS = [
  {
    to: "/area-educativa/discipulado",
    title: "Discipulado",
    desc: "Formación integral y acompañamiento en el camino de fe.",
    icon: BookOpen,
  },
  {
    to: "/area-educativa/danza-artes",
    title: "Danza y Artes Dinámicas",
    desc: "Creatividad que adora: movimiento y expresión espiritual.",
    icon: Palette,
  },
  {
    to: "/area-educativa/intercesion",
    title: "Intercesión · EIGE",
    desc: "Entrenamiento en intercesión y guerra espiritual.",
    icon: HandHeart,
  },
  {
    to: "/area-educativa/liderazgo",
    title: "Escuela de Liderazgo",
    desc: "Carácter, visión y servicio desde la Escritura.",
    icon: Crown,
  },
] as const;

const cardClass =
  "group flex items-start gap-4 rounded-2xl border border-white/[0.1] bg-white/[0.04] p-5 transition duration-300 hover:border-secondary/35 hover:bg-white/[0.07] md:p-6";

const AreaEducativa = () => (
  <PdcPageShell aria-labelledby="area-educativa-heading">
    <div className={pdcPageInnerWithHeroComfort}>
      <Reveal>
        <header className={pdcPageIntroHeaderClass}>
          <PdcSectionHeader
            headingId="area-educativa-heading"
            eyebrow="Formación"
            eyebrowIcon={BookOpen}
            title="Área"
            titleAccent="educativa"
            subtitle="Escuelas y espacios de crecimiento. Elegí un camino y entrá a la página completa."
            showSegmentBar
          />
        </header>
      </Reveal>

      <ul className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 sm:gap-5" role="list">
        {ESCUELAS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <li key={item.to}>
              <Reveal delayMs={40 + idx * 50}>
                <Link to={item.to} className={`${cardClass} block no-underline`}>
                  <span className="mt-0.5 inline-flex shrink-0 rounded-xl border border-white/12 bg-black/25 p-2.5 text-secondary group-hover:border-secondary/30 group-hover:bg-secondary/10">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-2 font-serif text-lg font-medium text-[#faf8f4] md:text-xl">
                      {item.title}
                      <ChevronRight
                        className="mt-1 h-4 w-4 shrink-0 text-secondary/70 transition group-hover:translate-x-0.5 group-hover:text-secondary"
                        aria-hidden
                      />
                    </span>
                    <span className="mt-1.5 block font-sans text-sm leading-snug text-white/82">
                      {item.desc}
                    </span>
                  </span>
                </Link>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </div>
  </PdcPageShell>
);

export default AreaEducativa;
