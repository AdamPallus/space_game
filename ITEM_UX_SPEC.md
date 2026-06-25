# Item Communication Spec (Item UX)

Last audited: 2026-06-25

*Active reference for the item-communication layer. The model is Diablo 3's
item tooltip — a single shared stat block that renders identically across
tooltip, inspector, market, and debrief. Companions: [STATE.md](STATE.md),
[CURRENT_SYSTEMS.md](CURRENT_SYSTEMS.md), [UI_DESIGN.md](UI_DESIGN.md) (Ten
Rules still bind), [LOOT_DEPTH_SPEC.md](LOOT_DEPTH_SPEC.md) (the Phase 6 roll
system this surfaces).*

This system is **implemented**. It was first authored as the Phase 4c spec,
archived during a docs cleanup, and is restored here as the living reference
because [LOOT_DEPTH_SPEC.md](LOOT_DEPTH_SPEC.md) extends it (rolled magnitudes
and the roll-quality bar). Treat this file as the description of how item
communication works today plus the rules any future item-UI change must keep.

## Rule zero: players see derived numbers, never formulas

Raw formula strings (impulse budget internals, cycle-time multiplier chains,
velocity exponents) live behind the **"Show math"** toggle in the DEV popover
(`state.devShowMath`, default off). When off, surfaces use player-language
breakdowns rather than internal formulas. The math view stays intact — it is
the tuning tool — just gated.

---

## 1. The canonical stat block — `getItemDisplayStats(item, slotId)`

One function produces the player-facing stat block. Headline stats and stat
lines come from `getItemIntrinsicStats(item)`: the item's own build on a
neutral ship, with no other defense slot, no second primary, no aux passives,
no armor drag, no focus/strain, and no hull modifiers. The comparison delta is
separate and remains effective: `shipTotal(with item installed) -
shipTotal(now)` through the preview/compose path. Tooltip, inspector, market,
debrief, and ship-stats surfaces all share this data.

**Weapons (primary):**
| Label | Derivation | Format |
|---|---|---|
| DPS *(headline)* | hitDamage × projectiles/trigger × triggers/sec (+ plasma burn dps, shown as a "+X burn/s" suffix) | `48.6` big |
| Pattern | "Focused — 1 projectile" / "Wide — 5 projectiles" | text |
| Damage per Shot | per-projectile impact damage | `32.4` |
| Ammo | "Kinetic" / "Plasma" (burn note when relevant) | text |
| Special | pierce / homing / explosive / vampiric plain-language text, omitted when none | text |
| Shots per Second | triggers/sec | `1.5` |
| Volley Output | per-shot × projectile count | text |
| Dual-Fire | "Dual-capable" / "Swap-only" | text |

**Defense modules:** headline = Shield or Armor (by `defenseType`); lines
cover regen + recovery delay (shield) or armor class + signed Shots per Second
cost (armor), each with a plain-language effect line.

**Aux modules:** headline = Recharge (s, lower is better); lines = Duration
and a one-sentence effect. The numbers are the **rolled** ability knobs for
the inspected item, derived from its stored `auxPotency`/`auxRoll` — see §5.

**Affix lines** (all slots): each rolled affix renders as its own `+`-prefixed
line in accent color, in player language. Innate properties from the frame
(e.g. a Breaker's built-in pierce) render the same way but in ink color, so
innate vs rolled is visible. **Affix lines show the real rolled magnitude**
(Phase 6), read from the affix instance's `rolledBuildAdd`, not the affix's
nominal value.

### Player-language table (internal → displayed)

Percentages come from the actual per-level build math (`getBuildLanguageLines`),
never hardcoded in two places.

| Internal | Player text |
|---|---|
| flowRateLevel (rolled) | `+X% Shots per Second` |
| flowVelocityLevel (rolled) | `+X% Projectile Speed` |
| flowSizeLevel (rolled) | `+X% Projectile Size` |
| kineticImpulseBudget (rolled) | `+X% Impulse (heavier shots keep their speed)` |
| effect: pierce (tier T) | `Shots pierce 1 additional enemy` / `Shots pierce N additional enemies` |
| effect: homing / explosive / vampiric (tier T) | `Shots seek nearby targets` / `… burst on impact (area damage)` / `Damage dealt restores hull`, with a `(tier N)` suffix when N>1 |
| shieldMaxLevel / shieldRegenLevel | `+X Shield` / `+X/s Shield Regen` |
| armorAmountLevel / armorClassLevel | `+X Armor` / `+X Armor Class` |

## 2. Roll quality (Phase 6)

Rolled items store `rollQuality` in [0,1] (mean normalized roll position across
their rolled affixes, including the aux ability roll). The shared display block
renders a thin **roll-quality meter** at the bottom of the detail stack — filled
to `rollQuality`, tinted toward the rarity color, labelled `Roll NN%`. This is the
"is this a keeper?" read. Items with no rolled axes (scrap, no affixes) show no
bar. `rollQuality` also scales item `value` (§5).

## 3. The tooltip (Diablo anatomy, one shared component)

One absolutely-positioned tooltip element, rendered from `getItemDisplayStats`,
shown on hover/focus, clamped to the viewport near the hovered cell. Layout top
to bottom:

Headline stats are **intrinsic** (the item's own stat, identical regardless
of the rest of the loadout); the delta is the **effective** install change.
See [ITEM_CLARITY_SPEC.md](ITEM_CLARITY_SPEC.md) Part A. Stat order leads with
weapon identity (DPS → Pattern → Damage/shot → Ammo → Special); the
roll-quality bar moves to the BOTTOM (Part B).

```
┌─────────────────────────────────┐
│ Prototype Slug Cannon — …       │ ← name, rarity color, bold
│ Prototype Kinetic Cannon        │ ← rarity + type line, muted
├─────────────────────────────────┤
│ 48.6 DPS          ▲ +12.3 inst. │ ← intrinsic headline + effective delta
│ Wide — 5 projectiles            │ ← Pattern
│ 32.4 Damage per Shot            │
│ Kinetic                         │ ← Ammo
│ Shots pierce 2 additional …     │ ← Special (omit if none)
│ 1.5  Shots per Second           │ ← secondary stats
│ Damage Breakdown                │ ← kinetic/plasma player-language breakdown
│ Installed Modifiers             │ ← signed aux/armor/focus/strain lines
│ + 13% Shots per Second          │ ← affix lines, accent, real magnitudes
├─────────────────────────────────┤
│ "Recovered from a pre-Founding  │ ← relics only, italic, gold, mono
│  wreck. Serial illegible."      │
│ Roll 84% ▰▰▰▰▰▰▰▱▱             │ ← roll-quality meter, now at bottom
│ Sell 259 cr        kinetic·aoe  │ ← footer: sell value + tags, muted
└─────────────────────────────────┘
```

### Comparison deltas

When the hovered item is NOT the installed item in the active slot, the
headline area shows the effective install delta, labelled as the install
effect: `▲ +12.3 installed` in `--good` green or `▼ -18 ship shield` in
`--danger` red. The headline number itself remains intrinsic. For defense the
delta is ship shield/armor; for aux, recharge time (lower = green).

**Correctness requirement:** installing the item changes the ship-stats panel
by exactly the delta shown. Deltas read from rolled magnitudes, so an upgrade
comparison stays honest.

### Where the tooltip appears

| Surface | Trigger | Notes |
|---|---|---|
| Armory inventory grid | hover/focus | floating tooltip |
| Ledger market lots | hover/focus | same component; buy decisions need stats |
| Debrief salvage rows | hover/focus | keep/sell decisions need stats |
| Inspector panel | always | same stat block inline; this is the mobile surface |

**Mobile (no hover):** first tap selects and fills the inspector with the full
stat block + deltas; install is a second action. No floating tooltip on touch.

## 4. Rarity treatment

Single source: `getRarityConfig` / `--rarity-color` / `--rarity-glow`.
Colors: scrap `#9aa3b2` · certified `#4da6ff` · prototype `#b06bff` ·
pre-Founding `#f0b429`. Every item surface gets: border + glow on the
cell/row, name text in rarity color, and the rarity word in the type line.
Base/starter items with no rarity render in ink with no glow — the absence is
information too.

## 5. Value and aux numbers (Phase 6 hooks)

- **Value scales with roll quality:** `value = baseValueForRarity *
  (0.85 + 0.45 * rollQuality)`, so a god roll costs more to buy and sells for
  more. This is the pure-hunt money sink — there is no reroll bench.
- **Aux numbers are rolled per item:** cloak/EMP/bulwark strength comes from
  the equipped aux item's stored `auxPotency` (rolled from the B envelope in
  `AUX_POTENCY_CONFIG`), not a global upgrade. Tooltips show the live rolled
  numbers; saved items reconstruct without re-rolling.

## 6. Ship Stats panel

Same data source, same language table. Sections: **Offense** (effective DPS,
Damage per Shot, Shots per Second, Pattern, Ammo, plus the same damage
breakdown and Installed Modifiers used by item cards), **Defense** (Hull,
Shield + regen/recovery, Armor + the actual armor class combat uses, armor
Shots per Second cost), **Aux** (ability, recharge, duration, effect), and
**Loadout** (single-primary focus or second-bay strain in plain language).
No internal item ids, mission count, or raw build internals appear. Raw math
only appears when "Show math" is on.

## 7. Armory main-stage primary bay readout

The spatial Armory hardpoints surface the most important equipped weapon
numbers without opening Show Stats. Primary A and Primary B align with the
left/right Defense A and Defense B bays. The fire-mode selector sits centered
between the two primary bays. Each equipped primary bay shows:

- Effective DPS
- Damage per Shot
- Shots per Second

These are **effective installed** values, not intrinsic item-card values. They
come from the same compose path as the ship stats panel, using the equipped
hull, aux passives, defense drag, single-primary focus or second-bay strain,
and current fire mode. When Dual Fire is active, each primary bay's Effective
DPS and Damage per Shot include the Dual Fire per-weapon damage multiplier;
Shots per Second remains each weapon's own cadence.

## Acceptance

1. Hovering any item in armory / market / debrief shows the tooltip; content
   matches the inspector for the same item exactly.
2. Zero formula text visible anywhere with "Show math" off; toggle on restores
   the math strings.
3. Headline delta is correct: installing the item changes ship stats by the
   shown amount.
4. All four rarities visibly distinct (border, glow, name color) everywhere,
   including after icon swaps.
5. Affix lines show real rolled magnitudes; the roll-quality meter matches the
   item's `rollQuality` and is tinted to its rarity.
6. Aux tooltips show the inspected item's rolled ability numbers.
7. Mobile: tap-select fills the inspector; no floating tooltip; nothing scrolls
   the page.
8. Armory primary bays update Effective DPS immediately when gear or fire mode
   changes.
9. Zero console errors; validators pass.
