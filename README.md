# TYPINGS OF THE SPEC 📋⌨️

[![version](https://img.shields.io/badge/version-1.0.0-39d0ff)](public/js/main.js)
[![phaser](https://img.shields.io/badge/Phaser-3.87-9cf)](https://phaser.io)
[![static](https://img.shields.io/badge/100%25-static-success)](#build--run)
[![dependencies](https://img.shields.io/badge/npm%20dependencies-0-success)](package.json)
[![license](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![built with Claude](https://img.shields.io/badge/built%20with-Claude-d97757)](https://claude.com/claude-code)

A typing game for **Business Analysts** — a Business-Analyst reskin of
*[Typing of the Dev](https://github.com/stephanecot/typing-of-the-dev)*. Vague
needs, scope creep, contradictory requirements and endless stakeholders crawl
out of the backlog and march toward **your PROJECT**. Type their words to clarify
them before the sprint. French & English UI, CRT look, procedural music,
**100 % static — zero dependency, no server, no tracking**.

**🎮 Play it online: <https://stephanecot.github.io/typing-of-the-spec/>** —
the whole game runs in the browser, nothing to install.

## Requirements

- A modern browser (Chrome, Firefox, Edge, Safari) with WebGL for the best
  rendering — Canvas works as a fallback.
- A keyboard 🙂. The game is 100 % keyboard-driven and works offline: Phaser,
  the font and all sounds are local or procedurally generated.
- **Node.js ≥ 22.5** is only needed to run `npm run check` (the validations) —
  **not** to play.

## Build & run

There is **nothing to build or install** — no bundler, no `npm install`, no
transpilation, no backend. The game is plain ES2022 JavaScript loaded by script
tags; Phaser is vendored in `public/lib/`. Serve the `public/` folder with any
static web server:

```bash
git clone git@github.com:stephanecot/typing-of-the-spec.git
cd typing-of-the-spec/public
python3 -m http.server 8090     # then open http://localhost:8090
```

Deployed automatically to GitHub Pages on every push to `main`
(`.github/workflows/pages.yml`).

### Project layout

```
public/
  index.html         single game page (loads the scripts in order)
  js/main.js         globals: difficulties, palette, modes, version
  js/data/           word banks (BA jargon), ASCII sprites, FR/EN translations
  js/scenes/         Phaser scenes: Boot, Menu, Game, GameOver
  js/audio.js        procedural WebAudio: SFX + 5 music tracks
  js/api.js          inert stubs (the game is fully static, no backend)
scripts/check.mjs    validations (words AZERTY-safe, FR/EN parity, versions)
```

## Gameplay

- Type the **first letter** of an enemy to lock it, finish its word to clarify it
  (spaces inside words are optional — typing the next letter skips them).
- **Game modes** (`I` key on the menu, persisted): **5 SPRINTS + COMEX** (default)
  or **10 SPRINTS + COMEX** — hold the sprints then beat the final boss,
  **LE COMEX EN COLÈRE** (every second left on the clock at victory = bonus points);
  or **ENDLESS** — no timer, no limit, survive as long as you can.
- A need reaching your **PROJET** is a drift; too many drifts → **PROJET DANS LE
  MUR** (and the project visibly burns).
- **Career grades** (difficulty): STAGIAIRE BA · BUSINESS ANALYST · BA SENIOR ·
  PRODUCT OWNER · CHIEF PRODUCT OFFICER.
- A **boss** every 4 sprints (LE COMITÉ DE PILOTAGE) — chain several arbitrations
  to push it back. ENDLESS rotates 10 exclusive bosses: LE SI HISTORIQUE, LA DETTE
  FONCTIONNELLE, LE STAGIAIRE BA, L'AVANT-VENTE, LE BIG BANG, LA RÉUNION SANS FIN,
  LA MÉTHODE DU JOUR, L'AUDIT RGPD, L'AUDIT QUALITÉ, LE DÉPASSEMENT BUDGET.
- **Enemy powers**: some words come **MINIFIED** (letters masked with `?`) or
  **FLIPPED** (rendered upside down); **LE STAKEHOLDER** spams urgent emails.
- **Combo**: no typo = a growing score multiplier. Points = word length × 10 ×
  level × combo × **speed bonus** (fast typing pays up to ×3).
- **Ultimate super combo** (grades ★★★ and up): combo milestones 5/10/15 grant
  +1/+2/+3 **combat stars** (max 6, kept when the combo breaks). Powers — typing
  always has priority, the key only fires when the letter is not a valid
  keystroke: `A` 3 s shield (1★) · `Z` +1 life (3★) · `E` smite the strongest
  enemy, bosses excluded (2★).
- **Items**: `ENTER` → arbitrage (clears the process closest to the project,
  max 3) · `BACKSPACE` → autocomplete (types the next 4 letters, max 5).
- **Golden power-ups**: `café` (slow-mo), `ticket rejeté` (knockback),
  `go nogo` (screen purge).
- `H`: full help (rules, grades, bestiary with spawn rates, bosses, release notes
  — pages scroll with ↑/↓). `L`: French/English. `B`: cycle the 5 music tracks.
  `S`: mute.

## Enemies (17 kinds — full bestiary in-game)

A Business Analyst's daily horrors, from level-1 swarm to level-5 nightmares:

| Lvl | Enemies |
|---|---|
| 1 | BESOIN FLOU · LA COQUILLE · EMAIL URGENT |
| 2 | BESOIN FANTÔME · SCOPE CREEP · USER STORY · SPEC LEGACY · LA DEADLINE |
| 3 | RÈGLE MÉTIER · LE STAKEHOLDER · CAHIER DES CHARGES · EXIGENCE CONTRADICTOIRE · LE FREELANCE |
| 4 | LE CONSULTANT · LE POWERPOINT |
| 5 | L'AVENANT · LE SPONSOR INSPIRÉ |

SCOPE CREEP replicates when killed, USER STORY splits in two, EXIGENCE
CONTRADICTOIRE's word is pure gibberish, L'AVENANT re-encrypts its word every
6 s, and LE SPONSOR INSPIRÉ keeps making other needs longer.

## Difficulties

| | STAGIAIRE BA | BUSINESS ANALYST | BA SENIOR | PRODUCT OWNER | CHIEF PRODUCT OFFICER |
|---|---|---|---|---|---|
| Speed | ×0.70 | ×1.00 | ×1.30 | ×1.60 | ×1.90 |
| Lives | 5 | 4 | 3 | 2 | **1** |
| Score multiplier | ×1 | ×1.5 | ×2 | ×3 | ×4 |
| Boss arbitrations | 2 | 3 | 4 | 5 | 6 |
| Enemies / sprint | 5 → 10 | 6 → 15 | 7 → 20 | 8 → 24 | 9 → 29 |
| Max enemy level | 2 | 3 | 3 | 4 | 5 |

Balancing is uniform: enemy **count** = `waveStart + (n-1)·waveGrowth` and the
**speed** ramp grow on regular steps per grade (see the `DIFFICULTIES` table in
`main.js`). Each enemy level unlocks at the sprint matching its number. STAGIAIRE
BA stays the gentlest: only calm, mechanic-free enemies.

## Music

5 procedural WebAudio tracks (cycle with `B`), intensity follows the waves:
**OPEN SPACE**, **DAILY STANDUP**, **ASCENSEUR**, **DEADLINE**, **TEAM BUILDING**.

## What's NOT in this build

Reskinned and **stripped** from the original *Typing of the Dev*: no Node server,
no leaderboard / score saving, no admin, no GDPR form, **no secret codes** — a
clean, self-contained, offline-first arcade game.

## Stack

- [Phaser 3.87](https://phaser.io), vendored in `public/lib/` (offline)
- VT323 font, CRT look in CSS (scanlines/vignette/flicker — disabled under
  `prefers-reduced-motion`), cyan/blue "corporate" palette
- 100 % procedural WebAudio: SFX + 5 generative music tracks
- No server, no build step, **zero dependency**
- Accessibility: WCAG AA contrasts, reduced-motion support, color-blind-safe
  enemy design (shape + badge redundancy), no `{ } [ ]` in typed words

## Built with AI

Reskinned with [Claude Code](https://claude.com/claude-code) from
*[Typing of the Dev](https://github.com/stephanecot/typing-of-the-dev)*.
