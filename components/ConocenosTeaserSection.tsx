import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Church } from "lucide-react";
import { VISION_STATEMENT } from "../data/vision";
import { pdcPageInnerClass } from "./PdcSectionHeader";

const CONOCENOS_LINKS = [
  { to: "/quienes-somos/vision", label: "Visión" },
  { to: "/quienes-somos/equipo-ministerial", label: "Equipo ministerial" },
  { to: "/quienes-somos/areas-servicio", label: "Áreas de servicio" },
] as const;

const linkClass =
  "group inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 font-sans text-sm font-medium text-white/88 transition hover:border-secondary/30 hover:bg-white/[0.06] hover:text-white";

const ConocenosTeaserSection: React.FC = () => (
  <section
    id="home-conocenos"
    className="scroll-mt-24 border-t border-white/[0.06] bg-[#030508] py-12 sm:scroll-mt-28 sm:py-14 md:py-16"
    aria-labelledby="home-conocenos-heading"
  >
    <div className={pdcPageInnerClass}>
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-3 inline-flex items-center gap-2 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-secondary/90">
          <Church className="h-3.5 w-3.5" aria-hidden />
          Quiénes somos
        </div>
        <h2
          id="home-conocenos-heading"
          className="font-serif text-2xl font-medium tracking-tight text-[#faf8f4] md:text-3xl"
        >
          Conocenos
        </h2>
        <p className="mx-auto mt-4 font-serif text-base leading-relaxed text-[#ebe7df] md:text-lg">
          {VISION_STATEMENT}
        </p>
      </div>

      <ul className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:max-w-xl sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
        {CONOCENOS_LINKS.map(({ to, label }) => (
          <li key={to} className="sm:flex-1 sm:min-w-[9rem]">
            <Link to={to} className={`${linkClass} w-full justify-center sm:justify-between`}>
              <span>{label}</span>
              <ChevronRight
                className="h-4 w-4 shrink-0 text-secondary/70 transition group-hover:translate-x-0.5 group-hover:text-secondary"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default ConocenosTeaserSection;
