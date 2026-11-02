import { useEffect, useRef, useState } from "react";
import { forcedStageMode, shouldDowngrade, type StageMode } from "@/motion/capability";
import { createStage } from "./gl";
import { stageState } from "./stageState";

const MAX_DPR = 1.5;
const WINDOW_MS = 1000;
/** Espera depois do evento load antes de medir: vídeo, fontes e ScrollTrigger já assentaram. */
const SETTLE_MS = 800;
/** Abertura acima disso: o vídeo do hero cobre a tela inteira e o palco não aparece. */
const COVERED_APERTURE = 2.05;

/** Anéis do túnel em SVG estático: a reserva leve, sem custo de GPU. */
export const StageFallback = () => {
  const rings = Array.from({ length: 9 }, (_, k) => 50 / (1 + k * 0.42));
  return (
    <div className="stage-fallback" aria-hidden="true">
      <svg viewBox="-50 -50 100 100" preserveAspectRatio="xMidYMid slice" focusable="false">
        {rings.map((r, k) => (
          <circle key={r} r={r} fill="none" stroke="currentColor" strokeWidth={0.12} opacity={0.5 - k * 0.04} />
        ))}
        <circle className="stage-fallback__rim" r={13} fill="none" strokeWidth={0.3} />
      </svg>
    </div>
  );
};

interface StageCanvasProps {
  mode: StageMode;
  /** Chamado quando o aparelho não sustenta o palco; a página passa para o modo leve. */
  onDowngrade?: () => void;
}

const afterLoad = (callback: () => void) => {
  if (document.readyState === "complete") callback();
  else window.addEventListener("load", callback, { once: true });
};

/** Palco contínuo da home (peças B1, B2 e B6). */
const StageCanvas = ({ mode, onDowngrade }: StageCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  const immersive = mode === "immersive" && !failed;

  useEffect(() => {
    if (!immersive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const fail = () => {
      setFailed(true);
      onDowngrade?.();
    };
    const stage = createStage(canvas);
    if (!stage) {
      fail();
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    // O tamanho vem do próprio canvas (sem a barra de rolagem), o mesmo referencial do CSS.
    const resize = () => stage.resize(canvas.clientWidth, canvas.clientHeight, dpr);
    resize();

    const onPointer = (event: PointerEvent) => {
      stageState.params.pointer = [event.clientX, canvas.clientHeight - event.clientY];
    };

    let frame = 0;
    let running = true;
    const start = performance.now();
    // Medição: janelas de 1 s depois do load; com o modo fixado pela URL, não mede.
    let measuring = false;
    let measured = forcedStageMode() !== null;
    let windowStart = 0;
    let windowFrames = 0;
    const windows: number[] = [];
    let settleTimer = 0;
    if (!measured) {
      afterLoad(() => {
        settleTimer = window.setTimeout(() => {
          measuring = true;
          windowStart = performance.now();
        }, SETTLE_MS);
      });
    }

    const loop = (now: number) => {
      if (!running) return;
      const { params } = stageState;
      if (params.visible && params.aperture < COVERED_APERTURE) {
        stage.render(params, (now - start) / 1000, dpr);
      }
      if (measuring && !measured) {
        windowFrames += 1;
        if (now - windowStart >= WINDOW_MS) {
          windows.push((windowFrames * 1000) / (now - windowStart));
          windowFrames = 0;
          windowStart = now;
          if (shouldDowngrade(windows)) {
            running = false;
            fail();
            return;
          }
          if (windows.length >= 3) measured = true;
        }
      }
      frame = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        // Uma aba oculta não mede nada: a janela atual é descartada.
        windowFrames = 0;
        cancelAnimationFrame(frame);
      } else if (!running) {
        running = true;
        windowStart = performance.now();
        frame = requestAnimationFrame(loop);
      }
    };

    const onContextLost = (event: Event) => {
      event.preventDefault();
      running = false;
      fail();
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("webglcontextlost", onContextLost);
    frame = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      stage.dispose();
    };
  }, [immersive, onDowngrade]);

  if (!immersive) return <StageFallback />;
  return <canvas ref={canvasRef} className="stage-canvas" aria-hidden="true" />;
};

export default StageCanvas;
