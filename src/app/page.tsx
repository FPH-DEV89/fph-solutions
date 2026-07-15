import Hero from "@/components/Hero"
import ProjectGrid from "@/components/ProjectGrid"
import ServicesSection from "@/components/Services"
import FAQSection from "@/components/FAQ"
import ContactForm from "@/components/ContactForm"
import { projects } from "@/data/projects"

const featuredProjects = projects.slice(0, 3)

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Projects Section */}
      <section id="projects" className="bg-[#0a0a0a] py-24 sm:py-32">
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
        </div>
      </section>

      <ServicesSection />
      <FAQSection />
      <ContactForm />
    </>
  )
}
