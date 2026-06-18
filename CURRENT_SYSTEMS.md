# Current Systems

Last audited: 2026-06-18

This file explains how the game works today. It is intentionally descriptive rather than aspirational; new plans should start in `ROADMAP.md` and only graduate into this file after implementation.

## Game Loop

The player starts from the hangar, prepares a ship in the armory, chooses a mission, launches into combat, collects salvage and item drops, then extracts. Completing or failing a sortie settles credits, cargo, items, market progress, and mission unlocks.

Combat is still arcade-first. The player controls a ship in a scrolling arena, fights scripted waves, picks up drops, and survives until the mission timer, boss, or objective chain completes. Extraction is the main risk/reward bridge between combat and progression: cargo that is recovered or safely extracted becomes part of the long-term account state.

## Combat And Ship Systems

The ship currently uses shields, armor, and hull as separate survivability layers. Weapons support kinetic and plasma identities, spread and multi-shot patterns, charged or heavy-feeling shots, and generated frame stats. Existing combat UI exposes health layers, mission objective state, cargo, and selected support capability.

EMP support currently affects enemies and firing behavior, but it does not clear nearby hostile projectiles yet. That gap is tracked in `ROADMAP.md`.

## Missions And Level Data

Mission scripts live in `levels/*.json`. They define metadata, backgrounds, wave timing, enemy references, salvage drops, objectives, boss events, and variants. `scripts/validate_levels.js` verifies that level scripts reference known enemies, legal item data, and valid wave structures.

The campaign has a core progression plus variants and lab-style encounters. Older patrol and skirmish files remain in the level directory for reference and compatibility, but the current player-facing loop is driven by the implemented mission select and unlock state.

## Onboarding

Flight School still exists. Current code and copy use it to introduce weapons, area control, armor breaking, and starter gear. The next cleanup pass should remove Flight School as a required front door and start fresh saves directly in the hangar with enough equipment, market access, and mission context to play immediately.

Until that work is done, do not assume Flight School references are dead code.

## Economy

The economy combines direct mission credits, cargo recovery, Ledger market returns, and item collection. The current reward function still includes score and elapsed-time components, so time can indirectly increase credits. The next economy cleanup should remove that time accrual and make rewards come from deliberate actions and explicit mission settlement.

Ledger market state includes daily stock, lot purchases, dividends, price movement, bulletins, volatility, sponsored listings, and mispriced opportunities. The current shop exposes a fixed number of daily stock lots. More shop items per day and player-upgraded market breadth are roadmap work.

## Items, Armory, And Archive

The item system is data-driven through `items/item_pool.json` and `items/weapon_frames.json`. Implemented item categories include weapon frames, defense items, support items, relics, and economy-facing salvage. Generated items can carry rarity, families, affixes, traits, and descriptive card copy.

The armory composes the ship build from inventory instead of replacing the gear model. Item cards and tooltips expose stats, flavor, rarity, tags, and combat implications. The item archive tracks collected and discovered items, including relic-style long-term finds.

Current gaps:

- Inventory lacks sort and filter controls.
- Weapon DPS presentation can make multi-shot look strictly better because per-shot damage is not clear enough.
- Auto-target mini weapons, second weapon bays, hull types, and durability are not implemented.

## Assets

Generated art is now part of the live visual baseline. The current UI uses generated salvage chrome, generated item icons, promoted combat fleet art, and generated mission backgrounds. Kenney assets remain credited and may still appear as fallback, historical comparison, or utility sprites.

Asset manifests and generation notes live in `ASSET_GENERATION.md`.

## Saves And Progression State

Progress is stored client-side. Important save concepts include credits, lifetime credits, mission count, unlocked levels, onboarding stage, system unlocks, cargo, armory inventory, Ledger market state, item collections, and relic collections.

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

The most important design mismatches are:

- Flight School still gates the early experience.
- Time still contributes to credit settlement.
- Early attempts at hard missions need better incentive even when the player cannot finish.
- EMP does not remove nearby projectiles.
- Inventory and market browsing need sort and filter affordances.
- Shop stock count is fixed rather than upgradeable.
- Weapon comparison copy needs per-shot clarity.
