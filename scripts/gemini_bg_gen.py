#!/usr/bin/env python3
"""
Generate higher-res scrolling backgrounds via the Gemini image API.

Why:
- Our original Kenney pack backgrounds are 256x256 (fine as tiles, but pixellated when
  stretched on large screens).
- This generator creates 1024x1024-ish backgrounds, then post-processes them to be
  vertically tileable (top/bottom seamless) for our scrolling loop.

Usage:
  python3 scripts/gemini_bg_gen.py --out-dir assets/SpaceShooterRedux/Backgrounds
  python3 scripts/gemini_bg_gen.py --name nb_tealrift --prompt "..." --out-dir ...

Auth:
  - Reads GEMINI_API_KEY from environment.
  - If not set, tries /Users/pallusa/research_game_love2d/.env (dev convenience).
"""

from __future__ import annotations

import argparse
import base64
import json
import os
import pathlib
import sys
import urllib.request


DEFAULT_MODEL = "gemini-2.5-flash-image"
DEFAULT_ENV_FALLBACK = "/Users/pallusa/research_game_love2d/.env"


def read_key() -> str | None:
    key = os.getenv("GEMINI_API_KEY")
    if key:
        return key.strip()
    try:
        for line in pathlib.Path(DEFAULT_ENV_FALLBACK).read_text().splitlines():
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if line.startswith("GEMINI_API_KEY="):
                return line.split("=", 1)[1].strip()
    except Exception:
        return None
    return None


def build_request(prompt: str, response_modalities: list[str]) -> dict:
    parts: list[dict] = [{"text": prompt}]
    return {
        "contents": [{"role": "user", "parts": parts}],
        "generationConfig": {"responseModalities": response_modalities},
    }


def extract_first_png(response: dict) -> bytes | None:
    for cand in response.get("candidates", []) or []:
        content = cand.get("content") or {}
        for part in content.get("parts", []) or []:
            inline = part.get("inlineData")
            if not inline:
                continue
            mime = (inline.get("mimeType") or "").lower()
            data = inline.get("data")
            if not data:
                continue
            if "png" in mime or mime.startswith("image/"):
                return base64.b64decode(data)
    return None


def make_vertical_tileable(path: pathlib.Path, band_frac: float = 0.12) -> None:
    """
    Force top/bottom edge continuity by gently blending the top band toward the bottom band
    and the bottom band toward the top band. This avoids the obvious "midline blur" artifact
    from center-seam smoothing while still removing harsh scroll seams.
    """
    from PIL import Image

    im = Image.open(path).convert("RGBA")
    w, h = im.size
    band = max(24, int(h * band_frac))
    if band * 2 >= h:
        return

    # Prefer numpy for speed; fall back to per-pixel blend if unavailable.
    try:
        import numpy as np  # type: ignore

        arr = np.asarray(im).astype(np.float32)
        top = arr[:band, :, :]
        bottom = arr[h - band :, :, :]

        # Smoothstep curve: 0 at edge, 1 at inner band edge
        t = np.linspace(0.0, 1.0, band, dtype=np.float32)
        s = t * t * (3.0 - 2.0 * t)
        k = 0.5 * (1.0 - s)  # 0.5 at seam edge -> average, 0 at inner edge -> unchanged

        # Blend each row with its counterpart from the opposite edge.
        k_row = k[:, None, None]
        top_new = top * (1.0 - k_row) + bottom * k_row
        bottom_new = bottom * (1.0 - k_row) + top * k_row

        arr[:band, :, :] = top_new
        arr[h - band :, :, :] = bottom_new

        out = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), mode="RGBA")
        out.save(path)
        return
    except Exception:
        pass

    px = im.load()
    top_strip = [im.getpixel((x, y)) for y in range(band) for x in range(w)]
    bottom_strip = [im.getpixel((x, h - band + y)) for y in range(band) for x in range(w)]

    def smoothstep(v: float) -> float:
        return v * v * (3.0 - 2.0 * v)

    for y in range(band):
        t = y / float(band - 1)
        s = smoothstep(t)
        k = 0.5 * (1.0 - s)
        for x in range(w):
            a = px[x, y]
            b = px[x, h - band + y]
            px[x, y] = (
                int(round(a[0] * (1 - k) + b[0] * k)),
                int(round(a[1] * (1 - k) + b[1] * k)),
                int(round(a[2] * (1 - k) + b[2] * k)),
                255,
            )
            px[x, h - band + y] = (
                int(round(b[0] * (1 - k) + a[0] * k)),
                int(round(b[1] * (1 - k) + a[1] * k)),
                int(round(b[2] * (1 - k) + a[2] * k)),
                255,
            )
    im.save(path)


DEFAULT_BG_SET: list[tuple[str, str]] = [
    (
        "nb_tealrift",
        "Stylized cartoon space background tile, teal-and-violet nebula rift, soft gaseous clouds, no planets, minimal/no stars. "
        "Make it a single seamless vertical tile texture (top edge matches bottom edge), no horizon line, no frame, 1024x1024.",
    ),
    (
        "nb_crimsonstorm",
        "Stylized cartoon space background tile, crimson ion storm with warm orange highlights and dark void pockets, minimal/no stars. "
        "Single seamless vertical tile texture (top matches bottom), no horizon line, no frame, 1024x1024.",
    ),
    (
        "nb_aurorawave",
        "Stylized cartoon space background tile, green aurora waves over deep blue space, dreamy gradients, minimal/no stars. "
        "Single seamless vertical tile texture (top matches bottom), no horizon line, no frame, 1024x1024.",
    ),
    (
        "nb_wreckfield",
        "Stylized cartoon space background tile, dark wreckage field with faint silhouettes and dust, subtle highlights, minimal/no stars. "
        "Single seamless vertical tile texture (top matches bottom), no horizon line, no frame, 1024x1024.",
    ),
]


def generate_one(key: str, prompt: str, out_dir: pathlib.Path, model: str) -> pathlib.Path:
    api_key = read_key()
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY not found in environment (or fallback .env).")

    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / f"{key}.png"

    payload = build_request(prompt, ["IMAGE"])
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
    req = urllib.request.Request(
        url=url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    with urllib.request.urlopen(req, timeout=180) as resp:
        raw = resp.read()
    data = json.loads(raw.decode("utf-8"))
    img = extract_first_png(data)
    if not img:
        raise RuntimeError("No image data found in response.")
    out_path.write_bytes(img)

    # Ensure RGB/opaque and tileable.
    try:
        from PIL import Image

        im = Image.open(out_path).convert("RGB")
        if im.size[0] != 1024 or im.size[1] != 1024:
            im = im.resize((1024, 1024), resample=Image.Resampling.LANCZOS)
        im.save(out_path, optimize=True)
    except Exception:
        # If PIL isn't available, keep raw output.
        pass

    make_vertical_tileable(out_path, band_frac=0.12)
    return out_path


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out-dir", default="assets/SpaceShooterRedux/Backgrounds", help="Output directory for PNG tiles.")
    ap.add_argument("--model", default=DEFAULT_MODEL, help=f"Gemini model (default: {DEFAULT_MODEL})")
    ap.add_argument("--name", default=None, help="Generate a single background key.")
    ap.add_argument("--prompt", default=None, help="Prompt for single background generation.")
    args = ap.parse_args()

    out_dir = pathlib.Path(args.out_dir)

    if args.name and args.prompt:
        try:
            out = generate_one(args.name, args.prompt, out_dir, args.model)
            print(f"Wrote {out}")
            return 0
        except Exception as e:
            print(f"ERROR: {e}", file=sys.stderr)
            return 2

    # Batch generation
    failures = 0
    for key, prompt in DEFAULT_BG_SET:
        try:
            out = generate_one(key, prompt, out_dir, args.model)
            print(f"Wrote {out}")
        except Exception as e:
            failures += 1
            print(f"ERROR generating {key}: {e}", file=sys.stderr)

    return 0 if failures == 0 else 2


if __name__ == "__main__":
  raise SystemExit(main())

