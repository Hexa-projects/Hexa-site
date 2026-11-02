/**
 * O anel e o túnel: o bore da ressonância visto de dentro.
 * Anéis concêntricos em perspectiva (profundidade 1/r), linhas de campo radiais,
 * a borda laranja da abertura e uma luz que segue o cursor. Todo procedural.
 * Unidade espacial: metade da menor dimensão da tela (u_aperture = 1 cobre a tela curta).
 */
export const RING_TUNNEL_FRAG = /* glsl */ `
precision mediump float;

uniform vec2 u_res;
uniform float u_time;
uniform float u_progress;
uniform float u_aperture;
uniform float u_rings;
uniform float u_glow;
uniform vec3 u_tint;
uniform vec2 u_pointer;
uniform vec2 u_center;

const vec3 GROUND = vec3(0.047, 0.055, 0.063);
const vec3 STEEL = vec3(0.86, 0.89, 0.90);
const float TAU = 6.2831853;

void main() {
  float m = min(u_res.x, u_res.y);
  vec2 c = u_res * 0.5 + u_center * u_res;
  vec2 p = (gl_FragCoord.xy - c) / (0.5 * m);
  float r = max(length(p), 1e-4);
  float a = atan(p.y, p.x);
  float pxUnit = 2.0 / m;

  // Anéis: espaçamento uniforme em profundidade, então se adensam rumo ao centro.
  float density = u_rings * 0.22;
  float coord = density / r + u_progress * 5.0 + u_time * 0.035;
  float f = fract(coord);
  float d = min(f, 1.0 - f);
  float footprint = pxUnit * density / (r * r);
  float ring = smoothstep(footprint * 1.6, 0.0, d - footprint * 0.15);
  ring *= smoothstep(0.55, 0.12, footprint);

  // Linhas de campo, finas e raras.
  float lines = 72.0;
  float fa = fract(a / TAU * lines + u_time * 0.004);
  float da = min(fa, 1.0 - fa);
  float angFootprint = pxUnit / r * lines / TAU;
  float radial = smoothstep(angFootprint * 1.2, 0.0, da) * smoothstep(0.9, 0.25, angFootprint);

  // Só existe túnel fora da abertura; some suavemente na borda da tela.
  float outside = smoothstep(u_aperture, u_aperture + 0.06, r);
  float falloff = smoothstep(2.6, 0.5, r);

  // Luz do cursor.
  vec2 lp = (u_pointer - c) / (0.5 * m);
  float light = exp(-dot(p - lp, p - lp) * 2.4);

  vec3 col = GROUND;
  float steel = (ring * (0.16 + 0.75 * light * u_glow) + radial * (0.035 + 0.18 * light * u_glow)) * outside * falloff;
  col += STEEL * steel;

  // Borda da abertura em laranja de sinal, com halo curto.
  float edge = abs(r - u_aperture);
  float rim = smoothstep(pxUnit * 2.2, 0.0, edge) * step(0.001, u_aperture);
  float halo = exp(-edge * 16.0) * 0.22 * outside;
  col += u_tint * (rim * 0.95 + halo * u_glow);

  // Vinheta para assentar o palco.
  col *= mix(0.55, 1.0, smoothstep(2.4, 0.3, r));
  gl_FragColor = vec4(col, 1.0);
}
`;

export const FULLSCREEN_VERT = /* glsl */ `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;
