import { homeMedia, type MediaImage, type StageId } from "./homeMedia";

/**
 * Conteúdo da home. Os textos partem do site oficial (hexamedical.com.br), da home anterior
 * deste repositório e de src/data/editorial.ts (dados técnicos informados pela Esaote).
 */

export type CompanyFact = { value: string; label: string };

/** Números da home anterior deste repositório (não aparecem no site oficial): confirmar antes de publicar. */
export const companyFacts: CompanyFact[] = [
  { value: "+16 anos", label: "em diagnóstico por imagem, com foco em ressonância magnética" },
  { value: "+500", label: "equipamentos atendidos pela equipe técnica" },
  { value: "5 unidades", label: "São Paulo, Rio de Janeiro, Belo Horizonte, Goiânia e Florianópolis" },
  { value: "3 salas", label: "de teste para tomografia, raio-X e mamografia" },
];

export type LifecycleStage = {
  id: StageId;
  title: string;
  body: string;
  /** O que a etapa inclui, em itens curtos. */
  points: string[];
  href: string;
  linkLabel: string;
  image: MediaImage;
};

export const lifecycle: LifecycleStage[] = [
  {
    id: "escolha",
    title: "Escolha",
    body: "Indicamos o sistema a partir dos exames que você quer fazer, do volume esperado e do espaço disponível.",
    points: [
      "Ressonância aberta Esaote, das extremidades ao corpo inteiro",
      "Linha veterinária de ressonância e tomografia",
      "Radiografia digital, bombas injetoras e software",
    ],
    href: "/solucoes",
    linkLabel: "Ver soluções",
    image: homeMedia.stages.escolha,
  },
  {
    id: "projeto",
    title: "Projeto da sala",
    body: "Planejamos a sala antes da compra: área, rede elétrica e requisitos de instalação de cada sistema, conforme a Esaote. Uma ressonância aberta pode ser instalada em salas onde um sistema convencional não caberia.",
    points: ["O-scan SMART: instalação em 9 m²", "S-scan Open: a partir de 20 m²", "G-scan Open: 23 m²"],
    href: "/solucoes/ressonancia-magnetica",
    linkLabel: "Comparar a linha de RM",
    image: homeMedia.stages.projeto,
  },
  {
    id: "instalacao",
    title: "Instalação",
    body: "Nossa equipe avalia o local, desinstala, transporta e instala o equipamento, também quando a clínica muda de endereço.",
    points: ["Avaliação técnica da necessidade", "Desinstalação e instalação", "Atendimentos avulsos ligados à operação"],
    href: "/servicos/instalacao",
    linkLabel: "Conhecer a instalação",
    image: homeMedia.stages.instalacao,
  },
  {
    id: "operacao",
    title: "Operação",
    body: "Treinamos a equipe da clínica para a rotina de exames. O HexAI usa o SwiftMR, de inteligência artificial, para encurtar o tempo de varredura na ressonância.",
    points: ["Treinamento da equipe de operação", "Varredura acelerada com SwiftMR"],
    href: "/solucoes/hexai",
    linkLabel: "Conhecer o HexAI",
    image: homeMedia.stages.operacao,
  },
  {
    id: "manutencao",
    title: "Manutenção",
    body: "Manutenção preventiva e corretiva em todo o país, avulsa ou por contrato, com ou sem peças.",
    points: ["Ressonância, tomografia e hemodinâmica", "Equipamentos de diversos fabricantes", "Contratos sob medida para cada equipamento"],
    href: "/servicos/manutencao",
    linkLabel: "Ver manutenção",
    image: homeMedia.stages.manutencao,
  },
  {
    id: "laboratorio",
    title: "Laboratório",
    body: "Quando uma bobina, placa ou fonte falha, o laboratório próprio analisa e tenta recuperar a peça. Ela só volta para a sala de exame depois de testada, e a troca fica para quando o reparo não resolve.",
    points: ["Bobinas de ressonância", "Placas eletrônicas, módulos e fontes", "Periféricos, testados após o reparo"],
    href: "/servicos/reparo",
    linkLabel: "Ver reparo de peças",
    image: homeMedia.stages.laboratorio,
  },
];

export type ShowroomFilter = "todos" | "rm" | "tc" | "rx" | "contraste" | "software" | "veterinaria";

export const showroomFilters: { id: ShowroomFilter; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "rm", label: "Ressonância" },
  { id: "tc", label: "Tomografia" },
  { id: "rx", label: "Radiografia" },
  { id: "contraste", label: "Contraste" },
  { id: "software", label: "Software" },
  { id: "veterinaria", label: "Veterinária" },
];

export type ShowroomItem = {
  id: string;
  name: string;
  line: string;
  filters: Exclude<ShowroomFilter, "todos">[];
  image: MediaImage;
  /** Área e consumo informados pela Esaote (src/data/editorial.ts; Magnifico Open em src/data/solutions.ts). */
  spec?: string;
  href: string;
  external?: boolean;
  /** Foto de cena (não recorte): ocupa o ladrilho inteiro em vez de ficar sobre a base branca. */
  fill?: boolean;
};

const shot = (id: string, width: number, height: number, alt: string): MediaImage => ({
  src: `/media/home/showroom/${id}.webp`,
  width,
  height,
  alt,
});

export const showroom: ShowroomItem[] = [
  {
    id: "magnifico-open",
    name: "Magnifico Open",
    line: "Ressonância aberta de corpo inteiro",
    spec: "20 m² · menos de 3 kW",
    filters: ["rm"],
    image: shot("magnifico-open", 600, 493, "Ressonância magnética Esaote Magnifico Open"),
    href: "https://www.hexamedical.com.br/rm-esaote-magnifico-open/",
    external: true,
  },
  {
    id: "s-scan-open",
    name: "S-scan Open",
    line: "Ressonância musculoesquelética, das extremidades à coluna",
    spec: "20 m² · 2 kW em aquisição",
    filters: ["rm"],
    image: shot("s-scan-open", 960, 675, "Ressonância magnética Esaote S-scan Open"),
    href: "/solucoes/s-scan-open",
  },
  {
    id: "o-scan-smart",
    name: "O-scan SMART",
    line: "Ressonância dedicada a membros superiores e inferiores",
    spec: "9 m² · menos de 1 kW",
    filters: ["rm"],
    image: shot("o-scan-smart", 880, 932, "Ressonância magnética Esaote O-scan SMART"),
    href: "/solucoes/o-scan-smart",
  },
  {
    id: "g-scan-open",
    name: "G-scan Open",
    line: "Ressonância inclinável, para exames com e sem carga",
    spec: "23 m² · menos de 3 kW",
    filters: ["rm"],
    image: shot("g-scan-open", 960, 748, "Ressonância magnética Esaote G-scan Open"),
    href: "/solucoes/g-scan",
  },
  {
    id: "vet-mr-grande",
    name: "Vet-MR Grande",
    line: "Ressonância dedicada à medicina veterinária",
    filters: ["rm", "veterinaria"],
    image: shot("vet-mr-grande", 960, 641, "Ressonância veterinária Esaote Vet-MR Grande com um tigre posicionado"),
    href: "/solucoes/vet-mr-grande",
    fill: true,
  },
  {
    id: "ispace-1-5t-vet",
    name: "i_Space 1.5T-VET",
    line: "Ressonância veterinária supercondutora",
    filters: ["rm", "veterinaria"],
    image: shot("ispace-1-5t-vet", 960, 842, "Renderização oficial da ressonância veterinária WDM i_Space 1.5T-VET"),
    href: "/solucoes/ispace-1-5t-vet",
  },
  {
    id: "turbotom-1s-vet",
    name: "TurboTom 1S-VET",
    line: "Tomografia veterinária",
    filters: ["tc", "veterinaria"],
    image: shot("turbotom-1s-vet", 960, 461, "Renderização oficial do tomógrafo veterinário WDM TurboTom 1S-VET"),
    href: "/solucoes/turbotom-1s-vet",
  },
  {
    id: "turbotom-1s-lite-vet",
    name: "TurboTom 1S LITE VET",
    line: "Tomografia veterinária, versão LITE",
    filters: ["tc", "veterinaria"],
    image: shot("turbotom-1s-lite-vet", 960, 635, "Renderização oficial do tomógrafo veterinário WDM TurboTom 1S LITE VET"),
    href: "/solucoes/turbotom-1s-lite-vet",
  },
  {
    id: "accutron-mr",
    name: "Accutron MR",
    line: "Bomba injetora de contraste para ressonância",
    filters: ["contraste"],
    image: shot("accutron-mr", 202, 561, "Bomba injetora Accutron MR"),
    href: "/solucoes/bombas-injetoras",
  },
  {
    id: "digieye-350",
    name: "DigiEye 350",
    line: "Radiografia digital fixa Mindray",
    filters: ["rx"],
    image: shot("digieye-350", 960, 684, "Sistema de radiografia digital Mindray DigiEye 350"),
    href: "/solucoes/radiografia-digital",
  },
  {
    id: "hexai",
    name: "HexAI",
    line: "Inteligência artificial para o fluxo de imagem",
    filters: ["software"],
    image: shot("hexai", 400, 400, "HexAI: corte axial de coluna lombar em varredura acelerada com SwiftMR"),
    href: "/solucoes/hexai",
    fill: true,
  },
];

export const WHATSAPP_NUMBER = "5511973140914";

export function whatsappHref(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export type TriagePath = {
  id: "comprar" | "manter" | "reparar";
  /** A etapa da vida do equipamento que este caminho responde (marcada no anel). */
  stage: StageId;
  title: string;
  body: string;
  whatsappText: string;
  /** Página para quem prefere ler antes de falar. */
  href: string;
  linkLabel: string;
};

export const triage: TriagePath[] = [
  {
    id: "comprar",
    stage: "escolha",
    title: "Quero um equipamento",
    body: "Conte quais exames você quer fazer e quanto espaço tem. A conversa começa pelo projeto da sala.",
    whatsappText: "Olá! Quero conversar sobre a compra de um equipamento de diagnóstico por imagem.",
    href: "/solucoes",
    linkLabel: "Ver soluções",
  },
  {
    id: "manter",
    stage: "manutencao",
    title: "Preciso de manutenção",
    body: "Preventiva, corretiva ou contrato, para ressonância, tomografia e hemodinâmica de diversos fabricantes, em todo o país.",
    whatsappText: "Olá! Preciso de manutenção para um equipamento de diagnóstico por imagem.",
    href: "/servicos/manutencao",
    linkLabel: "Ver manutenção",
  },
  {
    id: "reparar",
    stage: "laboratorio",
    title: "Tenho uma peça para reparo",
    body: "Mande a bobina, placa, fonte ou periférico para o nosso laboratório. Avaliamos e tentamos o reparo antes de falar em troca.",
    whatsappText: "Olá! Tenho uma peça ou placa para avaliação e reparo.",
    href: "/servicos/reparo",
    linkLabel: "Ver reparo de peças",
  },
];
