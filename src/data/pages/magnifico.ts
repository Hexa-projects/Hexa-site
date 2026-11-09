import type { MediaImage } from "@/data/homeMedia";
import type { CompanyFact } from "@/data/home";
import type { PageCard } from "@/components/page/CardGrid";
import { rmCards, type CompareTableData } from "@/data/pages/solutions";

/**
 * Página-vitrine do Magnifico Open (/solucoes/magnifico-open).
 * Fontes, nesta ordem:
 * - Esaote, "Magnifico Open: System description and configuration", rev. 2, outubro de 2022 (PD, página do PDF entre parênteses);
 * - Esaote, brochura "Magnifico Open" (160000334MA ver. 02) (BR, página do PDF entre parênteses);
 * - base comercial da Hexamedical (nota Magnifico Open do segundo cérebro): monofásica 220 V e a cobertura clínica em porcentagem.
 * Área: "cerca de 20 m²" (PD p5, "about 20 sqmt"; BR p10, ímã e blindagem em 20 m²). O "até 20 m²" da base comercial não é usado.
 * Consumo: "até 3 kW" (BR p10, "maximum 3 Kw"; PD p5, 3.000 VA sem monitor e PC). Mesmos valores na linha de RM e na home.
 */

const RM_ROUTE = "/solucoes/ressonancia-magnetica";

const still = (id: string, alt: string): MediaImage => ({ src: `/media/magnifico/${id}.webp`, width: 1600, height: 900, alt });

export const magnificoMedia = {
  equipment: still("magnifico-equipamento", "Ressonância Esaote Magnifico Open com a mesa do paciente estendida, em sala de exame"),
  laser: still("magnifico-painel-laser", "Painel do Magnifico Open com os comandos de trava da mesa e de laser para centralizar a bobina"),
  console: still("magnifico-console", "Profissionais analisam imagens de coluna no console, com o Magnifico Open ao fundo"),
};

export const magnifico = {
  title: "Magnifico Open, ressonância magnética aberta Esaote",
  description:
    "Magnifico Open, ressonância aberta de corpo inteiro da Esaote: 0,4 T com ímã permanente, não usa hélio, instalação em cerca de 20 m², até 3 kW e alimentação monofásica 220 V.",
  name: "Magnifico Open",
  line: "Esaote · Ressonância magnética aberta de corpo inteiro",
  lead: "Ressonância aberta de corpo inteiro, com ímã permanente de 0,4 T. Não usa hélio, é instalada em cerca de 20 m² e funciona em rede monofásica 220 V, com consumo de até 3 kW.",
  whatsappText: "Olá! Quero saber mais sobre o Magnifico Open.",
  compare: { label: "Comparar com a linha", href: `${RM_ROUTE}#comparativo` },

  /** A cena do vídeo: os três dados que entram em sequência. */
  scene: {
    title: "Três dados do Magnifico Open",
    intro: "Campo magnético, hélio e área de instalação, no vídeo oficial da Esaote.",
    credit: "Vídeo: Esaote Magnifico Open",
    facts: [
      { value: "0,4 T", label: "campo vertical de ímã permanente de neodímio" },
      { value: "Sem hélio", label: "sem criogênicos e sem refrigeração a água" },
      { value: "cerca de 20 m²", label: "para o ímã e a blindagem de radiofrequência" },
    ] satisfies CompanyFact[],
  },

  open: {
    title: "Aberta e de corpo inteiro",
    intro:
      "O ímã tem formato de C e deixa o exame aberto. A mesa desliza até o ímã, e o laser no topo do equipamento ajuda a centralizar a bobina.",
    points: [
      "Ímã permanente de neodímio em C, com campo vertical de 0,4 T",
      "Abertura de 37 cm, com 34 cm entre a mesa e o polo superior",
      "Mesa deslizante para pacientes de até 200 kg e até 200 cm",
      "Oito bobinas de recepção com reconhecimento automático: coluna cervical, lombar e torácica, ombro, joelho, mão e punho, tornozelo e pé",
      "Pacote opcional de cabeça, com bobina transparente de quatro canais, e bobina opcional de ATM",
      "Desenho aberto, indicado pela Esaote para pacientes com claustrofobia e para crianças",
    ],
  },

  coverage: {
    title: "Cobertura clínica",
    intro: "Musculoesquelético, coluna, neuro e parte dos exames de abdome e pelve. A porcentagem é da base comercial da Hexamedical; as observações vêm da descrição de produto da Esaote.",
    table: {
      caption: "Cobertura clínica do Magnifico Open",
      source:
        "porcentagens da base comercial da Hexamedical; observações da descrição de produto Magnifico Open, Esaote, rev. 2 (outubro de 2022)",
      columns: [{ label: "Cobertura" }, { label: "Observação" }],
      rows: [
        { label: "Musculoesquelético", values: ["100%", "Extremidades e articulações, com bobinas de ombro, joelho, mão e punho, tornozelo e pé"] },
        {
          label: "Coluna e canal vertebral",
          values: ["87,5%", "Cervical, torácica e lombossacra; a torácica inteira pode pedir mais de uma aquisição, conforme a altura do paciente"],
        },
        { label: "Neuro", values: ["parte relevante", "Com o pacote opcional de cabeça, que traz a bobina e as sequências dedicadas ao cérebro"] },
        { label: "Abdome e pelve", values: ["parcial", "A pelve está entre as regiões indicadas pela Esaote"] },
      ],
    } satisfies CompareTableData,
  },

  acquisition: {
    title: "Recursos de aquisição",
    intro: "O pacote EVO eXP vem de série, com placa de vídeo dedicada à reconstrução e as sequências rápidas da Esaote.",
    points: [
      "True-Motion: aquisição dinâmica, em tempo real, da articulação em movimento, que complementa o exame estático e pode ser salva em vídeo",
      "Speed-Up 2D e 3D: reduz o tempo de aquisição em até 30% nas sequências 2D e em até 50% nas 3D",
      "MAR: sequências que reduzem o artefato de suscetibilidade causado por implantes metálicos",
      "Redução de TR nas sequências fast spin echo, com menos tempo de exame",
      "Sequências 3D isotrópicas, com reconstrução em qualquer plano",
      "Protocolos sugeridos para todas as regiões do uso indicado",
    ],
  },

  installation: {
    title: "Instalação e consumo",
    intro:
      "Com ímã permanente, o Magnifico Open não usa hélio e consome até 3 kW. A Hexamedical confirma obra, blindagem, carga de piso e layout final no projeto da sala, antes da compra.",
    points: [
      "Ímã e blindagem de radiofrequência em cerca de 20 m²; no exemplo de instalação da Esaote, 4,40 m por 4,50 m",
      "Alimentação monofásica 220 V e consumo de até 3 kW",
      "Não usa hélio: sem criogênicos e sem refrigeração a água",
      "Gaiola de blindagem de 90 dB ou mais, projetada para cada sala",
      "Módulo de compensação magnética de série, que pode permitir a instalação perto de elevadores, trens e outras fontes de variação do campo externo",
    ],
  },

  specs: [
    ["Fabricante", "Esaote"],
    ["Campo magnético", "0,4 T, vertical"],
    ["Ímã", "permanente, de neodímio, em C"],
    ["Hélio", "não usa"],
    ["Gradiente", "22 mT/m, slew rate de 76 T/m/s"],
    ["Abertura", "37 cm (34 cm entre a mesa e o polo superior)"],
    ["Campo de visão", "38 cm"],
    ["Matriz", "até 512 x 512"],
    ["Mesa", "pacientes de até 200 kg e 200 cm"],
    ["Bobinas de série", "8, com reconhecimento automático"],
    ["Área de instalação", "cerca de 20 m²"],
    ["Alimentação", "monofásica 220 V"],
    ["Consumo", "até 3 kW"],
    ["Recursos", "True-Motion, Speed-Up 2D e 3D, MAR, redução de TR"],
  ] as [string, string][],
  specSource:
    "Esaote, descrição de produto Magnifico Open rev. 2 (outubro de 2022) e brochura Magnifico Open; alimentação monofásica da base comercial da Hexamedical",

  faq: [
    {
      q: "O Magnifico Open usa hélio?",
      a: "Não. O ímã é permanente, então não há hélio, criogênicos nem refrigeração a água.",
    },
    {
      q: "Quanto espaço ele precisa?",
      a: "Cerca de 20 m² para o ímã e a blindagem, segundo a Esaote. Obra, blindagem, carga de piso e layout final são confirmados no projeto da sala, antes da compra.",
    },
    {
      q: "Ele faz exames de cabeça?",
      a: "Sim, com o pacote opcional de cabeça da Esaote, que traz uma bobina transparente de quatro canais e sequências dedicadas ao cérebro.",
    },
    {
      q: "E pacientes com implantes metálicos?",
      a: "A Esaote informa que o sistema tem baixa suscetibilidade ao metal e que as sequências MAR reduzem o artefato causado pela maioria dos implantes. A indicação de cada exame segue a avaliação do médico responsável.",
    },
    {
      q: "Quem instala e faz a manutenção?",
      a: "A Hexamedical. Projetamos a sala, instalamos, treinamos a equipe e fazemos a manutenção preventiva e corretiva em todo o país, com laboratório próprio para reparo de bobinas, placas e fontes.",
    },
  ],

  related: {
    title: "Outras ressonâncias da linha",
    intro: "Indicação, campo, área de instalação e consumo dos quatro modelos estão lado a lado no comparativo.",
    link: { label: "Ver a linha de ressonância magnética", href: RM_ROUTE },
    cards: ["s-scan-open", "o-scan-smart", "g-scan"].map((slug) => rmCards[slug]) satisfies PageCard[],
  },
};
