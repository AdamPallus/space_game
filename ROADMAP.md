# Roadmap

Last audited: 2026-06-18

This is the active planning doc for the next playable changes. Historical specs have been archived under `outdated_docs/`; current implementation details live in `STATE.md` and `CURRENT_SYSTEMS.md`.

## Next Playable Cleanup

These are the highest-leverage changes for the current build:

1. Remove Flight School as required onboarding.
   - Fresh saves should land in the hangar, not a training track.
   - Starter gear, mission context, market access, and basic controls should be available without a tutorial gate.
   - Existing saves that already completed Flight School should continue to work.

2. Remove passive time-based credit accrual.
   - `creditRewardFor()` should not reward elapsed time.
   - Credits should come from kills, salvage, mission objectives, extraction, Ledger returns, and explicit bonuses.
   - Mission debrief copy should make the reward sources clear.

3. Improve early attempts at hard missions.
   - Add meaningful partial rewards for early mission segments, recovered salvage, scouting, or objective progress.
   - Avoid making failure optimal; the incentive should encourage trying harder missions without farming a timer.

4. Add repair caches.
   - Random boxes should restore armor or hull.
   - The pickup should be visually distinct from salvage and item drops.
   - Validation should catch malformed repair-cache level data if they become scriptable.

5. Upgrade EMP.
   - EMP should remove or neutralize hostile projectiles in a range around the ship.
   - The effect should be readable and bounded so it does not trivialize dense bullet patterns.

6. Add inventory and market sorting/filtering.
   - Inventory should support sort by rarity, type, weapon family, value, and recent acquisition.
   - Filters should cover equipped, weapons, defense, support, relics, and sellable/economy items where applicable.
   - Controls should match the existing flat scene UI rather than adding a separate modal flow.

7. Make shop breadth upgradeable.
   - Add an upgrade path for more shop items per day.
   - Keep the default shop readable for new players.
   - Make the upgrade cost and benefit visible before purchase.

8. Clarify and tune weapon presentation.
   - Show per-shot damage so multi-shot weapons do not always look strictly better.
   - Improve rapid-fire options so they are appealing against the bigger single-shot fantasy.
   - Support much bigger single-shot weapons as a distinct path.

## Next System Expansion

These are promising but should follow the cleanup above:

- Auto gun or mini weapon slot.
  - Auto-targeting secondary weapon.
  - Plasma or kinetic identity.
  - Slow large shots or rapid small shots.
  - Optional explosive, homing, or vampiric traits.

- Second weapon bay.
  - Let players swap or fire two weapons.
  - Decide whether firing both has an energy cost, damage penalty, heat penalty, or upgradeable penalty reduction.

- Hull types.
  - Different hulls can provide innate bonuses.
  - Bonuses should be legible at selection time and should not replace item identity.

- Aux port power increase.
  - Treat as a focused build upgrade rather than a broad stat tax.

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
