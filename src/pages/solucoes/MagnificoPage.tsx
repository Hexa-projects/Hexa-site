import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Pause, Play } from "lucide-react";
import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import PageSection from "@/components/page/PageSection";
import PointList from "@/components/page/PointList";
import SpecTable from "@/components/page/SpecTable";
import CardGrid from "@/components/page/CardGrid";
import Faq from "@/components/page/Faq";
import PageContact from "@/components/page/PageContact";
import { bannerClip } from "@/components/home/heroClip";
import { whatsappHref } from "@/data/home";
import { homeMedia } from "@/data/homeMedia";
import { contactPaths, type CompareTableData } from "@/data/pages/solutions";
import { magnifico, magnificoMedia } from "@/data/pages/magnifico";
import { duration, ease, gsap, ScrollTrigger, stagger } from "@/lib/motion";
import { useMotionScope } from "@/motion/useMotionScope";
import { detectStageMode, type StageMode } from "@/motion/capability";
import "@/styles/magnifico.css";

/** Folga entre o recorte do vídeo e o anel laranja, como a borda do palco na home. */
const RIM_GAP = 3;
/** Anéis do túnel atrás do vídeo: densidade crescente para o centro, como no hero escuro do kit. */
const RINGS = Array.from({ length: 10 }, (_, k) => Math.round(60 * 1.3 ** k));

const isNarrow = () => typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches;
const prefersReduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
/** Economia de dados ligada no navegador: o vídeo não toca sozinho, fica no pôster até o botão. */
const savesData = () =>
  typeof navigator !== "undefined" && Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);

/**
 * A cena da página: o vídeo oficial do Magnifico Open (o mesmo do túnel da home) abre de um círculo até o
 * quadro inteiro enquanto a seção fica presa, e os três dados entram em sequência.
 * Só no modo imersivo (desktop e celular). Modo leve ou movimento reduzido: sem pin, tudo visível,
 * e com movimento reduzido ou economia de dados o vídeo fica no pôster. Sem palco WebGL e sem Lenis: o anel é um elemento da página.
 */
const MagnificoScene = () => {
  const { scene } = magnifico;
  const titleId = useId();
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const figure = useRef<HTMLElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const facts = useRef<HTMLDListElement>(null);
  const video = useRef<HTMLVideoElement | null>(null);
  const userPaused = useRef(false);
  const inView = useRef(false);
  const [mode] = useState<StageMode>(detectStageMode);
  const [narrow] = useState(isNarrow);
  const [reduced] = useState(prefersReduced);
  const [dataSaver] = useState(savesData);
  // Começa como parado: o rótulo só diz "Pausar" depois que o vídeo de fato tocar.
  const [playing, setPlaying] = useState(false);
  const media = narrow ? homeMedia.tunnel.mobile : homeMedia.tunnel.desktop;

  // O React não escreve o atributo `muted` no HTML (só a propriedade); sem ele o Safari do iOS bloqueia o play().
  const attachVideo = useCallback((element: HTMLVideoElement | null) => {
    video.current = element;
    if (!element) return;
    element.muted = true;
    element.defaultMuted = true;
    element.setAttribute("muted", "");
  }, []);

  const tryPlay = useCallback(() => {
    const element = video.current;
    if (element && !reduced && !dataSaver && inView.current && !userPaused.current) void element.play()?.catch(() => {});
  }, [reduced, dataSaver]);

  const setInView = useCallback(
    (active: boolean) => {
      inView.current = active;
      if (active) tryPlay();
      else if (video.current && !video.current.paused) video.current.pause();
    },
    [tryPlay],
  );

  const toggleVideo = () => {
    const element = video.current;
    if (!element) return;
    if (element.paused) {
      userPaused.current = false;
      void element.play()?.catch(() => {});
    } else {
      userPaused.current = true;
      element.pause();
    }
  };

  // O rótulo do botão segue o estado real do vídeo; no iPhone em economia de bateria, o primeiro toque libera o play.
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const sync = (event: Event) => setPlaying(event.type !== "pause");
    element.addEventListener("playing", sync);
    element.addEventListener("pause", sync);
    const retry = () => element.paused && tryPlay();
    document.addEventListener("touchend", retry, { once: true, passive: true });
    return () => {
      element.removeEventListener("playing", sync);
      element.removeEventListener("pause", sync);
      document.removeEventListener("touchend", retry);
    };
  }, [tryPlay]);

  useMotionScope(
    root,
    ({ desktop, mobile }) => {
      // Movimento reduzido (ou nenhum contexto): o HTML já está no estado final e o vídeo só toca no botão.
      if (!desktop && !mobile) return;
      const section = root.current;
      const box = figure.current;
      const rim = ring.current;
      const list = facts.current;
      if (!section || !box || !rim || !list || !frame.current) return;
      const items = Array.from(list.children);

      if (mode === "immersive") {
        const state = { open: 0 };
        // offsetWidth/Height: a caixa do layout, sem o recorte. O recorte e o anel são simétricos à caixa,
        // então o círculo fica no centro do vídeo antes, durante e depois da trava.
        const veil = overlay.current;
        const clipFor = () => bannerClip({ width: box.offsetWidth, height: box.offsetHeight, open: state.open });
        // Um gsap.set só, na montagem: ele guarda os valores originais, e o revert do contexto (troca de rota,
        // girar a tela, rebaixar) devolve recorte, anel e véu ao estado de repouso.
        const first = clipFor();
        const firstSize = 2 * (first.ring + RIM_GAP);
        gsap.set(box, { clipPath: first.css });
        gsap.set(rim, { width: firstSize, height: firstSize, opacity: 1 });
        if (veil) gsap.set(veil, { "--mag-veil": 0 });
        // A cada quadro, escrita direta no estilo: um gsap.set aqui criaria um tween novo por quadro dentro do
        // contexto (o onUpdate roda com o contexto ativo) e a lista cresceria sem limite enquanto se rola.
        const apply = () => {
          const clip = clipFor();
          const size = `${2 * (clip.ring + RIM_GAP)}px`;
          box.style.clipPath = clip.css;
          rim.style.width = size;
          rim.style.height = size;
          rim.style.opacity = String(1 - state.open);
          // O véu dos dados só escurece a base quando o vídeo já é quadro.
          veil?.style.setProperty("--mag-veil", String(state.open));
        };
        apply();

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: frame.current,
              // Desktop: o quadro ocupa a tela. Celular: o quadro (banner e dados) trava inteiro, encostado embaixo.
              start: desktop ? "top top" : "clamp(bottom bottom)",
              end: desktop ? "+=200%" : "+=110%",
              pin: true,
              scrub: 0.6,
              onRefresh: apply,
            },
          })
          // Abre: do círculo ao quadro inteiro.
          .to(state, { open: 1, duration: 0.5, ease: "power1.inOut", onUpdate: apply })
          // Os três dados entram um depois do outro.
          .from(items, { opacity: 0, y: 24, duration: 0.12, stagger: 0.1, ease: "power1.out" }, 0.55)
          // Uma pausa com tudo na tela antes de soltar.
          .to({}, { duration: 0.12 });
      } else {
        // Modo leve: sem trava; os dados entram uma vez, como as listas do kit.
        gsap.from(items, {
          opacity: 0,
          y: 16,
          duration: duration.base * (mobile ? 0.8 : 1),
          ease: ease.out,
          stagger: stagger.list,
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: list, start: "top 85%", once: true },
        });
      }

      // Criado depois da trava: no refresh a seção já mede com o espaço que a trava acrescenta
      // (criado antes, ele terminava cedo e o vídeo parava no meio da cena).
      ScrollTrigger.create({ trigger: section, start: "top bottom", end: "bottom top", onToggle: (self) => setInView(self.isActive) });
      return () => setInView(false);
    },
    [mode],
  );

  return (
    <section ref={root} className="mag-scene" aria-labelledby={titleId} data-mode={mode}>
      <div className="mag-scene__head">
        <h2 id={titleId}>{scene.title}</h2>
        <p>{scene.intro}</p>
      </div>

      <div ref={frame} className="mag-scene__frame">
        <div className="mag-scene__stage">
          <svg className="mag-scene__rings" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
            {RINGS.map((r) => (
              <circle key={r} cx={800} cy={450} r={r} />
            ))}
          </svg>
          <div ref={ring} className="mag-scene__ring" aria-hidden="true" />
          <figure ref={figure} className="mag-scene__aperture">
            <video
              ref={attachVideo}
              className="mag-scene__video"
              muted
              loop
              playsInline
              preload={reduced || dataSaver ? "none" : "metadata"}
              poster={media.poster}
              width={media.width}
              height={media.height}
              aria-label={media.label}
            >
              {/* Com o codec declarado, o navegador que não decodifica VP9 pula direto para o MP4. */}
              {media.webm && <source src={media.webm} type='video/webm; codecs="vp9"' />}
              <source src={media.mp4} type="video/mp4" />
            </video>
          </figure>
        </div>

        <div ref={overlay} className="mag-scene__overlay">
          <dl ref={facts} className="mag-scene__facts">
            {scene.facts.map((fact) => (
              <div key={fact.value} className="mag-scene__fact">
                <dt>{fact.value}</dt>
                <dd>{fact.label}</dd>
              </div>
            ))}
          </dl>

          <div className="mag-scene__meta">
            <p className="mag-scene__credit">{scene.credit}</p>
            <button type="button" className="mag-scene__pause" onClick={toggleVideo}>
              {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
              <span>{playing ? "Pausar vídeo" : "Tocar vídeo"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Cobertura clínica: o painel da ficha técnica com uma coluna de cobertura e uma de observação.
 * No celular cada linha vira um bloco (região, cobertura e observação empilhadas), sem rolar de lado.
 * Os papéis ARIA explícitos mantêm a semântica de tabela quando o CSS troca o `display` das células.
 */
const CoverageTable = ({ caption, source, columns, rows }: CompareTableData) => (
  <div className="page-spec mag-coverage" data-reveal="media">
    <table role="table">
      <caption>{caption}</caption>
      <thead role="rowgroup">
        <tr role="row">
          <th role="columnheader" scope="col">
            <span className="sr-only">Região</span>
          </th>
          {columns.map((column) => (
            <th key={column.label} role="columnheader" scope="col">
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody role="rowgroup">
        {rows.map((row) => (
          <tr key={row.label} role="row">
            <th role="rowheader" scope="row">
              {row.label}
            </th>
            {row.values.map((value, index) => (
              <td key={columns[index]?.label ?? index} role="cell">
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    <p className="page-spec__source">Fonte: {source}</p>
  </div>
);

/** /solucoes/magnifico-open: a página-vitrine do Magnifico Open, a única interna com uma cena presa ao scroll. */
const MagnificoPage = () => {
  const { open, coverage, acquisition, installation, related } = magnifico;

  return (
    <PageShell title={magnifico.title} description={magnifico.description}>
      <PageHero
        tone="dark"
        title={magnifico.name}
        lead={magnifico.lead}
        crumbs={[
          { label: "Início", href: "/" },
          { label: "Soluções", href: "/solucoes" },
          { label: "Ressonância magnética", href: "/solucoes/ressonancia-magnetica" },
          { label: magnifico.name },
        ]}
        actions={[
          { label: "Conversar pelo WhatsApp", href: whatsappHref(magnifico.whatsappText), kind: "primary" },
          { label: magnifico.compare.label, href: magnifico.compare.href, kind: "quiet" },
        ]}
        eyebrow={magnifico.line}
      />

      <MagnificoScene />

      <PageSection id="aberta" title={open.title} intro={open.intro} media={magnificoMedia.laser}>
        <PointList items={open.points} />
      </PageSection>

      <PageSection id="cobertura-clinica" title={coverage.title} intro={coverage.intro}>
        <CoverageTable {...coverage.table} />
      </PageSection>

      <PageSection id="recursos" title={acquisition.title} intro={acquisition.intro} media={magnificoMedia.console}>
        <PointList items={acquisition.points} />
      </PageSection>

      <PageSection id="instalacao" title={installation.title} intro={installation.intro} media={magnificoMedia.equipment}>
        <PointList items={installation.points} />
      </PageSection>

      <PageSection id="ficha-tecnica" title="Dados técnicos">
        <SpecTable caption={`Ficha técnica do ${magnifico.name}`} source={magnifico.specSource} rows={magnifico.specs} />
      </PageSection>

      <PageSection id="perguntas" title="Perguntas frequentes">
        <Faq items={magnifico.faq} />
      </PageSection>

      <PageSection
        id="outras-ressonancias"
        title={related.title}
        intro={
          <>
            <p>{related.intro}</p>
            <Link className="text-link" to={related.link.href}>
              {related.link.label} <ArrowRight aria-hidden="true" />
            </Link>
          </>
        }
      >
        <CardGrid items={related.cards} />
      </PageSection>

      <PageContact
        paths={contactPaths({
          title: `Quero conversar sobre o ${magnifico.name}`,
          whatsappText: magnifico.whatsappText,
          href: magnifico.compare.href,
          linkLabel: "Comparar a linha de RM",
        })}
      />
    </PageShell>
  );
};

export default MagnificoPage;
