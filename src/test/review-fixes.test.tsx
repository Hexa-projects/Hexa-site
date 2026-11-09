import { fireEvent, render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { tweenStage } from "@/motion/stage/align";
import { stageState } from "@/motion/stage/stageState";
import { shouldDowngrade } from "@/motion/capability";
import { bannerClip, heroClip } from "@/components/home/heroClip";
import RouteErrorBoundary from "@/components/RouteErrorBoundary";
import Index from "@/pages/Index";

const renderHome = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={["/"]}>
        <Index />
      </MemoryRouter>
    </HelmetProvider>,
  );

describe("palco: transições", () => {
  it("o centro do anel continua um par de números no meio da transição", () => {
    stageState.set({ center: [0, 0] });
    const tween = tweenStage({ center: [0.4, -0.2], aperture: 0.3 });
    tween.progress(0.5);
    const { center } = stageState.params;
    expect(Array.isArray(center)).toBe(true);
    expect(center.every((value) => typeof value === "number" && Number.isFinite(value))).toBe(true);
    expect(center[0]).toBeGreaterThan(0);
    expect(center[1]).toBeLessThan(0);
    tween.progress(1);
    // O GSAP grava um cache interno no próprio array; compara só os valores.
    expect([...stageState.params.center]).toEqual([0.4, -0.2]);
  });
});

describe("palco: rebaixamento", () => {
  it("só rebaixa com duas janelas lentas seguidas", () => {
    expect(shouldDowngrade([30])).toBe(false);
    expect(shouldDowngrade([30, 60])).toBe(false);
    expect(shouldDowngrade([60, 30, 30])).toBe(true);
    expect(shouldDowngrade([59, 61])).toBe(false);
  });
});

describe("abertura: círculo do vídeo no mesmo referencial do anel", () => {
  it("usa a viewport (não a caixa do hero) para raio e centro", () => {
    const clip = heroClip({ aperture: 0.42, cx: 0.2, viewportWidth: 1280, viewportHeight: 585 });
    expect(clip.radius).toBeCloseTo(0.42 * 0.5 * 585 - 3, 5);
    expect(clip.x).toBeCloseTo(1280 * 0.7, 5);
    expect(clip.y).toBeCloseTo(585 / 2, 5);
  });
});

describe("abertura no celular: o círculo vira banner", () => {
  it("começa como um círculo centrado no banner, com 90% da altura", () => {
    const clip = bannerClip({ width: 343, height: 193, open: 0 });
    expect(clip.top).toBeCloseTo((193 - 0.9 * 193) / 2, 5);
    expect(clip.side).toBeCloseTo((343 - 0.9 * 193) / 2, 5);
    expect(clip.radius).toBeCloseTo((0.9 * 193) / 2, 5);
    expect(clip.ring).toBeCloseTo((0.9 * 193) / 2, 5);
  });

  it("termina como o banner inteiro, com cantos de 14 px, e o anel passa da diagonal", () => {
    const clip = bannerClip({ width: 343, height: 193, open: 1 });
    expect([clip.top, clip.side, clip.radius]).toEqual([0, 0, 14]);
    expect(clip.ring).toBeGreaterThan(Math.hypot(343, 193) / 2);
    expect(clip.css).toBe("inset(0px 0px round 14px)");
  });

  it("no meio do caminho, interpola recorte, cantos e anel", () => {
    const start = bannerClip({ width: 343, height: 193, open: 0 });
    const end = bannerClip({ width: 343, height: 193, open: 1 });
    const middle = bannerClip({ width: 343, height: 193, open: 0.5 });
    expect(middle.side).toBeCloseTo(start.side / 2, 5);
    expect(middle.radius).toBeCloseTo((start.radius + end.radius) / 2, 5);
    expect(middle.ring).toBeCloseTo((start.ring + end.ring) / 2, 5);
  });
});

describe("rotas: falha de carregamento", () => {
  it("mostra uma saída quando o pacote da página não carrega", () => {
    const Broken = () => {
      throw new Error("Failed to fetch dynamically imported module");
    };
    const original = console.error;
    console.error = () => {};
    render(
      <RouteErrorBoundary>
        <Broken />
      </RouteErrorBoundary>,
    );
    console.error = original;
    expect(screen.getByRole("heading", { name: /não carregou/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /recarregar/i })).toBeInTheDocument();
  });
});

describe("home: ajustes da revisão", () => {
  it("os vídeos de prova mostram um botão próprio e só ganham controles ao tocar", () => {
    renderHome();
    const region = screen.getByRole("region", { name: "Quem já trabalhou com a gente" });
    const buttons = within(region).getAllByRole("button", { name: /^Assistir/ });
    expect(buttons).toHaveLength(2);
    const videos = region.querySelectorAll("video");
    for (const video of videos) expect(video).not.toHaveAttribute("controls");
    fireEvent.click(buttons[0]);
    expect(videos[0]).toHaveAttribute("controls");
  });

  it("o filtro do portfólio anuncia quantos equipamentos ficaram", () => {
    renderHome();
    const region = screen.getByRole("region", { name: "Equipamentos" });
    fireEvent.click(within(region).getByRole("button", { name: "Software" }));
    expect(within(region).getByRole("status")).toHaveTextContent("1 equipamento");
  });

  it("a triagem mostra o anel sem depender de hover", () => {
    renderHome();
    const region = screen.getByRole("region", { name: "Fale com a equipe certa" });
    for (const row of region.querySelectorAll(".triage__row")) expect(row).toHaveClass("is-ring");
  });

  it("cada anel da triagem marca a etapa da vida do equipamento que responde", () => {
    renderHome();
    const region = screen.getByRole("region", { name: "Fale com a equipe certa" });
    const marks = Array.from(region.querySelectorAll(".triage__node")).map((node) => node.getAttribute("data-stage"));
    expect(marks).toEqual(["escolha", "manutencao", "laboratorio"]);
    expect(within(region).getByText("Etapa: Escolha", { exact: false })).toBeInTheDocument();
  });

  it("cada etapa no celular tem a foto no anel com os seis hexágonos", () => {
    renderHome();
    const region = screen.getByRole("region", { name: "Uma equipe só, da compra ao reparo" });
    const badges = region.querySelectorAll(".lifecycle__badge");
    expect(badges).toHaveLength(6);
    badges.forEach((badge, index) => {
      expect(badge.querySelectorAll(".lifecycle__badge-node")).toHaveLength(6);
      expect(badge.querySelectorAll(".lifecycle__badge-node.is-reached")).toHaveLength(index + 1);
    });
  });
});
