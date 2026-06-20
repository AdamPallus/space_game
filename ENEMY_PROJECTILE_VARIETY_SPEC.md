# Enemy Projectile Variety Spec

Status: implemented and verified on 2026-06-19, with same-day follow-ups for
warm/cool projectile art, variant progression unlocks, starter kinetic tuning,
mini-weapon card accents, three-variant campaign cleanup, rotating-projectile
aesthetic rules, and generated boss progression art. This document records the
shipped data shape, tuning intent, and verification notes for the enemy
projectile variety pass.

## Summary

Enemy projectile damage, speed, size, and visuals should be authored per shot through campaign level JSON. The legacy flat enemy fields must remain valid for lab missions and fallback content when attack patterns are absent.

The key design target is armor-class testing: high armor class should erase small chip fire, but readable heavy projectiles and boss hazards should still threaten the player.

## Data Model

Levels may define a root `projectileProfiles` object. Each named profile can set:

- `damage`: final raw hit damage for this projectile.
- `speed`: projectile velocity.
- `radius`, `width`, `height`: collision and render scale.
- `threatClass`: `chip`, `standard`, `heavy`, or `bossHazard`.
- `visual`, `image`, `color`, `shape`, `animation`, `spinRate`: render identity.

Enemy overrides may define `projectileProfile` and `attackPatterns`. An attack pattern can set:

- `mode`: `aim`, `spread`, or `radial`.
- `profile`: default projectile profile for the pattern.
- `count`, `spreadDeg`, `fireRate`, `weight`, `speedJitter`.
- `shots`: optional per-shot profile or inline overrides, including `angleDeg` and `angleOffsetDeg`.

If `attackPatterns` are absent, enemies use the legacy `fireMode`, `fireCount`, `fireSpread`, `bulletSpeed`, `bulletDamage`, `bulletStyle`, and `damageScale` behavior.

## Tuning Bands

The first threat-variant pass should use these damage bands:

- `chip`: 4-9 damage, small and fast, used by tiny ships and dense volleys.
- `standard`: 12-18 damage, current baseline threat.
- `heavy`: 25-36 damage, larger/slower, used by heavy ships and warning shots.
- `bossHazard`: 40-55 damage, obvious boss or elite shots.

Profile damage is explicit JSON damage. It does not use player weapon DPS formulas. Non-campaign missions without projectile profiles still use the existing elapsed-difficulty fallback.

## Level Content

The campaign should expose 11 missions with exactly three player-facing entries each: Standard, Swarm, and Armored. All 33 campaign entries should carry `projectileProfiles` and authored `attackPatterns`; older `_threats`, patrol, and skirmish campaign variants are retired from the player-facing level set.

The generated variants should use common-sense authorship rules:

- Small ships fire low-damage chip shots.
- High-volume patterns keep damage low.
- Line fighters mix standard shots with occasional heavy warning shots.
- Heavy ships fire fewer, larger heavy projectiles.
- Bosses mix chip rings, standard fans, and high-damage hazard shots in weighted patterns.

## Runtime, Art, And Validation

Runtime firing should choose weighted `attackPatterns` when present; otherwise it should follow the old flat fields. Enemy bullets already carry `damage` into `applyDamage`, so the implementation adds profile selection rather than a new player damage system.

Projectile visuals should mix warm and cool generated sprite keys. Heavy and boss-hazard campaign profiles should avoid flat color-only circles and use textured image sprites with visible internal structure. `spinRate` is restricted to compact or circular silhouettes, including orbs, halos, radial pellets, and compact crescents; directional or long/narrow sprites such as needles, bolts, lances, slugs, spears, and prisms should face travel direction without spinning.

`scripts/validate_levels.js` validates projectile profiles, attack patterns, shot overrides, profile references, numeric fields, rotating-sprite proportions, and manifest entries. The Armory stats popup and compendium descriptions read the new projectile profile ranges.

## Implementation State

The implemented pass includes:

- `main.js`: runtime support for `projectileProfile`, weighted `attackPatterns`, per-shot profile resolution, threat-class visuals, updated built-in variant manifest, compendium weapon descriptions, and Armory stats projectile-range summaries.
- `scripts/validate_levels.js`: schema validation for root `projectileProfiles`, enemy `attackPatterns`, per-shot overrides, profile references, numeric fields, and supported threat classes.
- `scripts/generate_projectile_threat_levels.js`: generator for the profiled 11-mission, 3-variant campaign set.
- `levels/manifest.json`: each campaign base mission maps to its Swarm and Armored variants.
- `levels/level*.json`: Standard, Swarm, and Armored campaign entries for levels 1-11.
- `LEVEL_JSON_FORMAT.md`, `CURRENT_SYSTEMS.md`, `STATE.md`, and `ROADMAP.md`: active documentation updates for the shipped behavior.

Regenerate the checked-in campaign level data with:

```bash
node scripts/generate_projectile_threat_levels.js
```

## Verification

Final implementation checks run on 2026-06-19:

- `node --check main.js`
- `node --check scripts/balance_report.js`
- `node --check scripts/validate_levels.js`
- `node --check scripts/generate_projectile_threat_levels.js`
- `node scripts/validate_levels.js`
- `node scripts/validate_weapon_frames.js`
- `node scripts/balance_report.js`
- `git diff --check`

Browser smoke coverage on `http://127.0.0.1:8765/?devSkip=1&devAutoFire=1&devInvincible=1`:

- Mission select showed campaign missions with carousel variants reachable through the existing arrows.
- `level1` launched and spawned chip and standard projectile classes with explicit profile damage.
- `level11` launched, its boss exposed `chip_ring`, `mixed_fan`, and `hazard_pair`, and normal firing produced chip, heavy, and boss-hazard projectiles.
- Armory/compendium helper probes reported `level11` projectile damage range `8-55` and profiled boss weapon descriptions.

## Follow-Up Notes

The follow-up pass adds `assets/generated/enemy_projectiles_v2/` and
`assets/generated/enemy_projectiles_warm_v1/`, both processed through the
existing chroma-key workflow. Campaign profile generation assigns a warm/cool
mix while preserving the same `projectileProfiles` schema.

Completing any variant of `levelX` now unlocks `levelX+1` through the
base-level progression lookup.

Boss progression art lives in `assets/generated/bosses_v2/` as 11 generated
256x256 sprites. All variants of a mission share that mission's boss sprite,
and later mission bosses should read as more dangerous.

The starter Cadet Kinetic Frame now carries extra kinetic impulse so its focused
shots are faster and its reported DPS is close to the other starter frames.
Scrap-grade mini weapon cards use scrap-gray accents instead of the mini weapon
type's cool accent color.

## Asset Rule

Generated projectile art must use Codex built-in imagegen only; API-key, SDK, or
local CLI generation workflows are out of scope. Transparent gameplay sprites
use the repo's chroma-key sheet workflow and local alpha processing.
