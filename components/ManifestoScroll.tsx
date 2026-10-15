"use client";

import { useEffect, useRef, useState } from "react";

// Manifesto que "monta": as palavras acendem (dim -> brilhante) conforme o scroll
// atravessa a seção. As palavras do trecho em destaque acendem em laranja.
export default function ManifestoScroll({ lead, accent }: { lead: string; accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  const leadWords = lead.split(" ");
  const accentWords = accent.split(" ");
  const total = leadWords.length + accentWords.length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setP(1);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progresso: 0 quando a seção entra por baixo, 1 quando sai por cima (centro no meio)
      const prog = (vh - rect.top) / (vh + rect.height);
      setP(Math.min(1, Math.max(0, (prog - 0.1) / 0.6)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const lit = p * total;
  const word = (w: string, i: number, isAccent: boolean) => {
    const amt = Math.min(1, Math.max(0, lit - i)); // 0..1 por palavra
    return (
      <span
        key={`${isAccent ? "a" : "l"}-${i}`}
        className={isAccent ? "mw accent" : "mw"}
        style={{
          opacity: 0.12 + amt * 0.88,
          filter: `blur(${(1 - amt) * 5}px)`,
          transform: `translateY(${(1 - amt) * 10}px)`,
        }}
      >
        {w}{" "}
      </span>
    );
  };

  return (
    <div className="manifesto-scroll" ref={ref}>
      <p>
        {leadWords.map((w, i) => word(w, i, false))}
        {accentWords.map((w, i) => word(w, leadWords.length + i, true))}
      </p>
    </div>
  );
}
