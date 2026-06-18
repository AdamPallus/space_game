# Item Communication Spec (Phase 4c)

*For Codex. The model is Diablo 3's item tooltip — do not invent a new
pattern, transcribe that one. Companion:
[CODEX_SPEC_PHASES_1_4C.md](CODEX_SPEC_PHASES_1_4C.md),
[../../UI_DESIGN.md](../../UI_DESIGN.md) (Ten Rules still bind).*

## The problem being fixed

1. Stat surfaces show **internal math** ("14 base * 1.00 size * 1.16^1.5
   velocity"), not player stats.
2. Inventory icons have **no hover stats** — the inspector shows only a
   description line.
3. **Rarity stopped glowing** in the inventory grid.

## Rule zero: players see derived numbers, never formulas

All formula strings (impulse budget breakdowns, cooldown multiplier chains,
velocity exponents) move behind a new **"Show math"** toggle in the DEV
popover. Default off. When off, no surface anywhere shows an equation. Keep
the math view intact — it's the tuning tool — just gated.

---

## 1. The canonical stat block — `getItemDisplayStats(item, slotId)`

One function produces the player-facing stats for an item *as if installed
in the given slot with the rest of the current build unchanged* (reuse the
existing preview/compose path). Everything below renders from its output —
tooltip, inspector, and ship stats panel all use the same source. Returns
ordered sections:

**Weapons (primary):**
| Label | Derivation | Format |
|---|---|---|
| DPS *(headline)* | hitDamage × projectilesPerTrigger × triggersPerSec (+ plasma DoT dps added, shown as "+X burn/s" suffix) | `48.6` big |
| Damage per Hit | per-projectile impact damage | `32.4` |
| Attacks per Second | triggersPerSec | `1.5` |
| Pattern | "Focused — 1 projectile" / "Wide — 5 projectiles" | text |
| Ammo | "Kinetic" / "Plasma (burns 8/s for 2s)" | text |

**Defense modules:**
| Label | Derivation |
|---|---|
| Shield *(headline if shield)* | max shield contribution |
| Shield Regen | per second |
| Armor *(headline if armor)* | armor amount |
| Armor Class | number + plain line: "Reduces incoming hit damage" |

**Aux modules:** headline = Cooldown (s); lines: Duration, one-sentence
effect ("Breaks enemy lock-on for 2.5s").

**Affix lines** (all slots): each rolled affix renders as its own line,
prefixed `+`, in accent color, in *player language* (table below). Base
properties that came from the frame (e.g. Breaker Rail's innate pierce)
render the same way but in ink color — innate vs rolled is visible.

### Player-language table (internal → displayed)

| Internal | Player text |
|---|---|
| flowRateLevel +1 | `+10% Attack Speed` (use the real per-level %) |
| flowVelocityLevel +1 | `+15% Projectile Speed` |
| flowSizeLevel +1 | `+X% Projectile Size` |
| kineticImpulseBudget +0.12 | `+12% Impulse (heavier shots keep their speed)` |
| effect: pierce | `Shots pierce 1 additional enemy` |
| effect: homing | `Shots seek nearby targets` |
| effect: explosive | `Shots burst on impact (area damage)` |
| effect: vampiric | `Damage dealt restores hull` |
| shieldMaxLevel / shieldRegenLevel | `+X Shield` / `+X/s Shield Regen` |
| armorAmountLevel / armorClassLevel | `+X Armor` / `+1 Armor Class` |

Use the actual per-level values from the build math — never hardcode the
percentages in two places.

## 2. The tooltip (Diablo anatomy, one shared component)

One absolutely-positioned tooltip element, rendered from
`getItemDisplayStats`, shown on hover/focus after ~80ms, clamped to the
viewport, near the hovered cell. Layout top to bottom:

```
┌─────────────────────────────────┐
│ Prototype Slug Cannon           │ ← name, rarity color, 14px bold
│ Prototype Kinetic Cannon        │ ← rarity + type line, muted
├─────────────────────────────────┤
│ 48.6 DPS            ▲ +12.3     │ ← headline stat + delta vs equipped
│ 32.4 Damage per Hit             │
│ 1.5  Attacks per Second         │
│ Wide — 5 projectiles            │
│ + Shots pierce 1 enemy          │ ← affix lines, accent color
│ + 10% Attack Speed              │
├─────────────────────────────────┤
│ "Recovered from a pre-Founding  │ ← relics only, italic, gold, mono
│  wreck. Serial illegible."      │
│ Sell 259 cr        kinetic·aoe  │ ← footer: sell value + tags, muted
└─────────────────────────────────┘
```

### Comparison deltas (the Diablo killer feature)

When the hovered item is NOT the installed item in the active slot, the
headline stat (and only the headline — don't delta every line) shows the
difference vs the currently installed item: `▲ +12.3` in `--good` green or
`▼ -4.1` in `--danger` red. For defense items the headline delta is the
shield/armor change; for aux, cooldown (lower = green).

**Correctness requirement:** installing the item must change the ship stats
panel by exactly the delta shown. Test this explicitly.

### Where the tooltip appears

| Surface | Trigger | Notes |
|---|---|---|
| Armory inventory grid | hover/focus | replaces the current thin inspector preview |
| Ledger market lots | hover/focus | buy decisions need stats; same component |
| Debrief salvage rows | hover/focus | keep/sell decisions need stats |
| Inspector panel | always | renders the same stat block inline for the selected item (this IS the tooltip surface on mobile) |

**Mobile (no hover):** first tap selects and fills the inspector with the
full stat block + deltas; second tap (or Install button) installs. No
floating tooltip on touch.

## 3. Rarity treatment (restore + standardize)

Rarity colors: scrap `#9aa3b2` · certified `#4da6ff` · prototype `#b06bff` ·
pre-founding `#f0b429`. Single source: the existing `getRarityConfig` /
`--rarity-color` / `--rarity-glow` mechanism — re-wire any surface that lost
the inline style when icons changed.

Every item surface gets all three of:
1. **Border + glow** on the cell/row (`border-color: var(--rarity-color);
   box-shadow: 0 0 8px var(--rarity-glow)` on hover/selected, subtler at rest).
2. **Name text in rarity color** (tooltip, inspector, market, debrief).
3. **Rarity word** in the type line ("Prototype Kinetic Cannon").

Base/starter items with no rarity render in ink color with no glow — the
absence is information too.

## 4. Ship Stats panel cleanup

Same data source, same language table. Three sections: **Offense** (DPS,
Damage per Hit, Attacks per Second, Pattern, Ammo), **Defense** (Hull,
Shield + regen, Armor + class), **Support** (ability, cooldown, duration).
No formulas unless "Show math" is on, in which case the current formula
strings append beneath each line (muted, mono).

## Acceptance

1. Hovering any item in armory / market / debrief shows the tooltip; content
   matches the inspector for the same item exactly.
2. Zero formula text visible anywhere with "Show math" off; toggle on
   restores the current math strings.
3. Headline delta is correct: install the item, ship stats change by the
   shown amount.
4. All four rarities visibly distinct (border, glow, name color) in grid,
   tooltip, market, and debrief — including after icon swaps.
5. Mobile: tap-select fills inspector with full stat block; no floating
   tooltip; nothing scrolls the page.
6. Zero console errors; validators pass.
