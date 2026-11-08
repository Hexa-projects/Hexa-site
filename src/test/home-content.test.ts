import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { lifecycle, showroom, showroomFilters, triage, whatsappHref } from "@/data/home";
import { commercialLines, rmStories } from "@/data/editorial";
import { services } from "@/data/pages/services";
import { wdmProducts } from "@/data/wdm";

const productSlugs = new Set([
  "ressonancia-magnetica",
  "hexai",
  "veterinario",
  "veterinaria",
  "s-scan-open",
  "o-scan-smart",
  "g-scan",
  "radiografia-digital",
  "magnifico-open",
  "densitometria",
  "careverse",
  "vet-mr-grande",
  ...Object.keys(rmStories),
  ...commercialLines.map((line) => line.slug),
  ...wdmProducts.map((product) => product.slug),
]);

const staticRoutes = new Set(["/", "/solucoes", "/servicos", "/contato", "/empresa", "/blog", "/materiais", "/ouvidoria"]);

/** Espelha as rotas de src/App.tsx e as páginas que resolvem slugs. */
function isDeclaredRoute(href: string): boolean {
  if (staticRoutes.has(href)) return true;
  const product = href.match(/^\/solucoes\/([^/]+)$/);
  if (product) return productSlugs.has(product[1]);
  const service = href.match(/^\/servicos\/([^/]+)$/);
  if (service) return Object.prototype.hasOwnProperty.call(services, service[1]);
  return false;
}

describe("conteúdo da home", () => {
  it("conta as seis etapas da vida do equipamento, na ordem", () => {
    expect(lifecycle.map((stage) => stage.id)).toEqual(["escolha", "projeto", "instalacao", "operacao", "manutencao", "laboratorio"]);
  });

  it("todo link interno aponta para uma rota que existe", () => {
    const hrefs = [
      ...lifecycle.map((stage) => stage.href),
      ...showroom.filter((item) => !item.external).map((item) => item.href),
      ...triage.map((path) => path.href),
    ];
    for (const href of hrefs) expect(isDeclaredRoute(href), href).toBe(true);
  });

  it("o showroom não tem link externo: o Magnifico Open abre a página interna", () => {
    expect(showroom.filter((item) => item.external)).toEqual([]);
    expect(showroom.find((item) => item.id === "magnifico-open")?.href).toBe("/solucoes/magnifico-open");
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
