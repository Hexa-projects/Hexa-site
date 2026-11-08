import { useRef, useState } from "react";
import { Play } from "lucide-react";
import type { MediaVideo } from "@/data/homeMedia";

/**
 * Vídeo com pôster, como a prova da home: nada desce antes do clique (`preload="none"`),
 * e os controles do navegador só aparecem depois que a pessoa escolhe assistir.
 */
const PageVideo = ({ video, caption }: { video: MediaVideo; caption: string }) => {
  const element = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const vertical = video.height > video.width;

  const start = () => {
    setStarted(true);
    const player = element.current;
    if (!player) return;
    void player.play()?.catch(() => {});
    player.focus();
  };

  return (
    <figure className={vertical ? "page-video page-video--vertical" : "page-video"}>
      <div className="page-video__media" data-reveal="media">
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
          {video.webm && <source src={video.webm} type='video/webm; codecs="vp9"' />}
          <source src={video.mp4} type="video/mp4" />
        </video>
        {!started && (
          <button type="button" className="page-video__play" onClick={start}>
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

export default PageVideo;
