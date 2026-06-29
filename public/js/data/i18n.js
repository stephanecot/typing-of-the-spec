/* i18n FR/EN — textes d'interface. Les banques de mots à taper restent
   majoritairement communes (jargon dev) ; seules les banques très françaises
   (deadlines, recruteur, missiles) ont une variante anglaise dans words.js. */
'use strict';

let LANG = localStorage.getItem('totd-lang') || 'fr';

const I18N = {
  fr: {
    // ---- menu
    menuTagline: 'Les specs sont floues. Clarifiez avant le sprint.',
    menuSelect: '> SÉLECTIONNEZ VOTRE GRADE <',
    menuDeploy: '[ ENTRÉE pour lancer le projet ]',
    menuFooter: 'H: aide & règles · flèches: choisir · ENTRÉE: jouer · ÉCHAP: pause · TAB: changer de cible',
    menuLang: '[ L ] langue : FRANÇAIS',
    menuMusic: (name) => `[ B ] musique : ${name}`,
    menuMode: (mode) => mode === 'inf' ? '[ I ] mode : INFINI ∞' : `[ I ] mode : ${mode} SPRINTS + COMEX`,
    menuLeaderboard: '[ T ] classement complet',
    lbHint: 'ÉCHAP / ENTRÉE : retour à l\'accueil',
    lbEmpty: 'Aucun score pour le moment.',
    // briefing affiché juste avant le lancement d'une partie
    briefingTitle: '> COMMENT JOUER_',
    briefingSteps: [
      ['1.', 'Les besoins avancent vers ton PROJET, à gauche. Tape la PREMIÈRE LETTRE',
        'd\'un ennemi pour le verrouiller.'],
      ['2.', 'Finis son mot sans faute pour le clarifier. Les espaces sont facultatifs',
        '— une faute remet ton combo à zéro.'],
      ['3.', 'Ne laisse aucun ennemi atteindre le PROJET : trop de dérives = GAME OVER.'],
      ['4.', 'ÉCHAP : pause · TAB : changer de cible · ENTRÉE : arbitrage · EFFACER : autocomplete.'],
    ],
    briefingGrade: (label) => `grade : ${label}`,
    briefingStart: '[ ENTRÉE : c\'est parti !    ÉCHAP : retour au menu    H : aide complète ]',
    helpTitle: '> AIDE — RÈGLES DU JEU_',
    helpPageHint: (cur, total) => `[ ←/→ : page ${cur}/${total} · ↑/↓ : défiler · H ou ÉCHAP : retour au menu ]`,
    helpDiffTitle: '> DIFFICULTÉS_',
    helpGoal: (short, long) => `Objectif : tenir ${short} ou ${long} sprints (mode I) puis vaincre LE COMEX EN COLÈRE.\nChaque seconde d'avance sur le chrono = points bonus !`,
    helpLives: 'vies',
    helpSpeed: 'vitesse',
    helpSpawn: 'cadence',
    helpMaxLen: 'mots max',
    helpBossCmds: 'cmds boss',
    helpEnemiesTitle: '> BESTIAIRE — LES ENNEMIS_',
    helpPctNote: '(~% : part des apparitions sur une partie complète en ★★★★★ — hors scissions et emails urgents)',
    helpBossesTitle: '> LES BOSS_',
    helpNotesTitle: '> NOTES DE VERSION_',
    helpCurrent: '(actuelle)',
    releaseNotes: [
      ['v1.0.0', [
        'TYPINGS OF THE SPEC : défendez LE PROJET au clavier contre les besoins flous, le scope creep et les réunions sans fin',
        'Tapez chaque exigence pour la clarifier avant qu\'elle dérive — du STAGIAIRE BA au CHIEF PRODUCT OFFICER',
        'Mode campagne et mode infini, bestiaire complet et boss de COMEX, le tout 100 % hors-ligne',
        'Tenez tous les sprints puis livrez face au COMEX EN COLÈRE : PROJET LIVRÉ !',
      ]],
    ],
    helpCont: '(suite)',
    /* Bestiaire groupé par niveau : [titre du groupe, [[kind, nom, desc, dispo], …]].
       Ajouter un ennemi = une ligne dans le bon groupe, la mise en page suit. */
    bestiaryGroups: [
      ['NIVEAU 1 ▲', [
        ['bug', 'BESOIN FLOU', 'le tout-venant du backlog : besoin\ncourt et imprécis. Lent, nombreux.', 'toutes · dès le sprint 1'],
        ['missile', 'EMAIL URGENT', 'tiré par LE STAKEHOLDER : mot\ncourt et très rapide.', 'lancé par LE STAKEHOLDER'],
        ['typo', 'LA COQUILLE', 'une faute dans la spec —\ntapez-la telle quelle !', 'toutes · dès le sprint 1'],
      ]],
      ['NIVEAU 2 ▲▲', [
        ['ghost', 'BESOIN FANTÔME', 'disparaît par intermittence : le\nbesoin qui change d\'avis !', '★★ et + · dès le sprint 2'],
        ['virus', 'SCOPE CREEP', 'se réplique en 2 mini-besoins à\nsa mort. Cadrez vite !', '★★ et + · dès le sprint 2'],
        ['microservice', 'USER STORY', 'se scinde en 2 sous-stories toutes\nles 8 s. Découpez !', '★★ et + · dès le sprint 2'],
        ['legacy', 'SPEC LEGACY', 'vieux cahier des charges : lent\nmais long à clarifier.', 'toutes · dès le sprint 2'],
        ['deadline', 'LA DEADLINE', 'l\'échéance qui fonce droit sur\nle projet. Rapide !', 'toutes · dès le sprint 2'],
      ]],
      ['NIVEAU 3 ▲▲▲', [
        ['bug', 'RÈGLE MÉTIER', 'exceptions CamelCase, majuscules\ncomprises. Teigneuse.', '★★ et + · dès le sprint 3'],
        ['spammer', 'LE STAKEHOLDER', 'campe au fond et spamme des\nemails urgents. Éliminez la source !', '★★ et + · dès le sprint 3'],
        ['monolith', 'CAHIER DES CHARGES', 'exige 2 mots pour tomber, et\nrecule entre les deux.', '★★ et + · dès le sprint 3'],
        ['spec', 'EXIGENCE CONTRADICTOIRE', 'son mot ne veut RIEN dire (généré\nau hasard). Bon courage.', '★★ et + · dès le sprint 3'],
      ['indep', 'LE FREELANCE', 'esquive à la moitié du mot — mais sa\nmort élimine l\'ennemi le plus proche !', '★★ et + · dès le sprint 3'],
      ]],
      ['NIVEAU 4 ▲▲▲▲', [
        ['consultant', 'LE CONSULTANT', 'buzzwords à rallonge, et il\naccélère vers le projet.', '★★★★ et + · dès le sprint 4'],
        ['obfuscator', 'LE POWERPOINT', 'sa mort lâche un écran de jargon\nqui masque les besoins 5 s.', '★★★★ et + · dès le sprint 4'],
      ]],
      ['NIVEAU 5 ▲▲▲▲▲', [
        ['ransomware', 'L\'AVENANT', 're-chiffre son mot toutes les 6 s :\nle besoin rechange, tout à refaire !', '★★★★★ · dès le sprint 5'],
        ['po', 'LE SPONSOR INSPIRÉ', 'une idée toutes les 5 s : le mot\nd\'un autre besoin se rallonge !', '★★★★★ · dès le sprint 5'],
      ]],
      ['BONUS', [
        ['powerup', 'POWER-UP', 'le taper déclenche son pouvoir :\ncafé, ticket rejeté, go nogo.', 'toutes difficultés'],
      ]],
    ],
    bestiaryBosses: [
      ['boss', 'COMITÉ DE PILOTAGE', 'Apparaît tous les 4 sprints.\nEnchaînez ses commandes pour le faire\nreculer. Lâche toujours +1 vie.', 'toutes difficultés'],
      ['finalBoss', 'LE COMEX EN COLÈRE', 'Boss final du dernier sprint :\nencaisse 2 commandes de plus.\nLe vaincre = projet livré + bonus temps !', 'dernier sprint'],
    ],
    bestiaryBossesInf: [
      ['mainframe', 'LE SI HISTORIQUE', 'Lent mais blindé : 3 commandes\nde plus. Il tourne depuis 1974\net compte bien continuer.'],
      ['dette', 'LA DETTE FONCTIONNELLE', 'Ses commandes sont les plus\nlongues du projet — elle\ns\'accumule depuis des années.'],
      ['stagiaireBoss', 'LE STAGIAIRE BA', 'Une commande de moins, mais\nfonce deux fois plus vite.\nIl a fini la machine à café.'],
      ['commercial', 'L\'AVANT-VENTE', 'Chaque commande encaissée lui\nfait vendre une deadline de plus.\nSouriez, c\'est signé.'],
      ['datacenter', 'LE BIG BANG', 'Deux commandes de plus, et chaque\ncoup lâche un écran de jargon.\nLa migration est sous contrôle.'],
      ['reunion', 'LA RÉUNION SANS FIN', 'Quatre commandes de plus et un\ndébit de sénateur. Point suivant\nà l\'ordre du jour.'],
      ['framework', 'LA MÉTHODE DU JOUR', 'À chaque coup elle pivote : la\ncommande suivante change.\nDéjà obsolète.'],
      ['certificat', 'L\'AUDIT RGPD', 'Rapide, une commande de moins…\nmais 3 vies s\'il touche le projet.\nMettez-vous en conformité !'],
      ['audit', 'L\'AUDIT QUALITÉ', 'Chaque commande encaissée\nconvoque un consultant.\nTout est facturable.'],
      ['facture', 'LE DÉPASSEMENT BUDGET', 'Chaque coup encaissé vous\ncoûte 150 points.\nLe budget, c\'est pas illimité.'],
    ],
    flippedBadge: ' [retourné]',
    virusSplit: 'SCOPE CREEP !',
    microSplit: 'DÉCOUPAGE !',
    smokeScreen: 'ÉCRAN DE JARGON !',
    newIdea: '« j\'ai une idée ! »',
    ginesOn: '🔥 MODE GINÈS — les bugs vont t\'insulter 🔥',
    ginesBadge: 'MODE GINÈS',
    discoOn: '🪩 MODE DISCO — que la prod brille 🪩',
    discoBadge: 'MODE DISCO 🪩',
    boissonOn: '🍺 MODE BOISSON — qui a invité l\'apéro en prod ? 🍺',
    boissonBadge: 'MODE BOISSON 🍺',
    speedOn: '⚡ MODE SPEED — tout va 30 % plus vite ⚡',
    speedBadge: 'MODE SPEED ⚡',
    menuCode: '[ C ] code secret…',
    codeTitle: '> CODE SECRET_',
    codeHint: '[ ENTRÉE : valider · ÉCHAP : fermer ]',
    codeUnknown: 'code inconnu_',
    indepDodge: '« pas dispo, déjà en mission ! »',
    indepHired: '« j\'accepte la mission ! »',
    indepKill: 'facturé par le freelance_',
    scopeCreep: 'SCOPE CREEP +1 !',
    reEncrypted: 'avenant signé_',
    mutedTag: ' · 🔇 muet',
    konami: '☠ KONAMI CODE — GOD MODE ARMÉ — TRICHEUR REPÉRÉ ☠',
    helpSections: [
      ['OBJECTIF', [
        'Protège ton PROJET : chaque ennemi qui l\'atteint = une DÉRIVE. Trop de dérives = GAME OVER.',
        'Tiens tous les sprints puis bats LE COMEX EN COLÈRE : projet livré, et le temps restant fait bonus !',
      ]],
      ['COMMENT CLARIFIER UN BESOIN', [
        'Tape la PREMIÈRE LETTRE d\'un ennemi pour le verrouiller, puis finis',
        'son mot sans faute (les espaces sont facultatifs). Une faute remet le combo à zéro.',
      ]],
      ['NIVEAUX & POINTS', [
        'niv.1 ▲ besoins flous · niv.2 ▲▲ deadlines (rapides !) et legacy · niv.3 ▲▲▲ règles métier.',
        'Points = longueur × 10 × niveau × combo × VITESSE (rapide = jusqu\'à ×3 !).',
        'Certains ennemis lâchent un bonus : +1 vie, points, combo +5, slow-mo, items.',
        'Dès ★★★ : SUPER COMBO ULTIME — combo 5/10/15 = +1/+2/+3 étoiles de combat',
        '(max 6, gardées même si le combo casse). Pouvoirs (si la lettre ne sert pas',
        'à taper) : A bouclier 3 s (1★) · Z +1 vie (3★) · E frappe le plus fort (2★).',
      ]],
      ['POUVOIRS ENNEMIS', [
        'Mots MINIFIÉS : des lettres sont masquées (?), à toi de les deviner !',
        'Mots RETOURNÉS : affichés tête en bas — ça se tape normalement, ça se lit moins bien.',
        'LE STAKEHOLDER [in] spamme des emails : tape-les avant qu\'ils touchent le projet.',
      ]],
      ['ITEMS', [
        'ENTRÉE : ARBITRAGE (max 3) — tranche le besoin le plus proche du projet.',
        'EFFACER : AUTOCOMPLETE (max 5) — l\'IA complète les 4 lettres suivantes.',
      ]],
      ['POWER-UPS & BOSS', [
        'Mots dorés : café = ralenti · ticket rejeté = recul · go nogo = purge.',
        'Tous les 4 sprints, un BOSS : enchaîne ses commandes. Il lâche +1 vie.',
      ]],
      ['TOUCHES', [
        'TAB : relâcher la cible · ÉCHAP : pause (puis Q : quitter, S : couper le son) · L (menu) : langue · B (menu) : musique',
      ]],
    ],
    // ---- jeu
    hudGod: '  ☠ GOD MODE = TRICHEUR ☠',
    hudItems: (bombs, lasers) => `arbitrage x${bombs} [ENTRÉE]   autocomplete x${lasers} [EFFACER]`,
    hudTime: 'TEMPS',
    hudStars: 'SUPER COMBO',
    hudStarsKeys: '  ·  A bouclier 1★ · Z +1 vie 3★ · E frappe 2★',
    starGain: (n) => `+${n} ÉTOILE${n > 1 ? 'S' : ''} DE COMBAT !`,
    starShield: 'BOUCLIER ★ 3 s !',
    starShieldBlock: 'bouclier ★ !',
    starLife: '+1 VIE ★',
    starSmite: 'ANNIHILÉ ★',
    bannerBossWave: '!! COMITÉ DE PILOTAGE CONVOQUÉ !!',
    bannerWave: 'arrivée des besoins...',
    bannerFinal: '!! LE COMEX EN COLÈRE ARRIVE !!',
    /* Bandeau "première rencontre" : NOM — indice d'une ligne, montré une
       seule fois par partie au premier spawn de chaque type d'ennemi. */
    enemyIntro: {
      bug: 'LE BESOIN FLOU — tapez son mot pour le clarifier !',
      typo: 'LA COQUILLE — une faute dans la spec : tapez-la !',
      deadline: 'LA DEADLINE — rapide, dépêchez-vous !',
      legacy: 'LA SPEC LEGACY — lente, mais longue à clarifier.',
      elite: 'LA RÈGLE MÉTIER — CamelCase et majuscules comprises.',
      spammer: 'LE STAKEHOLDER — éliminez la source des emails urgents !',
      ghost: 'LE BESOIN FANTÔME — il clignote : retenez son mot !',
      virus: 'LE SCOPE CREEP — il se réplique à sa mort : cadrez vite !',
      monolith: 'LE CAHIER DES CHARGES — 2 mots pour le faire tomber.',
      microservice: 'LA USER STORY — elle se scinde en deux : découpez !',
      indep: 'LE FREELANCE — il esquive, mais sa mort en emporte un autre.',
      spec: 'L\'EXIGENCE CONTRADICTOIRE — son mot ne veut rien dire. Courage.',
      consultant: 'LE CONSULTANT — buzzwords à rallonge, et ça accélère.',
      obfuscator: 'LE POWERPOINT — sa mort lâche un écran de jargon.',
      ransomware: 'L\'AVENANT — il re-chiffre son mot : tout à refaire !',
      po: 'LE SPONSOR INSPIRÉ — ses idées rallongent un autre mot.',
      missile: 'L\'EMAIL URGENT — tiré par le stakeholder : tapez-le vite !',
      powerup: 'POWER-UP — tapez-le pour déclencher son pouvoir !',
    },
    finalBossName: 'LE COMEX EN COLÈRE',
    bossMainframe: 'LE SI HISTORIQUE',
    bossDette: 'LA DETTE FONCTIONNELLE',
    bossStagiaire: 'LE STAGIAIRE BA',
    bossCommercial: 'L\'AVANT-VENTE',
    bossDatacenter: 'LE BIG BANG',
    bossReunion: 'LA RÉUNION SANS FIN',
    bossFramework: 'LA MÉTHODE DU JOUR',
    bossCertificat: 'L\'AUDIT RGPD',
    bossAudit: 'L\'AUDIT QUALITÉ',
    bossFacture: 'LE DÉPASSEMENT BUDGET',
    bossesSectionMain: 'BOSS DE LA CAMPAGNE',
    bossesSectionInf: 'BOSS DU MODE INFINI ∞',
    prodSaved: 'LE PROJET EST LIVRÉ !',
    timeBonus: 'BONUS TEMPS',
    pauseSub: 'les besoins attendent patiemment...',
    pauseResume: '[ ÉCHAP ou ENTRÉE : reprendre ]',
    pauseMute: (muted) => muted ? '[ S : 🔇 son coupé — réactiver ]' : '[ S : 🔊 couper le son ]',
    pauseQuit: '[ Q : quitter la partie — score non sauvegardé ]',
    lvl: 'niv.',
    minified: ' [minifié]',
    recruiter: ' [stakeholder]',
    bossName: 'COMITÉ DE PILOTAGE',
    newMessage: 'nouvel email !',
    fast: '>> RAPIDE',
    noBombs: 'PLUS D\'ARBITRAGE !',
    noProcess: 'AUCUN BESOIN À TRANCHER',
    bombSent: 'arbitrage rendu_',
    noLasers: 'PLUS D\'AUTOCOMPLETE !',
    lockFirst: 'VERROUILLE UNE CIBLE !',
    suggestion: 'suggestion acceptée_',
    lifeUp: '+1 VIE — PROJET RECADRÉ',
    prodHealthy: 'PROJET SUR LES RAILS',
    stockFull: 'stock plein',
    invincible: 'INVINCIBLE (tricheur)',
    bossTouch: '!! LE BOSS A FAIT DÉRIVER LE PROJET !!',
    incident: 'LE PROJET DÉRIVE !',
    powerSlowmo: '☕ PAUSE CAFÉ\nralenti 5 s',
    powerRevert: 'TICKET REJETÉ\nles besoins reculent !',
    powerNuke: 'GO NOGO\nécran purgé !',
    prodDown: 'PROJET DANS LE MUR',
    // ---- game over
    goWin: 'VICTOIRE — PROJET LIVRÉ',
    goDiff: 'difficulté :',
    statSprints: 'SPRINTS TENUS',
    statSpeed: 'VITESSE',
    wpmUnit: 'mots/min',
    statAccuracy: 'PRÉCISION',
    statBugs: 'BESOINS CLARIFIÉS',
    statBosses: 'BOSS VAINCUS',
    shame: '☠ GOD MODE DÉTECTÉ — SCORE DE TRICHEUR, NON ENREGISTRÉ ☠',
    ranked: (rank) => `Tu es classé #${rank} au général !`,
    offline: '(serveur injoignable — score non enregistré)',
    replay: '[ ENTRÉE : rejouer ]    [ M : menu ]',
    // ---- formulaire DOM
    formTitle: '> ENREGISTRER TON SCORE_',
    formPseudo: 'pseudo *',
    formFirstName: 'prénom ',
    formLastName: 'nom ',
    formEmail: 'email ',
    formPhone: 'téléphone ',
    formOpt: '(optionnel)',
    formConsent: 'J\'accepte d\'être recontacté·e après l\'événement. Sans cette case, '
      + 'nom, prénom, email et téléphone ne sont pas conservés (RGPD : données '
      + 'supprimées après le tirage, jamais cédées).',
    formSave: '[ ENREGISTRER ]',
    formSkip: '[ passer ]',
  },

  en: {
    // ---- menu
    menuTagline: 'Specs are fuzzy. Clarify before the sprint.',
    menuSelect: '> SELECT YOUR RANK <',
    menuDeploy: '[ ENTER to kick off the project ]',
    menuFooter: 'H: help & rules · arrows: select · ENTER: play · ESC: pause · TAB: switch target',
    menuLang: '[ L ] language: ENGLISH',
    menuMusic: (name) => `[ B ] music: ${name}`,
    menuMode: (mode) => mode === 'inf' ? '[ I ] mode: ENDLESS ∞' : `[ I ] mode: ${mode} SPRINTS + EXEC BOARD`,
    menuLeaderboard: '[ T ] full leaderboard',
    lbHint: 'ESC / ENTER: back to home',
    lbEmpty: 'No scores yet.',
    // briefing shown right before a game starts
    briefingTitle: '> HOW TO PLAY_',
    briefingSteps: [
      ['1.', 'Needs march toward your PROJECT on the left. Type the FIRST LETTER',
        'of an enemy to lock onto it.'],
      ['2.', 'Finish its word without a typo to clarify it. Spaces are optional',
        '— a typo resets your combo.'],
      ['3.', 'Let no enemy reach the PROJECT: too much drift = GAME OVER.'],
      ['4.', 'ESC: pause · TAB: switch target · ENTER: arbitration · BACKSPACE: autocomplete.'],
    ],
    briefingGrade: (label) => `rank: ${label}`,
    briefingStart: '[ ENTER: let\'s go!    ESC: back to menu    H: full help ]',
    helpTitle: '> HELP — HOW TO PLAY_',
    helpPageHint: (cur, total) => `[ ←/→: page ${cur}/${total} · ↑/↓: scroll · H or ESC: back to menu ]`,
    helpDiffTitle: '> DIFFICULTY LEVELS_',
    helpGoal: (short, long) => `Goal: survive ${short} or ${long} sprints (mode I), then defeat THE FURIOUS EXEC BOARD.\nEvery second left on the clock = bonus points!`,
    helpLives: 'lives',
    helpSpeed: 'speed',
    helpSpawn: 'spawn rate',
    helpMaxLen: 'max word',
    helpBossCmds: 'boss cmds',
    helpEnemiesTitle: '> BESTIARY — THE ENEMIES_',
    helpPctNote: '(~%: share of spawns over a full ★★★★★ run — splits and urgent emails excluded)',
    helpBossesTitle: '> THE BOSSES_',
    helpNotesTitle: '> RELEASE NOTES_',
    helpCurrent: '(current)',
    releaseNotes: [
      ['v1.0.0', [
        'TYPINGS OF THE SPEC: defend THE PROJECT at the keyboard against vague needs, scope creep and endless meetings',
        'Type each requirement to clarify it before it drifts — from the INTERN BA to the CHIEF PRODUCT OFFICER',
        'Campaign mode and endless mode, a full bestiary and exec-board bosses, all 100% offline',
        'Survive every sprint then ship against THE FURIOUS EXEC BOARD: PROJECT DELIVERED!',
      ]],
    ],
    helpCont: '(cont.)',
    bestiaryGroups: [
      ['LEVEL 1 ▲', [
        ['bug', 'VAGUE NEED', 'backlog regulars: short, fuzzy\nneeds. Slow, but they swarm.', 'all · from sprint 1'],
        ['missile', 'URGENT EMAIL', 'fired by THE STAKEHOLDER: short\nword, very fast.', 'launched by THE STAKEHOLDER'],
        ['typo', 'THE TYPO', 'a mistake in the spec —\ntype it as is!', 'all · from sprint 1'],
      ]],
      ['LEVEL 2 ▲▲', [
        ['ghost', 'GHOST NEED', 'fades out intermittently: the\nneed that keeps changing!', '★★ and up · from sprint 2'],
        ['virus', 'SCOPE CREEP', 'splits into 2 mini-needs when\nkilled. Scope it fast!', '★★ and up · from sprint 2'],
        ['microservice', 'USER STORY', 'splits into 2 sub-stories every\n8 s. Break it down!', '★★ and up · from sprint 2'],
        ['legacy', 'LEGACY SPEC', 'old requirements doc: slow but\nlong to clarify.', 'all · from sprint 2'],
        ['deadline', 'THE DEADLINE', 'the due date charging straight\nat the project. Fast!', 'all · from sprint 2'],
      ]],
      ['LEVEL 3 ▲▲▲', [
        ['bug', 'BUSINESS RULE', 'CamelCase exceptions, capital\nletters included. Mean.', '★★ and up · from sprint 3'],
        ['spammer', 'THE STAKEHOLDER', 'camps in the back and spams\nurgent emails. Kill the source!', '★★ and up · from sprint 3'],
        ['monolith', 'THE SPEC DOC', 'takes 2 words to bring down,\nknocks back in between.', '★★ and up · from sprint 3'],
        ['spec', 'CONTRADICTORY REQ', 'its word means NOTHING (randomly\ngenerated). Good luck.', '★★ and up · from sprint 3'],
      ['indep', 'THE FREELANCER', 'dodges at half word — but its death\ntakes out the closest enemy!', '★★ and up · from sprint 3'],
      ]],
      ['LEVEL 4 ▲▲▲▲', [
        ['consultant', 'THE CONSULTANT', 'endless buzzwords, and it\naccelerates toward the project.', '★★★★ and up · from sprint 4'],
        ['obfuscator', 'THE SLIDE DECK', 'dies in a screen of jargon that\nhides needs for 5 s.', '★★★★ and up · from sprint 4'],
      ]],
      ['LEVEL 5 ▲▲▲▲▲', [
        ['ransomware', 'THE CHANGE REQUEST', 're-scopes its word every 6 s:\nthe need changes, start over!', '★★★★★ · from sprint 5'],
        ['po', 'THE INSPIRED SPONSOR', 'one idea every 5 s: another\nneed\'s word gets longer!', '★★★★★ · from sprint 5'],
      ]],
      ['BONUS', [
        ['powerup', 'POWER-UP', 'typing it triggers its power:\ncoffee, rejected ticket, go nogo.', 'all difficulties'],
      ]],
    ],
    bestiaryBosses: [
      ['boss', 'STEERING COMMITTEE', 'Shows up every 4 sprints.\nChain its commands to push it\nback. Always drops +1 life.', 'all difficulties'],
      ['finalBoss', 'THE FURIOUS EXEC BOARD', 'Final boss of the last sprint:\ntakes 2 extra commands.\nBeat it for project delivered + time bonus!', 'last sprint'],
    ],
    bestiaryBossesInf: [
      ['mainframe', 'THE LEGACY SYSTEM', 'Slow but armored: 3 extra\ncommands. Running since 1974\nand not planning to stop.'],
      ['dette', 'FUNCTIONAL DEBT', 'Its commands are the longest\nin the project — it has been\npiling up for years.'],
      ['stagiaireBoss', 'THE INTERN BA', 'One command less, but moves\ntwice as fast. Finished the\ncoffee machine.'],
      ['commercial', 'PRE-SALES', 'Every command it takes makes\nit sell one more deadline.\nSmile, it is signed.'],
      ['datacenter', 'THE BIG BANG MIGRATION', 'Two extra commands, and every\nhit drops a screen of jargon.\nThe migration is under control.'],
      ['reunion', 'THE ENDLESS MEETING', 'Four extra commands at a\nsenator\'s pace. Next item\non the agenda.'],
      ['framework', 'THE METHOD OF THE DAY', 'Pivots on every hit: the next\ncommand changes.\nAlready obsolete.'],
      ['certificat', 'THE GDPR AUDIT', 'Fast, one command less… but\ncosts 3 lives if it reaches\nthe project. Get compliant!'],
      ['audit', 'THE QUALITY AUDIT', 'Every command it takes\nsummons a consultant.\nEverything is billable.'],
      ['facture', 'THE BUDGET OVERRUN', 'Every hit it takes costs\nyou 150 points.\nThe budget is not endless.'],
    ],
    flippedBadge: ' [flipped]',
    virusSplit: 'SCOPE CREEP!',
    microSplit: 'SPLITTING!',
    smokeScreen: 'JARGON SCREEN!',
    newIdea: '"I have an idea!"',
    ginesOn: '🔥 GINÈS MODE — the bugs are about to get rude 🔥',
    ginesBadge: 'GINÈS MODE',
    discoOn: '🪩 DISCO MODE — let prod shine 🪩',
    discoBadge: 'DISCO MODE 🪩',
    boissonOn: '🍺 DRINK MODE — who invited happy hour to prod? 🍺',
    boissonBadge: 'DRINK MODE 🍺',
    speedOn: '⚡ SPEED MODE — everything 30% faster ⚡',
    speedBadge: 'SPEED MODE ⚡',
    menuCode: '[ C ] secret code…',
    codeTitle: '> SECRET CODE_',
    codeHint: '[ ENTER: submit · ESC: close ]',
    codeUnknown: 'unknown code_',
    indepDodge: '"not available, on a gig!"',
    indepHired: '"I accept the mission!"',
    indepKill: 'billed by the freelancer_',
    scopeCreep: 'SCOPE CREEP +1!',
    reEncrypted: 'change request signed_',
    mutedTag: ' · 🔇 muted',
    konami: '☠ KONAMI CODE — GOD MODE ARMED — CHEATER SPOTTED ☠',
    helpSections: [
      ['GOAL', [
        'Protect your PROJECT: every enemy that reaches it = DRIFT. Too much drift = GAME OVER.',
        'Survive every sprint then beat THE FURIOUS EXEC BOARD: project delivered, and the remaining time pays a bonus!',
      ]],
      ['HOW TO CLARIFY A NEED', [
        'Type the FIRST LETTER of an enemy to lock it, then finish',
        'its word without a typo (spaces are optional). A typo resets the combo.',
      ]],
      ['LEVELS & POINTS', [
        'lvl.1 ▲ vague needs · lvl.2 ▲▲ deadlines (fast!) and legacy · lvl.3 ▲▲▲ business rules.',
        'Points = length × 10 × level × combo × SPEED (fast typing = up to ×3!).',
        'Some enemies drop a bonus: +1 life, points, combo +5, slow-mo, items.',
        'From ★★★: ULTIMATE SUPER COMBO — combo 5/10/15 = +1/+2/+3 combat stars',
        '(max 6, kept when the combo breaks). Powers (when the letter is not a valid',
        'keystroke): A shield 3 s (1★) · Z +1 life (3★) · E smite strongest (2★).',
      ]],
      ['ENEMY POWERS', [
        'MINIFIED words: some letters are masked (?), guess them!',
        'FLIPPED words: shown upside down — typed normally, read painfully.',
        'THE STAKEHOLDER [in] spams emails: type them before they hit the project.',
      ]],
      ['ITEMS', [
        'ENTER: ARBITRATION (max 3) — settles the need closest to the project.',
        'BACKSPACE: AUTOCOMPLETE (max 5) — the AI types the next 4 letters.',
      ]],
      ['POWER-UPS & BOSS', [
        'Golden words: coffee = slow-mo · rejected ticket = knockback · go nogo = purge.',
        'Every 4 sprints, a BOSS: chain its commands. It always drops +1 life.',
      ]],
      ['KEYS', [
        'TAB: release target · ESC: pause (then Q: quit, S: mute) · L (menu): language · B (menu): music',
      ]],
    ],
    // ---- game
    hudGod: '  ☠ GOD MODE = CHEATER ☠',
    hudItems: (bombs, lasers) => `arbitration x${bombs} [ENTER]   autocomplete x${lasers} [BACKSPACE]`,
    hudTime: 'TIME',
    hudStars: 'SUPER COMBO',
    hudStarsKeys: '  ·  A shield 1★ · Z +1 life 3★ · E smite 2★',
    starGain: (n) => `+${n} COMBAT STAR${n > 1 ? 'S' : ''}!`,
    starShield: 'SHIELD ★ 3 s!',
    starShieldBlock: 'shield ★!',
    starLife: '+1 LIFE ★',
    starSmite: 'SMITTEN ★',
    bannerBossWave: '!! STEERING COMMITTEE CONVENED !!',
    bannerWave: 'needs incoming...',
    bannerFinal: '!! THE FURIOUS EXEC BOARD IS COMING !!',
    /* First-encounter banner: NAME — one-line hint, shown once per run the
       first time each enemy type spawns. */
    enemyIntro: {
      bug: 'THE VAGUE NEED — type its word to clarify it!',
      typo: 'THE TYPO — a mistake in the spec: type it!',
      deadline: 'THE DEADLINE — fast, hurry up!',
      legacy: 'THE LEGACY SPEC — slow, but long to clarify.',
      elite: 'THE BUSINESS RULE — CamelCase, capitals included.',
      spammer: 'THE STAKEHOLDER — kill the source of the urgent emails!',
      ghost: 'THE GHOST NEED — it blinks: remember its word!',
      virus: 'THE SCOPE CREEP — it replicates on death: scope it fast!',
      monolith: 'THE SPEC DOC — takes 2 words to bring down.',
      microservice: 'THE USER STORY — it splits in two: break it down!',
      indep: 'THE FREELANCER — dodges, but its death takes one more.',
      spec: 'THE CONTRADICTORY REQ — its word means nothing. Good luck.',
      consultant: 'THE CONSULTANT — endless buzzwords, and it speeds up.',
      obfuscator: 'THE SLIDE DECK — its death drops a screen of jargon.',
      ransomware: 'THE CHANGE REQUEST — it re-scopes its word: start over!',
      po: 'THE INSPIRED SPONSOR — its ideas lengthen another word.',
      missile: 'THE URGENT EMAIL — the stakeholder\'s fast missile: type it quick!',
      powerup: 'POWER-UP — type it to trigger its power!',
    },
    finalBossName: 'THE FURIOUS EXEC BOARD',
    bossMainframe: 'THE LEGACY SYSTEM',
    bossDette: 'FUNCTIONAL DEBT',
    bossStagiaire: 'THE INTERN BA',
    bossCommercial: 'PRE-SALES',
    bossDatacenter: 'THE BIG BANG MIGRATION',
    bossReunion: 'THE ENDLESS MEETING',
    bossFramework: 'THE METHOD OF THE DAY',
    bossCertificat: 'THE GDPR AUDIT',
    bossAudit: 'THE QUALITY AUDIT',
    bossFacture: 'THE BUDGET OVERRUN',
    bossesSectionMain: 'CAMPAIGN BOSSES',
    bossesSectionInf: 'ENDLESS MODE BOSSES ∞',
    prodSaved: 'THE PROJECT IS DELIVERED!',
    timeBonus: 'TIME BONUS',
    pauseSub: 'the needs are waiting patiently...',
    pauseResume: '[ ESC or ENTER: resume ]',
    pauseMute: (muted) => muted ? '[ S: 🔇 sound off — turn back on ]' : '[ S: 🔊 mute sound ]',
    pauseQuit: '[ Q: quit game — score not saved ]',
    lvl: 'lvl.',
    minified: ' [minified]',
    recruiter: ' [stakeholder]',
    bossName: 'STEERING COMMITTEE',
    newMessage: 'new email!',
    fast: '>> FAST',
    noBombs: 'OUT OF ARBITRATION!',
    noProcess: 'NO NEED TO SETTLE',
    bombSent: 'arbitration ruled_',
    noLasers: 'OUT OF AUTOCOMPLETE!',
    lockFirst: 'LOCK A TARGET FIRST!',
    suggestion: 'suggestion accepted_',
    lifeUp: '+1 LIFE — PROJECT REFRAMED',
    prodHealthy: 'PROJECT ON TRACK',
    stockFull: 'stock full',
    invincible: 'INVINCIBLE (cheater)',
    bossTouch: '!! THE BOSS MADE THE PROJECT DRIFT !!',
    incident: 'THE PROJECT IS DRIFTING!',
    powerSlowmo: '☕ COFFEE BREAK\nslow-mo 5 s',
    powerRevert: 'REJECTED TICKET\nneeds knocked back!',
    powerNuke: 'GO NOGO\nscreen purged!',
    prodDown: 'PROJECT INTO THE WALL',
    // ---- game over
    goWin: 'VICTORY — PROJECT DELIVERED',
    goDiff: 'difficulty:',
    statSprints: 'SPRINTS SURVIVED',
    statSpeed: 'SPEED',
    wpmUnit: 'wpm',
    statAccuracy: 'ACCURACY',
    statBugs: 'NEEDS CLARIFIED',
    statBosses: 'BOSSES DEFEATED',
    shame: '☠ GOD MODE DETECTED — CHEATER SCORE, NOT SAVED ☠',
    ranked: (rank) => `You ranked #${rank} overall!`,
    offline: '(server unreachable — score not saved)',
    replay: '[ ENTER: replay ]    [ M: menu ]',
    // ---- DOM form
    formTitle: '> SAVE YOUR SCORE_',
    formPseudo: 'nickname *',
    formFirstName: 'first name ',
    formLastName: 'last name ',
    formEmail: 'email ',
    formPhone: 'phone ',
    formOpt: '(optional)',
    formConsent: 'I agree to be contacted after the event. Without this box, '
      + 'name, email and phone are not stored (GDPR: data deleted '
      + 'after the prize draw, never shared).',
    formSave: '[ SAVE ]',
    formSkip: '[ skip ]',
  },
};

function T(key) {
  const v = I18N[LANG][key] ?? I18N.fr[key];
  return v !== undefined ? v : key;
}

/* Libellé/tagline de difficulté selon la langue (définis dans main.js). */
function diffLabel(d) { return LANG === 'en' && d.labelEn ? d.labelEn : d.label; }
function diffTagline(d) { return LANG === 'en' && d.taglineEn ? d.taglineEn : d.tagline; }

function setLang(lang) {
  LANG = lang;
  localStorage.setItem('totd-lang', lang);
  document.documentElement.lang = lang;
  applyFormLang();
}

/* Le formulaire de fin de partie est en DOM (index.html) : on le traduit ici. */
function applyFormLang() {
  const set = (sel, txt) => { const el = document.querySelector(sel); if (el) el.textContent = txt; };
  set('#save-form h2', T('formTitle'));
  set('label[for="input-pseudo"]', T('formPseudo'));
  const opt = ` <span class="opt">${T('formOpt')}</span>`;
  const setOpt = (sel, txt) => {
    const el = document.querySelector(sel);
    if (el) el.innerHTML = txt + opt;
  };
  setOpt('label[for="input-firstname"]', T('formFirstName'));
  setOpt('label[for="input-lastname"]', T('formLastName'));
  setOpt('label[for="input-email"]', T('formEmail'));
  setOpt('label[for="input-phone"]', T('formPhone'));
  set('.consent span', T('formConsent'));
  set('#save-form button[type="submit"]', T('formSave'));
  set('#btn-skip', T('formSkip'));
}

// scripts chargés en fin de body : le DOM du formulaire existe déjà
document.documentElement.lang = LANG;
applyFormLang();
