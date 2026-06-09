# Dome Keeper Agent Playbook

Use this playbook for ongoing AI-assisted improvement of `dome-keeper`.

## Agent Roles

- `game-designer`: proposes one small player-facing improvement at a time, with acceptance criteria.
- `frontend-engineer`: implements the chosen change in `dome-keeper/src/index.html` or supporting files.
- `qa-playtester`: runs `npm run check`, `npm run test` when dependencies are installed, and captures screenshots for visual changes.
- `release-steward`: keeps CI green, updates this playbook when the loop changes, and summarizes the shipped improvement.

## Loop

1. Generate a backlog with `npm run agent:plan` from `dome-keeper`.
2. Select one improvement that can be verified in a short browser playtest.
3. Make the smallest coherent change.
4. Run fast checks first: `npm run check`.
5. Run browser checks: `npm run test`.
6. Record what changed, what was tested, and what should be tried next.

## Guardrails

- Keep the first screen as the playable game, not a landing page.
- Preserve keyboard, pointer, and touch input.
- Avoid adding remote runtime dependencies to `src/index.html`.
- Verify mobile widths before merging HUD or shop changes.
- Any new visual system should serve gameplay readability before decoration.

## Starting Backlog

- Save progress and recent milestones between sessions.
- Add concise first-run tutorial prompts.
- Tune the HUD and shop layout at mobile widths.
- Add optional sound effects for tending actions.
- Split the monolithic HTML once gameplay changes become hard to review safely.
