import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projets — FPH Solutions",
  description:
    "Découvrez mes projets : applications SAV, sites vitrine, outils de productivité et solutions d'automatisation.",
};

const categoryLabel: Record<string, string> = {
  app: "Application",
  tool: "Outil",
  site: "Site vitrine",
  ai: "IA",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-violet-400">
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projets/${project.slug}`}
              className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-white/50 p-6 transition hover:border-violet-600/50 hover:bg-zinc-100/50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-900"
            >
              {/* Category badge */}
              <span className="mb-4 inline-block w-fit rounded-full border border-zinc-200 bg-zinc-100 px-3 py-0.5 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                {categoryLabel[project.category] ?? project.category}
              </span>

              {/* Year + title */}
              <span className="mb-1 text-xs text-zinc-500 dark:text-zinc-400">{project.year}</span>
              <h3 className="text-xl font-semibold text-foreground transition group-hover:text-violet-400">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{project.subtitle}</p>

              {/* Description */}
              <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>

              {/* Tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 px-2.5 py-0.5 text-xs"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span className="rounded-md bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500 px-2.5 py-0.5 text-xs">
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>

              {/* Arrow on hover */}
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-violet-400 opacity-0 transition group-hover:opacity-100">
                Voir le projet
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
