import type { Metadata } from "next"
import Link from "next/link"
import { paliers, sla, inclus, exclus, process, faq, horsForfait, reprise, horaires } from "@/data/sav"
import TicketForm from "@/components/TicketForm"
import MaintenanceHero from "@/components/maintenance/MaintenanceHero"
import MaintenanceReperes from "@/components/maintenance/MaintenanceReperes"
import MaintenancePaliers from "@/components/maintenance/MaintenancePaliers"
import MaintenanceInclusions from "@/components/maintenance/MaintenanceInclusions"
import MaintenanceSLA from "@/components/maintenance/MaintenanceSLA"
import MaintenanceProcess from "@/components/maintenance/MaintenanceProcess"
import MaintenanceFAQ from "@/components/maintenance/MaintenanceFAQ"

export const metadata: Metadata = {
  title: "Maintenance et SAV | FPH Solutions",
  description:
    "Mises à jour, sauvegardes, surveillance et corrections incluses. Trois formules de maintenance pour votre site, avec un délai de prise en charge garanti.",
}

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-8 sm:pt-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 transition hover:text-[#00d4ff] mb-10"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Retour à l&apos;accueil
        </Link>
      </div>

      <MaintenanceHero />
      <MaintenanceReperes />

      <section id="formules" className="py-16 sm:py-24">
        <MaintenancePaliers paliers={paliers} />
      </section>

      <section className="py-12 sm:py-16 bg-zinc-50/50 dark:bg-zinc-900/20">
        <MaintenanceInclusions inclus={inclus} exclus={exclus} />
      </section>

      <section id="sla" className="py-16 sm:py-24">
        <MaintenanceSLA sla={sla} />
      </section>

      <section className="py-12 sm:py-16 bg-zinc-50/50 dark:bg-zinc-900/20">
        <MaintenanceProcess steps={process} />
      </section>

      {/* Reprise de site existant */}
      <section className="py-16 sm:py-20 mx-auto max-w-4xl px-6">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 p-8 sm:p-10">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[#00d4ff]">
            Site existant
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Vous arrivez avec un site existant ?
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {reprise.detail}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="rounded-xl bg-[#00d4ff]/10 px-4 py-2 text-lg font-bold text-[#00d4ff]">
              {reprise.prix}
            </span>
            <span className="text-sm text-zinc-500">{reprise.label}</span>
          </div>
          <Link
            href="#ticket"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#00d4ff] px-6 py-3 text-sm font-semibold text-[#06101f] transition hover:bg-[#00b2ec]"
          >
            Demander un audit de prise en main
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Horaires + hors forfait */}
      <section className="pb-12 sm:pb-16 mx-auto max-w-4xl px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#00d4ff]/10 text-[#00d4ff]">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-foreground">Horaires</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {horaires}
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#00d4ff]/10 text-[#00d4ff]">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75" />
              </svg>
            </div>
            <h3 className="font-semibold text-foreground">Hors forfait</h3>
            <p className="mt-2 text-2xl font-extrabold text-[#00d4ff]">
              {horsForfait.tauxHoraire}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {horsForfait.precision}
            </p>
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 sm:py-24 mx-auto max-w-3xl px-6">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#00d4ff] text-center">
          FAQ
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-foreground text-center sm:text-3xl mb-10">
          Vos questions
        </h2>
        <MaintenanceFAQ items={faq} />
      </section>

      <section id="ticket" className="py-16 sm:py-24 bg-zinc-50/50 dark:bg-zinc-900/20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#00d4ff]">
              SAV
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ouvrir un ticket
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-zinc-600 dark:text-zinc-400">
              Un seul formulaire, tout est tracé. Je reviens vers vous dans le délai de votre palier.
            </p>
          </div>
          <TicketForm />
        </div>
      </section>
    </div>
  )
}
