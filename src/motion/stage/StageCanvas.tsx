import { useEffect, useRef, useState } from "react";
import { FPS_FLOOR, forcedStageMode, type StageMode } from "@/motion/capability";
import { createStage } from "./gl";
import { stageState } from "./stageState";

const MAX_DPR = 1.5;
const FPS_WINDOW_MS = 2000;
const WARMUP_MS = 600;

/** Anéis do túnel em SVG estático: a reserva leve, sem custo de GPU. */
export const StageFallback = () => {
  const rings = Array.from({ length: 9 }, (_, k) => 50 / (1 + k * 0.42));
  return (
    <div className="stage-fallback" aria-hidden="true">
      <svg viewBox="-50 -50 100 100" preserveAspectRatio="xMidYMid slice" focusable="false">
        {rings.map((r, k) => (
          <circle key={r} r={r} fill="none" stroke="currentColor" strokeWidth={0.12} opacity={0.5 - k * 0.04} />
        ))}
        <circle className="stage-fallback__rim" r={18} fill="none" strokeWidth={0.3} />
      </svg>
    </div>
  );
};

interface StageCanvasProps {
  mode: StageMode;
  /** Chamado quando o aparelho não sustenta o palco; a página passa para o modo leve. */
  onDowngrade?: () => void;
}

/** Palco contínuo da home (peças B1, B2 e B6). */
const StageCanvas = ({ mode, onDowngrade }: StageCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  const immersive = mode === "immersive" && !failed;

  useEffect(() => {
    if (!immersive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const stage = createStage(canvas);
    if (!stage) {
      setFailed(true);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    const resize = () => stage.resize(window.innerWidth, window.innerHeight, dpr);
    resize();

    const onPointer = (event: PointerEvent) => {
      stageState.params.pointer = [event.clientX, window.innerHeight - event.clientY];
    };

    let frame = 0;
    let running = true;
    const start = performance.now();
    let frames = 0;
    let measureStart = start;
    // Com o modo fixado pela URL, não há rebaixamento automático.
    let measured = forcedStageMode() !== null;

    const loop = (now: number) => {
      if (!running) return;
      stage.render(stageState.params, (now - start) / 1000, dpr);
      // A medição ignora o aquecimento (compilação do shader, montagem da página).
      if (!measured && now - start > WARMUP_MS) {
        if (frames === 0) measureStart = now;
        frames += 1;
        const elapsed = now - measureStart;
        if (elapsed >= FPS_WINDOW_MS) {
          measured = true;
          if ((frames * 1000) / elapsed < FPS_FLOOR) {
            running = false;
            onDowngrade?.();
            setFailed(true);
            return;
          }
        }
      }
      frame = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        // Uma aba oculta não mede nada: medir com ela escondida rebaixaria à toa.
        measured = true;
        cancelAnimationFrame(frame);
      } else if (!running) {
        running = true;
        measured = true;
        frame = requestAnimationFrame(loop);
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    frame = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      stage.dispose();
    };
  }, [immersive, onDowngrade]);

  if (!immersive) return <StageFallback />;
  return <canvas ref={canvasRef} className="stage-canvas" aria-hidden="true" />;
};

export default StageCanvas;
