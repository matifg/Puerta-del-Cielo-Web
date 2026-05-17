import React, { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  suffix?: string;
  className?: string;
  durationMs?: number;
};

export function AnimatedNumber({
  value,
  suffix = "",
  className = "",
  durationMs = 1100,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setN(value);
      return;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / durationMs);
          const eased = 1 - (1 - p) ** 3;
          setN(Math.round(eased * value));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {n}
      {suffix}
    </span>
  );
}
