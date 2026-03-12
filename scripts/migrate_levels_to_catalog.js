#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const LEVELS_DIR = path.join(ROOT, "levels");
const CATALOG_PATH = path.join(ROOT, "enemies", "enemy_catalog.json");

function listLevelFiles(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return entry.name === "legacy_pre_overhaul" ? [] : listLevelFiles(full);
      }
      return entry.name.endsWith(".json") ? [full] : [];
    })
    .sort();
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function titleCase(text) {
  return text
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function pruneOverrides(templateValue, localValue) {
  if (Array.isArray(localValue)) {
    return JSON.stringify(localValue) === JSON.stringify(templateValue) ? undefined : clone(localValue);
  }
  if (!localValue || typeof localValue !== "object") {
    return JSON.stringify(localValue) === JSON.stringify(templateValue) ? undefined : localValue;
  }
  const out = {};
  for (const [key, value] of Object.entries(localValue)) {
    const diff = pruneOverrides(templateValue ? templateValue[key] : undefined, value);
    if (diff !== undefined) {
      out[key] = diff;
    }
  }
  return Object.keys(out).length ? out : undefined;
}

const catalogDoc = JSON.parse(fs.readFileSync(CATALOG_PATH, "utf8"));
const catalogEntries = catalogDoc.entries || {};

for (const file of listLevelFiles(LEVELS_DIR)) {
  const level = JSON.parse(fs.readFileSync(file, "utf8"));
  const levelId = level.id || path.basename(file, ".json");
  const levelName = level.name || titleCase(levelId);
  const nextEnemyTypes = {};

  for (const [typeId, spec] of Object.entries(level.enemyTypes || {})) {
    if (typeId === "boss") {
      const bossKey = `${levelId}:boss`;
      const existing = catalogEntries[bossKey] || {};
      catalogEntries[bossKey] = {
        name: existing.name || `${levelName} Boss`,
        boss: true,
        template: clone(spec),
      };
      delete catalogEntries[bossKey].template.template;
      nextEnemyTypes[typeId] = { template: bossKey };
      continue;
    }

    if (!catalogEntries[typeId]) {
      catalogEntries[typeId] = {
        name: titleCase(typeId),
        boss: !!spec.isBoss,
        template: clone(spec),
      };
      delete catalogEntries[typeId].template.template;
    }

    const template = catalogEntries[typeId].template || {};
    const overrides = pruneOverrides(template, spec) || {};
    delete overrides.template;
    nextEnemyTypes[typeId] = overrides;
  }

  level.enemyTypes = nextEnemyTypes;
  fs.writeFileSync(file, `${JSON.stringify(level, null, 2)}\n`);
}

catalogDoc.entries = catalogEntries;
fs.writeFileSync(CATALOG_PATH, `${JSON.stringify(catalogDoc, null, 2)}\n`);

console.log(`Migrated ${listLevelFiles(LEVELS_DIR).length} level files to catalog-backed enemy definitions.`);
