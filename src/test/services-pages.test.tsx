import fs from "node:fs";
import path from "node:path";
import { render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "@/App";
import ServicosHub from "@/pages/servicos/ServicosHub";
import ServicePage from "@/pages/servicos/ServicePage";
import { serviceHub, services } from "@/data/pages/services";
import { triage, whatsappHref } from "@/data/home";

const SERVICE_SLUGS = ["manutencao", "contratos", "instalacao", "reparo"] as const;

const renderAt = (url: string) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[url]}>
        <Routes>
          <Route path="/servicos" element={<ServicosHub />} />
          <Route path="/servicos/:slug" element={<ServicePage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>,
  );

/** Só o conteúdo da página (sem cabeçalho e rodapé do Layout). */
const page = (container: HTMLElement) => container.querySelector(".page") as HTMLElement;

/** Texto da página sem a triagem de contato do fim. */
const ownText = (container: HTMLElement) =>
  Array.from(page(container).querySelectorAll("section"))
    .filter((section) => section.id !== "contato" && !section.closest("#contato"))
    .map((section) => section.textContent)
    .join(" ");

const links = () => screen.getAllByRole("link").map((link) => link.getAttribute("href"));

/** O link do card cujo título (h3) é exatamente `title`. */
const cardLink = (scope: HTMLElement, title: string) => within(scope).getByRole("heading", { level: 3, name: title }).closest("a");

/** Frases do site atual que não entram (não verificáveis ou promessa) e promessas de prazo, garantia e SLA. */
const FORBIDDEN = [/certificada internacionalmente/i, /máxima performance/i, /express/i, /garant/i, /\bSLA\b/, /representa(ção|nte) oficial/i, /assistência autorizada/i];

describe("serviços: hub", () => {
  it("lista os quatro serviços, cada um com a sua página", () => {
    const { container } = renderAt("/servicos");
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    const cards: [string, string][] = [
      ["Manutenção", "/servicos/manutencao"],
      ["Contratos", "/servicos/contratos"],
      ["Instalação", "/servicos/instalacao"],
      ["Reparo e laboratório", "/servicos/reparo"],
    ];
    for (const [title, href] of cards) {
      expect(cardLink(page(container), title), title).toHaveAttribute("href", href);
    }
  });

  it("mostra a estrutura e a cobertura do site atual", () => {
    const { container } = renderAt("/servicos");
    const text = ownText(container);
    expect(text).toMatch(/todo o território nacional/i);
    for (const city of ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Goiânia", "Florianópolis"]) expect(text).toContain(city);
    expect(text).toMatch(/16 anos/);
    expect(text).toMatch(/3 salas/);
    expect(text).toMatch(/tomografia, raio-X e mamografia/);
    expect(text).toMatch(/laboratório de eletrônica/i);
    expect(text).toMatch(/laboratório de criogenia/i);
    expect(text).toMatch(/logística/i);
  });

  it("fecha com as três trilhas da triagem e a mensagem pronta do hub", () => {
    const { container } = renderAt("/servicos");
    const contact = page(container).querySelector("#contato") as HTMLElement;
    expect(contact).not.toBeNull();
    expect(within(contact).getAllByRole("heading", { level: 3 })).toHaveLength(3);
    expect(links()).toContain(whatsappHref(serviceHub.whatsappText));
  });
});

describe("serviços: manutenção", () => {
  it("cita RM, TC e hemodinâmica, full service para RM Esaote e todo o território nacional", () => {
    const { container } = renderAt("/servicos/manutencao");
    expect(screen.getByRole("heading", { level: 1, name: services.manutencao.title })).toBeInTheDocument();
    const text = ownText(container);
    expect(text).toMatch(/ressonância magnética/i);
    expect(text).toMatch(/tomografia/i);
    expect(text).toMatch(/hemodinâmica/i);
    expect(text).toMatch(/preventiva/i);
    expect(text).toMatch(/corretiva/i);
    expect(text).toMatch(/full service/i);
    expect(text).toMatch(/Esaote/);
    expect(text).toMatch(/todo o território nacional/i);
    expect(text).toMatch(/com ou sem peças/i);
    expect(text).toMatch(/avulsa/i);
  });

  it("TC multimarcas só conforme avaliação de escopo", () => {
    const { container } = renderAt("/servicos/manutencao");
    expect(ownText(container)).toMatch(/multimarcas[^.]*avaliação d[oe] escopo/i);
  });
});

describe("serviços: contratos", () => {
  it("contratos personalizados, com ou sem peças, preventiva e corretiva, para reduzir o equipamento parado", () => {
    const { container } = renderAt("/servicos/contratos");
    expect(screen.getByRole("heading", { level: 1, name: services.contratos.title })).toBeInTheDocument();
    const text = ownText(container);
    expect(text).toMatch(/personalizad/i);
    expect(text).toMatch(/com ou sem peças/i);
    expect(text).toMatch(/preventiva/i);
    expect(text).toMatch(/corretiva/i);
    expect(text).toMatch(/parado/i);
    expect(text).not.toMatch(/disponibilidade/i);
  });
});

describe("serviços: instalação", () => {
  it("instalação, desinstalação, transporte, mudança de endereço, visita avulsa, projetos e consultoria", () => {
    const { container } = renderAt("/servicos/instalacao");
    expect(screen.getByRole("heading", { level: 1, name: services.instalacao.title })).toBeInTheDocument();
    const text = ownText(container);
    expect(text).toMatch(/desinstala/i);
    expect(text).toMatch(/instalação/i);
    expect(text).toMatch(/transport/i);
    expect(text).toMatch(/muda de endereço|mudança de endereço/i);
    expect(text).toMatch(/visitas? técnicas? avulsas?/i);
    expect(text).toMatch(/gerenciamento de projetos/i);
    expect(text).toMatch(/consultoria/i);
  });
});

describe("serviços: reparo e laboratório", () => {
  it("lista bobinas e placas, criogenia e tubos de CT", () => {
    const { container } = renderAt("/servicos/reparo");
    expect(screen.getByRole("heading", { level: 1, name: services.reparo.title })).toBeInTheDocument();
    const text = ownText(container);
    expect(text).toMatch(/bobinas/i);
    expect(text).toMatch(/placas eletrônicas/i);
    expect(text).toMatch(/módulos/i);
    expect(text).toMatch(/fontes/i);
    expect(text).toMatch(/periféricos/i);
    expect(text).toMatch(/Sumitomo F-70H/);
    expect(text).toMatch(/RDK-408L3/);
    expect(text).toMatch(/Dunlee/);
    expect(text).toMatch(/Varex/);
    expect(text).toMatch(/adsorbers/i);
    expect(text).toMatch(/gradiente/i);
    expect(text).toMatch(/workstation/i);
  });

  it("cada item de criogenia, tubos e peças diz que a equipe técnica confirma, e abre a conversa com o nome dele", () => {
    renderAt("/servicos/reparo");
    const parts = screen.getByRole("region", { name: /criogenia/i });
    const items = within(parts).getAllByRole("listitem");
    expect(items.length).toBeGreaterThanOrEqual(4);
    for (const item of items) {
      expect(item.textContent, item.textContent ?? "").toMatch(/equipe técnica/i);
      const title = within(item).getByRole("heading", { level: 3 }).textContent ?? "";
      const href = item.querySelector("a")?.getAttribute("href") ?? "";
      expect(decodeURIComponent(href), title).toContain(title.replace(/\s+$/, ""));
    }
    expect(cardLink(parts, "Compressor Sumitomo F-70H")?.getAttribute("href")).toMatch(/^https:\/\/wa\.me\//);
  });

  it("não fala em pronta entrega, prazo nem estoque", () => {
    renderAt("/servicos/reparo");
    const body = document.body.textContent ?? "";
    expect(body).not.toMatch(/pronta entrega/i);
    expect(body).not.toMatch(/prazo/i);
    expect(body).not.toMatch(/estoque/i);
  });
});

describe("serviços: todos", () => {
  it("cada serviço tem título, mensagem própria de WhatsApp, imagem existente e fecha com a triagem", () => {
    const texts = new Set<string>([serviceHub.whatsappText]);
    for (const slug of SERVICE_SLUGS) {
      const { container, unmount } = renderAt(`/servicos/${slug}`);
      const service = services[slug];
      expect(service.slug).toBe(slug);
      expect(screen.getByRole("heading", { level: 1, name: service.title }), slug).toBeInTheDocument();
      // A ação principal do hero abre a conversa com a mensagem da página.
      const hero = page(container).querySelector(".page-hero") as HTMLElement;
      expect(within(hero).getByRole("link", { name: /WhatsApp/ }), slug).toHaveAttribute("href", whatsappHref(service.whatsappText));
      // A triagem do fim tem as três trilhas da home, e uma delas leva a mensagem da página.
      const contact = page(container).querySelector("#contato") as HTMLElement;
      expect(contact, slug).not.toBeNull();
      expect(within(contact).getAllByRole("heading", { level: 3 }), slug).toHaveLength(triage.length);
      const contactLinks = within(contact).getAllByRole("link").map((link) => link.getAttribute("href"));
      expect(contactLinks, slug).toContain(whatsappHref(service.whatsappText));
      expect(fs.existsSync(path.join(process.cwd(), "public", service.hero.src)), service.hero.src).toBe(true);
      expect(service.scope.length, slug).toBeGreaterThan(0);
      expect(service.process.length, slug).toBeGreaterThan(0);
      expect(service.faq.length, slug).toBeGreaterThan(0);
      texts.add(service.whatsappText);
      unmount();
    }
    expect(texts.size).toBe(SERVICE_SLUGS.length + 1);
  });

  it("nenhuma página de serviço repete frase não verificável nem promete prazo, garantia ou SLA", () => {
    for (const url of ["/servicos", ...SERVICE_SLUGS.map((slug) => `/servicos/${slug}`)]) {
      const { container, unmount } = renderAt(url);
      const text = ownText(container);
      for (const pattern of FORBIDDEN) expect(text, `${url} ${pattern}`).not.toMatch(pattern);
      unmount();
    }
  });

  it("toda imagem dos cards existe em public/", () => {
    for (const item of serviceHub.cards) {
      if (item.image) expect(fs.existsSync(path.join(process.cwd(), "public", item.image.src)), item.image.src).toBe(true);
    }
  });

  it("dados e páginas sem travessão ou meia-risca", () => {
    for (const file of ["src/data/pages/services.ts", "src/pages/servicos/ServicosHub.tsx", "src/pages/servicos/ServicePage.tsx"]) {
      const source = fs.readFileSync(path.join(process.cwd(), file), "utf8");
      expect(source, file).not.toMatch(/[–—]/);
    }
  });

  it("slug de serviço desconhecido mostra a 404 do sistema", () => {
    renderAt("/servicos/nao-existe");
    expect(screen.getByRole("heading", { level: 1, name: /página não encontrada/i })).toBeInTheDocument();
  });
});

describe("serviços: rotas e limpeza", () => {
  it.each(["/servicos", ...SERVICE_SLUGS.map((slug) => `/servicos/${slug}`)])("%s abre pela rota pública no sistema novo", async (url) => {
    window.history.pushState({}, "", url);
    render(<App />);
    expect(await screen.findByRole("heading", { level: 1 }, { timeout: 5000 })).toBeInTheDocument();
    expect(document.querySelector(".page")).not.toBeNull();
  });

  it("/servicos/nao-existe abre a 404 pela rota pública", async () => {
    window.history.pushState({}, "", "/servicos/nao-existe");
    render(<App />);
    expect(await screen.findByRole("heading", { level: 1, name: /página não encontrada/i }, { timeout: 5000 })).toBeInTheDocument();
    expect(window.location.pathname).toBe("/servicos/nao-existe");
  });

  it("as páginas antigas de serviço saíram do repositório", () => {
    for (const file of ["src/pages/ServicePage.tsx", "src/pages/ServicosHub.tsx"]) {
      expect(fs.existsSync(path.join(process.cwd(), file)), file).toBe(false);
    }
  });
});
