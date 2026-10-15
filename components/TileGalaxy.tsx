"use client";

import { useEffect, useRef, useState } from "react";

// "Galáxia" de tiles em 3D: o scroll faz voar através de um campo de tiles
// (os negócios/serviços do Victor), com um título emergindo no centro.
// Inspirado no momento da galáxia de fotos do Hotmart Launchpad.

const LABELS = [
  "Clínica de estética", "Odontologia", "Advocacia", "Barbearia premium",
  "Consultoria", "Landing page", "Automação WhatsApp", "IA sob medida",
  "E-commerce", "Infoproduto", "Imobiliária", "Restaurante",
  "Academia", "Bot Telegram", "SEO", "Tráfego pago",
  "Clínica médica", "Salão", "Site premium", "Agendamento 24/7",
];

const ACCENTS = ["o", "c", "o", "c", "o", "o", "c", "c", "o", "o", "c", "o", "c", "c", "o", "o", "c", "o", "o", "c"];

function seeded(i: number) {
  // mulberry32 determinístico por índice (SSR = cliente)
  let a = (i + 1) * 2654435761;
  const r = () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return { nx: r() * 2 - 1, ny: r() * 2 - 1, baseZ: -2600 * r() - 100, op: 0.5 + r() * 0.5 };
}

const COUNT = 46;        // densidade da galáxia
const TRAVEL = 2700;     // distância do fly-through

export default function TileGalaxy() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
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

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight, vw = window.innerWidth;
      const rect = wrap.getBoundingClientRect();
      const span = wrap.offsetHeight - vh;
      const prog = Math.min(1, Math.max(0, -rect.top / Math.max(1, span)));

      tileRefs.current.forEach((el, i) => {
        if (!el) return;
        const s = seeded(i);
        const x = s.nx * vw * 0.5;
        const y = s.ny * vh * 0.46;
        const z = s.baseZ + prog * TRAVEL;   // fly-through único (denso o tempo todo)
        let op = s.op;
        if (z > -60) op *= Math.max(0, 1 - (z + 60) / 260);       // some só ao passar a câmera
        el.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
        el.style.opacity = String(Math.max(0, op));
      });

      if (titleRef.current) {
        const t = 1 - Math.abs(prog - 0.5) * 2.4; // pico no meio
        titleRef.current.style.opacity = String(Math.max(0, Math.min(1, t)));
        titleRef.current.style.transform = `translateY(${(1 - Math.max(0, t)) * 20}px)`;
      }
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
  }, [enabled]);

  if (!enabled) {
    return (
      <div className="galaxy-static">
        <div className="galaxy-title static">
          <span className="eyebrow">Para todo tipo de negócio</span>
          <h2>Cada um virou uma <span className="em">máquina de vendas</span>.</h2>
        </div>
        <div className="galaxy-chips">
          {LABELS.map((label, i) => (
            <span key={label} className={`galaxy-tile ${ACCENTS[i] === "c" ? "cyan" : "orange"}`}>{label}</span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="galaxy" ref={wrapRef}>
      <div className="galaxy-sticky">
        <div className="galaxy-field" ref={fieldRef}>
          {Array.from({ length: COUNT }).map((_, i) => (
            <div
              key={i}
              className={`galaxy-tile ${ACCENTS[i % ACCENTS.length] === "c" ? "cyan" : "orange"}`}
              ref={(el) => { tileRefs.current[i] = el; }}
            >
              {LABELS[i % LABELS.length]}
            </div>
          ))}
        </div>
        <div className="galaxy-title" ref={titleRef}>
          <span className="eyebrow">Para todo tipo de negócio</span>
          <h2>Cada um virou uma <span className="em">máquina de vendas</span>.</h2>
        </div>
      </div>
    </div>
  );
}
