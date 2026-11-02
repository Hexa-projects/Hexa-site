import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { showroomFilters, type ShowroomFilter, type ShowroomItem } from "@/data/home";
import type { Flip as FlipPlugin } from "gsap/Flip";
import { duration, ease, gsap, loadFlip, ScrollTrigger } from "@/lib/motion";
import { useMotionScope } from "@/motion/useMotionScope";
import { tweenStage } from "@/motion/stage/align";
import type { StageMode } from "@/motion/capability";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** H3: o portfólio inteiro no palco, com filtro por modalidade. */
const Showroom = ({ items, mode }: { items: ShowroomItem[]; mode: StageMode }) => {
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLUListElement>(null);
  const flipState = useRef<ReturnType<typeof FlipPlugin.getState> | null>(null);
  const flip = useRef<typeof FlipPlugin | null>(null);
  const [filter, setFilter] = useState<ShowroomFilter>("todos");
  const visibleCount = items.filter((item) => filter === "todos" || item.filters.includes(filter as Exclude<ShowroomFilter, "todos">)).length;

  const preloadFlip = () => {
    if (!flip.current && !reducedMotion()) void loadFlip().then((plugin) => (flip.current = plugin));
  };

  const choose = (next: ShowroomFilter) => {
    if (next === filter) return;
    if (grid.current && flip.current && !reducedMotion()) {
      flipState.current = flip.current.getState(grid.current.querySelectorAll(".showroom__item"));
    }
    setFilter(next);
  };

  // Depois do re-render, os itens deslizam para as novas posições.
  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state || !flip.current) return;
    flipState.current = null;
    flip.current.from(state, {
      duration: duration.base,
      ease: ease.out,
      absolute: false,
      onEnter: (elements) => gsap.fromTo(elements, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: duration.base, ease: ease.out }),
    });
  }, [filter]);

  useMotionScope(
    root,
    ({ desktop }) => {
      if (desktop && mode === "immersive") {
        const toBackdrop = () => tweenStage({ center: [0.36, 0.3], aperture: 0, glow: 0.25, rings: 12 });
        ScrollTrigger.create({ trigger: root.current, start: "top 55%", end: "bottom 45%", onEnter: toBackdrop, onEnterBack: toBackdrop });
      }
    },
    [mode],
  );

  return (
    <section ref={root} className="showroom" aria-labelledby="showroom-title">
      <div className="showroom__head">
        <h2 id="showroom-title">Portfólio</h2>
        <p>Ressonância, tomografia veterinária, radiografia digital, bombas injetoras e software. Cada linha tem página própria, com dados do fabricante.</p>
      </div>

      <div className="showroom__filters" role="group" aria-label="Filtrar por modalidade" onPointerEnter={preloadFlip} onFocus={preloadFlip}>
        {showroomFilters.map((option) => (
          <button key={option.id} type="button" className="chip" aria-pressed={filter === option.id} onClick={() => choose(option.id)}>
            {option.label}
          </button>
        ))}
      </div>

      <p className="sr-only" role="status">
        {visibleCount === 1 ? "1 equipamento" : `${visibleCount} equipamentos`}
      </p>

      <ul ref={grid} className="showroom__grid">
        {items.map((item) => {
          const hidden = filter !== "todos" && !item.filters.includes(filter as Exclude<ShowroomFilter, "todos">);
          const body = (
            <>
              <span className="showroom__plinth">
                <img src={item.image.src} width={item.image.width} height={item.image.height} alt={item.image.alt} loading="lazy" decoding="async" />
              </span>
              <span className="showroom__name">{item.name}</span>
              <span className="showroom__line">{item.line}</span>
              <span className="showroom__go">
                {item.external ? "Página do equipamento" : "Ver equipamento"}
                {item.external ? <ArrowUpRight aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
              </span>
            </>
          );
          return (
            <li key={item.id} className={item.fill ? "showroom__item showroom__item--fill" : "showroom__item"} data-flip-id={item.id} hidden={hidden}>
              {item.external ? (
                <a href={item.href} className="showroom__link">{body}</a>
              ) : (
                <Link to={item.href} className="showroom__link">{body}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Showroom;
