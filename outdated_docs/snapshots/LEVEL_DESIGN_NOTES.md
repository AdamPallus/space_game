# Level Design Notes (Working)

This doc is a temporary bridge between the scripted JSON events (`levels/*.json`) and the intended "story + learning curve" pacing.

## Level JSON knobs (for difficulty scaling / reuse)

- `enemyScale`: optional per-level scaling for reusing early enemy archetypes later.
  - Example: `"enemyScale": { "hp": 1.25, "damage": 1.15 }`
  - `hp` scales `hp` (legacy) or `hull/armor/shield` pools (and shield regen).
  - `damage` scales enemy bullet damage and collision damage (without needing to rebalance `mission.difficulty`).
- Per-enemy overrides can also include:
  - `hpScale` (multiplies the pools for that spawn/type)
  - `damageScale` (multiplies damage for that spawn/type)

## Example: Mission 10 - "Iron Graveyard"

"Iron Graveyard" is built to *teach armor* (and the feeling of "impact matters") by putting the player into long time-to-kill engagements unless their build is tuned for per-shot damage.

High-level structure:
- Opening wave: a small number of **Plated Bastions** arrive first. They drift downward slowly, giving the player time to realize that chip damage is being eaten by armor class.
- Mid-waves: **Escort Gunships** show up to punish stationary positioning. Their spread volleys create a lane-control problem while you are still trying to grind through armor.
- Pressure ramp: a **Bulwark Heavy Hauler** arrives as a slow moving "credit pinata" / priority target. It has even more armor and effectively tests whether the player can commit to killing a heavy while under fire.
- Late waves: more plated ships stack the screen into a dense "iron curtain" so the player feels the compounding pressure from slow ships that won't die quickly.
- Boss: the **Iron Graveyard Juggernaut** enters and uses a high-count radial pattern. The boss is EMP-immune by default, forcing the player to solve it with raw DPS, positioning, and survivability rather than a stun-lock.

What the mission is trying to make the player learn:
- A build that looks "good vs swarms" (wide/burst micro-shots) can completely fail into armor unless projectile size / velocity / effects are upgraded enough.
- Plasma can feel safer for steady damage in the chaos, but kinetic builds can punch through armor if velocity and size are invested into.
- If you bring armor yourself, you gain survivability but you *feel* the fire-rate penalty; the mission makes this tradeoff noticeable.

Why it works as a "story beat":
- The fantasy is “fighting through wreckage and plated hulls” — slow, heavy ships, lots of debris vibes, and a boss that feels like a salvage-yard kingpin.
