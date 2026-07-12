#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const economy = JSON.parse(fs.readFileSync(path.join(root, "config", "economy.json"), "utf8"));
const progression = JSON.parse(fs.readFileSync(path.join(root, "config", "progression.json"), "utf8"));
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

const supplies = new Map((economy.consumables || []).map((item) => [item.id, item]));
const expected = {
  shieldBoost: { kind: "shieldOvercharge", targetRate: 1.25, cost: 900 },
  armorSealant: { kind: "armorSealant", targetRate: 1, cost: 1400 },
  redlineImpulse: { kind: "impulseBoost", impulseBonus: 1, duration: 10, cooldown: 10, cost: 2200 },
  sustainedImpulse: { kind: "impulseBoost", impulseBonus: 0.4, duration: 30, cooldown: 30, cost: 1600 },
};

assert(supplies.size === Object.keys(expected).length, "exactly four mission supplies must be configured");
Object.entries(expected).forEach(([id, contract]) => {
  const item = supplies.get(id);
  assert(item, `missing supply ${id}`);
  if (!item) return;
  assert(item.cost === contract.cost, `${id} must cost ${contract.cost}`);
  if (contract.cooldown !== undefined) {
    assert(item.cooldown === contract.cooldown, `${id}.cooldown must equal its ${contract.duration}s effect duration`);
  }
  assert(item.effect?.kind === contract.kind, `${id} must use ${contract.kind}`);
  ["targetRate", "impulseBonus", "duration"].forEach((field) => {
    if (contract[field] !== undefined) {
      assert(item.effect?.[field] === contract[field], `${id}.${field} must equal ${contract[field]}`);
    }
  });
});

const authorization = economy.supplyAuthorization || {};
assert(authorization.chaptersPerCharge === 4, "authorization must earn one charge per four chapters");
assert(authorization.maxChargesPerBay === 3, "authorization must cap each bay at three charges");
assert(authorization.fieldActivationThreshold === 0.1, "field supplies must require 10% missing base capacity");
assert(Number.isInteger(authorization.devWaiversPerType) && authorization.devWaiversPerType > 0, "DEV waivers must be positive");

const redlineFactor = 1 + expected.redlineImpulse.impulseBonus;
const sustainedFactor = 1 + expected.sustainedImpulse.impulseBonus;
assert(
  Math.abs(redlineFactor * sustainedFactor - 2.8) < 1e-9,
  "distinct impulse supplies must define a 2.8x multiplicative overlap"
);

const consumableRewards = Object.values(progression.firstClearRewards || {})
  .flat()
  .filter((reward) => reward.type === "consumable");
const rewardIds = new Set(consumableRewards.map((reward) => reward.consumableId));
["shieldBoost", "armorSealant", "redlineImpulse", "sustainedImpulse"].forEach((id) => {
  assert(rewardIds.has(id), `${id} needs a first-clear fee waiver`);
});

if (failures.length) {
  failures.forEach((failure) => console.error(`validate_supply_contract: ${failure}`));
  process.exit(1);
}

console.log("validate_supply_contract: OK (per-use settlement, trust charges, exact defense and impulse effects)");
