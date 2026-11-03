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
    description: "Sistema aberto de ressonância magnética para exames de corpo inteiro.",
    image: "/assets/hexa/magnifico-open.jpg",
    href: "https://www.hexamedical.com.br/rm-esaote-magnifico-open/",
  },
  {
    slug: "rm-s-scan",
    name: "RM Esaote S-scan Open",
    category: "Ressonância Magnética",
    description: "RM musculoesquelética compacta, ideal para ortopedia e medicina esportiva.",
    image: "/assets/esaote/s-scan-open.webp",
    href: "/solucoes/rm-s-scan",
  },
  {
    slug: "rm-o-scan",
    name: "RM Esaote O-scan SMART",
    category: "Ressonância Magnética",
    description: "Sistema dedicado a extremidades com instalação compacta e baixo consumo.",
    image: "/assets/esaote/o-scan-smart.webp",
    href: "/solucoes/rm-o-scan",
  },
  {
    slug: "rm-g-scan",
    name: "RM Esaote G-scan Open",
    category: "Ressonância Magnética",
    description: "RM aberta inclinável para avaliação musculoesquelética também com carga.",
    image: "/assets/esaote/g-scan-open.webp",
    href: "/solucoes/rm-g-scan",
  },
  {
    slug: "hexai",
    name: "HexAI",
    category: "Tecnologia",
    description: "Solução de inteligência artificial para apoiar o fluxo de imagem diagnóstica.",
    image: "/assets/hexa/varredura-hexai-1024x576.webp",
    href: "/solucoes/hexai",
  },
];
