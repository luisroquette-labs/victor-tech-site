"use client";

import { useEffect, useRef, useState } from "react";
import { whatsappHref } from "../app/content";

// Caixa de prompt que "digita" exemplos em loop — espírito Launchpad.
export default function PromptBox({ examples }: { examples: string[] }) {
  const [text, setText] = useState("");
  const i = useRef(0);
  const j = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setText(examples[0]);
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const full = examples[i.current];
      if (!deleting.current) {
        j.current++;
        setText(full.slice(0, j.current));
        if (j.current >= full.length) {
          deleting.current = true;
          timer = setTimeout(tick, 1900);
          return;
        }
        timer = setTimeout(tick, 42 + Math.random() * 40);
      } else {
        j.current--;
        setText(full.slice(0, j.current));
        if (j.current <= 0) {
          deleting.current = false;
          i.current = (i.current + 1) % examples.length;
          timer = setTimeout(tick, 320);
          return;
        }
        timer = setTimeout(tick, 22);
      }
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [examples]);

  return (
    <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="prompt-box" aria-label="Descreva seu projeto no WhatsApp">
      <span className="typed">
        {text}
        <span className="caret">|</span>
      </span>
      <span className="send" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}
