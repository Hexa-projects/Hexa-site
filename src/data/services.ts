import { Wrench, FileText, Truck, Cog, ClipboardCheck } from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: typeof Wrench;
  heroHeadline: string;
  heroSubtitle: string;
  scope: string[];
  faq: { question: string; answer: string }[];
}

export const services: Service[] = [
  {
    slug: "manutencao",
    title: "Manutenção de Equipamentos",
    description: "Manutenção preventiva e corretiva para equipamentos de ressonância magnética com equipe especializada e peças originais.",
    icon: Wrench,
    heroHeadline: "Manutenção Técnica Especializada em RM",
    heroSubtitle: "Equipe certificada, peças originais e cobertura nacional para manter seu equipamento em máxima performance.",
    scope: [
      "Manutenção preventiva programada",
      "Manutenção corretiva emergencial",
      "Calibração e ajuste de equipamentos",
      "Atualização de software e firmware",
      "Relatórios técnicos detalhados",
    ],
    faq: [
      { question: "Qual o tempo de resposta para chamados emergenciais?", answer: "Nosso SLA padrão é de até 24 horas para atendimento presencial em todo o território nacional, com suporte remoto imediato." },
      { question: "Vocês utilizam peças originais?", answer: "Sim, trabalhamos exclusivamente com peças originais e homologadas pelo fabricante, garantindo a integridade e performance do equipamento." },
    ],
  },
  {
    slug: "contratos",
    title: "Contratos de Manutenção",
    description: "Contratos flexíveis de manutenção com SLA garantido, previsibilidade de custos e cobertura completa.",
    icon: FileText,
    heroHeadline: "Contratos de Manutenção Sob Medida",
    heroSubtitle: "Previsibilidade financeira, cobertura técnica completa e tranquilidade operacional para sua instituição.",
    scope: [
      "Planos preventivos e corretivos",
      "SLA com tempo de resposta garantido",
      "Cobertura de peças e componentes",
      "Relatórios periódicos de desempenho",
      "Suporte remoto ilimitado",
    ],
    faq: [
      { question: "Quais tipos de contrato estão disponíveis?", answer: "Oferecemos contratos básicos (preventiva), intermediários (preventiva + corretiva) e completos (all-inclusive com peças)." },
    ],
  },
  {
    slug: "instalacao",
    title: "Instalação e Desinstalação",
    description: "Serviço completo de instalação, desinstalação e remanejamento de equipamentos de RM com equipe especializada.",
    icon: Truck,
    heroHeadline: "Instalação Profissional de Equipamentos de RM",
    heroSubtitle: "Planejamento, logística e execução completa para instalação ou remanejamento do seu equipamento.",
    scope: [
      "Projeto técnico da sala de RM",
      "Logística e transporte especializado",
      "Instalação e comissionamento",
      "Testes de aceitação",
      "Desinstalação e remanejamento",
    ],
    faq: [
      { question: "Vocês fazem o projeto da sala de RM?", answer: "Sim, nossa equipe de engenharia elabora o projeto completo da sala, incluindo blindagem, climatização e infraestrutura elétrica." },
    ],
  },
  {
    slug: "reparo",
    title: "Reparo de Peças e Periféricos",
    description: "Reparo especializado de bobinas, componentes eletrônicos e periféricos com laboratório próprio.",
    icon: Cog,
    heroHeadline: "Reparo Especializado de Componentes de RM",
    heroSubtitle: "Laboratório próprio com expertise para restaurar peças e periféricos com qualidade e economia.",
    scope: [
      "Reparo de bobinas de RF",
      "Manutenção de gradientes",
      "Reparo de componentes eletrônicos",
      "Recondicionamento de periféricos",
      "Testes de qualidade pós-reparo",
    ],
    faq: [
      { question: "Qual a garantia do reparo?", answer: "Todos os reparos possuem garantia de 6 a 12 meses, dependendo do componente, com suporte técnico durante todo o período." },
    ],
  },
  {
    slug: "visita-tecnica",
    title: "Visita Técnica",
    description: "Avaliação técnica presencial para diagnóstico de problemas, consultoria e planejamento de manutenção.",
    icon: ClipboardCheck,
    heroHeadline: "Visita Técnica Especializada",
    heroSubtitle: "Diagnóstico presencial preciso para identificar problemas e oportunidades de melhoria no seu parque de equipamentos.",
    scope: [
      "Diagnóstico técnico presencial",
      "Relatório detalhado com recomendações",
      "Avaliação de performance do equipamento",
      "Consultoria para upgrade ou substituição",
      "Planejamento de manutenção preventiva",
    ],
    faq: [
      { question: "Quanto custa uma visita técnica?", answer: "O valor varia conforme a localização e escopo. Entre em contato para um orçamento personalizado." },
    ],
  },
];
