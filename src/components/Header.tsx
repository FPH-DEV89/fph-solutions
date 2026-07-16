"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/projets", label: "Projets" },
  { href: "/#services", label: "Services" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
] as const;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-zinc-200 dark:border-white/[0.06]"
    >
      {/* Glassmorphism backdrop */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300" />

      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-lg font-bold tracking-tight text-foreground transition-colors"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#a855f7] text-sm font-extrabold text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]">
            FP
          </span>
          <span>
            <span className="text-foreground">FPH</span>{" "}
            <span className="text-[#a855f7]">Solutions</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="relative rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground hover:bg-foreground/[0.06]"
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="ml-4 flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/#contact"
              className="inline-flex items-center rounded-lg bg-[#a855f7] px-4 py-2 text-sm font-medium text-white shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all hover:bg-[#9333ea] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
            >
              Contact
              <svg
                className="ml-1.5 h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </li>
        </ul>

        {/* Mobile Hamburger & Theme Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-foreground/70 transition-colors hover:text-foreground hover:bg-foreground/[0.06]"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
          >
            <motion.div
              className="absolute flex flex-col gap-1.5"
              animate={menuOpen ? "open" : "closed"}
              initial={false}
            >
              <motion.span
                className="block h-[2px] w-5 rounded-full bg-current"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 5.5 },
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.span
                className="block h-[2px] w-5 rounded-full bg-current"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="block h-[2px] w-5 rounded-full bg-current"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -5.5 },
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden border-t border-zinc-200 dark:border-white/[0.06] bg-background/90 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.05 * i,
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                      href === "/#contact"
                        ? "bg-[#a855f7] text-white shadow-[0_0_20px_rgba(168,85,247,0.25)]"
                        : "text-foreground/70 hover:text-foreground hover:bg-foreground/[0.06]"
                    )}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
