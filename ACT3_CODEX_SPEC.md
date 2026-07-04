# Act 3 Codex Spec — Invasion Mechanics, Heirloom Tier, Art

Status: ready for Codex. Design and combat doctrine in
`ACT3_PROBATE_DESIGN.md`. The first three Act 3 missions
(`act3_death_notice`, `act3_next_of_kin`, `act3_death_duties`) are authored,
pressure-tested with `?devPressure=1`, and playable now using approximated
mechanics; this spec upgrades them and unblocks P4–P7. The boss-phase
hold-fire bug fix (separate task already filed) is a prerequisite for the P7
chimera boss and should land first.

Validation per slice: the full `STATE.md` stack plus a browser smoke test and
a `?devPressure=1` probe run — pressure numbers for the three shipped
missions must not regress by more than ~15% (`window.__pressureReport()`
after simulating with the update-loop driver; see design doc).

## 1. Engine

### 1.1 Rammer AI (`ai: "rammer"`)

Current rammers (`burster`, `zealot`, `grappler`) approximate with hunter AI.
Real behavior: descend normally until within `aiParams.lockRange` (default
320) of the player, then a 0.35s telegraph (brief hold + glow/flash tint),
then lock the player's current position and lunge at
`aiParams.lungeSpeed` (default 340) in a straight line — no further homing.
Miss and they keep going off-screen. On contact: `collisionDamage`, dies,
big pop. The telegraph-then-commit rhythm is the point: dodgeable on
reaction, lethal when ignored. Flip `burster`, `zealot`, `grappler` to it.

### 1.2 Latch AI (`ai: "latch"`) — grappler upgrade

Like rammer, but on contact it attaches instead of dying: player takes
`aiParams.latchDps` (default 14) per second and steering feels heavier
(`aiParams.dragMult` 0.8 on player acceleration) until the latcher is shaken
by taking any damage (player shots hit it while attached — render it stuck
to the hull edge) or after `aiParams.maxLatch` (5s). Only `grappler` uses
it. Cap simultaneous latches at 2.

### 1.3 Breach integrity (defense-mission stake)

New optional level field `"defense": { "integrity": 100, "breachDamage": {...} }`.
When present: enemies that exit the bottom edge alive deal their
breach damage (default: `score / 20`, override per enemy with `breachDamage`)
to a mothership-integrity bar rendered under the player HUD. Integrity 0 =
mission failed ("BREACH — the Ledger bills you for the hull damage" debrief,
death-equivalent settlement). Chaff passing is affordable; letting heavies
and rammers through is not. Wire it into the three shipped missions at
integrity 100 once implemented, and design P4–P7 around it. Validator:
optional object, positive integrity number.

### 1.4 Heirloom rarity tier

Add `heirloom` above `preFounding` in `ECONOMY.rarityOrder` and everywhere
rarity scales (item generation, value curve via `config/economy.json`,
tooltips/rarity tint — use a distinct living-gold/verdigris treatment,
roll-quality bar, balance_report coverage). Content rules:

- Drops only from Act 3 minibosses (low chance) and Act 3 bosses
  (guaranteed on first kill, then low chance).
- Three themed families to start, one per lineage: Chorus harmonic aux/shield
  pieces, Tithe mass-driver kinetic primaries, Verdant graft plasma/vampiric
  pieces. 2–3 bases each is plenty for v1; reuse existing affix pools with
  one new signature affix per family.
- Fiction hook (item lore lines): these are not preserved relics — they are
  what the lineages *became*. Better than Pre-Founding because drift kept
  engineering.
- Balance: ~15–20% over Pre-Founding ceilings, gated behind Act 3 pressure.
  `balance_report.js` gains an Heirloom row; keep the credit-flow report
  happy (Heirloom sell values must not blow up the scarcity retune).

### 1.5 Small fixes surfaced by pressure testing

- Lien AI: add `aiParams.maxAttached` (default 3) — only that many liens may
  hold attach position on the player at once; extras behave as `stalker`.
  Death Duties demonstrated unbounded lien stacking (26 concurrent) against
  a stationary target.
- The `?devPressure=1` probe (already shipped) is dev-only; leave it in.

## 2. Art (`Codex built-in imagegen, per ASSET_GENERATION.md)

### 2.1 `assets/generated/invasion_v1/`

Invasion variants and new units, matching each faction pack's style but
*battle-forward*: running lights burning, weapons deployed, motion-blur
pennants. Sprites: `burster` (a seed pod with a heat-shield scorch),
`zealot` (a censer drone stripped for speed), `grappler` (claw fully
extended, tow-cables visible), `strangler` (bio hunter with reaching
tendrils), `lictor` (precentor with a raised gonfalon), `pressgang`
(notary with a riveted tower shield). Bosses: `boss_rootcrown` (broadside,
a matriarch crowned in root mass), `boss_claimant` (broadside, a
processional warden with a mirrored double prow), `boss_executor`
(broadside, a barge refitted as a battering ram — crane arms become
siege claws).

### 2.2 Home background

`home_hull` scrolling tile: the player's own mothership seen from the picket
line — lit windows, inhabited, worth defending; the emotional inverse of
`origin_hull` (which the three shipped missions borrow as placeholder).
Swap into all `act3_*` level `background` keys when ready.

## 3. After Adam's verdict on P1–P3

P4 (Reading of the Will), P5 (Codicil), P6 (Escheat — breach-mechanic siege),
and P7 (Probate — the Heir Apparent tri-lineage phase boss) get authored by
Claude against the same pressure floors once the P1–P3 feel is confirmed,
followed by the Act 2 combat-only retune using the same telemetry.
