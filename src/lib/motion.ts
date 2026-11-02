import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

/** Tokens de movimento (spec, seção 3). Espelhados em --dur-* e --ease-* no CSS. */
export const duration = { instant: 0.12, quick: 0.24, base: 0.45, focal: 0.8 } as const;
export const ease = { out: "expo.out", inOut: "power2.inOut", scan: "none", exit: "power2.in" } as const;
export const stagger = { list: 0.06, max: 0.4 } as const;

/** Os três contextos fixos de gsap.matchMedia: cada cena declara as três versões. */
export const MEDIA = {
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
} as const;

let registered = false;

/** Registra os plugins num único lugar. Pode ser chamado várias vezes. */
export function registerMotion(): void {
  if (registered) return;
  gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);
  registered = true;
}

/** O Flip só desce quando o visitante usa o filtro do portfólio. */
export async function loadFlip() {
  const { Flip } = await import("gsap/Flip");
  gsap.registerPlugin(Flip);
  return Flip;
}

export { gsap, ScrollTrigger };
