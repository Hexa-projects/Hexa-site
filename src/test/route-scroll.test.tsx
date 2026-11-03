import { fireEvent, render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { Link, MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import RouteScroll from "@/components/RouteScroll";
import Layout from "@/components/layout/Layout";
import Index from "@/pages/Index";

describe("rolagem entre seções e páginas", () => {
  const scrollIntoView = vi.fn();
  const scrollTo = vi.fn();

  beforeEach(() => {
    Element.prototype.scrollIntoView = scrollIntoView;
    window.scrollTo = scrollTo as unknown as typeof window.scrollTo;
  });

  afterEach(() => {
    scrollIntoView.mockReset();
    scrollTo.mockReset();
  });

  const Page = ({ name }: { name: string }) => (
    <div>
      <h1>{name}</h1>
      <Link to="/b">Ir para B</Link>
      <Link to="/a#alvo">Ir para a seção</Link>
      <section id="alvo">alvo</section>
    </div>
  );

  const renderRoutes = (start: string) =>
    render(
      <MemoryRouter initialEntries={[start]}>
        <RouteScroll />
        <Routes>
          <Route path="/a" element={<Page name="A" />} />
          <Route path="/b" element={<Page name="B" />} />
        </Routes>
      </MemoryRouter>,
    );

  it("link para uma seção desliza suavemente até ela, em vez de saltar", () => {
    renderRoutes("/a");
    fireEvent.click(screen.getByRole("link", { name: "Ir para a seção" }));
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
  });

  it("uma página nova abre no topo, não na altura da página anterior", () => {
    renderRoutes("/a");
    scrollTo.mockReset();
    fireEvent.click(screen.getByRole("link", { name: "Ir para B" }));
    expect(screen.getByRole("heading", { name: "B" })).toBeInTheDocument();
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "instant" });
  });

  it("com movimento reduzido, vai direto à seção, sem animar", () => {
    const original = window.matchMedia;
    window.matchMedia = ((query: string) => ({ ...original(query), matches: query.includes("reduce") })) as typeof window.matchMedia;
    renderRoutes("/a");
    fireEvent.click(screen.getByRole("link", { name: "Ir para a seção" }));
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "auto", block: "start" });
    window.matchMedia = original;
  });
});

describe("chamadas de contato na home", () => {
  const renderHome = () =>
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/"]}>
          <Index />
        </MemoryRouter>
      </HelmetProvider>,
    );

  it("a seção de contato da home tem uma âncora", () => {
    renderHome();
    expect(screen.getByRole("region", { name: "Como podemos ajudar?" })).toHaveAttribute("id", "contato");
  });

  it("na home, falar com especialista leva à seção de contato da própria página", () => {
    renderHome();
    const header = screen.getByRole("banner");
    expect(within(header).getByRole("link", { name: /Falar com especialista/ })).toHaveAttribute("href", "/#contato");
    const hero = screen.getByRole("region", { name: /Do projeto da sala/ });
    expect(within(hero).getByRole("link", { name: /Falar com especialista/ })).toHaveAttribute("href", "/#contato");
  });

  it("nas outras páginas, falar com especialista continua indo para a página de contato", () => {
    render(
      <MemoryRouter initialEntries={["/solucoes"]}>
        <Layout>
          <p>x</p>
        </Layout>
      </MemoryRouter>,
    );
    expect(within(screen.getByRole("banner")).getByRole("link", { name: /Falar com especialista/ })).toHaveAttribute("href", "/contato");
  });
});
