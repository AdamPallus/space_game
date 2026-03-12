# Level JSON Format

Enemy identities come from [enemies/enemy_catalog.json](/Users/pallusa/space_shooter/enemies/enemy_catalog.json). Level files do not define new enemies.

## Rules

- Non-boss `enemyTypes` keys must match a catalog enemy id exactly.
- Non-boss entries are override objects only. They must not declare `template`.
- The `boss` entry must declare a catalog template such as `"level1:boss"`.
- Every `events[*].type` must exist in `enemyTypes`.
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
  ]
}
```

## Allowed Enemy Override Fields

`sprite`, `spriteScale`, `color`, `hull`, `hp`, `shield`, `shieldRegen`, `armor`, `armorClass`, `speed`, `score`, `baseCredit`, `radius`, `pattern`, `patternParams`, `ai`, `aiParams`, `fireRate`, `fireMode`, `fireCount`, `fireSpread`, `bulletSpeed`, `bulletDamage`, `collisionDamage`, `damageScale`, `aggroRadius`, `empImmune`, `isBoss`, `hpScale`
