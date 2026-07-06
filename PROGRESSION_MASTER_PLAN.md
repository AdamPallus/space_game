# Progression Master Plan — Make Player Choices Matter Again

Authored 2026-07-06 (Claude Fable, architect/creative director). Implementer: Codex.
Final playtest authority: Adam. This plan supersedes the mission-authoring portions
of `ROADMAP.md`; the Story-Economy Arc phases (Family Tier, Planet Raids, The Fork)
remain queued behind it.

**Division of labor.** This document contains no level JSON and no code. It defines
the systems changes, the difficulty doctrine, the measurable acceptance gates, and
per-mission creative briefs. Codex authors everything from scratch against the
balance harness (Part 2) and iterates until the gates pass — bounded iteration,
not endless: if a gate isn't met after 3 authoring iterations on a mission, stop
and write up the conflict for Adam instead of grinding. Adam flies the checkpoint
missions before anything ships.

## 0. North star

The loop we are building: play missions repeatedly → collect drops → experiment
with ship configurations → when close-but-not-quite, spend credits on consumable
crutches → break through to the next mission, which is noticeably harder. The game
is fun until killing everything becomes trivial; the fix is that each act's
enemies stay ahead of the player's gear until luck and good item rolls close the
gap.

The anchor doctrine, in one line each:

- **Act 1** is beatable with one or two good **Prototype** (purple) weapons.
- **Act 2** is comfortably beatable with a full **Pre-Founding** (relic/gold) loadout —
  and hard without one.
- **Act 3** out-scales a full relic loadout; it requires **Heirloom** drops plus good
  *rolls* and synergies. The chase is roll quality, not tier rarity.
- At every tier, weapon **role** matters: rapid/spread weapons must never kill
  armored enemies faster than same-tier armor-breakers, and armor-breakers must be
  clearly worse at clearing swarms. Wrong-weapon builds get overwhelmed (enemy
  stack grows); right-weapon builds hold the line.

## 1. Prerequisite fixes (Phase A, before anything else)

**1a. Flee vs. breach contract.** Today any enemy that exits below the arena alive
damages mothership integrity in `defense.integrity` missions — including enemies
whose AI *chooses* to leave (Tithe thieves retreating with salvage, scatter
behaviors, despawns). That makes defense missions unwinnable. The contract:

- Breach damage applies **only** to enemy types listed in the mission's
  `defense.breachDamage` map, and only when they exit via their normal advance
  path (downward past the exit line).
- Enemies in a retreat/flee/scatter/seized-salvage state exit **sideways or
  upward** and never trigger breach.
- New validation in `validate_levels.js`: in a defense mission, every enemy type
  must either appear in `breachDamage` or be guaranteed a non-breach exit path.
- The throughput solver (2c) computes a breach upper bound: with a reference
  build's DPS applied optimally, unavoidable breach damage must be ≤ 40% of
  integrity. If perfect play can't win, the mission fails validation.

**1b. Hide Acts 2 and 3.** Single choke point: the render loop over
`availableLevels` (`main.js:7434`) plus the Deep Claims divider check. Add an
act-visibility constant (`{act2:false, act3:false}`, both ids `/^act[23]_/`
prefixed) with a `?devActs=1` dev override so authoring/testing continues. Act 2
becomes visible when Phase D ships its gates; Act 3 when Phase E does. Locked
*cards* should not appear at all while hidden — filter, don't lock.

## 2. The balance harness (Phase A — Codex's primary deliverable before content)

The existing loop is real and stays canon: run
`?level=<id>&devSkip=1&devInvincible=1&devAutoFire=1&devPressure=1`, probe the
mission, read `window.__pressureReport()` (incoming DPS, worst-10s damage, quiet
windows, near-bullet density, reference-build death simulation). Improve it in
four steps:

**2a. Auto-probe mode.** `?devProbe=1` auto-launches the requested mission,
enables invincible + auto-fire + pressure telemetry, runs a scripted probe
(default: static center-bottom hover; optional `probeMove=weave` for a slow
horizontal weave), and on mission end dumps the full pressure report as JSON to
the console and `window.__probeResult`. Add `?devTimeScale=N` (fixed-step update
loop, N sim-steps per rendered frame, cap 10) so a 5-minute mission measures in
~30 seconds.

**2b. Reference builds as data.** Replace the hard-coded build inside
`pressureSimulateReferenceBuild` (`main.js:3762`) with named builds loaded from a
new `config/balance_reference.json`. Each build defines the defensive block
(shieldMax, regenRate, regenDelay, armor, armorClass, hull) **and** an offensive
block (per-shot damage, shots/sec, pattern multiplier, ammo identity) so the same
build feeds both the survival sim and the throughput solver. Initial set:

| build id | intent |
|---|---|
| `act1_entry` | the requisition kit (Part 3): scrap Cadet, one shield, no mini |
| `act1_mid_certified` | certified weapon + one defense module (≈ the current hard-coded probe build) |
| `act1_finale_prototype` | two good prototype weapons (median rolls), full act-1 unlocks |
| `act2_relic_full` | best Pre-Founding loadout, median rolls, dual fire tier 4 |
| `act3_heirloom_mixed` | relic base + 2–3 heirlooms with good (p75) rolls |
| `wrongtool_rapid` / `wrongtool_breaker` | same tier as the act under test, wrong role — used for the overwhelm checks |

Each act-tier build additionally comes in two **defensive archetypes**, because
defense is a playstyle axis the current probe can't see: `_shieldonly` (max
shield/regen, zero armor, no armor drag → highest DPS; survives 1–3 big hits
then must find a regen window, and regen is denied by *any* hit, however small)
and `_armored` (armor class near the cap, armor drag → lower DPS; chip fire is
erased outright and the player triages big hits instead of dodging everything).
The survival sim replays the same recorded hit timeline through every archetype
— invincible-probe data plus math, no extra flying. The player armor-class cap
(currently 30) and the armor firing-rate drag are first-class levers in
`config/balance_reference.json`, and the sim can model N armor-pack uses as
added armor budget so the consumable crutch (Part 5c) is part of the same
calculation.

The same file holds canonical **enemy profiles** per act (`act1_swarm`,
`act1_armored`, `act2_chorus_swarm`, `act2_tithe_plated`, `act3_armored`, …) with
HP/armor/armorClass, so invariants are computed against stable stat blocks, and
the **pressure floor + invariant threshold numbers** from Parts 2d and 6 so gates
are config, not lore. The pressure report evaluates the hit timeline against
*all* builds and reports `diesAt` for each.

**2c. Throughput solver.** New node script (or `balance_report.js` section):
consume a level JSON + a named reference build, replay the authored `events`
timeline, and compare spawned HP-mass per second (armor-class subtraction and
chip floor included, per the enemy damage math) against the build's kill
capacity. Output per mission: peak concurrent enemies, periods where the stack
grows, clear margin (kill throughput ÷ spawn throughput), and the breach upper
bound for defense missions. The probe report gains matching defense-side
metrics computed from the hit/sample timeline: **chip-erasure fraction** (share
of incoming hits at or below a given armor class — what an armored build
ignores for free), **regen-denial uptime** (share of mission time within
`regenDelay` of any hit — what a shield-only build suffers), and a big-hit
histogram. Together these say *which defensive archetype a mission is aimed
at*, which is authored intent (Rule 9), not an accident to discover in
playtest. This is pure math on data we have — it runs in
milliseconds and is the tool that catches "armored enemies pile up and the swarm
eats you," which the survival probe alone cannot see.

**2d. One-command runner.** `node scripts/pressure_probe.js <levelId>
[--build <name>]` — launches headless Chromium (playwright or puppeteer,
whichever installs clean in this repo), opens the auto-probe URL at max
timescale, waits for `window.__probeResult`, prints the JSON. Codex's inner loop
becomes: edit level JSON → run solver (ms) → run probe (~30s) → check gates. Adam
only flies candidates that already pass.

**Phase A gate:** the harness reproduces the known baselines within tolerance —
The Gauntlet (level7) ≈ 200 avg incoming DPS with ~0 quiet windows, Act 2's
current Processional ≈ 15 — and the full validation stack passes.

## 3. Act 1 unlock ladder (Phase B)

The governing distinction, straight from the fiction: **items are found or
bought; capabilities are trusted to you.** The Ledger will sell you anything —
it will not let an unproven pilot fly a twin-bay chassis. Capability unlocks are
therefore mission-clear rewards only, delivered in debrief as Ledger trust
notices ("Refit authorization: second defense hardpoint — your service record
supports the liability"), and *nothing* item-shaped is ever unlock-gated. If a
slot is open, the player may put any owned item in it, from any source, at any
time. New save block:

```
state.shipUnlocks = {
  defenseSlots: 1,          // 1 → 2
  miniSlot: false,
  secondPrimaryBay: false,  // swap mode
  dualFireTier: 0,          // 0–4, mission-granted (see below)
}
```

The cadence — four capability beats across the act, each one a refit
authorization on the player's chassis line:

| clear | capability | why here |
|---|---|---|
| start | 1 primary bay, 1 defense slot, 1 aux, no mini, no second bay | a drone you outfit yourself |
| M3 | second defense slot | first survivability wall |
| M5 | mini weapon slot | mid-act toy; minis flow from drops and the market, not a grant |
| M8 | second primary bay (Swap mode) | the act's big system beat before the final stretch |
| M11 (Last Light) | **Dual Fire tier 1** + guaranteed Pre-Founding relic in the boss crate | the finale reward is the fantasy: both guns firing |

Dual Fire tiers 2–4 (damage mults 0.7 / 0.85 / 1.0) also become mission-granted,
giving Act 2's structure system rewards: first fork boss cleared (Doxology *or*
Foreclosure) → tier 2, Old Growth → tier 3, Pilgrimage → tier 4. The
`investments.capabilities` dual-fire credit ladder is removed; migration refunds
credits already spent on it (precedent: the `auxPower` retirement refund).
Engineering and hull investments stay credit-purchased — money keeps buying
comfort; missions grant capability.

**Requisition-grade starter kit.** The current starter items are good enough
that early drops are just scrap-for-cash; that kills the loot loop in the act
that teaches it. Fresh saves get exactly one of each, explicitly scrap-tier with
fixed low-median rolls and zero affixes: the Cadet Kinetic Frame, one basic
shield module, one basic cloak. The three-frame starter stage system
(`starterUnlockStage`) retires — the Area Control and Armor Break identities
live in the drop and market pools like every other weapon, and there are no
guaranteed early drops: the player's second weapon is whatever the field gives
them, which is the point. First consequences to verify: the first certified
drop should beat the kit, and the `act1_entry` reference build (Part 2b) is
this kit, so M1–M2 must stay clearable with it.

**Migration:** existing saves are grandfathered — every unlock whose gating
mission is already completed (or whose old gate was already purchased/used) is
granted, and existing owned items are untouched. Adam's save must load with
nothing taken away. (The old EMP/bulwark credit gates are already gone from the
live game; no unlock replaces them — aux items are simply found or bought.)

**UI:** locked bays/slots render with a lock and "Authorization pending —
Mission N" copy in the Armory; the mission board card for the next unlock
mission may tease it.

**Phase B gate:** scripted fresh-save walkthrough confirms each capability fires
at its mission and that M1–M3 are clearable with the requisition kit; migration
check on a copy of a maxed save shows no regression; validators pass; **Adam
plays M1–M5 on a fresh save** and confirms the drip feels good before Phase C
starts.

## 4. Loot: roll distribution, drop tables, duplicates (Phase C)

**4a. Skewed roll curve.** Replace the uniform draws in `rollAffixInstance`
(`main.js:2656`) and the aux potency roll (`main.js:2744`) with one shared
`drawRollQuality({ floor = 0 })`:

```
q = floor + (1 - floor) * Math.pow(Math.random(), 1.7)
```

Mode at the low end, mean ≈ 0.37, thin high tail — most drops are mediocre, god
rolls are rare, and duplicates stay interesting because the next copy of the same
relic can out-roll yours. (Chosen over a symmetric gaussian: mid-heavy rolls make
duplicates boring; chosen over a hard right-half-gaussian only in that the
exponent is tunable — 1.7 is the starting point, tune via the balance report's
roll-spread section.)

**4b. Floors on guaranteed drops.** Milestone rewards must feel like milestones:
the Last Light boss-crate relic rolls with `floor = 0.4`; first-clear boss drops
in Acts 2–3 use `floor = 0.35`; all random drops use `floor = 0` on the full
curve. (The Act 3 heirloom first-clear guarantee at `main.js:2978` already
exists; it gains the floor.)

**4c. Drop tables per act.** Extend `economy.json` `dropTables` with act-aware
boss/miniboss sources (starting points; Codex tunes against the I5 economy gate):

- Act 1 bosses: current table, except Last Light: guaranteed `preFounding`.
- Act 2 bosses: `preFounding` ≈ 0.5–0.6 chance, rest prototype. Act 2 named
  minibosses: certified floor with a small (~0.08) relic chance.
- Act 3: heirloom system as shipped (guaranteed first clear, 0.16/0.12 repeats);
  repeat chances may rise slightly if the I2 gate shows the heirloom chase stalls.

Target: a player entering Act 2 sees their first relic within ~3–5 boss kills.
No duplicate protection anywhere — the roll axis is the dedupe.

**4d. Provenance.** Roll quality gets a fiction. The Ledger authenticates
everything, so an item's `rollQuality` band renders as an archival provenance
line on cards and tooltips: **Disputed** (bottom band) → **Attested** →
**Certified True Copy** → **Notarized** → **Sealed Original** (top ~5%). One
string table, zero mechanics — but "I finally pulled a Sealed Original Dead
Name" is a sentence players say out loud, and it makes the roll axis (the
actual endgame chase) speak the game's language instead of hiding in a bar
graph.

## 5. Items: creative work order (Phase C)

**5a. Named aux items** (the Orphan Signal pattern: a named relic/heirloom with a
built-in signature effect, with the normal roll layer on top). Orphan Signal
(EMP relic, built-in +50% impulse) and its heirloom stay as-is; the generic
`impulse_budget_plus` affix (`item_pool.json:86`) is restricted to `primary`
slots so the *named* item keeps its signature instead of any aux lottery ticket
matching it. The missing counterparts, to be authored:

- **Grace Period** — Pre-Founding bulwark. Longer hold (duration roll scale up),
  much longer dedicated cooldown (bulwark finally gets its own cooldown knob in
  `AUX_POTENCY_CONFIG` — base noticeably above the generic aux cooldown, for all
  bulwarks), signature: when it expires, repairs armor equal to 25–45% (rolled)
  of the damage it absorbed. Lore register: the Ledger grants you time it will
  later bill you for.
- **Held Note** — Heirloom bulwark (Chorus family). Grace Period's repair plus a
  signature on-expire radial pulse dealing a rolled fraction of absorbed damage.
  The wall that sings back.
- **Dead Name** — Pre-Founding cloak. Signature: +45–90% (rolled) weapon damage
  while cloaked and for one second after breaking. You were struck from the
  registry; the registry can't see what killed it.
- **Rest Between Verses** — Heirloom cloak (Chorus family). Dead Name's bonus,
  plus firing no longer breaks the cloak — each shot instead burns ~0.35s of
  remaining cloak duration.
- Base-type fixes at all rarities: bulwark's dedicated (longer) cooldown, and a
  small cloak offense payoff at high `auxRoll` even on non-named cloaks (the
  roadmap's Phase 6b idea), so the base types stop being strictly worse EMPs.

**5b. Mini weapons become trinket carriers.** Keep one slot, keep the three
targeting arcs (turret stays the boss-cheese identity), keep the effect roll
(homing/pierce/explosive/vampiric). Changes: flatten `MINI_RARITY_TUNING` damage
multipliers (≈ scrap 1.0 / cert 1.25 / proto 1.5 / relic 1.7 / heirloom 1.9 —
down from 2.62 at the top) and give minis the standard affix-roll treatment
(affix count by rarity, like every other slot), extending the affix pool with
mini-legal *ship-wide* affixes: shield trickle, +armor class, aux cooldown
reduction, salvage value, and similar. A high-tier mini is worth equipping for
what it does to the ship, not for its bullets — an extra slot machine for
synergies, which is exactly the Raptor fantasy of bolting cool junk on.

**5c. Consumables** (`economy.json`; the in-combat use path already exists).
Unlock the new ones when Act 2 opens — mission-gated, not investment-gated:

- **Armor Recharge Pack** — restores ~45% armor, 2 uses/mission, cost ≈ 300. The
  designated crutch.
- Split Overcharge into two role surges: **Rate Surge** (+~55% shots/sec for 6s,
  anti-swarm) and **Slug Surge** (+~70% damage per shot for 6s, anti-armor),
  ≈ 260–320 each. Overcharge itself retires or becomes the tier-1 generic.
- Pricing doctrine (economy gate I5): the expected crutch loadout for a wall
  mission (2 armor packs + 1 surge) costs **more** than that mission's median
  payout — checked in the Credit Flow report. Spending your way through a wall is
  net-negative on credits; the payoff is the drop you might get on the other
  side.

## 6. Difficulty doctrine and machine-checkable gates

The Act 3 combat doctrine rules 1–6 (`ACT3_PROBATE_DESIGN.md`: threat
simultaneity, no free recharge, collision is intent, survival converts to
threat, boss danger is output not HP, playtested or it doesn't ship) remain
canon for **all** new content. Two additions:

- **Rule 7 — composition identity.** Every Act 2/3 mission declares itself
  swarm-lean, armor-lean, or hybrid in its brief, and its enemy table honors it.
  Not every mission is a hybrid; a pure swarm mission and a pure plated gunline
  mission are both legitimate. The swarm/armored *variants* stay an Act 1-only
  device.
- **Rule 8 — the flee exemption** (Part 1a): retreating enemies never breach.
- **Rule 9 — defense is a role too.** The lineages check the player's defensive
  identity the way they check weapons, and the mapping falls out of the damage
  math: **Chorus** chip volume denies shield regen but is erased by armor class
  → armor-favored; **Tithe** heavy slugs punch past flat AC subtraction but
  come sparsely enough to hide and recharge → shield-favored; **Verdant**
  collision pressure bypasses shields *and* ignores armor class → mobility,
  EMP, and bulwark-favored. Author this crosswise with the offense checks
  (Chorus: swarm offense-check but armor defense-favor) so no single ship
  answers a whole branch — finding the crossed answer is the build game. Each
  mission's brief may declare a defensive lean; each act must contain missions
  favoring each archetype so neither shields-only nor armor is dominant across
  an act.
- **Rule 10 — bombers carry the breach.** In defense-stake missions, breach
  pressure is concentrated in designated bomber-class enemies ("claimants"):
  slow armored caskets, fast weaving couriers. Chaff drones breach negligibly
  or not at all — letting a stray fighter slip past is forgiven; letting a
  casket through is not. Bombers are priority-target gameplay, and on missions
  that mix armored caskets with courier swarms they're the forcing function for
  mixed loadouts and Dual Fire. Not every mission does this; when one does, the
  `breachDamage` map says so explicitly.

Invariants, evaluated by the harness against `config/balance_reference.json`
(median rolls unless stated; thresholds live in the config, these are the
starting values):

- **I1 (role check):** per rarity tier, the best rapid/spread weapon's TTK
  against that act's armored profile ≥ **1.6×** the same-tier armor-breaker's
  TTK; and the armor-breaker's time-to-clear on the act's swarm wave ≥ **1.5×**
  the rapid/spread weapon's. Both directions, in `balance_report.js`. For Act 3
  this drives the armored profile itself: armorClass high enough that same-tier
  rapid per-shot damage falls to the chip floor.
- **I2 (act gates):** `act1_finale_prototype` clears Last Light with margin;
  `act1_entry` does not survive it. `act2_relic_full` clears Pilgrimage with ≥
  50% hull and positive clear margin throughout; `act2_relic_full` shows
  **negative** clear margin on Act 3's armored waves (P3+), while
  `act3_heirloom_mixed` clears P7 with margin.
- **I3 (pressure floors, probe values in movement sections):** Act 1 late stays
  where it is (~180–220 avg incoming DPS). Act 2 ramps **150 → 280** across the
  graph (fork bosses ≥ 220, Pilgrimage ≥ 280), worst-10s ≥ 3000, avg
  near-bullets ≥ 8, collision damage > 0, no unauthored quiet window over 3s.
  Act 3 ramps **250 → 400** (P1–P3 re-anchored to ≥ 250; the current shipped
  ~118/94/237 are too low).
- **I4 (winnable defense):** solver breach upper bound ≤ 40% of integrity for
  the act-appropriate reference build.
- **I5 (economy):** crutch loadout net-negative per Part 5c; first relic within
  ~3–5 Act 2 boss kills in the drop simulation; Credit Flow milestones stay
  within `reportTargets`.
- **D1 (defensive viability):** every mission is survivable by at least one
  defensive archetype of the act-appropriate tier (survival sim on the probe
  timeline), and within each act both archetypes are the favored answer
  somewhere (per the Rule 9 metrics). The AC cap and armor drag stay levers:
  if armor over-solves an act, tune the mission's big-hit share, not the whole
  DPS curve.
- **I6 (no Act 1 regression):** Act 1 mission content untouched except unlock
  wiring; existing probe baselines within 15%; M1–M3 clearable by the
  requisition-kit `act1_entry` build.

**Wrong-tool feel:** `wrongtool_*` builds should show stack growth (overwhelm)
on role-check missions — that's the punishment that makes swapping and loadout
choice matter — while the right-tool build at the *same* rarity holds the line.

## 7. Act 2 re-authored — The Silent Lineages (Phase D)

Structure, fiction, art, enemy catalog, and the mission graph survive; **every
encounter is authored fresh** from these briefs — current `act2_*.json` files
are reference material for ids/backgrounds/bosses only, not for wave content.
The organizing idea: **each lineage is a weapon check.** Chorus fights are swarm
checks (bring spread/rapid), Tithe fights are armor checks (bring breakers),
Verdant fights are escalation hybrids that punish undercleaning. The existing
fork (sanctioned = Chorus branch, off-book = Tithe branch) therefore becomes a
real choice: *which check do you face first?* — and the loadout, not a mission
variant, is the escape valve.

Pressure tiers below refer to I3's Act 2 ramp. Briefs:

1. **Dead Air** (entry; hybrid; floor ~150). The relay graveyard where Act 1's
   victory should have echoed — instead, three signals answer. Teaches that
   Act 2 shoots back: chip suppression + slow heavies + one rammer type from
   minute one. Light presence of all three lineages as a menu of what's coming.
   Boss: none; miniboss send-off from whichever branch the player leans toward.
2. **Processional** (Chorus; swarm; ~170). Linked formations advance in liturgical
   columns; conductors buff the line until killed, survivors scatter *toward*
   the player (rule 8: scatter exits sideways, never breaches — but scattered
   chaff that stays becomes collision threat). Pure swarm — a breaker-only
   loadout should visibly drown here.
3. **Antiphon** (Chorus; swarm; ~190). The mimic sings your movement back: delayed
   copies of the player's path seeded with mines. Dense chip fire, zero heavies.
   Miniboss: the Antiphon itself, a swarm-node that must be spread-cleared.
4. **Doxology** (Chorus branch boss; swarm; ≥ 220). The full choir. Boss cycles
   massed radial patterns with trash never stopping (rule 5). Reward: Dual Fire
   tier 2 (if first fork boss), high relic chance.
5. **Repossession** (Tithe; armor; ~170). Plated bailiffs seize loose salvage and
   leave with it — the punishment is economic, not breach. Gunline holds until
   killed. Rapid-only builds watch their loot walk away.
6. **Arrears** (Tithe; armor; ~190). Assessors attach credit-drain liens while
   plated escorts wall them off; heavy warning shots and space denial. The check:
   burst down high-AC priority targets behind cover fire.
7. **Foreclosure** (Tithe branch boss; armor; ≥ 220). The Collections Barge:
   tractor seizure phases, armored hull sections, boarding rammers. Reward: Dual
   Fire tier 2 (if first fork boss), high relic chance.
8. **Green Signal** (Verdant; hybrid; ~210). First contact past the Deep Registry
   gate: sporeling trickle that never stops, stranglers that pursue and shoot.
   Undercleaning compounds — the solver must show stack growth for slow clears.
9. **Bloom** (Verdant; hybrid, swarm-leaning; ~240). Broodmothers pump children;
   killing mothers fast is the armor-ish check (they're plated), ignoring
   children is death by a thousand collisions.
10. **Old Growth** (Verdant; hybrid, armor-leaning; ~260). Seedcarriers split on
    death; ancient plated trunks anchor the field. Reward: Dual Fire tier 3.
11. **Pilgrimage** (finale at the Origin Hull; full hybrid; ≥ 280). All three
    lineages converge in phases — swarm movement, plated movement, spawner
    movement — then the Origin boss with rotating pattern phases and trash that
    never stops. Rewards: Dual Fire tier 4, near-guaranteed relic, and the
    black-box evidence beat the Phase 10 story spends.

**Phase D gates:** per-mission I3 floors + I1/I2/I4 invariants via harness;
**Adam flies Dead Air, one fork boss, and Pilgrimage** before Act 2 unhides.

## 8. Act 3 re-anchored — Probate (Phase E)

Same fiction ("They Followed You Home"), same breach stake, same heirloom reward
identity — re-authored to the raised floors (I3: 250 → 400), the Act 3 armored
doctrine (I1: armorClass beats same-tier rapid per-shot; more HP mass per wave),
the fixed flee/breach contract, and Rule 10: breach pressure lives in named
bomber classes, not in every stray drone. The claimant wing per lineage —
Verdant **seedcaskets** (slow, plated, splitting), Chorus **processional
carriers** (shielded columns that dive in formation), Tithe **writ couriers**
(fast, weaving, low HP) — so "which bombers are coming" is also "which weapons
to bring." P1–P3 are re-authored, not patched. Briefs:

1. **P1 — Death Notice** (Verdant vanguard; hybrid; ≥ 250). Keep the shipped
   concept — burster rammers from second two, rooted bloomcallers, sporeling
   trickle, Seedcrown miniboss — at the new floor and armored spore-pods.
2. **P2 — Next of Kin** (Chorus; swarm; ≥ 270). The choir arrives at your home.
   Densest bullet field in the game to date; conductors buff *breach-diving*
   columns, so clearing conductors is also defense.
3. **P3 — Death Duties** (Tithe; armor; ≥ 290). The estate audit: plated
   collection columns advance on the mothership; liens attach to *integrity*
   drain until killed. The purest armor check in the game.
4. **P4 — Reading of the Will** (first convergence; hybrid; ≥ 310). Two lineages
   on screen at once (Chorus screens + Tithe gunline). The mission that makes
   Swap/Dual Fire mandatory rather than optimal.
5. **P5 — Codicil** (counter-adaptation; armor-leaning hybrid; ≥ 330). The
   lineages amend the plan: elite variants with EMP immunity windows, plated
   rammers, mimic screens. Anti-cheese mission — turret-camping and
   EMP-spam both get answered.
6. **P6 — Escheat** (siege; defense-max; ≥ 350). The state claims the estate:
   maximum breach pressure, waves that mostly want the mothership, not you.
   Rule 10 at full volume — mixed claimant wings (armored seedcaskets behind
   courier screens) while fighter chaff harasses but barely breaches. Triage as
   gameplay: you cannot kill everything, and the mission is authored so you
   don't have to. I4 matters most here — winnable, barely, with the right
   build.
7. **P7 — Probate** (finale; full hybrid; ≥ 380–400). **The Executor** — the
   inheritance judgment itself, a boss that cycles all three lineages' pattern
   grammars phase by phase while every lineage's trash keeps spawning.
   Guaranteed high-floor Heirloom; clearing it settles the estate: the mothership
   is yours, and Act 4/story can spend that.

**Phase E gates:** per-mission floors + invariants; `act2_relic_full` must show
negative clear margin from P3 on; `act3_heirloom_mixed` clears P7; **Adam flies
P1, P4, and P7.**

## 9. Underwriting (Phase F — creative addition)

Retiring the swarm/armored variants after Act 1 removes the game's only
player-facing difficulty valve. Its replacement should come from the fiction,
and the fiction is insurance. Every sortie launches under one of three coverage
terms, chosen on the mission board and written in contract language:

- **Underwritten.** Premium at launch (~15% of the mission's median payout).
  If you die or abort, recovered cargo and item drops are honored anyway — the
  claim pays out. The catch is the clause: the Ledger reserves **right of first
  refusal**, and any Pre-Founding-or-better drop has a ~25% chance to be
  compulsorily purchased at book value. Book value systematically underpays
  god rolls (sale value scales with `rollQuality` by design), so safety costs
  you exactly the thing you're hunting. Perfectly fair. Infuriating. In
  character.
- **Standard.** Extraction rules as shipped.
- **Off-Book.** The Ledger disavows the sortie: no completion credits, and a
  disavowal fee on failure. In exchange, untaxed salvage: drop chance +30% and
  the roll floor lifts by ~0.08. Death still loses everything. Off-book
  completions already exist as tracked branch standing — which means by the
  time the Phase 10 fork asks the player whose side they're on, they've been
  *practicing* the answer one sortie at a time, and the game has the receipts.

This is the "spend money when you're close" loop generalized: underwrite while
grinding for the breakthrough drop, fly standard by default, go off-book when
strong and greedy. Implementation is mission-launch UI + `economy.json`
multipliers + debrief lines — no combat code. Gate: Credit Flow shows Standard
remains the best progression EV (underwriting is comfort, off-book is greed;
neither dominates), and drop-sim confirms off-book doesn't collapse
missions-to-first-relic below the I5 target.

## 10. Work order summary

| phase | contents | gate |
|---|---|---|
| **A** | flee/breach contract, act hiding, auto-probe + timescale, reference-build config, throughput solver, probe runner script | baselines reproduced (Gauntlet ≈ 200, old Processional ≈ 15); validators pass |
| **B** | capability ladder, requisition starter kit, dual-fire migration + refund, unlock UI | fresh-save walkthrough + migration check; **Adam plays M1–M5** |
| **C** | roll curve + floors, act drop tables, provenance labels, named aux items, mini trinket rework, consumables + pricing | I1 + I5 in balance_report; Adam eyeballs a drop session |
| **D** | Act 2's 11 missions from Part 7 briefs | per-mission I2/I3/I4/D1; **Adam flies 3 checkpoints**; Act 2 unhides |
| **E** | Act 3's 7 missions from Part 8 briefs (claimant wings per Rule 10) | per-mission gates; **Adam flies P1/P4/P7**; Act 3 unhides |
| **F** | underwriting terms (Part 9): board UI, economy multipliers, debrief lines | Credit Flow EV check; **Adam approves the contract copy** |

Phases are separate Codex runs. Each ships with `CURRENT_SYSTEMS.md` updated and
the standard validation stack green:

```bash
node --check main.js
node scripts/validate_economy_config.js
node scripts/validate_levels.js
python3 scripts/validate_generated_assets.py
node scripts/validate_weapon_frames.js
node scripts/balance_report.js
node scripts/validate_docs.js
git diff --check
```

Bounded iteration everywhere: three attempts per gate, then escalate to Adam
with the measured numbers and the conflict, not a fourth guess.
