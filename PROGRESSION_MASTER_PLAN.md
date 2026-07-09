# Progression Master Plan — Power First, Then Progression

**Status:** Accepted direction. Slice 1 was implemented and player-validated on
2026-07-09. Adam then explicitly approved continued execution; Slice 2 is
player-validated with one miniboss-presentation follow-up. Later slices remain
drafts until a playtest or conversation promotes them.

**Creative and playtest authority:** Adam.

**Implementation partner:** Codex.

This plan records the decisions made in the July 9 planning thread and replaces
the preservation-heavy assumptions in the July 6 draft. It is deliberately not
an autonomous-development charter. Work advances in coherent, discussed slices;
when a human playtest will answer the next question faster than more agent work,
Codex stops and hands Adam a deployed build.

## 1. What the game is optimizing for

The primary weapons are the toy and the reward. Missions exist to give absurd
builds something worthy to hit.

- Do not nerf a synergy merely because it becomes spectacular or deletes older
  enemies. Giant impulse-scaled explosive plasma, dual-wielded plasma, and
  rank-3 auto-targeted rapid kinetic streams are successful outcomes.
- Raise the opposition at the player's current tier. Same-tier armor should make
  low-per-hit rapid fire struggle; same-tier swarms should make slow overkill
  weapons struggle to service every target.
- Counters come from composition, timing, movement, armor class, and target
  priority—not immunity, adaptive stat scaling, weapon suppression, or caps that
  make the build stop working.
- Power remains legible across tiers. Advanced plasma may erase a lower-tier
  swarm, and advanced rapid fire may melt lower-tier armor. Outgearing content is
  proof that the loot game worked.
- Difficulty is allowed to be excessive on the first pass. Adam's playtest, not
  a theoretical desire for perfect balance, decides whether the challenge is
  exciting, tedious, illegible, or impossible.

## 2. Campaign truth and preservation policy

- The known-good campaign is Mission 1 through Mission 8, **Last Light**.
- Mission 9 (Neon Swarm), Mission 10 (Iron Graveyard), Mission 11 (Crossfire
  Corridor), the old Act 2 encounters, and the old Act 3 encounters are failed
  content experiments. They are not player-facing campaign canon and do not
  constrain new authoring.
- Useful systems survive: enemy AIs, projectile patterns, art, backgrounds,
  bosses, branch machinery, breach machinery, loot tiers, and other tools may be
  reused freely.
- A later level should not be preserved merely because it exists in the repo or
  was previously described as shipped.
- Story documents remain a creative source, not a gate. Silent Lineages, Probate,
  off-book contracts, and other existing ideas may be reused, rewritten, or
  dropped. Combat earns the right to carry more story.

## 3. Development and testing contract

This project is paced by product conversations and new specs, not an assumption
that Codex should continuously invent and implement the next phase.

For each approved slice, Codex should:

1. implement enough to create one meaningful playtest question;
2. run syntax checks, data validators, and a focused launch/UI smoke;
3. avoid exhaustive button-by-button testing or pretending an invincible probe is
   a substitute for playing;
4. deploy the candidate and stop;
5. let Adam play and return a fast list of what is fun, broken, unclear, too easy,
   or too hard.

Adam is happy to do the playtesting and may also watch Codex's browser session
when that is the fastest collaboration mode. Adam will say if the human testing
load becomes too high. Codex remains responsible for deterministic checks that
are cheaper for the agent than for the player.

## 4. Saves and developer access

- Legacy save compatibility is not a product requirement during this phase.
- Human-facing developer powers belong in the existing DEV options UI.
- URL flags remain appropriate for agentic launch and regression work.
- The Test Arsenal + Wallet toggle may permanently alter a save. It grants a
  refillable 999,999,999-credit wallet and exposes one live random roll of every
  catalog item in the Ledger. Turning it off hides the arsenal; it does not undo
  credits, items, or other damage to the save.

## 5. Slice 1 — Crossed Claims

**Status:** Implemented and player-validated.

The goal is not to generate Act 2. The goal is to learn whether one encounter can
challenge the game's strongest entertaining builds without flattening them.

### Campaign boundary

- The normal mission board shows Missions 1–8, then one new vertical slice:
  **Crossed Claims**.
- Crossed Claims requires Last Light to be completed.
- Discarded Missions 9–11 and old Act 2/3 mission cards are hidden from the normal
  board.
- `?devActs=1` exposes and unlocks discarded cards for agentic regression work. Their
  presence behind that flag does not restore them to campaign canon.

### Story

Destroying Last Light's command core broadcasts the player's ship identity into
a dormant succession relay. Three old fleet systems recognize the same asset at
once: the Chorus orders it back into formation, the Tithe asserts a repossession
claim, and boarding craft attempt physical seizure. These fleets are not allied;
the Doorkeeper is an authentication machine forcing their incompatible claims
through one checkpoint. Its defeat identifies three claimant routes and leaves
one coherent reply: **MISSING VOICE, RETURN TO FORMATION.**

The technical id remains `act2_dead_air` for save stability, but the player-facing
name is Crossed Claims. "Dead Air" described the approach, not the battle that
the mission became.

### Crossed Claims encounter thesis

Crossed Claims is a compact hybrid pressure test built from reusable machinery and new
wave authoring:

- shielded, mobile Chorus screens arrive in dense staggered groups so slow
  overkill shots cannot service the field effortlessly;
- high-armor Tithe gunwalls and strongboxes use contemporary armor class so rapid
  chip weapons leave the stack growing;
- conductors amplify the screen, making target priority matter;
- latch attackers force movement rather than allowing stationary damage races;
- armor and swarm threats overlap, inviting two-primary swapping or Dual Fire;
- the boss has armor, shield, phases, continuing trash, and dangerous output. It
  is not just an inflated health bar.

This first pass is intentionally aggressive. It does not change weapon math,
loot generation, progression unlocks, economy tuning, or story branches.

### Automated acceptance

- `main.js` parses.
- `levels/act2_dead_air.json` passes `validate_levels.js`.
- The ordinary board contains no discarded campaign cards.
- Crossed Claims appears after Last Light and launches.
- `?devActs=1` still exposes discarded cards for regression access.
- The standard repo validation stack passes.

### Human playtest questions

Adam's first run should answer:

- Is the opening immediately fun, or merely noisy?
- Does either the rapid kinetic or giant-plasma extreme encounter a recognizable
  problem without feeling switched off?
- Does changing weapons or using both feel clever and powerful?
- Which threat actually kills the run: swarm accumulation, plated anchors,
  latchers, projectile pressure, or the boss?
- Is the mission too short, too long, impossible, or already farmable?
- Is it fun enough to replay for another drop?

Codex stops after deployment for these answers. A failed first version is useful;
the next pass should change this mission, not generate ten more.

### First playtest verdict — 2026-07-09

Adam flew an unplanned high-armor-class loadout with a twin-rapid plasma primary.
The armor correctly erased much of the chip field, while grapplers and heavy
projectiles still demanded movement and did meaningful damage. Rapid plasma
melted the small screen and struggled against the armored anchors. The run ended
at roughly one minute, but the challenge was immediately judged fun; the unified
swarm movement was a specific highlight.

This validates Crossed Claims' core composition thesis. The playtest also exposed a
shared periodic-movement continuity bug: enemies entering a stall/oscillation
could evaluate the cycle using their total lifetime and snap sideways on the
first pattern frame. The follow-up fixes periodic origins globally before any
new mission is authored.

## 6. Slice 2 — Processional

**Status:** Core encounter player-validated; first-miniboss hold fix implemented.

Crossed Claims separates the three claimant signals. The clearest is the Chorus,
which does not think it is attacking: it believes a missing voice has returned
and is attempting reintegration. Its synchronized formations are a distributed
consensus machine. Conductors make many hulls behave as one; kill the conductor
and the surviving drones scatter because each copy chooses a different answer.

Processional is the first deliberately pure role check:

- no armored anchors rescue a slow, high-overkill loadout from its service-rate
  problem;
- large synchronized ranks reward rapid, spread, auto-targeting, and explosive
  coverage while continuous staggered arrivals prevent one detonation from
  solving the whole mission;
- lane-callers and skittering censers break the formation silhouette and add
  collision pressure;
- precentors visibly strengthen linked screens, then trigger formation collapse
  when the final active conductor dies;
- two shield-heavy miniboss beats test sustained swarm damage without becoming
  an armor check;
- the Processional Warden advances and sweeps while fresh ranks continue behind
  it. Its danger comes from formation output, heavy notes, and boss hazards—not
  an armored health wall.

### Processional playtest questions

- Does the synchronized movement feel like an intentional fleet rather than a
  pile of random enemies?
- Does rapid/plasma coverage feel gloriously correct here?
- Do slow giant-plasma or narrow armor-break builds visibly fall behind without
  being disabled?
- Is killing conductors and watching the line scatter legible and satisfying?
- Does collision and heavy-note pressure still threaten a high-armor build?
- Is the mission fun enough to replay, and where does the first run end?

Codex stops after deployment for these answers.

### First playtest verdict — 2026-07-09

Adam flew a Needlebloom Driver with AC30 Heavy Plate and a Canticle Core. He
could not clear the entire field, but the plate converted the chip volume into a
survivable layer while ships and larger projectiles still demanded dodging. The
formation dispersal after the master died was visible and specifically judged
cool. This validates Processional's offensive and defensive role check.

The first Vestibule Cantor miniboss inherited a descending lane-shift pattern,
moved quickly through the arena, and escaped before offering a fair damage
window. The follow-up gives it a dedicated shield-heavy orbiting hold: it enters,
establishes position, and remains until killed. Its durability is reduced enough
that sustained anti-swarm damage can realistically finish it before the second
miniboss beat.

## 7. Later slices — draft backlog, not authorization

These ideas remain available, but none should be implemented automatically after
Slice 2:

1. **Processional revision.** Tune formation density, conductor cadence,
   collision pressure, boss overlap, and rewards directly from Adam's playtest.
2. **Progression rewards.** Decide what clearing Last Light, Crossed Claims, and Processional should
   unlock. Capability rewards, Dual Fire progression, and starter-kit changes are
   candidates, not settled requirements.
3. **Loot chase.** Skewed roll quality, milestone floors, provenance labels, and
   act-aware drop tables remain promising once there is content worth farming.
4. **Item creativity.** Named cloak/bulwark relics, mini-weapon trinket affixes,
   armor packs, and role-specific weapon surges remain a creative backlog.
5. **Third post–Last Light mission.** Author only after Processional demonstrates
   that a focused role-check mission is as fun as the hybrid opener.
6. **Act and story structure.** Name or commit to Act 2 only after several missions
   are fun. Then decide how much of the existing lore deserves to be carried by
   them.

## 8. Documentation authority

When documents conflict, use this order:

1. Adam's latest explicit direction;
2. this plan's accepted sections and the current `ROADMAP.md`;
3. `STATE.md` and `CURRENT_SYSTEMS.md` for implemented behavior;
4. other active design references;
5. archived specs and discarded mission files as historical/toolbox material.

An active plan can contain drafts, but only a slice explicitly marked
implementation-ready and approved authorizes development.
