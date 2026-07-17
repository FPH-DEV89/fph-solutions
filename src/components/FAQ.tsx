import { faqItems } from "@/data/projects"

export default function FAQSection() {
  return (
    <section id="faq" className="bg-background py-24 sm:py-32 transition-colors duration-300">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#a855f7]">
            FAQ
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Questions fréquentes
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-zinc-600 dark:text-zinc-400">
            Tout ce que vous devez savoir avant de démarrer un projet.
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <details
              key={index}
              className="group rounded-2xl border border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/30 transition-colors duration-300 open:border-[#a855f7]/30 open:bg-zinc-100/50 open:dark:bg-zinc-900/60"
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
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
