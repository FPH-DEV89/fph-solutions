"use client"

import { motion } from "framer-motion"

interface Props {
  inclus: string[]
  exclus: string[]
}

export default function MaintenanceInclusions({ inclus, exclus }: Props) {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Ce qui est couvert — et ce qui ne l&apos;est pas
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
          La maintenance a un périmètre clair. Pas de surprise, pas de refus non motivé.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Inclusions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 p-7"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00d4ff]/10 text-[#00d4ff]">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground">Ce qui est inclus</h3>
          </div>
          <ul className="space-y-3">
            {inclus.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-400">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#00d4ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Exclusions — présentées positivement */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 p-7"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground">Hors périmètre</h3>
          </div>
          <p className="mb-4 text-xs text-zinc-500 dark:text-zinc-400">
            Ces sujets se traitent par devis séparé. Tout est transparent avant de commencer.
          </p>
          <ul className="space-y-3">
            {exclus.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-500 dark:text-zinc-500">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
