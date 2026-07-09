# Space Shooter Current State

Last audited: 2026-07-09

This is the first file to read before changing the game. It summarizes what is implemented now, which docs are still authoritative, which older specs are archived, and which validation commands should pass before committing.

## Current Game Shape

The project is a browser-based extraction shmup. Players launch from the hangar, fight through scripted mission waves, collect salvage pods and item drops, then extract or lose part of the haul. The current build already includes:

- A flat scene shell for hangar, mission select, armory, Ledger market, profile, item archive, compendium, and combat.
- Scripted JSON missions in `levels/` with variants, lab encounters, bosses, salvage pods, item drops, enemy projectile profiles/attack patterns, and enemy catalog validation.
- The player-facing campaign runs from Mission 1 through Mission 8 / Last Light, then continues through three newly authored slices: Crossed Claims (hybrid), Processional (Chorus swarm), and Repossession (Tithe armor). Missions 9–11 and the remaining old Act 2/3 encounter scripts are hidden from the normal board; `?devActs=1` exposes and unlocks them only for agentic regression access.
- The discarded Act 2/3 passes remain a mechanics and art toolbox: graph unlocks, branch tracking, miniboss treatment, lineage AIs, boss phases, tractor pulls, rammer/latch behavior, breach integrity, lien caps, generated fleets/backgrounds, and Heirloom plumbing still exist even though their old missions are not campaign canon.
- A cargo and extraction loop with recovery bonuses, death writedowns, cargo holds, mission debriefs, and itemized salvage.
- Stable replay difficulty: completed mission count drives records, market refreshes, and mission numbering, but it does not scale enemy damage or speed on replayed missions. Combat pressure can still ramp within a mission over elapsed time or through explicit level-authored projectile profiles.
- A generated item system using `items/item_pool.json`, weapon frames, affix families, relic collection tracking, and armory card/tooltips.
- A Ledger market with rotating stock, daily lots, pricing, dividends, bulletins, volatility, sponsored listings, and license tiers that increase visible stock through Ledger Investments. Active economy tuning lives in `config/economy.json` and is validated before startup.
- Search, sort, and filter controls for armory inventory, item archive, and Ledger sell views. The Armory main stage aligns Primary A/B with Defense A/B and shows each equipped primary's Effective DPS, Damage per Shot, and Shots per Second. The `Show Stats` control opens a player-facing popup with Offense, Defense, Aux, and Loadout readouts without shrinking the inventory rack.
- Mini weapons with rarity-scaled output/effects, defense loot with rarity-scaled armor-class/shield strength, named hulls, second-primary swapping, one-primary primary-damage focus bonuses, aux engineering upgrades, and opt-in dual-fire tiers for compatible loadouts. Carrying a second primary applies a visible per-weapon primary-damage strain. Impulse budget now benefits kinetic and plasma weapons through different tradeoffs: kinetic turns impulse into speed-fed damage, while plasma turns impulse into larger, slower, higher-damage orbs. Shield layers take raw projectile damage before armor; armor class mitigates only hits that reach armor, uses the best installed armor class, and does not add duplicate armor-class values from multiple plates. Plasma burn stacks for three seconds from repeated hits and ignores armor-class subtraction while burning armor, but it still drains shields, armor, and hull in order and armor takes reduced burn.
- Item cards/tooltips now split intrinsic item stats from effective install deltas. Weapon cards include kinetic/plasma damage breakdowns, installed modifier lines, unified Shots per Second terminology, and bottom-position roll-quality bars.
- Generated salvage/UI chrome, mission background art, item icons, and combat fleet art promoted into the live UI, with Kenney assets still available as fallback or comparison art.

## Known Current Gaps

These are intentional follow-up targets, not bugs in the docs:

- The `outdated_docs/implemented_specs/NEXT_OVERHAUL_SPEC.md` cleanup/loadout pass is implemented for player testing, including hangar-first starts, explicit credit settlement, repair/booster caches, EMP projectile clear, browsing controls, Ledger license investments, mini weapons, second-primary swapping, named hulls, aux engineering, and opt-in compatible dual-fire.
- Item durability remains deferred.
- Cargo/economy hulls remain deferred.
- Family tiers, hull ownership fiction, surface layers, and certification systems remain broader design direction rather than current gameplay systems.
- Crossed Claims' first playtest validated its swarm/armor overlap: a high-AC twin-rapid-plasma ship erased chip fire and small enemies but remained vulnerable to grapplers, heavy projectiles, and armored anchors. Processional's first playtest validated its pure swarm/defense check: Needlebloom plus AC30 Heavy Plate could not clear everything but survived the chip field while ships and heavy projectiles remained dodge threats; conductor collapse read clearly. Its first miniboss now holds an orbit until killed instead of descending offscreen.
- Repossession is implemented and awaiting its first playtest with role-appropriate gold anti-armor gear; green Heirlooms are explicitly above its target tier.
- No broader Act 2/3, progression, loot, item, economy, story, or music phase is currently authorized. Those ideas remain draft backlog in `PROGRESSION_MASTER_PLAN.md` and `ROADMAP.md`.
- The new overhaul systems still need player testing around second-bay damage strain, early hard-mission pickups, cache readability, hull art/readability, phone-sized Armory density, and whether high-rarity defense is now too strong. Recent tuning already made mini rarity matter, made defense rarity matter, gave focused single-shot primaries competitive DPS, clarified item stats, surfaced per-bay effective DPS on the Armory stage, and changed Dual Fire to independent per-weapon cadence.

## Run Locally

The game is a static web app. From the repo root:

```bash
python3 -m http.server 8765
```

Then open:

```text
http://127.0.0.1:8765/
```

Useful dev query flags:

- `?devSkip=1` unlocks progression for smoke testing.
- `?devInvincible=1` makes combat survival tests easier.
- `?devAutoFire=1` keeps the primary weapon firing during manual checks.
- `?devTuning=1` opens the economy tuning console on non-combat scenes. Sparse local overrides persist in localStorage, show a `TUNING OVERRIDES ACTIVE` badge, and can be exported as merged JSON.
- The Dev Options menu includes `Test Arsenal + Wallet`; checking it persists the mode in the current save, grants a 999,999,999-credit wallet, and reveals the Ledger Test Arsenal with one fresh random roll of every standard item, Pre-Founding relic, and Heirloom. Unchecking hides the Arsenal but does not undo credits or acquired items. `?devArsenal=1` remains the agent-friendly shortcut and also unlocks progression for automated testing.

## Validation

Run these after changes that touch gameplay data, item generation, combat math, or UI code:

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

For UI-affecting work, also run a browser smoke test against the local static server. Static-server 404 probes for browser-favored files are not enough by themselves to call the run broken.

## Deployment

The Vercel project is synced to the Git repo. Pushing the verified branch is the
deployment step; Vercel builds from Git automatically. Do not run a separate
manual `vercel deploy` for routine player-testing releases. After pushing,
inspect the Git-triggered deployment and smoke-test the live URL.

## Image Generation Rule

Generated bitmap assets for this project must use Codex built-in imagegen only.
Do not use API-key, SDK, or local CLI image-generation workflows for new game
art. For transparent sprites, use the built-in chroma-key workflow and local
alpha processing described in `ASSET_GENERATION.md`.

## Important Files

- `index.html`, `style.css`, `main.js`: the single-page game shell, visual system, and gameplay runtime.
- `levels/*.json`: scripted missions, variants, projectile profiles, and attack patterns.
- `enemies/enemy_catalog.json`: enemy definitions referenced by level scripts.
- `items/item_pool.json`: generated item archetypes, affixes, relics, and support items.
- `items/weapon_frames.json`: guaranteed and generated weapon-frame definitions.
- `config/economy.json`: active economy knobs for market, extraction, item value, drop tables, mission rewards, investments, consumables, report targets, and legacy credit gates.
- `scripts/validate_economy_config.js`: structural validation for the economy config.
- `scripts/validate_levels.js`: level and item-pool structural validation.
- `scripts/validate_generated_assets.py`: campaign projectile-key and broadside boss sprite audit.
- `scripts/generate_projectile_threat_levels.js`: generator for the profiled 11-mission, 3-variant campaign set.
- `scripts/validate_weapon_frames.js`: weapon-frame schema validation.
- `scripts/balance_report.js`: item, combat, and economy-balance checks, including Credit Flow expected-credit rows and affordability milestones.

## Implementation Map

Recent history shows these major pieces have already landed:

- Phase 1 extraction loop: salvage pods, cargo hold, extraction settlement, and itemized debrief.
- Phase 2 Ledger market: rotating stock, lots, market state, dividends, and UI.
- Phase 3 flat scene shell: noncombat navigation and scene-based UI.
- Phase 4 item generation: larger item pool, affix families, relics, balance report, and validators.
- Phase 4b base archetypes: defense, support, relic, and weapon-item expansion.
- Phase 4c communication UI: richer armory/item cards, tooltips, and item archive.
- Weapon variety passes: additional projectile patterns, plasma visuals, and combat UI tuning.
- Generated asset passes: UI chrome, item icon pack, combat fleet art, Act 3 invasion art, and mission backgrounds.
- Next Overhaul playable pass: hangar-first onboarding, explicit reward settlement, scripted caches, EMP projectile clear, browsing controls, Ledger license investment tiers, mini weapons with rarity scaling/effects, defense loot with rarity-scaled armor-class/shield strength, named hulls, second-primary swapping, aux engineering, explicit dual-fire mode selection, and independent dual-fire weapon timing.
- Enemy projectile variety pass: root level `projectileProfiles`, weighted `attackPatterns`, per-shot overrides, warm/cool space-weapon projectile art, profiled three-variant campaign missions, compendium/stat summaries, and validator coverage for profile references, threat classes, rotating-sprite proportions, and broadside boss assets.
- Loot depth pass (Phase 6): per-instance affix magnitude rolls (`roll` ranges in `item_pool.json`), effect-trace potency tiers, a stored `rollQuality` that scales item value and drives a tooltip roll-quality bar, pre-Founding 3-affix rolls, aux abilities with per-item rolled potency knobs (`auxPotency`/`auxRoll`) replacing the retired `auxPower` investment (old saves remap the capabilities ladder to dual-fire-only and refund spent aux credits), and a `balance_report.js` magnitude-roll DPS spread section.
- Item clarity pass (Phase 7): `getItemIntrinsicStats`, intrinsic item headlines/stat lines, effective install deltas, weapon damage breakdowns, signed installed modifier lines, damage-based single-primary focus/second-bay strain, player-facing Show Stats cleanup, per-bay effective primary DPS on the Armory stage, and unified Shots per Second display language.
- Pre-Founding weapon coverage pass: ten additional primary relic bases fill the missing spread/ammo combinations, with generated item-icon art in `assets/generated/item_icons_v3/` and plasma impulse scaling added to combat math and the balance report.
- Plasma armor pressure pass: plasma burn now stacks from repeated hits, ramps to sustained burn DPS over three seconds, ignores armor-class subtraction while damaging armor, applies reduced burn to the armor layer, and is mirrored in the Armory stat math and `scripts/balance_report.js`.
- Combat HUD clarity pass: enemy, boss, and player layered health bars now read hull, armor, shields left to right, and active plasma burn shows green future-loss previews on affected enemy and boss bars.
- Economy control layer pass (Phase 8 prelude): active economy numbers moved from `main.js` into validated `config/economy.json`; runtime startup now blocks on missing/invalid economy config; market prices and sell quotes read current config at render/purchase/sale time; `scripts/balance_report.js` prints Credit Flow expected-credit and affordability rows; `?devTuning=1` provides sparse local overrides, reset, badge, and merged JSON export.
- Act 2 engine pass: graph unlocks and Deep Claims board presentation, Deep Registry Shard gating, branch-standing records, miniboss banner/health/drop treatment, conductor/mimic/thief/lien/spawner/splitter AIs, Collections Barge tractor pattern, Doxology/Pilgrimage boss phases, and debrief lore rows.
- Act 2 independent art pass: Chorus, Tithe, Verdant, and First Warden generated sprite packs, Cathedral Drift / Arrears Field / Origin Hull backgrounds, and Act 2 Chorus/Verdant projectile additions are wired through catalog, level data, runtime registries, compendium source data, and generated-asset validation.
- Act 3 Probate engine/art pass: rammer and latch AIs, mothership breach-integrity fail state/HUD, capped lien attachment, fixed boss phase resumption, Heirloom rarity/item/drop support, generated `invasion_v1` sprites, and the generated `home_hull` background are wired into P1-P3.

## Documentation Map

Active docs in the repo root:

- `STATE.md`: current source of truth and validation checklist.
- `CURRENT_SYSTEMS.md`: detailed explanation of implemented systems.
- `ROADMAP.md`: prioritized next work.
- `PROGRESSION_MASTER_PLAN.md`: accepted power-first creative direction, campaign-preservation rule, human-playtest contract, validated Slices 1–2, and active Slice 3 execution spec. Later slices are explicitly draft backlog.
- `ECONOMY_DESIGN.md`: active economy design thesis and long-term direction.
- `UI_DESIGN.md`: active visual and interaction design rules.
- `ASSET_GENERATION.md`: current generated-asset workflow and manifest.
- `LEVEL_JSON_FORMAT.md`: active level schema reference.
- `WEAPON_FRAME_FORMAT.md`: active weapon-frame schema reference.
- `ITEM_UX_SPEC.md`: active item-communication reference (intrinsic item stats, effective deltas, tooltip/inspector stat block, rarity treatment, roll-quality surfacing).
- `ACT2_SILENT_LINEAGES_DESIGN.md`: historical campaign design and reusable lineage/mechanics reference; its old encounter set is not player-facing canon.
- `ACT3_PROBATE_DESIGN.md`: reusable invasion/pressure doctrine and mechanics reference; its old encounter set is not player-facing canon.
- `ACT3_CODEX_SPEC.md`: historical generated-music and engine/art work order; no music pass is currently authorized.
- `STORY-PREMISE.md`: active tone and lore source.
- `STORY-PREMISE-DEEP-HISTORY.md`: deep history and endgame arc extending the story premise; feeds the Story-Economy Arc in `ROADMAP.md`.
- `CREDITS.md`: asset and tool credits.

Archived docs live in `outdated_docs/`. They are useful historical context, but should not be treated as implementation instructions unless a new active doc links to them explicitly.

### Doc lifecycle rule

Every markdown file in the repo root is either a **durable reference** (listed above, kept current) or a **phase spec** (listed above with a "ready for Codex" or similar status). The change set that implements a phase spec must, in the same commit: move the spec to `outdated_docs/implemented_specs/`, update `STATE.md`, `CURRENT_SYSTEMS.md`, and `ROADMAP.md` to reflect the new behavior, and pass `node scripts/validate_docs.js` — which fails if any root doc is missing from this map or any mapped doc is missing from the root.
