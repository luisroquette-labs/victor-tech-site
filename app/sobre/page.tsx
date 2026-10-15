import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import Reveal from "../../components/Reveal";
import Nexus from "../../components/Nexus";
import { sobre, diferenciais, processo, whatsappHref, person } from "../content";

export const metadata: Metadata = {
  title: "Sobre — Victor.Tech",
  description: sobre.mission,
};

export default function SobrePage() {
  return (
    <>
      <SiteHeader />
      <section className="section" style={{ paddingTop: 64 }}>
        <div className="wrap">
          <Reveal className="section-head" >
            <span className="eyebrow">{sobre.eyebrow}</span>
            <h2>{sobre.title}</h2>
            <p className="mission" style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "1.4rem", color: "var(--ink)", marginTop: 18 }}>
              {sobre.mission}
            </p>
            <p className="lead">{sobre.body}</p>
          </Reveal>

          <Reveal>
            <ul style={{ listStyle: "none", padding: 0, margin: "10px 0 40px", display: "flex", flexDirection: "column", gap: 14 }}>
              {sobre.bullets.map((b) => (
                <li key={b} style={{ display: "flex", gap: 12, color: "var(--ink-dim)" }}>
                  <span style={{ color: "var(--orange)", fontFamily: "var(--font-ui)" }}>→</span> {b}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="section-head" >
            <span className="eyebrow">O método</span>
            <h2 style={{ fontSize: "2rem" }}>Como transformamos um visitante em cliente</h2>
          </Reveal>
          <div className="diff-grid">
            {diferenciais.items.map((it) => (
              <Reveal key={it.k} className="diff-card">
                <div className="k">{it.k}</div>
                <h3>{it.title}</h3>
                <p>{it.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="section-head" style={{ marginTop: 56 }}>
            <span className="eyebrow">Processo</span>
            <h2 style={{ fontSize: "2rem" }}>{processo.title}</h2>
          </Reveal>
          <div className="fan">
            {processo.steps.map((s, i) => (
              <div key={s.n} className={`fan-card c${i + 1}`}>
                <span className="big-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {sobre.cta} →
            </a>
            <a href={person.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              {person.location}
            </a>
          </div>
          <p style={{ marginTop: 30 }}>
            <Link href="/" className="back-link">← Voltar ao início</Link>
          </p>
        </div>
      </section>
      <SiteFooter />
      <Nexus />
    </>
  );
}
