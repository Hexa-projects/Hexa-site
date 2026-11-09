"""List embedded image candidates in the supplied WDM PDFs."""

from io import BytesIO
from pathlib import Path
import sys

from PIL import Image
from pypdf import PdfReader


for source in (Path(value) for value in sys.argv[1:]):
    print(f"\n{source.name}")
    reader = PdfReader(str(source))
    for page_number, page in enumerate(reader.pages, 1):
        images = []
        for image in page.images:
            try:
                with Image.open(BytesIO(image.data)) as raster:
                    images.append((raster.width * raster.height, image.name, raster.size))
            except Exception:
                continue
        for _, name, size in sorted(images, reverse=True)[:4]:
            print(f"  p{page_number:02} {name} {size[0]}x{size[1]}")
