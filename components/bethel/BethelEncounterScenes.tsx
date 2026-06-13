import React from "react";
import { BETHEL_ENCOUNTER_SCROLL_ID } from "../../data/bethelScenes";
import { BethelMomentsGallery } from "./BethelMomentsGallery";
import { Reveal } from "./Reveal";

export function BethelEncounterScenes() {
  return (
    <section
      id={BETHEL_ENCOUNTER_SCROLL_ID}
      data-pdc-scroll-focus
      className="mb-10 scroll-mt-28 sm:scroll-mt-32 md:mb-12 notebook:relative notebook:left-1/2 notebook:mb-0 notebook:flex notebook:h-[calc(100dvh-7.5rem)] notebook:min-h-0 notebook:max-h-[calc(100dvh-7.5rem)] notebook:w-screen notebook:max-w-[100vw] notebook:-translate-x-1/2 notebook:snap-start notebook:snap-always notebook:flex-col notebook:gap-3 notebook:px-4 notebook:pb-9 notebook:pt-1 desktop:relative desktop:left-1/2 desktop:mb-[4.5rem] desktop:block desktop:h-auto desktop:min-h-0 desktop:max-h-none desktop:w-screen desktop:max-w-[100vw] desktop:-translate-x-1/2 desktop:snap-align-none desktop:px-10 desktop:pb-5 desktop:pt-0"
      aria-labelledby="bethel-encuentro-heading"
    >
      <Reveal className="notebook:shrink-0" priority>
        <div className="relative mb-5 text-center md:mb-6 notebook:mb-0 desktop:mb-7">
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
