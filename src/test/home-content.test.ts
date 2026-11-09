import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { lifecycle, showroom, showroomFilters, triage, whatsappHref } from "@/data/home";
import { publicRoutes } from "@/data/routes";

describe("conteúdo da home", () => {
  it("conta as seis etapas da vida do equipamento, na ordem", () => {
    expect(lifecycle.map((stage) => stage.id)).toEqual(["escolha", "projeto", "instalacao", "operacao", "manutencao", "laboratorio"]);
  });

  it("todo link interno aponta para uma rota pública", () => {
    const hrefs = [
      ...lifecycle.map((stage) => stage.href),
      ...showroom.map((item) => item.href),
      ...triage.map((path) => path.href),
    ];
    for (const href of hrefs) expect(publicRoutes, href).toContain(href);
  });

  it("o showroom só tem links internos: o Magnifico Open abre a página interna", () => {
    for (const item of showroom) expect(item.href, item.name).toMatch(/^\/solucoes(\/|$)/);
    expect(showroom.find((item) => item.id === "magnifico-open")?.href).toBe("/solucoes/magnifico-open");
  });

  it("o Vet-MR Grande leva à página da veterinária (a rota antiga redireciona)", () => {
    expect(showroom.find((item) => item.id === "vet-mr-grande")?.href).toBe("/solucoes/veterinaria");
  });

  it("toda imagem do showroom existe em public/", () => {
    for (const item of showroom) {
      expect(fs.existsSync(path.join(process.cwd(), "public", item.image.src)), item.image.src).toBe(true);
      expect(item.image.alt).toContain(item.name);
    }
  });

  it("todo item do showroom aparece em pelo menos um filtro conhecido", () => {
    const known = new Set(showroomFilters.map((filter) => filter.id));
    for (const item of showroom) {
      expect(item.filters.length, item.name).toBeGreaterThan(0);
      for (const filter of item.filters) expect(known.has(filter), `${item.name}: ${filter}`).toBe(true);
    }
  });

  it("nenhum texto do showroom inventa números fora dos nomes de modelo", () => {
    for (const item of showroom) {
      expect(item.line, item.name).not.toMatch(/\d/);
    }
  });

  it("a triagem oferece comprar, manter e reparar pelo WhatsApp oficial", () => {
    expect(triage.map((path) => path.id)).toEqual(["comprar", "manter", "reparar"]);
    for (const path of triage) {
      expect(whatsappHref(path.whatsappText)).toBe(`https://wa.me/5511973140914?text=${encodeURIComponent(path.whatsappText)}`);
    }
  });
});
