import { useCallback, useEffect, useId, useRef, useState, type FormEvent, type MouseEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Copy, RotateCcw } from "lucide-react";
import {
  OUVIDORIA_FILE_ACCEPT,
  OUVIDORIA_MAX_FILE_BYTES,
  OUVIDORIA_MAX_FILES,
  OuvidoriaError,
  audienceOptions,
  canSubmitOuvidoria,
  identificationOptions,
  ouvidoriaApi,
  ouvidoriaText,
  typeOptions,
  type Challenge,
  type Receipt,
} from "@/data/ouvidoria";

type ChallengeState = { status: "loading" } | { status: "error" } | ({ status: "ready" } & Challenge);
type Done = { protocol: string; message: string };

/** Ordem do resumo de erros: a mesma dos campos na tela. */
const ORDER = ["identificacao", "email", "publico", "tipo", "assunto", "descricao", "files", "captchaAnswer", "consentimento_lgpd"] as const;
type FieldName = (typeof ORDER)[number];
type Errors = Partial<Record<FieldName, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Tamanho legível: abaixo de 0,1 MB em KB (um arquivo de texto não aparece como "0,0 MB"). */
const fileSize = (bytes: number) => {
  const mb = bytes / (1024 * 1024);
  if (mb < 0.1) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${mb.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} MB`;
};

const filesProblem = (files: FileList | null) =>
  files && (files.length > OUVIDORIA_MAX_FILES || Array.from(files).some((file) => file.size > OUVIDORIA_MAX_FILE_BYTES))
    ? ouvidoriaText.filesError
    : undefined;

function validate(form: HTMLFormElement, challenge: ChallengeState["status"]): Errors {
  const data = new FormData(form);
  const text = (name: string) => String(data.get(name) ?? "").trim();
  const errors: Errors = {};
  if (!data.get("identificacao")) errors.identificacao = "Escolha como você quer se identificar.";
  const email = text("email");
  if (!email) errors.email = "Informe o e-mail para receber o protocolo.";
  else if (!EMAIL.test(email)) errors.email = "Informe um e-mail válido.";
  if (!text("publico")) errors.publico = "Informe com qual público você se relaciona com a Hexamedical.";
  if (!text("tipo")) errors.tipo = "Escolha o tipo de manifestação.";
  const subject = text("assunto");
  if (subject.length < 4 || subject.length > 160) errors.assunto = "Escreva o assunto, com 4 a 160 caracteres.";
  const description = text("descricao");
  if (description.length < 20 || description.length > 12000) errors.descricao = "Descreva a manifestação com pelo menos 20 caracteres.";
  const files = filesProblem((form.elements.namedItem("files") as HTMLInputElement | null)?.files ?? null);
  if (files) errors.files = files;
  // Sem desafio pronto não há captchaToken: o envio seria recusado pelo servidor.
  if (challenge === "loading") errors.captchaAnswer = ouvidoriaText.challengeLoading;
  else if (challenge === "error") errors.captchaAnswer = ouvidoriaText.challengeRetry;
  else if (!text("captchaAnswer")) errors.captchaAnswer = "Responda à pergunta de verificação.";
  if (!data.get("consentimento_lgpd")) errors.consentimento_lgpd = "Marque o consentimento para enviar a manifestação.";
  return errors;
}

/** Rótulo, ajuda, erro e controle de um campo; o controle recebe id, aria-describedby e aria-invalid de fora. */
const Field = ({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) => (
  <div className={error ? "page-form__field is-invalid" : "page-form__field"}>
    <label htmlFor={id}>
      {label}
      {required && <span className="page-form__required"> (obrigatório)</span>}
    </label>
    {hint && (
      <p id={`${id}-hint`} className="page-form__hint">
        {hint}
      </p>
    )}
    {error && (
      <p id={`${id}-error`} className="page-form__error">
        {error}
      </p>
    )}
    {children}
  </div>
);

const describedBy = (id: string, hint?: boolean, error?: string) =>
  [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;

/**
 * Formulário da Ouvidoria, com o contrato do site atual: desafio (`challenge`), envio em FormData
 * (`action=submit` + `captchaToken`), os mesmos nomes de campo, consentimento e limites de anexo.
 * Acessível: rótulos visíveis, grupos com legenda, resumo de erros que recebe o foco e comprovante numa região viva.
 * Só envia no domínio do site (`canSubmitOuvidoria`); em outro endereço (prévia) fica só para leitura, com o aviso
 * e o e-mail da ouvidoria, e não pede a pergunta de verificação. `hostname` existe para os testes.
 */
const OuvidoriaForm = ({ hostname = window.location.hostname }: { hostname?: string }) => {
  const enabled = canSubmitOuvidoria(hostname);
  const base = useId().replace(/:/g, "");
  const id = (name: string) => `${base}-${name}`;

  const form = useRef<HTMLFormElement>(null);
  const summary = useRef<HTMLDivElement>(null);
  const receiptTitle = useRef<HTMLHeadingElement>(null);
  const protocolText = useRef<HTMLElement>(null);
  const captcha = useRef<HTMLInputElement>(null);
  const request = useRef(0);

  const [challenge, setChallenge] = useState<ChallengeState>({ status: "loading" });
  const [errors, setErrors] = useState<Errors>({});
  const [attempt, setAttempt] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [sending, setSending] = useState(false);
  const [failure, setFailure] = useState("");
  const [done, setDone] = useState<Done | null>(null);
  const [copyStatus, setCopyStatus] = useState("");

  const loadChallenge = useCallback(async () => {
    const current = ++request.current;
    setChallenge({ status: "loading" });
    if (captcha.current) captcha.current.value = "";
    try {
      const data = await ouvidoriaApi<{ challenge?: Challenge }>({ action: "challenge" });
      if (current !== request.current) return;
      if (!data.challenge?.token) throw new OuvidoriaError(ouvidoriaText.challengeError);
      setChallenge({ status: "ready", token: data.challenge.token, question: data.challenge.question });
    } catch {
      if (current === request.current) setChallenge({ status: "error" });
    }
  }, []);

  useEffect(() => {
    if (enabled) void loadChallenge();
  }, [enabled, loadChallenge]);

  // Cada tentativa com erro leva o foco ao resumo, para quem usa teclado ou leitor de tela.
  useEffect(() => {
    if (attempt > 0) summary.current?.focus();
  }, [attempt]);

  useEffect(() => {
    if (done) receiptTitle.current?.focus();
  }, [done]);

  const errorList = ORDER.filter((name) => errors[name]);

  const clearError = (name: string) => {
    if (name in errors && name !== "files") {
      setErrors((current) => {
        const next = { ...current };
        delete next[name as FieldName];
        return next;
      });
    }
  };

  const onFiles = (input: HTMLInputElement) => {
    setFiles(Array.from(input.files ?? []));
    const problem = filesProblem(input.files);
    setErrors((current) => {
      const next = { ...current };
      if (problem) next.files = problem;
      else delete next.files;
      return next;
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!enabled) return;
    const element = event.currentTarget;
    const found = validate(element, challenge.status);
    setErrors(found);
    setFailure("");
    if (Object.keys(found).length > 0) {
      setAttempt((value) => value + 1);
      return;
    }

    const data = new FormData(element);
    data.append("action", "submit");
    if (challenge.status !== "ready") return;
    data.append("captchaToken", challenge.token);
    const email = String(data.get("email") ?? "").trim();

    setSending(true);
    try {
      const receipt = await ouvidoriaApi<Partial<Receipt>>(data);
      // 2xx sem protocolo (ou corpo que não é JSON) não é registro: cai no erro com o e-mail.
      if (typeof receipt.protocol !== "string" || !receipt.protocol.trim()) throw new OuvidoriaError(ouvidoriaText.sendError);
      setDone({ protocol: receipt.protocol, message: receipt.deliveryPending ? ouvidoriaText.pending : ouvidoriaText.sent(email) });
    } catch (error) {
      const message = error instanceof OuvidoriaError ? error.message : ouvidoriaText.sendError;
      setFailure(`${message} ${ouvidoriaText.fallback}`);
      if (error instanceof OuvidoriaError && error.code === "captcha") void loadChallenge();
    } finally {
      setSending(false);
    }
  };

  const jumpTo = (event: MouseEvent<HTMLAnchorElement>, name: FieldName) => {
    event.preventDefault();
    const target = document.getElementById(name === "identificacao" ? id("identificacao-0") : id(name));
    target?.focus();
    target?.scrollIntoView?.({ block: "center" });
  };

  const copyProtocol = async () => {
    if (!done) return;
    try {
      await navigator.clipboard.writeText(done.protocol);
      setCopyStatus("Protocolo copiado.");
    } catch {
      // Sem a área de transferência: seleciona o número para a pessoa copiar.
      const node = protocolText.current;
      const selection = window.getSelection();
      if (node && selection) {
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      let copied = false;
      try {
        copied = document.execCommand("copy");
      } catch {
        copied = false;
      }
      setCopyStatus(copied ? "Protocolo copiado." : "Protocolo selecionado. Copie com Ctrl+C ou pelo menu do aparelho.");
    }
  };

  const restart = () => {
    setDone(null);
    setErrors({});
    setFiles([]);
    setFailure("");
    setCopyStatus("");
    setAttempt(0);
    void loadChallenge();
  };

  const control = (name: FieldName | string, hint?: boolean) => ({
    id: id(name),
    name,
    "aria-describedby": describedBy(id(name), hint, errors[name as FieldName]),
    "aria-invalid": errors[name as FieldName] ? (true as const) : undefined,
  });

  return (
    <div className="page-form-wrap" data-reveal="item">
      <div aria-live="polite" className="page-form__live">
        {done && (
          <div className="page-form__receipt">
            <h3 ref={receiptTitle} tabIndex={-1}>
              Manifestação registrada
            </h3>
            <p>Guarde o número do protocolo:</p>
            <p className="page-form__protocol">
              <strong ref={protocolText}>{done.protocol}</strong>
            </p>
            <p>{done.message}</p>
            <div className="page-form__receipt-actions">
              <button type="button" className="button button--primary" onClick={() => void copyProtocol()}>
                Copiar protocolo <Copy aria-hidden="true" />
              </button>
              <button type="button" className="button button--quiet" onClick={restart}>
                Registrar outra manifestação
              </button>
            </div>
            {copyStatus && <p className="page-form__hint">{copyStatus}</p>}
          </div>
        )}
      </div>

      {!enabled && <p className="page-form__preview">{ouvidoriaText.previewNotice}</p>}

      {!done && (
        <form
          ref={form}
          className="page-form"
          noValidate
          aria-busy={sending || undefined}
          onSubmit={(event) => void onSubmit(event)}
          onChange={(event) => clearError((event.target as HTMLInputElement).name)}
        >
          {errorList.length > 0 && (
            <div ref={summary} className="page-form__summary" role="alert" tabIndex={-1} aria-labelledby={id("summary-title")}>
              <h3 id={id("summary-title")}>Revise {errorList.length === 1 ? "o campo" : `os ${errorList.length} campos`} abaixo</h3>
              <ul>
                {errorList.map((name) => (
                  <li key={name}>
                    <a href={`#${name === "identificacao" ? id("identificacao-0") : id(name)}`} onClick={(event) => jumpTo(event, name)}>
                      {errors[name]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <fieldset className="page-form__step" disabled={!enabled}>
            <legend>Identificação</legend>

            <fieldset
              className={errors.identificacao ? "page-form__choices is-invalid" : "page-form__choices"}
              aria-describedby={errors.identificacao ? id("identificacao-error") : undefined}
            >
              <legend>
                Como você quer se identificar?<span className="page-form__required"> (obrigatório)</span>
              </legend>
              {errors.identificacao && (
                <p id={id("identificacao-error")} className="page-form__error">
                  {errors.identificacao}
                </p>
              )}
              {identificationOptions.map((option, index) => (
                <div key={option.value} className="page-form__choice">
                  <input
                    type="radio"
                    id={id(`identificacao-${index}`)}
                    name="identificacao"
                    value={option.value}
                    defaultChecked={index === 0}
                    required
                    aria-describedby={id(`identificacao-${index}-hint`)}
                  />
                  <label htmlFor={id(`identificacao-${index}`)}>{option.label}</label>
                  <p id={id(`identificacao-${index}-hint`)} className="page-form__hint">
                    {option.hint}
                  </p>
                </div>
              ))}
            </fieldset>

            <div className="page-form__grid">
              <Field id={id("nome")} label="Nome">
                <input type="text" {...control("nome")} maxLength={160} autoComplete="name" />
              </Field>
              <Field id={id("email")} label="E-mail" required error={errors.email}>
                <input type="email" {...control("email")} maxLength={200} autoComplete="email" required />
              </Field>
              <Field id={id("telefone")} label="Telefone">
                <input type="tel" {...control("telefone")} maxLength={40} autoComplete="tel" />
              </Field>
              <Field id={id("empresa")} label="Empresa">
                <input type="text" {...control("empresa")} maxLength={160} autoComplete="organization" />
              </Field>
              <Field id={id("publico")} label="Você é" required error={errors.publico}>
                <select {...control("publico")} defaultValue="" required>
                  <option value="" disabled>
                    Selecione
                  </option>
                  {audienceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </fieldset>

          <fieldset className="page-form__step" disabled={!enabled}>
            <legend>Manifestação</legend>
            <div className="page-form__grid">
              <Field id={id("tipo")} label="Tipo de manifestação" required error={errors.tipo}>
                <select {...control("tipo")} defaultValue="" required>
                  <option value="" disabled>
                    Selecione
                  </option>
                  {typeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id={id("unidade_setor")} label="Unidade ou setor">
                <input type="text" {...control("unidade_setor")} maxLength={160} />
              </Field>
              <Field id={id("data_aproximada")} label="Data aproximada">
                <input type="date" {...control("data_aproximada")} />
              </Field>
            </div>
            <Field id={id("assunto")} label="Assunto" required error={errors.assunto}>
              <input
                type="text"
                {...control("assunto")}
                minLength={4}
                maxLength={160}
                placeholder={ouvidoriaText.subjectPlaceholder}
                required
              />
            </Field>
            <Field id={id("descricao")} label="Descrição" required hint={ouvidoriaText.descriptionHelp} error={errors.descricao}>
              <textarea
                {...control("descricao", true)}
                rows={7}
                minLength={20}
                maxLength={12000}
                placeholder={ouvidoriaText.descriptionPlaceholder}
                required
              />
            </Field>
            <Field id={id("envolvidos")} label="Pessoas ou áreas envolvidas">
              <textarea {...control("envolvidos")} rows={3} maxLength={2000} />
            </Field>
          </fieldset>

          <fieldset className="page-form__step" disabled={!enabled}>
            <legend>Anexos e envio</legend>
            <Field id={id("files")} label="Anexos" hint={ouvidoriaText.filesHelp} error={errors.files}>
              <input
                type="file"
                {...control("files", true)}
                multiple
                accept={OUVIDORIA_FILE_ACCEPT}
                onChange={(event) => onFiles(event.currentTarget)}
              />
            </Field>
            {files.length > 0 && (
              <ul className="page-form__files" aria-label="Arquivos escolhidos">
                {files.map((file, index) => (
                  <li key={`${file.name}-${index}`}>
                    {file.name} ({fileSize(file.size)})
                  </li>
                ))}
              </ul>
            )}

            <div className={errors.captchaAnswer ? "page-form__field is-invalid" : "page-form__field"}>
              <label htmlFor={id("captchaAnswer")}>
                {challenge.status === "ready" ? `Verificação: ${challenge.question}` : "Verificação"}
                <span className="page-form__required"> (obrigatório)</span>
              </label>
              <p id={id("captchaAnswer-hint")} className="page-form__hint" aria-live="polite">
                {!enabled && ouvidoriaText.previewChallenge}
                {enabled && challenge.status === "loading" && "Carregando a pergunta."}
                {challenge.status === "error" && ouvidoriaText.challengeError}
                {challenge.status === "ready" && "Responda com números, para confirmar o envio."}
              </p>
              {errors.captchaAnswer && (
                <p id={id("captchaAnswer-error")} className="page-form__error">
                  {errors.captchaAnswer}
                </p>
              )}
              <div className="page-form__inline">
                <input ref={captcha} type="text" inputMode="numeric" pattern="[0-9]*" {...control("captchaAnswer", true)} maxLength={3} required autoComplete="off" />
                {enabled && (
                  <button type="button" className="button button--quiet" onClick={() => void loadChallenge()}>
                    Nova pergunta <RotateCcw aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>

            {/* Armadilha para robôs: escondida de quem enxerga e de leitores de tela. */}
            <div className="page-form__trap" aria-hidden="true">
              <label htmlFor={id("website")}>Deixe este campo em branco</label>
              <input type="text" id={id("website")} name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div className={errors.consentimento_lgpd ? "page-form__consent is-invalid" : "page-form__consent"}>
              {errors.consentimento_lgpd && (
                <p id={id("consentimento_lgpd-error")} className="page-form__error">
                  {errors.consentimento_lgpd}
                </p>
              )}
              <input type="checkbox" {...control("consentimento_lgpd")} value="true" required />
              <label htmlFor={id("consentimento_lgpd")}>
                {ouvidoriaText.consentLead} <Link to="/politica-de-privacidade">Política de Privacidade</Link>.
              </label>
            </div>
            <p className="page-form__note">{ouvidoriaText.note}</p>

            <div aria-live="polite" className="page-form__failure">
              {failure && <p>{failure}</p>}
            </div>

            <button type="submit" className="button button--primary" disabled={sending || !enabled}>
              {sending ? "Enviando" : "Enviar manifestação"} <ArrowRight aria-hidden="true" />
            </button>
          </fieldset>
        </form>
      )}
    </div>
  );
};

export default OuvidoriaForm;
