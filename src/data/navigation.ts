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
      { label: "HexAI", href: "/solucoes/hexai" },
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
      { label: "Visita Técnica", href: "/servicos/visita-tecnica" },
    ],
  },
  {
    label: "Segmentos",
    href: "/segmentos",
    children: [
      { label: "Clínicas", href: "/segmentos/clinicas" },
      { label: "Hospitais", href: "/segmentos/hospitais" },
      { label: "Centros de Imagem", href: "/segmentos/centros-de-imagem" },
      { label: "Universidades", href: "/segmentos/universidades" },
    ],
  },
  {
    label: "Conteúdo",
    href: "/conteudo",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "Materiais de Apoio", href: "/materiais" },
      { label: "Cases", href: "/cases" },
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
