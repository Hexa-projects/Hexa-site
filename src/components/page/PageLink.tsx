import type { ReactNode } from "react";
import { Link } from "react-router-dom";

/** Link do kit: rota interna vai pelo roteador; endereço externo (WhatsApp, fabricante) abre em nova aba. */
const PageLink = ({ href, className, children }: { href: string; className?: string; children: ReactNode }) =>
  href.startsWith("/") ? (
    <Link to={href} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className} {...(/^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );

export default PageLink;
