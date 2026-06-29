/* Sprites ASCII — thème Business Analyst. Tout le jeu est typographique :
   besoins flous, user stories, stakeholders, comités… au lieu des bugs. */
'use strict';

const ASCII = {
  // BESOIN FLOU (+ RÈGLE MÉTIER en élite) : post-its et notes imprécises avec un ?
  bug: [
    ' .-----.\n |  ?  |\n |_____|',
    ' .____.\n |~? ~|\n |_~ _|\n  ----',
    ' ______\n |TODO?|\n |.....|\n ------',
    ' .-=-.\n ( ?? )\n  )=(',
    ' [ ? ]\n |~~~|\n |___|',
    ' .----.\n | ~? |\n | ?~ |\n  \\||/',
    '  __\n |??|\n |~~|\n ----',
    ' /----\\\n |?  ?|\n \\----/',
  ],
  // SPEC LEGACY : vieux classeur de cahier des charges (slot <tech> = techno datée)
  legacy: [
    ' .------.\n | SPEC  |\n | <tech>|\n_|_v1.0__|_\n   (x_x)/',
    '  _______\n /  OLD  \\\n | (x_x) |\n | CDC95 |\n  \\_____/\n  /|||\\',
    ' [######]\n [#CDC.#]\n [##~~##]\n  ||  ||',
    '   ___\n  /   \\\n | EOL |\n | doc |\n  \\___/\n (x_x)',
    ' .-[]-.\n |MERIS|\n |_____|\n (x_x)/',
    ' ______\n| .doc |\n| 1998 |\n \'----\'\n /|  |\\',
  ],
  // LA DEADLINE : l'échéance qui fonce
  deadline: [
    '  .----.\n ( 23:59 )\n  \'----\'\n   /||\\',
    '   _!_\n  / ! \\\n |DEAD |\n |LINE |\n  \\___/',
    '  \\!/\n (@_@)\n /|_|\\\n  | |',
    ' .-----.\n( URGENT )\n \'-----\'\n  // \\\\',
    ' _____\n \\ o /\n  ) (\n / o \\\n -----',
    '  .----.\n ( J-1 !! )\n  \'----\'\n   /||\\',
  ],
  // POWER-UP : pause café / validation
  powerup: [
    '  ( (\n   ) )\n c[___]',
    '   ) )\n  ( (\nc[####]',
  ],
  // LE STAKEHOLDER : campe au fond et spamme des emails
  spammer: [
    '  ____\n / o_o \\\n |  v  |\n  \\___/\n  /|@|\\\n  [@@]',
    '  .---.\n ( -_- )\n  \'---\'\n  /|@|\\\n  [@@]',
    '  ____\n / ^_^ \\\n | mail |\n  \\___/\n  /|@|\\',
  ],
  // EMAIL URGENT : projectile envoyé par le stakeholder
  missile: [
    '<=[@@]',
    '<--|@|',
    '<=(@)',
    '<-=[!]',
  ],
  // LA COQUILLE : faute dans la spec
  typo: [
    ' ,_,\n(x_o)\n(( ))\n ^ ^',
    ' ._.\n(o_x)\n<|~|>\n ~ ~',
  ],
  // BESOIN FANTÔME : le besoin qui disparait
  ghost: [
    ' .--.\n( o_o )\n(    )\n \\/\\/\\/',
    '  .--.\n ( -_- )\n (     )\n  ~/\\/~',
  ],
  // SCOPE CREEP : se réplique en mini-besoins
  virus: [
    ' +\\^/+\n>(+ +)<\n +/v\\+',
    ' +|+\n<(++)>\n +|+',
  ],
  // CAHIER DES CHARGES : le pavé qui exige 2 mots
  monolith: [
    ' _______\n|=CDC===|\n|=#####=|\n|=p.250=|\n|_______|',
    ' _______\n|=SPEC==|\n|=o.o===|\n|=######|\n|__|____|',
  ],
  // EXIGENCE CONTRADICTOIRE : mot qui ne veut rien dire
  spec: [
    ' .____.\n | ?! |\n |~~~~|\n |____|\n  /||\\',
    ' .____.\n |?!?!|\n |~~~~|\n |____|\n  /||\\',
  ],
  // USER STORY : carte / post-it qui se scinde
  microservice: [
    ' .----.\n | US |\n |....|\n \'----\'',
    ' .----.\n |STO |\n |RY..|\n \'----\'',
  ],
  // LE FREELANCE : esquive, en mission au TJM
  indep: [
    ' (o_o)\n<[##]>\n /||\\\n  E E',
    ' (-_o)\n<[%%]>\n /||\\\n  E E',
  ],
  // LE SPONSOR INSPIRÉ : une idée toutes les 5 s
  po: [
    '  \\!/\n (^o^)\n /|::|\\\n  d b',
    '  \\!/\n (^u^)\n /|--|\\\n  d b',
  ],
  // LE POWERPOINT : écran de slides / jargon
  obfuscator: [
    ' .-----.\n |##|##|\n |-----|\n | KPI |\n \'--+--\'',
    ' .-----.\n |slide|\n |# 42 |\n |.....|\n \'--+--\'',
  ],
  // LE CONSULTANT : buzzwords à rallonge, et il facture
  consultant: [
    '  ____\n ( o_O )\n /|===|\\\n  |EUR|\n  d   b',
    '  ____\n ( ¬_¬ )\n /|===|\\\n  |TJM|\n  d   b',
  ],
  // L'AVENANT : re-chiffre son mot (le besoin rechange)
  ransomware: [
    '  .--.\n /.--.\\\n ||  ||\n.-====-.\n|AVENANT|\n\'------\'',
  ],
  // COMITÉ DE PILOTAGE : la table de COPIL
  boss: [
    '   ___COPIL___\n  | (o) (o) (o)|\n  |   _____    |\n  |  /TABLE\\   |\n   \\_________/\n   _|=======|_\n  / |=======| \\\n    |=|   |=|',
    '   __STEERCO__\n  /==||==||==\\\n | (o)(o)(o) |\n |  ======   |\n  \\_________/\n _|#######|_\n/ |#######| \\\n  |_|   |_|',
  ],
  // Boss du mode infini
  mainframe: [
    ' _________\n|LE  S.I. |\n| ###  ## |\n| oo o oo |\n| HISTO.  |\n| oo o oo |\n|_________|\n |__|  |__|',
  ],
  dette: [
    '    ____\n   |RIP |\n  _|____|_\n | DETTE  |\n |__ ____ |\n |  FONCT |\n |________|',
  ],
  stagiaireBoss: [
    '  \\!!/\n (>_<)\n<|BA?|>\n /|_|\\\n d   b',
  ],

  commercial: [
    '   ____\n  ( ^o^ )\n /|+++|\\\n  |VENTE|\n  d   b',
  ],
  datacenter: [
    ' )BIG( )\n(BANG) (\n|=====|\n|#x.x#|\n|#####|\n|__,__|',
  ],

  reunion: [
    ' .------.\n( 18:00+ )\n \'------\'\n__|____|__\n o o o o o',
  ],
  framework: [
    ' .____.\n |SAFe|\n |NEW!|\n \'----\'\n  \\o/',
  ],
  certificat: [
    ' ______\n| RGPD |\n|  X   |\n|AUDIT |\n|______|',
  ],
  audit: [
    '   __\n  (o_o)\n /|===|\\\n |[vv]|\n  d  b',
  ],
  facture: [
    '   .--.\n  ( EUR )\n ( +++++ )\n  \'-||-\'\n   ||',
  ],

  // Le boss final : LE COMEX EN COLÈRE — costume, cravate, sourcils froncés
  finalBoss: [
    '     _________\n    /  _____  \\\n   |  \\\\   //  |\n   | (\\@) (@/) |\n   |    ___    |\n   |   /___\\   |\n    \\_________/\n   __|       |__\n  /  | COMEX |  \\\n |   | (===) |   |\n |___|  |#|  |___|\n  (_)   |#|   (_)\n        |_|',
  ],
  player:
    '  (o_o)\n<)   )>\n /   \\\n[ BA  ]',
  prod:
    '[=PROJET=]\n[ ###### ]\n[ :::::: ]\n[ ###### ]\n[ :::::: ]\n[ ###### ]\n[________]',
  prodBurnt:
    '[=pr0jet=]\n[ %;%.;% ]\n[ x.. .x ]\n[ ;%,;%, ]\n[  ..;.  ]\n[ ,%;.%; ]\n[__/_,___]',
};

function pickArt(kind, techName) {
  const arts = ASCII[kind];
  let art = arts[Math.floor(Math.random() * arts.length)];
  if (techName) {
    const name = techName.toUpperCase().slice(0, 8);
    const pad = Math.max(0, 6 - name.length);
    art = art.replace('<tech>', name + ' '.repeat(pad));
  }
  return art;
}
