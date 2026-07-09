# Progression Master Plan — Power First, Then Progression

**Status:** Accepted direction. Slice 1 was implemented on 2026-07-09 after Adam
explicitly approved execution and is awaiting his playtest. Later slices remain
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

## 5. Slice 1 — one mission beyond Last Light

**Status:** Implemented; awaiting Adam's playtest.

The goal is not to generate Act 2. The goal is to learn whether one encounter can
challenge the game's strongest entertaining builds without flattening them.

### Campaign boundary

- The normal mission board shows Missions 1–8, then one new vertical slice:
  **Dead Air**.
- Dead Air requires Last Light to be completed.
- Discarded Missions 9–11 and old Act 2/3 mission cards are hidden from the normal
  board.
- `?devActs=1` exposes and unlocks discarded cards for agentic regression work. Their
  presence behind that flag does not restore them to campaign canon.

### Dead Air encounter thesis

Dead Air is a compact hybrid pressure test built from reusable machinery and new
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
- Dead Air appears after Last Light and launches.
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

## 6. Later slices — draft backlog, not authorization

These ideas remain available, but none should be implemented automatically after
Slice 1:

1. **Dead Air revision.** Tune waves, defenses, projectile pressure, and rewards
   directly from Adam's playtest.
2. **Progression rewards.** Decide what clearing Last Light and Dead Air should
   unlock. Capability rewards, Dual Fire progression, and starter-kit changes are
   candidates, not settled requirements.
3. **Loot chase.** Skewed roll quality, milestone floors, provenance labels, and
   act-aware drop tables remain promising once there is content worth farming.
4. **Item creativity.** Named cloak/bulwark relics, mini-weapon trinket affixes,
   armor packs, and role-specific weapon surges remain a creative backlog.
5. **Second post–Last Light mission.** Author only after Dead Air demonstrates a
   repeatable encounter vocabulary worth developing.
6. **Act and story structure.** Name or commit to Act 2 only after several missions
   are fun. Then decide how much of the existing lore deserves to be carried by
   them.

## 7. Documentation authority

When documents conflict, use this order:

1. Adam's latest explicit direction;
2. this plan's accepted sections and the current `ROADMAP.md`;
3. `STATE.md` and `CURRENT_SYSTEMS.md` for implemented behavior;
4. other active design references;
5. archived specs and discarded mission files as historical/toolbox material.

An active plan can contain drafts, but only a slice explicitly marked
implementation-ready and approved authorizes development.
