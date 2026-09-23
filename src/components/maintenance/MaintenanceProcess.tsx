"use client"

import { motion } from "framer-motion"
import type { ProcessStep } from "@/data/sav"

interface Props {
  steps: ProcessStep[]
}

export default function MaintenanceProcess({ steps }: Props) {
  return (
    <div className="mx-auto max-w-4xl px-6">
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#00d4ff]">
          Comment ca marche
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Du ticket à la clôture, en 5 étapes
        </h2>
      </div>

      <div className="relative">
        {/* Ligne verticale de connexion */}
        <div className="absolute left-5 top-6 bottom-6 w-px bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />

        <ol className="space-y-6">
          {steps.map((step, i) => (
            <motion.li
              key={step.titre}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative flex items-start gap-5"
            >
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#00d4ff] bg-background text-sm font-bold text-[#00d4ff]">
                {i + 1}
              </div>
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 px-6 py-5 flex-1">
                <h3 className="font-semibold text-foreground">{step.titre}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {step.detail}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  )
}
