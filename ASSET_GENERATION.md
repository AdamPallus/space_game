# Asset Generation Workflow

This project currently draws individual transparent PNG files. The packed
`assets/SpaceShooterRedux/Spritesheet/sheet.png` atlas exists, but runtime code
loads paths like `assets/SpaceShooterRedux/PNG/Enemies/enemyBlue2.png` and can
also load generated custom paths such as `assets/generated/pilot_sprites/enemy_scout.png`.

## Pilot Result

The first generated test pack lives in `assets/generated/pilot_sprites/`.

- `source_sheet_keyed.png`: original GPT Image 2 sheet on a flat magenta key.
- `source_sheet_alpha.png`: keyed sheet converted to alpha.
- `manifest.json`: grid cells, target sizes, and cleanup settings.
- `pilot_contact_sheet_clean.png`: quick visual QA sheet.
- Individual PNGs: trimmed, alpha-background sprites sized for game use.

`levels/generated_sprite_lab.json` is a short test mission that uses these
sprites through custom sprite paths. It is listed in the mission selector as
`Generated Sprite Lab`.

## Effects, Projectiles, And Backgrounds

The first generated VFX pack lives in `assets/generated/effects_projectiles_v1/`.
It uses the same chroma-key sheet workflow as the pilot sprites and is wired as
the `generated_v1` visual theme in `main.js`. The lab mission opts into this
theme with `"visualTheme": "generated_v1"`, so regular missions still use the
starter art while the lab can test generated player shots, enemy shots, impacts,
explosion frames, and the player-death core.

The first generated scrolling background lives in
`assets/generated/backgrounds_v1/`. The source image was requested as a vertical
looping nebula tile. The model got close but did not produce mathematically
identical top and bottom pixels, so `scripts/prepare_scrolling_background.py`
records seam stats and can make a fallback looped version. For the lab, the
native generated image is currently selected because its repeat preview looked
cleaner than the feathered fallback.

To jump straight into the visual test mission:

```text
http://127.0.0.1:8765/?devSkip=1&level=generated_sprite_lab
```

For VFX QA, add the URL-only test flags that keep the ship alive and fire the
primary weapon automatically:

```text
http://127.0.0.1:8765/?devSkip=1&devInvincible=1&devAutoFire=1&level=generated_sprite_lab
```

Use the `bg` URL flag to swap generated backgrounds without creating a new
mission file:

```text
http://127.0.0.1:8765/?devSkip=1&devInvincible=1&devAutoFire=1&level=generated_sprite_lab&bg=generatedAmberDust
http://127.0.0.1:8765/?devSkip=1&devInvincible=1&devAutoFire=1&level=generated_sprite_lab&bg=generatedAmberDustLooped
```

## Seamless Scrolling Backgrounds (design ruling, 2026-06-11)

Never ask the model to match top/bottom edges — it can't. Two sanctioned
approaches, in priority order:

### 1. Layered decal backgrounds (preferred system)
The background is a stack, not a painting:
- **Base layer:** near-featureless starfield/gradient (procedural or
  generated). Loops trivially because there is nothing at the seam. Prompt
  any generated base with "top and bottom 10% fade to plain dark starfield."
- **Feature layers:** nebula wisps, derelicts, stations, asteroid clusters as
  individual transparent sprites (existing chroma-key workflow), spawned
  procedurally offscreen-top and scrolled at different parallax speeds.
  Nothing tiles, so no seam exists; parallax adds depth a flat scroll can't.
  Per-level theming = swap the decal set.

### 2. Roll-and-inpaint (for painted full-image loops)
For a single painted tile, make the loop by construction:
1. Roll the image vertically by 50% with wraparound (`numpy.roll`). The new
   top/bottom edges are the old continuous middle → the image now tiles
   perfectly. The only artifact is a seam across the interior.
2. Mask a horizontal band over that interior seam and send it to
   gpt-image-2 edit/inpaint: "continue the nebula naturally through this
   region." Models fix interiors well; they cannot match edges.
3. `prepare_scrolling_background.py` should be extended to emit the rolled
   image + band mask; retire the feathered-blend fallback (known ghosting).

Emergency fallback only: mirror tiling (image + vertical flip — both seams
continuous by reflection; symmetry is usually hidden by nebula noise).

The first biological enemy and VFX pack lives in
`assets/generated/bio_enemies_v1/`. It uses the same 4x4 chroma-key workflow,
but focuses on organic enemy silhouettes, acid/spore/thorn projectiles, impact
splatters, and membrane-rupture explosion frames. It is wired as `bio_v1` and
tested in `levels/biological_hive_lab.json`.

To jump straight into the biological visual test:

```text
http://127.0.0.1:8765/?devSkip=1&devInvincible=1&devAutoFire=1&level=biological_hive_lab
```

## Generated UI Chrome

The first generated button skin lives in `assets/generated/ui_chrome_v1/`.
It is a 4x4 chroma-key sheet of blank button/tab states processed into
transparent PNGs. The current implementation is opt-in so we can compare it
against the CSS-only menus:

```text
http://127.0.0.1:8765/?devSkip=1&level=generated_sprite_lab&uiSkin=generated
```

The skin parameter is intentionally forgiving for testing. `uiSkin=generated`,
`skin=generated`, `Skin=generated`, `buttonSkin=generated`, and
`buttons=generated` all enable the same generated UI skin.

The CSS keeps the existing HTML buttons and places generated art behind the
text with `::before` pseudo-elements. That means click handling, accessibility
labels, and layout keep working while the visual skin can be swapped.

## Repeatable Process

1. Generate a small sheet first, usually 4x4, on a flat chroma-key background.
2. Keep the prompt explicit about the grid, cell order, top-down view, padding,
   no labels, no grid lines, no shadows, and no use of the key color inside sprites.
3. Copy the generated keyed sheet into a pack folder as `source_sheet_keyed.png`.
4. Update `manifest.json` with the intended cell order and target PNG sizes.
5. Run:

```bash
python3 scripts/process_generated_sprite_sheet.py \
  --manifest assets/generated/pilot_sprites/manifest.json \
  --force
```

6. Inspect `pilot_contact_sheet_clean.png` and the alpha stats before using the
   assets in gameplay.

For backgrounds, run:

```bash
python3 scripts/prepare_scrolling_background.py \
  --input assets/generated/backgrounds_v1/teal_rift_source.png \
  --native-out assets/generated/backgrounds_v1/teal_rift_native_1024.png \
  --out assets/generated/backgrounds_v1/teal_rift_looped_1024.png \
  --preview-out assets/generated/backgrounds_v1/teal_rift_looped_1024_repeat_preview.png
```

## Prompt Used For The Pilot

```text
Create a 4 x 4 sprite sheet for a vertical space shooter game on a perfectly flat solid #ff00ff chroma-key background.

Use case: stylized-concept game assets.
Asset type: top-down 2D arcade space shooter sprites.
Style: original clean vector-painted game art, crisp silhouettes, readable at 80-120 px, slightly glossy panels, restrained highlights, bold shapes, no resemblance to any existing commercial asset pack.
Layout: square image, 4 columns and 4 rows, each sprite centered in its own equal cell with generous padding. No grid lines, no cell borders, no labels.
Sprites, left to right, top to bottom: player interceptor, scout enemy, fighter enemy, bruiser enemy, hunter enemy, ace enemy, saucer transport, boss manta, player laser, enemy laser, rocket, shield powerup, fire frame 1, fire frame 2, explosion flash, impact spark.
Technical constraints: orthographic top-down view, transparent-sprite-friendly edges, no cast shadows, no contact shadows, no glow spilling into the background, no antialiasing fringe in #ff00ff, do not use #ff00ff anywhere inside the sprites, no text, no watermark, no logos, no background texture, no gradient background.
```
