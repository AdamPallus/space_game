#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const files = ["index.html", "main.js"];
const failures = [];

files.forEach((relativePath) => {
  const source = fs.readFileSync(path.join(root, relativePath), "utf8");
  if (/<[^>]*\btitle\s*=/s.test(source)) failures.push(`${relativePath} contains a native title attribute.`);
  if (/\.title\s*=/.test(source)) failures.push(`${relativePath} assigns a native title property.`);
  if (/setAttribute\(\s*["']title["']/.test(source)) failures.push(`${relativePath} sets a native title attribute.`);
});

if (failures.length) {
  failures.forEach((failure) => console.error(`validate_ui_contract: ${failure}`));
  process.exit(1);
}

console.log("validate_ui_contract: OK (custom immediate popups only)");
