"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function MaintenanceHero() {
  return (
    <section className="py-16 sm:py-20 mx-auto max-w-4xl px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[#00d4ff]">
          Maintenance et SAV
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Votre site est livré.
          <br />
          <span className="text-[#00d4ff]">Je reste responsable de la suite.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Un site livré n&apos;est pas un site abandonné. Je prends en charge les mises à jour,
          les sauvegardes, la surveillance et les corrections, avec un délai de prise en charge
          qui s&apos;adapte à l&apos;urgence de votre situation.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#ticket"
            className="inline-flex items-center gap-2 rounded-full bg-[#00d4ff] px-7 py-3.5 text-sm font-semibold text-[#06101f] shadow-[0_0_24px_rgba(0,212,255,0.3)] transition hover:bg-[#00b2ec] hover:shadow-[0_0_32px_rgba(0,212,255,0.4)]"
          >
            Ouvrir un ticket
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <Link
            href="#formules"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-7 py-3.5 text-sm font-medium text-zinc-600 transition hover:border-[#00d4ff] hover:text-[#00d4ff] dark:border-zinc-700 dark:text-zinc-300"
          >
            Voir les formules
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
