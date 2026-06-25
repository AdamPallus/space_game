# Roadmap

Last audited: 2026-06-25

This is the active planning doc for the next playable changes. Historical specs have been archived under `outdated_docs/`; current implementation details live in `STATE.md` and `CURRENT_SYSTEMS.md`.

## Player-Testing Overhaul Implemented

The broad cleanup and loadout overhaul from `NEXT_OVERHAUL_SPEC.md` has been implemented for player testing:

- Fresh saves enter the hangar with starter gear and no required Flight School gate.
- Credit settlement now uses explicit sources instead of score or elapsed-time conversion.
- Early harder missions include front-loaded salvage and survivability pickups that still require extraction or completion to keep value.
- Shield boosters, armor patch caches, and EMP projectile clearing are in combat.
- Armory inventory, item archive, and Ledger sell views have search, sort, and filter controls.
- Ledger licenses increase visible daily shop lots from 5 to 7, 9, and 11.
- Weapon stats show per-shot damage, volley output, and sustained DPS.
- Mini weapons, named hulls, second-primary swapping, one-primary focus bonuses, aux engineering, and compatible dual-fire tiers are implemented.

## Enemy Projectile Variety Implemented

The `ENEMY_PROJECTILE_VARIETY_SPEC.md` pass has been implemented for player testing:

- Level JSON supports root `projectileProfiles`, enemy `projectileProfile`, weighted `attackPatterns`, and per-shot overrides.
- Campaign missions use explicit projectile profiles and weighted attack patterns across Standard, Swarm, and Armored variants.
- Legacy flat enemy fields remain valid for lab or fallback missions when attack patterns are absent.
- The Armory stats popup and compendium descriptions read the new authored projectile damage ranges.
- `scripts/validate_levels.js` validates projectile profile references, attack-pattern structure, shot overrides, numeric fields, and threat classes.

## Loot Depth Implemented

The `LOOT_DEPTH_SPEC.md` Phase 6 pass has been implemented for player testing:

- Per-instance affix magnitude rolls (`roll` ranges in `item_pool.json`) plus effect-trace potency tiers give same-base, same-rarity items a real strength spread.
- Items store a `rollQuality` that scales value (`0.85 + 0.45 * rollQuality`) and drives a rarity-tinted roll-quality bar in tooltips/inspector; affix lines show the real rolled magnitude.
- Pre-Founding items roll three affixes where the pool allows.
- Aux abilities roll a per-item potency (cloak/EMP/bulwark knobs) plus offense and defense passives; the `auxPower` investment is retired and old saves migrate (capabilities ladder remapped to dual-fire-only, spent aux credits refunded).
- `balance_report.js` gained a magnitude-roll DPS-spread section (~17–21% across same base + rarity, was ~0).

## Item Clarity Implemented

The `ITEM_CLARITY_SPEC.md` Phase 7 pass has been implemented for player testing:

- Item cards, tooltips, market lots, debrief rows, and the inspector now use intrinsic item stats for headlines and stat lines, with effective install deltas labelled separately.
- Weapon cards read DPS -> Pattern -> Damage per Shot -> Ammo -> Special -> Shots per Second, then breakdowns, affix lines, and the roll-quality bar at the bottom.
- Kinetic and plasma weapons show player-language damage breakdowns, plus installed modifier lines for aux flow, armor drag, hull tuning, single-primary focus, and second-bay strain.
- Single-primary focus is now a primary-damage bonus; second-bay strain is now a per-weapon primary-damage penalty. `balance_report.js` prints and checks that tradeoff.
- The Armory Show Stats popup is player-facing: Offense, Defense, Aux, and Loadout only, with no internal item ids or mission count.
- The Armory main stage now aligns Primary A/B with Defense A/B, centers the fire-mode selector between the primary bays, and shows each equipped primary's Effective DPS, Damage per Shot, and Shots per Second.

## Next Player-Testing Priorities

These should be tuned with deployed player feedback before adding another broad system:

- Mini weapon output by targeting arc, especially 360-degree turret damage.
- Second-primary damage strain versus one-primary damage focus value.
- Dual-fire compatibility and damage-scaling tiers.
- Ledger license costs and whether broader daily stock creates too much market noise.
- Early hard-mission pickup placement and whether it encourages extraction decisions without making failure farming optimal.
- Cache readability at combat scale.
- Armor-class readability across profiled campaign missions, especially chip-fire erasure versus heavy and boss-hazard threat.
- Armory browser density on phone-sized viewports.
- Loot roll ranges and the aux potency envelope are first-pass; tune against `balance_report.js` and playtest (god-roll uptime, whether high rolls over-raise the ceiling, whether the value curve keeps credits scarce).
- Cloak still only hides even at a god roll. Phase 6b candidate: add an offense payoff (e.g. damage on the cloak-breaking shot, or a brief post-cloak Shots per Second spike) if duration/recharge rolls alone feel flat. No combat code yet.
- Harder campaign content via authored high-damage projectile profiles, only after god rolls measurably raise the player ceiling (kept out of the loot pass deliberately).

## Deferred

- Item durability is not a near-term priority. It may create maintenance friction before the core upgrade and loot loops are strong enough.
- The larger economy-design ideas around family tiers, hull ownership, surface layers, and certifications remain design direction, not active implementation work.

## Acceptance Checks

Each shipped roadmap slice should update `CURRENT_SYSTEMS.md` when behavior changes and should pass:

```bash
node --check main.js
node --check scripts/balance_report.js
node scripts/validate_levels.js
node scripts/validate_weapon_frames.js
node scripts/balance_report.js
git diff --check
```

UI changes should also receive a browser smoke test on the local static server.
