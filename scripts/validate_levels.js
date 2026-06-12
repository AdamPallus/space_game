#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const LEVELS_DIR = path.join(ROOT, "levels");
const CATALOG_PATH = path.join(ROOT, "enemies", "enemy_catalog.json");
const ITEM_POOL_PATH = path.join(ROOT, "items", "item_pool.json");

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
const allowedItemSlotTypes = new Set(["primary", "defense", "aux", "support"]);
const allowedDefenseTypes = new Set(["shield", "armor"]);
const allowedItemEffects = new Set(["none", "homing", "explosive", "pierce", "vampiric"]);
const allowedItemBuildKeys = new Set([
  "gunDiameter",
  "spread",
  "ammo",
  "effect",
  "effectUpgrades",
  "defenseSlots",
  "flowRateLevel",
  "flowVelocityLevel",
  "flowSizeLevel",
  "shieldMaxLevel",
  "shieldRegenLevel",
  "armorAmountLevel",
  "armorClass",
  "armorClassLevel",
  "kineticImpulseBudget",
]);

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

function validateItemBuild(build, context, errors) {
  if (!build || typeof build !== "object" || Array.isArray(build)) {
    errors.push(`${context} is missing build object.`);
    return;
  }
  for (const key of Object.keys(build)) {
    if (!allowedItemBuildKeys.has(key)) {
      errors.push(`${context} uses unsupported build field '${key}'.`);
    }
  }
  if (build.effect && !allowedItemEffects.has(build.effect)) {
    errors.push(`${context} has invalid effect '${build.effect}'.`);
  }
}

function validateTags(tags, context, errors, { required = true } = {}) {
  if (!Array.isArray(tags)) {
    if (required) errors.push(`${context} is missing tags.`);
    return;
  }
  tags.forEach((tag) => {
    if (typeof tag !== "string" || !tag.trim()) {
      errors.push(`${context} has an invalid tag.`);
    }
  });
}

function validateItemPoolEntry(id, entry, label, affixIds, errors) {
  if (!/^[a-z0-9_:-]+$/.test(id)) {
    errors.push(`${label} '${id}' must use a stable lowercase id.`);
  }
  if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
    errors.push(`${label} '${id}' must be an object.`);
    return;
  }
  if (!allowedItemSlotTypes.has(entry.slotType)) {
    errors.push(`${label} '${id}' has invalid slotType '${entry.slotType}'.`);
  }
  if (typeof entry.name !== "string" || !entry.name.trim()) {
    errors.push(`${label} '${id}' is missing name.`);
  }
  if (typeof entry.description !== "string" || !entry.description.trim()) {
    errors.push(`${label} '${id}' is missing description.`);
  }
  if (entry.tier !== undefined) {
    if (!Number.isInteger(entry.tier) || entry.tier < 1 || entry.tier > 4) {
      errors.push(`${label} '${id}' tier must be an integer from 1 to 4.`);
    }
  }
  if (entry.icon !== undefined) {
    if (typeof entry.icon !== "string" || !entry.icon.trim()) {
      errors.push(`${label} '${id}' has invalid icon.`);
    } else if (!/^https?:\/\//.test(entry.icon) && !fs.existsSync(path.join(ROOT, entry.icon))) {
      errors.push(`${label} '${id}' icon does not exist: ${entry.icon}`);
    }
  }
  validateTags(entry.tags, `${label} '${id}'`, errors);
  validateItemBuild(entry.build || {}, `${label} '${id}'`, errors);
  if (Array.isArray(entry.affixes)) {
    entry.affixes.forEach((affixId) => {
      if (!affixIds.has(affixId)) {
        errors.push(`${label} '${id}' references unknown affix '${affixId}'.`);
      }
    });
  }
  if (entry.uniqueProperty !== undefined) {
    if (!entry.uniqueProperty || typeof entry.uniqueProperty !== "object" || Array.isArray(entry.uniqueProperty)) {
      errors.push(`${label} '${id}' has invalid uniqueProperty.`);
    } else {
      const property = entry.uniqueProperty;
      if (typeof property.name !== "string" || !property.name.trim()) {
        errors.push(`${label} '${id}' uniqueProperty is missing name.`);
      }
      validateTags(property.tags, `${label} '${id}' uniqueProperty`, errors, { required: false });
      if (property.build) validateItemBuild(property.build, `${label} '${id}' uniqueProperty`, errors);
      if (property.buildAdd) {
        validateItemBuild(property.buildAdd, `${label} '${id}' uniqueProperty buildAdd`, errors);
      }
    }
  }
  if (entry.relicLore !== undefined && typeof entry.relicLore !== "string") {
    errors.push(`${label} '${id}' relicLore must be a string.`);
  }
}

function validateItemPool() {
  const errors = [];
  if (!fs.existsSync(ITEM_POOL_PATH)) {
    errors.push("items/item_pool.json is missing.");
    return errors;
  }
  const pool = JSON.parse(fs.readFileSync(ITEM_POOL_PATH, "utf8"));
  if (!pool || typeof pool !== "object" || Array.isArray(pool)) {
    return ["item pool root must be an object."];
  }
  const entries = pool.entries;
  const affixes = pool.affixes || {};
  const relics = pool.relics || {};
  if (!entries || typeof entries !== "object" || Array.isArray(entries)) {
    errors.push("item pool must define entries.");
  }
  if (typeof affixes !== "object" || Array.isArray(affixes)) {
    errors.push("item pool affixes must be an object.");
  }
  if (typeof relics !== "object" || Array.isArray(relics)) {
    errors.push("item pool relics must be an object.");
  }

  const affixIds = new Set(Object.keys(affixes || {}));
  for (const [id, affix] of Object.entries(affixes || {})) {
    if (!/^[a-z0-9_:-]+$/.test(id)) {
      errors.push(`Affix '${id}' must use a stable lowercase id.`);
    }
    if (!affix || typeof affix !== "object" || Array.isArray(affix)) {
      errors.push(`Affix '${id}' must be an object.`);
      continue;
    }
    if (typeof affix.name !== "string" || !affix.name.trim()) {
      errors.push(`Affix '${id}' is missing name.`);
    }
    if (!Array.isArray(affix.slotTypes) || !affix.slotTypes.length) {
      errors.push(`Affix '${id}' must declare slotTypes.`);
    } else {
      affix.slotTypes.forEach((slotType) => {
        if (!allowedItemSlotTypes.has(slotType)) {
          errors.push(`Affix '${id}' has invalid slotType '${slotType}'.`);
        }
      });
    }
    validateTags(affix.tags, `Affix '${id}'`, errors, { required: false });
    if (affix.defenseTypes !== undefined) {
      if (!Array.isArray(affix.defenseTypes) || !affix.defenseTypes.length) {
        errors.push(`Affix '${id}' defenseTypes must be a non-empty array.`);
      } else {
        affix.defenseTypes.forEach((defenseType) => {
          if (!allowedDefenseTypes.has(defenseType)) {
            errors.push(`Affix '${id}' has invalid defenseType '${defenseType}'.`);
          }
        });
      }
    }
    if (affix.build) validateItemBuild(affix.build, `Affix '${id}'`, errors);
    if (affix.buildAdd) validateItemBuild(affix.buildAdd, `Affix '${id}' buildAdd`, errors);
  }

  for (const [id, entry] of Object.entries(entries || {})) {
    validateItemPoolEntry(id, entry, "Item", affixIds, errors);
  }
  for (const [id, entry] of Object.entries(relics || {})) {
    validateItemPoolEntry(id, entry, "Relic", affixIds, errors);
  }
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
const itemPoolErrors = validateItemPool();
if (itemPoolErrors.length) {
  failures.push({ file: ITEM_POOL_PATH, errors: itemPoolErrors });
}

if (failures.length) {
  failures.forEach(({ file, errors }) => {
    console.error(path.relative(ROOT, file));
    errors.forEach((error) => console.error(`  - ${error}`));
  });
  process.exit(1);
}

console.log(`Validated ${listLevelFiles(LEVELS_DIR).length} level files and item pool.`);
