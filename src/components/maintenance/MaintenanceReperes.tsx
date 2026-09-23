"use client"

import { motion } from "framer-motion"

const REPERES = [
  {
    chiffre: "48 h ouvrées",
    label: "de prise en charge maximum, même sur le premier palier",
  },
  {
    chiffre: "1 a 8 h",
    label: "d'intervention incluses chaque mois selon la formule",
  },
  {
    chiffre: "30 jours",
    label: "de sauvegardes conservées, restauration sur demande",
  },
  {
    chiffre: "Sans astreinte le week-end",
    label: "c'est ce qui garde le tarif accessible",
    small: true,
  },
]

export default function MaintenanceReperes() {
  return (
    <section className="border-y border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {REPERES.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="text-center"
            >
              <p className={`font-extrabold text-[#00d4ff] ${r.small ? "text-xl" : "text-3xl"}`}>
                {r.chiffre}
              </p>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{r.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
