import type { MediaImage } from "@/data/homeMedia";
import type { PageCard } from "@/components/page/CardGrid";

/**
 * Página do Careverse (/solucoes/careverse), que substitui a landing estática `careverse-site` (/lp/careverse).
 * Fonte única do texto: `careverse-site/index.html`. Toda afirmação, número e estudo daqui existe lá, com o mesmo
 * sentido; o texto foi só enxugado. Os slogans da landing ("Um novo olhar para cada coração", "Uma parceria que
 * transforma") ficaram de fora. As duas ressalvas regulatórias da landing (`regulatoryNotes`) seguem palavra por palavra.
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
  ctFfr: media("ct-ffr.webp", 1532, 712, "Interface Careverse CT-FFR com mapa tridimensional de coronárias e curvas funcionais"),
};

/** Ressalvas da landing (seção de soluções e rodapé), mantidas exatamente como estão lá. */
const regulatoryNotes = [
  "Recursos conforme indicação, instruções de uso e status regulatório aplicável. A interpretação e a decisão clínica são médicas.",
  "Material institucional e de apoio comercial. Uso clínico conforme IFUs e status regulatório aplicável. A tecnologia apoia a avaliação; a interpretação e a decisão clínica são médicas.",
] as const;

export const careverse = {
  title: "Careverse: Digital Heart™, Digital Brain, StrokeFusion e Digital Artery",
  description:
    "Careverse Digital Heart™ com a Hexamedical: inteligência artificial para apoiar a análise coronariana, da anatomia à função, com revisão médica em um fluxo integrado.",
  name: "Careverse",
  lead: "Inteligência artificial para apoiar a análise coronariana, da anatomia à função, com revisão médica em um fluxo integrado.",
  context: "Careverse Digital Heart™ · Inteligência artificial em cardiologia",
  /** A única conversão da página: o mesmo botão no hero e no fechamento. */
  cta: "Solicitar demonstração",
  whatsappText: "Olá! Quero solicitar uma demonstração do Careverse.",
  regulatoryNotes,

  modules: {
    title: "Os módulos da plataforma",
    intro: "Esta página apresenta o Careverse Digital Heart™. Os demais módulos são apresentados na demonstração.",
    cards: [
      { title: "Digital Heart™", meta: "Cardiologia", body: "Anatomia coronariana, análise de placa e CT-FFR.", href: "#digital-heart" },
      { title: "Digital Brain", meta: "Neurologia" },
      { title: "StrokeFusion", meta: "AVC" },
      { title: "Digital Artery", meta: "Artérias" },
    ] satisfies PageCard[],
  },

  heart: {
    title: "Careverse Digital Heart™",
    intro: [
      "O Careverse Digital Heart™ reúne IA avançada para quantificar, reconstruir e estruturar dados cardiovasculares, mantendo o especialista no centro de cada conduta. Da anatomia à função coronariana, com mais contexto para a análise.",
    ],
    /** As três perspectivas da landing, cada uma com a tela do software. */
    perspectives: [
      {
        id: "anatomia",
        title: "Anatomia coronariana",
        intro: "CoronaryDoc e score de cálcio. Mapeie a anatomia coronariana e quantifique estenoses com um fluxo estruturado para análise de CCTA.",
        media: careverseMedia.coronaryDoc,
        points: [
          "Mapeamento vascular 3D automatizado para apoiar a análise",
          "Cálculo do Score de Cálcio (Agatston) com menor dependência de etapas manuais",
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
      {
        id: "funcao",
        title: "Função cardíaca com CT-FFR",
        intro: "Careverse CT-FFR. Complete a avaliação anatômica com informações funcionais para apoiar o manejo do paciente, quando indicado.",
        media: careverseMedia.ctFfr,
        points: [
          "Reconstrução 3D com dinâmica de fluidos computacional",
          "Mapa de FFR e curvas ao longo dos vasos",
          "Relatórios gráficos e textuais exportáveis",
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
    title: "Estudos sobre anatomia, placa e função",
    intro: [
      "Publicações sobre análise automatizada de CCTA e CT-FFR, com link para os estudos originais.",
      "A aplicabilidade depende da população, indicação, qualidade do exame e instruções de uso.",
    ],
    /** Os cinco estudos da landing, na mesma ordem: CoronaryDoc (três) e Careverse CT-FFR (dois). */
    studies: [
      {
        title: "Detecção automatizada de estenose em CCTA",
        meta: "CoronaryDoc · Frontiers in Cardiovascular Medicine, 2021 · Estudo multicêntrico",
        body: "Acurácia diagnóstica e capacidade de generalização de um algoritmo automatizado baseado em deep learning. Xu L. et al., 8:707508.",
        href: "https://pubmed.ncbi.nlm.nih.gov/34805297/",
      },
      {
        title: "Pós-processamento e relatório em CCTA",
        meta: "CoronaryDoc · Chinese Medical Journal, 2022 · Estudo comparativo",
        body: "Avaliação de um sistema baseado em deep learning para pós-processamento e geração de relatório diagnóstico. Luo N. et al., 135(19):2366-2368.",
        href: "https://pubmed.ncbi.nlm.nih.gov/35120360/",
      },
      {
        title: "Detecção de estenose baseada em placa",
        meta: "CoronaryDoc · Academic Radiology, 2022 · Estudo diagnóstico",
        body: "Comparação da avaliação por inteligência artificial com a angiografia coronária invasiva como referência. Yi Y. et al., 29(Suppl 4):S49-S58.",
        href: "https://pubmed.ncbi.nlm.nih.gov/34895831/",
      },
      {
        title: "Desempenho diagnóstico e prognóstico",
        meta: "Careverse CT-FFR · Science Bulletin, 2024 · Estudo clínico",
        body: "Estudo sobre CT-FFR por inteligência artificial. Guo B. et al., 69(10):1472-1485.",
        href: "https://pubmed.ncbi.nlm.nih.gov/38637226/",
      },
      {
        title: "Efetividade na prática clínica",
        meta: "Careverse CT-FFR · Radiology, 2024 · Ensaio randomizado",
        body: "Ensaio de uma estratégia com CT-FFR automatizado. Guo B. et al., 313(1):e233354.",
        href: "https://pubs.rsna.org/doi/10.1148/radiol.233354",
      },
    ] satisfies PageCard[],
  },

  faq: [
    {
      q: "O que é o Careverse Digital Heart™?",
      a: "É um conjunto de soluções de inteligência artificial para apoiar o pós-processamento e a análise cardiovascular. O material apresenta anatomia coronariana, score de cálcio, análise de placa e avaliação funcional por CT-FFR.",
    },
    {
      q: "A IA substitui a interpretação médica?",
      a: "Não. A IA apoia a organização, o processamento e a análise das imagens. O fluxo inclui revisão e edição médica antes da emissão do relatório. A interpretação e a decisão clínica permanecem com o profissional de saúde.",
    },
    {
      q: "Como o CT-FFR complementa a CCTA?",
      a: "A CCTA permite avaliar a anatomia das coronárias. O CT-FFR utiliza essas imagens para acrescentar informação funcional não invasiva, incluindo um mapa ao longo dos vasos e curvas associadas. Seu uso depende da indicação clínica e das instruções de uso.",
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
