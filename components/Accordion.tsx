"use client";

import { useState } from "react";

export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq-list">
      {items.map((it, i) => (
        <div key={i} className={`acc ${open === i ? "open" : ""}`}>
          <button className="acc-q" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            {it.q}
            <span className="ic" aria-hidden="true">+</span>
          </button>
          <div className="acc-a">
            <p>{it.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
