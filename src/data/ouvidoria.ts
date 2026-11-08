/**
 * Ouvidoria: o mesmo contrato do formulário do site atual (plugin WordPress `hexamedical-ouvidoria`).
 * Endpoint, nomes de campo, ações (`challenge` e `submit`), consentimento, validação e mensagens são os de lá.
 * A função é pública e já roda em produção; este site só a chama. Nada muda no Supabase.
 * A função é a de produção: o envio só fica ativo no domínio do site (canSubmitOuvidoria). Numa prévia
 * (vercel.app, localhost) o formulário fica só para leitura, sem pedir a pergunta de verificação,
 * para nenhum teste criar um registro real.
 */

export const OUVIDORIA_ENDPOINT = "https://fevmcjnaeuxydmxmkarw.supabase.co/functions/v1/ouvidoria-public";

export const OUVIDORIA_EMAIL = "ouvidoria@hexamedical.com.br";

/** Os únicos endereços em que o formulário envia de verdade. */
export const OUVIDORIA_HOSTS = ["www.hexamedical.com.br", "hexamedical.com.br"];

/** true só no domínio do site; prévia, localhost e qualquer outro endereço ficam sem envio. */
export const canSubmitOuvidoria = (hostname: string) => OUVIDORIA_HOSTS.includes(hostname);

export const OUVIDORIA_MAX_FILES = 5;
export const OUVIDORIA_MAX_FILE_BYTES = 15 * 1024 * 1024;
export const OUVIDORIA_FILE_ACCEPT = "image/jpeg,image/png,image/webp,application/pdf,audio/mpeg,audio/mp4,video/mp4,text/plain";

export type Option = { value: string; label: string };

export const identificationOptions: (Option & { hint: string })[] = [
  {
    value: "confidencial",
    label: "Confidencial",
    hint: "Seus dados ficam acessíveis somente à equipe autorizada, para apuração e retorno.",
  },
  {
    value: "identificada",
    label: "Identificada",
    hint: "Permite contato e identificação durante o atendimento.",
  },
];

export const audienceOptions: Option[] = [
  { value: "cliente", label: "Cliente" },
  { value: "colaborador", label: "Colaborador" },
  { value: "fornecedor", label: "Fornecedor" },
  { value: "parceiro", label: "Parceiro" },
  { value: "outro", label: "Outro público" },
];

export const typeOptions: Option[] = [
  { value: "reclamacao", label: "Reclamação" },
  { value: "denuncia", label: "Denúncia" },
  { value: "sugestao", label: "Sugestão" },
  { value: "elogio", label: "Elogio" },
  { value: "solicitacao", label: "Solicitação" },
  { value: "duvida", label: "Dúvida" },
];

export const ouvidoriaText = {
  /** Seguido do link "Política de Privacidade" e de ponto final. */
  consentLead: "Li e concordo com o tratamento dos dados necessários para apurar esta manifestação, conforme a",
  note: `Em relatos confidenciais, os dados de identificação ficam acessíveis somente à equipe autorizada da Ouvidoria. Eles serão usados para apuração e retorno. Se precisar, escreva para ${OUVIDORIA_EMAIL}.`,
  subjectPlaceholder: "Resuma o tema em poucas palavras",
  descriptionPlaceholder: "Descreva os fatos, o contexto e o resultado esperado. Não inclua dados pessoais desnecessários.",
  descriptionHelp: "Mínimo de 20 caracteres.",
  filesHelp: "Fotos, documentos, áudio ou vídeo. Até 5 arquivos de 15 MB cada.",
  filesError: "Envie no máximo 5 arquivos, com até 15 MB cada.",
  challengeError: "Não foi possível carregar. Tente novamente.",
  /** Resumo de erros quando a pessoa envia antes de a pergunta chegar. */
  challengeLoading: "Aguarde a verificação carregar.",
  challengeRetry: "A verificação não carregou. Peça uma nova pergunta.",
  fallback: `Tente novamente ou escreva para ${OUVIDORIA_EMAIL}.`,
  /** Quando a falha não traz mensagem do servidor (rede, CORS). */
  sendError: "Não foi possível enviar a manifestação.",
  /** Fora do domínio do site (prévia): o formulário fica só para leitura. */
  previewNotice: `Nesta versão de prévia o envio está desativado. Escreva para ${OUVIDORIA_EMAIL}.`,
  previewChallenge: "Indisponível nesta versão de prévia.",
  pending: "Seu registro está seguro. A confirmação por e-mail pode levar alguns minutos.",
  sent: (email: string) => `Enviamos a confirmação para ${email}.`,
};

/* ---------- Protocolo da função pública ---------- */

export class OuvidoriaError extends Error {
  code?: string;
  constructor(message: string, code?: string) {
    super(message);
    this.code = code;
  }
}

/** Como o `api(body)` do site atual: FormData vai como multipart sem headers; o resto, como JSON. */
export async function ouvidoriaApi<T>(body: FormData | Record<string, unknown>): Promise<T> {
  const init: RequestInit =
    body instanceof FormData
      ? { method: "POST", body }
      : { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) };
  const response = await fetch(OUVIDORIA_ENDPOINT, init);
  const data = (await response.json().catch(() => ({}))) as { error?: string; code?: string };
  if (!response.ok) throw new OuvidoriaError(data.error || ouvidoriaText.sendError, data.code);
  return data as T;
}

export type Challenge = { token: string; question: string };
export type Receipt = { protocol: string; deliveryPending?: boolean };
