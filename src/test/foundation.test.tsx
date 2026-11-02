import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Layout from "@/components/layout/Layout";
import { duration, ease, MEDIA, stagger } from "@/lib/motion";
import NotFound from "@/pages/NotFound";

const renderAt = (ui: React.ReactNode, path = "/") =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>{ui}</MemoryRouter>
    </HelmetProvider>,
  );

describe("tokens de movimento", () => {
  it("seguem os valores da spec", () => {
    expect(duration).toEqual({ instant: 0.12, quick: 0.24, base: 0.45, focal: 0.8 });
    expect(ease).toEqual({ out: "expo.out", inOut: "power2.inOut", scan: "none", exit: "power2.in" });
    expect(stagger).toEqual({ list: 0.06, max: 0.4 });
    expect(MEDIA.reduced).toBe("(prefers-reduced-motion: reduce)");
  });
});

describe("layout", () => {
  it("oferece um link para pular direto ao conteúdo", () => {
    renderAt(<Layout><p>conteúdo</p></Layout>);
    expect(screen.getByRole("link", { name: "Pular para o conteúdo" })).toHaveAttribute("href", "#conteudo");
    expect(screen.getByRole("main")).toHaveAttribute("id", "conteudo");
  });
});

describe("cabeçalho e rodapé", () => {
  it("na home, o cabeçalho fica sobre o palco com o logo claro", () => {
    const { container } = renderAt(<Layout><p>home</p></Layout>, "/");
    expect(container.querySelector(".site-header")).toHaveClass("site-header--stage");
    expect(screen.getAllByAltText("Hexamedical")[0]).toHaveAttribute("src", "/assets/brand/hexamedical-logo-light.webp");
  });

  it("nas páginas internas, o cabeçalho é o claro, com o logo original", () => {
    const { container } = renderAt(<Layout><p>contato</p></Layout>, "/contato");
    expect(container.querySelector(".site-header")).not.toHaveClass("site-header--stage");
    expect(screen.getAllByAltText("Hexamedical")[0]).toHaveAttribute("src", "/assets/brand/hexamedical-logo.webp");
  });

  it("o rodapé mantém telefone e e-mail comerciais", () => {
    renderAt(<Layout><p>x</p></Layout>, "/contato");
    const footer = screen.getByRole("contentinfo");
    expect(footer.querySelector('a[href="tel:+5511973140914"]')).not.toBeNull();
    expect(footer.querySelector('a[href="mailto:comercial@hexamedical.com.br"]')).not.toBeNull();
  });
});

describe("página não encontrada", () => {
  it("fala português e leva de volta ao site", () => {
    renderAt(<NotFound />, "/nao-existe");
    expect(screen.getByRole("heading", { level: 1, name: /página não encontrada/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ir para a página inicial" })).toHaveAttribute("href", "/");
  });
});
