#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const LEVELS_DIR = path.join(ROOT, "levels");
const MANIFEST_PATH = path.join(LEVELS_DIR, "manifest.json");
const CAMPAIGN_MISSION_COUNT = 11;
const CAMPAIGN_VARIANTS = ["standard", "swarm", "armored"];

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function round2(value) {
  return Math.round(value * 100) / 100;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function missionNumberFromId(levelId) {
  const match = String(levelId || "").match(/^level(\d+)/);
  return match ? Number(match[1]) : 1;
}

function levelIdFor(baseId, variant) {
  return variant === "standard" ? baseId : `${baseId}_${variant}`;
}

function capitalize(value) {
  return String(value || "").charAt(0).toUpperCase() + String(value || "").slice(1);
}

function stripThreatCopy(value) {
  return String(value || "")
    .replace(/:\s*Threat Mix$/i, "")
    .replace(/\s*Variant with per-shot projectile damage, speed, and threat visuals for armor-class testing\./gi, "")
    .trim();
}

function damageBands(levelId) {
  const missionNumber = missionNumberFromId(levelId);
  return {
    chip: clamp(5 + Math.floor(missionNumber / 3), 4, 9),
    standard: clamp(12 + Math.round(missionNumber * 0.6), 12, 18),
    heavy: clamp(25 + Math.round(missionNumber * 1.1), 25, 36),
    bossHazard: clamp(40 + Math.round(missionNumber * 1.5), 40, 55),
    speedBoost: missionNumber * 3,
  };
}

const projectileImageFamilies = {
  chip: {
    cool: ["enemy_space_cool_chip_dart", "enemy_space_cool_chip_needle"],
    warm: ["enemy_space_warm_chip_dart", "enemy_space_warm_chip_needle"],
  },
  standard: {
    cool: ["enemy_space_cool_standard_bolt", "enemy_space_cool_standard_slug"],
    warm: ["enemy_space_warm_standard_bolt", "enemy_space_warm_standard_slug"],
  },
  heavy: {
    cool: ["enemy_space_cool_plasma_ball", "enemy_space_cool_heavy_core"],
    warm: ["enemy_space_warm_plasma_ball", "enemy_space_warm_heavy_core"],
  },
  bossHazard: {
    cool: ["enemy_space_cool_boss_core", "enemy_space_cool_boss_ring"],
    warm: ["enemy_space_warm_boss_core", "enemy_space_warm_boss_ring"],
  },
};

const projectileImageSpecs = {
  enemy_space_warm_chip_dart: { width: 13, height: 34, animation: "bolt" },
  enemy_space_warm_chip_needle: { width: 11, height: 38, animation: "lance" },
  enemy_space_warm_standard_bolt: { width: 16, height: 42, animation: "bolt" },
  enemy_space_warm_standard_slug: { width: 24, height: 42, animation: "lance" },
  enemy_space_cool_chip_dart: { width: 13, height: 34, animation: "bolt" },
  enemy_space_cool_chip_needle: { width: 11, height: 38, animation: "lance" },
  enemy_space_cool_standard_bolt: { width: 16, height: 42, animation: "bolt" },
  enemy_space_cool_standard_slug: { width: 24, height: 42, animation: "lance" },
  enemy_space_warm_plasma_ball: { width: 44, height: 44, animation: "orb", spinRate: 2.2 },
  enemy_space_warm_heavy_core: { width: 50, height: 50, animation: "orb", spinRate: 2.0 },
  enemy_space_warm_boss_core: { width: 70, height: 70, animation: "orb", spinRate: 1.8 },
  enemy_space_warm_boss_ring: { width: 76, height: 76, animation: "orb", spinRate: 1.6 },
  enemy_space_cool_plasma_ball: { width: 44, height: 44, animation: "orb", spinRate: 2.2 },
  enemy_space_cool_heavy_core: { width: 50, height: 50, animation: "orb", spinRate: 2.0 },
  enemy_space_cool_boss_core: { width: 70, height: 70, animation: "orb", spinRate: 1.8 },
  enemy_space_cool_boss_ring: { width: 76, height: 76, animation: "orb", spinRate: 1.6 },
};

const variantOffsets = {
  standard: 0,
  swarm: 1,
  armored: 2,
};

function paletteFor(levelId, family, variant) {
  const seed = missionNumberFromId(levelId) + (variantOffsets[variant] || 0);
  const warmPrimary = seed % 2 === 0;
  if (family === "standard" || family === "bossHazard") {
    return warmPrimary ? "cool" : "warm";
  }
  return warmPrimary ? "warm" : "cool";
}

function projectileVisualFor(levelId, family, offset = 0, variant = "standard") {
  const palette = paletteFor(levelId, family, variant);
  const options = projectileImageFamilies[family]?.[palette] || projectileImageFamilies.standard.cool;
  const image = options[(missionNumberFromId(levelId) + (variantOffsets[variant] || 0) + offset) % options.length];
  return {
    image,
    ...(projectileImageSpecs[image] || {}),
  };
}

function projectileProfilesFor(levelId, variant) {
  const bands = damageBands(levelId);
  return {
    chipNeedle: {
      threatClass: "chip",
      damage: bands.chip,
      speed: 244 + bands.speedBoost,
      radius: 3,
      ...projectileVisualFor(levelId, "chip", 0, variant),
    },
    standardBolt: {
      threatClass: "standard",
      damage: bands.standard,
      speed: 205 + bands.speedBoost,
      radius: 4,
      ...projectileVisualFor(levelId, "standard", 1, variant),
    },
    heavyOrb: {
      threatClass: "heavy",
      damage: bands.heavy,
      speed: clamp(178 - missionNumberFromId(levelId) * 2, 142, 176),
      radius: 8,
      ...projectileVisualFor(levelId, "heavy", 2, variant),
    },
    bossHazard: {
      threatClass: "bossHazard",
      damage: bands.bossHazard,
      speed: clamp(158 - missionNumberFromId(levelId) * 2, 118, 156),
      radius: 12,
      ...projectileVisualFor(levelId, "bossHazard", 3, variant),
    },
  };
}

const swarmTypes = new Set(["gnat", "dart", "scout", "interceptor"]);
const lightTypes = new Set(["drone", "spark", "skitter", "shieldkite", "lurker", "stalker", "hunter"]);
const lineTypes = new Set(["fighter", "sentinel", "marauder"]);
const heavyTypes = new Set(["plated", "duelist", "escort", "transport", "tank", "bulwark", "captain", "elite"]);

function withNumber(value, fallback) {
  return Number.isFinite(value) ? value : fallback;
}

function attackPatternsFor(typeId, config, levelId) {
  const fireRate = withNumber(config.fireRate, typeId === "boss" ? 1.1 : 2.2);
  const fireCount = Math.max(1, Math.round(withNumber(config.fireCount, 1)));
  const spreadDeg = Number.isFinite(config.fireSpread) ? Math.round((config.fireSpread * 180) / Math.PI) : 42;
  const missionNumber = missionNumberFromId(levelId);

  if (typeId === "boss") {
    return [
      {
        id: "chip_ring",
        mode: "radial",
        profile: "chipNeedle",
        count: clamp(10 + missionNumber * 2, 12, 30),
        fireRate: round2(Math.max(0.55, fireRate * 1.15)),
        weight: 4,
        speedJitter: 0.16,
      },
      {
        id: "mixed_fan",
        mode: "spread",
        profile: "standardBolt",
        count: 5,
        spreadDeg: 58,
        fireRate: round2(fireRate),
        weight: 3,
        shots: [
          { profile: "chipNeedle" },
          { profile: "standardBolt" },
          { profile: "bossHazard", speedJitter: 0.05 },
          { profile: "standardBolt" },
          { profile: "chipNeedle" },
        ],
      },
      {
        id: "hazard_pair",
        mode: "aim",
        profile: "heavyOrb",
        fireRate: round2(Math.max(0.75, fireRate * 1.55)),
        weight: 2,
        shots: [
          { profile: "heavyOrb", angleOffsetDeg: -8 },
          { profile: "bossHazard", angleOffsetDeg: 8 },
        ],
      },
    ];
  }

  if (swarmTypes.has(typeId)) {
    return [
      {
        id: "chip_snap",
        mode: "aim",
        profile: "chipNeedle",
        fireRate: round2(Math.max(1.2, fireRate * 0.9)),
        weight: 1,
        speedJitter: 0.08,
      },
    ];
  }

  if (lightTypes.has(typeId)) {
    const mode = config.fireMode === "spread" ? "spread" : "aim";
    return [
      {
        id: mode === "spread" ? "chip_spread" : "standard_snap",
        mode,
        profile: mode === "spread" ? "chipNeedle" : "standardBolt",
        count: mode === "spread" ? Math.max(3, fireCount || 5) : 1,
        spreadDeg: mode === "spread" ? Math.max(36, spreadDeg) : undefined,
        fireRate: round2(Math.max(1.05, fireRate)),
        weight: 3,
        speedJitter: 0.1,
      },
      {
        id: "pressure_bolt",
        mode: "aim",
        profile: "standardBolt",
        fireRate: round2(Math.max(1.5, fireRate * 1.35)),
        weight: 1,
      },
    ];
  }

  if (lineTypes.has(typeId)) {
    return [
      {
        id: "standard_burst",
        mode: config.fireMode === "spread" ? "spread" : "aim",
        profile: "standardBolt",
        count: config.fireMode === "spread" ? Math.max(3, fireCount || 3) : 1,
        spreadDeg: config.fireMode === "spread" ? Math.max(34, spreadDeg) : undefined,
        fireRate: round2(fireRate),
        weight: 3,
      },
      {
        id: "heavy_warning",
        mode: "aim",
        profile: "heavyOrb",
        fireRate: round2(Math.max(1.8, fireRate * 1.7)),
        weight: 1,
      },
    ];
  }

  if (heavyTypes.has(typeId)) {
    return [
      {
        id: "heavy_shot",
        mode: "aim",
        profile: "heavyOrb",
        fireRate: round2(Math.max(1.7, fireRate * 1.18)),
        weight: 3,
      },
      {
        id: "escort_fan",
        mode: "spread",
        profile: "standardBolt",
        count: 5,
        spreadDeg: Math.max(30, Math.min(62, spreadDeg)),
        fireRate: round2(Math.max(2.1, fireRate * 1.45)),
        weight: typeId === "escort" || typeId === "elite" ? 2 : 1,
        shots: [
          { profile: "chipNeedle" },
          { profile: "standardBolt" },
          { profile: "heavyOrb" },
          { profile: "standardBolt" },
          { profile: "chipNeedle" },
        ],
      },
    ];
  }

  return [
    {
      id: "standard_snap",
      mode: config.fireMode === "spread" ? "spread" : config.fireMode === "radial" ? "radial" : "aim",
      profile: config.fireMode === "radial" ? "chipNeedle" : "standardBolt",
      count: config.fireMode === "aim" || !config.fireMode ? 1 : Math.max(3, fireCount || 5),
      spreadDeg: config.fireMode === "spread" ? Math.max(36, spreadDeg) : undefined,
      fireRate: round2(fireRate),
      weight: 1,
      speedJitter: config.fireMode === "radial" ? 0.14 : 0.06,
    },
  ];
}

function mergeEnemyScale(baseScale, variantScale) {
  return {
    ...(baseScale || {}),
    ...variantScale,
  };
}

function ensureEnemyType(level, typeId, defaults = {}) {
  level.enemyTypes[typeId] = {
    ...defaults,
    ...(level.enemyTypes[typeId] || {}),
  };
}

function transformEvents(events, variant) {
  const cycle = variant === "swarm"
    ? ["gnat", "dart", "spark"]
    : ["plated", "escort", "bulwark"];
  let combatIndex = 0;
  return (Array.isArray(events) ? events : []).map((event) => {
    if (!event || typeof event !== "object" || event.type === "boss") return clone(event);
    const next = clone(event);
    next.type = cycle[combatIndex % cycle.length];
    combatIndex += 1;
    const count = Number.isFinite(next.count) ? next.count : 1;
    if (variant === "swarm") {
      next.count = Math.max(2, Math.ceil(count * 1.35));
      if (Number.isFinite(next.interval)) next.interval = round2(Math.max(0.12, next.interval * 0.72));
    } else {
      const isBulwark = next.type === "bulwark";
      next.count = Math.max(1, Math.ceil(count * (isBulwark ? 0.16 : 0.52)));
      if (Number.isFinite(next.interval)) next.interval = round2(Math.max(0.55, next.interval * 1.18));
    }
    return next;
  });
}

function synthesizeVariant(baseLevel, variant) {
  const baseId = baseLevel.id;
  const next = clone(baseLevel);
  next.id = levelIdFor(baseId, variant);
  next.baseLevel = baseId;
  next.variant = variant;
  next.name = `${stripThreatCopy(baseLevel.name) || baseId}: ${capitalize(variant)}`;
  next.enemyTypes = clone(baseLevel.enemyTypes || {});
  if (variant === "swarm") {
    next.description = "Fast attack variant with denser light craft pressure and tighter projectile lanes.";
    next.difficulty = `${baseLevel.difficulty || "Mission"}+`;
    next.enemyScale = mergeEnemyScale(baseLevel.enemyScale, { hp: 0.86, damage: 1.04 });
    ensureEnemyType(next, "gnat", {});
    ensureEnemyType(next, "dart", {});
    ensureEnemyType(next, "spark", {});
  } else {
    next.description = "Armored variant with fewer targets, thicker plating, and heavier warning shots.";
    next.difficulty = `${baseLevel.difficulty || "Mission"}+`;
    next.enemyScale = mergeEnemyScale(baseLevel.enemyScale, { hp: 1.24, damage: 1.12 });
    ensureEnemyType(next, "plated", { armor: 150, armorClass: 12, speed: 48, fireRate: 2.55 });
    ensureEnemyType(next, "escort", {});
    ensureEnemyType(next, "bulwark", {});
  }
  if (next.enemyTypes.boss) next.enemyTypes.boss.template = `${baseId}:boss`;
  next.events = transformEvents(baseLevel.events, variant);
  return next;
}

function prepareLevel(level, baseId, variant) {
  const next = clone(level);
  next.id = levelIdFor(baseId, variant);
  next.name = stripThreatCopy(next.name) || next.name;
  next.description = stripThreatCopy(next.description);
  if (variant === "standard") {
    delete next.baseLevel;
    delete next.variant;
  } else {
    next.baseLevel = baseId;
    next.variant = variant;
  }
  next.projectileProfiles = projectileProfilesFor(next.id, variant);
  Object.entries(next.enemyTypes || {}).forEach(([typeId, config]) => {
    if (!config || typeof config !== "object" || Array.isArray(config)) return;
    config.attackPatterns = attackPatternsFor(typeId, config, next.id);
  });
  return next;
}

function sourceLevelFor(baseLevel, variant) {
  const targetId = levelIdFor(baseLevel.id, variant);
  const targetPath = path.join(LEVELS_DIR, `${targetId}.json`);
  if (fs.existsSync(targetPath)) return readJson(targetPath);
  if (variant === "standard") return baseLevel;
  return synthesizeVariant(baseLevel, variant);
}

function desiredManifest() {
  const variants = {};
  for (let missionNumber = 1; missionNumber <= CAMPAIGN_MISSION_COUNT; missionNumber += 1) {
    const baseId = `level${missionNumber}`;
    variants[baseId] = ["swarm", "armored"].map((variant) => levelIdFor(baseId, variant));
  }
  return { variants };
}

function desiredCampaignIds() {
  const ids = new Set();
  for (let missionNumber = 1; missionNumber <= CAMPAIGN_MISSION_COUNT; missionNumber += 1) {
    const baseId = `level${missionNumber}`;
    CAMPAIGN_VARIANTS.forEach((variant) => ids.add(levelIdFor(baseId, variant)));
  }
  return ids;
}

function removeStaleCampaignFiles(desiredIds) {
  fs.readdirSync(LEVELS_DIR)
    .filter((file) => /^level(?:[1-9]|1[01])(?:_.+)?\.json$/.test(file))
    .forEach((file) => {
      const id = path.basename(file, ".json");
      if (desiredIds.has(id)) return;
      fs.unlinkSync(path.join(LEVELS_DIR, file));
      console.log(`removed levels/${file}`);
    });
}

const desiredIds = desiredCampaignIds();
for (let missionNumber = 1; missionNumber <= CAMPAIGN_MISSION_COUNT; missionNumber += 1) {
  const baseId = `level${missionNumber}`;
  const basePath = path.join(LEVELS_DIR, `${baseId}.json`);
  const baseLevel = readJson(basePath);
  CAMPAIGN_VARIANTS.forEach((variant) => {
    const source = sourceLevelFor(baseLevel, variant);
    const level = prepareLevel(source, baseId, variant);
    writeJson(path.join(LEVELS_DIR, `${level.id}.json`), level);
    console.log(`wrote levels/${level.id}.json`);
  });
}

removeStaleCampaignFiles(desiredIds);
writeJson(MANIFEST_PATH, desiredManifest());
console.log(`updated ${path.relative(ROOT, MANIFEST_PATH)}`);
