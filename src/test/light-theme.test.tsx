import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Index from "@/pages/Index";
import { RING_TUNNEL_FRAG } from "@/motion/stage/ringTunnel.frag";

/**
 * Paleta da marca: branco e laranja. Preto só em texto e detalhes, nunca como fundo (pedido do Lucas, 2026-11-09).
 */

const STYLES = join(process.cwd(), "src", "styles");
const DARK_LOGO = "/assets/brand/hexamedical-logo.webp";

/** Luminância relativa WCAG de uma cor #rgb, #rrggbb ou rgb()/rgba(). */
const luminance = (color: string): number | null => {
  let rgb: number[] | null = null;
  const hex = color.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    const h = hex[1].length === 3 ? hex[1].split("").map((c) => c + c).join("") : hex[1];
    rgb = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  }
  const fn = color.match(/^rgba?\(\s*(\d+)[ ,]+(\d+)[ ,]+(\d+)(?:[ ,/]+([\d.]+))?\s*\)$/i);
  if (fn) {
    // Véus quase transparentes não pintam o fundo.
    if (fn[4] !== undefined && Number(fn[4]) < 0.3) return null;
    rgb = [fn[1], fn[2], fn[3]].map(Number);
  }
  if (!rgb) return null;
  const [r, g, b] = rgb.map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const tokens = (): Record<string, string> => {
  const css = readFileSync(join(STYLES, "tokens.css"), "utf8");
  return Object.fromEntries([...css.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
};

describe("tema claro", () => {
  // Escuro = luminância abaixo de 0,1 (o grafite antigo era 0,004; o laranja de sinal é 0,33 e continua valendo).
  it("nenhum fundo das folhas de estilo do site é escuro", () => {
    const vars = tokens();
    const resolve = (value: string): string => {
      const v = value.match(/^var\((--[\w-]+)\)$/);
      return v ? resolve(vars[v[1]] ?? "") : value;
    };
    const offenders: string[] = [];
    for (const file of readdirSync(STYLES).filter((f) => f.endsWith(".css"))) {
      const css = readFileSync(join(STYLES, file), "utf8");
      for (const m of css.matchAll(/background(?:-color)?:\s*([^;]+);/g)) {
        const colors = m[1].match(/var\(--[\w-]+\)|#[0-9a-f]{3,6}\b|rgba?\([^)]*\)/gi) ?? [];
        for (const raw of colors) {
          const lum = luminance(resolve(raw));
          if (lum !== null && lum < 0.1) offenders.push(`${file}: ${m[0]}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });

  it("o palco animado da abertura pinta sobre branco", () => {
    const ground = RING_TUNNEL_FRAG.match(/const vec3 GROUND = vec3\(([^)]+)\)/);
    expect(ground).not.toBeNull();
    const [r, g, b] = ground![1].split(",").map(Number);
    expect(Math.min(r, g, b)).toBeGreaterThan(0.9);
  });

  it("a abertura da home não pede cabeçalho escuro e o logo é sempre o original", () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/"]}>
          <Index />
        </MemoryRouter>
      </HelmetProvider>,
    );
    expect(document.querySelector("[data-header-theme]")).toBeNull();
    expect(screen.getByRole("banner")).not.toHaveClass("site-header--stage");
    for (const logo of screen.getAllByAltText("Hexamedical")) expect(logo).toHaveAttribute("src", DARK_LOGO);
  });
});
