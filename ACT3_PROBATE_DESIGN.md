# Act 3: Probate — Design & Combat Doctrine

Status: active design (Claude, 2026-07-03). Written in direct response to the
Act 2 playtest verdict: the levels were not fun because nothing tried to kill
the player. This doc leads with the combat doctrine because that failure was
systemic, not cosmetic. Act 2 stays as-is until Act 3 teaches us what fun
measures like; then it gets a combat-only pass.

## The premise: They Followed You Home

The black box from the Origin Hull is not a recording — it is a probate
notice. The Founders' estate is open, every lineage is an heir, and the
player's mothership is now the registry of record. The Chorus, the Tithe, and
the Verdant stop drifting and start *converging* — on home. Act 3 is a
defense campaign: the player is the picket line, the mothership is behind
them, and everything on screen wants to get **past** the player or **through**
them. The extraction economy finally receives an invoice.

This premise is chosen for mechanical honesty: Act 2's dying-fleet fiction
produced passive enemies. An inheritance war structurally demands rammers,
boarders, pursuit, and pressure that does not politely wait its turn.

Mission naming grammar: probate/inheritance law — Death Notice, Next of Kin,
Death Duties, Reading of the Will, Codicil, Escheat, Probate.

## Combat doctrine (the Act 2 postmortem, as rules)

Measured with the `?devPressure=1` telemetry (static ship, invincible probe,
`window.__pressureReport()`), the problem is quantified: **The Gauntlet
(level7) runs ~200 incoming DPS with zero quiet windows and ~10 bullets near
the player at all times; Act 2's Processional runs ~15 DPS with 3.** Act 2
plays at 8% of Act 1's peak pressure. The rules that fix it:

1. **Threat simultaneity.** Every live movement keeps at least two layers on
   screen at once: suppression (chip volume that pins shield regen), space
   denial (slow heavies), and a killer (fast aimed fire or collision). Chip
   damage without a simultaneous killer is noise — shields and armor class
   erase it.
2. **No free recharge.** A continuous trickle (long `count × interval`
   events) keeps in-movement gaps under ~3 seconds. Quiet is an authored
   beat — dread before a spike, exhale after one — never a scheduling
   accident.
3. **Collision is intent.** Every faction fields a rammer: things that
   choose the player's position on purpose. Dodging becomes mandatory even
   for high-armor builds because collisions bypass shields.
4. **Survival converts to threat.** Nothing dangerous leaves the screen
   alive. Gunlines hold until killed; pursuers pursue until killed; only
   chaff is allowed to pass through.
5. **Boss danger is output plus adds, not hit points.** Boss fights keep
   trash spawning (`events` continue past the boss timestamp — no engine
   change needed) and cycle dense patterns fast. HP pools stay near Act 2
   levels; the fight gets shorter-feeling and much louder.
6. **Playtested or it doesn't ship.** Every mission is flown and measured
   before handoff. Acceptance floor per mission (probe values, movement
   sections): avg incoming DPS ≥ 150 (≥ 250 by the finale), worst-10s ≥
   3000, avg near-bullets ≥ 8, collision damage > 0, no unauthored quiet
   window over 3 seconds.

Tuning target per Adam: assume the player finishes Act 2 with the best gear
currently in the game. Act 3 is allowed to require it — and introduces the
next tier (below) as its reward.

## The Heirloom tier (new gear ceiling — Codex spec)

Act 3's reward identity: **Heirloom** items — a rarity above Pre-Founding,
forged not from preserved Founder relics but from what the lineages *became*.
A thousand generations of drift out-engineered the originals; taking their
inheritance means using it. Chorus harmonics, Tithe mass-drivers, Verdant
grafts. Thesis echo on purpose: drift as growth, not only doom — the question
the Rebel path hangs on. Heirlooms drop only from Act 3 minibosses and bosses.
Mechanics in `ACT3_CODEX_SPEC.md`.

## Mission plan (7; first 3 authored and pressure-tested now)

- **P1 — Death Notice** (Verdant vanguard). The seeds arrive first because
  seeds travel light: burster rammers sprint at the player from second two,
  stranglers pursue and shoot, bloomcallers root and pump spores, a
  continuous sporeling trickle never lets shields breathe. Miniboss:
  **Seedcrown**, a broodmother that spawns bursters instead of chaff. One
  authored 13-second dread window, then boss: **Rootcrown**, fought while
  seeds keep falling.
- **P2 — Next of Kin** (Chorus stampede). The procession breaks into a
  charge: zealot rammers in lane-locked sprints, lictor gunlines that anchor
  mid-field and do not leave, cantor needles at real speeds. Miniboss:
  **Lector**. Boss: **The Claimant** — a mimic-AI warden with a tight echo
  delay; it fights like your reflection lost patience.
- **P3 — Death Duties** (Tithe collection fleet). They've come to assess the
  estate: grapplers ram to board, pressgangs wall the screen in slugs,
  assessors attach liens mid-invasion. Miniboss: **Pressmaster**. Boss:
  **The Executor** — slug stamps plus a tractor-beam seizure pattern.
- **P4 — Reading of the Will**: first tri-lineage convergence, two
  minibosses, factions arriving in interleaved waves.
- **P5 — Codicil**: elite mixed assault; the three emissaries return,
  upgraded; the Ledger's own guns join the fiction via debrief copy.
- **P6 — Escheat**: the siege setpiece — longest mission, breach-mechanic
  showcase once the Codex pass lands.
- **P7 — Probate** (finale): **The Heir Apparent** — the first cross-lineage
  entity, a chimera that phase-shifts between Chorus, Tithe, and Verdant
  combat grammars (the boss-phase system as the star, once its hold-fire bug
  is fixed). Final debrief: "Estate secured. Probate finds one (1)
  unregistered asset aboard. Hold placed." — the Phase 10 door.

P1–P3 v1 ship with existing engine vocabulary (rammers approximated as
hunter-AI + high collision damage) and reuse Act 2 faction art; the Codex
pass upgrades them (true ram/latch AIs, breach integrity, Heirloom drops,
art). No boss `phases` are authored in Act 3 until the phase hold-fire bug is
fixed.

## What Act 2 keeps / gets later

Art, story, minibosses, mission shape (4–6 min, lulls, minibosses) all stay.
After P1–P3 prove the doctrine numbers feel right to Adam, Act 2 gets a
combat-only retune (event tables and fire rates; no structure or art
changes), tuned mission by mission against the same telemetry floors.
