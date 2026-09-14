---
title: "Un robotaxi appelle la police tout seul : jusqu'où laisser décider une IA ?"
description: "Un robotaxi Waymo bloque des passagers armés et alerte la police. Analyse sans filtre d'un indépendant sur l'autonomie décisionnelle et les garde-fous IA."
date: "2026-09-14"
slug: "waymo-pulls-over-calls-cops-on-riders-with-a-ghost-gun"
tags: ["Technologie", "IA", "Automatisation"]
image: "/blog/waymo-pulls-over-calls-cops-on-riders-with-a-ghost-gun.webp"
source: "https://www.theverge.com/transportation/994405/waymo-pulls-over-calls-cops-on-riders-with-a-ghost-gun"
published: true
---

Dimanche 13 septembre 2026, 22 h 15. J'étais penché sur les journaux d'accès (*logs*, fichiers enregistrant en temps réel chaque événement d'un serveur) de mon outil de suivi SAV. Mon script de sécurité venait de bannir automatiquement une adresse IP après trois requêtes malformées suspectes. Un geste anodin dans le monde logiciel : une règle se déclenche, une session réseau est coupée, l'incident est réglé sans drame.

Puis, en ouvrant ma veille technique, je découvre l'article de *The Verge* : à San Francisco, un **robotaxi** (*véhicule autonome sans conducteur opérant comme un taxi commercial sur commande*) de Waymo a appliqué exactement ce principe d'interruption automatique. Sauf que cette fois, ce n'était pas une ligne de code fermant une connexion web : c'était une voiture de deux tonnes qui transportait des passagers dans le monde réel.

À son bord, deux mineurs transportaient une arme à feu artisanale illégale. Le véhicule a identifié l'infraction, a refusé de continuer sa course, s'est rangé calmement sur le bas-côté et a contacté la police pour faire appréhender ses passagers.

Cet événement marque un tournant silencieux mais décisif dans l'histoire de l'intelligence artificielle appliquée. Quand un algorithme ne se contente plus de générer du texte ou d'optimiser un itinéraire GPS, mais s'arroge le pouvoir d'immobiliser physiquement des êtres humains et d'appeler les forces de l'ordre, nous franchissons une frontière inédite.

Voici ce qui s'est réellement passé, et ce que cette autonomie décisionnelle radicale nous enseigne pour concevoir les garde-fous de nos propres systèmes.

---

## Ce qui s'est réellement passé dans les rues de San Francisco

Les faits rapportés par *The Verge* et confirmés par Waymo auprès du *Los Angeles Times* sont aussi nets que déconcertants :

1. **Deux mineurs à bord :** Deux adolescents commandent et montent à bord d'un taxi autonome Waymo pour circuler dans San Francisco.
2. **Une arme illégale détectée :** Les passagers sont en possession d'un fusil d'assaut de type AR chargé, qualifié de **ghost gun** (*arme fantôme, c'est-à-dire une arme à feu assemblée sans numéro de série officiel, intraçable et illégale dans l'État de Californie*).
3. **Déclenchement du protocole de sécurité :** Les capteurs intérieurs du véhicule et ses algorithmes de **vision par ordinateur** (*technologie permettant à des modèles d'IA d'analyser et d'interpréter des images ou des flux vidéo en temps réel*) identifient une « violation des conditions d'utilisation impliquant une arme à feu ».
4. **Arrêt immédiat et alerte :** Le véhicule ne panique pas et n'accélère pas. Il manœuvre de façon autonome pour se garer en sécurité sur le bas-côté, interrompt la course et transmet les coordonnées GPS aux autorités.
5. **Arrestation :** La police de San Francisco intervient sur place. Les deux jeunes sont arrêtés et placés en centre de détention pour mineurs (*juvenile hall*).

Ce n'est d'ailleurs pas une première pour Waymo. Plus tôt cette même année, un robotaxi avait simulé une panne mécanique pour immobiliser le véhicule après que deux passagers (là encore des mineurs) avaient consommé de l'alcool et tiré avec un pistolet factice par la fenêtre arrière, avant que la police ne soit alertée.

Source de l'enquête : [The Verge — Waymo pulls over, calls cops on riders with a ghost gun (2026)](https://www.theverge.com/transportation/994405/waymo-pulls-over-calls-cops-on-riders-with-a-ghost-gun).

---

## Du logiciel au monde physique : le basculement de l'autonomie

Jusqu'ici, quand on parlait de modération par l'IA, on pensait à des cas d'usage purement virtuels :
- Un compte de réseau social suspendu pour propos haineux ;
- Un modèle de langage qui refuse de répondre à une invite malveillante (*prompt injection*) ;
- Un pare-feu applicatif qui bloque une requête HTTP malveillante.

Dans tous ces scénarios, la sanction reste numérique. L'utilisateur est contrarié, mais il conserve son entière liberté physique.

Avec les véhicules autonomes et la robotique connectée, l'IA dispose désormais d'actionneurs physiques. Le véhicule n'est plus un simple moyen de transport passif : il devient un espace surveillé en continu par des caméras d'habitacle et des microphones, régi par des **conditions d'utilisation** (*Terms of Service ou TOS, contrat juridique définissant les droits et interdictions des utilisateurs d'un service*).

Dès lors que le modèle détecte une infraction à ces règles contractuelles, il prend une décision unilatérale :
- Il met fin à la prestation de service ;
- Il restreint les déplacements des occupants en immobilisant la voiture ;
- Il partage les données de télémesure, l'historique et la localisation avec la police.

C'est l'incarnation la plus concrète de l'**IA agentique** (*système d'intelligence artificielle doté d'autonomie pour percevoir son environnement, prendre des décisions et exécuter des actions concrètes sans intervention humaine directe*).

---

## Les 3 leçons pour concevoir des automatisations et des agents fiables

En tant qu'indépendant qui bâtit des applications animées par des agents IA, cet incident soulève des questions d'architecture fondamentales. Que tu pilotes une flotte automobile ou de petits scripts métier, les principes de conception sont rigoureusement identiques :

### 1. Le principe du coupe-circuit (*Fail-Safe Kill Switch*)

Waymo a prévu un comportement préprogrammé en cas d'anomalie critique : le véhicule se range sur le bas-côté et s'arrête. C'est le principe du **fail-safe** (*mécanisme de sécurité garantissant qu'un système bascule dans un état inoffensif en cas de défaillance ou de situation imprévue*). Il ne tente pas de juger la situation, de négocier avec les occupants ou de poursuivre sa route en espérant que le problème disparaisse.

Sur nos applications web et nos flux automatisés, c'est la première règle que j'applique. Si un agent IA détecte une incohérence majeure dans une base de données ou un comportement anormal d'un utilisateur, son rôle n'est pas d'essayer de réparer à l'aveugle. Son rôle est de stopper immédiatement l'exécution, de consigner l'état exact du système et de notifier un humain. L'arrêt sécurisé vaut toujours mieux qu'une fausse manœuvre automatisée.

### 2. La gestion du faux positif critique

Dans le cas de Waymo, la détection a fonctionné et l'arme était bien réelle. Mais imagine un instant le scénario inverse : un passager sort un trépied d'appareil photo noir, un parapluie à manche métallique ou un grand jouet d'enfant. L'IA interprète l'objet comme un fusil d'assaut, s'arrête en pleine voie rapide ou dans un quartier isolé, et envoie la police avec des armes de service dégainées.

Le coût d'un **faux positif** (*situation où un algorithme détecte à tort une anomalie ou une menace inexistante*) dans le monde physique peut être dramatique. C'est pourquoi toute action irréversible doit exiger un niveau de confiance mathématique maximal, voire une confirmation humaine à distance via un centre de télé-opération avant l'envoi des forces de l'ordre.

### 3. La frontière ténue entre sécurité et surveillance totale

Pour qu'un véhicule Waymo repère une arme artisanale dans l'habitacle, cela signifie que chaque geste des passagers est analysé par des algorithmes de vision intérieure. Le taxi n'est plus un espace intime, c'est une cabine de vidéosurveillance connectée.

Pour nous qui développons des logiciels, la tentation est grande d'ajouter des outils de traçage partout sous couvert d'optimisation ou de sécurité. La vraie rigueur consiste à collecter le strict minimum nécessaire (*data minimisation*) et à expliciter clairement ce qui est analysé et conservé.

---

## Comment j'applique ces garde-fous sur mes 5 applications

Je ne conçois pas de voitures autonomes dans la Silicon Valley. Depuis mon bureau, je développe et gère cinq applications en production au quotidien grâce à des modèles de langage :
- Un assistant familial avec interface vocale,
- Une application de gestion d'équipements de protection individuelle,
- Un outil de suivi SAV pour traiter les retours et réparations,
- Un planificateur de mariage complet,
- Un site familial dédié à la logistique d'une expatriation.

Toutes ces réalisations et leurs coulisses techniques sont documentées en détail sur [ma page /projets](/projets).

Sur chacune de ces applications, j'applique la même discipline que celle observée chez Waymo : **les modèles d'IA ne prennent jamais de décisions critiques sans garde-fous déterministes**.

Concrètement :
- Mon agent de support SAV peut analyser le message d'un client et rédiger une réponse, mais il ne peut jamais rembourser une commande ou supprimer une fiche sans validation stricte.
- Mon outil de gestion d'équipements peut alerter sur la date de péremption d'un casque ou d'un harnais, mais la décision de mise au rebut reste soumise à une confirmation humaine.
- En cas d'anomalie dans une requête API, le système bloque la transaction et logue l'événement plutôt que de tenter une correction hasardeuse.

Et tout cela tourne sur une infrastructure minimaliste, avec des coûts maîtrisés au centime près.

> ### 💸 Ce que ça m'a coûté
>
> - **Google AI Pro** : 20 €/mois
> - **API LLM** : ~10 €/mois
> - **Hébergement** : 0 € (tiers gratuits)
> - **Base de données** : 0 € (tiers gratuits)
> - **Nom de domaine** : ~10 €/an
>
> **Total : environ 30 €/mois pour 5 applications en production.**

---

## À retenir

1. **L'IA physique transforme les conditions d'utilisation en actions réelles :** L'incident Waymo prouve qu'un algorithme peut désormais contraindre physiquement des utilisateurs et déclencher des interventions policières directes.
2. **Tout système autonome doit posséder un arrêt sécurisé (*fail-safe*) :** Qu'il s'agisse d'un véhicule sans conducteur ou d'un script d'automatisation, la priorité absolue en cas d'anomalie critique est d'interrompre l'exécution sans aggraver la situation.
3. **Ne confie jamais l'irréversible à un modèle seul :** Les actions à fort impact (blocage définitif, sanctions, suppressions de données) doivent toujours être verrouillées par des règles déterministes et validées par un regard humain.

---

## FAQ — les questions que tout le monde se pose

### Comment le robotaxi Waymo a-t-il pu détecter une arme à feu à bord ?

Les véhicules autonomes de Waymo sont équipés d'une batterie complète de capteurs extérieurs (LiDAR, radars, caméras) mais aussi de caméras intérieures destinées à veiller sur l'habitacle. Des algorithmes de vision par ordinateur analysent ces images en continu pour repérer des objets interdits, des dégradations matérielles ou des comportements dangereux en violation des conditions d'utilisation.

### Pourquoi la voiture s'est-elle rangée sur le bas-côté plutôt que d'aller au commissariat ?

D'un point de vue sécuritaire et légal, transformer un véhicule autonome en cellule de détention mobile roulant vers un poste de police comporterait d'immenses risques : tentative d'évasion des passagers en marche, violences dans l'habitacle ou accidents de la route. Se garer calmement sur le bas-côté et immobiliser le véhicule en attendant les forces de l'ordre est la manœuvre d'arrêt d'urgence (*fail-safe*) la plus sûre pour le public.

### Qu'est-ce qu'une arme fantôme (*ghost gun*) ?

Une « ghost gun » est une arme à feu assemblée clandestinement à partir de pièces détachées ou imprimée en 3D, dépourvue de numéro de série officiel enregistré auprès des autorités. Cela la rend intraçable lors des enquêtes policières, ce qui explique son interdiction formelle dans plusieurs États américains, dont la Californie.

### Quels sont les risques de faux positifs ?

Une fausse alerte armée engendre de lourdes conséquences humaines et judiciaires. La validation humaine par télé-opérateur reste indispensable.

---

## Sources

1. [The Verge (2026)](https://www.theverge.com/transportation/994405/waymo-pulls-over-calls-cops-on-riders-with-a-ghost-gun)
