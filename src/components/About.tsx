"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-zinc-50 py-24 sm:py-32 dark:bg-[#0b0b0c] transition-colors duration-300">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px]" />
      
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#a855f7]">
            À propos
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Qui se cache derrière FPH Solutions ?
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Portrait Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative h-80 w-80 overflow-hidden rounded-3xl border border-zinc-200 bg-white p-3 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/florian-philibert.png"
                  alt="Florian Philibert - Développeur Full-Stack"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Bio and Key Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col gap-8"
          >
            <div className="space-y-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              <p>
                Bonjour ! Je m&apos;appelle <strong>Florian Philibert</strong>. Passionné de technologie et de développement informatique, j&apos;ai fondé <strong>FPH Solutions</strong> pour accompagner les entreprises dans la création d&apos;applications web performantes, robustes et à forte valeur ajoutée.
              </p>
              <p>
                Fort d&apos;un parcours technique solide incluant la conception d&apos;applications logistiques critiques pour des acteurs majeurs (notamment la gestion des retours SAV pour <strong>STEF Group</strong>), je me spécialise aujourd&apos;hui dans l&apos;écosystème <strong>Next.js, React et TypeScript</strong>.
              </p>
              <p>
                Mon approche privilégie la rigueur de développement, des interfaces fluides au pixel près (inspirées du design moderne et interactif) et une architecture propre qui garantit la scalabilité de vos projets sur le long terme.
              </p>
            </div>

            {/* Key stats grid */}
            <div className="grid grid-cols-3 gap-6 border-t border-zinc-200 pt-8 dark:border-zinc-800/80">
              <div>
                <p className="text-3xl font-bold text-[#a855f7] sm:text-4xl">3+</p>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Années d&apos;expérience</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#a855f7] sm:text-4xl">15+</p>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Projets livrés</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#a855f7] sm:text-4xl">100%</p>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">De satisfaction</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
