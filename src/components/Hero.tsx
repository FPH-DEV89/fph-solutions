"use client";

import { motion } from "framer-motion";

const technologies = ["Next.js", "React", "TypeScript", "Tailwind"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-6 py-20">
      {/* Subtle radial gradient overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(168,85,247,0.08) 0%, transparent 60%)",
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white"
          variants={itemVariants}
        >
          FPH Solutions
        </motion.h1>

        {/* Accent underline */}
        <motion.div
          className="mt-4 h-1 w-24 rounded-full bg-[#a855f7]"
          variants={itemVariants}
        />

        {/* Subtitle */}
        <motion.p
          className="mt-8 max-w-2xl text-lg sm:text-xl md:text-2xl text-zinc-400 leading-relaxed"
          variants={itemVariants}
        >
          Solutions logicielles sur mesure
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
          variants={itemVariants}
        >
          <a
            href="#projects"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#a855f7] px-8 text-sm font-medium text-white transition-all hover:bg-[#9333ea] hover:shadow-lg hover:shadow-[#a855f7]/25 active:scale-95"
          >
            Voir mes projets
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-700 px-8 text-sm font-medium text-zinc-300 transition-all hover:border-[#a855f7] hover:text-[#a855f7] hover:shadow-lg hover:shadow-[#a855f7]/10 active:scale-95"
          >
            Me contacter
          </a>
        </motion.div>

        {/* Technology Badges */}
        <motion.div
          className="mt-14 flex flex-wrap items-center justify-center gap-3"
          variants={itemVariants}
        >
          <span className="mr-1 text-sm text-zinc-500">Stack :</span>
          {technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-sm transition-colors hover:border-[#a855f7]/40 hover:text-[#a855f7]"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-2 text-zinc-600">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            className="h-6 w-[1px] bg-zinc-700"
            animate={{ scaleY: [1, 1.8, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
