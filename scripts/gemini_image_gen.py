#!/usr/bin/env python3
"""
Generate images via the Gemini API (Nano Banana workflow).

Usage:
  python3 scripts/gemini_image_gen.py --prompt "..." --out assets/generated/foo.png
  python3 scripts/gemini_image_gen.py --prompt "..." --ref assets/SpaceShooterRedux/PNG/ufoRed.png --out assets/generated/foo.png

Auth:
  - Reads GEMINI_API_KEY from environment.
  - If not set, tries to read it from /Users/pallusa/research_game_love2d/.env (dev convenience).

Note:
  This script is for local asset generation only. Do NOT commit API keys.
"""

from __future__ import annotations

import argparse
import base64
import json
import os
import pathlib
import sys
import urllib.request
import math
from collections import deque


DEFAULT_MODEL = "gemini-2.5-flash-image"
DEFAULT_ENV_FALLBACK = "/Users/pallusa/research_game_love2d/.env"


def read_key() -> str | None:
    key = os.getenv("GEMINI_API_KEY")
    if key:
        return key.strip()
    # Convenience fallback to a local .env used in another repo on this machine.
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


def build_request(prompt: str, ref_path: str | None, response_modalities: list[str]) -> dict:
    parts: list[dict] = [{"text": prompt}]
    if ref_path:
        ref_bytes = pathlib.Path(ref_path).read_bytes()
        parts.append(
            {
                "inlineData": {
                    "mimeType": "image/png",
                    "data": base64.b64encode(ref_bytes).decode("ascii"),
                }
            }
        )
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


def _color_dist(a, b) -> float:
    return math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2)


def _avg_corner_color(px, w, h):
    corners = [px[0, 0], px[w - 1, 0], px[0, h - 1], px[w - 1, h - 1]]
    r = sum(c[0] for c in corners) / 4.0
    g = sum(c[1] for c in corners) / 4.0
    b = sum(c[2] for c in corners) / 4.0
    return (r, g, b)


def postprocess_make_bg_transparent(path: pathlib.Path, threshold: float) -> None:
    try:
        from PIL import Image
    except Exception:
        # Optional: don't fail the whole generation if PIL isn't installed.
        return

    im = Image.open(path).convert("RGBA")
    a = im.getchannel("A")
    lo, hi = a.getextrema()
    if lo < 255:
        return  # already has transparency

    w, h = im.size
    px = im.load()
    bg = _avg_corner_color(px, w, h)

    visited = bytearray(w * h)
    mask = bytearray(w * h)
    q = deque()

    def idx(x, y):
        return y * w + x

    def push(x, y):
        i = idx(x, y)
        if visited[i]:
            return
        visited[i] = 1
        c = px[x, y]
        if _color_dist(c, bg) <= threshold:
            mask[i] = 1
            q.append((x, y))

    for x in range(w):
        push(x, 0)
        push(x, h - 1)
    for y in range(h):
        push(0, y)
        push(w - 1, y)

    while q:
        x, y = q.popleft()
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if nx < 0 or nx >= w or ny < 0 or ny >= h:
                continue
            i = idx(nx, ny)
            if visited[i]:
                continue
            visited[i] = 1
            c = px[nx, ny]
            if _color_dist(c, bg) <= threshold:
                mask[i] = 1
                q.append((nx, ny))

    for y in range(h):
        for x in range(w):
            i = idx(x, y)
            if mask[i]:
                r, g, b, _ = px[x, y]
                px[x, y] = (r, g, b, 0)

    im.save(path)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--prompt", required=True, help="Prompt for image generation.")
    ap.add_argument("--out", required=True, help="Output PNG path.")
    ap.add_argument("--ref", default=None, help="Optional reference PNG path (image-to-image).")
    ap.add_argument("--model", default=DEFAULT_MODEL, help=f"Gemini model (default: {DEFAULT_MODEL})")
    ap.add_argument(
        "--modalities",
        default="IMAGE",
        help="Comma-separated response modalities (e.g. IMAGE or TEXT,IMAGE). Default: IMAGE",
    )
    ap.add_argument(
        "--no-make-transparent",
        action="store_true",
        help="Disable background-to-transparent post-process (enabled by default for sprite work).",
    )
    ap.add_argument(
        "--transparent-threshold",
        type=float,
        default=36.0,
        help="RGB distance threshold for background removal (default: 36).",
    )
    args = ap.parse_args()

    key = read_key()
    if not key:
        print("ERROR: GEMINI_API_KEY not found in environment (or fallback .env).", file=sys.stderr)
        return 2

    out_path = pathlib.Path(args.out)
    out_path.parent.mkdir(parents=True, exist_ok=True)

    modalities = [m.strip().upper() for m in args.modalities.split(",") if m.strip()]
    payload = build_request(args.prompt, args.ref, modalities)

    url = f"https://generativelanguage.googleapis.com/v1beta/models/{args.model}:generateContent?key={key}"
    req = urllib.request.Request(
        url=url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    with urllib.request.urlopen(req, timeout=120) as resp:
        raw = resp.read()
    data = json.loads(raw.decode("utf-8"))
    img = extract_first_png(data)
    if not img:
        print("ERROR: No image data found in response.", file=sys.stderr)
        # Print a short debug snippet without dumping everything.
        print(json.dumps({"keys": list(data.keys())}, indent=2), file=sys.stderr)
        return 3

    out_path.write_bytes(img)
    if not args.no_make_transparent:
        postprocess_make_bg_transparent(out_path, args.transparent_threshold)
    print(f"Wrote {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
