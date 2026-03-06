import { Magnet, Syringe, Brain, PawPrint } from "lucide-react";

export interface SolutionHighlight {
  value: string;
  label: string;
  description: string;
}

export interface Bobina {
  name: string;
}

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
  highlights?: SolutionHighlight[];
  bobinas?: Bobina[];
  testimonial?: { quote: string; author: string };
  featureBlocks?: { title: string; subtitle: string; description: string }[];
  faq: { question: string; answer: string }[];
}

export const solutionCategories = [
  {
    slug: "ressonancia-magnetica",
    title: "Ressonância Magnética",
    description: "Equipamentos Esaote de alta performance: Magnifico Open, S-Scan, O-Scan e G-Scan Brio com suporte técnico completo.",
    icon: Magnet,
    products: ["rm-magnifico-open", "rm-s-scan", "rm-o-scan", "rm-g-scan"],
  },
  {
    slug: "bombas-injetoras",
    title: "Bombas Injetoras",
    description: "Soluções em bombas injetoras de contraste com manutenção e suporte especializados para centros de imagem.",
    icon: Syringe,
  },
  {
    slug: "hexai",
    title: "HexAI",
    description: "Inteligência artificial aplicada ao diagnóstico por imagem para maior precisão, produtividade e assertividade clínica.",
    icon: Brain,
  },
  {
    slug: "veterinario",
    title: "Área Veterinária",
    description: "Equipamentos Esaote dedicados ao diagnóstico veterinário: Magnífico Vet, Vet-MR Grande e O-Scan Equine.",
    icon: PawPrint,
  },
];

export const solutions: Record<string, Solution> = {
  "ressonancia-magnetica": {
    slug: "ressonancia-magnetica",
    title: "Linha de Ressonância Magnética Esaote",
    shortTitle: "Ressonância Magnética",
    description: "Portfólio completo de sistemas de RM Esaote para diferentes perfis operacionais.",
    icon: Magnet,
    heroHeadline: "Linha de Ressonância Magnética Esaote",
    heroSubtitle: "Soluções de RM para clínicas, hospitais e centros de imagem: Magnifico Open, S-Scan, O-Scan e G-Scan Brio.",
    audience: [
      "Clínicas de imagem em expansão",
      "Hospitais com demanda de alta disponibilidade",
      "Centros de ortopedia e medicina esportiva",
      "Operações que buscam previsibilidade técnica e financeira"
    ],
    problems: [
      "Dificuldade em escolher o sistema adequado para o perfil de exames",
      "Custo operacional elevado com equipamentos inadequados",
      "Baixa previsibilidade de manutenção e performance",
      "Necessidade de ganho de qualidade diagnóstica"
    ],
    steps: [
      { title: "Diagnóstico de Cenário", description: "Mapeamos aplicação clínica, volume e estrutura." },
      { title: "Seleção do Sistema", description: "Indicamos a configuração mais aderente ao seu contexto." },
      { title: "Implantação", description: "Projeto técnico, instalação e treinamento operacional." },
      { title: "Suporte Contínuo", description: "Acompanhamento técnico e manutenção para alta disponibilidade." }
    ],
    differentials: [
      "Portfólio completo Esaote para diferentes necessidades",
      "Suporte técnico especializado com cobertura nacional",
      "Modelos compactos e de baixo consumo energético",
      "Abordagem consultiva orientada a resultado"
    ],
    specs: [
      { label: "Modelos", value: "Magnifico Open, S-Scan, O-Scan, G-Scan Brio" },
      { label: "Aplicações", value: "MSK, coluna, extremidades e rotinas específicas" },
      { label: "Implantação", value: "Projeto técnico e instalação assistida" },
      { label: "Suporte", value: "Nacional com contratos flexíveis" }
    ],
    faq: [
      { question: "Qual modelo de RM é ideal para minha operação?", answer: "Depende do perfil clínico, volume e estrutura disponível. Nossa equipe faz essa recomendação de forma consultiva." },
      { question: "A Hexamedical oferece suporte após a instalação?", answer: "Sim, com manutenção preventiva, corretiva e contratos sob medida para garantir alta disponibilidade." }
    ]
  },
  "rm-magnifico-open": {
    slug: "rm-magnifico-open",
    title: "RM Esaote Magnifico Open",
    shortTitle: "Magnifico Open",
    description: "Sistema de ressonância magnética aberta 0.4T com tecnologia True-Motion, diagnóstico com implantes metálicos e interface intuitiva.",
    icon: Magnet,
    heroHeadline: "Magnifico Open: Ressonância Magnética Aberta de Alto Desempenho",
    heroSubtitle: "O Magnifico™ Open é uma solução intuitiva e de fácil utilização, com protocolos desenvolvidos para garantir imagens de alta qualidade. Ideal para clínicas, hospitais e centros de imagem que buscam conforto ao paciente e precisão diagnóstica.",
    highlights: [
      { value: "9x", label: "Bobinas Multifuncionais", description: "Ampla seleção para resultados ideais e excelente experiência ao paciente." },
      { value: "20m²", label: "Fácil Instalação", description: "Design inteligente que cabe facilmente em espaço reduzido." },
      { value: "<3 kW", label: "Baixos Custos Operacionais", description: "Baixo consumo de energia." },
      { value: "0.4T", label: "Tesla", description: "Campo magnético permanente de alta performance." },
    ],
    featureBlocks: [
      {
        title: "RM em movimento para diagnósticos precisos",
        subtitle: "True-Motion",
        description: "O sistema True-Motion da Esaote proporciona aquisição dinâmica em tempo real das articulações em movimento. Ferramenta valiosa para aprimorar o tratamento, especialmente na medicina esportiva de alto nível.",
      },
      {
        title: "Diagnóstico preciso mesmo com implantes metálicos",
        subtitle: "Tecnologia MAR",
        description: "A Magnifico apresenta nível intrínseco de suscetibilidade ao metal inferior ao da RM tradicional. Combinada com sequências MAR, proporciona diagnósticos de alta qualidade mesmo na presença da maioria dos implantes.",
      },
    ],
    bobinas: [
      { name: "Bobina DPA para joelho 2" },
      { name: "Bobina Flex" },
      { name: "Coluna cervical" },
      { name: "Coluna lombar, sacral e torácica 4 canais" },
      { name: "Punho/mão" },
      { name: "Bobina de Ombro" },
      { name: "ATM" },
      { name: "Tornozelo / Pé" },
      { name: "Bobina de 4 canais para cabeça" },
    ],
    audience: [
      "Clínicas de diagnóstico por imagem",
      "Hospitais de médio e grande porte",
      "Centros de referência em ortopedia e neurologia",
      "Clínicas de medicina esportiva",
    ],
    problems: [
      "Pacientes claustrofóbicos que recusam exames em sistemas fechados",
      "Necessidade de imagens dinâmicas em articulações em movimento",
      "Dificuldade em diagnosticar pacientes com implantes metálicos",
      "Equipamentos antigos com alto custo de manutenção e baixa qualidade de imagem",
    ],
    steps: [
      { title: "Avaliação Técnica", description: "Análise da infraestrutura e necessidades da sua operação." },
      { title: "Proposta Personalizada", description: "Configuração ideal do equipamento para seu perfil de demanda." },
      { title: "Instalação Completa", description: "Instalação em apenas 20m², comissionamento e treinamento." },
      { title: "Suporte Contínuo", description: "Manutenção preventiva, corretiva e suporte remoto permanente." },
    ],
    differentials: [
      "Sistema aberto 0.4T com qualidade de imagem superior",
      "Tecnologia True-Motion para exames dinâmicos",
      "Diagnóstico com implantes metálicos via sequências MAR",
      "Suporte técnico nacional com peças originais",
      "Baixo consumo energético (<3 kW)",
      "Treinamento completo para equipe técnica e médica",
    ],
    specs: [
      { label: "Campo Magnético", value: "0.4T permanente" },
      { label: "Abertura", value: "Sistema aberto" },
      { label: "Área mínima", value: "20m²" },
      { label: "Consumo", value: "<3 kW" },
      { label: "Bobinas", value: "9 bobinas multifuncionais" },
      { label: "Software", value: "Plataforma Esaote eXP" },
      { label: "Diferenciais", value: "True-Motion, sequências MAR" },
      { label: "Aplicações", value: "Corpo inteiro, MSK, neuro, abdome" },
    ],
    testimonial: undefined,
    faq: [
      {
        question: "Qual a qualidade de imagem do Magnifico Open comparado a sistemas fechados?",
        answer: "O Magnifico Open oferece qualidade de imagem excepcional com 0.4T e tecnologia eXP. Os protocolos pré-estabelecidos garantem imagens de alta qualidade de forma rápida e eficiente, além de permitir personalização completa dos parâmetros.",
      },
      {
        question: "O Magnifico Open permite exames com o paciente em movimento?",
        answer: "Sim. A tecnologia True-Motion permite aquisição dinâmica em tempo real das articulações em movimento, sendo especialmente útil para diagnósticos de impacto e medicina esportiva.",
      },
      {
        question: "Posso realizar exames em pacientes com implantes metálicos?",
        answer: "Sim. O Magnifico Open possui suscetibilidade intrínseca ao metal inferior à RM tradicional, e combinada com sequências MAR específicas, proporciona diagnósticos de alta qualidade com a maioria dos implantes.",
      },
      {
        question: "Qual o custo operacional do equipamento?",
        answer: "O consumo é inferior a 3 kW, tornando o custo operacional significativamente menor que sistemas supercondutores. Não requer hélio líquido.",
      },
    ],
  },

  "rm-s-scan": {
    slug: "rm-s-scan",
    title: "RM Esaote S-Scan",
    shortTitle: "S-Scan",
    description: "Sistema de RM musculoesquelética compacto com Tecnologia eXP, ideal para clínicas de ortopedia e medicina esportiva. Instalação em apenas 16m².",
    icon: Magnet,
    heroHeadline: "S-Scan: RM Musculoesquelética para Profissionais de MSK",
    heroSubtitle: "Projetado com Tecnologia eXP, o S-Scan é otimizado para qualquer prática com volume musculoesquelético substancial. Abrange todas as estruturas anatômicas MSK, desde os pés até a cabeça, incluindo coluna lombar e cervical.",
    highlights: [
      { value: "6x", label: "Bobinas Multifuncionais", description: "Ampla seleção para resultados ideais e excelente experiência ao paciente." },
      { value: "16m²", label: "Muito Compacto", description: "Instalação fácil em praticamente qualquer consultório ou clínica." },
      { value: "3 kW", label: "Ecológico e Eficiente", description: "Baixo consumo de energia." },
      { value: "0.25T", label: "Tesla", description: "Campo de força magnético permanente." },
    ],
    featureBlocks: [
      {
        title: "Acesso fácil aos pacientes",
        subtitle: "Posicionamento",
        description: "O S-scan se destaca por proporcionar fácil acesso aos pacientes, tornando-o ideal para aplicações avançadas como artrografia por RM. A abertura ampla e o ímã compacto garantem um acesso fácil, com mesa giratória ampla e assimétrica para máximo conforto.",
      },
    ],
    bobinas: [
      { name: "Bobina DPA para joelho 2" },
      { name: "Bobina Flex" },
      { name: "Coluna cervical" },
      { name: "Coluna lombar, sacral e torácica 4 canais" },
      { name: "Punho/mão" },
      { name: "Bobina de Ombro" },
      { name: "ATM" },
      { name: "Tornozelo / Pé" },
      { name: "Bobina de 4 canais para cabeça" },
      { name: "Bobina de 3 canais para ombro" },
      { name: "Bobina Multicanal - Coluna" },
      { name: "Bobina para ombro DPA 2" },
    ],
    audience: [
      "Clínicas de ortopedia",
      "Centros de medicina esportiva",
      "Consultórios especializados em MSK",
      "Departamentos de radiologia",
    ],
    problems: [
      "Alto investimento em sistemas de corpo inteiro quando a demanda é focada em MSK",
      "Espaço limitado para instalação de equipamentos de grande porte",
      "Necessidade de exames rápidos e de qualidade para diagnóstico MSK",
      "Custo operacional elevado com sistemas supercondutores",
    ],
    steps: [
      { title: "Consultoria", description: "Análise do perfil de exames e volume de demanda MSK." },
      { title: "Dimensionamento", description: "Proposta com configuração ideal para seu espaço de 16m²." },
      { title: "Instalação Rápida", description: "Instalação simplificada sem necessidade de blindagem especial." },
      { title: "Operação Assistida", description: "Treinamento e suporte para início imediato da operação." },
    ],
    differentials: [
      "Instalação em apenas 16m², sem sala blindada",
      "6 bobinas multifuncionais dedicadas",
      "Mesa giratória ampla para conforto do paciente",
      "Consumo de apenas 3 kW",
      "Ideal para artrografia por RM",
      "Design compacto e econômico",
    ],
    specs: [
      { label: "Campo Magnético", value: "0.25T permanente" },
      { label: "Área mínima", value: "16m²" },
      { label: "Consumo", value: "3 kW" },
      { label: "Bobinas", value: "6 bobinas multifuncionais" },
      { label: "Aplicação", value: "MSK completo: pés à cabeça, coluna lombar e cervical" },
      { label: "Blindagem", value: "Não requer sala blindada" },
    ],
    testimonial: {
      quote: "Na maioria dos casos, os equipamentos de RM da Esaote me fornecem as informações diagnósticas que preciso para tomar uma decisão adequada. Consigo identificar lesões ósseas, ligamentares, capsulares e de tecidos moles, e até mesmo detectar lesões de cartilagem. Este sistema oferece fácil acesso e alto conforto para o paciente.",
      author: "Dr. Hythem Shadid, Genesis Orthopedics & Sports Medicine, Chicago, EUA",
    },
    faq: [
      {
        question: "Preciso de sala blindada para o S-Scan?",
        answer: "Não. O S-Scan possui auto-blindagem, dispensando investimentos em sala especial. Pode ser instalado em apenas 16m².",
      },
      {
        question: "Quais exames posso realizar com o S-Scan?",
        answer: "Exames MSK completos: desde os pés até a cabeça, incluindo coluna lombar e cervical, joelhos, ombros, mãos, punhos e tornozelos.",
      },
      {
        question: "O S-Scan serve para artrografia por RM?",
        answer: "Sim. O acesso fácil e a abertura ampla tornam o S-Scan ideal para artrografia e outras aplicações avançadas de MSK.",
      },
    ],
  },

  "rm-o-scan": {
    slug: "rm-o-scan",
    title: "RM Esaote O-Scan",
    shortTitle: "O-Scan",
    description: "Sistema de RM de extremidades compacto (9m²) e econômico (1 kW). Solução ideal para clínicas independentes e departamentos de radiologia.",
    icon: Magnet,
    heroHeadline: "O-Scan: RM de Extremidades Compacta e Econômica",
    heroSubtitle: "A eficiência e economia únicas do sistema O-Scan tornam-no ideal para clínicas especializadas independentes ou como unidade adicional no departamento de radiologia, sem comprometer qualidade e eficiência.",
    highlights: [
      { value: "3x", label: "Bobinas Multifuncionais", description: "Seleção otimizada para resultados ideais em extremidades." },
      { value: "9m²", label: "Muito Compacto", description: "Instalação em praticamente qualquer consultório." },
      { value: "1 kW", label: "Ecológico e Eficiente", description: "Consumo de energia mínimo." },
      { value: "0.31T", label: "Tesla", description: "Campo magnético permanente." },
    ],
    featureBlocks: [
      {
        title: "Muito além das barreiras",
        subtitle: "Fácil de trabalhar",
        description: "Desenvolvido para atender à demanda elevada em ambientes radiológicos e clínicas ortopédicas. Pode ser integrado com scanners de corpo inteiro nos departamentos de Radiologia, melhorando o fluxo de trabalho. Nos centros ortopédicos, possibilita acesso direto à RM sem agendar outra consulta.",
      },
    ],
    bobinas: [
      { name: "Bobina DPA de joelho 3" },
      { name: "Bobina DPA 2 para mão/pulso" },
      { name: "Bobina DPA para pé/tornozelo" },
    ],
    audience: [
      "Clínicas ortopédicas independentes",
      "Departamentos de radiologia",
      "Centros de medicina esportiva",
      "Consultórios com espaço reduzido",
    ],
    problems: [
      "Fila de espera longa para RM em departamentos de radiologia",
      "Espaço extremamente limitado (menos de 10m²)",
      "Necessidade de RM de extremidades com baixo custo operacional",
      "Pacientes claustrofóbicos que não toleram scanners tradicionais",
    ],
    steps: [
      { title: "Análise de Demanda", description: "Identificamos o volume de exames de extremidades." },
      { title: "Proposta Compacta", description: "Configuração ideal para seu espaço de 9m²." },
      { title: "Instalação Plug & Play", description: "Instalação rápida com consumo de apenas 1 kW." },
      { title: "Suporte Contínuo", description: "Manutenção e treinamento operacional inclusos." },
    ],
    differentials: [
      "Apenas 9m² de área necessária",
      "Consumo de apenas 1 kW",
      "Sem claustrofobia — conforto total ao paciente",
      "Exames silenciosos — pacientes podem ouvir rádio ou relaxar",
      "Integração fácil com scanners de corpo inteiro",
      "Acesso direto sem necessidade de nova consulta",
    ],
    specs: [
      { label: "Campo Magnético", value: "0.31T permanente" },
      { label: "Área mínima", value: "9m²" },
      { label: "Consumo", value: "1 kW" },
      { label: "Bobinas", value: "3 bobinas DPA dedicadas" },
      { label: "Aplicação", value: "Extremidades: joelho, mão, punho, pé, tornozelo" },
      { label: "Blindagem", value: "Não requer sala blindada" },
    ],
    testimonial: {
      quote: "O conforto do paciente é satisfatório, especialmente durante exames dos membros superiores. A sensação de claustrofobia não é um problema. O exame é muito mais silencioso, permitindo que os pacientes ouçam rádio ou até mesmo tirem uma soneca.",
      author: "Dr. Paula McAlinden e Mr. Matthew Benbow, Royal Bournemouth Hospital, Reino Unido",
    },
    faq: [
      {
        question: "Qual o espaço mínimo para instalar o O-Scan?",
        answer: "O O-Scan precisa de apenas 9m² para instalação completa, sem necessidade de sala blindada.",
      },
      {
        question: "O paciente sente claustrofobia no O-Scan?",
        answer: "Não. O design aberto permite que o paciente fique confortável, podendo inclusive ouvir rádio durante o exame. É significativamente mais silencioso que scanners tradicionais.",
      },
      {
        question: "Posso usar o O-Scan para reduzir filas de RM?",
        answer: "Sim. O O-Scan pode ser integrado ao departamento de radiologia para absorver exames de extremidades, liberando os scanners de corpo inteiro para exames mais complexos.",
      },
    ],
  },

  "rm-g-scan": {
    slug: "rm-g-scan",
    title: "RM Esaote G-Scan Brio",
    shortTitle: "G-Scan Brio",
    description: "Sistema revolucionário de RM com suporte de peso para aplicações MSK. Design aberto e inclinável para diagnósticos na posição com carga.",
    icon: Magnet,
    heroHeadline: "G-Scan Brio: RM com Suporte de Peso para MSK",
    heroSubtitle: "Abordagem revolucionária de RM para todas as aplicações musculoesqueléticas. O design aberto e inclinável possibilita exames na posição com carga, aumentando a precisão diagnóstica e a confiança clínica.",
    highlights: [
      { value: "12x", label: "Bobinas Dedicadas", description: "Projetadas para coluna vertebral e articulações." },
      { value: "23m²", label: "Sistema de Uma Sala", description: "Espaço mínimo de instalação, plug and play." },
      { value: "<3 kW", label: "RM Sustentável", description: "Baixo consumo de energia." },
      { value: "2x", label: "Sequências Dedicadas", description: "Combinar exame de carga com imagem dinâmica." },
    ],
    featureBlocks: [
      {
        title: "Adicione carga ao seu diagnóstico",
        subtitle: "Peso não é problema",
        description: "Muitos sintomas surgem na posição com carga. A RM convencional pode não mostrar a patologia, enquanto o G-scan Brio oferece diagnósticos na posição natural em pé, revelando detalhes que não são observados na posição deitada. As forças da gravidade causam alterações biomecânicas que o G-Scan captura com precisão.",
      },
    ],
    bobinas: [
      { name: "Bobina DPA para joelho 2" },
      { name: "Bobina Flex" },
      { name: "Coluna cervical" },
      { name: "Coluna lombar, sacral e torácica 4 canais" },
      { name: "Punho/mão" },
      { name: "Bobina de Ombro" },
      { name: "ATM" },
      { name: "Tornozelo / Pé" },
      { name: "Bobina de 4 canais para cabeça" },
      { name: "Bobina de 3 canais para ombro" },
      { name: "Bobina Multicanal - Coluna" },
      { name: "Bobina para ombro DPA 2" },
    ],
    audience: [
      "Centros de referência em coluna vertebral",
      "Clínicas de ortopedia avançada",
      "Hospitais universitários",
      "Centros de medicina esportiva de alto nível",
    ],
    problems: [
      "Patologias que só se manifestam na posição com carga e desaparecem ao deitar",
      "Diagnósticos incompletos com RM convencional em posição supina",
      "Necessidade de combinar exame estático e dinâmico",
      "Indicação cirúrgica sem evidência objetiva em imagem convencional",
    ],
    steps: [
      { title: "Avaliação Clínica", description: "Análise das indicações e volume de exames com carga." },
      { title: "Projeto de Sala", description: "Planejamento da sala de 23m² com sistema plug and play." },
      { title: "Instalação e Treinamento", description: "Instalação completa com treinamento em exames com carga." },
      { title: "Suporte Especializado", description: "Acompanhamento contínuo com equipe certificada." },
    ],
    differentials: [
      "Único sistema com RM em posição de carga (em pé)",
      "12 bobinas dedicadas para coluna e articulações",
      "Combina exame de carga com imagem dinâmica",
      "Design aberto e inclinável para conforto do paciente",
      "Consumo inferior a 3 kW",
      "Revelações diagnósticas impossíveis com RM convencional",
    ],
    specs: [
      { label: "Campo Magnético", value: "Permanente (baixo campo)" },
      { label: "Área mínima", value: "23m²" },
      { label: "Consumo", value: "<3 kW" },
      { label: "Bobinas", value: "12 bobinas dedicadas" },
      { label: "Diferencial Exclusivo", value: "RM com suporte de peso (posição em pé)" },
      { label: "Sequências", value: "Exame de carga + imagem dinâmica" },
      { label: "Aplicação", value: "MSK completo com ênfase em coluna vertebral" },
    ],
    testimonial: {
      quote: "A RM realizada na posição de pé nos oferece os benefícios de um discograma sem a invasividade. Na maioria das vezes, cerca de 90% dos pacientes apresentam sintomas na posição com carga, e quando se deitam, os sintomas desaparecem.",
      author: "Dr. Sunny S. Kim, MD, Cirurgião Ortopédico de Coluna, EUA",
    },
    faq: [
      {
        question: "O que significa 'RM com suporte de peso'?",
        answer: "O G-Scan Brio permite realizar exames na posição inclinada ou em pé, simulando a carga natural sobre as articulações e coluna. Isso revela patologias que não aparecem na posição convencional deitada.",
      },
      {
        question: "Para quais diagnósticos o G-Scan Brio é mais indicado?",
        answer: "Especialmente para patologias de coluna vertebral (hérnias, estenose, instabilidades) e articulações que se manifestam com carga, como impacto femoroacetabular e instabilidades ligamentares.",
      },
      {
        question: "90% dos sintomas desaparecem ao deitar. O G-Scan resolve isso?",
        answer: "Sim. O G-Scan Brio captura imagens na posição com carga natural, revelando exatamente o que causa os sintomas do paciente no dia a dia.",
      },
    ],
  },

  "bombas-injetoras": {
    slug: "bombas-injetoras",
    title: "Bombas Injetoras de Contraste",
    shortTitle: "Bombas Injetoras",
    description: "Soluções em bombas injetoras de contraste com manutenção e suporte especializados para centros de diagnóstico por imagem.",
    icon: Syringe,
    heroHeadline: "Bombas Injetoras de Contraste",
    heroSubtitle: "Equipamentos de injeção de contraste de alta precisão para exames de tomografia e ressonância, com suporte técnico completo e cobertura nacional.",
    audience: [
      "Centros de diagnóstico por imagem",
      "Hospitais com departamento de radiologia",
      "Clínicas de tomografia e ressonância",
    ],
    problems: [
      "Injeção manual de contraste com risco de erro de dosagem",
      "Equipamentos antigos sem conectividade e controle preciso",
      "Falta de suporte técnico especializado para bombas injetoras",
    ],
    steps: [
      { title: "Avaliação", description: "Análise do volume de exames e tipos de procedimentos." },
      { title: "Proposta", description: "Equipamento e plano de suporte ideais." },
      { title: "Instalação", description: "Instalação, integração e treinamento da equipe." },
      { title: "Manutenção", description: "Suporte contínuo e manutenção preventiva." },
    ],
    differentials: [
      "Suporte técnico nacional especializado",
      "Manutenção preventiva programada",
      "Peças originais e insumos garantidos",
      "Treinamento operacional completo",
    ],
    specs: [
      { label: "Tipo", value: "Bombas injetoras de contraste" },
      { label: "Aplicações", value: "Tomografia e Ressonância Magnética" },
      { label: "Suporte", value: "Nacional com SLA garantido" },
    ],
    faq: [
      {
        question: "Vocês fazem manutenção de bombas injetoras?",
        answer: "Sim, oferecemos manutenção preventiva e corretiva para bombas injetoras de contraste, com suporte técnico especializado e peças originais.",
      },
    ],
  },

  "hexai": {
    slug: "hexai",
    title: "HexAI — Inteligência Artificial Diagnóstica",
    shortTitle: "HexAI",
    description: "Plataforma de inteligência artificial aplicada ao diagnóstico por imagem que aumenta a precisão, produtividade e assertividade clínica.",
    icon: Brain,
    heroHeadline: "HexAI: Inteligência Artificial para Diagnóstico por Imagem",
    heroSubtitle: "Potencialize a precisão diagnóstica da sua equipe com IA aplicada à análise de imagens médicas. Mais velocidade, mais assertividade, menos risco.",
    audience: [
      "Centros de diagnóstico por imagem",
      "Hospitais com alto volume de exames",
      "Clínicas que buscam diferencial competitivo",
      "Telerradiologia",
    ],
    problems: [
      "Alto volume de exames com risco de fadiga diagnóstica",
      "Necessidade de segunda opinião automatizada",
      "Tempo elevado para laudos em períodos de pico",
      "Competitividade do mercado exigindo inovação tecnológica",
    ],
    steps: [
      { title: "Diagnóstico Operacional", description: "Mapeamos fluxo de exames e gargalos." },
      { title: "Integração", description: "Conectamos HexAI ao seu PACS/RIS." },
      { title: "Treinamento", description: "Capacitação da equipe para uso da IA." },
      { title: "Monitoramento", description: "Acompanhamento de resultados e otimização contínua." },
    ],
    differentials: [
      "IA treinada para imagens de RM",
      "Integração nativa com PACS/RIS",
      "Segunda opinião automatizada",
      "Redução de tempo de laudo",
      "Suporte técnico dedicado",
    ],
    specs: [
      { label: "Tipo", value: "Plataforma de IA para diagnóstico" },
      { label: "Integração", value: "PACS / RIS" },
      { label: "Modalidades", value: "Ressonância Magnética" },
      { label: "Benefício", value: "Aumento de produtividade e assertividade" },
    ],
    faq: [
      {
        question: "A IA substitui o radiologista?",
        answer: "Não. HexAI atua como segunda opinião automatizada, auxiliando o radiologista na detecção e priorização de achados, aumentando a produtividade e reduzindo o risco de fadiga diagnóstica.",
      },
      {
        question: "Como integro o HexAI ao meu sistema?",
        answer: "HexAI se integra nativamente com os principais sistemas PACS e RIS do mercado. Nossa equipe cuida de toda a integração técnica.",
      },
    ],
  },

  "veterinario": {
    slug: "veterinario",
    title: "Ressonância Magnética Veterinária",
    shortTitle: "Área Veterinária",
    description: "Soluções de RM veterinária Esaote: Magnífico Vet, Vet-MR Grande e O-Scan Equine para diagnósticos precisos em pequenos e grandes animais.",
    icon: PawPrint,
    heroHeadline: "RM Veterinária: Diagnóstico por Imagem de Alta Precisão",
    heroSubtitle: "Oferecemos ressonância magnética com os mais altos padrões de qualidade do mercado para diagnóstico veterinário. Precisão, otimização energética e soluções para pequenos e grandes animais.",
    audience: [
      "Hospitais veterinários de referência",
      "Clínicas veterinárias especializadas",
      "Centros de pesquisa animal",
      "Hipismo e esporte equestre",
    ],
    problems: [
      "Falta de equipamentos dedicados ao diagnóstico por imagem veterinário",
      "Necessidade de RM para grandes animais (equinos)",
      "Alto custo de exames em centros humanos adaptados",
      "Diagnósticos imprecisos com ultrassom e radiografia convencionais",
    ],
    steps: [
      { title: "Consultoria Veterinária", description: "Análise do perfil de pacientes e demanda de exames." },
      { title: "Escolha do Equipamento", description: "Magnífico Vet, Vet-MR Grande ou O-Scan Equine." },
      { title: "Instalação Dedicada", description: "Projeto e instalação adaptados ao ambiente veterinário." },
      { title: "Treinamento e Suporte", description: "Capacitação da equipe e suporte contínuo." },
    ],
    differentials: [
      "Equipamentos Esaote dedicados ao uso veterinário",
      "Linha completa: pequenos animais e equinos",
      "Magnífico Vet, Vet-MR Grande e O-Scan Equine",
      "Suporte técnico especializado nacional",
      "Protocolos otimizados para anatomia animal",
    ],
    specs: [
      { label: "Magnífico Vet", value: "RM aberta para pequenos e médios animais" },
      { label: "Vet-MR Grande", value: "RM de grande porte para cães e animais maiores" },
      { label: "O-Scan Equine", value: "RM dedicada para extremidades equinas" },
      { label: "Suporte", value: "Nacional com equipe especializada" },
    ],
    faq: [
      {
        question: "Quais equipamentos de RM veterinária vocês oferecem?",
        answer: "Oferecemos três modelos Esaote: Magnífico Vet (pequenos e médios animais), Vet-MR Grande (cães e animais maiores) e O-Scan Equine (extremidades de equinos).",
      },
      {
        question: "O O-Scan Equine é portátil?",
        answer: "O O-Scan Equine é projetado para ser utilizado em clínicas equinas e centros de hipismo, com design compacto que facilita a instalação em diferentes ambientes.",
      },
    ],
  },
};
