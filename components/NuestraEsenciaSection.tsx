import React from "react";
import { Link } from "react-router-dom";
import { SITE_PHOTOS } from "../data/sitePhotos";
import { PdcEditorialPhoto } from "./PdcEditorialPhoto";

/**
 * En Inicio: la cruz como símbolo (sin repetir visión/misión; eso está en /quienes-somos/vision).
 * El hero no incluye este texto — no hay duplicación con el video.
 */
const NuestraEsenciaSection: React.FC = () => (
  <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 md:py-28">
    <div className="absolute inset-0 bg-gradient-to-br from-black via-[#020617] to-black opacity-90" aria-hidden />

    <div className="relative z-10 mx-auto max-w-3xl text-center">
      <h2
        data-pdc-scroll-focus
        className="font-serif text-3xl text-white md:text-5xl"
      >
        Nuestra Esencia
      </h2>
      <div className="mx-auto mt-4 h-[3px] w-20 rounded-full bg-secondary" />
      <p className="mx-auto mt-6 max-w-xl font-sans text-sm font-medium leading-relaxed text-zinc-400 md:text-base">
        Cristo en el centro. Todo lo que somos como iglesia nace de su amor.
      </p>

      <PdcEditorialPhoto photo={SITE_PHOTOS.cruzFe} className="mx-auto mt-12" priority />

      <p className="mt-10">
        <Link
          to="/quienes-somos/vision"
          className="pdc-btn-on-dark-accent inline-flex max-w-none px-8"
        >
          <span className="relative z-[1]">Visión y propósito</span>
        </Link>
      </p>
    </div>
  </section>
);

export default NuestraEsenciaSection;
