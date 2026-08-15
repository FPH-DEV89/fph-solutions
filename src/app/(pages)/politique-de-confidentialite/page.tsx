import Link from "next/link"

export const metadata = {
  title: "Politique de Confidentialité",
  description: "Politique de protection des données personnelles de FPH Solutions, conforme au RGPD.",
}

export default function PolitiqueConfidentialitePage() {
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

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8">Politique de Confidentialité</h1>

        <div className="space-y-8 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">1. Introduction et responsable de traitement</h2>
            <p>
              FPH Solutions attache une importance particulière à la protection de vos données personnelles. La présente politique décrit la manière dont vos données sont collectées et traitées sur le site <strong>fph-solutions.com</strong>, conformément au Règlement Général sur la Protection des Données (RGPD — Règlement (UE) 2016/679 du 27 avril 2016) et à la loi n° 78-17 du 6 janvier 1978 modifiée (loi «&nbsp;Informatique et Libertés&nbsp;»).
            </p>
            <p>
              <strong>Responsable de traitement :</strong> FPH Solutions (Florian Philibert)<br />
              <strong>Contact :</strong> contact@fph-solutions.com
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">2. Données collectées</h2>
            <p>
              Nous collectons uniquement les données strictement nécessaires aux finalités décrites ci-dessous&nbsp;:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Via le formulaire de contact :</strong> votre nom, votre adresse email et le contenu de votre message (données que vous nous fournissez volontairement)&nbsp;;</li>
              <li><strong>Données de navigation :</strong> adresse IP, type de navigateur, pages visitées, temps de chargement — collectées par notre hébergeur (Vercel) et notre CDN (Cloudflare) à des fins de sécurité et de bon fonctionnement, ainsi que par notre outil de mesure d&apos;audience exempté (Vercel Analytics, sans cookie, données agrégées — voir notre politique de cookies).</li>
            </ul>
            <p>Aucune donnée sensible (origine, opinions politiques, santé, etc.) n&apos;est collectée.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">3. Finalités et bases légales</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Répondre à vos demandes de renseignements ou de devis</strong> — base légale&nbsp;: votre consentement (article 6-1-a) du RGPD), recueilli via la case à cocher du formulaire de contact&nbsp;;</li>
              <li><strong>Assurer le suivi de la relation commerciale</strong> si une collaboration en découle — base légale&nbsp;: exécution de mesures précontractuelles (article 6-1-b) du RGPD)&nbsp;;</li>
              <li><strong>Garantir la sécurité et le bon fonctionnement du site</strong> (logs techniques, protection contre les attaques) — base légale&nbsp;: intérêt légitime (article 6-1-f) du RGPD)&nbsp;;</li>
              <li><strong>Mesurer l&apos;audience du site</strong> (Vercel Analytics, exempté de consentement, sans cookie) — base légale&nbsp;: intérêt légitime (article 6-1-f) du RGPD), conformément à la délibération CNIL n° 2020-091.</li>
            </ul>
            <p>Aucune donnée n&apos;est cédée, vendue ou louée à des tiers à des fins commerciales.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">4. Destinataires des données</h2>
            <p>
              Vos données sont accessibles uniquement à FPH Solutions et, dans le cadre de leurs prestations, aux sous-traitants suivants&nbsp;:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Vercel Inc.</strong> (États-Unis) — hébergement du site, logs techniques&nbsp;;</li>
              <li><strong>Cloudflare Inc.</strong> (États-Unis) — CDN, protection et accélération du site&nbsp;;</li>
              <li><strong>Resend Inc.</strong> (États-Unis) — acheminement des emails envoyés via le formulaire de contact&nbsp;;</li>
              <li><strong>Cal.com Inc.</strong> (États-Unis) — réservation d&apos;appels de découverte (si vous utilisez cette fonctionnalité).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">5. Transferts hors de l&apos;Union européenne</h2>
            <p>
              Les sous-traitants mentionnés ci-dessus étant situés aux États-Unis, vos données peuvent faire l&apos;objet de transferts hors de l&apos;Union européenne. Ces transferts sont encadrés par&nbsp;:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Les clauses contractuelles types de la Commission européenne (décision d&apos;exécution (UE) 2021/914), conclues avec chacun de nos sous-traitants&nbsp;;</li>
              <li>La certification de Vercel, Cloudflare et Resend au <strong>Data Privacy Framework UE-États-Unis</strong> (décision d&apos;adéquation (UE) 2023/1795 de la Commission européenne du 10 juillet 2023).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">6. Durées de conservation</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Messages envoyés via le formulaire de contact :</strong> conservés 3 ans après notre dernier échange si aucune relation contractuelle n&apos;est établie&nbsp;;</li>
              <li><strong>Données relatives à une relation contractuelle :</strong> conservées pendant la durée de la relation puis archivées selon les obligations légales applicables&nbsp;;</li>
              <li><strong>Logs techniques (Vercel, Cloudflare) :</strong> conservés 12 mois maximum&nbsp;;</li>
              <li><strong>Données de mesure d&apos;audience (Vercel Analytics) :</strong> conservées 90 jours par Vercel&nbsp;;</li>
              <li><strong>Preuve de consentement cookies :</strong> conservée 6 mois (recommandation CNIL).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">7. Vos droits</h2>
            <p>
              Conformément aux articles 15 à 22 du RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants&nbsp;:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Droit d&apos;accès à vos données (article 15)&nbsp;;</li>
              <li>Droit de rectification (article 16)&nbsp;;</li>
              <li>Droit à l&apos;effacement («&nbsp;droit à l&apos;oubli&nbsp;», article 17)&nbsp;;</li>
              <li>Droit à la limitation du traitement (article 18)&nbsp;;</li>
              <li>Droit à la portabilité de vos données (article 20)&nbsp;;</li>
              <li>Droit d&apos;opposition au traitement (article 21)&nbsp;;</li>
              <li>Droit de retirer votre consentement à tout moment, sans affecter la licéité du traitement antérieur (article 7)&nbsp;;</li>
              <li>Droit de définir des directives relatives au sort de vos données après votre décès&nbsp;;</li>
              <li>Droit d&apos;introduire une réclamation auprès de la CNIL (cnil.fr — 3 Place de Fontenoy, 75007 Paris, France).</li>
            </ul>
            <p>
              Pour exercer ces droits, écrivez-nous à <strong>contact@fph-solutions.com</strong>. Nous répondons dans un délai d&apos;un mois à compter de la réception de votre demande.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">8. Sécurité des données</h2>
            <p>
              Le site est accessible exclusivement en HTTPS (chiffrement des échanges) et fait l&apos;objet de mesures de protection techniques (CDN Cloudflare, protections contre les attaques). Seules les personnes habilitées ont accès aux données collectées.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">9. Cookies et traceurs</h2>
            <p>
              Le site n&apos;utilise aucun cookie publicitaire ou de suivi tiers. Les cookies techniques et la mesure d&apos;audience exemptée sont décrits dans notre{" "}
              <Link href="/politique-de-cookies" className="text-[#00d4ff] hover:underline">politique de cookies</Link>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">10. Modification de la politique</h2>
            <p>
              La présente politique peut être mise à jour à tout moment, notamment pour tenir compte des évolutions légales ou techniques. La version en vigueur est celle publiée sur cette page.
            </p>
          </section>

          <p className="pt-4 text-xs text-zinc-400 dark:text-zinc-500">Dernière mise à jour&nbsp;: 10 août 2026.</p>
        </div>
      </div>
    </div>
  )
}
