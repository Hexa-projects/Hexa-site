import fs from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "@/App";
import { legacyRedirects, publicRoutes } from "@/data/routes";

const SITE = "https://www.hexamedical.com.br";
const read = (file: string) => fs.readFileSync(path.join(process.cwd(), file), "utf8");
const matches = (source: string, pathname: string) => new RegExp(`^${source.replace(/:[a-z]+/gi, "[^/]+")}$`).test(pathname);
const isRedirectSource = (pathname: string) => legacyRedirects.some((r) => matches(r.source, pathname));

describe("sitemap e robots", () => {
  it("o sitemap.xml lista exatamente as rotas públicas, com URL absoluta", () => {
    const xml = read("public/sitemap.xml");
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(locs).toEqual(publicRoutes.map((route) => `${SITE}${route === "/" ? "/" : route}`));
    expect(xml).toMatch(/^<\?xml version="1.0" encoding="UTF-8"\?>/);
    expect(xml).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
  });

  it("nenhuma rota pública é fonte de redirecionamento", () => {
    for (const route of publicRoutes) expect(isRedirectSource(route), route).toBe(false);
  });

  it("o robots.txt aponta para o sitemap", () => {
    expect(read("public/robots.txt")).toContain(`Sitemap: ${SITE}/sitemap.xml`);
  });

  it("o index.html não usa travessão no título nem fixa um link canônico para todas as rotas", () => {
    const html = read("index.html");
    expect(html).not.toContain('rel="canonical"');
    for (const tag of html.match(/<title>[^<]*<\/title>|content="[^"]*"/g) ?? []) expect(tag).not.toMatch(/[—–]/);
  });

  it("a imagem de compartilhamento é própria, absoluta no domínio do site e existe em public/", () => {
    const html = read("index.html");
    const images = [...html.matchAll(/<meta (?:property|name)="(?:og|twitter):image" content="([^"]+)"/g)].map((m) => m[1]);
    expect(images).toHaveLength(2);
    for (const url of images) {
      expect(url.startsWith(`${SITE}/`), url).toBe(true);
      expect(fs.existsSync(path.join(process.cwd(), "public", url.slice(SITE.length))), url).toBe(true);
    }
    expect(html).toContain('<meta property="og:image:width" content="1200"');
    expect(html).toContain('<meta property="og:image:height" content="630"');
    expect(html).toMatch(/<meta property="og:image:alt" content="[^"]{10,}"/);
  });
});

describe("cada página pública", () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it(
    "tem <title> e meta description únicos, sem travessão, e nenhum link interno aponta para redirecionamento",
    async () => {
      // A ouvidoria pede a pergunta de verificação ao abrir.
      vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ challenge: { token: "t", question: "Quanto é 1 + 1?" } }), { status: 200 })));
      const titles = new Map<string, string>();
      const descriptions = new Map<string, string>();
      const badLinks: string[] = [];

      for (const route of publicRoutes) {
        document.title = "";
        document.head.querySelectorAll('meta[name="description"], link[rel="canonical"]').forEach((node) => node.remove());
        window.history.pushState({}, "", route);
        render(createElement(App));
        await screen.findByRole("heading", { level: 1 }, { timeout: 8000 });
        await waitFor(() => expect(document.title, route).not.toBe(""));
        await waitFor(() => expect(document.head.querySelector('meta[name="description"]'), route).not.toBeNull());
        expect(window.location.pathname, `${route} não pode redirecionar`).toBe(route);

        const title = document.title;
        const description = document.head.querySelector('meta[name="description"]')!.getAttribute("content") ?? "";
        expect(title, route).not.toMatch(/[—–]/);
        expect(title, route).toMatch(/Hexamedical/);
        expect(description.length, route).toBeGreaterThan(40);
        const canonical = [...document.head.querySelectorAll('link[rel="canonical"]')].map((node) => node.getAttribute("href"));
        expect(canonical, route).toEqual([`${SITE}${route}`]);
        expect(titles.get(title), `${route} repete o título de ${titles.get(title)}`).toBeUndefined();
        expect(descriptions.get(description), `${route} repete a descrição de ${descriptions.get(description)}`).toBeUndefined();
        titles.set(title, route);
        descriptions.set(description, route);

        for (const anchor of document.querySelectorAll<HTMLAnchorElement>("a[href^='/']")) {
          const href = anchor.getAttribute("href")!.split(/[?#]/)[0] || "/";
          if (/\.[a-z0-9]+$/i.test(href)) continue; // arquivos (PDF, imagem)
          if (isRedirectSource(href) || !publicRoutes.includes(href)) badLinks.push(`${route} -> ${href}`);
        }
        cleanup();
      }

      expect(badLinks).toEqual([]);
    },
    180_000,
  );
});

describe("sistema antigo removido", () => {
  it("as páginas, seções, dados e estilos antigos saíram do repositório", () => {
    for (const file of [
      "src/pages/ProductEditorialPage.tsx",
      "src/pages/CasesPage.tsx",
      "src/pages/ConteudoHub.tsx",
      "src/pages/SegmentPage.tsx",
      "src/pages/SegmentosHub.tsx",
      "src/components/sections",
      "src/components/NavLink.tsx",
      "src/components/layout/PageBreadcrumb.tsx",
      "src/data/media.ts",
      "src/data/catalog.ts",
      "src/data/segments.ts",
      "src/data/solutions.ts",
      "src/data/editorial.ts",
      "src/editorial.css",
      "src/editorial-models.css",
      "src/editorial-scenes.css",
      "src/App.css",
    ]) {
      expect(fs.existsSync(path.join(process.cwd(), file)), file).toBe(false);
    }
  });

  it("o main.tsx só carrega os estilos do sistema novo", () => {
    expect(read("src/main.tsx")).not.toMatch(/editorial|wdm|App\.css/);
  });
});

describe("contraste dos tokens", () => {
  it("ink-3 como cor de texto só aparece em texto grande (DESIGN.md: ink-3 só em texto grande e traços)", () => {
    const dir = path.join(process.cwd(), "src/styles");
    const offenders: string[] = [];
    for (const file of fs.readdirSync(dir).filter((name) => name.endsWith(".css"))) {
      const css = fs.readFileSync(path.join(dir, file), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
      for (const [, selector, body] of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
        if (!/(^|[;\s])color:\s*var\(--ink-3\)/.test(body)) continue;
        if (!/font-size:\s*var\(--step-[2-5]\)/.test(body)) offenders.push(`${file}: ${selector.trim()}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});
