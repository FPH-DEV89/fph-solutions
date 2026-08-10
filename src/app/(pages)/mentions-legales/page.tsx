import Link from "next/link"

export const metadata = {
  title: "Mentions Légales",
  description: "Mentions légales réglementaires du site internet FPH Solutions.",
}

export default function MentionsLegalesPage() {
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

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8">Mentions Légales</h1>

        <div className="space-y-8 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">1. Éditeur du site</h2>
            <p>
              En vertu de l&apos;article 6-III de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique (LCEN), il est précisé aux utilisateurs du site <strong>fph-solutions.com</strong> l&apos;identité de l&apos;éditeur&nbsp;:
            </p>
            <p>
              <strong>FPH Solutions</strong> — Florian Philibert<br />
              <strong>Adresse :</strong> Aulnay-sous-Bois, France<br />
              <strong>Email :</strong> contact@fph-solutions.com<br />
              <strong>Directeur de la publication :</strong> Florian Philibert
              {/* À compléter au lancement pro : statut (ex. micro-entrepreneur), adresse complète, SIRET, n° de TVA intracommunautaire */}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">2. Hébergement</h2>
            <p>
              Le site est hébergé par <strong>Vercel Inc.</strong><br />
              <strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis<br />
              <strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[#a855f7] hover:underline">vercel.com</a>
            </p>
            <p>
              Le site est accéléré et protégé par le CDN <strong>Cloudflare Inc.</strong><br />
              <strong>Adresse :</strong> 101 Townsend St, San Francisco, CA 94107, États-Unis<br />
              <strong>Site web :</strong> <a href="https://cloudflare.com" target="_blank" rel="noopener noreferrer" className="text-[#a855f7] hover:underline">cloudflare.com</a>
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">3. Propriété intellectuelle et contrefaçons</h2>
            <p>
              FPH Solutions est propriétaire des droits de propriété intellectuelle ou détient les droits d&apos;usage sur tous les éléments accessibles sur le site internet, notamment les textes, images, graphismes, logos, vidéos, architecture, icônes et sons.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de FPH Solutions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">4. Limitations de responsabilité</h2>
            <p>
              FPH Solutions ne pourra être tenu pour responsable des dommages directs et indirects causés au matériel de l&apos;utilisateur, lors de l&apos;accès au site fph-solutions.com.
            </p>
            <p>
              FPH Solutions s&apos;engage à sécuriser au mieux le site fph-solutions.com, cependant sa responsabilité ne pourra être mise en cause si des données indésirables sont importées et installées sur son site à son insu.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">5. Données personnelles</h2>
            <p>
              Les traitements de données personnelles réalisés sur ce site sont décrits dans notre{" "}
              <Link href="/politique-de-confidentialite" className="text-[#a855f7] hover:underline">politique de confidentialité</Link>. La gestion des cookies et traceurs est détaillée dans notre{" "}
              <Link href="/politique-de-cookies" className="text-[#a855f7] hover:underline">politique de cookies</Link>.
            </p>
            <p>
              Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement et d&apos;opposition sur vos données, que vous pouvez exercer à tout moment en écrivant à <strong>contact@fph-solutions.com</strong>, ou en introduisant une réclamation auprès de la CNIL (cnil.fr).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">6. Droit applicable et attribution de juridiction</h2>
            <p>
              Tout litige en relation avec l&apos;utilisation du site fph-solutions.com est soumis au droit français. En dehors des cas où la loi ne le permet pas, il est fait attribution exclusive de juridiction aux tribunaux compétents.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
