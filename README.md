# TYPINGS OF THE SPEC 📋⌨️

[![version](https://img.shields.io/badge/version-1.0.0-39ff7a)](public/js/main.js)
[![phaser](https://img.shields.io/badge/Phaser-3.87-9cf)](https://phaser.io)
[![static](https://img.shields.io/badge/100%25-static-success)](#)

Arcade typing game for **Business Analysts** — a Business-Analyst reskin of
*Typing of the Dev*. Vague needs, scope creep, contradictory requirements and
endless stakeholders march toward **your PROJECT**; type their words to clarify
them before the sprint. French & English UI, CRT look, procedural music,
**100 % static — zero dependency, no server**.

## Play

Open `public/index.html` through any static web server (the game is fully
client-side). For example:

```bash
cd public && python3 -m http.server 8090
# then open http://localhost:8090
```

Deployed automatically to GitHub Pages on every push to `main`
(`.github/workflows/pages.yml`).

## Gameplay

- Type the **first letter** of an enemy to lock it, finish its word to clarify it
  (spaces are optional). A typo resets your combo.
- **Game modes** (`I` on the menu): **5 SPRINTS + COMEX** (default) or **10
  SPRINTS + COMEX** — hold the sprints then beat the final boss, **LE COMEX EN
  COLÈRE**; or **ENDLESS** — survive as long as you can.
- A vague need reaching your PROJECT is a drift; too many → **PROJET DANS LE MUR**.
- **Career grades** (difficulty): STAGIAIRE BA · BUSINESS ANALYST · BA SENIOR ·
  PRODUCT OWNER · CHIEF PRODUCT OFFICER.
- **Items**: `ENTER` → arbitrage (clears the closest need) · `BACKSPACE` →
  autocomplete (types the next letters). **Golden power-ups**: café, ticket
  rejeté, go/nogo.
- A **boss** every 4 sprints (COMITÉ DE PILOTAGE + 10 endless bosses: LE SI
  HISTORIQUE, LA DETTE FONCTIONNELLE, LA RÉUNION SANS FIN, L'AUDIT RGPD…).
- `H`: full help & bestiary · `L`: FR/EN · `B`: cycle the music · `S`: mute.

## The menagerie (a BA's daily horrors)

BESOIN FLOU · LA COQUILLE · BESOIN FANTÔME · SCOPE CREEP · USER STORY · SPEC
LEGACY · LA DEADLINE · RÈGLE MÉTIER · LE STAKEHOLDER · CAHIER DES CHARGES ·
EXIGENCE CONTRADICTOIRE · LE FREELANCE · LE CONSULTANT · LE POWERPOINT ·
L'AVENANT · LE SPONSOR INSPIRÉ.

## What's NOT in this build

Reskinned and **stripped** from the original *Typing of the Dev*: no Node
server, no leaderboard / score saving, no admin, no GDPR form, **no secret
codes** — a clean, self-contained, offline-first arcade game.

## Project structure

```
public/
  index.html          single page, loads the scripts in order
  js/main.js          globals: difficulties, palette, modes, version
  js/data/            word banks (BA jargon), ASCII sprites, FR/EN i18n
  js/scenes/          Phaser scenes: Boot, Menu, Game, GameOver
  js/audio.js         procedural WebAudio: SFX + 5 music tracks
scripts/check.mjs     validations (words AZERTY-safe, FR/EN parity, versions)
```

Run `npm run check` (Node ≥ 22.5) before committing — it validates the typed
words (no `{ } [ ]`, no accents), FR/EN i18n parity, bestiary sprite refs, and
that the versions stay in sync.

## Stack

- [Phaser 3.87](https://phaser.io), vendored in `public/lib/` (offline)
- VT323 font, CRT look in CSS (disabled under `prefers-reduced-motion`)
- 100 % procedural WebAudio music (5 generative tracks)
- Accessibility: WCAG AA contrasts, reduced-motion support, no `{ } [ ]` in words

## Built with AI

Reskinned with [Claude Code](https://claude.com/claude-code) from
*Typing of the Dev*.
