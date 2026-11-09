import { render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Header from "@/components/layout/Header";
import Index from "@/pages/Index";
import { companyFacts, lifecycle } from "@/data/home";

const renderHome = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={["/"]}>
        <Index />
      </MemoryRouter>
    </HelmetProvider>,
  );

describe("home clara", () => {
  it("só a abertura fica no palco de anéis; as seções seguintes ficam na superfície clara", () => {
    renderHome();
    const hero = screen.getByRole("region", { name: /Ressonância magnética que cabe/ });
    expect(hero.closest(".home__light")).toBeNull();
    for (const name of ["Quem vende também instala e conserta", "Uma equipe só, da compra ao reparo", "Equipamentos", "Quem já trabalhou com a gente", "Fale com a equipe certa"]) {
      expect(screen.getByRole("region", { name }).closest(".home__light"), name).not.toBeNull();
    }
  });
});

describe("cabeçalho da home", () => {
  const renderHeader = () =>
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>,
    );

  it("flutua transparente sobre a abertura clara, com o logo original", () => {
    renderHeader();
    expect(screen.getByRole("banner")).toHaveClass("site-header--overlay");
    expect(screen.getByRole("banner")).not.toHaveClass("is-scrolled");
    expect(screen.getByRole("img", { name: "Hexamedical" })).toHaveAttribute("src", "/assets/brand/hexamedical-logo.webp");
  });
});

describe("copy da home", () => {
  it("apresenta a empresa com os números do site antigo", () => {
    renderHome();
    const region = screen.getByRole("region", { name: "Quem vende também instala e conserta" });
    expect(companyFacts.map((fact) => fact.value)).toEqual(["+16 anos", "+500", "5 unidades", "3 salas"]);
    // Sem afirmar representação: a Hexamedical trabalha com a linha aberta da Esaote.
    expect(region).toHaveTextContent("A Hexamedical trabalha com a linha de ressonância aberta Esaote e vende também tomografia veterinária");
    expect(region.textContent).not.toMatch(/representa/i);
    for (const fact of companyFacts) {
      expect(within(region).getByText(fact.value)).toBeInTheDocument();
      expect(within(region).getByText(fact.label)).toBeInTheDocument();
    }
  });

  it("detalha o que entra em cada etapa da vida do equipamento", () => {
    renderHome();
    const region = screen.getByRole("region", { name: "Uma equipe só, da compra ao reparo" });
    for (const stage of lifecycle) {
      expect(stage.points.length, stage.id).toBeGreaterThanOrEqual(2);
      const article = within(region).getByRole("article", { name: stage.title });
      for (const point of stage.points) expect(within(article).getByText(point)).toBeInTheDocument();
    }
  });

  it("mostra área e consumo das ressonâncias Esaote no portfólio, com os dados do fabricante", () => {
    renderHome();
    const region = screen.getByRole("region", { name: "Equipamentos" });
    const card = (name: string) => within(region).getByText(name).closest("li")!;
    expect(card("O-scan SMART")).toHaveTextContent("9 m² · menos de 1 kW");
    expect(card("S-scan Open")).toHaveTextContent("20 m² · 2 kW em aquisição");
    expect(card("G-scan Open")).toHaveTextContent("23 m² · menos de 3 kW");
    expect(card("Magnifico Open")).toHaveTextContent("cerca de 20 m² · até 3 kW");
  });

  it("o card do Magnifico Open segue o mesmo padrão dos outros e leva à página interna", () => {
    renderHome();
    const region = screen.getByRole("region", { name: "Equipamentos" });
    const card = (name: string) => within(region).getByText(name).closest("li")!;
    expect(card("Magnifico Open")).toHaveTextContent("Ver equipamento");
    expect(within(card("Magnifico Open")).getByRole("link")).toHaveAttribute("href", "/solucoes/magnifico-open");
  });

  it("diz na abertura o que a Hexamedical faz e quanto espaço a ressonância pede", () => {
    renderHome();
    const lead = screen.getByText(/Esaote/, { selector: ".hero__lead" });
    expect(lead).toHaveTextContent(/laboratório próprio/);
    expect(lead).toHaveTextContent(/a partir de 9 m²/);
  });
});
