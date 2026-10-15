"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { initAudio } from "./sound";

// Smooth-scroll com inércia (estilo das landing pages premium / Hotmart Launchpad).
export default function SmoothScroll() {
  useEffect(() => {
    initAudio();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.5, // ~metade da distância por wheel -> rolagem ~2x mais lenta
      touchMultiplier: 0.9,
    });

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
