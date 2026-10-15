import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import Reveal from "../../../components/Reveal";
import Nexus from "../../../components/Nexus";
import { projectDetails, whatsappHref } from "../../content";

export function generateStaticParams() {
  return Object.keys(projectDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projectDetails[slug];
  if (!p) return { title: "Projeto — Victor.Tech" };
  return { title: `${p.title} — Victor.Tech`, description: p.blurb };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projectDetails[slug];
  if (!p) notFound();

  return (
    <>
      <SiteHeader />
      <section className="section" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <Link href="/#projetos" className="back-link">← Voltar ao portfólio</Link>
          <Reveal className="section-head" >
            <span className="eyebrow" style={{ marginTop: 20 }}>{p.label}</span>
            <h2 style={{ fontSize: "clamp(2.4rem, 7vw, 4rem)" }}>{p.title}</h2>
            <p className="lead">{p.blurb}</p>
            {p.live && (
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ marginTop: 18 }}>
                {p.live.replace("https://", "")} ↗
              </a>
            )}
          </Reveal>

          <div className="diff-grid">
            {p.features.map((f, i) => (
              <Reveal key={f.title} className="diff-card">
                <div className="k">{String(i + 1).padStart(2, "0")}</div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="contact-band" style={{ marginTop: 48 }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>{p.cta}?</h2>
            <p className="lead">Fale diretamente com o Victor e receba um orçamento personalizado para o seu projeto.</p>
            <div className="contact-actions" style={{ marginTop: 24 }}>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Quero um site assim →</a>
            </div>
          </Reveal>
        </div>
      </section>
      <SiteFooter />
      <Nexus />
    </>
  );
}
