# Item Communication Spec (Item UX)

Last audited: 2026-06-23

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

All formula strings (impulse budget breakdowns, cooldown multiplier chains,
velocity exponents) live behind the **"Show math"** toggle in the DEV popover
(`state.devShowMath`, default off). When off, no surface shows an equation.
The math view stays intact — it is the tuning tool — just gated.

---

## 1. The canonical stat block — `getItemDisplayStats(item, slotId)`

One function produces the player-facing stats for an item *as if installed in
the given slot with the rest of the current build unchanged* (it reuses the
preview/compose path via `createPreviewStateWithItem`). Tooltip, inspector,
and ship-stats panel all render from its output. It returns an ordered set of
sections plus a headline, affix lines, footer, and (Phase 6) `rollQuality`.

**Weapons (primary):**
| Label | Derivation | Format |
|---|---|---|
| DPS *(headline)* | hitDamage × projectiles/trigger × triggers/sec (+ plasma burn dps, shown as a "+X burn/s" suffix) | `48.6` big |
| Damage per Shot | per-projectile impact damage | `32.4` |
| Shots per Second | triggers/sec | `1.5` |
| Volley Output | per-shot × projectile count | text |
| Pattern | "Focused — 1 projectile" / "Wide — 5 projectiles" | text |
| Ammo | "Kinetic" / "Plasma" (burn note when relevant) | text |
| Dual-Fire | "Dual-capable" / "Swap-only" | text |

**Defense modules:** headline = Shield or Armor (by `defenseType`); lines
cover regen + recovery delay (shield) or armor class + drag (armor), each with
a plain-language effect line.

**Aux modules:** headline = Cooldown (s, lower is better); lines = Duration and
a one-sentence effect. The numbers are the **rolled** ability knobs for the
inspected item (e.g. "Breaks enemy lock-on for 4.2s" / "Cloak 4.2s · CD 5.0s"),
derived from the item's stored `auxPotency`/`auxRoll` — see §5.

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
| flowRateLevel (rolled) | `+X% Attack Speed` |
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
renders a thin **roll-quality meter** above the stat lines — filled to
`rollQuality`, tinted toward the rarity color, labelled `Roll NN%`. This is the
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
│ + 13% Attack Speed              │ ← affix lines, accent, real magnitudes
├─────────────────────────────────┤
│ "Recovered from a pre-Founding  │ ← relics only, italic, gold, mono
│  wreck. Serial illegible."      │
│ Roll 84% ▰▰▰▰▰▰▰▱▱             │ ← roll-quality meter, now at bottom
│ Sell 259 cr        kinetic·aoe  │ ← footer: sell value + tags, muted
└─────────────────────────────────┘
```

### Comparison deltas

When the hovered item is NOT the installed item in the active slot, the
headline stat (and only the headline) shows the difference vs the currently
installed item: `▲ +12.3` in `--good` green, `▼ -4.1` in `--danger` red. For
defense the delta is shield/armor; for aux, cooldown (lower = green).

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

Same data source, same language table. Sections: **Offense** (DPS, Damage per
Shot, Shots per Second, Pattern, Ammo), **Defense** (Hull, Shield + regen,
Armor + class), **Support** (ability, cooldown, duration — rolled). No formulas
unless "Show math" is on, in which case the math strings append beneath each
line (muted, mono).

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
8. Zero console errors; validators pass.
