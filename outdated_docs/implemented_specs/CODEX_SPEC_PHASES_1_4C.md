# Implementation Spec: Extraction Loop + Scene Shell

*For: Codex. Author: Claude (Fable 5), 2026-06-11.*
*Read first: [ECONOMY_DESIGN.md](ECONOMY_DESIGN.md) (what & why), [UI_DESIGN.md](UI_DESIGN.md) (binding UI rules).*

Work in phases, **in order**. Each phase is independently playable and ends
with commit + push (Vercel playtest builds). Do not start a phase until the
previous one is merged and Adam has playtested it. Placeholder art is fine
everywhere — never block gameplay code on generated assets.

---

## Phase 1 — Salvage core (the loop proof)

**Goal:** drops → cargo → RTB/death/boss outcomes → itemized debrief.

1. **Salvage pods.** New entity: pod spawns at a dropping enemy's position,
   drifts downscreen (~40 px/s), despawns offscreen. Player collision
   collects it if cargo has room; full cargo = pod passes through (brief
   "CARGO FULL" HUD flash). Placeholder sprite: existing power-up art tinted
   per rarity (gray/blue/violet/gold glow).
2. **Drop rolls.** At enemy death, roll per the table in ECONOMY_DESIGN.md §2
   (drive off catalog class/baseCredit; put thresholds in one config object,
   not scattered literals). Pod stores a rolled item reference + rarity, but
   the HUD only reveals rarity.
3. **Cargo state.** `state.cargo` (array, max 3). HUD: 3 slot pips with
   rarity glow. Cargo persists into debrief; cleared on death.
4. **Items v1.** Extend the armory-prototype item shape with `rarity`,
   `value`, `affixes[]`. Build a drop pool from the existing frames +
   defense/aux modules; affixes can be a stub list of 4 (pierce, vampiric,
   +flow rate, +shield regen) wired to existing build fields. New file:
   `items/item_pool.json`.
5. **Outcomes.** RTB (existing recall path): keep bounty + cargo. Death:
   keep 75% bounty (itemize the 25% as "hull writedown"), lose cargo. Boss
   kill: everything + existing recovery bonus + guaranteed boss pod.
6. **Debrief itemization.** Debrief lists: bounty, recovery bonus, dividends,
   fees (red), net; then each pod "identified" (item name + rarity revealed,
   sequential reveal is fine as plain DOM for now). Collected items land in
   the armory inventory.
7. **Minimum chip-damage floor.** Armor reduction can never zero out a hit:
   every hit deals at least `max(1, baseDamage * ECONOMY.minDamageFloor)`
   (start at 0.2). This is the one permitted combat-balance change — see
   ECONOMY_DESIGN.md §2 "Armor, gear checks". Verify a wide/micro build can
   slowly kill a plated enemy and that boss kills are possible with any
   starter frame.

**Acceptance:** Launch level 1 → kill transport wave → collect 2 pods → RTB →
debrief shows itemized credits + 2 identified items → items appear in armory
inventory and are equippable. Die with cargo → cargo gone, bounty docked 25%,
fee itemized. No regression to existing missions when no drops occur.

## Phase 2 — Ledger market

**Goal:** sell/buy with spread, rotating stock, demand bulletins, mispriced lots.

1. **Sell:** any inventory item sells at 40% of `value`; receipt line shows
   list value and "Ledger handling fee" (60%) explicitly.
2. **Stock:** 5 lots drawn from a level-progress-appropriate pool; reroll
   after every mission. Persist in save state.
3. **Demand bulletins:** every 3 missions pick one tag; items with that tag
   sell at +40%. Show active bulletin in market UI and in debrief if it
   affected a sale.
4. **Mispriced lots:** on each stock roll, 1/8 chance one lot is priced at
   35–50% of value with the notation "clerical adjustment" appended to its
   lot number line. No other highlight. Buying and re-selling it for profit
   must work.
5. **Early-recall flavor:** track consecutive RTB-before-boss count; at 3+,
   debrief appends the "Pattern flagged… no action taken" Ledger line
   (flavor only, no mechanical effect, resets on a boss kill).

**Acceptance:** Sell an item and the math on the receipt is exact. Buy a
mispriced lot, sell it back at profit. Bulletin tag changes sale price and is
visible before selling.

## Phase 3 — Scene shell (UI_DESIGN.md becomes real)

**Goal:** replace the hangar tab system with the five-scene spatial shell.
**Re-read UI_DESIGN.md before this phase; its Ten Rules are acceptance
criteria.** This is a reskin/re-layout of existing logic — armory interaction
flow, investment data, mission data all stay; their containers change.

1. Fixed full-viewport stage; scene divs (hangar hub, armory, ledger
   terminal, mission board, debrief) with CSS-transition camera moves.
   Solid-color/gradient placeholder backgrounds until art lands; hotspot
   layout must not depend on final art.
2. Hangar hub with 4 hotspots replaces the tab bar. Esc / back affordance in
   every scene returns to hub.
3. Ledger terminal hosts market + investments + claims as terminal modes
   (bezel buttons, monospace inner screen).
4. Mission board: contracts replace the carousel; variants as riders.
5. Debrief: printing receipt (line-by-line timing), pod identification
   reveals, outcome stamp. Shared sfx set (hover/click/stamp/error/credit
   tick) and number count-up utility used across all scenes.
6. When Adam delivers generated backgrounds/frames (asset manifest in
   UI_DESIGN.md), swap them in behind the hotspots.

**Acceptance:** No page-level scrollbar exists at any viewport ≥ 360×640.
Every screen reachable spatially from the hub. All Phase 1–2 functionality
works inside the new shell. Mobile touch paths still work.

## Phase 4 — Item generation depth

**Goal:** real affix system + Pre-Founding relics.

1. Affix table (~12 affixes) mapping to existing build/effect fields; rarity
   determines affix count (0/1/2/2+unique). Name composition:
   `[Rarity] [Base] — [Affix trace]`.
2. Pre-Founding uniques: 4–6 handcrafted items, each with a one-line lore
   fragment shown at identification (Adam supplies lines; use placeholders
   marked `TODO(adam)` until then).
3. Aux abilities (cloak/EMP/bulwark) become items in the pool so they can
   drop, be bought, and be sold.
4. **Kinetic flow model** (ECONOMY_DESIGN.md §3): kinetic damage =
   `size × velocity^k` (k in ECONOMY config, start 1.5) under a per-gun
   impulse budget (size trades against muzzle velocity; rarity raises the
   budget). Plasma keeps its own model. Ship alongside a
   `scripts/balance_report.js` that prints a time-to-kill matrix (each frame
   and a sample of rolled items vs each catalog enemy class) so tuning is a
   report, not replays. Acceptance: TTK matrix has no infinities (chip floor
   holds) and no build kills the toughest plated enemy faster than a
   dedicated anti-armor build.

**Acceptance:** Same base item can roll different affixes; stat effects
verifiably apply in combat; relic lore line displays once and is recorded in
a collection list.

## Phase 4b — Base weapon archetypes (the variety pass)

**Why:** Phase 1 built the drop pool "from the existing frames" and Phase 4
deepened affixes — but no phase ever expanded the *base* set, so every drop
is a re-dressed flight-school frame. The parameter space
(`gunDiameter` × `spread` × `ammo` × `effect` × flow levels × impulse
budget) is fully implemented; it is sampled at exactly 3 points. This phase
samples it properly. **No new combat mechanics** — only new
`items/item_pool.json` entries, drop/stock tier gating, and icons.

### New weapon bases (9)

Builds mirror the `frame_fundamentals` entry shape. Effects must stay within
the implemented set: pierce, homing, explosive, vampiric, none.

| id | Name | Bore | Spread | Ammo | Effect | Flow R/V/S | Extra | Role |
|---|---|---|---|---|---|---|---|---|
| `needle_storm` | Needle Storm | small | wide | kinetic | none | 2/1/0 | — | Multi-shot kinetic hose. Shreds swarms; chip-floor-weak vs armor *by physics*. |
| `twin_driver` | Twin Driver | medium | focused | kinetic | none | 1/1/0 | — | Workhorse upgrade of the Cadet line. |
| `ember_spray` | Ember Spray | small | wide | plasma | none | 2/0/0 | — | Plasma hose; stacks burn on crowds. |
| `slug_cannon` | Slug Cannon | large | focused | kinetic | none | 0/0/2 | `kineticImpulseBudget: +0.15` | The physics showcase: huge slow slugs, top per-hit damage, anti-armor without pierce. |
| `plasma_lance` | Plasma Lance | large | focused | plasma | none | 0/1/1 | — | Single big plasma bolt; heavy payload per hit. |
| `seeker_array` | Seeker Array | medium | wide | plasma | homing | 1/0/0 | — | Homing plasma swarm; fire-and-maneuver. |
| `demolition_bore` | Demolition Bore | large | focused | kinetic | explosive | 0/0/1 | — | Splash slugs; armor-cracker with collateral. |
| `lash_driver` | Lash Driver | medium | wide | kinetic | vampiric | 1/0/0 | — | Spray-and-heal berserker line. |
| `longbow_rail` | Longbow Rail | large | focused | kinetic | pierce | 0/2/0 | `kineticImpulseBudget: +0.10` | Sniper evolution of the Breaker; lances whole columns. |

All entries get honest `tags` (ammo, spread, effect, role words) — **tags
feed the demand-bulletin system**, so more bases automatically makes the
market game richer.

### New defense bases (2)

| id | Name | Build focus | Role |
|---|---|---|---|
| `surge_shield` | Surge Shield | low shieldMax, shieldRegen +2 | Regen tempo play; pairs with hit-and-run. |
| `ablative_plate` | Ablative Plate | armorAmount +2, armorClass 11 | Bulk armor; heavier than Heavy Plate, no shield slot synergy. |

### Tier gating (drops AND market stock draw from the same pools)

- **Tier 1 (always):** the 3 starter frames, Phase Shield, Heavy Plate.
- **Tier 2 (mission 2+ cleared):** Needle Storm, Twin Driver, Ember Spray, Surge Shield.
- **Tier 3 (mission 4+):** Slug Cannon, Plasma Lance, Seeker Array, Ablative Plate.
- **Tier 4 (mission 6+ / guaranteed boss pods):** Demolition Bore, Lash Driver, Longbow Rail.

Gate by highest campaign mission cleared. Rarity rolls stay independent of
base tier (a scrap-grade Slug Cannon and a prototype Needle Storm are both
valid and interesting).

### Icons

Generate one `assets/generated/item_icons_v2/` 4x4 chroma-key sheet (same
shared style block as CODEX_ASSET_RUN_BASELINE_ASSETS.md): the 9 new weapons + 2 defenses +
5 spare generic housings. Distinct silhouettes per role (hose = multi-barrel
cluster, slug = massive single bore, seeker = finned pods, rail = long thin).

### Acceptance

1. `node scripts/balance_report.js` shows real role separation: Slug Cannon
   and Longbow Rail beat Needle Storm/Ember Spray against plated targets by
   ≥2.5x TTK, and the relationship inverts against swarm-class enemies. No
   infinities anywhere (chip floor holds).
2. Playing mission 4+, drops and market stock include tier-2/3 bases;
   mission 1 drops never contain tier-3+ bases.
3. Armory inspector shows visibly different fire stats per base; in combat,
   Needle Storm vs Slug Cannon *look and feel* like different weapons.
4. Demand bulletins can roll the new tags.
5. Validators pass; zero console errors.

---

## Phase 4c — Item communication (Diablo-style tooltips & stats)

Full spec in [ITEM_UX_SPEC_PHASE_4C.md](ITEM_UX_SPEC_PHASE_4C.md). Summary: one
`getItemDisplayStats` source of truth; shared hover tooltip (armory, market,
debrief) with headline-stat comparison deltas vs equipped; player-language
stat lines (no formulas — math moves behind a DEV "Show math" toggle);
rarity border/glow/name-color restored on every item surface. Can run
before, after, or parallel to Phase 4b.

## Phase 5 — Ownership & family tier (design locked, do NOT build before Adam green-lights)

Design lives in ECONOMY_DESIGN.md §6–7. Summary: leased-vs-owned hulls (25%
writedown becomes the lessor's claim; owned hull = flat refit cost + mod
bay), and family tier as a signed upgrade with per-mission remittance +
gray-market perks. No implementation work in Phases 1–4 beyond keeping the
death-penalty code path renameable/configurable.

---

## Cross-cutting constraints

- **Save migration:** existing localStorage saves must load; missing fields
  get defaults (empty cargo/inventory, stock roll on first visit).
- **Config over literals:** all economy tunables (drop rates, spread, fee %,
  bulletin cadence, cargo size) live in one `ECONOMY` config object so Adam
  can tune by editing one block.
- **Validation:** extend `scripts/validate_levels.js` (or a sibling script)
  to validate `items/item_pool.json` ids/affixes.
- **Don't touch:** combat feel (sole exception: the Phase 1 chip-damage
  floor), level JSON format, enemy catalog stats, existing investment costs.
- Commit + push after each phase (Adam playtests on Vercel).

## Open items owned by Adam (do not block; use placeholders)

- Ledger voice lines (debrief stamps, fee notices, bulletin copy, audit
  flavor) — `TODO(adam)` strings centralized in one `LEDGER_COPY` object.
- Generated backgrounds + panel art per UI_DESIGN.md manifest.
- Relic lore fragments.
- Tuning pass on the `ECONOMY` config after Phase 1 playtest.
