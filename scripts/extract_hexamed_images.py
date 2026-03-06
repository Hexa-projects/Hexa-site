import os
import re
import json
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
from pathlib import Path

BASE = "https://hexamedical.com.br"
SITEMAP_INDEX = BASE + "/sitemap_index.xml"
OUT_DIR = Path("C:/Users/lucas/.openclaw/workspace/hexamed-site/public/assets/hexa")
UA = "Mozilla/5.0"

OUT_DIR.mkdir(parents=True, exist_ok=True)


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "ignore")


def get_sitemap_urls(index_xml: str):
    root = ET.fromstring(index_xml)
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    return [n.text.strip() for n in root.findall("sm:sitemap/sm:loc", ns) if n.text]


def get_page_urls(sitemap_xml: str):
    root = ET.fromstring(sitemap_xml)
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    return [n.text.strip() for n in root.findall("sm:url/sm:loc", ns) if n.text]


def extract_images_from_html(html: str, page_url: str):
    urls = set()
    for pat in [r'<img[^>]+src=["\']([^"\']+)["\']', r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']', r'background-image:\s*url\(([^)]+)\)']:
        for m in re.findall(pat, html, flags=re.I):
            u = m.strip().strip('"\'')
            full = urllib.parse.urljoin(page_url, u)
            if re.search(r"\.(jpe?g|png|webp|gif|svg)(\?|$)", full, flags=re.I):
                urls.add(full)
    return urls


def safe_name(url: str):
    p = urllib.parse.urlparse(url)
    name = os.path.basename(p.path) or "img"
    if "." not in name:
        name += ".jpg"
    return name


def download(url: str, target_dir: Path):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=30) as r:
            data = r.read()
            if not data:
                return None
        filename = safe_name(url)
        out = target_dir / filename
        # avoid overwrite collisions
        if out.exists():
            stem, ext = out.stem, out.suffix
            i = 2
            while (target_dir / f"{stem}-{i}{ext}").exists():
                i += 1
            out = target_dir / f"{stem}-{i}{ext}"
        out.write_bytes(data)
        return str(out)
    except Exception:
        return None


def main():
    index_xml = fetch(SITEMAP_INDEX)
    sitemaps = get_sitemap_urls(index_xml)

    page_urls = set()
    for sm in sitemaps:
        try:
            xml = fetch(sm)
            for u in get_page_urls(xml):
                page_urls.add(u)
        except Exception:
            continue

    img_urls = set()
    for i, page in enumerate(sorted(page_urls), start=1):
        try:
            html = fetch(page)
            img_urls.update(extract_images_from_html(html, page))
        except Exception:
            continue

    downloaded = []
    for u in sorted(img_urls):
        p = download(u, OUT_DIR)
        if p:
            downloaded.append({"source": u, "local": p})

    manifest = {
        "pages_scanned": len(page_urls),
        "images_found": len(img_urls),
        "images_downloaded": len(downloaded),
        "items": downloaded,
    }

    manifest_path = OUT_DIR / "manifest.json"
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")

    print(json.dumps({
        "pages_scanned": len(page_urls),
        "images_found": len(img_urls),
        "images_downloaded": len(downloaded),
        "output": str(OUT_DIR),
        "manifest": str(manifest_path),
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
