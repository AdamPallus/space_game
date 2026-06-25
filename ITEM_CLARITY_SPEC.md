# Item Clarity Spec (Phase 7): Intrinsic vs Effective Stats + Card/Stats Cleanup

Status: implemented 2026-06-25. This file is retained as the implementation
spec; the living behavior reference is [ITEM_UX_SPEC.md](ITEM_UX_SPEC.md).

*Author: Claude (Opus 4.8), 2026-06-25. Read first: [STATE.md](STATE.md),
[CURRENT_SYSTEMS.md](CURRENT_SYSTEMS.md), [ITEM_UX_SPEC.md](ITEM_UX_SPEC.md)
(the living item-UI reference this updates), [LOOT_DEPTH_SPEC.md](LOOT_DEPTH_SPEC.md),
[UI_DESIGN.md](UI_DESIGN.md) (Ten Rules bind).*

This is a correctness + clarity pass. Do the parts **in order** — Part A is
the foundation every other part stands on. One branch, commit per part, run
the STATE.md validation stack + a browser smoke test before each commit.

## Root cause (verified)

The item display derives the headline stat from **whole-ship aggregate**
stats (`getShipDisplayStatsForState(previewState)`), not from the item's own
contribution:
- `getComparableSlotIdForItem` returns `defense-0` for all defense items
  (main.js ~7376), so a hovered shield's headline reads the *summed* ship
  shield (item + the other equipped defense slot). Two 30-shields read 60.
- Weapon DPS reads `previewStats.offense.dps` — the whole ship's offense,
  which is locked/contaminated by the other equipped weapon, the active
  dual-fire bay, aux flow buffs, and the armor fire-rate penalty. With two
  weapons equipped, cards collapse to the same number.

The installed-card path shows item-own values, so the two surfaces disagree.

---

## Part A — Split intrinsic vs effective (the foundation)

Introduce one clean function:

```
getItemIntrinsicStats(item)
```

It computes the item's stats from a **reference build** = the item's own
build only (frame/base + the item's rolled affixes + rarity bonuses), on a
neutral ship: NO other defense slot, NO second weapon, NO aux flow buffs, NO
armor drag, NO focus/strain, NO hull modifiers. Reuse the existing math
engines fed with this isolated build:
- primary → `getOffenseStatsForBuild(itemOwnBuild)`
- defense → the item's own shield/armor/regen contribution only (one slot)
- aux → the item's rolled `auxPotency` knobs (already per-item)
- mini → existing per-item mini stats (already mostly correct)

Rules:
1. **The card/tooltip headline and stat lines render INTRINSIC stats.** A
   30-shield always shows 30. A weapon always shows its own DPS. Identical
   regardless of the rest of the loadout. This is "DPS is a property of the
   item."
2. **The comparison delta stays effective.** Keep the existing whole-ship
   preview ONLY to compute the delta: `Δ = shipTotal(with item installed) −
   shipTotal(now)`. Label it clearly as the install effect, e.g.
   `▲ +12.3 installed` / `▼ -18 ship shield`. Delta and headline are
   visibly different things.
3. Fix `getComparableSlotIdForItem` so defense items resolve to the slot the
   item would actually occupy for the delta, but the headline no longer
   depends on it (it's intrinsic).
4. Saved/installed items and inventory/market/debrief items all flow through
   `getItemIntrinsicStats` so every surface agrees.

**Acceptance A:** Equip two 30-shields; hover a third 30-shield → headline
reads 30 (not 60); the delta line shows the ship-total change. Equip two
weapons; hover any weapon → each shows its own distinct DPS; installing it
changes the ship panel by exactly the shown delta.

## Part B — Item card information architecture (reorder)

The roll bar is currently near the top; the most important question is "what
kind of weapon is this?" Reorder the weapon stat block to (top → bottom):

1. **DPS** (intrinsic, headline) + install delta
2. **Pattern** (e.g. "Wide — 5 projectiles")
3. **Damage per Shot**
4. **Ammo** (Kinetic / Plasma + burn note)
5. **Special** — pierce / homing / explosive / vampiric / seeker, in plain
   language; omit the line entirely if none
6. **Shots per Second** + other secondary stats
7. **Affix lines** (rolled magnitudes)
8. **Roll-quality bar** — moved to the BOTTOM
9. Footer: sell value · tags (relic lore above footer for relics)

Defense/aux/mini blocks follow the same principle: identity stat first
(Shield/Armor or Cooldown/Duration), roll bar last. Update the ASCII anatomy
and the section ordering in [ITEM_UX_SPEC.md](ITEM_UX_SPEC.md) §1/§3 to match
(this spec supersedes the old ordering there).

**Acceptance B:** A weapon card reads DPS → Pattern → Damage/shot → Ammo →
Special before any roll/affix detail; the roll bar is at the bottom on every
surface (inventory, market, debrief, inspector).

## Part C — Kinetic damage breakdown (the "how is this calculated" ask)

Players must be able to see how size/speed/impulse build a kinetic weapon's
damage, and how installed buffs change it. Add a **breakdown section**
(expanded tooltip detail + Show Stats), player-language by default, raw
formulas only under the existing Show-math toggle.

Intrinsic breakdown (kinetic), plain language:
```
Damage per shot 32.4
  Base 14  ·  Size ×1.6  ·  Speed ×1.45  →  32.4
Shots per second 1.5
DPS 48.6   (32.4 × 1 projectile × 1.5/s)
```
For plasma, show base × size (+ focused mult) and the burn line.

**Installed modifiers** subsection (only when installed or in the preview),
listing each active global effect with its sign, so the gap between intrinsic
and effective is explicit:
```
Installed modifiers
  Aux flow-rate            +11% shots/sec
  Heavy armor drag         −12% shots/sec
  Single-primary focus     +8% primary damage
  Effective DPS 47.9
```
Every modifier that moves the number must appear here. No silent changes
(UI_DESIGN Rule 6).

**Acceptance C:** For a kinetic weapon, the card explains its damage from
size/speed; equipping heavy armor or an aux flow item adds a visible signed
line and a changed Effective DPS. Nothing alters DPS without a listed line.

## Part D — One-vs-two weapon system: real tradeoff, legible everywhere

The current "single-primary focus" gives +X% shield/regen (useless with no
shields) and "second-bay strain" reduces shield/regen — both invisible and
build-dependent. Make the tradeoff universal and shown.

1. **Single-primary focus** → a universally useful bonus: **+X% primary
   damage** (suggest +8–12%), not shield-only. Shown explicitly on the empty
   second-bay card and in Installed modifiers.
2. **Second-bay strain** → an explicit **−X% primary damage per weapon**
   penalty (the "60% per weapon" idea, made real and labeled), shown on both
   weapon cards and in Installed modifiers. Net: two weapons = more coverage/
   total output but lower per-weapon damage; one weapon = focused punch. Tune
   so both are viable (Acceptance D + balance_report).
3. **"Unlock in Ledger"** on the base hull's Dual Fire control → a hover/
   disabled-state tooltip, NOT permanent body text. The control reads
   "Dual Fire" disabled with a hover explaining where to unlock it.
4. Keep numbers in config; expose focus/strain rates in the `ECONOMY`/balance
   config block.

**Acceptance D:** With one primary, the focus bonus shows as +X% damage and
affects DPS visibly; adding a second primary shows the per-weapon penalty on
both cards and in Installed modifiers; the base hull shows Dual Fire as a
hover-explained disabled control, not permanent text.

## Part E — Terminology unification (fire rate)

Armor currently advertises "25% cooldown" while weapons call the same axis
"Shots per Second." Unify: the firing-speed axis is **always "Shots per
Second"**, and anything that reduces it is expressed as a signed
**"−X% Shots per Second"** line (armor drag, etc.). Never surface raw
"cooldown" multipliers to the player (those go under Show math). Armor's card
must state its fire-rate penalty in this form so the DPS cost is obvious
without testing.

**Acceptance E:** Heavy armor's card shows "−X% Shots per Second" (or
equivalent), and that same penalty appears in the weapon's Installed
modifiers; the word "cooldown" appears in player-facing copy nowhere with
Show-math off.

## Part F — Show Stats / build internals cleanup

The current build-internals readout exposes internal loot ids, shows a
possibly-stale armor class, and still prints "Mission count." Replace it with
a clean, player-facing ship readout:

1. **Offense:** effective DPS with the Part C breakdown + Installed modifiers.
2. **Defense:** Hull, Shield (+regen, +recovery), Armor + **the actual armor
   class used in combat** (the best installed class, per CURRENT_SYSTEMS.md —
   verify it matches what combat applies, not a placeholder).
3. **Aux:** the equipped aux item's rolled numbers (duration/cooldown/effect).
4. **Loadout:** focus/strain state in plain language.
5. **Remove:** internal item ids/names, "Mission count," and any raw internal
   calculation not covered by Show math.

**Acceptance F:** Show Stats shows no internal loot ids and no "Mission
count"; the armor class displayed equals the value combat uses (verify by
comparison); every number has a player-language label.

---

## Cross-cutting

- One source of truth: intrinsic via `getItemIntrinsicStats`, effective via
  the existing ship-stat path; tooltip, inspector, market, debrief, and Show
  Stats all consume these — no fourth code path.
- Formulas stay behind Show math (`state.devShowMath`); default copy is
  plain language.
- Save-compatible; no combat-mechanic changes except the focus/strain
  reframing in Part D (that is a balance change — validate it).
- Validators pass; zero console errors; browser smoke test on desktop + mobile.
