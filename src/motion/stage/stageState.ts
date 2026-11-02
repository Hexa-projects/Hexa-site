export type StageParams = {
  /** Avanço da câmera pelo túnel, 0 a 1. */
  progress: number;
  /** Raio da abertura, em metades da menor dimensão da tela. */
  aperture: number;
  /** Densidade dos anéis. */
  rings: number;
  /** Intensidade da luz do cursor e do halo. */
  glow: number;
  /** Cor da borda da abertura (RGB 0–1). */
  tint: [number, number, number];
  /** Posição do cursor em pixels do canvas (origem embaixo à esquerda). */
  pointer: [number, number];
  /** Deslocamento do centro do anel, em fração da tela. */
  center: [number, number];
};

const ORANGE: [number, number, number] = [0.973, 0.459, 0.09];

/**
 * Estado mutável lido a cada quadro pelo palco. Timelines do GSAP escrevem aqui
 * diretamente, sem re-render do React.
 */
export const stageState = {
  params: {
    progress: 0,
    aperture: 0.36,
    rings: 20,
    glow: 0.6,
    tint: ORANGE,
    pointer: [-9999, -9999],
    center: [0, 0],
  } as StageParams,
  set(partial: Partial<StageParams>) {
    Object.assign(this.params, partial);
  },
};
