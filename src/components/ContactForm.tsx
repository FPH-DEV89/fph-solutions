"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [type, setType] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        const data = await response.json()
        setError(data.errors ? data.errors.map((err: { message: string }) => err.message).join(", ") : "Une erreur est survenue lors de l'envoi.")
      }
    } catch {
      setError("Erreur réseau. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="bg-background py-24 sm:py-32 transition-colors duration-300">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#00d4ff]">
            Contact
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Travaillons ensemble
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-zinc-600 dark:text-zinc-400">
            Vous avez un projet en tête ? Envoyez-moi un message et je vous
            réponds sous 24h.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 p-12 text-center"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#00d4ff]/10 text-[#00d4ff]">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground">Message envoyé !</h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Merci ! Je vous réponds dans les plus brefs délais.
            </p>
            
            <div className="my-6 border-t border-zinc-100 dark:border-zinc-800 pt-6">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                Vous préférez planifier un échange directement ?
              </p>
              <a
                href="https://cal.com/fph-solutions.com/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full bg-[#00d4ff] px-6 text-sm font-semibold text-[#06101f] transition-all hover:bg-[#00b2ec] hover:shadow-md active:scale-95"
              >
                Réserver un appel découverte (15 min)
              </a>
            </div>

            <p className="mt-6 text-sm text-zinc-500">
              Vous pouvez aussi m&apos;écrire directement à{" "}
              <a href="mailto:contact@fph-solutions.com" className="text-[#00d4ff] hover:underline">
                contact@fph-solutions.com
              </a>
            </p>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            action="/api/contact"
            method="POST"
            className="space-y-5"
          >
            {/* Honeypot anti-spam — invisible pour les humains, les bots le remplissent */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            {error && (
              <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500 text-center">
                {error}
              </p>
            )}

            {/* Section : Vos coordonnées */}
            <div className="mt-8 mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00d4ff]">
              <span>Vos coordonnées</span>
              <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-400">
                  Prénom *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 px-4 py-3 text-sm text-foreground placeholder-zinc-500 outline-none transition focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff]/30"
                  placeholder="Votre prénom"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-400">
                  Nom *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 px-4 py-3 text-sm text-foreground placeholder-zinc-500 outline-none transition focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff]/30"
                  placeholder="Votre nom"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-400">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 px-4 py-3 text-sm text-foreground placeholder-zinc-500 outline-none transition focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff]/30"
                placeholder="vous@exemple.fr"
              />
            </div>

            {/* Section : Vous êtes */}
            <div className="mt-8 mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00d4ff]">
              <span>Vous êtes</span>
              <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <label
                htmlFor="type-particulier"
                className={`cursor-pointer rounded-xl border px-4 py-3 text-center text-sm font-medium transition ${
                  type === "particulier"
                    ? "border-[#00d4ff] bg-[#00d4ff]/10 text-[#00d4ff] ring-1 ring-[#00d4ff]/30"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-[#00d4ff]/50"
                }`}
              >
                <input
                  type="radio"
                  id="type-particulier"
                  name="type"
                  value="particulier"
                  required
                  checked={type === "particulier"}
                  onChange={(e) => setType(e.target.value)}
                  className="sr-only"
                />
                Particulier
              </label>

              <label
                htmlFor="type-entreprise"
                className={`cursor-pointer rounded-xl border px-4 py-3 text-center text-sm font-medium transition ${
                  type === "entreprise"
                    ? "border-[#00d4ff] bg-[#00d4ff]/10 text-[#00d4ff] ring-1 ring-[#00d4ff]/30"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-[#00d4ff]/50"
                }`}
              >
                <input
                  type="radio"
                  id="type-entreprise"
                  name="type"
                  value="entreprise"
                  required
                  checked={type === "entreprise"}
                  onChange={(e) => setType(e.target.value)}
                  className="sr-only"
                />
                Entreprise
              </label>

              <label
                htmlFor="type-association"
                className={`cursor-pointer rounded-xl border px-4 py-3 text-center text-sm font-medium transition ${
                  type === "association"
                    ? "border-[#00d4ff] bg-[#00d4ff]/10 text-[#00d4ff] ring-1 ring-[#00d4ff]/30"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-[#00d4ff]/50"
                }`}
              >
                <input
                  type="radio"
                  id="type-association"
                  name="type"
                  value="association"
                  required
                  checked={type === "association"}
                  onChange={(e) => setType(e.target.value)}
                  className="sr-only"
                />
                Association
              </label>
            </div>

            {type === "entreprise" || type === "association" ? (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <label htmlFor="organization" className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-400">
                  Nom de la structure *
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  required
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 px-4 py-3 text-sm text-foreground placeholder-zinc-500 outline-none transition focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff]/30"
                  placeholder="Nom de votre entreprise / association"
                />
              </motion.div>
            ) : null}

            {/* Section : Votre projet */}
            <div className="mt-8 mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00d4ff]">
              <span>Votre projet</span>
              <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
            </div>

            <div>
              <label htmlFor="projectType" className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-400">
                Type de projet *
              </label>
              <select
                id="projectType"
                name="projectType"
                required
                defaultValue=""
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 px-4 py-3 text-sm text-foreground placeholder-zinc-500 outline-none transition focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff]/30"
              >
                <option value="" disabled>
                  Sélectionnez...
                </option>
                <option value="site-vitrine">Site vitrine</option>
                <option value="ecommerce">E-commerce / boutique en ligne</option>
                <option value="application">Application web / sur mesure</option>
                <option value="refonte">Refonte de site existant</option>
                <option value="automatisation">Automatisation / outils internes</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div>
              <label htmlFor="projectDescription" className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-400">
                Décrivez votre projet *
              </label>
              <textarea
                id="projectDescription"
                name="projectDescription"
                required
                rows={6}
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 px-4 py-3 text-sm text-foreground placeholder-zinc-500 outline-none transition focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff]/30 resize-none"
                placeholder="Décrivez votre projet le plus précisément possible : objectifs, fonctionnalités souhaitées, contenu, public visé, sites que vous aimez..."
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="budget" className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-400">
                  Budget estimé
                </label>
                <select
                  id="budget"
                  name="budget"
                  defaultValue="unknown"
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 px-4 py-3 text-sm text-foreground placeholder-zinc-500 outline-none transition focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff]/30"
                >
                  <option value="unknown">Je ne sais pas encore</option>
                  <option value="moins-500">Moins de 500 €</option>
                  <option value="500-1500">500 € – 1 500 €</option>
                  <option value="1500-5000">1 500 € – 5 000 €</option>
                  <option value="plus-5000">Plus de 5 000 €</option>
                </select>
              </div>
              <div>
                <label htmlFor="deadline" className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-400">
                  Délai souhaité
                </label>
                <select
                  id="deadline"
                  name="deadline"
                  defaultValue="flexible"
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 px-4 py-3 text-sm text-foreground placeholder-zinc-500 outline-none transition focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff]/30"
                >
                  <option value="flexible">Flexible / pas d&apos;urgence</option>
                  <option value="urgent">Urgent (moins d&apos;un mois)</option>
                  <option value="1-3-mois">1 à 3 mois</option>
                  <option value="3-6-mois">3 à 6 mois</option>
                </select>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 px-4 py-3">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                value="true"
                required
                className="mt-0.5 h-4 w-4 shrink-0 accent-[#00d4ff]"
              />
              <label htmlFor="consent" className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                J&apos;accepte que mes données (prénom, nom, email, type de demandeur et informations sur mon projet) soient traitées par FPH Solutions pour répondre à ma demande, conformément à la{" "}
                <Link href="/politique-de-confidentialite" className="text-[#00d4ff] hover:underline">
                  politique de confidentialité
                </Link>
                . Je peux retirer mon consentement à tout moment.
              </label>
            </div>

            <div className="flex flex-col items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#00d4ff] px-10 text-sm font-semibold text-[#06101f] transition-all hover:bg-[#00b2ec] hover:shadow-lg hover:shadow-[#00d4ff]/25 active:scale-95 disabled:opacity-50"
              >
                {loading ? "Envoi en cours..." : "Envoyer le message"}
              </button>
              <span className="text-xs text-zinc-500">ou</span>
              <a
                href="https://cal.com/fph-solutions.com/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#00d4ff] hover:underline transition"
              >
                Planifier un appel directement (15 min)
              </a>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
