/* Fin de partie : stats de la partie, puis rejouer ou retour menu.
   Jeu 100 % statique : aucun enregistrement, aucun classement. */
'use strict';

class GameOverScene extends Phaser.Scene {
  constructor() { super('GameOver'); }

  init(data) {
    this.diff = data.difficulty;
    this.results = data.results;
  }

  create() {
    const r = this.results;
    const cx = GAME_W / 2;

    this.add.text(cx, 90, r.won ? T('goWin') : 'POST-MORTEM', {
      fontFamily: FONT, fontSize: '72px', color: r.won ? CSS.green : CSS.red, align: 'center',
    }).setOrigin(0.5);
    this.add.text(cx, 152, `${T('goDiff')} ${diffLabel(this.diff)}`, {
      fontFamily: FONT, fontSize: '26px', color: this.diff.color || CSS.magenta,
    }).setOrigin(0.5);

    const kills = r.kills;
    const lines = [
      ['SCORE', String(r.score)],
      [T('statSprints'), String(r.wave)],
      [T('statSpeed'), `${r.wpm} ${T('wpmUnit')}`],
      [T('statAccuracy'), `${r.accuracy}%`],
      ['COMBO MAX', `x${r.maxCombo}`],
      [T('statBugs'), String((kills.bug || 0) + (kills.legacy || 0) + (kills.deadline || 0))],
      [T('statBosses'), String(kills.boss || 0)],
    ];
    if (r.won && r.timeBonus) lines.push([T('timeBonus'), `+${r.timeBonus}`]);
    lines.forEach(([k, v], i) => {
      const y = 244 + i * 52;
      this.add.text(cx - 280, y, k, { fontFamily: FONT, fontSize: '32px', color: CSS.greenDim })
        .setOrigin(0, 0.5);
      const val = this.add.text(cx + 280, y, v, { fontFamily: FONT, fontSize: '36px', color: CSS.green })
        .setOrigin(1, 0.5).setAlpha(0);
      this.tweens.add({ targets: val, alpha: 1, duration: 200, delay: 300 + i * 150 });
    });
    this.time.delayedCall(350, () => Sfx.waveClear());

    const hint = this.add.text(cx, GAME_H - 80, T('replay'), {
      fontFamily: FONT, fontSize: '34px', color: CSS.white, align: 'center',
    }).setOrigin(0.5);
    this.tweens.add({ targets: hint, alpha: 0.3, duration: 600, yoyo: true, repeat: -1 });

    // retour menu auto (stand : éviter un écran figé)
    this.idleTimer = this.time.delayedCall(60000, () => this.backToMenu());
    this.input.keyboard.on('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') this.scene.start('Game', { difficulty: this.diff });
      else if (e.key === 'm' || e.key === 'M' || e.key === 'Escape') this.backToMenu();
      else this.idleTimer.reset({ delay: 60000, callback: () => this.backToMenu() });
    });
  }

  backToMenu() { this.scene.start('Menu'); }
}
