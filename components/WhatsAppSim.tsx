"use client";

import { useEffect, useRef, useState } from "react";
import { whatsappSim } from "../app/content";

export default function WhatsAppSim() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(whatsappSim.messages.length);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        let n = 0;
        const next = () => {
          n++;
          setShown(n);
          if (n < whatsappSim.messages.length) setTimeout(next, 900);
        };
        setTimeout(next, 300);
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="wa-sim" ref={ref}>
      <div className="wa-head">
        <span className="wa-dot" />
        <span>{whatsappSim.header}</span>
      </div>
      <div className="wa-body">
        {whatsappSim.messages.slice(0, shown).map((m, i) => (
          <div key={i} className={`wa-msg ${m.from}`}>
            {m.text}
          </div>
        ))}
      </div>
    </div>
  );
}
