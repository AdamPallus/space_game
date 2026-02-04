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
    print(f"Wrote {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

