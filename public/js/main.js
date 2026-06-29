/* Configuration globale + lancement Phaser. */
'use strict';

const APP_VERSION = 'v1.0.0';

const GAME_W = 1600;
const GAME_H = 900;

/* Temps "par" par sprint : sert au compte à rebours affiché et au bonus de
   temps si le joueur va au bout des sprints. */
const PAR_SECONDS_PER_SPRINT = 60;

/* Palette CYAN/BLEU "corporate" — distincte du vert de Typing of the Dev.
   NB : la clé "green" reste le nom historique de la couleur PRIMAIRE du jeu,
   mais elle porte ici une teinte cyan ; "cyan" devient un accent bleu. */
const PALETTE = {
  bg: 0x04080c,
  green: 0x39d0ff,   // primaire (cyan vif)
  greenDim: 0x1a5f7a,
  amber: 0xffb000,
  red: 0xff4d4d,
  magenta: 0xff5cf0,
  gold: 0xffd76a,
  cyan: 0x7c8cff,    // accent (bleu périwinkle)
  white: 0xeafdff,
};
const CSS = {
  green: '#39d0ff', greenDim: '#1a5f7a', amber: '#ffb000', red: '#ff4d4d',
  magenta: '#ff5cf0', gold: '#ffd76a', cyan: '#7c8cff', white: '#eafdff',
  // même famille que la primaire mais contraste AA (≥4.5:1) : petit texte info
  greenSoft: '#3a9fc4',
};

/* MODES DE JEU (touche I au menu, persistés). Trois modes cyclés dans cet ordre :
   - '5'  : campagne courte, 5 sprints puis LE COMEX EN COLÈRE (mode par défaut) ;
   - '10' : campagne longue, 10 sprints puis LE COMEX EN COLÈRE ;
   - 'inf': INFINI — pas de chrono ni de limite, on enchaîne tant qu'on survit
            (le boss final n'apparaît jamais).
   INFINITE_MODE et CAMPAIGN_SPRINTS sont dérivés de GAME_MODE (cf. applyGameMode). */
const CAMPAIGN_SPRINTS_SHORT = 5;
const CAMPAIGN_SPRINTS_LONG = 10;
const GAME_MODE_ORDER = ['5', '10', 'inf'];
let GAME_MODE = localStorage.getItem('tots-mode');
if (!GAME_MODE_ORDER.includes(GAME_MODE)) GAME_MODE = '5';
let INFINITE_MODE;
let CAMPAIGN_SPRINTS;
function applyGameMode() {
  INFINITE_MODE = GAME_MODE === 'inf';
  CAMPAIGN_SPRINTS = GAME_MODE === '10' ? CAMPAIGN_SPRINTS_LONG : CAMPAIGN_SPRINTS_SHORT;
}
applyGameMode();

/* Accessibilité : coupe secousses de caméra et glitchs cosmétiques quand
   l'OS demande de réduire les animations. */
const REDUCED_MOTION = typeof window.matchMedia === 'function'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Niveaux de difficulté — barème d'équilibrage UNIFORME (cf. waveQueueFor) :
   - speed     : multiplicateur de vitesse, pas réguliers +0,30 (0,70 → 1,90) ;
   - spawnMs   : cadence d'apparition (plus court = plus dense) ;
   - lives     : dérives tolérées avant PROJET DANS LE MUR, pas régulier −1 (5 → 1) ;
   - scoreMult : multiplicateur de score ;
   - maxLen    : longueur max des mots tapés (STAGIAIRE = mots courts) ;
   - bossCmds  : arbitrages à enchaîner pour faire reculer un boss (+1 par cran) ;
   - maxLevel  : palier d'ennemis le plus élevé qui apparaît (1-5) ;
   - waveStart : nombre d'ennemis au sprint 1 ;
   - waveGrowth: ennemis ajoutés par sprint suivant ;
   - bugRatio  : part de besoins de base (le reste = ennemis spéciaux).
   Le NOMBRE d'ennemis par sprint = round(waveStart + (n-1)·waveGrowth). */
const DIFFICULTIES = [
  {
    key: 'facile', label: 'STAGIAIRE BA', tagline: 'Le café est offert',
    labelEn: 'INTERN BA', taglineEn: 'Free coffee included', color: '#39ff7a',
    speed: 0.70, spawnMs: 2200, lives: 5, scoreMult: 1, maxLen: 10,
    bossCmds: 2, maxLevel: 2, waveStart: 5, waveGrowth: 0.5, bugRatio: 0.70,
  },
  {
    key: 'normal', label: 'BUSINESS ANALYST', tagline: 'Le sprint attend',
    labelEn: 'BUSINESS ANALYST', taglineEn: 'The sprint is waiting', color: '#41f2ff',
    speed: 1.00, spawnMs: 1700, lives: 4, scoreMult: 1.5, maxLen: 18,
    bossCmds: 3, maxLevel: 3, waveStart: 6, waveGrowth: 1.0, bugRatio: 0.55,
  },
  {
    key: 'hard', label: 'BA SENIOR', tagline: 'Cadrage un vendredi à 18h59',
    labelEn: 'SENIOR BA', taglineEn: 'Scoping on Friday at 6:59pm', color: '#ffb000',
    speed: 1.30, spawnMs: 1350, lives: 3, scoreMult: 2, maxLen: 99,
    bossCmds: 4, maxLevel: 3, waveStart: 7, waveGrowth: 1.4, bugRatio: 0.50,
  },
  {
    key: 'cto', label: 'PRODUCT OWNER', tagline: 'Deux arbitrages. En comité depuis 1999.',
    labelEn: 'PRODUCT OWNER', taglineEn: 'Two calls. In committee since 1999.', color: '#ff3b3b',
    speed: 1.60, spawnMs: 1050, lives: 2, scoreMult: 3, maxLen: 99,
    bossCmds: 5, maxLevel: 4, waveStart: 8, waveGrowth: 1.8, bugRatio: 0.48,
  },
  {
    key: 'ultime', label: 'CHIEF PRODUCT OFFICER', tagline: 'Même Jira a peur de vous.',
    labelEn: 'CHIEF PRODUCT OFFICER', taglineEn: 'Even Jira fears you.', color: '#ff5cf0',
    speed: 1.90, spawnMs: 850, lives: 1, scoreMult: 4, maxLen: 99,
    bossCmds: 6, maxLevel: 5, waveStart: 9, waveGrowth: 2.2, bugRatio: 0.45,
  },
];

const FONT = '"VT323", monospace';

window.addEventListener('load', () => {
  const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: GAME_W,
    height: GAME_H,
    backgroundColor: '#04080c',
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [BootScene, MenuScene, GameScene, GameOverScene],
  };
  window.game = new Phaser.Game(config);
});
