# Next Overhaul Spec

Last planned: 2026-06-18

This is the active implementation spec for the next broad gameplay/loadout overhaul. Read `STATE.md`, `CURRENT_SYSTEMS.md`, and `ROADMAP.md` first for current behavior. This document turns the roadmap and follow-up design decisions into a phased, implementation-ready plan.

This spec is intentionally broader than the next single commit. Each phase should leave the game playable and should update `CURRENT_SYSTEMS.md` when behavior changes.

## Goals

- Remove the required Flight School front door and start new players in the hangar with a usable starter kit.
- Make rewards come from explicit actions: kills, salvage, objectives, mission completion, extraction, and Ledger returns.
- Improve hard-mission attempts by putting valuable salvage opportunities early, while keeping extraction as the requirement for payout.
- Add survivability pickups, EMP projectile clearing, and clearer weapon role presentation.
- Add browsing tools for inventory, archive, and market sell views.
- Expand loadouts with mini auto-guns, second primary bay behavior, named hulls, aux upgrades, and later dual-fire progression.
- Keep one-primary builds viable after second-bay and dual-fire systems arrive.
- Generate the new art needed for caches, mini weapons, hulls, and supporting UI chrome.

## Non-Goals

- Do not implement item durability in this overhaul. Document it as deferred.
- Do not make cargo-focused hulls a first-pass requirement. Cargo/economy hulls can come later if the cargo loop needs them.
- Do not add guaranteed rewards for dying in hard missions. Partial-run value comes from collecting salvage and extracting.
- Do not make dual-fire always better than a one-weapon build.

## Initial Balance Targets

These values are implementation defaults. They can be tuned after browser playtests and balance reports, but the first implementation should not invent a different rule set.

- Front-loaded hard-mission salvage should appear in the first 30-40% of mission time.
- Shield boosters restore 40% of max shield and can overfill into a temporary shield buffer up to 20% of max shield.
- Armor patch caches restore 35% of max armor. If the ship has no armor, or armor is already full and hull is damaged, they repair 18% of max hull instead.
- EMP projectile clear radius starts at 190 game pixels around the player.
- Mini weapons should contribute roughly 20-35% of a comparable primary weapon's sustained output; 360-degree targeting should sit near the lower end of that range.
- Second-bay weapon swapping has a 1.0 second cooldown.
- Equipping a second primary applies a baseline defense strain of -15% max shield and -15% shield regen.
- One-primary builds gain a baseline focus bonus of +10% max shield and +10% shield regen while the second bay is empty or disabled.
- Dual-fire starts at 60% damage per weapon, then upgrades to 70%, 85%, and finally 100% only for compatible weapons on sufficiently advanced hulls/upgrades.
- Ledger market stock starts at the current 5 lots. License tiers raise visible lots to 7, 9, and 11.

## Phase 1: Foundations

### Fresh Save Flow

- A fresh save starts in the hangar, not Flight School.
- The player begins with the current starter kit needed to play immediately: starter primary frames, baseline defense/support options, mission board access, armory access, Ledger access, and compendium/profile access if those systems are already visible on existing progressed saves.
- Remove player-facing Flight School flow, menu labels, intro titles, armory copy, and progression gates.
- Existing saves remain compatible:
  - Saves that completed Flight School behave normally.
  - Saves that are still in Flight School should be treated as ready for hangar play.
  - Starter items previously tied to Flight School stages should become default starter gear.
- If old training constants or save fields are kept temporarily for migration safety, they should no longer control player-facing progression.

### Credit Settlement

- Remove elapsed-time credit accrual.
- Remove score-to-credit conversion.
- Credits may come from:
  - Enemy kill bounties.
  - Recovered and sold salvage.
  - Explicit mission objectives.
  - Mission completion and recovery bonuses.
  - Ledger market returns, dividends, and sell transactions.
- Score can remain as display, bragging, balancing telemetry, or post-run flavor, but it must not silently become credits.
- Debrief should show explicit credit sources so players understand why they were paid.

### Weapon Stat Presentation

- Weapon comparison should show per-shot damage as the headline stat.
- Also show trigger/volley output and sustained DPS below the per-shot line.
- Multi-shot weapons must make individual shot strength visible so they do not always appear strictly better.
- Keep math/dev breakdowns separate from player-facing stats.

## Phase 2: Mission Survivability And Hard-Run Incentives

### Front-Loaded Hard-Mission Salvage

- Harder missions should place meaningful salvage carriers or salvage opportunities in the early portion of the mission.
- Place at least one meaningful salvage opportunity before the first major difficulty spike in any mission intended to tempt early attempts.
- The player must extract or complete the mission to keep that value.
- Death still loses cargo according to the current cargo/death rules unless a later economy spec changes that explicitly.
- The intent is "try the hard mission, grab something valuable, and decide whether to RTB," not "enter hard mission and receive guaranteed pay."

### Repair And Booster Caches

- Add distinct pickup categories:
  - Shield booster: restores or temporarily boosts shields.
  - Armor patch cache: restores armor when the ship has armor; if armor is absent or already full and hull is damaged, it can repair hull instead.
- Hull-only repair can exist as a rare late-game or scripted variant, but the first implementation should not require a separate common hull cache.
- Caches may be level-scripted and may also drop rarely from selected enemies.
- Cache visuals must be distinct from salvage pods and item drops.
- If cache data becomes part of level JSON, validation must reject malformed cache definitions.

### EMP Projectile Clear

- EMP keeps its current enemy slow/fire-disable role.
- EMP also clears enemy projectiles in a local radius around the player ship.
- The clear should affect hostile projectiles only.
- The radius should be large enough to work as a defensive panic/control tool, but not a full-screen wipe.
- EMP upgrades can increase projectile-clear radius in later tiers, but the first tier should use the 190 pixel baseline.
- The effect should be readable: use a pulse, ring, fade, or similar visual to show the clear radius.

## Phase 3: Browsing And Ledger Licenses

### Inventory, Archive, And Market Browsing

- Add sort, filters, and text search where the player browses items:
  - Armory inventory grids.
  - Item archive.
  - Ledger sell/inventory view.
- Minimum sort modes:
  - Newest/recent.
  - Rarity.
  - Type/slot.
  - Value.
  - Weapon family or weapon role for primary and mini weapons.
- Minimum filters:
  - Equipped/installed.
  - Primary weapons.
  - Mini weapons once implemented.
  - Defense.
  - Aux/support.
  - Relics.
  - Sellable/economy items where applicable.
- Search should match item name, subtitle, tags, family, rarity, and short role labels.
- Controls should fit the existing flat scene UI. Do not introduce a separate modal browsing flow.

### Shop Breadth Upgrades

- More daily shop items are unlocked through Ledger licenses.
- Licenses increase the number of visible market lots per refresh.
- Licenses should not primarily improve rarity odds or category control in the first implementation.
- Initial license costs should be 800 credits for 7 lots, 1800 credits for 9 lots, and 4000 credits for 11 lots.
- The Ledger market should clearly show:
  - Current license tier.
  - Current daily lot count.
  - Next tier cost.
  - Next tier lot-count benefit.
- Keep the default shop readable for new players. Increased stock should feel like broader access, not clutter.

## Phase 4: Mini Auto-Gun Slot

### Loadout Model

- Add a new mini weapon slot separate from primary, defense, and aux/support.
- Mini weapons are their own small weapon system, not an aux module and not only a hull perk.
- The mini slot should be introduced before named hull complexity.
- Mini weapons should be itemized and appear in inventory, archive, market, and tooltips like other gear.

### Mini Weapon Variety

- Mini weapon item vocabulary includes:
  - Ammo identity: kinetic or plasma.
  - Cadence identity: slow/big or rapid/small.
  - Targeting identity: forward arc, wider arc, or 360-degree coverage.
  - Optional effects: explosive, homing, vampiric, or other existing weapon-effect vocabulary where balance allows.
- Some mini weapons can only fire forward. Others can target in 360 degrees. Targeting behavior is an item property, not a universal rule.
- Forward arc means about 70 degrees centered above the ship. Wide arc means about 140 degrees. 360-degree mini weapons can target any hostile in range but should use lower damage or slower cadence.
- Default targeting priority is nearest hostile inside the allowed arc/range. Homing or priority-target affixes may override that later, but base mini weapons should not prefer elites by default.
- Mini weapons should assist the build without replacing the primary weapon as the main source of agency.

### Mini Weapon UX

- The armory should show mini weapon stats separately from primary weapon stats.
- Tooltips should clearly state targeting arc and behavior.
- Combat UI should make the mini weapon's presence readable without crowding the existing HUD.

## Phase 5: Named Hulls And Second Primary Bay

### Hull Availability

- Start the game with one default starter hull.
- Named hulls unlock as mid-game purchases/upgrades after the player has learned the weapon, salvage, and Ledger loops.
- Use functional names in the first pass. Suggested placeholders:
  - Starter: balanced default hull.
  - Bastion: defense-focused hull with stronger shield/armor capacity and reduced armor penalties.
  - Relay: tech/aux-focused hull with stronger aux effects and better mini weapon control.
  - Broadside: gunship/weapon-focused hull with the best second-bay and dual-fire scaling.
- Cargo/economy hulls are not part of the first hull pass.

### Hull Roles

- Hulls can define build identity through:
  - Extra or altered defense slots.
  - Innate shields or armor.
  - Reduced penalties from armor mass/drag.
  - Aux strength or cooldown bonuses.
  - Second-bay and dual-fire penalty mitigation.
- Hull bonuses must be visible at selection time.
- Hulls should not replace item identity. They should shape the build and create synergies with items.

### Second Primary Bay

- The second primary bay starts as a weapon swap system.
- Swapping should be normal and encouraged, with a short cooldown so it cannot be spammed every frame.
- Equipping a second primary creates passive defense strain:
  - Reduce max shield by 15%.
  - Reduce shield regen by 15%.
  - Show both reductions in the armory before launch.
- Advanced hulls and upgrades can reduce the defense strain.
- Carrying one primary should remain a legitimate build choice.

### Single-Weapon Incentives

- Some heavy or special weapons cannot dual-fire.
- Empty second bay or one-primary mode should grant a visible benefit such as better defense, handling, recovery, overclock, or reduced strain.
- The first one-primary benefit is the focus bonus from the balance targets: +10% max shield and +10% shield regen.
- The benefit should be strong enough that one-primary builds remain attractive, especially with large single-shot weapons.

## Phase 6: Simultaneous Dual-Fire

### Dual-Fire Rule

- Simultaneous dual-fire is an advanced upgrade, not the default second-bay behavior.
- Dual-fire uses a damage penalty as its main cost.
- The starting penalty should be large enough that dual-fire is not automatically correct for every build.
- Advanced hulls and upgrades can reduce the penalty and can eventually allow full DPS from both weapons.
- Use the initial damage progression from the balance targets: 60%, 70%, 85%, then 100% per compatible weapon.
- Even at full DPS, compatibility limits and single-weapon bonuses should keep one-primary builds viable.

### Dual-Fire Compatibility

- Not every weapon must support simultaneous dual-fire.
- Large, heavy, rare, or special-case weapons may be swap-only or single-weapon-focused.
- Compatibility should be visible in item details before purchase/equip.
- The implementation should avoid hidden rules such as "this gun silently performs worse"; show the reason in item or hull copy.

## Aux Power Upgrades

- Aux port upgrades improve effect strength, radius, or duration and modestly reduce cooldown.
- Use three initial aux upgrade tiers: +10% strength/radius/duration and -5% cooldown, then +20% and -10%, then +30% and -15%.
- EMP upgrades should naturally improve projectile clear radius or enemy-control duration, within balance limits.
- Cloak/bulwark or other support abilities should receive equivalent strength-plus-cooldown treatment.
- Aux upgrades should live in the Armory/Engineering side of the fiction, not as Ledger market licenses.

## Upgrade Surfaces

- Split upgrades by fiction:
  - Ship, slot, hull, mini weapon, second bay, dual-fire, and aux upgrades belong in Armory/Engineering-style surfaces.
  - Shop breadth belongs to Ledger licenses.
- Do not create one generic upgrade bucket unless the UI later needs a consolidation pass.
- Each upgrade should show current tier, next benefit, and cost before purchase.

## Generated Asset Requirements

Generate or add new assets as part of the implementation phases. Use the existing generated-asset workflow in `ASSET_GENERATION.md`.

Required asset groups:

- Shield booster pickup.
- Armor patch cache pickup, with visual language that can also imply emergency hull repair when needed.
- EMP clear pulse/ring or equivalent combat effect.
- Mini weapon icons for kinetic/plasma, slow/big, rapid/small, forward arc, and 360-degree variants.
- Functional hull/chassis visuals or icons for Starter, Bastion, Relay, and Broadside.
- UI chrome or small badges for Ledger license tier, second-bay strain, dual-fire compatibility, and single-weapon bonus.

Asset acceptance:

- Pickups must be distinguishable from salvage pods at combat scale.
- Item/hull icons must read clearly in the existing armory and market card sizes.
- Placeholder-quality shapes are not enough for final implementation; generated assets should feel consistent with the current generated baseline.

## Validation And Test Plan

Run the existing validation stack after every implementation phase that changes code or data:

```bash
node --check main.js
node --check scripts/balance_report.js
node scripts/validate_levels.js
node scripts/validate_weapon_frames.js
node scripts/balance_report.js
git diff --check
```

Add or extend validation where new structured data is introduced:

- Level validation for scripted repair/booster caches if they become level JSON.
- Item validation for mini weapon targeting arcs, ammo, effects, and compatibility flags.
- Balance report coverage for per-shot/volley/DPS display inputs.
- Balance report coverage for large single-shot, rapid-fire, multi-shot, mini weapon, and dual-fire role separation.

Browser smoke scenarios:

- Fresh save lands in hangar with starter kit and no Flight School gate.
- Existing pre-cleanup save still reaches hangar and keeps starter gear.
- Debrief shows explicit reward sources and no time/score credit conversion.
- Hard mission early salvage can be collected and kept only through extraction.
- Shield booster and armor patch pickups restore the intended layers.
- EMP clears hostile projectiles near the ship and keeps current enemy-control behavior.
- Armory, archive, and Ledger sell views sort, filter, and search correctly.
- Ledger license purchase increases visible market lots.
- Mini weapon equips, fires, and displays targeting behavior correctly.
- Hull selection shows innate bonuses and tradeoffs.
- Second primary bay swaps with short cooldown and shows passive defense strain.
- One-primary build shows its bonus.
- Dual-fire applies the intended damage penalty and respects compatibility limits.

## Documentation Updates Required During Implementation

- Update `CURRENT_SYSTEMS.md` after each shipped phase.
- Update `ROADMAP.md` when a phase is complete or when scope changes.
- Update `WEAPON_FRAME_FORMAT.md` or create a mini weapon schema doc when mini weapon data becomes structured.
- Update `LEVEL_JSON_FORMAT.md` if repair/booster caches become level-authored data.
- Update `ASSET_GENERATION.md` with any new generated asset packs and QA notes.
- Keep archived docs in `outdated_docs/` as history only.

## Deferred Decisions

- Item durability remains out of scope.
- Cargo/economy hulls are deferred.
- Family tier, hull ownership fiction, surface layers, and certifications remain broader economy/lore direction unless explicitly pulled into a later spec.
