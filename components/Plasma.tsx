"use client";

import { useEffect, useRef } from "react";

// Brasas de lava subindo + faíscas cyan. Fundo vivo do hero.
export default function Plasma() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = Math.min(2, window.devicePixelRatio || 1);

    type P = { x: number; y: number; r: number; vy: number; vx: number; life: number; max: number; cyan: boolean };
    let parts: P[] = [];

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      w = rect?.width ?? window.innerWidth;
      h = rect?.height ?? 520;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor(w / 14));
      parts = Array.from({ length: count }, () => spawn());
    };

    const spawn = (): P => {
      const max = 140 + Math.random() * 160;
      return {
        x: Math.random() * w,
        y: h + Math.random() * 60,
        r: 0.6 + Math.random() * 2.4,
        vy: 0.2 + Math.random() * 0.7,
        vx: (Math.random() - 0.5) * 0.3,
        life: 0,
        max,
        cyan: Math.random() < 0.12,
      };
    };

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const p of parts) {
        p.life++;
        p.y -= p.vy;
        p.x += p.vx;
        const t = p.life / p.max;
        const alpha = Math.sin(Math.min(1, t) * Math.PI) * 0.8;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        if (p.cyan) {
          grad.addColorStop(0, `rgba(80,225,245,${alpha})`);
          grad.addColorStop(1, "rgba(40,211,236,0)");
        } else {
          grad.addColorStop(0, `rgba(255,150,70,${alpha})`);
          grad.addColorStop(0.5, `rgba(255,77,18,${alpha * 0.6})`);
          grad.addColorStop(1, "rgba(255,77,18,0)");
        }
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();
        if (t >= 1 || p.y < -20) Object.assign(p, spawn());
      }
      ctx.globalCompositeOperation = "source-over";
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduce) {
      draw(); // 1 frame estático
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="plasma-canvas" aria-hidden="true" />;
}
