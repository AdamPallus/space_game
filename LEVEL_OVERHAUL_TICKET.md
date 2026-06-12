# Level Overhaul: Integrate New Mechanics Into All Levels

## Overview
Revise all existing levels (1–11 + alternates) to use the new combat systems:
- **Hull/Shield/Armor** damage model (with `armorClass` for damage reduction, `shieldRegen`)
- **New AI behaviors**: `sentinel`, `skitter`, `duelist` (in addition to existing `stalker`, `hunter`, `transport`)
- **New movement patterns**: `drift`, `laneShift`, `stall`, `spiralIn`, `bossOrbit`, `bossAdvanceSweep`
- **New enemy archetypes** from the catalog: `drone`, `shieldkite`, `plated`, `tank`, `escort`, `bulwark`, `dart`, `gnat`, `spark`, `skitter`, `sentinel` (AI version), `duelist`, `stalker`

## Current State
- **Levels 1–8** use the OLD `hp`-only system. No shields, no armor, no hull. AI is limited to `hunter`, `stalker`, and `transport`.
- **Levels 9–11** already use the new hull/shield/armor system and some new enemies, but are standalone "themed" levels, not part of the main progression.
- **Alternates** (`level1_patrol`, `level2_skirmish`) are old-style hp-only.
- **Demo files** (`overhaul_demo`, `ai_demo`, `patterns_demo`) showcase the new systems but aren't real levels.
- **`enemy_catalog.json`** has full templates for all enemies with the new stats.

## Design Principles

### Pacing: Gradual Introduction
Introduce new mechanics **one at a time** across the first 5 levels so the player learns each system before facing combinations:

- **Level 1** — Keep mostly as-is (tutorial feel). Convert all enemies to hull-based (no shields/armor yet). Swap one old `sentinel` or `lurker` wave with **1–2 `drone` enemies** (low shields, shieldRegen) as a "huh, what's that blue bar?" teaser. Boss stays simple.

- **Level 2** — Introduce **armor** via 1–2 `plated` enemies in a mid-level wave. They're slow and tanky — teaches the player "some enemies take reduced damage, you need sustained fire or piercing." Keep shields minimal. Add the `sentinel` AI (holds a firing line, aims at player) to replace one generic strafe wave.

- **Level 3** — Introduce **shields + regen** properly via `shieldkite` enemies in 1–2 waves. Now the player has seen all three damage layers. Mix in a `skitter` (dodges projectiles) to show reactive AI. Boss can have modest shield + armor for the first time.

- **Level 4** — First level with **combined defenses** (enemies that have hull + shield + armor together). Introduce `duelist` AI (flanks and strafes at standoff range). `escort` gunships with armor + spread fire. Boss should be a serious hull/shield/armor challenge.

- **Level 5** — Full toolkit in play. `stalker` packs that go dormant then ambush. `bulwark` heavy haulers as priority targets. `tank` enemies that require sustained focus fire. Boss has all three bars + empImmune.

- **Levels 6–8** — Escalate combinations and density. Mix the new AI behaviors freely. Introduce patterns like `drift` for armored enemies (slow, menacing) and `laneShift` for unpredictable dodgers. More enemies per wave, overlapping waves, multiple mini-boss types before the final boss.

### Alternate Missions (3 variants per level)
Each level should have **three variants** sharing the same boss:

1. **Standard** (the default) — Mixed composition, balanced challenge
2. **Swarm** variant (suffix: `_swarm`) — Lots of fast, fragile enemies (gnats, darts, sparks, scouts). High count, low hp. Tests area damage and crowd control.
3. **Armored** variant (suffix: `_armored`) — Fewer but tankier enemies (plated, bulwark, tank, escort). Tests sustained DPS and piercing. Slower pace, each kill feels earned.

Naming: `level1.json`, `level1_swarm.json`, `level1_armored.json`

Note: `level1_patrol` and `level2_skirmish` can be renamed/repurposed as one of the variants or removed.

### Difficulty Curve (preserve current feel)
The current levels have a good difficulty ramp. Preserve this by:
- **Same approximate enemy count per level** (don't suddenly double the spawns)
- **Same approximate level duration** (boss appears at similar timestamps)
- Scale hull/shield/armor values proportionally to how hp scaled before
- Use the `enemy_catalog.json` templates as a reference for stat ranges, but **scale down for early levels** (the catalog has mid-to-late game stats)

### Stat Conversion Guide
When converting from old `hp`-only to the new system:
- Low-tier enemies (scouts, gnats): **hull only**, no shield/armor. Similar total to old hp.
- Mid-tier enemies (fighters, marauders): **hull + small shield OR small armor**, total ~1.2x old hp (since shields/armor add effective HP).
- Heavy enemies (wardens, phantoms): **hull + armor** or **hull + shield + armor**, total effective HP ~1.3-1.5x old hp.
- Shield-focused enemies: low hull, high shield, shieldRegen. Punishes players who don't maintain pressure.
- Armor-focused enemies: moderate hull, high armor, armorClass 8-14. Punishes low-damage-per-hit builds.

### Boss Design
- **Levels 1–3 bosses**: 1–2 bars (hull + one of shield or armor). Learning bosses.
- **Levels 4–5 bosses**: All three bars. First real challenge.
- **Levels 6–8 bosses**: All three bars, empImmune, shieldRegen. Consider using `bossAdvanceSweep` or `bossOrbit` patterns instead of just `bossSweep` for variety.
- **Levels 9–11**: Already done, but review for consistency with the new progression.

### New Enemy Usage Cheat Sheet

| Enemy | Key Trait | Best Used For | Introduce By |
|-------|-----------|---------------|-------------|
| `drone` | Shields + regen | Shield tutorial | Level 1 |
| `plated` | Armor + armorClass, drift pattern | Armor tutorial | Level 2 |
| `shieldkite` | High shield, strafe + spread fire | Shield pressure | Level 3 |
| `skitter` | Dodges bullets | Reactive AI intro | Level 3 |
| `sentinel` (AI) | Holds firing line, aimed shots | Positional threat | Level 2 |
| `duelist` | Flanks at standoff, aimed fire | Tactical pressure | Level 4 |
| `stalker` | Dormant → ambush | Surprise attacks | Level 4+ |
| `escort` | Armor + spread fire | Armored gunship | Level 4+ |
| `tank` | Heavy armor, slow, transport AI | Priority target | Level 5+ |
| `bulwark` | Massive armor, transport pattern | Damage sponge | Level 5+ |
| `dart` | Fast, swoop pattern | Swarm variant | Level 3+ |
| `gnat` | Very fast, zigzag, fragile | Swarm variant | Level 2+ |
| `spark` | Fast shield-kite, strafe | Swarm variant | Level 4+ |

## File Deliverables
- Updated: `level1.json` through `level8.json`
- New: `level1_swarm.json`, `level1_armored.json` (and same for levels 2–8)
- Rename/remove: `level1_patrol.json` → `level1_swarm.json` (or rebuild), `level2_skirmish.json` → `level2_swarm.json` (or rebuild)
- Review: `level9.json`, `level10.json`, `level11.json` for consistency (these already use new system but may need alternate variants)
- Keep: `overhaul_demo.json`, `ai_demo.json`, `patterns_demo.json` as test files (don't modify)

## Technical Notes
- All enemies must use the **hull/shield/armor** system (not `hp`). The `hp` field is legacy — use `hull` instead. If `hp` is present and `hull` is not, the engine falls back to hp, but new levels should use hull explicitly.
- `armorClass` controls flat damage reduction per hit. Higher = harder to chip through with fast/weak weapons.
- `shieldRegen` is shield points recovered per second when not taking damage.
- `empImmune: true` prevents EMP effects (bosses should generally have this).
- Enemy AI behaviors (`ai` field) override movement patterns (`pattern` field). An enemy can have `ai: "sentinel"` with `aiParams` but NOT also a `pattern`.
- The `enemy_catalog.json` has canonical stats but levels can override any field in their local `enemyTypes` block.
