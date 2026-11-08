import type { MediaImage } from "@/data/homeMedia";
import type { PageCard } from "@/components/page/CardGrid";

/**
 * Página do Careverse (/solucoes/careverse), que substitui a landing estática `careverse-site` (/lp/careverse).
 * Fonte única do texto: `careverse-site/index.html` (cópia versionada em src/test/fixtures/careverse-landing.html).
 * Toda afirmação, número e estudo daqui existe lá, com o mesmo sentido; o texto foi só enxugado. Os slogans da landing
 * ("Um novo olhar para cada coração", "Uma parceria que transforma") ficaram de fora. As duas ressalvas regulatórias da
 * landing (`regulatoryNotes`) seguem palavra por palavra.
 *
 * Fora por bloqueio regulatório (careverse-review, plano de revisão da landing, "Função Cardíaca / CT-FFR: bloqueado para
 * publicação até validação regulatória" e "Bloqueios atuais"): todo o CT-FFR (seção, imagem, estudos e pergunta) e as
 * afirmações de economia de tempo, redução de trabalho manual, prognóstico, eventos agudos, melhora do manejo e precisão.
 * Anatomia, placa e CAD-RADS seguem como na landing publicada, pendentes de validação clínica.
 * Os módulos Digital Brain, StrokeFusion e Digital Artery entram só pelo nome: a landing detalha apenas o Digital Heart™.
 */

const media = (file: string, width: number, height: number, alt: string): MediaImage => ({
  src: `/media/careverse/${file}`,
  width,
  height,
  alt,
  screen: true,
});

export const careverseMedia = {
  heart: media("heart-1536.webp", 1536, 1024, "Ilustração conceitual de um coração em azul e cobre"),
  coronaryDoc: media("coronarydoc.webp", 1526, 655, "Interface CoronaryDoc com reconstrução coronariana e cortes de tomografia"),
  plaque: media("plaque.webp", 1030, 705, "Interface Careverse com cortes transversais e quantificação de placa"),
};

/** Ressalvas da landing (seção de soluções e rodapé), mantidas exatamente como estão lá. */
const regulatoryNotes = [
  "Recursos conforme indicação, instruções de uso e status regulatório aplicável. A interpretação e a decisão clínica são médicas.",
  "Material institucional e de apoio comercial. Uso clínico conforme IFUs e status regulatório aplicável. A tecnologia apoia a avaliação; a interpretação e a decisão clínica são médicas.",
] as const;

/**
 * Estudo como a landing o cita. Cada campo existe lá tal e qual; só a faixa de páginas troca a meia-risca por hífen
 * (o teste compara com a landing normalizada do mesmo jeito).
 */
export type CareverseStudy = {
  module: string;
  title: string;
  summary: string;
  journal: string;
  year: string;
  kind: string;
  authors: string;
  ref: string;
  href: string;
};

/** Os três estudos do CoronaryDoc da landing, na mesma ordem. Os dois do CT-FFR (Guo B.) saíram com o CT-FFR. */
const studies: CareverseStudy[] = [
  {
    module: "CoronaryDoc",
    title: "Detecção automatizada de estenose em CCTA",
    summary: "Acurácia diagnóstica e capacidade de generalização de um algoritmo automatizado baseado em deep learning.",
    journal: "Frontiers in Cardiovascular Medicine",
    year: "2021",
    kind: "Estudo multicêntrico",
    authors: "Xu L. et al.",
    ref: "8:707508",
    href: "https://pubmed.ncbi.nlm.nih.gov/34805297/",
  },
  {
    module: "CoronaryDoc",
    title: "Pós-processamento e relatório em CCTA",
    summary: "Avaliação de um sistema baseado em deep learning para pós-processamento e geração de relatório diagnóstico.",
    journal: "Chinese Medical Journal",
    year: "2022",
    kind: "Estudo comparativo",
    authors: "Luo N. et al.",
    ref: "135(19):2366-2368",
    href: "https://pubmed.ncbi.nlm.nih.gov/35120360/",
  },
  {
    module: "CoronaryDoc",
    title: "Detecção de estenose baseada em placa",
    summary: "Comparação da avaliação por inteligência artificial com a angiografia coronária invasiva como referência.",
    journal: "Academic Radiology",
    year: "2022",
    kind: "Estudo diagnóstico",
    authors: "Yi Y. et al.",
    ref: "29(Suppl 4):S49-S58",
    href: "https://pubmed.ncbi.nlm.nih.gov/34895831/",
  },
];

export const careverse = {
  title: "Careverse: Digital Heart™, Digital Brain, StrokeFusion e Digital Artery",
  description:
    "Careverse Digital Heart™ com a Hexamedical: inteligência artificial para apoiar a análise coronariana, com revisão médica em um fluxo integrado.",
  name: "Careverse",
  lead: "Inteligência artificial para apoiar a análise coronariana, com revisão médica em um fluxo integrado.",
  context: "Careverse Digital Heart™ · Inteligência artificial em cardiologia",
  /** A única conversão da página: o mesmo botão no hero e no fechamento. */
  cta: "Solicitar demonstração",
  whatsappText: "Olá! Quero solicitar uma demonstração do Careverse.",
  regulatoryNotes,

  modules: {
    title: "Os módulos da plataforma",
    intro: "Esta página apresenta o Careverse Digital Heart™. Os demais módulos são apresentados na demonstração.",
    cards: [
      { title: "Digital Heart™", meta: "Cardiologia", body: "Anatomia coronariana e análise de placa.", href: "#digital-heart" },
      { title: "Digital Brain" },
      { title: "StrokeFusion" },
      { title: "Digital Artery" },
    ] satisfies PageCard[],
  },

  heart: {
    title: "Careverse Digital Heart™",
    intro: [
      "O Careverse Digital Heart™ reúne IA avançada para quantificar, reconstruir e estruturar dados cardiovasculares, mantendo o especialista no centro de cada conduta.",
    ],
    /** As perspectivas da landing que podem ser publicadas, cada uma com a tela do software. */
    perspectives: [
      {
        id: "anatomia",
        title: "Anatomia coronariana",
        intro: "CoronaryDoc e score de cálcio. Mapeie a anatomia coronariana e quantifique estenoses com um fluxo estruturado para análise de CCTA.",
        media: careverseMedia.coronaryDoc,
        points: [
          "Mapeamento vascular 3D automatizado para apoiar a análise",
          "Cálculo do Score de Cálcio (Agatston)",
          "Apoio à classificação CAD-RADS e ao relatório estruturado",
        ],
      },
      {
        id: "placa",
        title: "Análise de placa",
        intro: "Quantifique o grau de estenose e caracterize a carga de placa para apoiar a avaliação de risco e o acompanhamento do tratamento.",
        media: careverseMedia.plaque,
        points: [
          "Mensuração da carga total e do volume de placa para acompanhamento longitudinal",
          "Diferenciação de componentes lipídicos, fibrosos e calcificados",
          "Dados estruturados para apoiar a discussão e a decisão clínica",
        ],
      },
    ],
  },

  workflow: {
    title: "Da imagem ao relatório, em quatro etapas",
    intro: [
      "A IA apoia o processamento. Você revisa os achados e conduz a decisão clínica.",
      "A compatibilidade e os requisitos de integração são avaliados para cada instituição.",
    ],
    steps: [
      { title: "Conecte o exame", body: "Você conecta as imagens de angiotomografia coronariana ao fluxo via DICOM/PACS." },
      { title: "Processe com IA", body: "A plataforma apoia a reconstrução vascular e organiza os dados para análise." },
      { title: "Revise os achados", body: "Você revisa e edita os achados considerando o contexto clínico." },
      { title: "Gere o relatório", body: "Você gera informações estruturadas e integra o resultado ao fluxo da instituição." },
    ] satisfies PageCard[],
  },

  evidence: {
    title: "Estudos sobre anatomia e placa",
    intro: [
      "Publicações sobre análise automatizada de CCTA, com link para os estudos originais.",
      "A aplicabilidade depende da população, indicação, qualidade do exame e instruções de uso.",
    ],
    studies,
    cards: studies.map(
      (study): PageCard => ({
        title: study.title,
        meta: `${study.module} · ${study.journal}, ${study.year} · ${study.kind}`,
        body: `${study.summary} ${study.authors}, ${study.ref}.`,
        href: study.href,
      }),
    ),
  },

  faq: [
    {
      q: "O que é o Careverse Digital Heart™?",
      a: "É um conjunto de soluções de inteligência artificial para apoiar o pós-processamento e a análise cardiovascular. O material apresenta anatomia coronariana, score de cálcio e análise de placa.",
    },
    {
      q: "A IA substitui a interpretação médica?",
      a: "Não. A IA apoia a organização, o processamento e a análise das imagens. O fluxo inclui revisão e edição médica antes da emissão do relatório. A interpretação e a decisão clínica permanecem com o profissional de saúde.",
    },
    {
      q: "A solução se integra ao PACS da instituição?",
      a: "O fluxo apresentado no material contempla DICOM/PACS, processamento, revisão médica e relatório estruturado. A compatibilidade, a infraestrutura e os requisitos de integração devem ser avaliados com a equipe para cada instituição.",
    },
    {
      q: "Como funciona a contratação?",
      a: "A proposta é definida a partir das necessidades da instituição, dos módulos de interesse e dos requisitos de integração. Na demonstração, a equipe pode entender sua operação e orientar os próximos passos para uma avaliação técnica e comercial.",
    },
  ],

  closing: {
    title: "Demonstração do Careverse",
    intro: [
      "A inteligência artificial da Careverse encontra a solidez da Hexamedical em diagnóstico por imagem. Veja como o Careverse Digital Heart™ pode apoiar o seu serviço.",
      "Uma conversa direcionada à sua rotina, sobre módulos, fluxo e integração.",
    ],
  },
};
