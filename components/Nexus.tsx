"use client";

import { useState } from "react";
import { whatsappHref, person } from "../app/content";

// N.E.X.U.S. — assistente flutuante (mock front-end) + atalho WhatsApp.
export default function Nexus() {
  const [open, setOpen] = useState(false);

  const diagHref = `https://wa.me/${person.whatsapp}?text=${encodeURIComponent(
    "Olá Victor! Quero um diagnóstico gratuito do meu site atual."
  )}`;

  return (
    <>
      {open && (
        <div className="nexus-panel" role="dialog" aria-label="Assistente N.E.X.U.S.">
          <div className="title">N.E.X.U.S.</div>
          <div className="sub">Inteligência artificial Victor.Tech</div>
          <p>
            Olá! 👋 Sou a IA da agência <b>Victor.Tech</b>. Estou aqui para te ajudar a encontrar a melhor solução digital para o seu negócio.
          </p>
          <a className="opt" href={whatsappHref} target="_blank" rel="noopener noreferrer">
            💰 Solicitar orçamento estratégico
          </a>
          <a className="opt" href={diagHref} target="_blank" rel="noopener noreferrer">
            ⚡ Diagnóstico gratuito do site
          </a>
          <button className="opt" onClick={() => setOpen(false)}>
            Depois converso
          </button>
        </div>
      )}

      <button className="nexus-fab" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span className="star">★</span> N.E.X.U.S.
      </button>

      <a className="wa-fab" href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15l-1.2 4.4 4.5-1.2A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.2.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.1.3.6 1 1.3 1.6.9.8 1.6 1 1.9 1.2.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.6-.1l1.8.9c.3.1.4.2.5.3.1.2.1.6-.1 1.1Z" />
        </svg>
      </a>
    </>
  );
}
