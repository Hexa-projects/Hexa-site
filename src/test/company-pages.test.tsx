import fs from "node:fs";
import path from "node:path";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "@/App";
import ContactTriage from "@/components/home/ContactTriage";
import EmpresaPage from "@/pages/empresa/EmpresaPage";
import ContatoPage from "@/pages/empresa/ContatoPage";
import OuvidoriaPage from "@/pages/empresa/OuvidoriaPage";
import MateriaisPage from "@/pages/empresa/MateriaisPage";
import LegalPage from "@/pages/empresa/LegalPage";
import { companyFacts, triage, whatsappHref } from "@/data/home";
import { OUVIDORIA_ENDPOINT } from "@/data/ouvidoria";
import { companyPage } from "@/data/pages/company";

const renderAt = (url: string) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[url]}>
        <Routes>
          <Route path="/" element={<ContactTriage items={triage} />} />
          <Route path="/empresa" element={<EmpresaPage />} />
          <Route path="/contato" element={<ContatoPage />} />
          <Route path="/ouvidoria" element={<OuvidoriaPage />} />
          <Route path="/materiais" element={<MateriaisPage />} />
          <Route path="/politica-de-privacidade" element={<LegalPage kind="privacidade" />} />
          <Route path="/termos" element={<LegalPage kind="termos" />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>,
  );

/** Só o conteúdo da página (sem cabeçalho e rodapé do Layout). */
const page = (container: HTMLElement) => container.querySelector(".page") as HTMLElement;

const SALAS = "de teste para tomografia, raio-X e mamografia";

const ESAOTE = "A Hexamedical trabalha com a linha de ressonância aberta Esaote";

describe("empresa: fatos com fonte", () => {
  it("/empresa diz que trabalha com a linha de ressonância aberta Esaote (sem afirmar representação)", () => {
    const { container } = renderAt("/empresa");
    const text = page(container).textContent ?? "";
    expect(text).toContain(`${ESAOTE} e vende também tomografia veterinária`);
    expect(text).not.toMatch(/representa/i);
    expect(companyPage.description).toContain(ESAOTE);
    expect(companyPage.description).not.toMatch(/representa/i);
  });

  it("a faixa de números de /empresa não mostra o +500 (sem fonte); a home mantém", () => {
    const { container } = renderAt("/empresa");
    const text = page(container).textContent ?? "";
    expect(text).not.toContain("+500");
    expect(text).not.toContain("equipamentos atendidos");
    expect(companyPage.facts.map((fact) => fact.value)).toEqual(["+16 anos", "5 unidades", "3 salas"]);
  });

  it("os 16 anos usam o rótulo da fonte: em manutenção de equipamentos médicos", () => {
    expect(companyFacts.find((fact) => fact.value === "+16 anos")?.label).toBe("em manutenção de equipamentos médicos");
  });
});

describe("empresa", () => {
  it("companyFacts da home usa o rótulo das salas de teste do site atual", () => {
    const salas = companyFacts.find((fact) => fact.value === "3 salas");
    expect(salas?.label).toBe(SALAS);
    // O "+500" continua como está (confirmação pendente com a empresa).
    expect(companyFacts.map((fact) => fact.value)).toContain("+500");
  });

  it("/empresa mostra os números, a estrutura de /estrutura/, a cobertura e o público atendido", () => {
    const { container } = renderAt("/empresa");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const text = page(container).textContent ?? "";
    for (const fact of companyFacts.filter((item) => item.value !== "+500")) {
      expect(text).toContain(fact.value);
      expect(text).toContain(fact.label);
    }
    expect(text).toMatch(/3 salas de teste para tomografia, raio-X e mamografia/);
    expect(text).toMatch(/laboratório de eletrônica/i);
    expect(text).toMatch(/laboratório de criogenia/i);
    expect(text).toMatch(/salas de treinamento/i);
    expect(text).toMatch(/showroom com gaiola para ressonância magnética/i);
    expect(text).toMatch(/módulos, fontes, bobinas e placas/i);
    for (const city of ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Goiânia", "Florianópolis"]) expect(text).toContain(city);
    expect(text).toMatch(/todo o território nacional/i);
    expect(text).toMatch(/clínicas de imagem/i);
    expect(text).toMatch(/hospitais humanos e veterinários/i);
    expect(text).toMatch(/universidades/i);
    expect(text).toMatch(/clínicas ortopédicas/i);
  });
});

describe("contato", () => {
  it("tem os três caminhos de WhatsApp da triagem", () => {
    renderAt("/contato");
    const hrefs = screen.getAllByRole("link").map((link) => link.getAttribute("href"));
    for (const path of triage) expect(hrefs).toContain(whatsappHref(path.whatsappText));
  });

  it("mostra telefone, e-mail e horário como texto selecionável", () => {
    const { container } = renderAt("/contato");
    // O rodapé também mostra os canais; aqui vale o conteúdo da página.
    const phone = within(page(container)).getByText("+55 11 97314-0914");
    const email = within(page(container)).getByText("comercial@hexamedical.com.br");
    expect(phone.closest("a")).toBeNull();
    expect(email.closest("a")).toBeNull();
    expect(screen.getByText(/segunda a quinta, 8h às 18h; sexta, 8h às 17h; sábado e domingo fechado/i)).toBeInTheDocument();
    // Conveniências: ligar e escrever, ao lado do texto.
    const hrefs = screen.getAllByRole("link").map((link) => link.getAttribute("href"));
    expect(hrefs).toContain("tel:+5511973140914");
    expect(hrefs).toContain("mailto:comercial@hexamedical.com.br");
  });

  it("leva à ouvidoria, sem formulário e sem link para a própria página", () => {
    const { container } = renderAt("/contato");
    const hrefs = Array.from(page(container).querySelectorAll("a")).map((link) => link.getAttribute("href"));
    expect(hrefs).toContain("/ouvidoria");
    expect(hrefs).not.toContain("/contato");
    expect(screen.queryByText(/ver todos os canais/i)).toBeNull();
    expect(container.querySelector("form")).toBeNull();
  });

  it("a triagem da home continua com o link para todos os canais", () => {
    renderAt("/");
    expect(screen.getByRole("link", { name: /ver todos os canais/i })).toHaveAttribute("href", "/contato");
  });
});

/* ---------- Ouvidoria: o formulário do site atual, com o mesmo contrato ---------- */

const FIELD_NAMES = [
  "captchaAnswer",
  "consentimento_lgpd",
  "data_aproximada",
  "descricao",
  "email",
  "empresa",
  "envolvidos",
  "files",
  "identificacao",
  "nome",
  "publico",
  "assunto",
  "telefone",
  "tipo",
  "unidade_setor",
  "website",
].sort();

const FALLBACK = "Tente novamente ou escreva para ouvidoria@hexamedical.com.br.";

type Reply = { ok: boolean; status: number; json: () => Promise<unknown> };
const reply = (status: number, data: unknown): Reply => ({ ok: status < 400, status, json: async () => data });

/** fetch falso: o desafio responde sempre (token novo a cada pedido); o envio segue `onSubmit`. */
function mockFetch(onSubmit: () => Promise<Reply> | Reply) {
  let round = 0;
  const fn = vi.fn(async (_url: string, init?: RequestInit) => {
    if (typeof init?.body === "string" && JSON.parse(init.body).action === "challenge") {
      round += 1;
      return reply(200, { challenge: { token: `tok-${round}`, question: "Quanto é 2 + 3?" } });
    }
    return onSubmit();
  });
  vi.stubGlobal("fetch", fn);
  return fn;
}

const submitCalls = (fn: ReturnType<typeof mockFetch>) => fn.mock.calls.filter(([, init]) => init?.body instanceof FormData);
const challengeCalls = (fn: ReturnType<typeof mockFetch>) => fn.mock.calls.filter(([, init]) => typeof init?.body === "string");

async function fillValid(user: ReturnType<typeof userEvent.setup>, { consent = true } = {}) {
  await screen.findByLabelText(/Quanto é 2 \+ 3\?/);
  await user.type(screen.getByLabelText(/^E-mail/), "pessoa@example.com");
  await user.selectOptions(screen.getByLabelText(/^Você é/), "cliente");
  await user.selectOptions(screen.getByLabelText(/^Tipo de manifestação/), "sugestao");
  await user.type(screen.getByLabelText(/^Assunto/), "Atendimento técnico");
  await user.type(screen.getByLabelText(/^Descrição/), "Relato com mais de vinte caracteres para o teste.");
  await user.type(screen.getByLabelText(/Quanto é 2 \+ 3\?/), "5");
  if (consent) await user.click(screen.getByLabelText(/Li e concordo/));
}

const submit = (user: ReturnType<typeof userEvent.setup>) => user.click(screen.getByRole("button", { name: /enviar manifestação/i }));

describe("ouvidoria", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("guarda o endpoint público do site atual numa constante", () => {
    expect(OUVIDORIA_ENDPOINT).toBe("https://fevmcjnaeuxydmxmkarw.supabase.co/functions/v1/ouvidoria-public");
  });

  it("tem um só formulário, com os nomes de campo exatos do contrato", async () => {
    const fetchMock = mockFetch(() => reply(200, {}));
    const { container } = renderAt("/ouvidoria");
    expect(screen.getAllByRole("heading", { level: 1, name: "Ouvidoria" })).toHaveLength(1);
    const forms = container.querySelectorAll("form");
    expect(forms).toHaveLength(1);
    const names = [...new Set(Array.from(forms[0].elements).map((el) => el.getAttribute("name")).filter(Boolean))].sort();
    expect(names).toEqual(FIELD_NAMES);
    // O desafio vem do mesmo endpoint, em JSON.
    await screen.findByLabelText(/Quanto é 2 \+ 3\?/);
    const [url, init] = challengeCalls(fetchMock)[0];
    expect(url).toBe(OUVIDORIA_ENDPOINT);
    expect(init?.method).toBe("POST");
    expect(JSON.parse(init?.body as string)).toEqual({ action: "challenge" });
  });

  it("mostra os textos do site atual: consentimento, nota de confidencialidade e e-mail", () => {
    mockFetch(() => reply(200, {}));
    const { container } = renderAt("/ouvidoria");
    const text = page(container).textContent ?? "";
    expect(text).toContain(
      "Li e concordo com o tratamento dos dados necessários para apurar esta manifestação, conforme a Política de Privacidade.",
    );
    expect(text).toContain("Seus dados ficam acessíveis somente à equipe autorizada, para apuração e retorno.");
    expect(text).toContain("Você receberá a confirmação e o protocolo por e-mail.");
    expect(text).toContain("ouvidoria@hexamedical.com.br");
    expect(screen.getByRole("radio", { name: /confidencial/i })).toBeChecked();
    for (const legend of ["Identificação", "Manifestação", "Anexos e envio"]) {
      expect(screen.getByRole("group", { name: legend })).toBeInTheDocument();
    }
  });

  it("valida os campos obrigatórios, com resumo de erros que recebe o foco", async () => {
    const fetchMock = mockFetch(() => reply(200, { protocol: "X", deliveryPending: false }));
    const user = userEvent.setup();
    renderAt("/ouvidoria");
    await screen.findByLabelText(/Quanto é 2 \+ 3\?/);
    await submit(user);
    const summary = await screen.findByRole("alert");
    expect(summary).toHaveFocus();
    const items = within(summary).getAllByRole("link");
    expect(items.length).toBeGreaterThanOrEqual(6);
    expect(screen.getByLabelText(/^E-mail/)).toHaveAttribute("aria-invalid", "true");
    expect(submitCalls(fetchMock)).toHaveLength(0);
  });

  it("exige o consentimento", async () => {
    const fetchMock = mockFetch(() => reply(200, { protocol: "X", deliveryPending: false }));
    const user = userEvent.setup();
    renderAt("/ouvidoria");
    await fillValid(user, { consent: false });
    await submit(user);
    const summary = await screen.findByRole("alert");
    expect(within(summary).getByRole("link", { name: /consentimento|concord/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Li e concordo/)).toHaveAttribute("aria-invalid", "true");
    expect(submitCalls(fetchMock)).toHaveLength(0);
  });

  it("limita os anexos a 5 arquivos de até 15 MB", async () => {
    const fetchMock = mockFetch(() => reply(200, { protocol: "X", deliveryPending: false }));
    const user = userEvent.setup();
    renderAt("/ouvidoria");
    await fillValid(user);
    const input = screen.getByLabelText(/^Anexos/) as HTMLInputElement;
    const six = Array.from({ length: 6 }, (_, i) => new File(["x"], `foto-${i}.png`, { type: "image/png" }));
    await user.upload(input, six);
    expect(await screen.findAllByText("Envie no máximo 5 arquivos, com até 15 MB cada.")).not.toHaveLength(0);
    await submit(user);
    expect(submitCalls(fetchMock)).toHaveLength(0);

    const big = new File(["x"], "video.mp4", { type: "video/mp4" });
    Object.defineProperty(big, "size", { value: 16 * 1024 * 1024 });
    await user.upload(input, [big]);
    await submit(user);
    expect(screen.getAllByText("Envie no máximo 5 arquivos, com até 15 MB cada.").length).toBeGreaterThan(0);
    expect(submitCalls(fetchMock)).toHaveLength(0);

    await user.upload(input, [new File(["ok"], "relato.pdf", { type: "application/pdf" })]);
    expect(screen.getByText(/relato\.pdf/)).toBeInTheDocument();
  });

  it("envia FormData com action=submit e captchaToken e mostra o protocolo", async () => {
    const fetchMock = mockFetch(() => reply(200, { protocol: "OUV-2026-0001", deliveryPending: false }));
    const user = userEvent.setup();
    renderAt("/ouvidoria");
    await fillValid(user);
    await submit(user);

    await screen.findByText("OUV-2026-0001");
    const calls = submitCalls(fetchMock);
    expect(calls).toHaveLength(1);
    const [url, init] = calls[0];
    expect(url).toBe(OUVIDORIA_ENDPOINT);
    expect(init?.method).toBe("POST");
    expect(init?.headers).toBeUndefined();
    const body = init?.body as FormData;
    expect(body.get("action")).toBe("submit");
    expect(body.get("captchaToken")).toBe("tok-1");
    expect(body.get("identificacao")).toBe("confidencial");
    expect(body.get("email")).toBe("pessoa@example.com");
    expect(body.get("publico")).toBe("cliente");
    expect(body.get("tipo")).toBe("sugestao");
    expect(body.get("captchaAnswer")).toBe("5");
    expect(body.get("consentimento_lgpd")).toBe("true");
    expect(body.get("website")).toBe("");

    const receipt = screen.getByText("OUV-2026-0001").closest("[aria-live]");
    expect(receipt).not.toBeNull();
    expect(screen.getByText("Enviamos a confirmação para pessoa@example.com.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /copiar protocolo/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /registrar outra manifestação/i })).toBeInTheDocument();
  });

  it("avisa quando a confirmação por e-mail ainda está pendente", async () => {
    mockFetch(() => reply(200, { protocol: "OUV-2026-0002", deliveryPending: true }));
    const user = userEvent.setup();
    renderAt("/ouvidoria");
    await fillValid(user);
    await submit(user);
    expect(await screen.findByText("Seu registro está seguro. A confirmação por e-mail pode levar alguns minutos.")).toBeInTheDocument();
  });

  it("falha do servidor mostra a mensagem com o e-mail da ouvidoria", async () => {
    mockFetch(() => reply(500, { error: "Não foi possível registrar.", code: "server" }));
    const user = userEvent.setup();
    renderAt("/ouvidoria");
    await fillValid(user);
    await submit(user);
    expect(await screen.findByText(`Não foi possível registrar. ${FALLBACK}`)).toBeInTheDocument();
  });

  it("falha de rede também cai no e-mail", async () => {
    mockFetch(() => Promise.reject(new TypeError("Failed to fetch")));
    const user = userEvent.setup();
    renderAt("/ouvidoria");
    await fillValid(user);
    await submit(user);
    expect(await screen.findByText(new RegExp(FALLBACK.replace(/[.]/g, "\\.")))).toBeInTheDocument();
    expect(screen.queryByText(/Failed to fetch/)).toBeNull();
  });

  it("erro de verificação recarrega a pergunta", async () => {
    const fetchMock = mockFetch(() => reply(400, { error: "Resposta da verificação incorreta.", code: "captcha" }));
    const user = userEvent.setup();
    renderAt("/ouvidoria");
    await fillValid(user);
    await submit(user);
    await screen.findByText(`Resposta da verificação incorreta. ${FALLBACK}`);
    await waitFor(() => expect(challengeCalls(fetchMock)).toHaveLength(2));
  });

  it("não envia enquanto a pergunta de verificação não carregou", async () => {
    // O desafio fica pendurado; o envio não pode sair com captchaToken vazio.
    const fetchMock = vi.fn((_url: string, init?: RequestInit) =>
      typeof init?.body === "string" ? new Promise<Reply>(() => {}) : Promise.resolve(reply(200, { protocol: "X" })),
    );
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    renderAt("/ouvidoria");
    expect(await screen.findByText("Carregando a pergunta.")).toBeInTheDocument();
    await user.type(screen.getByLabelText(/^E-mail/), "pessoa@example.com");
    await user.selectOptions(screen.getByLabelText(/^Você é/), "cliente");
    await user.selectOptions(screen.getByLabelText(/^Tipo de manifestação/), "sugestao");
    await user.type(screen.getByLabelText(/^Assunto/), "Atendimento técnico");
    await user.type(screen.getByLabelText(/^Descrição/), "Relato com mais de vinte caracteres para o teste.");
    await user.type(screen.getByLabelText(/^Verificação/), "5");
    await user.click(screen.getByLabelText(/Li e concordo/));
    await submit(user);
    const summary = await screen.findByRole("alert");
    expect(within(summary).getByRole("link", { name: "Aguarde a verificação carregar." })).toBeInTheDocument();
    expect(fetchMock.mock.calls.filter(([, init]) => init?.body instanceof FormData)).toHaveLength(0);
  });

  it("resposta 2xx sem protocolo vira erro, com o e-mail da ouvidoria", async () => {
    mockFetch(() => reply(200, { ok: true }));
    const user = userEvent.setup();
    renderAt("/ouvidoria");
    await fillValid(user);
    await submit(user);
    expect(await screen.findByText(`Não foi possível enviar a manifestação. ${FALLBACK}`)).toBeInTheDocument();
    expect(screen.queryByText("Manifestação registrada")).toBeNull();
  });

  it("resposta 2xx que não é JSON também vira erro", async () => {
    mockFetch(() => ({
      ok: true,
      status: 200,
      json: async () => {
        throw new SyntaxError("Unexpected token <");
      },
    }));
    const user = userEvent.setup();
    renderAt("/ouvidoria");
    await fillValid(user);
    await submit(user);
    expect(await screen.findByText(`Não foi possível enviar a manifestação. ${FALLBACK}`)).toBeInTheDocument();
    expect(screen.queryByText("Manifestação registrada")).toBeNull();
  });

  it("a armadilha para robôs fica fora do teclado e dos leitores de tela", () => {
    mockFetch(() => reply(200, {}));
    const { container } = renderAt("/ouvidoria");
    const trap = container.querySelector('input[name="website"]') as HTMLInputElement;
    expect(trap).toHaveAttribute("tabindex", "-1");
    expect(trap.closest('[aria-hidden="true"]')).not.toBeNull();
  });

  it("o consentimento leva à Política de Privacidade", () => {
    mockFetch(() => reply(200, {}));
    const { container } = renderAt("/ouvidoria");
    const consent = container.querySelector(".page-form__consent") as HTMLElement;
    expect(within(consent).getByRole("link", { name: "Política de Privacidade" })).toHaveAttribute("href", "/politica-de-privacidade");
  });

  it("mostra arquivos pequenos em KB e os maiores em MB", async () => {
    mockFetch(() => reply(200, {}));
    const user = userEvent.setup();
    renderAt("/ouvidoria");
    const small = new File(["ok"], "relato.pdf", { type: "application/pdf" });
    const big = new File(["x"], "foto.png", { type: "image/png" });
    Object.defineProperty(big, "size", { value: 2 * 1024 * 1024 });
    await user.upload(screen.getByLabelText(/^Anexos/) as HTMLInputElement, [small, big]);
    expect(screen.getByText("relato.pdf (1 KB)")).toBeInTheDocument();
    expect(screen.getByText("foto.png (2,0 MB)")).toBeInTheDocument();
  });

  it("se o desafio não carrega, avisa e oferece nova pergunta", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new TypeError("Failed to fetch");
      }),
    );
    renderAt("/ouvidoria");
    expect(await screen.findByText("Não foi possível carregar. Tente novamente.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /nova pergunta/i })).toBeInTheDocument();
  });
});

describe("materiais", () => {
  it("explica os materiais sob pedido, sem download falso", () => {
    const { container } = renderAt("/materiais");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const text = page(container).textContent ?? "";
    expect(text).toMatch(/fichas técnicas/i);
    expect(text).toMatch(/guias/i);
    expect(text).toMatch(/vídeos/i);
    const anchors = Array.from(page(container).querySelectorAll("a"));
    expect(anchors.some((a) => a.hasAttribute("download"))).toBe(false);
    expect(anchors.some((a) => /\.(pdf|zip|docx?)$/i.test(a.getAttribute("href") ?? ""))).toBe(false);
    const asks = anchors
      .map((a) => a.getAttribute("href") ?? "")
      .filter((href) => href.startsWith("https://wa.me/"))
      .map((href) => decodeURIComponent(new URL(href).searchParams.get("text") ?? ""))
      .filter((message) => message.startsWith("Olá! Quero receber material de apoio sobre "));
    expect(asks.length).toBeGreaterThanOrEqual(1);
  });
});

describe("páginas legais", () => {
  it.each([
    ["/politica-de-privacidade", "Política de Privacidade"],
    ["/termos", "Termos de Uso"],
  ])("%s tem uma só h1, o aviso de revisão jurídica e os contatos", (url, title) => {
    const { container } = renderAt(url);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(title);
    const text = page(container).textContent ?? "";
    expect(text).toMatch(/versão provisória, pendente de revisão jurídica/i);
    expect(text).toContain("comercial@hexamedical.com.br");
    expect(text).toContain("ouvidoria@hexamedical.com.br");
  });

  it("a política descreve o que o site faz hoje: formulário da ouvidoria e links de WhatsApp", () => {
    const { container } = renderAt("/politica-de-privacidade");
    const text = page(container).textContent ?? "";
    expect(text).toMatch(/ouvidoria/i);
    expect(text).toMatch(/WhatsApp/);
    expect(text).toMatch(/aplicativo|serviço externo/i);
    expect(text).not.toMatch(/\bbase legal\b.*:\s|\bprazo de guarda\b.*\d/i);
  });
});

describe("institucional: rotas e limpeza", () => {
  it.each([
    ["/empresa", "A Hexamedical | Hexamedical"],
    ["/contato", "Contato | Hexamedical"],
    ["/ouvidoria", "Ouvidoria | Hexamedical"],
    ["/materiais", "Materiais de apoio | Hexamedical"],
    ["/politica-de-privacidade", "Política de Privacidade | Hexamedical"],
    ["/termos", "Termos de Uso | Hexamedical"],
  ])("%s abre pela rota pública no sistema novo", async (url, title) => {
    vi.stubGlobal("fetch", vi.fn(async () => reply(200, { challenge: { token: "t", question: "Quanto é 1 + 1?" } })));
    window.history.pushState({}, "", url);
    render(<App />);
    expect(await screen.findByRole("heading", { level: 1 }, { timeout: 5000 })).toBeInTheDocument();
    expect(document.querySelector(".page")).not.toBeNull();
    await waitFor(() => expect(document.title).toBe(title));
    vi.unstubAllGlobals();
  });

  it("as páginas antigas e provisórias saíram do repositório", () => {
    for (const file of [
      "src/pages/OuvidoriaTemp.tsx",
      "src/pages/EmpresaHub.tsx",
      "src/pages/SobrePage.tsx",
      "src/pages/EstruturaPage.tsx",
      "src/pages/Contato.tsx",
      "src/pages/MateriaisPage.tsx",
      "src/pages/PrivacyPage.tsx",
      "src/pages/TermsPage.tsx",
      "src/pages/StaticPage.tsx",
      "src/pages/StaticEntryPage.tsx",
      "src/data/staticPages.ts",
    ]) {
      expect(fs.existsSync(path.join(process.cwd(), file)), file).toBe(false);
    }
  });

  it("o texto novo não usa travessão nem meia-risca", () => {
    const files = [
      "src/data/pages/company.ts",
      "src/data/ouvidoria.ts",
      ...fs.readdirSync(path.join(process.cwd(), "src/pages/empresa")).map((name) => `src/pages/empresa/${name}`),
      "src/components/page/OuvidoriaForm.tsx",
      "src/components/page/ChannelList.tsx",
    ];
    for (const file of files) {
      expect(fs.readFileSync(path.join(process.cwd(), file), "utf8"), file).not.toMatch(/[–—]/);
    }
  });
});
