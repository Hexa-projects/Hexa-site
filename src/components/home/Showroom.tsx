import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { showroomFilters, type ShowroomFilter, type ShowroomItem } from "@/data/home";
import type { Flip as FlipPlugin } from "gsap/Flip";
import { duration, ease, gsap, loadFlip } from "@/lib/motion";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** H3: o portfólio inteiro, com filtro por modalidade. */
const Showroom = ({ items }: { items: ShowroomItem[] }) => {
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

  return (
    <section className="showroom" aria-labelledby="showroom-title">
      <div className="showroom__head">
        <h2 id="showroom-title">Equipamentos</h2>
        <p>
          A linha principal é a ressonância aberta Esaote, de ímã permanente: consome até 3 kW e não usa hélio líquido. Também trabalhamos
          com ressonância e tomografia veterinárias, radiografia digital Mindray, bombas injetoras de contraste e o software HexAI. Cada
          equipamento tem uma página com os dados do fabricante.
        </p>
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
              {item.spec && <span className="showroom__spec">{item.spec}</span>}
              {/* Mesmo rótulo em todos os cards, todos levando à página interna do equipamento. */}
              <span className="showroom__go">
                Ver equipamento <ArrowRight aria-hidden="true" />
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
