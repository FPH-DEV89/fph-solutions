"use client"

import { motion } from "framer-motion"

export default function SocialProofSection() {
  return (
    <section className="bg-background py-16 sm:py-24 border-t border-zinc-100 dark:border-zinc-900 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Logo Trust Band */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Ils me font confiance
            </h3>
            <div className="flex flex-wrap gap-6 items-center">
              {/* Logistique & Transport  representation */}
              <div className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 px-5 py-3 shadow-sm select-none">
                <span className="text-xl font-extrabold tracking-widest text-[#a855f7]">Logistique & Transport</span>
                <span className="text-xs font-semibold text-zinc-500 uppercase"></span>
              </div>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 p-8 shadow-sm"
            >
              <div className="absolute top-6 left-6 text-6xl text-[#a855f7]/10 font-serif select-none pointer-events-none">
                “
              </div>
              <p className="relative z-10 text-lg italic leading-relaxed text-zinc-700 dark:text-zinc-300 pl-4">
                Trackrma nous a permis d&apos;automatiser et de simplifier considérablement le suivi de nos retours matériels. Nous avons gagné plus de 3 heures par semaine sur la saisie de données et la communication entre services. Une solution robuste et sur-mesure.
              </p>
              <div className="mt-4 pl-4">
                <p className="text-sm font-semibold text-foreground">
                  Responsable d&apos;Exploitation SAV
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Entreprise leader en logistique
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
