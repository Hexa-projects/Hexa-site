import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import OuvidoriaForm from "@/components/page/OuvidoriaForm";
import { OUVIDORIA_ENDPOINT, canSubmitOuvidoria } from "@/data/ouvidoria";

/**
 * A função da Ouvidoria é a de produção: numa prévia (vercel.app, localhost) um teste criaria um registro real.
 * O envio só fica ativo no domínio do site; nos outros endereços o formulário fica só para leitura,
 * com o e-mail da ouvidoria, e nem a pergunta de verificação é pedida.
 */

const NOTICE = "Nesta versão de prévia o envio está desativado. Escreva para ouvidoria@hexamedical.com.br.";

const renderForm = (hostname?: string) =>
  render(
    <MemoryRouter>
      <OuvidoriaForm hostname={hostname} />
    </MemoryRouter>,
  );

const stubFetch = () => {
  const fn = vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ challenge: { token: "t", question: "Quanto é 2 + 3?" } }) }));
  vi.stubGlobal("fetch", fn);
  return fn;
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ouvidoria: envio só no domínio do site", () => {
  it("canSubmitOuvidoria aceita só www.hexamedical.com.br e hexamedical.com.br", () => {
    expect(canSubmitOuvidoria("www.hexamedical.com.br")).toBe(true);
    expect(canSubmitOuvidoria("hexamedical.com.br")).toBe(true);
    for (const host of ["localhost", "127.0.0.1", "hexamedical-site-redesign.vercel.app", "hexamedical.com.br.evil.com", "staging.hexamedical.com.br", ""]) {
      expect(canSubmitOuvidoria(host), host).toBe(false);
    }
  });

  it.each(["hexamedical-site-redesign-git-reinvencao.vercel.app", "localhost"])("em %s não há nenhum pedido à função e o aviso aparece", async (host) => {
    const fetchMock = stubFetch();
    const { container } = renderForm(host);
    expect(screen.getByText(NOTICE)).toBeInTheDocument();
    const submit = screen.getByRole("button", { name: /enviar manifestação/i });
    expect(submit).toBeDisabled();
    for (const field of container.querySelectorAll<HTMLInputElement>("form input:not([type=hidden]), form select, form textarea")) {
      if (field.name === "website") continue;
      expect(field, field.name).toBeDisabled();
    }
    expect(screen.queryByRole("button", { name: /nova pergunta/i })).toBeNull();
    // Dá tempo a qualquer efeito assíncrono: nada sai para a rede.
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sem hostname explícito usa o do navegador (no jsdom, localhost: prévia)", async () => {
    const fetchMock = stubFetch();
    renderForm();
    expect(screen.getByText(NOTICE)).toBeInTheDocument();
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("em www.hexamedical.com.br pede a pergunta de verificação e deixa enviar", async () => {
    const fetchMock = stubFetch();
    renderForm("www.hexamedical.com.br");
    expect(screen.queryByText(NOTICE)).toBeNull();
    expect(await screen.findByLabelText(/Quanto é 2 \+ 3\?/)).toBeEnabled();
    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith(OUVIDORIA_ENDPOINT, expect.objectContaining({ method: "POST" })));
    expect(screen.getByRole("button", { name: /enviar manifestação/i })).toBeEnabled();
  });
});
