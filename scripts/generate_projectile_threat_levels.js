#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const LEVELS_DIR = path.join(ROOT, "levels");
const MANIFEST_PATH = path.join(LEVELS_DIR, "manifest.json");

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

function baseIdForLevel(level) {
  if (typeof level.baseLevel === "string" && level.baseLevel) return level.baseLevel;
  const match = String(level.id || "").match(/^(level\d+)/);
  return match ? match[1] : level.id;
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

function projectileProfilesFor(levelId) {
  const bands = damageBands(levelId);
  return {
    chipNeedle: {
      threatClass: "chip",
      damage: bands.chip,
      speed: 244 + bands.speedBoost,
      radius: 3,
      image: "enemySpreadShard",
      width: 13,
      height: 13,
      animation: "shard",
      spinRate: 5.2,
    },
    standardBolt: {
      threatClass: "standard",
      damage: bands.standard,
      speed: 205 + bands.speedBoost,
      radius: 4,
      image: "enemyBullet",
      width: 11,
      height: 32,
      animation: "bolt",
    },
    heavyOrb: {
      threatClass: "heavy",
      damage: bands.heavy,
      speed: clamp(178 - missionNumberFromId(levelId) * 2, 142, 176),
      radius: 8,
      shape: "orb",
      color: "#fb923c",
      animation: "orb",
    },
    bossHazard: {
      threatClass: "bossHazard",
      damage: bands.bossHazard,
      speed: clamp(158 - missionNumberFromId(levelId) * 2, 118, 156),
      radius: 12,
      shape: "orb",
      color: "#ef4444",
      animation: "orb",
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

function threatVariantFor(level) {
  const originalId = level.id;
  const threatId = `${originalId}_threats`;
  const next = clone(level);
  next.id = threatId;
  next.baseLevel = baseIdForLevel(level);
  next.variant = level.variant ? `${level.variant}-threats` : "threats";
  next.name = `${level.name || originalId}: Threat Mix`;
  next.description = `${level.description || ""} Variant with per-shot projectile damage, speed, and threat visuals for armor-class testing.`.trim();
  next.projectileProfiles = projectileProfilesFor(originalId);
  Object.entries(next.enemyTypes || {}).forEach(([typeId, config]) => {
    if (!config || typeof config !== "object" || Array.isArray(config)) return;
    config.attackPatterns = attackPatternsFor(typeId, config, originalId);
  });
  return next;
}

function updateManifest(threatLevels) {
  const manifest = fs.existsSync(MANIFEST_PATH)
    ? readJson(MANIFEST_PATH)
    : { variants: {} };
  const variants = manifest.variants && typeof manifest.variants === "object" ? manifest.variants : {};
  threatLevels.forEach((level) => {
    const baseId = baseIdForLevel(level);
    const list = Array.isArray(variants[baseId]) ? variants[baseId].slice() : [];
    if (!list.includes(level.id)) list.push(level.id);
    variants[baseId] = list;
  });
  manifest.variants = variants;
  writeJson(MANIFEST_PATH, manifest);
}

const sourceFiles = fs
  .readdirSync(LEVELS_DIR)
  .filter((file) => /^level.*\.json$/.test(file) && !file.includes("_threats"))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const threatLevels = sourceFiles.map((file) => {
  const level = readJson(path.join(LEVELS_DIR, file));
  const threat = threatVariantFor(level);
  writeJson(path.join(LEVELS_DIR, `${threat.id}.json`), threat);
  console.log(`wrote levels/${threat.id}.json`);
  return threat;
});

updateManifest(threatLevels);
console.log(`updated ${path.relative(ROOT, MANIFEST_PATH)}`);
