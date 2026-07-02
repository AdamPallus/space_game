#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CONFIG_PATH = path.join(ROOT, "config", "economy.json");

const VALID_RARITIES = ["scrap", "certified", "prototype", "preFounding"];
const VALID_SLOT_TYPES = ["primary", "mini", "defense", "aux"];
const VALID_HULL_IDS = ["starter", "bastion", "relay", "broadside"];
const VALID_UPGRADE_IDS = [
  "hull",
  "shield",
  "damage",
  "fireRate",
  "spread",
  "auxDamage",
  "auxCooldown",
  "cloakDuration",
  "dualFire",
];

const errors = [];

function fail(message) {
  errors.push(message);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function isPlainObject(value) {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function numberAt(value, pathLabel, { min = -Infinity, max = Infinity, integer = false } = {}) {
  if (!Number.isFinite(value)) {
    fail(`${pathLabel} must be a finite number.`);
    return false;
  }
  if (integer && !Number.isInteger(value)) {
    fail(`${pathLabel} must be an integer.`);
  }
  if (value < min || value > max) {
    fail(`${pathLabel} must be between ${min} and ${max}.`);
  }
  return true;
}

function stringAt(value, pathLabel) {
  if (typeof value !== "string" || !value.trim()) {
    fail(`${pathLabel} must be a non-empty string.`);
    return false;
  }
  return true;
}

function objectAt(value, pathLabel) {
  if (!isPlainObject(value)) {
    fail(`${pathLabel} must be an object.`);
    return false;
  }
  return true;
}

function arrayAt(value, pathLabel, { minLength = 1 } = {}) {
  if (!Array.isArray(value) || value.length < minLength) {
    fail(`${pathLabel} must be an array with at least ${minLength} item(s).`);
    return false;
  }
  return true;
}

function validateFraction(value, pathLabel) {
  numberAt(value, pathLabel, { min: 0, max: 1 });
}

function validatePositiveCost(value, pathLabel, { allowZero = false } = {}) {
  numberAt(value, pathLabel, { min: allowZero ? 0 : 1, integer: true });
}

function validateRange(value, pathLabel, { min = 0, max = Infinity, fraction = false } = {}) {
  if (!arrayAt(value, pathLabel, { minLength: 2 })) return;
  if (value.length !== 2) fail(`${pathLabel} must contain exactly two numbers.`);
  numberAt(value[0], `${pathLabel}[0]`, { min, max });
  numberAt(value[1], `${pathLabel}[1]`, { min, max });
  if (fraction) {
    validateFraction(value[0], `${pathLabel}[0]`);
    validateFraction(value[1], `${pathLabel}[1]`);
  }
  if (Number.isFinite(value[0]) && Number.isFinite(value[1]) && value[1] < value[0]) {
    fail(`${pathLabel} max must be greater than or equal to min.`);
  }
}

function validateWeights(weights, pathLabel, allowedKeys = null) {
  if (!objectAt(weights, pathLabel)) return;
  const entries = Object.entries(weights);
  if (!entries.length) fail(`${pathLabel} must include at least one weight.`);
  let total = 0;
  entries.forEach(([key, weight]) => {
    if (allowedKeys && !allowedKeys.includes(key)) {
      fail(`${pathLabel}.${key} is not an allowed key.`);
    }
    if (numberAt(weight, `${pathLabel}.${key}`, { min: 0 })) total += weight;
  });
  if (!(total > 0)) fail(`${pathLabel} must have a positive total weight.`);
}

function validateTiers(tiers, pathLabel, validateTier = () => {}) {
  if (!arrayAt(tiers, pathLabel)) return;
  let previousCost = -1;
  const seenTierIds = new Set();
  tiers.forEach((tier, index) => {
    const tierPath = `${pathLabel}[${index}]`;
    if (!objectAt(tier, tierPath)) return;
    validatePositiveCost(tier.cost, `${tierPath}.cost`, { allowZero: index === 0 });
    if (Number.isFinite(tier.cost) && tier.cost < previousCost) {
      fail(`${tierPath}.cost must not decrease from the prior tier.`);
    }
    previousCost = Number.isFinite(tier.cost) ? tier.cost : previousCost;
    if (tier.tier !== undefined) {
      numberAt(tier.tier, `${tierPath}.tier`, { min: 0, integer: true });
      if (seenTierIds.has(tier.tier)) fail(`${tierPath}.tier duplicates tier ${tier.tier}.`);
      seenTierIds.add(tier.tier);
    }
    validateTier(tier, tierPath, index);
  });
}

function validateConfig(config) {
  if (!objectAt(config, "config")) return;
  numberAt(config.version, "version", { min: 1, integer: true });

  const market = config.market;
  if (objectAt(market, "market")) {
    numberAt(market.buyRate, "market.buyRate", { min: 0 });
    validateFraction(market.sellRate, "market.sellRate");
    numberAt(market.stockVersion, "market.stockVersion", { min: 1, integer: true });
    numberAt(market.stockLots, "market.stockLots", { min: 1, integer: true });
    validateTiers(market.licenseTiers, "market.licenseTiers", (tier, tierPath) => {
      numberAt(tier.lots ?? tier.stockLots, `${tierPath}.lots`, { min: 1, integer: true });
    });
    numberAt(market.bulletinCadence, "market.bulletinCadence", { min: 1, integer: true });
    validateFraction(market.bulletinBonusRate, "market.bulletinBonusRate");
    validateFraction(market.mispricedLotChance, "market.mispricedLotChance");
    validateRange(market.mispricedValueRange, "market.mispricedValueRange", { min: 0, max: 1, fraction: true });
    validateFraction(market.mispricedMinProfitRate, "market.mispricedMinProfitRate");
    numberAt(market.earlyRecallAuditThreshold, "market.earlyRecallAuditThreshold", { min: 1, integer: true });
    if (arrayAt(market.stockRarityProgression, "market.stockRarityProgression")) {
      let previousLevel = 0;
      market.stockRarityProgression.forEach((entry, index) => {
        const entryPath = `market.stockRarityProgression[${index}]`;
        if (!objectAt(entry, entryPath)) return;
        numberAt(entry.unlockedLevel, `${entryPath}.unlockedLevel`, { min: 1, integer: true });
        if (Number.isFinite(entry.unlockedLevel) && entry.unlockedLevel < previousLevel) {
          fail(`${entryPath}.unlockedLevel must not decrease.`);
        }
        previousLevel = Number.isFinite(entry.unlockedLevel) ? entry.unlockedLevel : previousLevel;
        validateWeights(entry.weights, `${entryPath}.weights`, VALID_RARITIES);
      });
    }
    if (arrayAt(market.bulletinTags, "market.bulletinTags")) {
      const seenTags = new Set();
      market.bulletinTags.forEach((entry, index) => {
        const entryPath = `market.bulletinTags[${index}]`;
        if (!objectAt(entry, entryPath)) return;
        stringAt(entry.tag, `${entryPath}.tag`);
        stringAt(entry.label, `${entryPath}.label`);
        if (seenTags.has(entry.tag)) fail(`${entryPath}.tag duplicates ${entry.tag}.`);
        seenTags.add(entry.tag);
      });
    }
  }

  const extraction = config.extraction;
  if (objectAt(extraction, "extraction")) {
    numberAt(extraction.cargoSize, "extraction.cargoSize", { min: 1, integer: true });
    validateFraction(extraction.deathBountyWritedownRate, "extraction.deathBountyWritedownRate");
    validateFraction(extraction.deathBountyKeepFraction, "extraction.deathBountyKeepFraction");
    if (
      Number.isFinite(extraction.deathBountyWritedownRate) &&
      Number.isFinite(extraction.deathBountyKeepFraction) &&
      Math.abs(1 - extraction.deathBountyWritedownRate - extraction.deathBountyKeepFraction) > 0.0001
    ) {
      fail("extraction death writedown and keep fraction must sum to 1.");
    }
    if (objectAt(extraction.recoveryBonusRate, "extraction.recoveryBonusRate")) {
      validateFraction(extraction.recoveryBonusRate.min, "extraction.recoveryBonusRate.min");
      validateFraction(extraction.recoveryBonusRate.max, "extraction.recoveryBonusRate.max");
      if (extraction.recoveryBonusRate.max < extraction.recoveryBonusRate.min) {
        fail("extraction.recoveryBonusRate.max must be >= min.");
      }
    }
  }

  const itemValue = config.itemValue;
  if (objectAt(itemValue, "itemValue")) {
    if (objectAt(itemValue.rarityValueRanges, "itemValue.rarityValueRanges")) {
      VALID_RARITIES.forEach((rarity) => {
        validateRange(itemValue.rarityValueRanges[rarity], `itemValue.rarityValueRanges.${rarity}`, {
          min: 0,
        });
      });
    }
    if (objectAt(itemValue.rollQualityMultiplier, "itemValue.rollQualityMultiplier")) {
      numberAt(itemValue.rollQualityMultiplier.base, "itemValue.rollQualityMultiplier.base", { min: 0 });
      numberAt(itemValue.rollQualityMultiplier.scale, "itemValue.rollQualityMultiplier.scale", { min: 0 });
    }
  }

  const dropTables = config.dropTables;
  if (objectAt(dropTables, "dropTables")) {
    if (objectAt(dropTables.itemBaseTierGates, "dropTables.itemBaseTierGates")) {
      Object.entries(dropTables.itemBaseTierGates).forEach(([tier, level]) => {
        numberAt(Number(tier), `dropTables.itemBaseTierGates key ${tier}`, { min: 1, integer: true });
        numberAt(level, `dropTables.itemBaseTierGates.${tier}`, { min: 1, integer: true });
      });
    }
    validateWeights(dropTables.defaultSlotWeights, "dropTables.defaultSlotWeights", VALID_SLOT_TYPES);
    ["ordinary", "transport", "captain", "boss"].forEach((source) => {
      const sourceConfig = dropTables[source];
      if (!objectAt(sourceConfig, `dropTables.${source}`)) return;
      validateFraction(sourceConfig.chance, `dropTables.${source}.chance`);
      validateWeights(sourceConfig.rarityWeights, `dropTables.${source}.rarityWeights`, VALID_RARITIES);
      if (sourceConfig.slotWeights) {
        validateWeights(sourceConfig.slotWeights, `dropTables.${source}.slotWeights`, VALID_SLOT_TYPES);
      }
    });
    numberAt(dropTables.captain?.minBaseCredit, "dropTables.captain.minBaseCredit", { min: 0 });
    validateFraction(dropTables.eliteBonusChance, "dropTables.eliteBonusChance");
  }

  const rewards = config.missionRewards;
  if (objectAt(rewards, "missionRewards")) {
    numberAt(rewards.enemyBountyDifficultyScale, "missionRewards.enemyBountyDifficultyScale", { min: 0 });
    numberAt(rewards.fallbackEnemyBaseCredit, "missionRewards.fallbackEnemyBaseCredit", { min: 0 });
    numberAt(rewards.completionBase, "missionRewards.completionBase", { min: 0 });
    numberAt(rewards.completionIncrement, "missionRewards.completionIncrement", { min: 0 });
    numberAt(rewards.fallbackBossSalvageBaseCredit, "missionRewards.fallbackBossSalvageBaseCredit", { min: 0 });
  }

  if (objectAt(config.investments, "investments")) {
    Object.entries(config.investments).forEach(([key, track]) => {
      const trackPath = `investments.${key}`;
      if (!objectAt(track, trackPath)) return;
      stringAt(track.name, `${trackPath}.name`);
      validateTiers(track.tiers, `${trackPath}.tiers`, (tier, tierPath) => {
        stringAt(tier.benefit, `${tierPath}.benefit`);
        if (tier.dividend !== undefined) validateFraction(tier.dividend, `${tierPath}.dividend`);
        if (tier.hullId !== undefined && !VALID_HULL_IDS.includes(tier.hullId)) {
          fail(`${tierPath}.hullId references unknown hull ${tier.hullId}.`);
        }
        if (tier.upgradeId !== undefined && !VALID_UPGRADE_IDS.includes(tier.upgradeId)) {
          fail(`${tierPath}.upgradeId references unknown upgrade ${tier.upgradeId}.`);
        }
        if (tier.upgradeLevel !== undefined) {
          numberAt(tier.upgradeLevel, `${tierPath}.upgradeLevel`, { min: 1, integer: true });
        }
      });
    });
  }

  if (arrayAt(config.consumables, "consumables")) {
    const seenIds = new Set();
    config.consumables.forEach((item, index) => {
      const itemPath = `consumables[${index}]`;
      if (!objectAt(item, itemPath)) return;
      stringAt(item.id, `${itemPath}.id`);
      stringAt(item.name, `${itemPath}.name`);
      stringAt(item.desc, `${itemPath}.desc`);
      validatePositiveCost(item.cost, `${itemPath}.cost`);
      numberAt(item.usesPerMission, `${itemPath}.usesPerMission`, { min: 1, integer: true });
      numberAt(item.cooldown, `${itemPath}.cooldown`, { min: 0 });
      numberAt(item.unlockTier, `${itemPath}.unlockTier`, { min: 0, integer: true });
      stringAt(item.hudLabel, `${itemPath}.hudLabel`);
      if (item.duration !== undefined) numberAt(item.duration, `${itemPath}.duration`, { min: 0 });
      if (seenIds.has(item.id)) fail(`${itemPath}.id duplicates ${item.id}.`);
      seenIds.add(item.id);
    });
  }

  const targets = config.reportTargets;
  if (objectAt(targets, "reportTargets")) {
    numberAt(targets.certifiedAffordableMission, "reportTargets.certifiedAffordableMission", { min: 1, integer: true });
    numberAt(targets.firstInvestmentAffordableMission, "reportTargets.firstInvestmentAffordableMission", { min: 1, integer: true });
    numberAt(targets.trackSaturationTooEarlyMission, "reportTargets.trackSaturationTooEarlyMission", { min: 1, integer: true });
    validateFraction(targets.shortLoopEventFraction, "reportTargets.shortLoopEventFraction");
  }

  const legacy = config.legacyCreditGates;
  if (objectAt(legacy, "legacyCreditGates")) {
    numberAt(legacy.upgradeCostExponent, "legacyCreditGates.upgradeCostExponent", { min: 1 });
    numberAt(legacy.shipPanelCostExponent, "legacyCreditGates.shipPanelCostExponent", { min: 1 });
    if (arrayAt(legacy.shipUpgrades, "legacyCreditGates.shipUpgrades")) {
      legacy.shipUpgrades.forEach((entry, index) => {
        const entryPath = `legacyCreditGates.shipUpgrades[${index}]`;
        if (!objectAt(entry, entryPath)) return;
        stringAt(entry.id, `${entryPath}.id`);
        if (!VALID_UPGRADE_IDS.includes(entry.id)) fail(`${entryPath}.id is not a valid upgrade id.`);
        validatePositiveCost(entry.baseCost, `${entryPath}.baseCost`);
        if (entry.maxLevel !== undefined) numberAt(entry.maxLevel, `${entryPath}.maxLevel`, { min: 1, integer: true });
      });
    }
    if (arrayAt(legacy.supportUnlocks, "legacyCreditGates.supportUnlocks")) {
      legacy.supportUnlocks.forEach((entry, index) => {
        const entryPath = `legacyCreditGates.supportUnlocks[${index}]`;
        if (!objectAt(entry, entryPath)) return;
        stringAt(entry.id, `${entryPath}.id`);
        validatePositiveCost(entry.cost, `${entryPath}.cost`, { allowZero: true });
        numberAt(entry.unlockAt, `${entryPath}.unlockAt`, { min: 0 });
      });
    }
    if (objectAt(legacy.weaponComponents, "legacyCreditGates.weaponComponents")) {
      Object.entries(legacy.weaponComponents).forEach(([category, entries]) => {
        if (!arrayAt(entries, `legacyCreditGates.weaponComponents.${category}`)) return;
        entries.forEach((entry, index) => {
          const entryPath = `legacyCreditGates.weaponComponents.${category}[${index}]`;
          if (!objectAt(entry, entryPath)) return;
          stringAt(entry.id, `${entryPath}.id`);
          validatePositiveCost(entry.cost, `${entryPath}.cost`, { allowZero: true });
          numberAt(entry.unlockAt, `${entryPath}.unlockAt`, { min: 0 });
        });
      });
    }
  }
}

try {
  validateConfig(readJson(CONFIG_PATH));
} catch (error) {
  fail(`Failed to read ${CONFIG_PATH}: ${error.message}`);
}

if (errors.length) {
  errors.forEach((error) => console.error(`validate_economy_config: ${error}`));
  process.exit(1);
}

console.log("validate_economy_config: OK");
