export interface CatalogItem {
  slug: string;
  name: string;
  category: "Ressonância Magnética" | "Tecnologia";
  description: string;
  image: string;
  href?: string;
}

export const productCatalog: CatalogItem[] = [
  {
    slug: "rm-magnifico-open",
    name: "RM Esaote Magnifico Open",
    category: "Ressonância Magnética",
    description: "Sistema aberto 0.4T com tecnologia True-Motion e alta qualidade de imagem.",
    image: "/assets/hexa/magnifico-open.jpg",
    href: "/solucoes/rm-magnifico-open",
  },
  {
    slug: "rm-s-scan",
    name: "RM Esaote S-Scan",
    category: "Ressonância Magnética",
    description: "RM musculoesquelética compacta, ideal para ortopedia e medicina esportiva.",
    image: "/assets/hexa/csm_esaote-s-scan-hero_46ed91e4e2.webp",
    href: "/solucoes/rm-s-scan",
  },
  {
    slug: "rm-o-scan",
    name: "RM Esaote O-Scan",
    category: "Ressonância Magnética",
    description: "Sistema dedicado a extremidades com instalação compacta e baixo consumo.",
    image: "/assets/hexa/oscan.webp",
    href: "/solucoes/rm-o-scan",
  },
  {
    slug: "rm-g-scan",
    name: "RM Esaote G-Scan Brio",
    category: "Ressonância Magnética",
    description: "RM com suporte de peso para maior assertividade em diagnósticos MSK.",
    image: "/assets/hexa/csm_esaote-g-scan-brio_7563a8df6a.webp",
    href: "/solucoes/rm-g-scan",
  },
  {
    slug: "hexai",
    name: "HexAI",
    category: "Tecnologia",
    description: "IA aplicada ao diagnóstico por imagem para aumento de produtividade e precisão.",
    image: "/assets/hexa/varredura-hexai-1024x576.webp",
    href: "/solucoes/hexai",
  },
];
