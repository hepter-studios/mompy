"""Build the auxiliary classroom monitor sprite sheet without visual drift.

Frames 1-7 are copied byte-for-byte at the pixel level from the original sheet.
Only frame 8 is replaced with the approved transparent monitor carcass.
"""

from pathlib import Path

from PIL import Image, ImageChops


ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "frontend" / "assets" / "classroom"
SOURCE_SHEET = ASSET_DIR / "classroom-aux-monitor-sheet-v1.png"
FINAL_FRAME = ASSET_DIR / "classroom-aux-monitor-frame-v2.png"
OUTPUT_SHEET = ASSET_DIR / "classroom-aux-monitor-sheet-v2.png"

GRID_COLUMNS = 4
GRID_ROWS = 2

# Exact projection previously validated against the eighth 444x444 cell.
FRAME_LEFT_RATIO = 0.1225
FRAME_TOP_RATIO = -0.0272
FRAME_WIDTH_RATIO = 0.7502
FRAME_HEIGHT_RATIO = 0.9376


def alpha_composite_clipped(destination: Image.Image, source: Image.Image, x: int, y: int) -> None:
    """Alpha-composite source onto destination while safely clipping negative offsets."""

    source_left = max(0, -x)
    source_top = max(0, -y)
    destination_left = max(0, x)
    destination_top = max(0, y)
    width = min(source.width - source_left, destination.width - destination_left)
    height = min(source.height - source_top, destination.height - destination_top)
    if width <= 0 or height <= 0:
        raise ValueError("The replacement frame does not intersect the destination cell")

    clipped = source.crop(
        (source_left, source_top, source_left + width, source_top + height)
    )
    destination.alpha_composite(clipped, (destination_left, destination_top))


def main() -> None:
    source = Image.open(SOURCE_SHEET).convert("RGBA")
    carcass = Image.open(FINAL_FRAME).convert("RGBA")

    if source.width % GRID_COLUMNS or source.height % GRID_ROWS:
        raise ValueError(f"Unexpected sprite-sheet dimensions: {source.size}")

    cell_width = source.width // GRID_COLUMNS
    cell_height = source.height // GRID_ROWS
    if cell_width != cell_height:
        raise ValueError(f"Expected square sprite cells, got {cell_width}x{cell_height}")

    replacement_width = round(cell_width * FRAME_WIDTH_RATIO)
    replacement_height = round(cell_height * FRAME_HEIGHT_RATIO)
    replacement_x = round(cell_width * FRAME_LEFT_RATIO)
    replacement_y = round(cell_height * FRAME_TOP_RATIO)
    replacement = carcass.resize(
        (replacement_width, replacement_height),
        Image.Resampling.LANCZOS,
    )

    final_cell = Image.new("RGBA", (cell_width, cell_height), (0, 0, 0, 0))
    alpha_composite_clipped(final_cell, replacement, replacement_x, replacement_y)

    output = source.copy()
    final_box = (
        cell_width * (GRID_COLUMNS - 1),
        cell_height * (GRID_ROWS - 1),
        cell_width * GRID_COLUMNS,
        cell_height * GRID_ROWS,
    )
    output.paste(final_cell, final_box[:2])

    # The first seven cells are an animation invariant and must never drift.
    for index in range(GRID_COLUMNS * GRID_ROWS - 1):
        column = index % GRID_COLUMNS
        row = index // GRID_COLUMNS
        box = (
            column * cell_width,
            row * cell_height,
            (column + 1) * cell_width,
            (row + 1) * cell_height,
        )
        if ImageChops.difference(source.crop(box), output.crop(box)).getbbox() is not None:
            raise AssertionError(f"Unexpected pixel change in frame {index + 1}")

    if final_cell.getbbox() is None:
        raise AssertionError("The replacement final frame is empty")

    output.save(OUTPUT_SHEET, optimize=True)
    print(
        f"Built {OUTPUT_SHEET.name}: {output.width}x{output.height}; "
        f"frame 8 at ({replacement_x}, {replacement_y}) "
        f"size {replacement_width}x{replacement_height}; frames 1-7 unchanged"
    )


if __name__ == "__main__":
    main()
