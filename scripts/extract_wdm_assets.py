"""Extract unaltered product renderings from WDM source PDFs for the web preview."""

from io import BytesIO
from pathlib import Path

from PIL import Image
from pypdf import PdfReader


SOURCES = {
    "turbotom-1s-vet": "turbotom-1s-vet-final.pdf",
    "turbotom-1s-lite-vet": "turbotom-1s-lite-vet-final.pdf",
    "ispace-1-5t-vet": "ispace-1-5t-vet-final.pdf",
}

source_dir = Path(r"C:\Users\lucas\Downloads\WDM materiais")
output_dir = Path(__file__).resolve().parents[1] / "public" / "assets" / "wdm"
output_dir.mkdir(parents=True, exist_ok=True)

for slug, filename in SOURCES.items():
    reader = PdfReader(str(source_dir / filename))
    page = reader.pages[0]
    candidates = []
    for image in page.images:
        try:
            with Image.open(BytesIO(image.data)) as raster:
                if raster.width >= 1000 and raster.height >= 900:
                    candidates.append((raster.width * raster.height, image.name, raster.copy()))
        except Exception:
            continue
    if not candidates:
        raise RuntimeError(f"No product image found in {filename}")
    _, source_name, product = max(candidates, key=lambda item: item[0])
    target = output_dir / f"{slug}-hero.webp"
    product.save(target, format="WEBP", quality=92, method=6)
    print(f"{target.name}: {product.width}x{product.height} from {filename}/{source_name}")

    detail_candidates = []
    for image in reader.pages[1].images:
        try:
            with Image.open(BytesIO(image.data)) as raster:
                if raster.width >= 1000 and raster.height >= 900:
                    detail_candidates.append((raster.width * raster.height, image.name, raster.copy()))
        except Exception:
            continue
    for index, (_, source_name, detail) in enumerate(
        sorted(detail_candidates, reverse=True)[:2], 1
    ):
        detail_target = output_dir / f"{slug}-detail-{index}.webp"
        detail.save(detail_target, format="WEBP", quality=88, method=6)
        print(
            f"{detail_target.name}: {detail.width}x{detail.height} "
            f"from {filename}/p2/{source_name}"
        )

    if slug == "turbotom-1s-vet":
        for image in page.images:
            if image.name in {"fzImg0.png", "fzImg1.png"}:
                with Image.open(BytesIO(image.data)) as raster:
                    logo_target = output_dir / image.name
                    raster.save(logo_target, format="PNG")
                    print(f"{logo_target.name}: {raster.width}x{raster.height}")
