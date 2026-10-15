"use client";

import { useEffect, useRef, useState } from "react";
import { initAudio, playThock } from "./sound";

type Step = { n: string; title: string; body: string };

// Posições finais (combinam com .fan-card.c1/.c2/.c3 do CSS)
const FINAL = [
  { rot: -3, y: 0 },
  { rot: 1, y: 10 },
  { rot: 4, y: 2 },
];

export default function ProcessFan({ steps }: { steps: Step[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 820px)").matches;
    setEnabled(!(reduce || mobile));
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    initAudio();

    const landed = steps.map(() => false);
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const rect = wrap.getBoundingClientRect();
      const prog = Math.min(1, Math.max(0, (vh * 0.92 - rect.top) / (vh * 0.62)));

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const f = FINAL[i] || FINAL[0];
        // cada carta é "dada" numa faixa do progresso, escalonada
        const local = Math.min(1, Math.max(0, (prog - i * 0.16 - 0.04) / 0.34));
        const e = 1 - Math.pow(1 - local, 3); // easeOutCubic
        const y = (1 - e) * 170 + f.y;
        const rot = (1 - e) * (f.rot * 5 - 16) + f.rot;
        el.style.transform = `translateY(${y.toFixed(1)}px) rotate(${rot.toFixed(2)}deg)`;
        el.style.opacity = String(Math.min(1, e * 1.4));
        if (!landed[i] && local >= 0.55) {
          landed[i] = true;
          playThock();
        }
        if (local < 0.3) landed[i] = false; // rearma ao sair (scroll pra cima)
      });
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
  }, [enabled, steps]);

  return (
    <div className="fan" ref={wrapRef}>
      {steps.map((s, i) => (
        <div
          key={s.n}
          className={`fan-card c${i + 1}`}
          ref={(el) => { cardRefs.current[i] = el; }}
          style={enabled ? { opacity: 0 } : undefined}
        >
          <span className="big-n">{s.n}</span>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
        </div>
      ))}
    </div>
  );
}
