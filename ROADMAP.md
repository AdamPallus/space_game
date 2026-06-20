# Roadmap

Last audited: 2026-06-19

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

## Next Player-Testing Priorities

These should be tuned with deployed player feedback before adding another broad system:

- Mini weapon output by targeting arc, especially 360-degree turret damage.
- Second-primary strain versus one-primary focus value.
- Dual-fire compatibility and damage-scaling tiers.
- Ledger license costs and whether broader daily stock creates too much market noise.
- Early hard-mission pickup placement and whether it encourages extraction decisions without making failure farming optimal.
- Cache readability at combat scale.
- Armor-class readability across profiled campaign missions, especially chip-fire erasure versus heavy and boss-hazard threat.
- Armory hardpoint layout and browser density on phone-sized viewports.

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
