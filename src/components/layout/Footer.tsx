import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

const footerLinks = [
  {
    title: "Soluções",
    links: [
      { label: "Ressonância Magnética", href: "/solucoes/ressonancia-magnetica" },
      { label: "Bombas Injetoras", href: "/solucoes/bombas-injetoras" },
      { label: "HexAI", href: "/solucoes/hexai" },
      { label: "Área Veterinária", href: "/solucoes/veterinario" },
    ],
  },
  {
    title: "Serviços",
    links: [
      { label: "Manutenção", href: "/servicos/manutencao" },
      { label: "Contratos", href: "/servicos/contratos" },
      { label: "Instalação", href: "/servicos/instalacao" },
      { label: "Reparo de Peças", href: "/servicos/reparo" },
      { label: "Visita Técnica", href: "/servicos/visita-tecnica" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre", href: "/sobre" },
      { label: "Estrutura", href: "/estrutura" },
      { label: "Blog", href: "/blog" },
      { label: "Contato", href: "/contato" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <img src={logoIcon} alt="Hexamedical" className="h-10 w-10" />
              <div className="flex flex-col leading-none">
                <span className="text-base font-bold tracking-tight">HEXA<span className="text-primary-foreground/60">MEDICAL</span></span>
                <span className="text-[9px] font-medium uppercase tracking-widest text-primary-foreground/50">Taking Care Your Equipment</span>
              </div>
            </div>
            <p className="mb-6 max-w-sm text-sm text-primary-foreground/70">
              Especialistas em soluções de Ressonância Magnética, serviços técnicos e suporte de alta performance para instituições de saúde.
            </p>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <a href="tel:+551140028922" className="flex items-center gap-2 hover:text-accent">
                <Phone className="h-4 w-4" /> (11) 4002-8922
              </a>
              <a href="mailto:contato@hexamedical.com.br" className="flex items-center gap-2 hover:text-accent">
                <Mail className="h-4 w-4" /> contato@hexamedical.com.br
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>São Paulo, SP — Cobertura Nacional</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-xs text-primary-foreground/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Hexamedical. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <Link to="/politica-de-privacidade" className="hover:text-accent">Política de Privacidade</Link>
            <Link to="/termos" className="hover:text-accent">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
