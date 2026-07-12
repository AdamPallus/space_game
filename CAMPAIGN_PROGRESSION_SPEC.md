# Campaign Progression Spine

Status: **in execution; Slices A and B implemented**

Approved direction: 2026-07-11. Slice A is player-approved. Slice B now reflects
the post-playtest supply-credit redesign and awaits a focused human playtest.

## 1. Why this pass exists

The game can now produce excellent missions. The Test Arsenal proves that
coherent weapon, defense, aux, mini, hull, and Dual Fire combinations exist that
can beat the five validated post-Last-Light missions. The missing game is the
journey that lets a fresh pilot assemble those combinations without developer
tools.

A fresh save currently exposes nearly every major loadout capability at once
and grants three permanent starter primaries covering focused kinetic,
anti-swarm plasma, and armor breaking. The Cadet Kinetic Frame itself reports
approximately 344 DPS, higher than many blue and purple weapons that should
feel like upgrades. Random drops can produce a powerful purple or gold item
early, but there is no reliable capability ladder and no guaranteed route to a
coherent gold build before the campaign begins balancing around gold equipment.
Heirloom gear is implemented as an Act 3 reward tier even though no current Act
3 mission is player-facing canon.

This pass fixes that progression spine before any new mission is authored.

For progression and balance purposes, Crossed Claims, Processional,
Repossession, The Green Signal, and Return Address are the **current playable
Act 2 foundation**. Their final chapter presentation may evolve with the story,
but agents should not treat them as disposable merely because older files also
used Act 2 labels.

## 2. Binding product rules

1. **Start playable, not fully equipped.** A fresh pilot begins in the hangar
   with one deliberately weak Cadet kinetic primary, baseline defense, a
   starter hull, and Cloak. There is no mandatory Flight School, but real
   weapon choices and major ship capabilities arrive through campaign first
   clears.
2. **Show the future.** Locked slots and capabilities remain visible with a
   plain mission requirement. Do not hide enough of the Armory that players
   cannot understand what they are working toward.
3. **Campaign trust unlocks systems; credits buy inventory.** A mission clear
   grants the right to use a capability or buy a chassis. Gear and consumables
   still participate in the economy.
4. **Luck creates stories, not progression walls.** An early purple Seeker
   Array or lucky gold relic may accelerate a build. Bad luck must not prevent
   the player from reaching the equipment tier the next act assumes.
5. **Gold clears the current post-Last-Light campaign.** A cohesive
   Pre-Founding build must be obtainable through ordinary play. Heirlooms
   remain above that baseline and must not be required before canonical Act 3.
6. **Consumables arrive in Act 1.** They are part of the combat vocabulary used
   to tune late Act 1 and Act 2, not an Act 3 feature.
7. **Consumables are expensive progression insurance, not baseline power.** A
   pilot may deliberately lose money boosting through a mission before the
   ideal gear arrives, gambling on a rare drop or permanent unlock. Correct
   role-appropriate gear at the intended tier clears without consumables.
8. **Raise authored pressure, not a global scalar.** After tools unlock, use
   simultaneous threats, heavy notes, collision intent, and shorter accidental
   quiet windows to make those tools matter. Do not globally multiply every
   enemy's damage or scale enemies to the player's inventory.
9. **Developer access remains frictionless.** Test Arsenal bypasses capability
   and gear acquisition gates without rewriting campaign records. Human-facing
   controls live in DEV Options; URL flags remain available for agent smoke
   tests.

## 3. Initial capability ladder

These milestones are implementation defaults. Small timing changes are allowed
after a fresh-save playtest, but agents must not collapse the ladder back into
an all-unlocked starter state.

| Milestone | Campaign award | Purpose |
| --- | --- | --- |
| Fresh save | Weak Cadet Kinetic Frame in Primary A, two defense bays, starter hull, Cloak, full hangar navigation | Immediately playable without supplying free swarm, armor, and alternate-ammo answers. |
| Mission 1 chapter | Consumable Bay 1, one Shield Overcharge activation-fee waiver | Introduce preparation after the player has cleared Hybrid plus one role contract. |
| Mission 2 chapter | Mini weapon slot plus a choose-one Certified mini requisition | Make passive coverage a visible choice rather than a silent automatic install. |
| Mission 3 chapter | EMP support authorization and one Armor Sealant | Introduce projectile control and armor recovery before dense mid-act pressure. |
| Mission 4 chapter | Primary B in **Swap** mode plus a choose-one Certified role requisition | Introduce role switching after role pressure has already made alternate weapons desirable. |
| Mission 5 chapter | Redline and Sustained Impulse authorizations, with one fee waiver each | Add two offensive-tempo choices for bosses and dangerous overlaps. |
| Mission 6 chapter | Named-hull licenses and Bulwark support authorization | Hull identity and the third aux role arrive after core gear loops are familiar; chassis still cost credits. |
| Mission 7 chapter | Consumable Bay 2 | Let the player compose recovery and offense before Last Light. |
| Last Light chapter | Dual Fire Tier 1 and the first Pre-Founding commissioning package | Finish Act 1 with the complete loadout vocabulary and a viable entry build for harder content. |

An authorization that introduces EMP or Bulwark also grants one baseline module
and enables that family in ordinary drops and Ledger stock. The player should
never unlock a capability and then wait indefinitely for randomness before
trying it.

Existing Dual Fire milestones remain binding:

- Tier 1 / 60%: Last Light.
- Tier 2 / 70%: Processional or Repossession.
- Tier 3 / 85%: Return Address, or both claimant missions.
- Tier 4 / 100%: Return Address plus both claimant missions.

Named hulls use the same two-part contract: the Mission 6 clear authorizes hull
licenses, while Ledger Investments and credit prices determine which chassis
the player actually owns. Broadside may improve eligible Dual Fire tiers under
the existing rules; it does not bypass campaign authorization.

### Act 1 chapter and rating contract

- Every Act 1 tier is a two-clear chapter: clear the Hybrid mission, then clear
  either its Swarm or Armored contract. The role clear opens the next Hybrid
  mission and grants that chapter's capability award.
- The Mission Board keeps the existing cards and carousel but shows a compact
  Hybrid -> Swarm/Armored -> Next route. After Hybrid is cleared, variant arrows
  receive an animated prompt until either role contract is settled.
- Completed mission profiles store their best enemy-destruction percentage.
  Enemies that enter the mission and escape count against the result; spawned
  adds and split children count as enemies. SS requires 100% destroyed. S is
  95-99%, A 85-94%, B 70-84%, C 50-69%, and D below 50%.
- Ratings are mastery feedback, not another unlock requirement. Best grades are
  stamped on the exact Hybrid, Swarm, or Armored profile. Pilot Rank is derived
  from the sum of best campaign-profile percentages instead of lifetime credits.

### Starter weapon contract

- A fresh save owns only the non-sellable **Cadet Kinetic Frame**. Area Control
  and Armor Break remain normal weapon bases that must be earned, found, or
  purchased; they are not free starter inventory.
- The Cadet is a focused kinetic trainer with no effect, no rare affix, and no
  hidden late-game scaling. In the starter hull its displayed effective DPS
  should begin around **150–180**, subject to the Mission 1 playtest.
- The target is roughly the lower quartile of ordinary primary output and at
  least 25% below the median Certified primary. A typical blue weapon should
  offer an obvious improvement in output, role coverage, effect, or more than
  one of those axes.
- The Cadet must clear Missions 1–2 with reasonable aim. It should feel
  increasingly inadequate rather than remaining a competitive Act 1 endgame
  weapon.
- `balance_report.js` must print the Cadet against Certified and Prototype
  primary medians and warn if it reaches or exceeds the Certified median.

## 4. Mission supply and pickup contract

Mission supplies are a credit commitment, not persistent inventory. A pilot may
equip any authorized supply for free, including the same supply in both bays.
Credits are charged only for activations, when the run settles on victory, RTB,
or death. Settlement may put the pilot into debt. A first-clear sample is one
activation-fee waiver, not a stocked object.

Each bay has its own authorized charge count. It begins at one use and earns one
additional use per four completed campaign chapters after that bay unlocks, to
a provisional maximum of three. Cooldowns pace the combat input; the authorized
count and price create the strategic limit. Test Arsenal grants maximum bay
authorization and DEV fee waivers without altering campaign records.

### Shield Overcharge

- Set shields to 125% of maximum capacity.
- The extra shield does not decay; it remains until damage consumes it.
- A manually equipped supply can be used whenever it would increase shields.

### Armor Sealant

- Restore installed armor to 100%.
- It cannot overplate, repair hull, or be used by a ship without an armor module.
- It cannot be activated when armor is already full.

### Impulse supplies

- **Redline Impulse** adds 100% primary projectile impulse for 10 seconds. It is
  the short boss-window and crisis-clearing option.
- **Sustained Impulse** adds 40% primary projectile impulse for 30 seconds. It is
  the lower, longer pressure option.
- Both modify the existing `kineticImpulseBudget` shot construction rather than
  applying a generic damage multiplier. Kinetic shots become faster and gain
  speed-fed damage; plasma shots become larger, slower, and more explosive.
- Their activation lockout exactly matches their effect duration. If both
  distinct boosters overlap, their multipliers combine multiplicatively
  (`2.0 × 1.4 = 2.8×`). Reactivating the same booster refreshes its timer rather
  than multiplying a duplicate copy.
- Combat controls show the supply icon, remaining authorized charges, explicit
  activation affordance, and a duration/recharge sweep. Active impulse effects
  also draw separate countdown arcs around the ship, matching aux feedback.

Scripted shield and armor pickups are the exact same supplies. If at least 10%
of the applicable base layer is missing, the pickup activates immediately for
free. Otherwise it becomes a sealed recovery claim: victory or RTB credits the
full supply price at settlement, while death loses it. This preserves one item,
one behavior without adding temporary third and fourth combat buttons.

Consumables should be intentionally expensive enough that routine use is not
part of a profitable baseline clear. Each newly unlocked type grants an
activation-fee waiver so the mechanic can be learned, but final fee tuning
remains part of the full economy pass. The target contract is:

- an appropriately geared clear without consumables produces positive expected
  credits;
- a clear using one premium consumable is near break-even or negative before
  valuable item drops;
- repeated consumable use is a definite loss justified by a progression unlock
  or rare-drop gamble.

Per-bay authorization and cooldowns pace in-mission use, while settlement price
is the long-term strategic limit. The Credit Flow report includes one- and
two-activation net outcomes plus the maximum value of sealed field supplies;
that contingent recovery value is not counted in baseline mission income.

### Aux integration

- Cloak, EMP, and Bulwark remain itemized aux gear with rarity-scaled rolls.
  Do not recreate the retired permanent Aux Power investment ladder.
- The fresh pilot starts with a baseline Cloak. Mission 3 authorizes EMP and
  Mission 6 authorizes Bulwark; each authorization grants a baseline module and
  enables that family in drops and Ledger stock.
- The Act 1 balance pass should create readable reasons to try each role:
  repositioning/lock escape for Cloak, projectile and firing control for EMP,
  and surviving an announced pressure window for Bulwark.
- Tune item potency, cooldown, and rarity curves if a role is ineffective, but
  do not make an encounter immune to the other two merely to advertise one.

## 5. Gear acquisition and bad-luck protection

### Act 1

- Act 1 remains clearable with ordinary and Prototype gear. A lucky high-roll
  item may make it easier; that is a reward, not a balance defect.
- Area Control and Armor Break are not automatically owned. Mission rewards,
  field drops, and Ledger stock build role coverage over time, with the Mission
  4 requisition guaranteeing the first deliberate choice.
- Mid/late Act 1 first clears should deliberately provide Prototype weapon and
  defense coverage instead of relying exclusively on random field salvage.
- Last Light's first clear grants a **Pre-Founding commissioning package**:
  one role-labelled gold primary choice and one gold defense/aux choice. Offers
  must cover swarm, armor, and survivability roles rather than drawing two
  arbitrary items from the full pool.

### Current post-Last-Light campaign

- Every post-Last-Light boss first clear grants a Pre-Founding item or
  requisition choice. Repeat kills use improved but non-guaranteed act-aware
  tables.
- Crossed Claims, Processional, Repossession, The Green Signal, and Return
  Address use role- or lineage-weighted offers, but no route may strand the
  player without access to both swarm and armor answers.
- Post-Last-Light minibosses have at least a Prototype floor. Their gold chance
  is meaningful but not guaranteed.
- Ordinary field salvage may remain below gold, but act-aware rarity weights
  must improve. A later crafting/upgrade layer may give duplicate lower-tier
  items durable value; it is not required to ship the initial guarantee pass.
- First-clear rewards are idempotent. Replaying or switching mission variants
  must not duplicate a one-time commissioning package accidentally.

The goal is not to hand the player every best-in-slot item. It is to guarantee
enough role-complete material that experimentation, market purchases, branch
rewards, and lucky drops determine the build instead of determining whether a
build is possible at all.

## 6. Difficulty integration

Do not retune difficulty before the relevant capability exists on a normal
fresh-save route.

- Missions 1–2 teach movement, primary roles, and the first consumable. They do
  not assume a mini weapon, EMP, a second primary, or stocked reserves.
- Missions 3–5 may create explicit EMP, recovery, swap, and damage-window
  opportunities. The player should notice why the newly awarded tool is useful.
- Missions 6–8 may assume access to hull choice, Bulwark, two consumable types,
  and eventually two equipped consumable bays. They should remain beatable with
  Prototype gear and ordinary execution.
- The current post-Last-Light missions assume a cohesive gold build and access
  to the full Act 1 capability vocabulary. Tier 2 Dual Fire is the Return
  Address baseline; Tier 3/4 may outgear it.
- Consumables should improve survival or shorten a crisis, but no mission may
  require one exact consumable to avoid an otherwise unavoidable failure.
- The intended tier plus the intended weapon/defense role must clear with zero
  consumables. One expensive consumable may compensate temporarily for being
  under-tiered **or** missing one role; it should not rescue a build that is both
  badly under-tiered and fundamentally wrong for the encounter.

After the progression and consumable systems are playable, run a fresh-save
balance pass through Act 1 and the five validated missions. Raise pressure only
where the new tools make an encounter flat. Preserve weapon spectacle and
role-based counters; do not normalize exceptional builds.

## 7. Implementation slices

### Slice A — progression foundation

**Implemented and player-approved.** Mission ratings and the two-clear Act 1 chapter ladder are live.

1. Add `config/progression.json` with a validated, data-driven capability
   milestone and first-clear reward table derived from base mission clears. Add
   `scripts/validate_progression_config.js`; do not hide campaign requirements
   among mutable economy prices.
2. Gate mini, Primary B, consumable bays, aux authorizations, and hull licenses.
3. Replace the three-frame fresh inventory with the single weak Cadet contract;
   add the Mission 4 Certified role requisition and starter-vs-rarity balance
   report checks.
4. Keep locked controls visible with exact requirements and newly earned awards
   visible in debrief. Make Act 1 Hybrid/role routing and best mission ratings
   legible on the Mission Board.
5. Make Test Arsenal bypass all capability gates while enabled without changing
   earned milestones.
6. Migrate old saves safely. Existing advanced saves derive awards from
   completion records, keep collected inventory, and unequip newly locked slots
   unless Test Arsenal is active; no legacy-player preservation work should
   compromise the fresh-save design.

Stop for a short fresh-save chapter-pacing playtest before proceeding to Slice B.

### Slice B — consumables and pickup utility

**Implemented; awaiting the revised late-Act-1 supply playtest.** Final fee and
economy tuning remains intentionally deferred to the focused economy pass.

1. Route Shield Overcharge, Armor Sealant, Redline Impulse, and Sustained
   Impulse through validated config.
2. Equip supplies without prepayment; charge each activation at run settlement,
   permit debt, and grant per-bay uses through completed-chapter trust.
3. Give Shield Overcharge a non-decaying 125% target and Armor Sealant an exact
   full-armor repair. Route matching field pickups to free activation when at
   least 10% is missing or a sealed full-price recovery claim otherwise.
4. Replace samples with fee waivers and stock refills with DEV waivers.
5. Redesign the Armory as a ship-first workspace with compact supply bays, a
   temporary inventory drawer, immediate item popups, and optional comparison.
   Native delayed `title` tooltips are forbidden and validator-enforced.
6. Use conservative provisional prices, then defer final fee tuning to
   the focused economy pass. Extend Credit Flow and deterministic validation so
   the loss-leading contract is measurable.

Stop for a late-Act-1 consumable playtest before raising mission pressure.

### Slice C — guaranteed gear path

**Implementation status (2026-07-12): complete; awaiting the required fresh-save progression playtest.**

1. Implement idempotent first-clear requisitions and commissioning packages.
2. Add role-aware offer generation and act-aware rarity tables.
3. Ensure Last Light produces a coherent gold entry package.
4. Ensure each current post-Last-Light boss advances or broadens the player's
   gold build.
5. Surface source/provenance and first-clear status in reward UI.

Stop for a fresh-save progression run. The required question is whether the
player can reach and beat the current campaign without Test Arsenal, not whether
every possible random roll appeared.

### Slice D — authored balance pass

1. Review Missions 1–8 in unlock order with the real acquisition path.
2. Add difficulty only after the matching tool is introduced.
3. Recheck all five post-Last-Light missions with earned gold equipment and
   authorized mission supplies.
4. Preserve validated encounter identities; change only failures revealed by
   the real progression run.

Assessor lien readability may be verified during this pass but does not block
the progression foundation.

## 8. Acceptance

- A fresh pilot can launch Mission 1 immediately but cannot use mini, Primary B,
  advanced aux modules, named hulls, consumable Bay 2, or Dual Fire early.
- A fresh pilot owns only the Cadet Kinetic Frame; its effective starter-hull DPS
  is approximately 150–180 and remains below the Certified primary median.
- Mission 1 Hybrid opens its Swarm and Armored contracts; either role clear opens
  Mission 2 and grants the Mission 1 chapter award. The same pattern continues
  through Act 1.
- Completed mission profiles show a best percentage and grade; only 100% earns SS.
- Pilot Rank responds to best completed mission ratings rather than credits.
- Mission 2 grants a visible choose-one Certified mini requisition.
- Mission 4 grants a real Certified weapon choice when Primary B unlocks.
- Every locked capability states the mission that awards it.
- Each newly authorized aux/consumable can be tried immediately through a free
  baseline sample.
- Shield Overcharge reaches a persistent 125%; Armor Sealant repairs installed
  armor to exactly 100% and does not overplate or repair hull.
- Field recovery supplies auto-activate only when at least 10% of the base layer
  is missing; otherwise a successful extraction receives their full credit value.
- Every mission remains clearable at its intended gear tier and role without
  consumables. Premium consumables can enable a deliberately loss-leading early
  clear but are not included in the normal difficulty baseline.
- Last Light produces a coherent gold primary plus defense/aux starting point.
- A normal player can assemble multiple gold role combinations across the five
  post-Last-Light missions without Test Arsenal.
- No current mission requires Heirloom gear.
- Test Arsenal can still expose all items, infinite wallet/fee waivers, and exact
  capability/Dual Fire states for human testing.
- Automated validation covers milestone derivation, first-clear idempotence,
  role-aware offer coverage, supply effects, save migration, and dev
  bypass behavior.
- Codex runs deterministic validation and focused smoke tests. Adam performs the
  meaningful combat and full fresh-save playtest.

## 9. What follows this pass

1. Close remaining small observations such as Assessor lien readability and any
   progression-run UI friction.
2. Execute the story/economy arc in order: **The Bill Arrives**, **Planet
   Raids**, then **The Fork**.
3. Re-author a canonical Act 3 mission by mission using the proven human
   playtest loop. Reuse Probate's invasion premise, pressure doctrine,
   rammers/latches, mothership integrity, art, boss phases, and Heirloom plumbing;
   do not restore its discarded levels as campaign canon.
4. Act 3 bosses guarantee a first-clear Heirloom and minibosses have a lower
   chance. The Fork may alter Act 3 framing, contracts, or allies, but **The
   Fork is not itself Act 3**.

No new campaign mission, Act 3 music pass, item durability, certification
system, or third ending is part of Slices A–D.

## 10. Documentation authority

For the next implementation pass, read in this order:

1. `STATE.md` for current behavior and validation;
2. this spec for authorized next work;
3. `PROGRESSION_MASTER_PLAN.md` for combat philosophy and validated missions;
4. `ROADMAP.md` for longer execution order;
5. `CURRENT_SYSTEMS.md`, `ECONOMY_DESIGN.md`, and `UI_DESIGN.md` for subsystem
   detail;
6. `ACT2_SILENT_LINEAGES_DESIGN.md`, `ACT3_PROBATE_DESIGN.md`, and discarded
   levels only as creative/mechanical references.

When this spec is fully implemented, move it to
`outdated_docs/implemented_specs/` and update `STATE.md`, `CURRENT_SYSTEMS.md`,
and `ROADMAP.md` in the same commit.
