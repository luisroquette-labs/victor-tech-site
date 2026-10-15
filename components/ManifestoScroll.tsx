"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { initAudio, playTick } from "./sound";

// Manifesto "máquina de escrever": ao rolar, o texto é digitado caractere por
// caractere, com som de tecla. Palavras agrupadas (nunca quebram no meio);
// a quebra de linha só acontece entre palavras. Fonte sans grande.
export default function ManifestoScroll({ lead, accent }: { lead: string; accent: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);

  const leadText = lead + " ";
  const full = leadText + accent;
  const chars = Array.from(full);
  const accentStart = Array.from(leadText).length;

  // tokens: palavras e espaços, com índice global de caractere
  const tokens: { space: boolean; text: string; start: number }[] = [];
  {
    let idx = 0;
    for (const part of full.split(/(\s+)/)) {
      if (!part) continue;
      tokens.push({ space: /^\s+$/.test(part), text: part, start: idx });
      idx += Array.from(part).length;
    }
  }
  // palavra "ativa" (onde fica o cursor)
  let activeWord = -1;
  tokens.forEach((t, ti) => {
    if (!t.space && t.start < Math.max(n, 1)) activeWord = ti;
  });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setN(chars.length); return; }
    initAudio();

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
      const typed = Math.round(Math.min(1, Math.max(0, (prog - 0.12) / 0.6)) * chars.length);
      if (typed !== prev) {
        if (typed > prev) playTick();
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
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="manifesto-type" ref={wrapRef}>
      <div className="mt-sticky">
        <p>
          {tokens.map((t, ti) =>
            t.space ? (
              <Fragment key={ti}> </Fragment>
            ) : (
              <span className="mt-word" key={ti}>
                {Array.from(t.text).map((c, k) => {
                  const i = t.start + k;
                  return (
                    <span
                      key={k}
                      className={i >= accentStart ? "mt-c accent" : "mt-c"}
                      style={{ opacity: i < n ? 1 : 0 }}
                    >
                      {c}
                    </span>
                  );
                })}
                {ti === activeWord && n < chars.length && <span className="mt-caret">|</span>}
              </span>
            )
          )}
        </p>
      </div>
    </section>
  );
}
