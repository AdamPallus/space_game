# Current Systems

Last audited: 2026-06-19

This file explains how the game works today. It is intentionally descriptive rather than aspirational; new plans should start in `ROADMAP.md` and only graduate into this file after implementation.

## Game Loop

The player starts from the hangar, prepares a ship in the armory, chooses a mission, launches into combat, collects salvage and item drops, then extracts. Completing or failing a sortie settles credits, cargo, items, market progress, and mission unlocks.

Combat is still arcade-first. The player controls a ship in a scrolling arena, fights scripted waves, picks up drops, and survives until the mission timer, boss, or objective chain completes. Extraction is the main risk/reward bridge between combat and progression: cargo that is recovered or safely extracted becomes part of the long-term account state.

## Combat And Ship Systems

The ship currently uses shields, armor, and hull as separate survivability layers. Weapons support kinetic and plasma identities, spread and multi-shot patterns, charged or heavy-feeling shots, generated frame stats, second-primary swapping, and advanced dual-fire for compatible loadouts. Mini weapons are a separate auto-targeting weapon slot with forward, wide, or turret targeting arcs.

Named hulls shape loadouts through shield, armor, aux, mini, and second-bay modifiers. One-primary builds receive a visible shield focus bonus while carrying a second primary applies a visible defense strain unless hull and engineering choices mitigate it. Existing combat UI exposes health layers, mission objective state, cargo, selected support capability, active primary bay, swap cooldown, and mini weapon state.

EMP support affects enemies and firing behavior, and now clears nearby hostile projectiles in a bounded radius around the player with a visible pulse.

## Missions And Level Data

Mission scripts live in `levels/*.json`. They define metadata, backgrounds, wave timing, enemy references, salvage drops, scripted pickups, objectives, boss events, and variants. `scripts/validate_levels.js` verifies that level scripts reference known enemies, legal item data, valid pickup data, and valid wave structures.

The campaign has a core progression plus variants and lab-style encounters. Older patrol and skirmish files remain in the level directory for reference and compatibility, but the current player-facing loop is driven by the implemented mission select and unlock state.

## Onboarding

Fresh saves now start in the hangar with the starter kit needed to play immediately: starter primary frames, baseline defense/support options, a starter mini weapon, the starter hull, mission board access, armory access, Ledger access, archive access, compendium access, and profile access.

Old Flight School save fields remain migration-compatible, but they no longer control the player-facing front door or system unlocks. Saves that were still in training are normalized into hangar-ready progress.

## Economy

The economy combines enemy kill bounties, explicit objective credits, mission completion credits, cargo recovery, Ledger market returns, and item collection. Score and elapsed mission time can remain as display or telemetry, but they do not silently convert into credits. Mission debrief copy breaks out kill bounties, objective credits, completion credits, recovery charges, dividends, writedowns, and market settlement.

Ledger market state includes daily stock, lot purchases, dividends, price movement, bulletins, volatility, sponsored listings, mispriced opportunities, and license tiers. Ledger licenses increase visible daily stock from 5 lots to 7, 9, and 11 lots at the documented upgrade costs.

## Items, Armory, And Archive

The item system is data-driven through `items/item_pool.json` and `items/weapon_frames.json`. Implemented item categories include primary weapon frames, mini weapons, defense items, support items, named hulls, relics, and economy-facing salvage. Generated items can carry rarity, families, affixes, traits, and descriptive card copy.

The armory composes the ship build from inventory instead of replacing the gear model. Item cards and tooltips expose stats, flavor, rarity, tags, combat implications, per-shot damage, volley output, sustained DPS, mini targeting behavior, dual-fire compatibility, hull bonuses, and second-bay strain. The item archive tracks collected and discovered items, including relic-style long-term finds.

Armory inventory, item archive, and Ledger sell views now include text search plus sort and filter controls for recent acquisition, rarity, slot/type, value, and weapon role where relevant.

Current gaps:

- Item durability is still deferred.
- Cargo/economy hulls are still deferred.
- Larger family-tier, hull-ownership, and certification systems remain design direction rather than current implementation.

## Assets

Generated art is now part of the live visual baseline. The current UI uses generated salvage chrome, generated item icons, promoted combat fleet art, and generated mission backgrounds. Kenney assets remain credited and may still appear as fallback, historical comparison, or utility sprites. The first overhaul pass reuses existing generated item icons and Kenney power-up art for hulls, mini weapons, shield boosters, and armor patch caches, while the EMP clear pulse is rendered in canvas.

Asset manifests and generation notes live in `ASSET_GENERATION.md`.

## Saves And Progression State

Progress is stored client-side. Important save concepts include credits, lifetime credits, mission count, unlocked levels, onboarding stage, system unlocks, cargo, armory inventory, equipped hull, equipped mini weapon, optional second primary bay, engineering tiers, Ledger market state, item collections, and relic collections.

When changing save structures, preserve compatibility for existing local saves where practical. If a field is intentionally retired, document the migration or fallback behavior in the implementation commit.

## Validation And Balance

The current validation stack is:

```bash
node --check main.js
node --check scripts/balance_report.js
node scripts/validate_levels.js
node scripts/validate_weapon_frames.js
node scripts/balance_report.js
git diff --check
```

`balance_report.js` is the main guardrail for economy and item-pool drift. `validate_levels.js` and `validate_weapon_frames.js` protect data contracts. UI work should also receive a real browser smoke test.

## Current Divergences From Desired Next State

The most important remaining design mismatches are:

- Item durability is not implemented and remains intentionally deferred.
- Cargo/economy hulls are not part of the first hull pass.
- Family tiers, hull ownership fiction, surface layers, and certification systems remain broader economy/lore direction rather than active gameplay systems.
- The new overhaul systems need player-testing balance passes after deployment, especially mini weapon output, dual-fire compatibility, second-bay strain, and early hard-mission pickup placement.
