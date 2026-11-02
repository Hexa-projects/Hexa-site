import { gsap } from "@/lib/motion";
import { duration, ease } from "@/lib/motion";
import { stageState, type StageParams } from "./stageState";

export type StageBox = { width: number; height: number };

/** Referencial do palco: o canvas fixo ocupa a viewport sem a barra de rolagem. */
export function stageBox(): StageBox {
  return { width: document.documentElement.clientWidth, height: window.innerHeight };
}

/**
 * Converte um círculo da página (centro e raio em pixels da viewport) para as
 * unidades do shader: centro em fração da tela (y para cima) e raio em metades da menor dimensão.
 */
export function circleToStage(cx: number, cy: number, radius: number, box: StageBox = stageBox()): Pick<StageParams, "center" | "aperture"> {
  return {
    center: [(cx - box.width / 2) / box.width, (box.height / 2 - cy) / box.height],
    aperture: radius / (0.5 * Math.min(box.width, box.height)),
  };
}

/** O círculo de um elemento da página, nas unidades do shader. */
export function stageCircleOf(element: Element): Pick<StageParams, "center" | "aperture"> {
  const rect = element.getBoundingClientRect();
  return circleToStage(rect.left + rect.width / 2, rect.top + rect.height / 2, rect.width / 2);
}

/**
 * Transição suave entre papéis do anel; a última chamada vence.
 * O centro é tweenado por índice: um array inteiro viraria string no meio do tween.
 */
export function tweenStage(target: Partial<StageParams>) {
  const { center, ...scalars } = target;
  const timeline = gsap.timeline({ defaults: { duration: duration.focal, ease: ease.inOut } });
  timeline.to(stageState.params, { ...scalars, overwrite: "auto" }, 0);
  if (center) timeline.to(stageState.params.center, { 0: center[0], 1: center[1], overwrite: "auto" }, 0);
  return timeline;
}

/** Interrompe qualquer transição do anel (quando um scrub assume o controle direto). */
export function stopStageTweens() {
  gsap.killTweensOf(stageState.params);
  gsap.killTweensOf(stageState.params.center);
}
