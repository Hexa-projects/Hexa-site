import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { legacyRedirects, publicRoutes } from "@/data/routes";
import { navigation } from "@/data/navigation";

const vercel = JSON.parse(fs.readFileSync(path.join(process.cwd(), "vercel.json"), "utf8")) as {
  rewrites: { source: string; destination: string }[];
  redirects: { source: string; destination: string; permanent: boolean }[];
};

const matches = (source: string, pathname: string) => new RegExp(`^${source.replace(/:[a-z]+/gi, "[^/]+")}$`).test(pathname);

describe("redirecionamentos 301", () => {
  const spec: [string, string][] = [
    ["/produtos", "/solucoes"],
    ["/rm-esaote-magnifico-open", "/solucoes/magnifico-open"],
    ["/rm-esaote-s-scan", "/solucoes/s-scan-open"],
    ["/rm-esaote-o-scan", "/solucoes/o-scan-smart"],
    ["/rm-esaote-g-scan", "/solucoes/g-scan"],
    ["/bombas-injetoras", "/solucoes/bombas-injetoras"],
    ["/mindray", "/solucoes/radiografia-digital"],
    ["/hexai", "/solucoes/hexai"],
    ["/area-veterinaria", "/solucoes/veterinaria"],
    ["/area-veterinaria-hexamedical", "/solucoes/veterinaria"],
    ["/lp/careverse", "/solucoes/careverse"],
    ["/manutencao-de-equipamentos", "/servicos/manutencao"],
    ["/contratos-de-manutencao", "/servicos/contratos"],
    ["/desinstalacao-e-instalacao-de-equipamentos", "/servicos/instalacao"],
    ["/reparo-de-pecas-e-perifericos", "/servicos/reparo"],
    ["/apoio", "/materiais"],
    ["/sobre", "/empresa"],
    ["/estrutura", "/empresa"],
    ["/conteudo", "/blog"],
    ["/segmentos", "/solucoes"],
    ["/segmentos/:slug", "/solucoes"],
    ["/cases", "/solucoes"],
    ["/solucoes/rm-s-scan", "/solucoes/s-scan-open"],
    ["/solucoes/rm-o-scan", "/solucoes/o-scan-smart"],
    ["/solucoes/rm-g-scan", "/solucoes/g-scan"],
    ["/solucoes/rm-magnifico-open", "/solucoes/magnifico-open"],
    ["/solucoes/mindray", "/solucoes/radiografia-digital"],
    ["/solucoes/veterinario", "/solucoes/veterinaria"],
  ];

  it("cobre cada URL antiga do mapa de rotas e os slugs internos antigos", () => {
    for (const [source, destination] of spec) {
      expect(legacyRedirects, source).toContainEqual({ source, destination });
    }
  });

  it("não redireciona para o mesmo caminho (a barra final é tratada pela Vercel)", () => {
    for (const r of legacyRedirects) expect(r.source).not.toBe(r.destination);
  });

  it("o vercel.json repete cada redirecionamento, permanente, com e sem barra final", () => {
    for (const r of legacyRedirects) {
      for (const source of [r.source, `${r.source}/`]) {
        const entry = vercel.redirects.find((item) => item.source === source);
        expect(entry, source).toBeDefined();
        expect(entry!.destination).toBe(r.destination);
        expect(entry!.permanent).toBe(true);
      }
    }
    expect(vercel.redirects.length).toBe(legacyRedirects.length * 2);
    expect(vercel.rewrites).toContainEqual({ source: "/(.*)", destination: "/index.html" });
  });

  it("cada fonte casa com e sem barra final", () => {
    for (const entry of vercel.redirects) {
      const bare = entry.source.replace(/\/$/, "");
      const concrete = bare.replace(/:[a-z]+/gi, "exemplo");
      expect(matches(bare, concrete), bare).toBe(true);
      expect(vercel.redirects.some((item) => item.source === `${bare}/`), bare).toBe(true);
    }
  });

  it("nenhum destino é outra fonte (sem cadeia)", () => {
    for (const r of legacyRedirects) {
      const chained = legacyRedirects.some((other) => matches(other.source, r.destination));
      expect(chained, `${r.source} -> ${r.destination}`).toBe(false);
    }
  });

  it("todo destino é uma rota pública", () => {
    for (const r of legacyRedirects) expect(publicRoutes, r.destination).toContain(r.destination);
  });
});

describe("navegação", () => {
  const links = navigation.flatMap((item) => [item.href, ...(item.children ?? []).map((child) => child.href)]);

  it("só aponta para rotas públicas do mapa", () => {
    for (const href of links) expect(publicRoutes, href).toContain(href);
  });

  it("usa os rótulos aprovados", () => {
    const labels = (name: string) => navigation.find((item) => item.label === name)!.children!.map((child) => child.label);
    expect(labels("Soluções")).toEqual(["Ressonância magnética", "Magnifico Open", "Bombas injetoras", "Radiografia digital", "Densitometria", "HexAI", "Careverse", "Veterinária"]);
    expect(labels("Serviços")).toEqual(["Manutenção", "Contratos de manutenção", "Instalação e desinstalação", "Reparo e laboratório"]);
    expect(labels("Empresa")).toEqual(["A Hexamedical", "Materiais de apoio", "Blog", "Ouvidoria", "Contato"]);
  });
});
