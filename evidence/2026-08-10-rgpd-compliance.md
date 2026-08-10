# Évidence — Conformité RGPD / CNIL / normes FR-EU

Date : 2026-08-10
Mission : Mise en conformité légale du site fph-solutions.com avant lancement professionnel
Repo : /opt/data/fph-solutions (Next.js 16.2.10, React 19, TS, Tailwind, Vercel + Cloudflare)

## Objectif
Respecter les normes françaises et européennes : RGPD (règlement UE 2016/679), loi Informatique et Libertés (n° 78-17), LCEN (n° 2004-575), recommandations CNIL (délibération n° 2020-091 cookies, preuve de consentement 6 mois).

## Fichiers créés (4)
- `src/app/(pages)/politique-de-cookies/page.tsx` — politique cookies complète (cookies utilisés, exemption Vercel Analytics, gestion préférences, durées CNIL)
- `src/app/(pages)/cgu/page.tsx` — conditions générales d'utilisation (8 sections)
- `src/components/CookieBanner.tsx` — bandeau consentement (Tout accepter / Tout refuser, localStorage `fph-consent`, event `fph-consent-changed`)
- `src/components/AnalyticsWithConsent.tsx` — Vercel Analytics monté UNIQUEMENT si consentement accepté

## Fichiers modifiés (7)
- `src/app/(pages)/mentions-legales/page.tsx` — LCEN complète : éditeur, directeur de publication, hébergeur Vercel + CDN Cloudflare, section données personnelles. Placeholders SIRET/statut/TVA en commentaire JSX (à compléter au lancement)
- `src/app/(pages)/politique-de-confidentialite/page.tsx` — RGPD art. 13 complet : responsable, finalités + bases légales (6-1-a/b/f), destinataires (Vercel, Cloudflare, Resend, Cal.com), transferts hors UE (SCC 2021/914 + Data Privacy Framework), durées, droits art. 15-22, plainte CNIL
- `src/app/api/contact/route.ts` — validation serveur du consentement (400 si absent)
- `src/components/ContactForm.tsx` — case à cocher RGPD obligatoire + lien politique de confidentialité
- `src/components/Footer.tsx` — liens Politique de cookies + CGU
- `src/app/layout.tsx` — Analytics remplacé par AnalyticsWithConsent + CookieBanner
- `src/app/sitemap.ts` — 2 nouvelles URLs

## Pipeline
- agy (gemini-3.6-flash-high) : exécution — rc=0
- Build `npm run build` : ✅ OK (10 routes, 4 légales)
- tsc --noEmit : ✅ 0 erreur
- Agent QA (deepseek-v4-pro) : ✅ APPROVE — 1 MAJEUR (placeholders SIRET visibles → corrigé en commentaire JSX), 2 MINEURS (faux positifs « date future » — la date 10/08/2026 est la date du jour)
- God File : ✅ tous les fichiers < 500 lignes

## Vérification réelle (navigateur + curl)
- Routes : /, /politique-de-cookies, /cgu, /mentions-legales, /politique-de-confidentialite → 200
- Bandeau cookies affiché à la 1re visite → « Tout accepter » : localStorage=accepted + script analytics injecté ; « Tout refuser » : localStorage=refused + analytics NON injecté (vérifié window.va absent)
- Formulaire sans consentement → API 400 « Le consentement au traitement des données personnelles est requis. » ; avec consentement → passe (mode simulation sans clé Resend locale)
- Aucun placeholder visible sur /mentions-legales

## Hors repo (interne)
- `/opt/data/fph-solutions-compliance/registre-des-traitements.md` — registre art. 30 RGPD (5 traitements), à conserver hors ligne, à jour à chaque nouvel outil

## Décisions
- Vercel Analytics (sans cookie, données agrégées, rétention 90 j) : qualifié d'exempté (délibération CNIL 2020-091) MAIS conditionné au consentement via le bandeau (suroptimisation démontrable)
- Cal.com : simple lien externe (pas d'embed) → aucun cookie déposé côté fph-solutions.com ; documenté comme destinataire si réservation
- Placeholders légaux retirés de l'affichage public (page propre avant lancement), structure documentée en commentaire pour l'ajout SIRET/statut/TVA au lancement pro

## Bugs outils rencontrés (corrigés)
- `qa-agent.py` : `max_tokens=4000` → deepseek-v4-pro (modèle reasoning) renvoyait `content` vide (budget consommé par reasoning_content). Fix : 16000 + fallback reasoning_content. Voir skill agy-code-delegation.
- `agy-pipeline.py` : crash « File name too long » dans build_spec2 quand le QA renvoie du non-JSON (le chemin de spec2 est construit depuis le contenu). Workaround : QA manuel via qa-agent.py.

## Suivi CI (même jour, post-push)
- Push 188d641 → **CI GitHub Actions échouée** : `npm run lint` → `react-hooks/set-state-in-effect` (setState synchrone dans l'effet de CookieBanner.tsx). Les runs précédents passaient (a0f01a9 ✅).
- Fix 2da4d0a : CookieBanner refactorisé avec `useSyncExternalStore` (pattern idiomatique pour lire localStorage, lint-clean, hydration-safe). Vérifié en navigateur : accept/refuse OK, visiteur de retour → bandeau masqué après hydratation, 0 erreur d'hydratation.
- CI 2da4d0a : **success** ✅ (lint + build). Vercel redéployé, site 200.
