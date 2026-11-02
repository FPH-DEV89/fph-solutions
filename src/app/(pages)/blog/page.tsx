import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { getPosts, formatPostDate, readingTime } from "@/lib/posts";

export async function generateMetadata(): Promise<Metadata> {
  const posts = await getPosts();
  const latestPost = posts[0];
  const imageUrl = latestPost?.image
    ? (latestPost.image.startsWith("http")
        ? latestPost.image
        : `${SITE_URL}${latestPost.image.startsWith("/") ? "" : "/"}${latestPost.image}`)
    : `${SITE_URL}/og-default.png`;

  const title = "Blog";
  const description =
    "Articles sur l'IA, l'automatisation et la technologie — FPH Solutions";

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/blog` },
    openGraph: {
      type: "website",
      title,
      description,
      url: `${SITE_URL}/blog`,
      siteName: "FPH Solutions",
      locale: "fr_FR",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: latestPost?.title ?? "FPH Solutions",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
          <span className="inline-block rounded-full border border-zinc-200 bg-zinc-100 px-3 py-0.5 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            Blog
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Le blog
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            IA, automatisation, technologie — des retours d&apos;expérience
            concrets, avec des chiffres réels.
          </p>
        </div>
      </section>

      {/* Posts List */}
      <section className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        {posts.length === 0 ? (
          <p className="text-zinc-500 dark:text-zinc-400">
            Aucun article pour le moment. Revenez bientôt !
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 transition hover:border-cyan-500/50 dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                  <time dateTime={post.date}>
                    {formatPostDate(post.date)}
                  </time>
                  <span className="text-zinc-300 dark:text-zinc-700">·</span>
                  <span>{readingTime(post.contentHtml)}</span>
                </div>

                <h2 className="mt-3 text-xl font-bold text-foreground transition group-hover:text-cyan-400">
                  {post.title}
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {post.description}
                </p>

                {post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-zinc-100 px-3 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
