"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { sla } from "@/data/sav"
import type { PalierId, CriticitéId } from "@/data/sav"

const PALIER_OPTIONS = [
  { value: "serenite", label: "Sérénité" },
  { value: "croissance", label: "Croissance" },
  { value: "partenaire", label: "Partenaire" },
  { value: "non_client", label: "Je ne suis pas encore client" },
] as const

const CRITICITE_OPTIONS = [
  { value: "P1", label: "P1 Critique", color: "#ef4444" },
  { value: "P2", label: "P2 Majeure", color: "#f97316" },
  { value: "P3", label: "P3 Mineure (par défaut)", color: "#3b82f6" },
  { value: "P4", label: "P4 Evolution", color: "#8b5cf6" },
] as const

function getDelaiForPalier(palier: string, criticite: string): string | null {
  const level = sla.find((s) => s.id === (criticite as CriticitéId))
  if (!level || palier === "non_client") return null
  return level.delais[palier as PalierId] ?? null
}

const INPUT_CLASS =
  "w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 px-4 py-3 text-sm text-foreground placeholder-zinc-500 outline-none transition focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff]/30"

export default function TicketForm() {
  const [loading, setLoading] = useState(false)
  const [reference, setReference] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [palier, setPalier] = useState<string>("")
  const [criticite, setCriticite] = useState<string>("P3")
  const [showCriticiteHelp, setShowCriticiteHelp] = useState(false)

  const delaiInfo = palier ? getDelaiForPalier(palier, criticite) : null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch("/api/ticket", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })

      if (response.ok) {
        const data = await response.json()
        setReference(data.reference ?? "")
      } else {
        const data = await response.json()
        setError(
          data.errors
            ? data.errors.map((err: { message: string }) => err.message).join(", ")
            : "Une erreur est survenue lors de l'envoi."
        )
      }
    } catch {
      setError("Erreur réseau. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  if (reference !== null) {
    return (
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
        <h3 className="text-xl font-semibold text-foreground">Ticket ouvert !</h3>
        {reference && (
          <p className="mt-3 inline-block rounded-lg bg-[#00d4ff]/10 px-4 py-2 font-mono text-sm font-bold text-[#00d4ff]">
            {reference}
          </p>
        )}
        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
          Un accusé de réception vous a été envoyé par email. Pour toute communication,
          utilisez cette référence en répondant au mail ou en écrivant à{" "}
          <a href="mailto:ticket@fph-solutions.com" className="text-[#00d4ff] hover:underline">
            ticket@fph-solutions.com
          </a>
          .
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} action="/api/ticket" method="POST" className="space-y-5">
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500 text-center"
        >
          {error}
        </p>
      )}

      {/* Coordonnées */}
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00d4ff] mt-8 mb-3">
        <span>Vos coordonnées</span>
        <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="tf-nom" className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-400">
            Nom et prénom *
          </label>
          <input type="text" id="tf-nom" name="nom" required className={INPUT_CLASS} placeholder="Votre nom" />
        </div>
        <div>
          <label htmlFor="tf-email" className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-400">
            Email *
          </label>
          <input type="email" id="tf-email" name="email" required className={INPUT_CLASS} placeholder="vous@exemple.fr" />
        </div>
      </div>

      <div>
        <label htmlFor="tf-organisation" className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-400">
          Organisation <span className="text-zinc-400">(facultatif)</span>
        </label>
        <input type="text" id="tf-organisation" name="organisation" className={INPUT_CLASS} placeholder="Nom de votre entreprise" />
      </div>

      {/* Site + Palier */}
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00d4ff] mt-8 mb-3">
        <span>Votre demande</span>
        <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
      </div>

      <div>
        <label htmlFor="tf-site" className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-400">
          Site concerné (URL) *
        </label>
        <input type="url" id="tf-site" name="site" required className={INPUT_CLASS} placeholder="https://monsite.fr" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="tf-palier" className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-400">
            Votre palier *
          </label>
          <select
            id="tf-palier"
            name="palier"
            required
            defaultValue=""
            onChange={(e) => setPalier(e.target.value)}
            className={INPUT_CLASS}
          >
            <option value="" disabled>Sélectionnez...</option>
            {PALIER_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="tf-criticite" className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-400">
            Criticité *
          </label>
          <select
            id="tf-criticite"
            name="criticite"
            value={criticite}
            onChange={(e) => setCriticite(e.target.value)}
            className={INPUT_CLASS}
          >
            {CRITICITE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Délai dynamique */}
      {delaiInfo && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-zinc-500 dark:text-zinc-400"
        >
          Prise en charge sous <strong className="text-foreground">{delaiInfo}</strong> selon votre palier.
        </motion.p>
      )}

      {/* Aide criticité */}
      <div>
        <button
          type="button"
          onClick={() => setShowCriticiteHelp((v) => !v)}
          className="flex items-center gap-1.5 text-xs text-[#00d4ff] hover:underline transition"
          aria-expanded={showCriticiteHelp}
        >
          <svg className={`h-4 w-4 transition-transform ${showCriticiteHelp ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
          Comment choisir la criticité ?
        </button>
        {showCriticiteHelp && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 px-4 py-4 space-y-2"
          >
            {sla.map((level) => (
              <div key={level.id} className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                <span className="font-bold text-foreground">{level.id} — {level.label} :</span>{" "}
                {level.definition}
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <div>
        <label htmlFor="tf-sujet" className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-400">
          Sujet *
        </label>
        <input type="text" id="tf-sujet" name="sujet" required className={INPUT_CLASS} placeholder="Résumez votre demande en une ligne" />
      </div>

      <div>
        <label htmlFor="tf-description" className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-400">
          Description *
        </label>
        <textarea
          id="tf-description"
          name="description"
          required
          rows={6}
          className={`${INPUT_CLASS} resize-none`}
          placeholder="Décrivez le problème ou la demande : quand c'est apparu, comment le reproduire, l'impact sur votre activité..."
        />
      </div>

      {/* Consentement */}
      <div className="flex items-start gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 px-4 py-3">
        <input
          type="checkbox"
          id="tf-consent"
          name="consent"
          value="true"
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#00d4ff]"
        />
        <label htmlFor="tf-consent" className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          J&apos;accepte que mes données (nom, email, site, description) soient traitées par FPH Solutions dans le cadre de ma demande SAV, conformément à la{" "}
          <Link href="/politique-de-confidentialite" className="text-[#00d4ff] hover:underline">
            politique de confidentialité
          </Link>
          .
        </label>
      </div>

      <div className="flex justify-center pt-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-12 items-center justify-center rounded-full bg-[#00d4ff] px-10 text-sm font-semibold text-[#06101f] transition-all hover:bg-[#00b2ec] hover:shadow-lg hover:shadow-[#00d4ff]/25 active:scale-95 disabled:opacity-50"
        >
          {loading ? "Envoi en cours..." : "Ouvrir le ticket"}
        </button>
      </div>
    </form>
  )
}
