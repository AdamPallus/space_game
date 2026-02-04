#!/usr/bin/env python3
"""
Make a solid/near-solid background transparent by flood-filling from image edges.

This is meant for AI-generated sprites that came back with a white (or other) matte.
We sample corner pixels to estimate background color, then remove only the pixels
connected to the edges that are within a threshold of that background.
"""

from __future__ import annotations

import argparse
import glob
import math
import pathlib
from collections import deque


def color_dist(a, b) -> float:
    return math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2)


def avg_color(colors):
    r = sum(c[0] for c in colors) / len(colors)
    g = sum(c[1] for c in colors) / len(colors)
    b = sum(c[2] for c in colors) / len(colors)
    return (r, g, b)


def make_transparent(path: pathlib.Path, threshold: float) -> None:
    try:
        from PIL import Image
    except Exception as e:  # pragma: no cover
        raise SystemExit("Pillow (PIL) is required for this script. Install via `pip install pillow`.") from e

    im = Image.open(path).convert("RGBA")
    w, h = im.size
    px = im.load()

    corners = [
        px[0, 0],
        px[w - 1, 0],
        px[0, h - 1],
        px[w - 1, h - 1],
    ]
    bg = avg_color(corners)

    # Flood fill from all edges that match the background color.
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
        if color_dist(c, bg) <= threshold:
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
            if color_dist(c, bg) <= threshold:
                mask[i] = 1
                q.append((nx, ny))

    # Apply alpha to masked pixels.
    for y in range(h):
        for x in range(w):
            i = idx(x, y)
            if mask[i]:
                r, g, b, _a = px[x, y]
                px[x, y] = (r, g, b, 0)

    im.save(path)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("paths", nargs="+", help="Image path(s) or globs (e.g. assets/generated/*.png)")
    ap.add_argument("--threshold", type=float, default=36.0, help="RGB distance threshold (default: 36)")
    args = ap.parse_args()

    expanded = []
    for p in args.paths:
        matches = glob.glob(p)
        expanded.extend(matches if matches else [p])

    files = [pathlib.Path(p) for p in expanded]
    for f in files:
        if not f.exists():
            continue
        make_transparent(f, args.threshold)
        print(f"Processed {f}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

