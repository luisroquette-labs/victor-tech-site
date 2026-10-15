"use client";

import { useEffect, useRef, useState } from "react";

// Seção 2 — carrossel editorial (estilo Hotmart Launchpad): cards com palavra
// gigante + visual + labels + rodapé, deslizando na horizontal em 3D no scroll.
const CARDS = [
  { bg: "cream", eyebrow: "Estética & Saúde", center: "CLÍNICA GLOW", right: "AGENDAR", word: "GLOW", a: "tratamentos", b: "agendar", cap: "Landing page que lota a agenda", kind: "Landing de alta conversão" },
  { bg: "dark", eyebrow: "Advocacia", center: "ESCRITÓRIO LEX", right: "CONTATO", word: "LEX", a: "áreas de atuação", b: "contato", cap: "Autoridade que fecha clientes de alto valor", kind: "Site premium corporativo" },
  { bg: "orange", eyebrow: "Lançamento de App", center: "FITPULSE", right: "BAIXAR", word: "PULSE", a: "funcionalidades", b: "baixar app", cap: "Página de lançamento que vira downloads", kind: "App landing page" },
  { bg: "cream", eyebrow: "Barbearia Premium", center: "BARBEARIA FADE", right: "AGENDA", word: "FADE", a: "serviços", b: "agendar", cap: "Agendamento no automático, 24h", kind: "Site + agendamento" },
  { bg: "dark", eyebrow: "Automação com IA", center: "WHATSAPP 24/7", right: "ATIVAR", word: "AUTO", a: "fluxos", b: "ativar IA", cap: "A IA que atende e vende sozinha", kind: "Automação sob medida" },
];

export default function ShowcaseDeck() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 820px)").matches;
    setEnabled(!(reduce || mobile));
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const wrap = wrapRef.current;
      const track = trackRef.current;
      if (!wrap || !track) return;
      const vh = window.innerHeight, vw = window.innerWidth;
      const rect = wrap.getBoundingClientRect();
      const span = wrap.offsetHeight - vh;
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, span)));
      const maxX = Math.max(0, track.scrollWidth - vw);
      track.style.transform = `translate3d(${-p * maxX}px,0,0)`;

      let best = 0, bestD = Infinity;
      cardRefs.current.forEach((c, i) => {
        if (!c) return;
        const r = c.getBoundingClientRect();
        const d = (r.left + r.width / 2 - vw / 2) / (vw / 2);
        const ad = Math.abs(d);
        c.style.transform = `perspective(1600px) translateZ(${-Math.min(300, ad * 240)}px) rotateY(${Math.max(-26, Math.min(26, -d * 24))}deg) scale(${1 - Math.min(0.2, ad * 0.14)})`;
        c.style.opacity = String(1 - Math.min(0.55, ad * 0.45));
        c.style.zIndex = String(100 - Math.round(ad * 50));
        if (ad < bestD) { bestD = ad; best = i; }
      });
      setActive((prev) => (prev === best ? prev : best));
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

  const goNext = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number) => void } }).__lenis;
    const y = window.scrollY + window.innerHeight * 0.82;
    if (lenis) lenis.scrollTo(y); else window.scrollTo(0, y);
  };

  const Card = ({ c, i }: { c: (typeof CARDS)[number]; i: number }) => (
    <div className={`sw-card ${c.bg}`} ref={enabled ? (el) => { cardRefs.current[i] = el; } : undefined}>
      <div className="sw-top">
        <span>{c.eyebrow}</span>
        <span>{c.center}</span>
        <span>{c.right}</span>
      </div>
      <div className="sw-hero">
        <span className="sw-word">{c.word}</span>
        <div className="sw-visual">
          <div className="svm-bar"><i /><i /><i /></div>
          <div className="svm-body">
            <div className="svm-ey" />
            <div className="svm-h" />
            <div className="svm-h short" />
            <div className="svm-btn" />
            <div className="svm-img" />
          </div>
        </div>
      </div>
      <div className="sw-foot">
        <span>{c.a} <i>→</i></span>
        <span>{c.b} <i>→</i></span>
      </div>
    </div>
  );

  if (!enabled) {
    return (
      <section className="sw-static">
        <div className="wrap">
          <div className="section-head" style={{ maxWidth: 720 }}>
            <span className="eyebrow">O que entregamos</span>
            <h2>Um ativo de vendas pra cada <span className="em">tipo de negócio</span>.</h2>
          </div>
          <div className="sw-grid">
            {CARDS.map((c, i) => <Card key={c.word} c={c} i={i} />)}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="showcase" ref={wrapRef} style={{ height: `${120 + CARDS.length * 60}vh` }}>
      <div className="sw-sticky">
        <div className="sw-track" ref={trackRef}>
          {CARDS.map((c, i) => <Card key={c.word} c={c} i={i} />)}
        </div>
        <div className="sw-caption">
          <span className="sw-cap-title">{CARDS[active]?.cap}</span>
          <span className="sw-cap-sub">{CARDS[active]?.kind}</span>
        </div>
        <div className="sg-dots">
          <div className="sg-dots-pill">
            {CARDS.map((_, i) => <span key={i} className={`sg-dot ${i === active ? "on" : ""}`} />)}
          </div>
          <button className="sg-next" onClick={goNext} aria-label="Próximo">›</button>
        </div>
      </div>
    </section>
  );
}
