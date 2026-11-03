export type WdmProduct = {
  slug: string;
  name: string;
  shortName: string;
  modality: "Tomografia computadorizada" | "Ressonância magnética";
  headline: string;
  introduction: string;
  hero: string;
  detail: string;
  heroAlt: string;
  detailAlt: string;
  facts: { value: string; label: string }[];
  applications: string[];
  sourceDocument: string;
  sourcePages: string;
  productionUrl: string;
};

const baseUrl = "https://www.hexamedical.com.br/solucoes";

export const wdmProducts: WdmProduct[] = [
  {
    slug: "turbotom-1s-vet",
    name: "TurboTom 1S-VET",
    shortName: "TurboTom 1S",
    modality: "Tomografia computadorizada",
    headline: "Tomografia veterinária para uma rotina de imagem exigente.",
    introduction: "Um sistema de TC veterinária com aquisição rápida e recursos de reconstrução descritos pela WDM. O projeto parte do perfil de exames, do espaço e da equipe que vai operar a solução.",
    hero: "/assets/wdm/turbotom-1s-vet-hero-clean.webp",
    detail: "/assets/wdm/turbotom-1s-vet-detail-1.webp",
    heroAlt: "Renderização oficial do tomógrafo veterinário WDM TurboTom 1S-VET",
    detailAlt: "Ilustração WDM do TurboTom 1S-VET com um cão sobre a mesa de exames",
    facts: [
      { value: "4 MHU", label: "capacidade térmica do tubo indicada no folder" },
      { value: "0,5 s", label: "rotação de 360° indicada no folder" },
      { value: "0,5 mm", label: "espessura de corte indicada no folder" },
    ],
    applications: ["Tomografia veterinária", "Planejamento de protocolos", "Reconstrução e análise de imagens"],
    sourceDocument: "Turbotom 1S-VET Brochure.pdf",
    sourcePages: "2-3",
    productionUrl: `${baseUrl}/turbotom-1s-vet/`,
  },
  {
    slug: "turbotom-1s-lite-vet",
    name: "TurboTom 1S LITE VET",
    shortName: "TurboTom 1S Lite",
    modality: "Tomografia computadorizada",
    headline: "Uma conversa de tomografia que começa pela sua operação.",
    introduction: "A linha LITE-VET foi apresentada pela WDM para exames de animais. Sua configuração técnica é definida conforme a aplicação clínica e a proposta comercial; por isso, a escolha começa pela rotina do serviço.",
    hero: "/assets/wdm/turbotom-1s-lite-vet-hero.webp",
    detail: "/assets/wdm/turbotom-1s-lite-vet-detail-2.webp",
    heroAlt: "Renderização oficial do tomógrafo veterinário WDM TurboTom 1S LITE VET",
    detailAlt: "Ilustração WDM do TurboTom 1S LITE VET com animais sobre a mesa de exames",
    facts: [
      { value: "TC", label: "modalidade veterinária" },
      { value: "Sob consulta", label: "configuração técnica por projeto" },
      { value: "WDM", label: "fabricante do sistema" },
    ],
    applications: ["Perfil de exames", "Fluxo de pacientes", "Configuração sob consulta"],
    sourceDocument: "Brochure TurboTom 1S LITE VET.pdf",
    sourcePages: "2-3",
    productionUrl: `${baseUrl}/turbotom-1s-lite-vet/`,
  },
  {
    slug: "ispace-1-5t-vet",
    name: "i_Space 1.5T-VET",
    shortName: "i_Space 1.5T",
    modality: "Ressonância magnética",
    headline: "Ressonância supercondutora para investigar com profundidade.",
    introduction: "Sistema de RM veterinária de 1,5 T apresentado pela WDM para estudos cranianos, abdominais e musculoesqueléticos. A implantação e os protocolos são planejados de acordo com o serviço.",
    hero: "/assets/wdm/ispace-1-5t-vet-hero.webp",
    detail: "/assets/wdm/ispace-1-5t-vet-detail-2.webp",
    heroAlt: "Renderização oficial da ressonância veterinária WDM i_Space 1.5T-VET",
    detailAlt: "Vista em perspectiva do sistema de ressonância veterinária WDM i_Space 1.5T-VET",
    facts: [
      { value: "1,5 T", label: "campo magnético informado pela WDM" },
      { value: "16 canais", label: "arquitetura indicada no folder" },
      { value: "3 frentes", label: "crânio, abdômen e musculoesquelético" },
    ],
    applications: ["Estudos cranianos", "Estudos abdominais", "Estudos musculoesqueléticos"],
    sourceDocument: "ispace-1-5t-vet-final.pdf",
    sourcePages: "2-9",
    productionUrl: `${baseUrl}/ispace-1-5t-vet/`,
  },
];

export const wdmBySlug = Object.fromEntries(wdmProducts.map((product) => [product.slug, product])) as Record<string, WdmProduct>;
