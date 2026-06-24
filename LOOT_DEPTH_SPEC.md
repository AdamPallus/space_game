# Loot Depth Spec: Affix Magnitude Rolls (Phase 6)

*Author: Claude (Opus 4.8), 2026-06-23. Read first: [STATE.md](STATE.md),
[CURRENT_SYSTEMS.md](CURRENT_SYSTEMS.md), [ECONOMY_DESIGN.md](ECONOMY_DESIGN.md),
[ITEM_UX_SPEC.md](ITEM_UX_SPEC.md). Decision on file: loot is a pure hunt —
god rolls come from drops and market stock only; there is NO reroll bench.*

## The problem (verified in code)

The loot system has **horizontal** variety (which affixes roll) but no
**vertical** variety (how good each affix rolled):

- `affixCount` is fixed per rarity — scrap 0, certified 1, prototype 2,
  pre-Founding 2 (`GAME_DATA.rarities`, main.js ~332).
- Affix magnitudes are constants: `flow_rate_plus` is always `flowRateLevel
  +1`; `impulse_budget_plus` is always `+0.12`. `createRolledItem` →
  `applyBuildAdd` stamps the fixed value with no per-instance roll
  (main.js ~2292).

Result: two Prototype Slug Cannons differ only in *which* affixes drew, never
by *how much*. This is the root cause of three separate complaints:
"all purples of one type feel identical", "player power is capped", and
"money isn't constrained". A vertical roll axis fixes all three at once.

## Goal

Add a per-instance magnitude roll to every affix, a roll-quality score, a
top-rarity affix-count bump, and convert aux ability strength from an
investment upgrade into a rolled item property. No new affixes. No new
combat mechanics. This is a depth pass on existing systems.

---

## 1. Affix magnitude rolls (the keystone)

### Data: add a roll range to each affix in `items/item_pool.json`

Each magnitude affix gains a `roll` object. The roll is a **float multiplier
applied to its `buildAdd` values** at instance time. The build math already
multiplies levels by coefficients (e.g. `flowRateLevel * 0.10`), and those
coefficients accept floats today — so a rolled `flowRateLevel` of 1.3 yields
+13% with zero combat-code change.

| Affix | buildAdd today | roll range (×) | Displayed result |
|---|---|---|---|
| flow_rate_plus | flowRateLevel +1 | 0.6 – 1.5 | +6% … +15% Attack Speed |
| flow_velocity_plus | flowVelocityLevel +1 | 0.6 – 1.5 | +9% … +22% Projectile Speed |
| flow_size_plus | flowSizeLevel +1 | 0.6 – 1.5 | scaled projectile size |
| impulse_budget_plus | kineticImpulseBudget +0.12 | 0.5 – 1.6 | +6% … +19% Impulse |
| shield_max_plus | shieldMaxLevel +1 | 0.6 – 1.6 | +X Shield |
| shield_regen_plus | shieldRegenLevel +1 | 0.6 – 1.6 | +X/s Shield Regen |
| shield_recovery_tune | shieldCooldownLevel −1 | 0.5 – 1.5 | faster shield recovery |
| armor_plate_plus | armorAmountLevel +1 | 0.6 – 1.6 | +X Armor |
| armor_class_plus | armorClassLevel +1 | 0.5 – 1.4 | +X Armor Class (round at apply) |
| armor_drag_tune | armorDragLevel −1 | 0.5 – 1.5 | reduced armor drag |
| bulwark_capacitor | multi shield stats | 0.7 – 1.4 | scales all three |

Ranges above are first-pass; tune against `balance_report.js`. Integer-only
stats (armor class) round at the point of application, not at roll time, so
the displayed magnitude stays honest.

### Effect affixes (pierce / homing / explosive / vampiric)

These are binary today (`build.effect`). Keep them binary at certified, but
let their **potency tier** roll at higher rarity via `effectUpgrades`:
- certified: tier 1 always
- prototype: rolls tier 1–2
- pre-Founding: rolls tier 2–3

Only spend code here if `effectUpgrades` already scales the effect in combat
(it does for pierce count). If an effect has no tier scaling yet, leave it at
tier 1 and note it — do not invent new combat behavior in this phase.

### Roll quality

Compute `rollQuality` in [0,1] per item = mean normalized position of each
rolled affix within its range (an affix at range max = 1.0). Store on the
item instance. This drives display (below) and item `value` (§3).

### Apply path

In `createRolledItem`: when rolling each affix, draw a uniform float in its
`roll` range, multiply the affix's `buildAdd`/effect tier by it, then apply.
Store the rolled magnitudes on the affix instance (not just the affix id) so
the tooltip and ship-stats panel read the real numbers, and so the item is
reconstructable from save without re-rolling.

## 2. Affix count: reward chasing rarity

Bump pre-Founding so top rarity has a structural payoff beyond bigger value:

| Rarity | affixCount today | new |
|---|---|---|
| scrap | 0 | 0 |
| certified | 1 | 1 |
| prototype | 2 | 2 |
| pre-Founding | 2 | **3** |

Verify the affix pool per slot can supply 3 non-conflicting affixes
(respect `exclusiveGroup`); if a slot can't, fall back to its max available
and do not error.

## 3. Aux abilities: per-ability rolled strength, delete the investment

Currently cloak/EMP/bulwark strength comes only from `getAuxStrengthMult()`
→ the `auxPower` engineering investment (main.js ~5109, ~5217). A scrap cloak
and a prototype cloak are identical, and the abilities are weak at baseline
(cloak especially: 2.5s hide / 10s cooldown / no utility). This violates the
design (power from drops, not upgrades) AND undersells the abilities.

A single uniform potency scalar is the wrong tool — it can't fix cloak,
whose problem is its cooldown and lack of payoff, not a flat percentage.
Instead each ability's **signature knob** rolls hard.

### Potency envelope

Per aux item instance compute a bonus fraction:

```
B = (rarityTier + roll) / 3        // rarityTier: scrap 0, cert 1, proto 2, relic 3
                                   // roll: uniform[0,1], also feeds rollQuality
```

B ranges 0 (scrap, floor roll) → ~1.33 (pre-Founding, god roll). This is a
deliberately wide envelope so aux loot has a real chase. Apply per ability:

| Ability | Knob (rolled) | Formula | Scrap floor | Relic god roll |
|---|---|---|---|---|
| **Cloak** | duration ↑ | `2.5 * (1 + 0.7*B)` | 2.5s | ~4.8s |
| | cooldown ↓ | `10 * (1 - 0.5*B)`, floor 4 | 10s | ~4.0s |
| **Bulwark** | shield bonus ↑ | `200 * (1 + 1.2*B)` | 200 | ~520 |
| | duration ↑ | `1.2 * (1 + 0.6*B)` | 1.2s | ~2.2s |
| **EMP** | duration ↑ | `1.6 * (1 + 0.6*B)` | 1.6s | ~2.9s |
| | clear radius ↑ | `190 * (1 + 0.5*B)` | 190 | ~316 |
| | cooldown ↓ | `8 * (1 - 0.4*B)`, floor 3.5 | 8s | ~3.8s |

So a god-roll Cloak is near-permanent-uptime (4.8s hide / 4s cooldown), a
god-roll Bulwark is +520 shield, and EMP's already-good knobs scale up. These
are first-pass; tune against `balance_report.js` and playtest. Coefficients
live in a config block, not scattered literals, so tuning is one edit.

1. Store the rolled knob values on the aux item instance (reconstructable
   from save, like §1).
2. **Remove the `auxPower` investment** from Engineering Bay and
   `getAuxStrengthMult`/`getAuxPowerTier`. Migrate existing saves: refund
   spent credits OR silently drop the tier (pick one, document it). The hull
   `auxPowerBonus` may stay as a small hull identity perk, not a power track.

### Cloak still lacks a payoff (deferred — do NOT build in this phase)

Even at a god roll, cloak only hides. Per Adam: first ship the duration/
cooldown rolls and playtest; if cloak still feels flat, a follow-up adds an
**offense payoff** (e.g. damage bonus on the shot that breaks cloak, or brief
post-cloak fire-rate spike). Note as a Phase 6b candidate; leave a TODO, no
combat code now.

## 3b. Aux affix selection: real offense AND defense options

Aux items are "an ability + a rolled passive package", so the passive pool
must give a genuine both-sides choice. Today aux can roll: flow_rate,
flow_velocity, impulse_budget (offense) + shield_max, shield_regen,
shield_recovery, bulwark_capacitor (defense) — usable but offense-thin and
no armor support. **Expand `slotTypes` to add `aux`** on:

- `flow_size_plus` (offense — round out the flow set)
- `armor_class_plus`, `armor_plate_plus` (defense — let aux support armor
  builds, not only shield builds)

Result: aux offense = flow_rate / flow_velocity / flow_size / impulse;
aux defense = shield_max / shield_regen / shield_recovery / armor_class /
armor_plate / bulwark_capacitor. With §1 magnitude rolls, these now vary in
strength, so a Prototype Cloak with a high-rolled +impulse and +shield_regen
is a real, distinct build piece. (Effect traces pierce/homing/explosive/
vampiric stay primary-only — aux items don't fire the primary.)

## 4. Surfacing (extends ITEM_UX_SPEC.md tooltip)

- Each rolled affix line shows its **real magnitude** ("+13% Attack Speed"),
  not the affix's nominal value.
- Add a **roll-quality bar** to the tooltip and inspector: a thin meter
  filled to `rollQuality`, colored toward the rarity color, with a short
  label ("Roll 84%"). This is the Diablo "is this a keeper?" read.
- Aux tooltips show the ability's actual numbers (e.g. "Cloak 3.1s · CD 8.4s")
  derived from `auxPotency`, plus its secondary affix lines.
- Ship-stats panel and comparison deltas (4c) must reflect rolled magnitudes
  so an upgrade comparison is honest.

## 5. Economy: make the pure hunt a real money sink

Because there's no reroll bench, **buying is the only sink**, so the buy/sell
spread must keep money scarce while players refresh stock hunting god rolls:

1. **Item `value` scales with `rollQuality`**: a max-roll item is worth more.
   Suggest `value = baseValueForRarity * (0.85 + 0.45 * rollQuality)`. This
   makes god rolls expensive to buy and lucrative to flip — feeds the
   beat-the-economy fantasy without a new system.
2. Keep `sellRate` 0.4. If `balance_report.js` shows credits still
   ballooning, lower it before touching bounties.
3. **Stock should visibly roll quality**, so refreshing for a god roll is the
   intended chase: most stock is mediocre, occasional high-roll lots appear.
   Mispriced lots (existing) plus high-roll lots are the two reasons to keep
   refreshing.
4. Do NOT add stock-refresh fees or reroll costs — pure hunt was chosen.

## 6. Harder levels (after §1–5 land and the ceiling is raised)

Only after god rolls measurably raise the player ceiling: add harder campaign
content via **authored high-damage projectile profiles** (the lever
CURRENT_SYSTEMS.md already endorses), not global enemy DPS multipliers and
not by nerfing player offense/defense. This is a separate follow-up; do not
bundle it into the loot pass.

---

## Acceptance

1. Roll two Prototype Slug Cannons with the same affixes: their displayed
   magnitudes differ; ship-stats differ; `balance_report.js` shows a DPS
   spread across same-rarity same-base items (it is ~0 today).
2. A max-roll item is clearly stronger AND worth more credits than a
   floor-roll of the same base+rarity.
3. Pre-Founding items roll 3 affixes where the pool allows.
4. A god-roll Cloak measurably approaches its target (~4.8s / ~4s cooldown)
   and a Scrap Cloak sits at baseline; god-roll Bulwark grants ~520 shield.
   The `auxPower` investment is gone from UI and code; saves migrate cleanly.
   Aux items can roll both offense (flow/impulse) and defense (shield/armor)
   passives; a Cloak with high-rolled offense passives is a distinct piece.
5. Tooltip/inspector show real rolled magnitudes and a roll-quality bar;
   comparison deltas remain correct.
6. Saved items reconstruct with identical rolled stats after reload
   (no re-roll on load).
7. Validators pass; zero console errors; browser smoke test clean.
