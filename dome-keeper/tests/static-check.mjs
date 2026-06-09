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
  ["has shop controls", /id="shop"/],
  ["has an assistant gardener panel", /id="assistant"/],
  ["updates assistant advice", /function\s+updateAssistant/],
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
