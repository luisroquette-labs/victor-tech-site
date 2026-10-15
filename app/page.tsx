import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import ElectricLava from "../components/ElectricLava";
import PromptBox from "../components/PromptBox";
import StatCounter from "../components/StatCounter";
import Reveal from "../components/Reveal";
import RevenueSim from "../components/RevenueSim";
import WhatsAppSim from "../components/WhatsAppSim";
import ScrollGallery from "../components/ScrollGallery";
import ManifestoScroll from "../components/ManifestoScroll";
import TileGalaxy from "../components/TileGalaxy";
import ProcessFan from "../components/ProcessFan";
import WavyRibbon from "../components/WavyRibbon";
import StackPanels from "../components/StackPanels";
import ShowcaseDeck from "../components/ShowcaseDeck";
import Accordion from "../components/Accordion";
import BlogCard from "../components/BlogCard";
import Nexus from "../components/Nexus";
import { posts } from "./posts";
import {
  hero, promptExamples, stats, diferenciais, processo, automacao,
  revenueSim, portfolio, manifesto, sobre, contact, faq, whatsappHref, person,
} from "./content";

export default function Home() {
  return (
    <>
      <SiteHeader />

      {/* HERO */}
      <section className="hero" id="inicio">
        <ElectricLava />
        <div className="wrap hero-inner">
          <span className="eyebrow">⚡ {hero.eyebrow}</span>
          <h1 className="display">
            {hero.titleLead} <span className="accent">{hero.titleAccent}</span>
          </h1>
          <p className="lead">{hero.lead}</p>
          <PromptBox examples={promptExamples} />
          <div className="hero-ctas">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {hero.ctaPrimary} →
            </a>
            <Link href="#projetos" className="btn btn-ghost">{hero.ctaSecondary}</Link>
          </div>
        </div>
        {/* pontas dos cards da próxima seção espiando (detalhe do Launchpad) */}
        <div className="hero-peek" aria-hidden="true">
          <div className="peek-card a">
            <div className="peek-top"><span>CURSO</span><span>LANDING PAGE</span><span>CTA</span></div>
          </div>
          <div className="peek-card b">
            <div className="peek-top"><span>AUTOMAÇÃO</span><span>IA</span></div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2 — carrossel editorial (conecta com as pontas de card do hero) */}
      <ShowcaseDeck />

      {/* STATS */}
      <div className="wrap">
        <div className="stats-row">
          {stats.map((s) => (
            <StatCounter key={s.label} n={s.n} prefix={s.prefix} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </div>

      {/* DIFERENCIAIS */}
      <section className="section" id="diferenciais">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">{diferenciais.eyebrow}</span>
            <h2>{diferenciais.title}</h2>
            <p className="lead">{diferenciais.lead}</p>
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
        </div>
      </section>

      {/* PROCESSO (leque) */}
      <section className="section" id="processo">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">{processo.eyebrow}</span>
            <h2>{processo.title}</h2>
            <p className="lead">{processo.lead}</p>
          </Reveal>
          <ProcessFan steps={processo.steps} />
        </div>
      </section>

      {/* IA & AUTOMAÇÃO */}
      <section className="section" id="ia">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow cyan">{automacao.eyebrow}</span>
            <h2>{automacao.title}</h2>
            <p className="lead">{automacao.lead}</p>
          </Reveal>

          <div className="automation-layout">
            <div className="pillars" style={{ gridTemplateColumns: "1fr" }}>
              {automacao.pillars.map((p) => (
                <Reveal key={p.tag} className="pillar">
                  <span className="tag">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                  <div className="chips">
                    {p.chips.map((c) => <span key={c} className="chip">{c}</span>)}
                  </div>
                </Reveal>
              ))}
            </div>
            <div>
              <WhatsAppSim />
            </div>
          </div>

          {/* comparativo de horas */}
          <Reveal className="compare">
            <div className="section-head" style={{ marginTop: 56, marginBottom: 28 }}>
              <h2 style={{ fontSize: "2rem" }}>{automacao.compare.title}</h2>
              <p className="lead">{automacao.compare.lead}</p>
            </div>
            <div className="compare-grid">
              <div className="compare-card bad">
                <div className="label">Sem automação</div>
                <div className="num">{automacao.compare.without.n}</div>
                <div className="unit">{automacao.compare.without.unit}</div>
                <div className="cap">{automacao.compare.without.caption}</div>
              </div>
              <div className="compare-vs">VS</div>
              <div className="compare-card good">
                <div className="label">Com IA Victor.Tech</div>
                <div className="num">{automacao.compare.with.n}</div>
                <div className="unit">{automacao.compare.with.unit}</div>
                <div className="cap">{automacao.compare.with.caption}</div>
              </div>
            </div>
            <div className="compare-highlights">
              {automacao.compare.highlights.map((h) => (
                <div key={h.label} className="hl">
                  <b>{h.n}</b>
                  <span>{h.label}</span>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 28 }}>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-cyan">
                {automacao.compare.cta} →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PAINÉIS EMPILHADOS — do preview ao ar */}
      <StackPanels />

      {/* SIMULADOR DE FATURAMENTO */}
      <section className="section" id="simulador">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">{revenueSim.eyebrow}</span>
            <h2>{revenueSim.title}</h2>
            <p className="lead">{revenueSim.lead}</p>
          </Reveal>
          <Reveal>
            <RevenueSim />
          </Reveal>
        </div>
      </section>

      {/* PORTFÓLIO — galeria pinned com scroll horizontal 3D */}
      <section className="section" id="projetos" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">{portfolio.eyebrow}</span>
            <h2>{portfolio.title}</h2>
            <p className="lead">{portfolio.lead}</p>
          </Reveal>
        </div>
        <ScrollGallery items={portfolio.items} />
        <div className="wrap">
          <div className="deck-mini">
            {portfolio.mini.map((m) => (
              <StatCounter key={m.label} n={m.n} prefix={m.prefix} suffix={m.suffix} label={m.label} />
            ))}
          </div>
        </div>
      </section>

      {/* GALÁXIA — voa por um campo de tiles (negócios/serviços) no scroll */}
      <TileGalaxy />

      {/* MANIFESTO — máquina de escrever no scroll, com som de teclado */}
      <ManifestoScroll lead={manifesto.lead} accent={manifesto.accent} />

      {/* SOBRE (teaser) */}
      <section className="section" id="sobre-teaser">
        <div className="wrap">
          <div className="about">
            <Reveal>
              <span className="eyebrow">{sobre.eyebrow}</span>
              <h2>{sobre.title}</h2>
              <p className="mission">{sobre.mission}</p>
              <p>{sobre.body}</p>
              <Link href="/sobre" className="btn btn-ghost" style={{ marginTop: 8 }}>Conhecer o método →</Link>
            </Reveal>
            <Reveal>
              <ul>
                {sobre.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BLOG teaser */}
      <section className="section" id="blog">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow cyan">Blog</span>
            <h2>Conteúdo que gera <span className="em">autoridade</span>.</h2>
            <p className="lead">Estratégia, performance e automação para transformar o seu digital em um ativo de vendas.</p>
          </Reveal>
          <div className="blog-grid">
            {posts.slice(0, 3).map((p) => <BlogCard key={p.slug} post={p} />)}
          </div>
          <div style={{ marginTop: 28 }}>
            <Link href="/blog" className="btn btn-ghost">Ver todos os artigos →</Link>
          </div>
        </div>
      </section>

      {/* FITA ONDULANTE */}
      <WavyRibbon text="Perguntas frequentes" />

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="wrap">
          <Reveal className="section-head" >
            <span className="eyebrow">{faq.eyebrow}</span>
            <h2>{faq.title}</h2>
          </Reveal>
          <Accordion items={faq.items} />
        </div>
      </section>

      {/* CONTATO */}
      <section className="section" id="contato">
        <div className="wrap">
          <Reveal className="contact-band">
            <div className="contact-2col">
              <div className="contact-info">
                <span className="eyebrow">{contact.eyebrow}</span>
                <h2>{contact.title}</h2>
                <p className="lead">{contact.lead}</p>
                <div className="contact-lines">
                  <div className="cl">
                    <span className="cl-ic">📍</span>
                    <div><span className="cl-t">Localização</span><span className="cl-v">{person.location}</span></div>
                  </div>
                  <div className="cl">
                    <span className="cl-ic">💬</span>
                    <div><span className="cl-t">WhatsApp</span><span className="cl-v">{person.whatsappLabel}</span></div>
                  </div>
                  <div className="cl">
                    <span className="cl-ic">◎</span>
                    <div><span className="cl-t">Instagram</span><span className="cl-v">@{person.instagram}</span></div>
                  </div>
                </div>
                <div className="contact-actions">
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Conversar com o Victor →</a>
                  <a href={person.dirUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Como chegar ↗</a>
                </div>
              </div>
              <div className="contact-map">
                <iframe
                  src={person.mapsEmbed}
                  title="Localização — Seropédica, Jardim Maracanã, RJ"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a href={person.mapsUrl} target="_blank" rel="noopener noreferrer" className="map-link">Ver no Google Maps ↗</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
      <Nexus />
    </>
  );
}
