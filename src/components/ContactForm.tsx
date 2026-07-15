"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // Le formulaire sera connecté plus tard (mailto ou API)
  }

  return (
    <section id="contact" className="bg-[#0a0a0a] py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#a855f7]">
            Contact
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Travaillons ensemble
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-zinc-400">
            Vous avez un projet en tête ? Envoyez-moi un message et je vous
            réponds sous 24h.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-12 text-center"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#a855f7]/10 text-[#a855f7]">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">Message envoyé !</h3>
            <p className="mt-2 text-zinc-400">
              Merci ! Je vous réponds dans les plus brefs délais.
            </p>
            <p className="mt-6 text-sm text-zinc-500">
              Vous pouvez aussi m&apos;écrire directement à{" "}
              <a href="mailto:contact@fphsolutions.fr" className="text-[#a855f7] hover:underline">
                contact@fphsolutions.fr
              </a>
            </p>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            action="https://formspree.io/f/contact"
            method="POST"
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-zinc-300">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]/30"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-zinc-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]/30"
                  placeholder="vous@exemple.fr"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-zinc-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]/30 resize-none"
                placeholder="Parlez-moi de votre projet..."
              />
            </div>
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#a855f7] px-10 text-sm font-medium text-white transition-all hover:bg-[#9333ea] hover:shadow-lg hover:shadow-[#a855f7]/25 active:scale-95"
              >
                Envoyer le message
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
