export interface CatalogItem {
  slug: string;
  name: string;
  category: "Ressonância Magnética" | "Bombas Injetoras" | "Veterinário" | "Tecnologia";
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
    slug: "accutron-mr",
    name: "Accutron MR",
    category: "Bombas Injetoras",
    description: "Bomba injetora para ressonância magnética com controle preciso de contraste.",
    image: "/assets/hexa/Hexamedical-Website-17-1024x576.webp",
  },
  {
    slug: "accutron-ct-d",
    name: "Accutron CT-D",
    category: "Bombas Injetoras",
    description: "Bomba injetora para tomografia com foco em segurança e eficiência operacional.",
    image: "/assets/hexa/Hexamedical-Website-18-1024x576.webp",
  },
  {
    slug: "accutron-ct-d-vision",
    name: "Accutron CT-D Vision",
    category: "Bombas Injetoras",
    description: "Plataforma avançada para protocolos de contraste em ambientes de alta demanda.",
    image: "/assets/hexa/Hexamedical-Website-19-1024x576.webp",
  },
  {
    slug: "magnifico-vet",
    name: "Magnifico Vet",
    category: "Veterinário",
    description: "RM veterinária para pequenos e médios animais com excelente resolução.",
    image: "/assets/hexa/magnifico-vet.webp",
  },
  {
    slug: "vet-mr-grande",
    name: "Vet-MR Grande",
    category: "Veterinário",
    description: "Solução de RM para animais de maior porte com robustez e precisão.",
    image: "/assets/hexa/Esaote-Grande-VET-MR.png",
  },
  {
    slug: "o-scan-equine",
    name: "O-Scan Equine",
    category: "Veterinário",
    description: "RM dedicada para extremidades equinas com fluxo eficiente de diagnóstico.",
    image: "/assets/hexa/Hexamedical-Ressonancia-Vet-2.webp",
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
