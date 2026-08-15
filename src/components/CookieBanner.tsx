"use client"

import { useSyncExternalStore } from "react"
import Link from "next/link"

const CONSENT_KEY = "fph-consent"

// Lecture du choix de consentement (store externe : localStorage).
// getSnapshot retourne une primitive (string | null) → comparaison par valeur stable.
function getConsentSnapshot(): string | null {
  try {
    return localStorage.getItem(CONSENT_KEY)
  } catch {
    return "refused" // stockage indisponible → pas de mesure d'audience
  }
}

function subscribeConsent(callback: () => void) {
  window.addEventListener("fph-consent-changed", callback)
  return () => window.removeEventListener("fph-consent-changed", callback)
}

export default function CookieBanner() {
  const consent = useSyncExternalStore(subscribeConsent, getConsentSnapshot, () => null)

  // Choix déjà enregistré (accepted ou refused) → bandeau masqué.
  if (consent !== null) return null

  const handleAccept = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "accepted")
    } catch {}
    window.dispatchEvent(new Event("fph-consent-changed"))
  }

  const handleRefuse = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "refused")
    } catch {}
    window.dispatchEvent(new Event("fph-consent-changed"))
  }

  return (
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur shadow-xl p-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <p className="flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Nous utilisons uniquement des cookies techniques (préférence de thème) et une mesure d&apos;audience anonyme sans cookie (Vercel Analytics).{" "}
          <Link href="/politique-de-cookies" className="text-[#00d4ff] hover:underline">
            En savoir plus
          </Link>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleRefuse}
            className="rounded-full border border-zinc-300 dark:border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 transition hover:border-[#00d4ff] hover:text-[#00d4ff]"
          >
            Tout refuser
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="rounded-full bg-[#00d4ff] px-5 py-2.5 text-sm font-semibold text-[#06101f] transition hover:bg-[#00b2ec]"
          >
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  )
}
