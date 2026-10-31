# Guide de déploiement FPH Solutions

## 1. Domaine (Cloudflare)

1. Acheter le domaine `fph-solutions.com` chez Cloudflare Registrar
2. Transférer les nameservers vers Cloudflare (ou utiliser Cloudflare Registrar)
3. Ajouter les DNS records :

| Type | Nom | Cible | Proxy |
|------|-----|-------|-------|
| A | `@` | `76.76.21.21` (Vercel) | Proxied (orange) |
| CNAME | `www` | `fph-solutions-git-main.vercel.app` | Proxied |

## 2. Déploiement Vercel

1. Aller sur [vercel.com/new](https://vercel.com/new)
2. Importer le repo GitHub `FPH-DEV89/fph-solutions`
3. Framework : Next.js (détection auto)
4. Domain : `fph-solutions.com` (et `www.fph-solutions.com`) dans les custom domains
5. Build command : `npm run build`
6. Output directory : `.next`

### Variables d'environnement
Aucune pour l'instant (site statique).

## 3. Email (Cloudflare Email Routing → Gmail)

1. Dans Cloudflare Dashboard → Email → Email Routing
2. Activer Email Routing
3. Créer une règle :
   - Email : `contact@fph-solutions.com`
   - Forward vers : ta boîte Gmail
4. Configurer Gmail pour envoyer en tant que `contact@fph-solutions.com` :
   - Settings → Voir tous les paramètres → Comptes et importation
   - "Ajouter une autre adresse email"
   - SMTP : `smtp.gmail.com`, port 587, TLS

## 4. Maintenance

### Automatique
- **Dependabot** : PRs auto pour les mises à jour de dépendances
- **Vercel Analytics** : Monitoring des performances
- **GitHub Actions** : Lint + build sur chaque push

### Mensuel
- `npm audit` et mise à jour des dépendances
- Vérification des liens et images
- Mise à jour du contenu (nouveaux projets)

### Trimestriel
- Revue de sécurité
- Mise à jour des métadonnées SEO
- Backup complet

## 5. Procédure d'ajout d'un projet

1. Ajouter les infos dans `src/data/projects.ts`
2. (Optionnel) Ajouter une image dans `public/projects/`
3. Commit + push → Vercel déploie automatiquement

## 6. Hébergement réel de la preview (VPS Ionos)

Ce n'est PAS Vercel : le site tourne sur le VPS, derrière nginx-proxy-manager.

- URL : `https://preview.fph-solutions.com` → NPM (`172.18.0.1:3000`) → `fph-preview.service`
- Unité : `/etc/systemd/system/fph-preview.service` (`next start -p 3000`), **enabled** (survit au reboot)
- Sources : `/srv/docker/hermes/hermes_data/fph-solutions`
- Rebuild : `cd /srv/docker/hermes/hermes_data/fph-solutions && NODE_OPTIONS=--max-old-space-size=1024 nice -n 10 ./node_modules/.bin/next build`

### Règle absolue : jamais `next dev` dans ce dossier

`next dev` réécrit `.next/` et supprime `BUILD_ID` → `next start` sort en `status 1` et
l'unité part en boucle de redémarrages (394 redémarrages le 31/10, preview HS).
Pour développer : copier le projet ailleurs, ou `npm run dev` sur un autre port et un autre dossier.

Si le doute persiste : `ls .next/BUILD_ID`. Absent ⇒ rebuild avant tout restart.
L'auto-réparateur (`/usr/local/bin/hermes-auto-repair.sh`, cron */5) fait désormais ce rebuild
tout seul avant de redémarrer le service.
