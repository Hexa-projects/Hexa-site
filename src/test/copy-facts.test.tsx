import fs from "node:fs";
import path from "node:path";
import { render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ServicosHub from "@/pages/servicos/ServicosHub";
import RmLinePage from "@/pages/solucoes/RmLinePage";
import { hub, lines, products } from "@/data/pages/solutions";
import { magnifico } from "@/data/pages/magnifico";
import { services } from "@/data/pages/services";
import { contactPage, legalPages, materialsPage } from "@/data/pages/company";
import { careverse } from "@/data/pages/careverse";
import { showroom } from "@/data/home";
import { homeMedia } from "@/data/homeMedia";

/** Revisão de fatos e de texto das páginas internas: cada frase diz só o que a fonte diz. */

const renderPage = (element: JSX.Element, url: string) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[url]}>{element}</MemoryRouter>
    </HelmetProvider>,
  );

const faq = (items: { q: string; a: string }[] | undefined) => (items ?? []).map((item) => `${item.q} ${item.a}`).join("\n");

describe("fatos atribuídos à fonte certa", () => {
  it("a linha de RM atribui área e consumo à Esaote e à base comercial da Hexamedical", () => {
    const { container } = renderPage(<RmLinePage />, "/solucoes/ressonancia-magnetica");
    expect(container.textContent).toContain("Área e consumo informados pela Esaote e pela base comercial da Hexamedical.");
  });

  it("o S-scan Open só fala de quench com a ressalva dos materiais comerciais analisados", () => {
    const sScan = products["s-scan-open"];
    const all = [faq(sScan.faq), ...(sScan.facts ?? []).map((fact) => `${fact.value} ${fact.label}`)].join("\n");
    expect(all).not.toMatch(/materiais da Esaote/);
    for (const sentence of all.split("\n").filter((line) => /quench/i.test(line))) {
      expect(sentence).toMatch(/materiais comerciais analisados/);
    }
  });

  it("a cobertura clínica do Magnifico Open atribui as porcentagens à base comercial da Hexamedical", () => {
    const source = magnifico.coverage.table.source;
    expect(source).toMatch(/^porcentagens da base comercial da Hexamedical;/);
    expect(source).not.toMatch(/a partir dos materiais da Esaote/);
  });

  it("o card de radiografia do hub não inventa o uso no leito", () => {
    const card = hub.equipment.find((item) => item.title === "Radiografia digital")!;
    expect(card.body).toMatch(/sistemas fixos e móveis/i);
    expect(card.body).not.toMatch(/leito/);
  });

  it("a FAQ veterinária pergunta pelo O-scan Vet, sem sugerir que os outros modelos usam hélio", () => {
    const vetFaq = lines.veterinaria.faq ?? [];
    expect(vetFaq.map((item) => item.q)).toContain("O O-scan Vet usa hélio?");
    expect(faq(vetFaq)).not.toMatch(/Qual ressonância veterinária funciona sem hélio/);
    expect(faq(vetFaq)).not.toMatch(/\bpiso\b/);
  });

  it("nitidez e redução de ruído aparecem como etapa da implantação do SwiftMR, não como recurso do produto", () => {
    const swift = lines.hexai.sections.find((section) => section.id === "swiftmr")!;
    expect(swift.intro).not.toMatch(/nitidez|ruído/);
    const steps = lines.hexai.sections.find((section) => section.id === "implantacao")!;
    expect(JSON.stringify(steps.cards)).toContain("Otimização de nitidez e redução de ruído na configuração");
  });

  it("a FAQ das injetoras serve a quem clica e a quem toca", () => {
    expect(faq(lines["bombas-injetoras"].faq)).toContain("Clique ou toque no modelo");
  });

  it("o contrato parte do equipamento e do fabricante, sem inventar o uso da clínica", () => {
    expect(JSON.stringify(services.contratos.process)).not.toMatch(/uso que a clínica faz/);
  });

  it("o planejamento da sala segue o fabricante", () => {
    const instalacao = services.instalacao;
    expect(instalacao.scope.find((item) => item.startsWith("Projeto da sala"))).toMatch(/conforme o fabricante/);
    expect(instalacao.faq.find((item) => item.q === "Vocês ajudam a planejar a sala?")!.a).toMatch(/conforme o fabricante/);
  });

  it("privacidade e contato usam as frases revisadas", () => {
    expect(JSON.stringify(legalPages.privacidade)).toContain("Nada chega à Hexamedical até você enviar a mensagem por lá");
    expect(contactPage.channelsIntro).toBe("Para quem prefere ligar ou escrever.");
  });

  it("a nota de remoção do Careverse não nomeia o conteúdo bloqueado", () => {
    expect(fs.readFileSync(path.join(process.cwd(), "public/media/careverse/SOURCES.md"), "utf8")).not.toMatch(/CT-FFR/);
  });
});

describe("hub de serviços", () => {
  it("abre com a foto do projeto da sala no hero e deixa a seção de estrutura sem foto", () => {
    const { container } = renderPage(<ServicosHub />, "/servicos");
    const hero = container.querySelector(".page-hero") as HTMLElement;
    expect(within(hero).getByRole("img")).toHaveAttribute("src", homeMedia.stages.projeto.src);
    const estrutura = container.querySelector("#estrutura") as HTMLElement;
    expect(estrutura.querySelector("img")).toBeNull();
    expect(screen.getAllByRole("img").filter((img) => img.getAttribute("src") === homeMedia.stages.projeto.src)).toHaveLength(1);
  });

  it("a foto de banco dos contratos está na lista de direitos a confirmar", () => {
    const photo = "Contrato-de-manutencoes-foto-1024x683.webp";
    expect(fs.readFileSync(path.join(process.cwd(), "DESIGN.md"), "utf8")).toContain(photo);
  });
});

describe("revisão final: fatos com fonte", () => {
  const all = (value: unknown) => JSON.stringify(value);

  it("radiografia: DRGEM é a linha principal, com placas Rayence; Mindray só como 'também'", () => {
    const radiografia = materialsPage.byLine.find((item) => item.title === "Radiografia digital");
    expect(radiografia?.body).toBe("Sistemas DRGEM e placas DR Rayence. Também a linha Mindray.");
    const showroomSource = fs.readFileSync(path.join(process.cwd(), "src/components/home/Showroom.tsx"), "utf8");
    expect(showroomSource).toContain("radiografia digital DRGEM");
    expect(showroomSource).not.toContain("radiografia digital Mindray");
    expect(showroom.find((item) => item.id === "digieye-350")?.line).toBe("Radiografia digital Mindray, além da linha DRGEM");
  });

  it("o fechamento do Careverse é uma frase simples, sem slogan", () => {
    expect(all(careverse.closing)).not.toMatch(/solidez/);
    expect(careverse.closing.intro[0]).toBe(
      "A inteligência artificial da Careverse tem implantação e suporte da Hexamedical. Veja como o Careverse Digital Heart™ pode apoiar o seu serviço.",
    );
  });

  it("Accutron CT com a palavra do site atual (um canal) e XVISION-525 sem qualificador inferido", () => {
    const cards = lines["bombas-injetoras"].sections.flatMap((section) => section.cards);
    expect(cards.find((card) => card.title === "Accutron CT")?.body).toBe("Um canal e controle sem fio.");
    const xvision = lines["radiografia-digital"].sections.flatMap((section) => section.cards).find((card) => card.title === "XVISION-525");
    expect(xvision?.meta).toBeUndefined();
    expect(all(xvision)).not.toMatch(/fix/i);
  });

  it("o cabeçalho de solutions.ts guarda as páginas de produto Esaote de onde vieram os dados", () => {
    const source = fs.readFileSync(path.join(process.cwd(), "src/data/pages/solutions.ts"), "utf8");
    for (const model of ["s-scan-open", "o-scan-smart", "g-scan-open"]) {
      expect(source).toContain(`https://www.esaote.com/en-US/magnetic-resonance/magnetic-resonance-system/${model}/`);
    }
  });
});
