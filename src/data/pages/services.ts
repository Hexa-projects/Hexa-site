import { homeMedia, type MediaImage } from "@/data/homeMedia";
import { triage, whatsappHref, type CompanyFact, type TriagePath } from "@/data/home";
import type { PageCard } from "@/components/page/CardGrid";

/**
 * Conteúdo das páginas de Serviços (hub e os quatro serviços).
 * Fontes, nesta ordem: notas do segundo cérebro "Serviços Técnicos Hexamedical", "Criogenia tubos e peças"
 * e "Público atendido Hexamedical"; texto do site atual (as quatro páginas de serviço, /servicos/ e /estrutura/);
 * copy aprovada da home (src/data/home.ts, etapas Instalação, Manutenção e Laboratório, e a triagem).
 *
 * Fica de fora, por decisão da fase 2: "equipe certificada internacionalmente" (não verificável), "máxima performance",
 * "peças express" e qualquer garantia, prazo, estoque, SLA, preço ou compatibilidade.
 * Tomografia multimarcas só "conforme avaliação de escopo": nada de representação oficial ou assistência autorizada
 * de outras marcas. Criogenia, tubos de CT e peças: cada item diz que a equipe técnica confirma a aplicação.
 */

export type ServiceSlug = "manutencao" | "contratos" | "instalacao" | "reparo";

export type ServiceContent = {
  slug: ServiceSlug;
  /** h1 da página e nome do card no hub. */
  title: string;
  /** Complemento do <title> e da migalha. */
  docTitle: string;
  description: string;
  lead: string;
  /** Placa técnica do hero. */
  eyebrow: string;
  hero: MediaImage;
  secondary: { label: string; href: string };
  scopeTitle: string;
  scopeIntro: string;
  scope: string[];
  /** Seção própria do serviço (no reparo: criogenia, tubos de CT e peças), em cards. */
  extra?: { id: string; title: string; intro: string; cards: PageCard[] };
  processTitle: string;
  process: { title: string; body: string }[];
  faq: { q: string; a: string }[];
  whatsappText: string;
  /** Trilha da triagem que leva a mensagem da página, com o que muda nela. */
  contact: { path: TriagePath["id"] } & Partial<Omit<TriagePath, "id" | "whatsappText">>;
  /** Corpo do card no hub e nos "outros serviços". */
  card: string;
};

const asset = (src: string, width: number, height: number, alt: string): MediaImage => ({ src, width, height, alt });

const media = {
  manutencao: homeMedia.stages.manutencao,
  contratos: asset(
    "/assets/hexa/Contrato-de-manutencoes-foto-1024x683.webp",
    1024,
    683,
    "Aperto de mãos sobre uma prancheta com documentos, no fechamento de um contrato",
  ),
  instalacao: homeMedia.stages.instalacao,
  laboratorio: homeMedia.stages.laboratorio,
  estrutura: homeMedia.stages.projeto,
};

/** Fatos de estrutura e cobertura repetidos nas páginas de serviço do site atual (e em /estrutura/). */
export const serviceFacts: CompanyFact[] = [
  { value: "16 anos", label: "de experiência em manutenção de equipamentos médicos" },
  { value: "5 unidades", label: "São Paulo, Rio de Janeiro, Belo Horizonte, Goiânia e Florianópolis" },
  { value: "3 salas", label: "de teste para tomografia, raio-X e mamografia" },
  { value: "Brasil", label: "atendimento em todo o território nacional" },
];

/** O que a estrutura inclui (site atual, /estrutura/ e páginas de serviço). */
export const serviceStructure = [
  "Técnicos de campo especializados",
  "Técnicos de laboratório de eletrônica, especialistas em peças de equipamentos médicos",
  "Laboratório de eletrônica e laboratório de criogenia",
  "3 salas de teste para tomografia, raio-X e mamografia",
  "Time de logística para a entrega de peças",
];

/** Os três caminhos da triagem da home; a trilha do serviço leva a mensagem da página. */
export function serviceContactPaths(service: Pick<ServiceContent, "contact" | "whatsappText">): TriagePath[] {
  const { path, ...changes } = service.contact;
  return triage.map((item) => (item.id === path ? { ...item, ...changes, whatsappText: service.whatsappText } : item));
}

const partCard = (title: string, meta: string, body: string): PageCard => ({
  title,
  meta,
  body: `${body} A equipe técnica confirma a aplicação no seu equipamento.`,
  href: whatsappHref(`Olá! Quero consultar este item para o meu equipamento: ${title}.`),
});

export const services: Record<ServiceSlug, ServiceContent> = {
  manutencao: {
    slug: "manutencao",
    title: "Manutenção",
    docTitle: "Manutenção de equipamentos",
    description:
      "Manutenção preventiva e corretiva de ressonância magnética, tomografia e hemodinâmica de diversos fabricantes, avulsa ou por contrato, com atendimento em todo o território nacional.",
    lead: "Manutenção preventiva e corretiva de ressonância magnética, tomografia e hemodinâmica de diversos fabricantes. Atendemos em todo o território nacional, por chamado avulso ou por contrato, com ou sem peças.",
    eyebrow: "Ressonância magnética · Tomografia · Hemodinâmica",
    hero: media.manutencao,
    secondary: { label: "Ver contratos de manutenção", href: "/servicos/contratos" },
    scopeTitle: "O que a manutenção cobre",
    scopeIntro: "A equipe atende o equipamento na clínica ou no hospital, e as peças com falha vão para o laboratório próprio.",
    scope: [
      "Manutenção preventiva e corretiva de ressonância magnética, tomografia e hemodinâmica",
      "Equipamentos de diversos fabricantes; tomografia multimarcas conforme avaliação do escopo",
      "Contratos full service para ressonância magnética Esaote",
      "Atendimento avulso ou por contrato, com ou sem peças",
      "Técnicos de campo em todo o território nacional",
      "Bobinas, placas, módulos e fontes reparados no laboratório próprio",
    ],
    processTitle: "Como o atendimento acontece",
    process: [
      { title: "Avaliação técnica", body: "A equipe entende o equipamento e a necessidade: preventiva, corretiva ou um contrato." },
      { title: "Atendimento em campo", body: "Técnicos de campo fazem a preventiva e a corretiva no local, em todo o país." },
      { title: "Peça no laboratório", body: "Quando a falha está numa bobina, placa, módulo ou fonte, a peça vai para o laboratório de eletrônica." },
      { title: "Logística de peças", body: "Um time de logística cuida da entrega das peças até o equipamento." },
    ],
    faq: [
      {
        q: "Vocês atendem equipamentos de outros fabricantes além da Esaote?",
        a: "Sim. Fazemos manutenção de ressonância magnética, tomografia e hemodinâmica de diversos fabricantes. Em tomografia multimarcas, a equipe avalia o escopo de cada equipamento antes da proposta.",
      },
      {
        q: "Preciso de contrato para chamar a equipe?",
        a: "Não. A manutenção pode ser avulsa ou por contrato, com ou sem peças. Para ressonância magnética Esaote também há contratos full service.",
      },
      {
        q: "Vocês atendem fora de São Paulo?",
        a: "Sim. O atendimento cobre todo o território nacional, com unidades em São Paulo, Rio de Janeiro, Belo Horizonte, Goiânia e Florianópolis.",
      },
      {
        q: "E quando a falha está numa peça?",
        a: "Bobinas, placas eletrônicas, módulos e fontes vão para o laboratório próprio. Lá a peça é analisada, a equipe tenta recuperá-la e ela só volta para a sala de exame depois de testada.",
      },
    ],
    whatsappText: "Olá! Preciso de manutenção para um equipamento de ressonância, tomografia ou hemodinâmica.",
    contact: { path: "manter", href: "/servicos/contratos", linkLabel: "Ver contratos de manutenção" },
    card: "Preventiva e corretiva de ressonância magnética, tomografia e hemodinâmica, avulsa ou por contrato.",
  },

  contratos: {
    slug: "contratos",
    title: "Contratos",
    docTitle: "Contratos de manutenção",
    description:
      "Contratos de manutenção personalizados para equipamentos de diagnóstico por imagem, com ou sem peças, contemplando manutenção preventiva e corretiva em todo o território nacional.",
    lead: "Contratos de manutenção personalizados para cada equipamento, com ou sem peças, contemplando preventiva e corretiva. O objetivo é reduzir o tempo de equipamento parado.",
    eyebrow: "Manutenção preventiva e corretiva · com ou sem peças",
    hero: media.contratos,
    secondary: { label: "Ver manutenção avulsa", href: "/servicos/manutencao" },
    scopeTitle: "O que o contrato inclui",
    scopeIntro: "O escopo é montado a partir do equipamento que a clínica opera.",
    scope: [
      "Contrato personalizado para cada equipamento",
      "Manutenção preventiva e corretiva",
      "Opção com ou sem peças",
      "Contratos full service para ressonância magnética Esaote",
      "Atendimento técnico e suporte ao longo de todo o contrato",
      "Atendimento em todo o território nacional",
    ],
    processTitle: "Como o contrato é montado",
    process: [
      { title: "Escopo por equipamento", body: "O contrato parte do equipamento, do fabricante e do uso que a clínica faz dele." },
      { title: "Preventiva e corretiva", body: "O contrato contempla a preventiva e a corretiva, com atendimento técnico e suporte durante toda a vigência." },
      { title: "Com ou sem peças", body: "A proposta define se as peças entram no contrato." },
    ],
    faq: [
      {
        q: "O que entra no contrato?",
        a: "Manutenção preventiva e corretiva, com ou sem peças, e atendimento técnico e suporte ao longo de todo o contrato. O escopo é definido para cada equipamento.",
      },
      {
        q: "Há contrato para ressonância magnética Esaote?",
        a: "Sim. Para ressonância magnética Esaote há contratos full service.",
      },
      {
        q: "Por que fazer contrato em vez de chamar a manutenção avulsa?",
        a: "Com preventiva e corretiva no mesmo contrato e a equipe acompanhando o equipamento durante toda a vigência, o objetivo é reduzir o tempo de equipamento parado. Quem prefere pode chamar a manutenção avulsa quando precisar.",
      },
      {
        q: "Vocês atendem contratos fora de São Paulo?",
        a: "Sim. Os contratos valem para todo o território nacional, com unidades em São Paulo, Rio de Janeiro, Belo Horizonte, Goiânia e Florianópolis.",
      },
    ],
    whatsappText: "Olá! Quero um contrato de manutenção para o meu equipamento.",
    contact: {
      path: "manter",
      title: "Quero um contrato de manutenção",
      body: "Conte qual é o equipamento e o fabricante. A equipe monta o escopo do contrato, com ou sem peças.",
      href: "/servicos/manutencao",
      linkLabel: "Ver manutenção avulsa",
    },
    card: "Contratos personalizados, com ou sem peças, contemplando preventiva e corretiva.",
  },

  instalacao: {
    slug: "instalacao",
    title: "Instalação",
    docTitle: "Instalação e desinstalação",
    description:
      "Instalação, desinstalação e transporte de equipamentos de diagnóstico por imagem, mudança de endereço, visitas técnicas avulsas, gerenciamento de projetos em imagem e consultoria.",
    lead: "Avaliamos o local, desinstalamos, transportamos e instalamos o equipamento, também quando a clínica muda de endereço. Fazemos visitas técnicas avulsas e gerenciamento de projetos em imagem.",
    eyebrow: "Instalação · Desinstalação · Projetos em imagem",
    hero: media.instalacao,
    secondary: { label: "Ver o projeto da sala", href: "/solucoes/ressonancia-magnetica" },
    scopeTitle: "O que fazemos",
    scopeIntro: "Do planejamento da sala ao equipamento funcionando, e depois quando ele precisa mudar de lugar.",
    scope: [
      "Desinstalação e instalação de equipamentos de diagnóstico por imagem",
      "Transporte do equipamento, também na mudança de endereço da clínica",
      "Visitas técnicas avulsas, preventivas e corretivas fora de contrato",
      "Gerenciamento de projetos em imagem e consultoria",
      "Projeto da sala antes da compra: área, rede elétrica e requisitos de instalação de cada sistema",
      "Contrato de manutenção, com ou sem peças, depois da instalação",
    ],
    processTitle: "Como funciona",
    process: [
      { title: "Avaliação técnica", body: "A equipe avalia o local e a necessidade antes de mexer no equipamento." },
      { title: "Desinstalação e transporte", body: "O equipamento é desinstalado e transportado até o novo endereço." },
      { title: "Instalação", body: "A equipe instala o equipamento na sala planejada para ele." },
      { title: "Depois da instalação", body: "A manutenção segue avulsa ou por contrato, com ou sem peças." },
    ],
    faq: [
      {
        q: "Vocês fazem a mudança do equipamento para outro endereço?",
        a: "Sim. Desinstalamos, transportamos e instalamos o equipamento no novo endereço.",
      },
      {
        q: "Dá para contratar só uma visita técnica?",
        a: "Sim. Fazemos visitas técnicas avulsas, além de preventivas e corretivas fora de contrato.",
      },
      {
        q: "Vocês ajudam a planejar a sala?",
        a: "Sim. Planejamos a sala antes da compra: área, rede elétrica e requisitos de instalação de cada sistema. Também fazemos gerenciamento de projetos em imagem e consultoria.",
      },
      {
        q: "Atendem em todo o Brasil?",
        a: "Sim. O atendimento cobre todo o território nacional, com unidades em São Paulo, Rio de Janeiro, Belo Horizonte, Goiânia e Florianópolis.",
      },
    ],
    whatsappText: "Olá! Preciso instalar, desinstalar ou mudar um equipamento de endereço.",
    contact: {
      path: "manter",
      stage: "instalacao",
      title: "Preciso instalar ou mudar um equipamento",
      body: "Conte qual é o equipamento e para onde ele vai. A equipe avalia o local antes da desinstalação.",
      href: "/servicos/manutencao",
      linkLabel: "Ver manutenção",
    },
    card: "Instalação, desinstalação, transporte e mudança de endereço, com visitas técnicas avulsas.",
  },

  reparo: {
    slug: "reparo",
    title: "Reparo e laboratório",
    docTitle: "Reparo de peças e laboratório",
    description:
      "Laboratório próprio para reparo de bobinas de ressonância magnética, placas eletrônicas, módulos, fontes e periféricos, e linha de criogenia, tubos de CT e peças de RM e CT.",
    lead: "Quando uma bobina, placa ou fonte falha, o laboratório próprio analisa e tenta recuperar a peça. Ela só volta para a sala de exame depois de testada, e a troca fica para quando o reparo não resolve.",
    eyebrow: "Laboratório de eletrônica · Laboratório de criogenia",
    hero: media.laboratorio,
    secondary: { label: "Ver criogenia e tubos de CT", href: "#criogenia-e-pecas" },
    scopeTitle: "O que o laboratório repara",
    scopeIntro: "O objetivo é prolongar a vida útil da peça, reduzir custos e evitar substituições desnecessárias.",
    scope: [
      "Bobinas de ressonância magnética",
      "Placas eletrônicas e módulos",
      "Fontes de alimentação",
      "Outros periféricos de equipamentos médicos",
      "Laboratório de eletrônica e laboratório de criogenia",
      "3 salas de teste para tomografia, raio-X e mamografia",
    ],
    extra: {
      id: "criogenia-e-pecas",
      title: "Criogenia, tubos de CT e peças",
      intro: "Peças e componentes de ressonância magnética e tomografia. Para cada item, a equipe técnica confirma a aplicação no seu equipamento antes da proposta.",
      cards: [
        partCard(
          "Compressor Sumitomo F-70H",
          "Criogenia · ressonância magnética",
          "Compressor refrigerado a água que mantém o hélio líquido em magnetos supercondutores.",
        ),
        partCard(
          "Coldhead Sumitomo RDK-408L3",
          "Criogenia · RM de 1,5 T e 3 T",
          "Cabeça fria de alta capacidade para criogenia e vácuo em ressonâncias de 1,5 T e 3 T.",
        ),
        partCard("Tubos de CT", "Dunlee e Varex", "Tubos de reposição Dunlee e Varex para tomógrafos das principais marcas."),
        partCard("Adsorbers e módulos de gradiente", "Ressonância magnética", "Adsorbers da linha de criogenia e módulos de gradiente da ressonância magnética."),
        partCard("Workstation e outras peças", "Ressonância magnética e tomografia", "Workstation, bobinas e outras peças de RM e CT."),
      ],
    },
    processTitle: "Como a peça passa pelo laboratório",
    process: [
      { title: "Análise", body: "Técnicos de laboratório de eletrônica analisam a peça para encontrar a falha." },
      { title: "Recuperação", body: "A equipe tenta recuperar a peça antes de falar em troca." },
      { title: "Teste", body: "A peça só volta para a sala de exame depois de testada." },
    ],
    faq: [
      {
        q: "Quais peças o laboratório repara?",
        a: "Bobinas de ressonância magnética, placas eletrônicas, módulos, fontes de alimentação e outros periféricos de equipamentos médicos.",
      },
      {
        q: "Quando a troca da peça é necessária?",
        a: "Quando o reparo não resolve. Antes disso, o laboratório analisa e tenta recuperar a peça, e ela só volta para a sala depois de testada.",
      },
      {
        q: "Vocês trabalham com compressor, coldhead e tubo de CT?",
        a: "Sim. A linha inclui o compressor Sumitomo F-70H, o coldhead Sumitomo RDK-408L3, adsorbers, módulos de gradiente, workstation e tubos de CT de reposição Dunlee e Varex. A equipe técnica confirma a aplicação, as condições e o valor de cada item para o seu equipamento.",
      },
      {
        q: "Por que reparar em vez de trocar?",
        a: "O reparo prolonga a vida útil da peça, reduz custos e evita substituições desnecessárias.",
      },
    ],
    whatsappText: "Olá! Tenho uma peça ou placa para avaliação no laboratório da Hexamedical.",
    contact: { path: "reparar", href: "/servicos/manutencao", linkLabel: "Ver manutenção" },
    card: "Laboratório próprio para bobinas, placas, módulos e fontes, com criogenia, tubos de CT e peças.",
  },
};

export const serviceOrder: ServiceSlug[] = ["manutencao", "contratos", "instalacao", "reparo"];

/** Card do serviço (hub e "outros serviços"): sem foto nos relacionados, com foto de cena no hub. */
export const serviceCard = (slug: ServiceSlug, withImage = false): PageCard => {
  const service = services[slug];
  return {
    title: service.title,
    body: service.card,
    href: `/servicos/${slug}`,
    ...(withImage ? { image: service.hero, fill: true } : {}),
  };
};

export const serviceHub = {
  title: "Serviços",
  docTitle: "Serviços técnicos",
  description:
    "Manutenção preventiva e corretiva, contratos, instalação e laboratório de reparo para equipamentos de diagnóstico por imagem, com atendimento em todo o território nacional.",
  heroTitle: "Manutenção, instalação e laboratório",
  heroLead:
    "Manutenção de ressonância magnética, tomografia e hemodinâmica, contratos, instalação e reparo de peças no laboratório próprio, com atendimento em todo o território nacional.",
  eyebrow: "Equipe técnica Hexamedical · todo o território nacional",
  whatsappText: "Olá! Quero falar com a equipe técnica da Hexamedical.",
  servicesIntro:
    "Para clínicas de imagem, hospitais humanos e veterinários, centros de diagnóstico e universidades que precisam manter o equipamento funcionando.",
  cards: serviceOrder.map((slug) => serviceCard(slug, true)),
  structureIntro:
    "Unidades em cinco capitais e um centro próprio para testar e reparar equipamentos e peças.",
  structureMedia: media.estrutura,
};
