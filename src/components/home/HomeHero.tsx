import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Pause, Play } from "lucide-react";
import { homeMedia } from "@/data/homeMedia";
import { duration, ease, gsap, ScrollTrigger, SplitText } from "@/lib/motion";
import { useMotionScope } from "@/motion/useMotionScope";
import { stageState } from "@/motion/stage/stageState";
import type { StageMode } from "@/motion/capability";

/** Raio inicial da abertura, em metades da menor dimensão da tela. */
const APERTURE_START = 0.42;
/** Raio final: passa da diagonal da tela, então o vídeo ocupa tudo. */
const APERTURE_END = 2.2;
/** Deslocamento inicial do anel para a direita, deixando a coluna de texto livre. */
const CENTER_START = 0.2;

const isNarrow = () => typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches;
const prefersReduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** H1: entrar no túnel. O anel abre com o scroll até o equipamento real ocupar a tela. */
const HomeHero = ({ mode }: { mode: StageMode }) => {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const figure = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const [narrow] = useState(isNarrow);
  const [reduced] = useState(prefersReduced);
  const [playing, setPlaying] = useState(!reduced);
  const media = narrow ? homeMedia.tunnel.mobile : homeMedia.tunnel.desktop;

  const toggleVideo = () => {
    const element = video.current;
    if (!element) return;
    if (element.paused) {
      void element.play();
      setPlaying(true);
    } else {
      element.pause();
      setPlaying(false);
    }
  };

  useMotionScope(
    root,
    ({ desktop, mobile }) => {
      if (title.current && (desktop || mobile)) {
        SplitText.create(title.current, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, { yPercent: 105, duration: duration.focal, ease: ease.out, stagger: 0.08, delay: 0.1 }),
        });
      }

      if (desktop && frame.current && figure.current && copy.current) {
        const box = frame.current;
        const state = { progress: 0, aperture: APERTURE_START, cx: CENTER_START };
        const apply = () => {
          const unit = 0.5 * Math.min(box.clientWidth, box.clientHeight);
          box.style.setProperty("--r", `${state.aperture * unit}px`);
          box.style.setProperty("--cx", `${50 + state.cx * 100}%`);
          stageState.set({ progress: state.progress, aperture: state.aperture, center: [state.cx, 0], glow: 0.7, rings: 20 });
        };
        apply();

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: box,
            start: "top top",
            end: "+=130%",
            pin: true,
            scrub: 0.6,
            onRefresh: apply,
          },
        });
        timeline
          .to(state, { progress: 1, aperture: APERTURE_END, cx: 0, duration: 1, ease: "power1.in", onUpdate: apply }, 0)
          .to(copy.current, { xPercent: -8, autoAlpha: 0, duration: 0.35 }, 0.12);

        // Ao sair da abertura o anel some do centro; as seções seguintes o reposicionam.
        ScrollTrigger.create({
          trigger: box,
          start: "bottom top",
          onEnter: () => stageState.set({ aperture: 0 }),
        });
      }

      if (mobile && figure.current) {
        gsap.fromTo(
          figure.current,
          { "--a": 0.62 },
          { "--a": 0.94, duration: 0.6, ease: ease.out, scrollTrigger: { trigger: figure.current, start: "top 80%", once: true } },
        );
      }
    },
    [mode],
  );

  return (
    <section ref={root} className="hero" aria-labelledby="hero-title" data-mode={mode}>
      <div ref={frame} className="hero__frame">
        <figure ref={figure} className="hero__aperture">
          <video
            ref={video}
            className="hero__video"
            autoPlay={!reduced}
            muted
            loop
            playsInline
            preload={reduced ? "none" : "auto"}
            poster={media.poster}
            width={media.width}
            height={media.height}
            aria-label={media.label}
          >
            {media.webm && <source src={media.webm} type="video/webm" />}
            <source src={media.mp4} type="video/mp4" />
          </video>
          <figcaption className="hero__credit">Esaote Magnifico Open</figcaption>
        </figure>

        <div ref={copy} className="hero__copy">
          <h1 id="hero-title" ref={title} className="hero__title">
            Do projeto da sala à última manutenção.
          </h1>
          <p className="hero__lead">
            Equipamentos de diagnóstico por imagem, instalação e suporte técnico especializado em uma só operação, durante toda a vida do equipamento.
          </p>
          <div className="hero__actions">
            <Link to="/solucoes" className="button button--primary">
              Encontrar a solução certa <ArrowRight aria-hidden="true" />
            </Link>
            <Link to="/contato" className="button button--quiet">
              Falar com especialista
            </Link>
          </div>
        </div>

        <button type="button" className="hero__pause" onClick={toggleVideo}>
          {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          <span>{playing ? "Pausar vídeo" : "Tocar vídeo"}</span>
        </button>
      </div>
    </section>
  );
};

export default HomeHero;
