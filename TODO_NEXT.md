# Next TODOs (Keep In Mind)

These are the most important near-term TODOs that are easy to forget while we shift into story/level design.

## UX / Meta
- Compendium progression: gate entries behind `encounteredEnemies` (currently everything is visible for development).
- Mission Select cards: convert the current vertical list to graphical cards with hover panels, rewards, and alt mission variants.
- Music looping: validate that each level track loops cleanly (no audible seam) and that hangar music stays subtle.

## Combat / Balance
- Armor vs micro-shots: wide/burst should remain weaker per-hit but not feel completely useless; likely needs minimum-damage / armor interaction tuning.
- Boss tuning: ensure bosses scale to remain a meaningful spike in later missions (damage patterns, HP pools, and reward pacing).
- Explosion readability: ensure impact + kill explosions remain distinct and never turn into a solid opaque overlay at high fire rates.

## Content Pipeline
- Standardize enemy archetypes: consider extracting shared enemy definitions to a separate file and letting levels reference them (optional next refactor).
- Level story arc: introduce new enemy mechanics gradually (1–2 new concepts per mission) with clear “learn, remix, mastery” pacing.

## Art Backlog
- Boss sprite cleanup: replace non-transparent boss PNGs and enforce transparent alpha in all encounter assets.
- Boss style consistency: regenerate boss art to match the existing sprite-sheet style (no conflicting line-art treatment).
- Animation pass: add runtime animation support/frames for boss, enemy, and player sprites (idle/move/hit/death where possible).
