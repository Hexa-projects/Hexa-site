import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StageCanvas from "@/motion/stage/StageCanvas";
import { stageState } from "@/motion/stage/stageState";
import { RING_TUNNEL_FRAG } from "@/motion/stage/ringTunnel.frag";

describe("palco", () => {
  it("no modo leve desenha os anéis estáticos e nenhum canvas", () => {
    const { container } = render(<StageCanvas mode="light" />);
    expect(container.querySelector(".stage-fallback")).toBeInTheDocument();
    expect(container.querySelector("canvas")).toBeNull();
  });

  it("sem WebGL, o modo imersivo cai sozinho para a reserva escondida de leitores de tela", () => {
    const { container } = render(<StageCanvas mode="immersive" />);
    const fallback = container.querySelector(".stage-fallback");
    expect(fallback).toBeInTheDocument();
    expect(fallback).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("canvas")).toBeNull();
  });

  it("stageState.set mescla sem perder os outros parâmetros", () => {
    const rings = stageState.params.rings;
    stageState.set({ progress: 0.5 });
    expect(stageState.params.progress).toBe(0.5);
    expect(stageState.params.rings).toBe(rings);
  });

  it("o shader declara todos os uniforms que o palco envia", () => {
    for (const uniform of ["u_res", "u_time", "u_progress", "u_aperture", "u_rings", "u_glow", "u_tint", "u_pointer", "u_center"]) {
      expect(RING_TUNNEL_FRAG).toContain(`uniform`);
      expect(RING_TUNNEL_FRAG).toMatch(new RegExp(`uniform\\s+\\w+\\s+${uniform};`));
    }
  });
});
