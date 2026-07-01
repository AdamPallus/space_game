#!/usr/bin/env node
// Validates the doc lifecycle rule in STATE.md:
// 1. Every .md file in the repo root must be listed in STATE.md's
//    Documentation Map (implemented specs belong in outdated_docs/).
// 2. Every doc listed in the Documentation Map must exist in the repo root.
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const statePath = path.join(root, "STATE.md");
const stateText = fs.readFileSync(statePath, "utf8");

const mapStart = stateText.indexOf("## Documentation Map");
if (mapStart === -1) {
  console.error("validate_docs: STATE.md has no '## Documentation Map' section");
  process.exit(1);
}
const nextSection = stateText.indexOf("\n## ", mapStart + 1);
const mapText = stateText.slice(mapStart, nextSection === -1 ? undefined : nextSection);

const listed = new Set(
  [...mapText.matchAll(/- `([^`\/]+\.md)`/g)].map((m) => m[1])
);

const rootDocs = fs
  .readdirSync(root)
  .filter((f) => f.endsWith(".md"));

const errors = [];
for (const doc of rootDocs) {
  if (!listed.has(doc)) {
    errors.push(
      `${doc} is in the repo root but not in STATE.md's Documentation Map. ` +
        `List it there, or archive it under outdated_docs/ if implemented.`
    );
  }
}
for (const doc of listed) {
  if (!rootDocs.includes(doc)) {
    errors.push(
      `${doc} is listed in STATE.md's Documentation Map but missing from the repo root.`
    );
  }
}

if (errors.length) {
  for (const e of errors) console.error(`validate_docs: ${e}`);
  process.exit(1);
}
console.log(`validate_docs: OK (${rootDocs.length} root docs, all mapped)`);
