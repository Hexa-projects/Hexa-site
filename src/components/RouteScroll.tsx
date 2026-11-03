import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { resetScroll, scrollToSection } from "@/lib/scroll";

/** Quantos quadros esperar pela seção: a página de destino pode estar carregando (rotas sob demanda). */
const MAX_FRAMES = 90;

/**
 * Rolagem nas trocas de rota. Link com âncora (`/#contato`) desliza até a seção; página nova abre
 * no topo; voltar e avançar no histórico ficam com o navegador.
 */
const RouteScroll = () => {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();
  const previousPath = useRef(pathname);

  useEffect(() => {
    const changedPage = previousPath.current !== pathname;
    previousPath.current = pathname;

    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      let frame = 0;
      let handle = 0;
      const find = () => {
        const target = document.getElementById(id);
        if (target) return scrollToSection(target);
        if (++frame < MAX_FRAMES) handle = requestAnimationFrame(find);
      };
      find();
      return () => cancelAnimationFrame(handle);
    }

    if (changedPage && navigationType !== "POP") resetScroll();
  }, [pathname, hash, key, navigationType]);

  return null;
};

export default RouteScroll;
