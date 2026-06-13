import React from "react";

import { BETHEL_ENCOUNTER_SCROLL_ID } from "../../data/bethelScenes";

import { BethelMomentsGallery } from "./BethelMomentsGallery";

import { Reveal } from "./Reveal";



export function BethelEncounterScenes() {

  return (

    <section

      id={BETHEL_ENCOUNTER_SCROLL_ID}

      data-pdc-scroll-focus

      className="mb-10 scroll-mt-28 sm:scroll-mt-32 md:mb-12 lg:max-2xl:relative lg:max-2xl:left-1/2 lg:max-2xl:mb-0 lg:max-2xl:flex lg:max-2xl:h-[calc(100dvh-7rem)] lg:max-2xl:min-h-[calc(100dvh-7rem)] lg:max-2xl:max-h-[calc(100dvh-7rem)] lg:max-2xl:w-screen lg:max-2xl:max-w-[100vw] lg:max-2xl:-translate-x-1/2 lg:max-2xl:snap-start lg:max-2xl:snap-always lg:max-2xl:flex-col lg:max-2xl:gap-2.5 lg:max-2xl:px-4 lg:max-2xl:pb-3 lg:max-2xl:pt-1 2xl:relative 2xl:left-1/2 2xl:mb-20 2xl:block 2xl:h-auto 2xl:min-h-0 2xl:max-h-none 2xl:w-screen 2xl:max-w-[100vw] 2xl:-translate-x-1/2 2xl:snap-align-none 2xl:px-10 2xl:pb-0 2xl:pt-0"

      aria-labelledby="bethel-encuentro-heading"

    >

      <Reveal className="lg:max-2xl:shrink-0">

        <div className="relative mb-5 text-center md:mb-6 lg:max-2xl:mb-0 2xl:mb-6">

          <h3

            id="bethel-encuentro-heading"

            className="font-serif text-xl font-medium text-[#f4f1ec] md:text-2xl lg:max-2xl:text-lg lg:max-2xl:leading-tight 2xl:text-3xl"

          >

            <span className="mb-2 block font-sans text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-zinc-500 lg:max-2xl:mb-0.5 lg:max-2xl:text-[0.58rem]">

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


