# Progression Master Plan — Power First, Then Progression

**Status:** Accepted direction. Slices 1–4 are player-validated. Repossession's
Assessor liens remain explicitly unverified. Slice 5, Return Address, has
validated its interception concept and is in a focused ramp revision. The Dual
Fire campaign ladder is implemented for that retest. Later slices remain drafts
until a playtest or conversation promotes them.

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

### Gear-tier contract

- **Gold / Pre-Founding is the Act 2 target tier.** A cohesive, role-appropriate
  gold build must be able to clear Act 2 with learned execution. Gold primaries
  are the offensive baseline; the loadout may still need a suitable defensive
  answer, support item, and consumables.
- Act 2 is not balanced around **green / Heirloom** gear. Heirlooms are the next
  power tier and should make early Act 2 noticeably easier rather than becoming
  an invisible entry requirement.
- Tier does not erase role. A gold swarm weapon may fail an armor check and a
  gold armor breaker may drown in Processional. That is a loadout problem, not a
  reason to raise the required rarity.
- Beginning with The Green Signal, authored hybrid checks may assume that the
  Tier 2 Dual-Fire Coupler has been earned. At its 70% per-weapon scaling, an
  ordinary two-bay hull produces about 119% of one weapon's base output after
  second-bay strain, compared with 110% for a focused single-primary build.
  Pairing complementary weapon roles is an intended solution, not a cheese.
- Do not balance Return Address around Tier 3 or Tier 4 Dual Fire. Those campaign
  rewards may outgear the target. A role-appropriate gold single primary
  should remain a harder viable route, but every gold primary does not need to
  solve every mission alone. If single-primary identity later needs help, add a
  stronger specialist payoff rather than reducing the spectacle of Dual Fire.
- Orphan Signal is a gold Pre-Founding aux and is valid Act 2 equipment. Canticle
  Core is a green Chorus Heirloom and therefore sits above the intended baseline.

### Dual Fire progression contract

Dual Fire is combat vocabulary, not a missable credit sink. Its base tiers are
awarded directly from campaign records and displayed as earned nodes in Ledger
Investments:

1. **Tier 1 / 60%:** clear Last Light. This makes complementary coverage
   available for Crossed Claims without exceeding single-primary focus in raw
   output.
2. **Tier 2 / 70%:** clear Processional or Repossession. Every valid path into
   The Green Signal and Return Address therefore owns the intended hybrid
   baseline.
3. **Tier 3 / 85%:** clear Return Address, or clear both Processional and
   Repossession. The latter is an optional completionist advantage before the
   interception mission.
4. **Tier 4 / 100%:** clear Return Address, Processional, and Repossession. This
   is an intentionally excessive replay reward, not a Return Address baseline.

Broadside's hull bonus cannot create Tier 1 from no campaign award and cannot
manufacture the completion-only Tier 4; it can accelerate Tier 1 to Tier 2 or
Tier 2 to Tier 3. The Test Arsenal exposes a separate effective-tier override
from 0–4 so playtests never need to mutate or reset campaign progress.

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

Adam's follow-up replaced the green Canticle Core with the gold Orphan Signal to
test the intended tier. Processional should remain difficult but fully winnable
at that gold baseline; a Heirloom clear would not prove the Act 2 gate.

## 7. Slice 3 — Repossession

**Status:** Player-validated. Adam cleared it with the Starwound Lance and judged
the mission challenging, replayable, and worth testing with multiple builds.

Crossed Claims' second signal is an invoice older than the player's mothership.
The Tithe recognizes the ship as secured collateral under a debt whose creditor
is already dead. It does not know who should be paid; it only knows collection
authority survived. Repossession is the collection attempt, and defeating The
Escrow reveals that the third claim is not transmitting at all—it is growing
toward the relay.

Repossession is the gold-tier anti-armor role check:

- low-count formations replace Processional's screen-filling swarm;
- Bailiffs, Notaries, Strongboxes, the Auditor, and The Escrow step through AC30,
  AC34, AC42, AC38, and AC40 armor targets so low-per-hit rapid weapons visibly
  leave the collection stack growing;
- a prototype primary salvage pod gives Bailiff thieves something tangible to
  seize and carry away if the player does not secure it;
- Assessors remain softer priority targets that attach credit-draining liens,
  preventing the mission from becoming a single undifferentiated armor wall;
- sparse slug, flak, and escrow-core projectiles reward armor class against the
  small hits while preserving dangerous heavy notes;
- the Auditor uses a persistent orbiting hold, and The Escrow is a phased armor
  boss that cannot simply descend out of the fight;
- two armor patches support recovery without making early collision or heavy-hit
  mistakes free.

### Repossession playtest result and focused follow-up

- Gold gear is sufficient: Starwound Lance cleared the mission, while a mixed
  armor-break/rapid Dual Fire build made progress but remained difficult.
- The encounter role check works. Twin rapid with homing and much higher listed
  DPS still underperformed against AC30–42 armor for an understandable reason.
- Focused kinetic weapons were numerically far below focused plasma. Their
  per-hit and direct DPS are raised while plasma spectacle, burn, and explosions
  remain intact; the balance simulator now includes the same focused-shot
  multiplier shown by the Armory.
- Plasma firing showed device-sensitive frame delay. The optimization preserves
  projectile and explosion radius while shortening only plasma-impact persistence,
  removing repeated screen-sized impact gradients, coalescing same-frame burn
  entries, and reducing layered trail detail only when many plasma shots coexist.
- Mouse control immediately overwrote tractor displacement, so Repossession no
  longer uses it. The Escrow now paints a fixed seizure lock and then fires a
  high-speed, high-damage kinetic slug down that line.
- Assessors were mechanically present but unreadable. Attached liens now draw a
  persistent tether and rings, label the Assessor, and show the exact drain rate
  at the player's ship.
- Salvage theft worked, but sub-gold random drops were not worth risking a gold
  build to collect. That is recorded as an economy/reward-floor problem rather
  than patched by inflating this mission's drops in isolation.

The focused weapon changes and plasma behavior are player-accepted. The seizure
lock is also accepted as a cool replacement for the tractor, but its original
760-speed shot was too easy to avoid relative to the surrounding projectile
field; the locked slug now travels at 1350. Adam did not remember encountering
the Assessors during the retest, so lien readability is still unverified rather
than silently treated as accepted. That open observation is non-blocking for the
next mission.

## 8. Slice 4 — The Green Signal

**Status:** Player-validated; boss-phase escalation follow-up implemented.

Repossession reveals that the third claimant is not sending a message. The
relay is reflecting a growth schedule: machine-standard replication behaving
like metabolism. Verdant matter is rooting into the same corridor and growing
toward the coordinates the other claimant archives orbit. Defeating the
Gatekeeper should establish that the Verdant are not aliens but an ancient
machine lineage copied beyond manufacturing and into ecology.

The Green Signal is the gold-tier population-control role check:

- it is an ecology, not a formation, so it must not reproduce Processional's
  synchronized ranks or conductor-collapse rhythm;
- Bloomcallers are durable, visibly marked producers that continually bud
  Sporelings while alive;
- Seedcarriers split into four Sporelings on death, making kill order and timing
  matter even when a target is easy to burst;
- Thornwings bring fast standard thorns and dangerous collisions while slow
  Brambles become hull-heavy walls that let the population collect behind them;
- a Broodmother midboss and the Gatekeeper Bloom both keep producing children,
  turning clear rate into a resource rather than a static DPS check;
- enemies rely on hull, modest shields, and population rather than contemporary
  armor class, making explosive and burning plasma the natural answer without
  granting any weapon-specific bonus or immunity;
- small spores provide survivable chip pressure for strong armor, while thorns,
  large bloom cores, and collisions remain meaningful dodge threats;
- field pickups are repair caches only. The known sub-gold salvage-incentive
  problem remains reserved for the shared economy/reward pass.

The encounter escalates quickly, introduces the first producer at ten seconds,
reaches the Broodmother at fifty-eight seconds, and roots the Gatekeeper at one
hundred ten seconds while the ecology continues to arrive. The mission completes
on the boss rather than requiring every child to be cleaned up.

### The Green Signal playtest questions

- Do the budding ring and orbiting buds make Bloomcallers obvious priority
  targets without needing explanatory UI?
- Does ignoring producers create an alarming population curve, and does killing
  them feel like regaining control?
- Are Seedcarrier splits readable and fun rather than arbitrary extra enemies?
- Do explosive, burn, and wide plasma builds feel delightfully correct for the
  problem without making the entire mission irrelevant?
- Can high armor class shrug off small spores while fast thorns, bloom cores,
  collisions, and accumulated ships remain dangerous?
- Does the Broodmother remain present and fair, and is the Gatekeeper a satisfying
  fight at the Pre-Founding baseline?
- Where does the first run end, and is the answer driven by build choice, target
  priority, survivability, or raw population?

### The Green Signal playtest verdict — 2026-07-10

- Purple defense with a purple Plasma Lance was overwhelmed early, establishing
  that sub-target-tier equipment does not coast through the mission.
- Gold defense with a gold Needlebloom Driver cleared with only a sliver of hull
  remaining. That is the intended Act 2 contract: a coherent gold build wins,
  but the mission still reaches it.
- The enemies were judged strong, the population snowball was real, and the
  Seedcarrier split was both readable and visually satisfying.
- Once the rest of the field was cleared, the Gatekeeper's later fight became
  too quiet. The audit found that phase index zero was treated as false, causing
  Germination to retrigger forever and preventing Overgrowth entirely.

The phase index now advances correctly. Boss phases can also merge new spawn
parameters and summon an immediate brood. Germination opens with Seedcarriers
and Sporelings, then buds paired Seedcarriers; Overgrowth opens with
Bloomcallers and Thornwings, then produces paired Bloomcallers fast enough to
rebuild an ecology around the boss. Spawned producers retain their own authored
AI parameters instead of losing them to the parent link.

## 9. Slice 5 — Return Address

**Status:** Core encounter validated; first ramp revision implemented for
playtest.

Destroying the Gatekeeper does not silence the maintenance band. It stamps the
player's flight telemetry into it. Verdant seedships follow that route back to
the mothership in a reproductive flight, and the Ledger issues a containment
order. The seedships mostly do not shoot; their behavior carries the question
before the story answers it. They may be invading, migrating, propagating, or
incapable of recognizing a difference.

Return Address is a gold-tier interception and triage check:

- mothership integrity replaces screen survival as the only objective that can
  fail independently of the player's hull;
- only Seedcarriers and Rootward masses damage integrity when they cross the
  bottom edge, while ordinary escorts can leave without producing fake
  `BREACH -0` warnings;
- Seedcarriers are hull-heavy, non-firing transports. Six breaches end the run,
  so the player can make a few mistakes but cannot ignore the migration;
- Burster Seedpods lock the player's current position and commit to dangerous
  collision lunges, while Stranglers pursue and fire fast heavy needles;
- Thornwing escorts fill firing lanes, and two slow Rootward masses create
  high-durability interception emergencies worth thirty-eight integrity each;
- a Seedcrown miniboss continually buds paired Bursters, forcing the player to
  decide whether to clear the harassment or keep servicing transports;
- the Verdant Matriarch launches Seedcarriers during the boss fight. Its final
  Nuptial Flight phase immediately releases two carriers and five Bursters,
  then buds carrier pairs every 1.8 seconds;
- killing the boss ends the containment emergency. Integrity cannot fail during
  the short boss-death sequence after player fire has been disabled.

This is neither Processional's formation swarm nor The Green Signal's producer
snowball. The pressure is scheduled traffic: choose what must die now, what can
wait, and whether body-blocking a carrier is worth taking the collision.

The first playtests established that the concept is clear and worth replaying.
The opening was easy, Rootwards could be isolated and focused down, and the
final carrier pileup arrived as a cliff. A Needlebloom Driver serviced the main
field well but could not cover the boss and roughly ten carriers alone; pairing
it with Starwound Lance in Dual Fire handled that mixed demand much better. The
revision moves each Rootward into the preceding threat wave, at 36 and 84
seconds, so split-attention pressure develops earlier. It trims only the
Nuptial Flight's immediate summons and budding cadence, preserving the finale as
the mission's hardest problem.

### Return Address playtest questions

- Is the Mothership integrity objective immediately legible without a tutorial?
- Do non-firing Seedcarriers read as the important escaping targets amid the
  escorts, or do they disappear into the visual noise?
- Does the integrity budget create interesting triage rather than an arbitrary
  second health bar?
- Do focused weapons feel powerful against Rootwards and carriers while
  rapid/homing or wide weapons remain useful against Bursters and hunters?
- Are Burster locks threatening but fair, especially with gold defense?
- Does the Seedcrown create a good mid-mission priority crisis?
- Does the Matriarch's Nuptial Flight phase unmistakably escalate even after the
  rest of the field has been cleared?
- Does the debrief fact that none of the seedships acquired a weapons lock make
  the encounter more interesting without prematurely declaring the Verdant good?

Codex stops after deployment for this combat and objective playtest.

## 10. Later slices — draft backlog, not authorization

These ideas remain available, but none should be implemented automatically after
Slice 5:

1. **Return Address revision.** Validate the new mid-mission overlap and smoother
   Matriarch ramp with both a gold single-primary build and a complementary
   Tier 2 Dual Fire build.
2. **Assessor verification.** Keep lien readability marked unverified until a
   future Repossession run actually observes it; this does not block Verdant work.
3. **Loot chase.** Act-aware rarity floors, milestone rewards, provenance labels,
   and other ways to make dangerous field salvage relevant to a gold-equipped
   pilot now have a concrete failing case from Repossession.
4. **Item creativity.** Named cloak/bulwark relics, mini-weapon trinket affixes,
   armor packs, and role-specific weapon surges remain a creative backlog.
5. **Act and story structure.** Name or commit to Act 2 only after several missions
   are fun. Then decide how much of the existing lore deserves to be carried by
   them.

## 11. Documentation authority

When documents conflict, use this order:

1. Adam's latest explicit direction;
2. this plan's accepted sections and the current `ROADMAP.md`;
3. `STATE.md` and `CURRENT_SYSTEMS.md` for implemented behavior;
4. other active design references;
5. archived specs and discarded mission files as historical/toolbox material.

An active plan can contain drafts, but only a slice explicitly marked
implementation-ready and approved authorizes development.
