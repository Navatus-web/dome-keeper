import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const html = readFileSync(resolve("src/index.html"), "utf8");

const signals = {
  functions: [...html.matchAll(/\bfunction\s+([A-Za-z0-9_]+)/g)].map((match) => match[1]),
  actions: [...html.matchAll(/\{\s*id:\s*"([^"]+)"/g)].map((match) => match[1]),
  ariaLabels: (html.match(/aria-label=/g) || []).length,
  localStorage: /localStorage/.test(html),
  audio: /AudioContext|<audio/i.test(html),
  mobileCss: /@media\s*\(/.test(html)
};

const recommendations = [
  {
    title: "Add a saved terrarium journal",
    reason: signals.localStorage
      ? "The game already appears to touch browser storage, so a journal can extend that system."
      : "Persistent progress would make repeat sessions more meaningful.",
    acceptance: "Players can leave, return, and see recent terrarium milestones."
  },
  {
    title: "Tune mobile HUD density",
    reason: signals.mobileCss
      ? "Responsive CSS exists, so mobile fit can be improved without a redesign."
      : "The current HUD should be checked on narrow screens before adding more controls.",
    acceptance: "No controls overlap the canvas or each other at 360px and 768px widths."
  },
  {
    title: "Add outcome-focused tutorial prompts",
    reason: `The game exposes ${signals.actions.length || "several"} player actions and can teach them through play.`,
    acceptance: "First-time players receive brief prompts only when a mechanic becomes relevant."
  },
  {
    title: "Introduce audio feedback",
    reason: signals.audio
      ? "Audio hooks already exist and can be tuned."
      : "Small procedural sounds would make tending actions feel more alive.",
    acceptance: "Each shop action has a subtle, toggleable feedback sound."
  }
];

console.log("# Dome Keeper Agent Improvement Plan\n");
console.log(`Generated from \`src/index.html\`.\n`);
console.log("## Current Signals\n");
console.log(`- Functions detected: ${signals.functions.length}`);
console.log(`- Player action keys detected: ${signals.actions.length ? signals.actions.join(", ") : "none"}`);
console.log(`- ARIA labels detected: ${signals.ariaLabels}`);
console.log(`- Uses localStorage: ${signals.localStorage ? "yes" : "no"}`);
console.log(`- Has audio hooks: ${signals.audio ? "yes" : "no"}`);
console.log(`- Has media queries: ${signals.mobileCss ? "yes" : "no"}\n`);
console.log("## Recommended Next Agent Tasks\n");

for (const [index, item] of recommendations.entries()) {
  console.log(`${index + 1}. ${item.title}`);
  console.log(`   - Why: ${item.reason}`);
  console.log(`   - Acceptance: ${item.acceptance}`);
}
