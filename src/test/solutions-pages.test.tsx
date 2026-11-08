import fs from "node:fs";
import path from "node:path";
import { render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "@/App";
import SolucoesHub from "@/pages/solucoes/SolucoesHub";
import RmLinePage from "@/pages/solucoes/RmLinePage";
import ProductPage from "@/pages/solucoes/ProductPage";
import { products, rmCards } from "@/data/pages/solutions";
import { whatsappHref } from "@/data/home";

const renderAt = (url: string) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[url]}>
        <Routes>
          <Route path="/solucoes" element={<SolucoesHub />} />
          <Route path="/solucoes/ressonancia-magnetica" element={<RmLinePage />} />
          <Route path="/solucoes/:slug" element={<ProductPage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>,
  );

/** Só o conteúdo da página (sem cabeçalho e rodapé do Layout). */
const page = (container: HTMLElement) => container.querySelector(".page") as HTMLElement;

/** O link do card cujo título (h3) é exatamente `title`. */
const cardLink = (scope: HTMLElement, title: string) => within(scope).getByRole("heading", { level: 3, name: title }).closest("a");

describe("soluções: hub", () => {
  it("lista todas as linhas do mapa de rotas, cada uma com a sua página", () => {
    const { container } = renderAt("/solucoes");
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    const lines: [string, string][] = [
      ["Ressonância magnética", "/solucoes/ressonancia-magnetica"],
      ["Bombas injetoras", "/solucoes/bombas-injetoras"],
      ["Radiografia digital", "/solucoes/radiografia-digital"],
      ["Densitometria", "/solucoes/densitometria"],
      ["HexAI", "/solucoes/hexai"],
      ["Careverse", "/solucoes/careverse"],
      ["Veterinária", "/solucoes/veterinaria"],
    ];
    for (const [title, href] of lines) {
      expect(cardLink(page(container), title), title).toHaveAttribute("href", href);
    }
  });

  it("fecha com a triagem e a mensagem pronta da página", () => {
    renderAt("/solucoes");
    const links = screen.getAllByRole("link", { name: /Conversar pelo WhatsApp/ }).map((link) => link.getAttribute("href"));
    expect(links).toContain(whatsappHref("Olá! Quero conhecer as soluções da Hexamedical para a minha clínica."));
  });
});

describe("soluções: linha de ressonância magnética", () => {
  /** Lê a tabela como { modelo: { linha: valor } }, pelos cabeçalhos de coluna e de linha. */
  const readTable = (table: HTMLElement) => {
    const models = Array.from(table.querySelectorAll("thead th")).slice(1).map((th) => th.textContent?.trim() ?? "");
    const data: Record<string, Record<string, string>> = Object.fromEntries(models.map((model) => [model, {}]));
    table.querySelectorAll("tbody tr").forEach((row) => {
      const label = row.querySelector("th")?.textContent?.trim() ?? "";
      row.querySelectorAll("td").forEach((cell, index) => {
        data[models[index]][label] = (cell.textContent ?? "").replace(new RegExp(String.fromCharCode(160), "g"), " ").trim();
      });
    });
    return data;
  };

  it("mostra o comparativo acessível com os dados da Esaote e da base comercial", () => {
    renderAt("/solucoes/ressonancia-magnetica");
    const table = screen.getByRole("table", { name: /comparativo/i });
    const headers = within(table).getAllByRole("columnheader").map((th) => th.textContent?.trim());
    expect(headers.slice(1)).toEqual(["O-scan SMART", "S-scan Open", "Magnifico Open", "G-scan Open"]);
    expect(within(table).getAllByRole("rowheader").length).toBeGreaterThanOrEqual(3);

    const data = readTable(table);
    expect(data["O-scan SMART"]["Campo magnético"]).toBe("0,31 T");
    expect(data["O-scan SMART"]["Área de instalação"]).toBe("a partir de 9 m²");
    expect(data["S-scan Open"]["Campo magnético"]).toBe("0,25 T");
    // Área do S-scan: número oficial da Esaote (src/data/editorial.ts), acima da base comercial.
    expect(data["S-scan Open"]["Área de instalação"]).toBe("a partir de 20 m²");
    expect(data["Magnifico Open"]["Campo magnético"]).toBe("0,4 T");
    expect(data["Magnifico Open"]["Área de instalação"]).toBe("até 20 m²");
    // G-scan: dados de src/data/editorial.ts (instalação mínima de 23 m², menos de 3 kW).
    expect(data["G-scan Open"]["Área de instalação"]).toBe("a partir de 23 m²");
    expect(data["G-scan Open"]["Consumo de energia"]).toBe("menos de 3 kW");

    expect(screen.getByText(/Dados da Esaote e da base comercial da Hexamedical/)).toBeInTheDocument();
  });

  it("faz a pergunta de escolha e leva a cada equipamento, incluindo o Magnifico Open", () => {
    const { container } = renderAt("/solucoes/ressonancia-magnetica");
    expect(page(container).textContent).toMatch(/extremidades e ortopedia, musculoesquelético amplo com coluna, ou RM aberta de corpo inteiro\?/i);
    const choice = screen.getByRole("region", { name: "Qual é o foco dos exames?" });
    for (const [name, href] of [
      ["O-scan SMART", "/solucoes/o-scan-smart"],
      ["S-scan Open", "/solucoes/s-scan-open"],
      ["Magnifico Open", "/solucoes/magnifico-open"],
      ["G-scan Open", "/solucoes/g-scan"],
    ]) {
      expect(cardLink(choice, name), name).toHaveAttribute("href", href);
    }
  });
});

describe("soluções: páginas de produto", () => {
  it("O-scan SMART: dados do equipamento, sem nenhuma menção a hélio", () => {
    const { container } = renderAt("/solucoes/o-scan-smart");
    expect(screen.getByRole("heading", { level: 1, name: "O-scan SMART" })).toBeInTheDocument();
    expect(page(container).textContent).toMatch(/0,31 T/);
    expect(page(container).textContent).toMatch(/9 m²/);
    expect(document.body.textContent).not.toMatch(/h[ée]lio/i);
    const links = screen.getAllByRole("link", { name: /Conversar pelo WhatsApp/ }).map((link) => link.getAttribute("href"));
    expect(links).toContain(whatsappHref("Olá! Quero saber mais sobre o O-scan SMART."));
  });

  it("S-scan Open: diz que não usa hélio", () => {
    const { container } = renderAt("/solucoes/s-scan-open");
    expect(screen.getByRole("heading", { level: 1, name: "S-scan Open" })).toBeInTheDocument();
    expect(page(container).textContent).toMatch(/não usa hélio/i);
    // Área oficial da Esaote; "até 20 m²" só pode aparecer no card relacionado do Magnifico Open.
    const ownText = Array.from(page(container).querySelectorAll("section"))
      .filter((section) => section.id !== "outras-ressonancias")
      .map((section) => section.textContent)
      .join(" ");
    expect(ownText).toMatch(/a partir de 20 m²/);
    expect(ownText).not.toMatch(/até 20 m²/);
    const spec = screen.getByRole("table", { name: /ficha técnica/i });
    expect(within(spec).getByRole("rowheader", { name: "Área de instalação" }).nextElementSibling).toHaveTextContent("a partir de 20 m²");
    expect(screen.getByRole("table", { name: /ficha técnica/i })).toBeInTheDocument();
  });

  it("G-scan Open: dados de editorial.ts e nenhuma afirmação sobre hélio", () => {
    const { container } = renderAt("/solucoes/g-scan");
    expect(screen.getByRole("heading", { level: 1, name: "G-scan Open" })).toBeInTheDocument();
    const text = page(container).textContent ?? "";
    expect(text).toMatch(/23 m²/);
    expect(text).toMatch(/12 bobinas/);
    expect(text).toMatch(/menos de 3 kW/);
    expect(document.body.textContent).not.toMatch(/h[ée]lio/i);
  });

  it("cada produto tem ficha com fonte, perguntas, mensagem própria e relacionados que existem", () => {
    expect(Object.keys(products).sort()).toEqual(["g-scan", "o-scan-smart", "s-scan-open"]);
    for (const product of Object.values(products)) {
      expect(product.specs.length, product.slug).toBeGreaterThan(3);
      expect(product.specSource, product.slug).toMatch(/Esaote/);
      expect(product.faq.length, product.slug).toBeGreaterThan(1);
      expect(product.whatsappText, product.slug).toContain(product.name);
      expect(fs.existsSync(path.join(process.cwd(), "public", product.hero.src)), product.hero.src).toBe(true);
      for (const slug of product.related) expect(rmCards[slug], `${product.slug} → ${slug}`).toBeDefined();
      expect(product.related, product.slug).not.toContain(product.slug);
    }
  });

  it("nenhum texto das páginas novas usa travessão ou meia-risca", async () => {
    const source = fs.readFileSync(path.join(process.cwd(), "src/data/pages/solutions.ts"), "utf8");
    expect(source).not.toMatch(/[–—]/);
  });
});

describe("soluções: rotas", () => {
  it("slug desconhecido de produto mostra a 404 do sistema, sem redirecionar", async () => {
    window.history.pushState({}, "", "/solucoes/nao-existe");
    render(<App />);
    expect(await screen.findByRole("heading", { level: 1, name: /página não encontrada/i }, { timeout: 5000 })).toBeInTheDocument();
    expect(window.location.pathname).toBe("/solucoes/nao-existe");
  });

  it("carrega a página de produto nova pela rota pública", async () => {
    window.history.pushState({}, "", "/solucoes/o-scan-smart");
    render(<App />);
    expect(await screen.findByRole("heading", { level: 1, name: "O-scan SMART" }, { timeout: 5000 })).toBeInTheDocument();
  });

  it("a linha de bombas injetoras abre pela rota pública", async () => {
    window.history.pushState({}, "", "/solucoes/bombas-injetoras");
    render(<App />);
    expect(await screen.findByRole("heading", { level: 1, name: /Bombas injetoras/i }, { timeout: 5000 })).toBeInTheDocument();
  });
});
