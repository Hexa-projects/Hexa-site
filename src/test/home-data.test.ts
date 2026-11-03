import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { homeMedia, type MediaImage, type MediaVideo } from "@/data/homeMedia";

const publicPath = (src: string) => path.join(process.cwd(), "public", src);

/** Lê largura e altura do cabeçalho de um WebP (VP8, VP8L ou VP8X). */
function readWebpSize(file: string): { width: number; height: number } {
  const b = fs.readFileSync(file);
  const chunk = b.toString("ascii", 12, 16);
  if (chunk === "VP8X") return { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) };
  if (chunk === "VP8L") {
    const bits = b.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
}

const images: MediaImage[] = [
  ...Object.values(homeMedia.stages),
];
const videos: MediaVideo[] = [homeMedia.tunnel.desktop, homeMedia.tunnel.mobile, homeMedia.ceo, homeMedia.testimonials];

describe("mídia da home", () => {
  it("toda imagem existe com o tamanho declarado", () => {
    for (const image of images) {
      expect(fs.existsSync(publicPath(image.src)), image.src).toBe(true);
      expect(readWebpSize(publicPath(image.src)), image.src).toEqual({ width: image.width, height: image.height });
      expect(image.alt.length, image.src).toBeGreaterThan(10);
    }
  });

  it("todo vídeo e pôster existe", () => {
    for (const video of videos) {
      for (const src of [video.mp4, video.webm, video.poster].filter(Boolean) as string[]) {
        expect(fs.existsSync(publicPath(src)), src).toBe(true);
      }
      expect(readWebpSize(publicPath(video.poster)), video.poster).toEqual({ width: video.width, height: video.height });
    }
  });

  it("a abertura usa o vídeo em banner 16:9 em qualquer tela, sem recorte vertical", () => {
    for (const video of [homeMedia.tunnel.desktop, homeMedia.tunnel.mobile]) {
      expect(video.width / video.height, video.mp4).toBeCloseTo(16 / 9, 3);
    }
  });

  it("no desktop o vídeo da abertura tem a resolução da fonte (1920 × 1080)", () => {
    expect([homeMedia.tunnel.desktop.width, homeMedia.tunnel.desktop.height]).toEqual([1920, 1080]);
  });

  it("o vídeo do túnel cabe no orçamento de peso", () => {
    expect(fs.statSync(publicPath(homeMedia.tunnel.desktop.mp4)).size).toBeLessThanOrEqual(2_500_000);
    expect(fs.statSync(publicPath(homeMedia.tunnel.mobile.mp4)).size).toBeLessThanOrEqual(1_500_000);
  });

  it("cobre as seis etapas da vida do equipamento", () => {
    expect(Object.keys(homeMedia.stages)).toEqual(["escolha", "projeto", "instalacao", "operacao", "manutencao", "laboratorio"]);
  });
});
