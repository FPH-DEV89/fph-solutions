// ============================================================
// SAV — Source de vérité de l'offre Maintenance / SAV FPH Solutions
// Ne pas modifier sans mettre à jour tous les consommateurs.
// ============================================================

export type PalierId = "serenite" | "croissance" | "partenaire";
export type CriticitéId = "P1" | "P2" | "P3" | "P4";

// ── Paliers ─────────────────────────────────────────────────

export interface Palier {
  id: PalierId;
  nom: string;
  accroche: string;
  prixMensuel: number;
  prixAnnuel: number;
  /** Texte libre : « 30 min / mois », « 1 h / mois » — jamais « 0.5 h » */
  heuresIncluses: string;
  reactivite: string;
  engagement: string;
  highlight: boolean;
  highlightLabel?: string;
  inclus: string[];
}

export const paliers: Palier[] = [
  {
    id: "serenite",
    nom: "Sérénité",
    accroche:
      "Le socle : votre site à jour, sauvegardé, surveillé, et un humain qui répond.",
    prixMensuel: 49,
    prixAnnuel: 490,
    heuresIncluses: "30 min / mois",
    reactivite: "48 h ouvrées",
    engagement: "Sans engagement, préavis 30 jours",
    highlight: false,
    inclus: [
      "Mises à jour de sécurité et correctifs de bugs, testés après application",
      "Sauvegardes quotidiennes, conservation 30 jours, restauration sur demande",
      "Surveillance automatisée 24/7 : disponibilité, certificats, erreurs serveur",
      "Correction des pannes bloquantes sans consommation d'heures",
      "30 min de modifications par mois (contenus, visuels, petites corrections)",
      "Assistance par email et ticket, réponse humaine sous 48 h ouvrées",
    ],
  },
  {
    id: "croissance",
    nom: "Croissance",
    accroche: "Le socle, plus du temps pour faire évoluer votre site.",
    prixMensuel: 99,
    prixAnnuel: 990,
    heuresIncluses: "1 h / mois",
    reactivite: "24 h ouvrées",
    engagement: "Sans engagement, préavis 30 jours",
    highlight: true,
    highlightLabel: "Le plus choisi",
    inclus: [
      "Tout ce que couvre le palier Sérénité",
      "1 h de modifications et de petites évolutions par mois",
      "Heure non utilisée reportable sur le mois suivant",
      "Environnement de préproduction pour tester avant la mise en ligne",
      "Rapport mensuel : disponibilité, sécurité, performances, temps passé",
      "Point en visio tous les 6 mois",
    ],
  },
  {
    id: "partenaire",
    nom: "Partenaire",
    accroche:
      "Un service prioritaire pour les sites qui font vivre votre activité.",
    prixMensuel: 199,
    prixAnnuel: 1990,
    heuresIncluses: "3 h / mois",
    reactivite: "4 h ouvrées",
    engagement: "Sans engagement, préavis 30 jours",
    highlight: false,
    inclus: [
      "Tout ce que couvre le palier Croissance",
      "3 h de modifications et d'évolutions par mois, reportables un mois (plafond 6 h)",
      "Prise en charge d'une panne critique sous 4 h ouvrées",
      "Canal direct : email prioritaire et visio chaque trimestre",
      "Revue de performance et de sécurité chaque trimestre",
      "Feuille de route trimestrielle des évolutions",
    ],
  },
];

// ── Hors forfait ─────────────────────────────────────────────

export const horsForfait = {
  tauxHoraire: "70 € HT / h",
  delaiChiffrage: "5 jours ouvrés",
  precision:
    "Au-delà des heures incluses, toute intervention est chiffrée avant de commencer. Pack de 5 h : 300 € HT (soit 60 € HT/h), valable 6 mois. Aucun dépassement facturé sans votre accord écrit.",
};

// ── Reprise de site existant ─────────────────────────────────

export const reprise = {
  label: "Audit de prise en main d'un site existant",
  prix: "290 € HT",
  detail:
    "4 h pour auditer, sécuriser et reprendre un site que je n'ai pas construit. Déduit de votre premier trimestre si vous prenez un abonnement annuel.",
};

// ── Horaires ─────────────────────────────────────────────────

export const horaires =
  "Du lundi au vendredi, 9 h à 18 h, hors jours fériés. Aucune astreinte le soir ni le week-end : c'est ce qui permet de tenir ces tarifs.";

// ── Garantie ─────────────────────────────────────────────────

export const garantie =
  "Après la livraison, les bugs de conformité au cahier des charges sont corrigés gratuitement pendant 30 jours. Ce n'est qu'après que la maintenance prend le relais.";

// ── Matrice SLA ──────────────────────────────────────────────

export interface SLALevel {
  id: CriticitéId;
  label: string;
  definition: string;
  delais: Record<PalierId, string>;
  objectif: string;
}

export const sla: SLALevel[] = [
  {
    id: "P1",
    label: "Critique",
    definition:
      "Site ou application inaccessible, faille de sécurité active, perte de données, paiement en panne.",
    delais: {
      serenite: "24 h ouvrées",
      croissance: "8 h ouvrées",
      partenaire: "4 h ouvrées",
    },
    objectif: "Résolution ou solution de contournement le jour ouvré même.",
  },
  {
    id: "P2",
    label: "Majeure",
    definition:
      "Une fonctionnalité principale est dégradée ou inaccessible, le reste du site fonctionne.",
    delais: {
      serenite: "48 h ouvrées",
      croissance: "24 h ouvrées",
      partenaire: "8 h ouvrées",
    },
    objectif: "Résolution sous 3 jours ouvrés.",
  },
  {
    id: "P3",
    label: "Mineure",
    definition:
      "Bug visible mais non bloquant, faute d'affichage, petite gêne d'usage.",
    delais: {
      serenite: "4 jours ouvrés",
      croissance: "48 h ouvrées",
      partenaire: "24 h ouvrées",
    },
    objectif: "Traitée dans le lot d'interventions de la semaine.",
  },
  {
    id: "P4",
    label: "Évolution",
    definition:
      "Nouvelle fonctionnalité, nouvelle page, prestation hors périmètre du forfait.",
    delais: {
      serenite: "5 jours ouvrés",
      croissance: "3 jours ouvrés",
      partenaire: "24 h ouvrées",
    },
    objectif:
      "Devis systématique avant intervention, jamais de facture surprise.",
  },
];

// ── Inclusions ───────────────────────────────────────────────

export const inclus: string[] = [
  "Mises à jour du CMS, des dépendances et des correctifs de sécurité",
  "Sauvegardes automatiques avec restauration sur demande",
  "Surveillance de la disponibilité et des certificats",
  "Correction des bugs qui apparaissent après la mise en ligne",
  "Petites modifications de contenu et d'affichage",
  "Assistance par email et par ticket, avec une personne qui répond, pas un chatbot",
  "Suivi des performances et de l'indexation de base",
];

// ── Exclusions ───────────────────────────────────────────────

export const exclus: string[] = [
  "Nouvelles fonctionnalités ou nouveaux modules au-delà des heures incluses",
  "Refonte graphique ou changement de structure du site",
  "Saisie récurrente de contenu (articles, fiches produits, photos) au-delà des petites modifications",
  "Panne ou changement de politique d'un prestataire tiers (hébergeur, registrar, passerelle de paiement, service d'envoi d'emails)",
  "Abonnements tiers : nom de domaine, licence, stockage, outils payants",
  "Conséquences d'une intervention faite par vous ou par un autre prestataire sur le code, la base ou les comptes",
  "Récupération de données supprimées au-delà des 30 jours de sauvegarde conservés",
  "Référencement, publicité et réseaux sociaux, qui sont des prestations séparées",
  "Rédaction de contenu, traduction et création d'images",
  "Assistance aux utilisateurs finaux de votre site",
];

// ── Process ──────────────────────────────────────────────────

export interface ProcessStep {
  titre: string;
  detail: string;
}

export const process: ProcessStep[] = [
  {
    titre: "Vous ouvrez un ticket",
    detail:
      "Depuis cette page, ou par email à ticket@fph-solutions.com. Un seul guichet, tout est tracé.",
  },
  {
    titre: "Je qualifie la demande",
    detail:
      "Réponse avec une référence de ticket et un niveau de criticité sous 48 h ouvrées maximum.",
  },
  {
    titre: "J'interviens",
    detail:
      "Dans le délai de votre palier. Si le sujet dépasse les heures incluses, je vous le dis avant de commencer.",
  },
  {
    titre: "Je vous rends compte",
    detail:
      "Ce qui a été fait, le temps passé, ce qui reste. A la demande, ou chaque mois selon votre palier.",
  },
  {
    titre: "On clôture",
    detail:
      "Le ticket est fermé, le compte d'heures du mois est à jour. Historique complet conservé.",
  },
];

// ── FAQ ──────────────────────────────────────────────────────

export interface FAQItem {
  question: string;
  reponse: string;
}

export const faq: FAQItem[] = [
  {
    question: "Suis-je obligé de passer par un abonnement ?",
    reponse:
      "Non. Vous pouvez me solliciter à l'heure, à 70 € HT. L'abonnement sert à ceux qui veulent être sûrs d'avoir quelqu'un de disponible, et à un prix connu d'avance.",
  },
  {
    question: "Que se passe-t-il si je n'utilise pas toutes mes heures ?",
    reponse:
      "Sur Sérénité, les 30 minutes non utilisées ne sont pas reportables. Sur Croissance, l'heure non utilisée est reportable un mois. Sur Partenaire, les heures non utilisées sont reportables un mois, dans la limite de 6 h.",
  },
  {
    question:
      "Les heures de la maintenance incluent-elles de nouvelles fonctionnalités ?",
    reponse:
      "Les petites évolutions oui, dans la limite des heures de votre palier. Une nouvelle fonctionnalité complète est chiffrée séparément, avant tout début d'intervention.",
  },
  {
    question: "Et si mon site tombe un week-end ?",
    reponse:
      "Je n'assure pas d'astreinte le week-end en formule standard : c'est ce qui permet de garder ces tarifs. Les sauvegardes et la surveillance tournent en continu, et le site est remis en ligne dès que possible lundi matin. Une astreinte étendue se chiffre séparément.",
  },
  {
    question: "Puis-je arrêter quand je veux ?",
    reponse:
      "Aucun des trois paliers n'est engageant : vous arrêtez avec 30 jours de préavis, sans justification. Le paiement annuel offre 2 mois par rapport au mensuel, et vous restez libre de repasser au mois.",
  },
  {
    question:
      "Vous n'avez pas construit mon site, pouvez-vous le reprendre ?",
    reponse:
      "Oui. Je commence par un audit de prise en main à 290 € HT pour vérifier l'état de l'existant, sécuriser les accès et lister ce qui reste à faire. Cette somme est déduite de votre premier trimestre si vous prenez un abonnement annuel.",
  },
];
