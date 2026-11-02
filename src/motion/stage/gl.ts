import { FULLSCREEN_VERT, RING_TUNNEL_FRAG } from "./ringTunnel.frag";
import type { StageParams } from "./stageState";

export interface Stage {
  resize(width: number, height: number, dpr: number): void;
  render(params: StageParams, time: number, dpr: number): void;
  dispose(): void;
}

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`shader: ${log}`);
  }
  return shader;
}

/** Cria o programa do túnel num quad de tela cheia. Retorna null se o WebGL não existir. */
export function createStage(canvas: HTMLCanvasElement): Stage | null {
  let gl: WebGLRenderingContext | null = null;
  try {
    gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power", preserveDrawingBuffer: false });
  } catch {
    gl = null;
  }
  if (!gl) return null;

  const program = gl.createProgram();
  if (!program) return null;
  try {
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, FULLSCREEN_VERT));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, RING_TUNNEL_FRAG));
  } catch {
    return null;
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const pos = gl.getAttribLocation(program, "a_pos");
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

  const u = (name: string) => gl!.getUniformLocation(program, name);
  const loc = {
    res: u("u_res"),
    time: u("u_time"),
    progress: u("u_progress"),
    aperture: u("u_aperture"),
    rings: u("u_rings"),
    glow: u("u_glow"),
    tint: u("u_tint"),
    pointer: u("u_pointer"),
    center: u("u_center"),
  };

  return {
    resize(width, height, dpr) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      gl!.viewport(0, 0, canvas.width, canvas.height);
    },
    render(params, time, dpr) {
      const g = gl!;
      g.uniform2f(loc.res, canvas.width, canvas.height);
      g.uniform1f(loc.time, time);
      g.uniform1f(loc.progress, params.progress);
      g.uniform1f(loc.aperture, params.aperture);
      g.uniform1f(loc.rings, params.rings);
      g.uniform1f(loc.glow, params.glow);
      g.uniform3f(loc.tint, params.tint[0], params.tint[1], params.tint[2]);
      g.uniform2f(loc.pointer, params.pointer[0] * dpr, params.pointer[1] * dpr);
      g.uniform2f(loc.center, params.center[0], params.center[1]);
      g.drawArrays(g.TRIANGLES, 0, 3);
    },
    dispose() {
      gl!.deleteBuffer(buffer);
      gl!.deleteProgram(program);
      gl!.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}
