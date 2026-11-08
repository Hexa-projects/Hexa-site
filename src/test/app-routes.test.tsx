import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "@/App";

describe("rotas", () => {
  it("carrega a home sob demanda e mostra o título principal", async () => {
    window.history.pushState({}, "", "/");
    render(<App />);
    expect(await screen.findByRole("heading", { level: 1, name: "Ressonância magnética que cabe na sua clínica." }, { timeout: 5000 })).toBeInTheDocument();
  });

  it("carrega uma página interna sob demanda", async () => {
    window.history.pushState({}, "", "/rota-inexistente");
    render(<App />);
    expect(await screen.findByRole("heading", { level: 1, name: /página não encontrada/i }, { timeout: 5000 })).toBeInTheDocument();
  });

  it("honra o slug interno antigo e redireciona para a rota nova", async () => {
    window.history.pushState({}, "", "/solucoes/rm-s-scan");
    render(<App />);
    expect(await screen.findByRole("heading", { level: 1, name: /S-scan/i }, { timeout: 5000 })).toBeInTheDocument();
    expect(window.location.pathname).toBe("/solucoes/s-scan-open");
  });

  it("o Vet-MR Grande redireciona para a página da veterinária", async () => {
    window.history.pushState({}, "", "/solucoes/vet-mr-grande");
    render(<App />);
    expect(await screen.findByRole("heading", { level: 1, name: /veterin/i }, { timeout: 5000 })).toBeInTheDocument();
    expect(window.location.pathname).toBe("/solucoes/veterinaria");
  });
});
