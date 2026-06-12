#!/usr/bin/env python3
"""Prepare and QA a vertically scrolling game background tile."""

from __future__ import annotations

import argparse
import math
from pathlib import Path

from PIL import Image, ImageChops, ImageStat


def square_resize(path: Path, size: int) -> Image.Image:
    image = Image.open(path).convert("RGB")
    side = min(image.size)
    left = (image.width - side) // 2
    top = (image.height - side) // 2
    image = image.crop((left, top, left + side, top + side))
    return image.resize((size, size), Image.Resampling.LANCZOS)


def seam_stats(image: Image.Image, band: int = 8) -> dict[str, float]:
    rgb = image.convert("RGB")
    top_row = rgb.crop((0, 0, rgb.width, 1))
    bottom_row = rgb.crop((0, rgb.height - 1, rgb.width, rgb.height))
    top_band = rgb.crop((0, 0, rgb.width, band))
    bottom_band = rgb.crop((0, rgb.height - band, rgb.width, rgb.height))
    row_stat = ImageStat.Stat(ImageChops.difference(top_row, bottom_row))
    band_stat = ImageStat.Stat(ImageChops.difference(top_band, bottom_band))
    return {
        "row_mean": float(sum(row_stat.mean) / len(row_stat.mean)),
        "row_max": float(max(row_stat.extrema[channel][1] for channel in range(3))),
        "band_mean": float(sum(band_stat.mean) / len(band_stat.mean)),
        "band_max": float(max(band_stat.extrema[channel][1] for channel in range(3))),
    }


def make_vertical_loop(image: Image.Image, blend_band: int) -> Image.Image:
    source = image.convert("RGB")
    width, height = source.size
    rolled = ImageChops.offset(source, 0, height // 2)

    # The roll makes the wrap seam use adjacent source rows. It moves the old
    # top/bottom mismatch into the center, where a feathered strip from the
    # original image hides it without touching the loop edge.
    out = rolled.copy()
    center = height // 2
    half = max(1, min(blend_band, height // 2 - 1))
    start = center - half
    end = center + half
    mask = Image.new("L", (width, end - start), 0)
    pixels = mask.load()
    for y in range(mask.height):
        alpha = round(math.sin((y / max(1, mask.height - 1)) * math.pi) * 255)
        for x in range(width):
            pixels[x, y] = alpha
    blended = Image.composite(
        source.crop((0, start, width, end)),
        rolled.crop((0, start, width, end)),
        mask,
    )
    out.paste(blended, (0, start))
    return out


def make_repeat_preview(image: Image.Image, out_path: Path) -> None:
    tile = image.convert("RGB")
    preview = Image.new("RGB", (tile.width, tile.height * 2))
    preview.paste(tile, (0, 0))
    preview.paste(tile, (0, tile.height))
    preview.save(out_path)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", required=True, type=Path)
    parser.add_argument("--out", required=True, type=Path)
    parser.add_argument("--native-out", type=Path)
    parser.add_argument("--preview-out", type=Path)
    parser.add_argument("--size", type=int, default=1024)
    parser.add_argument("--blend-band", type=int, default=256)
    args = parser.parse_args()

    native = square_resize(args.input, args.size)
    if args.native_out:
        args.native_out.parent.mkdir(parents=True, exist_ok=True)
        native.save(args.native_out)

    looped = make_vertical_loop(native, args.blend_band)
    args.out.parent.mkdir(parents=True, exist_ok=True)
    looped.save(args.out)
    if args.preview_out:
        args.preview_out.parent.mkdir(parents=True, exist_ok=True)
        make_repeat_preview(looped, args.preview_out)

    native_stats = seam_stats(native)
    looped_stats = seam_stats(looped)
    print(
        "native seam "
        f"row_mean={native_stats['row_mean']:.2f} row_max={native_stats['row_max']:.0f} "
        f"band_mean={native_stats['band_mean']:.2f} band_max={native_stats['band_max']:.0f}"
    )
    print(
        "looped seam "
        f"row_mean={looped_stats['row_mean']:.2f} row_max={looped_stats['row_max']:.0f} "
        f"band_mean={looped_stats['band_mean']:.2f} band_max={looped_stats['band_max']:.0f}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
