import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Pause, Play } from "lucide-react";
import { homeMedia } from "@/data/homeMedia";
import { duration, ease, gsap } from "@/lib/motion";
import { useMotionScope } from "@/motion/useMotionScope";
import { stageState } from "@/motion/stage/stageState";
import { circleToStage, stageBox, stopStageTweens } from "@/motion/stage/align";
import type { StageMode } from "@/motion/capability";
import { bannerClip, heroClip } from "./heroClip";

/** Raio inicial da abertura, em metades da menor dimensão da tela. */
const APERTURE_START = 0.42;
/** Raio aberto: passa da diagonal da tela, então o vídeo ocupa tudo. */
const APERTURE_OPEN = 2.2;
/** Deslocamento inicial do anel para a direita, deixando a coluna de texto livre. */
const CENTER_START = 0.2;

const isNarrow = () => typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches;
const prefersReduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * H1: entrar no túnel. O anel abre com o scroll até o equipamento real ocupar a tela
 * e depois se fecha no centro; a home clara começa logo depois.
 */
const HomeHero = ({ mode }: { mode: StageMode }) => {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const figure = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const pause = useRef<HTMLButtonElement>(null);
  const userPaused = useRef(false);
  const [narrow] = useState(isNarrow);
  const [reduced] = useState(prefersReduced);
  const [playing, setPlaying] = useState(!reduced);
  const media = narrow ? homeMedia.tunnel.mobile : homeMedia.tunnel.desktop;

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

  // O loop só roda com o hero na tela; o rótulo do botão segue o estado real do vídeo.
  useEffect(() => {
    const element = video.current;
    const box = frame.current;
    if (!element || !box) return;
    const sync = () => setPlaying(!element.paused);
    element.addEventListener("play", sync);
    element.addEventListener("pause", sync);
    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) element.pause();
        else if (!reduced && !userPaused.current) void element.play()?.catch(() => {});
      });
      observer.observe(box);
    }
    return () => {
      element.removeEventListener("play", sync);
      element.removeEventListener("pause", sync);
      observer?.disconnect();
    };
  }, [reduced]);

  useMotionScope(root, ({ desktop, mobile }) => {
    // O título sobe por trás de uma máscara, uma vez, no carregamento.
    if (title.current && (desktop || mobile)) {
      gsap.from(title.current, { clipPath: "inset(0 0 100% 0)", yPercent: 18, duration: duration.focal, ease: ease.out, delay: 0.1 });
    }

    if (desktop && frame.current && figure.current && copy.current) {
      const box = frame.current;
      const state = { progress: 0, aperture: APERTURE_START, cx: CENTER_START };
      const apply = () => {
        const viewport = stageBox();
        const clip = heroClip({ aperture: state.aperture, cx: state.cx, viewportWidth: viewport.width, viewportHeight: viewport.height });
        box.style.setProperty("--r", `${clip.radius}px`);
        box.style.setProperty("--cx", `${clip.x}px`);
        box.style.setProperty("--cy", `${clip.y}px`);
        // Durante o pin o hero é o dono do palco: nenhuma transição de outra seção disputa.
        stopStageTweens();
        stageState.set({ progress: state.progress, aperture: state.aperture, center: [state.cx, 0], glow: 0.7, rings: 20 });
      };
      apply();

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: box,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 0.6,
          onRefresh: apply,
        },
      });
      timeline
        // Abre: a câmera atravessa o túnel e o equipamento ocupa a tela.
        .to(state, { progress: 1, aperture: APERTURE_OPEN, cx: 0, duration: 0.55, ease: "power1.in", onUpdate: apply }, 0)
        // Opacidade (não visibility): os links continuam no Tab e reaparecem com foco (CSS :focus-within).
        .to(copy.current, { opacity: 0, xPercent: -8, pointerEvents: "none", duration: 0.2 }, 0.06)
        // Fecha: o vídeo volta para dentro do anel e o anel some no centro.
        .to(state, { progress: 1.6, aperture: 0, duration: 0.3, ease: "power2.in", onUpdate: apply }, 0.7)
        // Sem vídeo na tela, o controle de pausa sai junto.
        .to(pause.current, { opacity: 0, pointerEvents: "none", duration: 0.12 }, 0.82);
    }

    // Celular e tablet, modo imersivo: a abertura fica presa um trecho curto; o vídeo começa num
    // círculo e se abre até o banner, com o anel do palco abrindo junto, centrado no vídeo.
    if (mobile && mode === "immersive" && frame.current && figure.current) {
      const box = figure.current;
      const state = { open: 0, progress: 0 };
      const apply = () => {
        const rect = box.getBoundingClientRect();
        const clip = bannerClip({ width: rect.width, height: rect.height, open: state.open });
        // gsap.set (não style direto): ao trocar de contexto (girar a tela, rebaixar), o GSAP desfaz o recorte.
        gsap.set(box, { clipPath: clip.css });
        stopStageTweens();
        const { center, aperture } = circleToStage(rect.left + rect.width / 2, rect.top + rect.height / 2, clip.ring);
        stageState.set({ progress: state.progress, aperture, center, glow: 0.7, rings: 20 });
      };
      apply();
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: frame.current,
            start: "clamp(bottom bottom)",
            end: "+=80%",
            pin: true,
            scrub: 0.6,
            onRefresh: apply,
            onUpdate: apply,
          },
        })
        .to(state, { open: 1, progress: 1, duration: 0.75, ease: "power1.inOut", onUpdate: apply })
        .to(state, { progress: 1.3, duration: 0.25, onUpdate: apply });
    } else if (mobile && figure.current) {
      // Modo leve: o banner se abre uma vez a partir de uma moldura menor.
      gsap.fromTo(
        figure.current,
        { clipPath: "inset(7% 7% round 14px)" },
        { clipPath: "inset(0% 0% round 14px)", duration: 0.6, ease: ease.out, scrollTrigger: { trigger: figure.current, start: "top 85%", once: true } },
      );
    }
  }, [mode]);

  return (
    <section ref={root} className="hero" aria-labelledby="hero-title" data-mode={mode} data-header-theme="dark">
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
        </figure>
        <p className="hero__credit">Esaote Magnifico Open</p>

        <div ref={copy} className="hero__copy">
          <h1 id="hero-title" ref={title} className="hero__title">
            Do projeto da sala à última manutenção.
          </h1>
          <p className="hero__lead">
            Ressonância magnética Esaote, de tecnologia italiana, com projeto da sala, instalação, manutenção e laboratório próprio. Um só
            parceiro técnico para clínicas, hospitais, universidades e centros veterinários em todo o Brasil.
          </p>
          <div className="hero__actions">
            <Link to="/solucoes" className="button button--primary">
              Encontrar a solução certa <ArrowRight aria-hidden="true" />
            </Link>
            <Link to="/#contato" className="button button--quiet">
              Falar com especialista
            </Link>
          </div>
        </div>

        <button ref={pause} type="button" className="hero__pause" onClick={toggleVideo}>
          {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          <span>{playing ? "Pausar vídeo" : "Tocar vídeo"}</span>
        </button>
      </div>
    </section>
  );
};

export default HomeHero;
