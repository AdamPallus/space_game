# UI Design Bible: Scenes, Not Pages

*Author: Claude (Fable 5), 2026-06-11. Companion docs: [STATE.md](STATE.md), [CURRENT_SYSTEMS.md](CURRENT_SYSTEMS.md), [ROADMAP.md](ROADMAP.md), [ECONOMY_DESIGN.md](ECONOMY_DESIGN.md)*

Status: active visual and interaction direction. The flat scene shell has been implemented; use `STATE.md` and `CURRENT_SYSTEMS.md` for the exact current screen behavior, and use this file when extending meta-game UI.

This document is **binding** for all meta-game UI work (everything between
runs). Any agent doing UI work must read it first, the way level work reads
LEVEL_JSON_FORMAT.md. The combat game already feels like a game; this fixes
the rest.

## Why the current UI feels like a web app

It is built from the DOM's defaults: documents scroll, content flows top-down,
controls sit in lists and tabs. Games compose fixed scenes. The rules below
ban the document model.

## The Ten Rules

1. **Nothing ever scrolls the page.** The game is one fixed stage that fits
   the viewport (letterboxed if needed). If content doesn't fit, redesign the
   scene — don't add a scrollbar. (Small internal panels, e.g. an inventory
   grid, may scroll *within a fixed frame* as a last resort, styled as a
   terminal readout, never a browser scrollbar.)
2. **Every screen is a scene, not a page.** A scene = full-bleed background
   art + positioned interactive hotspots/panels layered over it. No screen may
   be "a column of cards."
3. **Navigation is spatial, not hierarchical.** You don't open tabs; you *go
   places* in the hangar. Transitions are camera moves (pan/zoom/fade ≤ 400ms),
   never instant DOM swaps.
4. **All panels are diegetic.** Every UI surface is an object in the world: a
   terminal screen, a clipboard, a workbench, a printed receipt. If a panel
   can't be explained as a physical thing on the mothership, restyle it.
5. **Every interaction makes a sound.** Hover tick, click thunk, purchase
   stamp, error buzz. One small shared sfx set, used everywhere.
6. **Numbers never just change.** Credits count up/down (≤ 600ms), bars fill,
   receipts print line by line. A value silently re-rendering is a bug.
7. **One visual language.** Single palette (deep hull grays, oxygen-warning
   amber, shield cyan, Ledger ink-black + stamp red), one display font + one
   monospace terminal font, shared nine-slice panel frames. No element uses
   browser-default styling.
8. **The Ledger has a voice and a face.** All fees, receipts, audits, and
   bulletins render in the Ledger's terminal style: monospace, serial numbers,
   stamps, dry language. The antagonist is a UI skin.
9. **Hotspots telegraph.** Interactive things glow/brighten on hover with a
   short label. Non-interactive art never glows.
10. **Banned vocabulary in specs and prompts:** tab, card list, modal, page,
    menu bar, dropdown, accordion. Required vocabulary: scene, station,
    terminal, bench, board, hotspot, camera.

## Vocabulary note for prompting agents

When requesting UI work, describe the **camera and the scene**, not the
information hierarchy. "The armory is a workbench scene; the drone sits
center; clicking a hardpoint zooms the camera to it" produces a game.
"An armory screen with item cards and a stats panel" produces a SaaS
dashboard. This is the single highest-leverage prompting habit.

---

## The Scene Map

```
                ┌─────────────┐
                │   COMBAT    │  (existing canvas game)
                └──────▲──────┘
                       │ launch / RTB / death
┌──────────┐    ┌──────┴──────┐    ┌───────────────┐
│  ARMORY  │◄──►│   HANGAR    │◄──►│ LEDGER        │
│  (bench) │    │   (hub)     │    │ TERMINAL      │
└──────────┘    └──────▲──────┘    └───────────────┘
                       │                 ▲
                ┌──────┴──────┐          │ after every mission
                │ MISSION     │    ┌─────┴─────┐
                │ BOARD       │    │  DEBRIEF  │ (claims report)
                └─────────────┘    └───────────┘
```

### 1. Hangar (hub)
Full-bleed art: the player's drone on a maintenance cradle in a cavernous
hangar bay. Persistent HUD strip: credits, pilot rank, family tier badge.
Hotspots: **armory bench** (left), **Ledger terminal kiosk** (right),
**launch bay / mission board** (center, the visually loudest), **quarters
door** (far edge, dim — future story scene, present but locked).
Replaces the current tab bar entirely.

### 2. Armory (workbench scene)
The existing click-and-preview armory flow (branch
`codex/item-loadout-prototype`) is already the right interaction — keep its
logic, reskin per the rules: drone schematic center on a workbench background,
clickable hardpoints, inventory as a physical parts rack (fixed grid, rarity
glows), inspector panel as a diagnostic terminal screen.

Current implementation note: the Armory is an equip/configure bench, not a
purchase surface. Hull choice is a compact unlocked-hull rail; hardpoint tiles
stay spatially placed around the hull to indicate install locations. Permanent
unlock purchases, including hulls and Dual Fire, belong in the Ledger
Investments tree.

### 3. Ledger Terminal
A CRT/kiosk frame fills the scene — everything renders *inside the terminal
screen* in monospace. Three terminal "modes" (switched by physical-looking
buttons on the kiosk bezel, not tabs): **MARKET** (5 stock lots + sell
manifest), **INVESTMENTS** (the existing three tracks as a terminal ledger),
**CLAIMS** (history of receipts). Demand bulletins print across the top.
Mispriced lots get only their subtle notation — never a highlight.

Current implementation note: Market shows rotating exchange lots and the sell
manifest. Fixed Basic Gear stock is removed. Investments render as a connected
upgrade tree for permanent tracks, hull unlocks, ship capabilities, and Ledger
license tiers.

### 4. Mission Board
A physical contracts board: missions are **pinned contract sheets** on a
star-chart backdrop, not list rows. Variants are paper riders clipped to the
parent contract. Hover lifts the sheet; click stamps it "ACCEPTED" and
transitions to launch. Reuse the existing carousel data, lose the carousel.

### 5. Debrief (claims report)
The emotional payoff scene. A receipt **prints line by line** (bounty,
recovery bonus, dividends, fees in red), then salvage pods are **identified
one at a time** (pod opens → rarity flash → item revealed), then a rubber
stamp slams: `SETTLED` (or `HULL WRITEDOWN — CLAIM ADJUSTED` on death).
Quick actions per item: KEEP / SELL. This scene is where the loop pays off;
it gets the most polish budget.

---

## Asset manifest (gpt-image-2, via existing ASSET_GENERATION.md pipeline)

Backgrounds (1536×1024+, no chroma key needed — full-bleed):
1. Hangar bay interior, drone on cradle, industrial deep-space, amber work
   lights — camera slightly low, heroic.
2. Armory workbench close-up environment.
3. Ledger kiosk: retro-bureaucratic CRT terminal in a dim corridor alcove.
4. Mission board: star chart wall with pinboard.
5. Debrief desk: claims-office counter surface (receipt renders over it).

Chroma-key sheets (existing 4×4 workflow):
6. Nine-slice panel frames ×3 (hull-metal, terminal-glass, paper/receipt).
7. Stamps & seals (SETTLED, ACCEPTED, ADJUSTED, Ledger sigil), rarity glow
   ring, cargo pod sprite ×4 rarity colors, contract-sheet blank.

Style anchor for all prompts: *"retro-industrial generation-ship interior,
worn metal, amber/cyan utility lighting, bureaucratic signage, no characters,
painted concept-art style consistent with existing generated packs."*

## Implementation note

This is all achievable in plain HTML/CSS over the existing structure — no
engine needed. Scenes are absolutely-positioned full-viewport divs with
background art; hotspots are positioned buttons; transitions are CSS
transforms. The current `uiSkin=generated` ::before technique generalizes.
Current implementation notes and acceptance checks live in [STATE.md](STATE.md)
and [ROADMAP.md](ROADMAP.md). The older build-order spec is archived under
`outdated_docs/implemented_specs/`.
