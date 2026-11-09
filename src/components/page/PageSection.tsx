import { useId, type ReactNode } from "react";
import type { MediaImage } from "@/data/homeMedia";

type PageSectionProps = {
  id?: string;
  title: string;
  intro?: ReactNode;
  /** "light" (padrão) é o branco da leitura. "accent" é a faixa laranja clara: no máximo uma por página, para equipamento ou vídeo. */
  tone?: "light" | "accent";
  /** Texto com mídia: a foto fica ao lado da cabeça e do conteúdo (abaixo deles no celular). */
  media?: MediaImage;
  children?: ReactNode;
};

/** Seção das páginas internas: título Archivo largo, introdução em lead e o conteúdo abaixo. */
const PageSection = ({ id, title, intro, tone = "light", media, children }: PageSectionProps) => {
  const generated = useId();
  const titleId = id ? `${id}-title` : generated;

  return (
    <section id={id} className={`page-section page-section--${tone}${media ? " page-section--split" : ""}`} aria-labelledby={titleId}>
      <div className="page-section__inner">
        <div className="page-section__main">
          <div className="page-section__head">
            <h2 id={titleId} data-reveal="title">
              {title}
            </h2>
            {intro && (typeof intro === "string" ? <p>{intro}</p> : <div className="page-section__intro">{intro}</div>)}
          </div>
          {children && <div className="page-section__body">{children}</div>}
        </div>
        {media && (
          <figure className={media.screen ? "page-section__media page-section__media--screen" : "page-section__media"} data-reveal="media">
            <img src={media.src} width={media.width} height={media.height} alt={media.alt} loading="lazy" decoding="async" />
          </figure>
        )}
      </div>
    </section>
  );
};

export default PageSection;
