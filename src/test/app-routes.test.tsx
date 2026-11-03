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
});
