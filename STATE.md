# Space Shooter Current State

Last audited: 2026-06-19

This is the first file to read before changing the game. It summarizes what is implemented now, which docs are still authoritative, which older specs are archived, and which validation commands should pass before committing.

## Current Game Shape

The project is a browser-based extraction shmup. Players launch from the hangar, fight through scripted mission waves, collect salvage pods and item drops, then extract or lose part of the haul. The current build already includes:

- A flat scene shell for hangar, mission select, armory, Ledger market, profile, item archive, compendium, and combat.
- Scripted JSON missions in `levels/` with variants, lab encounters, bosses, salvage pods, item drops, and enemy catalog validation.
- A cargo and extraction loop with recovery bonuses, death writedowns, cargo holds, mission debriefs, and itemized salvage.
- Stable replay difficulty: completed mission count drives records, market refreshes, and mission numbering, but it does not scale enemy damage or speed on replayed missions. Combat pressure can still ramp within a mission over elapsed time.
- A generated item system using `items/item_pool.json`, weapon frames, affix families, relic collection tracking, and armory card/tooltips.
- A Ledger market with rotating stock, daily lots, pricing, dividends, bulletins, volatility, sponsored listings, and license tiers that increase visible stock through Ledger Investments.
- Search, sort, and filter controls for armory inventory, item archive, and Ledger sell views. The Armory `Show Stats` control opens a popup with mission-ready ship stats, installed defense item internals, and selected-mission projectile damage estimates without shrinking the inventory rack.
- Mini weapons with rarity-scaled output/effects, defense loot with rarity-scaled armor-class/shield strength, named hulls, second-primary swapping, one-primary focus bonuses, aux engineering upgrades, and opt-in dual-fire tiers for compatible loadouts. Shield layers take raw projectile damage before armor; armor class mitigates only hits that reach armor, uses the best installed armor class, and does not add duplicate armor-class values from multiple plates.
- Generated salvage/UI chrome, mission background art, item icons, and combat fleet art promoted into the live UI, with Kenney assets still available as fallback or comparison art.

## Known Current Gaps

These are intentional follow-up targets, not bugs in the docs:

- The `NEXT_OVERHAUL_SPEC.md` cleanup/loadout pass is implemented for player testing, including hangar-first starts, explicit credit settlement, repair/booster caches, EMP projectile clear, browsing controls, Ledger license investments, mini weapons, second-primary swapping, named hulls, aux engineering, and opt-in compatible dual-fire.
- Item durability remains deferred.
- Cargo/economy hulls remain deferred.
- Family tiers, hull ownership fiction, surface layers, and certification systems remain broader design direction rather than current gameplay systems.
- The new overhaul systems still need player testing around second-bay strain, early hard-mission pickups, cache readability, hull art/readability, and whether high-rarity defense is now too strong. Recent tuning already made mini rarity matter, made defense rarity matter, gave focused single-shot primaries competitive DPS, and changed Dual Fire to independent per-weapon cadence.

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

## Validation

Run these after changes that touch gameplay data, item generation, combat math, or UI code:

```bash
node --check main.js
node --check scripts/balance_report.js
node scripts/validate_levels.js
node scripts/validate_weapon_frames.js
node scripts/balance_report.js
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
- `levels/*.json`: scripted missions and variants.
- `enemies/enemy_catalog.json`: enemy definitions referenced by level scripts.
- `items/item_pool.json`: generated item archetypes, affixes, relics, and support items.
- `items/weapon_frames.json`: guaranteed and generated weapon-frame definitions.
- `scripts/validate_levels.js`: level and item-pool structural validation.
- `scripts/validate_weapon_frames.js`: weapon-frame schema validation.
- `scripts/balance_report.js`: economy, item, and mission-balance checks.

## Implementation Map

Recent history shows these major pieces have already landed:

- Phase 1 extraction loop: salvage pods, cargo hold, extraction settlement, and itemized debrief.
- Phase 2 Ledger market: rotating stock, lots, market state, dividends, and UI.
- Phase 3 flat scene shell: noncombat navigation and scene-based UI.
- Phase 4 item generation: larger item pool, affix families, relics, balance report, and validators.
- Phase 4b base archetypes: defense, support, relic, and weapon-item expansion.
- Phase 4c communication UI: richer armory/item cards, tooltips, and item archive.
- Weapon variety passes: additional projectile patterns, plasma visuals, and combat UI tuning.
- Generated asset passes: UI chrome, item icon pack, combat fleet art, and mission backgrounds.
- Next Overhaul playable pass: hangar-first onboarding, explicit reward settlement, scripted caches, EMP projectile clear, browsing controls, Ledger license investment tiers, mini weapons with rarity scaling/effects, defense loot with rarity-scaled armor-class/shield strength, named hulls, second-primary swapping, aux engineering, explicit dual-fire mode selection, and independent dual-fire weapon timing.

## Documentation Map

Active docs in the repo root:

- `STATE.md`: current source of truth and validation checklist.
- `CURRENT_SYSTEMS.md`: detailed explanation of implemented systems.
- `ROADMAP.md`: prioritized next work.
- `ECONOMY_DESIGN.md`: active economy design thesis and long-term direction.
- `UI_DESIGN.md`: active visual and interaction design rules.
- `ASSET_GENERATION.md`: current generated-asset workflow and manifest.
- `LEVEL_JSON_FORMAT.md`: active level schema reference.
- `WEAPON_FRAME_FORMAT.md`: active weapon-frame schema reference.
- `STORY-PREMISE.md`: active tone and lore source.
- `CREDITS.md`: asset and tool credits.

Archived docs live in `outdated_docs/`. They are useful historical context, but should not be treated as implementation instructions unless a new active doc links to them explicitly.
