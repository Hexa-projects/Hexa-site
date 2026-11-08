import { homeMedia, type MediaImage } from "@/data/homeMedia";
import { triage, type CompanyFact, type TriagePath } from "@/data/home";
import type { PageCard } from "@/components/page/CardGrid";

/**
 * Conteúdo das páginas de Soluções (hub, linha de RM e produtos de RM).
 * Fontes, nesta ordem: dados da Esaote em src/data/editorial.ts e src/data/solutions.ts;
 * base comercial do segundo cérebro (notas O-Scan, S-Scan, Magnifico Open, Comparativo de RM Esaote,
 * Regra de escolha de RM humana, Densitometria); texto do site atual.
 * Hélio: só Magnifico Open e S-scan Open têm "não usa hélio" confirmado. O O-scan humano e o G-scan não falam de hélio.
 * Área do S-scan Open: "até 20 m²", como na base comercial (src/data/editorial.ts diz "a partir de 20 m²").
 */

const RM_ROUTE = "/solucoes/ressonancia-magnetica";

const shot = (id: string, width: number, height: number, alt: string): MediaImage => ({
  src: `/media/home/showroom/${id}.webp`,
  width,
  height,
  alt,
});

const cutouts = {
  magnifico: shot("magnifico-open", 600, 493, "Ressonância magnética Esaote Magnifico Open"),
  sScan: shot("s-scan-open", 960, 675, "Ressonância magnética Esaote S-scan Open"),
  oScan: shot("o-scan-smart", 880, 932, "Ressonância magnética Esaote O-scan SMART"),
  gScan: shot("g-scan-open", 960, 748, "Ressonância magnética Esaote G-scan Open"),
  accutron: shot("accutron-mr", 202, 561, "Bomba injetora de contraste Accutron MR"),
  digieye: shot("digieye-350", 960, 684, "Sistema de radiografia digital Mindray DigiEye 350"),
  vet: shot("vet-mr-grande", 960, 641, "Ressonância veterinária Esaote Vet-MR Grande com um tigre posicionado"),
};

/** Caminhos de contato: o primeiro abre a conversa com a mensagem da página; manutenção e reparo seguem os da home. */
export function contactPaths(first: { title: string; whatsappText: string; href?: string; linkLabel?: string }): TriagePath[] {
  const [buy, ...rest] = triage;
  return [{ ...buy, title: first.title, whatsappText: first.whatsappText, href: first.href ?? buy.href, linkLabel: first.linkLabel ?? buy.linkLabel }, ...rest];
}

/* ---------- Hub ---------- */

export const hub = {
  title: "Soluções",
  description:
    "Ressonância magnética aberta Esaote, bombas injetoras, radiografia digital, densitometria, inteligência artificial e linha veterinária, com projeto da sala, instalação e manutenção pela Hexamedical.",
  heroTitle: "Equipamentos e software para diagnóstico por imagem",
  heroLead:
    "A linha principal é a ressonância aberta Esaote. Ao lado dela trabalhamos com injetoras de contraste, radiografia digital, densitometria, inteligência artificial e uma linha veterinária. Cada linha tem uma página com os modelos e os dados do fabricante.",
  whatsappText: "Olá! Quero conhecer as soluções da Hexamedical para a minha clínica.",
  equipment: [
    {
      title: "Ressonância magnética",
      meta: "Esaote",
      body: "Quatro sistemas abertos, das extremidades ao corpo inteiro, com comparativo de campo, área de instalação e consumo.",
      href: RM_ROUTE,
      image: cutouts.magnifico,
    },
    {
      title: "Bombas injetoras",
      meta: "Accutron",
      body: "Injetoras de contraste para ressonância magnética, tomografia e hemodinâmica.",
      href: "/solucoes/bombas-injetoras",
      image: cutouts.accutron,
    },
    {
      title: "Radiografia digital",
      meta: "DRGEM e Mindray",
      body: "Sistemas fixos e móveis e detectores digitais sem fio para a sala de raio-X e o leito.",
      href: "/solucoes/radiografia-digital",
      image: cutouts.digieye,
    },
    {
      title: "Veterinária",
      meta: "Esaote e WDM",
      body: "Ressonância e tomografia para clínicas, hospitais e universidades veterinárias.",
      href: "/solucoes/veterinaria",
      image: cutouts.vet,
      fill: true,
    },
  ] satisfies PageCard[],
  more: [
    {
      title: "Densitometria",
      meta: "DXA",
      body: "Sistemas DXA que medem a densidade mineral óssea, usados no diagnóstico de osteoporose.",
      href: "/solucoes/densitometria",
    },
    {
      title: "HexAI",
      meta: "Inteligência artificial para ressonância",
      body: "Software com SwiftMR que encurta o tempo de varredura dos exames de ressonância magnética. Uma licença por equipamento.",
      href: "/solucoes/hexai",
    },
    {
      title: "Careverse",
      meta: "Inteligência artificial cardiovascular e neurológica",
      body: "Plataforma de inteligência artificial para exames cardiovasculares e neurológicos.",
      href: "/solucoes/careverse",
    },
  ] satisfies PageCard[],
  /** Da home (src/data/home.ts, etapas da vida do equipamento). */
  services: [
    "Indicação do sistema a partir dos exames que você quer fazer, do volume esperado e do espaço disponível",
    "Projeto da sala antes da compra: área, rede elétrica e requisitos de instalação de cada sistema",
    "Desinstalação, transporte e instalação, também quando a clínica muda de endereço",
    "Treinamento da equipe da clínica para a rotina de exames",
    "Manutenção preventiva e corretiva em todo o país, avulsa ou por contrato, com ou sem peças",
    "Laboratório próprio para reparo de bobinas de ressonância, placas eletrônicas e fontes",
  ],
};

/* ---------- Linha de RM ---------- */

/** Cards dos quatro equipamentos da linha, usados na escolha e nos relacionados das páginas de produto. Sem hélio aqui: aparecem na página do O-scan. */
export const rmCards: Record<string, PageCard> = {
  "o-scan-smart": {
    title: "O-scan SMART",
    meta: "a partir de 9 m² · menos de 1 kW",
    body: "Ressonância dedicada a joelho, mão, punho, pé e tornozelo.",
    href: "/solucoes/o-scan-smart",
    image: cutouts.oScan,
  },
  "s-scan-open": {
    title: "S-scan Open",
    meta: "até 20 m² · 2 kW em aquisição",
    body: "Ressonância musculoesquelética, das extremidades à coluna.",
    href: "/solucoes/s-scan-open",
    image: cutouts.sScan,
  },
  "magnifico-open": {
    title: "Magnifico Open",
    meta: "até 20 m² · menos de 3 kW",
    body: "Ressonância aberta de corpo inteiro, com campo de 0,4 T.",
    href: "/solucoes/magnifico-open",
    image: cutouts.magnifico,
  },
  "g-scan": {
    title: "G-scan Open",
    meta: "a partir de 23 m² · menos de 3 kW",
    body: "Ressonância inclinável, para exames de coluna e articulações com e sem carga.",
    href: "/solucoes/g-scan",
    image: cutouts.gScan,
  },
};

export type CompareTableData = {
  caption: string;
  source: string;
  columns: { label: string; href?: string }[];
  rows: { label: string; values: string[] }[];
};

export const rmLine = {
  title: "Ressonância magnética Esaote",
  description:
    "Compare O-scan SMART, S-scan Open, Magnifico Open e G-scan Open: indicação, campo magnético, área de instalação e consumo, com dados da Esaote.",
  heroTitle: "Ressonância magnética aberta Esaote",
  heroLead:
    "Quatro sistemas abertos, das extremidades ao corpo inteiro. Compare indicação, campo, área de instalação e consumo e veja qual deles atende os exames que a sua clínica quer fazer.",
  hero: cutouts.magnifico,
  whatsappText: "Olá! Quero ajuda para escolher uma ressonância magnética Esaote.",
  question: "Extremidades e ortopedia, musculoesquelético amplo com coluna, ou RM aberta de corpo inteiro?",
  /** Regra de escolha da base comercial, mais o G-scan para exame com carga (src/data/editorial.ts). */
  choice: [
    {
      ...rmCards["o-scan-smart"],
      meta: "Extremidades e ortopedia",
      body: "Joelho, mão, punho, pé e tornozelo em um sistema dedicado, instalado a partir de 9 m².",
    },
    {
      ...rmCards["s-scan-open"],
      meta: "Musculoesquelético amplo, com coluna",
      body: "Ombro, quadril, coluna e ATM, além das extremidades. Não usa hélio.",
    },
    {
      ...rmCards["magnifico-open"],
      meta: "RM aberta de corpo inteiro",
      body: "Musculoesquelético, coluna, neuro e parte dos exames de abdome e pelve, com campo de 0,4 T. Não usa hélio.",
    },
    {
      ...rmCards["g-scan"],
      meta: "Coluna e articulações com carga",
      body: "Sistema inclinável que examina o paciente deitado ou com carga, quando a postura pode influenciar os sintomas.",
    },
  ] satisfies PageCard[],
  compare: {
    caption: "Comparativo da linha de ressonância magnética Esaote",
    source: "Dados da Esaote e da base comercial da Hexamedical",
    columns: [
      { label: "O-scan SMART", href: "/solucoes/o-scan-smart" },
      { label: "S-scan Open", href: "/solucoes/s-scan-open" },
      { label: "Magnifico Open", href: "/solucoes/magnifico-open" },
      { label: "G-scan Open", href: "/solucoes/g-scan" },
    ],
    rows: [
      {
        label: "Indicado para",
        values: [
          "Extremidades e ortopedia",
          "Musculoesquelético amplo, articulações maiores e coluna",
          "RM aberta de corpo inteiro",
          "Coluna e articulações, deitado ou com carga",
        ],
      },
      { label: "Campo magnético", values: ["0,31 T", "0,25 T", "0,4 T", "sob consulta"] },
      { label: "Área de instalação", values: ["a partir de 9 m²", "até 20 m²", "até 20 m²", "a partir de 23 m²"] },
      { label: "Consumo de energia", values: ["menos de 1 kW", "2 kW em aquisição", "menos de 3 kW", "menos de 3 kW"] },
      { label: "Alimentação", values: ["110/220 V", "monofásica", "monofásica 220 V", "sob consulta"] },
    ],
  } satisfies CompareTableData,
  /** Da home (src/data/home.ts): o que a Hexamedical faz em torno da ressonância. */
  services: hub.services,
  faq: [
    {
      q: "Qual ressonância precisa de menos espaço?",
      a: "O O-scan SMART, instalado a partir de 9 m². O S-scan Open e o Magnifico Open cabem em até 20 m², e o G-scan Open pede a partir de 23 m². Obra, blindagem, carga de piso e layout final são confirmados no projeto da sala.",
    },
    {
      q: "Quais modelos não usam hélio?",
      a: "O Magnifico Open, de ímã permanente, e o S-scan Open não usam hélio.",
    },
    {
      q: "Dá para examinar o paciente em pé?",
      a: "Sim, no G-scan Open. O sistema inclina e permite planejar a aquisição com o paciente deitado ou com carga, conforme a indicação clínica.",
    },
    {
      q: "A Hexamedical faz a manutenção depois da instalação?",
      a: "Sim. Fazemos manutenção preventiva e corretiva em todo o país, avulsa ou por contrato, com ou sem peças. Bobinas, placas e fontes vão para o nosso laboratório de reparo.",
    },
  ],
};

/* ---------- Produtos de RM ---------- */

export type ProductContent = {
  slug: string;
  name: string;
  /** Placa técnica do hero: fabricante e linha. */
  line: string;
  description: string;
  hero: MediaImage;
  lead: string;
  facts: CompanyFact[];
  fit: { title: string; intro: string; media?: MediaImage };
  points: string[];
  specs: [string, string][];
  specSource: string;
  faq: { q: string; a: string }[];
  whatsappText: string;
  /** Slugs de rmCards. */
  related: string[];
};

export const products: Record<string, ProductContent> = {
  "o-scan-smart": {
    slug: "o-scan-smart",
    name: "O-scan SMART",
    line: "Esaote · Ressonância dedicada a extremidades",
    description:
      "O-scan SMART, ressonância Esaote dedicada a joelho, mão, punho, pé e tornozelo: 0,31 T, instalação a partir de 9 m² e consumo abaixo de 1 kW.",
    hero: cutouts.oScan,
    lead: "Ressonância dedicada a joelho, mão, punho, pé e tornozelo. Cabe numa sala a partir de 9 m² e consome menos de 1 kW.",
    facts: [
      { value: "0,31 T", label: "campo magnético" },
      { value: "9 m²", label: "área mínima de instalação" },
      { value: "< 1 kW", label: "consumo informado pela Esaote" },
      { value: "110/220 V", label: "alimentação" },
    ],
    fit: {
      title: "Onde o O-scan SMART faz sentido",
      intro:
        "Em clínicas de ortopedia, medicina esportiva, mão, podiatria e reumatologia, e como sala a mais em serviços de radiologia. Com as extremidades num sistema próprio, os equipamentos de corpo inteiro ficam livres para outras indicações.",
    },
    points: [
      "Joelho, mão, punho, pé e tornozelo, com uma bobina dedicada a cada região",
      "O paciente fica num assento próprio, fora do magneto, e só o membro examinado entra na abertura",
      "Instalação a partir de 9 m², com alimentação 110/220 V e consumo abaixo de 1 kW",
      "Plataforma eXP, com AgilExam e posicionamento em tempo real",
      "Recursos MAR, 3D SHARC e True-Motion",
    ],
    specs: [
      ["Fabricante", "Esaote"],
      ["Campo magnético", "0,31 T"],
      ["Gradiente", "20 mT/m"],
      ["Abertura do gantry", "18 x 34 cm"],
      ["Área de instalação", "a partir de 9 m²"],
      ["Alimentação", "110/220 V"],
      ["Consumo de energia", "menos de 1 kW"],
      ["Bobinas", "joelho, mão e punho, pé e tornozelo"],
      ["Plataforma", "eXP, AgilExam"],
    ],
    specSource: "Dados da Esaote e da base comercial da Hexamedical",
    faq: [
      {
        q: "Quanto espaço o O-scan SMART precisa?",
        a: "A instalação parte de 9 m². Layout, rede elétrica e piso são confirmados no projeto da sala, antes da compra.",
      },
      {
        q: "Quais exames ele faz?",
        a: "Exames de extremidades: joelho, mão, punho, pé e tornozelo. Para ombro, quadril e coluna, o modelo da linha é o S-scan Open.",
      },
      {
        q: "Como fica o paciente durante o exame?",
        a: "Num assento próprio, fora do magneto. Só o membro examinado entra na abertura, e a arquitetura aberta evita a sensação de túnel fechado.",
      },
      {
        q: "Ele serve como segunda ressonância de um serviço de radiologia?",
        a: "Sim. Com os exames de extremidades no O-scan SMART, o equipamento de corpo inteiro fica livre para as outras indicações.",
      },
    ],
    whatsappText: "Olá! Quero saber mais sobre o O-scan SMART.",
    related: ["s-scan-open", "magnifico-open", "g-scan"],
  },
  "s-scan-open": {
    slug: "s-scan-open",
    name: "S-scan Open",
    line: "Esaote · Ressonância musculoesquelética",
    description:
      "S-scan Open, ressonância aberta Esaote para joelho, ombro, quadril e coluna: 0,25 T, não usa hélio, instalação em até 20 m² e 2 kW em aquisição.",
    hero: cutouts.sScan,
    lead: "Ressonância aberta para joelho, ombro, quadril, coluna e as demais articulações. Não usa hélio e consome 2 kW em média durante a aquisição.",
    facts: [
      { value: "0,25 T", label: "campo aberto" },
      { value: "até 20 m²", label: "área de instalação" },
      { value: "2 kW", label: "consumo médio em aquisição" },
      { value: "Sem hélio", label: "e sem risco de quench" },
    ],
    fit: {
      title: "Onde o S-scan Open faz sentido",
      intro:
        "Em clínicas com demanda musculoesquelética que vai além das extremidades. Articulações maiores, coluna e aplicações ortopédicas ficam na mesma sala.",
      media: {
        src: "/assets/esaote/s-scan-open-detail.webp",
        width: 1200,
        height: 900,
        alt: "Profissional posiciona a bobina em um paciente deitado na mesa do S-scan Open",
      },
    },
    points: [
      "Joelho, ombro, quadril, punho e mão, tornozelo e pé",
      "Coluna cervical, torácica e lombar, e articulações temporomandibulares",
      "Mesa ampla, giratória e assimétrica, que facilita o posicionamento e o acesso ao paciente",
      "Acesso aberto que facilita procedimentos como a artrografia por RM",
      "Tecnologia eXP, SpeedUp e redução de TR, com visualização em tempo real",
      "Alimentação monofásica",
    ],
    specs: [
      ["Fabricante", "Esaote"],
      ["Campo magnético", "0,25 T, aberto"],
      ["Hélio", "não usa"],
      ["Área de instalação", "até 20 m²"],
      ["Alimentação", "monofásica"],
      ["Consumo médio em aquisição", "2 kW"],
      ["Bobinas", "joelho, punho e mão, tornozelo e pé, ombro, coluna e ATM"],
      ["Tecnologia", "eXP, SpeedUp"],
    ],
    specSource: "Dados da Esaote e da base comercial da Hexamedical",
    faq: [
      {
        q: "O S-scan Open usa hélio?",
        a: "Não. O S-scan Open não usa hélio e, pelos materiais da Esaote, não tem risco de quench.",
      },
      {
        q: "Quanto espaço ele precisa?",
        a: "A instalação cabe em até 20 m², com alimentação monofásica. Layout, rede elétrica e piso são confirmados no projeto da sala, antes da compra.",
      },
      {
        q: "Quanto ele consome?",
        a: "A Esaote informa consumo médio de 2 kW durante a aquisição.",
      },
      {
        q: "Qual a diferença para o O-scan SMART?",
        a: "O O-scan SMART é dedicado a extremidades. O S-scan Open cobre também ombro, quadril e coluna, para clínicas com demanda musculoesquelética mais ampla.",
      },
    ],
    whatsappText: "Olá! Quero saber mais sobre o S-scan Open.",
    related: ["o-scan-smart", "magnifico-open", "g-scan"],
  },
  "g-scan": {
    slug: "g-scan",
    name: "G-scan Open",
    line: "Esaote · Ressonância musculoesquelética com carga",
    description:
      "G-scan Open, ressonância aberta e inclinável da Esaote para coluna e articulações com o paciente deitado ou com carga: 12 bobinas, a partir de 23 m² e menos de 3 kW.",
    hero: cutouts.gScan,
    lead: "Ressonância aberta que inclina e examina coluna e articulações com o paciente deitado ou com carga, quando a postura pode influenciar os sintomas.",
    facts: [
      { value: "23 m²", label: "área mínima de instalação" },
      { value: "12", label: "bobinas dedicadas a coluna e articulações" },
      { value: "< 3 kW", label: "consumo informado pela Esaote" },
    ],
    fit: {
      title: "Onde o G-scan Open faz sentido",
      intro:
        "Em serviços de coluna e ortopedia que querem ver a anatomia também na posição com carga. Deitado e com carga são condições diferentes, e o exame pode registrar as duas, conforme a indicação e o protocolo clínico.",
      media: {
        src: "/assets/esaote/g-scan-open-detail.webp",
        width: 1200,
        height: 900,
        alt: "Paciente em pé no G-scan Open inclinado, durante um exame com carga",
      },
    },
    points: [
      "Coluna, joelho e demais articulações",
      "Aquisição planejada sem carga e com carga, conforme a indicação clínica",
      "Imagem dinâmica combinada ao exame com carga",
      "12 bobinas dedicadas a coluna e articulações",
      "Instalação mínima de 23 m² e consumo abaixo de 3 kW, segundo a Esaote",
    ],
    specs: [
      ["Fabricante", "Esaote"],
      ["Arquitetura", "aberta e inclinável"],
      ["Posições de exame", "deitado e com carga"],
      ["Área de instalação", "a partir de 23 m²"],
      ["Consumo de energia", "menos de 3 kW"],
      ["Bobinas", "12 bobinas dedicadas a coluna e articulações"],
    ],
    specSource: "Dados da Esaote",
    faq: [
      {
        q: "O que muda no exame com carga?",
        a: "Muitos sintomas de coluna e articulações aparecem com o peso do corpo. O G-scan Open inclina e registra a anatomia nessa posição, além da posição deitada, conforme o protocolo clínico.",
      },
      {
        q: "Quanto espaço ele precisa?",
        a: "A Esaote informa instalação mínima de 23 m². O projeto final depende da configuração e é confirmado antes da compra.",
      },
      {
        q: "Quais regiões ele examina?",
        a: "Coluna e articulações, como o joelho, com 12 bobinas dedicadas.",
      },
    ],
    whatsappText: "Olá! Quero saber mais sobre o G-scan Open.",
    related: ["s-scan-open", "o-scan-smart", "magnifico-open"],
  },
};

/** Foto de cena da seção de serviços da linha de RM (Magnifico Open em uso, da home). */
export const rmServicesMedia = homeMedia.stages.escolha;
