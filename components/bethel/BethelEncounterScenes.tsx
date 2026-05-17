import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BETHEL_ENCOUNTER_SCENES,
  BETHEL_ENCOUNTER_SCROLL_ID,
  type BethelEncounterScene,
} from "../../data/bethelScenes";
import { Reveal } from "./Reveal";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const blockVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

const photoFrameOuter =
  "rounded-2xl bg-[#05070a] shadow-[0_40px_100px_-28px_rgba(0,0,0,0.82),0_18px_40px_-16px_rgba(0,0,0,0.55),inset_0_0_0_1px_rgba(255,255,255,0.045)] md:rounded-3xl";
const photoFrameInner = "overflow-hidden rounded-[0.9rem] md:rounded-[1.35rem]";
const imgZoomClass =
  "origin-center transition-[transform,filter] duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:scale-[1.06] group-hover:brightness-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-hover:brightness-100";

function BethelSceneBlock({ scene, index }: { scene: BethelEncounterScene; index: number }) {
  const reduceMotion = useReducedMotion() ?? false;
  const anchorId = scene.scrollAnchor ? BETHEL_ENCOUNTER_SCROLL_ID : undefined;

  return (
    <motion.article
      id={anchorId ?? scene.id}
      aria-labelledby={`${scene.id}-title`}
      className={`relative scroll-mt-32 sm:scroll-mt-36 ${
        index > 0 ? "mt-14 md:mt-20" : ""
      } grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-14`}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "show"}
      viewport={{ once: true, margin: "-8% 0px" }}
      variants={blockVariants}
    >
      <span
        data-pdc-scroll-focus
        className="pointer-events-none absolute left-1/2 top-[46%] z-0 h-px w-px -translate-x-1/2"
        aria-hidden
      />
      <motion.div
        className={`group ${photoFrameOuter} ${scene.imageRight ? "lg:order-2" : ""}`}
        variants={blockVariants}
      >
        <motion.div className={photoFrameInner}>
          <img
            src={scene.src}
            alt={scene.alt}
            loading="lazy"
            decoding="async"
            className={`w-full object-cover ${
              scene.imageAspectClass ??
              "aspect-[4/3] md:aspect-[5/4] md:min-h-[280px] lg:min-h-[340px]"
            } ${imgZoomClass}`}
            style={scene.objectPosition ? { objectPosition: scene.objectPosition } : undefined}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className={`flex flex-col justify-center ${scene.imageRight ? "lg:order-1" : ""}`}
        variants={blockVariants}
      >
        <p className="mb-2 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-secondary/90">
          {scene.eyebrow}
        </p>
        <h4
          id={`${scene.id}-title`}
          className="font-serif text-2xl font-medium leading-snug text-[#f4f1ec] md:text-3xl md:leading-snug"
        >
          {scene.title}
        </h4>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400 md:text-[0.95rem] md:leading-relaxed">
          {scene.body}
        </p>
      </motion.div>
    </motion.article>
  );
}

export function BethelEncounterScenes() {
  return (
    <section className="mb-16 md:mb-24" aria-labelledby="bethel-encuentro-heading">
      <Reveal>
        <div id="bethel-encuentro-intro" className="mb-10 scroll-mt-28 text-center md:mb-14">
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

      {BETHEL_ENCOUNTER_SCENES.map((scene, i) => (
        <BethelSceneBlock key={scene.id} scene={scene} index={i} />
      ))}
    </section>
  );
}
