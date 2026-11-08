import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { navigation } from "@/data/navigation";

const footerLinks = navigation.map((item) => ({
  title: item.label,
  links: item.children ?? [],
}));

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="site-footer__brand">
          <img src="/assets/brand/hexamedical-logo-light.webp" alt="Hexamedical" width={240} height={62} loading="lazy" />
          <p>Tecnologia médica, implementação e suporte para serviços de diagnóstico que não podem parar.</p>
          <Link to="/contato" className="site-footer__contact-link">
            Falar com um especialista <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <div className="site-footer__nav">
          {footerLinks.map((group) => (
            <div key={group.title} className="site-footer__group">
              <h2>{group.title}</h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="site-footer__meta">
        <div className="site-footer__details">
          <a href="tel:+5511973140914"><Phone aria-hidden="true" /> +55 11 97314-0914</a>
          <a href="mailto:comercial@hexamedical.com.br"><Mail aria-hidden="true" /> comercial@hexamedical.com.br</a>
        </div>
        <div className="site-footer__legal">
          <p>© {new Date().getFullYear()} Hexamedical. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <Link to="/politica-de-privacidade">Política de Privacidade</Link>
            <Link to="/termos">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
