# Act 3 Invasion Built-In Imagegen Prompts

All images in this pack were generated with Codex built-in imagegen. No API-key
script, SDK, or local image-generation CLI was used.

## Invasion 3x3 Source Sheet

```text
Use case: stylized-concept game assets.
Asset type: top-down 2D arcade space shooter sprite sheet for transparent game sprites.
Primary request: Create one square 3 x 3 sprite sheet on a perfectly flat solid #ff00ff chroma-key background for the Act 3 invasion enemies of a vertical space shooter. The sheet should match the existing generated faction language: Verdant organic green seed/root ships, Chorus white-and-gold cathedral/censer drones, and Tithe dark industrial tax-barge machinery, but all variants must feel battle-forward: running lights burning, weapons deployed, aggressive silhouettes, tow cables, banners, shields, rams, and small motion pennants built into the silhouette.
Layout: square image, exactly 3 columns and 3 rows, each sprite centered in its own equal cell with generous padding. Orthographic top-down view for regular units. Bosses should be broadside horizontal silhouettes, wide and readable, not tall or forward-flight. No grid lines, no cell borders, no labels, no text.
Sprites, left to right, top to bottom:
1. burster: Verdant seed pod rammer with heat-shield scorch marks and burning green core.
2. zealot: Chorus censer drone stripped for speed, white-gold body, hot running lights, narrow fast silhouette.
3. grappler: Tithe boarding skiff with claw fully extended and visible tow cables, dark riveted metal.
4. strangler: Verdant hunter ship with reaching tendrils, predatory green bioluminescence.
5. lictor: Chorus precentor command ship with a raised gonfalon/banner and deployed hymn weapons.
6. pressgang: Tithe notary gunwall with a riveted tower shield, heavy frontal armor, slug ports.
7. boss_rootcrown: broadside Verdant matriarch crowned in root mass, wide alpha silhouette, many pods and thorn batteries.
8. boss_claimant: broadside Chorus processional warden with mirrored double prow, white-gold cathedral plating, banners and organ-like weapon banks.
9. boss_executor: broadside Tithe barge refitted as a battering ram, crane arms become siege claws, dark industrial armor and orange furnace lights.
Technical constraints: perfectly flat solid #ff00ff background across the whole image, no shadows, no contact shadows, no background texture, no gradients in the background, no atmospheric glow separated from the sprite, no watermark, no logos, no text, no numerals. Do not use #ff00ff or near-magenta colors inside any sprite. Keep every sprite fully inside its cell with crisp transparent-sprite-friendly edges and strong readability at 96-256 px.
```

## Boss Broadside Correction Sheet

```text
Use case: stylized-concept game assets.
Asset type: top-down 2D arcade space shooter boss sprite sheet for transparent game sprites.
Primary request: Create one wide 3 x 1 sprite sheet on a perfectly flat solid #ff00ff chroma-key background for three Act 3 invasion bosses. These are broadside horizontal bosses for a vertical space shooter: each boss must be much wider than tall, with a visible width-to-height silhouette ratio around 2:1. They should feel battle-forward: running lights burning, weapon banks deployed, siege equipment extended, aggressive readable outlines.
Layout: landscape image with exactly 3 equal columns and 1 row, each boss centered in its cell with generous padding. No grid lines, no cell borders, no labels, no text. Each boss should face broadside across the screen, not nose-forward toward the top. Keep top and bottom clear so the alpha silhouette stays low and wide.
Bosses, left to right:
1. boss_rootcrown: Verdant matriarch crowned in root mass, a low wide organic warship with root antlers spread horizontally, many green pods, thorn batteries, and vine armor. It must be broadside and horizontal, not tall.
2. boss_claimant: Chorus processional warden with mirrored double prow, white-and-gold cathedral plating, organ-like weapon banks and banners integrated into a long horizontal hull. It must be broadside and horizontal, not a vertical cathedral.
3. boss_executor: Tithe collections barge refitted as a battering ram, very wide industrial siege hull, crane arms transformed into side siege claws, dark riveted armor, orange furnace lights. It must be broadside and horizontal, not a vertical ship.
Technical constraints: perfectly flat solid #ff00ff background across the whole image, no shadows, no contact shadows, no background texture, no gradients in the background, no atmospheric glow separated from the sprite, no watermark, no logos, no text, no numerals. Do not use #ff00ff or near-magenta colors inside any sprite. Keep every boss fully inside its cell with crisp transparent-sprite-friendly edges and strong readability at 256 px.
```

## Home Hull Background

```text
Use case: stylized-concept game background.
Asset type: square vertical-scrolling space-shooter background tile.
Primary request: Create the Act 3 `home_hull` background: the player's own mothership seen from the picket line, inhabited and worth defending. It should be the emotional inverse of a cold derelict origin hull: warm lit windows, signs of life, docking lights, maintenance glows, shield pickets, a home base under threat, seen from above/oblique top-down in deep space.
Composition: square image, 1:1. The lower third should show a broad friendly mothership hull edge or superstructure spanning the width, with many small warm windows and lived-in details. The middle has open defensive space and distant picket lights. The upper area is dark starfield with sparse distant nebula. Make it readable as a gameplay background, not a foreground object.
Scrolling-tile constraint: top and bottom 10% should fade to mostly plain dark starfield / very low-detail darkness so vertical scrolling is forgiving. Do not attempt obvious repeating patterns. Avoid strong unique features touching the top or bottom edges.
Style: high-quality generated arcade sci-fi background consistent with the existing generated backgrounds, painterly but game-readable, dark space with restrained teal/cold-blue shadows and warm amber habitation lights. No text, no labels, no UI, no watermark, no logos, no ships in the foreground, no planets dominating the view.
```
