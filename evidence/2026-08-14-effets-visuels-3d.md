# Évidence — 3 effets visuels pro (Guide #38 adapté agy)

**Date** : 2026-08-14 (soir)
**Mission** : Appliquer les 3 effets du Guide #38 (3D hero, liquid glass nav, animations scroll) sur fph-solutions.com — version agy/Gemini (guide adapté depuis Claude Code).

## Objectif
Montrer les capacités de la nouvelle feature (Guide #38 adapté agy) sur le site portfolio FPH Solutions, en preview locale (VPS, port 3000 / preview.fph-solutions.com). Prod Vercel non touchée.

## Fichiers touchés
- Créés : `src/components/Hero3D.tsx` (R3F), `src/components/LiquidGlassLens.tsx` (liquid-glass-js)
- Modifiés : `src/components/Hero.tsx` (import dynamique Hero3D), `src/components/Header.tsx` (pilule flottante + glass), `src/components/FAQ.tsx` (animations scroll)
- Dépendances : three 0.185.1, @react-three/fiber 9.7.0, @react-three/drei 10.7.8, liquid-glass-js 0.1.0 (installées par Hermes)
- Specs agy : `.hermes/consignes-visuels-3d.md` + spec2 (fix balise FAQ) + spec2/spec3/spec4 (glass tuning)

## Preuves de vérification
- Build Next.js OK (13 routes), 0 erreur console (desktop + mobile)
- Hero 3D : canvas R3F rendu 1920×1080 ET 390×844 ; vision xAI : « icosaèdre wireframe cyan + particules, bien intégrés, contenu lisible, rendu haut de gamme »
- Liquid glass : lentille montée (`.lqg-lens`/`.lqg-glass`), map de déplacement réelle (360×42, min 0.008/max 0.992), **A/B pixel diff 3.16/255** dans la bande bezel (preuve objective de la réfraction), liseré spéculaire visible, nav transparente quand lentille active (fallback CSS sinon)
- FAQ : animation mesurée mid-anim (opacity 0, translateY 20px) → final (opacity 1, none)
- Sous-pages (/projets) : pilule centrée 881px, pas de débordement, lentille active
- Bundle : three ~872K min en import dynamique (homepage only, LCP non bloqué), liquid-glass ~52K

## Décisions
- **Stack 3D** : R3F (guide) vs three pur → R3F choisi (cohérent avec le guide, drei Float/Sparkles)
- **Réfraction subtile assumée** : scale 10/depth 24/blur 4 — le bending est invisible sur fond uniforme (physique), visible sur contenu riche (texte/cartes) au scroll. Pas de sur-tuning (éviter l'effet gadget).
- **4 itérations agy** : fix balise FAQ + 3 rounds de tuning glass (paramètres, typage, empilement)

## Verdict QA
✅ APPROVE — 3 effets livrés, fallbacks (CSS glass, reduced-motion, WebGL down) en place, accessibilité (aria-hidden décoratif, pointer-events) respectée.

## Lien
Preview : https://preview.fph-solutions.com (VPS, build local). Prod : non déployée (décision Florian).
