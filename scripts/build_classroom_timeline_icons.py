"""Turn the generated timeline icon concept into a tiny transparent pixel sprite."""

from __future__ import annotations

from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "frontend" / "assets" / "classroom" / "timeline-icons-imagegen-v1.png"
OUTPUT = ROOT / "frontend" / "assets" / "classroom" / "timeline-icons-pixel-v1.png"

CELL_COUNT = 3
CELL_SIZE = 32
ICON_SIZE = 26

PALETTE = (
    (13, 48, 15, 255),
    (28, 96, 23, 255),
    (91, 190, 43, 255),
    (158, 244, 78, 255),
    (222, 255, 177, 255),
)


def phosphor_color(red: int, green: int, blue: int) -> tuple[int, int, int, int]:
    luminance = (red * 21 + green * 72 + blue * 7) // 100
    if luminance < 70:
        return PALETTE[0]
    if luminance < 120:
        return PALETTE[1]
    if luminance < 180:
        return PALETTE[2]
    if luminance < 225:
        return PALETTE[3]
    return PALETTE[4]


def extract_icon(source: Image.Image, index: int) -> Image.Image:
    source_cell_width = source.width // CELL_COUNT
    cell = source.crop(
        (
            index * source_cell_width,
            0,
            (index + 1) * source_cell_width,
            source.height,
        )
    ).convert("RGBA")

    pixels = cell.load()
    for y in range(cell.height):
        for x in range(cell.width):
            red, green, blue, _ = pixels[x, y]
            if red >= 232 and green >= 232 and blue >= 232:
                pixels[x, y] = (0, 0, 0, 0)
            else:
                pixels[x, y] = phosphor_color(red, green, blue)

    bounds = cell.getbbox()
    if bounds is None:
        raise RuntimeError(f"Generated icon cell {index + 1} is empty")

    icon = cell.crop(bounds)
    scale = min(ICON_SIZE / icon.width, ICON_SIZE / icon.height)
    target_size = (
        max(1, round(icon.width * scale)),
        max(1, round(icon.height * scale)),
    )
    icon = icon.resize(target_size, Image.Resampling.NEAREST)

    target = Image.new("RGBA", (CELL_SIZE, CELL_SIZE), (0, 0, 0, 0))
    target.alpha_composite(
        icon,
        (
            (CELL_SIZE - icon.width) // 2,
            (CELL_SIZE - icon.height) // 2,
        ),
    )
    return target


def main() -> None:
    source = Image.open(SOURCE)
    sheet = Image.new("RGBA", (CELL_SIZE * CELL_COUNT, CELL_SIZE), (0, 0, 0, 0))
    for index in range(CELL_COUNT):
        sheet.alpha_composite(extract_icon(source, index), (index * CELL_SIZE, 0))
    sheet.save(OUTPUT, optimize=True)
    print(f"Built {OUTPUT.name}: {sheet.width}x{sheet.height}, {CELL_COUNT} transparent icons")


if __name__ == "__main__":
    main()
