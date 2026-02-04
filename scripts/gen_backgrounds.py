#!/usr/bin/env python3
"""
Generate small, stylized space backgrounds (256x256) for the game.

Notes:
- These are opaque backgrounds (no transparency).
- The game scrolls backgrounds vertically by repeating the same image, so we
  apply a vertical-seam cleanup step to make them tile cleanly top-to-bottom.
"""

from __future__ import annotations

import argparse
import math
import random
from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageOps


SIZE = 256
OUT_DIR = Path("assets/SpaceShooterRedux/Backgrounds")


@dataclass(frozen=True)
class Palette:
    base: tuple[int, int, int]
    nebula_a: tuple[int, int, int]
    nebula_b: tuple[int, int, int]
    accent: tuple[int, int, int]


PALETTES: dict[str, Palette] = {
    "nebulaTeal": Palette((2, 6, 16), (25, 180, 210), (80, 40, 210), (230, 255, 255)),
    "nebulaCrimson": Palette((8, 5, 18), (210, 45, 80), (255, 140, 60), (255, 240, 220)),
    "nebulaLime": Palette((2, 6, 14), (70, 220, 130), (20, 110, 180), (240, 255, 240)),
    "aurora": Palette((2, 8, 18), (60, 230, 200), (140, 110, 255), (240, 255, 255)),
    "ionStorm": Palette((3, 7, 18), (120, 90, 255), (255, 120, 40), (255, 250, 230)),
    "warpGrid": Palette((2, 6, 16), (35, 215, 238), (35, 110, 220), (230, 255, 255)),
    "asteroidBelt": Palette((3, 6, 14), (70, 120, 160), (20, 30, 60), (230, 240, 255)),
    "voidDust": Palette((1, 2, 8), (90, 120, 190), (30, 40, 70), (230, 240, 255)),
    "wreckage": Palette((2, 6, 16), (120, 140, 170), (45, 65, 95), (255, 220, 160)),
}


def _lerp(a: int, b: int, t: float) -> int:
    return int(round(a + (b - a) * t))


def _lerp_rgb(a: tuple[int, int, int], b: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    return (_lerp(a[0], b[0], t), _lerp(a[1], b[1], t), _lerp(a[2], b[2], t))


def radial_glow_layer(rng: random.Random, pal: Palette, strength: float = 1.0) -> Image.Image:
    layer = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    n = rng.randint(3, 6)
    for i in range(n):
        cx = rng.uniform(-0.1, 1.1) * SIZE
        cy = rng.uniform(-0.1, 1.1) * SIZE
        r = rng.uniform(0.22, 0.62) * SIZE
        col = pal.nebula_a if (i % 2 == 0) else pal.nebula_b
        alpha = int(rng.uniform(30, 70) * strength)
        bbox = (cx - r, cy - r, cx + r, cy + r)
        d.ellipse(bbox, fill=(col[0], col[1], col[2], alpha))
    return layer.filter(ImageFilter.GaussianBlur(radius=rng.uniform(10, 18)))


def dust_noise_layer(rng: random.Random, pal: Palette, amount: float = 1.0) -> Image.Image:
    # Pillow's effect_noise yields grayscale noise; we then colorize it into the palette.
    sigma = rng.uniform(40, 95)
    noise = Image.effect_noise((SIZE, SIZE), sigma).convert("L")
    noise = noise.filter(ImageFilter.GaussianBlur(radius=rng.uniform(0.6, 1.4)))
    noise = ImageOps.autocontrast(noise, cutoff=rng.uniform(2, 6))

    tint_a = _lerp_rgb(pal.base, pal.nebula_a, 0.55)
    tint_b = _lerp_rgb(pal.base, pal.nebula_b, 0.55)
    colored = Image.merge(
        "RGB",
        (
            noise.point(lambda v: _lerp(tint_a[0], tint_b[0], v / 255.0)),
            noise.point(lambda v: _lerp(tint_a[1], tint_b[1], v / 255.0)),
            noise.point(lambda v: _lerp(tint_a[2], tint_b[2], v / 255.0)),
        ),
    ).convert("RGBA")
    colored.putalpha(noise.point(lambda v: int(v * 0.22 * amount)))
    return colored


def add_stars(base: Image.Image, rng: random.Random, pal: Palette, density: int = 190) -> None:
    d = ImageDraw.Draw(base, "RGBA")

    # Small stars
    for _ in range(density):
        x = rng.randrange(0, SIZE)
        y = rng.randrange(0, SIZE)
        b = rng.uniform(0.5, 1.0)
        col = _lerp_rgb(pal.accent, (125, 210, 255), rng.uniform(0.0, 0.5))
        a = int(rng.uniform(80, 170) * b)
        r = 1 if rng.random() < 0.86 else 2
        d.ellipse((x - r, y - r, x + r, y + r), fill=(col[0], col[1], col[2], a))

    # A few bright stars with a soft bloom
    bloom = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    bd = ImageDraw.Draw(bloom, "RGBA")
    for _ in range(rng.randint(6, 10)):
        x = rng.randrange(0, SIZE)
        y = rng.randrange(0, SIZE)
        r = rng.uniform(2.2, 4.6)
        col = _lerp_rgb(pal.accent, (255, 255, 255), rng.uniform(0.25, 0.7))
        bd.ellipse((x - r, y - r, x + r, y + r), fill=(col[0], col[1], col[2], 180))
    bloom = bloom.filter(ImageFilter.GaussianBlur(radius=2.4))
    base.alpha_composite(bloom)


def add_grid_overlay(base: Image.Image, rng: random.Random, pal: Palette) -> None:
    # Thin grid lines for "warpGrid" style.
    overlay = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay, "RGBA")
    step = rng.choice([22, 26, 30])
    col = _lerp_rgb(pal.nebula_a, (125, 210, 255), 0.45)
    a = 36
    for x in range(0, SIZE + 1, step):
        d.line((x, 0, x, SIZE), fill=(col[0], col[1], col[2], a), width=1)
    for y in range(0, SIZE + 1, step):
        d.line((0, y, SIZE, y), fill=(col[0], col[1], col[2], a), width=1)
    base.alpha_composite(overlay)


def add_asteroid_silhouettes(base: Image.Image, rng: random.Random, pal: Palette) -> None:
    overlay = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay, "RGBA")
    for _ in range(rng.randint(7, 11)):
        x = rng.uniform(-0.1, 1.1) * SIZE
        y = rng.uniform(-0.1, 1.1) * SIZE
        r = rng.uniform(10, 34)
        gray = rng.randint(20, 65)
        a = rng.randint(85, 135)
        d.ellipse((x - r, y - r, x + r, y + r), fill=(gray, gray, gray, a))
    overlay = overlay.filter(ImageFilter.GaussianBlur(radius=1.2))
    base.alpha_composite(overlay)


def make_vertical_seamless(img: Image.Image) -> Image.Image:
    # Move the hard seam to the center via wrap-around, then blur just that band.
    w, h = img.size
    out = ImageChops.offset(img, 0, h // 2)
    blurred = out.filter(ImageFilter.GaussianBlur(radius=6.0))

    band = max(18, h // 10)
    mask = Image.new("L", (w, h), 0)
    md = ImageDraw.Draw(mask)
    y0 = h // 2 - band
    y1 = h // 2 + band
    md.rectangle((0, y0, w, y1), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(radius=8.0))

    out = Image.composite(blurred, out, mask).convert("RGBA")
    return out


def generate(name: str, seed: int) -> Image.Image:
    pal = PALETTES[name]
    rng = random.Random(seed)

    # Base gradient (slight vertical bias so scrolling reads well).
    base = Image.new("RGBA", (SIZE, SIZE), (pal.base[0], pal.base[1], pal.base[2], 255))
    grad = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grad, "RGBA")
    top = _lerp_rgb(pal.base, pal.nebula_b, 0.15)
    bot = _lerp_rgb(pal.base, pal.nebula_a, 0.18)
    for y in range(SIZE):
        t = y / (SIZE - 1)
        col = _lerp_rgb(top, bot, t)
        gd.line((0, y, SIZE, y), fill=(col[0], col[1], col[2], 255))
    base = Image.alpha_composite(base, grad)

    base = Image.alpha_composite(base, radial_glow_layer(rng, pal, strength=1.0))
    base = Image.alpha_composite(base, dust_noise_layer(rng, pal, amount=1.0))
    base = Image.alpha_composite(base, radial_glow_layer(rng, pal, strength=0.75))
    base = Image.alpha_composite(base, dust_noise_layer(rng, pal, amount=0.85))

    if name in ("warpGrid",):
        add_grid_overlay(base, rng, pal)
    if name in ("asteroidBelt", "wreckage"):
        add_asteroid_silhouettes(base, rng, pal)

    add_stars(base, rng, pal, density=220 if name != "voidDust" else 260)
    base = make_vertical_seamless(base)
    return base.convert("RGB")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--write-all", action="store_true", help="Generate every background in the palette set.")
    ap.add_argument("--name", default=None, help="Generate a single background name.")
    ap.add_argument("--seed", type=int, default=1337, help="Seed for single-name generation.")
    args = ap.parse_args()

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    if args.write_all:
        # Stable per-background seeds so we can rerun without changing the art.
        base_seed = 91027
        for i, name in enumerate(PALETTES.keys()):
            img = generate(name, base_seed + i * 97)
            out = OUT_DIR / f"{name}.png"
            img.save(out, optimize=True)
            print(f"Wrote {out}")
        return 0

    if not args.name:
        print("ERROR: provide --write-all or --name", flush=True)
        return 2

    if args.name not in PALETTES:
        print(f"ERROR: unknown name {args.name}. Options: {', '.join(PALETTES.keys())}", flush=True)
        return 2

    img = generate(args.name, args.seed)
    out = OUT_DIR / f"{args.name}.png"
    img.save(out, optimize=True)
    print(f"Wrote {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
