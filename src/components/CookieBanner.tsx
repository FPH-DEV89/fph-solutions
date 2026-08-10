"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const consent = localStorage.getItem("fph-consent")
      if (consent === null) {
        setVisible(true)
      }
    } catch {
      setVisible(true)
    }
  }, [])

  const handleAccept = () => {
    try {
      localStorage.setItem("fph-consent", "accepted")
    } catch {}
    window.dispatchEvent(new Event("fph-consent-changed"))
    setVisible(false)
  }

  const handleRefuse = () => {
    try {
      localStorage.setItem("fph-consent", "refused")
    } catch {}
    window.dispatchEvent(new Event("fph-consent-changed"))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur shadow-xl p-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <p className="flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Nous utilisons uniquement des cookies techniques (préférence de thème) et une mesure d&apos;audience anonyme sans cookie (Vercel Analytics).{" "}
          <Link href="/politique-de-cookies" className="text-[#a855f7] hover:underline">
            En savoir plus
          </Link>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleRefuse}
            className="rounded-full border border-zinc-300 dark:border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 transition hover:border-[#a855f7] hover:text-[#a855f7]"
          >
            Tout refuser
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="rounded-full bg-[#a855f7] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#9333ea]"
          >
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  )
}
