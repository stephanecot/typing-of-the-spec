/* Banques de mots — la rejouabilite vient d'ici. Reskin "Business Analyst" :
   exigences floues, backlog, ateliers, parties prenantes et reunions sans fin. */
'use strict';

const WORDS = {
  // Besoins flous de base : jargon BA court et rythme
  keywords: [
    'exigence', 'besoin', 'backlog', 'sprint', 'epic', 'story', 'kanban', 'persona', 'mockup', 'wireframe',
    'workflow', 'processus', 'livrable', 'perimetre', 'cadrage', 'atelier', 'recette', 'uat', 'mvp', 'roadmap',
    'jalon', 'gap', 'raci', 'swot', 'kpi', 'roi', 'okr', 'scope', 'sponsor', 'specs',
    'feature', 'lot', 'demo', 'gherkin', 'bpmn', 'swimlane', 'macro', 'arbitrage', 'priorisation', 'moscow',
    'sipoc', 'rfp', 'rfi', 'poc', 'tco', 'mep', 'golive', 'retro', 'velocity', 'burndown',
    'burnup', 'capacity', 'refinement', 'grooming', 'daily', 'standup', 'planning', 'review', 'faisabilite', 'formaliser',
    'modeliser', 'prototyper', 'maquette', 'story map', 'user journey', 'parcours', 'irritant', 'valeur metier', 'regle de gestion', 'cas dusage',
    'cas nominal', 'cas limite', 'scenario', 'critere', 'acceptation', 'definition of done', 'definition of ready', 'dod', 'dor', 'ticket',
    'jira', 'confluence', 'miro', 'figma', 'lucidchart', 'balsamiq', 'axure', 'trello', 'notion', 'sharepoint',
    'indicateur', 'tableau de bord', 'dashboard', 'reporting', 'referentiel', 'donnee', 'dictionnaire de donnees', 'modele de donnees', 'mcd', 'mld',
    'diagramme', 'flux', 'processus cible', 'processus actuel', 'as is', 'to be', 'ecart', 'fit gap', 'cartographie', 'macro process',
    'sous processus', 'acteur', 'partie prenante', 'stakeholder', 'commanditaire', 'moa', 'moe', 'amoa', 'expression de besoin', 'cahier des charges',
    'specifications', 'note de cadrage', 'comite', 'gouvernance', 'instance', 'business case', 'etude dopportunite', 'gain attendu', 'charge', 'chiffrage',
    'estimation', 'livraison', 'mise en service', 'conduite du changement', 'formation', 'support', 'hypercare', 'recette metier', 'pv de recette', 'anomalie',
    'exigence fonctionnelle', 'exigence non fonctionnelle', 'performance', 'ergonomie', 'accessibilite', 'disponibilite', 'tracabilite', 'matrice de tracabilite', 'user story', 'feature team',
    'po', 'product owner', 'scrum master', 'squad', 'tribu', 'okr metier', 'valeur', 'priorite', 'risque', 'hypothese',
    'contrainte', 'dependance', 'perimetre cible', 'quick win', 'steerco', 'copil', 'comex', 'kickoff', 'demo client', 'sprint review',
    'definition du besoin', 'cadrer', 'clarifier', 'challenger', 'recetter', 'documenter', 'animer', 'arbitrer', 'prioriser', 'decouper',
  ],

  // Regles metier d'elite : exceptions CamelCase (les majuscules font partie du challenge)
  exceptions: [
    'UserStory', 'ChangeReq', 'GoNoGo', 'AsIsToBe', 'DodDor', 'RaciMap',
    'ChangeRequest', 'GapAnalysis', 'BusinessRule', 'AcceptanceCriteria', 'DefinitionOfDone',
    'DefinitionOfReady', 'MinimumViableProduct', 'ProofOfConcept', 'StakeholderMap', 'ServiceBlueprint',
    'NonFunctionalRequirement', 'BusinessCase', 'UserJourney', 'CustomerJourney', 'PainPoint',
    'ProcessMap', 'DataDictionary', 'SourceOfTruth', 'MoscowPriority', 'FitGapAnalysis',
    'TraceabilityMatrix', 'ScopeStatement', 'RequirementSpec', 'UseCaseDiagram', 'SwimLane',
    'BpmnDiagram', 'EpicBreakdown', 'SprintReview', 'ProductBacklog', 'BurndownChart',
    'ValueStream', 'QuickWin', 'GoLivePlan', 'HyperCare', 'ChangeManagement',
    'SteeringCommittee', 'KickoffMeeting', 'RoadmapAlignment', 'BacklogGrooming', 'StoryMapping',
    'PersonaCanvas', 'ProductVision', 'WorkshopOutput', 'BusinessNeed', 'RootCauseAnalysis',
    'KanoModel', 'WeightedShortestJob', 'ReturnOnInvestment', 'CostOfDelay', 'MinimumLovableProduct',
  ],

  // Specs legacy : fragments d'exigences et de user stories qui refusent de mourir
  snippets: [
    'en tant que user', 'je veux pouvoir', 'afin de', 'le systeme doit', 'etant donne que',
    'alors le systeme', 'selon le metier', 'a valider en copil', 'sous reserve de', 'cf. annexe 3',
    'en tant que client', 'je souhaite', 'pour que', 'quand je clique', 'alors je vois',
    'la regle dit que', 'si le statut est', 'sinon afficher', 'le champ est obligatoire', 'montant en euros',
    'a confirmer avec la moa', 'hors perimetre v1', 'a arbitrer en comite', 'voir maquette page 4', 'cas nominal et cas derreur',
    'critere dacceptation 1', 'given when then', 'as a user', 'i want to', 'so that',
    'le besoin reste flou', 'a preciser plus tard', 'decision a venir', 'en attente de validation', 'non chiffre a ce jour',
    'depend du legacy', 'a challenger', 'tbd', 'a definir', 'a venir',
    'le metier verra plus tard', 'format jj/mm/aaaa', 'nominal puis exception', 'reste a cadrer', 'sous reserve de budget',
  ],

  // Vieilles methodes et outils qui survivent a tout
  legacyNames: [
    'merise', 'uml', 'cycle en v', 'sdlc', 'itil', 'cmmi', 'togaf', 'prince2', 'pmbok', 'waterfall',
    'cycle en cascade', 'ssadm', 'sadt', 'idef0', 'rational rose', 'gantt papier', 'ms project', 'visio 2003', 'business objects', 'vba',
    'fax', 'parapheur', 'note interne', 'courrier recommande', 'classeur excel', 'base access', 'lotus notes', 'powerpoint 95', 'sharepoint 2007', 'cobol etat',
    'mainframe', 'as400', 'modele entite relation', 'dictionnaire papier', 'cahier des charges papier', 'methode merise', 'comite waterfall', 'effet tunnel', 'planning gantt', 'reunion mensuelle',
    'fiche navette', 'tableur partage', 'macro excel', 'mail avec piece jointe', 'reseau partage', 'lecteur reseau', 'pdf scanne', 'specs dans un word', 'modele cascade', 'phase amont',
  ],

  // Faucheuses deadline : l'horreur du quotidien (rapides !)
  deadlines: [
    'copil', 'comite', 'jalon', 'release', 'go-live', 'demo', 'sprint review', 'recette', 'uat', 'mep',
    'cadrage', 'steerco', 'kickoff', 'retro', 'daily', 'refinement', 'comex', 'arbitrage', 'go nogo', 'chiffrage',
    'spec floue', 'mail urgent', 'ticket p1', 'asap', 'call 8h30', 'slides', 'powerpoint', 'excel', 'point sync', 'workshop',
    'brainstorm', 'atelier cadrage', 'copil mensuel', 'revue de specs', 'gel des specs', 'feature freeze', 'mep vendredi', 'demo client', 'recette metier', 'pv de recette',
    'comite projet', 'comite de pilotage', 'jalon go', 'fin de sprint', 'planning poker', 'backlog refine', 'arbitrage budget', 'note de cadrage', 'plan de charge', 'comite de crise',
    'war room', 'gel des changements', 'cloture comptable', 'ticket bloque', 'escalade n3', 'audit rgpd', 'audit qualite', 'depassement budget', 'golive reporte', 'priorite qui change',
    'specs dans un mail', 'decision en couloir', 'besoin qui change', 'reunion preparatoire', 'point hebdo', 'sponsor injoignable', 'metier absent', 'maquette a refaire', 'scope qui derive', 'avenant signe',
  ],

  // Boss : commandes BA completes (les verbes qui repoussent le boss)
  commands: [
    'valider le besoin', 'arbitrer le scope', 'prioriser le backlog', 'animer l atelier', 'rediger la user story',
    'obtenir le go', 'cadrer le perimetre', 'challenger le besoin', 'tracer la matrice raci', 'formaliser l exigence',
    'modeliser le processus', 'decouper l epic', 'ecrire le critere', 'valider la maquette', 'aligner les parties prenantes',
    'planifier le jalon', 'chiffrer la charge', 'qualifier l anomalie', 'organiser le copil', 'presenter la roadmap',
    'arbitrer la priorite', 'clarifier la regle de gestion', 'valider le perimetre', 'recetter la fonctionnalite', 'documenter le besoin',
    'animer le refinement', 'preparer la demo', 'cadrer l atelier', 'definir le mvp', 'ecrire le cahier des charges',
    'valider la definition of done', 'mettre a jour le backlog', 'escalader au sponsor', 'trancher en comite', 'geler le scope',
    'lever le risque', 'planifier la mep', 'organiser la recette', 'mesurer le kpi', 'aligner la roadmap',
    'prioriser selon moscow', 'cartographier le processus', 'rediger la note de cadrage', 'obtenir la validation moa', 'fermer le ticket',
  ],

  // LE STAKEHOLDER : ennemi spammeur, et ses emails urgents a abattre
  spammers: [
    'le sponsor', 'le metier', 'la dsi', 'le client', 'le directeur', 'le comex', 'la prod', 'le juridique',
    'le marketing', 'la finance', 'le comite', 'le directeur commercial', 'la moa', 'le top management', 'l utilisateur final',
  ],
  missiles: [
    'urgent', 'pour hier', 'asap', 'petite question', 'tu peux jeter un oeil', 'rapidement', 'c est bloquant',
    'en copie', 'relance', 'relance 2', 'derniere chance', 'top urgent', 'des aujourdhui', 'un point rapide ?',
    '5 min ?', 'tu valides ?', 'ca avance ?', 'on en est ou ?', 'bloquant prod', 'le client attend',
    'le copil veut', 'des maintenant', 'reponds vite', 'ping', 'fwd: fwd:', 'important', 'a traiter ce soir',
    'urgent !', 'le sponsor demande',
  ],

  // LA COQUILLE (niv.1) : des mots BA deja mal ecrits — tapez la faute telle quelle
  typos: [
    'exigance', 'bakclog', 'sprnit', 'livrabe', 'besion', 'perimtere', 'cadrge', 'recete', 'jallon', 'roadmpa',
    'stakholder', 'persoan', 'atelir', 'procesus', 'spces', 'kanabn', 'mockpu', 'wirefrme', 'arbitrge', 'prioristaion',
    'comaite', 'livrbale', 'beosin', 'scoep', 'backog', 'jiar', 'epci', 'rerto',
  ],

  // LE FREELANCE (niv.3) : la vie de prestataire
  freelance: [
    'tjm', 'regie', 'forfait', 'mission', 'intercontrat', 'portage', 'kbis', 'urssaf', 'freelance', 'prestataire',
    'tjm a negocier', 'dispo en mars', 'micro entreprise', 'facture impayee', 'full remote sinon rien', 'pas de cdi merci',
    'mon reseau suffit', 'acompte de moitie', 'mission courte', 'devis gratuit', 'tjm double en urgence', 'relance facture',
    'sous traitance', 'consultant externe', 'cumul de missions',
  ],

  // LE SPONSOR INSPIRE (niv.5) : ses idees foireuses, a taper…
  poIdeas: [
    'on pivote', 'comme uber', 'de la blockchain', 'avec de l ia', 'juste un bouton', 'c est facile non',
    'pour hier', 'mvp direct en prod', 'les users adorent', 'ca prend 5 min', 'comme tiktok', 'un petit chatbot',
    'gamifions tout', 'une marketplace', 'du machine learning', 'on verra en v2', 'et un peu de data',
    'avec du temps reel', 'et une appli mobile', 'on fait comme avant',
  ],
  // …et les rallonges qu'il greffe aux besoins des autres (scope creep)
  scopeCreep: [' v2', ' v3', ' mais en mieux', ' avec une ia', ' multi pays', ' en temps reel', ' mobile first', ' rgpd', ' offline', ' et un dashboard'],

  // LE POWERPOINT (niv.4) : le jargon de slide qui masque tout
  obfuscation: [
    'raci', 'moscow', 'sipoc', 'bpmn', 'okr', 'kpi', 'swot', 'rfp', 'rfi', 'poc',
    'tco', 'roi', 'dod', 'dor', 'mvp', 'uat', 'mep', 'sla', 'slo', 'pdca',
    'smart', 'kano', 'rice', 'wsjf', 'pestel', 'soar', 'vrio', 'ansoff', 'gemba', 'pareto',
    'gantt', 'pert', 'evm', 'capex', 'opex', 'fte', 'brd', 'frd', 'srs', 'epc',
    '5 pourquoi', 'ishikawa', 'value stream map', 'matrice raci', 'matrice swot',
  ],

  // LE CONSULTANT (niv.4) : buzzwords de cabinet de conseil
  buzzwords: [
    'synergie', 'disruptif', 'value stream', 'north star', 'quick win', 'low hanging fruit', 'time to market',
    'agile at scale', 'design thinking', 'conduite du changement', 'proposition de valeur', 'business case',
    'best practices', 'paradigm shift', 'thought leader', 'alignement strategique', 'montee en competence',
    'vision 360', 'cost killing', 'lean six sigma', 'top management', 'deep dive', 'core business',
    'growth hacking', 'scalabilite', 'data driven', 'customer centric', 'test and learn', 'fail fast',
    'one team', 'north star metric', 'transformation digitale', 'plateformisation', 'culture produit',
    'mobile first', 'cloud first', 'creation de valeur', 'effet de levier', 'build measure learn',
  ],

  // Power-ups (libelles fixes, dores)
  powerups: {
    slowmo: 'cafe',
    knockback: 'ticket rejete',
    nuke: 'go nogo',
  },

  /* Variantes anglaises des banques tres francaises — les autres banques
     (jargon BA, commandes, fragments) sont communes aux deux langues. */
  en: {
    deadlines: [
      'steering co', 'committee', 'milestone', 'release', 'go-live', 'demo', 'sprint review', 'uat', 'deployment', 'scoping',
      'steerco', 'kickoff', 'retro', 'daily', 'refinement', 'exec board', 'arbitration', 'go nogo', 'estimate', 'vague spec',
      'urgent email', 'p1 ticket', 'asap', '8am call', 'slides', 'deck', 'excel', 'sync point', 'workshop', 'brainstorm',
      'scoping workshop', 'monthly steerco', 'spec review', 'spec freeze', 'feature freeze', 'friday deploy', 'client demo', 'user acceptance', 'sign off', 'project board',
      'gate review', 'end of sprint', 'planning poker', 'backlog refine', 'budget arbitration', 'scoping note', 'capacity plan', 'crisis meeting', 'war room', 'change freeze',
      'spec in an email', 'hallway decision', 'shifting need', 'prep meeting', 'weekly sync', 'sponsor unavailable', 'business away', 'rework the mockup', 'scope creep', 'signed change request',
      'gdpr audit', 'quality audit', 'budget overrun', 'go-live slip', 'shifting priority', 'p1 incident', 'monday bug', 'forced update', 'license audit', 'expense report',
    ],
    missiles: [
      'urgent', 'due yesterday', 'asap', 'quick question', 'can you take a look', 'quickly', 'this is blocking',
      'in cc', 'follow up', 'follow up 2', 'last chance', 'top urgent', 'since today', 'a quick sync ?',
      '5 min ?', 'can you confirm ?', 'any progress ?', 'where are we ?', 'prod blocker', 'client waiting',
      'steerco wants it', 'right now', 'reply fast', 'ping', 'fwd: fwd:', 'important', 'by tonight',
      'urgent !', 'sponsor asks',
    ],
    spammers: [
      'the sponsor', 'the business', 'it dept', 'the client', 'the director', 'the exec board', 'prod team', 'legal',
      'marketing', 'finance', 'the committee', 'the steerco', 'the moa', 'top management', 'end user',
    ],
    freelance: [
      'tjm', 'day rate', 'short gig', 'free quote', 'freelance', 'contractor', 'umbrella company', 'subcontracting',
      'rate negotiable', 'available in march', 'unpaid invoice', 'full remote or nothing', 'no permanent contract',
      'my own boss', 'sole trader', 'upfront deposit', 'my network is enough', 'invoice reminder', 'never on the bench',
      'day rate doubled for rush', 'fixed price gig', 'stacking gigs', 'external consultant', 'sole proprietor',
    ],
    poIdeas: [
      'lets pivot', 'like uber', 'add blockchain', 'with some ai', 'just one button', 'easy right',
      'due yesterday', 'mvp straight to prod', 'users love it', 'takes 5 min', 'like tiktok', 'a small chatbot',
      'gamify everything', 'a marketplace', 'some machine learning', 'we will see in v2', 'and a bit of data',
      'with real time', 'and a mobile app', 'lets do it like before',
    ],
    scopeCreep: [' v2', ' v3', ' but better', ' with some ai', ' multi country', ' in real time', ' mobile first', ' gdpr', ' offline', ' and a dashboard'],
    buzzwords: [
      'synergy', 'disruptive', 'value stream', 'north star', 'quick win', 'low hanging fruit', 'time to market',
      'agile at scale', 'design thinking', 'change management', 'value proposition', 'business case',
      'best practices', 'paradigm shift', 'thought leader', 'strategic alignment', 'upskilling',
      '360 vision', 'cost killing', 'lean six sigma', 'c-level', 'deep dive', 'core business',
      'growth hacking', 'scalability', 'data driven', 'customer centric', 'test and learn', 'fail fast',
      'one team', 'north star metric', 'digital transformation', 'platformization', 'product culture',
      'mobile first', 'cloud first', 'value creation', 'build measure learn',
    ],
  },
};

/* Banque eventuellement traduite : utilisee pour les banques qui ont une
   variante dans WORDS.en quand la langue n'est pas le francais. */
function wordBank(name) {
  if (typeof LANG !== 'undefined' && LANG !== 'fr' && WORDS.en[name]) return WORDS.en[name];
  return WORDS[name];
}

/* Tire un mot au hasard dans une banque, en evitant les doublons a l'ecran
   et en respectant une longueur max (selon la difficulte). */
function pickWord(bank, { maxLen = 99, exclude = new Set() } = {}) {
  const pool = bank.filter((w) => w.length <= maxLen && !exclude.has(w));
  const source = pool.length ? pool : bank;
  return source[Math.floor(Math.random() * source.length)];
}
