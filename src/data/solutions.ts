import { Magnet, Syringe, Brain, PawPrint } from "lucide-react";

export interface Solution {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: typeof Magnet;
  heroHeadline: string;
  heroSubtitle: string;
  audience: string[];
  problems: string[];
  steps: { title: string; description: string }[];
  differentials: string[];
  specs: { label: string; value: string }[];
  faq: { question: string; answer: string }[];
}

export const solutionCategories = [
  {
    slug: "ressonancia-magnetica",
    title: "Ressonância Magnética",
    description: "Equipamentos Esaote de alta performance com suporte técnico completo e cobertura nacional.",
    icon: Magnet,
    products: ["rm-magnifico-open", "rm-s-scan", "rm-o-scan", "rm-g-scan"],
  },
  {
    slug: "bombas-injetoras",
    title: "Bombas Injetoras",
    description: "Soluções em bombas injetoras de contraste com manutenção e suporte especializados.",
    icon: Syringe,
  },
  {
    slug: "hexai",
    title: "HexAI",
    description: "Inteligência artificial aplicada ao diagnóstico por imagem para maior precisão e produtividade.",
    icon: Brain,
  },
  {
    slug: "veterinario",
    title: "Área Veterinária",
    description: "Equipamentos de ressonância magnética dedicados ao diagnóstico veterinário de alta qualidade.",
    icon: PawPrint,
  },
];

export const solutions: Record<string, Solution> = {
  "rm-magnifico-open": {
    slug: "rm-magnifico-open",
    title: "RM Esaote Magnifico Open",
    shortTitle: "Magnifico Open",
    description: "Sistema de ressonância magnética aberta de alto campo com tecnologia de ponta para exames de corpo inteiro.",
    icon: Magnet,
    heroHeadline: "Magnifico Open: Ressonância Magnética Aberta de Alto Desempenho",
    heroSubtitle: "Tecnologia Esaote de última geração com campo aberto, conforto ao paciente e qualidade diagnóstica excepcional.",
    audience: [
      "Clínicas de diagnóstico por imagem",
      "Hospitais de médio e grande porte",
      "Centros de referência em ortopedia e neurologia",
    ],
    problems: [
      "Pacientes claustrofóbicos que recusam exames em sistemas fechados",
      "Necessidade de exames de alto campo com conforto ao paciente",
      "Equipamentos antigos com alto custo de manutenção e baixa qualidade de imagem",
      "Dificuldade em atender pacientes obesos ou com mobilidade reduzida",
    ],
    steps: [
      { title: "Avaliação Técnica", description: "Análise da infraestrutura e necessidades da sua operação." },
      { title: "Proposta Personalizada", description: "Configuração ideal do equipamento para seu perfil de demanda." },
      { title: "Instalação Completa", description: "Instalação, comissionamento e treinamento da equipe técnica." },
      { title: "Suporte Contínuo", description: "Manutenção preventiva, corretiva e suporte remoto permanente." },
    ],
    differentials: [
      "Campo aberto 0.5T com qualidade de imagem superior",
      "Conforto incomparável para pacientes claustrofóbicos",
      "Suporte técnico nacional com peças originais",
      "Baixo custo operacional comparado a sistemas de alto campo fechados",
      "Software avançado com protocolos otimizados",
      "Treinamento completo para equipe técnica e médica",
    ],
    specs: [
      { label: "Campo Magnético", value: "0.5T permanente" },
      { label: "Abertura", value: "Sistema aberto em U" },
      { label: "Bobinas", value: "Bobinas dedicadas de alta performance" },
      { label: "Software", value: "Plataforma Esaote eXP" },
      { label: "Aplicações", value: "Corpo inteiro, MSK, neuro, abdome" },
      { label: "Peso do Magneto", value: "~7.000 kg" },
    ],
    faq: [
      {
        question: "Qual a qualidade de imagem do Magnifico Open comparado a sistemas fechados?",
        answer: "O Magnifico Open oferece qualidade de imagem excepcional para um sistema aberto, com tecnologia Esaote de última geração que permite exames diagnósticos de alta precisão em todas as regiões anatômicas.",
      },
      {
        question: "Qual o custo de manutenção do equipamento?",
        answer: "O custo operacional é significativamente menor que sistemas supercondutores, pois não requer hélio líquido. Oferecemos contratos de manutenção flexíveis adaptados à sua realidade operacional.",
      },
      {
        question: "A Hexamedical oferece treinamento?",
        answer: "Sim, oferecemos treinamento completo para técnicos em radiologia e equipe médica, incluindo protocolos de exame, otimização de sequências e boas práticas operacionais.",
      },
      {
        question: "Qual o prazo de instalação?",
        answer: "O prazo médio de instalação é de 4 a 6 semanas após a aprovação do projeto, incluindo preparação da sala, instalação do equipamento e comissionamento.",
      },
    ],
  },
  "rm-s-scan": {
    slug: "rm-s-scan",
    title: "RM Esaote S-Scan",
    shortTitle: "S-Scan",
    description: "Sistema compacto de ressonância magnética dedicado, ideal para clínicas de ortopedia e medicina esportiva.",
    icon: Magnet,
    heroHeadline: "S-Scan: RM Dedicada para Extremidades",
    heroSubtitle: "Sistema compacto, acessível e de alta qualidade para exames musculoesqueléticos.",
    audience: ["Clínicas de ortopedia", "Centros de medicina esportiva", "Consultórios especializados"],
    problems: [
      "Alto investimento em sistemas de corpo inteiro quando a demanda é focada em extremidades",
      "Espaço limitado para instalação de equipamentos de grande porte",
      "Necessidade de exames rápidos e de qualidade para diagnóstico MSK",
    ],
    steps: [
      { title: "Consultoria", description: "Análise do perfil de exames e volume de demanda." },
      { title: "Dimensionamento", description: "Proposta com configuração ideal para seu espaço e necessidade." },
      { title: "Instalação Rápida", description: "Instalação simplificada sem necessidade de blindagem especial." },
      { title: "Operação Assistida", description: "Treinamento e suporte para início imediato da operação." },
    ],
    differentials: [
      "Instalação simplificada sem sala blindada",
      "Footprint compacto ideal para espaços reduzidos",
      "Qualidade de imagem MSK excepcional",
      "Custo operacional extremamente baixo",
    ],
    specs: [
      { label: "Campo Magnético", value: "0.25T permanente" },
      { label: "Aplicação", value: "Extremidades (mão, punho, cotovelo, pé, tornozelo, joelho)" },
      { label: "Blindagem", value: "Não requer sala blindada" },
      { label: "Peso", value: "~750 kg" },
    ],
    faq: [
      {
        question: "Preciso de sala blindada para o S-Scan?",
        answer: "Não. O S-Scan possui auto-blindagem, dispensando investimentos em sala especial.",
      },
      {
        question: "Quais exames posso realizar?",
        answer: "Exames de extremidades: mão, punho, cotovelo, pé, tornozelo e joelho com alta qualidade diagnóstica.",
      },
    ],
  },
};
