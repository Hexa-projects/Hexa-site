/**
 * Mídia da home, gerada por scripts/build-home-media.sh a partir do acervo do site oficial.
 * Proveniência em public/media/home/SOURCES.md.
 */
export type MediaImage = { src: string; width: number; height: number; alt: string };
export type MediaVideo = { mp4: string; webm?: string; poster: string; width: number; height: number; label: string };
export type StageId = "escolha" | "projeto" | "instalacao" | "operacao" | "manutencao" | "laboratorio";

const base = "/media/home";

export const homeMedia: {
  tunnel: { desktop: MediaVideo; mobile: MediaVideo };
  ceo: MediaVideo;
  testimonials: MediaVideo;
  stages: Record<StageId, MediaImage>;
} = {
  tunnel: {
    desktop: {
      mp4: `${base}/tunel-1280.mp4`,
      webm: `${base}/tunel-1280.webm`,
      poster: `${base}/tunel-poster.webp`,
      width: 1280,
      height: 720,
      label: "Sistema de ressonância magnética Esaote Magnifico Open em sala de exame",
    },
    mobile: {
      mp4: `${base}/tunel-720x900.mp4`,
      poster: `${base}/tunel-poster-720x900.webp`,
      width: 720,
      height: 900,
      label: "Sistema de ressonância magnética Esaote Magnifico Open em sala de exame",
    },
  },
  ceo: {
    mp4: `${base}/ceo-1280.mp4`,
    poster: `${base}/ceo-poster.webp`,
    width: 1280,
    height: 720,
    label: "Entrevista com o CEO da Hexamedical sobre o mercado de equipamentos de diagnóstico por imagem",
  },
  testimonials: {
    mp4: `${base}/depoimentos-540x960.mp4`,
    poster: `${base}/depoimentos-poster.webp`,
    width: 540,
    height: 960,
    label: "Depoimentos gravados em feira do setor: por que confiar na Hexamedical",
  },
  stages: {
    escolha: {
      src: `${base}/etapa-escolha.webp`,
      width: 600,
      height: 402,
      alt: "Profissionais operando o Magnifico Open com um paciente posicionado na mesa",
    },
    projeto: {
      src: `${base}/etapa-projeto.webp`,
      width: 554,
      height: 359,
      alt: "Sala de comando com estação de trabalho e visor para a sala de exame",
    },
    instalacao: {
      src: `${base}/etapa-instalacao.webp`,
      width: 1280,
      height: 853,
      alt: "Equipamento de ressonância aberto durante desinstalação, com ferramentas de medição sobre a mesa",
    },
    operacao: {
      src: `${base}/etapa-operacao.webp`,
      width: 400,
      height: 400,
      alt: "Corte axial de coluna lombar em varredura acelerada com SwiftMR, apresentado pelo HexAI",
    },
    manutencao: {
      src: `${base}/etapa-manutencao.webp`,
      width: 1000,
      height: 1000,
      alt: "Técnicos de campo com equipamento de proteção conferindo um checklist",
    },
    laboratorio: {
      src: `${base}/etapa-laboratorio.webp`,
      width: 1280,
      height: 853,
      alt: "Reparo de placa eletrônica com ferro de solda na bancada do laboratório",
    },
  },
};
