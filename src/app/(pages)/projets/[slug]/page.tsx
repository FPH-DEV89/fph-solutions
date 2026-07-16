import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/data/projects";

const categoryLabel: Record<string, string> = {
  app: "Application",
  tool: "Outil",
  site: "Site vitrine",
  ai: "IA",
};

// ─── generateMetadata ──────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Projet introuvable" };

  return {
    title: project.title,
    description: project.description,
  };
}

// ─── Page ───────────────────────────────────────────────────────────

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://fph-solutions.com" },
      { "@type": "ListItem", position: 2, name: "Projets", item: "https://fph-solutions.com/projets" },
      { "@type": "ListItem", position: 3, name: project.title },
    ],
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Back link */}
      <div className="mx-auto max-w-4xl px-6 pt-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <Link
          href="/projets"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 transition hover:text-violet-400"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Retour aux projets
        </Link>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-10 pt-8">
        <span className="inline-block rounded-full border border-zinc-200 bg-zinc-100 px-3 py-0.5 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          {categoryLabel[project.category] ?? project.category}
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-2 text-lg text-violet-400">{project.subtitle}</p>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-sm text-zinc-500 dark:text-zinc-400">{project.year}</span>
          <span className="text-zinc-300 dark:text-zinc-700">·</span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {project.tags.length} tag{project.tags.length > 1 ? "s" : ""}
          </span>
        </div>
      </section>

      {/* Description longue */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          {project.longDescription}
        </p>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <h2 className="mb-6 text-lg font-semibold uppercase tracking-widest text-violet-400">
          Points clés
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {project.highlights.map((h, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50"
            >
              <svg
                className="mt-0.5 h-5 w-5 shrink-0 text-violet-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span className="text-sm text-zinc-700 dark:text-zinc-300">{h}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tags */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500">
          Technologies
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 px-3 py-1 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Links */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500">
          Liens
        </h2>
        <div className="flex flex-wrap gap-4">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-700 transition hover:border-violet-600/50 hover:text-violet-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Code source
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-5 py-3 text-sm font-medium text-violet-700 transition hover:bg-violet-100 dark:border-violet-700 dark:bg-violet-950/30 dark:text-violet-400 dark:hover:bg-violet-950/50"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
              Démo live
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
