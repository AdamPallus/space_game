const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const config = JSON.parse(fs.readFileSync(path.join(root, "config", "progression.json"), "utf8"));

function fail(message) {
  console.error(`Campaign progression validation failed: ${message}`);
  process.exit(1);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function stageComplete(stage, completed) {
  return completed.has(stage.hybrid) && stage.choices.some((id) => completed.has(id));
}

function unlocked(levelId, completed) {
  const stageIndex = config.act1Stages.findIndex((stage) => stage.id === levelId);
  if (stageIndex >= 0) {
    return stageIndex === 0 || stageComplete(config.act1Stages[stageIndex - 1], completed);
  }
  const owner = config.act1Stages.find((stage) => stage.choices.includes(levelId));
  return !!owner && completed.has(owner.hybrid);
}

function grade(percent) {
  if (percent >= 100) return "SS";
  if (percent >= 95) return "S";
  if (percent >= 85) return "A";
  if (percent >= 70) return "B";
  if (percent >= 50) return "C";
  return "D";
}

const fresh = new Set();
assert(unlocked("level1", fresh), "fresh pilot must have Mission 1 Hybrid");
assert(!unlocked("level1_swarm", fresh), "Mission 1 Swarm must start locked");
assert(!unlocked("level1_armored", fresh), "Mission 1 Armored must start locked");
assert(!unlocked("level2", fresh), "Mission 2 must start locked");

const hybridOnly = new Set(["level1"]);
assert(unlocked("level1_swarm", hybridOnly), "Mission 1 Hybrid must open Swarm");
assert(unlocked("level1_armored", hybridOnly), "Mission 1 Hybrid must open Armored");
assert(!unlocked("level2", hybridOnly), "Mission 1 Hybrid alone must not open Mission 2");

assert(unlocked("level2", new Set(["level1", "level1_swarm"])), "Swarm route must open Mission 2");
assert(unlocked("level2", new Set(["level1", "level1_armored"])), "Armored route must open Mission 2");

[
  [100, "SS"],
  [99, "S"],
  [95, "S"],
  [94, "A"],
  [85, "A"],
  [84, "B"],
  [70, "B"],
  [69, "C"],
  [50, "C"],
  [49, "D"],
].forEach(([percent, expected]) => assert(grade(percent) === expected, `${percent}% must grade ${expected}`));

console.log("Validated Act 1 hybrid/role graph and mission-rating thresholds.");
