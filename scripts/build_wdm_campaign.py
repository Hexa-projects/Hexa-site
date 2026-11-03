"""Build the two WDM veterinary CT folders and matching social posts.

All product imagery and technical claims come from the official WDM brochures.
The current Lite brochure repeats 1S-VET body copy, so Lite material is marked
preliminary and makes no comparative or model-specific performance claim.
"""

from argparse import ArgumentParser
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
from reportlab.graphics import renderPDF
from reportlab.graphics.barcode import qr
from reportlab.graphics.shapes import Drawing
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader, simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "assets" / "wdm"
PDF_OUT = ROOT / "output" / "pdf"
POST_OUT = ROOT / "output" / "social" / "wdm"
PDF_OUT.mkdir(parents=True, exist_ok=True)
POST_OUT.mkdir(parents=True, exist_ok=True)

FONT_REG = Path(r"C:\Windows\Fonts\arial.ttf")
FONT_BOLD = Path(r"C:\Windows\Fonts\arialbd.ttf")
pdfmetrics.registerFont(TTFont("ArialWDM", str(FONT_REG)))
pdfmetrics.registerFont(TTFont("ArialWDMBold", str(FONT_BOLD)))

INK = "#12242C"
MUTED = "#5E7077"
CYAN = "#087F89"
PALE_CYAN = "#DDEFF0"
ORANGE = "#F37021"
PAPER = "#F3F6F5"
WHITE = "#FFFFFF"
MM = 72 / 25.4

SHARED_FEATURES = [
    ("Tubo de 4 MHU", "Rolamento de metal líquido e alta dissipação térmica."),
    ("Rotação de 0,5 s", "Aquisição de 360 graus e reconstrução rápida."),
    ("Cortes de 0,5 mm", "Varredura de camada fina e imagem de alta resolução."),
    ("Imagem com baixo ruído", "Detector de baixo ruído e algoritmo Image-Clarity."),
    ("Fluxo veterinário", "Protocolos para animais e interface multilíngue."),
    ("Processamento paralelo", "Registro, aquisição, reconstrução e arquivo em paralelo."),
]

ITEMS = [
    {
        "slug": "turbotom-1s-vet",
        "name": "TurboTom 1S-VET",
        "headline": "Precisão para a rotina de tomografia veterinária.",
        "intro": (
            "Sistema de tomografia computadorizada veterinária apresentado pela WDM "
            "para combinar aquisição rápida, imagem de alta definição e fluxo dedicado."
        ),
        "image": "turbotom-1s-vet-hero-clean.webp",
        "detail": "turbotom-1s-vet-detail-1.webp",
        "url": "https://www.hexamedical.com.br/solucoes/turbotom-1s-vet/",
        "preliminary": False,
    },
    {
        "slug": "turbotom-1s-lite-vet",
        "name": "TurboTom 1S LITE VET",
        "headline": "Tomografia veterinária conectada ao fluxo clínico.",
        "intro": (
            "Apresentação preliminar baseada no brochure WDM disponível. Os dados "
            "técnicos devem ser reconfirmados quando o material corrigido for recebido."
        ),
        "image": "turbotom-1s-lite-vet-hero.webp",
        "detail": "turbotom-1s-lite-vet-detail-2.webp",
        "url": "https://www.hexamedical.com.br/solucoes/turbotom-1s-lite-vet/",
        "preliminary": True,
    },
]


def pdf_text(c, text, x, y, width, size, leading, color=INK, bold=False, max_lines=None):
    font = "ArialWDMBold" if bold else "ArialWDM"
    lines = simpleSplit(text, font, size, width)
    if max_lines and len(lines) > max_lines:
        raise ValueError(f"Text overflows {max_lines} lines: {text}")
    c.setFont(font, size)
    c.setFillColor(HexColor(color))
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def pdf_fit_image(c, image_path, box, contain=True):
    x, y, w, h = box
    with Image.open(image_path) as source:
        rgba = source.convert("RGBA")
        flattened = Image.new("RGBA", rgba.size, "white")
        flattened.alpha_composite(rgba)
        im = flattened.convert("RGB")
        iw, ih = im.size
        ratio = min(w / iw, h / ih) if contain else max(w / iw, h / ih)
        if contain:
            nw, nh = iw * ratio, ih * ratio
            c.drawImage(
                ImageReader(im), x + (w - nw) / 2, y + (h - nh) / 2,
                width=nw, height=nh, mask="auto",
            )
        else:
            crop_w, crop_h = w / ratio, h / ratio
            left = max(0, int((iw - crop_w) / 2))
            top = max(0, int((ih - crop_h) / 2))
            crop = im.crop((left, top, min(iw, int(left + crop_w)), min(ih, int(top + crop_h))))
            c.drawImage(ImageReader(crop), x, y, width=w, height=h, mask="auto")


def pdf_brand_bar(c, width, height):
    c.setFillColor(HexColor(WHITE))
    c.rect(0, height - 35 * MM, width, 35 * MM, stroke=0, fill=1)
    pdf_fit_image(c, ASSETS / "hexamedical-logo.png", (15 * MM, height - 25 * MM, 75 * MM, 17 * MM))
    c.setStrokeColor(HexColor("#CDD7D8"))
    c.line(105 * MM, height - 25 * MM, 105 * MM, height - 10 * MM)
    pdf_fit_image(c, ASSETS / "wdm-logo.png", (120 * MM, height - 22 * MM, 70 * MM, 11 * MM))
    c.setFillColor(HexColor(CYAN))
    c.rect(0, height - 35 * MM, width * 0.72, 1.4 * MM, stroke=0, fill=1)
    c.setFillColor(HexColor(ORANGE))
    c.rect(width * 0.72, height - 35 * MM, width * 0.28, 1.4 * MM, stroke=0, fill=1)


def pdf_qr(c, url, x, y, size):
    code = qr.QrCodeWidget(url)
    x0, y0, x1, y1 = code.getBounds()
    drawing = Drawing(size, size, transform=[size / (x1 - x0), 0, 0, size / (y1 - y0), 0, 0])
    drawing.add(code)
    renderPDF.draw(drawing, c, x, y)


def make_pdf(item):
    out = PDF_OUT / f"folder-wdm-{item['slug']}-a4-frente-verso.pdf"
    c = canvas.Canvas(str(out), pagesize=A4, pageCompression=1)
    c.setTitle(f"{item['name']} | WDM + Hexamedical | Folder A4 frente e verso")
    c.setAuthor("Hexamedical")
    w, h = A4

    # Frente
    c.setFillColor(HexColor(PAPER))
    c.rect(0, 0, w, h, stroke=0, fill=1)
    pdf_brand_bar(c, w, h)
    pdf_text(c, "TOMOGRAFIA COMPUTADORIZADA VETERINÁRIA", 16 * MM, h - 49 * MM, w - 32 * MM, 8.4, 11, CYAN, True, 1)
    if item["preliminary"]:
        c.setFillColor(HexColor(ORANGE))
        c.roundRect(w - 69 * MM, h - 54 * MM, 53 * MM, 8 * MM, 2 * MM, stroke=0, fill=1)
        pdf_text(c, "MATERIAL PRELIMINAR", w - 65 * MM, h - 51.6 * MM, 45 * MM, 7.2, 9, WHITE, True, 1)
    pdf_text(c, item["name"], 16 * MM, h - 65 * MM, w - 32 * MM, 28, 33, INK, True, 1)
    pdf_text(c, item["headline"], 16 * MM, h - 79 * MM, w - 32 * MM, 13.8, 18, INK, False, 2)
    pdf_text(c, item["intro"], 16 * MM, h - 98 * MM, w - 32 * MM, 9.3, 13, MUTED, False, 3)
    c.setFillColor(HexColor(WHITE))
    c.roundRect(13 * MM, 72 * MM, w - 26 * MM, 111 * MM, 3 * MM, stroke=0, fill=1)
    pdf_fit_image(c, ASSETS / item["image"], (20 * MM, 79 * MM, w - 40 * MM, 98 * MM))
    c.setFillColor(HexColor(INK))
    c.roundRect(13 * MM, 27 * MM, w - 26 * MM, 36 * MM, 2 * MM, stroke=0, fill=1)
    specs = [("4 MHU", "TUBO"), ("0,5 s / 360 graus", "ROTAÇÃO"), ("0,5 mm", "CORTE")]
    col_w = (w - 34 * MM) / 3
    for index, (value, label) in enumerate(specs):
        x = 19 * MM + index * col_w
        if index:
            c.setStrokeColor(HexColor("#496068"))
            c.line(x - 6 * MM, 35 * MM, x - 6 * MM, 55 * MM)
        pdf_text(c, value, x, 48 * MM, col_w - 7 * MM, 13, 16, WHITE, True, 1)
        pdf_text(c, label, x, 38 * MM, col_w - 7 * MM, 6.8, 9, "#9ED3D5", True, 1)
    note = "Dados preliminares: confirmar no brochure WDM corrigido." if item["preliminary"] else "Especificações apresentadas pela WDM no brochure oficial."
    pdf_text(c, note, 16 * MM, 17 * MM, w - 32 * MM, 7.2, 9, MUTED, False, 1)
    c.showPage()

    # Verso
    c.setFillColor(HexColor(INK))
    c.rect(0, 0, w, h, stroke=0, fill=1)
    c.setFillColor(HexColor(ORANGE))
    c.rect(0, h - 6 * MM, w, 6 * MM, stroke=0, fill=1)
    pdf_text(c, "RECURSOS APRESENTADOS PELA WDM", 16 * MM, h - 22 * MM, 112 * MM, 8.2, 11, "#93D0D2", True, 1)
    pdf_text(c, "Imagem e fluxo pensados para a medicina veterinária.", 16 * MM, h - 38 * MM, 120 * MM, 22, 27, WHITE, True, 2)
    pdf_fit_image(c, ASSETS / item["detail"], (143 * MM, h - 60 * MM, 51 * MM, 42 * MM), contain=False)
    c.setFillColor(HexColor(WHITE))
    c.roundRect(13 * MM, 75 * MM, w - 26 * MM, 145 * MM, 3 * MM, stroke=0, fill=1)
    card_w, card_h = 83 * MM, 37 * MM
    for index, (title, body) in enumerate(SHARED_FEATURES):
        row, col = divmod(index, 2)
        x = 20 * MM + col * 91 * MM
        y = 174 * MM - row * 44 * MM
        c.setFillColor(HexColor(PALE_CYAN if index % 3 == 0 else PAPER))
        c.roundRect(x, y, card_w, card_h, 2 * MM, stroke=0, fill=1)
        c.setFillColor(HexColor(ORANGE if index % 2 == 0 else CYAN))
        c.circle(x + 7 * MM, y + 27 * MM, 2.2 * MM, stroke=0, fill=1)
        pdf_text(c, title, x + 13 * MM, y + 27 * MM, card_w - 18 * MM, 10, 13, INK, True, 2)
        pdf_text(c, body, x + 7 * MM, y + 16 * MM, card_w - 14 * MM, 7.6, 10.2, MUTED, False, 3)
    c.setFillColor(HexColor(WHITE))
    c.rect(0, 0, w, 64 * MM, stroke=0, fill=1)
    pdf_text(c, "VR para visualização tridimensional", 16 * MM, 51 * MM, 125 * MM, 11.2, 14, INK, True, 1)
    pdf_text(c, "Segundo a WDM, a reconstrução volumétrica auxilia a visualizar estruturas e relações espaciais.", 16 * MM, 41 * MM, 124 * MM, 8.3, 11.5, MUTED, False, 3)
    pdf_text(c, "Conheça o sistema", 16 * MM, 22 * MM, 70 * MM, 10, 13, CYAN, True, 1)
    pdf_text(c, item["url"], 16 * MM, 14 * MM, 132 * MM, 6.8, 9, MUTED, False, 1)
    pdf_qr(c, item["url"], 159 * MM, 17 * MM, 33 * MM)
    pdf_text(c, "APONTE A CÂMERA", 160 * MM, 10 * MM, 34 * MM, 6.4, 8, MUTED, True, 1)
    footer = "PRELIMINAR - revisar após o novo brochure WDM." if item["preliminary"] else "Material informativo. Configuração e disponibilidade sob consulta."
    pdf_text(c, footer, 16 * MM, 6 * MM, 133 * MM, 6.1, 8, ORANGE if item["preliminary"] else MUTED, item["preliminary"], 1)
    c.showPage()
    c.save()
    return out


def pil_lines(draw, text, font, max_width):
    result, line = [], ""
    for word in text.split():
        candidate = f"{line} {word}".strip()
        if draw.textbbox((0, 0), candidate, font=font)[2] <= max_width:
            line = candidate
        else:
            if line:
                result.append(line)
            line = word
    if line:
        result.append(line)
    return result


def post_text(draw, xy, text, font, fill, max_width, spacing, max_lines=None):
    x, y = xy
    lines = pil_lines(draw, text, font, max_width)
    if max_lines and len(lines) > max_lines:
        raise ValueError(f"Post text overflows {max_lines} lines: {text}")
    for line in lines:
        draw.text((x, y), line, font=font, fill=fill)
        y += spacing
    return y


def pil_contain(image_path, max_size):
    with Image.open(image_path) as source:
        im = source.convert("RGBA")
    im.thumbnail(max_size, Image.Resampling.LANCZOS)
    return im


def make_post(item):
    out = POST_OUT / f"post-wdm-{item['slug']}-1080x1350.png"
    width, height = 1080, 1350
    im = Image.new("RGB", (width, height), PAPER)
    d = ImageDraw.Draw(im)
    d.rectangle((0, 0, width, 158), fill=WHITE)
    hexa = pil_contain(ASSETS / "hexamedical-logo.png", (430, 92))
    im.paste(hexa, (60, 34), hexa)
    wdm = pil_contain(ASSETS / "wdm-logo.png", (300, 62))
    im.paste(wdm, (width - 60 - wdm.width, 48), wdm)
    d.line((627, 42, 627, 117), fill="#CBD6D7", width=2)
    d.rectangle((0, 152, 760, 160), fill=CYAN)
    d.rectangle((760, 152, width, 160), fill=ORANGE)
    kicker = ImageFont.truetype(str(FONT_BOLD), 26)
    title = ImageFont.truetype(str(FONT_BOLD), 68)
    headline = ImageFont.truetype(str(FONT_REG), 37)
    stat = ImageFont.truetype(str(FONT_BOLD), 35)
    label = ImageFont.truetype(str(FONT_BOLD), 18)
    small = ImageFont.truetype(str(FONT_BOLD), 23)
    d.text((66, 205), "TOMOGRAFIA VETERINÁRIA  /  WDM", font=kicker, fill=CYAN)
    if item["preliminary"]:
        d.rounded_rectangle((745, 198, 1017, 238), radius=12, fill=ORANGE)
        d.text((770, 207), "MATERIAL PRELIMINAR", font=label, fill=WHITE)
    post_text(d, (62, 256), item["name"], title, INK, 955, 76, 1)
    post_text(d, (66, 346), item["headline"], headline, INK, 910, 48, 2)
    d.rounded_rectangle((58, 470, 1022, 1018), radius=18, fill=WHITE)
    product = pil_contain(ASSETS / item["image"], (890, 500))
    im.paste(product, ((width - product.width) // 2, 742 - product.height // 2), product)
    d.rounded_rectangle((58, 1041, 1022, 1215), radius=16, fill=INK)
    specs = [("4 MHU", "TUBO"), ("0,5 s / 360 graus", "ROTAÇÃO"), ("0,5 mm", "CORTE")]
    for index, (value, caption) in enumerate(specs):
        x = 92 + index * 313
        if index:
            d.line((x - 27, 1070, x - 27, 1187), fill="#476169", width=2)
        d.text((x, 1080), value, font=stat, fill=WHITE)
        d.text((x, 1134), caption, font=label, fill="#9BD0D2")
    attribution = "DADOS PRELIMINARES - CONFIRMAR COM A WDM" if item["preliminary"] else "ESPECIFICAÇÕES APRESENTADAS PELA WDM"
    d.text((92, 1180), attribution, font=label, fill=ORANGE if item["preliminary"] else "#C5D6D7")
    d.rectangle((0, 1244, width, height), fill=INK)
    d.text((66, 1278), "CONHEÇA O SISTEMA", font=small, fill=WHITE)
    d.rectangle((799, 1293, 997, 1299), fill=ORANGE)
    im.save(out, optimize=True, dpi=(300, 300))
    return out


def main():
    parser = ArgumentParser()
    parser.add_argument("slugs", nargs="*", choices=[item["slug"] for item in ITEMS])
    args = parser.parse_args()
    selected = [item for item in ITEMS if not args.slugs or item["slug"] in args.slugs]
    for item in selected:
        print(make_pdf(item))
        print(make_post(item))


if __name__ == "__main__":
    main()
