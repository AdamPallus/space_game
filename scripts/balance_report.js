#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const ITEM_POOL_PATH = path.join(ROOT, "items", "item_pool.json");
const WEAPON_FRAMES_PATH = path.join(ROOT, "items", "weapon_frames.json");
const ENEMY_CATALOG_PATH = path.join(ROOT, "enemies", "enemy_catalog.json");
const ECONOMY_CONFIG_PATH = path.join(ROOT, "config", "economy.json");
const LEVEL_DIR = path.join(ROOT, "levels");
const LEVEL_MANIFEST_PATH = path.join(LEVEL_DIR, "manifest.json");

const ECONOMY = {
  minDamageFloor: 0.2,
  kinetic: {
    baseDamage: 14,
    baseVelocity: 560,
    velocityExponent: 1.5,
    sizeVelocityTradeoff: 0.62,
    impulseBudgetByDiameter: {
      small: 0.98,
      medium: 1,
      large: 1.16,
    },
    velocityLevelBudgetBonus: 0.12,
  },
  plasma: {
    baseDamage: 12,
    impulseSizeScale: 0.85,
    impulseSpeedDrag: 0.45,
    burnDuration: 3,
    burnDpsRate: 0.45,
    burnMaxDpsMultiplier: 1.35,
    burnArmorDamageScale: 0.55,
  },
  loadout: {
    singlePrimaryDamageBonus: 0.1,
    secondPrimaryDamagePenalty: 0.15,
  },
  rarities: {
    scrap: { label: "Scrap-grade", affixCount: 0, kineticImpulseBonus: 0 },
    certified: { label: "Certified", affixCount: 1, kineticImpulseBonus: 0.07 },
    prototype: { label: "Prototype", affixCount: 2, kineticImpulseBonus: 0.16 },
    preFounding: { label: "Pre-Founding", affixCount: 3, kineticImpulseBonus: 0.28 },
  },
};

const MINI_RARITY_TUNING = {
  scrap: { damageMult: 1, cooldownMult: 1, rangeMult: 1, speedMult: 1 },
  certified: { damageMult: 1.35, cooldownMult: 0.9, rangeMult: 1.04, speedMult: 1.03 },
  prototype: { damageMult: 1.75, cooldownMult: 0.8, rangeMult: 1.08, speedMult: 1.06 },
  preFounding: { damageMult: 2.25, cooldownMult: 0.72, rangeMult: 1.12, speedMult: 1.1 },
};
const DEFENSE_RARITY_TUNING = {
  scrap: 1,
  certified: 1.33,
  prototype: 1.66,
  preFounding: 2,
};
const BASE_ARMOR_CLASS = 10;
const FOCUSED_SINGLE_SHOT_DAMAGE_MULT = {
  small: 1.25,
  medium: 1.6,
  large: 2.25,
};

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const economyConfig = readJson(ECONOMY_CONFIG_PATH);
const levelManifest = readJson(LEVEL_MANIFEST_PATH);
const enemyCatalogEntries = readJson(ENEMY_CATALOG_PATH).entries || {};

function createDefaultShipBuild() {
  return {
    gunDiameter: "medium",
    spread: "focused",
    flowRateLevel: 0,
    flowVelocityLevel: 0,
    flowSizeLevel: 0,
    cooldownMult: 1,
    ammo: "kinetic",
    effect: "none",
    effectUpgrades: {
      homing: 0,
      explosive: 0,
      pierce: 0,
      vampiric: 0,
    },
    defenseSlots: ["shield", "none"],
    shieldMaxLevel: 0,
    shieldRegenLevel: 0,
    shieldCooldownLevel: 0,
    armorAmountLevel: 0,
    armorClass: 10,
    armorClassLevel: 0,
    armorDragLevel: 0,
    kineticImpulseBudget: 0,
  };
}

function normalizeSlotType(slotType) {
  if (slotType === "support") return "aux";
  if (slotType === "weapon") return "primary";
  return slotType || "primary";
}

function applyBuildPatch(build, patch = {}) {
  Object.entries(patch).forEach(([key, value]) => {
    if (key === "effectUpgrades") {
      build.effectUpgrades = {
        ...(build.effectUpgrades || {}),
        ...clone(value || {}),
      };
      return;
    }
    if (Array.isArray(value)) {
      build[key] = value.slice();
      return;
    }
    if (value && typeof value === "object") {
      build[key] = {
        ...(build[key] && typeof build[key] === "object" ? build[key] : {}),
        ...clone(value),
      };
      return;
    }
    build[key] = value;
  });
}

function applyBuildAdd(build, patch = {}) {
  Object.entries(patch).forEach(([key, value]) => {
    if (!Number.isFinite(value)) return;
    build[key] = (Number.isFinite(build[key]) ? build[key] : 0) + value;
  });
}

function makeRng(seed) {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

function getApplicableAffixes(pool, slotType, baseBuild = {}, baseEntry = {}) {
  const normalizedSlot = normalizeSlotType(slotType);
  const baseEffect = baseBuild.effect && baseBuild.effect !== "none" ? "weapon-effect" : null;
  return Object.entries(pool.affixes || {})
    .map(([id, affix]) => ({ id, ...affix }))
    .filter((affix) => {
      const allowedSlots = Array.isArray(affix.slotTypes) ? affix.slotTypes : [];
      if (!allowedSlots.map(normalizeSlotType).includes(normalizedSlot)) return false;
      if (
        normalizedSlot === "defense" &&
        Array.isArray(affix.defenseTypes) &&
        baseEntry.defenseType &&
        !affix.defenseTypes.includes(baseEntry.defenseType)
      ) {
        return false;
      }
      if (baseEffect && affix.exclusiveGroup === baseEffect) return false;
      return true;
    });
}

function pickAffixes(pool, slotType, baseBuild, count, rng, baseEntry = {}) {
  const selected = [];
  const usedGroups = new Set();
  const candidates = getApplicableAffixes(pool, slotType, baseBuild, baseEntry);
  while (selected.length < count && candidates.length) {
    const index = Math.floor(rng() * candidates.length);
    const affix = candidates.splice(index, 1)[0];
    if (affix.exclusiveGroup && usedGroups.has(affix.exclusiveGroup)) continue;
    selected.push(affix);
    if (affix.exclusiveGroup) usedGroups.add(affix.exclusiveGroup);
  }
  return selected;
}

function normalizeUniqueProperty(entry) {
  const property = entry.uniqueProperty;
  if (!property || typeof property !== "object" || Array.isArray(property)) return null;
  return {
    name: property.name || "Unique trace",
    tags: Array.isArray(property.tags) ? property.tags : [],
    build: property.build || {},
    buildAdd: property.buildAdd || {},
  };
}

function rollSampleItem(pool, id, entry, rarity, seed) {
  const rarityConfig = ECONOMY.rarities[rarity] || ECONOMY.rarities.scrap;
  const rng = makeRng(seed);
  const build = {
    ...createDefaultShipBuild(),
    ...clone(entry.build || {}),
    effectUpgrades: {
      ...createDefaultShipBuild().effectUpgrades,
      ...clone(entry.build?.effectUpgrades || {}),
    },
  };
  build.kineticImpulseBudget = Number.isFinite(build.kineticImpulseBudget)
    ? build.kineticImpulseBudget
    : 0;
  const slotType = normalizeSlotType(entry.slotType);
  const affixes = pickAffixes(pool, entry.slotType, build, rarityConfig.affixCount || 0, rng, entry);
  affixes.forEach((affix) => {
    const patch = { ...(affix.build || {}) };
    delete patch.effectUpgrades;
    applyBuildPatch(build, patch);
    // Phase 6: roll a per-instance magnitude multiplier on buildAdd affixes.
    if (affix.buildAdd) {
      let factor = 1;
      if (Array.isArray(affix.roll) && affix.roll.length === 2 && rarity !== "scrap") {
        const [min, max] = affix.roll;
        factor = min + rng() * (max - min);
      }
      const scaled = {};
      Object.entries(affix.buildAdd).forEach(([key, value]) => {
        scaled[key] = Number.isFinite(value) ? value * factor : value;
      });
      applyBuildAdd(build, scaled);
    }
    // Phase 6: roll an effect potency tier (certified 1, prototype 1-2, pre-Founding 2-3).
    const effect = affix.build && affix.build.effect;
    if (effect && effect !== "none" && affix.build.effectUpgrades && Number.isFinite(affix.build.effectUpgrades[effect])) {
      const range = rarity === "prototype" ? [1, 2] : rarity === "preFounding" ? [2, 3] : [1, 1];
      const tier = range[0] + Math.floor(rng() * (range[1] - range[0] + 1));
      applyBuildPatch(build, { effectUpgrades: { [effect]: tier } });
    } else if (affix.build && affix.build.effectUpgrades) {
      applyBuildPatch(build, { effectUpgrades: affix.build.effectUpgrades });
    }
  });
  build.kineticImpulseBudget += rarityConfig.kineticImpulseBonus || 0;
  const unique = normalizeUniqueProperty(entry);
  if (unique) {
    applyBuildPatch(build, unique.build || {});
    applyBuildAdd(build, unique.buildAdd || {});
  }
  const tunedDefenseBuild =
    slotType === "defense" ? tuneDefenseBuildForRarity(build, entry.defenseType, rarity) : null;
  const affixNames = [
    ...affixes.map((affix) => affix.name).filter(Boolean),
    unique?.name,
  ].filter(Boolean);
  return {
    id: `${rarity}:${id}`,
    name: `${rarityConfig.label} ${entry.name}${affixNames.length ? ` - ${affixNames.join(", ")}` : ""}`,
    tags: Array.from(
      new Set([
        ...(Array.isArray(entry.tags) ? entry.tags : []),
        ...affixes.flatMap((affix) => (Array.isArray(affix.tags) ? affix.tags : [])),
        ...(unique?.tags || []),
        rarity,
      ])
    ),
    build: tunedDefenseBuild || build,
    defenseType: entry.defenseType || null,
    miniWeapon: entry.miniWeapon ? tuneMiniWeaponForRarity(entry.miniWeapon, rarity) : null,
  };
}

function getKineticImpulseBudget(build, gunDiameter = "medium") {
  const kinetic = ECONOMY.kinetic;
  const baseBudget = kinetic.impulseBudgetByDiameter[gunDiameter] || 1;
  const velocityBonus = Math.max(0, build.flowVelocityLevel || 0) * kinetic.velocityLevelBudgetBonus;
  const itemBonus = Number.isFinite(build.kineticImpulseBudget) ? build.kineticImpulseBudget : 0;
  return Math.max(0.2, baseBudget + velocityBonus + itemBonus);
}

function getPlasmaImpulseTuning(build) {
  const impulseBudget = Math.max(
    0,
    Number.isFinite(build.kineticImpulseBudget) ? build.kineticImpulseBudget : 0
  );
  return {
    impulseBudget,
    sizeScale: 1 + impulseBudget * (ECONOMY.plasma.impulseSizeScale || 0),
    speedScale: 1 / (1 + impulseBudget * (ECONOMY.plasma.impulseSpeedDrag || 0)),
  };
}

function getPlasmaBurnDuration() {
  return Math.max(0.1, ECONOMY.plasma.burnDuration || 3);
}

function getPlasmaBurnDpsRate() {
  return Math.max(0, ECONOMY.plasma.burnDpsRate || 0.45);
}

function getPlasmaBurnMaxMultiplier() {
  const naturalRamp = getPlasmaBurnDpsRate() * getPlasmaBurnDuration();
  const configuredCap = ECONOMY.plasma.burnMaxDpsMultiplier || naturalRamp;
  return Math.max(0, Math.min(naturalRamp, configuredCap));
}

function getPlasmaSustainedBurnDps(directDps) {
  return Math.max(0, directDps) * getPlasmaBurnMaxMultiplier();
}

function getPlasmaBurnArmorDamageScale() {
  return Math.max(0, ECONOMY.plasma.burnArmorDamageScale || 1);
}

function roundTunedStat(value, decimals = 1) {
  const scale = Math.pow(10, decimals);
  return Math.round(value * scale) / scale;
}

function getMiniRarityTuning(rarity) {
  return MINI_RARITY_TUNING[rarity] || MINI_RARITY_TUNING.scrap;
}

function getDefenseRarityScale(rarity) {
  return DEFENSE_RARITY_TUNING[rarity] || DEFENSE_RARITY_TUNING.scrap;
}

function tuneDefenseBuildForRarity(build, defenseType, rarity = "scrap") {
  if (!build || typeof build !== "object" || Array.isArray(build)) return null;
  const scale = getDefenseRarityScale(rarity);
  const tuned = clone(build);
  if (defenseType === "armor") {
    const armorClass = Number.isFinite(tuned.armorClass)
      ? tuned.armorClass
      : BASE_ARMOR_CLASS;
    const armorClassBonus = Math.max(0, armorClass - BASE_ARMOR_CLASS);
    tuned.armorClass = roundTunedStat(BASE_ARMOR_CLASS + armorClassBonus * scale, 1);
    if (Number.isFinite(tuned.armorClassLevel)) {
      tuned.armorClassLevel = roundTunedStat(tuned.armorClassLevel * scale, 2);
    }
  } else if (defenseType === "shield") {
    if (Number.isFinite(tuned.shieldMaxLevel) && tuned.shieldMaxLevel > 0) {
      tuned.shieldMaxLevel = roundTunedStat(tuned.shieldMaxLevel * scale, 2);
    }
    if (Number.isFinite(tuned.shieldRegenLevel) && tuned.shieldRegenLevel > 0) {
      tuned.shieldRegenLevel = roundTunedStat(tuned.shieldRegenLevel * scale, 2);
    }
    if (Number.isFinite(tuned.shieldCooldownLevel) && tuned.shieldCooldownLevel < 0) {
      tuned.shieldCooldownLevel = roundTunedStat(tuned.shieldCooldownLevel * scale, 2);
    }
  } else {
    return null;
  }
  return tuned;
}

function tuneMiniWeaponForRarity(mini, rarity = "scrap") {
  const tuning = getMiniRarityTuning(rarity);
  return {
    ...clone(mini || {}),
    damage: roundTunedStat((Number(mini?.damage) || 0) * tuning.damageMult, 1),
    cooldown: Math.max(0.16, roundTunedStat((Number(mini?.cooldown) || 0.8) * tuning.cooldownMult, 2)),
    range: Number.isFinite(mini?.range) ? Math.round(mini.range * tuning.rangeMult) : 0,
    speed: Number.isFinite(mini?.speed) ? Math.round(mini.speed * tuning.speedMult) : 0,
  };
}

function getFocusedSingleShotDamageMult({ spread, gunDiameter, cooldown }) {
  if (spread !== "focused") return 1;
  const base = FOCUSED_SINGLE_SHOT_DAMAGE_MULT[gunDiameter] || FOCUSED_SINGLE_SHOT_DAMAGE_MULT.medium;
  const slowBonus = Math.max(0, Math.min(0.75, (cooldown - 0.28) * 1.8));
  return roundTunedStat(base + slowBonus, 2);
}

function getPrimaryFireConfig(build) {
  const gunDiameter = build.gunDiameter || "medium";
  const spread = build.spread || "focused";
  const ammo = build.ammo || "kinetic";
  const effect = build.effect || "none";
  let diameterScale = 1;
  let diameterSpeedScale = 1;
  if (ammo === "plasma") {
    diameterScale = gunDiameter === "small" ? 1.05 : gunDiameter === "large" ? 2.2 : 1.45;
    diameterSpeedScale = gunDiameter === "small" ? 0.82 : gunDiameter === "large" ? 0.45 : 0.62;
  } else {
    diameterScale = gunDiameter === "small" ? 0.85 : gunDiameter === "large" ? 1.25 : 1;
  }
  const flowRateLevel = build.flowRateLevel || 0;
  const flowVelocityLevel = build.flowVelocityLevel || 0;
  const flowSizeLevel = build.flowSizeLevel || 0;
  const flowRateScale = Math.pow(0.9, Math.max(0, flowRateLevel));
  const flowVelocityScale =
    ammo === "plasma"
      ? 1 + Math.max(0, flowVelocityLevel) * 0.04
      : 1 + Math.max(0, flowVelocityLevel) * 0.08;
  const flowSizeScale = 1 + Math.max(0, flowSizeLevel) * 0.12;
  const armorSlots = (build.defenseSlots || []).filter((slot) => slot === "armor").length;
  const armorPenalty =
    1 + armorSlots * 0.1 + Math.max(0, build.armorDragLevel || 0) * 0.06;
  const spreadRadiusScale = {
    focused: 1,
    dual: 0.82,
    dualRapid: 0.54,
    rapid: 0.58,
    burst: 0.5,
    wide: 0.5,
  }[spread] || 1;
  const cooldownMult = Number.isFinite(build.cooldownMult)
    ? Math.max(0.35, build.cooldownMult)
    : 1;
  const plasmaImpulseTuning = ammo === "plasma"
    ? getPlasmaImpulseTuning(build)
    : { impulseBudget: 0, sizeScale: 1, speedScale: 1 };
  const projectileRadius = 4 * diameterScale * flowSizeScale * spreadRadiusScale * plasmaImpulseTuning.sizeScale;
  const sizeFactor = Math.max(0.05, projectileRadius / 4);
  const kineticImpulseBudget = ammo === "kinetic" ? getKineticImpulseBudget(build, gunDiameter) : null;
  const velocityFactor =
    ammo === "kinetic"
      ? Math.max(
          0.2,
          kineticImpulseBudget / Math.pow(sizeFactor, ECONOMY.kinetic.sizeVelocityTradeoff)
        )
      : diameterSpeedScale * flowVelocityScale * plasmaImpulseTuning.speedScale;
  let cooldown = 0.28 * armorPenalty * flowRateScale * cooldownMult;
  if (spread === "dual") cooldown *= 1.28;
  if (spread === "dualRapid") cooldown *= 0.68;
  if (spread === "rapid") cooldown *= 0.46;
  if (spread === "burst") cooldown *= 2.15;
  if (spread === "wide") cooldown *= 1.15;
  cooldown = Math.max(0.08, cooldown);
  const shotDamageMult = getFocusedSingleShotDamageMult({ spread, gunDiameter, cooldown });
  const isRapidPattern = spread === "rapid" || spread === "dualRapid";
  return {
    ammo,
    effect,
    effectTune: build.effectUpgrades?.[effect] || 0,
    spread,
    bulletSpeed: ECONOMY.kinetic.baseVelocity * velocityFactor,
    projectileRadius,
    cooldown,
    shotDamageMult,
    armorChipFloorRate: isRapidPattern ? 0.035 : ECONOMY.minDamageFloor,
    minArmorChipDamage: isRapidPattern ? 0.25 : 1,
  };
}

function computePrimaryDamage({ ammo, speed, radius, shotDamageMult = 1, buildDamageMult = 1 }) {
  const sizeFactor = Math.max(0.05, radius / 4);
  const velocityFactor = Math.max(0.2, speed / ECONOMY.kinetic.baseVelocity);
  const baseDamage = ammo === "plasma"
    ? ECONOMY.plasma.baseDamage * sizeFactor
    : ECONOMY.kinetic.baseDamage *
      sizeFactor *
      Math.pow(velocityFactor, ECONOMY.kinetic.velocityExponent);
  return baseDamage *
    (Number.isFinite(shotDamageMult) ? shotDamageMult : 1) *
    (Number.isFinite(buildDamageMult) ? buildDamageMult : 1);
}

function projectileCountForSpread(spread) {
  return {
    wide: 5,
    dual: 2,
    dualRapid: 2,
    burst: 5,
    rapid: 1,
    focused: 1,
  }[spread] || 1;
}

function summarizePrimaryBuild(build) {
  const cfg = getPrimaryFireConfig(build);
  const perShot = computePrimaryDamage({
    ammo: cfg.ammo,
    speed: cfg.bulletSpeed,
    radius: cfg.projectileRadius,
    shotDamageMult: cfg.shotDamageMult,
    buildDamageMult: build.primaryDamageMult ?? 1,
  });
  const projectiles = projectileCountForSpread(cfg.spread);
  const volley = perShot * projectiles;
  const aps = cfg.cooldown > 0 ? 1 / cfg.cooldown : 0;
  const directDps = volley * aps;
  const burnDps = cfg.ammo === "plasma" ? getPlasmaSustainedBurnDps(directDps) : 0;
  return {
    perShot,
    volley,
    dps: directDps + burnDps,
    directDps,
    burnDps,
    aps,
    projectiles,
    spread: cfg.spread,
    ammo: cfg.ammo,
  };
}

function summarizeMiniWeapon(id, entry) {
  const mini = entry.miniWeapon || {};
  const cooldown = Math.max(0.16, mini.cooldown || 0);
  const damage = mini.damage || 0;
  return {
    id,
    name: entry.name || id,
    arc: mini.arc || "forward",
    ammo: mini.ammo || "kinetic",
    cadence: mini.cadence || "steady",
    range: mini.range || 0,
    damage,
    cooldown,
    dps: cooldown > 0 ? damage / cooldown : 0,
  };
}

function summarizeDefenseItem(id, entry) {
  const build = entry.build || {};
  const defenseType = entry.defenseType || "shield";
  const shieldSlots = defenseType === "shield" ? 1 : 0;
  const armorSlots = defenseType === "armor" ? 1 : 0;
  const shieldCapacitySlots = Math.max(0.25, shieldSlots + (build.shieldMaxLevel ?? 0) * 0.18);
  const shield = shieldSlots > 0 ? Math.round(40 * shieldCapacitySlots) : 0;
  const shieldRegenSlots = Math.max(0.2, shieldSlots + (build.shieldRegenLevel ?? 0) * 0.22);
  const shieldRegen = shieldSlots > 0 ? 12 * shieldRegenSlots : 0;
  const shieldRechargeDelay = shieldSlots > 0
    ? Math.max(0.7, 2.5 * (1 + (build.shieldCooldownLevel ?? 0) * 0.16))
    : 0;
  const armorCapacitySlots = Math.max(0.25, armorSlots + (build.armorAmountLevel ?? 0) * 0.18);
  const armor = armorSlots > 0 ? Math.round(80 * armorCapacitySlots) : 0;
  const armorClass = armorSlots > 0
    ? Math.round((build.armorClass ?? 10) + (build.armorClassLevel ?? 0) * 2)
    : 0;
  const lightProjectileDamage = armorSlots > 0 ? Math.max(0, 12 - armorClass) : null;
  return {
    id,
    name: entry.name || id,
    defenseType,
    shield,
    shieldRegen,
    shieldRechargeDelay,
    armor,
    armorClass,
    lightProjectileDamage,
  };
}

function normalizeEnemy(id, entry) {
  const spec = entry.template || {};
  const hull = spec.hull ?? spec.hp ?? 20;
  const armor = spec.armor ?? 0;
  return {
    id,
    name: entry.name || id,
    radius: spec.radius || 20,
    hull,
    maxShield: spec.shield || 0,
    shield: spec.shield || 0,
    maxArmor: armor,
    armor,
    armorClass: armor > 0 ? spec.armorClass || 0 : 0,
    boss: !!entry.boss || !!spec.isBoss,
  };
}

function simulatePlayerProjectileHit({ shield, armor, hull, armorClass }, damage) {
  let remaining = damage;
  let nextShield = shield;
  let nextArmor = armor;
  let nextHull = hull;
  if (nextShield > 0) {
    const absorbed = Math.min(nextShield, remaining);
    nextShield -= absorbed;
    remaining -= absorbed;
  }
  if (remaining > 0 && nextArmor > 0) {
    const effective = Math.max(0, remaining - armorClass);
    const absorbed = Math.min(nextArmor, effective);
    nextArmor -= absorbed;
    remaining = effective - absorbed;
  }
  if (remaining > 0) {
    nextHull -= remaining;
  }
  return { shield: nextShield, armor: nextArmor, hull: nextHull, armorClass };
}

function applyDamageToEnemy(
  enemy,
  damage,
  {
    chipFloor = true,
    chipFloorRate = ECONOMY.minDamageFloor,
    minChipDamage = 1,
    ignoreArmorClass = false,
    armorDamageMult = 1,
  } = {}
) {
  const baseDamage = Math.max(0, damage);
  let remaining = baseDamage;
  let applied = 0;
  if (enemy.maxShield > 0 && enemy.shield > 0 && remaining > 0) {
    const absorbed = Math.min(enemy.shield, remaining);
    enemy.shield -= absorbed;
    remaining -= absorbed;
    applied += absorbed;
  }
  if (remaining <= 0) return applied;
  if (enemy.maxArmor > 0 && enemy.armor > 0) {
    const floorDamage = chipFloor ? Math.max(minChipDamage, baseDamage * chipFloorRate) : 0;
    const armorClass = ignoreArmorClass ? 0 : (enemy.armorClass || 0);
    const armorLayerDamage = Math.max(0, remaining - armorClass) * Math.max(0, armorDamageMult);
    const effective = Math.max(floorDamage, armorLayerDamage);
    if (effective <= 0) return applied;
    const toArmor = Math.min(enemy.armor, effective);
    enemy.armor -= toArmor;
    applied += toArmor;
    const overflow = effective - toArmor;
    if (overflow > 0) {
      enemy.hull -= overflow;
      applied += overflow;
    }
    return applied;
  }
  enemy.hull -= remaining;
  applied += remaining;
  return applied;
}

function expectedHits(spread, enemy) {
  const enemyRadius = enemy.radius;
  const armored = enemy.maxArmor > 0 || enemy.armorClass > 0;
  if (spread === "focused") return 1;
  if (spread === "rapid") return 1;
  if (spread === "dual") return armored ? 1.55 : enemyRadius >= 30 ? 2 : 1.65;
  if (spread === "dualRapid") return armored ? 1.25 : enemyRadius >= 30 ? 1.85 : 1.45;
  if (spread === "burst") return armored ? 1.15 : enemyRadius >= 34 ? 4 : 3;
  if (armored) return enemyRadius >= 60 ? 0.45 : 0.35;
  if (enemyRadius >= 60) return 3.5;
  if (enemyRadius >= 30) return 2.2;
  return 1.4;
}

function applyExpectedHits(enemy, hitDamage, hits, hitOptions = {}) {
  const fullHits = Math.floor(hits);
  const fractional = hits - fullHits;
  for (let i = 0; i < fullHits; i += 1) {
    applyDamageToEnemy(enemy, hitDamage, hitOptions);
  }
  if (fractional > 0) {
    applyDamageToEnemy(enemy, hitDamage * fractional, hitOptions);
  }
}

function simulateTtk(build, enemyBase) {
  const enemy = clone(enemyBase);
  const cfg = getPrimaryFireConfig(build);
  const hitDamage = computePrimaryDamage({
    ammo: cfg.ammo,
    speed: cfg.bulletSpeed,
    radius: cfg.projectileRadius,
  });
  let elapsed = 0;
  let dotStacks = [];
  let dotDpsCap = 0;
  const hitOptions = {
    chipFloorRate: cfg.armorChipFloorRate,
    minChipDamage: cfg.minArmorChipDamage,
  };
  const pruneDotStacks = () => {
    dotStacks = dotStacks.filter((stack) => stack.timer > 0 && stack.dps > 0);
  };
  const applyDotWindow = (duration) => {
    let remaining = Math.max(0, duration);
    let consumed = 0;
    while (remaining > 0.0001) {
      pruneDotStacks();
      if (!dotStacks.length) {
        consumed += remaining;
        return consumed;
      }
      const step = Math.min(remaining, ...dotStacks.map((stack) => stack.timer));
      const stackedDps = dotStacks.reduce((sum, stack) => sum + stack.dps, 0);
      const activeDps = Math.min(stackedDps, dotDpsCap || stackedDps);
      applyDamageToEnemy(enemy, activeDps * step, {
        chipFloor: false,
        ignoreArmorClass: true,
        armorDamageMult: getPlasmaBurnArmorDamageScale(),
      });
      dotStacks.forEach((stack) => {
        stack.timer = Math.max(0, stack.timer - step);
      });
      consumed += step;
      remaining -= step;
      if (enemy.hull <= 0) return consumed;
    }
    return consumed;
  };
  while (elapsed <= 600) {
    const hits = expectedHits(cfg.spread, enemy);
    applyExpectedHits(enemy, hitDamage, hits, hitOptions);
    if (cfg.ammo === "plasma") {
      const sourceDps = hitDamage * hits * getPlasmaBurnDpsRate();
      if (sourceDps > 0) {
        dotStacks.push({
          timer: getPlasmaBurnDuration(),
          dps: sourceDps,
        });
        dotDpsCap = Math.max(
          dotDpsCap,
          getPlasmaSustainedBurnDps(hitDamage * hits / Math.max(0.01, cfg.cooldown))
        );
      }
    }
    if (enemy.hull <= 0) return Math.max(cfg.cooldown, elapsed);
    const dt = cfg.cooldown;
    const dotElapsed = applyDotWindow(dt);
    if (enemy.hull <= 0) return Math.max(cfg.cooldown, elapsed + dotElapsed);
    elapsed += dt;
  }
  return Infinity;
}

function formatTtk(value) {
  return Number.isFinite(value) ? value.toFixed(1) : "INF";
}

function isAntiArmorBuild(row) {
  const tags = new Set(row.tags || []);
  return tags.has("anti-armor") || tags.has("pierce") || row.build.effect === "pierce";
}

function isPreFoundingRelicBuild(row) {
  return row.id?.startsWith("preFounding:relic_") || (row.tags || []).includes("relic");
}

const pool = readJson(ITEM_POOL_PATH);
const frames = readJson(WEAPON_FRAMES_PATH).entries || {};
const enemies = Object.entries(enemyCatalogEntries)
  .map(([id, entry]) => normalizeEnemy(id, entry))
  .sort((a, b) => a.id.localeCompare(b.id));

const rows = [];
Object.entries(frames).forEach(([id, entry]) => {
  rows.push({
    id: `frame:${id}`,
    name: entry.name || id,
    tags: Array.isArray(entry.tags) ? entry.tags : [],
    build: {
      ...createDefaultShipBuild(),
      ...clone(entry.build || {}),
      effectUpgrades: {
        ...createDefaultShipBuild().effectUpgrades,
        ...clone(entry.build?.effectUpgrades || {}),
      },
    },
  });
});

Object.entries(pool.entries || {})
  .filter(([, entry]) => normalizeSlotType(entry.slotType) === "primary")
  .forEach(([id, entry], index) => {
    rows.push({
      id: `base:${id}`,
      name: entry.name || id,
      tags: Array.isArray(entry.tags) ? entry.tags : [],
      build: {
        ...createDefaultShipBuild(),
        ...clone(entry.build || {}),
        effectUpgrades: {
          ...createDefaultShipBuild().effectUpgrades,
          ...clone(entry.build?.effectUpgrades || {}),
        },
      },
    });
    rows.push(rollSampleItem(pool, id, entry, "certified", 1000 + index));
    rows.push(rollSampleItem(pool, id, entry, "prototype", 2000 + index));
  });

Object.entries(pool.relics || {})
  .filter(([, entry]) => normalizeSlotType(entry.slotType) === "primary")
  .forEach(([id, entry], index) => {
    rows.push(rollSampleItem(pool, id, entry, "preFounding", 3000 + index));
  });

const matrix = rows.map((row) => ({
  ...row,
  ttk: Object.fromEntries(enemies.map((enemy) => [enemy.id, simulateTtk(row.build, enemy)])),
  offense: summarizePrimaryBuild(row.build),
}));

const enemyLabels = enemies.map((enemy) => enemy.id);
const nameWidth = Math.max(20, ...matrix.map((row) => row.name.length));
const colWidth = 9;
console.log("TTK matrix (seconds)");
console.log(
  `${"Build".padEnd(nameWidth)} ${enemyLabels.map((id) => id.slice(0, colWidth).padStart(colWidth)).join(" ")}`
);
matrix.forEach((row) => {
  console.log(
    `${row.name.slice(0, nameWidth).padEnd(nameWidth)} ${enemyLabels
      .map((id) => formatTtk(row.ttk[id]).padStart(colWidth))
      .join(" ")}`
  );
});

// Phase 6 acceptance #1: vertical variety. Roll the same base+rarity many times and report the
// DPS spread that magnitude rolls now produce (it was ~0 before per-instance rolls existed).
console.log("\nMagnitude-roll DPS spread (same base + rarity, 200 rolls)");
[
  ["slug_cannon", "prototype"],
  ["needle_storm", "prototype"],
  ["longbow_rail", "preFounding"],
].forEach(([baseId, rarity]) => {
  const entry = (pool.entries && pool.entries[baseId]) || (pool.relics && pool.relics[baseId]);
  if (!entry) return;
  const samples = [];
  for (let i = 0; i < 200; i += 1) {
    const sample = rollSampleItem(pool, baseId, entry, rarity, 500000 + i);
    samples.push(summarizePrimaryBuild(sample.build).dps);
  }
  const min = Math.min(...samples);
  const max = Math.max(...samples);
  const mean = samples.reduce((sum, value) => sum + value, 0) / samples.length;
  const spread = mean > 0 ? ((max - min) / mean) * 100 : 0;
  const label = (ECONOMY.rarities[rarity] || {}).label || rarity;
  console.log(
    `${label} ${entry.name}: DPS ${min.toFixed(1)}-${max.toFixed(1)} (mean ${mean.toFixed(1)}, spread ${spread.toFixed(0)}%)`
  );
});

console.log("\nPrimary display stat coverage");
matrix
  .filter((row) => row.id.startsWith("base:") || row.id.startsWith("frame:"))
  .slice(0, 24)
  .forEach((row) => {
    const burnText = row.offense.burnDps
      ? ` (${row.offense.directDps.toFixed(1)} direct + ${row.offense.burnDps.toFixed(1)} burn)`
      : "";
    console.log(
      `${row.name}: per-shot ${row.offense.perShot.toFixed(1)} | volley ${row.offense.volley.toFixed(1)} | DPS ${row.offense.dps.toFixed(1)}${burnText} | ${row.offense.projectiles} ${row.offense.ammo} ${row.offense.spread}`
    );
  });

function average(values) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
}

function numericMissionIndex(levelId) {
  const match = String(levelId).match(/^level(\d+)$/);
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
}

function getStandardLevelIds() {
  const ids = Object.keys(levelManifest.variants || {});
  return ids
    .filter((id) => /^level\d+$/.test(id))
    .sort((a, b) => numericMissionIndex(a) - numericMissionIndex(b));
}

function readLevel(levelId, failures) {
  const file = path.join(LEVEL_DIR, `${levelId}.json`);
  if (!fs.existsSync(file)) {
    failures.push(`Credit Flow is missing ${levelId}.json.`);
    return null;
  }
  return readJson(file);
}

function mergeCreditFlowEnemySpec(level, typeId, failures) {
  const local = level?.enemyTypes?.[typeId];
  if (!local || typeof local !== "object" || Array.isArray(local)) {
    failures.push(`Credit Flow ${level?.id || "unknown"} event references missing enemy '${typeId}'.`);
    return null;
  }
  const templateId = typeof local.template === "string" ? local.template : typeId;
  const template = enemyCatalogEntries[templateId]?.template || {};
  const merged = {
    type: typeId,
    ...clone(template),
    ...clone(local),
  };
  delete merged.template;
  return merged;
}

function getCreditFlowSpawns(level, failures) {
  if (!Array.isArray(level?.events) || !level.events.length) {
    failures.push(`Credit Flow ${level?.id || "unknown"} has no mission events.`);
    return [];
  }
  const spawns = [];
  level.events.forEach((event) => {
    const spec = mergeCreditFlowEnemySpec(level, event.type, failures);
    if (!spec) return;
    const count = Math.max(1, Math.round(Number(event.count) || 1));
    const startTime = Math.max(0, Number(event.time) || 0);
    const interval = Math.max(0, Number(event.interval) || 0);
    for (let i = 0; i < count; i += 1) {
      spawns.push({
        time: startTime + interval * i,
        type: event.type,
        enemy: spec,
      });
    }
  });
  return spawns.sort((a, b) => a.time - b.time);
}

function creditFlowMissionEndTime(spawns) {
  return spawns.reduce((max, spawn) => Math.max(max, spawn.time), 0);
}

function creditFlowDifficultyAtElapsed(elapsed) {
  return 1 + Math.max(0, elapsed) / 22;
}

function expectedKillCredit(enemy, time) {
  const rewards = economyConfig.missionRewards || {};
  const base = Number.isFinite(enemy?.baseCredit)
    ? enemy.baseCredit
    : rewards.fallbackEnemyBaseCredit;
  const difficultyScale =
    1 + creditFlowDifficultyAtElapsed(time) * rewards.enemyBountyDifficultyScale;
  return Math.round(base * difficultyScale);
}

function isCreditFlowEliteLevel(level) {
  if (level?.elite || level?.modifier === "elite" || level?.variant === "elite") return true;
  if (Array.isArray(level?.modifiers) && level.modifiers.includes("elite")) return true;
  return /elite/i.test(`${level?.id || ""} ${level?.name || ""}`);
}

function getCreditFlowDropSource(enemy) {
  if (enemy?.isBoss || enemy?.boss || enemy?.type === "boss") return "boss";
  if (enemy?.type === "transport" || enemy?.type === "bulwark" || enemy?.ai === "transport") {
    return "transport";
  }
  const captain = economyConfig.dropTables?.captain || {};
  if ((enemy?.baseCredit || 0) >= captain.minBaseCredit) return "captain";
  return "ordinary";
}

function weightedAverage(weights, valueForKey) {
  const entries = Object.entries(weights || {}).filter(([, weight]) => Number(weight) > 0);
  const totalWeight = entries.reduce((sum, [, weight]) => sum + Number(weight), 0);
  if (!totalWeight) return 0;
  return entries.reduce((sum, [key, weight]) => sum + valueForKey(key) * Number(weight), 0) / totalWeight;
}

function expectedRarityListValue(rarity) {
  const ranges = economyConfig.itemValue?.rarityValueRanges || {};
  const [min, max] = ranges[rarity] || ranges.scrap;
  const midpoint = (Number(min) + Number(max)) / 2;
  const quality = economyConfig.itemValue?.rollQualityMultiplier || {};
  const qualityMult =
    rarity === "scrap"
      ? 1
      : quality.base + quality.scale * 0.5;
  return midpoint * qualityMult;
}

function expectedSourceSalvageSaleValue(sourceKey, { force = false, elite = false } = {}) {
  const dropTables = economyConfig.dropTables || {};
  const source = dropTables[sourceKey] || dropTables.ordinary || {};
  const baseChance = force ? 1 : Number(source.chance) || 0;
  const eliteBonus = elite && sourceKey !== "boss" ? Number(dropTables.eliteBonusChance) || 0 : 0;
  const chance = Math.max(0, Math.min(1, baseChance + eliteBonus));
  const expectedListValue = weightedAverage(source.rarityWeights, expectedRarityListValue);
  return chance * expectedListValue * economyConfig.market.sellRate;
}

function expectedPickupSalvageSaleValue(level, cutoff = Infinity) {
  const pickups = Array.isArray(level?.pickups) ? level.pickups : [];
  return pickups
    .filter((pickup) => pickup.type === "salvage" && (Number(pickup.time) || 0) <= cutoff)
    .reduce((sum, pickup) => {
      const count = Math.max(1, Math.round(Number(pickup.count) || 1));
      return (
        sum +
        count *
          expectedRarityListValue(pickup.rarity || "scrap") *
          economyConfig.market.sellRate
      );
    }, 0);
}

function objectiveCreditRewardForLevel(level) {
  const explicit = level?.objectiveCredits ?? level?.objectiveCredit ?? level?.creditReward;
  return Number.isFinite(explicit) ? Math.max(0, Math.round(explicit)) : 0;
}

function missionCompletionCreditForLevel(levelId) {
  const index = getStandardLevelIds().findIndex((id) => id === levelId);
  const rewards = economyConfig.missionRewards || {};
  return Math.round(rewards.completionBase + Math.max(0, index) * rewards.completionIncrement);
}

function formatCreditAmount(value) {
  return Math.round(value).toString();
}

function buildCreditFlowRow(levelId, index, mode, failures) {
  const level = readLevel(levelId, failures);
  if (!level) return null;
  const spawns = getCreditFlowSpawns(level, failures);
  const eventEndTime = creditFlowMissionEndTime(spawns);
  if (!eventEndTime) failures.push(`Credit Flow ${levelId} has no timed enemy spawns.`);
  const cutoff =
    mode === "short"
      ? eventEndTime * economyConfig.reportTargets.shortLoopEventFraction
      : Infinity;
  const includedSpawns = spawns.filter((spawn) => spawn.time <= cutoff);
  const elite = isCreditFlowEliteLevel(level);
  const killCredits = includedSpawns.reduce(
    (sum, spawn) => sum + expectedKillCredit(spawn.enemy, spawn.time),
    0
  );
  const enemySalvageSale = includedSpawns.reduce((sum, spawn) => {
    const sourceKey = getCreditFlowDropSource(spawn.enemy);
    return sum + expectedSourceSalvageSaleValue(sourceKey, {
      force: sourceKey === "boss",
      elite,
    });
  }, 0);
  const pickupSalvageSale = expectedPickupSalvageSaleValue(level, cutoff);
  const objectiveCredits = mode === "full" ? objectiveCreditRewardForLevel(level) : 0;
  const completionCredits = mode === "full" ? missionCompletionCreditForLevel(levelId, index) : 0;
  const grossCredits = killCredits + objectiveCredits + completionCredits;
  const recoveryRate = economyConfig.extraction.recoveryBonusRate;
  const expectedRecoveryBonus =
    mode === "full"
      ? grossCredits *
        ((Number(recoveryRate.min) + Number(recoveryRate.max)) / 2)
      : 0;
  const expectedSalvageSale = enemySalvageSale + pickupSalvageSale;
  const total =
    killCredits +
    objectiveCredits +
    completionCredits +
    expectedRecoveryBonus +
    expectedSalvageSale;
  const row = {
    levelId,
    mode,
    killCredits,
    objectiveCompletionCredits: objectiveCredits + completionCredits,
    expectedRecoveryBonus,
    expectedSalvageSale,
    total,
  };
  Object.entries(row).forEach(([key, value]) => {
    if (typeof value === "number" && !Number.isFinite(value)) {
      failures.push(`Credit Flow ${levelId} ${mode} produced non-finite ${key}.`);
    }
  });
  return row;
}

function firstAffordableMission(rows, cost) {
  const row = rows.find((entry) => entry.cumulative >= cost);
  return row ? row.levelId.replace("level", "M") : "n/a";
}

function collectAffordabilityItems() {
  const items = [];
  Object.entries(economyConfig.investments || {}).forEach(([trackKey, track]) => {
    if (trackKey === "hulls") return;
    (track.tiers || []).forEach((tier, index) => {
      if (Number(tier.cost) > 0) {
        items.push({
          category: "Investment",
          label: `${track.name || trackKey} T${index + 1}`,
          cost: Math.round(Number(tier.cost)),
          trackKey,
        });
      }
    });
  });
  (economyConfig.market?.licenseTiers || []).slice(1).forEach((tier) => {
    if (Number(tier.cost) > 0) {
      items.push({
        category: "Ledger License",
        label: `Ledger T${tier.tier}`,
        cost: Math.round(Number(tier.cost)),
        trackKey: "marketLicense",
      });
    }
  });
  ((economyConfig.investments || {}).hulls?.tiers || []).forEach((tier, index) => {
    if (Number(tier.cost) > 0) {
      items.push({
        category: "Hull License",
        label: `${tier.hullId || `Hull T${index + 1}`}`,
        cost: Math.round(Number(tier.cost)),
        trackKey: "hulls",
      });
    }
  });
  (economyConfig.consumables || []).forEach((item) => {
    if (Number(item.cost) > 0) {
      items.push({
        category: "Consumable",
        label: item.name || item.id,
        cost: Math.round(Number(item.cost)),
        trackKey: "consumables",
      });
    }
  });
  return items.sort((a, b) => a.cost - b.cost || a.label.localeCompare(b.label));
}

function collectTrackTotals() {
  return Object.entries(economyConfig.investments || {}).map(([trackKey, track]) => ({
    trackKey,
    name: track.name || trackKey,
    cost: (track.tiers || []).reduce((sum, tier) => sum + Math.max(0, Number(tier.cost) || 0), 0),
  }));
}

function printCreditFlowReport() {
  const creditFailures = [];
  const warnings = [];
  const levelIds = getStandardLevelIds();
  const fullRows = [];
  const shortRows = [];

  levelIds.forEach((levelId, index) => {
    const full = buildCreditFlowRow(levelId, index, "full", creditFailures);
    const short = buildCreditFlowRow(levelId, index, "short", creditFailures);
    if (full) fullRows.push(full);
    if (short) shortRows.push(short);
  });

  let fullCumulative = 0;
  fullRows.forEach((row) => {
    fullCumulative += row.total;
    row.cumulative = fullCumulative;
  });
  let shortCumulative = 0;
  shortRows.forEach((row) => {
    shortCumulative += row.total;
    row.cumulative = shortCumulative;
  });

  console.log("\nCredit Flow");
  console.log(
    `${"Mission".padEnd(8)} ${"Loop".padEnd(5)} ${"Kills".padStart(7)} ${"Obj+Comp".padStart(8)} ${"Recovery".padStart(8)} ${"Salvage".padStart(8)} ${"Total".padStart(8)} ${"Cumulative".padStart(10)}`
  );
  fullRows.forEach((fullRow, index) => {
    const shortRow = shortRows[index];
    [fullRow, shortRow].filter(Boolean).forEach((row) => {
      console.log(
        `${row.levelId.padEnd(8)} ${row.mode.padEnd(5)} ` +
          `${formatCreditAmount(row.killCredits).padStart(7)} ` +
          `${formatCreditAmount(row.objectiveCompletionCredits).padStart(8)} ` +
          `${formatCreditAmount(row.expectedRecoveryBonus).padStart(8)} ` +
          `${formatCreditAmount(row.expectedSalvageSale).padStart(8)} ` +
          `${formatCreditAmount(row.total).padStart(8)} ` +
          `${formatCreditAmount(row.cumulative).padStart(10)}`
      );
    });
  });
  console.log(
    `No-spend cumulative full clear: ${fullRows
      .map((row) => `${row.levelId.replace("level", "M")}=${formatCreditAmount(row.cumulative)}`)
      .join(" | ")}`
  );
  console.log(
    `No-spend cumulative short loop: ${shortRows
      .map((row) => `${row.levelId.replace("level", "M")}=${formatCreditAmount(row.cumulative)}`)
      .join(" | ")}`
  );

  const affordabilityItems = collectAffordabilityItems();
  console.log("\nCredit Flow affordability milestones");
  affordabilityItems.forEach((item) => {
    console.log(
      `${item.category.padEnd(15)} ${item.label.slice(0, 34).padEnd(34)} cost ${formatCreditAmount(item.cost).padStart(5)} | full ${firstAffordableMission(fullRows, item.cost).padEnd(4)} | short ${firstAffordableMission(shortRows, item.cost).padEnd(4)}`
    );
  });

  const certifiedCost = expectedRarityListValue("certified") * economyConfig.market.buyRate;
  const certifiedMission = firstAffordableMission(fullRows, certifiedCost);
  const certifiedTarget = economyConfig.reportTargets?.certifiedAffordableMission ?? 3;
  if (certifiedMission === "n/a" || Number(certifiedMission.slice(1)) > certifiedTarget) {
    warnings.push(
      `Average Certified item affordability lands at ${certifiedMission}; target is M${certifiedTarget}.`
    );
  }

  const investmentItems = affordabilityItems.filter((item) => item.category === "Investment");
  const firstInvestment = investmentItems[0];
  const firstInvestmentMission = firstInvestment
    ? firstAffordableMission(fullRows, firstInvestment.cost)
    : "n/a";
  const investmentTarget = economyConfig.reportTargets?.firstInvestmentAffordableMission ?? 5;
  if (firstInvestmentMission === "n/a" || Number(firstInvestmentMission.slice(1)) > investmentTarget) {
    warnings.push(
      `Cheapest investment affordability lands at ${firstInvestmentMission}; target is M${investmentTarget}.`
    );
  }

  const saturationThreshold = economyConfig.reportTargets?.trackSaturationTooEarlyMission ?? 7;
  collectTrackTotals().forEach((track) => {
    const mission = firstAffordableMission(fullRows, track.cost);
    if (mission !== "n/a" && Number(mission.slice(1)) <= saturationThreshold) {
      warnings.push(
        `${track.name} total cost ${formatCreditAmount(track.cost)} is affordable by ${mission}; early saturation threshold is M${saturationThreshold}.`
      );
    }
  });

  if (warnings.length) {
    console.warn("\nCredit Flow warnings:");
    warnings.forEach((warning) => console.warn(`- ${warning}`));
  }
  return { failures: creditFailures, warnings };
}

const basePrimaryRows = matrix.filter((row) => row.id.startsWith("base:"));
const focusedDps = basePrimaryRows
  .filter((row) => row.offense.spread === "focused")
  .map((row) => row.offense.dps);
const multiDps = basePrimaryRows
  .filter((row) => row.offense.spread !== "focused")
  .map((row) => row.offense.dps);
console.log(
  `\nFocused vs multi-shot DPS: focused avg ${average(focusedDps).toFixed(1)} / max ${Math.max(...focusedDps).toFixed(1)} | multi avg ${average(multiDps).toFixed(1)} / max ${Math.max(...multiDps).toFixed(1)}`
);
const basePrimaryDpsValues = basePrimaryRows.map((row) => row.offense.dps).filter(Number.isFinite);
const singlePrimaryFocusMult = 1 + ECONOMY.loadout.singlePrimaryDamageBonus;
const secondBayStrainMult = 1 - ECONOMY.loadout.secondPrimaryDamagePenalty;
const loadoutTradeoff = {
  baselineAvg: average(basePrimaryDpsValues),
  singleAvg: average(basePrimaryDpsValues.map((dps) => dps * singlePrimaryFocusMult)),
  strainedPerWeaponAvg: average(basePrimaryDpsValues.map((dps) => dps * secondBayStrainMult)),
  twoWeaponCoverageAvg: average(basePrimaryDpsValues.map((dps) => dps * secondBayStrainMult * 2)),
};
console.log(
  `Loadout focus/strain: one primary ${Math.round(singlePrimaryFocusMult * 100)}% damage avg ${loadoutTradeoff.singleAvg.toFixed(1)} DPS | ` +
    `two primaries ${Math.round(secondBayStrainMult * 100)}% per weapon avg ${loadoutTradeoff.strainedPerWeaponAvg.toFixed(1)} DPS each, ${loadoutTradeoff.twoWeaponCoverageAvg.toFixed(1)} combined coverage`
);

const miniRows = Object.entries(pool.entries || {})
  .filter(([, entry]) => normalizeSlotType(entry.slotType) === "mini")
  .flatMap(([id, entry], index) => [
    summarizeMiniWeapon(id, entry),
    summarizeMiniWeapon(`${id}:certified`, rollSampleItem(pool, id, entry, "certified", 4000 + index)),
    summarizeMiniWeapon(`${id}:prototype`, rollSampleItem(pool, id, entry, "prototype", 5000 + index)),
  ]);

console.log("\nMini weapon coverage");
miniRows.forEach((row) => {
  console.log(
    `${row.name}: ${row.arc} ${row.ammo} ${row.cadence} | ${row.damage.toFixed(1)} dmg / ${row.cooldown.toFixed(2)}s = ${row.dps.toFixed(1)} DPS | ${row.range}px`
  );
});

const defenseRows = [
  ...Object.entries(pool.entries || {})
    .filter(([, entry]) => normalizeSlotType(entry.slotType) === "defense")
    .flatMap(([id, entry], index) => [
      summarizeDefenseItem(`${id}:scrap`, rollSampleItem(pool, id, entry, "scrap", 6000 + index)),
      summarizeDefenseItem(`${id}:certified`, rollSampleItem(pool, id, entry, "certified", 7000 + index)),
      summarizeDefenseItem(`${id}:prototype`, rollSampleItem(pool, id, entry, "prototype", 8000 + index)),
    ]),
  ...Object.entries(pool.relics || {})
    .filter(([, entry]) => normalizeSlotType(entry.slotType) === "defense")
    .map(([id, entry], index) =>
      summarizeDefenseItem(`${id}:preFounding`, rollSampleItem(pool, id, entry, "preFounding", 9000 + index))
    ),
];

console.log("\nDefense item coverage");
defenseRows.forEach((row) => {
  if (row.defenseType === "armor") {
    console.log(
      `${row.name}: armor ${row.armor} | AC ${row.armorClass} | 12-damage hit -> ${row.lightProjectileDamage.toFixed(1)}`
    );
  } else {
    console.log(
      `${row.name}: shield ${row.shield} | regen ${row.shieldRegen.toFixed(1)}/s | recovery ${row.shieldRechargeDelay.toFixed(2)}s`
    );
  }
});
const firstLayerCheck = simulatePlayerProjectileHit(
  { shield: 60, armor: 60, hull: 100, armorClass: 13 },
  20
);
const shieldDrainedCheck = [0, 1, 2].reduce(
  (layers) => simulatePlayerProjectileHit(layers, 20),
  { shield: 60, armor: 60, hull: 100, armorClass: 13 }
);
const armorMitigationCheck = simulatePlayerProjectileHit(
  { shield: 0, armor: 60, hull: 100, armorClass: 13 },
  20
);
const armorDeletesCheck = simulatePlayerProjectileHit(
  { shield: 0, armor: 60, hull: 100, armorClass: 20 },
  20
);
const rawHullCheck = simulatePlayerProjectileHit(
  { shield: 0, armor: 0, hull: 100, armorClass: 20 },
  20
);
console.log(
  `Player layer check: shield-first ${firstLayerCheck.shield}/${firstLayerCheck.armor}/${firstLayerCheck.hull}; ` +
    `shield drained ${shieldDrainedCheck.shield}/${shieldDrainedCheck.armor}/${shieldDrainedCheck.hull}; ` +
    `AC13 armor hit ${armorMitigationCheck.shield}/${armorMitigationCheck.armor}/${armorMitigationCheck.hull}; ` +
    `AC20 armor hit ${armorDeletesCheck.shield}/${armorDeletesCheck.armor}/${armorDeletesCheck.hull}; ` +
    `raw hull hit ${rawHullCheck.shield}/${rawHullCheck.armor}/${rawHullCheck.hull}`
);

const toughestPlated = enemies
  .filter((enemy) => enemy.maxArmor > 0)
  .sort(
    (a, b) =>
      b.maxArmor + b.armorClass * 10 + b.hull + b.maxShield -
      (a.maxArmor + a.armorClass * 10 + a.hull + a.maxShield)
  )[0];

const failures = [];
const creditFlowReport = printCreditFlowReport();
failures.push(...creditFlowReport.failures);
if (!(singlePrimaryFocusMult > 1 && secondBayStrainMult > 0 && secondBayStrainMult < 1)) {
  failures.push("Loadout focus/strain multipliers are outside expected ranges.");
}
if (!(loadoutTradeoff.singleAvg > loadoutTradeoff.strainedPerWeaponAvg)) {
  failures.push("Single-primary focus should out-punch each strained second-bay weapon.");
}
if (!(loadoutTradeoff.twoWeaponCoverageAvg > loadoutTradeoff.singleAvg)) {
  failures.push("Two strained primaries should still offer more total coverage than one focused primary.");
}
if (miniRows.length < 4) {
  failures.push(`Expected at least 4 mini weapon samples; found ${miniRows.length}.`);
}
miniRows.forEach((row) => {
  if (!(row.damage > 0 && row.cooldown > 0 && row.dps > 0 && row.range > 0)) {
    failures.push(`${row.name} has invalid mini weapon output coverage.`);
  }
});
if (defenseRows.length < 4) {
  failures.push(`Expected at least 4 defense item samples; found ${defenseRows.length}.`);
}
defenseRows.forEach((row) => {
  if (row.defenseType === "armor") {
    if (!(row.armor > 0 && row.armorClass >= 10 && row.lightProjectileDamage >= 0)) {
      failures.push(`${row.name} has invalid armor defense output coverage.`);
    }
  } else if (!(row.shield > 0 && row.shieldRegen > 0 && row.shieldRechargeDelay > 0)) {
    failures.push(`${row.name} has invalid shield defense output coverage.`);
  }
});
if (firstLayerCheck.shield !== 40 || firstLayerCheck.armor !== 60 || firstLayerCheck.hull !== 100) {
  failures.push(`Shield-first layer check failed: ${JSON.stringify(firstLayerCheck)}.`);
}
if (shieldDrainedCheck.shield !== 0 || shieldDrainedCheck.armor !== 60 || shieldDrainedCheck.hull !== 100) {
  failures.push(`Shield drain layer check failed: ${JSON.stringify(shieldDrainedCheck)}.`);
}
if (armorMitigationCheck.armor !== 53 || armorMitigationCheck.hull !== 100) {
  failures.push(`Armor class mitigation check failed: ${JSON.stringify(armorMitigationCheck)}.`);
}
if (armorDeletesCheck.armor !== 60 || armorDeletesCheck.hull !== 100) {
  failures.push(`Armor class delete check failed: ${JSON.stringify(armorDeletesCheck)}.`);
}
if (rawHullCheck.hull !== 80) {
  failures.push(`Raw hull damage check failed: ${JSON.stringify(rawHullCheck)}.`);
}
const primaryDpsSamples = matrix
  .filter((row) => row.id.startsWith("base:"))
  .map((row) => row.offense.dps)
  .filter(Number.isFinite)
  .sort((a, b) => a - b);
const medianPrimaryDps = primaryDpsSamples[Math.floor(primaryDpsSamples.length / 2)] || 0;
if (medianPrimaryDps > 0) {
  miniRows.forEach((row) => {
    if (!row.id.includes(":") && row.dps > medianPrimaryDps * 0.45) {
      failures.push(`${row.name} mini DPS ${row.dps.toFixed(1)} is too close to primary median ${medianPrimaryDps.toFixed(1)}.`);
    }
  });
}
matrix.forEach((row) => {
  Object.entries(row.ttk).forEach(([enemyId, ttk]) => {
    if (!Number.isFinite(ttk)) {
      failures.push(`${row.name} has infinite TTK against ${enemyId}.`);
    }
  });
});

if (toughestPlated) {
  const nonRelicMatrix = matrix.filter((row) => !isPreFoundingRelicBuild(row));
  const antiArmorRows = nonRelicMatrix.filter(isAntiArmorBuild);
  const antiArmorBest = antiArmorRows
    .map((row) => ({ row, ttk: row.ttk[toughestPlated.id] }))
    .sort((a, b) => a.ttk - b.ttk)[0];
  if (!antiArmorBest || !Number.isFinite(antiArmorBest.ttk)) {
    failures.push(`No finite anti-armor reference for ${toughestPlated.id}.`);
  } else {
    nonRelicMatrix
      .filter((row) => !isAntiArmorBuild(row))
      .forEach((row) => {
        const ttk = row.ttk[toughestPlated.id];
        if (ttk + 0.05 < antiArmorBest.ttk) {
          failures.push(
            `${row.name} kills toughest plated enemy ${toughestPlated.id} in ${formatTtk(ttk)}s, faster than anti-armor reference ${antiArmorBest.row.name} (${formatTtk(antiArmorBest.ttk)}s).`
          );
        }
      });
    console.log(
      `Anti-armor reference: ${antiArmorBest.row.name} vs ${toughestPlated.id} = ${formatTtk(antiArmorBest.ttk)}s`
    );
    const relicBest = matrix
      .filter(isPreFoundingRelicBuild)
      .map((row) => ({ row, ttk: row.ttk[toughestPlated.id] }))
      .filter((entry) => Number.isFinite(entry.ttk))
      .sort((a, b) => a.ttk - b.ttk)[0];
    if (relicBest) {
      console.log(
        `Best Pre-Founding relic ceiling: ${relicBest.row.name} vs ${toughestPlated.id} = ${formatTtk(relicBest.ttk)}s`
      );
    }
  }
}

function requireRow(id) {
  const row = matrix.find((candidate) => candidate.id === id);
  if (!row) failures.push(`Balance report is missing ${id}.`);
  return row;
}

const phase4bRows = {
  needle: requireRow("base:needle_storm"),
  ember: requireRow("base:ember_spray"),
  plasmaLance: requireRow("base:plasma_lance"),
  slug: requireRow("base:slug_cannon"),
  longbow: requireRow("base:longbow_rail"),
};
const phase4bPlatedTarget =
  enemies.find((enemy) => enemy.id === "level8_armored:boss") ||
  enemies.find((enemy) => enemy.id === "plated") ||
  toughestPlated;
const phase4bSwarmTarget =
  enemies.find((enemy) => enemy.id === "fighter") ||
  enemies.find((enemy) => enemy.id === "scout") ||
  enemies.find((enemy) => enemy.id === "gnat");

if (phase4bPlatedTarget && Object.values(phase4bRows).every(Boolean)) {
  const needleTtk = phase4bRows.needle.ttk[phase4bPlatedTarget.id];
  const emberTtk = phase4bRows.ember.ttk[phase4bPlatedTarget.id];
  const plasmaLanceTtk = phase4bRows.plasmaLance.ttk[phase4bPlatedTarget.id];
  if (!(Number.isFinite(needleTtk) && Number.isFinite(emberTtk) && emberTtk <= needleTtk * 0.75)) {
    failures.push(
      `${phase4bRows.ember.name} should beat ${phase4bRows.needle.name} by at least 25% against ${phase4bPlatedTarget.id}; got ${formatTtk(emberTtk)}s vs ${formatTtk(needleTtk)}s.`
    );
  }
  if (!(Number.isFinite(plasmaLanceTtk) && Number.isFinite(emberTtk) && plasmaLanceTtk <= emberTtk + 0.05)) {
    failures.push(
      `${phase4bRows.plasmaLance.name} should stay at least as fast as ${phase4bRows.ember.name} against ${phase4bPlatedTarget.id}; got ${formatTtk(plasmaLanceTtk)}s vs ${formatTtk(emberTtk)}s.`
    );
  }
  console.log(
    `Phase 4b plated check target: ${phase4bPlatedTarget.id} | Slug ${formatTtk(phase4bRows.slug.ttk[phase4bPlatedTarget.id])}s, Longbow ${formatTtk(phase4bRows.longbow.ttk[phase4bPlatedTarget.id])}s, Plasma Lance ${formatTtk(plasmaLanceTtk)}s, Needle ${formatTtk(needleTtk)}s, Ember ${formatTtk(emberTtk)}s`
  );
}

if (phase4bSwarmTarget && Object.values(phase4bRows).every(Boolean)) {
  const bestHose = Math.min(
    phase4bRows.needle.ttk[phase4bSwarmTarget.id],
    phase4bRows.ember.ttk[phase4bSwarmTarget.id]
  );
  const bestArmor = Math.min(
    phase4bRows.slug.ttk[phase4bSwarmTarget.id],
    phase4bRows.longbow.ttk[phase4bSwarmTarget.id]
  );
  if (!(Number.isFinite(bestHose) && Number.isFinite(bestArmor) && bestHose < bestArmor)) {
    failures.push(
      `Needle Storm/Ember Spray must invert the relationship against ${phase4bSwarmTarget.id}; best hose ${formatTtk(bestHose)}s vs best armor ${formatTtk(bestArmor)}s.`
    );
  }
  console.log(
    `Phase 4b swarm check target: ${phase4bSwarmTarget.id} | best hose ${formatTtk(bestHose)}s, best armor ${formatTtk(bestArmor)}s`
  );
}

if (failures.length) {
  console.error("\nBalance report failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Balance report passed.");
