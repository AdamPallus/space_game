# Economy Design: Salvage, the Ledger, and Beating the System

*Author: Claude (Fable 5), 2026-06-11. Companion docs: [STATE.md](STATE.md), [CURRENT_SYSTEMS.md](CURRENT_SYSTEMS.md), [ROADMAP.md](ROADMAP.md), [UI_DESIGN.md](UI_DESIGN.md), [STORY-PREMISE.md](STORY-PREMISE.md)*

Status: active design direction. Phases 1-4c of the original implementation spec have mostly landed and the old build spec is archived under `outdated_docs/implemented_specs/`. Use `STATE.md` and `CURRENT_SYSTEMS.md` for current behavior before using this file for future design decisions.

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
   enemies slow and wasteful to kill, never invincible. (Resolves the old
   armor-vs-micro-shots note now archived with the playtest docs.)
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
- **Mini weapon** (1 hardpoint) — auto-targeting secondary weapons
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

### Storage between runs: unbounded, on purpose

The 3-slot cargo hold is the only inventory cap. Salvage that survives the
flight home is kept forever — no stash limits, no inventory-management
chores, nothing that fights the accumulation fantasy. Selling pressure comes
from the market (credits are useful; bulletins reward timing), and holding
inventory for a demand spike is a legitimate strategy. If hoarding ever turns
degenerate, the remedy is a small per-cycle "Ledger warehousing fee" receipt
line — never a hard cap.

### Kinetic flow model (implemented baseline, tune further after Phase 4)

Kinetic damage derives from projectile physics instead of flat numbers:
`damage ∝ size × velocity^k` (k tunable in config, start ~1.5 — never start
at 2), where each gun has an **impulse budget**: larger projectiles leave the
barrel slower unless item quality raises the budget. Rarity/affixes raise the
budget rather than adding "+1 damage."

Consequences this buys:
- **Armor counters become emergent, not tagged.** ArmorClass already
  punishes low per-hit damage, so heavy slow slugs are anti-armor and fast
  small shots are anti-swarm *by physics*. Contract telegraphs ("plated")
  read off a dial players intuitively understand.
- **Affixes become contextual:** +velocity is worth more on a big-bore base,
  +size on a fast one. Same affix, different value per base = build depth.
- **Plasma ignores the physics** (energy model: DOT, own shield/armor
  interactions), so kinetic vs plasma differ in *model*, not color.
- **Power is visible:** better kinetic gear throws visibly bigger, faster
  slugs. The upgrade is on screen every frame.

The existing `flowVelocityLevel` / `flowSizeLevel` / `gunDiameter` fields are
the inputs. Current weapon tuning uses these concepts, and future changes should
adjust the model through those fields instead of adding one-off damage tags.

Current balance note: focused single-projectile primaries are allowed to sit at
or above multi-shot and burst DPS in raw stats because they pay practical costs
in aim precision, overkill, fewer effect procs, and weak swarm coverage. Mini
weapons scale separately by rarity through damage/cooldown/range/speed tuning,
and higher-rarity minis can roll supported weapon effects. Existing saved mini
loot self-heals through a balance-version marker instead of requiring save
resets. Defense loot also scales by rarity: high-rarity armor doubles the
armor-class benefit above starter baselines at Pre-Founding, and high-rarity
shields scale useful capacity, regen, and recovery strengths while preserving
their drawbacks. Shields absorb raw projectile damage first. Armor class only
mitigates projectile damage that reaches armor, using the best installed armor
class while armor capacity still stacks across installed armor modules. Once
armor is gone, hull takes raw projectile hits. If that makes projectile density
too forgiving, the intended counterbalance is more obvious high-damage
projectile threats rather than a flat enemy DPS increase.

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
- Current implementation: Ledger license tiers are bought in Investments and
  raise visible rotating lots from 5 to 7, 9, and 11. Market has no permanent
  Basic Gear section.

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

Current implementation: Investments also houses permanent hull unlocks, the
Dual Fire ship capability, and Ledger license tiers. The UI is a connected
terminal upgrade tree rather than a card grid. (The former Aux tuning
investment was retired in the Phase 6 loot pass — aux ability strength now
rolls on the item, not on an upgrade track; see `outdated_docs/implemented_specs/LOOT_DEPTH_SPEC.md`.)

Because the loot pass chose a pure hunt with no reroll bench, buying is the
only money sink, so item value scales with roll quality
(`value = baseValueForRarity * (0.85 + 0.45 * rollQuality)`): god rolls cost
more to buy and sell for more, keeping credits scarce while players refresh
stock chasing better rolls.

## 6. Hull ownership (design locked; build after Phase 4)

Per STORY-PREMISE.md, pilots start as labor flying other people's capital
("deploy a drone, often leased/owned by others early on"). Ownership is its
own axis — it answers *who carries the risk*, not what you carry (gear) or
what services you buy (investments).

- **Leased hull (start).** The existing death penalty *is* the lease: the 25%
  bounty writedown is itemized as the lessor's claim. Leasing punishes
  success — 25% of a bigger bounty is a bigger number — which is deliberate.
- **First owned hull:** ~3,500¢ + 5% Ledger title-registration fee (itemized,
  naturally). Two effects:
  1. Death costs a **flat refit (~150¢, scales with hull class)** instead of
     the 25% writedown. Variable downside traded for fixed downside.
  2. **Mod bay** — owned hulls accept modifications (lessors forbid them):
     fit a module granting +1 defense slot OR +1 cargo slot. Ownership is the
     gateway to build depth.
- **Later:** multiple owned hulls with distinct slot layouts, swapped per
  contract at the hangar (6,000–12,000¢ range).
- **Endgame hook (not v1, write nothing yet):** lease spare hulls out —
  diegetic passive income; the player becomes the entrepreneur from the
  story premise. Late-story material.

## 7. Family tier (gray-market track; build after Phase 4)

**Eligibility unlocks at lifetime-credit thresholds, but the player must
sign the upgrade** — the Chapter 1 story beat ("you chose this, then the
bill arrived") as a mechanic. This also de-duplicates family tier from pilot
rank: rank is automatic, family tier is a signed liability.

Each tier adds a **per-mission remittance** (a red line on every receipt:
"Habitation remittance — Tier 3: −40¢") and a **gray-market perk** — family
members get jobs as their tier rises, and family helps you around the
Ledger's rake. Fleet Shares pays a percentage; family bends prices. No
overlap.

| Tier | Eligible at (lifetime ¢) | Remittance /mission | Perk |
|---|---|---|---|
| 1 | — | 0 | Free-tier life. Flavor only. |
| 2 | 1,000 | 15¢ | Cousin in the salvage yard — sell rate 40% → 45% |
| 3 | 5,000 | 40¢ | Sister in fleet comms — next demand bulletin visible one cycle early |
| 4 | 15,000 | 100¢ | Family workshop — one "family lot" per market refresh at honest value (no Ledger markup) |
| 5 | 40,000 | 250¢ | Sell rate 50%; family lots may include relics |

Tier 3 is the keystone perk: early bulletin knowledge makes "hold inventory
and time the market" a real strategy delivered by a *person*, not a menu.

The conditional clause (tier slips if you stop performing) stays
narrative-only fine print for now; the remittance applies pressure without
punishment. Downgrade mechanics are a future story decision.

Note on §8: the remittance is an opt-in recurring liability the player
signed, not a mission entry fee — the "no entry/lease fees" cut stands.

---

## 8. Tuning targets (first pass, expect iteration)

- A full clear of an early mission: ~300–600¢ bounty + 1–2 pods.
- A short-loop farm (launch → transport wave → RTB): ~28–40% of a full clear's
  value in ~25% of the time. Efficient, but RNG-dependent — full clears get
  the guaranteed boss pod and recovery bonus.
- Death should sting (lost cargo) but never erase a session: bounty keeps 75%.
- A new player should afford their first Certified item within ~3 missions and
  first investment tier within ~5.

## 9. Deferred design sketches (designed, not scheduled)

### Surface layer targets (Raptor air/ground split)
Rides on the layered parallax decal system (ASSET_GENERATION.md): the
"ground" is a decal layer, and surface targets are decals with HP. Rules of
the sketch:
- **Surface targets are loot, not threats** — depots, cargo crawlers, comm
  arrays. Mostly defenseless or lightly turreted; they exist so the screen
  always offers value, not danger. They feed the salvage economy (surface
  pods) rather than the bounty counter.
- **Weapon split as a loadout dimension:** some weapons/affixes are
  surface-rated; primaries are air-only by default. Contracts flag surface
  salvage rights ("surface-rated munitions recommended"), feeding the
  loadout-vs-contract decision like the armor telegraphs do.
- Gate: requires Phase 3 decal layers + a Codex phase of its own. Do not
  implement piecemeal.

### Flight school → certification contracts
Onboarding must never chain missions without a hangar/debrief visit — the
extraction loop is the real tutorial (first RTB with cargo teaches the
game). Recommendation: first launch lands in a soft Level 1; flight-school
levels become optional one-time "certification contracts" on the mission
board with small payouts. Adam undecided; decision pending playtest.

## 10. Explicitly cut

- Modular weapon **crafting** UI (components → affixes on dropped items).
- Specialization trees (slot scarcity + affixes already force builds).
- Second currencies, crafting materials, durability/repair systems.
- Any run-reset or prestige mechanic.
- Mission entry/lease fees (revisit later as an optional "lease tier" only if
  the economy feels too generous).
