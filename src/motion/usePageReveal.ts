import type { RefObject } from "react";
import { duration, ease, gsap, stagger } from "@/lib/motion";
import { useMotionScope } from "@/motion/useMotionScope";

const once = (trigger: Element) => ({ trigger, start: "top 85%", once: true });

/**
 * Os três movimentos das páginas internas, uma vez cada, ao entrar na tela:
 * - `[data-reveal="title"]`: o título sobe por trás da máscara (clip-path + yPercent);
 * - `[data-reveal="media"]`: a mídia abre de um recorte 7% menor (inset) até o quadro inteiro;
 * - `[data-reveal="item"]`: os itens de um mesmo grupo entram em sequência curta (stagger 0,06).
 * O HTML já nasce no estado final. Com movimento reduzido, ou num navegador sem IntersectionObserver,
 * nada é animado; no celular o ritmo é o mesmo, com durações ×0,8.
 */
export function usePageReveal(root: RefObject<HTMLElement>) {
  useMotionScope(root, ({ desktop, mobile, reduced }) => {
    const scope = root.current;
    if (!scope || reduced || (!desktop && !mobile) || typeof IntersectionObserver === "undefined") return;
    const k = mobile ? 0.8 : 1;

    scope.querySelectorAll<HTMLElement>('[data-reveal="title"]').forEach((title) => {
      gsap.from(title, {
        clipPath: "inset(0 0 100% 0)",
        yPercent: 18,
        duration: duration.focal * k,
        ease: ease.out,
        // Sem o recorte no fim: acentos e descendentes da última linha não ficam cortados.
        clearProps: "clipPath,transform",
        scrollTrigger: once(title),
      });
    });

    scope.querySelectorAll<HTMLElement>('[data-reveal="media"]').forEach((media) => {
      gsap.fromTo(
        media,
        { clipPath: "inset(7% 7% round 14px)" },
        { clipPath: "inset(0% 0% round 14px)", duration: 0.6 * k, ease: ease.out, clearProps: "clipPath", scrollTrigger: once(media) },
      );
    });

    // Um gatilho por grupo (o pai comum), para que os itens de uma lista entrem juntos e em ordem.
    const groups = new Map<Element, HTMLElement[]>();
    scope.querySelectorAll<HTMLElement>('[data-reveal="item"]').forEach((item) => {
      const parent = item.parentElement ?? scope;
      groups.set(parent, [...(groups.get(parent) ?? []), item]);
    });
    groups.forEach((items, parent) => {
      gsap.from(items, {
        opacity: 0,
        y: 16,
        duration: duration.base * k,
        ease: ease.out,
        stagger: Math.min(stagger.list, stagger.max / items.length),
        clearProps: "opacity,transform",
        scrollTrigger: once(parent),
      });
    });
  });
}
