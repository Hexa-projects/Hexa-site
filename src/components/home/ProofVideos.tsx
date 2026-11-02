import { useRef } from "react";
import type { MediaVideo } from "@/data/homeMedia";
import { ScrollTrigger } from "@/lib/motion";
import { useMotionScope } from "@/motion/useMotionScope";
import { tweenStage } from "@/motion/stage/align";
import type { StageMode } from "@/motion/capability";

const ProofVideo = ({ video, caption, className }: { video: MediaVideo; caption: string; className: string }) => (
  <figure className={className}>
    <video controls preload="none" playsInline poster={video.poster} width={video.width} height={video.height} aria-label={video.label}>
      <source src={video.mp4} type="video/mp4" />
    </video>
    <figcaption>{caption}</figcaption>
  </figure>
);

/** Prova: as pessoas da Hexamedical e de quem trabalha com ela, em vídeo publicado no site oficial. */
const ProofVideos = ({ ceo, testimonials, mode }: { ceo: MediaVideo; testimonials: MediaVideo; mode: StageMode }) => {
  const root = useRef<HTMLElement>(null);

  useMotionScope(
    root,
    ({ desktop }) => {
      if (desktop && mode === "immersive") {
        const dim = () => tweenStage({ center: [-0.42, -0.2], aperture: 0, glow: 0.18, rings: 10 });
        ScrollTrigger.create({ trigger: root.current, start: "top 55%", end: "bottom 45%", onEnter: dim, onEnterBack: dim });
      }
    },
    [mode],
  );

  return (
    <section ref={root} className="proof" aria-labelledby="proof-title">
      <div className="proof__head">
        <h2 id="proof-title">Quem responde pela Hexamedical</h2>
        <p>Antes de qualquer proposta, vale ouvir quem conduz a empresa e quem já esteve com ela em campo.</p>
      </div>
      <div className="proof__grid">
        <ProofVideo className="proof__main" video={ceo} caption="O CEO da Hexamedical sobre o mercado de equipamentos e como adequar a solução a cada serviço." />
        <ProofVideo className="proof__side" video={testimonials} caption="Por que confiar na Hexamedical? Depoimentos gravados em feira do setor." />
      </div>
    </section>
  );
};

export default ProofVideos;
