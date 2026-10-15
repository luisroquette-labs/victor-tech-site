"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Item = {
  slug: string;
  name: string;
  kind: string;
  tags: string[];
  blurb: string;
  metric: string;
  accent: string;
  caption?: string;
};

// Galeria "pinned": o scroll vertical desliza os cards na horizontal,
// com perspectiva 3D (card central reto, laterais inclinados). Estilo Launchpad.
export default function ScrollGallery({ items }: { items: Item[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 820px)").matches;
    if (reduce || mobile) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    let raf = 0;
    const update = () => {
      raf = 0;
      const wrap = wrapRef.current;
      const track = trackRef.current;
      if (!wrap || !track) return;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const rect = wrap.getBoundingClientRect();
      const span = wrap.offsetHeight - vh;
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, span)));

      const maxX = Math.max(0, track.scrollWidth - vw);
      const x = -p * maxX;
      track.style.transform = `translate3d(${x}px,0,0)`;

      // rotação/scale por card conforme a distância do centro da tela
      let best = 0, bestD = Infinity;
      cardRefs.current.forEach((c, i) => {
        if (!c) return;
        const r = c.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const d = (cx - vw / 2) / (vw / 2); // -1 (esq) .. 0 (centro) .. 1 (dir)
        const ad = Math.abs(d);
        const rotY = Math.max(-30, Math.min(30, -d * 27));
        const scale = 1 - Math.min(0.24, ad * 0.17);
        const tz = -Math.min(280, ad * 230);
        const op = 1 - Math.min(0.58, ad * 0.48);
        c.style.transform = `perspective(1500px) translateZ(${tz}px) rotateY(${rotY}deg) scale(${scale})`;
        c.style.opacity = String(op);
        c.style.filter = `brightness(${1 - Math.min(0.4, ad * 0.34)})`;
        c.style.zIndex = String(100 - Math.round(ad * 50));
        if (ad < bestD) { bestD = ad; best = i; }
      });
      setActive((prev) => (prev === best ? prev : best));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items.length]);

  // Fallback estático (mobile / reduced-motion): grade vertical simples.
  if (!enabled) {
    return (
      <div className="deck">
        {items.map((p) => (
          <div key={p.slug} className={`proj ${p.accent}`}>
            <div className="proj-top">
              <span className="kind">{p.kind}</span>
              <span className="metric">{p.metric}</span>
            </div>
            <div>
              <div className="giant">{p.name}</div>
              <p>{p.blurb}</p>
            </div>
            <div className="proj-foot">
              <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
              <Link href={`/projetos/${p.slug}`} className="arrow">Ver detalhes →</Link>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="scroll-gallery" ref={wrapRef} style={{ height: `${120 + items.length * 70}vh` }}>
      <div className="sg-sticky">
        <div className="sg-track" ref={trackRef}>
          {items.map((p, i) => (
            <div
              key={p.slug}
              className={`proj sg-card ${p.accent}`}
              ref={(el) => { cardRefs.current[i] = el; }}
            >
              <div className="proj-top">
                <span className="kind">{p.kind}</span>
                <span className="metric">{p.metric}</span>
              </div>
              <div>
                <div className="giant">{p.name}</div>
                <p>{p.blurb}</p>
              </div>
              <div className="proj-foot">
                <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                <Link href={`/projetos/${p.slug}`} className="arrow">Ver detalhes →</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="sg-caption">
          <span className="sg-cap-title">{items[active]?.caption || items[active]?.name}</span>
          <span className="sg-cap-sub">{items[active]?.kind}</span>
          <span className="sg-hint">role para navegar ↓</span>
        </div>
      </div>
    </div>
  );
}
