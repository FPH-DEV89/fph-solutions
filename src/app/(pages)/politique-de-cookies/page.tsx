import Link from "next/link"
import { SITE_URL } from "@/lib/site"

export const metadata = {
  title: "Politique de Cookies",
  description: "Politique de gestion des cookies et de la mesure d'audience du site FPH Solutions.",
  alternates: { canonical: `${SITE_URL}/politique-de-cookies` },
  openGraph: { url: `${SITE_URL}/politique-de-cookies` },
}

export default function PolitiqueCookiesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 transition hover:text-cyan-400 mb-8"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Retour à l&apos;accueil
        </Link>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8">Politique de Cookies</h1>

        <div className="space-y-8 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">1. Qu&apos;est-ce qu&apos;un cookie&nbsp;?</h2>
            <p>
              Un cookie est un petit fichier texte déposé sur votre appareil (ordinateur, smartphone, tablette) lors de la consultation d&apos;un site internet. Il permet de reconnaître votre navigateur, de mémoriser vos préférences ou de mesurer l&apos;audience d&apos;un site.
            </p>
            <p>
              Conformément à la réglementation européenne (directive ePrivacy, RGPD) et aux recommandations de la CNIL, certains dépôts nécessitent votre consentement préalable, d&apos;autres en sont exemptés car strictement nécessaires au fonctionnement du site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">2. Les cookies et traceurs utilisés sur ce site</h2>
            <p>
              Le site fph-solutions.com ne dépose <strong>aucun cookie publicitaire, aucun cookie de réseau social et aucun cookie tiers de suivi</strong>. Les seuls éléments enregistrés sur votre appareil sont les suivants&nbsp;:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Stockage local technique (localStorage)&nbsp;:</strong> mémorise votre préférence de thème (clair/sombre). Exempté de consentement car strictement nécessaire au fonctionnement du site (article 82 de la loi Informatique et Libertés, recommandation CNIL).</li>
              <li><strong>Préférence de consentement (localStorage)&nbsp;:</strong> mémorise votre choix concernant la mesure d&apos;audience. Conservée 6 mois maximum.</li>
              <li><strong>Mesure d&apos;audience — Umami Analytics&nbsp;:</strong> statistiques de visite auto-hébergées sur <code>stats.fph-solutions.com</code>. Données agrégées, sans finalité publicitaire. Chargé uniquement après votre accord via le bandeau de consentement.</li>
              <li><strong>Mesure d&apos;audience — Vercel Analytics&nbsp;:</strong> mesure d&apos;audience fournie par Vercel. Données agrégées, sans cookie déposé sur votre appareil. Chargé uniquement après votre accord via le bandeau de consentement.</li>
            </ul>
            <p>Les deux outils de mesure d&apos;audience (Umami Analytics et Vercel Analytics) ne sont activés qu&apos;après un clic sur «&nbsp;Accepter&nbsp;» dans le bandeau de consentement. Sans accord de votre part, aucune donnée de navigation n&apos;est collectée à des fins statistiques.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">3. Mesure d&apos;audience soumise à consentement</h2>
            <p>
              La mesure d&apos;audience du site est assurée par deux outils, <strong>Umami Analytics</strong> et <strong>Vercel Analytics</strong>, tous deux chargés uniquement après votre accord explicite. Les données collectées respectent les conditions suivantes&nbsp;:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Finalité strictement limitée à la mesure d&apos;audience (nombre de visites, pages vues, performances techniques)&nbsp;;</li>
              <li>Aucun suivi inter-sites, aucun recoupement avec d&apos;autres traitements&nbsp;;</li>
              <li>Données agrégées, sans identifiant permanent permettant de vous réidentifier&nbsp;;</li>
              <li>Umami Analytics est auto-hébergé sur <code>stats.fph-solutions.com</code> — aucune donnée transmise à un tiers&nbsp;;</li>
              <li>Durée de conservation Vercel Analytics&nbsp;: 90 jours.</li>
            </ul>
            <p>
              Pour plus d&apos;informations sur Vercel Analytics, consultez&nbsp;: <a href="https://vercel.com/docs/analytics/privacy" target="_blank" rel="noopener noreferrer" className="text-[#00d4ff] hover:underline">vercel.com/docs/analytics/privacy</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">4. Gestion de vos préférences</h2>
            <p>
              Lors de votre première visite, un bandeau vous permet d&apos;accepter ou de refuser la mesure d&apos;audience. Votre choix est mémorisé pendant 6 mois. Vous pouvez à tout moment&nbsp;:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Refuser ou retirer votre consentement en supprimant le stockage local du site depuis les paramètres de votre navigateur&nbsp;;</li>
              <li>Configurer votre navigateur pour bloquer ou supprimer les traceurs (voir les menus «&nbsp;Confidentialité&nbsp;» ou «&nbsp;Paramètres&nbsp;» de votre navigateur)&nbsp;;</li>
              <li>Désactiver la mesure d&apos;audience en refusant via le bandeau lors de votre prochaine visite.</li>
            </ul>
            <p>
              À noter&nbsp;: la préférence de thème (clair/sombre) est indispensable au fonctionnement du site et ne peut pas être désactivée sans altérer votre expérience de navigation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">5. Durée de conservation du consentement</h2>
            <p>
              Conformément aux recommandations de la CNIL, la preuve de votre consentement ou de votre refus est conservée pendant une durée maximale de 6 mois. Passé ce délai, le bandeau de consentement vous sera de nouveau présenté lors de votre visite.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">6. Vos droits</h2>
            <p>
              Vous disposez de droits sur vos données personnelles (accès, rectification, effacement, opposition, limitation, portabilité). Pour les exercer, contactez-nous à <strong>contact@fph-solutions.com</strong>. Vous pouvez également introduire une réclamation auprès de la CNIL (cnil.fr — 3 Place de Fontenoy, 75007 Paris).
            </p>
            <p>
              Pour plus d&apos;informations sur la protection de vos données, consultez notre{" "}
              <Link href="/politique-de-confidentialite" className="text-[#00d4ff] hover:underline">politique de confidentialité</Link>.
            </p>
          </section>

          <p className="pt-4 text-xs text-zinc-400 dark:text-zinc-500">Dernière mise à jour&nbsp;: 10 août 2026.</p>
        </div>
      </div>
    </div>
  )
}
