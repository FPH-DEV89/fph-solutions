"use client"

import { useEffect, useState } from "react"
import { Analytics } from "@vercel/analytics/react"

export default function AnalyticsWithConsent() {
  const [accepted, setAccepted] = useState<boolean | null>(null)

  useEffect(() => {
    const readConsent = () => {
      try {
        setAccepted(localStorage.getItem("fph-consent") === "accepted")
      } catch {
        setAccepted(false)
      }
    }
    readConsent()
    window.addEventListener("fph-consent-changed", readConsent)
    return () => window.removeEventListener("fph-consent-changed", readConsent)
  }, [])

  if (accepted !== true) return null
  return <Analytics />
}
