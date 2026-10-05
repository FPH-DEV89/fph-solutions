---
title: "Mémoire RAG des agents : une documentation claire du dépôt suffit"
description: "Pourquoi brancher un RAG vectoriel à tes agents IA est une fausse bonne idée : retour d'expérience et méthode pour une doc claire directement dans le repo."
date: "2026-10-05"
slug: "memoire-rag-des-agents-une-documentation-claire-du-depot-suffit"
tags: ["IA", "Automatisation"]
image: "/blog/memoire-rag-des-agents-une-documentation-claire-du-depot-suffit.webp"
source: "https://liao.gg/blog/agents-dont-need-memory"
published: true
---

> Mardi soir, 23 h 15. Mon agent IA recrée pour la quatrième fois une logique d'authentification sur mon outil de suivi SAV. Problème : elle tournait sans accroc depuis deux mois. En inspectant les logs, je découvre le désastre : son plugin de « mémoire » venait d'injecter dans son prompt cinq bribes périmées du premier prototype. Quarante-cinq minutes de debug, 1,2 million de tokens partis en fumée, et un code cassé pour une fonctionnalité déjà prête.

C'est là que j'ai dit stop.

Si tu développes avec des agents autonomes, tu connais ces extensions miracles. Elles promettent une « mémoire à long terme » grâce au RAG (*Retrieval-Augmented Generation*, ou génération augmentée par récupération : une technique qui pioche des extraits dans une base pour les injecter au modèle). Sur le papier, l'idée séduit. En production, c'est une usine à gaz qui sabote le travail de l'agent.

Comme Kevin Liao l'a résumé dans son retour d'expérience (*Agents Don't Need Memory. They Need Documentation*), les agents n'ont pas besoin de se souvenir de tes vieux bavardages. Ils ont besoin d'une documentation claire et vivante, rangée dans le dépôt de code.

Voici pourquoi j'ai retiré la mémoire vectorielle de mes projets, et la méthode Markdown qui fait dix fois mieux.

## L'illusion de la mémoire vectorielle

Tous ces plugins partagent le même fonctionnement :

1. Scanner tes anciennes discussions avec l'agent.
2. Découper les échanges en fragments isolés (*snippets*).
3. Les convertir en vecteurs mathématiques (*embeddings*, ou coordonnées sémantiques) stockés dans une base locale.
4. Injecter les 5 fragments les plus « proches » dans le prompt à chaque consigne.

Tu attends de ton agent qu'il comprenne ton architecture et respecte tes choix. À la place, tu lui sers une loterie sémantique : des bribes aléatoires de vieilles discussions sorties de leur contexte.

## Les 4 failles qui ruinent le travail

Brancher une base RAG sur l'historique d'un agent de dev pose quatre problèmes majeurs.

### 1. La similarité n'est pas la vérité
Une recherche vectorielle mesure une proximité lexicale, pas une date de validité. Si tu demandes comment gérer les sessions, le RAG ressort la version obsolète d'il y a six mois avec le même score que le correctif d'hier. L'agent réintroduit alors des bugs corrigés depuis des semaines.

### 2. Des morceaux coupés de leur contexte
Un fragment RAG fait rarement plus de 150 mots. En découpant le texte, tu perds l'intention métier et l'état global du dépôt (le *repo*, dossier regroupant ton code et son historique). L'agent assemble un puzzle sans le modèle.

### 3. Une boîte noire impossible à auditer
Quand ton agent prend une décision aberrante, bon courage pour trouver la cause. Tu as 10 000 vecteurs dans un fichier SQLite opaque. Lesquels sont faux ? Lesquels sont périmés ? Impossible à vérifier sans disséquer des fichiers binaires.

### 4. L'hémorragie silencieuse de tokens
Chaque fragment injecté inutilement alourdit la fenêtre de contexte. Sur une session longue, réinjecter 2 000 tokens (les unités de texte facturées par les modèles d'IA) de faux souvenirs à chaque requête fait flamber la facture d'API sans valeur ajoutée.

## Comment travaillent les vraies équipes

Dans une équipe, personne ne réécoute un appel Zoom d'il y a huit mois pour retrouver une règle de gestion. On écrit. On formalise une documentation, une décision technique, et on la range à un endroit accessible.

Pour un agent IA, c'est identique. Il n'a pas besoin de « se rappeler » d'une discussion informelle où tu hésitais entre deux bibliothèques. Il a besoin d'une fiche qui indique celle retenue et comment l'utiliser.

## La solution : la documentation vivante dans le dépôt

Sur mes 5 applications en production (détaillées sur ma page [/projets](/projets)), j'ai banni les systèmes de mémoire RAG.

Le principe est simple : **le dépôt Git est la seule source de vérité.**

Un fichier `AGENTS.md` à la racine donne les règles globales et les commandes. Pour aller plus loin, je structure mes projets ainsi :

```text
mon-projet/
├── AGENTS.md            # Consignes générales, commandes clés
├── docs/
│   ├── architecture.md  # Schéma des dossiers, flux de données
│   ├── decisions/       # Choix techniques validés
│   └── specs/           # Spécifications des fonctionnalités
└── src/                 # Code source
```

Le cycle de travail change :
- **Avant :** invite → recherche RAG floue → génération hasardeuse → oubli.
- **Maintenant :** invite → lecture de la doc ciblée → développement → mise à jour de la doc.

Quand l'agent travaille sur la gestion d'équipements de protection, il lit `docs/specs/equipements.md`. Il a le contexte complet et à jour. Dès qu'il termine son code, sa consigne lui impose de mettre à jour la documentation dans le même commit.

Les bénéfices :
- **Auditabilité :** tout est en Markdown. Tu lis, corriges et relis en diff Git.
- **Versionnage :** si tu reviens à une version antérieure, la doc associée revient aussi.
- **Zéro infrastructure :** pas de base vectorielle ni de serveur dédié.

---

## 💸 Ce que ça m'a coûté

Faire tourner ce système au quotidien ne demande aucun budget supplémentaire :

- **Google AI Pro :** 20 €/mois
- **API LLM :** ~10 €/mois
- **Hébergement :** 0 €
- **DB :** 0 €
- **Nom de domaine :** ~10 €/an

Ça fait **environ 30 € par mois pour 5 applications en production**.

En supprimant les plugins de mémoire et leurs injections automatiques, j'ai réduit ma consommation de tokens d'API sur les sessions longues. La doc du dépôt ne se charge que lorsqu'elle sert vraiment.

---

## Comment démarrer en 3 étapes

1. **Crée un fichier `AGENTS.md` :** note les commandes pour lancer et tester, plus tes 3 règles d'architecture indispensables.
2. **Ouvre un dossier `docs/specs/` :** écris une page Markdown synthétique par fonctionnalité clé avec les routes API et les modèles de données.
3. **Impose la mise à jour :** indique à ton agent : « Après avoir codé et validé les tests, mets à jour les fiches concernées dans `docs/` avant de clore la tâche. »

## FAQ

### Pourquoi le RAG vectoriel échoue-t-il sur la mémoire d'un agent ?
Le RAG mesure une ressemblance statistique entre des mots. Il ignore l'arborescence du code et la chronologie du projet. Il ressort des fragments de vieilles discussions sans savoir s'ils sont encore vrais. L'agent reçoit des consignes contradictoires et produit du code cassé.

### Un simple fichier AGENTS.md suffit-il ?
Pour un petit script isolé, oui. Dès que l'application grandit, tout mettre dans un seul fichier sature la fenêtre de contexte. Séparer les fiches dans un dossier `docs/` permet à l'agent de ne charger que le fichier utile à sa tâche courante.

### Comment s'assurer que l'agent met à jour la doc ?
En faisant de cette mise à jour une condition de validation de la tâche dans ses instructions de base. Tant que les fiches associées aux modules modifiés ne sont pas actualisées, la mission n'est pas considérée comme terminée.

### Quel est l'impact sur le coût en tokens ?
Les plugins RAG injectent plusieurs fragments à chaque message, souvent pour rien. Avec une documentation Markdown ciblée, l'agent ne charge le fichier concerné qu'une fois en début de session. Le contexte reste propre et la facture d'API diminue.

## À retenir

1. **Bannis les plugins de mémoire RAG pour le code :** la similarité sémantique n'est pas la vérité et réinjecte du code obsolète dans le contexte.
2. **Fais du dépôt Git ton unique source de vérité :** documente tes spécifications et décisions dans des fichiers Markdown versionnés avec ton code.
3. **Adopte la boucle lire-coder-mettre à jour :** force ton agent à consulter la doc avant d'agir et à l'actualiser dès que le code est testé.

## Sources

1. [Kevin Liao — Agents Don't Need Memory. They Need Documentation](https://liao.gg/blog/agents-dont-need-memory)
2. [Operator Memory — Markdown-based memory for AI agents (GitHub)](https://github.com/aerovato/operator-memory)
