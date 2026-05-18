import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export type PdcScrollFabButtonProps = {
  onClick: () => void;
  eyebrow: string;
  primaryLine: string;
  pinToTop?: boolean;
  ariaLabel: string;
  className?: string;
  titleKey?: string;
};

/** Pastilla unificada Explorar/Subir — misma UI que FloatingScrollButton */
export const PdcScrollFabButton: React.FC<PdcScrollFabButtonProps> = ({
  onClick,
  eyebrow,
  primaryLine,
  pinToTop = false,
  ariaLabel,
  className = "",
  titleKey,
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      title={primaryLine}
      className={`pdc-scroll-fab ${pinToTop ? "pdc-scroll-fab--up" : ""} ${className}`.trim()}
      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      <span className="relative z-[1] flex items-center justify-between gap-2.5">
        <span
          className="font-sans text-[0.52rem] font-semibold uppercase tracking-[0.22em] text-secondary"
          aria-hidden
        >
          {eyebrow}
        </span>
        {pinToTop ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-secondary" strokeWidth={2.25} aria-hidden />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-secondary" strokeWidth={2.25} aria-hidden />
        )}
      </span>
      <span
        key={titleKey ?? primaryLine}
        className="pdc-scroll-fab-title-in relative z-[1] font-serif text-[0.8125rem] font-semibold leading-snug tracking-wide text-[#faf8f4] sm:text-[0.875rem]"
      >
        {primaryLine}
      </span>
    </motion.button>
  );
};

export default PdcScrollFabButton;
