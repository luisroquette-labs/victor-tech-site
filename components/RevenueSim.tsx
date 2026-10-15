"use client";

import { useMemo, useState } from "react";
import { revenueSim, person } from "../app/content";

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export default function RevenueSim() {
  const [seg, setSeg] = useState(0);
  const [visitors, setVisitors] = useState(revenueSim.defaultVisitors);
  const [ticket, setTicket] = useState(revenueSim.defaultTicket);

  const result = useMemo(() => {
    const lift = revenueSim.segments[seg]?.lift ?? 0.05;
    return Math.round((visitors * lift * ticket) / 10) * 10;
  }, [seg, visitors, ticket]);

  const waHref = `https://wa.me/${person.whatsapp}?text=${encodeURIComponent(
    `Olá Victor! Simulei no site: ${revenueSim.segments[seg].label}, ${visitors} visitantes/mês, ticket ${brl(
      ticket
    )}. Projeção de ${brl(result)}/mês. Quero garantir esse faturamento.`
  )}`;

  return (
    <div className="sim">
      <div>
        <div className="sim-field">
          <label>1. Seu segmento de atuação</label>
          <select value={seg} onChange={(e) => setSeg(Number(e.target.value))}>
            {revenueSim.segments.map((s, idx) => (
              <option key={s.label} value={idx}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div className="sim-field">
          <label>2. Visitantes / leads por mês</label>
          <div className="sim-range-val">{visitors.toLocaleString("pt-BR")}</div>
          <input
            type="range"
            min={100}
            max={5000}
            step={50}
            value={visitors}
            onChange={(e) => setVisitors(Number(e.target.value))}
            aria-label="Visitantes por mês"
          />
        </div>
        <div className="sim-field" style={{ marginBottom: 0 }}>
          <label>3. Ticket médio por cliente</label>
          <div className="sim-range-val">{brl(ticket)}</div>
          <input
            type="range"
            min={50}
            max={3000}
            step={50}
            value={ticket}
            onChange={(e) => setTicket(Number(e.target.value))}
            aria-label="Ticket médio"
          />
        </div>
      </div>

      <div className="sim-result">
        <div className="label">Projeção de faturamento adicional estimado</div>
        <div className="value">
          + {brl(result)} <small>/mês</small>
        </div>
        <div className="note">{revenueSim.note}</div>
        <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
          {revenueSim.cta} 🚀
        </a>
      </div>
    </div>
  );
}
