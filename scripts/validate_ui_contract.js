#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const files = ["index.html", "main.js"];
const failures = [];
const indexSource = fs.readFileSync(path.join(root, "index.html"), "utf8");
const mainSource = fs.readFileSync(path.join(root, "main.js"), "utf8");
const styleSource = fs.readFileSync(path.join(root, "style.css"), "utf8");

files.forEach((relativePath) => {
  const source = fs.readFileSync(path.join(root, relativePath), "utf8");
  if (/<[^>]*\btitle\s*=/s.test(source)) failures.push(`${relativePath} contains a native title attribute.`);
  if (/\.title\s*=/.test(source)) failures.push(`${relativePath} assigns a native title property.`);
  if (/setAttribute\(\s*["']title["']/.test(source)) failures.push(`${relativePath} sets a native title attribute.`);
});

["hud-item-1", "hud-item-2"].forEach((id) => {
  if (!new RegExp(`<button[^>]+id=["']${id}["']`).test(indexSource)) {
    failures.push(`index.html must render ${id} as a real activation button.`);
  }
});
if (!mainSource.includes("supply-control-icon") || !mainSource.includes("supply-control-progress")) {
  failures.push("main.js must render icon-led supply controls with visual progress.");
}
if (!mainSource.includes('debriefCredits.classList.toggle("is-debt", finalReward < 0)')) {
  failures.push("main.js must mark negative net settlement as debt.");
}
if (/attachItemTooltip\(button, offer\.item,[^\n]*installTarget/.test(mainSource)) {
  failures.push("Campaign award tooltips must use the offered item's real slot, not a routing target.");
}
if (!mainSource.includes("attachItemTooltip(button, offer.item, getComparableSlotIdForItem(offer.item))")) {
  failures.push("Campaign award tooltips must derive their comparable slot from each offered item.");
}
if (!mainSource.includes('armoryMain.classList.toggle("has-open-drawer", armoryDrawerOpen)')) {
  failures.push("The Armory must expose its open-drawer layout state.");
}
if (!styleSource.includes(".armory-main.has-open-drawer") || !styleSource.includes("grid-column: 2")) {
  failures.push("The desktop Armory drawer must occupy a dedicated column instead of covering hardpoints.");
}
if (!styleSource.includes(".debrief-salvage > :not(.salvage-list) { flex: 0 0 auto; }") ||
    !styleSource.includes(".debrief-salvage > .salvage-list")) {
  failures.push("Debrief commissions must keep their natural height while cargo scrolls independently.");
}
if (!indexSource.includes('id="hud-cargo-count"') || !indexSource.includes("0 / ∞")) {
  failures.push("The combat HUD must present cargo as an unlimited running total.");
}
if (!mainSource.includes("cargo.slice(-CARGO_HUD_VISIBLE_ITEMS)") || !styleSource.includes(".cargo-overflow")) {
  failures.push("Unlimited cargo must keep a bounded recent-pod HUD with an overflow count.");
}
if (/CARGO FULL|cargoFull|getConfiguredCargoSize/.test(`${indexSource}\n${mainSource}`)) {
  failures.push("Retired cargo-cap rejection behavior must not return.");
}
const collectSalvageBody = mainSource.match(/function collectSalvagePod\(pod\) \{([\s\S]*?)\n\}/)?.[1] || "";
if (!collectSalvageBody.includes("cargo.push(cloneItem(pod.item))") || /return false|cargo\.length\s*>=/.test(collectSalvageBody)) {
  failures.push("Every salvage pod must enter cargo without a capacity check.");
}

if (failures.length) {
  failures.forEach((failure) => console.error(`validate_ui_contract: ${failure}`));
  process.exit(1);
}

console.log("validate_ui_contract: OK (custom immediate popups only)");
