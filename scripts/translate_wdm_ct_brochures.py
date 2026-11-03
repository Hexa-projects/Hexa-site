"""Build complete, editorial PT-BR adaptations of the two WDM CT brochures.

The originals are used only for their product and clinical imagery. All visible
English copy is retypeset in Portuguese and checked against the source text.
"""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

from PIL import Image
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
TMP = ROOT / "tmp" / "pdfs" / "wdm_ct_ptbr"
OUT = ROOT / "output" / "pdf"
POPPLER = Path(
    r"C:\Users\lucas\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin\pdftoppm.exe"
)
W, H = 1208, 825
PAGE_COUNT = 6
INK = colors.HexColor("#142632")
MUTED = colors.HexColor("#5c6e79")
BLUE = colors.HexColor("#3e8dc5")
CYAN = colors.HexColor("#94d8df")
RED = colors.HexColor("#db1727")
PALE = colors.HexColor("#eef7fa")
RULE = colors.HexColor("#d4e4e9")


def setup_fonts() -> None:
    font_dir = Path(r"C:\Windows\Fonts")
    pdfmetrics.registerFont(TTFont("Arial", str(font_dir / "arial.ttf")))
    pdfmetrics.registerFont(TTFont("Arial-Bold", str(font_dir / "arialbd.ttf")))
    pdfmetrics.registerFontFamily("Arial", normal="Arial", bold="Arial-Bold")


def para(c: canvas.Canvas, value: str, x: float, top: float, width: float,
         *, size: float = 16, leading: float | None = None, color=MUTED,
         bold: bool = False, max_height: float | None = None) -> float:
    style = ParagraphStyle(
        "body", fontName="Arial-Bold" if bold else "Arial", fontSize=size,
        leading=leading or size * 1.42, textColor=color, alignment=TA_LEFT,
        spaceAfter=0, allowWidows=0, allowOrphans=0,
    )
    p = Paragraph(value, style)
    _, h = p.wrap(width, H)
    if max_height is not None and h > max_height + 0.5:
        raise ValueError(f"Text exceeds box: {h:.1f} > {max_height:.1f}: {value[:90]}")
    p.drawOn(c, x, H - top - h)
    return h


def text(c: canvas.Canvas, value: str, x: float, top: float, size: float,
         color=INK, bold: bool = False) -> None:
    c.setFont("Arial-Bold" if bold else "Arial", size)
    c.setFillColor(color)
    c.drawString(x, H - top - size, value)


def panel(c: canvas.Canvas, x: float, top: float, width: float, height: float,
          fill=colors.white, stroke=RULE, radius: float = 13) -> None:
    c.setFillColor(fill)
    c.setStrokeColor(stroke)
    c.setLineWidth(0.9)
    c.roundRect(x, H - top - height, width, height, radius, fill=1, stroke=1)


def image(c: canvas.Canvas, source: Path, box: tuple[float, float, float, float],
          x: float, top: float, width: float, height: float, *, contain=False) -> None:
    """Crop by normalized source-page coordinates (reference raster: 1400x956)."""
    with Image.open(source) as img:
        sx, sy = img.width / 1400, img.height / 956
        crop = img.crop(tuple(round(v * (sx if i % 2 == 0 else sy)) for i, v in enumerate(box)))
        crop = crop.convert("RGB")
        target = TMP / f"crop_{source.stem}_{int(box[0])}_{int(box[1])}_{int(box[2])}_{int(box[3])}.jpg"
        if not target.exists():
            crop.save(target, "JPEG", quality=94, optimize=True, subsampling=0)
        if contain:
            ratio = min(width / crop.width, height / crop.height)
            dw, dh = crop.width * ratio, crop.height * ratio
            x += (width - dw) / 2
            top += (height - dh) / 2
            width, height = dw, dh
        c.drawImage(str(target), x, H - top - height, width=width, height=height, mask="auto")


def page_base(c: canvas.Canvas, model: str, page: int, section: str) -> None:
    c.setFillColor(colors.white)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(CYAN)
    c.rect(0, H - 6, W, 6, fill=1, stroke=0)
    text(c, section.upper(), 905, 27, 11, MUTED, True)
    c.setStrokeColor(RULE)
    c.setLineWidth(1)
    c.line(55, 53, W - 55, 53)
    c.line(55, 44, W - 55, 44)
    footer = (
        "Tradução do material WDM: miolo original cita 1S-VET; confirmar dados do LITE"
        if "LITE" in model and page > 1 else
        f"TurboTom {model}  |  Tradução técnica adaptada do material WDM"
    )
    text(c, footer, 55, 795, 9.5, MUTED)
    text(c, f"{page:02d} / {PAGE_COUNT:02d}", 1080, 795, 10, MUTED, True)


def render_source(source: Path, key: str) -> list[Path]:
    TMP.mkdir(parents=True, exist_ok=True)
    prefix = TMP / f"{key}-300"
    images = [TMP / f"{key}-300-{n}.png" for n in range(1, 5)]
    if not all(p.exists() for p in images):
        subprocess.run(
            [str(POPPLER), "-f", "1", "-l", "4", "-r", "300", "-png", str(source), str(prefix)],
            check=True, capture_output=True,
        )
    if not all(p.exists() for p in images):
        raise FileNotFoundError(f"Could not render all pages of {source}")
    return images


def cover(c: canvas.Canvas, model: str, pages: list[Path]) -> None:
    page_base(c, model, 1, "Visão geral")
    text(c, "TOMOGRAFIA COMPUTADORIZADA VETERINÁRIA", 55, 92, 15, BLUE, True)
    para(c, f"TurboTom<br/>{model}", 55, 137, 560, size=48, leading=57, color=INK, bold=True, max_height=125)
    c.setFillColor(RED)
    c.rect(55, H - 288, 65, 4, fill=1, stroke=0)
    para(c, "Imagem de precisão para cuidar melhor dos animais.", 55, 315, 485,
         size=27, leading=35, color=INK, max_height=100)
    para(c,
         "A WDM desenvolve produtos e soluções avançados e confiáveis para a medicina veterinária, "
         "com base em mais de 70 anos de experiência em tecnologia médica para uso humano e em "
         "rigoroso controle de qualidade. A empresa afirma respeitar toda forma de vida e trabalhar "
         "para melhorar continuamente a qualidade do cuidado animal.",
         55, 442, 468, size=15.2, leading=22, max_height=176)
    panel(c, 55, 646, 435, 104, fill=PALE, stroke=PALE)
    para(c, "Sistema de tomografia computadorizada por raios X para aplicações veterinárias.",
         76, 661, 392, size=15, leading=20, color=INK, bold=True, max_height=47)
    if "LITE" in model:
        para(c, "O miolo do original cita 1S-VET: validar a configuração LITE com a WDM.",
             76, 708, 392, size=11.5, leading=16, color=RED, max_height=36)
    image(c, pages[0], (710, 275, 1400, 842), 565, 104, 640, 640, contain=True)
    c.showPage()


def performance(c: canvas.Canvas, model: str, pages: list[Path]) -> None:
    page_base(c, model, 2, "Desempenho e imagem")
    text(c, "ALTO DESEMPENHO", 55, 89, 42, BLUE, True)
    text(c, "Aquisição rápida, imagem em alta definição", 55, 145, 25, INK)
    para(c,
         "Segundo a WDM, o tubo com mancal de metal líquido e alta dissipação de calor oferece "
         "potência para varreduras consistentes. O detector de ultrabaixo ruído e o algoritmo "
         "Image-Clarity, descrito como redução de ruído por superposição e iteração, buscam "
         "equilibrar baixa dose e alta definição. O fabricante associa essa combinação a "
         "diagnósticos clínicos precisos. A plataforma inteligente simplifica a operação "
         "e apoia análises detalhadas.",
         55, 210, 420, size=15.1, leading=22, max_height=235)
    image(c, pages[1], (555, 135, 1325, 725), 455, 182, 700, 405, contain=True)
    # The source illustration touches the English page headline at its left edge.
    # Mask only that leftover text, above the animal/product photograph.
    c.setFillColor(colors.white)
    c.rect(500, H - 182 - 94, 132, 94, fill=1, stroke=0)
    features = [
        ("4 MHU", "Tubo com mancal de metal líquido", "Dissipação térmica elevada e menor desgaste do sistema."),
        ("0,5 s / 360°", "Rotação rápida", "Varredura ágil e reconstrução rápida, conforme a WDM."),
        ("0,5 mm", "Aquisição de corte fino", "Imagens de alta resolução, descritas como de milhões de pixels."),
        ("Baixa dose", "Tecnologia de imagem", "Detector de baixo ruído e algoritmo de redução de ruído."),
    ]
    for i, (metric, heading, body) in enumerate(features):
        x = 55 + i * 278
        panel(c, x, 609, 260, 151, fill=PALE, stroke=PALE, radius=9)
        text(c, metric, x + 17, 623, 24, BLUE, True)
        para(c, heading, x + 17, 659, 225, size=14, leading=18, color=INK, bold=True, max_height=40)
        para(c, body, x + 17, 699, 225, size=12, leading=17, max_height=52)
    c.showPage()


def bearing(c: canvas.Canvas, model: str, pages: list[Path]) -> None:
    page_base(c, model, 3, "Tubo e operação")
    text(c, "MANCAL DE METAL LÍQUIDO", 55, 87, 40, BLUE, True)
    para(c, "Estabilidade para rotinas de exames contínuos e de maior volume.",
         55, 139, 1090, size=21, leading=28, color=INK, max_height=55)
    image(c, pages[2], (0, 120, 330, 410), 43, 212, 345, 320, contain=True)
    cards = [
        ("Menor desgaste", "Segundo a WDM, durante a rotação do ânodo o mancal de metal líquido opera com atrito muito baixo. Isso reduz vibração, ruído e calor, diminui o desgaste do sistema e pode prolongar a vida útil do tubo."),
        ("Alta dissipação de calor", "O metal líquido preenche os espaços entre rotor e mancal, amplia a área de condução térmica e favorece a troca de calor em todo o conjunto, sustentando a demanda de exames contínuos."),
        ("Alta eficiência", "O material informa que o tubo não exige tempo de partida. Isso reduz o tempo total de varredura do paciente e torna o exame mais eficiente."),
        ("Operação com menos ruído", "Rotor e mancais imersos em metal líquido giram de forma suave, com menos vibração e ruído durante o funcionamento, proporcionando um ambiente de exame mais tranquilo ao paciente."),
    ]
    positions = [(430, 205), (810, 205), (430, 470), (810, 470)]
    for (heading, body), (x, y) in zip(cards, positions):
        panel(c, x, y, 345, 234)
        text(c, heading, x + 18, y + 18, 20, INK, True)
        c.setFillColor(CYAN)
        c.rect(x + 18, H - y - 51, 58, 3, fill=1, stroke=0)
        para(c, body, x + 18, y + 64, 307, size=14, leading=21, max_height=151)
    panel(c, 55, 677, 325, 63, fill=PALE, stroke=PALE)
    para(c, "Recursos e desempenho sujeitos à configuração contratada.", 73, 695, 290,
         size=12, leading=16, color=INK, max_height=40)
    c.showPage()


def workflow(c: canvas.Canvas, model: str, pages: list[Path]) -> None:
    page_base(c, model, 4, "Software e fluxo clínico")
    text(c, "EXCLUSIVO, EFICIENTE E VERSÁTIL", 55, 88, 39, BLUE, True)
    para(c, "Ferramentas de processamento e tarefas paralelas para a rotina veterinária.",
         55, 143, 1090, size=21, leading=27, color=INK, max_height=55)
    items = [
        ("Sistema de aquisição veterinária", "O material descreve um sistema exclusivo e eficiente, com desenho centrado no usuário, protocolos específicos para animais e interface multilíngue."),
        ("Processamento paralelo", "Cadastro, aquisição, reconstrução, pós-processamento e arquivamento podem operar em fluxos independentes e simultâneos. O fabricante informa ganho de eficiência de até 300%, sem especificar a base comparativa."),
        ("Fluxo duplo inteligente", "Durante o posicionamento, é possível cadastrar o paciente e ajustar parâmetros. Um operador pode monitorar e preparar o exame em paralelo; segundo a WDM, isso aumenta a eficiência e pode reduzir riscos anestésicos."),
        ("Reconstrução volumétrica (VR)", "Após exame com contraste, a reconstrução VR permite visualizar tumores abdominais e sua relação espacial com os órgãos próximos. O folder também mostra reconstrução 3D de cálculo renal."),
    ]
    for i, (heading, body) in enumerate(items):
        top = 212 + i * 132
        panel(c, 55, top, 548, 118, fill=PALE if i % 2 == 0 else colors.white)
        text(c, f"0{i + 1}", 73, top + 17, 17, BLUE, True)
        para(c, heading, 112, top + 15, 468, size=19, leading=24, color=INK, bold=True, max_height=27)
        para(c, body, 112, top + 47, 468, size=12.1, leading=16.5, max_height=66)
    panel(c, 635, 212, 517, 514, fill=colors.white)
    image(c, pages[2], (760, 350, 1000, 490), 661, 235, 222, 180, contain=True)
    image(c, pages[2], (1075, 350, 1265, 490), 898, 235, 220, 180, contain=True)
    text(c, "FLUXO EM ETAPAS", 661, 445, 15, BLUE, True)
    stages = ["Cadastro", "Aquisição", "Reconstrução", "Pós-processamento", "Arquivamento"]
    for i, stage in enumerate(stages):
        y = 478 + i * 38
        panel(c, 661, y, 458, 31, fill=PALE, stroke=PALE, radius=5)
        text(c, f"{i + 1:02d}", 674, y + 5, 12, BLUE, True)
        text(c, stage, 711, y + 4, 13, INK, True)
    text(c, "Interface e processamento ilustrados no material WDM", 659, 692, 11, MUTED)
    c.showPage()


def clinical_examples(c: canvas.Canvas, model: str, pages: list[Path]) -> None:
    page_base(c, model, 5, "Exemplos de imagem")
    text(c, "RECONSTRUÇÃO E VISUALIZAÇÃO", 55, 88, 39, BLUE, True)
    para(c, "Os seis exemplos clínicos e suas legendas, conforme o material original da WDM.",
         55, 143, 1090, size=21, leading=27, color=INK, max_height=55)
    panel(c, 55, 215, 325, 515)
    image(c, pages[2], (765, 660, 1002, 896), 73, 240, 288, 322, contain=True)
    para(c, "Sistema e interface de fluxo de trabalho", 76, 582, 285,
         size=18, leading=23, color=INK, bold=True, max_height=52)
    para(c, "Imagem ilustrativa do scanner e da estação de operação exibidos no folder.",
         76, 640, 285, size=13, leading=18, max_height=60)
    examples = [
        ((1075, 632, 1166, 700), "Abdome axial - imagem 1"),
        ((1170, 632, 1276, 700), "Abdome sagital"),
        ((1075, 713, 1166, 781), "Abdome coronal"),
        ((1170, 713, 1276, 794), "Tumor abdominal - 3D"),
        ((1075, 813, 1166, 880), "Abdome axial - imagem 2"),
        ((1170, 813, 1276, 880), "Cálculo renal - 3D"),
    ]
    # Both originals use the same six clinical cases. The 1S-VET export preserves
    # them more sharply than the compressed LITE export; hardware photos stay model-specific.
    clinical_gallery = (
        render_source(Path(r"C:\Users\lucas\Downloads\Turbotom 1S-VET Brochure.pdf"), "1s-vet")[2]
        if "LITE" in model else pages[2]
    )
    for i, (crop, label) in enumerate(examples):
        col, row = i % 3, i // 3
        x, y = 405 + col * 250, 215 + row * 242
        panel(c, x, y, 235, 223)
        image(c, clinical_gallery, crop, x + 17, y + 15, 201, 146, contain=True)
        para(c, label, x + 17, y + 172, 201, size=14.5, leading=19,
             color=INK, bold=True, max_height=43)
    para(c, "As imagens são exemplos do fabricante; interpretação e aplicação dependem do contexto clínico.",
         405, 710, 735, size=11.5, leading=16, max_height=32)
    c.showPage()


def service(c: canvas.Canvas, model: str, pages: list[Path]) -> None:
    page_base(c, model, 6, "Imagens e suporte")
    text(c, "SERVIÇO GLOBAL", 55, 88, 39, BLUE, True)
    para(c, "Imagens de referência e a estrutura de suporte apresentada pela WDM.",
         55, 143, 1090, size=21, leading=27, color=INK, max_height=55)
    panel(c, 55, 211, 525, 533)
    gallery_page = (
        render_source(Path(r"C:\Users\lucas\Downloads\Turbotom 1S-VET Brochure.pdf"), "1s-vet")[3]
        if "LITE" in model else pages[3]
    )
    image(c, gallery_page, (125, 136, 570, 820), 72, 225, 490, 485, contain=True)
    text(c, "Exemplos de imagem do material original", 85, 716, 11, MUTED)

    dark = colors.HexColor("#111a24")
    panel(c, 612, 211, 540, 433, fill=dark, stroke=dark)
    cx, cy = 882, H - 427
    for radius, width in ((178, 1.0), (147, 1.2), (114, 1.4)):
        c.setStrokeColor(colors.HexColor("#225478"))
        c.setLineWidth(width)
        c.circle(cx, cy, radius, fill=0, stroke=1)
    text(c, "SERVIÇO GLOBAL", 755, 376, 25, RED, True)
    text(c, "Cuidando de você", 792, 413, 18, colors.white)
    service_items = [
        (636, 275, "Soluções de serviço<br/>flexíveis"),
        (913, 275, "Componentes originais<br/>de qualidade"),
        (636, 497, "Processo de entrega<br/>de alta qualidade"),
        (913, 497, "Serviço de atualização<br/>de produto"),
    ]
    for x, top, value in service_items:
        para(c, value, x, top, 204, size=15, leading=20, color=colors.white,
             bold=True, max_height=50)
    c.setStrokeColor(colors.HexColor("#477b99"))
    c.line(641, H - 559, 1120, H - 559)
    for x, value in ((639, "Suporte on-line<br/>24 horas"),
                     (814, "Atendimento<br/>ativo"),
                     (983, "Resposta<br/>rápida")):
        para(c, value, x, 570, 150, size=13, leading=18, color=CYAN,
             bold=True, max_height=45)

    panel(c, 612, 655, 540, 89, fill=PALE, stroke=PALE)
    para(c, "Beijing Wandong Medical Technology Co., Ltd.", 629, 664, 506,
         size=14, leading=18, color=INK, bold=True, max_height=25)
    para(c, "Building 3, No. 9 Jiuxianqiaodong Road, Chaoyang District, Beijing 100015, China<br/>"
         "Tel.: +86 10 8457 5792/3/5/6  |  Fax: +86 10 8457 5794  |  www.wandong.com.cn<br/>"
         "International@wandong.com.cn  |  Suporte: +86 10 8457 5789  |  service@wandong.com.cn",
         629, 686, 506, size=10.1, leading=14, max_height=51)
    note = (
        "Nota editorial: o PDF identificado como LITE na capa reutiliza, no miolo, texto técnico do 1S-VET. "
        "Confirme com a WDM as especificações e a disponibilidade dos recursos antes da divulgação ou impressão."
        if "LITE" in model else
        "Nota editorial: os dados, as imagens e as alegações são do folder original da WDM. "
        "A disponibilidade de recursos e as configurações devem ser confirmadas na proposta comercial."
    )
    para(c, note, 55, 751, 1090, size=10.5, leading=14, max_height=28)
    c.showPage()


def build(source: Path, model: str, key: str) -> Path:
    pages = render_source(source, key)
    OUT.mkdir(parents=True, exist_ok=True)
    output = OUT / f"brochure-wdm-turbotom-{key}-pt-br.pdf"
    c = canvas.Canvas(str(output), pagesize=(W, H), pageCompression=1)
    c.setTitle(f"TurboTom {model} - Brochure em português do Brasil")
    c.setAuthor("Hexamedical - adaptação editorial do material WDM")
    for build_page in (cover, performance, bearing, workflow, clinical_examples, service):
        build_page(c, model, pages)
    c.save()
    add_vector_logo(output, source)
    return output


def add_vector_logo(output: Path, source: Path) -> None:
    """Reuse the manufacturer's exact logo from the source PDF as vector art."""
    sys.path.insert(0, str(ROOT / "tmp" / "pdfs" / "pymupdf_vendor"))
    import pymupdf

    document = pymupdf.open(str(output))
    original = pymupdf.open(str(source))
    clip = pymupdf.Rect(958, 83, 1140, 118)
    placement = pymupdf.Rect(55, 14, 235, 48)
    for page in document:
        page.show_pdf_page(placement, original, 0, clip=clip, overlay=True)
    revised = output.with_name(output.stem + "-revised.pdf")
    document.save(str(revised), garbage=4, deflate=True)
    document.close()
    original.close()
    revised.replace(output)


def main() -> None:
    setup_fonts()
    items = [
        (Path(r"C:\Users\lucas\Downloads\Turbotom 1S-VET Brochure.pdf"), "1S-VET", "1s-vet"),
        (Path(r"C:\Users\lucas\Downloads\Brochure TurboTom 1S LITE VET.pdf"), "1S LITE VET", "1s-lite-vet"),
    ]
    for source, model, key in items:
        output = build(source, model, key)
        print(output)


if __name__ == "__main__":
    main()
