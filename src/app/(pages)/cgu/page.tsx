import Link from "next/link"

export const metadata = {
  title: "Conditions Générales d'Utilisation",
  description: "Conditions générales d'utilisation du site internet FPH Solutions.",
}

export default function CguPage() {
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

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8">Conditions Générales d&apos;Utilisation</h1>

        <div className="space-y-8 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">1. Objet</h2>
            <p>
              Les présentes conditions générales d&apos;utilisation (CGU) encadrent l&apos;accès et l&apos;utilisation du site internet <strong>fph-solutions.com</strong>, édité par FPH Solutions. En accédant au site, vous acceptez sans réserve les présentes CGU.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">2. Accès au site</h2>
            <p>
              Le site est accessible gratuitement à tout utilisateur disposant d&apos;un accès à internet. Tous les frais supportés pour accéder au site (matériel, logiciels, connexion) restent à la charge de l&apos;utilisateur. FPH Solutions s&apos;efforce d&apos;assurer une disponibilité maximale du site, sans toutefois y être tenu, et se réserve le droit de modifier, suspendre ou interrompre l&apos;accès à tout moment, notamment pour maintenance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">3. Contenu du site et propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des éléments du site (textes, images, graphismes, logos, icônes, vidéos, architecture, code source) est protégé par le droit de la propriété intellectuelle. Toute reproduction, représentation, modification, publication ou adaptation, totale ou partielle, est interdite sans autorisation écrite préalable de FPH Solutions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">4. Responsabilité</h2>
            <p>
              Les informations présentées sur le site sont fournies à titre indicatif et ne sauraient engager la responsabilité de FPH Solutions en cas d&apos;erreur, d&apos;omission ou d&apos;indisponibilité temporaire. FPH Solutions ne pourra être tenu responsable des dommages directs ou indirects résultant de l&apos;utilisation du site ou de l&apos;impossibilité d&apos;y accéder.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">5. Données personnelles</h2>
            <p>
              Les traitements de données personnelles réalisés dans le cadre de l&apos;utilisation du site (notamment le formulaire de contact) sont décrits dans notre{" "}
              <Link href="/politique-de-confidentialite" className="text-[#00d4ff] hover:underline">politique de confidentialité</Link>, et la gestion des traceurs dans notre{" "}
              <Link href="/politique-de-cookies" className="text-[#00d4ff] hover:underline">politique de cookies</Link>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">6. Liens hypertextes</h2>
            <p>
              Le site peut contenir des liens vers des sites tiers. FPH Solutions n&apos;exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu, leurs pratiques ou leurs politiques de confidentialité. La création de liens vers le site fph-solutions.com est autorisée sous réserve qu&apos;ils ne nuisent pas à son image et qu&apos;ils s&apos;ouvrent dans une nouvelle fenêtre.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">7. Droit applicable et juridiction</h2>
            <p>
              Les présentes CGU sont soumises au droit français. En cas de litige, et à défaut de résolution amiable, compétence est attribuée aux tribunaux français compétents, sous réserve des dispositions impératives applicables au consommateur.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">8. Contact</h2>
            <p>
              Pour toute question relative aux présentes CGU, contactez-nous à <strong>contact@fph-solutions.com</strong>.
            </p>
          </section>

          <p className="pt-4 text-xs text-zinc-400 dark:text-zinc-500">Dernière mise à jour&nbsp;: 10 août 2026.</p>
        </div>
      </div>
    </div>
  )
}
