"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import type { Palier } from "@/data/sav"

interface Props {
  paliers: Palier[]
}

export default function MaintenancePaliers({ paliers }: Props) {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#00d4ff]">
          Formules
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Choisissez votre niveau de sérénité
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {paliers.map((palier, i) => (
          <motion.div
            key={palier.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className={`relative flex flex-col rounded-2xl border p-7 ${
              palier.highlight
                ? "border-[#00d4ff] bg-[#00d4ff]/5 shadow-[0_0_40px_rgba(0,212,255,0.15)] ring-1 ring-[#00d4ff]/20"
                : "border-zinc-200 bg-white/60 dark:border-zinc-800 dark:bg-zinc-900/40"
            }`}
          >
            {palier.highlight && palier.highlightLabel && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-[#00d4ff] px-5 py-1.5 text-xs font-bold text-[#06101f] shadow-md">
                  {palier.highlightLabel}
                </span>
              </div>
            )}

            <div>
              <h3 className="text-xl font-bold text-foreground">{palier.nom}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {palier.accroche}
              </p>
            </div>

            <div className="mt-6">
              <div className="flex items-end gap-1">
                <span className="text-4xl font-extrabold text-foreground">{palier.prixMensuel} €</span>
                <span className="mb-1 text-sm text-zinc-500">HT / mois</span>
              </div>
              <p className="mt-1 text-xs text-zinc-500">
                Ou {palier.prixAnnuel} € HT / an —{" "}
                <span className="text-[#00d4ff] font-medium">2 mois offerts</span>
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/50 p-4 text-xs">
              <div>
                <p className="text-zinc-500">Heures incluses</p>
                <p className="font-bold text-foreground">{palier.heuresIncluses}</p>
              </div>
              <div>
                <p className="text-zinc-500">Prise en charge</p>
                <p className="font-bold text-foreground">{palier.reactivite}</p>
              </div>
              <div>
                <p className="text-zinc-500">Engagement</p>
                <p className="font-bold text-foreground">{palier.engagement}</p>
              </div>
            </div>

            <ul className="mt-6 flex-1 space-y-2.5">
              {palier.inclus.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-400">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#00d4ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="#ticket"
              className={`mt-8 flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition ${
                palier.highlight
                  ? "bg-[#00d4ff] text-[#06101f] hover:bg-[#00b2ec] shadow-[0_0_20px_rgba(0,212,255,0.25)]"
                  : "border border-zinc-300 dark:border-zinc-700 text-foreground hover:border-[#00d4ff] hover:text-[#00d4ff]"
              }`}
            >
              Ouvrir un ticket
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
