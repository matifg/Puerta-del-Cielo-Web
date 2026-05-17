import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { BethelTabId } from "../../data/bethelScenes";
import { BETHEL_TAB_IMAGES } from "../../data/bethelScenes";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

type BethelTabImageProps = {
  tabId: BethelTabId;
  className?: string;
};

export function BethelTabImage({ tabId, className = "" }: BethelTabImageProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const img = BETHEL_TAB_IMAGES[tabId];

  if (!img) return null;

  return (
    <motion.div
      className={`relative mb-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0a1018]/80 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.75)] ${className}`}
      layout={!reduceMotion}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tabId}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease }}
          className="relative aspect-[21/9] w-full sm:aspect-[2.2/1]"
        >
          <img
            src={img.src}
            alt={img.alt}
            className="absolute inset-0 h-full w-full object-cover"
            style={img.objectPosition ? { objectPosition: img.objectPosition } : undefined}
          />
          <motion.div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030508]/55 via-transparent to-[#030508]/20"
            aria-hidden
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
