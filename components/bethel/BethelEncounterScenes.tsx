import React from "react";
import { BETHEL_ENCOUNTER_SCROLL_ID } from "../../data/bethelScenes";
import { BethelMomentsGallery } from "./BethelMomentsGallery";
import { Reveal } from "./Reveal";

export function BethelEncounterScenes() {
  return (
    <section
      id={BETHEL_ENCOUNTER_SCROLL_ID}
      data-pdc-scroll-focus
      className="mb-10 scroll-mt-28 sm:scroll-mt-32 md:mb-16"
      aria-labelledby="bethel-encuentro-heading"
    >
      <Reveal priority>
        <div className="relative mb-6 text-center md:mb-8">
          <h3
            id="bethel-encuentro-heading"
            className="font-serif text-xl font-medium leading-snug text-[#f4f1ec] md:text-2xl desktop:text-3xl"
          >
            <span className="mb-2 block font-sans text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-zinc-500 notebook:mb-1">
              En el encuentro
            </span>
            Así se vive Bethel
          </h3>
        </div>
      </Reveal>

      <BethelMomentsGallery />
    </section>
  );
}
