const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const hudHull = document.getElementById("hud-hull");
const hudShield = document.getElementById("hud-shield");
const hudCredits = document.getElementById("hud-credits");
const hudScore = document.getElementById("hud-score");
const hudTime = document.getElementById("hud-time");
const hudMission = document.getElementById("hud-mission");
const bossLabel = document.getElementById("boss-label");
const bossProgressFill = document.getElementById("boss-progress-fill");

const overlay = document.getElementById("overlay");
const hangarPanel = document.getElementById("hangar");
const debriefPanel = document.getElementById("debrief");
const levelSelectPanel = document.getElementById("level-select");

const pilotRank = document.getElementById("pilot-rank");
const availableCreditsEl = document.getElementById("available-credits");
const lifetimeCreditsEl = document.getElementById("lifetime-credits");
const lastMissionEl = document.getElementById("last-mission");
const upgradeList = document.getElementById("upgrade-list");
const debugUnlock = document.getElementById("debug-unlock");
const debugInvincible = document.getElementById("debug-invincible");
const rmbList = document.getElementById("rmb-list");

const launchBtn = document.getElementById("launch-btn");
const resetBtn = document.getElementById("reset-btn");
const returnBtn = document.getElementById("return-btn");
const levelBackBtn = document.getElementById("level-back-btn");

const debriefText = document.getElementById("debrief-text");
const debriefTime = document.getElementById("debrief-time");
const debriefKills = document.getElementById("debrief-kills");
const debriefCredits = document.getElementById("debrief-credits");
const mobileAltBtn = document.getElementById("mobile-alt");
const mobileAltIcon = document.getElementById("mobile-alt-icon");
const mobileAltLabel = document.getElementById("mobile-alt-label");
const mobileEjectBtn = document.getElementById("mobile-eject");
const mobileLaunchBtn = document.getElementById("mobile-launch");
const mobileControls = document.getElementById("mobile-controls");
const levelList = document.getElementById("level-list");

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
    id: "spread",
    name: "Plasma Spread",
    desc: "Unlocks spread shot, +8% spread damage per level.",
    baseCost: 170,
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
let mission = null;

const player = {
  x: 0,
  y: 0,
  radius: 22,
  velocity: { x: 0, y: 0 },
  hull: 100,
  maxHull: 100,
  shield: 40,
  maxShield: 40,
  shieldCooldown: 0,
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
  eject: new Audio("assets/audio/sci-fi_sounds/Audio/thrusterFire_003.ogg"),
};

Object.values(sfx).forEach((audio) => {
  audio.preload = "auto";
  audio.volume = 0.4;
});

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
  if (!audioEnabled) audioEnabled = true;
  keyState.add(event.key.toLowerCase());
  if (event.key.toLowerCase() === "p") {
    paused = !paused;
  }
  if (event.key.toLowerCase() === "e" && mission && mission.active) {
    endMission({ ejected: true });
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
  audioEnabled = true;
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
    audioEnabled = true;
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

bindMobileButton(mobileLaunchBtn, () => {
  if (!mission || !mission.active) {
    openLevelSelect();
  }
}, () => {});

updateMobileControls();

launchBtn.addEventListener("click", () => {
  openLevelSelect();
});

returnBtn.addEventListener("click", () => {
  debriefPanel.hidden = true;
  hangarPanel.hidden = false;
  overlay.hidden = false;
  if (levelSelectPanel) levelSelectPanel.hidden = true;
  updateMobileControls();
  updateHangar();
});

if (levelBackBtn) {
  levelBackBtn.addEventListener("click", () => {
    if (levelSelectPanel) levelSelectPanel.hidden = true;
    hangarPanel.hidden = false;
    overlay.hidden = false;
    updateMobileControls();
  });
}

resetBtn.addEventListener("click", () => {
  if (!confirm("Reset all pilot progress?")) return;
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
});

if (debugUnlock) {
  debugUnlock.addEventListener("change", () => {
    state.debugUnlock = debugUnlock.checked;
    saveState();
    updateHangar();
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
    if (!parsed.rmbWeapon || parsed.rmbWeapon === "none") {
      parsed.rmbWeapon = "cloak";
    }
    parsed.unlockedLevels = parsed.unlockedLevels ?? 1;
    parsed.debugUnlock = parsed.debugUnlock ?? false;
    parsed.debugInvincible = parsed.debugInvincible ?? false;
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
      rmbWeapon: "cloak",
    };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function upgradeCost(upgradeId) {
  const level = state.upgrades[upgradeId];
  const base = upgrades.find((item) => item.id === upgradeId).baseCost;
  return Math.round(base * Math.pow(1.35, level));
}

function applyUpgrades() {
  const hullLevel = state.upgrades.hull;
  const shieldLevel = state.upgrades.shield;
  const damageLevel = state.upgrades.damage;
  const fireRateLevel = state.upgrades.fireRate;
  const spreadLevel = state.upgrades.spread;
  const auxCooldownLevel = state.upgrades.auxCooldown;
  const cloakDurationLevel = state.upgrades.cloakDuration;

  player.maxHull = Math.round(100 * (1 + hullLevel * 0.08));
  player.maxShield = Math.round(40 * (1 + shieldLevel * 0.1));
  player.hull = player.maxHull;
  player.shield = player.maxShield;
  player.damage = 8 * (1 + damageLevel * 0.1);
  player.fireRate = Math.max(0.12, 0.28 * Math.pow(0.93, fireRateLevel));
  player.spreadLevel = spreadLevel;
  player.altCooldownTime = Math.max(0.35, 0.9 * Math.pow(0.92, auxCooldownLevel));
  player.cloakDuration = 2.5 * (1 + cloakDurationLevel * 0.12);
  player.empDuration = 1.6 * (1 + cloakDurationLevel * 0.12);
  player.bulwarkDuration = 1.2 * (1 + cloakDurationLevel * 0.12);
  player.bulwarkShieldBonus = 200 * (1 + cloakDurationLevel * 0.1);
  player.cloakCooldownTime = Math.max(6, 10 * Math.pow(0.95, auxCooldownLevel));
  player.empCooldownTime = Math.max(5, 8 * Math.pow(0.95, auxCooldownLevel));
}

async function startMission() {
  const level = await ensureLevelLoaded();
  applyUpgrades();
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
  };
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
  paused = false;

  overlay.hidden = true;
  hangarPanel.hidden = true;
  debriefPanel.hidden = true;
  if (levelSelectPanel) levelSelectPanel.hidden = true;
  updateMobileControls();
  hudMission.textContent = level?.name
    ? `Mission ${state.missionCount + 1}: ${level.name}`
    : `Mission ${state.missionCount + 1}`;
}

function endMission({ ejected = false, completed = false } = {}) {
  if (!mission || !mission.active) return;
  mission.active = false;

  const creditReward = creditRewardFor(mission);
  const completionBonus = completed ? 0.1 + Math.random() * 0.15 : 0;
  const penaltyRate = completed || ejected ? 0 : 0.1 + Math.random() * 0.4;
  const finalReward = Math.round(creditReward * (1 - penaltyRate) * (1 + completionBonus));

  state.credits += finalReward;
  state.lifetimeCredits += finalReward;
  state.missionCount += 1;
  state.lastMissionSummary = `${formatTime(mission.elapsed)} | ${mission.kills} kills`;
  if (completed && mission.level?.id) {
    const currentIndex = availableLevels.findIndex((level) => level.id === mission.level.id);
    if (currentIndex !== -1 && state.unlockedLevels <= currentIndex + 1) {
      state.unlockedLevels = Math.min(availableLevels.length, currentIndex + 2);
    }
  }
  saveState();

  if (completed) {
    debriefText.textContent = `Mission complete. Recovery bonus: ${Math.round(
      completionBonus * 100
    )}%.`;
  } else if (ejected) {
    debriefText.textContent = "Ejection successful. Full credits secured.";
    playSfx("eject", 0.5);
  } else {
    debriefText.textContent = `Ship destroyed. Credit loss: ${Math.round(penaltyRate * 100)}%.`;
  }
  debriefTime.textContent = formatTime(mission.elapsed);
  debriefKills.textContent = mission.kills.toString();
  debriefCredits.textContent = finalReward.toString();

  overlay.hidden = false;
  debriefPanel.hidden = false;
  hangarPanel.hidden = true;
  if (levelSelectPanel) levelSelectPanel.hidden = true;
  updateMobileControls();
  updateHangar();
}

function updateHangar() {
  pilotRank.textContent = getPilotRank(state.lifetimeCredits);
  if (availableCreditsEl) {
    availableCreditsEl.textContent = state.credits.toString();
  }
  lifetimeCreditsEl.textContent = state.lifetimeCredits.toString();
  lastMissionEl.textContent = state.lastMissionSummary;
  if (debugUnlock) {
    debugUnlock.checked = !!state.debugUnlock;
  }
  if (debugInvincible) {
    debugInvincible.checked = !!state.debugInvincible;
  }

  upgradeList.innerHTML = "";

  upgrades.forEach((upgrade) => {
  const level = state.upgrades[upgrade.id];
  const cost = upgradeCost(upgrade.id);
  const item = document.createElement("div");
  item.className = "upgrade-item";

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.innerHTML = `
    <span class="name">${upgrade.name} (Lv ${level})</span>
    <span class="desc">${upgrade.desc}</span>
    <span class="cost">Cost: ${cost}/${state.credits}</span>
  `;

  const button = document.createElement("button");
  const maxLevel = upgrade.maxLevel ?? Infinity;
  const canPurchase = level < maxLevel && state.credits >= cost;
  if (level >= maxLevel) {
    button.textContent = "Maxed";
    button.disabled = true;
  } else {
    button.textContent = `${cost}/${state.credits}`;
    button.disabled = !canPurchase;
  }
  if (!canPurchase && level < maxLevel) {
    item.classList.add("locked");
  }
  button.addEventListener("click", () => {
    if (state.credits < cost) return;
    if (level >= maxLevel) return;
      state.credits -= cost;
      state.upgrades[upgrade.id] += 1;
      saveState();
      updateHangar();
    });

    item.appendChild(meta);
    item.appendChild(button);
    upgradeList.appendChild(item);
  });

  renderRmbLoadout();
  updateMobileControls();
}

function openLevelSelect() {
  if (!levelSelectPanel) {
    startMission();
    return;
  }
  hangarPanel.hidden = true;
  debriefPanel.hidden = true;
  levelSelectPanel.hidden = false;
  overlay.hidden = false;
  renderLevelSelect();
  updateMobileControls();
}

function renderLevelSelect() {
  renderLevelSelectAsync();
}

async function renderLevelSelectAsync() {
  if (!levelList) return;
  levelList.innerHTML = "";
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
    button.textContent = isUnlocked ? "Launch" : "Locked";
    button.disabled = !isUnlocked;
    button.addEventListener("click", async () => {
      if (!isUnlocked) return;
      selectedLevelId = level.id;
      currentLevel = null;
      await startMission();
    });
    item.appendChild(meta);
    item.appendChild(button);
    levelList.appendChild(item);
  }
}

const rmbWeapons = [
  {
    id: "cloak",
    name: "Cloaking Device",
    desc: "Break enemy lock-on and reposition.",
  },
  {
    id: "emp",
    name: "EMP Burst",
    desc: "Disable enemy fire and slow ships briefly.",
  },
  {
    id: "bulwark",
    name: "Bulwark Field",
    desc: "Temporary super-shield (invulnerable).",
  },
];

function renderRmbLoadout() {
  if (!rmbList) return;
  rmbList.innerHTML = "";
  rmbWeapons.forEach((weapon) => {
    const item = document.createElement("div");
    item.className = "upgrade-item";
    if (state.rmbWeapon === weapon.id) {
      item.classList.add("active");
    }
    const meta = document.createElement("div");
    meta.className = "meta";
    meta.innerHTML = `
      <span class="name">${weapon.name}</span>
      <span class="desc">${weapon.desc}</span>
    `;
    const button = document.createElement("button");
    button.textContent = state.rmbWeapon === weapon.id ? "Equipped" : "Equip";
    button.disabled = state.rmbWeapon === weapon.id;
    button.addEventListener("click", () => {
      state.rmbWeapon = weapon.id;
      saveState();
      updateHangar();
    });
    item.appendChild(meta);
    item.appendChild(button);
    rmbList.appendChild(item);
  });
  updateMobileControls();
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
  const index = availableLevels.findIndex((level) => level.id === levelId);
  if (index === -1) return false;
  return index < state.unlockedLevels;
}

function spawnEnemyFromSpec(spec) {
  const width = canvas.width / window.devicePixelRatio;
  const height = canvas.height / window.devicePixelRatio;
  const enemy = {
    type: spec.type || "fighter",
    radius: spec.radius ?? 20,
    speed: spec.speed ?? 70,
    hp: spec.hp ?? 20,
    score: spec.score ?? 120,
    baseCredit: spec.baseCredit ?? 14,
    color: spec.color || "#fb7185",
    spriteScale: spec.spriteScale ?? 0.7,
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
    aggroRadius: spec.aggroRadius,
    bulletStyle: spec.bulletStyle,
    patternTime: 0,
  };

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
  enemy.sprite = enemySpriteMap[spriteKey] || assets.enemies[enemy.type] || assets.enemies.fighter;
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
  const base = level?.enemyTypes?.[type] || {};
  return {
    type,
    ...base,
    ...overrides,
  };
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

function firePlayerBullet() {
  const baseSpeed = 560;
  playSfx("laserSmall", 0.25);
  spawnPlayerBullet({
    x: player.x,
    y: player.y - player.radius,
    vx: 0,
    vy: -baseSpeed,
    damage: player.damage,
    image: assets.playerBullet,
  });

  if (player.spreadLevel > 0) {
    const angle = 0.2;
    const vx = Math.sin(angle) * baseSpeed * 0.85;
    const vy = -Math.cos(angle) * baseSpeed * 0.85;
    const spreadDamage = player.damage * (0.45 * (1 + player.spreadLevel * 0.08));
    spawnPlayerBullet({
      x: player.x,
      y: player.y - player.radius,
      vx: -vx,
      vy,
      damage: spreadDamage,
      image: assets.spreadBullet,
    });
    spawnPlayerBullet({
      x: player.x,
      y: player.y - player.radius,
      vx,
      vy,
      damage: spreadDamage,
      image: assets.spreadBullet,
    });
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
  if (mission.empTimer > 0) {
    mission.empTimer = Math.max(0, mission.empTimer - delta);
  }
  if (player.hitTimer > 0) {
    player.hitTimer = Math.max(0, player.hitTimer - delta);
  }
  if (player.cloakTimer > 0) {
    player.cloakTimer = Math.max(0, player.cloakTimer - delta);
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

  if (mission.empTimer <= 0) {
    enemies.forEach((enemy) => {
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

  player.fireCooldown -= delta;
  player.altCooldown -= delta;
  if (pointerButtons.left && player.fireCooldown <= 0) {
    firePlayerBullet();
    player.fireCooldown = player.fireRate;
  }
  if (inputMode === "touch" && touchState.active && player.fireCooldown <= 0) {
    firePlayerBullet();
    player.fireCooldown = player.fireRate;
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

  if (player.shieldCooldown > 0) {
    player.shieldCooldown -= delta;
  } else {
    player.shield = Math.min(player.maxShield, player.shield + delta * 12);
  }

  bullets.forEach((bullet) => {
    bullet.x += bullet.vx * delta;
    bullet.y += bullet.vy * delta;
  });
  enemyBullets.forEach((bullet) => {
    bullet.x += bullet.vx * delta;
    bullet.y += bullet.vy * delta;
  });

  const empFactor = mission.empTimer > 0 ? 0.55 : 1;
  enemies.forEach((enemy) => {
    enemy.patternTime += delta * empFactor;
    if (enemy.pattern === "zigzag") {
      const amplitude = enemy.patternParams.amplitude ?? 90;
      const frequency = enemy.patternParams.frequency ?? 3;
      const t = enemy.patternTime;
      enemy.vx = Math.sin(t * frequency) * amplitude * empFactor;
      enemy.vy = enemy.speed * empFactor;
      enemy.x += enemy.vx * delta;
      enemy.y += enemy.vy * delta;
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

  floatingTexts.forEach((text) => {
    text.y -= text.vy * delta;
    text.life -= delta;
  });
  explosions.forEach((boom) => {
    boom.elapsed += delta;
    boom.rotation += boom.spin * delta;
  });

  cleanArrays(bullets, (bullet) => bullet.y < -20);
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
      if (distance(bullet.x, bullet.y, enemy.x, enemy.y) < bullet.radius + enemy.radius) {
        enemy.hp -= bullet.damage;
        bullets.splice(i, 1);
        if (enemy.hp <= 0) {
          enemies.splice(j, 1);
          mission.kills += 1;
          mission.score += enemy.score;
          const creditEarned = creditForEnemy(enemy);
          mission.killCredits += creditEarned;
          spawnCreditPopup(enemy.x, enemy.y, creditEarned);
          spawnExplosion(enemy.x, enemy.y, enemy.radius);
          playSfx("explosion", 0.135);
          if (enemy.isBoss && mission.level?.completeOnBoss) {
            endMission({ completed: true });
          }
        }
        continue bulletsLoop;
      }
    }
  }

  for (let i = enemies.length - 1; i >= 0; i -= 1) {
    const enemy = enemies[i];
    if (distance(player.x, player.y, enemy.x, enemy.y) < player.radius + enemy.radius) {
      enemies.splice(i, 1);
      applyDamage(22 + mission.difficulty * 2);
      spawnExplosion(enemy.x, enemy.y, enemy.radius);
    }
  }

  for (let i = enemyBullets.length - 1; i >= 0; i -= 1) {
    const bullet = enemyBullets[i];
    if (distance(player.x, player.y, bullet.x, bullet.y) < player.radius + bullet.radius) {
      enemyBullets.splice(i, 1);
      applyDamage(14 + mission.difficulty * 1.3);
    }
  }
}

function applyDamage(amount) {
  if (state.debugInvincible) return;
  player.shieldCooldown = 2.5;
  player.hitTimer = 0.25;
  let shieldHit = false;
  if (player.bulwarkShield > 0) {
    const absorbed = Math.min(player.bulwarkShield, amount);
    player.bulwarkShield -= absorbed;
    amount -= absorbed;
  }
  if (player.shield > 0) {
    const absorbed = Math.min(player.shield, amount);
    player.shield -= absorbed;
    amount -= absorbed;
    if (absorbed > 0) shieldHit = true;
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

  if (mission && mission.active) {
    drawPlayer();
    bullets.forEach(drawBullet);
    enemyBullets.forEach((bullet) => drawBullet(bullet, "#f97316"));
    enemies.forEach(drawEnemy);
    explosions.forEach(drawExplosion);
    floatingTexts.forEach(drawFloatingText);
  } else {
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
    ctx.fillStyle = bullet.color || color;
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.radius || 6, 0, Math.PI * 2);
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
    hudShield.textContent = "-";
    hudScore.textContent = "0";
    hudTime.textContent = "00:00";
    hudCredits.textContent = state.credits.toString();
    if (bossProgressFill) bossProgressFill.style.width = "0%";
    if (bossLabel) bossLabel.textContent = "Boss ETA";
  } else {
    const runCredits = creditRewardFor(mission);
    hudHull.textContent = `${Math.max(0, Math.round(player.hull))}/${Math.round(player.maxHull)}`;
    hudShield.textContent = `${Math.round(player.shield)}/${Math.round(player.maxShield)}`;
    hudScore.textContent = Math.round(mission.score).toString();
    hudTime.textContent = formatTime(mission.elapsed);
    hudCredits.textContent = `${state.credits} (+${runCredits})`;
    updateBossProgress();
  }
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
  mobileControls.hidden = !(inMission || inHangar);

  const hasAlt = state.rmbWeapon !== "none";
  if (mobileLaunchBtn) {
    mobileLaunchBtn.hidden = !inHangar;
  }
  if (mobileAltBtn) {
    mobileAltBtn.hidden = !inMission || !hasAlt;
  }
  if (mobileEjectBtn) {
    mobileEjectBtn.hidden = !inMission;
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

function spawnExplosion(x, y, radius) {
  const duration = 0.55 + radius * 0.01;
  explosions.push({
    x,
    y,
    radius,
    elapsed: 0,
    duration,
    rotation: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 3.5,
  });
}

function drawExplosion(boom) {
  const progress = Math.min(1, boom.elapsed / boom.duration);
  const maxRadius = boom.radius * (2.2 + progress);
  const alpha = 1 - progress;

  ctx.save();
  const gradient = ctx.createRadialGradient(boom.x, boom.y, 0, boom.x, boom.y, maxRadius);
  gradient.addColorStop(0, `rgba(255, 244, 214, ${0.7 * alpha})`);
  gradient.addColorStop(0.45, `rgba(251, 191, 36, ${0.45 * alpha})`);
  gradient.addColorStop(1, "rgba(251, 191, 36, 0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(boom.x, boom.y, maxRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 0.9 * alpha;
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

updateHangar();
requestAnimationFrame(gameLoop);
