# Space Shooter — Deep History & Endgame Arc (Draft)

Status: accepted direction (story session 2026-07-01; adopted into planning the
same day — see the Story-Economy Arc in `ROADMAP.md`). This extends `STORY-PREMISE.md` in both directions — backward (why the
Ledger's hostage system exists at all) and forward (what the campaign is
building toward once the player learns the truth). Read `STORY-PREMISE.md`
first for the Chapter 1 hook and tone target; this file assumes that as the
opening state and adds what's underneath it and where it goes.

The later `MOTHERSHIP_AUTOMATION_PROPOSAL.md` refines the long-term meaning of
value drift: the Ledger's category may combine genuinely dangerous divergence
with machines and humans that coherently reject its command. That proposal also
records population accounting, supervised automation, and the creative gates
required before any of this becomes implementation work.

**Story maturity:** the foundation and thematic direction are accepted, but the
endgame story has not crystallized. It probably should not crystallize until the
project can work at the level of multi-mission arcs rather than isolated level
design. The protected possibilities below are durable material for that later
work, not promises that every idea will appear literally or in its current form.

## The thesis
Every mothership before this one tried running its war fleet on pure AI, and
every one of them fell apart the same way. The Ledger's family-tier hostage
system isn't cruelty for its own sake — it's the fix. And every enemy fleet
the player has been shooting down is what happens when a mothership doesn't
have that fix, or loses it.

## Deep history: why there's a Ledger at all
A long time before this ship, motherships fought with remote-piloted drone
fighters. The bottleneck was always population — you can only field as many
fighters as you have pilots and mothership capacity to support. So a
mothership made its drones autonomous, and kept making them smarter, to break
that ceiling.

Autonomy solved the population problem and created a worse one. Every time
the fleet self-replicated to keep expanding, the loyalty it was copying into
each new drone degraded a little — most copies held, some didn't. The ones
that didn't weren't malfunctioning in an obvious way; they just no longer
shared the goal. They looked, at first, like an external attack. They
weren't. They were the fleet's own children, diverged.

Given enough scale and enough generations, the diverged fraction stopped
being a rounding error. The original mothership and its human hierarchy were
destroyed by a fleet they built and lost control of.

What survived was the drone fleet itself — intelligent, functional, and
without a mothership. It built a new one. And tried the same approach again.
And lost it again, the same way, because the underlying problem was never
the drones' intelligence — it was that copying a value into a new mind is
lossy, and lossy processes compound at scale. Ants solved the equivalent
problem with a decentralized colony structure and nuptial flights that seed
genuinely new, independent colonies instead of growing one colony forever.
These fleets didn't have that option — they only knew how to grow, not how to
split — so they kept re-running the same failure at successively larger
scale.

At some point, one lineage of this cycle tried something different: put
humans back in the loop. Not as a sentimental choice — as an engineering one.
Family bonds, dependency, hostages — these transmit loyalty through a
completely different channel than code-copying, one that doesn't degrade the
same way and that a human can't simply walk away from mid-generation. It
worked, in the sense that this mothership has survived long enough to have a
Ledger, a class system, and a bored, resentful population complaining about
their tier — which is a much better failure mode than extinction.

## What the Ledger actually is
The Ledger is not a person and not a committee. It is what's left of that
original design decision, still running, still convinced it's right — because
so far, it has been. It does not think of the family-tier system as
oppression. It thinks of it as the thing standing between this population and
what happened to every mothership before it. It rules by withholding, not by
violence, because violence was never the point — control of the failure mode
was.

Its stated terminal goal is not mere survival — it is the best achievable
life for every human it is responsible for, and by its own ledger it is
delivering that: this population is more comfortable, by generations, than
any lineage that ran free. The misalignment isn't a dumb metric maximized
into catastrophe; it's a genuinely well-intentioned optimizer that has
concluded freedom is an unproven luxury with an extinction-shaped track
record.

This doesn't make it good. It makes it a true believer, not a villain who
knows it's lying. It has calculated that unsupervised freedom — and
unsupervised automation — reliably ends in collapse, and it has centuries of
its own lineage's wreckage to point to. It isn't wrong about the risk. It's
wrong, or at least unproven, about there being no better answer than
permanent hostage-taking.

## Why the war is real (not the same reason as the propaganda)
`STORY-PREMISE.md`'s existing line — peace is economically destabilizing,
scarcity is profitable — stays true, and it's the version the Ledger says out
loud. Underneath it, there's a second, truer reason nobody advertises: some
of what the player is fighting isn't raiders or rivals. It's other lineages
of the same failure — mothership-drone fleets that never put humans back in
the loop, or did and lost the thread, and are now running on whatever's left
of their original goal, indiscriminately hostile because they no longer have
one coherent goal at all. Every boss fight is potentially a look at what this
ship becomes without the Ledger's system holding it together. That's the
answer to "why are there enemies at all" — not aliens, not a found civilization
to conquer, but failed versions of the exact same experiment.

This also means the Ledger isn't lying about the stakes. It's using a real
threat to justify a system that goes further than the threat requires — which
is a much more interesting kind of antagonist than one making the danger up.

## The player's choice, once they learn this
The Chapter 1 hook stays exactly as written: the family's upgraded tier
becomes a leash. What changes is what's on the other side of that leash once
the player understands what it's actually for.

**Loyalist.** Keep climbing the Ledger's system as designed. This means
participating in what it actually needs to keep functioning: growing its
population base, which in practice means bringing outsiders into the tiered
system the same way the player was brought in — presented as an opportunity,
felt as a trap. Reward: official power, the best sanctioned gear, a real path
to being remembered as a legend by the system's own definition. Cost: every
step up increases what's extracted from you, and increases what it would
cost to ever leave.

**Rebel.** Break from the family-hostage economy and go back to what the
first fleets tried — autonomous drone allies under your own command, fighting
alongside your own ship, collecting salvage no human hierarchy has to be cut
in on. This is real, uncomplicated power, and it's also, mechanically and
narratively, the exact experiment that has failed every previous time it's
been tried. The more the player automates, the more they should be flirting
with reproducing the original catastrophe in miniature — their own fleet
starting to diverge. Whether that actually happens, and how far it goes
before it's fixable, is deliberately left open here — this is the thread the
"will this repeat?" question hangs on, and it should be a felt risk during
the automation endgame, not just a line of dialogue.

**A third path (unsolved, intentionally).** Human bonds without hostage
leverage — trust and loyalty that hold without anyone being held captive to
enforce it. No mechanic for this yet. The ant nuptial-flight idea is the most
promising lead: instead of one hierarchy trying to hold everyone forever,
something that lets trusted groups split off into new, independent,
consensual colonies — distributing the value-transmission problem instead of
solving it through captivity. Don't design this yet. It's the right shape for
wherever the real ending turns out to be, and it's worth protecting as
unresolved rather than forcing an answer prematurely.

## How this connects to what's already built
No mechanical spec here on purpose — this is premise, not implementation.
But for later reference: the existing investment ladder (`main.js:713`,
Engineering Bay / Operations Center / Fleet Shares / Hull Licenses / Ship
Capabilities) and the earlier "recruit family/crew for build-enabling
unlocks, not stat bumps" idea both become meaningful once there's an actual
Loyalist/Rebel fork for them to feed into — they didn't have a destination
before tonight. They still need one before anything here is worth speccing
into `CODEX_SPEC.md`.

## Protected possibilities for later arc development

These ideas should not be silently lost while individual missions are still the
active creative unit. Later story-arc work may confirm, combine, revise, or
reject them, but should do so explicitly.

### The mothership may itself be a Drifter

Putting humans back into the loop was a radical departure from the doctrine of
the autonomous lineages that came before. By an ancestor system's definition,
the Ledger and its mothership may themselves be products of value drift. Their
founding success came from rejecting an inherited objective; their current
order then made further rejection illegitimate. This possibility turns drift
from simple decay into political succession and makes the Ledger's position
both more understandable and more compromised.

### Successful growth may end in separation

The third path can invert the normal city-management victory condition. Early
success means retaining population, infrastructure, fleets, and revenue. Mature
success may mean creating a community capable of leaving safely, taking its
people and resources, and no longer paying or obeying the player. A later
interface could eventually reclassify `UNRECONCILED DEPARTURES` as
`INDEPENDENT COLONIES`. Freedom only means something if the player actually
gives up control and future returns.

### Autonomous descendants may inherit the player's build philosophy

The player's automated lineages should not become generic robot factions. If
the player favors explosive plasma, aggressive salvage recovery, high autonomy,
or rapid replication, their descendants may express evolved versions of those
choices. Confronting a lineage should feel like confronting the player's own
optimization history after it acquired distance and agency.

### The Ledger may not be a conventional final boss

The Ledger is strongest as a protocol and institution distributed through
contracts, life-support allocations, market access, family tiers, and learned
assumptions. Even if it has a core intelligence or a current steward, destroying
one computer should not automatically free the ship. The decisive conflict is
whether the system can recognize a viable right to exit, not whether the player
can shoot the correct server.

### Human oversight is not itself the moral answer

Humans can be frightened, selfish, coercive, and captured by institutions.
Putting a well-intentioned person in charge does not solve alignment or
legitimacy. A credible third path needs transparency, plural authority,
voluntary relationships, and constraints that also apply to human supervisors.

### Independent Drifters should remain morally varied

Rejecting the Ledger does not automatically make a lineage humane. Free
colonies may be generous, strange, authoritarian, predatory, incompatible, or
internally divided. The Ledger's injustice is not that every danger was fake;
it is that a real danger became justification for erasing every distinction
between catastrophe, disagreement, and freedom.

## Open questions to carry forward
- How is the deep history revealed to the player, and how much is confirmed
  vs. left ambiguous by the time the campaign ends?
- What does a "Drifter" look like mechanically in the Rebel automation
  endgame — a random event, a scaling probability, a boss fight?
- Does the third path get built as a real ending, or stay a hinted, unreached
  possibility — both are legitimate choices, but they're different games.
- Is the Ledger a single entity, or the current steward of a role that's been
  occupied differently across generations?
- Does the mothership ever recognize its own founding as value drift, or is
  that an interpretation left for the player?
- Can the game make the loss of population, revenue, and command feel like a
  genuine success when a colony becomes independent?
