import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { MediaImage } from "@/data/homeMedia";
import PageLink from "./PageLink";

export type PageCard = {
  title: string;
  body?: string;
  href?: string;
  image?: MediaImage;
  /** Linha curta acima do texto: fabricante, modalidade ou um dado do equipamento. */
  meta?: string;
  /** Foto de cena (não recorte): cobre a base inteira, como a variante fill da vitrine. */
  fill?: boolean;
};

/**
 * Grade de cards no padrão da vitrine da home. Com imagem: o equipamento inteiro sobre a base branca 4:3.
 * Sem imagem: painel branco com fio, que muda de tom no hover (nada levanta).
 */
const CardGrid = ({ items }: { items: PageCard[] }) => (
  <ul className={items.length > 0 && items.every((item) => item.image) ? "page-cards page-cards--media" : "page-cards"}>
    {items.map((item) => {
      const external = item.href ? !item.href.startsWith("/") : false;
      const body = (
        <>
          {item.image && (
            <span className="page-card__plinth">
              <img src={item.image.src} width={item.image.width} height={item.image.height} alt={item.image.alt} loading="lazy" decoding="async" />
            </span>
          )}
          <div className="page-card__text">
            <h3 className="page-card__title">
              {item.title}
              {item.href && (external ? <ArrowUpRight aria-hidden="true" /> : <ArrowRight aria-hidden="true" />)}
            </h3>
            {item.meta && <p className="page-card__meta">{item.meta}</p>}
            {item.body && <p className="page-card__body">{item.body}</p>}
          </div>
        </>
      );
      const className = ["page-card", item.image ? "page-card--media" : "page-card--text", item.fill ? "page-card--fill" : ""].filter(Boolean).join(" ");
      return (
        <li key={item.title} className={className} data-reveal="item">
          {item.href ? (
            <PageLink href={item.href} className="page-card__link">
              {body}
            </PageLink>
          ) : (
            <div className="page-card__link">{body}</div>
          )}
        </li>
      );
    })}
  </ul>
);

export default CardGrid;
