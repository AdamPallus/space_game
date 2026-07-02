# Act 2 Codex Spec — Engine Upgrades + Art Packs

Status: ready for Codex, in two independent passes (engine, then art — art can
also run first; they don't conflict). Design intent and mission-by-mission
fiction live in `ACT2_SILENT_LINEAGES_DESIGN.md`. The v1 playable data (11
`act2_*` missions, 37 new catalog entries, `availableLevels` additions) is
already committed and passes `scripts/validate_levels.js`; everything below
upgrades that baseline without breaking it. The economy control layer has
already landed and is merged with this baseline — economy values live in
`config/economy.json`, so any credit/drop numbers this work touches belong
there, not in `main.js`.

Validation for every slice:

```bash
node --check main.js
node scripts/validate_economy_config.js
node scripts/validate_levels.js
python3 scripts/validate_generated_assets.py
node scripts/balance_report.js
node scripts/validate_docs.js
```

plus a browser smoke test (`?devSkip=1&level=<id>`).

---

## Pass 1 — Engine

### 1.1 Mission-graph unlocks (replaces the linear index for Act 2)

Today `state.unlockedLevels` is a count into `availableLevels` (see
`missionProgressionBaseIdFor` and the debrief unlock block in
`settleMissionEnd`). Act 1 keeps working that way. Add a data-driven graph
layer for everything else:

- New optional fields on `availableLevels` entries (or a parallel
  `MISSION_GRAPH` map keyed by level id):
  - `requires`: array of requirement objects, ANY-of satisfied unlocks the
    mission. Requirement kinds: `{ "completed": "<levelId>" }` and
    `{ "keyItem": "<keyId>" }`.
  - `branch`: optional string tag (`"chorus" | "tithe" | "verdant" | "origin"`)
    used only for board presentation and standing counters.
- Save state gains `completedMissions: { [baseLevelId]: count }` and
  `keyItems: string[]`. Migrate existing saves: for `unlockedLevels = N`, mark
  `level1..level(N-1)` completed so nothing regresses.
- Unlock rule: a mission is unlocked if the legacy index rule passes (Act 1)
  OR its `requires` array is satisfied. Missions with `requires` are exempt
  from the index rule.
- Target graph (matches the design doc):
  - `act2_dead_air` requires completed `level11`.
  - `act2_processional`, `act2_repossession` require completed `act2_dead_air`
    (this is the visible fork).
  - `act2_antiphon` ← `act2_processional`; `act2_doxology` ← `act2_antiphon`.
  - `act2_arrears` ← `act2_repossession`; `act2_foreclosure` ← `act2_arrears`.
  - `act2_green_signal` requires keyItem `deep_registry_shard`.
  - `act2_bloom` ← `act2_green_signal`; `act2_old_growth` ← `act2_bloom`.
  - `act2_pilgrimage` requires completed `act2_old_growth`.
- Key item drops: completing `act2_doxology` or `act2_foreclosure` grants
  `deep_registry_shard` (idempotent, shown in the debrief as an itemized
  "Deep Registry Shard — decoded" line, and listed in the archive).
- Mission board: Act 2 entries render under a "Deep Claims" divider; locked
  entries show their unlock condition in plain contract language ("Requires:
  Foreclosure settled or Doxology settled" / "Requires: Deep Registry
  Shard"). The two fork missions should read visibly as a choice: tag
  Processional "Ledger-sanctioned" and Repossession "Off-book" in the card
  copy.
- Branch standing (Phase 10 groundwork only): count completions per `branch`
  tag in save state (`branchStanding`). No gameplay effect yet; expose it
  nowhere except the profile screen as "Sanctioned record / Off-book record".

### 1.2 Miniboss treatment

Named heavies currently die like any other enemy. Add an optional catalog/
level-override flag `miniboss: true` (allow in
`LEVEL_ENEMY_OVERRIDE_KEYS` and the validator):

- On spawn: show the boss-style banner briefly ("CHOIRMASTER ON FIELD" style
  — use the catalog `name` uppercased) and a compact secondary health bar
  (reuse the boss bar component at reduced scale, positioned under the main
  boss bar slot; hide when the miniboss dies).
- On death: guaranteed salvage pod roll at `certified` or better (bypass the
  normal `rollSalvageDrop` chance, keep its rarity weighting), a bigger
  explosion (`style: "kill"`, ~1.5x radius), and camera shake ~0.3.
- Does NOT trigger `startBossDefeatSequence` and does not end the mission.
- Flip `miniboss: true` on these catalog entries: `vestibule_cantor`,
  `choirmaster`, `precentor_prime`, `auditor`, `harbormaster`, `broodmother`,
  `rootward`, `emissary_chorus`, `emissary_tithe`, `emissary_verdant`.

### 1.3 New AI behaviors

Add to the `enemy.ai` switch in `updateEnemies` (each also needs a compendium
movement description in `describeMovement` and an AI Lab (`levels/ai_demo.json`)
demo wave). All params live in `aiParams` with the defaults shown.

1. **`conductor`** (Chorus anchor) — behaves like `sentinel` (hold a firing
   line, strafe), plus a link: any allied enemy on field with
   `aiParams.linkedTo` matching this unit's `type` gains
   `conductorBuff` while the conductor lives (default `{ fireRateMult: 0.85,
   shieldRegenBonus: 8 }`). When the conductor dies, linked enemies lose the
   buff and enter a 1.2s "scatter": their pattern is replaced with `zigzag`
   (amplitude 160, frequency 5) and `fireRate` is doubled (they panic-fire
   less accurately — implement as `fireRate * 2` seconds between shots).
   Flip: `precentor` and `precentor_prime` get `ai: "conductor"`; `chorister`
   and `cantor` get `aiParams.linkedTo` pointing at them in the four Chorus
   missions.
2. **`mimic`** (The Antiphon) — maintains `holdY`/`standoff` like `duelist`,
   but its horizontal target is the player's x-position from
   `aiParams.echoDelay` seconds ago (default 2.0; keep a small ring buffer of
   player positions). `aiParams.mirror: true` reflects the echo across the
   field's center line instead. Flip: `act2_antiphon:boss` → `ai: "mimic"`,
   `aiParams: { echoDelay: 2.0, holdY: 185, standoff: 265 }`.
3. **`thief`** (Tithe bailiff) — seeks the nearest salvage pod or scripted
   pickup; on contact, attaches it and retreats upward at
   `aiParams.escapeSpeed` (default 130). If it exits the top, the pickup is
   lost (debrief line: "Repossessed by counterparty — 1 item"). Killing it
   drops the carried item plus a bonus credit popup of
   `aiParams.interest` (default 1.5) × its `baseCredit`. If no pod exists it
   behaves as `duelist`. Flip: `bailiff` → `ai: "thief"` in the three Tithe
   missions (keep `duelist` in `act2_pilgrimage` so the finale stays
   readable).
4. **`lien`** (Tithe assessor) — approaches to `aiParams.attachRadius`
   (default 150) of the player, then holds and drains
   `aiParams.drainPerSecond` (default 6) credits/sec from `mission.killCredits`
   (floor 0), rendered as small red credit popups streaming toward it. On
   kill, refund everything drained × 1.5. Flip: `assessor` → `ai: "lien"` in
   `act2_arrears` and `act2_foreclosure` only.
5. **`spawner`** (Verdant bloomcaller/broodmother) — holds like `stall`,
   and every `aiParams.spawnEvery` seconds (default 7) spawns
   `aiParams.spawnType` (default `"sporeling"`) up to `aiParams.maxAlive`
   (default 4 for bloomcaller, 6 for broodmother) of its own children alive
   at once. Spawned children use the level's enemy override for that type and
   award normal credit. Flip: `bloomcaller` and `broodmother` in the three
   Verdant missions and `act2_green_signal`.
6. **`splitter`** (Verdant seedcarrier) — normal `transport` movement; on
   death spawns `aiParams.splitCount` (default 2) `aiParams.splitType`
   (default `"sporeling"`) at its position with a small outward impulse.
   Flip: `seedcarrier` everywhere it appears except `act2_pilgrimage`
   (pilgrims should die quietly).
7. **`tractor` boss phase hook** (Collections Barge) — not a standalone AI: a
   boss attack-pattern-level effect. Add optional pattern field
   `"tractor": { "duration": 1.4, "strength": 220 }` (validator: object with
   two positive numbers): while firing that pattern the boss pulls the player
   toward its x/y at `strength` px/s² with a visible telegraphed beam line
   1s before the pull. Wire it onto `act2_foreclosure:boss`'s
   `seizure_cores` pattern.

### 1.4 Boss phases

Add optional catalog/level boss field `phases`: array of
`{ "hpFraction": 0.66, "attackPatterns": [...], "speedMult": 1.1 }`.
When the boss's total remaining pool (shield+armor+hull) crosses
`hpFraction × total max`, swap its weighted attack-pattern set (and optional
speed multiplier) with a 0.8s hold-fire tell + screen flash. Validate
structure in `validate_levels.js` (fractions strictly descending in (0,1)).

Author phases for two bosses (numbers may be tuned):

- `act2_doxology:boss` (The Conductor): phase 2 at 0.66 (drop `hymn_movement`
  weight to 2, add `final_verdict` weight 2), phase 3 at 0.33 (all patterns,
  `speedMult: 1.15`).
- `act2_pilgrimage:boss` (The First Warden): **Oath** (base: `oath_lances` +
  `census_ring`), **Census** at 0.66 (add `requiem_rings`, drop `oath_lances`
  to weight 2), **Requiem** at 0.33 (all four patterns, `speedMult: 1.12`).
  Keep the design-doc tell: it holds fire a full second at each transition.

### 1.5 Debrief/lore lines (small, high-leverage)

Reuse the existing debrief line system — no new UI. Add a per-mission
`debriefLore` string array to level JSON (validator: optional array of
strings, pick one at random on completion):

- Chorus missions: degraded loyalty-oath fragments (each mission's fragment
  has more words missing — see design doc; write 2–3 per mission).
- Tithe missions: manifest lines; `act2_foreclosure` must include "Manifest
  line 7 — seal matches your own." exactly once.
- Verdant missions: assay lines ("Sample assay: hull alloy match — origin
  registry, generation zero.").
- `act2_pilgrimage`: the Ledger's closer: "Claim settled. Compliance
  appreciated."

## Pass 2 — Art (Codex built-in imagegen, per `ASSET_GENERATION.md` rules)

All packs: chroma-key sheet workflow → transparent PNGs, processed with the
existing sheet tools. Enemies match the fleet scale anchors (~112px class);
bosses are broadside, alpha aspect ≥ 1.55 (target 1.8–2.2), 256×256. After
each pack lands, swap the `sprite` paths in `enemies/enemy_catalog.json` for
the units listed — level JSONs never change.

### 2.1 `assets/generated/chorus_fleet_v1/`

Faction language: bone-white ceramic hulls, pale gold seams and filigree,
organ-pipe / reliquary / censer silhouettes, thin foil pennants. Clean,
symmetrical, liturgical — a fleet that irons its robes. Cool white/gold
engine glow. No rust, no wear: they maintain themselves perfectly and have
nothing to do.

Sprites (swap target in parentheses): `chorus_chorister` (chorister),
`chorus_cantor` (cantor), `chorus_censer` (censer), `chorus_sexton` (sexton),
`chorus_precentor` (precentor), `chorus_vestibule_cantor` (vestibule_cantor),
`chorus_choirmaster` (choirmaster — larger, lyre/organ silhouette),
`chorus_precentor_prime` (precentor_prime), `chorus_emissary`
(emissary_chorus). Bosses (broadside): `boss_doorkeeper`
(act2_dead_air:boss — a gate made into a ship), `boss_processional_warden`
(act2_processional:boss), `boss_antiphon` (act2_antiphon:boss — visibly a
mirrored/doubled silhouette), `boss_conductor` (act2_doxology:boss — the
grandest: a cathedral organ crossed with a warship).

### 2.2 `assets/generated/tithe_fleet_v1/`

Faction language: rust and brass over tar-black, stencil markings and seal
stamps, cargo containers welded on as armor, hulls swollen with freight,
crane/claw hardpoints. Diesel-freighter grotesque; warm sodium running
lights. They look *encumbered* — wealth as deformity.

Sprites: `tithe_teller` (teller), `tithe_bailiff` (bailiff — visible claw),
`tithe_assessor` (assessor), `tithe_notary` (notary), `tithe_strongbox`
(strongbox — a safe with engines), `tithe_auditor` (auditor),
`tithe_harbormaster` (harbormaster), `tithe_emissary` (emissary_tithe).
Bosses: `boss_escrow` (act2_repossession:boss — an armored vault door,
broadside), `boss_adjuster` (act2_arrears:boss), `boss_collections_barge`
(act2_foreclosure:boss — the biggest silhouette in the game so far,
container stacks as superstructure).

### 2.3 `assets/generated/bio_enemies_v2/` (Verdant additions)

Extend `bio_enemies_v1`'s style exactly. New: `bio_sporeling` (sporeling —
smaller than bio_scout), `bio_thornwing` (thornwing), `bio_bloomcaller`
(bloomcaller — a rooted flower-turret), `bio_bramble` (bramble),
`bio_seedcarrier` (seedcarrier — visibly pregnant with pods),
`bio_broodmother` (broodmother), `bio_rootward` (rootward — a wall of
thorns), `bio_emissary` (emissary_verdant). Bosses: `boss_gatekeeper_bloom`
(act2_green_signal:boss — broadside flower-gate), `boss_matriarch`
(act2_bloom:boss — bio_queen's larger sister), `boss_old_growth`
(act2_old_growth:boss — **the key image of the act**: a Founders-era warship
half-consumed by growth, hard machine lines emerging from vegetation,
broadside).

### 2.4 `assets/generated/origin_v1/` (First Warden)

One boss: `boss_first_warden` (act2_pilgrimage:boss). Design brief: pristine
ancient — not degraded, *preserved*. Predates the warm/cool schism, so it
carries both: warm running lights on one wing, cool on the other,
symmetrical. Broadside, aspect ~2.0, reads as older technology executed
perfectly — closer to the player's Pre-Founding relic aesthetic than to any
enemy faction. It should look like the only thing in the game that was never
copied.

### 2.5 Backgrounds → `assets/generated/backgrounds_v1/`

Three new scrolling tiles via `scripts/prepare_scrolling_background.py`:

- `cathedral_drift` — pale vertical light shafts through dust, nave-like;
  replaces `generatedTealRift` in the four Chorus missions.
- `arrears_field` — a convoy graveyard: drifting containers, tarnished
  brass debris, sodium-amber accents; replaces `generatedDerelictDebris` in
  the three Tithe missions.
- `origin_hull` — a colossal dead mothership filling the lower third,
  seen bow-on in silhouette with the Founders' running lights long dark;
  replaces `generatedDeepVoid` in `act2_pilgrimage`.

Register each in `GENERATED_BACKGROUND_URLS` + the background loader and
update the three level JSON `background` keys.

### 2.6 Projectile additions → `assets/generated/enemy_projectiles_space_v1/`

Two sets, added to the runtime image registry in `main.js` (same key style):

- `enemy_space_gold_hymn_dart`, `enemy_space_gold_hymn_ring` — pale
  white-gold variants for the Chorus (swap into the `hymnChip` and
  `conductorRing`/`wardenRing` profiles across the Chorus missions).
- `enemy_bio_spore_puff`, `enemy_bio_spore_orb`, `enemy_bio_thorn_shard` —
  green organic shots for the Verdant (the existing `bio_enemies_v1`
  spore/thorn sprites may be reprocessed into registry entries instead of
  regenerating). Swap into the Verdant mission profiles. Respect the
  rotation rule: orbs may spin, thorn shards must not.

### 2.7 Compendium refresh

After sprite swaps, regenerate the enemy compendium snapshot so the new
units and bosses appear with final art and the design-doc flavor names.
