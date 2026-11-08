/**
 * Ouvidoria: o mesmo contrato do formulário do site atual (plugin WordPress `hexamedical-ouvidoria`).
 * Endpoint, nomes de campo, ações (`challenge` e `submit`), consentimento, validação e mensagens são os de lá.
 * A função é pública e já roda em produção; este site só a chama. Nada muda no Supabase.
 * Risco conhecido: a função pode aceitar só a origem hexamedical.com.br; numa prévia o envio pode falhar,
 * e o erro cai na mensagem com o e-mail da ouvidoria.
 */

export const OUVIDORIA_ENDPOINT = "https://fevmcjnaeuxydmxmkarw.supabase.co/functions/v1/ouvidoria-public";

export const OUVIDORIA_EMAIL = "ouvidoria@hexamedical.com.br";

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
  consent: "Li e concordo com o tratamento dos dados necessários para apurar esta manifestação, conforme a Política de Privacidade.",
  note: `Em relatos confidenciais, os dados de identificação ficam acessíveis somente à equipe autorizada da Ouvidoria. Eles serão usados para apuração e retorno. Se precisar, escreva para ${OUVIDORIA_EMAIL}.`,
  subjectPlaceholder: "Resuma o tema em poucas palavras",
  descriptionPlaceholder: "Descreva os fatos, o contexto e o resultado esperado. Não inclua dados pessoais desnecessários.",
  descriptionHelp: "Mínimo de 20 caracteres.",
  filesHelp: "Fotos, documentos, áudio ou vídeo. Até 5 arquivos de 15 MB cada.",
  filesError: "Envie no máximo 5 arquivos, com até 15 MB cada.",
  challengeError: "Não foi possível carregar. Tente novamente.",
  fallback: `Tente novamente ou escreva para ${OUVIDORIA_EMAIL}.`,
  /** Quando a falha não traz mensagem do servidor (rede, CORS). */
  sendError: "Não foi possível enviar a manifestação.",
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
