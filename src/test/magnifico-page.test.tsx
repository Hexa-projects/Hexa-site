import { render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "@/App";
import MagnificoPage from "@/pages/solucoes/MagnificoPage";
import { magnifico } from "@/data/pages/magnifico";
import { showroom, whatsappHref } from "@/data/home";
import { homeMedia } from "@/data/homeMedia";
import { ScrollTrigger } from "@/lib/motion";

const ROUTE = "/solucoes/magnifico-open";
const originalMatchMedia = window.matchMedia;

/** Simula a tela: desktop ou celular, com ou sem movimento reduzido (o jsdom não casa nenhuma consulta). */
function setScreen({ wide, reduced }: { wide: boolean; reduced: boolean }) {
  window.matchMedia = ((query: string) => {
    const checks: boolean[] = [];
    if (query.includes("min-width: 1024px")) checks.push(wide);
    if (query.includes("max-width: 1023px")) checks.push(!wide);
    if (query.includes("prefers-reduced-motion: reduce")) checks.push(reduced);
    if (query.includes("prefers-reduced-motion: no-preference")) checks.push(!reduced);
    return {
      matches: checks.length > 0 && checks.every(Boolean),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    };
  }) as typeof window.matchMedia;
}

const renderPage = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[ROUTE]}>
        <MagnificoPage />
      </MemoryRouter>
    </HelmetProvider>,
  );

const page = (container: HTMLElement) => container.querySelector(".page") as HTMLElement;
const scene = () => screen.getByRole("region", { name: magnifico.scene.title });
const pins = () => ScrollTrigger.getAll().filter((trigger) => trigger.pin);

beforeEach(() => window.history.pushState({}, "", ROUTE));
afterEach(() => {
  window.matchMedia = originalMatchMedia;
});

describe("Magnifico Open: conteúdo", () => {
  it("mostra os fatos técnicos da Esaote e da base comercial", () => {
    const { container } = renderPage();
    const text = page(container).textContent ?? "";
    expect(screen.getByRole("heading", { level: 1, name: "Magnifico Open" })).toBeInTheDocument();
    for (const fact of ["0,4 T", "ímã permanente", "Não usa hélio", "cerca de 20 m²", "até 3 kW", "monofásica 220 V", "True-Motion", "Speed-Up 2D e 3D", "MAR"]) {
      expect(text.includes(fact), fact).toBe(true);
    }
    // Área e consumo oficiais: PD p5 ("about 20 sqmt", 3.000 VA) e brochura p10 ("maximum 3 Kw").
    // Fora os relacionados: o card do G-scan Open diz "menos de 3 kW", que é dele.
    const own = Array.from(page(container).querySelectorAll("section"))
      .filter((section) => section.id !== "outras-ressonancias")
      .map((section) => section.textContent)
      .join(" ");
    for (const old of ["até 20 m²", "menos de 3 kW", "máximo de 3 kW"]) expect(own.includes(old), old).toBe(false);
  });

  it("traz a tabela de cobertura clínica com a fonte declarada", () => {
    renderPage();
    const table = screen.getByRole("table", { name: /cobertura clínica/i });
    const rows = within(table).getAllByRole("rowheader").map((th) => th.textContent?.trim());
    expect(rows).toEqual(["Musculoesquelético", "Coluna e canal vertebral", "Neuro", "Abdome e pelve"]);
    const cells = (label: string) => within(table).getByRole("rowheader", { name: label }).closest("tr")!.textContent ?? "";
    expect(cells("Musculoesquelético")).toContain("100%");
    expect(cells("Coluna e canal vertebral")).toContain("87,5%");
    expect(cells("Neuro")).toMatch(/opcional/);
    const panel = table.closest(".page-spec") as HTMLElement;
    expect(within(panel).getByText(/^Fonte:/)).toHaveTextContent(/Esaote/);
  });

  it("fecha com a triagem e a mensagem pronta da página", () => {
    renderPage();
    const links = screen.getAllByRole("link").map((link) => link.getAttribute("href"));
    expect(links).toContain(whatsappHref("Olá! Quero saber mais sobre o Magnifico Open."));
  });

  it("leva a S-scan, O-scan, G-scan e à página da linha de RM", () => {
    renderPage();
    const related = screen.getByRole("region", { name: magnifico.related.title });
    const hrefs = within(related).getAllByRole("link").map((link) => link.getAttribute("href"));
    for (const href of ["/solucoes/s-scan-open", "/solucoes/o-scan-smart", "/solucoes/g-scan", "/solucoes/ressonancia-magnetica"]) {
      expect(hrefs, href).toContain(href);
    }
  });

  it("não usa travessão nem meia-risca no texto", () => {
    const dash = new RegExp(`[${String.fromCharCode(0x2014)}${String.fromCharCode(0x2013)}]`);
    expect(dash.test(JSON.stringify(magnifico))).toBe(false);
  });
});

describe("Magnifico Open: cena do vídeo", () => {
  it("usa o vídeo oficial da home, mudo com o atributo escrito (iOS), e os três fatos em ordem", () => {
    renderPage();
    const region = scene();
    const video = region.querySelector("video") as HTMLVideoElement;
    expect(video).toHaveAttribute("muted");
    expect(video).toHaveAttribute("playsinline");
    const sources = Array.from(video.querySelectorAll("source")).map((source) => source.getAttribute("src"));
    expect(sources).toContain(homeMedia.tunnel.desktop.mp4);
    const facts = within(region).getAllByRole("term").map((term) => term.textContent?.trim());
    expect(facts).toEqual(["0,4 T", "Sem hélio", "cerca de 20 m²"]);
    expect(within(region).getByRole("button", { name: /vídeo/i })).toBeInTheDocument();
  });

  it("não monta o palco WebGL nem a rolagem suave", () => {
    const { container } = renderPage();
    expect(container.querySelector("canvas")).toBeNull();
    expect(document.documentElement.classList.contains("lenis")).toBe(false);
  });

  it("com movimento reduzido: sem pin, os três fatos visíveis e o vídeo parado no pôster", () => {
    setScreen({ wide: true, reduced: true });
    window.history.pushState({}, "", `${ROUTE}?palco=imersivo`);
    renderPage();
    expect(pins()).toHaveLength(0);
    for (const term of within(scene()).getAllByRole("term")) {
      const item = term.parentElement as HTMLElement;
      expect(item.style.opacity, term.textContent ?? "").not.toBe("0");
      expect(item.style.visibility).not.toBe("hidden");
    }
    const video = scene().querySelector("video") as HTMLVideoElement;
    expect(video).not.toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("preload", "none");
    expect(video).toHaveAttribute("poster", homeMedia.tunnel.desktop.poster);
    expect((scene().querySelector(".mag-scene__aperture") as HTMLElement).style.clipPath).toBe("");
  });

  it("no modo leve: sem pin e sem recorte, mesmo no desktop", () => {
    setScreen({ wide: true, reduced: false });
    window.history.pushState({}, "", `${ROUTE}?palco=leve`);
    renderPage();
    expect(pins()).toHaveLength(0);
    expect((scene().querySelector(".mag-scene__aperture") as HTMLElement).style.clipPath).toBe("");
  });

  it("no desktop imersivo: prende a cena, abre do círculo e cria o gatilho de altura depois do pin", () => {
    setScreen({ wide: true, reduced: false });
    window.history.pushState({}, "", `${ROUTE}?palco=imersivo`);
    const { unmount } = renderPage();
    expect(pins()).toHaveLength(1);
    const aperture = scene().querySelector(".mag-scene__aperture") as HTMLElement;
    expect(aperture.style.clipPath).toMatch(/^inset\(/);
    const all = ScrollTrigger.getAll();
    const pinIndex = all.findIndex((trigger) => trigger.pin);
    const followIndex = all.findIndex((trigger) => trigger.trigger === scene());
    expect(followIndex).toBeGreaterThan(pinIndex);
    unmount();
    expect(ScrollTrigger.getAll()).toHaveLength(0);
  });

  it("no celular imersivo também prende a cena", () => {
    setScreen({ wide: false, reduced: false });
    window.history.pushState({}, "", `${ROUTE}?palco=imersivo`);
    const { unmount } = renderPage();
    expect(pins()).toHaveLength(1);
    unmount();
  });
});

describe("Magnifico Open: rota e vitrine da home", () => {
  it("a rota abre a página nova, não a temporária", async () => {
    render(<App />);
    expect(await screen.findByRole("heading", { level: 1, name: "Magnifico Open" }, { timeout: 5000 })).toBeInTheDocument();
    expect(screen.queryByText(/em preparação/)).toBeNull();
  });

  it("o card da vitrine da home aponta para a página interna", () => {
    const card = showroom.find((item) => item.id === "magnifico-open")!;
    expect(card.href).toBe(ROUTE);
    expect(card.href.startsWith("/")).toBe(true);
  });
});

describe("Magnifico Open: cena sem vazamento e economia de dados", () => {
  afterEach(() => {
    delete (navigator as Navigator & { connection?: unknown }).connection;
  });

  it("rolar a cena para frente e para trás não acumula animações no contexto", () => {
    setScreen({ wide: true, reduced: false });
    window.history.pushState({}, "", `${ROUTE}?palco=imersivo`);
    const { unmount } = renderPage();
    const timeline = pins()[0].animation as gsap.core.Timeline & { _ctx: { data: unknown[] } };
    const context = timeline._ctx;
    timeline.progress(0.05);
    const before = context.data.length;
    for (let round = 0; round < 5; round++) {
      for (let step = 1; step <= 20; step++) timeline.progress(step / 20);
      for (let step = 19; step >= 0; step--) timeline.progress(step / 20);
    }
    expect(context.data.length).toBe(before);
    // O revert do contexto devolve recorte, anel e véu ao repouso, mesmo com as escritas diretas por quadro.
    const aperture = scene().querySelector(".mag-scene__aperture") as HTMLElement;
    const ring = scene().querySelector(".mag-scene__ring") as HTMLElement;
    const overlay = scene().querySelector(".mag-scene__overlay") as HTMLElement;
    expect(aperture.style.clipPath).toMatch(/^inset\(/);
    (context as unknown as { revert: () => void }).revert();
    expect(aperture.style.clipPath).toBe("");
    expect(ring.style.width).toBe("");
    expect(ring.style.opacity).toBe("");
    expect(overlay.style.getPropertyValue("--mag-veil")).toBe("");
    unmount();
  });

  const sceneTrigger = () => ScrollTrigger.getAll().find((trigger) => trigger.trigger === scene())!;

  it("no modo leve o vídeo toca sozinho quando a cena entra na tela", () => {
    setScreen({ wide: true, reduced: false });
    window.history.pushState({}, "", `${ROUTE}?palco=leve`);
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(() => Promise.resolve());
    const { unmount } = renderPage();
    sceneTrigger().vars.onToggle?.({ isActive: true } as ScrollTrigger);
    expect(play).toHaveBeenCalled();
    play.mockRestore();
    unmount();
  });

  it("com economia de dados o vídeo não toca sozinho: fica no pôster, com o botão de tocar", () => {
    Object.defineProperty(navigator, "connection", { value: { saveData: true }, configurable: true });
    setScreen({ wide: true, reduced: false });
    window.history.pushState({}, "", `${ROUTE}?palco=leve`);
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(() => Promise.resolve());
    const { unmount } = renderPage();
    sceneTrigger().vars.onToggle?.({ isActive: true } as ScrollTrigger);
    expect(play).not.toHaveBeenCalled();
    const video = scene().querySelector("video") as HTMLVideoElement;
    expect(video).toHaveAttribute("preload", "none");
    expect(video).toHaveAttribute("poster", homeMedia.tunnel.desktop.poster);
    expect(within(scene()).getByRole("button", { name: "Tocar vídeo" })).toBeInTheDocument();
    play.mockRestore();
    unmount();
  });
});
