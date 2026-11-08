import { homeMedia, type MediaImage } from "@/data/homeMedia";
import { triage, whatsappHref, type CompanyFact, type TriagePath } from "@/data/home";
import type { PageCard } from "@/components/page/CardGrid";

/**
 * Conteúdo das páginas de Soluções (hub, linha de RM e produtos de RM).
 * Fontes, nesta ordem: dados da Esaote (páginas de produto em esaote.com, descrição de produto e brochura do Magnifico Open);
 * base comercial do segundo cérebro (notas O-Scan, S-Scan, Magnifico Open, Comparativo de RM Esaote,
 * Regra de escolha de RM humana, Densitometria); texto do site atual.
 * Hélio: só Magnifico Open e S-scan Open têm "não usa hélio" confirmado. O O-scan humano e o G-scan não falam de hélio.
 * Área do S-scan Open: "a partir de 20 m²", número oficial da Esaote (página de produto do S-scan Open), acima do "até 20 m²" da base comercial.
 * Magnifico Open: "cerca de 20 m²" e "até 3 kW", da descrição de produto (p5) e da brochura (p10) da Esaote (ver src/data/pages/magnifico.ts).
 *
 * Demais linhas (injetoras, radiografia, densitometria, HexAI, veterinária) e modelos WDM: notas Injetoras Medtron Accutron,
 * Raio-X Digital DRGEM, Placas DR, Densitometria, IA VUNO HexAI e Linha Veterinária; src/data/wdm.ts (folders da WDM);
 * texto do site atual (/bombas-injetoras/, /mindray/, /hexai/, /area-veterinaria-hexamedical/).
 * Na veterinária, hélio só aparece no O-scan Vet, o único modelo veterinário cuja nota confirma "sem líquidos criogênicos/hélio".
 */

const RM_ROUTE = "/solucoes/ressonancia-magnetica";
const VET_ROUTE = "/solucoes/veterinaria";

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
  // Alt genérico: o site atual pede para corrigir fotos da linha, e o modelo exato da foto não está confirmado.
  accutron: shot("accutron-mr", 202, 561, "Bomba injetora de contraste da linha Accutron"),
  digieye: shot("digieye-350", 960, 684, "Sistema de radiografia digital Mindray DigiEye 350"),
  vet: shot("vet-mr-grande", 960, 641, "Ressonância veterinária Esaote Vet-MR Grande com um tigre posicionado"),
  hexai: shot("hexai", 400, 400, "Corte axial de coluna lombar em ressonância magnética, adquirido com varredura acelerada e SwiftMR"),
  ispace: shot("ispace-1-5t-vet", 960, 842, "Ressonância veterinária WDM i_Space 1.5T-VET"),
  turbotom: shot("turbotom-1s-vet", 960, 461, "Tomógrafo veterinário WDM TurboTom 1S-VET"),
  turbotomLite: shot("turbotom-1s-lite-vet", 960, 635, "Tomógrafo veterinário WDM TurboTom 1S LITE VET"),
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
      meta: "Medtron · Accutron",
      body: "Injetoras de contraste para ressonância magnética, tomografia e hemodinâmica.",
      href: "/solucoes/bombas-injetoras",
      image: cutouts.accutron,
    },
    {
      title: "Radiografia digital",
      meta: "DRGEM e Mindray",
      body: "Sistemas fixos e móveis e detectores digitais sem fio.",
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
      meta: "Inteligência artificial · VUNO e SwiftMR",
      body: "Módulos VUNO de apoio à análise de cérebro, tórax e idade óssea, e o SwiftMR, que acelera a aquisição dos exames de ressonância magnética.",
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
    meta: "a partir de 20 m² · 2 kW em aquisição",
    body: "Ressonância musculoesquelética, das extremidades à coluna.",
    href: "/solucoes/s-scan-open",
    image: cutouts.sScan,
  },
  "magnifico-open": {
    title: "Magnifico Open",
    meta: "cerca de 20 m² · até 3 kW",
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
  /** Regra de escolha da base comercial, mais o G-scan para exame com carga (página de produto do G-scan Open, Esaote). */
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
      { label: "Área de instalação", values: ["a partir de 9 m²", "a partir de 20 m²", "cerca de 20 m²", "a partir de 23 m²"] },
      { label: "Consumo de energia", values: ["menos de 1 kW", "2 kW em aquisição", "até 3 kW", "menos de 3 kW"] },
      { label: "Alimentação", values: ["110/220 V", "monofásica", "monofásica 220 V", "sob consulta"] },
    ],
  } satisfies CompareTableData,
  /** Da home (src/data/home.ts): o que a Hexamedical faz em torno da ressonância. */
  services: hub.services,
  faq: [
    {
      q: "Qual ressonância precisa de menos espaço?",
      a: "O O-scan SMART, instalado a partir de 9 m². O Magnifico Open pede cerca de 20 m², o S-scan Open, a partir de 20 m² e o G-scan Open, a partir de 23 m². Obra, blindagem, carga de piso e layout final são confirmados no projeto da sala.",
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

/** A linha a que o produto pertence: migalha, ação de comparar, relacionados e contato da página de produto. */
export type ProductFamily = {
  label: string;
  href: string;
  compare: { label: string; href: string };
  /** id da seção de relacionados (âncora). */
  relatedId: string;
  relatedTitle: string;
  relatedIntro: string;
  relatedLink: string;
  contactLink: string;
  /** Cards dos produtos da linha, por slug (os `related` de cada produto apontam para eles). */
  cards: Record<string, PageCard>;
};

export type ProductContent = {
  slug: string;
  name: string;
  /** Complemento do <title>: "O-scan SMART, ressonância magnética Esaote". */
  kind: string;
  family: ProductFamily;
  /** Placa técnica do hero: fabricante e linha. */
  line: string;
  description: string;
  hero: MediaImage;
  lead: string;
  /** Vazio quando o fabricante não informa números para o modelo: a faixa some. */
  facts: CompanyFact[];
  fit: { title: string; intro: string; media?: MediaImage };
  points: string[];
  specs: [string, string][];
  specSource: string;
  faq: { q: string; a: string }[];
  whatsappText: string;
  /** Slugs de `family.cards`. */
  related: string[];
};

const rmFamily: ProductFamily = {
  label: "Ressonância magnética",
  href: RM_ROUTE,
  compare: { label: "Comparar com a linha", href: `${RM_ROUTE}#comparativo` },
  relatedId: "outras-ressonancias",
  relatedTitle: "Outras ressonâncias da linha",
  relatedIntro: "Indicação, campo, área de instalação e consumo dos quatro modelos estão lado a lado no comparativo.",
  relatedLink: "Ver o comparativo da linha",
  contactLink: "Comparar a linha de RM",
  cards: rmCards,
};

export const products: Record<string, ProductContent> = {
  "o-scan-smart": {
    slug: "o-scan-smart",
    kind: "ressonância magnética Esaote",
    family: rmFamily,
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
    kind: "ressonância magnética Esaote",
    family: rmFamily,
    name: "S-scan Open",
    line: "Esaote · Ressonância musculoesquelética",
    description:
      "S-scan Open, ressonância aberta Esaote para joelho, ombro, quadril e coluna: 0,25 T, não usa hélio, instalação a partir de 20 m² e 2 kW em aquisição.",
    hero: cutouts.sScan,
    lead: "Ressonância aberta para joelho, ombro, quadril, coluna e as demais articulações. Não usa hélio e consome 2 kW em média durante a aquisição.",
    facts: [
      { value: "0,25 T", label: "campo aberto" },
      { value: "20 m²", label: "área mínima de instalação" },
      { value: "2 kW", label: "consumo médio em aquisição" },
      { value: "Sem hélio", label: "e sem risco de quench, nos materiais comerciais analisados" },
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
      ["Área de instalação", "a partir de 20 m²"],
      ["Alimentação", "monofásica"],
      ["Consumo médio em aquisição", "2 kW"],
      ["Bobinas", "joelho, punho e mão, tornozelo e pé, ombro, coluna e ATM"],
      ["Tecnologia", "eXP, SpeedUp"],
    ],
    specSource: "Dados da Esaote e da base comercial da Hexamedical",
    faq: [
      {
        q: "O S-scan Open usa hélio?",
        a: "Não. O S-scan Open não usa hélio e, nos materiais comerciais analisados, não tem risco de quench.",
      },
      {
        q: "Quanto espaço ele precisa?",
        a: "A instalação parte de 20 m², com alimentação monofásica. Layout, rede elétrica e piso são confirmados no projeto da sala, antes da compra.",
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
    kind: "ressonância magnética Esaote",
    family: rmFamily,
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

/* ---------- Modelos veterinários WDM (página de produto) ---------- */

const asset = (src: string, width: number, height: number, alt: string): MediaImage => ({ src, width, height, alt });

/** Cards dos três sistemas WDM: usados na linha veterinária e nos relacionados das páginas de produto. */
export const vetCards: Record<string, PageCard> = {
  "ispace-1-5t-vet": {
    title: "i_Space 1.5T-VET",
    meta: "Ressonância magnética · 1,5 T",
    body: "Ressonância veterinária para estudos de crânio, abdômen e sistema musculoesquelético.",
    href: "/solucoes/ispace-1-5t-vet",
    image: cutouts.ispace,
  },
  "turbotom-1s-vet": {
    title: "TurboTom 1S-VET",
    meta: "Tomografia computadorizada",
    body: "Tomografia veterinária com aquisição rápida e recursos de reconstrução descritos pela WDM.",
    href: "/solucoes/turbotom-1s-vet",
    image: cutouts.turbotom,
  },
  "turbotom-1s-lite-vet": {
    title: "TurboTom 1S LITE VET",
    meta: "Tomografia computadorizada",
    body: "Tomografia veterinária com a configuração técnica definida por projeto.",
    href: "/solucoes/turbotom-1s-lite-vet",
    image: cutouts.turbotomLite,
  },
};

const vetFamily: ProductFamily = {
  label: "Veterinária",
  href: VET_ROUTE,
  compare: { label: "Ver a linha veterinária", href: VET_ROUTE },
  relatedId: "outros-sistemas",
  relatedTitle: "Outros sistemas WDM",
  relatedIntro: "A linha veterinária reúne também a ressonância Esaote, com o O-scan Vet, o Magnifico Vet e o Vet-MR Grande.",
  relatedLink: "Ver a linha veterinária",
  contactLink: "Ver a linha veterinária",
  cards: vetCards,
};

/** Fonte: src/data/wdm.ts (folders da WDM, nas páginas indicadas em sourcePages). */
export const vetProducts: Record<string, ProductContent> = {
  "ispace-1-5t-vet": {
    slug: "ispace-1-5t-vet",
    kind: "ressonância magnética veterinária WDM",
    family: vetFamily,
    name: "i_Space 1.5T-VET",
    line: "WDM · Ressonância magnética veterinária",
    description:
      "i_Space 1.5T-VET, ressonância magnética veterinária WDM de 1,5 T e 16 canais, para estudos de crânio, abdômen e sistema musculoesquelético. Contato pela Hexamedical.",
    hero: cutouts.ispace,
    lead: "Ressonância magnética veterinária de 1,5 T, apresentada pela WDM para estudos de crânio, abdômen e sistema musculoesquelético. A implantação e os protocolos são planejados de acordo com o serviço.",
    facts: [
      { value: "1,5 T", label: "campo magnético informado pela WDM" },
      { value: "16 canais", label: "arquitetura indicada no folder" },
    ],
    fit: {
      title: "Onde o i_Space 1.5T-VET faz sentido",
      intro:
        "Em clínicas, hospitais e universidades veterinárias que querem fazer estudos de crânio, abdômen e sistema musculoesquelético. A configuração parte das espécies atendidas, das indicações e do volume de exames.",
      media: asset("/assets/wdm/ispace-1-5t-vet-detail-2.webp", 1920, 1267, "Vista em perspectiva do sistema de ressonância veterinária WDM i_Space 1.5T-VET"),
    },
    points: [
      "Estudos cranianos",
      "Estudos abdominais",
      "Estudos musculoesqueléticos",
      "Campo de 1,5 T e arquitetura de 16 canais, segundo o folder da WDM",
      "Implantação e protocolos planejados de acordo com o serviço",
    ],
    specs: [
      ["Fabricante", "WDM"],
      ["Modalidade", "ressonância magnética veterinária"],
      ["Campo magnético", "1,5 T"],
      ["Arquitetura", "16 canais"],
      ["Estudos", "crânio, abdômen e musculoesquelético"],
    ],
    specSource: "Folder da WDM (i_Space 1.5T-VET, páginas 2 a 9)",
    faq: [
      {
        q: "Com quem eu falo sobre o i_Space 1.5T-VET?",
        a: "Com a equipe da Hexamedical, pelo WhatsApp, e-mail ou telefone. A conversa começa pelas espécies atendidas, pelas indicações e pela sala disponível.",
      },
      {
        q: "Os dados técnicos valem para qualquer configuração?",
        a: "Os dados vêm do folder da WDM. Recursos, configuração e disponibilidade são confirmados para cada projeto.",
      },
    ],
    whatsappText: "Olá! Quero saber mais sobre o i_Space 1.5T-VET.",
    related: ["turbotom-1s-vet", "turbotom-1s-lite-vet"],
  },
  "turbotom-1s-vet": {
    slug: "turbotom-1s-vet",
    kind: "tomografia veterinária WDM",
    family: vetFamily,
    name: "TurboTom 1S-VET",
    line: "WDM · Tomografia computadorizada veterinária",
    description:
      "TurboTom 1S-VET, tomografia computadorizada veterinária WDM: tubo de 4 MHU, rotação de 0,5 s e cortes de 0,5 mm, segundo o folder. Contato pela Hexamedical.",
    hero: cutouts.turbotom,
    lead: "Tomografia computadorizada veterinária com aquisição rápida e recursos de reconstrução descritos pela WDM. O projeto parte do perfil de exames, do espaço e da equipe que vai operar o sistema.",
    facts: [
      { value: "4 MHU", label: "capacidade térmica do tubo indicada no folder" },
      { value: "0,5 s", label: "rotação de 360° indicada no folder" },
      { value: "0,5 mm", label: "espessura de corte indicada no folder" },
    ],
    fit: {
      title: "Onde o TurboTom 1S-VET faz sentido",
      intro:
        "Em serviços veterinários com uma rotina de tomografia exigente. Perfil de exames, sala e equipe são avaliados antes de definir a configuração.",
      media: asset("/assets/wdm/turbotom-1s-vet-detail-1.webp", 3962, 2628, "Ilustração WDM do TurboTom 1S-VET com um cão sobre a mesa de exames"),
    },
    points: [
      "Tomografia veterinária com aquisição rápida",
      "Recursos de reconstrução e análise de imagens descritos pela WDM",
      "Protocolos planejados com a equipe do serviço",
      "Tubo de 4 MHU, rotação de 360° em 0,5 s e cortes de 0,5 mm, segundo o folder",
    ],
    specs: [
      ["Fabricante", "WDM"],
      ["Modalidade", "tomografia computadorizada veterinária"],
      ["Capacidade térmica do tubo", "4 MHU"],
      ["Rotação de 360°", "0,5 s"],
      ["Espessura de corte", "0,5 mm"],
    ],
    specSource: "Folder da WDM (TurboTom 1S-VET, páginas 2 e 3)",
    faq: [
      {
        q: "Com quem eu falo sobre o TurboTom 1S-VET?",
        a: "Com a equipe da Hexamedical, pelo WhatsApp, e-mail ou telefone. A conversa começa pelo perfil de exames, pelo espaço e pela equipe que vai operar o sistema.",
      },
      {
        q: "Os dados técnicos valem para qualquer configuração?",
        a: "Os dados vêm do folder da WDM. Recursos, configuração e disponibilidade são confirmados para cada projeto.",
      },
    ],
    whatsappText: "Olá! Quero saber mais sobre o TurboTom 1S-VET.",
    related: ["turbotom-1s-lite-vet", "ispace-1-5t-vet"],
  },
  "turbotom-1s-lite-vet": {
    slug: "turbotom-1s-lite-vet",
    kind: "tomografia veterinária WDM",
    family: vetFamily,
    name: "TurboTom 1S LITE VET",
    line: "WDM · Tomografia computadorizada veterinária",
    description:
      "TurboTom 1S LITE VET, tomografia computadorizada veterinária WDM com a configuração técnica definida por projeto. Contato pela Hexamedical.",
    hero: cutouts.turbotomLite,
    lead: "Tomografia computadorizada veterinária da WDM. A configuração técnica é definida conforme a aplicação clínica e a proposta comercial, e a escolha começa pela rotina do serviço.",
    facts: [],
    fit: {
      title: "Onde o TurboTom 1S LITE VET faz sentido",
      intro: "Em serviços veterinários que querem tomografia com a configuração ajustada ao perfil de exames e ao fluxo de pacientes.",
      media: asset("/assets/wdm/turbotom-1s-lite-vet-detail-2.webp", 1559, 950, "Ilustração WDM do TurboTom 1S LITE VET com animais sobre a mesa de exames"),
    },
    points: [
      "Tomografia computadorizada veterinária",
      "Configuração técnica definida por projeto, conforme a aplicação clínica",
      "Perfil de exames e fluxo de pacientes avaliados antes da proposta",
    ],
    specs: [
      ["Fabricante", "WDM"],
      ["Modalidade", "tomografia computadorizada veterinária"],
      ["Configuração técnica", "sob consulta, definida por projeto"],
    ],
    specSource: "Folder da WDM (TurboTom 1S LITE VET, páginas 2 e 3)",
    faq: [
      {
        q: "Com quem eu falo sobre o TurboTom 1S LITE VET?",
        a: "Com a equipe da Hexamedical, pelo WhatsApp, e-mail ou telefone. A configuração parte da aplicação clínica e da rotina do serviço.",
      },
      {
        q: "Qual a diferença para o TurboTom 1S-VET?",
        a: "O folder do TurboTom 1S-VET traz os dados do tubo, da rotação e do corte. No 1S LITE VET a configuração técnica é definida por projeto, junto com a proposta.",
      },
    ],
    whatsappText: "Olá! Quero saber mais sobre o TurboTom 1S LITE VET.",
    related: ["turbotom-1s-vet", "ispace-1-5t-vet"],
  },
};

/** Todas as páginas de produto, por slug: RM Esaote e modelos veterinários WDM. */
export const productPages: Record<string, ProductContent> = { ...products, ...vetProducts };

/* ---------- Demais linhas ---------- */

/** Uma seção da página de linha: grade de cards, lista de pontos ou só o texto. */
export type LineSection = {
  id: string;
  title: string;
  intro?: string;
  media?: MediaImage;
  cards?: PageCard[];
  points?: string[];
};

export type LineContent = {
  slug: string;
  /** h1 do hero. */
  title: string;
  /** Último item da migalha. */
  crumb: string;
  /** Título da aba (sem o " | Hexamedical"). */
  docTitle: string;
  description: string;
  /** Placa técnica do hero: fabricantes e linha. */
  eyebrow: string;
  lead: string;
  hero?: MediaImage;
  /** Ação secundária do hero. */
  secondary: { label: string; href: string };
  sections: LineSection[];
  faq?: { q: string; a: string }[];
  whatsappText: string;
  contactTitle: string;
};

/** Sem arquivo de ficha técnica no repositório: cada modelo pede a ficha pelo WhatsApp, com o nome dele na mensagem. */
const injector = (title: string, body: string): PageCard => ({
  title,
  meta: "Pedir ficha técnica pelo WhatsApp",
  body,
  href: whatsappHref(`Olá! Quero receber a ficha técnica da injetora ${title}.`),
});

export const lines: Record<string, LineContent> = {
  /** Nota Injetoras Medtron Accutron + lista de modelos do site atual (/bombas-injetoras/). */
  "bombas-injetoras": {
    slug: "bombas-injetoras",
    title: "Bombas injetoras de contraste",
    crumb: "Bombas injetoras",
    docTitle: "Bombas injetoras de contraste Accutron",
    description:
      "Injetoras de contraste Medtron Accutron para ressonância magnética, tomografia e hemodinâmica: Accutron MR não magnética para salas de até 3 T, CT e CT-D para tomografia e HP 832.",
    eyebrow: "Medtron · Injetoras de contraste Accutron",
    lead: "Injetoras de contraste Medtron, da família Accutron, para ressonância magnética, tomografia e hemodinâmica. A indicação começa pelo uso: tomografia, ressonância ou angiografia e hemodinâmica.",
    hero: cutouts.accutron,
    secondary: { label: "Ver os modelos", href: "/solucoes/bombas-injetoras#ressonancia" },
    sections: [
      {
        id: "ressonancia",
        title: "Ressonância magnética",
        intro: "Injetoras para a sala de ressonância. A Accutron MR é totalmente não magnética e trabalha em salas de até 3 T.",
        cards: [
          injector("Accutron MR Compact", "Design compacto, para salas de ressonância com pouco espaço."),
          injector("Accutron MR3", "Três modos de operação."),
          injector(
            "Accutron MR",
            "Totalmente não magnética, para salas de ressonância de alto campo, até 3 T. Funciona a bateria, com controle sem fio e cabeça dupla para contraste e soro.",
          ),
          injector("MRI 880", "Alta precisão de fluxo, com controle eletrônico."),
        ],
      },
      {
        id: "tomografia",
        title: "Tomografia",
        intro: "Injetoras de cabeça simples ou dupla para a sala de tomografia.",
        cards: [
          injector("Accutron CT-D Vision", "Tela sensível ao toque, rastreabilidade e integração com RIS e PACS."),
          injector("Accutron CT", "Um canal, com cabeça simples e controle sem fio."),
          injector("Accutron CT-D", "Dois canais independentes, com cabeça dupla para contraste e soro e controle sem fio."),
          injector("CT 871", "Alta precisão de fluxo, com controle eletrônico."),
        ],
      },
      {
        id: "hemodinamica",
        title: "Hemodinâmica",
        intro: "Injetora de alta pressão para angiografia e hemodinâmica.",
        cards: [injector("HP 832", "Compacta e fácil de deslocar.")],
      },
    ],
    faq: [
      {
        q: "A injetora pode ficar dentro da sala de ressonância?",
        a: "A Accutron MR é totalmente não magnética e foi feita para salas de ressonância de até 3 T. Funciona a bateria e tem controle sem fio.",
      },
      {
        q: "Quais modelos têm cabeça dupla?",
        a: "A Accutron CT-D, na tomografia, e a Accutron MR, na ressonância, têm cabeça dupla para contraste e soro.",
      },
      {
        q: "Como eu recebo a ficha técnica de um modelo?",
        a: "Clique ou toque no modelo para abrir a conversa no WhatsApp com o nome dele, ou fale com a equipe por e-mail ou telefone.",
      },
    ],
    whatsappText: "Olá! Quero ajuda para escolher uma bomba injetora de contraste.",
    contactTitle: "Quero escolher uma injetora",
  },

  /** Notas Raio-X Digital DRGEM e Placas DR; Mindray pelo site atual (/mindray/), sem "o sistema móvel mais capaz do mercado" e sem estoque. */
  "radiografia-digital": {
    slug: "radiografia-digital",
    title: "Radiografia digital",
    crumb: "Radiografia digital",
    docTitle: "Radiografia digital DRGEM, Rayence e Mindray",
    description:
      "Radiografia digital DRGEM com detector de painel plano, geradores de 32, 40 ou 52 kW e opções móveis para o leito e a UTI; placas DR Rayence e a linha Mindray.",
    eyebrow: "DRGEM · Rayence · Mindray",
    lead: "Sistemas DRGEM de radiografia digital direta para a sala de raio-X, o leito e a UTI, placas DR Rayence e a linha Mindray. A indicação começa pelo uso: sala fixa, leito e UTI ou projeto completo.",
    secondary: { label: "Ver os sistemas DRGEM", href: "/solucoes/radiografia-digital#drgem" },
    sections: [
      {
        id: "drgem",
        title: "Sistemas DRGEM",
        intro: "A linha principal de radiografia digital da Hexamedical: sistemas DR com detector de painel plano, fixos e móveis.",
        cards: [
          { title: "XVISION-525", meta: "Sala fixa", body: "Sistema fixo de radiografia digital direta para a sala de raio-X." },
          { title: "TOPAZ", meta: "Móvel e motorizado", body: "Opção móvel e motorizada para exames à beira do leito e na UTI." },
          { title: "RAYMO", meta: "Móvel e motorizado", body: "Outra opção móvel e motorizada da DRGEM para o leito e a UTI." },
        ],
      },
      {
        id: "recursos",
        title: "O que os sistemas DRGEM trazem",
        points: [
          "Radiografia digital direta (DR), com detector de painel plano de alta sensibilidade",
          "Gerador de alta frequência de 32, 40 ou 52 kW, conforme a necessidade da clínica",
          "Software de processamento de imagem voltado à redução de dose",
          "Opções fixas para a sala de raio-X e móveis motorizadas para o leito e a UTI",
        ],
      },
      {
        id: "placas",
        title: "Placas DR Rayence",
        intro:
          "Para a radiografia com placas DR, a linha que a Hexamedical indica em projetos novos é a Rayence. Modelo e configuração são definidos com a nossa equipe.",
      },
      {
        id: "mindray",
        title: "Linha Mindray",
        intro:
          "A Hexamedical também oferece a radiografia digital Mindray, com sistemas fixos, um sistema móvel e detector sem fio. Disponibilidade e configuração são confirmadas com a equipe comercial.",
        cards: [
          {
            title: "DigiEye 350",
            meta: "Sistema fixo",
            body: "Controle por toque e sincronismo automático entre tubo e detector.",
            image: cutouts.digieye,
          },
          {
            title: "DigiEye 330",
            meta: "Sistema fixo",
            body: "Conectividade remota MiCo+.",
            image: asset("/assets/esaote/mindray-digieye-330.png", 969, 771, "Sistema de radiografia digital Mindray DigiEye 330"),
          },
          {
            title: "MobiEye 700",
            meta: "Sistema móvel",
            body: "Passa por obstáculos de 2 cm e sobe inclinações de 12°.",
            image: asset("/assets/esaote/mindray-mobieye-700.png", 819, 1024, "Sistema móvel de radiografia digital Mindray MobiEye 700"),
          },
          {
            title: "Detector sem fio",
            meta: "Detector flat panel",
            body: "CsI e TFT, 3,3 kg, resistente a líquidos e a quedas de 1 m, compatível com sistemas fixos e móveis.",
            image: asset("/assets/esaote/mindray-detector.png", 819, 1024, "Detector flat panel sem fio da Mindray"),
          },
        ],
      },
    ],
    faq: [
      {
        q: "Tem opção móvel para o leito e a UTI?",
        a: "Sim. O TOPAZ e o RAYMO, da DRGEM, são móveis e motorizados, para exames à beira do leito e na UTI. Na linha Mindray, o sistema móvel é o MobiEye 700.",
      },
      {
        q: "Qual é a potência do gerador?",
        a: "Os sistemas DRGEM têm gerador de alta frequência de 32, 40 ou 52 kW, escolhido conforme a necessidade da clínica.",
      },
      {
        q: "É radiografia digital direta?",
        a: "Sim. Os sistemas DRGEM são DR, com detector de painel plano de alta sensibilidade.",
      },
    ],
    whatsappText: "Olá! Quero ajuda para escolher um sistema de radiografia digital.",
    contactTitle: "Quero um sistema de radiografia digital",
  },

  /** Nota Densitometria: só a descrição geral confirmada, sem modelo, ficha ou número. */
  densitometria: {
    slug: "densitometria",
    title: "Densitometria óssea",
    crumb: "Densitometria",
    docTitle: "Densitometria óssea DXA",
    description:
      "Sistemas DXA de densitometria óssea, que medem a densidade mineral óssea e são essenciais no diagnóstico de osteoporose. Configuração com a equipe da Hexamedical.",
    eyebrow: "Densitometria óssea · DXA",
    lead: "Sistemas DXA que medem a densidade mineral óssea, essenciais no diagnóstico de osteoporose. A configuração é definida com a nossa equipe.",
    secondary: { label: "Ver todas as soluções", href: "/solucoes" },
    sections: [
      {
        id: "configuracao",
        title: "Configuração com a equipe",
        intro:
          "Modelo, dados técnicos e configuração do sistema DXA são definidos com a equipe da Hexamedical, a partir dos exames que a sua clínica quer oferecer. Conte a sua rotina pelo WhatsApp e peça a configuração.",
      },
    ],
    whatsappText: "Olá! Quero saber a configuração de densitometria óssea DXA para a minha clínica.",
    contactTitle: "Quero a configuração de densitometria",
  },

  /** Nota IA VUNO HexAI + SwiftMR do site atual (/hexai/), sem percentual de produtividade e sem prometer resultado clínico. */
  hexai: {
    slug: "hexai",
    title: "HexAI",
    crumb: "HexAI",
    docTitle: "HexAI, inteligência artificial para diagnóstico por imagem",
    description:
      "HexAI: SwiftMR, que acelera a aquisição dos exames de ressonância magnética em equipamentos de todas as marcas, e módulos VUNO de apoio à análise de cérebro, tórax e idade óssea.",
    eyebrow: "SwiftMR · VUNO · Inteligência artificial",
    lead: "Inteligência artificial de apoio ao diagnóstico por imagem: o SwiftMR, que acelera a aquisição dos exames de ressonância magnética, e módulos VUNO de apoio à análise de cérebro, tórax e idade óssea.",
    hero: cutouts.hexai,
    secondary: { label: "Ver a implantação", href: "/solucoes/hexai#implantacao" },
    sections: [
      {
        id: "swiftmr",
        title: "SwiftMR na ressonância magnética",
        intro: "O SwiftMR acelera a aquisição dos exames de ressonância. Os ajustes de imagem entram na configuração, durante a implantação.",
        points: [
          "Acelera a aquisição dos exames de ressonância magnética",
          "Compatível com todas as marcas e modelos de ressonância magnética",
          "Uma licença por equipamento",
          "Conexão por um gateway (PC) na mesma rede da ressonância e do PACS",
        ],
      },
      {
        id: "implantacao",
        title: "Implantação do SwiftMR",
        intro: "Cinco etapas, da vistoria ao acompanhamento do uso.",
        cards: [
          { title: "Vistoria de pré-instalação", meta: "Etapa 1", body: "Levantamento das necessidades do serviço, IP fixo e PACS." },
          { title: "Instalação e conexão", meta: "Etapa 2", body: "Gateway (PC) instalado e ligado em rede à ressonância e ao PACS." },
          { title: "Configuração do protocolo", meta: "Etapa 3", body: "Ajuste do protocolo de ressonância magnética." },
          { title: "Otimização e personalização", meta: "Etapa 4", body: "Otimização de nitidez e redução de ruído na configuração." },
          { title: "Monitoramento", meta: "Etapa 5", body: "Acompanhamento do uso e da satisfação da equipe." },
        ],
      },
      {
        id: "vuno",
        title: "Módulos VUNO",
        intro: "Ferramentas de apoio à análise e ao fluxo de trabalho da equipe. A interpretação dos exames e o laudo seguem com o médico.",
        cards: [
          { title: "DeepBrain", meta: "Cérebro", body: "Análise de volume e atrofia cerebral, como apoio na avaliação de demência e Alzheimer." },
          {
            title: "Chest X-ray",
            meta: "Radiografia de tórax",
            body: "Detecção assistida de nódulos, opacidades, pneumotórax, fibrose e outras alterações pulmonares.",
          },
          { title: "BoneAge", meta: "Idade óssea", body: "Avaliação automatizada da idade óssea." },
        ],
      },
    ],
    faq: [
      {
        q: "A HexAI substitui o radiologista?",
        a: "A HexAI apoia a análise e o fluxo de trabalho da equipe. A interpretação dos exames e o laudo seguem com o médico.",
      },
      {
        q: "O SwiftMR funciona na minha ressonância?",
        a: "O SwiftMR é compatível com todas as marcas e modelos de ressonância magnética. A vistoria de pré-instalação confere a rede, o IP fixo e o PACS do serviço.",
      },
      {
        q: "Como é o licenciamento?",
        a: "Uma licença por equipamento de ressonância.",
      },
    ],
    whatsappText: "Olá! Quero conhecer a HexAI para o meu serviço de imagem.",
    contactTitle: "Quero conhecer a HexAI",
  },

  /** Site atual (/area-veterinaria-hexamedical/), nota Linha Veterinária (fatos do Magnifico Vet e do O-Scan Vet) e src/data/wdm.ts. */
  veterinaria: {
    slug: "veterinaria",
    title: "Ressonância e tomografia veterinária",
    crumb: "Veterinária",
    docTitle: "Ressonância e tomografia veterinária",
    description:
      "Ressonância magnética veterinária Esaote (Magnifico Vet, O-scan Vet e Equine, Vet-MR Grande) e ressonância e tomografia WDM para clínicas, hospitais e universidades veterinárias, com contato pela Hexamedical.",
    eyebrow: "Esaote e WDM · Diagnóstico por imagem veterinário",
    lead: "Ressonância magnética Esaote e ressonância e tomografia WDM para clínicas, hospitais e universidades veterinárias. O contato e a manutenção são com a Hexamedical.",
    hero: asset("/assets/hexa/magnifico-vet-2.webp", 1200, 1200, "Ressonância veterinária Esaote Magnifico Vet"),
    secondary: { label: "Ver os sistemas", href: "/solucoes/veterinaria#esaote" },
    sections: [
      {
        id: "esaote",
        title: "Ressonância veterinária Esaote",
        intro: "Sistemas para pequenos animais, equinos e animais de grande porte.",
        cards: [
          {
            title: "Magnifico Vet",
            meta: "RM aberta · cerca de 20 m²",
            body: "Sistema aberto e sem criogenia, com protocolos e bobinas dedicados a animais de diferentes portes, MAR para artefatos de metal e microchips e instalação em cerca de 20 m².",
            image: asset("/assets/hexa/magnifico-vet.webp", 941, 660, "Profissional prepara o paciente na mesa da ressonância Esaote Magnifico Vet"),
            fill: true,
          },
          {
            title: "O-scan Vet e Equine",
            meta: "RM dedicada · 0,31 T",
            body: "O O-scan Vet tem ímã permanente de 0,31 T, alimentação monofásica 220 V, cerca de 1 kVA e funciona sem líquidos criogênicos nem hélio. Atende gatos e cães de pequeno porte, exóticos como aves e extremidades de equinos, como casco, boleto e carpo.",
            image: asset("/assets/hexa/oscan.webp", 600, 500, "Ressonância veterinária Esaote O-scan Equine"),
          },
          {
            title: "Vet-MR Grande",
            meta: "RM veterinária",
            body: "Projetada com médicos veterinários, para animais de grande e pequeno porte. Configuração sob consulta com a nossa equipe.",
            image: cutouts.vet,
            fill: true,
          },
        ],
      },
      {
        id: "wdm",
        title: "Ressonância e tomografia WDM",
        intro: "Sistemas WDM para medicina veterinária, com contato pela Hexamedical.",
        cards: Object.values(vetCards),
      },
      {
        id: "manutencao",
        title: "Manutenção e laboratório",
        intro: "A Hexamedical também cuida da manutenção dos equipamentos veterinários.",
        points: [
          "Manutenção em todo o território nacional, avulsa ou por contrato, com ou sem peças",
          "Laboratório de eletrônica para bobinas, fontes, placas e periféricos",
        ],
      },
    ],
    faq: [
      {
        q: "O O-scan Vet usa hélio?",
        a: "Não. O O-scan Vet, de ímã permanente de 0,31 T, funciona sem líquidos criogênicos nem hélio, com alimentação monofásica 220 V e cerca de 1 kVA.",
      },
      {
        q: "Quanto espaço o Magnifico Vet precisa?",
        a: "A instalação fica em cerca de 20 m². Layout e rede elétrica são confirmados no projeto da sala.",
      },
      {
        q: "Com quem eu falo sobre os sistemas WDM?",
        a: "Com a equipe da Hexamedical, pelo WhatsApp, e-mail ou telefone, como para os sistemas Esaote.",
      },
      {
        q: "A Hexamedical faz a manutenção dos equipamentos veterinários?",
        a: "Sim. Fazemos manutenção em todo o território nacional, avulsa ou por contrato, com ou sem peças, e temos laboratório de eletrônica para bobinas, fontes, placas e periféricos.",
      },
    ],
    whatsappText: "Olá! Quero conhecer a linha veterinária da Hexamedical.",
    contactTitle: "Quero um equipamento veterinário",
  },
};
