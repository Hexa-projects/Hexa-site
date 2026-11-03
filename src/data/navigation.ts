export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  {
    label: "Soluções",
    href: "/solucoes",
    children: [
      { label: "Ressonância Magnética", href: "/solucoes/ressonancia-magnetica" },
      { label: "Bombas Injetoras", href: "/solucoes/bombas-injetoras" },
      { label: "Radiografia Mindray", href: "/solucoes/mindray" },
      { label: "HexAI", href: "/solucoes/hexai" },
      { label: "Área Veterinária", href: "/solucoes/veterinario" },
    ],
  },
  {
    label: "Serviços",
    href: "/servicos",
    children: [
      { label: "Manutenção de Equipamentos", href: "/servicos/manutencao" },
      { label: "Contratos de Manutenção", href: "/servicos/contratos" },
      { label: "Instalação e Desinstalação", href: "/servicos/instalacao" },
      { label: "Reparo de Peças e Periféricos", href: "/servicos/reparo" },
    ],
  },
  {
    label: "Conteúdo",
    href: "/conteudo",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "Materiais de Apoio", href: "/materiais" },
    ],
  },
  {
    label: "Empresa",
    href: "/empresa",
    children: [
      { label: "Estrutura", href: "/estrutura" },
      { label: "Sobre a Hexamedical", href: "/sobre" },
      { label: "Contato", href: "/contato" },
    ],
  },
];
