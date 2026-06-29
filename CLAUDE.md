# TYPINGS OF THE SPEC — maintenance guide

Arcade typing game for Business Analysts (a Business-Analyst reskin of *Typing
of the Dev*). Vendored Phaser 3, **100 % static, zero dependency, no server**.

## Run & test

```bash
cd public && python3 -m http.server 8090   # http://localhost:8090
npm run check                              # validations — RUN BEFORE EVERY COMMIT
```

The game is fully client-side: open `public/index.html` via any static server.
Deploy = push to `main` → GitHub Pages (`.github/workflows/pages.yml`).

## Architecture (what lives where)

| File | Role |
|---|---|
| `public/js/main.js` | globals: `DIFFICULTIES`, `PALETTE`/`CSS`, `GAME_CONFIG`, `APP_VERSION`, game modes (`GAME_MODE`, `INFINITE_MODE`, `CAMPAIGN_SPRINTS`), `REDUCED_MOTION` |
| `public/js/data/i18n.js` | ALL UI text, FR then EN (`T(key)`, `LANG`, `setLang`); bestiary; release notes |
| `public/js/data/words.js` | typed-word banks (BA jargon; `WORDS`, EN variants in `WORDS.en`, `wordBank()`) |
| `public/js/data/ascii.js` | ASCII sprites (`ASCII`, `pickArt`) — BA-themed |
| `public/js/audio.js` | SFX + 5 procedural music tracks (`TRACKS`) |
| `public/js/scenes/GameScene.js` | gameplay; `waveQueueFor()` (pure, deterministic) |
| `public/js/scenes/MenuScene.js` | menu, 5-page help, music/language/mode selectors |
| `public/js/api.js` | inert stubs (no backend) |

## Invariants — NEVER break these

1. **Zero dependencies, no build step, no server**: plain ES2022 JS in script tags. Node ≥ 22.5 only for `npm run check`.
2. **Typed words**: never `{ } [ ]` (painful on AZERTY), never accented characters, lowercase except CamelCase (`exceptions` bank). Keep short words for STAGIAIRE (`maxLen: 10`).
3. **i18n**: every FR key has an EN counterpart with the same structure; FR-specific word banks have an EN variant in `WORDS.en` → access via `wordBank()`.
4. **Typing always has priority** over action keys (go through `isValidKeystroke()`).
5. **Accessibility**: AA contrast; every animation respects `REDUCED_MOTION`; ≤ ~2.5 flashes/s; color info always doubled (shape/badge/fill).
6. Wave composition lives in `waveQueueFor()` (pure, deterministic) — no `Math.random()` inside.

## Theme

Business Analyst universe: the player defends **LE PROJET**; enemies are vague
needs, scope creep, stakeholders, user stories, the COMITÉ DE PILOTAGE and the
final boss **LE COMEX EN COLÈRE**. Player-facing text: casual-correct FR with an
equivalent EN; sober office humour.

## Style & commits

- Game code/comments in French, sober tone. AI/tooling files in English.
- Commit messages in French without accents, descriptive. **Always `npm run check` before committing.**
