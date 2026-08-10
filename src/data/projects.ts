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
    description: "Pilotage et optimisation des retours matériels — suivi RMA, réparations, réexpéditions.",
    longDescription: "Trackrma est une application complète de gestion des retours SAV (RMA) destinée aux équipes logistiques et maintenance. Elle permet de suivre chaque article du retour jusqu'à la réexpédition, avec dashboards temps réel, métriques détaillées, et automatisation des workflows de réparation. Développée pour un grand groupe de logistique frigorifique, elle optimise le taux de retour en stock et réduit les délais de traitement.",
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
    description: "Application professionnelle de suivi des Équipements de Protection Individuelle — inventaire, traçabilité, alertes.",
    longDescription: "Solution complète de gestion des EPI pour les entreprises. Suivi des stocks, traçabilité des équipements, alertes de maintenance et d'expiration, génération de rapports de conformité. Conçue pour les environnements professionnels exigeant une rigueur documentaire et une traçabilité sans faille.",
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
    description: "Site web professionnel pour une entreprise de plomberie avec présentation des services, devis en ligne et zone d'intervention.",
    longDescription: "Site vitrine complet pour SOBE Plomberie, une entreprise artisanale avec présentation des services (dépannage, installation, rénovation, climatisation), les zones d'intervention, et une demande de devis en ligne. Design moderne et responsive, optimisé SEO.",
    tags: ["JAMstack", "JavaScript", "Tailwind CSS", "SEO"],
    image: "/projects/sobe-plomberie.webp",
    imageFull: "/projects/sobe-plomberie-full.webp",
    links: {
      github: "https://github.com/FPH-DEV89/sobe-plomberie",
      demo: "https://sobe-plomberie.vercel.app",
    },
    highlights: [
      "Présentation claire des services de plomberie",
      "Demande de devis en ligne",
      "Carte des zones d'intervention",
      "Optimisé SEO et mobile-first",
    ],
    year: "2025",
    category: "site",
  },
  {
    slug: "freshr",
    title: "Freshr",
    subtitle: "Application innovante",
    description: "Application TypeScript nouvelle génération — solution moderne et performante.",
    longDescription: "Freshr est une application construite avec TypeScript, exploitant les dernières avancées du langage pour offrir une expérience rapide, typée et maintenable. Architecture modulaire et scalable, conçue pour évoluer avec les besoins.",
    tags: ["TypeScript", "React", "Moderne"],
    image: "/images/freshr.webp",
    links: {
      github: "https://github.com/FPH-DEV89/freshr",
    },
    highlights: [
      "Architecture TypeScript pure",
      "Performance et maintenabilité",
      "Design modulaire et scalable",
    ],
    year: "2025",
    category: "app",
  },
  {
    slug: "zenflow",
    title: "ZenFlow",
    subtitle: "Productivité & bien-être",
    description: "Application favorisant la concentration et la gestion du temps — flow state, pauses, rythme de travail optimal.",
    longDescription: "ZenFlow aide les professionnels à maintenir un état de flow optimal. Gestion de sessions de concentration, pauses intelligentes, statistiques de productivité, et personnalisation des cycles travail/repos. Une approche moderne du bien-être au travail.",
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
      "Statistiques de productivité",
      "Design apaisant et épuré",
    ],
    year: "2025",
    category: "tool",
  },
  {
    slug: "wedding-planner",
    title: "Wedding Planner V2",
    subtitle: "Planificateur de mariage nouvelle génération",
    description: "Application de planification de mariage — liste d'invités, budget, chronologie et organisation complète.",
    longDescription: "Version 2 d'un planificateur de mariage complet. Gestion des invités avec statuts et réponses, suivi budgétaire détaillé, chronologie des événements, checklist des tâches, et tableau de bord récapitulatif. Conçue pour simplifier l'organisation du plus beau jour.",
    tags: ["TypeScript", "Full-stack", "Gestion de projet"],
    image: "/projects/wedding-planner.webp",
    imageFull: "/projects/wedding-planner-full.webp",
    links: {
      github: "https://github.com/FPH-DEV89/wedding-planner-v2",
      demo: "https://wedding-planner-v2-livid.vercel.app",
    },
    highlights: [
      "Gestion des invités et réponses",
      "Suivi budgétaire complet",
      "Chronologie et checklist",
      "Tableau de bord récapitulatif",
    ],
    year: "2025",
    category: "app",
  },
  {
    slug: "maxpatrie",
    title: "Maxpatrie",
    subtitle: "Blog expatriation — famille à Valencia",
    description: "Blog d'expatriation d'une famille française qui s'installe à Valencia : quartiers, budget, scolarité, démarches — avec de vrais chiffres.",
    longDescription: "Maxpatrie est le blog d'expatriation d'une famille française en route pour Valencia (Espagne) en 2028. Au-delà du simple récit de voyage : guides détaillés des quartiers, budget de vie réel chiffré poste par poste, système scolaire espagnol décrypté, démarches administratives expliquées simplement. Un ton direct et personnel, pensé pour servir à d'autres familles qui envisagent l'expatriation.",
    tags: ["HTML/CSS", "Blog", "SEO", "Responsive"],
    image: "/projects/maxpatrie.webp",
    imageFull: "/projects/maxpatrie-full.webp",
    links: {
      github: "https://github.com/FPH-DEV89/maxpatrie-site",
      demo: "https://fph-dev89.github.io/maxpatrie-site/",
    },
    highlights: [
      "Guides quartiers détaillés avec vrais prix",
      "Budget mensuel chiffré (3 scénarios)",
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
