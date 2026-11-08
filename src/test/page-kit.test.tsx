import fs from "node:fs";
import path from "node:path";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import PageShell from "@/components/page/PageShell";
import PageHero from "@/components/page/PageHero";
import PageSection from "@/components/page/PageSection";
import PointList from "@/components/page/PointList";
import SpecTable from "@/components/page/SpecTable";
import CardGrid from "@/components/page/CardGrid";
import FactStrip from "@/components/page/FactStrip";
import Faq from "@/components/page/Faq";
import PageVideo from "@/components/page/PageVideo";
import PageContact from "@/components/page/PageContact";
import NotFound from "@/pages/NotFound";
import { whatsappHref, type TriagePath } from "@/data/home";
import { homeMedia } from "@/data/homeMedia";
import { ScrollTrigger } from "@/lib/motion";

const renderPage = (ui: React.ReactNode, path = "/solucoes/teste") =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>{ui}</MemoryRouter>
    </HelmetProvider>,
  );

const originalMatchMedia = window.matchMedia;

/** Simula um navegador com a preferência dada; `query` casa por trecho, como o gsap.matchMedia consulta. */
const mockMedia = (matches: (query: string) => boolean) => {
  window.matchMedia = ((query: string) => ({
    matches: matches(query),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
};

afterEach(() => {
  window.matchMedia = originalMatchMedia;
  vi.unstubAllGlobals();
});

const paths: TriagePath[] = [
  {
    id: "reparar",
    stage: "laboratorio",
    title: "Tenho uma peça com defeito",
    body: "Conte qual é a peça e o equipamento.",
    whatsappText: "Olá! Minha bobina de ressonância parou. Vocês avaliam se tem conserto?",
    href: "/servicos/reparo",
    linkLabel: "Ver reparo e laboratório",
  },
];

const fullPage = () => (
  <PageShell title="Página de teste" description="Descrição de teste.">
    <PageHero
      tone="dark"
      eyebrow="Ressonância magnética"
      title="Equipamento de teste"
      lead="Linha de apoio do equipamento."
      crumbs={[{ label: "Início", href: "/" }, { label: "Soluções", href: "/solucoes" }, { label: "Equipamento de teste" }]}
      media={homeMedia.stages.instalacao}
      actions={[
        { label: "Conversar pelo WhatsApp", href: whatsappHref("Olá!"), kind: "primary" },
        { label: "Ver serviços", href: "/servicos", kind: "quiet" },
      ]}
    />
    <PageSection id="pontos" title="Pontos" intro="Introdução da seção.">
      <PointList items={["Primeiro ponto", "Segundo ponto"]} />
    </PageSection>
    <PageSection title="Ficha técnica">
      <SpecTable caption="Especificações" source="Folder oficial do fabricante" rows={[["Campo", "0,4 T"], ["Consumo", "até 3 kW"]]} />
    </PageSection>
    <PageSection title="Linha" tone="dark">
      <CardGrid items={[{ title: "Card", body: "Texto", href: "/solucoes", image: homeMedia.stages.escolha, meta: "Esaote" }, { title: "Sem link" }]} />
      <FactStrip items={[{ value: "+16 anos", label: "em diagnóstico por imagem" }]} />
    </PageSection>
    <PageSection title="Perguntas frequentes">
      <Faq items={[{ q: "Pergunta um?", a: "Resposta um." }, { q: "Pergunta dois?", a: "Resposta dois." }]} />
    </PageSection>
    <PageVideo video={homeMedia.ceo} caption="Legenda do vídeo." />
    <PageContact paths={paths} />
  </PageShell>
);

describe("kit das páginas internas", () => {
  it("PageHero tem uma única h1 e a migalha marca a página atual no último item", () => {
    renderPage(fullPage());
    const titles = screen.getAllByRole("heading", { level: 1 });
    expect(titles).toHaveLength(1);
    expect(titles[0]).toHaveTextContent("Equipamento de teste");

    const crumbs = screen.getByRole("navigation", { name: "Você está em" });
    const items = within(crumbs).getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(within(items[0]).getByRole("link", { name: "Início" })).toHaveAttribute("href", "/");
    const current = items[items.length - 1].querySelector('[aria-current="page"]');
    expect(current).not.toBeNull();
    expect(current).toHaveTextContent("Equipamento de teste");
    expect(crumbs.querySelectorAll('[aria-current="page"]')).toHaveLength(1);
  });

  it("PageHero separa ação interna de link externo", () => {
    renderPage(fullPage());
    const hero = screen.getByRole("region", { name: "Equipamento de teste" });
    const whatsapp = within(hero).getByRole("link", { name: "Conversar pelo WhatsApp" });
    expect(whatsapp).toHaveAttribute("href", whatsappHref("Olá!"));
    expect(whatsapp).toHaveAttribute("target", "_blank");
    expect(whatsapp).toHaveAttribute("rel", expect.stringContaining("noopener"));
    expect(within(hero).getByRole("link", { name: "Ver serviços" })).toHaveAttribute("href", "/servicos");
  });

  it("PageSection rotula a seção pelo próprio título", () => {
    renderPage(fullPage());
    expect(screen.getByRole("region", { name: "Pontos" })).toHaveAttribute("id", "pontos");
    expect(screen.getByRole("region", { name: "Ficha técnica" })).toBeInTheDocument();
  });

  it("SpecTable tem caption e mostra a fonte", () => {
    renderPage(fullPage());
    const table = screen.getByRole("table", { name: "Especificações" });
    expect(table.querySelector("caption")).toHaveTextContent("Especificações");
    expect(within(table).getByRole("rowheader", { name: "Campo" })).toBeInTheDocument();
    expect(within(table).getByRole("cell", { name: "0,4 T" })).toBeInTheDocument();
    expect(screen.getByText(/Folder oficial do fabricante/)).toHaveTextContent("Fonte: Folder oficial do fabricante");
  });

  it("Faq abre e fecha com Enter e Espaço e liga aria-expanded a aria-controls", async () => {
    const user = userEvent.setup();
    renderPage(fullPage());
    const button = screen.getByRole("button", { name: "Pergunta um?" });
    const panel = document.getElementById(button.getAttribute("aria-controls") ?? "");
    expect(panel).not.toBeNull();
    expect(panel).toHaveTextContent("Resposta um.");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(panel).not.toBeVisible();

    button.focus();
    await user.keyboard("{Enter}");
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(panel).toBeVisible();

    await user.keyboard("{Enter}");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(panel).not.toBeVisible();

    await user.keyboard(" ");
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(panel).toBeVisible();

    await user.keyboard(" ");
    expect(button).toHaveAttribute("aria-expanded", "false");

    // Cada pergunta abre sozinha: a segunda continua fechada.
    expect(screen.getByRole("button", { name: "Pergunta dois?" })).toHaveAttribute("aria-expanded", "false");
  });

  it("PageVideo mostra o pôster e só liga os controles depois de Assistir", async () => {
    const user = userEvent.setup();
    const { container } = renderPage(fullPage());
    const video = container.querySelector<HTMLVideoElement>(".page-video video")!;
    expect(video).toHaveAttribute("poster", homeMedia.ceo.poster);
    expect(video).toHaveAttribute("preload", "none");
    expect(video.controls).toBe(false);
    await user.click(screen.getByRole("button", { name: /Assistir/ }));
    expect(video.controls).toBe(true);
    expect(screen.getByText("Legenda do vídeo.")).toBeInTheDocument();
  });

  it("PageContact gera o link do WhatsApp com acentos e interrogação codificados", () => {
    renderPage(fullPage());
    const region = screen.getByRole("region", { name: "Fale com a equipe certa" });
    const link = within(region).getByRole("link", { name: /Tenho uma peça com defeito: Conversar pelo WhatsApp/ });
    expect(link).toHaveAttribute("href", whatsappHref(paths[0].whatsappText));
    expect(link.getAttribute("href")).toContain("%3F");
    expect(link.getAttribute("href")).not.toMatch(/[?].*[?]/);
  });

  it("PageContact aceita título e introdução da página", () => {
    renderPage(
      <PageShell title="Contato" description="d">
        <PageContact title="Fale sobre o seu equipamento" intro="Escolha o assunto da conversa." paths={paths} />
      </PageShell>,
    );
    const region = screen.getByRole("region", { name: "Fale sobre o seu equipamento" });
    expect(within(region).getByText("Escolha o assunto da conversa.")).toBeInTheDocument();
  });

  it("PageShell escreve o título com a marca e a descrição", async () => {
    renderPage(fullPage());
    await screen.findByRole("heading", { level: 1 });
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(document.title).toBe("Página de teste | Hexamedical");
    expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute("content", "Descrição de teste.");
  });

  it("com movimento reduzido e sem IntersectionObserver, nada do kit fica escondido", () => {
    mockMedia((query) => query.includes("prefers-reduced-motion: reduce"));
    // Navegador sem IntersectionObserver.
    vi.stubGlobal("IntersectionObserver", undefined);
    const { container } = renderPage(fullPage());
    const animated = container.querySelectorAll<HTMLElement>("[data-reveal]");
    expect(animated.length).toBeGreaterThan(5);
    for (const element of container.querySelectorAll<HTMLElement>("main *")) {
      const style = element.getAttribute("style") ?? "";
      expect(style).not.toMatch(/opacity:\s*0(?![.\d])|visibility:\s*hidden/);
    }
  });

  it("no desktop sem IntersectionObserver, o kit também fica no estado final", () => {
    mockMedia((query) => query.includes("min-width: 1024px") || (query.includes("no-preference") && !query.includes("max-width")));
    // Navegador sem IntersectionObserver.
    vi.stubGlobal("IntersectionObserver", undefined);
    const { container } = renderPage(fullPage());
    for (const element of container.querySelectorAll<HTMLElement>("[data-reveal]")) {
      const style = element.getAttribute("style") ?? "";
      expect(style).not.toMatch(/opacity:\s*0(?![.\d])|visibility:\s*hidden|inset\(/);
    }
  });

  it("no desktop com movimento, título, mídia e itens partem do estado de entrada e voltam ao HTML ao sair", () => {
    mockMedia((query) => query.includes("min-width: 1024px") || (query.includes("no-preference") && !query.includes("max-width")));
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
        takeRecords() {
          return [];
        }
      },
    );
    const { container, unmount } = renderPage(fullPage());
    // No jsdom tudo já está "na tela": os gatilhos (once) disparam na hora e a entrada começa do zero.
    const title = container.querySelector<HTMLElement>('h1[data-reveal="title"]')!;
    const media = container.querySelector<HTMLElement>('.page-hero__media[data-reveal="media"]')!;
    const item = container.querySelector<HTMLElement>('.page-points [data-reveal="item"]')!;
    expect(title.style.clipPath).toBe("inset(0 0 100% 0)");
    expect(media.style.clipPath).toContain("inset(7% 7%");
    expect(item.style.opacity).toBe("0");
    const elements = [title, media, item];
    unmount();
    // Ao desmontar, o contexto do GSAP desfaz tudo: nenhum gatilho órfão e nenhum estilo inline sobrando.
    expect(ScrollTrigger.getAll().filter((trigger) => !document.body.contains(trigger.trigger as Node))).toHaveLength(0);
    for (const element of elements) expect(element.getAttribute("style") ?? "").toBe("");
  });
});

describe("404 e rodapé no sistema novo", () => {
  it("a 404 usa o hero claro do kit e leva à home, às soluções e ao contato", async () => {
    const { container } = renderPage(<NotFound />, "/solucoes/nao-existe");
    const hero = container.querySelector(".page-hero");
    expect(hero).toHaveClass("page-hero--light");
    expect(within(hero as HTMLElement).getByRole("heading", { level: 1, name: "Página não encontrada" })).toBeInTheDocument();
    expect(within(hero as HTMLElement).getByRole("link", { name: "Ir para a página inicial" })).toHaveAttribute("href", "/");
    expect(within(hero as HTMLElement).getByRole("link", { name: "Ver soluções" })).toHaveAttribute("href", "/solucoes");
    expect(within(hero as HTMLElement).getByRole("link", { name: "Falar com a equipe" })).toHaveAttribute("href", "/contato");
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(document.title).toBe("Página não encontrada | Hexamedical");
    expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute("content", "noindex");
  });

  it("o rodapé mostra a Ouvidoria uma vez só", () => {
    renderPage(<NotFound />, "/x");
    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getAllByRole("link", { name: /Ouvidoria/ })).toHaveLength(1);
  });
});

describe("foco visível no kit", () => {
  // O jsdom não calcula a cascata de :focus-visible; então a regra é travada no próprio CSS:
  // nenhum elemento focável do kit pode declarar `outline` fora de :focus-visible, senão ele vence o
  // anel de foco global (base.css) e o do kit (`.page :focus-visible`), e o foco some (WCAG 2.4.7).
  it("links, botões e cards do kit não sobrescrevem o outline do foco", () => {
    const css = fs.readFileSync(path.join(process.cwd(), "src/styles/page.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
    const focusable = /(page-card__link|page-crumbs a|page-faq button|page-video__play|page-hero__pause|\.button\b|(^|[\s,])a(\b|:))/;
    const offenders: string[] = [];
    for (const [, selector, body] of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
      if (!/(^|;|\s)outline(-offset)?\s*:/.test(body)) continue;
      for (const part of selector.split(",").map((item) => item.trim())) {
        if (focusable.test(part) && !part.includes(":focus-visible")) offenders.push(part);
      }
    }
    expect(offenders).toEqual([]);
  });
});
