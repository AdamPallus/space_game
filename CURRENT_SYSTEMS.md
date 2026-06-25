# Current Systems

Last audited: 2026-06-25

This file explains how the game works today. It is intentionally descriptive rather than aspirational; new plans should start in `ROADMAP.md` and only graduate into this file after implementation.

## Game Loop

The player starts from the hangar, prepares a ship in the armory, chooses a mission, launches into combat, collects salvage and item drops, then extracts. Completing or failing a sortie settles credits, cargo, items, market progress, and mission unlocks.

Combat is still arcade-first. The player controls a ship in a scrolling arena, fights scripted waves, picks up drops, and survives until the mission timer, boss, or objective chain completes. Extraction is the main risk/reward bridge between combat and progression: cargo that is recovered or safely extracted becomes part of the long-term account state.

## Combat And Ship Systems

The ship currently uses shields, armor, and hull as separate survivability layers. Shields take raw non-collision projectile damage before armor. When projectile damage reaches armor, armor class subtracts from that hit; if armor is already depleted, hull takes the raw hit. Armor capacity stacks across installed armor modules, while armor class uses the best installed armor class rather than adding duplicate plates together. Weapons support kinetic and plasma identities, spread and multi-shot patterns, charged or heavy-feeling shots, generated frame stats, second-primary swapping, and an explicit Dual Fire mode for compatible loadouts after the Ledger coupler unlock. In Dual Fire mode, each equipped primary uses its own firing cadence rather than sharing one cadence. Mini weapons are a separate auto-targeting weapon slot with forward, wide, or turret targeting arcs.

Mission replays are intentionally stable. Completed mission count remains useful for records, mission numbering, market refreshes, and bulletin cadence, but it does not scale combat difficulty. Enemy pressure can still increase during a mission through elapsed-time difficulty and explicit level or enemy configuration. Campaign levels now author enemy projectile profiles and weighted attack patterns so chip fire, standard bolts, heavy warning shots, and boss hazards have explicit per-shot damage, speed, size, and warm/cool visual treatment. Legacy flat enemy bullet fields remain valid for lab or fallback missions without attack patterns.

Named hulls shape loadouts through shield, armor, aux, mini, and second-bay modifiers. One-primary builds receive a visible primary-damage focus bonus, while carrying a second primary applies a visible per-weapon primary-damage strain unless hull choices mitigate it. The Armory stat popup reports a player-facing readout for offense, defense, aux, and loadout, including the actual armor class combat uses and installed modifier explanations. Existing combat UI exposes health layers, mission objective state, cargo, selected support capability, equipped primary weapon icons, active primary bay or Dual Fire state, swap timing, and mini weapon state.

EMP support affects enemies and firing behavior, and now clears nearby hostile projectiles in a bounded radius around the player with a visible pulse.

## Missions And Level Data

Mission scripts live in `levels/*.json`. They define metadata, backgrounds, wave timing, enemy references, salvage drops, scripted pickups, objectives, boss events, projectile profiles, attack patterns, and variants. `scripts/validate_levels.js` verifies that level scripts reference known enemies, legal item data, valid pickup data, valid projectile profile references, valid attack-pattern structures, and valid wave structures. `scripts/validate_generated_assets.py` verifies campaign projectile keys and broadside boss sprite bounds.

The campaign has 11 core missions, each with three player-facing carousel entries: Standard, Swarm, and Armored. All campaign entries use profiled projectile damage and weighted attack patterns. Completing any variant of `levelX` unlocks `levelX+1` through the base-level progression lookup, while lab-style encounters remain separate test entries.

## Onboarding

Fresh saves now start in the hangar with the starter kit needed to play immediately: starter primary frames, baseline defense/support options, a starter mini weapon, the starter hull, mission board access, armory access, Ledger access, archive access, compendium access, and profile access.

Old Flight School save fields remain migration-compatible, but they no longer control the player-facing front door or system unlocks. Saves that were still in training are normalized into hangar-ready progress.

## Economy

The economy combines enemy kill bounties, explicit objective credits, mission completion credits, cargo recovery, Ledger market returns, and item collection. Score and elapsed mission time can remain as display or telemetry, but they do not silently convert into credits. Mission debrief copy breaks out kill bounties, objective credits, completion credits, recovery charges, dividends, writedowns, and market settlement.

Ledger market state includes rotating stock, lot purchases, dividends, price movement, bulletins, volatility, sponsored listings, mispriced opportunities, and license tiers. Ledger licenses increase visible stock from 5 lots to 7, 9, and 11 lots at the documented upgrade costs, but the license purchase UI lives in Ledger Investments rather than Market. Market does not include a fixed Basic Gear section.

## Items, Armory, And Archive

The item system is data-driven through `items/item_pool.json` and `items/weapon_frames.json`. Implemented item categories include primary weapon frames, mini weapons, defense items, support items, named hulls, relics, and economy-facing salvage. Generated items can carry rarity, families, affixes, traits, and descriptive card copy. Mini weapons apply rarity-scaled damage, firing speed, range, and projectile-speed tuning and can roll supported effects at higher rarities. Defense loot applies rarity-scaled armor-class and useful shield-strength tuning, with Pre-Founding defense doubling the current scaling above starter baselines. Existing saved mini and defense loot self-heals through one-time balance-version markers.

Loot also has a vertical roll axis (Phase 6, see `LOOT_DEPTH_SPEC.md`). Each magnitude affix declares a `roll` range in `item_pool.json`; `createRolledItem` draws a per-instance float multiplier on its `buildAdd`, so two items of the same base and rarity with the same affixes differ in strength. Effect traces (pierce/homing/explosive/vampiric) roll a potency tier by rarity. Every item stores a `rollQuality` in [0,1] (mean normalized roll position) that scales its value and drives a roll-quality bar in the item display. Pre-Founding items roll three affixes where the pool allows. Aux items roll a per-instance ability potency (`auxPotency`/`auxRoll`) for cloak/EMP/bulwark plus offense and defense passives; the rolled magnitudes and ability knobs reconstruct from save without re-rolling. The retired `auxPower` investment was replaced by these rolls — old saves remap the Ledger capabilities ladder to dual-fire-only and refund the credits spent on aux tiers, and hull `auxPowerBonus` remains as a small identity perk that lifts the equipped aux item's roll.

The armory composes the ship build from inventory instead of replacing the gear model. It is an equip/configure bench with spatial hardpoints around the selected hull, a compact equipped-hull button that opens a small selector popover, and a visible Swap/Dual Fire mode selector. The selected-item inspector caps long stat/affix/lore detail in an internal scroll region so the inventory rack remains usable. Item cards and tooltips expose intrinsic item stats first: weapon DPS, pattern, damage per shot, ammo, special effects, Shots per Second, damage breakdowns, installed modifier explanations, mini targeting behavior, dual-fire compatibility, hull bonuses, and second-bay strain. Effective install deltas are shown separately and labelled as installed/ship effects. Affix lines show the real rolled magnitude (not the affix's nominal value), and rolled items render a rarity-tinted roll-quality bar at the bottom; aux tooltips show the item's actual rolled ability numbers. The shared tooltip/inspector contract is documented in `ITEM_UX_SPEC.md`. The item archive tracks collected and discovered items, including relic-style long-term finds.

Armory inventory, item archive, and Ledger sell views now include text search plus sort and filter controls for recent acquisition, rarity, slot/type, value, and weapon role where relevant.

Current gaps:

- Item durability is still deferred.
- Cargo/economy hulls are still deferred.
- Larger family-tier, hull-ownership, and certification systems remain design direction rather than current implementation.

## Assets

Generated art is now part of the live visual baseline. The current UI uses generated salvage chrome, generated item icons, promoted combat fleet art, generated mission backgrounds, the original generated starter hull, and v2 generated unlockable hulls that match the starter hull scale/style. Kenney assets remain credited and may still appear as fallback, historical comparison, or utility sprites. Mini weapons, shield boosters, and armor patch caches use generated overhaul art, while the EMP clear pulse is rendered in canvas.

Asset manifests and generation notes live in `ASSET_GENERATION.md`.

## Saves And Progression State

Progress is stored client-side. Important save concepts include credits, lifetime credits, mission count, unlocked levels, onboarding stage, system unlocks, cargo, armory inventory, equipped hull, equipped mini weapon, optional second primary bay, selected primary fire mode, engineering tiers, Ledger market/license state, item collections, and relic collections.

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

`balance_report.js` is the main guardrail for economy and item-pool drift. It mirrors primary damage math, mini rarity tuning, defense rarity tuning, per-instance affix magnitude rolls, reports focused single-shot DPS against multi-shot/burst output, checks the single-primary focus versus second-bay strain tradeoff, and reports the magnitude-roll DPS spread across same base + rarity items. `validate_levels.js`, `validate_generated_assets.py`, and `validate_weapon_frames.js` protect data and asset contracts. UI work should also receive a real browser smoke test.

## Current Divergences From Desired Next State

The most important remaining design mismatches are:

- Item durability is not implemented and remains intentionally deferred.
- Cargo/economy hulls are not part of the first hull pass.
- Family tiers, hull ownership fiction, surface layers, and certification systems remain broader economy/lore direction rather than active gameplay systems.
- The new overhaul systems need player-testing balance passes after deployment, especially second-bay strain, high-rarity defense strength, and early hard-mission pickup placement. If high armor class over-solves projectile density, the preferred counterbalance is adding visually obvious high-damage projectiles rather than simply raising all enemy DPS.
