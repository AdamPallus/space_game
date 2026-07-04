#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const LEVELS_DIR = path.join(ROOT, "levels");
const LEVEL_MANIFEST_PATH = path.join(LEVELS_DIR, "manifest.json");
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
  "bulletStyle",
  "projectileProfile",
  "attackPatterns",
  "collisionDamage",
  "damageScale",
  "aggroRadius",
  "empImmune",
  "isBoss",
  "miniboss",
  "phases",
  "hpScale",
]);
const PROJECTILE_PROFILE_KEYS = new Set([
  "id",
  "profile",
  "damage",
  "speed",
  "radius",
  "width",
  "height",
  "visual",
  "image",
  "color",
  "shape",
  "animation",
  "spinRate",
  "threatClass",
]);
const PROJECTILE_ATTACK_PATTERN_KEYS = new Set([
  "id",
  "mode",
  "fireMode",
  "profile",
  "count",
  "spread",
  "spreadDeg",
  "fireRate",
  "weight",
  "speedJitter",
  "shots",
  "tractor",
]);
const PROJECTILE_SHOT_KEYS = new Set([
  ...PROJECTILE_PROFILE_KEYS,
  "angleDeg",
  "angleOffsetDeg",
  "speedJitter",
]);
const BOSS_PHASE_KEYS = new Set(["label", "hpFraction", "attackPatterns", "speedMult"]);
const PROJECTILE_ATTACK_MODES = new Set(["aim", "spread", "radial"]);
const PROJECTILE_THREAT_CLASSES = new Set(["chip", "standard", "heavy", "bossHazard"]);
const ROTATING_PROJECTILE_MAX_ASPECT = 1.5;

const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, "utf8")).entries || {};
const allowedItemSlotTypes = new Set(["primary", "mini", "defense", "aux", "support"]);
const allowedDefenseTypes = new Set(["shield", "armor"]);
const allowedItemSpreads = new Set(["focused", "dual", "dualRapid", "rapid", "burst", "wide"]);
const allowedItemEffects = new Set(["none", "homing", "explosive", "pierce", "vampiric"]);
const allowedMiniArcs = new Set(["forward", "wide", "turret"]);
const allowedMiniCadences = new Set(["rapid", "steady", "slow"]);
const allowedPickupTypes = new Set(["salvage", "shield_booster", "armor_patch"]);
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
  "cooldownMult",
  "shieldMaxLevel",
  "shieldRegenLevel",
  "shieldCooldownLevel",
  "armorAmountLevel",
  "armorClass",
  "armorClassLevel",
  "armorDragLevel",
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
      return entry.name.endsWith(".json") && entry.name !== "manifest.json" ? [full] : [];
    })
    .sort();
}

function isPlainObject(value) {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function validateProjectileProfile(id, profile, errors, context = `Projectile profile '${id}'`) {
  if (!isPlainObject(profile)) {
    errors.push(`${context} must be an object.`);
    return;
  }
  for (const key of Object.keys(profile)) {
    if (!PROJECTILE_PROFILE_KEYS.has(key)) {
      errors.push(`${context} uses unsupported field '${key}'.`);
    }
  }
  if (profile.threatClass && !PROJECTILE_THREAT_CLASSES.has(profile.threatClass)) {
    errors.push(`${context} has invalid threatClass '${profile.threatClass}'.`);
  }
  ["damage", "speed", "radius", "width", "height", "spinRate"].forEach((key) => {
    if (profile[key] !== undefined && !Number.isFinite(profile[key])) {
      errors.push(`${context} field '${key}' must be numeric.`);
    }
  });
  validateProjectileRotation(profile, errors, context);
}

function validateProjectileRotation(profile, errors, context) {
  if (!Number.isFinite(profile.spinRate)) return;
  const animation = typeof profile.animation === "string" ? profile.animation : "";
  if (animation === "lance" || animation === "bolt") {
    errors.push(`${context} uses spinRate on directional animation '${animation}'.`);
  }
  const width = Number.isFinite(profile.width)
    ? profile.width
    : Number.isFinite(profile.radius)
      ? profile.radius * 2
      : null;
  const height = Number.isFinite(profile.height)
    ? profile.height
    : Number.isFinite(profile.radius)
      ? profile.radius * 2
      : null;
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    if (profile.shape !== "orb") {
      errors.push(`${context} with spinRate must define compact width/height or a circular radius.`);
    }
    return;
  }
  const aspect = Math.max(width, height) / Math.min(width, height);
  if (aspect > ROTATING_PROJECTILE_MAX_ASPECT) {
    errors.push(`${context} with spinRate must be compact; aspect ${aspect.toFixed(2)} exceeds ${ROTATING_PROJECTILE_MAX_ASPECT}.`);
  }
}

function validateProjectileProfileRef(ref, profiles, errors, context) {
  if (ref === undefined) return;
  if (typeof ref === "string") {
    if (!profiles[ref]) errors.push(`${context} references unknown projectile profile '${ref}'.`);
    return;
  }
  if (isPlainObject(ref)) {
    validateProjectileProfile("inline", ref, errors, context);
    if (typeof ref.profile === "string") validateProjectileProfileRef(ref.profile, profiles, errors, context);
    return;
  }
  errors.push(`${context} must reference a named projectile profile or inline profile object.`);
}

function validateAttackPattern(pattern, index, profiles, errors, context) {
  const label = `${context} attackPatterns[${index}]`;
  if (!isPlainObject(pattern)) {
    errors.push(`${label} must be an object.`);
    return;
  }
  for (const key of Object.keys(pattern)) {
    if (!PROJECTILE_ATTACK_PATTERN_KEYS.has(key)) {
      errors.push(`${label} uses unsupported field '${key}'.`);
    }
  }
  const mode = pattern.mode || pattern.fireMode;
  if (mode && !PROJECTILE_ATTACK_MODES.has(mode)) {
    errors.push(`${label} has invalid mode '${mode}'.`);
  }
  validateProjectileProfileRef(pattern.profile, profiles, errors, `${label}.profile`);
  ["count", "spread", "spreadDeg", "fireRate", "weight", "speedJitter"].forEach((key) => {
    if (pattern[key] !== undefined && !Number.isFinite(pattern[key])) {
      errors.push(`${label} field '${key}' must be numeric.`);
    }
  });
  if (Number.isFinite(pattern.speedJitter) && (pattern.speedJitter < 0 || pattern.speedJitter > 1)) {
    errors.push(`${label} field 'speedJitter' must be between 0 and 1.`);
  }
  if (Number.isFinite(pattern.count) && pattern.count < 1) {
    errors.push(`${label} field 'count' must be at least 1.`);
  }
  if (Number.isFinite(pattern.fireRate) && pattern.fireRate <= 0) {
    errors.push(`${label} field 'fireRate' must be greater than 0.`);
  }
  if (Number.isFinite(pattern.weight) && pattern.weight < 0) {
    errors.push(`${label} field 'weight' must be non-negative.`);
  }
  if (pattern.shots !== undefined) {
    if (!Array.isArray(pattern.shots)) {
      errors.push(`${label}.shots must be an array.`);
    } else {
      pattern.shots.forEach((shot, shotIndex) => {
        const shotLabel = `${label}.shots[${shotIndex}]`;
        if (typeof shot === "string") {
          validateProjectileProfileRef(shot, profiles, errors, shotLabel);
          return;
        }
        if (!isPlainObject(shot)) {
          errors.push(`${shotLabel} must be a profile id or object.`);
          return;
        }
        for (const key of Object.keys(shot)) {
          if (!PROJECTILE_SHOT_KEYS.has(key)) {
            errors.push(`${shotLabel} uses unsupported field '${key}'.`);
          }
        }
        validateProjectileProfileRef(shot.profile, profiles, errors, `${shotLabel}.profile`);
        ["damage", "speed", "radius", "width", "height", "spinRate", "angleDeg", "angleOffsetDeg", "speedJitter"].forEach((key) => {
          if (shot[key] !== undefined && !Number.isFinite(shot[key])) {
            errors.push(`${shotLabel} field '${key}' must be numeric.`);
          }
        });
        if (Number.isFinite(shot.speedJitter) && (shot.speedJitter < 0 || shot.speedJitter > 1)) {
          errors.push(`${shotLabel} field 'speedJitter' must be between 0 and 1.`);
        }
      });
    }
  }
  if (pattern.tractor !== undefined) {
    if (!isPlainObject(pattern.tractor)) {
      errors.push(`${label}.tractor must be an object.`);
    } else {
      ["duration", "strength"].forEach((key) => {
        if (!Number.isFinite(pattern.tractor[key]) || pattern.tractor[key] <= 0) {
          errors.push(`${label}.tractor.${key} must be a positive number.`);
        }
      });
    }
  }
}

function validateBossPhases(phases, profiles, errors, context) {
  if (phases === undefined) return;
  if (!Array.isArray(phases)) {
    errors.push(`${context} phases must be an array.`);
    return;
  }
  let previous = Infinity;
  phases.forEach((phase, index) => {
    const label = `${context} phases[${index}]`;
    if (!isPlainObject(phase)) {
      errors.push(`${label} must be an object.`);
      return;
    }
    for (const key of Object.keys(phase)) {
      if (!BOSS_PHASE_KEYS.has(key)) {
        errors.push(`${label} uses unsupported field '${key}'.`);
      }
    }
    if (!Number.isFinite(phase.hpFraction) || phase.hpFraction <= 0 || phase.hpFraction >= 1) {
      errors.push(`${label}.hpFraction must be in (0,1).`);
    } else if (phase.hpFraction >= previous) {
      errors.push(`${label}.hpFraction values must be strictly descending.`);
    } else {
      previous = phase.hpFraction;
    }
    if (phase.speedMult !== undefined && (!Number.isFinite(phase.speedMult) || phase.speedMult <= 0)) {
      errors.push(`${label}.speedMult must be a positive number.`);
    }
    if (!Array.isArray(phase.attackPatterns) || !phase.attackPatterns.length) {
      errors.push(`${label}.attackPatterns must be a non-empty array.`);
    } else {
      phase.attackPatterns.forEach((pattern, patternIndex) => {
        validateAttackPattern(pattern, patternIndex, profiles, errors, label);
      });
    }
  });
}

function validateLevelDefense(defense, errors, context) {
  if (defense === undefined) return;
  if (!isPlainObject(defense)) {
    errors.push(`${context} defense must be an object.`);
    return;
  }
  const allowed = new Set(["integrity", "breachDamage"]);
  Object.keys(defense).forEach((key) => {
    if (!allowed.has(key)) errors.push(`${context} defense uses unsupported field '${key}'.`);
  });
  if (!Number.isFinite(defense.integrity) || defense.integrity <= 0) {
    errors.push(`${context} defense.integrity must be a positive number.`);
  }
  if (defense.breachDamage !== undefined) {
    if (!isPlainObject(defense.breachDamage)) {
      errors.push(`${context} defense.breachDamage must be an object.`);
    } else {
      Object.entries(defense.breachDamage).forEach(([key, value]) => {
        if (!Number.isFinite(value) || value < 0) {
          errors.push(`${context} defense.breachDamage.${key} must be a non-negative number.`);
        }
      });
    }
  }
}

function validateLevel(level) {
  const errors = [];
  const levelId = level.id || "unknown";
  const projectileProfiles = isPlainObject(level.projectileProfiles) ? level.projectileProfiles : {};
  validateLevelDefense(level.defense, errors, `Mission '${levelId}'`);
  if (level.projectileProfiles !== undefined) {
    if (!isPlainObject(level.projectileProfiles)) {
      errors.push(`Mission '${levelId}' projectileProfiles must be an object.`);
    } else {
      Object.entries(level.projectileProfiles).forEach(([profileId, profile]) => {
        validateProjectileProfile(profileId, profile, errors);
      });
    }
  }
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
    validateProjectileProfileRef(config.projectileProfile, projectileProfiles, errors, `Enemy '${typeId}' projectileProfile`);
    if (config.attackPatterns !== undefined) {
      if (!Array.isArray(config.attackPatterns)) {
        errors.push(`Enemy '${typeId}' attackPatterns must be an array.`);
      } else {
        config.attackPatterns.forEach((pattern, patternIndex) => {
          validateAttackPattern(pattern, patternIndex, projectileProfiles, errors, `Enemy '${typeId}'`);
        });
      }
    }
    validateBossPhases(config.phases, projectileProfiles, errors, `Enemy '${typeId}'`);
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
  if (level.debriefLore !== undefined) {
    if (!Array.isArray(level.debriefLore) || level.debriefLore.some((line) => typeof line !== "string")) {
      errors.push(`Mission '${levelId}' debriefLore must be an array of strings.`);
    }
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
  if (level.pickups !== undefined) {
    if (!Array.isArray(level.pickups)) {
      errors.push(`Mission '${levelId}' pickups must be an array.`);
    } else {
      level.pickups.forEach((pickup, index) => {
        const label = `Pickup ${index + 1} in '${levelId}'`;
        if (!pickup || typeof pickup !== "object" || Array.isArray(pickup)) {
          errors.push(`${label} must be an object.`);
          return;
        }
        if (!Number.isFinite(pickup.time) || pickup.time < 0) {
          errors.push(`${label} must declare a non-negative time.`);
        }
        if (!allowedPickupTypes.has(pickup.type)) {
          errors.push(`${label} has invalid type '${pickup.type}'.`);
        }
        if (pickup.x !== undefined && !Number.isFinite(pickup.x)) {
          errors.push(`${label} has invalid x.`);
        }
        if (pickup.y !== undefined && !Number.isFinite(pickup.y)) {
          errors.push(`${label} has invalid y.`);
        }
        if (pickup.type === "salvage" && pickup.slotType !== undefined && !allowedItemSlotTypes.has(pickup.slotType)) {
          errors.push(`${label} has invalid salvage slotType '${pickup.slotType}'.`);
        }
      });
    }
  }
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
  if (build.spread && !allowedItemSpreads.has(build.spread)) {
    errors.push(`${context} has invalid spread '${build.spread}'.`);
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
  if (entry.slotType === "mini") {
    const mini = entry.miniWeapon;
    if (!mini || typeof mini !== "object" || Array.isArray(mini)) {
      errors.push(`${label} '${id}' must declare miniWeapon.`);
    } else {
      if (!["kinetic", "plasma"].includes(mini.ammo)) {
        errors.push(`${label} '${id}' miniWeapon has invalid ammo '${mini.ammo}'.`);
      }
      if (!allowedMiniCadences.has(mini.cadence)) {
        errors.push(`${label} '${id}' miniWeapon has invalid cadence '${mini.cadence}'.`);
      }
      if (!allowedMiniArcs.has(mini.arc)) {
        errors.push(`${label} '${id}' miniWeapon has invalid arc '${mini.arc}'.`);
      }
      ["range", "cooldown", "damage", "speed", "radius"].forEach((field) => {
        if (!Number.isFinite(mini[field]) || mini[field] <= 0) {
          errors.push(`${label} '${id}' miniWeapon has invalid ${field}.`);
        }
      });
      if (mini.arc !== "turret" && (!Number.isFinite(mini.arcDegrees) || mini.arcDegrees <= 0 || mini.arcDegrees > 180)) {
        errors.push(`${label} '${id}' miniWeapon has invalid arcDegrees.`);
      }
      if (mini.effect !== undefined && !allowedItemEffects.has(mini.effect)) {
        errors.push(`${label} '${id}' miniWeapon has invalid effect '${mini.effect}'.`);
      }
    }
  }
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
  const heirlooms = pool.heirlooms || {};
  if (!entries || typeof entries !== "object" || Array.isArray(entries)) {
    errors.push("item pool must define entries.");
  }
  if (typeof affixes !== "object" || Array.isArray(affixes)) {
    errors.push("item pool affixes must be an object.");
  }
  if (typeof relics !== "object" || Array.isArray(relics)) {
    errors.push("item pool relics must be an object.");
  }
  if (typeof heirlooms !== "object" || Array.isArray(heirlooms)) {
    errors.push("item pool heirlooms must be an object.");
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
  for (const [id, entry] of Object.entries(heirlooms || {})) {
    validateItemPoolEntry(id, entry, "Heirloom", affixIds, errors);
  }
  return errors;
}

function validateLevelManifest() {
  const errors = [];
  if (!fs.existsSync(LEVEL_MANIFEST_PATH)) {
    return ["levels/manifest.json is missing."];
  }
  const manifest = JSON.parse(fs.readFileSync(LEVEL_MANIFEST_PATH, "utf8"));
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
    return ["level manifest root must be an object."];
  }
  const variants = manifest.variants;
  if (!variants || typeof variants !== "object" || Array.isArray(variants)) {
    return ["level manifest must define a variants object."];
  }
  Object.entries(variants).forEach(([baseId, variantIds]) => {
    const basePath = path.join(LEVELS_DIR, `${baseId}.json`);
    if (!fs.existsSync(basePath)) {
      errors.push(`Manifest base '${baseId}' does not exist.`);
    }
    if (!Array.isArray(variantIds)) {
      errors.push(`Manifest variants for '${baseId}' must be an array.`);
      return;
    }
    variantIds.forEach((variantId) => {
      if (typeof variantId !== "string" || !variantId.trim()) {
        errors.push(`Manifest base '${baseId}' contains an invalid variant id.`);
        return;
      }
      if (variantId === baseId) {
        errors.push(`Manifest base '${baseId}' repeats itself as a variant.`);
      }
      const variantPath = path.join(LEVELS_DIR, `${variantId}.json`);
      if (!fs.existsSync(variantPath)) {
        errors.push(`Manifest variant '${variantId}' for '${baseId}' does not exist.`);
      }
    });
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
const itemPoolErrors = validateItemPool();
if (itemPoolErrors.length) {
  failures.push({ file: ITEM_POOL_PATH, errors: itemPoolErrors });
}
const manifestErrors = validateLevelManifest();
if (manifestErrors.length) {
  failures.push({ file: LEVEL_MANIFEST_PATH, errors: manifestErrors });
}

if (failures.length) {
  failures.forEach(({ file, errors }) => {
    console.error(path.relative(ROOT, file));
    errors.forEach((error) => console.error(`  - ${error}`));
  });
  process.exit(1);
}

console.log(`Validated ${listLevelFiles(LEVELS_DIR).length} level files and item pool.`);
