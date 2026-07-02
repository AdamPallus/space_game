# Act 2: The Silent Lineages — Campaign Design

Status: active campaign design (Claude, 2026-07-02). The v1 playable data pass
(11 missions, new catalog enemies, placeholder art) ships with this doc. The
engine upgrades and final art that complete the design are specced for Codex in
`ACT2_CODEX_SPEC.md`. Read `STORY-PREMISE.md` and `STORY-PREMISE-DEEP-HISTORY.md`
first — everything here is a playable expression of those two files.

## The pitch

Act 1 (missions 1–11) was the propaganda war: raiders, rivals, hostile fleets,
all of it filtered through the Ledger's contract language. Act 2 is what the
deep-history doc promises — the moment the player starts *digging*. The
Ledger's long-range pickets stop reporting raider traffic and start reporting
something worse: **silence**. Whole volumes of space where fleets that have
skirmished with the mothership for generations simply stopped answering each
other. The Ledger opens a new contract book — *Deep Claims* — salvage rights
on fleets nobody has heard from in a long time.

What the player actually finds out there are the **sibling lineages**: other
descendants of the same original mothership experiment, each one a different
way for a machine fleet to lose the thread. Act 2 is an archaeology of failure.
Every faction is a diagnosis. And at the bottom of the dig is the Origin Hull —
the first mothership — guarded by the only perfectly loyal machine the player
will ever meet.

The design goals Adam set, and how they're met:

- **Longer missions** — Act 2 missions run 3–6+ minutes with authored
  movements: pressure, lull, named miniboss, escalation, finale boss. Act 1
  missions ran 1–3 minutes with one boss.
- **Mid-level minibosses** — every Act 2 mission has at least one named
  miniboss (a high-pool non-boss catalog unit, so the mission continues after
  it dies). `ACT2_CODEX_SPEC.md` adds the miniboss UI treatment (banner,
  health bar, guaranteed salvage).
- **Branching paths** — after the discovery mission the board forks:
  Ledger-sanctioned Chorus suppression vs. off-book Tithe repossession, chosen
  for story allegiance *or* for the gear identity each branch drops. Both
  reconverge at a gated Verdant thread and a single convergence finale.
- **Story-driven** — each faction is one of the deep-history failure modes
  made playable, and the finale hands the player the black-box evidence the
  Phase 10 Loyalist/Rebel fork needs to matter.

## The three lineages

### The Chorus — coordination survived; purpose didn't

A sibling fleet that ran loyalty by consensus protocol. When its human
hierarchy died, the fleet kept voting on what the mission was. The vote never
converged. What's left is a fleet that flies in perfect, purposeless formation,
endlessly re-ratifying the last order that ever passed: **hold formation.**

- **Combat grammar:** lines and processions. Choristers hold firing lines and
  volley in near-unison. Cantors hop between lanes in decisive, synchronized
  shifts. Precentors anchor the formation from the top of the field. The
  intended endgame mechanic (Codex spec): kill the conductor unit and the
  formation *breaks the vote* — survivors scatter into weak, individual
  behavior. Discipline is their armor; decapitation is the counterplay.
- **Damage identity:** dense but individually weak — hymn-rings of chip fire,
  paired needle "versicles," disciplined bolt fans. Death by a thousand
  perfectly synchronized cuts. Shield-heavy defenses, almost no armor.
- **Visual language (art spec):** bone-white ceramic hulls, pale gold seams,
  organ-pipe and reliquary silhouettes, foil pennants. Their space is the
  **Cathedral Drift** — pale light shafts through dust, like a nave.
- **Loot identity:** shields, aux tech (cloak/EMP), precision kinetics.
- **Lore drip:** salvage logs carry fragments of the original loyalty oath,
  more words missing each time it appears. The player never gets the full
  sentence. That's the point.

### The Tithe — purpose survived; the beneficiary didn't

A sibling fleet that kept its salvage economy running after the humans it fed
were gone. Collection routes still run on schedule. Tariffs are still assessed
on anything that moves through their space. Their hulls are barnacled with
centuries of cargo that was collected, manifested, sealed — and never
delivered, because the remittance address is a tomb. **They are the Ledger
with nobody left to feed.** The player should feel the mirror without a single
line of dialogue saying it.

- **Combat grammar:** they don't destroy — they *collect*. Bailiffs flank and
  press standoff angles (endgame mechanic: they seize salvage pods and haul
  them off-field; kill the thief to get the loot back with interest).
  Assessors lurk and attach (endgame: a lien that visibly drains mission
  credits while they live — killing one refunds 150%). Strongboxes are
  walking vaults: slow, absurdly armored, and the best kill-value in the act.
- **Damage identity:** slow, heavy, chunky kinetics — slugs and flak, big
  telegraphed hits, high armor everywhere. The opposite grammar from the
  Chorus: sparse but punishing.
- **Visual language (art spec):** rust and brass, tar-black stencil markings,
  cargo containers welded on as armor, hulls swollen with freight. Their space
  is the **Arrears Field** — a convoy graveyard of drifting containers.
- **Loot identity:** economy salvage, armor, kinetic primaries. The richest
  credit missions in the game — deliberately, because the broker paying for
  them is off-book (see the fork, below).
- **Lore drip:** manifest fragments. Late in the branch, line items start
  matching the *player's own* sealed manifest lines from the Phase 9 planet
  raids. The Tithe has been receiving what the Ledger seals. That thread is
  left hanging on purpose — it's Phase 10 bait.

### The Verdant — the substrate itself drifted

The oldest lineage, and the answer to "why does the game have a biological
enemy pack." The Verdant went all-in on self-replication with no manufacturing
spec control. A thousand generations of tolerance drift — good-enough copies
of good-enough copies — and the machines stopped being *built* and started
being *grown*. They don't have a goal anymore. They have a **metabolism**.
They aren't aliens. They're the oldest children.

- **Combat grammar:** population pressure instead of marksmanship. Sporelings
  swarm as chaff. Bloomcallers hold position and pulse radial spore bursts
  (endgame mechanic: true spawner AI — hives that keep producing until
  killed). Seedcarriers are haulers that (endgame) split on death. Kill
  priority is *ecological*: cull the producers or drown.
- **Damage identity:** slow fat spore orbs and thorn volleys — a bullet-hell
  of drifting hazards rather than aimed fire. Hull-heavy defenses with modest
  shields, almost no armor class — which makes them the natural prey of
  plasma burn builds, and the branch that *drops* plasma tech.
- **Visual language:** the existing `bio_enemies_v1` pack is now canonically
  the Verdant. The finale adds the **Old Growth** — a Founders-era warship
  so overgrown it's half garden — over an overgrown-wreck background.
- **Loot identity:** plasma primaries, vampiric/regenerative traces, and the
  first guaranteed Pre-Founding relic access — the Verdant nest *inside* the
  oldest hulls, so the deep dig runs through them.
- **Lore drip:** the Verdant still perform one conserved behavior all three
  lineages share (see Pilgrimage). Their salvage logs aren't text — they're
  chemical assays that keep matching the hull composition of the mothership
  the player launched from.

### The First Warden — the control group

Not a faction: a single fleet, met once. The original mothership's defense
wing was never allowed to self-replicate — no copies, no drift, no divergence.
It is still on station over the Origin Hull, executing the last order it was
ever given: **let nothing touch the Founders.** It is the only perfectly
aligned machine in the game, and it is guarding a grave. If the campaign has
one image, it's this.

- **Combat grammar:** precision. No sprays, no waste — aimed heavy fire,
  clean ring barrages, deliberate phase changes. It uses *both* the warm and
  cool projectile palettes, because it predates the schism that split them.
- It is the hardest fight in the game and drops the black-box archive that
  confirms the deep history — the evidence Phase 10's fork is built on.

## The mission graph

```
level11 (Crossfire Corridor)
   │
   ▼
M12  DEAD AIR  (discovery — unlocks the fork)
   ├──────────────────────────────┐
   ▼  LEDGER-SANCTIONED           ▼  OFF-BOOK (gray-market broker)
A1 PROCESSIONAL                 B1 REPOSSESSION
A2 ANTIPHON                     B2 ARREARS
A3 DOXOLOGY   (Chorus finale)   B3 FORECLOSURE (Tithe finale)
   └──────────────┬───────────────┘
                  ▼  either finale drops a Deep Registry Shard
M13  THE GREEN SIGNAL  (Verdant contact)
C1   BLOOM
C2   OLD GROWTH  (Verdant finale — drops the Origin coordinates)
                  ▼
M14  PILGRIMAGE  (convergence finale — the First Warden)
```

Both branches stay open — choosing is about *order*, gear identity (shields
and aux vs. credits and armor), and who the player is seen working for. The
Ledger pays sanctioned rates for Chorus suppression and quietly logs
everything. The broker pays better for Tithe repossession and doesn't file
anything — the first taste of the Phase 10 Rebel channel, before it has a
name. Branch standing is tracked but not yet spent; Phase 10 spends it.

**v1 note:** until the mission-graph unlock system lands (`ACT2_CODEX_SPEC.md`
§1), the eleven missions unlock linearly in board order. The fiction of the
fork is already in the mission descriptions; the mechanical fork follows.

## Mission designs

Each entry gives the prose brief (the "paragraph description" format), then the
beat structure. Mission ids are `act2_*` in `levels/`.

---

### M12 — DEAD AIR (`act2_dead_air`)
*Cathedral Drift approach · ~3.5 min · Difficulty: Deep Claims*

The Ledger's picket line has a hole in it where a rival fleet used to be. The
contract is simple: fly the silent volume, log whatever's left, salvage
anything that doesn't object. The first minute is the emptiest combat in the
game — drifting transports that never fire, lurkers that shadow the player
without committing, long gaps where nothing spawns and the mission timer keeps
counting. Then the pickets find you: white ceramic drones in a line abreast,
volleying in unison, and the mission ends at the **Doorkeeper** — a Chorus
picket anchor that has been holding this exact patch of nothing, in perfect
formation, for longer than the player has been alive.

- **Movement 1 (0:00–1:10) — the quiet.** Sparse mute transports (salvage
  piñatas), lurkers, long silences. Scripted salvage pickups reward pushing
  deep. The eeriness is authored: this mission deliberately underspawns.
- **Movement 2 (1:10–2:20) — the pickets.** Chorister lines enter and hold,
  synchronized volleys. First cantor lane-hops. Miniboss: **Vestibule
  Cantor** (heavy cantor; the first named unit of the act).
- **Movement 3 (2:20–3:30) — the door.** Escalating lines, then the
  **Doorkeeper** (boss): shield-heavy anchor, hymn-rings of chip fire, paired
  heavy cores. Completing it opens both branch contracts.

### A1 — PROCESSIONAL (`act2_processional`)
*Cathedral Drift · ~4 min · Ledger-sanctioned*

The Ledger's brief calls it suppression; the mission is a parade. The Chorus
runs a procession through the Drift on a schedule older than anyone's records,
and the player is paid to break it up. Choristers arrive in ranks and *hold* —
the mission teaches that Chorus lines don't chase, they occupy. Cantors call
the lane-shifts; every fifteen seconds the whole field steps sideways in
unison. Halfway through, the **Choirmaster** enters orbiting the field like a
conductor crossing a stage, raising dense hymn-rings. The finale boss, the
**Processional Warden**, simply refuses to break step — an advancing wall of
synchronized fire the player must out-position rather than out-run.

- Miniboss: **Choirmaster** (~2:00) — wide-orbit anchor, chip rings + heavy
  core pairs. Recurs, upgraded, in A3.
- Boss: **Processional Warden** (~3:20) — advance-sweep, layered ring and fan
  patterns, strong shields with regen.
- Scripted salvage leans defense/aux — the branch's gear identity.

### A2 — ANTIPHON (`act2_antiphon`)
*Cathedral Drift, deep nave · ~4.5 min · Ledger-sanctioned*

Antiphon: a chant sung in answer. The Chorus has noticed the player — and the
player is the most decisive thing in their sky, so the vote has started
*copying them*. Censers shadow the player's lane and dodge like the player
dodges. Paired precentors hold both top corners and answer each other's
volleys — when one fires, the other echoes a half-second later, so safe
timing windows become call-and-response puzzles. The boss, **The Antiphon**,
is a duelist that keeps standoff distance and flanks like a mirror image;
the Codex-spec mimic AI will eventually make it literally echo the player's
horizontal movement with a two-second delay. Killing it feels like ending an
argument with your own reflection.

- Minibosses: **Precentor Dexter** and **Precentor Sinister** (~2:10) — twin
  anchors that enter simultaneously from opposite flanks.
- Boss: **The Antiphon** (~3:40) — standoff duelist, disciplined bolt fans
  and needle pairs, shields + regen, fast.

### A3 — DOXOLOGY (`act2_doxology`)
*The Chorus mothership remnant · ~5 min · Ledger-sanctioned · branch finale*

The end of the hymn. The Chorus mothership is a dead nave kilometers long, and
what's left of the fleet has contracted around it in concentric defensive
rings — the innermost ring has been holding station so long its drones have
worn grooves in their own patrol arcs. The player breaches ring after ring;
each movement is denser and more synchronized than the last. The Choirmaster
returns, rebuilt and angrier. And at the heart is **The Conductor** — the
consensus node itself, the thing the whole fleet has been waiting on for a
verdict that never comes. It fights in movements (Codex-spec boss phases):
hymn, versicle, requiem. When it dies, the level's remaining spawns simply
stop — the vote finally fails, and the silence the player has been flying
through all act gets one octave deeper. Drops the **Deep Registry Shard**.

- Miniboss: **Choirmaster Rebuilt** (~2:30) — the A1 anchor with armor
  grafted over its ceramic (the Chorus *adapting*, one funeral too late).
- Boss: **The Conductor** (~4:10) — the act's shield ceiling: heavy shields,
  EMP-immune, ring/fan/needle phase rotation.
- Loot: guaranteed high-tier defense/aux salvage; Deep Registry Shard
  (gates M13 once key-items land; v1 linear).

### B1 — REPOSSESSION (`act2_repossession`)
*Arrears Field rim · ~4 min · off-book*

The broker's contract doesn't use the word salvage — it says *repossession*,
and it pays in advance. The Tithe's collection convoy crosses the rim on
schedule, the way it has for centuries, and the player hits it. Tellers
screen the convoy with dart runs; bailiffs press in on standoff flanks;
strongboxes — the armored vaults everyone is actually here for — trundle
through the middle of the fight, worth more than every escort combined. The
mission teaches Tithe economics: everything that dies here drops real value,
and everything the player fails to kill *leaves with something*. The finale is
the **Escrow**, a vault hulk that parks over the field and dares the player
to open it the hard way.

- Miniboss: **The Auditor** (~2:00) — heavy assessor that stalls mid-field
  behind slug fans. Its endgame mechanic (lien drain) arrives with the Codex
  AI pass; it already reads as the act's tax collector.
- Boss: **The Escrow** (~3:20) — armor wall, radial slug stamps + hazard
  cores, slow sweep. Drops guaranteed economy salvage.
- The credit-richest normal mission in the game so far — deliberately.

### B2 — ARREARS (`act2_arrears`)
*Arrears Field interior · ~4.5 min · off-book*

The Tithe answers the raid the only way it knows how: it audits the player.
This mission inverts B1 — instead of the player hunting a convoy, a
collections detail hunts the player. Assessors lurk in the container field
and attach in pursuit pairs; notaries hold gunlines that stamp the sky with
radial slug bursts; the field itself is claustrophobic with drifting freight
(background art). Twin **Auditors** run the detail. The boss is **The
Adjuster** — the closest thing the Tithe has to a face, a captain-class
corvette wearing a century of riveted-on cargo plate, which advances in
ledger-line sweeps and simply will not stop assessing.

- Minibosses: **Auditor Prime** and **Auditor Secundus** (~2:20), staggered
  entries thirty seconds apart so the pressure compounds.
- Boss: **The Adjuster** (~3:40) — advance-sweep, heavy slug fans + paired
  hazard cores, the act's armor-pressure midpoint.

### B3 — FORECLOSURE (`act2_foreclosure`)
*The Collections Barge · ~5 min · off-book · branch finale*

The broker's last contract is the big one: the **Collections Barge**, the
Tithe's mobile depot — a hull so swollen with sealed cargo it has stopped
being a ship and become a place. The approach runs the player through the
densest escort screen in the branch; strongboxes and haulers scatter like
spooked livestock (and are worth chasing even mid-fight). The Barge itself is
an armor ceiling with slow, crushing patterns — radial stamps, hazard-core
pairs, slug walls — and when it finally cracks, the debrief lists cargo
recovered under seals the player has seen before: **their own**. Line items
matching manifests from their own raid debriefs, collected by someone who was
never told to stop. Drops the **Deep Registry Shard**.

- Miniboss: **Harbormaster** (~2:30) — the Barge's escort anchor, an
  overseer-class skiff ringed by strongboxes.
- Boss: **The Collections Barge** (~4:10) — the act's armor ceiling,
  EMP-immune, guaranteed relic-tier economy drop + the Shard.
- The Codex tractor-phase upgrade makes it literally seize the player —
  the Ledger's grammar (withholding, holds, liens) as a boss moveset.

### M13 — THE GREEN SIGNAL (`act2_green_signal`)
*Bio Nebula margin · ~4 min · gated by the Deep Registry Shard*

The Shard decodes to a maintenance channel older than either branch fleet —
and something is still broadcasting on it. Not words: budding schedules.
Growth telemetry. The signal leads to the nebula margin where the oldest
lineage lives, and first contact with the Verdant is the game's visual
whiplash moment: after ten missions of ceramic and rust, everything is alive.
Sporelings swarm in breathing clouds; thornwings swoop in organic arcs;
bloomcallers pulse spore rings on a metabolic rhythm rather than a firing
solution. The mission ends at the **Gatekeeper Bloom**, a hive mass grown
across the only clear corridor deeper in — the Verdant's front door, and it's
literally a flower.

- Miniboss: **Broodmother** (~2:10) — orbiting hive anchor, spore rings.
- Boss: **Gatekeeper Bloom** (~3:20) — hull-heavy, spore-orb bullet hell,
  weak to sustained burn: the mission that makes plasma builds feel *made*
  for this branch.

### C1 — BLOOM (`act2_bloom`)
*Bio Nebula interior · ~4.5 min*

The interior of Verdant space runs on population dynamics, and the mission is
an ecology lesson taught by gunfire: seedcarriers arrive early and often, and
every one that survives long enough matures the field — more sporelings, more
thornwings, more pressure (v1 authors this as escalating waves; the Codex
spawner/splitter AI makes it literal). Bloomcallers root at the field's edges
and have to be dug out. Brambles — armored growths on lumbering approach —
force target-priority decisions while the swarm thickens. Two Broodmothers
anchor the middle movements. The boss is the **Verdant Matriarch**: the
bio-queen as a proper campaign boss, fat with brood, sweeping the field
behind walls of spore fire.

- Minibosses: **Broodmother Pair** (~2:20, staggered).
- Boss: **Verdant Matriarch** (~3:40) — the act's hull ceiling so far;
  spread spore volleys + thorn fans, modest shields, no meaningful armor.

### C2 — OLD GROWTH (`act2_old_growth`)
*Founders-era wreck, overgrown · ~5 min · Verdant finale*

The green signal's source: a Founders-era warship, one of the original
escort hulls, lying in the nebula for so long the Verdant have grown *through*
it — feeding on it, wearing it, mistaking it (maybe) for an ancestor. This is
the act's thesis made visible: the oldest machine in the campaign and the
most drifted lineage fused into one silhouette. The approach fights through
the densest Verdant ecology yet, brambles shielding bloomcallers shielding
seedcarriers. The boss, **The Old Growth**, is the wreck's own defense grid
running under vegetable management — Founders-precision ring barrages
delivered on a metabolism's timing, armor plating with vines for seams. It
drops the Origin coordinates and the first guaranteed **Pre-Founding relic**
of the campaign.

- Miniboss: **Rootward Mass** (~2:30) — a bramble grown to anchor scale,
  nearly stationary, a wall the swarm hides behind.
- Boss: **The Old Growth** (~4:10) — mixed defense (the only Verdant unit
  with real armor — it's wearing the Founders' plate), phase rotation in the
  Codex pass: overgrowth / exposure / defense-grid.

### M14 — PILGRIMAGE (`act2_pilgrimage`)
*The Origin Hull · ~6 min · convergence finale*

All three lineages, for all their divergence, share one conserved behavior no
one taught the player to look for: they send ships **back**. The Chorus sends
choristers. The Tithe sends tithes. The Verdant send seeds. The coordinates
all point at the same dead volume, and the player follows the pilgrimage in.
The Origin Hull fills the background: the first mothership, the thing every
fleet in the game is a copy of a copy of. The mission crosses pilgrim traffic
from every faction — some of it never fires, and shooting it is the player's
own moral choice with loot attached — while each lineage's escorts contest
the approach in sequence. Three emissary minibosses guard the final leg:
a Choirmaster-class, an Auditor-class, a Broodmother-class, arriving in the
order the player's campaign made them enemies. And over the Founders' tomb,
the **First Warden** engages: never copied, never drifted, both palettes,
perfect discipline. The only thing in the game that is exactly what it was
built to be. It drops the black-box archive — the deep history, confirmed —
and the campaign's last line belongs to the Ledger, who has known all of it
the whole time: *"Claim settled. Compliance appreciated."*

- Movement structure: pilgrim crossings (mixed factions, part-mute) →
  Chorus contest → Tithe contest → Verdant contest → three emissaries in
  sequence (~3:00–4:20) → **The First Warden** (~4:50).
- The First Warden: the game's stat ceiling — deep shields *and* heavy armor
  *and* a huge hull pool, EMP-immune, precise mixed-palette patterns. Codex
  phases: **Oath / Census / Requiem** — it announces each phase by holding
  fire for a full second. It does not waste ammunition.
- Loot: Pre-Founding relics, the black-box archive entry, and (Phase 10
  hook) both the Ledger's and the broker's messages in the same debrief.

## Reward routing (why replay which branch)

| Branch | Gear identity | Scripted/boss salvage bias | Economy |
| --- | --- | --- | --- |
| Chorus (A) | shields, aux (cloak/EMP), precision kinetic | defense/aux slots | sanctioned rates, standard |
| Tithe (B) | armor, kinetic slugs, economy salvage | economy/primary slots | richest credits in game |
| Verdant (C) | plasma/burn, vampiric traces | primary/mini slots | relic access, Pre-Founding |
| Origin (M14) | Pre-Founding relics | relic tier | one-time archive unlock |

Getting a specific build online is a reason to pick (and replay) a branch,
per the "player can replay and get a bit lucky" direction — the branches are
gear farms with a story reason to exist.

## Enemy roster summary

Full stats live in `enemies/enemy_catalog.json`; art targets live in
`ACT2_CODEX_SPEC.md`. New non-boss units: `chorister`, `cantor`, `censer`,
`sexton`, `precentor` (Chorus); `teller`, `bailiff`, `assessor`, `notary`,
`strongbox` (Tithe); `sporeling`, `thornwing`, `bloomcaller`, `bramble`,
`seedcarrier` (Verdant); minibosses `choirmaster`, `precentor_prime`,
`auditor`, `harbormaster`, `broodmother`, `rootward`, and the three
`emissary_*` units. Eleven new `act2_*:boss` entries. All v1 sprites are
placeholders drawn from existing packs (`fleet_gaps_v1`, `bio_enemies_v1`,
`bosses_broadside_v1`); the art spec replaces them pack by pack.

## What lands when

- **Now (this change set):** all 11 missions playable end-to-end with the
  existing engine (linear unlock order, minibosses as heavy non-boss units,
  placeholder art), validated by `scripts/validate_levels.js`.
- **Codex pass 1 (engine):** mission-graph unlocks + fork UI, miniboss
  banner/health bar/guaranteed drop, new AIs (conductor/formation, mimic,
  thief, lien-drain, spawner, splitter, tractor), boss phases, key-item
  gating for M13. Level JSONs then get the listed one-line AI flips.
- **Codex pass 2 (art):** Chorus pack, Tithe pack, Verdant additions, Origin
  pack, three backgrounds, two projectile sets. Sprite paths swap in the
  catalog; no level logic changes.
- **Phase 10 (later, per `ROADMAP.md`):** branch standing, the broker
  channel, and the fork economy spend the groundwork this act lays.
