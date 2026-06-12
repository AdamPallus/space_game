# Economy Design: Salvage, the Ledger, and Beating the System

*Author: Claude (Fable 5), 2026-06-11. Companion docs: [UI_DESIGN.md](UI_DESIGN.md), [CODEX_SPEC.md](CODEX_SPEC.md), [STORY-PREMISE.md](STORY-PREMISE.md)*

## Design thesis

The game is an **extraction shmup**. The core decision, made continuously during
every mission, is: *RTB now and keep what I'm carrying, or push deeper for more?*
The meta-game is: *outplay the Ledger's economy.* Every system below serves one
of those two sentences. If a proposed feature serves neither, cut it.

The original inspiration is the shareware-Raptor exploit: replay early levels,
exit before the end, sell the loot, get rich. Here that behavior is not an
exploit — it is the intended core loop, and the Ledger *notices* you doing it
(flavor text, never punishment). Playing the economy against the game must
always feel clever, never degenerate.

**Persistence rule: everything is persistent. No prestige, no run resets, no
roguelike meta-wipe.** The fantasy is accumulation. Variance comes from salvage
RNG and the rotating market, not from losing progress.

---

## 1. Currency

One currency: **credits**. No second currency, no crafting materials. Salvage
items are the "second currency" — they hold value, take up space, and convert
to credits only through the Ledger (at the Ledger's spread).

---

## 2. The in-mission loop: salvage and extraction

### Salvage drops
- Designated enemies drop a **salvage pod** on death: a container sprite that
  drifts downscreen. Fly over it to collect.
- Pod contents are rolled at drop time (rarity + item), but the player only
  sees rarity (glow color) until debrief. Identification happens at the claims
  desk — gives debrief a "opening packs" moment.

### Drop sources (derive from enemy catalog class)
| Source | Drop chance | Rarity weighting |
|---|---|---|
| Transports / haulers (`transport`, `bulwark`) | 100% | mostly scrap-grade |
| Mini-bosses / captains (baseCredit ≥ 150, non-boss) | 60% | certified-centered |
| Elite variants (Elite modifier missions) | +15% to all chances | shifted up one tier |
| Level boss | 100%, guaranteed | best available for that level tier |
| Ordinary enemies | 2% | scrap-grade only |

### Cargo hold
- The drone has **3 cargo slots** (upgradable later via Engineering Bay tier).
- When cargo is full, new pods cannot be collected — they drift offscreen and
  are lost. The player watches value float away. This is deliberate tension;
  do not add auto-pickup or overflow storage.
- HUD shows cargo as 3 small slot icons with rarity glows.

### The extraction decision
| Outcome | Bounty (kill credits) | Cargo | Bonus |
|---|---|---|---|
| **RTB** (recall button, anytime) | Keep 100% | Keep all | none |
| **Boss killed** (mission complete) | Keep 100% | Keep all | +recovery bonus (existing 10–25%) + guaranteed boss pod |
| **Drone destroyed** | Keep 75% (25% "hull writedown" fee) | **Lose all cargo** | none |

- RTB plays a short recall animation (drone accelerates upscreen). Rename any
  remaining "eject" language to **RTB / Recall**.
- Missions should **front-load some salvage sources** (a transport wave in the
  first third) so that short-loop farming — launch, grab, RTB — is a real,
  valid strategy. Adam's childhood loop must work on day one.
- The Ledger reacts to repeated early recalls with flavor only:
  > "Pattern flagged: elevated early-recall frequency. Review concluded. No
  > action taken. The Ledger thanks you for your efficiency."

### Armor, gear checks, and the "unkillable wave" problem

Loadout-vs-contract matching is the strategy layer, so gear checks are
intended — but they must cost **efficiency, never possibility**. Three rules:

1. **Armor reduces, never nullifies.** Minimum chip-damage floor on every hit
   (tune ~15–25% of base damage, min 1). The wrong loadout makes plated
   enemies slow and wasteful to kill, never invincible. (Resolves the
   existing TODO_NEXT.md armor-vs-micro-shots issue.)
2. **Contracts telegraph threat composition.** Mission briefs state it
   plainly ("Escort wing: plated. Pierce-rated munitions recommended."). The
   Ledger publishes accurate intel — it profits from your salvage either
   way. Bringing the wrong loadout is a misread contract, not a trap.
3. **Armor gates loot, not exits.** In mixed waves, armored enemies are the
   salvage carriers — skippable priority targets. Can't crack them? Fight
   the soft targets and RTB with a lighter haul: lost reward, not lost
   progress. Strict corollary: **a level boss is never hard-gated behind one
   damage type** — every boss has a shield or hull phase that any viable
   build can damage.

Forced early extraction because you brought the wrong tool is valid gameplay
("wrong tool, half a haul"); an enemy that ignores your damage entirely is a
design bug.

---

## 3. Items

### Shape
Reuse the armory prototype item shape (`slotType`, `name`, `subtitle`,
`description`, `notes`, `icon`, `tags`, `build` stat block) plus new fields:
`rarity`, `value` (list value in credits), `affixes[]`.

### Slots (v1)
- **Primary weapon** (1 hardpoint) — weapon items
- **Defense** (2 slots) — shield/armor modules
- **Aux** (1 slot) — ability modules (cloak/EMP/bulwark become items)

### Rarity tiers
| Tier | Color | Affixes | List value range | Source |
|---|---|---|---|---|
| **Scrap-grade** | gray | 0 | 40–80 | common drops |
| **Certified** | blue | 1 | 150–300 | mini-bosses |
| **Prototype** | violet | 2 | 500–900 | bosses, elite missions |
| **Pre-Founding** | gold | 2 + unique property | 1500–3000 | late bosses, rare |

Pre-Founding items are relics from the ship's erased origin era — each one
carries a lore fragment (one line of black-box text at identification). This is
the loot table doubling as the lore drip from STORY-PREMISE.md.

### Affixes
Affixes are the old modular-weapon components, reborn as item properties.
No crafting bench — variety arrives through loot. Each affix maps directly to
an existing `build` field or weapon effect so combat code barely changes:
pierce, homing, ricochet, vampiric, plasma (DOT), EMP trace, +flow rate,
+projectile velocity, +shield max, +shield regen, +armor class, etc.

Example item: **"Certified Scatter Array — Vampiric trace"** (Spread base,
+vampiric affix, list 240¢).

The existing `items/weapon_frames.json` frames become the **base item set**;
guaranteed starter gear, never lost.

---

## 4. The Ledger market

The market is where "beat the system" lives. It is on the Ledger Terminal
scene (see UI_DESIGN.md).

### Selling
- The Ledger buys any item at **40% of list value**. The 60% spread is printed
  on the receipt as **"Ledger handling fee"** — the rake is never hidden,
  because the Ledger is proudly procedural.

### Buying
- Rotating stock of **5 lots**, refreshed after every mission (any outcome).
- Stock is drawn from a level-appropriate pool at full list value.

### Exploitable on purpose (the soul of the game)
1. **Mispriced lots.** ~1 in 8 stock refreshes, one lot appears at 35–50% of
   list value, flagged only by a subtle notation: *"Lot #4471 — clerical
   adjustment."* An attentive player buys it and can literally flip it back to
   the Ledger for profit. The Ledger never acknowledges this.
2. **Demand bulletins.** Every 3 missions, a fleet bulletin declares demand for
   one tag (e.g. *"plasma"*, *"shield"*): items with that tag **sell at +40%**
   until the next bulletin. Players who hold inventory and time the market get
   paid for it. Cargo-farm the right enemies during the right bulletin = the
   designed Raptor exploit.
3. **No sell caps, no diminishing bounties.** Repetition is paced by drop RNG
   and market stock, never by punishing the player for replaying.

---

## 5. Investments (keep, reframe)

Keep the existing three tracks and costs (200–6000¢). Reframe effects to fit:

- **Engineering Bay** — consumables as before; **tier 3 adds a 4th cargo slot,
  tier 5 a 5th**. (Cargo is the best money sink in this design.)
- **Operations Center** — mission variants as before (this is the content
  unlock track; variants already exist on disk).
- **Fleet Shares** — passive dividends as before. Narratively, this is the
  Ledger's leash: the moment passive income exceeds mission income, why fly?
  Late-story beat, not a mechanic, for now.

## 6. Family tier (narrative layer, v1-light)

Lifetime credits move the family up survival tiers (thresholds: 1k / 5k / 15k /
40k). v1 is purely a status panel in the hangar with flavor text per tier and a
one-line Ledger notice when a tier changes — including the conditional-clause
fine print from the story premise. No mechanical effect yet. (Hooks exist for
later: tier-slip pressure, family requests.)

---

## 7. Tuning targets (first pass, expect iteration)

- A full clear of an early mission: ~300–600¢ bounty + 1–2 pods.
- A short-loop farm (launch → transport wave → RTB): ~28–40% of a full clear's
  value in ~25% of the time. Efficient, but RNG-dependent — full clears get
  the guaranteed boss pod and recovery bonus.
- Death should sting (lost cargo) but never erase a session: bounty keeps 75%.
- A new player should afford their first Certified item within ~3 missions and
  first investment tier within ~5.

## 8. Explicitly cut

- Modular weapon **crafting** UI (components → affixes on dropped items).
- Specialization trees (slot scarcity + affixes already force builds).
- Second currencies, crafting materials, durability/repair systems.
- Any run-reset or prestige mechanic.
- Mission entry/lease fees (revisit later as an optional "lease tier" only if
  the economy feels too generous).
