"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";

const Hero3D = dynamic(() => import("@/components/Hero3D"), { ssr: false, loading: () => null });

const technologies = ["Next.js", "React", "TypeScript", "Tailwind"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-background px-6 py-20 transition-colors duration-300">
      {/* Circuit grid (blueprint) + radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(0,120,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,120,255,0.06)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_38%,black_30%,transparent_78%)] dark:[background-image:linear-gradient(rgba(0,212,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.045)_1px,transparent_1px)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 38%, rgba(0,180,255,0.14) 0%, transparent 65%)",
        }}
      />

      <Hero3D />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div
          variants={itemVariants}
          className="relative mb-8"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.28)_0%,transparent_70%)] blur-xl"
          />
          <Image
            src="/images/fph-logo.webp"
            alt="Logo FPH Solutions"
            width={180}
            height={180}
            priority
            className="relative h-36 w-36 sm:h-44 sm:w-44 rounded-2xl object-cover ring-1 ring-cyan-400/40 shadow-[0_0_50px_rgba(0,212,255,0.35)]"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-foreground"
          variants={itemVariants}
        >
          FPH Solutions
        </motion.h1>

        {/* Accent underline */}
        <motion.div
          className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#0088ff]"
          variants={itemVariants}
        />

        {/* Subtitle */}
        <motion.p
          className="mt-6 max-w-2xl text-lg sm:text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed"
          variants={itemVariants}
        >
          Solutions logicielles sur mesure
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          variants={itemVariants}
        >
          <a
            href="#projects"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#00d4ff] px-8 text-sm font-semibold text-[#06101f] shadow-[0_0_24px_rgba(0,212,255,0.35)] transition-all hover:bg-[#00b2ec] hover:shadow-[0_0_36px_rgba(0,212,255,0.5)] active:scale-95"
          >
            Voir mes projets
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 px-8 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-all hover:border-[#00d4ff] hover:text-[#00d4ff] hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] active:scale-95"
          >
            Me contacter
          </a>
        </motion.div>

        {/* Technology Badges */}
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
          variants={itemVariants}
        >
          <span className="mr-1 text-sm text-zinc-500">Stack :</span>
          {technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-full border border-zinc-200 dark:border-cyan-400/20 dark:bg-cyan-400/[0.06] bg-zinc-100/50 px-4 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 backdrop-blur-sm transition-colors hover:border-[#00d4ff]/40 hover:text-[#00d4ff]"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
