# Level JSON Format

Status: active level-data reference. Current implementation details and
validation commands live in `STATE.md`; this file documents the level schema
rules enforced by `scripts/validate_levels.js`.

Enemy identities come from [enemies/enemy_catalog.json](/Users/pallusa/space_shooter/enemies/enemy_catalog.json). Level files do not define new enemies.

## Rules

- Non-boss `enemyTypes` keys must match a catalog enemy id exactly.
- Non-boss entries are override objects only. They must not declare `template`.
- The `boss` entry must declare a catalog template such as `"level1:boss"`.
- Every `events[*].type` must exist in `enemyTypes`.
- Optional `pickups` entries must use a supported pickup type and valid timing/position data.
- Unknown enemy ids cancel the mission at runtime and fail validation in `scripts/validate_levels.js`.

## Example

```json
{
  "id": "level1",
  "name": "First Contact",
  "enemyTypes": {
    "scout": {},
    "fighter": {
      "speed": 74
    },
    "boss": {
      "template": "level1:boss"
    }
  },
  "events": [
    { "time": 1, "type": "scout", "count": 6, "interval": 0.45 },
    { "time": 6, "type": "fighter", "count": 4, "interval": 0.8 },
    { "time": 42, "type": "boss", "count": 1 }
  ],
  "pickups": [
    { "time": 9, "type": "salvage", "rarity": "certified", "slotType": "mini", "x": 0.36, "y": -44 },
    { "time": 15, "type": "shield_booster", "x": 0.64, "y": -52 },
    { "time": 20, "type": "armor_patch", "x": 0.5, "y": -58 }
  ]
}
```

## Pickups

Scripted pickups are optional level-authored opportunities. They are useful for front-loading salvage, adding recovery decisions before difficulty spikes, or guaranteeing a readable cache test case.

Supported pickup types:

- `salvage`: spawns a salvage pod or generated item opportunity. It may include `rarity` and `slotType`; `slotType` may be `primary`, `mini`, `defense`, `aux`, or `economy`.
- `shield_booster`: restores 40% max shield and can overfill shields up to 120% of max.
- `armor_patch`: restores armor first; if armor is absent or full and hull is damaged, it repairs a smaller amount of hull instead.

Pickup fields:

- `time`: seconds after mission start. Must be non-negative.
- `type`: one of the supported pickup types above.
- `x`: horizontal placement. Values from `0` to `1` are treated as a viewport fraction; larger values are treated as direct game coordinates.
- `y`: optional vertical spawn offset or coordinate. Negative values spawn above the visible playfield.
- `rarity`: optional for `salvage`; must be a legal generated-item rarity when present.
- `slotType`: optional for `salvage`; must be a legal generated-item slot type when present.

## Allowed Enemy Override Fields

`sprite`, `spriteScale`, `color`, `hull`, `hp`, `shield`, `shieldRegen`, `armor`, `armorClass`, `speed`, `score`, `baseCredit`, `radius`, `pattern`, `patternParams`, `ai`, `aiParams`, `fireRate`, `fireMode`, `fireCount`, `fireSpread`, `bulletSpeed`, `bulletDamage`, `collisionDamage`, `damageScale`, `aggroRadius`, `empImmune`, `isBoss`, `hpScale`
