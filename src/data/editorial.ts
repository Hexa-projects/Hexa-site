export type EditorialFact = { value: string; label: string };

export type ProductStory = {
  slug: string;
  name: string;
  category: string;
  headline: string;
  introduction: string;
  hero: string;
  heroAlt: string;
  image: string;
  imageAlt: string;
  facts: EditorialFact[];
  thesis: string;
  explanation: string;
  applications: string[];
  details: { title: string; body: string }[];
  sourceLabel: string;
  sourceUrl: string;
};

export const rmStories: Record<string, ProductStory> = {
  "rm-s-scan": {
    slug: "rm-s-scan",
    name: "S-scan Open",
    category: "Ressonância magnética musculoesquelética",
    headline: "Acesso aberto. Atenção total ao sistema musculoesquelético.",
    introduction: "O S-scan Open combina arquitetura aberta, mesa giratória e bobinas dedicadas para exames musculoesqueléticos, das extremidades à coluna.",
    hero: "/assets/esaote/s-scan-open.webp",
    heroAlt: "Sistema de ressonância magnética Esaote S-scan Open",
    image: "/assets/esaote/s-scan-open-detail.webp",
    imageAlt: "Posicionamento de paciente no sistema S-scan Open",
    facts: [
      { value: "20 m²", label: "instalação compacta" },
      { value: "2 kW", label: "consumo médio em aquisição" },
      { value: "14", label: "bobinas multifuncionais" },
    ],
    thesis: "O posicionamento faz parte da qualidade do exame.",
    explanation: "A abertura ampla e a mesa giratória e assimétrica facilitam o acesso ao paciente e a preparação de exames MSK. O conjunto de bobinas permite adequar a aquisição à anatomia investigada.",
    applications: ["Coluna", "Joelho", "Ombro", "Punho e mão", "Tornozelo e pé", "Articulações temporomandibulares"],
    details: [
      { title: "Arquitetura aberta", body: "Acesso facilitado à região examinada e mais espaço para o posicionamento do paciente." },
      { title: "Foco em MSK", body: "Configuração voltada à rotina musculoesquelética, com bobinas dedicadas para diferentes anatomias." },
      { title: "Infraestrutura planejável", body: "A Esaote informa instalação a partir de 20 m² e consumo médio de 2 kW durante a aquisição; a configuração final depende do projeto." },
    ],
    sourceLabel: "Esaote — S-scan Open",
    sourceUrl: "https://www.esaote.com/en-US/magnetic-resonance/magnetic-resonance-system/s-scan-open/",
  },
  "rm-o-scan": {
    slug: "rm-o-scan",
    name: "O-scan SMART",
    category: "Ressonância magnética de extremidades",
    headline: "Exames de extremidades sem ocupar a sala inteira.",
    introduction: "O O-scan SMART é um sistema dedicado a membros superiores e inferiores, pensado para clínicas especializadas e departamentos de radiologia que precisam ampliar sua capacidade de exames MSK.",
    hero: "/assets/esaote/o-scan-smart.webp",
    heroAlt: "Sistema Esaote O-scan SMART para ressonância de extremidades",
    image: "/assets/esaote/o-scan-smart.webp",
    imageAlt: "O-scan SMART com assento para o exame de extremidades",
    facts: [
      { value: "9 m²", label: "área de instalação" },
      { value: "< 1 kW", label: "consumo informado pela Esaote" },
      { value: "0,31 T", label: "campo magnético" },
    ],
    thesis: "Uma unidade dedicada pode reorganizar o fluxo de RM.",
    explanation: "Ao direcionar exames de extremidades para um sistema próprio, o serviço pode reservar os equipamentos multipropósito para outras indicações. O assento e a arquitetura não claustrofóbica também mudam a experiência do paciente.",
    applications: ["Joelho", "Punho e mão", "Tornozelo e pé", "Ortopedia", "Medicina esportiva", "Reumatologia"],
    details: [
      { title: "Dedicado a extremidades", body: "Bobinas específicas para joelho, mão/punho e pé/tornozelo." },
      { title: "Ambiente compacto", body: "A Esaote informa instalação em 9 m² e baixo consumo de energia." },
      { title: "Conforto no exame", body: "O paciente permanece em um ambiente mais aberto, com assento próprio para o posicionamento." },
    ],
    sourceLabel: "Esaote — O-scan SMART",
    sourceUrl: "https://www.esaote.com/en-US/magnetic-resonance/magnetic-resonance-system/o-scan-smart/",
  },
  "rm-g-scan": {
    slug: "rm-g-scan",
    name: "G-scan Open",
    category: "Ressonância magnética com carga",
    headline: "Uma perspectiva que muda com a posição do paciente.",
    introduction: "O G-scan Open é um sistema aberto e inclinável para aplicações musculoesqueléticas. Ele permite investigar a anatomia também em posição com carga, quando a postura pode influenciar a apresentação dos sintomas.",
    hero: "/assets/esaote/g-scan-open.webp",
    heroAlt: "Sistema Esaote G-scan Open com mesa inclinável",
    image: "/assets/esaote/g-scan-open-detail.webp",
    imageAlt: "Paciente em pé durante exame com carga no G-scan Open",
    facts: [
      { value: "23 m²", label: "área de instalação" },
      { value: "12", label: "bobinas dedicadas" },
      { value: "< 3 kW", label: "consumo informado pela Esaote" },
    ],
    thesis: "Deitado e com carga não são a mesma condição.",
    explanation: "A arquitetura inclinável permite incorporar a posição do paciente à investigação MSK. Exames em condições diferentes podem oferecer perspectivas complementares, de acordo com a indicação e o protocolo clínico.",
    applications: ["Coluna", "Joelho", "Articulações", "Imagem com carga", "Imagem dinâmica", "Investigação musculoesquelética"],
    details: [
      { title: "Sistema inclinável", body: "A aquisição pode ser planejada em posição sem carga e com carga, conforme a indicação clínica." },
      { title: "Bobinas para MSK", body: "Conjunto dedicado a coluna e articulações, de acordo com a configuração do equipamento." },
      { title: "Planejamento de instalação", body: "A Esaote informa instalação mínima de 23 m² para o G-scan Open; o projeto final depende da configuração." },
    ],
    sourceLabel: "Esaote — G-scan Open",
    sourceUrl: "https://www.esaote.com/en-US/magnetic-resonance/magnetic-resonance-system/g-scan-open/",
  },
};

export const commercialLines = [
  {
    slug: "bombas-injetoras",
    name: "Bombas injetoras",
    headline: "Administração de contraste alinhada a cada modalidade.",
    introduction: "A linha reúne sistemas para ressonância magnética, tomografia e hemodinâmica. A escolha do modelo depende do fluxo, da sala e do protocolo de cada serviço.",
    image: "/assets/esaote/bombas-accutron-mr-compact.png",
    alt: "Linha de bombas injetoras apresentada pela Hexamedical",
    groups: [
      { title: "Ressonância magnética", models: ["Accutron MR Compact", "Accutron MR3", "Accutron MR", "MRI 880"] },
      { title: "Tomografia", models: ["Accutron CT-D Vision", "Accutron CT", "Accutron CT-D", "CT 871"] },
      { title: "Hemodinâmica", models: ["HP 832"] },
    ],
    source: "https://www.hexamedical.com.br/bombas-injetoras/",
  },
  {
    slug: "mindray",
    name: "Radiografia digital Mindray",
    headline: "Da sala de radiologia ao leito do paciente.",
    introduction: "Sistemas fixos, móveis e detectores flat panel compõem a linha de radiografia digital Mindray apresentada pela Hexamedical.",
    image: "/assets/esaote/mindray-digieye-350.png",
    alt: "Equipamento da linha de radiografia digital Mindray",
    groups: [
      { title: "Sistema fixo", models: ["DigiEye 350", "DigiEye 330"] },
      { title: "Sistema móvel", models: ["MobiEye 700"] },
      { title: "Detector", models: ["Detector Flat Panel"] },
    ],
    source: "https://www.hexamedical.com.br/mindray/",
  },
];

export const serviceStories = {
  manutencao: {
    title: "Manutenção de equipamentos",
    headline: "A operação continua depois da entrega.",
    intro: "Manutenção preventiva e corretiva de equipamentos de diagnóstico por imagem, incluindo ressonância magnética, tomografia computadorizada e hemodinâmica de diferentes fabricantes.",
    image: "/assets/hexa/Desinstalacao-e-Instalacao.webp",
    work: ["Manutenção preventiva", "Manutenção corretiva", "Diagnóstico técnico"],
    source: "https://www.hexamedical.com.br/manutencao-de-equipamentos/",
  },
  contratos: {
    title: "Contratos de manutenção",
    headline: "Um plano de suporte para o equipamento que você opera.",
    intro: "Contratos personalizados, com ou sem peças, que podem contemplar manutenção preventiva e corretiva e suporte ao longo da vigência contratual.",
    image: "/assets/hexa/Contrato-de-manutencoes-foto.webp",
    work: ["Escopo por equipamento", "Preventiva e corretiva", "Opção com ou sem peças"],
    source: "https://www.hexamedical.com.br/contratos-de-manutencao/",
  },
  instalacao: {
    title: "Desinstalação e instalação",
    headline: "Cada mudança de equipamento pede um plano técnico.",
    intro: "A Hexamedical atua em instalação, desinstalação e atendimentos avulsos relacionados à operação de equipamentos médicos.",
    image: "/assets/hexa/Desinstalacao-e-Instalacao.webp",
    work: ["Avaliação da necessidade", "Desinstalação", "Instalação"],
    source: "https://www.hexamedical.com.br/desinstalacao-e-instalacao-de-equipamentos/",
  },
  reparo: {
    title: "Reparo de peças e periféricos",
    headline: "Antes de substituir, investigar.",
    intro: "No laboratório especializado, a equipe analisa, recupera e testa bobinas de RM, placas eletrônicas, módulos, fontes de alimentação e outros periféricos.",
    image: "/assets/hexa/Reparo-de-Pecas-e-Eletronicas-foto.webp",
    work: ["Análise do componente", "Reparo especializado", "Teste pós-reparo"],
    source: "https://www.hexamedical.com.br/reparo-de-pecas-e-perifericos/",
  },
} as const;
