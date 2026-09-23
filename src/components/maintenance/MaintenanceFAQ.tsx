"use client"

import { motion } from "framer-motion"
import type { FAQItem } from "@/data/sav"

interface Props {
  items: FAQItem[]
}

export default function MaintenanceFAQ({ items }: Props) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <motion.details
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
          className="group rounded-2xl border border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/30 transition-colors duration-300 open:border-[#00d4ff]/30 open:bg-zinc-100/50 open:dark:bg-zinc-900/60"
        >
          <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-left outline-none list-none [&::-webkit-details-marker]:hidden select-none">
            <span className="pr-4 text-sm font-medium text-foreground sm:text-base">
              {item.question}
            </span>
            <svg
              className="h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-300 group-open:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </summary>
          <div className="border-t border-zinc-200 dark:border-zinc-800 px-6 py-5">
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {item.reponse}
            </p>
          </div>
        </motion.details>
      ))}
    </div>
  )
}
