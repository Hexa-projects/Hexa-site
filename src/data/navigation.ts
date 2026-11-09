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
      { label: "Ressonância magnética", href: "/solucoes/ressonancia-magnetica" },
      { label: "Magnifico Open", href: "/solucoes/magnifico-open" },
      { label: "Bombas injetoras", href: "/solucoes/bombas-injetoras" },
      { label: "Radiografia digital", href: "/solucoes/radiografia-digital" },
      { label: "Densitometria", href: "/solucoes/densitometria" },
      { label: "HexAI", href: "/solucoes/hexai" },
      { label: "Careverse", href: "/solucoes/careverse" },
      { label: "Veterinária", href: "/solucoes/veterinaria" },
    ],
  },
  {
    label: "Serviços",
    href: "/servicos",
    children: [
      { label: "Manutenção", href: "/servicos/manutencao" },
      { label: "Contratos de manutenção", href: "/servicos/contratos" },
      { label: "Instalação e desinstalação", href: "/servicos/instalacao" },
      { label: "Reparo e laboratório", href: "/servicos/reparo" },
    ],
  },
  {
    label: "Empresa",
    href: "/empresa",
    children: [
      { label: "A Hexamedical", href: "/empresa" },
      { label: "Materiais de apoio", href: "/materiais" },
      { label: "Blog", href: "/blog" },
      { label: "Ouvidoria", href: "/ouvidoria" },
      { label: "Contato", href: "/contato" },
    ],
  },
];
