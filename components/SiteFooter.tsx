import Link from "next/link";
import Logo from "./Logo";
import { person, whatsappHref, nav } from "../app/content";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-col">
            <Logo />
            <p>{person.role}. Ativos digitais que vendem 24 horas por dia, em código nativo e com foco absoluto em conversão.</p>
          </div>
          <div className="footer-col">
            <h4>Navegação</h4>
            {nav.map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
          </div>
          <div className="footer-col">
            <h4>Contato</h4>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              WhatsApp {person.whatsappLabel}
            </a>
            <a href={person.instagramUrl} target="_blank" rel="noopener noreferrer">
              @{person.instagram}
            </a>
            <a href={person.mapsUrl} target="_blank" rel="noopener noreferrer">
              {person.location}
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {person.year} {person.brand}. Todos os direitos reservados.</span>
          <span>Código nativo · SSL &amp; LGPD · Foco em conversão</span>
        </div>
      </div>
    </footer>
  );
}
