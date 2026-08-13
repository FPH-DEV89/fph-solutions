import Hero from "@/components/Hero"
import ProjectGrid from "@/components/ProjectGrid"
import ServicesSection from "@/components/Services"
import FAQSection from "@/components/FAQ"
import ContactForm from "@/components/ContactForm"
import AboutSection from "@/components/About"
import SocialProofSection from "@/components/SocialProof"
import Link from "next/link"
import { projects, faqItems } from "@/data/projects"

const featuredProjects = [
  ...projects.filter((p) => p.slug !== "maxpatrie").slice(0, 3),
  projects.find((p) => p.slug === "maxpatrie")!,
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />

      {/* Projects Section */}
      <section id="projects" className="bg-background py-24 sm:py-32 transition-colors duration-300">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#a855f7]">
              Portfolio
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Mes projets
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Applications métier, sites vitrine, outils de productivité — chaque
              projet est pensé pour être performant et visuellement soigné.
            </p>
          </div>
          <ProjectGrid projects={featuredProjects} />
          <div className="mt-12 text-center">
            <Link
              href="/projets"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-600 transition hover:border-[#a855f7] hover:text-[#a855f7] dark:border-zinc-700 dark:text-zinc-300"
            >
              Voir tous mes projets
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <SocialProofSection />
      <AboutSection />
      <ServicesSection />
      <FAQSection />
      <ContactForm />
    </>
  )
}
