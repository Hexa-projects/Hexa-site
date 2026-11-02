import { gsap } from "@/lib/motion";
import { duration, ease } from "@/lib/motion";
import { stageState, type StageParams } from "./stageState";

/** Referencial do palco: o canvas fixo ocupa a viewport sem a barra de rolagem. */
function stageBox() {
  const root = document.documentElement;
  return { width: root.clientWidth, height: window.innerHeight };
}

/**
 * Converte um círculo da página (centro e raio em pixels da viewport) para as
 * unidades do shader: centro em fração da tela e raio em metades da menor dimensão.
 */
export function circleToStage(cx: number, cy: number, radius: number): Pick<StageParams, "center" | "aperture"> {
  const { width, height } = stageBox();
  return {
    center: [(cx - width / 2) / width, (height / 2 - cy) / height],
    aperture: radius / (0.5 * Math.min(width, height)),
  };
}

/** Leva o anel do palco até contornar um elemento circular da página. */
export function alignStageTo(element: Element, extra: Partial<StageParams> = {}) {
  const rect = element.getBoundingClientRect();
  const target = circleToStage(rect.left + rect.width / 2, rect.top + rect.height / 2, rect.width / 2);
  return tweenStage({ ...target, ...extra });
}

/** Transição suave entre papéis do anel; a última chamada vence. */
export function tweenStage(target: Partial<StageParams>) {
  return gsap.to(stageState.params, {
    ...target,
    duration: duration.focal,
    ease: ease.inOut,
    overwrite: "auto",
  });
}
