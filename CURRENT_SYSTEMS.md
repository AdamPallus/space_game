# Current Systems

Last audited: 2026-07-09

This file explains how the game works today. It is intentionally descriptive rather than aspirational; new plans should start in `ROADMAP.md` and only graduate into this file after implementation.

## Game Loop

The player starts from the hangar, prepares a ship in the armory, chooses a mission, launches into combat, collects salvage and item drops, then extracts. Completing or failing a sortie settles credits, cargo, items, market progress, and mission unlocks.

Combat is still arcade-first. The player controls a ship in a scrolling arena, fights scripted waves, picks up drops, and survives until the mission timer, boss, or objective chain completes. Extraction is the main risk/reward bridge between combat and progression: cargo that is recovered or safely extracted becomes part of the long-term account state.

## Combat And Ship Systems

The ship currently uses shields, armor, and hull as separate survivability layers. Shields take raw non-collision projectile damage before armor. When projectile damage reaches armor, armor class subtracts from that hit; if armor is already depleted, hull takes the raw hit. Armor capacity stacks across installed armor modules, while armor class uses the best installed armor class rather than adding duplicate plates together. Weapons support kinetic and plasma identities, spread and multi-shot patterns, charged or heavy-feeling shots, generated frame stats, second-primary swapping, and an explicit Dual Fire mode for compatible loadouts after the Ledger coupler unlock. In Dual Fire mode, each equipped primary uses its own firing cadence rather than sharing one cadence. Impulse budget now benefits both ammo identities: kinetic impulse increases projectile speed and speed-fed damage, while plasma impulse expands the plasma envelope, slows the shot, and raises size-fed hit and burn damage. Plasma burn stacks from repeated hits for three seconds, ticks shield then armor then hull, and ignores armor-class subtraction while damaging armor; armor still takes partially scaled burn so focused armor tools keep a distinct role. Enemy, boss, and player layered health bars render hull, armor, then shields left to right; active plasma burn adds a green future-loss preview to affected enemy and boss bars. Mini weapons are a separate auto-targeting weapon slot with forward, wide, or turret targeting arcs.

Mission replays are intentionally stable. Completed mission count remains useful for records, mission numbering, market refreshes, and bulletin cadence, but it does not scale combat difficulty. Enemy pressure can still increase during a mission through elapsed-time difficulty and explicit level or enemy configuration. Campaign levels now author enemy projectile profiles and weighted attack patterns so chip fire, standard bolts, heavy warning shots, and boss hazards have explicit per-shot damage, speed, size, and warm/cool visual treatment. Legacy flat enemy bullet fields remain valid for lab or fallback missions without attack patterns.

Absolute periodic movement is anchored to an enemy's final spawn position and to time since the relevant movement phase began. Spiral paths start at zero lateral displacement, runtime-spawned children capture origins after explicit position overrides, and stall strafing starts from the actual stall location instead of evaluating a mission-age or lifetime-age phase that can cause a one-frame teleport.

The mechanics toolbox includes lineage-specific enemy behavior originally built for the discarded Act 2 campaign. Chorus conductors buff linked formations until destroyed, then survivors scatter. Mimics replay delayed pilot movement. Tithe bailiffs can seize loose salvage and retreat with it, while assessors can attach a lien drain to live mission credits until killed. Verdant bloomcallers and broodmothers spawn children, and seedcarriers split into sporelings on death. Tractor patterns can pull the player, and bosses can swap authored attack-pattern phases at HP thresholds with a hold-fire tell.

The toolbox also retains invasion behaviors and a defense stake originally built for the discarded Act 3 campaign. Rammers telegraph, lock a point, then commit to a straight lunge. Grappler latches use the same commit rhythm but attach to the player hull on contact, dealing damage over time and slowing steering until shot loose or timed out. Missions can opt into `defense.integrity`; enemies that escape below the arena alive damage mothership integrity, and reaching zero ends the sortie with a breach failure settlement. Liens honor `aiParams.maxAttached`, with extras falling back to stalker behavior instead of stacking endlessly.

Named hulls shape loadouts through shield, armor, aux, mini, and second-bay modifiers. One-primary builds receive a visible primary-damage focus bonus, while carrying a second primary applies a visible per-weapon primary-damage strain unless hull choices mitigate it. The Armory main stage shows per-bay Effective DPS, Damage per Shot, and Shots per Second for equipped primary weapons; Dual Fire mode scales those per-weapon DPS and damage values while preserving each weapon's cadence. The Armory stat popup reports a player-facing readout for offense, defense, aux, and loadout, including the actual armor class combat uses and installed modifier explanations. Existing combat UI exposes health layers, mission objective state, cargo, selected support capability, equipped primary weapon icons, active primary bay or Dual Fire state, swap timing, and mini weapon state. Named Act 2 minibosses also show a brief field banner, a compact secondary health bar, guaranteed certified-or-better salvage on death, and a larger non-ending kill blast.

EMP support affects enemies and firing behavior, and now clears nearby hostile projectiles in a bounded radius around the player with a visible pulse.

## Missions And Level Data

Mission scripts live in `levels/*.json`. They define metadata, backgrounds, wave timing, enemy references, salvage drops, scripted pickups, objectives, boss events, projectile profiles, attack patterns, and variants. `scripts/validate_levels.js` verifies that level scripts reference known enemies, legal item data, valid pickup data, valid projectile profile references, valid attack-pattern structures, and valid wave structures. `scripts/validate_generated_assets.py` verifies campaign projectile keys and broadside boss sprite bounds.

The player-facing Act 1 campaign has eight core missions ending at Mission 8, Last Light. Each has Standard, Swarm, and Armored carousel entries with profiled projectile damage and weighted attack patterns. Completing any variant of `levelX` unlocks the next base mission through Mission 8, while lab-style encounters remain separate test entries.

Clearing Last Light unlocks one player-facing post-Act-1 vertical slice, Dead Air. Its newly authored waves overlap mobile shielded screens, conductor support, armored gunwalls/strongboxes, latch attackers, and a phased boss to test strong rapid-fire and overkill-plasma builds without changing weapon math. The normal board hides Missions 9–11 and all other old Act 2/3 encounter cards. `?devActs=1` restores and unlocks those discarded cards for agentic regression access only; their files and graph systems remain available as a toolbox.

No broader Act 2 or Act 3 campaign is currently active. Dead Air is the human-playtest gate: after focused validators and a launch smoke, the deployed build is handed to Adam before any second post-Last-Light mission is authored.

## Onboarding

Fresh saves now start in the hangar with the starter kit needed to play immediately: starter primary frames, baseline defense/support options, a starter mini weapon, the starter hull, mission board access, armory access, Ledger access, archive access, compendium access, and profile access.

Old Flight School save fields remain migration-compatible, but they no longer control the player-facing front door or system unlocks. Saves that were still in training are normalized into hangar-ready progress.

## Economy

The economy combines enemy kill bounties, explicit objective credits, mission completion credits, cargo recovery, Ledger market returns, and item collection. Score and elapsed mission time can remain as display or telemetry, but they do not silently convert into credits. Mission debrief copy breaks out kill bounties, objective credits, completion credits, recovery charges, dividends, writedowns, and market settlement.

Active economy tuning is loaded from `config/economy.json` before save migration or hangar rendering. Startup blocks with a visible error if the shipped config is missing or invalid. The config owns market rates and license tiers, extraction cargo and payout rates, item value ranges and roll-quality value scaling, drop tables, mission reward constants, investments, consumables, Credit Flow report targets, and legacy credit gates still needed for compatibility. Combat math, level enemy/objective credits, item affixes, rarity presentation, and level data remain outside the economy config.

Ledger market state includes rotating stock, lot purchases, dividends, price movement, bulletins, volatility, sponsored listings, mispriced opportunities, and license tiers. Ledger licenses increase visible stock from 5 lots to 7, 9, and 11 lots at the documented upgrade costs, but the license purchase UI lives in Ledger Investments rather than Market. Market does not include a fixed Basic Gear section. Market lots preserve saved item/list value and compute purchase price at render and purchase time from current config rates; sale quotes derive the handling fee from `sellRate`, so config edits affect live sale payouts without code changes.

`?devTuning=1` opens a compact economy tuning console on non-combat scenes. Numeric fields are grouped by config section, sparse localStorage overrides apply immediately outside combat, and active overrides show `TUNING OVERRIDES ACTIVE` across hangar scenes and the combat HUD. The console can reset all overrides or export the merged live config to download and clipboard.

The Dev Options menu exposes a persisted `Test Arsenal + Wallet` toggle for human testing. It supplies a 999,999,999-credit wallet and adds a Test Arsenal tab to the Ledger with one randomly rolled listing for every item base. Standard bases can be rerolled at any rarity while Pre-Founding relics and Heirlooms keep their native tiers. Buying a listing uses the real inventory and collection plumbing, then replaces that listing with a new roll of the same base. Turning the toggle off only hides the testing surface; it intentionally does not repair the contaminated save. `?devArsenal=1` remains the agent-friendly shortcut and additionally unlocks progression for automation.

## Items, Armory, And Archive

The item system is data-driven through `items/item_pool.json` and `items/weapon_frames.json`. Implemented item categories include primary weapon frames, mini weapons, defense items, support items, named hulls, relics, Heirlooms, and economy-facing salvage. Generated items can carry rarity, families, affixes, traits, and descriptive card copy. Primary weapons now have normal base coverage and Pre-Founding relic coverage across every spread/ammo pair documented in `WEAPON_FRAME_FORMAT.md`. Heirloom items sit above Pre-Founding as Act 3-only drops from minibosses and bosses, with guaranteed first boss clears and lower repeat chances. The initial Heirloom families cover Chorus harmonic shield/aux pieces, Tithe kinetic mass-driver primaries, and Verdant plasma/vampiric graft primaries. Mini weapons apply rarity-scaled damage, firing speed, range, and projectile-speed tuning and can roll supported effects at higher rarities. Defense loot applies rarity-scaled armor-class and useful shield-strength tuning, with Pre-Founding defense doubling the current scaling above starter baselines and Heirlooms extending that ceiling. Existing saved mini and defense loot self-heals through one-time balance-version markers.

Loot also has a vertical roll axis (Phase 6, see `outdated_docs/implemented_specs/LOOT_DEPTH_SPEC.md`). Each magnitude affix declares a `roll` range in `item_pool.json`; `createRolledItem` draws a per-instance float multiplier on its `buildAdd`, so two items of the same base and rarity with the same affixes differ in strength. Effect traces (pierce/homing/explosive/vampiric) roll a potency tier by rarity. Every item stores a `rollQuality` in [0,1] (mean normalized roll position) that scales its value and drives a roll-quality bar in the item display. Pre-Founding items roll three affixes where the pool allows. Aux items roll a per-instance ability potency (`auxPotency`/`auxRoll`) for cloak/EMP/bulwark plus offense and defense passives; the rolled magnitudes and ability knobs reconstruct from save without re-rolling. The retired `auxPower` investment was replaced by these rolls — old saves remap the Ledger capabilities ladder to dual-fire-only and refund the credits spent on aux tiers, and hull `auxPowerBonus` remains as a small identity perk that lifts the equipped aux item's roll.

The armory composes the ship build from inventory instead of replacing the gear model. It is an equip/configure bench with spatial hardpoints around the selected hull, aligned left/right primary and defense bays, a compact equipped-hull button that opens a small selector popover, and a centered Swap/Dual Fire mode selector. The primary bays show the installed weapon's effective DPS, Damage per Shot, and Shots per Second, updating immediately when other gear or fire mode changes. The selected-item inspector caps long stat/affix/lore detail in an internal scroll region so the inventory rack remains usable. Item cards and tooltips expose intrinsic item stats first: weapon DPS, pattern, damage per shot, ammo, special effects, Shots per Second, damage breakdowns, installed modifier explanations, mini targeting behavior, dual-fire compatibility, hull bonuses, and second-bay strain. Effective install deltas are shown separately and labelled as installed/ship effects. Affix lines show the real rolled magnitude (not the affix's nominal value), and rolled items render a rarity-tinted roll-quality bar at the bottom; aux tooltips show the item's actual rolled ability numbers. The shared tooltip/inspector contract is documented in `ITEM_UX_SPEC.md`. The item archive tracks collected and discovered items, including relic-style long-term finds.

Armory inventory, item archive, and Ledger sell views now include text search plus sort and filter controls for recent acquisition, rarity, slot/type, value, and weapon role where relevant.

Current gaps:

- Item durability is still deferred.
- Cargo/economy hulls are still deferred.
- Larger family-tier, hull-ownership, and certification systems remain design direction rather than current implementation.

## Assets

Generated art is now part of the live visual baseline. The current UI uses generated salvage chrome, generated item icons, promoted combat fleet art, generated mission backgrounds, the Act 3 invasion sprite pack, the original generated starter hull, and v2 generated unlockable hulls that match the starter hull scale/style. Kenney assets remain credited and may still appear as fallback, historical comparison, or utility sprites. Mini weapons, shield boosters, and armor patch caches use generated overhaul art, while the EMP clear pulse is rendered in canvas.

Asset manifests and generation notes live in `ASSET_GENERATION.md`.

## Saves And Progression State

Progress is stored client-side. Important save concepts include credits, lifetime credits, mission count, unlocked levels, completed mission counts, Act 2 key items, branch standing, onboarding stage, system unlocks, cargo, armory inventory, equipped hull, equipped mini weapon, optional second primary bay, selected primary fire mode, engineering tiers, Ledger market/license state, item collections, and relic collections.

When changing save structures, preserve compatibility for existing local saves where practical. If a field is intentionally retired, document the migration or fallback behavior in the implementation commit.

## Validation And Balance

The current validation stack is:

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

`balance_report.js` is the main guardrail for economy and item-pool drift. It mirrors primary damage math, mini rarity tuning, defense rarity tuning, per-instance affix magnitude rolls, reports focused single-shot DPS against multi-shot/burst output, checks the single-primary focus versus second-bay strain tradeoff, reports the magnitude-roll DPS spread across same base + rarity items, and prints a Credit Flow section with full-clear and short-loop expected credits plus affordability milestones. `validate_economy_config.js`, `validate_levels.js`, `validate_generated_assets.py`, and `validate_weapon_frames.js` protect economy, data, and asset contracts. UI work should also receive a real browser smoke test.

## Current Divergences From Desired Next State

The most important remaining design mismatches are:

- Item durability is not implemented and remains intentionally deferred.
- Cargo/economy hulls are not part of the first hull pass.
- Family tiers, hull ownership fiction, surface layers, and certification systems remain broader economy/lore direction rather than active gameplay systems.
- The new overhaul systems need player-testing balance passes after deployment, especially second-bay strain, high-rarity defense strength, and early hard-mission pickup placement. If high armor class over-solves projectile density, the preferred counterbalance is adding visually obvious high-damage projectiles rather than simply raising all enemy DPS.
- The old Act 2/3 mission and music plans are historical/toolbox material, not active implementation work.
