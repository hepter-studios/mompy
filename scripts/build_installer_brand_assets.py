"""Build deterministic Inno Setup artwork from Mompy's official brand assets."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "frontend" / "assets"
WEBSITE_BRAND = ROOT / "website" / "assets" / "brand"
OUTPUT = ROOT / "installer" / "assets"


def _trim(source: Path) -> Image.Image:
    image = Image.open(source).convert("RGBA")
    alpha = image.getchannel("A")
    box = alpha.getbbox()
    return image.crop(box) if box else image


def _fit(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    fitted = image.copy()
    fitted.thumbnail(size, Image.Resampling.LANCZOS)
    return fitted


def _paste_center(canvas: Image.Image, image: Image.Image, y: int) -> None:
    x = (canvas.width - image.width) // 2
    canvas.alpha_composite(image, (x, y))


def build_large() -> Image.Image:
    canvas = Image.new("RGBA", (164, 314), (2, 7, 3, 255))
    draw = ImageDraw.Draw(canvas)
    for y in range(0, canvas.height, 4):
        draw.line((0, y, canvas.width, y), fill=(8, 26, 9, 92), width=1)
    draw.rectangle((0, 0, 163, 313), outline=(40, 126, 35, 255), width=1)

    mompy = _fit(_trim(ASSETS / "mompy_idle.png"), (142, 177))
    _paste_center(canvas, mompy, 16)

    draw.line((18, 205, 146, 205), fill=(101, 209, 60, 180), width=1)
    logo = _fit(_trim(ASSETS / "hepter_studios_boot_logo_green.png"), (142, 94))
    _paste_center(canvas, logo, 216)
    return canvas.convert("RGB")


def build_small() -> Image.Image:
    canvas = Image.new("RGBA", (55, 55), (2, 7, 3, 255))
    draw = ImageDraw.Draw(canvas)
    draw.rectangle((0, 0, 54, 54), outline=(101, 209, 60, 255), width=1)
    symbol = _fit(_trim(WEBSITE_BRAND / "hepter-symbol.png"), (43, 43))
    _paste_center(canvas, symbol, (55 - symbol.height) // 2)
    return canvas.convert("RGB")


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    build_large().save(OUTPUT / "mompy-hepter-wizard.bmp", format="BMP")
    build_small().save(OUTPUT / "hepter-wizard-small.bmp", format="BMP")
    print(f"Installer brand assets written to {OUTPUT}")


if __name__ == "__main__":
    main()
