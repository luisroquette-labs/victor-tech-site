"use client";

import { useEffect, useRef, useState } from "react";
import { initAudio, playThock } from "./sound";

// Painéis (mockups de navegador) empilhados que sobem/trocam no scroll.
// Inspirado nas seções "Preview muda na hora / Publica dali mesmo" do Launchpad.

const PANELS = [
  { tag: "Preview em tempo real", url: "preview.victor.tech", title: "Landing page de alta conversão", kind: "landing", cap: "Do briefing ao preview" },
  { tag: "Automação que atende sozinha", url: "wa.me/seu-negócio", title: "Seu WhatsApp vendendo 24/7", kind: "chat", cap: "A IA responde e agenda" },
  { tag: "Publica num clique", url: "seunegócio.com.br", title: "Site premium no ar, com domínio", kind: "live", cap: "No ar, pronto pra vender" },
];

function Mockup({ p }: { p: (typeof PANELS)[number] }) {
  return (
    <div className="mock">
      <div className="mock-bar">
        <span className="mock-dot" /><span className="mock-dot" /><span className="mock-dot" />
        <span className="mock-url">{p.url}</span>
        {p.kind === "live" && <span className="mock-live">● no ar</span>}
      </div>
      <div className={`mock-body ${p.kind}`}>
        {p.kind === "landing" && (
          <>
            <span className="mock-eyebrow">Victor.Tech</span>
            <div className="mock-h" />
            <div className="mock-h short" />
            <div className="mock-btn">Quero avançar agora</div>
            <div className="mock-grid"><i /><i /><i /></div>
          </>
        )}
        {p.kind === "chat" && (
          <div className="mock-chat">
            <div className="mb lead">Vocês atendem hoje?</div>
            <div className="mb bot">Olá! 👋 Posso agendar pra você agora.</div>
            <div className="mb lead">Pode sim!</div>
            <div className="mb bot">Agendado ✅ Até logo!</div>
          </div>
        )}
        {p.kind === "live" && (
          <>
            <div className="mock-pub">✓</div>
            <div className="mock-h center" />
            <div className="mock-h short center" />
            <div className="mock-grid"><i /><i /><i /></div>
          </>
        )}
      </div>
    </div>
  );
}

export default function StackPanels() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(0);

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
    let raf = 0;
    let lastActive = -1;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const rect = wrap.getBoundingClientRect();
      const span = wrap.offsetHeight - vh;
      const prog = Math.min(1, Math.max(0, -rect.top / Math.max(1, span)));
      const pos = prog * PANELS.length - 0.5; // qual painel está "na frente"

      panelRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = i - pos; // >0 atrás/futuro, 0 frente, <0 já passou (sobe e some)
        let y: number, scale: number, op: number, z: number;
        if (d >= 0) {
          y = -d * 46;          // painéis de trás ficam acima, empilhados
          scale = 1 - d * 0.07;
          op = Math.max(0, 1 - d * 0.5);
          z = 50 - Math.round(d * 10);
        } else {
          y = d * 150;          // ao passar, sobe e sai
          scale = 1 - Math.min(0.1, -d * 0.1);
          op = Math.max(0, 1 + d * 1.4);
          z = 60;
        }
        el.style.transform = `translate(-50%, calc(-50% + ${y.toFixed(0)}px)) scale(${scale.toFixed(3)})`;
        el.style.opacity = String(op);
        el.style.zIndex = String(z);
      });

      const act = Math.max(0, Math.min(PANELS.length - 1, Math.round(pos)));
      if (act !== lastActive) {
        if (lastActive !== -1) playThock(0.1);
        lastActive = act;
        setActive(act);
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
      <section className="stack-static">
        <div className="wrap">
          <div className="section-head" style={{ textAlign: "center", margin: "0 auto 36px" }}>
            <span className="eyebrow cyan">Como funciona</span>
            <h2>Do preview ao ar, <span className="em">num clique</span>.</h2>
          </div>
          <div className="stack-grid">
            {PANELS.map((p) => (
              <div key={p.tag} className="stack-static-item">
                <span className="sp-tag">{p.tag}</span>
                <Mockup p={p} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="stack-panels" ref={wrapRef}>
      <div className="sp-sticky">
        <div className="sp-head">
          <span className="eyebrow cyan">Como funciona</span>
          <h2>Do preview ao ar, <span className="em">num clique</span>.</h2>
        </div>
        <div className="sp-stage">
          {PANELS.map((p, i) => (
            <div key={p.tag} className="sp-panel" ref={(el) => { panelRefs.current[i] = el; }}>
              <Mockup p={p} />
            </div>
          ))}
        </div>
        <div className="sp-caption">
          <span className="sp-cap-title">{PANELS[active]?.cap}</span>
          <span className="sp-cap-sub">{PANELS[active]?.tag}</span>
        </div>
      </div>
    </section>
  );
}
