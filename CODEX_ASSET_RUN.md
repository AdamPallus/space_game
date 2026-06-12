# Codex Work Order: Baseline Generated Asset Pass

*Self-contained. Read fully before starting. Pipeline how-to lives in
[ASSET_GENERATION.md](ASSET_GENERATION.md); UI rules in [UI_DESIGN.md](UI_DESIGN.md).*

## Goal

Replace every placeholder visual (Kenney starter art in menus, CSS-only
panels, tinted power-up icons) with **generated baseline art**, so that
later work is *refining* assets, not *introducing* them. Baseline means:
coherent style, correct transparency, wired into the game. Not perfect.

## Ground rules

1. **Work in batches A–E below, in order. Commit + push after each batch,
   then STOP and wait for Adam's review before the next batch.**
2. **Art only.** Do not change layout, game logic, or UI structure. The only
   code edits allowed are: CSS background/image references, icon path values
   in JS/JSON, and new entries in manifest files.
3. **Every sprite-sheet prompt uses the shared style block** (below) so packs
   match each other. Never improvise a new style.
4. **Randomness protocol:** after generating a sheet, run the processing
   script, open the contact sheet, and check: (a) no magenta fringe, (b) each
   cell holds the right subject, (c) silhouettes read at game size. If a
   sheet fails, regenerate that sheet with the same prompt — **max 3
   attempts**, then keep the best attempt and note the weakness in the
   commit message. Do not loop past 3; baseline beats perfect.
5. **Keep fallbacks intact.** Old art stays on disk; wire generated art as
   the new default but never delete the previous reference.
6. **QA screenshots** of every affected screen go to `output/` (gitignored).
   Verify with the preview server (`.claude/launch.json`, name `game`) at
   1280px and 375px widths. A batch is done when its Definition of Done
   passes in screenshots and the console shows zero errors.

## Shared style block (paste into every image prompt)

```text
Style: original clean vector-painted sci-fi game art, crisp silhouettes,
readable at small sizes, restrained highlights, bold shapes, slightly worn
industrial surfaces. Palette anchored to: deep space navy #0a0e16, panel
blue-gray #1a2233, signal cyan #3fd0ff, caution amber #f0b429, alert red
#e5484d. Retro-industrial generation-ship interior aesthetic: worn metal,
utility lighting, bureaucratic signage. No text, no watermark, no logos.
```

Sprite sheets additionally use the chroma-key constraints from
ASSET_GENERATION.md (flat #ff00ff background, 4x4 grid, generous padding,
no grid lines, no shadows, no #ff00ff inside sprites).

---

## Batch A — Scene backdrops (5 images, no chroma key)

Full-bleed images, 1536x1024 or larger, saved to
`assets/generated/scene_backdrops_v1/`. Subjects:

1. `hangar_hub.png` — cavernous drone hangar bay, small interceptor drone on
   a maintenance cradle center-low, amber work lights, camera slightly low.
2. `armory_bench.png` — workbench wall: tool racks, parts bins, diagnostic
   screens, an empty central work surface (UI renders over the center).
3. `ledger_terminal.png` — retro-bureaucratic CRT kiosk alcove in a dim
   corridor, screen area dark/empty (UI renders inside it).
4. `mission_board.png` — star-chart wall with pinboard texture, contract
   sheets pinned at edges, center area calm (cards render over it).
5. `debrief_desk.png` — claims-office counter surface seen from above,
   stamp pads and document trays at the edges, center calm.

**Composition rule for all five: busy detail at the edges, calm low-contrast
center** — live UI panels sit over the center. After generating, darken
center if needed (the UI must stay readable; text contrast comes first).

**Wiring:** apply via CSS on the scene containers (`.hub-scene`,
`.armory-scene` stage panel, `.ledger-scene` terminal, `.mission-board-scene`,
`#debrief`), as `background: linear-gradient(rgba(10,14,22,.78),
rgba(10,14,22,.88)), url(...) center / cover;`. Tune the gradient per scene
until text passes contrast. The flat `.art-slot` colors remain the fallback.

**Definition of Done:** all five scenes show their backdrop at both widths;
every text element remains readable; no layout shift.

## Batch B — UI chrome sheet (one 4x4 chroma-key sheet)

Pack: `assets/generated/ui_chrome_v2/`. Cells:

1–4. Salvage pod container, 4 rarity variants (gray, blue, violet, gold glow)
5. Rubber-stamp frame, empty rectangle, red ink, slight grunge (text is CSS)
6. Ledger official seal/sigil, circular, ink-black with red accent
7. Hotspot icon: armory wrench-and-barrel
8. Hotspot icon: mission contract sheet
9. Hotspot icon: ledger coin-and-scale
10. Hotspot icon: archive dossier
11. Panel corner ornament (greebled metal corner bracket)
12. Tier pip, lit (cyan capsule)
13. Tier pip, unlit (dark capsule)
14. Cargo pip ring (empty slot ring)
15. Credit chip icon (small amber coin/chip)
16. Warning chevron strip tile

**Wiring (baseline):** salvage pods replace the tinted power-up sprite in
combat drops (`updateCargoHud` pod visuals + the in-mission pod entity
sprite); hotspot icons appear in `.scene-hotspot` buttons (as `<img>` or
CSS background — keep label text); stamp frame behind `.debrief-stamp` text;
seal on the ledger screen header; credit chip next to credit values in the
hangar top bar. Pips/corners/chevrons: wire only if trivially clean in CSS;
otherwise note as available and move on.

**Definition of Done:** in-game pods are generated art with rarity glow;
hub hotspots show icons; debrief stamp sits on the stamp frame.

## Batch C — Item icon set (two 4x4 chroma-key sheets)

Pack: `assets/generated/item_icons_v1/`. These replace every Kenney part
icon in the armory/market/debrief. Render as top-down or 3/4 "module on
dark tray" objects, consistent scale.

Sheet 1 — weapons & frames:
1. Cadet kinetic cannon (modest single barrel)
2. Plasma scatter array (wide multi-emitter)
3. Breaker rail (long heavy rail, amber accents)
4. Generic kinetic slug ammo module
5. Plasma cell module
6. Pierce tip modifier chip
7. Vampiric trace modifier chip (subtle red)
8. Generic weapon frame chassis (empty mount)

Sheet 2 — defense & aux:
9. Phase shield projector (cyan emitter dish)
10. Plated armor module (layered plates)
11. Cloaking device (dark lens housing)
12. EMP burst module (coil stack, blue arc)
13. Bulwark field module (amber barrier emitter)
14. Scrap-grade junk module (dented, mismatched)
15. Prototype housing (violet-lit casing)
16. Relic housing (gold-lit archaic casing)

**Wiring:** update icon paths in `items/weapon_frames.json`,
`items/item_pool.json`, and the visual maps in `main.js`
(`armoryFrameVisuals`, `defenseVisuals`, `mobileAltIcons`, and any item-pool
icon defaults). Rarity housings (14–16) are the default icon for generated
drop items that lack a specific icon.

**Definition of Done:** armory inventory, ledger market lots, and debrief
salvage rows show zero Kenney icons at baseline; aux ability button uses the
new module icons.

## Batch D — Promote combat theme + fill enemy gaps

1. Promote the existing `generated_v1` projectile/effects theme and
   `pilot_sprites` player ship to the **default** visual theme for all
   missions (currently lab-only). Keep the Kenney theme selectable via the
   existing theme field for comparison.
2. Map every `enemies/enemy_catalog.json` entry to the closest existing
   generated sprite (pilot_sprites + bio packs + generated bosses). List the
   catalog entries with no acceptable match — expect roughly: plated/tank
   (heavy hulls), shieldkite, gnat/dart/spark (tiny fast), escort/bulwark
   (haulers), sentinel/duelist (line ships).
3. Generate ONE gap sheet `assets/generated/fleet_gaps_v1/` (4x4) covering
   those archetypes, same style block, distinct silhouettes per role
   (heavy = wide, fast = narrow dart, hauler = boxy, sentinel = symmetric).
4. Update catalog `sprite` fields to the generated paths.

**Definition of Done:** playing level1 and level5 shows no Kenney enemy or
projectile art; every catalog entry resolves to a generated sprite (run
`node scripts/validate_levels.js` plus a sprite-path existence check).

## Batch E — Mission backdrops (scrolling, in-combat)

Generate 3 new vertical scrolling backgrounds (beyond existing teal_rift and
amber_dust) in `assets/generated/backgrounds_v1/`: a derelict debris field,
a green bio-nebula (pairs with bio missions), a dark "deep void" minimal
field. Follow the seam rules in ASSET_GENERATION.md (prompt edges to fade to
plain dark starfield; use `prepare_scrolling_background.py`; roll-and-inpaint
only if a seam is visible in the repeat preview). Assign one background per
campaign level in the level JSONs (vary across levels 1–8).

**Definition of Done:** each campaign level scrolls a generated background
with no visible seam at the loop point (check repeat previews + 30s of play).

---

## Final checklist (after Batch E)

- [ ] No Kenney art visible anywhere in the meta-UI scenes.
- [ ] Combat uses generated ships, enemies, projectiles, backgrounds.
- [ ] All processing sources (`source_sheet_keyed.png`, manifests) committed.
- [ ] `output/` QA screenshots exist for every scene (not committed).
- [ ] Zero console errors; validators pass.
- [ ] ASSET_GENERATION.md updated with one line per new pack.
