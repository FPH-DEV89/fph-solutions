"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { paliers } from "@/data/sav"

export default function MaintenanceSection() {
  return (
    <section className="bg-background py-24 sm:py-32 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#00d4ff]">
            Maintenance & SAV
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Votre site livré, je reste disponible
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-600 dark:text-zinc-400">
            Mises à jour, sauvegardes, corrections, petites évolutions — je m&apos;occupe
            de la maintenance pendant que vous vous concentrez sur votre activité.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-3">
          {paliers.map((palier, index) => (
            <motion.div
              key={palier.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`relative rounded-2xl border p-6 transition ${
                palier.highlight
                  ? "border-[#00d4ff] bg-[#00d4ff]/5 shadow-[0_0_32px_rgba(0,212,255,0.12)]"
                  : "border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/30 hover:border-[#00d4ff]/30"
              }`}
            >
              {palier.highlight && palier.highlightLabel && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-[#00d4ff] px-4 py-1 text-xs font-bold text-[#06101f]">
                    {palier.highlightLabel}
                  </span>
                </div>
              )}
              <h3 className="text-lg font-bold text-foreground">{palier.nom}</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{palier.accroche}</p>
              <div className="mt-4">
                <span className="text-3xl font-extrabold text-foreground">
                  {palier.prixMensuel} €
                </span>
                <span className="ml-1 text-sm text-zinc-500">HT / mois</span>
              </div>
              <p className="mt-1 text-xs text-zinc-500">
                Ou {palier.prixAnnuel} € HT / an (2 mois offerts)
              </p>
              <div className="mt-4 text-xs text-zinc-500">
                Prise en charge : <strong className="text-foreground">{palier.reactivite}</strong>
              </div>
              <Link
                href="/maintenance#ticket"
                className={`mt-5 flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  palier.highlight
                    ? "bg-[#00d4ff] text-[#06101f] hover:bg-[#00b2ec]"
                    : "border border-zinc-300 dark:border-zinc-700 text-foreground hover:border-[#00d4ff] hover:text-[#00d4ff]"
                }`}
              >
                Ouvrir un ticket
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link
            href="/maintenance"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-600 transition hover:border-[#00d4ff] hover:text-[#00d4ff] dark:border-zinc-700 dark:text-zinc-300"
          >
            Voir toutes les formules et le détail des SLA
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
