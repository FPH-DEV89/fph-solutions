"use client";

import { faqItems } from "@/data/projects"
import { motion } from "framer-motion"

export default function FAQSection() {
  return (
    <section id="faq" className="bg-background py-24 sm:py-32 transition-colors duration-300">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#00d4ff]">
            FAQ
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Questions fréquentes
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-zinc-600 dark:text-zinc-400">
            Tout ce que vous devez savoir avant de démarrer un projet.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.details
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.06 * index, ease: [0.22, 1, 0.36, 1] }}
              key={index}
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
                  {item.answer}
                </p>
              </div>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  )
}
