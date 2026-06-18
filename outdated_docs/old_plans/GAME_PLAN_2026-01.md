# Space Shooter Game Plan

*Last updated: 2026-01-26*
*Status: Active development + new design direction*

---

## 📍 Current State Summary

### What's Working Well
- **5 levels** with JSON-based definitions (enemies, patterns, bosses)
- **Cloaking device** - enemies stop targeting you when cloaked ✨
- **Mobile + Desktop** support with touch controls
- **Mothership/drone theme** - earn credits, unlock better gear
- **Debug checkbox** for testing levels
- **Boss fights** that end levels

### What Needs Work
- Upgrade system feels generic ("+8% hull per level" etc.)
- Alt-fire weapons (Rocket/Arc) are underwhelming
- Story logic has gaps (eject button, immortal pilots?)
- Limited variety in abilities/playstyles
- Bosses are just bigger enemies with radial fire

---

## ✅ Workflow: Commit + Push After Each Task

Standard procedure (per Adam): **always commit and push** at the end of any change set so Vercel updates for playtesting.

---

## 🎯 Priority 1: Alt-Fire Overhaul

### The Problem
Rocket and Arc feel like "different shaped bullets." Cloaking is interesting because it changes *how you play*, not just damage numbers.

### Philosophy
Each ability should create a **decision moment** - "should I use this now or save it?"

### Proposed Abilities (Keep Cloaking, Replace Others)

| Ability | Description | Strategic Use |
|---------|-------------|---------------|
| **Cloaking Device** ✨ | Become invisible for 2.5s. Enemies lose lock. | Escape danger, reposition, survive bullet hell |
| **EMP Burst** | Short-range pulse that disables enemy fire for 1.5s and briefly slows them | Create breathing room, approach bosses |
| **Afterburner** | Massive speed boost for 1s + brief invulnerability frames | Dodge through bullet patterns, emergency escape |
| **Decoy Drone** | Deploy a stationary decoy that draws enemy fire for 3s | Redirect aggro, set up flanking, bait boss attacks |
| **Shield Overcharge** | Instantly restore shields + 2s of boosted regen | Defensive emergency, before big damage phases |

### Unlock System
- Start with **Cloaking** (your best one, no paywall)
- Unlock others via **pilot rank** (lifetime credits) not purchase
- Each ability has its own cooldown upgrade path

### Mobile Controls
Add a **second ability slot** with a dedicated button:
```
[  ALT 1  ]   [  ALT 2  ]   [ EJECT ]
```
Desktop: RMB for primary ability, keyboard (Q/Shift) for secondary

---

## 🎯 Priority 2: Upgrade System Rework

### The Problem
Current upgrades are "make numbers bigger" - no interesting choices.

### Proposed: Specialization Trees

Instead of 8 linear upgrades, create **3 playstyle paths**:

#### 🔴 Assault Path (Glass Cannon)
- Faster fire rate, higher damage
- Spread shot evolves into **homing** or **pierce**
- Reduced cooldowns on offensive abilities
- Trade-off: Less hull/shield capacity

#### 🔵 Defense Path (Tank)
- More hull, faster shield regen
- **Ramming damage** - hurt enemies you collide with
- Abilities like Shield Overcharge get buffed
- Trade-off: Slower fire rate, less damage

#### 🟢 Stealth Path (Trickster)
- Extended cloak duration, faster cloak cooldown
- **Backstab bonus** - extra damage when cloaked
- Decoy improvements (exploding decoys, multiple decoys)
- Trade-off: Lower base stats, relies on abilities

### How It Works
- Each path has 5 tiers
- You can mix paths, but specializing gives **synergy bonuses**
- Respec available at cost (encourages commitment but not punishment)

### Visual Feedback
- Ship appearance changes based on path (different player sprites available!)
- Assault: Red/orange ship
- Defense: Blue ship with visible shield
- Stealth: Green ship with cloaking shimmer

---

## 🎯 Priority 3: Story & Theme Refinement

### Current Confusion
- Are they drones or manned fighters?
- Why eject if you're immortal?
- What happens to destroyed ships?

### Proposed Story: "Neural Linked Drones"

**The Setup:**
> The Mothership carries millions of combat drones, each linked to a pilot's neural interface. When a drone is destroyed, the pilot feels the shock - and the Fleet charges them for the loss. Skilled pilots who bring drones back intact earn bonuses. The best pilots eventually earn the right to fly the irreplaceable manned interceptors.

**Gameplay Implications:**

| Action | Narrative | Mechanical Effect |
|--------|-----------|-------------------|
| **Destroyed** | Drone lost, neural shock, Fleet bills you | Lose 10-40% of mission credits |
| **Eject (RTB)** | Drone self-destructs, pilot preserved | Keep all credits, no bonus |
| **Complete Mission** | Drone recovered, pilot commended | Full credits + **recovery bonus** (10-25%) |

### "Return to Base" Instead of Eject
- Rename button to **RTB** or **Recall**
- Animation: Drone flies up and off screen
- Makes more sense than "ejecting" from a drone

### Progression Story Beats
Each level could have brief mission briefings:
- Level 1: "Training run. Show us what you've got, pilot."
- Level 3: "Enemy ace squadron detected. High risk, high reward."
- Level 5: "The Annihilation Fleet approaches. All drones deploy."

### Future: Manned Ship Unlock?
At max pilot rank, unlock a **special manned fighter**:
- Can't be destroyed (mission fails if hull hits 0)
- No credit penalty, but if you fail, you lose a run attempt
- Different abilities (pilot skill vs drone tools)
- This could be the "prestige" content

---

## 🎯 Priority 4: Boss Improvements

### Current Problem
Bosses are just big UFOs with radial fire patterns.

### Proposed: Distinct Boss Personalities

#### Level 1: Scout Commander
- Pattern: Predictable sweeps
- Weak point: Glowing core (bonus damage)
- Teaching moment: "Bosses have patterns you can learn"

#### Level 3: Shielded Destroyer
- Has rotating shield segments you must break
- Spawns minions during shield phases
- Requires patience and target prioritization

#### Level 5: The Annihilator
- Multiple phases (each with different attacks)
- Phase 1: Chase pattern, homing missiles
- Phase 2: Stationary, massive bullet hell
- Phase 3: Desperate ramming + spawns

### Visual Differentiation
- Different sprites per boss (currently all use `ufoRed.png`)
- Could composite existing assets or find additional CC0 packs
- Health bar styling per boss

### New Asset Ideas
The current Kenney pack has limited boss options. Consider:
- [Kenney's Space Shooter Extension](https://kenney.nl/assets/space-shooter-extension) (also CC0)
- Composite larger ships from existing parts (`PNG/Parts/` folder exists)
- Different color UFOs for different bosses (already have blue, green, yellow, red)

---

## 🎯 Priority 5: Quality of Life

### Immediate Fixes
- [ ] Show cooldown timers more clearly on mobile
- [ ] Add audio toggle in hangar (currently just on first interaction)
- [ ] Pause menu with options (not just P key)

### Polish Ideas
- Screen shake on big hits
- Particle trails on fast enemies
- Credit pickup animation (currently just popup text)
- "Personal best" tracking per level

---

---

## 🚨 Immediate Fixes (from Adam's playtest)

### Mobile UX (do first)
- [ ] Add **pause button** for mobile
- [ ] Collapsible/minimal HUD option - maybe just show hull bar, hide the rest until tapped

### Difficulty & Pacing
- [ ] **Longer levels** - more waves before boss
- [ ] **Steeper difficulty curve** - missions 1-3 should still challenge, force some replays
- [ ] **Harder bosses** - more HP, faster patterns, more bullet density

### Cloaking Device Rework
Current problem: hiding for 2.5s doesn't matter in a swarm.

Options to consider:
1. **Cloak + Damage Burst** - uncloak deals AoE damage
2. **Extended Duration** - 4-5s instead of 2.5s
3. **Cloak Resets Position** - enemies lose aggro AND you get brief invuln frames
4. **Cloak = Bullet Time** - slow enemies while cloaked, you still move full speed

---

## 🛠 Implementation Order (Suggested)

### Phase 1: Core Feel (1-2 sessions)
1. Replace Rocket/Arc with EMP Burst and Afterburner
2. Add RTB rename and recovery bonus mechanic
3. Clean up upgrade descriptions to be clearer

### Phase 2: Depth (2-3 sessions)
1. Implement specialization trees (start with Assault/Defense)
2. Add second ability slot + mobile button
3. Ship visual changes based on path

### Phase 3: Content (2-3 sessions)
1. Distinct boss mechanics for each level
2. Mission briefings/story text
3. Source or create additional boss assets

### Phase 4: Polish (ongoing)
1. Screen shake, particles, juice
2. Sound improvements
3. Personal bests, achievements

---

## 💬 Discussion Points for Adam

1. **Abilities**: Do EMP/Afterburner/Decoy sound fun? Other ideas?
2. **Specialization Trees**: Too complex? Want to keep it simpler?
3. **Story**: Does the "neural-linked drone" angle work?
4. **Boss Phases**: Worth the complexity or keep bosses simple?
5. **New Assets**: Should we look for more art packs, or work with what we have?
6. **Mobile Priority**: Is mobile your primary target or secondary?

---

## 📝 Notes from Adam
*(To be filled in during discussion)*

---

## Open Questions

- What's the token budget for Codex sessions? (Affects how much we tackle per session)
- Any monetization plans? (Affects progression pacing)
- Target platform: Web only? Or also native mobile later?

---

## 🧠 Notes from Codex (my thoughts)

Below are my additions and reactions after reading Sonja's draft. I kept them separate so it's clear what is new.

### ✅ High-value ideas to prioritize
- **Ability overhaul** is the best ROI. Cloak already proves the point: effects that change *how* you play are more fun than +damage. I'd keep Cloak and add 1-2 more ability types before building full trees.
- **Story framing with neural-linked drones** is clean and mechanically useful (explains eject/penalty). It also gives you a UI narrative hook for "recovery bonus."
- **Boss differentiation** will dramatically improve perceived content even if levels are short. If we do nothing else, give each boss a signature attack + unique sprite color.

### 🔧 Adjustments I'd suggest
- **Level selection should show a "Recommended" tag** for the next unlocked level so new players don't feel stuck deciding.
- **Upgrade system: add just 3-4 meaningful choices first** (ex: shield regen vs hull regen vs damage vs cloak cooldown). Then, if it feels good, expand to trees. This reduces risk of overdesigning too early.
- **Mobile: avoid two ability buttons at first**. It's easy to add later. We can start with one ability slot and test if users feel overloaded.

### 🔁 Gameplay loop + progression tweaks
- **Recovery bonus for mission completion** feels important and should be visible. Example: "+15% recovery bonus" in debrief.
- **Credits should be per-mission and per-kill** (you already have kill credit popups). That can evolve into "bonus payouts" later.
- **Unlock abilities via pilot rank** (as Sonja suggests) but keep the first new unlock very early (ex: at 250 lifetime credits) so players feel progression quickly.

### 👾 Boss improvements that are cheap but effective
- **Telegraphing**: slight glow or scaling before a radial blast.
- **Phases**: even 2 phases are enough (e.g., sweep → stationary turret).
- **Weak point**: make a hitbox on the core for +25% damage, even if it's just a circle overlay.

### 🎨 Visual variety with current assets
We can get more mileage without new art by:
- **Palette swaps** (enemyBlue/Red/Green/Black variants already exist).
- **Composite ships** from `PNG/Parts/` to create mini-bosses.
- **Different bullets per enemy class** (already started): orbs, spread, slow blobs, fast needles.

### ✅ Proposed next 2-step plan (if we want to keep it lean)
1) **Abilities**: replace Rocket/Arc with EMP + Afterburner, add cooldown upgrade, add recovery bonus.
2) **Boss**: 2-phase pattern per level + boss health bar.

### ⚠️ Risks / watch-outs
- **Power creep** from too many systems too soon (abilities + trees + bosses). We should lock one system per sprint.
- **Mobile UI** can get cluttered fast. I'd keep one ability slot until we see usage data.

---

## 📝 Notes from Adam

### Playtest Feedback (Jan 25, mobile)

**Progression:**
- Levels too short
- Difficulty ramps too slowly - beat missions 1-4 without grinding
- Only mission 5 required retries and upgrades (shields/armor)
- Bosses are too easy

**Cloaking Device:**
- Not impactful with current enemy density
- A few seconds of hiding doesn't matter when there are swarms
- Needs rethink: longer duration? damage bonus after? enemy clear on activation?

**Mobile UX:**
- HUD takes up too much screen space - consider hiding/minimizing it
- **Need a pause button** on mobile (critical!)

**Positive:**
- Game is actually playable on mobile now! ✅
- New enemy variety is slightly interesting
- Laser graphics variety was a big improvement

---

## 📝 Notes from Adam (clarification)

Adam note: Specialization trees are one possible solution to "boring upgrades," but not the only one. The core goal is a loop where replaying earlier levels to power up for later ones feels **worth it and interesting**. That means upgrades should meaningfully increase DPS/defense while also creating **distinct play decisions**. We may need a separate brainstorm/planning session and build a few candidate systems to test before committing.

### Design Direction (Jan 26 brainstorm with Sonja)

**Decided:** Move away from specialization trees toward **modular weapons + investment economy**.

Key points from discussion:
- Modular weapons: assemble from components (barrel, trigger, payload, modifier) — creates build variety through combinatorics
- Investment economy: spend credits on mothership infrastructure (Engineering Bay, Operations Center, Fleet Shares) for long-term benefits
- Fleet Shares use the "lay" system from whaling ships — you buy shares in fleet profits
- Operations Center unlocks mission **variants** (Patrol, Skirmish, Siege, Elite) to solve the "replay same 5 levels" problem
- Intel Division concept dropped since levels are hand-crafted, not procedural
- This adds Darkest Dungeon-style depth without turning the game into a city builder

See **Priority 6** for full details.

---

## ✅ Implementation Status (as of 2026-01-26)

### Phase 1 (Core Feel) - Completed
- **Alt-fire overhaul**: Rocket/Arc removed; Cloak + EMP Burst + Bulwark Field implemented.
- **EMP**: disables enemy firing, slows movement, adds spark visuals on enemies.
- **Bulwark**: temporary +shield buffer (not invulnerable), cooldown starts after effect ends.
- **Cloak**: enemies lose lock while cloaked.
- **Recovery bonus**: mission completion grants +10-25% credits, shown in debrief.
- **Audio tweaks**: bulwark activation uses shorter force field sound.

### Level/Content - Implemented
- **Level select screen** with unlock progression + debug unlock toggle.
- **5 levels** with JSON definitions and boss endings.
- **Boss ETA progress bar** in HUD.
- **New enemy behaviors**: zigzag, swoop, strafe, spiral, stalker (aggro radius), hunters.
- **Boss firing patterns**: radial volleys + variable bullet speeds.

### UX/Controls - Implemented
- **Mobile + desktop controls** with touch auto-fire and contextual buttons.
- **Hangar fixes**: scrollable panel, sticky actions, mobile launch button.
- **Shop UX improvements**: aux selection at top, clearer costs, locked styling.

---

## ✅ New Levels Added (2026-01-26, Sonja)

Branch: `sonja/new-levels` — PR pending review

### Main Campaign Levels

| Level | Name | Difficulty | Duration | Boss HP | Notes |
|-------|------|------------|----------|---------|-------|
| 6 | Crimson Fleet | Very Hard | ~70s | 1800 | Two "captain" mini-bosses (ufoYellow) before main boss |
| 7 | The Gauntlet | Hell | ~94s | 2200 | Seven distinct waves, survival-focused, new "reaper" enemy (hunter + spread fire) |
| 8 | Last Light | Ultimate | ~98s | 2800 | Final challenge, "elite" enemy type (radial fire small ship), two overseer guardians |

### Variant Levels (Operations Center examples)

| File | Base | Variant Type | Notes |
|------|------|--------------|-------|
| level1_patrol.json | Level 1 | Patrol | Different enemy mix (more scouts, "interceptor" type), blue boss |
| level2_skirmish.json | Level 2 | Skirmish | 50% shorter, higher density, +25% credits (creditMultiplier field) |

**Integration note:** Variant levels are defined but commented out in `availableLevels`. Once Operations Center is implemented, uncomment and add UI for variant selection.

### New Enemy Types Introduced

| Enemy | First Appears | Sprite | Behavior |
|-------|---------------|--------|----------|
| captain | Level 6 | ufoYellow | Mini-boss, strafe pattern, radial fire |
| reaper | Level 7 | enemyBlack4 | Hunter AI + spread fire combo |
| elite | Level 8 | enemyBlack3 | Spiral pattern + radial fire (small but deadly) |
| interceptor | L1 Patrol | enemyBlue3 | Fast swoop pattern |

---

## 📌 Current Focus (Next Steps)

### Economy System UI (2026-01-26, Sonja)

Branch: `sonja/economy-tab` — PR pending

**Implemented:**
- Fleet Investments section in hangar UI
- Three investment categories: Engineering Bay, Operations Center, Fleet Shares
- 5-tier progression for each category with increasing costs
- Visual tier display with unlocked/locked/next benefit indicators
- Fleet Shares dividend calculation integrated into mission debrief
- Dividends shown in debrief message and added to total credits

**Not yet implemented:**
- Actual consumables (Engineering Bay unlocks)
- Mission variants (Operations Center unlocks) 
- Fleet events and contracts (higher Fleet Shares tiers)

These are UI/economy scaffolding — the mechanical effects will need separate implementation.

---

### Phase 1: Step 2 (Depth Lite)
- **Ability balance pass** (cooldowns/durations, bulwark shield size).
- **Visual polish**: EMP ring pulse, bulwark shield meter/flash.
- **Ability UI**: clearer ability cooldown feedback (desktop + mobile).

### Phase 2 (Depth)
- **Specialization system (TBD)**: brainstorm + prototype 2-3 upgrade structures.
- **Boss identity**: unique patterns + weak points per level.
- **Progression story beats**: brief mission briefings per level.

---

## 🧪 Open Questions
- Should we keep the current single ability slot or add a second slot (mobile + desktop)?
- How strong should replay incentives be (credit multipliers, rare drops, rank bonuses)?
- Do we want to introduce a "manned interceptor" endgame tier or stay with drones?

---

## 🚀 Priority 6: Modular Weapons + Economy System

*Added 2026-01-26 from Adam + Sonja brainstorm session*

### The Problem With Current Upgrades

The existing upgrade system (and the proposed Specialization Trees) still boils down to "pick which numbers go up." Even named tiers like "Mini Laser → Mid Laser → Mega Laser" are just wrapping. We want upgrades that change **how you play**, not just how much damage you deal.

**Goal:** Create a system where replaying earlier levels to power up feels **worth it and interesting** — with distinct play decisions, not just accumulation.

---

### Solution Part 1: Modular Weapon Building

Instead of linear weapon upgrades, players **assemble weapons from components**:

#### Component Types

| Slot | Options | Effect |
|------|---------|--------|
| **Barrel** | Focused, Spread, Orbiting, Rear-fire | Determines shot pattern |
| **Trigger** | Rapid, Charged, Burst, Rhythmic | Determines timing/feel |
| **Payload** | Kinetic, Plasma (DOT), EMP (disable), Tether (link enemies) | Determines damage type |
| **Modifier** | Pierce, Homing, Ricochet, Vampiric | Determines special behavior |

#### Example Builds
- **Sniper:** Focused + Charged + Kinetic + Pierce → Big single shots that go through enemies
- **Chaos:** Spread + Rapid + Plasma + Ricochet → DOT everywhere, bouncing between targets
- **Controller:** Orbiting + Burst + Tether + Homing → Shots orbit you, then seek and link enemies
- **Berserker:** Spread + Rapid + Kinetic + Vampiric → Heal by killing, spray and pray

#### Unlock Progression
- Start with basic components (Focused, Rapid, Kinetic, none)
- Unlock new components via **pilot rank** (lifetime credits)
- Higher-tier versions of components available later (Focused II = tighter beam, more damage)

#### Why This Works
- Massive variety from combinatorics (4×4×4×4 = 256 combinations)
- Players discover synergies organically
- "Build identity" emerges without rigid class trees
- Easy to add new components over time

---

### Solution Part 2: Mothership Investment Economy

Inspired by whaling ship "lays" — crew bought shares in voyage profits. Your pilot does the same.

#### The Narrative

> The Mothership houses millions — engineers, intel officers, traders, families. Credits aren't just your salary; they're the fleet's currency. When you invest in fleet operations, you're betting on the collective success. The better the fleet does, the better your returns.

#### Three Investment Categories

##### 🔧 Engineering Bay
| Tier | Cost | Effect |
|------|------|--------|
| 1 | 200 | Unlock consumable crafting (basic bombs) |
| 2 | 500 | Reduce repair costs by 25% |
| 3 | 1000 | Unlock advanced consumables (temp shields, speed stims) |
| 4 | 2000 | Consumables auto-regenerate between missions |
| 5 | 4000 | Prototype gear: random powerful consumable each mission |

**Feel:** "I have more tools in my kit"

##### 📡 Operations Center (replaces Intel Division)
Since levels are hand-crafted (not random), pure "intel" is less useful. Instead, this unlocks **mission variants**.

| Tier | Cost | Effect |
|------|------|--------|
| 1 | 200 | Unlock **Patrol** variants (same difficulty, different enemy mix) |
| 2 | 500 | Unlock **Bonus Objectives** (+credits for specific challenges) |
| 3 | 1000 | Unlock **Skirmish** variants (shorter, more intense, higher payout) |
| 4 | 2000 | Unlock **Siege** variants (longer, waves-based, survival focus) |
| 5 | 4000 | Unlock **Elite** modifier (any mission, 2x difficulty, 3x credits) |

**Feel:** "I choose how I want to engage"

This solves the "replay the same 5 levels" problem — each level becomes a family of variants.

##### 💰 Fleet Shares (the "lay")
| Tier | Cost | Effect |
|------|------|--------|
| 1 | 300 | +5% passive credits per mission (fleet dividends) |
| 2 | 800 | +10% passive credits |
| 3 | 1500 | Fleet events: occasional bonus payouts between missions |
| 4 | 3000 | +15% passive + access to "Fleet Contracts" (special high-reward missions) |
| 5 | 6000 | +20% passive + share of boss bounties fleet-wide |

**Feel:** "My money is working for me"

#### Investment Philosophy
- **Optional, not required** — you can beat the game without investing
- **Long-term payoff** — investments compound, rewarding patience
- **Opportunity cost** — credits spent on investments aren't spent on your drone
- **Visible returns** — show dividend income in mission debrief

---

### How These Systems Interact

```
┌─────────────────────────────────────────────────────────────┐
│                    MISSION SELECT                           │
│  Level 3: Asteroid Belt                                     │
│  ├── Standard (unlocked)                                    │
│  ├── Patrol Alpha (Ops Center tier 1)                       │
│  ├── Skirmish (Ops Center tier 3)                          │
│  └── Elite (Ops Center tier 5) [2x difficulty, 3x credits] │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    LOADOUT SELECT                           │
│  Weapon: [Spread] + [Burst] + [Plasma] + [Ricochet]        │
│  Ability: [Cloak] [EMP Burst]                              │
│  Consumables: [Bomb x2] [Shield Stim x1]                   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    MISSION COMPLETE                         │
│  Base Credits:        450                                   │
│  Recovery Bonus:      +67 (15%)                            │
│  Bonus Objective:     +100 (killed 10 hunters)             │
│  Fleet Dividends:     +62 (10% passive)                    │
│  ─────────────────────────────                             │
│  Total:               679 credits                          │
└─────────────────────────────────────────────────────────────┘
```

---

### Mission Variant System (Darkest Dungeon Style)

Each base level spawns multiple playable variants:

| Base Level | Variants Available |
|------------|-------------------|
| Level 1: Training Grounds | Standard, Patrol A, Patrol B, Skirmish |
| Level 2: Debris Field | Standard, Patrol A, Siege, Skirmish |
| Level 3: Asteroid Belt | Standard, Patrol A, Patrol B, Skirmish, Siege |
| Level 4: Enemy Territory | Standard, Skirmish, Siege, Elite |
| Level 5: The Annihilator | Standard, Elite |

**Variant definitions:**
- **Standard:** The designed level as-is
- **Patrol:** Same difficulty, different enemy composition (reuse enemy spawner with different JSON)
- **Skirmish:** 50% length, 30% more enemy density, +25% credits
- **Siege:** 200% length, waves-based with brief pauses, +50% credits
- **Elite:** Standard but 2x enemy HP/damage, 3x credits

This gives ~15-20 "missions" from 5 base levels without designing new content.

---

### Integration With Existing Systems

| Existing System | How It Fits |
|-----------------|-------------|
| **Abilities (Cloak/EMP/Bulwark)** | Keep as-is. Abilities are separate from weapon mods. |
| **Specialization Trees** | **Replace** with modular weapons. Trees were solving the same problem less elegantly. |
| **Recovery Bonus** | Keep. Adds to mission debrief alongside dividends. |
| **Pilot Rank** | Expands to unlock components + investment tiers |
| **Boss Improvements** | Independent. Still want distinct boss patterns. |

---

### Implementation Order

#### Phase A: Modular Weapons (2-3 sessions)
1. Refactor weapon system to use component slots
2. Implement 2-3 options per slot (start simple)
3. Add weapon builder UI in hangar
4. Test combinations, balance damage curves

#### Phase B: Investment Economy (2-3 sessions)
1. Add Engineering Bay (consumables first)
2. Add Fleet Shares (passive income)
3. Add Operations Center (mission variants)
4. Tune costs/payoffs

#### Phase C: Mission Variants (1-2 sessions)
1. Create Patrol variants (alternate enemy JSON)
2. Create Skirmish/Siege modifiers (length + density)
3. Add Elite modifier
4. Update mission select UI

---

### Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Too complex for casual players | Keep defaults simple; depth is optional |
| Balancing 256 weapon combos | Most combos are "viable"; tune outliers |
| Investment math breaks progression | Test with spreadsheet before implementing |
| UI clutter | Hangar screens stay separate; don't overload combat HUD |
| Scope creep | Phase A alone is a major improvement; B and C can wait |

---

### Open Design Questions

1. **Component rarity?** Should some components be rare drops vs. rank unlocks?
2. **Respec cost?** Can players freely swap components, or is there friction?
3. **Visual feedback?** Should weapon appearance change based on components?
4. **Synergy bonuses?** Explicit bonuses for certain combos, or emergent only?
