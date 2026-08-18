import React from "react";
import { Clock, MapPin } from "lucide-react";
import { direccion, whatsappUrl } from "../data/contacto";
import { reunionGeneralResumenCorto } from "../data/horariosWeb";
import { pdcPageInnerClass } from "./PdcSectionHeader";

const mapsHref = `https://www.google.com/maps?q=${direccion.mapsQuery}`;

const PlanificaTuVisitaSection: React.FC = () => (
  <section
    id="home-planifica-visita"
    className="scroll-mt-24 border-t border-white/[0.06] bg-[#030508] py-12 sm:scroll-mt-28 sm:py-14 md:py-16"
    aria-labelledby="planifica-visita-heading"
  >
    <div className={pdcPageInnerClass}>
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="planifica-visita-heading"
          className="font-serif text-2xl font-medium tracking-tight text-[#faf8f4] md:text-3xl"
        >
          Planificá tu visita
        </h2>
        <p className="mx-auto mt-3 max-w-md font-sans text-sm leading-relaxed text-white/75 md:text-[0.95rem]">
          Te esperamos en nuestra reunión general. Si es tu primera vez, encontrá un lugar donde
          puedas conocer nuestra comunidad y compartir juntos.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-lg space-y-4">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-center">
          <div className="mb-2 flex items-center justify-center gap-2 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-secondary/90">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            Reunión general
          </div>
          <p className="font-serif text-lg text-[#f5f2ec] md:text-xl">{reunionGeneralResumenCorto()}</p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-center">
          <div className="mb-2 flex items-center justify-center gap-2 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-secondary/90">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            Ubicación
          </div>
          <p className="font-sans text-sm font-medium text-[#f5f2ec]">Baradero, Buenos Aires</p>
          <address className="mt-1 not-italic font-sans text-sm leading-relaxed text-white/75">
            {direccion.lineas.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>

        <p className="px-2 text-center font-sans text-sm leading-relaxed text-white/70">
          Un encuentro para compartir, escuchar la Palabra y vivir la fe en comunidad.
        </p>

        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:justify-center sm:gap-4">
          <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="pdc-btn-glass max-w-none">
            <span className="relative z-[1]">Cómo llegar</span>
          </a>
          <a
            href={whatsappUrl("Hola! Quiero planificar mi visita a Puerta del Cielo.")}
            target="_blank"
            rel="noopener noreferrer"
            className="pdc-btn-on-dark-accent max-w-none"
          >
            <span className="relative z-[1]">Contactarnos</span>
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default PlanificaTuVisitaSection;
