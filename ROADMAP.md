# Roadmap

Last audited: 2026-07-09

This is the active planning doc for the next playable changes. Historical specs have been archived under `outdated_docs/`; current implementation details live in `STATE.md` and `CURRENT_SYSTEMS.md`.

## Active execution slice (2026-07-09)

`PROGRESSION_MASTER_PLAN.md` records the player-validated creative direction and
the development/testing contract. Crossed Claims, Processional, and Repossession
are validated. The active follow-up strengthens focused kinetic weapons, reduces
plasma rendering cost without shrinking spectacle, replaces Repossession's
mouse-inert tractor with a telegraphed seizure slug, and makes Assessor liens
obvious. It then stops for a targeted retest. Progression, loot, item, economy,
and broader story expansions remain draft backlog.

## Player-validated combat direction (2026-07-09)

This direction is folded into the current master plan and governs the active slices:

- **Weapon spectacle is the reward.** Emergent combinations such as enormous
  impulse-scaled explosive plasma shots or rank-3 auto-targeted rapid kinetic
  streams are not balance defects merely because they erase older content. Do
  not flatten, cap, or normalize them just to preserve obsolete encounters.
- **Raise the opposition; preserve the excess.** At the player's current content
  tier, encounter composition should make the appropriate weapon role matter:
  rapid low-per-hit weapons struggle against contemporary armor, while slow
  overkill plasma struggles to service a contemporary swarm arriving across
  space and time. Avoid immunity rules and adaptive stat scaling that cancel the
  build itself.
- **Power must remain legible across tiers.** A sufficiently advanced plasma
  explosion may wipe a lower-tier swarm, and a sufficiently advanced kinetic
  stream may melt lower-tier armor. Outgearing content is intentional evidence
  that the loot hunt worked.
- **Gold clears Act 2; green outgears it.** Role-appropriate Pre-Founding gear is
  the Act 2 balance target. Heirlooms must not become required for Act 2 and
  should make its early missions materially easier. Orphan Signal is valid Act 2
  equipment; Canticle Core is intentionally above the baseline.
- **The known-good campaign ends at Last Light.** Missions 1 through 8 and their
  armor/swarm/hybrid replay vocabulary are the usable Act 1 foundation. Missions
  9-11 and the current Act 2/3 mission scripts are disposable experiments, not
  content future authors are obliged to preserve. Their AI behaviors, art,
  projectile patterns, boss machinery, and other useful subsystems remain a
  toolbox.
- **Prove one mission before generating an act.** Post-Last-Light content should
  begin as a small difficulty vertical slice and expand only after player testing
  shows that its missions are worth replaying for fun.
- **Human play is the gate.** Codex runs deterministic validators and a focused
  launch smoke, then deploys and stops. Adam performs the meaningful combat
  playtest and returns the next fix list; exhaustive agent button-testing is not
  a shipping requirement for this stage.

## Player-Testing Overhaul Implemented

The broad cleanup and loadout overhaul from `outdated_docs/implemented_specs/NEXT_OVERHAUL_SPEC.md` has been implemented for player testing:

- Fresh saves enter the hangar with starter gear and no required Flight School gate.
- Credit settlement now uses explicit sources instead of score or elapsed-time conversion.
- Early harder missions include front-loaded salvage and survivability pickups that still require extraction or completion to keep value.
- Shield boosters, armor patch caches, and EMP projectile clearing are in combat.
- Armory inventory, item archive, and Ledger sell views have search, sort, and filter controls.
- Ledger licenses increase visible daily shop lots from 5 to 7, 9, and 11.
- Weapon stats show per-shot damage, volley output, and sustained DPS.
- Mini weapons, named hulls, second-primary swapping, one-primary focus bonuses, aux engineering, and compatible dual-fire tiers are implemented.

## Enemy Projectile Variety Implemented

The `outdated_docs/implemented_specs/ENEMY_PROJECTILE_VARIETY_SPEC.md` pass has been implemented for player testing:

- Level JSON supports root `projectileProfiles`, enemy `projectileProfile`, weighted `attackPatterns`, and per-shot overrides.
- Campaign missions use explicit projectile profiles and weighted attack patterns across Standard, Swarm, and Armored variants.
- Legacy flat enemy fields remain valid for lab or fallback missions when attack patterns are absent.
- The Armory stats popup and compendium descriptions read the new authored projectile damage ranges.
- `scripts/validate_levels.js` validates projectile profile references, attack-pattern structure, shot overrides, numeric fields, and threat classes.

## Loot Depth Implemented

The `outdated_docs/implemented_specs/LOOT_DEPTH_SPEC.md` Phase 6 pass has been implemented for player testing:

- Per-instance affix magnitude rolls (`roll` ranges in `item_pool.json`) plus effect-trace potency tiers give same-base, same-rarity items a real strength spread.
- Items store a `rollQuality` that scales value (`0.85 + 0.45 * rollQuality`) and drives a rarity-tinted roll-quality bar in tooltips/inspector; affix lines show the real rolled magnitude.
- Pre-Founding items roll three affixes where the pool allows.
- Aux abilities roll a per-item potency (cloak/EMP/bulwark knobs) plus offense and defense passives; the `auxPower` investment is retired and old saves migrate (capabilities ladder remapped to dual-fire-only, spent aux credits refunded).
- `balance_report.js` gained a magnitude-roll DPS-spread section (~17–21% across same base + rarity, was ~0).

## Item Clarity Implemented

The `outdated_docs/implemented_specs/ITEM_CLARITY_SPEC.md` Phase 7 pass has been implemented for player testing:

- Item cards, tooltips, market lots, debrief rows, and the inspector now use intrinsic item stats for headlines and stat lines, with effective install deltas labelled separately.
- Weapon cards read DPS -> Pattern -> Damage per Shot -> Ammo -> Special -> Shots per Second, then breakdowns, affix lines, and the roll-quality bar at the bottom.
- Kinetic and plasma weapons show player-language damage breakdowns, plus installed modifier lines for aux flow, armor drag, hull tuning, single-primary focus, and second-bay strain.
- Single-primary focus is now a primary-damage bonus; second-bay strain is now a per-weapon primary-damage penalty. `balance_report.js` prints and checks that tradeoff.
- The Armory Show Stats popup is player-facing: Offense, Defense, Aux, and Loadout only, with no internal item ids or mission count.
- The Armory main stage now aligns Primary A/B with Defense A/B, centers the fire-mode selector between the primary bays, and shows each equipped primary's Effective DPS, Damage per Shot, and Shots per Second.

## Economy Control Layer Implemented

The `outdated_docs/implemented_specs/ECONOMY_CONTROL_SPEC.md` Phase 8 prelude has been implemented without balance changes:

- Active economy knobs now live in validated `config/economy.json`, loaded before save migration and hangar rendering.
- `main.js` reads market, extraction, item value, drop table, mission reward, investment, consumable, report-target, and legacy credit-gate values from the config while leaving combat math, level data, enemy data, and item affixes authoritative in their existing files.
- Ledger lots keep saved item/list value and compute current purchase/sale quotes from live config, with sale handling fee derived from `sellRate`.
- `scripts/validate_economy_config.js` checks required sections, numeric ranges, tier ordering, ids, hull ids, upgrade ids, and report targets.
- `scripts/balance_report.js` now prints Credit Flow full-clear and first-third short-loop rows, no-spend cumulative baselines, affordability milestones, and warnings for target/saturation concerns.
- `?devTuning=1` provides a compact non-combat economy console with sparse local overrides, immediate rerendering, active override badge, reset, and merged JSON export.

## Next Player-Testing Priorities

Crossed Claims' first playtest validated the encounter thesis: high armor class erased
much of the chip field, grapplers and heavy projectiles still threatened the
ship, and twin-rapid plasma cleared the swarm while struggling against armored
anchors. The run ended around one minute and was judged fun. The immediate
periodic-movement origin bug was fixed globally. Processional's first playtest
then validated its pure swarm/formation role check: Needlebloom plus AC30 plate
survived chip volume while ships and heavy notes remained threats, and conductor
collapse read clearly. Its first miniboss now holds an orbit instead of descending
offscreen before the player gets a fair damage window. Repossession then validated
the low-count AC30–42 Tithe gunline: Starwound Lance cleared it, while rapid-homing
still lost to armor despite higher listed DPS. The resulting focused pass raises
single-shot kinetic output, optimizes plasma visuals, replaces the Escrow tractor
with a dodgeable seizure shot, and makes lien drains visible.

Repossession also exposed a reward mismatch: a pilot who needs gold gear has no
reason to risk the run for visibly scrap/certified/prototype salvage. Preserve the
drop-and-theft machinery, but solve incentive later through act-aware rarity
floors, upgrade/crafting value, or milestone rewards in the economy/reward pass.

Other tuning candidates—mini output, Dual Fire scaling, loot rolls, economy
scarcity, cloak payoff, and mobile Armory density—remain valid backlog but are
not part of the active slice.

## Story-Economy Arc (draft backlog)

Settled direction from the 2026-07-01 story session (`STORY-PREMISE-DEEP-HISTORY.md`). These phases come after the tuning priorities above, and the order is load-bearing: each phase is the setup for the next one's story beat. The economy is the narrative delivery mechanism — receipts, remittances, and manifest lines tell the story; no cutscenes.

1. **Phase 8 — The Bill Arrives (credit sink + leash).** Build the two designed-but-deferred sinks from `ECONOMY_DESIGN.md`: Family Tier (§7 — signed remittance liabilities plus gray-market perks delivered by named family members) and Hull Ownership (§6 — lease writedown vs. owned flat refit plus mod bay). This is the fix for the credit surplus: money starts buying a life instead of just gear, and the Chapter 1 leash appears on screen as a recurring red receipt line the player chose to sign. Use `config/economy.json`, Credit Flow, and `?devTuning=1` for tuning instead of code edits.
2. **Phase 9 — Planet Raids (the hidden extraction).** Build the surface-layer sketch (`ECONOMY_DESIGN.md` §9) as a distinct raid mission type. Surface targets are loot, not threats; raids gate the next tier of consumables and the deferred cargo/economy hulls. Every raid debrief carries a **sealed manifest** line — cargo the player delivered, never saw, and is not paid for ("Manifest line 7 — sealed under Ledger seal."). Sealed manifests accumulate visibly in the archive. Pre-Founding relic lore lines begin pointing at what the manifests contain.
3. **Phase 10 — The Fork (Loyalist / Rebel).** Off-books resistance contracts that never appear on the mission board, versus a Ledger confidence track that eventually makes the true-believer case in full. Rebel path is autonomous drone allies with an escalating drift risk, per the deep-history doc. Do not spec this phase until 8 and 9 are playable — the fork only means something once the leash and the manifests have been felt.

## Silent Lineages toolbox status

The old Act 2 campaign is not player-facing canon. Its generated fleets,
backgrounds, projectile profiles, miniboss presentation, graph machinery,
conductor/mimic/thief/lien/spawner/splitter AIs, tractor patterns, and boss phases
remain reusable tools. Crossed Claims reuses selected Chorus, Tithe, conductor,
gunwall, and latch machinery with entirely new enemy stats and wave authoring;
Processional reuses Chorus identities in a newly authored swarm mission;
Repossession reuses Tithe identities in a newly authored armor mission.

The discarded mission cards remain available only under `?devActs=1` for
regression access. Passing validation does not make them campaign content.

## Probate toolbox status

The old Act 3 encounters are also hidden experiments. Pressure telemetry,
rammer/latch behaviors, breach integrity, lien caps, boss phases, Heirloom
plumbing, invasion art, and the home-hull background remain reusable systems.
No Probate mission or music pass is currently authorized as campaign work.

## Deferred

- Item durability is not a near-term priority. It may create maintenance friction before the core upgrade and loot loops are strong enough.
- Certification systems remain design direction, not active implementation work.
- The third-path ending (`STORY-PREMISE-DEEP-HISTORY.md`) stays deliberately undesigned until the Phase 10 fork exists.

## Acceptance Checks

Each shipped roadmap slice should update `CURRENT_SYSTEMS.md` when behavior changes and should pass:

```bash
node --check main.js
node --check scripts/balance_report.js
node scripts/validate_economy_config.js
node scripts/validate_levels.js
python3 scripts/validate_generated_assets.py
node scripts/validate_weapon_frames.js
node scripts/balance_report.js
node scripts/validate_docs.js
git diff --check
```

UI changes should also receive a browser smoke test on the local static server.
