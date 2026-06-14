# Dome Keeper

This project houses `Dome Keeper`, a single-page browser game copied from the original downloaded HTML into `src/index.html`.

## Local Commands

```powershell
npm install
npm run check
npm run test
npm run serve
```

The local server defaults to <http://127.0.0.1:4173>.

## Project Layout

- `src/index.html` - the playable game.
- `tests/static-check.mjs` - dependency-free structural checks for fast feedback.
- `tests/game.spec.mjs` - Playwright smoke test for launch and canvas rendering.
- `scripts/serve.mjs` - static dev server used by humans and Playwright.
- `scripts/agent-improvement-plan.mjs` - deterministic backlog generator for agent runs.

## Continuous Improvement Loop

1. Run `npm run agent:plan` to generate a fresh improvement backlog from the current game file.
2. Pick one small item from `.agents/dome-keeper.md` or the generated plan.
3. Modify the game in a narrow branch.
4. Run `npm run check` and, when dependencies are installed, `npm run test`.
5. Open a PR with screenshots or Playwright evidence for any visual/gameplay changes.

The GitHub Actions workflows run static checks, browser smoke tests, and a scheduled improvement-plan job. The agent plan workflow runs every Monday, uploads the generated plan, and opens or updates a GitHub issue labeled `agent-plan` for supervised coding-agent follow-up.
