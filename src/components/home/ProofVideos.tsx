import { useRef, useState } from "react";
import { Play } from "lucide-react";
import type { MediaVideo } from "@/data/homeMedia";

/**
 * Vídeo de prova: pôster com o botão do sistema; os controles do navegador
 * só aparecem depois que a pessoa escolhe assistir.
 */
const ProofVideo = ({ video, caption, className }: { video: MediaVideo; caption: string; className: string }) => {
  const element = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
    const player = element.current;
    if (!player) return;
    void player.play()?.catch(() => {});
    player.focus();
  };

  return (
    <figure className={className}>
      <div className="proof__media">
        <video
          ref={element}
          controls={started}
          preload="none"
          playsInline
          poster={video.poster}
          width={video.width}
          height={video.height}
          aria-label={video.label}
        >
          <source src={video.mp4} type="video/mp4" />
        </video>
        {!started && (
          <button type="button" className="proof__play" onClick={start}>
            <Play aria-hidden="true" />
            <span>Assistir</span>
            <span className="sr-only">: {video.label}</span>
          </button>
        )}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
};

/** Prova: as pessoas da Hexamedical e de quem trabalha com ela, em vídeo publicado no site oficial. */
const ProofVideos = ({ ceo, testimonials }: { ceo: MediaVideo; testimonials: MediaVideo }) => (
  <section className="proof" aria-labelledby="proof-title">
    <div className="proof__head">
      <h2 id="proof-title">Quem responde pela Hexamedical</h2>
      <p>
        Clientes que recomendam e o CEO, Fábio, explicando como a empresa trabalha. Antes de qualquer proposta, vale ouvir quem conduz a
        Hexamedical e quem já esteve com ela em campo.
      </p>
    </div>
    <div className="proof__grid">
      <ProofVideo
        className="proof__main"
        video={ceo}
        caption="Fábio, CEO da Hexamedical, sobre o mercado de equipamentos e como adequar a solução à realidade de cada serviço."
      />
      <ProofVideo className="proof__side" video={testimonials} caption="Clientes contam por que confiam na Hexamedical. Depoimentos gravados em feira do setor." />
    </div>
  </section>
);

export default ProofVideos;
