export interface Project {
  slug: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  tags: string[]
  image?: string
  imageFull?: string
  links: {
    github?: string
    demo?: string
  }
  highlights: string[]
  year: string
  category: 'app' | 'tool' | 'site' | 'ai'
}

export const projects: Project[] = [
  {
    slug: "trackrma",
    title: "Trackrma",
    subtitle: "Application SAV intelligente",
    description: "Pilotage complet des retours SAV : suivi RMA, réparations, réexpéditions et dashboards temps réel. Développée pour un grand groupe de logistique frigorifique.",
    longDescription: "Trackrma est née d'un constat simple : dans un service SAV, chaque retour matériel génère une chaîne de saisies manuelles — tickets, emails, tableurs — où l'information se perd et où les délais s'allongent. Le suivi devenait un casse-tête dès que le volume augmentait.\n\nL'application centralise tout le cycle de vie d'un retour : ouverture du dossier RMA, suivi de l'article en réparation, statuts automatisés à chaque étape, jusqu'à la réexpédition au client. Les équipes voient l'état de chaque dossier en temps réel, sans avoir à relancer personne ni à fouiller dans les emails.\n\nConçue avec le responsable d'exploitation SAV d'un grand groupe de logistique frigorifique, elle a été développée en cycle court avec des points d'étape réguliers. Résultat mesuré : plus de 3 heures par semaine gagnées sur la saisie de données et la communication entre services, et un retour en stock des articles accéléré.\n\nCôté technique : Next.js, React, TypeScript et Tailwind, avec une vidéo de démonstration animée produite en Remotion pour présenter les parcours clés de l'application.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind", "Remotion"],
    image: "/projects/trackrma.webp",
    imageFull: "/projects/trackrma-full.webp",
    links: {
      github: "https://github.com/FPH-DEV89",
      demo: "https://trackrma.vercel.app",
    },
    highlights: [
      "Suivi RMA complet avec états automatisés",
      "Dashboards temps réel avec métriques SAV",
      "3h+ gagnées par semaine sur la saisie de données",
      "Vidéo de démonstration animée via Remotion",
      "Déploiement Vercel — 0 maintenance",
    ],
    year: "2026",
    category: "app",
  },
  {
    slug: "gestion-epi",
    title: "Gestion EPI",
    subtitle: "Gestion d'équipements professionnels",
    description: "Suivi complet des Équipements de Protection Individuelle : inventaire, traçabilité, alertes d'expiration et rapports de conformité.",
    longDescription: "Les EPI — gants, casques, harnais, chaussures de sécurité — sont soumis à des obligations de contrôle strictes. Un équipement périmé ou mal tracé, c'est un risque pour l'employé et une non-conformité pour l'entreprise. Difficile de s'y retrouver quand on gère des centaines d'articles sur plusieurs sites.\n\nGestion EPI centralise l'inventaire de tous les équipements : attribution nominative, historique complet par article, et alertes automatiques quand un contrôle ou une expiration approche. Chaque équipement a sa fiche, chaque opération est tracée, et plus rien ne passe entre les mailles du filet.\n\nL'application génère également les rapports de conformité nécessaires aux audits, prêts à transmettre. L'interface est claire et responsive, pensé pour être utilisée aussi bien sur le terrain qu'au bureau.\n\nStack technique : Next.js et TypeScript, avec PostgreSQL et Prisma pour la couche données, et une interface construite avec shadcn/ui.",
    tags: ["TypeScript", "Next.js", "PostgreSQL", "Prisma", "shadcn/ui"],
    image: "/projects/gestion-epi.webp",
    imageFull: "/projects/gestion-epi-full.webp",
    links: {
      github: "https://github.com/FPH-DEV89/Gestion-EPI",
      demo: "https://epi-manager-lovat.vercel.app",
    },
    highlights: [
      "Inventaire et suivi des équipements",
      "Alertes expiration et maintenance",
      "Traçabilité nominative complète",
      "Génération de rapports de conformité",
      "Interface professionnelle et responsive",
    ],
    year: "2025",
    category: "tool",
  },
  {
    slug: "sobe-plomberie",
    title: "SOBE Plomberie",
    subtitle: "Site vitrine pro",
    description: "Site vitrine pour une entreprise de plomberie : services en cartes, demande de devis en ligne, zones d'intervention et SEO local.",
    longDescription: "SOBE Plomberie est une entreprise artisanale qui avait besoin d'un site digne de son savoir-faire : clair, rassurant, et qui apporte de vraies demandes de devis. Pas un simple CV en ligne — un outil commercial.\n\nLe site présente les services (dépannage, installation, rénovation, climatisation) sous forme de cartes claires, la zone d'intervention avec les communes desservies, et un formulaire de devis en ligne qui arrive directement dans la boîte mail de l'entreprise, sans intermédiaire.\n\nOptimisé SEO local et mobile-first, il charge en un clin d'œil et se déploie en un clic. Un exemple typique de site vitrine qui travaille pour l'entreprise 24h/24, sans maintenance technique.",
    tags: ["JAMstack", "JavaScript", "Tailwind CSS", "SEO"],
    image: "/projects/sobe-plomberie.webp",
    imageFull: "/projects/sobe-plomberie-full.webp",
    links: {
      github: "https://github.com/FPH-DEV89/sobe-plomberie",
      demo: "https://sobe-plomberie.vercel.app",
    },
    highlights: [
      "Présentation claire des services de plomberie",
      "Demande de devis en ligne directe",
      "Carte des zones d'intervention",
      "Optimisé SEO local et mobile-first",
      "Déploiement en un clic, zéro maintenance",
    ],
    year: "2025",
    category: "site",
  },
  {
    slug: "zenflow",
    title: "ZenFlow",
    subtitle: "Productivité & bien-être",
    description: "Application de concentration et de gestion du temps : sessions de flow, pauses intelligentes et statistiques de productivité.",
    longDescription: "ZenFlow est une application de productivité pensée pour ceux qui veulent travailler en profondeur sans s'épuiser. Le principe : alterner des sessions de concentration chronométrées et des pauses adaptées, pour tenir un rythme soutenable sur la durée.\n\nElle découpe la journée en sessions de focus, propose des pauses intelligentes qui s'adaptent au rythme de l'utilisateur, et affiche des statistiques claires : temps de concentration cumulé, meilleures plages horaires, tendances sur la semaine.\n\nL'interface est volontairement épurée et apaisante — aucune notification parasite, juste l'essentiel pour rester dans le flow. Un projet qui explore le lien entre design, rythme de travail et bien-être.",
    tags: ["TypeScript", "UX", "Productivité"],
    image: "/projects/zenflow.webp",
    imageFull: "/projects/zenflow-full.webp",
    links: {
      github: "https://github.com/FPH-DEV89/ZenFlow",
      demo: "https://zen-flow-iota.vercel.app",
    },
    highlights: [
      "Sessions de concentration chronométrées",
      "Pauses intelligentes et adaptatives",
      "Statistiques de productivité détaillées",
      "Design apaisant et épuré",
    ],
    year: "2025",
    category: "tool",
  },
  {
    slug: "wedding-planner",
    title: "Wedding Planner V2",
    subtitle: "Planificateur de mariage nouvelle génération",
    description: "Toute l'organisation d'un mariage au même endroit : invités, budget poste par poste, chronologie, checklist et tableau de bord.",
    longDescription: "Organiser un mariage, c'est des centaines de petites décisions dispersées entre tableurs, emails et post-it. Wedding Planner V2 regroupe tout au même endroit, pour que rien ne se perde.\n\nCôté invités : liste complète, statuts d'invitation et de réponse, suivi des repas. Côté budget : suivi poste par poste avec le reste à dépenser en temps réel. Ajoutez une chronologie des événements, une checklist de tâches avec échéances, et un tableau de bord qui récapitule tout en un coup d'œil.\n\nCette version 2 intègre les retours d'usage de la première version pour être plus rapide et plus simple au quotidien. Développée sur mesure, avec le souci du détail qu'on mettrait dans son propre mariage.",
    tags: ["TypeScript", "Full-stack", "Gestion de projet"],
    image: "/projects/wedding-planner.webp",
    imageFull: "/projects/wedding-planner-full.webp",
    links: {
      github: "https://github.com/FPH-DEV89/wedding-planner-v2",
      demo: "https://wedding-planner-v2-livid.vercel.app",
    },
    highlights: [
      "Gestion des invités et des réponses",
      "Suivi budgétaire poste par poste",
      "Chronologie et checklist des tâches",
      "Tableau de bord récapitulatif",
    ],
    year: "2025",
    category: "app",
  },
  {
    slug: "cap-sur-valencia",
    title: "Cap sur Valencia",
    subtitle: "Blog expatriation — famille à Valencia",
    description: "Blog d'expatriation d'une famille de cinq qui s'installe à Valencia : quartiers, budget réel, scolarité, démarches — chiffré et sans langue de bois.",
    longDescription: "Cap sur Valencia raconte la préparation d'un projet de vie : une famille de cinq personnes qui part s'installer à Valencia (Espagne) en 2028. Pas un simple récit de voyage — un vrai guide utile, chiffré, qui sert à d'autres familles envisageant l'expatriation.\n\nOn y trouve des guides détaillés des quartiers avec de vrais prix au m², un budget mensuel décomposé poste par poste sur trois scénarios, le système scolaire espagnol décrypté, et les démarches administratives expliquées étape par étape avec les pièges à éviter.\n\nLe ton est direct et personnel : on raconte les vraies questions, les vrais chiffres, les vraies inquiétudes. Côté technique, le site est en HTML/CSS statique, optimisé SEO, et hébergé gratuitement sur GitHub Pages.",
    tags: ["HTML/CSS", "Blog", "SEO", "Responsive"],
    image: "/projects/cap-sur-valencia.webp",
    imageFull: "/projects/cap-sur-valencia-full.webp",
    links: {
      github: "https://github.com/FPH-DEV89/cap-sur-valencia",
      demo: "https://fph-dev89.github.io/cap-sur-valencia/",
    },
    highlights: [
      "Guides quartiers détaillés avec vrais prix",
      "Budget mensuel chiffré (3 scénarios)",
      "Système scolaire espagnol décrypté",
      "Timeline d'expatriation sur 2 ans",
      "Contenu orienté SEO",
    ],
    year: "2026",
    category: "site",
  },
]

export const services = [
  {
    title: "Développement web",
    description: "Applications web sur mesure avec Next.js, React, TypeScript. De la landing page à l'application complexe.",
    icon: "code",
  },
  {
    title: "Applications SAV",
    description: "Solutions de gestion des retours et maintenance, dashboards temps réel, workflow automation.",
    icon: "settings",
  },
  {
    title: "Sites vitrine pro",
    description: "Sites professionnels modernes, responsive, optimisés SEO et déployés en un clic.",
    icon: "globe",
  },
  {
    title: "Automatisation & IA",
    description: "Agents intelligents, scripts d'automatisation, pipeline CI/CD, bots Discord et Telegram.",
    icon: "zap",
  },
  {
    title: "Design UI/UX",
    description: "Interfaces soignées, animations fluides (Framer Motion), rendu Apple Keynote.",
    icon: "palette",
  },
  {
    title: "Conseil & maintenance",
    description: "Audit technique, maintenance applicative, migration, optimisation des performances.",
    icon: "shield",
  },
]

export const faqItems = [
  {
    question: "Quels types de projets développez-vous ?",
    answer: "Je développe principalement des applications web avec Next.js, React et TypeScript : applications métier (SAV, gestion EPI), sites vitrine professionnels, outils de productivité, et solutions d'automatisation. Chaque projet est pensé pour être performant, maintenable et visuellement soigné.",
  },
  {
    question: "Quel est votre processus de travail ?",
    answer: "1) Analyse du besoin et cadrage — 2) Proposition technique et devis — 3) Développement avec points d'étape réguliers — 4) Tests et recette — 5) Déploiement et mise en production — 6) Suivi et maintenance. Je privilégie une communication directe et efficace, avec des livrables concrets à chaque étape.",
  },
  {
    question: "Combien coûte un projet ?",
    answer: "Chaque projet est unique. Le coût dépend de la complexité, du nombre de fonctionnalités, et du design souhaité. Je propose un devis gratuit après étude de votre besoin. Les projets commencent généralement à partir de 500€ pour un site vitrine simple.",
  },
  {
    question: "Quels sont les délais de réalisation ?",
    answer: "Un site vitrine peut être livré en 1 à 2 semaines. Une application plus complexe (SAV, gestion) demande 3 à 6 semaines selon le périmètre. Je m'engage toujours sur un calendrier précis avant de commencer.",
  },
  {
    question: "Proposez-vous de la maintenance après livraison ?",
    answer: "Oui, je propose des contrats de maintenance : mises à jour de sécurité, correctifs, évolutions mineures, et monitoring. Le déploiement sur Vercel inclut une maintenance de base gratuite (HTTPS, CDN, builds automatiques).",
  },
  {
    question: "Comment démarrer un projet avec vous ?",
    answer: "Contactez-moi via le formulaire du site ou par email. Je vous réponds sous 24h pour un premier échange gratuit. On discute de votre besoin, je vous fais une proposition technique et un devis — sans engagement.",
  },
]
