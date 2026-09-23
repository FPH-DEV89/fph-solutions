"use client"

import { motion } from "framer-motion"
import type { SLALevel } from "@/data/sav"

interface Props {
  sla: SLALevel[]
}

const CRITICITE_COLORS: Record<string, string> = {
  P1: "text-red-500",
  P2: "text-orange-500",
  P3: "text-blue-500",
  P4: "text-violet-500",
}

const CRITICITE_BG: Record<string, string> = {
  P1: "bg-red-500/10 border-red-500/20",
  P2: "bg-orange-500/10 border-orange-500/20",
  P3: "bg-blue-500/10 border-blue-500/20",
  P4: "bg-violet-500/10 border-violet-500/20",
}

export default function MaintenanceSLA({ sla }: Props) {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#00d4ff]">
          SLA
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Matrice des délais de prise en charge
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
          Le délai commence au moment ou le ticket est ouvert, pendant les horaires ouvrés.
        </p>
      </div>

      {/* Desktop : tableau */}
      <div className="hidden overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 lg:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/50">
              <th className="px-5 py-4 text-left font-semibold text-foreground">Criticité</th>
              <th className="px-5 py-4 text-center font-semibold text-foreground">Sérénité</th>
              <th className="px-5 py-4 text-center font-semibold text-[#00d4ff]">Croissance</th>
              <th className="px-5 py-4 text-center font-semibold text-foreground">Partenaire</th>
              <th className="px-5 py-4 text-left font-semibold text-foreground">Objectif</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {sla.map((level) => (
              <tr key={level.id} className="bg-white/50 dark:bg-zinc-900/20 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40 transition-colors">
                <td className="px-5 py-5">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-md px-2 py-0.5 text-xs font-bold ${CRITICITE_BG[level.id]} ${CRITICITE_COLORS[level.id]}`}>
                      {level.id}
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">{level.label}</p>
                      <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-500 max-w-xs">{level.definition}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 text-center text-zinc-600 dark:text-zinc-400">{level.delais.serenite}</td>
                <td className="px-5 py-5 text-center font-semibold text-foreground">{level.delais.croissance}</td>
                <td className="px-5 py-5 text-center text-zinc-600 dark:text-zinc-400">{level.delais.partenaire}</td>
                <td className="px-5 py-5 text-xs text-zinc-500 dark:text-zinc-500 max-w-xs">{level.objectif}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile : cartes par criticité */}
      <div className="space-y-4 lg:hidden">
        {sla.map((level, i) => (
          <motion.div
            key={level.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 overflow-hidden"
          >
            <div className={`px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 ${CRITICITE_BG[level.id]}`}>
              <div className="flex items-center gap-2">
                <span className={`rounded-md px-2 py-0.5 text-xs font-bold ${CRITICITE_COLORS[level.id]}`}>
                  {level.id}
                </span>
                <h3 className="font-semibold text-foreground">{level.label}</h3>
              </div>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{level.definition}</p>
            </div>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {(["serenite", "croissance", "partenaire"] as const).map((p) => {
                const labels = { serenite: "Sérénité", croissance: "Croissance", partenaire: "Partenaire" }
                return (
                  <div key={p} className="flex items-center justify-between px-5 py-3">
                    <span className={`text-sm ${p === "croissance" ? "font-semibold text-[#00d4ff]" : "text-zinc-600 dark:text-zinc-400"}`}>
                      {labels[p]}
                    </span>
                    <span className={`text-sm font-medium ${p === "croissance" ? "text-foreground" : "text-zinc-700 dark:text-zinc-300"}`}>
                      {level.delais[p]}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 px-5 py-3">
              <p className="text-xs text-zinc-500">{level.objectif}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
