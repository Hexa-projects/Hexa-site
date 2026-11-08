import fs from "node:fs";
import path from "node:path";
import { render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "@/App";
import LinePage from "@/pages/solucoes/LinePage";
import ProductPage from "@/pages/solucoes/ProductPage";
import { lines, vetProducts } from "@/data/pages/solutions";
import { whatsappHref } from "@/data/home";

const LINE_SLUGS = ["bombas-injetoras", "radiografia-digital", "densitometria", "hexai", "veterinaria"] as const;

const renderAt = (url: string) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[url]}>
        <Routes>
          {LINE_SLUGS.map((slug) => (
            <Route key={slug} path={`/solucoes/${slug}`} element={<LinePage slug={slug} />} />
          ))}
          <Route path="/solucoes/linha-que-nao-existe" element={<LinePage slug="linha-que-nao-existe" />} />
          <Route path="/solucoes/:slug" element={<ProductPage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>,
  );

/** Só o conteúdo da página (sem cabeçalho e rodapé do Layout). */
const page = (container: HTMLElement) => container.querySelector(".page") as HTMLElement;

/** Texto da página sem a triagem de contato do fim (que tem telefone e e-mail). */
const ownText = (container: HTMLElement) =>
  Array.from(page(container).querySelectorAll("section"))
    .filter((section) => section.id !== "contato" && !section.closest("#contato"))
    .map((section) => section.textContent)
    .join(" ");

const whatsappLinks = () => screen.getAllByRole("link").map((link) => link.getAttribute("href"));

/** O link do card cujo título (h3) é exatamente `title`. */
const cardLink = (scope: HTMLElement, title: string) => within(scope).getByRole("heading", { level: 3, name: title }).closest("a");

describe("linhas: bombas injetoras", () => {
  it("organiza os modelos Accutron por área, com os fatos da base comercial", () => {
    const { container } = renderAt("/solucoes/bombas-injetoras");
    expect(screen.getByRole("heading", { level: 1, name: /Bombas injetoras/i })).toBeInTheDocument();
    const text = ownText(container);
    expect(text).toMatch(/Medtron/);

    const rm = screen.getByRole("region", { name: "Ressonância magnética" });
    for (const model of ["Accutron MR Compact", "Accutron MR3", "Accutron MR", "MRI 880"]) {
      expect(within(rm).getByRole("heading", { level: 3, name: model })).toBeInTheDocument();
    }
    const ct = screen.getByRole("region", { name: "Tomografia" });
    for (const model of ["Accutron CT-D Vision", "Accutron CT", "Accutron CT-D", "CT 871"]) {
      expect(within(ct).getByRole("heading", { level: 3, name: model })).toBeInTheDocument();
    }
    const hp = screen.getByRole("region", { name: "Hemodinâmica" });
    expect(within(hp).getByRole("heading", { level: 3, name: "HP 832" })).toBeInTheDocument();

    // Accutron MR: não magnética, para salas de até 3 T, a bateria e com controle sem fio.
    const mr = within(rm).getByRole("heading", { level: 3, name: "Accutron MR" }).closest("li")?.textContent ?? "";
    expect(mr).toMatch(/não magnética/i);
    expect(mr).toMatch(/3 T/);
    expect(mr).toMatch(/bateria/i);
    expect(mr).toMatch(/sem fio/i);
    expect(text).toMatch(/cabeça dupla/i);
    expect(text).not.toMatch(/corrigir/i);
  });

  it("sem arquivo de ficha no repositório, cada modelo pede a ficha pelo WhatsApp com o nome dele", () => {
    const { container } = renderAt("/solucoes/bombas-injetoras");
    const rm = screen.getByRole("region", { name: "Ressonância magnética" });
    expect(cardLink(rm, "Accutron MR")).toHaveAttribute("href", whatsappHref("Olá! Quero receber a ficha técnica da injetora Accutron MR."));
    const hp = screen.getByRole("region", { name: "Hemodinâmica" });
    expect(cardLink(hp, "HP 832")).toHaveAttribute("href", whatsappHref("Olá! Quero receber a ficha técnica da injetora HP 832."));
    expect(page(container).querySelector('a[href$=".pdf"]')).toBeNull();
    expect(ownText(container)).toMatch(/Pedir ficha técnica/);
  });
});

describe("linhas: radiografia digital", () => {
  it("DRGEM como linha principal, placas Rayence e Mindray citada sem promessa", () => {
    const { container } = renderAt("/solucoes/radiografia-digital");
    expect(screen.getByRole("heading", { level: 1, name: /Radiografia digital/i })).toBeInTheDocument();
    const drgem = screen.getByRole("region", { name: "Sistemas DRGEM" });
    for (const model of ["XVISION-525", "TOPAZ", "RAYMO"]) {
      expect(within(drgem).getByRole("heading", { level: 3, name: model })).toBeInTheDocument();
    }
    const text = ownText(container);
    expect(text).toMatch(/Rayence/);
    expect(text).toMatch(/32, 40 ou 52 kW/);
    expect(text).toMatch(/painel plano/i);
    expect(text).toMatch(/redução de dose/i);
    expect(text).toMatch(/leito/i);
    expect(text).toMatch(/UTI/);
    const mindray = screen.getByRole("region", { name: /Mindray/ });
    for (const model of ["DigiEye 350", "DigiEye 330", "MobiEye 700"]) {
      expect(within(mindray).getByRole("heading", { level: 3, name: model })).toBeInTheDocument();
    }
    expect(text).not.toMatch(/mais capaz/i);
    expect(text).not.toMatch(/estoque|pronta entrega/i);
  });
});

describe("linhas: densitometria", () => {
  it("só a descrição DXA confirmada, sem modelo, ficha nem número", () => {
    const { container } = renderAt("/solucoes/densitometria");
    expect(screen.getByRole("heading", { level: 1, name: /Densitometria/i })).toBeInTheDocument();
    const text = ownText(container);
    expect(text).toMatch(/DXA/);
    expect(text).toMatch(/densidade mineral óssea/i);
    expect(text).toMatch(/osteoporose/i);
    expect(text).not.toMatch(/\d/);
    expect(screen.queryByRole("table")).toBeNull();
    expect(whatsappLinks()).toContain(whatsappHref(lines.densitometria.whatsappText));
  });
});

describe("linhas: HexAI", () => {
  it("módulos VUNO e SwiftMR, sem garantia nem percentual de produtividade", () => {
    const { container } = renderAt("/solucoes/hexai");
    expect(screen.getByRole("heading", { level: 1, name: /HexAI/ })).toBeInTheDocument();
    const vuno = screen.getByRole("region", { name: /VUNO/ });
    for (const module of ["DeepBrain", "Chest X-ray", "BoneAge"]) {
      expect(within(vuno).getByRole("heading", { level: 3, name: module })).toBeInTheDocument();
    }
    const text = ownText(container);
    expect(text).toMatch(/SwiftMR/);
    expect(text).toMatch(/uma licença por equipamento/i);
    expect(text).toMatch(/todas as marcas e modelos/i);
    const steps = screen.getByRole("region", { name: /implantação/i });
    expect(within(steps).getAllByRole("heading", { level: 3 })).toHaveLength(5);
    expect(document.body.textContent).not.toMatch(/garant/i);
    expect(text).not.toMatch(/%/);
    expect(text).not.toMatch(/40/);
  });
});

describe("linhas: veterinária", () => {
  it("Esaote veterinária e WDM, com contato pela Hexamedical", () => {
    const { container } = renderAt("/solucoes/veterinaria");
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    const esaote = screen.getByRole("region", { name: /Esaote/ });
    for (const model of ["Magnifico Vet", "O-scan Vet e Equine", "Vet-MR Grande"]) {
      expect(within(esaote).getByRole("heading", { level: 3, name: model })).toBeInTheDocument();
    }
    const wdm = screen.getByRole("region", { name: /WDM/ });
    for (const [model, href] of [
      ["i_Space 1.5T-VET", "/solucoes/ispace-1-5t-vet"],
      ["TurboTom 1S-VET", "/solucoes/turbotom-1s-vet"],
      ["TurboTom 1S LITE VET", "/solucoes/turbotom-1s-lite-vet"],
    ]) {
      expect(cardLink(wdm, model), model).toHaveAttribute("href", href);
    }
    const text = ownText(container);
    expect(text).toMatch(/0,31 T/);
    expect(text).toMatch(/20 m²/);
    expect(text).toMatch(/microchips/i);
    expect(text).toMatch(/Hexamedical/);
    expect(document.body.textContent).not.toMatch(/Futuremed/i);
    expect(whatsappLinks()).toContain(whatsappHref(lines.veterinaria.whatsappText));
  });

  it("hélio só aparece junto do O-scan Vet, o único modelo veterinário com hélio confirmado", () => {
    const { container } = renderAt("/solucoes/veterinaria");
    const blocks = Array.from(page(container).querySelectorAll("p, li, dd, td"));
    const withHelium = blocks.filter((el) => /h[ée]lio/i.test(el.textContent ?? "") && el.querySelectorAll("p, li").length === 0);
    expect(withHelium.length).toBeGreaterThan(0);
    for (const el of withHelium) expect(el.textContent, el.textContent ?? "").toMatch(/O-scan Vet/);
  });
});

describe("linhas: todas", () => {
  it("cada linha tem título, mensagem própria de WhatsApp e fecha com a triagem", () => {
    const texts = new Set<string>();
    for (const slug of LINE_SLUGS) {
      const { container, unmount } = renderAt(`/solucoes/${slug}`);
      const line = lines[slug];
      expect(line, slug).toBeDefined();
      expect(screen.getByRole("heading", { level: 1, name: line.title }), slug).toBeInTheDocument();
      expect(whatsappLinks(), slug).toContain(whatsappHref(line.whatsappText));
      expect(page(container).querySelector("#contato"), slug).not.toBeNull();
      if (line.hero) expect(fs.existsSync(path.join(process.cwd(), "public", line.hero.src)), line.hero.src).toBe(true);
      texts.add(line.whatsappText);
      unmount();
    }
    expect(texts.size).toBe(LINE_SLUGS.length);
  });

  it("toda imagem dos cards das linhas existe em public/", () => {
    for (const line of Object.values(lines)) {
      for (const section of line.sections) {
        for (const item of section.cards ?? []) {
          if (item.image) expect(fs.existsSync(path.join(process.cwd(), "public", item.image.src)), item.image.src).toBe(true);
        }
      }
    }
  });

  it("slug de linha desconhecido mostra a 404 do sistema", () => {
    renderAt("/solucoes/linha-que-nao-existe");
    expect(screen.getByRole("heading", { level: 1, name: /página não encontrada/i })).toBeInTheDocument();
  });

  it("nenhum texto da página de linha usa travessão ou meia-risca", () => {
    const source = fs.readFileSync(path.join(process.cwd(), "src/pages/solucoes/LinePage.tsx"), "utf8");
    expect(source).not.toMatch(/[–—]/);
  });
});

describe("modelos veterinários WDM na página de produto", () => {
  it("i_Space 1.5T-VET: dados do folder da WDM e migalha da linha veterinária", () => {
    const { container } = renderAt("/solucoes/ispace-1-5t-vet");
    expect(screen.getByRole("heading", { level: 1, name: "i_Space 1.5T-VET" })).toBeInTheDocument();
    expect(page(container).textContent).toMatch(/1,5 T/);
    const crumbs = screen.getByRole("navigation", { name: "Você está em" });
    expect(within(crumbs).getByRole("link", { name: "Veterinária" })).toHaveAttribute("href", "/solucoes/veterinaria");
    expect(within(crumbs).queryByRole("link", { name: "Ressonância magnética" })).toBeNull();
    const spec = screen.getByRole("table", { name: /ficha técnica/i });
    expect(spec.parentElement?.textContent).toMatch(/WDM/);
    // Hero e ficha falam só da WDM (a linha veterinária cita a Esaote apenas nos relacionados).
    expect(page(container).querySelector(".page-hero")?.textContent).not.toMatch(/Esaote/);
    expect(spec.textContent).not.toMatch(/Esaote/);
  });

  it("TurboTom 1S-VET e 1S LITE VET abrem com a mensagem própria e relacionados da linha", () => {
    const { unmount } = renderAt("/solucoes/turbotom-1s-vet");
    expect(screen.getByRole("heading", { level: 1, name: "TurboTom 1S-VET" })).toBeInTheDocument();
    expect(document.body.textContent).toMatch(/4 MHU/);
    expect(whatsappLinks()).toContain(whatsappHref(vetProducts["turbotom-1s-vet"].whatsappText));
    const related = screen.getByRole("region", { name: /Outros sistemas/i });
    expect(cardLink(related, "i_Space 1.5T-VET")).toHaveAttribute("href", "/solucoes/ispace-1-5t-vet");
    unmount();

    renderAt("/solucoes/turbotom-1s-lite-vet");
    expect(screen.getByRole("heading", { level: 1, name: "TurboTom 1S LITE VET" })).toBeInTheDocument();
  });

  it("cada modelo WDM traz ficha com fonte, imagem existente e mensagem com o nome", () => {
    expect(Object.keys(vetProducts).sort()).toEqual(["ispace-1-5t-vet", "turbotom-1s-lite-vet", "turbotom-1s-vet"]);
    for (const product of Object.values(vetProducts)) {
      expect(product.specSource, product.slug).toMatch(/WDM/);
      expect(product.whatsappText, product.slug).toContain(product.name);
      expect(fs.existsSync(path.join(process.cwd(), "public", product.hero.src)), product.hero.src).toBe(true);
      expect(product.related, product.slug).not.toContain(product.slug);
    }
  });
});

describe("linhas: rotas e limpeza", () => {
  it.each(LINE_SLUGS)("%s abre pela rota pública", async (slug) => {
    window.history.pushState({}, "", `/solucoes/${slug}`);
    render(<App />);
    expect(await screen.findByRole("heading", { level: 1, name: lines[slug].title }, { timeout: 5000 })).toBeInTheDocument();
  });

  it("o modelo WDM abre pela rota pública na página de produto", async () => {
    window.history.pushState({}, "", "/solucoes/ispace-1-5t-vet");
    render(<App />);
    expect(await screen.findByRole("heading", { level: 1, name: "i_Space 1.5T-VET" }, { timeout: 5000 })).toBeInTheDocument();
    expect(document.querySelector(".page")).not.toBeNull();
  });

  it("as páginas antigas substituídas saíram do repositório", () => {
    for (const file of ["src/pages/WdmVetPage.tsx", "src/pages/SolutionPage.tsx", "src/wdm.css"]) {
      expect(fs.existsSync(path.join(process.cwd(), file)), file).toBe(false);
    }
  });
});
