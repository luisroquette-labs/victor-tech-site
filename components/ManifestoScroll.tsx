"use client";

import { useEffect, useRef, useState } from "react";

// Manifesto "máquina de escrever": ao rolar, o texto é digitado caractere por
// caractere, com som de tecla mecânica (Web Audio, sintetizado). Fonte sans,
// grande, ocupando a largura — como o site de referência.
export default function ManifestoScroll({ lead, accent }: { lead: string; accent: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);

  const leadText = lead + " ";
  const full = leadText + accent;
  const chars = Array.from(full);
  const accentStart = Array.from(leadText).length;

  // áudio
  const ctxRef = useRef<AudioContext | null>(null);
  const lastSoundRef = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setN(chars.length); return; }

    const AC: typeof AudioContext | undefined =
      window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    const ensureCtx = () => {
      if (!ctxRef.current && AC) ctxRef.current = new AC();
      if (ctxRef.current && ctxRef.current.state === "suspended") ctxRef.current.resume();
    };
    // desbloqueia o áudio no primeiro gesto do usuário
    const unlock = () => ensureCtx();
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    window.addEventListener("wheel", unlock, { once: true, passive: true });

    const click = () => {
      const ctx = ctxRef.current;
      if (!ctx || ctx.state !== "running") return;
      const now = ctx.currentTime;
      if (now - lastSoundRef.current < 0.03) return; // throttle
      lastSoundRef.current = now;
      const dur = 0.028;
      const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 3);
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 1500 + Math.random() * 900;
      bp.Q.value = 0.9;
      const g = ctx.createGain();
      g.gain.value = 0.09;
      src.connect(bp).connect(g).connect(ctx.destination);
      src.start(now);
    };

    let raf = 0;
    let prev = 0;
    const update = () => {
      raf = 0;
      const el = wrapRef.current;
      if (!el) return;
      const vh = window.innerHeight;
      const rect = el.getBoundingClientRect();
      const span = el.offsetHeight - vh;
      const prog = Math.min(1, Math.max(0, -rect.top / Math.max(1, span)));
      // digita entre 12% e 82% do progresso (começa/termina com folga centrado)
      const typed = Math.round(Math.min(1, Math.max(0, (prog - 0.12) / 0.6)) * chars.length);
      if (typed !== prev) {
        if (typed > prev) click();
        prev = typed;
        setN(typed);
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("wheel", unlock);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="manifesto-type" ref={wrapRef}>
      <div className="mt-sticky">
        <p>
          {chars.map((c, i) => (
            <span
              key={i}
              className={i >= accentStart ? "mt-c accent" : "mt-c"}
              style={{ opacity: i < n ? 1 : 0 }}
            >
              {c === " " ? " " : c}
            </span>
          ))}
          <span className="mt-caret" style={{ opacity: n < chars.length ? 1 : 0 }}>|</span>
        </p>
      </div>
    </section>
  );
}
