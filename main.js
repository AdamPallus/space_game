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
const shipNodeButtons = document.querySelectorAll("[data-ship-node]");
const shipStats = document.getElementById("ship-stats");

const overlay = document.getElementById("overlay");
const hangarPanel = document.getElementById("hangar");
const debriefPanel = document.getElementById("debrief");

const pilotRank = document.getElementById("pilot-rank");
const availableCreditsEl = document.getElementById("available-credits");
const lifetimeCreditsEl = document.getElementById("lifetime-credits");
const lastMissionEl = document.getElementById("last-mission");
const debugUnlock = document.getElementById("debug-unlock");
const debugInvincible = document.getElementById("debug-invincible");
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
const hangarTabPanels = document.querySelectorAll(".tab-panel");
const consumableStore = document.getElementById("consumable-store");
const consumableEquipList = document.getElementById("consumable-equip-list");
const consumableSlot1 = document.getElementById("consumable-slot-1");
const consumableSlot2 = document.getElementById("consumable-slot-2");
const clearSlot1 = document.getElementById("clear-slot-1");
const clearSlot2 = document.getElementById("clear-slot-2");

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
    effect: "none", // none | homing | explosive | pierce
    effectUpgrades: {
      homing: 0,
      explosive: 0,
      pierce: 0,
    },
    defenseSlots: ["shield", "none"], // shield | armor | none
    shieldMaxLevel: 0,
    shieldRegenLevel: 0,
    armorAmountLevel: 0,
    armorClass: 10,
    armorClassLevel: 0,
  };
}

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
let enemyIdCounter = 1;

const mobileAltIcons = {
  emp: "assets/SpaceShooterRedux/PNG/Power-ups/powerupBlue_bolt.png",
  bulwark: "assets/SpaceShooterRedux/PNG/Power-ups/powerupYellow_shield.png",
  cloak: "assets/SpaceShooterRedux/PNG/Power-ups/powerupBlue_shield.png",
};

const starfield = Array.from({ length: 120 }, () => ({
  x: Math.random(),
  y: Math.random(),
  speed: 0.2 + Math.random() * 0.8,
  size: 0.5 + Math.random() * 1.4,
}));

const state = loadState();
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
const floatingTexts = [];
const explosions = [];
let backgroundScroll = 0;

const assets = {
  background: loadImage(`${BG_ROOT}/blue.png`),
  backgrounds: {
    blue: loadImage(`${BG_ROOT}/blue.png`),
    purple: loadImage(`${BG_ROOT}/purple.png`),
    darkPurple: loadImage(`${BG_ROOT}/darkPurple.png`),
    black: loadImage(`${BG_ROOT}/black.png`),
  },
  player: loadImage(`${ASSET_ROOT}/playerShip2_blue.png`),
  playerBullet: loadImage(`${ASSET_ROOT}/Lasers/laserBlue02.png`),
  spreadBullet: loadImage(`${ASSET_ROOT}/Lasers/laserGreen02.png`),
  altRocket: loadImage(`${ASSET_ROOT}/Lasers/laserGreen16.png`),
  altArc: loadImage(`${ASSET_ROOT}/Lasers/laserBlue16.png`),
  enemyBullet: loadImage(`${ASSET_ROOT}/Lasers/laserRed02.png`),
  shield: loadImage(`${ASSET_ROOT}/Effects/shield3.png`),
  explosionCore: loadImage(`${ASSET_ROOT}/Effects/star2.png`),
  explosionFlare: loadImage(`${ASSET_ROOT}/Effects/star3.png`),
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
  // Variant missions (Operations Center unlocks - not yet integrated)
  // { id: "level1_patrol", label: "Mission 1: Patrol Alpha" },
  // { id: "level2_skirmish", label: "Mission 2: Skirmish" },
];

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
let selectedLevelId = "level1";
let lastLoadedLevelId = null;
let activeHangarTab = "loadout";
let hangarNeedsRefresh = false;
let openShipNodeId = null;
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
    const response = await fetch(`levels/${levelName}.json`, { cache: "no-store" });
    if (!response.ok) throw new Error("level load failed");
    const data = await response.json();
    data.id = data.id || levelName;
    return data;
  } catch (error) {
    console.warn("Using fallback level data.");
    return { ...levelFallback, id: levelName };
  }
}

async function loadLevelMeta(levelName) {
  if (levelMetaCache.has(levelName)) return levelMetaCache.get(levelName);
  const data = await loadLevel(levelName);
  levelMetaCache.set(levelName, data);
  return data;
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
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

canvas.style.touchAction = "none";
canvas.addEventListener("contextmenu", (event) => event.preventDefault());

window.addEventListener("keydown", (event) => {
  enableAudio();
  keyState.add(event.key.toLowerCase());
  if (event.key.toLowerCase() === "p") {
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

function setHangarTab(tabId, { renderLevels = true } = {}) {
  activeHangarTab = tabId;
  hangarTabButtons.forEach((button) => {
    const isActive = button.dataset.tab === tabId;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", isActive ? "true" : "false");
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

setHangarTab(activeHangarTab, { renderLevels: false });

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

async function launchSelectedMission() {
  if (!isLevelUnlocked(selectedLevelId)) return;
  await startMission();
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
  returnBtn.addEventListener("click", () => {
    debriefPanel.hidden = true;
    hangarPanel.hidden = false;
    overlay.hidden = false;
    setHangarTab("loadout");
    updateMobileControls();
    if (hangarNeedsRefresh) {
      hangarNeedsRefresh = false;
      safeUpdateHangar();
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

if (shipModalClose) {
  shipModalClose.addEventListener("click", () => {
    closeShipModal();
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

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return {
      credits: 0,
      lifetimeCredits: 0,
      missionCount: 0,
      lastMissionSummary: "N/A",
      unlockedLevels: 1,
      debugUnlock: false,
      debugInvincible: false,
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
    };
  }
  try {
    const parsed = JSON.parse(stored);
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
    parsed.debugUnlock = parsed.debugUnlock ?? false;
    parsed.debugInvincible = parsed.debugInvincible ?? false;
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
    parsed.shipBuild.defenseSlots = Array.isArray(parsed.shipBuild.defenseSlots)
      ? parsed.shipBuild.defenseSlots.slice(0, 2)
      : ["shield", "none"];
    while (parsed.shipBuild.defenseSlots.length < 2) parsed.shipBuild.defenseSlots.push("none");
    parsed.shipBuild.shieldMaxLevel = parsed.shipBuild.shieldMaxLevel ?? 0;
    parsed.shipBuild.shieldRegenLevel = parsed.shipBuild.shieldRegenLevel ?? 0;
    parsed.shipBuild.armorClass = parsed.shipBuild.armorClass ?? 10;
    parsed.shipBuild.armorAmountLevel = parsed.shipBuild.armorAmountLevel ?? 0;
    parsed.shipBuild.armorClassLevel = parsed.shipBuild.armorClassLevel ?? 0;
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
    return parsed;
  } catch (error) {
    console.warn("Failed to parse save, resetting.");
    return {
      credits: 0,
      lifetimeCredits: 0,
      missionCount: 0,
      lastMissionSummary: "N/A",
      unlockedLevels: 1,
      debugUnlock: false,
      debugInvincible: false,
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
    };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getShipBuild() {
  if (!state.shipBuild) {
    state.shipBuild = createDefaultShipBuild();
  }
  if (!state.shipBuild.effectUpgrades) {
    state.shipBuild.effectUpgrades = { homing: 0, explosive: 0, pierce: 0 };
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

  const effect = build.effect || "none";
  if (effect === "homing") state.weapon.modifier = "homing";
  else if (effect === "pierce") state.weapon.modifier = "pierce";
  else if (effect === "explosive") state.weapon.modifier = "explosive";
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

async function startMission() {
  closeShipModal();
  await ensureEnemyCatalogLoaded();
  const level = await ensureLevelLoaded();
  applyUpgrades();
  const consumablesState = initConsumablesForMission();
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
  };
  setDesiredMusic(level);
  bullets.length = 0;
  enemyBullets.length = 0;
  enemies.length = 0;
  floatingTexts.length = 0;
  explosions.length = 0;
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

  overlay.hidden = true;
  hangarPanel.hidden = true;
  debriefPanel.hidden = true;
  updateMobileControls();
  hudMission.textContent = level?.name
    ? `Mission ${state.missionCount + 1}: ${level.name}`
    : `Mission ${state.missionCount + 1}`;
}

function endMission({ ejected = false, completed = false } = {}) {
  if (!mission || !mission.active) return;
  mission.active = false;
  closeShipModal();
  setHangarMusic();
  setHangarTab("loadout", { renderLevels: false });

  const creditReward = creditRewardFor(mission);
  const completionBonus = completed ? 0.1 + Math.random() * 0.15 : 0;
  const penaltyRate = completed || ejected ? 0 : 0.1 + Math.random() * 0.4;
  const baseReward = Math.round(creditReward * (1 - penaltyRate) * (1 + completionBonus));
  
  // Calculate fleet share dividends
  const dividends = calculateDividends(baseReward);
  const finalReward = baseReward + dividends;

  state.credits += finalReward;
  state.lifetimeCredits += finalReward;
  state.missionCount += 1;
  state.lastMissionSummary = `${formatTime(mission.elapsed)} | ${mission.kills} kills`;
  if (completed && mission.level?.id) {
    const entry = availableLevels.find((level) => level.id === mission.level.id);
    if (!entry?.test) {
      const currentIndex = availableLevels.findIndex((level) => level.id === mission.level.id);
      if (currentIndex !== -1 && state.unlockedLevels <= currentIndex + 1) {
        state.unlockedLevels = Math.min(availableLevels.length, currentIndex + 2);
      }
    }
  }
  saveState();

  // Build debrief message with breakdown
  let debriefMsg = "";
  if (completed) {
    debriefMsg = `Mission complete! Recovery bonus: +${Math.round(completionBonus * 100)}%`;
  } else if (ejected) {
    debriefMsg = "Ejection successful. Full credits secured.";
    playSfx("eject", 0.5);
  } else {
    debriefMsg = `Ship destroyed. Credit loss: -${Math.round(penaltyRate * 100)}%`;
  }
  
  // Add dividend info if player has fleet shares
  if (dividends > 0) {
    debriefMsg += ` | Fleet dividends: +${dividends}`;
  }
  
  debriefText.textContent = debriefMsg;
  debriefTime.textContent = formatTime(mission.elapsed);
  debriefKills.textContent = mission.kills.toString();
  debriefCredits.textContent = finalReward.toString();

  overlay.hidden = false;
  debriefPanel.hidden = false;
  hangarPanel.hidden = true;
  updateMobileControls();
  hangarNeedsRefresh = true;
}

function updateHangar() {
  if (pilotRank) {
    pilotRank.textContent = getPilotRank(state.lifetimeCredits);
  }
  if (availableCreditsEl) {
    availableCreditsEl.textContent = state.credits.toString();
  }
  if (lifetimeCreditsEl) {
    lifetimeCreditsEl.textContent = state.lifetimeCredits.toString();
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

  renderAuxTree();
  renderShipUpgradesPanel();
  renderConsumableLoadout();
  renderConsumableStore();
  renderInvestments();
  if (activeHangarTab === "mission") {
    renderLevelSelect();
  }
  if (activeHangarTab === "compendium") {
    renderDroneCompendium();
  }
  if ((!mission || !mission.active) && hangarPanel && !hangarPanel.hidden) {
    setHangarMusic();
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

function renderInvestments() {
  if (!engineeringTier) return; // UI elements not present

  const renderCategory = (key, tierEl, benefitsEl, investBtn, costEl, categoryEl) => {
    const tier = state.investments[key];
    const data = investments[key];
    const maxTier = data.tiers.length;
    const isMaxed = tier >= maxTier;

    tierEl.textContent = `Tier ${tier}/${maxTier}`;
    
    // Render benefits list
    benefitsEl.innerHTML = "";
    data.tiers.forEach((t, i) => {
      const item = document.createElement("div");
      item.className = "benefit-item";
      if (i < tier) {
        item.classList.add("active");
        item.innerHTML = `<span class="benefit-check">✓</span> ${t.benefit}`;
      } else if (i === tier) {
        item.innerHTML = `<span class="benefit-check">→</span> ${t.benefit}`;
      } else {
        item.classList.add("locked");
        item.innerHTML = `<span class="benefit-check">○</span> ${t.benefit}`;
      }
      benefitsEl.appendChild(item);
    });

    // Update button state
    if (isMaxed) {
      investBtn.disabled = true;
      investBtn.classList.add("maxed");
      investBtn.innerHTML = `<span class="invest-label">Maxed</span>`;
      categoryEl?.classList.add("maxed");
    } else {
      const cost = data.tiers[tier].cost;
      const canAfford = state.credits >= cost;
      investBtn.disabled = !canAfford;
      investBtn.classList.remove("maxed");
      investBtn.innerHTML = `<span class="invest-label">Invest</span><span class="invest-cost">${cost}</span>`;
      categoryEl?.classList.remove("maxed");
    }
  };

  renderCategory(
    "engineering",
    engineeringTier,
    engineeringBenefits,
    engineeringInvest,
    engineeringCost,
    document.getElementById("engineering-bay")
  );
  renderCategory(
    "operations",
    operationsTier,
    operationsBenefits,
    operationsInvest,
    operationsCost,
    document.getElementById("operations-center")
  );
  renderCategory(
    "shares",
    sharesTier,
    sharesBenefits,
    sharesInvest,
    sharesCost,
    document.getElementById("fleet-shares")
  );
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

async function renderLevelSelectAsync() {
  if (!levelList) return;
  levelList.innerHTML = "";
  if (!isLevelUnlocked(selectedLevelId)) {
    const firstUnlocked = availableLevels.find((level) => isLevelUnlocked(level.id));
    if (firstUnlocked) {
      selectedLevelId = firstUnlocked.id;
    }
  }
  if (launchBtn) {
    const canLaunch = isLevelUnlocked(selectedLevelId);
    launchBtn.disabled = !canLaunch;
    launchBtn.textContent = canLaunch ? "Launch Mission" : "Locked";
  }
  for (const level of availableLevels) {
    const metaData = await loadLevelMeta(level.id);
    const isUnlocked = isLevelUnlocked(level.id);
    const item = document.createElement("div");
    item.className = "upgrade-item";
    if (level.id === selectedLevelId) {
      item.classList.add("active");
    }
    if (!isUnlocked) {
      item.classList.add("locked");
    }
    const meta = document.createElement("div");
    meta.className = "meta";
    meta.innerHTML = `
      <span class="name">${metaData.name || level.label}</span>
      <span class="desc">${metaData.description || level.id.toUpperCase()}</span>
      <span class="badge">${metaData.difficulty || "Unknown"}</span>
    `;
    const button = document.createElement("button");
    button.textContent = !isUnlocked
      ? "Locked"
      : level.id === selectedLevelId
        ? "Selected"
        : "Select";
    button.disabled = !isUnlocked;
    button.addEventListener("click", () => {
      if (!isUnlocked) return;
      selectedLevelId = level.id;
      currentLevel = null;
      renderLevelSelect();
    });
    item.appendChild(meta);
    item.appendChild(button);
    levelList.appendChild(item);
  }
}

const COMPENDIUM_LEVEL_IDS = [
  ...availableLevels.map((level) => level.id),
  // Level variants live on disk but aren't currently listed in Mission Select.
  "level1_patrol",
  "level2_skirmish",
];

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
  if (pattern === "bossSweep") return "Entrances, then sweeps horizontally across the arena.";
  if (ai === "hunter") return "Actively hunts the pilot; aggression ramps as the mission drags on.";
  if (ai === "stalker") return "Lurks until you enter its aggro radius, then pursues.";
  if (ai === "transport") return "Slow hauler with mild weave; prioritizes survival over speed.";
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
    const levels = await Promise.all(COMPENDIUM_LEVEL_IDS.map((id) => loadLevelMeta(id)));
    const byKey = new Map();
    levels.forEach((level) => {
      const levelId = level.id;
      const enemyTypes = level.enemyTypes || {};
      Object.keys(enemyTypes).forEach((typeId) => {
        const spec = enemyTypes[typeId] || {};
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

  const filtered = list.filter((entry) => {
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
        ? `Boss target | ${firstSource?.levelName || "Unknown mission"}`
        : `Seen in: ${entry.sources.slice(0, 2).map((s) => s.levelName).join(", ")}${entry.sources.length > 2 ? "…" : ""}`
      : "Prototype entry (unseen)";

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
    compendiumList.innerHTML = `<div class="muted">No matching drones found.</div>`;
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

  const shieldTip =
    maxShield > 0
      ? `Max Shield = ${maxShield}. Regen = ${formatNumber(shieldRegen, 1)}/s.\nShield regen pauses briefly after shield damage.\nNote: collision damage bypasses shields.`
      : "No shield modules installed.";
  const armorTip =
    maxArmor > 0
      ? `Max Armor = ${maxArmor}. Armor Class (AC) = ${armorClass}.\nArmor applies per-hit reduction: max(0, damage - AC).\nArmor modules also increase cooldown: x${formatNumber(cfg.armorPenalty, 2)}.`
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
      <span class="muted">${formula}. ${rateNote}.</span>
    </div>
  `;
}

function renderShipUpgradesPanel() {
  const build = getShipBuild();
  renderShipStatsPanel();
  if (shipGunValue) {
    const diameter = build.gunDiameter ? capitalize(build.gunDiameter) : "Medium";
    const spread = build.spread ? capitalize(build.spread) : "Focused";
    shipGunValue.textContent = `${diameter} / ${spread}`;
  }
  if (shipFlowValue) {
    shipFlowValue.textContent = `Rate Lv ${build.flowRateLevel} / Vel Lv ${build.flowVelocityLevel} / Size Lv ${build.flowSizeLevel ?? 0}`;
  }
  if (shipAmmoValue) {
    shipAmmoValue.textContent = build.ammo ? capitalize(build.ammo) : "Kinetic";
  }
  if (shipEffectsValue) {
    const effect = build.effect || "none";
    if (effect === "none") {
      shipEffectsValue.textContent = "None";
    } else {
      const level = build.effectUpgrades?.[effect] ?? 0;
      shipEffectsValue.textContent = `${capitalize(effect)} Lv ${level}`;
    }
  }
  if (shipDefensesValue) {
    const slotA = build.defenseSlots?.[0] || "none";
    const slotB = build.defenseSlots?.[1] || "none";
    shipDefensesValue.textContent = `${capitalize(slotA)} / ${capitalize(slotB)}`;
  }

  if (!openShipNodeId || !shipModalBody || !shipModalTitle) return;
  if (shipModal) shipModal.hidden = false;

  const clear = () => {
    shipModalBody.innerHTML = "";
  };

  const addSection = (titleText) => {
    const section = document.createElement("div");
    section.className = "modal-section";
    const title = document.createElement("div");
    title.className = "tree-label";
    title.textContent = titleText;
    section.appendChild(title);
    shipModalBody.appendChild(section);
    return section;
  };

  const addOptionRow = ({ name, desc, right, onClick, disabled = false, active = false }) => {
    const row = document.createElement("div");
    row.className = "upgrade-item";
    if (active) row.classList.add("active");
    if (disabled) row.classList.add("locked");

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.innerHTML = `
      <span class="name">${name}</span>
      <span class="desc">${desc}</span>
    `;

    const button = document.createElement("button");
    button.textContent = right;
    button.disabled = disabled;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      if (disabled) return;
      onClick();
    });

    row.appendChild(meta);
    row.appendChild(button);
    shipModalBody.appendChild(row);
  };

  const spend = (cost) => {
    if (state.credits < cost) return false;
    state.credits -= cost;
    return true;
  };

  const renderGun = () => {
    shipModalTitle.textContent = "Gun";
    clear();

    addSection("Gun Diameter");
    [
      { id: "small", label: "Small", desc: "Smaller projectiles, faster bullets. Better vs armor with high velocity.", cost: 120 },
      { id: "medium", label: "Medium", desc: "Standard issue. Balanced size and speed.", cost: 0 },
      { id: "large", label: "Large", desc: "Bigger projectiles, slower bullets. Better shield burn + explosive radius.", cost: 180 },
    ].forEach((opt) => {
      const active = build.gunDiameter === opt.id;
      const unlocked = opt.cost === 0 || isShipUnlocked("gunDiameter", opt.id);
      const canAfford = state.credits >= opt.cost;
      addOptionRow({
        name: opt.label,
        desc: opt.desc,
        right: active ? "Equipped" : !unlocked && opt.cost ? `Unlock ${opt.cost}/${state.credits}` : "Equip",
        active,
        disabled: !active && !unlocked && opt.cost > 0 && !canAfford,
        onClick: () => {
          if (!active && !unlocked && opt.cost > 0 && !unlockShipOption("gunDiameter", opt.id, opt.cost)) return;
          build.gunDiameter = opt.id;
          state.shipBuild = build;
          syncShipBuildToLegacy();
          saveState();
          safeUpdateHangar();
        },
      });
    });

    addSection("Spread Pattern");
    [
      { id: "focused", label: "Focused", desc: "Single full-size projectile. Best vs armor.", cost: 0 },
      { id: "burst", label: "Burst", desc: "5 micro-shots with +/- 5 deg jitter. Longer cooldown.", cost: 220 },
      { id: "wide", label: "Wide", desc: "5 micro-shots spread across angles. Great for clearing unarmored swarms.", cost: 220 },
    ].forEach((opt) => {
      const active = build.spread === opt.id;
      const unlocked = opt.cost === 0 || isShipUnlocked("spread", opt.id);
      const canAfford = state.credits >= opt.cost;
      addOptionRow({
        name: opt.label,
        desc: opt.desc,
        right: active ? "Equipped" : !unlocked && opt.cost ? `Unlock ${opt.cost}/${state.credits}` : "Equip",
        active,
        disabled: !active && !unlocked && opt.cost > 0 && !canAfford,
        onClick: () => {
          if (!active && !unlocked && opt.cost > 0 && !unlockShipOption("spread", opt.id, opt.cost)) return;
          build.spread = opt.id;
          state.shipBuild = build;
          syncShipBuildToLegacy();
          saveState();
          safeUpdateHangar();
        },
      });
    });
  };

  const renderFlow = () => {
    shipModalTitle.textContent = "Flow Controller";
    clear();
    addSection("Flow Upgrades");

    const rateCost = shipPanelUpgradeCost(180, build.flowRateLevel);
    addOptionRow({
      name: `Fire Rate (Lv ${build.flowRateLevel})`,
      desc: "Cooldown x0.90 per level (armor modules add a penalty).",
      right: `Upgrade ${rateCost}/${state.credits}`,
      disabled: state.credits < rateCost,
      onClick: () => {
        if (!spend(rateCost)) return;
        build.flowRateLevel += 1;
        state.shipBuild = build;
        saveState();
        safeUpdateHangar();
      },
    });

    const velCost = shipPanelUpgradeCost(180, build.flowVelocityLevel);
    addOptionRow({
      name: `Projectile Velocity (Lv ${build.flowVelocityLevel})`,
      desc: "Bullet speed +8% per level (kinetic damage scales with velocity).",
      right: `Upgrade ${velCost}/${state.credits}`,
      disabled: state.credits < velCost,
      onClick: () => {
        if (!spend(velCost)) return;
        build.flowVelocityLevel += 1;
        state.shipBuild = build;
        saveState();
        safeUpdateHangar();
      },
    });

    const sizeCost = shipPanelUpgradeCost(220, build.flowSizeLevel ?? 0);
    addOptionRow({
      name: `Projectile Size (Lv ${build.flowSizeLevel ?? 0})`,
      desc: "Projectile radius +12% per level (big impact on plasma + explosives).",
      right: `Upgrade ${sizeCost}/${state.credits}`,
      disabled: state.credits < sizeCost,
      onClick: () => {
        if (!spend(sizeCost)) return;
        build.flowSizeLevel = (build.flowSizeLevel ?? 0) + 1;
        state.shipBuild = build;
        saveState();
        safeUpdateHangar();
      },
    });
  };

  const renderAmmo = () => {
    shipModalTitle.textContent = "Ammo Source";
    clear();
    addSection("Ammo Type");
    [
      { id: "kinetic", label: "Kinetic", desc: "Damage scales with velocity and projectile size.", cost: 0 },
      { id: "plasma", label: "Plasma", desc: "Damage scales with projectile size. Applies a damage-over-time burn.", cost: 120 },
    ].forEach((opt) => {
      const active = build.ammo === opt.id;
      const unlocked = opt.cost === 0 || isShipUnlocked("ammo", opt.id);
      const canAfford = state.credits >= opt.cost;
      addOptionRow({
        name: opt.label,
        desc: opt.desc,
        right: active ? "Equipped" : !unlocked && opt.cost ? `Unlock ${opt.cost}/${state.credits}` : "Equip",
        active,
        disabled: !active && !unlocked && opt.cost > 0 && !canAfford,
        onClick: () => {
          if (!active && !unlocked && opt.cost > 0 && !unlockShipOption("ammo", opt.id, opt.cost)) return;
          build.ammo = opt.id;
          state.shipBuild = build;
          syncShipBuildToLegacy();
          saveState();
          safeUpdateHangar();
        },
      });
    });
  };

  const renderEffects = () => {
    shipModalTitle.textContent = "Special Effects";
    clear();
    addSection("Effect Module");
    [
      { id: "none", label: "None", desc: "No special effect.", cost: 0 },
      { id: "homing", label: "Homing", desc: "Projectiles curve toward targets.", cost: 320 },
      { id: "explosive", label: "Explosive", desc: "Impact creates an AOE blast.", cost: 360 },
      { id: "pierce", label: "Piercing", desc: "Projectiles travel through ships.", cost: 320 },
    ].forEach((opt) => {
      const active = build.effect === opt.id;
      const unlocked = opt.cost === 0 || isShipUnlocked("effect", opt.id);
      const canAfford = state.credits >= opt.cost;
      addOptionRow({
        name: opt.label,
        desc: opt.desc,
        right: active ? "Equipped" : !unlocked && opt.cost ? `Unlock ${opt.cost}/${state.credits}` : "Equip",
        active,
        disabled: !active && !unlocked && opt.cost > 0 && !canAfford,
        onClick: () => {
          if (!active && !unlocked && opt.cost > 0 && !unlockShipOption("effect", opt.id, opt.cost)) return;
          build.effect = opt.id;
          state.shipBuild = build;
          syncShipBuildToLegacy();
          saveState();
          safeUpdateHangar();
        },
      });
    });

    if (build.effect && build.effect !== "none") {
      const effectKey = build.effect;
      const level = build.effectUpgrades?.[effectKey] ?? 0;
      const cost = shipPanelUpgradeCost(220, level);
      addSection("Effect Upgrades");
      const nextLabel =
        effectKey === "homing"
          ? "Stronger homing"
          : effectKey === "pierce"
            ? "More pierce"
            : "Bigger blast radius";
      addOptionRow({
        name: `${capitalize(effectKey)} Tuning (Lv ${level})`,
        desc:
          effectKey === "homing"
            ? "Increases homing strength and angle limit."
            : effectKey === "pierce"
              ? "Increases how many ships each projectile can pass through."
              : "Increases explosion radius (scales with projectile size).",
        right: `Upgrade ${cost}/${state.credits}`,
        disabled: state.credits < cost,
        onClick: () => {
          if (!spend(cost)) return;
          if (!build.effectUpgrades) build.effectUpgrades = {};
          build.effectUpgrades[effectKey] = level + 1;
          state.shipBuild = build;
          saveState();
          safeUpdateHangar();
        },
      });
    }
  };

  const renderDefenses = () => {
    shipModalTitle.textContent = "Defenses";
    clear();
    addSection("Defense Slots");

    const slotChoices = [
      { id: "none", label: "Empty", desc: "No module installed.", cost: 0 },
      { id: "shield", label: "Shields", desc: "Recharge after taking damage.", cost: 260 },
      { id: "armor", label: "Armor", desc: "Damage reduction vs hull (Part 2).", cost: 320 },
    ];

    const setSlot = (index, value, cost) => {
      if (cost > 0 && !isShipUnlocked("defense", value) && !unlockShipOption("defense", value, cost)) return;
      build.defenseSlots[index] = value;
      state.shipBuild = build;
      saveState();
      safeUpdateHangar();
    };

    for (let i = 0; i < 2; i += 1) {
      const activeId = build.defenseSlots?.[i] || "none";
      slotChoices.forEach((choice) => {
        const active = activeId === choice.id;
        const unlocked = choice.cost === 0 || isShipUnlocked("defense", choice.id);
        const canAfford = state.credits >= choice.cost;
        addOptionRow({
          name: `Slot ${i + 1}: ${choice.label}`,
          desc: choice.desc,
          right: active ? "Equipped" : !unlocked && choice.cost ? `Unlock ${choice.cost}/${state.credits}` : "Equip",
          active,
          disabled: !active && !unlocked && choice.cost > 0 && !canAfford,
          onClick: () => setSlot(i, choice.id, choice.cost),
        });
      });
    }

    const hasShield =
      (build.defenseSlots?.[0] === "shield" || build.defenseSlots?.[1] === "shield");
    if (hasShield) {
      addSection("Shield Upgrades");
      const maxCost = shipPanelUpgradeCost(200, build.shieldMaxLevel);
      addOptionRow({
        name: `Max Shield (Lv ${build.shieldMaxLevel})`,
        desc: "Increase shield HP.",
        right: `Upgrade ${maxCost}/${state.credits}`,
        disabled: state.credits < maxCost,
        onClick: () => {
          if (!spend(maxCost)) return;
          build.shieldMaxLevel += 1;
          state.shipBuild = build;
          saveState();
          safeUpdateHangar();
        },
      });

      const regenCost = shipPanelUpgradeCost(180, build.shieldRegenLevel);
      addOptionRow({
        name: `Shield Recharge (Lv ${build.shieldRegenLevel})`,
        desc: "Increase recharge rate.",
        right: `Upgrade ${regenCost}/${state.credits}`,
        disabled: state.credits < regenCost,
        onClick: () => {
          if (!spend(regenCost)) return;
          build.shieldRegenLevel += 1;
          state.shipBuild = build;
          saveState();
          safeUpdateHangar();
        },
      });
    }

    const hasArmor =
      (build.defenseSlots?.[0] === "armor" || build.defenseSlots?.[1] === "armor");
    if (hasArmor) {
      addSection("Armor Upgrades");

      const amountLevel = build.armorAmountLevel ?? 0;
      const amountCost = shipPanelUpgradeCost(220, amountLevel);
      addOptionRow({
        name: `Armor Plating (Lv ${amountLevel})`,
        desc: "Max armor +18% per level.",
        right: `Upgrade ${amountCost}/${state.credits}`,
        disabled: state.credits < amountCost,
        onClick: () => {
          if (!spend(amountCost)) return;
          build.armorAmountLevel = amountLevel + 1;
          state.shipBuild = build;
          saveState();
          safeUpdateHangar();
        },
      });

      const hardenLevel = build.armorClassLevel ?? 0;
      const hardenCost = shipPanelUpgradeCost(260, hardenLevel);
      addOptionRow({
        name: `Armor Hardening (Lv ${hardenLevel})`,
        desc: "Armor class +2 per level (per-hit damage reduction).",
        right: `Upgrade ${hardenCost}/${state.credits}`,
        disabled: state.credits < hardenCost,
        onClick: () => {
          if (!spend(hardenCost)) return;
          build.armorClassLevel = hardenLevel + 1;
          state.shipBuild = build;
          saveState();
          safeUpdateHangar();
        },
      });

      addSection("Armor Class (Base)");
      [
        { value: 5, label: "Light Armor", desc: "Armor class 5 (Part 2).", cost: 0 },
        { value: 10, label: "Medium Armor", desc: "Armor class 10 (Part 2).", cost: 120 },
        { value: 15, label: "Heavy Armor", desc: "Armor class 15 (Part 2).", cost: 220 },
      ].forEach((opt) => {
        const active = build.armorClass === opt.value;
        const unlocked = opt.cost === 0 || isShipUnlocked("armorClass", String(opt.value));
        const canAfford = state.credits >= opt.cost;
        addOptionRow({
          name: opt.label,
          desc: opt.desc,
          right: active ? "Equipped" : !unlocked && opt.cost ? `Unlock ${opt.cost}/${state.credits}` : "Equip",
          active,
          disabled: !active && !unlocked && opt.cost > 0 && !canAfford,
          onClick: () => {
            if (!active && !unlocked && opt.cost > 0 && !unlockShipOption("armorClass", String(opt.value), opt.cost)) return;
            build.armorClass = opt.value;
            state.shipBuild = build;
            saveState();
            safeUpdateHangar();
          },
        });
      });
    }
  };

  if (openShipNodeId === "gun") renderGun();
  else if (openShipNodeId === "flow") renderFlow();
  else if (openShipNodeId === "ammo") renderAmmo();
  else if (openShipNodeId === "effects") renderEffects();
  else if (openShipNodeId === "defenses") renderDefenses();
  else {
    shipModalTitle.textContent = "Ship Module";
    clear();
  }
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

function isLevelUnlocked(levelId) {
  if (state.debugUnlock) return true;
  const entry = availableLevels.find((level) => level.id === levelId);
  if (!entry) return false;
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

  if (enemy.pattern === "bossSweep") {
    enemy.x = width / 2;
    enemy.y = -80;
    enemy.vx = enemy.speed;
    enemy.vy = enemy.speed * 0.6;
    enemy.sweepDir = Math.random() < 0.5 ? -1 : 1;
    enemy.targetY = 130;
  }

  const spriteKey = spec.sprite;
  const spriteLooksLikePath =
    typeof spriteKey === "string" && (spriteKey.includes("/") || spriteKey.endsWith(".png"));
  enemy.sprite = spriteLooksLikePath
    ? loadImageCached(spriteKey)
    : enemySpriteMap[spriteKey] || assets.enemies[enemy.type] || assets.enemies.fighter;
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
  const baseLocal = level?.enemyTypes?.[type] || {};
  const templateId = baseLocal?.template;
  const baseTemplate =
    (typeof templateId === "string" && getEnemyCatalogEntry(templateId)?.template) ||
    getEnemyCatalogEntry(type)?.template ||
    {};

  const merged = {
    type,
    ...baseTemplate,
    ...baseLocal,
    ...overrides,
  };
  delete merged.template;

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
  });
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

function getPrimaryFireConfig() {
  const build = getShipBuild();
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
  playSfx("laserSmall", 0.25);

  const resolveBulletImage = (ammo) => {
    if (ammo === "plasma") return assets.spreadBullet;
    return assets.playerBullet;
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
      ...extra,
    };
    if (cfg.ammo === "plasma") {
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
  if (enemy.fireMode === "radial") {
    return { shape: "orb", color: "#f97316", radius: 6 };
  }
  if (enemy.fireMode === "spread") {
    return { image: assets.altArc, width: 12, height: 30 };
  }
  if (enemy.ai === "stalker") {
    return { shape: "orb", color: "#a855f7", radius: 5 };
  }
  if (enemy.ai === "hunter") {
    return { image: assets.enemyBullet, width: 10, height: 32 };
  }
  return { image: assets.enemyBullet, width: 10, height: 32 };
}

function update(delta) {
  backgroundScroll += delta * 18;
  updateStarfield(delta);
  if (!mission || !mission.active || paused) return;

  mission.elapsed += delta;
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

  if (mission.level) {
    scheduleLevelSpawns();
    for (let i = mission.spawnQueue.length - 1; i >= 0; i -= 1) {
      const entry = mission.spawnQueue[i];
      if (mission.elapsed >= entry.spawnTime) {
        const spec = resolveEnemySpec(entry.type, entry.overrides);
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

  const globalEmp = mission.empTimer > 0;
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

  const width = canvas.width / window.devicePixelRatio;
  const height = canvas.height / window.devicePixelRatio;

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
  if (pointerButtons.left && player.fireCooldown <= 0) {
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
    bullet.x += bullet.vx * delta;
    bullet.y += bullet.vy * delta;
  });

  if (player.healthBarTimer > 0) {
    player.healthBarTimer = Math.max(0, player.healthBarTimer - delta);
  }

  enemies.forEach((enemy) => {
    if (enemy.healthBarTimer > 0) {
      enemy.healthBarTimer = Math.max(0, enemy.healthBarTimer - delta);
    }
    if (enemy.dotTimer > 0) {
      enemy.dotTimer -= delta;
      revealEnemyHealth(enemy);
      applyDamageToEnemy(enemy, enemy.dotDps * delta);
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
  cleanArrays(enemies, (enemy) => enemy.y > height + 60);
  cleanArrays(floatingTexts, (text) => text.life <= 0);
  cleanArrays(explosions, (boom) => boom.elapsed >= boom.duration);

  handleCollisions();
  if (player.hull <= 0) {
    endMission({ ejected: false });
  }

  mission.score += delta * 15 + mission.difficulty * 2;
}

function cleanArrays(list, predicate) {
  for (let i = list.length - 1; i >= 0; i -= 1) {
    if (predicate(list[i])) list.splice(i, 1);
  }
}

function handleCollisions() {
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
    if (distance(player.x, player.y, enemy.x, enemy.y) < player.radius + enemy.radius) {
      enemies.splice(i, 1);
      const base = enemy.collisionDamage ?? (22 + mission.difficulty * 2);
      applyDamage(base * (enemy.damageScale ?? 1), { collision: true });
      spawnExplosion(enemy.x, enemy.y, enemy.radius, { intensity: 0.55, blend: "lighter", style: "impact" });
    }
  }

  for (let i = enemyBullets.length - 1; i >= 0; i -= 1) {
    const bullet = enemyBullets[i];
    if (distance(player.x, player.y, bullet.x, bullet.y) < player.radius + bullet.radius) {
      enemyBullets.splice(i, 1);
      const base = Number.isFinite(bullet.damage) ? bullet.damage : 14 + mission.difficulty * 1.3;
      applyDamage(base);
    }
  }
}

function handleEnemyDestroyed(enemy, bullet) {
  mission.kills += 1;
  mission.score += enemy.score;
  const creditEarned = creditForEnemy(enemy);
  mission.killCredits += creditEarned;
  spawnCreditPopup(enemy.x, enemy.y, creditEarned);
  spawnExplosion(enemy.x, enemy.y, enemy.radius, { intensity: 0.9, blend: "lighter", style: "kill", coalesce: false });
  playSfx("explosion", 0.135);
  if (enemy.isBoss && mission.level?.completeOnBoss) {
    endMission({ completed: true });
  }
  if (bullet && bullet.vampiric) {
    player.hull = Math.min(player.maxHull, player.hull + bullet.vampiric);
  }
}

function applyDamage(amount, { collision = false } = {}) {
  if (state.debugInvincible) return;
  revealPlayerHealth();
  player.hitTimer = 0.25;
  let shieldHit = false;
  if (player.bulwarkShield > 0) {
    const absorbed = Math.min(player.bulwarkShield, amount);
    player.bulwarkShield -= absorbed;
    amount -= absorbed;
  }
  if (!collision && player.shield > 0) {
    const absorbed = Math.min(player.shield, amount);
    player.shield -= absorbed;
    amount -= absorbed;
    if (absorbed > 0) shieldHit = true;
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
  } else if (shieldHit) {
    playSfx("hit", 0.35);
  }
}

function render() {
  const width = canvas.width / window.devicePixelRatio;
  const height = canvas.height / window.devicePixelRatio;
  ctx.clearRect(0, 0, width, height);

  drawBackground(width, height);

  const showDebrief = debriefPanel && !debriefPanel.hidden;
  const showHangar = hangarPanel && !hangarPanel.hidden;

  if (mission && mission.active) {
    drawPlayer();
    bullets.forEach(drawBullet);
    enemyBullets.forEach((bullet) => drawBullet(bullet, "#f97316"));
    enemies.forEach(drawEnemy);
    explosions.forEach(drawExplosion);
    floatingTexts.forEach(drawFloatingText);
    drawPlayerHealthBar();
  } else if (showHangar && !showDebrief) {
    drawHangarScene(width, height);
  }

  updateHud();
}

function drawBackground(width, height) {
  ctx.fillStyle = "#02030d";
  ctx.fillRect(0, 0, width, height);

  const background =
    (mission && mission.level && assets.backgrounds[mission.level.background]) ||
    assets.backgrounds.blue ||
    assets.background;

  if (background && background.loaded) {
    const img = background.img;
    const scale = width / img.naturalWidth;
    const drawHeight = img.naturalHeight * scale;
    const offset = backgroundScroll % drawHeight;
    ctx.drawImage(img, 0, -offset, width, drawHeight);
    ctx.drawImage(img, 0, drawHeight - offset, width, drawHeight);
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

  if (player.shield > 0) {
    const shieldRatio = Math.max(0.2, player.shield / player.maxShield);
    ctx.fillStyle = `rgba(34, 211, 238, ${0.18 + shieldRatio * 0.22})`;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius + 6, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.strokeStyle = "rgba(248, 113, 113, 0.8)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius + 8, 0, Math.PI * 2);
    ctx.stroke();
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
  if (bullet.shape === "orb") {
    ctx.save();
    const r = bullet.radius || 6;
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
    const rotation = bullet.rotation || 0;
    if (drawSprite(bullet.image, bullet.x - width / 2, bullet.y - height / 2, width, height, rotation)) {
      return;
    }
  }
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
  ctx.fill();
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

  ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
  ctx.beginPath();
  ctx.arc(enemy.x, enemy.y, enemy.radius + 6, 0, Math.PI * 2);
  ctx.fill();

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
  if (enemy.dotTimer > 0) {
    const alpha = Math.min(1, enemy.dotTimer / 3);
    ctx.strokeStyle = `rgba(34, 197, 94, ${0.2 + alpha * 0.4})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, enemy.radius + 10, 0, Math.PI * 2);
    ctx.stroke();
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
  offset += segment(armor, maxArmor, "#334155", offset); // armor: dark gray
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
  offset += segment(armor, maxArmor, "#334155", offset);
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
    hudScore.textContent = "0";
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
    hudScore.textContent = Math.round(mission.score).toString();
    hudTime.textContent = formatTime(mission.elapsed);
    hudCredits.textContent = `${state.credits} (+${runCredits})`;
    updateBossProgress();
  }
  updateConsumableHud();
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

function updateMobileControls() {
  if (!mobileControls) return;
  const inMission = mission && mission.active;
  const inHangar = !inMission && overlay && !overlay.hidden && hangarPanel && !hangarPanel.hidden;
  const inMissionTab = activeHangarTab === "mission";
  mobileControls.hidden = !(inMission || inHangar);

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
  floatingTexts.push({
    x,
    y,
    value: `+${amount}`,
    life: 1.1,
    maxLife: 1.1,
    vy: 30,
  });
}

function drawFloatingText(text) {
  const alpha = Math.max(0, text.life / text.maxLife);
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "#7dd3fc";
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

function applyDamageToEnemy(enemy, damage) {
  // Shields absorb full damage; armor reduces per-hit damage by armorClass.
  // Returns the total applied to any pool (for analytics/feel), but callers
  // should still treat "interaction" as happening even if applied is 0.
  let remaining = Math.max(0, damage);
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
    const effective = Math.max(0, remaining - (enemy.armorClass || 0));
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
  });
}

function drawExplosion(boom) {
  const progress = Math.min(1, boom.elapsed / boom.duration);
  const maxRadius = boom.radius * (2.2 + progress);
  const alpha = 1 - progress;
  const intensity = boom.intensity ?? 1;
  const style = boom.style || "default";

  ctx.save();
  ctx.globalCompositeOperation = boom.blend || "source-over";
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
  } else {
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
    const def = level.enemyTypes[event.type];
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

  if (mission && mission.active && paused) {
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
requestAnimationFrame(gameLoop);
