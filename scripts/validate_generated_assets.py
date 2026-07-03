#!/usr/bin/env python3
"""Validate generated projectile, campaign boss, and Act 2 art contracts."""

from __future__ import annotations

import json
import sys
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
LEVELS_DIR = ROOT / "levels"
PROJECTILE_DIR = ROOT / "assets" / "generated" / "enemy_projectiles_space_v1"
BOSS_DIR = ROOT / "assets" / "generated" / "bosses_broadside_v1"
CATALOG_PATH = ROOT / "enemies" / "enemy_catalog.json"
CAMPAIGN_MISSION_COUNT = 11
MIN_BOSS_ASPECT = 1.55
FORBIDDEN_PROJECTILE_TERMS = ("crescent", "comet", "wisp", "fire", "ember", "warm_boss_halo")
DIRECTIONAL_TERMS = ("chip", "bolt", "slug", "needle", "dart", "thorn_shard")
ACT2_REQUIRED_CATALOG_IDS = (
    "chorister",
    "cantor",
    "censer",
    "sexton",
    "precentor",
    "vestibule_cantor",
    "choirmaster",
    "precentor_prime",
    "emissary_chorus",
    "act2_dead_air:boss",
    "act2_processional:boss",
    "act2_antiphon:boss",
    "act2_doxology:boss",
    "teller",
    "bailiff",
    "assessor",
    "notary",
    "strongbox",
    "auditor",
    "harbormaster",
    "emissary_tithe",
    "act2_repossession:boss",
    "act2_arrears:boss",
    "act2_foreclosure:boss",
    "sporeling",
    "thornwing",
    "bloomcaller",
    "bramble",
    "seedcarrier",
    "broodmother",
    "rootward",
    "emissary_verdant",
    "act2_green_signal:boss",
    "act2_bloom:boss",
    "act2_old_growth:boss",
    "act2_pilgrimage:boss",
)


def load_json(path: Path) -> dict:
    return json.loads(path.read_text())


def alpha_bbox(path: Path) -> tuple[int, int, int, int]:
    image = Image.open(path).convert("RGBA")
    bbox = image.getchannel("A").getbbox()
    if not bbox:
        raise ValueError(f"{path} has no non-transparent pixels")
    return bbox


def validate_transparent_corners(path: Path, errors: list[str]) -> None:
    image = Image.open(path).convert("RGBA")
    width, height = image.size
    corners = [(0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)]
    if any(image.getpixel(point)[3] != 0 for point in corners):
        errors.append(f"{path.relative_to(ROOT)} does not have transparent corners")


def campaign_level_ids() -> list[str]:
    ids: list[str] = []
    for mission in range(1, CAMPAIGN_MISSION_COUNT + 1):
        base = f"level{mission}"
        ids.extend([base, f"{base}_swarm", f"{base}_armored"])
    return ids


def projectile_sprite_names() -> set[str]:
    names: set[str] = set()
    for manifest_path in sorted(PROJECTILE_DIR.glob("manifest*.json")):
        manifest = load_json(manifest_path)
        names.update(sprite["name"] for sprite in manifest.get("sprites", []))
    return names


def validate_projectiles(errors: list[str]) -> None:
    sprite_names = projectile_sprite_names()
    for name in sorted(sprite_names):
        sprite_path = PROJECTILE_DIR / f"{name}.png"
        if not sprite_path.exists():
            errors.append(f"Missing projectile sprite {sprite_path.relative_to(ROOT)}")
            continue
        validate_transparent_corners(sprite_path, errors)

    level_images: dict[str, list[str]] = {}
    for level_path in sorted(LEVELS_DIR.glob("*.json")):
        if level_path.name == "manifest.json":
            continue
        level = load_json(level_path)
        level_id = level.get("id") or level_path.stem
        profiles = level.get("projectileProfiles") or {}
        images = []
        for profile_id, profile in profiles.items():
            image = profile.get("image")
            if not image:
                errors.append(f"{level_id}.{profile_id} is missing an image")
                continue
            images.append(image)
            if image not in sprite_names:
                errors.append(f"{level_id}.{profile_id} references non-space projectile '{image}'")
            if any(term in image for term in FORBIDDEN_PROJECTILE_TERMS):
                errors.append(f"{level_id}.{profile_id} uses retired projectile style '{image}'")
            if profile.get("animation") == "ember":
                errors.append(f"{level_id}.{profile_id} uses retired ember animation")
            if any(term in image for term in DIRECTIONAL_TERMS) and "spinRate" in profile:
                errors.append(f"{level_id}.{profile_id} directional projectile '{image}' must not spin")
        level_images[level_id] = images

    for level_id in campaign_level_ids():
        images = level_images.get(level_id, [])

        if not any("_warm_" in image for image in images):
            errors.append(f"{level_id} does not include a warm projectile")
        if not any("_cool_" in image for image in images):
            errors.append(f"{level_id} does not include a cool projectile")

    level1 = load_json(LEVELS_DIR / "level1.json")
    for profile_id in ("chipNeedle", "standardBolt"):
        profile = (level1.get("projectileProfiles") or {}).get(profile_id, {})
        image = profile.get("image", "")
        if not any(term in image for term in DIRECTIONAL_TERMS):
            errors.append(f"level1.{profile_id} should introduce a simple bolt/slug, got '{image}'")
        if any(term in image for term in ("plasma", "core", "ring")):
            errors.append(f"level1.{profile_id} should not introduce heavy plasma/core/ring sprite '{image}'")


def validate_bosses(errors: list[str]) -> None:
    aspects: list[str] = []
    for mission in range(1, CAMPAIGN_MISSION_COUNT + 1):
        path = BOSS_DIR / f"boss_level{mission:02d}.png"
        if not path.exists():
            errors.append(f"Missing boss sprite {path.relative_to(ROOT)}")
            continue
        validate_transparent_corners(path, errors)
        left, top, right, bottom = alpha_bbox(path)
        width = right - left
        height = bottom - top
        aspect = width / height
        aspects.append(f"level{mission:02d}={aspect:.2f}")
        if aspect < MIN_BOSS_ASPECT:
            errors.append(
                f"{path.relative_to(ROOT)} alpha aspect {aspect:.2f} is below {MIN_BOSS_ASPECT:.2f}"
            )

    catalog = load_json(CATALOG_PATH).get("entries", {})
    for entry_id, entry in catalog.items():
        if not entry_id.startswith("level") or not entry_id.endswith(":boss"):
            continue
        sprite = ((entry.get("template") or {}).get("sprite") or "")
        if "/bosses_broadside_v1/" not in sprite:
            errors.append(f"{entry_id} uses non-broadside boss sprite '{sprite}'")

    if aspects:
        print("Boss alpha aspects:", ", ".join(aspects))


def validate_act2_catalog_art(errors: list[str]) -> None:
    catalog = load_json(CATALOG_PATH).get("entries", {})
    aspects: list[str] = []
    for entry_id in ACT2_REQUIRED_CATALOG_IDS:
        entry = catalog.get(entry_id)
        sprite = ((entry or {}).get("template") or {}).get("sprite") or ""
        if not sprite:
            errors.append(f"{entry_id} is missing an Act 2 sprite")
            continue
        path = ROOT / sprite
        if not path.exists():
            errors.append(f"{entry_id} sprite is missing: {sprite}")
            continue
        validate_transparent_corners(path, errors)
        if not entry_id.endswith(":boss"):
            continue
        left, top, right, bottom = alpha_bbox(path)
        width = right - left
        height = bottom - top
        aspect = width / height
        aspects.append(f"{entry_id}={aspect:.2f}")
        if aspect < MIN_BOSS_ASPECT:
            errors.append(f"{sprite} alpha aspect {aspect:.2f} is below {MIN_BOSS_ASPECT:.2f}")
    if aspects:
        print("Act 2 boss alpha aspects:", ", ".join(aspects))


def main() -> int:
    errors: list[str] = []
    validate_projectiles(errors)
    validate_bosses(errors)
    validate_act2_catalog_art(errors)
    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1
    print("Generated asset audit passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
