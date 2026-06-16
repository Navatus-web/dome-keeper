import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const htmlPath = resolve("src/index.html");
const html = readFileSync(htmlPath, "utf8");

const checks = [
  ["declares an HTML document", /<!doctype html>/i],
  ["sets a responsive viewport", /<meta\s+name="viewport"/i],
  ["contains the game canvas", /<canvas[^>]+id="world"/i],
  ["has a custom game cursor", /id="gameCursor"/],
  ["updates custom cursor state", /function\s+updateCursorFromPointer/],
  ["supports day twenty plant growth", /function\s+plantElderMaturity[\s\S]+clamp\(Math\.floor\(gameDay\(\) - item\.bornAt\) \+ 1,\s*1,\s*20\)/],
  ["draws late-stage plant flowers", /function\s+drawFlower/],
  ["has a start button", /id="startBtn"/],
  ["has climate meters", /id="meters"/],
  ["has meter trend indicators", /class="meter-trend steady"/],
  ["updates meter trend indicators", /function\s+updateMeterTrends/],
  ["has a slide-out meters drawer", /id="metersDrawer"/],
  ["has a meters drawer toggle", /id="metersToggle"/],
  ["has shop controls", /id="shop"/],
  ["has a slide-out shop drawer", /id="shopDrawer"/],
  ["has a shop drawer toggle", /id="shopToggle"/],
  ["has a drag-to-delete trash zone", /id="trashZone"/],
  ["deletes dragged items", /function\s+deleteDraggedItem/],
  ["uses illustrated action tiles", /action-icon/],
  ["groups add life options", /shop-heading/],
  ["has decorations group", /Decorations/],
  ["includes earthworms", /id:\s*"earthworm"/],
  ["animates earthworm burrowing", /function\s+updateEarthwormBurrow/],
  ["adds earthworm burrow dust", /function\s+makeBurrowDust/],
  ["includes butterflies", /id:\s*"butterfly"/],
  ["includes rock decoration", /id:\s*"rock"/],
  ["includes second rock decoration", /id:\s*"rockfeature"/],
  ["includes large stick decoration", /id:\s*"stick"[\s\S]+Large Stick/],
  ["uses a compost burst effect", /function\s+makeCompostBurst/],
  ["moss absorbs humidity", /Moss",\s*note:\s*"\+nutrients -humidity"/],
  ["humidity has low-end rebound", /lowHumidityRebound/],
  ["mist leaves lingering dew", /mistCloudDew/],
  ["keeps lifeforms from disappearing", /clamp\(item\.health,\s*78,\s*112\)/],
  ["keeps creatures and decorations fully visible", /item\.type === "creature" \|\| item\.type === "decoration" \? 1/],
  ["ends the game after sustained critical readings", /collapsePressureMs[\s\S]+state\.gameOver\s*=\s*true/],
  ["shows a critical collapse countdown", /Critical \$\{secondsLeft\}s/],
  ["has an assistant gardener panel", /id="assistant"/],
  ["updates assistant advice", /function\s+updateAssistant/],
  ["docks Mira into the top-left panel", /mira-left-docked/],
  ["has a sun moon time dial", /id="timeDial"/],
  ["has an AI autopilot toggle", /id="aiToggle"/],
  ["labels AI takeover mode", /AI: Takeover/],
  ["runs AI emergency interventions", /function\s+runAutopilotIntervention/],
  ["shows AI plan and last action", /Plan: \$\{state\.autopilot\.plan\} Last: \$\{state\.autopilot\.lastAction\}/],
  ["has a pause toggle", /id="pauseToggle"/],
  ["has a speed toggle", /id="speedToggle"/],
  ["has an x8 speed tier", /label:\s*"x8"/],
  ["cycles game speed", /function\s+cycleSpeed/],
  ["has rotate controls", /id="rotateLeft"/],
  ["runs AI autopilot logic", /function\s+runAutopilot/],
  ["runs pause toggle logic", /function\s+togglePause/],
  ["runs rotate table logic", /function\s+rotateTable/],
  ["uses a single pedestal table stand", /function\s+drawTablePedestal/],
  ["locks decorations until day three", /function\s+unlockDecorations/],
  ["shows rocks unlock popup", /You survived 3 days and unlocked features: Rocks/],
  ["uses per-meter color rules", /function\s+meterColor/],
  ["uses accessible region labels", /aria-label=/],
  ["keeps canvas touch input browser-safe", /touch-action:\s*none/],
  ["defines a game loop", /requestAnimationFrame\(/],
  ["does not rely on remote scripts", !/<script[^>]+src=["']https?:\/\//i.test(html)]
];

const failures = checks
  .filter(([, pattern]) => pattern instanceof RegExp ? !pattern.test(html) : !pattern)
  .map(([label]) => label);

if (failures.length) {
  console.error("Static checks failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Static checks passed for ${htmlPath}`);
