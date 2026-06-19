# Enemy Projectile Variety Spec

Status: implemented and verified on 2026-06-19. This document records the shipped data shape, tuning intent, and verification notes for the enemy projectile variety pass.

## Summary

Enemy projectile damage, speed, size, and visuals should be authored per shot through level JSON. The legacy flat enemy fields must remain valid so the original missions can stay untouched as comparison baselines.

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

Profile damage is explicit JSON damage. It does not use player weapon DPS formulas. Legacy missions without projectile profiles still use the existing elapsed-difficulty fallback.

## Level Content

Current baseline mission files should be preserved. New `_threats` variants should exist for every player-facing top-level `level*.json` mission, including existing swarm, armored, patrol, and skirmish variants.

The generated variants should use common-sense authorship rules:

- Small ships fire low-damage chip shots.
- High-volume patterns keep damage low.
- Line fighters mix standard shots with occasional heavy warning shots.
- Heavy ships fire fewer, larger heavy projectiles.
- Bosses mix chip rings, standard fans, and high-damage hazard shots in weighted patterns.

## Runtime And Validation

Runtime firing should choose weighted `attackPatterns` when present; otherwise it should follow the old flat fields. Enemy bullets already carry `damage` into `applyDamage`, so the implementation adds profile selection rather than a new player damage system.

`scripts/validate_levels.js` validates projectile profiles, attack patterns, shot overrides, profile references, numeric fields, and manifest entries. The Armory stats popup and compendium descriptions read the new projectile profile ranges.

## Implementation State

The implemented pass includes:

- `main.js`: runtime support for `projectileProfile`, weighted `attackPatterns`, per-shot profile resolution, threat-class visuals, updated built-in variant manifest, compendium weapon descriptions, and Armory stats projectile-range summaries.
- `scripts/validate_levels.js`: schema validation for root `projectileProfiles`, enemy `attackPatterns`, per-shot overrides, profile references, numeric fields, and supported threat classes.
- `scripts/generate_projectile_threat_levels.js`: generator for `_threats` mission copies.
- `levels/manifest.json`: threat variants added to the carousel manifest.
- `levels/*_threats.json`: generated threat variants for base missions 1-11 and existing player-facing variants.
- `LEVEL_JSON_FORMAT.md`, `CURRENT_SYSTEMS.md`, `STATE.md`, and `ROADMAP.md`: active documentation updates for the shipped behavior.

The generated `_threats` files are checked-in authored content for this pass. Regenerate them with:

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

- Mission select showed baseline missions first, with `_threats` variants reachable through the existing carousel.
- `level1_threats` launched and spawned chip and standard projectile classes with explicit profile damage.
- `level11_threats` launched, its boss exposed `chip_ring`, `mixed_fan`, and `hazard_pair`, and normal firing produced chip, heavy, and boss-hazard projectiles.
- Original `level1` launched without `projectileProfiles` or attack-pattern enemies, preserving the legacy flat projectile fallback.
- Armory/compendium helper probes reported `level11_threats` projectile damage range `8-55` and profiled boss weapon descriptions.

## Asset Rule

No new generated art is required for this pass. Threat readability uses existing generated projectile art plus canvas orb styling. If future projectile art is generated, it must use Codex built-in imagegen only; API-key, SDK, or local CLI generation workflows are out of scope.
