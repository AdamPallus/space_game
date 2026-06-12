#!/usr/bin/env python3
"""Convert a generated chroma-key sprite sheet into game-ready alpha PNGs."""

from __future__ import annotations

import argparse
import json
import math
from collections import deque
from pathlib import Path

from PIL import Image


def parse_hex_color(value: str) -> tuple[int, int, int]:
    text = value.strip().lstrip("#")
    if len(text) != 6:
        raise ValueError(f"Expected #rrggbb color, got {value!r}")
    return tuple(int(text[i : i + 2], 16) for i in (0, 2, 4))


def key_to_alpha(
    image: Image.Image,
    key: tuple[int, int, int],
    transparent_threshold: float,
    opaque_threshold: float,
) -> Image.Image:
    keyed = image.convert("RGBA")
    pixels = keyed.load()
    width, height = keyed.size

    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            distance = max(abs(r - key[0]), abs(g - key[1]), abs(b - key[2]))
            if distance <= transparent_threshold:
                pixels[x, y] = (0, 0, 0, 0)
            elif distance < opaque_threshold:
                alpha = round(a * ((distance - transparent_threshold) / (opaque_threshold - transparent_threshold)))
                alpha = max(0, min(255, alpha))
                pixels[x, y] = (0, 0, 0, 0) if alpha <= 10 else (r, g, b, alpha)

    return keyed


def component_cleanup(image: Image.Image, mode: str | None, min_area: int | None) -> Image.Image:
    if not mode and not min_area:
        return image

    cleaned = image.convert("RGBA")
    pixels = cleaned.load()
    width, height = cleaned.size
    seen = bytearray(width * height)
    components: list[list[tuple[int, int]]] = []

    for y in range(height):
        for x in range(width):
            index = y * width + x
            if seen[index] or pixels[x, y][3] <= 10:
                continue

            queue: deque[tuple[int, int]] = deque([(x, y)])
            seen[index] = 1
            component: list[tuple[int, int]] = []

            while queue:
                cx, cy = queue.popleft()
                component.append((cx, cy))
                for nx in range(cx - 1, cx + 2):
                    for ny in range(cy - 1, cy + 2):
                        if nx < 0 or nx >= width or ny < 0 or ny >= height:
                            continue
                        if nx == cx and ny == cy:
                            continue
                        neighbor_index = ny * width + nx
                        if not seen[neighbor_index] and pixels[nx, ny][3] > 10:
                            seen[neighbor_index] = 1
                            queue.append((nx, ny))

            components.append(component)

    if not components:
        return cleaned

    if mode == "largest":
        largest = max(components, key=len)
        remove = [component for component in components if component is not largest]
    else:
        threshold = min_area or 0
        remove = [component for component in components if len(component) < threshold]

    for component in remove:
        for x, y in component:
            pixels[x, y] = (0, 0, 0, 0)

    return cleaned


def extract_sprite(sheet: Image.Image, spec: dict, columns: int, rows: int, padding: int) -> Image.Image:
    cell = int(spec["cell"])
    column = cell % columns
    row = cell // columns
    width, height = sheet.size

    x0 = round(column * width / columns)
    y0 = round(row * height / rows)
    x1 = round((column + 1) * width / columns)
    y1 = round((row + 1) * height / rows)
    cropped = sheet.crop((x0, y0, x1, y1))
    cropped = component_cleanup(cropped, spec.get("componentMode"), spec.get("componentMinArea"))

    bbox = cropped.getchannel("A").getbbox()
    if not bbox:
        raise ValueError(f"Cell {cell} for {spec['name']} is empty after key removal")

    bx0, by0, bx1, by1 = bbox
    bx0 = max(0, bx0 - padding)
    by0 = max(0, by0 - padding)
    bx1 = min(cropped.width, bx1 + padding)
    by1 = min(cropped.height, by1 + padding)
    trimmed = cropped.crop((bx0, by0, bx1, by1))
    rotate_degrees = float(spec.get("rotateDegrees", 0))
    if rotate_degrees:
        trimmed = trimmed.rotate(rotate_degrees, expand=True)

    target_width, target_height = spec["size"]
    scale = min((target_width - 4) / trimmed.width, (target_height - 4) / trimmed.height)
    resized = trimmed.resize(
        (max(1, round(trimmed.width * scale)), max(1, round(trimmed.height * scale))),
        Image.Resampling.LANCZOS,
    )

    sprite = Image.new("RGBA", (target_width, target_height), (0, 0, 0, 0))
    sprite.alpha_composite(
        resized,
        ((target_width - resized.width) // 2, (target_height - resized.height) // 2),
    )
    return component_cleanup(sprite, spec.get("componentMode"), spec.get("componentMinArea"))


def make_contact_sheet(paths: list[Path], out_path: Path, columns: int = 4, cell: int = 150) -> None:
    rows = math.ceil(len(paths) / columns)
    preview = Image.new("RGBA", (columns * cell, rows * cell), (25, 28, 38, 255))
    for index, path in enumerate(paths):
        image = Image.open(path).convert("RGBA")
        scale = min(112 / image.width, 112 / image.height, 1)
        resized = image.resize(
            (round(image.width * scale), round(image.height * scale)),
            Image.Resampling.LANCZOS,
        )
        x = (index % columns) * cell + (cell - resized.width) // 2
        y = (index // columns) * cell + (cell - resized.height) // 2
        preview.alpha_composite(resized, (x, y))
    preview.save(out_path)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--manifest", required=True, type=Path)
    parser.add_argument("--out-dir", type=Path)
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--transparent-threshold", type=float, default=36)
    parser.add_argument("--opaque-threshold", type=float, default=140)
    args = parser.parse_args()

    manifest_path = args.manifest
    manifest = json.loads(manifest_path.read_text())
    base_dir = manifest_path.parent
    out_dir = args.out_dir or base_dir
    out_dir.mkdir(parents=True, exist_ok=True)

    source_path = base_dir / manifest["source"]
    key_color = parse_hex_color(manifest["keyColor"])
    keyed = Image.open(source_path)
    sheet = key_to_alpha(keyed, key_color, args.transparent_threshold, args.opaque_threshold)
    sheet.save(out_dir / "source_sheet_alpha.png")

    grid = manifest["grid"]
    paths: list[Path] = []
    for sprite_spec in manifest["sprites"]:
        out_path = out_dir / f"{sprite_spec['name']}.png"
        if out_path.exists() and not args.force:
            raise FileExistsError(f"{out_path} exists; use --force to overwrite")
        sprite = extract_sprite(
            sheet,
            sprite_spec,
            int(grid["columns"]),
            int(grid["rows"]),
            int(manifest.get("defaultPadding", 8)),
        )
        sprite.save(out_path)
        paths.append(out_path)
        bbox = sprite.getchannel("A").getbbox()
        print(f"wrote {out_path} size={sprite.size} bbox={bbox}")

    make_contact_sheet(paths, out_dir / manifest.get("contactSheet", "contact_sheet.png"))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
