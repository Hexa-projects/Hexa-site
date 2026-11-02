export type StageMode = "immersive" | "light";

/** Quadros por segundo abaixo disso, em duas janelas seguidas, rebaixam para o modo leve. */
export const FPS_FLOOR = 45;

/**
 * Decide o rebaixamento a partir de janelas de 1 s medidas depois do carregamento.
 * Uma janela lenta isolada (decodificação de vídeo, fontes) não basta: precisa de duas seguidas.
 */
export function shouldDowngrade(windows: number[]): boolean {
  if (windows.length < 2) return false;
  const [previous, last] = windows.slice(-2);
  return previous < FPS_FLOOR && last < FPS_FLOOR;
}

export interface CapabilityInput {
  reducedMotion: boolean;
  saveData: boolean;
  webgl: boolean;
  cores: number | undefined;
  viewportWidth: number;
}

/** Spec 7.1: qualquer sinal de aparelho fraco ou preferência do visitante leva ao modo leve. */
export function decideStageMode({ reducedMotion, saveData, webgl, cores, viewportWidth }: CapabilityInput): StageMode {
  if (reducedMotion || saveData || !webgl) return "light";
  if (cores !== undefined && cores < 4) return "light";
  if (viewportWidth < 1024) return "light";
  return "immersive";
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl");
    // Libera o contexto de teste na hora: o navegador limita quantos contextos vivem juntos.
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return Boolean(gl);
  } catch {
    return false;
  }
}

/** `?palco=leve` ou `?palco=imersivo` fixam o modo, para teste e revisão. */
export function forcedStageMode(): StageMode | null {
  if (typeof window === "undefined") return null;
  const value = new URLSearchParams(window.location.search).get("palco");
  if (value === "leve") return "light";
  if (value === "imersivo") return "immersive";
  return null;
}

/** Lê os sinais do navegador. */
export function detectStageMode(): StageMode {
  if (typeof window === "undefined") return "light";
  const forced = forcedStageMode();
  if (forced) return forced;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return decideStageMode({
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    saveData: Boolean(connection?.saveData),
    webgl: hasWebGL(),
    cores: navigator.hardwareConcurrency || undefined,
    viewportWidth: window.innerWidth,
  });
}
