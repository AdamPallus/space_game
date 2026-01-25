# Space Shooter Game Plan

*Last updated: 2026-01-25*
*Status: Draft for discussion*

---

## 📍 Current State Summary

### What's Working Well
- **5 levels** with JSON-based definitions (enemies, patterns, bosses)
- **Cloaking device** — enemies stop targeting you when cloaked ✨
- **Mobile + Desktop** support with touch controls
- **Mothership/drone theme** — earn credits, unlock better gear
- **Debug checkbox** for testing levels
- **Boss fights** that end levels

### What Needs Work
- Upgrade system feels generic ("+8% hull per level" etc.)
- Alt-fire weapons (Rocket/Arc) are underwhelming
- Story logic has gaps (eject button, immortal pilots?)
- Limited variety in abilities/playstyles
- Bosses are just bigger enemies with radial fire

---

## 🎯 Priority 1: Alt-Fire Overhaul

### The Problem
Rocket and Arc feel like "different shaped bullets." Cloaking is interesting because it changes *how you play*, not just damage numbers.

### Philosophy
Each ability should create a **decision moment** — "should I use this now or save it?"

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
Current upgrades are "make numbers bigger" — no interesting choices.

### Proposed: Specialization Trees

Instead of 8 linear upgrades, create **3 playstyle paths**:

#### 🔴 Assault Path (Glass Cannon)
- Faster fire rate, higher damage
- Spread shot evolves into **homing** or **pierce**
- Reduced cooldowns on offensive abilities
- Trade-off: Less hull/shield capacity

#### 🔵 Defense Path (Tank)
- More hull, faster shield regen
- **Ramming damage** — hurt enemies you collide with
- Abilities like Shield Overcharge get buffed
- Trade-off: Slower fire rate, less damage

#### 🟢 Stealth Path (Trickster)
- Extended cloak duration, faster cloak cooldown
- **Backstab bonus** — extra damage when cloaked
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
> The Mothership carries millions of combat drones, each linked to a pilot's neural interface. When a drone is destroyed, the pilot feels the shock — and the Fleet charges them for the loss. Skilled pilots who bring drones back intact earn bonuses. The best pilots eventually earn the right to fly the irreplaceable manned interceptors.

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
- [ ] Collapsible/minimal HUD option — maybe just show hull bar, hide the rest until tapped

### Difficulty & Pacing
- [ ] **Longer levels** — more waves before boss
- [ ] **Steeper difficulty curve** — missions 1-3 should still challenge, force some replays
- [ ] **Harder bosses** — more HP, faster patterns, more bullet density

### Cloaking Device Rework
Current problem: hiding for 2.5s doesn't matter in a swarm.

Options to consider:
1. **Cloak + Damage Burst** — uncloak deals AoE damage
2. **Extended Duration** — 4-5s instead of 2.5s
3. **Cloak Resets Position** — enemies lose aggro AND you get brief invuln frames
4. **Cloak = Bullet Time** — slow enemies while cloaked, you still move full speed

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

Below are my additions and reactions after reading Sonja’s draft. I kept them separate so it’s clear what is new.

### ✅ High‑value ideas to prioritize
- **Ability overhaul** is the best ROI. Cloak already proves the point: effects that change *how* you play are more fun than +damage. I’d keep Cloak and add 1–2 more ability types before building full trees.
- **Story framing with neural‑linked drones** is clean and mechanically useful (explains eject/penalty). It also gives you a UI narrative hook for “recovery bonus.”
- **Boss differentiation** will dramatically improve perceived content even if levels are short. If we do nothing else, give each boss a signature attack + unique sprite color.

### 🔧 Adjustments I’d suggest
- **Level selection should show a “Recommended” tag** for the next unlocked level so new players don’t feel stuck deciding.
- **Upgrade system: add just 3–4 meaningful choices first** (ex: shield regen vs hull regen vs damage vs cloak cooldown). Then, if it feels good, expand to trees. This reduces risk of overdesigning too early.
- **Mobile: avoid two ability buttons at first**. It’s easy to add later. We can start with one ability slot and test if users feel overloaded.

### 🔁 Gameplay loop + progression tweaks
- **Recovery bonus for mission completion** feels important and should be visible. Example: “+15% recovery bonus” in debrief.
- **Credits should be per‑mission and per‑kill** (you already have kill credit popups). That can evolve into “bonus payouts” later.
- **Unlock abilities via pilot rank** (as Sonja suggests) but keep the first new unlock very early (ex: at 250 lifetime credits) so players feel progression quickly.

### 👾 Boss improvements that are cheap but effective
- **Telegraphing**: slight glow or scaling before a radial blast.
- **Phases**: even 2 phases are enough (e.g., sweep → stationary turret).
- **Weak point**: make a hitbox on the core for +25% damage, even if it’s just a circle overlay.

### 🎨 Visual variety with current assets
We can get more mileage without new art by:
- **Palette swaps** (enemyBlue/Red/Green/Black variants already exist).
- **Composite ships** from `PNG/Parts/` to create mini‑bosses.
- **Different bullets per enemy class** (already started): orbs, spread, slow blobs, fast needles.

### ✅ Proposed next 2‑step plan (if we want to keep it lean)
1) **Abilities**: replace Rocket/Arc with EMP + Afterburner, add cooldown upgrade, add recovery bonus.
2) **Boss**: 2‑phase pattern per level + boss health bar.

### ⚠️ Risks / watch‑outs
- **Power creep** from too many systems too soon (abilities + trees + bosses). We should lock one system per sprint.
- **Mobile UI** can get cluttered fast. I’d keep one ability slot until we see usage data.

---

## 📝 Notes from Adam

### Playtest Feedback (Jan 25, mobile)

**Progression:**
- Levels too short
- Difficulty ramps too slowly — beat missions 1-4 without grinding
- Only mission 5 required retries and upgrades (shields/armor)
- Bosses are too easy

**Cloaking Device:**
- Not impactful with current enemy density
- A few seconds of hiding doesn't matter when there are swarms
- Needs rethink: longer duration? damage bonus after? enemy clear on activation?

**Mobile UX:**
- HUD takes up too much screen space — consider hiding/minimizing it
- **Need a pause button** on mobile (critical!)

**Positive:**
- Game is actually playable on mobile now! ✅
- New enemy variety is slightly interesting
- Laser graphics variety was a big improvement
