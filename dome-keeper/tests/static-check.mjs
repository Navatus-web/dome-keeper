import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const htmlPath = resolve("src/index.html");
const html = readFileSync(htmlPath, "utf8");

const checks = [
  ["declares an HTML document", /<!doctype html>/i],
  ["sets a responsive viewport", /<meta\s+name="viewport"/i],
  ["contains the game canvas", /<canvas[^>]+id="world"/i],
  ["has a start button", /id="startBtn"/],
  ["has climate meters", /id="meters"/],
  ["has a slide-out meters drawer", /id="metersDrawer"/],
  ["has a meters drawer toggle", /id="metersToggle"/],
  ["has shop controls", /id="shop"/],
  ["has a slide-out shop drawer", /id="shopDrawer"/],
  ["has a shop drawer toggle", /id="shopToggle"/],
  ["uses illustrated action tiles", /action-icon/],
  ["groups add life options", /shop-heading/],
  ["has decorations group", /Decorations/],
  ["includes earthworms", /id:\s*"earthworm"/],
  ["includes butterflies", /id:\s*"butterfly"/],
  ["includes rock decoration", /id:\s*"rock"/],
  ["includes second rock decoration", /id:\s*"rockfeature"/],
  ["uses a compost burst effect", /function\s+makeCompostBurst/],
  ["moss absorbs humidity", /Moss",\s*note:\s*"\+nutrients -humidity"/],
  ["keeps lifeforms from disappearing", /clamp\(item\.health,\s*78,\s*112\)/],
  ["keeps creatures and decorations fully visible", /item\.type === "creature" \|\| item\.type === "decoration" \? 1/],
  ["has an assistant gardener panel", /id="assistant"/],
  ["updates assistant advice", /function\s+updateAssistant/],
  ["docks Mira into the top-left panel", /mira-left-docked/],
  ["has a sun moon time dial", /id="timeDial"/],
  ["has an AI autopilot toggle", /id="aiToggle"/],
  ["has a pause toggle", /id="pauseToggle"/],
  ["has rotate controls", /id="rotateLeft"/],
  ["runs AI autopilot logic", /function\s+runAutopilot/],
  ["runs pause toggle logic", /function\s+togglePause/],
  ["runs rotate table logic", /function\s+rotateTable/],
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
