const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const hudHull = document.getElementById("hud-hull");
const hudArmor = document.getElementById("hud-armor");
const hudShield = document.getElementById("hud-shield");
const hudCredits = document.getElementById("hud-credits");
const hudScore = document.getElementById("hud-score");
const hudTime = document.getElementById("hud-time");
const hudMini = document.getElementById("hud-mini");
const hudMission = document.getElementById("hud-mission");
const bossLabel = document.getElementById("boss-label");
const bossShieldFill = document.getElementById("boss-shield-fill");
const bossArmorFill = document.getElementById("boss-armor-fill");
const bossProgressFill = document.getElementById("boss-progress-fill");
const bossBurnHullFill = document.getElementById("boss-burn-hull-fill");
const bossBurnArmorFill = document.getElementById("boss-burn-armor-fill");
const bossBurnShieldFill = document.getElementById("boss-burn-shield-fill");
const minibossProgress = document.getElementById("miniboss-progress");
const minibossLabel = document.getElementById("miniboss-label");
const minibossShieldFill = document.getElementById("miniboss-shield-fill");
const minibossArmorFill = document.getElementById("miniboss-armor-fill");
const minibossProgressFill = document.getElementById("miniboss-progress-fill");
const hudCargoPips = document.getElementById("hud-cargo-pips");
const hudCargoStatus = document.getElementById("hud-cargo-status");
const hudWeapons = document.getElementById("hud-weapons");
const hudItem1 = document.getElementById("hud-item-1");
const hudItem2 = document.getElementById("hud-item-2");
const shipGunValue = document.getElementById("ship-gun-value");
const shipFlowValue = document.getElementById("ship-flow-value");
const shipAmmoValue = document.getElementById("ship-ammo-value");
const shipEffectsValue = document.getElementById("ship-effects-value");
const shipDefensesValue = document.getElementById("ship-defenses-value");
const shipModal = document.getElementById("ship-modal");
const shipModalCard = shipModal?.querySelector(".modal-card");
const shipModalTitle = document.getElementById("ship-modal-title");
const shipModalBody = document.getElementById("ship-modal-body");
const shipModalClose = document.getElementById("ship-modal-close");
const missionIntroModal = document.getElementById("mission-intro-modal");
const missionIntroConfirm = document.getElementById("mission-intro-confirm");
const missionIntroTitle = document.getElementById("mission-intro-title");
const missionIntroText = document.getElementById("mission-intro-text");
const rtbConfirmModal = document.getElementById("rtb-confirm-modal");
const rtbConfirmButton = document.getElementById("rtb-confirm");
const rtbCancelButton = document.getElementById("rtb-cancel");
const shipNodeButtons = document.querySelectorAll("[data-ship-node]");
const shipStats = document.getElementById("ship-stats");
const armoryBench = document.getElementById("armory-bench");
const armoryInspector = document.getElementById("armory-inspector");
const weaponInventory = document.getElementById("weapon-inventory");
const armoryRackTitle = document.getElementById("armory-rack-title");
const armoryRackCopy = document.getElementById("armory-rack-copy");
const armoryRackTip = document.getElementById("armory-rack-tip");
const armoryToggleStats = document.getElementById("armory-toggle-stats");
const armoryBrowserSearch = document.getElementById("armory-browser-search");
const armoryBrowserSort = document.getElementById("armory-browser-sort");
const armoryBrowserFilter = document.getElementById("armory-browser-filter");

const overlay = document.getElementById("overlay");
const hangarPanel = document.getElementById("hangar");
const debriefPanel = document.getElementById("debrief");
const hangarStatus = document.getElementById("hangar-status");

const pilotRank = document.getElementById("pilot-rank");
const availableCreditsEl = document.getElementById("available-credits");
const branchStandingEl = document.getElementById("branch-standing");
const lifetimeCreditsEl = document.getElementById("lifetime-credits");
const lastMissionEl = document.getElementById("last-mission");
const debugUnlock = document.getElementById("debug-unlock");
const debugInvincible = document.getElementById("debug-invincible");
const debugShowCompendium = document.getElementById("debug-show-compendium");
const debugShowItems = document.getElementById("debug-show-items");
const debugShowMath = document.getElementById("debug-show-math");
const debugSkipOnboarding = document.getElementById("debug-skip-onboarding");
const musicVolumeSlider = document.getElementById("music-volume");
const sfxVolumeSlider = document.getElementById("sfx-volume");
const musicVolumeOut = document.getElementById("music-volume-out");
const sfxVolumeOut = document.getElementById("sfx-volume-out");
const onboardingBanner = document.getElementById("onboarding-banner");
const missionBriefingText = document.getElementById("mission-briefing-text");
const hangarTabButtons = document.querySelectorAll(".tab-btn");
const hangarSceneButtons = document.querySelectorAll("[data-scene-target]");
const hangarTabPanels = document.querySelectorAll("[data-tab-panel]");
const ledgerBulletin = document.getElementById("ledger-bulletin");
const ledgerStockList = document.getElementById("ledger-stock-list");
const ledgerInventoryList = document.getElementById("ledger-inventory-list");
const ledgerReceipt = document.getElementById("ledger-receipt");
const ledgerLicenseStatus = document.getElementById("ledger-license-status");
const ledgerInventorySearch = document.getElementById("ledger-inventory-search");
const ledgerInventorySort = document.getElementById("ledger-inventory-sort");
const ledgerInventoryFilter = document.getElementById("ledger-inventory-filter");
const ledgerModeButtons = document.querySelectorAll("[data-ledger-mode]");
const ledgerModePanels = document.querySelectorAll("[data-ledger-panel]");


const launchBtn = document.getElementById("launch-btn");
const selectMissionBtn = document.getElementById("select-mission-btn");
const resetBtn = document.getElementById("reset-btn");
const returnBtn = document.getElementById("return-btn");

const debriefText = document.getElementById("debrief-text");
const debriefTime = document.getElementById("debrief-time");
const debriefKills = document.getElementById("debrief-kills");
const debriefCredits = document.getElementById("debrief-credits");
const debriefLedger = document.getElementById("debrief-ledger");
const debriefSalvage = document.getElementById("debrief-salvage");
const debriefStamp = document.getElementById("debrief-stamp");
const mobileAltBtn = document.getElementById("mobile-alt");
const mobileAltIcon = document.getElementById("mobile-alt-icon");
const mobileAltLabel = document.getElementById("mobile-alt-label");
const mobileSwapBtn = document.getElementById("mobile-swap");
const mobileItem1 = document.getElementById("mobile-item-1");
const mobileItem2 = document.getElementById("mobile-item-2");
const mobileEjectBtn = document.getElementById("mobile-eject");
const mobileLaunchBtn = document.getElementById("mobile-launch");
const mobileControls = document.getElementById("mobile-controls");
const levelList = document.getElementById("level-list");
const compendiumList = document.getElementById("compendium-list");
const compendiumSearch = document.getElementById("compendium-search");
const compendiumShowBosses = document.getElementById("compendium-show-bosses");
const archiveSort = document.getElementById("archive-sort");
const archiveFilter = document.getElementById("archive-filter");
const archiveTitle = document.getElementById("archive-title");
const compendiumModeButtons = document.querySelectorAll("[data-compendium-mode]");
const relicArchive = document.getElementById("relic-archive");

const STORAGE_KEY = "mini-fighter-save";
const ECONOMY_CONFIG_PATH = "config/economy.json";
const ECONOMY_OVERRIDE_STORAGE_KEY = "mini-fighter-economy-overrides";
const ECONOMY_PANEL_MINIMIZED_STORAGE_KEY = "mini-fighter-economy-panel-minimized";
const ASSET_ROOT = "assets/SpaceShooterRedux/PNG";
const BG_ROOT = "assets/SpaceShooterRedux/Backgrounds";
const GENERATED_ROOT = "assets/generated";
const GENERATED_BACKGROUND_ROOT = `${GENERATED_ROOT}/backgrounds_v1`;
const GENERATED_EFFECT_ROOT = `${GENERATED_ROOT}/effects_projectiles_v1`;
const GENERATED_SPACE_PROJECTILE_ROOT = `${GENERATED_ROOT}/enemy_projectiles_space_v1`;
const GENERATED_BIO_ROOT = `${GENERATED_ROOT}/bio_enemies_v1`;
const GENERATED_UI_CHROME_ROOT = `${GENERATED_ROOT}/ui_chrome_v2`;
const GENERATED_ITEM_ICON_ROOT = `${GENERATED_ROOT}/item_icons_v1`;
const GENERATED_ITEM_ICON_ROOT_V2 = `${GENERATED_ROOT}/item_icons_v2`;
const GENERATED_PILOT_ROOT = `${GENERATED_ROOT}/pilot_sprites`;
const GENERATED_OVERHAUL_ROOT = `${GENERATED_ROOT}/overhaul_player_kit_v1`;
const GENERATED_HULL_ROOT = `${GENERATED_ROOT}/overhaul_hulls_v2`;
const BOSS_DEFEAT_DELAY_SECONDS = 2.8;
const VALID_WEAPON_SPREADS = ["focused", "dual", "dualRapid", "rapid", "burst", "wide"];
const VALID_ITEM_SLOT_TYPES = ["primary", "mini", "defense", "aux", "support", "hull"];
const VALID_MINI_ARCS = ["forward", "wide", "turret"];
const EMP_CLEAR_BASE_RADIUS = 190;
const SECOND_PRIMARY_SWAP_COOLDOWN = 1.0;
const DUAL_FIRE_DAMAGE_MULTS = [0, 0.6, 0.7, 0.85, 1.0];
const WEAPON_SPREAD_LABELS = {
  focused: "Single",
  dual: "Dual",
  dualRapid: "Twin Rapid",
  rapid: "Rapid",
  burst: "Burst",
  wide: "Wide",
};
const GENERATED_BACKGROUND_URLS = {
  generatedTealRift: `${GENERATED_BACKGROUND_ROOT}/teal_rift_native_1024.png`,
  generatedAmberDust: `${GENERATED_BACKGROUND_ROOT}/amber_dust_native_1024.png`,
  generatedAmberDustLooped: `${GENERATED_BACKGROUND_ROOT}/amber_dust_looped_1024.png`,
  generatedDerelictDebris: `${GENERATED_BACKGROUND_ROOT}/derelict_debris_native_1024.png`,
  generatedDerelictDebrisLooped: `${GENERATED_BACKGROUND_ROOT}/derelict_debris_looped_1024.png`,
  generatedBioNebula: `${GENERATED_BACKGROUND_ROOT}/bio_nebula_native_1024.png`,
  generatedBioNebulaLooped: `${GENERATED_BACKGROUND_ROOT}/bio_nebula_looped_1024.png`,
  generatedDeepVoid: `${GENERATED_BACKGROUND_ROOT}/deep_void_native_1024.png`,
  generatedDeepVoidLooped: `${GENERATED_BACKGROUND_ROOT}/deep_void_looped_1024.png`,
  generatedCathedralDrift: `${GENERATED_BACKGROUND_ROOT}/cathedral_drift_native_1024.png`,
  generatedCathedralDriftLooped: `${GENERATED_BACKGROUND_ROOT}/cathedral_drift_looped_1024.png`,
  generatedArrearsField: `${GENERATED_BACKGROUND_ROOT}/arrears_field_native_1024.png`,
  generatedArrearsFieldLooped: `${GENERATED_BACKGROUND_ROOT}/arrears_field_looped_1024.png`,
  generatedOriginHull: `${GENERATED_BACKGROUND_ROOT}/origin_hull_native_1024.png`,
  generatedOriginHullLooped: `${GENERATED_BACKGROUND_ROOT}/origin_hull_looped_1024.png`,
};
const overhaulKit = {
  hulls: {
    starter: `${GENERATED_PILOT_ROOT}/player_interceptor.png`,
    bastion: `${GENERATED_HULL_ROOT}/hull_bastion.png`,
    relay: `${GENERATED_HULL_ROOT}/hull_relay.png`,
    broadside: `${GENERATED_HULL_ROOT}/hull_broadside.png`,
  },
  minis: {
    tickAutogun: `${GENERATED_OVERHAUL_ROOT}/mini_tick_autogun.png`,
    plasmaWisp: `${GENERATED_OVERHAUL_ROOT}/mini_plasma_wisp.png`,
    guardianTurret: `${GENERATED_OVERHAUL_ROOT}/mini_guardian_turret.png`,
    seekerLash: `${GENERATED_OVERHAUL_ROOT}/mini_seeker_lash.png`,
  },
  pickups: {
    shieldBooster: `${GENERATED_OVERHAUL_ROOT}/pickup_shield_booster.png`,
    armorPatch: `${GENERATED_OVERHAUL_ROOT}/pickup_armor_patch.png`,
  },
  capabilities: {
    dualFire: `${GENERATED_OVERHAUL_ROOT}/capability_dual_fire.png`,
    secondBay: `${GENERATED_OVERHAUL_ROOT}/capability_second_bay.png`,
    hullBlueprint: `${GENERATED_OVERHAUL_ROOT}/ledger_hull_blueprint.png`,
    basicWeaponCrate: `${GENERATED_OVERHAUL_ROOT}/shop_basic_weapon_crate.png`,
    auxModuleCrate: `${GENERATED_OVERHAUL_ROOT}/shop_aux_module_crate.png`,
    ledgerLicense: `${GENERATED_OVERHAUL_ROOT}/ledger_license_chip.png`,
  },
};
let shouldAutoLaunchFreshPilotMission = false;
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
const PROJECTILE_RUNTIME_PROFILE_KEYS = new Set([
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

const ECONOMY = {
  salvagePodSpeed: 40,
  fieldPickupSpeed: 46,
  cargoFullFlashSeconds: 1.1,
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
  rarityOrder: ["scrap", "certified", "prototype", "preFounding"],
  rarities: {
    scrap: {
      label: "Scrap-grade",
      shortLabel: "SCRAP",
      color: "#9aa3b2",
      glow: "rgba(154, 163, 178, 0.72)",
      affixCount: 0,
      kineticImpulseBonus: 0,
    },
    certified: {
      label: "Certified",
      shortLabel: "CERT",
      color: "#4da6ff",
      glow: "rgba(77, 166, 255, 0.8)",
      affixCount: 1,
      kineticImpulseBonus: 0.07,
    },
    prototype: {
      label: "Prototype",
      shortLabel: "PROTO",
      color: "#b06bff",
      glow: "rgba(176, 107, 255, 0.84)",
      affixCount: 2,
      kineticImpulseBonus: 0.16,
    },
    preFounding: {
      label: "Pre-Founding",
      shortLabel: "RELIC",
      color: "#f0b429",
      glow: "rgba(240, 180, 41, 0.9)",
      affixCount: 3,
      kineticImpulseBonus: 0.28,
    },
  },
};

let baseEconomyConfig = null;
let economyConfig = null;
let economyOverrideDiff = {};
let upgrades = [];
let consumables = [];
let consumablesById = {};
let investments = {};
let rmbWeapons = [];
let weaponComponents = {};

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function isPlainObject(value) {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function deepMerge(base, patch) {
  if (!isPlainObject(base) || !isPlainObject(patch)) return deepClone(patch);
  const merged = deepClone(base);
  Object.entries(patch).forEach(([key, value]) => {
    if (isPlainObject(value) && isPlainObject(merged[key])) {
      merged[key] = deepMerge(merged[key], value);
    } else {
      merged[key] = deepClone(value);
    }
  });
  return merged;
}

function deepDiff(base, value) {
  if (Array.isArray(base) || Array.isArray(value)) {
    return JSON.stringify(base) === JSON.stringify(value) ? undefined : deepClone(value);
  }
  if (isPlainObject(base) && isPlainObject(value)) {
    const diff = {};
    const keys = new Set([...Object.keys(base), ...Object.keys(value)]);
    keys.forEach((key) => {
      const child = deepDiff(base[key], value[key]);
      if (child !== undefined) diff[key] = child;
    });
    return Object.keys(diff).length ? diff : undefined;
  }
  return base === value ? undefined : deepClone(value);
}

function setConfigPathValue(root, path, value) {
  let node = root;
  for (let i = 0; i < path.length - 1; i += 1) {
    node = node[path[i]];
  }
  node[path[path.length - 1]] = value;
}

function getEconomyConfig() {
  if (!economyConfig) throw new Error("Economy config has not loaded.");
  return economyConfig;
}

function getMarketConfig() {
  return getEconomyConfig().market || {};
}

function getExtractionConfig() {
  return getEconomyConfig().extraction || {};
}

function getDropTableConfig() {
  return getEconomyConfig().dropTables || {};
}

function getMissionRewardConfig() {
  return getEconomyConfig().missionRewards || {};
}

function getRarityValueRange(rarity = "scrap") {
  const ranges = getEconomyConfig().itemValue?.rarityValueRanges || {};
  const range = ranges[rarity] || ranges.scrap;
  if (!Array.isArray(range) || range.length !== 2) {
    throw new Error(`Missing itemValue.rarityValueRanges.${rarity}.`);
  }
  return range;
}

function getRollQualityValueMultiplier(rollQuality) {
  const config = getEconomyConfig().itemValue?.rollQualityMultiplier || {};
  const base = config.base;
  const scale = config.scale;
  return base + scale * Math.max(0, Math.min(1, Number(rollQuality) || 0));
}

function getMarketSellRate() {
  const value = getMarketConfig().sellRate;
  return Math.max(0, Math.min(1, value));
}

function getMarketHandlingFeeRate() {
  return Math.max(0, Math.min(1, 1 - getMarketSellRate()));
}

function getConfiguredCargoSize() {
  const value = getExtractionConfig().cargoSize;
  return Math.max(1, Math.round(value));
}

function normalizeEconomyLicenseTier(config, fallbackTier = 0) {
  if (!isPlainObject(config)) throw new Error("market.licenseTiers entries must be objects.");
  const lots = Number(config?.lots ?? config?.stockLots);
  const tier = Number(config?.tier ?? fallbackTier);
  const cost = Number(config?.cost);
  if (!Number.isFinite(tier)) throw new Error("market.licenseTiers tier must be finite.");
  if (!Number.isFinite(lots)) throw new Error("market.licenseTiers lots must be finite.");
  if (!Number.isFinite(cost)) throw new Error("market.licenseTiers cost must be finite.");
  return {
    tier: Math.max(0, Math.round(tier)),
    lots: Math.max(1, Math.round(lots)),
    cost: Math.max(0, Math.round(cost)),
  };
}

function normalizeEconomyConfig(config) {
  if (!isPlainObject(config)) throw new Error("Economy config root must be an object.");
  const normalized = deepClone(config);
  if (!isPlainObject(normalized.market)) throw new Error("Economy config missing market.");
  if (!isPlainObject(normalized.extraction)) throw new Error("Economy config missing extraction.");
  if (!isPlainObject(normalized.itemValue)) throw new Error("Economy config missing itemValue.");
  if (!isPlainObject(normalized.dropTables)) throw new Error("Economy config missing dropTables.");
  if (!isPlainObject(normalized.investments)) throw new Error("Economy config missing investments.");
  if (!Array.isArray(normalized.consumables)) throw new Error("Economy config missing consumables.");
  const sellRate = Number(normalized.market.sellRate);
  const buyRate = Number(normalized.market.buyRate);
  const stockLots = Number(normalized.market.stockLots);
  const stockVersion = Number(normalized.market.stockVersion);
  if (!Number.isFinite(sellRate)) throw new Error("market.sellRate must be finite.");
  if (!Number.isFinite(buyRate)) throw new Error("market.buyRate must be finite.");
  if (!Number.isFinite(stockLots)) throw new Error("market.stockLots must be finite.");
  if (!Number.isFinite(stockVersion)) throw new Error("market.stockVersion must be finite.");
  if (!Array.isArray(normalized.market.licenseTiers)) {
    throw new Error("market.licenseTiers must be an array.");
  }
  normalized.market.sellRate = Math.max(0, Math.min(1, sellRate));
  normalized.market.buyRate = Math.max(0, buyRate);
  normalized.market.stockLots = Math.max(1, Math.round(stockLots));
  normalized.market.stockVersion = Math.max(1, Math.round(stockVersion));
  normalized.market.licenseTiers = normalized.market.licenseTiers.map(normalizeEconomyLicenseTier);
  if (!normalized.market.licenseTiers.length) throw new Error("market.licenseTiers must not be empty.");
  const cargoSize = Number(normalized.extraction.cargoSize);
  if (!Number.isFinite(cargoSize)) throw new Error("extraction.cargoSize must be finite.");
  normalized.extraction.cargoSize = Math.max(1, Math.round(cargoSize));
  const writedownRate = Number(normalized.extraction.deathBountyWritedownRate);
  if (!Number.isFinite(writedownRate)) {
    throw new Error("extraction.deathBountyWritedownRate must be finite.");
  }
  normalized.extraction.deathBountyWritedownRate = Math.max(
    0,
    Math.min(1, writedownRate)
  );
  const recovery = normalized.extraction.recoveryBonusRate || {};
  const recoveryMin = Number(recovery.min);
  const recoveryMax = Number(recovery.max);
  if (!Number.isFinite(recoveryMin) || !Number.isFinite(recoveryMax)) {
    throw new Error("extraction.recoveryBonusRate min/max must be finite.");
  }
  recovery.min = Math.max(0, Math.min(1, recoveryMin));
  recovery.max = Math.max(recovery.min, Math.min(1, recoveryMax));
  normalized.extraction.recoveryBonusRate = recovery;
  return normalized;
}

function validateRuntimeEconomyConfig(config) {
  const normalized = normalizeEconomyConfig(config);
  const market = normalized.market;
  if (!Array.isArray(market.stockRarityProgression) || !market.stockRarityProgression.length) {
    throw new Error("market.stockRarityProgression must not be empty.");
  }
  if (!Array.isArray(market.bulletinTags)) throw new Error("market.bulletinTags must be an array.");
  [
    "bulletinCadence",
    "bulletinBonusRate",
    "mispricedLotChance",
    "mispricedMinProfitRate",
    "earlyRecallAuditThreshold",
  ].forEach((key) => {
    if (!Number.isFinite(Number(market[key]))) throw new Error(`market.${key} must be finite.`);
    market[key] = Number(market[key]);
  });
  if (!Array.isArray(market.mispricedValueRange) || market.mispricedValueRange.length !== 2) {
    throw new Error("market.mispricedValueRange must be [min,max].");
  }
  market.mispricedValueRange = market.mispricedValueRange.map((value) => {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) throw new Error("market.mispricedValueRange values must be finite.");
    return numeric;
  });
  const ranges = normalized.itemValue.rarityValueRanges || {};
  ECONOMY.rarityOrder.forEach((rarity) => {
    const range = ranges[rarity];
    if (!Array.isArray(range) || range.length !== 2) {
      throw new Error(`itemValue.rarityValueRanges.${rarity} must be [min,max].`);
    }
    ranges[rarity] = range.map((value) => {
      const numeric = Number(value);
      if (!Number.isFinite(numeric)) {
        throw new Error(`itemValue.rarityValueRanges.${rarity} values must be finite.`);
      }
      return numeric;
    });
  });
  normalized.itemValue.rarityValueRanges = ranges;
  const rollQuality = normalized.itemValue.rollQualityMultiplier || {};
  if (!Number.isFinite(Number(rollQuality.base)) || !Number.isFinite(Number(rollQuality.scale))) {
    throw new Error("itemValue.rollQualityMultiplier base/scale must be finite.");
  }
  rollQuality.base = Number(rollQuality.base);
  rollQuality.scale = Number(rollQuality.scale);
  normalized.itemValue.rollQualityMultiplier = rollQuality;
  ["ordinary", "transport", "captain", "boss"].forEach((key) => {
    if (!isPlainObject(normalized.dropTables[key])) {
      throw new Error(`dropTables.${key} is required.`);
    }
  });
  const rewards = normalized.missionRewards || {};
  [
    "enemyBountyDifficultyScale",
    "fallbackEnemyBaseCredit",
    "completionBase",
    "completionIncrement",
    "fallbackBossSalvageBaseCredit",
  ].forEach((key) => {
    if (!Number.isFinite(Number(rewards[key]))) throw new Error(`missionRewards.${key} must be finite.`);
    rewards[key] = Number(rewards[key]);
  });
  normalized.missionRewards = rewards;
  const gates = normalized.legacyCreditGates || {};
  ["upgradeCostExponent", "shipPanelCostExponent"].forEach((key) => {
    if (!Number.isFinite(Number(gates[key]))) throw new Error(`legacyCreditGates.${key} must be finite.`);
    gates[key] = Number(gates[key]);
  });
  normalized.legacyCreditGates = gates;
  Object.entries(normalized.investments).forEach(([key, track]) => {
    if (!Array.isArray(track.tiers)) throw new Error(`investments.${key}.tiers must be an array.`);
  });
  return normalized;
}

function loadEconomyOverrideDiff() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ECONOMY_OVERRIDE_STORAGE_KEY) || "{}");
    return isPlainObject(parsed) ? parsed : {};
  } catch (error) {
    console.warn("Ignoring invalid economy tuning overrides.", error);
    return {};
  }
}

function saveEconomyOverrideDiff(diff) {
  economyOverrideDiff = isPlainObject(diff) ? diff : {};
  if (Object.keys(economyOverrideDiff).length) {
    localStorage.setItem(ECONOMY_OVERRIDE_STORAGE_KEY, JSON.stringify(economyOverrideDiff));
  } else {
    localStorage.removeItem(ECONOMY_OVERRIDE_STORAGE_KEY);
  }
}

function hasEconomyOverrides() {
  return !!economyOverrideDiff && Object.keys(economyOverrideDiff).length > 0;
}

function applyEconomyConfigDerivedData() {
  const config = getEconomyConfig();
  upgrades = deepClone(config.legacyCreditGates?.shipUpgrades || []);
  consumables = deepClone(config.consumables || []);
  consumablesById = Object.fromEntries(consumables.map((item) => [item.id, item]));
  investments = deepClone(config.investments || {});
  rmbWeapons = deepClone(config.legacyCreditGates?.supportUnlocks || []);
  weaponComponents = deepClone(config.legacyCreditGates?.weaponComponents || {});
}

function applyEconomyConfig(config, { persistOverrides = false } = {}) {
  const normalized = validateRuntimeEconomyConfig(config);
  if (!baseEconomyConfig) baseEconomyConfig = deepClone(normalized);
  economyConfig = normalized;
  applyEconomyConfigDerivedData();
  updateTuningBadge();
  if (persistOverrides) {
    saveEconomyOverrideDiff(deepDiff(baseEconomyConfig, economyConfig) || {});
  }
}

async function loadEconomyConfig() {
  const response = await fetch(ECONOMY_CONFIG_PATH, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Could not load ${ECONOMY_CONFIG_PATH} (${response.status}).`);
  }
  baseEconomyConfig = validateRuntimeEconomyConfig(await response.json());
  economyOverrideDiff = loadEconomyOverrideDiff();
  let merged = baseEconomyConfig;
  if (hasEconomyOverrides()) {
    try {
      merged = validateRuntimeEconomyConfig(deepMerge(baseEconomyConfig, economyOverrideDiff));
    } catch (error) {
      console.warn("Clearing invalid economy tuning overrides.", error);
      saveEconomyOverrideDiff({});
      merged = baseEconomyConfig;
    }
  }
  economyConfig = deepClone(merged);
  applyEconomyConfigDerivedData();
}

function showStartupError(error) {
  console.error(error);
  const panel = document.createElement("div");
  panel.className = "startup-error";
  panel.innerHTML = `
    <strong>Startup blocked</strong>
    <span>${escapeHtml(error?.message || error || "Unknown startup error")}</span>
  `;
  document.body.appendChild(panel);
}

const SINGLE_PRIMARY_FOCUS_RATE = ECONOMY.loadout.singlePrimaryDamageBonus;
const SECOND_PRIMARY_STRAIN_RATE = ECONOMY.loadout.secondPrimaryDamagePenalty;
const MINI_WEAPON_BALANCE_VERSION = 2;
const DEFENSE_BALANCE_VERSION = 1;
const ITEM_BUILD_REFRESH_VERSION = 1;
const MINI_EFFECTS = ["homing", "pierce", "explosive", "vampiric"];
const MINI_RARITY_TUNING = {
  scrap: {
    damageMult: 1,
    cooldownMult: 1,
    rangeMult: 1,
    speedMult: 1,
    effectChance: 0,
  },
  certified: {
    damageMult: 1.35,
    cooldownMult: 0.9,
    rangeMult: 1.04,
    speedMult: 1.03,
    effectChance: 0.28,
  },
  prototype: {
    damageMult: 1.75,
    cooldownMult: 0.8,
    rangeMult: 1.08,
    speedMult: 1.06,
    effectChance: 0.58,
  },
  preFounding: {
    damageMult: 2.25,
    cooldownMult: 0.72,
    rangeMult: 1.12,
    speedMult: 1.1,
    effectChance: 0.88,
  },
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

const LEDGER_COPY = {
  cargoFull: "CARGO FULL",
  shieldCache: "SHIELD CACHE",
  armorCache: "ARMOR PATCH",
  salvageCache: "FIELD SALVAGE",
  rtbComplete: "RTB complete. Bounty and cargo secured.",
  bossComplete: "Contract settled. Recovery crew attached boss salvage.",
  droneDestroyed: "Drone destroyed. Hull writedown applied; cargo claim voided.",
  hullWritedown: "Hull writedown",
  recoveryBonus: "Recovery bonus",
  fleetDividends: "Fleet dividends",
  noCargo: "No salvage pods recovered.",
  bossPod: "Boss recovery pod",
  ledgerHandlingFee: "Ledger handling fee",
  demandBulletin: "Demand bulletin",
  demandBonus: "Demand bulletin bonus",
  clericalAdjustment: "clerical adjustment",
  marketEmpty: "No lots listed. Complete a mission to refresh the exchange.",
  sellEmpty: "No recovered inventory available for sale.",
  earlyRecallAudit: "Pattern flagged: repeated early RTB. No action taken.",
};

function createDefaultShipBuild() {
  return {
    gunDiameter: "medium", // small | medium | large
    spread: "focused", // focused | dual | dualRapid | rapid | burst | wide
    flowRateLevel: 0,
    flowVelocityLevel: 0,
    flowSizeLevel: 0,
    cooldownMult: 1,
    ammo: "kinetic", // kinetic | plasma
    effect: "none", // none | homing | explosive | pierce | vampiric
    effectUpgrades: {
      homing: 0,
      explosive: 0,
      pierce: 0,
      vampiric: 0,
    },
    defenseSlots: ["shield", "none"], // shield | armor | none
    shieldMaxLevel: 0,
    shieldRegenLevel: 0,
    shieldCooldownLevel: 0,
    armorAmountLevel: 0,
    armorClass: BASE_ARMOR_CLASS,
    armorClassLevel: 0,
    armorDragLevel: 0,
    kineticImpulseBudget: 0,
    hullMult: 1,
    shieldMaxMult: 1,
    shieldRegenMult: 1,
    armorCapacityMult: 1,
    armorDragMult: 1,
    primaryDamageMult: 1,
  };
}

const defaultStarterWeaponLoadouts = [
  {
    id: "fundamentals",
    name: "Cadet Kinetic Frame",
    subtitle: "Precision trainer",
    description:
      "Standard kinetic trainer. Stay on target and break formation before the warden arrives.",
    notes:
      "Balanced recoil, focused shots, and a shield slot make this the cleanest frame for learning lane control.",
    starterUnlockStage: 0,
    tags: ["kinetic", "focused", "balanced"],
    build: {
      gunDiameter: "medium",
      spread: "focused",
      ammo: "kinetic",
      effect: "none",
      flowRateLevel: 0,
      flowVelocityLevel: 0,
      flowSizeLevel: 0,
      kineticImpulseBudget: 0.6,
      defenseSlots: ["shield", "none"],
      shieldMaxLevel: 0,
      shieldRegenLevel: 0,
      shieldCooldownLevel: 0,
      armorAmountLevel: 0,
      armorClass: 10,
      armorClassLevel: 0,
      armorDragLevel: 0,
    },
  },
  {
    id: "area_control",
    name: "Area Control Frame",
    subtitle: "Swarm breaker",
    description:
      "Wide plasma spread tuned for interceptor packs. Sweep lanes and keep pressure on clustered wings.",
    notes:
      "Micro-shots, plasma burn, and explosive impact tuning turn this into the anti-swarm testbed.",
    starterUnlockStage: 1,
    tags: ["plasma", "wide", "explosive"],
    build: {
      gunDiameter: "medium",
      spread: "wide",
      ammo: "plasma",
      effect: "explosive",
      flowRateLevel: 1,
      flowVelocityLevel: 0,
      flowSizeLevel: 1,
      defenseSlots: ["shield", "none"],
      shieldMaxLevel: 0,
      shieldRegenLevel: 1,
      shieldCooldownLevel: 0,
      armorAmountLevel: 0,
      armorClass: 10,
      armorClassLevel: 0,
      armorDragLevel: 0,
    },
  },
  {
    id: "armor_break",
    name: "Armor Break Frame",
    subtitle: "Heavy punch",
    description:
      "Large focused kinetic slugs with pierce. Commit to heavy targets and push through plated lines.",
    notes:
      "This frame trades blanket coverage for control, shield support, and a plated backup module.",
    starterUnlockStage: 2,
    tags: ["kinetic", "pierce", "anti-armor"],
    build: {
      gunDiameter: "large",
      spread: "focused",
      ammo: "kinetic",
      effect: "pierce",
      flowRateLevel: 0,
      flowVelocityLevel: 2,
      flowSizeLevel: 1,
      defenseSlots: ["shield", "armor"],
      shieldMaxLevel: 1,
      shieldRegenLevel: 0,
      shieldCooldownLevel: 0,
      armorAmountLevel: 1,
      armorClass: 12,
      armorClassLevel: 0,
      armorDragLevel: 1,
    },
  },
];

let starterWeaponLoadouts = [];
let starterWeaponLoadoutsById = {};

const investmentTreeBranches = {
  engineering: {
    icon: "ENG",
    subtitle: "Unlock consumables and repair infrastructure.",
    accent: "cyan",
    nodes: [
      { x: 42, y: 40 },
      { x: 31, y: 31 },
      { x: 24, y: 18 },
      { x: 39, y: 14 },
      { x: 52, y: 24 },
    ],
  },
  operations: {
    icon: "OPS",
    subtitle: "Open mission variants, objectives, and risk modifiers.",
    accent: "violet",
    nodes: [
      { x: 59, y: 45 },
      { x: 70, y: 37 },
      { x: 81, y: 45 },
      { x: 76, y: 25 },
      { x: 88, y: 15 },
    ],
  },
  shares: {
    icon: "SHR",
    subtitle: "Buy into fleet operations for passive credit returns.",
    accent: "amber",
    nodes: [
      { x: 45, y: 61 },
      { x: 34, y: 70 },
      { x: 25, y: 83 },
      { x: 51, y: 77 },
      { x: 63, y: 88 },
    ],
  },
  hulls: {
    iconPath: overhaulKit.capabilities.hullBlueprint,
    subtitle: "License new chassis types for the Armory bench.",
    accent: "amber",
    nodes: [
      { x: 28, y: 50 },
      { x: 16, y: 58 },
      { x: 12, y: 42 },
    ],
  },
  capabilities: {
    iconPath: overhaulKit.capabilities.dualFire,
    subtitle: "Permanent ship systems: aux tuning and dual-fire.",
    accent: "cyan",
    nodes: [
      { x: 56, y: 58 },
      { x: 66, y: 62 },
      { x: 60, y: 71 },
      { x: 74, y: 74 },
      { x: 68, y: 83 },
      { x: 82, y: 86 },
      { x: 92, y: 74 },
    ],
  },
  marketLicense: {
    iconPath: overhaulKit.capabilities.ledgerLicense,
    subtitle: "Increase visible rotating exchange lots.",
    accent: "red",
    nodes: [
      { x: 55, y: 34 },
      { x: 66, y: 20 },
      { x: 80, y: 29 },
    ],
  },
};

function getSharesDividendRate() {
  const tier = state.investments?.shares ?? 0;
  if (tier === 0) return 0;
  let total = 0;
  for (let i = 0; i < tier; i++) {
    total += investments.shares.tiers[i].dividend;
  }
  return total;
}

function calculateDividends(baseCredits) {
  const rate = getSharesDividendRate();
  return Math.round(baseCredits * rate);
}

function applyInvestmentTierReward(targetState, tierConfig) {
  if (!tierConfig || !targetState) return;
  if (tierConfig.hullId && hullsById[tierConfig.hullId]) {
    targetState.hulls = normalizeHullState(targetState.hulls);
    if (!targetState.hulls.ownedIds.includes(tierConfig.hullId)) {
      targetState.hulls.ownedIds.push(tierConfig.hullId);
    }
  }
  if (tierConfig.upgradeId && Number.isFinite(tierConfig.upgradeLevel)) {
    targetState.upgrades = targetState.upgrades || {};
    const current = Math.max(0, Math.floor(targetState.upgrades[tierConfig.upgradeId] || 0));
    targetState.upgrades[tierConfig.upgradeId] = Math.max(current, tierConfig.upgradeLevel);
  }
}

// Phase 6: the auxPower investment is retired (aux strength now rolls on the item). Old saves used
// an interleaved capabilities ladder [aux1, dual1, aux2, dual2, aux3, dual3, dual4] tracked as a
// single purchased count. Remap that count to the new dual-fire-only ladder so dual-fire progress
// is preserved, and refund the credits that were spent on the dropped aux tiers.
function migrateRetiredAuxPower(targetState) {
  if (!targetState || targetState.auxPowerRetired) return;
  const oldCount = Math.max(0, Math.floor(targetState.investments?.capabilities || 0));
  const dualFireByOldCount = [0, 0, 1, 1, 2, 2, 3, 4];
  const auxRefundByOldCount = [0, 420, 420, 1720, 1720, 4320, 4320, 4320];
  const idx = Math.min(oldCount, dualFireByOldCount.length - 1);
  if (targetState.investments) {
    targetState.investments.capabilities = dualFireByOldCount[idx];
  }
  const refund = auxRefundByOldCount[idx];
  if (refund > 0) {
    targetState.credits = Math.max(0, Math.round((targetState.credits || 0) + refund));
  }
  if (targetState.upgrades) delete targetState.upgrades.auxPower;
  targetState.auxPowerRetired = true;
}

function applyPurchasedInvestmentRewards(targetState = state) {
  if (!targetState.investments) targetState.investments = {};
  Object.entries(investments).forEach(([key, config]) => {
    const purchased = Math.max(
      0,
      Math.min(config.tiers.length, Math.floor(targetState.investments[key] || 0))
    );
    targetState.investments[key] = purchased;
    for (let i = 0; i < purchased; i += 1) {
      applyInvestmentTierReward(targetState, config.tiers[i]);
    }
  });
  targetState.hulls = normalizeHullState(targetState.hulls);
}

const ONBOARDING_STAGE_TRAINING_COMPLETE = 3;
const ONBOARDING_STAGE_COMPLETE = 4;
const DEFAULT_SYSTEM_UNLOCKS = {
  loadout: true,
  economy: true,
  compendium: true,
};

const onboardingTrainingMissionSpecs = [
  {
    missionId: "level1",
    title: "Flight School: Fundamentals",
    loadoutId: "fundamentals",
    rewardLoadoutId: "area_control",
  },
  {
    missionId: "level1_swarm",
    title: "Flight School: Area Control",
    loadoutId: "area_control",
    rewardLoadoutId: "armor_break",
  },
  {
    missionId: "level1_armored",
    title: "Flight School: Armor Break",
    loadoutId: "armor_break",
    rewardMessage: "Starter armory online.",
  },
];

function cloneShipBuild(build) {
  return JSON.parse(JSON.stringify(build));
}

function buildWeaponFrameIndex(items) {
  starterWeaponLoadouts = items.map((item) => ({
    ...item,
    build: cloneShipBuild(item.build),
  }));
  starterWeaponLoadoutsById = Object.fromEntries(
    starterWeaponLoadouts.map((item) => [item.id, item])
  );
}

function sanitizeWeaponFrameBuild(build, context = "weapon frame") {
  if (!build || typeof build !== "object" || Array.isArray(build)) {
    throw new Error(`${context} is missing a build definition`);
  }
  const base = createDefaultShipBuild();
  const normalized = {
    ...cloneShipBuild(base),
    ...cloneShipBuild(build),
    effectUpgrades: {
      ...cloneShipBuild(base.effectUpgrades),
      ...cloneShipBuild(build.effectUpgrades || {}),
    },
  };

  if (!["small", "medium", "large"].includes(normalized.gunDiameter)) {
    throw new Error(`${context} has invalid gunDiameter`);
  }
  if (!VALID_WEAPON_SPREADS.includes(normalized.spread)) {
    throw new Error(`${context} has invalid spread`);
  }
  if (!["kinetic", "plasma"].includes(normalized.ammo)) {
    throw new Error(`${context} has invalid ammo`);
  }
  if (!["none", "homing", "explosive", "pierce", "vampiric"].includes(normalized.effect)) {
    throw new Error(`${context} has invalid effect`);
  }
  normalized.kineticImpulseBudget = Number.isFinite(normalized.kineticImpulseBudget)
    ? normalized.kineticImpulseBudget
    : 0;
  normalized.cooldownMult = Number.isFinite(normalized.cooldownMult)
    ? Math.max(0.35, normalized.cooldownMult)
    : 1;
  if (!Array.isArray(normalized.defenseSlots)) {
    throw new Error(`${context} has invalid defenseSlots`);
  }
  normalized.defenseSlots = normalized.defenseSlots.slice(0, 2);
  while (normalized.defenseSlots.length < 2) normalized.defenseSlots.push("none");
  normalized.defenseSlots.forEach((slot) => {
    if (!["none", "shield", "armor"].includes(slot)) {
      throw new Error(`${context} has invalid defense slot`);
    }
  });
  return normalized;
}

function applyWeaponFrameCatalog(catalog) {
  const entries = catalog?.entries;
  if (!entries || typeof entries !== "object" || Array.isArray(entries)) {
    throw new Error("weapon frame catalog is missing entries");
  }

  const items = Object.entries(entries)
    .map(([id, entry], index) => {
      if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
        throw new Error(`weapon frame ${id} is invalid`);
      }
      if (typeof entry.name !== "string" || !entry.name.trim()) {
        throw new Error(`weapon frame ${id} is missing a name`);
      }
      if (typeof entry.description !== "string" || !entry.description.trim()) {
        throw new Error(`weapon frame ${id} is missing a description`);
      }
      if (!Array.isArray(entry.tags)) {
        throw new Error(`weapon frame ${id} is missing tags`);
      }
      return {
        id,
        name: entry.name.trim(),
        subtitle: typeof entry.subtitle === "string" ? entry.subtitle.trim() : "",
        description: entry.description.trim(),
        notes: typeof entry.notes === "string" ? entry.notes.trim() : "",
        starterUnlockStage: Number.isFinite(entry.starterUnlockStage)
          ? Math.max(0, Math.floor(entry.starterUnlockStage))
          : null,
        tags: entry.tags
          .map((tag) => String(tag).trim())
          .filter((tag) => !!tag),
        build: sanitizeWeaponFrameBuild(entry.build, `weapon frame ${id}`),
        sortOrder: Number.isFinite(entry.sortOrder) ? entry.sortOrder : index,
      };
    })
    .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));

  buildWeaponFrameIndex(items);
  return starterWeaponLoadouts;
}

buildWeaponFrameIndex(defaultStarterWeaponLoadouts);

function getOnboardingTrainingMissions() {
  return onboardingTrainingMissionSpecs.map((spec) => {
    const frame = starterWeaponLoadoutsById[spec.loadoutId];
    const rewardFrame = spec.rewardLoadoutId
      ? starterWeaponLoadoutsById[spec.rewardLoadoutId]
      : null;
    return {
      missionId: spec.missionId,
      title: spec.title,
      loadoutId: spec.loadoutId,
      briefing: frame?.description || "",
      reward:
        spec.rewardMessage ||
        `${rewardFrame?.name || capitalize(spec.rewardLoadoutId || "frame")} added to armory.`,
    };
  });
}

function getStarterLoadoutIdsForStage(stage, skipOnboarding = false) {
  const starterFrames = starterWeaponLoadouts.filter((item) =>
    Number.isFinite(item.starterUnlockStage)
  );
  return starterFrames.map((item) => item.id);
}

function getStarterDefenseModuleIdsForStage(stage, skipOnboarding = false) {
  return defenseModules.map((item) => item.id);
}

function getSupportModuleEntries() {
  ensureAuxSelection();
  const unlockedAux = state.unlocked?.aux || {};
  return rmbWeapons.map((weapon) => ({
    id: weapon.id,
    slotType: "support",
    name: weapon.name,
    subtitle: weapon.unlockAt ? `Rank ${weapon.unlockAt}` : "Support",
    description: weapon.desc,
    notes: weapon.cost ? `Unlock cost: ${weapon.cost} credits.` : "Available to every pilot.",
    icon: mobileAltIcons[weapon.id] || getDefaultItemIcon("certified"),
    tags: ["support"],
    unlockAt: weapon.unlockAt ?? 0,
    cost: weapon.cost ?? 0,
    owned: !!(state.debugUnlock || unlockedAux[weapon.id]),
  }));
}

function getOwnedDefenseModuleIds(targetState = state) {
  return targetState.armory?.ownedDefenseModuleIds || [];
}

function deriveDefenseSlotsFromBuild(build) {
  const slots = Array.isArray(build?.defenseSlots) ? build.defenseSlots : ["shield", "none"];
  return slots.slice(0, 2).map((slot) => {
    if (slot === "shield") return "shield_module";
    if (slot === "armor") return "armor_module";
    return "none";
  });
}

function getPrimaryBayId(targetState = state, bayIndex = 0) {
  if (bayIndex === 1) return targetState.armory?.equippedSecondPrimaryItemId || null;
  return targetState.armory?.equippedPrimaryItemId || null;
}

function getActivePrimaryBay(targetState = state) {
  const desired = targetState.activePrimaryBay === 1 ? 1 : 0;
  if (desired === 1 && getPrimaryArmoryItem(targetState, 1)) return 1;
  return 0;
}

function normalizePrimaryFireMode(value) {
  return value === "dual" ? "dual" : "swap";
}

function getPrimaryFireMode(targetState = state) {
  return normalizePrimaryFireMode(targetState.primaryFireMode);
}

function setPrimaryFireMode(mode) {
  const nextMode = normalizePrimaryFireMode(mode);
  if (nextMode === "dual" && !canUseDualFireCurrentLoadout()) return;
  state.primaryFireMode = nextMode;
  state.shipBuild = composeShipBuildFromArmory(state);
  syncShipBuildToLegacy();
  saveState();
  safeUpdateHangar();
  updateHud();
  updateMobileControls();
}

function getPrimaryArmoryItem(targetState = state, bayIndex = null) {
  const bay = bayIndex === null ? getActivePrimaryBay(targetState) : bayIndex;
  const equippedItem = findInventoryItem(getPrimaryBayId(targetState, bay), targetState);
  if (equippedItem?.slotType === "primary") return equippedItem;
  const equippedId =
    bay === 1
      ? targetState.armory?.equippedSecondLoadoutId
      : targetState.armory?.equippedLoadoutId;
  if (bay === 1 && !equippedId) return null;
  return starterWeaponLoadoutsById[equippedId] || starterWeaponLoadouts[0];
}

function getSecondPrimaryArmoryItem(targetState = state) {
  const equippedItem = findInventoryItem(targetState.armory?.equippedSecondPrimaryItemId, targetState);
  if (equippedItem?.slotType === "primary") return equippedItem;
  const equippedId = targetState.armory?.equippedSecondLoadoutId;
  return equippedId && starterWeaponLoadoutsById[equippedId]
    ? starterWeaponLoadoutsById[equippedId]
    : null;
}

function getDefenseArmoryItemById(moduleId, targetState = state) {
  if (!moduleId || moduleId === "none") return null;
  return defenseModulesById[moduleId] || findInventoryItem(moduleId, targetState);
}

function getPrimaryLoadoutModifiers(targetState = state) {
  const hasSecondPrimary = !!getSecondPrimaryArmoryItem(targetState);
  const hullBonuses = getHullBonuses(targetState);
  const mitigation = Math.max(0, hullBonuses.secondBayStrainReduction || 0);
  if (hasSecondPrimary) {
    const strain = Math.max(0, SECOND_PRIMARY_STRAIN_RATE - mitigation);
    return {
      label: "Second-bay strain",
      primaryDamageMult: 1 - strain,
      primaryDamageDelta: -strain,
      rate: strain,
      description: `${Math.round(strain * 100)}% less primary damage per weapon while Primary B is installed.`,
    };
  }
  const focus = SINGLE_PRIMARY_FOCUS_RATE;
  return {
    label: "Single-primary focus",
    primaryDamageMult: 1 + focus,
    primaryDamageDelta: focus,
    rate: focus,
    description: `${Math.round(focus * 100)}% more primary damage while Primary B is empty.`,
  };
}

function applyHullAndLoadoutModifiers(build, targetState = state) {
  const hullBonuses = getHullBonuses(targetState);
  const loadout = getPrimaryLoadoutModifiers(targetState);
  build.hullMult = hullBonuses.hullMult ?? 1;
  build.shieldMaxMult = hullBonuses.shieldMaxMult ?? 1;
  build.shieldRegenMult = hullBonuses.shieldRegenMult ?? 1;
  build.armorCapacityMult = hullBonuses.armorCapacityMult ?? 1;
  build.armorDragMult = hullBonuses.armorDragMult ?? 1;
  build.primaryDamageMult = (hullBonuses.primaryDamageMult ?? 1) * loadout.primaryDamageMult;
  build.loadoutPrimaryDamageMult = loadout.primaryDamageMult;
  build.loadoutPrimaryDamageDelta = loadout.primaryDamageDelta;
  build.loadoutModifierLabel = loadout.label;
  return build;
}

function composeShipBuildFromArmory(targetState, options = {}) {
  const base = createDefaultShipBuild();
  const frame = options.primaryItem || getPrimaryArmoryItem(targetState);
  const frameBuild = frame?.build || {};
  const merged = {
    ...cloneShipBuild(base),
    ...cloneShipBuild(frameBuild),
    effectUpgrades: {
      ...cloneShipBuild(base.effectUpgrades),
      ...cloneShipBuild(frameBuild.effectUpgrades || {}),
    },
    defenseSlots: ["none", "none"],
    shieldMaxLevel: 0,
    shieldRegenLevel: 0,
    shieldCooldownLevel: 0,
    armorAmountLevel: 0,
    armorClass: 10,
    armorClassLevel: 0,
    armorDragLevel: 0,
  };

  const equippedDefenseSlots = Array.isArray(targetState.armory?.equippedDefenseSlotIds)
    ? targetState.armory.equippedDefenseSlotIds.slice(0, 2)
    : ["shield_module", "none"];
  while (equippedDefenseSlots.length < 2) equippedDefenseSlots.push("none");

  equippedDefenseSlots.forEach((moduleId, index) => {
    const module = getDefenseArmoryItemById(moduleId, targetState);
    if (!module) return;
    if (module.defenseType === "shield") {
      merged.defenseSlots[index] = "shield";
      merged.shieldMaxLevel += module.build.shieldMaxLevel ?? 0;
      merged.shieldRegenLevel += module.build.shieldRegenLevel ?? 0;
      merged.shieldCooldownLevel += module.build.shieldCooldownLevel ?? 0;
    }
    if (module.defenseType === "armor") {
      merged.defenseSlots[index] = "armor";
      merged.armorAmountLevel += module.build.armorAmountLevel ?? 0;
      const moduleArmorClass = module.build.armorClass ?? BASE_ARMOR_CLASS;
      const moduleArmorClassLevel = module.build.armorClassLevel ?? 0;
      const currentArmorClassTotal =
        (merged.armorClass ?? BASE_ARMOR_CLASS) + (merged.armorClassLevel ?? 0) * 2;
      const moduleArmorClassTotal = moduleArmorClass + moduleArmorClassLevel * 2;
      if (moduleArmorClassTotal > currentArmorClassTotal) {
        merged.armorClass = moduleArmorClass;
        merged.armorClassLevel = moduleArmorClassLevel;
      }
      merged.armorDragLevel += module.build.armorDragLevel ?? 0;
    }
  });

  const supportItem = findInventoryItem(targetState.armory?.equippedSupportItemId, targetState);
  if (supportItem && isSupportSlotType(supportItem.slotType) && supportItem.build) {
    [
      "flowRateLevel",
      "flowVelocityLevel",
      "flowSizeLevel",
      "shieldMaxLevel",
      "shieldRegenLevel",
      "shieldCooldownLevel",
      "armorAmountLevel",
      "armorClassLevel",
      "armorDragLevel",
      "kineticImpulseBudget",
    ].forEach((key) => {
      if (Number.isFinite(supportItem.build[key])) {
        if (
          [
            "kineticImpulseBudget",
            "shieldMaxLevel",
            "shieldRegenLevel",
            "shieldCooldownLevel",
            "armorAmountLevel",
            "armorDragLevel",
          ].includes(key)
        ) {
          merged[key] = (Number.isFinite(merged[key]) ? merged[key] : 0) + supportItem.build[key];
          return;
        }
        merged[key] = Math.max(merged[key] ?? 0, supportItem.build[key]);
      }
    });
  }

  return applyHullAndLoadoutModifiers(merged, targetState);
}

function findClosestStarterLoadoutId(build) {
  if (!build) return starterWeaponLoadouts[0].id;
  let bestId = starterWeaponLoadouts[0].id;
  let bestScore = -1;
  starterWeaponLoadouts.forEach((item) => {
    const candidate = item.build;
    let score = 0;
    if (candidate.gunDiameter === build.gunDiameter) score += 3;
    if (candidate.spread === build.spread) score += 3;
    if (candidate.ammo === build.ammo) score += 3;
    if (candidate.effect === build.effect) score += 3;
    if ((candidate.flowRateLevel ?? 0) === (build.flowRateLevel ?? 0)) score += 2;
    if ((candidate.flowVelocityLevel ?? 0) === (build.flowVelocityLevel ?? 0)) score += 2;
    if ((candidate.flowSizeLevel ?? 0) === (build.flowSizeLevel ?? 0)) score += 2;
    if (
      JSON.stringify(candidate.defenseSlots || []) === JSON.stringify(build.defenseSlots || [])
    ) {
      score += 2;
    }
    if ((candidate.shieldMaxLevel ?? 0) === (build.shieldMaxLevel ?? 0)) score += 1;
    if ((candidate.shieldRegenLevel ?? 0) === (build.shieldRegenLevel ?? 0)) score += 1;
    if ((candidate.shieldCooldownLevel ?? 0) === (build.shieldCooldownLevel ?? 0)) score += 1;
    if ((candidate.armorAmountLevel ?? 0) === (build.armorAmountLevel ?? 0)) score += 1;
    if ((candidate.armorClass ?? 10) === (build.armorClass ?? 10)) score += 1;
    if ((candidate.armorClassLevel ?? 0) === (build.armorClassLevel ?? 0)) score += 1;
    if ((candidate.armorDragLevel ?? 0) === (build.armorDragLevel ?? 0)) score += 1;
    if (score > bestScore) {
      bestScore = score;
      bestId = item.id;
    }
  });
  return bestId;
}

function normalizeStarterArmoryState(targetState) {
  const skipOnboarding = !!targetState.debugSkipOnboarding;
  const existingArmory = targetState.armory || {};
  const existingInventory = Array.isArray(existingArmory.inventory)
    ? existingArmory.inventory
        .filter((item) => item && typeof item === "object" && typeof item.id === "string")
        .map((item) => ({
          ...cloneItem(item),
          slotType: normalizeArmorySlotType(item.slotType),
          build: cloneShipBuild(item.build || {}),
          tags: Array.isArray(item.tags) ? item.tags : [],
          affixes: Array.isArray(item.affixes) ? item.affixes : [],
        }))
        .map(normalizeSavedArmoryItem)
    : [];
  const grantedIds = getStarterLoadoutIdsForStage(
    targetState.onboardingStage,
    skipOnboarding
  );
  const grantedDefenseIds = getStarterDefenseModuleIdsForStage(
    targetState.onboardingStage,
    skipOnboarding
  );
  const existingOwned = Array.isArray(targetState.armory?.ownedLoadoutIds)
    ? targetState.armory.ownedLoadoutIds
    : [];
  const existingDefenseOwned = Array.isArray(targetState.armory?.ownedDefenseModuleIds)
    ? targetState.armory.ownedDefenseModuleIds
    : [];
  const ownedLoadoutIds = Array.from(new Set([...existingOwned, ...grantedIds])).filter(
    (id) => !!starterWeaponLoadoutsById[id]
  );
  const ownedDefenseModuleIds = Array.from(
    new Set([...existingDefenseOwned, ...grantedDefenseIds])
  ).filter((id) => !!defenseModulesById[id]);
  const existingPrimaryItemId =
    typeof existingArmory.equippedPrimaryItemId === "string"
      ? existingArmory.equippedPrimaryItemId
      : null;
  const equippedPrimaryItemId = existingInventory.some(
    (item) => item.id === existingPrimaryItemId && item.slotType === "primary"
  )
    ? existingPrimaryItemId
    : null;
  const existingSecondPrimaryItemId =
    typeof existingArmory.equippedSecondPrimaryItemId === "string"
      ? existingArmory.equippedSecondPrimaryItemId
      : null;
  const equippedSecondPrimaryItemId = existingInventory.some(
    (item) => item.id === existingSecondPrimaryItemId && item.slotType === "primary"
  )
    ? existingSecondPrimaryItemId
    : null;
  const desiredEquippedId =
    existingArmory.equippedLoadoutId && ownedLoadoutIds.includes(existingArmory.equippedLoadoutId)
      ? existingArmory.equippedLoadoutId
      : ownedLoadoutIds.includes(findClosestStarterLoadoutId(targetState.shipBuild))
        ? findClosestStarterLoadoutId(targetState.shipBuild)
        : ownedLoadoutIds[0] || starterWeaponLoadouts[0].id;
  const desiredSecondEquippedId =
    existingArmory.equippedSecondLoadoutId &&
    ownedLoadoutIds.includes(existingArmory.equippedSecondLoadoutId)
      ? existingArmory.equippedSecondLoadoutId
      : null;
  const inventoryDefenseIds = new Set(
    existingInventory.filter((item) => item.slotType === "defense").map((item) => item.id)
  );
  const existingDefenseSlots = Array.isArray(existingArmory.equippedDefenseSlotIds)
    ? existingArmory.equippedDefenseSlotIds
    : deriveDefenseSlotsFromBuild(targetState.shipBuild);
  const equippedDefenseSlotIds = existingDefenseSlots.slice(0, 2).map((moduleId) => {
    if (moduleId === "none") return "none";
    return ownedDefenseModuleIds.includes(moduleId) || inventoryDefenseIds.has(moduleId)
      ? moduleId
      : "none";
  });
  while (equippedDefenseSlotIds.length < 2) equippedDefenseSlotIds.push("none");
  if (!ownedDefenseModuleIds.length) {
    if (!inventoryDefenseIds.size) {
      equippedDefenseSlotIds[0] = "none";
      equippedDefenseSlotIds[1] = "none";
    }
  } else if (equippedDefenseSlotIds.every((id) => id === "none")) {
    equippedDefenseSlotIds[0] = ownedDefenseModuleIds[0];
  }
  const existingSupportItemId =
    typeof existingArmory.equippedSupportItemId === "string"
      ? existingArmory.equippedSupportItemId
      : null;
  const equippedSupportItemId = existingInventory.some(
    (item) => item.id === existingSupportItemId && isSupportSlotType(item.slotType)
  )
    ? existingSupportItemId
    : null;
  const existingMiniItemId =
    typeof existingArmory.equippedMiniItemId === "string"
      ? existingArmory.equippedMiniItemId
      : null;
  const ownedMiniWeaponIds = Array.from(
    new Set([
      ...(Array.isArray(existingArmory.ownedMiniWeaponIds) ? existingArmory.ownedMiniWeaponIds : []),
      ...starterMiniWeapons.map((item) => item.id),
    ])
  ).filter((id) => !!starterMiniWeaponsById[id]);
  const equippedMiniItemId = existingInventory.some(
    (item) => item.id === existingMiniItemId && normalizeArmorySlotType(item.slotType) === "mini"
  )
    ? existingMiniItemId
    : ownedMiniWeaponIds.includes(existingMiniItemId)
      ? existingMiniItemId
      : ownedMiniWeaponIds[0] || null;

  targetState.armory = {
    ownedLoadoutIds,
    ownedDefenseModuleIds,
    ownedMiniWeaponIds,
    equippedLoadoutId: desiredEquippedId,
    equippedPrimaryItemId,
    equippedSecondLoadoutId: equippedSecondPrimaryItemId ? null : desiredSecondEquippedId,
    equippedSecondPrimaryItemId,
    equippedDefenseSlotIds,
    equippedSupportItemId,
    equippedMiniItemId,
    inventory: existingInventory,
  };
  targetState.activePrimaryBay = targetState.activePrimaryBay === 1 && getSecondPrimaryArmoryItem(targetState) ? 1 : 0;
  targetState.hulls = normalizeHullState(targetState.hulls);
  targetState.shipBuild = composeShipBuildFromArmory(targetState);
}

function getOwnedStarterLoadoutIds() {
  return state.armory?.ownedLoadoutIds || [];
}

function getEquippedStarterLoadout() {
  return getPrimaryArmoryItem(state);
}

function equipStarterLoadout(loadoutId, bayIndex = 0) {
  const item = starterWeaponLoadoutsById[loadoutId];
  if (!item) return;
  if (!getOwnedStarterLoadoutIds().includes(loadoutId)) return;
  state.armory = state.armory || {
    ownedLoadoutIds: [],
    ownedDefenseModuleIds: [],
    equippedLoadoutId: loadoutId,
    equippedDefenseSlotIds: ["shield_module", "none"],
  };
  if (bayIndex === 1) {
    if (!state.armory.equippedPrimaryItemId && state.armory.equippedLoadoutId === loadoutId) return;
    state.armory.equippedSecondLoadoutId = loadoutId;
    state.armory.equippedSecondPrimaryItemId = null;
  } else {
    state.armory.equippedLoadoutId = loadoutId;
    state.armory.equippedPrimaryItemId = null;
    if (state.armory.equippedSecondLoadoutId === loadoutId) {
      state.armory.equippedSecondLoadoutId = null;
      state.activePrimaryBay = 0;
    }
  }
  state.shipBuild = composeShipBuildFromArmory(state);
  syncShipBuildToLegacy();
  saveState();
}

function equipPrimaryInventoryItem(itemId, bayIndex = 0) {
  const item = findInventoryItem(itemId);
  if (!item || item.slotType !== "primary") return;
  state.armory = state.armory || {
    ownedLoadoutIds: [],
    ownedDefenseModuleIds: [],
    equippedLoadoutId: starterWeaponLoadouts[0]?.id || "fundamentals",
    equippedDefenseSlotIds: ["shield_module", "none"],
    inventory: [],
  };
  if (bayIndex === 1) {
    if (state.armory.equippedPrimaryItemId === item.id) return;
    state.armory.equippedSecondPrimaryItemId = item.id;
    state.armory.equippedSecondLoadoutId = null;
  } else {
    if (state.armory.equippedSecondPrimaryItemId === item.id) {
      state.armory.equippedSecondPrimaryItemId = null;
      state.armory.equippedSecondLoadoutId = null;
      state.activePrimaryBay = 0;
    }
    state.armory.equippedPrimaryItemId = item.id;
  }
  state.shipBuild = composeShipBuildFromArmory(state);
  syncShipBuildToLegacy();
  saveState();
}

function clearSecondPrimaryBay() {
  if (!state.armory) return;
  state.armory.equippedSecondLoadoutId = null;
  state.armory.equippedSecondPrimaryItemId = null;
  state.activePrimaryBay = 0;
  state.shipBuild = composeShipBuildFromArmory(state);
  syncShipBuildToLegacy();
  saveState();
}

function equipMiniWeapon(itemId) {
  if (!state.armory) return;
  const inventoryItem = findInventoryItem(itemId);
  if (inventoryItem && normalizeArmorySlotType(inventoryItem.slotType) === "mini") {
    state.armory.equippedMiniItemId = inventoryItem.id;
  } else if (starterMiniWeaponsById[itemId]) {
    state.armory.equippedMiniItemId = itemId;
  } else {
    return;
  }
  saveState();
}

function equipHull(hullId) {
  const hull = hullsById[hullId];
  if (!hull) return;
  state.hulls = normalizeHullState(state.hulls);
  if (!state.hulls.ownedIds.includes(hullId)) {
    if (!state.debugUnlock) return;
    state.hulls.ownedIds.push(hullId);
  }
  state.hulls.equippedId = hullId;
  state.shipBuild = composeShipBuildFromArmory(state);
  syncShipBuildToLegacy();
  saveState();
}

function equipDefenseModule(slotIndex, moduleId) {
  if (![0, 1].includes(slotIndex)) return;
  const normalizedId = moduleId || "none";
  const inventoryItem = findInventoryItem(normalizedId);
  const isInventoryDefense = inventoryItem?.slotType === "defense";
  if (normalizedId !== "none" && !defenseModulesById[normalizedId] && !isInventoryDefense) return;
  if (
    normalizedId !== "none" &&
    !isInventoryDefense &&
    !getOwnedDefenseModuleIds().includes(normalizedId)
  ) {
    return;
  }
  state.armory = state.armory || {
    ownedLoadoutIds: [],
    ownedDefenseModuleIds: [],
    equippedLoadoutId: starterWeaponLoadouts[0]?.id || "fundamentals",
    equippedDefenseSlotIds: ["none", "none"],
    inventory: [],
  };
  const slots = Array.isArray(state.armory.equippedDefenseSlotIds)
    ? state.armory.equippedDefenseSlotIds.slice(0, 2)
    : ["none", "none"];
  while (slots.length < 2) slots.push("none");
  if (normalizedId !== "none") {
    const existingIndex = slots.findIndex((id) => id === normalizedId);
    if (existingIndex !== -1) slots[existingIndex] = "none";
  }
  slots[slotIndex] = normalizedId;
  state.armory.equippedDefenseSlotIds = slots;
  state.shipBuild = composeShipBuildFromArmory(state);
  syncShipBuildToLegacy();
  saveState();
}

function buildSystemUnlocksForStage(stage, skipOnboarding = false) {
  return { ...DEFAULT_SYSTEM_UNLOCKS };
}

function normalizeOnboardingState(parsed) {
  const explicitSkip = !!parsed.debugSkipOnboarding;
  parsed.onboardingStage = ONBOARDING_STAGE_COMPLETE;
  parsed.debugSkipOnboarding = explicitSkip;
  const unlocks = buildSystemUnlocksForStage(parsed.onboardingStage, explicitSkip);
  parsed.systemUnlocks = {
    loadout: !!(parsed.systemUnlocks?.loadout || unlocks.loadout),
    economy: !!(parsed.systemUnlocks?.economy || unlocks.economy),
    compendium: !!(parsed.systemUnlocks?.compendium || unlocks.compendium),
  };
}

function isOnboardingSkipped() {
  return !!state.debugSkipOnboarding;
}

function isOnboardingTrainingActive() {
  return false;
}

function getCurrentOnboardingMission() {
  if (!isOnboardingTrainingActive()) return null;
  return getOnboardingTrainingMissions()[state.onboardingStage] || null;
}

function getOnboardingMissionForStage(stage) {
  if (!Number.isFinite(stage)) return null;
  return getOnboardingTrainingMissions()[Math.max(0, Math.floor(stage))] || null;
}

function isSystemUnlocked(systemId) {
  return true;
}

function syncStarterArmoryState() {
  normalizeStarterArmoryState(state);
  syncShipBuildToLegacy();
}

function refreshSystemUnlocks() {
  const derived = buildSystemUnlocksForStage(state.onboardingStage, isOnboardingSkipped());
  state.systemUnlocks = {
    loadout: !!(state.systemUnlocks?.loadout || derived.loadout),
    economy: !!(state.systemUnlocks?.economy || derived.economy),
    compendium: !!(state.systemUnlocks?.compendium || derived.compendium),
  };
}

const keyState = new Set();
let paused = false;
const pointer = {
  x: 0,
  y: 0,
  active: false,
};
const pointerButtons = {
  left: false,
  right: false,
};
let inputMode = "mouse";
const touchState = {
  active: false,
  x: 0,
  y: 0,
  maxSpeed: 420,
};
let audioEnabled = false;
let desiredMusicSrc = null;
let activeMusicSrc = null;
let activeMusic = null;
const musicLibrary = new Map();
const HANGAR_MUSIC = "assets/music/02_stillness_of_space.ogg";
const MUSIC_BASE_VOLUME = 0.22; // per-track baseline; the player slider is a 0-1 multiplier on top
let openUpgradeId = null;
let enemyIdCounter = 1;
let armorySelectedSlotId = "primary";
let itemTooltipEl = null;
let itemTooltipTimer = null;

const mobileAltIcons = {
  emp: `${GENERATED_ITEM_ICON_ROOT}/emp_burst_module.png`,
  bulwark: `${GENERATED_ITEM_ICON_ROOT}/bulwark_field_module.png`,
  cloak: `${GENERATED_ITEM_ICON_ROOT}/cloaking_device.png`,
};

const armoryFrameVisuals = {
  fundamentals: {
    icon: `${GENERATED_ITEM_ICON_ROOT}/cadet_kinetic_cannon.png`,
    shipOverlay: `${GENERATED_ITEM_ICON_ROOT}/cadet_kinetic_cannon.png`,
    accent: "#7dd3fc",
    hardpointName: "Cadet Driver",
  },
  area_control: {
    icon: `${GENERATED_ITEM_ICON_ROOT}/plasma_scatter_array.png`,
    shipOverlay: `${GENERATED_ITEM_ICON_ROOT}/plasma_scatter_array.png`,
    accent: "#f59e0b",
    hardpointName: "Plasma Scatter Array",
  },
  armor_break: {
    icon: `${GENERATED_ITEM_ICON_ROOT}/breaker_rail.png`,
    shipOverlay: `${GENERATED_ITEM_ICON_ROOT}/breaker_rail.png`,
    accent: "#facc15",
    hardpointName: "Breaker Rail",
  },
};

const defenseVisuals = {
  shield: {
    icon: `${GENERATED_ITEM_ICON_ROOT}/phase_shield_projector.png`,
    name: "Shield Module",
    note: "Absorbs pressure and recovers between hits.",
  },
  armor: {
    icon: `${GENERATED_ITEM_ICON_ROOT}/plated_armor_module.png`,
    name: "Armor Module",
    note: "Trades speed for heavier kinetic protection.",
  },
  none: {
    icon: `${GENERATED_ITEM_ICON_ROOT}/module_variant_empty_tray.png`,
    name: "Open Slot",
    note: "No module linked to this mount yet.",
  },
};

const defenseModules = [
  {
    id: "shield_module",
    slotType: "defense",
    defenseType: "shield",
    name: "Phase Shield",
    subtitle: "Capacity barrier",
    description: "Stable shield projector with a deeper buffer and standard recovery timing.",
    notes: "Capacity shielding for pilots who want more margin for mistakes before regeneration starts.",
    icon: `${GENERATED_ITEM_ICON_ROOT}/phase_shield_projector.png`,
    tags: ["shield", "starter", "capacity"],
    build: {
      shieldMaxLevel: 1,
      shieldRegenLevel: 0,
      shieldCooldownLevel: 0,
    },
  },
  {
    id: "armor_module",
    slotType: "defense",
    defenseType: "armor",
    name: "Heavy Plate",
    subtitle: "Plating",
    description: "Dense armor slab for soaking kinetic hits and surviving heavier volleys.",
    notes: "Armor trades weapon tempo for resilience. Best when you expect heavy direct fire.",
    icon: `${GENERATED_ITEM_ICON_ROOT}/plated_armor_module.png`,
    tags: ["armor", "starter"],
    build: {
      armorAmountLevel: 1,
      armorClass: 12,
      armorClassLevel: 0,
      armorDragLevel: 1,
    },
  },
];

const defenseModulesById = Object.fromEntries(defenseModules.map((item) => [item.id, item]));

const starterMiniWeapons = [
  {
    id: "mini_tick_autogun",
    slotType: "mini",
    name: "Tick Autogun",
    subtitle: "Forward kinetic mini",
    description: "A compact nose-linked autogun that chips nearby targets in the forward arc.",
    notes: "Starter mini weapon. It assists pressure without replacing the primary hardpoint.",
    icon: overhaulKit.minis.tickAutogun,
    tags: ["mini", "kinetic", "rapid", "forward", "starter"],
    owned: true,
    miniWeapon: {
      ammo: "kinetic",
      cadence: "rapid",
      shotSize: "small",
      arc: "forward",
      arcDegrees: 70,
      range: 430,
      cooldown: 0.58,
      damage: 5.5,
      speed: 540,
      radius: 2.8,
      effect: "none",
      role: "Forward chip gun",
    },
  },
];

const starterMiniWeaponsById = Object.fromEntries(starterMiniWeapons.map((item) => [item.id, item]));

const hullCatalog = [
  {
    id: "starter",
    slotType: "hull",
    name: "Starter Hull",
    subtitle: "Balanced default",
    description: "Balanced starter chassis with no strain mitigation or specialty penalties.",
    notes: "Reliable baseline for learning weapons, salvage, and Ledger flow.",
    icon: overhaulKit.hulls.starter,
    sprite: overhaulKit.hulls.starter,
    cost: 0,
    tags: ["hull", "starter", "balanced"],
    bonuses: {
      hullMult: 1,
      shieldMaxMult: 1,
      shieldRegenMult: 1,
      armorCapacityMult: 1,
      armorDragMult: 1,
      miniDamageMult: 1,
      miniCooldownMult: 1,
      auxPowerBonus: 0,
      secondBayStrainReduction: 0,
      dualFireTierBonus: 0,
    },
  },
  {
    id: "bastion",
    slotType: "hull",
    name: "Bastion Hull",
    subtitle: "Defense chassis",
    description: "Defense-focused hull with stronger shield and armor capacity and cleaner armor coupling.",
    notes: "Bastion favors one-primary or swap builds that expect sustained fire.",
    icon: overhaulKit.hulls.bastion,
    sprite: overhaulKit.hulls.bastion,
    cost: 900,
    tags: ["hull", "defense", "shield", "armor"],
    bonuses: {
      hullMult: 1.12,
      shieldMaxMult: 1.18,
      shieldRegenMult: 1.08,
      armorCapacityMult: 1.22,
      armorDragMult: 0.78,
      miniDamageMult: 0.95,
      miniCooldownMult: 1.04,
      auxPowerBonus: 0,
      secondBayStrainReduction: 0.05,
      dualFireTierBonus: 0,
    },
  },
  {
    id: "relay",
    slotType: "hull",
    name: "Relay Hull",
    subtitle: "Tech chassis",
    description: "Aux-focused hull with cleaner support output and tighter mini weapon control.",
    notes: "Relay is built for EMP control, mini coverage, and support-heavy builds.",
    icon: overhaulKit.hulls.relay,
    sprite: overhaulKit.hulls.relay,
    cost: 1400,
    tags: ["hull", "aux", "mini", "control"],
    bonuses: {
      hullMult: 0.98,
      shieldMaxMult: 1.02,
      shieldRegenMult: 1.12,
      armorCapacityMult: 0.95,
      armorDragMult: 0.92,
      miniDamageMult: 1.12,
      miniCooldownMult: 0.9,
      auxPowerBonus: 1,
      secondBayStrainReduction: 0.05,
      dualFireTierBonus: 0,
    },
  },
  {
    id: "broadside",
    slotType: "hull",
    name: "Broadside Hull",
    subtitle: "Gunship chassis",
    description: "Weapon-focused hull with the best second-bay and dual-fire scaling.",
    notes: "Broadside accepts heavier weapon coupling but gives up some defensive quiet.",
    icon: overhaulKit.hulls.broadside,
    sprite: overhaulKit.hulls.broadside,
    cost: 2200,
    tags: ["hull", "gunship", "second-bay", "dual-fire"],
    bonuses: {
      hullMult: 1.04,
      shieldMaxMult: 0.96,
      shieldRegenMult: 0.96,
      armorCapacityMult: 1.02,
      armorDragMult: 1,
      miniDamageMult: 1.04,
      miniCooldownMult: 0.98,
      auxPowerBonus: 0,
      secondBayStrainReduction: 0.1,
      dualFireTierBonus: 1,
    },
  },
];

const hullsById = Object.fromEntries(hullCatalog.map((item) => [item.id, item]));

function normalizeHullState(hulls = {}) {
  const owned = Array.isArray(hulls?.ownedIds) ? hulls.ownedIds : [];
  const ownedIds = Array.from(new Set(["starter", ...owned])).filter((id) => !!hullsById[id]);
  const equippedId = ownedIds.includes(hulls?.equippedId) ? hulls.equippedId : "starter";
  return { ownedIds, equippedId };
}

function getOwnedHullIds(targetState = state) {
  const owned = Array.isArray(targetState.hulls?.ownedIds) ? targetState.hulls.ownedIds : ["starter"];
  return Array.from(new Set(["starter", ...owned])).filter((id) => !!hullsById[id]);
}

function getEquippedHull(targetState = state) {
  const owned = getOwnedHullIds(targetState);
  const equippedId = owned.includes(targetState.hulls?.equippedId) ? targetState.hulls.equippedId : "starter";
  return hullsById[equippedId] || hullsById.starter;
}

function getHullBonuses(targetState = state) {
  return getEquippedHull(targetState)?.bonuses || hullsById.starter.bonuses;
}

function getEquippedHullSpriteRecord(targetState = state) {
  const hull = getEquippedHull(targetState);
  return assets?.hulls?.[hull.id] || loadImageCached(hull.sprite || hull.icon);
}

const ITEM_POOL_PATH = "items/item_pool.json";
let itemPoolCatalog = null;
let itemPoolCatalogPromise = null;

function normalizeArmorySlotType(slotType) {
  if (slotType === "support") return "aux";
  if (slotType === "weapon") return "primary";
  return slotType || "primary";
}

function isSupportSlotType(slotType) {
  const normalized = normalizeArmorySlotType(slotType);
  return normalized === "aux";
}

function getRarityConfig(rarity) {
  return ECONOMY.rarities[rarity] || ECONOMY.rarities.scrap;
}

function getRarityLabel(rarity) {
  return getRarityConfig(rarity).label;
}

function getRarityStyle(rarity) {
  const config = getRarityConfig(rarity);
  return `--rarity-color: ${config.color}; --rarity-glow: ${config.glow};`;
}

const defaultItemIconByRarity = {
  scrap: `${GENERATED_ITEM_ICON_ROOT}/scrap_grade_housing.png`,
  certified: `${GENERATED_ITEM_ICON_ROOT}/weapon_frame_chassis.png`,
  prototype: `${GENERATED_ITEM_ICON_ROOT}/prototype_housing.png`,
  preFounding: `${GENERATED_ITEM_ICON_ROOT}/relic_housing.png`,
};

function getDefaultItemIcon(rarity = "certified") {
  return defaultItemIconByRarity[rarity] || defaultItemIconByRarity.certified;
}

function randomIntInclusive(min, max) {
  return Math.round(min + Math.random() * (max - min));
}

function rollWeighted(weights) {
  const entries = Object.entries(weights || {}).filter(([, weight]) => weight > 0);
  if (!entries.length) return "scrap";
  const total = entries.reduce((sum, [, weight]) => sum + weight, 0);
  let roll = Math.random() * total;
  for (const [id, weight] of entries) {
    roll -= weight;
    if (roll <= 0) return id;
  }
  return entries[entries.length - 1][0];
}

function normalizeItemPoolCatalog(catalog) {
  const entries = catalog?.entries && typeof catalog.entries === "object" ? catalog.entries : {};
  const affixes = catalog?.affixes && typeof catalog.affixes === "object" ? catalog.affixes : {};
  const relics = catalog?.relics && typeof catalog.relics === "object" ? catalog.relics : {};
  return {
    version: catalog?.version || 1,
    entries,
    affixes,
    relics,
  };
}

function buildRuntimeItemPoolFromExistingGear() {
  const entries = {};
  starterWeaponLoadouts.forEach((item) => {
    entries[`runtime_frame_${item.id}`] = {
      slotType: "primary",
      sourceId: item.id,
      name: item.name,
      subtitle: item.subtitle || "Weapon frame",
      description: item.description,
      notes: item.notes || "",
      icon: getArmoryFrameVisual(item).icon,
      tags: item.tags || [],
      build: cloneShipBuild(item.build),
    };
  });
  defenseModules.forEach((item) => {
    entries[`runtime_defense_${item.id}`] = {
      slotType: "defense",
      defenseType: item.defenseType,
      sourceId: item.id,
      name: item.name,
      subtitle: item.subtitle || "Defense",
      description: item.description,
      notes: item.notes || "",
      icon: item.icon,
      tags: item.tags || [],
      build: cloneShipBuild(item.build || {}),
    };
  });
  rmbWeapons.forEach((item) => {
    entries[`runtime_aux_${item.id}`] = {
      slotType: "aux",
      ability: item.id,
      sourceId: item.id,
      name: item.name,
      subtitle: "Pilot system",
      description: item.desc,
      notes: "Recovered auxiliary system. Equips to the support link.",
      icon: mobileAltIcons[item.id] || getDefaultItemIcon("certified"),
      tags: ["aux", item.id],
      build: {},
    };
  });
  starterMiniWeapons.forEach((item) => {
    entries[`runtime_mini_${item.id}`] = {
      slotType: "mini",
      sourceId: item.id,
      name: item.name,
      subtitle: item.subtitle || "Mini weapon",
      description: item.description,
      notes: item.notes || "",
      icon: item.icon,
      tags: item.tags || [],
      build: {},
      miniWeapon: cloneShipBuild(item.miniWeapon || {}),
    };
  });
  return { version: 1, entries, affixes: {}, relics: {} };
}

async function loadItemPoolCatalog() {
  try {
    const response = await fetch(ITEM_POOL_PATH, { cache: "no-store" });
    if (!response.ok) throw new Error("item pool load failed");
    const data = await response.json();
    return normalizeItemPoolCatalog(data);
  } catch (error) {
    console.warn("Item pool catalog load failed; using runtime gear fallback.", error);
    return buildRuntimeItemPoolFromExistingGear();
  }
}

async function ensureItemPoolLoaded() {
  if (itemPoolCatalog) return itemPoolCatalog;
  if (!itemPoolCatalogPromise) itemPoolCatalogPromise = loadItemPoolCatalog();
  itemPoolCatalog = await itemPoolCatalogPromise;
  return itemPoolCatalog;
}

function cloneItem(item) {
  return JSON.parse(JSON.stringify(item));
}

function applyBuildPatch(build, patch = {}) {
  Object.entries(patch).forEach(([key, value]) => {
    if (key === "effectUpgrades") {
      build.effectUpgrades = {
        ...(build.effectUpgrades || {}),
        ...cloneShipBuild(value || {}),
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
        ...cloneShipBuild(value),
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
  const normalizedType = defenseType === "armor" || defenseType === "shield" ? defenseType : null;
  if (!normalizedType) return null;
  const scale = getDefenseRarityScale(rarity);
  const tuned = cloneShipBuild(build);
  if (normalizedType === "armor") {
    const armorClass = Number.isFinite(tuned.armorClass)
      ? tuned.armorClass
      : BASE_ARMOR_CLASS;
    const armorClassBonus = Math.max(0, armorClass - BASE_ARMOR_CLASS);
    tuned.armorClass = roundTunedStat(BASE_ARMOR_CLASS + armorClassBonus * scale, 1);
    if (Number.isFinite(tuned.armorClassLevel)) {
      tuned.armorClassLevel = roundTunedStat(tuned.armorClassLevel * scale, 2);
    }
  } else {
    if (Number.isFinite(tuned.shieldMaxLevel) && tuned.shieldMaxLevel > 0) {
      tuned.shieldMaxLevel = roundTunedStat(tuned.shieldMaxLevel * scale, 2);
    }
    if (Number.isFinite(tuned.shieldRegenLevel) && tuned.shieldRegenLevel > 0) {
      tuned.shieldRegenLevel = roundTunedStat(tuned.shieldRegenLevel * scale, 2);
    }
    if (Number.isFinite(tuned.shieldCooldownLevel) && tuned.shieldCooldownLevel < 0) {
      tuned.shieldCooldownLevel = roundTunedStat(tuned.shieldCooldownLevel * scale, 2);
    }
  }
  return tuned;
}

function hashUnitFromString(text) {
  const input = String(text || "");
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 0x100000000;
}

function normalizeMiniEffect(effect) {
  return MINI_EFFECTS.includes(effect) ? effect : "none";
}

function getMiniEffectLabel(effect) {
  return {
    homing: "Homing mini trace",
    pierce: "Pierce mini trace",
    explosive: "Explosive mini trace",
    vampiric: "Vampiric mini trace",
  }[effect] || "Mini trace";
}

function chooseMiniEffectForRarity(rarity, seed = "", { random = false } = {}) {
  const tuning = getMiniRarityTuning(rarity);
  const chance = Math.max(0, Math.min(1, tuning.effectChance || 0));
  const roll = random ? Math.random() : hashUnitFromString(`${seed}:chance`);
  if (roll >= chance) return "none";
  const pick = random ? Math.random() : hashUnitFromString(`${seed}:effect`);
  return MINI_EFFECTS[Math.floor(pick * MINI_EFFECTS.length) % MINI_EFFECTS.length] || "none";
}

function tuneMiniWeaponConfig(baseMini, rarity = "scrap", { seed = "", randomEffect = false } = {}) {
  if (!baseMini || typeof baseMini !== "object" || Array.isArray(baseMini)) return null;
  const tuning = getMiniRarityTuning(rarity);
  const tuned = cloneShipBuild(baseMini);
  tuned.damage = roundTunedStat((Number(tuned.damage) || 0) * tuning.damageMult, 1);
  tuned.cooldown = Math.max(0.16, roundTunedStat((Number(tuned.cooldown) || 0.8) * tuning.cooldownMult, 2));
  if (Number.isFinite(tuned.range)) tuned.range = Math.round(tuned.range * tuning.rangeMult);
  if (Number.isFinite(tuned.speed)) tuned.speed = Math.round(tuned.speed * tuning.speedMult);
  const existingEffect = normalizeMiniEffect(tuned.effect);
  tuned.effect = existingEffect !== "none"
    ? existingEffect
    : chooseMiniEffectForRarity(rarity, seed, { random: randomEffect });
  if (tuned.effect !== "none" && existingEffect === "none") {
    tuned.role = `${capitalize(tuned.effect)} ${tuned.role || "mini weapon"}`;
  }
  tuned.balanceVersion = MINI_WEAPON_BALANCE_VERSION;
  tuned.rarityTuning = rarity;
  return tuned;
}

function addMiniEffectMetadata(item, effect) {
  const normalizedEffect = normalizeMiniEffect(effect);
  if (!item || normalizedEffect === "none") return;
  const effectTag = normalizedEffect;
  item.tags = Array.from(new Set([...(Array.isArray(item.tags) ? item.tags : []), effectTag]));
  item.affixes = Array.isArray(item.affixes) ? item.affixes.slice() : [];
  const affixId = `mini_${normalizedEffect}_trace`;
  if (!item.affixes.some((affix) => affix?.id === affixId)) {
    item.affixes.push({
      id: affixId,
      name: getMiniEffectLabel(normalizedEffect),
      tags: [effectTag, "mini"],
    });
  }
}

function normalizeSavedMiniItem(item) {
  if (!item || normalizeArmorySlotType(item.slotType) !== "mini" || !item.miniWeapon) return item;
  const rarity = item.rarity || "scrap";
  if (
    item.miniWeapon.balanceVersion === MINI_WEAPON_BALANCE_VERSION &&
    item.miniWeapon.rarityTuning === rarity
  ) {
    return item;
  }
  const tuned = tuneMiniWeaponConfig(item.miniWeapon, rarity, {
    seed: `${item.id || ""}:${item.sourceId || ""}:${item.baseId || ""}:${rarity}`,
    randomEffect: false,
  });
  if (!tuned) return item;
  item.miniWeapon = tuned;
  item.miniBalanceVersion = MINI_WEAPON_BALANCE_VERSION;
  addMiniEffectMetadata(item, tuned.effect);
  return item;
}

function normalizeSavedDefenseItem(item) {
  if (!item || normalizeArmorySlotType(item.slotType) !== "defense" || !item.build) return item;
  if (!item.rarity) return item;
  const rarity = item.rarity || "scrap";
  if (
    item.defenseBalanceVersion === DEFENSE_BALANCE_VERSION &&
    item.defenseRarityTuning === rarity
  ) {
    return item;
  }
  const tuned = tuneDefenseBuildForRarity(item.build, item.defenseType, rarity);
  if (!tuned) return item;
  item.build = tuned;
  item.defenseBalanceVersion = DEFENSE_BALANCE_VERSION;
  item.defenseRarityTuning = rarity;
  return item;
}

function applyBuildMinimum(build, minimum = {}) {
  if (!build || typeof build !== "object" || Array.isArray(build)) return false;
  let changed = false;
  const applyScalarMinimum = (key, expected) => {
    if (!Number.isFinite(expected)) return;
    const current = Number.isFinite(build[key]) ? build[key] : null;
    if (current === null) {
      build[key] = expected;
      changed = true;
      return;
    }
    if (expected > 0 && current < expected - 0.0005) {
      build[key] = expected;
      changed = true;
    } else if (expected < 0 && current > expected + 0.0005) {
      build[key] = expected;
      changed = true;
    }
  };

  Object.entries(minimum).forEach(([key, expected]) => {
    if (key === "effectUpgrades") return;
    if (Number.isFinite(expected)) {
      applyScalarMinimum(key, expected);
      return;
    }
    if (Array.isArray(expected) && !Array.isArray(build[key])) {
      build[key] = expected.slice();
      changed = true;
      return;
    }
    if (
      typeof expected === "string" &&
      expected &&
      expected !== "none" &&
      (!build[key] || build[key] === "none")
    ) {
      build[key] = expected;
      changed = true;
    }
  });

  if (minimum.effectUpgrades && typeof minimum.effectUpgrades === "object") {
    build.effectUpgrades = build.effectUpgrades || {};
    Object.entries(minimum.effectUpgrades).forEach(([effect, expected]) => {
      if (!Number.isFinite(expected) || expected <= 0) return;
      const current = Number.isFinite(build.effectUpgrades[effect])
        ? build.effectUpgrades[effect]
        : 0;
      if (current < expected) {
        build.effectUpgrades[effect] = expected;
        changed = true;
      }
    });
  }

  return changed;
}

function createCatalogMinimumBuildForSavedItem(item, baseEntry) {
  if (!item || !baseEntry) return null;
  const build = cloneShipBuild(baseEntry.build || {});
  build.effectUpgrades = {
    ...cloneShipBuild(createDefaultShipBuild().effectUpgrades),
    ...cloneShipBuild(build.effectUpgrades || {}),
  };
  build.kineticImpulseBudget = Number.isFinite(build.kineticImpulseBudget)
    ? build.kineticImpulseBudget
    : 0;

  (item.affixes || []).forEach((savedAffix) => {
    const catalogAffix = getCatalogAffix(savedAffix?.id);
    if (!catalogAffix) return;
    const buildPatch = { ...(catalogAffix.build || {}) };
    delete buildPatch.effectUpgrades;
    applyBuildPatch(build, buildPatch);
    const effect = catalogAffix.build?.effect;
    if (
      effect &&
      effect !== "none" &&
      Number.isFinite(savedAffix.effectTier)
    ) {
      applyBuildPatch(build, { effectUpgrades: { [effect]: savedAffix.effectTier } });
    } else if (catalogAffix.build?.effectUpgrades) {
      applyBuildPatch(build, { effectUpgrades: catalogAffix.build.effectUpgrades });
    }
    if (savedAffix.rolledBuildAdd) {
      applyBuildAdd(build, savedAffix.rolledBuildAdd);
    }
  });

  const rarityConfig = getRarityConfig(item.rarity || "scrap");
  if (Number.isFinite(rarityConfig.kineticImpulseBonus) && rarityConfig.kineticImpulseBonus > 0) {
    build.kineticImpulseBudget =
      (Number.isFinite(build.kineticImpulseBudget) ? build.kineticImpulseBudget : 0) +
      rarityConfig.kineticImpulseBonus;
  }

  const uniqueProperty = normalizeUniqueProperty(baseEntry);
  if (uniqueProperty) {
    applyBuildPatch(build, uniqueProperty.build || {});
    applyBuildAdd(build, uniqueProperty.buildAdd || {});
  }

  return build;
}

function refreshSavedCatalogItemBuild(item) {
  const slotType = normalizeArmorySlotType(item?.slotType);
  if (!item || !itemPoolCatalog || !["primary", "aux"].includes(slotType)) return false;
  const baseEntry = getBaseEntryForItem(item);
  if (!baseEntry?.build) return false;
  const minimumBuild = createCatalogMinimumBuildForSavedItem(item, baseEntry);
  if (!minimumBuild) return false;
  item.build = cloneShipBuild(item.build || {});
  item.build.effectUpgrades = {
    ...cloneShipBuild(createDefaultShipBuild().effectUpgrades),
    ...cloneShipBuild(item.build.effectUpgrades || {}),
  };
  const changed = applyBuildMinimum(item.build, minimumBuild);
  if (changed) item.itemBuildRefreshVersion = ITEM_BUILD_REFRESH_VERSION;
  return changed;
}

function normalizeSavedArmoryItem(item) {
  normalizeSavedMiniItem(item);
  normalizeSavedDefenseItem(item);
  refreshSavedCatalogItemBuild(item);
  return item;
}

function getCatalogAffix(affixId) {
  const catalog = itemPoolCatalog || { affixes: {} };
  const affix = catalog.affixes?.[affixId];
  return affix && typeof affix === "object" ? { id: affixId, ...affix } : null;
}

function getApplicableAffixes(slotType, baseBuild = {}, baseEntry = {}) {
  const catalog = itemPoolCatalog || { affixes: {} };
  const normalizedSlot = normalizeArmorySlotType(slotType);
  const baseEffect = baseBuild.effect && baseBuild.effect !== "none" ? "weapon-effect" : null;
  return Object.entries(catalog.affixes || {})
    .map(([id, affix]) => ({ id, ...affix }))
    .filter((affix) => {
      const allowedSlots = Array.isArray(affix.slotTypes) ? affix.slotTypes : [];
      if (!allowedSlots.map(normalizeArmorySlotType).includes(normalizedSlot)) return false;
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

function pickAffixesForItem(
  slotType,
  baseBuild,
  count,
  { excludeIds = new Set(), usedGroups = new Set(), baseEntry = {} } = {}
) {
  const selected = [];
  const candidates = getApplicableAffixes(slotType, baseBuild, baseEntry).filter(
    (affix) => !excludeIds.has(affix.id)
  );
  while (selected.length < count && candidates.length) {
    const index = Math.floor(Math.random() * candidates.length);
    const affix = candidates.splice(index, 1)[0];
    if (affix.exclusiveGroup && usedGroups.has(affix.exclusiveGroup)) continue;
    selected.push(affix);
    if (affix.exclusiveGroup) usedGroups.add(affix.exclusiveGroup);
  }
  return selected;
}

function generateItemInstanceId() {
  return `loot_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeUniqueProperty(entry) {
  const property = entry?.uniqueProperty;
  if (!property || typeof property !== "object" || Array.isArray(property)) return null;
  return {
    id: property.id || "unique_property",
    name: property.name || "Unique trace",
    description: property.description || "",
    tags: Array.isArray(property.tags) ? property.tags : [],
    build: property.build || {},
    buildAdd: property.buildAdd || {},
  };
}

// Phase 6 loot depth: per-instance magnitude rolls.
// rarityTier mirrors ECONOMY.rarityOrder (scrap 0, certified 1, prototype 2, preFounding 3).
function getRarityTier(rarity) {
  const index = ECONOMY.rarityOrder.indexOf(rarity);
  return index >= 0 ? index : 0;
}

// Effect-affix potency tier range by rarity (pierce count / homing / explosive / vampiric scale
// off effectUpgrades in combat). certified always tier 1; prototype 1-2; pre-Founding 2-3.
function getEffectTierRange(rarity) {
  if (rarity === "prototype") return [1, 2];
  if (rarity === "preFounding") return [2, 3];
  return [1, 1];
}

// Aux ability signature-knob coefficients. Coefficients live here, not scattered in combat math,
// so tuning is a single edit. value = base * (1 + scale*B); cooldown uses (1 - scale*B), floored.
const AUX_POTENCY_CONFIG = {
  cloak: {
    duration: { base: 2.5, scale: 0.7 },
    cooldown: { base: 10, scale: 0.5, floor: 4, reduce: true },
  },
  bulwark: {
    shieldBonus: { base: 200, scale: 1.2 },
    duration: { base: 1.2, scale: 0.6 },
  },
  emp: {
    duration: { base: 1.6, scale: 0.6 },
    clearRadius: { base: 190, scale: 0.5 },
    cooldown: { base: 8, scale: 0.4, floor: 3.5, reduce: true },
  },
};

// Bonus envelope B = (rarityTier + roll) / 3, optionally lifted by a small hull identity perk.
function computeAuxBonusFraction(rarity, roll, targetState = null) {
  const tier = getRarityTier(rarity);
  let bonus = (tier + Math.max(0, Math.min(1, roll))) / 3;
  if (targetState) {
    const hullAux = Math.max(0, Math.floor(getHullBonuses(targetState).auxPowerBonus || 0));
    bonus += hullAux * 0.08; // hull aux perk is a small identity lift, not a power track
  }
  return bonus;
}

function computeAuxKnob(knob, bonus) {
  if (!knob) return 0;
  if (knob.reduce) {
    const value = knob.base * (1 - knob.scale * bonus);
    return Math.max(knob.floor ?? 0, value);
  }
  return knob.base * (1 + knob.scale * bonus);
}

// Pure knob snapshot for an ability at a given bonus fraction.
function buildAuxPotency(ability, bonus) {
  const config = AUX_POTENCY_CONFIG[ability];
  if (!config) return null;
  const knobs = {};
  Object.entries(config).forEach(([key, knob]) => {
    knobs[key] = computeAuxKnob(knob, bonus);
  });
  return knobs;
}

// Resolve the live aux knob values for an ability, applying the equipped item's stored roll plus
// any hull identity perk. Falls back to a floor (scrap, roll 0) when no rolled item is present.
function getAuxPotencyForState(ability, targetState = state) {
  if (!AUX_POTENCY_CONFIG[ability]) return null;
  const supportItem = findInventoryItem(targetState.armory?.equippedSupportItemId, targetState);
  const rarity = supportItem?.rarity || "scrap";
  const roll = Number.isFinite(supportItem?.auxRoll) ? supportItem.auxRoll : 0;
  const bonus = computeAuxBonusFraction(rarity, roll, targetState);
  return buildAuxPotency(ability, bonus);
}

// Roll a single affix instance: magnitude factor for buildAdd affixes, tier for effect affixes.
// Returns the scaled buildAdd/effectUpgrades plus a normalized [0,1] roll position for quality.
function rollAffixInstance(affix, rarity) {
  const result = {
    buildAdd: null,
    effectUpgrades: null,
    magnitude: null,
    effectTier: null,
    position: null,
  };
  if (affix.buildAdd && typeof affix.buildAdd === "object") {
    if (Array.isArray(affix.roll) && affix.roll.length === 2 && rarity !== "scrap") {
      const [min, max] = affix.roll;
      const factor = min + Math.random() * (max - min);
      result.magnitude = factor;
      result.buildAdd = {};
      Object.entries(affix.buildAdd).forEach(([key, value]) => {
        result.buildAdd[key] = Number.isFinite(value) ? value * factor : value;
      });
      if (max > min) result.position = (factor - min) / (max - min);
    } else {
      result.buildAdd = { ...affix.buildAdd };
    }
  }
  const effect = affix.build?.effect;
  if (
    effect &&
    effect !== "none" &&
    affix.build?.effectUpgrades &&
    Number.isFinite(affix.build.effectUpgrades[effect])
  ) {
    const [tierMin, tierMax] = getEffectTierRange(rarity);
    const tier = randomIntInclusive(tierMin, tierMax);
    result.effectTier = tier;
    result.effectUpgrades = { [effect]: tier };
    if (tierMax > tierMin) result.position = (tier - tierMin) / (tierMax - tierMin);
  }
  return result;
}

function createRolledItem(baseId, baseEntry, rarity) {
  const instanceId = generateItemInstanceId();
  const rarityConfig = getRarityConfig(rarity);
  const affixCount = rarityConfig.affixCount ?? 0;
  const slotType = normalizeArmorySlotType(baseEntry.slotType);
  let build = cloneShipBuild(baseEntry.build || {});
  build.effectUpgrades = {
    ...cloneShipBuild(createDefaultShipBuild().effectUpgrades),
    ...cloneShipBuild(build.effectUpgrades || {}),
  };
  build.kineticImpulseBudget = Number.isFinite(build.kineticImpulseBudget)
    ? build.kineticImpulseBudget
    : 0;

  const fixedAffixes = Array.isArray(baseEntry.affixes)
    ? baseEntry.affixes.map(getCatalogAffix).filter(Boolean)
    : [];
  const fixedAffixIds = new Set(fixedAffixes.map((affix) => affix.id));
  const usedGroups = new Set(
    fixedAffixes.map((affix) => affix.exclusiveGroup).filter(Boolean)
  );
  const rolledAffixes = pickAffixesForItem(baseEntry.slotType, build, affixCount, {
    excludeIds: fixedAffixIds,
    usedGroups,
    baseEntry,
  });
  const affixes = [...fixedAffixes, ...rolledAffixes];
  const rollPositions = [];
  const rolledByAffix = new Map();
  affixes.forEach((affix) => {
    const rolled = rollAffixInstance(affix, rarity);
    const buildPatch = { ...(affix.build || {}) };
    delete buildPatch.effectUpgrades;
    applyBuildPatch(build, buildPatch);
    if (rolled.effectUpgrades) {
      applyBuildPatch(build, { effectUpgrades: rolled.effectUpgrades });
    } else if (affix.build?.effectUpgrades) {
      applyBuildPatch(build, { effectUpgrades: affix.build.effectUpgrades });
    }
    if (rolled.buildAdd) applyBuildAdd(build, rolled.buildAdd);
    if (Number.isFinite(rolled.position)) rollPositions.push(rolled.position);
    rolledByAffix.set(affix.id, rolled);
  });
  if (Number.isFinite(rarityConfig.kineticImpulseBonus) && rarityConfig.kineticImpulseBonus > 0) {
    build.kineticImpulseBudget =
      (Number.isFinite(build.kineticImpulseBudget) ? build.kineticImpulseBudget : 0) +
      rarityConfig.kineticImpulseBonus;
  }

  const uniqueProperty = normalizeUniqueProperty(baseEntry);
  if (uniqueProperty) {
    applyBuildPatch(build, uniqueProperty.build || {});
    applyBuildAdd(build, uniqueProperty.buildAdd || {});
  }

  // Aux abilities roll a per-instance potency that also feeds rollQuality.
  let auxRoll = null;
  let auxPotency = null;
  const auxAbility = slotType === "aux" ? baseEntry.ability || null : null;
  if (auxAbility && AUX_POTENCY_CONFIG[auxAbility]) {
    auxRoll = rarity === "scrap" ? 0 : Math.random();
    auxPotency = buildAuxPotency(auxAbility, computeAuxBonusFraction(rarity, auxRoll));
    rollPositions.push(auxRoll);
  }

  const rollQuality = rollPositions.length
    ? roundTunedStat(rollPositions.reduce((sum, pos) => sum + pos, 0) / rollPositions.length, 3)
    : null;

  const tunedDefenseBuild =
    slotType === "defense" ? tuneDefenseBuildForRarity(build, baseEntry.defenseType, rarity) : null;
  if (tunedDefenseBuild) {
    build = tunedDefenseBuild;
  }

  const affixNames = [
    ...affixes.map((affix) => affix.name).filter(Boolean),
    uniqueProperty?.name,
  ].filter(Boolean);
  const rarityLabel = rarityConfig.label;
  const name = `${rarityLabel} ${baseEntry.name}${affixNames.length ? ` — ${affixNames.join(", ")}` : ""}`;
  const valueRange = getRarityValueRange(rarity);
  const baseValue = randomIntInclusive(valueRange[0], valueRange[1]);
  // God rolls cost more to buy and fetch more on sale, feeding the pure-hunt money sink.
  const value = Number.isFinite(rollQuality)
    ? Math.round(baseValue * getRollQualityValueMultiplier(rollQuality))
    : baseValue;
  const tags = Array.from(
    new Set([
      ...(Array.isArray(baseEntry.tags) ? baseEntry.tags : []),
      ...affixes.flatMap((affix) => (Array.isArray(affix.tags) ? affix.tags : [])),
      ...(uniqueProperty?.tags || []),
      rarity,
    ])
  );
  if (baseEntry.relicLore && !tags.includes("relic")) tags.push("relic");

  const miniWeapon = baseEntry.miniWeapon
    ? tuneMiniWeaponConfig(baseEntry.miniWeapon, rarity, {
        seed: `${instanceId}:${baseId}:${rarity}`,
        randomEffect: true,
      })
    : null;

  const item = {
    id: instanceId,
    baseId,
    sourceId: baseEntry.sourceId || baseId,
    slotType,
    defenseType: baseEntry.defenseType || null,
    ability: baseEntry.ability || null,
    name,
    baseName: baseEntry.name,
    subtitle: baseEntry.subtitle || "",
    description: baseEntry.description || "",
    notes: baseEntry.notes || "",
    icon: baseEntry.icon || getDefaultItemIcon(rarity),
    tags,
    build,
    miniWeapon,
    miniBalanceVersion: miniWeapon ? MINI_WEAPON_BALANCE_VERSION : null,
    ...(tunedDefenseBuild
      ? {
          defenseBalanceVersion: DEFENSE_BALANCE_VERSION,
          defenseRarityTuning: rarity,
        }
      : {}),
    rarity,
    value,
    relicId: baseEntry.relicLore ? baseId : null,
    relicLore: baseEntry.relicLore || "",
    relicLoreStatus: baseEntry.relicLore ? "undiscovered" : "",
    uniqueProperty: uniqueProperty
      ? {
          id: uniqueProperty.id,
          name: uniqueProperty.name,
          description: uniqueProperty.description,
          tags: uniqueProperty.tags,
        }
      : null,
    rollQuality,
    ...(auxAbility ? { auxRoll, auxPotency } : {}),
    affixes: affixes.map((affix) => {
      const rolled = rolledByAffix.get(affix.id) || {};
      return {
        id: affix.id,
        name: affix.name,
        tags: Array.isArray(affix.tags) ? affix.tags : [],
        ...(rolled.buildAdd ? { rolledBuildAdd: rolled.buildAdd } : {}),
        ...(Number.isFinite(rolled.magnitude) ? { magnitude: roundTunedStat(rolled.magnitude, 3) } : {}),
        ...(Number.isFinite(rolled.effectTier) ? { effectTier: rolled.effectTier } : {}),
      };
    }),
  };
  if (miniWeapon) {
    addMiniEffectMetadata(item, miniWeapon.effect);
  }
  return item;
}

function getCampaignProgressLevelForItemPools({ includeActiveMission = false } = {}) {
  let progressLevel = Math.max(1, Math.floor(state.unlockedLevels || 1));
  if (includeActiveMission && mission?.level?.id) {
    const baseId = missionBaseIdFor(mission.level.id);
    const missionIndex = availableLevels.findIndex((level) => level.id === baseId);
    if (missionIndex >= 0) {
      progressLevel = Math.max(progressLevel, missionIndex + 1);
    }
  }
  return progressLevel;
}

function getMaxUnlockedItemBaseTier({ sourceKey = null, includeActiveMission = false } = {}) {
  const progressLevel = getCampaignProgressLevelForItemPools({ includeActiveMission });
  const gates = getDropTableConfig().itemBaseTierGates || { 1: 1 };
  let maxTier = 1;
  Object.entries(gates).forEach(([tier, minCampaignLevel]) => {
    if (progressLevel >= minCampaignLevel) {
      maxTier = Math.max(maxTier, Number(tier));
    }
  });
  if (sourceKey === "boss") {
    maxTier = Math.max(maxTier, 4);
  }
  return maxTier;
}

function getItemBaseTier(entry, fallbackTier = 1) {
  const tier = Number(entry?.tier);
  return Number.isFinite(tier) ? Math.max(1, Math.floor(tier)) : fallbackTier;
}

function itemEntryMatchesRollOptions(baseId, entry, options = {}) {
  const slotType = normalizeArmorySlotType(entry.slotType);
  if (!["primary", "mini", "defense", "aux"].includes(slotType)) return false;
  if (options.slotType && slotType !== normalizeArmorySlotType(options.slotType)) return false;
  if (options.excludeBaseIds?.has?.(baseId)) return false;
  const tags = Array.isArray(entry.tags) ? entry.tags : [];
  if (
    Array.isArray(options.requiredTags) &&
    options.requiredTags.length &&
    !options.requiredTags.every((tag) => tags.includes(tag))
  ) {
    return false;
  }
  if (
    Array.isArray(options.anyTags) &&
    options.anyTags.length &&
    !options.anyTags.some((tag) => tags.includes(tag))
  ) {
    return false;
  }
  return true;
}

function getRollSourceForRarity(rarity) {
  const catalog = itemPoolCatalog || { entries: {}, relics: {} };
  const relicEntries = Object.entries(catalog.relics || {});
  const usingRelics = rarity === "preFounding" && relicEntries.length;
  return {
    rollSource: usingRelics ? catalog.relics : catalog.entries,
    usingRelics,
  };
}

function getEligibleRollEntries(rarity, options = {}) {
  const { rollSource, usingRelics } = getRollSourceForRarity(rarity);
  const maxTier = getMaxUnlockedItemBaseTier(options);
  return Object.entries(rollSource || {}).filter(([baseId, entry]) => {
    if (!itemEntryMatchesRollOptions(baseId, entry, options)) return false;
    return getItemBaseTier(entry, usingRelics ? 4 : 1) <= maxTier;
  });
}

function rollItemForRarity(rarity, options = {}) {
  let entries = getEligibleRollEntries(rarity, options);
  if (!entries.length && options.excludeBaseIds) {
    entries = getEligibleRollEntries(rarity, { ...options, excludeBaseIds: null });
  }
  if (!entries.length && Array.isArray(options.anyTags)) {
    entries = getEligibleRollEntries(rarity, { ...options, anyTags: null });
  }
  if (!entries.length) return null;
  const [baseId, baseEntry] = entries[Math.floor(Math.random() * entries.length)];
  return createRolledItem(baseId, baseEntry, rarity);
}

function shiftRarityWeightsUp(weights) {
  const shifted = {};
  Object.entries(weights || {}).forEach(([rarity, weight]) => {
    const index = ECONOMY.rarityOrder.indexOf(rarity);
    const next = ECONOMY.rarityOrder[Math.min(ECONOMY.rarityOrder.length - 1, index + 1)] || rarity;
    shifted[next] = (shifted[next] || 0) + weight;
  });
  return shifted;
}

function missionHasEliteModifier() {
  const level = mission?.level;
  if (!level) return false;
  if (level.elite || level.modifier === "elite" || level.variant === "elite") return true;
  if (Array.isArray(level.modifiers) && level.modifiers.includes("elite")) return true;
  return /elite/i.test(`${level.id || ""} ${level.name || ""}`);
}

function getDropSourceKey(enemy) {
  if (enemy.isBoss) return "boss";
  const transportIds = new Set(["transport", "bulwark"]);
  if (transportIds.has(enemy.type) || enemy.ai === "transport") return "transport";
  const captainConfig = getDropTableConfig().captain || {};
  if ((enemy.baseCredit || 0) >= captainConfig.minBaseCredit) return "captain";
  return "ordinary";
}

function rollSalvageDrop(enemy, { force = false, forceSource = null, minRarity = null } = {}) {
  if (!itemPoolCatalog) return null;
  const sourceKey = forceSource || getDropSourceKey(enemy);
  const dropTables = getDropTableConfig();
  const sourceConfig = dropTables[sourceKey] || dropTables.ordinary;
  const elite = missionHasEliteModifier();
  const chance = Math.min(
    1,
    (sourceConfig.chance ?? 0) + (elite && sourceKey !== "boss" ? dropTables.eliteBonusChance : 0)
  );
  if (!force && Math.random() > chance) return null;
  const weights = elite && sourceKey !== "boss"
    ? shiftRarityWeightsUp(sourceConfig.rarityWeights)
    : sourceConfig.rarityWeights;
  let rarity = rollWeighted(weights);
  if (minRarity) {
    const minIndex = ECONOMY.rarityOrder.indexOf(minRarity);
    const rarityIndex = ECONOMY.rarityOrder.indexOf(rarity);
    if (minIndex >= 0 && (rarityIndex < 0 || rarityIndex < minIndex)) {
      rarity = minRarity;
    }
  }
  const slotWeights = sourceConfig.slotWeights || dropTables.defaultSlotWeights;
  const preferredSlotType = rollWeighted(slotWeights);
  const item =
    rollItemForRarity(rarity, {
      sourceKey,
      includeActiveMission: true,
      slotType: preferredSlotType,
    }) ||
    rollItemForRarity(rarity, { sourceKey, includeActiveMission: true });
  if (!item) return null;
  item.dropSource = sourceKey;
  return {
    rarity,
    item,
  };
}

function getArmoryInventory(targetState = state) {
  if (!targetState.armory) targetState.armory = {};
  if (!Array.isArray(targetState.armory.inventory)) targetState.armory.inventory = [];
  return targetState.armory.inventory;
}

function findInventoryItem(itemId, targetState = state) {
  if (!itemId) return null;
  return getArmoryInventory(targetState).find((item) => item.id === itemId) || null;
}

function refreshSavedInventoryCatalogBuilds(targetState = state) {
  if (!itemPoolCatalog || !targetState?.armory) return false;
  let changed = false;
  getArmoryInventory(targetState).forEach((item) => {
    if (refreshSavedCatalogItemBuild(item)) changed = true;
  });
  if (changed) {
    targetState.shipBuild = composeShipBuildFromArmory(targetState);
    if (targetState === state) syncShipBuildToLegacy();
  }
  return changed;
}

function normalizeRelicCollection(collection) {
  if (!collection || typeof collection !== "object" || Array.isArray(collection)) return {};
  const normalized = {};
  Object.entries(collection).forEach(([id, entry]) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) return;
    const relicId = String(entry.relicId || id);
    normalized[relicId] = {
      relicId,
      name: String(entry.name || entry.baseName || relicId),
      baseName: String(entry.baseName || entry.name || relicId),
      lore: String(entry.lore || ""),
      uniquePropertyName: String(entry.uniquePropertyName || ""),
      discoveredAt: Number.isFinite(entry.discoveredAt) ? entry.discoveredAt : Date.now(),
      count: Math.max(1, Math.round(Number(entry.count) || 1)),
      tags: Array.isArray(entry.tags) ? entry.tags.filter((tag) => typeof tag === "string") : [],
    };
  });
  return normalized;
}

function getRelicCollection(targetState = state) {
  targetState.relicCollection = normalizeRelicCollection(targetState.relicCollection);
  return targetState.relicCollection;
}

function getRelicDiscoveryId(item) {
  if (!item) return null;
  if (item.relicId) return item.relicId;
  if (item.rarity === "preFounding" && item.baseId) return item.baseId;
  return null;
}

function recordRelicDiscovery(item) {
  const relicId = getRelicDiscoveryId(item);
  if (!relicId || !item?.relicLore) return false;
  const collection = getRelicCollection(state);
  const existing = collection[relicId] || null;
  const firstDiscovery = !existing;
  collection[relicId] = {
    relicId,
    name: item.name || existing?.name || relicId,
    baseName: item.baseName || existing?.baseName || item.name || relicId,
    lore: item.relicLore || existing?.lore || "",
    uniquePropertyName: item.uniqueProperty?.name || existing?.uniquePropertyName || "",
    discoveredAt: existing?.discoveredAt || Date.now(),
    count: (existing?.count || 0) + 1,
    tags: Array.from(new Set(Array.isArray(item.tags) ? item.tags : existing?.tags || [])),
  };
  item.relicFirstDiscovery = firstDiscovery;
  item.relicLoreStatus = firstDiscovery ? "new" : "archived";
  return firstDiscovery;
}

function normalizeItemCollection(collection) {
  if (!collection || typeof collection !== "object" || Array.isArray(collection)) return {};
  const normalized = {};
  Object.entries(collection).forEach(([id, entry]) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) return;
    const baseId = String(entry.baseId || id);
    normalized[baseId] = {
      baseId,
      name: String(entry.name || entry.baseName || baseId),
      slotType: normalizeArmorySlotType(entry.slotType || "primary"),
      lastRarity: String(entry.lastRarity || entry.rarity || ""),
      discoveredAt: Number.isFinite(entry.discoveredAt) ? entry.discoveredAt : Date.now(),
      count: Math.max(1, Math.round(Number(entry.count) || 1)),
      tags: Array.isArray(entry.tags) ? entry.tags.filter((tag) => typeof tag === "string") : [],
    };
  });
  return normalized;
}

function getItemCollection(targetState = state) {
  targetState.itemCollection = normalizeItemCollection(targetState.itemCollection);
  return targetState.itemCollection;
}

function findCatalogBaseIdBySourceId(sourceId, slotType = null) {
  if (!sourceId || !itemPoolCatalog) return null;
  const normalizedSlot = slotType ? normalizeArmorySlotType(slotType) : null;
  const sources = [itemPoolCatalog.entries || {}, itemPoolCatalog.relics || {}];
  for (const source of sources) {
    const match = Object.entries(source).find(([, entry]) => {
      if (!entry || entry.sourceId !== sourceId) return false;
      return !normalizedSlot || normalizeArmorySlotType(entry.slotType) === normalizedSlot;
    });
    if (match) return match[0];
  }
  return null;
}

function getCatalogBaseIdForItem(item) {
  if (!item) return null;
  if (item.baseId) return item.baseId;
  const slotType = normalizeArmorySlotType(item.slotType);
  return (
    findCatalogBaseIdBySourceId(item.sourceId, slotType) ||
    findCatalogBaseIdBySourceId(item.id, slotType) ||
    null
  );
}

function recordItemDiscovery(item) {
  const baseId = getCatalogBaseIdForItem(item);
  if (!baseId) return false;
  const collection = getItemCollection(state);
  const existing = collection[baseId] || null;
  collection[baseId] = {
    baseId,
    name: item.baseName || item.name || existing?.name || baseId,
    slotType: normalizeArmorySlotType(item.slotType || existing?.slotType || "primary"),
    lastRarity: item.rarity || existing?.lastRarity || "",
    discoveredAt: existing?.discoveredAt || Date.now(),
    count: (existing?.count || 0) + 1,
    tags: Array.from(new Set(Array.isArray(item.tags) ? item.tags : existing?.tags || [])),
  };
  return !existing;
}

function addItemsToArmoryInventory(items, { recordRelics = true } = {}) {
  const inventory = getArmoryInventory(state);
  const existingIds = new Set(inventory.map((item) => item.id));
  items.forEach((item) => {
    if (!item?.id || existingIds.has(item.id)) return;
    const normalizedItem = normalizeSavedArmoryItem(cloneItem(item));
    if (recordRelics) recordRelicDiscovery(normalizedItem);
    recordItemDiscovery(normalizedItem);
    inventory.push(normalizedItem);
    existingIds.add(normalizedItem.id);
  });
}

function createDefaultLedgerMarketState() {
  return {
    stock: [],
    stockVersion: getMarketConfig().stockVersion,
    licenseTier: 0,
    stockMissionCount: null,
    bulletin: null,
    pendingBulletinSales: {
      count: 0,
      bonus: 0,
      tag: null,
      label: null,
    },
    consecutiveEarlyRecalls: 0,
    lastReceipt: null,
  };
}

function normalizeLedgerMarketState(targetState = state) {
  const defaults = createDefaultLedgerMarketState();
  const existing = targetState.ledgerMarket || {};
  const pending = existing.pendingBulletinSales || {};
  const stockVersion =
    Number.isFinite(existing.stockVersion) ? existing.stockVersion : 0;
  const marketConfig = getMarketConfig();
  const isCurrentStockVersion = stockVersion === marketConfig.stockVersion;
  const maxLicenseTier = Math.max(
    0,
    ...getMarketLicenseTiers().map((config) => Number(config.tier) || 0)
  );
  const normalized = {
    ...defaults,
    ...existing,
    stock: isCurrentStockVersion && Array.isArray(existing.stock)
      ? existing.stock
          .filter((lot) => lot?.item?.id)
          .map((lot) => ({
            id: String(lot.id || generateItemInstanceId()),
            item: cloneItem(lot.item),
            price: Math.max(0, Math.round(Number(lot.price) || 0)),
            listValue: Math.max(0, Math.round(Number(lot.listValue) || getItemListValue(lot.item))),
            priceRate: Number.isFinite(lot.priceRate) ? lot.priceRate : marketConfig.buyRate,
            clericalAdjustment: !!lot.clericalAdjustment,
          }))
      : [],
    stockVersion: marketConfig.stockVersion,
    stockMissionCount: isCurrentStockVersion && Number.isFinite(existing.stockMissionCount)
      ? existing.stockMissionCount
      : defaults.stockMissionCount,
    licenseTier: Math.max(
      0,
      Math.min(maxLicenseTier, Math.round(Number(existing.licenseTier) || 0))
    ),
    bulletin: existing.bulletin?.tag
      ? {
          tag: String(existing.bulletin.tag),
          label: String(existing.bulletin.label || existing.bulletin.tag),
          missionCount: Number.isFinite(existing.bulletin.missionCount)
            ? existing.bulletin.missionCount
            : targetState.missionCount || 0,
        }
      : null,
    pendingBulletinSales: {
      count: Math.max(0, Math.round(Number(pending.count) || 0)),
      bonus: Math.max(0, Math.round(Number(pending.bonus) || 0)),
      tag: pending.tag || null,
      label: pending.label || null,
    },
    consecutiveEarlyRecalls: Math.max(
      0,
      Math.round(Number(existing.consecutiveEarlyRecalls) || 0)
    ),
    lastReceipt: existing.lastReceipt || null,
  };
  if (existing && typeof existing === "object" && !Array.isArray(existing)) {
    Object.keys(existing).forEach((key) => {
      delete existing[key];
    });
    Object.assign(existing, normalized);
    targetState.ledgerMarket = existing;
  } else {
    targetState.ledgerMarket = normalized;
  }
  return targetState.ledgerMarket;
}

function getLedgerMarketState(targetState = state) {
  return normalizeLedgerMarketState(targetState);
}

function getLedgerLicenseTier(targetState = state) {
  return getLedgerMarketState(targetState).licenseTier || 0;
}

function normalizeLedgerLicenseConfig(config, tier = 0) {
  const stockLots = Number(config?.stockLots ?? config?.lots);
  return {
    tier: Number(config?.tier ?? tier) || 0,
    stockLots: Number.isFinite(stockLots)
      ? Math.max(1, Math.round(stockLots))
      : getMarketConfig().stockLots,
    cost: Math.max(0, Math.round(Number(config?.cost) || 0)),
  };
}

function getMarketLicenseTiers() {
  const tiers = getMarketConfig().licenseTiers;
  return Array.isArray(tiers) ? tiers : [];
}

function getLedgerLicenseConfig(tier = getLedgerLicenseTier()) {
  const tiers = getMarketLicenseTiers();
  const config = tiers.find((entry) => Number(entry?.tier) === Number(tier)) || tiers[0];
  return normalizeLedgerLicenseConfig(config, tier);
}

function getLedgerStockLotCount(targetState = state) {
  return getLedgerLicenseConfig(getLedgerLicenseTier(targetState)).stockLots || getMarketConfig().stockLots;
}

function getNextLedgerLicenseConfig(targetState = state) {
  const nextTier = getLedgerLicenseTier(targetState) + 1;
  const config = getMarketLicenseTiers().find((entry) => Number(entry?.tier) === nextTier);
  return config ? normalizeLedgerLicenseConfig(config, nextTier) : null;
}

async function purchaseLedgerLicense() {
  await ensureItemPoolLoaded();
  const ledger = getLedgerMarketState();
  const next = getNextLedgerLicenseConfig();
  if (!next || state.credits < next.cost) return;
  state.credits -= next.cost;
  ledger.licenseTier = next.tier;
  rollLedgerStock({ force: true });
  setLedgerReceipt({
    title: `Ledger License ${next.tier}`,
    lines: [
      { label: "Visible lots", text: `${next.stockLots} lots`, memo: true },
      { label: "License cost", amount: -next.cost, fee: true },
      { label: "Credits paid", amount: -next.cost, total: true, fee: true },
    ],
  });
  saveState();
  safeUpdateHangar();
}

function getItemListValue(item) {
  if (Number.isFinite(item?.value)) return Math.max(0, Math.round(item.value));
  const [min, max] = getRarityValueRange(item?.rarity || "scrap");
  return Math.round((min + max) / 2);
}

function pickDemandBulletinTag(previousTag = null) {
  const tags = getMarketConfig().bulletinTags || [];
  if (!tags.length) return null;
  const candidates = tags.length > 1 ? tags.filter((entry) => entry.tag !== previousTag) : tags;
  const picked = candidates[Math.floor(Math.random() * candidates.length)];
  return picked ? { tag: picked.tag, label: picked.label } : null;
}

function refreshDemandBulletin({ force = false } = {}) {
  const ledger = getLedgerMarketState();
  const cadence = Math.max(1, getMarketConfig().bulletinCadence);
  const missionCount = state.missionCount || 0;
  const shouldPick =
    force ||
    !ledger.bulletin?.tag ||
    missionCount - (ledger.bulletin.missionCount || 0) >= cadence;
  if (!shouldPick) return ledger.bulletin;
  const picked = pickDemandBulletinTag(ledger.bulletin?.tag || null);
  if (!picked) {
    ledger.bulletin = null;
    return null;
  }
  ledger.bulletin = {
    ...picked,
    missionCount,
  };
  return ledger.bulletin;
}

function getActiveDemandBulletin() {
  return refreshDemandBulletin();
}

function itemMatchesDemandBulletin(item, bulletin = getActiveDemandBulletin()) {
  if (!item || !bulletin?.tag) return false;
  const tags = Array.isArray(item.tags) ? item.tags : [];
  return tags.includes(bulletin.tag);
}

function getMarketRarityWeights() {
  const unlockedLevel = state.unlockedLevels || 1;
  const progression = getMarketConfig().stockRarityProgression || [];
  let selected = progression[0]?.weights || { scrap: 1 };
  progression.forEach((entry) => {
    if (unlockedLevel >= entry.unlockedLevel) selected = entry.weights;
  });
  return selected;
}

function rollMarketItem(options = {}) {
  const rarity = rollWeighted(getMarketRarityWeights());
  return rollItemForRarity(rarity, { sourceKey: "market", ...options });
}

function generateLedgerLotId(index) {
  const missionPart = String(state.missionCount || 0).padStart(3, "0");
  const lotPart = String(index + 1).padStart(2, "0");
  const suffix = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `L-${missionPart}-${lotPart}-${suffix}`;
}

function createLedgerLot(index, clericalAdjustment = false, itemOptions = {}) {
  const item = rollMarketItem(itemOptions);
  if (!item) return null;
  const listValue = getItemListValue(item);
  const marketConfig = getMarketConfig();
  let priceRate = marketConfig.buyRate;
  if (clericalAdjustment) {
    const [min, max] = marketConfig.mispricedValueRange;
    const profitableMax = Math.max(
      min,
      Math.min(max, getMarketSellRate() - marketConfig.mispricedMinProfitRate)
    );
    priceRate = min + Math.random() * (profitableMax - min);
  }
  return {
    id: generateLedgerLotId(index),
    item,
    listValue,
    priceRate,
    price: Math.max(1, Math.round(listValue * priceRate)),
    clericalAdjustment,
  };
}

function rollLedgerStock({ force = false } = {}) {
  const ledger = getLedgerMarketState();
  if (!itemPoolCatalog) return ledger.stock;
  if (!force && ledger.stock.length) return ledger.stock;
  const lots = [];
  const usedBaseIds = new Set();
  const lotCount = getLedgerStockLotCount();
  const mispricedIndex =
    Math.random() < getMarketConfig().mispricedLotChance
      ? Math.floor(Math.random() * lotCount)
      : -1;
  const stockSpecs = [
    { slotType: "primary", anyTags: ["dual", "rapid", "burst", "plasma", "anti-armor", "homing", "explosive"] },
    { slotType: "mini" },
    { slotType: "primary", anyTags: ["dual", "rapid", "burst", "wide", "focused", "swarm", "heavy", "multi-shot"] },
    { slotType: "defense" },
    { slotType: "aux" },
  ];
  for (let i = 0; i < lotCount; i += 1) {
    const spec = stockSpecs[i % stockSpecs.length] || {};
    const lot = createLedgerLot(i, i === mispricedIndex, {
      ...spec,
      excludeBaseIds: usedBaseIds,
    });
    if (lot) {
      lots.push(lot);
      if (lot.item?.baseId) usedBaseIds.add(lot.item.baseId);
    }
  }
  ledger.stock = lots;
  ledger.stockVersion = getMarketConfig().stockVersion;
  ledger.stockMissionCount = state.missionCount || 0;
  return ledger.stock;
}

async function ensureLedgerMarketReady() {
  await ensureItemPoolLoaded();
  const refreshedSavedItems = refreshSavedInventoryCatalogBuilds(state);
  refreshDemandBulletin();
  const ledger = getLedgerMarketState();
  const missionCount = state.missionCount || 0;
  const needsStock =
    ledger.stockMissionCount === null ||
    !Array.isArray(ledger.stock) ||
    (!ledger.stock.length && ledger.stockMissionCount !== missionCount);
  if (needsStock) {
    rollLedgerStock({ force: true });
    saveState();
  } else if (refreshedSavedItems) {
    saveState();
  }
  return ledger;
}

function getItemSellQuote(item) {
  const listValue = getItemListValue(item);
  const handlingFee = Math.round(listValue * getMarketHandlingFeeRate());
  const basePayout = Math.max(0, listValue - handlingFee);
  const bulletin = getActiveDemandBulletin();
  const bulletinMatch = itemMatchesDemandBulletin(item, bulletin);
  const bulletinBonus = bulletinMatch
    ? Math.round(basePayout * getMarketConfig().bulletinBonusRate)
    : 0;
  return {
    listValue,
    basePayout,
    handlingFee,
    bulletin,
    bulletinMatch,
    bulletinBonus,
    payout: basePayout + bulletinBonus,
  };
}

function setLedgerReceipt(receipt) {
  const ledger = getLedgerMarketState();
  ledger.lastReceipt = {
    timestamp: Date.now(),
    ...receipt,
  };
}

function recordBulletinSaleBonus(quote) {
  if (!quote?.bulletinMatch || quote.bulletinBonus <= 0) return;
  const ledger = getLedgerMarketState();
  ledger.pendingBulletinSales.count += 1;
  ledger.pendingBulletinSales.bonus += quote.bulletinBonus;
  ledger.pendingBulletinSales.tag = quote.bulletin?.tag || null;
  ledger.pendingBulletinSales.label = quote.bulletin?.label || null;
}

function removeInventoryItem(itemId) {
  const inventory = getArmoryInventory(state);
  const index = inventory.findIndex((item) => item.id === itemId);
  if (index < 0) return null;
  const [item] = inventory.splice(index, 1);
  return item || null;
}

function unequipSoldInventoryItem(itemId) {
  if (!state.armory || !itemId) return;
  if (state.armory.equippedPrimaryItemId === itemId) {
    state.armory.equippedPrimaryItemId = null;
    state.armory.equippedLoadoutId =
      state.armory.equippedLoadoutId || starterWeaponLoadouts[0]?.id || "fundamentals";
  }
  if (state.armory.equippedSecondPrimaryItemId === itemId) {
    state.armory.equippedSecondPrimaryItemId = null;
    state.armory.equippedSecondLoadoutId = null;
    state.activePrimaryBay = 0;
  }
  if (state.armory.equippedMiniItemId === itemId) {
    state.armory.equippedMiniItemId = starterMiniWeapons[0]?.id || null;
  }
  if (Array.isArray(state.armory.equippedDefenseSlotIds)) {
    state.armory.equippedDefenseSlotIds = state.armory.equippedDefenseSlotIds.map((slotId) =>
      slotId === itemId ? "none" : slotId
    );
  }
  if (state.armory.equippedSupportItemId === itemId) {
    state.armory.equippedSupportItemId = null;
    state.rmbWeapon = state.rmbWeapon || "cloak";
  }
  state.shipBuild = composeShipBuildFromArmory(state);
  syncShipBuildToLegacy();
}

function isInventoryItemInstalled(itemId) {
  if (!itemId || !state.armory) return false;
  if (state.armory.equippedPrimaryItemId === itemId) return true;
  if (state.armory.equippedSecondPrimaryItemId === itemId) return true;
  if (state.armory.equippedMiniItemId === itemId) return true;
  if (state.armory.equippedSupportItemId === itemId) return true;
  return Array.isArray(state.armory.equippedDefenseSlotIds)
    ? state.armory.equippedDefenseSlotIds.includes(itemId)
    : false;
}

function buyLedgerLot(lotId) {
  hideItemTooltip();
  const ledger = getLedgerMarketState();
  const lotIndex = ledger.stock.findIndex((lot) => lot.id === lotId);
  if (lotIndex < 0) return;
  const lot = ledger.stock[lotIndex];
  if (state.credits < lot.price) return;
  state.credits -= lot.price;
  addItemsToArmoryInventory([lot.item]);
  ledger.stock.splice(lotIndex, 1);
  const receiptLines = [
    { label: "Item", text: lot.item.name },
    { label: "List value", amount: lot.listValue },
  ];
  if (lot.item.relicFirstDiscovery && lot.item.relicLore) {
    receiptLines.push({
      label: "Relic fragment",
      text: lot.item.relicLore,
      memo: true,
    });
  }
  receiptLines.push(
    {
      label: lot.clericalAdjustment
        ? `Lot price (${LEDGER_COPY.clericalAdjustment})`
        : "Lot price",
      amount: -lot.price,
      fee: true,
    },
    { label: "Credits paid", amount: -lot.price, total: true, fee: true }
  );
  setLedgerReceipt({
    title: `Purchase ${lot.id}`,
    lines: receiptLines,
  });
  saveState();
  safeUpdateHangar();
}

function sellInventoryItem(itemId) {
  hideItemTooltip();
  const item = findInventoryItem(itemId);
  if (!item) return;
  const quote = getItemSellQuote(item);
  removeInventoryItem(itemId);
  unequipSoldInventoryItem(itemId);
  state.credits += quote.payout;
  state.lifetimeCredits += quote.payout;
  recordBulletinSaleBonus(quote);
  const lines = [
    { label: "Item", text: item.name },
    { label: "List value", amount: quote.listValue },
    { label: LEDGER_COPY.ledgerHandlingFee, amount: -quote.handlingFee, fee: true },
  ];
  if (quote.bulletinBonus > 0) {
    lines.push({
      label: `${LEDGER_COPY.demandBonus} (${quote.bulletin?.label || quote.bulletin?.tag})`,
      amount: quote.bulletinBonus,
    });
  }
  lines.push({ label: "Net payout", amount: quote.payout, total: true });
  setLedgerReceipt({
    title: "Sale Receipt",
    lines,
  });
  saveState();
  safeUpdateHangar();
}

function capturePendingBulletinSaleSummary() {
  const ledger = getLedgerMarketState();
  const pending = ledger.pendingBulletinSales;
  if (!pending.count || pending.bonus <= 0) return null;
  const summary = { ...pending };
  ledger.pendingBulletinSales = {
    count: 0,
    bonus: 0,
    tag: null,
    label: null,
  };
  return summary;
}

function settleLedgerAfterMission(outcome) {
  const ledger = getLedgerMarketState();
  if (outcome === "boss") {
    ledger.consecutiveEarlyRecalls = 0;
  } else if (outcome === "rtb") {
    ledger.consecutiveEarlyRecalls += 1;
  } else {
    ledger.consecutiveEarlyRecalls = 0;
  }
  const earlyRecallAudit =
    ledger.consecutiveEarlyRecalls >= getMarketConfig().earlyRecallAuditThreshold;
  refreshDemandBulletin();
  rollLedgerStock({ force: true });
  return {
    earlyRecallAudit,
    consecutiveEarlyRecalls: ledger.consecutiveEarlyRecalls,
  };
}

const starfield = Array.from({ length: 120 }, () => ({
  x: Math.random(),
  y: Math.random(),
  speed: 0.2 + Math.random() * 0.8,
  size: 0.5 + Math.random() * 1.4,
}));

let activeShipBuildOverride = null;
const devParams = new URLSearchParams(window.location.search);
function getDevParam(name) {
  const directValue = devParams.get(name);
  if (directValue !== null) {
    return directValue;
  }
  const normalizedName = name.toLowerCase();
  for (const [key, value] of devParams.entries()) {
    if (key.toLowerCase() === normalizedName) {
      return value;
    }
  }
  return "";
}

function getAnyDevParam(names) {
  for (const name of names) {
    const value = getDevParam(name);
    if (value) {
      return value;
    }
  }
  return "";
}

function isDevFlagEnabled(name) {
  return ["1", "true", "yes", "on"].includes(getDevParam(name).toLowerCase());
}

const devSkipOnboarding = isDevFlagEnabled("devSkip");
const devRequestedLevelId = getDevParam("level");
const devRequestedBackground = getDevParam("bg");
const devInvincible = isDevFlagEnabled("devInvincible");
const devAutoFire = isDevFlagEnabled("devAutoFire");
const devTuning = isDevFlagEnabled("devTuning");
const devUiSkin = getAnyDevParam(["uiSkin", "skin", "buttonSkin", "buttons"]).toLowerCase();
const devGeneratedUiSkin = ["generated", "1", "true", "yes", "on"].includes(devUiSkin);
if (devGeneratedUiSkin) {
  document.body.classList.add("generated-ui-skin");
  document.body.dataset.uiSkin = "generated";
}
let state = null;
let mission = null;

function applyDevStateFlags() {
  if (!state) return;
  if (devSkipOnboarding) {
    shouldAutoLaunchFreshPilotMission = false;
    state.debugSkipOnboarding = true;
    state.debugUnlock = true;
    state.onboardingStage = ONBOARDING_STAGE_COMPLETE;
    state.unlockedLevels = Math.max(state.unlockedLevels || 1, 99);
    state.systemUnlocks = { loadout: true, economy: true, compendium: true };
  }
  if (devInvincible) {
    state.debugInvincible = true;
  }
  refreshSystemUnlocks();
  syncShipBuildToLegacy();
  saveState();
}

let tuningPanel = null;
let tuningBadge = null;
let tuningPanelBody = null;
let tuningStatus = "";
let tuningPanelMinimized = false;

const TUNING_SECTION_LABELS = {
  market: "Market",
  extraction: "Extraction",
  itemValue: "Item Value",
  dropTables: "Drop Tables",
  missionRewards: "Mission Rewards",
  investments: "Investments",
  consumables: "Consumables",
  reportTargets: "Report Targets",
  legacyCreditGates: "Legacy Gates",
};

function isTuningEditableNumber(path, value) {
  if (!Number.isFinite(value)) return false;
  const key = String(path[path.length - 1] || "");
  if (key === "tier") return false;
  return true;
}

function collectNumericTuningFields(node, path = [], fields = []) {
  if (typeof node === "number") {
    if (isTuningEditableNumber(path, node)) fields.push({ path: path.slice(), value: node });
    return fields;
  }
  if (!node || typeof node !== "object") return fields;
  Object.entries(node).forEach(([key, value]) => {
    collectNumericTuningFields(value, [...path, key], fields);
  });
  return fields;
}

function getTuningFieldsBySection() {
  if (!economyConfig) return {};
  const sections = {};
  Object.keys(TUNING_SECTION_LABELS).forEach((section) => {
    sections[section] = collectNumericTuningFields(economyConfig[section], [section]);
  });
  return sections;
}

function tuningPathToInputName(path) {
  return path
    .map((part) => String(part).replace(/[^a-zA-Z0-9_-]/g, "_"))
    .join(".");
}

function formatTuningPath(path) {
  return path
    .slice(1)
    .map((part, index) => {
      if (/^\d+$/.test(String(part))) return `[${part}]`;
      const label = String(part)
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/[_-]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
      return index > 0 && /^\[\d+\]$/.test(String(path[index])) ? label : label;
    })
    .join(" ");
}

function getTuningInputConfig(path) {
  const lower = path.join(".").toLowerCase();
  const last = String(path[path.length - 1] || "").toLowerCase();
  const integer =
    /cost|credit|lots|count|version|cadence|threshold|unlock|uses|level|slots|basecredit/.test(lower) ||
    ["duration", "cooldown"].includes(last) === false && /time$/.test(last);
  const rateLike = /rate|chance|fraction|dividend|quality|multiplier|bonus|writedown|sellrate|buyrate/.test(lower);
  return {
    step: integer ? "1" : "0.01",
    min: "0",
    max: rateLike && !/cost|credit|basecredit|lots|count/.test(lower) ? "1" : "",
  };
}

function ensureTuningUi() {
  if (!tuningBadge) {
    tuningBadge = document.createElement("div");
    tuningBadge.className = "tuning-badge";
    tuningBadge.textContent = "TUNING OVERRIDES ACTIVE";
    tuningBadge.hidden = true;
    document.body.appendChild(tuningBadge);
  }
  if (!devTuning || tuningPanel) return;
  tuningPanelMinimized =
    localStorage.getItem(ECONOMY_PANEL_MINIMIZED_STORAGE_KEY) === "1";
  tuningPanel = document.createElement("aside");
  tuningPanel.className = "tuning-panel";
  tuningPanel.innerHTML = `
    <header class="tuning-panel-head">
      <div>
        <span class="kicker">Dev Tuning</span>
        <strong>Economy Control</strong>
      </div>
      <div class="tuning-panel-actions">
        <button type="button" class="btn ghost small" data-tuning-action="export">Export</button>
        <button type="button" class="btn ghost small" data-tuning-action="reset">Reset</button>
        <button type="button" class="btn ghost small" data-tuning-action="toggle-minimize" aria-pressed="false">Minimize</button>
      </div>
    </header>
    <div class="tuning-panel-status" data-tuning-status></div>
    <div class="tuning-panel-body" data-tuning-body></div>
  `;
  tuningPanelBody = tuningPanel.querySelector("[data-tuning-body]");
  document.body.appendChild(tuningPanel);
  tuningPanel.addEventListener("input", handleTuningPanelInput);
  tuningPanel.addEventListener("click", handleTuningPanelClick);
}

function updateTuningBadge() {
  ensureTuningUi();
  if (!tuningBadge) return;
  tuningBadge.hidden = !hasEconomyOverrides();
}

function renderTuningPanel() {
  ensureTuningUi();
  updateTuningBadge();
  if (!devTuning || !tuningPanel || !tuningPanelBody || !economyConfig) return;
  const shouldShow = !mission?.active;
  tuningPanel.hidden = !shouldShow;
  if (!shouldShow) return;
  tuningPanel.classList.toggle("minimized", tuningPanelMinimized);
  const minimizeButton = tuningPanel.querySelector("[data-tuning-action='toggle-minimize']");
  if (minimizeButton) {
    minimizeButton.textContent = tuningPanelMinimized ? "Open" : "Minimize";
    minimizeButton.setAttribute("aria-pressed", tuningPanelMinimized ? "true" : "false");
    minimizeButton.title = tuningPanelMinimized ? "Open economy tuning panel" : "Minimize economy tuning panel";
  }
  const statusEl = tuningPanel.querySelector("[data-tuning-status]");
  if (statusEl) {
    statusEl.textContent = tuningStatus || (hasEconomyOverrides() ? "Sparse local overrides active." : "Using shipped config.");
  }
  if (tuningPanelMinimized) return;
  const sections = getTuningFieldsBySection();
  tuningPanelBody.innerHTML = Object.entries(sections)
    .filter(([, fields]) => fields.length)
    .map(([section, fields]) => `
      <section class="tuning-section">
        <h3>${escapeHtml(TUNING_SECTION_LABELS[section] || section)}</h3>
        <div class="tuning-grid">
          ${fields.map(renderTuningInput).join("")}
        </div>
      </section>
    `)
    .join("");
}

function renderTuningInput(field) {
  const { step, min, max } = getTuningInputConfig(field.path);
  const pathName = tuningPathToInputName(field.path);
  return `
    <label class="tuning-field">
      <span title="${escapeHtml(field.path.join("."))}">${escapeHtml(formatTuningPath(field.path))}</span>
      <input
        type="number"
        data-tuning-path="${escapeHtml(pathName)}"
        value="${escapeHtml(String(field.value))}"
        step="${step}"
        min="${min}"
        ${max ? `max="${max}"` : ""}
      />
    </label>
  `;
}

function pathNameToTuningPath(pathName) {
  return String(pathName)
    .split(".")
    .map((part) => (/^\d+$/.test(part) ? Number(part) : part));
}

function applyTuningOverride(path, value) {
  if (!baseEconomyConfig || !economyConfig) return;
  const nextConfig = deepClone(economyConfig);
  const { step } = getTuningInputConfig(path);
  const normalizedValue = step === "1" ? Math.round(value) : value;
  setConfigPathValue(nextConfig, path, normalizedValue);
  applyEconomyConfig(nextConfig, { persistOverrides: true });
  tuningStatus = hasEconomyOverrides() ? "Sparse local overrides active." : "Using shipped config.";
  if (!mission?.active) safeUpdateHangar();
}

function handleTuningPanelInput(event) {
  const input = event.target?.closest?.("[data-tuning-path]");
  if (!input) return;
  const value = Number(input.value);
  if (!Number.isFinite(value)) return;
  const path = pathNameToTuningPath(input.dataset.tuningPath);
  try {
    applyTuningOverride(path, value);
  } catch (error) {
    tuningStatus = error?.message || "Invalid tuning value.";
    renderTuningPanel();
  }
}

function handleTuningPanelClick(event) {
  const action = event.target?.closest?.("[data-tuning-action]")?.dataset?.tuningAction;
  if (!action) return;
  if (action === "toggle-minimize") {
    tuningPanelMinimized = !tuningPanelMinimized;
    localStorage.setItem(
      ECONOMY_PANEL_MINIMIZED_STORAGE_KEY,
      tuningPanelMinimized ? "1" : "0"
    );
    renderTuningPanel();
    return;
  }
  if (action === "reset") {
    applyEconomyConfig(baseEconomyConfig, { persistOverrides: true });
    tuningStatus = "Overrides cleared.";
    if (!mission?.active) safeUpdateHangar();
    renderTuningPanel();
  }
  if (action === "export") {
    exportMergedEconomyConfig();
  }
}

function exportMergedEconomyConfig() {
  if (!economyConfig) return;
  const json = `${JSON.stringify(economyConfig, null, 2)}\n`;
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "economy.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  if (navigator.clipboard?.writeText) {
    navigator.clipboard
      .writeText(json)
      .then(() => {
        tuningStatus = "Merged JSON downloaded and copied.";
        renderTuningPanel();
      })
      .catch(() => {
        tuningStatus = "Merged JSON downloaded. Clipboard copy failed.";
        renderTuningPanel();
      });
  } else {
    tuningStatus = "Merged JSON downloaded.";
    renderTuningPanel();
  }
}

const player = {
  x: 0,
  y: 0,
  radius: 22,
  velocity: { x: 0, y: 0 },
  hull: 100,
  maxHull: 100,
  armor: 0,
  maxArmor: 0,
  armorClass: 0,
  shield: 40,
  maxShield: 40,
  shieldRegen: 12,
  shieldCooldown: 0,
  shieldRechargeDelay: 2.5,
  healthBarTimer: 0,
  fireCooldown: 0,
  primaryBayCooldowns: [0, 0],
  miniFireCooldown: 0,
  swapCooldown: 0,
  spriteScale: 0.75,
  spreadLevel: 0,
  altCooldown: 0,
  altCooldownTime: 0.9,
  altDamageMult: 1,
  cloakTimer: 0,
  cloakCooldownTime: 10,
  cloakDuration: 2.5,
  hitTimer: 0,
  bulwarkTimer: 0,
  damageBoostTimer: 0,
  damageBoostMult: 1,
  empCooldownTime: 8,
  empDuration: 1.6,
  empClearRadius: EMP_CLEAR_BASE_RADIUS,
  bulwarkDuration: 1.2,
  bulwarkShield: 0,
  bulwarkShieldBonus: 200,
};

const bullets = [];
const enemyBullets = [];
const enemies = [];
const salvagePods = [];
const floatingTexts = [];
const explosions = [];
let backgroundScroll = 0;
let cargoHudMessageTimer = 0;

const assets = {
  background: loadImage(`${BG_ROOT}/blue.png`),
  backgrounds: {
    blue: loadImage(`${BG_ROOT}/blue.png`),
    purple: loadImage(`${BG_ROOT}/purple.png`),
    darkPurple: loadImage(`${BG_ROOT}/darkPurple.png`),
    black: loadImage(`${BG_ROOT}/black.png`),
    nebulaTeal: loadImage(`${BG_ROOT}/nebulaTeal.png`),
    nebulaCrimson: loadImage(`${BG_ROOT}/nebulaCrimson.png`),
    nebulaLime: loadImage(`${BG_ROOT}/nebulaLime.png`),
    aurora: loadImage(`${BG_ROOT}/aurora.png`),
    ionStorm: loadImage(`${BG_ROOT}/ionStorm.png`),
    warpGrid: loadImage(`${BG_ROOT}/warpGrid.png`),
    asteroidBelt: loadImage(`${BG_ROOT}/asteroidBelt.png`),
    voidDust: loadImage(`${BG_ROOT}/voidDust.png`),
    wreckage: loadImage(`${BG_ROOT}/wreckage.png`),
    nb_tealrift: loadImage(`${BG_ROOT}/nb_tealrift.png`),
    nb_crimsonstorm: loadImage(`${BG_ROOT}/nb_crimsonstorm.png`),
    nb_aurorawave: loadImage(`${BG_ROOT}/nb_aurorawave.png`),
    nb_wreckfield: loadImage(`${BG_ROOT}/nb_wreckfield.png`),
    generatedTealRift: loadImage(GENERATED_BACKGROUND_URLS.generatedTealRift),
    generatedAmberDust: loadImage(GENERATED_BACKGROUND_URLS.generatedAmberDust),
    generatedAmberDustLooped: loadImage(GENERATED_BACKGROUND_URLS.generatedAmberDustLooped),
    generatedDerelictDebris: loadImage(GENERATED_BACKGROUND_URLS.generatedDerelictDebris),
    generatedDerelictDebrisLooped: loadImage(GENERATED_BACKGROUND_URLS.generatedDerelictDebrisLooped),
    generatedBioNebula: loadImage(GENERATED_BACKGROUND_URLS.generatedBioNebula),
    generatedBioNebulaLooped: loadImage(GENERATED_BACKGROUND_URLS.generatedBioNebulaLooped),
    generatedDeepVoid: loadImage(GENERATED_BACKGROUND_URLS.generatedDeepVoid),
    generatedDeepVoidLooped: loadImage(GENERATED_BACKGROUND_URLS.generatedDeepVoidLooped),
    generatedCathedralDrift: loadImage(GENERATED_BACKGROUND_URLS.generatedCathedralDrift),
    generatedCathedralDriftLooped: loadImage(GENERATED_BACKGROUND_URLS.generatedCathedralDriftLooped),
    generatedArrearsField: loadImage(GENERATED_BACKGROUND_URLS.generatedArrearsField),
    generatedArrearsFieldLooped: loadImage(GENERATED_BACKGROUND_URLS.generatedArrearsFieldLooped),
    generatedOriginHull: loadImage(GENERATED_BACKGROUND_URLS.generatedOriginHull),
    generatedOriginHullLooped: loadImage(GENERATED_BACKGROUND_URLS.generatedOriginHullLooped),
  },
  player: loadImage(`${ASSET_ROOT}/playerShip2_blue.png`),
  playerBullet: loadImage(`${ASSET_ROOT}/Lasers/laserBlue02.png`),
  spreadBullet: loadImage(`${ASSET_ROOT}/Lasers/laserGreen02.png`),
  altRocket: loadImage(`${ASSET_ROOT}/Lasers/laserGreen16.png`),
  altArc: loadImage(`${ASSET_ROOT}/Lasers/laserBlue16.png`),
  enemyBullet: loadImage(`${ASSET_ROOT}/Lasers/laserRed02.png`),
  shield: loadImage(`${ASSET_ROOT}/Effects/shield3.png`),
  salvagePod: loadImage(`${GENERATED_UI_CHROME_ROOT}/salvage_pod_certified.png`),
  salvagePodFallback: loadImage(`${ASSET_ROOT}/Power-ups/powerupBlue.png`),
  shieldBooster: loadImage(overhaulKit.pickups.shieldBooster),
  armorPatch: loadImage(overhaulKit.pickups.armorPatch),
  hulls: {
    starter: loadImage(overhaulKit.hulls.starter),
    bastion: loadImage(overhaulKit.hulls.bastion),
    relay: loadImage(overhaulKit.hulls.relay),
    broadside: loadImage(overhaulKit.hulls.broadside),
  },
  salvagePods: {
    scrap: loadImage(`${GENERATED_UI_CHROME_ROOT}/salvage_pod_scrap.png`),
    certified: loadImage(`${GENERATED_UI_CHROME_ROOT}/salvage_pod_certified.png`),
    prototype: loadImage(`${GENERATED_UI_CHROME_ROOT}/salvage_pod_prototype.png`),
    preFounding: loadImage(`${GENERATED_UI_CHROME_ROOT}/salvage_pod_pre_founding.png`),
  },
  explosionCore: loadImage(`${ASSET_ROOT}/Effects/star2.png`),
  explosionFlare: loadImage(`${ASSET_ROOT}/Effects/star3.png`),
  explosionFire: Array.from({ length: 20 }, (_, i) =>
    loadImage(`${ASSET_ROOT}/Effects/fire${String(i).padStart(2, "0")}.png`)
  ),
  enemies: {
    scout: loadImage(`${ASSET_ROOT}/Enemies/enemyBlue2.png`),
    blue3: loadImage(`${ASSET_ROOT}/Enemies/enemyBlue3.png`),
    fighter: loadImage(`${ASSET_ROOT}/Enemies/enemyRed3.png`),
    bruiser: loadImage(`${ASSET_ROOT}/Enemies/enemyBlack4.png`),
    hunter: loadImage(`${ASSET_ROOT}/Enemies/enemyGreen4.png`),
    transport: loadImage(`${ASSET_ROOT}/ufoBlue.png`),
    boss: loadImage(`${ASSET_ROOT}/ufoRed.png`),
    red2: loadImage(`${ASSET_ROOT}/Enemies/enemyRed2.png`),
    black3: loadImage(`${ASSET_ROOT}/Enemies/enemyBlack3.png`),
    aceBlue: loadImage(`${ASSET_ROOT}/Enemies/enemyBlue5.png`),
    aceRed: loadImage(`${ASSET_ROOT}/Enemies/enemyRed5.png`),
    aceGreen: loadImage(`${ASSET_ROOT}/Enemies/enemyGreen5.png`),
    aceBlack: loadImage(`${ASSET_ROOT}/Enemies/enemyBlack5.png`),
    ufoGreen: loadImage(`${ASSET_ROOT}/ufoGreen.png`),
    ufoYellow: loadImage(`${ASSET_ROOT}/ufoYellow.png`),
  },
  visualThemes: {
    generated_v1: {
      player: loadImage(`${GENERATED_PILOT_ROOT}/player_interceptor.png`),
      playerBullet: loadImage(`${GENERATED_EFFECT_ROOT}/player_kinetic_bolt.png`),
      playerPlasma: loadImage(`${GENERATED_EFFECT_ROOT}/player_plasma_orb.png`),
      playerPierce: loadImage(`${GENERATED_EFFECT_ROOT}/player_pierce_lance.png`),
      playerRocket: loadImage(`${GENERATED_EFFECT_ROOT}/player_rocket.png`),
      enemyBullet: loadImage(`${GENERATED_SPACE_PROJECTILE_ROOT}/enemy_space_warm_standard_bolt.png`),
      enemyPurpleOrb: loadImage(`${GENERATED_SPACE_PROJECTILE_ROOT}/enemy_space_cool_plasma_ball.png`),
      enemySpreadShard: loadImage(`${GENERATED_SPACE_PROJECTILE_ROOT}/enemy_space_cool_chip_dart.png`),
      enemyRadialEmber: loadImage(`${GENERATED_SPACE_PROJECTILE_ROOT}/enemy_space_warm_plasma_ball.png`),
      enemyProjectiles: {
        enemy_space_warm_chip_dart: loadImage(`${GENERATED_SPACE_PROJECTILE_ROOT}/enemy_space_warm_chip_dart.png`),
        enemy_space_warm_chip_needle: loadImage(`${GENERATED_SPACE_PROJECTILE_ROOT}/enemy_space_warm_chip_needle.png`),
        enemy_space_warm_standard_bolt: loadImage(`${GENERATED_SPACE_PROJECTILE_ROOT}/enemy_space_warm_standard_bolt.png`),
        enemy_space_warm_standard_slug: loadImage(`${GENERATED_SPACE_PROJECTILE_ROOT}/enemy_space_warm_standard_slug.png`),
        enemy_space_cool_chip_dart: loadImage(`${GENERATED_SPACE_PROJECTILE_ROOT}/enemy_space_cool_chip_dart.png`),
        enemy_space_cool_chip_needle: loadImage(`${GENERATED_SPACE_PROJECTILE_ROOT}/enemy_space_cool_chip_needle.png`),
        enemy_space_cool_standard_bolt: loadImage(`${GENERATED_SPACE_PROJECTILE_ROOT}/enemy_space_cool_standard_bolt.png`),
        enemy_space_cool_standard_slug: loadImage(`${GENERATED_SPACE_PROJECTILE_ROOT}/enemy_space_cool_standard_slug.png`),
        enemy_space_warm_plasma_ball: loadImage(`${GENERATED_SPACE_PROJECTILE_ROOT}/enemy_space_warm_plasma_ball.png`),
        enemy_space_warm_heavy_core: loadImage(`${GENERATED_SPACE_PROJECTILE_ROOT}/enemy_space_warm_heavy_core.png`),
        enemy_space_warm_boss_core: loadImage(`${GENERATED_SPACE_PROJECTILE_ROOT}/enemy_space_warm_boss_core.png`),
        enemy_space_warm_boss_ring: loadImage(`${GENERATED_SPACE_PROJECTILE_ROOT}/enemy_space_warm_boss_ring.png`),
        enemy_space_cool_plasma_ball: loadImage(`${GENERATED_SPACE_PROJECTILE_ROOT}/enemy_space_cool_plasma_ball.png`),
        enemy_space_cool_heavy_core: loadImage(`${GENERATED_SPACE_PROJECTILE_ROOT}/enemy_space_cool_heavy_core.png`),
        enemy_space_cool_boss_core: loadImage(`${GENERATED_SPACE_PROJECTILE_ROOT}/enemy_space_cool_boss_core.png`),
        enemy_space_cool_boss_ring: loadImage(`${GENERATED_SPACE_PROJECTILE_ROOT}/enemy_space_cool_boss_ring.png`),
        enemy_space_gold_hymn_dart: loadImage(`${GENERATED_SPACE_PROJECTILE_ROOT}/enemy_space_gold_hymn_dart.png`),
        enemy_space_gold_hymn_ring: loadImage(`${GENERATED_SPACE_PROJECTILE_ROOT}/enemy_space_gold_hymn_ring.png`),
        enemy_bio_spore_puff: loadImage(`${GENERATED_SPACE_PROJECTILE_ROOT}/enemy_bio_spore_puff.png`),
        enemy_bio_spore_orb: loadImage(`${GENERATED_SPACE_PROJECTILE_ROOT}/enemy_bio_spore_orb.png`),
        enemy_bio_thorn_shard: loadImage(`${GENERATED_SPACE_PROJECTILE_ROOT}/enemy_bio_thorn_shard.png`),
      },
      impactSpark: loadImage(`${GENERATED_EFFECT_ROOT}/impact_spark.png`),
      shieldHitRing: loadImage(`${GENERATED_EFFECT_ROOT}/shield_hit_ring.png`),
      explosionFrames: [
        loadImage(`${GENERATED_EFFECT_ROOT}/explosion_00.png`),
        loadImage(`${GENERATED_EFFECT_ROOT}/explosion_01.png`),
        loadImage(`${GENERATED_EFFECT_ROOT}/explosion_02.png`),
        loadImage(`${GENERATED_EFFECT_ROOT}/explosion_03.png`),
        loadImage(`${GENERATED_EFFECT_ROOT}/explosion_smoke.png`),
      ],
      playerDeathCore: loadImage(`${GENERATED_EFFECT_ROOT}/player_death_core.png`),
    },
    bio_v1: {
      enemyBullet: loadImage(`${GENERATED_BIO_ROOT}/acid_glob.png`),
      enemyBulletWidth: 18,
      enemyBulletHeight: 38,
      enemyPurpleOrb: loadImage(`${GENERATED_BIO_ROOT}/spore_orb.png`),
      enemyPurpleOrbSize: 30,
      enemySpreadShard: loadImage(`${GENERATED_BIO_ROOT}/thorn_shard.png`),
      enemySpreadShardSize: 34,
      enemyRadialEmber: loadImage(`${GENERATED_BIO_ROOT}/bio_ember.png`),
      enemyRadialEmberSize: 26,
      impactSpark: loadImage(`${GENERATED_BIO_ROOT}/impact_splat.png`),
      explosionFrames: [
        loadImage(`${GENERATED_BIO_ROOT}/impact_splat.png`),
        loadImage(`${GENERATED_BIO_ROOT}/bio_explosion_00.png`),
        loadImage(`${GENERATED_BIO_ROOT}/bio_explosion_01.png`),
        loadImage(`${GENERATED_BIO_ROOT}/bio_explosion_02.png`),
      ],
    },
  },
};

const KENNEY_VISUAL_THEME_KEYS = new Set(["kenney", "kenney_v1", "starter", "starter_v1", "none"]);

const enemySpriteMap = {
  enemyBlue2: assets.enemies.scout,
  enemyBlue3: assets.enemies.blue3,
  enemyRed2: assets.enemies.red2,
  enemyRed3: assets.enemies.fighter,
  enemyBlack3: assets.enemies.black3,
  enemyBlack4: assets.enemies.bruiser,
  enemyGreen4: assets.enemies.hunter,
  ufoBlue: assets.enemies.transport,
  ufoRed: assets.enemies.boss,
  enemyBlue5: assets.enemies.aceBlue,
  enemyRed5: assets.enemies.aceRed,
  enemyGreen5: assets.enemies.aceGreen,
  enemyBlack5: assets.enemies.aceBlack,
  ufoGreen: assets.enemies.ufoGreen,
  ufoYellow: assets.enemies.ufoYellow,
};

function getLevelVisualTheme() {
  const key = mission?.level?.visualTheme;
  if (key && KENNEY_VISUAL_THEME_KEYS.has(String(key).toLowerCase())) return null;
  const defaultTheme = assets.visualThemes.generated_v1;
  if (!key) return defaultTheme;
  const theme = assets.visualThemes?.[key];
  return theme ? { ...defaultTheme, ...theme } : defaultTheme;
}

const availableLevels = [
  { id: "level1", label: "Mission 1" },
  { id: "level2", label: "Mission 2" },
  { id: "level3", label: "Mission 3" },
  { id: "level4", label: "Mission 4" },
  { id: "level5", label: "Mission 5" },
  { id: "level6", label: "Mission 6" },
  { id: "level7", label: "Mission 7" },
  { id: "level8", label: "Mission 8" },
  { id: "level9", label: "Mission 9" },
  { id: "level10", label: "Mission 10" },
  { id: "level11", label: "Mission 11" },
  { id: "act2_dead_air", label: "Act 2: Dead Air", branch: "chorus", requires: [{ completed: "level11" }] },
  {
    id: "act2_processional",
    label: "Act 2: Processional",
    branch: "chorus",
    contractTag: "Ledger-sanctioned",
    contractClass: "sanctioned",
    requires: [{ completed: "act2_dead_air" }],
  },
  { id: "act2_antiphon", label: "Act 2: Antiphon", branch: "chorus", requires: [{ completed: "act2_processional" }] },
  { id: "act2_doxology", label: "Act 2: Doxology", branch: "chorus", requires: [{ completed: "act2_antiphon" }] },
  {
    id: "act2_repossession",
    label: "Act 2: Repossession",
    branch: "tithe",
    contractTag: "Off-book",
    contractClass: "offbook",
    requires: [{ completed: "act2_dead_air" }],
  },
  { id: "act2_arrears", label: "Act 2: Arrears", branch: "tithe", requires: [{ completed: "act2_repossession" }] },
  { id: "act2_foreclosure", label: "Act 2: Foreclosure", branch: "tithe", requires: [{ completed: "act2_arrears" }] },
  { id: "act2_green_signal", label: "Act 2: The Green Signal", branch: "verdant", requires: [{ keyItem: "deep_registry_shard" }] },
  { id: "act2_bloom", label: "Act 2: Bloom", branch: "verdant", requires: [{ completed: "act2_green_signal" }] },
  { id: "act2_old_growth", label: "Act 2: Old Growth", branch: "verdant", requires: [{ completed: "act2_bloom" }] },
  { id: "act2_pilgrimage", label: "Act 2: Pilgrimage", branch: "origin", requires: [{ completed: "act2_old_growth" }] },
  { id: "overhaul_demo", label: "Overhaul Demo", test: true },
  { id: "patterns_demo", label: "Pattern Lab", test: true },
  { id: "ai_demo", label: "AI Lab", test: true },
  { id: "generated_sprite_lab", label: "Generated Sprite Lab", test: true },
  { id: "biological_hive_lab", label: "Biological Hive Lab", test: true },
];
const ACT2_FIRST_LEVEL_ID = "act2_dead_air";
const ACT2_BRANCH_LABELS = {
  chorus: "Sanctioned",
  tithe: "Off-book",
  verdant: "Verdant",
  origin: "Origin",
};
const KEY_ITEM_REGISTRY = {
  deep_registry_shard: {
    name: "Deep Registry Shard",
    decodedLabel: "Deep Registry Shard - decoded",
    archive: "Decoded from either branch finale; opens the Verdant route.",
  },
};

const LEVEL_MANIFEST_PATH = "levels/manifest.json";
const DEFAULT_LEVEL_VARIANT_MANIFEST = {
  level1: ["level1_swarm", "level1_armored"],
  level2: ["level2_swarm", "level2_armored"],
  level3: ["level3_swarm", "level3_armored"],
  level4: ["level4_swarm", "level4_armored"],
  level5: ["level5_swarm", "level5_armored"],
  level6: ["level6_swarm", "level6_armored"],
  level7: ["level7_swarm", "level7_armored"],
  level8: ["level8_swarm", "level8_armored"],
  level9: ["level9_swarm", "level9_armored"],
  level10: ["level10_swarm", "level10_armored"],
  level11: ["level11_swarm", "level11_armored"],
};
let levelVariantManifest = { ...DEFAULT_LEVEL_VARIANT_MANIFEST };
let levelVariantToBase = buildLevelVariantToBase(levelVariantManifest);
let levelManifestPromise = null;

const levelFallback = {
  id: "level1",
  name: "First Contact",
  background: "blue",
  completeOnBoss: true,
  enemyTypes: {
    scout: {
      sprite: "enemyBlue2",
      hp: 18,
      speed: 85,
      score: 90,
      baseCredit: 12,
      radius: 16,
      pattern: "zigzag",
      patternParams: { amplitude: 90, frequency: 3.2 },
    },
    fighter: {
      sprite: "enemyRed3",
      hp: 26,
      speed: 70,
      score: 130,
      baseCredit: 16,
      radius: 20,
      pattern: "swoop",
      patternParams: { amplitude: 60, frequency: 2.6 },
    },
    hunter: {
      sprite: "enemyGreen4",
      hp: 30,
      speed: 80,
      score: 180,
      baseCredit: 28,
      radius: 20,
      ai: "hunter",
    },
    transport: {
      sprite: "ufoBlue",
      hp: 90,
      speed: 36,
      score: 360,
      baseCredit: 60,
      radius: 28,
      ai: "transport",
    },
    boss: {
      sprite: "ufoRed",
      hp: 380,
      speed: 70,
      score: 900,
      baseCredit: 180,
      radius: 42,
      pattern: "bossSweep",
      isBoss: true,
    },
  },
  events: [
    { time: 1, type: "scout", count: 6, interval: 0.45 },
    { time: 6, type: "fighter", count: 4, interval: 0.8 },
    { time: 12, type: "scout", count: 8, interval: 0.35 },
    { time: 18, type: "hunter", count: 2, interval: 1.2 },
    { time: 24, type: "transport", count: 1 },
    { time: 32, type: "fighter", count: 6, interval: 0.6 },
    { time: 42, type: "boss", count: 1 },
  ],
};

let currentLevel = null;
let levelLoadPromise = null;
let selectedLevelId = devSkipOnboarding && devRequestedLevelId ? devRequestedLevelId : "level1";
let lastLoadedLevelId = null;
let activeHangarTab = devSkipOnboarding ? "mission" : "hub";
let activeLedgerMode = "market";
let activeCompendiumMode = "drones";
let hangarNeedsRefresh = false;
let openShipNodeId = null;
let armoryHullPickerOpen = false;
let openMissionInfoBaseId = null;
let missionIntroActive = false;
let rtbConfirmActive = false;
let rtbRestorePaused = false;
let debriefLaunchMode = null;
let hangarStatusMessage = "";
const cameraShake = {
  trauma: 0,
  kickX: 0,
  kickY: 0,
};
let screenFlash = 0;
const levelMetaCache = new Map();

const sfx = {
  laserSmall: new Audio("assets/audio/sci-fi_sounds/Audio/laserSmall_000.ogg"),
  laserLarge: new Audio("assets/audio/sci-fi_sounds/Audio/laserLarge_000.ogg"),
  explosion: new Audio("assets/audio/sci-fi_sounds/Audio/lowFrequency_explosion_000.ogg"),
  hit: new Audio("assets/audio/sci-fi_sounds/Audio/impactMetal_002.ogg"),
  hullHit: new Audio("assets/audio/sci-fi_sounds/Audio/impactMetal_004.ogg"),
  cloak: new Audio("assets/audio/sci-fi_sounds/Audio/forceField_002.ogg"),
  emp: new Audio("assets/audio/sci-fi_sounds/Audio/forceField_004.ogg"),
  boost: new Audio("assets/audio/sci-fi_sounds/Audio/forceField_000.ogg"),
  eject: new Audio("assets/audio/sci-fi_sounds/Audio/thrusterFire_000.ogg"),
};

Object.values(sfx).forEach((audio) => {
  audio.preload = "auto";
  audio.volume = 0.4;
});

function getMusicVolume() {
  const value = state?.audio?.musicVolume;
  return Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 1;
}

function getSfxVolume() {
  const value = state?.audio?.sfxVolume;
  return Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 1;
}

function applyMusicVolume() {
  if (activeMusic) activeMusic.volume = MUSIC_BASE_VOLUME * getMusicVolume();
}

function getMusicTrack(src) {
  if (!src) return null;
  if (musicLibrary.has(src)) {
    const cached = musicLibrary.get(src);
    cached.volume = MUSIC_BASE_VOLUME * getMusicVolume();
    return cached;
  }
  const audio = new Audio(src);
  audio.preload = "auto";
  audio.loop = true;
  audio.volume = MUSIC_BASE_VOLUME * getMusicVolume();
  musicLibrary.set(src, audio);
  return audio;
}

function stopMusic() {
  if (!activeMusic) return;
  activeMusic.pause();
  activeMusic.currentTime = 0;
  activeMusic = null;
  activeMusicSrc = null;
}

function updateMusicPlayback() {
  if (!audioEnabled) return;
  if (!desiredMusicSrc) {
    stopMusic();
    return;
  }
  if (activeMusicSrc === desiredMusicSrc && activeMusic) {
    if (activeMusic.paused) {
      activeMusic.play().catch(() => {});
    }
    return;
  }
  stopMusic();
  activeMusicSrc = desiredMusicSrc;
  activeMusic = getMusicTrack(desiredMusicSrc);
  if (activeMusic) {
    activeMusic.currentTime = 0;
    activeMusic.play().catch(() => {});
  }
}

function setDesiredMusic(level) {
  if (!level?.music) {
    desiredMusicSrc = null;
    updateMusicPlayback();
    return;
  }
  desiredMusicSrc = level.music.startsWith("assets/")
    ? level.music
    : `assets/music/${level.music}`;
  updateMusicPlayback();
}

function setHangarMusic() {
  desiredMusicSrc = HANGAR_MUSIC;
  updateMusicPlayback();
}

function enableAudio() {
  if (!audioEnabled) {
    audioEnabled = true;
    updateMusicPlayback();
  }
}

function addCameraShake(strength, sourceX = null, sourceY = null) {
  const amount = Math.max(0, strength || 0);
  if (amount <= 0) return;
  cameraShake.trauma = Math.min(1, cameraShake.trauma + amount);

  // Optional "push" away from the impact source for extra punch.
  if (
    Number.isFinite(sourceX) &&
    Number.isFinite(sourceY) &&
    Number.isFinite(player?.x) &&
    Number.isFinite(player?.y)
  ) {
    const dx = player.x - sourceX;
    const dy = player.y - sourceY;
    const dist = Math.hypot(dx, dy) || 1;
    const ux = dx / dist;
    const uy = dy / dist;
    cameraShake.kickX += ux * amount * 14;
    cameraShake.kickY += uy * amount * 14;
    const maxKick = 18;
    cameraShake.kickX = Math.max(-maxKick, Math.min(maxKick, cameraShake.kickX));
    cameraShake.kickY = Math.max(-maxKick, Math.min(maxKick, cameraShake.kickY));
  }
}

function loadImage(src) {
  const img = new Image();
  const record = { img, loaded: false };
  img.onload = () => {
    record.loaded = true;
  };
  img.onerror = () => {
    record.loaded = false;
  };
  img.src = src;
  return record;
}

// Support custom sprites referenced by URL/path in level JSON (e.g. generated boss art).
const dynamicImageCache = new Map();
function loadImageCached(src) {
  if (!src) return null;
  if (dynamicImageCache.has(src)) return dynamicImageCache.get(src);
  const record = loadImage(src);
  dynamicImageCache.set(src, record);
  return record;
}

async function loadLevel(levelName) {
  try {
    await ensureEnemyCatalogLoaded();
    const response = await fetch(`levels/${levelName}.json`, { cache: "no-store" });
    if (!response.ok) throw new Error("level load failed");
    const data = await response.json();
    data.id = data.id || levelName;
    data.validationErrors = validateLevelData(data);
    return data;
  } catch (error) {
    console.warn(`Level '${levelName}' failed to load.`, error);
    return {
      id: levelName,
      name: levelName,
      enemyTypes: {},
      events: [],
      validationErrors: ["Mission package could not be loaded."],
    };
  }
}

// Strict fetch for discovery: returns null if the level file doesn't exist.
async function loadLevelStrict(levelName) {
  try {
    await ensureEnemyCatalogLoaded();
    const response = await fetch(`levels/${levelName}.json`, { cache: "no-store" });
    if (!response.ok) return null;
    const data = await response.json();
    data.id = data.id || levelName;
    data.validationErrors = validateLevelData(data);
    return data;
  } catch (error) {
    return null;
  }
}

async function loadLevelMeta(levelName) {
  if (levelMetaCache.has(levelName)) return levelMetaCache.get(levelName);
  const data = await loadLevel(levelName);
  levelMetaCache.set(levelName, data);
  return data;
}

// Cache strict loads separately (including missing=null) so we don't spam fetches.
const levelMetaStrictCache = new Map();
async function loadLevelMetaStrict(levelName) {
  if (levelMetaStrictCache.has(levelName)) return levelMetaStrictCache.get(levelName);
  const data = await loadLevelStrict(levelName);
  levelMetaStrictCache.set(levelName, data);
  return data;
}

const WEAPON_FRAME_CATALOG_PATH = "items/weapon_frames.json";
let weaponFrameCatalogPromise = null;

async function loadWeaponFrameCatalog() {
  try {
    const response = await fetch(WEAPON_FRAME_CATALOG_PATH, { cache: "no-store" });
    if (!response.ok) throw new Error("weapon frame catalog load failed");
    const data = await response.json();
    applyWeaponFrameCatalog(data);
    return starterWeaponLoadouts;
  } catch (error) {
    console.warn("Weapon frame catalog load failed; using embedded defaults.", error);
    buildWeaponFrameIndex(defaultStarterWeaponLoadouts);
    return starterWeaponLoadouts;
  }
}

async function ensureWeaponFrameCatalogLoaded() {
  if (!weaponFrameCatalogPromise) weaponFrameCatalogPromise = loadWeaponFrameCatalog();
  return weaponFrameCatalogPromise;
}

const ENEMY_CATALOG_PATH = "enemies/enemy_catalog.json";
let enemyCatalog = null;
let enemyCatalogPromise = null;

async function loadEnemyCatalog() {
  try {
    const response = await fetch(ENEMY_CATALOG_PATH, { cache: "no-store" });
    if (!response.ok) throw new Error("enemy catalog load failed");
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn("Enemy catalog load failed; using minimal fallback.");
    return { version: 1, entries: {} };
  }
}

async function ensureEnemyCatalogLoaded() {
  if (enemyCatalog) return enemyCatalog;
  if (!enemyCatalogPromise) enemyCatalogPromise = loadEnemyCatalog();
  enemyCatalog = await enemyCatalogPromise;
  return enemyCatalog;
}

function getEnemyCatalogEntry(id) {
  return enemyCatalog?.entries?.[id] || null;
}

function setHangarStatusMessage(message = "") {
  hangarStatusMessage = message || "";
}

function getLevelEnemyConfig(level, typeId) {
  const enemyTypes = level?.enemyTypes;
  if (!enemyTypes || typeof enemyTypes !== "object" || Array.isArray(enemyTypes)) return null;
  const config = enemyTypes[typeId];
  if (!config || typeof config !== "object" || Array.isArray(config)) return null;
  return config;
}

function getLevelEnemyTemplateKey(level, typeId, config = null) {
  const localConfig = config || getLevelEnemyConfig(level, typeId);
  if (!localConfig) return null;
  if (typeId === "boss") {
    return typeof localConfig.template === "string" ? localConfig.template : null;
  }
  return getEnemyCatalogEntry(typeId)?.template ? typeId : null;
}

function mergeLevelEnemySpec(level, typeId, overrides = {}) {
  const localConfig = getLevelEnemyConfig(level, typeId);
  if (!localConfig) return null;
  const templateKey = getLevelEnemyTemplateKey(level, typeId, localConfig);
  if (!templateKey) return null;
  const catalogEntry = getEnemyCatalogEntry(templateKey);
  const template = catalogEntry?.template;
  if (!template) return null;
  const merged = {
    type: typeId,
    name: catalogEntry?.name,
    miniboss: !!catalogEntry?.miniboss,
    ...template,
    ...localConfig,
    ...overrides,
  };
  delete merged.template;
  return merged;
}

function validateProjectileProfile(id, profile, errors, context = `Projectile profile '${id}'`) {
  if (!profile || typeof profile !== "object" || Array.isArray(profile)) {
    errors.push(`${context} must be an object.`);
    return;
  }
  Object.keys(profile).forEach((key) => {
    if (!PROJECTILE_PROFILE_KEYS.has(key)) {
      errors.push(`${context} uses unsupported field '${key}'.`);
    }
  });
  if (profile.threatClass && !PROJECTILE_THREAT_CLASSES.has(profile.threatClass)) {
    errors.push(`${context} has invalid threatClass '${profile.threatClass}'.`);
  }
  ["damage", "speed", "radius", "width", "height", "spinRate"].forEach((key) => {
    if (profile[key] !== undefined && !Number.isFinite(profile[key])) {
      errors.push(`${context} field '${key}' must be numeric.`);
    }
  });
}

function validateProjectileProfileRef(ref, profiles, errors, context) {
  if (ref === undefined) return;
  if (typeof ref === "string") {
    if (!profiles[ref]) errors.push(`${context} references unknown projectile profile '${ref}'.`);
    return;
  }
  if (ref && typeof ref === "object" && !Array.isArray(ref)) {
    validateProjectileProfile("inline", ref, errors, context);
    if (typeof ref.profile === "string") validateProjectileProfileRef(ref.profile, profiles, errors, context);
    return;
  }
  errors.push(`${context} must reference a named projectile profile or inline profile object.`);
}

function validateAttackPattern(pattern, index, profiles, errors, context) {
  const label = `${context} attackPatterns[${index}]`;
  if (!pattern || typeof pattern !== "object" || Array.isArray(pattern)) {
    errors.push(`${label} must be an object.`);
    return;
  }
  Object.keys(pattern).forEach((key) => {
    if (!PROJECTILE_ATTACK_PATTERN_KEYS.has(key)) {
      errors.push(`${label} uses unsupported field '${key}'.`);
    }
  });
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
        if (!shot || typeof shot !== "object" || Array.isArray(shot)) {
          errors.push(`${shotLabel} must be a profile id or object.`);
          return;
        }
        Object.keys(shot).forEach((key) => {
          if (!PROJECTILE_SHOT_KEYS.has(key)) {
            errors.push(`${shotLabel} uses unsupported field '${key}'.`);
          }
        });
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
    Object.keys(phase).forEach((key) => {
      if (!BOSS_PHASE_KEYS.has(key)) errors.push(`${label} uses unsupported field '${key}'.`);
    });
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

function validateLevelData(level) {
  const errors = [];
  if (!level || typeof level !== "object") {
    return ["Mission package is not a valid object."];
  }
  const levelId = level.id || "unknown";
  const projectileProfiles = isPlainObject(level.projectileProfiles) ? level.projectileProfiles : {};
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
  Object.entries(enemyTypes).forEach(([typeId, config]) => {
    if (!config || typeof config !== "object" || Array.isArray(config)) {
      errors.push(`Enemy '${typeId}' must be an object of overrides.`);
      return;
    }
    Object.keys(config).forEach((key) => {
      if (!LEVEL_ENEMY_OVERRIDE_KEYS.has(key)) {
        errors.push(`Enemy '${typeId}' uses unsupported field '${key}'.`);
      }
    });
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
        return;
      }
      if (!getEnemyCatalogEntry(config.template)?.template) {
        errors.push(`Boss template '${config.template}' is missing from enemy catalog.`);
      }
      return;
    }
    if ("template" in config) {
      errors.push(`Enemy '${typeId}' should not declare a template; use the catalog id as the key.`);
    }
    if (!getEnemyCatalogEntry(typeId)?.template) {
      errors.push(`Enemy '${typeId}' is not defined in enemy catalog.`);
    }
  });
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
  return errors;
}

function buildMissionCanceledMessage(level) {
  const missionName = level?.name || "the sortie";
  return `Flight Control has scrubbed ${missionName}. The mission packet came back corrupted, so command recalled all pilots to the mothership until operations can rebuild the route.`;
}

function cancelMissionLaunch(level, errors = []) {
  if (errors.length) {
    console.warn(`Mission '${level?.id || "unknown"}' canceled due to validation errors:`, errors);
  }
  mission = null;
  activeShipBuildOverride = null;
  debriefLaunchMode = null;
  hideMissionIntro();
  closeShipModal();
  paused = false;
  overlay.hidden = false;
  hangarPanel.hidden = false;
  debriefPanel.hidden = true;
  setHangarStatusMessage(buildMissionCanceledMessage(level));
  setHangarTab("mission", { renderLevels: true });
  updateMobileControls();
  setHangarMusic();
  safeUpdateHangar();
}

async function ensureLevelLoaded() {
  if (currentLevel && lastLoadedLevelId === selectedLevelId) return currentLevel;
  levelLoadPromise = loadLevel(selectedLevelId);
  const level = await levelLoadPromise;
  currentLevel = level;
  lastLoadedLevelId = selectedLevelId;
  return currentLevel;
}

function drawSpriteCentered(record, x, y, scale = 1) {
  if (!record || !record.loaded) return false;
  const width = record.img.naturalWidth * scale;
  const height = record.img.naturalHeight * scale;
  ctx.drawImage(record.img, x - width / 2, y - height / 2, width, height);
  return true;
}

function drawSprite(record, x, y, width, height, rotation = 0) {
  if (!record || !record.loaded) return false;
  ctx.save();
  ctx.translate(x + width / 2, y + height / 2);
  ctx.rotate(rotation);
  ctx.drawImage(record.img, -width / 2, -height / 2, width, height);
  ctx.restore();
  return true;
}

function resizeCanvas() {
  const { innerWidth, innerHeight } = window;
  canvas.width = innerWidth * window.devicePixelRatio;
  canvas.height = innerHeight * window.devicePixelRatio;
  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  ctx.imageSmoothingEnabled = true;
  if ("imageSmoothingQuality" in ctx) {
    ctx.imageSmoothingQuality = "high";
  }
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

canvas.style.touchAction = "none";
canvas.addEventListener("contextmenu", (event) => event.preventDefault());

window.addEventListener("keydown", (event) => {
  enableAudio();
  keyState.add(event.key.toLowerCase());
  if (event.key === "Escape" && (!mission || !mission.active) && overlay && !overlay.hidden) {
    if (armoryHullPickerOpen) {
      armoryHullPickerOpen = false;
      if (activeHangarTab === "loadout") safeUpdateHangar();
      return;
    }
    if (debriefPanel && !debriefPanel.hidden) {
      if (returnBtn) returnBtn.click();
      return;
    }
    if (hangarPanel && !hangarPanel.hidden && activeHangarTab !== "hub") {
      setHangarTab("hub");
      return;
    }
  }
  if (event.key.toLowerCase() === "p" && mission && mission.active && !missionIntroActive && !rtbConfirmActive) {
    paused = !paused;
  }
  if (event.key.toLowerCase() === "e" && mission && mission.active) {
    showRtbConfirm();
  }
  if (event.key.toLowerCase() === "q" && mission && mission.active) {
    swapPrimaryBay();
  }
  if (event.key.toLowerCase() === "1") {
    useConsumable(0);
  }
  if (event.key.toLowerCase() === "2") {
    useConsumable(1);
  }
});

window.addEventListener("keyup", (event) => {
  keyState.delete(event.key.toLowerCase());
});

function updatePointerFromEvent(event) {
  const rect = canvas.getBoundingClientRect();
  pointer.x = event.clientX - rect.left;
  pointer.y = event.clientY - rect.top;
  pointer.active = true;
  if (event.pointerType === "touch") {
    inputMode = "touch";
    touchState.x = pointer.x;
    touchState.y = pointer.y;
  } else if (event.pointerType === "mouse") {
    inputMode = "mouse";
  }
}

canvas.addEventListener("pointermove", updatePointerFromEvent);
canvas.addEventListener("pointerdown", (event) => {
  updatePointerFromEvent(event);
  enableAudio();
  if (event.pointerType === "touch") {
    inputMode = "touch";
    touchState.active = true;
    touchState.x = pointer.x;
    touchState.y = pointer.y;
    return;
  }
  inputMode = "mouse";
  if (event.button === 0) pointerButtons.left = true;
  if (event.button === 2) pointerButtons.right = true;
});
canvas.addEventListener("pointerup", (event) => {
  if (event.pointerType === "touch") {
    touchState.active = false;
    return;
  }
  if (event.button === 0) pointerButtons.left = false;
  if (event.button === 2) pointerButtons.right = false;
});
canvas.addEventListener("pointerleave", () => {
  pointer.active = false;
  touchState.active = false;
  pointerButtons.left = false;
  pointerButtons.right = false;
});

function bindMobileButton(button, onPress, onRelease) {
  if (!button) return;
  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    enableAudio();
    inputMode = "touch";
    onPress();
  });
  button.addEventListener("pointerup", (event) => {
    event.preventDefault();
    onRelease();
  });
  button.addEventListener("pointerleave", (event) => {
    event.preventDefault();
    onRelease();
  });
}

bindMobileButton(
  mobileAltBtn,
  () => {
    pointerButtons.right = true;
  },
  () => {
    pointerButtons.right = false;
  }
);

bindMobileButton(mobileSwapBtn, () => {
  swapPrimaryBay();
}, () => {});

bindMobileButton(mobileEjectBtn, () => {
  if (mission && mission.active) {
    showRtbConfirm();
  }
}, () => {});

bindMobileButton(mobileItem1, () => {
  useConsumable(0);
}, () => {});

bindMobileButton(mobileItem2, () => {
  useConsumable(1);
}, () => {});

bindMobileButton(mobileLaunchBtn, () => {
  if (!mission || !mission.active) {
    launchSelectedMission();
  }
}, () => {});

updateMobileControls();
bindSharedUiFeedback();

function getTabAvailability() {
  return {
    hub: true,
    mission: true,
    loadout: isSystemUnlocked("loadout"),
    economy: isSystemUnlocked("economy"),
    compendium: isSystemUnlocked("compendium"),
  };
}

function getTabLockReason(tabId) {
  if (tabId === "loadout") return "Complete training directives to unlock ship loadouts.";
  if (tabId === "economy") return "Complete one live mission after training to unlock Economy.";
  if (tabId === "compendium") return "Compendium unlocks after initial training flights.";
  return "";
}

function refreshHangarTabLocks() {
  const availability = getTabAvailability();
  hangarTabButtons.forEach((button) => {
    const tab = button.dataset.tab;
    const unlocked = availability[tab] ?? true;
    button.disabled = !unlocked;
    button.classList.toggle("locked", !unlocked);
    button.title = unlocked ? "" : getTabLockReason(tab);
  });
  hangarSceneButtons.forEach((button) => {
    const scene = button.dataset.sceneTarget;
    if (!scene || scene === "hub") return;
    const unlocked = availability[scene] ?? true;
    button.disabled = !unlocked;
    button.classList.toggle("locked", !unlocked);
    button.title = unlocked ? "" : getTabLockReason(scene);
  });
}

function setHangarTab(tabId, { renderLevels = true } = {}) {
  const availability = getTabAvailability();
  if (!(availability[tabId] ?? true)) {
    tabId = "hub";
  }
  if (tabId !== "loadout") {
    armoryHullPickerOpen = false;
  }
  activeHangarTab = tabId;
  if (hangarPanel) hangarPanel.dataset.activeScene = tabId;
  refreshHangarTabLocks();
  hangarTabButtons.forEach((button) => {
    const isActive = button.dataset.tab === tabId;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", isActive ? "true" : "false");
  });
  hangarSceneButtons.forEach((button) => {
    const isActive = button.dataset.sceneTarget === tabId;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-current", isActive ? "true" : "false");
  });
  hangarTabPanels.forEach((panel) => {
    panel.hidden = panel.dataset.tabPanel !== tabId;
  });
  if (renderLevels && tabId === "mission") {
    renderLevelSelect();
  }
  if (renderLevels && tabId === "compendium") {
    renderArchiveCompendium();
  }
  updateMobileControls();
}

hangarTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setHangarTab(button.dataset.tab);
  });
});

hangarSceneButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.disabled) return;
    setHangarTab(button.dataset.sceneTarget);
  });
});

function setLedgerMode(mode) {
  activeLedgerMode = ["market", "investments", "claims"].includes(mode) ? mode : "market";
  ledgerModeButtons.forEach((button) => {
    const active = button.dataset.ledgerMode === activeLedgerMode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
  ledgerModePanels.forEach((panel) => {
    panel.hidden = panel.dataset.ledgerPanel !== activeLedgerMode;
    panel.classList.toggle("active", panel.dataset.ledgerPanel === activeLedgerMode);
  });
}

ledgerModeButtons.forEach((button) => {
  button.addEventListener("click", () => setLedgerMode(button.dataset.ledgerMode));
});

setHangarTab(activeHangarTab, { renderLevels: false });
setLedgerMode(activeLedgerMode);

if (compendiumSearch) {
  compendiumSearch.addEventListener("input", () => {
    if (activeHangarTab === "compendium") renderArchiveCompendium();
  });
}
if (compendiumShowBosses) {
  compendiumShowBosses.addEventListener("change", () => {
    if (activeHangarTab === "compendium") renderArchiveCompendium();
  });
}
[archiveSort, archiveFilter].forEach((control) => {
  control?.addEventListener("change", () => {
    if (activeHangarTab === "compendium") renderArchiveCompendium();
  });
});
compendiumModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCompendiumMode = button.dataset.compendiumMode === "items" ? "items" : "drones";
    if (activeHangarTab === "compendium") renderArchiveCompendium();
  });
});

[armoryBrowserSearch, armoryBrowserSort, armoryBrowserFilter].forEach((control) => {
  control?.addEventListener(control.tagName === "INPUT" ? "input" : "change", () => {
    if (activeHangarTab === "loadout") renderShipUpgradesPanel();
  });
});

armoryToggleStats?.addEventListener("click", () => {
  openArmoryStatsModal().catch((error) => {
    console.error("Failed to open Armory stats:", error);
  });
});

[ledgerInventorySearch, ledgerInventorySort, ledgerInventoryFilter].forEach((control) => {
  control?.addEventListener(control.tagName === "INPUT" ? "input" : "change", () => {
    if (activeHangarTab === "economy") renderLedgerMarket();
  });
});

async function launchSelectedMission({ showIntro = false } = {}) {
  if (!isLevelUnlocked(selectedLevelId)) return;
  const directive = getCurrentOnboardingMission();
  if (directive && selectedLevelId !== directive.missionId) {
    selectedLevelId = directive.missionId;
    currentLevel = null;
    if (!hangarPanel.hidden && activeHangarTab === "mission") {
      renderLevelSelect();
    }
  }
  return startMission({ showIntro });
}

if (launchBtn) {
  launchBtn.addEventListener("click", async () => {
    await launchSelectedMission();
  });
}

if (selectMissionBtn) {
  selectMissionBtn.addEventListener("click", () => {
    setHangarTab("mission");
  });
}

if (returnBtn) {
  returnBtn.addEventListener("click", async () => {
    if (debriefLaunchMode) {
      const launchMode = debriefLaunchMode;
      debriefLaunchMode = null;
      returnBtn.textContent = "Return to Hangar";
      debriefPanel.hidden = true;
      hangarPanel.hidden = true;
      overlay.hidden = true;
      updateMobileControls();
      try {
        await launchSelectedMission({ showIntro: launchMode === "training" });
      } catch (error) {
        console.error("Failed to continue from debrief:", error);
        overlay.hidden = false;
        hangarPanel.hidden = false;
        debriefPanel.hidden = true;
        safeUpdateHangar();
      }
      return;
    }
    debriefPanel.hidden = true;
    hangarPanel.hidden = false;
    overlay.hidden = false;
    setHangarTab("hub");
    updateMobileControls();
    if (hangarNeedsRefresh) {
      hangarNeedsRefresh = false;
      safeUpdateHangar();
    }
  });
}

if (debriefSalvage) {
  debriefSalvage.addEventListener("click", (event) => {
    const sellButton = event.target.closest("[data-debrief-sell]");
    const keepButton = event.target.closest("[data-debrief-keep]");
    if (sellButton) {
      const itemId = sellButton.dataset.debriefSell;
      if (!findInventoryItem(itemId)) {
        sellButton.textContent = "Sold";
        sellButton.disabled = true;
        return;
      }
      sellInventoryItem(itemId);
      sellButton.textContent = "Sold";
      sellButton.disabled = true;
      const itemPanel = sellButton.closest(".salvage-item");
      itemPanel?.classList.add("is-sold");
      itemPanel?.querySelectorAll("[data-debrief-keep]").forEach((button) => {
        button.textContent = "Ledgered";
        button.disabled = true;
      });
      return;
    }
    if (keepButton) {
      keepButton.textContent = "Kept";
      keepButton.disabled = true;
    }
  });
}

if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    if (!confirm("Reset all pilot progress?")) return;
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  });
}

function closeShipModal() {
  openShipNodeId = null;
  shipModalCard?.classList.remove("ship-stats-card");
  if (shipModal) shipModal.hidden = true;
}

function hideMissionIntro() {
  missionIntroActive = false;
  if (missionIntroModal) missionIntroModal.hidden = true;
}

function showMissionIntro() {
  if (!missionIntroModal) return;
  const directive = getCurrentOnboardingMission();
  if (directive) {
    if (missionIntroTitle) missionIntroTitle.textContent = directive.title;
    if (missionIntroText) missionIntroText.textContent = directive.briefing;
  } else {
    if (missionIntroTitle) missionIntroTitle.textContent = mission?.level?.name || "Mission";
    if (missionIntroText) {
      missionIntroText.textContent =
        "Now's your chance! Prove your skills as a drone pilot and take down the massive boss ship!";
    }
  }
  missionIntroActive = true;
  paused = true;
  missionIntroModal.hidden = false;
}

function resumeMissionFromIntro() {
  hideMissionIntro();
  if (mission && mission.active) {
    paused = false;
  }
}

function hideRtbConfirm({ restorePause = false } = {}) {
  if (rtbConfirmModal) rtbConfirmModal.hidden = true;
  const previousPaused = rtbRestorePaused;
  rtbConfirmActive = false;
  rtbRestorePaused = false;
  if (restorePause && mission && mission.active) {
    paused = previousPaused;
  }
}

function showRtbConfirm() {
  if (!mission || !mission.active || rtbConfirmActive) return;
  hideMissionIntro();
  rtbRestorePaused = paused;
  rtbConfirmActive = true;
  paused = true;
  if (rtbConfirmModal) rtbConfirmModal.hidden = false;
  updateMobileControls();
}

function confirmRtb() {
  if (!mission || !mission.active) {
    hideRtbConfirm();
    return;
  }
  hideRtbConfirm();
  endMission({ ejected: true });
}

if (shipModalClose) {
  shipModalClose.addEventListener("click", () => {
    closeShipModal();
  });
}

if (missionIntroConfirm) {
  missionIntroConfirm.addEventListener("click", () => {
    enableAudio();
    resumeMissionFromIntro();
  });
}

if (rtbConfirmButton) {
  rtbConfirmButton.addEventListener("click", () => {
    enableAudio();
    confirmRtb();
  });
}

if (rtbCancelButton) {
  rtbCancelButton.addEventListener("click", () => {
    enableAudio();
    hideRtbConfirm({ restorePause: true });
  });
}

if (shipModal) {
  shipModal.addEventListener("click", (event) => {
    if (event.target === shipModal) closeShipModal();
  });
}

if (rtbConfirmModal) {
  rtbConfirmModal.addEventListener("click", (event) => {
    if (event.target === rtbConfirmModal) hideRtbConfirm({ restorePause: true });
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && rtbConfirmActive) {
    hideRtbConfirm({ restorePause: true });
    return;
  }
  if (event.key === "Escape" && armoryHullPickerOpen) {
    armoryHullPickerOpen = false;
    if (activeHangarTab === "loadout") safeUpdateHangar();
    return;
  }
  if (event.key === "Escape" && shipModal && !shipModal.hidden) {
    closeShipModal();
  }
});

if (shipNodeButtons && shipNodeButtons.length) {
  shipNodeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nodeId = button.dataset.shipNode;
      if (!nodeId) return;
      openShipNodeId = nodeId;
      if (shipModal) shipModal.hidden = false;
      safeUpdateHangar();
    });
  });
}

if (hudItem1) {
  hudItem1.addEventListener("click", () => {
    useConsumable(0);
  });
}

if (hudItem2) {
  hudItem2.addEventListener("click", () => {
    useConsumable(1);
  });
}



document.addEventListener("click", (event) => {
  if (!event.target.closest(".upgrade-node")) {
    if (openUpgradeId !== null) {
      openUpgradeId = null;
      safeUpdateHangar();
    }
  }
  if (armoryHullPickerOpen && !event.target.closest(".armory-hull-picker")) {
    armoryHullPickerOpen = false;
    if (activeHangarTab === "loadout") safeUpdateHangar();
  }
});

if (debugUnlock) {
  debugUnlock.addEventListener("change", () => {
    state.debugUnlock = debugUnlock.checked;
    saveState();
    safeUpdateHangar();
    renderLevelSelect();
  });
}

if (debugInvincible) {
  debugInvincible.addEventListener("change", () => {
    state.debugInvincible = debugInvincible.checked;
    saveState();
  });
}

if (debugShowCompendium) {
  debugShowCompendium.addEventListener("change", () => {
    state.debugShowFullCompendium = debugShowCompendium.checked;
    saveState();
    if (activeHangarTab === "compendium") renderArchiveCompendium();
  });
}

if (debugShowItems) {
  debugShowItems.addEventListener("change", () => {
    state.debugShowAllItems = debugShowItems.checked;
    saveState();
    if (activeHangarTab === "compendium") renderArchiveCompendium();
  });
}

if (debugShowMath) {
  debugShowMath.addEventListener("change", () => {
    state.devShowMath = debugShowMath.checked;
    saveState();
    hideItemTooltip();
    safeUpdateHangar();
  });
}

function setAudioVolume(kind, sliderValue) {
  const fraction = Math.max(0, Math.min(1, (Number(sliderValue) || 0) / 100));
  state.audio = state.audio || { musicVolume: 1, sfxVolume: 1 };
  state.audio[kind] = fraction;
  if (kind === "musicVolume") applyMusicVolume();
  syncAudioControls();
  saveState();
}

function syncAudioControls() {
  const music = Math.round(getMusicVolume() * 100);
  const sfx = Math.round(getSfxVolume() * 100);
  if (musicVolumeSlider && document.activeElement !== musicVolumeSlider) musicVolumeSlider.value = String(music);
  if (sfxVolumeSlider && document.activeElement !== sfxVolumeSlider) sfxVolumeSlider.value = String(sfx);
  if (musicVolumeOut) musicVolumeOut.textContent = `${music}%`;
  if (sfxVolumeOut) sfxVolumeOut.textContent = `${sfx}%`;
}

if (musicVolumeSlider) {
  musicVolumeSlider.addEventListener("input", () => setAudioVolume("musicVolume", musicVolumeSlider.value));
}

if (sfxVolumeSlider) {
  sfxVolumeSlider.addEventListener("input", () => setAudioVolume("sfxVolume", sfxVolumeSlider.value));
}

if (debugSkipOnboarding) {
  debugSkipOnboarding.addEventListener("change", () => {
    state.debugSkipOnboarding = debugSkipOnboarding.checked;
    if (state.debugSkipOnboarding) {
      state.onboardingStage = Math.max(state.onboardingStage, ONBOARDING_STAGE_COMPLETE);
    }
    refreshSystemUnlocks();
    syncStarterArmoryState();
    saveState();
    safeUpdateHangar();
    renderLevelSelect();
  });
}

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    shouldAutoLaunchFreshPilotMission = false;
    return {
      credits: 0,
      lifetimeCredits: 0,
      missionCount: 0,
      lastMissionSummary: "N/A",
      unlockedLevels: 1,
      completedMissions: {},
      keyItems: [],
      branchStanding: createDefaultBranchStanding(),
      onboardingStage: ONBOARDING_STAGE_COMPLETE,
      debugSkipOnboarding: false,
      systemUnlocks: { ...DEFAULT_SYSTEM_UNLOCKS },
      debugUnlock: false,
      debugInvincible: false,
      debugShowFullCompendium: false,
      debugShowAllItems: false,
      devShowMath: false,
      encounteredEnemies: {},
      killsByEnemyKey: {},
      relicCollection: {},
      itemCollection: {},
      cargo: [],
      armory: {
        ownedLoadoutIds: ["fundamentals", "area_control", "armor_break"],
        equippedLoadoutId: "fundamentals",
        equippedPrimaryItemId: null,
        equippedSecondLoadoutId: null,
        equippedSecondPrimaryItemId: null,
        ownedDefenseModuleIds: ["shield_module", "armor_module"],
        equippedDefenseSlotIds: ["shield_module", "none"],
        equippedSupportItemId: null,
        ownedMiniWeaponIds: ["mini_tick_autogun"],
        equippedMiniItemId: "mini_tick_autogun",
        inventory: [],
      },
      activePrimaryBay: 0,
      primaryFireMode: "swap",
      hulls: normalizeHullState(),
      shipBuild: createDefaultShipBuild(),
      shipUnlocked: {
        gunDiameter: { medium: true },
        spread: { focused: true },
        ammo: { kinetic: true },
        effect: { none: true },
        defense: { shield: true },
      },
      weapon: {
        barrel: "focused",
        trigger: "rapid",
        mount: "front",
        payload: "kinetic",
        modifier: "none",
      },
      unlocked: {
        barrel: { focused: true },
        trigger: { rapid: true },
        mount: { front: true },
        payload: { kinetic: true },
        modifier: { none: true },
        aux: { cloak: true },
      },
      consumablesOwned: {
        bomb: 0,
        shieldBoost: 0,
        overcharge: 0,
      },
      consumableSlots: ["none", "none"],
      upgrades: {
        hull: 0,
        shield: 0,
        damage: 0,
        fireRate: 0,
        spread: 0,
        auxDamage: 0,
        auxCooldown: 0,
        cloakDuration: 0,
        dualFire: 0,
      },
      investments: {
        engineering: 0,
        operations: 0,
        shares: 0,
        hulls: 0,
        capabilities: 0,
      },
      rmbWeapon: "cloak",
      audio: { musicVolume: 1, sfxVolume: 1 },
      missionCarouselIndex: {},
      ledgerMarket: createDefaultLedgerMarketState(),
    };
  }
  try {
    const parsed = JSON.parse(stored);
    shouldAutoLaunchFreshPilotMission = false;
    parsed.upgrades = {
      hull: parsed.upgrades?.hull ?? 0,
      shield: parsed.upgrades?.shield ?? 0,
      damage: parsed.upgrades?.damage ?? 0,
      fireRate: parsed.upgrades?.fireRate ?? 0,
      spread: parsed.upgrades?.spread ?? 0,
      auxDamage: parsed.upgrades?.auxDamage ?? 0,
      auxCooldown: parsed.upgrades?.auxCooldown ?? 0,
      cloakDuration: parsed.upgrades?.cloakDuration ?? 0,
      dualFire: parsed.upgrades?.dualFire ?? 0,
    };
    parsed.investments = {
      engineering: parsed.investments?.engineering ?? 0,
      operations: parsed.investments?.operations ?? 0,
      shares: parsed.investments?.shares ?? 0,
      hulls: parsed.investments?.hulls ?? 0,
      capabilities: parsed.investments?.capabilities ?? 0,
    };
    migrateRetiredAuxPower(parsed);
    if (!parsed.rmbWeapon || parsed.rmbWeapon === "none") {
      parsed.rmbWeapon = "cloak";
    }
    parsed.unlockedLevels = parsed.unlockedLevels ?? 1;
    normalizeAct2ProgressState(parsed);
    normalizeOnboardingState(parsed);
    parsed.debugUnlock = parsed.debugUnlock ?? false;
    parsed.debugInvincible = parsed.debugInvincible ?? false;
    parsed.debugShowFullCompendium = parsed.debugShowFullCompendium ?? false;
    parsed.debugShowAllItems = parsed.debugShowAllItems ?? false;
    parsed.devShowMath = parsed.devShowMath ?? false;
    parsed.audio = {
      musicVolume: Number.isFinite(parsed.audio?.musicVolume) ? Math.max(0, Math.min(1, parsed.audio.musicVolume)) : 1,
      sfxVolume: Number.isFinite(parsed.audio?.sfxVolume) ? Math.max(0, Math.min(1, parsed.audio.sfxVolume)) : 1,
    };
    parsed.encounteredEnemies = parsed.encounteredEnemies || {};
    parsed.killsByEnemyKey = parsed.killsByEnemyKey || {};
    parsed.relicCollection = normalizeRelicCollection(parsed.relicCollection);
    parsed.itemCollection = normalizeItemCollection(parsed.itemCollection);
    parsed.cargo = Array.isArray(parsed.cargo) ? parsed.cargo : [];
    parsed.hulls = normalizeHullState(parsed.hulls);
    applyPurchasedInvestmentRewards(parsed);
    parsed.activePrimaryBay = parsed.activePrimaryBay === 1 ? 1 : 0;
    parsed.primaryFireMode = normalizePrimaryFireMode(parsed.primaryFireMode);
    const hadShipBuild = !!parsed.shipBuild;
    parsed.shipBuild = parsed.shipBuild || createDefaultShipBuild();
    if (!hadShipBuild) {
      const spreadFromLegacy =
        parsed.weapon?.trigger === "burst"
          ? "burst"
          : parsed.weapon?.barrel === "spread"
            ? "wide"
            : "focused";
      parsed.shipBuild.spread = spreadFromLegacy;
      parsed.shipBuild.ammo = parsed.weapon?.payload || parsed.shipBuild.ammo;
      const effectFromLegacy =
        parsed.weapon?.modifier === "homing"
          ? "homing"
          : parsed.weapon?.modifier === "pierce"
            ? "pierce"
          : parsed.weapon?.modifier === "explosive"
            ? "explosive"
            : parsed.weapon?.modifier === "vampiric"
              ? "vampiric"
              : "none";
      parsed.shipBuild.effect = effectFromLegacy;
    }
    parsed.shipBuild.gunDiameter = parsed.shipBuild.gunDiameter || "medium";
    parsed.shipBuild.spread = parsed.shipBuild.spread || "focused";
    parsed.shipBuild.flowRateLevel = parsed.shipBuild.flowRateLevel ?? 0;
    parsed.shipBuild.flowVelocityLevel = parsed.shipBuild.flowVelocityLevel ?? 0;
    parsed.shipBuild.flowSizeLevel = parsed.shipBuild.flowSizeLevel ?? 0;
    parsed.shipBuild.kineticImpulseBudget = parsed.shipBuild.kineticImpulseBudget ?? 0;
    parsed.shipBuild.ammo = parsed.shipBuild.ammo || parsed.weapon?.payload || "kinetic";
    parsed.shipBuild.effect = parsed.shipBuild.effect || "none";
    parsed.shipBuild.effectUpgrades = parsed.shipBuild.effectUpgrades || {};
    parsed.shipBuild.effectUpgrades.homing = parsed.shipBuild.effectUpgrades.homing ?? 0;
    parsed.shipBuild.effectUpgrades.explosive = parsed.shipBuild.effectUpgrades.explosive ?? 0;
    parsed.shipBuild.effectUpgrades.pierce = parsed.shipBuild.effectUpgrades.pierce ?? 0;
    parsed.shipBuild.effectUpgrades.vampiric = parsed.shipBuild.effectUpgrades.vampiric ?? 0;
    parsed.shipBuild.defenseSlots = Array.isArray(parsed.shipBuild.defenseSlots)
      ? parsed.shipBuild.defenseSlots.slice(0, 2)
      : ["shield", "none"];
    while (parsed.shipBuild.defenseSlots.length < 2) parsed.shipBuild.defenseSlots.push("none");
    parsed.shipBuild.shieldMaxLevel = parsed.shipBuild.shieldMaxLevel ?? 0;
    parsed.shipBuild.shieldRegenLevel = parsed.shipBuild.shieldRegenLevel ?? 0;
    parsed.shipBuild.shieldCooldownLevel = parsed.shipBuild.shieldCooldownLevel ?? 0;
    parsed.shipBuild.armorClass = parsed.shipBuild.armorClass ?? 10;
    parsed.shipBuild.armorAmountLevel = parsed.shipBuild.armorAmountLevel ?? 0;
    parsed.shipBuild.armorClassLevel = parsed.shipBuild.armorClassLevel ?? 0;
    parsed.shipBuild.armorDragLevel = parsed.shipBuild.armorDragLevel ?? 0;
    normalizeStarterArmoryState(parsed);
    parsed.missionCarouselIndex = parsed.missionCarouselIndex || {};
    parsed.shipUnlocked = parsed.shipUnlocked || {};
    parsed.shipUnlocked.gunDiameter = parsed.shipUnlocked.gunDiameter || { medium: true };
    parsed.shipUnlocked.spread = parsed.shipUnlocked.spread || { focused: true };
    parsed.shipUnlocked.ammo = parsed.shipUnlocked.ammo || { kinetic: true };
    parsed.shipUnlocked.effect = parsed.shipUnlocked.effect || { none: true };
    parsed.shipUnlocked.defense = parsed.shipUnlocked.defense || { none: true, shield: true };
    parsed.shipUnlocked.armorClass = parsed.shipUnlocked.armorClass || { "10": true };
    parsed.shipUnlocked.gunDiameter[parsed.shipBuild.gunDiameter] = true;
    parsed.shipUnlocked.spread[parsed.shipBuild.spread] = true;
    parsed.shipUnlocked.ammo[parsed.shipBuild.ammo] = true;
    parsed.shipUnlocked.effect[parsed.shipBuild.effect] = true;
    if (Number.isFinite(parsed.shipBuild.armorClass) && parsed.shipBuild.armorClass > 0) {
      parsed.shipUnlocked.armorClass[String(parsed.shipBuild.armorClass)] = true;
    }
    parsed.shipBuild.defenseSlots.forEach((slot) => {
      if (slot && slot !== "none") parsed.shipUnlocked.defense[slot] = true;
    });
    parsed.weapon = parsed.weapon || {
      barrel: "focused",
      trigger: "rapid",
      mount: "front",
      payload: "kinetic",
      modifier: "none",
    };
    parsed.weapon.mount = parsed.weapon.mount || "front";
    parsed.unlocked = parsed.unlocked || {};
    parsed.unlocked.barrel = parsed.unlocked.barrel || { focused: true };
    parsed.unlocked.trigger = parsed.unlocked.trigger || { rapid: true };
    parsed.unlocked.mount = parsed.unlocked.mount || { front: true };
    parsed.unlocked.payload = parsed.unlocked.payload || { kinetic: true };
    parsed.unlocked.modifier = parsed.unlocked.modifier || { none: true };
    parsed.unlocked.aux = parsed.unlocked.aux || { cloak: true };
    parsed.consumablesOwned = parsed.consumablesOwned || {};
    consumables.forEach((item) => {
      parsed.consumablesOwned[item.id] = parsed.consumablesOwned[item.id] ?? 0;
    });
    parsed.consumableSlots = parsed.consumableSlots || ["none", "none"];
    if (!Array.isArray(parsed.consumableSlots) || parsed.consumableSlots.length < 2) {
      parsed.consumableSlots = ["none", "none"];
    }
    if (parsed.weapon?.barrel) parsed.unlocked.barrel[parsed.weapon.barrel] = true;
    if (parsed.weapon?.trigger) parsed.unlocked.trigger[parsed.weapon.trigger] = true;
    if (parsed.weapon?.mount) parsed.unlocked.mount[parsed.weapon.mount] = true;
    if (parsed.weapon?.payload) parsed.unlocked.payload[parsed.weapon.payload] = true;
    if (parsed.weapon?.modifier) parsed.unlocked.modifier[parsed.weapon.modifier] = true;
    if (parsed.rmbWeapon) parsed.unlocked.aux[parsed.rmbWeapon] = true;
    normalizeLedgerMarketState(parsed);
    return parsed;
  } catch (error) {
    console.warn("Failed to parse save, resetting.");
    shouldAutoLaunchFreshPilotMission = false;
    return {
      credits: 0,
      lifetimeCredits: 0,
      missionCount: 0,
      lastMissionSummary: "N/A",
      unlockedLevels: 1,
      completedMissions: {},
      keyItems: [],
      branchStanding: createDefaultBranchStanding(),
      onboardingStage: ONBOARDING_STAGE_COMPLETE,
      debugSkipOnboarding: false,
      systemUnlocks: { ...DEFAULT_SYSTEM_UNLOCKS },
      debugUnlock: false,
      debugInvincible: false,
      debugShowFullCompendium: false,
      debugShowAllItems: false,
      devShowMath: false,
      encounteredEnemies: {},
      killsByEnemyKey: {},
      relicCollection: {},
      itemCollection: {},
      cargo: [],
      armory: {
        ownedLoadoutIds: ["fundamentals", "area_control", "armor_break"],
        equippedLoadoutId: "fundamentals",
        equippedPrimaryItemId: null,
        equippedSecondLoadoutId: null,
        equippedSecondPrimaryItemId: null,
        ownedDefenseModuleIds: ["shield_module", "armor_module"],
        equippedDefenseSlotIds: ["shield_module", "none"],
        equippedSupportItemId: null,
        ownedMiniWeaponIds: ["mini_tick_autogun"],
        equippedMiniItemId: "mini_tick_autogun",
        inventory: [],
      },
      activePrimaryBay: 0,
      primaryFireMode: "swap",
      hulls: normalizeHullState(),
      shipBuild: createDefaultShipBuild(),
      shipUnlocked: {
        gunDiameter: { medium: true },
        spread: { focused: true },
        ammo: { kinetic: true },
        effect: { none: true },
        defense: { shield: true },
      },
      weapon: {
        barrel: "focused",
        trigger: "rapid",
        mount: "front",
        payload: "kinetic",
        modifier: "none",
      },
      unlocked: {
        barrel: { focused: true },
        trigger: { rapid: true },
        mount: { front: true },
        payload: { kinetic: true },
        modifier: { none: true },
        aux: { cloak: true },
      },
      consumablesOwned: {
        bomb: 0,
        shieldBoost: 0,
        overcharge: 0,
      },
      consumableSlots: ["none", "none"],
      upgrades: {
        hull: 0,
        shield: 0,
        damage: 0,
        fireRate: 0,
        spread: 0,
        auxDamage: 0,
        auxCooldown: 0,
        cloakDuration: 0,
        dualFire: 0,
      },
      investments: {
        engineering: 0,
        operations: 0,
        shares: 0,
        hulls: 0,
        capabilities: 0,
      },
      rmbWeapon: "cloak",
      audio: { musicVolume: 1, sfxVolume: 1 },
      missionCarouselIndex: {},
      ledgerMarket: createDefaultLedgerMarketState(),
    };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getShipBuild() {
  if (activeShipBuildOverride) return activeShipBuildOverride;
  if (!state.shipBuild) {
    state.shipBuild = createDefaultShipBuild();
  }
  if (!state.shipBuild.effectUpgrades) {
    state.shipBuild.effectUpgrades = cloneShipBuild(createDefaultShipBuild().effectUpgrades);
  } else {
    state.shipBuild.effectUpgrades = {
      ...cloneShipBuild(createDefaultShipBuild().effectUpgrades),
      ...state.shipBuild.effectUpgrades,
    };
  }
  state.shipBuild.kineticImpulseBudget = state.shipBuild.kineticImpulseBudget ?? 0;
  state.shipBuild.shieldCooldownLevel = state.shipBuild.shieldCooldownLevel ?? 0;
  state.shipBuild.armorDragLevel = state.shipBuild.armorDragLevel ?? 0;
  state.shipBuild.cooldownMult = Number.isFinite(state.shipBuild.cooldownMult)
    ? Math.max(0.35, state.shipBuild.cooldownMult)
    : 1;
  state.shipBuild.hullMult = Number.isFinite(state.shipBuild.hullMult) ? state.shipBuild.hullMult : 1;
  state.shipBuild.shieldMaxMult = Number.isFinite(state.shipBuild.shieldMaxMult) ? state.shipBuild.shieldMaxMult : 1;
  state.shipBuild.shieldRegenMult = Number.isFinite(state.shipBuild.shieldRegenMult) ? state.shipBuild.shieldRegenMult : 1;
  state.shipBuild.armorCapacityMult = Number.isFinite(state.shipBuild.armorCapacityMult) ? state.shipBuild.armorCapacityMult : 1;
  state.shipBuild.armorDragMult = Number.isFinite(state.shipBuild.armorDragMult) ? state.shipBuild.armorDragMult : 1;
  state.shipBuild.primaryDamageMult = Number.isFinite(state.shipBuild.primaryDamageMult) ? state.shipBuild.primaryDamageMult : 1;
  return state.shipBuild;
}

function getShipUnlocks() {
  if (!state.shipUnlocked) {
    state.shipUnlocked = {
      gunDiameter: { medium: true },
      spread: { focused: true },
      ammo: { kinetic: true },
      effect: { none: true },
      defense: { none: true, shield: true },
      armorClass: { "10": true },
    };
  }
  state.shipUnlocked.gunDiameter = state.shipUnlocked.gunDiameter || { medium: true };
  state.shipUnlocked.spread = state.shipUnlocked.spread || { focused: true };
  state.shipUnlocked.ammo = state.shipUnlocked.ammo || { kinetic: true };
  state.shipUnlocked.effect = state.shipUnlocked.effect || { none: true };
  state.shipUnlocked.defense = state.shipUnlocked.defense || { none: true, shield: true };
  state.shipUnlocked.armorClass = state.shipUnlocked.armorClass || { "10": true };

  // Always treat currently-equipped parts as unlocked to prevent double-charging.
  const build = getShipBuild();
  state.shipUnlocked.gunDiameter[build.gunDiameter] = true;
  state.shipUnlocked.spread[build.spread] = true;
  state.shipUnlocked.ammo[build.ammo] = true;
  state.shipUnlocked.effect[build.effect] = true;
  if (Number.isFinite(build.armorClass) && build.armorClass > 0) {
    state.shipUnlocked.armorClass[String(build.armorClass)] = true;
  }
  (build.defenseSlots || []).forEach((slot) => {
    if (slot && slot !== "none") state.shipUnlocked.defense[slot] = true;
  });

  return state.shipUnlocked;
}

function isShipUnlocked(category, id) {
  const unlocks = getShipUnlocks();
  return !!unlocks?.[category]?.[id];
}

function unlockShipOption(category, id, cost) {
  if (isShipUnlocked(category, id)) return true;
  if (cost > 0 && state.credits < cost) return false;
  state.credits -= cost;
  const unlocks = getShipUnlocks();
  if (!unlocks[category]) unlocks[category] = {};
  unlocks[category][id] = true;
  state.shipUnlocked = unlocks;
  return true;
}

function syncShipBuildToLegacy() {
  const build = getShipBuild();
  // Keep the existing combat system usable while we overhaul the UI/logic.
  // This mapping is intentionally lossy; later steps will fully switch to shipBuild.
  const spread = build.spread || "focused";
  if (spread === "focused") {
    state.weapon.barrel = "focused";
    state.weapon.trigger = "rapid";
  } else if (spread === "dual" || spread === "dualRapid" || spread === "rapid") {
    state.weapon.barrel = "focused";
    state.weapon.trigger = "rapid";
  } else if (spread === "burst") {
    state.weapon.barrel = "focused";
    state.weapon.trigger = "burst";
  } else if (spread === "wide") {
    state.weapon.barrel = "spread";
    state.weapon.trigger = "rapid";
  }

  const ammo = build.ammo || "kinetic";
  state.weapon.payload = ammo === "plasma" ? "plasma" : "kinetic";
  state.weapon.mount = "front";

  const effect = build.effect || "none";
  if (effect === "homing") state.weapon.modifier = "homing";
  else if (effect === "pierce") state.weapon.modifier = "pierce";
  else if (effect === "explosive") state.weapon.modifier = "explosive";
  else if (effect === "vampiric") state.weapon.modifier = "vampiric";
  else state.weapon.modifier = "none";

  // Ensure these are considered unlocked in old state for internal consistency.
  state.unlocked = state.unlocked || {};
  state.unlocked.payload = state.unlocked.payload || { kinetic: true };
  state.unlocked.modifier = state.unlocked.modifier || { none: true };
  state.unlocked.payload[state.weapon.payload] = true;
  state.unlocked.modifier[state.weapon.modifier] = true;
}

function upgradeCost(upgradeId) {
  const definition = getUpgradeDefinition(upgradeId);
  if (!definition) return Infinity;
  const level = state.upgrades[upgradeId] || 0;
  const base = definition.baseCost;
  const exponent = getEconomyConfig().legacyCreditGates.upgradeCostExponent;
  return Math.round(base * Math.pow(exponent, level));
}

function getUpgradeDefinition(upgradeId) {
  return upgrades.find((item) => item.id === upgradeId) || null;
}

// Aux ability strength now comes from the equipped item's rolled potency (see AUX_POTENCY_CONFIG),
// not the retired auxPower investment. The generic Ability Duration/Cooldown upgrades still apply
// as a small modifier on top of the rolled base.
function getAuxRuntimeStats(ability, targetState = state) {
  const auxCooldownLevel = targetState.upgrades?.auxCooldown ?? 0;
  const durationLevel = targetState.upgrades?.cloakDuration ?? 0;
  const durationMult = 1 + durationLevel * 0.12;
  const cooldownMult = Math.pow(0.95, auxCooldownLevel);
  const potency = getAuxPotencyForState(ability, targetState);
  if (ability === "cloak") {
    return {
      duration: (potency?.duration ?? 2.5) * durationMult,
      cooldown: Math.max(4, (potency?.cooldown ?? 10) * cooldownMult),
    };
  }
  if (ability === "emp") {
    return {
      duration: (potency?.duration ?? 1.6) * durationMult,
      cooldown: Math.max(3.5, (potency?.cooldown ?? 8) * cooldownMult),
      clearRadius: Math.round(potency?.clearRadius ?? EMP_CLEAR_BASE_RADIUS),
    };
  }
  if (ability === "bulwark") {
    return {
      duration: (potency?.duration ?? 1.2) * durationMult,
      shieldBonus: Math.round(potency?.shieldBonus ?? 200),
    };
  }
  return { duration: 0, cooldown: 0 };
}

function getEmpClearRadiusForState(targetState = state) {
  return getAuxRuntimeStats("emp", targetState).clearRadius;
}

function getDualFireTier(targetState = state) {
  const base = Math.max(0, Math.min(4, Math.floor(targetState.upgrades?.dualFire || 0)));
  const hullBonus = Math.max(0, Math.floor(getHullBonuses(targetState).dualFireTierBonus || 0));
  return Math.max(0, Math.min(4, base + hullBonus));
}

function getDualFireDamageMult(targetState = state) {
  return DUAL_FIRE_DAMAGE_MULTS[getDualFireTier(targetState)] || 0;
}

function isDualFireCompatibleItem(item) {
  if (!item || normalizeArmorySlotType(item.slotType) !== "primary") return false;
  const tags = Array.isArray(item.tags) ? item.tags : [];
  return !(
    item.swapOnly ||
    item.fireMode === "swapOnly" ||
    tags.includes("swap-only") ||
    tags.includes("swapOnly")
  );
}

function canUseDualFireCurrentLoadout(targetState = state) {
  const primary = getPrimaryArmoryItem(targetState, 0);
  const second = getSecondPrimaryArmoryItem(targetState);
  return !!(
    primary &&
    second &&
    getDualFireDamageMult(targetState) > 0 &&
    isDualFireCompatibleItem(primary) &&
    isDualFireCompatibleItem(second)
  );
}

function canDualFireCurrentLoadout(targetState = state) {
  return getPrimaryFireMode(targetState) === "dual" && canUseDualFireCurrentLoadout(targetState);
}

function purchaseEngineeringUpgrade(upgradeId) {
  const definition = getUpgradeDefinition(upgradeId);
  if (!definition) return;
  const current = state.upgrades[upgradeId] || 0;
  const maxLevel = definition.maxLevel || 0;
  if (current >= maxLevel) return;
  const cost = upgradeCost(upgradeId);
  if (state.credits < cost) return;
  state.credits -= cost;
  state.upgrades[upgradeId] = current + 1;
  state.shipBuild = composeShipBuildFromArmory(state);
  syncShipBuildToLegacy();
  saveState();
  safeUpdateHangar();
}

function applyUpgrades() {
  const hullLevel = state.upgrades.hull;
  const auxCooldownLevel = state.upgrades.auxCooldown;
  const cloakDurationLevel = state.upgrades.cloakDuration;

  const build = getShipBuild();
  player.maxHull = Math.round(100 * (1 + hullLevel * 0.08) * (build.hullMult ?? 1));
  player.hull = player.maxHull;

  const defenseSlots = Array.isArray(build.defenseSlots) ? build.defenseSlots : ["shield", "none"];
  const shieldSlots = defenseSlots.filter((slot) => slot === "shield").length;
  const armorSlots = defenseSlots.filter((slot) => slot === "armor").length;

  const baseShieldPerSlot = 40;
  const shieldCapacitySlots = Math.max(0.25, shieldSlots + (build.shieldMaxLevel ?? 0) * 0.18);
  player.maxShield = shieldSlots > 0
    ? Math.round(baseShieldPerSlot * shieldCapacitySlots * (build.shieldMaxMult ?? 1))
    : 0;
  player.shield = player.maxShield;
  const baseShieldRegen = 12;
  const shieldRegenSlots = Math.max(0.2, shieldSlots + (build.shieldRegenLevel ?? 0) * 0.22);
  player.shieldRegen = shieldSlots > 0
    ? baseShieldRegen * shieldRegenSlots * (build.shieldRegenMult ?? 1)
    : 0;
  player.shieldCooldown = 0;
  player.shieldRechargeDelay =
    shieldSlots > 0
      ? Math.max(0.7, 2.5 * (1 + (build.shieldCooldownLevel ?? 0) * 0.16))
      : 0;

  const baseArmorPerSlot = 80;
  const armorCapacitySlots = Math.max(0.25, armorSlots + (build.armorAmountLevel ?? 0) * 0.18);
  player.maxArmor =
    armorSlots > 0 ? Math.round(baseArmorPerSlot * armorCapacitySlots * (build.armorCapacityMult ?? 1)) : 0;
  player.armor = player.maxArmor;
  const baseArmorClass = build.armorClass ?? 10;
  player.armorClass =
    armorSlots > 0 ? Math.round(baseArmorClass + (build.armorClassLevel ?? 0) * 2) : 0;

  player.spreadLevel = 0;
  player.altCooldownTime = Math.max(0.35, 0.9 * Math.pow(0.92, auxCooldownLevel));
  const cloakStats = getAuxRuntimeStats("cloak", state);
  const empStats = getAuxRuntimeStats("emp", state);
  const bulwarkStats = getAuxRuntimeStats("bulwark", state);
  player.cloakDuration = cloakStats.duration;
  player.empDuration = empStats.duration;
  player.empClearRadius = empStats.clearRadius;
  player.bulwarkDuration = bulwarkStats.duration;
  player.bulwarkShieldBonus = bulwarkStats.shieldBonus;
  player.cloakCooldownTime = cloakStats.cooldown;
  player.empCooldownTime = empStats.cooldown;
}

function initConsumablesForMission() {
  const slots = Array.isArray(state.consumableSlots)
    ? state.consumableSlots.slice(0, 2)
    : ["none", "none"];
  while (slots.length < 2) slots.push("none");
  const remainingOwned = { ...state.consumablesOwned };
  const uses = slots.map((slotId) => {
    if (!slotId || slotId === "none") return 0;
    const item = consumablesById[slotId];
    if (!item) return 0;
    const owned = remainingOwned[slotId] ?? 0;
    const allocated = Math.min(item.usesPerMission ?? 0, owned);
    remainingOwned[slotId] = Math.max(0, owned - allocated);
    return allocated;
  });
  const cooldowns = slots.map(() => 0);
  return { slots, uses, cooldowns };
}

async function startMission({ showIntro = false } = {}) {
  closeShipModal();
  hideMissionIntro();
  await ensureWeaponFrameCatalogLoaded();
  await ensureEnemyCatalogLoaded();
  await ensureItemPoolLoaded();
  const refreshedSavedItems = refreshSavedInventoryCatalogBuilds(state);
  const directive = getCurrentOnboardingMission();
  if (directive && selectedLevelId !== directive.missionId) {
    selectedLevelId = directive.missionId;
    currentLevel = null;
  }
  const level = await ensureLevelLoaded();
  if (directive && level?.id !== directive.missionId) {
    return false;
  }
  if (level?.validationErrors?.length) {
    cancelMissionLaunch(level, level.validationErrors);
    return false;
  }
  activeShipBuildOverride = null;
  if (directive?.loadoutId && starterWeaponLoadoutsById[directive.loadoutId]) {
    activeShipBuildOverride = {
      ...cloneShipBuild(createDefaultShipBuild()),
      ...cloneShipBuild(starterWeaponLoadoutsById[directive.loadoutId].build),
      effectUpgrades: cloneShipBuild(createDefaultShipBuild().effectUpgrades),
    };
  } else {
    state.shipBuild = composeShipBuildFromArmory(state);
    syncShipBuildToLegacy();
  }
  if (refreshedSavedItems) saveState();
  applyUpgrades();
  const consumablesState = initConsumablesForMission();
  state.cargo = [];
  mission = {
    active: true,
    startTime: performance.now(),
    elapsed: 0,
    score: 0,
    kills: 0,
    killCredits: 0,
    spawnTimer: 0,
    enemyFireTimer: 0,
    difficulty: getMissionDifficultyAtElapsed(0),
    level,
    eventIndex: 0,
    spawnQueue: [],
    bossAlive: false,
    bossDefeated: false,
    bossFinishTimer: 0,
    bossSpawnTime: getBossSpawnTime(level),
    activeMinibossId: null,
    minibossBannerText: "",
    minibossBannerTimer: 0,
    bossPhaseBannerText: "",
    bossPhaseBannerTimer: 0,
    playerPositionHistory: [],
    repossessedCount: 0,
    empTimer: 0,
    pickupIndex: 0,
    consumableSlots: consumablesState.slots,
    consumableUses: consumablesState.uses,
    consumableCooldowns: consumablesState.cooldowns,
    cargo: state.cargo,
    bossSalvage: [],
    onboardingStage: state.onboardingStage,
    onboardingMissionId: directive?.missionId || null,
    onboardingTitle: directive?.title || "",
  };
  setDesiredMusic(level);
  bullets.length = 0;
  enemyBullets.length = 0;
  enemies.length = 0;
  salvagePods.length = 0;
  floatingTexts.length = 0;
  explosions.length = 0;
  cargoHudMessageTimer = 0;
  player.x = canvas.width / window.devicePixelRatio / 2;
  player.y = canvas.height / window.devicePixelRatio - 120;
  pointer.x = player.x;
  pointer.y = player.y;
  pointer.active = true;
  player.fireCooldown = 0;
  player.primaryBayCooldowns = [0, 0];
  player.miniFireCooldown = 0;
  player.swapCooldown = 0;
  player.altCooldown = 0;
  player.shieldCooldown = 0;
  player.empCooldown = 0;
  player.bulwarkTimer = 0;
  player.bulwarkShield = 0;
  player.damageBoostTimer = 0;
  player.damageBoostMult = 1;
  paused = false;
  setHangarStatusMessage("");

  overlay.hidden = true;
  hangarPanel.hidden = true;
  debriefPanel.hidden = true;
  renderTuningPanel();
  updateMobileControls();
  hudMission.textContent = level?.name
    ? `Mission ${state.missionCount + 1}: ${level.name}`
    : `Mission ${state.missionCount + 1}`;
  if (showIntro) {
    showMissionIntro();
  }
  return true;
}

function endMission({ ejected = false, completed = false } = {}) {
  if (!mission || !mission.active) return;
  mission.active = false;
  activeShipBuildOverride = null;
  closeShipModal();
  hideMissionIntro();
  hideRtbConfirm();
  paused = false;
  setHangarMusic();
  setHangarTab("hub", { renderLevels: false });

  const killBounty = Math.round(mission.killCredits || 0);
  const objectiveCredits = objectiveCreditRewardFor(mission, completed);
  const completionCredits = missionCompletionCreditFor(mission, completed);
  const grossBounty = killBounty + objectiveCredits + completionCredits;
  const extractionConfig = getExtractionConfig();
  const recoveryConfig = extractionConfig.recoveryBonusRate;
  const recoveryRate = completed
    ? recoveryConfig.min +
      Math.random() * (recoveryConfig.max - recoveryConfig.min)
    : 0;
  const recoveryBonus = completed ? Math.round(grossBounty * recoveryRate) : 0;
  const hullWritedown = completed || ejected
    ? 0
    : Math.round(grossBounty * extractionConfig.deathBountyWritedownRate);
  const bountyKept = grossBounty - hullWritedown;
  const subtotal = bountyKept + recoveryBonus;
  const dividends = calculateDividends(subtotal);
  const finalReward = subtotal + dividends;
  const cargoAtEnd = Array.isArray(state.cargo) ? state.cargo.map(cloneItem) : [];
  if (completed && !mission.bossSalvage?.length) {
    const fallbackBossDrop = rollSalvageDrop(
      {
        isBoss: true,
        baseCredit: getMissionRewardConfig().fallbackBossSalvageBaseCredit,
        type: "boss",
        ai: "boss",
      },
      { force: true, forceSource: "boss" }
    );
    if (fallbackBossDrop?.item) {
      mission.bossSalvage = [fallbackBossDrop.item];
    }
  }
  const bossSalvage = completed && Array.isArray(mission.bossSalvage)
    ? mission.bossSalvage.map(cloneItem)
    : [];
  const keptCargo = completed || ejected ? cargoAtEnd : [];
  const lostCargo = completed || ejected ? [] : cargoAtEnd;
  const identifiedItems = [...keptCargo, ...bossSalvage];
  if (identifiedItems.length) {
    addItemsToArmoryInventory(identifiedItems);
  }
  state.cargo = [];

  state.credits += finalReward;
  state.lifetimeCredits += finalReward;
  state.missionCount += 1;
  state.lastMissionSummary = `${formatTime(mission.elapsed)} | ${mission.kills} kills`;
  const outcome = completed ? "boss" : ejected ? "rtb" : "death";
  const bulletinSaleSummary = capturePendingBulletinSaleSummary();
  const ledgerMissionSummary = settleLedgerAfterMission(outcome);
  let completedEntry = null;
  const keyItemLines = [];
  const debriefLoreLine = completed ? pickDebriefLoreLine(mission.level) : "";
  if (completed && mission.level?.id) {
    const completedBaseId = missionProgressionBaseIdFor(mission.level);
    completedEntry = availableLevels.find((level) => level.id === completedBaseId);
    normalizeAct2ProgressState(state);
    state.completedMissions[completedBaseId] =
      Math.max(0, Math.floor(Number(state.completedMissions[completedBaseId]) || 0)) + 1;
    if (completedEntry?.branch) {
      state.branchStanding[completedEntry.branch] =
        Math.max(0, Math.floor(Number(state.branchStanding[completedEntry.branch]) || 0)) + 1;
    }
    getMissionKeyItemRewards(completedBaseId).forEach((keyId) => {
      const grant = grantKeyItem(keyId);
      if (grant) keyItemLines.push(grant);
    });
    const usesGraphUnlock = Array.isArray(completedEntry?.requires) && completedEntry.requires.length > 0;
    if (!completedEntry?.test && !usesGraphUnlock) {
      const currentIndex = availableLevels.findIndex((level) => level.id === completedBaseId);
      if (currentIndex !== -1 && state.unlockedLevels <= currentIndex + 1) {
        state.unlockedLevels = Math.min(availableLevels.length, currentIndex + 2);
      }
    }
  }
  let onboardingMessage = "";
  let continueTrainingAfterDebrief = false;
  const directive = getCurrentOnboardingMission();
  if (directive) {
    if (completed && mission.level?.id === directive.missionId) {
      state.onboardingStage = Math.min(
        ONBOARDING_STAGE_TRAINING_COMPLETE,
        state.onboardingStage + 1
      );
      refreshSystemUnlocks();
      syncStarterArmoryState();
      continueTrainingAfterDebrief = !!getOnboardingMissionForStage(state.onboardingStage);
      onboardingMessage =
        state.onboardingStage >= ONBOARDING_STAGE_TRAINING_COMPLETE
          ? "Training complete. Ship Loadout and Drone Compendium unlocked."
          : directive.reward;
    } else {
      continueTrainingAfterDebrief = true;
      onboardingMessage = `Training directive incomplete: clear ${directive.title} to continue.`;
    }
  } else if (
    !isOnboardingSkipped() &&
    state.onboardingStage === ONBOARDING_STAGE_TRAINING_COMPLETE &&
    completed &&
    !completedEntry?.test
  ) {
    state.onboardingStage = ONBOARDING_STAGE_COMPLETE;
    refreshSystemUnlocks();
    syncStarterArmoryState();
    onboardingMessage = "Economy systems unlocked. You now have full hangar access.";
  }
  saveState();
  debriefLaunchMode = continueTrainingAfterDebrief ? "training" : null;
  if (returnBtn) {
    returnBtn.textContent = continueTrainingAfterDebrief ? "Continue" : "Return to Hangar";
  }

  if (ejected) {
    playSfx("eject", 0.5);
  }
  renderDebriefSummary({
    outcome,
    grossBounty,
    killBounty,
    objectiveCredits,
    completionCredits,
    bountyKept,
    recoveryBonus,
    recoveryRate,
    dividends,
    hullWritedown,
    finalReward,
    identifiedItems,
    lostCargo,
    bossSalvageCount: bossSalvage.length,
    bulletinSaleSummary,
    earlyRecallAudit: ledgerMissionSummary.earlyRecallAudit,
    consecutiveEarlyRecalls: ledgerMissionSummary.consecutiveEarlyRecalls,
    onboardingMessage,
    keyItemLines,
    debriefLoreLine,
    repossessedCount: mission.repossessedCount || 0,
  });
  playUiSfx("stamp");
  debriefTime.textContent = formatTime(mission.elapsed);
  debriefKills.textContent = mission.kills.toString();
  setCountedNumber(debriefCredits, finalReward, { duration: 620 });

  overlay.hidden = false;
  debriefPanel.hidden = false;
  hangarPanel.hidden = true;
  updateMobileControls();
  hangarNeedsRefresh = true;
}

function formatCredits(value) {
  return `${Math.round(value)} cr`;
}

function formatLedgerCredits(value) {
  return `${Math.round(value)}¢`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderDebriefSummary(summary) {
  const outcomeCopy =
    summary.outcome === "boss"
      ? LEDGER_COPY.bossComplete
      : summary.outcome === "rtb"
        ? LEDGER_COPY.rtbComplete
        : LEDGER_COPY.droneDestroyed;
  const message = summary.onboardingMessage
    ? `${outcomeCopy} ${summary.onboardingMessage}`
    : outcomeCopy;
  if (debriefText) debriefText.textContent = message;
  if (debriefPanel) {
    debriefPanel.classList.remove("outcome-boss", "outcome-rtb", "outcome-death");
    debriefPanel.classList.add(`outcome-${summary.outcome}`);
  }
  if (debriefStamp) {
    debriefStamp.textContent =
      summary.outcome === "death"
        ? "CLAIM ADJUSTED"
        : summary.outcome === "rtb"
          ? "RTB SETTLED"
          : "SETTLED";
  }

  if (debriefLedger) {
    const rows = [
      { label: "Kill bounties", amount: summary.killBounty || 0 },
      { label: "Objective credits", amount: summary.objectiveCredits || 0 },
      { label: "Mission completion", amount: summary.completionCredits || 0 },
      {
        label: LEDGER_COPY.recoveryBonus,
        amount: summary.recoveryBonus,
        note: summary.recoveryBonus > 0 ? `${Math.round(summary.recoveryRate * 100)}%` : "",
      },
      { label: LEDGER_COPY.fleetDividends, amount: summary.dividends },
      { label: LEDGER_COPY.hullWritedown, amount: -summary.hullWritedown, fee: true },
    ];
    if (summary.bulletinSaleSummary?.bonus > 0) {
      rows.push({
        label: LEDGER_COPY.demandBonus,
        amount: summary.bulletinSaleSummary.bonus,
        note: `${summary.bulletinSaleSummary.count} prior sale${summary.bulletinSaleSummary.count === 1 ? "" : "s"} | ${summary.bulletinSaleSummary.label || summary.bulletinSaleSummary.tag}`,
        memo: true,
      });
    }
    if (summary.earlyRecallAudit) {
      rows.push({
        label: "Audit memo",
        text: `${LEDGER_COPY.earlyRecallAudit} (${summary.consecutiveEarlyRecalls} RTBs)`,
        memo: true,
      });
    }
    if (summary.repossessedCount > 0) {
      rows.push({
        label: "Repossessed by counterparty",
        text: `${summary.repossessedCount} item${summary.repossessedCount === 1 ? "" : "s"}`,
        fee: true,
      });
    }
    (summary.keyItemLines || []).forEach((item) => {
      rows.push({
        label: item.label || getKeyItemLabel(item.id),
        text: item.newlyGranted ? "decoded" : "decoded previously",
        memo: true,
      });
    });
    if (summary.debriefLoreLine) {
      rows.push({
        label: "Recovered line",
        text: summary.debriefLoreLine,
        memo: true,
      });
    }
    rows.push({ label: "Net", amount: summary.finalReward, total: true });
    debriefLedger.innerHTML = `
      <div class="ledger-title">Claims Receipt</div>
      <div class="ledger-lines">
        ${rows
          .map(
            (row, index) => `
          <div class="ledger-line${row.fee ? " fee" : ""}${row.total ? " total" : ""}${row.memo ? " memo" : ""}" style="--line-index: ${index}">
            <span>${escapeHtml(row.label)}${row.note ? ` <em>${escapeHtml(row.note)}</em>` : ""}</span>
            <strong>${row.text ? escapeHtml(row.text) : `${row.amount < 0 ? "-" : ""}${formatCredits(Math.abs(row.amount))}`}</strong>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }

  if (!debriefSalvage) return;
  const identified = summary.identifiedItems || [];
  const lost = summary.lostCargo || [];
  if (!identified.length && !lost.length) {
    debriefSalvage.innerHTML = `<div class="salvage-empty">${LEDGER_COPY.noCargo}</div>`;
    return;
  }

  const identifiedHtml = identified.length
    ? `
      <div class="salvage-title">Pod Identification</div>
      <div class="salvage-list">
        ${identified
          .map((item, index) => {
            const rarity = item.rarity || "scrap";
            const affixes = Array.isArray(item.affixes) && item.affixes.length
              ? item.affixes.map((affix) => affix.name || affix.id).join(", ")
              : "No affix trace";
            const relicLore =
              item.relicLore && item.relicFirstDiscovery
                ? `<div class="salvage-relic-lore">${escapeHtml(item.relicLore)}</div>`
                : item.relicId && item.relicLore
                  ? `<div class="salvage-relic-lore archived">Relic record already archived.</div>`
                  : "";
            const sourceLabel =
              index >= identified.length - (summary.bossSalvageCount || 0)
                ? LEDGER_COPY.bossPod
                : `Cargo pod ${index + 1}`;
            return `
              <div class="salvage-item rarity-${rarity}" tabindex="0" data-item-id="${escapeHtml(item.id)}" style="${getRarityStyle(rarity)}; --reveal-index: ${index}">
                <div class="salvage-item-icon">
                  <img src="${escapeHtml(item.icon || getDefaultItemIcon(rarity))}" alt="" />
                </div>
                <div>
                  <div class="salvage-item-kicker">${escapeHtml(sourceLabel)} identified</div>
                  <div class="salvage-item-name">${escapeHtml(item.name)}</div>
                  <div class="salvage-item-meta">${escapeHtml(getRarityLabel(rarity))} | ${formatCredits(item.value || 0)} | ${escapeHtml(affixes)}</div>
                  ${relicLore}
                  <div class="salvage-actions">
                    <button type="button" class="ghost small" data-debrief-keep="${escapeHtml(item.id)}">Keep</button>
                    <button type="button" class="small" data-debrief-sell="${escapeHtml(item.id)}">Sell</button>
                  </div>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>
    `
    : "";

  const lostHtml = lost.length
    ? `
      <div class="salvage-lost">
        ${lost.length} cargo pod${lost.length === 1 ? "" : "s"} voided by hull loss.
      </div>
    `
    : "";

  debriefSalvage.innerHTML = `${identifiedHtml}${lostHtml}`;
  debriefSalvage.querySelectorAll(".salvage-item[data-item-id]").forEach((row) => {
    const item = identified.find((candidate) => candidate.id === row.dataset.itemId);
    if (item) attachItemTooltip(row, item, getComparableSlotIdForItem(item));
  });
}

function startPlayerDeathSequence() {
  if (!mission || !mission.active) return;
  if (mission.deathTimer > 0) return;
  mission.deathTimer = 2.0;
  mission.deathTotal = 2.0;
  mission.deathX = player.x;
  mission.deathY = player.y;

  // Freeze the combat tableau and focus attention on the player death.
  bullets.length = 0;
  enemyBullets.length = 0;
  enemies.length = 0;

  spawnExplosion(player.x, player.y, Math.max(36, player.radius * 2.2), {
    intensity: 1.15,
    blend: "lighter",
    style: "playerDeath",
    coalesce: false,
  });
  addCameraShake(0.55, player.x, player.y);
  screenFlash = Math.min(0.8, screenFlash + 0.55);
  playSfx("explosion", 0.12);
}

function updateHangar() {
  refreshSystemUnlocks();
  syncStarterArmoryState();
  if (pilotRank) {
    pilotRank.textContent = getPilotRank(state.lifetimeCredits);
  }
  if (availableCreditsEl) {
    setCountedNumber(availableCreditsEl, state.credits);
  }
  if (branchStandingEl) {
    branchStandingEl.textContent = getBranchStandingLabel();
    branchStandingEl.title = "Sanctioned record / Off-book record";
  }
  if (lifetimeCreditsEl) {
    setCountedNumber(lifetimeCreditsEl, state.lifetimeCredits);
  }
  if (lastMissionEl) {
    lastMissionEl.textContent = state.lastMissionSummary;
  }
  if (debugUnlock) {
    debugUnlock.checked = !!state.debugUnlock;
  }
  if (debugInvincible) {
    debugInvincible.checked = !!state.debugInvincible;
  }
  if (debugShowCompendium) {
    debugShowCompendium.checked = !!state.debugShowFullCompendium;
  }
  if (debugShowItems) {
    debugShowItems.checked = !!state.debugShowAllItems;
  }
  if (debugShowMath) {
    debugShowMath.checked = !!state.devShowMath;
  }
  if (debugSkipOnboarding) {
    debugSkipOnboarding.checked = !!state.debugSkipOnboarding;
  }
  syncAudioControls();
  if (hangarStatus) {
    hangarStatus.hidden = !hangarStatusMessage;
    hangarStatus.textContent = hangarStatusMessage || "";
  }

  const directive = getCurrentOnboardingMission();
  if (onboardingBanner) {
    if (directive) {
      onboardingBanner.hidden = false;
      onboardingBanner.innerHTML = `<strong>${directive.title}</strong><br>${directive.briefing}`;
    } else if (
      !isOnboardingSkipped() &&
      state.onboardingStage === ONBOARDING_STAGE_TRAINING_COMPLETE
    ) {
      onboardingBanner.hidden = false;
      onboardingBanner.innerHTML =
        "<strong>Post-Training Objective</strong><br>Complete one live mission to unlock Economy systems.";
    } else {
      onboardingBanner.hidden = true;
      onboardingBanner.textContent = "";
    }
  }
  if (missionBriefingText) {
    if (directive) {
      missionBriefingText.textContent = `${directive.title}: ${directive.briefing}`;
    } else if (
      !isOnboardingSkipped() &&
      state.onboardingStage === ONBOARDING_STAGE_TRAINING_COMPLETE
    ) {
      missionBriefingText.textContent =
        "Training complete. Run one live mission to bring Economy systems online.";
    } else {
      missionBriefingText.textContent =
        "Select a mission profile. Replays stay stable; harder threats come from deeper routes.";
    }
  }

  renderShipUpgradesPanel();
  renderLedgerMarket();
  renderInvestments();
  setLedgerMode(activeLedgerMode);
  if (activeHangarTab === "mission") {
    renderLevelSelect();
  }
  if (activeHangarTab === "compendium") {
    renderArchiveCompendium();
  }
  if ((!mission || !mission.active) && hangarPanel && !hangarPanel.hidden) {
    setHangarMusic();
  }
  refreshHangarTabLocks();
  if (!getTabAvailability()[activeHangarTab]) {
    setHangarTab("hub", { renderLevels: activeHangarTab === "mission" });
    return;
  }
  renderTuningPanel();
  updateMobileControls();
}

function safeUpdateHangar() {
  try {
    updateHangar();
  } catch (error) {
    console.error("Hangar render failed:", error);
  }
}

async function autoLaunchFreshPilotMission() {
  const shouldAutoLaunch =
    shouldAutoLaunchFreshPilotMission &&
    !isOnboardingSkipped() &&
    state.missionCount === 0 &&
    state.onboardingStage === 0;
  if (!shouldAutoLaunch) return;
  shouldAutoLaunchFreshPilotMission = false;
  overlay.hidden = true;
  hangarPanel.hidden = true;
  debriefPanel.hidden = true;
  updateMobileControls();
  try {
    await launchSelectedMission({ showIntro: true });
  } catch (error) {
    console.error("Failed to auto-launch intro mission:", error);
    overlay.hidden = false;
    hangarPanel.hidden = false;
    debriefPanel.hidden = true;
    safeUpdateHangar();
  }
}





function getLedgerLicenseInvestmentConfig() {
  return {
    name: "Market License",
    tiers: getMarketLicenseTiers()
      .slice(1)
      .map((config, index) => {
        const tierConfig = normalizeLedgerLicenseConfig(config, index + 1);
        return {
          cost: tierConfig.cost,
          benefit: `Tier ${tierConfig.tier}: ${tierConfig.stockLots} visible exchange lots`,
          licenseTier: tierConfig.tier,
        };
      }),
  };
}

function getInvestmentEntries() {
  return [
    ...Object.entries(investments).map(([key, data]) => ({ key, data })),
    { key: "marketLicense", data: getLedgerLicenseInvestmentConfig() },
  ];
}

function getInvestmentCurrentTier(key) {
  if (key === "marketLicense") return getLedgerLicenseTier();
  return Math.max(0, Math.floor(state.investments?.[key] || 0));
}

function getInvestmentAccentColor(accent) {
  const colors = {
    cyan: "#3fd0ff",
    amber: "#f0b429",
    violet: "#a78bfa",
    red: "#f87171",
  };
  return colors[accent] || colors.cyan;
}

function getInvestmentNodePosition(branch, index, total) {
  if (branch.nodes?.[index]) return branch.nodes[index];
  const angle = -110 + (220 / Math.max(1, total - 1)) * index;
  const radius = 34;
  return {
    x: 50 + Math.cos((angle * Math.PI) / 180) * radius,
    y: 50 + Math.sin((angle * Math.PI) / 180) * radius,
  };
}

function renderInvestmentLines(entries) {
  const lineHtml = entries
    .flatMap(({ key, data }) => {
      const branch = investmentTreeBranches[key] || {};
      const color = getInvestmentAccentColor(branch.accent);
      let previous = { x: 50, y: 50 };
      return data.tiers.map((_, index) => {
        const position = getInvestmentNodePosition(branch, index, data.tiers.length);
        const line = `<line x1="${previous.x}" y1="${previous.y}" x2="${position.x}" y2="${position.y}" stroke="${color}" />`;
        previous = position;
        return line;
      });
    })
    .join("");
  return `<svg class="investment-tree-lines" viewBox="0 0 100 100" aria-hidden="true">${lineHtml}</svg>`;
}

function renderInvestmentNode(key, data, tierConfig, index, currentTier) {
  const branch = investmentTreeBranches[key] || {};
  const position = getInvestmentNodePosition(branch, index, data.tiers.length);
  const purchased = index < currentTier;
  const next = index === currentTier;
  const affordable = next && state.credits >= tierConfig.cost;
  const color = getInvestmentAccentColor(branch.accent);
  const iconHtml = branch.iconPath
    ? `<img src="${escapeHtml(branch.iconPath)}" alt="" />`
    : `<span>${escapeHtml(branch.icon || String(index + 1))}</span>`;
  return `
    <button
      type="button"
      class="investment-tree-node${purchased ? " is-purchased" : ""}${next ? " is-next" : ""}${affordable ? " is-affordable" : ""}"
      data-invest-key="${escapeHtml(key)}"
      data-invest-tier="${index}"
      style="left:${position.x}%; top:${position.y}%; --invest-accent:${color};"
      ${affordable ? "" : "disabled"}
      title="${escapeHtml(`${data.name} tier ${index + 1}: ${tierConfig.benefit}`)}"
    >
      ${iconHtml}
      <small>${index + 1}</small>
    </button>
  `;
}

function renderInvestmentReceipt(entries) {
  const lines = entries
    .map(({ key, data }) => {
      const currentTier = getInvestmentCurrentTier(key);
      const maxTier = data.tiers.length;
      const nextTier = currentTier < maxTier ? data.tiers[currentTier] : null;
      const branch = investmentTreeBranches[key] || {};
      return `
        <div class="investment-receipt-line" style="--invest-accent:${getInvestmentAccentColor(branch.accent)};">
          <span>${escapeHtml(data.name)}</span>
          <strong>${currentTier}/${maxTier}</strong>
          <em>${escapeHtml(nextTier ? `${nextTier.benefit} | ${formatCredits(nextTier.cost)}` : "Complete")}</em>
        </div>
      `;
    })
    .join("");
  return `
    <aside class="investment-tree-receipt">
      <div class="ledger-title">Permanent Upgrades</div>
      ${lines}
    </aside>
  `;
}

function renderInvestments() {
  const container = document.getElementById("investment-tracks");
  if (!container) return;
  const entries = getInvestmentEntries();
  const nodeHtml = entries
    .map(({ key, data }) => {
      const currentTier = getInvestmentCurrentTier(key);
      return data.tiers
        .map((tierConfig, index) => renderInvestmentNode(key, data, tierConfig, index, currentTier))
        .join("");
    })
    .join("");
  container.innerHTML = `
    <div class="investment-tree-map">
      ${renderInvestmentLines(entries)}
      <div class="investment-tree-core">LEDGER</div>
      ${nodeHtml}
    </div>
    ${renderInvestmentReceipt(entries)}
  `;
  container.querySelectorAll("[data-invest-key]").forEach((button) => {
    button.addEventListener("click", () => {
      handleInvestment(button.dataset.investKey).catch((error) => {
        console.error("Investment purchase failed:", error);
      });
    });
  });
}

async function handleInvestment(key) {
  if (key === "marketLicense") {
    await purchaseLedgerLicense();
    return;
  }
  const data = investments[key];
  const tier = Math.max(0, Math.floor(state.investments?.[key] || 0));
  if (!data || tier >= data.tiers.length) return;

  const cost = data.tiers[tier].cost;
  if (state.credits < cost) return;

  state.credits -= cost;
  state.investments = state.investments || {};
  state.investments[key] = tier;
  state.investments[key] += 1;
  applyInvestmentTierReward(state, data.tiers[tier]);
  state.hulls = normalizeHullState(state.hulls);
  state.shipBuild = composeShipBuildFromArmory(state);
  syncShipBuildToLegacy();
  saveState();
  safeUpdateHangar();
}


function renderLevelSelect() {
  renderLevelSelectAsync();
}

function levelBackgroundUrl(levelMeta) {
  const bg = levelMeta?.background || "blue";
  if (GENERATED_BACKGROUND_URLS[bg]) {
    return GENERATED_BACKGROUND_URLS[bg];
  }
  return `${BG_ROOT}/${bg}.png`;
}

function estimateLevelCredits(levelMeta) {
  if (!levelMeta?.events || !levelMeta?.enemyTypes) return null;
  let total = 0;
  levelMeta.events.forEach((ev) => {
    const count = ev.count ?? 1;
    const spec = mergeLevelEnemySpec(levelMeta, ev.type) || {};
    const base = spec.baseCredit ?? 12;
    total += count * base;
  });
  return Math.round(total);
}

function getMissionLockReason(levelId) {
  if (state.debugUnlock) return "Debug: unlocked";
  const entry = availableLevels.find((level) => level.id === levelId);
  if (entry?.test) return "Test mission";
  if (Array.isArray(entry?.requires) && entry.requires.length) {
    return getMissionUnlockRequirementText(levelId);
  }
  const index = availableLevels.findIndex((level) => level.id === levelId);
  if (index <= 0) return "Unlocked";
  const requiredIndex = Math.max(1, index);
  return `Defeat Mission ${requiredIndex} to unlock.`;
}

function buildLevelVariantToBase(variantManifest) {
  const map = {};
  Object.entries(variantManifest || {}).forEach(([baseId, variants]) => {
    (Array.isArray(variants) ? variants : []).forEach((variantId) => {
      map[variantId] = baseId;
    });
  });
  return map;
}

function normalizeLevelVariantManifest(manifest) {
  const source = manifest?.variants && typeof manifest.variants === "object"
    ? manifest.variants
    : DEFAULT_LEVEL_VARIANT_MANIFEST;
  const baseIds = new Set(availableLevels.map((level) => level.id));
  const normalized = {};
  Object.entries(source).forEach(([baseId, variants]) => {
    if (!baseIds.has(baseId) || !Array.isArray(variants)) return;
    normalized[baseId] = variants
      .map((id) => String(id || "").trim())
      .filter((id) => id && id !== baseId);
  });
  return normalized;
}

async function ensureLevelManifestLoaded() {
  if (levelManifestPromise) return levelManifestPromise;
  levelManifestPromise = (async () => {
    try {
      const response = await fetch(LEVEL_MANIFEST_PATH, { cache: "no-store" });
      if (!response.ok) throw new Error("level manifest load failed");
      levelVariantManifest = normalizeLevelVariantManifest(await response.json());
    } catch (error) {
      console.warn("Level manifest load failed; using built-in variant manifest.", error);
      levelVariantManifest = normalizeLevelVariantManifest({ variants: DEFAULT_LEVEL_VARIANT_MANIFEST });
    }
    levelVariantToBase = buildLevelVariantToBase(levelVariantManifest);
    return levelVariantManifest;
  })();
  return levelManifestPromise;
}

function missionBaseIdFor(levelId) {
  if (!levelId) return levelId;
  return levelVariantToBase[levelId] || levelId;
}

function missionProgressionBaseIdFor(level) {
  if (!level?.id) return level?.id;
  const mappedBase = missionBaseIdFor(level.id);
  if (mappedBase && mappedBase !== level.id) return mappedBase;
  if (typeof level.baseLevel === "string" && level.baseLevel) return level.baseLevel;
  const match = String(level.id).match(/^(level\d+)/);
  return match ? match[1] : level.id;
}

function createDefaultBranchStanding() {
  return { chorus: 0, tithe: 0, verdant: 0, origin: 0 };
}

function normalizeAct2ProgressState(targetState) {
  if (!targetState || typeof targetState !== "object") return;
  targetState.completedMissions =
    targetState.completedMissions && typeof targetState.completedMissions === "object" && !Array.isArray(targetState.completedMissions)
      ? targetState.completedMissions
      : {};
  targetState.keyItems = Array.isArray(targetState.keyItems)
    ? Array.from(new Set(targetState.keyItems.filter((id) => typeof id === "string" && id)))
    : [];
  targetState.branchStanding = {
    ...createDefaultBranchStanding(),
    ...(targetState.branchStanding && typeof targetState.branchStanding === "object" && !Array.isArray(targetState.branchStanding)
      ? targetState.branchStanding
      : {}),
  };
  Object.keys(targetState.branchStanding).forEach((key) => {
    targetState.branchStanding[key] = Math.max(0, Math.floor(Number(targetState.branchStanding[key]) || 0));
  });

  const unlockedCount = Math.max(1, Math.floor(Number(targetState.unlockedLevels) || 1));
  availableLevels.slice(0, unlockedCount - 1).forEach((entry) => {
    if (!entry || entry.test) return;
    const current = Math.max(0, Math.floor(Number(targetState.completedMissions[entry.id]) || 0));
    targetState.completedMissions[entry.id] = Math.max(1, current);
  });
}

function getMissionEntry(levelId) {
  const baseId = missionBaseIdFor(levelId);
  return availableLevels.find((level) => level.id === baseId || level.id === levelId) || null;
}

function getMissionCompletionCount(levelId, targetState = state) {
  const baseId = missionBaseIdFor(levelId);
  const completed = targetState?.completedMissions || {};
  return Math.max(0, Math.floor(Number(completed[baseId] ?? completed[levelId]) || 0));
}

function hasCompletedMission(levelId, targetState = state) {
  return getMissionCompletionCount(levelId, targetState) > 0;
}

function hasKeyItem(keyId, targetState = state) {
  return Array.isArray(targetState?.keyItems) && targetState.keyItems.includes(keyId);
}

function getKeyItemLabel(keyId) {
  return KEY_ITEM_REGISTRY[keyId]?.name || keyId;
}

function isMissionRequirementSatisfied(requirement, targetState = state) {
  if (!isPlainObject(requirement)) return false;
  if (requirement.completed) return hasCompletedMission(requirement.completed, targetState);
  if (requirement.keyItem) return hasKeyItem(requirement.keyItem, targetState);
  return false;
}

function getMissionUnlockRequirementText(levelId) {
  const entry = getMissionEntry(levelId);
  const requires = Array.isArray(entry?.requires) ? entry.requires : [];
  if (!requires.length) return getMissionLockReason(levelId);
  if (levelId === "act2_green_signal") return "Requires: Deep Registry Shard";
  const labels = requires
    .map((requirement) => {
      if (requirement.completed) {
        const requiredEntry = getMissionEntry(requirement.completed);
        return `${(requiredEntry?.label || requirement.completed).replace(/^Act 2: /, "")} settled`;
      }
      if (requirement.keyItem) return getKeyItemLabel(requirement.keyItem);
      return "";
    })
    .filter(Boolean);
  return labels.length ? `Requires: ${labels.join(" or ")}` : "Requires: contract prerequisite";
}

function getBranchStandingLabel() {
  const standing = state?.branchStanding || createDefaultBranchStanding();
  return `${standing.chorus || 0} / ${standing.tithe || 0}`;
}

function getMissionKeyItemRewards(levelId) {
  if (levelId === "act2_doxology" || levelId === "act2_foreclosure") {
    return ["deep_registry_shard"];
  }
  return [];
}

function grantKeyItem(keyId) {
  if (!keyId) return null;
  normalizeAct2ProgressState(state);
  const alreadyHeld = state.keyItems.includes(keyId);
  if (!alreadyHeld) state.keyItems.push(keyId);
  const registry = KEY_ITEM_REGISTRY[keyId] || {};
  return {
    id: keyId,
    newlyGranted: !alreadyHeld,
    label: registry.decodedLabel || registry.name || keyId,
  };
}

function pickDebriefLoreLine(level) {
  const lines = Array.isArray(level?.debriefLore)
    ? level.debriefLore.filter((line) => typeof line === "string" && line.trim())
    : [];
  if (!lines.length) return "";
  return lines[Math.floor(Math.random() * lines.length)];
}

const missionVariantCache = new Map();
let missionVariantWarmupPromise = null;
let missionSelectRenderVersion = 0;

async function getMissionGroupIds(baseId) {
  const base = missionBaseIdFor(baseId);
  if (missionVariantCache.has(base)) {
    return [base, ...(missionVariantCache.get(base) || [])];
  }
  await ensureLevelManifestLoaded();
  const variants = (levelVariantManifest[base] || []).slice();
  missionVariantCache.set(base, variants);
  return [base, ...variants];
}

async function warmMissionVariantCache() {
  if (missionVariantWarmupPromise) return missionVariantWarmupPromise;
  missionVariantWarmupPromise = (async () => {
    await ensureLevelManifestLoaded();
    const groups = await Promise.all(availableLevels.map((level) => getMissionGroupIds(level.id)));
    const ids = new Set();
    groups.forEach((group) => group.forEach((id) => ids.add(id)));
    await Promise.all(Array.from(ids).map((id) => loadLevelMetaStrict(id)));
  })().catch((error) => {
    console.warn("Mission variant warmup failed.", error);
  });
  return missionVariantWarmupPromise;
}

async function renderLevelSelectAsync() {
  const renderVersion = ++missionSelectRenderVersion;
  if (!levelList) return;
  await warmMissionVariantCache();
  if (renderVersion !== missionSelectRenderVersion || !levelList) return;
  const directive = getCurrentOnboardingMission();
  const requiredMissionId = directive?.missionId || null;

  if (!isLevelUnlocked(selectedLevelId)) {
    const firstUnlocked = availableLevels.find((level) => isLevelUnlocked(level.id));
    if (firstUnlocked) selectedLevelId = firstUnlocked.id;
  }
  if (requiredMissionId) {
    selectedLevelId = requiredMissionId;
  }

  if (launchBtn) {
    const canLaunch =
      isLevelUnlocked(selectedLevelId) &&
      (!requiredMissionId || selectedLevelId === requiredMissionId);
    launchBtn.disabled = !canLaunch;
    launchBtn.textContent = canLaunch ? "Launch Mission" : "Locked";
  }

  const nextCards = [];
  let insertedAct2Divider = false;
  for (const level of availableLevels) {
    if (!insertedAct2Divider && level.id === ACT2_FIRST_LEVEL_ID) {
      insertedAct2Divider = true;
      const divider = document.createElement("div");
      divider.className = "mission-divider";
      divider.textContent = "Deep Claims";
      nextCards.push(divider);
    }
    const baseUnlocked = isLevelUnlocked(level.id);
    const groupIds = await getMissionGroupIds(level.id);
    if (renderVersion !== missionSelectRenderVersion) return;
    const onboardingLockedBase =
      !!requiredMissionId && !groupIds.includes(requiredMissionId);
    const cardUnlocked = baseUnlocked && !onboardingLockedBase;
    const active = groupIds.includes(selectedLevelId);
    const savedIdx = state.missionCarouselIndex?.[level.id] ?? 0;
    const selectedIdx = groupIds.indexOf(selectedLevelId);
    const requiredIdx = requiredMissionId ? groupIds.indexOf(requiredMissionId) : -1;
    const desiredIdx =
      requiredIdx >= 0 ? requiredIdx : active && selectedIdx >= 0 ? selectedIdx : savedIdx;
    const idx = Math.max(
      0,
      Math.min(groupIds.length - 1, desiredIdx)
    );
    const slideId = groupIds[idx];
    const metaData = await loadLevelMeta(slideId);
    if (renderVersion !== missionSelectRenderVersion) return;

    const bossTime = getBossSpawnTime(metaData);
    const estCredits = estimateLevelCredits(metaData);
    const backgroundUrl = levelBackgroundUrl(metaData);
    const uniqueTypes = Object.keys(metaData.enemyTypes || {}).filter((t) => t !== "boss");
    const iconTypes = uniqueTypes.slice(0, 5);

    const card = document.createElement("div");
    const infoOpen = openMissionInfoBaseId === level.id;
    card.className = `mission-card${active ? " active" : ""}${!cardUnlocked ? " locked" : ""}${infoOpen ? " info-open" : ""}`;
    card.style.setProperty("--mission-bg", `url('${backgroundUrl}')`);
    card.tabIndex = 0;

    const title = metaData.name || level.label;
    const desc = metaData.description || slideId.toUpperCase();
    const badge = metaData.difficulty || "Unknown";
    const variantLabel = groupIds.length > 1 ? `${idx + 1}/${groupIds.length}` : "";
    const branchLabel = level.contractTag || (level.branch ? ACT2_BRANCH_LABELS[level.branch] : "");
    const branchTagHtml = branchLabel
      ? `<span class="mission-branch-tag ${escapeHtml(level.contractClass || level.branch || "")}">${escapeHtml(branchLabel)}</span>`
      : "";

    const metaBits = [];
    if (bossTime) metaBits.push(`Boss ETA ${formatTime(bossTime)}`);
    if (estCredits) metaBits.push(`Est. ${estCredits} cr`);
    if (metaData.enemyScale?.hp || metaData.enemyScale?.damage) {
      const hp = metaData.enemyScale?.hp ? `HP x${formatNumber(metaData.enemyScale.hp, 2)}` : null;
      const dmg = metaData.enemyScale?.damage ? `DMG x${formatNumber(metaData.enemyScale.damage, 2)}` : null;
      metaBits.push([hp, dmg].filter(Boolean).join(" "));
    }

    const iconsHtml = iconTypes
      .map((typeId) => {
        const spriteKey = mergeLevelEnemySpec(metaData, typeId)?.sprite;
        const src = spriteSrcForKey(spriteKey);
        return `<span class="mission-icon">${src ? `<img src="${src}" alt="" />` : ""}</span>`;
      })
      .join("");

    const infoLines = [];
    infoLines.push(desc);
    if (bossTime) infoLines.push(`\nBoss spawns at ${formatTime(bossTime)}.`);
    if (estCredits) infoLines.push(`Estimated credits from spawns: ${estCredits}.`);
    if (metaData.enemyScale?.hp || metaData.enemyScale?.damage) {
      infoLines.push(
        `Enemy scaling: ${metaData.enemyScale?.hp ? `HP x${formatNumber(metaData.enemyScale.hp, 2)}` : "HP x1.00"} | ${metaData.enemyScale?.damage ? `DMG x${formatNumber(metaData.enemyScale.damage, 2)}` : "DMG x1.00"}`
      );
    }
    if (uniqueTypes.length) {
      infoLines.push(`Enemy roster: ${uniqueTypes.slice(0, 8).map(capitalize).join(", ")}${uniqueTypes.length > 8 ? "…" : ""}`);
    }
    if (branchLabel) {
      infoLines.push(`Contract channel: ${branchLabel}.`);
    }

    const lockTitle = onboardingLockedBase ? "Training" : "Locked";
    const lockReason = onboardingLockedBase
      ? `Training directive: ${directive.title}`
      : getMissionLockReason(level.id);

    card.innerHTML = `
      <div class="mission-shell">
        ${
          groupIds.length > 1
            ? `<button type="button" class="mission-arrow left" data-action="prev" aria-label="Previous variant" title="Previous variant"></button>
               <button type="button" class="mission-arrow right" data-action="next" aria-label="Next variant" title="Next variant"></button>`
            : ""
        }
        <div class="mission-top">
          <h3 class="mission-title">${title}</h3>
          <span class="mission-badge">${badge}${variantLabel ? ` <span class="muted">(${variantLabel})</span>` : ""}</span>
          ${branchTagHtml}
        </div>
        <p class="mission-desc">${desc}</p>
        <div class="mission-icons">${iconsHtml}</div>
        <div class="mission-meta">${metaBits.map((m) => `<span>${m}</span>`).join("")}</div>
        <div class="mission-actions">
          <div class="left">
            <button type="button" class="ghost small" data-action="select">${selectedLevelId === slideId ? "Selected" : "Select"}</button>
            <button type="button" class="small" data-action="launch">Launch</button>
            <button type="button" class="ghost small" data-action="info">${infoOpen ? "Close" : "More Info"}</button>
          </div>
          <div class="muted">${cardUnlocked ? "" : lockTitle}</div>
        </div>
        <div class="mission-lock">
          <div>
            <div class="lock-title">${lockTitle}</div>
            <div class="lock-desc">${lockReason}</div>
          </div>
        </div>
      </div>
      <div class="mission-hover">
        <div class="mission-hover-header">
          <h4 class="hover-title">${title}</h4>
          <button type="button" class="ghost small" data-action="close-info" aria-label="Close info">Close</button>
        </div>
        <p class="hover-body">${infoLines.join("\n")}</p>
      </div>
    `;

    const setIndex = (nextIdx) => {
      if (!cardUnlocked || requiredMissionId) return;
      if (!state.missionCarouselIndex) state.missionCarouselIndex = {};
      const wrapped = (nextIdx + groupIds.length) % groupIds.length;
      const previousScrollY = window.scrollY;
      state.missionCarouselIndex[level.id] = wrapped;
      selectedLevelId = groupIds[wrapped];
      currentLevel = null;
      openMissionInfoBaseId = null;
      saveState();
      renderLevelSelect();
      // Keep the viewport stable while cards are rerendered.
      requestAnimationFrame(() => {
        window.scrollTo(0, previousScrollY);
      });
    };

    const prevButton = card.querySelector('button[data-action="prev"]');
    const nextButton = card.querySelector('button[data-action="next"]');
    if (prevButton) {
      prevButton.disabled = !cardUnlocked || !!requiredMissionId;
      prevButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIndex(idx - 1);
      });
    }
    if (nextButton) {
      nextButton.disabled = !cardUnlocked || !!requiredMissionId;
      nextButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIndex(idx + 1);
      });
    }

    const selectButton = card.querySelector('button[data-action="select"]');
    const launchButton = card.querySelector('button[data-action="launch"]');
    const infoButton = card.querySelector('button[data-action="info"]');
    const closeInfoButton = card.querySelector('button[data-action="close-info"]');
    const infoPanel = card.querySelector(".mission-hover");
    const infoHeader = card.querySelector(".mission-hover-header");

    if (selectButton) {
      selectButton.disabled = !cardUnlocked || !!requiredMissionId;
      selectButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!cardUnlocked || requiredMissionId) return;
        selectedLevelId = slideId;
        currentLevel = null;
        openMissionInfoBaseId = null;
        renderLevelSelect();
      });
    }
    if (launchButton) {
      launchButton.disabled =
        !cardUnlocked || (requiredMissionId && slideId !== requiredMissionId);
      launchButton.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!cardUnlocked) return;
        if (requiredMissionId && slideId !== requiredMissionId) return;
        selectedLevelId = slideId;
        currentLevel = null;
        openMissionInfoBaseId = null;
        await launchSelectedMission();
      });
    }
    if (infoButton) {
      infoButton.disabled = false;
      infoButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        openMissionInfoBaseId = openMissionInfoBaseId === level.id ? null : level.id;
        renderLevelSelect();
      });
    }
    if (closeInfoButton) {
      closeInfoButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        openMissionInfoBaseId = null;
        renderLevelSelect();
      });
    }
    if (infoPanel) {
      infoPanel.addEventListener("click", (e) => e.stopPropagation());
    }
    if (infoHeader) {
      infoHeader.addEventListener("click", (e) => e.stopPropagation());
    }

    card.addEventListener("click", () => {
      if (!cardUnlocked || requiredMissionId) return;
      selectedLevelId = slideId;
      currentLevel = null;
      openMissionInfoBaseId = null;
      renderLevelSelect();
    });

    nextCards.push(card);
  }

  if (renderVersion !== missionSelectRenderVersion || !levelList) return;
  const previousHeight = levelList.offsetHeight;
  if (previousHeight > 0) {
    levelList.style.minHeight = `${previousHeight}px`;
  }
  const fragment = document.createDocumentFragment();
  nextCards.forEach((card) => fragment.appendChild(card));
  levelList.replaceChildren(fragment);
  requestAnimationFrame(() => {
    if (renderVersion !== missionSelectRenderVersion || !levelList) return;
    levelList.style.minHeight = "";
  });
}

function compendiumDisplayName(entry) {
  const fromKey = getEnemyCatalogEntry(entry.key);
  if (fromKey?.name) return fromKey.name;
  const fromType = getEnemyCatalogEntry(entry.typeId);
  if (fromType?.name) return fromType.name;
  return capitalize(entry.typeId);
}

function spriteSrcForKey(spriteKey) {
  if (!spriteKey) return "";
  if (spriteKey.startsWith("enemy")) return `${ASSET_ROOT}/Enemies/${spriteKey}.png`;
  if (spriteKey.startsWith("ufo")) return `${ASSET_ROOT}/${spriteKey}.png`;
  // fallback to the key directly if it already looks like a path
  return spriteKey;
}

function normalizeEnemyDefense(spec) {
  const hull = spec.hull ?? spec.hp ?? 0;
  const armor = spec.armor ?? 0;
  const shield = spec.shield ?? 0;
  const armorClass = spec.armorClass ?? 0;
  const shieldRegen = spec.shieldRegen ?? (shield > 0 ? 10 : 0);
  return { hull, armor, shield, armorClass, shieldRegen };
}

function describeMovement(spec) {
  const pattern = spec.pattern || "drift";
  const ai = spec.ai || "";
  if (pattern === "zigzag") return "Serpentine zig-zag descent (hard to track).";
  if (pattern === "swoop") return "Swoops in from the flank with a bobbing path.";
  if (pattern === "strafe") return "Slides side-to-side while descending slowly.";
  if (pattern === "spiral") return "Corkscrew spiral path that drifts across lanes.";
  if (pattern === "spiralIn") return "Tightening spiral that collapses inward over time.";
  if (pattern === "laneShift") return "Lane-shifts in decisive hops while maintaining pressure.";
  if (pattern === "stall") return "Hovers to hold firing lines, then resumes its descent.";
  if (pattern === "bossSweep") return "Entrances, then sweeps horizontally across the arena.";
  if (pattern === "bossAdvanceSweep") return "Pushes forward, sweeps, then regroups in repeating attack phases.";
  if (pattern === "bossOrbit") return "Orbits in a wide arc while maintaining fire discipline.";
  if (ai === "hunter") return "Actively hunts the pilot; aggression ramps as the mission drags on.";
  if (ai === "stalker") return "Lurks until you enter its aggro radius, then pursues.";
  if (ai === "transport") return "Slow hauler with mild weave; prioritizes survival over speed.";
  if (ai === "conductor") return "Holds formation and buffs linked allies until destroyed.";
  if (ai === "mimic") return "Mirrors delayed pilot movement while keeping a duel standoff.";
  if (ai === "thief") return "Seizes loose salvage, then retreats off-field with the cargo.";
  if (ai === "lien") return "Attaches near the pilot and drains live mission credits until killed.";
  if (ai === "spawner") return "Holds position and periodically spawns child drones.";
  if (ai === "splitter") return "Transport behavior that splits into smaller drones on death.";
  if (ai === "sentinel") return "Holds a firing line near the top and strafes to keep you in its sights.";
  if (ai === "skitter") return "Nervous skirmisher that attempts to dodge incoming fire.";
  if (ai === "duelist") return "Keeps a standoff distance and slides into flanking angles.";
  return "Steady descent with light drift.";
}

function describeWeapons(spec) {
  if (Array.isArray(spec.attackPatterns) && spec.attackPatterns.length) {
    const patterns = spec.attackPatterns
      .filter((pattern) => isPlainObject(pattern))
      .slice(0, 3)
      .map((pattern) => {
        const mode = pattern.mode || pattern.fireMode || "aim";
        const count = getPatternCount(pattern, mode === "aim" ? 1 : mode === "radial" ? 18 : 5);
        const profile = pattern.profile || (Array.isArray(pattern.shots) && pattern.shots[0]?.profile) || "mixed";
        const rate = Number.isFinite(pattern.fireRate) ? pattern.fireRate : spec.fireRate ?? 2.2;
        return `${capitalize(mode)} ${count > 1 ? `x${count}` : "shot"} (${profile}, ${formatNumber(rate, 2)}s)`;
      });
    return `Profiled attack patterns: ${patterns.join("; ")}.`;
  }
  const mode = spec.fireMode || "aim";
  const rate = spec.fireRate ?? 2.2;
  const speed = spec.bulletSpeed;
  const count = spec.fireCount;
  const spread = spec.fireSpread;

  const cadence =
    rate <= 0.9
      ? "high cadence"
      : rate <= 1.6
        ? "medium cadence"
        : "low cadence";

  if (mode === "radial") {
    return `Radial barrage (${count || 18} shots), ${cadence}.`;
  }
  if (mode === "spread") {
    return `Spread volley (${count || 5} shots, ${(spread || 0.8).toFixed(1)} rad), ${cadence}.`;
  }
  const bs = speed ? ` Bullet speed ~${Math.round(speed)}.` : "";
  return `Aimed shots, ${cadence}.${bs}`;
}

function describeDefense(spec) {
  const d = normalizeEnemyDefense(spec);
  const parts = [];
  if (d.shield > 0) {
    parts.push(`Shields ${d.shield}${d.shieldRegen ? ` (+${Math.round(d.shieldRegen)}/s regen)` : ""}`);
  }
  if (d.armor > 0) {
    parts.push(`Armor ${d.armor}${d.armorClass ? ` (AC ${d.armorClass})` : ""}`);
  }
  parts.push(`Hull ${d.hull}`);
  const extra = spec.empImmune ? " EMP-immune." : "";
  return `${parts.join(" | ")}.${extra}`;
}

function compendiumKeyFor(levelId, typeId, spec) {
  const isBoss = !!spec?.isBoss || typeId === "boss";
  return isBoss ? `${levelId}:boss` : typeId;
}

let compendiumCache = null;
let compendiumLoading = null;

async function buildCompendium() {
  if (compendiumCache) return compendiumCache;
  if (compendiumLoading) return compendiumLoading;
  compendiumLoading = (async () => {
    await ensureEnemyCatalogLoaded();
    await ensureLevelManifestLoaded();
    const uniqueIds = Array.from(
      new Set(
        availableLevels.flatMap((level) => [
          level.id,
          ...(levelVariantManifest[level.id] || []),
        ])
      )
    );
    const levels = (
      await Promise.all(uniqueIds.map((id) => loadLevelMetaStrict(id)))
    ).filter(Boolean);
    const byKey = new Map();
    levels.forEach((level) => {
      const levelId = level.id;
      const enemyTypes = level.enemyTypes || {};
      Object.keys(enemyTypes).forEach((typeId) => {
        const spec = mergeLevelEnemySpec(level, typeId) || {};
        const key = compendiumKeyFor(levelId, typeId, spec);
        const entry = byKey.get(key) || {
          key,
          typeId,
          isBoss: !!spec.isBoss || typeId === "boss",
          spec,
          sources: [],
        };
        entry.sources.push({
          levelId,
          levelName: level.name || levelId,
          difficulty: level.difficulty || "Unknown",
        });
        // Prefer the first non-empty spec, but always keep a boss spec per boss key.
        if (!entry.spec || Object.keys(entry.spec).length === 0) {
          entry.spec = spec;
        }
        byKey.set(key, entry);
      });
    });

    // Include catalog entries even if they're not present in any mission yet (prototype visibility).
    const catalogEntries = enemyCatalog?.entries || {};
    Object.keys(catalogEntries).forEach((catalogKey) => {
      if (byKey.has(catalogKey)) return;
      // Only include entries that look like a drone id or a boss key.
      const def = catalogEntries[catalogKey];
      if (!def || (!def.name && !def.template)) return;
      byKey.set(catalogKey, {
        key: catalogKey,
        typeId: catalogKey,
        isBoss: !!def.boss || catalogKey.includes(":boss"),
        spec: def.template || {},
        sources: [],
      });
    });

    const list = Array.from(byKey.values());
    // Stable, friendly ordering: non-boss first, then bosses; within groups by name.
    list.sort((a, b) => {
      if (a.isBoss !== b.isBoss) return a.isBoss ? 1 : -1;
      const an = compendiumDisplayName(a).toLowerCase();
      const bn = compendiumDisplayName(b).toLowerCase();
      return an.localeCompare(bn);
    });
    compendiumCache = list;
    compendiumLoading = null;
    return list;
  })();
  return compendiumLoading;
}

function makeCompendiumDescription(entry) {
  const spec = entry.spec || {};
  const movement = describeMovement(spec);
  const weapons = describeWeapons(spec);
  const defense = describeDefense(spec);
  const speed = spec.speed ? `Top speed ~${Math.round(spec.speed)}.` : "";
  const aggro = spec.ai === "stalker" && spec.aggroRadius ? `Aggro radius ~${Math.round(spec.aggroRadius)}.` : "";
  const notes = [movement, weapons, defense, speed, aggro].filter(Boolean).join("\n");
  return notes;
}

function renderArchiveChrome() {
  const isItemMode = activeCompendiumMode === "items";
  if (archiveTitle) archiveTitle.textContent = isItemMode ? "Item Records" : "Drone Records";
  compendiumModeButtons.forEach((button) => {
    const active = button.dataset.compendiumMode === activeCompendiumMode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });
  const bossToggle = compendiumShowBosses?.closest("label");
  if (bossToggle) bossToggle.hidden = isItemMode;
  if (archiveSort) archiveSort.hidden = !isItemMode;
  if (archiveFilter) archiveFilter.hidden = !isItemMode;
  if (relicArchive) relicArchive.hidden = isItemMode;
}

function renderArchiveCompendium() {
  renderArchiveChrome();
  if (activeCompendiumMode === "items") {
    renderItemCompendiumAsync();
    return;
  }
  renderDroneCompendiumAsync();
}

function renderDroneCompendium() {
  activeCompendiumMode = "drones";
  renderArchiveCompendium();
}

function renderRelicArchive() {
  if (!relicArchive) return;
  const relics = Object.values(getRelicCollection(state)).sort(
    (a, b) => (a.discoveredAt || 0) - (b.discoveredAt || 0)
  );
  if (!relics.length) {
    relicArchive.innerHTML = `
      <div class="relic-archive-head">
        <div>
          <p class="armory-kicker">Pre-Founding Relics</p>
          <h3>Collection Records</h3>
        </div>
        <span class="relic-count">0 logged</span>
      </div>
      <div class="relic-empty">No relic records filed.</div>
    `;
    return;
  }
  relicArchive.innerHTML = `
    <div class="relic-archive-head">
      <div>
        <p class="armory-kicker">Pre-Founding Relics</p>
        <h3>Collection Records</h3>
      </div>
      <span class="relic-count">${relics.length} logged</span>
    </div>
    <div class="relic-archive-list">
      ${relics
        .map((entry) => {
          const tags = Array.isArray(entry.tags) ? entry.tags.slice(0, 4) : [];
          return `
            <article class="relic-card">
              <div class="relic-card-top">
                <div>
                  <div class="relic-name">${escapeHtml(entry.baseName || entry.name)}</div>
                  <div class="relic-meta">${escapeHtml(entry.uniquePropertyName || "Unique trace")} | ${entry.count} found</div>
                </div>
                <span class="tag warn">RELIC</span>
              </div>
              <p class="relic-lore">${escapeHtml(entry.lore)}</p>
              <div class="compendium-tags">${tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

async function renderDroneCompendiumAsync() {
  renderRelicArchive();
  if (!compendiumList) return;
  compendiumList.innerHTML = `<div class="muted">Loading intel…</div>`;

  const query = (compendiumSearch?.value || "").trim().toLowerCase();
  const showBosses = compendiumShowBosses ? !!compendiumShowBosses.checked : true;
  const list = await buildCompendium();
  const showFull = !!state.debugShowFullCompendium;
  const encountered = state.encounteredEnemies || {};
  const gatedList = showFull ? list : list.filter((entry) => !!encountered[entry.key]);

  const filtered = gatedList.filter((entry) => {
    if (!showBosses && entry.isBoss) return false;
    if (!query) return true;
    const name = compendiumDisplayName(entry).toLowerCase();
    const sprite = (entry.spec?.sprite || "").toLowerCase();
    const pattern = (entry.spec?.pattern || "").toLowerCase();
    const ai = (entry.spec?.ai || "").toLowerCase();
    const hay = `${name} ${sprite} ${pattern} ${ai}`;
    return hay.includes(query);
  });

  compendiumList.innerHTML = "";
  filtered.forEach((entry) => {
    const spec = entry.spec || {};
    const displayName = compendiumDisplayName(entry);
    const spriteSrc = spriteSrcForKey(spec.sprite);
    const kills = state.killsByEnemyKey?.[entry.key] ?? 0;
    const tags = [];
    if (spec.ai) tags.push(spec.ai);
    if (spec.pattern) tags.push(spec.pattern);
    if (spec.fireMode) tags.push(spec.fireMode);
    if (spec.empImmune) tags.push("EMP-immune");
    if (normalizeEnemyDefense(spec).armor > 0) tags.push("armored");
    if (normalizeEnemyDefense(spec).shield > 0) tags.push("shielded");

    const firstSource = entry.sources[0];
    const subtitle = entry.sources?.length
      ? entry.isBoss
        ? `Boss target | ${firstSource?.levelName || "Unknown mission"} | Destroyed: ${kills}`
        : `Seen in: ${entry.sources.slice(0, 2).map((s) => s.levelName).join(", ")}${entry.sources.length > 2 ? "…" : ""} | Destroyed: ${kills}`
      : `Prototype entry (unseen) | Destroyed: ${kills}`;

    const card = document.createElement("div");
    card.className = `compendium-card${entry.isBoss ? " boss" : ""}`;
    card.innerHTML = `
      <div class="compendium-sprite">
        ${spriteSrc ? `<img src="${spriteSrc}" alt="${displayName}" loading="lazy" />` : ""}
      </div>
      <div class="compendium-body">
        <h3 class="compendium-title">${displayName}</h3>
        <p class="compendium-subtitle">${subtitle}</p>
        <div class="compendium-tags">
          ${entry.isBoss ? `<span class="tag warn">BOSS</span>` : ""}
          ${tags.slice(0, 5).map((tag) => `<span class="tag${tag === "EMP-immune" ? " warn" : ""}">${tag}</span>`).join("")}
        </div>
      </div>
      <div class="compendium-details">${makeCompendiumDescription(entry)}</div>
    `;
    compendiumList.appendChild(card);
  });

  if (!filtered.length) {
    compendiumList.innerHTML = showFull
      ? `<div class="muted">No matching drones found.</div>`
      : `<div class="muted">No intel yet. Encounter enemies in missions to populate the compendium.</div>`;
  }
  renderRelicArchive();
}

function getItemCatalogEntries() {
  const catalog = itemPoolCatalog || { entries: {}, relics: {} };
  const regularItems = Object.entries(catalog.entries || {}).map(([baseId, entry]) => ({
    baseId,
    isRelic: false,
    ...entry,
  }));
  const relicItems = Object.entries(catalog.relics || {}).map(([baseId, entry]) => ({
    baseId,
    isRelic: true,
    tier: entry.tier || 4,
    ...entry,
  }));
  const slotOrder = { primary: 0, mini: 1, defense: 2, aux: 3 };
  return [...regularItems, ...relicItems].sort((a, b) => {
    const aSlot = slotOrder[normalizeArmorySlotType(a.slotType)] ?? 9;
    const bSlot = slotOrder[normalizeArmorySlotType(b.slotType)] ?? 9;
    if (aSlot !== bSlot) return aSlot - bSlot;
    if ((a.tier || 1) !== (b.tier || 1)) return (a.tier || 1) - (b.tier || 1);
    return String(a.name || a.baseId).localeCompare(String(b.name || b.baseId));
  });
}

function addSourceItemDiscovery(ids, sourceId, slotType) {
  const baseId = findCatalogBaseIdBySourceId(sourceId, slotType);
  if (baseId) ids.add(baseId);
}

function getDiscoveredItemBaseIds() {
  const ids = new Set(Object.keys(getItemCollection(state)));
  getArmoryInventory(state).forEach((item) => {
    const baseId = getCatalogBaseIdForItem(item);
    if (baseId) ids.add(baseId);
  });
  (state.armory?.ownedLoadoutIds || []).forEach((id) => addSourceItemDiscovery(ids, id, "primary"));
  (state.armory?.ownedDefenseModuleIds || []).forEach((id) => addSourceItemDiscovery(ids, id, "defense"));
  (state.armory?.ownedMiniWeaponIds || []).forEach((id) => addSourceItemDiscovery(ids, id, "mini"));
  Object.entries(state.unlocked?.aux || {}).forEach(([id, unlocked]) => {
    if (unlocked) addSourceItemDiscovery(ids, id, "aux");
  });
  if (state.rmbWeapon) addSourceItemDiscovery(ids, state.rmbWeapon, "aux");
  return ids;
}

function getItemCatalogSubtitle(entry, foundCount) {
  const slot = normalizeArmorySlotType(entry.slotType);
  const tier = entry.isRelic ? "Pre-Founding relic" : `Tier ${entry.tier || 1}`;
  const found = foundCount > 0 ? ` | ${foundCount} found` : "";
  if (slot === "primary") {
    const ammo = capitalize(entry.build?.ammo || "kinetic");
    return `${tier} | ${ammo} primary${found}`;
  }
  if (slot === "defense") {
    return `${tier} | ${capitalize(entry.defenseType || "defense")} module${found}`;
  }
  if (slot === "mini") {
    const mini = entry.miniWeapon || {};
    return `${tier} | ${getMiniArcLabel(mini)} mini${found}`;
  }
  return `${tier} | ${capitalize(entry.ability || "aux")} support${found}`;
}

function getPrimaryCatalogDetails(entry) {
  const build = entry.build || {};
  const effect = build.effect || "none";
  const lines = [
    `Pattern: ${getSpreadLabel(build.spread || "focused")}`,
    `Ammo: ${capitalize(build.ammo || "kinetic")}`,
  ];
  if (effect && effect !== "none") {
    lines.push(`Innate effect: ${capitalize(effect)}`);
  } else {
    lines.push("Rolls: homing, explosive, pierce, vampiric");
  }
  const diameter = build.gunDiameter ? `${capitalize(build.gunDiameter)} bore` : "";
  const rate = Number.isFinite(build.flowRateLevel) ? `Shots per Second +${build.flowRateLevel}` : "";
  const size = Number.isFinite(build.flowSizeLevel) ? `Size +${build.flowSizeLevel}` : "";
  const tuning = [diameter, rate, size].filter(Boolean).join(" | ");
  if (tuning) lines.push(tuning);
  return lines.join("\n");
}

function getDefenseCatalogDetails(entry) {
  const build = entry.build || {};
  if (entry.defenseType === "shield") {
    return [
      `Shield capacity tune: ${build.shieldMaxLevel ?? 0}`,
      `Shield regen tune: ${build.shieldRegenLevel ?? 0}`,
      `Recovery delay tune: ${build.shieldCooldownLevel ?? 0}`,
    ].join("\n");
  }
  if (entry.defenseType === "armor") {
    return [
      `Armor volume tune: ${build.armorAmountLevel ?? 0}`,
      `Armor class: ${build.armorClass ?? 10}`,
      `Shots per Second drag: ${build.armorDragLevel ?? 0}`,
    ].join("\n");
  }
  return "Defense module.";
}

function getMiniCatalogDetails(entry) {
  const mini = entry.miniWeapon || {};
  return [
    `Damage: ${formatNumber(mini.damage || 0, 1)} per shot`,
    `Shots per Second: ${mini.cooldown ? formatNumber(1 / mini.cooldown, 2) : "0"}`,
    `Targeting: ${getMiniArcLabel(mini)} | ${mini.range || 0}px`,
    `Ammo: ${capitalize(mini.ammo || "kinetic")}`,
  ].join("\n");
}

function getItemCatalogDetails(entry) {
  const slot = normalizeArmorySlotType(entry.slotType);
  if (slot === "primary") return getPrimaryCatalogDetails(entry);
  if (slot === "defense") return getDefenseCatalogDetails(entry);
  if (slot === "mini") return getMiniCatalogDetails(entry);
  return `Support system: ${capitalize(entry.ability || entry.sourceId || "aux")}`;
}

function itemCatalogMatchesQuery(entry, query) {
  if (!query) return true;
  const build = entry.build || {};
  const tags = Array.isArray(entry.tags) ? entry.tags.join(" ") : "";
  const hay = [
    entry.name,
    entry.subtitle,
    entry.description,
    entry.baseId,
    entry.sourceId,
    entry.slotType,
    entry.defenseType,
    entry.ability,
    build.spread,
    build.ammo,
    build.effect,
    entry.miniWeapon?.ammo,
    entry.miniWeapon?.cadence,
    entry.miniWeapon?.arc,
    entry.miniWeapon?.role,
    tags,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return hay.includes(query);
}

async function renderItemCompendiumAsync() {
  if (!compendiumList) return;
  compendiumList.innerHTML = `<div class="muted">Loading item records...</div>`;
  await ensureItemPoolLoaded();
  if (activeCompendiumMode !== "items") return;
  const query = (compendiumSearch?.value || "").trim().toLowerCase();
  const sort = archiveSort?.value || "recent";
  const filter = archiveFilter?.value || "all";
  const showAll = !!state.debugShowAllItems;
  const discovered = getDiscoveredItemBaseIds();
  const collection = getItemCollection(state);
  const list = getItemCatalogEntries();
  const gatedList = showAll ? list : list.filter((entry) => discovered.has(entry.baseId));
  const filtered = filterAndSortBrowserItems(
    gatedList
      .filter((entry) => itemCatalogMatchesQuery(entry, query))
      .map((entry) => ({
        ...entry,
        id: entry.baseId,
        rarity: entry.isRelic ? "preFounding" : entry.rarity || "",
      })),
    { filter, sort }
  );

  compendiumList.innerHTML = "";
  let renderedCount = 0;
  filtered.forEach((entry) => {
    renderedCount += 1;
    const foundCount = collection[entry.baseId]?.count || (discovered.has(entry.baseId) ? 1 : 0);
    const tags = Array.isArray(entry.tags) ? entry.tags.slice(0, 5) : [];
    const slot = normalizeArmorySlotType(entry.slotType);
    const card = document.createElement("div");
    card.className = `compendium-card item${entry.isRelic ? " boss" : ""}`;
    card.innerHTML = `
      <div class="compendium-sprite">
        ${entry.icon ? `<img src="${escapeHtml(entry.icon)}" alt="" loading="lazy" />` : ""}
      </div>
      <div class="compendium-body">
        <h3 class="compendium-title">${escapeHtml(entry.name || entry.baseId)}</h3>
        <p class="compendium-subtitle">${escapeHtml(getItemCatalogSubtitle(entry, foundCount))}</p>
        <div class="compendium-tags">
          ${entry.isRelic ? `<span class="tag warn">RELIC</span>` : ""}
          <span class="tag">${escapeHtml(slot)}</span>
          ${tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
        </div>
      </div>
      <div class="compendium-details">${escapeHtml(getItemCatalogDetails(entry))}</div>
    `;
    compendiumList.appendChild(card);
  });
  const keyItemEntries = (state.keyItems || [])
    .map((keyId) => ({ keyId, ...(KEY_ITEM_REGISTRY[keyId] || {}) }))
    .filter((entry) => {
      if (filter !== "all" && filter !== "relic") return false;
      if (!query) return true;
      return `${entry.name || entry.keyId} ${entry.archive || ""}`.toLowerCase().includes(query);
    });
  keyItemEntries.forEach((entry) => {
    renderedCount += 1;
    const card = document.createElement("div");
    card.className = "compendium-card item boss";
    card.innerHTML = `
      <div class="compendium-sprite key-item-sprite">KEY</div>
      <div class="compendium-body">
        <h3 class="compendium-title">${escapeHtml(entry.name || entry.keyId)}</h3>
        <p class="compendium-subtitle">Key item decoded</p>
        <div class="compendium-tags">
          <span class="tag warn">KEY ITEM</span>
          <span class="tag">Act 2</span>
        </div>
      </div>
      <div class="compendium-details">${escapeHtml(entry.archive || "Recovered campaign key item.")}</div>
    `;
    compendiumList.appendChild(card);
  });

  if (!renderedCount) {
    compendiumList.innerHTML = showAll
      ? `<div class="muted">No matching items found.</div>`
      : `<div class="muted">No item records yet. Keep or buy salvage to populate the item archive.</div>`;
  }
}

const upgradeCategories = {
  primary: ["damage", "fireRate"],
  aux: ["auxCooldown", "cloakDuration"],
  ship: ["hull", "shield"],
};

const upgradeRequirements = {};


function ensureComponentSelection(key, options) {
  const credits = state.lifetimeCredits;
  const current = state.weapon[key];
  const currentOption = options.find((option) => option.id === current);
  const unlocked = state.unlocked?.[key] || {};
  const isUnlocked =
    currentOption && (state.debugUnlock || unlocked[currentOption.id]);
  if (isUnlocked) return;
  const firstUnlocked = options.find((option) => {
    const rankOk = credits >= option.unlockAt || state.debugUnlock;
    return rankOk && (state.debugUnlock || unlocked[option.id]);
  });
  if (firstUnlocked) {
    state.weapon[key] = firstUnlocked.id;
    saveState();
  }
}

function ensureAuxSelection() {
  // A linked support ITEM is authoritative: its rolled ability drives the alternate action,
  // independent of the legacy credit-gated unlock track. Without this, equipping a looted
  // bulwark/EMP that the player never unlocked the old way would get silently reset to cloak.
  const supportItem = findInventoryItem(state.armory?.equippedSupportItemId);
  if (supportItem && isSupportSlotType(supportItem.slotType)) {
    const ability = supportItem.ability || supportItem.sourceId || "cloak";
    if (state.rmbWeapon !== ability) {
      state.rmbWeapon = ability;
      saveState();
    }
    return;
  }
  const credits = state.lifetimeCredits;
  const unlockedAux = state.unlocked?.aux || {};
  const current = rmbWeapons.find((weapon) => weapon.id === state.rmbWeapon);
  const isUnlocked =
    current &&
    (state.debugUnlock ||
      (unlockedAux[current.id] && credits >= (current.unlockAt ?? 0)));
  if (isUnlocked) return;
  const firstUnlocked = rmbWeapons.find((weapon) => {
    const rankOk = credits >= (weapon.unlockAt ?? 0) || state.debugUnlock;
    return rankOk && (state.debugUnlock || unlockedAux[weapon.id]);
  });
  if (firstUnlocked) {
    state.rmbWeapon = firstUnlocked.id;
    saveState();
  }
}





function shipPanelUpgradeCost(baseCost, level) {
  const exponent = getEconomyConfig().legacyCreditGates.shipPanelCostExponent;
  return Math.round(baseCost * Math.pow(exponent, level));
}

function formatNumber(value, decimals = 1) {
  if (!Number.isFinite(value)) return "-";
  return value.toFixed(decimals);
}

function getSpreadLabel(spread) {
  return WEAPON_SPREAD_LABELS[spread] || capitalize(spread || "focused");
}

function getRarityRank(rarity) {
  const index = ECONOMY.rarityOrder.indexOf(rarity);
  return index === -1 ? -1 : index;
}

function getMiniWeaponConfigFromItem(item) {
  if (!item) return null;
  if (starterMiniWeaponsById[item.id] && !item.rarity) return starterMiniWeaponsById[item.id].miniWeapon;
  if (item.miniWeapon && typeof item.miniWeapon === "object") {
    normalizeSavedMiniItem(item);
    return item.miniWeapon;
  }
  return null;
}

function getMiniArcLabel(config) {
  if (!config) return "Mini";
  if (config.arc === "turret") return "360";
  if (config.arc === "wide") return "Wide arc";
  return "Forward arc";
}

function getItemBrowserRole(item) {
  const slotType = normalizeArmorySlotType(item?.slotType);
  if (slotType === "primary") {
    const build = item?.build || {};
    return `${getSpreadLabel(build.spread || "focused")} ${capitalize(build.ammo || "kinetic")}`;
  }
  if (slotType === "mini") {
    const cfg = getMiniWeaponConfigFromItem(item);
    return `${getMiniArcLabel(cfg)} ${capitalize(cfg?.cadence || "mini")} ${capitalize(cfg?.ammo || "kinetic")}`;
  }
  if (slotType === "defense") return item?.defenseType ? capitalize(item.defenseType) : "Defense";
  if (slotType === "hull") return item?.subtitle || "Hull";
  if (isSupportSlotType(slotType)) return capitalize(item?.ability || item?.sourceId || "Support");
  return "Module";
}

function isItemRelic(item) {
  const tags = Array.isArray(item?.tags) ? item.tags : [];
  return !!(item?.relicId || item?.rarity === "preFounding" || tags.includes("relic"));
}

function getItemBrowserValue(item, valueResolver = null) {
  if (valueResolver) return valueResolver(item);
  if (Number.isFinite(item?.value)) return item.value;
  if (Number.isFinite(item?.cost)) return item.cost;
  return 0;
}

function isItemBrowserInstalled(item) {
  if (!item) return false;
  if (item.installed) return true;
  if (normalizeArmorySlotType(item.slotType) === "hull") {
    return getEquippedHull()?.id === item.id;
  }
  return isInventoryItemInstalled(item.id);
}

function getItemBrowserSearchText(item) {
  const tags = Array.isArray(item?.tags) ? item.tags.join(" ") : "";
  const rarity = item?.rarity ? `${item.rarity} ${getRarityLabel(item.rarity)}` : "";
  const build = item?.build || {};
  const mini = getMiniWeaponConfigFromItem(item) || {};
  return [
    item?.name,
    item?.baseName,
    item?.subtitle,
    item?.description,
    item?.notes,
    item?.baseId,
    item?.sourceId,
    item?.slotType,
    item?.defenseType,
    item?.ability,
    build.spread,
    build.ammo,
    build.effect,
    mini.ammo,
    mini.cadence,
    mini.arc,
    mini.role,
    getItemBrowserRole(item),
    rarity,
    tags,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function itemMatchesBrowserQuery(item, query) {
  if (!query) return true;
  return getItemBrowserSearchText(item).includes(String(query).toLowerCase());
}

function itemMatchesBrowserFilter(item, filter) {
  const slotType = normalizeArmorySlotType(item?.slotType);
  if (!filter || filter === "all") return true;
  if (filter === "equipped") return isItemBrowserInstalled(item);
  if (filter === "sellable") return !isItemBrowserInstalled(item);
  if (filter === "relic") return isItemRelic(item);
  if (filter === "aux") return isSupportSlotType(slotType);
  return slotType === normalizeArmorySlotType(filter);
}

function filterAndSortBrowserItems(
  items,
  { query = "", filter = "all", sort = "recent", valueResolver = null } = {}
) {
  const slotOrder = { hull: 0, primary: 1, mini: 2, defense: 3, aux: 4, support: 4 };
  return items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => itemMatchesBrowserQuery(item, query))
    .filter(({ item }) => itemMatchesBrowserFilter(item, filter))
    .sort((a, b) => {
      if (sort === "rarity") {
        const rarityDiff = getRarityRank(b.item.rarity) - getRarityRank(a.item.rarity);
        if (rarityDiff) return rarityDiff;
      } else if (sort === "slot") {
        const aSlot = slotOrder[normalizeArmorySlotType(a.item.slotType)] ?? 9;
        const bSlot = slotOrder[normalizeArmorySlotType(b.item.slotType)] ?? 9;
        if (aSlot !== bSlot) return aSlot - bSlot;
      } else if (sort === "value") {
        const valueDiff = getItemBrowserValue(b.item, valueResolver) - getItemBrowserValue(a.item, valueResolver);
        if (valueDiff) return valueDiff;
      } else if (sort === "role") {
        const roleDiff = getItemBrowserRole(a.item).localeCompare(getItemBrowserRole(b.item));
        if (roleDiff) return roleDiff;
      } else {
        return b.index - a.index;
      }
      return String(a.item.name || a.item.id).localeCompare(String(b.item.name || b.item.id));
    })
    .map(({ item }) => item);
}

function getComparableDefenseSlotIdForItem(item, targetState = state) {
  const equippedIds = Array.isArray(targetState.armory?.equippedDefenseSlotIds)
    ? targetState.armory.equippedDefenseSlotIds.slice(0, 2)
    : ["shield_module", "none"];
  while (equippedIds.length < 2) equippedIds.push("none");
  const exactIndex = equippedIds.findIndex((id) => id && id !== "none" && id === item?.id);
  if (exactIndex >= 0) return `defense-${exactIndex}`;
  const emptyIndex = equippedIds.findIndex((id) => !id || id === "none");
  if (emptyIndex >= 0) return `defense-${emptyIndex}`;
  const itemDefenseType = item?.defenseType || null;
  const matchingTypeIndex = equippedIds.findIndex((id) => {
    const equipped = getDefenseArmoryItemById(id, targetState);
    return equipped?.defenseType && equipped.defenseType === itemDefenseType;
  });
  if (matchingTypeIndex >= 0) return `defense-${matchingTypeIndex}`;
  return "defense-0";
}

function getComparableSlotIdForItem(item, slotId = null, targetState = state) {
  if (slotId) return slotId;
  const slotType = normalizeArmorySlotType(item?.slotType);
  if (slotType === "defense") return getComparableDefenseSlotIdForItem(item, targetState);
  if (slotType === "mini") return "mini";
  if (slotType === "hull") return "hull";
  if (isSupportSlotType(slotType)) return "support";
  return "primary";
}

function getCompactItemName(item) {
  if (!item) return "Open";
  if (item.baseName) return item.baseName;
  let name = String(item.name || item.id || "Item").trim();
  const rarityLabels = Object.values(ECONOMY.rarities || {})
    .map((config) => config?.label)
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);
  for (const label of rarityLabels) {
    if (name.startsWith(`${label} `)) {
      name = name.slice(label.length + 1).trim();
      break;
    }
  }
  return name.split(" — ")[0].trim() || name;
}

function getInstalledSlotVisualRarity(item) {
  if (!item) return null;
  return item.rarity || "certified";
}

function getDenseItemRoleLabel(item) {
  const slotType = normalizeArmorySlotType(item?.slotType);
  if (slotType === "primary") return "Primary";
  if (slotType === "mini") return "Mini";
  if (slotType === "defense") return item?.defenseType ? capitalize(item.defenseType) : "Defense";
  if (slotType === "hull") return "Hull";
  if (isSupportSlotType(slotType)) return "Support";
  return "Module";
}

function getItemTypeKey(item, slotId = null) {
  const resolvedSlot = slotId || getComparableSlotIdForItem(item);
  if (resolvedSlot === "primary" || resolvedSlot === "primary-2") return "primary";
  if (resolvedSlot === "mini") return "mini";
  if (resolvedSlot === "hull") return "hull";
  if (resolvedSlot?.startsWith("defense-")) return "defense";
  const slotType = normalizeArmorySlotType(item?.slotType);
  if (slotType === "primary" || slotType === "mini" || slotType === "defense" || slotType === "hull") {
    return slotType;
  }
  if (isSupportSlotType(slotType)) return "aux";
  return "module";
}

function getItemTypeBadge(item, slotId = null) {
  const type = getItemTypeKey(item, slotId);
  const labels = {
    primary: "Weapon",
    mini: "Auto",
    defense: "Defense",
    aux: "Aux",
    hull: "Hull",
    module: "Module",
  };
  return labels[type] || "Module";
}

function getItemTypeLine(item, build, slotId) {
  const rarityLabel = item?.rarity ? getRarityLabel(item.rarity) : "Standard";
  if (slotId === "primary") {
    return `${rarityLabel} ${capitalize(build?.ammo || "kinetic")} Cannon`;
  }
  if (slotId === "primary-2") {
    return `${rarityLabel} ${capitalize(build?.ammo || "kinetic")} Swap Cannon`;
  }
  if (slotId === "mini") {
    const cfg = getMiniWeaponConfigFromItem(item);
    return `${rarityLabel} ${getMiniArcLabel(cfg)} Mini Weapon`;
  }
  if (slotId === "hull") {
    return `${rarityLabel} Hull Chassis`;
  }
  if (slotId?.startsWith("defense-")) {
    const kind = item?.id === "none" ? "Open Bay" : capitalize(item?.defenseType || "Defense");
    return `${rarityLabel} ${kind} Module`;
  }
  return `${rarityLabel} Support Module`;
}

function getSupportAbilityId(targetState = state) {
  const supportItem = findInventoryItem(targetState.armory?.equippedSupportItemId, targetState);
  if (supportItem && isSupportSlotType(supportItem.slotType)) {
    return supportItem.ability || supportItem.sourceId || "cloak";
  }
  return targetState.rmbWeapon || "cloak";
}

function getSupportStatsForState(targetState = state) {
  const auxCooldownLevel = targetState.upgrades?.auxCooldown ?? 0;
  const ability = getSupportAbilityId(targetState);
  const supportItem = findInventoryItem(targetState.armory?.equippedSupportItemId, targetState);
  const rollLabel = Number.isFinite(supportItem?.rollQuality)
    ? ` (roll ${Math.round(supportItem.rollQuality * 100)}%)`
    : "";
  const genericCooldown = Math.max(0.35, 0.9 * Math.pow(0.92, auxCooldownLevel));
  const cloakStats = getAuxRuntimeStats("cloak", targetState);
  const empStats = getAuxRuntimeStats("emp", targetState);
  const bulwarkStats = getAuxRuntimeStats("bulwark", targetState);
  const abilityConfig = {
    cloak: {
      name: "Cloaking Device",
      cooldown: cloakStats.cooldown,
      duration: cloakStats.duration,
      effect: `Breaks enemy lock-on for ${formatNumber(cloakStats.duration, 1)}s.`,
      math: `Rolled cloak${rollLabel}: ${formatNumber(cloakStats.duration, 1)}s hide / ${formatNumber(cloakStats.cooldown, 1)}s cooldown.`,
    },
    emp: {
      name: "EMP Burst",
      cooldown: empStats.cooldown,
      duration: empStats.duration,
      effect: `Disables enemy fire for ${formatNumber(empStats.duration, 1)}s and clears hostile shots within ${empStats.clearRadius}px.`,
      math: `Rolled EMP${rollLabel}: ${formatNumber(empStats.duration, 1)}s / ${empStats.clearRadius}px / ${formatNumber(empStats.cooldown, 1)}s cooldown.`,
    },
    bulwark: {
      name: "Bulwark Field",
      cooldown: genericCooldown,
      duration: bulwarkStats.duration,
      effect: `Adds a temporary ${bulwarkStats.shieldBonus} shield buffer.`,
      math: `Rolled bulwark${rollLabel}: +${bulwarkStats.shieldBonus} shield for ${formatNumber(bulwarkStats.duration, 1)}s.`,
    },
  };
  return abilityConfig[ability] || {
    name: "No support",
    cooldown: 0,
    duration: 0,
    effect: "No alternate system installed.",
    math: "",
  };
}

function getDefenseStatsForBuild(build, targetState = state) {
  const defenseSlots = Array.isArray(build?.defenseSlots) ? build.defenseSlots : ["shield", "none"];
  const shieldSlots = defenseSlots.filter((slot) => slot === "shield").length;
  const armorSlots = defenseSlots.filter((slot) => slot === "armor").length;
  const hullLevel = targetState.upgrades?.hull ?? 0;
  const hull = Math.round(100 * (1 + hullLevel * 0.08) * (build.hullMult ?? 1));
  const shieldCapacitySlots = Math.max(0.25, shieldSlots + (build.shieldMaxLevel ?? 0) * 0.18);
  const shield = shieldSlots > 0
    ? Math.round(40 * shieldCapacitySlots * (build.shieldMaxMult ?? 1))
    : 0;
  const shieldRegenSlots = Math.max(0.2, shieldSlots + (build.shieldRegenLevel ?? 0) * 0.22);
  const shieldRegen = shieldSlots > 0
    ? 12 * shieldRegenSlots * (build.shieldRegenMult ?? 1)
    : 0;
  const shieldRechargeDelay = shieldSlots > 0
    ? Math.max(0.7, 2.5 * (1 + (build.shieldCooldownLevel ?? 0) * 0.16))
    : 0;
  const armorCapacitySlots = Math.max(0.25, armorSlots + (build.armorAmountLevel ?? 0) * 0.18);
  const armor = armorSlots > 0
    ? Math.round(80 * armorCapacitySlots * (build.armorCapacityMult ?? 1))
    : 0;
  const armorClass = armorSlots > 0
    ? Math.round((build.armorClass ?? 10) + (build.armorClassLevel ?? 0) * 2)
    : 0;
  const armorDrag = armorSlots > 0
    ? Math.round((armorSlots * 0.1 + Math.max(0, build.armorDragLevel ?? 0) * 0.06) * (build.armorDragMult ?? 1) * 100)
    : 0;
  return {
    hull,
    shield,
    shieldRegen,
    shieldRechargeDelay,
    armor,
    armorClass,
    armorDrag,
    shieldSlots,
    armorSlots,
  };
}

function getOffenseStatsForBuild(build, targetState = state) {
  const cfg = getPrimaryFireConfig(build);
  const mount = targetState.weapon?.mount || state.weapon?.mount || "front";
  const mountShots = mount === "rear" ? 2 : 1;
  const totalProjectiles = (cfg.angles?.length || 1) * mountShots;
  const hitDamage = computePrimaryDamage({
    ammo: cfg.ammo,
    speed: cfg.bulletSpeed,
    radius: cfg.projectileRadius,
    damageBoostMult: 1,
    buildDamageMult: build.primaryDamageMult ?? 1,
    shotDamageMult: cfg.shotDamageMult,
  });
  const attacksPerSecond = cfg.cooldown > 0 ? 1 / cfg.cooldown : 0;
  const volleyDamage = hitDamage * totalProjectiles;
  const directDps = hitDamage * totalProjectiles * attacksPerSecond;
  const burnStackDps = cfg.ammo === "plasma" ? hitDamage * getPlasmaBurnDpsRate() : 0;
  const burnDps = cfg.ammo === "plasma" ? getPlasmaSustainedBurnDps(directDps) : 0;
  const dps = directDps + burnDps;
  const burnText = cfg.ammo === "plasma" ? ` (burns up to ${formatNumber(burnDps, 1)}/s)` : "";
  return {
    cfg,
    dps,
    directDps,
    hitDamage,
    volleyDamage,
    attacksPerSecond,
    totalProjectiles,
    burnStackDps,
    burnDps,
    burnRampSeconds: cfg.ammo === "plasma" ? getPlasmaBurnDuration() : 0,
    pattern: `${getSpreadLabel(cfg.spread)} - ${totalProjectiles} projectile${totalProjectiles === 1 ? "" : "s"}`,
    ammo: `${capitalize(cfg.ammo)}${burnText}`,
  };
}

function getSelectedMiniWeapon(targetState = state) {
  const equippedId = targetState.armory?.equippedMiniItemId;
  const inventoryItem = findInventoryItem(equippedId, targetState);
  if (inventoryItem && normalizeArmorySlotType(inventoryItem.slotType) === "mini") return inventoryItem;
  return starterMiniWeaponsById[equippedId] || starterMiniWeapons[0] || null;
}

function getMiniWeaponStatsForItem(item, targetState = state) {
  const cfg = getMiniWeaponConfigFromItem(item);
  if (!cfg) {
    return {
      config: null,
      damage: 0,
      cooldown: 0,
      attacksPerSecond: 0,
      dps: 0,
      range: 0,
      arcLabel: "No mini",
      role: "No mini weapon linked.",
    };
  }
  const hullBonuses = getHullBonuses(targetState);
  const damage = (cfg.damage || 0) * (hullBonuses.miniDamageMult ?? 1);
  const cooldown = Math.max(0.16, (cfg.cooldown || 0.8) * (hullBonuses.miniCooldownMult ?? 1));
  const attacksPerSecond = cooldown > 0 ? 1 / cooldown : 0;
  return {
    config: cfg,
    damage,
    cooldown,
    attacksPerSecond,
    dps: damage * attacksPerSecond,
    range: cfg.range || 360,
    arcLabel: getMiniArcLabel(cfg),
    role: cfg.role || getItemBrowserRole(item),
  };
}

function getShipDisplayStatsForState(targetState = state) {
  const build = composeShipBuildFromArmory(targetState);
  const miniItem = getSelectedMiniWeapon(targetState);
  return {
    build,
    offense: getOffenseStatsForBuild(build, targetState),
    mini: getMiniWeaponStatsForItem(miniItem, targetState),
    defense: getDefenseStatsForBuild(build, targetState),
    support: getSupportStatsForState(targetState),
  };
}

function getPrimaryBayEffectiveStats(bayIndex, targetState = state) {
  const item = bayIndex === 1
    ? getSecondPrimaryArmoryItem(targetState)
    : getPrimaryArmoryItem(targetState, 0);
  if (!item) return null;
  const build = composeShipBuildFromArmory(targetState, { primaryItem: item });
  const offense = getOffenseStatsForBuild(build, targetState);
  const dualDamageScale = canDualFireCurrentLoadout(targetState)
    ? getDualFireDamageMult(targetState)
    : 1;
  return {
    item,
    build,
    damageScale: dualDamageScale,
    ...offense,
    dps: offense.dps * dualDamageScale,
    directDps: offense.directDps * dualDamageScale,
    hitDamage: offense.hitDamage * dualDamageScale,
    volleyDamage: offense.volleyDamage * dualDamageScale,
    burnStackDps: offense.burnStackDps * dualDamageScale,
    burnDps: offense.burnDps * dualDamageScale,
  };
}

function getPrimaryBaySlotStats(bayIndex, targetState = state) {
  const stats = getPrimaryBayEffectiveStats(bayIndex, targetState);
  if (!stats) return [];
  return [
    { label: "Effective DPS", value: formatNumber(stats.dps, 1) },
    { label: "Damage per Shot", value: formatNumber(stats.hitDamage, 1) },
    { label: "Shots per Second", value: formatNumber(stats.attacksPerSecond, 2) },
  ];
}

function createNeutralItemStatState(item = null) {
  const inventoryItem = item && !["none", "none_second_primary"].includes(item.id)
    ? cloneItem(item)
    : null;
  return {
    upgrades: {
      hull: 0,
      shield: 0,
      damage: 0,
      fireRate: 0,
      auxCooldown: 0,
      cloakDuration: 0,
      dualFire: 0,
    },
    hulls: { ownedIds: ["starter"], equippedId: "starter" },
    weapon: { mount: "front" },
    primaryFireMode: "swap",
    activePrimaryBay: 0,
    rmbWeapon: item?.ability || item?.sourceId || item?.id || "cloak",
    armory: {
      inventory: inventoryItem ? [inventoryItem] : [],
      equippedLoadoutId: starterWeaponLoadouts[0]?.id || "fundamentals",
      equippedPrimaryItemId: null,
      equippedSecondLoadoutId: null,
      equippedSecondPrimaryItemId: null,
      equippedDefenseSlotIds: ["none", "none"],
      equippedMiniItemId: normalizeArmorySlotType(item?.slotType) === "mini" ? item?.id || null : null,
      equippedSupportItemId: isSupportSlotType(normalizeArmorySlotType(item?.slotType)) && item?.rarity
        ? item.id
        : null,
    },
  };
}

function createItemOwnBuild(item) {
  const base = cloneShipBuild(createDefaultShipBuild());
  const itemBuild = cloneShipBuild(item?.build || {});
  return {
    ...base,
    ...itemBuild,
    effectUpgrades: {
      ...cloneShipBuild(base.effectUpgrades || {}),
      ...cloneShipBuild(itemBuild.effectUpgrades || {}),
    },
    hullMult: 1,
    shieldMaxMult: 1,
    shieldRegenMult: 1,
    armorCapacityMult: 1,
    armorDragMult: 1,
    primaryDamageMult: 1,
    loadoutPrimaryDamageMult: 1,
    loadoutPrimaryDamageDelta: 0,
    loadoutModifierLabel: "Intrinsic",
  };
}

function createIntrinsicPrimaryBuild(item) {
  const build = createItemOwnBuild(item);
  build.defenseSlots = ["none", "none"];
  build.shieldMaxLevel = 0;
  build.shieldRegenLevel = 0;
  build.shieldCooldownLevel = 0;
  build.armorAmountLevel = 0;
  build.armorClass = BASE_ARMOR_CLASS;
  build.armorClassLevel = 0;
  build.armorDragLevel = 0;
  build.armorDragMult = 1;
  return build;
}

function createIntrinsicDefenseBuild(item) {
  const build = createItemOwnBuild(item);
  const defenseType = item?.defenseType === "armor" ? "armor" : "shield";
  build.defenseSlots = [defenseType, "none"];
  build.hullMult = 1;
  build.shieldMaxMult = 1;
  build.shieldRegenMult = 1;
  build.armorCapacityMult = 1;
  build.armorDragMult = 1;
  build.primaryDamageMult = 1;
  if (defenseType === "shield") {
    build.armorAmountLevel = 0;
    build.armorClass = BASE_ARMOR_CLASS;
    build.armorClassLevel = 0;
    build.armorDragLevel = 0;
  } else {
    build.shieldMaxLevel = 0;
    build.shieldRegenLevel = 0;
    build.shieldCooldownLevel = 0;
  }
  return build;
}

function getItemIntrinsicStats(item) {
  const slotType = normalizeArmorySlotType(item?.slotType);
  const neutralState = createNeutralItemStatState(item);
  if (slotType === "primary") {
    const build = createIntrinsicPrimaryBuild(item);
    return {
      slotType,
      build,
      offense: getOffenseStatsForBuild(build, neutralState),
    };
  }
  if (slotType === "defense") {
    const build = item?.id === "none" ? createItemOwnBuild(item) : createIntrinsicDefenseBuild(item);
    if (item?.id === "none") {
      build.defenseSlots = ["none", "none"];
      build.shieldMaxLevel = 0;
      build.shieldRegenLevel = 0;
      build.shieldCooldownLevel = 0;
      build.armorAmountLevel = 0;
      build.armorClass = BASE_ARMOR_CLASS;
      build.armorClassLevel = 0;
      build.armorDragLevel = 0;
    }
    return {
      slotType,
      build,
      defense: getDefenseStatsForBuild(build, neutralState),
    };
  }
  if (slotType === "mini") {
    return {
      slotType,
      mini: getMiniWeaponStatsForItem(item, neutralState),
    };
  }
  if (isSupportSlotType(slotType)) {
    return {
      slotType: "aux",
      support: getSupportStatsForState(neutralState),
    };
  }
  return {
    slotType,
    build: null,
  };
}

function ensurePreviewInventoryItem(previewState, item) {
  if (!item || !previewState.armory) return;
  previewState.armory.inventory = Array.isArray(previewState.armory.inventory)
    ? previewState.armory.inventory
    : [];
  if (!previewState.armory.inventory.some((candidate) => candidate.id === item.id)) {
    previewState.armory.inventory.push(cloneItem(item));
  }
}

function createPreviewStateWithItem(item, slotId) {
  const previewState = JSON.parse(JSON.stringify(state));
  normalizeStarterArmoryState(previewState);
  previewState.armory = previewState.armory || {};
  previewState.armory.inventory = Array.isArray(previewState.armory.inventory)
    ? previewState.armory.inventory
    : [];
  const resolvedSlotId = getComparableSlotIdForItem(item, slotId);
  if (resolvedSlotId === "primary" || resolvedSlotId === "primary-2") {
    if (starterWeaponLoadoutsById[item?.id]) {
      if (resolvedSlotId === "primary-2") {
        previewState.armory.equippedSecondLoadoutId = item.id;
        previewState.armory.equippedSecondPrimaryItemId = null;
      } else {
        previewState.armory.equippedLoadoutId = item.id;
        previewState.armory.equippedPrimaryItemId = null;
      }
    } else if (item?.id === "none_second_primary") {
      previewState.armory.equippedSecondLoadoutId = null;
      previewState.armory.equippedSecondPrimaryItemId = null;
    } else {
      ensurePreviewInventoryItem(previewState, item);
      if (resolvedSlotId === "primary-2") {
        previewState.armory.equippedSecondPrimaryItemId = item?.id || null;
        previewState.armory.equippedSecondLoadoutId = null;
      } else {
        previewState.armory.equippedPrimaryItemId = item?.id || null;
      }
    }
  } else if (resolvedSlotId?.startsWith("defense-")) {
    const slotIndex = Number(resolvedSlotId.split("-")[1] || 0);
    const slots = Array.isArray(previewState.armory.equippedDefenseSlotIds)
      ? previewState.armory.equippedDefenseSlotIds.slice(0, 2)
      : ["shield_module", "none"];
    while (slots.length < 2) slots.push("none");
    if (!defenseModulesById[item?.id] && item?.id !== "none") ensurePreviewInventoryItem(previewState, item);
    slots[slotIndex] = item?.id || "none";
    previewState.armory.equippedDefenseSlotIds = slots;
  } else if (resolvedSlotId === "support") {
    if (getSupportModuleEntries().some((entry) => entry.id === item?.id) && !item?.rarity) {
      previewState.armory.equippedSupportItemId = null;
      previewState.rmbWeapon = item.id;
    } else {
      ensurePreviewInventoryItem(previewState, item);
      previewState.armory.equippedSupportItemId = item?.id || null;
      previewState.rmbWeapon = item?.ability || item?.sourceId || previewState.rmbWeapon || "cloak";
    }
  } else if (resolvedSlotId === "mini") {
    if (!starterMiniWeaponsById[item?.id]) ensurePreviewInventoryItem(previewState, item);
    previewState.armory.equippedMiniItemId = item?.id || null;
  } else if (resolvedSlotId === "hull") {
    previewState.hulls = normalizeHullState(previewState.hulls);
    if (item?.id && !previewState.hulls.ownedIds.includes(item.id)) {
      previewState.hulls.ownedIds.push(item.id);
    }
    previewState.hulls.equippedId = item?.id || "starter";
  }
  return previewState;
}

function getBuildLanguageLines(patch = {}) {
  const lines = [];
  const addLine = (text) => {
    if (text && !lines.includes(text)) lines.push(text);
  };
  const buildAdd = patch.buildAdd || patch;
  const buildPatch = patch.build || patch;
  if (Number.isFinite(buildAdd.flowRateLevel) && buildAdd.flowRateLevel !== 0) {
    addLine(`+${Math.round((1 / Math.pow(0.9, Math.abs(buildAdd.flowRateLevel)) - 1) * 100)}% Shots per Second`);
  }
  if (Number.isFinite(buildAdd.flowVelocityLevel) && buildAdd.flowVelocityLevel !== 0) {
    addLine(`+${Math.round(Math.abs(buildAdd.flowVelocityLevel) * 8)}% Projectile Speed`);
  }
  if (Number.isFinite(buildAdd.flowSizeLevel) && buildAdd.flowSizeLevel !== 0) {
    addLine(`+${Math.round(Math.abs(buildAdd.flowSizeLevel) * 12)}% Projectile Size`);
  }
  if (Number.isFinite(buildAdd.kineticImpulseBudget) && buildAdd.kineticImpulseBudget !== 0) {
    addLine(`+${Math.round(Math.abs(buildAdd.kineticImpulseBudget) * 100)}% Impulse (kinetic speed, plasma size)`);
  }
  if (Number.isFinite(buildAdd.shieldMaxLevel) && buildAdd.shieldMaxLevel !== 0) {
    addLine(`+${Math.round(40 * 0.18 * Math.abs(buildAdd.shieldMaxLevel))} Shield`);
  }
  if (Number.isFinite(buildAdd.shieldRegenLevel) && buildAdd.shieldRegenLevel !== 0) {
    addLine(`+${formatNumber(12 * 0.22 * Math.abs(buildAdd.shieldRegenLevel), 1)}/s Shield Regen`);
  }
  if (Number.isFinite(buildAdd.shieldCooldownLevel) && buildAdd.shieldCooldownLevel !== 0) {
    addLine(`${buildAdd.shieldCooldownLevel < 0 ? "Shorter" : "Longer"} shield recovery delay`);
  }
  if (Number.isFinite(buildAdd.armorAmountLevel) && buildAdd.armorAmountLevel !== 0) {
    addLine(`+${Math.round(80 * 0.18 * Math.abs(buildAdd.armorAmountLevel))} Armor`);
  }
  if (Number.isFinite(buildAdd.armorClassLevel) && buildAdd.armorClassLevel !== 0) {
    addLine(`+${Math.round(2 * Math.abs(buildAdd.armorClassLevel))} Armor Class`);
  }
  if (Number.isFinite(buildAdd.armorDragLevel) && buildAdd.armorDragLevel !== 0) {
    const pct = Math.round((1 - 1 / (1 + Math.abs(buildAdd.armorDragLevel) * 0.06)) * 100);
    addLine(`${buildAdd.armorDragLevel > 0 ? "-" : "+"}${pct}% Shots per Second from armor coupling`);
  }
  const tier = Number.isFinite(patch.effectTier) ? patch.effectTier : null;
  const tierNote = tier && tier > 1 ? ` (tier ${tier})` : "";
  if (buildPatch.effect === "pierce") {
    addLine(tier ? `Shots pierce ${1 + tier} additional enemies` : "Shots pierce 1 additional enemy");
  }
  if (buildPatch.effect === "homing") addLine(`Shots seek nearby targets${tierNote}`);
  if (buildPatch.effect === "explosive") addLine(`Shots burst on impact (area damage)${tierNote}`);
  if (buildPatch.effect === "vampiric") addLine(`Damage dealt restores hull${tierNote}`);
  return lines;
}

function getBaseEntryForItem(item) {
  if (!item) return null;
  const catalog = itemPoolCatalog || { entries: {}, relics: {} };
  return catalog.entries?.[item.baseId] ||
    catalog.relics?.[item.baseId] ||
    starterWeaponLoadoutsById[item.id] ||
    starterMiniWeaponsById[item.id] ||
    defenseModulesById[item.id] ||
    hullsById[item.id] ||
    getSupportModuleEntries().find((entry) => entry.id === item.id) ||
    null;
}

function isSpecialLanguageLine(text) {
  const normalized = String(text || "").trim();
  return (
    normalized.startsWith("Shots pierce") ||
    normalized.startsWith("Shots seek") ||
    normalized.startsWith("Shots burst") ||
    normalized.startsWith("Damage dealt restores")
  );
}

function getItemLanguageLines(item) {
  const baseEntry = getBaseEntryForItem(item);
  const innateLines = [];
  const specialLines = [];
  const baseEffect = baseEntry?.build?.effect;
  if (baseEffect && baseEffect !== "none") {
    getBuildLanguageLines({ effect: baseEffect }).forEach((text) => {
      if (isSpecialLanguageLine(text)) specialLines.push(text);
      else innateLines.push(text);
    });
  }
  const affixLines = [];
  (item?.affixes || []).forEach((affix) => {
    const catalogAffix = getCatalogAffix(affix.id);
    // Show the real rolled magnitude when present, falling back to nominal for legacy items.
    const buildAdd = affix.rolledBuildAdd || catalogAffix?.buildAdd || {};
    const lines = catalogAffix
      ? getBuildLanguageLines({
          build: catalogAffix.build || {},
          buildAdd,
          effectTier: affix.effectTier,
        })
      : [];
    if (lines.length) {
      lines.forEach((text) => {
        if (isSpecialLanguageLine(text)) specialLines.push(text);
        else affixLines.push(text);
      });
    } else if (affix.name) {
      affixLines.push(affix.name);
    }
  });
  if (item?.uniqueProperty?.description) {
    affixLines.push(item.uniqueProperty.description);
  } else if (item?.uniqueProperty?.name) {
    affixLines.push(item.uniqueProperty.name);
  }
  return { innateLines, affixLines, specialLines };
}

function formatSignedPercent(fraction) {
  if (!Number.isFinite(fraction) || Math.abs(fraction) < 0.001) return "0%";
  const pct = Math.round(Math.abs(fraction) * 100);
  return `${fraction >= 0 ? "+" : "-"}${pct}%`;
}

function formatShotsPerSecondPenaltyFromCooldownPercent(cooldownPercent) {
  if (!Number.isFinite(cooldownPercent) || cooldownPercent <= 0) return "-";
  const penalty = 1 - 1 / (1 + cooldownPercent / 100);
  return `${formatSignedPercent(-penalty)} Shots per Second`;
}

function getBuildImpulseBudget(build = {}) {
  return Number.isFinite(build?.kineticImpulseBudget) ? build.kineticImpulseBudget : 0;
}

function getSupportPassiveStatLines(item) {
  const impulseBudget = getBuildImpulseBudget(item?.build);
  if (Math.abs(impulseBudget) <= 0.001) return [];
  return [
    {
      label: "Impulse",
      value: formatSignedPercent(impulseBudget),
      math: "Installed support impulse feeds kinetic speed damage and plasma projectile size.",
    },
  ];
}

function getActivePrimaryImpulseRows(stats, primaryItem) {
  const cfg = stats?.offense?.cfg;
  const effectiveBuild = stats?.build;
  if (!cfg || !effectiveBuild) return [];
  const totalImpulseAdders = getBuildImpulseBudget(effectiveBuild);
  if (Math.abs(totalImpulseAdders) <= 0.001) return [];

  const intrinsicBuild = primaryItem ? createIntrinsicPrimaryBuild(primaryItem) : createDefaultShipBuild();
  const installedImpulse = totalImpulseAdders - getBuildImpulseBudget(intrinsicBuild);
  const displayedImpulse = Math.abs(installedImpulse) > 0.001
    ? installedImpulse
    : totalImpulseAdders;
  const label = Math.abs(installedImpulse) > 0.001 ? "Installed Impulse" : "Impulse Adders";

  if (cfg.ammo === "plasma") {
    return [
      {
        label,
        value: `${formatSignedPercent(displayedImpulse)} | Size x${formatNumber(cfg.plasmaImpulseSizeScale, 2)}`,
        math: `Total impulse adders ${formatSignedPercent(totalImpulseAdders)} make plasma shots size x${formatNumber(cfg.plasmaImpulseSizeScale, 2)} and speed x${formatNumber(cfg.plasmaImpulseSpeedScale, 2)}; hit and burn damage use final projectile size.`,
      },
    ];
  }

  return [
    {
      label,
      value: `${formatSignedPercent(displayedImpulse)} | Speed x${formatNumber(cfg.velocityFactor, 2)}`,
      math: `Total kinetic impulse budget ${formatNumber(cfg.kineticImpulseBudget, 2)} feeds speed-based damage.`,
    },
  ];
}

function getPrimaryDamageBreakdownRows(offense) {
  const cfg = offense?.cfg;
  if (!cfg) return [];
  const rows = [
    { text: `Damage per shot ${formatNumber(offense.hitDamage, 1)}` },
  ];
  const focusText = cfg.shotDamageMult > 1
    ? ` · Focus x${formatNumber(cfg.shotDamageMult, 2)}`
    : "";
  if (cfg.ammo === "plasma") {
    const impulseText = cfg.plasmaImpulseBudget > 0.001
      ? ` · Impulse x${formatNumber(cfg.plasmaImpulseSizeScale, 2)}`
      : "";
    rows.push({
      text: `Base ${ECONOMY.plasma.baseDamage} · Size x${formatNumber(cfg.baseSizeFactor, 2)}${impulseText}${focusText} -> ${formatNumber(offense.hitDamage, 1)}`,
      math: `Plasma hit damage = base * size * impulse size${cfg.shotDamageMult > 1 ? " * focused multiplier" : ""}.`,
    });
    if (offense.burnDps) {
      rows.push({
        text: `Burn ramps to ${formatNumber(offense.burnDps, 1)}/s over ${formatNumber(offense.burnRampSeconds, 1)}s`,
        math: `Each hit adds ${formatNumber(offense.burnStackDps, 1)}/s; armor takes ${formatNumber(getPlasmaBurnArmorDamageScale() * 100, 0)}% burn without armor-class subtraction.`,
      });
    }
  } else {
    rows.push({
      text: `Base ${ECONOMY.kinetic.baseDamage} · Size x${formatNumber(cfg.sizeFactor, 2)} · Speed x${formatNumber(cfg.velocityFactor, 2)}${focusText} -> ${formatNumber(offense.hitDamage, 1)}`,
      math: `Kinetic hit damage = base * size * speed^${ECONOMY.kinetic.velocityExponent}${cfg.shotDamageMult > 1 ? " * focused multiplier" : ""}.`,
    });
  }
  rows.push({ text: `Shots per second ${formatNumber(offense.attacksPerSecond, 2)}` });
  rows.push({
    text: `DPS ${formatNumber(offense.dps, 1)} (${formatNumber(offense.directDps, 1)} direct/s${offense.burnDps ? ` + ${formatNumber(offense.burnDps, 1)} burn/s` : ""})`,
  });
  return rows;
}

function getPrimaryInstalledModifierRows(previewState, intrinsicBuild, effectiveBuild, effectiveOffense) {
  if (!previewState || !intrinsicBuild || !effectiveBuild || !effectiveOffense) return [];
  const rows = [];
  const intrinsicCfg = getPrimaryFireConfig(intrinsicBuild);
  const effectiveCfg = effectiveOffense.cfg || getPrimaryFireConfig(effectiveBuild);
  const addRow = (label, detail, math = "") => rows.push({ label, detail, math });
  const flowRateDelta = (effectiveBuild.flowRateLevel ?? 0) - (intrinsicBuild.flowRateLevel ?? 0);
  if (Math.abs(flowRateDelta) > 0.001) {
    const ratio = Math.pow(0.9, -(flowRateDelta));
    addRow("Aux flow-rate", `${formatSignedPercent(ratio - 1)} Shots per Second`);
  }
  const flowVelocityDelta = (effectiveBuild.flowVelocityLevel ?? 0) - (intrinsicBuild.flowVelocityLevel ?? 0);
  if (Math.abs(flowVelocityDelta) > 0.001 && effectiveCfg.ammo === "kinetic") {
    addRow("Aux projectile speed", `+${Math.round(Math.abs(flowVelocityDelta) * 8)}% speed-fed damage`);
  }
  const flowSizeDelta = (effectiveBuild.flowSizeLevel ?? 0) - (intrinsicBuild.flowSizeLevel ?? 0);
  if (Math.abs(flowSizeDelta) > 0.001) {
    addRow("Aux projectile size", `+${Math.round(Math.abs(flowSizeDelta) * 12)}% size-fed damage`);
  }
  const impulseDelta = (effectiveBuild.kineticImpulseBudget ?? 0) - (intrinsicBuild.kineticImpulseBudget ?? 0);
  if (Math.abs(impulseDelta) > 0.001) {
    addRow(
      "Aux impulse budget",
      effectiveCfg.ammo === "plasma"
        ? `+${Math.round(Math.abs(impulseDelta) * 100)}% plasma impulse`
        : `+${Math.round(Math.abs(impulseDelta) * 100)}% kinetic impulse`,
      effectiveCfg.ammo === "plasma"
        ? "Impulse makes plasma shots larger and slower, raising size-fed hit and burn damage."
        : "Impulse makes kinetic shots faster, raising speed-fed hit damage."
    );
  }
  const armorPenaltyRatio = effectiveCfg.armorPenalty / Math.max(0.01, intrinsicCfg.armorPenalty || 1);
  if (armorPenaltyRatio > 1.005) {
    addRow(
      "Heavy armor drag",
      `${formatSignedPercent(1 / armorPenaltyRatio - 1)} Shots per Second`,
      "Armor drag is converted to a firing-speed change for display."
    );
  }
  const hullDamageMult = getHullBonuses(previewState).primaryDamageMult ?? 1;
  if (Math.abs(hullDamageMult - 1) > 0.001) {
    addRow("Hull weapon tuning", `${formatSignedPercent(hullDamageMult - 1)} primary damage`);
  }
  const loadout = getPrimaryLoadoutModifiers(previewState);
  if (Math.abs((loadout.primaryDamageMult ?? 1) - 1) > 0.001) {
    addRow(loadout.label, `${formatSignedPercent(loadout.primaryDamageDelta)} primary damage`, loadout.description);
  }
  if (rows.length) {
    rows.push({ label: "Effective DPS", detail: formatNumber(effectiveOffense.dps, 1) });
  }
  return rows;
}

function getPrimaryBreakdownSections(intrinsicOffense, previewState, intrinsicBuild, effectiveBuild, effectiveOffense) {
  const sections = [];
  const damageRows = getPrimaryDamageBreakdownRows(intrinsicOffense);
  if (damageRows.length) {
    sections.push({ title: "Damage Breakdown", rows: damageRows });
  }
  const modifierRows = getPrimaryInstalledModifierRows(previewState, intrinsicBuild, effectiveBuild, effectiveOffense);
  if (modifierRows.length) {
    sections.push({ title: "Installed Modifiers", rows: modifierRows });
  }
  return sections;
}

function getActivePrimaryBreakdownSections(stats, primaryItem, targetState = state) {
  if (!stats?.offense || !stats?.build || !primaryItem) return [];
  const intrinsicBuild = createIntrinsicPrimaryBuild(primaryItem);
  return getPrimaryBreakdownSections(
    stats.offense,
    targetState,
    intrinsicBuild,
    stats.build,
    stats.offense
  );
}

function getItemDisplayStats(item, slotId = null) {
  const resolvedSlotId = getComparableSlotIdForItem(item, slotId);
  const previewState = createPreviewStateWithItem(item, resolvedSlotId);
  const currentStats = getShipDisplayStatsForState(state);
  const previewStats = getShipDisplayStatsForState(previewState);
  const installedItem = getInstalledArmoryItem(resolvedSlotId);
  const isInstalled = !!item?.installed || (!!installedItem && installedItem.id === item?.id);
  const intrinsic = getItemIntrinsicStats(item);
  const build = intrinsic.build || previewStats.build;
  const typeLine = getItemTypeLine(item, build, resolvedSlotId);
  const { innateLines, affixLines, specialLines } = getItemLanguageLines(item);
  const tags = Array.isArray(item?.tags) ? item.tags.slice(0, 5) : [];
  const footer = [
    Number.isFinite(item?.value) ? `Sell ${formatCredits(Math.round(item.value * getMarketSellRate()))}` : "",
    tags.length ? tags.join(" · ") : "",
  ].filter(Boolean).join("   ");
  let headline;
  let lines = [];
  let breakdownSections = [];
  if (resolvedSlotId === "primary-2" && item?.id === "none_second_primary") {
    const offense = previewStats.offense;
    headline = {
      label: "Focus",
      value: SINGLE_PRIMARY_FOCUS_RATE,
      display: `${formatSignedPercent(SINGLE_PRIMARY_FOCUS_RATE)} damage`,
      delta: isInstalled ? 0 : offense.dps - currentStats.offense.dps,
      deltaLabel: "installed",
      lowerIsGood: false,
    };
    lines = [
      { label: "Primary Damage", value: formatSignedPercent(SINGLE_PRIMARY_FOCUS_RATE), math: "Empty Primary B applies the single-primary damage focus." },
      { label: "Effective DPS", value: formatNumber(offense.dps, 1), math: "Current primary DPS with the focus bonus applied." },
      { label: "Effect", value: "Clear second bay", math: "" },
    ];
  } else if (resolvedSlotId === "primary" || resolvedSlotId === "primary-2") {
    const offense = intrinsic.offense;
    const effectiveBuild = composeShipBuildFromArmory(previewState, { primaryItem: item });
    const effectiveOffense = getOffenseStatsForBuild(effectiveBuild, previewState);
    const specialValue = specialLines.length ? specialLines.join(" · ") : "";
    headline = {
      label: "DPS",
      value: offense.dps,
      display: formatNumber(offense.dps, 1),
      delta: isInstalled ? 0 : previewStats.offense.dps - currentStats.offense.dps,
      deltaLabel: "installed",
      lowerIsGood: false,
    };
    lines = [
      {
        label: "Pattern",
        value: offense.pattern,
        math: `${offense.totalProjectiles} projectile${offense.totalProjectiles === 1 ? "" : "s"} per trigger.`,
      },
      {
        label: "Damage per Shot",
        value: formatNumber(offense.hitDamage, 1),
        math: offense.cfg.ammo === "plasma"
          ? `Plasma hit damage = ${ECONOMY.plasma.baseDamage} * size ${formatNumber(offense.cfg.baseSizeFactor, 2)} * impulse ${formatNumber(offense.cfg.plasmaImpulseSizeScale, 2)}${offense.cfg.shotDamageMult > 1 ? ` * focused ${formatNumber(offense.cfg.shotDamageMult, 2)}x` : ""}.`
          : `Kinetic hit damage = ${ECONOMY.kinetic.baseDamage} * ${formatNumber(offense.cfg.sizeFactor, 2)} * ${formatNumber(offense.cfg.velocityFactor, 2)}^${ECONOMY.kinetic.velocityExponent}${offense.cfg.shotDamageMult > 1 ? ` * focused ${formatNumber(offense.cfg.shotDamageMult, 2)}x` : ""}.`,
      },
      {
        label: "Ammo",
        value: offense.ammo,
        math: offense.burnDps
          ? `Burn ramps to direct DPS * ${formatNumber(getPlasmaBurnMaxMultiplier(), 2)} = ${formatNumber(offense.burnDps, 1)}; armor takes ${formatNumber(getPlasmaBurnArmorDamageScale() * 100, 0)}% burn without armor-class subtraction.`
          : "",
      },
      specialValue ? { label: "Special", value: specialValue, math: "" } : null,
      {
        label: "Shots per Second",
        value: formatNumber(offense.attacksPerSecond, 2),
        math: `1 / ${formatNumber(offense.cfg.cooldown, 2)}s internal cycle time.`,
      },
      {
        label: "Volley Output",
        value: formatNumber(offense.volleyDamage, 1),
        math: `${formatNumber(offense.hitDamage, 1)} per shot * ${offense.totalProjectiles} projectile${offense.totalProjectiles === 1 ? "" : "s"}.`,
      },
      {
        label: "Dual-Fire",
        value: isDualFireCompatibleItem(item) ? "Dual-capable" : "Swap-only",
        math: isDualFireCompatibleItem(item)
          ? "Can fire simultaneously when Dual Fire is selected and the coupler is unlocked."
          : "This frame explicitly opts out of simultaneous fire.",
      },
    ].filter(Boolean);
    breakdownSections = getPrimaryBreakdownSections(offense, previewState, intrinsic.build, effectiveBuild, effectiveOffense);
  } else if (resolvedSlotId === "mini") {
    const mini = intrinsic.mini;
    const currentMini = currentStats.mini;
    const miniTuning = getMiniRarityTuning(item?.rarity || "scrap");
    headline = {
      label: "Mini DPS",
      value: mini.dps,
      display: formatNumber(mini.dps, 1),
      delta: isInstalled ? 0 : previewStats.mini.dps - currentMini.dps,
      deltaLabel: "installed",
      lowerIsGood: false,
    };
    lines = [
      { label: "Shot Damage", value: formatNumber(mini.damage, 1), math: "Mini damage includes hull mini modifiers." },
      { label: "Shots per Second", value: formatNumber(mini.attacksPerSecond, 2), math: `1 / ${formatNumber(mini.cooldown, 2)}s internal cycle time.` },
      item?.rarity
        ? {
            label: "Rarity Tune",
            value: `${Math.round(miniTuning.damageMult * 100)}% dmg | ${Math.round((1 / miniTuning.cooldownMult) * 100)}% Shots/sec`,
            math: "Rarity-scaled mini output is saved on the item.",
          }
        : null,
      { label: "Targeting", value: `${mini.arcLabel} | ${mini.range}px`, math: `${mini.config?.arcDegrees || (mini.config?.arc === "turret" ? 360 : 70)} degree targeting arc.` },
      { label: "Ammo", value: `${capitalize(mini.config?.ammo || "kinetic")} | ${capitalize(mini.config?.cadence || "mini")}`, math: "" },
      { label: "Effect", value: capitalize(mini.config?.effect || "none"), math: mini.role },
    ].filter(Boolean);
  } else if (resolvedSlotId?.startsWith("defense-")) {
    const defense = previewStats.defense;
    const currentDefense = currentStats.defense;
    const headlineKey = item?.defenseType === "armor" ? "armor" : "shield";
    const intrinsicDefense = intrinsic.defense || defense;
    headline = {
      label: headlineKey === "armor" ? "Armor" : "Shield",
      value: intrinsicDefense[headlineKey],
      display: `${Math.round(intrinsicDefense[headlineKey])}`,
      delta: isInstalled ? 0 : defense[headlineKey] - currentDefense[headlineKey],
      deltaLabel: headlineKey === "armor" ? "ship armor" : "ship shield",
      lowerIsGood: false,
    };
    lines = headlineKey === "armor"
      ? [
          { label: "Armor Class", value: intrinsicDefense.armorClass ? `${intrinsicDefense.armorClass}` : "-", math: `Armor Class = base + 2 per armor-class level.` },
          { label: "Shots per Second", value: formatShotsPerSecondPenaltyFromCooldownPercent(intrinsicDefense.armorDrag), math: "Armor drag lowers primary firing speed." },
          { label: "Effect", value: "Reduces incoming hit damage", math: "Shields absorb first; armor class reduces projectile hits that reach armor." },
        ]
      : [
          { label: "Shield Regen", value: `${formatNumber(intrinsicDefense.shieldRegen, 1)}/s`, math: `12/s per shield slot * shield regen tuning.` },
          { label: "Recovery Delay", value: `${formatNumber(intrinsicDefense.shieldRechargeDelay, 1)}s`, math: `Base 2.5s, shifted by shield recovery tuning.` },
          { label: "Effect", value: "Regenerates after damage pause", math: "Collision damage bypasses shields." },
        ];
  } else if (resolvedSlotId === "hull") {
    const defense = previewStats.defense;
    const currentDefense = currentStats.defense;
    const bonuses = hullsById[item?.id]?.bonuses || {};
    headline = {
      label: "Hull",
      value: defense.hull,
      display: `${defense.hull}`,
      delta: isInstalled ? 0 : defense.hull - currentDefense.hull,
      deltaLabel: "installed",
      lowerIsGood: false,
    };
    lines = [
      { label: "Shield", value: `${defense.shield} | ${formatNumber(defense.shieldRegen, 1)}/s`, math: "Hull shield bonuses are included." },
      { label: "Armor", value: `${defense.armor}`, math: `Armor capacity x${formatNumber(bonuses.armorCapacityMult ?? 1, 2)}.` },
      { label: "Mini Control", value: `${Math.round((bonuses.miniDamageMult ?? 1) * 100)}% dmg | ${Math.round((1 / (bonuses.miniCooldownMult ?? 1)) * 100)}% Shots/sec`, math: "Hull mini control modifies mini firing speed." },
      { label: "Aux Potency", value: bonuses.auxPowerBonus ? `+${Math.round(bonuses.auxPowerBonus * 8)}% ability roll` : "—", math: "Hull identity perk lifts the equipped aux item's rolled potency." },
      { label: "Second Bay", value: `${Math.round((bonuses.secondBayStrainReduction || 0) * 100)}% strain mitigation`, math: `Baseline second-bay strain is ${Math.round(SECOND_PRIMARY_STRAIN_RATE * 100)}% primary damage per weapon.` },
      { label: "Dual-Fire", value: `+${bonuses.dualFireTierBonus || 0} tier`, math: "Hull bonus stacks with Armory dual-fire upgrades." },
    ];
  } else {
    const support = intrinsic.support || previewStats.support;
    const currentSupport = currentStats.support;
    const passiveLines = getSupportPassiveStatLines(item);
    headline = {
      label: "Recharge",
      value: support.cooldown,
      display: `${formatNumber(support.cooldown, 1)}s`,
      delta: isInstalled ? 0 : previewStats.support.cooldown - currentSupport.cooldown,
      deltaSuffix: "s",
      deltaLabel: "installed",
      lowerIsGood: true,
    };
    lines = [
      ...passiveLines,
      { label: "Duration", value: `${formatNumber(support.duration, 1)}s`, math: support.math },
      { label: "Effect", value: support.effect, math: support.math },
    ];
  }
  return {
    item,
    slotId: resolvedSlotId,
    name: item?.name || "Unknown Item",
    typeLine,
    rarity: item?.rarity || null,
    rollQuality: Number.isFinite(item?.rollQuality) ? item.rollQuality : null,
    headline,
    lines,
    breakdownSections,
    innateLines,
    affixLines,
    lore: item?.relicLore || "",
    footer,
    previewStats,
  };
}

function renderHeadlineDelta(headline) {
  const delta = headline?.delta || 0;
  if (!Number.isFinite(delta) || Math.abs(delta) < 0.05) return "";
  const good = headline.lowerIsGood ? delta < 0 : delta > 0;
  const symbol = delta > 0 ? "▲" : "▼";
  const value = Math.abs(delta);
  const suffix = headline.deltaSuffix || "";
  const label = headline.deltaLabel || "installed";
  return `<span class="item-delta ${good ? "good" : "bad"}">${symbol} ${delta > 0 ? "+" : "-"}${formatNumber(value, 1)}${suffix} ${escapeHtml(label)}</span>`;
}

// The Diablo "is this a keeper?" read: a thin meter filled to rollQuality, tinted toward rarity.
function renderRollQualityBar(rollQuality, rarity) {
  if (!Number.isFinite(rollQuality)) return "";
  const pct = Math.max(0, Math.min(100, Math.round(rollQuality * 100)));
  const color = getRarityConfig(rarity)?.color || "#9aa3b2";
  return `
    <div class="item-roll-quality" title="Affix roll quality">
      <span class="item-roll-quality-label">Roll ${pct}%</span>
      <span class="item-roll-quality-track">
        <span class="item-roll-quality-fill" style="width:${pct}%;background:${color};"></span>
      </span>
    </div>
  `;
}

function renderItemBreakdownSections(sections = []) {
  const showMath = !!state.devShowMath;
  return (sections || [])
    .map((section) => {
      const rows = (section.rows || [])
        .map((row) => {
          const rowText = row.text
            ? escapeHtml(row.text)
            : `<span>${escapeHtml(row.label || "")}</span><span>${escapeHtml(row.detail || "")}</span>`;
          return `
            <div class="item-breakdown-row${row.text ? " text" : ""}">
              ${rowText}
              ${showMath && row.math ? `<span class="item-stat-math">${escapeHtml(row.math)}</span>` : ""}
            </div>
          `;
        })
        .join("");
      return `
        <div class="item-breakdown-section">
          <div class="item-breakdown-title">${escapeHtml(section.title || "Breakdown")}</div>
          ${rows}
        </div>
      `;
    })
    .join("");
}

function renderItemDisplayBlock(display, { inline = false } = {}) {
  if (!display) return "";
  const rarityStyle = display.rarity ? getRarityStyle(display.rarity) : "";
  const typeClass = ` type-${getItemTypeKey(display.item, display.slotId)}`;
  const showMath = !!state.devShowMath;
  const lineHtml = display.lines
    .map(
      (line) => `
        <div class="item-stat-line">
          <span class="item-stat-label">${escapeHtml(line.label)}</span>
          <span class="item-stat-value">${escapeHtml(line.value)}</span>
          ${showMath && line.math ? `<span class="item-stat-math">${escapeHtml(line.math)}</span>` : ""}
        </div>
      `
    )
    .join("");
  const breakdownHtml = renderItemBreakdownSections(display.breakdownSections || []);
  const innateHtml = display.innateLines
    .map((line) => `<div class="item-affix-line innate">${escapeHtml(line)}</div>`)
    .join("");
  const affixHtml = display.affixLines
    .map((line) => {
      const text = String(line || "");
      const prefix = text.trim().startsWith("+") ? "" : "+ ";
      return `<div class="item-affix-line">${prefix}${escapeHtml(text)}</div>`;
    })
    .join("");
  const rollHtml = renderRollQualityBar(display.rollQuality, display.rarity);
  const detailHtml = `
    <div class="${inline ? "item-display-scroll" : "item-display-details"}">
      <div class="item-stat-lines">${lineHtml}</div>
      ${breakdownHtml}
      ${(innateHtml || affixHtml) ? `<div class="item-affix-lines">${innateHtml}${affixHtml}</div>` : ""}
      ${display.lore ? `<div class="item-lore">${escapeHtml(display.lore)}</div>` : ""}
      ${rollHtml}
      ${display.footer ? `<div class="item-footer">${escapeHtml(display.footer)}</div>` : ""}
    </div>
  `;
  return `
    <div class="item-display-block${inline ? " inline" : ""}${typeClass}" style="${rarityStyle}">
      <div class="item-display-head">
        <div>
          <div class="item-display-name">${escapeHtml(display.name)}</div>
          <div class="item-display-type">${escapeHtml(display.typeLine)}</div>
        </div>
      </div>
      <div class="item-display-rule"></div>
      <div class="item-headline">
        <span class="item-headline-value">${escapeHtml(display.headline.display)}</span>
        <span class="item-headline-label">${escapeHtml(display.headline.label)}</span>
        ${renderHeadlineDelta(display.headline)}
      </div>
      ${detailHtml}
    </div>
  `;
}

function shouldShowFloatingItemTooltip() {
  return window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches ?? true;
}

function ensureItemTooltip() {
  if (itemTooltipEl) return itemTooltipEl;
  itemTooltipEl = document.createElement("div");
  itemTooltipEl.id = "item-tooltip";
  itemTooltipEl.className = "item-tooltip";
  itemTooltipEl.hidden = true;
  document.body.appendChild(itemTooltipEl);
  return itemTooltipEl;
}

function positionItemTooltip(anchor) {
  if (!itemTooltipEl || !anchor) return;
  const rect = anchor.getBoundingClientRect();
  const tooltipRect = itemTooltipEl.getBoundingClientRect();
  const gap = 12;
  let left = rect.right + gap;
  if (left + tooltipRect.width > window.innerWidth - gap) {
    left = rect.left - tooltipRect.width - gap;
  }
  left = Math.max(gap, Math.min(left, window.innerWidth - tooltipRect.width - gap));
  let top = rect.top;
  if (top + tooltipRect.height > window.innerHeight - gap) {
    const topAbove = rect.top - tooltipRect.height - gap;
    top = topAbove >= gap ? topAbove : window.innerHeight - tooltipRect.height - gap;
  }
  top = Math.max(gap, top);
  itemTooltipEl.style.left = `${Math.round(left)}px`;
  itemTooltipEl.style.top = `${Math.round(top)}px`;
}

function hideItemTooltip() {
  if (itemTooltipTimer) {
    clearTimeout(itemTooltipTimer);
    itemTooltipTimer = null;
  }
  if (itemTooltipEl) itemTooltipEl.hidden = true;
}

function showItemTooltip(item, slotId, anchor) {
  if (!item || !anchor || !shouldShowFloatingItemTooltip()) return;
  if (itemTooltipTimer) clearTimeout(itemTooltipTimer);
  itemTooltipTimer = setTimeout(() => {
    const tooltip = ensureItemTooltip();
    tooltip.innerHTML = renderItemDisplayBlock(getItemDisplayStats(item, slotId));
    tooltip.hidden = false;
    positionItemTooltip(anchor);
  }, 80);
}

function attachItemTooltip(element, item, slotId) {
  if (!element || !item) return;
  element.addEventListener("mouseenter", () => showItemTooltip(item, slotId, element));
  element.addEventListener("focus", () => showItemTooltip(item, slotId, element));
  element.addEventListener("mouseleave", hideItemTooltip);
  element.addEventListener("blur", hideItemTooltip);
}

function renderShipStatRow(line, { forceMath = false } = {}) {
  const showMath = forceMath || !!state.devShowMath;
  return `
    <div class="stat-row">
      <span class="stat-k">${escapeHtml(line.label)}</span>
      <span class="stat-v">${escapeHtml(line.value)}</span>
      ${showMath && line.math ? `<span class="stat-tip">${escapeHtml(line.math)}</span>` : ""}
    </div>
  `;
}

function renderDiagnosticStatRows(rows) {
  return rows.map((row) => renderShipStatRow(row, { forceMath: true })).join("");
}

function getArmorClassForModule(item) {
  if (!item?.build || item.defenseType !== "armor") return 0;
  return Math.round((item.build.armorClass ?? BASE_ARMOR_CLASS) + (item.build.armorClassLevel ?? 0) * 2);
}

function getEquippedDefenseRows() {
  const slotIds = getEquippedDefenseSlotIds();
  return slotIds.map((slotId, index) => {
    const item = getDefenseArmoryItemById(slotId);
    if (!item) {
      return {
        label: `Defense ${index + 1}`,
        value: "Empty",
        math: "No defense module is installed in this bay.",
      };
    }
    if (item.defenseType === "armor") {
      return {
        label: `Defense ${index + 1}`,
        value: `${getCompactItemName(item)} | AC ${getArmorClassForModule(item)}`,
        math: "The highest installed armor class is the one combat uses.",
      };
    }
    if (item.defenseType === "shield") {
      return {
        label: `Defense ${index + 1}`,
        value: `${getCompactItemName(item)} | Shield`,
        math: "Shield modules add capacity, regen, and recovery tuning.",
      };
    }
    return {
      label: `Defense ${index + 1}`,
      value: getCompactItemName(item),
      math: item.description || "Installed defense module.",
    };
  });
}

function getProjectileDamageForSpec(spec, difficulty, level) {
  if (!spec) return null;
  const projectileProfile = resolveLevelProjectileProfile(spec.projectileProfile, level);
  if (Number.isFinite(projectileProfile.damage)) return projectileProfile.damage;
  const levelScale = level?.enemyScale || level?.scale || {};
  const damageScale = Math.max(
    0.05,
    Number.isFinite(spec.damageScale)
      ? spec.damageScale
      : Number.isFinite(levelScale.damage)
        ? levelScale.damage
        : 1
  );
  const baseDamage = Number.isFinite(spec.bulletDamage)
    ? spec.bulletDamage
    : 14 + difficulty * 1.3;
  return baseDamage * damageScale;
}

function getMissionProjectileDamageSummary(level, elapsed = 0) {
  if (!level?.events?.length) return null;
  const difficulty = getMissionDifficultyAtElapsed(elapsed);
  const rows = [];
  level.events.forEach((event) => {
    const spec = mergeLevelEnemySpec(level, event.type, event.overrides || {});
    const values = getEnemyProjectileDamageValues(spec, difficulty, level);
    values.forEach((damage) => {
      if (!Number.isFinite(damage)) return;
      rows.push({
        type: event.type,
        damage,
      });
    });
  });
  if (!rows.length) return null;
  const damages = rows.map((row) => row.damage);
  const maxDamage = Math.max(...damages);
  const minDamage = Math.min(...damages);
  const hardest = rows
    .slice()
    .sort((a, b) => b.damage - a.damage)
    .slice(0, 4)
    .map((row) => `${row.type} ${formatNumber(row.damage, 1)}`);
  return {
    difficulty,
    minDamage,
    maxDamage,
    hardest,
  };
}

async function openArmoryStatsModal() {
  if (!shipModal || !shipModalTitle || !shipModalBody) return;
  const stats = getShipDisplayStatsForState(state);
  const support = stats.support;
  const mini = stats.mini;
  const activePrimarySlot = getActivePrimaryBay(state) === 1 ? "primary-2" : "primary";
  const activePrimary = getInstalledArmoryItem(activePrimarySlot);
  const activePrimaryBreakdownSections = getActivePrimaryBreakdownSections(stats, activePrimary, state);
  const loadout = getPrimaryLoadoutModifiers(state);
  const defenseRows = [
    { label: "Hull", value: `${stats.defense.hull}`, math: "Hull takes raw projectile damage once armor is gone." },
    { label: "Shield", value: `${stats.defense.shield}`, math: "Shields take raw non-collision projectile damage before armor." },
    { label: "Shield Regen", value: `${formatNumber(stats.defense.shieldRegen, 1)}/s`, math: "Regen resumes after the recovery delay." },
    { label: "Shield Recovery", value: stats.defense.shieldRechargeDelay ? `${formatNumber(stats.defense.shieldRechargeDelay, 1)}s` : "-", math: "Recovery delay starts after shield damage." },
    { label: "Armor", value: `${stats.defense.armor}`, math: "Armor capacity stacks across installed armor modules." },
    { label: "Armor Class", value: stats.defense.armorClass ? `${stats.defense.armorClass}` : "-", math: "This is the best installed armor class and is the value combat uses." },
    { label: "Armor Fire Speed", value: formatShotsPerSecondPenaltyFromCooldownPercent(stats.defense.armorDrag), math: "Armor drag lowers primary Shots per Second." },
  ];
  const offenseRows = [
    { label: "Effective DPS", value: formatNumber(stats.offense.dps, 1), math: "Current active primary after installed modifiers." },
    { label: "Damage per Shot", value: formatNumber(stats.offense.hitDamage, 1), math: "Per-projectile damage after installed modifiers." },
    { label: "Shots per Second", value: formatNumber(stats.offense.attacksPerSecond, 2), math: "Current active primary firing speed." },
    { label: "Pattern", value: stats.offense.pattern, math: "" },
    { label: "Ammo", value: stats.offense.ammo, math: "" },
    ...getActivePrimaryImpulseRows(stats, activePrimary),
    { label: "Mini DPS", value: formatNumber(mini.dps, 1), math: `${getCompactItemName(getSelectedMiniWeapon())}: ${formatNumber(mini.damage, 1)} damage at ${formatNumber(mini.attacksPerSecond, 2)} shots/s.` },
  ];
  const supportRows = [
    { label: "Ability", value: support.name, math: "" },
    ...getSupportPassiveStatLines(getSelectedSupportModule()),
    { label: "Recharge", value: support.cooldown ? `${formatNumber(support.cooldown, 1)}s` : "-", math: support.math },
    { label: "Duration", value: support.duration ? `${formatNumber(support.duration, 1)}s` : "-", math: support.math },
    { label: "Effect", value: support.effect, math: support.math },
  ];
  const dualReady = canUseDualFireCurrentLoadout();
  const dualSelected = canDualFireCurrentLoadout();
  const loadoutRows = [
    { label: "Hull", value: getEquippedHull().name, math: getEquippedHull().description },
    { label: "Bay State", value: loadout.label, math: loadout.description },
    { label: "Primary Damage", value: formatSignedPercent(loadout.primaryDamageDelta), math: "Applied to each primary weapon before Dual Fire scaling." },
    {
      label: "Dual Fire",
      value: dualSelected
        ? `${Math.round(getDualFireDamageMult() * 100)}% per weapon`
        : dualReady
          ? "Ready, not selected"
          : "Locked or incomplete",
      math: "Dual Fire is selected from the Armory fire-mode switch.",
    },
  ];
  shipModalTitle.textContent = "Ship Stats";
  shipModalBody.innerHTML = `
    <div class="ship-stats-modal">
      <p class="muted">Mission-ready values from the current Armory build. Armor class only applies after shields are depleted.</p>
      <div class="stat-section">
        <div class="stat-section-title">Offense</div>
        ${offenseRows.map(renderShipStatRow).join("")}
        ${renderItemBreakdownSections(activePrimaryBreakdownSections)}
      </div>
      <div class="stat-section">
        <div class="stat-section-title">Defense</div>
        ${defenseRows.map(renderShipStatRow).join("")}
      </div>
      <div class="stat-section">
        <div class="stat-section-title">Installed Defense Items</div>
        ${getEquippedDefenseRows().map(renderShipStatRow).join("")}
      </div>
      <div class="stat-section">
        <div class="stat-section-title">Aux</div>
        ${supportRows.map(renderShipStatRow).join("")}
      </div>
      <div class="stat-section">
        <div class="stat-section-title">Loadout</div>
        ${loadoutRows.map(renderShipStatRow).join("")}
      </div>
    </div>
  `;
  openShipNodeId = "armory-stats";
  shipModalCard?.classList.add("ship-stats-card");
  shipModal.hidden = false;
}

function renderShipStatsPanel() {
  if (!shipStats) return;
  const activePrimarySlot = getActivePrimaryBay(state) === 1 ? "primary-2" : "primary";
  const currentPrimary = getInstalledArmoryItem(activePrimarySlot);
  const stats = getShipDisplayStatsForState(state);
  const activePrimaryBreakdownSections = getActivePrimaryBreakdownSections(stats, currentPrimary, state);
  const support = stats.support;
  const mini = stats.mini;
  const loadout = getPrimaryLoadoutModifiers(state);
  const offenseRows = [
    { label: "Effective DPS", value: formatNumber(stats.offense.dps, 1), math: "Current active primary after installed modifiers." },
    { label: "Damage per Shot", value: formatNumber(stats.offense.hitDamage, 1), math: "Per-projectile damage after installed modifiers." },
    { label: "Shots per Second", value: formatNumber(stats.offense.attacksPerSecond, 2), math: "Current active primary firing speed." },
    { label: "Pattern", value: stats.offense.pattern, math: "" },
    { label: "Ammo", value: stats.offense.ammo, math: "" },
    ...getActivePrimaryImpulseRows(stats, currentPrimary),
  ];
  const defenseRows = [
    { label: "Hull", value: `${stats.defense.hull}`, math: `Hull = 100 * (1 + 0.08*${state.upgrades?.hull ?? 0}).` },
    { label: "Shield", value: `${stats.defense.shield}`, math: `40 per shield slot, scaled by shield tuning.` },
    { label: "Shield Regen", value: `${formatNumber(stats.defense.shieldRegen, 1)}/s`, math: `12/s per shield slot, scaled by regen tuning.` },
    { label: "Recovery Delay", value: stats.defense.shieldRechargeDelay ? `${formatNumber(stats.defense.shieldRechargeDelay, 1)}s` : "-", math: `Base 2.5s, shifted by shield recovery tuning.` },
    { label: "Armor", value: `${stats.defense.armor}`, math: `80 per armor slot, scaled by armor mass tuning.` },
    { label: "Armor Class", value: stats.defense.armorClass ? `${stats.defense.armorClass}` : "-", math: `This is the best installed armor class and is the value combat uses.` },
    { label: "Armor Fire Speed", value: formatShotsPerSecondPenaltyFromCooldownPercent(stats.defense.armorDrag), math: `Armor modules lower primary Shots per Second by their drag rating.` },
  ];
  const supportRows = [
    { label: "Ability", value: support.name, math: "" },
    ...getSupportPassiveStatLines(getSelectedSupportModule()),
    { label: "Recharge", value: support.cooldown ? `${formatNumber(support.cooldown, 1)}s` : "-", math: support.math },
    { label: "Duration", value: support.duration ? `${formatNumber(support.duration, 1)}s` : "-", math: support.math },
    { label: "Effect", value: support.effect, math: support.math },
  ];
  const miniRows = [
    { label: "Weapon", value: getCompactItemName(getSelectedMiniWeapon()), math: "" },
    { label: "Mini DPS", value: formatNumber(mini.dps, 1), math: `${formatNumber(mini.damage, 1)} damage * ${formatNumber(mini.attacksPerSecond, 2)} attacks/s.` },
    { label: "Targeting", value: `${mini.arcLabel} | ${mini.range}px`, math: mini.role },
  ];
  const dualReady = canUseDualFireCurrentLoadout();
  const dualSelected = canDualFireCurrentLoadout();
  const loadoutRows = [
    { label: "Hull", value: getEquippedHull().name, math: getEquippedHull().description },
    { label: "Bay State", value: loadout.label, math: loadout.description },
    { label: "Primary Damage", value: formatSignedPercent(loadout.primaryDamageDelta), math: "Applied to each primary weapon before Dual Fire scaling." },
    {
      label: "Dual Fire",
      value: dualSelected
        ? `${Math.round(getDualFireDamageMult() * 100)}% per weapon`
        : dualReady
          ? "Ready, not selected"
          : "Locked or incomplete",
      math: "Dual Fire is selected from the Armory fire-mode switch.",
    },
  ];
  const capabilityRows = [
    {
      label: "Dual-Fire Tier",
      value: `${state.upgrades?.dualFire || 0}/4`,
      math: "Dual-fire coupling is purchased in Ledger Investments.",
    },
  ];
  shipStats.innerHTML = `
    <h3>Ship Stats</h3>
    <div class="stat-sections">
      <div class="stat-section">
        <div class="stat-section-title">Offense</div>
        ${offenseRows.map(renderShipStatRow).join("")}
        ${renderItemBreakdownSections(activePrimaryBreakdownSections)}
      </div>
      <div class="stat-section">
        <div class="stat-section-title">Defense</div>
        ${defenseRows.map(renderShipStatRow).join("")}
      </div>
      <div class="stat-section">
        <div class="stat-section-title">Support</div>
        ${supportRows.map(renderShipStatRow).join("")}
      </div>
      <div class="stat-section">
        <div class="stat-section-title">Mini</div>
        ${miniRows.map(renderShipStatRow).join("")}
      </div>
      <div class="stat-section">
        <div class="stat-section-title">Loadout</div>
        ${loadoutRows.map(renderShipStatRow).join("")}
      </div>
      <div class="stat-section">
        <div class="stat-section-title">Capabilities</div>
        ${capabilityRows.map(renderShipStatRow).join("")}
      </div>
    </div>
  `;
}

function formatFrameDefenseSummary(build) {
  const slots = Array.isArray(build?.defenseSlots)
    ? build.defenseSlots.filter((slot) => slot && slot !== "none")
    : [];
  if (!slots.length) return "Unshielded";
  const labels = slots.map((slot) => capitalize(slot));
  return labels.join(" + ");
}

function getArmoryFrameVisual(item) {
  return (
    armoryFrameVisuals[item?.id] || {
      icon: item?.icon || getDefaultItemIcon(item?.rarity),
      hardpointName: item?.name || "Module",
    }
  );
}

function getArmoryUnlockText(item, owned) {
  if (owned) return "Owned";
  if (Number.isFinite(item?.starterUnlockStage)) {
    return "Starter kit";
  }
  if (Number.isFinite(item?.unlockAt) && item.unlockAt > 0) {
    return `Rank ${item.unlockAt}`;
  }
  return "Locked";
}

function getEquippedDefenseSlotIds() {
  const slotIds = Array.isArray(state.armory?.equippedDefenseSlotIds)
    ? state.armory.equippedDefenseSlotIds.slice(0, 2)
    : ["shield_module", "none"];
  while (slotIds.length < 2) slotIds.push("none");
  return slotIds;
}

function getSelectedSupportModule() {
  const equippedItem = findInventoryItem(state.armory?.equippedSupportItemId);
  if (equippedItem && isSupportSlotType(equippedItem.slotType)) return equippedItem;
  const entries = getSupportModuleEntries();
  return entries.find((entry) => entry.id === state.rmbWeapon) || entries[0] || null;
}

function getMissionDifficultyAtElapsed(elapsed = 0) {
  return 1 + Math.max(0, elapsed) / 22;
}

function getArmorySlotDefinitions() {
  const equippedWeapon = getPrimaryArmoryItem(state, 0);
  const secondWeapon = getSecondPrimaryArmoryItem();
  const mini = getSelectedMiniWeapon();
  const defenseSlotIds = getEquippedDefenseSlotIds();
  const defenseA = getDefenseArmoryItemById(defenseSlotIds[0]) || null;
  const defenseB = getDefenseArmoryItemById(defenseSlotIds[1]) || null;
  const support = getSelectedSupportModule();
  return [
    {
      id: "primary",
      label: "Primary A",
      className: "armory-slot-primary",
      installedId: equippedWeapon?.id || null,
      item: equippedWeapon || null,
      name: equippedWeapon ? getCompactItemName(equippedWeapon) : "Open Hardpoint",
      meta: equippedWeapon?.build
        ? `${getSpreadLabel(equippedWeapon.build.spread)} | ${capitalize(equippedWeapon.build.ammo || "kinetic")}`
        : "No weapon linked",
      stats: getPrimaryBaySlotStats(0),
      note: "Weapon modules change the projectile profile and hidden fire tuning.",
      icon: equippedWeapon ? getArmoryFrameVisual(equippedWeapon).icon : getDefaultItemIcon("certified"),
    },
    {
      id: "primary-2",
      label: "Primary B",
      className: "armory-slot-primary-secondary",
      installedId: secondWeapon?.id || null,
      item: secondWeapon || null,
      name: secondWeapon ? getCompactItemName(secondWeapon) : "Open Bay",
      meta: secondWeapon?.build
        ? `${getSpreadLabel(secondWeapon.build.spread)} | Swap-ready`
        : `Focus ${formatSignedPercent(SINGLE_PRIMARY_FOCUS_RATE)} damage`,
      stats: secondWeapon ? getPrimaryBaySlotStats(1) : [],
      note: secondWeapon
        ? "Swap to this weapon in flight. Carrying it applies second-bay primary damage strain."
        : "Keep this bay open for the single-primary damage focus.",
      icon: secondWeapon ? getArmoryFrameVisual(secondWeapon).icon : defenseVisuals.none.icon,
    },
    {
      id: "mini",
      label: "Mini",
      className: "armory-slot-mini",
      installedId: mini?.id || null,
      item: mini || null,
      name: mini ? getCompactItemName(mini) : "No Mini",
      meta: mini ? getItemBrowserRole(mini) : "Auxiliary autogun",
      note: mini?.description || "Install a compact auto-gun that fires independently.",
      icon: mini?.icon || getDefaultItemIcon("certified"),
    },
    {
      id: "defense-0",
      label: "Defense A",
      className: "armory-slot-defense-left",
      installedId: defenseSlotIds[0],
      item: defenseA || null,
      name: defenseA ? getCompactItemName(defenseA) : "Open Bay",
      meta: defenseA?.defenseType ? `${capitalize(defenseA.defenseType)} module` : "Shield or armor",
      note: defenseA?.description || "Install a defense module into this bay.",
      icon: defenseA?.icon || defenseVisuals.none.icon,
    },
    {
      id: "defense-1",
      label: "Defense B",
      className: "armory-slot-defense-right",
      installedId: defenseSlotIds[1],
      item: defenseB || null,
      name: defenseB ? getCompactItemName(defenseB) : "Open Bay",
      meta: defenseB?.defenseType ? `${capitalize(defenseB.defenseType)} module` : "Shield or armor",
      note: defenseB?.description || "Install a defense module into this bay.",
      icon: defenseB?.icon || defenseVisuals.none.icon,
    },
    {
      id: "support",
      label: "Support",
      className: "armory-slot-support",
      installedId: support?.id || null,
      item: support || null,
      name: support ? getCompactItemName(support) : "No support linked",
      meta: "Pilot system",
      note: support?.description || "Install a support item for your alternate action.",
      icon: support?.icon || mobileAltIcons.cloak,
    },
  ];
}

function getArmoryItemsForSlot(slotId) {
  const inventory = getArmoryInventory();
  if (slotId === "primary" || slotId === "primary-2") {
    const isSecondBay = slotId === "primary-2";
    const ownedIds = new Set(getOwnedStarterLoadoutIds());
    const emptySecondBay = {
      id: "none_second_primary",
      slotType: "primary",
      name: "Open Second Bay",
      subtitle: "Single-primary focus",
      description: "Clear the second bay to restore the single-primary damage bonus.",
      notes: "One-primary builds receive a baseline primary damage focus bonus.",
      icon: defenseVisuals.none.icon,
      tags: ["empty", "focus", "single-primary"],
      owned: true,
      installed: isSecondBay && !getSecondPrimaryArmoryItem(),
    };
    const starterItems = starterWeaponLoadouts.map((item) => ({
      ...item,
      slotType: "primary",
      icon: getArmoryFrameVisual(item).icon,
      owned: ownedIds.has(item.id),
      installed: isSecondBay
        ? !state.armory?.equippedSecondPrimaryItemId && state.armory?.equippedSecondLoadoutId === item.id
        : !state.armory?.equippedPrimaryItemId && state.armory?.equippedLoadoutId === item.id,
    }));
    const lootItems = inventory
      .filter((item) => item.slotType === "primary")
      .map((item) => ({
        ...item,
        owned: true,
        installed: isSecondBay
          ? state.armory?.equippedSecondPrimaryItemId === item.id
          : state.armory?.equippedPrimaryItemId === item.id,
      }));
    return isSecondBay ? [emptySecondBay, ...starterItems, ...lootItems] : [...starterItems, ...lootItems];
  }
  if (slotId === "mini") {
    const ownedMiniIds = new Set(state.armory?.ownedMiniWeaponIds || []);
    const starterItems = starterMiniWeapons.map((item) => ({
      ...item,
      owned: ownedMiniIds.has(item.id),
      installed: state.armory?.equippedMiniItemId === item.id,
    }));
    const lootItems = inventory
      .filter((item) => normalizeArmorySlotType(item.slotType) === "mini")
      .map((item) => ({
        ...item,
        owned: true,
        installed: state.armory?.equippedMiniItemId === item.id,
      }));
    return [...starterItems, ...lootItems];
  }
  if (slotId === "hull") {
    const ownedHullIds = new Set(getOwnedHullIds());
    return hullCatalog.map((item) => ({
      ...item,
      owned: ownedHullIds.has(item.id),
      installed: getEquippedHull()?.id === item.id,
    }));
  }
  if (slotId === "support") {
    const baseItems = getSupportModuleEntries().map((item) => ({
      ...item,
      installed: !state.armory?.equippedSupportItemId && state.rmbWeapon === item.id,
    }));
    const lootItems = inventory
      .filter((item) => isSupportSlotType(item.slotType))
      .map((item) => ({
        ...item,
        owned: true,
        installed: state.armory?.equippedSupportItemId === item.id,
      }));
    return [...baseItems, ...lootItems];
  }
  if (slotId.startsWith("defense-")) {
    const ownedDefenseIds = new Set(getOwnedDefenseModuleIds());
    const slotIndex = Number(slotId.split("-")[1] || 0);
    const equippedIds = getEquippedDefenseSlotIds();
    const emptyItem = {
      id: "none",
      slotType: "defense",
      name: "Empty Bay",
      subtitle: "Clear slot",
      description: "Leave this bay open if you want a lighter frame and higher Shots per Second.",
      notes: "No defense module installed.",
      icon: defenseVisuals.none.icon,
      tags: ["empty"],
      owned: true,
      installed: equippedIds[slotIndex] === "none",
    };
    return [
      emptyItem,
      ...defenseModules.map((item) => ({
        ...item,
        owned: ownedDefenseIds.has(item.id),
        installed: equippedIds[slotIndex] === item.id,
      })),
      ...inventory
        .filter((item) => item.slotType === "defense")
        .map((item) => ({
          ...item,
          owned: true,
          installed: equippedIds[slotIndex] === item.id,
        })),
    ];
  }
  return [];
}

function getArmorySlotMeta(slotId) {
  if (!slotId) {
    return {
      title: "Module Inventory",
      copy: "Click a hardpoint to open a compatible inventory grid.",
      tip: "Click icon to install",
    };
  }
  const meta = {
    hull: {
      title: "Hull Chassis",
      copy: "Select the ship hull that shapes defense, mini control, aux strength, and second-bay damage strain.",
      tip: "Unlock hulls in Ledger",
    },
    primary: {
      title: "Primary Hardpoint A",
      copy: "Main weapon frames. Hover icons to compare per-shot, volley, and sustained output.",
      tip: "Click icon to install",
    },
    "primary-2": {
      title: "Primary Hardpoint B",
      copy: "Optional swap weapon. Leaving this open keeps the single-primary damage focus.",
      tip: "Click icon to install",
    },
    mini: {
      title: "Mini Auto-Gun",
      copy: "Compact weapons fire independently using their listed arc, range, cadence, and ammo type.",
      tip: "Click icon to install",
    },
    support: {
      title: "Support Link",
      copy: "Alternate systems for cloak, EMP, and survivability tools.",
      tip: "Click icon to install",
    },
    "defense-0": {
      title: "Defense Bay A",
      copy: "Install a shield or armor module into the left defense bay.",
      tip: "Click icon to install",
    },
    "defense-1": {
      title: "Defense Bay B",
      copy: "Install a shield or armor module into the right defense bay.",
      tip: "Click icon to install",
    },
  };
  return meta[slotId] || meta.primary;
}

function getInstalledArmoryItem(slotId) {
  return getArmoryItemsForSlot(slotId).find((item) => item.installed) || null;
}

function getArmorySlotLabel(slotId) {
  const labels = {
    hull: "Hull Chassis",
    primary: "Primary Hardpoint A",
    "primary-2": "Primary Hardpoint B",
    mini: "Mini Auto-Gun",
    support: "Support Link",
    "defense-0": "Defense Bay A",
    "defense-1": "Defense Bay B",
  };
  return labels[slotId] || "Module Slot";
}

function canInstallSupportItem(item) {
  if (!item) return false;
  if (item.owned || state.debugUnlock) return true;
  return false;
}

function canInstallArmoryItem(item, slotId) {
  if (!item) return false;
  if (slotId === "support") return canInstallSupportItem(item);
  if (slotId === "hull") return !!item.owned || state.debugUnlock;
  return !!item.owned || state.debugUnlock;
}

function installSupportItem(itemId) {
  const inventoryItem = findInventoryItem(itemId);
  if (inventoryItem && isSupportSlotType(inventoryItem.slotType)) {
    state.armory = state.armory || {
      ownedLoadoutIds: [],
      ownedDefenseModuleIds: [],
      equippedLoadoutId: starterWeaponLoadouts[0]?.id || "fundamentals",
      equippedDefenseSlotIds: ["shield_module", "none"],
      inventory: [],
    };
    state.armory.equippedSupportItemId = inventoryItem.id;
    state.rmbWeapon = inventoryItem.ability || inventoryItem.sourceId || "cloak";
    state.shipBuild = composeShipBuildFromArmory(state);
    syncShipBuildToLegacy();
    saveState();
    return;
  }
  const item = getSupportModuleEntries().find((entry) => entry.id === itemId);
  if (!item) return;
  if (!item.owned && !state.debugUnlock) {
    return;
  }
  state.rmbWeapon = item.id;
  if (state.armory) state.armory.equippedSupportItemId = null;
  state.shipBuild = composeShipBuildFromArmory(state);
  syncShipBuildToLegacy();
  saveState();
}

function handleArmorySlotInstall(slotId, itemId) {
  hideItemTooltip();
  if (slotId === "primary" || slotId === "primary-2") {
    const bayIndex = slotId === "primary-2" ? 1 : 0;
    if (slotId === "primary-2" && itemId === "none_second_primary") {
      clearSecondPrimaryBay();
      return;
    }
    if (starterWeaponLoadoutsById[itemId]) {
      equipStarterLoadout(itemId, bayIndex);
    } else {
      equipPrimaryInventoryItem(itemId, bayIndex);
    }
    return;
  }
  if (slotId === "mini") {
    equipMiniWeapon(itemId);
    return;
  }
  if (slotId === "hull") {
    equipHull(itemId);
    return;
  }
  if (slotId === "support") {
    installSupportItem(itemId);
    return;
  }
  if (slotId.startsWith("defense-")) {
    const slotIndex = Number(slotId.split("-")[1] || 0);
    equipDefenseModule(slotIndex, itemId);
  }
}

function renderArmoryInspector(slotId) {
  if (!armoryInspector || !slotId) return;
  const item = getInstalledArmoryItem(slotId);
  const slotLabel = getArmorySlotLabel(slotId);
  if (!item) {
    armoryInspector.innerHTML = `
      <div class="armory-inspector-head">
        <div class="armory-inspector-title">
          <p class="armory-kicker">${slotLabel}</p>
        </div>
        <span class="armory-chip">Open</span>
      </div>
      <div class="armory-installed-empty">No module installed</div>
    `;
    return;
  }
  const display = getItemDisplayStats(item, slotId);
  armoryInspector.innerHTML = `
    <div class="armory-inspector-head">
      <div class="armory-inspector-title">
        <p class="armory-kicker">${slotLabel}</p>
      </div>
      <span class="armory-chip">Installed</span>
    </div>
    ${renderItemDisplayBlock(display, { inline: true })}
  `;
}

function renderShipUpgradesPanel() {
  const equipped = getEquippedStarterLoadout();
  if (!equipped) return;
  if (!["primary", "primary-2", "mini", "defense-0", "defense-1", "support"].includes(armorySelectedSlotId)) {
    armorySelectedSlotId = "primary";
  }

  renderShipStatsPanel();
  const slotDefs = getArmorySlotDefinitions();
  if (armoryBench) {
    const equippedHull = getEquippedHull();
    const ownedHullIds = new Set(getOwnedHullIds());
    const fireMode = getPrimaryFireMode();
    const dualReady = canUseDualFireCurrentLoadout();
    const dualTier = getDualFireTier();
    const hasSecondPrimary = !!getSecondPrimaryArmoryItem();
    const dualStatus = getDualFireTier() <= 0
      ? ""
      : !hasSecondPrimary
        ? "Install Primary B"
        : dualReady
          ? `${Math.round(getDualFireDamageMult() * 100)}% per weapon`
          : "Swap-only frame";
    const dualTitle = dualTier <= 0
      ? "Unlock Dual Fire in Ledger Investments."
      : !hasSecondPrimary
        ? "Install a Primary B weapon to enable Dual Fire."
        : dualReady
          ? "Fire compatible Primary A and Primary B together."
          : "One equipped primary is swap-only and cannot use Dual Fire.";
    const hullButtons = hullCatalog
      .map((hull) => {
        const owned = ownedHullIds.has(hull.id) || state.debugUnlock;
        const active = equippedHull.id === hull.id;
        return `
          <button
            type="button"
            class="armory-hull-option${active ? " is-active" : ""}${owned ? "" : " is-locked"}"
            data-hull-id="${hull.id}"
            ${owned ? "" : "disabled"}
            title="${owned ? "Equip hull" : "Unlock in Ledger Investments"}"
          >
            <img src="${escapeHtml(hull.icon)}" alt="" />
            <span>${escapeHtml(hull.id === "starter" ? "Base" : getCompactItemName(hull).replace(" Hull", ""))}</span>
          </button>
        `;
      })
      .join("");
    const hullPicker = `
      <div class="armory-hull-picker${armoryHullPickerOpen ? " is-open" : ""}">
        <button
          type="button"
          class="armory-hull-trigger"
          data-hull-toggle="true"
          aria-expanded="${armoryHullPickerOpen ? "true" : "false"}"
          title="Select hull"
        >
          <img src="${escapeHtml(equippedHull.icon || equippedHull.sprite)}" alt="" />
          <span>${escapeHtml(equippedHull.id === "starter" ? "Base" : getCompactItemName(equippedHull).replace(" Hull", ""))}</span>
        </button>
        ${armoryHullPickerOpen ? `<div class="armory-hull-popover" aria-label="Unlocked hulls">${hullButtons}</div>` : ""}
      </div>
    `;
    armoryBench.innerHTML = `
      <div class="armory-drone">
        <img class="armory-ship-base" src="${escapeHtml(equippedHull.sprite || equippedHull.icon)}" alt="" aria-hidden="true" />
        ${hullPicker}
        <div class="armory-fire-mode" aria-label="Primary fire mode">
          <span class="armory-fire-mode-label">Fire Mode</span>
          <button type="button" class="${fireMode === "swap" ? "is-active" : ""}" data-fire-mode="swap">Swap</button>
          <button type="button" class="${fireMode === "dual" ? "is-active" : ""}" data-fire-mode="dual" title="${escapeHtml(dualTitle)}" ${dualReady ? "" : "disabled"}>Dual Fire</button>
          ${dualStatus ? `<span>${escapeHtml(dualStatus)}</span>` : ""}
        </div>
        <div class="armory-hardpoints">
          ${slotDefs
            .map((slot) => {
              const visualRarity = getInstalledSlotVisualRarity(slot.item);
              const typeKey = getItemTypeKey(slot.item, slot.id);
              const typeBadge = getItemTypeBadge(slot.item, slot.id);
              return `
            <button
              type="button"
              class="armory-slot ${slot.className} type-${typeKey} is-clickable${visualRarity ? ` rarity-${visualRarity}` : ""}${armorySelectedSlotId === slot.id ? " is-selected" : ""}"
              data-armory-slot="${slot.id}"
              ${visualRarity ? `style="${getRarityStyle(visualRarity)}"` : ""}
            >
              <span class="armory-slot-label">${slot.label}</span>
              <span class="armory-slot-head">
                <span class="armory-slot-icon-frame"><img class="armory-slot-icon" src="${escapeHtml(slot.icon)}" alt="" /></span>
                <span class="armory-slot-copy">
                  <span class="armory-slot-name">${escapeHtml(slot.name)}</span>
                  <span class="armory-slot-meta">${escapeHtml(slot.meta)}</span>
                </span>
                <span class="armory-slot-type">${escapeHtml(typeBadge)}</span>
              </span>
              ${slot.stats?.length ? `
                <span class="armory-slot-stats">
                  ${slot.stats.map((line) => `
                    <span class="armory-slot-stat">
                      <span class="armory-slot-stat-label">${escapeHtml(line.label)}</span>
                      <span class="armory-slot-stat-value">${escapeHtml(line.value)}</span>
                    </span>
                  `).join("")}
                </span>
              ` : ""}
            </button>
          `;
            })
            .join("")}
        </div>
      </div>
    `;
    armoryBench.querySelector("[data-hull-toggle]")?.addEventListener("click", (event) => {
      event.stopPropagation();
      armoryHullPickerOpen = !armoryHullPickerOpen;
      safeUpdateHangar();
    });
    armoryBench.querySelectorAll("[data-hull-id]").forEach((button) => {
      button.addEventListener("click", () => {
        equipHull(button.dataset.hullId);
        armoryHullPickerOpen = false;
        safeUpdateHangar();
      });
    });
    armoryBench.querySelectorAll("[data-armory-slot]").forEach((slotButton) => {
      const slotId = slotButton.dataset.armorySlot || null;
      slotButton.addEventListener("click", () => {
        armorySelectedSlotId = slotId;
        safeUpdateHangar();
      });
    });
    armoryBench.querySelectorAll("[data-fire-mode]").forEach((button) => {
      button.addEventListener("click", () => {
        setPrimaryFireMode(button.dataset.fireMode);
      });
    });
  }

  const rackMeta = getArmorySlotMeta(armorySelectedSlotId);
  if (armoryRackTitle) armoryRackTitle.textContent = rackMeta.title;
  if (armoryRackCopy) armoryRackCopy.textContent = rackMeta.copy;
  if (armoryRackTip) armoryRackTip.textContent = rackMeta.tip;
  renderArmoryInspector(armorySelectedSlotId);
  if (armoryToggleStats) {
    armoryToggleStats.hidden = false;
    armoryToggleStats.textContent = "Show Stats";
  }
  if (shipStats) {
    shipStats.hidden = true;
  }

  if (!weaponInventory) return;
  weaponInventory.innerHTML = "";
  const inventoryItems = filterAndSortBrowserItems(getArmoryItemsForSlot(armorySelectedSlotId), {
    query: armoryBrowserSearch?.value || "",
    sort: armoryBrowserSort?.value || "recent",
    filter: armoryBrowserFilter?.value || "all",
  });

  if (!inventoryItems.length) {
    weaponInventory.innerHTML = `<div class="muted">No matching gear found.</div>`;
    return;
  }

  inventoryItems.forEach((item) => {
    const button = document.createElement("button");
    const canInstall = canInstallArmoryItem(item, armorySelectedSlotId);
    const typeKey = getItemTypeKey(item, armorySelectedSlotId);
    button.type = "button";
    button.className = `armory-inventory-item type-${typeKey}${item.installed ? " is-installed" : ""}${canInstall ? "" : " is-locked"}${item.rarity ? ` rarity-${item.rarity}` : ""}`;
    if (item.rarity) {
      button.setAttribute("style", getRarityStyle(item.rarity));
    }
    button.innerHTML = `
      <span class="armory-inventory-icon"><img src="${escapeHtml(item.icon)}" alt="" /></span>
      <span class="armory-inventory-name">${escapeHtml(getCompactItemName(item))}</span>
      <span class="armory-inventory-meta">${escapeHtml(item.installed ? "Installed" : item.owned ? `${getItemTypeBadge(item, armorySelectedSlotId)} | ${getItemBrowserRole(item)}` : "Ledger/shop")}</span>
    `;
    attachItemTooltip(button, item, armorySelectedSlotId);
    button.addEventListener("click", () => {
      if (item.installed) {
        renderArmoryInspector(armorySelectedSlotId);
        return;
      }
      if (!canInstallArmoryItem(item, armorySelectedSlotId)) {
        renderArmoryInspector(armorySelectedSlotId);
        return;
      }
      handleArmorySlotInstall(armorySelectedSlotId, item.id);
      safeUpdateHangar();
    });
    weaponInventory.appendChild(button);
  });
}

if (shipModal) {
  shipModal.hidden = true;
}

function getConsumableLabel(item) {
  return item?.hudLabel || item?.name || "Item";
}

function isConsumableUnlocked(item) {
  if (!item) return false;
  if (state.debugUnlock) return true;
  const engineeringTier = state.investments?.engineering ?? 0;
  return engineeringTier >= (item.unlockTier ?? 0);
}


function renderLedgerReceiptPanel(ledger) {
  if (!ledgerReceipt) return;
  const receipt = ledger.lastReceipt;
  if (!receipt?.lines?.length) {
    ledgerReceipt.innerHTML = `
      <div class="ledger-title">Ledger Receipt</div>
      <div class="ledger-lines">
        <div class="ledger-line memo">
          <span>No posted transactions</span>
          <strong>Awaiting buy/sell order</strong>
        </div>
      </div>
    `;
    return;
  }
  ledgerReceipt.innerHTML = `
    <div class="ledger-title">${escapeHtml(receipt.title || "Ledger Receipt")}</div>
    <div class="ledger-lines">
      ${receipt.lines
        .map(
          (row) => `
        <div class="ledger-line${row.fee ? " fee" : ""}${row.total ? " total" : ""}${row.memo ? " memo" : ""}">
          <span>${escapeHtml(row.label)}</span>
          <strong>${row.text ? escapeHtml(row.text) : `${row.amount < 0 ? "-" : ""}${formatCredits(Math.abs(row.amount))}`}</strong>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

function renderLedgerBulletinPanel(ledger) {
  if (!ledgerBulletin) return;
  const bulletin = ledger.bulletin || getActiveDemandBulletin();
  if (!bulletin) {
    ledgerBulletin.innerHTML = `
      <span class="ledger-bulletin-kicker">${LEDGER_COPY.demandBulletin}</span>
      <strong>No active demand</strong>
      <span>Standard sale rate applies.</span>
    `;
    return;
  }
  const missionsSince = (state.missionCount || 0) - (bulletin.missionCount || 0);
  const marketConfig = getMarketConfig();
  const nextRefresh = Math.max(1, marketConfig.bulletinCadence - missionsSince);
  ledgerBulletin.innerHTML = `
    <span class="ledger-bulletin-kicker">${LEDGER_COPY.demandBulletin}</span>
    <strong>${escapeHtml(bulletin.label)}</strong>
    <span>+${Math.round(marketConfig.bulletinBonusRate * 100)}% sale payout | refresh in ${nextRefresh} mission${nextRefresh === 1 ? "" : "s"}</span>
  `;
}

function renderLedgerLicenseStatus() {
  if (!ledgerLicenseStatus) return;
  const tier = getLedgerLicenseTier();
  const current = getLedgerLicenseConfig(tier);
  const next = getNextLedgerLicenseConfig();
  ledgerLicenseStatus.textContent = next
    ? `License ${tier}: ${current.stockLots} lots | next in Investments`
    : `License ${tier}: ${current.stockLots} lots | max`;
}

function renderLedgerStock(ledger) {
  if (!ledgerStockList) return;
  ledgerStockList.innerHTML = "";
  if (!ledger.stock.length) {
    ledgerStockList.innerHTML = `<div class="ledger-empty">${LEDGER_COPY.marketEmpty}</div>`;
    return;
  }
  ledger.stock.forEach((lot) => {
    const item = lot.item;
    const rarity = item.rarity || "scrap";
    const canAfford = state.credits >= lot.price;
    const typeKey = getItemTypeKey(item);
    const entry = document.createElement("div");
    entry.className = `ledger-market-item type-${typeKey} rarity-${rarity}`;
    entry.setAttribute("style", getRarityStyle(rarity));
    entry.tabIndex = 0;
    entry.innerHTML = `
      <div class="ledger-item-icon">
        <img src="${escapeHtml(item.icon || getDefaultItemIcon(rarity))}" alt="" />
      </div>
      <div class="ledger-item-main">
        <div class="ledger-item-kicker">${lot.clericalAdjustment ? escapeHtml(LEDGER_COPY.clericalAdjustment) : escapeHtml(getDenseItemRoleLabel(item))}</div>
        <div class="ledger-item-name">${escapeHtml(getCompactItemName(item))}</div>
        <div class="ledger-item-price">${formatLedgerCredits(lot.price)}</div>
      </div>
      <button type="button" class="ledger-action-button buy" ${canAfford ? "" : "disabled"}>${canAfford ? "Buy" : "Short"}</button>
    `;
    const button = entry.querySelector("button");
    button?.addEventListener("click", () => buyLedgerLot(lot.id));
    attachItemTooltip(entry, item, getComparableSlotIdForItem(item));
    ledgerStockList.appendChild(entry);
  });
}

function renderLedgerInventory(ledger) {
  if (!ledgerInventoryList) return;
  const inventory = filterAndSortBrowserItems(getArmoryInventory(state), {
    query: ledgerInventorySearch?.value || "",
    sort: ledgerInventorySort?.value || "recent",
    filter: ledgerInventoryFilter?.value || "all",
    valueResolver: (item) => getItemSellQuote(item).payout,
  });
  ledgerInventoryList.innerHTML = "";
  if (!inventory.length) {
    ledgerInventoryList.innerHTML = `<div class="ledger-empty">${LEDGER_COPY.sellEmpty}</div>`;
    return;
  }
  inventory.forEach((item) => {
    const rarity = item.rarity || "scrap";
    const quote = getItemSellQuote(item);
    const installed = isInventoryItemInstalled(item.id);
    const typeKey = getItemTypeKey(item);
    const entry = document.createElement("div");
    entry.className = `ledger-market-item type-${typeKey} rarity-${rarity}`;
    entry.setAttribute("style", getRarityStyle(rarity));
    entry.tabIndex = 0;
    entry.innerHTML = `
      <div class="ledger-item-icon">
        <img src="${escapeHtml(item.icon || getDefaultItemIcon(rarity))}" alt="" />
      </div>
      <div class="ledger-item-main">
        <div class="ledger-item-kicker">${escapeHtml(getDenseItemRoleLabel(item))}${installed ? " | Installed" : ""}</div>
        <div class="ledger-item-name">${escapeHtml(getCompactItemName(item))}</div>
        <div class="ledger-item-price">${formatLedgerCredits(quote.payout)}</div>
      </div>
      <button type="button" class="ledger-action-button sell"${installed ? " disabled" : ""}>${installed ? "Kept" : "Sell"}</button>
    `;
    const button = entry.querySelector("button");
    button?.addEventListener("click", () => sellInventoryItem(item.id));
    attachItemTooltip(entry, item, getComparableSlotIdForItem(item));
    ledgerInventoryList.appendChild(entry);
  });
}

async function renderLedgerMarketAsync() {
  if (!ledgerBulletin && !ledgerStockList && !ledgerInventoryList && !ledgerReceipt) return;
  if (ledgerStockList) ledgerStockList.innerHTML = `<div class="ledger-empty">Loading market lots...</div>`;
  const ledger = await ensureLedgerMarketReady();
  renderLedgerBulletinPanel(ledger);
  renderLedgerLicenseStatus();
  renderLedgerStock(ledger);
  renderLedgerInventory(ledger);
  renderLedgerReceiptPanel(ledger);
}

function renderLedgerMarket() {
  renderLedgerMarketAsync().catch((error) => {
    console.error("Ledger market render failed:", error);
    if (ledgerStockList) {
      ledgerStockList.innerHTML = `<div class="ledger-empty">Ledger exchange unavailable.</div>`;
    }
  });
}


function getPilotRank(credits) {
  if (credits < 250) return "Rookie";
  if (credits < 750) return "Wing Ace";
  if (credits < 1800) return "Vanguard";
  if (credits < 3600) return "Strike Leader";
  return "Legend";
}

function isLevelUnlocked(levelId, seen = null) {
  if (state.debugUnlock) return true;
  const visited = seen || new Set();
  if (visited.has(levelId)) return false;
  visited.add(levelId);

  const entry = availableLevels.find((level) => level.id === levelId);
  if (!entry) {
    const base = missionBaseIdFor(levelId);
    if (base && base !== levelId) return isLevelUnlocked(base, visited);
    return false;
  }
  if (entry.test) return true;
  if (Array.isArray(entry.requires) && entry.requires.length) {
    return entry.requires.some((requirement) => isMissionRequirementSatisfied(requirement));
  }
  const index = availableLevels.findIndex((level) => level.id === levelId);
  return index >= 0 && index < state.unlockedLevels;
}

function spawnEnemyFromSpec(spec) {
  const width = canvas.width / window.devicePixelRatio;
  const height = canvas.height / window.devicePixelRatio;
  const hull = spec.hull ?? spec.hp ?? 20;
  const armor = spec.armor ?? 0;
  const shield = spec.shield ?? 0;
  const armorClass = spec.armorClass ?? 0;
  const enemy = {
    id: enemyIdCounter++,
    type: spec.type || "fighter",
    name: spec.name || capitalize(spec.type || "fighter"),
    compendiumKey: null,
    radius: spec.radius ?? 20,
    speed: spec.speed ?? 70,
    hull,
    maxHull: hull,
    armor,
    maxArmor: armor,
    armorClass: armor > 0 ? armorClass : 0,
    shield,
    maxShield: shield,
    shieldCooldown: 0,
    shieldRegen: spec.shieldRegen ?? 10,
    healthBarTimer: 0,
    score: spec.score ?? 120,
    baseCredit: spec.baseCredit ?? 14,
    color: spec.color || "#fb7185",
    spriteScale: spec.spriteScale ?? 0.7,
    empImmune: spec.empImmune ?? !!spec.isBoss,
    ai: spec.ai,
    aiParams: spec.aiParams || {},
    pattern: spec.pattern || "drift",
    patternParams: spec.patternParams || {},
    spawnTime: mission.elapsed,
    isBoss: !!spec.isBoss,
    miniboss: !!spec.miniboss,
    parentSpawnerId: spec.parentSpawnerId ?? spec.aiParams?.parentSpawnerId ?? null,
    strafeDir: Math.random() < 0.5 ? -1 : 1,
    fireRate: spec.fireRate ?? 2.2,
    fireCooldown: Math.random() * (spec.fireRate ?? 2.2),
    fireMode: spec.fireMode || "aim",
    bulletSpeed: spec.bulletSpeed,
    bulletDamage: spec.bulletDamage,
    projectileProfile: spec.projectileProfile,
    attackPatterns: Array.isArray(spec.attackPatterns) ? spec.attackPatterns : null,
    baseAttackPatterns: Array.isArray(spec.attackPatterns) ? spec.attackPatterns.map((pattern) => cloneShipBuild(pattern)) : null,
    phases: Array.isArray(spec.phases) ? spec.phases.map((phase) => cloneShipBuild(phase)) : [],
    bossPhaseIndex: -1,
    bossPhaseTransitionTimer: 0,
    baseSpeed: spec.speed ?? 70,
    collisionDamage: spec.collisionDamage,
    damageScale: spec.damageScale ?? 1,
    aggroRadius: spec.aggroRadius,
    bulletStyle: spec.bulletStyle,
    patternTime: 0,
    dotTimer: 0,
    dotDps: 0,
    dotDpsCap: 0,
    dotStacks: [],
    empHitTimer: 0,
  };

  if (enemy.isBoss) {
    const levelIndex = Math.max(
      0,
      availableLevels.findIndex((level) => level.id === mission?.level?.id)
    );
    const bossScale = 1 + levelIndex * 0.22;
    enemy.hull = Math.round(enemy.hull * bossScale);
    enemy.maxHull = enemy.hull;
    enemy.armor = Math.round(enemy.armor * bossScale);
    enemy.maxArmor = enemy.armor;
    enemy.shield = Math.round(enemy.shield * bossScale);
    enemy.maxShield = enemy.shield;
    enemy.score = Math.round(enemy.score * bossScale);
    enemy.baseCredit = Math.round(enemy.baseCredit * bossScale);
    if (enemy.fireRate) {
      enemy.fireRate = Math.max(0.5, enemy.fireRate * (1 - levelIndex * 0.05));
      enemy.fireCooldown = Math.random() * enemy.fireRate;
    }
    if (enemy.fireCount) {
      enemy.fireCount = Math.round(enemy.fireCount * (1 + levelIndex * 0.12));
    }
    if (enemy.bulletSpeed) {
      enemy.bulletSpeed = enemy.bulletSpeed * (1 + levelIndex * 0.05);
    }
  }

  if (enemy.pattern === "swoop") {
    const dir = Math.random() < 0.5 ? -1 : 1;
    enemy.x = dir === 1 ? -60 : width + 60;
    enemy.y = 60 + Math.random() * height * 0.2;
    enemy.vx = dir * enemy.speed;
    enemy.vy = enemy.speed * 0.2;
    enemy.swoopDir = dir;
  } else {
    enemy.x = Math.random() * (width - 80) + 40;
    enemy.y = -40;
    enemy.vx = (Math.random() - 0.5) * 40;
    enemy.vy = enemy.speed;
  }

  if (enemy.pattern === "spiral") {
    enemy.spawnX = enemy.x;
    enemy.spawnY = enemy.y;
  }

  if (enemy.pattern === "spiralIn") {
    enemy.spawnX = enemy.x;
    enemy.spawnY = enemy.y;
  }

  if (enemy.pattern === "laneShift") {
    enemy.laneTargetX = enemy.x;
    enemy.laneShiftAt = enemy.patternParams.shiftEvery ?? 1.2;
    enemy.laneIndex = Math.floor(Math.random() * 3);
  }

  if (enemy.pattern === "bossSweep" || enemy.pattern === "bossAdvanceSweep" || enemy.pattern === "bossOrbit") {
    enemy.x = width / 2;
    enemy.y = -90;
    enemy.vx = enemy.speed;
    enemy.vy = enemy.speed * 0.7;
    enemy.sweepDir = Math.random() < 0.5 ? -1 : 1;
    enemy.targetY = enemy.pattern === "bossOrbit" ? 150 : 130;
    enemy.orbitAngle = Math.random() * Math.PI * 2;
    enemy.orbitStarted = false;
    enemy.orbitWarmup = 0;
    enemy.phase = 0;
    enemy.phaseTimer = 0;
  }

  if (Number.isFinite(spec.x)) enemy.x = spec.x;
  if (Number.isFinite(spec.y)) enemy.y = spec.y;
  if (Number.isFinite(spec.vx)) enemy.vx = spec.vx;
  if (Number.isFinite(spec.vy)) enemy.vy = spec.vy;

  const spriteKey = spec.sprite;
  const spriteLooksLikePath =
    typeof spriteKey === "string" && (spriteKey.includes("/") || spriteKey.endsWith(".png"));
  enemy.sprite = spriteLooksLikePath
    ? loadImageCached(spriteKey)
    : enemySpriteMap[spriteKey] || assets.enemies[enemy.type] || assets.enemies.fighter;

  // Record first-time sightings for the Drone Compendium.
  const levelId = mission?.level?.id || "unknown";
  const compKey = compendiumKeyFor(levelId, enemy.type, spec);
  enemy.compendiumKey = compKey;
  if (!state.encounteredEnemies) state.encounteredEnemies = {};
  if (!state.encounteredEnemies[compKey]) {
    state.encounteredEnemies[compKey] = true;
    saveState();
  }

  enemies.push(enemy);
  if (enemy.isBoss) {
    mission.bossAlive = true;
  }
  if (enemy.miniboss) {
    mission.activeMinibossId = enemy.id;
    mission.minibossBannerText = `${enemy.name || enemy.type}`.toUpperCase();
    mission.minibossBannerTimer = 2.2;
  }
}

function scheduleLevelSpawns() {
  const level = mission.level;
  if (!level || !level.events) return;
  while (mission.eventIndex < level.events.length) {
    const event = level.events[mission.eventIndex];
    if (mission.elapsed < event.time) break;
    const count = event.count ?? 1;
    const interval = event.interval ?? 0;
    for (let i = 0; i < count; i += 1) {
      mission.spawnQueue.push({
        spawnTime: event.time + i * interval,
        type: event.type,
        overrides: event.overrides || {},
      });
    }
    mission.eventIndex += 1;
  }
}

function scheduleLevelPickups() {
  const pickups = Array.isArray(mission?.level?.pickups) ? mission.level.pickups : [];
  while (mission.pickupIndex < pickups.length) {
    const entry = pickups[mission.pickupIndex];
    if (mission.elapsed < entry.time) break;
    spawnLevelPickup(entry);
    mission.pickupIndex += 1;
  }
}

function resolveEnemySpec(type, overrides = {}) {
  const level = mission.level;
  const merged = mergeLevelEnemySpec(level, type, overrides);
  if (!merged) return null;

  const levelScale = level?.enemyScale || level?.scale || {};
  const hpScale = Math.max(
    0.05,
    Number.isFinite(merged.hpScale) ? merged.hpScale : (Number.isFinite(levelScale.hp) ? levelScale.hp : 1)
  );
  const damageScale = Math.max(
    0.05,
    Number.isFinite(merged.damageScale) ? merged.damageScale : (Number.isFinite(levelScale.damage) ? levelScale.damage : 1)
  );

  const scaleField = (key) => {
    if (!Number.isFinite(merged[key])) return;
    merged[key] = Math.max(0, Math.round(merged[key] * hpScale));
  };
  // HP pools
  scaleField("hp");
  scaleField("hull");
  scaleField("armor");
  scaleField("shield");
  if (Number.isFinite(merged.shieldRegen)) {
    merged.shieldRegen = Math.max(0, merged.shieldRegen * hpScale);
  }

  // Damage scaling is applied at runtime (bullets/collisions) so it works with mission difficulty too.
  merged.damageScale = damageScale;
  return merged;
}

function spawnPlayerBullet({ x, y, vx, vy, damage, image }) {
  const rotation = Math.atan2(vy, vx) + Math.PI / 2;
  bullets.push({
    x,
    y,
    vx,
    vy,
    radius: 4,
    damage,
    image,
    width: 10,
    height: 32,
    rotation,
    age: 0,
    animation: "bolt",
  });
}

function spawnSalvagePod(x, y, drop) {
  if (!drop?.item || !mission?.active) return;
  salvagePods.push({
    kind: "salvage",
    x,
    y,
    radius: 18,
    vy: ECONOMY.salvagePodSpeed,
    rarity: drop.rarity || drop.item.rarity || "scrap",
    item: drop.item,
    age: 0,
    rejected: false,
  });
}

function spawnFieldCache(x, y, type) {
  if (!mission?.active) return;
  const cacheConfig = {
    shield_booster: {
      kind: "shield_booster",
      radius: 18,
      vy: ECONOMY.fieldPickupSpeed,
      label: LEDGER_COPY.shieldCache,
      color: "#7dd3fc",
    },
    armor_patch: {
      kind: "armor_patch",
      radius: 18,
      vy: ECONOMY.fieldPickupSpeed,
      label: LEDGER_COPY.armorCache,
      color: "#facc15",
    },
  }[type];
  if (!cacheConfig) return;
  salvagePods.push({
    ...cacheConfig,
    x,
    y,
    age: 0,
    rejected: false,
  });
}

function spawnLevelPickup(entry) {
  if (!entry || !mission?.active) return;
  const width = canvas.width / window.devicePixelRatio;
  const xValue = Number(entry.x);
  const x = Number.isFinite(xValue)
    ? xValue <= 1
      ? Math.max(42, Math.min(width - 42, xValue * width))
      : Math.max(42, Math.min(width - 42, xValue))
    : 48 + Math.random() * Math.max(1, width - 96);
  const y = Number.isFinite(entry.y) ? entry.y : -34;
  const type = entry.type || "salvage";
  if (type === "salvage") {
    const rarity = entry.rarity || "certified";
    const item = rollItemForRarity(rarity, {
      sourceKey: "scripted",
      includeActiveMission: true,
      slotType: entry.slotType ? normalizeArmorySlotType(entry.slotType) : undefined,
    }) || rollItemForRarity(rarity, { sourceKey: "scripted", includeActiveMission: true });
    if (item) spawnSalvagePod(x, y, { rarity, item });
    return;
  }
  spawnFieldCache(x, y, type);
}

function grantBossSalvage(enemy) {
  if (!mission) return;
  const drop = rollSalvageDrop(enemy, { force: true, forceSource: "boss" });
  if (!drop?.item) return;
  if (!Array.isArray(mission.bossSalvage)) mission.bossSalvage = [];
  mission.bossSalvage.push(drop.item);
}

function getCargoItems() {
  if (!Array.isArray(state.cargo)) state.cargo = [];
  return state.cargo;
}

function collectSalvagePod(pod) {
  const cargo = getCargoItems();
  if (cargo.length >= getConfiguredCargoSize()) {
    pod.rejected = true;
    cargoHudMessageTimer = ECONOMY.cargoFullFlashSeconds;
    spawnFloatingText(player.x, player.y - 32, LEDGER_COPY.cargoFull, "#f97316");
    return false;
  }
  cargo.push(cloneItem(pod.item));
  if (mission) mission.cargo = cargo;
  spawnFloatingText(pod.x, pod.y, getRarityConfig(pod.rarity).shortLabel, getRarityConfig(pod.rarity).color);
  return true;
}

function collectFieldCache(pod) {
  if (pod.kind === "shield_booster") {
    const restore = player.maxShield * 0.4;
    const cap = player.maxShield * 1.2;
    player.shield = Math.min(cap, player.shield + restore);
    player.shieldCooldown = 0;
    revealPlayerHealth();
    spawnFloatingText(pod.x, pod.y, LEDGER_COPY.shieldCache, pod.color || "#7dd3fc");
    playSfx("boost", 0.34);
    return true;
  }
  if (pod.kind === "armor_patch") {
    const armorMissing = player.maxArmor > 0 && player.armor < player.maxArmor;
    if (armorMissing) {
      player.armor = Math.min(player.maxArmor, player.armor + player.maxArmor * 0.35);
      spawnFloatingText(pod.x, pod.y, LEDGER_COPY.armorCache, pod.color || "#facc15");
    } else if (player.hull < player.maxHull) {
      player.hull = Math.min(player.maxHull, player.hull + player.maxHull * 0.18);
      spawnFloatingText(pod.x, pod.y, "HULL PATCH", pod.color || "#facc15");
    } else {
      spawnFloatingText(pod.x, pod.y, "PATCH READY", pod.color || "#facc15");
    }
    revealPlayerHealth();
    playSfx("boost", 0.32);
    return true;
  }
  return false;
}

function handleSalvagePodCollisions() {
  if (!mission?.active) return;
  for (let i = salvagePods.length - 1; i >= 0; i -= 1) {
    const pod = salvagePods[i];
    if (pod.rejected) continue;
    if (distance(player.x, player.y, pod.x, pod.y) < player.radius + pod.radius) {
      const collected = pod.kind === "salvage" || !pod.kind
        ? collectSalvagePod(pod)
        : collectFieldCache(pod);
      if (collected) {
        salvagePods.splice(i, 1);
      }
    }
  }
}

function getWeaponConfig() {
  const barrel = state.weapon.barrel;
  const trigger = state.weapon.trigger;
  const mount = state.weapon.mount;
  const payload = state.weapon.payload;
  const modifier = state.weapon.modifier;

  let fireRate = player.fireRate;
  let damageMult = 1;
  if (trigger === "rapid") {
    fireRate *= 0.8;
    damageMult *= 0.85;
  } else if (trigger === "burst") {
    fireRate *= 1.8;
    damageMult *= 0.9;
  }

  let modifierData = {};
  if (modifier === "pierce") {
    modifierData.pierce = 1;
  } else if (modifier === "homing") {
    modifierData.homing = true;
  } else if (modifier === "explosive") {
    modifierData.explosive = true;
  } else if (modifier === "vampiric") {
    modifierData.vampiric = 2;
  }

  return {
    barrel,
    trigger,
    mount,
    payload,
    fireRate,
    damageMult,
    modifierData,
  };
}

function getKineticImpulseBudget(build, gunDiameter = "medium") {
  const kinetic = ECONOMY.kinetic;
  const baseBudget = kinetic.impulseBudgetByDiameter?.[gunDiameter] ?? 1;
  const velocityBonus =
    Math.max(0, build?.flowVelocityLevel ?? 0) * (kinetic.velocityLevelBudgetBonus ?? 0);
  const itemBonus = Number.isFinite(build?.kineticImpulseBudget)
    ? build.kineticImpulseBudget
    : 0;
  return Math.max(0.2, baseBudget + velocityBonus + itemBonus);
}

function getPlasmaImpulseTuning(build) {
  const impulseBudget = Math.max(
    0,
    Number.isFinite(build?.kineticImpulseBudget) ? build.kineticImpulseBudget : 0
  );
  return {
    impulseBudget,
    sizeScale: 1 + impulseBudget * (ECONOMY.plasma.impulseSizeScale ?? 0),
    speedScale: 1 / (1 + impulseBudget * (ECONOMY.plasma.impulseSpeedDrag ?? 0)),
  };
}

function getPlasmaBurnDuration() {
  return Math.max(0.1, ECONOMY.plasma.burnDuration ?? 3);
}

function getPlasmaBurnDpsRate() {
  return Math.max(0, ECONOMY.plasma.burnDpsRate ?? 0.45);
}

function getPlasmaBurnMaxMultiplier() {
  const naturalRamp = getPlasmaBurnDpsRate() * getPlasmaBurnDuration();
  const configuredCap = ECONOMY.plasma.burnMaxDpsMultiplier ?? naturalRamp;
  return Math.max(0, Math.min(naturalRamp, configuredCap));
}

function getPlasmaSustainedBurnDps(directDps) {
  return Math.max(0, directDps) * getPlasmaBurnMaxMultiplier();
}

function getPlasmaBurnArmorDamageScale() {
  return Math.max(0, ECONOMY.plasma.burnArmorDamageScale ?? 1);
}

function getPlasmaBurnDpsCapForBullet(damage, cfg, mountShots = 1) {
  const cooldown = Math.max(0.01, cfg?.cooldown ?? 0);
  const projectiles = Math.max(1, (cfg?.angles?.length || 1) * mountShots);
  return getPlasmaSustainedBurnDps(Math.max(0, damage) * projectiles / cooldown);
}

function getFocusedSingleShotDamageMult({ spread, gunDiameter, cooldown }) {
  if (spread !== "focused") return 1;
  const base = FOCUSED_SINGLE_SHOT_DAMAGE_MULT[gunDiameter] || FOCUSED_SINGLE_SHOT_DAMAGE_MULT.medium;
  const slowBonus = Math.max(0, Math.min(0.75, (cooldown - 0.28) * 1.8));
  return roundTunedStat(base + slowBonus, 2);
}

function getPrimaryFireConfig(buildOverride = null) {
  const build = buildOverride || getShipBuild();
  const baseSpeed = ECONOMY.kinetic.baseVelocity;
  const baseCooldown = 0.28;
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
    diameterSpeedScale = gunDiameter === "small" ? 1.12 : gunDiameter === "large" ? 0.9 : 1;
  }

  const flowRateLevel = build.flowRateLevel ?? 0;
  const flowVelocityLevel = build.flowVelocityLevel ?? 0;
  const flowSizeLevel = build.flowSizeLevel ?? 0;
  const flowRateScale = Math.pow(0.9, Math.max(0, flowRateLevel));
  const flowVelocityScale =
    ammo === "plasma"
      ? 1 + Math.max(0, flowVelocityLevel) * 0.04
      : 1 + Math.max(0, flowVelocityLevel) * 0.08;
  const flowSizeScale = 1 + Math.max(0, flowSizeLevel) * 0.12;

  const armorSlots =
    (build.defenseSlots?.filter((slot) => slot === "armor").length ?? 0);
  const armorPenalty =
    1 + (armorSlots * 0.1 + Math.max(0, build.armorDragLevel ?? 0) * 0.06) * (build.armorDragMult ?? 1);

  const spreadRadiusScale = {
    focused: 1,
    dual: 0.82,
    dualRapid: 0.54,
    rapid: 0.58,
    burst: 0.5,
    wide: 0.5,
  }[spread] ?? 1;
  const cooldownMult = Number.isFinite(build.cooldownMult)
    ? Math.max(0.35, build.cooldownMult)
    : 1;
  const plasmaImpulseTuning = ammo === "plasma"
    ? getPlasmaImpulseTuning(build)
    : { impulseBudget: 0, sizeScale: 1, speedScale: 1 };
  const baseProjectileRadius = 4 * diameterScale * flowSizeScale * spreadRadiusScale;
  const projectileRadius = baseProjectileRadius * plasmaImpulseTuning.sizeScale;
  const baseSizeFactor = Math.max(0.05, baseProjectileRadius / 4);
  const sizeFactor = Math.max(0.05, projectileRadius / 4);
  const kineticImpulseBudget =
    ammo === "kinetic" ? getKineticImpulseBudget(build, gunDiameter) : null;
  const velocityFactor =
    ammo === "kinetic"
      ? Math.max(
          0.2,
              kineticImpulseBudget /
            Math.pow(sizeFactor, ECONOMY.kinetic.sizeVelocityTradeoff)
        )
      : diameterSpeedScale * flowVelocityScale * plasmaImpulseTuning.speedScale;
  const bulletSpeed = baseSpeed * velocityFactor;

  let cooldown = baseCooldown * armorPenalty * flowRateScale * cooldownMult;
  if (spread === "dual") cooldown *= 1.28; // two straight barrels, slower per trigger
  if (spread === "dualRapid") cooldown *= 0.68; // paired machine-gun barrels
  if (spread === "rapid") cooldown *= 0.46; // machine-gun cadence, one small round per trigger
  if (spread === "burst") cooldown *= 2.15; // 5 shots at once
  if (spread === "wide") cooldown *= 1.15; // still 5 shots, but meant to be spammy
  cooldown = Math.max(0.08, cooldown);
  const shotDamageMult = getFocusedSingleShotDamageMult({ spread, gunDiameter, cooldown });

  const jitter =
    spread === "burst"
      ? (5 * Math.PI) / 180
      : spread === "rapid" || spread === "dualRapid"
        ? (1.5 * Math.PI) / 180
        : 0;
  const pattern = {
    wide: {
      angles: [-0.35, -0.175, 0, 0.175, 0.35],
      offsets: [0, 0, 0, 0, 0],
    },
    dual: {
      angles: [0, 0],
      offsets: [-9, 9],
    },
    dualRapid: {
      angles: [0, 0],
      offsets: [-7, 7],
    },
    burst: {
      angles: [0, 0, 0, 0, 0],
      offsets: [-4, -2, 0, 2, 4],
    },
    rapid: {
      angles: [0],
      offsets: [0],
    },
    focused: {
      angles: [0],
      offsets: [0],
    },
  }[spread] || { angles: [0], offsets: [0] };
  const isRapidPattern = spread === "rapid" || spread === "dualRapid";
  const armorChipFloorRate = isRapidPattern ? 0.035 : ECONOMY.minDamageFloor;
  const minArmorChipDamage = isRapidPattern ? 0.25 : 1;

  return {
    ammo,
    effect,
    effectTune: build.effectUpgrades?.[effect] ?? 0,
    spread,
    bulletSpeed,
    projectileRadius,
    cooldown,
    jitter,
    angles: pattern.angles,
    offsets: pattern.offsets,
    armorPenalty,
    flowRateScale,
    flowVelocityScale,
    flowSizeScale,
    diameterScale,
    diameterSpeedScale,
    baseSizeFactor,
    sizeFactor,
    velocityFactor,
    kineticImpulseBudget,
    plasmaImpulseBudget: plasmaImpulseTuning.impulseBudget,
    plasmaImpulseSizeScale: plasmaImpulseTuning.sizeScale,
    plasmaImpulseSpeedScale: plasmaImpulseTuning.speedScale,
    shotDamageMult,
    armorChipFloorRate,
    minArmorChipDamage,
  };
}

function computePrimaryDamage({ ammo, speed, radius, damageBoostMult = null, buildDamageMult = null, shotDamageMult = 1 }) {
  const sizeFactor = Math.max(0.05, radius / 4);
  const velFactor = Math.max(0.2, speed / ECONOMY.kinetic.baseVelocity);
  const baseKinetic = ECONOMY.kinetic.baseDamage;
  const basePlasma = ECONOMY.plasma.baseDamage;
  let damage =
    ammo === "plasma"
      ? basePlasma * sizeFactor
      : baseKinetic * sizeFactor * Math.pow(velFactor, ECONOMY.kinetic.velocityExponent);
  const effectiveBuildDamageMult = Number.isFinite(buildDamageMult)
    ? buildDamageMult
    : Number.isFinite(getShipBuild()?.primaryDamageMult)
    ? getShipBuild().primaryDamageMult
    : 1;
  damage *= effectiveBuildDamageMult;
  damage *= Number.isFinite(shotDamageMult) ? shotDamageMult : 1;
  damage *= Number.isFinite(damageBoostMult) ? damageBoostMult : player.damageBoostMult || 1;
  return damage;
}

function firePlayerBullet({ build = null, damageScale = 1, xOffset = 0, sourceKey = "primary" } = {}) {
  const cfg = getPrimaryFireConfig(build);
  const mount = state.weapon.mount || "front";
  const mountShots = mount === "rear" ? 2 : 1;
  const visualTheme = getLevelVisualTheme();
  playSfx("laserSmall", 0.25);

  const resolveBulletImage = (ammo) => {
    if (cfg.effect === "pierce" && visualTheme?.playerPierce) return visualTheme.playerPierce;
    if (ammo === "plasma") return visualTheme?.playerPlasma || assets.spreadBullet;
    return visualTheme?.playerBullet || assets.playerBullet;
  };

  const spawnBullet = (vx, vy, extra = {}) => {
    const speed = Math.hypot(vx, vy);
    const radius = extra.radius ?? cfg.projectileRadius;
    const image = resolveBulletImage(cfg.ammo);
    const bullet = {
      x: extra.x ?? player.x,
      y: extra.y ?? player.y - player.radius,
      vx,
      vy,
      radius,
      damage: computePrimaryDamage({
        ammo: cfg.ammo,
        speed,
        radius,
        buildDamageMult: build?.primaryDamageMult,
        shotDamageMult: cfg.shotDamageMult,
      }) * damageScale,
      image: extra.image || image,
      width: extra.width ?? (
        cfg.ammo === "plasma"
          ? Math.max(16, 28 * (radius / 4))
          : Math.max(6, 10 * (radius / 4))
      ),
      height: extra.height ?? (
        cfg.ammo === "plasma"
          ? Math.max(16, 28 * (radius / 4))
          : Math.max(14, 32 * (radius / 4))
      ),
      rotation: Math.atan2(vy, vx) + Math.PI / 2,
      baseSpeed: speed,
      originAngle: Math.atan2(vy, vx),
      homingMaxOffset: 0.6,
      homingStrength: 0.05,
      payload: cfg.ammo,
      plasma: cfg.ammo === "plasma",
      armorChipFloorRate: cfg.armorChipFloorRate,
      minArmorChipDamage: cfg.minArmorChipDamage,
      age: 0,
      animation:
        extra.animation ||
        (cfg.effect === "pierce"
          ? "lance"
          : cfg.ammo === "plasma"
            ? "plasma"
            : "bolt"),
      ...extra,
    };
    if (cfg.ammo === "plasma" && !visualTheme?.playerPlasma?.loaded) {
      bullet.shape = "orb";
      bullet.color = "rgba(34, 197, 94, 0.95)";
    } else if (cfg.ammo === "plasma") {
      bullet.color = "rgba(45, 212, 191, 0.95)";
      bullet.glowColor = "rgba(34, 211, 238, 0.42)";
      bullet.spinRate = bullet.spinRate ?? 1.6;
    }
    const tune = cfg.effectTune ?? 0;
    if (cfg.effect === "homing") {
      bullet.homing = true;
      bullet.homingMaxOffset = 0.6 + tune * 0.14;
      bullet.homingStrength = 0.05 + tune * 0.018;
    } else if (cfg.effect === "pierce") {
      bullet.pierce = 1 + tune;
    } else if (cfg.effect === "explosive") {
      bullet.explosive = true;
    } else if (cfg.effect === "vampiric") {
      bullet.vampiric = 0.1 + tune * 0.035;
    }
    if (bullet.pierce && !bullet.hitIds) bullet.hitIds = new Set();
    if (bullet.explosive) {
      bullet.explosiveRadius = 70 * (bullet.radius / 4) * (1 + tune * 0.18);
      bullet.explosiveDamageMult = 0.7;
      bullet.exploded = false;
    }
    bullets.push(bullet);
  };

  const spawnPattern = (direction = 1, mountScale = 1) => {
    cfg.angles.forEach((angle, index) => {
      const jitter = cfg.jitter ? (Math.random() * 2 - 1) * cfg.jitter : 0;
      const shotAngle = angle + jitter;
      const vx = Math.sin(shotAngle) * cfg.bulletSpeed;
      const vy = -Math.cos(shotAngle) * cfg.bulletSpeed * direction;
      const radius = cfg.projectileRadius;
      const sizeScale = radius / 4;
      const lateralOffset = cfg.offsets?.[index] ?? 0;
      // Slight position shuffle so centered micro-shots don't perfectly overlap.
      const posJitter =
        cfg.spread === "burst" || cfg.spread === "wide"
          ? (Math.random() - 0.5) * 6
          : 0;
      spawnBullet(vx, vy, {
        x: player.x + xOffset + lateralOffset + posJitter,
        y: player.y - player.radius,
        radius,
        width: cfg.ammo === "plasma" ? Math.max(16, 28 * sizeScale) : Math.max(6, 10 * sizeScale),
        height: cfg.ammo === "plasma" ? Math.max(16, 28 * sizeScale) : Math.max(14, 32 * sizeScale),
        damageScale: mountScale,
      });
      // Apply mount scale by scaling damage post-compute.
      const spawnedBullet = bullets[bullets.length - 1];
      spawnedBullet.damage *= mountScale;
      if (cfg.ammo === "plasma") {
        spawnedBullet.plasmaBurnDpsCap = getPlasmaBurnDpsCapForBullet(
          spawnedBullet.damage,
          cfg,
          mountShots
        );
        spawnedBullet.plasmaBurnSourceKey = sourceKey;
      }
      if (cfg.spread === "wide" || cfg.spread === "burst") {
        spawnedBullet.rotation += (index - 2) * 0.01;
      }
    });
  };

  if (mount === "rear") {
    const mountScale = 0.7;
    spawnPattern(1, mountScale);
    spawnPattern(-1, mountScale);
  } else {
    spawnPattern(1, 1);
  }
}

function getPrimaryBuildForItem(item) {
  return composeShipBuildFromArmory(state, { primaryItem: item || getPrimaryArmoryItem(state) });
}

function getCurrentPrimaryFireCooldown() {
  if (canDualFireCurrentLoadout()) {
    const cooldowns = ensurePrimaryBayCooldowns();
    return Math.min(...cooldowns.map((value) => Math.max(0, value)));
  }
  return getPrimaryFireConfig(getPrimaryBuildForItem(getPrimaryArmoryItem(state))).cooldown;
}

function ensurePrimaryBayCooldowns() {
  if (!Array.isArray(player.primaryBayCooldowns) || player.primaryBayCooldowns.length < 2) {
    player.primaryBayCooldowns = [0, 0];
  }
  player.primaryBayCooldowns[0] = Math.max(0, Number(player.primaryBayCooldowns[0]) || 0);
  player.primaryBayCooldowns[1] = Math.max(0, Number(player.primaryBayCooldowns[1]) || 0);
  return player.primaryBayCooldowns;
}

function tickPrimaryCooldowns(delta) {
  player.fireCooldown = Math.max(0, player.fireCooldown - delta);
  const cooldowns = ensurePrimaryBayCooldowns();
  cooldowns[0] = Math.max(0, cooldowns[0] - delta);
  cooldowns[1] = Math.max(0, cooldowns[1] - delta);
}

function getPrimaryBayBuildAndConfig(bayIndex) {
  const item = bayIndex === 1 ? getSecondPrimaryArmoryItem() : getPrimaryArmoryItem(state, 0);
  if (!item) return null;
  const build = getPrimaryBuildForItem(item);
  return {
    item,
    build,
    cfg: getPrimaryFireConfig(build),
  };
}

function fireCurrentPrimaryWeapons({ dualMode = canDualFireCurrentLoadout() } = {}) {
  if (dualMode && canDualFireCurrentLoadout()) {
    const damageScale = getDualFireDamageMult();
    const cooldowns = ensurePrimaryBayCooldowns();
    const bayMounts = [
      { bayIndex: 0, xOffset: -10 },
      { bayIndex: 1, xOffset: 10 },
    ];
    let fired = false;
    bayMounts.forEach(({ bayIndex, xOffset }) => {
      if (cooldowns[bayIndex] > 0) return;
      const setup = getPrimaryBayBuildAndConfig(bayIndex);
      if (!setup) return;
      firePlayerBullet({ build: setup.build, damageScale, xOffset, sourceKey: `primary-${bayIndex}` });
      cooldowns[bayIndex] = setup.cfg.cooldown;
      fired = true;
    });
    player.fireCooldown = getCurrentPrimaryFireCooldown();
    return fired ? player.fireCooldown : null;
  }
  const activeBuild = getPrimaryBuildForItem(getPrimaryArmoryItem(state));
  firePlayerBullet({ build: activeBuild, sourceKey: "primary-active" });
  return getPrimaryFireConfig(activeBuild).cooldown;
}

function swapPrimaryBay() {
  if (!mission?.active || player.swapCooldown > 0) return;
  if (!getSecondPrimaryArmoryItem()) return;
  if (canDualFireCurrentLoadout()) {
    spawnFloatingText(player.x, player.y - 42, "DUAL FIRE ACTIVE", "#f0b429");
    updateHud();
    updateMobileControls();
    return;
  }
  state.activePrimaryBay = getActivePrimaryBay(state) === 1 ? 0 : 1;
  player.swapCooldown = SECOND_PRIMARY_SWAP_COOLDOWN;
  state.shipBuild = composeShipBuildFromArmory(state);
  syncShipBuildToLegacy();
  saveState();
  const active = getPrimaryArmoryItem(state);
  spawnFloatingText(player.x, player.y - 42, `SWAP: ${getCompactItemName(active)}`, "#7dd3fc");
  updateHud();
  updateMobileControls();
}

function findMiniWeaponTarget(stats) {
  if (!stats?.config || !enemies.length) return null;
  const cfg = stats.config;
  const range = stats.range || cfg.range || 360;
  const arcDegrees = cfg.arc === "turret" ? 360 : cfg.arcDegrees || (cfg.arc === "wide" ? 140 : 70);
  let best = null;
  let bestDistance = Infinity;
  enemies.forEach((enemy) => {
    if (!enemy || enemy.hull <= 0) return;
    const dx = enemy.x - player.x;
    const dy = enemy.y - player.y;
    const dist = Math.hypot(dx, dy);
    if (dist > range) return;
    if (cfg.arc !== "turret") {
      if (dy > enemy.radius) return;
      const angleFromForward = Math.abs(Math.atan2(dx, -dy)) * (180 / Math.PI);
      if (angleFromForward > arcDegrees / 2) return;
    }
    if (dist < bestDistance) {
      best = enemy;
      bestDistance = dist;
    }
  });
  return best;
}

function fireMiniWeapon() {
  const item = getSelectedMiniWeapon();
  const stats = getMiniWeaponStatsForItem(item);
  if (!stats.config || stats.damage <= 0) return false;
  const target = findMiniWeaponTarget(stats);
  if (!target) return false;
  const cfg = stats.config;
  const dx = target.x - player.x;
  const dy = target.y - player.y;
  const dist = Math.hypot(dx, dy) || 1;
  const speed = cfg.speed || 500;
  const vx = (dx / dist) * speed;
  const vy = (dy / dist) * speed;
  const radius = cfg.radius || (cfg.shotSize === "large" ? 4.5 : 2.8);
  const visualTheme = getLevelVisualTheme();
  const image = cfg.ammo === "plasma"
    ? visualTheme?.playerPlasma || assets.spreadBullet
    : visualTheme?.playerBullet || assets.playerBullet;
  const bullet = {
    x: player.x,
    y: player.y - player.radius * 0.35,
    vx,
    vy,
    radius,
    damage: stats.damage,
    image,
    width: cfg.ammo === "plasma" ? Math.max(10, radius * 5) : Math.max(5, radius * 3),
    height: cfg.ammo === "plasma" ? Math.max(10, radius * 5) : Math.max(12, radius * 8),
    rotation: Math.atan2(vy, vx) + Math.PI / 2,
    baseSpeed: speed,
    originAngle: Math.atan2(vy, vx),
    payload: cfg.ammo || "kinetic",
    plasma: cfg.ammo === "plasma",
    armorChipFloorRate: cfg.cadence === "rapid" ? 0.035 : ECONOMY.minDamageFloor,
    minArmorChipDamage: cfg.cadence === "rapid" ? 0.25 : 1,
    age: 0,
    animation: cfg.ammo === "plasma" ? "plasma" : "bolt",
    color: cfg.ammo === "plasma" ? "rgba(45, 212, 191, 0.95)" : "rgba(125, 211, 252, 0.95)",
    source: "mini",
  };
  if (cfg.effect === "homing") {
    bullet.homing = true;
    bullet.homingMaxOffset = 0.9;
    bullet.homingStrength = 0.08;
  } else if (cfg.effect === "pierce") {
    bullet.pierce = 1;
    bullet.hitIds = new Set();
  } else if (cfg.effect === "explosive") {
    bullet.explosive = true;
    bullet.explosiveRadius = 44;
    bullet.explosiveDamageMult = 0.55;
    bullet.exploded = false;
  } else if (cfg.effect === "vampiric") {
    bullet.vampiric = 0.06;
  }
  bullets.push(bullet);
  player.miniFireCooldown = stats.cooldown;
  playSfx("laserSmall", 0.12);
  return true;
}

function clearEnemyProjectilesNearPlayer(radius = player.empClearRadius || EMP_CLEAR_BASE_RADIUS) {
  let cleared = 0;
  for (let i = enemyBullets.length - 1; i >= 0; i -= 1) {
    const bullet = enemyBullets[i];
    if (distance(player.x, player.y, bullet.x, bullet.y) <= radius + (bullet.radius || 0)) {
      enemyBullets.splice(i, 1);
      cleared += 1;
    }
  }
  if (cleared > 0) {
    spawnFloatingText(player.x, player.y - 54, `${cleared} shots cleared`, "#7dd3fc");
  }
  spawnExplosion(player.x, player.y, radius * 0.45, {
    intensity: 0.72,
    blend: "lighter",
    style: "empPulse",
    coalesce: false,
  });
  addCameraShake(Math.min(0.18, 0.05 + cleared * 0.01), player.x, player.y);
  return cleared;
}

function fireAltWeapon() {
  if (state.rmbWeapon === "none") return;
  if (state.rmbWeapon === "cloak") {
    playSfx("cloak", 0.35);
    player.cloakTimer = player.cloakDuration;
  } else if (state.rmbWeapon === "emp") {
    playSfx("emp", 0.4);
    mission.empTimer = player.empDuration;
    clearEnemyProjectilesNearPlayer(player.empClearRadius);
  } else if (state.rmbWeapon === "bulwark") {
    playSfx("boost", 0.45);
    player.bulwarkTimer = player.bulwarkDuration;
    player.bulwarkShield = player.bulwarkShieldBonus;
  }
}

function useConsumable(slotIndex) {
  if (!mission || !mission.active) return;
  if (!mission.consumableSlots) return;
  const slotId = mission.consumableSlots[slotIndex];
  if (!slotId || slotId === "none") return;
  const item = consumablesById[slotId];
  if (!item) return;
  const uses = mission.consumableUses?.[slotIndex] ?? 0;
  const cooldown = mission.consumableCooldowns?.[slotIndex] ?? 0;
  if (uses <= 0 || cooldown > 0) return;

  mission.consumableUses[slotIndex] = uses - 1;
  mission.consumableCooldowns[slotIndex] = item.cooldown ?? 0;
  state.consumablesOwned[slotId] = Math.max(0, (state.consumablesOwned[slotId] ?? 0) - 1);
  saveState();

  if (slotId === "bomb") {
    const blastRadius = 220;
    const blastDamage = 120 + mission.difficulty * 10;
    spawnExplosion(player.x, player.y, blastRadius * 0.35, {
      intensity: 0.65,
      blend: "lighter",
      style: "big",
      coalesce: false,
    });
    addCameraShake(0.22, player.x, player.y);
    playSfx("explosion", 0.12);
    enemies.forEach((enemy) => {
      const d = distance(player.x, player.y, enemy.x, enemy.y);
      if (d > blastRadius) return;
      const scale = 1 - d / blastRadius;
      revealEnemyHealth(enemy);
      applyDamageToEnemy(enemy, blastDamage * scale);
    });
  } else if (slotId === "shieldBoost") {
    const shieldGain = player.maxShield * 0.4;
    player.shield = Math.min(player.maxShield * 1.2, player.shield + shieldGain);
    player.shieldCooldown = 0;
    playSfx("boost", 0.35);
  } else if (slotId === "overcharge") {
    player.damageBoostMult = Math.max(player.damageBoostMult, 1.4);
    player.damageBoostTimer = item.duration ?? 6;
    playSfx("boost", 0.4);
  }
}

function isPlainObject(value) {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}

function getLevelProjectileProfiles(level = mission?.level) {
  return isPlainObject(level?.projectileProfiles) ? level.projectileProfiles : {};
}

function pickProjectileRuntimeFields(source) {
  if (!isPlainObject(source)) return {};
  const fields = {};
  PROJECTILE_RUNTIME_PROFILE_KEYS.forEach((key) => {
    if (source[key] !== undefined) fields[key] = source[key];
  });
  return fields;
}

function resolveLevelProjectileProfile(ref, level = mission?.level) {
  if (!ref) return {};
  const profiles = getLevelProjectileProfiles(level);
  if (typeof ref === "string") {
    const profile = profiles[ref];
    return isPlainObject(profile) ? { id: ref, ...pickProjectileRuntimeFields(profile) } : { id: ref };
  }
  if (!isPlainObject(ref)) return {};
  const baseRef = typeof ref.profile === "string"
    ? ref.profile
    : typeof ref.id === "string" && profiles[ref.id]
      ? ref.id
      : null;
  const base = baseRef ? resolveLevelProjectileProfile(baseRef, level) : {};
  return { ...base, ...pickProjectileRuntimeFields(ref) };
}

function resolveEnemyProjectileProfile(enemy, pattern = null, shot = null) {
  const parts = [];
  const shotHasProfile = typeof shot === "string" || (isPlainObject(shot) && !!shot.profile);
  if (enemy?.projectileProfile) parts.push(resolveLevelProjectileProfile(enemy.projectileProfile));
  if (pattern?.profile && !shotHasProfile) parts.push(resolveLevelProjectileProfile(pattern.profile));
  if (typeof shot === "string") {
    parts.push(resolveLevelProjectileProfile(shot));
  } else if (isPlainObject(shot)) {
    if (shot.profile) parts.push(resolveLevelProjectileProfile(shot.profile));
    parts.push(pickProjectileRuntimeFields(shot));
  }
  return Object.assign({}, ...parts);
}

function resolveProjectileImage(imageKey, visualTheme) {
  if (!imageKey) return null;
  if (typeof imageKey !== "string") return imageKey;
  if (visualTheme?.enemyProjectiles?.[imageKey]) return visualTheme.enemyProjectiles[imageKey];
  if (imageKey === "enemyBullet") return visualTheme?.enemyBullet || assets.enemyBullet;
  if (imageKey === "enemySpreadShard") return visualTheme?.enemySpreadShard || assets.altArc;
  if (imageKey === "enemyRadialEmber") return visualTheme?.enemyRadialEmber || assets.enemyBullet;
  if (imageKey === "enemyPurpleOrb") return visualTheme?.enemyPurpleOrb || assets.enemyBullet;
  if (imageKey === "altArc") return assets.altArc;
  if (imageKey === "assets.enemyBullet") return assets.enemyBullet;
  return loadImageCached(imageKey);
}

function getProjectileThreatStyle(projectile, enemy) {
  const visualTheme = getLevelVisualTheme();
  const enemyProjectiles = visualTheme?.enemyProjectiles || {};
  const threat = projectile.threatClass || projectile.visual;
  let style = {};

  if (threat === "chip") {
    const size = projectile.width || projectile.height || 14;
    style = {
      image: enemyProjectiles.enemy_space_cool_chip_dart || visualTheme?.enemySpreadShard || assets.altArc,
      width: size,
      height: size,
      animation: "bolt",
    };
  } else if (threat === "heavy") {
    const image = enemyProjectiles.enemy_space_cool_plasma_ball || visualTheme?.enemyPurpleOrb;
    style = image
      ? {
        image,
        width: 52,
        height: 52,
        animation: "orb",
        spinRate: 2.8,
      }
      : {
        shape: "orb",
        color: "#38bdf8",
        radius: 8,
        animation: "orb",
      };
  } else if (threat === "bossHazard") {
    const image = enemyProjectiles.enemy_space_warm_boss_core || visualTheme?.enemyPurpleOrb;
    style = image
      ? {
        image,
        width: 72,
        height: 72,
        animation: "orb",
        spinRate: 2.2,
      }
      : {
        shape: "orb",
        color: "#a78bfa",
        radius: 12,
        animation: "orb",
      };
  } else if (threat === "standard") {
    style = {
      image: enemyProjectiles.enemy_space_warm_standard_bolt || visualTheme?.enemyBullet || assets.enemyBullet,
      width: visualTheme?.enemyBulletWidth || 10,
      height: visualTheme?.enemyBulletHeight || 32,
      animation: "bolt",
    };
  } else {
    style = getEnemyBulletStyle(enemy);
  }

  const image = resolveProjectileImage(projectile.image, visualTheme);
  const hasAuthoredImage = !!projectile.image;
  const hasAuthoredSpin = Number.isFinite(projectile.spinRate);
  return {
    ...style,
    ...(projectile.shape ? { shape: projectile.shape } : {}),
    ...(projectile.color ? { color: projectile.color } : {}),
    ...(image ? { image } : {}),
    ...(Number.isFinite(projectile.radius) ? { radius: projectile.radius } : {}),
    ...(Number.isFinite(projectile.width) ? { width: projectile.width } : {}),
    ...(Number.isFinite(projectile.height) ? { height: projectile.height } : {}),
    ...(projectile.animation ? { animation: projectile.animation } : {}),
    ...(hasAuthoredImage && !hasAuthoredSpin ? { spinRate: 0 } : {}),
    ...(hasAuthoredSpin ? { spinRate: projectile.spinRate } : {}),
  };
}

function getProjectileBaseDamage(enemy, projectile) {
  if (Number.isFinite(projectile.damage)) return projectile.damage;
  const baseDamage = enemy.bulletDamage ?? (14 + mission.difficulty * 1.3);
  return baseDamage * (enemy.damageScale ?? 1);
}

function getProjectileBaseSpeed(enemy, projectile) {
  return Number.isFinite(projectile.speed)
    ? projectile.speed
    : enemy.bulletSpeed ?? 200 + mission.difficulty * 15;
}

function applyProjectileSpeedJitter(speed, pattern, shot) {
  const jitter = Number.isFinite(shot?.speedJitter)
    ? shot.speedJitter
    : Number.isFinite(pattern?.speedJitter)
      ? pattern.speedJitter
      : 0;
  if (!jitter) return speed;
  const spread = Math.min(1, Math.max(0, jitter));
  return speed * (1 - spread + Math.random() * spread * 2);
}

function getAimedEnemyAngle(enemy) {
  if (enemy.scatterTimer > 0) {
    const base = Math.atan2(player.y - enemy.y, player.x - enemy.x);
    return base + (Math.random() - 0.5) * 0.7;
  }
  return player.cloakTimer > 0
    ? Math.random() * Math.PI * 2
    : Math.atan2(player.y - enemy.y, player.x - enemy.x);
}

function getPatternShot(pattern, index) {
  if (!Array.isArray(pattern?.shots) || !pattern.shots.length) return null;
  return pattern.shots[index % pattern.shots.length];
}

function getPatternCount(pattern, fallback) {
  if (Number.isFinite(pattern?.count)) return Math.max(1, Math.round(pattern.count));
  if (Array.isArray(pattern?.shots) && pattern.shots.length) return pattern.shots.length;
  return fallback;
}

function getPatternSpreadRadians(pattern, fallback) {
  if (Number.isFinite(pattern?.spreadDeg)) return degToRad(pattern.spreadDeg);
  if (Number.isFinite(pattern?.spread)) return pattern.spread;
  return fallback;
}

function chooseEnemyAttackPattern(enemy) {
  const patterns = Array.isArray(enemy.attackPatterns)
    ? enemy.attackPatterns.filter((pattern) => isPlainObject(pattern))
    : [];
  if (!patterns.length) return null;
  const totalWeight = patterns.reduce((sum, pattern) => sum + Math.max(0, pattern.weight ?? 1), 0);
  if (totalWeight <= 0) return patterns[0];
  let roll = Math.random() * totalWeight;
  for (const pattern of patterns) {
    roll -= Math.max(0, pattern.weight ?? 1);
    if (roll <= 0) return pattern;
  }
  return patterns[patterns.length - 1];
}

function fireEnemyBullet(enemy, angleOverride, speedOverride, context = {}) {
  const cloaked = player.cloakTimer > 0;
  const fallbackAngle = Math.random() * Math.PI * 2;
  const angle =
    angleOverride ??
    (cloaked && enemy.fireMode === "aim"
      ? fallbackAngle
      : Math.atan2(player.y - enemy.y, player.x - enemy.x));
  const projectile = resolveEnemyProjectileProfile(enemy, context.pattern, context.shot);
  const speed = applyProjectileSpeedJitter(
    speedOverride ?? getProjectileBaseSpeed(enemy, projectile),
    context.pattern,
    isPlainObject(context.shot) ? context.shot : null
  );
  const damage = getProjectileBaseDamage(enemy, projectile);

  const style = enemy.bulletStyle || getProjectileThreatStyle(projectile, enemy);
  if (style.shape === "orb") {
    enemyBullets.push({
      x: enemy.x,
      y: enemy.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: style.radius || 6,
      color: style.color || "#fb7185",
      shape: "orb",
      damage,
      threatClass: projectile.threatClass || projectile.visual || null,
      age: 0,
      animation: style.animation || "orb",
    });
    return;
  }

  enemyBullets.push({
    x: enemy.x,
    y: enemy.y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: 4,
    image: style.image || assets.enemyBullet,
    width: style.width || 10,
    height: style.height || 32,
    rotation: angle + Math.PI / 2,
    damage,
    threatClass: projectile.threatClass || projectile.visual || null,
    age: 0,
    animation: style.animation || "bolt",
    spinRate: style.spinRate || 0,
  });
}

function fireEnemySpread(enemy, count = 5, spread = 0.6, pattern = null) {
  const base = getAimedEnemyAngle(enemy);
  const resolvedCount = getPatternCount(pattern, count);
  const resolvedSpread = getPatternSpreadRadians(pattern, spread);
  const start = resolvedCount === 1 ? base : base - resolvedSpread / 2;
  const step = resolvedCount === 1 ? 0 : resolvedSpread / (resolvedCount - 1);
  for (let i = 0; i < resolvedCount; i += 1) {
    const shot = getPatternShot(pattern, i);
    const angle = start + step * i;
    const offset = isPlainObject(shot) && Number.isFinite(shot.angleOffsetDeg) ? degToRad(shot.angleOffsetDeg) : 0;
    fireEnemyBullet(enemy, angle + offset, undefined, { pattern, shot });
  }
}

function fireEnemyRadial(enemy, count = 16, pattern = null) {
  const resolvedCount = getPatternCount(pattern, count);
  const step = (Math.PI * 2) / resolvedCount;
  for (let i = 0; i < resolvedCount; i += 1) {
    const shot = getPatternShot(pattern, i);
    const angleFromShot = isPlainObject(shot) && Number.isFinite(shot.angleDeg) ? degToRad(shot.angleDeg) : null;
    const offset = isPlainObject(shot) && Number.isFinite(shot.angleOffsetDeg) ? degToRad(shot.angleOffsetDeg) : 0;
    const angle = (angleFromShot ?? i * step) + offset;
    const speed = pattern
      ? undefined
      : (enemy.bulletSpeed ?? 160) * (0.8 + Math.random() * 0.6);
    fireEnemyBullet(enemy, angle, speed, { pattern, shot });
  }
}

function fireEnemyAttackPattern(enemy, pattern) {
  if (pattern.tractor) queueTractorPattern(enemy, pattern.tractor);
  const mode = pattern.mode || pattern.fireMode || enemy.fireMode || "aim";
  if (mode === "spread") {
    fireEnemySpread(enemy, pattern.count || enemy.fireCount || 5, pattern.spread || enemy.fireSpread || 0.8, pattern);
    return;
  }
  if (mode === "radial") {
    fireEnemyRadial(enemy, pattern.count || enemy.fireCount || 18, pattern);
    return;
  }
  const resolvedCount = getPatternCount(pattern, 1);
  const base = getAimedEnemyAngle(enemy);
  for (let index = 0; index < resolvedCount; index += 1) {
    const shot = getPatternShot(pattern, index);
    const fallbackOffset = resolvedCount > 1 ? (index - (resolvedCount - 1) / 2) * degToRad(pattern.spreadDeg || 0) : 0;
    const offset = isPlainObject(shot) && Number.isFinite(shot.angleOffsetDeg)
      ? degToRad(shot.angleOffsetDeg)
      : fallbackOffset;
    fireEnemyBullet(enemy, base + offset, undefined, { pattern, shot });
  }
}

function getEnemyFireCooldown(enemy, pattern = null) {
  const rate = Number.isFinite(pattern?.fireRate) ? pattern.fireRate : enemy.fireRate;
  let multiplier = 0.95;
  if (enemy.conductorBuff?.fireRateMult) multiplier *= enemy.conductorBuff.fireRateMult;
  if (enemy.scatterTimer > 0) multiplier *= 2;
  return Math.max(0.4, rate * multiplier);
}

function getEnemyProjectileDamageValues(spec, difficulty, level) {
  if (!spec) return [];
  const collectProfileDamage = (ref) => {
    const profile = resolveLevelProjectileProfile(ref, level);
    return Number.isFinite(profile.damage) ? [profile.damage] : [];
  };
  if (Array.isArray(spec.attackPatterns) && spec.attackPatterns.length) {
    const values = [];
    spec.attackPatterns.forEach((pattern) => {
      if (!isPlainObject(pattern)) return;
      const patternValues = [];
      if (pattern.profile) patternValues.push(...collectProfileDamage(pattern.profile));
      if (Array.isArray(pattern.shots)) {
        pattern.shots.forEach((shot) => {
          if (typeof shot === "string") {
            patternValues.push(...collectProfileDamage(shot));
          } else if (isPlainObject(shot)) {
            if (shot.profile) patternValues.push(...collectProfileDamage(shot.profile));
            if (Number.isFinite(shot.damage)) patternValues.push(shot.damage);
          }
        });
      }
      if (!patternValues.length && spec.projectileProfile) {
        patternValues.push(...collectProfileDamage(spec.projectileProfile));
      }
      values.push(...patternValues);
    });
    if (values.length) return values;
  }
  const value = getProjectileDamageForSpec(spec, difficulty, level);
  return Number.isFinite(value) ? [value] : [];
}

function getEnemyBulletStyle(enemy) {
  const visualTheme = getLevelVisualTheme();
  if (enemy.fireMode === "radial") {
    if (visualTheme?.enemyRadialEmber) {
      const size = visualTheme.enemyRadialEmberSize || 24;
      return { image: visualTheme.enemyRadialEmber, width: size, height: size, animation: "ember", spinRate: 5.8 };
    }
    return { shape: "orb", color: "#38bdf8", radius: 6, animation: "orb" };
  }
  if (enemy.fireMode === "spread") {
    return visualTheme?.enemySpreadShard
      ? {
        image: visualTheme.enemySpreadShard,
        width: visualTheme.enemySpreadShardSize || 28,
        height: visualTheme.enemySpreadShardSize || 28,
        animation: "shard",
        spinRate: 2.2
      }
      : { image: assets.altArc, width: 12, height: 30, animation: "shard" };
  }
  if (enemy.ai === "stalker") {
    if (visualTheme?.enemyPurpleOrb) {
      const size = visualTheme.enemyPurpleOrbSize || 26;
      return { image: visualTheme.enemyPurpleOrb, width: size, height: size, animation: "orb", spinRate: 3.4 };
    }
    return { shape: "orb", color: "#a855f7", radius: 5, animation: "orb" };
  }
  if (enemy.ai === "hunter") {
    return {
      image: visualTheme?.enemyBullet || assets.enemyBullet,
      width: visualTheme?.enemyBulletWidth || 10,
      height: visualTheme?.enemyBulletHeight || 32,
      animation: "bolt"
    };
  }
  return {
    image: visualTheme?.enemyBullet || assets.enemyBullet,
    width: visualTheme?.enemyBulletWidth || 10,
    height: visualTheme?.enemyBulletHeight || 32,
    animation: "bolt"
  };
}

function applySentinelMovement(enemy, delta, empFactor = 1) {
  const width = canvas.width / window.devicePixelRatio;
  const holdY = enemy.aiParams.holdY ?? 150;
  const slide = enemy.aiParams.slideSpeed ?? 0.9;
  const keepOut = enemy.aiParams.keepOut ?? 140;
  const dx = player.x - enemy.x;
  const dy = player.y - enemy.y;
  const dist = Math.hypot(dx, dy) || 1;
  const desiredY = dist < keepOut ? Math.max(80, holdY - 70) : holdY;
  const yErr = desiredY - enemy.y;
  const targetVy = yErr * 1.2;
  enemy.vy += (targetVy - enemy.vy) * 0.08;
  const sway = Math.sin(mission.elapsed * 1.2 + enemy.id) * 50;
  const targetX = Math.max(60, Math.min(width - 60, player.x + sway));
  const xErr = targetX - enemy.x;
  const targetVx = xErr * slide;
  enemy.vx += (targetVx - enemy.vx) * 0.09;
  enemy.x += enemy.vx * empFactor * delta;
  enemy.y += enemy.vy * empFactor * delta;
}

function applyDuelistMovement(enemy, delta, empFactor = 1, target = player) {
  const width = canvas.width / window.devicePixelRatio;
  const holdY = enemy.aiParams.holdY ?? 190;
  const standoff = enemy.aiParams.standoff ?? 240;
  const strafeSpeed = enemy.aiParams.strafeSpeed ?? 1.0;
  const dx = target.x - enemy.x;
  const dy = target.y - enemy.y;
  const dist = Math.hypot(dx, dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  const tx = -uy;
  const ty = ux;
  const radialErr = dist - standoff;
  const radialPush = radialErr * 0.9;
  const targetVx = (tx * enemy.speed * strafeSpeed + ux * radialPush) * empFactor;
  const targetVy =
    (ty * enemy.speed * 0.12 + uy * radialPush + (holdY - enemy.y) * 1.1) * empFactor;
  enemy.vx += (targetVx - enemy.vx) * 0.1;
  enemy.vy += (targetVy - enemy.vy) * 0.1;
  if (enemy.x < 70) enemy.vx += 40 * empFactor;
  if (enemy.x > width - 70) enemy.vx -= 40 * empFactor;
  enemy.x += enemy.vx * empFactor * delta;
  enemy.y += enemy.vy * empFactor * delta;
}

function getDelayedPlayerPosition(delaySeconds = 2) {
  const history = Array.isArray(mission?.playerPositionHistory) ? mission.playerPositionHistory : [];
  if (!history.length) return { x: player.x, y: player.y };
  const targetTime = mission.elapsed - delaySeconds;
  let best = history[0];
  for (const sample of history) {
    if (sample.t > targetTime) break;
    best = sample;
  }
  return best || { x: player.x, y: player.y };
}

function linkedToMatchesConductor(linkedTo, conductorType) {
  if (!linkedTo || !conductorType) return false;
  if (Array.isArray(linkedTo)) return linkedTo.includes(conductorType);
  return linkedTo === conductorType;
}

function updateConductorLinks(delta) {
  const conductors = enemies.filter((enemy) => enemy.ai === "conductor" && enemy.hull > 0);
  enemies.forEach((enemy) => {
    if (!enemy.aiParams?.linkedTo || enemy.hull <= 0) return;
    const conductor = conductors.find((candidate) => linkedToMatchesConductor(enemy.aiParams.linkedTo, candidate.type));
    if (conductor) {
      enemy.conductorBuff = conductor.aiParams?.conductorBuff || { fireRateMult: 0.85, shieldRegenBonus: 8 };
      return;
    }
    if (enemy.conductorBuff) {
      enemy.conductorBuff = null;
      enemy.scatterTimer = Math.max(enemy.scatterTimer || 0, 1.2);
      enemy.pattern = "zigzag";
      enemy.patternParams = { ...(enemy.patternParams || {}), amplitude: 160, frequency: 5 };
      enemy.patternTime = 0;
      enemy.spawnX = enemy.x;
      enemy.spawnY = enemy.y;
    }
    if (enemy.scatterTimer > 0) {
      enemy.scatterTimer = Math.max(0, enemy.scatterTimer - delta);
    }
  });
}

function getNearestLooseSalvagePod(enemy) {
  let best = null;
  let bestDistance = Infinity;
  salvagePods.forEach((pod) => {
    if (!pod || pod.rejected || pod.kind && pod.kind !== "salvage") return;
    const d = distance(enemy.x, enemy.y, pod.x, pod.y);
    if (d < bestDistance) {
      best = pod;
      bestDistance = d;
    }
  });
  return best;
}

function updateThiefEnemy(enemy, delta, empFactor = 1) {
  const escapeSpeed = enemy.aiParams.escapeSpeed ?? 130;
  if (enemy.carriedPod) {
    enemy.vx *= 0.92;
    enemy.vy = -escapeSpeed;
    enemy.x += enemy.vx * empFactor * delta;
    enemy.y += enemy.vy * empFactor * delta;
    if (enemy.y < -70) {
      enemy.escaped = true;
      mission.repossessedCount = (mission.repossessedCount || 0) + 1;
      spawnFloatingText(enemy.x, 36, "REPOSSESSED", "#f87171");
    }
    return;
  }
  const pod = getNearestLooseSalvagePod(enemy);
  if (!pod) {
    applyDuelistMovement(enemy, delta, empFactor);
    return;
  }
  const dx = pod.x - enemy.x;
  const dy = pod.y - enemy.y;
  const d = Math.hypot(dx, dy) || 1;
  const seekSpeed = enemy.speed * 1.15;
  enemy.vx += ((dx / d) * seekSpeed - enemy.vx) * 0.12;
  enemy.vy += ((dy / d) * seekSpeed - enemy.vy) * 0.12;
  enemy.x += enemy.vx * empFactor * delta;
  enemy.y += enemy.vy * empFactor * delta;
  if (d < enemy.radius + pod.radius + 4) {
    const index = salvagePods.indexOf(pod);
    if (index >= 0) salvagePods.splice(index, 1);
    enemy.carriedPod = pod;
    enemy.vx *= 0.35;
    enemy.vy = -escapeSpeed;
    spawnFloatingText(enemy.x, enemy.y - 22, "SEIZED", "#f87171");
  }
}

function updateLienEnemy(enemy, delta, empFactor = 1) {
  const attachRadius = enemy.aiParams.attachRadius ?? 150;
  const drainPerSecond = enemy.aiParams.drainPerSecond ?? 6;
  const dx = player.x - enemy.x;
  const dy = player.y - enemy.y;
  const d = Math.hypot(dx, dy) || 1;
  if (d > attachRadius) {
    applyDuelistMovement(enemy, delta, empFactor);
    return;
  }
  enemy.vx *= 0.88;
  enemy.vy *= 0.88;
  enemy.x += enemy.vx * empFactor * delta;
  enemy.y += enemy.vy * empFactor * delta;
  const drained = Math.min(mission.killCredits || 0, drainPerSecond * delta);
  if (drained > 0) {
    mission.killCredits -= drained;
    enemy.lienDrained = (enemy.lienDrained || 0) + drained;
    enemy.lienPopupTimer = (enemy.lienPopupTimer || 0) - delta;
    if (enemy.lienPopupTimer <= 0) {
      enemy.lienPopupTimer = 0.35;
      spawnFloatingText(enemy.x, enemy.y + 18, "-cr", "#f87171");
    }
  }
}

function spawnRuntimeEnemy(type, overrides = {}) {
  const spec = resolveEnemySpec(type, overrides);
  if (!spec) return null;
  spawnEnemyFromSpec(spec);
  return enemies[enemies.length - 1] || null;
}

function updateSpawnerEnemy(enemy, delta) {
  if (enemy.ai !== "spawner") return;
  const spawnEvery = enemy.aiParams.spawnEvery ?? 7;
  enemy.spawnChildTimer = Number.isFinite(enemy.spawnChildTimer) ? enemy.spawnChildTimer - delta : spawnEvery * 0.65;
  if (enemy.spawnChildTimer > 0) return;
  enemy.spawnChildTimer = spawnEvery;
  const spawnType = enemy.aiParams.spawnType || "sporeling";
  const maxAlive = enemy.aiParams.maxAlive ?? (enemy.type === "broodmother" ? 6 : 4);
  const alive = enemies.filter((candidate) => candidate.parentSpawnerId === enemy.id && candidate.hull > 0).length;
  if (alive >= maxAlive) return;
  const angle = Math.random() * Math.PI * 2;
  const child = spawnRuntimeEnemy(spawnType, {
    x: enemy.x + Math.cos(angle) * Math.max(18, enemy.radius * 0.55),
    y: enemy.y + Math.sin(angle) * Math.max(18, enemy.radius * 0.55),
    vx: Math.cos(angle) * 38,
    vy: 50 + Math.sin(angle) * 24,
    parentSpawnerId: enemy.id,
    aiParams: { parentSpawnerId: enemy.id },
  });
  if (child) spawnFloatingText(enemy.x, enemy.y - enemy.radius, "SPAWN", "#86efac");
}

function spawnSplitChildren(enemy) {
  if (enemy.ai !== "splitter") return;
  const splitCount = Math.max(0, Math.round(enemy.aiParams.splitCount ?? 2));
  const splitType = enemy.aiParams.splitType || "sporeling";
  for (let i = 0; i < splitCount; i += 1) {
    const angle = (Math.PI * 2 * i) / Math.max(1, splitCount) + Math.random() * 0.35;
    spawnRuntimeEnemy(splitType, {
      x: enemy.x + Math.cos(angle) * 12,
      y: enemy.y + Math.sin(angle) * 12,
      vx: Math.cos(angle) * 85,
      vy: Math.sin(angle) * 55 + 70,
    });
  }
}

function updateBossPhase(enemy, delta) {
  if (!enemy.isBoss || !Array.isArray(enemy.phases) || !enemy.phases.length) return;
  if (enemy.bossPhaseTransitionTimer > 0) {
    enemy.bossPhaseTransitionTimer = Math.max(0, enemy.bossPhaseTransitionTimer - delta);
  }
  const nextIndex = (enemy.bossPhaseIndex || -1) + 1;
  const nextPhase = enemy.phases[nextIndex];
  if (!nextPhase) return;
  const totalMax = (enemy.maxShield || 0) + (enemy.maxArmor || 0) + (enemy.maxHull || 0);
  if (totalMax <= 0) return;
  const remaining = getEnemyRemainingDurability(enemy);
  const threshold = nextPhase.hpFraction * totalMax;
  if (remaining > threshold) return;
  enemy.bossPhaseIndex = nextIndex;
  enemy.attackPatterns = Array.isArray(nextPhase.attackPatterns)
    ? nextPhase.attackPatterns.map((pattern) => cloneShipBuild(pattern))
    : enemy.attackPatterns;
  enemy.speed = (enemy.baseSpeed || enemy.speed || 70) * (nextPhase.speedMult || 1);
  const hold = mission?.level?.id === "act2_pilgrimage" ? 1.0 : 0.8;
  enemy.bossPhaseTransitionTimer = hold;
  enemy.fireCooldown = Math.max(enemy.fireCooldown || 0, hold);
  const phaseLabel = nextPhase.label || `PHASE ${nextIndex + 2}`;
  mission.bossPhaseBannerText = phaseLabel.toUpperCase();
  mission.bossPhaseBannerTimer = 1.2;
  screenFlash = Math.min(0.55, screenFlash + 0.28);
  addCameraShake(0.18, enemy.x, enemy.y);
}

function queueTractorPattern(enemy, tractor) {
  if (!isPlainObject(tractor)) return;
  if (enemy.tractorTelegraphTimer > 0 || enemy.tractorActiveTimer > 0) return;
  enemy.tractorTelegraphTimer = 1.0;
  enemy.tractorPendingDuration = tractor.duration ?? 1.4;
  enemy.tractorStrength = tractor.strength ?? 220;
}

function updateTractorEffect(enemy, delta) {
  if (enemy.tractorTelegraphTimer > 0) {
    enemy.tractorTelegraphTimer = Math.max(0, enemy.tractorTelegraphTimer - delta);
    if (enemy.tractorTelegraphTimer === 0) {
      enemy.tractorActiveTimer = Math.max(0, enemy.tractorPendingDuration || 1.4);
      enemy.tractorPendingDuration = 0;
    }
  }
  if (enemy.tractorActiveTimer > 0) {
    enemy.tractorActiveTimer = Math.max(0, enemy.tractorActiveTimer - delta);
    const dx = enemy.x - player.x;
    const dy = enemy.y - player.y;
    const d = Math.hypot(dx, dy) || 1;
    const pull = Math.max(0, enemy.tractorStrength || 220) * delta;
    player.x += (dx / d) * pull;
    player.y += (dy / d) * pull;
  }
}

function update(delta) {
  backgroundScroll += delta * 18;
  updateStarfield(delta);

  // Camera/flash juice decays even if we leave the mission early.
  cameraShake.trauma = Math.max(0, cameraShake.trauma - delta * 7.0);
  const kickDamp = Math.exp(-12 * delta);
  cameraShake.kickX *= kickDamp;
  cameraShake.kickY *= kickDamp;
  screenFlash = Math.max(0, screenFlash - delta * 6.0);
  cargoHudMessageTimer = Math.max(0, cargoHudMessageTimer - delta);

  if (!mission || !mission.active || paused) return;

  mission.elapsed += delta;
  mission.minibossBannerTimer = Math.max(0, (mission.minibossBannerTimer || 0) - delta);
  mission.bossPhaseBannerTimer = Math.max(0, (mission.bossPhaseBannerTimer || 0) - delta);
  if (!Array.isArray(mission.playerPositionHistory)) mission.playerPositionHistory = [];
  mission.playerPositionHistory.push({ t: mission.elapsed, x: player.x, y: player.y });
  while (
    mission.playerPositionHistory.length > 2 &&
    mission.elapsed - mission.playerPositionHistory[0].t > 4
  ) {
    mission.playerPositionHistory.shift();
  }
  const dying = mission.deathTimer > 0;
  const bossFinishing = mission.bossFinishTimer > 0;
  const endingSequence = dying || bossFinishing;
  if (dying) {
    mission.deathTimer = Math.max(0, mission.deathTimer - delta);
  }
  if (bossFinishing) {
    mission.bossFinishTimer = Math.max(0, mission.bossFinishTimer - delta);
  }
  mission.spawnTimer -= delta;
  mission.enemyFireTimer -= delta;
  mission.difficulty = getMissionDifficultyAtElapsed(mission.elapsed);
  updateConductorLinks(delta);
  enemies.forEach((enemy) => updateBossPhase(enemy, delta));
  if (player.bulwarkTimer > 0) {
    player.bulwarkTimer = Math.max(0, player.bulwarkTimer - delta);
    if (player.bulwarkTimer === 0) {
      player.bulwarkShield = 0;
    }
  }
  if (player.damageBoostTimer > 0) {
    player.damageBoostTimer = Math.max(0, player.damageBoostTimer - delta);
    if (player.damageBoostTimer === 0) {
      player.damageBoostMult = 1;
    }
  }
  if (mission.empTimer > 0) {
    mission.empTimer = Math.max(0, mission.empTimer - delta);
  }
  if (player.hitTimer > 0) {
    player.hitTimer = Math.max(0, player.hitTimer - delta);
  }
  if (player.cloakTimer > 0) {
    player.cloakTimer = Math.max(0, player.cloakTimer - delta);
  }
  if (mission.consumableCooldowns) {
    for (let i = 0; i < mission.consumableCooldowns.length; i += 1) {
      if (mission.consumableCooldowns[i] > 0) {
        mission.consumableCooldowns[i] = Math.max(0, mission.consumableCooldowns[i] - delta);
      }
    }
  }

  if (!endingSequence) {
    if (mission.level) {
      scheduleLevelSpawns();
      scheduleLevelPickups();
      for (let i = mission.spawnQueue.length - 1; i >= 0; i -= 1) {
        const entry = mission.spawnQueue[i];
        if (mission.elapsed >= entry.spawnTime) {
          const spec = resolveEnemySpec(entry.type, entry.overrides);
          if (!spec) {
            console.warn(`Skipping unresolved enemy type '${entry.type}' in mission '${mission.level?.id || "unknown"}'.`);
            mission.spawnQueue.splice(i, 1);
            continue;
          }
          spawnEnemyFromSpec(spec);
          mission.spawnQueue.splice(i, 1);
        }
      }
    } else {
      const spawnInterval = Math.max(0.3, 1.2 - mission.difficulty * 0.05);
      if (mission.spawnTimer <= 0) {
        // fallback random spawning
        spawnEnemyFromSpec({ type: "fighter" });
        mission.spawnTimer = spawnInterval;
      }
    }
  }

  const globalEmp = mission.empTimer > 0;
  if (!endingSequence) {
    enemies.forEach((enemy) => {
      if (!enemy.empImmune && (globalEmp || enemy.empHitTimer > 0)) return;
      if (enemy.bossPhaseTransitionTimer > 0) return;
      enemy.fireCooldown -= delta;
      if (enemy.fireCooldown > 0) return;
      if (enemy.y < 40) return;
      if (enemy.isBoss || enemy.y < canvas.height * 0.75) {
        const attackPattern = chooseEnemyAttackPattern(enemy);
        if (attackPattern) {
          fireEnemyAttackPattern(enemy, attackPattern);
        } else if (enemy.fireMode === "spread") {
          fireEnemySpread(enemy, enemy.fireCount || 5, enemy.fireSpread || 0.8);
        } else if (enemy.fireMode === "radial") {
          fireEnemyRadial(enemy, enemy.fireCount || 18);
        } else {
          fireEnemyBullet(enemy);
        }
        enemy.fireCooldown = getEnemyFireCooldown(enemy, attackPattern);
      }
    });
  }

  const width = canvas.width / window.devicePixelRatio;
  const height = canvas.height / window.devicePixelRatio;

  if (!endingSequence) {
    if (inputMode === "touch" && touchState.active) {
      const dx = touchState.x - player.x;
      const dy = touchState.y - player.y;
      const distanceToTarget = Math.hypot(dx, dy) || 1;
      const step = Math.min(distanceToTarget, touchState.maxSpeed * delta);
      player.x += (dx / distanceToTarget) * step;
      player.y += (dy / distanceToTarget) * step;
    } else if (pointer.active) {
      player.x = pointer.x;
      player.y = pointer.y;
    }

    player.x = Math.max(40, Math.min(width - 40, player.x));
    player.y = Math.max(height * 0.3, Math.min(height - 50, player.y));

    tickPrimaryCooldowns(delta);
    player.miniFireCooldown = Math.max(0, player.miniFireCooldown - delta);
    player.swapCooldown = Math.max(0, player.swapCooldown - delta);
    player.altCooldown -= delta;
    const wantsPrimaryFire =
      pointerButtons.left ||
      devAutoFire ||
      (inputMode === "touch" && touchState.active);
    if (wantsPrimaryFire) {
      if (canDualFireCurrentLoadout()) {
        fireCurrentPrimaryWeapons({ dualMode: true });
      } else if (player.fireCooldown <= 0) {
        player.fireCooldown = fireCurrentPrimaryWeapons({ dualMode: false });
      }
    }
    if (player.miniFireCooldown <= 0) {
      fireMiniWeapon();
    }
    if (pointerButtons.right && player.altCooldown <= 0) {
      fireAltWeapon();
      if (state.rmbWeapon === "cloak") {
        player.altCooldown = player.cloakCooldownTime + player.cloakDuration;
      } else if (state.rmbWeapon === "emp") {
        player.altCooldown = player.empCooldownTime + player.empDuration;
      } else {
        player.altCooldown = player.altCooldownTime + player.bulwarkDuration;
      }
    }
  }

  if (player.maxShield > 0) {
    if (player.shieldCooldown > 0) {
      player.shieldCooldown = Math.max(0, player.shieldCooldown - delta);
    } else if (player.shield < player.maxShield) {
      player.shield = Math.min(player.maxShield, player.shield + delta * (player.shieldRegen || 12));
    }
  } else {
    player.shield = 0;
  }

  bullets.forEach((bullet) => {
    bullet.age = (bullet.age || 0) + delta;
    if (bullet.orbiting) {
      bullet.orbitAngle += bullet.orbitSpeed * delta;
      bullet.orbitLife -= delta;
      bullet.x = player.x + Math.cos(bullet.orbitAngle) * bullet.orbitRadius;
      bullet.y = player.y + Math.sin(bullet.orbitAngle) * bullet.orbitRadius;
      return;
    }
    if (bullet.homing && enemies.length) {
      let closest = null;
      let best = Infinity;
      enemies.forEach((enemy) => {
        const d = distance(bullet.x, bullet.y, enemy.x, enemy.y);
        if (d < best) {
          best = d;
          closest = enemy;
        }
      });
      if (closest) {
        const dx = closest.x - bullet.x;
        const dy = closest.y - bullet.y;
        const dist = Math.hypot(dx, dy) || 1;
        const speed = bullet.baseSpeed || Math.hypot(bullet.vx, bullet.vy) || 400;
        const vxNorm = bullet.vx / speed;
        const vyNorm = bullet.vy / speed;
        const dot = (vxNorm * dx + vyNorm * dy) / dist;
        const originAngle = bullet.originAngle ?? Math.atan2(bullet.vy, bullet.vx);
        const desiredAngle = Math.atan2(dy, dx);
        const maxOffset = bullet.homingMaxOffset ?? 0.6;
        const offset = wrapAngle(desiredAngle - originAngle);
        if (dot > 0.15 && Math.abs(offset) <= maxOffset) {
          const limitedAngle = originAngle + Math.max(-maxOffset, Math.min(maxOffset, offset));
          const targetVx = Math.cos(limitedAngle) * speed;
          const targetVy = Math.sin(limitedAngle) * speed;
          const strength = bullet.homingStrength ?? 0.05;
          bullet.vx += (targetVx - bullet.vx) * strength;
          bullet.vy += (targetVy - bullet.vy) * strength;
        }
      }
    }
    if (bullet.homing) {
      bullet.rotation = Math.atan2(bullet.vy, bullet.vx) + Math.PI / 2;
    }
    bullet.x += bullet.vx * delta;
    bullet.y += bullet.vy * delta;
  });
  enemyBullets.forEach((bullet) => {
    bullet.age = (bullet.age || 0) + delta;
    bullet.x += bullet.vx * delta;
    bullet.y += bullet.vy * delta;
  });
  salvagePods.forEach((pod) => {
    pod.age = (pod.age || 0) + delta;
    pod.y += (pod.vy || ECONOMY.salvagePodSpeed) * delta;
  });

  if (player.healthBarTimer > 0) {
    player.healthBarTimer = Math.max(0, player.healthBarTimer - delta);
  }

  enemies.forEach((enemy) => {
    if (enemy.healthBarTimer > 0) {
      enemy.healthBarTimer = Math.max(0, enemy.healthBarTimer - delta);
    }
    if (enemy.playerCollisionCooldown > 0) {
      enemy.playerCollisionCooldown = Math.max(0, enemy.playerCollisionCooldown - delta);
    }
    tickPlasmaBurn(enemy, delta);
    if (enemy.empHitTimer > 0) {
      enemy.empHitTimer = Math.max(0, enemy.empHitTimer - delta);
    }
    const empActive = !enemy.empImmune && (globalEmp || enemy.empHitTimer > 0);
    const empFactor = empActive ? 0.55 : 1;
    enemy.patternTime += delta * empFactor;
    if (enemy.maxShield > 0) {
      if (enemy.shieldCooldown > 0) {
        enemy.shieldCooldown = Math.max(0, enemy.shieldCooldown - delta);
      } else if (enemy.shield < enemy.maxShield) {
        const conductorRegen = enemy.conductorBuff?.shieldRegenBonus || 0;
        enemy.shield = Math.min(enemy.maxShield, enemy.shield + (enemy.shieldRegen + conductorRegen) * delta);
      }
    }
    updateSpawnerEnemy(enemy, delta);
    updateTractorEffect(enemy, delta);
    if (enemy.pattern === "zigzag") {
      const amplitude = enemy.patternParams.amplitude ?? 90;
      const frequency = enemy.patternParams.frequency ?? 3;
      const t = enemy.patternTime;
      if (enemy.spawnX === undefined) {
        enemy.spawnX = enemy.x;
        enemy.spawnY = enemy.y;
      }
      enemy.x = enemy.spawnX + Math.sin(t * frequency) * amplitude;
      enemy.y = enemy.spawnY + t * enemy.speed;
      return;
    }
    if (enemy.pattern === "swoop") {
      const amplitude = enemy.patternParams.amplitude ?? 60;
      const frequency = enemy.patternParams.frequency ?? 2.5;
      const t = enemy.patternTime;
      enemy.x += enemy.vx * empFactor * delta;
      enemy.y += (Math.sin(t * frequency) * amplitude + enemy.speed * 0.3) * empFactor * delta;
      return;
    }
    if (enemy.pattern === "strafe") {
      const width = canvas.width / window.devicePixelRatio;
      if (!enemy.strafeDir) enemy.strafeDir = Math.random() < 0.5 ? -1 : 1;
      enemy.y += enemy.speed * 0.25 * empFactor * delta;
      enemy.x += enemy.strafeDir * enemy.speed * empFactor * delta;
      if (enemy.x < 60 || enemy.x > width - 60) {
        enemy.strafeDir *= -1;
      }
      return;
    }
    if (enemy.pattern === "spiral") {
      const amplitude = enemy.patternParams.amplitude ?? 120;
      const frequency = enemy.patternParams.frequency ?? 4;
      const t = enemy.patternTime;
      const cx = enemy.spawnX ?? enemy.x;
      const cy = enemy.spawnY ?? enemy.y;
      enemy.x = cx + Math.cos(t * frequency) * amplitude;
      enemy.y = cy + t * enemy.speed * 0.4 * empFactor;
      return;
    }
    if (enemy.pattern === "spiralIn") {
      const amplitude = enemy.patternParams.amplitude ?? 160;
      const frequency = enemy.patternParams.frequency ?? 4.4;
      const decay = enemy.patternParams.decay ?? 0.22;
      const t = enemy.patternTime;
      const cx = enemy.spawnX ?? enemy.x;
      const cy = enemy.spawnY ?? enemy.y;
      const a = amplitude * Math.exp(-decay * t);
      enemy.x = cx + Math.cos(t * frequency) * a;
      enemy.y = cy + t * enemy.speed * 0.5 * empFactor;
      return;
    }
    if (enemy.pattern === "laneShift") {
      const width = canvas.width / window.devicePixelRatio;
      const margin = 60;
      const shiftEvery = enemy.patternParams.shiftEvery ?? 1.2;
      const shiftSpeed = enemy.patternParams.shiftSpeed ?? 5.5;
      const lanes = Array.isArray(enemy.patternParams.lanes) ? enemy.patternParams.lanes : null;

      if (enemy.laneShiftAt === undefined) enemy.laneShiftAt = shiftEvery;
      if (enemy.laneIndex === undefined) enemy.laneIndex = Math.floor(Math.random() * 3);
      if (enemy.laneTargetX === undefined) enemy.laneTargetX = enemy.x;

      while (enemy.patternTime >= enemy.laneShiftAt) {
        enemy.laneShiftAt += shiftEvery;
        if (lanes && lanes.length) {
          enemy.laneIndex = (enemy.laneIndex + 1 + (Math.random() < 0.25 ? 1 : 0)) % lanes.length;
          const laneVal = lanes[enemy.laneIndex];
          const lane = Number.isFinite(laneVal) ? laneVal : Math.random();
          const frac = lane <= 1.2 ? lane : lane / width;
          enemy.laneTargetX = margin + frac * (width - margin * 2);
        } else {
          enemy.laneTargetX = margin + Math.random() * (width - margin * 2);
        }
      }

      const alpha = 1 - Math.exp(-shiftSpeed * empFactor * delta);
      enemy.x += (enemy.laneTargetX - enemy.x) * alpha;
      enemy.y += enemy.speed * empFactor * delta;
      return;
    }
    if (enemy.pattern === "stall") {
      const width = canvas.width / window.devicePixelRatio;
      const stallY = enemy.patternParams.stallY ?? 150;
      const stallDuration = enemy.patternParams.stallDuration ?? 1.8;
      const strafeAmp = enemy.patternParams.strafeAmp ?? 90;
      const strafeFreq = enemy.patternParams.strafeFreq ?? 1.6;
      const postSpeed = enemy.patternParams.postSpeedMult ?? 1.05;

      if (enemy.stallState === undefined) {
        enemy.stallState = 0;
        enemy.stallTimer = 0;
        enemy.stallAnchorX = enemy.x;
      }

      if (enemy.stallState === 0) {
        enemy.y += enemy.speed * 0.95 * empFactor * delta;
        if (enemy.y >= stallY) {
          enemy.y = stallY;
          enemy.stallState = 1;
          enemy.stallTimer = 0;
          enemy.stallAnchorX = enemy.x;
        }
      } else if (enemy.stallState === 1) {
        enemy.stallTimer += empFactor * delta;
        enemy.y = stallY;
        enemy.x = enemy.stallAnchorX + Math.sin(enemy.patternTime * strafeFreq) * strafeAmp;
        if (enemy.x < 60) enemy.x = 60;
        if (enemy.x > width - 60) enemy.x = width - 60;
        if (enemy.stallTimer >= stallDuration) {
          enemy.stallState = 2;
        }
      } else {
        enemy.y += enemy.speed * postSpeed * empFactor * delta;
        enemy.x += Math.sin(enemy.patternTime * (strafeFreq * 0.7)) * 12 * empFactor * delta;
      }
      return;
    }
    if (enemy.pattern === "bossSweep") {
      if (enemy.y < enemy.targetY) {
        enemy.y += enemy.vy * empFactor * delta;
      } else {
        const width = canvas.width / window.devicePixelRatio;
        enemy.x += enemy.sweepDir * enemy.speed * empFactor * delta;
        if (enemy.x < 80 || enemy.x > width - 80) {
          enemy.sweepDir *= -1;
        }
      }
      return;
    }
    if (enemy.pattern === "bossAdvanceSweep") {
      const width = canvas.width / window.devicePixelRatio;
      const targetY = enemy.targetY ?? 130;
      const centerX = width / 2;
      const pause = enemy.patternParams.pause ?? 0.85;
      const advance = enemy.patternParams.advance ?? 55;
      const advanceTime = enemy.patternParams.advanceTime ?? 0.65;
      const sweepDuration = enemy.patternParams.sweepDuration ?? 2.3;
      const retreatTime = enemy.patternParams.retreatTime ?? 0.8;
      const depth = enemy.patternParams.depth ?? 70;
      const sweepAmp = enemy.patternParams.sweepAmp ?? Math.min(320, width * 0.38);

      if (enemy.y < targetY) {
        enemy.y += enemy.vy * empFactor * delta;
        return;
      }

      if (enemy.phase === undefined) {
        enemy.phase = 0;
        enemy.phaseTimer = 0;
      }
      enemy.phaseTimer += empFactor * delta;

      if (enemy.phase === 0) {
        enemy.x += (centerX - enemy.x) * 0.08;
        enemy.y += (targetY - enemy.y) * 0.08;
        if (enemy.phaseTimer >= pause) {
          enemy.phase = 1;
          enemy.phaseTimer = 0;
        }
      } else if (enemy.phase === 1) {
        enemy.y += (advance / Math.max(0.15, advanceTime)) * empFactor * delta;
        enemy.x += Math.sin(mission.elapsed * 1.1) * 10 * empFactor * delta;
        if (enemy.phaseTimer >= advanceTime) {
          enemy.phase = 2;
          enemy.phaseTimer = 0;
          enemy.sweepAngle = 0;
        }
      } else if (enemy.phase === 2) {
        if (!Number.isFinite(enemy.sweepAngle)) enemy.sweepAngle = 0;
        // Smooth, heavy-feeling sweep: a full sinusoid across the arena + a gentle dip in depth.
        const sweepSpeed = (Math.PI * 2) / Math.max(0.4, sweepDuration);
        enemy.sweepAngle += sweepSpeed * empFactor * delta;
        const a = enemy.sweepAngle;
        enemy.x = centerX + Math.sin(a) * sweepAmp;
        enemy.y = (targetY + advance) + Math.sin(a * 0.5) * depth;
        if (enemy.phaseTimer >= sweepDuration || enemy.sweepAngle >= Math.PI * 2) {
          enemy.phase = 3;
          enemy.phaseTimer = 0;
        }
      } else {
        enemy.y -= (advance / Math.max(0.2, retreatTime)) * empFactor * delta;
        if (enemy.y < targetY) enemy.y = targetY;
        if (enemy.phaseTimer >= retreatTime) {
          enemy.phase = 0;
          enemy.phaseTimer = 0;
        }
      }
      return;
    }
    if (enemy.pattern === "bossOrbit") {
      const width = canvas.width / window.devicePixelRatio;
      const targetY = enemy.targetY ?? 150;
      const centerX = width / 2;
      const warmupTime = enemy.patternParams.warmupTime ?? 0.55;
      const wobble = enemy.patternParams.wobble ?? 16;
      const warmup = Math.max(0, Math.min(1, enemy.orbitWarmup ?? 0));
      const baseCenterY = targetY + Math.sin(mission.elapsed * 0.35) * wobble * warmup;
      const radiusX = enemy.patternParams.radiusX ?? Math.min(340, width * 0.34);
      const radiusY = enemy.patternParams.radiusY ?? 70;
      const orbitSpeed = enemy.patternParams.orbitSpeed ?? 0.85;

      // Important: once orbit starts, keep orbiting even if the orbital path dips
      // above the initial targetY (otherwise the boss jitters between "enter" and "orbit").
      if (!enemy.orbitStarted) {
        enemy.y += enemy.vy * empFactor * delta;
        if (enemy.y >= targetY) {
          enemy.y = targetY;
          enemy.orbitStarted = true;
          enemy.orbitWarmup = 0;
          if (!Number.isFinite(enemy.orbitAngle)) enemy.orbitAngle = Math.random() * Math.PI * 2;
        }
        return;
      }
      enemy.orbitWarmup = Math.min(1, (enemy.orbitWarmup ?? 0) + delta / Math.max(0.1, warmupTime));
      if (!Number.isFinite(enemy.orbitAngle)) enemy.orbitAngle = Math.random() * Math.PI * 2;
      enemy.orbitAngle += orbitSpeed * empFactor * delta;
      const rScale = enemy.orbitWarmup ?? 1;
      enemy.x = centerX + Math.cos(enemy.orbitAngle) * radiusX * rScale;
      enemy.y = baseCenterY + Math.sin(enemy.orbitAngle) * radiusY * rScale;
      return;
    }
    if (enemy.ai === "stalker") {
      const dx = player.x - enemy.x;
      const dy = player.y - enemy.y;
      const distanceToPlayer = Math.hypot(dx, dy);
      const aggro = enemy.aggroRadius ?? 220;
      if (distanceToPlayer < aggro && player.cloakTimer <= 0) {
        const chaseSpeed = enemy.speed * 1.05 * empFactor;
        const targetVx = (dx / (distanceToPlayer || 1)) * chaseSpeed;
        const targetVy = (dy / (distanceToPlayer || 1)) * chaseSpeed;
        enemy.vx += (targetVx - enemy.vx) * 0.08;
        enemy.vy += (targetVy - enemy.vy) * 0.08;
      } else {
        enemy.vx += Math.sin(mission.elapsed + enemy.x) * 0.05;
        enemy.vy += (enemy.speed * 0.8 * empFactor - enemy.vy) * 0.05;
      }
    } else if (enemy.ai === "hunter") {
      if (player.cloakTimer > 0) {
        enemy.vx += Math.sin(mission.elapsed + enemy.x) * 0.06;
        enemy.vy += (enemy.speed * 0.9 * empFactor - enemy.vy) * 0.05;
      } else {
        const aggression = 1 + mission.elapsed / 30 + mission.difficulty * 0.14;
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const distanceToPlayer = Math.hypot(dx, dy) || 1;
        const chaseSpeed = enemy.speed * aggression * empFactor;
        const targetVx = (dx / distanceToPlayer) * chaseSpeed;
        const targetVy = (dy / distanceToPlayer) * chaseSpeed;
        const strafe = enemy.strafeDir * 90 * Math.sin(mission.elapsed * 1.7) * aggression * 0.4;
        enemy.vx += (targetVx + strafe - enemy.vx) * 0.1;
        enemy.vy += (targetVy - enemy.vy) * 0.1;
      }
    } else if (enemy.ai === "transport") {
      enemy.vx += Math.sin(mission.elapsed + enemy.x) * 0.03;
      enemy.vy += (enemy.speed * empFactor - enemy.vy) * 0.04;
    } else if (enemy.ai === "splitter") {
      enemy.vx += Math.sin(mission.elapsed + enemy.x) * 0.03;
      enemy.vy += (enemy.speed * empFactor - enemy.vy) * 0.04;
    } else if (enemy.ai === "conductor" || enemy.ai === "sentinel") {
      applySentinelMovement(enemy, delta, empFactor);
      return;
    } else if (enemy.ai === "mimic") {
      const delay = enemy.aiParams.echoDelay ?? 2.0;
      const echo = getDelayedPlayerPosition(delay);
      const width = canvas.width / window.devicePixelRatio;
      const targetX = enemy.aiParams.mirror ? width - echo.x : echo.x;
      applyDuelistMovement(enemy, delta, empFactor, { x: targetX, y: player.y });
      return;
    } else if (enemy.ai === "thief") {
      updateThiefEnemy(enemy, delta, empFactor);
      return;
    } else if (enemy.ai === "lien") {
      updateLienEnemy(enemy, delta, empFactor);
      return;
    } else if (enemy.ai === "spawner") {
      applySentinelMovement(enemy, delta, empFactor);
      return;
    } else if (enemy.ai === "skitter") {
      const dodgeRadius = enemy.aiParams.dodgeRadius ?? 150;
      const dodgeStrength = enemy.aiParams.dodgeStrength ?? 1.65;
      const baseVy = enemy.speed * 0.85 * empFactor;

      // Baseline descent.
      enemy.vy += (baseVy - enemy.vy) * 0.06;

      // Reactive dodge away from the nearest threatening player bullet.
      let closest = null;
      let best = Infinity;
      const maxCheck = Math.min(10, bullets.length);
      for (let bi = 0; bi < maxCheck; bi += 1) {
        const b = bullets[bullets.length - 1 - bi];
        if (!b) continue;
        const dx = b.x - enemy.x;
        const dy = b.y - enemy.y;
        // Only consider bullets generally heading toward the enemy's vertical band.
        if (dy > 180) continue;
        const d = dx * dx + dy * dy;
        if (d < best) {
          best = d;
          closest = b;
        }
      }
      if (closest) {
        const d = Math.sqrt(best) || 1;
        if (d < dodgeRadius) {
          const dir = enemy.x < closest.x ? -1 : 1;
          const panic = 1 - d / dodgeRadius;
          const targetVx = dir * enemy.speed * dodgeStrength * (0.55 + panic);
          enemy.vx += (targetVx - enemy.vx) * (0.18 + panic * 0.12);
        } else {
          enemy.vx += Math.sin(mission.elapsed * 2.2 + enemy.id) * 0.08;
        }
      } else {
        enemy.vx += Math.sin(mission.elapsed * 2.2 + enemy.id) * 0.08;
      }
    } else if (enemy.ai === "duelist") {
      applyDuelistMovement(enemy, delta, empFactor);
      return;
    } else {
      enemy.vx += Math.sin(mission.elapsed + enemy.x) * 0.05;
    }

    enemy.x += enemy.vx * empFactor * delta;
    enemy.y += enemy.vy * empFactor * delta;
  });

  player.x = Math.max(40, Math.min(width - 40, player.x));
  player.y = Math.max(height * 0.3, Math.min(height - 50, player.y));

  for (let i = enemies.length - 1; i >= 0; i -= 1) {
    const enemy = enemies[i];
    if (enemy.hull <= 0) {
      handleEnemyDestroyed(enemy, null);
      enemies.splice(i, 1);
    }
  }

  floatingTexts.forEach((text) => {
    text.y -= text.vy * delta;
    text.life -= delta;
  });
  explosions.forEach((boom) => {
    boom.elapsed += delta;
    boom.rotation += boom.spin * delta;
  });

  cleanArrays(
    bullets,
    (bullet) =>
      bullet.orbitLife <= 0 ||
      bullet.y < -20 ||
      bullet.y > height + 20 ||
      bullet.x < -40 ||
      bullet.x > width + 40
  );
  cleanArrays(enemyBullets, (bullet) => bullet.y > height + 20 || bullet.x < -40 || bullet.x > width + 40);
  cleanArrays(salvagePods, (pod) => pod.y > height + 48);
  cleanArrays(enemies, (enemy) => enemy.y > height + 60 || enemy.escaped);
  cleanArrays(floatingTexts, (text) => text.life <= 0);
  cleanArrays(explosions, (boom) => boom.elapsed >= boom.duration);

  if (!endingSequence) {
    handleCollisions();
    if (player.hull <= 0) {
      startPlayerDeathSequence();
      return;
    }
  }

  if (bossFinishing && mission.bossFinishTimer <= 0) {
    endMission({ completed: true });
    return;
  }

  if (dying && mission.deathTimer <= 0) {
    endMission({ ejected: false });
    return;
  }

  mission.score += delta * 15 + mission.difficulty * 2;
}

function cleanArrays(list, predicate) {
  for (let i = list.length - 1; i >= 0; i -= 1) {
    if (predicate(list[i])) list.splice(i, 1);
  }
}

function handleCollisions() {
  const width = canvas.width / window.devicePixelRatio;
  const height = canvas.height / window.devicePixelRatio;

  bulletsLoop: for (let i = bullets.length - 1; i >= 0; i -= 1) {
    const bullet = bullets[i];
    for (let j = enemies.length - 1; j >= 0; j -= 1) {
      const enemy = enemies[j];
      if (bullet.hitIds && bullet.hitIds.has(enemy.id)) continue;
      if (distance(bullet.x, bullet.y, enemy.x, enemy.y) < bullet.radius + enemy.radius) {
        revealEnemyHealth(enemy);
        const durabilityBefore = getEnemyRemainingDurability(enemy);
        applyDamageToEnemy(enemy, bullet.damage, {
          chipFloorRate: bullet.armorChipFloorRate,
          minChipDamage: bullet.minArmorChipDamage,
        });
        const directDamageDealt = Math.max(0, durabilityBefore - getEnemyRemainingDurability(enemy));
        healPlayerFromVampiricDamage(bullet, directDamageDealt);
        if (bullet.payload === "plasma") {
          applyPlasmaBurn(enemy, bullet.damage, bullet.plasmaBurnDpsCap, bullet.plasmaBurnSourceKey);
        } else if (bullet.payload === "emp") {
          if (!enemy.empImmune) {
            enemy.empHitTimer = Math.max(enemy.empHitTimer, 1.2);
          }
        }
        if (bullet.explosive && !bullet.exploded) {
          bullet.exploded = true;
          const radius = bullet.explosiveRadius ?? 90;
          spawnExplosion(enemy.x, enemy.y, radius * 0.42, {
            intensity: 0.35,
            blend: "lighter",
            style: bullet.payload === "plasma" ? "plasmaImpact" : "impact",
            coalesce: true,
          });
          addCameraShake(Math.min(0.2, 0.03 + radius / 700), enemy.x, enemy.y);
          enemies.forEach((other) => {
            if (other === enemy) return;
            const d = distance(enemy.x, enemy.y, other.x, other.y);
            if (d > radius) return;
            const scale = 1 - d / radius;
            revealEnemyHealth(other);
            const splashDamage = bullet.damage * (bullet.explosiveDamageMult ?? 0.7) * scale;
            const splashBefore = getEnemyRemainingDurability(other);
            applyDamageToEnemy(other, splashDamage, {
              chipFloorRate: bullet.armorChipFloorRate,
              minChipDamage: bullet.minArmorChipDamage,
            });
            const splashDealt = Math.max(0, splashBefore - getEnemyRemainingDurability(other));
            healPlayerFromVampiricDamage(bullet, splashDealt);
            if (bullet.payload === "plasma") {
              const splashBurnCap = Number.isFinite(bullet.plasmaBurnDpsCap)
                ? bullet.plasmaBurnDpsCap * (bullet.explosiveDamageMult ?? 0.7) * scale
                : bullet.plasmaBurnDpsCap;
              applyPlasmaBurn(other, splashDamage, splashBurnCap, bullet.plasmaBurnSourceKey);
            }
          });
        }
        if (bullet.hitIds) {
          bullet.hitIds.add(enemy.id);
        }
        if (bullet.pierce && bullet.pierce > 0) {
          bullet.pierce -= 1;
        } else {
          bullets.splice(i, 1);
        }
        if (enemy.hull <= 0) {
          handleEnemyDestroyed(enemy, bullet);
          enemies.splice(j, 1);
        }
        continue bulletsLoop;
      }
    }
  }

  for (let i = enemies.length - 1; i >= 0; i -= 1) {
    const enemy = enemies[i];
    if (enemy.playerCollisionCooldown > 0) continue;
    if (distance(player.x, player.y, enemy.x, enemy.y) < player.radius + enemy.radius) {
      const base = enemy.collisionDamage ?? (22 + mission.difficulty * 2);
      applyDamage(base * (enemy.damageScale ?? 1), { collision: true, sourceX: enemy.x, sourceY: enemy.y });
      spawnExplosion(enemy.x, enemy.y, enemy.radius, { intensity: 0.55, blend: "lighter", style: "impact" });

      // Bosses should not despawn on contact; this also prevents boss-kill softlocks.
      if (enemy.isBoss) {
        enemy.playerCollisionCooldown = 0.35;
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const dist = Math.hypot(dx, dy) || 1;
        const ux = dx / dist;
        const uy = dy / dist;
        const overlap = Math.max(0, player.radius + enemy.radius - dist);
        const push = Math.min(24, 6 + overlap * 1.15);
        player.x = Math.max(player.radius, Math.min(width - player.radius, player.x + ux * push));
        player.y = Math.max(player.radius, Math.min(height - player.radius, player.y + uy * push));
        continue;
      }

      enemy.playerCollisionCooldown = 0.55;
      enemies.splice(i, 1);
    }
  }

  for (let i = enemyBullets.length - 1; i >= 0; i -= 1) {
    const bullet = enemyBullets[i];
    if (distance(player.x, player.y, bullet.x, bullet.y) < player.radius + bullet.radius) {
      enemyBullets.splice(i, 1);
      const base = Number.isFinite(bullet.damage) ? bullet.damage : 14 + mission.difficulty * 1.3;
      applyDamage(base, { sourceX: bullet.x, sourceY: bullet.y });
    }
  }

  handleSalvagePodCollisions();
}

function startBossDefeatSequence(enemy) {
  if (!mission || mission.bossDefeated) return;
  mission.bossAlive = false;
  mission.bossDefeated = true;
  mission.bossFinishTimer = BOSS_DEFEAT_DELAY_SECONDS;
  grantBossSalvage(enemy);
  enemyBullets.length = 0;
  salvagePods.length = 0;
  screenFlash = Math.min(0.78, screenFlash + 0.5);
  addCameraShake(0.72, enemy.x, enemy.y);
  playSfx("explosion", 0.22);
  const baseRadius = Math.max(130, enemy.radius * 2.25);
  spawnExplosion(enemy.x, enemy.y, baseRadius, {
    intensity: 1.25,
    blend: "lighter",
    style: "bossDeath",
    coalesce: false,
  });
  const burstCount = 6;
  for (let i = 0; i < burstCount; i += 1) {
    const angle = (Math.PI * 2 * i) / burstCount + Math.random() * 0.28;
    const dist = enemy.radius * (0.35 + Math.random() * 0.75);
    spawnExplosion(
      enemy.x + Math.cos(angle) * dist,
      enemy.y + Math.sin(angle) * dist,
      baseRadius * (0.34 + Math.random() * 0.16),
      {
        intensity: 0.85,
        blend: "lighter",
        style: "kill",
        coalesce: false,
      }
    );
  }
  spawnFloatingText(enemy.x, enemy.y - enemy.radius * 0.8, "BOSS DESTROYED", "#f0b429");
}

function handleEnemyDestroyed(enemy, bullet) {
  mission.kills += 1;
  mission.score += enemy.score;
  const creditEarned = creditForEnemy(enemy);
  mission.killCredits += creditEarned;
  if (!state.killsByEnemyKey) state.killsByEnemyKey = {};
  const killKey = enemy.compendiumKey || compendiumKeyFor(mission?.level?.id || "unknown", enemy.type, enemy);
  state.killsByEnemyKey[killKey] = (state.killsByEnemyKey[killKey] ?? 0) + 1;
  spawnCreditPopup(enemy.x, enemy.y, creditEarned);
  if (enemy.lienDrained > 0) {
    const refund = Math.round(enemy.lienDrained * 1.5);
    mission.killCredits += refund;
    spawnCreditPopup(enemy.x, enemy.y - 24, refund);
  }
  spawnSplitChildren(enemy);
  spawnExplosion(enemy.x, enemy.y, enemy.radius, { intensity: 0.9, blend: "lighter", style: "kill", coalesce: false });
  playSfx("explosion", 0.135);
  const baseTrauma = Math.min(0.22, 0.03 + enemy.radius / 260);
  addCameraShake(enemy.isBoss ? 0.42 : baseTrauma, enemy.x, enemy.y);
  if (enemy.isBoss) {
    startBossDefeatSequence(enemy);
  } else if (enemy.miniboss) {
    if (mission.activeMinibossId === enemy.id) mission.activeMinibossId = null;
    const drop = rollSalvageDrop(enemy, {
      force: true,
      forceSource: getDropSourceKey(enemy),
      minRarity: "certified",
    });
    if (drop) spawnSalvagePod(enemy.x, enemy.y, drop);
    spawnExplosion(enemy.x, enemy.y, Math.max(enemy.radius * 1.5, 44), {
      intensity: 1.05,
      blend: "lighter",
      style: "kill",
      coalesce: false,
    });
    addCameraShake(0.3, enemy.x, enemy.y);
    spawnFloatingText(enemy.x, enemy.y - enemy.radius * 0.8, "MINIBOSS DOWN", "#d7c184");
  } else {
    if (enemy.carriedPod) {
      spawnSalvagePod(enemy.x, enemy.y, {
        rarity: enemy.carriedPod.rarity || enemy.carriedPod.item?.rarity || "certified",
        item: enemy.carriedPod.item,
      });
      const bonus = Math.round((enemy.aiParams?.interest ?? 1.5) * (enemy.baseCredit || 0));
      if (bonus > 0) {
        mission.killCredits += bonus;
        spawnCreditPopup(enemy.x, enemy.y - 24, bonus);
      }
    }
    const drop = rollSalvageDrop(enemy);
    if (drop) {
      spawnSalvagePod(enemy.x, enemy.y, drop);
    }
  }
}

function applyDamage(amount, { collision = false, sourceX = null, sourceY = null } = {}) {
  if (state.debugInvincible) return;
  revealPlayerHealth();
  player.hitTimer = 0.25;
  let shieldHit = false;
  let absorbedShield = 0;
  let absorbedBulwark = 0;
  if (player.bulwarkShield > 0) {
    const absorbed = Math.min(player.bulwarkShield, amount);
    player.bulwarkShield -= absorbed;
    absorbedBulwark = absorbed;
    amount -= absorbed;
  }
  if (!collision && player.shield > 0) {
    const absorbed = Math.min(player.shield, amount);
    player.shield -= absorbed;
    amount -= absorbed;
    if (absorbed > 0) shieldHit = true;
    absorbedShield = absorbed;
    if (absorbed > 0) player.shieldCooldown = player.shieldRechargeDelay || 2.5;
  }

  if (amount > 0 && player.armor > 0) {
    const effective = collision ? amount : Math.max(0, amount - (player.armorClass || 0));
    if (effective > 0) {
      const toArmor = Math.min(player.armor, effective);
      player.armor -= toArmor;
      amount = effective - toArmor;
    } else {
      amount = 0;
    }
  }

  if (amount > 0) {
    player.hull -= amount;
    playSfx("hullHit", 0.45);
    const trauma = Math.min(0.28, 0.06 + amount / 120);
    addCameraShake(trauma + (collision ? 0.06 : 0), sourceX, sourceY);
    if (amount > Math.max(18, player.maxHull * 0.12)) {
      screenFlash = Math.min(0.28, screenFlash + 0.12);
    }
  } else if (shieldHit) {
    playSfx("hit", 0.35);
    const shieldTrauma = Math.min(0.12, 0.02 + absorbedShield / 220 + absorbedBulwark / 260);
    addCameraShake(shieldTrauma + (collision ? 0.03 : 0), sourceX, sourceY);
  }
}

function render() {
  const width = canvas.width / window.devicePixelRatio;
  const height = canvas.height / window.devicePixelRatio;
  // Keep render coordinates in CSS pixels while using a HiDPI canvas.
  const dpr = window.devicePixelRatio || 1;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  drawBackground(width, height);

  const showDebrief = debriefPanel && !debriefPanel.hidden;
  const showHangar = hangarPanel && !hangarPanel.hidden;

  if (mission && mission.active) {
    // Screen shake applies only to the game layer (not the HUD/DOM).
    ctx.save();
    const trauma = cameraShake.trauma || 0;
    const kickX = cameraShake.kickX || 0;
    const kickY = cameraShake.kickY || 0;
    if (trauma > 0.001 || Math.abs(kickX) > 0.05 || Math.abs(kickY) > 0.05) {
      const s = Math.min(1, trauma) ** 2;
      const t = performance.now() * 0.001;
      const nx = Math.sin(t * 41.7) + Math.sin(t * 27.4 + 1.3);
      const ny = Math.sin(t * 36.2 + 0.4) + Math.sin(t * 21.9 + 2.1);
      const maxPx = 14;
      const x = nx * 0.5 * maxPx * s + kickX;
      const y = ny * 0.5 * maxPx * s + kickY;
      const rot = Math.sin(t * 18.3 + 0.7) * 0.012 * s;
      ctx.translate(width / 2, height / 2);
      ctx.rotate(rot);
      ctx.translate(-width / 2, -height / 2);
      ctx.translate(x, y);
    }
    if (!(mission && mission.deathTimer > 0)) {
      drawPlayer();
    }
    bullets.forEach(drawBullet);
    enemyBullets.forEach((bullet) => drawBullet(bullet, "#38bdf8"));
    enemies.forEach(drawEnemy);
    drawTractorBeams();
    salvagePods.forEach(drawSalvagePod);
    explosions.forEach(drawExplosion);
    floatingTexts.forEach(drawFloatingText);
    if (!(mission && mission.deathTimer > 0)) {
      drawPlayerHealthBar();
    }
    ctx.restore();

    if (screenFlash > 0) {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = Math.min(1, screenFlash) * 0.55;
      ctx.fillStyle = "#e0f2fe";
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    }
    drawMissionAnnouncements(width, height);
  } else if (showHangar && !showDebrief) {
    drawHangarScene(width, height);
  }

  updateHud();
}

function drawBackground(width, height) {
  ctx.fillStyle = "#02030d";
  ctx.fillRect(0, 0, width, height);

  const backgroundKey =
    devRequestedBackground && assets.backgrounds[devRequestedBackground]
      ? devRequestedBackground
      : mission?.level?.background;
  const background =
    (backgroundKey && assets.backgrounds[backgroundKey]) ||
    assets.backgrounds.blue ||
    assets.background;

  if (background && background.loaded) {
    const img = background.img;
    const scale = width / img.naturalWidth;
    const drawHeight = img.naturalHeight * scale;
    // Positive scroll moves the background down (top -> bottom), matching starfield motion.
    const offset = ((backgroundScroll % drawHeight) + drawHeight) % drawHeight;
    ctx.drawImage(img, 0, offset - drawHeight, width, drawHeight);
    ctx.drawImage(img, 0, offset, width, drawHeight);
  }

  ctx.save();
  ctx.fillStyle = "rgba(125, 210, 255, 0.75)";
  starfield.forEach((star) => {
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.arc(star.x * width, star.y * height, star.size, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

function drawPlayer() {
  ctx.save();
  if (player.cloakTimer > 0) {
    ctx.globalAlpha = 0.35;
  }
  const visualTheme = getLevelVisualTheme();
  const hullSprite = getEquippedHullSpriteRecord(state);
  const usedSprite = drawSpriteCentered(
    hullSprite?.loaded ? hullSprite : visualTheme?.player || assets.player,
    player.x,
    player.y,
    player.spriteScale
  );
  if (!usedSprite) {
    ctx.translate(player.x, player.y);
    ctx.fillStyle = "#22d3ee";
    ctx.beginPath();
    ctx.moveTo(0, -22);
    ctx.lineTo(16, 20);
    ctx.lineTo(-16, 20);
    ctx.closePath();
    ctx.fill();
  }

  if (player.hitTimer > 0) {
    const alpha = Math.min(1, player.hitTimer / 0.25);
    if (assets.shield.loaded) {
      ctx.globalAlpha = 0.5 + alpha * 0.4;
      drawSpriteCentered(assets.shield, player.x, player.y, 0.7);
    } else {
      ctx.strokeStyle = `rgba(248, 113, 113, ${alpha})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.radius + 8, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  if (player.bulwarkTimer > 0) {
    const alpha = Math.min(1, player.bulwarkTimer / player.bulwarkDuration);
    ctx.strokeStyle = `rgba(34, 197, 94, ${0.4 + alpha * 0.4})`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius + 12, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = `rgba(134, 239, 172, ${0.25 + alpha * 0.3})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius + 18, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = `rgba(34, 197, 94, ${0.08 + alpha * 0.08})`;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius + 10, 0, Math.PI * 2);
    ctx.fill();
  }

  drawRmbIndicator();
  ctx.restore();
}

function drawRmbIndicator() {
  if (state.rmbWeapon === "none") return;
  const radius = player.radius + 14;
  ctx.save();
  ctx.lineWidth = 3;
  if (state.rmbWeapon === "cloak" && player.cloakTimer > 0) {
    const progress = player.cloakTimer / player.cloakDuration;
    ctx.strokeStyle = "rgba(125, 211, 252, 0.8)";
    ctx.beginPath();
    ctx.arc(player.x, player.y, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
    ctx.stroke();
    ctx.restore();
    return;
  }

  if (player.altCooldown > 0) {
    const cooldownTime =
      state.rmbWeapon === "cloak"
        ? player.cloakCooldownTime
        : state.rmbWeapon === "emp"
          ? player.empCooldownTime
          : player.altCooldownTime;
    const progress = Math.min(1, player.altCooldown / cooldownTime);
    ctx.strokeStyle = "rgba(251, 191, 36, 0.85)";
    ctx.beginPath();
    ctx.arc(player.x, player.y, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * (1 - progress));
    ctx.stroke();
  } else {
    ctx.strokeStyle = "rgba(34, 211, 238, 0.7)";
    ctx.beginPath();
    ctx.arc(player.x, player.y, radius, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawBullet(bullet, color = "#e0f2fe") {
  const age = bullet.age || 0;
  const speed = Math.hypot(bullet.vx || 0, bullet.vy || 0) || 1;
  const ux = (bullet.vx || 0) / speed;
  const uy = (bullet.vy || -1) / speed;
  if (bullet.shape === "orb") {
    ctx.save();
    const pulse = 1 + Math.sin(age * 18) * 0.16;
    const r = (bullet.radius || 6) * pulse;
    ctx.globalAlpha = 0.22;
    ctx.fillStyle = bullet.color || color;
    for (let i = 2; i >= 1; i -= 1) {
      ctx.beginPath();
      ctx.arc(
        bullet.x - ux * r * i * 1.8,
        bullet.y - uy * r * i * 1.8,
        r * (1.1 - i * 0.22),
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    const gradient = ctx.createRadialGradient(bullet.x, bullet.y, 0, bullet.x, bullet.y, r * 1.4);
    gradient.addColorStop(0, "rgba(236, 254, 255, 0.85)");
    gradient.addColorStop(0.35, bullet.color || color);
    gradient.addColorStop(1, "rgba(34, 197, 94, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, r * 1.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.85;
    ctx.fillStyle = bullet.color || color;
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }
  if (bullet.image && bullet.image.loaded) {
    const width = bullet.width || 10;
    const height = bullet.height || 28;
    const animation = bullet.animation || "bolt";
    const pulse = animation === "shard"
      ? 1 + Math.sin(age * 16) * 0.07
      : animation === "ember" || animation === "orb"
        ? 1 + Math.sin(age * 20) * 0.11
        : 1 + Math.sin(age * 24) * 0.055;
    const stretch = animation === "lance" ? 1.09 : 1;
    const sway = animation === "bolt" || animation === "lance" ? Math.sin(age * 32) * 0.025 : 0;
    const rotation = (bullet.rotation || 0) + sway + age * (bullet.spinRate || 0);
    const trailCount = animation === "lance" ? 4 : animation === "ember" || animation === "orb" ? 2 : 3;
    const trailStep = Math.max(5, Math.min(16, speed * 0.032));
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    if (bullet.plasma) {
      const glowRadius = Math.max(width, height) * (0.42 + Math.sin(age * 15) * 0.04);
      const glow = ctx.createRadialGradient(bullet.x, bullet.y, 0, bullet.x, bullet.y, glowRadius);
      glow.addColorStop(0, "rgba(236, 254, 255, 0.3)");
      glow.addColorStop(0.45, bullet.glowColor || "rgba(34, 211, 238, 0.32)");
      glow.addColorStop(1, "rgba(20, 184, 166, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, glowRadius, 0, Math.PI * 2);
      ctx.fill();
    }
    for (let i = trailCount; i >= 1; i -= 1) {
      const alpha = 0.09 + (trailCount - i) * 0.045;
      const scale = 1 - i * 0.08;
      ctx.globalAlpha = alpha;
      drawSprite(
        bullet.image,
        bullet.x - ux * trailStep * i - (width * scale) / 2,
        bullet.y - uy * trailStep * i - (height * stretch * scale) / 2,
        width * scale,
        height * stretch * scale,
        rotation
      );
    }
    ctx.globalAlpha = 1;
    const drew = drawSprite(
      bullet.image,
      bullet.x - (width * pulse) / 2,
      bullet.y - (height * stretch * pulse) / 2,
      width * pulse,
      height * stretch * pulse,
      rotation
    );
    ctx.restore();
    if (drew) {
      return;
    }
  }
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(bullet.x, bullet.y, bullet.radius * (1 + Math.sin(age * 20) * 0.1), 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawSalvagePod(pod) {
  if (pod.kind && pod.kind !== "salvage") {
    const pulse = 1 + Math.sin((pod.age || 0) * 6) * 0.09;
    const sprite = pod.kind === "shield_booster" ? assets.shieldBooster : assets.armorPatch;
    const color = pod.kind === "shield_booster" ? "#7dd3fc" : "#facc15";
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = 0.68;
    const glow = ctx.createRadialGradient(pod.x, pod.y, 0, pod.x, pod.y, 30 * pulse);
    glow.addColorStop(0, pod.kind === "shield_booster" ? "rgba(125, 211, 252, 0.42)" : "rgba(250, 204, 21, 0.38)");
    glow.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(pod.x, pod.y, 30 * pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    if (sprite?.loaded) {
      drawSpriteCentered(sprite, pod.x, pod.y, 0.62 * pulse);
    } else {
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(pod.x, pod.y, 14 * pulse, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
    return;
  }
  const rarityConfig = getRarityConfig(pod.rarity);
  const pulse = 1 + Math.sin((pod.age || 0) * 5.5) * 0.08;
  const sprite =
    assets.salvagePods?.[pod.rarity] ||
    assets.salvagePod ||
    assets.salvagePodFallback;
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = pod.rejected ? 0.42 : 0.72;
  const glow = ctx.createRadialGradient(pod.x, pod.y, 0, pod.x, pod.y, 34 * pulse);
  glow.addColorStop(0, rarityConfig.glow);
  glow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(pod.x, pod.y, 34 * pulse, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = pod.rejected ? 0.55 : 1;
  if (sprite?.loaded || assets.salvagePodFallback?.loaded) {
    drawSpriteCentered(
      sprite?.loaded ? sprite : assets.salvagePodFallback,
      pod.x,
      pod.y,
      0.58 * pulse
    );
  } else {
    ctx.fillStyle = rarityConfig.color;
    ctx.beginPath();
    ctx.arc(pod.x, pod.y, 14 * pulse, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawCarriedPod(enemy) {
  if (!enemy.carriedPod?.item) return;
  drawSalvagePod({
    ...enemy.carriedPod,
    x: enemy.x,
    y: enemy.y + enemy.radius * 0.45,
    age: enemy.carriedPod.age || mission?.elapsed || 0,
    rejected: false,
  });
}

function drawTractorBeams() {
  if (!mission?.active) return;
  enemies.forEach((enemy) => {
    const telegraph = enemy.tractorTelegraphTimer > 0;
    const active = enemy.tractorActiveTimer > 0;
    if (!telegraph && !active) return;
    const alpha = active ? 0.62 : 0.25 + Math.sin((mission.elapsed || 0) * 18) * 0.12;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = active ? `rgba(248, 113, 113, ${alpha})` : `rgba(250, 204, 21, ${alpha})`;
    ctx.lineWidth = active ? 5 : 2;
    ctx.beginPath();
    ctx.moveTo(enemy.x, enemy.y + enemy.radius * 0.2);
    ctx.lineTo(player.x, player.y);
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.strokeStyle = active ? "rgba(254, 202, 202, 0.75)" : "rgba(254, 240, 138, 0.65)";
    ctx.beginPath();
    ctx.moveTo(enemy.x - 8, enemy.y + enemy.radius * 0.2);
    ctx.lineTo(player.x + 8, player.y);
    ctx.stroke();
    ctx.restore();
  });
}

function drawMissionAnnouncements(width, height) {
  if (!mission?.active) return;
  const lines = [];
  if (mission.minibossBannerTimer > 0 && mission.minibossBannerText) {
    lines.push({ text: mission.minibossBannerText, color: "#d7c184", alpha: Math.min(1, mission.minibossBannerTimer / 0.45) });
  }
  if (mission.bossPhaseBannerTimer > 0 && mission.bossPhaseBannerText) {
    lines.push({ text: mission.bossPhaseBannerText, color: "#f87171", alpha: Math.min(1, mission.bossPhaseBannerTimer / 0.35) });
  }
  if (!lines.length) return;
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  lines.forEach((line, index) => {
    const y = height * 0.18 + index * 34;
    ctx.globalAlpha = Math.max(0, Math.min(1, line.alpha));
    ctx.font = "700 22px Space Grotesk, sans-serif";
    ctx.fillStyle = "rgba(2, 6, 16, 0.72)";
    ctx.fillRect(width / 2 - 220, y - 18, 440, 36);
    ctx.strokeStyle = line.color;
    ctx.lineWidth = 1;
    ctx.strokeRect(width / 2 - 220, y - 18, 440, 36);
    ctx.fillStyle = line.color;
    ctx.fillText(line.text, width / 2, y);
  });
  ctx.restore();
}

function drawEnemy(enemy) {
  ctx.save();
  const usedSprite = drawSpriteCentered(enemy.sprite, enemy.x, enemy.y, enemy.spriteScale || 0.7);
  if (!usedSprite) {
    ctx.translate(enemy.x, enemy.y);
    ctx.fillStyle = enemy.color;
    ctx.beginPath();
    ctx.moveTo(0, -enemy.radius);
    ctx.lineTo(enemy.radius, enemy.radius);
    ctx.lineTo(-enemy.radius, enemy.radius);
    ctx.closePath();
      ctx.fill();
  }
  drawCarriedPod(enemy);

  if (mission && mission.empTimer > 0) {
    const alpha = Math.min(1, mission.empTimer / player.empDuration);
    ctx.strokeStyle = `rgba(125, 211, 252, ${0.2 + alpha * 0.4})`;
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = enemy.radius + 6 + Math.random() * 8;
      ctx.beginPath();
      ctx.moveTo(
        enemy.x + Math.cos(angle) * radius,
        enemy.y + Math.sin(angle) * radius
      );
      ctx.lineTo(
        enemy.x + Math.cos(angle + 0.4) * (radius + 6),
        enemy.y + Math.sin(angle + 0.4) * (radius + 6)
      );
      ctx.stroke();
    }
  }
  drawPlasmaBurnAura(enemy);
  if (enemy.healthBarTimer > 0) {
    drawEnemyHealth(enemy);
  }
  ctx.restore();
}

function drawPlasmaBurnAura(enemy) {
  if (!enemy || !(enemy.dotDps > 0)) return;
  const pulse = 0.5 + Math.sin((mission?.elapsed || 0) * 9) * 0.5;
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = `rgba(74, 222, 128, ${0.24 + pulse * 0.14})`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(enemy.x, enemy.y, enemy.radius + 5 + pulse * 3, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawLayeredHealthBar({ x, y, width, height, alpha, layers, maxLayers, burnPreview = null }) {
  const maxHull = maxLayers.hull || 0;
  const maxArmor = maxLayers.armor || 0;
  const maxShield = maxLayers.shield || 0;
  const totalMax = maxHull + maxArmor + maxShield;
  if (totalMax <= 0) return;

  ctx.save();
  ctx.globalAlpha = 0.9 * alpha;
  ctx.fillStyle = "rgba(2, 6, 16, 0.7)";
  ctx.strokeStyle = "rgba(125, 190, 255, 0.25)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(x - 2, y - 2, width + 4, height + 4, 6);
  } else {
    ctx.rect(x - 2, y - 2, width + 4, height + 4);
  }
  ctx.fill();
  ctx.stroke();

  const drawSegment = (key, color, offset) => {
    const value = Math.max(0, layers[key] || 0);
    const maxValue = Math.max(0, maxLayers[key] || 0);
    if (maxValue <= 0) return 0;
    const segW = (width * maxValue) / totalMax;
    const fillW = segW * Math.max(0, Math.min(1, value / maxValue));
    if (fillW > 0) {
      ctx.fillStyle = color;
      ctx.fillRect(x + offset, y, fillW, height);
    }
    const projected = Math.max(0, burnPreview?.[key] ?? value);
    const projectedFillW = segW * Math.max(0, Math.min(1, projected / maxValue));
    const lossW = Math.max(0, fillW - projectedFillW);
    if (lossW > 0.5) {
      const stripe = ctx.createLinearGradient(x + offset + projectedFillW, y, x + offset + fillW, y);
      stripe.addColorStop(0, "rgba(74, 222, 128, 0.32)");
      stripe.addColorStop(1, "rgba(132, 204, 22, 0.82)");
      ctx.fillStyle = stripe;
      ctx.fillRect(x + offset + projectedFillW, y, lossW, height);
      ctx.strokeStyle = "rgba(190, 242, 100, 0.72)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x + offset + projectedFillW + 0.5, y);
      ctx.lineTo(x + offset + projectedFillW + 0.5, y + height);
      ctx.stroke();
    }
    return segW;
  };

  let offset = 0;
  offset += drawSegment("hull", "#fb7185", offset);
  offset += drawSegment("armor", "#cbd5e1", offset);
  drawSegment("shield", "#7dd3fc", offset);
  ctx.restore();
}

function drawEnemyHealth(enemy) {
  const maxShield = enemy.maxShield || 0;
  const maxArmor = enemy.maxArmor || 0;
  const maxHull = enemy.maxHull || 0;
  const totalMax = maxShield + maxArmor + maxHull;
  if (totalMax <= 0) return;

  const width = 84;
  const height = 8;
  const x = enemy.x - width / 2;
  const y = enemy.y - enemy.radius - 18;
  const alpha = Math.min(1, enemy.healthBarTimer / 1.35);

  const shield = Math.max(0, enemy.shield || 0);
  const armor = Math.max(0, enemy.armor || 0);
  const hull = Math.max(0, enemy.hull || 0);
  drawLayeredHealthBar({
    x,
    y,
    width,
    height,
    alpha,
    layers: { hull, armor, shield },
    maxLayers: { hull: maxHull, armor: maxArmor, shield: maxShield },
    burnPreview: getPlasmaBurnPreview(enemy),
  });
}

function drawPlayerHealthBar() {
  const maxShield = player.maxShield || 0;
  const maxArmor = player.maxArmor || 0;
  const maxHull = player.maxHull || 0;
  const totalMax = maxShield + maxArmor + maxHull;
  if (totalMax <= 0) return;

  const width = 84;
  const height = 8;
  const x = player.x - width / 2;
  const y = player.y - player.radius - 22;
  const alpha = player.healthBarTimer > 0 ? 1 : 0.65;

  const shield = Math.max(0, player.shield || 0);
  const armor = Math.max(0, player.armor || 0);
  const hull = Math.max(0, player.hull || 0);
  drawLayeredHealthBar({
    x,
    y,
    width,
    height,
    alpha: alpha * 1.02,
    layers: { hull, armor, shield },
    maxLayers: { hull: maxHull, armor: maxArmor, shield: maxShield },
  });
}

function drawHangarScene(width, height) {
  ctx.save();
  ctx.globalAlpha = 0.4;
  ctx.fillStyle = "#0a1a33";
  ctx.fillRect(0, height * 0.4, width, height * 0.6);
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "rgba(125, 210, 255, 0.25)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 6; i += 1) {
    ctx.beginPath();
    ctx.moveTo(0, height * 0.6 + i * 60);
    ctx.lineTo(width, height * 0.6 + i * 60);
    ctx.stroke();
  }
  ctx.restore();
}

function getWeaponHudSlots() {
  const primary = getPrimaryArmoryItem(state, 0);
  const second = getSecondPrimaryArmoryItem();
  const activeBay = getActivePrimaryBay(state);
  const dualActive = canDualFireCurrentLoadout();
  return [
    {
      label: "A",
      item: primary,
      active: dualActive || activeBay === 0,
    },
    {
      label: "B",
      item: second,
      active: dualActive || activeBay === 1,
    },
  ];
}

function renderWeaponStripHtml({ compact = false, cooldown = 0, showEmpty = true } = {}) {
  const slots = getWeaponHudSlots().filter((slot) => showEmpty || slot.item);
  const cooldownHtml = cooldown > 0
    ? `<span class="weapon-token cooldown">${escapeHtml(formatNumber(cooldown, 1))}s</span>`
    : "";
  return `
    <div class="weapon-strip${compact ? " compact" : ""}${canDualFireCurrentLoadout() ? " dual-active" : ""}" aria-label="Primary weapons">
      ${slots
        .map((slot) => {
          const name = slot.item ? getCompactItemName(slot.item) : "Open";
          const icon = slot.item ? getArmoryFrameVisual(slot.item).icon : defenseVisuals.none.icon;
          const typeKey = getItemTypeKey(slot.item, "primary");
          return `
            <span class="weapon-token type-${typeKey}${slot.active ? " is-active" : ""}${slot.item ? "" : " is-empty"}" title="${escapeHtml(`${slot.label}: ${name}`)}">
              <span class="weapon-token-label">${slot.label}</span>
              <span class="weapon-token-icon"><img src="${escapeHtml(icon)}" alt="" /></span>
              <span class="weapon-token-name">${escapeHtml(name)}</span>
            </span>
          `;
        })
        .join("")}
      ${cooldownHtml}
    </div>
  `;
}

function updateHud() {
  if (!mission) {
    hudHull.textContent = "-";
    if (hudArmor) hudArmor.textContent = "-";
    hudShield.textContent = "-";
    if (hudScore) hudScore.textContent = "0";
    hudTime.textContent = "00:00";
    hudCredits.textContent = state.credits.toString();
    if (hudMini) hudMini.textContent = getCompactItemName(getSelectedMiniWeapon());
    if (hudWeapons) hudWeapons.innerHTML = renderWeaponStripHtml({ showEmpty: true });
    setBossBarLayer(bossShieldFill, 0, 0);
    setBossBarLayer(bossArmorFill, 0, 0);
    setBossBarLayer(bossProgressFill, 0, 0);
    clearBossBurnLayers();
    if (bossLabel) bossLabel.textContent = "Boss ETA";
    if (minibossProgress) minibossProgress.hidden = true;
  } else {
    const runCredits = creditRewardFor(mission);
    hudHull.textContent = `${Math.max(0, Math.round(player.hull))}/${Math.round(player.maxHull)}`;
    if (hudArmor) {
      hudArmor.textContent =
        player.maxArmor > 0
          ? `${Math.max(0, Math.round(player.armor))}/${Math.round(player.maxArmor)}`
          : "0/0";
    }
    hudShield.textContent =
      player.maxShield > 0
        ? `${Math.round(player.shield)}/${Math.round(player.maxShield)}`
        : "0/0";
    if (hudScore) hudScore.textContent = Math.round(mission.score).toString();
    hudTime.textContent = formatTime(mission.elapsed);
    hudCredits.textContent = `${state.credits} (+${runCredits})`;
    if (hudMini) {
      const mini = getSelectedMiniWeapon();
      hudMini.textContent = mini
        ? player.miniFireCooldown > 0
          ? `${getCompactItemName(mini)} ${formatNumber(player.miniFireCooldown, 1)}s`
          : getCompactItemName(mini)
        : "-";
    }
    if (hudWeapons) hudWeapons.innerHTML = renderWeaponStripHtml({ showEmpty: true });
    updateBossProgress();
    updateMinibossProgress();
  }
  updateCargoHud();
  updateConsumableHud();
}

function updateCargoHud() {
  if (!hudCargoPips) return;
  const cargo = getCargoItems();
  hudCargoPips.innerHTML = "";
  const cargoSize = getConfiguredCargoSize();
  for (let i = 0; i < cargoSize; i += 1) {
    const item = cargo[i];
    const rarity = item?.rarity || null;
    const pip = document.createElement("span");
    pip.className = `cargo-pip${rarity ? ` filled rarity-${rarity}` : ""}`;
    if (rarity) {
      pip.title = getRarityLabel(rarity);
      pip.setAttribute("style", getRarityStyle(rarity));
    } else {
      pip.title = "Empty cargo slot";
    }
    hudCargoPips.appendChild(pip);
  }
  if (hudCargoStatus) {
    hudCargoStatus.hidden = cargoHudMessageTimer <= 0;
    hudCargoStatus.textContent = LEDGER_COPY.cargoFull;
  }
}

function updateConsumableHud() {
  const inMission = mission && mission.active;
  const slots = mission?.consumableSlots || ["none", "none"];
  const uses = mission?.consumableUses || [0, 0];
  const cooldowns = mission?.consumableCooldowns || [0, 0];

  const updateSlot = (index, hudEl, mobileBtn, fallbackLabel) => {
    const slotId = slots[index];
    if (!inMission || !slotId || slotId === "none") {
      if (hudEl) hudEl.textContent = "-";
      if (hudEl) {
        hudEl.classList.remove("hud-action");
        hudEl.classList.remove("disabled");
        hudEl.removeAttribute("role");
        hudEl.removeAttribute("aria-disabled");
      }
      if (mobileBtn) {
        mobileBtn.textContent = fallbackLabel;
        mobileBtn.disabled = true;
      }
      return;
    }
    const item = consumablesById[slotId];
    const label = getConsumableLabel(item);
    const remaining = uses[index] ?? 0;
    const cooldown = cooldowns[index] ?? 0;
    const maxUses = item?.usesPerMission ?? remaining;
    let hudText = `${label} (${index + 1}) ${remaining}/${maxUses}`;
    if (cooldown > 0) {
      hudText += ` | ${Math.ceil(cooldown)}s`;
    }
    if (hudEl) hudEl.textContent = hudText;
    if (hudEl) {
      hudEl.classList.add("hud-action");
      hudEl.classList.toggle("disabled", cooldown > 0 || remaining <= 0);
      hudEl.setAttribute("role", "button");
      hudEl.setAttribute("aria-disabled", cooldown > 0 || remaining <= 0 ? "true" : "false");
    }
    if (mobileBtn) {
      if (cooldown > 0) {
        mobileBtn.textContent = `${label} ${Math.ceil(cooldown)}s`;
      } else {
        mobileBtn.textContent = `${label} (${remaining})`;
      }
      mobileBtn.disabled = cooldown > 0 || remaining <= 0 || !inMission;
    }
  };

  updateSlot(0, hudItem1, mobileItem1, "Item 1");
  updateSlot(1, hudItem2, mobileItem2, "Item 2");
}

function playSfx(name, volume = 0.4) {
  if (!audioEnabled) return;
  const scaled = volume * getSfxVolume();
  if (scaled <= 0) return;
  const base = sfx[name];
  if (!base) return;
  const instance = base.cloneNode();
  instance.volume = Math.max(0, Math.min(1, scaled));
  instance.play().catch(() => {});
}

function playUiSfx(kind = "click") {
  const map = {
    hover: ["hit", 0.025],
    click: ["cloak", 0.045],
    stamp: ["hullHit", 0.075],
    error: ["hit", 0.075],
    credit: ["laserSmall", 0.035],
  };
  const [name, volume] = map[kind] || map.click;
  playSfx(name, volume);
}

function setCountedNumber(element, nextValue, { duration = 520 } = {}) {
  if (!element || !Number.isFinite(nextValue)) return;
  const next = Math.round(nextValue);
  const current = Number(element.dataset.countValue ?? element.textContent);
  if (!Number.isFinite(current) || current === next || duration <= 0) {
    element.textContent = next.toString();
    element.dataset.countValue = next.toString();
    return;
  }
  const start = performance.now();
  const from = current;
  element.dataset.countValue = next.toString();
  const animate = (now) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    element.textContent = Math.round(from + (next - from) * eased).toString();
    if (t < 1 && element.dataset.countValue === next.toString()) {
      requestAnimationFrame(animate);
    } else {
      element.textContent = next.toString();
    }
  };
  requestAnimationFrame(animate);
}

function bindSharedUiFeedback() {
  if (!overlay) return;
  overlay.addEventListener("pointerover", (event) => {
    const target = event.target.closest("button, .scene-hotspot, .investment-tree-node");
    if (!target || target.disabled || target.dataset.hoverSoundBound === "true") return;
    target.dataset.hoverSoundBound = "true";
    playUiSfx("hover");
    window.setTimeout(() => {
      if (target) target.dataset.hoverSoundBound = "false";
    }, 140);
  });
  overlay.addEventListener("click", (event) => {
    const target = event.target.closest("button, .scene-hotspot, .investment-tree-node");
    if (!target) return;
    enableAudio();
    playUiSfx(target.disabled ? "error" : "click");
  });
}

function updateMobileControls() {
  if (!mobileControls) return;
  if (!state) {
    mobileControls.hidden = true;
    return;
  }
  const inMission = mission && mission.active;
  const inHangar = !inMission && overlay && !overlay.hidden && hangarPanel && !hangarPanel.hidden;
  const inMissionTab = activeHangarTab === "mission";
  mobileControls.hidden = !(inMission || (inHangar && inMissionTab));

  const hasAlt = state.rmbWeapon !== "none";
  if (mobileLaunchBtn) {
    mobileLaunchBtn.hidden = !inHangar || !inMissionTab;
    mobileLaunchBtn.disabled = !isLevelUnlocked(selectedLevelId);
  }
  if (mobileAltBtn) {
    mobileAltBtn.hidden = !inMission || !hasAlt;
  }
  if (mobileSwapBtn) {
    const hasSecond = inMission && !!getSecondPrimaryArmoryItem();
    mobileSwapBtn.hidden = !hasSecond;
    mobileSwapBtn.disabled = !hasSecond || player.swapCooldown > 0 || canDualFireCurrentLoadout();
    mobileSwapBtn.innerHTML = hasSecond
      ? renderWeaponStripHtml({ compact: true, cooldown: player.swapCooldown, showEmpty: false })
      : "Swap";
  }
  if (mobileEjectBtn) {
    mobileEjectBtn.hidden = !inMission;
  }
  if (mobileItem1) {
    const hasItem = inMission && mission?.consumableSlots?.[0] && mission.consumableSlots[0] !== "none";
    mobileItem1.hidden = !hasItem;
  }
  if (mobileItem2) {
    const hasItem = inMission && mission?.consumableSlots?.[1] && mission.consumableSlots[1] !== "none";
    mobileItem2.hidden = !hasItem;
  }
  if (inMission && hasAlt) {
    const weapon = rmbWeapons.find((item) => item.id === state.rmbWeapon);
    if (mobileAltLabel) {
      mobileAltLabel.textContent = weapon ? weapon.name : "Alt";
    }
    if (mobileAltIcon) {
      mobileAltIcon.src = mobileAltIcons[state.rmbWeapon] || "";
      mobileAltIcon.alt = weapon ? weapon.name : "Alt";
    }
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function capitalize(value) {
  if (value === undefined || value === null) return "";
  const str = String(value);
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function spawnCreditPopup(x, y, amount) {
  spawnFloatingText(x, y, `+${amount}`, "#7dd3fc");
}

function spawnFloatingText(x, y, value, color = "#7dd3fc") {
  floatingTexts.push({
    x,
    y,
    value,
    color,
    life: 1.1,
    maxLife: 1.1,
    vy: 30,
  });
}

function drawFloatingText(text) {
  const alpha = Math.max(0, text.life / text.maxLife);
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = text.color || "#7dd3fc";
  ctx.font = "14px Space Grotesk, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(text.value, text.x, text.y);
  ctx.restore();
}

function distance(x1, y1, x2, y2) {
  return Math.hypot(x1 - x2, y1 - y2);
}

function getEnemyRemainingDurability(enemy) {
  return (
    Math.max(0, enemy.shield || 0) +
    Math.max(0, enemy.armor || 0) +
    Math.max(0, enemy.hull || 0)
  );
}

function revealEnemyHealth(enemy) {
  enemy.healthBarTimer = Math.max(enemy.healthBarTimer || 0, 1.35);
}

function revealPlayerHealth() {
  player.healthBarTimer = Math.max(player.healthBarTimer || 0, 1.8);
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
  // Shields absorb first; armor usually reduces per-hit damage by armorClass.
  // Returns the total applied to any pool (for analytics/feel), but callers
  // should still treat "interaction" as happening even if applied is 0.
  const baseDamage = Math.max(0, damage);
  let remaining = baseDamage;
  let applied = 0;
  if (enemy.maxShield > 0 && enemy.shield > 0 && remaining > 0) {
    const absorbed = Math.min(enemy.shield, remaining);
    enemy.shield -= absorbed;
    remaining -= absorbed;
    applied += absorbed;
    enemy.shieldCooldown = 2.0;
  }
  if (remaining <= 0) return applied;
  if (enemy.maxArmor > 0 && enemy.armor > 0) {
    const floorDamage = chipFloor
      ? Math.max(minChipDamage, baseDamage * chipFloorRate)
      : 0;
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

function getPlasmaBurnStackState(dotStacks) {
  const stacks = Array.isArray(dotStacks)
    ? dotStacks.filter((stack) => stack && stack.timer > 0 && stack.dps > 0)
    : [];
  const stackedDps = stacks.reduce((sum, stack) => sum + stack.dps, 0);
  const capBySource = new Map();
  stacks.forEach((stack, index) => {
    if (!Number.isFinite(stack.cap) || stack.cap <= 0) return;
    const sourceKey = stack.sourceKey || `plasma-stack-${index}`;
    capBySource.set(sourceKey, Math.max(capBySource.get(sourceKey) || 0, stack.cap));
  });
  const cap = [...capBySource.values()].reduce((sum, value) => sum + value, 0);
  return {
    stacks,
    cap,
    dps: cap > 0 ? Math.min(stackedDps, cap) : stackedDps,
  };
}

function syncPlasmaBurnState(enemy) {
  if (!enemy) return;
  const state = getPlasmaBurnStackState(enemy.dotStacks);
  const stacks = state.stacks;
  enemy.dotStacks = stacks;
  const cap = state.cap;
  enemy.dotDpsCap = cap;
  enemy.dotDps = state.dps;
  enemy.dotTimer = stacks.reduce((max, stack) => Math.max(max, stack.timer), 0);
}

function applyPlasmaBurnPreviewDamage(layers, damage) {
  let remaining = Math.max(0, damage);
  if (layers.shield > 0 && remaining > 0) {
    const absorbed = Math.min(layers.shield, remaining);
    layers.shield -= absorbed;
    remaining -= absorbed;
  }
  if (remaining <= 0) return;
  if (layers.armor > 0) {
    const effective = remaining * getPlasmaBurnArmorDamageScale();
    const toArmor = Math.min(layers.armor, effective);
    layers.armor -= toArmor;
    const overflow = effective - toArmor;
    if (overflow > 0) {
      layers.hull = Math.max(0, layers.hull - overflow);
    }
    return;
  }
  layers.hull = Math.max(0, layers.hull - remaining);
}

function getPlasmaBurnPreview(enemy) {
  if (!enemy || !(enemy.dotDps > 0) || !Array.isArray(enemy.dotStacks)) return null;
  let stacks = enemy.dotStacks
    .filter((stack) => stack && stack.timer > 0 && stack.dps > 0)
    .map((stack) => ({ ...stack }));
  if (!stacks.length) return null;
  const layers = {
    shield: Math.max(0, enemy.shield || 0),
    armor: Math.max(0, enemy.armor || 0),
    hull: Math.max(0, enemy.hull || 0),
  };
  const start = { ...layers };
  while (stacks.length) {
    const burnState = getPlasmaBurnStackState(stacks);
    stacks = burnState.stacks;
    if (!stacks.length || burnState.dps <= 0) break;
    const step = Math.min(...stacks.map((stack) => stack.timer));
    if (!(step > 0)) break;
    applyPlasmaBurnPreviewDamage(layers, burnState.dps * step);
    stacks.forEach((stack) => {
      stack.timer = Math.max(0, stack.timer - step);
    });
    stacks = stacks.filter((stack) => stack.timer > 0 && stack.dps > 0);
    if (layers.hull <= 0) break;
  }
  const totalLoss =
    Math.max(0, start.shield - layers.shield) +
    Math.max(0, start.armor - layers.armor) +
    Math.max(0, start.hull - layers.hull);
  return totalLoss > 0 ? layers : null;
}

function tickPlasmaBurn(enemy, delta) {
  if (!enemy || delta <= 0) return;
  syncPlasmaBurnState(enemy);
  if (!enemy.dotStacks.length || enemy.dotDps <= 0) return;
  revealEnemyHealth(enemy);
  applyDamageToEnemy(enemy, enemy.dotDps * delta, {
    chipFloor: false,
    ignoreArmorClass: true,
    armorDamageMult: getPlasmaBurnArmorDamageScale(),
  });
  enemy.dotStacks.forEach((stack) => {
    stack.timer = Math.max(0, stack.timer - delta);
  });
  syncPlasmaBurnState(enemy);
}

function applyPlasmaBurn(enemy, sourceDamage, maxBurnDps = 0, sourceKey = "plasma") {
  if (!enemy || sourceDamage <= 0) return;
  if (!Array.isArray(enemy.dotStacks)) enemy.dotStacks = [];
  enemy.dotStacks.push({
    timer: getPlasmaBurnDuration(),
    dps: sourceDamage * getPlasmaBurnDpsRate(),
    cap: Number.isFinite(maxBurnDps) && maxBurnDps > 0 ? maxBurnDps : 0,
    sourceKey,
  });
  syncPlasmaBurnState(enemy);
}

function healPlayerFromVampiricDamage(bullet, damageDealt) {
  if (!bullet?.vampiric || damageDealt <= 0 || player.hull >= player.maxHull) return;
  const heal = Math.min(player.maxHull * 0.08, damageDealt * bullet.vampiric);
  if (heal <= 0) return;
  player.hull = Math.min(player.maxHull, player.hull + heal);
}

function wrapAngle(angle) {
  let wrapped = angle;
  while (wrapped > Math.PI) wrapped -= Math.PI * 2;
  while (wrapped < -Math.PI) wrapped += Math.PI * 2;
  return wrapped;
}

function updateStarfield(delta) {
  const speedFactor = 0.12;
  starfield.forEach((star) => {
    star.y += star.speed * speedFactor * delta;
    if (star.y > 1) {
      star.y = 0;
      star.x = Math.random();
    }
  });
}

function spawnExplosion(
  x,
  y,
  radius,
  { intensity = 1, blend = "source-over", style = "default", coalesce = true } = {}
) {
  const duration = 0.55 + radius * 0.01;

  // Fast-fire explosives can stack into a solid blob; coalesce nearby impacts into one effect.
  if (coalesce) {
    for (let i = explosions.length - 1; i >= 0; i -= 1) {
      const boom = explosions[i];
      if ((boom.style || "default") !== style) continue;
      if ((boom.blend || "source-over") !== blend) continue;
      if (boom.elapsed > boom.duration * 0.35) continue;
      const d = distance(x, y, boom.x, boom.y);
      const mergeDist = Math.max(18, Math.min(radius, boom.radius) * 0.7);
      if (d > mergeDist) continue;
      boom.radius = Math.max(boom.radius, radius);
      boom.intensity = Math.min(1.15, (boom.intensity ?? 1) + intensity * 0.35);
      boom.elapsed = Math.min(boom.elapsed, boom.duration * 0.12);
      return;
    }
  }

  explosions.push({
    x,
    y,
    radius,
    elapsed: 0,
    duration,
    rotation: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 3.5,
    intensity,
    blend,
    style,
    deathScale: style === "playerDeath" ? 3.2 : style === "bossDeath" ? 4.5 : undefined,
  });
}

function drawExplosion(boom) {
  const progress = Math.min(1, boom.elapsed / boom.duration);
  const maxRadius = boom.radius * (2.2 + progress);
  const alpha = 1 - progress;
  const intensity = boom.intensity ?? 1;
  const style = boom.style || "default";
  const visualTheme = getLevelVisualTheme();

  const drawThemeExplosionFrame = (scaleBase) => {
    const frames = visualTheme?.explosionFrames || [];
    const frame = frames[Math.min(frames.length - 1, Math.floor(progress * frames.length))];
    if (!frame?.loaded) return false;
    ctx.globalAlpha = Math.min(1, 0.88 * alpha * intensity);
    drawSpriteCentered(frame, boom.x, boom.y, scaleBase * (1 + progress * 0.22));
    return true;
  };

  ctx.save();
  ctx.globalCompositeOperation = boom.blend || "source-over";
  if (style === "playerDeath" || style === "bossDeath") {
    // Big, readable explosion with a fiery animated core.
    const ringR = maxRadius * 0.9;
    const ringW = Math.max(3, boom.radius * 0.18);
    const ringAlpha = 0.55 * alpha * intensity;
    const gradient = ctx.createRadialGradient(boom.x, boom.y, ringR - ringW, boom.x, boom.y, ringR + ringW);
    gradient.addColorStop(0, "rgba(251, 191, 36, 0)");
    gradient.addColorStop(0.5, `rgba(251, 191, 36, ${ringAlpha})`);
    gradient.addColorStop(1, "rgba(251, 191, 36, 0)");
    ctx.strokeStyle = gradient;
    ctx.lineWidth = ringW;
    ctx.beginPath();
    ctx.arc(boom.x, boom.y, ringR, 0, Math.PI * 2);
    ctx.stroke();

    ctx.globalAlpha = Math.min(1, 0.95 * alpha * intensity);
    if (style === "playerDeath" && visualTheme?.playerDeathCore?.loaded) {
      drawSpriteCentered(
        visualTheme.playerDeathCore,
        boom.x,
        boom.y,
        (boom.deathScale ?? 3.2) * (1 + progress * 0.25)
      );
    } else {
      const frames = assets.explosionFire || [];
      const idx = Math.min(frames.length - 1, Math.floor(progress * frames.length));
      const frame = frames[idx];
      if (frame && frame.loaded) {
        const scale = (boom.deathScale ?? 3.2) * (1 + progress * 0.2);
        drawSpriteCentered(frame, boom.x, boom.y, scale);
      } else if (assets.explosionCore.loaded) {
        drawSpriteCentered(assets.explosionCore, boom.x, boom.y, 2.6 + progress * 2.2);
      }
    }
    ctx.restore();
    return;
  }
  if (style === "empPulse") {
    const ringR = Math.max(16, boom.radius * (0.45 + progress * 1.85));
    const ringW = Math.max(2, boom.radius * 0.05);
    ctx.strokeStyle = `rgba(125, 211, 252, ${0.72 * alpha * intensity})`;
    ctx.lineWidth = ringW;
    ctx.beginPath();
    ctx.arc(boom.x, boom.y, ringR, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = `rgba(34, 211, 238, ${0.32 * alpha * intensity})`;
    ctx.lineWidth = Math.max(1, ringW * 0.45);
    ctx.beginPath();
    ctx.arc(boom.x, boom.y, ringR * 0.68, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
    return;
  }
  if (style === "impact" || style === "plasmaImpact") {
    // Ring-style impact: reads well, but doesn't stack into a fully opaque blob.
    const ringR = maxRadius * 0.82;
    const ringW = Math.max(2, boom.radius * 0.22);
    const ringAlpha = 0.55 * alpha * intensity;
    const gradient = ctx.createRadialGradient(boom.x, boom.y, ringR - ringW, boom.x, boom.y, ringR + ringW);
    const ringColor = style === "plasmaImpact" ? "34, 211, 238" : "251, 191, 36";
    gradient.addColorStop(0, `rgba(${ringColor}, 0)`);
    gradient.addColorStop(0.5, `rgba(${ringColor}, ${ringAlpha})`);
    gradient.addColorStop(1, `rgba(${ringColor}, 0)`);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = ringW;
    ctx.beginPath();
    ctx.arc(boom.x, boom.y, ringR, 0, Math.PI * 2);
    ctx.stroke();
    const impactSprite = visualTheme?.shieldHitRing?.loaded
      ? visualTheme.shieldHitRing
      : visualTheme?.impactSpark;
    if (impactSprite?.loaded) {
      ctx.globalAlpha = Math.min(1, 0.7 * alpha * intensity);
      drawSpriteCentered(impactSprite, boom.x, boom.y, Math.max(0.45, boom.radius / 36) * (1 + progress * 0.35));
    }
  } else {
    if (drawThemeExplosionFrame(Math.max(0.55, boom.radius / 42))) {
      ctx.restore();
      return;
    }
    const gradient = ctx.createRadialGradient(boom.x, boom.y, 0, boom.x, boom.y, maxRadius);
    // Keep these big, but slightly lower alpha so stacked explosions don't saturate to a solid disk.
    gradient.addColorStop(0, `rgba(255, 244, 214, ${0.22 * alpha * intensity})`);
    gradient.addColorStop(0.5, `rgba(251, 191, 36, ${0.18 * alpha * intensity})`);
    gradient.addColorStop(1, "rgba(251, 191, 36, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(boom.x, boom.y, maxRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 0.65 * alpha * intensity;
    if (assets.explosionFlare.loaded) {
      ctx.save();
      ctx.translate(boom.x, boom.y);
      ctx.rotate(boom.rotation);
      ctx.drawImage(
        assets.explosionFlare.img,
        -assets.explosionFlare.img.naturalWidth * 0.6,
        -assets.explosionFlare.img.naturalHeight * 0.6,
        assets.explosionFlare.img.naturalWidth * 1.2,
        assets.explosionFlare.img.naturalHeight * 1.2
      );
      ctx.restore();
    }
    if (assets.explosionCore.loaded) {
      drawSpriteCentered(assets.explosionCore, boom.x, boom.y, 1.1 + progress * 1.4);
    }
  }
  ctx.restore();
}

function creditForEnemy(enemy) {
  const rewardConfig = getMissionRewardConfig();
  const difficultyScale = 1 + mission.difficulty * (rewardConfig.enemyBountyDifficultyScale ?? 0.09);
  const base = Number.isFinite(enemy?.baseCredit)
    ? enemy.baseCredit
    : rewardConfig.fallbackEnemyBaseCredit;
  return Math.round(base * difficultyScale);
}

function creditRewardFor(missionState) {
  return Math.round((missionState.killCredits || 0) + (missionState.objectiveCredits || 0));
}

function objectiveCreditRewardFor(missionState, completed = false) {
  if (!completed) return 0;
  const level = missionState?.level || {};
  const explicit = level.objectiveCredits ?? level.objectiveCredit ?? level.creditReward;
  return Number.isFinite(explicit) ? Math.max(0, Math.round(explicit)) : 0;
}

function missionCompletionCreditFor(missionState, completed = false) {
  if (!completed) return 0;
  const levelId = missionBaseIdFor(missionState?.level?.id || selectedLevelId);
  const levelIndex = Math.max(0, availableLevels.findIndex((level) => level.id === levelId));
  const rewardConfig = getMissionRewardConfig();
  return Math.round(
    rewardConfig.completionBase +
      levelIndex * rewardConfig.completionIncrement
  );
}

function getBossSpawnTime(level) {
  if (!level?.events || !level.enemyTypes) return null;
  let earliest = null;
  level.events.forEach((event) => {
    const def = mergeLevelEnemySpec(level, event.type);
    if (def && def.isBoss) {
      if (earliest === null || event.time < earliest) {
        earliest = event.time;
      }
    }
  });
  return earliest;
}

function setBossBarLayer(element, leftPercent, widthPercent) {
  if (!element) return;
  element.style.left = `${Math.max(0, Math.min(100, leftPercent))}%`;
  element.style.width = `${Math.max(0, Math.min(100, widthPercent))}%`;
}

function clearBossBurnLayers() {
  [bossBurnHullFill, bossBurnArmorFill, bossBurnShieldFill].forEach((element) => {
    setBossBarLayer(element, 0, 0);
  });
}

function setBossBurnLayer(element, layerLeftPercent, currentValue, previewValue, totalMax) {
  if (!element || totalMax <= 0) return;
  const loss = Math.max(0, currentValue - Math.max(0, previewValue));
  const previewWidth = (Math.max(0, previewValue) / totalMax) * 100;
  setBossBarLayer(element, layerLeftPercent + previewWidth, (loss / totalMax) * 100);
}

function getActiveMiniboss() {
  if (!mission?.active) return null;
  if (mission.activeMinibossId !== null) {
    const active = enemies.find((enemy) => enemy.id === mission.activeMinibossId && enemy.miniboss && enemy.hull > 0);
    if (active) return active;
  }
  const fallback = enemies.find((enemy) => enemy.miniboss && enemy.hull > 0) || null;
  mission.activeMinibossId = fallback ? fallback.id : null;
  return fallback;
}

function updateMinibossProgress() {
  if (!minibossProgress || !minibossProgressFill || !minibossLabel) return;
  const miniboss = getActiveMiniboss();
  if (!miniboss) {
    minibossProgress.hidden = true;
    setBossBarLayer(minibossShieldFill, 0, 0);
    setBossBarLayer(minibossArmorFill, 0, 0);
    setBossBarLayer(minibossProgressFill, 0, 0);
    return;
  }
  minibossProgress.hidden = false;
  const maxShield = miniboss.maxShield || 0;
  const maxArmor = miniboss.maxArmor || 0;
  const maxHull = miniboss.maxHull || 0;
  const totalMax = maxShield + maxArmor + maxHull;
  if (totalMax <= 0) return;
  const shield = Math.max(0, miniboss.shield || 0);
  const armor = Math.max(0, miniboss.armor || 0);
  const hull = Math.max(0, miniboss.hull || 0);
  const hullMaxWidth = (maxHull / totalMax) * 100;
  const armorMaxWidth = (maxArmor / totalMax) * 100;
  setBossBarLayer(minibossProgressFill, 0, (hull / totalMax) * 100);
  setBossBarLayer(minibossArmorFill, hullMaxWidth, (armor / totalMax) * 100);
  setBossBarLayer(minibossShieldFill, hullMaxWidth + armorMaxWidth, (shield / totalMax) * 100);
  const remaining = shield + armor + hull;
  minibossLabel.textContent = `${miniboss.name || "Miniboss"} ${Math.max(0, Math.round((remaining / totalMax) * 100))}%`;
}

function updateBossProgress() {
  if (!bossProgressFill || !bossLabel || !mission) return;
  clearBossBurnLayers();
  const bossTime = mission.bossSpawnTime;
  if (!bossTime) {
    bossLabel.textContent = "No Boss";
    setBossBarLayer(bossShieldFill, 0, 0);
    setBossBarLayer(bossArmorFill, 0, 0);
    setBossBarLayer(bossProgressFill, 0, 0);
    return;
  }
  if (mission.bossDefeated) {
    bossLabel.textContent = "Boss Defeated";
    setBossBarLayer(bossShieldFill, 0, 0);
    setBossBarLayer(bossArmorFill, 0, 0);
    setBossBarLayer(bossProgressFill, 0, 100);
    return;
  }
  if (mission.bossAlive) {
    const boss = enemies.find((enemy) => enemy.isBoss);
    if (!boss) {
      bossLabel.textContent = "Boss Engaged";
      setBossBarLayer(bossShieldFill, 0, 0);
      setBossBarLayer(bossArmorFill, 0, 0);
      setBossBarLayer(bossProgressFill, 0, 100);
      return;
    }
    const maxShield = boss.maxShield || 0;
    const maxArmor = boss.maxArmor || 0;
    const maxHull = boss.maxHull || 0;
    const totalMax = maxShield + maxArmor + maxHull;
    if (totalMax <= 0) return;
    const shield = Math.max(0, boss.shield || 0);
    const armor = Math.max(0, boss.armor || 0);
    const hull = Math.max(0, boss.hull || 0);
    const hullMaxWidth = (maxHull / totalMax) * 100;
    const armorMaxWidth = (maxArmor / totalMax) * 100;
    const armorLeft = hullMaxWidth;
    const shieldLeft = hullMaxWidth + armorMaxWidth;
    setBossBarLayer(bossProgressFill, 0, (hull / totalMax) * 100);
    setBossBarLayer(bossArmorFill, armorLeft, (armor / totalMax) * 100);
    setBossBarLayer(bossShieldFill, shieldLeft, (shield / totalMax) * 100);
    const burnPreview = getPlasmaBurnPreview(boss);
    if (burnPreview) {
      setBossBurnLayer(bossBurnHullFill, 0, hull, burnPreview.hull, totalMax);
      setBossBurnLayer(bossBurnArmorFill, armorLeft, armor, burnPreview.armor, totalMax);
      setBossBurnLayer(bossBurnShieldFill, shieldLeft, shield, burnPreview.shield, totalMax);
    }
    const totalRemaining = shield + armor + hull;
    bossLabel.textContent = `Boss ${Math.max(0, Math.round((totalRemaining / totalMax) * 100))}%`;
    return;
  }
  const progress = Math.min(1, mission.elapsed / bossTime);
  bossLabel.textContent = `Boss ETA ${formatTime(Math.max(0, bossTime - mission.elapsed))}`;
  setBossBarLayer(bossShieldFill, 0, 0);
  setBossBarLayer(bossArmorFill, 0, 0);
  setBossBarLayer(bossProgressFill, 0, Math.round(progress * 100));
}

let lastTime = performance.now();
function gameLoop(now) {
  const delta = Math.min(0.033, (now - lastTime) / 1000);
  lastTime = now;

  update(delta);
  render();

  if (mission && mission.active && paused && !missionIntroActive) {
    ctx.save();
    ctx.fillStyle = "rgba(3, 10, 25, 0.7)";
    ctx.fillRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
    ctx.fillStyle = "#e0f2fe";
    ctx.font = "24px Space Grotesk, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("PAUSED", canvas.width / window.devicePixelRatio / 2, canvas.height / window.devicePixelRatio / 2);
    ctx.restore();
  }

  requestAnimationFrame(gameLoop);
}

async function bootstrapGame() {
  try {
    await loadEconomyConfig();
    state = loadState();
    applyDevStateFlags();
    updateTuningBadge();
    renderTuningPanel();
    safeUpdateHangar();
    Promise.all([ensureWeaponFrameCatalogLoaded(), ensureItemPoolLoaded()])
      .then(() => {
        if (mission?.active) return;
        refreshSavedInventoryCatalogBuilds(state);
        syncStarterArmoryState();
        saveState();
        safeUpdateHangar();
        renderTuningPanel();
      })
      .catch((error) => {
        console.warn("Non-fatal catalog refresh failed:", error);
      });
    void autoLaunchFreshPilotMission();
    requestAnimationFrame(gameLoop);
  } catch (error) {
    console.error(error);
    showStartupError(error);
  }
}

void bootstrapGame();
