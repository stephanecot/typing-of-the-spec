/* Jeu 100 % statique : aucun backend. Ces fonctions sont des stubs inertes
   (pas de sauvegarde, pas de classement, pas de réglages serveur). */
'use strict';

const Api = {
  async loadConfig() { return {}; },
  async saveGame() { return null; },
  async leaderboard() { return []; },
};
