#!/usr/bin/env bash
# Gera a mídia da home a partir do acervo oficial (hexamedical.com.br).
# Entrada: media-src/oficial/ (vídeos e imagens baixados do site oficial) e public/assets/.
# Saída: public/media/home/. Requer FFmpeg e Python com Pillow.
set -euo pipefail
cd "$(dirname "$0")/.."

SRC=media-src/oficial
OUT=public/media/home
mkdir -p "$OUT"
FF="ffmpeg -v error -y"

# Túnel: dois trechos sem texto queimado do vídeo oficial do Magnifico Open. Abre no plano frontal
# (16,8–19,6 s: equipamento e paciente) e segue para a vista lateral (7,8–9,95 s).
TUNNEL_SRC="$SRC/10213-web.mp4"
TUNNEL_FILTER="[0:v]trim=16.8:19.6,setpts=PTS-STARTPTS[a];[0:v]trim=7.8:9.95,setpts=PTS-STARTPTS[b];[a][b]xfade=transition=fade:duration=0.4:offset=2.4,format=yuv420p"

# Sempre 16:9 (banner). No desktop o vídeo ocupa a tela inteira, então sai na resolução da fonte (1920 × 1080)
# com taxa alta; abaixo de 1024 px, 1280 × 720. A fonte tem 2,1 Mbps: este é o teto de nitidez possível.
$FF -i "$TUNNEL_SRC" -filter_complex "$TUNNEL_FILTER" -an \
  -c:v libx264 -preset slower -crf 17 -tune film -profile:v high -movflags +faststart "$OUT/tunel-1920.mp4"
$FF -i "$TUNNEL_SRC" -filter_complex "$TUNNEL_FILTER" -an \
  -c:v libvpx-vp9 -b:v 0 -crf 24 -row-mt 1 "$OUT/tunel-1920.webm"
$FF -i "$TUNNEL_SRC" -filter_complex "$TUNNEL_FILTER,scale=1280:720:flags=lanczos" -an \
  -c:v libx264 -preset slower -crf 19 -tune film -profile:v high -movflags +faststart "$OUT/tunel-1280.mp4"
$FF -i "$TUNNEL_SRC" -filter_complex "$TUNNEL_FILTER,scale=1280:720:flags=lanczos" -an \
  -c:v libvpx-vp9 -b:v 0 -crf 27 -row-mt 1 "$OUT/tunel-1280.webm"
$FF -ss 18 -i "$TUNNEL_SRC" -frames:v 1 "$OUT/tunel-poster-1920.png"
$FF -ss 18 -i "$TUNNEL_SRC" -frames:v 1 -vf scale=1280:720:flags=lanczos "$OUT/tunel-poster.png"

# CEO: vídeo institucional completo, com legendas já queimadas no original.
$FF -i "$SRC/V3-1920-x-1080-Horizontal-1.mp4" -vf scale=1280:720 \
  -c:v libx264 -preset slow -crf 27 -profile:v high -c:a aac -b:a 96k -movflags +faststart "$OUT/ceo-1280.mp4"

# Depoimentos: o original é vertical dentro de 16:9; recorta a coluna central.
$FF -i "$SRC/Hexamedical-Video-site-2.mp4" -vf "crop=604:1074:658:3,scale=540:960" \
  -c:v libx264 -preset slow -crf 27 -profile:v high -c:a aac -b:a 96k -movflags +faststart "$OUT/depoimentos-540x960.mp4"
$FF -ss 9 -i "$SRC/Hexamedical-Video-site-2.mp4" -frames:v 1 -vf "crop=604:1074:658:3,scale=540:960" "$OUT/depoimentos-poster.png"

# Pôsteres e fotos das etapas em WebP, no máximo 1200 px de largura.
python - <<'PY'
from pathlib import Path
from PIL import Image

out = Path("public/media/home")
jobs = {
    "tunel-poster-1920.webp": out / "tunel-poster-1920.png",
    "tunel-poster.webp": out / "tunel-poster.png",
    "depoimentos-poster.webp": out / "depoimentos-poster.png",
    "ceo-poster.webp": Path("media-src/oficial/capa-video-fabio-1.png"),
    "etapa-escolha.webp": Path("public/assets/hexa/Foto-Solucao-ideal-com-baixo-risco.png"),
    "etapa-projeto.webp": Path("media-src/oficial/estrutura-1.png"),
    "etapa-instalacao.webp": Path("public/assets/hexa/Desinstalacao-e-Instalacao.webp"),
    "etapa-manutencao.webp": Path("media-src/oficial/Imagem-manutencao.png"),
    "etapa-laboratorio.webp": Path("public/assets/hexa/Reparo-de-Pecas-e-Eletronicas-foto.webp"),
}
for name, src in jobs.items():
    im = Image.open(src).convert("RGB")
    # O pôster do desktop acompanha o vídeo em tela cheia; o resto fica em até 1280 px.
    cap = 1920 if name == "tunel-poster-1920.webp" else 1280
    if im.width > cap:
        im = im.resize((cap, round(im.height * cap / im.width)), Image.LANCZOS)
    im.save(out / name, "WEBP", quality=82, method=6)
    print(f"{name} {im.width}x{im.height} {(out / name).stat().st_size // 1024}k")
# Showroom: fotos oficiais de produto achatadas sobre branco, no máximo 960 px.
show = out / "showroom"
show.mkdir(exist_ok=True)
products = {
    "magnifico-open": "public/assets/hexa/magnifico-open.jpg",
    "s-scan-open": "public/assets/esaote/s-scan-open.webp",
    "o-scan-smart": "public/assets/esaote/o-scan-smart.webp",
    "g-scan-open": "public/assets/esaote/g-scan-open.webp",
    "vet-mr-grande": "public/assets/hexa/Esaote-Grande-VET-MR.png",
    "ispace-1-5t-vet": "public/assets/wdm/ispace-1-5t-vet-hero.webp",
    "turbotom-1s-vet": "public/assets/wdm/turbotom-1s-vet-hero-clean.webp",
    "turbotom-1s-lite-vet": "public/assets/wdm/turbotom-1s-lite-vet-hero.webp",
    "accutron-mr": "public/assets/esaote/bombas-accutron-mr.png",
    "digieye-350": "public/assets/esaote/mindray-digieye-350.png",
}
full_bleed = {"vet-mr-grande"}
for name, src in products.items():
    im = Image.open(src).convert("RGBA")
    flat = Image.new("RGBA", im.size, (255, 255, 255, 255))
    flat.alpha_composite(im)
    flat = flat.convert("RGB")
    if name not in full_bleed:
        # Corta a sobra branca em volta do equipamento e deixa 4% de margem.
        mask = flat.convert("L").point(lambda v: 255 if v < 244 else 0)
        box = mask.getbbox()
        if box:
            m = round(max(box[2] - box[0], box[3] - box[1]) * 0.04)
            flat = flat.crop((max(0, box[0] - m), max(0, box[1] - m), min(flat.width, box[2] + m), min(flat.height, box[3] + m)))
    if flat.width > 960:
        flat = flat.resize((960, round(flat.height * 960 / flat.width)), Image.LANCZOS)
    flat.save(show / f"{name}.webp", "WEBP", quality=84, method=6)
    print(f"showroom/{name}.webp {flat.width}x{flat.height} {(show / f'{name}.webp').stat().st_size // 1024}k")
# Operação: só o painel "Varredura acelerada + SwiftMR" (com o hexágono do HexAI), que preenche o círculo.
panel = Image.open("media-src/oficial/varredura-hexai.png").convert("RGB").crop((1430, 405, 1830, 805))
panel.save(out / "etapa-operacao.webp", "WEBP", quality=86, method=6)
panel.save(show / "hexai.webp", "WEBP", quality=86, method=6)
print(f"etapa-operacao.webp {panel.width}x{panel.height}")  # 400x400

for tmp in out.glob("*.png"):
    tmp.unlink()
PY

ls -la "$OUT"
