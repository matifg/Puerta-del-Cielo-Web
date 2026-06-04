import React from "react";
import { BETHEL_ENCOUNTER_SCROLL_ID } from "../../data/bethelScenes";
import { BethelMomentsGallery } from "./BethelMomentsGallery";
import { Reveal } from "./Reveal";

export function BethelEncounterScenes() {
  return (
    <section className="mb-12 md:mb-16" aria-labelledby="bethel-encuentro-heading">
      <Reveal>
        <div
          id={BETHEL_ENCOUNTER_SCROLL_ID}
          className="relative mb-5 scroll-mt-28 text-center sm:scroll-mt-32 md:mb-6"
        >
          <h3
            id="bethel-encuentro-heading"
            data-pdc-scroll-focus
            className="font-serif text-xl font-medium text-[#f4f1ec] md:text-2xl"
          >
            <span className="mb-2 block font-sans text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">
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
