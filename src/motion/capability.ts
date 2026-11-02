export type StageMode = "immersive" | "light";

/** Média de quadros abaixo disso, nos primeiros 2 s do palco, rebaixa para o modo leve. */
export const FPS_FLOOR = 45;

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
    return Boolean(canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Lê os sinais do navegador. `?palco=leve` força o modo leve, para teste e revisão. */
export function detectStageMode(): StageMode {
  if (typeof window === "undefined") return "light";
  if (new URLSearchParams(window.location.search).get("palco") === "leve") return "light";
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return decideStageMode({
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    saveData: Boolean(connection?.saveData),
    webgl: hasWebGL(),
    cores: navigator.hardwareConcurrency || undefined,
    viewportWidth: window.innerWidth,
  });
}
