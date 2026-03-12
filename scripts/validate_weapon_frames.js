const fs = require("fs");
const path = require("path");

const catalogPath = path.join(__dirname, "..", "items", "weapon_frames.json");
const allowedGunDiameters = new Set(["small", "medium", "large"]);
const allowedSpreads = new Set(["focused", "burst", "wide"]);
const allowedAmmo = new Set(["kinetic", "plasma"]);
const allowedEffects = new Set(["none", "homing", "explosive", "pierce"]);
const allowedDefenseSlots = new Set(["none", "shield", "armor"]);

function fail(message) {
  console.error(`Weapon frame validation failed: ${message}`);
  process.exit(1);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

const raw = fs.readFileSync(catalogPath, "utf8");
const catalog = JSON.parse(raw);

assert(catalog && typeof catalog === "object" && !Array.isArray(catalog), "catalog root must be an object");
assert(catalog.entries && typeof catalog.entries === "object" && !Array.isArray(catalog.entries), "catalog must define entries");

const ids = Object.keys(catalog.entries);
assert(ids.length > 0, "catalog must contain at least one frame");

ids.forEach((id) => {
  const entry = catalog.entries[id];
  assert(entry && typeof entry === "object" && !Array.isArray(entry), `${id} must be an object`);
  assert(typeof entry.name === "string" && entry.name.trim(), `${id} is missing name`);
  assert(typeof entry.description === "string" && entry.description.trim(), `${id} is missing description`);
  assert(Array.isArray(entry.tags), `${id} is missing tags`);
  assert(entry.build && typeof entry.build === "object" && !Array.isArray(entry.build), `${id} is missing build`);

  const build = entry.build;
  assert(allowedGunDiameters.has(build.gunDiameter), `${id} has invalid gunDiameter`);
  assert(allowedSpreads.has(build.spread), `${id} has invalid spread`);
  assert(allowedAmmo.has(build.ammo), `${id} has invalid ammo`);
  assert(allowedEffects.has(build.effect), `${id} has invalid effect`);
  assert(Array.isArray(build.defenseSlots), `${id} has invalid defenseSlots`);
  assert(build.defenseSlots.length <= 2, `${id} has too many defense slots`);
  build.defenseSlots.forEach((slot) => {
    assert(allowedDefenseSlots.has(slot), `${id} has invalid defense slot ${slot}`);
  });
});

console.log(`Validated ${ids.length} weapon frames in ${catalogPath}`);
