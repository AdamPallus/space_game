# Weapon System And Frame Catalog

The current weapon system has two authoring surfaces:

- `/Users/pallusa/space_shooter/items/weapon_frames.json` defines the guaranteed Flight School starter frames.
- `/Users/pallusa/space_shooter/items/item_pool.json` defines loot/shop item bases, affixes, and relics.

Both surfaces ultimately feed the same `build` object. The player sees items and tooltips, while combat reads the normalized build fields from `main.js`.

## How a weapon is composed

A primary weapon is the combination of:

- `gunDiameter`: `small`, `medium`, or `large`. This controls projectile size, kinetic speed tradeoffs, and plasma orb scale.
- `spread`: `focused`, `dual`, `dualRapid`, `rapid`, `burst`, or `wide`.
- `ammo`: `kinetic` or `plasma`.
- `effect`: `none`, `homing`, `explosive`, `pierce`, or `vampiric`.
- flow tuning: `flowRateLevel`, `flowVelocityLevel`, `flowSizeLevel`, `cooldownMult`, and optional `kineticImpulseBudget`.
- defensive tuning: `defenseSlots`, shield tuning, armor class, and armor drag.

Spread, ammo, and effect are intentionally independent. For loot/shop weapons, each spread has at least one neutral-effect kinetic base and one neutral-effect plasma base so rolled effects can attach normally.

Current affix-ready primary coverage:

| Spread | Kinetic base | Plasma base |
|---|---|---|
| `focused` | Cadet Kinetic Frame, Slug Cannon | Plasma Lance |
| `dual` | Twin Driver | Ion Twin |
| `dualRapid` | Stitch Driver | Arc Stitcher |
| `rapid` | Needle Storm | Ember Spray |
| `burst` | Volley Driver | Pulse Barrage |
| `wide` | Flak Fan | Prism Scatter |

Named base weapons with innate effects still exist, such as Seeker Array or Demolition Bore. Those are allowed, but effect affixes from the `weapon-effect` exclusive group do not roll onto a base that already has an innate effect.

## Spread behavior

`focused`
: One straight projectile.

`dual`
: Two straight projectiles fired side by side. It has slower trigger cadence than focused fire.

`dualRapid`
: Two narrow side-by-side projectiles with rapid-fire cadence. This is a hybrid family, shown to players as `Twin Rapid`.

`rapid`
: One smaller projectile at machine-gun cadence. Rapid patterns use lower projectile size and a special armor chip floor so they do not become completely useless against armor.

`burst`
: Five tight forward shots per trigger with a much slower trigger cycle.

`wide`
: Five angled shots across a broad cone for lane coverage.

## Ammo behavior

`kinetic`
: Damage scales from projectile size and velocity. Larger kinetic shots hit harder but speed is constrained by the kinetic impulse budget. Armor class reduces per-hit kinetic damage, so high-volume kinetic weapons rely on chip-floor behavior or pierce/explosive traces against armor.

`plasma`
: Uses orb sprites, has slower velocity by bore size, and applies burn damage over time after direct hits. Plasma explosive splash also applies burn to enemies hit by the explosion.

## Effects and affixes

Effects can be innate on a base item or rolled from affixes:

- `homing`: bends projectiles toward nearby forward targets and rotates the projectile sprite in the direction of travel.
- `explosive`: creates splash damage on impact. Plasma explosive splash also applies plasma burn.
- `pierce`: lets shots continue through additional enemies.
- `vampiric`: restores hull based on damage dealt.

Affix entries live under `affixes` in `item_pool.json`. The four weapon-effect affixes share `exclusiveGroup: "weapon-effect"` so a rolled item only gets one of them.

## Loot and shop generation

Loot boxes and the market both roll from `items/item_pool.json`.

- `entries` are normal item bases.
- `relics` are Pre-Founding bases and roll only from Pre-Founding rarity sources.
- `affixes` add rolled properties based on rarity.
- `tier` gates when a base can appear based on campaign progress.
- `tags` are used by shop stock preferences, demand bulletins, archive search, and player-facing grouping.

When adding a new weapon family, add it to `item_pool.json`, make sure `scripts/validate_levels.js` accepts the spread/effect fields, update `scripts/balance_report.js`, and run the validators.

## Entry shape

```json
{
  "version": 1,
  "entries": {
    "frame_id": {
      "name": "Readable item name",
      "subtitle": "Short role label",
      "description": "One-sentence mission-facing summary.",
      "notes": "Longer design note for the armory card.",
      "starterUnlockStage": 0,
      "sortOrder": 10,
      "tags": ["kinetic", "focused"],
      "build": {
        "gunDiameter": "medium",
        "spread": "focused",
        "ammo": "kinetic",
        "effect": "none",
        "flowRateLevel": 0,
        "flowVelocityLevel": 0,
        "flowSizeLevel": 0,
        "defenseSlots": ["shield", "none"],
        "shieldMaxLevel": 0,
        "shieldRegenLevel": 0,
        "shieldCooldownLevel": 0,
        "armorAmountLevel": 0,
        "armorClass": 10,
        "armorClassLevel": 0,
        "armorDragLevel": 0
      }
    }
  }
}
```

## Rules

- Keys under `entries` are the stable item ids used by save data and onboarding.
- `starterUnlockStage` is optional. If present, the frame is granted during flight school:
  - `0` = owned at fresh start
  - `1` = granted after mission 1
  - `2` = granted after mission 2
- `sortOrder` controls armory card order.
- `tags` are armory labels only.
- `build` is the hidden tuning package applied to the player ship when the frame is equipped.

## Current intent and rules

- Keep player-facing choice at the item level.
- Keep the detailed tuning inside `build`.
- Add guaranteed starter loadouts in `weapon_frames.json`.
- Add random loot/shop weapons in `item_pool.json`.
- Prefer neutral-effect bases for new spread/ammo coverage so homing, explosive, pierce, and vampiric can roll on them.
- Keep dense UI surfaces showing compact base names; rarity and rolled affixes are visible through color and full hover tooltips.
