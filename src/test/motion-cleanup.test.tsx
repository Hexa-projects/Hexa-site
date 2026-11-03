import { useRef } from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScrollTrigger } from "@/lib/motion";
import { useMotionScope } from "@/motion/useMotionScope";

/** Uma cena mínima que cria um ScrollTrigger em todo contexto. */
const Scene = ({ dep }: { dep: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useMotionScope(
    ref,
    () => {
      ScrollTrigger.create({ trigger: ref.current, start: "top top" });
    },
    [dep],
  );
  return <div ref={ref}>cena</div>;
};

// Simula um desktop sem preferência de movimento reduzido, para o contexto "desktop" rodar.
window.matchMedia = ((query: string) => ({
  matches: query.includes("min-width: 1024px") || (query.includes("no-preference") && !query.includes("max-width")),
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
})) as typeof window.matchMedia;

// Este arquivo roda num registro de módulos novo: o primeiro mount é o primeiro de verdade.
describe("limpeza das cenas", () => {
  it("o primeiro mount de todos não deixa ScrollTriggers vivos ao desmontar", () => {
    const { unmount } = render(<Scene dep="a" />);
    expect(ScrollTrigger.getAll().length).toBeGreaterThan(0);
    unmount();
    expect(ScrollTrigger.getAll()).toHaveLength(0);
  });

  it("mudar a dependência (rebaixar o palco) troca a cena em vez de empilhar outra", () => {
    const { rerender, unmount, getByText } = render(<Scene dep="imersivo" />);
    const element = getByText("cena");
    const own = () => ScrollTrigger.getAll().filter((trigger) => trigger.trigger === element).length;
    expect(own()).toBe(1);
    rerender(<Scene dep="leve" />);
    expect(own()).toBe(1);
    unmount();
    expect(own()).toBe(0);
  });
});
