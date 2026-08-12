# Graph Report - .  (2026-08-12)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 202 nodes · 217 edges · 27 communities (12 shown, 15 thin omitted)
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 23 edges (avg confidence: 0.79)
- Token cost: 811 input · 5,061 output

## Graph Freshness
- Built from commit: `ec39355b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Project Setup and Compliance
- Projects Pages
- Package Configuration
- Layout and Consent
- TypeScript Compiler Options
- Dev Dependencies
- TSConfig File Patterns
- Vercel Deployment Config
- Hero Section
- Next.js Security Config
- Maxpatrie Screenshots
- Terms of Use Page
- Legal Notice Page
- Privacy Policy Page
- Cookie Policy Page
- ESLint Config
- PostCSS Config
- Booking Data Recipient
- Email Data Recipient
- File Icon Asset
- Globe Icon Asset
- Next.js Logo Asset
- Vercel Logo Asset
- Window Icon Asset
- External Store Hook

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `include` - 7 edges
3. `FPH Solutions website` - 7 edges
4. `DEPLOY.md (deployment guide)` - 6 edges
5. `RGPD compliance evidence (2026-08-10)` - 6 edges
6. `projects` - 5 edges
7. `scripts` - 5 edges
8. `CookieBanner()` - 4 edges
9. `lib` - 4 edges
10. `Next.js 16 stack` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Logo image: FPH Solutions` --references--> `FPH Solutions website`  [INFERRED]
  public/images/logo_1_refined.webp → README.md
- `Open Graph default image (og-default.svg)` --references--> `FPH Solutions website`  [INFERRED]
  public/og-default.svg → README.md
- `Portrait photo: Florian Philibert` --references--> `Florian Philibert (owner)`  [INFERRED]
  public/images/florian-philibert.webp → README.md
- `Project image: Freshr` --references--> `Freshr project`  [INFERRED]
  public/images/freshr.webp → README.md
- `Project screenshot: Gestion EPI` --references--> `Gestion EPI project`  [INFERRED]
  public/projects/gestion-epi.webp → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Deployment & maintenance pipeline (Cloudflare + Vercel + CI + Dependabot)** — deploy, github_workflows_ci, github_dependabot, concept_vercel, concept_cloudflare [INFERRED 0.75]

## Communities (27 total, 15 thin omitted)

### Community 0 - "Project Setup and Compliance"
Cohesion: 0.07
Nodes (34): AGENTS.md (Next.js agent rules), Cloudflare (domain/DNS/email), Consent storage (localStorage fph-consent + fph-consent-changed event), FPH Solutions website, Next.js 16 stack, RGPD/CNIL/LCEN compliance initiative, Vercel (hosting), DEPLOY.md (deployment guide) (+26 more)

### Community 1 - "Projects Pages"
Cohesion: 0.09
Nodes (19): faqSchema, featuredProjects, categoryLabel, metadata, categoryLabel, AboutSection(), ContactForm(), FAQSection() (+11 more)

### Community 2 - "Package Configuration"
Cohesion: 0.10
Nodes (19): framer-motion, next, dependencies, framer-motion, next, react, react-dom, resend (+11 more)

### Community 3 - "Layout and Consent"
Cohesion: 0.15
Nodes (12): geistMono, geistSans, metadata, AnalyticsWithConsent(), CookieBanner(), getConsentSnapshot(), subscribeConsent(), Footer() (+4 more)

### Community 4 - "TypeScript Compiler Options"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 5 - "Dev Dependencies"
Cohesion: 0.12
Nodes (17): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node (+9 more)

### Community 6 - "TSConfig File Patterns"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

### Community 7 - "Vercel Deployment Config"
Cohesion: 0.40
Nodes (4): cdg1, framework, name, regions

### Community 8 - "Hero Section"
Cohesion: 0.40
Nodes (4): containerVariants, Hero(), itemVariants, technologies

### Community 10 - "Maxpatrie Screenshots"
Cohesion: 0.67
Nodes (3): Maxpatrie project, Project screenshot: Maxpatrie, Project screenshot (full): Maxpatrie

## Ambiguous Edges - Review These
- `CI workflow (.github/workflows/ci.yml)` → `README.md`  [AMBIGUOUS]
  README.md · relation: references

## Knowledge Gaps
- **95 isolated node(s):** `faqSchema`, `featuredProjects`, `categoryLabel`, `metadata`, `categoryLabel` (+90 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `CI workflow (.github/workflows/ci.yml)` and `README.md`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **Why does `dependencies` connect `Package Configuration` to `Project Setup and Compliance`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Why does `@vercel/analytics` connect `Project Setup and Compliance` to `Package Configuration`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `FPH Solutions website` (e.g. with `Logo image: FPH Solutions` and `Redirect page (public/index.html)`) actually correct?**
  _`FPH Solutions website` has 4 INFERRED edges - model-reasoned connections that need verification._
- **What connects `faqSchema`, `featuredProjects`, `categoryLabel` to the rest of the system?**
  _95 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Project Setup and Compliance` be split into smaller, more focused modules?**
  _Cohesion score 0.06606606606606606 - nodes in this community are weakly interconnected._
- **Should `Projects Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.0873015873015873 - nodes in this community are weakly interconnected._