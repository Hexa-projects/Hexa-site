import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, MEDIA, registerMotion } from "@/lib/motion";

export interface MotionContext {
  desktop: boolean;
  mobile: boolean;
  reduced: boolean;
}

/**
 * useGSAP com os três contextos fixos de matchMedia. Tudo o que a cena cria fica
 * preso ao escopo e é revertido ao trocar de rota ou de contexto.
 */
export function useMotionScope(
  scope: RefObject<HTMLElement>,
  setup: (ctx: MotionContext) => void | (() => void),
  dependencies: unknown[] = [],
) {
  useGSAP(
    () => {
      registerMotion();
      const mm = gsap.matchMedia();
      mm.add(MEDIA, (context) => {
        const { desktop, mobile, reduced } = context.conditions as Record<keyof typeof MEDIA, boolean>;
        return setup({ desktop, mobile, reduced });
      });
    },
    { scope, dependencies },
  );
}
