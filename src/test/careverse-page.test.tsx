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
/**
 * A landing estática que esta página substitui (careverse-site/index.html no commit 4e5b789), versionada aqui:
 * a fonte de toda afirmação, número e estudo da página.
 */
const LANDING = path.resolve(process.cwd(), "src", "test", "fixtures", "careverse-landing.html");
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

const landingHtml = () => fs.readFileSync(LANDING, "utf8");

/**
 * Texto visível da landing: sem o comentário de proveniência, tags, scripts e estilos (atributos como width/height não
 * contam), com espaços normalizados e a meia-risca das faixas de páginas trocada por hífen, como na página.
 */
const landingText = () =>
  landingHtml()
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/–/g, "-")
    .replace(/\s+/g, " ");

const NUMBER = /\d+(?:[.,]\d+)*/g;
const numbers = (text: string) => text.match(NUMBER) ?? [];

/** Texto, alts e metadados da página: tudo que a pessoa lê ou que o buscador mostra. */
const everything = (root: HTMLElement) => {
  const alts = Array.from(root.querySelectorAll("img")).map((img) => img.getAttribute("alt") ?? "");
  return [root.textContent ?? "", ...alts, careverse.title, careverse.description, careverse.whatsappText].join(" ");
};

describe("Careverse: conteúdo portado da landing", () => {
  it("tem um único h1 e os quatro módulos da plataforma, os três de fora só pelo nome", () => {
    renderPage();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: "Careverse" })).toBeInTheDocument();
    const modules = screen.getByRole("region", { name: careverse.modules.title });
    for (const name of ["Digital Heart™", "Digital Brain", "StrokeFusion", "Digital Artery"]) {
      expect(within(modules).getByRole("heading", { level: 3, name: new RegExp(name) }), name).toBeInTheDocument();
    }
    // Sem área de indicação inventada: Digital Brain, StrokeFusion e Digital Artery não trazem rótulo nem texto.
    for (const name of ["Digital Brain", "StrokeFusion", "Digital Artery"]) {
      const card = within(modules).getByRole("heading", { level: 3, name }).closest("li") as HTMLElement;
      expect(card.querySelector(".page-card__meta"), name).toBeNull();
      expect(card.querySelector(".page-card__body"), name).toBeNull();
    }
  });

  it("porta a anatomia, a placa, o fluxo, as evidências e as perguntas", () => {
    const { container } = renderPage();
    for (const title of ["Anatomia coronariana", "Análise de placa", "Da imagem ao relatório, em quatro etapas", "Perguntas frequentes"]) {
      expect(screen.getByRole("heading", { level: 2, name: title }), title).toBeInTheDocument();
    }
    const text = page(container).textContent ?? "";
    for (const fact of ["Score de Cálcio (Agatston)", "CAD-RADS", "DICOM/PACS", "lipídicos, fibrosos e calcificados"]) {
      expect(text.includes(fact), fact).toBe(true);
    }
  });

  it("todo número da página existe no texto da landing", () => {
    const { container } = renderPage();
    const source = new Set(numbers(landingText()));
    const own = numbers(page(container).textContent ?? "");
    // Não pode passar vazio: os estudos trazem ano, volume e páginas.
    for (const expected of ["2021", "2022", "707508", "2366", "2368"]) expect(own, expected).toContain(expected);
    expect(own.filter((value) => !source.has(value))).toEqual([]);
  });

  it("cita os três estudos do CoronaryDoc como a landing, com link para o original", () => {
    renderPage();
    const evidence = screen.getByRole("region", { name: careverse.evidence.title });
    const hrefs = within(evidence)
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));
    expect(hrefs).toEqual([
      "https://pubmed.ncbi.nlm.nih.gov/34805297/",
      "https://pubmed.ncbi.nlm.nih.gov/35120360/",
      "https://pubmed.ncbi.nlm.nih.gov/34895831/",
    ]);
    const html = landingHtml();
    const source = landingText();
    for (const study of careverse.evidence.studies) {
      // Cada citação inteira, como a landing a escreve: autores e referência juntos, periódico, ano e tipo, título e resumo.
      expect(html.includes(`href="${study.href}"`), study.href).toBe(true);
      expect(source.includes(`${study.authors} · ${study.ref}`), `${study.authors} · ${study.ref}`).toBe(true);
      expect(source.includes(`${study.journal} ${study.year} · ${study.kind}`), study.journal).toBe(true);
      expect(source.includes(study.title), study.title).toBe(true);
      expect(source.includes(study.summary), study.summary).toBe(true);
      // E a página mostra a citação inteira.
      expect(evidence.textContent).toContain(`${study.authors}, ${study.ref}`);
      expect(evidence.textContent).toContain(`${study.journal}, ${study.year} · ${study.kind}`);
    }
  });

  it("não usa travessão nem meia-risca e não faz afirmação regulatória nova", () => {
    const { container } = renderPage();
    const root = page(container);
    const all = everything(root);
    expect(all).not.toMatch(/[–—]/);
    expect(all).not.toMatch(/aprovad|registrad|anvisa/i);
    expect(all).not.toMatch(/\bFDA\b|\bCE\b|NMPA/);
    // As duas ressalvas regulatórias da landing ficam exatamente como lá.
    const source = landingText();
    for (const note of careverse.regulatoryNotes) {
      expect(source.includes(note), note).toBe(true);
      expect(root.textContent).toContain(note);
    }
  });

  it("deixa de fora o que o plano de revisão bloqueia: CT-FFR, tempo, trabalho manual, prognóstico, manejo e precisão", () => {
    const { container } = renderPage();
    const all = everything(page(container));
    // CT-FFR: bloqueado para publicação até a validação regulatória (seção, imagem, estudos e pergunta).
    expect(all).not.toMatch(/FFR|fluidos|funcional|função cardíaca|da anatomia à função/i);
    expect(page(container).querySelector('img[src*="ct-ffr"]')).toBeNull();
    // "Academic Radiology" (Yi Y.) fica; a "Radiology" do ensaio de CT-FFR, não.
    expect(all).not.toMatch(/Guo B\.|Science Bulletin|(?<!Academic )Radiology/);
    // "Bloqueios atuais": velocidade e economia de tempo, redução de trabalho manual, prognóstico e eventos agudos,
    // melhora do manejo, precisão.
    expect(all).not.toMatch(/etapas manuais|trabalho manual|menor dependência|economi|mais rápid|em minutos|tempo de/i);
    expect(all).not.toMatch(/prognóstic|eventos agudos|manejo|precisão|preciso/i);
    expect(fs.existsSync(path.join(MEDIA_DIR, "ct-ffr.webp"))).toBe(false);
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
    expect(images.length).toBeGreaterThanOrEqual(3);
    for (const img of images) {
      const src = img.getAttribute("src") ?? "";
      expect(src.startsWith("/media/careverse/"), src).toBe(true);
      const file = src.replace("/media/careverse/", "");
      expect(fs.existsSync(path.join(MEDIA_DIR, file)), file).toBe(true);
      expect(sources.includes(`| \`${file}\``), file).toBe(true);
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
