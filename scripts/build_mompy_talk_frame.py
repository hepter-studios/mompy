"""Build the open-mouth Mompy frame without changing the closed-frame palette.

The generated open frame has a slightly different global color grade and no
alpha channel variation.  The classroom animation needs only the mouth to
change, so this script color-matches a small mouth patch and composites it over
the canonical closed frame.  Everything outside that patch, including alpha,
stays byte-for-byte identical to the closed frame.
"""

from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image


ASSET_DIR = Path(__file__).resolve().parents[1] / "frontend" / "assets" / "classroom"
CLOSED_PATH = ASSET_DIR / "mompy-lesson-talk-closed-v1.png"
OPEN_SOURCE_PATH = ASSET_DIR / "mompy-lesson-talk-open-v1.png"
OUTPUT_PATH = ASSET_DIR / "mompy-lesson-talk-open-v2.png"


def _fit_color_transform(source: np.ndarray, target: np.ndarray) -> np.ndarray:
    """Fit a robust independent affine transform for each RGB channel."""

    height, width = source.shape[:2]
    yy, xx = np.indices((height, width))

    # Learn the palette mapping from the CRT face, but exclude eyes and mouth.
    sample = (
        (xx >= 330)
        & (xx <= 925)
        & (yy >= 300)
        & (yy <= 805)
        & ~((xx >= 405) & (xx <= 835) & (yy >= 375) & (yy <= 620))
        & ~((xx >= 500) & (xx <= 745) & (yy >= 595) & (yy <= 775))
    )

    src = source[sample, :3].astype(np.float64)
    dst = target[sample, :3].astype(np.float64)
    keep = (src.max(axis=1) > 4) & (dst.max(axis=1) > 4)
    src = src[keep]
    dst = dst[keep]

    transforms: list[tuple[float, float]] = []
    for channel in range(3):
        design = np.column_stack((src[:, channel], np.ones(len(src))))
        coefficients = np.linalg.lstsq(design, dst[:, channel], rcond=None)[0]
        residual = np.abs(design @ coefficients - dst[:, channel])
        stable = residual <= np.quantile(residual, 0.72)
        slope, offset = np.linalg.lstsq(
            design[stable], dst[stable, channel], rcond=None
        )[0]
        transforms.append((float(np.clip(slope, 0.65, 1.35)), float(offset)))
    return np.asarray(transforms, dtype=np.float64)


def build_frame() -> Path:
    closed = np.array(Image.open(CLOSED_PATH).convert("RGBA"), dtype=np.uint8)
    open_source = np.array(Image.open(OPEN_SOURCE_PATH).convert("RGBA"), dtype=np.uint8)
    if closed.shape != open_source.shape:
        raise ValueError(f"Frame sizes differ: {closed.shape} vs {open_source.shape}")

    transform = _fit_color_transform(open_source, closed)
    source_rgb = open_source[..., :3].astype(np.float64)
    corrected_rgb = np.empty_like(source_rgb)
    for channel, (slope, offset) in enumerate(transform):
        corrected_rgb[..., channel] = source_rgb[..., channel] * slope + offset
    corrected_rgb = np.clip(corrected_rgb, 0, 255)

    height, width = closed.shape[:2]
    yy, xx = np.indices((height, width))

    # The full-strength ellipse contains both mouth shapes. A narrow feathered
    # edge hides the patch boundary without touching Mompy's eyes or chassis.
    distance = np.sqrt(((xx - 623.0) / 120.0) ** 2 + ((yy - 690.0) / 86.0) ** 2)
    blend = np.clip((1.0 - distance) / 0.14, 0.0, 1.0)[..., None]

    output = closed.copy()
    output[..., :3] = np.round(
        closed[..., :3].astype(np.float64) * (1.0 - blend) + corrected_rgb * blend
    ).astype(np.uint8)

    # Alpha is deliberately inherited only from the canonical closed frame.
    output[..., 3] = closed[..., 3]
    Image.fromarray(output, mode="RGBA").save(OUTPUT_PATH, optimize=True)
    return OUTPUT_PATH


if __name__ == "__main__":
    print(build_frame())
