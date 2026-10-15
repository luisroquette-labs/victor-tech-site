"use client";

import { useEffect, useRef } from "react";

// Fita ondulante (flamulando): banda laranja em onda senoidal com texto preto
// repetido fluindo ao longo dela. Inspirado na faixa do Hotmart Launchpad.
const W = 1600, H = 230, MID = 115, AMP = 42, WAVES = 2;

function buildPath(phase: number): string {
  const x0 = -260, x1 = 1860, steps = 52;
  let d = `M ${x0} ${MID}`;
  for (let i = 1; i <= steps; i++) {
    const x = x0 + ((x1 - x0) * i) / steps;
    const y = MID + Math.sin((i / steps) * Math.PI * 2 * WAVES + phase) * AMP;
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

export default function WavyRibbon({ text = "Perguntas frequentes" }: { text?: string }) {
  const pathRef = useRef<SVGPathElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const repeated = Array.from({ length: 8 }, () => text).join("   ◆   ") + "   ◆   ";

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    let t = 0;
    let offset = 0;
    const loop = () => {
      t += 0.012;
      offset -= 1.3;
      if (offset < -900) offset += 900; // ~largura de uma repetição
      pathRef.current?.setAttribute("d", buildPath(t));
      textPathRef.current?.setAttribute("startOffset", String(offset));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="ribbon" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <path id="ribbonPath" ref={pathRef} d={buildPath(0)} fill="none" />
        </defs>
        <use href="#ribbonPath" stroke="var(--orange)" strokeWidth="96" fill="none" strokeLinecap="round" />
        <text fill="#0a0a0a" fontFamily="var(--font-display)" fontSize="62" fontWeight="600">
          <textPath href="#ribbonPath" ref={textPathRef} startOffset="0">
            {repeated}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
