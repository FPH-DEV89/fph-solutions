"use client"

import { useEffect, useState } from "react"
import { Analytics } from "@vercel/analytics/react"
import Script from "next/script"

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
  return (
    <>
      <Analytics />
      <Script
        src="https://stats.fph-solutions.com/script.js"
        data-website-id="e4e3583d-b26d-4827-be20-71e01ff03f12"
        strategy="afterInteractive"
      />
    </>
  )
}
