import fs from "node:fs";
import path from "node:path";
import { render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "@/App";
import CareversePage from "@/pages/solucoes/CareversePage";
import { careverse } from "@/data/pages/careverse";
import { whatsappHref } from "@/data/home";

const ROUTE = "/solucoes/careverse";
/** A landing estática que esta página substitui: a fonte de toda afirmação, número e estudo. */
const LANDING = path.resolve(process.cwd(), "..", "careverse-site", "index.html");
const MEDIA_DIR = path.resolve(process.cwd(), "public", "media", "careverse");

const renderPage = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[ROUTE]}>
        <CareversePage />
      </MemoryRouter>
    </HelmetProvider>,
  );

/** Só o conteúdo da página (sem cabeçalho e rodapé do Layout). */
const page = (container: HTMLElement) => container.querySelector(".page") as HTMLElement;

/** Texto visível da landing: sem tags, scripts e estilos (atributos como width/height não contam). */
const landingText = () =>
  fs
    .readFileSync(LANDING, "utf8")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ");

const NUMBER = /\d+(?:[.,]\d+)*/g;
const numbers = (text: string) => text.match(NUMBER) ?? [];

describe("Careverse: conteúdo portado da landing", () => {
  it("tem um único h1 e os quatro módulos da plataforma", () => {
    renderPage();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: "Careverse" })).toBeInTheDocument();
    const modules = screen.getByRole("region", { name: careverse.modules.title });
    for (const name of ["Digital Heart™", "Digital Brain", "StrokeFusion", "Digital Artery"]) {
      expect(within(modules).getByRole("heading", { level: 3, name: new RegExp(name) }), name).toBeInTheDocument();
    }
  });

  it("porta as três perspectivas do Digital Heart™, o fluxo, as evidências e as perguntas", () => {
    const { container } = renderPage();
    for (const title of ["Anatomia coronariana", "Análise de placa", "Função cardíaca com CT-FFR", "Da imagem ao relatório, em quatro etapas", "Perguntas frequentes"]) {
      expect(screen.getByRole("heading", { level: 2, name: title }), title).toBeInTheDocument();
    }
    const text = page(container).textContent ?? "";
    for (const fact of ["Score de Cálcio (Agatston)", "CAD-RADS", "dinâmica de fluidos computacional", "DICOM/PACS", "lipídicos, fibrosos e calcificados"]) {
      expect(text.includes(fact), fact).toBe(true);
    }
  });

  it("todo número da página existe no texto da landing (careverse-site/index.html)", () => {
    const { container } = renderPage();
    const source = new Set(numbers(landingText()));
    const own = numbers(page(container).textContent ?? "");
    // Não pode passar vazio: os estudos trazem ano, volume e páginas.
    for (const expected of ["2021", "2022", "2024", "313", "233354"]) expect(own, expected).toContain(expected);
    const missing = own.filter((value) => !source.has(value));
    expect(missing).toEqual([]);
  });

  it("cita os cinco estudos da landing com link para o original", () => {
    renderPage();
    const evidence = screen.getByRole("region", { name: careverse.evidence.title });
    const hrefs = within(evidence)
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));
    expect(hrefs).toEqual([
      "https://pubmed.ncbi.nlm.nih.gov/34805297/",
      "https://pubmed.ncbi.nlm.nih.gov/35120360/",
      "https://pubmed.ncbi.nlm.nih.gov/34895831/",
      "https://pubmed.ncbi.nlm.nih.gov/38637226/",
      "https://pubs.rsna.org/doi/10.1148/radiol.233354",
    ]);
    const landing = fs.readFileSync(LANDING, "utf8");
    for (const href of hrefs) expect(landing.includes(href ?? "-"), href ?? "").toBe(true);
    expect(evidence.textContent).toContain("Guo B. et al.");
    expect(evidence.textContent).toContain("313(1):e233354");
  });

  it("não usa travessão nem meia-risca e não faz afirmação regulatória nova", () => {
    const { container } = renderPage();
    const root = page(container);
    const alts = Array.from(root.querySelectorAll("img")).map((img) => img.getAttribute("alt") ?? "");
    const all = [root.textContent ?? "", ...alts, careverse.title, careverse.description, careverse.whatsappText].join(" ");
    expect(all).not.toMatch(/[–—]/);
    expect(all).not.toMatch(/aprovad|registrad|anvisa/i);
    expect(all).not.toMatch(/\bFDA\b|\bCE\b|NMPA/);
    // As duas ressalvas regulatórias da landing ficam exatamente como lá.
    const landing = landingText().replace(/\s+/g, " ");
    for (const note of careverse.regulatoryNotes) {
      expect(landing.includes(note), note).toBe(true);
      expect(root.textContent).toContain(note);
    }
  });
});

describe("Careverse: conversão única", () => {
  it("um só destino de conversão: Solicitar demonstração no WhatsApp, com mensagem de demonstração", () => {
    const { container } = renderPage();
    const root = page(container);
    expect(careverse.whatsappText).toMatch(/demonstração do Careverse/);
    const expected = whatsappHref(careverse.whatsappText);
    const wa = Array.from(root.querySelectorAll<HTMLAnchorElement>('a[href*="wa.me"]'));
    expect(wa.length).toBeGreaterThan(0);
    for (const link of wa) {
      expect(link.getAttribute("href")).toBe(expected);
      expect(link.textContent).toContain("Solicitar demonstração");
      expect(link.getAttribute("target")).toBe("_blank");
    }
    // Nenhum outro caminho de conversão: sem formulário, sem triagem, sem link para contato, telefone ou e-mail.
    expect(root.querySelector("form")).toBeNull();
    expect(root.querySelector("#contato")).toBeNull();
    expect(root.querySelector('a[href^="/contato"], a[href^="tel:"], a[href^="mailto:"], a[download]')).toBeNull();
  });
});

describe("Careverse: mídia e rota", () => {
  it("usa só mídia copiada para /media/careverse, registrada no SOURCES.md", () => {
    const { container } = renderPage();
    const sources = fs.readFileSync(path.join(MEDIA_DIR, "SOURCES.md"), "utf8");
    expect(sources).toMatch(/careverse-site/);
    expect(sources).toMatch(/direitos e revisão regulatória pendentes/i);
    const images = Array.from(page(container).querySelectorAll("img"));
    expect(images.length).toBeGreaterThanOrEqual(4);
    for (const img of images) {
      const src = img.getAttribute("src") ?? "";
      expect(src.startsWith("/media/careverse/"), src).toBe(true);
      const file = src.replace("/media/careverse/", "");
      expect(fs.existsSync(path.join(MEDIA_DIR, file)), file).toBe(true);
      expect(sources.includes(file), file).toBe(true);
      expect(img.getAttribute("alt")).toBeTruthy();
    }
  });

  it("/solucoes/careverse abre a página nova no App", async () => {
    window.history.pushState({}, "", ROUTE);
    render(<App />);
    expect(await screen.findByRole("heading", { level: 1, name: "Careverse" })).toBeInTheDocument();
    expect(document.querySelector(".page")).not.toBeNull();
    expect(screen.queryByText(/está em preparação/)).toBeNull();
  });
});
