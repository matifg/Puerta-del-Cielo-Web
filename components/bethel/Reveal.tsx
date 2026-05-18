import React, { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Extra delay after element enters view */
  delayMs?: number;
  /** Hero / título inicial: visible al cargar (no esperar scroll) */
  priority?: boolean;
};

function isInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  const vh = typeof window !== "undefined" ? window.innerHeight : 0;
  return rect.top < vh && rect.bottom > 0;
}

/**
 * Scroll-triggered fade + translate. Respects prefers-reduced-motion.
 * Si el bloque ya está en pantalla al montar (hero), aparece sin quedar invisible.
 */
export function Reveal({ children, className = "", id, delayMs = 0, priority = false }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(priority);

  useEffect(() => {
    if (priority) return;
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setShown(true);
      return;
    }

    if (isInViewport(el)) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px 8% 0px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [priority]);

  return (
    <div
      id={id}
      ref={ref}
      className={`transform-gpu transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
        shown ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      } ${className}`}
      style={{ transitionDelay: shown ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
