import { Suspense } from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AppRoutes } from "@/App";
import { ScrollTrigger } from "@/lib/motion";

/**
 * Páginas que dividem o mesmo componente (/servicos/:slug, as linhas de /solucoes) precisam montar de novo
 * a cada URL: senão os nós reaproveitados ficam com o estado da página anterior (recorte, opacidade 0,
 * gatilhos de rolagem velhos) e o FAQ abre na nova página a pergunta aberta na anterior.
 */

const originalMatchMedia = window.matchMedia;

afterEach(() => {
  window.matchMedia = originalMatchMedia;
  vi.unstubAllGlobals();
});

/** Desktop com movimento e IntersectionObserver: as entradas do kit rodam de verdade. */
const withMotion = () => {
  window.matchMedia = ((query: string) => ({
    matches: query.includes("min-width: 1024px") || (query.includes("no-preference") && !query.includes("max-width")),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
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
};

const renderAt = (url: string) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[url]}>
        <Suspense fallback={null}>
          <AppRoutes />
        </Suspense>
      </MemoryRouter>
    </HelmetProvider>,
  );

/** Abre o menu móvel, expande o grupo e clica no link da página. */
const goViaMenu = async (group: string, label: string) => {
  const user = userEvent.setup();
  await user.click(screen.getByRole("button", { name: "Abrir menu" }));
  const menu = screen.getByRole("navigation", { name: "Navegação móvel" });
  await user.click(within(menu).getByRole("button", { name: `Expandir ${group}` }));
  await user.click(within(menu).getByRole("link", { name: label }));
};

const openFirstFaq = async (container: HTMLElement) => {
  const question = container.querySelector<HTMLButtonElement>(".page-faq button")!;
  await userEvent.setup().click(question);
  expect(question).toHaveAttribute("aria-expanded", "true");
};

const expectFreshPage = async (container: HTMLElement, before: HTMLElement) => {
  const after = container.querySelector<HTMLElement>(".page")!;
  // A página nova é outra árvore: nada do estado da anterior é reaproveitado.
  expect(after).not.toBe(before);
  expect(document.body.contains(before)).toBe(false);
  for (const button of after.querySelectorAll(".page-faq button")) expect(button).toHaveAttribute("aria-expanded", "false");
  // Todos os gatilhos de rolagem vivos apontam para nós da página atual.
  for (const trigger of ScrollTrigger.getAll()) expect(document.body.contains(trigger.trigger as Node)).toBe(true);
  // Terminadas as entradas, nada fica preso no estado inicial (opacidade 0 ou recorte).
  await waitFor(
    () => {
      for (const element of after.querySelectorAll<HTMLElement>("[data-reveal]")) {
        expect(element.getAttribute("style") ?? "").not.toMatch(/opacity:\s*0(?![.\d])|inset\(/);
      }
    },
    { timeout: 4000 },
  );
};

describe("páginas do mesmo componente montam de novo a cada endereço", () => {
  it("de /servicos/manutencao para /servicos/contratos pelo menu", async () => {
    withMotion();
    const { container } = renderAt("/servicos/manutencao");
    await screen.findByRole("heading", { level: 1, name: /manuten/i }, { timeout: 5000 });
    await openFirstFaq(container);
    const before = container.querySelector<HTMLElement>(".page")!;
    await goViaMenu("Serviços", "Contratos de manutenção");
    await screen.findByRole("heading", { level: 1, name: /contrato/i }, { timeout: 5000 });
    await expectFreshPage(container, before);
  }, 15000);

  it("de /solucoes/bombas-injetoras para /solucoes/radiografia-digital pelo menu", async () => {
    withMotion();
    const { container } = renderAt("/solucoes/bombas-injetoras");
    await screen.findByRole("heading", { level: 1, name: /injetora/i }, { timeout: 5000 });
    await openFirstFaq(container);
    const before = container.querySelector<HTMLElement>(".page")!;
    await goViaMenu("Soluções", "Radiografia digital");
    await screen.findByRole("heading", { level: 1, name: /radiografia/i }, { timeout: 5000 });
    await expectFreshPage(container, before);
  }, 15000);
});

describe("a home não remonta ao mudar só o hash", () => {
  it("o link para /#contato mantém a mesma árvore da home", async () => {
    Element.prototype.scrollIntoView = vi.fn();
    const { container } = renderAt("/");
    await screen.findByRole("heading", { level: 1, name: "Ressonância magnética que cabe na sua clínica." }, { timeout: 5000 });
    const before = container.querySelector("main")!;
    await userEvent.setup().click(container.querySelector<HTMLAnchorElement>('.site-header__cta[href="/#contato"]')!);
    expect(container.querySelector("main")).toBe(before);
    expect(document.body.contains(before)).toBe(true);
  }, 15000);
});
