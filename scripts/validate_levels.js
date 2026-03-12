#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const LEVELS_DIR = path.join(ROOT, "levels");
const CATALOG_PATH = path.join(ROOT, "enemies", "enemy_catalog.json");

const LEVEL_ENEMY_OVERRIDE_KEYS = new Set([
  "template",
  "sprite",
  "spriteScale",
  "color",
  "hull",
  "hp",
  "shield",
  "shieldRegen",
  "armor",
  "armorClass",
  "speed",
  "score",
  "baseCredit",
  "radius",
  "pattern",
  "patternParams",
  "ai",
  "aiParams",
  "fireRate",
  "fireMode",
  "fireCount",
  "fireSpread",
  "bulletSpeed",
  "bulletDamage",
  "collisionDamage",
  "damageScale",
  "aggroRadius",
  "empImmune",
  "isBoss",
  "hpScale",
]);

const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, "utf8")).entries || {};

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

function validateLevel(level) {
  const errors = [];
  const levelId = level.id || "unknown";
  const enemyTypes = level.enemyTypes;
  if (!enemyTypes || typeof enemyTypes !== "object" || Array.isArray(enemyTypes)) {
    errors.push("Mission package is missing enemyTypes.");
    return errors;
  }
  for (const [typeId, config] of Object.entries(enemyTypes)) {
    if (!config || typeof config !== "object" || Array.isArray(config)) {
      errors.push(`Enemy '${typeId}' must be an object of overrides.`);
      continue;
    }
    for (const key of Object.keys(config)) {
      if (!LEVEL_ENEMY_OVERRIDE_KEYS.has(key)) {
        errors.push(`Enemy '${typeId}' uses unsupported field '${key}'.`);
      }
    }
    if (typeId === "boss") {
      if (typeof config.template !== "string" || !config.template) {
        errors.push(`Boss entry in '${levelId}' must declare a catalog template.`);
      } else if (!catalog[config.template]?.template) {
        errors.push(`Boss template '${config.template}' is missing from enemy catalog.`);
      }
      continue;
    }
    if ("template" in config) {
      errors.push(`Enemy '${typeId}' should not declare a template; use the catalog id as the key.`);
    }
    if (!catalog[typeId]?.template) {
      errors.push(`Enemy '${typeId}' is not defined in enemy catalog.`);
    }
  }
  if (!Array.isArray(level.events)) {
    errors.push(`Mission '${levelId}' is missing a valid events array.`);
    return errors;
  }
  level.events.forEach((event, index) => {
    if (!event || typeof event !== "object") {
      errors.push(`Event ${index + 1} in '${levelId}' is invalid.`);
      return;
    }
    if (typeof event.type !== "string" || !event.type) {
      errors.push(`Event ${index + 1} in '${levelId}' is missing a type.`);
      return;
    }
    if (!enemyTypes[event.type]) {
      errors.push(`Event ${index + 1} in '${levelId}' references unknown enemy '${event.type}'.`);
    }
  });
  return errors;
}

const failures = [];
for (const file of listLevelFiles(LEVELS_DIR)) {
  const level = JSON.parse(fs.readFileSync(file, "utf8"));
  const errors = validateLevel(level);
  if (errors.length) {
    failures.push({ file, errors });
  }
}

if (failures.length) {
  failures.forEach(({ file, errors }) => {
    console.error(path.relative(ROOT, file));
    errors.forEach((error) => console.error(`  - ${error}`));
  });
  process.exit(1);
}

console.log(`Validated ${listLevelFiles(LEVELS_DIR).length} level files.`);
