/** Folga para a borda laranja do palco aparecer em volta do vídeo. */
const RIM_GAP = 3;

/**
 * O círculo do vídeo do hero no mesmo referencial do anel do palco: a viewport.
 * aperture em metades da menor dimensão; cx em fração da largura a partir do centro.
 * Retorna raio e centro em pixels, relativos ao topo e à esquerda da viewport.
 */
/** No celular o vídeo começa num círculo com esta fração da altura do banner. */
const BANNER_CIRCLE = 0.9;
/** Raio dos cantos do banner aberto (`--radius-md`). */
const BANNER_RADIUS = 14;
/** Folga do anel do palco além da diagonal: aberto, ele sai do banner. */
const RING_OVERSHOOT = 1.15;

/**
 * Celular: o círculo que vira banner. `circle()` e `inset()` não se interpolam, então o círculo é
 * um `inset` quadrado com cantos de meia largura, e o recorte, os cantos e o anel do palco
 * caminham juntos com `open` (0 = círculo, 1 = banner inteiro). Medidas em px da caixa do banner.
 */
export function bannerClip({ width, height, open }: { width: number; height: number; open: number }) {
  const t = Math.min(1, Math.max(0, open));
  const diameter = BANNER_CIRCLE * height;
  const lerp = (from: number, to: number) => from + (to - from) * t;
  const top = lerp((height - diameter) / 2, 0);
  const side = lerp((width - diameter) / 2, 0);
  const radius = lerp(diameter / 2, BANNER_RADIUS);
  const ring = lerp(diameter / 2, (Math.hypot(width, height) / 2) * RING_OVERSHOOT);
  return { top, side, radius, ring, css: `inset(${top}px ${side}px round ${radius}px)` };
}

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
