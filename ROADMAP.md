# Roadmap

Last audited: 2026-07-02

This is the active planning doc for the next playable changes. Historical specs have been archived under `outdated_docs/`; current implementation details live in `STATE.md` and `CURRENT_SYSTEMS.md`.

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

These should be tuned with deployed player feedback before adding another broad system:

- Mini weapon output by targeting arc, especially 360-degree turret damage.
- Second-primary damage strain versus one-primary damage focus value.
- Dual-fire compatibility and damage-scaling tiers.
- Ledger license costs and whether broader daily stock creates too much market noise, now using `?devTuning=1` and the Credit Flow report for rapid config-only iteration.
- Early hard-mission pickup placement and whether it encourages extraction decisions without making failure farming optimal.
- Cache readability at combat scale.
- Armor-class readability across profiled campaign missions, especially chip-fire erasure versus heavy and boss-hazard threat.
- Armory browser density on phone-sized viewports.
- Loot roll ranges and the aux potency envelope are first-pass; tune against `balance_report.js` and playtest (god-roll uptime, whether high rolls over-raise the ceiling, whether the value curve keeps credits scarce).
- Pre-Founding primary relics now cover every spread/ammo pair, and plasma impulse scaling raises the late-game plasma ceiling. Tune the next longer mission set against stronger relic plasma and impulse-heavy kinetic builds rather than immediately nerfing the new top end.
- Cloak still only hides even at a god roll. Phase 6b candidate: add an offense payoff (e.g. damage on the cloak-breaking shot, or a brief post-cloak Shots per Second spike) if duration/recharge rolls alone feel flat. No combat code yet.
- Harder campaign content via authored high-damage projectile profiles, only after god rolls measurably raise the player ceiling (kept out of the loot pass deliberately).
- First-pass economy scarcity tuning has landed (`bountyRate` 0.25 + repriced investment tracks; milestones now spread M1–M7+ in the balance report's Credit Flow section). Playtest whether salvage-first income feels right and whether late tiers feel earned rather than grindy. Known remaining gaps for level authoring, not config: the short-loop farm underpays its ~30% target (front-load more transport/captain salvage sources in early missions), and levels 9–11 pay less than 7–8 (harder missions should pay in loot quality — more and better drop sources — not bounty). Both apply to the Act 2 mission set.

## Story-Economy Arc (next broad systems, in this order)

Settled direction from the 2026-07-01 story session (`STORY-PREMISE-DEEP-HISTORY.md`). These phases come after the tuning priorities above, and the order is load-bearing: each phase is the setup for the next one's story beat. The economy is the narrative delivery mechanism — receipts, remittances, and manifest lines tell the story; no cutscenes.

1. **Phase 8 — The Bill Arrives (credit sink + leash).** Build the two designed-but-deferred sinks from `ECONOMY_DESIGN.md`: Family Tier (§7 — signed remittance liabilities plus gray-market perks delivered by named family members) and Hull Ownership (§6 — lease writedown vs. owned flat refit plus mod bay). This is the fix for the credit surplus: money starts buying a life instead of just gear, and the Chapter 1 leash appears on screen as a recurring red receipt line the player chose to sign. Use `config/economy.json`, Credit Flow, and `?devTuning=1` for tuning instead of code edits.
2. **Phase 9 — Planet Raids (the hidden extraction).** Build the surface-layer sketch (`ECONOMY_DESIGN.md` §9) as a distinct raid mission type. Surface targets are loot, not threats; raids gate the next tier of consumables and the deferred cargo/economy hulls. Every raid debrief carries a **sealed manifest** line — cargo the player delivered, never saw, and is not paid for ("Manifest line 7 — sealed under Ledger seal."). Sealed manifests accumulate visibly in the archive. Pre-Founding relic lore lines begin pointing at what the manifests contain.
3. **Phase 10 — The Fork (Loyalist / Rebel).** Off-books resistance contracts that never appear on the mission board, versus a Ledger confidence track that eventually makes the true-believer case in full. Rebel path is autonomous drone allies with an escalating drift risk, per the deep-history doc. Do not spec this phase until 8 and 9 are playable — the fork only means something once the leash and the manifests have been felt.

## Act 2 Campaign — The Silent Lineages (content track, runs parallel to the economy phases)

Design in `ACT2_SILENT_LINEAGES_DESIGN.md` (2026-07-02). Eleven longer (3–6 min) missions with named minibosses build the deep-history fiction into playable content: three sibling-lineage factions (Chorus, Tithe, Verdant), a branching Ledger-sanctioned/off-book fork, and a convergence finale at the Origin Hull that hands the player the black-box evidence Phase 10 spends. Status:

- **Shipped:** all 11 `act2_*` missions, 37 new catalog enemies/minibosses/bosses, graph unlocks and visible fork, Deep Registry Shard gate, miniboss treatment, branch-standing records, conductor/mimic/thief/lien/spawner/splitter AIs, Collections Barge tractor hook, Doxology/Pilgrimage boss phases, and debrief lore lines. Playable now; validated.
- **Next (art pass, `ACT2_CODEX_SPEC.md`):** Chorus/Tithe/Verdant/Origin generated packs, three backgrounds, projectile variants, sprite swaps, runtime registrations, compendium refresh, and visual QA. Placeholder/fallback art remains until this lands.
- The Tithe's manifest lore lines are authored to converge with the Phase 9 sealed-manifest thread, and branch standing (sanctioned vs. off-book completions) is tracked as Phase 10 groundwork only.

## Act 3 Campaign — Probate (active content track)

Playtest verdict on Act 2 (2026-07-03): mechanically complete, not fun — nothing tried to kill the player. `ACT3_PROBATE_DESIGN.md` turns that diagnosis into a combat doctrine with measured pressure floors (`?devPressure=1` telemetry + reference-build simulation), and Act 3 ("They Followed You Home" — all three lineages converge on the player's mothership) is the doctrine's proving ground.

- **Shipped:** pressure telemetry in `main.js`; Act 3 missions P1-P3 (Death Notice / Next of Kin / Death Duties), authored, sim-flown, and tuned to measured floors (P1 ~118 avg incoming DPS, P2 ~94, P3 ~237 vs. Act 1's Gauntlet at ~200 and Act 2's ~15); rammer/latch AIs, breach-integrity defense stake, Heirloom rarity tier and first Heirloom item families, lien attach cap, boss-phase resumption fix, generated `invasion_v1` sprites, and the generated `home_hull` background.
- **Active follow-up (`ACT3_CODEX_SPEC.md`):** first ACE-Step music pass for the three shipped Act 3 missions, with `act3_heir_apparent.ogg` deferred until the P7 boss exists.
- **Then:** P4-P7 authored against the same floors after Adam confirms P1-P3 feel right; afterwards Act 2 gets a combat-only retune (event tables and fire rates; art/story/structure unchanged).

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
