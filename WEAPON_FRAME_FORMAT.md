# Weapon Frame Catalog Format

Weapon frames are defined centrally in `/Users/pallusa/space_shooter/items/weapon_frames.json`.

Each entry is a player-facing item that packages the hidden weapon and defense tuning into a readable loadout choice.

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
        "armorAmountLevel": 0,
        "armorClass": 10,
        "armorClassLevel": 0
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

## Current intent

- Keep player-facing choice at the item level.
- Keep the detailed tuning inside `build`.
- Add new weapons by authoring new frames here, not by reopening the old ship upgrade submenus.
