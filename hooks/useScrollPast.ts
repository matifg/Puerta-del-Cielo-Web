import { useEffect, useState } from "react";

/** true cuando window.scrollY supera el umbral (p. ej. navbar sólido). */
export function useScrollPast(threshold = 48): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return past;
}
