#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const files = ["index.html", "main.js"];
const failures = [];
const indexSource = fs.readFileSync(path.join(root, "index.html"), "utf8");
const mainSource = fs.readFileSync(path.join(root, "main.js"), "utf8");

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

if (failures.length) {
  failures.forEach((failure) => console.error(`validate_ui_contract: ${failure}`));
  process.exit(1);
}

console.log("validate_ui_contract: OK (custom immediate popups only)");
