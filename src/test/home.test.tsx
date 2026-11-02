import { fireEvent, render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Index from "@/pages/Index";
import { showroom, triage, whatsappHref } from "@/data/home";

const renderHome = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={["/"]}>
        <Index />
      </MemoryRouter>
    </HelmetProvider>,
  );

describe("home", () => {
  it("abre com um único título principal", () => {
    renderHome();
    const titles = screen.getAllByRole("heading", { level: 1 });
    expect(titles).toHaveLength(1);
    expect(titles[0]).toHaveTextContent("Do projeto da sala à última manutenção.");
    expect(screen.getByRole("link", { name: /Encontrar a solução certa/ })).toHaveAttribute("href", "/solucoes");
  });

  it("organiza as seções na ordem da história", () => {
    renderHome();
    const sectionTitles = within(screen.getByRole("main"))
      .getAllByRole("heading", { level: 2 })
      .map((heading) => heading.textContent);
    expect(sectionTitles).toEqual([
      "A vida inteira do equipamento",
      "Portfólio",
      "Quem responde pela Hexamedical",
      "Como podemos ajudar?",
    ]);
  });

  it("deixa as seis etapas legíveis sem depender de animação", () => {
    renderHome();
    const region = screen.getByRole("region", { name: "A vida inteira do equipamento" });
    const stages = within(region).getAllByRole("heading", { level: 3 });
    expect(stages.map((stage) => stage.textContent)).toEqual(["Escolha", "Projeto da sala", "Instalação", "Operação", "Manutenção", "Laboratório"]);
    for (const stage of stages) {
      const article = stage.closest("article")!;
      expect(article.getAttribute("style") ?? "").not.toMatch(/opacity:\s*0|visibility:\s*hidden/);
    }
  });

  it("filtra o portfólio por modalidade", () => {
    renderHome();
    const region = screen.getByRole("region", { name: "Portfólio" });
    expect(within(region).getAllByRole("listitem")).toHaveLength(showroom.length);
    const filter = within(region).getByRole("button", { name: "Ressonância" });
    expect(filter).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(filter);
    expect(filter).toHaveAttribute("aria-pressed", "true");
    const visible = within(region).getAllByRole("listitem").map((item) => item.textContent ?? "");
    const rm = showroom.filter((item) => item.filters.includes("rm"));
    expect(visible).toHaveLength(rm.length);
    expect(visible.some((text) => text.includes("Magnifico Open"))).toBe(true);
    expect(visible.some((text) => text.includes("Accutron MR"))).toBe(false);
  });

  it("leva cada caminho de contato ao WhatsApp com a mensagem certa", () => {
    renderHome();
    const region = screen.getByRole("region", { name: "Como podemos ajudar?" });
    for (const path of triage) {
      const link = within(region).getByRole("link", { name: new RegExp(`${path.title}.*WhatsApp`, "i") });
      expect(link).toHaveAttribute("href", whatsappHref(path.whatsappText));
      expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
    }
  });

  it("carrega os vídeos de prova só quando pedidos, com pôster", () => {
    renderHome();
    const region = screen.getByRole("region", { name: "Quem responde pela Hexamedical" });
    const videos = region.querySelectorAll("video");
    expect(videos).toHaveLength(2);
    for (const video of videos) {
      expect(video).toHaveAttribute("preload", "none");
      expect(video.getAttribute("poster")).toMatch(/\.webp$/);
    }
  });

  it("esconde o palco de leitores de tela", () => {
    const { container } = renderHome();
    const stage = container.querySelector(".stage-canvas, .stage-fallback");
    expect(stage).toHaveAttribute("aria-hidden", "true");
  });

  it("oferece pausa para o vídeo em loop da abertura", () => {
    renderHome();
    expect(screen.getByRole("button", { name: /Pausar vídeo/ })).toBeInTheDocument();
  });
});
