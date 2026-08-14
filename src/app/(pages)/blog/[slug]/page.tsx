import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllSlugs,
  getPostBySlug,
  formatPostDate,
  readingTime,
} from "@/lib/posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // JSON.stringify n'échappe pas <, >, &, U+2028/U+2029 : un titre contenant "</script>"
  // casserait la balise et ouvrirait une faille XSS. On échappe explicitement.
  const safeJson = (obj: unknown) =>
    JSON.stringify(obj)
      .replace(/</g, "\\u003c")
      .replace(/>/g, "\\u003e")
      .replace(/&/g, "\\u0026")
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029");

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://fph-solutions.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://fph-solutions.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Florian Philibert",
    },
    publisher: {
      "@type": "Organization",
      name: "FPH Solutions",
      url: "https://fph-solutions.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://fph-solutions.com/blog/${post.slug}`,
    },
  };

  return (
    <article className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Back link & JSON-LD */}
      <div className="mx-auto max-w-4xl px-6 pt-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJson(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJson(articleSchema) }}
        />
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-violet-400 dark:text-zinc-400"
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
          Retour au blog
        </Link>
      </div>

      {/* Hero / Header */}
      <header className="mx-auto max-w-4xl px-6 pb-8 pt-8">
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-200 bg-zinc-100 px-3 py-0.5 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {post.title}
        </h1>

        <div className="mt-4 flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span className="text-zinc-300 dark:text-zinc-700">·</span>
          <span>{readingTime(post.contentHtml)}</span>
        </div>
      </header>

      {/* Hero Image */}
      {post.image?.startsWith("/") && !post.image?.startsWith("//") && (
        <section className="mx-auto max-w-4xl px-6 pb-12">
          <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-xl relative aspect-video">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </div>
        </section>
      )}

      {/* Markdown Content */}
      <div className="mx-auto max-w-4xl px-6 pb-24">
        <div
          className="blog-prose border-t border-zinc-200 pt-8 dark:border-zinc-800"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>
    </article>
  );
}
