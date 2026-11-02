/** Folga para a borda laranja do palco aparecer em volta do vídeo. */
const RIM_GAP = 3;

/**
 * O círculo do vídeo do hero no mesmo referencial do anel do palco: a viewport.
 * aperture em metades da menor dimensão; cx em fração da largura a partir do centro.
 * Retorna raio e centro em pixels, relativos ao topo e à esquerda da viewport.
 */
export function heroClip({
  aperture,
  cx,
  viewportWidth,
  viewportHeight,
}: {
  aperture: number;
  cx: number;
  viewportWidth: number;
  viewportHeight: number;
}): { radius: number; x: number; y: number } {
  const unit = 0.5 * Math.min(viewportWidth, viewportHeight);
  return {
    radius: Math.max(0, aperture * unit - RIM_GAP),
    x: viewportWidth * (0.5 + cx),
    y: viewportHeight / 2,
  };
}
