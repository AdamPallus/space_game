# Economy Control Spec (Phase 8 prelude)

*Author: Claude (Fable 5), 2026-07-01. Companions: [STATE.md](STATE.md),
[ECONOMY_DESIGN.md](ECONOMY_DESIGN.md), [ROADMAP.md](ROADMAP.md) (Story-Economy
Arc), [STORY-PREMISE-DEEP-HISTORY.md](STORY-PREMISE-DEEP-HISTORY.md).*

Status: ready for Codex implementation via plan mode.

Archival rule: the change set that implements this spec moves this file to
`outdated_docs/implemented_specs/`, updates `STATE.md`, `CURRENT_SYSTEMS.md`,
and `ROADMAP.md`, and passes `node scripts/validate_docs.js`.

## Goal

Move every economy number out of `main.js` into validated data, make credit
flow visible in the balance report, and add an in-game tuning console — so
economy tuning becomes a play-side loop Adam runs alone, with no code
round-trips.

**This spec changes no balance values.** It changes where values live and how
they are seen. With an untouched config, gameplay must be behavior-identical
to before the change.

## Non-goals

- No price or reward rebalancing in this pass. Tuning happens after, by Adam,
  through the console and the report.
- No removal or regating of investments. The regating decision table at the
  bottom is design-locked for the follow-up contract-board spec — do **not**
  implement it here.
- No editing of levels, items, or enemy data through the console in v1. The
  console covers `config/economy.json` only.
- No new player-facing UI polish. The console is a dev tool.

## Phase A — extract economy config

Create `config/economy.json`, loaded at startup the same way level and item
JSON is fetched. Inventory every economy constant in `main.js` and move it
in. During plan mode, Codex must present the full inventory before writing
code. Minimum expected sections (Codex may find more; add them rather than
leaving them in code):

- `market`: sell rate (currently 0.40), base rotating lots (5), license lot
  tiers (7/9/11), mispriced-lot chance (~1 in 8) and discount range
  (0.35–0.50), demand-bulletin interval (3 missions) and sell bonus (+40%),
  sponsored-listing parameters, volatility parameters, dividend handling.
- `extraction`: death bounty-keep fraction (0.75), recovery bonus range
  (10–25%), base cargo slots (3).
- `itemValue`: rarity base value ranges, roll-quality value constants
  (`0.85 + 0.45 * rollQuality`).
- `dropTables`: source-class drop chances and rarity weightings
  (transports 100%, mini-bosses 60%, elite +15%, ordinary 2%, boss
  guaranteed).
- `investments`: the entire tracks/tiers/costs object currently at
  `main.js:714` (engineering, operations, shares, hulls, capabilities),
  moved verbatim. Tree layout/visual data (`investmentTreeBranches`) stays
  in code — it is presentation, not economy.
- `consumables`: costs and unlock gating at minimum. Combat behavior fields
  (duration, cooldown) may move too if it is cleaner to relocate whole
  definitions.
- `fees`: repair costs and any other credit fees currently hardcoded.

Rules:

- After this phase, a grep for credit-amount literals in `main.js` should
  find only display formatting. Every number a tuner would want is in the
  config.
- Saved games must survive config edits. Prices are read at time of
  purchase; nothing stored in a save may break when a config value changes.
- Add `scripts/validate_economy_config.js`: required sections and keys
  present, correct types, sane ranges (fractions in [0,1], costs positive,
  tier costs ascending), referenced `hullId`/`upgradeId` values exist. The
  implementing change set adds it to the `STATE.md` validation checklist.

## Phase B — credit-flow report

Extend `scripts/balance_report.js` with a **Credit Flow** section. For each
campaign mission in unlock order (level1–level11, noting variants where they
change payouts):

- Expected full-clear bounty: sum of enemy base credits across scripted
  waves, plus deterministic bonus objectives.
- Expected salvage value: drop tables × rarity weights × mean rarity value ×
  sell rate.
- Cumulative expected credits after each mission — one line for full clears,
  one line for the short-loop farm (launch → front-loaded salvage → RTB) per
  `ECONOMY_DESIGN.md` §8.
- Affordability milestones: for every investment tier, hull license,
  Ledger license, and consumable, the earliest mission at which cumulative
  expected credits cover it.
- Warnings against the §8 tuning targets: first Certified item affordable
  around mission 3, first investment around mission 5, and a saturation
  warning when an entire track is affordable too early (thresholds live in
  the config so they are tunable too).

Plain-text output like the rest of the report. This section is the
instrument Adam tunes against; it must run green (no NaNs, no missing
missions) across the whole campaign set.

## Phase C — in-game tuning console

New dev flag `?devTuning=1`, following the existing `devSkip` /
`devInvincible` pattern. A floating panel available over any non-combat
scene:

- Groups mirror the sections of `config/economy.json`; numeric fields with
  the same min/max bounds the validator enforces.
- Edits apply immediately to the live runtime config. Where mid-mission
  application is unsafe, apply at the next scene change and say so in the
  panel.
- Overrides persist in `localStorage` as a sparse diff over the shipped
  config. Whenever any override is active, show a small persistent
  **TUNING OVERRIDES ACTIVE** badge in every scene (including combat HUD
  corner) so playtests are never silently contaminated.
- **Export** button: download the merged `economy.json` and copy it to the
  clipboard. **Reset all** clears the override diff.
- Intended workflow: Adam tunes on the deployed build or a local server,
  exports, and hands the file over ("make these the new defaults") — no
  editor required. The console must work on desktop; phone support is
  nice-to-have.

Plain and dense is fine. This is a tool, not a scene.

## Design-locked for the next spec: investment regating

Do **not** implement in this pass. Recorded here so the decision is not
re-litigated. Rule: **money buys services; missions buy standing; standing
unlocks the purchase and credits still pay for it** (both gates apply).

| Track | Fate | Rationale |
|---|---|---|
| Engineering Bay | stays purchasable | The Ledger sells services; future cargo-slot tiers land here (`ECONOMY_DESIGN.md` §5). |
| Operations Center | stays purchasable | Mission variants are risk contracts the Ledger is happy to sell. |
| Fleet Shares | stays purchasable | The leash itself; core fiction. |
| Ledger licenses | stays purchasable | Market access is the Ledger's product. |
| Hull Licenses | becomes contract-gated | A certification contract unlocks the *right to buy*; the credit price remains. |
| Ship Capabilities (dual-fire tiers) | becomes contract-gated | Same pattern: trust is not for sale. |

## Acceptance

- All `STATE.md` validation commands pass, including the new
  `validate_economy_config.js` and `validate_docs.js`.
- `balance_report.js` prints the Credit Flow section with no NaNs across all
  campaign missions.
- Editing a config value (e.g. sell rate 0.40 → 0.10) changes live behavior
  with no `main.js` edit.
- Console export → replace `config/economy.json` → behavior identical to the
  overrides that produced it.
- With an untouched config, pre- and post-extraction behavior is identical
  (existing report sections unchanged apart from the new one).
- This spec is archived per the archival rule in the same change set.
