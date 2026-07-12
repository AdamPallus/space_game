const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const progressionPath = path.join(root, "config", "progression.json");
const economyPath = path.join(root, "config", "economy.json");
const itemPoolPath = path.join(root, "items", "item_pool.json");
const levelManifestPath = path.join(root, "levels", "manifest.json");

function fail(message) {
  console.error(`Progression config validation failed: ${message}`);
  process.exit(1);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

const config = JSON.parse(fs.readFileSync(progressionPath, "utf8"));
const economy = JSON.parse(fs.readFileSync(economyPath, "utf8"));
const itemPool = JSON.parse(fs.readFileSync(itemPoolPath, "utf8"));
const levelManifest = JSON.parse(fs.readFileSync(levelManifestPath, "utf8"));
const missionIds = new Set(Array.from({ length: 8 }, (_, index) => `level${index + 1}`));
const expectedCapabilities = new Set([
  "consumableBay1",
  "miniWeapon",
  "empSupport",
  "armorSealant",
  "primaryBay2",
  "damageOvercharge",
  "hullLicenses",
  "bulwarkSupport",
  "consumableBay2",
]);
const consumableIds = new Set((economy.consumables || []).map((item) => item.id));
const validRarities = new Set(["scrap", "certified", "prototype", "preFounding", "heirloom"]);

assert(config && typeof config === "object" && !Array.isArray(config), "root must be an object");
assert(config.version === 1, "version must be 1");
assert(config.capabilities && typeof config.capabilities === "object", "capabilities are required");
assert(config.firstClearRewards && typeof config.firstClearRewards === "object", "firstClearRewards are required");
assert(Array.isArray(config.act1Stages) && config.act1Stages.length === 8, "act1Stages must define eight stages");
config.act1Stages.forEach((stage, index) => {
  const expectedId = `level${index + 1}`;
  assert(stage.id === expectedId && stage.hybrid === expectedId, `act1Stages[${index}] must define ${expectedId}`);
  assert(
    Array.isArray(stage.choices) && stage.choices.length === 2,
    `${expectedId} must define two role choices`
  );
  const manifestChoices = levelManifest.variants?.[expectedId] || [];
  stage.choices.forEach((choice) => assert(manifestChoices.includes(choice), `${expectedId} has unknown choice ${choice}`));
  const expectedNext = index === 7 ? "act2_dead_air" : `level${index + 2}`;
  assert(stage.next === expectedNext, `${expectedId} must lead to ${expectedNext}`);
});

const capabilityIds = Object.keys(config.capabilities);
expectedCapabilities.forEach((id) => assert(capabilityIds.includes(id), `missing capability ${id}`));
assert(capabilityIds.length === expectedCapabilities.size, "unknown capability id present");
capabilityIds.forEach((id) => {
  const entry = config.capabilities[id];
  assert(missionIds.has(entry.stageId), `${id} has invalid stageId`);
  assert(typeof entry.label === "string" && entry.label.trim(), `${id} is missing label`);
  assert(typeof entry.requirement === "string" && entry.requirement.trim(), `${id} is missing requirement`);
});

const rewardIds = new Set();
["level1", "level2", "level3", "level4", "level5"].forEach((missionId) => {
  assert(Array.isArray(config.firstClearRewards[missionId]), `missing first-clear rewards for ${missionId}`);
});
Object.entries(config.firstClearRewards).forEach(([missionId, rewards]) => {
  assert(missionIds.has(missionId), `reward table has invalid mission ${missionId}`);
  assert(Array.isArray(rewards) && rewards.length, `${missionId} rewards must be a non-empty array`);
  rewards.forEach((reward) => {
    assert(typeof reward.id === "string" && reward.id.trim(), `${missionId} reward is missing id`);
    assert(!rewardIds.has(reward.id), `duplicate reward id ${reward.id}`);
    rewardIds.add(reward.id);
    assert(typeof reward.label === "string" && reward.label.trim(), `${reward.id} is missing label`);
    if (reward.type === "consumable") {
      assert(
        Object.keys(reward).every((key) => ["id", "type", "consumableId", "quantity", "autoEquipSlot", "label"].includes(key)),
        `${reward.id} has an unknown field`
      );
      assert(consumableIds.has(reward.consumableId), `${reward.id} has invalid consumableId`);
      assert(Number.isInteger(reward.quantity) && reward.quantity > 0, `${reward.id} quantity must be positive`);
      assert(
        reward.autoEquipSlot === undefined || reward.autoEquipSlot === 0 || reward.autoEquipSlot === 1,
        `${reward.id} has invalid autoEquipSlot`
      );
    } else if (reward.type === "requisition") {
      assert(
        Object.keys(reward).every((key) => ["id", "type", "slotType", "installTarget", "rarity", "label", "offers"].includes(key)),
        `${reward.id} has an unknown field`
      );
      assert(validRarities.has(reward.rarity), `${reward.id} has invalid rarity`);
      assert(["primary", "mini"].includes(reward.slotType), `${reward.id} has invalid slotType`);
      assert(
        reward.installTarget === (reward.slotType === "mini" ? "mini" : "primary-2"),
        `${reward.id} has invalid installTarget`
      );
      assert(Array.isArray(reward.offers) && reward.offers.length >= 3, `${reward.id} needs at least 3 offers`);
      const offered = new Set();
      reward.offers.forEach((offer) => {
        assert(typeof offer.role === "string" && offer.role.trim(), `${reward.id} offer is missing role`);
        assert(itemPool.entries?.[offer.baseId], `${reward.id} has unknown baseId ${offer.baseId}`);
        assert(itemPool.entries[offer.baseId].slotType === reward.slotType, `${offer.baseId} must be ${reward.slotType}`);
        assert(!offered.has(offer.baseId), `${reward.id} repeats ${offer.baseId}`);
        offered.add(offer.baseId);
      });
    } else {
      fail(`${reward.id} has unknown type ${reward.type}`);
    }
  });
});

console.log(`Validated ${capabilityIds.length} capabilities and ${rewardIds.size} first-clear rewards in ${progressionPath}`);
