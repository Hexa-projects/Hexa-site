import { describe, expect, it } from "vitest";
import { decideStageMode, FPS_FLOOR } from "@/motion/capability";

const healthy = { reducedMotion: false, saveData: false, webgl: true, cores: 8, viewportWidth: 1440 };

describe("decideStageMode", () => {
  it.each([
    ["movimento reduzido", { reducedMotion: true }],
    ["economia de dados", { saveData: true }],
    ["sem WebGL", { webgl: false }],
    ["menos de 4 núcleos", { cores: 2 }],
    ["tela abaixo de 1024 px", { viewportWidth: 800 }],
  ])("usa o modo leve com %s", (_, override) => {
    expect(decideStageMode({ ...healthy, ...override })).toBe("light");
  });

  it("usa o modo imersivo num desktop saudável", () => {
    expect(decideStageMode(healthy)).toBe("immersive");
  });

  it("trata número de núcleos desconhecido como suficiente", () => {
    expect(decideStageMode({ ...healthy, cores: undefined })).toBe("immersive");
  });

  it("aceita exatamente 4 núcleos e 1024 px", () => {
    expect(decideStageMode({ ...healthy, cores: 4, viewportWidth: 1024 })).toBe("immersive");
  });

  it("rebaixa abaixo de 45 fps", () => {
    expect(FPS_FLOOR).toBe(45);
  });
});
