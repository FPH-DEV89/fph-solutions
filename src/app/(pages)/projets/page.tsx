import type { Metadata } from "next";
import { projects } from "@/data/projects";
import ProjectGrid from "@/components/ProjectGrid";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Découvrez mes projets : applications SAV, sites vitrine, outils de productivité et solutions d'automatisation.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#00d4ff]">
            Portfolio
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Mes projets
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Applications métier, sites vitrine, outils de productivité — chaque
            projet est pensé pour être performant, maintenable et visuellement
            soigné.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <ProjectGrid projects={projects} />
      </section>
    </div>
  );
}
