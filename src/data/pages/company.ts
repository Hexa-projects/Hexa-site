import { homeMedia } from "@/data/homeMedia";
import { companyFacts, whatsappHref } from "@/data/home";
import { OUVIDORIA_EMAIL } from "@/data/ouvidoria";
import type { PageCard } from "@/components/page/CardGrid";
import type { Channel } from "@/components/page/ChannelList";

/**
 * Conteúdo institucional: empresa, contato, ouvidoria, materiais de apoio e páginas legais.
 * Fontes, nesta ordem: nota do segundo cérebro "Público atendido Hexamedical"; texto do site atual
 * (/estrutura/, /contato/, /apoio/, /ouvidoria/ e os fatos repetidos nas páginas de serviço);
 * copy aprovada da home (src/data/home.ts e o bloco "Quem vende também instala e conserta").
 * Privacidade e termos: versão provisória, pendente de revisão jurídica. Sem base legal, prazo de guarda
 * ou afirmação sobre rastreamento que não dê para verificar no próprio código do site.
 */

export const COMMERCIAL_EMAIL = "comercial@hexamedical.com.br";
export const PHONE_DISPLAY = "+55 11 97314-0914";
export const PHONE_TEL = "tel:+5511973140914";
export const OPENING_HOURS = "segunda a quinta, 8h às 18h; sexta, 8h às 17h; sábado e domingo fechado";

export const LEGAL_NOTICE = "Versão provisória, pendente de revisão jurídica.";

/* ---------- /empresa ---------- */

export const companyPage = {
  docTitle: "A Hexamedical",
  description:
    "A Hexamedical representa a Esaote em ressonância magnética, instala e faz a manutenção dos equipamentos, com laboratório próprio e unidades em cinco capitais.",
  title: "A Hexamedical",
  // Copy aprovada da home (CompanyFacts).
  lead: "A Hexamedical representa a Esaote em ressonância magnética e vende também tomografia veterinária, radiografia digital, bombas injetoras e software. Atendemos clínicas, hospitais, universidades e centros veterinários.",
  eyebrow: "Diagnóstico por imagem · todo o território nacional",
  whatsappText: "Olá! Quero conhecer melhor a Hexamedical.",
  aboutIntro:
    "Depois da instalação, o contato continua o mesmo. Nossa equipe de campo faz a manutenção em todo o país, e o laboratório próprio tenta recuperar a peça com defeito antes de propor uma troca.",
  facts: companyFacts,
  structureIntro: "O centro técnico da Hexamedical reúne salas de teste, laboratórios, treinamento e showroom.",
  structureMedia: homeMedia.stages.laboratorio,
  // Site atual, /estrutura/.
  structure: [
    "3 salas de teste para tomografia, raio-X e mamografia",
    "Laboratório de eletrônica",
    "Laboratório de criogenia",
    "Salas de treinamento para a equipe interna e para terceiros",
    "Showroom com gaiola para ressonância magnética",
    "Reparos de módulos, fontes, bobinas e placas",
  ],
  coverageIntro: "Unidades em cinco capitais e atendimento em todo o território nacional.",
  units: ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Goiânia", "Florianópolis"],
  // Nota "Público atendido Hexamedical".
  audienceIntro: "Operações que precisam estruturar, expandir ou manter o diagnóstico por imagem.",
  audience: [
    "Clínicas de imagem e de radiologia",
    "Hospitais humanos e veterinários",
    "Centros de diagnóstico",
    "Universidades e institutos de pesquisa",
    "Clínicas ortopédicas",
  ],
  next: [
    { title: "Soluções", body: "Ressonância magnética Esaote, linha veterinária, radiografia digital, bombas injetoras e software.", href: "/solucoes" },
    { title: "Serviços", body: "Manutenção, contratos, instalação e reparo de peças no laboratório próprio.", href: "/servicos" },
    { title: "Materiais de apoio", body: "Fichas técnicas, guias e vídeos de uso, enviados sob pedido.", href: "/materiais" },
  ] satisfies PageCard[],
};

/* ---------- /contato ---------- */

export const contactPage = {
  docTitle: "Contato",
  description: `Fale com a Hexamedical pelo WhatsApp ou telefone ${PHONE_DISPLAY}, ou pelo e-mail ${COMMERCIAL_EMAIL}. Atendimento de segunda a sexta.`,
  title: "Contato",
  lead: "Fale com a Hexamedical pelo WhatsApp, por telefone ou por e-mail, de segunda a sexta.",
  triageTitle: "Escolha o assunto",
  channelsTitle: "Telefone, e-mail e horário",
  channelsIntro: "Os mesmos canais do WhatsApp, para quem prefere ligar ou escrever.",
  channels: [
    { label: "Telefone e WhatsApp", value: PHONE_DISPLAY, action: { label: "Ligar", href: PHONE_TEL } },
    { label: "E-mail comercial", value: COMMERCIAL_EMAIL, action: { label: "Escrever e-mail", href: `mailto:${COMMERCIAL_EMAIL}` } },
    { label: "Horário de atendimento", value: OPENING_HOURS },
  ] satisfies Channel[],
  ouvidoriaTitle: "Ouvidoria",
  ouvidoriaCard: {
    title: "Registrar uma manifestação",
    body: "Reclamações, denúncias, sugestões, elogios ou solicitações, com protocolo por e-mail. Canal confidencial para clientes, colaboradores, fornecedores e demais públicos.",
    href: "/ouvidoria",
  } satisfies PageCard,
};

/* ---------- /ouvidoria ---------- */

export const ouvidoriaPage = {
  docTitle: "Ouvidoria",
  description:
    "Canal confidencial para clientes, colaboradores, fornecedores e demais públicos registrarem reclamações, denúncias, sugestões, elogios ou solicitações relacionadas à Hexamedical.",
  title: "Ouvidoria",
  lead: "Um espaço confidencial para clientes, colaboradores, fornecedores e demais públicos enviarem reclamações, denúncias, sugestões, elogios ou solicitações relacionadas à Hexamedical.",
  eyebrow: OUVIDORIA_EMAIL,
  howTitle: "Como o registro é tratado",
  how: [
    { title: "Escuta protegida", body: "O relato é tratado conforme o nível de identificação que você escolher." },
    { title: "Protocolo por e-mail", body: "Você recebe a confirmação com o número do protocolo." },
    { title: "Retorno direto", body: "A equipe analisa e responde pelo e-mail informado." },
  ] satisfies PageCard[],
  formTitle: "Registrar manifestação",
  formIntro: "Você receberá a confirmação e o protocolo por e-mail.",
  emailNote: `Se preferir, escreva para ${OUVIDORIA_EMAIL}.`,
};

/* ---------- /materiais ---------- */

const ask = (topic: string) => whatsappHref(`Olá! Quero receber material de apoio sobre ${topic}.`);

export const materialsPage = {
  docTitle: "Materiais de apoio",
  description: "Fichas técnicas, guias e vídeos de uso dos equipamentos da Hexamedical, enviados sob pedido pela equipe.",
  title: "Materiais de apoio",
  lead: "Fichas técnicas, guias práticos e vídeos de uso dos equipamentos. A equipe envia o material sob pedido, conforme o modelo e a configuração.",
  whatsappText: "Olá! Quero receber material de apoio sobre um equipamento da Hexamedical.",
  kindsTitle: "O que você pode pedir",
  kindsIntro: "O material disponível varia de um equipamento para outro. A equipe informa o que existe para o seu modelo.",
  kinds: [
    { title: "Fichas técnicas", body: "Dados do fabricante sobre o equipamento, para comparar modelos e planejar a sala." },
    { title: "Guias práticos", body: "Orientações para a rotina de uso do equipamento pela equipe da clínica." },
    { title: "Vídeos de uso", body: "Demonstrações de operação, para treinar e tirar dúvidas da equipe." },
  ] satisfies PageCard[],
  byLineTitle: "Peça pelo equipamento",
  byLineIntro: "Escolha a linha. A conversa abre no WhatsApp com o pedido pronto.",
  byLine: [
    { title: "Ressonância magnética Esaote", body: "O-scan SMART, S-scan Open, G-scan Open e Magnifico Open.", href: ask("ressonância magnética Esaote") },
    { title: "Linha veterinária", body: "Ressonância e tomografia para medicina veterinária.", href: ask("a linha veterinária") },
    { title: "Radiografia digital", body: "Sistemas de radiografia digital Mindray.", href: ask("radiografia digital") },
    { title: "Bombas injetoras", body: "Injetoras de contraste Medtron Accutron.", href: ask("bombas injetoras") },
    { title: "HexAI", body: "Varredura acelerada com SwiftMR na ressonância.", href: ask("o HexAI") },
  ] satisfies PageCard[],
};

/* ---------- Páginas legais ---------- */

export type LegalKind = "privacidade" | "termos";

export type LegalSection = { title: string; paragraphs: string[]; list?: string[] };

export type LegalContent = {
  docTitle: string;
  description: string;
  title: string;
  lead: string;
  sections: LegalSection[];
};

const contactSection: LegalSection = {
  title: "Contato",
  paragraphs: [
    `Para dúvidas sobre este texto ou sobre dados pessoais, escreva para ${COMMERCIAL_EMAIL} ou para a Ouvidoria, em ${OUVIDORIA_EMAIL}.`,
  ],
};

export const legalPages: Record<LegalKind, LegalContent> = {
  privacidade: {
    docTitle: "Política de Privacidade",
    description: "Como o site da Hexamedical trata dados pessoais hoje. Versão provisória, pendente de revisão jurídica.",
    title: "Política de Privacidade",
    lead: "O que este site faz com dados pessoais hoje, em linguagem direta. O texto final está em revisão jurídica e pode mudar.",
    sections: [
      {
        title: "Sobre esta versão",
        paragraphs: [
          `${LEGAL_NOTICE} Este texto descreve o funcionamento atual do site e será substituído pela política aprovada pela área jurídica.`,
          "Bases legais, prazos de guarda e o detalhamento dos direitos do titular serão definidos nessa revisão.",
        ],
      },
      {
        title: "Quem é o controlador",
        paragraphs: [`Hexamedical. Contato: ${COMMERCIAL_EMAIL} e, para a Ouvidoria, ${OUVIDORIA_EMAIL}.`],
      },
      {
        title: "Formulário da Ouvidoria",
        paragraphs: [
          "O único formulário do site é o da Ouvidoria. Ele serve para registrar e apurar a manifestação, enviar a confirmação com o protocolo e responder pelo e-mail informado.",
          "O formulário coleta:",
        ],
        list: [
          "Forma de identificação escolhida (confidencial ou identificada)",
          "Nome, telefone e empresa, se você informar",
          "E-mail, para o protocolo e o retorno",
          "Público (cliente, colaborador, fornecedor, parceiro ou outro) e tipo de manifestação",
          "Unidade ou setor, data aproximada, assunto, descrição e pessoas ou áreas envolvidas",
          "Anexos, se você enviar",
          "A resposta à pergunta de verificação, que confirma que o envio foi feito por uma pessoa",
        ],
      },
      {
        title: "Relatos confidenciais",
        paragraphs: [
          "Em relatos confidenciais, os dados de identificação ficam acessíveis somente à equipe autorizada da Ouvidoria. Eles são usados para apuração e retorno.",
        ],
      },
      {
        title: "WhatsApp, telefone e e-mail",
        paragraphs: [
          "Os botões de WhatsApp abrem o aplicativo ou o site do WhatsApp com uma mensagem pronta. Nada é enviado até você mandar a mensagem por lá, e a conversa segue as regras desse serviço externo.",
          "Telefone e e-mail aparecem como texto. Os atalhos de ligar e escrever abrem o aplicativo do seu aparelho.",
        ],
      },
      contactSection,
    ],
  },
  termos: {
    docTitle: "Termos de Uso",
    description: "Termos de uso do site da Hexamedical. Versão provisória, pendente de revisão jurídica.",
    title: "Termos de Uso",
    lead: "As regras de uso deste site, em linguagem direta. O texto final está em revisão jurídica e pode mudar.",
    sections: [
      {
        title: "Sobre esta versão",
        paragraphs: [`${LEGAL_NOTICE} Este texto será substituído pelos termos aprovados pela área jurídica.`],
      },
      {
        title: "O que este site oferece",
        paragraphs: [
          "Informação sobre os equipamentos e os serviços da Hexamedical e canais para falar com a equipe.",
          "O site não vende nem fecha negócio. Preço, prazo e condições comerciais são tratados em proposta, com a equipe comercial.",
        ],
      },
      {
        title: "Informações técnicas",
        paragraphs: [
          "Os dados técnicos dos equipamentos seguem os materiais dos fabricantes, indicados na própria página. Eles podem mudar conforme o modelo e a configuração, e a equipe técnica confirma cada caso.",
        ],
      },
      {
        title: "Links externos",
        paragraphs: [
          "Alguns links levam a serviços de terceiros, como o WhatsApp e os sites dos fabricantes. Esses serviços seguem os próprios termos.",
        ],
      },
      contactSection,
    ],
  },
};
