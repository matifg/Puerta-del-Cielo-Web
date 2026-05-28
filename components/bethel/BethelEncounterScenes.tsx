import React from "react";
import { BETHEL_ENCOUNTER_SCROLL_ID } from "../../data/bethelScenes";
import { BethelMomentsGallery } from "./BethelMomentsGallery";
import { Reveal } from "./Reveal";

export function BethelEncounterScenes() {
  return (
    <section className="mb-16 md:mb-20" aria-labelledby="bethel-encuentro-heading">
      <Reveal>
        <div
          id={BETHEL_ENCOUNTER_SCROLL_ID}
          className="relative mb-10 scroll-mt-28 text-center sm:scroll-mt-32 md:mb-12"
        >
          <span
            data-pdc-scroll-focus
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-px w-px -translate-x-1/2 -translate-y-1/2"
            aria-hidden
          />
          <p className="mb-3 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            En el encuentro
          </p>
          <h3 id="bethel-encuentro-heading" className="font-serif text-2xl font-medium text-[#f4f1ec] md:text-3xl">
            Así se vive Bethel
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-sm text-zinc-500 md:text-base">
            Intimidad, adoración, la Palabra y un pueblo entero en doce horas de encuentro.
          </p>
        </div>
      </Reveal>

      <BethelMomentsGallery />
    </section>
  );
}
