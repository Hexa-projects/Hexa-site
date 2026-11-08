import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import type { MediaImage, MediaVideo } from "@/data/homeMedia";
import PageLink from "./PageLink";

export type PageCrumb = { label: string; href?: string };
export type PageAction = { label: string; href: string; kind: "primary" | "quiet" };

type PageHeroProps = {
  tone: "dark" | "light";
  /** Contexto da página (linha, fabricante). Aparece como placa técnica abaixo das ações, nunca acima do título. */
  eyebrow?: string;
  title: string;
  lead: string;
  crumbs: PageCrumb[];
  media?: MediaImage | MediaVideo;
  actions?: PageAction[];
};

/** Anéis do túnel atrás do equipamento (hero escuro): densidade crescente para o centro, como o palco da home. */
const RINGS = Array.from({ length: 10 }, (_, k) => Math.round(60 * 1.3 ** k));

const isVideo = (media: MediaImage | MediaVideo): media is MediaVideo => "mp4" in media;
const prefersReduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Vídeo do hero: mudo, em loop e só com o hero na tela; sempre com pausa. Com movimento reduzido, fica no pôster. */
const HeroVideo = ({ video }: { video: MediaVideo }) => {
  const element = useRef<HTMLVideoElement | null>(null);
  const userPaused = useRef(false);
  const [reduced] = useState(prefersReduced);
  const [playing, setPlaying] = useState(false);

  // O React não escreve o atributo `muted` no HTML; sem ele o Safari do iOS bloqueia o autoplay.
  const attach = useCallback((node: HTMLVideoElement | null) => {
    element.current = node;
    if (!node) return;
    node.muted = true;
    node.defaultMuted = true;
    node.setAttribute("muted", "");
  }, []);

  useEffect(() => {
    const node = element.current;
    if (!node) return;
    const sync = (event: Event) => setPlaying(event.type !== "pause");
    node.addEventListener("playing", sync);
    node.addEventListener("pause", sync);
    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) node.pause();
        else if (!reduced && !userPaused.current) void node.play()?.catch(() => {});
      });
      observer.observe(node);
    }
    return () => {
      node.removeEventListener("playing", sync);
      node.removeEventListener("pause", sync);
      observer?.disconnect();
    };
  }, [reduced]);

  const toggle = () => {
    const node = element.current;
    if (!node) return;
    userPaused.current = !node.paused;
    if (node.paused) void node.play()?.catch(() => {});
    else node.pause();
  };

  return (
    <>
      <video
        ref={attach}
        className="page-hero__video"
        autoPlay={!reduced}
        muted
        loop
        playsInline
        preload={reduced ? "none" : "metadata"}
        poster={video.poster}
        width={video.width}
        height={video.height}
        aria-label={video.label}
      >
        {video.webm && <source src={video.webm} type='video/webm; codecs="vp9"' />}
        <source src={video.mp4} type="video/mp4" />
      </video>
      <button type="button" className="page-hero__pause" onClick={toggle}>
        {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        <span>{playing ? "Pausar vídeo" : "Tocar vídeo"}</span>
      </button>
    </>
  );
};

/**
 * Abertura das páginas internas. Escura (grafite) para produto: o equipamento inteiro sobre a base branca
 * da vitrine. Clara (mineral) para serviço e institucional: foto de cena no quadro de raio `md`.
 */
const PageHero = ({ tone, eyebrow, title, lead, crumbs, media, actions = [] }: PageHeroProps) => {
  const titleId = useId();
  const last = crumbs.length - 1;

  return (
    <section className={`page-hero page-hero--${tone}${media ? "" : " page-hero--text"}`} aria-labelledby={titleId}>
      {tone === "dark" && (
        <svg className="page-hero__rings" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
          {RINGS.map((r) => (
            <circle key={r} cx={media ? 1180 : 1320} cy={470} r={r} />
          ))}
        </svg>
      )}
      <div className="page-hero__inner">
        <nav className="page-crumbs" aria-label="Você está em">
          <ol>
            {crumbs.map((crumb, index) => (
              <li key={`${crumb.label}-${index}`}>
                {index === last || !crumb.href ? (
                  <span aria-current={index === last ? "page" : undefined}>{crumb.label}</span>
                ) : (
                  <Link to={crumb.href}>{crumb.label}</Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="page-hero__copy">
          <h1 id={titleId} className="page-hero__title" data-reveal="title">
            {title}
          </h1>
          <p className="page-hero__lead">{lead}</p>
          {actions.length > 0 && (
            <div className="page-hero__actions">
              {actions.map((action) => {
                const external = !action.href.startsWith("/");
                return (
                  <PageLink key={action.label} href={action.href} className={`button button--${action.kind}`}>
                    {action.label}
                    {action.kind === "primary" && (external ? <ArrowUpRight aria-hidden="true" /> : <ArrowRight aria-hidden="true" />)}
                  </PageLink>
                );
              })}
            </div>
          )}
          {eyebrow && <p className="page-hero__context">{eyebrow}</p>}
        </div>

        {media && (
          <figure className={isVideo(media) ? "page-hero__media page-hero__media--video" : "page-hero__media"} data-reveal="media">
            {isVideo(media) ? (
              <HeroVideo video={media} />
            ) : (
              <img src={media.src} width={media.width} height={media.height} alt={media.alt} decoding="async" />
            )}
          </figure>
        )}
      </div>
    </section>
  );
};

export default PageHero;
