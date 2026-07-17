import Link from "next/link"

export const metadata = {
  title: "Politique de Confidentialité",
  description: "Politique de protection des données personnelles de FPH Solutions.",
}

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 transition hover:text-violet-400 mb-8"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Retour à l&apos;accueil
        </Link>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8">Politique de Confidentialité</h1>

        <div className="space-y-8 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
            <p>
              Dans le cadre de l&apos;utilisation de ses services et notamment de son site internet, FPH Solutions s&apos;engage à protéger les données à caractère personnel de ses utilisateurs conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">2. Données collectées</h2>
            <p>
              Nous collectons uniquement les informations personnelles que vous nous fournissez volontairement via le formulaire de contact, à savoir :
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Votre nom</li>
              <li>Votre adresse email</li>
              <li>Le contenu de votre message</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">3. Utilisation des données</h2>
            <p>
              Les données personnelles collectées via le formulaire de contact sont utilisées exclusivement pour :
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Traiter et répondre à vos demandes de renseignements ou devis.</li>
              <li>Assurer le suivi de la relation commerciale si une collaboration en découle.</li>
            </ul>
            <p>
              Aucune donnée n&apos;est cédée, vendue ou louée à des tiers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">4. Durée de conservation</h2>
            <p>
              Vos données de contact sont conservées pendant la durée nécessaire au traitement de votre demande, et pour une durée maximale de 3 ans après notre dernier échange si aucune relation contractuelle n&apos;est établie.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">5. Vos droits</h2>
            <p>
              Conformément à la réglementation sur la protection des données, vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Droit d&apos;accès et de rectification de vos données.</li>
              <li>Droit d&apos;opposition et de suppression de vos données.</li>
              <li>Droit à la limitation du traitement de vos données.</li>
            </ul>
            <p>
              Pour exercer ces droits, vous pouvez nous écrire à tout moment par email à : <strong>contact@fph-solutions.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
