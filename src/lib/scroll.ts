import type Lenis from "lenis";

/**
 * Rolagem do site. Quando a rolagem suave (Lenis) está ligada na home, ela é a dona da rolagem:
 * pedir à janela uma rolagem própria faria as duas brigarem.
 */
let smooth: Lenis | null = null;

export function registerSmoothScroller(instance: Lenis | null) {
  smooth = instance;
}

const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Desliza até a seção (instantâneo com movimento reduzido). O respiro do cabeçalho vem de `scroll-margin-top`. */
export function scrollToSection(element: HTMLElement) {
  // O Lenis já desconta o `scroll-margin-top` da seção.
  if (smooth) {
    smooth.scrollTo(element);
    return;
  }
  element.scrollIntoView({ behavior: prefersReduced() ? "auto" : "smooth", block: "start" });
}

/** Página nova começa no topo, sem animação: não é um deslocamento dentro da mesma página. */
export function resetScroll() {
  if (smooth) {
    smooth.scrollTo(0, { immediate: true });
    return;
  }
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}
