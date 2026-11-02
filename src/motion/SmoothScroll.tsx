import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger, registerMotion } from "@/lib/motion";

/**
 * Rolagem suave só no desktop (peça B3). Não muda direção nem velocidade final:
 * só suaviza a interpolação. No toque, fica a rolagem nativa.
 */
const SmoothScroll = ({ enabled }: { enabled: boolean }) => {
  useEffect(() => {
    if (!enabled) return;
    registerMotion();
    const lenis = new Lenis({ lerp: 0.1, syncTouch: false, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, [enabled]);

  return null;
};

export default SmoothScroll;
