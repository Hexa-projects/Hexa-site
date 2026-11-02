import { homeMedia, type MediaImage, type StageId } from "./homeMedia";

/**
 * Conteúdo da home. Os textos resumem o que já está publicado em
 * src/data/services.ts, src/data/editorial.ts e no site oficial; nenhum número novo.
 */

export type LifecycleStage = { id: StageId; title: string; body: string; href: string; linkLabel: string; image: MediaImage };

export const lifecycle: LifecycleStage[] = [
  {
    id: "escolha",
    title: "Escolha",
    body: "Consultoria técnica para indicar o sistema adequado ao perfil de exames, ao volume e à estrutura do serviço.",
    href: "/solucoes",
    linkLabel: "Ver soluções",
    image: homeMedia.stages.escolha,
  },
  {
    id: "projeto",
    title: "Projeto da sala",
    body: "Leitura da infraestrutura: área, energia e requisitos de instalação de cada sistema, conforme o fabricante.",
    href: "/solucoes/ressonancia-magnetica",
    linkLabel: "Comparar a linha de RM",
    image: homeMedia.stages.projeto,
  },
  {
    id: "instalacao",
    title: "Instalação",
    body: "Desinstalação, transporte e instalação com um plano técnico para cada mudança de equipamento.",
    href: "/servicos/instalacao",
    linkLabel: "Conhecer a instalação",
    image: homeMedia.stages.instalacao,
  },
  {
    id: "operacao",
    title: "Operação",
    body: "Treinamento da equipe e o HexAI, que usa inteligência artificial para apoiar o fluxo de imagem diagnóstica.",
    href: "/solucoes/hexai",
    linkLabel: "Conhecer o HexAI",
    image: homeMedia.stages.operacao,
  },
  {
    id: "manutencao",
    title: "Manutenção",
    body: "Preventiva, corretiva e contratos sob medida para RM, TC e hemodinâmica de diversos fabricantes.",
    href: "/servicos/manutencao",
    linkLabel: "Ver manutenção",
    image: homeMedia.stages.manutencao,
  },
  {
    id: "laboratorio",
    title: "Laboratório",
    body: "Antes de substituir, investigar: reparo de placas, peças e periféricos na bancada técnica.",
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
  href: string;
  external?: boolean;
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
    filters: ["rm"],
    image: shot("magnifico-open", 600, 500, "Ressonância magnética Esaote Magnifico Open"),
    href: "https://www.hexamedical.com.br/rm-esaote-magnifico-open/",
    external: true,
  },
  {
    id: "s-scan-open",
    name: "S-scan Open",
    line: "Ressonância musculoesquelética",
    filters: ["rm"],
    image: shot("s-scan-open", 960, 752, "Ressonância magnética Esaote S-scan Open"),
    href: "/solucoes/rm-s-scan",
  },
  {
    id: "o-scan-smart",
    name: "O-scan SMART",
    line: "Ressonância de extremidades",
    filters: ["rm"],
    image: shot("o-scan-smart", 960, 752, "Ressonância magnética Esaote O-scan SMART"),
    href: "/solucoes/rm-o-scan",
  },
  {
    id: "g-scan-open",
    name: "G-scan Open",
    line: "Ressonância inclinável, com e sem carga",
    filters: ["rm"],
    image: shot("g-scan-open", 960, 752, "Ressonância magnética Esaote G-scan Open"),
    href: "/solucoes/rm-g-scan",
  },
  {
    id: "vet-mr-grande",
    name: "Vet-MR Grande",
    line: "Ressonância dedicada à medicina veterinária",
    filters: ["rm", "veterinaria"],
    image: shot("vet-mr-grande", 960, 641, "Ressonância veterinária Esaote Vet-MR Grande com um tigre posicionado"),
    href: "/solucoes/vet-mr-grande",
  },
  {
    id: "ispace-1-5t-vet",
    name: "i_Space 1.5T-VET",
    line: "Ressonância veterinária supercondutora",
    filters: ["rm", "veterinaria"],
    image: shot("ispace-1-5t-vet", 960, 689, "Renderização oficial da ressonância veterinária WDM i_Space 1.5T-VET"),
    href: "/solucoes/ispace-1-5t-vet",
  },
  {
    id: "turbotom-1s-vet",
    name: "TurboTom 1S-VET",
    line: "Tomografia veterinária",
    filters: ["tc", "veterinaria"],
    image: shot("turbotom-1s-vet", 960, 502, "Renderização oficial do tomógrafo veterinário WDM TurboTom 1S-VET"),
    href: "/solucoes/turbotom-1s-vet",
  },
  {
    id: "turbotom-1s-lite-vet",
    name: "TurboTom 1S LITE VET",
    line: "Tomografia veterinária, versão LITE",
    filters: ["tc", "veterinaria"],
    image: shot("turbotom-1s-lite-vet", 960, 650, "Renderização oficial do tomógrafo veterinário WDM TurboTom 1S LITE VET"),
    href: "/solucoes/turbotom-1s-lite-vet",
  },
  {
    id: "accutron-mr",
    name: "Accutron MR",
    line: "Bomba injetora de contraste para ressonância",
    filters: ["contraste"],
    image: shot("accutron-mr", 960, 540, "Bomba injetora Accutron MR"),
    href: "/solucoes/bombas-injetoras",
  },
  {
    id: "digieye-350",
    name: "DigiEye 350",
    line: "Radiografia digital fixa Mindray",
    filters: ["rx"],
    image: shot("digieye-350", 960, 1200, "Sistema de radiografia digital Mindray DigiEye 350"),
    href: "/solucoes/mindray",
  },
  {
    id: "hexai",
    name: "HexAI",
    line: "Inteligência artificial para o fluxo de imagem",
    filters: ["software"],
    image: shot("hexai", 960, 540, "HexAI: comparação de cortes de coluna em varredura padrão, acelerada e acelerada com IA"),
    href: "/solucoes/hexai",
  },
];

export const WHATSAPP_NUMBER = "5511973140914";

export function whatsappHref(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export type TriagePath = {
  id: "comprar" | "manter" | "reparar";
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
    title: "Quero um equipamento",
    body: "Ressonância, tomografia veterinária, radiografia, bombas injetoras ou software. Conte o perfil de exames e o espaço disponível.",
    whatsappText: "Olá! Quero conversar sobre a compra de um equipamento de diagnóstico por imagem.",
    href: "/solucoes",
    linkLabel: "Ver soluções",
  },
  {
    id: "manter",
    title: "Preciso de manutenção",
    body: "Preventiva, corretiva ou contrato para equipamentos de RM, TC e hemodinâmica de diversos fabricantes.",
    whatsappText: "Olá! Preciso de manutenção para um equipamento de diagnóstico por imagem.",
    href: "/servicos/manutencao",
    linkLabel: "Ver manutenção",
  },
  {
    id: "reparar",
    title: "Tenho uma peça para reparo",
    body: "Placas, peças e periféricos avaliados no laboratório técnico antes de qualquer substituição.",
    whatsappText: "Olá! Tenho uma peça ou placa para avaliação e reparo.",
    href: "/servicos/reparo",
    linkLabel: "Ver reparo de peças",
  },
];
