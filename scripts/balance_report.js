#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const ITEM_POOL_PATH = path.join(ROOT, "items", "item_pool.json");
const WEAPON_FRAMES_PATH = path.join(ROOT, "items", "weapon_frames.json");
const ENEMY_CATALOG_PATH = path.join(ROOT, "enemies", "enemy_catalog.json");

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
  const burnDps = cfg.ammo === "plasma" ? perShot * 0.45 : 0;
  return {
    perShot,
    volley,
    dps: volley * aps + burnDps,
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
  { chipFloor = true, chipFloorRate = ECONOMY.minDamageFloor, minChipDamage = 1 } = {}
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
    const effective = Math.max(floorDamage, remaining - (enemy.armorClass || 0));
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
  let dotTimer = 0;
  let dotDps = 0;
  const hitOptions = {
    chipFloorRate: cfg.armorChipFloorRate,
    minChipDamage: cfg.minArmorChipDamage,
  };
  while (elapsed <= 600) {
    const hits = expectedHits(cfg.spread, enemy);
    applyExpectedHits(enemy, hitDamage, hits, hitOptions);
    if (cfg.ammo === "plasma") {
      dotTimer = Math.max(dotTimer, 3);
      dotDps = Math.max(dotDps, hitDamage * 0.45);
    }
    if (enemy.hull <= 0) return Math.max(cfg.cooldown, elapsed);
    const dt = cfg.cooldown;
    if (dotTimer > 0 && dotDps > 0) {
      const dotStep = Math.min(dotTimer, dt);
      applyDamageToEnemy(enemy, dotDps * dotStep, { chipFloor: false });
      dotTimer = Math.max(0, dotTimer - dt);
      if (enemy.hull <= 0) return Math.max(cfg.cooldown, elapsed + dotStep);
    }
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
const enemies = Object.entries(readJson(ENEMY_CATALOG_PATH).entries || {})
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
    console.log(
      `${row.name}: per-shot ${row.offense.perShot.toFixed(1)} | volley ${row.offense.volley.toFixed(1)} | DPS ${row.offense.dps.toFixed(1)} | ${row.offense.projectiles} ${row.offense.ammo} ${row.offense.spread}`
    );
  });

function average(values) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
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
  const armorRows = [phase4bRows.slug, phase4bRows.longbow];
  const hoseRows = [phase4bRows.needle, phase4bRows.ember];
  armorRows.forEach((armorRow) => {
    hoseRows.forEach((hoseRow) => {
      const armorTtk = armorRow.ttk[phase4bPlatedTarget.id];
      const hoseTtk = hoseRow.ttk[phase4bPlatedTarget.id];
      if (!(Number.isFinite(armorTtk) && Number.isFinite(hoseTtk) && hoseTtk >= armorTtk * 2.5)) {
        failures.push(
          `${armorRow.name} must beat ${hoseRow.name} by >=2.5x against ${phase4bPlatedTarget.id}; got ${formatTtk(armorTtk)}s vs ${formatTtk(hoseTtk)}s.`
        );
      }
    });
  });
  console.log(
    `Phase 4b plated check target: ${phase4bPlatedTarget.id} | Slug ${formatTtk(phase4bRows.slug.ttk[phase4bPlatedTarget.id])}s, Longbow ${formatTtk(phase4bRows.longbow.ttk[phase4bPlatedTarget.id])}s, Needle ${formatTtk(phase4bRows.needle.ttk[phase4bPlatedTarget.id])}s, Ember ${formatTtk(phase4bRows.ember.ttk[phase4bPlatedTarget.id])}s`
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
