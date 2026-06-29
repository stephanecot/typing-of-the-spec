/* Menu : titre glitché, sélection de difficulté (flèches + Entrée), top 5. */
'use strict';

class MenuScene extends Phaser.Scene {
  constructor() { super('Menu'); }

  create() {
    this.selected = 1; // normal par défaut
    this.helpOpen = false;
    this.briefingOpen = false; // écran "comment jouer" avant le lancement
    this.buildTitle();
    this.buildDifficulties();
    this.buildFooter();
    this.buildHelp();

    this.input.keyboard.on('keydown', (e) => {
      Sfx.ensure();
      if (!Music.playing) Music.start(0); // ambiance d'accueil, plus douce
      if (this.briefingOpen) {
        if (e.key === 'Enter' || e.key === ' ') this.startGame();
        else if (e.key === 'Escape') this.closeBriefing();
        else if (e.key === 'h' || e.key === 'H') { this.closeBriefing(); this.toggleHelp(); }
        return;
      }
      if (this.helpOpen) {
        if (e.key === 'ArrowLeft') this.changeHelpPage(-1);
        else if (e.key === 'ArrowRight') this.changeHelpPage(1);
        else if (e.key === 'ArrowUp') this.scrollHelp(-1);
        else if (e.key === 'ArrowDown') this.scrollHelp(1);
        else if (e.key === 'h' || e.key === 'H' || e.key === 'Escape' || e.key === 'Enter') this.toggleHelp();
        return;
      }
      if (e.key === 'h' || e.key === 'H') this.toggleHelp();
      else if (e.key === 'l' || e.key === 'L') this.toggleLang();
      else if (e.key === 'b' || e.key === 'B') this.cycleMusic();
      else if (e.key === 'i' || e.key === 'I') this.toggleInfinite();
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') this.move(-1);
      else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') this.move(1);
      else if (e.key === 'Enter' || e.key === ' ') this.launch();
      else if (e.key === 's' || e.key === 'S' || e.key === 'F2') Sfx.toggleMute();
      else if (e.key >= '1' && e.key <= String(DIFFICULTIES.length)) { this.selected = +e.key - 1; this.refreshDiff(); }
    });

    if (REDUCED_MOTION) this.cameras.main.shake = () => this.cameras.main;
    this.buildBriefing();
    this.cameras.main.fadeIn(400, 5, 10, 7);
  }

  /* I : cycle les 3 modes (5 sprints → 10 sprints → infini), persisté. */
  toggleInfinite() {
    const next = (GAME_MODE_ORDER.indexOf(GAME_MODE) + 1) % GAME_MODE_ORDER.length;
    GAME_MODE = GAME_MODE_ORDER[next];
    localStorage.setItem('totd-mode', GAME_MODE);
    applyGameMode();
    Sfx.blip(12);
    if (this.modeLabel) this.modeLabel.setText(T('menuMode')(GAME_MODE));
  }

  /* B : fait défiler les 5 pistes musicales — pré-écoute immédiate, persistée. */
  cycleMusic() {
    Sfx.ensure();
    const name = Music.setTrack(Music.trackIndex + 1);
    if (!Music.playing) Music.start(0);
    Sfx.blip(16);
    if (this.musicLabel) this.musicLabel.setText(T('menuMusic')(name));
  }

  /* Bascule FR ⇄ EN puis reconstruit le menu (tous les textes sont recréés). */
  toggleLang() {
    setLang(LANG === 'fr' ? 'en' : 'fr');
    Sfx.blip(14);
    this.scene.restart();
  }

  /* Aide en 5 pages : règles, difficultés, bestiaire, boss, notes de version.
     Navigation ←/→, défilement ↑/↓, fermeture H / ÉCHAP. */
  buildHelp() {
    const cx = GAME_W / 2;
    this.helpPage = 0;
    this.helpPanel = this.add.container(0, 0).setDepth(90).setVisible(false);
    this.helpPanel.add(this.add.rectangle(cx, GAME_H / 2, GAME_W, GAME_H, 0x020503, 0.94));

    this.helpPages = [this.buildHelpRules(), this.buildHelpDiffs(), this.buildHelpEnemies(),
      this.buildHelpBosses(), this.buildHelpNotes()];
    // masque de défilement : le contenu coulisse sous la ligne d'aide du bas
    const maskShape = this.make.graphics({ add: false }).fillRect(0, 0, GAME_W, 818);
    const pageMask = maskShape.createGeometryMask();
    this.helpScroll = 0;
    this.helpMaxScroll = 0;
    this.helpPages.forEach((p) => {
      this.helpPanel.add(p);
      p.setMask(pageMask);
    });

    this.helpHint = this.add.text(cx, GAME_H - 50, '', {
      fontFamily: FONT, fontSize: '32px', color: CSS.green,
    }).setOrigin(0.5);
    this.tweens.add({ targets: this.helpHint, alpha: 0.3, duration: 600, yoyo: true, repeat: -1 });
    this.helpPanel.add(this.helpHint);
    this.refreshHelpPage();
  }

  refreshHelpPage() {
    this.helpPages.forEach((p, i) => p.setVisible(i === this.helpPage));
    const page = this.helpPages[this.helpPage];
    this.helpScroll = 0;
    page.setY(0);
    // de combien cette page déborde-t-elle ? (défilement ↑/↓)
    this.helpMaxScroll = Math.max(0, Math.round(page.getBounds().bottom) - 812);
    this.helpHint.setText(T('helpPageHint')(this.helpPage + 1, this.helpPages.length));
  }

  scrollHelp(dir) {
    if (this.helpMaxScroll <= 0) return;
    this.helpScroll = Phaser.Math.Clamp(this.helpScroll + dir * 80, 0, this.helpMaxScroll);
    this.helpPages[this.helpPage].setY(-this.helpScroll);
  }

  changeHelpPage(dir) {
    this.helpPage = Phaser.Math.Wrap(this.helpPage + dir, 0, this.helpPages.length);
    Sfx.blip(12);
    this.refreshHelpPage();
  }

  // page 1 : règles — flux sur 2 colonnes (retour à la ligne automatique),
  // une section qui ne tient plus en bas de colonne passe dans la suivante
  buildHelpRules() {
    const cx = GAME_W / 2;
    const page = this.add.container(0, 0);
    // textes dans i18n.js ; les couleurs suivent l'ordre des sections
    const colors = [CSS.cyan, CSS.green, CSS.amber, CSS.cyan, CSS.red, CSS.gold, CSS.magenta];
    const sections = T('helpSections').map(([title, lines], i) => [title, colors[i] || CSS.white, lines]);

    page.add(this.add.text(cx, 60, T('helpTitle'), {
      fontFamily: FONT, fontSize: '48px', color: CSS.amber,
    }).setOrigin(0.5));

    const COLS = [110, 815];
    const COL_W = 660;
    const TOP = 112, BOTTOM = 806;
    let col = 0;
    let y = TOP;
    for (const [title, color, lines] of sections) {
      const titleTxt = this.add.text(0, 0, `-- ${title} --`, {
        fontFamily: FONT, fontSize: '26px', color,
      });
      const lineTxts = lines.map((line) => this.add.text(0, 0, line, {
        fontFamily: FONT, fontSize: '22px', color: CSS.white,
        wordWrap: { width: COL_W - 22 },
      }).setAlpha(0.92));
      const height = 34 + lineTxts.reduce((acc, t) => acc + t.height + 3, 0);
      if (y + height > BOTTOM && col < COLS.length - 1) { col = 1; y = TOP; }
      titleTxt.setPosition(COLS[col], y);
      page.add(titleTxt);
      let yy = y + 34;
      for (const t of lineTxts) {
        t.setPosition(COLS[col] + 22, yy);
        page.add(t);
        yy += t.height + 3;
      }
      y = yy + 14;
    }
    return page;
  }

  // page 2 : ce qui change d'une difficulté à l'autre
  buildHelpDiffs() {
    const cx = GAME_W / 2;
    const page = this.add.container(0, 0);
    page.add(this.add.text(cx, 60, T('helpDiffTitle'), {
      fontFamily: FONT, fontSize: '48px', color: CSS.amber,
    }).setOrigin(0.5));
    page.add(this.add.text(cx, 130, T('helpGoal')(CAMPAIGN_SPRINTS_SHORT, CAMPAIGN_SPRINTS_LONG), {
      fontFamily: FONT, fontSize: '26px', color: CSS.cyan, align: 'center',
    }).setOrigin(0.5));

    let y = 220;
    DIFFICULTIES.forEach((d, i) => {
      page.add(this.add.text(330, y, `${diffLabel(d)}  ${'★'.repeat(i + 1)}`, {
        fontFamily: FONT, fontSize: '36px', color: d.color,
      }).setOrigin(0, 0));
      page.add(this.add.text(900, y + 6, `« ${diffTagline(d)} »`, {
        fontFamily: FONT, fontSize: '22px', color: CSS.greenSoft,
      }).setOrigin(0, 0));
      const stats = [
        `${T('helpLives')}: ${d.lives}`,
        `${T('helpSpeed')}: ×${d.speed}`,
        `${T('helpSpawn')}: ${(d.spawnMs / 1000).toFixed(1)}s`,
        `${T('helpMaxLen')}: ${d.maxLen >= 99 ? '∞' : d.maxLen}`,
        `${T('helpBossCmds')}: ${d.bossCmds}`,
        `score: ×${d.scoreMult}`,
      ].join('   ·   ');
      page.add(this.add.text(360, y + 42, stats, {
        fontFamily: FONT, fontSize: '26px', color: CSS.white,
      }).setOrigin(0, 0).setAlpha(0.92));
      y += 110;
    });
    return page;
  }

  // couleur de sprite par type d'ennemi (aide pages 3 et 4)
  static ART_COLORS = {
    bug: CSS.green, typo: CSS.green, legacy: CSS.amber, deadline: CSS.magenta, spammer: CSS.cyan,
    missile: CSS.red, powerup: CSS.gold, ghost: CSS.white, virus: CSS.red,
    monolith: CSS.amber, consultant: CSS.gold, ransomware: CSS.red, microservice: CSS.cyan, spec: CSS.white, obfuscator: CSS.white, po: CSS.magenta, indep: CSS.cyan,
    boss: CSS.red, finalBoss: CSS.magenta,
    mainframe: CSS.cyan, dette: CSS.amber, stagiaireBoss: CSS.green,
    commercial: CSS.gold, datacenter: CSS.red, reunion: CSS.magenta,
    framework: CSS.green, certificat: CSS.red, audit: CSS.white, facture: CSS.gold,
  };

  // page 3 : bestiaire — ennemis groupés par niveau, sur 3 colonnes remplies
  // de haut en bas avec débordement automatique : ajouter un ennemi dans
  // bestiaryGroups (i18n.js) suffit, la mise en page absorbe la croissance.
  buildHelpEnemies() {
    const cx = GAME_W / 2;
    const page = this.add.container(0, 0);
    page.add(this.add.text(cx, 56, T('helpEnemiesTitle'), {
      fontFamily: FONT, fontSize: '48px', color: CSS.amber,
    }).setOrigin(0.5));

    // % d'apparition : part de chaque ennemi dans les vagues d'une partie
    // complète en difficulté max (la seule où toutes les classes existent).
    // Échantillon sur une campagne longue, indépendant du mode choisi.
    const diffMax = DIFFICULTIES[DIFFICULTIES.length - 1];
    const sampleSprints = CAMPAIGN_SPRINTS_LONG;
    const counts = {};
    let totalSpawns = 0;
    for (let n = 1; n <= sampleSprints; n++) {
      const bossWave = n === sampleSprints || n % 4 === 0;
      for (const k of waveQueueFor(diffMax, n, bossWave)) {
        counts[k] = (counts[k] || 0) + 1;
        totalSpawns++;
      }
    }
    const pctFor = (kind) => {
      if (!counts[kind]) return '';
      return ` · ~${Math.max(1, Math.round((counts[kind] / totalSpawns) * 100))} %`;
    };
    page.add(this.add.text(cx, 88, T('helpPctNote'), {
      fontFamily: FONT, fontSize: '18px', color: CSS.greenSoft,
    }).setOrigin(0.5));

    const COLS = [110, 610, 1110];
    const TOP = 116, BOTTOM = 812;
    const ENTRY_H = 96, HEADER_H = 42;
    const LEVEL_COLORS = [CSS.green, CSS.amber, CSS.red, CSS.magenta, CSS.cyan, CSS.gold];
    let col = 0;
    let y = TOP;

    const addHeader = (text, color) => {
      page.add(this.add.text(COLS[col], y, `-- ${text} --`, {
        fontFamily: FONT, fontSize: '26px', color,
      }).setOrigin(0, 0));
      y += HEADER_H;
    };

    T('bestiaryGroups').forEach(([groupTitle, entries], gi) => {
      const color = LEVEL_COLORS[gi] || CSS.white;
      // jamais d'en-tête orphelin en bas de colonne
      if (y + HEADER_H + ENTRY_H > BOTTOM && col < COLS.length - 1) { col++; y = TOP; }
      addHeader(groupTitle, color);

      entries.forEach(([kind, name, desc, avail]) => {
        if (y + ENTRY_H > BOTTOM && col < COLS.length - 1) {
          col++;
          y = TOP;
          addHeader(`${groupTitle} ${T('helpCont')}`, color);
        }
        // le sprite "bug" du groupe niv.3 est en réalité l'élite
        const spawnKind = gi === 2 && kind === 'bug' ? 'elite' : kind;
        const x = COLS[col];
        const art = (ASCII[kind][0] || '').replace('<tech>', 'COBOL ');
        page.add(this.add.text(x, y, art, {
          fontFamily: FONT, fontSize: '12px',
          color: MenuScene.ART_COLORS[kind] || CSS.white, align: 'center', lineSpacing: -3,
        }).setOrigin(0, 0));
        page.add(this.add.text(x + 110, y, name, {
          fontFamily: FONT, fontSize: '24px', color: MenuScene.ART_COLORS[kind] || CSS.white,
        }).setOrigin(0, 0));
        page.add(this.add.text(x + 110, y + 25, avail + pctFor(spawnKind), {
          fontFamily: FONT, fontSize: '17px', color: CSS.gold,
        }).setOrigin(0, 0).setAlpha(0.9));
        page.add(this.add.text(x + 110, y + 45, desc, {
          fontFamily: FONT, fontSize: '18px', color: CSS.white,
        }).setOrigin(0, 0).setAlpha(0.9));
        y += ENTRY_H;
      });
      y += 10; // respiration entre les groupes
    });
    return page;
  }

  // page 4 : les boss
  buildHelpBosses() {
    const cx = GAME_W / 2;
    const page = this.add.container(0, 0);
    page.add(this.add.text(cx, 56, T('helpBossesTitle'), {
      fontFamily: FONT, fontSize: '48px', color: CSS.amber,
    }).setOrigin(0.5));

    // section campagne (boss normal + DSI), puis section mode infini
    page.add(this.add.text(cx, 102, `-- ${T('bossesSectionMain')} --`, {
      fontFamily: FONT, fontSize: '26px', color: CSS.red,
    }).setOrigin(0.5));
    T('bestiaryBosses').forEach(([kind, name, desc, avail], i) => {
      const cx2 = 530 + i * 540;
      const y = 130;
      page.add(this.add.text(cx2, y + 150, ASCII[kind][0], {
        fontFamily: FONT, fontSize: '14px',
        color: MenuScene.ART_COLORS[kind] || CSS.white, align: 'center', lineSpacing: -3,
      }).setOrigin(0.5, 1));
      page.add(this.add.text(cx2, y + 158, name, {
        fontFamily: FONT, fontSize: '28px', color: MenuScene.ART_COLORS[kind] || CSS.white, align: 'center',
      }).setOrigin(0.5, 0));
      page.add(this.add.text(cx2, y + 190, avail, {
        fontFamily: FONT, fontSize: '19px', color: CSS.gold, align: 'center',
      }).setOrigin(0.5, 0));
      page.add(this.add.text(cx2, y + 214, desc, {
        fontFamily: FONT, fontSize: '19px', color: CSS.white, align: 'center',
      }).setOrigin(0.5, 0).setAlpha(0.92));
    });

    page.add(this.add.text(cx, 462, `-- ${T('bossesSectionInf')} --`, {
      fontFamily: FONT, fontSize: '26px', color: CSS.cyan,
    }).setOrigin(0.5));
    T('bestiaryBossesInf').forEach(([kind, name, desc], i) => {
      const cx2 = 190 + (i % 5) * 305;
      const y = 488 + Math.floor(i / 5) * 300;
      page.add(this.add.text(cx2, y + 140, ASCII[kind][0], {
        fontFamily: FONT, fontSize: '13px',
        color: MenuScene.ART_COLORS[kind] || CSS.white, align: 'center', lineSpacing: -3,
      }).setOrigin(0.5, 1));
      page.add(this.add.text(cx2, y + 148, name, {
        fontFamily: FONT, fontSize: '23px', color: MenuScene.ART_COLORS[kind] || CSS.white, align: 'center',
      }).setOrigin(0.5, 0));
      page.add(this.add.text(cx2, y + 176, desc, {
        fontFamily: FONT, fontSize: '18px', color: CSS.white, align: 'center',
      }).setOrigin(0.5, 0).setAlpha(0.92));
    });
    return page;
  }

  // page 5 : notes de version
  buildHelpNotes() {
    const cx = GAME_W / 2;
    const page = this.add.container(0, 0);
    page.add(this.add.text(cx, 56, T('helpNotesTitle'), {
      fontFamily: FONT, fontSize: '48px', color: CSS.amber,
    }).setOrigin(0.5));

    let y = 124;
    const versionColors = [CSS.green, CSS.cyan, CSS.greenSoft];
    T('releaseNotes').forEach(([version, lines], vi) => {
      page.add(this.add.text(240, y, `-- ${version}${vi === 0 ? ` ${T('helpCurrent')}` : ''} --`, {
        fontFamily: FONT, fontSize: '30px', color: versionColors[vi] || CSS.white,
      }).setOrigin(0, 0));
      y += 40;
      for (const line of lines) {
        const t = this.add.text(270, y, `· ${line}`, {
          fontFamily: FONT, fontSize: '22px', color: CSS.white,
          wordWrap: { width: 1100 },
        }).setOrigin(0, 0).setAlpha(0.92);
        page.add(t);
        y += t.height + 4;
      }
      y += 18;
    });
    return page;
  }

  toggleHelp() {
    this.helpOpen = !this.helpOpen;
    if (this.helpOpen) { this.helpPage = 0; this.refreshHelpPage(); }
    this.helpPanel.setVisible(this.helpOpen);
    Sfx.blip(this.helpOpen ? 20 : 5);
  }

  buildTitle() {
    const cx = GAME_W / 2;
    const style = (color) => ({
      fontFamily: FONT, fontSize: '110px', color, align: 'center',
    });
    // 3 couches pour l'aberration chromatique
    this.titleR = this.add.text(cx, 150, 'TYPINGS OF THE SPEC', style('#ff3b3b')).setOrigin(0.5).setAlpha(0.55);
    this.titleC = this.add.text(cx, 150, 'TYPINGS OF THE SPEC', style(CSS.cyan)).setOrigin(0.5).setAlpha(0.55);
    this.title = this.add.text(cx, 150, 'TYPINGS OF THE SPEC', style(CSS.green)).setOrigin(0.5);

    this.add.text(cx, 240, T('menuTagline'), {
      fontFamily: FONT, fontSize: '28px', color: CSS.greenSoft,
    }).setOrigin(0.5);

    // glitch périodique du titre (coupé en animations réduites)
    if (!REDUCED_MOTION) this.time.addEvent({
      delay: 1700, loop: true, callback: () => {
        const dx = Phaser.Math.Between(2, 6);
        this.titleR.setX(GAME_W / 2 - dx); this.titleC.setX(GAME_W / 2 + dx);
        this.title.setX(GAME_W / 2 + Phaser.Math.Between(-2, 2));
        this.time.delayedCall(110, () => {
          this.titleR.setX(GAME_W / 2 - 2); this.titleC.setX(GAME_W / 2 + 2);
          this.title.setX(GAME_W / 2);
        });
      },
    });

    // quelques bugs ASCII décoratifs qui dérivent
    for (let i = 0; i < 5; i++) {
      const t = this.add.text(
        Phaser.Math.Between(80, GAME_W - 80), Phaser.Math.Between(560, 860),
        pickArt('bug'), { fontFamily: FONT, fontSize: '17px', color: CSS.greenDim, align: 'center' }
      ).setOrigin(0.5).setAlpha(0.5);
      this.tweens.add({
        targets: t, y: t.y - Phaser.Math.Between(15, 40), duration: Phaser.Math.Between(1800, 3200),
        yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
      });
    }
  }

  buildDifficulties() {
    const cx = GAME_W / 2;
    this.add.text(cx, 360, T('menuSelect'), {
      fontFamily: FONT, fontSize: '28px', color: CSS.white,
    }).setOrigin(0.5);

    this.diffTexts = DIFFICULTIES.map((d, i) => {
      const y = 400 + i * 52;
      const label = this.add.text(cx, y, '', {
        fontFamily: FONT, fontSize: '40px', color: CSS.greenDim, align: 'center',
      }).setOrigin(0.5);
      // étoiles à droite du grade : 1 ★ par niveau de difficulté
      const stars = this.add.text(cx, y, '★'.repeat(i + 1), {
        fontFamily: FONT, fontSize: '24px', color: CSS.greenDim,
      }).setOrigin(0, 0.5);
      const tag = this.add.text(cx, y + 24, diffTagline(d), {
        fontFamily: FONT, fontSize: '19px', color: CSS.greenDim,
      }).setOrigin(0.5).setAlpha(0);
      return { label, stars, tag };
    });
    this.refreshDiff();
  }

  refreshDiff() {
    const cx = GAME_W / 2;
    DIFFICULTIES.forEach((d, i) => {
      const { label, stars, tag } = this.diffTexts[i];
      const on = i === this.selected;
      // chaque grade porte sa couleur : la progression du danger se lit
      // vert → cyan → ambre → rouge → magenta
      label.setText(on ? `[ ${diffLabel(d)} ]` : diffLabel(d));
      label.setColor(d.color);
      label.setAlpha(on ? 1 : 0.55);
      label.setFontSize(on ? 40 : 32);
      stars.setX(cx + label.width / 2 + 18);
      stars.setColor(d.color);
      stars.setAlpha(on ? 1 : 0.5);
      tag.setAlpha(on ? 0.95 : 0);
      tag.setColor(d.color);
    });
  }

  move(dir) {
    this.selected = Phaser.Math.Wrap(this.selected + dir, 0, DIFFICULTIES.length);
    Sfx.blip(this.selected * 8);
    this.refreshDiff();
  }

  /* Écran "comment jouer" : recense l'essentiel avant de lancer la partie.
     Construit une fois ; le grade et sa couleur sont rafraîchis à l'ouverture. */
  buildBriefing() {
    const cx = GAME_W / 2;
    this.briefingPanel = this.add.container(0, 0).setDepth(96).setVisible(false);
    const children = [
      this.add.rectangle(cx, GAME_H / 2, GAME_W, GAME_H, 0x020503, 0.92),
      this.add.rectangle(cx, GAME_H / 2, 1180, 620, 0x06120a, 0.98).setStrokeStyle(2, PALETTE.green),
      this.add.text(cx, 188, T('briefingTitle'), {
        fontFamily: FONT, fontSize: '52px', color: CSS.amber,
      }).setOrigin(0.5),
    ];
    const stepColors = [CSS.green, CSS.cyan, CSS.red, CSS.gold];
    let y = 288;
    T('briefingSteps').forEach(([num, ...lines], i) => {
      children.push(this.add.text(310, y, num, {
        fontFamily: FONT, fontSize: '30px', color: stepColors[i] || CSS.white,
      }).setOrigin(0, 0));
      lines.forEach((line, j) => {
        children.push(this.add.text(366, y + j * 30, line, {
          fontFamily: FONT, fontSize: '26px', color: CSS.white,
        }).setOrigin(0, 0).setAlpha(0.95));
      });
      y += 30 * lines.length + 24;
    });
    this.briefingGradeText = this.add.text(cx, y + 18, '', {
      fontFamily: FONT, fontSize: '32px', color: CSS.gold,
    }).setOrigin(0.5);
    children.push(this.briefingGradeText);
    const start = this.add.text(cx, GAME_H / 2 + 270, T('briefingStart'), {
      fontFamily: FONT, fontSize: '28px', color: CSS.green,
    }).setOrigin(0.5);
    this.tweens.add({ targets: start, alpha: 0.35, duration: 600, yoyo: true, repeat: -1 });
    children.push(start);
    this.briefingPanel.add(children);
  }

  /* ENTRÉE depuis le menu : on affiche d'abord le briefing (pas de partie
     lancée à l'aveugle). startGame() fait le vrai départ. */
  launch() {
    Sfx.blip(10);
    const d = DIFFICULTIES[this.selected];
    this.briefingGradeText.setText(`${T('briefingGrade')(diffLabel(d))}  ${'★'.repeat(this.selected + 1)}`);
    this.briefingGradeText.setColor(d.color);
    this.briefingOpen = true;
    this.briefingPanel.setVisible(true);
  }

  closeBriefing() {
    this.briefingOpen = false;
    this.briefingPanel.setVisible(false);
    Sfx.blip(5);
  }

  startGame() {
    Sfx.powerup();
    Music.stop();
    this.cameras.main.fadeOut(350, 5, 10, 7);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('Game', { difficulty: DIFFICULTIES[this.selected] });
    });
  }

  buildFooter() {
    this.blink = this.add.text(GAME_W / 2, 700, T('menuDeploy'), {
      fontFamily: FONT, fontSize: '30px', color: CSS.green,
    }).setOrigin(0.5);
    this.tweens.add({ targets: this.blink, alpha: 0.25, duration: 600, yoyo: true, repeat: -1 });

    this.add.text(GAME_W / 2, GAME_H - 24,
      T('menuFooter'), {
        fontFamily: FONT, fontSize: '20px', color: CSS.greenSoft,
      }).setOrigin(0.5);

    // version du jeu, discrète en bas à gauche
    this.add.text(16, GAME_H - 12, APP_VERSION, {
      fontFamily: FONT, fontSize: '20px', color: CSS.greenSoft,
    }).setOrigin(0, 1).setAlpha(0.85);

    // FPS en haut à gauche
    const fps = this.add.text(4, 0, '', {
      fontFamily: FONT, fontSize: '16px', color: CSS.greenSoft,
    }).setAlpha(0.85).setDepth(95);
    this.time.addEvent({
      delay: 250, loop: true,
      callback: () => fps.setText(`${Math.round(this.game.loop.actualFps)} fps${Sfx.muted ? T('mutedTag') : ''}`),
    });

    // choix de la langue (touche L), en bas à droite
    this.add.text(GAME_W - 16, GAME_H - 12, T('menuLang'), {
      fontFamily: FONT, fontSize: '22px', color: CSS.cyan,
    }).setOrigin(1, 1).setAlpha(0.85);

    // choix de la musique (touche B), juste au-dessus
    this.musicLabel = this.add.text(GAME_W - 16, GAME_H - 40, T('menuMusic')(Music.track().name), {
      fontFamily: FONT, fontSize: '22px', color: CSS.cyan,
    }).setOrigin(1, 1).setAlpha(0.85);

    // mode objectif / infini (touche I), au-dessus
    this.modeLabel = this.add.text(GAME_W - 16, GAME_H - 68, T('menuMode')(GAME_MODE), {
      fontFamily: FONT, fontSize: '22px', color: CSS.gold,
    }).setOrigin(1, 1).setAlpha(0.85);
  }

}
