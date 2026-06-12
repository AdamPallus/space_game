const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const hudHull = document.getElementById("hud-hull");
const hudArmor = document.getElementById("hud-armor");
const hudShield = document.getElementById("hud-shield");
const hudCredits = document.getElementById("hud-credits");
const hudScore = document.getElementById("hud-score");
const hudTime = document.getElementById("hud-time");
const hudMission = document.getElementById("hud-mission");
const bossLabel = document.getElementById("boss-label");
const bossProgressFill = document.getElementById("boss-progress-fill");
const hudCargoPips = document.getElementById("hud-cargo-pips");
const hudCargoStatus = document.getElementById("hud-cargo-status");
const hudItem1 = document.getElementById("hud-item-1");
const hudItem2 = document.getElementById("hud-item-2");
const shipGunValue = document.getElementById("ship-gun-value");
const shipFlowValue = document.getElementById("ship-flow-value");
const shipAmmoValue = document.getElementById("ship-ammo-value");
const shipEffectsValue = document.getElementById("ship-effects-value");
const shipDefensesValue = document.getElementById("ship-defenses-value");
const shipModal = document.getElementById("ship-modal");
const shipModalTitle = document.getElementById("ship-modal-title");
const shipModalBody = document.getElementById("ship-modal-body");
const shipModalClose = document.getElementById("ship-modal-close");
const missionIntroModal = document.getElementById("mission-intro-modal");
const missionIntroConfirm = document.getElementById("mission-intro-confirm");
const missionIntroTitle = document.getElementById("mission-intro-title");
const missionIntroText = document.getElementById("mission-intro-text");
const shipNodeButtons = document.querySelectorAll("[data-ship-node]");
const shipStats = document.getElementById("ship-stats");
const armoryBench = document.getElementById("armory-bench");
const armoryInspector = document.getElementById("armory-inspector");
const weaponInventory = document.getElementById("weapon-inventory");
const armoryRackTitle = document.getElementById("armory-rack-title");
const armoryRackCopy = document.getElementById("armory-rack-copy");
const armoryRackTip = document.getElementById("armory-rack-tip");
const armoryToggleStats = document.getElementById("armory-toggle-stats");

const overlay = document.getElementById("overlay");
const hangarPanel = document.getElementById("hangar");
const debriefPanel = document.getElementById("debrief");
const hangarStatus = document.getElementById("hangar-status");

const pilotRank = document.getElementById("pilot-rank");
const availableCreditsEl = document.getElementById("available-credits");
const lifetimeCreditsEl = document.getElementById("lifetime-credits");
const lastMissionEl = document.getElementById("last-mission");
const debugUnlock = document.getElementById("debug-unlock");
const debugInvincible = document.getElementById("debug-invincible");
const debugShowCompendium = document.getElementById("debug-show-compendium");
const debugSkipOnboarding = document.getElementById("debug-skip-onboarding");
const onboardingBanner = document.getElementById("onboarding-banner");
const missionBriefingText = document.getElementById("mission-briefing-text");
const treeBarrel = document.getElementById("tree-barrel");
const treeTrigger = document.getElementById("tree-trigger");
const treeMount = document.getElementById("tree-mount");
const treePayload = document.getElementById("tree-payload");
const treeModifier = document.getElementById("tree-modifier");
const treePrimaryUpgrades = document.getElementById("tree-primary-upgrades");
const treeAuxSelect = document.getElementById("tree-aux-select");
const treeAuxUpgrades = document.getElementById("tree-aux-upgrades");
const treeShipUpgrades = document.getElementById("tree-ship-upgrades");
const hangarTabButtons = document.querySelectorAll(".tab-btn");
const hangarSceneButtons = document.querySelectorAll("[data-scene-target]");
const hangarTabPanels = document.querySelectorAll("[data-tab-panel]");
const consumableStore = document.getElementById("consumable-store");
const consumableEquipList = document.getElementById("consumable-equip-list");
const consumableSlot1 = document.getElementById("consumable-slot-1");
const consumableSlot2 = document.getElementById("consumable-slot-2");
const clearSlot1 = document.getElementById("clear-slot-1");
const clearSlot2 = document.getElementById("clear-slot-2");
const investmentTreeMap = document.getElementById("investment-tree-map");
const investmentTreeLines = document.getElementById("investment-tree-lines");
const investmentTreeInspector = document.getElementById("investment-tree-inspector");
const economyTreeCredits = document.getElementById("economy-tree-credits");
const economyTreeProgress = document.getElementById("economy-tree-progress");
const ledgerBulletin = document.getElementById("ledger-bulletin");
const ledgerStockList = document.getElementById("ledger-stock-list");
const ledgerInventoryList = document.getElementById("ledger-inventory-list");
const ledgerReceipt = document.getElementById("ledger-receipt");
const ledgerModeButtons = document.querySelectorAll("[data-ledger-mode]");
const ledgerModePanels = document.querySelectorAll("[data-ledger-panel]");

// Investment UI elements
const engineeringTier = document.getElementById("engineering-tier");
const engineeringBenefits = document.getElementById("engineering-benefits");
const engineeringInvest = document.getElementById("engineering-invest");
const engineeringCost = document.getElementById("engineering-cost");
const operationsTier = document.getElementById("operations-tier");
const operationsBenefits = document.getElementById("operations-benefits");
const operationsInvest = document.getElementById("operations-invest");
const operationsCost = document.getElementById("operations-cost");
const sharesTier = document.getElementById("shares-tier");
const sharesBenefits = document.getElementById("shares-benefits");
const sharesInvest = document.getElementById("shares-invest");
const sharesCost = document.getElementById("shares-cost");

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
const mobileItem1 = document.getElementById("mobile-item-1");
const mobileItem2 = document.getElementById("mobile-item-2");
const mobileEjectBtn = document.getElementById("mobile-eject");
const mobileLaunchBtn = document.getElementById("mobile-launch");
const mobileControls = document.getElementById("mobile-controls");
const levelList = document.getElementById("level-list");
const compendiumList = document.getElementById("compendium-list");
const compendiumSearch = document.getElementById("compendium-search");
const compendiumShowBosses = document.getElementById("compendium-show-bosses");

const STORAGE_KEY = "mini-fighter-save";
const ASSET_ROOT = "assets/SpaceShooterRedux/PNG";
const BG_ROOT = "assets/SpaceShooterRedux/Backgrounds";
const GENERATED_ROOT = "assets/generated";
const GENERATED_EFFECT_ROOT = `${GENERATED_ROOT}/effects_projectiles_v1`;
const GENERATED_BIO_ROOT = `${GENERATED_ROOT}/bio_enemies_v1`;
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
  "collisionDamage",
  "damageScale",
  "aggroRadius",
  "empImmune",
  "isBoss",
  "hpScale",
]);

const ECONOMY = {
  cargoSize: 3,
  salvagePodSpeed: 40,
  cargoFullFlashSeconds: 1.1,
  minDamageFloor: 0.2,
  deathBountyWritedownRate: 0.25,
  recoveryBonusRate: {
    min: 0.1,
    max: 0.25,
  },
  dropSources: {
    ordinary: {
      chance: 0.02,
      rarityWeights: { scrap: 1 },
    },
    transport: {
      chance: 1,
      rarityWeights: { scrap: 0.82, certified: 0.18 },
    },
    captain: {
      chance: 0.6,
      minBaseCredit: 150,
      rarityWeights: { scrap: 0.25, certified: 0.65, prototype: 0.1 },
    },
    boss: {
      chance: 1,
      rarityWeights: { certified: 0.25, prototype: 0.7, preFounding: 0.05 },
    },
    eliteBonusChance: 0.15,
  },
  rarityOrder: ["scrap", "certified", "prototype", "preFounding"],
  rarities: {
    scrap: {
      label: "Scrap-grade",
      shortLabel: "SCRAP",
      color: "#94a3b8",
      glow: "rgba(148, 163, 184, 0.76)",
      affixCount: 0,
      valueRange: [40, 80],
    },
    certified: {
      label: "Certified",
      shortLabel: "CERT",
      color: "#60a5fa",
      glow: "rgba(96, 165, 250, 0.82)",
      affixCount: 1,
      valueRange: [150, 300],
    },
    prototype: {
      label: "Prototype",
      shortLabel: "PROTO",
      color: "#a78bfa",
      glow: "rgba(167, 139, 250, 0.88)",
      affixCount: 2,
      valueRange: [500, 900],
    },
    preFounding: {
      label: "Pre-Founding",
      shortLabel: "RELIC",
      color: "#facc15",
      glow: "rgba(250, 204, 21, 0.92)",
      affixCount: 2,
      valueRange: [1500, 3000],
    },
  },
  market: {
    buyRate: 1,
    sellRate: 0.4,
    handlingFeeRate: 0.6,
    stockLots: 5,
    bulletinCadence: 3,
    bulletinBonusRate: 0.4,
    mispricedLotChance: 0.125,
    mispricedValueRange: [0.35, 0.5],
    mispricedMinProfitRate: 0.02,
    earlyRecallAuditThreshold: 3,
    stockRarityProgression: [
      { unlockedLevel: 1, weights: { scrap: 0.72, certified: 0.28 } },
      { unlockedLevel: 3, weights: { scrap: 0.42, certified: 0.48, prototype: 0.1 } },
      { unlockedLevel: 6, weights: { scrap: 0.2, certified: 0.5, prototype: 0.27, preFounding: 0.03 } },
      { unlockedLevel: 9, weights: { certified: 0.42, prototype: 0.5, preFounding: 0.08 } },
    ],
    bulletinTags: [
      { tag: "kinetic", label: "Kinetic frames" },
      { tag: "plasma", label: "Plasma frames" },
      { tag: "anti-armor", label: "Anti-armor gear" },
      { tag: "shield", label: "Shield hardware" },
      { tag: "defense", label: "Defense modules" },
      { tag: "aux", label: "Aux systems" },
      { tag: "pierce", label: "Pierce traces" },
      { tag: "regen", label: "Regen hardware" },
      { tag: "control", label: "Control systems" },
      { tag: "evasion", label: "Evasion gear" },
      { tag: "flow-rate", label: "Flow-rate tuning" },
      { tag: "sustain", label: "Sustain traces" },
    ],
  },
};

const LEDGER_COPY = {
  cargoFull: "CARGO FULL",
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

const upgrades = [
  {
    id: "hull",
    name: "Reinforced Hull",
    desc: "+8% max hull per level.",
    baseCost: 120,
  },
  {
    id: "shield",
    name: "Shield Capacitors",
    desc: "+10% max shields per level.",
    baseCost: 140,
  },
  {
    id: "damage",
    name: "Coil Blaster",
    desc: "+10% primary damage per level.",
    baseCost: 160,
  },
  {
    id: "fireRate",
    name: "Fire Control",
    desc: "-7% primary cooldown per level.",
    baseCost: 150,
  },
  {
    id: "auxCooldown",
    name: "Ability Cooldown",
    desc: "-8% ability cooldown per level.",
    baseCost: 180,
  },
  {
    id: "cloakDuration",
    name: "Ability Duration",
    desc: "+12% ability duration per level.",
    baseCost: 200,
  },
];

function createDefaultShipBuild() {
  return {
    gunDiameter: "medium", // small | medium | large
    spread: "focused", // focused | burst | wide
    flowRateLevel: 0,
    flowVelocityLevel: 0,
    flowSizeLevel: 0,
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
    armorAmountLevel: 0,
    armorClass: 10,
    armorClassLevel: 0,
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
      defenseSlots: ["shield", "none"],
      shieldMaxLevel: 0,
      shieldRegenLevel: 0,
      armorAmountLevel: 0,
      armorClass: 10,
      armorClassLevel: 0,
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
      armorAmountLevel: 0,
      armorClass: 10,
      armorClassLevel: 0,
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
      armorAmountLevel: 1,
      armorClass: 12,
      armorClassLevel: 0,
    },
  },
];

let starterWeaponLoadouts = [];
let starterWeaponLoadoutsById = {};

const consumables = [
  {
    id: "bomb",
    name: "Bomb Charge",
    desc: "Detonates a blast that damages nearby enemies.",
    cost: 220,
    usesPerMission: 1,
    cooldown: 12,
    unlockTier: 1,
    hudLabel: "Bomb",
  },
  {
    id: "shieldBoost",
    name: "Shield Booster",
    desc: "Restore shields and patch some hull.",
    cost: 160,
    usesPerMission: 2,
    cooldown: 10,
    unlockTier: 3,
    hudLabel: "Shield",
  },
  {
    id: "overcharge",
    name: "Overcharge",
    desc: "Temporarily increases primary damage.",
    cost: 260,
    usesPerMission: 1,
    cooldown: 18,
    duration: 6,
    unlockTier: 3,
    hudLabel: "Overcharge",
  },
];

const consumablesById = Object.fromEntries(consumables.map((item) => [item.id, item]));

// Fleet Investment System
const investments = {
  engineering: {
    name: "Engineering Bay",
    tiers: [
      { cost: 200, benefit: "Unlock basic consumables (bombs)" },
      { cost: 500, benefit: "Reduce repair costs by 25%" },
      { cost: 1000, benefit: "Unlock advanced consumables" },
      { cost: 2000, benefit: "Consumables regenerate between missions" },
      { cost: 4000, benefit: "Prototype gear each mission" },
    ],
  },
  operations: {
    name: "Operations Center",
    tiers: [
      { cost: 200, benefit: "Unlock Patrol mission variants" },
      { cost: 500, benefit: "Unlock Bonus Objectives (+credits)" },
      { cost: 1000, benefit: "Unlock Skirmish variants" },
      { cost: 2000, benefit: "Unlock Siege variants" },
      { cost: 4000, benefit: "Unlock Elite modifier (2x diff, 3x credits)" },
    ],
  },
  shares: {
    name: "Fleet Shares",
    tiers: [
      { cost: 300, benefit: "+5% passive credits per mission", dividend: 0.05 },
      { cost: 800, benefit: "+10% passive credits", dividend: 0.10 },
      { cost: 1500, benefit: "+10% + Fleet events (bonus payouts)", dividend: 0.10 },
      { cost: 3000, benefit: "+15% + Fleet Contracts access", dividend: 0.15 },
      { cost: 6000, benefit: "+20% + Boss bounty shares", dividend: 0.20 },
    ],
  },
};

const investmentTreeBranches = {
  engineering: {
    icon: "🔧",
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
    icon: "📡",
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
    icon: "⬡",
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
};

const investmentTreeConnections = [
  ["root", "engineering-0"],
  ["engineering-0", "engineering-1"],
  ["engineering-1", "engineering-2"],
  ["engineering-1", "engineering-3"],
  ["engineering-0", "engineering-4"],
  ["root", "operations-0"],
  ["operations-0", "operations-1"],
  ["operations-1", "operations-2"],
  ["operations-1", "operations-3"],
  ["operations-3", "operations-4"],
  ["root", "shares-0"],
  ["shares-0", "shares-1"],
  ["shares-1", "shares-2"],
  ["shares-0", "shares-3"],
  ["shares-3", "shares-4"],
];

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

const ONBOARDING_STAGE_TRAINING_COMPLETE = 3;
const ONBOARDING_STAGE_COMPLETE = 4;
const DEFAULT_SYSTEM_UNLOCKS = {
  loadout: false,
  economy: false,
  compendium: false,
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
  if (!["focused", "burst", "wide"].includes(normalized.spread)) {
    throw new Error(`${context} has invalid spread`);
  }
  if (!["kinetic", "plasma"].includes(normalized.ammo)) {
    throw new Error(`${context} has invalid ammo`);
  }
  if (!["none", "homing", "explosive", "pierce"].includes(normalized.effect)) {
    throw new Error(`${context} has invalid effect`);
  }
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
  if (skipOnboarding || stage >= ONBOARDING_STAGE_TRAINING_COMPLETE) {
    return starterFrames.map((item) => item.id);
  }
  return starterFrames
    .filter((item) => item.starterUnlockStage <= stage)
    .map((item) => item.id);
}

function getStarterDefenseModuleIdsForStage(stage, skipOnboarding = false) {
  if (skipOnboarding || stage >= ONBOARDING_STAGE_TRAINING_COMPLETE) {
    return defenseModules.map((item) => item.id);
  }
  if (stage >= 2) {
    return ["shield_module", "armor_module"];
  }
  return ["shield_module"];
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
    icon: mobileAltIcons[weapon.id] || `${ASSET_ROOT}/Power-ups/powerupBlue.png`,
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

function getPrimaryArmoryItem(targetState = state) {
  const equippedItem = findInventoryItem(targetState.armory?.equippedPrimaryItemId, targetState);
  if (equippedItem?.slotType === "primary") return equippedItem;
  const equippedId = targetState.armory?.equippedLoadoutId;
  return starterWeaponLoadoutsById[equippedId] || starterWeaponLoadouts[0];
}

function getDefenseArmoryItemById(moduleId, targetState = state) {
  if (!moduleId || moduleId === "none") return null;
  return defenseModulesById[moduleId] || findInventoryItem(moduleId, targetState);
}

function composeShipBuildFromArmory(targetState) {
  const base = createDefaultShipBuild();
  const frame = getPrimaryArmoryItem(targetState);
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
    armorAmountLevel: 0,
    armorClass: 10,
    armorClassLevel: 0,
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
      merged.shieldMaxLevel = Math.max(merged.shieldMaxLevel, module.build.shieldMaxLevel ?? 0);
      merged.shieldRegenLevel = Math.max(
        merged.shieldRegenLevel,
        module.build.shieldRegenLevel ?? 0
      );
    }
    if (module.defenseType === "armor") {
      merged.defenseSlots[index] = "armor";
      merged.armorAmountLevel = Math.max(
        merged.armorAmountLevel,
        module.build.armorAmountLevel ?? 0
      );
      merged.armorClass = Math.max(merged.armorClass, module.build.armorClass ?? 10);
      merged.armorClassLevel = Math.max(
        merged.armorClassLevel,
        module.build.armorClassLevel ?? 0
      );
    }
  });

  const supportItem = findInventoryItem(targetState.armory?.equippedSupportItemId, targetState);
  if (supportItem && isSupportSlotType(supportItem.slotType) && supportItem.build) {
    ["flowRateLevel", "flowVelocityLevel", "flowSizeLevel", "shieldMaxLevel", "shieldRegenLevel", "armorAmountLevel", "armorClassLevel"].forEach((key) => {
      if (Number.isFinite(supportItem.build[key])) {
        merged[key] = Math.max(merged[key] ?? 0, supportItem.build[key]);
      }
    });
  }

  return merged;
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
    if ((candidate.armorAmountLevel ?? 0) === (build.armorAmountLevel ?? 0)) score += 1;
    if ((candidate.armorClass ?? 10) === (build.armorClass ?? 10)) score += 1;
    if ((candidate.armorClassLevel ?? 0) === (build.armorClassLevel ?? 0)) score += 1;
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
  const desiredEquippedId =
    existingArmory.equippedLoadoutId && ownedLoadoutIds.includes(existingArmory.equippedLoadoutId)
      ? existingArmory.equippedLoadoutId
      : ownedLoadoutIds.includes(findClosestStarterLoadoutId(targetState.shipBuild))
        ? findClosestStarterLoadoutId(targetState.shipBuild)
        : ownedLoadoutIds[0] || starterWeaponLoadouts[0].id;
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

  targetState.armory = {
    ownedLoadoutIds,
    ownedDefenseModuleIds,
    equippedLoadoutId: desiredEquippedId,
    equippedPrimaryItemId,
    equippedDefenseSlotIds,
    equippedSupportItemId,
    inventory: existingInventory,
  };
  targetState.shipBuild = composeShipBuildFromArmory(targetState);
}

function getOwnedStarterLoadoutIds() {
  return state.armory?.ownedLoadoutIds || [];
}

function getEquippedStarterLoadout() {
  return getPrimaryArmoryItem(state);
}

function equipStarterLoadout(loadoutId) {
  const item = starterWeaponLoadoutsById[loadoutId];
  if (!item) return;
  if (!getOwnedStarterLoadoutIds().includes(loadoutId)) return;
  state.armory = state.armory || {
    ownedLoadoutIds: [],
    ownedDefenseModuleIds: [],
    equippedLoadoutId: loadoutId,
    equippedDefenseSlotIds: ["shield_module", "none"],
  };
  state.armory.equippedLoadoutId = loadoutId;
  state.armory.equippedPrimaryItemId = null;
  state.shipBuild = composeShipBuildFromArmory(state);
  syncShipBuildToLegacy();
  saveState();
}

function equipPrimaryInventoryItem(itemId) {
  const item = findInventoryItem(itemId);
  if (!item || item.slotType !== "primary") return;
  state.armory = state.armory || {
    ownedLoadoutIds: [],
    ownedDefenseModuleIds: [],
    equippedLoadoutId: starterWeaponLoadouts[0]?.id || "fundamentals",
    equippedDefenseSlotIds: ["shield_module", "none"],
    inventory: [],
  };
  state.armory.equippedPrimaryItemId = item.id;
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
  if (skipOnboarding || stage >= ONBOARDING_STAGE_COMPLETE) {
    return { loadout: true, economy: true, compendium: true };
  }
  if (stage >= ONBOARDING_STAGE_TRAINING_COMPLETE) {
    return { loadout: true, economy: false, compendium: true };
  }
  return { ...DEFAULT_SYSTEM_UNLOCKS };
}

function normalizeOnboardingState(parsed) {
  const explicitSkip = !!parsed.debugSkipOnboarding;
  let stage = Number.isFinite(parsed.onboardingStage) ? parsed.onboardingStage : null;
  if (stage === null) {
    // Existing pilots keep access; only fresh saves run onboarding.
    stage = (parsed.missionCount ?? 0) > 0 ? ONBOARDING_STAGE_COMPLETE : 0;
  }
  stage = Math.max(0, Math.min(ONBOARDING_STAGE_COMPLETE, Math.floor(stage)));
  parsed.onboardingStage = stage;
  parsed.debugSkipOnboarding = explicitSkip;
  const unlocks = buildSystemUnlocksForStage(stage, explicitSkip);
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
  return !isOnboardingSkipped() && state.onboardingStage < ONBOARDING_STAGE_TRAINING_COMPLETE;
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
  if (isOnboardingSkipped()) return true;
  return !!state.systemUnlocks?.[systemId];
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
let openUpgradeId = null;
let selectedInvestmentNode = null;
let enemyIdCounter = 1;
let armorySelectedSlotId = "primary";
let armoryPreviewItemId = null;
let armoryStatsExpanded = false;

const mobileAltIcons = {
  emp: "assets/SpaceShooterRedux/PNG/Power-ups/powerupBlue_bolt.png",
  bulwark: "assets/SpaceShooterRedux/PNG/Power-ups/powerupYellow_shield.png",
  cloak: "assets/SpaceShooterRedux/PNG/Power-ups/powerupBlue_shield.png",
};

const armoryFrameVisuals = {
  fundamentals: {
    icon: `${ASSET_ROOT}/Parts/gun03.png`,
    shipOverlay: `${ASSET_ROOT}/Parts/gun03.png`,
    accent: "#7dd3fc",
    hardpointName: "Cadet Driver",
  },
  area_control: {
    icon: `${ASSET_ROOT}/Parts/gun08.png`,
    shipOverlay: `${ASSET_ROOT}/Parts/gun08.png`,
    accent: "#f59e0b",
    hardpointName: "Plasma Scatter Array",
  },
  armor_break: {
    icon: `${ASSET_ROOT}/Parts/gun10.png`,
    shipOverlay: `${ASSET_ROOT}/Parts/gun10.png`,
    accent: "#facc15",
    hardpointName: "Breaker Rail",
  },
};

const defenseVisuals = {
  shield: {
    icon: `${ASSET_ROOT}/Power-ups/powerupBlue_shield.png`,
    name: "Shield Module",
    note: "Absorbs pressure and recovers between hits.",
  },
  armor: {
    icon: `${ASSET_ROOT}/Power-ups/shield_gold.png`,
    name: "Armor Module",
    note: "Trades speed for heavier kinetic protection.",
  },
  none: {
    icon: `${ASSET_ROOT}/UI/buttonBlue.png`,
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
    subtitle: "Barrier",
    description: "Standard shield projector. Gives the drone a forgiving buffer while learning patterns.",
    notes: "Reliable all-round defense. Best default pick if you want more margin for mistakes.",
    icon: `${ASSET_ROOT}/Power-ups/powerupBlue_shield.png`,
    tags: ["shield", "starter"],
    build: {
      shieldMaxLevel: 0,
      shieldRegenLevel: 0,
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
    icon: `${ASSET_ROOT}/Power-ups/shield_gold.png`,
    tags: ["armor", "starter"],
    build: {
      armorAmountLevel: 1,
      armorClass: 12,
      armorClassLevel: 0,
    },
  },
];

const defenseModulesById = Object.fromEntries(defenseModules.map((item) => [item.id, item]));

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
  return {
    version: catalog?.version || 1,
    entries,
    affixes,
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
      icon: mobileAltIcons[item.id] || `${ASSET_ROOT}/Power-ups/powerupBlue.png`,
      tags: ["aux", item.id],
      build: {},
    };
  });
  return { version: 1, entries, affixes: {} };
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

function getApplicableAffixes(slotType, baseBuild = {}) {
  const catalog = itemPoolCatalog || { affixes: {} };
  const normalizedSlot = normalizeArmorySlotType(slotType);
  const baseEffect = baseBuild.effect && baseBuild.effect !== "none" ? "weapon-effect" : null;
  return Object.entries(catalog.affixes || {})
    .map(([id, affix]) => ({ id, ...affix }))
    .filter((affix) => {
      const allowedSlots = Array.isArray(affix.slotTypes) ? affix.slotTypes : [];
      if (!allowedSlots.map(normalizeArmorySlotType).includes(normalizedSlot)) return false;
      if (baseEffect && affix.exclusiveGroup === baseEffect) return false;
      return true;
    });
}

function pickAffixesForItem(slotType, baseBuild, count) {
  const selected = [];
  const usedGroups = new Set();
  const candidates = getApplicableAffixes(slotType, baseBuild);
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

function createRolledItem(baseId, baseEntry, rarity) {
  const rarityConfig = getRarityConfig(rarity);
  const affixCount = rarityConfig.affixCount ?? 0;
  const build = cloneShipBuild(baseEntry.build || {});
  build.effectUpgrades = {
    ...cloneShipBuild(createDefaultShipBuild().effectUpgrades),
    ...cloneShipBuild(build.effectUpgrades || {}),
  };
  const affixes = pickAffixesForItem(baseEntry.slotType, build, affixCount);
  affixes.forEach((affix) => {
    applyBuildPatch(build, affix.build || {});
    applyBuildAdd(build, affix.buildAdd || {});
  });

  const affixNames = affixes.map((affix) => affix.name).filter(Boolean);
  const rarityLabel = rarityConfig.label;
  const name = `${rarityLabel} ${baseEntry.name}${affixNames.length ? ` - ${affixNames.join(", ")}` : ""}`;
  const value = randomIntInclusive(rarityConfig.valueRange[0], rarityConfig.valueRange[1]);
  const tags = Array.from(
    new Set([
      ...(Array.isArray(baseEntry.tags) ? baseEntry.tags : []),
      ...affixes.flatMap((affix) => (Array.isArray(affix.tags) ? affix.tags : [])),
      rarity,
    ])
  );

  return {
    id: generateItemInstanceId(),
    baseId,
    sourceId: baseEntry.sourceId || baseId,
    slotType: normalizeArmorySlotType(baseEntry.slotType),
    defenseType: baseEntry.defenseType || null,
    ability: baseEntry.ability || null,
    name,
    baseName: baseEntry.name,
    subtitle: baseEntry.subtitle || "",
    description: baseEntry.description || "",
    notes: baseEntry.notes || "",
    icon: baseEntry.icon || `${ASSET_ROOT}/Power-ups/powerupBlue.png`,
    tags,
    build,
    rarity,
    value,
    affixes: affixes.map((affix) => ({
      id: affix.id,
      name: affix.name,
      tags: Array.isArray(affix.tags) ? affix.tags : [],
    })),
  };
}

function rollItemForRarity(rarity) {
  const catalog = itemPoolCatalog || { entries: {} };
  const entries = Object.entries(catalog.entries || {}).filter(([, entry]) => {
    const slotType = normalizeArmorySlotType(entry.slotType);
    return ["primary", "defense", "aux"].includes(slotType);
  });
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
  const captainConfig = ECONOMY.dropSources.captain;
  if ((enemy.baseCredit || 0) >= captainConfig.minBaseCredit) return "captain";
  return "ordinary";
}

function rollSalvageDrop(enemy, { force = false, forceSource = null } = {}) {
  if (!itemPoolCatalog) return null;
  const sourceKey = forceSource || getDropSourceKey(enemy);
  const sourceConfig = ECONOMY.dropSources[sourceKey] || ECONOMY.dropSources.ordinary;
  const elite = missionHasEliteModifier();
  const chance = Math.min(
    1,
    (sourceConfig.chance ?? 0) + (elite && sourceKey !== "boss" ? ECONOMY.dropSources.eliteBonusChance : 0)
  );
  if (!force && Math.random() > chance) return null;
  const weights = elite && sourceKey !== "boss"
    ? shiftRarityWeightsUp(sourceConfig.rarityWeights)
    : sourceConfig.rarityWeights;
  const rarity = rollWeighted(weights);
  const item = rollItemForRarity(rarity);
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

function addItemsToArmoryInventory(items) {
  const inventory = getArmoryInventory(state);
  const existingIds = new Set(inventory.map((item) => item.id));
  items.forEach((item) => {
    if (!item?.id || existingIds.has(item.id)) return;
    inventory.push(cloneItem(item));
    existingIds.add(item.id);
  });
}

function createDefaultLedgerMarketState() {
  return {
    stock: [],
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
  targetState.ledgerMarket = {
    ...defaults,
    ...existing,
    stock: Array.isArray(existing.stock)
      ? existing.stock
          .filter((lot) => lot?.item?.id)
          .map((lot) => ({
            id: String(lot.id || generateItemInstanceId()),
            item: cloneItem(lot.item),
            price: Math.max(0, Math.round(Number(lot.price) || 0)),
            listValue: Math.max(0, Math.round(Number(lot.listValue) || getItemListValue(lot.item))),
            priceRate: Number.isFinite(lot.priceRate) ? lot.priceRate : ECONOMY.market.buyRate,
            clericalAdjustment: !!lot.clericalAdjustment,
          }))
      : [],
    stockMissionCount: Number.isFinite(existing.stockMissionCount)
      ? existing.stockMissionCount
      : defaults.stockMissionCount,
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
  return targetState.ledgerMarket;
}

function getLedgerMarketState(targetState = state) {
  return normalizeLedgerMarketState(targetState);
}

function getItemListValue(item) {
  if (Number.isFinite(item?.value)) return Math.max(0, Math.round(item.value));
  const rarityConfig = getRarityConfig(item?.rarity || "scrap");
  const [min, max] = rarityConfig.valueRange || [40, 80];
  return Math.round((min + max) / 2);
}

function pickDemandBulletinTag(previousTag = null) {
  const tags = ECONOMY.market.bulletinTags;
  if (!tags.length) return null;
  const candidates = tags.length > 1 ? tags.filter((entry) => entry.tag !== previousTag) : tags;
  const picked = candidates[Math.floor(Math.random() * candidates.length)];
  return picked ? { tag: picked.tag, label: picked.label } : null;
}

function refreshDemandBulletin({ force = false } = {}) {
  const ledger = getLedgerMarketState();
  const cadence = Math.max(1, ECONOMY.market.bulletinCadence || 3);
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
  let selected = ECONOMY.market.stockRarityProgression[0]?.weights || { scrap: 1 };
  ECONOMY.market.stockRarityProgression.forEach((entry) => {
    if (unlockedLevel >= entry.unlockedLevel) selected = entry.weights;
  });
  return selected;
}

function rollMarketItem() {
  const rarity = rollWeighted(getMarketRarityWeights());
  return rollItemForRarity(rarity);
}

function generateLedgerLotId(index) {
  const missionPart = String(state.missionCount || 0).padStart(3, "0");
  const lotPart = String(index + 1).padStart(2, "0");
  const suffix = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `L-${missionPart}-${lotPart}-${suffix}`;
}

function createLedgerLot(index, clericalAdjustment = false) {
  const item = rollMarketItem();
  if (!item) return null;
  const listValue = getItemListValue(item);
  let priceRate = ECONOMY.market.buyRate;
  if (clericalAdjustment) {
    const [min, max] = ECONOMY.market.mispricedValueRange;
    const profitableMax = Math.max(
      min,
      Math.min(max, ECONOMY.market.sellRate - (ECONOMY.market.mispricedMinProfitRate || 0))
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
  const mispricedIndex =
    Math.random() < ECONOMY.market.mispricedLotChance
      ? Math.floor(Math.random() * ECONOMY.market.stockLots)
      : -1;
  for (let i = 0; i < ECONOMY.market.stockLots; i += 1) {
    const lot = createLedgerLot(i, i === mispricedIndex);
    if (lot) lots.push(lot);
  }
  ledger.stock = lots;
  ledger.stockMissionCount = state.missionCount || 0;
  return ledger.stock;
}

async function ensureLedgerMarketReady() {
  await ensureItemPoolLoaded();
  refreshDemandBulletin();
  const ledger = getLedgerMarketState();
  if (ledger.stockMissionCount === null) {
    rollLedgerStock({ force: true });
    saveState();
  }
  return ledger;
}

function getItemSellQuote(item) {
  const listValue = getItemListValue(item);
  const handlingFee = Math.round(listValue * ECONOMY.market.handlingFeeRate);
  const basePayout = Math.max(0, listValue - handlingFee);
  const bulletin = getActiveDemandBulletin();
  const bulletinMatch = itemMatchesDemandBulletin(item, bulletin);
  const bulletinBonus = bulletinMatch
    ? Math.round(basePayout * ECONOMY.market.bulletinBonusRate)
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
  if (state.armory.equippedSupportItemId === itemId) return true;
  return Array.isArray(state.armory.equippedDefenseSlotIds)
    ? state.armory.equippedDefenseSlotIds.includes(itemId)
    : false;
}

function buyLedgerLot(lotId) {
  const ledger = getLedgerMarketState();
  const lotIndex = ledger.stock.findIndex((lot) => lot.id === lotId);
  if (lotIndex < 0) return;
  const lot = ledger.stock[lotIndex];
  if (state.credits < lot.price) return;
  state.credits -= lot.price;
  addItemsToArmoryInventory([lot.item]);
  ledger.stock.splice(lotIndex, 1);
  setLedgerReceipt({
    title: `Purchase ${lot.id}`,
    lines: [
      { label: "Item", text: lot.item.name },
      { label: "List value", amount: lot.listValue },
      {
        label: lot.clericalAdjustment
          ? `Lot price (${LEDGER_COPY.clericalAdjustment})`
          : "Lot price",
        amount: -lot.price,
        fee: true,
      },
      { label: "Credits paid", amount: -lot.price, total: true, fee: true },
    ],
  });
  activeLedgerMode = "claims";
  saveState();
  safeUpdateHangar();
}

function sellInventoryItem(itemId) {
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
  activeLedgerMode = "claims";
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
    ledger.consecutiveEarlyRecalls >= ECONOMY.market.earlyRecallAuditThreshold;
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
const devUiSkin = getAnyDevParam(["uiSkin", "skin", "buttonSkin", "buttons"]).toLowerCase();
const devGeneratedUiSkin = ["generated", "1", "true", "yes", "on"].includes(devUiSkin);
if (devGeneratedUiSkin) {
  document.body.classList.add("generated-ui-skin");
  document.body.dataset.uiSkin = "generated";
}
const state = loadState();
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
let mission = null;

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
  healthBarTimer: 0,
  fireCooldown: 0,
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
    generatedTealRift: loadImage(`${GENERATED_ROOT}/backgrounds_v1/teal_rift_native_1024.png`),
    generatedAmberDust: loadImage(`${GENERATED_ROOT}/backgrounds_v1/amber_dust_native_1024.png`),
    generatedAmberDustLooped: loadImage(`${GENERATED_ROOT}/backgrounds_v1/amber_dust_looped_1024.png`),
  },
  player: loadImage(`${ASSET_ROOT}/playerShip2_blue.png`),
  playerBullet: loadImage(`${ASSET_ROOT}/Lasers/laserBlue02.png`),
  spreadBullet: loadImage(`${ASSET_ROOT}/Lasers/laserGreen02.png`),
  altRocket: loadImage(`${ASSET_ROOT}/Lasers/laserGreen16.png`),
  altArc: loadImage(`${ASSET_ROOT}/Lasers/laserBlue16.png`),
  enemyBullet: loadImage(`${ASSET_ROOT}/Lasers/laserRed02.png`),
  shield: loadImage(`${ASSET_ROOT}/Effects/shield3.png`),
  salvagePod: loadImage(`${ASSET_ROOT}/Power-ups/powerupBlue.png`),
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
      playerBullet: loadImage(`${GENERATED_EFFECT_ROOT}/player_kinetic_bolt.png`),
      playerPlasma: loadImage(`${GENERATED_EFFECT_ROOT}/player_plasma_bolt.png`),
      playerPierce: loadImage(`${GENERATED_EFFECT_ROOT}/player_pierce_lance.png`),
      playerRocket: loadImage(`${GENERATED_EFFECT_ROOT}/player_rocket.png`),
      enemyBullet: loadImage(`${GENERATED_EFFECT_ROOT}/enemy_red_bolt.png`),
      enemyPurpleOrb: loadImage(`${GENERATED_EFFECT_ROOT}/enemy_purple_orb.png`),
      enemySpreadShard: loadImage(`${GENERATED_EFFECT_ROOT}/enemy_spread_shard.png`),
      enemyRadialEmber: loadImage(`${GENERATED_EFFECT_ROOT}/enemy_radial_ember.png`),
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
  return key ? assets.visualThemes?.[key] || null : null;
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
  { id: "overhaul_demo", label: "Overhaul Demo", test: true },
  { id: "patterns_demo", label: "Pattern Lab", test: true },
  { id: "ai_demo", label: "AI Lab", test: true },
  { id: "generated_sprite_lab", label: "Generated Sprite Lab", test: true },
  { id: "biological_hive_lab", label: "Biological Hive Lab", test: true },
  // Variant missions (Operations Center unlocks - not yet integrated)
  // { id: "level1_patrol", label: "Mission 1: Patrol Alpha" },
  // { id: "level2_skirmish", label: "Mission 2: Skirmish" },
];

// Variant naming convention: the Mission Select carousel will probe for these files.
// (No directory listing in a static webapp, so we try known suffixes.)
const VARIANT_SUFFIXES = ["_swarm", "_armored"];

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
let hangarNeedsRefresh = false;
let openShipNodeId = null;
let openMissionInfoBaseId = null;
let missionIntroActive = false;
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

function getMusicTrack(src) {
  if (!src) return null;
  if (musicLibrary.has(src)) return musicLibrary.get(src);
  const audio = new Audio(src);
  audio.preload = "auto";
  audio.loop = true;
  audio.volume = 0.22;
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
  const template = getEnemyCatalogEntry(templateKey)?.template;
  if (!template) return null;
  const merged = {
    type: typeId,
    ...template,
    ...localConfig,
    ...overrides,
  };
  delete merged.template;
  return merged;
}

function validateLevelData(level) {
  const errors = [];
  if (!level || typeof level !== "object") {
    return ["Mission package is not a valid object."];
  }
  const levelId = level.id || "unknown";
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
    if (debriefPanel && !debriefPanel.hidden) {
      if (returnBtn) returnBtn.click();
      return;
    }
    if (hangarPanel && !hangarPanel.hidden && activeHangarTab !== "hub") {
      setHangarTab("hub");
      return;
    }
  }
  if (event.key.toLowerCase() === "p" && mission && mission.active && !missionIntroActive) {
    paused = !paused;
  }
  if (event.key.toLowerCase() === "e" && mission && mission.active) {
    endMission({ ejected: true });
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

bindMobileButton(mobileEjectBtn, () => {
  if (mission && mission.active) {
    endMission({ ejected: true });
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
    renderDroneCompendium();
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
    if (activeHangarTab === "compendium") renderDroneCompendium();
  });
}
if (compendiumShowBosses) {
  compendiumShowBosses.addEventListener("change", () => {
    if (activeHangarTab === "compendium") renderDroneCompendium();
  });
}

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

if (shipModal) {
  shipModal.addEventListener("click", (event) => {
    if (event.target === shipModal) closeShipModal();
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && openShipNodeId) {
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

if (clearSlot1) {
  clearSlot1.addEventListener("click", () => {
    state.consumableSlots[0] = "none";
    saveState();
    safeUpdateHangar();
  });
}

if (clearSlot2) {
  clearSlot2.addEventListener("click", () => {
    state.consumableSlots[1] = "none";
    saveState();
    safeUpdateHangar();
  });
}

document.addEventListener("click", (event) => {
  if (!event.target.closest(".upgrade-node")) {
    if (openUpgradeId !== null) {
      openUpgradeId = null;
      safeUpdateHangar();
    }
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
    if (activeHangarTab === "compendium") renderDroneCompendium();
  });
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
    shouldAutoLaunchFreshPilotMission = true;
    return {
      credits: 0,
      lifetimeCredits: 0,
      missionCount: 0,
      lastMissionSummary: "N/A",
      unlockedLevels: 1,
      onboardingStage: 0,
      debugSkipOnboarding: false,
      systemUnlocks: { ...DEFAULT_SYSTEM_UNLOCKS },
      debugUnlock: false,
      debugInvincible: false,
      debugShowFullCompendium: false,
      encounteredEnemies: {},
      killsByEnemyKey: {},
      cargo: [],
      armory: {
        ownedLoadoutIds: ["fundamentals"],
        equippedLoadoutId: "fundamentals",
        equippedPrimaryItemId: null,
        ownedDefenseModuleIds: ["shield_module"],
        equippedDefenseSlotIds: ["shield_module", "none"],
        equippedSupportItemId: null,
        inventory: [],
      },
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
      },
      investments: {
        engineering: 0,
        operations: 0,
        shares: 0,
      },
      rmbWeapon: "cloak",
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
    };
    parsed.investments = {
      engineering: parsed.investments?.engineering ?? 0,
      operations: parsed.investments?.operations ?? 0,
      shares: parsed.investments?.shares ?? 0,
    };
    if (!parsed.rmbWeapon || parsed.rmbWeapon === "none") {
      parsed.rmbWeapon = "cloak";
    }
    parsed.unlockedLevels = parsed.unlockedLevels ?? 1;
    normalizeOnboardingState(parsed);
    parsed.debugUnlock = parsed.debugUnlock ?? false;
    parsed.debugInvincible = parsed.debugInvincible ?? false;
    parsed.debugShowFullCompendium = parsed.debugShowFullCompendium ?? false;
    parsed.encounteredEnemies = parsed.encounteredEnemies || {};
    parsed.killsByEnemyKey = parsed.killsByEnemyKey || {};
    parsed.cargo = Array.isArray(parsed.cargo) ? parsed.cargo : [];
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
    parsed.shipBuild.armorClass = parsed.shipBuild.armorClass ?? 10;
    parsed.shipBuild.armorAmountLevel = parsed.shipBuild.armorAmountLevel ?? 0;
    parsed.shipBuild.armorClassLevel = parsed.shipBuild.armorClassLevel ?? 0;
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
    shouldAutoLaunchFreshPilotMission = true;
    return {
      credits: 0,
      lifetimeCredits: 0,
      missionCount: 0,
      lastMissionSummary: "N/A",
      unlockedLevels: 1,
      onboardingStage: 0,
      debugSkipOnboarding: false,
      systemUnlocks: { ...DEFAULT_SYSTEM_UNLOCKS },
      debugUnlock: false,
      debugInvincible: false,
      debugShowFullCompendium: false,
      encounteredEnemies: {},
      killsByEnemyKey: {},
      cargo: [],
      armory: {
        ownedLoadoutIds: ["fundamentals"],
        equippedLoadoutId: "fundamentals",
        equippedPrimaryItemId: null,
        ownedDefenseModuleIds: ["shield_module"],
        equippedDefenseSlotIds: ["shield_module", "none"],
        equippedSupportItemId: null,
        inventory: [],
      },
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
      },
      investments: {
        engineering: 0,
        operations: 0,
        shares: 0,
      },
      rmbWeapon: "cloak",
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
  const level = state.upgrades[upgradeId];
  const base = upgrades.find((item) => item.id === upgradeId).baseCost;
  return Math.round(base * Math.pow(1.35, level));
}

function applyUpgrades() {
  const hullLevel = state.upgrades.hull;
  const auxCooldownLevel = state.upgrades.auxCooldown;
  const cloakDurationLevel = state.upgrades.cloakDuration;

  player.maxHull = Math.round(100 * (1 + hullLevel * 0.08));
  player.hull = player.maxHull;

  const build = getShipBuild();
  const defenseSlots = Array.isArray(build.defenseSlots) ? build.defenseSlots : ["shield", "none"];
  const shieldSlots = defenseSlots.filter((slot) => slot === "shield").length;
  const armorSlots = defenseSlots.filter((slot) => slot === "armor").length;

  const baseShieldPerSlot = 40;
  const shieldMaxMult = 1 + (build.shieldMaxLevel ?? 0) * 0.18;
  player.maxShield = shieldSlots > 0 ? Math.round(baseShieldPerSlot * shieldSlots * shieldMaxMult) : 0;
  player.shield = player.maxShield;
  const baseShieldRegen = 12;
  const shieldRegenMult = 1 + (build.shieldRegenLevel ?? 0) * 0.22;
  player.shieldRegen = shieldSlots > 0 ? baseShieldRegen * shieldSlots * shieldRegenMult : 0;
  player.shieldCooldown = 0;

  const baseArmorPerSlot = 80;
  const armorAmountMult = 1 + (build.armorAmountLevel ?? 0) * 0.18;
  player.maxArmor =
    armorSlots > 0 ? Math.round(baseArmorPerSlot * armorSlots * armorAmountMult) : 0;
  player.armor = player.maxArmor;
  const baseArmorClass = build.armorClass ?? 10;
  player.armorClass =
    armorSlots > 0 ? Math.round(baseArmorClass + (build.armorClassLevel ?? 0) * 2) : 0;

  player.spreadLevel = 0;
  player.altCooldownTime = Math.max(0.35, 0.9 * Math.pow(0.92, auxCooldownLevel));
  player.cloakDuration = 2.5 * (1 + cloakDurationLevel * 0.12);
  player.empDuration = 1.6 * (1 + cloakDurationLevel * 0.12);
  player.bulwarkDuration = 1.2 * (1 + cloakDurationLevel * 0.12);
  player.bulwarkShieldBonus = 200 * (1 + cloakDurationLevel * 0.1);
  player.cloakCooldownTime = Math.max(6, 10 * Math.pow(0.95, auxCooldownLevel));
  player.empCooldownTime = Math.max(5, 8 * Math.pow(0.95, auxCooldownLevel));
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
  }
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
    difficulty: 1 + state.missionCount * 0.15,
    level,
    eventIndex: 0,
    spawnQueue: [],
    bossAlive: false,
    bossSpawnTime: getBossSpawnTime(level),
    empTimer: 0,
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
  paused = false;
  setHangarMusic();
  setHangarTab("hub", { renderLevels: false });

  const grossBounty = creditRewardFor(mission);
  const recoveryRate = completed
    ? ECONOMY.recoveryBonusRate.min +
      Math.random() * (ECONOMY.recoveryBonusRate.max - ECONOMY.recoveryBonusRate.min)
    : 0;
  const recoveryBonus = completed ? Math.round(grossBounty * recoveryRate) : 0;
  const hullWritedown = completed || ejected
    ? 0
    : Math.round(grossBounty * ECONOMY.deathBountyWritedownRate);
  const bountyKept = grossBounty - hullWritedown;
  const subtotal = bountyKept + recoveryBonus;
  const dividends = calculateDividends(subtotal);
  const finalReward = subtotal + dividends;
  const cargoAtEnd = Array.isArray(state.cargo) ? state.cargo.map(cloneItem) : [];
  if (completed && !mission.bossSalvage?.length) {
    const fallbackBossDrop = rollSalvageDrop(
      { isBoss: true, baseCredit: 200, type: "boss", ai: "boss" },
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
  if (completed && mission.level?.id) {
    completedEntry = availableLevels.find((level) => level.id === mission.level.id);
    if (!completedEntry?.test) {
      const currentIndex = availableLevels.findIndex((level) => level.id === mission.level.id);
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
      { label: "Bounty", amount: summary.grossBounty },
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
            const sourceLabel =
              index >= identified.length - (summary.bossSalvageCount || 0)
                ? LEDGER_COPY.bossPod
                : `Cargo pod ${index + 1}`;
            return `
              <div class="salvage-item rarity-${rarity}" style="${getRarityStyle(rarity)}; --reveal-index: ${index}">
                <div class="salvage-item-icon">
                  <img src="${escapeHtml(item.icon || `${ASSET_ROOT}/Power-ups/powerupBlue.png`)}" alt="" />
                </div>
                <div>
                  <div class="salvage-item-kicker">${escapeHtml(sourceLabel)} identified</div>
                  <div class="salvage-item-name">${escapeHtml(item.name)}</div>
                  <div class="salvage-item-meta">${escapeHtml(getRarityLabel(rarity))} | ${formatCredits(item.value || 0)} | ${escapeHtml(affixes)}</div>
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
  if (debugSkipOnboarding) {
    debugSkipOnboarding.checked = !!state.debugSkipOnboarding;
  }
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
        "Select a mission profile. Each sortie increases in difficulty.";
    }
  }

  renderAuxTree();
  renderShipUpgradesPanel();
  renderConsumableLoadout();
  renderConsumableStore();
  renderLedgerMarket();
  renderInvestments();
  setLedgerMode(activeLedgerMode);
  if (activeHangarTab === "mission") {
    renderLevelSelect();
  }
  if (activeHangarTab === "compendium") {
    renderDroneCompendium();
  }
  if ((!mission || !mission.active) && hangarPanel && !hangarPanel.hidden) {
    setHangarMusic();
  }
  refreshHangarTabLocks();
  if (!getTabAvailability()[activeHangarTab]) {
    setHangarTab("hub", { renderLevels: activeHangarTab === "mission" });
    return;
  }
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

function renderInvestments() {
  if (!investmentTreeMap || !investmentTreeInspector) return;

  const branchKeys = Object.keys(investmentTreeBranches);
  const totalPurchased = branchKeys.reduce((sum, key) => sum + (state.investments[key] ?? 0), 0);
  const totalTiers = branchKeys.reduce((sum, key) => sum + investments[key].tiers.length, 0);
  const nodePositions = { root: { x: 50, y: 52 } };

  branchKeys.forEach((key) => {
    investmentTreeBranches[key].nodes.forEach((position, tierIndex) => {
      nodePositions[`${key}-${tierIndex}`] = position;
    });
  });

  normalizeSelectedInvestmentNode(branchKeys);

  if (economyTreeCredits) {
    setCountedNumber(economyTreeCredits, state.credits);
  }
  if (economyTreeProgress) {
    economyTreeProgress.textContent = `${totalPurchased}/${totalTiers}`;
  }

  if (investmentTreeLines) {
    investmentTreeLines.innerHTML = "";
    investmentTreeConnections.forEach(([fromId, toId]) => {
      const from = nodePositions[fromId];
      const to = nodePositions[toId];
      if (!from || !to) return;
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", from.x);
      line.setAttribute("y1", from.y);
      line.setAttribute("x2", to.x);
      line.setAttribute("y2", to.y);
      line.classList.add("economy-tree-link", getInvestmentNodeStatus(toId));
      investmentTreeLines.appendChild(line);
    });
  }

  investmentTreeMap.querySelectorAll(".investment-tree-node").forEach((node) => node.remove());

  const rootNode = document.createElement("div");
  rootNode.className = "investment-tree-node root purchased";
  rootNode.style.left = `${nodePositions.root.x}%`;
  rootNode.style.top = `${nodePositions.root.y}%`;
  rootNode.innerHTML = `
    <span class="investment-node-icon">✦</span>
    <span class="investment-node-tier">Fleet</span>
  `;
  investmentTreeMap.appendChild(rootNode);

  branchKeys.forEach((key) => {
    const branch = investmentTreeBranches[key];
    const currentTier = state.investments[key] ?? 0;
    const data = investments[key];
    branch.nodes.forEach((position, tierIndex) => {
      const tier = data.tiers[tierIndex];
      const nodeId = `${key}-${tierIndex}`;
      const purchased = tierIndex < currentTier;
      const available = tierIndex === currentTier;
      const affordable = available && state.credits >= tier.cost;
      const locked = tierIndex > currentTier;
      const selected =
        selectedInvestmentNode?.key === key && selectedInvestmentNode?.tierIndex === tierIndex;
      const node = document.createElement("button");
      node.type = "button";
      node.className = [
        "investment-tree-node",
        branch.accent,
        purchased ? "purchased" : "",
        available ? "available" : "",
        affordable ? "affordable" : "",
        locked ? "locked" : "",
        selected ? "selected" : "",
      ]
        .filter(Boolean)
        .join(" ");
      node.style.left = `${position.x}%`;
      node.style.top = `${position.y}%`;
      node.setAttribute("aria-pressed", selected ? "true" : "false");
      node.setAttribute(
        "aria-label",
        `${data.name} tier ${tierIndex + 1}: ${tier.benefit}`
      );
      node.dataset.investmentKey = key;
      node.dataset.tierIndex = tierIndex.toString();
      node.innerHTML = `
        <span class="investment-node-icon">${branch.icon}</span>
        <span class="investment-node-tier">${tierIndex + 1}</span>
        <span class="investment-node-cost">${tier.cost}</span>
      `;
      node.addEventListener("click", () => {
        selectedInvestmentNode = { key, tierIndex };
        renderInvestments();
      });
      investmentTreeMap.appendChild(node);
    });
  });

  renderInvestmentInspector();
}

function normalizeSelectedInvestmentNode(branchKeys = Object.keys(investmentTreeBranches)) {
  if (!selectedInvestmentNode || !investments[selectedInvestmentNode.key]) {
    const firstIncomplete = branchKeys.find(
      (key) => (state.investments[key] ?? 0) < investments[key].tiers.length
    );
    const key = firstIncomplete || branchKeys[0];
    selectedInvestmentNode = {
      key,
      tierIndex: Math.min(state.investments[key] ?? 0, investments[key].tiers.length - 1),
    };
    return;
  }

  const maxIndex = investments[selectedInvestmentNode.key].tiers.length - 1;
  selectedInvestmentNode.tierIndex = Math.max(0, Math.min(selectedInvestmentNode.tierIndex, maxIndex));
}

function getInvestmentNodeStatus(nodeId) {
  if (nodeId === "root") return "purchased";
  const [key, tierText] = nodeId.split("-");
  const tierIndex = Number(tierText);
  const currentTier = state.investments[key] ?? 0;
  if (tierIndex < currentTier) return "purchased";
  if (tierIndex === currentTier) {
    return state.credits >= investments[key].tiers[tierIndex].cost ? "affordable" : "available";
  }
  return "locked";
}

function renderInvestmentInspector() {
  if (!investmentTreeInspector) return;
  normalizeSelectedInvestmentNode();
  const { key, tierIndex } = selectedInvestmentNode;
  const data = investments[key];
  const branch = investmentTreeBranches[key];
  const tier = data.tiers[tierIndex];
  const currentTier = state.investments[key] ?? 0;
  const maxTier = data.tiers.length;
  const purchased = tierIndex < currentTier;
  const available = tierIndex === currentTier;
  const locked = tierIndex > currentTier;
  const affordable = available && state.credits >= tier.cost;
  const status = purchased
    ? "Installed"
    : locked
      ? `Requires Tier ${tierIndex}`
      : affordable
        ? "Ready to install"
        : "Not enough credits";
  const buttonLabel = purchased
    ? "Installed"
    : locked
      ? "Locked"
      : affordable
        ? "Purchase Node"
        : "Need Credits";

  investmentTreeInspector.className = `economy-tree-inspector ${branch.accent}`;
  investmentTreeInspector.innerHTML = `
    <div class="economy-inspector-kicker">${data.name}</div>
    <div class="economy-inspector-title">
      <span>${branch.icon}</span>
      <strong>Tier ${tierIndex + 1}/${maxTier}</strong>
    </div>
    <p>${branch.subtitle}</p>
    <div class="economy-inspector-benefit">${tier.benefit}</div>
    <div class="economy-inspector-stats">
      <span>Status</span><strong>${status}</strong>
      <span>Upgrade Cost</span><strong>${state.credits}/${tier.cost}</strong>
      <span>Track Progress</span><strong>${currentTier}/${maxTier}</strong>
    </div>
    <button type="button" class="invest-btn economy-tree-buy" ${affordable ? "" : "disabled"}>
      ${buttonLabel}
    </button>
  `;

  const buyButton = investmentTreeInspector.querySelector(".economy-tree-buy");
  if (buyButton && affordable) {
    buyButton.addEventListener("click", () => {
      handleInvestment(key);
      const nextTier = state.investments[key] ?? 0;
      selectedInvestmentNode = {
        key,
        tierIndex: Math.min(nextTier, maxTier - 1),
      };
      safeUpdateHangar();
    });
  }
}

function handleInvestment(key) {
  const tier = state.investments[key];
  const data = investments[key];
  if (tier >= data.tiers.length) return;
  
  const cost = data.tiers[tier].cost;
  if (state.credits < cost) return;
  
  state.credits -= cost;
  state.investments[key] += 1;
  saveState();
  safeUpdateHangar();
}

// Wire up investment buttons
if (engineeringInvest) {
  engineeringInvest.addEventListener("click", () => handleInvestment("engineering"));
}
if (operationsInvest) {
  operationsInvest.addEventListener("click", () => handleInvestment("operations"));
}
if (sharesInvest) {
  sharesInvest.addEventListener("click", () => handleInvestment("shares"));
}

function renderLevelSelect() {
  renderLevelSelectAsync();
}

function levelBackgroundUrl(levelMeta) {
  const bg = levelMeta?.background || "blue";
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
  const index = availableLevels.findIndex((level) => level.id === levelId);
  if (index <= 0) return "Unlocked";
  const requiredIndex = Math.max(1, index);
  return `Defeat Mission ${requiredIndex} to unlock.`;
}

function missionBaseIdFor(levelId) {
  if (!levelId) return levelId;
  for (const suf of VARIANT_SUFFIXES) {
    if (levelId.endsWith(suf)) return levelId.slice(0, -suf.length);
  }
  return levelId;
}

const missionVariantCache = new Map();
let missionVariantWarmupPromise = null;
let missionSelectRenderVersion = 0;

async function getMissionGroupIds(baseId) {
  const base = missionBaseIdFor(baseId);
  if (missionVariantCache.has(base)) {
    return [base, ...(missionVariantCache.get(base) || [])];
  }
  const variants = [];
  for (const suf of VARIANT_SUFFIXES) {
    const id = `${base}${suf}`;
    const meta = await loadLevelMetaStrict(id);
    if (meta) variants.push(id);
  }
  missionVariantCache.set(base, variants);
  return [base, ...variants];
}

async function warmMissionVariantCache() {
  if (missionVariantWarmupPromise) return missionVariantWarmupPromise;
  missionVariantWarmupPromise = (async () => {
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
  for (const level of availableLevels) {
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
  if (ai === "sentinel") return "Holds a firing line near the top and strafes to keep you in its sights.";
  if (ai === "skitter") return "Nervous skirmisher that attempts to dodge incoming fire.";
  if (ai === "duelist") return "Keeps a standoff distance and slides into flanking angles.";
  return "Steady descent with light drift.";
}

function describeWeapons(spec) {
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
    const baseIds = availableLevels.map((level) => level.id);
    const probeIds = [];
    baseIds.forEach((id) => {
      probeIds.push(id);
      VARIANT_SUFFIXES.forEach((suf) => probeIds.push(`${id}${suf}`));
    });
    const uniqueIds = Array.from(new Set(probeIds));
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

function renderDroneCompendium() {
  renderDroneCompendiumAsync();
}

async function renderDroneCompendiumAsync() {
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
}

const rmbWeapons = [
  {
    id: "cloak",
    name: "Cloaking Device",
    desc: "Break enemy lock-on and reposition.",
    unlockAt: 0,
    cost: 0,
  },
  {
    id: "emp",
    name: "EMP Burst",
    desc: "Disable enemy fire and slow ships briefly.",
    unlockAt: 350,
    cost: 250,
  },
  {
    id: "bulwark",
    name: "Bulwark Field",
    desc: "Temporary super-shield buffer.",
    unlockAt: 650,
    cost: 400,
  },
];

const weaponComponents = {
  barrel: [
    { id: "focused", name: "Focused", unlockAt: 0, cost: 0 },
    { id: "spread", name: "Spread", unlockAt: 250, cost: 180 },
  ],
  trigger: [
    { id: "rapid", name: "Rapid", unlockAt: 0, cost: 0 },
    { id: "burst", name: "Burst", unlockAt: 300, cost: 220 },
  ],
  mount: [
    { id: "front", name: "Front Mount", unlockAt: 0, cost: 0 },
    { id: "rear", name: "Rear Mount", unlockAt: 500, cost: 260 },
  ],
  payload: [
    { id: "kinetic", name: "Kinetic", unlockAt: 0, cost: 0 },
    { id: "plasma", name: "Plasma", unlockAt: 400, cost: 260 },
    { id: "emp", name: "EMP", unlockAt: 900, cost: 480 },
  ],
  modifier: [
    { id: "none", name: "None", unlockAt: 0, cost: 0 },
    { id: "pierce", name: "Pierce", unlockAt: 350, cost: 240 },
    { id: "homing", name: "Homing", unlockAt: 800, cost: 520 },
    { id: "vampiric", name: "Vampiric", unlockAt: 1200, cost: 720 },
  ],
};

const upgradeCategories = {
  primary: ["damage", "fireRate"],
  aux: ["auxCooldown", "cloakDuration"],
  ship: ["hull", "shield"],
};

const upgradeRequirements = {};

function renderComponentNodes(container, options, current, key) {
  if (!container) return;
  container.innerHTML = "";
  const credits = state.lifetimeCredits;
  const unlocked = state.unlocked?.[key] || {};
  options.forEach((option) => {
    const rankLocked = credits < option.unlockAt && !state.debugUnlock;
    const isUnlocked = state.debugUnlock || unlocked[option.id];
    const cost = option.cost ?? 0;
    const canPurchase = !rankLocked && !isUnlocked && state.credits >= cost;
    const button = document.createElement("button");
    button.className = "tree-node";
    if (option.id === current) {
      button.classList.add("active");
    }
    if (rankLocked || (!isUnlocked && !canPurchase)) {
      button.classList.add("locked");
    }
    button.disabled = rankLocked || (!isUnlocked && !canPurchase);
    let metaText = "Equip";
    if (rankLocked) {
      metaText = `Locked @ ${option.unlockAt}`;
    } else if (!isUnlocked) {
      metaText = `Unlock ${cost}/${state.credits}`;
    } else if (option.id === current) {
      metaText = "Equipped";
    } else {
      metaText = "Unlocked";
    }
    button.innerHTML = `
      <span class="node-title">${option.name}</span>
      <span class="node-meta">${metaText}</span>
    `;
    button.addEventListener("click", () => {
      if (rankLocked) return;
      if (!isUnlocked) {
        if (cost > 0 && state.credits < cost) return;
        state.credits -= cost;
        if (!state.unlocked[key]) state.unlocked[key] = {};
        state.unlocked[key][option.id] = true;
      }
      state.weapon[key] = option.id;
      saveState();
      safeUpdateHangar();
    });
    container.appendChild(button);
  });
}

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

function renderUpgradeNodes(container, upgradeIds) {
  if (!container) return;
  container.innerHTML = "";
  upgradeIds.forEach((upgradeId) => {
    const upgrade = upgrades.find((item) => item.id === upgradeId);
    if (!upgrade) return;
    const level = state.upgrades[upgradeId];
    const cost = upgradeCost(upgradeId);
    const maxLevel = upgrade.maxLevel ?? Infinity;
    const requirement = upgradeRequirements[upgradeId];
    const meetsRequirement = requirement ? requirement.test() : true;
    const canPurchase = meetsRequirement && level < maxLevel && state.credits >= cost;

    const node = document.createElement("div");
    node.className = "tree-node upgrade-node";
    node.tabIndex = 0;
    if (openUpgradeId === upgradeId) {
      node.classList.add("open");
    }
    if (!canPurchase || !meetsRequirement) {
      node.classList.add("locked");
    }

    const title = document.createElement("span");
    title.className = "node-title";
    title.textContent = `${upgrade.name} (Lv ${level})`;

    const meta = document.createElement("span");
    meta.className = "node-meta";
    if (level >= maxLevel) {
      meta.textContent = "Maxed";
    } else {
      meta.textContent = meetsRequirement ? "Upgrade available" : requirement?.label || "Locked";
    }

    const popover = document.createElement("div");
    popover.className = "node-popover";

    const desc = document.createElement("div");
    desc.className = "node-desc";
    desc.textContent = upgrade.desc;

    const costRow = document.createElement("div");
    costRow.className = "node-cost";
    if (level >= maxLevel) {
      costRow.textContent = "Maximum level reached";
    } else if (!meetsRequirement) {
      costRow.textContent = requirement?.label || "Locked";
    } else {
      costRow.textContent = `Cost: ${cost}/${state.credits}`;
    }

    popover.appendChild(desc);
    popover.appendChild(costRow);

    node.appendChild(title);
    node.appendChild(meta);
    node.appendChild(popover);
    node.addEventListener("click", (event) => {
      event.stopPropagation();
      openUpgradeId = upgradeId;
      if (canPurchase) {
        state.credits -= cost;
        state.upgrades[upgradeId] += 1;
        saveState();
      }
      safeUpdateHangar();
    });
    container.appendChild(node);
  });
}

function renderWeaponTree() {
  ensureComponentSelection("barrel", weaponComponents.barrel);
  ensureComponentSelection("trigger", weaponComponents.trigger);
  ensureComponentSelection("mount", weaponComponents.mount);
  ensureComponentSelection("payload", weaponComponents.payload);
  ensureComponentSelection("modifier", weaponComponents.modifier);
  renderComponentNodes(treeBarrel, weaponComponents.barrel, state.weapon.barrel, "barrel");
  renderComponentNodes(treeTrigger, weaponComponents.trigger, state.weapon.trigger, "trigger");
  renderComponentNodes(treeMount, weaponComponents.mount, state.weapon.mount, "mount");
  renderComponentNodes(treePayload, weaponComponents.payload, state.weapon.payload, "payload");
  renderComponentNodes(treeModifier, weaponComponents.modifier, state.weapon.modifier, "modifier");
}

function renderAuxTree() {
  if (!treeAuxSelect) return;
  ensureAuxSelection();
  treeAuxSelect.innerHTML = "";
  const credits = state.lifetimeCredits;
  const unlockedAux = state.unlocked?.aux || {};
  rmbWeapons.forEach((weapon) => {
    const rankLocked = credits < (weapon.unlockAt ?? 0) && !state.debugUnlock;
    const isUnlocked = state.debugUnlock || unlockedAux[weapon.id];
    const cost = weapon.cost ?? 0;
    const canPurchase = !rankLocked && !isUnlocked && state.credits >= cost;
    const button = document.createElement("button");
    button.className = "tree-node";
    if (state.rmbWeapon === weapon.id) {
      button.classList.add("active");
    }
    if (rankLocked || (!isUnlocked && !canPurchase)) {
      button.classList.add("locked");
    }
    button.disabled = rankLocked || (!isUnlocked && !canPurchase);
    let metaText = weapon.desc;
    if (rankLocked) {
      metaText = `Locked @ ${weapon.unlockAt ?? 0}`;
    } else if (!isUnlocked) {
      metaText = `Unlock ${cost}/${state.credits}`;
    } else if (state.rmbWeapon === weapon.id) {
      metaText = "Equipped";
    }
    button.innerHTML = `
      <span class="node-title">${weapon.name}</span>
      <span class="node-meta">${metaText}</span>
    `;
    button.addEventListener("click", () => {
      if (rankLocked) return;
      if (!isUnlocked) {
        if (cost > 0 && state.credits < cost) return;
        state.credits -= cost;
        if (!state.unlocked.aux) state.unlocked.aux = {};
        state.unlocked.aux[weapon.id] = true;
      }
      state.rmbWeapon = weapon.id;
      saveState();
      safeUpdateHangar();
    });
    treeAuxSelect.appendChild(button);
  });
}

function renderUpgradeTrees() {
  renderUpgradeNodes(treePrimaryUpgrades, upgradeCategories.primary);
  renderUpgradeNodes(treeAuxUpgrades, upgradeCategories.aux);
  renderUpgradeNodes(treeShipUpgrades, upgradeCategories.ship);
}

function shipPanelUpgradeCost(baseCost, level) {
  return Math.round(baseCost * Math.pow(1.45, level));
}

function formatNumber(value, decimals = 1) {
  if (!Number.isFinite(value)) return "-";
  return value.toFixed(decimals);
}

function renderShipStatsPanel() {
  if (!shipStats) return;
  const build = getShipBuild();
  const cfg = getPrimaryFireConfig();

  const shotsPerTrigger = cfg.spread === "focused" ? 1 : 5;
  const mount = state.weapon.mount || "front";
  const mountShots = mount === "rear" ? 2 : 1;
  const totalProjectiles = shotsPerTrigger * mountShots;

  const gunDiameter = build.gunDiameter || "medium";
  let diameterScale = 1;
  let diameterSpeedScale = 1;
  if (cfg.ammo === "plasma") {
    diameterScale = gunDiameter === "small" ? 1.05 : gunDiameter === "large" ? 2.2 : 1.45;
    diameterSpeedScale = gunDiameter === "small" ? 0.82 : gunDiameter === "large" ? 0.45 : 0.62;
  } else {
    diameterScale = gunDiameter === "small" ? 0.85 : gunDiameter === "large" ? 1.25 : 1;
    diameterSpeedScale = gunDiameter === "small" ? 1.12 : gunDiameter === "large" ? 0.9 : 1;
  }

  const sampleDamage = computePrimaryDamage({
    ammo: cfg.ammo,
    speed: cfg.bulletSpeed,
    radius: cfg.projectileRadius,
  });
  const dotDps = cfg.ammo === "plasma" ? sampleDamage * 0.45 : 0;
  const dotDuration = cfg.ammo === "plasma" ? 3 : 0;

  const explosive =
    cfg.effect === "explosive"
      ? {
          radius: 70 * (cfg.projectileRadius / 4) * (1 + (cfg.effectTune ?? 0) * 0.18),
          mult: 0.7,
        }
      : null;

  const pierce =
    cfg.effect === "pierce"
      ? { hits: 2 + (cfg.effectTune ?? 0) } // Total hits per projectile (baseline=1, pierce adds extra hits).
      : null;

  const homing =
    cfg.effect === "homing"
      ? {
          strength: 0.05 + (cfg.effectTune ?? 0) * 0.018,
          maxAngleDeg: ((0.6 + (cfg.effectTune ?? 0) * 0.14) * 180) / Math.PI,
        }
      : null;
  const vampiric =
    cfg.effect === "vampiric"
      ? {
          hullOnKill: 2 + (cfg.effectTune ?? 0) * 1.5,
        }
      : null;

  const hullLevel = state.upgrades?.hull ?? 0;
  const maxHull = Math.round(100 * (1 + hullLevel * 0.08));
  const defenseSlots = Array.isArray(build.defenseSlots) ? build.defenseSlots : ["shield", "none"];
  const shieldSlots = defenseSlots.filter((slot) => slot === "shield").length;
  const armorSlots = defenseSlots.filter((slot) => slot === "armor").length;
  const maxShield = shieldSlots > 0 ? player.maxShield : 0;
  const shieldRegen = shieldSlots > 0 ? player.shieldRegen : 0;
  const maxArmor = armorSlots > 0 ? player.maxArmor : 0;
  const armorClass = armorSlots > 0 ? player.armorClass : 0;

  const formula =
    cfg.ammo === "plasma"
      ? `Plasma dmg = 12 * (radius/4)`
      : `Kinetic dmg = 14 * (radius/4) * (speed/560)`;

  const rateNote =
    armorSlots > 0
      ? `Armor penalty: cooldown x${formatNumber(cfg.armorPenalty, 2)}`
      : "No armor penalty";

  const triggerRate = cfg.cooldown > 0 ? 1 / cfg.cooldown : 0;
  const projPerSecond = triggerRate * totalProjectiles;
  const sizeFactor = Math.max(0.05, cfg.projectileRadius / 4);
  const velFactor = Math.max(0.2, cfg.bulletSpeed / 560);
  const baseKinetic = 14;
  const basePlasma = 12;

  const statRow = (label, value, tip) => `
    <div class="stat-row" tabindex="0">
      <span class="stat-k">${label}</span>
      <span class="stat-v">${value}</span>
      <span class="stat-tip">${tip}</span>
    </div>
  `;

  const damageTip =
    cfg.ammo === "plasma"
      ? `Plasma hit dmg = ${basePlasma} base * ${formatNumber(sizeFactor, 2)} (radius/4) = ${formatNumber(sampleDamage, 1)}`
      : `Kinetic hit dmg = ${baseKinetic} base * ${formatNumber(sizeFactor, 2)} (radius/4) * ${formatNumber(velFactor, 2)} (speed/560) = ${formatNumber(sampleDamage, 1)}`;
  const dotTip =
    cfg.ammo === "plasma"
      ? `DoT DPS = hitDmg * 0.45 = ${formatNumber(sampleDamage, 1)} * 0.45 = ${formatNumber(dotDps, 1)} (for ${dotDuration}s)`
      : "Plasma only.";
  const cooldownTip = `Cooldown = 0.28s base * ${formatNumber(cfg.flowRateScale, 3)} (Flow Rate) * ${formatNumber(cfg.armorPenalty, 2)} (Armor penalty) * ${cfg.spread === "burst" ? "2.15 (Burst)" : cfg.spread === "wide" ? "1.15 (Wide)" : "1.00"} = ${formatNumber(cfg.cooldown, 2)}s`;
  const speedTip = `Speed = 560 base * ${formatNumber(diameterSpeedScale, 2)} (Gun diameter) * ${formatNumber(cfg.flowVelocityScale, 2)} (Velocity) = ${Math.round(cfg.bulletSpeed)} px/s`;
  const radiusTip = `Radius = 4 base * ${formatNumber(diameterScale, 2)} (Gun diameter) * ${formatNumber(cfg.flowSizeScale, 2)} (Size) * ${cfg.spread === "focused" ? "1.00" : "0.50 (micro-shots)"} = ${formatNumber(cfg.projectileRadius, 1)} px`;
  const rateTip = `${formatNumber(triggerRate, 2)} triggers/sec; ${totalProjectiles} proj/trigger => ${formatNumber(projPerSecond, 1)} proj/sec (theoretical)`;
  const explosiveTip = explosive
    ? `Explosion radius = 70 * (radius/4) * (1 + 0.18*tune)\n= 70 * ${formatNumber(sizeFactor, 2)} * (1 + 0.18*${cfg.effectTune ?? 0}) = ${Math.round(explosive.radius)}px.\nExplosion dmg = hitDmg * ${explosive.mult} (scaled by distance).`
    : "Not equipped.";
  const pierceTip = pierce
    ? `Total hits per projectile = 2 + tune = ${pierce.hits}. (Each projectile can damage up to ${pierce.hits} ships.)`
    : "Not equipped.";
  const homingTip = homing
    ? `Homing strength = 0.05 + 0.018*tune = ${formatNumber(homing.strength, 3)}.\nMax angle offset = ${(0.6 + (cfg.effectTune ?? 0) * 0.14).toFixed(2)} rad (±${Math.round(homing.maxAngleDeg)}deg).`
    : "Not equipped.";
  const vampiricTip = vampiric
    ? `Hull restored on kill = 2 + 1.5*tune = ${formatNumber(vampiric.hullOnKill, 1)}.`
    : "Not equipped.";

  const shieldTip =
    maxShield > 0
      ? `Max Shield = ${maxShield}. Regen = ${formatNumber(shieldRegen, 1)}/s.\nShield regen pauses briefly after shield damage.\nNote: collision damage bypasses shields.`
      : "No shield modules installed.";
  const armorTip =
    maxArmor > 0
      ? `Max Armor = ${maxArmor}. Armor Class (AC) = ${armorClass}.\nPlayer armor applies per-hit reduction: max(0, damage - AC).\nArmor modules also increase cooldown: x${formatNumber(cfg.armorPenalty, 2)}.`
      : "No armor modules installed.";

  shipStats.innerHTML = `
    <h3>Ship Stats</h3>
    <div class="stat-sections">
      <div class="stat-section">
        <div class="stat-section-title">Offense</div>
        ${statRow("Ammo", capitalize(cfg.ammo), `Current ammo source: ${capitalize(cfg.ammo)}.`)}
        ${statRow("Pattern", `${capitalize(cfg.spread)} (${totalProjectiles} proj)`, `Spread comes from the Gun module. Micro-shot patterns shrink radius.`)}
        ${statRow("Hit Damage", formatNumber(sampleDamage, 1), damageTip)}
        ${statRow("DoT DPS", dotDps ? formatNumber(dotDps, 1) : "-", dotTip)}
        ${statRow("Cooldown", `${formatNumber(cfg.cooldown, 2)}s`, cooldownTip)}
        ${statRow("Trigger Rate", `${formatNumber(triggerRate, 2)}/s`, rateTip)}
        ${statRow("Projectile Speed", `${Math.round(cfg.bulletSpeed)} px/s`, speedTip)}
        ${statRow("Projectile Radius", `${formatNumber(cfg.projectileRadius, 1)} px`, radiusTip)}
        ${statRow("Explosive", explosive ? `${Math.round(explosive.radius)}px` : "-", explosiveTip)}
        ${statRow("Pierce", pierce ? `${pierce.hits}` : "-", pierceTip)}
        ${statRow("Homing", homing ? `${Math.round(homing.maxAngleDeg)}deg` : "-", homingTip)}
        ${statRow("Vampiric", vampiric ? `${formatNumber(vampiric.hullOnKill, 1)}` : "-", vampiricTip)}
      </div>
      <div class="stat-section">
        <div class="stat-section-title">Defense</div>
        ${statRow("Hull", `${maxHull}`, `Max Hull = 100 * (1 + 0.08*Hull Lv) = ${maxHull}.`)}
        ${statRow("Shields", maxShield ? `${maxShield}` : "0", shieldTip)}
        ${statRow("Armor", maxArmor ? `${maxArmor}` : "0", armorTip)}
        ${statRow("Armor Class", armorClass ? `${armorClass}` : "-", armorTip)}
      </div>
    </div>
    <div class="stat-footnote">
      <span class="muted">${formula}. ${rateNote}. Enemy armor has a chip floor of max(1, hit damage * ${ECONOMY.minDamageFloor}).</span>
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
      icon: item?.icon || `${ASSET_ROOT}/Parts/gun04.png`,
      hardpointName: item?.name || "Module",
    }
  );
}

function getArmoryUnlockText(item, owned) {
  if (owned) return "Owned";
  if (Number.isFinite(item?.starterUnlockStage)) {
    return `Flight School ${item.starterUnlockStage + 1}`;
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

function getArmorySlotDefinitions() {
  const equippedWeapon = getEquippedStarterLoadout();
  const defenseSlotIds = getEquippedDefenseSlotIds();
  const defenseA = getDefenseArmoryItemById(defenseSlotIds[0]) || null;
  const defenseB = getDefenseArmoryItemById(defenseSlotIds[1]) || null;
  const support = getSelectedSupportModule();
  return [
    {
      id: "primary",
      label: "Primary Hardpoint",
      className: "armory-slot-primary",
      installedId: equippedWeapon?.id || null,
      name: equippedWeapon ? getArmoryFrameVisual(equippedWeapon).hardpointName : "Open Hardpoint",
      meta: equippedWeapon?.name || "No weapon linked",
      note: "Weapon modules change the projectile profile and hidden fire tuning.",
      icon: equippedWeapon ? getArmoryFrameVisual(equippedWeapon).icon : `${ASSET_ROOT}/UI/buttonBlue.png`,
    },
    {
      id: "defense-0",
      label: "Defense A",
      className: "armory-slot-defense-left",
      installedId: defenseSlotIds[0],
      name: defenseA?.name || "Open Bay",
      meta: "Shield or armor",
      note: defenseA?.description || "Install a defense module into this bay.",
      icon: defenseA?.icon || defenseVisuals.none.icon,
    },
    {
      id: "defense-1",
      label: "Defense B",
      className: "armory-slot-defense-right",
      installedId: defenseSlotIds[1],
      name: defenseB?.name || "Open Bay",
      meta: "Shield or armor",
      note: defenseB?.description || "Install a defense module into this bay.",
      icon: defenseB?.icon || defenseVisuals.none.icon,
    },
    {
      id: "support",
      label: "Support",
      className: "armory-slot-support",
      installedId: support?.id || null,
      name: support?.name || "No support linked",
      meta: "Pilot system",
      note: support?.description || "Install a support item for your alternate action.",
      icon: support?.icon || mobileAltIcons.cloak,
    },
  ];
}

function getArmoryItemsForSlot(slotId) {
  const inventory = getArmoryInventory();
  if (slotId === "primary") {
    const ownedIds = new Set(getOwnedStarterLoadoutIds());
    const starterItems = starterWeaponLoadouts.map((item) => ({
      ...item,
      slotType: "primary",
      icon: getArmoryFrameVisual(item).icon,
      owned: ownedIds.has(item.id),
      installed: !state.armory?.equippedPrimaryItemId && state.armory?.equippedLoadoutId === item.id,
    }));
    const lootItems = inventory
      .filter((item) => item.slotType === "primary")
      .map((item) => ({
        ...item,
        owned: true,
        installed: state.armory?.equippedPrimaryItemId === item.id,
      }));
    return [...starterItems, ...lootItems];
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
      description: "Leave this bay open if you want a lighter frame and faster cooldowns.",
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
    primary: {
      title: "Primary Hardpoint",
      copy: "Weapon frames from Flight School. Hover icons to compare, then click one to install it.",
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

function getArmoryPreviewItem(slotId) {
  const items = getArmoryItemsForSlot(slotId);
  const installed = items.find((item) => item.installed) || items[0] || null;
  if (!armoryPreviewItemId) return installed;
  return items.find((item) => item.id === armoryPreviewItemId) || installed;
}

function getInstalledArmoryItem(slotId) {
  return getArmoryItemsForSlot(slotId).find((item) => item.installed) || null;
}

function canInstallSupportItem(item) {
  if (!item) return false;
  if (item.owned || state.debugUnlock) return true;
  const rankOk = (state.lifetimeCredits ?? 0) >= (item.unlockAt ?? 0) || state.debugUnlock;
  return rankOk && state.credits >= (item.cost ?? 0);
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
    const rankOk = (state.lifetimeCredits ?? 0) >= (item.unlockAt ?? 0);
    if (!rankOk || state.credits < (item.cost ?? 0)) return;
    state.credits -= item.cost ?? 0;
    if (!state.unlocked.aux) state.unlocked.aux = {};
    state.unlocked.aux[item.id] = true;
  }
  state.rmbWeapon = item.id;
  if (state.armory) state.armory.equippedSupportItemId = null;
  state.shipBuild = composeShipBuildFromArmory(state);
  syncShipBuildToLegacy();
  saveState();
}

function handleArmorySlotInstall(slotId, itemId) {
  if (slotId === "primary") {
    if (starterWeaponLoadoutsById[itemId]) {
      equipStarterLoadout(itemId);
    } else {
      equipPrimaryInventoryItem(itemId);
    }
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
  const item = getArmoryPreviewItem(slotId) || getInstalledArmoryItem(slotId);
  if (!item) return;

  let statRows = "";
  if (slotId === "primary" && item.build) {
    const cfg = getPrimaryFireConfig(item.build);
    const hitDamage = computePrimaryDamage({
      ammo: cfg.ammo,
      speed: cfg.bulletSpeed,
      radius: cfg.projectileRadius,
    });
    statRows = `
      <div class="armory-inspector-stats">
        <div class="armory-stat"><span class="armory-stat-label">Damage</span><span class="armory-stat-value">${formatNumber(hitDamage, 1)}</span></div>
        <div class="armory-stat"><span class="armory-stat-label">Cooldown</span><span class="armory-stat-value">${formatNumber(cfg.cooldown, 2)}s</span></div>
      </div>
      <div class="armory-defenses">
        <span class="armory-defense">${capitalize(item.build.spread)} pattern</span>
        <span class="armory-defense">${capitalize(item.build.ammo)} ammo</span>
      </div>
    `;
  } else if (slotId.startsWith("defense-")) {
    statRows = `
      <div class="armory-inspector-stats">
        <div class="armory-stat"><span class="armory-stat-label">Type</span><span class="armory-stat-value">${item.id === "none" ? "Empty" : capitalize(item.defenseType)}</span></div>
        <div class="armory-stat"><span class="armory-stat-label">Effect</span><span class="armory-stat-value">${item.id === "none" ? "Clear" : item.defenseType === "shield" ? "Shielding" : "Armor"}</span></div>
      </div>
    `;
  } else {
    statRows = `
      <div class="armory-inspector-stats">
        <div class="armory-stat"><span class="armory-stat-label">Status</span><span class="armory-stat-value">${item.installed ? "Installed" : item.owned ? "Owned" : "Locked"}</span></div>
      </div>
    `;
  }
  const statusLabel = armoryPreviewItemId
    ? item.installed
      ? "Installed"
      : "Preview"
    : item.installed
      ? "Installed"
      : item.owned
        ? "Owned"
        : getArmoryUnlockText(item, false);
  const rarityMeta = item.rarity
    ? `<span class="armory-defense" style="${getRarityStyle(item.rarity)}">${getRarityLabel(item.rarity)}</span>`
    : "";
  const valueMeta = Number.isFinite(item.value)
    ? `<span class="armory-defense">${formatCredits(item.value)}</span>`
    : "";
  const affixMeta = Array.isArray(item.affixes) && item.affixes.length
    ? item.affixes
        .map((affix) => `<span class="armory-defense">${escapeHtml(affix.name || affix.id)}</span>`)
        .join("")
    : "";
  armoryInspector.innerHTML = `
    <div class="armory-inspector-head">
      <div class="armory-inspector-title">
        <p class="armory-kicker">${slotId === "primary" ? "Primary Hardpoint" : slotId === "support" ? "Support Link" : slotId === "defense-0" ? "Defense Bay A" : "Defense Bay B"}</p>
        <h3>${item.name}</h3>
        <p class="muted">${item.subtitle || getArmoryUnlockText(item, !!item.owned)}</p>
      </div>
      <span class="armory-chip">${statusLabel}</span>
    </div>
    <p class="armory-summary">${item.description}</p>
    ${rarityMeta || valueMeta || affixMeta ? `<div class="armory-defenses">${rarityMeta}${valueMeta}${affixMeta}</div>` : ""}
    ${statRows}
  `;
}

function renderShipUpgradesPanel() {
  const equipped = getEquippedStarterLoadout();
  if (!equipped) return;
  if (!["primary", "defense-0", "defense-1", "support"].includes(armorySelectedSlotId)) {
    armorySelectedSlotId = "primary";
  }

  renderShipStatsPanel();
  const slotDefs = getArmorySlotDefinitions();
  if (armoryBench) {
    armoryBench.innerHTML = `
      <div class="armory-drone">
        <img class="armory-ship-base" src="${ASSET_ROOT}/playerShip2_blue.png" alt="" aria-hidden="true" />
        ${slotDefs
          .map(
            (slot) => `
          <button
            type="button"
            class="armory-slot ${slot.className} is-clickable${armorySelectedSlotId === slot.id ? " is-selected" : ""}"
            data-armory-slot="${slot.id}"
          >
            <span class="armory-slot-label">${slot.label}</span>
            <span class="armory-slot-head">
              <img class="armory-slot-icon" src="${slot.icon}" alt="" />
              <span class="armory-slot-copy">
                <span class="armory-slot-name">${slot.name}</span>
                <span class="armory-slot-meta">${slot.meta}</span>
              </span>
              <span class="armory-slot-pill">${slot.installedId && slot.installedId !== "none" ? "Installed" : "Open"}</span>
            </span>
          </button>
        `
          )
          .join("")}
      </div>
    `;
    armoryBench.querySelectorAll("[data-armory-slot]").forEach((slotButton) => {
      const slotId = slotButton.dataset.armorySlot || null;
      slotButton.addEventListener("click", () => {
        armorySelectedSlotId = slotId;
        armoryPreviewItemId = null;
        safeUpdateHangar();
      });
    });
  }

  const rackMeta = getArmorySlotMeta(armorySelectedSlotId);
  if (armoryRackTitle) armoryRackTitle.textContent = rackMeta.title;
  if (armoryRackCopy) armoryRackCopy.textContent = rackMeta.copy;
  if (armoryRackTip) armoryRackTip.textContent = rackMeta.tip;
  renderArmoryInspector(armorySelectedSlotId);
  if (armoryToggleStats) {
    armoryToggleStats.textContent = armoryStatsExpanded ? "Hide Stats" : "Show Stats";
    armoryToggleStats.onclick = () => {
      armoryStatsExpanded = !armoryStatsExpanded;
      if (shipStats) shipStats.hidden = !armoryStatsExpanded;
      armoryToggleStats.textContent = armoryStatsExpanded ? "Hide Stats" : "Show Stats";
    };
  }
  if (shipStats) {
    shipStats.hidden = !armoryStatsExpanded;
  }

  if (!weaponInventory) return;
  weaponInventory.innerHTML = "";
  const inventoryItems = getArmoryItemsForSlot(armorySelectedSlotId);

  inventoryItems.forEach((item) => {
    const button = document.createElement("button");
    const canInstall =
      armorySelectedSlotId === "support"
        ? canInstallSupportItem(item)
        : !!item.owned;
    button.type = "button";
    button.className = `armory-inventory-item${item.installed ? " is-installed" : ""}${canInstall ? "" : " is-locked"}${armoryPreviewItemId === item.id ? " is-preview" : ""}${item.rarity ? ` rarity-${item.rarity}` : ""}`;
    if (item.rarity) {
      button.setAttribute("style", getRarityStyle(item.rarity));
    }
    button.innerHTML = `
      <span class="armory-inventory-icon"><img src="${item.icon}" alt="" /></span>
      <span class="armory-inventory-name">${item.name}</span>
    `;
    button.addEventListener("mouseenter", () => {
      armoryPreviewItemId = item.id;
      renderArmoryInspector(armorySelectedSlotId);
    });
    button.addEventListener("mouseleave", () => {
      armoryPreviewItemId = null;
      renderArmoryInspector(armorySelectedSlotId);
    });
    button.addEventListener("focus", () => {
      armoryPreviewItemId = item.id;
      renderArmoryInspector(armorySelectedSlotId);
    });
    button.addEventListener("blur", () => {
      armoryPreviewItemId = null;
      renderArmoryInspector(armorySelectedSlotId);
    });
    button.addEventListener("click", () => {
      armoryPreviewItemId = item.id;
      if (item.installed) {
        renderArmoryInspector(armorySelectedSlotId);
        return;
      }
      if (armorySelectedSlotId === "support" && !canInstallSupportItem(item)) {
        renderArmoryInspector(armorySelectedSlotId);
        return;
      }
      if (armorySelectedSlotId !== "support" && !item.owned) {
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

function renderConsumableStore() {
  if (!consumableStore) return;
  consumableStore.innerHTML = "";
  consumables.forEach((item) => {
    const unlocked = isConsumableUnlocked(item);
    const owned = state.consumablesOwned[item.id] ?? 0;
    const canAfford = state.credits >= item.cost;

    const entry = document.createElement("div");
    entry.className = "upgrade-item";
    if (!unlocked) {
      entry.classList.add("locked");
    }

    const meta = document.createElement("div");
    meta.className = "meta";
    const unlockNote =
      !unlocked && item.unlockTier
        ? `<span class="desc">Requires Engineering Tier ${item.unlockTier}</span>`
        : "";
    meta.innerHTML = `
      <span class="name">${item.name}</span>
      <span class="desc">${item.desc}</span>
      ${unlockNote}
      <span class="cost">Cost: ${item.cost} | Owned: ${owned}</span>
    `;

    const button = document.createElement("button");
    if (!unlocked) {
      button.textContent = "Locked";
      button.disabled = true;
    } else {
      button.textContent = canAfford ? "Buy" : "Insufficient";
      button.disabled = !canAfford;
      button.addEventListener("click", () => {
        if (state.credits < item.cost) return;
        state.credits -= item.cost;
        state.consumablesOwned[item.id] = (state.consumablesOwned[item.id] ?? 0) + 1;
        saveState();
        safeUpdateHangar();
      });
    }

    entry.appendChild(meta);
    entry.appendChild(button);
    consumableStore.appendChild(entry);
  });
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
  const nextRefresh = Math.max(1, ECONOMY.market.bulletinCadence - missionsSince);
  ledgerBulletin.innerHTML = `
    <span class="ledger-bulletin-kicker">${LEDGER_COPY.demandBulletin}</span>
    <strong>${escapeHtml(bulletin.label)}</strong>
    <span>+${Math.round(ECONOMY.market.bulletinBonusRate * 100)}% sale payout | refresh in ${nextRefresh} mission${nextRefresh === 1 ? "" : "s"}</span>
  `;
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
    const tags = Array.isArray(item.tags) ? item.tags.slice(0, 4) : [];
    const entry = document.createElement("div");
    entry.className = `ledger-market-item rarity-${rarity}`;
    entry.setAttribute("style", getRarityStyle(rarity));
    entry.innerHTML = `
      <div class="ledger-item-icon">
        <img src="${escapeHtml(item.icon || `${ASSET_ROOT}/Power-ups/powerupBlue.png`)}" alt="" />
      </div>
      <div class="ledger-item-main">
        <div class="ledger-item-kicker">${escapeHtml(lot.id)}${lot.clericalAdjustment ? ` - ${LEDGER_COPY.clericalAdjustment}` : ""}</div>
        <div class="ledger-item-name">${escapeHtml(item.name)}</div>
        <div class="ledger-item-meta">${escapeHtml(getRarityLabel(rarity))} | List ${formatCredits(lot.listValue)} | Ask ${formatCredits(lot.price)}</div>
        <div class="ledger-item-tags">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
      </div>
      <button type="button" class="small" ${canAfford ? "" : "disabled"}>${canAfford ? "Buy" : "Need Credits"}</button>
    `;
    const button = entry.querySelector("button");
    button?.addEventListener("click", () => buyLedgerLot(lot.id));
    ledgerStockList.appendChild(entry);
  });
}

function renderLedgerInventory(ledger) {
  if (!ledgerInventoryList) return;
  const inventory = getArmoryInventory(state);
  ledgerInventoryList.innerHTML = "";
  if (!inventory.length) {
    ledgerInventoryList.innerHTML = `<div class="ledger-empty">${LEDGER_COPY.sellEmpty}</div>`;
    return;
  }
  inventory.forEach((item) => {
    const rarity = item.rarity || "scrap";
    const quote = getItemSellQuote(item);
    const bulletinLabel = quote.bulletinMatch
      ? ` | ${LEDGER_COPY.demandBonus} +${formatCredits(quote.bulletinBonus)}`
      : "";
    const installed = isInventoryItemInstalled(item.id);
    const tags = Array.isArray(item.tags) ? item.tags.slice(0, 4) : [];
    const entry = document.createElement("div");
    entry.className = `ledger-market-item rarity-${rarity}`;
    entry.setAttribute("style", getRarityStyle(rarity));
    entry.innerHTML = `
      <div class="ledger-item-icon">
        <img src="${escapeHtml(item.icon || `${ASSET_ROOT}/Power-ups/powerupBlue.png`)}" alt="" />
      </div>
      <div class="ledger-item-main">
        <div class="ledger-item-kicker">${escapeHtml(getRarityLabel(rarity))}${installed ? " | Installed" : ""}</div>
        <div class="ledger-item-name">${escapeHtml(item.name)}</div>
        <div class="ledger-item-meta">List ${formatCredits(quote.listValue)} | Fee ${formatCredits(quote.handlingFee)} | Pays ${formatCredits(quote.payout)}${bulletinLabel}</div>
        <div class="ledger-item-tags">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
      </div>
      <button type="button" class="small">Sell</button>
    `;
    const button = entry.querySelector("button");
    button?.addEventListener("click", () => sellInventoryItem(item.id));
    ledgerInventoryList.appendChild(entry);
  });
}

async function renderLedgerMarketAsync() {
  if (!ledgerBulletin && !ledgerStockList && !ledgerInventoryList && !ledgerReceipt) return;
  if (ledgerStockList) ledgerStockList.innerHTML = `<div class="ledger-empty">Loading market lots...</div>`;
  const ledger = await ensureLedgerMarketReady();
  renderLedgerBulletinPanel(ledger);
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

function renderConsumableLoadout() {
  if (!consumableEquipList) return;
  const slotIds = state.consumableSlots || ["none", "none"];
  const slotLabels = slotIds.map((slotId) => {
    if (!slotId || slotId === "none") return "Empty";
    return consumablesById[slotId]?.name || "Unknown";
  });

  if (consumableSlot1) consumableSlot1.textContent = slotLabels[0];
  if (consumableSlot2) consumableSlot2.textContent = slotLabels[1];
  if (clearSlot1) clearSlot1.disabled = slotIds[0] === "none";
  if (clearSlot2) clearSlot2.disabled = slotIds[1] === "none";

  consumableEquipList.innerHTML = "";
  consumables.forEach((item) => {
    const unlocked = isConsumableUnlocked(item);
    const owned = state.consumablesOwned[item.id] ?? 0;
    const slot1Active = slotIds[0] === item.id;
    const slot2Active = slotIds[1] === item.id;

    const entry = document.createElement("div");
    entry.className = "upgrade-item";
    if (!unlocked) {
      entry.classList.add("locked");
    }
    if (slot1Active || slot2Active) {
      entry.classList.add("active");
    }

    const meta = document.createElement("div");
    meta.className = "meta";
    const unlockNote =
      !unlocked && item.unlockTier
        ? `<span class="desc">Requires Engineering Tier ${item.unlockTier}</span>`
        : "";
    meta.innerHTML = `
      <span class="name">${item.name}</span>
      <span class="desc">${item.desc}</span>
      ${unlockNote}
      <span class="cost">Owned: ${owned} | Uses/mission: ${item.usesPerMission}</span>
    `;

    const actions = document.createElement("div");
    actions.className = "consumable-actions";

    const slot1Btn = document.createElement("button");
    slot1Btn.className = "ghost small";
    slot1Btn.textContent = slot1Active ? "Slot 1 (eq)" : "Slot 1";
    slot1Btn.disabled = !unlocked;
    slot1Btn.addEventListener("click", () => {
      if (!unlocked) return;
      state.consumableSlots[0] = item.id;
      saveState();
      safeUpdateHangar();
    });

    const slot2Btn = document.createElement("button");
    slot2Btn.className = "ghost small";
    slot2Btn.textContent = slot2Active ? "Slot 2 (eq)" : "Slot 2";
    slot2Btn.disabled = !unlocked;
    slot2Btn.addEventListener("click", () => {
      if (!unlocked) return;
      state.consumableSlots[1] = item.id;
      saveState();
      safeUpdateHangar();
    });

    actions.appendChild(slot1Btn);
    actions.appendChild(slot2Btn);
    entry.appendChild(meta);
    entry.appendChild(actions);
    consumableEquipList.appendChild(entry);
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
    strafeDir: Math.random() < 0.5 ? -1 : 1,
    fireRate: spec.fireRate ?? 2.2,
    fireCooldown: Math.random() * (spec.fireRate ?? 2.2),
    fireMode: spec.fireMode || "aim",
    bulletSpeed: spec.bulletSpeed,
    bulletDamage: spec.bulletDamage,
    collisionDamage: spec.collisionDamage,
    damageScale: spec.damageScale ?? 1,
    aggroRadius: spec.aggroRadius,
    bulletStyle: spec.bulletStyle,
    patternTime: 0,
    dotTimer: 0,
    dotDps: 0,
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
  if (cargo.length >= ECONOMY.cargoSize) {
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

function handleSalvagePodCollisions() {
  if (!mission?.active) return;
  for (let i = salvagePods.length - 1; i >= 0; i -= 1) {
    const pod = salvagePods[i];
    if (pod.rejected) continue;
    if (distance(player.x, player.y, pod.x, pod.y) < player.radius + pod.radius) {
      if (collectSalvagePod(pod)) {
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

function getPrimaryFireConfig(buildOverride = null) {
  const build = buildOverride || getShipBuild();
  const baseSpeed = 560;
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
  const armorPenalty = 1 + armorSlots * 0.18;

  const microScale = spread === "focused" ? 1 : 0.5;
  const projectileRadius = 4 * diameterScale * flowSizeScale * microScale;
  const bulletSpeed = baseSpeed * diameterSpeedScale * flowVelocityScale;

  let cooldown = baseCooldown * armorPenalty * flowRateScale;
  if (spread === "burst") cooldown *= 2.15; // 5 shots at once
  if (spread === "wide") cooldown *= 1.15; // still 5 shots, but meant to be spammy
  cooldown = Math.max(0.08, cooldown);

  const jitter = spread === "burst" ? (5 * Math.PI) / 180 : 0;
  const angles =
    spread === "wide"
      ? [-0.35, -0.175, 0, 0.175, 0.35]
      : spread === "focused"
        ? [0]
        : [0, 0, 0, 0, 0]; // burst: all centered, jitter handles variation

  return {
    ammo,
    effect,
    effectTune: build.effectUpgrades?.[effect] ?? 0,
    spread,
    bulletSpeed,
    projectileRadius,
    cooldown,
    jitter,
    angles,
    armorPenalty,
    flowRateScale,
    flowVelocityScale,
    flowSizeScale,
  };
}

function computePrimaryDamage({ ammo, speed, radius }) {
  const sizeFactor = Math.max(0.05, radius / 4);
  const velFactor = Math.max(0.2, speed / 560);
  const baseKinetic = 14;
  const basePlasma = 12;
  let damage =
    ammo === "plasma" ? basePlasma * sizeFactor : baseKinetic * sizeFactor * velFactor;
  damage *= player.damageBoostMult || 1;
  return damage;
}

function firePlayerBullet() {
  const cfg = getPrimaryFireConfig();
  const mount = state.weapon.mount || "front";
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
      damage: computePrimaryDamage({ ammo: cfg.ammo, speed, radius }),
      image: extra.image || image,
      width: extra.width ?? Math.max(6, 10 * (radius / 4)),
      height: extra.height ?? Math.max(14, 32 * (radius / 4)),
      rotation: Math.atan2(vy, vx) + Math.PI / 2,
      baseSpeed: speed,
      originAngle: Math.atan2(vy, vx),
      homingMaxOffset: 0.6,
      homingStrength: 0.05,
      payload: cfg.ammo,
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
      bullet.vampiric = 2 + tune * 1.5;
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
      // Slight position shuffle so micro-shots don't perfectly overlap.
      const posJitter = cfg.spread === "focused" ? 0 : (Math.random() - 0.5) * 6;
      spawnBullet(vx, vy, {
        x: player.x + posJitter,
        y: player.y - player.radius,
        radius,
        width: Math.max(6, 10 * sizeScale),
        height: Math.max(14, 32 * sizeScale),
        damageScale: mountScale,
      });
      // Apply mount scale by scaling damage post-compute.
      bullets[bullets.length - 1].damage *= mountScale;
      if (cfg.spread !== "focused") {
        bullets[bullets.length - 1].rotation += (index - 2) * 0.01;
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

function fireAltWeapon() {
  if (state.rmbWeapon === "none") return;
  if (state.rmbWeapon === "cloak") {
    playSfx("cloak", 0.35);
    player.cloakTimer = player.cloakDuration;
  } else if (state.rmbWeapon === "emp") {
    playSfx("emp", 0.4);
    mission.empTimer = player.empDuration;
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
    const shieldGain = player.maxShield * 0.65;
    const hullGain = player.maxHull * 0.18;
    player.shield = Math.min(player.maxShield, player.shield + shieldGain);
    player.hull = Math.min(player.maxHull, player.hull + hullGain);
    playSfx("boost", 0.35);
  } else if (slotId === "overcharge") {
    player.damageBoostMult = Math.max(player.damageBoostMult, 1.4);
    player.damageBoostTimer = item.duration ?? 6;
    playSfx("boost", 0.4);
  }
}

function fireEnemyBullet(enemy, angleOverride, speedOverride) {
  const cloaked = player.cloakTimer > 0;
  const fallbackAngle = Math.random() * Math.PI * 2;
  const angle =
    angleOverride ??
    (cloaked && enemy.fireMode === "aim"
      ? fallbackAngle
      : Math.atan2(player.y - enemy.y, player.x - enemy.x));
  const speed =
    speedOverride ?? enemy.bulletSpeed ?? 200 + mission.difficulty * 15;
  const baseDamage = enemy.bulletDamage ?? (14 + mission.difficulty * 1.3);
  const damage = baseDamage * (enemy.damageScale ?? 1);

  const style = enemy.bulletStyle || getEnemyBulletStyle(enemy);
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
    age: 0,
    animation: style.animation || "bolt",
    spinRate: style.spinRate || 0,
  });
}

function fireEnemySpread(enemy, count = 5, spread = 0.6) {
  const cloaked = player.cloakTimer > 0;
  const base = cloaked
    ? Math.random() * Math.PI * 2
    : Math.atan2(player.y - enemy.y, player.x - enemy.x);
  const start = base - spread / 2;
  const step = spread / Math.max(1, count - 1);
  for (let i = 0; i < count; i += 1) {
    const angle = start + step * i;
    fireEnemyBullet(enemy, angle);
  }
}

function fireEnemyRadial(enemy, count = 16) {
  const step = (Math.PI * 2) / count;
  for (let i = 0; i < count; i += 1) {
    const angle = i * step;
    const speed =
      (enemy.bulletSpeed ?? 160) * (0.8 + Math.random() * 0.6);
    fireEnemyBullet(enemy, angle, speed);
  }
}

function getEnemyBulletStyle(enemy) {
  const visualTheme = getLevelVisualTheme();
  if (enemy.fireMode === "radial") {
    if (visualTheme?.enemyRadialEmber) {
      const size = visualTheme.enemyRadialEmberSize || 24;
      return { image: visualTheme.enemyRadialEmber, width: size, height: size, animation: "ember", spinRate: 5.8 };
    }
    return { shape: "orb", color: "#f97316", radius: 6, animation: "orb" };
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
  const dying = mission.deathTimer > 0;
  if (dying) {
    mission.deathTimer = Math.max(0, mission.deathTimer - delta);
  }
  mission.spawnTimer -= delta;
  mission.enemyFireTimer -= delta;
  mission.difficulty = 1 + state.missionCount * 0.15 + mission.elapsed / 22;
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

  if (!dying) {
    if (mission.level) {
      scheduleLevelSpawns();
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
  if (!dying) {
    enemies.forEach((enemy) => {
      if (!enemy.empImmune && (globalEmp || enemy.empHitTimer > 0)) return;
      enemy.fireCooldown -= delta;
      if (enemy.fireCooldown > 0) return;
      if (enemy.y < 40) return;
      if (enemy.isBoss || enemy.y < canvas.height * 0.75) {
        if (enemy.fireMode === "spread") {
          fireEnemySpread(enemy, enemy.fireCount || 5, enemy.fireSpread || 0.8);
        } else if (enemy.fireMode === "radial") {
          fireEnemyRadial(enemy, enemy.fireCount || 18);
        } else {
          fireEnemyBullet(enemy);
        }
        enemy.fireCooldown = Math.max(0.4, enemy.fireRate * 0.95);
      }
    });
  }

  const width = canvas.width / window.devicePixelRatio;
  const height = canvas.height / window.devicePixelRatio;

  if (!dying) {
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

    const primaryConfig = getPrimaryFireConfig();
    player.fireCooldown -= delta;
    player.altCooldown -= delta;
    if ((pointerButtons.left || devAutoFire) && player.fireCooldown <= 0) {
      firePlayerBullet();
      player.fireCooldown = primaryConfig.cooldown;
    }
    if (inputMode === "touch" && touchState.active && player.fireCooldown <= 0) {
      firePlayerBullet();
      player.fireCooldown = primaryConfig.cooldown;
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
    } else {
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
    if (enemy.dotTimer > 0) {
      enemy.dotTimer -= delta;
      revealEnemyHealth(enemy);
      applyDamageToEnemy(enemy, enemy.dotDps * delta, { chipFloor: false });
    }
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
        enemy.shield = Math.min(enemy.maxShield, enemy.shield + enemy.shieldRegen * delta);
      }
    }
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
    } else if (enemy.ai === "sentinel") {
      const width = canvas.width / window.devicePixelRatio;
      const holdY = enemy.aiParams.holdY ?? 150;
      const slide = enemy.aiParams.slideSpeed ?? 0.9;
      const keepOut = enemy.aiParams.keepOut ?? 140;
      const dx = player.x - enemy.x;
      const dy = player.y - enemy.y;
      const dist = Math.hypot(dx, dy) || 1;

      // Prefer to hold near a fixed Y, but back off if the player gets too close.
      const desiredY = dist < keepOut ? Math.max(80, holdY - 70) : holdY;
      const yErr = desiredY - enemy.y;
      const targetVy = yErr * 1.2;
      enemy.vy += (targetVy - enemy.vy) * 0.08;

      // Strafe to roughly align with player X, with a gentle sway.
      const sway = Math.sin(mission.elapsed * 1.2 + enemy.id) * 50;
      const targetX = Math.max(60, Math.min(width - 60, player.x + sway));
      const xErr = targetX - enemy.x;
      const targetVx = xErr * slide;
      enemy.vx += (targetVx - enemy.vx) * 0.09;
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
      const width = canvas.width / window.devicePixelRatio;
      const holdY = enemy.aiParams.holdY ?? 190;
      const standoff = enemy.aiParams.standoff ?? 240;
      const strafeSpeed = enemy.aiParams.strafeSpeed ?? 1.0;
      const dx = player.x - enemy.x;
      const dy = player.y - enemy.y;
      const dist = Math.hypot(dx, dy) || 1;
      const ux = dx / dist;
      const uy = dy / dist;
      const tx = -uy;
      const ty = ux;

      // Keep a standoff ring around the player, while also preferring a top-ish hold Y.
      const radialErr = dist - standoff;
      const radialPush = radialErr * 0.9;
      const targetVx = (tx * enemy.speed * strafeSpeed + ux * radialPush) * empFactor;
      const targetVy =
        (ty * enemy.speed * 0.12 + uy * radialPush + (holdY - enemy.y) * 1.1) * empFactor;
      enemy.vx += (targetVx - enemy.vx) * 0.1;
      enemy.vy += (targetVy - enemy.vy) * 0.1;

      // Avoid hugging edges.
      if (enemy.x < 70) enemy.vx += 40 * empFactor;
      if (enemy.x > width - 70) enemy.vx -= 40 * empFactor;
    } else {
      enemy.vx += Math.sin(mission.elapsed + enemy.x) * 0.05;
    }

    enemy.x += enemy.vx * empFactor * delta;
    enemy.y += enemy.vy * empFactor * delta;
  });

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
  cleanArrays(enemies, (enemy) => enemy.y > height + 60);
  cleanArrays(floatingTexts, (text) => text.life <= 0);
  cleanArrays(explosions, (boom) => boom.elapsed >= boom.duration);

  if (!dying) {
    handleCollisions();
    if (player.hull <= 0) {
      startPlayerDeathSequence();
      return;
    }
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
        applyDamageToEnemy(enemy, bullet.damage);
        if (bullet.payload === "plasma") {
          enemy.dotTimer = Math.max(enemy.dotTimer, 3.0);
          enemy.dotDps = Math.max(enemy.dotDps, bullet.damage * 0.45);
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
            style: "impact",
            coalesce: true,
          });
          addCameraShake(Math.min(0.2, 0.03 + radius / 700), enemy.x, enemy.y);
          enemies.forEach((other) => {
            if (other === enemy) return;
            const d = distance(enemy.x, enemy.y, other.x, other.y);
            if (d > radius) return;
            const scale = 1 - d / radius;
            revealEnemyHealth(other);
            applyDamageToEnemy(other, bullet.damage * (bullet.explosiveDamageMult ?? 0.7) * scale);
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

function handleEnemyDestroyed(enemy, bullet) {
  mission.kills += 1;
  mission.score += enemy.score;
  const creditEarned = creditForEnemy(enemy);
  mission.killCredits += creditEarned;
  if (!state.killsByEnemyKey) state.killsByEnemyKey = {};
  const killKey = enemy.compendiumKey || compendiumKeyFor(mission?.level?.id || "unknown", enemy.type, enemy);
  state.killsByEnemyKey[killKey] = (state.killsByEnemyKey[killKey] ?? 0) + 1;
  spawnCreditPopup(enemy.x, enemy.y, creditEarned);
  spawnExplosion(enemy.x, enemy.y, enemy.radius, { intensity: 0.9, blend: "lighter", style: "kill", coalesce: false });
  playSfx("explosion", 0.135);
  const baseTrauma = Math.min(0.22, 0.03 + enemy.radius / 260);
  addCameraShake(enemy.isBoss ? 0.42 : baseTrauma, enemy.x, enemy.y);
  if (enemy.isBoss) {
    grantBossSalvage(enemy);
    screenFlash = Math.min(0.6, screenFlash + 0.35);
  } else {
    const drop = rollSalvageDrop(enemy);
    if (drop) {
      spawnSalvagePod(enemy.x, enemy.y, drop);
    }
  }
  if (enemy.isBoss && mission.level?.completeOnBoss) {
    endMission({ completed: true });
  }
  if (bullet && bullet.vampiric) {
    player.hull = Math.min(player.maxHull, player.hull + bullet.vampiric);
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
    if (absorbed > 0) player.shieldCooldown = 2.5;
  }

  if (amount > 0 && player.armor > 0) {
    const effective = Math.max(0, amount - (player.armorClass || 0));
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
    enemyBullets.forEach((bullet) => drawBullet(bullet, "#f97316"));
    enemies.forEach(drawEnemy);
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
  const usedSprite = drawSpriteCentered(assets.player, player.x, player.y, player.spriteScale);
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
  if (state.upgrades.auxSlot < 1 || state.rmbWeapon === "none") return;
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
    const stretch = animation === "lance" ? 1.09 : animation === "plasma" ? 1.04 : 1;
    const sway = animation === "bolt" || animation === "lance" ? Math.sin(age * 32) * 0.025 : 0;
    const rotation = (bullet.rotation || 0) + sway + age * (bullet.spinRate || 0);
    const trailCount = animation === "lance" ? 4 : animation === "ember" || animation === "orb" ? 2 : 3;
    const trailStep = Math.max(5, Math.min(16, speed * 0.032));
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
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
  const rarityConfig = getRarityConfig(pod.rarity);
  const pulse = 1 + Math.sin((pod.age || 0) * 5.5) * 0.08;
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
  if (assets.salvagePod.loaded) {
    drawSpriteCentered(assets.salvagePod, pod.x, pod.y, 0.58 * pulse);
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = pod.rejected ? 0.25 : 0.42;
    ctx.fillStyle = rarityConfig.color;
    ctx.beginPath();
    ctx.arc(pod.x, pod.y, 18 * pulse, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillStyle = rarityConfig.color;
    ctx.beginPath();
    ctx.arc(pod.x, pod.y, 14 * pulse, 0, Math.PI * 2);
    ctx.fill();
  }
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
  if (enemy.healthBarTimer > 0) {
    drawEnemyHealth(enemy);
  }
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

  const segment = (value, maxValue, color, offset) => {
    if (maxValue <= 0) return 0;
    const fraction = Math.max(0, Math.min(1, value / maxValue));
    const segW = (width * maxValue) / totalMax;
    const fillW = segW * fraction;
    if (fillW > 0) {
      ctx.fillStyle = color;
      ctx.fillRect(x + offset, y, fillW, height);
    }
    return segW;
  };

  let offset = 0;
  offset += segment(shield, maxShield, "#7dd3fc", offset); // shields: light blue
  offset += segment(armor, maxArmor, "#cbd5e1", offset); // armor: light gray (higher contrast)
  segment(hull, maxHull, "#fb7185", offset); // hull: red
  ctx.restore();
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

  ctx.save();
  ctx.globalAlpha = 0.92 * alpha;
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

  const segment = (value, maxValue, color, offset) => {
    if (maxValue <= 0) return 0;
    const fraction = Math.max(0, Math.min(1, value / maxValue));
    const segW = (width * maxValue) / totalMax;
    const fillW = segW * fraction;
    if (fillW > 0) {
      ctx.fillStyle = color;
      ctx.fillRect(x + offset, y, fillW, height);
    }
    return segW;
  };

  let offset = 0;
  offset += segment(shield, maxShield, "#7dd3fc", offset);
  offset += segment(armor, maxArmor, "#cbd5e1", offset);
  segment(hull, maxHull, "#fb7185", offset);
  ctx.restore();
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

function updateHud() {
  if (!mission) {
    hudHull.textContent = "-";
    if (hudArmor) hudArmor.textContent = "-";
    hudShield.textContent = "-";
    if (hudScore) hudScore.textContent = "0";
    hudTime.textContent = "00:00";
    hudCredits.textContent = state.credits.toString();
    if (bossProgressFill) bossProgressFill.style.width = "0%";
    if (bossLabel) bossLabel.textContent = "Boss ETA";
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
    updateBossProgress();
  }
  updateCargoHud();
  updateConsumableHud();
}

function updateCargoHud() {
  if (!hudCargoPips) return;
  const cargo = getCargoItems();
  hudCargoPips.innerHTML = "";
  for (let i = 0; i < ECONOMY.cargoSize; i += 1) {
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
  const base = sfx[name];
  if (!base) return;
  const instance = base.cloneNode();
  instance.volume = volume;
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

function revealEnemyHealth(enemy) {
  enemy.healthBarTimer = Math.max(enemy.healthBarTimer || 0, 1.35);
}

function revealPlayerHealth() {
  player.healthBarTimer = Math.max(player.healthBarTimer || 0, 1.8);
}

function applyDamageToEnemy(enemy, damage, { chipFloor = true } = {}) {
  // Shields absorb full damage; armor reduces per-hit damage by armorClass.
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
      ? Math.max(1, baseDamage * ECONOMY.minDamageFloor)
      : 0;
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
    deathScale: style === "playerDeath" ? 3.2 : undefined,
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
  if (style === "playerDeath") {
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
    if (visualTheme?.playerDeathCore?.loaded) {
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
  if (style === "impact") {
    // Ring-style impact: reads well, but doesn't stack into a fully opaque blob.
    const ringR = maxRadius * 0.82;
    const ringW = Math.max(2, boom.radius * 0.22);
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
  const difficultyScale = 1 + mission.difficulty * 0.09;
  const base = enemy.baseCredit || 10;
  return Math.round(base * difficultyScale);
}

function creditRewardFor(missionState) {
  const timeMinutes = missionState.elapsed / 60;
  return Math.round(missionState.killCredits + missionState.score * 0.02 + timeMinutes * 40);
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

function updateBossProgress() {
  if (!bossProgressFill || !bossLabel || !mission) return;
  const bossTime = mission.bossSpawnTime;
  if (!bossTime) {
    bossLabel.textContent = "No Boss";
    bossProgressFill.style.width = "0%";
    return;
  }
  if (mission.bossAlive) {
    bossLabel.textContent = "Boss Engaged";
    bossProgressFill.style.width = "100%";
    return;
  }
  const progress = Math.min(1, mission.elapsed / bossTime);
  bossLabel.textContent = `Boss ETA ${formatTime(Math.max(0, bossTime - mission.elapsed))}`;
  bossProgressFill.style.width = `${Math.round(progress * 100)}%`;
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

safeUpdateHangar();
ensureWeaponFrameCatalogLoaded()
  .then(() => {
    if (mission?.active) return;
    syncStarterArmoryState();
    saveState();
    safeUpdateHangar();
  })
  .catch(() => {});
void autoLaunchFreshPilotMission();
requestAnimationFrame(gameLoop);
