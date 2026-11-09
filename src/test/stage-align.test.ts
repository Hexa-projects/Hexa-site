import { describe, expect, it } from "vitest";
import { circleToStage } from "@/motion/stage/align";

const box = { width: 1440, height: 900 };

describe("circleToStage", () => {
  it("um círculo no centro da tela vira centro zero e raio em meias-dimensões", () => {
    expect(circleToStage(720, 450, 225, box)).toEqual({ center: [0, 0], aperture: 0.5 });
  });

  it("acima e à esquerda do centro vira x negativo e y positivo (o eixo do shader sobe)", () => {
    expect(circleToStage(360, 225, 90, box)).toEqual({ center: [-0.25, 0.25], aperture: 0.2 });
  });
});
